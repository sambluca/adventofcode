export function memoize<Args extends unknown[], Result>(
  func: (...args: Args) => Result
): (...args: Args) => Result {
  const stored = new Map<string, Result>();

  return (...args) => {
    const key = JSON.stringify(args);
    if (stored.has(key)) {
      return stored.get(key)!;
    }
    const result = func(...args);
    stored.set(key, result);
    return result;
  };
}
