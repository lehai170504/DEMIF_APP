import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  Crown,
  Globe,
  LogOut,
  Shield,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  // --- GIẢ LẬP TRẠNG THÁI (Sau này lấy từ Context/Redux) ---
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Để true test cho dễ

  // 1. Cấu hình Menu có thêm đường dẫn (route)
  const MENU_ITEMS = [
    {
      icon: <User size={20} color="#64748B" />,
      label: "Thông tin cá nhân",
      route: "/settings/account", // Đường dẫn file
      requireAuth: true, // Cờ đánh dấu cần đăng nhập mới vào được
    },
    {
      icon: <Bell size={20} color="#64748B" />,
      label: "Thông báo nhắc nhở",
      route: "/settings/notifications",
    },
    {
      icon: <Globe size={20} color="#64748B" />,
      label: "Ngôn ngữ hiển thị",
      value: "Tiếng Việt",
      route: "/settings/language",
    },
    {
      icon: <Shield size={20} color="#64748B" />,
      label: "Chính sách bảo mật",
      route: "/settings/privacy",
    },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.replace("/(auth)/login");
  };

  // 2. Hàm xử lý khi nhấn vào Menu
  const handleMenuPress = (item: any) => {
    // Nếu mục này yêu cầu đăng nhập mà chưa đăng nhập -> Chuyển sang Login
    if (item.requireAuth && !isLoggedIn) {
      Alert.alert(
        "Yêu cầu đăng nhập",
        "Vui lòng đăng nhập để truy cập tính năng này.",
        [
          { text: "Hủy", style: "cancel" },
          { text: "Đăng nhập", onPress: () => router.push("/(auth)/login") },
        ]
      );
      return;
    }

    // Nếu có đường dẫn thì chuyển trang
    if (item.route) {
      router.push(item.route);
    } else {
      Alert.alert("Thông báo", "Tính năng đang phát triển!");
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-50 pt-16"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" />

      {/* --- PHẦN 1: HEADER PROFILE --- */}
      <View className="px-6 mb-8 flex-row items-center">
        {isLoggedIn ? (
          <>
            <View className="w-20 h-20 bg-white rounded-full p-1 shadow-sm mr-4">
              <Image
                source={{ uri: "https://github.com/shadcn.png" }}
                className="w-full h-full rounded-full bg-slate-200"
              />
              <View className="absolute bottom-0 right-0 bg-slate-200 px-2 py-0.5 rounded-full border-2 border-white">
                <Text className="text-slate-600 text-[10px] font-bold">
                  PRO
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-2xl font-black text-slate-800">
                Alex Nguyen
              </Text>
              <Text className="text-slate-500 font-medium">
                alex.nguyen@example.com
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/settings/account")} // Sửa nút này luôn
                className="mt-2 bg-white px-3 py-1.5 rounded-full self-start border border-slate-200 shadow-sm"
              >
                <Text className="text-xs font-bold text-slate-600">
                  Chỉnh sửa hồ sơ
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View className="w-20 h-20 bg-slate-200 rounded-full items-center justify-center mr-4 border-2 border-white shadow-sm">
              <User size={40} color="#94A3B8" />
            </View>
            <View>
              <Text className="text-2xl font-black text-slate-800">
                Khách tham quan
              </Text>
              <Text className="text-slate-500 font-medium text-xs">
                Đăng nhập để lưu tiến độ học tập
              </Text>
              <View className="flex-row mt-3 gap-3">
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/login")}
                  className="bg-orange-500 px-4 py-2 rounded-full shadow-sm shadow-orange-200"
                >
                  <Text className="text-white font-bold text-xs">
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/register")}
                  className="bg-white border border-slate-200 px-4 py-2 rounded-full"
                >
                  <Text className="text-slate-700 font-bold text-xs">
                    Đăng ký
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>

      {/* --- PHẦN 2: STATS SUMMARY --- */}
      {isLoggedIn && (
        <View className="px-6 mb-6">
          <View className="bg-slate-900 p-4 rounded-2xl flex-row justify-around">
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
        activeOpacity={0.9}
        className="mx-6 mb-8 bg-orange-500 p-4 rounded-2xl flex-row items-center justify-between shadow-lg shadow-orange-200 border border-orange-400"
      >
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4 backdrop-blur-sm">
            <Crown size={24} color="white" fill="white" />
          </View>
          <View>
            <Text className="text-white font-black text-lg">Nâng cấp PRO</Text>
            <Text className="text-orange-50 text-xs font-medium">
              Mở khóa toàn bộ 500+ bài học & AI
            </Text>
          </View>
        </View>
        <ChevronRight size={24} color="white" />
      </TouchableOpacity>

      {/* --- PHẦN 3: MENU SETTINGS --- */}
      <View className="px-6 mb-6">
        <Text className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-3">
          Cài đặt chung
        </Text>
        <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMenuPress(item)} // Gọi hàm xử lý
              className={`flex-row items-center justify-between p-4 ${
                index !== MENU_ITEMS.length - 1
                  ? "border-b border-slate-50"
                  : ""
              }`}
            >
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-slate-50 rounded-lg items-center justify-center mr-3">
                  {item.icon}
                </View>
                <Text className="text-slate-700 font-medium text-base">
                  {item.label}
                </Text>
              </View>
              <View className="flex-row items-center">
                {item.value && (
                  <Text className="text-slate-400 text-sm mr-2">
                    {item.value}
                  </Text>
                )}
                <ChevronRight size={18} color="#CBD5E1" />
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
            className="flex-row items-center justify-center p-4 rounded-2xl border border-red-100 bg-red-50 active:bg-red-100 transition-all"
          >
            <LogOut size={20} color="#EF4444" />
            <Text className="text-red-500 font-bold ml-2">Đăng xuất</Text>
          </TouchableOpacity>
        )}

        <Text className="text-center text-slate-400 text-xs mt-6">
          Version 1.0.2 (Build 2024)
        </Text>
      </View>
    </ScrollView>
  );
}
