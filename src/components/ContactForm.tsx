export default function ContactForm() {
  return (
    <section id="contacto" className="py-24 md:py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              ¿Listo para modernizar tu negocio?
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed mb-12">
              Cuéntame tus cuellos de botella. Agendaremos una asesoría gratuita de 30 minutos para analizar si la tecnología puede ayudarte a facturar más trabajando menos.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <svg className="w-5 h-5 text-zinc-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Llamada directa</p>
                  <p className="text-white">+52 834 255 0555</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <svg className="w-5 h-5 text-zinc-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ubicación</p>
                  <p className="text-white">Ciudad Victoria, Tam.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-reveal" style={{ transitionDelay: '150ms' }}>
            <div className="border border-white/[.06] p-8 md:p-10">
              <div className="space-y-6">
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
                  className="w-full inline-flex items-center justify-center gap-3 bg-white text-zinc-950 hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 h-12 px-6 font-semibold"
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
