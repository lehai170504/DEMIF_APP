import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Tắt header mặc định cho TẤT CẢ các file trong thư mục này
        animation: "slide_from_right", // (Tùy chọn) Thêm hiệu ứng chuyển trang cho mượt
      }}
    />
  );
}
