import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { apiHelper } from '../../Api';
import Spacer from '../../components/spacer';
import { formatDate } from '../../helper';
import { OPINION } from '../../utilitis/APIConstants';
import { COLORS } from '../../utilitis/Colors';

const Opinion = () => {
    const [opinion, setOpinion] = useState<any>()
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false)


    const opinionAPi = async () => {
        try {
            const data: any = await apiHelper(OPINION);
            setOpinion(data)
            setIsLoading(false);


        } catch (error) {
            console.log("error", error)

        }


    }
    useEffect(() => {
        opinionAPi()
    }, [])



    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.title}>Opinion</Text>
                <TouchableOpacity onPress={() => setShowContent(!showContent)}>
                    <Text style={styles.readMoreStyle}>Read More</Text>
                </TouchableOpacity>
            </View >
            <ScrollView>
                {
                    opinion && opinion.length > 0 && (showContent ? opinion : opinion.slice(0, 4)).map((item: any, index: any) => {
                        return (
                            <View style={[styles.subContainer, (index + 1) % 4 === 0 || index === opinion.length - 1 ? styles.noBorderBottom : null]} key={item.index} >
                                <Spacer space={10} />
                                <View style={styles.subView}>
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.cover}
                                        source={{ uri: item.author_image }}
                                        style={styles.imageStyle} />
                                    <View style={styles.authorView}>
                                        <Text style={styles.author}>{item.author_name}</Text>
                                        <Spacer space={2} />
                                        <Text numberOfLines={2} style={styles.subtitle}>{item.title}</Text>
                                        <Spacer space={3} />
                                        <Text style={styles.publicationDate}>{formatDate(item.publicationDate)}</Text>
                                        <Spacer space={9} />

                                    </View>
                                </View>
                            </View>)
                    })
                }
            </ScrollView>

        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 16,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Playfair Display Bold',
        color: COLORS.PRIMARY_GRAY
    },
    readMoreStyle: {
        fontSize: 12,
        fontFamily: 'Isento Medium',
        color: COLORS.BUTTON_ACTIVE,
        marginRight: 18,
        paddingTop: 8
        // paddingVertical: 8
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageStyle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.GRAY_OPACITY_60,
        backgroundColor: COLORS.WHITE

    },
    noBorderBottom: {
        borderBottomWidth: 0
    },
    subView: {
        flexDirection: 'row'
    },
    author: {
        fontSize: 13,
        color: COLORS.ORANGE,
        fontFamily: 'Isento Medium',
        marginRight: 10,

    },
    subtitle: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontFamily: 'Playfair Display SemiBold',
    },
    publicationDate: {
        fontSize: 10,
        color: COLORS.LIGHT_GRAY,
        fontFamily: 'Isento Medium',
        lineHeight: 12,
    },
    subContainer: {
        borderBottomWidth: 2,
        borderColor: '#CCCCCC33'
    },
    authorView: {
        paddingHorizontal: 15,
        width: '75%'
    }

})
export default Opinion;
