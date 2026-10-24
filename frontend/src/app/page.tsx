"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { ApiError, ApiOk, DocumentDto, DocumentListItem } from "@/types";

type IconName = "menu" | "close" | "plus" | "arrow" | "file" | "spark" | "chevron" | "download" | "refresh";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <path d="M5 5l14 14M19 5 5 19" />,
    plus: <path d="M12 4v16M4 12h16" />,
    arrow: <><path d="M12 19V5m0 0-6 6m6-6 6 6" /></>,
    file: <><path d="M6 3h8l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v5h5M8 12h7M8 16h7" /></>,
    spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2ZM19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    download: <><path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v4h16v-4" /></>,
    refresh: <><path d="M20 11a8 8 0 1 0-2 6M20 4v7h-7" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

async function requestData<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { cache: "no-store", ...init });
  const body = await response.json() as ApiOk<T> | ApiError;
  if (!response.ok) throw new Error("error" in body ? body.error.message : "Permintaan gagal. Silakan coba lagi.");
  return (body as ApiOk<T>).data;
}

const statusLabel: Record<DocumentListItem["status"], string> = {
  pending: "Menunggu",
  processing: "Memproses",
  completed: "Selesai",
  failed: "Gagal",
};

function dateGroup(date: string) {
  const created = new Date(date);
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const days = Math.floor((start.getTime() - new Date(created.getFullYear(), created.getMonth(), created.getDate()).getTime()) / 86400000);
  if (days === 0) return "Hari ini";
  if (days === 1) return "Kemarin";
  if (days < 7) return "7 hari terakhir";
  return "Lebih lama";
}

export default function Home() {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<DocumentDto | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState("");
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let cancelled = false;
    requestData<DocumentListItem[]>("/api/documents")
      .then((items) => { if (!cancelled) { setDocuments(items); setListError(""); } })
      .catch((e: Error) => { if (!cancelled) setListError(e.message); });
    return () => { cancelled = true; };
  }, [revision]);

  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const load = async () => {
      try {
        const doc = await requestData<DocumentDto>(`/api/documents/${selectedId}`);
        if (cancelled) return;
        setDetail(doc);
        setLoading(false);
        if (doc.status === "processing" || doc.status === "pending") {
          timer = setTimeout(load, 2500);
        } else {
          setDocuments((items) => items.map((item) => item.id === doc.id ? { ...item, status: doc.status, storyCount: doc.userStories.length } : item));
        }
      } catch (e) {
        if (!cancelled) { setError((e as Error).message); setLoading(false); }
      }
    };
    void load();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [selectedId, revision]);

  function newDocument() {
    setSelectedId(null);
    setDetail(null);
    setTitle("");
    setContent("");
    setError("");
    setSidebarOpen(false);
  }

  function openDocument(id: string) {
    setDetail(null);
    setSelectedId(id);
    setLoading(true);
    setError("");
    setSidebarOpen(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim() || content.length > 50_000 || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const created = await requestData<{ id: string }>("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() || undefined, content }),
      });
      setTitle("");
      setContent("");
      setRevision((value) => value + 1);
      openDocument(created.id);
      try {
        await requestData<{ status: string }>(`/api/documents/${created.id}/extract`, { method: "POST" });
      } catch (e) {
        setError(`Notulen tersimpan, tetapi ekstraksi belum dimulai: ${(e as Error).message}`);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  const groups = ["Hari ini", "Kemarin", "7 hari terakhir", "Lebih lama"];
  const activeTitle = detail?.title ?? documents.find((doc) => doc.id === selectedId)?.title;

  return (
    <div className="app-shell">
      {sidebarOpen && <button className="mobile-overlay" aria-label="Tutup riwayat" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`} aria-label="Navigasi notulen">
        <div className="sidebar-top">
          <button className="brand" onClick={newDocument} aria-label="Beranda Notula">
            <span className="brand-mark"><Icon name="spark" size={21} /></span>
            <span>notula<span className="brand-dot">.</span></span>
          </button>
          <button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Tutup sidebar"><Icon name="close" /></button>
        </div>
        <button className="new-button" onClick={newDocument}><Icon name="plus" size={18} /> Notulen baru <span className="new-shortcut">+</span></button>
        <div className="history-heading">RIWAYAT NOTULEN <span>{documents.length}</span></div>
        <nav className="history-list" aria-label="Riwayat notulen">
          {listError && <div className="sidebar-message">Gagal memuat riwayat. <button onClick={() => setRevision((v) => v + 1)}>Coba lagi</button></div>}
          {!listError && documents.length === 0 && <p className="sidebar-message">Notulen yang diekstrak akan muncul di sini.</p>}
          {groups.map((group) => {
            const items = documents.filter((doc) => dateGroup(doc.createdAt) === group);
            if (!items.length) return null;
            return <div className="history-group" key={group}>
              <div className="group-label">{group}</div>
              {items.map((doc) => <button key={doc.id} className={`history-item ${selectedId === doc.id ? "active" : ""}`} onClick={() => openDocument(doc.id)} aria-current={selectedId === doc.id ? "page" : undefined}>
                <Icon name="file" size={17} />
                <span className="history-item-text"><span className="history-title">{doc.title}</span><span className="history-meta">{statusLabel[doc.status]}{doc.status === "completed" ? ` · ${doc.storyCount} story` : ""}</span></span>
              </button>)}
            </div>;
          })}
        </nav>
        <div className="sidebar-footer"><span className="footer-avatar">N</span><span><strong>Ruang kerja lokal</strong><small>Ekstraksi user story</small></span><span className="footer-indicator" /></div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Buka riwayat"><Icon name="menu" /></button><span className="topbar-title">Notula <Icon name="chevron" size={15} /> <span>{selectedId ? activeTitle ?? "Memuat notulen" : "Ruang kerja"}</span></span></div>
          <span className="topbar-badge"><span className="badge-dot" /> WORKSPACE</span>
        </header>

        {!selectedId ? <div className="workspace">
          <div className="welcome"><div className="eyebrow"><span className="eyebrow-line" /> NOTULEN JADI KEBUTUHAN NYATA</div><h1>Setiap diskusi punya<br /><em>cerita untuk dibangun.</em></h1><p>Tempel notulen rapat Anda. Notula akan menemukan user story dan menautkannya kembali ke kalimat sumbernya.</p></div>
          <form className="composer" onSubmit={submit}>
            <div className="composer-head"><span className="composer-icon"><Icon name="file" size={18} /></span><label htmlFor="title">NOTULEN BARU</label><span className="composer-head-hint">01 / INPUT</span></div>
            <input id="title" className="title-input" type="text" maxLength={200} placeholder="Judul rapat (opsional)" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea id="content" aria-label="Isi notulen rapat" className="content-input" placeholder="Tempel isi notulen rapat di sini...\n\nContoh: Tim sepakat pengguna dapat mendaftar akun menggunakan email. Admin perlu melihat daftar pendaftaran baru setiap hari." value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="composer-bottom"><span className={`char-count ${content.length > 50_000 ? "over-limit" : ""}`}>{content.length.toLocaleString("id-ID")} / 50.000 karakter</span><button className="submit-button" type="submit" disabled={!content.trim() || content.length > 50_000 || submitting}>{submitting ? "Menyimpan..." : "Ekstrak user story"}<span className="submit-icon"><Icon name="arrow" size={17} /></span></button></div>
          </form>
          {error && <p className="error-banner" role="alert">{error}</p>}
          <div className="feature-row"><div><span className="feature-number">01</span><strong>Tempel notulen</strong><small>Catatan rapat dalam bentuk teks</small></div><div><span className="feature-number">02</span><strong>Ekstraksi otomatis</strong><small>Kebutuhan diturunkan menjadi story</small></div><div><span className="feature-number">03</span><strong>Telusuri sumber</strong><small>Setiap story punya jejak asal</small></div></div>
        </div> : <div className="result-page">
          <div className="result-header"><div><div className="eyebrow"><span className="eyebrow-line" /> HASIL EKSTRAKSI</div><h1>{activeTitle ?? "Memuat notulen"}</h1><p>{detail ? new Date(detail.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "Memuat detail..."}</p></div><button className="outline-button" onClick={newDocument}><Icon name="plus" size={17} /> Notulen baru</button></div>
          {error && <div className="error-banner" role="alert">{error} <button onClick={() => setRevision((v) => v + 1)}>Coba lagi</button></div>}
          {loading && !detail && <div className="state-card"><span className="loading-ring" /> Memuat dokumen...</div>}
          {detail && <>
            <div className="result-summary"><span className={`status-pill status-${detail.status}`}><span className="status-dot" />{statusLabel[detail.status]}</span><span className="summary-divider" /><span><strong>{detail.userStories.length}</strong> user story ditemukan</span><span className="summary-divider" /><span><strong>{detail.sentences.length}</strong> kalimat sumber</span></div>
            {(detail.status === "processing" || detail.status === "pending") && <div className="state-card processing-card"><span className="loading-ring" /><div><strong>{detail.status === "pending" ? "Menunggu ekstraksi dimulai" : "Sedang mengekstrak user story"}</strong><p>Notula sedang membaca notulen Anda. Halaman ini akan diperbarui otomatis.</p></div>{detail.status === "pending" && <button className="outline-button" onClick={async () => { try { setError(""); await requestData(`/api/documents/${detail.id}/extract`, { method: "POST" }); setRevision((v) => v + 1); } catch (e) { setError((e as Error).message); } }}>Mulai ekstraksi</button>}</div>}
            {detail.status === "failed" && <div className="state-card failed-card"><div><strong>Ekstraksi gagal</strong><p>{detail.error || "Terjadi kesalahan saat memproses notulen."}</p></div><button className="outline-button" onClick={async () => { try { setError(""); await requestData(`/api/documents/${detail.id}/extract`, { method: "POST" }); setRevision((v) => v + 1); } catch (e) { setError((e as Error).message); } }}><Icon name="refresh" size={16} /> Coba lagi</button></div>}
            {detail.status === "completed" && <>
              {detail.truncated && <p className="notice-banner">Hasil dibatasi hingga 30 user story. Sebagian kebutuhan mungkin belum tercakup.</p>}
              <div className="section-heading"><div><span className="section-index">01 / HASIL</span><h2>User story</h2></div><a className="outline-button" href={`/api/documents/${detail.id}/export?format=md&filter=all`}><Icon name="download" size={16} /> Ekspor .md</a></div>
              {detail.userStories.length === 0 ? <div className="state-card">Tidak ada user story yang ditemukan dari notulen ini.</div> : <div className="stories">{detail.userStories.map((story, index) => <article className="story-card" key={story.id}><div className="story-top"><span className="story-index">{String(index + 1).padStart(2, "0")}</span><span className="story-code">{story.storyCode}</span><span className={`review-pill ${story.citations.some((c) => c.verificationStatus === "needs_review") ? "review-needed" : ""}`}>{story.citations.some((c) => c.verificationStatus === "needs_review") ? "Perlu ditinjau" : "Terverifikasi"}</span></div><p className="story-text">Sebagai <strong>{story.actor}</strong>, saya ingin <strong>{story.action}</strong>{story.benefit ? <> agar <strong>{story.benefit}</strong></> : null}.</p><div className="citation-area"><span className="citation-label">KALIMAT SUMBER</span>{story.citations.length ? story.citations.map((citation) => { const sentence = detail.sentences.find((s) => s.id === citation.sentenceId); return <div className="citation" key={citation.id}><span className="citation-number">{sentence ? String(sentence.index + 1).padStart(2, "0") : "--"}</span><span>{sentence?.text ?? "Kalimat sumber tidak ditemukan"}</span><span className={`citation-status ${citation.verificationStatus === "needs_review" ? "needs-review" : ""}`}>{citation.verificationStatus === "valid" ? "Valid" : "Tinjau"}{citation.confidenceScore !== null ? ` · ${Math.round(citation.confidenceScore * 100)}%` : ""}</span></div>; }) : <p className="no-citation">Belum ada kalimat sumber yang tertaut.</p>}</div></article>)}</div>}
            </>}
            {detail.sentences.length > 0 && <section className="source-section"><div className="section-heading"><div><span className="section-index">02 / REFERENSI</span><h2>Kalimat notulen</h2></div></div><div className="source-list">{detail.sentences.map((sentence) => <div className="source-row" key={sentence.id}><span>{String(sentence.index + 1).padStart(2, "0")}</span><p>{sentence.text}</p></div>)}</div></section>}
          </>}
        </div>}
        <footer className="main-footer">NOTULA <span>·</span> Dari notulen menuju kebutuhan yang jelas.</footer>
      </main>
    </div>
  );
}
