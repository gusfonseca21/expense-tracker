import React from "react";
import { View, Text } from "react-native";

// Navigators
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Ícones
import Ionicons from "@expo/vector-icons/Ionicons";

// Screens
import WeekExpenses from "./screens/WeekExpenses";
import MonthExpenses from "./screens/MonthExpenses";
import YearExpenses from "./screens/YearExpenses";

// Estilos
import { globalStyles, palette } from "./global/styles";

type IconName =
  | "time"
  | "time-outline"
  | "calendar"
  | "calendar-outline"
  | "sunny"
  | "sunny-outline"
  | undefined;

const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitle:
            (route.name === "WeekExpenses" && "Despesas Semanais") ||
            (route.name === "MonthExpenses" && "Despesas Mensais") ||
            (route.name === "YearExpenses" && "Despesas Anuais") ||
            "",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: palette.primary.dark,
            borderBottomWidth: 0.5,
            borderBottomColor: palette.white,
          },
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
    </NavigationContainer>
  );
}
