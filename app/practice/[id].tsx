import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { cn } from "@/src/lib/utils";
import { Audio } from "expo-av";
import { Stack, useRouter } from "expo-router";
import {
  ArrowLeft,
  CheckCircle,
  Mic,
  MoreHorizontal,
  Pause,
  Play,
  RotateCcw,
  Save,
  Volume2,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// 1. IMPORT HOOK LẤY MÀU
import { useAppTheme } from "@/src/context/ThemeContext";

export default function PracticeScreen() {
  const router = useRouter();

  // 2. LẤY TRẠNG THÁI THEME
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#94A3B8" : "#1E293B"; // Màu icon header

  // State quản lý UI
  const [mode, setMode] = useState<"dictation" | "shadowing">("dictation");
  const [isPlaying, setIsPlaying] = useState(false);
  const [textInput, setTextInput] = useState("");

  // Hook ghi âm
  const { isRecording, startRecording, stopRecording, audioUri } =
    useAudioRecorder();

  // Xử lý logic nút Micro
  const handleMicPress = async () => {
    if (isRecording) {
      const uri = await stopRecording();
      if (uri) {
        console.log("File ghi âm tại:", uri);
        setTimeout(() => {
          router.push("/result/1");
        }, 1000);
      }
    } else {
      await startRecording();
    }
  };

  // Xử lý nghe lại giọng vừa thu
  const handlePlayRecordedAudio = async () => {
    if (!audioUri) return;
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      await sound.playAsync();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể phát file ghi âm");
    }
  };

  return (
    // Nền chính: dark:bg-slate-900
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white dark:bg-slate-900"
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#0F172A" : "#FFFFFF"}
      />

      {/* --- 1. Header --- */}
      <View className="pt-14 pb-4 px-6 flex-row justify-between items-center bg-white dark:bg-slate-900 z-10 border-b border-transparent dark:border-slate-800">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full items-center justify-center border border-slate-100 dark:border-slate-700 active:bg-slate-100 dark:active:bg-slate-700"
        >
          <ArrowLeft size={20} color={isDark ? "white" : "#1E293B"} />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-xs text-orange-500 dark:text-orange-400 font-bold uppercase tracking-wider mb-0.5">
            Lesson 3/5
          </Text>
          <Text className="font-black text-slate-800 dark:text-white text-lg">
            Meeting Basics
          </Text>
        </View>

        <TouchableOpacity className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full items-center justify-center border border-slate-100 dark:border-slate-700 active:bg-slate-100 dark:active:bg-slate-700">
          <MoreHorizontal size={20} color={isDark ? "white" : "#1E293B"} />
        </TouchableOpacity>
      </View>

      {/* --- 2. Mode Switcher (Pill Tabs) --- */}
      <View className="flex-row mx-6 mt-2 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-[20px] border border-slate-100 dark:border-slate-700">
        {["dictation", "shadowing"].map((m) => (
          <TouchableOpacity
            key={m}
            onPress={() => setMode(m as any)}
            className={cn(
              "flex-1 py-3 items-center rounded-[16px] transition-all",
              mode === m
                ? "bg-white dark:bg-slate-700 shadow-sm shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-600"
                : "opacity-50"
            )}
          >
            <Text
              className={cn(
                "capitalize font-bold text-sm",
                mode === m
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              {m === "dictation" ? "Nghe chép" : "Shadowing"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --- 3. Main Content ScrollView --- */}
      <ScrollView
        className="flex-1 px-6 mt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {/* Audio Visualizer (Waveform) */}
        {/* Giữ nền cam nhạt ở light, cam tối ở dark */}
        <View className="h-32 bg-orange-50 dark:bg-orange-900/10 rounded-[32px] border border-orange-100 dark:border-orange-900/30 flex-row items-center justify-center space-x-1.5 mb-8 px-8 overflow-hidden relative">
          {/* Decor Icon */}
          <View className="absolute top-4 left-4 opacity-20">
            <Volume2 size={24} color="#F97316" />
          </View>

          {[...Array(20)].map((_, i) => (
            <View
              key={i}
              className={cn(
                "w-1.5 rounded-full transition-all duration-300",
                isPlaying
                  ? "bg-orange-500 shadow-sm shadow-orange-300 dark:shadow-none"
                  : "bg-orange-200 dark:bg-orange-800/50"
              )}
              style={{
                height: isPlaying ? Math.random() * 60 + 20 : 12,
                opacity: isPlaying ? 1 : 0.5,
              }}
            />
          ))}
        </View>

        {/* --- CONTENT THEO MODE --- */}
        {mode === "dictation" ? (
          // === DICTATION UI ===
          <View className="space-y-5">
            <View className="flex-row justify-between items-end px-1">
              <Text className="text-slate-800 dark:text-white font-bold text-lg">
                Nội dung nghe được
              </Text>
              <View className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                <Text className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {textInput.length} chars
                </Text>
              </View>
            </View>

            <TextInput
              // Input: dark:bg-slate-800 dark:text-white dark:border-slate-700
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[24px] p-5 text-lg text-slate-800 dark:text-white min-h-[200px] leading-8 shadow-sm dark:shadow-none focus:border-orange-500 dark:focus:border-orange-500 focus:shadow-orange-100"
              multiline
              placeholder="Gõ nội dung bạn nghe được tại đây..."
              placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
              textAlignVertical="top"
              value={textInput}
              onChangeText={setTextInput}
              selectionColor="#F97316"
              keyboardAppearance={isDark ? "dark" : "light"}
            />

            <View className="flex-row justify-end space-x-3 pt-2">
              <TouchableOpacity className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-5 py-4 rounded-[20px] items-center justify-center active:bg-slate-100 dark:active:bg-slate-700">
                <Save size={22} color={isDark ? "#94A3B8" : "#64748B"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/result/1")}
                className="bg-orange-500 flex-1 flex-row items-center justify-center px-5 py-4 rounded-[20px] shadow-lg shadow-orange-200 dark:shadow-none active:bg-orange-600 border-b-4 border-orange-600 active:border-b-0 active:translate-y-1"
              >
                <CheckCircle size={20} color="white" />
                <Text className="text-white font-bold ml-2 text-base">
                  Kiểm tra kết quả
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // === SHADOWING UI ===
          <View className="space-y-8 items-center w-full">
            {/* Script Box */}
            <View className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-none w-full relative">
              <View className="absolute -top-3 left-6 bg-orange-50 dark:bg-orange-900/30 px-3 py-1 border border-orange-100 dark:border-orange-900/50 rounded-full">
                <Text className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase">
                  Script mẫu
                </Text>
              </View>
              <Text className="text-2xl text-slate-700 dark:text-slate-200 font-medium leading-10 text-center mt-2">
                "Good morning everyone. Let's get started by reviewing the
                agenda for today."
              </Text>
              <Text className="text-center text-orange-500 dark:text-orange-400 text-xs font-bold mt-2">
                (Từ khóa: agenda, reviewing)
              </Text>
            </View>

            {/* Recording Controls */}
            <View className="items-center w-full">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleMicPress}
                className={cn(
                  "w-24 h-24 rounded-full items-center justify-center shadow-xl border-[6px] transition-all",
                  isRecording
                    ? "bg-white dark:bg-slate-800 border-red-500 shadow-red-200 dark:shadow-none"
                    : "bg-orange-500 border-orange-100 dark:border-orange-900/30 shadow-orange-200 dark:shadow-none"
                )}
              >
                {isRecording ? (
                  <View className="w-8 h-8 bg-red-500 rounded-lg animate-pulse" />
                ) : (
                  <Mic size={36} color="white" />
                )}
              </TouchableOpacity>

              <Text className="text-slate-400 dark:text-slate-500 text-sm mt-5 font-bold h-6 uppercase tracking-wide">
                {isRecording
                  ? "Đang thu âm..."
                  : audioUri
                  ? "Đã lưu bản thu!"
                  : "Nhấn để nói"}
              </Text>

              {/* Player cho bản ghi âm */}
              {audioUri && !isRecording && (
                <TouchableOpacity
                  onPress={handlePlayRecordedAudio}
                  className="mt-4 flex-row items-center bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 px-6 py-3 rounded-full active:bg-orange-100 dark:active:bg-orange-900/30"
                >
                  <Play size={18} color="#F97316" fill="#F97316" />
                  <Text className="ml-2 text-orange-600 dark:text-orange-400 font-bold text-sm">
                    Nghe lại giọng bạn
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* --- 4. Bottom Player Controls (Floating Style) --- */}
      <View className="absolute bottom-8 left-6 right-6 bg-white dark:bg-slate-800 rounded-[24px] px-5 py-4 flex-row justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none border border-slate-100 dark:border-slate-700">
        <TouchableOpacity className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700 active:bg-slate-200 dark:active:bg-slate-700">
          <Text className="font-bold text-xs text-slate-600 dark:text-slate-300">
            0.75x
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-6">
          <TouchableOpacity className="p-3 active:scale-90 transition-transform">
            <RotateCcw size={24} color={isDark ? "#94A3B8" : "#94A3B8"} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-orange-500 rounded-full items-center justify-center shadow-lg shadow-orange-300 dark:shadow-none active:bg-orange-600 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause size={28} color="white" fill="white" />
            ) : (
              <Play size={28} color="white" fill="white" className="ml-1" />
            )}
          </TouchableOpacity>

          <TouchableOpacity className="p-3 active:scale-90 transition-transform rotate-180">
            <RotateCcw size={24} color={isDark ? "#94A3B8" : "#94A3B8"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700 active:bg-slate-200 dark:active:bg-slate-700">
          <Text className="font-bold text-xs text-slate-600 dark:text-slate-300">
            Gợi ý
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
