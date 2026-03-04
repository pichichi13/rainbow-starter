import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/authApi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

type LoginPayload = {
  email: string;
  password: string;
};

export default function NewUserPage() {
  const [response, setResponse] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>();

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      console.log(data.message);
      reset();
      setResponse(data.message);
    },
  });

  const onSubmit = (data: LoginPayload) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h1>Registrazione nuovo utente</h1>

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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
          {mutation.isPending ? "Loading..." : "Register"}
        </button>

        {/* ERRORE SERVER */}
        {mutation.isError && (
          <p className="text-red-500 text-sm mt-2">
            {(mutation.error as any)?.response?.data?.message ||
              "Credenziali non valide"}
          </p>
        )}

        <p style={{ color: "green", display: response ? "block" : "none" }}>
          {response} -{" "}
          <Link to="/loginPage" className="hover:text-yellow-300">
            Vai alla login
          </Link>
        </p>
      </form>
    </div>
  );
}
