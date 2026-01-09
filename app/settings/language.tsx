import { Stack, useRouter } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 1. IMPORT HOOK LẤY MÀU
import { useAppTheme } from "@/src/context/ThemeContext";

const LANGUAGES = [
  { id: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { id: "en", label: "English", flag: "🇺🇸" },
  { id: "jp", label: "日本語", flag: "🇯🇵" },
  { id: "kr", label: "한국어", flag: "🇰🇷" },
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("vi");

  // 2. LẤY TRẠNG THÁI THEME
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#F8FAFC" : "#0F172A"; // Màu mũi tên quay lại

  return (
    // Nền chính: dark:bg-slate-900
    <View className="flex-1 bg-white dark:bg-slate-900">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#0F172A" : "#FFFFFF"}
      />

      {/* Header */}
      <View className="flex-row items-center px-6 pt-16 pb-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4 p-1 active:opacity-50"
        >
          <ArrowLeft size={24} color={iconColor} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900 dark:text-white">
          Ngôn ngữ
        </Text>
      </View>

      <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-950 p-6">
        <Text className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase mb-4 ml-1">
          Chọn ngôn ngữ hiển thị
        </Text>

        {/* Container danh sách: dark:bg-slate-800 dark:border-slate-700 */}
        <View className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
          {LANGUAGES.map((lang, index) => {
            const isSelected = selectedLang === lang.id;
            return (
              <TouchableOpacity
                key={lang.id}
                onPress={() => setSelectedLang(lang.id)}
                className={`flex-row items-center justify-between p-5 ${
                  index !== LANGUAGES.length - 1
                    ? "border-b border-slate-100 dark:border-slate-700"
                    : ""
                } ${
                  isSelected
                    ? "bg-orange-50 dark:bg-orange-900/20"
                    : "bg-white dark:bg-slate-800"
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-4">{lang.flag}</Text>
                  <Text
                    className={`text-base font-medium ${
                      isSelected
                        ? "text-orange-700 dark:text-orange-400"
                        : "text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {lang.label}
                  </Text>
                </View>

                {isSelected && (
                  <View className="bg-orange-100 dark:bg-orange-900/40 p-1 rounded-full">
                    <Check size={16} color="#F97316" strokeWidth={3} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="text-center text-slate-400 dark:text-slate-500 text-xs mt-6 px-10 leading-5">
          Thay đổi ngôn ngữ sẽ khởi động lại ứng dụng để áp dụng cài đặt mới.
        </Text>
      </ScrollView>
    </View>
  );
}
