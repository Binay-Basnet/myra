import { FundManagementInput } from '@coop/cbs/data-access';

export type ParticularTableType = {
  particular: string;
  percent: number | string;
  thisYear: number;
  lastYear: number;
};

export type DistributionTableType = {
  distribution: string;
  percent: number;
  thisYear: number;
  lastYear: number;
};

export type OtherFundDistributionTableType = {
  accountCode: string;
  percent: number;
  thisYear: number;
  lastYear: number;
};

export type CustomFundManagementInput = Omit<
  FundManagementInput,
  'generalReserveFund' | 'otherFunds'
> & {
  generalReserveFund: ParticularTableType[];
  distributionTable: DistributionTableType[];
  otherFunds: OtherFundDistributionTableType[];
  netProfit: number;
};
