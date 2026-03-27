import "dotenv/config"; // Correct way to load dotenv in ES Modules
import app from "./app.js"; // Import the app instance
import connectDB from "./config/db.js";
connectDB(); 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
