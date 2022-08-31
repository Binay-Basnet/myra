type KYMStatus = {
  incomplete?: Array<{
    sectionName?: string | null;
    incomplete?: Array<string | null> | null;
  }>;
  errors?: Array<{
    sectionName?: string | null;
    incomplete?: Array<string | null> | null;
  }>;
};

type CheckValidityData = Record<string, KYMStatus | Array<KYMStatus> | null>;

export const checkKYMValidity = (data: CheckValidityData) => {
  if (Object.values(data).includes(null)) return false;
  if (Object.values(data).length === 0) return false;

  return !Object.entries(data).some((entry) => {
    if (Array.isArray(entry[1])) {
      return Object.entries(entry[1]).some(
        (e) => e[1]?.errors !== null || e[1].incomplete !== null
      );
    } else {
      return entry[1]?.errors !== null || entry[1].incomplete !== null;
    }
  });
};
