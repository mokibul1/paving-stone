import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthUser, authApi, authStore } from "@/lib/api";

type AuthCtx = {
  user: AuthUser | null;
  session: { token: string } | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
  refreshAuth: async () => {},
});

export const useAuth = () => useContext(Ctx);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<{ token: string } | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    const token = authStore.getToken();
    if (!token) {
      setSession(null);
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { user: nextUser } = await authApi.me();
      setSession({ token });
      setUser(nextUser);
    } catch {
      authStore.clear();
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshAuth();
  }, []);

  const signOut = async () => {
    authStore.clear();
    setSession(null);
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, session, isAdmin: user?.role === "admin", loading, signOut, refreshAuth }}>
      {children}
    </Ctx.Provider>
  );
};
