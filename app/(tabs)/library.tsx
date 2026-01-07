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
} from "lucide-react-native";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Dữ liệu giả lập (Giữ nguyên nhưng cập nhật màu sắc logic theo theme cam)
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
    tagColor: "bg-orange-100 text-orange-700",
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
    tagColor: "bg-green-100 text-green-700",
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
    tagColor: "bg-purple-100 text-purple-700",
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
    tagColor: "bg-sky-100 text-sky-700",
  },
];

export default function LibraryScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");

  const renderItem = ({ item }: { item: (typeof LESSONS)[0] }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push("/practice/1")}
      className="bg-white rounded-[24px] mb-6 shadow-sm shadow-orange-100 border border-slate-100 overflow-hidden"
    >
      {/* 1. Image Section with Overlay Tags */}
      <View className="relative h-48 w-full">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full object-cover"
          resizeMode="cover"
        />

        {/* Overlay Gradient (Optional visually simulates gradient via opacity) */}
        <View className="absolute inset-0 bg-black/10" />

        {/* Level Tag (Top Left) */}
        <View className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex-row items-center shadow-sm">
          <View
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              item.type === "Shadowing" ? "bg-orange-500" : "bg-green-500"
            )}
          />
          <Text className="text-xs font-bold text-slate-800">
            {item.level} • {item.type}
          </Text>
        </View>

        {/* Play Button (Center/Bottom Right) */}
        <View className="absolute bottom-4 right-4 bg-orange-500 w-12 h-12 rounded-full items-center justify-center shadow-lg shadow-orange-500/40">
          <Play size={20} color="white" fill="white" className="ml-1" />
        </View>
      </View>

      {/* 2. Content Info */}
      <View className="p-5">
        {/* Title & Author */}
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 mr-4">
            <Text className="text-lg font-bold text-slate-800 leading-6 mb-1">
              {item.title}
            </Text>
            <Text className="text-slate-500 text-sm font-medium">
              by {item.author}
            </Text>
          </View>
          <TouchableOpacity className="p-1 -mr-2">
            <MoreHorizontal size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-slate-100 my-3" />

        {/* Footer Metrics */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center">
              <Clock size={14} color="#F97316" />
              <Text className="text-slate-500 text-xs font-medium ml-1.5">
                {item.duration}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text className="text-slate-500 text-xs font-medium ml-1.5">
                {item.rating}
              </Text>
            </View>
          </View>

          {/* Type Icon Badges */}
          <View className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
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
    <View className="flex-1 bg-white pt-12">
      <StatusBar barStyle="dark-content" />

      {/* --- Header Section --- */}
      <View className="px-6 mb-4">
        <Text className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
          Khám phá bài học
        </Text>
        <Text className="text-3xl font-black text-slate-900 mb-6">
          Thư viện <Text className="text-orange-500">.</Text>
        </Text>

        {/* Search Bar - Modern Web Style */}
        <View className="flex-row items-center space-x-3">
          <View className="flex-1 flex-row items-center bg-slate-50 px-5 py-4 rounded-[20px] border border-slate-100 focus:border-orange-500 transition-colors">
            <Search size={22} color="#94A3B8" />
            <TextInput
              placeholder="Tìm kiếm chủ đề..."
              className="flex-1 ml-3 text-slate-800 font-medium text-base h-full"
              placeholderTextColor="#94A3B8"
              selectionColor="#F97316"
            />
          </View>
          <TouchableOpacity className="bg-orange-500 p-4 rounded-[20px] shadow-lg shadow-orange-200 active:bg-orange-600">
            <Filter size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- Categories (Pill Tabs) --- */}
      <View className="mb-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveCategory(cat)}
              className={cn(
                "mr-3 px-6 py-3 rounded-full border transition-all",
                activeCategory === cat
                  ? "bg-orange-500 border-orange-500 shadow-md shadow-orange-200"
                  : "bg-white border-slate-200"
              )}
            >
              <Text
                className={cn(
                  "font-bold text-sm",
                  activeCategory === cat ? "text-white" : "text-slate-600"
                )}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* --- Main List (Masonry-like Feel) --- */}
      <FlatList
        data={LESSONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="flex-row justify-between items-end mb-5 mt-2">
            <Text className="text-slate-800 font-bold text-xl">
              Phổ biến nhất 🔥
            </Text>
            <TouchableOpacity>
              <Text className="text-orange-500 font-bold text-sm">
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
