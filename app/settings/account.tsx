import { useRouter } from "expo-router";
import { ArrowLeft, Camera } from "lucide-react-native";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AccountScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-16 pb-4 border-b border-slate-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">
          Thông tin cá nhân
        </Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Avatar */}
        <View className="items-center mb-8">
          <View className="relative">
            <Image
              source={{ uri: "https://github.com/shadcn.png" }}
              className="w-24 h-24 rounded-full bg-slate-200"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full border-2 border-white">
              <Camera size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forms */}
        <View className="space-y-4">
          <View>
            <Text className="text-slate-500 font-medium mb-1.5 ml-1">
              Họ và tên
            </Text>
            <TextInput
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium text-slate-800"
              value="Alex Nguyen"
            />
          </View>
          <View>
            <Text className="text-slate-500 font-medium mb-1.5 ml-1">
              Email
            </Text>
            <TextInput
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium text-slate-500"
              value="alex.nguyen@example.com"
              editable={false}
            />
          </View>
          <TouchableOpacity className="bg-orange-500 p-4 rounded-xl items-center mt-6">
            <Text className="text-white font-bold text-base">Lưu thay đổi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
