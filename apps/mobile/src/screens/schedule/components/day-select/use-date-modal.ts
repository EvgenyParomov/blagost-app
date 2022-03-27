import { useState } from "react";

export const useDateModal = (selectDate: (date: Date) => void) => {
  const [show, setShow] = useState(false);

  const open = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleSelectDate = (date: Date) => {
    setShow(false);
    selectDate(date);
  };

  return {
    show,
    open,
    handleSelectDate,
    handleCloseModal,
  };
};
