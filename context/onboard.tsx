// import { useRouter, useSegments } from "expo-router";
// import * as React from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const OnBoardContext = React.createContext<any>(null);

// export function useOnboard() {
//   return React.useContext(OnBoardContext);
// }

// export function OnboardProvider({ children }: React.PropsWithChildren) {
//   const rootSegment = useSegments();
//   const router = useRouter();
//   const [onBoardSeen, setOnBoardSeen] = React.useState<boolean>(false);

//   const checkOnboardingStatus = async () => {
//     try {
//       const onBoardSeenData = (await AsyncStorage.getItem(
//         "inkwellAppData"
//       )) as any;
//       const parsedData = JSON.parse(onBoardSeenData);
//       const onboardSeenStatus = parsedData?.onboardSeen;
//       if (!onboardSeenStatus && rootSegment[0] !== "(onboard)") {
//         router.replace("/(onboard)/onboard");
//       } else if (onboardSeenStatus && rootSegment[0] !== "(app)") {
//         router.replace("/");
//       }
//     } catch (error) {
//       console.error("Failed to load onboarding status:", error);
//     }
//   };

//   React.useEffect(() => {
//     checkOnboardingStatus();
//   }, [onBoardSeen]);

//   return (
//     <OnBoardContext.Provider
//       value={{
//         onBoardSeen: onBoardSeen,
//         setOnboardSeen: () => {
//           setOnBoardSeen(true);
//           checkOnboardingStatus();
//         },
//         setOnBoardUnSeen: () => {
//           setOnBoardSeen(false);
//           checkOnboardingStatus();
//         },
//       }}
//     >
//       {children}
//     </OnBoardContext.Provider>
//   );
// }

// import { useRouter } from "expo-router";
// import * as React from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const OnBoardContext = React.createContext<any>(null);

// export function useOnboard() {
//   return React.useContext(OnBoardContext);
// }

// export function OnboardProvider({ children }: React.PropsWithChildren) {
//   const [onBoardSeen, setOnBoardSeen] = React.useState<boolean>(false);
//   const router = useRouter();

//   const checkOnboardingStatus = async () => {
//     try {
//       const onBoardSeenData = await AsyncStorage.getItem("inkwellAppData");
//       const parsedData = onBoardSeenData ? JSON.parse(onBoardSeenData) : null;
//       const onboardSeenStatus = parsedData?.onboardSeen;
//       setOnBoardSeen(!!onboardSeenStatus);
//     } catch (error) {
//       console.error("Failed to load onboarding status:", error);
//     }
//   };

//   React.useEffect(() => {
//     checkOnboardingStatus();
//   }, []);

//   return (
//     <OnBoardContext.Provider
//       value={{
//         onBoardSeen,
//         setOnboardSeen: () => {
//           setOnBoardSeen(true);
//           checkOnboardingStatus();
//         },
//         setOnBoardUnSeen: () => {
//           setOnBoardSeen(false);
//           checkOnboardingStatus();
//         },
//       }}
//     >
//       {children}
//     </OnBoardContext.Provider>
//   );
// }

import React, { createContext, useState, useContext } from 'react';

// Create a context
const OnboardingContext = createContext<any>(null);

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider = ({ children }: React.PropsWithChildren) => {
  const [onBoardScreenCompleted, setOnBoardScreenCompleted] = useState(false);

  return (
    <OnboardingContext.Provider value={{ onBoardScreenCompleted, setOnBoardScreenCompleted }}>
      {children}
    </OnboardingContext.Provider>
  );
};
