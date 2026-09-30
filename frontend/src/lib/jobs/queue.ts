type Job = () => Promise<void>;

const jobs: Job[] = [];
let running = false;

export function enqueueJob(job: Job): void {
  jobs.push(job);
  void drain();
}

export function pendingJobCount(): number {
  return jobs.length;
}

async function drain(): Promise<void> {
  if (running) return;
  running = true;
  try {
    while (jobs.length > 0) {
      const job = jobs.shift() as Job;
      try {
        await job();
      } catch (e) {
        console.error("[job] error tidak tertangani:", e);
      }
    }
  } finally {
    running = false;
  }
}