import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

export default function NotificationScreen() {
  const router = useRouter();
  const [reminders, setReminders] = useState(true);
  const [news, setNews] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center px-6 pt-16 pb-4 border-b border-slate-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">Thông báo</Text>
      </View>

      <View className="p-6">
        <View className="flex-row justify-between items-center py-4 border-b border-slate-50">
          <Text className="text-lg text-slate-800 font-medium">
            Nhắc nhở học tập
          </Text>
          <Switch
            value={reminders}
            onValueChange={setReminders}
            trackColor={{ false: "#E2E8F0", true: "#F97316" }}
          />
        </View>
        <View className="flex-row justify-between items-center py-4 border-b border-slate-50">
          <Text className="text-lg text-slate-800 font-medium">
            Tin tức & Khuyến mãi
          </Text>
          <Switch
            value={news}
            onValueChange={setNews}
            trackColor={{ false: "#E2E8F0", true: "#F97316" }}
          />
        </View>
      </View>
    </View>
  );
}
