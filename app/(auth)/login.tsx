import { cn } from "@/src/lib/utils";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 1. IMPORT HOOK LẤY MÀU
import { useAppTheme } from "@/src/context/ThemeContext";

export default function LoginScreen() {
  const router = useRouter();

  // 2. LẤY TRẠNG THÁI THEME
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === "dark";
  const inputIconColor = "#94A3B8"; // Màu icon input (Slate-400) dùng chung

  // State quản lý form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  return (
    // Nền chính: dark:bg-slate-900
    <View className="flex-1 bg-slate-50 dark:bg-slate-900">
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* 1. Modern Header Decoration (Background Blob) */}
      {/* Giữ nguyên màu cam để tạo điểm nhấn thương hiệu */}
      <View className="absolute top-0 left-0 right-0 h-64 bg-orange-500 rounded-b-[40px] shadow-lg shadow-orange-200 dark:shadow-none z-0 overflow-hidden">
        {/* Decorative Circles */}
        <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <View className="absolute top-20 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      </View>

      <SafeAreaView className="flex-1 z-10">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            className="flex-1 px-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {/* Header Content */}
            <View className="mt-2 mb-8">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-6 active:bg-white/30 backdrop-blur-md"
              >
                <ArrowLeft size={20} color="white" />
              </TouchableOpacity>

              <Text className="text-4xl font-black text-white mb-2 shadow-sm">
                Welcome Back!
              </Text>
              <Text className="text-orange-100 text-lg font-medium leading-7">
                Đăng nhập để tiếp tục hành trình học tập.
              </Text>
            </View>

            {/* 2. Login Card Container */}
            {/* Card: dark:bg-slate-800 dark:border-slate-700 */}
            <View className="bg-white dark:bg-slate-800 p-6 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
              {/* Inputs Group */}
              <View className="space-y-5 mb-6">
                {/* Email Input */}
                <View>
                  <Text className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase ml-1 mb-2">
                    Email
                  </Text>
                  {/* Input Container: dark:bg-slate-900 dark:border-slate-700 */}
                  <View className="flex-row items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl h-14 px-4 focus:border-orange-500 dark:focus:border-orange-500 focus:bg-orange-50/30 dark:focus:bg-slate-800 transition-all">
                    <Mail size={20} color={inputIconColor} className="mr-3" />
                    <TextInput
                      placeholder="name@example.com"
                      placeholderTextColor="#94A3B8"
                      // Input Text: dark:text-white
                      className="flex-1 font-semibold text-slate-800 dark:text-white h-full text-base"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      cursorColor="#F97316"
                      keyboardType="email-address"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View>
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase ml-1">
                      Mật khẩu
                    </Text>
                    <TouchableOpacity>
                      <Text className="text-orange-500 font-bold text-xs">
                        Quên mật khẩu?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl h-14 px-4 focus:border-orange-500 dark:focus:border-orange-500 focus:bg-orange-50/30 dark:focus:bg-slate-800 transition-all">
                    <Lock size={20} color={inputIconColor} className="mr-3" />
                    <TextInput
                      placeholder="••••••••"
                      placeholderTextColor="#94A3B8"
                      className="flex-1 font-semibold text-slate-800 dark:text-white h-full text-base"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      cursorColor="#F97316"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="p-2"
                    >
                      {showPassword ? (
                        <EyeOff size={20} color={inputIconColor} />
                      ) : (
                        <Eye size={20} color={inputIconColor} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Main Action Button */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                className={cn(
                  "w-full h-14 bg-orange-500 rounded-2xl flex-row items-center justify-center shadow-lg shadow-orange-300 dark:shadow-none mb-6 active:scale-[0.98] transition-all",
                  isLoading ? "opacity-70" : "opacity-100"
                )}
              >
                {isLoading ? (
                  <View className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Text className="text-white font-bold text-lg mr-2">
                      Đăng nhập
                    </Text>
                    <ChevronRight size={20} color="white" strokeWidth={2.5} />
                  </>
                )}
              </TouchableOpacity>

              {/* Social Login */}
              <View className="items-center mb-2">
                <Text className="text-slate-400 text-xs font-bold mb-4">
                  HOẶC TIẾP TỤC VỚI
                </Text>
                <View className="flex-row gap-4 w-full">
                  {/* Google Button */}
                  <TouchableOpacity className="flex-1 h-12 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl items-center justify-center flex-row shadow-sm dark:shadow-none active:bg-slate-50 dark:active:bg-slate-600">
                    <View className="w-5 h-5 rounded-full bg-red-500 items-center justify-center mr-2">
                      <Text className="text-white font-bold text-[10px]">
                        G
                      </Text>
                    </View>
                    <Text className="font-bold text-slate-600 dark:text-slate-200">
                      Google
                    </Text>
                  </TouchableOpacity>

                  {/* Apple Button */}
                  <TouchableOpacity className="flex-1 h-12 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl items-center justify-center flex-row shadow-sm dark:shadow-none active:bg-slate-50 dark:active:bg-slate-600">
                    <View className="w-5 h-5 rounded-full bg-black items-center justify-center mr-2">
                      <Text className="text-white font-bold text-[10px]">
                        A
                      </Text>
                    </View>
                    <Text className="font-bold text-slate-600 dark:text-slate-200">
                      Apple
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-slate-500 dark:text-slate-400 font-medium">
                Bạn mới đến đây?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text className="text-orange-600 dark:text-orange-400 font-bold underline decoration-orange-200 dark:decoration-orange-900">
                  Tạo tài khoản
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
