import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { apiHelper } from '../../Api';
import Loader from '../../components/Loader';
import Spacer from '../../components/spacer';
import { formatDate } from '../../helper';
import { SPOT_LIGHT } from '../../utilitis/APIConstants';
import { COLORS } from '../../utilitis/Colors';
import { VIEWSTYLES } from '../../utilitis/Constants';


const SpotLight = () => {
    const [spotLight, setSpotLight] = useState<any>()
    const [fetchDta, setFetchDta] = useState<any>()
    const [isLoading, setIsLoading] = useState(false);
    const [showContent, setShowContent] = useState(false)


    const fetchAPi = async () => {
        const response: any = await apiHelper(SPOT_LIGHT)
        response && setSpotLight(response[0].tags[0].tid)
    }
    const fetchTotalData = async () => {
        const header = {};
        const response: any = await fetch(`https://www.arabnews.com/api/v/3/api-article-section?api-key=UL3R89LNpZ1oYGY3QyBiYg&tid=${spotLight}`, header);
        let data = await response.json();
        setFetchDta(data)
        setIsLoading(false);

    }
    useEffect(() => {
        fetchAPi()
    }, [])


    useEffect(
        () => {
            if (spotLight) {
                fetchTotalData()
                fetchDta && setIsLoading(true);
            }
        }, [spotLight]
    )
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Spotlight</Text>
                <TouchableOpacity onPress={() => setShowContent(!showContent)}>
                    <Text style={styles.readMoreStyle}>Read More</Text>
                </TouchableOpacity>
            </View>
            <Spacer space={5} />
            {isLoading ? <Loader /> :
                fetchDta && fetchDta.length > 0 && (showContent ? fetchDta : fetchDta.slice(0, 4)).map((item: any, index: any) => {

                    return (
                        < View style={index === 0 ? [styles.flexView, styles.borderWidth] : [styles.flexView1, [styles.borderWidth, (index + 1) % 4 === 0 && styles.noBorderBottom]]}>
                            <FastImage
                                resizeMode={FastImage.resizeMode.cover}
                                source={{ uri: item.main_image }}
                                style={index === 0 ? styles.maniImageStyle : styles.subImageStyle} />
                            <Spacer space={2} />
                            <View style={styles.subContainer} >
                                <View style={styles.textView}>
                                    <Text numberOfLines={2} style={styles.subTitle}>{item.title}</Text>
                                    <Spacer space={3} />
                                    <Text style={styles.authorName}>BY {item.author_name} <Text style={styles.dateStyle}>.{formatDate(item.field_publication_date)}</Text>
                                    </Text>
                                </View>
                                <Image source={require('../../assets/bookmark.png')}
                                    style={styles.iconStyle}
                                />
                            </View>
                        </View>
                    )


                }

                )
            }
        </View >

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16
    },
    titleContainer: {
        flexDirection: VIEWSTYLES.ROW,
        justifyContent: VIEWSTYLES.SPACEBETWEEN
    },
    subContainer: {
        flex: 1,
        flexDirection: VIEWSTYLES.ROW
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'Playfair Display SemiBold',
        color: COLORS.BLACK

    },
    authorName: {
        fontSize: 10,
        fontFamily: 'Isento Medium',
        color: COLORS.PRIMARY_GRAY
    },
    title: {
        fontSize: 20,
        fontFamily: 'Playfair Display Bold',
        color: COLORS.PRIMARY_GRAY
    },

    readMoreStyle: {
        fontSize: 14,
        fontFamily: 'Isento Medium',
        color: COLORS.BUTTON_ACTIVE,
        paddingVertical: 4,
        paddingHorizontal: 10

    },
    maniImageStyle: {
        width: '95%',
        height: 193,

    },
    subImageStyle: {
        height: 70,
        width: 120,

    },
    dateStyle: {
        fontSize: 10,
        fontFamily: 'Isento Medium',
        color: COLORS.PRIMARY_GRAY
    },
    iconStyle: {
        height: 20,
        width: 20,
        marginTop: 5,
        paddingHorizontal: 12,
        marginRight: 13,
        marginLeft: 7,
        paddingLeft: 6
    },
    textView: {
        flex: 1
    },
    flexView: {
        flexDirection: VIEWSTYLES.COLUMN,
        padding: 10
    },
    flexView1: {
        flexDirection: VIEWSTYLES.ROW,
        padding: 10,
        alignContent: VIEWSTYLES.CENTER,

    },
    borderWidth: {
        borderBottomWidth: 1,
        borderColor: COLORS.GRAY_OPACITY_60
    },
    noBorderBottom: {
        borderBottomWidth: 0
    }

})

export default SpotLight;
