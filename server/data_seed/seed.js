import mongoose from "mongoose";
import {teachers, students, reviews, bookings} from "./data.js";
import {Teacher, Student, Review, Booking, User} from "../models/models_index.js";
import hashingPassword from "../utils/hashPassword.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/tutor_match";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
};

const seedDB = async(model,data) => {
    await model.deleteMany({});
    let dataInit = await model.insertMany(data);
    console.log(`DB updated`);
};

let role = ['Student', 'Teacher'];

const userSeedDB = async (model, role) => {
  const allTargetedUsers = await model.find({});
  const targettedUser = [];

  for (const u of allTargetedUsers) {
    const { _id, name, email, gender, avatar } = u;
    const password = name.split(' ')[0] + '@123';
    const hashedPassword = await hashingPassword(password);

    targettedUser.push({
      name,
      email,
      password: hashedPassword,
      gender,
      role: role,
      avatar,
      roleId: _id,
      roleModel: role,
    });
  }
  const userStudentInit = await User.insertMany(targettedUser);
  console.log('User DB updated');
};

userSeedDB(Student,'Student');

const reviewUpdate = async () => {
  const allReview = await Review.find({}).populate({ path: 'studentId' });

  for (const review of allReview) {
    const { _id, studentId } = review;

    if (studentId) {
      await Review.findByIdAndUpdate(_id, {
        studentName: studentId.name,
        studentAvatar: studentId.avatar,
      });
    }
  }

  console.log('All review objects updated with studentName and studentAvatar');
};




