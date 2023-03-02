import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TabButton from '../../components/TabButton';
import { VIEWSTYLES } from '../../utilitis/Constants';


const ALlNews = ['AllNews', 'Saudi Arabia', 'MiddleEast', 'World', 'Business&Economy', 'Sport', 'Lifestyle', 'Media', 'Photos', 'Videos']

const AllNews = () => {
    const [selectedItem, setSelectedItem] = useState(ALlNews[0]);

    const handlePress = (item: any) => {
        setSelectedItem(item);
    };


    return (
        <ScrollView horizontal
            showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    {ALlNews.map((item) => (
                        <TabButton
                            key={item}
                            title={item}
                            isActive={selectedItem === item}
                            onPress={() => handlePress(item)}
                        />
                    ))}

                    <View>
                    </View>
                </View>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16
    },
    subContainer: {
        flexDirection: VIEWSTYLES.ROW
    }
})

export default AllNews
