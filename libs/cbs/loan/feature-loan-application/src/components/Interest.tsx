import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { LoanAccountInput } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormCheckbox, FormInput } from '@coop/shared/form';
import { Alert, Box, Text } from '@coop/shared/ui';

import { useLoanProductContext } from '../hooks/useLoanProduct';

export const Interest = () => {
  const { watch, setValue } = useFormContext<LoanAccountInput>();

  const { product } = useLoanProductContext();

  const ceoInterest = watch('isCeoAuthority');
  const BoardInterest = watch('isBoardAuthority');
  const valueInput =
    Number(product?.interest?.defaultRate) -
    (ceoInterest ? Number(product?.interest?.ceoAuthority) : 0) -
    (BoardInterest ? Number(product?.interest?.boardAuthority) : 0);

  useEffect(() => {
    setValue('intrestRate', valueInput);
  }, [valueInput]);

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
              isDisabled
              value={valueInput}
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />
          </InputGroupContainer>
          <InputGroupContainer>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <FormCheckbox name="isCeoAuthority" label="CEO Authority" />
              <FormCheckbox name="isBoardAuthority" label="Board Authority" />
            </Box>
          </InputGroupContainer>

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
