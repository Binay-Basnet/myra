import React, { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { Box, Button, Icon } from '@myra-ui';

import { InfoCard } from '@coop/ebanking/cards';
import {
  useAppSelector,
  useGetAccountListQuery,
  useListWalletServicesQuery,
} from '@coop/ebanking/data-access';
import { FormSelect } from '@coop/shared/form';

interface InternetPaymentProps {
  setCurrentSequence: React.Dispatch<React.SetStateAction<number>>;
}

export const WalletLoadInitial = ({ setCurrentSequence }: InternetPaymentProps) => {
  const user = useAppSelector((state) => state.auth.cooperative.user);
  const { data } = useGetAccountListQuery({
    listFilter: { allowedAccount: true, servieType: 'EBANKING' },
    transactionPagination: { after: '', first: 1 },
  });

  const accounts = data?.eBanking?.account?.list?.accounts?.map((account) => ({
    label: `${account?.name} - ${account?.accountNumber} ${
      user?.defaultAccount === account?.id ? '( Default Account )' : ''
    }`,
    value: account?.id as string,
  }));

  const { reset, handleSubmit, setValue } = useFormContext();

  const { data: walletServicesData } = useListWalletServicesQuery();

  const walletServices = walletServicesData?.eBanking?.utility?.listWalletLoaderUtility;

  const walletOptions = useMemo(
    () =>
      walletServices?.map((w) => ({
        label: w?.name as string,
        value: w?.operatorCode as string,
      })) ?? [],
    [walletServices]
  );

  useEffect(() => {
    setValue('slug', 'walletload');
  }, []);

  return (
    <InfoCard
      title="Wallet Load"
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
          name="opCode"
          label="Select Wallet"
          options={walletOptions}
          // onChangeAction={(newVal) => {
          //   const selectedWallet = walletServices?.find((w) => w?.name === newVal?.['label']);
          //   setValue('operatorCode', selectedWallet?.operatorCode);
          // }}
          rules={{ required: 'Wallet is required' }}
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
