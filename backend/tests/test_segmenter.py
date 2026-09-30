from app.pipeline.segmenter import segment_text


def test_split_into_0_based_sentences():
    result = segment_text("Selamat pagi. Kita bahas fitur login. Sudah, itu saja.")
    assert result == [
        {"index": 0, "text": "Selamat pagi."},
        {"index": 1, "text": "Kita bahas fitur login."},
        {"index": 2, "text": "Sudah, itu saja."},
    ]


def test_collapse_extra_whitespace():
    result = segment_text("  Hallo   dunia.   ")
    assert result == [{"index": 0, "text": "Hallo dunia."}]


def test_handles_empty_text():
    assert segment_text("") == []
    assert segment_text("   ") == []