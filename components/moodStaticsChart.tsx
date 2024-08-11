import { Dimensions, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";

const MoodStaticsChart = ({ stats }:any) => {
  const moodCounts = stats?.moodCounts;
  
  const moodData = Object.keys(moodCounts).map((key) => ({
    name: key,
    count: moodCounts[key],
  }));

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: moodData.map((data) => data.name),
          datasets: [
            {
              data: moodData.map((data) => data.count),
            },
          ],
        }}
        width={Dimensions.get("window").width - 20}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#28B463",
          backgroundGradientFrom: "#EDEADE",
          backgroundGradientTo: "#EDEADE",
          decimalPlaces: 0,
          fillShadowGradient: "#FF6384",
          fillShadowGradientOpacity: 1,
          fillShadowGradientFrom: "#000000",
          fillShadowGradientTo: "#FF6384",
          fillShadowGradientToOpacity: 1,
          color: (opacity = 1) => `#EDEADE`,
          labelColor: (opacity = 1) => `#000000`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "0",
            strokeWidth: "0",
            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default MoodStaticsChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDEADE",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: Platform.select({
      ios: 0.2,
      android: 0.56,
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
});
