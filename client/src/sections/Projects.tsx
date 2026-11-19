import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { IProject, ProjectCategory } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const categories: (ProjectCategory | 'All')[] = [
  'All',
  'Web',
  'Mobile',
  'Backend',
  'Dashboard',
  'UI/UX',
  'Other',
];

export const Projects: React.FC<{ projects: IProject[] }> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((proj) => proj.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-card/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Featured Work</h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Projects & Technical Cases
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="overflow-hidden flex flex-col h-full hover:border-primary/50 transition-all group">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.featured && (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-primary">{project.category}</span>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <Link to={`/projects/${project.slug}`}>
                      <Button size="sm" variant="ghost" className="gap-1 text-xs">
                        Details <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-muted-foreground hover:text-foreground rounded"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-muted-foreground hover:text-primary rounded"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
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
