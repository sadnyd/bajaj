const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors")
app.use(bodyParser.json());
app.use(cors("*"));


// Define your routes and their corresponding handlers
app.get("/bfhl", (req, res) => {
  res.json({
    operation_code: 1,
  });
});

app.post("/bfhl", (req, res) => {
  const { data } = req.body;
  const numberArray = [];
  const alphaArray = [];
  let highest_lowercase_alphabet = [];
  data.forEach(element => {
    if (!isNaN(+element)) {
        numberArray.push(element);
    } else if (typeof element === 'string') {
        // Check if the string is a single alphabet character
        if (element.match(/^[a-zA-Z]$/)) {
            alphaArray.push(element);
            // Check if the character is lowercase and update maxLowerCaseChar if it is the highest
            

// Assuming 'element' is defined and is a string
        if (element === element.toLowerCase()) {
            highest_lowercase_alphabet.push(element);
            highest_lowercase_alphabet.sort(); // Sorts alphabetically by default

            // Keep only the first element after sorting
            highest_lowercase_alphabet = [highest_lowercase_alphabet[0]];
        }

        }
    }
});
  res.status(201).json({
    is_success: true,
    user_id: "devayan_das_27052002",
    email: "devayan.das2012@vitstudent.ac.in",
    roll_number: "21BCE2247",
    numbers: numberArray,
    alphabets: alphaArray,
    highest_lowercase_alphabet: highest_lowercase_alphabet,
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 3000");
});