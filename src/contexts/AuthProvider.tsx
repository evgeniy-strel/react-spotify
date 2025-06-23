import { createContext } from "react";

interface IAuthProvider {}

export const AuthProvider = createContext<IAuthProvider>({ accessToken: "" });
