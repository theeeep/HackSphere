import { Lucia } from "lucia";

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production",
		},
	},
});

// IMPORTANT
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}
