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

// Import 2 file vừa tách (Điều chỉnh đường dẫn cho đúng thực tế)
import { TimePickerModal } from "@/components/TimePickerModal";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";

export default function NotificationScreen() {
  const router = useRouter();

  // Gọi Hook để lấy logic
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
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="flex-row items-center px-6 py-4 bg-white border-b border-slate-100 shadow-sm z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4 w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-100 active:bg-slate-200"
          >
            <ArrowLeft size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text className="text-xl font-black text-slate-900">
            Cài đặt thông báo
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3 ml-1">
            Nhắc nhở học tập
          </Text>

          <View className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
            <View className="p-5 flex-row justify-between items-center border-b border-slate-50">
              <View className="flex-row items-center flex-1 pr-4">
                <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
                  <BellRing size={20} color="#F97316" />
                </View>
                <View>
                  <Text className="text-base font-bold text-slate-800">
                    Nhắc nhở hàng ngày
                  </Text>
                  <Text className="text-xs text-slate-500 mt-0.5">
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
                <Clock size={18} color="#64748B" className="mr-2" />
                <Text className="text-slate-600 font-medium">
                  Thời gian nhắc:
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleOpenPicker}
                disabled={!studyReminder}
                className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 active:bg-orange-50 active:border-orange-200"
              >
                <Text className="text-orange-600 font-bold text-base">
                  {formatTime(reminderTime.hour, reminderTime.minute)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3 ml-1">
            Khác
          </Text>

          <View className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6">
            <View className="p-5 flex-row justify-between items-center">
              <View className="flex-row items-center flex-1 pr-4">
                <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                  <Megaphone size={20} color="#3B82F6" />
                </View>
                <View>
                  <Text className="text-base font-bold text-slate-800">
                    Tin tức & Ưu đãi
                  </Text>
                  <Text className="text-xs text-slate-500 mt-0.5">
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
            className="flex-row items-center justify-center p-4 rounded-xl border border-dashed border-slate-300 active:bg-slate-100"
          >
            <Settings size={16} color="#64748B" className="mr-2" />
            <Text className="text-slate-500 font-bold text-xs">
              Mở cài đặt hệ thống
            </Text>
          </TouchableOpacity>

          <Text className="text-center text-slate-400 text-[10px] mt-6 px-10">
            Nếu bạn không nhận được thông báo, vui lòng kiểm tra cài đặt quyền
            trong điện thoại.
          </Text>
        </ScrollView>

        {/* Gọi Component Modal ở đây */}
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
