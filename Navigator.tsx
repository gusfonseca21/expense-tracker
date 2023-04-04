import { Pressable, View, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "@expo/vector-icons/Ionicons";

import { WeekExpenses, MonthExpenses, YearExpenses } from "./screens";

import { palette } from "./utils/styles";

import { Navigation } from "./utils/types";

import ExpenseForm from "./screens/ExpenseForm";

type HeaderOptions = {
  headerTitleAlign: "center" | "left" | undefined;
  headerStyle: {
    backgroundColor: string;
  };
  headerTintColor: string;
};

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
        onPress={() => navigation.navigate("ExpenseForm")}
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
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown:
            route.name === "NewExpense" || route.name === "ExpenseForm",
          ...headerOptions,
        })}
      >
        <Stack.Screen name='Expenses' component={TabNavigator} />
        <Stack.Screen
          name='ExpenseForm'
          component={ExpenseForm}
          options={{ title: "Editar Despesa" }}
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
