import { colors } from "@/styles/theme";
import { useState } from 'react';
import { Image, ImageProps, View, StyleSheet, } from 'react-native';
import Animated, { FadeIn, } from 'react-native-reanimated';

type ImageLoaderProps = ImageProps & {
  accessibilityLabel: string;
};
// JSX UI function adding active loading to images
export default function ImageLoader({source, accessibilityLabel, style, ...props}: ImageLoaderProps) {
  
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <View style={style}>
      {!loaded && !error && (
        <View style={[styles.placeholder, style]} />
      )}

      {!error && (
        <Animated.View
          style={StyleSheet.absoluteFillObject}
          entering={FadeIn.duration(300)}
        >
          <Image
            {...props}
            source={source}
            style={[StyleSheet.absoluteFillObject, style]}
            accessible
            accessibilityLabel={accessibilityLabel}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        </Animated.View>
      )}

      {error && (
        <View style={[styles.placeholder, style]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: colors.grey,
    borderRadius: 4,
  },
});