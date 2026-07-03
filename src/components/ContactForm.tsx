import { motion, useReducedMotion } from 'motion/react';

const fadeUp = (reduce: boolean) => reduce ? {} : {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

function ContactItem({ icon, label, value, href }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Tag = href ? motion.a : motion.div;
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' as const } : {};

  return (
    <Tag
      {...props}
      className="flex items-center gap-5 group cursor-pointer"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="w-12 h-12 border border-white/[0.08] flex items-center justify-center transition-colors duration-200 group-hover:border-[#5ed29c]/30"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-zinc-400 transition-colors duration-200 group-hover:text-[#5ed29c]">
          {icon}
        </span>
      </motion.div>
      <div>
        <p className="text-[11px] text-zinc-600 uppercase tracking-wider font-medium">{label}</p>
        <p className="text-white text-lg font-medium">{value}</p>
      </div>
    </Tag>
  );
}

export default function ContactForm() {
  const reduce = useReducedMotion();
  const anim = fadeUp(reduce);

  return (
    <section id="contacto" className="py-32 md:py-44 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">        
        <motion.div
          {...anim}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-20"
        >
          <h2 className="text-[clamp(32px,5vw,52px)] font-bold tracking-tight text-white leading-[0.92] mb-5">
            ¿Listo para modernizar<br />
            <span className="text-[#5ed29c]">tu negocio</span>?
          </h2>
          <p className="text-base md:text-lg text-zinc-500 leading-relaxed">
            Cuéntame qué procesos de tu negocio te gustaría optimizar. Te ofrezco una asesoría gratuita de 30 minutos para identificar oportunidades con tecnología real.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <motion.div
            {...anim}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <ContactItem
              href="tel:+528342550555"
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
              label="Llamada directa"
              value="+52 834 255 0555"
            />

            <ContactItem
              href="https://wa.me/528342550555"
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
              label="WhatsApp"
              value="Enviar mensaje"
            />

            <ContactItem
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
              label="Ubicación"
              value="Ciudad Victoria, Tam."
            />
          </motion.div>

          <motion.div
            {...anim}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="border border-white/[0.08] p-8 md:p-12 bg-white/[0.02] relative overflow-hidden rounded-2xl"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#5ed29c]/20 to-transparent" />
            <h3 className="text-white font-semibold text-lg mb-3">Cuéntame sobre tu negocio</h3>
            <p className="text-zinc-400 leading-relaxed text-sm mb-8">
              Antes de agendar una videollamada, llena este formulario de diagnóstico para que llegue con contexto de tu negocio.
            </p>

            <motion.a
              href="https://forms.gle/sDkykwkQc9MqcBFj6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 bg-[#5ed29c] text-[#070b0a] font-medium text-sm h-12 px-6 rounded-full transition-[background-color,box-shadow] duration-200 ease-out hover:bg-[#4cbf87] hover:shadow-[0_0_25px_rgba(94,210,156,0.12)] relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              Llenar formulario de diagnóstico
            </motion.a>

            <p className="text-center text-zinc-600 text-xs font-medium mt-6">
              Sin compromiso. Solo conversamos si ves valor en lo que propongo.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
