/**
 * Small in-memory sliding-window rate limiter. Rank Rascal runs as a single
 * worker instance, so per-process state is sufficient. Revisit (shared store)
 * before running more than one instance.
 */
export interface RateDecision {
  allowed: boolean;
  retryAfterMs: number;
}

export class RateLimiter {
  private readonly hits = new Map<string, number[]>();
  private checks = 0;

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  check(key: string, now = Date.now()): RateDecision {
    if (++this.checks % 500 === 0) this.sweep(now);
    const cutoff = now - this.windowMs;
    const recent = (this.hits.get(key) ?? []).filter((timestamp) => timestamp > cutoff);
    if (recent.length >= this.limit) {
      this.hits.set(key, recent);
      return { allowed: false, retryAfterMs: Math.max(0, recent[0]! + this.windowMs - now) };
    }
    recent.push(now);
    this.hits.set(key, recent);
    return { allowed: true, retryAfterMs: 0 };
  }

  private sweep(now: number): void {
    const cutoff = now - this.windowMs;
    for (const [key, timestamps] of this.hits) {
      if (timestamps.every((timestamp) => timestamp <= cutoff)) this.hits.delete(key);
    }
  }
}

// Commands that call the Roblox API or start OAuth get a tighter budget.
const EXPENSIVE_COMMANDS = new Set(["link-roblox", "preview-roblox"]);
const generalLimiter = new RateLimiter(10, 20_000);
const expensiveLimiter = new RateLimiter(3, 60_000);

export function checkCommandRate(userId: string, commandName: string, now = Date.now()): RateDecision {
  if (EXPENSIVE_COMMANDS.has(commandName)) {
    const decision = expensiveLimiter.check(`${userId}:${commandName}`, now);
    if (!decision.allowed) return decision;
  }
  return generalLimiter.check(userId, now);
}

export function rateLimitMessage(retryAfterMs: number): string {
  const seconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
  return `Slow down, Rascal. Try again in ${seconds}s.`;
}
