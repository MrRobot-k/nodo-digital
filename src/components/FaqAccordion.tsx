import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const preguntas = [
  {
    q: "¿Cuánto cuesta desarrollar un sistema a la medida?",
    r: "Depende de la complejidad y el alcance. Por eso empezamos con un diagnóstico gratuito donde entendemos tus necesidades y te damos una cotización exacta. No hay costos ocultos ni sorpresas.",
  },
  {
    q: "¿Cuánto tiempo toma hacer una página web profesional?",
    r: "Una página web optimizada con rendimiento premium puede estar lista en 2 a 4 semanas, dependiendo de las funcionalidades que necesites. Te entrego un sitio rápido, conectado con WhatsApp y listo para captar clientes.",
  },
  {
    q: "¿Necesito conocimientos técnicos para trabajar contigo?",
    r: "Para nada. Yo me encargo de toda la parte técnica. Solo necesitas saber qué procesos de tu negocio te gustaría mejorar o automatizar. El resto lo hacemos juntos paso a paso.",
  },
  {
    q: "¿Dan mantenimiento después de entregar el proyecto?",
    r: "Sí, incluyo soporte técnico continuo después de la entrega. Además, podemos acordar actualizaciones y mejoras periódicas conforme tu negocio crezca o cambien tus necesidades.",
  },
  {
    q: "¿Qué tecnologías utilizan?",
    r: "Trabajo con tecnologías web modernas y estables: React, Node.js, Python, bases de datos relacionales, e integración con APIs. Todo el código se prueba antes de entregarse para garantizar calidad y rendimiento.",
  },
  {
    q: "¿Solo trabajas con negocios locales o también remoto?",
    r: "Estoy basado en Cd. Victoria, Tamaulipas, pero trabajo con clientes de todo México. Las reuniones pueden ser presenciales (si estás en la ciudad) o por videollamada. El servicio es el mismo.",
  },
];

export default function FaqAccordion() {
  return (
    <Accordion className="w-full">
      {preguntas.map((item, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i}`}
          className="border-border py-1"
        >
          <AccordionTrigger className="text-base md:text-lg font-medium text-foreground leading-snug py-5 hover:no-underline hover:text-[var(--color-accent-val)] transition-colors duration-200 [&[data-slot=accordion-trigger]]:px-0">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-ink-2 leading-relaxed pb-5 [&>div]:pt-0">
            {item.r}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
