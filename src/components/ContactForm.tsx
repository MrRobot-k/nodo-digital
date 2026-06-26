export default function ContactForm() {
  return (
    <section id="contacto" className="py-24 md:py-32 px-6 relative">
      {/* Background glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full max-w-3xl h-64 bg-emerald-900/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[--color-accent] animate-pulse"></span>
              <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest">Inicia tu proyecto</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              ¿Listo para <span className="text-gradient-accent">modernizar</span> tu negocio?
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              Cuéntame tus cuellos de botella. Agendaremos una asesoría gratuita de 30 minutos para analizar si la tecnología puede ayudarte a facturar más trabajando menos.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[--color-accent]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium">Llamada directa</p>
                  <p className="text-white">+52 834 255 0555</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[--color-accent]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium">Ubicación</p>
                  <p className="text-white">Ciudad Victoria, Tam.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-reveal" style={{ transitionDelay: '150ms' }}>
            <div className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group">
              {/* Highlight effect on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-white font-semibold text-xl">Cuéntame sobre tu negocio</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    Antes de agendar una reunión, llena este formulario rápido de diagnóstico. No te toma más de 10 minutos y me ayuda a preparar una propuesta real para ti.
                  </p>
                </div>

                <a
                  href="https://forms.gle/sDkykwkQc9MqcBFj6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 bg-white text-zinc-950 hover:bg-zinc-200 hover:scale-[1.02] transition-all duration-300 h-12 rounded-full font-semibold"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  Llenar formulario de diagnóstico
                </a>

                <p className="text-center text-zinc-500 text-xs font-medium">
                  Información 100% confidencial. No spam, garantizado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}