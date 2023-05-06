// second file
import express from 'express'
import Book from './models/book.js'
import connectDB from './config/connectDb.js'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

//Routes go here
app.get('/', (req, res) => {
  res.send({ title: 'Books' });
})

app.get('/books', async (req, res) => {
  const book = await Book.find();
  if (book) {
    res.json(book)
  } else {
    res.send("Something went wrong in database.");
  }
});

// create a new book note
app.post('/add-note', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json({
      "Data": "Added Successfully",
      "status": "200",
      "book": book
    })
  } catch (error) {
    console.log("err", + error);
  }
})


app.delete("/delete-note", async (req, res) => {
  try {
    const deletone = await Book.findByIdAndDelete({ _id: req.body.id });
    if (deletone) {
      res.json({
        "Data": "Deleted Successfully",
        "status": "200",
      })
    }
    else {
      res.json({
        "Data": "Already Deleted",
        "status": "200",
      })
    }
  } catch (error) {
    console.log("err", + error);
  }
});

app.post("/update-note", async (req, res) => {
  try {
    // updtae the data for the id and return the updated data from request body
    const id = req.body.id;
    let product = Book.findById(id)
    if (product) {
      product = await Book.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      })
      res.json({
        "Data": "Updated Successfully",
        "status": "200",
        "book": product
      })
    }
    else {
      res.json({
        "Data": "Data Not Found",
        "status": "404",
      })
    }

  } catch (error) {
    console.log("err", + error);
  }
});

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1)
})

//Connect to the database before listening
connectDB()
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

//Handling Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1)
  })
})