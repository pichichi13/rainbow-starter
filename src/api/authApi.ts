import api from "./axios";

export type LoginPayload = {
  email: string;
  password: string;
};

//Sostituiamo la login da fake (fakeLoginApi) a reale (LoginPayload) con una chiamata vera, usando axios e il servizio reqres -> Punto 8 della documentazione
//Credenziali da usare:
//Email: admin@test.com
//Password: 1234

/*export const loginApi = async (data: LoginPayload) => {
  const response = await axios.post(
    "http://localhost:3000/api/login",
    data
  );

  return response.data;
};*/

//Modificata la funzione, così ora quando fai login: Il token viene salvato e Ogni richiesta usa automaticamente Authorization header -> Punto 9 della documentazione
//LOGIN
export const loginApi = async (data: LoginPayload) => {
  const response = await api.post("/api/login", data);

  console.log("LOGIN RESPONSE:", response.data);

  localStorage.setItem("token", response.data.token);

  return response.data;
};

export const meApi = async () => {
  const response = await api.get("/api/me");
  return response.data;
};


//CREATE NEW USER
export const registerApi = async (data: LoginPayload) => {
  const response = await api.post("/api/register", data);

  console.log("LOGIN RESPONSE:", response.data);

  localStorage.setItem("token", response.data.token);

  return response.data;
};


/*export const loginApi = async (data: LoginPayload) => {
  //modificata chiamata perchè dava errore CORS
  const response = await axios.post(
    "https://reqres.in/api/login",
    data
  );

  return response.data;
};*/

/*
export const fakeLoginApi = async (data: LoginPayload) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simula delay

  if (data.email === "admin@test.com" && data.password === "1234") {
    return {
      token: "fake-jwt-token",
      user: {
        id: 1,
        name: "Admin",
      },
    };
  }

  throw new Error("Credenziali non valide");
};
*/
