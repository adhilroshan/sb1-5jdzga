import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Post, ChatMessage, DatingProfile, SharedFile, Event } from '../types';
import { dummyUsers, dummyPosts, dummyChats, dummyDatingProfiles, dummySharedFiles, dummyEvents } from '../services/dummyData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  chats: ChatMessage[];
  setChats: (chats: ChatMessage[]) => void;
  datingProfiles: DatingProfile[];
  setDatingProfiles: (profiles: DatingProfile[]) => void;
  sharedFiles: SharedFile[];
  setSharedFiles: (files: SharedFile[]) => void;
  events: Event[];
  setEvents: (events: Event[]) => void;
  addPost: (post: Post) => void;
  addChat: (chat: ChatMessage) => void;
  addDatingProfile: (profile: DatingProfile) => void;
  addSharedFile: (file: SharedFile) => void;
  addEvent: (event: Event) => void;
  attendEvent: (eventId: string, userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [datingProfiles, setDatingProfiles] = useState<DatingProfile[]>([]);
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      // Load user data from AsyncStorage
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      } else {
        setCurrentUser(dummyUsers[0]); // Set first user as default
      }

      // Load other data
      setPosts(dummyPosts);
      setChats(dummyChats);
      setDatingProfiles(dummyDatingProfiles);
      setSharedFiles(dummySharedFiles);
      setEvents(dummyEvents);
    };

    loadInitialData();
  }, []);

  const addPost = (post: Post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  const addChat = (chat: ChatMessage) => {
    setChats((prevChats) => [chat, ...prevChats]);
  };

  const addDatingProfile = (profile: DatingProfile) => {
    setDatingProfiles((prevProfiles) => [profile, ...prevProfiles]);
  };

  const addSharedFile = (file: SharedFile) => {
    setSharedFiles((prevFiles) => [file, ...prevFiles]);
  };

  const addEvent = (event: Event) => {
    setEvents((prevEvents) => [event, ...prevEvents]);
  };

  const attendEvent = (eventId: string, userId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, attendees: [...event.attendees, userId] }
          : event
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        posts,
        setPosts,
        chats,
        setChats,
        datingProfiles,
        setDatingProfiles,
        sharedFiles,
        setSharedFiles,
        events,
        setEvents,
        addPost,
        addChat,
        addDatingProfile,
        addSharedFile,
        addEvent,
        attendEvent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};