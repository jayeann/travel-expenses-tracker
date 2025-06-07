import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </Provider>
  );
}
