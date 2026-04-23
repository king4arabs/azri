import type { BiosignalBatchEvent } from "@azri/contracts";

/**
 * Cross-platform queue used by the mobile app to flush biosignals to
 * the API. Web and iOS native each have their own queue; this one is
 * for React Native on iOS + Android.
 */
export interface IngestQueueOptions {
  maxBatchSize?: number;
  poster: (events: BiosignalBatchEvent[]) => Promise<boolean>;
}

export class IngestQueue {
  private pending: BiosignalBatchEvent[] = [];
  private maxBatchSize: number;
  private poster: IngestQueueOptions["poster"];

  constructor(opts: IngestQueueOptions) {
    this.maxBatchSize = opts.maxBatchSize ?? 200;
    this.poster = opts.poster;
  }

  enqueue(events: BiosignalBatchEvent[]): void {
    this.pending.push(...events);
  }

  depth(): number {
    return this.pending.length;
  }

  async flush(): Promise<number> {
    if (this.pending.length === 0) return 0;
    const batch = this.pending.slice(0, this.maxBatchSize);
    let ok = false;
    try {
      ok = await this.poster(batch);
    } catch {
      ok = false;
    }
    if (ok) {
      this.pending.splice(0, batch.length);
      return batch.length;
    }
    return 0;
  }
}
