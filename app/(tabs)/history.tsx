import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { CalendarDays, Filter } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import MatchHistoryCard from '@/components/history/MatchHistoryCard';
import SportFilterChip from '@/components/common/SportFilterChip';
import { getMatchHistory } from '@/utils/matchUtils';

export default function HistoryScreen() {
  const [selectedSport, setSelectedSport] = useState('all');
  const [filterVisible, setFilterVisible] = useState(false);
  
  const matchHistory = getMatchHistory();

  const renderHeader = () => (
    <>
      <View style={styles.filterRow}>
        <View style={styles.sportFilters}>
          <SportFilterChip 
            label="All" 
            isSelected={selectedSport === 'all'} 
            onPress={() => setSelectedSport('all')} 
          />
          <SportFilterChip 
            label="Tennis" 
            isSelected={selectedSport === 'tennis'} 
            onPress={() => setSelectedSport('tennis')} 
          />
          <SportFilterChip 
            label="Badminton" 
            isSelected={selectedSport === 'badminton'} 
            onPress={() => setSelectedSport('badminton')} 
          />
          <SportFilterChip 
            label="More" 
            isSelected={false} 
            onPress={() => setFilterVisible(!filterVisible)} 
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(!filterVisible)}>
          <Filter size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>
      
      {filterVisible && (
        <View style={styles.expandedFilters}>
          <SportFilterChip 
            label="Padel" 
            isSelected={selectedSport === 'padel'} 
            onPress={() => setSelectedSport('padel')} 
          />
          <SportFilterChip 
            label="Squash" 
            isSelected={selectedSport === 'squash'} 
            onPress={() => setSelectedSport('squash')} 
          />
          <SportFilterChip 
            label="Pickleball" 
            isSelected={selectedSport === 'pickleball'} 
            onPress={() => setSelectedSport('pickleball')} 
          />
          <SportFilterChip 
            label="Table Tennis" 
            isSelected={selectedSport === 'table-tennis'} 
            onPress={() => setSelectedSport('table-tennis')} 
          />
        </View>
      )}
      
      <View style={styles.statsOverview}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>16</Text>
          <Text style={styles.statLabel}>Won</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Lost</Text>
        </View>
      </View>
    </>
  );

  const renderSectionHeader = (date: string) => (
    <View style={styles.dateHeader}>
      <CalendarDays size={16} color={COLORS.textSecondary} />
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );

  // Group matches by date
  const groupedMatches: Record<string, any[]> = {};
  matchHistory.forEach(match => {
    if (!groupedMatches[match.date]) {
      groupedMatches[match.date] = [];
    }
    groupedMatches[match.date].push(match);
  });

  const sections = Object.keys(groupedMatches).map(date => ({
    date,
    data: groupedMatches[date],
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Match History</Text>
      </View>
      
      <FlatList
        data={sections}
        keyExtractor={(item) => item.date}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View>
            {renderSectionHeader(item.date)}
            {item.data.map((match: any) => (
              <MatchHistoryCard key={match.id} match={match} />
            ))}
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sportFilters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  expandedFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  statsOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  statCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.primary,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
});