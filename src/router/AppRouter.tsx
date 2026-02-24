import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
//La riga sotto è stata aggiunta al punto 5 della documentazione
import ProtectedRoute from "../components/ProtectedRoute";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import UsersPage from "../pages/UsersPage";

import { JSX } from "react";

// Finta autenticazione
//const isAuthenticated = false;
//Sostituita riga sopra dopo aver installato zustand e aver creato il file src/store/authStore.ts -> Punto 4 della documentazione
//Successivamente al punto 5 della documentazione questa riga va tolta perchè è stato creato il componente dedicato components/ProtectedRoute.tsx
//import { useAuthStore } from "../store/authStore";

//Al punto 5 tutta questa funzione sparisce perchè viene inserita nel componente dedicato components/ProtectedRoute.tsx
/*function ProtectedRoute({ children }: { children: JSX.Element }) {
  //Aggiunta riga sotto dopo aver installato zustand e aver creato il file src/store/authStore.ts -> Punto 4 della documentazione
  //Va a leggere lo stato globale che è stato definito nel file src/store/authStore.ts   
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;  
}*/

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout pubblico */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Layout privato */}
        <Route
          element={
            <ProtectedRoute>
              <PrivateLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>

        {/* Redirect di default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
