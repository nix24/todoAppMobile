import { StatusBar } from "expo-status-bar";
//import navigationContainer from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { QueryClient, QueryClientProvider } from "react-query";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppNavigator />
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
