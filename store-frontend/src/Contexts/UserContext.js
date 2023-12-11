import React, { createContext, useState, useMemo } from 'react';

export const UserContext = createContext({
  user: null,
  accountType: null,
  showFilter: false,
  sportFilter:'Set Sport Filter',
  setUser: () => {},
  setAccountType: () => {},
  setShowFilter: () => {},
  setSportFilter: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [sportFilter,setSportFilter] = useState('Set Sport Filter');

  const userProviderValue = useMemo(() => ({
    user,
    setUser,
    accountType,
    setAccountType,
    showFilter,
    setShowFilter,
    sportFilter,
    setSportFilter,
  }), [user, accountType, showFilter,sportFilter]);

  return (
    <UserContext.Provider value={userProviderValue}>
      {children}
    </UserContext.Provider>
  );
};
