import { useRouter } from "expo-router";
import { ArrowLeft, ShieldCheck } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center px-6 pt-16 pb-4 border-b border-slate-100 bg-white z-10">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 p-1">
          <ArrowLeft size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">
          Chính sách bảo mật
        </Text>
      </View>

      <ScrollView
        className="flex-1 p-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Intro Icon */}
        <View className="items-center mb-8 mt-2">
          <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
            <ShieldCheck size={32} color="#16A34A" />
          </View>
          <Text className="text-center text-slate-500 text-sm px-4 leading-6">
            Chúng tôi cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn
            theo tiêu chuẩn cao nhất.
          </Text>
        </View>

        {/* Content Section */}
        <View className="space-y-6">
          <View>
            <Text className="text-lg font-bold text-slate-900 mb-2">
              1. Thu thập dữ liệu
            </Text>
            <Text className="text-slate-600 leading-6 text-justify">
              Chúng tôi chỉ thu thập các thông tin cần thiết để cải thiện trải
              nghiệm học tập của bạn, bao gồm: tên, địa chỉ email, và tiến độ
              học tập. Dữ liệu giọng nói (khi luyện nói) được xử lý ẩn danh.
            </Text>
          </View>

          <View>
            <Text className="text-lg font-bold text-slate-900 mb-2">
              2. Sử dụng thông tin
            </Text>
            <Text className="text-slate-600 leading-6 text-justify">
              Thông tin của bạn được sử dụng để:
              {"\n"}• Cá nhân hóa lộ trình học.
              {"\n"}• Đồng bộ hóa tiến độ giữa các thiết bị.
              {"\n"}• Gửi thông báo nhắc nhở học tập (nếu được cho phép).
            </Text>
          </View>

          <View>
            <Text className="text-lg font-bold text-slate-900 mb-2">
              3. Chia sẻ dữ liệu
            </Text>
            <Text className="text-slate-600 leading-6 text-justify">
              Chúng tôi{" "}
              <Text className="font-bold text-slate-800">không bao giờ</Text>{" "}
              bán dữ liệu cá nhân của bạn cho bên thứ ba. Dữ liệu chỉ được chia
              sẻ khi có yêu cầu pháp lý bắt buộc.
            </Text>
          </View>

          <View>
            <Text className="text-lg font-bold text-slate-900 mb-2">
              4. Quyền của bạn
            </Text>
            <Text className="text-slate-600 leading-6 text-justify">
              Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa hoàn toàn dữ liệu cá
              nhân của mình khỏi hệ thống của chúng tôi bất cứ lúc nào thông qua
              phần Cài đặt tài khoản.
            </Text>
          </View>
        </View>

        <View className="mt-10 pt-6 border-t border-slate-100">
          <Text className="text-slate-400 text-xs text-center">
            Cập nhật lần cuối: 24/10/2025
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
