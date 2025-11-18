import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "light",

      setTheme: (value) => set({ theme: value }),
    }),
    {
      name: "app-settings",
    }
  )
);

// Sync Zustand store when localStorage changes (other tab)
window.addEventListener("storage", (event) => {
  if (event.key === "app-settings") {
    const newValue = event.newValue ? JSON.parse(event.newValue).state : null;

    if (newValue) {
      useSettingsStore.setState(newValue);
    }
  }
});
