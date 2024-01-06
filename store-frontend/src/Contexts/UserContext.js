import React, { createContext, useState, useMemo } from 'react';

export const UserContext = createContext({
  user: null,
  accountType: null,
  showFilter: false,
  sportFilter:'Set Sport Filter',
  sportCategories: null,
  setUser: () => {},
  setAccountType: () => {},
  setShowFilter: () => {},
  setSportFilter: () => {},
  setSportCategoreies: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sportCategories, setSportCategories] = useState([]);
  const [accountType, setAccountType] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [sportFilter,setSportFilter] = useState('Set Sport Filter');

  const userProviderValue = useMemo(() => ({
    user,
    setUser,
    sportCategories,
    setSportCategories,
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
