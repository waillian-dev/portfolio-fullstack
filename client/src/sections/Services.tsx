import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { IService } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Services: React.FC<{ services: IService[] }> = ({ services }) => {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Services & Solutions</h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            What I Bring To Your Project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-8 h-full flex flex-col justify-between hover:border-primary/60 transition-all group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-8 flex items-center justify-between border-t border-border/50 mt-6">
                  {service.priceRange && (
                    <span className="text-xs font-semibold text-muted-foreground">
                      {service.priceRange}
                    </span>
                  )}
                  <a href="#contact">
                    <Button size="sm" variant="ghost" className="gap-1 text-primary">
                      {service.ctaText || 'Get in Touch'} <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
