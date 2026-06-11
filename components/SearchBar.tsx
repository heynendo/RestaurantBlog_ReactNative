import { colors, spacing } from "@/styles/theme";
import { useState } from "react";
import { TextInput, View } from "react-native";

type Props = {
    userInputs: string;
    setUserInputs: (text: string) => void;
}

export default function SearchBar({userInputs, setUserInputs}: Props){

    const [focus, setFocus] = useState<boolean>(false)

    return(
        <View
            style={{
                borderWidth: focus ? 2 : 1,
                borderColor: colors.primary,
                margin: spacing.md,
                borderRadius: 4,
                backgroundColor: focus ? colors.grey : '',
            }}
        >
            <TextInput
                style={{
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.md,
                    outline: "none",
                }}
                onChangeText={setUserInputs}
                value={userInputs}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                placeholder="search articles"
                placeholderTextColor= "#585858"
            />
        </View>
    )
}