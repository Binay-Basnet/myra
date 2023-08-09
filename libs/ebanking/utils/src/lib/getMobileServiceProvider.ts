type ServiceProvider = 'ntc' | 'ncell' | 'smartcell' | null;

export const getMobileServiceProvider = (mobileNumber: string): ServiceProvider => {
  if (!mobileNumber || mobileNumber?.length !== 10) return null;

  if (
    mobileNumber.startsWith('984') ||
    mobileNumber.startsWith('985') ||
    mobileNumber.startsWith('986')
  ) {
    return 'ntc';
  }

  if (
    mobileNumber.startsWith('980') ||
    mobileNumber.startsWith('981') ||
    mobileNumber.startsWith('982')
  ) {
    return 'ncell';
  }

  if (
    mobileNumber.startsWith('961') ||
    mobileNumber.startsWith('962') ||
    mobileNumber.startsWith('988')
  ) {
    return 'smartcell';
  }

  return null;
};
