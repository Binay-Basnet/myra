import { DetailCardContent, DetailsCard } from '@myra-ui';

interface IGeneralInfoCardProps {
  title: string;
  items: { label: string; value: string | null | undefined }[];
}

export const GeneralInfoCard = ({ title, items }: IGeneralInfoCardProps) => (
  <DetailsCard title={title} bg="white" hasThreeRows>
    {items.map(
      (item) => item.value && <DetailCardContent title={item.label} subtitle={item.value} />
    )}
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
