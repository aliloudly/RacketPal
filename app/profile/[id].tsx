import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, MessageCircle, UserPlus, Trophy } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import PlayerStats from '@/components/profile/PlayerStats';
import MatchHistoryPreview from '@/components/profile/MatchHistoryPreview';
import { getUserById, getUserStats } from '@/utils/userUtils';

export default function ProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const user = getUserById(id as string);
  const stats = getUserStats(id as string);
  
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#F8FAFC' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
              <ArrowLeft size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: user.profileImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
            style={styles.profileImage} 
          />
          <Text style={styles.playerName}>{user.name}</Text>
          <View style={styles.badgeContainer}>
            {user.badges?.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Trophy size={12} color={COLORS.white} />
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={20} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
              <UserPlus size={20} color={COLORS.white} />
              <Text style={[styles.actionButtonText, styles.primaryButtonText]}>Add Friend</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <PlayerStats stats={stats} />
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Favorite Sports</Text>
          <View style={styles.sportsList}>
            {user.favoriteSports?.map((sport, index) => (
              <View key={index} style={styles.sportBadge}>
                <Text style={styles.sportText}>{sport}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <MatchHistoryPreview userId={id as string} />
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            {user.achievements?.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <Trophy size={20} color={COLORS.primary} />
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDate}>{achievement.date}</Text>
                </View>
              </View>
            ))}
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
  headerButton: {
    padding: 8,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  playerName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: COLORS.textPrimary,
    marginTop: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  primaryButtonText: {
    color: COLORS.white,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  sportsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sportBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sportText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  achievementsList: {
    gap: 12,
    marginBottom: 32,
  },
  achievementItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  achievementInfo: {
    marginLeft: 12,
  },
  achievementTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  achievementDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});