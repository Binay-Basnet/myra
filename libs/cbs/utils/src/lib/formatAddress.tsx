import { Address } from '@coop/cbs/data-access';

export const formatAddress = (address: Address | undefined | null) => {
  if (!address?.locality?.local && !address?.district?.local && !address?.state?.local) {
    return '-';
  }

  const addressArr = [];

  if (address?.locality?.local) {
    addressArr.push(address?.locality?.local);
  }

  if (address?.district?.local) {
    addressArr.push(address?.district?.local);
  }

  if (address?.state?.local) {
    addressArr.push(address?.state?.local);
  }

  return addressArr.join(', ');
};
