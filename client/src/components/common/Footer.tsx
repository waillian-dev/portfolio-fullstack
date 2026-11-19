import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { ISiteSetting } from '../../types';

export const Footer: React.FC<{ settings?: ISiteSetting }> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card/40 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            {settings?.siteTitle || 'Alex Vance'}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {settings?.siteDescription || 'Senior Full-Stack Developer & Software Architect'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {settings?.socialLinks?.github && (
            <a
              href={settings.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-muted"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {settings?.socialLinks?.linkedin && (
            <a
              href={settings.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-muted"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {settings?.socialLinks?.twitter && (
            <a
              href={settings.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-muted"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
        </div>

        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <span>© {currentYear} Waillian Chit. Built with</span>
          {/* <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> */}
          <span>and MERN Stack.</span>
        </div>
      </div>
    </footer>
  );
};
