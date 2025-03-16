export function add(numbers) {
  if (numbers === "") return 0;

  const { regex, numberString } = extractCustomDelimiter(numbers);

  const numbersList = numberString.split(regex).map(Number);

  const negativeNumbersList = numbersList.filter((num) => num < 0);

  if (negativeNumbersList.length > 0) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbersList.join(",")}`
    );
  }

  return numbersList.reduce((sum, num) => (num > 1000 ? sum : sum + num), 0);
}

// utilities
export function extractCustomDelimiter(inputString) {
  const defaultRegex = /[,\n]/;

  // if there are no delimiters, return the default comma and new line regex
  if (!inputString.startsWith("//")) {
    return { regex: defaultRegex, numberString: inputString };
  }

  // extract the custom delimiter and the number string
  const delimiterEndIndex = inputString.indexOf("\n");
  const customDelimiter = inputString.substring(2, delimiterEndIndex);
  const numberString = inputString.substring(delimiterEndIndex + 1);

  // escape special characters like '.' in the custom delimiter
  const escapedDelimiter = customDelimiter.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
  const delimiterRegex = new RegExp(escapedDelimiter);

  return { regex: delimiterRegex, numberString };
}
