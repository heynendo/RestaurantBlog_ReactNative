import { styles } from '@/styles/articleFiltersStyles';
import { AppText as Text } from "@/styles/theme";
import { TouchableOpacity, View } from 'react-native';

//export type Filter = 'All Articles' | 'Openings' | 'Guides';

type Props = {
  filterOptions: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export default function ArticleFilters({ filterOptions, activeFilter, onFilterChange }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.tabs}>
        {(['All Articles', ...filterOptions] as string[]).map((filter) => (
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