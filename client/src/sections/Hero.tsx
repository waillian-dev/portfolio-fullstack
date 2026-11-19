import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Download, Sparkles } from 'lucide-react';
import { IProfile, ISiteSetting } from '../types';
import { Button } from '../components/ui/Button';

interface HeroProps {
  profile?: IProfile;
  settings?: ISiteSetting;
}

export const Hero: React.FC<HeroProps> = ({ profile, settings }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {profile?.availabilityStatus || '● Available for Freelance & Full-Time'}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                {profile?.fullName || 'Waillian Chit'}
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold text-muted-foreground">
              {profile?.headline || 'Senior Full-Stack Developer & Software Architect'}
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground/90 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {profile?.bio ||
                'I design and engineer high-performance web applications, cloud architecture, and intuitive user interfaces using the MERN stack and TypeScript.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#projects">
                <Button size="lg" className="gap-2 shadow-xl shadow-primary/25">
                  View My Work <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline">
                  Contact Me
                </Button>
              </a>
              {profile?.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="ghost" className="gap-2">
                    <Download className="w-4 h-4" /> Resume
                  </Button>
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-muted-foreground">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground/60">
                Connect:
              </span>
              {settings?.socialLinks?.github && (
                <a
                  href={settings.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card border border-border/60 hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card border border-border/60 hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Avatar Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden glass-card p-3 border border-border/80 shadow-2xl group">
              <img
                src={
                  profile?.avatarUrl ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'
                }
                alt={profile?.fullName || 'Developer Avatar'}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-6 left-6 right-6 p-3 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-primary">
                  <Sparkles className="w-4 h-4" /> Senior Engineer
                </span>
                <span className="text-muted-foreground">5+ Years Exp</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
