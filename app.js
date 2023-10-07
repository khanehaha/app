const express  = require("express");
const cors = require("cors");
const res = require("express/lib/response");
const ApiError = require("./app/api-error");
const error = new Error("Resource not found");

const app = express();
const contactsRouter = require("./app/routes/contact.route");

app.use(cors());

app.use(express.json());

app.get("/",(req, res)=> {
    res.json({ message: "welcome to contact book application."});
});
app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có định nghĩa nào
    // Khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

//define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) =>{
    //Middleware xử lý lỗi tập trung.
    //Trong các đoạn code xử lý ở các route, gọi next(error)
    //      sẽ chuyển về middleware xử lý lỗi này
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});


module.exports = app;