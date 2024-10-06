import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider } from './src/context/AppContext';
import { HomeScreen } from './src/components/screens/HomeScreen';
import { NoticeboardScreen } from './src/components/screens/NoticeboardScreen';
import { ChatScreen } from './src/components/screens/ChatScreen';
import { DatingScreen } from './src/components/screens/DatingScreen';
import { P2PShareScreen } from './src/components/screens/P2PShareScreen';
import { ProfileScreen } from './src/components/screens/ProfileScreen';
import { EventsScreen } from './src/components/screens/EventsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <AppProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Noticeboard') {
                  iconName = focused ? 'notifications' : 'notifications-outline';
                } else if (route.name === 'Chat') {
                  iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                } else if (route.name === 'Dating') {
                  iconName = focused ? 'heart' : 'heart-outline';
                } else if (route.name === 'P2P Share') {
                  iconName = focused ? 'share' : 'share-outline';
                } else if (route.name === 'Events') {
                  iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Noticeboard" component={NoticeboardScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Dating" component={DatingScreen} />
            <Tab.Screen name="P2P Share" component={P2PShareScreen} />
            <Tab.Screen name="Events" component={EventsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </AppProvider>
    </PaperProvider>
  );
}