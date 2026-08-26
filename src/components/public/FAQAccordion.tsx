'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  categories?: string[];
}

export function FAQAccordion({ faqs, categories }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const cats = categories || [...new Set(faqs.map((f) => f.category))];
  const filtered = activeCategory === 'all' ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div>
      {cats.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'px-4 py-2 text-sm transition-colors',
              activeCategory === 'all' ? 'bg-artist-crimson text-warm-cream' : 'text-muted-beige hover:text-warm-cream'
            )}
          >
            All
          </button>
          {cats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 text-sm capitalize transition-colors',
                activeCategory === cat ? 'bg-artist-crimson text-warm-cream' : 'text-muted-beige hover:text-warm-cream'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((faq) => (
          <div key={faq._id} className="border border-warm-gray/20 bg-soft-black/50">
            <button
              onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-display text-lg text-warm-cream pr-4">{faq.question}</span>
              <motion.div animate={{ rotate: openId === faq._id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={20} className="text-aged-gold flex-shrink-0" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openId === faq._id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-muted-beige leading-relaxed prose-content" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
