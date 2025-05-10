
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  Users,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader, 
  SidebarFooter 
} from '@/components/ui/sidebar';

const Layout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <Sidebar>
          <SidebarHeader>
            <div className="px-3 py-2">
              <h2 className="text-lg font-semibold tracking-tight">DocTrack</h2>
              <p className="text-xs text-sidebar-foreground/70">Document Tracking System</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate('/dashboard')}>
                  <div className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate('/documents')}>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Documents</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {currentUser?.role === 'admin' && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => navigate('/teams')}>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Teams</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => navigate('/users')}>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Users</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => navigate('/settings')}>
                      <div className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 border-t border-sidebar-border">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-sidebar-foreground/70 capitalize">{currentUser?.role.replace('_', ' ')}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <div className="mt-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
