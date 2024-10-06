import { Post, User, ChatMessage, DatingProfile, SharedFile, Event } from '../types';

// ... (keep existing dummy data)

export const dummyEvents: Event[] = [
  {
    id: '1',
    title: 'Annual College Fest',
    description: 'Join us for a week-long celebration of art, music, and culture!',
    date: '2023-07-15T10:00:00Z',
    location: 'College Main Grounds',
    organizer: 'Student Council',
    attendees: ['1', '2', '3']
  },
  {
    id: '2',
    title: 'Tech Symposium 2023',
    description: 'Explore the latest in technology with industry experts and hands-on workshops.',
    date: '2023-08-05T09:00:00Z',
    location: 'College Auditorium',
    organizer: 'Computer Science Department',
    attendees: ['2', '3']
  },
  {
    id: '3',
    title: 'Career Fair',
    description: 'Meet potential employers and explore internship opportunities.',
    date: '2023-09-10T11:00:00Z',
    location: 'College Sports Complex',
    organizer: 'Career Services',
    attendees: ['1']
  }
];