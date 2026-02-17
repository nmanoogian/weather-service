const http = require("http");

const ZIPCODE = process.env.ZIPCODE;
if (!ZIPCODE) {
  console.error("ZIPCODE environment variable is required");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    const response = await fetch(`https://wttr.in/${ZIPCODE}?format=j1`);
    const data = await response.json();
    const feelsLike = data.current_condition[0].FeelsLikeF;
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Feels like ${feelsLike}F`);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Failed to fetch weather data");
  }
});

server.listen(PORT, () => {
  console.log(`Weather service listening on port ${PORT}`);
});
