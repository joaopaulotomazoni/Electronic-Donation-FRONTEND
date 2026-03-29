import { createContext, useState } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storageUser = localStorage.getItem("@app:user");
    if (storageUser) {
      try {
        return JSON.parse(storageUser);
      } catch (error) {
        console.error("Erro ao fazer parse do usuário:", error);
        localStorage.removeItem("@app:user");
        return null;
      }
    }
    return null;
  });

  function signIn(userData, token) {
    const userInfo = {
      id: userData.id,
      nome: userData.nome,
      email: userData.email,
      token,
    };

    setUser(userInfo);

    localStorage.setItem("@app:user", JSON.stringify(userInfo));
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@app:user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
