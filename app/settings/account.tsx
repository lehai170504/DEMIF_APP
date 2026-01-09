import { Stack, useRouter } from "expo-router";
import {
  ArrowLeft,
  Camera,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// 1. IMPORT HOOK LẤY MÀU
import { useAppTheme } from "@/src/context/ThemeContext";

export default function AccountScreen() {
  const router = useRouter();

  // 2. LẤY TRẠNG THÁI THEME
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#94A3B8" : "#64748B"; // Màu icon input

  // Quản lý dữ liệu Form bằng State
  const [profile, setProfile] = useState({
    name: "Alex Nguyen",
    phone: "0912 345 678",
    address: "Quận 1, TP. Hồ Chí Minh",
    email: "alex.nguyen@example.com",
  });

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    console.log("Dữ liệu mới:", profile);
    Alert.alert("Thành công", "Thông tin đã được cập nhật!");
  };

  return (
    // Nền chính: dark:bg-slate-900
    <View className="flex-1 bg-white dark:bg-slate-900">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#0F172A" : "#FFFFFF"}
      />

      {/* Custom Header */}
      <View className="flex-row items-center px-6 pt-16 pb-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4 p-1 active:opacity-50"
        >
          <ArrowLeft size={24} color={isDark ? "white" : "#0F172A"} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900 dark:text-white">
          Thông tin cá nhân
        </Text>
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        {/* --- Avatar Section --- */}
        <View className="items-center mb-8">
          <View className="relative">
            <Image
              source={{ uri: "https://github.com/shadcn.png" }}
              className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-800"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-orange-500 p-2.5 rounded-full border-4 border-white dark:border-slate-900 shadow-sm active:bg-orange-600">
              <Camera size={18} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="mt-3 text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-wider">
            Chạm để đổi ảnh
          </Text>
        </View>

        {/* --- Form Section --- */}
        <View className="space-y-5 pb-10">
          {/* 1. Họ và tên */}
          <View>
            <View className="flex-row items-center mb-2 ml-1">
              <User size={16} color={iconColor} className="mr-1.5" />
              <Text className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase">
                Họ và tên
              </Text>
            </View>
            <TextInput
              // Input: dark:bg-slate-800 dark:text-white dark:border-slate-700
              className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-white text-base focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800"
              value={profile.name}
              onChangeText={(val) => handleChange("name", val)}
              placeholder="Nhập họ tên..."
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              selectionColor="#F97316"
            />
          </View>

          {/* 2. Số điện thoại */}
          <View>
            <View className="flex-row items-center mb-2 ml-1">
              <Phone size={16} color={iconColor} className="mr-1.5" />
              <Text className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase">
                Số điện thoại
              </Text>
            </View>
            <TextInput
              className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-slate-800 dark:text-white text-base focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800"
              value={profile.phone}
              onChangeText={(val) => handleChange("phone", val)}
              placeholder="Nhập số điện thoại..."
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              keyboardType="phone-pad"
              selectionColor="#F97316"
            />
          </View>

          {/* 3. Địa chỉ */}
          <View>
            <View className="flex-row items-center mb-2 ml-1">
              <MapPin size={16} color={iconColor} className="mr-1.5" />
              <Text className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase">
                Địa chỉ
              </Text>
            </View>
            <TextInput
              className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-slate-800 dark:text-white text-base focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800"
              value={profile.address}
              onChangeText={(val) => handleChange("address", val)}
              placeholder="Nhập địa chỉ..."
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              selectionColor="#F97316"
            />
          </View>

          {/* 4. Email (Không cho sửa) */}
          <View>
            <View className="flex-row items-center mb-2 ml-1">
              <Mail size={16} color="#94A3B8" className="mr-1.5" />
              <Text className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase">
                Email (Không thể thay đổi)
              </Text>
            </View>
            {/* View Read-only: dark:bg-slate-800/50 */}
            <View className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 opacity-80">
              <Text className="font-medium text-slate-500 dark:text-slate-400 text-base">
                {profile.email}
              </Text>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-orange-500 p-4 rounded-xl items-center mt-4 shadow-lg shadow-orange-200 dark:shadow-none active:bg-orange-600"
          >
            <Text className="text-white font-bold text-base uppercase tracking-wide">
              Lưu thay đổi
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
