import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import ActionSheet, {
  ActionSheetRef,
  useScrollHandlers,
} from "react-native-actions-sheet";
import { useDispatch } from "react-redux";
import { setMoodFontSheetRef } from "@/redux/sheetState";
import { dataArray } from "@/util/colorList";
import { fontDataList } from "@/util/fontList";
import { FlatList, NativeViewGestureHandler } from "react-native-gesture-handler";

type Props = {
  selectedShapeIndex:any;
  changeFontFamily:any;
};

const height = Dimensions.get("screen").height;
const width = Dimensions.get("window").width;

const MoodFontSheet = ({selectedShapeIndex,changeFontFamily}: Props) => {
  const handlers = useScrollHandlers();
  const dispatch = useDispatch();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  React.useEffect(() => {
    dispatch(setMoodFontSheetRef(actionSheetRef.current));
  }, [dispatch, actionSheetRef]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.colorBox,
        { backgroundColor: item?.color, marginBottom: 10 },
      ]}
    />
  );

  const fontRenderItem = ({ item }: any) => (
    <TouchableOpacity onPress={()=>{changeFontFamily(selectedShapeIndex,item?.fontName)}} style={styles.fontContainer}>
      <Text style={{ fontSize: 20, fontFamily: item?.fontName }}>abcd</Text>
    </TouchableOpacity>
  );

  const renderSeparator = () => <View style={{ width: 10 }} />;

  return (
    <ActionSheet
      ref={actionSheetRef}
      snapPoints={[100]}
      initialSnapIndex={0}
      gestureEnabled={true}
      containerStyle={{ height: height / 2 }}
    >
      <NativeViewGestureHandler
        simultaneousHandlers={handlers.simultaneousHandlers}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity>
              <Text style={styles.hText}>H1</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.hText}>H2</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.hText}>H3</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.hText}>H4</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.hText}>H5</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.hText}>H6</Text>
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
            />
          
        </View>
      </NativeViewGestureHandler>
    </ActionSheet>
  );
};

export default MoodFontSheet;

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
    width: width / 3 - 30,
    height: width / 3 - 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
    borderWidth: 0.4,
  },
});
