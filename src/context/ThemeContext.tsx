import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

type ThemeContextType = {
  colorScheme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // NativeWind hook để điều khiển style
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();

  // State nội bộ để quản lý logic loading
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Khi mở app: Lấy cài đặt cũ từ bộ nhớ
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme) {
          setColorScheme(savedTheme as "light" | "dark");
        } else {
          // Nếu chưa lưu gì thì lấy theo hệ thống
          const systemTheme = Appearance.getColorScheme();
          setColorScheme(systemTheme || "light");
        }
      } catch (error) {
        console.log("Lỗi load theme:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  const setTheme = async (theme: "light" | "dark" | "system") => {
    if (theme === "system") {
      const systemTheme = Appearance.getColorScheme();
      setColorScheme(systemTheme || "light");
      await AsyncStorage.removeItem("theme");
    } else {
      setColorScheme(theme);
      await AsyncStorage.setItem("theme", theme);
    }
  };

  if (!isLoaded) return null; // Hoặc return <Loading />

  return (
    <ThemeContext.Provider
      value={{
        colorScheme: colorScheme as "light" | "dark",
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook để dùng nhanh ở các màn hình khác
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useAppTheme must be used within ThemeProvider");
  return context;
};
