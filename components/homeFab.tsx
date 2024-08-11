import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

type Props = {};

const HomeFab = (props: Props) => {
  const [state, setState] = useState<any>({ open: false });
  const onStateChange = ({ open }: any) => setState({ open });
  const router = useRouter();
  const selectedThemeData = useSelector((state: any) => state.themeState)?.selectedThemeData;

  const { open } = state;
  return (
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? "plus" : "plus"}
          color={selectedThemeData?.buttonTextColor}
          style={{zIndex:5000000, }}
            backdropColor="rgba(144, 39, 245, 0.07)"
            fabStyle={{backgroundColor:selectedThemeData?.buttonBg,}}
          actions={[
            {
              icon: "billboard",
              label: "Mood board",
              onPress: () => {
                router.navigate("(screens)/moodBoardScreen");
              },
            },
            {
              icon: "robot-excited-outline",
              label: "Inkey",
              onPress: () => {
                router.navigate("(screens)/inkeyChat");
              },
            },
            {
              icon: "head-lightbulb-outline",
              label: "Affirmation",
              onPress: () => {
                router.navigate("(screens)/affirmationsScreen");
              },
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
  );
};

export default HomeFab;

const styles = StyleSheet.create({});
