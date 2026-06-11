import { View, TouchableOpacity } from 'react-native';
import { AppText as Text, Heading3 } from "@/styles/theme";
import { router } from 'expo-router';
import Badge from './ui/Badge';
import ImageLoader from './ImageLoader';
import { styles } from '@/styles/articleCardStyles';
import { Article } from '@/api/api';

interface ArticleCardProps {
  article: Article;
}
//TODO: test window resizing with smaller devices/larger text

export default function ArticleCard({ article }: ArticleCardProps) {

  const { ID, title, created_at: date, featured_image: featuredImage } = article;

  // find if article was release in the last 7 days
  const parseDate = (dateStr: string): Date => {
    const months: Record<string, number> = {
      January: 0, February: 1, March: 2, April: 3,
      May: 4, June: 5, July: 6, August: 7,
      September: 8, October: 9, November: 10, December: 11,
    };
    const [month, day, year] = dateStr.replace(',', '').split(' ');
    return new Date(Number(year), months[month], Number(day));
  };

  const weekAfterArticle = parseDate(date);
  weekAfterArticle.setDate(weekAfterArticle.getDate() + 7);
  const isNew = new Date() <= weekAfterArticle;

  return (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => router.push({
        pathname: '/article/[id]',
        params: { id: ID, data: JSON.stringify(article) },
      })}
    >
      <View style={styles.cardLeft}>
        <ImageLoader
          style={styles.cardImg}
          source={{ uri: featuredImage.url }}
          accessible={true}
          accessibilityLabel={featuredImage.alt_text}
        />
        {isNew && (
          <View style={styles.badgeWrapper}>
            <Badge content='NEW!' />
          </View>
        )}
      </View>
      <View style={styles.cardText}>
        <Heading3>{title}</Heading3>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}