import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Database,
  Eye,
  Lock,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react-native";
import React from "react";
import {
  Linking,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dữ liệu chính sách (Dễ dàng chỉnh sửa)
const POLICY_SECTIONS = [
  {
    id: 1,
    title: "Thu thập dữ liệu",
    icon: <Database size={20} color="#3B82F6" />, // Blue
    content:
      "Chúng tôi chỉ thu thập các thông tin cần thiết để cải thiện trải nghiệm học tập, bao gồm: tên hiển thị, địa chỉ email, và lịch sử tiến độ học tập. Dữ liệu giọng nói (khi luyện Shadowing) được xử lý ẩn danh và không lưu trữ vĩnh viễn.",
  },
  {
    id: 2,
    title: "Mục đích sử dụng",
    icon: <Eye size={20} color="#F59E0B" />, // Amber
    content:
      "Thông tin của bạn được sử dụng để cá nhân hóa lộ trình học, đồng bộ hóa tiến độ giữa các thiết bị và gửi các thông báo nhắc nhở học tập quan trọng (nếu bạn cho phép).",
  },
  {
    id: 3,
    title: "Cam kết bảo mật",
    icon: <Lock size={20} color="#10B981" />, // Green
    content:
      "Chúng tôi cam kết KHÔNG bao giờ bán, trao đổi hoặc chia sẻ dữ liệu cá nhân của bạn cho bên thứ ba vì mục đích thương mại. Dữ liệu của bạn được mã hóa theo tiêu chuẩn an toàn.",
  },
  {
    id: 4,
    title: "Quyền của người dùng",
    icon: <UserCheck size={20} color="#8B5CF6" />, // Purple
    content:
      "Bạn có toàn quyền yêu cầu xem, chỉnh sửa hoặc xóa hoàn toàn dữ liệu cá nhân của mình khỏi hệ thống của chúng tôi bất cứ lúc nào thông qua phần Cài đặt tài khoản hoặc liên hệ hỗ trợ.",
  },
];

export default function PrivacyScreen() {
  const router = useRouter();

  const handleContactSupport = () => {
    Linking.openURL(
      "mailto:privacy@demif.com?subject=Hỗ trợ về quyền riêng tư"
    );
  };

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* --- Header --- */}
        <View className="flex-row items-center px-6 py-4 bg-white border-b border-slate-100 shadow-sm z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4 w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-100 active:bg-slate-200"
          >
            <ArrowLeft size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text className="text-xl font-black text-slate-900">
            Chính sách bảo mật
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {/* --- Intro Section --- */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm">
              <ShieldCheck size={40} color="#16A34A" />
            </View>
            <Text className="text-center text-slate-900 font-bold text-lg mb-2">
              Bảo vệ quyền riêng tư của bạn
            </Text>
            <Text className="text-center text-slate-500 text-sm leading-6 px-4">
              Chúng tôi minh bạch về cách dữ liệu được sử dụng để bạn yên tâm
              tập trung vào việc học.
            </Text>

            {/* Last Update Badge */}
            <View className="mt-4 bg-slate-200 px-3 py-1 rounded-full">
              <Text className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                Cập nhật lần cuối: 24/10/2025
              </Text>
            </View>
          </View>

          {/* --- Policy List (Cards) --- */}
          <View className="space-y-4">
            {POLICY_SECTIONS.map((section) => (
              <View
                key={section.id}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
              >
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 bg-slate-50 rounded-lg items-center justify-center mr-3">
                    {section.icon}
                  </View>
                  <Text className="font-bold text-slate-800 text-base">
                    {section.title}
                  </Text>
                </View>
                <Text className="text-slate-600 text-sm leading-6 text-justify">
                  {section.content}
                </Text>
              </View>
            ))}
          </View>

          {/* --- Footer Contact --- */}
          <View className="mt-10 mb-6 p-5 bg-orange-50 rounded-2xl border border-orange-100 items-center">
            <Text className="font-bold text-orange-800 mb-1">
              Bạn vẫn còn thắc mắc?
            </Text>
            <Text className="text-orange-600/80 text-xs text-center mb-4">
              Hãy liên hệ với đội ngũ pháp lý của chúng tôi.
            </Text>
            <TouchableOpacity
              onPress={handleContactSupport}
              className="flex-row items-center bg-white px-5 py-2.5 rounded-full border border-orange-200 shadow-sm active:bg-orange-100"
            >
              <Mail size={16} color="#F97316" className="mr-2" />
              <Text className="text-orange-600 font-bold text-sm">
                Gửi Email hỗ trợ
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-center text-slate-300 text-xs mb-8">
            DEMIF © 2025. All rights reserved.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
