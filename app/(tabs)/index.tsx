import { cn } from "@/src/lib/utils"; // Đảm bảo bạn đã có hàm utils này
import { useRouter } from "expo-router";
import {
  Bell,
  CheckCircle,
  ChevronRight,
  Flame,
  Headphones,
  Lock,
  Map,
  Play,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <ScrollView
        className="flex-1 pt-14"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* --- 1. Top Header --- */}
        <View className="flex-row justify-between items-center px-6 mb-6">
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 items-center justify-center overflow-hidden mr-3">
              {/* Placeholder Avatar */}
              <Text className="text-slate-600 font-bold text-lg">AN</Text>
            </View>
            <View>
              <Text className="text-slate-500 text-xs font-bold uppercase">
                Good Morning,
              </Text>
              <Text className="text-slate-900 text-xl font-black">
                Alex Nguyen
              </Text>
            </View>
          </View>

          {/* Level Badge & Notification */}
          <View className="flex-row items-center gap-3">
            <View className="bg-orange-100 px-3 py-1.5 rounded-full border border-orange-200">
              <Text className="text-orange-700 font-bold text-xs">Lvl. B2</Text>
            </View>
            <TouchableOpacity className="p-2 bg-slate-50 rounded-full border border-slate-100 relative">
              <Bell size={20} color="#64748B" />
              <View className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- 2. Hero Section (Daily Goal & Streak) --- */}
        <View className="px-6 mb-8">
          <View className="bg-slate-900 rounded-[32px] p-6 shadow-xl shadow-slate-300 relative overflow-hidden">
            {/* Background Decor */}
            <View className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl" />

            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="text-slate-400 text-xs font-bold uppercase mb-1">
                  Mục tiêu ngày
                </Text>
                <Text className="text-white text-3xl font-black">
                  35/60{" "}
                  <Text className="text-lg text-slate-500 font-medium">XP</Text>
                </Text>
              </View>
              <View className="flex-row items-center bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <Flame size={16} color="#F97316" fill="#F97316" />
                <Text className="text-orange-500 font-bold ml-1.5">
                  12 Days
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View className="h-3 bg-slate-800 rounded-full mb-2 overflow-hidden">
              <View className="h-full w-[60%] bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
            </View>
            <Text className="text-slate-400 text-xs font-medium text-right">
              Còn 25 XP nữa để hoàn thành
            </Text>
          </View>
        </View>

        {/* --- 3. Quick Actions (Horizontal Scroll) --- */}
        <View className="mb-8">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
          >
            {[
              {
                title: "Ôn tập nhanh",
                icon: <RotateCcw size={20} color="#3B82F6" />,
                bg: "bg-blue-50",
                text: "text-blue-600",
              },
              {
                title: "Luyện phát âm",
                icon: <Headphones size={20} color="#F97316" />,
                bg: "bg-orange-50",
                text: "text-orange-600",
              },
              {
                title: "Test định kỳ",
                icon: <Target size={20} color="#10B981" />,
                bg: "bg-green-50",
                text: "text-green-600",
              },
            ].map((action, i) => (
              <TouchableOpacity
                key={i}
                className="flex-row items-center bg-white border border-slate-100 p-3 pr-5 rounded-2xl shadow-sm"
              >
                <View
                  className={cn(
                    "w-10 h-10 rounded-xl items-center justify-center mr-3",
                    action.bg
                  )}
                >
                  {action.icon}
                </View>
                <Text className={cn("font-bold text-sm", action.text)}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- 4. AI Insight (Tip of the day) --- */}
        <View className="px-6 mb-8">
          <View className="bg-gradient-to-r from-orange-50 to-white border border-orange-100 p-4 rounded-2xl flex-row items-start">
            <Sparkles size={20} color="#F97316" className="mt-0.5 mr-3" />
            <View className="flex-1">
              <Text className="text-orange-800 font-bold text-sm mb-1">
                AI Insight
              </Text>
              <Text className="text-slate-600 text-xs leading-5">
                Bạn thường gặp khó khăn với âm đuôi /s/. Hãy thử bài luyện tập
                "Plural Nouns" trong phần Ôn tập nhé.
              </Text>
            </View>
          </View>
        </View>

        {/* --- 5. Learning Path (Map) --- */}
        <View className="px-6">
          <View className="flex-row justify-between items-end mb-6">
            <Text className="text-xl font-black text-slate-900">
              Lộ trình học
            </Text>
            <TouchableOpacity className="flex-row items-center">
              <Map size={16} color="#64748B" />
              <Text className="text-slate-500 text-xs font-bold ml-1.5 uppercase">
                Bản đồ
              </Text>
            </TouchableOpacity>
          </View>

          <View className="pl-6 border-l-2 border-dashed border-slate-200 space-y-10 ml-3 pb-6 relative">
            {/* Node 1: Completed */}
            <View className="relative">
              <View className="absolute -left-[35px] top-0 bg-white p-1 rounded-full border border-green-100 shadow-sm">
                <CheckCircle size={24} color="#10B981" fill="#D1FAE5" />
              </View>
              <View className="bg-slate-50 p-4 rounded-2xl border border-slate-100 opacity-60">
                <Text className="text-slate-500 font-bold text-lg line-through">
                  Unit 1: Introduction
                </Text>
                <Text className="text-slate-400 text-xs mt-1">
                  Hoàn thành • 100% XP
                </Text>
              </View>
            </View>

            {/* Node 2: ACTIVE (Hero) */}
            <View className="relative">
              {/* Pulsing Dot Effect */}
              <View className="absolute -left-[39px] top-6 w-8 h-8 bg-orange-100 rounded-full animate-ping opacity-75" />
              <View className="absolute -left-[39px] top-6 w-8 h-8 bg-orange-500 rounded-full border-4 border-white shadow-lg shadow-orange-200 flex items-center justify-center">
                <Play size={12} color="white" fill="white" className="ml-0.5" />
              </View>

              <TouchableOpacity
                onPress={() => router.push("/practice/1")}
                activeOpacity={0.9}
                className="bg-white p-5 rounded-[24px] shadow-lg shadow-orange-100 border border-orange-100 relative overflow-hidden"
              >
                {/* Decoration Circle */}
                <View className="absolute -right-6 -bottom-6 w-24 h-24 bg-orange-50 rounded-full" />

                <View className="flex-row items-start justify-between mb-3">
                  <View className="bg-orange-100 px-2.5 py-1 rounded-lg">
                    <Text className="text-[10px] font-bold text-orange-700 uppercase">
                      Hôm nay
                    </Text>
                  </View>
                  <Text className="text-orange-500 font-bold text-xs">
                    15 phút
                  </Text>
                </View>

                <Text className="text-slate-900 font-black text-xl mb-1">
                  Unit 2: Meeting Basics
                </Text>
                <Text className="text-slate-500 text-sm mb-4">
                  Phát âm & Ngữ điệu trong họp
                </Text>

                {/* Sub-tasks */}
                <View className="bg-slate-50 p-3 rounded-xl space-y-2">
                  <View className="flex-row items-center">
                    <View className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2" />
                    <Text className="text-slate-600 text-xs font-medium">
                      Từ vựng chuyên ngành
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2" />
                    <Text className="text-slate-400 text-xs font-medium">
                      Shadowing hội thoại (Locked)
                    </Text>
                  </View>
                </View>

                <View className="mt-4 flex-row items-center">
                  <Text className="text-orange-600 font-bold text-sm mr-2">
                    Tiếp tục học
                  </Text>
                  <ChevronRight size={16} color="#EA580C" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Node 3: Locked */}
            <View className="relative opacity-50">
              <View className="absolute -left-[35px] top-4 w-8 h-8 bg-slate-100 rounded-full border border-slate-200 items-center justify-center">
                <Lock size={14} color="#94A3B8" />
              </View>
              <View className="bg-white p-4 rounded-2xl border border-slate-100">
                <Text className="text-slate-800 font-bold text-lg">
                  Unit 3: Negotiation
                </Text>
                <Text className="text-slate-500 text-xs mt-1">
                  Mở khóa sau Unit 2
                </Text>
              </View>
            </View>
            {/* Node 4: Locked (Future) */}
            <View className="relative opacity-40">
              <View className="absolute -left-[31px] top-2 w-6 h-6 bg-slate-100 rounded-full border border-slate-200" />
              <View className="bg-white p-4 rounded-2xl border border-dashed border-slate-200">
                <Text className="text-slate-800 font-bold text-lg">
                  Unit 4: Presentation
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
