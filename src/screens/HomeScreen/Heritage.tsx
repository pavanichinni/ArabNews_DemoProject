import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { windowWidth } from '../../helper';

const Heritage = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode='contain'
                source={{ uri: "https://www.arabnews.com/sites/all/themes/narabnews/assets/img/ads/job4.jpg" }}
                style={styles.imageStyle} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageStyle: {
        height: 335,
        width: windowWidth
    }
})
export default Heritage;
