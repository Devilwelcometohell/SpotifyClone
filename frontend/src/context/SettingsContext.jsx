import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SettingsContext = createContext(null);
const STORAGE_KEY = "devilbeats_settings";
const defaults = { accent: "pink", visuals: true, autoplay: true, volume: 80, quality: "default", reducedMotion: false };

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(() => {
        try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
        catch { return defaults; }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        document.documentElement.dataset.accent = settings.accent;
        document.documentElement.classList.toggle("visuals-off", !settings.visuals);
        document.documentElement.classList.toggle("reduce-motion", settings.reducedMotion);
    }, [settings]);

    const value = useMemo(() => ({ settings, updateSettings: (changes) => setSettings((current) => ({ ...current, ...changes })), resetSettings: () => setSettings(defaults) }), [settings]);
    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() { return useContext(SettingsContext); }
