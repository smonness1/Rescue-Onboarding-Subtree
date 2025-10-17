import { useContext } from "react";
import { NavContext } from "../context/NavContext";
export const useNavContext = () => {
  const res = useContext(NavContext);
  return res;
};
