import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    description:{
      type: String,
      trim: [true, "Description cannot be empty"],
    },
    genere:{
      type: String,
      trim: [true, "Genre cannot be empty"],
      enum: ["Fiction", "Non-Fiction", "Science ", "History",  "Other"],
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
