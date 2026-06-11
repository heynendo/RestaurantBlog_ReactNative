import { View, TouchableOpacity } from 'react-native';
import { AppText as Text } from "@/styles/theme";
import { styles } from '@/styles/articleFiltersStyles';

export type Filter = 'All Articles' | 'Openings' | 'Guides';

type Props = {
  activeFilter: Filter;
  onFilterChange: (filter: Filter) => void;
};

export default function ArticleFilters({ activeFilter, onFilterChange }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.tabs}>
        {(['All Articles', 'Openings', 'Guides'] as Filter[]).map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => onFilterChange(filter)}
            style={styles.tab}
          >
            <Text style={[styles.tabText, activeFilter === filter && styles.tabTextActive]}>
              {filter}
            </Text>
            {activeFilter === filter && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}