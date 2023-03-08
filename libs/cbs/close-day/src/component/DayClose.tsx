import { Box, Text } from '@myra-ui';

import { EodState } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { StatusList } from './StatusList';

interface INumberStatusProps {
  active: boolean;
  number: number | string;
}

export const NumberStatus = ({ number, active }: INumberStatusProps) => (
  <Box
    w="s20"
    h="s20"
    display="flex"
    alignItems="center"
    justifyContent="center"
    fontSize="s2"
    fontWeight="600"
    borderRadius="100%"
    bg={active ? 'primary.500' : 'gray.500'}
    color="white"
  >
    {number}
  </Box>
);

interface IDayCloseProps {
  dayCloseList: {
    title: string;
    subTitle: string;
    status: EodState | null | undefined;
    errors?: string[];
  }[];
}

export const DayClose = ({ dayCloseList }: IDayCloseProps) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" py="s16">
      <Box display="flex" flexDirection="column">
        <Box display="flex" py="s16" justifyContent="space-between" alignItems="center">
          <Text
            fontSize="r2"
            fontWeight="SemiBold"
            color="neutralColorLight.Gray-80"
            lineHeight="s20"
          >
            {t['dayCloseInOrder']}
          </Text>
        </Box>

        <StatusList statusList={dayCloseList} />
      </Box>
    </Box>
  );
};
