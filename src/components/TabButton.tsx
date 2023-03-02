import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { COLORS } from '../utilitis/Colors';
import { VIEWSTYLES } from '../utilitis/Constants';


const TabButton = ({ title, isActive, onPress }: any) => {
    return (
        <TouchableOpacity
            style={[styles.button, isActive ? styles.button : styles.inActiveButton]}
            onPress={onPress}
        >
            <Text style={[styles.Activetitle, isActive ? styles.Activetitle : styles.InActivetitle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    Activetitle: {
        fontSize: 14,
        textAlign: VIEWSTYLES.CENTER,
        color: COLORS.WHITE,
        fontFamily: 'Isento Medium',
        lineHeight: 17
    },

    InActivetitle: {
        fontSize: 14,
        textAlign: 'center',
        color: COLORS.INACTIVE_TITLE,
        fontFamily: 'Isento Medium',
        lineHeight: 17,
    },
    button: {
        paddingVertical: 8,
        borderColor: COLORS.WHITE,
        borderWidth: 1,
        marginRight: 10,
        backgroundColor: COLORS.BUTTON_ACTIVE,
        paddingHorizontal: 18,
        alignContent: VIEWSTYLES.CENTER

    },
    inActiveButton: {
        paddingVertical: 8,
        borderColor: COLORS.BUTTON_INACTIVE,
        borderWidth: 1,
        marginRight: 10,
        backgroundColor: COLORS.BUTTON_INACTIVE,
        paddingHorizontal: 18,
        alignContent: VIEWSTYLES.CENTER,

    }

})
export default TabButton;