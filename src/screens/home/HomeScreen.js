import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';
import ProductClient from '../../api/ProductClient';
import TutorialCard from '../../components/TutorialCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTutorials = useCallback(async () => {
    try {
      const response = await ProductClient.getTutorials(10);
      setTutorials(response.data || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTutorials();
  }, [fetchTutorials]);

  const renderHeader = () => {
    const name = user?.name || t('guest');
    return (
      <>
        <View style={styles.greeting}>
          <View>
            <Text style={styles.greetingSmall}>{t('greetingSmall')}</Text>
            <Text style={styles.greetingName}>{name}</Text>
          </View>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>{t('bannerTitle')}</Text>
          <Text style={styles.bannerSubtitle}>{t('bannerSubtitle')}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('sectionTitle')}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.seeAll}>{t('seeAll')}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTutorials();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tutorials}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
          <TutorialCard
            item={item}
            onPress={() => navigation.navigate('TutorialDetail', { id: item._id })}
          />
        )}
          ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.black}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  greeting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingTop: 16,
    paddingBottom: 12,
  },
  greetingSmall: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  greetingName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  cartIcon: {
    padding: 8,
  },
  banner: {
    backgroundColor: Colors.gray900,
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 6,
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: Colors.gray300,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});

export default HomeScreen;
