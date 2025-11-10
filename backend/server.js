/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mysql from "mysql2";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), "backend/.env"),
});

const app = express();
app.use(cors({
    origin: [
        process.env.CLIENT_URL,
        process.env.CLIENT_URL_LAN
    ],
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(express.json());
const PORT = process.env.PORT || 3031;

app.get("/", (req, res) => {
    res.send("Backend API running ✅");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running locally: http://localhost:${PORT}`);
    console.log(`✅ Server available on LAN: http://192.168.1.69:${PORT}`);
});

let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected");
})


// Fetch Methods
app.get("/api/getAppSettings", (req, res) => {
    const brandName = req.query.name;
    const sql = "SELECT * FROM app_settings where name = ?";
    con.query(sql, [brandName], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});