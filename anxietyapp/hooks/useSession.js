import useAsyncStorage from "./useAsyncStorage";
import {auth} from "../firebase/config";
import {signInAnonymously} from "firebase/auth";
import {generateObjectIdAsUUIDv4} from "../utils/strings";

const useSession = () => {
  const {readData, writeData} = useAsyncStorage();

  const getSessionId = async () => {
    return readData("session_id")
  };

  const setSessionId = async (value) => {
    return writeData("session_id", value)
  };

  const initSession = async() => {
    if(!auth.currentUser) {
      try {
        await signInAnonymously(auth)
      }
      catch (e){
        console.log(e)
        return null;
      }
    }
    const sessionId = generateObjectIdAsUUIDv4()
    await setSessionId(sessionId)
  }

  return {
    getSessionId,
    initSession,
  };
};

export default useSession;
