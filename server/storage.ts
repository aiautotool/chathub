import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createOrUpdateGoogleUser(profile: any): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.googleId === googleId,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      id,
      username: insertUser.username, 
      password: insertUser.password || null,
      email: insertUser.email || null,
      displayName: insertUser.displayName || null,
      profilePicture: insertUser.profilePicture || null,
      googleId: insertUser.googleId || null,
      isGoogleUser: insertUser.isGoogleUser || null
    };
    this.users.set(id, user);
    return user;
  }

  async createOrUpdateGoogleUser(profile: any): Promise<User> {
    // Check if user already exists with this Google ID
    const existingUser = await this.getUserByGoogleId(profile.id);
    if (existingUser) {
      // Update existing user with latest profile info
      const updatedUser = {
        ...existingUser,
        displayName: profile.displayName || existingUser.displayName,
        email: profile.emails[0]?.value || existingUser.email,
        profilePicture: profile.photos[0]?.value || existingUser.profilePicture
      };
      this.users.set(existingUser.id, updatedUser);
      return updatedUser;
    }

    // Check if a user with same email exists
    const email = profile.emails[0]?.value;
    if (email) {
      const userWithEmail = await this.getUserByEmail(email);
      if (userWithEmail) {
        // Link google account to existing email account
        const updatedUser = {
          ...userWithEmail,
          googleId: profile.id,
          isGoogleUser: "true",
          displayName: profile.displayName || userWithEmail.displayName,
          profilePicture: profile.photos[0]?.value || userWithEmail.profilePicture
        };
        this.users.set(userWithEmail.id, updatedUser);
        return updatedUser;
      }
    }

    // Create new user
    const newUser: InsertUser = {
      username: email || `google_${profile.id}`,
      email: email || null,
      displayName: profile.displayName || null,
      profilePicture: profile.photos[0]?.value || null,
      googleId: profile.id,
      isGoogleUser: "true",
      password: null
    };

    return this.createUser(newUser);
  }
}

export const storage = new MemStorage();
