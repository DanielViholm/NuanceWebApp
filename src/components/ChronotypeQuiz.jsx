import React, { useState } from 'react';
import { Clock, Battery, Brain, Heart, User } from 'lucide-react';

// Spørgsmål data
const questions = [
  {
    id: 1,
    category: "Søvn- og opvågningstider",
    text: "Hvornår vågner du naturligt på en dag uden forpligtelser?",
    options: [
      { text: "Meget tidligt (før 6:00)", type: "Løve", points: 5 },
      { text: "Tidligt (6:00-7:30)", type: "Bjørn", points: 3 },
      { text: "Sent (efter 8:00)", type: "Ulv", points: 4 },
      { text: "Meget varierende", type: "Delfin", points: 3 }
    ]
  },
  {
    id: 2,
    category: "Søvn- og opvågningstider",
    text: "Hvornår bliver du naturligt træt om aftenen?",
    options: [
      { text: "Tidligt (omkring 21:00)", type: "Løve", points: 4 },
      { text: "Normal tid (22:00-23:00)", type: "Bjørn", points: 3 },
      { text: "Sent (efter 23:00)", type: "Ulv", points: 5 },
      { text: "Meget uregelmæssigt", type: "Delfin", points: 2 }
    ]
  },
  {
    id: 3,
    category: "Energiniveauer gennem dagen",
    text: "Hvordan er dit energiniveau om morgenen?",
    options: [
      { text: "Fuld af energi med det samme", type: "Løve", points: 4 },
      { text: "Gradvist vågen og klar", type: "Bjørn", points: 3 },
      { text: "Kæmper med at vågne", type: "Ulv", points: 4 },
      { text: "Meget svingende", type: "Delfin", points: 2 }
    ]
  },
  {
    id: 4,
    category: "Energiniveauer gennem dagen",
    text: "Hvornår på dagen føler du dig mest fokuseret?",
    options: [
      { text: "Tidlig morgen", type: "Løve", points: 5 },
      { text: "Formiddag til eftermiddag", type: "Bjørn", points: 4 },
      { text: "Sen eftermiddag/aften", type: "Ulv", points: 5 },
      { text: "Det varierer meget", type: "Delfin", points: 2 }
    ]
  },
  {
    id: 5,
    category: "Produktivitetstoppe",
    text: "Hvornår foretrækker du at udføre vigtige opgaver?",
    options: [
      { text: "Tidlig morgen", type: "Løve", points: 4 },
      { text: "Midt på dagen", type: "Bjørn", points: 3 },
      { text: "Sen eftermiddag/aften", type: "Ulv", points: 4 },
      { text: "Når inspirationen rammer", type: "Delfin", points: 3 }
    ]
  },
  {
    id: 6,
    category: "Produktivitetstoppe",
    text: "Hvordan håndterer du bedst deadlines?",
    options: [
      { text: "Planlægger og bliver færdig i god tid", type: "Løve", points: 4 },
      { text: "Arbejder jævnt hen imod deadline", type: "Bjørn", points: 3 },
      { text: "Arbejder bedst under pres", type: "Ulv", points: 3 },
      { text: "Svinger mellem tidlig og sidste øjeblik", type: "Delfin", points: 2 }
    ]
  },
  {
    id: 7,
    category: "Adfærd og præferencer",
    text: "Hvordan påvirker kaffe dig?",
    options: [
      { text: "Bruger det sjældent/slet ikke", type: "Løve", points: 3 },
      { text: "Normal effekt", type: "Bjørn", points: 2 },
      { text: "Kan drikke sent uden problemer", type: "Ulv", points: 4 },
      { text: "Meget følsom overfor koffein", type: "Delfin", points: 4 }
    ]
  },
  {
    id: 8,
    category: "Adfærd og præferencer",
    text: "Hvordan er din appetit om morgenen?",
    options: [
      { text: "Sulten med det samme", type: "Løve", points: 3 },
      { text: "Normal morgenmadslyst", type: "Bjørn", points: 2 },
      { text: "Ingen morgenmad tak", type: "Ulv", points: 4 },
      { text: "Meget varierende", type: "Delfin", points: 2 }
    ]
  },
  {
    id: 9,
    category: "Mulige personlighedstræk",
    text: "Hvilken beskrivelse passer bedst på dig?",
    options: [
      { text: "Målrettet og systematisk", type: "Løve", points: 4 },
      { text: "Stabil og pålidelig", type: "Bjørn", points: 4 },
      { text: "Kreativ og spontan", type: "Ulv", points: 4 },
      { text: "Sensitiv og intuitiv", type: "Delfin", points: 4 }
    ]
  }
];
const categories = [
  {
    id: 1,
    name: "Søvn- og opvågningstider",
    icon: Clock,
    questions: [1, 2]
  },
  {
    id: 2,
    name: "Energiniveauer gennem dagen",
    icon: Battery,
    questions: [3, 4]
  },
  {
    id: 3,
    name: "Produktivitetstoppe",
    icon: Brain,
    questions: [5, 6]
  },
  {
    id: 4,
    name: "Adfærd og præferencer",
    icon: Heart,
    questions: [7, 8]
  },
  {
    id: 5,
    name: "Mulige personlighedstræk",
    icon: User,
    questions: [9]
  }
];
const chronotypeDescriptions = {
  "Løve": {
    title: "Løve",
    description: "Du er et ægte morgenmenneske med naturlig energi tidligt på dagen. Din ADHD-hjerne er skarpest om morgenen, hvilket gør det ideelt at tackle vigtige opgaver da.",
    tips: [
      "Planlæg vigtige møder og opgaver til morgentimerne",
      "Tag din ADHD-medicin tidligt for maksimal effekt",
      "Udnyt din naturlige morgenenergi til motion",
      "Skab en fast aftensrutine for god søvn"
    ]
  },
  "Bjørn": {
    title: "Bjørn",
    description: "Du følger en traditionel døgnrytme og trives bedst med regelmæssighed. Din ADHD håndteres bedst gennem faste rutiner og en velstruktureret hverdag.",
    tips: [
      "Hold regelmæssige måltider og sovetider",
      "Tag planlagte pauser gennem dagen",
      "Skab balance mellem struktur og fleksibilitet",
      "Vær opmærksom på eftermiddagstræthed"
    ]
  },
  "Ulv": {
    title: "Ulv",
    description: "Du er mest aktiv sent på dagen. Din ADHD-hjerne kommer ofte først rigtigt i gang om aftenen, hvor kreativiteten og fokus topper.",
    tips: [
      "Planlæg kreative opgaver til aftentimerne",
      "Overvej fleksible arbejdstider hvis muligt",
      "Skab en rolig morgenrutine uden stress",
      "Vær konsekvent med ADHD-medicin timing"
    ]
  },
  "Delfin": {
    title: "Delfin",
    description: "Din energi og opmærksomhed svinger gennem dagen. Din ADHD og sensitive natur kræver særlig opmærksomhed på søvn og restitution.",
    tips: [
      "Før dagbog over dine energimønstre",
      "Udnyt perioder med høj energi maksimalt",
      "Skab rolige og støttende sovemiljøer",
      "Vær fleksibel men konsistent med rutiner"
    ]
  }
};
const ChronotypeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const calculateResult = () => {
    const scores = {
      "Løve": 0,
      "Bjørn": 0,
      "Ulv": 0,
      "Delfin": 0
    };

    Object.values(answers).forEach(answer => {
      scores[answer.type] += answer.points;
    });

    const maxScore = Math.max(...Object.values(scores));
    const winners = Object.entries(scores)
      .filter(([_, score]) => score === maxScore)
      .map(([type]) => type);

    // Ved pointlighed, vælg efter prioriteret rækkefølge
    const priorityOrder = ["Løve", "Bjørn", "Ulv", "Delfin"];
    const winner = winners.length === 1
      ? winners[0]
      : winners.sort((a, b) =>
          priorityOrder.indexOf(a) - priorityOrder.indexOf(b)
        )[0];

    setResult(winner);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const getCurrentCategory = () => {
    const currentQuestionId = questions[currentQuestion].id;
    return categories.find(category =>
      category.questions.includes(currentQuestionId)
    );
  };

  const getProgressForCategory = (categoryId) => {
    const category = categories[categoryId - 1];
    const answeredQuestions = category.questions.filter(qId => answers[qId]);
    return (answeredQuestions.length / category.questions.length) * 100;
  };

  const renderQuizUI = () => {
    const currentCategory = getCurrentCategory();
    const CategoryIcon = currentCategory?.icon;

    return (
      <div className="w-full max-w-2xl mx-auto my-8">
        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {CategoryIcon && <CategoryIcon className="w-6 h-6 text-blue-500" />}
              <h3 className="text-lg font-medium text-blue-500">{currentCategory?.name}</h3>
            </div>

            {/* Category progress bars */}
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <category.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{category.name}</span>
                    </div>
                    <span className="text-gray-500">
                      {Math.round(getProgressForCategory(category.id))}%
                    </span>
                  </div>
                  <progress
                    value={getProgressForCategory(category.id)}
                    max="100"
                    className="h-1 w-full"
                  />
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Spørgsmål {currentQuestion + 1} af {questions.length}
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-6">{questions[currentQuestion].text}</h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswer(questions[currentQuestion].id, option)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  answers[questions[currentQuestion].id] === option
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {option.text}
              </div>
            ))}
          </div>

          <button
            onClick={nextQuestion}
            disabled={!answers[questions[currentQuestion].id]}
            className="w-full mt-6 p-2.5 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Se Resultat' : 'Næste Spørgsmål'}
          </button>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const resultType = chronotypeDescriptions[result];
    return (
      <div className="w-full max-w-2xl mx-auto my-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Din Kronotype: {resultType.title}</h2>
          <p className="text-lg mb-6">{resultType.description}</p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Tips til din ADHD-håndtering:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {resultType.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setResult(null);
            }}
            className="w-full p-2.5 bg-blue-500 text-white rounded-md"
          >
            Tag Testen Igen
          </button>
        </div>
      </div>
    );
  };

  // Main render
  return result ? renderResult() : renderQuizUI();
};

export default ChronotypeQuiz;