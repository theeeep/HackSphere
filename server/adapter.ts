import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";

import { z } from "zod";

const EnvSchema = z.object({
	DATABASE_URL: z.string().url(),
});

// here we validate the environment
const processEnv = EnvSchema.parse(Bun.env);

// here we connect to the database and create a query client
const queryClient = postgres(processEnv.DATABASE_URL);

// here we create the drizzle adapter and a database instance
const db = drizzle(queryClient);

export { db };
