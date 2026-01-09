import { Tabs } from "expo-router";
import { House, LayoutGrid, PieChart, Trophy, User } from "lucide-react-native";
import { Platform, View } from "react-native";

// 1. IMPORT HOOK LẤY MÀU
import { useAppTheme } from "@/src/context/ThemeContext";

export default function TabLayout() {
  // 2. LẤY TRẠNG THÁI MÀU (Dark/Light)
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === "dark";

  // Định nghĩa màu nền TabBar (Trắng hoặc Slate-900)
  const tabBarBg = isDark ? "#0F172A" : "#ffffff";

  // Định nghĩa màu viền nút Home (Trùng màu nền TabBar)
  const homeButtonBorder = isDark ? "#0F172A" : "#ffffff";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          // 3. ÁP DỤNG MÀU NỀN ĐỘNG
          backgroundColor: tabBarBg,
          borderTopWidth: 0, // Bỏ viền trên cho đẹp
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: Platform.OS === "ios" ? 85 : 70,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#F97316", // Màu cam giữ nguyên
        tabBarInactiveTintColor: isDark ? "#64748B" : "#94A3B8", // Màu icon khi tắt (tối đi chút cho dịu)
      }}
    >
      {/* 1. Library */}
      <Tabs.Screen
        name="library"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center gap-1">
              <LayoutGrid
                size={24}
                color={color}
                strokeWidth={focused ? 2.5 : 2}
              />
              {focused && (
                <View className="w-1 h-1 bg-orange-500 rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />

      {/* 2. Ranking */}
      <Tabs.Screen
        name="ranking"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center gap-1">
              <Trophy size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
              {focused && (
                <View className="w-1 h-1 bg-orange-500 rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />

      {/* 3. Home (CẦN SỬA VIỀN) */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: -25,
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#F97316",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#F97316",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 10,
                borderWidth: 4,
                // 4. ÁP DỤNG MÀU VIỀN ĐỘNG (Để nó hòa vào nền Tabbar)
                borderColor: homeButtonBorder,
              }}
            >
              <House
                size={28}
                color="#ffffff"
                fill={focused ? "#ffffff" : "transparent"}
              />
            </View>
          ),
        }}
      />

      {/* 4. Stats */}
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center gap-1">
              <PieChart
                size={24}
                color={color}
                strokeWidth={focused ? 2.5 : 2}
              />
              {focused && (
                <View className="w-1 h-1 bg-orange-500 rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />

      {/* 5. Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center gap-1">
              <User size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
              {focused && (
                <View className="w-1 h-1 bg-orange-500 rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
