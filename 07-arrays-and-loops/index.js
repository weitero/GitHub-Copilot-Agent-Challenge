function analyzeGrades(students) {
  // Validate input
  if (!Array.isArray(students) || students.length === 0) {
    return {
      error: 'Invalid input: Expected a non-empty array of student objects.',
    };
  }

  // Initialize variables
  let highest = students[0].score;
  let lowest = students[0].score;
  let total = 0;
  let passedCount = 0;

  // Loop type 1: for loop - Calculate highest, lowest, total, and passed count
  for (let i = 0; i < students.length; i++) {
    const score = students[i].score;
    total += score;

    if (score > highest) {
      highest = score;
    }

    if (score < lowest) {
      lowest = score;
    }

    if (score >= 70) {
      passedCount++;
    }
  }

  // Calculate average
  const average = total / students.length;

  // Loop type 2: for...of loop - Find students who scored above average
  const aboveAverage = [];
  for (const student of students) {
    if (student.score > average) {
      aboveAverage.push(student.name);
    }
  }

  // Return statistics object
  return {
    highestScore: highest,
    lowestScore: lowest,
    averageScore: Number.parseFloat(average.toFixed(2)),
    passedCount: passedCount,
    totalStudents: students.length,
    aboveAverageStudents: aboveAverage,
  };
}

// Test data
const studentGrades = [
  { name: 'Alice Johnson', score: 92 },
  { name: 'Bob Smith', score: 78 },
  { name: 'Charlie Brown', score: 65 },
  { name: 'Diana Prince', score: 88 },
  { name: 'Ethan Hunt', score: 54 },
  { name: 'Fiona Apple', score: 95 },
  { name: 'George Lopez', score: 72 },
  { name: 'Hannah Montana', score: 81 },
];

// Run analysis
console.log('--- Grade Analysis System ---\n');
console.log('Student Grades:');
studentGrades.forEach((student, index) => {
  console.log(`${index + 1}. ${student.name}: ${student.score}`);
});

console.log('\n--- Analysis Results ---');
const results = analyzeGrades(studentGrades);

if (results.error) {
  console.log(results.error);
} else {
  console.log(`Total Students: ${results.totalStudents}`);
  console.log(`Highest Score: ${results.highestScore}`);
  console.log(`Lowest Score: ${results.lowestScore}`);
  console.log(`Average Score: ${results.averageScore}`);
  console.log(`Students Passed (>=70): ${results.passedCount}`);
  console.log(
    `Students Above Average: ${results.aboveAverageStudents.join(', ')}`
  );
}

// Test with edge cases
console.log('\n--- Edge Case Tests ---');

// Test with empty array
console.log('\nTest 1: Empty array');
console.log(analyzeGrades([]));

// Test with single student
console.log('\nTest 2: Single student');
console.log(analyzeGrades([{ name: 'Solo Student', score: 85 }]));

// Test with all failing students
console.log('\nTest 3: All failing students');
console.log(
  analyzeGrades([
    { name: 'Student A', score: 50 },
    { name: 'Student B', score: 45 },
    { name: 'Student C', score: 60 },
  ])
);
