import { NepaliMonths } from '@coop/cbs/data-access';

export const useGetNepaliMonthsOptions = () => {
  const nepaliMonthsOptions = [
    { label: NepaliMonths?.Baisakh, value: NepaliMonths?.Baisakh },
    { label: NepaliMonths?.Jestha, value: NepaliMonths?.Jestha },
    { label: NepaliMonths?.Asar, value: NepaliMonths?.Asar },
    { label: NepaliMonths?.Shrawan, value: NepaliMonths?.Shrawan },
    { label: NepaliMonths?.Bhadra, value: NepaliMonths?.Bhadra },
    { label: NepaliMonths?.Ashoj, value: NepaliMonths?.Ashoj },
    { label: NepaliMonths?.Kartik, value: NepaliMonths?.Kartik },
    { label: NepaliMonths?.Mangsir, value: NepaliMonths?.Mangsir },
    { label: NepaliMonths?.Poush, value: NepaliMonths?.Poush },
    { label: NepaliMonths?.Magh, value: NepaliMonths?.Magh },
    { label: NepaliMonths?.Falgun, value: NepaliMonths?.Falgun },
    { label: NepaliMonths?.Chaitra, value: NepaliMonths?.Chaitra },
  ];
  return { nepaliMonthsOptions };
};

export default useGetNepaliMonthsOptions;
