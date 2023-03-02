import * as React from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { apiHelper } from '../../Api';
import Loader from '../../components/Loader';
import Spacer from '../../components/spacer';
import { formatDate, windowWidth } from '../../helper';
import { TOP_TRENDING } from '../../utilitis/APIConstants';
import { COLORS } from '../../utilitis/Colors';
import { VIEWSTYLES } from '../../utilitis/Constants';

const TopTrending = () => {

    const [topTrendingNews, setTopTrendingNews] = useState<any>()
    const [isLoading, setIsLoading] = useState(true);
    const [totalData, setTotalData] = useState<any>()
    const topTrendingAPi = async () => {
        const response: any = await apiHelper(TOP_TRENDING)
        response && setTopTrendingNews(response?.articles?.list)
        setTotalData(response?.now)
        setIsLoading(false);

    }
    useEffect(() => {
        topTrendingAPi()
    }, [])

    const mapArticles = ({ item }) => {
        return (
            topTrendingNews && topTrendingNews.length > 0 &&
            <>
                <View>
                    <View style={styles.maincontainer}>
                        <ImageBackground
                            resizeMode='cover'
                            source={{ uri: item.type_article }}
                            style={styles.imageStyle} />
                        <Spacer space={3} />
                        <Text numberOfLines={2} style={styles.subTitleStyle}>{item.page}</Text>
                        <Spacer space={2} />
                        <View style={styles.subView}>
                            <Text style={styles.noOfViewStyle}>
                                {item.pageviews >= 1000 ?
                                    `${(item.pageviews / 1000).toFixed(1)}k views` : `${item.pageviews} views`}.<Text style={styles.noOfViewStyle}> {formatDate(totalData)}</Text></Text>
                        </View>
                        <View>
                            <Image
                                source={require('../../assets/ic_bookmark_White.png')}
                                style={styles.imageStyle1} />
                        </View>
                    </View>
                </View>

            </>
        )
    }

    return (
        <>
            < View style={styles.subContainer}>
                <Text style={styles.title}>Top Trending</Text>
                <Spacer space={10} />
                {isLoading ? <Loader />
                    : (
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            style={styles.container}
                            data={topTrendingNews}
                            horizontal={true}
                            renderItem={mapArticles}
                            keyExtractor={(_item, index) => index.toString()}
                        />
                    )}

            </View>

        </>
    )
}


const styles = StyleSheet.create({
    maincontainer: {
        marginLeft: 16,
        flex: 1
    },
    subView: {
        flexDirection: VIEWSTYLES.ROW
    },
    subContainer: {
        height: 255,
        backgroundColor: COLORS.WHITE,
        paddingTop: 10
    },
    imageStyle1: {
        height: 20,
        width: 20,
        bottom: 160,
        alignSelf: VIEWSTYLES.FLEXEND,
        right: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.PRIMARY_GRAY,
        marginLeft: 16,
        fontFamily: 'Playfair Display Bold'
    },
    container: {
        flex: 1
    },
    imageStyle: {
        height: 118,
        width: windowWidth * 0.6
    },
    subTitleStyle: {
        fontSize: 12,
        fontWeight: '600',
        width: windowWidth * 0.6,
        fontFamily: 'Playfair Display Bold'
    },
    noOfViewStyle: {
        fontSize: 10,
        fontFamily: 'Isento Medium',
        color: COLORS.LIGHT_GRAY
    }
})
export default TopTrending;
