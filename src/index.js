export function add(numbers) {
  if (numbers === "") return 0;

  const { regex, numberString, operation } = extractCustomDelimiter(numbers);

  const numbersList = numberString.split(regex).map(Number);

  const negativeNumbersList = numbersList.filter((num) => num < 0);

  if (negativeNumbersList.length > 0) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbersList.join(",")}`
    );
  }

  return numbersList.reduce((sum, num) => {
    if (num > 1000) return sum;

    if (operation === "+") {
      return sum + num
    } 

    if (operation === "*") {
      return sum * num
    }
    // else handle other cases
  }, operation === "*" ? 1 : 0)
}

// utilities
export function extractCustomDelimiter(inputString) {
  const defaultRegex = /[,\n]/;

  // if there are no delimiters, return the default comma and new line regex
  if (!inputString.startsWith("//")) {
    return { regex: defaultRegex, numberString: inputString, operation: "+" };
  }

  // extract the custom delimiter and the number string
  const delimiterEndIndex = inputString.indexOf("\n");
  const delimiterString = inputString.substring(2, delimiterEndIndex);
  const numberString = inputString.substring(delimiterEndIndex + 1);

  let delimiters = [];

  const multipleDelimiters = delimiterString.match(/\[([^\]]+)\]/g);

  if (multipleDelimiters) {
    // slice the brackets
    delimiters = multipleDelimiters.map((d) => d.slice(1, -1));
  } else {
    // single delimiter
    delimiters = [delimiterString];
  }

  // escape special characters like '.' in the custom delimiter
  const escapedDelimiters = delimiters.map((d) =>
    d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const isDelimiterExclamation = escapedDelimiters.includes("!");

  const delimiterRegex = new RegExp(escapedDelimiters.join("|"));

  return { regex: delimiterRegex, numberString, operation: isDelimiterExclamation ? "*" : "+" };
}


