//Le 2 righe servono per gestire la chiamata vera alla login -> Punto 7 della documentazione
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/authApi";

//Da riga 6 a riga 18 codice aggiunto dopo aver installato zustand e aver creato il file src/store/authStore.ts -> Punto 4 della documentazione
import { useAuthStore } from "../store/authStore";
import { useNavigate, Navigate } from "react-router-dom";

import { useState } from "react"; //Punto 7 della documentazione
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

type LoginPayload = {
  email: string;
  password: string;
};

//L'intera function viene adattata dopo aver creato la logica API per la login che restituisce il token
export default function LoginPage() {
  //Se sono loggata va direttamente alla dashboard
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore.persist.hasHydrated();
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      loginStore(data.token);
      navigate("/dashboard");
    },
  });

  const onSubmit = (data: LoginPayload) => {
    mutation.mutate(data);
  };

  //Redirect alla dashboard se sono già loggato
  if (!hasHydrated) return null;
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              {...register("email", {
                required: "Email obbligatoria",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Formato email non valido",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              {...register("password", {
                required: "Password obbligatoria",
                minLength: {
                  value: 4,
                  message: "Minimo 4 caratteri",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {mutation.isPending ? "Loading..." : "Login"}
          </button>

          {/* ERRORE SERVER */}
          {mutation.isError && (
            <p className="text-red-500 text-sm mt-2">
              {(mutation.error as any)?.response?.data?.message ||
                "Credenziali non valide"}
            </p>
          )}
        </form>
      </div>

      <div style={{ margin: "2rem 0 0 0" }}>
        <p style={{ color: "green" }}>
          <Link to="/newUserPage" className="hover:text-yellow-300">
            Crea un nuovo utente
          </Link>
        </p>
      </div>
    </>
  );
}
