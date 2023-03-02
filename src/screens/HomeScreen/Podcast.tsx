import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { apiHelper } from '../../Api';
import Loader from '../../components/Loader';
import Spacer from '../../components/spacer';
import { PODCAST } from '../../utilitis/APIConstants';
import { COLORS } from '../../utilitis/Colors';
import { VIEWSTYLES } from '../../utilitis/Constants';

const Podcast = () => {

    const [podcast, setPodcast] = useState<any>()
    const [isLoading, setIsLoading] = useState(true)

    const PodcastAPi = async () => {
        const data: any = await apiHelper(PODCAST)
        setPodcast(data)
        setIsLoading(false);
    }
    useEffect(() => {
        PodcastAPi()

    }, [])

    return (
        <View style={styles.container} >
            <Text style={styles.title}>Podcasts</Text>
            <Spacer space={6} />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                {isLoading ? <Loader /> :
                    (podcast && podcast.length > 0 && podcast.map((item: any) => {
                        return (
                            <View >
                                <View style={styles.imageView} key={item.index}>
                                    <ImageBackground
                                        resizeMode={FastImage.resizeMode.contain}
                                        source={{ uri: item?.main_image }}
                                        style={styles.imageStyle} />
                                    <View>
                                        <Text numberOfLines={1} style={styles.subTitle}>{item.title}</Text>
                                    </View>
                                    <FastImage
                                        source={require('../../assets/ic_play_circle.png')}
                                        style={styles.playIcon} />
                                </View>
                            </View>
                        )

                    })
                    )

                }
            </ScrollView>

        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        height: 249,
        width: '100%',
        marginLeft: 16

    },
    title: {
        fontSize: 20,
        fontFamily: 'Playfair Display Bold',
        color: COLORS.PRIMARY_GRAY,
        fontWeight: '600'

    },
    subContainer: {

        height: 160,
        width: '100%',
    },
    imageView: {
        height: 160,
        width: 160,
        marginBottom: 5,
        paddingLeft: 13

    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'Playfair Display',
        color: COLORS.BLACK
    },
    imageStyle: {
        height: 160,
        paddingLeft: 13
    },
    playIcon: {
        height: 32,
        width: 32,
        bottom: '43%',
        alignSelf: VIEWSTYLES.FLEXEND,
        right: 10
    }
})
export default Podcast
