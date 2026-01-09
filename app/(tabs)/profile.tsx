import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  Globe,
  LogOut,
  Moon,
  Shield,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  LayoutAnimation, // 1. Import LayoutAnimation
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  UIManager, // 2. Import UIManager cho Android
  View,
} from "react-native";

// Import Hook
import { useAppTheme } from "@/src/context/ThemeContext";

// 3. Kích hoạt Animation cho Android (Bắt buộc)
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ProfileScreen() {
  const router = useRouter();
  const { colorScheme, toggleTheme } = useAppTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // 4. Hàm xử lý bật tắt Theme với hiệu ứng mượt
  const handleThemeChange = () => {
    // Cấu hình animation: easeInEaseOut giúp chuyển màu tự nhiên
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleTheme();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.replace("/(auth)/login");
  };

  const MENU_ITEMS = [
    {
      icon: (
        <User
          size={20}
          color={colorScheme === "dark" ? "#94A3B8" : "#64748B"}
        />
      ),
      label: "Thông tin cá nhân",
      route: "/settings/account",
      requireAuth: true,
    },
    {
      icon: (
        <Bell
          size={20}
          color={colorScheme === "dark" ? "#94A3B8" : "#64748B"}
        />
      ),
      label: "Thông báo nhắc nhở",
      route: "/settings/notifications",
    },
    {
      icon: (
        <Moon
          size={20}
          color={colorScheme === "dark" ? "#94A3B8" : "#64748B"}
        />
      ),
      label: "Chế độ tối",
      isSwitch: true,
    },
    {
      icon: (
        <Globe
          size={20}
          color={colorScheme === "dark" ? "#94A3B8" : "#64748B"}
        />
      ),
      label: "Ngôn ngữ hiển thị",
      value: "Tiếng Việt",
      route: "/settings/language",
    },
    {
      icon: (
        <Shield
          size={20}
          color={colorScheme === "dark" ? "#94A3B8" : "#64748B"}
        />
      ),
      label: "Chính sách bảo mật",
      route: "/settings/privacy",
    },
  ];

  const handleMenuPress = (item: any) => {
    if (item.isSwitch) return;

    if (item.requireAuth && !isLoggedIn) {
      Alert.alert("Yêu cầu đăng nhập", "Vui lòng đăng nhập...", [
        { text: "Hủy", style: "cancel" },
        { text: "Đăng nhập", onPress: () => router.push("/(auth)/login") },
      ]);
      return;
    }
    if (item.route) router.push(item.route);
    else Alert.alert("Thông báo", "Tính năng đang phát triển!");
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-50 dark:bg-slate-900 pt-16"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      {/* --- HEADER --- */}
      <View className="px-6 mb-8 flex-row items-center">
        {isLoggedIn ? (
          <>
            <View className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm mr-4">
              <Image
                source={{ uri: "https://github.com/shadcn.png" }}
                className="w-full h-full rounded-full bg-slate-200"
              />
              <View className="absolute bottom-0 right-0 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full border-2 border-white dark:border-slate-800">
                <Text className="text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                  PRO
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-2xl font-black text-slate-800 dark:text-white">
                Alex Nguyen
              </Text>
              <Text className="text-slate-500 dark:text-slate-400 font-medium">
                alex.nguyen@example.com
              </Text>
              <TouchableOpacity
                onPress={() => handleMenuPress(MENU_ITEMS[0])}
                className="mt-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full self-start border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <Text className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Chỉnh sửa hồ sơ
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View>
            <Text className="dark:text-white">Khách</Text>
          </View>
        )}
      </View>

      {/* --- STATS --- */}
      {isLoggedIn && (
        <View className="px-6 mb-6">
          <View className="bg-slate-900 dark:bg-slate-800 p-4 rounded-2xl flex-row justify-around border border-slate-800 dark:border-slate-700">
            <View className="items-center">
              <Text className="text-orange-500 font-bold text-xl">12</Text>
              <Text className="text-slate-400 text-xs">Streak</Text>
            </View>
            <View className="w-[1px] bg-slate-700 h-full" />
            <View className="items-center">
              <Text className="text-white font-bold text-xl">482</Text>
              <Text className="text-slate-400 text-xs">Từ vựng</Text>
            </View>
            <View className="w-[1px] bg-slate-700 h-full" />
            <View className="items-center">
              <Text className="text-green-400 font-bold text-xl">B2</Text>
              <Text className="text-slate-400 text-xs">Level</Text>
            </View>
          </View>
        </View>
      )}

      {/* --- PREMIUM BANNER --- */}
      <TouchableOpacity
        onPress={() => router.push("/upgrade")}
        className="mx-6 mb-8 bg-orange-500 p-4 rounded-2xl flex-row items-center justify-between shadow-lg shadow-orange-200 dark:shadow-none border border-orange-400"
      >
        <View>
          <Text className="text-white font-bold">Nâng cấp PRO</Text>
        </View>
        <ChevronRight size={24} color="white" />
      </TouchableOpacity>

      {/* --- MENU LIST --- */}
      <View className="px-6 mb-6">
        <Text className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">
          Cài đặt chung
        </Text>

        <View className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMenuPress(item)}
              disabled={item.isSwitch}
              className={`flex-row items-center justify-between p-4 ${
                index !== MENU_ITEMS.length - 1
                  ? "border-b border-slate-50 dark:border-slate-700"
                  : ""
              }`}
            >
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-slate-50 dark:bg-slate-700 rounded-lg items-center justify-center mr-3">
                  {item.icon}
                </View>
                <Text className="text-slate-700 dark:text-slate-200 font-medium text-base">
                  {item.label}
                </Text>
              </View>

              <View className="flex-row items-center">
                {item.isSwitch ? (
                  // 5. Gắn hàm handleThemeChange vào Switch
                  <Switch
                    value={colorScheme === "dark"}
                    onValueChange={handleThemeChange}
                    trackColor={{ false: "#E2E8F0", true: "#F97316" }}
                    thumbColor={"#FFFFFF"}
                  />
                ) : (
                  <>
                    {item.value && (
                      <Text className="text-slate-400 text-sm mr-2">
                        {item.value}
                      </Text>
                    )}
                    <ChevronRight size={18} color="#94A3B8" />
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* --- FOOTER --- */}
      <View className="px-6 pb-32">
        {isLoggedIn && (
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-center p-4 rounded-2xl border border-red-100 bg-red-50 dark:bg-red-900/20 dark:border-red-900/50"
          >
            <LogOut size={20} color="#EF4444" />
            <Text className="text-red-500 font-bold ml-2">Đăng xuất</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
