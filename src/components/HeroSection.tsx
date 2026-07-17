import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#about' },
  { label: 'FAQ', href: '#faq' },
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
      className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-semibold text-sm px-8 py-3.5 rounded-full transition-[background-color,box-shadow] duration-200 ease-out will-change-transform hover:bg-[var(--color-accent-h-val)] hover:shadow-[0_0_30px_var(--color-accent-subtle-val)]"
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
    <div className="relative min-h-[100dvh] bg-background overflow-hidden">
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
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[800px] h-[400px]">
          <svg viewBox="0 0 800 400" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="h-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="40" />
              </filter>
            </defs>
            <ellipse cx="400" cy="200" rx="350" ry="120" fill="var(--color-accent-val)" opacity="0.06" filter="url(#h-glow)" />
          </svg>
        </div>
      </div>

      {/* ── Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.a
            href="/"
            className="text-foreground text-lg font-bold tracking-[0.15em]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            NODO DIGITAL
          </motion.a>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-ink-2 hover:text-foreground transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className={buttonVariants({
                variant: 'default',
                className: "rounded-full px-5 h-9 text-sm font-medium bg-primary text-primary-foreground hover:bg-[var(--color-accent-h-val)] hover:shadow-[0_0_20px_var(--color-accent-subtle-val)] transition-[background-color,box-shadow] duration-200"
              })}
            >
              Iniciar proyecto
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              className="text-foreground"
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
          </div>
        </nav>
      </header>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-background/95 flex flex-col items-center justify-center gap-10"
        >
          <button
            className="absolute top-6 right-6 text-foreground"
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
              className="text-foreground text-2xl font-medium hover:text-[var(--color-accent-val)] transition-colors duration-200"
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
            className="text-primary-foreground bg-primary px-8 py-3 font-medium text-sm rounded-full inline-flex items-center justify-center"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded-full mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-val)]" />
            <span className="text-xs text-ink-2">
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
          <h1 className="text-[clamp(40px,9vw,88px)] font-bold tracking-tight text-foreground leading-[0.88] max-w-5xl mb-6">
            Apps que se adaptan
            <br />
            <span className="text-[var(--color-accent-val)]">a tu negocio, no al revés</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-ink-2 max-w-xl leading-relaxed mb-12"
        >
          Desarrollamos apps nativas para Mac, Windows, iOS, Android y Linux — además de web. Tu negocio dicta las reglas, no el software.
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
            className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-foreground transition-colors duration-200 py-3.5 px-2 group/secondary"
          >
            Ver servicios
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/secondary:translate-x-0.5" />
          </a>
        </motion.div>

      </div>
    </div>
  );
}
