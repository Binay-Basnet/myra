export const getUrl = (path: string, noOfTerms: number) => {
  const pathArray = path.split('/');
  const finalUrl: string[] = [];
  for (let i = 1; i <= noOfTerms; i += 1) {
    finalUrl.push(pathArray[i]);
  }
  return finalUrl.join('/');
};
