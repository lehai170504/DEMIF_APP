import { Tabs } from "expo-router";
import { House, LayoutGrid, PieChart, Trophy, User } from "lucide-react-native";
import { Platform, View } from "react-native";

export default function TabLayout() {
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
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: Platform.OS === "ios" ? 85 : 70,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#F97316",
        tabBarInactiveTintColor: "#94A3B8",
      }}
    >
      {/* 1. Library (Trái ngoài cùng) */}
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

      {/* 2. Ranking / Leaderboard (Trái trong cùng) - MỚI */}
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

      {/* 3. Home (Giữa - Nổi bật) */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: -25, // Đẩy lên tạo hiệu ứng nổi
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
                borderColor: "#ffffff",
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

      {/* 4. Stats (Phải trong cùng) */}
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

      {/* 5. Profile (Phải ngoài cùng) */}
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
