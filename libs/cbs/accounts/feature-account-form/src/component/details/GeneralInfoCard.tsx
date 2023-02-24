import { DetailCardContent, DetailsCard } from '@myra-ui';

import { DefaultAccountType, NatureOfDepositProduct } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface IGeneralInfoCardProps {
  title: string;
  data: {
    accountName: string | null | undefined;
    productName: string | null | undefined;
    productId: string | null | undefined;
    accountOpenDate: string | null | undefined;
    defaultAccountType: DefaultAccountType | null | undefined;
    accountType: string | null | undefined;
    interestAccrued: string | null | undefined;
    interestEarned: string | null | undefined;
    interestRate: number | null | undefined;
    guaranteedAmount: string | null | undefined;
    accountTenure: string | null | undefined;
    isMandatory: boolean | null | undefined;
    nomineeAccountNumber: string | null | undefined;
    nomineeAccountName: string | null | undefined;
    productMinimumBalance: string | null | undefined;
  };
  // accountTypes?: {
  //   SAVING: string;
  //   RECURRING_SAVING: string;
  //   TERM_SAVING_OR_FD: string;
  //   CURRENT: string;
  // };
}

export const GeneralInfoCard = ({ title, data }: IGeneralInfoCardProps) => (
  <DetailsCard title={title} bg="white" hasThreeRows>
    <DetailCardContent title="Account Name" subtitle={data.accountName} />
    <DetailCardContent
      title="Product Name"
      children={
        <RedirectButton
          label={data?.productName}
          link={`${ROUTES.CBS_ACCOUNT_SAVING_PRODUCT_DETAILS}?id=${data?.productId}`}
        />
      }
    />
    <DetailCardContent title="Account Open Date" subtitle={data.accountOpenDate} />
    {/* {accountDetails?.accountType === NatureOfDepositProduct?.Current && (
      <DetailCardContent
        title="Default Amount Deposit Account"
        subtitle={
          data?.nomineeAccount 
        }
      />
    )} */}

    <DetailCardContent
      title="Interest Accrued"
      subtitle={
        data?.accountType === NatureOfDepositProduct.Current ? null : data?.interestAccrued ?? '0'
      }
    />
    <DetailCardContent
      title="Interest Earned"
      subtitle={
        data?.accountType === NatureOfDepositProduct.Current ? null : data?.interestEarned ?? '0'
      }
    />
    <DetailCardContent
      title="Interest Rate"
      subtitle={
        data?.accountType === NatureOfDepositProduct.Current ? null : `${data?.interestRate} %`
      }
    />
    <DetailCardContent title="Guarantee Amount" subtitle={data?.guaranteedAmount ?? '0'} />
    <DetailCardContent title="Tenure" subtitle={data?.accountTenure ?? '-'} />

    {data?.nomineeAccountName && data?.nomineeAccountNumber ? (
      <DetailCardContent title="Nominee Account">
        <RedirectButton
          label={data?.nomineeAccountName}
          link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}/?id=${data?.nomineeAccountNumber}`}
        />
      </DetailCardContent>
    ) : null}
    <DetailCardContent
      title="Minimum Balance"
      subtitle={amountConverter(data?.productMinimumBalance || 0)}
    />
  </DetailsCard>
);

// import { DetailCardContent, DetailsCard } from '@myra-ui';

// import { MemberAccountDetails, NatureOfDepositProduct } from '@coop/cbs/data-access';
// import { localizedDate, RedirectButton } from '@coop/cbs/utils';

// interface IGeneralInfoCardProps {
//   title: string;
//   accountData: MemberAccountDetails;
//   item: { label: string; value: string }[];
//   accountTypes: {
//     SAVING: string;
//     RECURRING_SAVING: string;
//     TERM_SAVING_OR_FD: string;
//     CURRENT: string;
//   };
// }

// export const GeneralInfoCard = ({
//   title,
//   items,
//   accountData,
//   accountTypes,
// }: IGeneralInfoCardProps) => (
//   <DetailsCard title={title} bg="white" hasThreeRows>
//     <DetailCardContent title="Account Name" subtitle={items.accountName} />
//     <DetailCardContent
//       title="Product Name"
//       children={
//         <RedirectButton
//           label={items?.productName}
//           link={`/cbs/savings/products/details?id=${123}`}
//         />
//       }
//     />
//     <DetailCardContent title="Account Open Date" subtitle={localizedDate(items.accountOpenDate)} />
//     <DetailCardContent
//       title="Default Amount Deposit Account Type"
//       subtitle={
//         items?.accountType === NatureOfDepositProduct.RecurringSaving ||
//         (items?.accountType === NatureOfDepositProduct?.Current && items?.isMandatory)
//           ? items?.defaultAccountType
//             ? accountTypes[items?.defaultAccountType]
//             : '-'
//           : ''
//       }
//     />
//     <DetailCardContent
//       title="Interest Accrued"
//       subtitle={
//         items?.accountType === NatureOfDepositProduct.Current ? null : items?.interestAccrued ?? '0'
//       }
//     />
//     <DetailCardContent
//       title="Interest Earned"
//       subtitle={
//         items?.accountType === NatureOfDepositProduct.Current ? null : items?.interestEarned ?? '0'
//       }
//     />
//     <DetailCardContent
//       title="Interest Rate"
//       subtitle={
//         items?.accountType === NatureOfDepositProduct.Current ? null : `${items?.interestRate} %`
//       }
//     />
//     <DetailCardContent title="Guarantee Amount" subtitle={items?.guaranteedAmount ?? '0'} />
//     <DetailCardContent title="Tenure" subtitle={items?.accountTenure ?? '-'} />
//   </DetailsCard>
// );
