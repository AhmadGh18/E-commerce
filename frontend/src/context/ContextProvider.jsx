import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
  User: null,
  setUser: () => {},
  setToken: () => {},

  token: null,
});
export const ContextProvider = ({ children }) => {
  const [User, setUser] = useState({});

  const [token, _setToken] = useState(localStorage.getItem("AccessToken"));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      window.localStorage.setItem("AccessToken", token);
    } else {
      localStorage.removeItem("AccessToken");
    }
  };

  return (
    <StateContext.Provider
      value={{
        User,
        token,
        setToken,

        setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
