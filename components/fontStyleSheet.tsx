import {
  // FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useRef } from "react";
import {
  setFontStyleSheetOpenRef,
  setIsFontStyleSheetOpen,
} from "@/redux/sheetState";
import { useDispatch, useSelector } from "react-redux";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { dataArray } from "@/util/colorList";
import { fontDataList } from "@/util/fontList";
import ActionSheet, {
  ActionSheetRef,
  useScrollHandlers,
} from "react-native-actions-sheet";
import {
  FlatList,
  NativeViewGestureHandler,
} from "react-native-gesture-handler";
import {
  setCurrentContentItemCount,
  setNewDiaryData,
} from "@/redux/curdDiaryState";
import { setIsAskPremiumModalOpen } from "@/redux/modalState";

type Props = {};

const width = Dimensions.get("window").width;
const height = Dimensions.get("screen").height;

const FontStyleSheet = (props: Props) => {
  const dispatch = useDispatch();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;

  const addFont = (selectedFont: any) => {
    const updatedBody = newDiaryData.body.map((item: any) => ({
      ...item,
      itemFont: selectedFont,
    }));

    const updatedDiaryData = {
      ...newDiaryData,
      body: updatedBody,
    };

    dispatch(setNewDiaryData(updatedDiaryData));
  };

  const addColor = (selectedColor: any) => {
    const updatedBody = newDiaryData.body.map((item: any) => ({
      ...item,
      itemFontColor: selectedColor,
    }));

    const updatedDiaryData = {
      ...newDiaryData,
      body: updatedBody,
    };

    dispatch(setNewDiaryData(updatedDiaryData));
  };

  const addSize = (selectedSize: any) => {
    const updatedBody = newDiaryData.body.map((item: any) => ({
      ...item,
      itemFontSize: selectedSize,
    }));

    const updatedDiaryData = {
      ...newDiaryData,
      body: updatedBody,
    };

    dispatch(setNewDiaryData(updatedDiaryData));
  };

  const addAlign = (selectedAlign: any) => {
    const updatedBody = newDiaryData.body.map((item: any) => ({
      ...item,
      itemTextAlign: selectedAlign,
    }));

    const updatedDiaryData = {
      ...newDiaryData,
      body: updatedBody,
    };

    dispatch(setNewDiaryData(updatedDiaryData));
  };

  React.useEffect(() => {
    dispatch(setFontStyleSheetOpenRef(actionSheetRef.current));
  }, [dispatch, actionSheetRef]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        addColor(item?.color);
      }}
      style={[
        styles.colorBox,
        { backgroundColor: item?.color, marginBottom: 10 },
      ]}
    />
  );

  const fontRenderItem = ({ item }: any) => (
    <Pressable
      onPress={() => {
        if (!item.isPremiumNeeded) {
          addFont(item?.fontName);
        } else {
          dispatch(setIsAskPremiumModalOpen(true));
        }
      }}
      style={styles.fontContainer}
    >
      {item?.isPremiumNeeded && (
        <EvilIcons
          style={{ position: "absolute", top: 5, right: 5 }}
          name="lock"
          size={15}
        />
      )}
      <Text style={{ fontSize: 20, fontFamily: item?.fontName }}>abcd</Text>
    </Pressable>
  );

  const renderSeparator = () => <View style={{ width: 10 }} />;
  const handlers = useScrollHandlers();

  return (
    <ActionSheet
      ref={actionSheetRef}
      snapPoints={[100]}
      initialSnapIndex={0}
      gestureEnabled={true}
      containerStyle={{ height: height / 2 }}
      onClose={() => {
        dispatch(setIsFontStyleSheetOpen(false));
      }}
    >
      {/* <NativeViewGestureHandler
        simultaneousHandlers={handlers.simultaneousHandlers}
        shouldActivateOnStart={true}
        enabled
      > */}
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                addAlign("left");
              }}
            >
              <MaterialIcons
                name="format-align-left"
                size={25}
                color={"black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                addAlign("center");
              }}
            >
              <MaterialIcons
                name="format-align-center"
                size={25}
                color={"black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                addAlign("right");
              }}
            >
              <MaterialIcons
                name="format-align-right"
                size={25}
                color={"black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                addSize(30);
              }}
            >
              <Text style={styles.hText}>H1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                addSize(20);
              }}
            >
              <Text style={styles.hText}>H2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                addSize(10);
              }}
            >
              <Text style={styles.hText}>H3</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ paddingHorizontal: 20, marginTop: 20, paddingVertical: 5 }}
          >
            <FlatList
              data={dataArray}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator}
            />
          </View>

          <FlatList
            style={{}}
            data={fontDataList}
            renderItem={fontRenderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator
            numColumns={3}
            columnWrapperStyle={{
              gap: 15,
              paddingHorizontal: 0,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            scrollEnabled={true}
            simultaneousHandlers={actionSheetRef}
          />
        </View>
      {/* </NativeViewGestureHandler> */}
    </ActionSheet>
  );
};

export default FontStyleSheet;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    alignItems: "center",
  },
  container: {
    // paddingHorizontal:10
  },
  hText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "gray",
  },
  colorBox: {
    borderColor: "white",
    borderWidth: 2,
    height: 40,
    width: 40,
    borderRadius: 50,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  fontContainer: {
    width: Dimensions.get("window").height * 0.15,
    height: Dimensions.get("window").height * 0.15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    marginBottom: Dimensions.get("window").height * 0,
    borderWidth: 0.4,
  },
});
