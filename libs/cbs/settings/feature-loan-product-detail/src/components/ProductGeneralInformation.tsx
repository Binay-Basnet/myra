import { DetailCardContent, DetailsCard } from '@myra-ui';

import {
  LoanInterestMethod,
  LoanProductInstallment,
  LoanRepaymentScheme,
  NatureOfLoanProduct,
  ProductCodeType,
} from '@coop/cbs/data-access';

interface IProductGeneralInformation {
  generalInformation: {
    productName: string | null | undefined;
    productCode: ProductCodeType | null | undefined;
    productType: string | null | undefined;
    nature: NatureOfLoanProduct | null | undefined;
    productSubType: string | null | undefined;
    interestMethod: LoanInterestMethod | null | undefined;
    loanRepaymentScheme: (LoanRepaymentScheme | null)[] | null | undefined;
    installmentFrequency: LoanProductInstallment | null | undefined;
  };
}

export const ProductGeneralInformation = ({ generalInformation }: IProductGeneralInformation) => (
  <DetailsCard title="General Information" hasThreeRows>
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
        generalInformation?.productSubType
          ? generalInformation?.productSubType?.toLowerCase()
          : 'N/A'
      }
    />
    <DetailCardContent
      title="Interest Method"
      subtitle={
        generalInformation?.interestMethod
          ? generalInformation?.interestMethod?.toLowerCase()
          : 'N/A'
      }
    />
    <DetailCardContent
      title="Loan Repayment Scheme"
      subtitle={
        generalInformation?.loanRepaymentScheme
          ? generalInformation?.loanRepaymentScheme?.join(', ')
          : 'N/A'
      }
    />
    <DetailCardContent
      title="Installment Frequency"
      subtitle={
        generalInformation?.installmentFrequency
          ? generalInformation?.installmentFrequency?.toLowerCase()
          : 'N/A'
      }
    />
  </DetailsCard>
);
