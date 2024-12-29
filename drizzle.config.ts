import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "server/db/schemas/*",
	out: "drizzle",
	dbCredentials: {
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		url: Bun.env["DATABASE_URL"] as string,
	},
});
