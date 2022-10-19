import { Address } from '@coop/cbs/data-access';

export const formatTableAddress = (address: Address | undefined | null) => {
  if (!address?.localGovernment?.local && !address?.wardNo) {
    return '-';
  }

  const addressArr = [];

  const localGovernment = address?.localGovernment?.local;
  const wardNo = address?.wardNo;

  if (localGovernment) {
    addressArr.push(localGovernment);
  }

  if (wardNo) {
    addressArr.push(wardNo);
  }

  return addressArr.join('-');
};
