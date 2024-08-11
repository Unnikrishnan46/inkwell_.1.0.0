// import { StyleSheet, Text, View, Platform } from "react-native";
// import React, { useCallback, useMemo, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
// import { setMenuBottomSheetRef, setSheetZIndex } from "@/redux/sheetState";
// import { Link } from "expo-router";
// import {
//   AntDesign,
//   Feather,
//   Ionicons,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// type Props = {};

// const MenuModal = (props: Props) => {
//   const sheetState = useSelector((state: any) => state.sheetState);
//   const snapPoints = useMemo(() => ["40%"], []);
//   const bottomSheetRef = useRef<BottomSheet>(null);
//   const dispatch = useDispatch();
//   const renderBackdrop = useCallback(
//     (props: any) => (
//       <BottomSheetBackdrop
//         {...props}
//         appearsOnIndex={0}
//         disappearsOnIndex={-1}
//       />
//     ),
//     []
//   );

//   React.useEffect(() => {
//     dispatch(setMenuBottomSheetRef(bottomSheetRef.current));
//   }, [dispatch, bottomSheetRef]);

//   const menuData = [
//     {
//       name: "Premium",
//       icon: <AntDesign name="export" size={30} />,
//       route: "(screens)/premium",
//     },
//     {
//       name: "Themes",
//       icon: <Ionicons name="color-palette-outline" size={30} />,
//       route: "(screens)/themes",
//     },
//     {
//       name: "Privacy",
//       icon: <MaterialCommunityIcons name="shield-check-outline" size={30} />,
//       route: "(screens)/privacyScreen",
//     },
//     {
//       name: "Back Up & Restore",
//       icon: <Feather name="download-cloud" size={30} />,
//       route: "(screens)/backUpAndRestoreScreen",
//     },
//     {
//       name: "Export",
//       icon: <Feather name="printer" size={30} />,
//       route: "(screens)/exportScreen",
//     },
//     {
//       name: "Settings",
//       icon: <Feather name="settings" size={30} />,
//       route: "(screens)/settings",
//     },
//   ];

//   return (
//     <GestureHandlerRootView
//       style={{
//         flex: 1,
//         position: "absolute",
//         zIndex: sheetState?.sheetZIndex,
//         bottom: 0,
//         height: "100%",
//         width: "100%",
//       }}
//     >
//       <BottomSheet
//         style={{ backgroundColor: "white" }}
//         ref={bottomSheetRef}
//         snapPoints={snapPoints}
//         enablePanDownToClose={true}
//         backdropComponent={renderBackdrop}
//         index={-1}
//         onClose={()=>dispatch(setSheetZIndex(-1000))}
//       >
//         <View style={styles.mainContainer}>
//           {menuData?.map((item, index) => (
//             <Link
//               onPress={() => {
//                 bottomSheetRef.current?.close();
//               }}
//               key={index}
//               href={`${item?.route}`}
//             >
//               <View style={styles.subContainer}>
//                 {item?.icon}
//                 <Text style={styles.text}>{item?.name}</Text>
//               </View>
//             </Link>
//           ))}
//         </View>
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// export default MenuModal;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     width: "100%",
//     justifyContent: "space-between",
//     paddingVertical: 15,
//   },
//   text: {
//     fontSize: 20,
//   },
//   subContainer: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: Platform.select({
//       // ios: 17,
//       // android: 5,
//     }),
//     gap: 10,
//   },
// });

import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMenuBottomSheetRef } from "@/redux/sheetState";
import { Link } from "expo-router";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

type Props = {};

const MenuModal = (props: Props) => {
  const sheetState = useSelector((state: any) => state.sheetState);
  const dispatch = useDispatch();

  const menuData = [
    {
      name: "Premium",
      icon: <AntDesign name="export" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/premium",
    },
    {
      name: "Themes",
      icon: <Ionicons name="color-palette-outline" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/themesSelectionScreen",
    },
    {
      name: "Privacy",
      icon: <MaterialCommunityIcons name="shield-check-outline" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/privacyScreen",
    },
    {
      name: "Back Up & Restore",
      icon: <Feather name="download-cloud" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/backUpAndRestoreScreen",
    },
    {
      name: "Export",
      icon: <Feather name="printer" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/exportScreen",
    },
    {
      name: "Settings",
      icon: <Feather name="settings" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/settings",
    },
  ];

  const refRBSheet = useRef(null) as any;

  React.useEffect(() => {
    dispatch(setMenuBottomSheetRef(refRBSheet.current));
  }, [dispatch, refRBSheet]);

  return (
    <RBSheet
      ref={refRBSheet}
      height={Dimensions.get("window").height / 2}
      customStyles={{
        container:{
          backgroundColor:"#fff",

        },
        wrapper: {
          backgroundColor: "#00000036",
          
        },
        draggableIcon: {
          backgroundColor: "#000",
        },
      }}
      customModalProps={{
        animationType: "none",
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
      draggable={true}

    >
      <View style={styles.mainContainer}>
        {menuData?.map((item, index) => (
          <Link
            onPress={() => {
              refRBSheet.current?.close();
            }}
            key={index}
            href={`${item?.route}`}
          >
            <View style={styles.subContainer}>
              {item?.icon}
              <Text style={styles.text}>{item?.name}</Text>
            </View>
          </Link>
        ))}
      </View>
    </RBSheet>
  );
};

export default MenuModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  text: {
    fontSize: Dimensions.get("window").height * 0.025,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: Platform.select({
      // ios: 17,
      // android: 5,
    }),
    gap: 10,
  },
});
