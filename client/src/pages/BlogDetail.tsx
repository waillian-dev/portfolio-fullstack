import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogPostBySlug } from '../services/api';
import { IBlogPost } from '../types';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Calendar, Clock, Eye, User } from 'lucide-react';
import { formatDate } from '../lib/utils';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlogPostBySlug(slug)
        .then(setPost)
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

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Article Not Found</h2>
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
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Link to="/#blog" className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default">{post.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" /> {formatDate(post.publishedAt || post.createdAt)}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" /> {post.readingTimeMinutes || 5} min read
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="w-3.5 h-3.5" /> {post.viewsCount} Views
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/40">
              <User className="w-4 h-4 text-primary" />
              <span>Written by <strong className="text-foreground">{post.author}</strong></span>
            </div>
          </div>

          {post.coverImage && (
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
              <img src={post.coverImage} alt={post.title} className="w-full h-auto object-cover max-h-[400px]" />
            </div>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-foreground/90 leading-relaxed">
            <p className="text-lg font-medium text-muted-foreground italic border-l-4 border-primary pl-4 py-1">
              {post.summary}
            </p>
            <div className="whitespace-pre-line text-sm sm:text-base">{post.content}</div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="pt-8 border-t border-border flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground">Tags:</span>
              {post.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};
