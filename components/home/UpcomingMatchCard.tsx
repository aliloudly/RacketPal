import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, MapPin } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

interface UpcomingMatchCardProps {
  match: any;
}

const UpcomingMatchCard: React.FC<UpcomingMatchCardProps> = ({ match }) => {
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
        <Text style={styles.matchTypeText}>
          {match.type === 'singles' ? 'Singles' : 'Doubles'}
        </Text>
      </View>
      
      <View style={styles.teamsContainer}>
        <Text style={styles.teamText}>{match.team1.name}</Text>
        <Text style={styles.vsText}>vs</Text>
        <Text style={styles.teamText}>{match.team2.name}</Text>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.infoItem}>
          <Calendar size={14} color={COLORS.textSecondary} />
          <Text style={styles.infoText}>{match.date}, {match.time}</Text>
        </View>
        
        {match.location && (
          <View style={styles.infoItem}>
            <MapPin size={14} color={COLORS.textSecondary} />
            <Text style={styles.infoText}>{match.location}</Text>
          </View>
        )}
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
  matchTypeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
  },
  vsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
});

export default UpcomingMatchCard;