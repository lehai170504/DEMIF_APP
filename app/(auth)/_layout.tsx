import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View className="flex-1 bg-white">
      {/* StatusBar style="dark" để icon pin/sóng màu đen nổi bật trên nền trắng.
        Đặt ở đây sẽ áp dụng cho cả Login và Register.
      */}
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          // 1. Ẩn header mặc định của Expo (vì ta đã tự code header xịn xò có nút Back)
          headerShown: false,

          // 2. Đặt màu nền trắng cho Stack để tránh bị nháy màu đen khi chuyển trang
          contentStyle: { backgroundColor: "#ffffff" },

          // 3. Hiệu ứng chuyển trang mượt mà (trượt ngang từ phải sang)
          animation: "slide_from_right",
        }}
      >
        {/* Định nghĩa các màn hình con */}
        <Stack.Screen name="login" options={{ animation: "fade" }} />
        {/* Login dùng Fade nhẹ nhàng */}

        <Stack.Screen
          name="register"
          options={{ animation: "slide_from_right" }}
        />
        {/* Register trượt sang để tạo cảm giác đi sâu vào luồng */}
      </Stack>
    </View>
  );
}
