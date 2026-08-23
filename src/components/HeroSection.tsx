import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useReducedMotion } from 'motion/react';
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
  // Critically damped by default (damping 1.0, response ~0.4) so the
  // button settles onto the pointer without overshoot — this is a
  // reposition, not a flick, so no bounce.
  const x = useSpring(0, { stiffness: 260, damping: 26, mass: 0.6 });
  const y = useSpring(0, { stiffness: 260, damping: 26, mass: 0.6 });

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
      transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
    >
      {children}
    </motion.a>
  );
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    if (!menu) return;
    const focusable = menu.querySelectorAll<HTMLElement>('a, button');
    if (focusable.length) focusable[0].focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); return; }
      if (e.key !== 'Tab' || focusable.length < 2) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

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

  // Ambient depth: the hero's glow drifts in 3D with the cursor, the same
  // "responds to you" language the service cards use, applied quietly here.
  const glowX = useSpring(0, { stiffness: 40, damping: 20, mass: 1 });
  const glowY = useSpring(0, { stiffness: 40, damping: 20, mass: 1 });
  const glowRotateX = useSpring(0, { stiffness: 40, damping: 20, mass: 1 });
  const glowRotateY = useSpring(0, { stiffness: 40, damping: 20, mass: 1 });

  useEffect(() => {
    if (reduce || matchMedia('(pointer: coarse)').matches) return;
    const handleMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      glowX.set(nx * 40);
      glowY.set(ny * 24);
      glowRotateY.set(nx * 6);
      glowRotateX.set(-ny * 6);
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [reduce]);

  return (
    <div className="relative min-h-[100dvh] bg-background overflow-hidden">
      {/* ── Fixed Video Background ── */}
      <div className="fixed inset-0 z-0 overflow-hidden">
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

        {/* Ambient glow, tilting in 3D toward the cursor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[800px] h-[400px] [perspective:1000px]">
          <motion.div
            className="w-full h-full"
            style={{ x: glowX, y: glowY, rotateX: glowRotateX, rotateY: glowRotateY }}
          >
            <svg viewBox="0 0 800 400" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="h-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="40" />
                </filter>
              </defs>
              <ellipse cx="400" cy="200" rx="350" ry="120" fill="var(--color-accent-val)" opacity="0.06" filter="url(#h-glow)" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <header className={`material-nav fixed top-0 left-0 right-0 z-50${scrolled ? ' is-scrolled' : ''}`}>
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.a
            href="/"
            className="flex items-center gap-2.5 text-foreground text-lg font-bold tracking-[0.15em]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          >
            <img src="/logo-icon.png" alt="" className="h-7 w-7" width={28} height={28} />
            NODO DIGITAL
          </motion.a>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-underline text-sm text-ink-2 hover:text-foreground transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <motion.a
              href="#contacto"
              className={buttonVariants({
                variant: 'default',
                className: "rounded-full px-5 h-9 text-sm font-medium bg-primary text-primary-foreground hover:bg-[var(--color-accent-h-val)] hover:shadow-[0_0_20px_var(--color-accent-subtle-val)] transition-[background-color,box-shadow] duration-200"
              })}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            >
              Iniciar proyecto
            </motion.a>
          </div>

          <div className="flex lg:hidden">
            <button
              className="text-foreground active:scale-90 transition-transform duration-150"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <motion.div
                animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
      {menuOpen && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, backdropFilter: 'blur(0px)' }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, backdropFilter: 'blur(24px)' }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, backdropFilter: 'blur(0px)' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className="fixed inset-0 z-40 bg-background/90 backdrop-saturate-150 flex flex-col items-center justify-center gap-10 overflow-y-auto py-20"
        >
          <button
            className="absolute top-6 right-6 text-foreground active:scale-90 transition-transform duration-150"
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
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.05 * i, type: 'spring', bounce: 0, duration: 0.4 }}
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
            transition={{ delay: 0.2, type: 'spring', bounce: 0, duration: 0.4 }}
          >
            Iniciar proyecto
          </motion.a>
        </motion.div>
      )}
      </AnimatePresence>

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
            Deja de perder tiempo
            <br />
            <span className="text-[var(--color-accent-val)]">en lo que el software ya puede hacer por ti</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-ink-2 max-w-xl leading-relaxed mb-12"
        >
          Sistemas de venta, inventario y chatbots hechos a la medida de tu negocio en Cd. Victoria. Sin letras chiquitas, sin depender de programas genéricos que no entienden cómo trabajas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <MagneticButton href="#contacto">
            Iniciar proyecto
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
          </MagneticButton>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-foreground active:scale-95 transition-[color,transform] duration-150 py-3.5 px-2 group/secondary"
          >
            Ver servicios
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/secondary:translate-x-0.5" />
          </a>
        </motion.div>

      </div>
    </div>
  );
}
