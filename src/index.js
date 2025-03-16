export function add(numbers) {
  if (numbers === "") return 0;

  const splitNumbers = numbers.split(",");
  let sum = 0;

  for (let i = 0; i < splitNumbers.length; i++) {
    sum += parseInt(splitNumbers[i], 10);
  }

  return sum;
}
