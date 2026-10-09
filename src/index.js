import express from "express";
import dotenv from "dotenv";

import memberRoutes from "./routes/memberRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());


// ==========================================
// ROOT
// ==========================================

app.get("/", (req, res) => {
    res.json({
        message: "Library Loans API is running",
        version: "1.0.0"
    });
});


// ==========================================
// ROUTES
// ==========================================

app.use("/api/members", memberRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/loans", loanRoutes);


// ==========================================
// 404
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        error: "Endpoint not found"
    });
});


// ==========================================
// SERVER
// ==========================================

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});