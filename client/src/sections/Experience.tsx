import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { IExperience } from '../types';
import { formatDate } from '../lib/utils';
import { Badge } from '../components/ui/Badge';

export const Experience: React.FC<{ experiences: IExperience[] }> = ({ experiences }) => {
  return (
    <section id="experience" className="py-24 bg-card/30 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Career Journey</h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Work Experience & Background
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative border-l-2 border-border/80 ml-4 sm:ml-32 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp._id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 group"
            >
              {/* Timeline marker node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:scale-125 transition-transform" />

              {/* Date string for desktop sidebar alignment */}
              <div className="hidden sm:block absolute -left-36 top-1 text-xs font-semibold text-muted-foreground w-28 text-right">
                {formatDate(exp.startDate)} — {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
              </div>

              {/* Main Card */}
              <div className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.jobTitle}</h3>
                    <p className="text-sm font-semibold text-primary">{exp.company}</p>
                  </div>
                  <Badge variant={exp.isCurrent ? 'success' : 'secondary'}>
                    {exp.employmentType}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground sm:hidden">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(exp.startDate)} — {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>

                {exp.location && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{exp.location}</span>
                  </div>
                )}

                <p className="text-sm text-muted-foreground">{exp.description}</p>

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
