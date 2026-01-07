import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useAudioRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [duration, setDuration] = useState(0); // Đếm giây (nếu muốn hiển thị)

  // Hàm xin quyền truy cập Mic
  async function requestPermissions() {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Cấp quyền thất bại",
        "Vui lòng cho phép ứng dụng truy cập Microphone."
      );
      return false;
    }
    return true;
  }

  // Bắt đầu ghi âm
  async function startRecording() {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      // Cấu hình audio cho iOS/Android (quan trọng)
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY // Chất lượng cao để AI nghe rõ
      );

      setRecording(recording);
      setIsRecording(true);
      setAudioUri(null); // Reset file cũ
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  // Dừng ghi âm
  async function stopRecording() {
    console.log("Stopping recording..");
    if (!recording) return;

    setIsRecording(false);

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      // Reset mode để loa ngoài hoạt động lại bình thường (cho player)
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      setRecording(null);
      setAudioUri(uri);
      console.log("Recording stopped and stored at", uri);

      return uri; // Trả về đường dẫn file để xử lý tiếp
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, [recording]);

  return {
    recording,
    isRecording,
    startRecording,
    stopRecording,
    audioUri,
  };
};
