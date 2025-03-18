import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password"),
  email: text("email").unique(),
  displayName: text("display_name"),
  profilePicture: text("profile_picture"),
  googleId: text("google_id").unique(),
  isGoogleUser: text("is_google_user").default("false"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  displayName: true,
  profilePicture: true,
  googleId: true,
  isGoogleUser: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Chat model types
export const modelType = z.enum([
  "deepseek-r1", 
  "deepseek-v3",
  "claude-3-7-sonnet", 
  "claude-3-5-haiku", 
  "gemini-2-0-flash", 
  "openai-o3-mini", 
  "openai-o1", 
  "openai-o1-mini", 
  "grok-2"
]);

export type ModelType = z.infer<typeof modelType>;

// Message schema
export const messageRole = z.enum(["user", "assistant", "system"]);
export type MessageRole = z.infer<typeof messageRole>;

export const messageSchema = z.object({
  role: messageRole,
  content: z.string(),
  timestamp: z.number().optional(),
});

export type Message = z.infer<typeof messageSchema>;

// Chat request/response schemas
export const chatRequestSchema = z.object({
  model: modelType,
  messages: z.array(messageSchema),
  temperature: z.number().min(0).max(1).optional().default(0.7),
  maxTokens: z.number().positive().optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

export const chatResponseSchema = z.object({
  message: messageSchema,
  modelUsed: modelType,
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;
