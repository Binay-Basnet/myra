import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { Box, Button, Icon } from '@myra-ui';

import { InfoCard } from '@coop/ebanking/cards';
import {
  useAppSelector,
  useGetAccountListQuery,
  useListUtilitiesQuery,
} from '@coop/ebanking/data-access';
import { FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

interface InternetPaymentProps {
  setCurrentSequence: React.Dispatch<React.SetStateAction<number>>;
}

export const InternetPayment = ({ setCurrentSequence }: InternetPaymentProps) => {
  const user = useAppSelector((state) => state.auth.cooperative.user);
  const { data } = useGetAccountListQuery({ transactionPagination: { after: '', first: 1 } });

  const accounts = data?.eBanking?.account?.list?.accounts?.map((account) => ({
    label: `${account?.name} - ${account?.accountNumber} ${
      user?.defaultAccount === account?.id ? '( Default Account )' : ''
    }`,
    value: account?.id as string,
  }));

  const { reset, handleSubmit } = useFormContext();

  const { data: internetUtilitiesData } = useListUtilitiesQuery({
    pagination: { ...getPaginationQuery(), first: -1 },
    filter: {
      orConditions: [
        { andConditions: [{ column: 'servicename', comparator: 'EqualTo', value: 'internet' }] },
      ],
    },
  });

  const internetOptions = useMemo(
    () =>
      internetUtilitiesData?.eBanking?.utility?.listUtilities?.edges?.map((internet) => ({
        label: internet?.node?.name as string,
        value: internet?.node?.slug as string,
      })) ?? [],
    [internetUtilitiesData]
  );

  return (
    <InfoCard
      title="Internet Payment"
      btn={
        <Button variant="ghost" gap="s4">
          <Icon as={AiOutlinePlus} color="priamry.500" />
          Schedule for later
        </Button>
      }
    >
      <Box p="s16" display="flex" flexDir="column" gap="s32">
        <FormSelect
          name="sourceAccount"
          label="Source Account"
          options={accounts}
          rules={{ required: 'Source account is required.' }}
        />

        <FormSelect
          name="slug"
          label="Select ISP"
          options={internetOptions}
          rules={{ required: 'ISP is required' }}
        />

        <Box display="flex" gap="s16">
          <Button
            w="100px"
            type="submit"
            onClick={handleSubmit(() => {
              setCurrentSequence((val) => val + 1);
              // setPaymentStatus('review');
            })}
          >
            Proceed
          </Button>
          <Button
            type="reset"
            variant="outline"
            colorScheme="gray"
            w="100px"
            cursor="pointer"
            onClick={() => {
              reset();
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </InfoCard>
  );
};
