import React from 'react';
import { motion } from 'framer-motion';
import { Award, FolderCheck, Users, Cpu, MapPin, Briefcase } from 'lucide-react';
import { IProfile } from '../types';
import { Card } from '../components/ui/Card';

export const About: React.FC<{ profile?: IProfile }> = ({ profile }) => {
  const stats = [
    {
      label: 'Years Experience',
      value: `${profile?.stats?.yearsExperience || 5}+`,
      icon: Award,
    },
    {
      label: 'Completed Projects',
      value: `${profile?.stats?.completedProjects || 30}+`,
      icon: FolderCheck,
    },
    {
      label: 'Total Clients',
      value: `${profile?.stats?.totalClients || 15}+`,
      icon: Users,
    },
    {
      label: 'Technologies',
      value: `${profile?.stats?.technologiesMastered || 20}+`,
      icon: Cpu,
    },
  ];

  return (
    <section id="about" className="py-24 bg-card/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">About Me</h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Architecting Robust Digital Experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">
              Passionate Software Engineer based in {profile?.location || 'San Francisco, CA'}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {profile?.bio ||
                'I specialize in building full-stack applications with clean code standards, microservices architecture, and scalable design patterns.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-sm font-medium">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{profile?.location || 'San Francisco, CA'}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4 text-primary" />
                <span>Full-Time & Consulting</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 grid grid-cols-2 gap-6"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="p-6 text-center hover:border-primary/50 transition-all">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                </Card>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
