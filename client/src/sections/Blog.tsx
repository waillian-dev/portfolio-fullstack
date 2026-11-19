import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { IBlogPost } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { formatDate } from '../lib/utils';
import { Link } from 'react-router-dom';

export const Blog: React.FC<{ posts: IBlogPost[] }> = ({ posts }) => {
  return (
    <section id="blog" className="py-24 bg-card/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Articles & Thoughts</h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Latest Tech Writing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="overflow-hidden flex flex-col h-full hover:border-primary/50 transition-all group">
                {post.coverImage && (
                  <div className="relative h-44 overflow-hidden bg-muted">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold text-primary">{post.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readingTimeMinutes || 5} min read
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                    <Link to={`/blog/${post.slug}`}>
                      <Button size="sm" variant="ghost" className="gap-1 text-xs text-primary">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
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
