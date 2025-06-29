
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart,
  FileText,
  Plus,
  Import,
  FolderOpen,
  Calculator,
  User,
  HelpCircle,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/', icon: BarChart },
  { title: 'Transactions', url: '/transactions', icon: Plus },
  { title: 'Chart of Accounts', url: '/accounts', icon: FolderOpen },
  { title: 'Import/Export', url: '/import-export', icon: Import },
  { title: 'Reports', url: '/reports', icon: FileText },
];

const bottomItems = [
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Help', url: '/help', icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={isCollapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarHeader className="p-4 bg-violet-900">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-cyan-400 rounded-lg flex items-center justify-center">
              <Calculator className="h-6 w-6 text-violet-900" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">iDO Books</h1>
              <p className="text-xs text-cyan-200">Smart Accounting</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="h-10 w-10 bg-cyan-400 rounded-lg flex items-center justify-center mx-auto">
            <Calculator className="h-6 w-6 text-violet-900" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="bg-violet-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-cyan-200 font-medium">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-cyan-400 text-violet-900 font-medium shadow-lg'
                            : 'text-cyan-100 hover:bg-violet-800 hover:text-white'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-cyan-400 text-violet-900 font-medium'
                            : 'text-cyan-100 hover:bg-violet-800 hover:text-white'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
