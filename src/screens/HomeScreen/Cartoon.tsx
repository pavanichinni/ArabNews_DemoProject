import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { apiHelper } from '../../Api';
import Spacer from '../../components/spacer';
import { windowWidth } from '../../helper';
import { CARTOON } from '../../utilitis/APIConstants';
import { COLORS } from '../../utilitis/Colors';

const Cartoon = () => {
    const [cartoon, setCartoon] = useState<any>()


    const CartoonAPi = async () => {
        try {
            const data: any = await apiHelper(CARTOON);
            setCartoon(data)
            console.log("Cartoon", cartoon)
        } catch (error) {
            console.log("error", error)
        }


    }
    useEffect(() => {
        CartoonAPi()
    }, [])

    const renderItem = ({ item }) => {
        return (
            cartoon && cartoon.length > 0 &&
            <>
                <View>
                    <Spacer space={2} />
                    <FastImage
                        resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: item?.main_image[0] }}
                        style={styles.imageStyle} />
                    <Spacer space={5} />
                    <Text style={styles.nidStyle}>{item.nid}</Text>
                </View>
            </>
        )
    }



    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Cartoon</Text>
            </View >
            <FlatList
                style={styles.container1}
                data={cartoon}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 345,
        width: '100%',
        backgroundColor: COLORS.WHITE
    },
    container1: {
        flex: 1,
        height: 205,
        width: '100%',
        backgroundColor: COLORS.WHITE
    },
    title: {
        fontSize: 20,
        fontFamily: 'Playfair Display Bold',
        color: COLORS.PRIMARY_GRAY,
        margin: 16,

    },
    imageStyle: {
        width: windowWidth * 0.9,
        height: 221,
        marginLeft: 16,
    },
    nidStyle: {
        fontSize: 16,
        fontFamily: 'Playfair Display SemiBold',
        color: COLORS.BLACK,
        marginLeft: 16,
    }


})
export default Cartoon;
