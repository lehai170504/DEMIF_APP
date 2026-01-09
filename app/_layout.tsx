// 1. QUAN TRỌNG: Reanimated phải luôn nằm dòng đầu tiên
import "react-native-reanimated";
import "../src/global.css";

// Đổi tên ThemeProvider của Navigation thành NavThemeProvider để đỡ trùng tên
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

// 👇 IMPORT CONTEXT THEME BẠN VỪA TẠO
import { ThemeProvider, useAppTheme } from "@/src/context/ThemeContext";

export const unstable_settings = {
  initialRouteName: "onboarding",
};

function AppLayout() {
  const router = useRouter();

  const { colorScheme } = useAppTheme();

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;
  }, [rootNavigationState?.key]);

  return (
    <NavThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        <Stack.Screen
          name="practice/[id]"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="result/[id]"
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="upgrade"
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
            gestureEnabled: true,
            gestureDirection: "vertical",
            sheetGrabberVisible: true,
          }}
        />

        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
      </Stack>

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </NavThemeProvider>
  );
}

// --- COMPONENT CHA: Chỉ nhiệm vụ bọc Provider ---
export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}
