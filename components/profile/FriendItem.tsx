import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';

interface FriendItemProps {
  friend: any;
}

const FriendItem: React.FC<FriendItemProps> = ({ friend }) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/profile/${friend.id}`)}
    >
      <Image 
        source={{ uri: friend.profileImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
        style={styles.profileImage} 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.stats}>{friend.matchesPlayed} matches • {friend.winRate}% win rate</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{friend.ranking}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  stats: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  badge: {
    backgroundColor: COLORS.primary + '20', // 20% opacity
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.primary,
  },
});

export default FriendItem;