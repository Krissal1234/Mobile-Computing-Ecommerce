import React, { createContext, useState, useMemo } from 'react';

export const UserContext = createContext({
  user: null,
  accountType: null,
  setUser: () => {},
  setAccountType: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accountType, setAccountType] = useState(null);

  const userProviderValue = useMemo(() => ({
    user,
    setUser,
    accountType,
    setAccountType
  }), [user, setUser, accountType, setAccountType]);

  return (
    <UserContext.Provider value={userProviderValue}>
      {children}
    </UserContext.Provider>
  );
};
