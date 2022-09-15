import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { LoanRepaymentScheme, useGetLoanProductDetailsDataQuery } from '@coop/cbs/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import { Alert, Box, Text } from '@coop/shared/ui';

export const LoanRepaymentSchemeComponent = () => {
  const [triggerQuery, setTriggerQuery] = useState(false);

  const { watch } = useFormContext();
  const products = watch('productId');

  const productDetails = useGetLoanProductDetailsDataQuery(
    { id: products },
    {
      enabled: triggerQuery,
    }
  );

  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
    }
  }, [products]);
  const productData = productDetails?.data?.settings?.general?.loanProducts?.formState?.data;

  const LoanRepaymentOptions = [
    { label: 'EMI', value: LoanRepaymentScheme?.Emi },
    { label: 'EPI', value: LoanRepaymentScheme?.Epi },
    { label: 'Flat', value: LoanRepaymentScheme?.Flat },
  ];
  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Text fontSize="r1" fontWeight="500">
        Loan Repayment Scheme
      </Text>
      <Box display="flex" flexDirection="column" gap="s8">
        <FormSwitchTab name="repaymentScheme" options={LoanRepaymentOptions} />
        <Alert status="info" hideCloseIcon>
          <Text fontWeight="400" fontSize="r1">
            Interest Method: <b>{productData?.interestMethod}</b>
          </Text>
        </Alert>
      </Box>
    </Box>
  );
};
