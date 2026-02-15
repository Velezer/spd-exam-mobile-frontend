import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import ProductClient from '../../api/ProductClient';
import TutorialCard from '../../components/TutorialCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';

const TutorialListScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await ProductClient.getTutorials();
      setItems(res.data || []);
    } catch (err) {
      // ignore for now
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <LinearGradient colors={[Colors.authBackground, Colors.authBackgroundDark]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TutorialCard
            item={item}
            onPress={() => navigation.navigate('TutorialDetail', { id: item._id })}
          />
        )}
        contentContainerStyle={items.length === 0 ? styles.empty : styles.list}
        ListEmptyComponent={
          <EmptyState title="Belum ada tutorial" subtitle="Tutorial akan muncul di sini" />
        }
      />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  list: {
    padding: 12,
  },
  empty: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
});

export default TutorialListScreen;
