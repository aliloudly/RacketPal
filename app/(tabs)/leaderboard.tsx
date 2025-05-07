import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/constants/Colors';
import LeaderboardCard from '@/components/leaderboard/LeaderboardCard';
import SportFilterChip from '@/components/common/SportFilterChip';
import { getLeaderboardData } from '@/utils/leaderboardUtils';
import { Medal } from 'lucide-react-native';

export default function LeaderboardScreen() {
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  
  const leaderboardData = getLeaderboardData(selectedSport, selectedTimeframe);

  const renderLeaderboardItem = ({ item, index }: { item: any, index: number }) => {
    return <LeaderboardCard player={item} rank={index + 1} />;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
      </View>
      
      <View style={styles.filterContainer}>
        <View style={styles.sportFilters}>
          <SportFilterChip 
            label="All Sports" 
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
        </View>
        
        <View style={styles.timeframeContainer}>
          <TouchableOpacity 
            style={[styles.timeframeButton, selectedTimeframe === 'week' && styles.timeframeButtonActive]}
            onPress={() => setSelectedTimeframe('week')}
          >
            <Text style={[styles.timeframeText, selectedTimeframe === 'week' && styles.timeframeTextActive]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.timeframeButton, selectedTimeframe === 'month' && styles.timeframeButtonActive]}
            onPress={() => setSelectedTimeframe('month')}
          >
            <Text style={[styles.timeframeText, selectedTimeframe === 'month' && styles.timeframeTextActive]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.timeframeButton, selectedTimeframe === 'allTime' && styles.timeframeButtonActive]}
            onPress={() => setSelectedTimeframe('allTime')}
          >
            <Text style={[styles.timeframeText, selectedTimeframe === 'allTime' && styles.timeframeTextActive]}>
              All Time
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {leaderboardData.length > 0 ? (
        <View style={styles.topThreeContainer}>
          {leaderboardData.slice(0, 3).map((player, index) => {
            const podiumStyles = [
              styles.secondPlace,
              styles.firstPlace,
              styles.thirdPlace
            ];
            const podiumOrder = [1, 0, 2]; // Display order: 2nd, 1st, 3rd
            
            return (
              <View key={player.id} style={[styles.podiumItem, podiumStyles[index]]}>
                <View style={styles.medalContainer}>
                  <Medal size={24} color={['silver', 'gold', '#CD7F32'][index]} />
                </View>
                <Text style={styles.podiumPlayerName}>{player.name}</Text>
                <Text style={styles.podiumPlayerScore}>{player.points} pts</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No data available</Text>
        </View>
      )}
      
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Rankings</Text>
        <FlatList
          data={leaderboardData.slice(3)} // Skip top 3 as they're shown in the podium
          renderItem={renderLeaderboardItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sportFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  timeframeContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  timeframeButtonActive: {
    backgroundColor: COLORS.white,
  },
  timeframeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  timeframeTextActive: {
    color: COLORS.primary,
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginHorizontal: 16,
    height: 160,
    marginBottom: 20,
  },
  podiumItem: {
    alignItems: 'center',
    width: '30%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  firstPlace: {
    height: 160,
    backgroundColor: '#FEF3C7',
    zIndex: 3,
    elevation: 3,
  },
  secondPlace: {
    height: 130,
    backgroundColor: '#F1F5F9',
    zIndex: 2,
    elevation: 2,
  },
  thirdPlace: {
    height: 100,
    backgroundColor: '#FDE68A',
    zIndex: 1,
    elevation: 1,
  },
  medalContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  podiumPlayerName: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  podiumPlayerScore: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  listTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});