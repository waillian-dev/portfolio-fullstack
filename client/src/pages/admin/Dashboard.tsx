import React, { useEffect, useState } from 'react';
import { fetchAnalyticsSummary } from '../../services/api';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { FolderKanban, FileText, MessageCircle, MessageSquare, Eye } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsSummary()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner size="lg" />;

  const metrics = data?.metrics || {};

  const cards = [
    { label: 'Total Projects', value: metrics.totalProjects || 0, icon: FolderKanban, color: 'text-indigo-500' },
    { label: 'Blog Posts', value: metrics.totalBlogPosts || 0, icon: FileText, color: 'text-purple-500' },
    { label: 'Contact Messages', value: metrics.totalMessages || 0, icon: MessageCircle, color: 'text-emerald-500' },
    { label: 'Testimonials', value: metrics.totalTestimonials || 0, icon: MessageSquare, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Overview & Performance</h2>
        <p className="text-xs text-muted-foreground">Portfolio content metrics and analytics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase">{card.label}</p>
                <h3 className="text-3xl font-extrabold mt-1">{card.value}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-muted ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Analytics Chart */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">Portfolio Traffic Trend</h3>
            <p className="text-xs text-muted-foreground">Monthly page visitors & project views</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-primary/10 text-primary">
            Live Telemetry
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.monthlyTraffic || []}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Activity / Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold">Recent Messages</h3>
          <div className="space-y-3">
            {data?.recentMessages?.length === 0 ? (
              <p className="text-xs text-muted-foreground">No recent messages.</p>
            ) : (
              data?.recentMessages?.map((msg: any) => (
                <div key={msg._id} className="p-3 rounded-lg bg-muted/50 border border-border/50 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-foreground">
                    <span>{msg.name}</span>
                    <span className="text-[10px] text-muted-foreground">{msg.email}</span>
                  </div>
                  <p className="font-semibold text-primary">{msg.subject}</p>
                  <p className="text-muted-foreground line-clamp-1">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold">Popular Projects</h3>
          <div className="space-y-3">
            {data?.popularProjects?.map((proj: any) => (
              <div key={proj._id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50 text-xs">
                <span className="font-bold text-foreground">{proj.title}</span>
                <span className="flex items-center gap-1 font-semibold text-primary">
                  <Eye className="w-3.5 h-3.5" /> {proj.viewsCount}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
