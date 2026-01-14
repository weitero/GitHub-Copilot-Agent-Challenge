'use strict';

// User profile object with required data types
const userProfile = {
  name: 'Jordan Lee', // string
  age: 22, // number
  isStudent: true, // boolean
  favoriteColors: ['blue', 'green', 'purple'], // array
  address: {
    street: '123 Maple Street',
    city: 'Springfield',
    zipCode: '90210',
  },
};

// Display profile information
function displayProfile(profile) {
  // String concatenation
  const nameLine = 'Name: ' + profile.name;

  // Template literal
  const addressLine = `Address: ${profile.address.street}, ${profile.address.city} ${profile.address.zipCode}`;

  // Arithmetic operations with age
  const ageNextYear = profile.age + 1;
  const ageInFiveYears = profile.age + 5;

  // Boolean logic for student status
  const studentMessage = profile.isStudent
    ? 'Status: Student (eligible for student discount)'
    : 'Status: Not a student';

  console.log(nameLine);
  console.log(`Age: ${profile.age}`);
  console.log(`Age next year: ${ageNextYear}`);
  console.log(`Age in five years: ${ageInFiveYears}`);
  console.log(studentMessage);
  console.log('Favorite colors: ' + profile.favoriteColors.join(', '));
  console.log(addressLine);
  console.log('---');
}

// Update individual fields
function updateName(profile, newName) {
  profile.name = newName;
}

function updateAge(profile, newAge) {
  profile.age = newAge;
}

function updateStudentStatus(profile, isStudent) {
  profile.isStudent = isStudent;
}

function updateFavoriteColors(profile, colors) {
  profile.favoriteColors = [...colors];
}

function updateAddress(profile, newAddress) {
  profile.address = {
    ...profile.address,
    ...newAddress,
  };
}

// Demonstration
console.log('Initial Profile');
displayProfile(userProfile);

updateName(userProfile, 'Taylor Morgan');
updateAge(userProfile, userProfile.age + 2);
updateStudentStatus(userProfile, !userProfile.isStudent);
updateFavoriteColors(userProfile, ['red', 'black']);
updateAddress(userProfile, { city: 'Riverton', zipCode: '10001' });

console.log('Updated Profile');
displayProfile(userProfile);
