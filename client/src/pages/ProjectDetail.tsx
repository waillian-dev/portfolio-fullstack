import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjectBySlug } from '../services/api';
import { IProject } from '../types';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Github, ExternalLink, ArrowLeft, Calendar, Eye, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../lib/utils';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchProjectBySlug(slug)
        .then(setProject)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Link to="/#projects" className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default">{project.category}</Badge>
              {project.completionDate && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" /> Completed: {formatDate(project.completionDate)}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="w-3.5 h-3.5" /> {project.viewsCount} Views
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button size="md" className="gap-2">
                  Live Demo <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button size="md" variant="outline" className="gap-2">
                  <Github className="w-4 h-4" /> Source Code
                </Button>
              </a>
            )}
          </div>

          {/* Hero Thumbnail Image */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
            <img src={project.thumbnailUrl} alt={project.title} className="w-full h-auto object-cover max-h-[450px]" />
          </div>

          {/* Detailed Content */}
          <div className="space-y-8 text-foreground/90 leading-relaxed">
            {project.fullDescription && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Project Overview</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </p>
              </div>
            )}

            {project.problemStatement && (
              <div className="space-y-3 p-6 rounded-xl bg-card border border-border/60">
                <h3 className="text-lg font-bold text-primary">The Problem</h3>
                <p className="text-sm text-muted-foreground">{project.problemStatement}</p>
              </div>
            )}

            {project.solutionStatement && (
              <div className="space-y-3 p-6 rounded-xl bg-card border border-border/60">
                <h3 className="text-lg font-bold text-emerald-500">The Solution</h3>
                <p className="text-sm text-muted-foreground">{project.solutionStatement}</p>
              </div>
            )}

            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border/50 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
