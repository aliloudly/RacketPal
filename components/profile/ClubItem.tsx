import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Users, MapPin } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

interface ClubItemProps {
  club: any;
}

const ClubItem: React.FC<ClubItemProps> = ({ club }) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/club/${club.id}`)}
    >
      <Image 
        source={{ uri: club.image || 'https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg' }} 
        style={styles.clubImage} 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{club.name}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Users size={12} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{club.memberCount} members</Text>
          </View>
          <View style={styles.detailItem}>
            <MapPin size={12} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{club.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  clubImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
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
  detailsRow: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
});

export default ClubItem;