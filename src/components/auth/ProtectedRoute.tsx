import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { fetchUserProfile, isManualAuthEnabled, getManualUser } from "@/integrations/supabase/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false, adminOnly = false }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check for manual auth first
      if (isManualAuthEnabled()) {
        const manualUser = getManualUser();
        
        if (!manualUser) {
          setIsAuthorized(false);
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        setIsLoggedIn(true);

        if (requireAdmin || adminOnly) {
          if (adminOnly) {
            setIsAuthorized(manualUser.role === 'admin');
          } else if (requireAdmin) {
            const stafflyHubRoles = ['admin', 'manager', 'rep'];
            setIsAuthorized(stafflyHubRoles.includes(manualUser.role || ''));
          }
        } else {
          setIsAuthorized(true);
        }
        
        setLoading(false);
        return;
      }

      // Supabase auth fallback
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAuthorized(false);
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      if (requireAdmin || adminOnly) {
        const profile = await fetchUserProfile(user.id);

        if (adminOnly) {
          setIsAuthorized(profile?.role === 'admin');
        } else if (requireAdmin) {
          const stafflyHubRoles = ['admin', 'manager', 'rep'];
          setIsAuthorized(stafflyHubRoles.includes(profile?.role || ''));
        }
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthorized(false);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    // Not logged in at all - always go to login
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    
    // Logged in but wrong role - redirect to their appropriate portal
    if (requireAdmin || adminOnly) {
      return <Navigate to="/eod-portal" replace />;
    }
    
    // Fallback
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

