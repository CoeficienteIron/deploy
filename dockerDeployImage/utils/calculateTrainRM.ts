
type calculateRM = (record: any, RM: number) => any

const calculateRMS: calculateRM = (record, RM) => {
  const copyRecords = [...record];
  copyRecords.map((currentRecord) => {
    if (!currentRecord) {
      const newRecord = {};
      newRecord[`5RM-${RM}`] = 0;
      return newRecord;
    }

    currentRecord[`5RM-${RM}`] = (RM * record.record) / 100;
    return currentRecord;
  });
  return copyRecords;
};

export default {
  calculateRMS,
};
