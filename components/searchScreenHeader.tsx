import { Dimensions, Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/searchState";
import { useRouter } from "expo-router";

type Props = {};

const SearchScreenHeader = (props: Props) => {
  const searchQuery = useSelector(
    (state: any) => state.searchState
  ).searchQuery;

  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  )?.selectedThemeData;

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearchQueryInput = (e: string) => {
    dispatch(setSearchQuery(e));
  };

  const handleBackBtnPress = ()=>{
    router.back();
  }

  return (
    <View
      style={{
        paddingHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        // backgroundColor:"gray",
        width:Platform.select({
          ios:Dimensions.get("window").width
        })
      }}
    >
      <View style={{
        alignItems: "center",
        flexDirection: "row",
        gap:10,
        marginBottom:1,
      }}>
        <TouchableOpacity onPress={handleBackBtnPress}>
          <AntDesign name="arrowleft" size={25} color={selectedThemeData?.topBarIconColor}/>
        </TouchableOpacity>
        <TextInput
          style={[styles.textInput,{color:selectedThemeData?.topBarTitleColor}]}
          placeholder="Search"
          placeholderTextColor={selectedThemeData?.topBarTitleColor}
          value={searchQuery}
          onChangeText={(e) => {
            handleSearchQueryInput(e);
          }}
        />
      </View>
      <TouchableOpacity onPress={()=>{dispatch(setSearchQuery(""))}}>
        <AntDesign name="close" color={selectedThemeData?.topBarIconColor} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchScreenHeader;

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    width: "85%",
    borderColor:"#BFA4F4",
    fontSize:20
  },
});
