import { createApp, React, ReactDOMServer, serveStatic } from "./deps.ts";

const app = createApp();
app.use(serveStatic("./public"));

let colores: string[] = ["yellow", "brown"];

app.handle("/", async (req) => {
  if (req.method === "POST") {
    const bodyForm = await req.formData();
    if (bodyForm) {
      const formColor = bodyForm.value("color");
      if (formColor) {
        colores.push(formColor);
      }
    }
  }

  const listItems = colores.map((color) => (
    <li style={{ color: color }}>{color}</li>
  ));
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Servidor en Deno</title>
          <link rel="stylesheet" href="./styles.css" />
        </head>
        <body>
          <div className="container">
            <form
              action="/"
              method="post"
            >
              <input name="color" id="color" type="text" />
            </form>
            <div className="lista">
              <ul>
                {listItems}
              </ul>
            </div>
          </div>
        </body>
      </html>,
    ),
  });
});

const PORT = Number(Deno.env.get("PORT")) || 8080;

app.listen({ port: PORT });

// denon run --allow-net servestReact.tsx
