import { Box, Text } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

type GlTransactionDetailProps = {
  data:
    | ({
        account: string;
        serviceCenter?: string | null | undefined;
        debit?: string | null | undefined;
        credit?: string | null | undefined;
        ledgerId?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
  total?: string | null;
};

export const GlTransactionJornalVoucherPrint = ({ data, total }: GlTransactionDetailProps) => {
  if (data?.length === 0) return null;
  return (
    <Box
      display="flex"
      flexDir="column"
      borderRadius="br2"
      border="1px solid"
      mb="s16"
      borderColor="border.layout"
    >
      <Box h="40px" display="flex" borderBottom="1px solid" borderBottomColor="border.layout">
        <Box
          display="flex"
          alignItems="center"
          w="50%"
          h="100%"
          px="s12"
          borderRight="1px solid"
          borderRightColor="border.layout"
          fontSize="s1"
          fontWeight={600}
          color="gray.700"
        >
          Account
        </Box>
        <Box
          px="s12"
          w="20%"
          display="flex"
          alignItems="center"
          justifyContent="end"
          borderRight="1px solid"
          borderRightColor="border.layout"
        >
          <Text fontSize="s1">Amount(Dr)</Text>
        </Box>

        <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
          <Text fontSize="s1">Amount(Cr)</Text>
        </Box>
      </Box>
      {data?.map((item) => (
        <Box h="40px" display="flex" borderBottom="1px solid" borderBottomColor="border.layout">
          <Box
            display="flex"
            alignItems="center"
            w="50%"
            h="100%"
            borderRight="1px solid"
            borderRightColor="border.layout"
            fontSize="s1"
            px="s12"
            color="gray.700"
          >
            {item?.account}
          </Box>
          <Box
            px="s12"
            w="20%"
            display="flex"
            alignItems="center"
            justifyContent="end"
            borderRight="1px solid"
            borderRightColor="border.layout"
          >
            <Text fontSize="s1">{amountConverter(item?.debit as string)}</Text>
          </Box>
          <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
            <Text fontSize="s1">{amountConverter(item?.credit as string)}</Text>
          </Box>
        </Box>
      ))}
      <Box h="40px" display="flex">
        <Box
          display="flex"
          alignItems="center"
          w="50%"
          h="100%"
          borderRight="1px solid"
          borderRightColor="border.layout"
          fontSize="s1"
          fontWeight={600}
          color="gray.700"
          px="s12"
        >
          Total
        </Box>
        <Box
          px="s12"
          w="20%"
          display="flex"
          alignItems="center"
          justifyContent="end"
          borderRight="1px solid"
          borderRightColor="border.layout"
        >
          <Text fontSize="s1">{amountConverter(total as string)}</Text>
        </Box>
        <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
          <Text fontSize="s1">{amountConverter(total as string)}</Text>
        </Box>
      </Box>
    </Box>
  );
};
