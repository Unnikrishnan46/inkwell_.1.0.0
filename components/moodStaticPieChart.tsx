import { Dimensions, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";

type Props = {
  stats: any;
};

const MoodStaticPieChart = ({ stats }: Props) => {
  const moodCounts = stats?.moodCounts;

  const moodData = Object.keys(moodCounts).map((key, index) => ({
    name: key,
    population: moodCounts[key],
    color: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40", "#4BC0C0"][index % 5],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <PieChart
        data={moodData}
        width={Dimensions.get("window").width - 20}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default MoodStaticPieChart;

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
