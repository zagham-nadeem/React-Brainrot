import { useSettingsStore } from "../store/useSettingsStore";
import { Button } from "@/components/ui/button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useSettingsStore();

  return (
    <div style={{ padding: 20 }}>
      <h2>Current Theme: {theme}</h2>

      <Button onClick={() => setTheme("light")}>Light</Button>
      <Button onClick={() => setTheme("dark")} style={{ marginLeft: 10 }}>
        Dark
      </Button>
    </div>
  );
}
