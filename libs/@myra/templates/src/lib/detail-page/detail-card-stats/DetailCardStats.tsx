import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import { Box, Divider, Icon, Text } from '@myra-ui/foundations';

import { amountConverter } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface DetailCardStatsProps {
  title: string;
  stats: number;
  hideCommas?: boolean;
  meta?:
    | {
        growth: number;
        time: string;
      }
    | undefined
    | null;
  children?: React.ReactNode;
}

export const DetailCardStats = ({
  title,
  stats,
  meta,
  children,
  hideCommas,
}: DetailCardStatsProps) => (
  <Box
    borderRadius="br2"
    boxShadow="E0"
    w="100%"
    bg="gray.0"
    p="s16"
    display="flex"
    flexDirection="column"
    gap="s8"
  >
    <Box display="flex" flexDirection="column" gap="s4" alignItems="flex-start">
      <Text color="gray.500" fontSize="s3" fontWeight="Medium" lineHeight="125%">
        {title}
      </Text>

      <Text color="gray.800" fontSize="r3" fontWeight="SemiBold" lineHeight="150%">
        {hideCommas ? stats : amountConverter(stats)}
      </Text>

      {meta && (
        <Box display="flex" gap="s12">
          <Box display="flex" gap="s2" alignItems="center">
            {meta?.growth > 0 ? (
              <Icon color="primary.500" as={AiOutlineArrowUp} />
            ) : (
              <Icon size="sm" color="danger.500" as={AiOutlineArrowDown} />
            )}
            <Text
              color={meta?.growth > 0 ? 'primary.500' : 'danger.500'}
              fontSize="s2"
              fontWeight="Regular"
              lineHeight="s16"
            >
              {Math.abs(meta?.growth)}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" gap="s4">
            <Box height="s4" width="s4" bg="gray.400" borderRadius="100%" />
            <Text color="gray.400" fontSize="s2" fontWeight="Regular" lineHeight="s16">
              {meta?.time}
            </Text>
          </Box>
        </Box>
      )}
    </Box>

    {children && <Divider />}

    {children}
  </Box>
);

export default DetailCardStats;
