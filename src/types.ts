import { User, Post, ChatMessage, DatingProfile, SharedFile } from './types';

// Add this new interface
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  attendees: string[];
}