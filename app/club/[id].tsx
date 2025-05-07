import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, Calendar, Users, MapPin, Bell } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import ClubMemberItem from '@/components/club/ClubMemberItem';
import EventCard from '@/components/club/EventCard';
import { getClubById, getClubMembers, getClubEvents } from '@/utils/clubUtils';

export default function ClubScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const club = getClubById(id as string);
  const members = getClubMembers(id as string);
  const events = getClubEvents(id as string);
  
  if (!club) {
    return (
      <View style={styles.container}>
        <Text>Club not found</Text>
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
        <View style={styles.clubHeader}>
          <Image 
            source={{ uri: club.image || 'https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg' }} 
            style={styles.clubImage} 
          />
          <Text style={styles.clubName}>{club.name}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color={COLORS.textSecondary} />
            <Text style={styles.locationText}>{club.location}</Text>
          </View>
          
          <Text style={styles.clubDescription}>{club.description}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{club.memberCount}</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{club.eventCount}</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{club.matchCount}</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Bell size={20} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
              <Users size={20} color={COLORS.white} />
              <Text style={[styles.actionButtonText, styles.primaryButtonText]}>Join Club</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Calendar size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={events}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsList}
            renderItem={({ item }) => <EventCard event={item} />}
            keyExtractor={item => item.id}
          />
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Users size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Members</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.membersList}>
            {members.slice(0, 5).map(member => (
              <ClubMemberItem key={member.id} member={member} />
            ))}
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Trophy size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Club Leaderboard</Text>
            </View>
          </View>
          
          <View style={styles.leaderboardContainer}>
            {club.leaderboard?.slice(0, 3).map((player, index) => (
              <TouchableOpacity 
                key={player.id} 
                style={styles.leaderboardItem}
                onPress={() => router.push(`/profile/${player.id}`)}
              >
                <Text style={styles.rankNumber}>#{index + 1}</Text>
                <Image 
                  source={{ uri: player.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
                  style={styles.playerImage} 
                />
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerStats}>{player.wins} wins • {player.matchesPlayed} matches</Text>
                </View>
                <Text style={styles.playerPoints}>{player.points}</Text>
              </TouchableOpacity>
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
  clubHeader: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  clubImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  clubName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: COLORS.textPrimary,
    marginTop: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  clubDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  statsRow: {
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
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.primary,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
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
  eventsList: {
    paddingRight: 16,
    paddingBottom: 8,
  },
  membersList: {
    gap: 12,
  },
  leaderboardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  rankNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.textSecondary,
    width: 40,
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  playerInfo: {
    marginLeft: 12,
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
  playerPoints: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.primary,
  },
});