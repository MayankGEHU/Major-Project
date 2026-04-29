const BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function fetchStats(period = "week") {
  const r = await fetch(`${BASE}/api/stats?period=${period}`);
  if (!r.ok) throw new Error(`Stats ${r.status}`);
  return r.json();
}

/** Fetch stats for a custom date range (YYYY-MM-DD strings) */
export async function fetchStatsByRange(fromDate, toDate) {
  const r = await fetch(`${BASE}/api/stats?from_date=${fromDate}&to_date=${toDate}`);
  if (!r.ok) throw new Error(`Stats ${r.status}`);
  return r.json();
}

export async function fetchAlerts(params = {}) {
  const q = new URLSearchParams(params).toString();
  const r = await fetch(`${BASE}/api/alerts?${q}`);
  if (!r.ok) throw new Error(`Alerts ${r.status}`);
  return r.json();
}

/** Fetch alerts for a custom date range, returns up to 200 threats */
export async function fetchAlertsByRange(fromDate, toDate) {
  const q = new URLSearchParams({
    from_date: fromDate,
    to_date: toDate,
    threats_only: true,
    page_size: 200,
  }).toString();
  const r = await fetch(`${BASE}/api/alerts?${q}`);
  if (!r.ok) throw new Error(`Alerts ${r.status}`);
  return r.json();
}

export async function deleteAlert(id) {
  const r = await fetch(`${BASE}/api/alerts/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error(`Delete ${r.status}`);
}

export function getWsUrl() {
  return BASE.replace(/^http/, "ws") + "/ws/live";
}
