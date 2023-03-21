import { Pressable, View, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
// Navigators
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Ícones
import Ionicons from "@expo/vector-icons/Ionicons";

// Screens
import WeekExpenses from "./screens/WeekExpenses";
import MonthExpenses from "./screens/MonthExpenses";
import YearExpenses from "./screens/YearExpenses";

// Estilos
import { palette } from "./global/styles";
import NewExpense from "./screens/NewExpense";

// Tipos
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { ExpensesContext } from "./context/ExpensesContext";
import axios from "axios";
import { Expense } from "./global/types";
import { callToast } from "./helpers";
import ExpenseDetails from "./screens/ExpenseDetails";

type HeaderOptions = {
  headerTitleAlign: "center" | "left" | undefined;
  headerStyle: {
    backgroundColor: string;
  };
  headerTintColor: string;
};

type Navigation = NavigationProp<ParamListBase>;

type IconName =
  | "time"
  | "time-outline"
  | "calendar"
  | "calendar-outline"
  | "sunny"
  | "sunny-outline"
  | undefined;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const headerOptions: HeaderOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: palette.primary.dark,
  },
  headerTintColor: "#fff",
};

function addExpenseIcon(navigation: Navigation) {
  return (
    <View style={styles.addExpenseIcon}>
      <Pressable
        onPress={() => navigation.navigate("NewExpense")}
        android_ripple={{ color: palette.grey.dark }}
      >
        <Ionicons name='add-outline' size={38} color='#fff' />
      </Pressable>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: palette.primary.dark,
        },
        tabBarActiveTintColor: palette.secondary.main,
        tabBarInactiveTintColor: palette.white,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName;

          if (route.name === "WeekExpenses") {
            iconName = focused ? "time" : "time-outline";
          }

          if (route.name === "MonthExpenses") {
            iconName = focused ? "calendar" : "calendar-outline";
          }

          if (route.name === "YearExpenses") {
            iconName = focused ? "sunny" : "sunny-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name='WeekExpenses'
        component={WeekExpenses}
        options={({ navigation }) => ({
          ...headerOptions,
          title: "Semana",
          headerTitle: "Despesas semanais",
          headerRight: () => addExpenseIcon(navigation),
        })}
      />
      <Tab.Screen
        name='MonthExpenses'
        component={MonthExpenses}
        options={({ navigation }) => ({
          ...headerOptions,
          title: "Mês",
          headerTitle: "Despesas mensais",
          headerRight: () => addExpenseIcon(navigation),
        })}
      />
      <Tab.Screen
        name='YearExpenses'
        component={YearExpenses}
        options={({ navigation }) => ({
          ...headerOptions,
          title: "Ano",
          headerTitle: "Despesas anuais",
          headerRight: () => addExpenseIcon(navigation),
        })}
      />
    </Tab.Navigator>
  );
}

export default function Navigator() {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    axios
      .get(
        "https://expense-tracker-e759e-default-rtdb.firebaseio.com/expenses.json"
      )
      .then((response) => {
        const transformedData: Expense[] = Object.keys(response.data).map(
          (key) => {
            return { ...response.data[key], id: key };
          }
        );
        expensesCtx.setExpenses(transformedData);
      })
      .catch((error) =>
        callToast(
          `Houve um erro ao tentar carregar suas despesas: ${error.message}`,
          3
        )
      );
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown:
            route.name === "NewExpense" || route.name === "ExpenseDetails",
          ...headerOptions,
        })}
      >
        <Stack.Screen name='Expenses' component={TabNavigator} />
        <Stack.Screen
          name='NewExpense'
          component={NewExpense}
          options={{ title: "Nova Despesa" }}
        />
        <Stack.Screen
          name='ExpenseDetails'
          component={ExpenseDetails}
          options={{ title: "Detalhes da despesa" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  addExpenseIcon: {
    borderRadius: 80,
    overflow: "hidden",
    alignSelf: "center",
  },
});
