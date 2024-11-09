
type train = {
  record: number
}

function sortByMax(arrayMaximo: train[]) {
  return arrayMaximo.sort((a, b) => {
    if (a.record > b.record) return -1;
    if (a.record < b.record) return 1;
    return 0;
  })[0];
}

function sortMinToMax(records: number[]): number[] {
  if (records.length === 0) {
    return [0];
  }
  const currentRecords = [...records];
  return currentRecords.sort((a, b) => {
    if (a === b) return 0;
    return a > b ? 1 : -1;
  });
}

export {
  sortByMax,
  sortMinToMax,
};
