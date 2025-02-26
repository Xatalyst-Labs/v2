import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  useWindowDimensions,
  Animated
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Asset } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';

const screens = [
  {
    image: require('../assets/images/onboarding-screen-1.png'),
    title: 'Project Simply',
    description: `By Xatalyst Labs`,
  },
  {
    image: require('../assets/images/onboarding-screen-2.png'),
    title: 'Real-time Feedback',
    description: `Our algorithms will catch the smallest mistakes your coach misses and correct them before they become habits.`,
  },
  {
    image: require('../assets/images/onboarding-screen-3.png'),
    title: 'Powered By AI',
    description: `Using the same formulas which guide spaceships, our algorithms will catch the smallest mistakes your coach misses and correct them before they become habits.`,
  },
  {
    image: require('../assets/images/onboarding-screen-4.png'),
    title: 'Have Fun',
    description: `Invite your friends, compete together, earn achievements, and have fun while staying healthy.`,
  },
];

const InfiniteScrollAnimation = ({ 
  items, 
  height = 175, 
  rotationDeg = '10deg', 
  duration = 10000,
  direction = 'forward', // 'forward' or 'reverse'
  style = {} // Add style prop
}) => {
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const { width } = Dimensions.get('window');

    scrollViewRef.current?.measure((x, y, contentWidth) => {
      if (direction === 'reverse') {
        Animated.timing(scrollX, {
          toValue: contentWidth - width,
          duration: 0,
          useNativeDriver: true,
        }).start();
        console.log(contentWidth - width);
      }

      const forwardAnimation = Animated.timing(scrollX, {
        toValue: contentWidth - width,
        duration,
        useNativeDriver: true,
      });

      const reverseAnimation = Animated.timing(scrollX, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      });

      const sequence = direction === 'forward'
        ? [forwardAnimation, reverseAnimation]
        : [reverseAnimation, forwardAnimation];

      Animated.loop(
        Animated.sequence(sequence)
      ).start();
    });

    return () => scrollX.stopAnimation();
  }, [duration, direction]);

  const defaultStyles = {
    transform: [{ rotate: rotationDeg }],
    height,
    marginLeft: -15,
    marginRight: -15,
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      style={[defaultStyles, style]} // Merge default and custom styles
    >
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -1],
                }),
              },
            ],
          },
        ]}
      >
        {items.map((item, index) => (
          <View key={index}>{item}</View>
        ))}
      </Animated.View>
    </ScrollView>
  );
};

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [imageAssets, setImageAssets] = useState([] as Asset[]);
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const isFirstScreen = currentScreen === 0; // Check if it's the first screen
  const isLastScreen = currentScreen === screens.length - 1;
  
  useEffect(() => {
    const loadImages = async () => {
      const assets = screens.map((screen) => {
        return Asset.fromModule(screen.image).downloadAsync();
      });
      await Promise.all(assets);
      setImageAssets(assets);
    };
    loadImages();
  }, []);

  return (
    <>
      <Image source={!isLastScreen ? screens[currentScreen].image : ""} style={styles.image} />
      {/*<></>*/}
      <StatusBar hidden />
      {
        isLastScreen ?
        <View
          style={{ flex:1, alignItems: 'center', backgroundColor: "#090909" }}
        >
          {/*<View style={{ width, height: 100, transform: [ { rotateX: '-25deg' }, { rotate: '10deg' }], borderWidth: 10, borderColor: "white" }}>*/}
          {/*</View>*/}
          <View style={{ width }}>
            <InfiniteScrollAnimation 
              items={items} 
              height={205}
              duration={7500}
              style={{ paddingTop: 25 }}
              direction="forward"
            />
            <InfiniteScrollAnimation 
              items={items2} 
              height={215}
              duration={7500}
              style={{ paddingVertical: 10 }}
              direction="reverse"
            />
            <InfiniteScrollAnimation 
              items={items3} 
              height={175}
              duration={7500}
              style={{ paddingVertical: 10 }}
              direction="forward"
            />
          </View>
          <TouchableWithoutFeedback onPress={() => { navigation.navigate("Home") }}>
            <View style={{ marginTop: 25, width, height: '30%', alignItems: 'center' }}>
              <Text
                style={[
                  styles.text,
                  styles.titleText,
                  isFirstScreen ? {fontSize: 40} : {fontSize: 24},
                  {width: width*0.7}
                ]}
              >
                {screens[currentScreen].title}
              </Text>
              <Text style={[styles.text, styles.bodyText, 
                      {width: width*0.7}]}>
                {screens[currentScreen].description}
              </Text>
              <Text
                style={[
                  styles.text,
                  styles.ctaText,
                  { opacity: 1, width: width*0.7, zIndex: 99999, position: 'absolute', bottom: 50 },
                ]}
              >
                {isLastScreen
                    ? 'Tap Anywhere To Get Started'
                    : 'Tap Anywhere To Continue'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        :
        <TouchableWithoutFeedback onPress={() => { setCurrentScreen(currentScreen + 1) }}>
          <View style={{ flex: 1 }}>
            <View
              style={{ flex: 1, alignItems: 'center' }}
            >
              <View style={{ width: '70%', height: height*0.7, position: 'absolute', top: (Dimensions.get('screen').height-75)*0.7 }}>
                <Text
                  style={[
                    styles.text,
                    styles.titleText,
                    isFirstScreen ? {fontSize: 40} : {fontSize: 24},
                  ]}
                >
                  {screens[currentScreen].title}
                </Text>
                <Text style={[styles.text, styles.bodyText]}>
                  {screens[currentScreen].description}
                </Text>
              </View>
              <Text
                style={[
                  styles.text,
                  styles.ctaText,
                  {opacity: 0.25, 
                    position: 'absolute',
                    bottom: 63},
                ]}
              >
                {isLastScreen
                    ? 'Tap Anywhere To Get Started'
                    : 'Tap Anywhere To Continue'}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      }
    </>
  );
}

const items = [
  <Image
    source={require('../assets/images/circle-achievement.png')}
    resizeMode="cover"
    style={{
      width: 175,
      height: 175
    }}
  ></Image>,
  <Image
    source={require('../assets/images/endure-card.png')}
    resizeMode="cover"
    style={{
      width: (1018/624)*175+25,
      height: 175,
      paddingLeft: 25
    }}
  ></Image>
];

const items2 = [
  <Image
    source={require('../assets/images/winner-card.png')}
    resizeMode="cover"
    style={{
      width: (1018/624)*200+25,
      height: 200,
      paddingRight: 25
    }}
  ></Image>,
  <View style={{ justifyContent: 'space-between', alignItems: 'flex-start', height: 200, paddingRight: 20 }}>
    <Image
      source={require('../assets/images/leaderboard-placement.png')}
      resizeMode="cover"
      style={{
        width: (1014/204)*70+10,
        height: 70,
      }}
    ></Image>
    <Image
      source={require('../assets/images/endure-card.png')}
      resizeMode="cover"
      style={{
        width: (1018/624)*130-10,
        height: 130,
        paddingTop: 10
      }}
    ></Image>
  </View>,
];

const items3 = [
  <Image
    source={require('../assets/images/place3-card.png')}
    resizeMode="cover"
    style={{
      width: (1018/624)*150+25,
      height: 150,
      paddingRight: 25
    }}
  ></Image>,
  <Image
    source={require('../assets/images/place2-card.png')}
    resizeMode="cover"
    style={{
      width: (1018/624)*150+25,
      height: 150,
      paddingRight: 25
    }}
  ></Image>,
];

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    backgroundColor: "#000"
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  titleText: {
    fontWeight: '600'
  },
  bodyText: {
    fontSize: 16,
    fontWeight: '300',
    marginHorizontal: 32,
    opacity: 0.75,
    marginTop: 15
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700'
  },
  item: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    marginHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  }
});