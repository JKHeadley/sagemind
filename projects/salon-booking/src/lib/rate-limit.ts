const store = new Map<string, { count: number; resetTime: number }>();

export function isRateLimited(
  key: string,
  maxAttempts: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetTime) {
    store.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxAttempts) return true;
  record.count++;
  return false;
}
