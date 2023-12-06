// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
// Initialize Express app
const app = express();
// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gepigeny'
});
// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/login',async (req,res) =>{
    const {username,password} = req.body;
    //compare using bcrypt.compare
    hashedPassword = await bcrypt.hash(password,10);
    connection.query(
        'SELECT * FROM user where username = ? AND password_hash = ?',
        [username,hashedPassword],
        (error,results)=>{
            if(error){
                console.error("login error")
                return res.status(500).json({error: 'Server error'});
            }

            if(results.length === 0){
                return res.status(401).json({error: hashedPassword});
            }
            console.log(results[0]);
            return res.json(
                {
                    message : 'Login successful',
                    userid : results[0]['user_id']
                }
            )
        }
    )
})

app.post('/register',async (req,res) =>{
    const {username,password} = req.body;
    hashedPassword = await bcrypt.hash(password,10);
    connection.query(
        'INSERT into user (username,password_hash) values(?,?)',
        [username,hashedPassword],
        (error,results)=>{
            if(error){
                return res.status(500).json({error: 'Server error'});
            }
            
            return res.json(
                {
                    message : 'Registration successful',
                }
            )
        }
    )
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});