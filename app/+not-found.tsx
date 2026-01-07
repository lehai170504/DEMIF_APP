import { Link, Stack } from "expo-router";
import { FileQuestion, Home } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />

      <View className="flex-1 items-center justify-center bg-white p-6">
        {/* 1. Illustration Icon */}
        <View className="w-40 h-40 bg-slate-50 rounded-full items-center justify-center mb-8 border-4 border-slate-100 shadow-sm">
          <FileQuestion size={80} color="#64748B" strokeWidth={1.5} />
          {/* Decor element */}
          <View className="absolute -right-2 -top-2 bg-red-400 w-10 h-10 rounded-full items-center justify-center border-4 border-white">
            <Text className="text-white font-bold text-lg">?</Text>
          </View>
        </View>

        {/* 2. Text Content */}
        <Text className="text-3xl font-black text-slate-800 mb-2 text-center">
          Lạc đường rồi!
        </Text>

        <Text className="text-slate-500 text-center text-base mb-10 px-4 leading-6">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển sang một vũ
          trụ khác.
        </Text>

        {/* 3. Actions */}
        <Link href="/(tabs)" replace asChild>
          <TouchableOpacity className="bg-blue-600 w-full py-4 rounded-2xl flex-row justify-center items-center shadow-lg shadow-blue-200 active:bg-blue-700">
            <Home size={20} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              Về Trang chủ
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/library" replace asChild>
          <TouchableOpacity className="mt-4 py-3">
            <Text className="text-slate-500 font-medium">
              Đến Thư viện bài học
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}
