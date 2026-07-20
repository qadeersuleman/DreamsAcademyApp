// Import all MCQ JSON files statically
const class10_biology = require('./class10_biology.json');
const class10_chemistry = require('./class10_chemistry.json');
const class10_math = require('./class10_math.json');
const class10_physics = require('./class10_physics.json');
const class6_science = require('./class6_science.json');
const class7_science = require('./class7_science.json');
const class8_science = require('./class8_science.json');
const class9_biology = require('./class9_biology.json');
const class9_chemistry = require('./class9_chemistry.json');
const class9_math = require('./class9_math.json');
const class9_physics = require('./class9_physics.json');
const parts_of_speech_adjective = require('./parts_of_speech_adjective.json');
const parts_of_speech_adverb = require('./parts_of_speech_adverb.json');
const parts_of_speech_conjunction = require('./parts_of_speech_conjunction.json');
const parts_of_speech_interjection = require('./parts_of_speech_interjection.json');
const parts_of_speech_noun = require('./parts_of_speech_noun.json');
const parts_of_speech_preposition = require('./parts_of_speech_preposition.json');
const parts_of_speech_pronoun = require('./parts_of_speech_pronoun.json');
const parts_of_speech_verb = require('./parts_of_speech_verb.json');

export interface JSONQuestion {
  qno: number;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
    [key: string]: string;
  };
  answer: string;
}

export interface JSONQuiz {
  grade?: number;
  topic?: string;
  subtopic?: string;
  subject: string;
  board?: string;
  total_questions: number;
  questions: JSONQuestion[];
}

export const ALL_MCQ_QUIZZES: { [key: string]: JSONQuiz } = {
  class10_biology,
  class10_chemistry,
  class10_math,
  class10_physics,
  class6_science,
  class7_science,
  class8_science,
  class9_biology,
  class9_chemistry,
  class9_math,
  class9_physics,
  parts_of_speech_adjective,
  parts_of_speech_adverb,
  parts_of_speech_conjunction,
  parts_of_speech_interjection,
  parts_of_speech_noun,
  parts_of_speech_preposition,
  parts_of_speech_pronoun,
  parts_of_speech_verb,
};
