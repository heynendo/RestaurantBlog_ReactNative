import { Article } from '@/api/api';
import AppButton from '@/components/ui/AppButton';
import ArrowIcon from '@/components/ui/ArrowIcon';
import { styles } from '@/styles/articleStyles';
import { AppText as Text, colors, spacing } from '@/styles/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { ImageBackground, View, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import RenderHtml from 'react-native-render-html';

//TODO: improve HTML article content styling

export default function ArticleScreen() {
  
  const { data } = useLocalSearchParams<{ data: string }>();
  const { width } = useWindowDimensions();

  const article: Article = JSON.parse(data);

  return (
    <>
    <View style={styles.heading} />
    <Animated.ScrollView
      style={styles.container1}
      entering={FadeIn.duration(500)}
    >
      <ImageBackground
        style={{height: 175}}
        source={{ uri: article.featured_image.url }}
      >
        <AppButton pressAction={() => router.back()}>
          <ArrowIcon />
        </AppButton>
      </ImageBackground>
      <View style={styles.container2}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.date}>{article.created_at}</Text>
        <RenderHtml
          contentWidth={width - spacing.md * 2}
          source={{ html: article.content }}
          tagsStyles={{
            a: { color: colors.primary, textDecorationLine: 'none' },
            span: { marginVertical: spacing.md},
            img: { borderRadius: 4, marginBottom: spacing.xs, marginTop: spacing.md },
          }}
        />
      </View>
    </Animated.ScrollView>
    </>
  );
}