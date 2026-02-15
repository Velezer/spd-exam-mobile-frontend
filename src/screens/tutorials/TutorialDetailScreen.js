import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import ProductClient from '../../api/ProductClient';
import { formatRelativeTime } from '../../utils/dateFormatter';
import { isYouTubeUrl, getYouTubeEmbedUrl } from '../../utils/youtube';
import LoadingSpinner from '../../components/LoadingSpinner';
import { WebView } from 'react-native-webview';

const TutorialDetailScreen = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await ProductClient.getTutorialById(id);
      setItem(res.data);
    } catch (err) {
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!item) return null;

  const renderVideo = () => {
    if (!item.videoUrl) return null;
    if (isYouTubeUrl(item.videoUrl)) {
      const embed = getYouTubeEmbedUrl(item.videoUrl);
      if (!embed) return null;
      return (
        <View style={styles.videoWrapper}>
          <WebView
            source={{ uri: embed }}
            style={styles.webview}
            javaScriptEnabled
          />
        </View>
      );
    }

    // fallback: open link
    return (
      <Text style={styles.link} onPress={() => Linking.openURL(item.videoUrl)}>
        Buka video
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Image source={{ uri: item.imgUrl }} style={styles.image} />
        <Text style={styles.meta}>{formatRelativeTime(item.createdAt)}</Text>

        {renderVideo()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 },
  image: { width: '100%', height: 200, borderRadius: 8, backgroundColor: Colors.gray100 },
  meta: { color: Colors.textSecondary, marginTop: 8 },
  videoWrapper: { height: 220, marginTop: 12, borderRadius: 8, overflow: 'hidden' },
  webview: { flex: 1 },
  link: { color: Colors.primary, marginTop: 12 },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
  description: { color: Colors.textSecondary, lineHeight: 20 },
});

export default TutorialDetailScreen;
