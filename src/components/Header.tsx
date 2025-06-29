
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const Header = () => {
  return (
    <header className="h-16 bg-white/90 backdrop-blur-sm border-b border-violet-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-violet-700 hover:bg-violet-100 rounded-xl" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400 h-4 w-4" />
          <Input
            placeholder="Search transactions, accounts..."
            className="pl-10 w-80 bg-white/70 border-violet-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-violet-600 hover:bg-violet-100 rounded-xl">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:from-violet-700 hover:to-cyan-600">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border-violet-200 rounded-xl shadow-lg">
            <DropdownMenuItem className="hover:bg-violet-50 rounded-lg">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-violet-50 rounded-lg">Change Password</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-violet-50 rounded-lg">Help & Support</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 hover:bg-red-50 rounded-lg">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
