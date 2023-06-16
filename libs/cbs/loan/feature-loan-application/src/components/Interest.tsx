import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Alert, Box, Text } from '@myra-ui';

import { InterestAuthority, useGetCurrentOrganizationRateQuery } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput, FormInput, FormRadioGroup } from '@coop/shared/form';

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
  {
    label: 'Default',
    value: InterestAuthority?.Default,
  },
  {
    label: 'Update Interest',
    value: InterestAuthority?.UpdateInterest,
  },
];

export const Interest = () => {
  const router = useRouter();
  const loanApplicationId = router.query['id'] as string;
  const { watch, setValue, clearErrors } = useFormContext();

  const { data: orgRateData } = useGetCurrentOrganizationRateQuery();

  const { product } = useLoanProductContext();

  const interestAuth = watch('interestAuthority');

  const defaultInput = Number(product?.interest?.defaultRate);
  const [minValue, setMinValue] = useState(Number(product?.interest?.defaultRate));

  useEffect(() => {
    if (!loanApplicationId) {
      setValue('intrestRate', defaultInput);
    }
  }, [defaultInput]);

  // const minRate =
  //   interestAuth === InterestAuthority.Board
  //     ? Number(product?.interest?.defaultRate) - Number(product?.interest?.boardAuthority)
  //     : Number(product?.interest?.defaultRate) - Number(product?.interest?.ceoAuthority);

  // this comment is for  cherrypicking

  useEffect(() => {
    clearErrors();
    if (router.pathname.includes('add')) {
      setValue('intrestRate', defaultInput);
    }
    if (interestAuth === InterestAuthority.Board) {
      setMinValue(
        Number(product?.interest?.defaultRate) - Number(product?.interest?.boardAuthority)
      );
    }
    if (interestAuth === InterestAuthority?.Ceo) {
      setMinValue(Number(product?.interest?.defaultRate) - Number(product?.interest?.ceoAuthority));
    }
    if (interestAuth === InterestAuthority?.UpdateInterest) {
      setMinValue(Number(product?.interest?.minRate));
    }
  }, [defaultInput, interestAuth, product]);

  const maxValue = Number(product?.interest?.maxRate);
  const interestRate = watch('intrestRate');

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" w="100%" background="neutralColorLight.Gray-0">
        <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-60" mb="s16">
          {' '}
          Account Premium
        </Text>
        <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap="s16">
          <InputGroupContainer>
            <FormInput
              name="intrestRate"
              label="Account Premium Rate"
              type="number"
              textAlign="right"
              isDisabled={!interestAuth || interestAuth === InterestAuthority?.Default}
              rules={{
                max: {
                  value:
                    interestAuth === InterestAuthority?.UpdateInterest ? maxValue : defaultInput,
                  message: 'Interest Rate is invalid',
                },
                min: {
                  value: minValue,
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
          {interestAuth !== InterestAuthority?.Default &&
            interestAuth !== InterestAuthority?.UpdateInterest && (
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
                    Account Premium Rate:{' '}
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
          <Alert status="info" title="Interest Breakdown" hideCloseIcon>
            <Box display="flex" flexDirection="column" gap="s4">
              <Box as="ul" display="flex" flexDir="column" gap="s4">
                <li>
                  <Text fontWeight="400" fontSize="r1">
                    Account Premium Rate: <b>{interestRate}%</b>
                  </Text>
                </li>
                <li>
                  <Text fontWeight="400" fontSize="r1">
                    Product Premium Rate: <b>{product?.productPremiumInterest}%</b>
                  </Text>
                </li>
                <li>
                  <Text fontWeight="400" fontSize="r1">
                    Organization Rate:{' '}
                    <b>
                      {typeof orgRateData?.settings?.general?.deposit
                        ?.getCurrentOrganizationRate === 'number'
                        ? `${orgRateData?.settings?.general?.deposit?.getCurrentOrganizationRate} %`
                        : 'N/A'}
                    </b>
                  </Text>
                </li>
                <li>
                  <Text fontWeight="400" fontSize="r1">
                    Final Interest Rate:{' '}
                    <b>
                      {`${
                        Number(interestRate || 0) +
                        Number(product?.productPremiumInterest || 0) +
                        Number(
                          orgRateData?.settings?.general?.deposit?.getCurrentOrganizationRate || 0
                        )
                      } %`}
                    </b>
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
