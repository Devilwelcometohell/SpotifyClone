import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaBolt, FaPlay, FaRedo, FaTimes, FaVolumeUp } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useSettings } from "../../context/SettingsContext";

function SettingsModal({ open, onClose }) {
    const { settings, updateSettings, resetSettings } = useSettings();
    const [notice, setNotice] = useState("");

    const apply = (changes) => {
        updateSettings(changes);
        setNotice("Saved on this device");
        window.setTimeout(() => setNotice(""), 1800);
    };
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-md">
            <div className="my-auto w-full max-w-lg rounded-3xl border border-pink-500/30 bg-zinc-950/95 p-6 shadow-[0_0_55px_rgba(255,0,120,0.32)]">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-pink-400">Settings</p>
                        <h2 className="mt-1 text-2xl font-bold text-white">Tune your experience</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full border border-pink-500/20 p-2 text-gray-300 transition hover:bg-pink-500/20 hover:text-white"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="mt-6 space-y-3">
                    <SettingRow icon={<FaBolt className="text-pink-400" />} title="Accent colour" text="Personalize the glow across the app."><div className="flex gap-2">{[{ name: "pink", color: "#ec4899" }, { name: "cyan", color: "#22d3ee" }, { name: "violet", color: "#a78bfa" }].map(({ name, color }) => <button key={name} onClick={() => apply({ accent: name })} aria-label={`${name} accent`} style={{ backgroundColor: color }} className={`h-7 w-7 rounded-full ${settings.accent === name ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-950" : ""}`} />)}</div></SettingRow>
                    <SettingRow icon={<FaVolumeUp className="text-cyan-400" />} title="Default volume" text={`${settings.volume}% for new tracks.`}><input aria-label="Default volume" type="range" min="0" max="100" value={settings.volume} onChange={(event) => apply({ volume: Number(event.target.value) })} className="player-range w-28" /></SettingRow>
                    <SettingRow icon={<FaPlay className="text-violet-300" />} title="Playback quality" text="Applied when the next video starts."><select value={settings.quality} onChange={(event) => apply({ quality: event.target.value })} className="rounded-lg border border-white/15 bg-black px-2 py-1 text-sm text-white"><option value="default">Auto</option><option value="small">Data saver</option><option value="medium">Balanced</option><option value="hd720">High</option></select></SettingRow>
                    <ToggleRow icon={<FaPlay className="text-fuchsia-300" />} title="Autoplay" text="Start a selected track automatically." checked={settings.autoplay} onChange={(autoplay) => apply({ autoplay })} />
                    <ToggleRow icon={<FaWandMagicSparkles className="text-pink-300" />} title="Animated visuals" text="Enable glowing backgrounds and album motion." checked={settings.visuals} onChange={(visuals) => apply({ visuals })} />
                    <ToggleRow icon={<FaBolt className="text-cyan-300" />} title="Reduce motion" text="Limit animation for a calmer experience." checked={settings.reducedMotion} onChange={(reducedMotion) => apply({ reducedMotion })} />
                </div>

                <div className="mt-4 h-5 text-center text-xs text-cyan-300" role="status">{notice}</div>
                <div className="mt-2 flex gap-3"><button onClick={() => { resetSettings(); setNotice("Defaults restored"); }} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm text-white/70 hover:bg-white/10"><FaRedo /> Reset</button><button onClick={onClose} className="flex-1 rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-4 py-3 font-semibold text-white transition hover:scale-[1.01]">Done</button></div>
            </div>
        </div>,
        document.body
    );
}

function SettingRow({ icon, title, text, children }) { return <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/50 p-4"><div className="flex items-center gap-3"><span className="text-lg">{icon}</span><div><p className="font-semibold text-white">{title}</p><p className="text-sm text-gray-400">{text}</p></div></div>{children}</div>; }
function ToggleRow({ icon, title, text, checked, onChange }) { return <SettingRow icon={icon} title={title} text={text}><button onClick={() => onChange(!checked)} className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-pink-500" : "bg-white/15"}`} aria-pressed={checked}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`} /></button></SettingRow>; }

export default SettingsModal;
