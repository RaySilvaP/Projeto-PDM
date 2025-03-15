import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

export function useAuth(){
  const contexto = useContext(AuthContext);
  return contexto
}
