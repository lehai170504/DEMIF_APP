import { cn } from "@/src/lib/utils";
import { Crown, Shield } from "lucide-react-native";
import React from "react";
import { FlatList, Image, StatusBar, Text, View } from "react-native";

// 1. IMPORT HOOK LẤY MÀU
import { useAppTheme } from "@/src/context/ThemeContext";

// Dữ liệu giả lập
const LEADERBOARD = [
  {
    id: "1",
    name: "Sarah K.",
    xp: 2450,
    avatar: "https://i.pravatar.cc/150?u=1",
    rank: 1,
  },
  {
    id: "2",
    name: "Alex N.",
    xp: 2180,
    avatar: "https://github.com/shadcn.png",
    rank: 2,
    isMe: true,
  },
  {
    id: "3",
    name: "John D.",
    xp: 1900,
    avatar: "https://i.pravatar.cc/150?u=3",
    rank: 3,
  },
  {
    id: "4",
    name: "Emily R.",
    xp: 1850,
    avatar: "https://i.pravatar.cc/150?u=4",
    rank: 4,
  },
  {
    id: "5",
    name: "Michael",
    xp: 1720,
    avatar: "https://i.pravatar.cc/150?u=5",
    rank: 5,
  },
  {
    id: "6",
    name: "Jessica",
    xp: 1650,
    avatar: "https://i.pravatar.cc/150?u=6",
    rank: 6,
  },
  {
    id: "7",
    name: "David W.",
    xp: 1500,
    avatar: "https://i.pravatar.cc/150?u=7",
    rank: 7,
  },
  {
    id: "8",
    name: "Lisa M.",
    xp: 1420,
    avatar: "https://i.pravatar.cc/150?u=8",
    rank: 8,
  },
];

export default function RankingScreen() {
  // 2. LẤY TRẠNG THÁI THEME (Cho StatusBar)
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === "dark";

  const topThree = LEADERBOARD.slice(0, 3);
  const others = LEADERBOARD.slice(3);

  const renderItem = ({ item }: { item: (typeof LEADERBOARD)[0] }) => (
    <View
      // Card nền trắng -> tối: dark:bg-slate-800 dark:border-slate-700
      className={cn(
        "flex-row items-center p-4 mb-3 mx-5 rounded-[20px] border shadow-sm dark:shadow-none",
        item.isMe
          ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-900/50 shadow-orange-100 dark:shadow-none"
          : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-slate-100"
      )}
    >
      <Text
        className={cn(
          "font-black w-8 text-center mr-2 text-lg",
          item.isMe
            ? "text-orange-500 dark:text-orange-400"
            : "text-slate-400 dark:text-slate-500"
        )}
      >
        {item.rank}
      </Text>

      <Image
        source={{ uri: item.avatar }}
        className="w-12 h-12 rounded-full bg-slate-200 border border-slate-100 dark:border-slate-600"
      />

      <View className="flex-1 ml-4">
        <Text
          className={cn(
            "font-bold text-base mb-0.5",
            // Tên người dùng: dark:text-white
            item.isMe
              ? "text-slate-900 dark:text-orange-100"
              : "text-slate-700 dark:text-slate-200"
          )}
        >
          {item.name} {item.isMe && "(Bạn)"}
        </Text>
        {/* Progress bar background */}
        <View className="h-1.5 w-20 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <View className="h-full bg-orange-400 w-[70%]" />
        </View>
      </View>

      <View className="items-end">
        <Text className="text-orange-600 dark:text-orange-400 font-black text-sm">
          {item.xp}
        </Text>
        <Text className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase">
          XP
        </Text>
      </View>
    </View>
  );

  return (
    // Nền chính: dark:bg-slate-900
    <View className="flex-1 bg-white dark:bg-slate-900">
      {/* StatusBar của Ranking luôn là light-content vì Header màu cam */}
      <StatusBar barStyle="light-content" backgroundColor="#F97316" />

      {/* --- 1. Header & Podium Area --- */}
      {/* Phần màu cam này giữ nguyên, nhưng nền bo cong bên dưới sẽ khớp với bg tối */}
      <View className="bg-orange-500 dark:bg-orange-600 rounded-b-[40px] shadow-xl shadow-orange-200 dark:shadow-none z-10 overflow-hidden pb-6">
        {/* Decor Circles */}
        <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <View className="absolute top-20 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

        {/* Title Bar */}
        <View className="pt-14 px-6 mb-4 flex-row justify-between items-center">
          <View>
            <Text className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-1">
              Tuần này
            </Text>
            <Text className="text-white font-black text-2xl">
              Bảng Phong Thần
            </Text>
          </View>
          <View className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <Shield size={20} color="white" />
          </View>
        </View>

        {/* Podium Container */}
        <View className="flex-row justify-center items-end px-2 space-x-2">
          {/* Rank 2 (Left) */}
          <View className="items-center flex-1">
            <View className="relative mb-2">
              <Image
                source={{ uri: topThree[1].avatar }}
                className="w-14 h-14 rounded-full border-2 border-slate-300/50"
              />
              <View className="absolute -bottom-2 left-1/2 -translate-x-3 bg-slate-200 dark:bg-slate-700 px-2 rounded-full border border-white dark:border-slate-600">
                <Text className="text-slate-600 dark:text-slate-300 font-bold text-[10px]">
                  #2
                </Text>
              </View>
            </View>
            <Text
              className="text-white font-bold text-xs mb-1 text-center"
              numberOfLines={1}
            >
              {topThree[1].name}
            </Text>
            <View className="bg-orange-400/80 dark:bg-orange-700/80 w-full h-24 rounded-t-lg items-center justify-start pt-2 border-t border-orange-300/50">
              <Text className="text-orange-100 font-bold text-[10px]">
                {topThree[1].xp}
              </Text>
            </View>
          </View>

          {/* Rank 1 (Center) */}
          <View className="items-center flex-1 z-20">
            <View className="relative mb-2">
              <Crown
                size={32}
                color="#FEF08A"
                fill="#FBBF24"
                className="absolute -top-9 left-1/2 -translate-x-4 animate-bounce"
              />
              <Image
                source={{ uri: topThree[0].avatar }}
                className="w-20 h-20 rounded-full border-[3px] border-[#FBBF24]"
              />
              <View className="absolute -bottom-3 left-1/2 -translate-x-4 bg-[#FBBF24] px-3 py-0.5 rounded-full border-2 border-white dark:border-slate-800 shadow-sm">
                <Text className="text-white font-black text-xs">#1</Text>
              </View>
            </View>
            <Text
              className="text-white font-bold text-sm mb-1 text-center"
              numberOfLines={1}
            >
              {topThree[0].name}
            </Text>
            {/* Podium Box Rank 1 */}
            <View className="bg-gradient-to-b from-orange-400 to-orange-500 dark:from-orange-700 dark:to-orange-800 w-full h-32 rounded-t-xl items-center justify-start pt-3 shadow-lg shadow-orange-700/20 dark:shadow-none border-t border-orange-300/50">
              <Text className="text-white/90 font-bold text-xs">
                {topThree[0].xp} XP
              </Text>
            </View>
          </View>

          {/* Rank 3 (Right) */}
          <View className="items-center flex-1">
            <View className="relative mb-2">
              <Image
                source={{ uri: topThree[2].avatar }}
                className="w-14 h-14 rounded-full border-2 border-orange-200/50"
              />
              <View className="absolute -bottom-2 left-1/2 -translate-x-3 bg-orange-200 dark:bg-orange-900/50 px-2 rounded-full border border-white dark:border-slate-600">
                <Text className="text-orange-800 dark:text-orange-200 font-bold text-[10px]">
                  #3
                </Text>
              </View>
            </View>
            <Text
              className="text-white font-bold text-xs mb-1 text-center"
              numberOfLines={1}
            >
              {topThree[2].name}
            </Text>
            {/* Podium Box Rank 3 */}
            <View className="bg-orange-400/60 dark:bg-orange-700/60 w-full h-20 rounded-t-lg items-center justify-start pt-2 border-t border-orange-300/50">
              <Text className="text-orange-100 font-bold text-[10px]">
                {topThree[2].xp}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* --- 2. List Area --- */}
      {/* Nền list: dark:bg-slate-900 */}
      <View className="flex-1 bg-white dark:bg-slate-900 pt-6">
        <Text className="mx-6 mb-4 text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider">
          Top cao thủ khác
        </Text>
        <FlatList
          data={others}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
