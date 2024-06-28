import { useContext, useEffect, useState } from "react";
import "./App.css";
import AuthContainer from "./containers/AuthContainer";
import { TUserContext, UserContext } from "./utils/context";
import MainContainer from "./containers/MainContainer";
import requester from "./utils/requester";
import { IUser } from "./models/user";

function App() {
  const userContext = useContext(UserContext) as TUserContext;

  const [authChecking, setAuthChecking] = useState(false);

  useEffect(() => {
    if (authChecking) {
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      userContext.setUser(null);
      return;
    }

    requester
      .get<IUser>("/office/user")
      .then((res) => {
        userContext.setUser(res.payload);
      })
      .catch((e) => {
        if (e?.response?.data?.status === "not_authorized") {
          userContext.setUser(null);
          localStorage.removeItem("token");
        }
        console.log(e);
      })
      .finally(() => {
        setAuthChecking(false);
      });
  }, [authChecking]);

  if (userContext.user === undefined) {
    return <h1>Checking</h1>;
  }

  return userContext.user ? <MainContainer /> : <AuthContainer />;
}

export default App;
