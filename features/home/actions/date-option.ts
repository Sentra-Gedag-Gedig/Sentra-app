import { DateRangeCategory, DateRangeOption } from "@/features/home/types/date";

// export const calculateDateRange = (option: DateRangeOption) => {
//   const today = new Date();
//   let newStart = new Date(today);
//   let newEnd = new Date(today);

//   switch (option) {
//     case "today":
//       break;
//     case "yesterday":
//       newStart.setDate(today.getDate() - 1);
//       newEnd.setDate(today.getDate() - 1);
//       break;
//     case "thisWeek":
//       newStart.setDate(today.getDate() - today.getDay());
//       break;
//     case "lastWeek":
//       newStart.setDate(today.getDate() - today.getDay() - 7);
//       newEnd.setDate(today.getDate() - today.getDay() - 1);
//       break;
//     case "thisMonth":
//       newStart = new Date(today.getFullYear(), today.getMonth(), 1);
//       break;
//     case "lastMonth":
//       newStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
//       newEnd = new Date(today.getFullYear(), today.getMonth(), 0);
//       break;
//     case "thisYear":
//       newStart = new Date(today.getFullYear(), 0, 1);
//       break;
//     case "lastYear":
//       newStart = new Date(today.getFullYear() - 1, 0, 1);
//       newEnd = new Date(today.getFullYear() - 1, 11, 31);
//       break;
//     case "7days":
//       newStart.setDate(today.getDate() - 6);
//       break;
//     case "30days":
//       newStart.setDate(today.getDate() - 29);
//       break;
//     case "90days":
//       newStart.setDate(today.getDate() - 89);
//       break;
//     default:
//       break;
//   }

//   return { newStart, newEnd };
// };

export const getDateRangeCategory = (
  option: DateRangeOption
): DateRangeCategory => {
  if (["today", "yesterday", "7days", "30days", "90days"].includes(option)) {
    return "day";
  }
  if (["thisWeek", "lastWeek"].includes(option)) {
    return "week";
  }
  if (["thisMonth", "lastMonth"].includes(option)) {
    return "month";
  }
  return "year";
};

export const calculateDateRange = (option: DateRangeOption) => {
  const today = new Date();
  let newStart = new Date(today);
  let newEnd = new Date(today);

  switch (option) {
    // Day ranges
    case "today":
      break;
    case "yesterday":
      newStart.setDate(today.getDate() - 1);
      newEnd.setDate(today.getDate() - 1);
      break;
    case "7days":
      newStart.setDate(today.getDate() - 6);
      break;
    case "30days":
      newStart.setDate(today.getDate() - 29);
      break;
    case "90days":
      newStart.setDate(today.getDate() - 89);
      break;

    // Week ranges
    case "thisWeek":
      newStart.setDate(today.getDate() - today.getDay());
      break;
    case "lastWeek":
      newStart.setDate(today.getDate() - today.getDay() - 7);
      newEnd.setDate(today.getDate() - today.getDay() - 1);
      break;

    // Month ranges
    case "thisMonth":
      newStart = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    case "lastMonth":
      newStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      newEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      break;

    // Year ranges
    case "thisYear":
      newStart = new Date(today.getFullYear(), 0, 1);
      break;
    case "lastYear":
      newStart = new Date(today.getFullYear() - 1, 0, 1);
      newEnd = new Date(today.getFullYear() - 1, 11, 31);
      break;
  }

  return { newStart, newEnd };
};

export const calculateNextPeriod = (startDate: Date, endDate: Date) => {
  const diff = endDate.getTime() - startDate.getTime();
  return {
    nextStart: new Date(startDate.getTime() + diff + 1),
    nextEnd: new Date(endDate.getTime() + diff + 1),
  };
};

export const calculatePreviousPeriod = (startDate: Date, endDate: Date) => {
  const diff = endDate.getTime() - startDate.getTime();
  return {
    prevStart: new Date(startDate.getTime() - diff - 1),
    prevEnd: new Date(endDate.getTime() - diff - 1),
  };
};
