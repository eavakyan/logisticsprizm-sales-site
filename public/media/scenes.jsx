// scenes.jsx — LogisticsPrizm presentation video scenes
// Story: fragmented systems → problem → unified solution → product → outcome → close

// ── Brand tokens ────────────────────────────────────────────────────────────
const BRAND = {
  primary: '#065A82',   // deep blue
  secondary: '#1C7293', // teal
  accent: '#02C39A',    // mint
  dark: '#21295C',      // midnight
  light: '#F0F7FA',     // ice
  white: '#FFFFFF',
  textDark: '#1E293B',
  textLight: '#64748B',
  grid: 'rgba(255,255,255,0.06)',
};

const FONT = {
  sans: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// ── Helpers ─────────────────────────────────────────────────────────────────
function Grid({ color = BRAND.grid, size = 80 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage:
        `linear-gradient(${color} 1px, transparent 1px),
         linear-gradient(90deg, ${color} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
      maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 85%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 85%)',
    }}/>
  );
}

function SceneBackdrop({ color, children }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: color,
      overflow: 'hidden',
    }}>
      {children}
    </div>
  );
}

// Progress indicator for chapter marker
function ChapterMark({ label, time }) {
  return (
    <div style={{
      position: 'absolute', left: 64, bottom: 48,
      display: 'flex', alignItems: 'center', gap: 14,
      fontFamily: FONT.mono,
      fontSize: 13,
      color: 'rgba(255,255,255,0.55)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    }}>
      <div style={{
        width: 32, height: 1, background: 'rgba(255,255,255,0.4)',
      }}/>
      <span>{label}</span>
      <span style={{ color: BRAND.accent }}>{time}</span>
    </div>
  );
}

// ── SCENE 1 — The Mess (0–8s) ──────────────────────────────────────────────
// Fragmented, disconnected logistics systems flickering chaotically.
function SceneMess() {
  const systems = [
    { label: 'TMS v2.1', color: '#2a3356', x: 60,   y: 80,  w: 280, h: 160, delay: 0.1 },
    { label: 'RATE_SHEET.xlsx', color: '#1e3a2a', x: 380,  y: 130, w: 240, h: 130, delay: 0.35 },
    { label: 'CarrierPortal', color: '#3a2a1e', x: 680,  y: 60,  w: 300, h: 180, delay: 0.15 },
    { label: 'QuickBooks', color: '#2a1e3a', x: 1040, y: 110, w: 220, h: 150, delay: 0.5 },
    { label: 'email_chain.outlook', color: '#3a1e2a', x: 1300, y: 70, w: 260, h: 170, delay: 0.25 },
    { label: 'WMS Legacy', color: '#1e2a3a', x: 80,   y: 300, w: 260, h: 180, delay: 0.4 },
    { label: 'Manual_Quotes.doc', color: '#2a2a1e', x: 380,  y: 320, w: 300, h: 160, delay: 0.2 },
    { label: 'EDI Gateway', color: '#2a3356', x: 720,  y: 310, w: 260, h: 170, delay: 0.55 },
    { label: 'Carrier API v3', color: '#1e3a3a', x: 1020, y: 320, w: 280, h: 160, delay: 0.3 },
    { label: 'SPREADSHEET_12.xlsx', color: '#3a2a2a', x: 1340, y: 310, w: 220, h: 170, delay: 0.45 },
    { label: 'Ops Chat', color: '#1e3a2a', x: 120,  y: 540, w: 240, h: 140, delay: 0.6 },
    { label: 'tracking.csv', color: '#2a1e3a', x: 400,  y: 540, w: 260, h: 150, delay: 0.18 },
    { label: 'Invoice Portal', color: '#3a1e2a', x: 700,  y: 530, w: 280, h: 160, delay: 0.42 },
    { label: 'Freight Terms.pdf', color: '#2a3356', x: 1020, y: 540, w: 260, h: 140, delay: 0.28 },
    { label: 'Notion / Ops', color: '#1e2a3a', x: 1320, y: 540, w: 240, h: 150, delay: 0.5 },
  ];

  const { localTime, duration } = useSprite();

  return (
    <SceneBackdrop color="#0d0f1a">
      <Grid color="rgba(255,255,255,0.04)" size={60}/>

      {/* Flickering system windows */}
      {systems.map((s, i) => {
        // Each window pops in, then flickers/jitters
        const appear = clamp((localTime - s.delay) / 0.35, 0, 1);
        const eased = Easing.easeOutBack(appear);
        const jitter = Math.sin(localTime * 7 + i * 1.3) * 1.5 + Math.cos(localTime * 5 + i) * 1.2;
        const flicker = 0.85 + 0.15 * Math.sin(localTime * 12 + i * 2);
        // Fade out on exit
        const exitStart = duration - 0.8;
        const exit = localTime > exitStart ? clamp((localTime - exitStart) / 0.8, 0, 1) : 0;
        const exitScale = 1 - exit * 0.4;
        const exitOpacity = 1 - exit;

        return (
          <div key={i} style={{
            position: 'absolute',
            left: s.x, top: s.y,
            width: s.w, height: s.h,
            background: s.color,
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 6,
            opacity: appear * flicker * exitOpacity,
            transform: `translate(${jitter}px, ${jitter * 0.5}px) scale(${eased * exitScale})`,
            transformOrigin: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            willChange: 'transform, opacity',
            overflow: 'hidden',
          }}>
            {/* fake title bar */}
            <div style={{
              height: 22,
              background: 'rgba(0,0,0,0.3)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center',
              padding: '0 10px',
              gap: 6,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: '#ff5f56' }}/>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: '#ffbd2e' }}/>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: '#27c93f' }}/>
              <span style={{
                fontFamily: FONT.mono,
                fontSize: 10,
                color: 'rgba(255,255,255,0.6)',
                marginLeft: 8,
                letterSpacing: '0.04em',
              }}>{s.label}</span>
            </div>
            {/* fake content lines */}
            <div style={{ padding: 14 }}>
              {[...Array(4)].map((_, j) => (
                <div key={j} style={{
                  height: 6,
                  background: 'rgba(255,255,255,0.15)',
                  marginBottom: 8,
                  width: `${60 + (j * 7 + i * 11) % 35}%`,
                  borderRadius: 2,
                }}/>
              ))}
            </div>
          </div>
        );
      })}

      {/* Tangled connection lines — chaotic spaghetti */}
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width="1920" height="1080">
        {[
          [200, 160, 800, 400],
          [500, 195, 1160, 185],
          [820, 150, 1430, 395],
          [210, 390, 1150, 395],
          [510, 400, 1440, 155],
          [250, 615, 830, 610],
          [550, 615, 1440, 615],
          [830, 605, 210, 170],
          [1150, 620, 300, 390],
          [700, 400, 1150, 615],
        ].map(([x1, y1, x2, y2], i) => {
          const appear = clamp((localTime - 0.6 - i * 0.08) / 0.6, 0, 1);
          const cx = (x1 + x2) / 2 + Math.sin(localTime * 2 + i) * 40;
          const cy = (y1 + y2) / 2 + Math.cos(localTime * 1.5 + i) * 30;
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              stroke="#ff5f56"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
              opacity={appear * 0.5}
            />
          );
        })}
      </svg>

      {/* Hook copy */}
      <Sprite start={2.2} end={7.5}>
        <div style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10,
        }}>
          <HookText/>
        </div>
      </Sprite>

      <ChapterMark label="01 · The Status Quo" time="00:00"/>
    </SceneBackdrop>
  );
}

function HookText() {
  const { localTime } = useSprite();
  const t1 = clamp(localTime / 0.5, 0, 1);
  const t2 = clamp((localTime - 0.4) / 0.5, 0, 1);
  return (
    <div>
      <div style={{
        fontFamily: FONT.mono,
        fontSize: 16,
        color: BRAND.accent,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        marginBottom: 28,
        opacity: Easing.easeOutCubic(t1),
        transform: `translateY(${(1 - t1) * 12}px)`,
      }}>
        Modern Logistics, Today
      </div>
      <div style={{
        fontFamily: FONT.sans,
        fontSize: 96,
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.03em',
        lineHeight: 1.02,
        textShadow: '0 8px 40px rgba(0,0,0,0.8)',
        opacity: Easing.easeOutCubic(t2),
        transform: `translateY(${(1 - t2) * 20}px)`,
      }}>
        Fifteen tabs.<br/>
        <span style={{ color: '#ff8c7a' }}>Zero answers.</span>
      </div>
    </div>
  );
}

// ── SCENE 2 — The Problem Stat (8–18s) ─────────────────────────────────────
function SceneProblem() {
  const { localTime } = useSprite();

  const stats = [
    { value: '$27B', label: 'market running on\ndigital duct tape', delay: 0.3 },
    { value: '5–15', label: 'disconnected systems\nper company', delay: 0.8 },
    { value: '30–60', label: 'minutes per\nmanual quote', delay: 1.3 },
    { value: '41%', label: 'of logistics spend\nlost to inefficiency', delay: 1.8 },
  ];

  return (
    <SceneBackdrop color={BRAND.dark}>
      <Grid color="rgba(255,255,255,0.05)" size={100}/>

      {/* Eyebrow */}
      <div style={{
        position: 'absolute', left: 120, top: 110,
        fontFamily: FONT.mono,
        fontSize: 18,
        color: BRAND.accent,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        opacity: clamp(localTime / 0.5, 0, 1),
      }}>
        02 · The Problem
      </div>

      {/* Headline */}
      <div style={{
        position: 'absolute', left: 120, top: 180,
        fontFamily: FONT.sans,
        fontSize: 82,
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.025em',
        lineHeight: 1.0,
        maxWidth: 1500,
        opacity: clamp((localTime - 0.2) / 0.6, 0, 1),
        transform: `translateY(${(1 - clamp((localTime - 0.2) / 0.6, 0, 1)) * 20}px)`,
      }}>
        The numbers tell<br/>
        <span style={{ color: BRAND.accent }}>the story.</span>
      </div>

      {/* Stat grid */}
      <div style={{
        position: 'absolute',
        left: 120, top: 560,
        width: 1680,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 32,
      }}>
        {stats.map((s, i) => {
          const t = clamp((localTime - s.delay) / 0.6, 0, 1);
          const eased = Easing.easeOutCubic(t);
          return (
            <div key={i} style={{
              opacity: eased,
              transform: `translateY(${(1 - eased) * 30}px)`,
              borderTop: `2px solid ${BRAND.accent}`,
              paddingTop: 28,
            }}>
              <div style={{
                fontFamily: FONT.sans,
                fontSize: 88,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: 20,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: FONT.sans,
                fontSize: 22,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.4,
                whiteSpace: 'pre-line',
              }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      <ChapterMark label="02 · The Problem" time="00:08"/>
    </SceneBackdrop>
  );
}

// ── SCENE 3 — Solution Reveal (18–28s) ─────────────────────────────────────
function SceneSolution() {
  const { localTime } = useSprite();

  // Logo mark — prism-like geometric shape
  const logoScale = Easing.easeOutBack(clamp(localTime / 0.8, 0, 1));
  const logoRot = interpolate([0, 1, 10], [0, 360, 360], Easing.easeOutCubic)(localTime);

  return (
    <SceneBackdrop color={BRAND.primary}>
      {/* gradient wash */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 40%, ${BRAND.secondary} 0%, ${BRAND.primary} 50%, ${BRAND.dark} 100%)`,
      }}/>
      <Grid color="rgba(255,255,255,0.04)" size={120}/>

      {/* Logo mark */}
      <div style={{
        position: 'absolute',
        left: '50%', top: 300,
        transform: `translate(-50%, 0) scale(${logoScale})`,
        transformOrigin: 'center',
      }}>
        <PrismLogo rotation={logoRot}/>
      </div>

      {/* Wordmark — scene starts at 18s */}
      <Sprite start={19.2} end={28}>
        {({ localTime: lt }) => {
          const t = clamp(lt / 0.7, 0, 1);
          const eased = Easing.easeOutCubic(t);
          return (
            <div style={{
              position: 'absolute',
              left: '50%', top: 560,
              transform: `translate(-50%, ${(1 - eased) * 20}px)`,
              opacity: eased,
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: FONT.sans,
                fontSize: 120,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}>
                Logistics<span style={{ color: BRAND.accent }}>Prizm</span>
              </div>
            </div>
          );
        }}
      </Sprite>

      {/* Tagline */}
      <Sprite start={20.4} end={28}>
        {({ localTime: lt }) => {
          const t = clamp(lt / 0.7, 0, 1);
          const eased = Easing.easeOutCubic(t);
          return (
            <div style={{
              position: 'absolute',
              left: '50%', top: 740,
              transform: `translate(-50%, ${(1 - eased) * 14}px)`,
              opacity: eased,
              textAlign: 'center',
              fontFamily: FONT.sans,
              fontSize: 42,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '-0.01em',
            }}>
              One AI platform. Every logistics need.
            </div>
          );
        }}
      </Sprite>

      {/* Three pillars that fan out */}
      <Sprite start={22.0} end={28}>
        <SolutionPillars/>
      </Sprite>

      <ChapterMark label="03 · The Solution" time="00:18"/>
    </SceneBackdrop>
  );
}

function PrismLogo({ rotation = 0 }) {
  // A prism refracting light into three beams — metaphor for unified platform
  return (
    <svg width="240" height="240" viewBox="-120 -120 240 240">
      {/* Beams — coming out as spectrum */}
      <defs>
        <linearGradient id="beam1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={BRAND.accent} stopOpacity="0.9"/>
          <stop offset="1" stopColor={BRAND.accent} stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="beam2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7FD8FF" stopOpacity="0.9"/>
          <stop offset="1" stopColor="#7FD8FF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="beam3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFD27A" stopOpacity="0.9"/>
          <stop offset="1" stopColor="#FFD27A" stopOpacity="0"/>
        </linearGradient>
      </defs>

      <g transform={`rotate(${rotation})`}>
        {/* spectrum beams coming out right side */}
        <rect x="0" y="-20" width="200" height="4" fill="url(#beam1)" transform="rotate(-18)"/>
        <rect x="0" y="0" width="200" height="4" fill="url(#beam2)"/>
        <rect x="0" y="20" width="200" height="4" fill="url(#beam3)" transform="rotate(18)"/>

        {/* Incoming white beam */}
        <rect x="-200" y="-2" width="200" height="4" fill="rgba(255,255,255,0.8)"/>

        {/* Prism triangle */}
        <polygon
          points="0,-60 52,30 -52,30"
          fill="rgba(255,255,255,0.95)"
          stroke={BRAND.accent}
          strokeWidth="2"
        />
        <polygon
          points="0,-60 52,30 -52,30"
          fill="url(#prismFace)"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}

function SolutionPillars() {
  const { localTime } = useSprite();
  const pillars = [
    { label: 'Admin', sub: 'Dashboard', x: -360, delay: 0 },
    { label: 'Mobile', sub: 'iOS / Android', x: 0, delay: 0.15 },
    { label: 'API', sub: 'Integration Layer', x: 360, delay: 0.3 },
  ];
  return (
    <div style={{ position: 'absolute', left: '50%', top: 880, transform: 'translateX(-50%)' }}>
      <div style={{ position: 'relative', width: 1000, height: 100 }}>
        {pillars.map((p, i) => {
          const t = clamp((localTime - p.delay) / 0.6, 0, 1);
          const eased = Easing.easeOutCubic(t);
          return (
            <div key={i} style={{
              position: 'absolute',
              left: `calc(50% + ${p.x}px)`,
              top: 0,
              transform: `translate(-50%, ${(1 - eased) * 20}px)`,
              opacity: eased,
              textAlign: 'center',
              borderLeft: `2px solid ${BRAND.accent}`,
              paddingLeft: 20,
              paddingRight: 20,
            }}>
              <div style={{
                fontFamily: FONT.mono,
                fontSize: 14,
                color: BRAND.accent,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 8,
                textAlign: 'left',
              }}>
                0{i+1}
              </div>
              <div style={{
                fontFamily: FONT.sans,
                fontSize: 32,
                fontWeight: 600,
                color: '#fff',
                textAlign: 'left',
                letterSpacing: '-0.01em',
              }}>{p.label}</div>
              <div style={{
                fontFamily: FONT.sans,
                fontSize: 18,
                color: 'rgba(255,255,255,0.6)',
                textAlign: 'left',
              }}>{p.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── SCENE 4 — Product / AI Quote Engine (28–42s) ───────────────────────────
function SceneProduct() {
  const { localTime } = useSprite();

  return (
    <SceneBackdrop color={BRAND.light}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          `linear-gradient(rgba(30,41,59,0.04) 1px, transparent 1px),
           linear-gradient(90deg, rgba(30,41,59,0.04) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }}/>

      {/* Eyebrow + title on left */}
      <div style={{ position: 'absolute', left: 120, top: 110, width: 640 }}>
        <div style={{
          fontFamily: FONT.mono,
          fontSize: 18,
          color: BRAND.secondary,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: 20,
          opacity: clamp(localTime / 0.5, 0, 1),
        }}>
          04 · AI Quote Engine
        </div>
        <div style={{
          fontFamily: FONT.sans,
          fontSize: 74,
          fontWeight: 700,
          color: BRAND.textDark,
          letterSpacing: '-0.025em',
          lineHeight: 1.02,
          opacity: clamp((localTime - 0.2) / 0.6, 0, 1),
          transform: `translateY(${(1 - clamp((localTime - 0.2) / 0.6, 0, 1)) * 16}px)`,
        }}>
          From RFQ to priced quote in{' '}
          <span style={{ color: BRAND.primary }}>32 seconds.</span>
        </div>

        <Sprite start={29.0} end={42}>
          {({ localTime: lt }) => {
            const t = clamp(lt / 0.5, 0, 1);
            return (
              <div style={{
                marginTop: 40,
                fontFamily: FONT.sans,
                fontSize: 22,
                color: BRAND.textLight,
                lineHeight: 1.5,
                opacity: t,
                transform: `translateY(${(1 - t) * 12}px)`,
              }}>
                Our Prizm Intelligence Engine reads the freight spec, scores the lane, prices against
                historical margin, and generates the quote — automatically.
              </div>
            );
          }}
        </Sprite>

        {/* Stat counters */}
        <Sprite start={35.5} end={42}>
          <ProductStats/>
        </Sprite>
      </div>

      {/* Mock UI on right */}
      <div style={{ position: 'absolute', left: 820, top: 130, width: 1000 }}>
        <QuoteEngineMock/>
      </div>

      <ChapterMark label="04 · Product" time="00:28"/>
    </SceneBackdrop>
  );
}

function ProductStats() {
  const { localTime } = useSprite();
  const items = [
    { v: '32s', label: 'avg quote time' },
    { v: '99.8%', label: 'data accuracy' },
    { v: '30%', label: 'cost reduction' },
  ];
  return (
    <div style={{ display: 'flex', gap: 56, marginTop: 56 }}>
      {items.map((it, i) => {
        const t = clamp((localTime - i * 0.2) / 0.5, 0, 1);
        const eased = Easing.easeOutCubic(t);
        return (
          <div key={i} style={{
            opacity: eased,
            transform: `translateY(${(1 - eased) * 14}px)`,
          }}>
            <div style={{
              fontFamily: FONT.sans,
              fontSize: 60,
              fontWeight: 700,
              color: BRAND.primary,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>{it.v}</div>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: 13,
              color: BRAND.textLight,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: 8,
            }}>{it.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function QuoteEngineMock() {
  const { localTime } = useSprite();
  // Sequence: RFQ email appears → AI analyzes → quote generated
  const emailAppear = clamp((localTime - 0.5) / 0.5, 0, 1);
  const processingAppear = clamp((localTime - 2.5) / 0.5, 0, 1);
  const quoteAppear = clamp((localTime - 5.5) / 0.6, 0, 1);

  // Counter animation for 32s
  const counter = Math.min(32, Math.floor(clamp((localTime - 2.5) / 3.0, 0, 1) * 32));

  return (
    <div style={{
      width: 1000,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 30px 80px rgba(6,90,130,0.18), 0 0 0 1px rgba(6,90,130,0.08)',
      overflow: 'hidden',
      fontFamily: FONT.sans,
    }}>
      {/* window chrome */}
      <div style={{
        height: 40,
        background: BRAND.light,
        borderBottom: '1px solid rgba(30,41,59,0.08)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px',
        gap: 8,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: 5, background: '#ff5f56' }}/>
        <div style={{ width: 10, height: 10, borderRadius: 5, background: '#ffbd2e' }}/>
        <div style={{ width: 10, height: 10, borderRadius: 5, background: '#27c93f' }}/>
        <div style={{
          marginLeft: 18,
          fontFamily: FONT.mono,
          fontSize: 12,
          color: BRAND.textLight,
          letterSpacing: '0.05em',
        }}>logisticsprizm.app / quotes / new</div>
      </div>

      {/* Body */}
      <div style={{ padding: 28 }}>
        {/* RFQ email block */}
        <div style={{
          opacity: emailAppear,
          transform: `translateY(${(1 - emailAppear) * 12}px)`,
          padding: 20,
          background: BRAND.light,
          borderRadius: 10,
          border: '1px solid rgba(6,90,130,0.1)',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <div style={{
              width: 6, height: 6, borderRadius: 3, background: BRAND.accent,
            }}/>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              color: BRAND.textLight,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>Incoming RFQ · from acme-shipping.com</div>
          </div>
          <div style={{ fontSize: 18, color: BRAND.textDark, lineHeight: 1.5 }}>
            Need quote — 2× 40ft reefer, LAX → Chicago,<br/>
            pickup Tue 4/28, pharma temp-controlled, insured $250k.
          </div>
        </div>

        {/* Processing indicator */}
        <div style={{
          opacity: processingAppear * (localTime < 5.5 ? 1 : 1 - clamp((localTime - 5.5) / 0.5, 0, 1)),
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '14px 20px',
          background: BRAND.primary,
          borderRadius: 10,
        }}>
          <div style={{
            width: 24, height: 24,
            border: '3px solid rgba(255,255,255,0.2)',
            borderTopColor: BRAND.accent,
            borderRadius: 12,
            animation: 'spin 0.8s linear infinite',
          }}/>
          <div style={{
            fontFamily: FONT.mono,
            fontSize: 13,
            color: '#fff',
            letterSpacing: '0.08em',
          }}>
            AI processing · {counter}s elapsed · scoring 12 carriers · pricing against 847 historical lanes
          </div>
        </div>

        {/* Generated quote */}
        <div style={{
          opacity: quoteAppear,
          transform: `translateY(${(1 - quoteAppear) * 16}px) scale(${0.98 + quoteAppear * 0.02})`,
          padding: 24,
          background: '#fff',
          border: `2px solid ${BRAND.accent}`,
          borderRadius: 12,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 20,
          }}>
            <div>
              <div style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                color: BRAND.textLight,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}>Quote #Q-20260428-1142</div>
              <div style={{
                fontFamily: FONT.sans,
                fontSize: 22,
                fontWeight: 600,
                color: BRAND.textDark,
              }}>LAX → ORD · 40ft reefer × 2</div>
            </div>
            <div style={{
              padding: '6px 14px',
              background: BRAND.accent,
              color: '#fff',
              borderRadius: 16,
              fontFamily: FONT.mono,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Ready to send
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
            {[
              { label: 'Total', value: '$14,280' },
              { label: 'Margin', value: '18.4%' },
              { label: 'Transit', value: '3.5 days' },
            ].map((c, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  color: BRAND.textLight,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}>{c.label}</div>
                <div style={{
                  fontFamily: FONT.sans,
                  fontSize: 32,
                  fontWeight: 700,
                  color: BRAND.primary,
                  letterSpacing: '-0.02em',
                }}>{c.value}</div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '12px 16px',
            background: BRAND.light,
            borderRadius: 8,
            fontFamily: FONT.mono,
            fontSize: 12,
            color: BRAND.textDark,
            lineHeight: 1.6,
          }}>
            <div style={{ color: BRAND.secondary, marginBottom: 4 }}>// AI RATIONALE</div>
            Carrier: ColdChain Freight (score 94/100). Priced at P60 of lane history,
            premium for temp-control. Margin within policy.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCENE 5 — Predictive Tracking (42–56s) ─────────────────────────────────
function SceneTracking() {
  const { localTime } = useSprite();

  const waypoints = [
    { x: 0.08,  y: 0.72, label: 'LAX',  sub: 'Origin',       eta: 'Tue 8:00 AM', window: 'on time',        delay: 0.4,  isOrigin: true },
    { x: 0.26,  y: 0.62, label: 'PHX',  sub: 'Cross-dock',   eta: 'Tue 3:14 PM', window: '± 22 min',       delay: 1.0 },
    { x: 0.46,  y: 0.48, label: 'ABQ',  sub: 'Fuel / swap',  eta: 'Tue 9:51 PM', window: '± 38 min',       delay: 1.6 },
    { x: 0.66,  y: 0.38, label: 'OKC',  sub: 'Hub transfer', eta: 'Wed 6:02 AM', window: '± 1 hr 4 min',   delay: 2.2 },
    { x: 0.82,  y: 0.30, label: 'MCI',  sub: 'Regional DC',  eta: 'Wed 2:28 PM', window: '± 1 hr 19 min',  delay: 2.8 },
    { x: 0.94,  y: 0.22, label: 'ORD',  sub: 'Destination',  eta: 'Wed 6:42 PM', window: '± 1 hr 47 min',  delay: 3.4, isDest: true },
  ];

  return (
    <SceneBackdrop color="#0b1224">
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 60% 50%, ${BRAND.secondary}33, transparent 60%)`,
      }}/>
      <Grid color="rgba(255,255,255,0.04)" size={100}/>

      <div style={{
        position: 'absolute', left: 120, top: 90,
        fontFamily: FONT.mono,
        fontSize: 18,
        color: BRAND.accent,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        opacity: clamp(localTime / 0.4, 0, 1),
      }}>
        05 · Predictive Tracking
      </div>
      <div style={{
        position: 'absolute', left: 120, top: 150,
        fontFamily: FONT.sans,
        fontSize: 72,
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.025em',
        lineHeight: 1.0,
        opacity: clamp((localTime - 0.2) / 0.6, 0, 1),
        transform: `translateY(${(1 - clamp((localTime - 0.2) / 0.6, 0, 1)) * 18}px)`,
      }}>
        We don't just track shipments.<br/>
        <span style={{ color: BRAND.accent }}>We predict them.</span>
      </div>

      <div style={{
        position: 'absolute',
        left: 120, top: 340,
        width: 1680, height: 480,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14,
        overflow: 'hidden',
      }}>
        <svg viewBox="0 0 1680 480" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="routePath" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor={BRAND.accent} stopOpacity="0.9"/>
              <stop offset="1" stopColor={BRAND.accent} stopOpacity="0.4"/>
            </linearGradient>
            <linearGradient id="confBand" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor={BRAND.accent} stopOpacity="0.25"/>
              <stop offset="1" stopColor={BRAND.accent} stopOpacity="0.08"/>
            </linearGradient>
          </defs>

          {[0.12, 0.28, 0.44, 0.6, 0.76, 0.92].map((yy, i) => (
            <path key={i}
              d={`M 0 ${yy * 480 + Math.sin(i) * 14} Q 400 ${yy * 480 - 20} 840 ${yy * 480} T 1680 ${yy * 480 + 10}`}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              fill="none"
            />
          ))}

          <ConfidenceBand waypoints={waypoints} localTime={localTime}/>
          <RoutePath waypoints={waypoints} localTime={localTime}/>
        </svg>

        {waypoints.map((wp, i) => (
          <WaypointMarker key={i} wp={wp} localTime={localTime} index={i}/>
        ))}

        <TruckOnRoute waypoints={waypoints} localTime={localTime}/>
      </div>

      <Sprite start={49.0} end={56}>
        {({ localTime: lt }) => {
          const t = clamp(lt / 0.5, 0, 1);
          const eased = Easing.easeOutCubic(t);
          return (
            <div style={{
              position: 'absolute', left: 120, top: 868,
              width: 1680,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
              opacity: eased,
              transform: `translateY(${(1 - eased) * 18}px)`,
            }}>
              <div style={{
                padding: '22px 28px',
                background: 'rgba(255,92,86,0.08)',
                border: '1px solid rgba(255,92,86,0.3)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', gap: 24,
              }}>
                <div style={{
                  fontFamily: FONT.mono, fontSize: 12, color: '#ff8c7a',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  flexShrink: 0, width: 120,
                }}>Competitors</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 22, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                  Last scan: <span style={{ fontFamily: FONT.mono, color: '#fff' }}>2h 14m ago</span> · <span style={{ color: '#ff8c7a' }}>ETA unknown</span>
                </div>
              </div>

              <div style={{
                padding: '22px 28px',
                background: 'rgba(2,195,154,0.08)',
                border: `1px solid ${BRAND.accent}`,
                borderRadius: 10,
                display: 'flex', alignItems: 'center', gap: 24,
              }}>
                <div style={{
                  fontFamily: FONT.mono, fontSize: 12, color: BRAND.accent,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  flexShrink: 0, width: 120,
                }}>LogisticsPrizm</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 22, color: '#fff', fontWeight: 500 }}>
                  ORD <span style={{ fontFamily: FONT.mono }}>6:42 PM Wed ± 1h 47m</span> · <span style={{ color: BRAND.accent }}>94% confidence</span>
                </div>
              </div>
            </div>
          );
        }}
      </Sprite>

      <ChapterMark label="05 · Predictive Tracking" time="00:42"/>
    </SceneBackdrop>
  );
}

function RoutePath({ waypoints, localTime }) {
  const W = 1680, H = 480;
  const pts = waypoints.map(wp => [wp.x * W, wp.y * H]);
  const d = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
  const reveal = clamp((localTime - 0.6) / 3.0, 0, 1);
  const pathLen = 2400;
  return (
    <path d={d} stroke="url(#routePath)" strokeWidth="3" fill="none"
      strokeLinecap="round" strokeLinejoin="round"
      strokeDasharray={`${reveal * pathLen} ${pathLen}`}/>
  );
}

function ConfidenceBand({ waypoints, localTime }) {
  const W = 1680, H = 480;
  const appear = clamp((localTime - 3.4) / 0.8, 0, 1);
  const widths = [0, 18, 34, 56, 78, 96];
  const pts = waypoints.map((wp, i) => ({ x: wp.x * W, y: wp.y * H, w: widths[i] || 0 }));
  const upper = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y - p.w}` : `L ${p.x} ${p.y - p.w}`)).join(' ');
  const lowerRev = [...pts].reverse().map(p => `L ${p.x} ${p.y + p.w}`).join(' ');
  return <path d={`${upper} ${lowerRev} Z`} fill="url(#confBand)" opacity={appear}/>;
}

function WaypointMarker({ wp, localTime, index }) {
  const t = clamp((localTime - wp.delay) / 0.5, 0, 1);
  const eased = Easing.easeOutBack(t);
  const color = wp.isDest ? BRAND.accent : wp.isOrigin ? '#fff' : 'rgba(255,255,255,0.9)';
  const size = wp.isOrigin || wp.isDest ? 20 : 14;
  const cardAbove = index % 2 === 1;
  const cardOffsetY = cardAbove ? -120 : 52;

  return (
    <div style={{
      position: 'absolute',
      left: `${wp.x * 100}%`, top: `${wp.y * 100}%`,
      transform: `translate(-50%, -50%) scale(${eased})`,
      opacity: t,
    }}>
      {wp.isDest && (
        <div style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: 60, height: 60,
          marginLeft: -30, marginTop: -30,
          borderRadius: 30,
          border: `2px solid ${BRAND.accent}`,
          opacity: 0.5,
          animation: 'pulseRing 1.6s ease-out infinite',
        }}/>
      )}

      <div style={{
        width: size, height: size,
        borderRadius: size / 2,
        background: color,
        border: wp.isDest ? `3px solid ${BRAND.accent}` : '2px solid rgba(6,90,130,0.8)',
        boxShadow: `0 0 20px ${color}`,
      }}/>

      <div style={{
        position: 'absolute',
        left: '50%', top: cardOffsetY,
        transform: 'translateX(-50%)',
        minWidth: 150,
        padding: '10px 14px',
        background: wp.isDest ? 'rgba(2,195,154,0.15)' : 'rgba(13,20,40,0.92)',
        border: wp.isDest ? `1.5px solid ${BRAND.accent}` : '1px solid rgba(255,255,255,0.15)',
        borderRadius: 8,
        backdropFilter: 'blur(8px)',
        whiteSpace: 'nowrap',
      }}>
        <div style={{
          fontFamily: FONT.sans, fontSize: 18, fontWeight: 700,
          color: '#fff', letterSpacing: '-0.01em', lineHeight: 1,
        }}>
          {wp.label}
          <span style={{
            fontFamily: FONT.mono, fontSize: 10, fontWeight: 500,
            color: 'rgba(255,255,255,0.5)', marginLeft: 8,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>{wp.sub}</span>
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 12, color: '#fff', marginTop: 6, lineHeight: 1.3 }}>
          {wp.eta}
        </div>
        <div style={{
          fontFamily: FONT.mono, fontSize: 11,
          color: wp.isOrigin ? BRAND.accent : 'rgba(127,216,255,0.85)',
          marginTop: 2, letterSpacing: '0.02em',
        }}>
          {wp.window}
        </div>
      </div>
    </div>
  );
}

function TruckOnRoute({ waypoints, localTime }) {
  const W = 1680, H = 480;
  const startT = 3.8, endT = 12;
  const p = clamp((localTime - startT) / (endT - startT), 0, 1);

  const segs = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i], b = waypoints[i + 1];
    const dx = (b.x - a.x) * W, dy = (b.y - a.y) * H;
    segs.push({ a, b, len: Math.sqrt(dx*dx + dy*dy) });
  }
  const totalLen = segs.reduce((s, g) => s + g.len, 0);
  let d = p * totalLen;
  let x = waypoints[0].x * W, y = waypoints[0].y * H;
  for (const g of segs) {
    if (d <= g.len) {
      const f = d / g.len;
      x = (g.a.x + (g.b.x - g.a.x) * f) * W;
      y = (g.a.y + (g.b.y - g.a.y) * f) * H;
      break;
    }
    d -= g.len;
    x = g.b.x * W; y = g.b.y * H;
  }

  const appear = clamp((localTime - startT) / 0.3, 0, 1);

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: 'translate(-50%, -50%)',
      opacity: appear,
      pointerEvents: 'none',
    }}>
      <div style={{
        width: 36, height: 36,
        borderRadius: 18,
        background: BRAND.accent,
        border: '3px solid #fff',
        boxShadow: `0 0 24px ${BRAND.accent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 7h11v10H3V7zm11 3h4l3 4v3h-7v-7z" fill="#0b1224"/>
          <circle cx="7" cy="18" r="2" fill="#fff" stroke="#0b1224" strokeWidth="1"/>
          <circle cx="18" cy="18" r="2" fill="#fff" stroke="#0b1224" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  );
}

// ── SCENE 6 — ITAR / Moat (56–66s) ─────────────────────────────────────────
function SceneMoat() {
  const { localTime } = useSprite();

  const features = [
    { label: 'Air-Gapped Servers' },
    { label: 'FIPS 140-2 Encryption' },
    { label: 'US Person Verification' },
    { label: 'Full Audit Trails' },
  ];

  return (
    <SceneBackdrop color="#0d1428">
      {/* radial accent */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 85% 30%, ${BRAND.primary}55, transparent 55%)`,
      }}/>
      <Grid color="rgba(255,255,255,0.05)" size={100}/>

      {/* left column */}
      <div style={{ position: 'absolute', left: 120, top: 110, width: 900 }}>
        <div style={{
          fontFamily: FONT.mono,
          fontSize: 18,
          color: BRAND.accent,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: 20,
          opacity: clamp(localTime / 0.4, 0, 1),
        }}>
          06 · The Moat
        </div>
        <div style={{
          fontFamily: FONT.sans,
          fontSize: 76,
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '-0.025em',
          lineHeight: 1,
          opacity: clamp((localTime - 0.2) / 0.6, 0, 1),
          transform: `translateY(${(1 - clamp((localTime - 0.2) / 0.6, 0, 1)) * 18}px)`,
        }}>
          The only AI platform<br/>
          built for <span style={{ color: BRAND.accent }}>defense logistics.</span>
        </div>

        <Sprite start={57.2} end={66}>
          {({ localTime: lt }) => {
            const t = clamp(lt / 0.5, 0, 1);
            return (
              <div style={{
                marginTop: 32,
                fontFamily: FONT.sans,
                fontSize: 22,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.5,
                maxWidth: 720,
                opacity: t,
                transform: `translateY(${(1 - t) * 12}px)`,
              }}>
                ITAR-regulated freight is a $3B niche with zero cloud AI options.
                We ship with compliance built in — not bolted on.
              </div>
            );
          }}
        </Sprite>

        <Sprite start={58.4} end={66}>
          {({ localTime: lt }) => {
            const t = clamp(lt / 0.5, 0, 1);
            return (
              <div style={{
                marginTop: 48,
                padding: 24,
                background: 'rgba(2,195,154,0.1)',
                border: `1px solid ${BRAND.accent}`,
                borderRadius: 10,
                opacity: t,
                transform: `translateY(${(1 - t) * 14}px)`,
                maxWidth: 720,
              }}>
                <div style={{
                  fontFamily: FONT.mono,
                  fontSize: 13,
                  color: BRAND.accent,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}>Stakes for Non-Compliance</div>
                <div style={{
                  fontFamily: FONT.sans,
                  fontSize: 36,
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}>$500K–$1M penalties per violation</div>
              </div>
            );
          }}
        </Sprite>
      </div>

      {/* Right column — feature checklist */}
      <div style={{ position: 'absolute', right: 120, top: 200, width: 640 }}>
        {features.map((f, i) => {
          const t = clamp((localTime - 1.5 - i * 0.25) / 0.5, 0, 1);
          const eased = Easing.easeOutCubic(t);
          return (
            <div key={i} style={{
              opacity: eased,
              transform: `translateX(${(1 - eased) * 24}px)`,
              padding: '26px 28px',
              marginBottom: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}>
              <div style={{
                width: 44, height: 44,
                borderRadius: 22,
                background: BRAND.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M4 10l4 4 8-8" stroke="#0d1428" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{
                fontFamily: FONT.sans,
                fontSize: 28,
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '-0.01em',
              }}>{f.label}</div>
            </div>
          );
        })}
      </div>

      <ChapterMark label="06 · The Moat" time="00:56"/>
    </SceneBackdrop>
  );
}

// ── SCENE 6 — Close (52–60s) ───────────────────────────────────────────────
function SceneClose() {
  const { localTime } = useSprite();

  return (
    <SceneBackdrop color={BRAND.dark}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at center, ${BRAND.primary} 0%, ${BRAND.dark} 70%)`,
      }}/>
      <Grid color="rgba(255,255,255,0.04)" size={120}/>

      {/* Centered lock-up */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: 1400,
      }}>
        <Sprite start={66} end={74}>
          {({ localTime: lt }) => {
            const t = Easing.easeOutBack(clamp(lt / 0.8, 0, 1));
            return (
              <div style={{
                opacity: clamp(lt / 0.8, 0, 1),
                transform: `scale(${0.85 + t * 0.15})`,
                marginBottom: 40,
              }}>
                <PrismLogo rotation={0}/>
              </div>
            );
          }}
        </Sprite>

        <Sprite start={66.5} end={74}>
          {({ localTime: lt }) => {
            const t = clamp(lt / 0.6, 0, 1);
            const eased = Easing.easeOutCubic(t);
            return (
              <div style={{
                opacity: eased,
                transform: `translateY(${(1 - eased) * 16}px)`,
                fontFamily: FONT.sans,
                fontSize: 128,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: 32,
              }}>
                Logistics<span style={{ color: BRAND.accent }}>Prizm</span>
              </div>
            );
          }}
        </Sprite>

        <Sprite start={67.2} end={74}>
          {({ localTime: lt }) => {
            const t = clamp(lt / 0.6, 0, 1);
            return (
              <div style={{
                opacity: t,
                transform: `translateY(${(1 - t) * 12}px)`,
                fontFamily: FONT.sans,
                fontSize: 40,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.75)',
                letterSpacing: '-0.01em',
                marginBottom: 80,
              }}>
                The AI brain for modern logistics.
              </div>
            );
          }}
        </Sprite>

        <Sprite start={68.0} end={74}>
          {({ localTime: lt }) => {
            const t = clamp(lt / 0.5, 0, 1);
            return (
              <div style={{
                opacity: t,
                display: 'flex',
                justifyContent: 'center',
                gap: 48,
                alignItems: 'baseline',
                fontFamily: FONT.mono,
                fontSize: 16,
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                <span>logisticsprizm.com</span>
                <span style={{ color: BRAND.accent }}>·</span>
                <span>summer 2026</span>
              </div>
            );
          }}
        </Sprite>
      </div>

      <ChapterMark label="07 · Close" time="01:06"/>
    </SceneBackdrop>
  );
}

// ── Timestamp label updater for commenting ──────────────────────────────────
function TimestampLabel() {
  const time = useTime();
  React.useEffect(() => {
    const root = document.querySelector('[data-video-root]');
    if (root) {
      const sec = Math.floor(time);
      root.setAttribute('data-screen-label', `t=${sec}s`);
    }
  }, [Math.floor(time)]);
  return null;
}

// ── Main video component ────────────────────────────────────────────────────
function LogisticsPrizmVideo() {
  return (
    <Stage width={1920} height={1080} duration={74} background="#0d0f1a" persistKey="lp-video">
      <TimestampLabel/>

      <Sprite start={0} end={8}><SceneMess/></Sprite>
      <Sprite start={8} end={18}><SceneProblem/></Sprite>
      <Sprite start={18} end={28}><SceneSolution/></Sprite>
      <Sprite start={28} end={42}><SceneProduct/></Sprite>
      <Sprite start={42} end={56}><SceneTracking/></Sprite>
      <Sprite start={56} end={66}><SceneMoat/></Sprite>
      <Sprite start={66} end={74}><SceneClose/></Sprite>
    </Stage>
  );
}

Object.assign(window, { LogisticsPrizmVideo });
