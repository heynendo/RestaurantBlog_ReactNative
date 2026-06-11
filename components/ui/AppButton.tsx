import { colors, spacing } from "@/styles/theme";
import { ReactNode } from "react";
import { Pressable } from "react-native";

type AppButtonProps = {
  children: ReactNode;
  pressAction: () => void;
};

export default function AppButton({ children, pressAction }: AppButtonProps) {
  return (
    <Pressable
      onPress={pressAction}
      style={{
        borderRadius: 1000,
        backgroundColor: colors.white,
        padding: spacing.md,
        alignSelf: 'flex-start',
        margin: spacing.md,
      }}
    >
        {children}
    </Pressable>
  );
}