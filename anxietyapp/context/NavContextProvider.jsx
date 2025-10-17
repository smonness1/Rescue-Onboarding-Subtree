import React, {useState, useRef} from "react";

import {NavContext} from './NavContext'
import LangBottomSheet from "../components/LangBottomSheet";

export function NavContextProvider({children}) {
  // Location of the user (Home, Alone, ...) - used to determine outcome of navFunction
  const [location, setLocation] = useState(null);
  // navFunction accepts string of mood and returns a string of next page's name.
  // should be set on scersize screens and used on mood select screens
  const [navFunction, setNavFunction] = useState(null);
  // used when needing to repeat last excersice
  const [lastExcercise, setLastExcercise] = useState(null);

  const bottomSheetRef = useRef();

  return (
    <NavContext.Provider
      value={{
        location: location,
        setLocation: setLocation,
        navFunction: navFunction,
        setNavFunction: setNavFunction,
        lastExcercise: lastExcercise,
        setLastExcercise: setLastExcercise,
        bottomSheetRef: bottomSheetRef,
      }}
    >
      {children}
      <LangBottomSheet ref={bottomSheetRef}/>
    </NavContext.Provider>
  );
}
