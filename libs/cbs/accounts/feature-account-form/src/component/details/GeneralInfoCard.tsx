import { useState } from 'react';
import Image from 'next/image';

import { DetailCardContent, DetailsCard, Modal, Text } from '@myra-ui';

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
    accountExpiryDate: Record<'local' | 'en' | 'np', string> | null | undefined;
    installmentAmount?: string | null;
    signaturePicUrl?: string | null;
  };
  // accountTypes?: {
  //   SAVING: string;
  //   RECURRING_SAVING: string;
  //   TERM_SAVING_OR_FD: string;
  //   CURRENT: string;
  // };
}

export const GeneralInfoCard = ({ title, data }: IGeneralInfoCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
            data?.accountType === NatureOfDepositProduct.Current
              ? null
              : data?.interestAccrued ?? '0'
          }
        />
        <DetailCardContent
          title="Interest Earned"
          subtitle={
            data?.accountType === NatureOfDepositProduct.Current
              ? null
              : data?.interestEarned ?? '0'
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
        <DetailCardContent
          title="Account Expiry Date"
          subtitle={data?.accountExpiryDate?.local ?? '-'}
        />
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
        <DetailCardContent
          title="Installment Amount"
          subtitle={amountConverter(data?.installmentAmount || 0)}
        />
        <Text
          fontWeight="500"
          fontSize="r1"
          color="green.500"
          cursor="pointer"
          onClick={() => setIsModalOpen(true)}
        >
          View Signature
        </Text>
      </DetailsCard>
      <Modal open={isModalOpen} onClose={handleModalClose} isCentered title="Signature" width="xs">
        <Image src={data?.signaturePicUrl as string} alt="Signature" width={400} height={400} />
      </Modal>
    </>
  );
};
