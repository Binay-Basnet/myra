import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { AccountPopover } from '@coop/ebanking/accounts';
import { Box, Text } from '@myra-ui';

type Account = {
  id: string;
  accountNumber: string;
  name: string;
  balance: string;
};

interface IAccountHeaderProps {
  selectedAccountId: string;
  setSelectedAccountId: (id: string) => void;
}

const AccountHeader = ({ setSelectedAccountId, selectedAccountId }: IAccountHeaderProps) => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  useEffect(() => {
    setSelectedAccountId(selectedAccount?.id as string);
  }, [selectedAccount?.id]);

  return (
    <Box
      display="flex"
      alignItems="center"
      w="100%"
      justifyContent="space-between"
      px="s16"
      py="s12"
      minH="3.125rem"
    >
      <Box display="flex" flexDir="column" gap="s4">
        <Text fontSize="r1" color="gray.800" fontWeight="600" lineHeight="125%">
          {selectedAccount?.name}
        </Text>
        <Text fontSize="s3" color="gray.600" fontWeight="500" lineHeight="16.25px">
          {selectedAccount?.balance}
        </Text>
      </Box>
      <AccountPopover
        id={selectedAccountId}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
      />
    </Box>
  );
};

interface IFormAccountHeader {
  name: string;
}

export const FormAccountHeader = ({ name }: IFormAccountHeader) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <AccountHeader selectedAccountId={value} setSelectedAccountId={onChange} />
      )}
    />
  );
};
