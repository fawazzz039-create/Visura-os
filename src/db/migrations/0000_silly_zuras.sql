CREATE TABLE `arts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`image_url` text NOT NULL,
	`thumbnail_url` text,
	`price` real DEFAULT 0 NOT NULL,
	`category` text DEFAULT 'general',
	`medium` text,
	`dimensions` text,
	`is_encrypted` integer DEFAULT true,
	`encryption_key` text,
	`artist_id` integer,
	`artist_name` text NOT NULL,
	`views` integer DEFAULT 0,
	`likes` integer DEFAULT 0,
	`is_for_sale` integer DEFAULT true,
	`investment_score` real,
	`price_growth` real,
	`rights_protected` integer DEFAULT true,
	`created_at` integer,
	FOREIGN KEY (`artist_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`item_id` integer NOT NULL,
	`item_type` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `photos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`image_url` text NOT NULL,
	`thumbnail_url` text,
	`price` real DEFAULT 0 NOT NULL,
	`category` text DEFAULT 'general',
	`is_encrypted` integer DEFAULT true,
	`encryption_key` text,
	`artist_id` integer,
	`artist_name` text NOT NULL,
	`views` integer DEFAULT 0,
	`likes` integer DEFAULT 0,
	`is_for_sale` integer DEFAULT true,
	`rights_protected` integer DEFAULT true,
	`created_at` integer,
	FOREIGN KEY (`artist_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`item_id` integer NOT NULL,
	`item_type` text NOT NULL,
	`amount` real NOT NULL,
	`status` text DEFAULT 'pending',
	`payment_method` text,
	`transaction_hash` text,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'user',
	`avatar` text,
	`bio` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);