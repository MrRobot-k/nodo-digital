import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'SERVICIOS', href: '#servicios' },
  { label: 'PROCESO', href: '#about' },
  { label: 'CONTACTO', href: '#contacto' },
];

const HLS_SRC =
  'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: any = null;

    (async () => {
      const Hls = (await import('hls.js')).default;
      if (Hls.isSupported()) {
        hlsInstance = new Hls({ enableWorker: false });
        hlsInstance.loadSource(HLS_SRC);
        hlsInstance.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = HLS_SRC;
      }
    })();

    return () => {
      if (hlsInstance) hlsInstance.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div className="relative min-h-screen bg-[#070b0a]">
      {/* ── Fixed Video Background ── */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-transparent to-transparent" />

        {/* Grid Lines */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full max-w-7xl mx-auto px-6">
            <div
              className="absolute top-0 bottom-0 w-px bg-white/[0.07]"
              style={{ left: '25%' }}
            />
            <div
              className="absolute top-0 bottom-0 w-px bg-white/[0.07]"
              style={{ left: '50%' }}
            />
            <div
              className="absolute top-0 bottom-0 w-px bg-white/[0.07]"
              style={{ left: '75%' }}
            />
          </div>
        </div>

        {/* Central Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full max-w-[1200px]">
          <svg
            viewBox="0 0 1200 400"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="25" />
              </filter>
            </defs>
            <ellipse
              cx="600"
              cy="200"
              rx="500"
              ry="120"
              fill="#5ed29c"
              opacity="0.10"
              filter="url(#glow)"
            />
          </svg>
        </div>
      </div>

      {/* ── Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b0a]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="text-white text-lg font-bold tracking-[0.15em]">
            XOLVENTA
          </span>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/60 hover:text-[#5ed29c] text-xs font-semibold tracking-[0.12em] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070b0a]/95 flex flex-col items-center justify-center gap-10">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-xl font-semibold tracking-[0.12em] hover:text-[#5ed29c] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* ── Hero Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-20 min-h-screen flex flex-col justify-center">
        {/* Liquid Glass Card */}
        <div className="liquid-glass w-[200px] h-[200px] p-5 -translate-y-10 lg:-translate-y-12 mb-8">
          <span className="block text-white/40 text-[13px] font-mono tracking-wider mb-3">
            [ 2025 ]
          </span>
          <h3
            className="text-[18px] text-white/90 leading-[1.25] mb-2 font-semibold"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Primero te{' '}
            <em className="font-[Instrument_Serif] italic font-normal text-white">
              conozco
            </em>
            ,
          </h3>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Consulta gratuita. Analizamos tu negocio y te proponemos la solución ideal.
          </p>
        </div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] mb-8 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] animate-pulse" />
          <span
            className="text-[11px] font-bold tracking-[0.18em] text-[#5ed29c] uppercase leading-none"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Cd. Victoria, Tamaulipas
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className="text-[40px] md:text-[64px] lg:text-[72px] font-extrabold uppercase tracking-tight text-white leading-[0.92] max-w-4xl mb-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Tecnología premium para tu negocio
          <span className="text-[#5ed29c]">.</span>
        </h1>

        {/* Description */}
        <p
          className="text-[14px] text-white/70 max-w-lg leading-relaxed mb-12"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Automatización con IA, software a la medida y páginas web profesionales
          para empresas en Ciudad Victoria. Primero te conozco, luego te propongo
          algo útil.
        </p>

        {/* CTA */}
        <a
          href="#contacto"
          className="group inline-flex items-center gap-3 bg-[#5ed29c] text-[#070b0a] font-bold text-[13px] tracking-[0.12em] uppercase rounded-full px-9 py-[18px] w-fit hover:scale-[1.02] transition-transform duration-300"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Iniciar Proyecto
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </div>
  );
}
