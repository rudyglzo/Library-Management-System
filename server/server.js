import express from "express";
import cors from "cors";
import books from "./routes/book.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/books", books);

//start the express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});