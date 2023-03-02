import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { apiHelper } from '../../Api';
import Loader from '../../components/Loader';
import Spacer from '../../components/spacer';
import { formatDate } from '../../helper';
import { SAUDIARABIA } from '../../utilitis/APIConstants';
import { COLORS } from '../../utilitis/Colors';

const SaudiArabia = () => {

    const [saudiArabia, setSaudiArabia] = useState<any>()
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false)
    const saudhiArabiaAPi = async () => {
        const data: any = await apiHelper(SAUDIARABIA);
        setSaudiArabia(data)
        setIsLoading(false);
    }
    useEffect(() => {
        saudhiArabiaAPi()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Saudi Arabia</Text>
                <TouchableOpacity onPress={() => setShowContent(!showContent)}>
                    <Text style={styles.readMoreStyle}>Read More</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? <Loader /> :
                saudiArabia && saudiArabia.length > 0 && (showContent ? saudiArabia : saudiArabia.slice(0, 4)).map((item: any, index: any) => {
                    return (
                        < View style={index === 0 ? [styles.flexView, styles.borderWidth] : [styles.flexView1, [styles.borderWidth, (index + 1) % 4 === 0 && styles.noBorderBottom]]}>
                            <FastImage
                                resizeMode={FastImage.resizeMode.cover}
                                source={{ uri: item.main_image }}
                                style={index === 0 ? styles.maniImageStyle : styles.subImageStyle} />
                            <Spacer space={2} />
                            <View style={styles.subView} >
                                <View style={{ flex: 1 }}>
                                    <Text numberOfLines={2} style={styles.subTitle}>{item.title}</Text>
                                    <Spacer space={3} />
                                    <Text style={styles.authorName}>BY {item.author_name}<Text style={styles.dateStyle}>.{formatDate(item.field_publication_date)}</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        fontFamily: 'Playfair Display Bold',
        color: COLORS.PRIMARY_GRAY,
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'Playfair Display SemiBold',
        color: COLORS.BLACK
    },
    readMoreStyle: {
        fontSize: 14,
        fontFamily: 'Isento Medium',
        color: COLORS.BUTTON_ACTIVE,
        paddingVertical: 7,
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
    authorName: {
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
    dateStyle: {
        fontSize: 10,
        fontFamily: 'Isento Medium',
        color: COLORS.PRIMARY_GRAY
    },
    subView: {
        flex: 1,
        flexDirection: "row"
    },
    flexView: {
        flexDirection: "column",
        padding: 10
    },
    flexView1: {
        flexDirection: "row",
        padding: 10,
        alignContent: 'center',

    },
    borderWidth: {
        borderBottomWidth: 1,
        borderColor: COLORS.GRAY_OPACITY_60
    },
    noBorderBottom: {
        borderBottomWidth: 0
    }

})

export default SaudiArabia;
