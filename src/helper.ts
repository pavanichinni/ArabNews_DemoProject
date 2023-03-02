import moment from "moment";
import { Dimensions } from "react-native";

export const windowWidth = Dimensions.get("window").width;

export const formatDate = (dateString: string) => {
    return moment(dateString).format("DD MMMM YYYY");
}
