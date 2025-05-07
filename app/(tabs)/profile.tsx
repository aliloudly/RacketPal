import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/constants/Colors';
import { Settings, Users, Trophy, Award, MessageCircle, Bell } from 'lucide-react-native';
import ProfileStatsCard from '@/components/profile/ProfileStatsCard';
import FriendItem from '@/components/profile/FriendItem';
import ClubItem from '@/components/profile/ClubItem';
import { getUserProfile, getUserFriends, getUserClubs } from '@/utils/userUtils';

export default function ProfileScreen() {
  const userProfile = getUserProfile();
  const friends = getUserFriends();
  const clubs = getUserClubs();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
            style={styles.profileImage} 
          />
          <Text style={styles.userName}>{userProfile.name}</Text>
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Trophy size={12} color={COLORS.white} />
              <Text style={styles.badgeText}>Pro Player</Text>
            </View>
          </View>
          <Text style={styles.bio}>{userProfile.bio}</Text>
          
          <View style={styles.profileStats}>
            <ProfileStatsCard 
              value={userProfile.matchesPlayed.toString()} 
              label="Matches" 
            />
            <View style={styles.statsDivider} />
            <ProfileStatsCard 
              value={`${userProfile.winRate}%`} 
              label="Win Rate" 
            />
            <View style={styles.statsDivider} />
            <ProfileStatsCard 
              value={userProfile.ranking.toString()} 
              label="Ranking" 
            />
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Award size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Favorite Sports</Text>
            </View>
          </View>
          <View style={styles.sportsList}>
            {userProfile.favoriteSports.map((sport, index) => (
              <View key={index} style={styles.sportBadge}>
                <Text style={styles.sportText}>{sport}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Users size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Friends</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.friendsList}>
            {friends.slice(0, 3).map(friend => (
              <FriendItem key={friend.id} friend={friend} />
            ))}
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Friends</Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.sectionContainer, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Trophy size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Clubs</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.clubsList}>
            {clubs.map(club => (
              <ClubItem key={club.id} club={club} />
            ))}
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Join a Club</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.textPrimary,
    marginTop: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 8,
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
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 32,
  },
  profileStats: {
    flexDirection: 'row',
    marginTop: 24,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
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
  friendsList: {
    gap: 12,
  },
  addButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
  clubsList: {
    gap: 12,
  },
  lastSection: {
    marginBottom: 32,
  },
});