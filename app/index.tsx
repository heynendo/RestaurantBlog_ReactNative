import { useArticles } from '@/api/useArticles';
import ArticleCard from '@/components/ArticleCard';
import ArticleFilters, { Filter } from '@/components/ArticleFilters';
import { styles } from '@/styles/indexStyles';
import { colors, Heading1, spacing, AppText as Text } from '@/styles/theme';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

export default function NewsfeedScreen() {

  const { articles, loading, error } = useArticles();
  const [activeFilter, setActiveFilter] = useState<Filter>('All Articles');

  const filteredArticles = articles.filter((article) => {
    if (activeFilter === 'All Articles') return true;
    return article.topics.includes(activeFilter);
  });
  
  return (
    <View style={styles.container}>
      <Heading1 style={styles.heading1}>Newsfeed</Heading1>
      <ArticleFilters 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />
      {loading ?
        <View style={styles.centered}>
          <ActivityIndicator 
            size="large" 
            color={colors.primary} 
          />
        </View>
        : error ? 
        <View style={styles.centered}>
          <Text>Error loading articles.</Text>
        </View>
        :
        <ScrollView>
          {filteredArticles.length === 0 ? (
            <Animated.View 
              style={styles.emptyState} 
              entering={FadeIn.delay(300).duration(300)}
            >
              <Text>No articles found.</Text>
            </Animated.View>
          ) : (
            filteredArticles.map((item) => (
              <Animated.View
                key={item.ID}
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(200)}
                layout={LinearTransition}
                style={{
                  paddingHorizontal: spacing.md,
                  paddingTop: spacing.md
                }}
              >
                <ArticleCard article={item} />
              </Animated.View>
            ))
          )}
        </ScrollView>
      }
    </View>
  );
}