import { cn } from "@/src/lib/utils";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
    CheckCircle2,
    ChevronRight,
    Mic,
    RefreshCw,
    Share2,
    Sparkles,
    X,
    Zap,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ResultScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Dữ liệu giả lập (Sau này API trả về)
  const RESULT_DATA = {
    totalScore: 82,
    metrics: {
      accuracy: 78, // Độ chính xác từ vựng
      fluency: 90, // Độ trôi chảy
      pronunciation: 85, // Phát âm
    },
    // Giả lập phân tích lỗi sai (Diff Match Patch)
    // status: 'correct' | 'wrong' | 'missing'
    transcript: [
      { word: "Good", status: "correct" },
      { word: "morning", status: "correct" },
      { word: "everyone,", status: "correct" },
      { word: "let's", status: "correct" },
      { word: "get", status: "correct" },
      { word: "start", status: "wrong", corrected: "started" }, // Người dùng đọc "start", đúng là "started"
      { word: "by", status: "correct" },
      { word: "viewing", status: "wrong", corrected: "reviewing" },
      { word: "the", status: "correct" },
      { word: "agenda.", status: "correct" },
    ],
    aiFeedback:
      "Bạn làm rất tốt phần ngữ điệu! Tuy nhiên, hãy chú ý âm đuôi (ending sounds) ở các từ thì quá khứ như 'started'. Bạn cũng bị nuốt âm 're' trong từ 'reviewing'.",
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100 border-green-200";
    if (score >= 60) return "text-orange-500 bg-orange-100 border-orange-200";
    return "text-red-500 bg-red-100 border-red-200";
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* 1. Header (Nút đóng & Share) */}
      <View className="pt-14 pb-4 px-4 flex-row justify-between items-center z-10">
        <TouchableOpacity
          onPress={() => router.dismiss()} // Đóng modal quay về trang trước
          className="p-2 bg-slate-50 rounded-full"
        >
          <X size={24} color="#64748B" />
        </TouchableOpacity>
        <Text className="font-bold text-slate-800 text-lg">
          Kết quả phân tích
        </Text>
        <TouchableOpacity className="p-2 bg-slate-50 rounded-full">
          <Share2 size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 2. Score Hero Section */}
        <View className="items-center py-6">
          {/* Vòng tròn điểm số */}
          <View
            className={cn(
              "w-40 h-40 rounded-full items-center justify-center border-[8px] shadow-sm",
              RESULT_DATA.totalScore >= 80
                ? "border-green-100 bg-green-50"
                : "border-orange-100 bg-orange-50"
            )}
          >
            <View className="items-center">
              <Text
                className={cn(
                  "text-5xl font-black tracking-tighter",
                  RESULT_DATA.totalScore >= 80
                    ? "text-green-600"
                    : "text-orange-500"
                )}
              >
                {RESULT_DATA.totalScore}
              </Text>
              <Text className="text-slate-400 font-bold text-sm uppercase mt-1">
                Tổng điểm
              </Text>
            </View>

            {/* Badge đánh giá */}
            <View
              className={cn(
                "absolute -bottom-4 px-4 py-1.5 rounded-full border shadow-sm",
                RESULT_DATA.totalScore >= 80
                  ? "bg-green-500 border-green-400"
                  : "bg-orange-500 border-orange-400"
              )}
            >
              <Text className="text-white font-bold text-xs uppercase">
                {RESULT_DATA.totalScore >= 80 ? "Excellent" : "Good Try"}
              </Text>
            </View>
          </View>
        </View>

        {/* 3. Detailed Metrics Grid */}
        <View className="flex-row px-6 gap-3 mt-6">
          {/* Metric 1: Accuracy */}
          <View className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100 items-center">
            <CheckCircle2 size={20} color="#2563EB" className="mb-2" />
            <Text className="text-lg font-bold text-slate-800">
              {RESULT_DATA.metrics.accuracy}%
            </Text>
            <Text className="text-[10px] text-slate-400 font-bold uppercase">
              Chính xác
            </Text>
          </View>
          {/* Metric 2: Fluency */}
          <View className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100 items-center">
            <Zap size={20} color="#F59E0B" className="mb-2" />
            <Text className="text-lg font-bold text-slate-800">
              {RESULT_DATA.metrics.fluency}%
            </Text>
            <Text className="text-[10px] text-slate-400 font-bold uppercase">
              Trôi chảy
            </Text>
          </View>
          {/* Metric 3: Pronunciation */}
          <View className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100 items-center">
            <Mic size={20} color="#EC4899" className="mb-2" />
            <Text className="text-lg font-bold text-slate-800">
              {RESULT_DATA.metrics.pronunciation}%
            </Text>
            <Text className="text-[10px] text-slate-400 font-bold uppercase">
              Phát âm
            </Text>
          </View>
        </View>

        {/* 4. AI Feedback (Phần quan trọng) */}
        <View className="px-6 mt-8">
          <View className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100 relative overflow-hidden">
            {/* Decor Icon */}
            <View className="absolute -right-4 -top-4 opacity-10">
              <Sparkles size={100} color="#4F46E5" fill="#4F46E5" />
            </View>

            <View className="flex-row items-center mb-3">
              <Sparkles size={20} color="#4F46E5" fill="#4F46E5" />
              <Text className="font-bold text-indigo-700 ml-2">
                Góc nhìn AI Coach
              </Text>
            </View>
            <Text className="text-indigo-900 leading-6 text-sm">
              "{RESULT_DATA.aiFeedback}"
            </Text>
          </View>
        </View>

        {/* 5. Transcript Comparison (Diff View) */}
        <View className="px-6 mt-8 pb-32">
          <Text className="font-bold text-slate-800 text-lg mb-4">
            Chi tiết lỗi sai
          </Text>
          <View className="bg-slate-50 p-5 rounded-3xl border border-slate-200">
            <View className="flex-row flex-wrap">
              {RESULT_DATA.transcript.map((item, index) => (
                <View key={index} className="mr-1.5 mb-2">
                  {item.status === "correct" ? (
                    <Text className="text-slate-700 text-lg">{item.word}</Text>
                  ) : (
                    <View className="flex-col">
                      {/* Từ người dùng đọc sai (Gạch ngang + Đỏ) */}
                      <Text className="text-red-400 text-sm line-through decoration-red-400 decoration-2">
                        {item.word}
                      </Text>
                      {/* Từ đúng (Màu xanh) */}
                      <Text className="text-green-600 font-bold text-lg">
                        {item.corrected}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Legend (Chú thích màu) */}
          <View className="flex-row justify-center mt-4 gap-6">
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-slate-700 mr-2" />
              <Text className="text-xs text-slate-500 font-medium">Đúng</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-red-400 mr-2" />
              <Text className="text-xs text-slate-500 font-medium">
                Bạn đọc
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-green-600 mr-2" />
              <Text className="text-xs text-slate-500 font-medium">Chuẩn</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 6. Footer Actions */}
      <View className="absolute bottom-0 w-full px-6 py-6 bg-white border-t border-slate-100 flex-row gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.03)]">
        <TouchableOpacity
          onPress={() => router.back()} // Quay lại trang Practice để học lại
          className="flex-1 bg-slate-100 py-4 rounded-xl flex-row justify-center items-center active:bg-slate-200"
        >
          <RefreshCw size={20} color="#475569" />
          <Text className="font-bold text-slate-600 ml-2">Thử lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)")} // Về trang chủ hoặc bài tiếp theo
          className="flex-[2] bg-blue-600 py-4 rounded-xl flex-row justify-center items-center shadow-lg shadow-blue-200 active:bg-blue-700"
        >
          <Text className="font-bold text-white mr-2 text-base">
            Bài tiếp theo
          </Text>
          <ChevronRight size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
