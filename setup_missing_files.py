import os

# Define missing files and their contents
missing_files = {
    "src/index.css": """body {
  font-family: sans-serif;
  background: #f5f5f5;
  margin: 0;
  padding: 0;
}
""",
    "src/components/ChronotypeQuiz.jsx": """import React, { useState } from 'react';

const ChronotypeQuiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = [
    { text: 'Do you feel most awake in the morning or at night?', options: ['Morning', 'Night'] },
    { text: 'How easily do you wake up?', options: ['Very easily', 'Not easily'] }
  ];

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert('Quiz complete! Your chronotype is: ' + answers.join(', '));
    }
  };

  return (
    <div>
      <h2>{questions[questionIndex].text}</h2>
      {questions[questionIndex].options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default ChronotypeQuiz;
""",
    "index.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ADHD Chronotype Quiz</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
"""
}

# Function to create files
def create_missing_files():
    base_path = os.getcwd()  # Current working directory
    for path, content in missing_files.items():
        full_path = os.path.join(base_path, path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)  # Ensure folder exists
        with open(full_path, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"✅ Created: {path}")

# Run the script
if __name__ == "__main__":
    create_missing_files()
    print("\n🚀 All missing files have been created! Now run: npm run dev")
