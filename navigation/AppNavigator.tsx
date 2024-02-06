import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ViewTodos from "../screens/ViewTodos";
import CreateTodos from "../screens/CreateTodos";
import DeleteTodos from "../screens/DeleteTodos";
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "View Todos") {
            iconName = focused ? "library" : "library-outline";
          } else if (route.name === "Create Todo") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Delete Todo") {
            iconName = focused ? "trash" : "trash-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="View Todos" component={ViewTodos} />
      <Tab.Screen name="Create Todo" component={CreateTodos} />
      <Tab.Screen name="Delete Todo" component={DeleteTodos} />
    </Tab.Navigator>
  );
}
