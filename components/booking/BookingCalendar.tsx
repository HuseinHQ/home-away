"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import { useProperty } from "@/utils/store";

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from "@/utils/calendar";

function BookingCalendar() {
  const currentDate = new Date();
  const range = useProperty((state) => state.range);
  const bookings = useProperty((state) => state.bookings);
  const { toast } = useToast();

  const setRange = (range: DateRange | undefined) => useProperty.setState({ range });

  const blockedPeriods = generateBlockedPeriods({ bookings });
  const unavailableDates = generateDisabledDates(blockedPeriods);

  useEffect(() => {
    const selectedRange = generateDateRange(range);
    selectedRange.some((date) => {
      if (unavailableDates[date]) {
        setRange(defaultSelected);
        toast({ description: "Some dates are booked. Please select again" });
        return true;
      }
      return false;
    });
  }, [range, unavailableDates, toast]);

  return (
    <Calendar
      fromDate={currentDate}
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      disabled={blockedPeriods}
    />
  );
}
export default BookingCalendar;
