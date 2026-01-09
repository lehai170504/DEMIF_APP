import { useRouter } from "expo-router";
import {
  ArrowLeft,
  BellRing,
  Clock,
  Megaphone,
  Settings,
} from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import 2 file vừa tách
import { TimePickerModal } from "@/components/TimePickerModal";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";

// 1. IMPORT HOOK LẤY MÀU
import { useAppTheme } from "@/src/context/ThemeContext";

export default function NotificationScreen() {
  const router = useRouter();

  // 2. LẤY TRẠNG THÁI THEME
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#F8FAFC" : "#0F172A"; // Màu mũi tên header
  const subIconColor = isDark ? "#94A3B8" : "#64748B"; // Màu icon phụ (Clock, Settings)

  const {
    studyReminder,
    setStudyReminder,
    news,
    setNews,
    reminderTime,
    isTimePickerVisible,
    tempHour,
    setTempHour,
    tempMinute,
    setTempMinute,
    formatTime,
    openSystemSettings,
    handleOpenPicker,
    handleSaveTime,
    handleClosePicker,
  } = useNotificationSettings();

  return (
    // Nền chính: dark:bg-slate-900
    <View className="flex-1 bg-slate-50 dark:bg-slate-900">
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#0F172A" : "#FFFFFF"}
      />
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="flex-row items-center px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4 w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full items-center justify-center border border-slate-100 dark:border-slate-700 active:bg-slate-200 dark:active:bg-slate-700"
          >
            <ArrowLeft size={20} color={iconColor} />
          </TouchableOpacity>
          <Text className="text-xl font-black text-slate-900 dark:text-white">
            Cài đặt thông báo
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 ml-1">
            Nhắc nhở học tập
          </Text>

          {/* Card Container: dark:bg-slate-800 dark:border-slate-700 */}
          <View className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-none overflow-hidden mb-6">
            <View className="p-5 flex-row justify-between items-center border-b border-slate-50 dark:border-slate-700/50">
              <View className="flex-row items-center flex-1 pr-4">
                <View className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full items-center justify-center mr-3">
                  <BellRing size={20} color="#F97316" />
                </View>
                <View>
                  <Text className="text-base font-bold text-slate-800 dark:text-white">
                    Nhắc nhở hàng ngày
                  </Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Giúp bạn duy trì Streak
                  </Text>
                </View>
              </View>
              <Switch
                value={studyReminder}
                onValueChange={setStudyReminder}
                trackColor={{ false: "#E2E8F0", true: "#F97316" }}
                thumbColor={"#FFFFFF"}
              />
            </View>

            <View
              className={`p-5 flex-row justify-between items-center ${
                !studyReminder ? "opacity-50" : ""
              }`}
            >
              <View className="flex-row items-center">
                <Clock size={18} color={subIconColor} className="mr-2" />
                <Text className="text-slate-600 dark:text-slate-300 font-medium">
                  Thời gian nhắc:
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleOpenPicker}
                disabled={!studyReminder}
                className="bg-slate-50 dark:bg-slate-700 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 active:bg-orange-50 active:border-orange-200"
              >
                <Text className="text-orange-600 dark:text-orange-400 font-bold text-base">
                  {formatTime(reminderTime.hour, reminderTime.minute)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 ml-1">
            Khác
          </Text>

          <View className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-none mb-6">
            <View className="p-5 flex-row justify-between items-center">
              <View className="flex-row items-center flex-1 pr-4">
                <View className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full items-center justify-center mr-3">
                  <Megaphone size={20} color="#3B82F6" />
                </View>
                <View>
                  <Text className="text-base font-bold text-slate-800 dark:text-white">
                    Tin tức & Ưu đãi
                  </Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Cập nhật bài học mới
                  </Text>
                </View>
              </View>
              <Switch
                value={news}
                onValueChange={setNews}
                trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
                thumbColor={"#FFFFFF"}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={openSystemSettings}
            className="flex-row items-center justify-center p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 active:bg-slate-100 dark:active:bg-slate-800"
          >
            <Settings size={16} color={subIconColor} className="mr-2" />
            <Text className="text-slate-500 dark:text-slate-400 font-bold text-xs">
              Mở cài đặt hệ thống
            </Text>
          </TouchableOpacity>

          <Text className="text-center text-slate-400 dark:text-slate-500 text-[10px] mt-6 px-10 mb-10">
            Nếu bạn không nhận được thông báo, vui lòng kiểm tra cài đặt quyền
            trong điện thoại.
          </Text>
        </ScrollView>

        {/* Gọi Component Modal */}
        <TimePickerModal
          visible={isTimePickerVisible}
          onClose={handleClosePicker}
          onSave={handleSaveTime}
          tempHour={tempHour}
          setTempHour={setTempHour}
          tempMinute={tempMinute}
          setTempMinute={setTempMinute}
        />
      </SafeAreaView>
    </View>
  );
}
