const mongoose = require('mongoose');


// connect to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error(err));

// Create a Person Prototype
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);


// Create a new person and save it to the database:
const person = new Person({ name: 'John', age: 30, favoriteFoods: ['pizza', 'sushi'] });
person.save(function(err, data) {
  if (err) console.error(err);
  console.log('New person saved to database:', data);
});

// Create several people using Model.create() and the arrayOfPeople argument:
const arrayOfPeople = [
    { name: 'Alice', age: 25, favoriteFoods: ['tacos', 'burritos'] },
    { name: 'Bob', age: 35, favoriteFoods: ['pizza', 'pasta'] },
    { name: 'Charlie', age: 40, favoriteFoods: ['hamburger', 'fries'] }
  ];
  
  Person.create(arrayOfPeople, function(err, people) {
    if (err) console.error(err);
    console.log('New people saved to database:', people);
  });

//   Find all people with a given name:
Person.find({ name: 'John' }, function(err, people) {
    if (err) console.error(err);
    console.log('People with name "John":', people);
  });

// Find one person with a given favorite food:
Person.findOne({ favoriteFoods: 'pizza' }, function(err, person) {
    if (err) console.error(err);
    console.log('Person who likes pizza:', person);
  });

//   Find one person by ID and update their favoriteFoods:
const personid = 'id'; 

Person.findById(personId, function(err, person) {
  if (err) console.error(err);
  person.favoriteFoods.push('hamburger');
  person.save(function(err, updatedPerson) {
    if (err) console.error(err);
    console.log('Updated person:', updatedPerson);
  });
});

// Find one person by name and update their age using findOneAndUpdate():
const personName = 'name of the person you want to update'; 

Person.findOneAndUpdate(
  { name: personName },
  { age: 20 },
  { new: true },
  function(err, updatedPerson) {
    if (err) console.error(err);
    console.log('Updated person:', updatedPerson);
  }
);

// Find one person by ID and remove them from the database:
const personId = 'id';

Person.findByIdAndRemove(personId, function(err, removedPerson) {
  if (err) console.error(err);
  console.log('Removed person:', removedPerson);
});


// Remove all people with a given name using Model.remove():
Person.remove({ name: 'Mary' }, function(err, result) {
    if (err) console.error(err);
    console.log('Number of people removed: ' + result.deletedCount);
});

// Find people who like burritos ...
Person.find({ favoriteFoods: 'burrito' })
  .sort({ name: 1 })
  .limit(2)
  .select('-age')
  .exec((err, data) => {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
