import {auth, rtdb} from "../../firebase/config";
import {push, set, ref} from "firebase/database";
import useSession from "../../hooks/useSession";
import {formatDateDay, formatDate} from "../../utils/strings";
import * as Device from 'expo-device';
import {Platform} from "react-native";


export const EventType = {
  SESSION: "SESSION",
  SCREEN: "SCREEN",
  CLICK: "CLICK",
  EXERCISE: "EXERCISE",
  SKIPPED_EXERCISE: "SKIPPED_EXERCISE",
  LOCATION: "LOCATION",
  FEELING: "FEELING"
};

export const FeelingType = {
  BETTER: "BETTER",
  WORSE: "WORSE",
  SAME: "SAME",
}


export class AnalyticsEvent {
  /**
   *
   * @param type: string
   * @param name: string
   * @param duration: number
   * @param extra: Record<string, any>
   */
  constructor(type, name, duration, extra) {
    this.type = type;             // LogType
    this.name = name;             // screen name / exercise name
    this.duration = duration      // in seconds?
    this.extra = extra            // extra informative data
    this.timestamp = formatDate(new Date())
  }

  toJSON() {
    const obj = {
      'type': this.type,
      'name': this.name,
    }
    if (this.duration) {
      obj.duration = this.duration;
    }
    if (this.timestamp) {
      obj.timestamp = this.timestamp;
    }
    if(this.extra){
      obj.extra = this.extra
    }
    return obj;
  }
}

/**
 *
 * @param userId: string
 * @param event: AnalyticsEvent
 */
const trackEvent = async ({userId, event}) => {
  const {getSessionId} = useSession();
  const sessionId = await getSessionId();
  if (!sessionId) {
    console.log("No session Created")
    return;
  }
  const today = Date.now();
  const path = `logs/${formatDateDay(today, true)}/${userId}/${sessionId}/events`;
  push(ref(rtdb, path), event.toJSON());
}

/**
 *
 * @param userId: string
 * @returns {Promise<void>}
 */
const trackDevice = async (userId) => {
  const {getSessionId} = useSession();
  const sessionId = await getSessionId();
  if (!sessionId) {
    console.log("No session Created")
    return;
  }
  const today = Date.now();
  const path = `logs/${formatDateDay(today, true)}/${userId}/${sessionId}/device`;
  const deviceInfo = {
    model: Device.modelName,
    os: Platform.OS,
    osVersion: Device.osVersion,
  }
  set(ref(rtdb, path), deviceInfo).then(_ => {});
}

/**
 *
 * @param feeling: string
 * @returns {Promise<void>}
 */
const trackFeelingEvent = async (feeling) => trackEvent({
  userId: auth.currentUser.uid,
  event: new AnalyticsEvent(EventType.FEELING, feeling)
})


const useAnalytics = () => {
  return {trackEvent, trackFeelingEvent, trackDevice};
};

export default useAnalytics;
