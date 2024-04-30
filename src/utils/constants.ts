export const CATEGORIES = [
  'Physical Activities',
  'Intellectual Activities',
  'Creative Activities',
  'Productive Tasks',
  'Entertainment',
  'Expression',
  'Exploration and Adventure',
  'Problem-Solving',
  'Crafting and DIY',
  'None of them',
];
export const COMMON_ACTION_WORDS = [
  'workout',
  'read',
  'meditate',
  'study',
  'run',
  'cook',
  'eat',
  'drink',
  'jog',
  'shop',
  'clean',
  'write',
  'fix',
  'organize',
  'sleep',
  'play',
  'watch',
  'code',
  'learn',
  'teach',
  'exercise',
  'bike',
  'swim',
  'dance',
  'paint',
  'draw',
  'compose',
  'sing',
  'program',
  'practice',
  'build',
  'create',
  'design',
  'plan',
  'develop',
  'work',
  'travel',
  'explore',
  'read',
  'listen',
  'design',
  'play',
  'make',
  'solve',
  'research',
  'write',
  'draw',
  'bake',
  'craft',
  'visit',
  'action',
];

export const COMMON_FREQUENCY_WORDS = [
  'daily',
  'weekly',
  'every year',
  'every day',
  'every week',
  'monthly',
  'every hour',
  'yearly',
  'every minute',
  'an hour',
  '1 hour',
  '2 hours',
  '3 hours',
  '4 hours',
  '5 hours',
  '6 hours',
  '7 hours',
  '8 hours',
  '9 hours',
  '10 hours',
  '11 hours',
  '11 hours',
  '12 hours',
  '13 hours',
  '14 hours',
  '15 hours',
  '16 hours',
  '17 hours',
  '18 hours',
  '19 hours',
  '20 hours',
  '21 hours',
  '22 hours',
  '23 hours',
  'hours',
  'one day per week',
  'per week',
  'per day',
  'per hour',
  'two days a week',
  '3 times per week',
  '4 days a week',
  'twice a day',
  'hourly',
  'bi-weekly',
  'quarterly',
  'every other day',
  'every other week',
  'once in a while',
  'occasionally',
  'rarely',
  'infrequently',
  'often',
  'seldom',
  'annually',
  'fortnightly',
  'semi-monthly',
  'tri-monthly',
  'daily',
  'nightly',
  'always',
  'never',
  'regularly',
  'continuously',
  'intermittently',
  'sporadically',
  'constantly',
  'periodically',
  'consistently',
  'frequently',
  'typically',
  'occasionally',
  'usually',
  'seldomly',
  'variably',
  'randomly',
  'alternatively',
  'occasional',
  'periodically',
  'once a week',
  'once a month',
  'days/week',
  'hour/day',
  'entire week',
  'whole week',
  'next month',
  'next week',
  'next hour',
  'some',
  'some day',
];

export const POSSIBLE_SUBJECTS = [
  'I have to',
  'I must',
  'I should',
  'I need',
  'I need to',
  "I'm going",
  'I will',
  'Do',
  'Initiate',
  'I want to',
  'I wanna',
  'Have to',
  'Have',
  'I should have',
];
// export const GOAL_DESCRIPTION_PATTERN = new RegExp(
//   `^(?=.*\\b(?:${COMMON_ACTION_WORDS.join(
//     '|'
//   )})\\b)(?=.*\\b(?:${COMMON_FREQUENCY_WORDS.join('|')})\\b).*$`,
//   'i'
// );
export const GOAL_DESCRIPTION_PATTERN = new RegExp(
  `^(?=.*\\b(?:${POSSIBLE_SUBJECTS.join(
    '|'
  )})?\\b)(?=.*\\b(?:${COMMON_FREQUENCY_WORDS.join('|')})\\b).*$`,
  'i'
);