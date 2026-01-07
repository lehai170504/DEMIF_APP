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

export default function PracticeScreen() {
  const router = useRouter();

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
        // Sau khi ghi âm xong, giả lập chuyển sang màn hình kết quả sau 1s
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />

      {/* --- 1. Header --- */}
      <View className="pt-14 pb-4 px-6 flex-row justify-between items-center bg-white z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-100 active:bg-slate-100"
        >
          <ArrowLeft size={20} color="#1E293B" />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-xs text-orange-500 font-bold uppercase tracking-wider mb-0.5">
            Lesson 3/5
          </Text>
          <Text className="font-black text-slate-800 text-lg">
            Meeting Basics
          </Text>
        </View>

        <TouchableOpacity className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-100 active:bg-slate-100">
          <MoreHorizontal size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      {/* --- 2. Mode Switcher (Pill Tabs) --- */}
      <View className="flex-row mx-6 mt-2 p-1.5 bg-slate-50 rounded-[20px] border border-slate-100">
        {["dictation", "shadowing"].map((m) => (
          <TouchableOpacity
            key={m}
            onPress={() => setMode(m as any)}
            className={cn(
              "flex-1 py-3 items-center rounded-[16px] transition-all",
              mode === m
                ? "bg-white shadow-sm shadow-slate-200 border border-slate-100"
                : "opacity-50"
            )}
          >
            <Text
              className={cn(
                "capitalize font-bold text-sm",
                mode === m ? "text-orange-600" : "text-slate-500"
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
        <View className="h-32 bg-orange-50 rounded-[32px] border border-orange-100 flex-row items-center justify-center space-x-1.5 mb-8 px-8 overflow-hidden relative">
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
                  ? "bg-orange-500 shadow-sm shadow-orange-300"
                  : "bg-orange-200"
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
              <Text className="text-slate-800 font-bold text-lg">
                Nội dung nghe được
              </Text>
              <View className="bg-slate-100 px-2 py-1 rounded-lg">
                <Text className="text-xs font-bold text-slate-500">
                  {textInput.length} chars
                </Text>
              </View>
            </View>

            <TextInput
              className="bg-white border border-slate-200 rounded-[24px] p-5 text-lg text-slate-800 min-h-[200px] leading-8 shadow-sm focus:border-orange-500 focus:shadow-orange-100"
              multiline
              placeholder="Gõ nội dung bạn nghe được tại đây..."
              placeholderTextColor="#94A3B8"
              textAlignVertical="top"
              value={textInput}
              onChangeText={setTextInput}
              selectionColor="#F97316"
            />

            <View className="flex-row justify-end space-x-3 pt-2">
              <TouchableOpacity className="bg-slate-50 border border-slate-100 px-5 py-4 rounded-[20px] items-center justify-center active:bg-slate-100">
                <Save size={22} color="#64748B" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-orange-500 flex-1 flex-row items-center justify-center px-5 py-4 rounded-[20px] shadow-lg shadow-orange-200 active:bg-orange-600 border-b-4 border-orange-600 active:border-b-0 active:translate-y-1">
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
            <View className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm w-full relative">
              <View className="absolute -top-3 left-6 bg-orange-50 px-3 py-1 border border-orange-100 rounded-full">
                <Text className="text-[10px] font-bold text-orange-600 uppercase">
                  Script mẫu
                </Text>
              </View>
              {/* Sửa lại phần Text lồng nhau để an toàn hơn */}
              <Text className="text-2xl text-slate-700 font-medium leading-10 text-center mt-2">
                "Good morning everyone. Let's get started by reviewing the
                agenda for today."
              </Text>
              <Text className="text-center text-orange-500 text-xs font-bold mt-2">
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
                    ? "bg-white border-red-500 shadow-red-200" // Trạng thái ghi âm
                    : "bg-orange-500 border-orange-100 shadow-orange-200" // Trạng thái chờ
                )}
              >
                {isRecording ? (
                  <View className="w-8 h-8 bg-red-500 rounded-lg animate-pulse" />
                ) : (
                  <Mic size={36} color="white" />
                )}
              </TouchableOpacity>

              <Text className="text-slate-400 text-sm mt-5 font-bold h-6 uppercase tracking-wide">
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
                  className="mt-4 flex-row items-center bg-orange-50 border border-orange-100 px-6 py-3 rounded-full active:bg-orange-100"
                >
                  <Play size={18} color="#F97316" fill="#F97316" />
                  <Text className="ml-2 text-orange-600 font-bold text-sm">
                    Nghe lại giọng bạn
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* --- 4. Bottom Player Controls (Floating Style) --- */}
      <View className="absolute bottom-8 left-6 right-6 bg-white rounded-[24px] px-5 py-4 flex-row justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
        <TouchableOpacity className="p-3 bg-slate-50 rounded-2xl border border-slate-100 active:bg-slate-200">
          <Text className="font-bold text-xs text-slate-600">0.75x</Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-6">
          <TouchableOpacity className="p-3 active:scale-90 transition-transform">
            <RotateCcw size={24} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-orange-500 rounded-full items-center justify-center shadow-lg shadow-orange-300 active:bg-orange-600 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause size={28} color="white" fill="white" />
            ) : (
              <Play size={28} color="white" fill="white" className="ml-1" />
            )}
          </TouchableOpacity>

          <TouchableOpacity className="p-3 active:scale-90 transition-transform rotate-180">
            <RotateCcw size={24} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="p-3 bg-slate-50 rounded-2xl border border-slate-100 active:bg-slate-200">
          <Text className="font-bold text-xs text-slate-600">Gợi ý</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
