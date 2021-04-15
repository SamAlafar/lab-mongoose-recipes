const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const recipe1 = {
  title: "Asian Glazed Chicken Thighs",
  level: "Amateur Chef",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs",
  ],
  cuisine: "Asian",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu",
};
const newDuration = 100;
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Iteration 2
    Recipe.create(recipe1)
      .then((recipe) => {
        console.log(`Recipe name: ${recipe1.title}`);
      })
      .catch((error) => {
        console.error(error);
      });
    //Iteration 3
    Recipe.insertMany(data)
      .then((data) => {
        data.forEach((data) => {
          console.log(`Recipe name is: ${data.title}`);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    //Iteration 4
    Recipe.findOneAndUpdate(
      { _id: "60784ba40fb1d42ee8b2aa10" },
      { $set: { duration: 100 } },
      { new: true }
    )
      .then((recipe) => console.log("Success!"))
      .catch((error) => console.error(error));
    //Iteration 5
    Recipe.deleteOne({ _id: "60784ba40fb1d42ee8b2aa0f" })
      .then((recipe) => console.log("Success"))
      .catch((error) => console.error(error));
    //Iteration 6
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
