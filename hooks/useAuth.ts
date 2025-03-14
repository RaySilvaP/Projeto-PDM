import { useContext } from "react";
import {AuthContext} from '../context/AuthProvider';
export function useAuth(){
  const contexto = useContext(AuthContext);
  return contexto
}
