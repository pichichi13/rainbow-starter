//Le 2 righe servono per gestire la chiamata vera alla login -> Punto 7 della documentazione
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/authApi";

//Da riga 6 a riga 18 codice aggiunto dopo aver installato zustand e aver creato il file src/store/authStore.ts -> Punto 4 della documentazione
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

import { useState } from "react"; //Punto 7 della documentazione

{
  /*
export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  function handleLogin() {
    login();                 // set isAuthenticated = true
    navigate("/dashboard");  // vai alla dashboard
  }
  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input className="w-full p-2 mb-3 border rounded" placeholder="Email" />
      <input className="w-full p-2 mb-3 border rounded" placeholder="Password" type="password" />
      //Aggiunto evento onClick={handleLogin} dopo aver installato zustand e aver creato il file src/store/authStore.ts -> Punto 4 della documentazione
      <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
*/
}

//L'intera function viene adattata dopo aver creato la logica API per la login che restituisce il token
export default function LoginPage() {
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      loginStore(data.token);
      navigate("/dashboard");
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ email, password });
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={mutation.isPending}>
        {mutation.isPending ? "Loading..." : "Login"}
      </button>

      {mutation.isError && (
        <p style={{ color: "red" }}>{(mutation.error as Error).message}</p>
      )}
    </div>
  );
}
