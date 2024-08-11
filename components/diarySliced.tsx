import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

type Props = {
  data:any;
  mb:any;
};

const DiarySliced = ({data,mb}: Props) => {
  const  router = useRouter();
  const handleDiaryPress = () => {
    router.navigate({ pathname: `(screens)/displayDiary`, params: { id: data.id } });
  };
  return (
    <Pressable onPress={handleDiaryPress} style={[styles.container,{marginBottom:mb}]}>
      <View style={{ borderRightWidth: 1, borderColor: "#D2BFF7" ,paddingRight:10}}>
        <Image
          style={styles.mood}
          source={data?.moodData?.file}
        />
        <View style={{ flexDirection: "row", gap: 0, alignItems: "center" }}>
          <View
            style={{ flexDirection: "row", gap: 0, alignItems: "flex-start" }}
          >
            <Text
              style={{
                fontSize: Dimensions.get("window").height * 0.04,
                fontWeight: "bold",
                color: "#4C4262",
                lineHeight: 62,
              }}
            >
              {data?.CurrentDayDetails?.day}
            </Text>
            <Text
              style={{
                lineHeight: Dimensions.get("window").height * 0.04,
                fontSize: 15,
                color: "#4C4262",
                overflow: "visible",
              }}
            >
              th
            </Text>
          </View>
          <Text
            style={{
              fontSize: Dimensions.get("window").height * 0.03,
              fontWeight: "regular",
              color: "#4C4262",
              fontFamily: "SFProDisplay",
            }}
          >
            {data?.CurrentDayDetails?.monthName}
          </Text>
        </View>
        <Text style={{ fontSize: Dimensions.get("window").height * 0.03, fontFamily: "SFProDisplay" }}>
        {data?.CurrentDayDetails?.dayOfWeek}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.diaryTitle} numberOfLines={1} ellipsizeMode="tail">
        {data?.title}
        </Text>
        <Text style={styles.diaryBody} numberOfLines={2} ellipsizeMode="tail">
        {data?.body[0]?.itemContent}
        </Text>
      </View>
    </Pressable>
  );
};

export default DiarySliced;

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOpacity: Platform.select({
      ios: 0.1,
      android: 0.2,
    }),
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: Platform.select({
      ios: 5,
      android: 5,
    }),
    elevation: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    overflow: "hidden",
    gap:10,
  },
  mood: {
    height: Dimensions.get("window").height * 0.05,
    width: Dimensions.get("window").height * 0.05,
  },
  diaryTitle: {
    fontSize: Dimensions.get("window").height * 0.035,
    fontFamily: "BadScript",
  },
  diaryBody:{
    fontSize: Dimensions.get("window").height * 0.028,
    fontFamily: "BadScript",
  }
});
