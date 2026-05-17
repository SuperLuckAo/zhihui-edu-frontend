import { Search, GraduationCap } from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { NavUserMenu } from './NavUserMenu';





const NAV_ITEMS = [
  { to: '/', label: '首页', end: true },
  { to: '/courses', label: '课程' },
  { to: '/live', label: '直播' },
  { to: '/topic', label: '专题' },
  { to: '/training', label: '培训' },
];

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="bg-background flex min-h-svh flex-col">
      <header className="border-border/60 bg-background/80 sticky top-0 z-20  backdrop-blur">
        <div className="mx-auto flex h-20 max-w-[74%] items-left gap-6 ">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="bg-[var(--main-icon-bg)] rounded-lg p-1">
              <GraduationCap
                className="text-[var(--main-icon-color)] "
                size={26}
              />
            </div>
            <span className="text-2xl">
              智汇
              <span className="text-[var(--main-icon-bg)]">企训</span>
            </span>
          </Link>

          <nav className="flex-1 flex items-center pl-20  gap-1 font-bold text-[13px]">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-md pl-6 transition-colors",
                    isActive
                      ? "text-[var(--nav-active)]"
                      : "text-[var(--nav-default)] hover:text-[var(--nav-hover)]",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* 搜索框 */}
            <Button variant="outline" size="icon"  className="rounded-full h-10 w-10 bg-[var(--theme-sub)]" >
              <Search color="var(--theme)" size={16} className=""/>
            </Button>
            {/* 用户菜单 */}
            <NavUserMenu />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[74%] flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-border/60 border-t">
        <div className="mx-auto flex max-w-[74%] flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-slate-400 sm:flex-row">
          <span>© 2026 智汇企训 · 企业内训平台</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">
              关于我们
            </a>
            <a href="#" className="hover:text-slate-600 transition-colors">
              帮助中心
            </a>
            <a href="#" className="hover:text-slate-600 transition-colors">
              隐私政策
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
