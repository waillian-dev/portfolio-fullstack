import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { ITestimonial } from '../types';
import { Card } from '../components/ui/Card';

export const Testimonials: React.FC<{ testimonials: ITestimonial[] }> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Recommendations</h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Client & Colleague Endorsements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item._id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-8 relative h-full flex flex-col justify-between space-y-6 hover:border-primary/50 transition-all">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <img
                    src={
                      item.avatarUrl ||
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
                    }
                    alt={item.clientName}
                    className="w-11 h-11 rounded-full object-cover border border-primary/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{item.clientName}</h4>
                    <p className="text-xs text-muted-foreground">
                      {item.jobTitle} {item.company ? `at ${item.company}` : ''}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
