import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("❌ Server failed:", err);
  process.exit(1);
}); 

