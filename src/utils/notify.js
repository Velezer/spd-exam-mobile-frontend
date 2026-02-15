import { Alert, Platform, ToastAndroid } from 'react-native';

export function notify(message, type = 'info') {
  if (Platform.OS === 'android') {
    // Toast for quick notifications on Android
    ToastAndroid.show(`${type.toUpperCase()}: ${message}`, ToastAndroid.LONG);
    return;
  }

  // Simple alert fallback (iOS and others)
  Alert.alert(type.toUpperCase(), message);
}
