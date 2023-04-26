import { LoanInstallment } from '@coop/cbs/data-access';

export type IdealLoanInstallment = LoanInstallment & {
  idealPrincipal: string;
  idealInterest: string;
  idealPayment: string;
  idealRemainingPrincipal: string;
};
