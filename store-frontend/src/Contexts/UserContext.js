import React, { createContext, useState, useMemo } from 'react';

export const UserContext = createContext({
  user: null,
  accountType: null,
  showFilter: false,
  setUser: () => {},
  setAccountType: () => {},
  setShowFilter: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const userProviderValue = useMemo(() => ({
    user,
    setUser,
    accountType,
    setAccountType,
    showFilter,
    setShowFilter
  }), [user, accountType, showFilter]);

  return (
    <UserContext.Provider value={userProviderValue}>
      {children}
    </UserContext.Provider>
  );
};
