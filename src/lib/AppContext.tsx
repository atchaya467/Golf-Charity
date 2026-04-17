import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile, Score, Charity, Draw } from './types';
import { 
  apiLogin, 
  apiRegister, 
  apiLogout, 
  isLoggedIn as checkIsLoggedIn, 
  apiGetMe, 
  apiGetScores, 
  apiAddScore, 
  apiGetCharities, 
  apiSelectCharity, 
  apiGetDraws, 
  apiSimulateDraw,
  apiGetAllUsers
} from './api';

interface AppState {
  user: UserProfile | null;
  scores: Score[];
  charities: Charity[];
  draws: Draw[];
  allUsers: UserProfile[]; // Keep as empty for now or fetch later
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addScore: (value: number) => Promise<void>;
  selectCharity: (charityId: string, percent: number) => Promise<void>;
  updateDraw: (draw: Draw) => void;
  runDrawSimulation: (pool: number) => Promise<void>;
  addCharity: (charity: Omit<Charity, 'id'>) => Promise<void>;
  deleteCharity: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    scores: [],
    charities: [],
    draws: [],
    allUsers: [],
    isAuthenticated: checkIsLoggedIn(),
    isLoading: true,
  });

  const loadData = useCallback(async () => {
    try {
      if (checkIsLoggedIn()) {
        const [me, scoresData, charitiesData, drawsData] = await Promise.all([
          apiGetMe(),
          apiGetScores(),
          apiGetCharities(),
          apiGetDraws()
        ]);

        let usersData: UserProfile[] = [];
        if (me.is_admin) {
          try {
            usersData = await apiGetAllUsers();
          } catch (err) {
            console.error('Failed to load admin users data', err);
          }
        }

        setState(prev => ({
          ...prev,
          user: me,
          scores: scoresData,
          charities: charitiesData,
          draws: drawsData,
          allUsers: usersData,
          isAuthenticated: true,
          isLoading: false
        }));
      } else {
        const charitiesData = await apiGetCharities().catch(() => []);
        const drawsData = await apiGetDraws().catch(() => []);
        setState(prev => ({ 
          ...prev, 
          charities: charitiesData, 
          draws: drawsData,
          isLoading: false 
        }));
      }
    } catch (_err) {
      console.error("Failed to load initial data", _err);
      apiLogout();
      setState(prev => ({ ...prev, isAuthenticated: false, isLoading: false }));
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
    } catch (_err: any) {
      console.error(_err);
      setState(prev => ({ ...prev, isLoading: false }));
      throw _err; // Propagate error message to UI
    }
  }, [loadData]);

  const register = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await apiRegister(email, password);
      await loadData();
      return true;
    } catch (_err: any) {
      console.error(_err);
      setState(prev => ({ ...prev, isLoading: false }));
      throw _err; // Propagate error message to UI
    }
  }, [loadData]);

  const logout = useCallback(() => {
    apiLogout();
    setState(prev => ({
      ...prev,
      user: null,
      scores: [],
      isAuthenticated: false,
    }));
  }, []);

  const addScore = useCallback(async (value: number) => {
    try {
      const newScores = await apiAddScore(value);
      setState(prev => ({ ...prev, scores: newScores }));
    } catch (_err) {
      console.error(_err);
      alert('Failed to add score.');
    }
  }, []);

  const selectCharity = useCallback(async (charityId: string, percent: number) => {
    try {
      const updatedUser = await apiSelectCharity(charityId, percent);
      setState(prev => ({ ...prev, user: updatedUser }));
    } catch (_err) {
      console.error(_err);
      alert('Failed to update charity.');
    }
  }, []);

  const updateDraw = useCallback((draw: Draw) => {
    setState(prev => ({
      ...prev,
      draws: prev.draws.map(d => (d.id === draw.id ? draw : d)),
    }));
  }, []);

  const runDrawSimulation = useCallback(async (pool: number) => {
    try {
      const newDraw = await apiSimulateDraw(pool);
      setState(prev => ({ ...prev, draws: [newDraw, ...prev.draws] }));
    } catch (_err) {
      console.error(_err);
      alert('Failed to simulate draw.');
    }
  }, []);

  const addCharity = useCallback(async (charity: Omit<Charity, 'id'>) => {
    // Note: Backend endpoint for adding charities not yet fully implemented, but stubbing frontend
    console.log('Adding charity:', charity);
    await loadData();
  }, [loadData]);

  const deleteCharity = useCallback(async (id: string) => {
    console.log('Deleting charity:', id);
    await loadData();
  }, [loadData]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        addScore,
        selectCharity,
        updateDraw,
        runDrawSimulation,
        addCharity,
        deleteCharity
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
