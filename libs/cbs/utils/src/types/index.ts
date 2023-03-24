export type CustomInterestRateSetupInput = {
  effectiveDate: Record<'local' | 'en' | 'np', string> | null;
  fileUploads?: string[];
  note?: string | null;
  rate: number | null;
};
