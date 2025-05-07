import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

interface LeaderboardCardProps {
  player: any;
  rank: number;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ player, rank }) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/profile/${player.id}`)}
    >
      <Text style={styles.rankText}>#{rank}</Text>
      
      <Image 
        source={{ uri: player.profileImage }} 
        style={styles.profileImage} 
      />
      
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerStats}>
          {player.winCount} wins • {player.matchCount} matches
        </Text>
      </View>
      
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>{player.points}</Text>
        <Text style={styles.pointsLabel}>pts</Text>
      </View>
      
      <ChevronRight size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  rankText: {
    width: 36,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  playerStats: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  pointsContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  pointsText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.primary,
  },
  pointsLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default LeaderboardCard;