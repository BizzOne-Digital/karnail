'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Image,
  MessageSquare,
  HelpCircle,
  DollarSign,
  BookOpen,
  ShoppingBag,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { adminApi } from '@/services/api';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
  { label: 'Services', href: '/admin/services', icon: Briefcase },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Pricing', href: '/admin/pricing', icon: DollarSign },
  { label: 'Blogs', href: '/admin/blogs', icon: BookOpen },
  { label: 'Products', href: '/admin/products', icon: ShoppingBag },
  { label: 'Orders', href: '/admin/orders', icon: Package },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    await adminApi.logout();
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <div className="admin-body min-h-screen">{children}</div>;
  }

  return (
    <div className="admin-body min-h-screen flex">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform lg:translate-x-0 lg:static',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="p-6 border-b border-gray-700">
          <h1 className="font-semibold text-lg">Sukh Khokhar</h1>
          <p className="text-gray-400 text-xs">Admin Portal</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  active ? 'bg-red-900/50 text-white' : 'text-gray-300 hover:bg-gray-800'
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white text-sm w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="font-semibold">Admin</span>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
