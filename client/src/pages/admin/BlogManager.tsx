import React, { useEffect, useState } from 'react';
import {
  fetchBlogPosts,
  createBlogPostApi,
  updateBlogPostApi,
  deleteBlogPostApi,
} from '../../services/api';
import { IBlogPost } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { Plus, Edit2, Trash2, FileText, Clock, Eye, User, Tag } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<IBlogPost> | null>(null);

  // Local helper state for tags string
  const [tagsText, setTagsText] = useState('');

  const loadPosts = async () => {
    try {
      const data = await fetchBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const openCreateModal = () => {
    setEditingPost({
      title: '',
      summary: '',
      content: '',
      category: 'Engineering',
      author: 'Alex Vance',
      readingTimeMinutes: 5,
      isPublished: true,
      coverImage: '',
      tags: [],
    });
    setTagsText('');
    setIsModalOpen(true);
  };

  const openEditModal = (post: IBlogPost) => {
    setEditingPost(post);
    setTagsText(post.tags?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const parsedTags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload: Partial<IBlogPost> = {
      ...editingPost,
      tags: parsedTags,
    };

    try {
      if (editingPost._id) {
        await updateBlogPostApi(editingPost._id, payload);
      } else {
        await createBlogPostApi(payload);
      }
      setIsModalOpen(false);
      setEditingPost(null);
      loadPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteBlogPostApi(id);
      loadPosts();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog CMS Manager</h2>
          <p className="text-xs text-muted-foreground">Publish and manage technical articles, tutorials & case studies</p>
        </div>
        <Button onClick={openCreateModal} className="gap-2">
          <Plus className="w-4 h-4" /> New Article
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post._id} className="p-5 flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-14 h-14 rounded-lg object-cover border border-border"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-base text-foreground line-clamp-1">{post.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <Badge variant="default">{post.category || 'General'}</Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readingTimeMinutes || 5} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {post.viewsCount} views
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(post)}
                    className="p-1.5 text-muted-foreground hover:text-primary rounded hover:bg-muted"
                    title="Edit Article"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive rounded hover:bg-muted"
                    title="Delete Article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.summary}</p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                    <Tag className="w-3 h-3 text-primary" /> Tags:
                  </span>
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-primary" /> {post.author || 'Alex Vance'}
              </span>
              <Badge variant={post.isPublished ? 'success' : 'secondary'}>
                {post.isPublished ? 'Published' : 'Draft'}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost?._id ? 'Edit Article' : 'New Tech Article'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold">Article Title</label>
            <input
              type="text"
              required
              value={editingPost?.title || ''}
              onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              placeholder="Building Production-Ready MERN Applications with TypeScript"
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Short Summary / Teaser</label>
            <input
              type="text"
              required
              value={editingPost?.summary || ''}
              onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
              placeholder="A deep dive into clean architecture, strict typing, and REST API error handling..."
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Category</label>
              <input
                type="text"
                value={editingPost?.category || 'Engineering'}
                onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                placeholder="Engineering / Architecture / Web Dev"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Author Name</label>
              <input
                type="text"
                value={editingPost?.author || 'Alex Vance'}
                onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                placeholder="Alex Vance"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <ImageUpload
              label="Cover Image Photo (Cloudflare R2)"
              value={editingPost?.coverImage || ''}
              onChange={(url) => setEditingPost({ ...editingPost, coverImage: url })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Content (Markdown or Plain Text)</label>
            <textarea
              rows={8}
              required
              value={editingPost?.content || ''}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              placeholder="# Article Heading&#10;&#10;Write your technical post content here..."
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm resize-none font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Tags (Comma separated)</label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="MERN, TypeScript, Node.js, React"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Estimated Reading Time (Minutes)</label>
              <input
                type="number"
                min="1"
                value={editingPost?.readingTimeMinutes || 5}
                onChange={(e) => setEditingPost({ ...editingPost, readingTimeMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={editingPost?.isPublished ?? true}
              onChange={(e) => setEditingPost({ ...editingPost, isPublished: e.target.checked })}
              className="rounded border-border"
            />
            <label htmlFor="isPublished" className="text-xs font-semibold">
              Publish article publicly
            </label>
          </div>

          <Button type="submit" className="w-full mt-4 justify-center">
            Save Article
          </Button>
        </form>
      </Modal>
    </div>
  );
};
