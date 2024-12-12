import express from "express";
//connect to database
import db from "../db/connection.js";

const router = express.Router();

//this will get a list of all books
router.get("/", async (req, res) => {
    let collection = await db.collection("books");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

//this will give a list of available books
router.get("/available", async (req, res) => {
    let collection = await db.collection("books");
    let results = await collection.find({status:false}).toArray();
    res.send(results).status(200);
});

//this will give a list of checked out books
router.get("/checked-out", async (req, res) => {
    let collection = await db.collection("books");
    let results = await collection.find({status:true}).toArray();
    res.send(results).status(200);
});

// This will checkout a book
router.post("/checkout", async (req, res) => {
    try {
        let collection = await db.collection("books"); // Added this line
        
        // First check if book exists and is available
        const book = await collection.findOne({ isbn: req.body.isbn });
        
        if (!book) {
            res.status(404).send("Book not found");
            return;
        }

        if (book.status === true) {
            res.status(400).send("Book is already checked out");
            return;
        }

        const query = { isbn: req.body.isbn };
        let updates = {
            $set: {
                status: true,
                checked_out_by: req.body.checkedOutBy,
                due_date: new Date(req.body.dueDate),
            },
        };
        
        let result = await collection.findOneAndUpdate(
            query, 
            updates, 
            { returnDocument: 'after' }
        );
        
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error checking out book");
    }
});

// This will checkin a book
router.post("/checkin", async (req, res) => {
    try {
        let collection = await db.collection("books"); // Added this line
        
        // First check if book exists and is checked out
        const book = await collection.findOne({ isbn: req.body.isbn });
        
        if (!book) {
            res.status(404).send("Book not found");
            return;
        }

        if (book.status === false) {
            res.status(400).send("Book is already checked in");
            return;
        }

        const query = { isbn: req.body.isbn };
        let updates = {
            $set: {
                status: false,
                checked_out_by: null,
                due_date: null
            },
        };
        
        let result = await collection.findOneAndUpdate(
            query, 
            updates, 
            { returnDocument: 'after' }
        );
        
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error checking in book");
    }
});

export default router;