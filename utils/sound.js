import React from "react";
import { logger } from "../utils/logger";
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";

const log = logger.extend("Sound");

export default class SoundContainer {
  constructor(soundFile) {
    log.debug("Creating SoundContainer");
    this.soundFile = soundFile;
    this.isFinished = false;
    this.soundInstance = null;

    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  }

  update(isPlayed, setIsPlayed) {
    this.isPlayed = isPlayed;
    this.setIsPlayed = setIsPlayed;
  }

  async playSound() {
    if (this.soundInstance == null) {
      this.isFinished = false;
      log.debug("Loading and playing sound");
      const { sound } = await Audio.Sound.createAsync(
        this.soundFile,
        (initialStatus = { shouldPlay: true }),
        (onPlaybackStatusUpdate = (status) => {
          if (status.isLoaded && status.didJustFinish)
            log.debug("Just finished playing sound");
          this.isFinished = true;
        }),
      );
      this.soundInstance = sound;
    }
  }

  setSoundOnFocus() {
    useFocusEffect(
      React.useCallback(() => {
        if (this.isPlayed) {
          log.debug("Screen Focused");
          this.playSound();
          return () => {
            log.debug("Unloading Screen Sound");
            this.soundInstance?.unloadAsync();
            this.soundInstance = null;
          };
        } else {
          log.debug("Is played is false");
        }
      }, [this.isPlayed]),
    );
  }
}
