const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>");
    res.write("Learn Nodejs - Lec 1");
    res.write("</title>");
    res.write("</head>");
    res.write("<body>");
    res.write('<form action="message" method="POST">');
    res.write('<input type="text" name="message" />');
    res.write("<button>Send</button>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  }

  //   console.log("server is running");
  //   res.write("server is running at 500");
};
module.exports = requestHandler;
