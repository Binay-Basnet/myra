export type TDate = {
  year: number;
  month: number;
  day: number;
  // dayOfWeek: 0 for sunday, 1 for monday and so on
  dayOfWeek: number;
};

export type CalendarBuilderDate = {
  year: number;
  month: string;
  day: string;
  // dayOfWeek: 0 for sunday, 1 for monday and so on
  dayOfWeek: number;
};

export type TDateState = {
  current: Date | null;
  today: Date;
  ad: TDate;
  bs: TDate;
};

export type DateFieldState = {
  year: string | null;
  month: string | null;
  day: string | null;
};

export type Period = {
  title: string;
  key: string;
  lastDays: number;
  closePopover: boolean;
};

export type DateRange = {
  from: {
    date: Date;
    en?: string;
    np?: string;
  } | null;
  to: {
    date: Date;
    en?: string;
    np?: string;
  } | null;
};
