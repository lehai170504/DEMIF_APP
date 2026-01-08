import { useState } from "react";
import { Linking, Platform } from "react-native";

export const useNotificationSettings = () => {
  // --- STATE ---
  const [studyReminder, setStudyReminder] = useState(true);
  const [news, setNews] = useState(false);
  const [reminderTime, setReminderTime] = useState({ hour: 20, minute: 0 });
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  // State tạm thời cho modal
  const [tempHour, setTempHour] = useState(20);
  const [tempMinute, setTempMinute] = useState(0);

  // --- ACTIONS ---
  const formatTime = (h: number, m: number) => {
    const hh = h < 10 ? `0${h}` : h;
    const mm = m < 10 ? `0${m}` : m;
    return `${hh}:${mm}`;
  };

  const openSystemSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const handleOpenPicker = () => {
    if (!studyReminder) return;
    setTempHour(reminderTime.hour);
    setTempMinute(reminderTime.minute);
    setTimePickerVisible(true);
  };

  const handleSaveTime = () => {
    setReminderTime({ hour: tempHour, minute: tempMinute });
    setTimePickerVisible(false);
  };

  const handleClosePicker = () => {
    setTimePickerVisible(false);
  };

  return {
    // States
    studyReminder,
    news,
    reminderTime,
    isTimePickerVisible,
    tempHour,
    tempMinute,
    // Setters (nếu cần dùng trực tiếp ở UI)
    setStudyReminder,
    setNews,
    setTempHour,
    setTempMinute,
    // Functions
    formatTime,
    openSystemSettings,
    handleOpenPicker,
    handleSaveTime,
    handleClosePicker,
  };
};
