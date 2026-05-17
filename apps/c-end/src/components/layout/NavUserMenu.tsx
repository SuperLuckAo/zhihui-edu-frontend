// components/nav-user-menu.tsx
"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  ChevronRight,
  UserIcon,
  Gauge,
  SunMoon,
  LogOut,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export function NavUserMenu() {
  // 模拟用户数据
  const user = {
    name: "张明",
    dept: "集团信息部/企业效率部",
    email: "zhangming@company.com",
    avatar: "/avatars/user.png", // 替换为实际头像地址
    role: "高级工程师",
  };

  return (
    <div className="flex items-center gap-3">
      {/* 头像下拉菜单 */}
      <HoverCard openDelay={100} closeDelay={200}  >
        <HoverCardTrigger>
          <div>
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10">
                <UserIcon size={12} />
              </AvatarFallback>
            </Avatar>
          </div>
        </HoverCardTrigger>

        <HoverCardContent className="flex flex-col min-w-90">
          <div className="mx-10 my-1">
            <div className="grid grid-cols-3 grid-flow-col py-2 my-2">
              <Avatar className="col-span-1 h-18 w-18 ">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary/10">
                  <UserIcon size={20} />
                </AvatarFallback>
              </Avatar>

              <div className="col-span-2  flex flex-col justify-center">
                <p className="text-[16px] font-bold py-1">{user.name} </p>
                <p className="text-muted-foreground py-1">{user.dept} </p>
              </div>
            </div>

            <div className="grid grid-cols-6 py-4 text-slate-500">
              <span className="col-span-1">lv.4</span>
              <div className="col-span-4  flex flex-col justify-center">
                <Progress className="[&>div]:bg-[var(--theme)] " value={33} />
              </div>
              <span className="col-span-1 flex justify-end">lv.5</span>
            </div>

            <div className="grid grid-cols-3 py-4 ">
              <div className="grid grid-rows-2 justify-items-center items-center">
                <div className="text-2xl font-bold">231</div>
                <div className="text-sm text-muted-foreground">课程</div>
              </div>

              <div className="grid grid-rows-2 justify-items-center items-center">
                <div className="text-2xl font-bold">45</div>
                <div className="text-sm text-muted-foreground">考试</div>
              </div>

              <div className="grid grid-rows-2 justify-items-center items-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">证书</div>
              </div>
            </div>

            <div className="py-4 font-bold">
              <div className="py-3 flex  items-center text-slate-500">
                <User className="size-5 " />
                <span className="text-[14px] ml-3">个人中心</span>
                <ChevronRight className="ml-auto" size={14} />
              </div>

              <div className="py-3 flex items-center text-slate-500">
                <Gauge className="size-5" />
                <span className="text-[14px]  ml-3">工作空间</span>
                <ChevronRight className="ml-auto" size={14} />
              </div>
            </div>
            <Separator />
            <div className="py-4 font-bold">
              <div className="py-3 flex  items-center text-slate-500">
                <SunMoon className="size-5 " />
                <span className="text-[14px] ml-3">主题: 浅色</span>
                <ChevronRight className="ml-auto" size={14} />
              </div>
              <div className="py-3 flex items-center text-slate-500">
                <LogOut className="size-5" />
                <span className="text-[14px]  ml-3">退出登录</span>
                <ChevronRight className="ml-auto" size={14} />
              </div>
            </div>

 
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
