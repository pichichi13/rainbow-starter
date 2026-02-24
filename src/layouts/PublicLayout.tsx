import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="mb-8 text-2xl font-bold text-blue-600">
        RAINBOW
      </header>
      <main className="w-full max-w-md p-4">
        <Outlet /> {/* Qui viene renderizzata la pagina figlia (es. Login) */}
      </main>
      <footer className="mt-8 text-gray-400 text-sm">© 2026 Rainbow</footer>
    </div>
  );
}
