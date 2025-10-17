import axios from "axios";
import {createContext, useEffect, useRef, useState} from "react";
import {logger} from "../utils/logger";
import useAnalytics, {AnalyticsEvent, EventType} from "../api/services/trackerService";
import {auth} from "../firebase/config";

const log = logger.extend("TrackerContext");
export const TrackerContext = createContext();

export function TrackerContextProvider({children}) {
  const [userActions, setUserActions] = useState([]);
  const [usageStartTime, setUsageStartTime] = useState(null);
  const [usageEndTime, setUsageEndTime] = useState(null);
  const lastExerciseUsageTimeRef = useRef(0);

  const {trackEvent} = useAnalytics();

  const BOT_API_TOKEN = "6671559531:AAHInIJ1SSSu6K1x2dj1N24u-JBim_Drrxs";

  useEffect(() => {
    log.debug(`--usageEndTime Changed To ${usageEndTime}`);
    // Finish using the app
    if (usageEndTime) {
      const output = printUserActions();

      const sessionDuration = (usageEndTime - usageStartTime) / 1000; // in seconds

      trackEvent({
        userId: auth.currentUser.uid,
        event: new AnalyticsEvent(EventType.SESSION, "END", sessionDuration)
      })


      if (process.env["EXPO_PUBLIC_BRANCH"] === "PROD") {
        // *PROD*
        sendMessageToTelegram(output);
      }
      log.debug(output);

    }
  }, [usageEndTime]);

  async function trackAction(action) {
    console.log('--Tracking Action--');
    const newActions = [...userActions, action];
    setUserActions(newActions);
  }

  function startTrackEventTime() {
    lastExerciseUsageTimeRef.current = Date.now();
    console.log("start Tracking Event time...")
  }

  async function trackExerciseEvent(exerciseName, skipped) {
    const now = new Date();
    const eventDuration = (now - lastExerciseUsageTimeRef.current) / 1000; // in seconds

    if (skipped) {
      await trackEvent({
        userId: auth.currentUser.uid,
        event: new AnalyticsEvent(EventType.SKIPPED_EXERCISE, exerciseName, eventDuration)
      })
    } else {

      await trackEvent({
        userId: auth.currentUser.uid,
        event: new AnalyticsEvent(EventType.EXERCISE, exerciseName, eventDuration)
      })
    }
  }


  function printUserActions() {
    let output = `<<User Data Log>>\n[Start Time: ${usageStartTime}]\n`;
    userActions.forEach((action) => {
      output += `${action}, `;
    });
    output += `\n [End Time: ${usageEndTime}]`;

    return output;
  }

  async function sendMessageToTelegram(message) {
    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`,
        {chat_id: "-4094924994", text: message}
      );
      log.debug("Message sent: ", response.data);
    } catch (error) {
      log.error("Error sending message: ", error);
    }
  }

  return (
    <TrackerContext.Provider
      value={{
        setUsageStartTime: setUsageStartTime,
        setUsageEndTime: setUsageEndTime,
        trackAction: trackAction,
        trackExerciseEvent: trackExerciseEvent,
        startTrackEventTime: startTrackEventTime,
        printUserActions: printUserActions,
        userActions: userActions,
        setUserActions: setUserActions,
        usageEndTime: usageEndTime,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
