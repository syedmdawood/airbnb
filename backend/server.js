import 'dotenv/config';
import connectDb from './Config/mongodb.js';
import express from 'express';
import cors from 'cors';
import connectCloudinary from './Config/cloudinary.js';
import adminRouter from './Routes/adminRoutes.js';


const app = express();
connectDb();
connectCloudinary()

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


// Api endpoints 

app.use("/api/admin", adminRouter)

app.get("/", (req, res) => {
    res.send("API Working Properly");
});


app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
