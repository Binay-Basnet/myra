import { DetailCardContent, DetailsCard } from '@myra-ui';

import {
  DefaultAccountType,
  Frequency,
  NatureOfDepositProduct,
  ProductCodeFormState,
} from '@coop/ebanking/data-access';

interface IProductGeneralInformation {
  generalInformation: {
    productName?: string | null;
    productCode?: ProductCodeFormState | null;
    nature?: NatureOfDepositProduct | null;
    depositFrequency?: Frequency | null;
    accountType?: DefaultAccountType | null;
  };
}

export const ProductGeneralInformation = ({ generalInformation }: IProductGeneralInformation) => (
  <DetailsCard title="General Information">
    <DetailCardContent title="Product Name" subtitle={generalInformation?.productName} />
    <DetailCardContent
      title="Product Code"
      subtitle={`${generalInformation?.productCode?.prefix}-${generalInformation?.productCode?.initialNo}`}
    />
    <DetailCardContent
      title="Product Type"
      subtitle={generalInformation?.nature?.toLowerCase()?.replace(/_/g, ' ')}
    />
    <DetailCardContent
      title="Nature of Deposit Product"
      subtitle={generalInformation?.nature?.toLowerCase()?.replace(/_/g, ' ')}
    />
    <DetailCardContent
      title="Deposit Frequency"
      subtitle={
        generalInformation?.depositFrequency
          ? generalInformation?.depositFrequency?.toLowerCase()
          : 'N/A'
      }
    />
    <DetailCardContent
      title="Default Amount Deposit Account Type"
      subtitle={generalInformation?.accountType}
    />
  </DetailsCard>
);
