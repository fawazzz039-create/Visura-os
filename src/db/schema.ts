import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Users table
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user"), // "user", "artist", "admin"
  avatar: text("avatar"), // URL to avatar image
  bio: text("bio"), // User bio
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Photography gallery items
export const photos = sqliteTable("photos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(), // URL to stored image
  thumbnailUrl: text("thumbnail_url"),
  price: real("price").notNull().default(0),
  category: text("category").default("general"), // "landscape", "portrait", "abstract", "general"
  isEncrypted: integer("is_encrypted", { mode: "boolean" }).default(true),
  encryptionKey: text("encryption_key"), // Stored encrypted key reference
  artistId: integer("artist_id").references(() => users.id),
  artistName: text("artist_name").notNull(),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  isForSale: integer("is_for_sale", { mode: "boolean" }).default(true),
  rightsProtected: integer("rights_protected", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Art/drawing gallery items
export const arts = sqliteTable("arts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  price: real("price").notNull().default(0),
  category: text("category").default("general"), // "digital", "traditional", "abstract", "general"
  medium: text("medium"), // "oil", "acrylic", "digital", "watercolor", etc.
  dimensions: text("dimensions"), // "100x80cm" etc.
  isEncrypted: integer("is_encrypted", { mode: "boolean" }).default(true),
  encryptionKey: text("encryption_key"),
  artistId: integer("artist_id").references(() => users.id),
  artistName: text("artist_name").notNull(),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  isForSale: integer("is_for_sale", { mode: "boolean" }).default(true),
  investmentScore: real("investment_score"), // 0-100 investment potential
  priceGrowth: real("price_growth"), // Expected price growth percentage
  rightsProtected: integer("rights_protected", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Transactions/Purchases
export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  itemId: integer("item_id").notNull(),
  itemType: text("item_type").notNull(), // "photo" or "art"
  amount: real("amount").notNull(),
  status: text("status").default("pending"), // "pending", "completed", "failed"
  paymentMethod: text("payment_method"),
  transactionHash: text("transaction_hash"), // Blockchain reference
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// User favorites/likes
export const favorites = sqliteTable("favorites", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  itemId: integer("item_id").notNull(),
  itemType: text("item_type").notNull(), // "photo" or "art"
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
