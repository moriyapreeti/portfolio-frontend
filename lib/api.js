// Backend se data lene ka ek hi jagah. Backend band ho to site crash nahi hoti, fallback dikhata hai.
export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
export const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const img = (p) => (p && p.startsWith('/uploads') ? API + p : p || '');

export async function get(path, fallback = null) {
  try {
    const r = await fetch(API + path, { next: { revalidate: 60 } }); // 60 sec me naya content aa jata hai
    return r.ok ? await r.json() : fallback;
  } catch {
    return fallback;
  }
}
