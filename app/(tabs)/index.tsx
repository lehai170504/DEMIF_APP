import { useRouter } from "expo-router";
import {
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  Gamepad2,
  Headphones,
  Lock,
  MapPin,
  MoreHorizontal,
  Play,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 1. IMPORT HOOK LẤY MÀU
import { useAppTheme } from "@/src/context/ThemeContext";

export default function HomeScreen() {
  const router = useRouter();

  // 2. LẤY TRẠNG THÁI THEME
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === "dark";

  // Màu icon chung
  const iconColor = isDark ? "#94A3B8" : "#64748B";

  return (
    // Nền chính: Trắng xám -> Đen xám
    <View className="flex-1 bg-slate-50 dark:bg-slate-900">
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#0F172A" : "#FFFFFF"}
      />

      {/* --- 1. Header (Sticky) --- */}
      <SafeAreaView edges={["top"]} className="bg-white dark:bg-slate-900 z-20">
        <View className="px-6 py-3 flex-row justify-between items-center border-b border-slate-100/50 dark:border-slate-800 shadow-sm shadow-slate-100 dark:shadow-none">
          <View className="flex-row items-center gap-3">
            <View className="relative">
              <Image
                source={{ uri: "https://github.com/shadcn.png" }}
                className="w-11 h-11 rounded-full bg-slate-200 border-2 border-slate-50 dark:border-slate-800"
              />
              <View className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900" />
            </View>
            <View>
              <Text className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                Chào buổi sáng
              </Text>
              <Text className="text-slate-900 dark:text-white text-lg font-black leading-6">
                Alex Nguyen
              </Text>
            </View>
          </View>

          <View className="flex-row gap-2">
            {/* Streak Badge */}
            <View className="flex-row items-center bg-orange-50 dark:bg-orange-900/20 px-2.5 py-1.5 rounded-full border border-orange-100 dark:border-orange-900/50">
              <Flame
                size={14}
                color="#F97316"
                fill="#F97316"
                className="mr-1"
              />
              <Text className="text-orange-600 dark:text-orange-400 font-bold text-xs">
                12
              </Text>
            </View>
            {/* Notification Button */}
            <TouchableOpacity className="bg-slate-50 dark:bg-slate-800 p-2 rounded-full border border-slate-100 dark:border-slate-700 active:bg-slate-100 dark:active:bg-slate-700">
              <Bell size={18} color={iconColor} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* --- 2. Daily Progress Hero --- */}
        <View className="px-6 pt-6 pb-4">
          {/* Card này giữ màu tối trong cả 2 chế độ để nổi bật */}
          <View className="bg-slate-900 dark:bg-slate-800 p-6 rounded-[32px] shadow-xl shadow-slate-300 dark:shadow-none relative overflow-hidden border dark:border-slate-700">
            {/* Decor */}
            <View className="absolute -right-6 -top-6 w-32 h-32 bg-orange-500/30 rounded-full blur-3xl" />
            <View className="absolute -left-6 bottom-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />

            <View className="flex-row justify-between items-start mb-5">
              <View>
                <View className="flex-row items-center mb-2">
                  <Trophy size={14} color="#FDBA74" className="mr-1.5" />
                  <Text className="text-orange-300 font-bold text-[10px] uppercase tracking-widest">
                    Mục tiêu ngày
                  </Text>
                </View>
                <View className="flex-row items-baseline">
                  <Text className="text-white text-4xl font-black tracking-tighter">
                    35
                  </Text>
                  <Text className="text-slate-500 text-lg font-bold ml-1">
                    / 60 XP
                  </Text>
                </View>
              </View>
              {/* Circle Chart placeholder */}
              <View className="w-12 h-12 rounded-full border-4 border-slate-800 dark:border-slate-900 items-center justify-center">
                <Text className="text-orange-500 text-[10px] font-black">
                  58%
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View className="h-3 bg-slate-800 dark:bg-slate-900 rounded-full mb-3 overflow-hidden">
              <View className="h-full w-[58%] bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" />
            </View>

            <Text className="text-slate-400 text-xs font-medium text-center">
              Bạn cần thêm <Text className="text-white font-bold">25 XP</Text>{" "}
              để hoàn thành mục tiêu.
            </Text>
          </View>
        </View>

        {/* --- 3. Quick Actions --- */}
        <View className="px-6 py-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-900 dark:text-white font-bold text-lg">
              Luyện tập nhanh
            </Text>
            <TouchableOpacity>
              <Text className="text-slate-400 dark:text-slate-500 text-xs font-bold">
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-6 px-6 gap-3"
          >
            {[
              {
                title: "Ôn tập",
                icon: <BookOpen size={18} color="#3B82F6" />,
                bg: "bg-blue-50 dark:bg-blue-900/20",
                border: "border-blue-100 dark:border-blue-900/30",
              },
              {
                title: "Phát âm",
                icon: <Headphones size={18} color="#F97316" />,
                bg: "bg-orange-50 dark:bg-orange-900/20",
                border: "border-orange-100 dark:border-orange-900/30",
              },
              {
                title: "Game",
                icon: <Gamepad2 size={18} color="#10B981" />,
                bg: "bg-green-50 dark:bg-green-900/20",
                border: "border-green-100 dark:border-green-900/30",
              },
              {
                title: "Đấu Rank",
                icon: <Zap size={18} color="#8B5CF6" />,
                bg: "bg-purple-50 dark:bg-purple-900/20",
                border: "border-purple-100 dark:border-purple-900/30",
              },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                // Card Action: Trắng -> Tối
                className={`p-3 rounded-2xl border ${item.border} bg-white dark:bg-slate-800 min-w-[100px] items-center justify-center shadow-sm dark:shadow-none active:bg-slate-50 dark:active:bg-slate-700`}
              >
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mb-2 ${item.bg}`}
                >
                  {item.icon}
                </View>
                <Text className="font-bold text-slate-700 dark:text-slate-200 text-xs">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- 4. AI Insight --- */}
        <View className="px-6 mb-8">
          <View className="bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/30 p-4 rounded-[24px] shadow-sm dark:shadow-none flex-row gap-4 items-center">
            <View className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-2xl">
              <Sparkles size={20} color="#6366F1" fill="#6366F1" />
            </View>
            <View className="flex-1">
              <Text className="text-indigo-950 dark:text-indigo-200 font-bold text-sm mb-0.5">
                Gợi ý từ AI
              </Text>
              <Text className="text-slate-500 dark:text-slate-400 text-xs leading-4">
                Bạn đang yếu âm đuôi{" "}
                <Text className="font-bold text-slate-700 dark:text-slate-200">
                  /s/
                </Text>
                . Hãy luyện thêm bài Plural Nouns nhé!
              </Text>
            </View>
            <TouchableOpacity className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-xl">
              <ChevronRight size={16} color="#4338CA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- 5. Learning Path (Timeline) --- */}
        <View className="px-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-lg font-black text-slate-900 dark:text-white">
              Lộ trình
            </Text>
            <View className="flex-row items-center bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              <MapPin size={12} color={iconColor} />
              <Text className="text-slate-600 dark:text-slate-300 text-[10px] font-bold ml-1">
                Unit 2
              </Text>
            </View>
          </View>

          {/* Timeline Container */}
          <View className="pl-4 ml-2 relative pb-10">
            {/* The Vertical Line */}
            <View className="absolute left-[7px] top-4 bottom-0 w-[2px] bg-slate-100 dark:bg-slate-800" />

            {/* Node 1: Completed */}
            <View className="mb-8 relative pl-8">
              <View className="absolute left-0 top-1 bg-white dark:bg-slate-900 border-2 border-green-500 rounded-full w-4 h-4 items-center justify-center z-10">
                <View className="w-2 h-2 bg-green-500 rounded-full" />
              </View>
              <View className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 opacity-60">
                <Text className="text-slate-500 dark:text-slate-500 font-bold text-base line-through decoration-slate-400">
                  Unit 1: Introduction
                </Text>
                <Text className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-wide">
                  Đã hoàn thành
                </Text>
              </View>
            </View>

            {/* Node 2: ACTIVE (Main Focus) */}
            <View className="mb-8 relative pl-8">
              {/* Custom Active Dot */}
              <View className="absolute -left-[6px] top-6 z-10">
                <View className="w-8 h-8 bg-orange-500 rounded-full border-4 border-white dark:border-slate-900 shadow-md items-center justify-center">
                  <Play
                    size={10}
                    color="white"
                    fill="white"
                    className="ml-0.5"
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/practice/1")}
                activeOpacity={0.95}
                className="bg-white dark:bg-slate-800 p-5 rounded-[28px] shadow-xl shadow-orange-100/50 dark:shadow-none border border-orange-100 dark:border-orange-900/30"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View className="bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-md">
                    <Text className="text-[10px] font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                      Đang học
                    </Text>
                  </View>
                  <MoreHorizontal size={20} color={iconColor} />
                </View>

                <Text className="text-2xl font-black text-slate-800 dark:text-white mb-1">
                  Meeting Basics
                </Text>
                <Text className="text-slate-500 dark:text-slate-400 text-sm mb-5 font-medium">
                  Unit 2 • Giao tiếp văn phòng
                </Text>

                {/* Sub-steps */}
                <View className="gap-3">
                  <View className="flex-row items-center gap-3">
                    <CheckCircle2 size={18} color="#22C55E" />
                    <Text className="text-slate-700 dark:text-slate-300 text-sm font-bold flex-1 line-through decoration-slate-300 opacity-50">
                      Từ vựng chuyên ngành
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-3">
                    <View className="w-[18px] h-[18px] rounded-full border-2 border-orange-500 items-center justify-center">
                      <View className="w-2 h-2 bg-orange-500 rounded-full" />
                    </View>
                    <Text className="text-slate-800 dark:text-white text-sm font-bold flex-1">
                      Shadowing hội thoại
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => router.push("/practice/1")}
                  className="mt-6 flex-row items-center justify-center bg-orange-500 py-3.5 rounded-xl shadow-lg shadow-orange-200 dark:shadow-none active:scale-[0.98]"
                >
                  <Text className="text-white font-bold text-sm mr-2">
                    Tiếp tục học
                  </Text>
                  <ChevronRight size={16} color="white" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            {/* Node 3: Locked */}
            <View className="relative pl-8 opacity-60">
              <View className="absolute left-[1px] top-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-full w-3.5 h-3.5 z-10" />
              <View className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 border-dashed flex-row items-center justify-between">
                <View>
                  <Text className="text-slate-700 dark:text-slate-300 font-bold text-base mb-0.5">
                    Unit 3: Negotiation
                  </Text>
                  <Text className="text-slate-400 text-xs">
                    Mở khóa sau Unit 2
                  </Text>
                </View>
                <Lock size={16} color="#94A3B8" />
              </View>
            </View>

            {/* Node 4: Future */}
            <View className="mt-6 relative pl-8 opacity-40">
              <View className="absolute left-[3px] top-6 bg-slate-200 dark:bg-slate-700 rounded-full w-2.5 h-2.5 z-10" />
              <View className="py-4 pl-4 border-l-2 border-transparent">
                <Text className="text-slate-800 dark:text-slate-400 font-bold text-base">
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
