import React from 'react';
import { ScrollView, View, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Home/Header';
import { COLORS } from '../../utilitis/Colors';
import AllNews from './AllNews';
import TopNews from './TopNews';
import Spacer from '../../components/spacer';
import TopTrending from './TopTrending';
import Heritage from './Heritage';
import SpotLight from './Spotlight';
import Opinion from './Opinion';
import Cartoon from './Cartoon';
import Podcast from './Podcast';
import SaudiArabia from './SaudiArabia';
import MostPopular from './MostPopular';

const mainCmps = [
        { component: <View style={{ marginLeft: 16 }} />, type: 'cmp' },
        { type: 'spc' },
        { component: <TopNews />, type: 'cmp' },
        { type: 'spc' },
        { component: <TopTrending />, type: 'cmp' },
        { type: 'spc' },
        { component: <SpotLight />, type: 'cmp' },
        { type: 'spc' },
        { component: <Heritage />, type: 'cmp' },
        { type: 'spc' },
        { component: <Opinion />, type: 'cmp' },
        { type: 'spc' },
        { component: <Cartoon />, type: 'cmp' },
        { type: 'spc' },
        { component: <Podcast />, type: 'cmp' },
        { type: 'spc' },
        { component: <SaudiArabia />, type: 'cmp' },
        { type: 'spc' },
        { component: <MostPopular />, type: 'cmp' },
        { type: 'spc' }
];

const componentMainRender = ({ item }) => {
        if (item.type === 'cmp') {
                return item.component;
        } else {
                return <Spacer space={5} />;
        }
};
const Home = () => {
        return (
                <>
                        <View style={styles.container}>
                                <View style={styles.subContainer}>
                                        <Header hasBack={true} />
                                        <View style={styles.subView}>
                                                <AllNews />
                                        </View>
                                </View>
                                <ScrollView bounces={false}>
                                        <View style={styles.ViewContainer}>
                                                <FlatList
                                                        data={mainCmps}
                                                        renderItem={componentMainRender}
                                                        keyExtractor={(n, idx) => idx.toString()}
                                                />
                                        </View>
                                </ScrollView>
                        </View>
                </>
        )
}
const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: COLORS.BACKGROUND_COLOR
        },
        subContainer: {
                marginBottom: 10
        },
        subView: {
                marginTop: '15%'
        },
        ViewContainer: {
                width: '100%'
        },
        mainView: { marginLeft: 16 }
})
export default Home;
