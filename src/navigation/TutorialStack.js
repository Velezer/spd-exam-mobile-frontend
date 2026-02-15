import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TutorialListScreen from '../screens/tutorials/TutorialListScreen';
import TutorialDetailScreen from '../screens/tutorials/TutorialDetailScreen';
import { Colors } from '../constants/colors';

const Stack = createNativeStackNavigator();

const TutorialStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.white },
        headerTintColor: Colors.textPrimary,
        headerTitleStyle: { fontWeight: '600' },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="TutorialList"
        component={TutorialListScreen}
        options={{ title: 'Tutorial' }}
      />
      <Stack.Screen
        name="TutorialDetail"
        component={TutorialDetailScreen}
        options={{ title: 'Detail Tutorial' }}
      />
    </Stack.Navigator>
  );
};

export default TutorialStack;
