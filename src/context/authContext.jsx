import {
  createContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from "react";

export const AuthContext = createContext(null);

const initialValue = {
  isAuth: false,
  user: null,
  token: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LOGGED_IN":
      return {
        ...state,
        isAuth: true,
        token: payload,
      };

    case "SET_LOGGED_OUT":
      return initialValue;

    case "SET_USER":
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const [isApploading, setIsAppLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token) {
        dispatch({
          type: "SET_LOGGED_IN",
          payload: token,
        });
      }

      if (user) {
        dispatch({
          type: "SET_USER",
          payload: JSON.parse(user),
        });
      }
    } catch (error) {
      console.log("Auth initialization error:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setIsAppLoading(false);
    }
  }, []);

  const handleLogin = useCallback((token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: "SET_LOGGED_IN",
      payload: token,
    });

    dispatch({
      type: "SET_USER",
      payload: user,
    });
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch({
      type: "SET_LOGGED_OUT",
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        isApploading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
