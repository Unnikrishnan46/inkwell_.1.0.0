import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Props = {
  dayAndTimeDetails:any;
  data:any;
}

const DisplayDiaryTop = ({dayAndTimeDetails,data}: Props) => {
  const router = useRouter();
  return (
    <View>
      <View style={styles.topIconContainer}>
        <TouchableOpacity onPress={()=>{router.navigate("(app)/(tabs)/home")}}><EvilIcons name='close' size={Dimensions.get("window").height * 0.04}/></TouchableOpacity>
        
      </View>
      <View style={{display:"flex",flexDirection:"row", justifyContent:"space-between",paddingHorizontal:20,marginTop:15}}>
        <View style={{display:"flex",flexDirection:"column"}}>
          <Text style={{fontFamily:"SFProDisplay",fontSize:Dimensions.get("window").height * 0.03}}>{dayAndTimeDetails?.day} {dayAndTimeDetails?.monthName} {dayAndTimeDetails?.year}</Text>
          <Text style={{fontFamily:"SFProDisplay",fontSize:Dimensions.get("window").height * 0.03}}>{dayAndTimeDetails?.dayOfWeek}  {dayAndTimeDetails?.hours}:{dayAndTimeDetails?.minutes} {dayAndTimeDetails?.ampm}</Text>
        </View>
        <Image style={{height:Dimensions.get("window").height * 0.05,width:Dimensions.get("window").height * 0.05}} source={data?.moodData?.file}/>
      </View>
      <View style={{marginTop:20,height:0.5,backgroundColor:"#BFA4F4",width:"80%",alignSelf:"center"}}/>
    </View>
  )
}

export default DisplayDiaryTop

const styles = StyleSheet.create({
    topIconContainer:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:20
      }
})