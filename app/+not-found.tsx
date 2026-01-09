import { Link, Stack } from "expo-router";
import { FileQuestion, Home } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// 1. IMPORT HOOK LẤY MÀU
import { useAppTheme } from "@/src/context/ThemeContext";

export default function NotFoundScreen() {
  // 2. LẤY TRẠNG THÁI THEME
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#94A3B8" : "#64748B"; // Màu icon

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />

      {/* Nền chính: dark:bg-slate-900 */}
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900 p-6">
        {/* 1. Illustration Icon */}
        <View className="w-40 h-40 bg-slate-50 dark:bg-slate-800 rounded-full items-center justify-center mb-8 border-4 border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-none">
          <FileQuestion size={80} color={iconColor} strokeWidth={1.5} />
          {/* Decor element */}
          <View className="absolute -right-2 -top-2 bg-red-400 w-10 h-10 rounded-full items-center justify-center border-4 border-white dark:border-slate-900">
            <Text className="text-white font-bold text-lg">?</Text>
          </View>
        </View>

        {/* 2. Text Content */}
        <Text className="text-3xl font-black text-slate-800 dark:text-white mb-2 text-center">
          Lạc đường rồi!
        </Text>

        <Text className="text-slate-500 dark:text-slate-400 text-center text-base mb-10 px-4 leading-6">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển sang một vũ
          trụ khác.
        </Text>

        {/* 3. Actions */}
        <Link href="/(tabs)" replace asChild>
          <TouchableOpacity className="bg-blue-600 w-full py-4 rounded-2xl flex-row justify-center items-center shadow-lg shadow-blue-200 dark:shadow-none active:bg-blue-700">
            <Home size={20} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              Về Trang chủ
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/library" replace asChild>
          <TouchableOpacity className="mt-4 py-3">
            <Text className="text-slate-500 dark:text-slate-400 font-medium">
              Đến Thư viện bài học
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}
