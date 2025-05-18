import { add, endOfYear, format, startOfYear, sub, subYears } from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd';

export const getDateRange = (rangeId: string) => {
  const today = new Date();
  const nowFormatted = format(today, DATE_FORMAT);

  const dateRanges: Record<string, { from: string; to: string }> = {
    LAST_7_DAYS: {
      from: format(sub(today, { days: 7 }), DATE_FORMAT),
      to: nowFormatted
    },
    LAST_30_DAYS: {
      from: format(sub(today, { days: 30 }), DATE_FORMAT),
      to: nowFormatted
    },
    LAST_6_MONTHS: {
      from: format(sub(today, { months: 6 }), DATE_FORMAT),
      to: nowFormatted
    },
    LAST_YEAR: {
      from: format(startOfYear(subYears(today, 1)), DATE_FORMAT),
      to: format(endOfYear(subYears(today, 1)), DATE_FORMAT)
    },
    THIS_YEAR: {
      from: format(startOfYear(today), DATE_FORMAT),
      to: nowFormatted
    },
    NEXT_2_MONTHS: {
      from: format(today, DATE_FORMAT),
      to: format(add(today, { months: 2 }), DATE_FORMAT)
    },
    LAST_15_DAYS_AND_NEXT_15_DAYS: {
      from: format(sub(today, { days: 15 }), DATE_FORMAT),
      to: format(add(today, { days: 15 }), DATE_FORMAT)
    }
  };

  return dateRanges[rangeId];
};
