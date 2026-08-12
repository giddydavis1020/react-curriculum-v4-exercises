export default function SnackList() {
  const snacks = [
    { name: 'Doritos', rank: 5 },
    { name: 'Lays', rank: 4 },
    { name: 'Fries', rank: 3 },
    { name: 'Fruit', rank: 2 },
    { name: 'Chex Mix', rank: 1 },
  ];

  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <ol>
      {sortedSnacks.map((snack) => (
        <li key={snack.name}>
          {snack.name} (Rank: {snack.rank})
        </li>
      ))}
    </ol>
  );
}
