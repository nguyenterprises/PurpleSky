import useWidth from "../ui/useWidth";

export function colorOrTransparent(line, key) {
  const width = useWidth();
  let color;

  switch (true) {
    case ( (line === 'even') && (width < 1000) && (key === 2) ):  
      color = 'transparent';
      break;
    case ( (line === 'even') && (width < 1000) && (key === 6) ):  
      color = 'transparent';
      break;
    case ( (line === 'even') && (width < 1000) && (key === 10) ):  
      color = 'transparent';
      break;
    case ( (line === 'even') && (width < 1000) && (key === 14) ):  
      color = 'transparent';
      break
    case ( (line === 'even') && (width < 1000) && (key === 18) ):  
      color = 'transparent';
      break;
    case ( (line === 'even') && (width < 1000) && (key === 22) ):  
      color = 'transparent';
      break;
    case (line === 'even'):
      color = 'black';
      break;
    default:
      color = 'transparent';
  }

  return color;
}