import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { History, ChevronRight } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { getUserMatchHistory } from '@/utils/userUtils';

interface MatchHistoryPreviewProps {
  userId: string;
}

const MatchHistoryPreview: React.FC<MatchHistoryPreviewProps> = ({ userId }) => {
  const router = useRouter();
  const matchHistory = getUserMatchHistory(userId).slice(0, 3);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <History size={20} color={COLORS.primary} />
          <Text style={styles.title}>Recent Matches</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/history')}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      
      {matchHistory.length > 0 ? (
        <View style={styles.matchesList}>
          {matchHistory.map((match) => (
            <TouchableOpacity 
              key={match.id}
              style={styles.matchItem}
              onPress={() => router.push(`/match/${match.id}`)}
            >
              <View style={styles.matchInfo}>
                <Text style={styles.matchSport}>{match.sport}</Text>
                <Text style={styles.matchDate}>{match.date}</Text>
              </View>
              
              <View style={styles.matchResult}>
                <Text style={styles.teamName}>
                  {match.team1.name} vs {match.team2.name}
                </Text>
                <Text style={styles.score}>{match.score}</Text>
              </View>
              
              <View style={[
                styles.resultBadge,
                match.result === 'won' ? styles.wonBadge : styles.lostBadge
              ]}>
                <Text style={[
                  styles.resultText,
                  match.result === 'won' ? styles.wonText : styles.lostText
                ]}>
                  {match.result === 'won' ? 'Won' : 'Lost'}
                </Text>
              </View>
              
              <ChevronRight size={16} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No match history yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
  matchesList: {
    gap: 12,
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  matchInfo: {
    marginRight: 12,
  },
  matchSport: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
    textTransform: 'capitalize',
  },
  matchDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  matchResult: {
    flex: 1,
  },
  teamName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  score: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  resultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  wonBadge: {
    backgroundColor: '#DCFCE7', // Light green
  },
  lostBadge: {
    backgroundColor: '#FEE2E2', // Light red
  },
  resultText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  wonText: {
    color: '#10B981', // Success green
  },
  lostText: {
    color: '#EF4444', // Error red
  },
  emptyState: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default MatchHistoryPreview;