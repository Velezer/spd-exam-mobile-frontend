import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 28,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
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
    color: Colors.textSecondary,
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
    color: Colors.textPrimary,
  },
  logoutSection: {
    padding: 20,
    marginTop: 'auto',
  },
});

export default ProfileScreen;
