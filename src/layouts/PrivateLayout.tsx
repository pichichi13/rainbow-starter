//La riga sotto è stata aggiunta dopo aver installato zustand e aver creato il file src/store/authStore.ts -> Punto 4 della documentazione
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PrivateLayout() {
    //La riga sotto è stata aggiunta dopo aver installato zustand e aver creato il file src/store/authStore.ts -> Punto 4 della documentazione
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    
    const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-600 text-white p-6">
            <h2 className="text-xl font-bold mb-6">RAINBOW</h2>
            <nav className="flex flex-col gap-4">
                {/*<a href="/dashboard" className="hover:text-yellow-300">Dashboard</a>
                <a href="/users" className="hover:text-yellow-300">Users</a>
                <a href="/settings" className="hover:text-yellow-300">Settings</a>*/}

                <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
                <Link to="/users" className="hover:text-yellow-300">Users</Link>
                <Link to="/settings" className="hover:text-yellow-300">Settings</Link>                
            </nav>
            
            {/*Il button logout è stato aggiunto dopo aver installato zustand e aver creato il file src/store/authStore.ts -> Punto 4 della documentazione*/}
            <button
                onClick={handleLogout}
                className="mt-8 text-sm text-white/80 hover:text-white"
                >
                Logout
            </button>
        </aside>

        {/* Content principale */}
        <main className="flex-1 p-8 bg-gray-100">
            <Outlet /> {/* Qui viene renderizzata la pagina figlia */}
        </main>
    </div>
  );
}
