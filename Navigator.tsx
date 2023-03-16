import React from "react";
import { View, Text, Pressable } from "react-native";

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

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: palette.primary.dark,
          borderTopWidth: 0.5,
          borderTopColor: palette.white,
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
        options={{
          title: "Semana",
        }}
      />
      <Tab.Screen
        name='MonthExpenses'
        component={MonthExpenses}
        options={{
          title: "Mês",
        }}
      />
      <Tab.Screen
        name='YearExpenses'
        component={YearExpenses}
        options={{
          title: "Ano",
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          headerTitle:
            (route.name === "NewExpense" && "Nova Despesa") || "Despesas",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: palette.primary.dark,
            borderBottomWidth: 0.5,
            borderBottomColor: palette.white,
          },

          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("NewExpense")}>
              <Ionicons
                name='settings'
                size={24}
                color='black'
                style={{ marginRight: 20 }}
              />
            </Pressable>
          ),
        })}
      >
        <Stack.Screen name='Expenses' component={TabNavigator} />
        <Stack.Screen name='NewExpense' component={NewExpense} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
