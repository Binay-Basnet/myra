import { Avatar, Box, Text } from '@myra-ui';

type SidebarProps = {
  sidebarData: {
    code: string | null | undefined;
    date: string | null | undefined;
    transferType?: string | null | undefined;
    amount: string | null | undefined;
    srcTellerName: string | null | undefined;
    srcTellerPic: string | null | undefined;
  };
};

export const SidebarInfo = ({ sidebarData }: SidebarProps) => (
  <Box>
    <Box
      p="s16"
      display="flex"
      alignItems="start"
      gap="s4"
      borderBottom="1px"
      borderBottomColor="border.layout"
    >
      <Box w="100%" display="flex" gap="s16" flexDirection="column">
        <Text fontSize="r1" fontWeight="Regular" color="gray.700" lineHeight="17px">
          #{sidebarData?.code}
        </Text>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="Medium" color="gray.800" lineHeight="16px">
              {sidebarData?.date}
            </Text>

            {sidebarData?.transferType && (
              <Text fontSize="s3" fontWeight="Regular" color="gray.800" lineHeight="16px">
                {sidebarData?.transferType?.replace(/_/g, ' ')}
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Box>

    <Box
      p="s16"
      display="flex"
      alignItems="center"
      gap="s8"
      borderBottom="1px"
      borderBottomColor="border.layout"
    >
      <Avatar src={sidebarData?.srcTellerPic as string} size="sm" />
      <Text fontSize="r1" fontWeight="Medium" color="gray.800" lineHeight="150%">
        {sidebarData?.srcTellerName}
      </Text>
    </Box>
  </Box>
);
