import { useMemo, useState } from "react";
import App from "./App";
import { UserContext } from "./utils/context";
import { IUser } from "./models/user";

function Root() {
  const [user, setUser] = useState<IUser | null | undefined>(undefined);

  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <UserContext.Provider value={userContextValue}>
        <App />
      </UserContext.Provider>
    </>
  );
}

export default Root;
