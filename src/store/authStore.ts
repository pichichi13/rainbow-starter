import { create } from "zustand";
//Riga sotto aggiunta per gestire la variabile di login nel localstorage -> Punto 6 dellla documentazione
import { persist } from "zustand/middleware";

type AuthState = {
  //Aggiunto il token che mi arriva dal file authApi.ts -> Punto 7 della documentazione
  token: string | null;
  isAuthenticated: boolean;
  //Aggiunto il token che mi arriva dal file authApi.ts -> Punto 7 della documentazione
  //login: () => void;
  login: (token: string) => void;
  logout: () => void;
};

//Il codice sotto è stato modificato per gestire la variabile di login nel localstortage -> Punto 6 della documentazione

/*export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));*/

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      //Aggiunto il token che mi arriva dal file authApi.ts -> Punto 7 della documentazione
      token: null,
      isAuthenticated: false,

      //Aggiunto il token che mi arriva dal file authApi.ts -> Punto 7 della documentazione
      login: (token: string) =>
        set({
          //Aggiunto il token che mi arriva dal file authApi.ts -> Punto 7 della documentazione
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          //Aggiunto il token che mi arriva dal file authApi.ts -> Punto 7 della documentazione
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // chiave nel localStorage
    },
  ),
);
