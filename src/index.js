export function add(numbers) {
  if (numbers === "") return 0;

  return numbers
  .replace(/\n/g, ",")
  .split(",")
  .map(Number)
  .reduce((sum, num) => sum + num, 0);
}
