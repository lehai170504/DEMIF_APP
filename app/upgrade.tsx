import { useRouter } from "expo-router";
import { Check, Crown, Star, X } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 1. IMPORT HOOK LẤY MÀU
import { useAppTheme } from "@/src/context/ThemeContext";

export default function UpgradeScreen() {
  const router = useRouter();

  // 2. LẤY TRẠNG THÁI THEME
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === "dark";

  const BENEFITS = [
    "Mở khóa toàn bộ 500+ bài học",
    "AI chấm điểm phát âm không giới hạn",
    "Lộ trình học cá nhân hóa",
    "Tắt quảng cáo hoàn toàn",
    "Chứng chỉ hoàn thành khóa học",
  ];

  return (
    // bg-transparent để thấy được hiệu ứng trượt đè lên màn hình cũ
    <View className="flex-1 bg-slate-900 dark:bg-slate-950">
      <StatusBar barStyle="light-content" />

      {/* 1. VISUAL HANDLE BAR (Thanh nắm ảo) */}
      <View
        className="w-full items-center pt-3 pb-2 bg-transparent"
        onTouchEnd={() => router.back()}
      >
        <View className="w-14 h-1.5 bg-slate-600 rounded-full opacity-60" />
      </View>

      {/* 2. NÚT ĐÓNG */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-4 right-4 z-50 w-8 h-8 bg-white/20 rounded-full items-center justify-center backdrop-blur-md"
      >
        <X size={18} color="white" />
      </TouchableOpacity>

      {/* 3. NỘI DUNG CHÍNH */}
      <ScrollView
        // Nền ScrollView: Trắng -> Tối
        className="flex-1 bg-white dark:bg-slate-900 rounded-t-[32px] overflow-hidden mt-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        bounces={true}
      >
        {/* Header Banner - Giữ nguyên style tối để nổi bật Premium */}
        <View className="bg-slate-900 dark:bg-slate-950 pt-12 pb-14 px-6 items-center relative overflow-hidden">
          <View className="absolute top-0 left-0 w-full h-full opacity-20 bg-orange-500 rounded-b-[40px]" />
          <View className="w-24 h-24 bg-orange-500 rounded-full items-center justify-center shadow-lg shadow-orange-500/50 mb-4 animate-bounce">
            <Crown size={40} color="white" fill="white" />
          </View>
          <Text className="text-white text-3xl font-black text-center mb-2">
            Go <Text className="text-orange-500">Premium</Text>
          </Text>
          <Text className="text-slate-400 text-center px-6">
            Bứt phá giới hạn ngôn ngữ với công nghệ AI tiên tiến nhất.
          </Text>
        </View>

        {/* Pricing Cards */}
        <View className="px-6 -mt-8">
          {/* Card Pricing: dark:bg-slate-800 dark:border-slate-700 */}
          <View className="bg-white dark:bg-slate-800 p-6 rounded-[32px] shadow-2xl shadow-slate-900/10 dark:shadow-none border border-slate-100 dark:border-slate-700">
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Gói phổ biến nhất
                </Text>
                <Text className="text-3xl font-black text-slate-800 dark:text-white">
                  129.000đ
                  <Text className="text-base text-slate-500 dark:text-slate-400 font-medium">
                    /tháng
                  </Text>
                </Text>
              </View>
              <View className="bg-orange-100 dark:bg-orange-900/40 px-3 py-1 rounded-full">
                <Text className="text-orange-600 dark:text-orange-400 font-bold text-xs">
                  -20%
                </Text>
              </View>
            </View>

            <View className="space-y-4 mb-8">
              {BENEFITS.map((item, index) => (
                <View key={index} className="flex-row items-center">
                  <View className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mr-3">
                    <Check size={14} color="#16A34A" strokeWidth={3} />
                  </View>
                  <Text className="text-slate-600 dark:text-slate-300 font-medium">
                    {item}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity className="bg-orange-500 w-full py-4 rounded-2xl items-center shadow-lg shadow-orange-300 dark:shadow-none active:bg-orange-600">
              <Text className="text-white font-bold text-lg">
                Nâng cấp ngay
              </Text>
            </TouchableOpacity>

            <Text className="text-center text-slate-400 dark:text-slate-500 text-xs mt-4">
              Hủy gia hạn bất kỳ lúc nào. Hoàn tiền trong 7 ngày.
            </Text>
          </View>
        </View>

        {/* Testimonial */}
        <View className="px-6 py-8 pb-32">
          <Text className="text-center text-slate-800 dark:text-white font-bold text-lg mb-6">
            Học viên nói gì?
          </Text>
          {/* Card Review: dark:bg-slate-800 dark:border-slate-700 */}
          <View className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
            <View className="flex-row gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} color="#F59E0B" fill="#F59E0B" />
              ))}
            </View>
            <Text className="text-slate-600 dark:text-slate-300 italic leading-6 mb-4">
              "Ứng dụng tuyệt vời! Tính năng Shadowing giúp mình sửa lỗi phát âm
              cực chuẩn. Đáng đồng tiền bát gạo."
            </Text>
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-blue-200 dark:bg-blue-900/50 rounded-full items-center justify-center mr-2">
                <Text className="font-bold text-blue-700 dark:text-blue-300 text-xs">
                  M
                </Text>
              </View>
              <Text className="text-slate-900 dark:text-white font-bold text-sm">
                Minh Anh
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
