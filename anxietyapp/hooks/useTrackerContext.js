import { useContext } from "react";
import { TrackerContext } from "../context/TrackerContext";
export const useTrackerContext = () => {
  const res = useContext(TrackerContext);
  return res;
};
