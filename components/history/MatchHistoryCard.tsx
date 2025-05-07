import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

interface MatchHistoryCardProps {
  match: any;
}

const MatchHistoryCard: React.FC<MatchHistoryCardProps> = ({ match }) => {
  const router = useRouter();
  const isWon = match.result === 'won';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/match/${match.id}`)}
    >
      <View style={styles.header}>
        <View style={styles.sportIndicator}>
          <Text style={styles.sportText}>{match.sport}</Text>
        </View>
        <View style={[
          styles.resultBadge,
          isWon ? styles.resultWon : styles.resultLost
        ]}>
          <Text style={[
            styles.resultText,
            isWon ? styles.resultWonText : styles.resultLostText
          ]}>
            {isWon ? 'Won' : 'Lost'}
          </Text>
        </View>
      </View>
      
      <View style={styles.scoreContainer}>
        <View style={styles.team}>
          <Text style={styles.teamName}>{match.team1.name}</Text>
          <Text style={[
            styles.scoreText,
            match.team1Score > match.team2Score ? styles.winningScore : {}
          ]}>
            {match.team1Score}
          </Text>
        </View>
        
        <Text style={styles.vsText}>vs</Text>
        
        <View style={styles.team}>
          <Text style={styles.teamName}>{match.team2.name}</Text>
          <Text style={[
            styles.scoreText,
            match.team2Score > match.team1Score ? styles.winningScore : {}
          ]}>
            {match.team2Score}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.infoItem}>
          <Clock size={14} color={COLORS.textSecondary} />
          <Text style={styles.infoText}>{match.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sportIndicator: {
    backgroundColor: COLORS.primary + '20', // 20% opacity
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sportText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.primary,
    textTransform: 'capitalize',
  },
  resultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  resultWon: {
    backgroundColor: '#DCFCE7', // Light green
  },
  resultLost: {
    backgroundColor: '#FEE2E2', // Light red
  },
  resultText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  resultWonText: {
    color: '#10B981', // Success green
  },
  resultLostText: {
    color: '#EF4444', // Error red
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  team: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
  },
  scoreText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  winningScore: {
    color: COLORS.primary,
  },
  vsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
});

export default MatchHistoryCard;