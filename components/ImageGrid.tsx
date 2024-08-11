import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";
import { useSelector } from "react-redux";
import * as VideoThumbnails from 'expo-video-thumbnails';

type Props = {
  images: any;
  handleSetSelectedFile: any;
  selectedFile: any;
  isVideo: boolean;
};

const ImageGrid = ({ images, handleSetSelectedFile, selectedFile, isVideo }: Props) => {
  const width = Dimensions.get("window").width;
  const [mediaUris, setMediaUris] = useState<{ [key: string]: string }>({});

  async function getMediaUri(id: string) {
    const asset = await MediaLibrary.getAssetInfoAsync(id);
    return asset.localUri || asset.uri;
  }

  

  useEffect(() => {
    async function fetchMediaUris() {
      const uris = await Promise.all(
        images.map(async (media: any) => {
          const uri =
            Platform.OS === "ios" ? await getMediaUri(media.id) : await getMediaUri(media.id);
          return { id: media.id, uri };
        })
      );
      console.log(uris);

      const urisMap: { [key: string]: string } = {};
      uris.forEach(({ id, uri }) => {
        urisMap[id] = uri;
      });
      setMediaUris(urisMap);
    }

    fetchMediaUris();
  }, [images]);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={4}
        columnWrapperStyle={{ gap: 3, marginBottom: 3 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleSetSelectedFile(item);
            }}
            style={[
              styles.mediaContainer,
              { width: width / 4 - 12, height: width / 4 - 12, borderColor: selectedFile?.id === item.id ? "#f632fa" : "#E5E4E2", borderWidth: 0.8 },
            ]}
          >
            {isVideo ? (
                <Video
                source={{ uri:item.uri }}
                style={styles.media}
                shouldPlay={false}
                isMuted={true}
              />
            ) : (
              <Image
                source={{ uri: mediaUris[item.id] }}
                style={styles.media}
              />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  mediaContainer: {
    backgroundColor: "#E5E4E2",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    width: "95%",
    height: "95%",
  },
});