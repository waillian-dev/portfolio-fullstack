import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Code,
  Briefcase,
  Layers,
  FolderKanban,
  MessageSquare,
  FileText,
  MessageCircle,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../../components/common/ThemeToggle';

const adminNav = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Profile Bio', path: '/admin/profile', icon: User },
  { label: 'Skills', path: '/admin/skills', icon: Code },
  { label: 'Experience', path: '/admin/experience', icon: Briefcase },
  { label: 'Services', path: '/admin/services', icon: Layers },
  { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
  { label: 'Blog Posts', path: '/admin/blog', icon: FileText },
  { label: 'Messages', path: '/admin/messages', icon: MessageCircle },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card/60 backdrop-blur-md p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-foreground">CMS Dashboard</h2>
            <p className="text-[11px] text-muted-foreground">{admin?.email}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-border space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Globe className="w-4 h-4" /> View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-border/60 bg-card/40 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-sm font-bold text-foreground">
              {adminNav.find((n) => n.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-b border-border bg-card p-4 space-y-2">
            {adminNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted rounded-lg"
              >
                <item.icon className="w-4 h-4 text-primary" /> {item.label}
              </Link>
            ))}
          </div>
        )}

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
