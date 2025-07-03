import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    avatar: String,
    countryCode: {
      type: Number,
      default: 91,
    },
    phoneNumber: {
      type: Number,
      default: 1234567890,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Prefer not to say'],
      required: true
    },
    subjects: [String],
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    hourlyRate: {
      type: Number,
    },
    location: String,
    online: Boolean,
    inPerson: Boolean,
    bio: String,
    experience: String,
    education: [String],
    availability: {
      days: [String],
      timeSlots: [String],
    },
  },
  {
    timestamps: true,
  }
);

teacherSchema.pre("insertMany", function (next, docs) {
  for (const doc of docs) {
    if (!doc.avatar || doc.avatar.trim() === "") {
      switch (doc.gender) {
        case "Male":
          doc.avatar =
            "https://res.cloudinary.com/djenv5out/image/upload/man_vdvbem.png";
          break;
        case "Female":
          doc.avatar =
            "https://res.cloudinary.com/djenv5out/image/upload/woman_1_szlydn.png";
          break;
        default:
          doc.avatar =
            "https://res.cloudinary.com/djenv5out/image/upload/user_wlzzc7.png";
          break;
      }
    }
  }
  next();
});


// 🔁 Conditional default avatar based on gender
teacherSchema.pre("save", function (next) {
  if (!this.avatar || this.avatar.trim() === "") {
    switch (this.gender) {
      case "Male":
        this.avatar =
          "https://res.cloudinary.com/djenv5out/image/upload/man_vdvbem.png";
        break;
      case "Female":
        this.avatar =
          "https://res.cloudinary.com/djenv5out/image/upload/woman_1_szlydn.png";
        break;
      default:
        this.avatar =
          "https://res.cloudinary.com/djenv5out/image/upload/user_wlzzc7.png";
        break;
    }
  }
  next();
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
