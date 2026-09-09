import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      { username: 'alex', email: 'alex@example.com', displayName: 'Alex Morgan', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
      { username: 'jordan', email: 'jordan@example.com', displayName: 'Jordan Lee', avatarUrl: 'https://i.pravatar.cc/150?img=32' },
      { username: 'sam', email: 'sam@example.com', displayName: 'Sam Rivera', avatarUrl: 'https://i.pravatar.cc/150?img=49' },
    ]);
    await Team.insertMany([
      { name: 'Trail Blazers', description: 'Steady progress and weekend adventures.', memberUsernames: ['alex', 'jordan'], totalPoints: 640 },
      { name: 'Core Crew', description: 'Short sessions, strong habits.', memberUsernames: ['sam'], totalPoints: 410 },
    ]);
    await Activity.insertMany([
      { username: 'alex', activityType: 'Running', durationMinutes: 35, calories: 320, points: 180, completedAt: new Date('2026-09-07T07:30:00Z') },
      { username: 'jordan', activityType: 'Cycling', durationMinutes: 50, calories: 460, points: 240, completedAt: new Date('2026-09-08T17:00:00Z') },
      { username: 'sam', activityType: 'Strength training', durationMinutes: 30, calories: 210, points: 170, completedAt: new Date('2026-09-08T18:30:00Z') },
    ]);
    await Leaderboard.insertMany([
      { username: 'jordan', teamName: 'Trail Blazers', points: 820, rank: 1, period: 'September 2026' },
      { username: 'alex', teamName: 'Trail Blazers', points: 640, rank: 2, period: 'September 2026' },
      { username: 'sam', teamName: 'Core Crew', points: 410, rank: 3, period: 'September 2026' },
    ]);
    await Workout.insertMany([
      { title: 'Morning Momentum', description: 'A balanced full-body session to start the day.', difficulty: 'beginner', durationMinutes: 25, exercises: ['Bodyweight squats', 'Push-ups', 'Plank'], target: 'Full body' },
      { title: 'Endurance Builder', description: 'A progressive cardio session for steady stamina.', difficulty: 'intermediate', durationMinutes: 40, exercises: ['Warm-up jog', 'Tempo intervals', 'Cool-down walk'], target: 'Cardio' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
