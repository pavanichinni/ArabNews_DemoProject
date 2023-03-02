import { StyleSheet } from "react-native";
import { COLORS } from "../../utilitis/Colors";
import { VIEWSTYLES } from "../../utilitis/Constants";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND_COLOR,
    },
    container: {
        marginTop: '3%',
        justifyContent: VIEWSTYLES.SPACEBETWEEN,
        flexDirection: VIEWSTYLES.ROW,
        marginHorizontal: 17

    },
    burgerMenu: {
        flexDirection: VIEWSTYLES.ROW,
        justifyContent: VIEWSTYLES.FLEXSTART,
        alignItems: VIEWSTYLES.FLEXSTART
    },
    logoContainer: {
        flexDirection: VIEWSTYLES.ROW,
        alignContent: VIEWSTYLES.CENTER,
        justifyContent: VIEWSTYLES.CENTER,
        alignItems: VIEWSTYLES.CENTER
    },
    container1: {
        flexDirection: VIEWSTYLES.ROW,

    },
    leftContainer: { paddingLeft: 15 }
});
export default styles;
