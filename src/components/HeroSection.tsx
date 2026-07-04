import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#about' },
  { label: 'Contacto', href: '#contacto' },
];

const HLS_SRC =
  'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    if (reduce || !ref.current) return;
    const el = ref.current;
    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      x.set(dx * 12);
      y.set(dy * 12);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', handleLeave);
    return () => {
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
    };
  }, [reduce]);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      className="group inline-flex items-center gap-3 bg-[#5ed29c] text-[#070b0a] font-semibold text-sm px-8 py-3.5 rounded-full transition-[background-color,box-shadow] duration-200 ease-out will-change-transform hover:bg-[#4cbf87] hover:shadow-[0_0_30px_rgba(94,210,156,0.15)]"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

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
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) video.src = HLS_SRC;
    })();

    return () => {
      if (hlsInstance) hlsInstance.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const fadeUp = reduce ? {} : {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#070b0a] overflow-hidden">
      {/* ── Fixed Video Background ── */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[120%] object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#070b0a] via-[#070b0a]/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#070b0a] via-[#070b0a]/30 to-transparent" />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[800px] h-[400px]">
          <svg viewBox="0 0 800 400" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="h-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="40" />
              </filter>
            </defs>
            <ellipse cx="400" cy="200" rx="350" ry="120" fill="#5ed29c" opacity="0.06" filter="url(#h-glow)" />
          </svg>
        </div>
      </div>

      {/* ── Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b0a]/60 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.a
            href="/"
            className="text-white text-lg font-bold tracking-[0.15em]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            NODO DIGITAL
          </motion.a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="ml-4 text-sm font-medium text-[#070b0a] bg-[#5ed29c] px-5 py-2 rounded-full transition-colors duration-200 ease-out hover:bg-[#4cbf87] hover:shadow-[0_0_20px_rgba(94,210,156,0.12)] active:scale-[0.96]"
            >
              Iniciar proyecto
            </a>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <motion.div
              animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
        </nav>
      </header>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-[#070b0a]/95 flex flex-col items-center justify-center gap-10"
        >
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl font-medium hover:text-[#5ed29c] transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="text-[#070b0a] bg-[#5ed29c] px-8 py-3 font-medium text-sm rounded-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.96 }}
            transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Iniciar proyecto
          </motion.a>
        </motion.div>
      )}

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 min-h-[100dvh] flex flex-col justify-center">
        {/* Location badge */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/[0.06] rounded-full mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c]" />
            <span className="text-xs text-zinc-400">
              Cd. Victoria, Tamaulipas
            </span>
          </div>
        </motion.div>

        {/* Headline with clip-path reveal */}
        <motion.div
          initial={reduce ? {} : { clipPath: 'inset(0 100% 0 0)' }}
          animate={reduce ? {} : { clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: 1, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="text-[clamp(40px,9vw,88px)] font-bold tracking-tight text-white leading-[0.88] max-w-5xl mb-6">
            Software a la medida
            <br />
            <span className="text-[#5ed29c]">de tu negocio</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-white/50 max-w-xl leading-relaxed mb-12"
        >
          Automatización con IA, desarrollo web y sistemas diseñados para tu forma de trabajar.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <MagneticButton href="#contacto">
            Iniciar proyecto
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </MagneticButton>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200 py-3.5 px-2"
          >
            Ver servicios
          </a>
        </motion.div>

      </div>
    </div>
  );
}
