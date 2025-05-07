import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

interface ActiveMatchCardProps {
  match: any;
}

const ActiveMatchCard: React.FC<ActiveMatchCardProps> = ({ match }) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/match/${match.id}`)}
    >
      <View style={styles.header}>
        <View style={styles.sportIndicator}>
          <Text style={styles.sportText}>{match.sport}</Text>
        </View>
        <Text style={styles.timeText}>{match.elapsedTime}</Text>
      </View>
      
      <View style={styles.scoreContainer}>
        <View style={styles.team}>
          <Text style={styles.teamName}>{match.team1.name}</Text>
        </View>
        
        <View style={styles.scoreBoard}>
          <Text style={styles.scoreText}>{match.team1.sets}-{match.team2.sets}</Text>
          <Text style={styles.gameScoreText}>
            {match.currentSetScore.team1}-{match.currentSetScore.team2}
          </Text>
        </View>
        
        <View style={styles.team}>
          <Text style={styles.teamName}>{match.team2.name}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.statusText}>
          {match.status === 'in_progress' ? 'Match in progress' : match.status}
        </Text>
        <ChevronRight size={20} color={COLORS.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  team: {
    flex: 1,
  },
  teamName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.textPrimary,
    maxWidth: '80%',
  },
  scoreBoard: {
    alignItems: 'center',
  },
  scoreText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.primary,
  },
  gameScoreText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#10B981', // Success green
  },
});

export default ActiveMatchCard;