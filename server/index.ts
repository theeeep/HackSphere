import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ErrorResponse } from "../shared/types";

const app = new Hono();

// app.get("/", (c) => {
// 	throw new HTTPException(400, { message: "Bad Request" });
// 	return c.text("Hello Hono!");
// });

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		const errResponse =
			err.res ??
			c.json(
				{
					success: false,
					error: err.message,
					isFormError:
						err.cause && typeof err.cause === "object" && "form" in err.cause
							? err.cause.form === true
							: false,
				},
				err.status,
			);
		return errResponse;
	}

	return c.json<ErrorResponse>(
		{
			success: false,
			error:
				Bun.env.NODE_ENV === "production"
					? "Internal Server Error"
					: (err.stack ?? err.message),
			isFormError:
				err.cause && typeof err.cause === "object" && "form" in err.cause
					? err.cause.form === true
					: false,
		},
		500,
	);
});

export default app;
