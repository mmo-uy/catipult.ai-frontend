import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  COMMON_FREQUENCY_WORDS,
  GOAL_DESCRIPTION_PATTERN,
  POSSIBLE_SUBJECTS,
} from './constants';
import { Observable, of } from 'rxjs';

// Example of expected results:
// "I have to go to the doctor monthly" => action: "go to the doctor", frequency: "monthly"
// "I must workout daily" => action: "workout", frequency: "daily"
// "I want to go for a walk every day" => action: "go for a walk", frequency: "every day"
// "Start the engine every hour" => action: "start the engine", frequency: "every hour"

export function goalDescriptionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const description: string = control.value;
    if (!description || !GOAL_DESCRIPTION_PATTERN.test(description)) {
      return { invalidDescription: true };
    }
    return null;
  };
}
// Angular asks for an Async Validator in some cases ;)
export function goalDescriptionValidator1(): Observable<ValidationErrors | null> {
  return of((control: AbstractControl): { [key: string]: any } | null => {
    const description: string = control.value;
    if (!description || !GOAL_DESCRIPTION_PATTERN.test(description)) {
      return of({ invalidDescription: true });
    }

    return of(null);
  });
}
export function extractAction(description: string): string {
  let actionStartIndex = 0;

  const subjectRegex = new RegExp(`(?:${POSSIBLE_SUBJECTS.join('|')})\\b`, 'i');
  const subjectMatch = description.match(subjectRegex);
  if (subjectMatch && typeof subjectMatch.index === 'number') {
    actionStartIndex = subjectMatch.index + subjectMatch[0].length;
  }

  const frequencyRegex = new RegExp(
    `\\b(?:${COMMON_FREQUENCY_WORDS.join('|')})\\b`,
    'i'
  );
  const frequencyMatch = description
    .substring(actionStartIndex)
    .match(frequencyRegex);
  const frequencyIndex = frequencyMatch
    ? frequencyMatch.index || 0
    : description.length;

  let actionSubstring = description.substring(
    actionStartIndex,
    actionStartIndex + frequencyIndex
  );

  actionSubstring = actionSubstring.trim();

  if (actionSubstring.toLowerCase().startsWith('to ')) {
    actionSubstring = actionSubstring.slice(3).trim();
  }

  return actionSubstring;
}

export function extractFrequency(description: string): string {
  // Find the last occurrence of any common frequency word in the description
  const frequencyRegex = new RegExp(
    `\\b(?:${COMMON_FREQUENCY_WORDS.join('|')})\\b`,
    'i'
  );
  const frequencyMatch = description.match(frequencyRegex);
  if (frequencyMatch) {
    // Find the index of the frequency match
    const frequencyIndex = frequencyMatch.index || 0;

    // Get the substring from the frequency index to the end of the string
    const frequencySubstring = description.substring(frequencyIndex);

    // Remove any leading whitespace and return the result
    return frequencySubstring.trim();
  } else {
    return '';
  }
}
