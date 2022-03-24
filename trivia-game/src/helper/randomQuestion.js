const randomQuestion = (type, correct, wrong) => {
  const CORRECT_ANSWER = 'correct-answer';
  if (type === 'boolean') {
    if (correct === 'True') {
      return [['True', CORRECT_ANSWER], ['False', 'wrong-answer-0']];
    } return [['True', 'wrong-answer-0'], ['False', CORRECT_ANSWER]];
  } const correctAnswer = [correct, CORRECT_ANSWER];
  const wrongAnswer = wrong.map((element, index) => [element, `wrong-answer-${index}`]);
  const random = [correctAnswer, ...wrongAnswer];
  const halfNumber = 0.5;
  return random.sort(() => Math.random() - halfNumber);
};

export default randomQuestion;
