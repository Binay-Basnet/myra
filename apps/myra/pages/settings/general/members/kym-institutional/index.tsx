import { SettingsGeneralMember } from '@saccos/myra/components';
import { Box, Text } from '@saccos/myra/ui';

import GeneralLayout from '../../../../../components/SettingsLayout/GeneralLayout';
const KYMInstitutional = () => {
  return (
    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display={'flex'}
        alignItems={'center'}
        h="60px"
      >
        <Text
          fontSize="r2"
          px="s16"
          fontWeight="600"
          color="neutralColorLight.Gray-80"
        >
          Organization
        </Text>
      </Box>
      <Box display={'flex'} flexDirection="row" h="fit-content">
        <Box
          w="300px"
          px="s8"
          py="s16"
          borderRight={'1px'}
          borderRightColor="border.layout"
        >
          <SettingsGeneralMember />
        </Box>
      </Box>
    </Box>
  );
};

export default KYMInstitutional;
KYMInstitutional.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
