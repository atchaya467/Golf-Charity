import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile, Charity } from './types';
import { 
  apiLogin, 
  apiRegister, 
  apiLogout, 
  isLoggedIn as checkIsLoggedIn, 
  apiGetMe, 
  apiGetEvents,
  apiGetImpact,
  apiDonate,
  apiRegisterEvent,
  apiGetAllUsers
} from './api';

interface AppState {
  user: UserProfile | null;
  events: any[];
  impact: any;
  charities: Charity[];
  allUsers: UserProfile[];
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  donate: (amount: number, charityId?: string) => Promise<void>;
  registerForEvent: (eventId: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    events: [],
    impact: null,
    charities: [],
    allUsers: [],
    isAuthenticated: checkIsLoggedIn(),
    isLoading: true,
  });

  const loadData = useCallback(async () => {
    try {
      const [eventsData, impactData] = await Promise.all([
        apiGetEvents(),
        apiGetImpact()
      ]);

      let me = null;
      let usersData: UserProfile[] = [];
      
      if (checkIsLoggedIn()) {
        me = await apiGetMe();
        if (me?.is_admin) {
          try {
            usersData = await apiGetAllUsers();
          } catch (err) {
            console.error('Admin users load failed', err);
          }
        }
      }

      setState(prev => ({
        ...prev,
        user: me,
        events: eventsData,
        impact: impactData,
        allUsers: usersData,
        isAuthenticated: !!me,
        isLoading: false
      }));
    } catch (_err) {
      console.error("Failed to load data", _err);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await apiLogin(email, password);
      await loadData();
      return true;
    } catch (err) {
      const error = err as Error;
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, [loadData]);

  const register = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await apiRegister(email, password);
      await loadData();
      return true;
    } catch (err) {
      const error = err as Error;
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, [loadData]);

  const logout = useCallback(() => {
    apiLogout();
    setState(prev => ({
      ...prev,
      user: null,
      isAuthenticated: false,
    }));
  }, []);

  const donate = useCallback(async (amount: number, charityId?: string) => {
    try {
      await apiDonate(amount, charityId, state.user?.id);
      await loadData(); // Refresh impact
    } catch (_err) {
      console.error(_err);
      throw _err;
    }
  }, [state.user?.id, loadData]);

  const registerForEvent = useCallback(async (eventId: string) => {
    try {
      await apiRegisterEvent(eventId);
      await loadData();
    } catch (_err) {
      console.error(_err);
      throw _err;
    }
  }, [loadData]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        donate,
        registerForEvent,
        refreshData: loadData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
