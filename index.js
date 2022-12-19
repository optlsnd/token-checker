import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const router = new Router();
router.post("/check", async (context) => {
	const { user, token } = await context.request.body().value;
	const result = bcrypt.compareSync(user, token);
	console.log(`${token}\t${user}\t${result}`);
	context.response.body = { result };
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context, next) => {
	try {
		await context.send({
			root: `${Deno.cwd()}/static`,
			index: "index.html",
		});
	} catch {
		await next();
	}
});

await app.listen({ port: 8000 });
