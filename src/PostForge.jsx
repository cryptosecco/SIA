import { useState, useEffect, useRef } from "react";
import generalRule from "./rules/general.md?raw";
import discoveryRule from "./rules/discovery.md?raw";
import linkedinRule from "./rules/platforms/linkedin.md?raw";
import twitterRule from "./rules/platforms/twitter.md?raw";
import instagramRule from "./rules/platforms/instagram.md?raw";
import fitlineCatalog from "./kb/fitline_catalogo.json";

const SiaAvatar = ({ size = 36, expression = "neutral", style = {} }) => {
    // 1. User-provided images (priority)
    const imgSrc = `/avatars/sia_${expression === "default" ? "neutral" : expression}.png`;

    // 2. Fallback SVG generation (Indian/Fashion/Teal theme)
    const [useSvg, setUseSvg] = useState(false);

    // Skin Tone: Warm Indian/South Asian complexion
    const skinColor = "#D99E6B";
    const skinShadow = "#B98351";

    // Hair: Dark espresso with teal cyber-streak
    const hairColor = "#1a1a1a";
    const hairHighlight = "#2d2d2d";
    const cyberStreak = "#14b8a6"; // Brand teal

    // Fashion: Gold
    const gold = "#fbbf24";

    // Lips: Deep berry
    const lips = "#9f1239";

    const getEyes = () => {
        const lashColor = "#1a1a1a";
        const eyeWhite = "#fff";
        const iris = "#4b2c20"; // Dark brown

        const openEyePath = (cx) => (
            <g>
                <ellipse cx={cx} cy="48" rx="6" ry="3.5" fill={eyeWhite} />
                <circle cx={cx} cy="48" r="2" fill={iris} />
                <circle cx={cx + 0.5} cy="47.5" r="0.8" fill="#fff" opacity="0.6" />
                <path d={`M${cx - 5} 46 Q${cx} 42 ${cx + 6} 45`} fill="none" stroke={lashColor} strokeWidth="1.2" strokeLinecap="round" />
            </g>
        );

        if (expression === "wink") return (
            <g>
                {openEyePath(42)}
                <path d="M64 48 Q70 52 76 48" fill="none" stroke={lashColor} strokeWidth="1.5" strokeLinecap="round" />
            </g>
        );

        if (expression === "think") return (
            <g>
                <ellipse cx="42" cy="47" rx="6" ry="3.5" fill={eyeWhite} />
                <circle cx="44" cy="46" r="2" fill={iris} /> {/* Look up-right */}
                <path d="M37 45 Q42 41 48 44" fill="none" stroke={lashColor} strokeWidth="1.2" strokeLinecap="round" />

                <ellipse cx="70" cy="47" rx="6" ry="3.5" fill={eyeWhite} />
                <circle cx="72" cy="46" r="2" fill={iris} />
                <path d="M65 45 Q70 41 76 44" fill="none" stroke={lashColor} strokeWidth="1.2" strokeLinecap="round" />
            </g>
        );

        // Default / Smile
        return (
            <g>
                {openEyePath(42)}
                {openEyePath(70)}
            </g>
        );
    };

    const getMouth = () => {
        if (expression === "smile" || expression === "wink") return <path d="M46 68 Q56 74 66 68" fill="none" stroke={lips} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />;
        if (expression === "think") return <ellipse cx="56" cy="70" rx="3" ry="2" fill="none" stroke={lips} strokeWidth="2" />;
        return <path d="M48 70 Q56 72 64 70" fill="none" stroke={lips} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />;
    };

    if (!useSvg) {
        return (
            <img
                src={imgSrc}
                alt={`Sia ${expression}`}
                onError={() => setUseSvg(true)}
                style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(20,184,166,0.2)", ...style }}
            />
        );
    }

    return (
        <div style={{ width: size, height: size, borderRadius: size * 0.38, overflow: "hidden", ...style }}>
            <svg viewBox="0 0 112 112" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="skinGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={skinColor} />
                        <stop offset="100%" stopColor={skinShadow} />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Background - Deep Tech */}
                <rect width="112" height="112" fill="#0f172a" />
                <circle cx="56" cy="65" r="45" fill="url(#skinGrad)" /> {/* Face Base */}

                {/* Neck */}
                <path d="M42 95 Q56 105 70 95 L70 112 L42 112 Z" fill={skinShadow} />

                {/* Hair Back */}
                <path d="M20 60 Q15 20 56 15 Q97 20 92 60 L92 90 Q92 100 85 112 L27 112 Q20 100 20 90 Z" fill={hairColor} />

                {/* Face Shape */}
                <path d="M28 50 Q28 25 56 25 Q84 25 84 50 L84 70 Q84 95 56 105 Q28 95 28 70 Z" fill="url(#skinGrad)" />

                {/* Cyber Bindi / Tech Implant */}
                <path d="M54 38 L56 35 L58 38 L56 41 Z" fill={cyberStreak} filter="url(#glow)" />

                {/* Features */}
                {getEyes()}
                {getMouth()}
                <path d="M52 56 Q56 62 60 56" fill="none" stroke="#B98351" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" /> {/* Nose */}

                {/* Hair Front / Fashion */}
                <path d="M28 40 Q20 80 35 90" fill="none" stroke={hairColor} strokeWidth="12" strokeLinecap="round" />
                <path d="M84 40 Q92 80 77 90" fill="none" stroke={hairColor} strokeWidth="12" strokeLinecap="round" />

                {/* Cyber Streak - Fashion Element */}
                <path d="M28 40 Q25 60 30 80" fill="none" stroke={cyberStreak} strokeWidth="3" opacity="0.8" strokeLinecap="round" />

                {/* Gold Earrings */}
                <circle cx="26" cy="72" r="3" fill={gold} />
                <circle cx="86" cy="72" r="3" fill={gold} />
                <path d="M26 72 L26 85" stroke={gold} strokeWidth="1" />
                <path d="M86 72 L86 85" stroke={gold} strokeWidth="1" />

            </svg>
        </div>
    );
};

const LATE = "https://getlate.dev/api/v1";
const P = {
    twitter: { i: "𝕏", n: "Twitter/X", c: "#1DA1F2", lim: 280 },
    linkedin: { i: "in", n: "LinkedIn", c: "#0A66C2", lim: 3000 },
    instagram: { i: "◻", n: "Instagram", c: "#E4405F", lim: 2200 },
    facebook: { i: "f", n: "Facebook", c: "#1877F2", lim: 63206 },
    tiktok: { i: "♪", n: "TikTok", c: "#00F2EA", lim: 4000 },
    threads: { i: "@", n: "Threads", c: "#999", lim: 500 },
    bluesky: { i: "☁", n: "Bluesky", c: "#0085FF", lim: 300 },
    youtube: { i: "▶", n: "YouTube", c: "#FF0000", lim: 5000 },
    telegram: { i: "✈", n: "Telegram", c: "#26A5E4", lim: 4096 },
    pinterest: { i: "P", n: "Pinterest", c: "#E60023", lim: 500 },
};
const TIMES = [
    { k: "now", l: "Adesso" }, { k: "1h", l: "+1 ora" }, { k: "3h", l: "+3 ore" },
    { k: "6h", l: "+6 ore" }, { k: "tom9", l: "Domani 9:00" }, { k: "tom18", l: "Domani 18:00" },
    { k: "custom", l: "Scegli data" },
];
const PROMPTS = [
    { t: "🧪 Formula PAS", d: "Problema, Agitazione, Soluzione", p: "Voglio scrivere un post su [ARGOMENTO]. Usa la formula PAS (Problema, Agitazione, Soluzione).\n1) Esponi il problema.\n2) Metti il dito nella piaga.\n3) Presenta la mia soluzione." },
    { t: "🎣 Viral Hooks", d: "10 ganci che spaccano", p: "Scrivi 10 ganci virali per un post su [ARGOMENTO]. Devono essere sotto le 15 parole, emotivi e scatenare curiosità." },
    { t: "🧠 Socratic Coach", d: "Intervistami per capire meglio", p: "Fammi delle domande fin quando non ti senti pronto a procedere per scrivere il miglior post possibile su [ARGOMENTO]. Comportati come un esperto di copywriting." },
    { t: "👶 Eli5 Analogia", d: "Spiega come a un bambino", p: "Spiega [CONCETTO] come se fossi un bambino di 5 anni, usando un'analogia divertente e semplice." },
    { t: "🔥 Contrarian", d: "Opinione impopolare", p: "Scrivi un post che vada controcorrente rispetto all'opinione comune su [ARGOMENTO]. Sii educato ma deciso/provocatorio." },
    { t: "📖 Storytelling", d: "Micro-storia coinvolgente", p: "Trasforma questo fatto: '[FATTO]' in una micro-storia coinvolgente di 200 parole con una morale finale." },
];

const ST = {
    async get(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb } catch { return fb } },
    async set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch { } },
    async del(k) { try { localStorage.removeItem(k) } catch { } },
};

async function lateReq(m, path, key, body) {
    const o = { method: m, headers: { Authorization: `Bearer ${key}` } };
    if (body) { o.headers["Content-Type"] = "application/json"; o.body = JSON.stringify(body) }
    const r = await fetch(`${LATE}${path}`, o);
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(d?.message || d?.error || `Errore ${r.status}`);
    return d;
}

const StructBlock = ({ l, t, c }) => t ? (
    <div style={{
        position: "relative",
        padding: "10px 14px",
        borderRadius: 14,
        marginBottom: 6,
        background: `linear-gradient(to right, ${c}15 0%, ${c}05 50%, transparent 100%)`,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 20,
        borderLeft: `3px solid ${c}44`
    }}>
        <div style={{ fontSize: 13, whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#e0e0e8", flex: 1, lineHeight: 1.5, fontWeight: 500 }}>{t}</div>
        <div style={{
            fontSize: 9,
            fontWeight: 900,
            color: c || "#666",
            textTransform: "uppercase",
            letterSpacing: 1,
            background: `${c}15`,
            padding: "4px 8px",
            borderRadius: 6,
            border: `1px solid ${c}33`,
            whiteSpace: "nowrap",
            marginTop: 2,
            opacity: 0.8
        }}>{l.split(" ").slice(1).join(" ")}</div>
    </div>
) : null;


const OnboardingOverlay = ({ onComplete, isMobile }) => {
    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [fade, setFade] = useState(false);

    const handleNext = () => {
        setFade(true);
        setTimeout(() => {
            if (step < 3) {
                setStep(s => s + 1);
                setFade(false);
            } else {
                onComplete(name);
            }
        }, 300);
    };

    const steps = [
        {
            t: "Ciao, sono Sia ",
            d: "Il mio nome ha radici greche e significa saggezza, intesa come conoscenza profonda. Sono qui per aiutarti con i tuoi task quotidiani. Cominciamo?",
            i: <SiaAvatar size={160} expression="smile" style={{ boxShadow: "0 0 50px rgba(20,184,166,0.6)", animation: "float 6s ease-in-out infinite", marginTop: 20 }} />
        },
        {
            t: "Come ti chiami? 👋",
            d: "Dimmi il tuo nome così posso personalizzare la tua esperienza.",
            i: (
                <input
                    autoFocus
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Il tuo nome..."
                    onKeyDown={e => e.key === "Enter" && name && handleNext()}
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: 12, color: "#fff", fontSize: 18, width: "100%", textAlign: "center", outline: "none", marginTop: 20 }}
                />
            )
        },
        {
            t: "Conosco FitLine! 💪",
            d: "Sono preparata su FitLine e i suoi prodotti. Posso aiutarti a creare contenuti efficaci per promuoverli sui social e far crescere la tua attività.",
            i: <SiaAvatar size={160} expression="wink" style={{ marginTop: 20, boxShadow: "0 0 40px rgba(251,191,36,0.5)" }} />
        },
        {
            t: `Tutto pronto, ${name || "Amico"}! 🌟`,
            d: "Iniziamo a far crescere la tua presenza online con contenuti straordinari.",
            i: <div style={{ fontSize: 40, marginTop: 20, animation: "bounce 1s infinite" }}>🚀</div>
        }
    ];

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(5,5,10,0.9)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="glass onboarding-container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: fade ? 0 : 1, transform: fade ? "scale(0.95)" : "scale(1)", transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                <div key={step} className="animate-slide-up-fade" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
                    {step === 0 && <SiaAvatar size={isMobile ? 180 : 160} expression="smile" style={{ boxShadow: "0 0 50px rgba(20,184,166,0.6)", animation: "float 6s ease-in-out infinite", marginBottom: 20 }} imageClass="onboarding-avatar-large" />}
                    <h2 className="onboarding-title" style={{ fontWeight: 800, margin: 0, background: "linear-gradient(to right, #fff, #5eead4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{steps[step].t}</h2>
                    <p className="onboarding-desc" style={{ color: "#aaa", lineHeight: 1.6, margin: 0 }}>{steps[step].d}</p>
                    {step !== 0 && steps[step].i}
                </div>
                <div style={{ display: "flex", gap: 4, marginTop: 20 }}>
                    {steps.map((_, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: 4, background: i === step ? "#14b8a6" : "#333", transition: "all .5s cubic-bezier(0.4, 0, 0.2, 1)", transform: i === step ? "scale(1.2)" : "scale(1)" }} />)}
                </div>
                <button
                    onClick={handleNext}
                    disabled={step === 1 && !name}
                    className="hover-lift"
                    style={{
                        marginTop: 20, padding: "14px 32px", borderRadius: 16, border: "none",
                        background: (step === 1 && !name) ? "#333" : "linear-gradient(135deg,#14b8a6,#0d9488)",
                        color: (step === 1 && !name) ? "#666" : "#fff",
                        fontSize: 16, fontWeight: 700, cursor: (step === 1 && !name) ? "default" : "pointer",
                        boxShadow: (step === 1 && !name) ? "none" : "0 8px 24px rgba(20,184,166,0.4)",
                        width: "100%",
                        transition: "all .3s ease",
                        opacity: (step === 1 && !name) ? 0.5 : 1
                    }}>
                    {step === 3 ? "Iniziamo!" : step === 0 ? "Piacere! →" : "Avanti →"}
                </button>
            </div>
        </div>
    );
};

function Bubble({ role, text, images, onApprove, onDiscard, onRegenerate, send, accs = [] }) {
    const u = role === "user";
    let content = text;
    let vars = null;
    let struct = null;
    const [selVars, setSelVars] = useState(new Set());

    useEffect(() => {
        if (!u && text) {
            try {
                const j = safeParseJSON(text);
                if (j.structured || j.main) {
                    const s = j.structured || {};
                    const stdKeys = ["hook", "qualify", "context", "value", "bridge", "cta", "disclosure"];
                    const structText = stdKeys.map(k => s[k]).filter(Boolean).join("\n\n") ||
                        Object.keys(s).filter(k => !stdKeys.includes(k)).map(k => s[k]).filter(Boolean).join("\n\n");

                    const hasValidStruct = !!structText;
                    struct = hasValidStruct ? s : null;
                    content = structText || j.main || text;
                    vars = j.variations;
                    setSelVars(new Set(Object.keys(j.variations || {})));
                } else {
                    content = j.main || text;
                }
            } catch { }
        }
    }, [text, u]);

    // Parse again for rendering
    if (!u && !struct) {
        try {
            const j = safeParseJSON(text);
            if (j.structured || j.main) {
                const s = j.structured || {};
                // Include ALL keys in the text content, prioritized by stdKeys
                const stdKeys = ["hook", "qualify", "context", "value_points", "value", "bridge", "cta", "disclosure", "content_structure_reel", "caption_instagram", "strategic_notes"];
                const otherKeys = Object.keys(s).filter(k => !stdKeys.includes(k) && k !== 'variations' && k !== 'platform');

                // Helper to stringify complex values for text copy
                const stringifyVal = (v) => {
                    if (typeof v === 'string') return v;
                    if (Array.isArray(v)) return v.map(i => typeof i === 'object' ? Object.values(i).join(": ") : i).join("\n");
                    return JSON.stringify(v, null, 2);
                };

                const structText = [...stdKeys, ...otherKeys]
                    .map(k => s[k] ? stringifyVal(s[k]) : null)
                    .filter(Boolean)
                    .join("\n\n");

                const hasValidStruct = Object.keys(s).length > 0;
                struct = hasValidStruct ? s : null;
                content = structText || j.main || text;
                vars = j.variations;
            } else {
                content = j.main || text;
            }
        } catch { }
    }

    const toggleVar = (k) => {
        setSelVars(prev => {
            const n = new Set(prev);
            if (n.has(k)) n.delete(k); else n.add(k);
            return n;
        });
    };

    return (
        <div className="animate-fadeInUp" style={{ display: "flex", flexDirection: u ? "row-reverse" : "row", gap: 14, marginBottom: 28, padding: "0 12px" }}>
            {u ? (
                <div style={{ width: 36, height: 36, borderRadius: 14, background: "linear-gradient(135deg,#3b82f6,#60a5fa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, boxShadow: "0 4px 20px rgba(59,130,246,0.3)" }}>👤</div>
            ) : (
                <SiaAvatar size={36} expression="smile" style={{ flexShrink: 0, boxShadow: "0 4px 20px rgba(20,184,166,0.3)" }} />
            )}
            <div style={{ maxWidth: "85%", display: "flex", flexDirection: "column", gap: 10 }}>
                {images?.length > 0 && <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: u ? "flex-end" : "flex-start" }}>{images.map((s, i) => <img key={i} src={s} style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }} />)}</div>}

                <div className="glass-card" style={{ padding: "18px 22px", borderRadius: 22, background: u ? "linear-gradient(135deg, rgba(59,130,246,0.9), rgba(37,99,235,0.9))" : "rgba(30,30,46,0.8)", backdropFilter: "blur(20px)", color: "#e0e0e8", borderTopRightRadius: u ? 6 : 22, borderTopLeftRadius: u ? 22 : 6, boxShadow: u ? "0 8px 32px rgba(59,130,246,0.25)" : "0 8px 32px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {struct ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {Object.entries(struct).map(([k, v]) => {
                                if (!v || k === 'variations' || k === 'main' || k === 'platform') return null;
                                const LABELS = {
                                    hook: "🪝 Hook", qualify: "🎯 Qualifica", context: "🧠 Contesto", value: "💎 Valore",
                                    value_points: "💎 Value Points", bridge: "🌉 Bridge", cta: "📣 CTA", disclosure: "⚠️ Disclosure",
                                    content_structure_reel: "🎬 Reel Script", caption_instagram: "📸 Caption IG", strategic_notes: "💡 Note Strategiche"
                                };
                                const COLORS = {
                                    hook: "#ec4899", qualify: "#a855f7", context: "#3b82f6", value: "#10b981",
                                    value_points: "#14b8a6", bridge: "#f59e0b", cta: "#ef4444", disclosure: "#64748b",
                                    content_structure_reel: "#f43f5e", caption_instagram: "#8b5cf6", strategic_notes: "#6366f1"
                                };
                                const label = LABELS[k] || `📝 ${k.charAt(0).toUpperCase() + k.slice(1)}`;
                                const col = COLORS[k] || "#a5b4fc";
                                const valStr = typeof v === 'string' ? v : (
                                    Array.isArray(v) ? v.map(i => {
                                        if (typeof i === 'object') {
                                            return Object.entries(i).map(([sk, sv]) => `• ${sk}: ${sv}`).join("\n");
                                        }
                                        return typeof i === 'string' ? `• ${i}` : JSON.stringify(i);
                                    }).join("\n\n")
                                        : (typeof v === 'object' ? Object.entries(v).map(([sk, sv]) => `**${sk}**: ${sv}`).join("\n") : JSON.stringify(v, null, 2))
                                );
                                const cleanStr = valStr.replace(/\*\*/g, ""); // Remove bold asterisks for simple rendering
                                return <StructBlock key={k} l={label} t={cleanStr} c={col} />;
                            })}
                        </div>
                    ) : (
                        <div style={{ fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{content}</div>
                    )}
                </div>

                {/* VISIBILITY LOGIC: Now we can approve as soon as we have a structured master post */}
                {!u && struct ? (
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <button onClick={() => onApprove(content, vars || {}, selVars, struct)} style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid #22c55e44", background: "linear-gradient(135deg, #22c55e22, #22c55e11)", color: "#22c55e", fontSize: 13, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", gap: 6, transition: "all .2s", boxShadow: "0 4px 12px rgba(34,197,94,0.1)" }}>
                            <span>✨</span> Usa questi contenuti
                        </button>
                        <button onClick={onRegenerate} style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid #ffffff22", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                            <span>🔄</span> Rigenera
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function AccCard({ acc, sel, onTog }) {
    const p = P[acc.platform] || { i: "?", n: acc.platform, c: "#666" };
    return (
        <button onClick={onTog} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, border: sel ? `2px solid ${p.c}` : "2px solid transparent", background: sel ? `${p.c}12` : "#141420", cursor: "pointer", width: "100%", textAlign: "left", transition: "all .15s" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: sel ? p.c : "#252535", color: sel ? "#fff" : "#777", fontSize: 15, fontWeight: 800, transition: "all .15s", fontFamily: "inherit" }}>{p.i}</div>
            <div style={{ flex: 1 }}><div style={{ color: "#ddd", fontSize: 14, fontWeight: 600 }}>{p.n}</div><div style={{ color: "#666", fontSize: 12 }}>@{acc.username || acc.displayName || "account"}</div></div>
            <div style={{ width: 22, height: 22, borderRadius: 7, border: `2px solid ${sel ? p.c : "#333"}`, background: sel ? p.c : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, transition: "all .15s" }}>{sel ? "✓" : ""}</div>
        </button>
    );
}

function Sec({ title, children }) {
    return (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 }}>{title}</div><div style={{ background: "#0f0f1a", borderRadius: 14, padding: 14, border: "1px solid #1a1a28" }}>{children}</div></div>);
}

// THEMES CONFIGURATION
const THEMES = {
    chat: { c: "#6366f1", g: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", t: "Creatività" },
    publish: { c: "#10b981", g: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)", t: "Pubblicazione" },
    calendar: { c: "#0ea5e9", g: "linear-gradient(135deg, #0c4a6e 0%, #075985 100%)", t: "Calendario" },
    history: { c: "#f59e0b", g: "linear-gradient(135deg, #451a03 0%, #78350f 100%)", t: "Storico" },
    settings: { c: "#64748b", g: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", t: "Impostazioni" }
};

const NAV_ITEMS = [
    { id: "chat", i: "✨", ic: "💬", l: "Crea" },
    { id: "publish", i: "🚀", ic: "📤", l: "Pubblica" },
    { id: "calendar", i: "📅", ic: "📅", l: "Calendario" },
    { id: "history", i: "📜", ic: "📋", l: "Storico" },
    { id: "settings", i: "⚙️", ic: "⚙️", l: "Settings" }
];

function Sia() {
    const [view, setView] = useState("chat");
    const theme = THEMES[view] || THEMES.chat;
    const [apiKey, setApiKey] = useState("");
    const [keyIn, setKeyIn] = useState("");
    const [anthropicKey, setAnthropicKey] = useState("");
    const [antKeyIn, setAntKeyIn] = useState("");
    const [accs, setAccs] = useState([]);
    const [models, setModels] = useState([]);
    const [loadingA, setLoadingA] = useState(false);
    const [selModel, setSelModel] = useState("claude-haiku-4-5");
    const [sysPrompt, setSysPrompt] = useState(`Sei un copywriter senior per marketing Web3/tech/startup. Diretto, incisivo, zero filler.
- Genera SEMPRE contenuti pronti da pubblicare, non fare domande inutili.
- NON usare markdown nei post (no **, ##, backtick). Emoji con moderazione.
- Rispondi in italiano se non specificato. Hook forte nella prima riga.
- Se mandi immagini, descrivile e usale come contesto.
- Se servono varianti per piattaforme, separale con il nome.`);
    const [kbFiles, setKbFiles] = useState([
        { name: "FitLine Catalogo Prodotti (IT)", content: JSON.stringify(fitlineCatalog, null, 2) }
    ]);
    const [showPrompts, setShowPrompts] = useState(false);
    const [sTab, setSTab] = useState("content");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [condensedMode, setCondensedMode] = useState(true);

    useEffect(() => {
        const h = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", h);
        return () => window.removeEventListener("resize", h);
    }, []);





    const [msgs, setMsgs] = useState([]);
    const [hist, setHist] = useState([]);
    const [feedbackLog, setFeedbackLog] = useState([]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);

    const handleRegenerate = async (msgIndex) => {
        if (sending) return;
        const history = msgs.slice(0, msgIndex);
        const lastUser = [...history].reverse().find(m => m.role === 'user');
        if (lastUser) {
            setMsgs(history);
            // Pass the explicit history to avoid state race conditions
            await send(null, lastUser.display, true, history);
        }
    };
    const [files, setFiles] = useState([]);
    const [fprev, setFprev] = useState([]);
    const chatEnd = useRef(null);
    const fInput = useRef(null);
    const tArea = useRef(null);

    const [draft, setDraft] = useState("");
    const [draftVars, setDraftVars] = useState(null);
    const [draftStruct, setDraftStruct] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editTxt, setEditTxt] = useState("");
    const [sel, setSel] = useState(new Set());
    const [timeK, setTimeK] = useState("now");
    const [custDT, setCustDT] = useState("");

    // NEW STATE FOR PER-PLATFORM EDITING
    const [platformStates, setPlatformStates] = useState({}); // { [accId]: { content: "", timeK: "now", custDT: "" } }

    const [pubing, setPubing] = useState(false);
    const [pubRes, setPubRes] = useState(null);
    const [user, setUser] = useState(null); // { name: "", onboarded: false }

    // Calendar State
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const d = new Date();
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(d.setDate(diff));
    });

    useEffect(() => {
        ST.get("pf_user").then(u => {
            if (u) setUser(u);
            else setUser({ name: "", onboarded: false });
        });
    }, []);

    const handleOnboardingComplete = (name) => {
        const u = { name, onboarded: true };
        setUser(u);
        ST.set("pf_user", u);
    };

    useEffect(() => {

        ST.get("pf_enc").then(k => setApiKey(k || ""));
        ST.get("pf_accs", []).then(setAccs);
        ST.get("pf_hist", []).then(setHist);
        ST.get("pf_feedback", []).then(setFeedbackLog);

        (async () => {
            const k = await ST.get("pf_key", ""); // This is now pf_enc
            const ak = await ST.get("pf_ant_key", "");
            const m = "claude-haiku-4-5";
            // const h = await ST.get("pf_hist", []); // Already handled above
            // const fb = await ST.get("pf_feedback", []); // Already handled above
            if (k) { setApiKey(k); setKeyIn(k); loadAcc(k) }
            if (ak) { setAnthropicKey(ak); setAntKeyIn(ak); loadModels(ak); }
            const sp = await ST.get("pf_sys_prompt", null);
            if (sp) setSysPrompt(sp);
            const kb = await ST.get("pf_kb", []);
            setKbFiles(kb);
            setSelModel(m);
        })()
    }, []);

    useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }) }, [msgs, sending]);

    async function loadAcc(k) {
        setLoadingA(true);
        try { const d = await lateReq("GET", "/accounts", k); setAccs(d.accounts || d || []) } catch { setAccs([]) }
        setLoadingA(false);
    }
    async function loadModels(k) {
        try {
            const r = await fetch("http://localhost:3000/api/models", { headers: { "x-api-key": k, "anthropic-beta": "fast-mode-2026-02-01" } });
            const d = await r.json();
            if (d.data) setModels(d.data.filter(m => m.type === "model").sort((a, b) => b.created_at - a.created_at));
        } catch { }
    }
    async function saveKey() { const k = keyIn.trim(); if (!k) return; setApiKey(k); await ST.set("pf_key", k); loadAcc(k) }
    async function saveAntKey() { const k = antKeyIn.trim(); if (!k) return; setAnthropicKey(k); await ST.set("pf_ant_key", k); loadModels(k); }
    async function disc() { setApiKey(""); setKeyIn(""); setAnthropicKey(""); setAntKeyIn(""); setAccs([]); await ST.del("pf_key"); await ST.del("pf_ant_key"); await ST.del("pf_model"); await ST.del("pf_sys_prompt"); await ST.del("pf_kb"); }
    async function saveModel(m) { setSelModel(m); await ST.set("pf_model", m); }
    async function saveSysPrompt(p) { setSysPrompt(p); await ST.set("pf_sys_prompt", p); }
    async function addKb(e) {
        const files = Array.from(e.target.files || []);
        const newKb = [];
        for (const f of files) {
            if (f.type.startsWith("text/") || f.name.endsWith(".md") || f.name.endsWith(".txt") || f.name.endsWith(".csv")) {
                const text = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsText(f); });
                newKb.push({ name: f.name, content: text });
            }
        }
        const updated = [...kbFiles, ...newKb];
        setKbFiles(updated);
        await ST.set("pf_kb", updated);
        e.target.value = "";
    }
    async function remKb(i) {
        const updated = kbFiles.filter((_, j) => j !== i);
        setKbFiles(updated);
        await ST.set("pf_kb", updated);
    }

    function addF(e) { const nf = Array.from(e.target.files || []); setFiles(p => [...p, ...nf]); setFprev(p => [...p, ...nf.map(f => f.type.startsWith("image/") ? URL.createObjectURL(f) : null)]); e.target.value = "" }
    function remF(i) { if (fprev[i]) URL.revokeObjectURL(fprev[i]); setFiles(p => p.filter((_, j) => j !== i)); setFprev(p => p.filter((_, j) => j !== i)) }
    function toB64(f) { return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result.split(",")[1]); r.onerror = rej; r.readAsDataURL(f) }) }

    async function send(targetPlat = null, overrideTxt = null, isRegen = false, historyOverride = null) {
        const txt = overrideTxt !== null ? overrideTxt : input.trim();
        if (!txt && !files.length && !targetPlat) return;
        if (sending) return;

        let content = []; const imgP = [];
        if (!targetPlat) {
            for (const f of files) {
                if (f.type.startsWith("image/")) {
                    content.push({ type: "image", source: { type: "base64", media_type: f.type, data: await toB64(f) } });
                    imgP.push(URL.createObjectURL(f))
                } else content.push({ type: "text", text: `[📎 ${f.name}, ${(f.size / 1048576).toFixed(1)}MB]` })
            }
            if (txt) content.push({ type: "text", text: String(txt) });
        } else {
            content = [{ type: "text", text: `Genera ora la variazione specifica per ${targetPlat} basandoti sulla struttura master approvata.` }];
        }

        const disp = String(txt) + (files.length ? `\n📎 ${files.length} file` : "");
        const baseMsgs = historyOverride || msgs;

        // nm is the state history. For targetPlat, we don't ADD to msgs, but we DO pass it to finalMsgs for the API.
        const nm = (targetPlat || isRegen) ? baseMsgs : [...baseMsgs, { role: "user", content, display: disp, images: imgP }];

        // Instruction for the API call (not saved to state if targetPlat)
        const apiMsgs = targetPlat ? [...nm, { role: "user", content }] : nm;

        if (!targetPlat && !isRegen) setMsgs(nm);
        setInput("");
        setSending(targetPlat || true);
        if (tArea.current) tArea.current.style.height = "auto";

        // AGENT/RULES SYSTEM PROMPT CONSTRUCTION
        let systemMsg = (user?.name ? `USER NAME: ${user.name}\n\n` : "") + generalRule + "\n\n" + discoveryRule;

        // Dynamic Platform Rules
        const connectedPlatforms = [...new Set(accs.map(a => a.platform))];
        // Skip variations by default on initial request to save tokens
        const platformsToGen = targetPlat ? [targetPlat] : [];

        const platformRulesMap = { linkedin: linkedinRule, twitter: twitterRule, instagram: instagramRule };
        platformsToGen.forEach(p => {
            if (platformRulesMap[p]) systemMsg += "\n\n" + platformRulesMap[p];
        });

        systemMsg += `\n\n[CONTEXT]
Target Platforms for this response: ${platformsToGen.join(", ") || "None (Generate Master only)"}.

MODE: ${condensedMode ? "CONDENSED (PUNCHLINE)" : "STRUCTURED (FULL)"}
${condensedMode ? `
OUTPUT FORMAT: Return a valid JSON object: {"main": "Your short post content here..."}
INSTRUCTION: Scrivi un post breve, incisivo e diretto. 
- Max 280 caratteri o 3 righe.
- Niente filler, vai dritto al punto.
- Stile "Twitter/X" o "LinkedIn one-liner".
- NON usare chiavi "structured". Solo "main".
` : `
OUTPUT FORMAT: Return a valid JSON object.
- If more info is needed: {"discovery": true, "questions": ["Question 1", "Question 2"]}
- If generating content: {"structured": {...}, "variations": {${platformsToGen.map(p => `"${p}": "..."`).join(", ")}}}

IMPORTANT: Se non sono specificate 'Target Platforms', non generare la chiave 'variations' o lasciala vuota. 
Concentrati solo sul 'structured' (MASTER POST).
`}

IMPORTANT: Return ONLY valid JSON. No preamble. No markdown code blocks unless inside the JSON string.
`;

        if (sysPrompt) systemMsg += "\n\n[USER CUSTOM INSTRUCTIONS]\n" + sysPrompt;

        if (feedbackLog.length > 0) {
            const pos = feedbackLog.filter(f => f.type === "positive").slice(-3).map(f => f.text.slice(0, 50) + "...").join("\n");
            systemMsg += `\n\n[FEEDBACK MEMORY] User prefers: ${pos}`;
        }

        if (kbFiles.length > 0) {
            systemMsg += "\n\n[KNOWLEDGE BASE]\n";
            kbFiles.forEach(f => systemMsg += `--- ${f.name} ---\n${f.content}\n`);
        }

        if (nm.length === 0) {
            setSending(false);
            return;
        }

        try {
            // Filter out error messages and ensure history is valid for Anthropic (starts with user)
            let finalMsgs = apiMsgs.filter(m => !(m.role === 'assistant' && typeof m.content === 'string' && m.content.startsWith('❌'))).map(m => ({ role: m.role, content: m.content }));

            // Anthropic requires the first message to be from 'user'
            while (finalMsgs.length > 0 && finalMsgs[0].role !== 'user') finalMsgs.shift();

            if (finalMsgs.length === 0) {
                // If we have nothing left, we must at least send the current user message as a standalone if it exists
                const userMsg = nm.find(m => m.role === 'user');
                if (userMsg) finalMsgs = [{ role: 'user', content: userMsg.content }];
                else { setSending(false); return; }
            }

            const r = await fetch("http://localhost:3000/api/chat", {
                method: "POST", headers: { "Content-Type": "application/json", "x-api-key": anthropicKey, "anthropic-beta": "fast-mode-2026-02-01" }, body: JSON.stringify({
                    model: selModel, max_tokens: 1500,
                    system: systemMsg,
                    messages: finalMsgs,
                })
            });
            const data = await r.json();
            if (data.error) throw new Error(data.error.message);
            const reply = data.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "Errore risposta";

            // Handle Discovery vs Generation
            const j = safeParseJSON(reply);
            if (j.discovery) {
                // Discovery mode: AI asks questions
                const qs = Array.isArray(j.questions) ? j.questions : [];
                const qText = "🤔 Ho bisogno di qualche dettaglio in più per fare un lavoro eccellente:\n\n" + qs.map(q => {
                    const txt = typeof q === 'object' ? (q.text || q.question || JSON.stringify(q)) : q;
                    return `- ${txt}`;
                }).join("\n");
                setMsgs(p => [...p, { role: "assistant", content: reply, display: qText }]);
            } else if (targetPlat) {
                // On-demand variation: Update the last assistant message and relevant platform state
                const newVar = j.variations?.[targetPlat];
                setMsgs(prev => {
                    const next = [...prev];
                    const last = { ...next[next.length - 1] };
                    try {
                        const parsed = safeParseJSON(last.content);
                        parsed.variations = { ...parsed.variations, [targetPlat]: newVar };
                        last.content = JSON.stringify(parsed);
                        next[next.length - 1] = last;
                    } catch (e) { console.error("Update var error", e) }
                    return next;
                });

                // ALSO Update platformStates if we are in publish view
                if (newVar) {
                    setPlatformStates(prev => {
                        const next = { ...prev };
                        // Find the account ID for this platform
                        const acc = accs.find(a => a.platform === targetPlat);
                        if (acc && next[acc._id]) {
                            // AUTO SELECT after generation
                            const vContent = extractContent(newVar);
                            next[acc._id] = { ...next[acc._id], content: vContent };
                            setSel(s => new Set(s).add(acc._id));
                        }
                        return next;
                    });
                }
            } else {
                setMsgs(p => [...p, { role: "assistant", content: reply, display: reply }]);
            }
        } catch (e) {
            console.error(e);
            setMsgs(p => [...p, { role: "assistant", content: `❌ ${e.message}`, display: `❌ ${e.message}` }]);
        }
        setSending(false);
    }


    function hInput(e) { setInput(e.target.value); const t = tArea.current; if (t) { t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 120) + "px" } }

    function getSchedTime() {
        const now = new Date(); const ms = { "1h": 36e5, "3h": 108e5, "6h": 216e5 };
        if (timeK === "now") return null;
        if (ms[timeK]) return new Date(now.getTime() + ms[timeK]);
        if (timeK === "tom9") { const d = new Date(now); d.setDate(d.getDate() + 1); d.setHours(9, 0, 0, 0); return d }
        if (timeK === "tom18") { const d = new Date(now); d.setDate(d.getDate() + 1); d.setHours(18, 0, 0, 0); return d }
        if (timeK === "custom" && custDT) return new Date(custDT);
        return null;
    }

    async function doPublish() {
        const content = editing ? editTxt : draft;
        if (!content || !sel.size || !apiKey) return;
        setPubing(true); setPubRes(null);
        try {
            let media = [];
            for (const f of files) {
                const pre = await lateReq("POST", "/media/presign", apiKey, { filename: f.name, contentType: f.type, size: f.size });
                await fetch(pre.uploadUrl, { method: "PUT", body: f, headers: { "Content-Type": f.type } });
                media.push({ type: pre.type || (f.type.startsWith("video") ? "video" : "image"), url: pre.publicUrl });
            }
            const platforms = Array.from(sel).map(id => {
                const a = accs.find(x => x._id === id); const m = P[a?.platform];
                const t = { platform: a?.platform, accountId: id };

                // INTELLIGENT VARIATION PICKING
                let cContent = content;
                // Use the edited state if available, otherwise fallback to initial draft vars
                if (platformStates[id]?.content) {
                    cContent = platformStates[id].content;
                } else if (!editing && draftVars && draftVars[a?.platform]) {
                    cContent = extractContent(draftVars[a?.platform]);
                }

                if (m?.lim && cContent.length > m.lim) t.customContent = cContent.slice(0, m.lim - 1) + "…";
                else if (cContent !== content) t.customContent = cContent; // Explicitly set if different from main

                // Check for individual scheduling
                const indivTimeK = platformStates[id]?.timeK;
                if (indivTimeK && indivTimeK !== "now") {
                    // Calculate individual scheduled time
                    const now = new Date(); const ms = { "1h": 36e5, "3h": 108e5, "6h": 216e5 };
                    if (ms[indivTimeK]) t.scheduledFor = new Date(now.getTime() + ms[indivTimeK]).toISOString();
                    else if (indivTimeK === "tom9") { const d = new Date(now); d.setDate(d.getDate() + 1); d.setHours(9, 0, 0, 0); t.scheduledFor = d.toISOString(); }
                    else if (indivTimeK === "tom18") { const d = new Date(now); d.setDate(d.getDate() + 1); d.setHours(18, 0, 0, 0); t.scheduledFor = d.toISOString(); }
                }

                return t;
            });

            // Determine global scheduled time (if any)
            // If all platforms have individual times, this might be redundant but safe
            const st = getSchedTime();
            const body = { content, platforms, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Rome" };
            if (media.length) body.mediaItems = media;

            // If timeK is "now", we publish immediately (unless individual platforms override)
            if (timeK === "now") body.publishNow = true;
            else if (st) body.scheduledFor = st.toISOString();
            const res = await lateReq("POST", "/posts", apiKey, body);
            const pid = res.post?._id || "ok";
            const pn = Array.from(sel).map(id => { const a = accs.find(x => x._id === id); return P[a?.platform]?.n || a?.platform });
            // Simulate receiving a URL from the API response (assuming 'd' contains it, or we fallback)
            // In a real scenario, 'd' (from lateReq) should contain the permalink or ids.
            // For now, let's assume if it's "now", we might get a url. If not, we don't.
            // Since we don't know the exact response structure of 'd' for success, we'll try to find a 'url' or 'permalink' property.
            // Adjust this based on actual API response.
            const pubUrl = res.url || res.permalink || (res.posts && res.posts[0]?.url) || null;

            const entry = { id: pid, date: new Date().toISOString(), content: content.slice(0, 100), platforms: pn, scheduled: st?.toISOString(), mediaCount: media.length, status: timeK === "now" ? "published" : "scheduled", url: pubUrl };
            const nh = [entry, ...hist].slice(0, 50); setHist(nh); await ST.set("pf_hist", nh);
            setPubRes({ ok: true, id: pid, sched: st, platforms: pn }); setFiles([]); setFprev([]);
        } catch (e) { setPubRes({ ok: false, err: e.message }) }
        setPubing(false);
    }

    const bs = { padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 };

    async function handleApprove(text, vars, selVars, struct) {
        setDraft(text);
        setDraftVars(vars);
        setDraftStruct(struct);
        setEditTxt(text);
        setView("publish");
        setPubRes(null);
        setEditing(false);

        // AUTO SELECT ACCOUNTS BASED ON CHAT SELECTION
        if (selVars && selVars.size > 0) {
            const newSel = new Set();
            accs.forEach(a => {
                if (selVars.has(a.platform)) {
                    newSel.add(a._id);
                }
            });
            setSel(newSel);
        } else {
            // If nothing is selected, we could select ALL or NONE. Let's do NONE and force user to pick.
            setSel(new Set());
        }

        // INIT PLATFORM STATES
        const ps = {};
        accs.forEach(a => {
            let content = ""; // On-demand: start empty to show "Genera" button
            if (vars && vars[a.platform]) {
                content = extractContent(vars[a.platform]);
            }
            ps[a._id] = { content: content || "", timeK: "now", custDT: "" };
        });
        setPlatformStates(ps);

        const nfb = [...feedbackLog, { type: "positive", text, date: Date.now() }].slice(-20);
        setFeedbackLog(nfb);
        await ST.set("pf_feedback", nfb);
    }

    async function handleDiscard(text) {
        setMsgs(p => p.filter(m => m.display !== text)); // Remove from chat to clean up
        const nfb = [...feedbackLog, { type: "negative", text, date: Date.now() }].slice(-20);
        setFeedbackLog(nfb);
        await ST.set("pf_feedback", nfb);
    }

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: isMobile ? "column" : "row", background: "linear-gradient(135deg, #05050a 0%, #0a0a15 50%, #0d0d1a 100%)", fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif", color: "#e0e0e8", overflow: "hidden", position: "relative" }}>

            {/* Aurora Background Orbs */}
            <div className="aurora-orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)", top: -100, left: -100 }} />
            <div className="aurora-orb" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)", bottom: 100, right: -50, animationDelay: "-5s" }} />
            <div className="aurora-orb" style={{ width: 250, height: 250, background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)", top: "50%", left: "30%", animationDelay: "-10s" }} />

            {/* DESKTOP SIDEBAR */}
            {!isMobile && (
                <div className="glass" style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", padding: 24, margin: 16, marginRight: 0, background: "rgba(15,15,25,0.8)", backdropFilter: "blur(24px)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, paddingLeft: 8 }}>
                        <SiaAvatar size={40} style={{ boxShadow: "0 0 30px rgba(20,184,166,0.4)", animation: "pulse-glow 3s ease-in-out infinite" }} />
                        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: -.5, background: "linear-gradient(to right, #fff, #5eead4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sia</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {NAV_ITEMS.map(n => (
                            <button key={n.id} onClick={() => { setView(n.id); if (n.id === "publish") setPubRes(null) }}
                                className="hover-lift"
                                style={{
                                    display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 16, border: "none",
                                    background: view === n.id ? `${THEMES[n.id].c}15` : "transparent",
                                    cursor: "pointer", color: view === n.id ? "#fff" : "#888",
                                    textAlign: "left", fontSize: 14, fontWeight: 600,
                                    boxShadow: view === n.id ? `0 4px 20px ${THEMES[n.id].c}22` : "none",
                                    borderLeft: view === n.id ? `3px solid ${THEMES[n.id].c}` : "3px solid transparent"
                                }}>
                                <span style={{ fontSize: 20, filter: view === n.id ? `drop-shadow(0 0 8px ${THEMES[n.id].c}cc)` : "none", transition: "all .3s" }}>{n.ic}</span>
                                {n.l}
                            </button>
                        ))}
                    </div>
                    <div style={{ marginTop: "auto", padding: "16px", background: "#13131d", borderRadius: 16, border: "1px solid #ffffff05" }}>
                        <div style={{ fontSize: 11, color: "#666", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>Account Attivi</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#aaa", fontSize: 13 }}>
                            <span style={{ width: 8, height: 8, borderRadius: 4, background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
                            {accs.length} collegati
                        </div>
                    </div>
                </div>
            )}

            <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", background: "radial-gradient(circle at 50% 0%, #1e1e2e44, transparent 70%)" }}>

                {/* MOBILE HEADER */}
                {isMobile && (
                    <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#05050acc", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 10, borderBottom: "1px solid #ffffff05" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <SiaAvatar size={32} />
                            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: -.5 }}>Sia</span>
                        </div>
                        {apiKey && <div style={{ width: 8, height: 8, borderRadius: 4, background: "#22c55e" }} />}
                    </div>
                )}


                {/* ONBOARDING */}
                {!apiKey && view !== "settings" && (
                    <OnboardingOverlay onComplete={handleOnboardingComplete} isMobile={isMobile} />
                )}

                {/* CHAT */}
                {apiKey && view === "chat" && (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <div style={{ flex: 1, overflowY: "auto", padding: "14px 10px" }}>
                            {msgs.length === 0 && (
                                <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
                                    <div style={{ fontSize: 64, marginBottom: 24, opacity: 0.8, filter: "drop-shadow(0 0 30px #6366f133)" }}>✨</div>
                                    <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 12px", background: `linear-gradient(to bottom, #fff, ${theme.c})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                        {user?.name ? `Ciao ${user.name}, cosa creiamo oggi?` : "Cosa vuoi creare oggi?"}
                                    </h2>
                                    <p style={{ fontSize: 15, color: "#666", marginBottom: 40, maxWidth: 400, margin: "0 auto 40px", lineHeight: 1.6 }}>Libera la tua creatività e lascia che l'AI faccia il lavoro pesante per te.</p>

                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                                        {PROMPTS.map((p, i) => (
                                            <button key={i} onClick={() => { setInput(p.p); tArea.current?.focus() }}
                                                style={{ textAlign: "left", padding: "20px", borderRadius: 24, border: "1px solid #ffffff08", background: "rgba(255,255,255,0.03)", cursor: "pointer", transition: "all .2s", display: "flex", flexDirection: "column", gap: 10, height: "100%", backdropFilter: "blur(4px)" }}
                                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)" }}
                                                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
                                            >
                                                <div style={{ fontSize: 28 }}>{p.t.split(" ")[0]}</div>
                                                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{p.t.split(" ").slice(1).join(" ")}</div>
                                                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{p.d}</div>
                                            </button>
                                        ))}
                                    </div>

                                </div>
                            )}
                            {msgs.map((m, i) => <Bubble key={i} role={m.role} text={m.display} images={m.images} onApprove={handleApprove} onDiscard={handleDiscard} onRegenerate={() => handleRegenerate(i)} send={send} accs={accs} />)}
                            {sending && (
                                <div style={{ display: "flex", gap: 12, padding: "0 8px", marginBottom: 24 }}>
                                    <SiaAvatar size={32} expression="think" style={{ flexShrink: 0, boxShadow: "0 4px 12px rgba(20,184,166,0.2)" }} />
                                    <div style={{ padding: "16px 20px", borderRadius: 20, background: "#1e1e2e", borderBottomLeftRadius: 4, display: "flex", alignItems: "center", gap: 6, border: "1px solid #ffffff05" }}>
                                        <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>Sto scrivendo</span>
                                        <div style={{ display: "flex", gap: 4 }}>{[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: 3, background: "#6366f1", animation: `dot 1.2s ${i * .2}s infinite ease-in-out` }} />)}</div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEnd} />
                        </div>
                        <div style={{ padding: "20px 24px 24px", flexShrink: 0, position: "relative" }}>
                            <div style={{ position: "absolute", top: -20, left: 0, right: 0, height: 20, background: "linear-gradient(to top, #0b0b13, transparent)", pointerEvents: "none" }} />
                            {fprev.length > 0 && (
                                <div style={{ display: "flex", gap: 8, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
                                    {fprev.map((url, i) => (
                                        <div key={i} style={{ position: "relative", flexShrink: 0, borderRadius: 12, overflow: "hidden", border: "1px solid #ffffff10" }}>
                                            {url ? <img src={url} style={{ width: 64, height: 64, objectFit: "cover" }} />
                                                : <div style={{ width: 64, height: 64, background: "#1e1e2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📄</div>}
                                            <button onClick={() => remF(i)} style={{ position: "absolute", top: 2, right: 2, width: 20, height: 20, borderRadius: 10, background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>×</button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {showPrompts && (
                                <div style={{ position: "absolute", bottom: 85, left: 24, width: 320, background: "#1e1e2e", borderRadius: 16, border: "1px solid #ffffff10", padding: 8, boxShadow: "0 10px 40px rgba(0,0,0,0.5)", zIndex: 20, maxHeight: 300, overflowY: "auto" }}>
                                    <div style={{ padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: 1 }}>Quick Prompts</div>
                                    {PROMPTS.map((p, i) => (
                                        <button key={i} onClick={() => { setInput(p.p); setShowPrompts(false); tArea.current?.focus() }}
                                            style={{ width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", color: "#e0e0e8", cursor: "pointer", fontSize: 13, display: "flex", flexDirection: "column", gap: 2, transition: "background .15s" }}
                                            onMouseEnter={e => e.currentTarget.style.background = "#ffffff08"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            <div style={{ fontWeight: 600 }}>{p.t}</div>
                                            <div style={{ fontSize: 11, color: "#888", lineHeight: 1.3 }}>{p.d}</div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="glass" style={{ display: "flex", gap: 12, alignItems: "flex-end", background: "rgba(26,26,36,0.9)", padding: "10px 12px", borderRadius: 28, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 12px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1)", maxWidth: 800, margin: "0 auto", width: "100%", position: "relative", backdropFilter: "blur(24px)" }} onClick={() => tArea.current?.focus()}>
                                <button onClick={() => setShowPrompts(!showPrompts)} className="hover-lift" style={{ width: 42, height: 42, borderRadius: 21, border: "none", background: showPrompts ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)", color: showPrompts ? "#a5b4fc" : "#888", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✨</button>
                                <button onClick={() => setCondensedMode(!condensedMode)} className="hover-lift" style={{ width: 42, height: 42, borderRadius: 21, border: "none", background: condensedMode ? "rgba(16, 185, 129, 0.2)" : "rgba(255,255,255,0.05)", color: condensedMode ? "#10b981" : "#888", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} title={condensedMode ? "Modalità Sintetica (Punchline)" : "Modalità Strutturata"}>{condensedMode ? "⚡" : "🏗️"}</button>
                                <button onClick={() => fInput.current?.click()} className="hover-lift" style={{ width: 42, height: 42, borderRadius: 21, border: "none", background: "rgba(255,255,255,0.05)", color: "#888", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>📎</button>

                                <input ref={fInput} type="file" multiple accept="image/*,video/*,text/*,.md,.csv" onChange={addF} hidden />
                                <textarea ref={tArea} value={input} onChange={hInput} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
                                    placeholder="Chiedi qualsiasi cosa..."
                                    rows={1}
                                    style={{ flex: 1, padding: "12px 6px", borderRadius: 0, border: "none", background: "transparent", color: "#fff", fontSize: 16, outline: "none", resize: "none", lineHeight: 1.5, maxHeight: 150, fontFamily: "inherit" }} />

                                <button onClick={send} disabled={sending} className="hover-lift" style={{ width: 44, height: 44, borderRadius: 22, border: "none", flexShrink: 0, background: sending ? "#252535" : "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff", cursor: sending ? "default" : "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: sending ? "none" : "0 6px 24px rgba(99,102,241,0.4)", transform: sending ? "scale(0.95)" : "scale(1)" }}>↑</button>
                            </div>

                        </div>
                    </div>
                )}

                {/* PUBLISH */}
                {apiKey && view === "publish" && (
                    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
                        {pubRes ? (
                            <div style={{ textAlign: "center", paddingTop: 40 }}>
                                <div style={{ fontSize: 52, marginBottom: 12 }}>{pubRes.ok ? "🚀" : "❌"}</div>
                                <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{pubRes.ok ? "Operazione completata!" : "Errore"}</h2>
                                {pubRes.ok && <p style={{ color: "#888", fontSize: 14, marginTop: 6 }}>Processati {pubRes.batches} gruppi di pubblicazione.</p>}
                                {!pubRes.ok && <p style={{ color: "#ef4444", fontSize: 14, marginTop: 8 }}>{pubRes.err}</p>}
                                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 24 }}>
                                    <button onClick={() => { setPubRes(null); setView("chat"); setMsgs([]); setDraft(""); setFiles([]); setFprev([]) }} style={{ ...bs, padding: "10px 20px", background: "#141420", color: "#aaa" }}>🔄 Nuovo</button>
                                    <button onClick={() => { setPubRes(null); setView("chat") }} style={{ ...bs, padding: "10px 20px", background: "#252535", color: "#ddd" }}>💬 Chat</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                    <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Pronto per la pubblicazione</h2>
                                    {files.length > 0 && <div style={{ fontSize: 13, color: "#aaa" }}>📎 {files.length} media allegati</div>}
                                </div>

                                {/* MASTER STRUCTURE PREVIEW */}
                                {draftStruct && (
                                    <div style={{ marginBottom: 32, padding: "20px", borderRadius: 20, background: "#141420", border: "1px solid #ffffff10" }}>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: "#666", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Struttura Strategica</div>
                                        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                                            <StructBlock l="🪝 Hook" t={draftStruct.hook} c="#f472b6" />
                                            <StructBlock l="🎯 Qualifica" t={draftStruct.qualify} c="#a5b4fc" />
                                            <StructBlock l="🧠 Contesto" t={draftStruct.context} c="#22c55e" />
                                            <StructBlock l="💎 Valore" t={draftStruct.value} c="#fbbf24" />
                                            <StructBlock l="🌉 Bridge" t={draftStruct.bridge} c="#60a5fa" />
                                            <StructBlock l="📣 CTA" t={draftStruct.cta} c="#f87171" />
                                            <StructBlock l="⚠️ Disclosure" t={draftStruct.disclosure} c="#9ca3af" />
                                        </div>
                                    </div>
                                )}

                                {/* MOBILE SIMULATOR GRID */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
                                    {["instagram", ...Object.keys(P).filter(k => k !== "instagram")].map((platKey, idx) => {
                                        const a = accs.find(x => x.platform === platKey);
                                        const p = P[platKey];
                                        const id = a?._id || "placeholder_" + platKey;

                                        if (a) {
                                            const pState = platformStates[id] || { content: "", timeK: "now" };
                                            const len = pState.content.length;
                                            const ok = len <= p.lim;

                                            const isSelected = sel.has(id);
                                            const hasContent = !!pState.content;

                                            const toggleSelection = () => {
                                                if (!hasContent) return; // Prevent selection if no content
                                                setSel(prev => {
                                                    const n = new Set(prev);
                                                    if (n.has(id)) n.delete(id); else n.add(id);
                                                    return n;
                                                });
                                            };

                                            return (
                                                <div key={id} onClick={toggleSelection}
                                                    className={hasContent ? "hover-lift glass-card" : "glass-card"}
                                                    style={{
                                                        width: "100%", maxWidth: 320, background: "rgba(20,20,32,0.8)", borderRadius: 24, padding: "20px 16px 16px",
                                                        border: isSelected && hasContent ? `2px solid ${p.c}` : "2px solid rgba(255,255,255,0.08)",
                                                        display: "flex", flexDirection: "column", gap: 14, position: "relative",
                                                        cursor: hasContent ? "pointer" : "default",
                                                        opacity: 0, // Start invisible for animation
                                                        backdropFilter: "blur(16px)",
                                                        boxShadow: (isSelected && hasContent) ? `0 12px 40px -8px ${p.c}44, 0 0 0 1px ${p.c}22` : "none",
                                                        transition: "all .3s ease",
                                                        animation: "slideUpFade 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                                                        animationDelay: `${idx * 0.1}s`
                                                    }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 12px #22c55e", marginRight: 4 }} title="Connected" />
                                                        <div style={{ width: 32, height: 32, borderRadius: 10, background: isSelected ? `linear-gradient(135deg, ${p.c}, ${p.c}cc)` : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, transition: "all .3s", boxShadow: isSelected ? `0 4px 16px ${p.c}44` : "none" }}>{p.i}</div>
                                                        <div style={{ fontWeight: 700, fontSize: 15, color: isSelected ? "#fff" : "#aaa" }}>{p.n}</div>
                                                        <div style={{ marginLeft: "auto", fontSize: 11, color: ok ? "#22c55e" : "#ef4444", fontWeight: 700 }}>{len}/{p.lim}</div>
                                                        <div style={{
                                                            width: 20, height: 20, borderRadius: 10, border: `2px solid ${isSelected ? p.c : "#444"}`,
                                                            background: isSelected ? p.c : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
                                                            color: "#fff", fontSize: 12, fontWeight: 800, transition: "all .2s", marginLeft: 8
                                                        }}>{isSelected ? "✓" : ""}</div>
                                                    </div>

                                                    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
                                                        <textarea
                                                            value={pState.content}
                                                            onClick={e => e.stopPropagation()}
                                                            onChange={e => setPlatformStates(prev => ({ ...prev, [id]: { ...prev[id], content: e.target.value } }))}
                                                            rows={8}
                                                            placeholder={sending === platKey ? "Generazione in corso..." : "Scrivi o genera il post..."}
                                                            style={{ width: "100%", height: "100%", background: "#0b0b13", border: "1px solid #333", borderRadius: 12, padding: 12, color: "#e0e0e8", fontSize: 13, resize: "none", outline: "none", lineHeight: 1.5, opacity: sending === platKey ? 0.3 : 1 }}
                                                        />

                                                        {!pState.content && sending !== platKey && (
                                                            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); send(platKey); }}
                                                                    className="genera-btn"
                                                                    style={{
                                                                        pointerEvents: "auto",
                                                                        padding: "12px 24px", borderRadius: 14, fontSize: 14, fontWeight: 800, cursor: "pointer",
                                                                        display: "flex", alignItems: "center", gap: 8,
                                                                        transition: "all .4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                                        background: theme.c
                                                                    }}
                                                                >
                                                                    <span>✨</span> Adatta per {p.n}
                                                                </button>
                                                            </div>
                                                        )}

                                                        {sending === platKey && (
                                                            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                                                                <div className="loading-spinner" />
                                                                <div style={{ fontSize: 11, fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: 1, opacity: 0.8 }}>Creazione in corso...</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }} onClick={e => e.stopPropagation()}>
                                                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                                            {TIMES.map(t => (
                                                                <button key={t.k} onClick={() => setPlatformStates(prev => ({ ...prev, [id]: { ...prev[id], timeK: t.k } }))}
                                                                    style={{
                                                                        padding: "6px 10px",
                                                                        borderRadius: 8,
                                                                        border: pState.timeK === t.k ? `1px solid ${p.c}` : "1px solid #333",
                                                                        background: pState.timeK === t.k ? `${p.c}22` : "transparent",
                                                                        color: pState.timeK === t.k ? p.c : "#666",
                                                                        fontSize: 11,
                                                                        cursor: "pointer",
                                                                        fontWeight: 700,
                                                                        transition: "all .2s"
                                                                    }}>{t.l}</button>
                                                            ))}
                                                        </div>
                                                        <div style={{ fontSize: 10, color: "#666", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, textAlign: "right" }}>
                                                            {pState.timeK === "now" ? "⚡ Pubblica Ora" : "⏰ Programmato"}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={platKey} style={{
                                                    width: "100%", maxWidth: 320, height: "auto", minHeight: 180, borderRadius: 24, padding: "20px 16px 16px",
                                                    border: "2px dashed #ffffff10", background: "#141420", display: "flex", flexDirection: "column", gap: 16, opacity: 0,
                                                    animation: "slideUpFade 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                                                    animationDelay: `${idx * 0.1}s`
                                                }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 8px #ef4444", marginRight: 2 }} title="Not Connected" />
                                                        <div style={{ width: 28, height: 28, borderRadius: 8, background: "#333", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", fontSize: 14 }}>{p.i}</div>
                                                        <div style={{ fontWeight: 700, fontSize: 14, color: "#666" }}>{p.n}</div>
                                                    </div>
                                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: "20px 0" }}>
                                                        <div style={{ fontSize: 13, color: "#444", fontWeight: 600 }}>Account non collegato</div>
                                                        <div style={{ fontSize: 11, color: "#333" }}>Configuralo su getlate.dev</div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>

                                <div style={{ height: 40 }} />

                                <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, position: "sticky", bottom: 24, zIndex: 100 }}>
                                    <button onClick={doPublish} disabled={sel.size === 0 || pubing} style={{ padding: "16px 32px", borderRadius: 20, border: "none", background: sel.size === 0 ? "#1a1a28" : pubing ? "#333" : "linear-gradient(135deg,#6366f1,#a855f7)", color: sel.size === 0 ? "#444" : "#fff", cursor: sel.size === 0 || pubing ? "default" : "pointer", fontWeight: 800, fontSize: 16, transition: "all .2s", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", gap: 10 }}>
                                        {pubing ? "⏳ Elaborazione..." : <><span>🚀</span> Pubblica ({sel.size})</>}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* CALENDAR VIEW */}
                {view === "calendar" && (
                    <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                            <h2 style={{ fontSize: 24, fontWeight: 700 }}>
                                2 Settimane dal {currentWeekStart.toLocaleDateString("it-IT", { day: "numeric", month: "long" })}
                            </h2>
                            <div style={{ display: "flex", gap: 10 }}>
                                <button onClick={() => setCurrentWeekStart(d => { const n = new Date(d); n.setDate(n.getDate() - 14); return n; })} style={{ ...bs, background: "rgba(14, 165, 233, 0.2)", color: "#0ea5e9" }}>{"<"} 2 Sett. Prec.</button>
                                <button onClick={() => setCurrentWeekStart(d => { const n = new Date(d); n.setDate(n.getDate() + 14); return n; })} style={{ ...bs, background: "rgba(14, 165, 233, 0.2)", color: "#0ea5e9" }}>2 Sett. Succ. {">"}</button>
                            </div>
                        </div>

                        {/* WEEK GRID */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
                            {Array.from({ length: 14 }).map((_, i) => {
                                const d = new Date(currentWeekStart);
                                d.setDate(d.getDate() + i);
                                const dayName = d.toLocaleDateString("it-IT", { weekday: "short" });
                                const dayNum = d.getDate();
                                const isToday = new Date().toDateString() === d.toDateString();

                                // Filter posts for this day (mock logic)
                                const dayPosts = hist.filter(h => new Date(h.date).toDateString() === d.toDateString());

                                return (
                                    <div key={i} className="animate-scale-in" style={{ animationDelay: `${i * 0.05}s`, background: isToday ? "rgba(14, 165, 233, 0.1)" : "rgba(255, 255, 255, 0.02)", borderRadius: 16, border: isToday ? "1px solid rgba(14, 165, 233, 0.3)" : "1px solid rgba(255, 255, 255, 0.05)", padding: 12, display: "flex", flexDirection: "column", gap: 12, minHeight: 300 }}>
                                        <div style={{ textAlign: "center", paddingBottom: 10, borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                                            <div style={{ fontSize: 11, textTransform: "uppercase", color: isToday ? "#0ea5e9" : "#666", fontWeight: 700, letterSpacing: 1 }}>{dayName}</div>
                                            <div style={{ fontSize: 24, fontWeight: 800, color: isToday ? "#fff" : "#ccc", marginTop: 4 }}>{dayNum}</div>
                                        </div>

                                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                                            {dayPosts.map((p, j) => (
                                                <div key={j} className="hover-lift" style={{ padding: 10, borderRadius: 10, background: "#141420", border: "1px solid rgba(255, 255, 255, 0.05)", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                                        <span style={{ fontSize: 10, background: "#252535", padding: "2px 6px", borderRadius: 4, color: "#ccc", fontWeight: 600 }}>
                                                            {new Date(p.date).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
                                                        </span>
                                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.status === "published" ? "#22c55e" : "#f59e0b", boxShadow: p.status === "published" ? "0 0 6px #22c55e" : "none" }} />
                                                    </div>
                                                    <div style={{ fontSize: 11, color: "#aaa", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.4 }}>
                                                        {p.content}
                                                    </div>
                                                    <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                                                        {p.platforms?.slice(0, 3).map((pp, k) => {
                                                            const plt = P[pp] || { c: "#666" };
                                                            return <div key={k} style={{ width: 6, height: 6, borderRadius: 2, background: plt.c }} />
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                            {dayPosts.length === 0 && <div style={{ fontSize: 11, color: "#444", textAlign: "center", marginTop: 20, fontStyle: "italic" }}>Libero</div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* HISTORY */}
                {apiKey && view === "history" && (
                    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
                        <Sec title={`Storico (${hist.length})`}>
                            {hist.length === 0 ? <p style={{ color: "#444", fontSize: 14 }}>Nessun post ancora.</p> : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {hist.map((h, i) => (
                                        <div key={i} style={{ padding: "12px 14px", borderRadius: 12, background: "#141420" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, color: h.status === "published" ? "#22c55e" : "#f59e0b", padding: "2px 8px", borderRadius: 6, background: h.status === "published" ? "#22c55e15" : "#f59e0b15" }}>{h.status === "published" ? "✓ Pubblicato" : "⏰ Programmato"}</span>
                                                <span style={{ fontSize: 12, color: "#555" }}>{new Date(h.date).toLocaleDateString("it-IT", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                                            </div>
                                            <p style={{ fontSize: 13, color: "#aaa", margin: "0 0 6px", lineHeight: 1.5 }}>{h.content}…</p>
                                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                                                {h.platforms?.map((pp, j) => <span key={j} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "#252535", color: "#888" }}>{pp}</span>)}
                                                {h.mediaCount > 0 && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "#252535", color: "#888" }}>📎 {h.mediaCount}</span>}
                                                {h.url && <a href={h.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "#252535", color: "#6366f1", textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>🔗 Link</a>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Sec>
                    </div>
                )}

                {/* SETTINGS */}
                {view === "settings" && (
                    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
                        <div style={{ display: "flex", gap: 12, marginBottom: 24, padding: "4px", background: "#ffffff05", borderRadius: 14, border: "1px solid #ffffff05" }}>
                            <button onClick={() => setSTab("content")} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: sTab === "content" ? "#252535" : "transparent", color: sTab === "content" ? "#fff" : "#666", fontWeight: 700, cursor: "pointer", transition: "all .2s", fontSize: 13 }}>📚 Contenuti</button>
                            <button onClick={() => setSTab("keys")} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: sTab === "keys" ? "#252535" : "transparent", color: sTab === "keys" ? "#fff" : "#666", fontWeight: 700, cursor: "pointer", transition: "all .2s", fontSize: 13 }}>🔑 Connessioni</button>
                        </div>

                        {sTab === "content" ? (
                            <>
                                <Sec title="Istruzioni AI (System Prompt)">
                                    <textarea value={sysPrompt} onChange={e => saveSysPrompt(e.target.value)} rows={6} placeholder="Istruzioni per l'AI..." style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #252535", background: "#0b0b13", color: "#e0e0e8", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }} />
                                </Sec>
                                <Sec title={`Knowledge Base (${kbFiles.length})`}>
                                    <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                                        <label style={{ ...bs, background: "#252535", color: "#ccc", display: "flex", alignItems: "center", gap: 6 }}>
                                            <span>📄 Aggiungi File</span>
                                            <input type="file" multiple accept=".txt,.md,.csv,text/*" onChange={addKb} hidden />
                                        </label>
                                    </div>
                                    {kbFiles.length > 0 ? (
                                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                            {kbFiles.map((f, i) => (
                                                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 8, background: "#141420", border: "1px solid #252535" }}>
                                                    <div style={{ fontSize: 13, color: "#ccc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "85%" }}>{f.name}</div>
                                                    <button onClick={() => remKb(i)} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16 }}>×</button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : <p style={{ color: "#555", fontSize: 13 }}>Nessun file caricato.</p>}
                                </Sec>
                                <Sec title={`Account collegati ${loadingA ? "⏳" : `(${accs.length})`}`}>
                                    {accs.length === 0 && !loadingA && <p style={{ color: "#444", fontSize: 14, lineHeight: 1.6 }}>Nessun account. Collega i social su <span style={{ color: "#6366f1" }}>getlate.dev</span> → Profiles.</p>}
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        {accs.map(a => {
                                            const p = P[a.platform] || { i: "?", n: a.platform, c: "#666" }; return (
                                                <div key={a._id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "#141420" }}>
                                                    <div style={{ width: 34, height: 34, borderRadius: 8, background: p.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff" }}>{p.i}</div>
                                                    <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{p.n}</div><div style={{ fontSize: 12, color: "#666" }}>@{a.username || a.displayName || "—"}</div></div>
                                                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#22c55e" }} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <button onClick={() => loadAcc(apiKey)} style={{ ...bs, marginTop: 10, background: "#252535", color: "#888" }}>🔄 Aggiorna</button>
                                </Sec>
                            </>
                        ) : (
                            <>
                                <Sec title="Late API Key">
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <input value={keyIn} onChange={e => setKeyIn(e.target.value)} type="password" placeholder="sk_..." style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid #252535", background: "#0b0b13", color: "#e0e0e8", fontSize: 14, outline: "none" }} />
                                        <button onClick={saveKey} style={{ padding: "12px 16px", borderRadius: 10, border: "none", background: "#6366f1", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Salva</button>
                                    </div>
                                </Sec>
                                <Sec title="Anthropic API Key">
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <input value={antKeyIn} onChange={e => setAntKeyIn(e.target.value)} type="password" placeholder="sk-ant-..." style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid #252535", background: "#0b0b13", color: "#e0e0e8", fontSize: 14, outline: "none" }} />
                                        <button onClick={saveAntKey} style={{ padding: "12px 16px", borderRadius: 10, border: "none", background: "#ec4899", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Salva</button>
                                    </div>
                                    <button onClick={disc} style={{ marginTop: 10, padding: "8px 14px", borderRadius: 8, border: "1px solid #ef444466", background: "transparent", color: "#ef4444", cursor: "pointer", fontSize: 13 }}>Disconnetti</button>
                                </Sec>
                                <Sec title="Modello AI">
                                    <div style={{ padding: "12px 14px", borderRadius: 10, background: "#141420", border: "1px solid #ffffff05", color: "#fff", fontSize: 14, display: "flex", alignItems: "center", gap: 10 }}>
                                        <span>🚀</span> <strong>Claude 4.5 Haiku</strong>
                                        <div style={{ marginLeft: "auto", fontSize: 10, background: "#22c55e22", color: "#22c55e", padding: "2px 6px", borderRadius: 4, fontWeight: 800 }}>ATTIVO</div>
                                    </div>
                                </Sec>
                                <Sec title="Setup rapido">
                                    <div style={{ fontSize: 13, color: "#777", lineHeight: 1.8 }}>
                                        <p><strong style={{ color: "#aaa" }}>1.</strong> Account su <span style={{ color: "#6366f1" }}>getlate.dev</span> (gratis, 20 post/mese)</p>
                                        <p><strong style={{ color: "#aaa" }}>2.</strong> Collega Twitter, LinkedIn, Instagram ecc.</p>
                                        <p><strong style={{ color: "#aaa" }}>3.</strong> Copia API Key da Settings → API Keys</p>
                                        <p><strong style={{ color: "#aaa" }}>4.</strong> Incollala qui e crea post con l'AI!</p>
                                    </div>
                                </Sec>
                                <Sec title="Zona Pericolosa">
                                    <button onClick={() => { if (confirm("Vuoi davvero resettare l'onboarding?")) { ST.del("pf_user"); window.location.reload(); } }} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #ef444466", background: "#ef444411", color: "#ef4444", fontWeight: 700, cursor: "pointer", fontSize: 13, transition: "all .2s" }}>⚠️ Reset Onboarding</button>
                                </Sec>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* MOBILE NAV */}
            {isMobile && (
                <div className="glass" style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0, padding: "10px 20px 24px", background: "rgba(10,10,15,0.95)", backdropFilter: "blur(24px)", justifyContent: "space-around", margin: "0 8px 8px", borderRadius: "24px 24px 32px 32px" }}>
                    {NAV_ITEMS.map(n => (
                        <button key={n.id} onClick={() => { setView(n.id); if (n.id === "publish") setPubRes(null) }}
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "10px 16px", border: "none", background: view === n.id ? `${THEMES[n.id].c}22` : "transparent", borderRadius: 16, cursor: "pointer", color: view === n.id ? "#fff" : "#666" }}>
                            <span style={{ fontSize: 22, filter: view === n.id ? `drop-shadow(0 0 12px ${THEMES[n.id].c}cc)` : "none", transition: "all .3s" }}>{n.ic}</span>
                            {view === n.id && <div style={{ width: 6, height: 6, borderRadius: 3, background: THEMES[n.id].c, boxShadow: `0 0 8px ${THEMES[n.id].c}` }} />}
                        </button>
                    ))}
                </div>
            )}
            {user && !user.onboarded && <OnboardingOverlay onComplete={handleOnboardingComplete} />}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0}
        html{scroll-behavior:smooth}
        
        /* Glassmorphism Base */
        .glass{background:rgba(20,20,32,0.6);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);border-radius:20px}
        .glass-light{background:rgba(255,255,255,0.05);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.1)}
        .glass-card{background:rgba(30,30,46,0.7);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 8px 32px rgba(0,0,0,0.3)}
        
        /* Animations */
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUpFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
        @keyframes pulse-glow{0%,100%{box-shadow:0 0 20px ${theme.c}44}50%{box-shadow:0 0 40px ${theme.c}88}}
        
        .animate-fadeInUp{animation:fadeInUp .4s ease-out forwards}
        .animate-fadeIn{animation:fadeIn .3s ease-out forwards}
        .animate-slide-up-fade{animation:slideUpFade .4s cubic-bezier(0.4, 0, 0.2, 1) forwards}
        .animate-scale-in{animation:scaleIn .3s cubic-bezier(0.4, 0, 0.2, 1) forwards}
        .animate-pulse{animation:pulse-glow 2s ease-in-out infinite}
        
        /* Hover Effects */
        .hover-lift{transition:all .25s cubic-bezier(.4,0,.2,1)}
        .hover-lift:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.4)}
        
        /* Scrollbar Glassmorphic */
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:rgba(255,255,255,0.02);border-radius:3px}
        ::-webkit-scrollbar-thumb{background:${theme.c}44;border-radius:3px}
        ::-webkit-scrollbar-thumb:hover{background:${theme.c}88}
        
        /* Aurora Orbs */
        .aurora-orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:0.4;animation:aurora 20s ease-in-out infinite;pointer-events:none}
        
        /* Input Focus */
        input:focus,textarea:focus{outline:none;border-color:${theme.c}88!important;box-shadow:0 0 0 3px ${theme.c}22}
        
        /* Button Micro-interactions */
        button{transition:all .2s cubic-bezier(.4,0,.2,1)}
        button:active{transform:scale(0.97)}
        
        input,textarea,button{font-family:'Inter', 'DM Sans',system-ui,sans-serif}
        
        .loading-spinner {
            width: 38px;
            height: 38px;
            border: 4px solid rgba(168, 85, 247, 0.1);
            border-radius: 50%;
            border-top-color: #a855f7 !important;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .genera-btn {
            background: rgba(168, 85, 247, 0.15) !important;
            border: 1px solid rgba(168, 85, 247, 0.2) !important;
            color: rgba(168, 85, 247, 0.8) !important;
            box-shadow: none !important;
        }

        .genera-btn:hover {
            background: linear-gradient(135deg, #a855f7, #6366f1) !important;
            color: #fff !important;
            border-color: transparent !important;
            filter: brightness(1.1);
            box-shadow: 0 8px 32px rgba(168, 85, 247, 0.4) !important;
        }
      `}</style>
        </div>
    );
}

function safeParseJSON(text) {
    if (!text || typeof text !== 'string') return {};
    try {
        let clean = text.trim();

        // 0. Try standard parse first (fastest)
        try { return JSON.parse(clean); } catch { }

        // 1. Markdown code blocks
        const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (match) {
            clean = match[1].trim();
            try { return JSON.parse(clean); } catch { }
        }

        // 2. Regex to find the first { and last } (Naive extraction)
        const jsonMatch = text.match(/(\{[\s\S]*\})/);
        if (jsonMatch) {
            clean = jsonMatch[1];
            try { return JSON.parse(clean); } catch { }
        }

        // 3. Fallback: Flatten newlines (Nuclear option)
        const flattened = clean.replace(/[\n\r\t]/g, " ");
        try { return JSON.parse(flattened); } catch { }

        // 4. Eval (Dangerous but effective for loose JSON)
        try { return (new Function("return (" + clean + ")"))(); } catch { }

        return {};
    } catch {
        return {};
    }
}

function extractContent(val) {
    if (!val) return "";
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.join("\n\n");
    if (typeof val === 'object') {
        return val.content || val.text || val.caption || val.post || JSON.stringify(val, null, 2);
    }
    return String(val);
}

export default Sia;
