import { Dimensions, Platform, StyleSheet, View } from "react-native";
import React from 'react';
import { BarChart } from "react-native-chart-kit";

// Function to count diary entries by day of the week
const countEntriesByDayOfWeek = (diaries:any) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayCounts = daysOfWeek.reduce((acc:any, day) => {
    acc[day] = 0;
    return acc;
  }, {});

  diaries?.forEach((diary: { CurrentDayDetails: { dayOfWeek: any; }; }) => {
    const dayOfWeek = diary?.CurrentDayDetails?.dayOfWeek;
    if (dayCounts.hasOwnProperty(dayOfWeek)) {
      dayCounts[dayOfWeek]++;
    }
  });

  return daysOfWeek.map(day => ({
    day,
    count: dayCounts[day],
  }));
};

type Props = {
  diaries: any;
};

const BestDayInWeakGraph = ({ diaries }: Props) => {
  const data = countEntriesByDayOfWeek(diaries);

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: data.map((item) => item.day.substring(0, 3)),
          datasets: [
            {
              data: data.map((item) => item.count),
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

export default BestDayInWeakGraph;

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
