import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({ name: null });

const UserProvider = ({ children }) => {
  const [name, setName] = useState(null);
  const [user, setUser] = useState({ name: name });

  const handleUserChange = () => {
    if (name) {
      setUser({ name: name });
    } else if (name) {
      setUser({ name: null });
    }
  };

  useEffect(() => {
    handleUserChange();
  }, [name]);

  return (
    <UserContext.Provider value={{ user, name, setName }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
