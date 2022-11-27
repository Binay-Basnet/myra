import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { InterestAuthority, LoanAccountInput } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput, FormInput, FormRadioGroup } from '@coop/shared/form';
import { Alert, Box, Text } from '@myra-ui';

import { useLoanProductContext } from '../hooks/useLoanProduct';

const radioGroupdata = [
  {
    label: 'Ceo Authority',
    value: InterestAuthority?.Ceo,
  },
  {
    label: 'Board Authority',
    value: InterestAuthority?.Board,
  },
];

export const Interest = () => {
  const router = useRouter();
  const loanApplicationId = router.query['id'] as string;
  const { watch, setValue } = useFormContext<LoanAccountInput>();

  const { product } = useLoanProductContext();

  const interestAuth = watch('interestAuthority');

  const defaultInput = Number(product?.interest?.defaultRate);

  useEffect(() => {
    if (!loanApplicationId) {
      setValue('intrestRate', defaultInput);
    }
  }, [defaultInput]);

  const minRate =
    interestAuth === InterestAuthority.Board
      ? Number(product?.interest?.defaultRate) - Number(product?.interest?.boardAuthority)
      : Number(product?.interest?.defaultRate) - Number(product?.interest?.ceoAuthority);

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" w="100%" background="neutralColorLight.Gray-0">
        <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-60" mb="s16">
          {' '}
          Interest
        </Text>
        <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap="s16">
          <InputGroupContainer>
            <FormInput
              name="intrestRate"
              type="number"
              textAlign="right"
              isDisabled={!interestAuth}
              rules={{
                max: {
                  value: defaultInput,
                  message: 'Interest Rate is invalid',
                },
                min: {
                  value: minRate,
                  message: 'Interest Rate is invalid',
                },
              }}
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />
          </InputGroupContainer>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <FormRadioGroup name="interestAuthority" options={radioGroupdata} direction="row" />
          </Box>
          {interestAuth && (
            <Box display="flex" flexDirection="column" gap="s8">
              <Text fontWeight="500" fontSize="s3">
                {' '}
                Authority Document
              </Text>
              <Box w="125px">
                {' '}
                <FormFileInput name="interestDoc" size="md" />{' '}
              </Box>
            </Box>
          )}

          <Alert status="info" title="Rates" hideCloseIcon>
            <Box display="flex" flexDirection="column" gap="s4">
              <Box as="ul" display="flex" flexDir="column" gap="s4">
                <li>
                  <Text fontWeight="400" fontSize="r1">
                    Interest Rate:{' '}
                    <b>
                      {product?.interest?.minRate} -{product?.interest?.maxRate}%
                    </b>
                  </Text>
                </li>
                <li>
                  <Text fontWeight="400" fontSize="r1">
                    CEO: <b>{product?.interest?.ceoAuthority}%</b> , BOD:{' '}
                    <b>{product?.interest?.boardAuthority}%</b>
                  </Text>
                </li>
              </Box>
            </Box>
          </Alert>
        </Box>
      </Box>
    </Box>
  );
};
