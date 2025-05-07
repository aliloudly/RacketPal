import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { CirclePlus as PlusCircle, Calendar, TrendingUp, Users, History } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import ActiveMatchCard from '@/components/home/ActiveMatchCard';
import UpcomingMatchCard from '@/components/home/UpcomingMatchCard';
import SportTypeButton from '@/components/home/SportTypeButton';
import { getActiveMatches, getUpcomingMatches } from '@/utils/matchUtils';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedSport, setSelectedSport] = useState('all');
  
  const activeMatches = getActiveMatches();
  const upcomingMatches = getUpcomingMatches();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Player</Text>
        <TouchableOpacity 
          style={styles.createMatchButton}
          onPress={() => router.push('/match/create')}
        >
          <PlusCircle size={20} color={COLORS.white} />
          <Text style={styles.createButtonText}>New Match</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sportFilterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sportFilters}>
          <SportTypeButton 
            label="All" 
            isSelected={selectedSport === 'all'} 
            onPress={() => setSelectedSport('all')} 
          />
          <SportTypeButton 
            label="Tennis" 
            isSelected={selectedSport === 'tennis'} 
            onPress={() => setSelectedSport('tennis')} 
          />
          <SportTypeButton 
            label="Badminton" 
            isSelected={selectedSport === 'badminton'} 
            onPress={() => setSelectedSport('badminton')} 
          />
          <SportTypeButton 
            label="Padel" 
            isSelected={selectedSport === 'padel'} 
            onPress={() => setSelectedSport('padel')} 
          />
          <SportTypeButton 
            label="Squash" 
            isSelected={selectedSport === 'squash'} 
            onPress={() => setSelectedSport('squash')} 
          />
          <SportTypeButton 
            label="Pickleball" 
            isSelected={selectedSport === 'pickleball'} 
            onPress={() => setSelectedSport('pickleball')} 
          />
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeMatches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Matches</Text>
            </View>
            {activeMatches.map(match => (
              <ActiveMatchCard key={match.id} match={match} />
            ))}
          </View>
        )}

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => router.push('/match/create')}>
              <PlusCircle size={24} color={COLORS.primary} />
              <Text style={styles.quickActionText}>New Match</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => router.push('/history')}>
              <History size={24} color={COLORS.primary} />
              <Text style={styles.quickActionText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => router.push('/leaderboard')}>
              <TrendingUp size={24} color={COLORS.primary} />
              <Text style={styles.quickActionText}>Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => router.push('/profile')}>
              <Users size={24} color={COLORS.primary} />
              <Text style={styles.quickActionText}>Friends</Text>
            </TouchableOpacity>
          </View>
        </View>

        {upcomingMatches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Matches</Text>
              <Link href="/history" asChild>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </Link>
            </View>
            {upcomingMatches.map(match => (
              <UpcomingMatchCard key={match.id} match={match} />
            ))}
          </View>
        )}

        <View style={styles.statsPreviewContainer}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>68%</Text>
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>138</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  createMatchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  createButtonText: {
    color: COLORS.white,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  sportFilterContainer: {
    paddingVertical: 8,
  },
  sportFilters: {
    paddingHorizontal: 16,
    gap: 8,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
  quickActionsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  quickActionButton: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '22%',
  },
  quickActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.textPrimary,
    marginTop: 4,
    textAlign: 'center',
  },
  statsPreviewContainer: {
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  statsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.primary,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
});