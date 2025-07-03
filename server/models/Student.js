import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Prefer not to say'],
      required: true
    },
    countryCode: {
      type: Number,
      default: 91,
    },
    phoneNumber: {
      type: Number,
      default: 1234567890,
    },
    avatar: {
      type: String,
    },
    institution: {
        name: {
            type: String
        },
        class: {
            type:String
        },
    },
    subjects: {
        type:[String]
    },
},
  { timestamps: true }
);

studentSchema.pre("insertMany", function (next, docs) {
  for (const doc of docs) {
    if (!doc.avatar || doc.avatar.trim() === "") {
      switch (doc.gender) {
        case "Male":
          doc.avatar =
            "https://res.cloudinary.com/djenv5out/image/upload/student_male_odhxnc.png";
          break;
        case "Female":
          doc.avatar =
            "https://res.cloudinary.com/djenv5out/image/upload/student_female_gmcfq0.png";
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
studentSchema.pre('save', function (next) {
  if (!this.avatar || this.avatar.trim() === '') {
    switch (this.gender) {
      case 'Male':
        this.avatar =
          'https://res.cloudinary.com/djenv5out/image/upload/student_male_odhxnc.png';
        break;
      case 'Female':
        this.avatar =
          'https://res.cloudinary.com/djenv5out/image/upload/student_female_gmcfq0.png';
        break;
      default:
        this.avatar =
          'https://res.cloudinary.com/djenv5out/image/upload/user_wlzzc7.png';
        break;
    }
  }
  next();
});

const Student = mongoose.model('Student', studentSchema);
export default Student;