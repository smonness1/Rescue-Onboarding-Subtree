import { useContext } from "react";
import { PrefrencesContext } from "../context/prefrencesContext";
export const usePreferencesContext = () => {
  const res = useContext(PrefrencesContext);
  return res;
};
