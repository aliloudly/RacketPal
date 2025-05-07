import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';

interface ClubMemberItemProps {
  member: any;
}

const ClubMemberItem: React.FC<ClubMemberItemProps> = ({ member }) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/profile/${member.id}`)}
    >
      <Image 
        source={{ uri: member.image }} 
        style={styles.profileImage} 
      />
      <View style={styles.info}>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.role}>{member.role}</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>{member.matchCount} matches</Text>
        <Text style={styles.statsText}>{member.winRate}% wins</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  role: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  statsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
});

export default ClubMemberItem;