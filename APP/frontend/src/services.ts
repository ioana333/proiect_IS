import { api } from "./api";

// Tipuri simple (poți extinde după nevoie)
export type EventItem = {
  id: number;
  title: string;
  city: string;
  date: string;     // ISO string din backend
  category: string;
  venue?: string | null;
};

export async function listEvents(params?: {
  city?: string;
  category?: string;
  sort?: string;
  order?: "asc" | "desc";
}): Promise<EventItem[]> {
  const { data } = await api.get("/events", { params });
  return data;
}

export async function register(body: { email: string; password: string; city?: string }) {
  await api.post("/register", body);
}

export async function loginUser(body: { email: string; password: string }) {
  const { data } = await api.post("/login", body);
  
  // păstrăm token-ul pentru rute protejate (wishlist)
  localStorage.setItem("token", data.token);
  return data as { token: string };
}

export async function getWishlist(): Promise<EventItem[]> {
  const { data } = await api.get("/wishlist");
  return data;
}

export async function addToWishlist(eventId: number) {
  await api.post(`/wishlist/${eventId}`);
}
