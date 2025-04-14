import { useState } from "react";
import { DateRangeOption, DateType } from "@/features/home/types/date";
import {
  calculateDateRange,
  calculateNextPeriod,
  calculatePreviousPeriod,
} from "@/features/home/actions/date-option";

const useDateRange = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selectedDateType, setSelectedDateType] = useState<DateType>("start");
  const [open, setOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleDateChange = (dateType: DateType) => {
    setSelectedDateType(dateType);
    setOpen(true);
  };

  const onChangeDate = (event: any, date?: Date) => {
    setOpen(false);
    if (date) {
      selectedDateType === "start" ? setStartDate(date) : setEndDate(date);
    }
  };

  const handleCustomDateSelect = (option: any) => {
    const { newStart, newEnd } = calculateDateRange(option);
    setStartDate(newStart);
    setEndDate(newEnd);
    setModalVisible(false);
  };

  const handleNextPeriod = () => {
    const { nextStart, nextEnd } = calculateNextPeriod(startDate, endDate);
    setStartDate(nextStart);
    setEndDate(nextEnd);
  };

  const handlePreviousPeriod = () => {
    const { prevStart, prevEnd } = calculatePreviousPeriod(startDate, endDate);
    setStartDate(prevStart);
    setEndDate(prevEnd);
  };

  return {
    startDate,
    endDate,
    selectedDateType,
    open,
    modalVisible,
    handleNextPeriod,
    handlePreviousPeriod,
    setModalVisible,
    setOpen,
    setStartDate,
    setEndDate,
    setSelectedDateType,
    handleDateChange,
    onChangeDate,
    handleCustomDateSelect,
  };
};

export default useDateRange;
