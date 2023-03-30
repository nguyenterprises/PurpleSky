export function returnGridContent(arr) {
  let count = 1;
  let maxCount = 1;
  let sequences = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i].weatherAka === arr[i - 1].weatherAka) {
      count++;
      if (count > maxCount) {
        maxCount = count;
      }
    } else {
      const start = i - count;
      const end = i - 1;
      const value = arr[start].weatherAka;
      sequences.push({ value: value, length: count, indexStart: start, indexEnd: end });
      count = 1;
    }
  }

  const start = arr.length - count;
  const end = arr.length - 1;
  const value = arr[start].weatherAka;
  sequences.push({ value: value, length: count, indexStart: start, indexEnd: end });

  let sqArray = sequences.map(sl => {
    return sl.length * 4
  });
  let gridContent = `${sqArray.join("% ")}%`;

  return { sequences: sequences, gridContent: gridContent };

}

export const returnBarBackground = (barData) => {
  let percentArray = [];
  let p = -4;
  for (let i = 0; i < barData.length; i++) {
    p = p + 4;
    percentArray.push(`${barData[i].barColor} ${p}%, ${barData[i].barColor} ${(p + 4).toFixed(2)}%`);
  };
  const barBackground =
    `linear-gradient(
      to right,
      ${barData[0].barColor},
      ${percentArray.slice(0,24)}
    )`;
  return barBackground;
}