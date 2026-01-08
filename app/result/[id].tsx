import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowRight,
  CheckCircle2,
  Mic,
  RotateCcw,
  Share2,
  Sparkles,
  X,
  Zap,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResultScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const RESULT_DATA = {
    totalScore: 82,
    metrics: {
      accuracy: 78,
      fluency: 90,
      pronunciation: 85,
    },
    transcript: [
      { word: "Good", status: "correct" },
      { word: "morning", status: "correct" },
      { word: "everyone,", status: "correct" },
      { word: "let's", status: "correct" },
      { word: "get", status: "correct" },
      { word: "start", status: "wrong", corrected: "started" },
      { word: "by", status: "correct" },
      { word: "viewing", status: "wrong", corrected: "reviewing" },
      { word: "the", status: "correct" },
      { word: "agenda.", status: "correct" },
    ],
    aiFeedback:
      "Bạn làm rất tốt phần ngữ điệu! Tuy nhiên, hãy chú ý âm đuôi (ending sounds) ở các từ thì quá khứ như 'started'. Bạn cũng bị nuốt âm 're' trong từ 'reviewing'.",
  };

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        {/* 1. Header Transparent */}
        <View className="px-6 py-4 flex-row justify-between items-center z-10">
          <TouchableOpacity
            onPress={() => router.dismiss()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center border border-slate-100 shadow-sm active:bg-slate-50"
          >
            <X size={20} color="#64748B" />
          </TouchableOpacity>
          <Text className="font-bold text-slate-800 text-lg">
            Tổng kết bài học
          </Text>
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center border border-slate-100 shadow-sm active:bg-slate-50">
            <Share2 size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* 2. Hero Score Section */}
          <View className="items-center mt-2 mb-8 relative">
            {/* Confetti Decor (Giả lập bằng các chấm tròn) */}
            <View className="absolute top-0 w-full h-full flex-row justify-center opacity-30">
              <View className="w-2 h-2 bg-yellow-400 rounded-full absolute top-10 left-20" />
              <View className="w-3 h-3 bg-red-400 rounded-full absolute top-4 right-24" />
              <View className="w-2 h-2 bg-blue-400 rounded-full absolute bottom-10 left-10" />
              <View className="w-3 h-3 bg-green-400 rounded-full absolute bottom-4 right-10" />
            </View>

            {/* Main Score Circle */}
            <View className="w-48 h-48 rounded-full bg-white items-center justify-center shadow-2xl shadow-orange-200 border-[12px] border-orange-50">
              <View className="items-center">
                <Text className="text-orange-500 font-black text-6xl tracking-tighter leading-[70px]">
                  {RESULT_DATA.totalScore}
                </Text>
                <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                  Tổng điểm
                </Text>
              </View>
            </View>

            {/* Badge */}
            <View className="absolute -bottom-3 bg-green-500 px-5 py-2 rounded-full border-4 border-white shadow-md">
              <Text className="text-white font-bold text-sm uppercase tracking-wide">
                Excellent! 🎉
              </Text>
            </View>
          </View>

          {/* 3. Metrics Grid (Glassmorphism Light) */}
          <View className="flex-row px-6 gap-4 mb-8">
            {[
              {
                label: "Chính xác",
                val: RESULT_DATA.metrics.accuracy,
                icon: <CheckCircle2 size={18} color="#3B82F6" />,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Trôi chảy",
                val: RESULT_DATA.metrics.fluency,
                icon: <Zap size={18} color="#F59E0B" />,
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                label: "Phát âm",
                val: RESULT_DATA.metrics.pronunciation,
                icon: <Mic size={18} color="#EC4899" />,
                color: "text-pink-600",
                bg: "bg-pink-50",
              },
            ].map((item, i) => (
              <View
                key={i}
                className="flex-1 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm items-center"
              >
                <View
                  className={`w-8 h-8 rounded-full ${item.bg} items-center justify-center mb-2`}
                >
                  {item.icon}
                </View>
                <Text className={`text-xl font-black ${item.color}`}>
                  {item.val}%
                </Text>
                <Text className="text-[10px] text-slate-400 font-bold uppercase mt-1 text-center">
                  {item.label}
                </Text>
              </View>
            ))}
          </View>

          {/* 4. AI Feedback Card */}
          <View className="px-6 mb-8">
            <View className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-5 rounded-[24px] shadow-sm relative overflow-hidden">
              <View className="flex-row items-center mb-3">
                <View className="bg-indigo-100 p-2 rounded-xl mr-3">
                  <Sparkles size={20} color="#6366F1" fill="#6366F1" />
                </View>
                <Text className="text-indigo-900 font-bold text-base">
                  Góc nhìn AI Coach
                </Text>
              </View>
              <Text className="text-slate-600 text-sm leading-6 font-medium">
                "{RESULT_DATA.aiFeedback}"
              </Text>
            </View>
          </View>

          {/* 5. Detail Errors */}
          <View className="px-6 pb-6">
            <Text className="text-slate-900 font-bold text-lg mb-4">
              Chi tiết lỗi sai
            </Text>
            <View className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <View className="flex-row flex-wrap gap-x-1.5 gap-y-2 leading-8">
                {RESULT_DATA.transcript.map((item, index) =>
                  item.status === "correct" ? (
                    <Text
                      key={index}
                      className="text-slate-600 text-lg font-medium"
                    >
                      {item.word}
                    </Text>
                  ) : (
                    <View key={index} className="flex-col items-center mx-1">
                      <Text className="text-red-400 text-sm line-through decoration-2 decoration-red-300 font-medium mb-0.5">
                        {item.word}
                      </Text>
                      <Text className="text-green-600 font-bold text-lg bg-green-50 px-1 rounded">
                        {item.corrected}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* 6. Sticky Footer Actions */}
        <View className="absolute bottom-0 w-full bg-white border-t border-slate-100 px-6 py-5 pb-8 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] flex-row gap-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 bg-slate-50 py-4 rounded-2xl items-center justify-center border border-slate-100 active:bg-slate-100"
          >
            <RotateCcw size={20} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/library")}
            className="flex-[4] bg-orange-500 py-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-orange-200 active:bg-orange-600"
          >
            <Text className="text-white font-bold text-lg mr-2">
              Tiếp tục bài mới
            </Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
