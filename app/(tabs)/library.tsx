import { cn } from "@/src/lib/utils";
import { useRouter } from "expo-router";
import {
  Clock,
  Filter,
  Headphones,
  Mic,
  MoreHorizontal,
  Play,
  Search,
  Star,
  X,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 1. IMPORT HOOK LẤY MÀU (Để đổi màu StatusBar & Icon)
import { useAppTheme } from "@/src/context/ThemeContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CATEGORIES = [
  "All",
  "Business",
  "Daily Life",
  "IELTS",
  "News",
  "TED Talks",
];

const LESSONS = [
  {
    id: "1",

    title: "Business Meeting Basics",

    author: "BBC Learning English",

    level: "B2",

    duration: "15 min",

    type: "Shadowing",

    rating: 4.8,

    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",

    category: "Business",
  },

  {
    id: "2",

    title: "Ordering Coffee in English",

    author: "Real English",

    level: "A2",

    duration: "8 min",

    type: "Dictation",

    rating: 4.5,

    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",

    category: "Daily Life",
  },

  {
    id: "3",

    title: "The Future of AI",

    author: "TED Talks",

    level: "C1",

    duration: "22 min",

    type: "Shadowing",

    rating: 4.9,

    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",

    category: "TED Talks",
  },

  {
    id: "4",

    title: "Travel vocabulary",

    author: "Travel Guide",

    level: "B1",

    duration: "12 min",

    type: "Dictation",

    rating: 4.6,

    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",

    category: "Daily Life",
  },

  {
    id: "5",

    title: "IELTS Speaking Part 1",

    author: "IELTS Liz",

    level: "B1",

    duration: "10 min",

    type: "Shadowing",

    rating: 4.7,

    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",

    category: "IELTS",
  },
];

export default function LibraryScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Lấy theme để xử lý màu Icon
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === "dark";

  // Màu icon chung cho Dark/Light
  const iconColor = isDark ? "#94A3B8" : "#64748B";

  const handleCategoryChange = (cat: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveCategory(cat);
  };

  const filteredLessons = useMemo(() => {
    return LESSONS.filter((lesson) => {
      const matchesCategory =
        activeCategory === "All" || lesson.category === activeCategory;
      const matchesSearch = lesson.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const renderItem = ({ item }: { item: (typeof LESSONS)[0] }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push("/practice/1")}
      // Card nền trắng -> tối: dark:bg-slate-800 dark:border-slate-700
      className="bg-white dark:bg-slate-800 rounded-[24px] mb-6 shadow-sm shadow-orange-100 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden"
    >
      <View className="relative h-48 w-full">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full object-cover"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/10" />
        {/* Badge nền kính mờ */}
        <View className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full flex-row items-center shadow-sm">
          <View
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              item.type === "Shadowing" ? "bg-orange-500" : "bg-green-500"
            )}
          />
          <Text className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {item.level} • {item.type}
          </Text>
        </View>
        <View className="absolute bottom-4 right-4 bg-orange-500 w-12 h-12 rounded-full items-center justify-center shadow-lg shadow-orange-500/40">
          <Play size={20} color="white" fill="white" className="ml-1" />
        </View>
      </View>

      <View className="p-5">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 mr-4">
            <Text className="text-lg font-bold text-slate-800 dark:text-white leading-6 mb-1">
              {item.title}
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              by {item.author}
            </Text>
          </View>
          <TouchableOpacity className="p-1 -mr-2">
            <MoreHorizontal size={20} color={iconColor} />
          </TouchableOpacity>
        </View>

        <View className="h-[1px] bg-slate-100 dark:bg-slate-700 my-3" />

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center">
              <Clock size={14} color="#F97316" />
              <Text className="text-slate-500 dark:text-slate-400 text-xs font-medium ml-1.5">
                {item.duration}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text className="text-slate-500 dark:text-slate-400 text-xs font-medium ml-1.5">
                {item.rating}
              </Text>
            </View>
          </View>

          <View className="bg-slate-50 dark:bg-slate-700/50 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
            {item.type === "Shadowing" ? (
              <Mic size={14} color="#F97316" />
            ) : (
              <Headphones size={14} color="#10B981" />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    // Nền màn hình: dark:bg-slate-900
    <View className="flex-1 bg-white dark:bg-slate-900">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <SafeAreaView className="flex-1" edges={["top"]}>
        <View className="px-6 py-4">
          <Text className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">
            Khám phá bài học
          </Text>
          <Text className="text-3xl font-black text-slate-900 dark:text-white mb-6">
            Thư viện <Text className="text-orange-500">.</Text>
          </Text>

          <View className="flex-row items-center space-x-3">
            {/* Input Search: dark:bg-slate-800 dark:border-slate-700 */}
            <View className="flex-1 flex-row items-center bg-slate-50 dark:bg-slate-800 px-5 py-3 rounded-[20px] border border-slate-100 dark:border-slate-700">
              <Search size={22} color={iconColor} />

              <TextInput
                placeholder="Tìm kiếm chủ đề..."
                // Chữ input: dark:text-white
                className="flex-1 ml-3 text-slate-800 dark:text-white font-medium text-base h-full py-0"
                placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
                selectionColor="#F97316"
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />

              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery("")}
                  className="bg-slate-200 dark:bg-slate-700 p-1 rounded-full"
                >
                  <X size={14} color={iconColor} />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity className="bg-orange-500 p-4 m-1 rounded-[20px] shadow-lg shadow-orange-200 dark:shadow-none active:bg-orange-600">
              <Filter size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            keyboardShouldPersistTaps="handled"
          >
            {CATEGORIES.map((cat, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCategoryChange(cat)}
                // Nút category: dark:bg-slate-800 dark:border-slate-700
                className={cn(
                  "mr-3 px-6 py-3 rounded-full border transition-all",
                  activeCategory === cat
                    ? "bg-orange-500 border-orange-500 shadow-md shadow-orange-200 dark:shadow-none"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                )}
              >
                <Text
                  className={cn(
                    "font-bold text-sm",
                    activeCategory === cat
                      ? "text-white"
                      : "text-slate-600 dark:text-slate-300"
                  )}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filteredLessons}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={() => (
            <View className="flex-row justify-between items-end mb-5 mt-2">
              <Text className="text-slate-800 dark:text-white font-bold text-xl">
                {searchQuery
                  ? `Tìm kiếm: "${searchQuery}"`
                  : activeCategory === "All"
                  ? "Phổ biến nhất 🔥"
                  : `Kết quả: ${activeCategory}`}
              </Text>
              <TouchableOpacity>
                <Text className="text-orange-500 font-bold text-sm">
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-20 opacity-60">
              <Search size={40} color={iconColor} className="mb-4" />
              <Text className="text-slate-400 font-medium text-center px-10">
                Không tìm thấy bài học nào phù hợp với từ khóa "{searchQuery}"
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
