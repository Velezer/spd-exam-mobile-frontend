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
    return (
      <>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Welcome</Text>
          <Text style={styles.bannerSubtitle}>Discover new tutorials and tips</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Tutorials</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.seeAll}>See all</Text>
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
