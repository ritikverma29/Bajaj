const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const USER_ID = "your_fullname_ddmmyyyy";
const EMAIL = "your_email@xyz.com";
const ROLL_NUMBER = "your_roll_number";

// POST request to process data
app.post("/bfhl", (req, res) => {
    let { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let numbers = [];
    let alphabets = [];
    
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    let highestAlphabet = alphabets.length > 0 ? [alphabets.sort().reverse()[0]] : [];

    res.json({
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

// GET request to return operation code
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

// Set the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
