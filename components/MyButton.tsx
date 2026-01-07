import { cn } from "@/src/lib/utils";
import { Star } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface MyButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

const MyButton = ({
  title,
  onPress,
  variant = "primary",
  className,
}: MyButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // Dùng hàm cn để gộp class
      className={cn(
        // 1. Style mặc định (Flex, bo góc, padding)
        "flex-row items-center justify-center rounded-xl py-3 px-4 active:opacity-80",

        // 2. Style theo điều kiện (variant)
        variant === "primary" ? "bg-blue-600" : "bg-gray-200",

        // 3. Class truyền từ bên ngoài (nếu có sẽ được cộng dồn hoặc ghi đè)
        className
      )}
    >
      {/* Icon Lucide cũng có thể nhận class của Tailwind thông qua color/size */}
      <Star
        size={20}
        color={variant === "primary" ? "white" : "black"}
        className="mr-2" // Margin right 2
      />

      <Text
        className={cn(
          "font-bold text-base",
          variant === "primary" ? "text-white" : "text-gray-800"
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;
