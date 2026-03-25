// Currency conversion with two authoritative sources:
// - CRC ↔ USD: Banco Central de Costa Rica (BCCR) via Ministerio de Hacienda API
// - All other currencies: ExchangeRate-API (free tier, 1,500 req/month)
// Both sources cached in-memory for 24 hours

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// ── BCCR Rate (CRC ↔ USD) ──────────────────────────────────────

interface BCCRCache {
  venta: number;  // sell rate: 1 USD = X CRC (used for USD→CRC conversions)
  compra: number; // buy rate: 1 USD = X CRC (used for CRC→USD conversions)
  fetchedAt: number;
}

let bccrCache: BCCRCache | null = null;

async function fetchBCCRRate(): Promise<BCCRCache> {
  if (bccrCache && Date.now() - bccrCache.fetchedAt < CACHE_TTL_MS) {
    return bccrCache;
  }

  // Official BCCR rate via Ministerio de Hacienda — no API key needed
  const res = await fetch("https://api.hacienda.go.cr/indicadores/tc");
  if (!res.ok) {
    throw new Error(`BCCR rate API returned ${res.status}`);
  }

  const data = await res.json();
  const venta = data?.dolar?.venta?.valor;
  const compra = data?.dolar?.compra?.valor;

  if (!venta || !compra) {
    throw new Error("Invalid BCCR rate response");
  }

  bccrCache = { venta, compra, fetchedAt: Date.now() };
  return bccrCache;
}

// ── ExchangeRate-API (all other currencies) ─────────────────────

interface ERCache {
  rates: Record<string, number>;
  fetchedAt: number;
}

let erCache: ERCache | null = null;

async function fetchExchangeRates(): Promise<Record<string, number>> {
  if (erCache && Date.now() - erCache.fetchedAt < CACHE_TTL_MS) {
    return erCache.rates;
  }

  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) {
    throw new Error(`Exchange rate API returned ${res.status}`);
  }

  const data = await res.json();
  if (data.result !== "success" || !data.rates) {
    throw new Error("Invalid exchange rate response");
  }

  erCache = { rates: data.rates, fetchedAt: Date.now() };
  return erCache.rates;
}

// ── Public API ──────────────────────────────────────────────────

/**
 * Convert an amount from a foreign currency to USD.
 * - CRC uses the official BCCR compra (buy) rate
 * - All other currencies use ExchangeRate-API
 */
export async function convertToUSD(
  amount: number,
  fromCurrency: string
): Promise<{ amountUSD: number; rate: number }> {
  const currency = fromCurrency.toUpperCase();

  if (currency === "USD") {
    return { amountUSD: amount, rate: 1 };
  }

  if (currency === "CRC") {
    const bccr = await fetchBCCRRate();
    // compra rate: how many CRC the bank pays per 1 USD (patient sells CRC, gets USD)
    return {
      amountUSD: Math.round((amount / bccr.compra) * 100) / 100,
      rate: bccr.compra,
    };
  }

  const rates = await fetchExchangeRates();
  const rate = rates[currency];
  if (!rate) {
    throw new Error(`Unsupported currency: ${currency}`);
  }

  return {
    amountUSD: Math.round((amount / rate) * 100) / 100,
    rate,
  };
}

/**
 * Convert an amount from USD to a foreign currency.
 * - CRC uses the official BCCR venta (sell) rate
 * - All other currencies use ExchangeRate-API
 */
export async function convertFromUSD(
  amountUSD: number,
  toCurrency: string
): Promise<{ amount: number; rate: number }> {
  const currency = toCurrency.toUpperCase();

  if (currency === "USD") {
    return { amount: amountUSD, rate: 1 };
  }

  if (currency === "CRC") {
    const bccr = await fetchBCCRRate();
    // venta rate: how many CRC patient pays per 1 USD
    return {
      amount: Math.round(amountUSD * bccr.venta * 100) / 100,
      rate: bccr.venta,
    };
  }

  const rates = await fetchExchangeRates();
  const rate = rates[currency];
  if (!rate) {
    throw new Error(`Unsupported currency: ${currency}`);
  }

  return {
    amount: Math.round(amountUSD * rate * 100) / 100,
    rate,
  };
}

/** Currency symbol lookup */
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  CRC: "₡",
  MXN: "MX$",
  BRL: "R$",
  AUD: "A$",
};

export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency.toUpperCase()] || currency;
}
