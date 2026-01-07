import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ArrowRight, Check } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const INTERESTS = [
  "Du lịch ✈️",
  "Kinh doanh 💼",
  "Giao tiếp 🗣️",
  "IELTS 📚",
  "Phim ảnh 🎬",
  "Công nghệ 💻",
  "Âm nhạc 🎵",
  "Văn hóa 🌏",
  "Thể thao ⚽",
  "Ẩm thực 🍜",
];

const SLIDES = [
  {
    id: "1",
    title: "Học Tiếng Anh\nChưa Bao Giờ Dễ Thế",
    subtitle: "DEMIF",
    desc: "Phương pháp Shadowing & AI giúp bạn nói chuẩn bản xứ chỉ sau 30 ngày.",
    image: "https://cdn-icons-png.flaticon.com/512/3655/3655599.png",
  },
  {
    id: "2",
    title: "Cá Nhân Hóa\nLộ Trình Của Bạn",
    subtitle: "SỞ THÍCH",
    desc: "Chọn chủ đề bạn yêu thích để chúng tôi gợi ý bài học phù hợp nhất.",
    type: "selection",
  },
  {
    id: "3",
    title: "Sẵn Sàng\nBứt Phá Giới Hạn?",
    subtitle: "BẮT ĐẦU",
    desc: "Tham gia cùng cộng đồng 1 triệu người học tiếng Anh thành công.",
    image: "https://cdn-icons-png.flaticon.com/512/3014/3014286.png",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests((prev) => prev.filter((i) => i !== item));
    } else {
      setSelectedInterests((prev) => [...prev, item]);
    }
  };

  const handleNext = async () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem("hasLaunched", "true");
        await AsyncStorage.setItem(
          "userInterests",
          JSON.stringify(selectedInterests)
        );
        router.replace("/(tabs)");
      } catch (error) {
        console.error("Lỗi lưu storage:", error);
      }
    }
  };

  const renderItem = ({ item }: { item: (typeof SLIDES)[0] }) => {
    return (
      <View style={{ width }} className="flex-1 px-8 pt-12">
        {/* Header Title Area */}
        <View className="mb-8">
          <Text className="text-orange-500 font-black text-sm tracking-[4px] uppercase mb-2">
            {item.subtitle}
          </Text>
          <Text className="text-4xl font-black text-slate-900 leading-[1.2]">
            {item.title}
          </Text>
        </View>

        {/* Content Area */}
        <View className="flex-1 justify-center items-center -mt-10">
          {item.type === "selection" ? (
            <View className="flex-row flex-wrap gap-3 justify-center">
              {INTERESTS.map((interest) => {
                // Kiểm tra xem item này có được chọn không
                const isSelected = selectedInterests.includes(interest);
                return (
                  <TouchableOpacity
                    key={interest}
                    onPress={() => toggleInterest(interest)}
                    activeOpacity={0.8}
                    className={`px-5 py-3.5 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-200 scale-105"
                        : "bg-slate-50 border-slate-100"
                    }`}
                  >
                    <Text
                      className={`font-bold text-base ${
                        isSelected ? "text-white" : "text-slate-600"
                      }`}
                    >
                      {interest}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <Image
              source={{ uri: item.image }}
              className="w-full h-72 mb-6"
              resizeMode="contain"
            />
          )}
        </View>

        {/* Description Text */}
        <View className="mb-24">
          <Text className="text-slate-500 text-lg font-medium leading-7">
            {item.desc}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        // --- QUAN TRỌNG: Thêm dòng này để fix lỗi ---
        extraData={selectedInterests}
      />

      {/* Footer Controls */}
      <View className="absolute bottom-10 left-8 right-8 flex-row justify-between items-center">
        {/* Pagination Dots */}
        <View className="flex-row gap-2">
          {SLIDES.map((_, i) => (
            <View
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-8 bg-slate-900" : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </View>

        {/* Modern Next Button */}
        <TouchableOpacity
          onPress={handleNext}
          className="w-16 h-16 bg-orange-500 rounded-full items-center justify-center shadow-xl shadow-orange-200 active:bg-orange-600"
        >
          {currentIndex === SLIDES.length - 1 ? (
            <Check size={28} color="white" strokeWidth={3} />
          ) : (
            <ArrowRight size={28} color="white" strokeWidth={3} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
