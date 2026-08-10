const API_URL = import.meta.env.VITE_API_URL ?? "/api";

export type User = { id: string; full_name: string; email: string };
export type Note = { id: string; title: string; content: string };
export type Assignment = { id: string; title: string; subject: string; due_date: string; status: string; pomodoros_completed: number };

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { ...init, credentials: "include", headers: { "content-type": "application/json", ...init.headers } });
  const body = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(body.error ?? "Something went wrong.");
  return body;
}

export const api = {
  me: () => request<{ user: User }>("/auth/me"),
  login: (email: string, password: string) => request<{ user: User }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  signup: (full_name: string, email: string, password: string) => request<{ success: true }>("/auth/signup", { method: "POST", body: JSON.stringify({ full_name, email, password }) }),
  logout: () => request<{ success: true }>("/auth/logout", { method: "POST" }),
  notes: () => request<Note[]>("/notes"),
  createNote: (title: string, content: string) => request<Note>("/notes", { method: "POST", body: JSON.stringify({ title, content }) }),
  updateNote: (id: string, title: string, content: string) => request<{ success: true }>(`/notes/${id}`, { method: "PUT", body: JSON.stringify({ title, content }) }),
  deleteNote: (id: string) => request<{ success: true }>(`/notes/${id}`, { method: "DELETE" }),
  assignments: () => request<Assignment[]>("/assignments"),
  createAssignment: (title: string, subject: string, due_date: string) => request<Assignment>("/assignments", { method: "POST", body: JSON.stringify({ title, subject, due_date }) }),
  updateAssignment: (id: string, update: Partial<Pick<Assignment, "status" | "pomodoros_completed">>) => request<{ success: true }>(`/assignments/${id}`, { method: "PATCH", body: JSON.stringify(update) }),
  deleteAssignment: (id: string) => request<{ success: true }>(`/assignments/${id}`, { method: "DELETE" }),
};
