// My Habits Data
// This file contains all static data that can be easily replaced with backend API calls

export interface HabitData {
  id: string;
  name: string;
  description: string;
  frequency: string;
  isCompleted: boolean;
  hasNotification: boolean;
}

export interface CoachData {
  id: string;
  name: string;
  avatar: string;
  completedHabits: number;
  totalHabits: number;
  habits: HabitData[];
}


// Coaches Data
export const coachesData: CoachData[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    completedHabits: 3,
    totalHabits: 3,
    habits: [
      {
        id: '1',
        name: 'Morning Meditation',
        description: 'Start your day with 1 minutes of guided meditations',
        frequency: 'Daily',
        isCompleted: true,
        hasNotification: true
      },
      {
        id: '2',
        name: 'Morning Meditation',
        description: 'Start your day with 1 minutes of guided meditations',
        frequency: 'Daily',
        isCompleted: false,
        hasNotification: false
      },
      {
        id: '3',
        name: 'Morning Meditation',
        description: 'Start your day with 1 minutes of guided meditations',
        frequency: 'Daily',
        isCompleted: false,
        hasNotification: false
      }
    ]
  },
  {
    id: '2',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    completedHabits: 3,
    totalHabits: 3,
    habits: [
      {
        id: '4',
        name: 'Morning Meditation',
        description: 'Start your day with 1 minutes of guided meditations',
        frequency: 'Daily',
        isCompleted: true,
        hasNotification: true
      },
      {
        id: '5',
        name: 'Morning Meditation',
        description: 'Start your day with 1 minutes of guided meditations',
        frequency: 'Daily',
        isCompleted: false,
        hasNotification: false
      },
      {
        id: '6',
        name: 'Morning Meditation',
        description: 'Start your day with 1 minutes of guided meditations',
        frequency: 'Daily',
        isCompleted: false,
        hasNotification: false
      }
    ]
  },
  {
    id: '3',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    completedHabits: 3,
    totalHabits: 3,
    habits: [
      {
        id: '7',
        name: 'Morning Meditation',
        description: 'Start your day with 1 minutes of guided meditations',
        frequency: 'Daily',
        isCompleted: true,
        hasNotification: true
      },
      {
        id: '8',
        name: 'Morning Meditation',
        description: 'Start your day with 1 minutes of guided meditations',
        frequency: 'Daily',
        isCompleted: false,
        hasNotification: false
      },
      {
        id: '9',
        name: 'Morning Meditation',
        description: 'Start your day with 1 minutes of guided meditations',
        frequency: 'Daily',
        isCompleted: false,
        hasNotification: false
      }
    ]
  }
];

