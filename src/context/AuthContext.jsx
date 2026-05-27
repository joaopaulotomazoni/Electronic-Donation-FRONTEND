import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storageUser = localStorage.getItem('@app:user');
    if (storageUser) {
      try {
        return JSON.parse(storageUser);
      } catch (error) {
        console.error('Erro ao fazer parse do usuário:', error);
        localStorage.removeItem('@app:user');
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
      avatar: userData.avatar,
      endereco: {
        cep: userData.cep,
        uf: userData.uf,
        cidade: userData.cidade,
        bairro: userData.bairro,
        rua: userData.rua,
        numero: userData.numero,
        complemento: userData.complemento,
      },
      token,
      isAdmin: userData.isAdmin,
    };

    setUser(userInfo);

    localStorage.setItem('@app:user', JSON.stringify(userInfo));
  }

  function updateAvatar(fotoPerfil) {
    const updatedUser = { ...user, avatar: fotoPerfil };
    setUser(updatedUser);
    localStorage.setItem('@app:user', JSON.stringify(updatedUser));
  }

  function updateUser({
    nome,
    email,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    complemento,
  }) {
    if (!user) return;

    const updatedUser = {
      ...user,
      nome: nome ?? user.nome,
      email: email ?? user.email,
      endereco: {
        ...user.endereco,
        cep: cep ?? user.endereco?.cep,
        rua: rua ?? user.endereco?.rua,
        numero: numero ?? user.endereco?.numero,
        bairro: bairro ?? user.endereco?.bairro,
        cidade: cidade ?? user.endereco?.cidade,
        uf: estado ?? user.endereco?.uf,
        complemento: complemento ?? user.endereco?.complemento,
      },
    };

    setUser(updatedUser);
    localStorage.setItem('@app:user', JSON.stringify(updatedUser));
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@app:user');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        updateUser,
        updateAvatar,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
