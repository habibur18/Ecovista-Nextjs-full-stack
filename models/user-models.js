const { mongoose } = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  bio: {
    required: true,
    type: String,
  },
});

schema.methods.confirm = function confirm() {
  const greeting = this.name
    ? "User name is " + this.name
    : 'Don"find a user name';
  console.log(greeting);
};

schema.methods.greet = function greet() {
  const greeting = this.name
    ? "User name is " + this.name
    : 'Don"find a user name';
  console.log(greeting);
};

// export const UserModel =
//   mongoose.models.users ?? mongoose.model("users", schema);

export const UserModel =
  mongoose.models.users ?? mongoose.model("users", schema);
