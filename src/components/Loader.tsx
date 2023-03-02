import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { VIEWSTYLES } from '../utilitis/Constants';

const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#90EE90" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: VIEWSTYLES.CENTER,
        alignItems: VIEWSTYLES.CENTER,
    },
});

export default Loader;
