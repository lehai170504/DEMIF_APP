import { cn } from "@/src/lib/utils";
import {
  Clock,
  Flame,
  Mic,
  Share2,
  TrendingUp,
  Type,
  Zap,
} from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatsScreen() {
  // Dữ liệu giả cho biểu đồ tuần
  const WEEKLY_DATA = [40, 70, 30, 85, 50, 90, 20];
  const DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* 1. Header Section */}
          <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-100 mb-6">
            <View>
              <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                Tổng quan
              </Text>
              <Text className="text-2xl font-black text-slate-900">
                Thống kê
              </Text>
            </View>
            <TouchableOpacity className="bg-slate-50 p-2.5 rounded-full border border-slate-100 active:bg-slate-100">
              <Share2 size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* 2. Hero Streak Card (Nổi bật nhất) */}
          <View className="px-6 mb-6">
            <View className="bg-slate-900 p-5 rounded-[24px] shadow-xl shadow-slate-200 overflow-hidden relative">
              {/* Decor Background */}
              <View className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -mr-10 -mt-10" />

              <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center">
                  <View className="bg-orange-500/20 p-2.5 rounded-full mr-3">
                    <Flame size={20} color="#F97316" fill="#F97316" />
                  </View>
                  <Text className="text-white font-bold text-lg">
                    Chuỗi ngày học
                  </Text>
                </View>
                <View className="bg-white/10 px-3 py-1 rounded-full">
                  <Text className="text-orange-400 font-bold text-xs">
                    Top 5%
                  </Text>
                </View>
              </View>

              <View className="flex-row items-baseline mb-2">
                <Text className="text-white text-5xl font-black mr-2">12</Text>
                <Text className="text-slate-400 font-bold text-lg">ngày</Text>
              </View>
              <Text className="text-slate-500 text-xs">
                Giữ vững phong độ! Bạn đang làm rất tốt.
              </Text>
            </View>
          </View>

          {/* 3. Small Stats Grid */}
          <View className="px-6 mb-8 flex-row gap-4">
            {/* Time Card */}
            <View className="flex-1 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
              <View className="bg-blue-50 w-10 h-10 rounded-full items-center justify-center mb-3">
                <Clock size={20} color="#3B82F6" />
              </View>
              <Text className="text-slate-400 text-xs font-bold uppercase mb-1">
                Thời gian
              </Text>
              <Text className="text-slate-800 text-2xl font-black">
                12.5<Text className="text-sm text-slate-400 font-bold">h</Text>
              </Text>
            </View>

            {/* Words Card */}
            <View className="flex-1 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
              <View className="bg-green-50 w-10 h-10 rounded-full items-center justify-center mb-3">
                <Type size={20} color="#10B981" />
              </View>
              <Text className="text-slate-400 text-xs font-bold uppercase mb-1">
                Từ vựng
              </Text>
              <Text className="text-slate-800 text-2xl font-black">482</Text>
            </View>
          </View>

          {/* 4. Weekly Chart */}
          <View className="px-6 mb-8">
            <View className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="font-bold text-slate-800 text-lg">
                  Hoạt động tuần
                </Text>
                <Text className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">
                  TB: 45p
                </Text>
              </View>

              {/* Chart Bars */}
              <View className="flex-row items-end justify-between h-32">
                {WEEKLY_DATA.map((height, index) => {
                  const isToday = index === 5; // Giả sử T7 là hôm nay
                  return (
                    <View key={index} className="items-center w-8 gap-2">
                      <View
                        className={cn(
                          "w-2.5 rounded-full",
                          isToday
                            ? "bg-orange-500 shadow-lg shadow-orange-300"
                            : "bg-slate-100"
                        )}
                        style={{ height: `${height}%` }}
                      />
                      <Text
                        className={cn(
                          "text-[10px] font-bold",
                          isToday ? "text-orange-600" : "text-slate-300"
                        )}
                      >
                        {DAYS[index]}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          {/* 5. AI Skills Analysis */}
          <View className="px-6 pb-6">
            <Text className="text-lg font-bold text-slate-900 mb-4">
              Phân tích kỹ năng
            </Text>
            <View className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
              {/* Skill Item 1 */}
              <View className="p-5 border-b border-slate-50">
                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-orange-100 p-2 rounded-xl">
                      <Mic size={18} color="#F97316" />
                    </View>
                    <Text className="font-bold text-slate-700">Phát âm</Text>
                  </View>
                  <Text className="font-black text-slate-800">
                    85
                    <Text className="text-slate-400 text-xs font-bold">
                      /100
                    </Text>
                  </Text>
                </View>
                <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <View className="h-full bg-orange-500 w-[85%] rounded-full" />
                </View>
              </View>

              {/* Skill Item 2 */}
              <View className="p-5 border-b border-slate-50">
                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-blue-100 p-2 rounded-xl">
                      <Zap size={18} color="#3B82F6" />
                    </View>
                    <Text className="font-bold text-slate-700">Ngữ điệu</Text>
                  </View>
                  <Text className="font-black text-slate-800">
                    62
                    <Text className="text-slate-400 text-xs font-bold">
                      /100
                    </Text>
                  </Text>
                </View>
                <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <View className="h-full bg-blue-500 w-[62%] rounded-full" />
                </View>
              </View>

              {/* Skill Item 3 */}
              <View className="p-5">
                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-green-100 p-2 rounded-xl">
                      <TrendingUp size={18} color="#10B981" />
                    </View>
                    <Text className="font-bold text-slate-700">
                      Độ lưu loát
                    </Text>
                  </View>
                  <Text className="font-black text-slate-800">
                    78
                    <Text className="text-slate-400 text-xs font-bold">
                      /100
                    </Text>
                  </Text>
                </View>
                <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <View className="h-full bg-green-500 w-[78%] rounded-full" />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
