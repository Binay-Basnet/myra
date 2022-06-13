import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import {
  KYCIndividualPersonal,
  SettingsGeneralMember,
} from '@coop/myra/components';
import { Box, Text } from '@coop/shared/ui';

const KYMIndividual = () => {
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
          Members
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
        <Box flex={1} p="s16">
          <Box
            borderBottom={'1px'}
            borderBottomColor="border.layout"
            py="s8"
            w="100%"
          >
            <Text
              fontSize="r2"
              fontWeight="600"
              color="neutralColorLight.Gray-80"
            >
              KYM Form - Individual
            </Text>
            <Text pt={'s2'} fontSize="r1" fontWeight="400" color="gray.400">
              Settings to change options and fields in KYM form for individuals
            </Text>
          </Box>
          <Box mt="s16">
            <KYCIndividualPersonal />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default KYMIndividual;
KYMIndividual.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
