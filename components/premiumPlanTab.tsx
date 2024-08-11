import {
  StyleSheet,
  Text,
  View,
  Platform,
  Switch,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsTrialEnabled, setSelectedPlan } from "@/redux/premiumPlanState";
import { LinearGradient } from "expo-linear-gradient";

type Props = {};

const PremiumPlanTab = (props: Props) => {
  const themeState = useSelector((state: any) => state.themeState);
  const selectedThemeData = useSelector((state: any) => state.themeState)?.selectedThemeData;
  const selectedPlan = useSelector(
    (state: any) => state.premiumPlanState
  ).selectedPlan;
  const isTrialEnabled = useSelector(
    (state: any) => state.premiumPlanState
  ).isTrialEnabled;

  const dispatch = useDispatch();

  const handlePlanTabPress = (plan: string) => {
    dispatch(setSelectedPlan(plan));
  };

  const toggleSwitch = () => {
    dispatch(setIsTrialEnabled(!isTrialEnabled));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => {
            handlePlanTabPress("monthly");
          }}
          style={[
            styles.tab,
            {
              width: "32%",
              height: Dimensions.get("window").height * 0.2,
              borderColor: themeState?.selectedThemeData?.buttonBg,
              borderWidth: selectedPlan === "monthly" ? 2 : 0,
            },
          ]}
        >
          <Text style={{ fontSize: Dimensions.get("window").height * 0.03 }}>Monthly</Text>
          <Text style={{ fontSize: Dimensions.get("window").height * 0.03, fontWeight: "bold" }}>$4.43</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePlanTabPress("annualy");
          }}
          style={[
            styles.tab,
            {
              width: "32%",
              height: Dimensions.get("window").height * 0.25,
              borderColor: themeState?.selectedThemeData?.buttonBg,
              borderWidth: selectedPlan === "annualy" ? 2 : 0,
            },
          ]}
        >
          <Text style={{ fontSize: Dimensions.get("window").height * 0.03}}>Annual</Text>
          <Text style={{ fontSize: Dimensions.get("window").height * 0.03, fontWeight: "bold" }}>$10.48</Text>
          <Text
            style={{
              fontSize: Dimensions.get("window").height * 0.02,
              color: themeState?.selectedThemeData?.buttonBg,
              fontWeight: "bold",
            }}
          >
            USD 0.87/month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePlanTabPress("lifeTime");
          }}
          style={[
            styles.tab,
            {
              width: "32%",
              height: Dimensions.get("window").height * 0.2,
              borderColor: themeState?.selectedThemeData?.buttonBg,
              borderWidth: selectedPlan === "lifeTime" ? 2 : 0,
            },
          ]}
        >
          <Text style={{ fontSize: Dimensions.get("window").height * 0.03 }}>Life time</Text>
          <Text style={{ fontSize: Dimensions.get("window").height * 0.03, fontWeight: "bold" }}>$22.16</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", paddingHorizontal: 20, marginTop: 10 }}>
        <View style={styles.trialContainer}>
          <Text
            style={{
              fontFamily: "SFProDisplay",
              color: themeState?.selectedThemeData?.buttonBg,
              fontSize: Dimensions.get("window").height * 0.03,
            }}
          >
            Not sure ? Enable free Trial
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={
              isTrialEnabled
                ? themeState?.selectedThemeData?.addDiaryBtnBg
                : "#f4f3f4"
            }
            ios_backgroundColor={themeState?.selectedThemeData?.buttonBg}
            onValueChange={toggleSwitch}
            value={isTrialEnabled}
          />
        </View>
      </View>
      <View style={{ width: "100%", marginTop: 20, justifyContent: "center" }}>
        <Text
          style={{
            fontFamily: "SFProDisplay",
            fontSize: Dimensions.get("window").height * 0.025,
            textAlign: "center",
          }}
        >
          Recurring billing cancel anytime
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 20,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <LinearGradient 
        end={{x: 0.1, y: 0.5}}
          colors={[selectedThemeData?.buttonBg, selectedThemeData?.calendarCurrentBG]}
          style={styles.button}
        >
          <TouchableOpacity style={styles.upgradeBtn}>
            <Text style={{ fontSize: Dimensions.get("window").height * 0.03, color: "white" }}>
              Upgrade Premium
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={{
          width: "100%",
          marginTop: 30,
          justifyContent: "center",
          paddingHorizontal: 20,
          flexDirection:"row",
          marginBottom:10
        }}>
          <Text>Privacy Policy</Text>
          <Text> | </Text>
          <Text>Terms of Use</Text>
      </View>
    </View>
  );
};

export default PremiumPlanTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  tab: {
    shadowColor: "black",
    shadowOpacity: Platform.select({
      ios: 0.1,
      android: 0.5,
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: Platform.select({
      ios: 5,
      android: 20,
    }),
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  tabContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  selected: {
    borderWidth: 4,
  },
  trialContainer: {
    shadowColor: "black",
    shadowOpacity: Platform.select({
      ios: 0.1,
      android: 0.8,
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: Platform.select({
      ios: 5,
      android: 20,
    }),
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: "center",
  },
  upgradeBtn: {
    // backgroundColor: "red",
  },
  button: {
    padding: Dimensions.get("window").height * 0.02,
    alignItems: "center",
    borderRadius: 15,
  },
});
