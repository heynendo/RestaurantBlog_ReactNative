import { useArticles } from '@/api/useArticles';
import ArticleCard from '@/components/ArticleCard';
import ArticleFilters from '@/components/ArticleFilters';
import SearchBar from '@/components/SearchBar';
import { styles } from '@/styles/indexStyles';
import { colors, Heading1, spacing, AppText as Text } from '@/styles/theme';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

export default function NewsfeedScreen() {

  const { articles, loading, error } = useArticles();
  const [activeFilter, setActiveFilter] = useState<string>('All Articles');

  const [userInputs, setUserInputs] = useState<string>('');

  //build list of all topics
  /*let allTopics: string[] = []
  for(let i=0;i<articles.length; i++){
    articles[i].topics.map(topic => {
      allTopics.push(topic)
    })
  } 
  const topicsCount= allTopics.reduce((acc, topic) =>{
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  // Record<> type removed warnings in acc[topic] above and a,b in sorting
  const sortedTopics = Object.entries(topicsCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0,3);
  const filterOptions = sortedTopics.map(([topic]) => topic);*/

  //optimized into a single filterOptions variable
  const filterOptions = Object.entries(
  articles
    .flatMap(article => article.topics)
    .reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([topic]) => topic);

  /*const filteredArticles = articles.filter((article) => {
    if (activeFilter === 'All Articles') return true;
    return article.topics.includes(activeFilter);
  });*/
  //added rest of search items
  const filteredArticles = articles.filter((article) => {
    if (activeFilter === 'All Articles' || 
        article.topics.includes(activeFilter)){
      if (article.title.includes(userInputs) ||
          article.topics.includes(userInputs) ||
          article.regions.includes(userInputs) ||
          article.tagline.includes(userInputs)) return true;
      /*for(let i=0; i<article.topics.length; i++){
        if(article.topics[i].includes(userInputs)) return true;
      }*/
    }
    
  })

  function onTextChange (text: string) {
    setUserInputs(text)
  }
  
  return (
    <View style={styles.container}>
      <Heading1 style={styles.heading1}>Newsfeed</Heading1>
      <SearchBar 
        userInputs={userInputs}
        setUserInputs={onTextChange}
      />
      <ArticleFilters 
        filterOptions={filterOptions}
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