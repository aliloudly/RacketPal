import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface PlayerStatsProps {
  stats: any;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.matchesPlayed}</Text>
          <Text style={styles.statLabel}>Matches</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.wins}</Text>
          <Text style={styles.statLabel}>Wins</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.losses}</Text>
          <Text style={styles.statLabel}>Losses</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.winRate}%</Text>
          <Text style={styles.statLabel}>Win Rate</Text>
        </View>
      </View>
      
      <View style={styles.additionalStats}>
        <View style={styles.statRow}>
          <Text style={styles.statRowLabel}>Average Match Duration</Text>
          <Text style={styles.statRowValue}>{stats.avgMatchDuration}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statRowLabel}>Points Per Match</Text>
          <Text style={styles.statRowValue}>{stats.pointsPerMatch}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statRowLabel}>Ranking Points</Text>
          <Text style={styles.statRowValue}>{stats.rankingPoints}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  statItem: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    flex: 1,
    minWidth: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
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
  additionalStats: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  statRowLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  statRowValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: COLORS.primary,
  },
});

export default PlayerStats;