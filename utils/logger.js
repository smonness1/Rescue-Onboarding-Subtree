import { logger, consoleTransport, fileAsyncTransport } from "react-native-logs";
import * as FileSystem from 'expo-file-system';

const config = {
  transport: process.env["EXPO_PUBLIC_BRANCH"] === "PROD" ? fileAsyncTransport : consoleTransport,
  severity: process.env["EXPO_PUBLIC_BRANCH"] === "PROD" ? "error" : "debug",
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
    FS: FileSystem,
  },
};

const configured_logger = logger.createLogger(config);

export { configured_logger as logger };