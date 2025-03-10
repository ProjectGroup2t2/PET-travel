import React, { useEffect } from "react";
import { useSetState } from "react-use";
import conf from "../conf/main";
import ax, { axData } from "../conf/ax";

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  user: null,
  isLoginPending: false,
  loginError: null,
};

const updateJwt = (jwt) => {
  axData.jwt = jwt;
  if (jwt) {
    sessionStorage.setItem(conf.jwtSessionStorageKey, jwt);
  } else {
    sessionStorage.removeItem(conf.jwtSessionStorageKey);
  }
};

export const ContextProvider = (props) => {
  const [state, setState] = useSetState(initialState);

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn, user) => setState({ isLoggedIn, user });
  const setLoginError = (loginError) => setState({ loginError });

  const handleLoginResult = (error, result) => {
    setLoginPending(false);
    if (result && result.user) {
      if (result.jwt) {
        updateJwt(result.jwt);
      }
      setLoginSuccess(true, result.user);
    } else if (error) {
      setLoginError(error);
    }
  };

  useEffect(() => {
    setLoginPending(true);
    loadPersistedJwt(handleLoginResult);
  }, []);

  // ปรับ login ให้ return Promise
  const login = (username, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    return fetchLogin(username, password)
      .then((result) => {
        handleLoginResult(null, result);
        return result.user; 
      })
      .catch((error) => {
        handleLoginResult(error, null);
        throw error; 
      });
  };

  const logout = () => {
    setLoginPending(false);
    updateJwt(null);
    setLoginSuccess(false);
    setLoginError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const fetchLogin = async (username, password) => {
  try {
    const response = await ax.post(conf.loginEndpoint, {
      identifier: username,
      password,
    });
    if (response.data.jwt && response.data.user.id > 0) {
      return response.data;
    } else {
      throw new Error("Invalid username and password");
    }
  } catch (e) {
    throw new Error("Fail to initiate login");
  }
};

const loadPersistedJwt = async (callback) => {
  try {
    const persistedJwt = sessionStorage.getItem(conf.jwtSessionStorageKey);
    if (persistedJwt) {
      axData.jwt = persistedJwt;
      const response = await ax.get(conf.jwtUserEndpoint);
      if (response.data.id > 0) {
        callback(null, { user: response.data });
      } else {
        callback(null);
      }
    }
  } catch (e) {
    console.log(e);
    callback(new Error("Fail to initiate auto login"));
  }
};