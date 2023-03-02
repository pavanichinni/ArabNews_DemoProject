import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/HomeScreen/Home';
import BookMarks from '../screens/BookMarks/BookMarks';
import Podcasts from '../screens/Podcasts/Podcasts';
import Trending from '../screens/Trending/Trending';
import Videos from '../screens/Videos/Videos';
import { COLORS } from '../utilitis/Colors';
import { useRef } from 'react'
import { Text, View, Image, StyleSheet, Animated, Platform } from 'react-native'
import { windowWidth } from '../helper';
import { VIEWSTYLES } from '../utilitis/Constants';
const Tab = createBottomTabNavigator();

const BottonBar = () => {

    const taboffsetValue = useRef(new Animated.Value(0)).current

    const getWidth = () => {
        let width = windowWidth + 5
        return width / 5
    }

    return (
        <>
            <Tab.Navigator screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    width: '100%',
                    backgroundColor: COLORS.WHITE,
                    elevation: 8,
                    alignItems: VIEWSTYLES.CENTER,
                    alignContent: VIEWSTYLES.CENTER,
                    justifyContent: VIEWSTYLES.CENTER,
                    borderWidth: 2,
                    borderTopColor: COLORS.WHITE


                }
            }}>
                <Tab.Screen name="Home" component={Home}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabView}>
                                <Image source={require('../assets/ic_home.png')}
                                    resizeMode='contain'
                                    style={styles.imageStyle} />
                                <Text style={styles.textStyle}>Home </Text>
                            </View>
                        )
                    }} listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            Animated.spring(taboffsetValue, {
                                toValue: 0,
                                useNativeDriver: true
                            }).start();
                        }
                    })} />
                < Tab.Screen name="Trending" component={Trending}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabView}>
                                <Image source={require('../assets/Trending.png')}
                                    resizeMode='contain'
                                    style={styles.imageStyle} />
                                <Text style={styles.textStyle}>Trending </Text>
                            </View>
                        )
                    }} listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            Animated.spring(taboffsetValue, {
                                toValue: getWidth(),
                                useNativeDriver: true
                            }).start();
                        }
                    })} />
                < Tab.Screen name="BookMarks" component={BookMarks}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabView}>
                                <Image source={require('../assets/bookmark.png')}
                                    resizeMode='contain'
                                    style={styles.imageStyle} />
                                <Text style={styles.textStyle}>BookMarks </Text>
                            </View>
                        )
                    }} listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            Animated.spring(taboffsetValue, {
                                toValue: getWidth() * 2,
                                useNativeDriver: true
                            }).start();
                        }
                    })} />
                < Tab.Screen name="Podcast" component={Podcasts}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabView}>
                                <Image source={require('../assets/podcast.png')}
                                    resizeMode='contain'
                                    style={styles.imageStyle} />
                                <Text style={styles.textStyle}>Podcast </Text>
                            </View>
                        )
                    }} listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            Animated.spring(taboffsetValue, {
                                toValue: getWidth() * 3,
                                useNativeDriver: true
                            }).start();
                        }
                    })} />
                < Tab.Screen name="Videos" component={Videos}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabView}>
                                <Image source={require('../assets/video.png')}
                                    resizeMode='contain'
                                    style={styles.imageStyles} />
                                <Text style={styles.textStyle}>videos </Text>
                            </View>
                        )
                    }} listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            Animated.spring(taboffsetValue, {
                                toValue: getWidth() * 4,
                                useNativeDriver: true
                            }).start();
                        }
                    })} />
            </Tab.Navigator >
            <Animated.View style={{
                width: getWidth() - 35, height: 2, backgroundColor: COLORS.BUTTON_ACTIVE, position: 'absolute', bottom: 76, left: 16, borderRadius: 20, borderWidth: 2,
                transform: [
                    { translateX: taboffsetValue }
                ]
            }}>

            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        opacity: 0.5,
        fontSize: 11,
        fontWeight: 500,
        color: COLORS.PRIMARY_GRAY,
        // fontFamily: FONTS.FONT_MEDIUM

    },
    tabView: {
        alignItems: VIEWSTYLES.CENTER,
        justifyContent: VIEWSTYLES.CENTER,
        top: Platform.OS === 'IOS' ? '20%' : 0
    },
    imageStyle: {
        width: 24,
        height: 24,

    },
})
export default BottonBar;