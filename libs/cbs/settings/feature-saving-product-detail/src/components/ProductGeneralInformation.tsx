import { DetailCardContent, DetailsCard } from '@myra-ui';

import { DepositFrequency } from '@coop/cbs/data-access';
import {
  DefaultAccountType,
  NatureOfDepositProduct,
  ProductCodeFormState,
} from '@coop/ebanking/data-access';

interface IProductGeneralInformation {
  generalInformation: {
    productName?: string | null;
    productCode?: ProductCodeFormState | null;
    nature?: NatureOfDepositProduct | null;
    postingFrequency?: DepositFrequency | null;
    accountType?: DefaultAccountType | null;
  };
}

export const ProductGeneralInformation = ({ generalInformation }: IProductGeneralInformation) => (
  <DetailsCard title="General Information" hasThreeRows>
    <DetailCardContent title="Product Name" subtitle={generalInformation?.productName} />
    <DetailCardContent
      title="Product Code"
      subtitle={`${generalInformation?.productCode?.prefix}-${generalInformation?.productCode?.initialNo}`}
    />
    <DetailCardContent
      title="Nature of Saving Product"
      subtitle={generalInformation?.nature?.replace(/_/g, ' ')}
    />
    <DetailCardContent
      title="Interest Positing Frequency"
      subtitle={
        generalInformation?.postingFrequency
          ? generalInformation?.postingFrequency?.replace(/_/g, ' ')
          : 'N/A'
      }
    />
  </DetailsCard>
);
