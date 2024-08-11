import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";

type Props = {
  item:any;
};

const ThemeSelectionDisplay = ({item}: Props) => {
  const themeState = useSelector((state: any) => state.themeState);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 15,
          backgroundColor: item?.topBarBg,
        }}
      >
        <Text style={{color:item?.topBarTitleColor}}>Inkwell</Text>
        <MaterialCommunityIcons color={item?.topBarIconColor} name="crown-outline" size={20} />
      </View>
      <View
        style={[{
          backgroundColor: item?.bodyBgColor,
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        },styles.please]}
      >
        <View style={styles.cardMain}>
          <View style={styles.imageDiv}>
            <Image
              style={styles.imageStyle}
              source={item?.image}
            />
          </View>
          <View style={styles.cardSubMain}>
            <Text
              style={{
                fontFamily: "inkfree",
                fontSize: Dimensions.get("window").height * 0.02,
                textAlign: "center",
                color: "black",
              }}
            >
              My diary is my best friend with ink of love i write myself into it
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            backgroundColor:item?.bottonBarBg,
            position:"absolute",
            bottom:0,
            paddingVertical:5
          }}
        >
          <Feather
            name={"align-left"}
            size={23}
            color={item?.bottomBarIconColor}
          />

          <Ionicons
            name={"stats-chart-outline"}
            size={23}
            color={item?.bottomBarIconColor}
          />

          <View
            style={{
              alignItems: "center",
              backgroundColor: item?.addDiaryBtnBg,
              height: 40,
              width:40,
              borderRadius: 50,
              flex: 0,
              justifyContent: "center",
              marginBottom: Platform.select({
                ios: 0,
                android: 0,
              }),
              borderColor: "white",
              borderWidth: 1.5,
            }}
          >
            <AntDesign
              name={"plus"}
              size={20}
              color={item?.addDiaryIconColor}
            />
          </View>

          <AntDesign
            name={"calendar"}
            color={item?.bottomBarIconColor}
            size={23}
          />

          <Ionicons
            name={"search-outline"}
            color={item?.bottomBarIconColor}
            size={23}
          />
        </View>
      </View>
    </View>
  );
};

export default ThemeSelectionDisplay;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Dimensions.get("window").height * 0.05,
    marginTop: Dimensions.get("window").height * 0.04,
  },
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardMain: {
    alignItems: "center",
    width: "80%",
    height: "50%",
    // width: Dimensions.get("window").width - 60,
    // height: Dimensions.get("window").height / 2,
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    paddingBottom: 20,
  },

  imageDiv: {
    width: "100%",
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  imageStyle: {
    width: "100%",
    height: 125,
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    
  },
  cardSubMain: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
    gap: 20,
  },
  SOTbtn: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 2,
    height: 45,
    borderRadius: 14,
  },
  please:{
    shadowColor: "black",
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  }
});
