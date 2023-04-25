import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp, Expense } from "../utils/types";
import { palette, shadow, textShadow } from "../utils/styles";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Ionicons from "@expo/vector-icons/Ionicons";
import CurrencyText from "./CurrencyText";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const iconSize = 20;

export default function ExpenseList({
  expenses,
}: {
  expenses: {
    title: string;
    data: Expense[];
  }[];
}) {
  const navigation = useNavigation<AppNavigationProp>();

  const { paymentOptions } = useContext(UserContext);

  const totalAmount = expenses.reduce((accumulator, category) => {
    const categoryTotal = category.data.reduce((catAccumulator, expense) => {
      return catAccumulator + expense.amount;
    }, 0);

    return accumulator + categoryTotal;
  }, 0);

  function formatDate(date: string) {
    return format(new Date(date), "d 'de' MMMM 'às' HH:mm", { locale: ptBR });
  }

  function renderPaymentMethodIcon(value: string) {
    const selectedMethod = paymentOptions.filter(
      (option) => option.value === value
    )[0];

    return (
      <Image
        source={selectedMethod?.logo}
        style={{ height: iconSize, width: iconSize }}
      />
    );
  }

  return (
    <SectionList
      showsVerticalScrollIndicator={false}
      style={styles.sectionStyle}
      ListHeaderComponent={() => (
        <CurrencyText amount={totalAmount} style={styles.totalHeaderText} />
      )}
      sections={expenses}
      renderItem={({ item }) => (
        <View style={styles.itemView}>
          <Pressable
            android_ripple={{ color: palette.grey.lighter }}
            onPress={() => navigation.navigate("ExpenseForm", item)}
            style={styles.pressableItem}
          >
            <View style={styles.leftView}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.iconsView}>
                <Ionicons
                  name='logo-usd'
                  size={iconSize}
                  color={item.paid ? "green" : "red"}
                  style={{ marginRight: -4 }}
                />
                {item.method && (
                  <View style={styles.leftView}>
                    {renderPaymentMethodIcon(item.method)}
                  </View>
                )}
                {item.description !== "" && (
                  <Ionicons
                    name='ellipsis-horizontal'
                    size={iconSize}
                    color={palette.primary.main}
                  />
                )}
              </View>
            </View>
            <CurrencyText amount={item.amount} style={styles.priceText} />
            <View style={styles.dateText}>
              <Text>{formatDate(item.date)}</Text>
            </View>
          </Pressable>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => {
        return <Text style={styles.headerSection}>{title}</Text>;
      }}
    />
  );
}

const styles = StyleSheet.create({
  sectionStyle: {
    width: "100%",
  },
  totalHeaderText: {
    marginTop: 5,
    fontSize: 25,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 3,
    ...textShadow,
  },
  itemView: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 10,
    ...shadow,
  },
  pressableItem: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    position: "relative",
  },
  leftView: { gap: 10 },
  iconsView: {
    flexDirection: "row",
    gap: 5,
  },

  itemTitle: {
    fontSize: 24,
    color: palette.primary.main,
  },
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    color: palette.primary.darker,
  },
  dateText: {
    position: "absolute",
    top: 0,
    right: "50%",
    transform: [{ translateX: 42 }],
  },
  headerSection: {
    fontSize: 20,
    backgroundColor: palette.primary.darker,
    color: "#fff",
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    fontWeight: "bold",
    padding: 1,
    textAlign: "center",
    textTransform: "capitalize",
    ...shadow,
  },
});
