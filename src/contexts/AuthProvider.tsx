import { createContext } from "react";

interface IAuthProvider {
    accessToken: string;
}

export const AuthProvider = createContext<IAuthProvider>({ accessToken: "" });
