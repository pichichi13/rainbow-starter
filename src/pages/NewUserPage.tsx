import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/authApi";
import { Link } from "react-router-dom";

export default function NewUserPage() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      console.log(data.message);
      setEmail("");
      setPassword("");
      setResponse(data.message);
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ email, password });
  };

  return (

    <div>
      <h1>Registrazione nuovo utente</h1>

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
        {mutation.isPending ? "Loading..." : "Create"}
      </button>

      <p style={{ color: "green", display: response ? "block" : "none" }}>{response} - <Link to="/loginPage" className="hover:text-yellow-300">Vai alla login</Link></p>

      {mutation.isError && (
        <p style={{ color: "red" }}>{(mutation.error as Error).message}</p>
      )}

    </div>
  );
}
