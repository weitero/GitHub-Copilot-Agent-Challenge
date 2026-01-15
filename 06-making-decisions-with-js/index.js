function evaluateStudent(score) {
  console.log(`\nEvaluating score: ${score}`);

  // 5. Input validation
  if (
    typeof score !== 'number' ||
    Number.isNaN(score) ||
    score < 0 ||
    score > 100
  ) {
    console.log(
      'Error: Invalid input. Score must be a number between 0 and 100.'
    );
    return;
  }

  // 1. Determine letter grade using if-else
  let letterGrade;
  if (score >= 90) {
    letterGrade = 'A';
  } else if (score >= 80) {
    letterGrade = 'B';
  } else if (score >= 70) {
    letterGrade = 'C';
  } else if (score >= 60) {
    letterGrade = 'D';
  } else {
    letterGrade = 'F';
  }
  console.log(`Letter Grade: ${letterGrade}`);

  // 2. Logical operators for Pass AND Honors
  // Pass is >= 60, Honors is >= 90
  const isPassing = score >= 60;
  const hasHonors = score >= 90;

  if (isPassing && hasHonors) {
    console.log('Status: Passed with Honors');
  } else if (isPassing) {
    console.log('Status: Passed');
  } else {
    console.log('Status: Failed');
  }

  // 3. Switch statement for feedback
  switch (letterGrade) {
    case 'A':
      console.log('Feedback: Excellent work! Keep it up.');
      break;
    case 'B':
      console.log('Feedback: Great job, very close to perfection.');
      break;
    case 'C':
      console.log('Feedback: Good effort, but there is room for improvement.');
      break;
    case 'D':
      console.log('Feedback: You passed, but consider reviewing the material.');
      break;
    case 'F':
      console.log(
        'Feedback: Unfortunately you failed. Please seek extra help.'
      );
      break;
    default:
      console.log('Feedback: Unknown grade.');
  }

  // 4. Ternary operator for next course eligibility (>= 70)
  const isEligibleForNextCourse = score >= 70 ? 'Eligible' : 'Not Eligible';
  console.log(`Next Course: ${isEligibleForNextCourse}`);
}

// Test cases
const testCases = [
  95, // A, Pass with Honors
  85, // B, Pass
  75, // C, Pass
  65, // D, Pass
  50, // F, Fail
  59, // F (Edge case)
  60, // D (Edge case)
  89, // B (Edge case)
  90, // A (Edge case)
  0, // Min valid
  100, // Max valid
  -5, // Invalid low
  105, // Invalid high
  'ninety', // Invalid type
];

console.log('--- Student Grade Evaluation System ---');
testCases.forEach((test) => evaluateStudent(test));
