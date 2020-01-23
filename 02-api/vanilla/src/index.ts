import http from "http";
import url from "url";

const todos = [
  {
    id: "1",
    task: "Do laundry"
  },
  {
    id: "2",
    task: "Walk the dog"
  }
];

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url!);

  if (!pathname) throw new Error("Unparseable url");

  let chunks: Uint8Array[] = [];

  req
    .on("data", chunk => {
      chunks.push(chunk);
    })
    .on("end", () => {
      if (req.headers["content-type"] !== "application/javascript")
        throw new Error(
          "Only Content-Type: application/javascript is supported"
        );

      const body = JSON.parse(Buffer.concat(chunks).toString());

      // GET /todos
      if (req.method === "GET" && pathname === "/todos") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos));
      }

      // GET /todos/:id
      const re = new RegExp("/todos/(\\w+)", "g");
      const match = re.exec(pathname);

      if (req.method === "GET" && match) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos[Number(match[1]) - 1]));
      }

      // PUT /todos/:id
      if (req.method === "PUT" && match) {
        res.writeHead(200, { "Content-Type": "application/json" });
        const id = Number(match[1]) - 1;
        todos[id] = { ...todos[id], ...body };
        res.end(JSON.stringify(todos[id]));
      }

      // POST /todos
      if (req.method === "POST" && pathname === "/todos") {
        todos.push({
          id: todos.length + 1,
          ...body
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos));
      }

      res.writeHead(501);
      res.end("501 Not Implemented");
    });
});

server.listen(3000, () => {
  console.log("> Listening on port 3000");
});
