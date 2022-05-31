import React from 'react';
import { Text, Grid, GridItem } from '../../../ui/src';

import { FormInput } from '../../newFormComponents';

export const FinancialTransactionDetails = ({ control }) => {
  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        FINANCIAL TRANSACTION DETAILS
      </Text>
      <br />
      <Text fontSize="s3">
        Details of the amount initally deposited in the institution or deposited
        till now
      </Text>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'2em'}>
        <FormInput
          control={control}
          type="number"
          name="financialTransactionOrdinaryShare"
          label="Ordinary Share"
          placeholder="0.00"
        />
        <FormInput
          control={control}
          type="number"
          name="financialTransactionSavings"
          label="Savings"
          placeholder="0.00"
        />
        <FormInput
          control={control}
          type="number"
          name="financialTransactionLoan"
          label="Loan"
          placeholder="0.00"
        />
        <FormInput
          control={control}
          type="number"
          name="financialTransactionOthers"
          label="Other"
          placeholder="0.00"
        />
      </Grid>
    </>
  );
};
