import * as React from 'react';
import { useState, useEffect } from 'react';
import { Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Spacer from '../../components/spacer';
import { COLORS } from '../../utilitis/Colors';
import { formatDate, windowWidth } from '../../helper';
import axios from 'axios'
import { TOP_FOUR_NEWS, TOP_NEWS } from '../../utilitis/APIConstants';
import { VIEWSTYLES } from '../../utilitis/Constants';



const TopNews = () => {

    const [topNews, setDatatopNews] = useState([])
    const [topFourNews, setTopFourNews] = useState([])
    const [loading, setLoading] = useState(true);
    const topNewsAPi = async () => {
        const header = {};
        const gettopNewsData = axios.get(TOP_NEWS, header)
        const gettopFourNews = axios.get(TOP_FOUR_NEWS, header)
        axios.all([gettopNewsData, gettopFourNews])
            .then(
                axios.spread((...responses) => {
                    const topNewsData = responses[0].data
                    const topdata = responses[1].data
                    setDatatopNews(topNewsData)
                    setTopFourNews(topdata)
                    if (responses[0].status === 200) {
                        console.log("response1", responses[0].data)
                    }
                    if (responses[1].status === 200) {
                        console.log("resposnes2", responses[1].data[0].title
                        )
                    }
                })

            ).catch((error) => {
                console.log("Something went wrong", error.message)
            })
    }

    useEffect(() => {
        topNewsAPi()
    }, [])
    const renderItem = (item: any) => {
        return (
            <View style={styles.mainView}>
                <View >
                    <FastImage
                        resizeMode={FastImage.resizeMode.stretch}
                        source={{ uri: item.item.main_image }}
                        style={styles.imageStyle} />
                </View>
                <Spacer space={5} />
                <View style={styles.titleMainView}>
                    <View style={styles.titleSubView}>
                        <Text style={styles.textTitle}> {item?.item?.title}</Text>
                        <Spacer space={2} />
                        <Text style={styles.subText}>BY {item?.item?.author}<Text style={styles.subText}>. {formatDate(item?.item?.publicationDate)} </Text></Text>
                    </View>
                    <View style={styles.iconView}>
                        <Image source={require('../../assets/bookmark.png')} />
                    </View>

                </View>

            </View>
        )
    }

    return (

        <ScrollView style={styles.scrollView}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200} >
            <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.container}
                data={topNews}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            <View style={styles.scrollView}>
                {
                    topFourNews && topFourNews.length > 0 && topFourNews.map((item, index) => {
                        return (
                            <View style={{ marginLeft: 10 }} key={item?.id}>
                                <View>
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.stretch}
                                        source={{ uri: item?.main_image }}
                                        style={styles.imageStyle} />
                                </View>
                                <Spacer space={5} />
                                <View style={styles.titleMainView}>
                                    <View style={styles.titleSubView}>
                                        <Text numberOfLines={2} style={styles.textTitle}> {item?.title}</Text>
                                        <Spacer space={2} />
                                        <Text style={styles.subText}>{item?.author}<Text style={styles.subText}> {formatDate(item?.publicationDate)} </Text></Text>
                                    </View>
                                    <View style={styles.iconView}>
                                        <Image source={require('../../assets/bookmark.png')} />
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>

        </ScrollView >)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageStyle: {
        height: 210,
        width: windowWidth
    },
    titleMainView: {
        flexDirection: VIEWSTYLES.ROW,
        justifyContent: VIEWSTYLES.SPACEBETWEEN,
        marginBottom: 3,
        paddingLeft: 13
    },
    titleSubView: {
        width: windowWidth * .8

    },
    scrollView: {
        flexDirection: VIEWSTYLES.ROW
    },
    textTitle: {
        fontSize: 16,
        color: COLORS.BLACK,
        textAlign: 'left',
        fontWeight: '600',
        fontFamily: 'PlayfairDisplay-Regular',
        alignSelf: VIEWSTYLES.FLEXSTART,
        lineHeight: 21

    },
    subText: {
        fontSize: 10,
        color: COLORS.LIGHT_GRAY,
        fontWeight: '500',
        fontFamily: 'Isento Medium',
    },
    mainView: {
        height: 332,
        width: '100%'
    },
    iconView: {
        height: 20,
        width: 20,
        marginRight: 20
    }
})
export default TopNews;
