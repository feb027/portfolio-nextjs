export function rateLimit({ interval, uniqueTokenPerInterval }: { 
  interval: number;
  uniqueTokenPerInterval: number;
}) {
  const tokenCache = new Map();

  return {
    check: async (request: Request, limit: number, token: string) => {
      const ip = request.headers.get('x-forwarded-for') || 'anonymous';
      const tokenKey = `${ip}-${token}`;
      const now = Date.now();
      const windowStart = now - interval;

      const tokenCount = tokenCache.get(tokenKey) || [];
      const validTokens = tokenCount.filter((timestamp: number) => timestamp > windowStart);
      
      if (validTokens.length >= limit) {
        throw new Error('Rate limit exceeded');
      }

      validTokens.push(now);
      tokenCache.set(tokenKey, validTokens);

      return true;
    }
  };
} 