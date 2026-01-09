import React from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface TimePickerProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  tempHour: number;
  setTempHour: (h: number) => void;
  tempMinute: number;
  setTempMinute: (m: number) => void;
}

export const TimePickerModal = ({
  visible,
  onClose,
  onSave,
  tempHour,
  setTempHour,
  tempMinute,
  setTempMinute,
}: TimePickerProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        {/* Modal Container: dark:bg-slate-800 */}
        <View className="bg-white dark:bg-slate-800 w-full rounded-3xl p-6 shadow-2xl">
          <Text className="text-center text-lg font-black text-slate-800 dark:text-white mb-6">
            Chọn giờ nhắc nhở
          </Text>

          <View className="flex-row justify-center h-48 mb-6">
            {/* Cột Giờ */}
            <View className="w-20 items-center">
              <Text className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase">
                Giờ
              </Text>
              <FlatList
                data={hours}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                initialScrollIndex={tempHour > 2 ? tempHour - 2 : 0}
                getItemLayout={(data, index) => ({
                  length: 40,
                  offset: 40 * index,
                  index,
                })}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setTempHour(item)}
                    className={`h-10 items-center justify-center w-full rounded-lg ${
                      tempHour === item
                        ? "bg-orange-50 dark:bg-orange-900/20"
                        : ""
                    }`}
                  >
                    <Text
                      className={`text-xl ${
                        tempHour === item
                          ? "font-black text-orange-600 dark:text-orange-400"
                          : "font-medium text-slate-400 dark:text-slate-600"
                      }`}
                    >
                      {item < 10 ? `0${item}` : item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View className="h-full justify-center pb-6 mx-4">
              <Text className="text-2xl font-black text-slate-300 dark:text-slate-600">
                :
              </Text>
            </View>

            {/* Cột Phút */}
            <View className="w-20 items-center">
              <Text className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase">
                Phút
              </Text>
              <FlatList
                data={minutes}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                initialScrollIndex={tempMinute > 2 ? tempMinute - 2 : 0}
                getItemLayout={(data, index) => ({
                  length: 40,
                  offset: 40 * index,
                  index,
                })}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setTempMinute(item)}
                    className={`h-10 items-center justify-center w-full rounded-lg ${
                      tempMinute === item
                        ? "bg-orange-50 dark:bg-orange-900/20"
                        : ""
                    }`}
                  >
                    <Text
                      className={`text-xl ${
                        tempMinute === item
                          ? "font-black text-orange-600 dark:text-orange-400"
                          : "font-medium text-slate-400 dark:text-slate-600"
                      }`}
                    >
                      {item < 10 ? `0${item}` : item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-slate-100 dark:bg-slate-700 py-3.5 rounded-xl items-center"
            >
              <Text className="font-bold text-slate-600 dark:text-slate-300">
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSave}
              className="flex-1 bg-orange-500 py-3.5 rounded-xl items-center shadow-lg shadow-orange-200 dark:shadow-none"
            >
              <Text className="font-bold text-white">Lưu giờ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
