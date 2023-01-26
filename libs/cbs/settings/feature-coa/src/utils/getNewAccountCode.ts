import { CoaTypesOfAccount } from '@coop/cbs/data-access';

export type FullViewData = {
  id: string;
  name: Record<'en' | 'local' | 'np', string>;
  under?: string;
  accountType: CoaTypesOfAccount;
  accountClass: string;
  accountCode: string;
};

export const getNewAccountCode = (coaFullViewData: FullViewData[], under: string) => {
  const foundAccount = coaFullViewData?.find((d) => d.under === under);

  if (!foundAccount) {
    return `${under}.1`;
  }

  const childAccount =
    coaFullViewData
      .filter((d) => d.under === foundAccount.under)
      .sort((a, b) =>
        Number(
          a?.accountCode?.localeCompare(b?.accountCode as string, undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        )
      ) ?? [];

  const accountCode = childAccount[childAccount.length - 1]?.accountCode;
  const accountCodeArray = accountCode.split('.');
  const lastCode = accountCodeArray.pop();

  return `${accountCodeArray.join('.')}.${Number(lastCode) + 1}`;
};
