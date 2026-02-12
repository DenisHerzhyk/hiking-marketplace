import { ReactNode } from "react";

interface IProtected {
  children: ReactNode;
  isLoggedIn: boolean;
}

export default IProtected;
