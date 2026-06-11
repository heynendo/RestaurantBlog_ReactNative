import { AppText as Text, colors } from "@/styles/theme";
import { View } from "react-native";

type BadgeProps = {
    content: string;
};

export default function Badge({content}: BadgeProps){
    return(
        <View
            style={{
                backgroundColor: colors.primary,
                borderRadius: 22,
                paddingHorizontal: 16,
                paddingVertical: 4,
            }}
        >
            <Text
                style={{
                    color: colors.white,
                    fontWeight: '600',
                    fontSize: 15,
                    lineHeight: 22,
                    letterSpacing: -0.24
                }}
            >
                {content}
            </Text>
        </View>
    )
}