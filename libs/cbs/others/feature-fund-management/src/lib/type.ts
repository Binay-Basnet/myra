import { FundManagementInput } from '@coop/cbs/data-access';

export type ParticularTableType = {
  coaHead: string;
  percent: number | string;
  amount: string;
};

export type DistributionTableType = {
  coaHead: string;
  percent: number | string;
  amount: string;
};

export type OtherFundDistributionTableType = {
  coaHead: string;
  percent: number | string;
  amount: string;
};

export type CustomFundManagementInput = Omit<
  FundManagementInput,
  'generalReserveFund' | 'otherFunds'
> & {
  grossProfit: number;
  grossProfitCoa: string;
  grossProfitDr: string;
  generalReserveFund: ParticularTableType[];
  distributionTable: DistributionTableType[];
  otherFunds: OtherFundDistributionTableType[];
  netProfit: number | string;
};
