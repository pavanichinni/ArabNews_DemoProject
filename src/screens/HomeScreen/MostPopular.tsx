import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Loader from '../../components/Loader';
import Spacer from '../../components/spacer';
import TabButton from '../../components/TabButton';
import { formatDate } from '../../helper';
import { MOST_READ_DAY, MOST_READ_MONTH, MOST_READ_WEEK, MOST_SHARED_DAY, MOST_SHARED_MONTH, MOST_SHARED_WEEK } from '../../utilitis/APIConstants';
import { COLORS } from '../../utilitis/Colors';
import { VIEWSTYLES } from '../../utilitis/Constants';


const MostPopular = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedTimeframe, setSelectedTimeframe] = useState(null);
    const [apiData, setApiData] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [selectedTypePop, setSelectecTypePop] = useState({
        parent: "read",
        child: "day"
    })

    const handleButtonPress = (buttonName: any) => {
        setSelectedButton(buttonName);
        setSelectecTypePop({
            parent: (buttonName).toLowerCase(),
            child: "day"
        })
    };

    const handleTimeframePress = (timeframe: any) => {
        setSelectecTypePop({
            ...selectedTypePop,
            child: timeframe.toLowerCase()
        })
        setSelectedTimeframe(timeframe);
        // Call API here based on selected button and timeframe
        if (selectedButton === 'Read') {
            switch (timeframe) {
                case 'Day':
                    fetch(MOST_READ_DAY)
                        .then(response => response.json())
                        .then(data => setApiData(data))
                        .catch(error => console.error(error));
                    setIsLoading(false);
                    break;
                case 'Week':
                    fetch(MOST_READ_WEEK)
                        .then(response => response.json())
                        .then(data => setApiData(data))
                        .catch(error => console.error(error));
                    setIsLoading(false);
                    break;
                case 'Month':
                    fetch(MOST_READ_MONTH)
                        .then(response => response.json())
                        .then(data => setApiData(data))
                        .catch(error => console.error(error));
                    setIsLoading(false);
                    break;
                default:
                    break;
            }
        } else if (selectedButton === 'Share') {
            switch (timeframe) {
                case 'Day':
                    fetch(MOST_SHARED_DAY)
                        .then(response => response.json())
                        .then(data => setApiData(data))
                        .catch(error => console.error(error));
                    setIsLoading(false);
                    break;

                case 'Week':
                    fetch(MOST_SHARED_WEEK)
                        .then(response => response.json())
                        .then(data => setApiData(data))
                        .catch(error => console.error(error));
                    setIsLoading(false);
                    break;
                case 'Month':
                    fetch(MOST_SHARED_MONTH)
                        .then(response => response.json())
                        .then(data => setApiData(data))
                        .catch(error => console.error(error));
                    setIsLoading(false);
                    break;
                default:
                    break;
            }
        }
    };


    const readRenderItem = ({ item, index }) => (
        < View >
            <View style={[styles.renderView, [
                styles.renderWidth,
                index === apiData?.length - 1 && styles.noBorderBottom
            ]]}>
                <Image source={{ uri: item.imageUrl }} style={styles.imageStyle} />
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={2} style={styles.subTitleStyle}>{item.title}</Text>
                    <Spacer space={2} />
                    <Text numberOfLines={2} style={styles.authorStyle}>BY {item?.author}<Text style={styles.dateStyle}>.{formatDate(item.field_publication_date)}</Text></Text>
                </View>
                <Image source={require("../../assets/ic_bookmark.png")} style={styles.iconStyle} />
            </View>
        </View >
    );

    const readRenderItem2 = ({ item, index }) => (
        apiData &&
        < View >
            <View style={[styles.renderView, [
                styles.renderWidth,
                index === apiData?.articles?.list?.length - 1 && styles.noBorderBottom
            ]]}>
                <Image resizeMode='cover' source={{
                    uri: item.type_article
                }} style={
                    styles.imageStyle} />
                <View style={styles.subView}>
                    <Text numberOfLines={2} style={styles.subTitleStyle}>{item?.page}</Text>
                    <Text numberOfLines={2} style={styles.authorStyle}>BY {item?.author}</Text>
                </View>
                <Image source={require("../../assets/ic_bookmark.png")} style={styles.iconStyle} />
            </View>
        </View >
    )
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Most Popular</Text>
            <Spacer space={10} />
            <View style={styles.container}>
                < TouchableOpacity style={selectedTypePop.parent === "read" ? styles.activeButtonStyle : styles.inActiveButtonStyle}
                    onPress={() => handleButtonPress('Read')} >
                    <Text style={selectedTypePop.parent === "read" ? styles.activeTextStyle : styles.inActiveTextStyle} >Read</Text>
                </TouchableOpacity>
                < TouchableOpacity style={selectedTypePop.parent === "share" ? styles.activeButtonStyle : styles.inActiveButtonStyle}
                    onPress={() => handleButtonPress('Share')} >
                    <Text style={selectedTypePop.parent === "share" ? styles.activeTextStyle : styles.inActiveTextStyle} >Share</Text>
                </TouchableOpacity>
            </View>
            <Spacer space={6} />
            <View style={styles.subContainer}>
                <TabButton isActive={selectedTypePop.child === "day"} title="Day" onPress={() => handleTimeframePress('Day')} />
                <TabButton isActive={selectedTypePop.child === "week"} title="Week" onPress={() => handleTimeframePress('Week')} />
                <TabButton isActive={selectedTypePop.child === "month"} title="Month" onPress={() => handleTimeframePress('Month')} />
            </View>
            {
                isLoading ? <Loader /> : apiData &&
                    <>
                        < View style={styles.apiDataContainer}>
                            <FlatList
                                data={selectedButton === "Read" ? apiData : apiData?.articles?.list}
                                renderItem={selectedButton === "Read" ? readRenderItem : readRenderItem2}

                            />
                        </View>
                    </>
            }

        </View >
    );
};

const styles = StyleSheet.create({
    apiDataContainer: {
        padding: 10,
        backgroundColor: '#EEE',
        marginVertical: 10,
        borderRadius: 5,
    },
    apiDataText: {
        fontSize: 16,
    },
    mainContainer: {
        flex: 1,
        marginLeft: 16
    },
    title: {
        fontFamily: "Playfair Display Bold",
        fontSize: 20,
        color: COLORS.PRIMARY_GRAY
    },
    imageStyle: {
        height: 68,
        width: 120,
        marginRight: 10
    },
    renderView: {
        flexDirection: VIEWSTYLES.ROW,
        alignItems: VIEWSTYLES.CENTER,
        padding: 10,
    },
    renderWidth: {
        borderBottomWidth: 1,
        borderColor: COLORS.GRAY_OPACITY_60
    },
    noBorderBottom: {
        borderBottomWidth: 0
    },
    subTitleStyle: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontFamily: 'Playfair Display SemiBold',
        paddingBottom: 5

    },
    subView: {
        flex: 1
    },
    iconStyle: {
        height: 20,
        width: 20,
        marginBottom: 30,
        paddingHorizontal: 10,
        marginRight: 13,
        marginLeft: 10,
        paddingLeft: 6
    },
    activeButtonStyle: {
        paddingVertical: 4,
        borderBottomWidth: 2,
        borderBottomColor: "#D85229",
        width: "50%",
    },
    inActiveButtonStyle: {
        paddingVertical: 4,
        borderBottomColor: COLORS.GRAY_OPACITY_60,
        borderBottomWidth: 1,
        width: "50%"
    },
    activeTextStyle: {
        color: "#D85229",
        textAlign: VIEWSTYLES.CENTER,
        fontFamily: 'Isento Medium',
        fontSize: 14
    },
    inActiveTextStyle: {
        color: "#000",
        textAlign: VIEWSTYLES.CENTER,
        fontFamily: 'Isento Medium',
        fontSize: 14
    },
    subContainer: {
        flexDirection: VIEWSTYLES.ROW,
        justifyContent: VIEWSTYLES.SPACEEVENLY

    },
    container: {
        flexDirection: VIEWSTYLES.ROW,
        marginBottom: 10,
    },
    authorStyle: {
        fontSize: 10,
        fontFamily: 'Isento Medium',
        color: COLORS.PRIMARY_GRAY
    },
    dateStyle: {
        fontSize: 10,
        fontFamily: 'Isento Medium',
        color: COLORS.PRIMARY_GRAY
    }

});

export default MostPopular;
