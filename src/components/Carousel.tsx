import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ViewToken,
  Text,
} from "react-native";

interface ImageItem {
  uri: string;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const images: ImageItem[] = [
    { uri: "https://picsum.photos/id/237/200/300" },
    { uri: "https://fastly.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI" },
    { uri: "https://fastly.picsum.photos/id/169/2500/1662.jpg?hmac=3DBeyQbiPxO88hBdhIuFPbvy2ff7cm9vmnq8lPIL9Ug" },
  ];

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  );

  const renderItem = ({ item }: { item: ImageItem }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.uri }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  const renderDotIndicators = () => {
    return (
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? "#000" : "#ccc" },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 50,
          }}
          initialNumToRender={1}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
        />
      </View>
      {renderDotIndicators()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    position: "relative",
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH, // 정사각형 높이
  },
  itemContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH, // 정사각형 높이
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default CustomCarousel;
