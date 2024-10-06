import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { bottomTabsNavigatorFactory } from "react-nativescript-navigation";

import { HomeScreen } from "./screens/HomeScreen";
import { NoticeboardScreen } from "./screens/NoticeboardScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { DatingScreen } from "./screens/DatingScreen";
import { P2PShareScreen } from "./screens/P2PShareScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

const BottomTabNavigator = bottomTabsNavigatorFactory();

export const MainStack = () => (
  <BaseNavigationContainer>
    <BottomTabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#65adf1",
        },
        headerTintColor: "white",
        tabBarActiveTintColor: "#65adf1",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <BottomTabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <label className={`fas text-${size} text-${color}`}>&#xf015;</label>
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Noticeboard"
        component={NoticeboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <label className={`fas text-${size} text-${color}`}>&#xf0a1;</label>
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <label className={`fas text-${size} text-${color}`}>&#xf086;</label>
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Dating"
        component={DatingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <label className={`fas text-${size} text-${color}`}>&#xf004;</label>
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="P2P Share"
        component={P2PShareScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <label className={`fas text-${size} text-${color}`}>&#xf1e0;</label>
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <label className={`fas text-${size} text-${color}`}>&#xf007;</label>
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  </BaseNavigationContainer>
);