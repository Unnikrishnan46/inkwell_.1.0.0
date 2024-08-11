import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import CarouselSlide from "@/components/carouselSlide";
import { useSelector } from "react-redux";
import PremiumPlanTab from "@/components/premiumPlanTab";

type Props = {};

const Premium = (props: Props) => {
  const width = Dimensions.get("window").width;
  const themeState = useSelector((state:any)=>state.themeState);
  const carouselData = [
    [
      { name: "Unlock all mood set", image: require('../../assets/images/features/feature1.png') },
      { name: "Unlock all backgrounds", image: require('../../assets/images/features/feature2.png') },
      { name: "Use all fonts", image: require('../../assets/images/features/feature3.png') },
      { name: "Use pro stickers", image: require('../../assets/images/features/feature4.png') },
      { name: "Analyze your mood", image: require('../../assets/images/features/feature5.png') },
      { name: "Create your own stickers", image: require('../../assets/images/features/feature6.png') },
    ],
    [
      { name: "More powerfull text editor", image: require('../../assets/images/features/feature7.png') },
      { name: "Auto backup", image: require('../../assets/images/features/feature8.png') },
      { name: "Export all your memories as PDF", image: require('../../assets/images/features/feature9.png') },
      { name: "Ads free experiences", image: require('../../assets/images/features/feature10.png') },
      { name: "Delete/Change watermark", image: require('../../assets/images/features/feature11.png') },
      { name: "Unlock all themes", image: require('../../assets/images/features/feature12.png') },
    ],
  ];

  return (
    <ScrollView style={[styles.container,{backgroundColor:themeState?.selectedThemeData?.bodyBgColor}]}>
      <View style={styles.container}>
      <Carousel
        style={{marginTop:10}}
        loop
        width={width}
        height={width / 2 + 100}
        autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={1000}
        autoPlayInterval={5000}
        renderItem={({ item }) => <CarouselSlide item={item} />}
      />
      <PremiumPlanTab/>
      
      </View>
    </ScrollView>
  );
};

export default Premium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
