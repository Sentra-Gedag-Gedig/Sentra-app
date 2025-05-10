// export const formatDate = (date: Date, filter: string) => {
//   if (filter === "Harian") {
//     return date.toLocaleDateString("id-ID", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   } else if (filter === "Mingguan") {
//     return `${date.toLocaleDateString("id-ID", {
//       day: "2-digit",
//       month: "2-digit",
//     })}/${date.toLocaleDateString("id-ID", {
//       year: "numeric",
//     })}`;
//   } else if (filter === "Bulanan") {
//     return date.toLocaleDateString("id-ID", {
//       month: "2-digit",
//       year: "numeric",
//     });
//   }
//   return "";
// };

import { DateRangeCategory } from "../types/date";

export const formatDate = (
  date: Date,
  rangeType: DateRangeCategory | string
) => {
  const options: Intl.DateTimeFormatOptions = {};

  switch (rangeType) {
    case "day":
    case "week":
      options.day = "numeric";
      options.month = "short";
      options.year = "numeric";
      break;
    case "month":
      options.month = "long";
      options.year = "numeric";
      break;
    case "year":
      options.year = "numeric";
      break;
    default:
      options.day = "numeric";
      options.month = "short";
      options.year = "numeric";
  }

  return date.toLocaleDateString("id-ID", options);
};

export const formatTransactionDate = (dateString : string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
};

