import { cn } from "@/src/lib/utils";
import { Crown, Shield } from "lucide-react-native";
import React from "react";
import { FlatList, Image, StatusBar, Text, View } from "react-native";

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
  const topThree = LEADERBOARD.slice(0, 3);
  const others = LEADERBOARD.slice(3);

  const renderItem = ({ item }: { item: (typeof LEADERBOARD)[0] }) => (
    <View
      className={cn(
        "flex-row items-center p-4 mb-3 mx-5 rounded-[20px] border shadow-sm",
        item.isMe
          ? "bg-orange-50 border-orange-200 shadow-orange-100"
          : "bg-white border-slate-100 shadow-slate-100"
      )}
    >
      <Text
        className={cn(
          "font-black w-8 text-center mr-2 text-lg",
          item.isMe ? "text-orange-500" : "text-slate-400"
        )}
      >
        {item.rank}
      </Text>

      <Image
        source={{ uri: item.avatar }}
        className="w-12 h-12 rounded-full bg-slate-200 mr-4 border border-slate-100"
      />

      <View className="flex-1">
        <Text
          className={cn(
            "font-bold text-base mb-0.5",
            item.isMe ? "text-slate-900" : "text-slate-700"
          )}
        >
          {item.name} {item.isMe && "(Bạn)"}
        </Text>
        <View className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
          <View className="h-full bg-orange-400 w-[70%]" />
        </View>
      </View>

      <View className="items-end">
        <Text className="text-orange-600 font-black text-sm">{item.xp}</Text>
        <Text className="text-slate-400 text-[10px] font-bold uppercase">
          XP
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      {/* --- 1. Header & Podium Area --- */}
      <View className="bg-orange-500 rounded-b-[40px] shadow-xl shadow-orange-200 z-10 overflow-hidden pb-6">
        {/* Decor Circles */}
        <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <View className="absolute top-20 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

        {/* Title Bar */}
        <View className="pt-14 px-6 mb-4 flex-row justify-between items-center">
          <View>
            <Text className="text-orange-200 text-xs font-bold uppercase tracking-widest mb-1">
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

        {/* Podium Container - Dùng Flex Row và Items-End để căn chân bằng nhau */}
        <View className="flex-row justify-center items-end px-2 space-x-2">
          {/* Rank 2 (Left) */}
          <View className="items-center flex-1">
            <View className="relative mb-2">
              <Image
                source={{ uri: topThree[1].avatar }}
                className="w-14 h-14 rounded-full border-2 border-slate-300"
              />
              <View className="absolute -bottom-2 left-1/2 -translate-x-3 bg-slate-200 px-2 rounded-full border border-white">
                <Text className="text-slate-600 font-bold text-[10px]">#2</Text>
              </View>
            </View>
            <Text
              className="text-white font-bold text-xs mb-1 text-center"
              numberOfLines={1}
            >
              {topThree[1].name}
            </Text>
            <View className="bg-orange-400/80 w-full h-24 rounded-t-lg items-center justify-start pt-2 border-t border-orange-300">
              <Text className="text-orange-100 font-bold text-[10px]">
                {topThree[1].xp}
              </Text>
            </View>
          </View>

          {/* Rank 1 (Center - To & Cao hơn) */}
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
              <View className="absolute -bottom-3 left-1/2 -translate-x-4 bg-[#FBBF24] px-3 py-0.5 rounded-full border-2 border-white shadow-sm">
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
            <View className="bg-gradient-to-b from-orange-400 to-orange-500 w-full h-32 rounded-t-xl items-center justify-start pt-3 shadow-lg shadow-orange-700/20 border-t border-orange-300/50">
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
                className="w-14 h-14 rounded-full border-2 border-orange-200"
              />
              <View className="absolute -bottom-2 left-1/2 -translate-x-3 bg-orange-200 px-2 rounded-full border border-white">
                <Text className="text-orange-800 font-bold text-[10px]">
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
            <View className="bg-orange-400/60 w-full h-20 rounded-t-lg items-center justify-start pt-2 border-t border-orange-300">
              <Text className="text-orange-100 font-bold text-[10px]">
                {topThree[2].xp}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* --- 2. List Area --- */}
      <View className="flex-1 bg-white pt-6">
        <Text className="mx-6 mb-4 text-slate-500 font-bold text-sm uppercase tracking-wider">
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
