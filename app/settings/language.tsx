import { useRouter } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LANGUAGES = [
  { id: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { id: "en", label: "English", flag: "🇺🇸" },
  { id: "jp", label: "日本語", flag: "🇯🇵" },
  { id: "kr", label: "한국어", flag: "🇰🇷" },
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("vi"); // Mặc định Tiếng Việt

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center px-6 pt-16 pb-4 border-b border-slate-100 bg-white z-10">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 p-1">
          <ArrowLeft size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">Ngôn ngữ</Text>
      </View>

      <ScrollView className="flex-1 bg-slate-50 p-6">
        <Text className="text-slate-500 text-sm font-medium uppercase mb-4 ml-1">
          Chọn ngôn ngữ hiển thị
        </Text>

        <View className="bg-white rounded-2xl overflow-hidden border border-slate-200">
          {LANGUAGES.map((lang, index) => {
            const isSelected = selectedLang === lang.id;
            return (
              <TouchableOpacity
                key={lang.id}
                onPress={() => setSelectedLang(lang.id)}
                className={`flex-row items-center justify-between p-5 ${
                  index !== LANGUAGES.length - 1
                    ? "border-b border-slate-100"
                    : ""
                } ${isSelected ? "bg-orange-50" : "bg-white"}`}
              >
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-4">{lang.flag}</Text>
                  <Text
                    className={`text-base font-medium ${
                      isSelected ? "text-orange-700" : "text-slate-700"
                    }`}
                  >
                    {lang.label}
                  </Text>
                </View>

                {isSelected && (
                  <View className="bg-orange-100 p-1 rounded-full">
                    <Check size={16} color="#F97316" strokeWidth={3} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="text-center text-slate-400 text-xs mt-6 px-10 leading-5">
          Thay đổi ngôn ngữ sẽ khởi động lại ứng dụng để áp dụng cài đặt mới.
        </Text>
      </ScrollView>
    </View>
  );
}
