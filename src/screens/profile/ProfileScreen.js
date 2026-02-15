import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  return (
    <LinearGradient colors={[Colors.authBackground, Colors.authBackgroundDark]} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={Colors.white} />
        </View>
        <Text style={styles.email}>{user?.email || ''}</Text>
      </View>

      {/* <View style={styles.menu}>
      </View> */}

        <View style={[styles.logoutSection, { paddingBottom: 20 + insets.bottom }]}>
          <Button title="Logout" onPress={handleLogout} variant="secondary" />
        </View>
      </View>
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 28,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  email: {
    fontSize: 14,
    color: Colors.white,
  },
  menu: {
    marginTop: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuText: {
    fontSize: 16,
    color: Colors.white,
  },
  logoutSection: {
    padding: 20,
    marginTop: 'auto',
  },
});

export default ProfileScreen;
