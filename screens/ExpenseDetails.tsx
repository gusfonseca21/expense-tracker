import { View, Text } from "react-native";
import { globalStyles } from "../global/styles";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../global/types";
import type { RouteProp } from "@react-navigation/native";

export default function ExpenseDetails() {
  const route = useRoute<RouteProp<RootStackParamList, "ExpenseDetails">>();

  const { title, amount, date, description, id } = route.params;

  return (
    <View style={globalStyles.pageStyle}>
      <Text>{title}</Text>
      <Text>{amount}</Text>
      <Text>{date.toString()}</Text>
      <Text>{description}</Text>
      <Text>{id}</Text>
    </View>
  );
}
