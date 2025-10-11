import { create } from "zustand";

export const useAuthStore = create((set) => ({
  username: "",
  setUsername: (name) => set({ username: name }),
}));
