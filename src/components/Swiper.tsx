import { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../utilitis/Colors';

const { width } = Dimensions.get('window');

const Swiper = ({ data, interval = 5500 }) => {
  const svRef = useRef();
  const [idx, setidx] = useState(0);

  const slideD = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const intId = setInterval(() => {
      const nextIndex = (idx + 1) % data.length;
      svRef.current.scrollTo({ x: nextIndex * width });
      setidx(nextIndex);
    }, interval);

    return () => clearInterval(intId);
  }, [idx]);

  useEffect(() => {
    Animated.timing(slideD, {
      toValue: (idx + 1) % data.length,
      duration: interval,
      useNativeDriver: false,
    }).start();
  }, [idx]);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / width);
    setidx(index);
  };

  const handleDotPress = (index) => {
    svRef.current.scrollTo({ x: index * width });
    setidx(index);
    slideD.setValue(index);
  };
  const swiperHeight = 300
  const renderItem = (item, index) => {
    if (typeof item === 'string') {
      return (
        <View key={index} style={[styles.slide, { height: swiperHeight }]}>
          <Text style={styles.text}>{item}</Text>
        </View>
      );
    } else if (typeof item === 'object' && item.type === 'comp') {
      return (
        <View key={index} style={[styles.slide, { height: swiperHeight }]}>
          <item.component />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={svRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data.map((item, index) => renderItem(item, index))}
      </ScrollView>
      <View style={styles.pagination}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              idx === index ? styles.activeDot : null,
            ]}
            onPress={() => handleDotPress(index)}
          >
            {idx === index && (
              <Animated.View
                style={[
                  styles.activeDotColor,
                  {
                    width: slideD.interpolate({
                      inputRange: [idx, (idx + 1) % data.length].sort(),
                      outputRange: idx === data.length - 1 ? ['100%', '0%'] : ['0%', '100%']
                    })
                  },
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 320,
    display: 'flex',
    flexDirection: "column"
  },
  slide: {
    width,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    left: 16
  },
  dot: {
    width: 64,
    height: 2,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#ddd',
  },
  activeDotColor: {
    height: 2,
    backgroundColor: COLORS.BUTTON_ACTIVE,
    borderRadius: 5,
  },
})

export default Swiper;