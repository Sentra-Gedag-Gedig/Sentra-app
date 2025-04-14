// export type DateType = "start" | "end";

// export type DateRangeOption =
//   | "today"
//   | "yesterday"
//   | "thisWeek"
//   | "lastWeek"
//   | "thisMonth"
//   | "lastMonth"
//   | "thisYear"
//   | "lastYear"
//   | "7days"
//   | "30days"
//   | "90days";

export type DateType = "start" | "end";

export type DayRangeOption =
  | "today"
  | "yesterday"
  | "7days"
  | "30days"
  | "90days";
export type WeekRangeOption = "thisWeek" | "lastWeek";
export type MonthRangeOption = "thisMonth" | "lastMonth";
export type YearRangeOption = "thisYear" | "lastYear";

export type DateRangeOption =
  | DayRangeOption
  | WeekRangeOption
  | MonthRangeOption
  | YearRangeOption;

export type DateRangeCategory = "day" | "week" | "month" | "year";
