import {
  ArrowRight,
  BookCopy,
  BookOpen,
  Briefcase,
  Calendar,
  CalendarClock,
  Code2,
  Film,
  Layers,
  LayoutGrid,
  Leaf,
  Lightbulb,
  MessageSquare,
  Palette,
  PlayCircle,
  Presentation,
  Radio,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  ThumbsUp,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

type QuickNav = {
  label: string;
  caption: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  hover: string;
};

const QUICK_NAVS: QuickNav[] = [
  {
    label: '课程中心',
    caption: '体系化学习',
    icon: BookCopy,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    hover: 'hover:bg-teal-50/40',
  },
  {
    label: '直播课堂',
    caption: '实时互动',
    icon: Radio,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    hover: 'hover:bg-rose-50/40',
  },
  {
    label: '专题训练',
    caption: '技能突破',
    icon: Layers,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    hover: 'hover:bg-amber-50/40',
  },
  {
    label: '培训计划',
    caption: '个人成长路径',
    icon: Target,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    hover: 'hover:bg-sky-50/40',
  },
];

type Course = {
  title: string;
  meta: string;
  rating: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

const RECOMMEND_COURSES: Course[] = [
  {
    title: 'OKR 目标管理工作坊',
    meta: '12 课时 · 李敏老师',
    rating: '4.9',
    icon: TrendingUp,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    title: '跨部门沟通实战',
    meta: '8 课时 · 王薇',
    rating: '4.8',
    icon: MessageSquare,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Python 自动化办公',
    meta: '20 课时 · 张涛',
    rating: '4.7',
    icon: Code2,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    title: '合规与风险管理',
    meta: '5 课时 · 陈雅',
    rating: '4.9',
    icon: ShieldCheck,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
];

const UPCOMING_LIVES = [
  {
    title: '职场情绪与压力管理',
    schedule: '今天 16:00 · 赵琳',
    icon: CalendarClock,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
    accent: 'text-rose-600',
  },
  {
    title: '创新思维工作坊',
    schedule: '明日 14:30 · 周华',
    icon: Presentation,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
    accent: 'text-indigo-600',
  },
];

const HOT_TOPICS = [
  { title: '新员工启航计划', count: '12门课' },
  { title: '中层领导力跃升', count: '8门课' },
  { title: '数字化转型专题', count: '6门课' },
];

type FeaturedTopic = {
  title: string;
  meta: string;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
};

const FEATURED_TOPICS: FeaturedTopic[] = [
  {
    title: '高潜人才加速器',
    meta: '6 个模块 · 24 课时',
    icon: Rocket,
    gradient: 'from-indigo-100 to-blue-100',
    iconColor: 'text-indigo-600',
  },
  {
    title: '可持续发展与ESG',
    meta: '4 个模块 · 10 课时',
    icon: Leaf,
    gradient: 'from-emerald-100 to-teal-100',
    iconColor: 'text-emerald-700',
  },
  {
    title: '设计思维实战',
    meta: '3 个模块 · 12 课时',
    icon: Palette,
    gradient: 'from-purple-100 to-violet-100',
    iconColor: 'text-purple-600',
  },
  {
    title: '敏捷项目管理',
    meta: '5 个模块 · 18 课时',
    icon: Lightbulb,
    gradient: 'from-amber-100 to-orange-100',
    iconColor: 'text-amber-700',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <QuickNavGrid />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <ContinueLearning />
          <Recommendations />
        </div>
        <aside className="space-y-6">
          <UpcomingLive />
          <HotTopicsList />
          <MyPlanCard />
        </aside>
      </div>
      <FeaturedTopicsSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl p-6 shadow-sm md:p-10 lg:p-12"
      style={{
        background:
          'linear-gradient(135deg, #f0f9ff 0%, #e6f7f5 50%, #f5f3ff 100%)',
      }}
    >
      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <div className="flex-1 space-y-5">
          <Badge
            variant="secondary"
            className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50"
          >
            <Sparkles className="size-3.5" />
            2026 新经理成长计划
          </Badge>
          <h1 className="text-3xl leading-tight font-bold text-slate-900 md:text-4xl lg:text-5xl">
            赋能团队
            <span style={{ color: 'var(--theme)' }}>持续成长</span>
            <br />
            让学习自然发生
          </h1>
          <p className="max-w-xl text-base text-slate-600 md:text-lg">
            基于岗位能力模型，提供体系化课程、直播实战与专属培训计划，驱动企业人才高效发展。
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              size="lg"
              className="rounded-xl text-white shadow-sm"
              style={{ backgroundColor: 'var(--theme)' }}
            >
              探索课程 <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              我的学习计划 <Calendar className="size-4" />
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Users className="size-4" /> 2,860 名学员活跃
            </span>
            <span className="size-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1">
              <BookOpen className="size-4" /> 148 门精选课程
            </span>
          </div>
        </div>
        <div className="flex flex-1 justify-center lg:justify-end">
          <div className="relative flex size-72 items-center justify-center rounded-3xl border border-white/80 bg-white/70 shadow-lg backdrop-blur-sm md:size-80">
            <div className="text-center">
              <PlayCircle
                className="mx-auto size-16 fill-teal-100"
                style={{ color: 'var(--theme)' }}
              />
              <p className="mt-3 font-semibold text-slate-800">
                今日推荐 · 直播回放
              </p>
              <p className="text-xs text-slate-500">高效沟通 · 45分钟</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickNavGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {QUICK_NAVS.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.label}
            className={cn(
              'flex cursor-pointer flex-col items-start gap-2 rounded-2xl border-0 p-4 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]',
              item.hover,
            )}
          >
            <div
              className={cn(
                'flex size-10 items-center justify-center rounded-xl',
                item.iconBg,
                item.iconColor,
              )}
            >
              <Icon className="size-5" />
            </div>
            <span className="font-semibold text-slate-800">{item.label}</span>
            <span className="text-xs text-slate-500">{item.caption}</span>
          </Card>
        );
      })}
    </div>
  );
}

function SectionHeader({
  title,
  icon: Icon,
  action,
}: {
  title: string;
  icon: LucideIcon;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
        <Icon className="size-5" style={{ color: 'var(--theme)' }} />
        {title}
      </h2>
      {action}
    </div>
  );
}

function ContinueLearning() {
  return (
    <Card className="rounded-2xl border-0 p-5 py-5 shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.05)] md:p-6 md:py-6">
      <SectionHeader
        title="继续学习"
        icon={PlayCircle}
        action={
          <a
            href="#"
            className="text-sm font-medium hover:underline"
            style={{ color: 'var(--theme)' }}
          >
            查看全部
          </a>
        }
      />
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        <div className="flex h-20 w-full items-center justify-center rounded-xl bg-slate-100 text-slate-400 sm:w-32">
          <Film className="size-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-800">
            数据驱动决策 · 第三章
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            已完成 60% · 剩余 18 分钟
          </p>
          <Progress
            value={60}
            className="mt-3 h-1.5 bg-slate-200 [&>[data-slot=progress-indicator]]:bg-[var(--theme)]"
          />
          <Button
            size="sm"
            variant="ghost"
            className="mt-3 rounded-lg bg-[var(--theme-sub)] font-medium text-[var(--theme)] hover:bg-teal-100"
          >
            继续学习
          </Button>
        </div>
      </div>
    </Card>
  );
}

function Recommendations() {
  return (
    <div>
      <SectionHeader
        title="为你推荐"
        icon={ThumbsUp}
        action={
          <Tabs defaultValue="hot">
            <TabsList className="rounded-xl bg-slate-100 p-0.5">
              <TabsTrigger value="hot" className="rounded-lg px-3 text-sm">
                热门
              </TabsTrigger>
              <TabsTrigger value="latest" className="rounded-lg px-3 text-sm">
                最新
              </TabsTrigger>
              <TabsTrigger value="manage" className="rounded-lg px-3 text-sm">
                管理
              </TabsTrigger>
            </TabsList>
          </Tabs>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {RECOMMEND_COURSES.map((course) => {
          const Icon = course.icon;
          return (
            <Card
              key={course.title}
              className="flex flex-row items-start gap-3 rounded-2xl border-0 p-4 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]"
            >
              <div
                className={cn(
                  'flex size-12 shrink-0 items-center justify-center rounded-xl',
                  course.iconBg,
                  course.iconColor,
                )}
              >
                <Icon className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800">
                  {course.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500">{course.meta}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-amber-500">
                  <Star className="size-3 fill-amber-500" /> {course.rating}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function UpcomingLive() {
  return (
    <Card className="rounded-2xl border-0 p-5 py-5 shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-slate-800">
          <Radio className="size-4 text-rose-600" /> 即将直播
        </h3>
        <Badge
          variant="secondary"
          className="bg-rose-50 text-rose-700 hover:bg-rose-50"
        >
          2场
        </Badge>
      </div>
      <div className="space-y-4">
        {UPCOMING_LIVES.map((live) => {
          const Icon = live.icon;
          return (
            <div key={live.title} className="flex gap-3">
              <div
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-lg',
                  live.iconBg,
                  live.iconColor,
                )}
              >
                <Icon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {live.title}
                </p>
                <p className="text-xs text-slate-500">{live.schedule}</p>
                <button
                  className={cn(
                    'mt-1 text-xs font-medium hover:underline',
                    live.accent,
                  )}
                >
                  预约
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function HotTopicsList() {
  return (
    <Card className="rounded-2xl border-0 p-5 py-5 shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.05)]">
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
        <Briefcase className="size-4 text-amber-600" /> 热门专题
      </h3>
      <div className="space-y-3">
        {HOT_TOPICS.map((topic) => (
          <div
            key={topic.title}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-slate-700">{topic.title}</span>
            <Badge
              variant="secondary"
              className="bg-slate-100 text-slate-600 hover:bg-slate-100"
            >
              {topic.count}
            </Badge>
          </div>
        ))}
        <a
          href="#"
          className="mt-1 inline-block text-xs font-medium"
          style={{ color: 'var(--theme)' }}
        >
          浏览全部专题 →
        </a>
      </div>
    </Card>
  );
}

function MyPlanCard() {
  return (
    <Card className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-teal-50 p-5 py-5 shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.05)]">
      <h3 className="mb-2 flex items-center gap-2 font-semibold text-slate-800">
        <Target className="size-4 text-sky-700" /> 我的培训计划
      </h3>
      <p className="mb-3 text-xs text-slate-600">2026 Q2 · 产品经理成长路径</p>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-bold text-slate-800">4/6</span>
        <span className="text-xs text-slate-500">任务完成</span>
      </div>
      <Progress
        value={66}
        className="mt-2 mb-3 h-1.5 bg-slate-200 [&>[data-slot=progress-indicator]]:bg-sky-700"
      />
      <Button
        variant="outline"
        className="w-full rounded-xl border-sky-200 bg-white/80 text-sky-700 hover:bg-white"
      >
        查看计划详情
      </Button>
    </Card>
  );
}

function FeaturedTopicsSection() {
  return (
    <section>
      <SectionHeader
        title="专题培训"
        icon={LayoutGrid}
        action={
          <a
            href="#"
            className="text-sm font-medium"
            style={{ color: 'var(--theme)' }}
          >
            更多专题 →
          </a>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_TOPICS.map((topic) => {
          const Icon = topic.icon;
          return (
            <Card
              key={topic.title}
              className="overflow-hidden rounded-2xl border-0 p-0 py-0 shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]"
            >
              <div
                className={cn(
                  'flex h-24 items-center justify-center bg-gradient-to-r',
                  topic.gradient,
                  topic.iconColor,
                )}
              >
                <Icon className="size-8" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-slate-800">{topic.title}</h4>
                <p className="mt-1 text-xs text-slate-500">{topic.meta}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
