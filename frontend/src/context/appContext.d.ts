declare module "../../context/appContext.jsx" {
  export function useApplicationContext(): {
    user: any;
    setUser: (user: any) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    location: any;
    navigate: (path: string) => void;
  };
} 