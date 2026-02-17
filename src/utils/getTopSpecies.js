export default function getTopSpecies(characters) {
  const collections = {};

  characters
    .map((char) => char.species)
    .forEach((value) => {
      collections[value] = (collections[value] || 0) + 1;
    });

  const entries = Object.entries(collections);

  let top3 = [];

  for (let i = 0; i < entries.length; i++) {
    top3.push(entries[i]);

    top3.sort((a, b) => b[1] - a[1]);

    if (top3.length > 3) {
      top3.pop();
    }
  }
  const top3Label = top3.map(([species, count]) => `${species} (${count})`).join(", ");

  return top3Label;
}
