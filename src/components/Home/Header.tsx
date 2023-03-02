import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { VIEWSTYLES } from '../../utilitis/Constants';
import styles from './styles';

interface Props {
    hasBack?: boolean;
}


export default function Header(props: Props) {
    const {
        hasBack = true,
    } = props;
    return (

        <>
            {hasBack && (
                <SafeAreaView style={styles.mainContainer} >
                    <View style={styles.container}>
                        <Image source={require('../../assets/ic_menu.png')} />
                        <Image source={require('../../assets/ic_logo.png')} />
                        <View style={styles.container1}>
                            <Image source={require('../../assets/ic_search.png')} />
                            <View style={styles.leftContainer}>
                                <Image source={require('../../assets/ic_bell.png')} />
                            </View>
                        </View>
                    </View>
                </SafeAreaView >
            )
            }
        </>
    )
}
