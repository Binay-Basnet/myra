import { FundManagementInput } from '@coop/cbs/data-access';

export type ParticularTableType = {
  ledgerId: string;
  ledgerName: string;
  percent: number | string;
  amount: string;
};

export type DistributionTableType = {
  ledgerId: string;
  ledgerName: string;
  percent: number | string;
  amount: string;
};

export type OtherFundDistributionTableType = {
  ledgerId: string;
  ledgerName: string;
  percent: number | string;
  amount: string;
};

export type CustomFundManagementInput = Omit<
  FundManagementInput,
  'generalReserveFund' | 'otherFunds'
> & {
  sourceCOA: string;
  destinationLedger: string;
  grossProfit: number;
  grossProfitCoa: string;
  grossProfitDr: string;
  generalReserveFund: ParticularTableType[];
  distributionTable: DistributionTableType[];
  otherFunds: OtherFundDistributionTableType[];
  netProfit: number | string;
};
