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
  User,
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

export default function RegisterScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar style="dark" />

      {/* 1. Header Decoration (Đồng bộ với Login) */}
      <View className="absolute top-0 left-0 right-0 h-64 bg-slate-900 rounded-b-[40px] shadow-lg shadow-slate-400 z-0 overflow-hidden">
        {/* Decorative Circles (Dark Theme Style) */}
        <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <View className="absolute top-20 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
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
                className="w-10 h-10 bg-white/10 rounded-full items-center justify-center mb-6 active:bg-white/20 backdrop-blur-md border border-white/10"
              >
                <ArrowLeft size={20} color="white" />
              </TouchableOpacity>

              <Text className="text-4xl font-black text-white mb-2">
                Get Started
              </Text>
              <Text className="text-slate-400 text-lg font-medium leading-7">
                Tạo tài khoản miễn phí ngay.
              </Text>
            </View>

            {/* 2. Register Card Container */}
            <View className="bg-white p-6 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
              {/* Inputs Group */}
              <View className="space-y-5 mb-6">
                {/* Full Name Input */}
                <View>
                  <Text className="text-slate-500 text-xs font-bold uppercase ml-1 mb-2">
                    Tên hiển thị
                  </Text>
                  <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl h-14 px-4 focus:border-slate-800 focus:bg-white transition-all">
                    <User size={20} color="#94A3B8" className="mr-3" />
                    <TextInput
                      placeholder="Alex Nguyen"
                      placeholderTextColor="#94A3B8"
                      className="flex-1 font-semibold text-slate-800 h-full text-base"
                      value={fullName}
                      onChangeText={setFullName}
                      cursorColor="#1E293B"
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View>
                  <Text className="text-slate-500 text-xs font-bold uppercase ml-1 mb-2">
                    Email
                  </Text>
                  <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl h-14 px-4 focus:border-slate-800 focus:bg-white transition-all">
                    <Mail size={20} color="#94A3B8" className="mr-3" />
                    <TextInput
                      placeholder="name@email.com"
                      placeholderTextColor="#94A3B8"
                      className="flex-1 font-semibold text-slate-800 h-full text-base"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      cursorColor="#1E293B"
                      keyboardType="email-address"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View>
                  <Text className="text-slate-500 text-xs font-bold uppercase ml-1 mb-2">
                    Mật khẩu
                  </Text>
                  <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl h-14 px-4 focus:border-slate-800 focus:bg-white transition-all">
                    <Lock size={20} color="#94A3B8" className="mr-3" />
                    <TextInput
                      placeholder="Ít nhất 6 ký tự"
                      placeholderTextColor="#94A3B8"
                      className="flex-1 font-semibold text-slate-800 h-full text-base"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      cursorColor="#1E293B"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="p-2"
                    >
                      {showPassword ? (
                        <EyeOff size={20} color="#94A3B8" />
                      ) : (
                        <Eye size={20} color="#94A3B8" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Main Action Button (Dark Theme for Register) */}
              <TouchableOpacity
                onPress={handleRegister}
                disabled={isLoading}
                className={cn(
                  "w-full h-14 bg-slate-900 rounded-2xl flex-row items-center justify-center shadow-lg shadow-slate-300 mb-6 active:scale-[0.98] transition-all",
                  isLoading ? "opacity-70" : "opacity-100"
                )}
              >
                {isLoading ? (
                  <View className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Text className="text-white font-bold text-lg mr-2">
                      Tạo tài khoản
                    </Text>
                    <ChevronRight size={20} color="white" strokeWidth={2.5} />
                  </>
                )}
              </TouchableOpacity>

              {/* Terms */}
              <Text className="text-center text-slate-400 text-xs px-2 leading-5 mb-2">
                Bằng việc đăng ký, bạn đồng ý với{" "}
                <Text className="text-slate-900 font-bold">Điều khoản</Text> &{" "}
                <Text className="text-slate-900 font-bold">
                  Chính sách bảo mật
                </Text>
                .
              </Text>
            </View>

            {/* Social Login (Compact) */}
            <View className="mt-8 mb-4">
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-[1px] bg-slate-200" />
                <Text className="mx-4 text-slate-400 font-bold text-xs">
                  HOẶC ĐĂNG KÝ VỚI
                </Text>
                <View className="flex-1 h-[1px] bg-slate-200" />
              </View>

              <View className="flex-row gap-4 justify-center">
                <TouchableOpacity className="w-14 h-14 bg-white border border-slate-200 rounded-2xl items-center justify-center shadow-sm active:bg-slate-50">
                  <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center">
                    <Text className="text-white font-bold text-[10px]">G</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity className="w-14 h-14 bg-white border border-slate-200 rounded-2xl items-center justify-center shadow-sm active:bg-slate-50">
                  <View className="w-6 h-6 rounded-full bg-black items-center justify-center">
                    <Text className="text-white font-bold text-[10px]">A</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center items-center pb-8">
              <Text className="text-slate-500 font-medium">
                Đã có tài khoản?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text className="text-slate-900 font-bold underline decoration-slate-300">
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
