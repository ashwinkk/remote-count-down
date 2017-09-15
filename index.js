const express = require("express");
const http = require("http");
const url = require("url");
const path = require("path");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

/*wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
 
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
 
  ws.send('something');
});*/

wss.on("connection", function connection(ws) {
	ws.on("message", function incoming(data) {
		// Broadcast to everyone else.
		console.log(data);
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		});
	});
});

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "timer", "index.html"));
});
app.get("/favicon", function(req, res) {
	res.sendFile(path.join(__dirname, "tedfav.png"));
});
app.get("/script", function(req, res) {
	res.sendFile(path.join(__dirname, "timer", "js", "index.js"));
});
app.get("/foundation", function(req, res) {
	res.sendFile(path.join(__dirname, "css", "foundation.min.css"));
});
app.get("/controller", function(req, res) {
	res.sendFile(path.join(__dirname, "timer", "controller.html"));
});

server.listen(8080, function listening() {
	console.log("Listening on %d", server.address().port);
});
