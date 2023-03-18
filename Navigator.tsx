import { Pressable } from "react-native";

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

type HeaderOptions = {
  headerTitleAlign: "center" | "left" | undefined;
  headerStyle: {
    backgroundColor: string;
    borderBottomWidth: number;
    borderBottomColor: string;
  };
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
    borderBottomWidth: 0.5,
    borderBottomColor: palette.white,
  },
};

function addExpenseIcon(navigation: Navigation) {
  return (
    <Pressable onPress={() => navigation.navigate("NewExpense")}>
      <Ionicons
        name='add-outline'
        size={38}
        color='black'
        style={{ marginRight: 20 }}
      />
    </Pressable>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
          headerShown: route.name === "NewExpense",
          ...headerOptions,
        })}
      >
        <Stack.Screen name='Expenses' component={TabNavigator} />
        <Stack.Screen
          name='NewExpense'
          component={NewExpense}
          options={{ title: "Nova Despesa" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
