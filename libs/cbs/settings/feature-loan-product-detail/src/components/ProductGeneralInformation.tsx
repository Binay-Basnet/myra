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
    <DetailCardContent title="Product Type" subtitle={generalInformation?.nature?.toLowerCase()} />
    <DetailCardContent
      title="Nature of Loan Product"
      subtitle={generalInformation?.nature?.toLowerCase()}
    />
    <DetailCardContent
      title="Product Subtype"
      subtitle={
        generalInformation?.depositFrequency
          ? generalInformation?.depositFrequency?.toLowerCase()
          : 'N/A'
      }
    />
    <DetailCardContent
      title="Interest Method"
      subtitle={
        generalInformation?.depositFrequency
          ? generalInformation?.depositFrequency?.toLowerCase()
          : 'N/A'
      }
    />
    <DetailCardContent
      title="Loan Repayment Scheme"
      subtitle={
        generalInformation?.depositFrequency
          ? generalInformation?.depositFrequency?.toLowerCase()
          : 'N/A'
      }
    />
    <DetailCardContent
      title="Installment Frequency"
      subtitle={
        generalInformation?.depositFrequency
          ? generalInformation?.depositFrequency?.toLowerCase()
          : 'N/A'
      }
    />
  </DetailsCard>
);
