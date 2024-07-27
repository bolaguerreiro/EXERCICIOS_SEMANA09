import { createContext, useContext, useState } from "react";

// contexto
const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: () => {},
});

// simular uma chamada para api => fetch
async function apiAuth(url, data) {
  console.log(url, data);
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

// provedor do contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const userLoggedStorage = localStorage.getItem("@lab365.userLogged");

    if (userLoggedStorage) {
      return JSON.parse(userLoggedStorage);
    }

    return null;
  });

  async function signIn(credentials) {
    try {
      if (
        credentials.email !== "bolamg@gmail.com" ||
        credentials.password !== "123"
      ) {
        throw new Error("Email ou senha inválidos");
      }
      // Simule a chamada à API Dummy (substitua com sua lógica real)
      await apiAuth("https://api.lab365.com.br/sessions", credentials);

      const userResponse = {
        id: 15,
        username: "kminchelle",
        email: "kminchelle@lab365.com.br",
        name: "Kathryn Minchelle",
        gender: "female",
        image: "https://robohash.org/Jeanne.png?set=set4",
        token: 'xyz',
      };
      // Se a autenticação for bem-sucedida, atualize o estado
      setUser(userResponse);
      // Persista as informações no localStorage (opcional)
      localStorage.setItem("@lab365:userLogged", JSON.stringify(userResponse));
      localStorage.setItem("@lab365:token", Date.now());
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@lab365:userLogged");
    localStorage.removeItem("@lab365:token");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook personalizado para usar o contexto
export function useAuth() {
  return useContext(AuthContext);
}
