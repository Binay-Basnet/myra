import { AddIcon } from '@chakra-ui/icons';

import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsMemberLayout,
} from '@coop/cbs/settings/ui-layout';
import { Box, Button, CheckboxGroup, Input, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const Members = () => {
  const { t } = useTranslation();

  const checkBox = [
    t['settingsIndividual'],
    t['settingsInstitutional'],
    t['settingsCooperative'],
    t['settingsCorporativeUnion'],
  ];

  const riskArray = [
    t['settingsGeneralRisk'],
    t['settingsMediumRisk'],
    t['settingsHighRisk'],
  ];
  return (
    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <Box display={'flex'} flexDirection="row" h="fit-content">
        <Box p="s16" flex={1}>
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
              {t['settingsGeneral']}
            </Text>
            <Text pt={'s2'} fontSize="r1" fontWeight="400" color="gray.400">
              {t['settingsTheseSettings']}
            </Text>
          </Box>
          <Box mt="s12">
            <Box
              pl="s12"
              py="s12"
              border={'1px'}
              borderColor="border.layout"
              w="100%"
            >
              <Text
                fontSize="s3"
                fontWeight="600"
                color="neutralColorLight.Gray-80"
              >
                {t['settingsTypesOfNewMember']}
              </Text>
              <Text pt={'s2'} fontSize="s3" fontWeight="400" color="gray.400">
                {t['settingsChooseMember']}
                {t['']}
              </Text>
            </Box>
            <Box
              pl="s12"
              py="s12"
              border={'1px'}
              borderColor="border.layout"
              w="100%"
            >
              <CheckboxGroup
                direction="column"
                spacing={4}
                checkList={checkBox}
                variant="simple"
              />
            </Box>
          </Box>
          <Box mt="s12">
            <Box
              pl="s12"
              border={'1px'}
              borderColor="border.layout"
              w="100%"
              minH={'s60'}
              display={'flex'}
              alignItems={'center'}
            >
              <Text
                fontSize="s3"
                fontWeight="600"
                color="neutralColorLight.Gray-80"
              >
                {t['settingsMemberRisk']}
              </Text>
            </Box>
            <Box
              pl="s16"
              border={'1px'}
              borderColor="border.layout"
              w="100%"
              pb="s16"
            >
              <Box
                h="36px"
                display="flex"
                alignItems="center"
                justifyContent={'space-between'}
                pt="s16"
                px="s16"
              >
                <Text
                  fontSize="r1"
                  fontWeight="600"
                  color="gray.800"
                  lineHeight={1.5}
                >
                  {' '}
                  {t['settingsMemberRiskLevel']}
                </Text>
                <Text
                  fontSize="r1"
                  fontWeight="600"
                  color="gray.800"
                  lineHeight={1.5}
                  w="25%"
                >
                  {' '}
                  {t['settingsMemberYearsTillKYMUpdate']}
                </Text>
              </Box>
              {riskArray.map((item, index) => (
                <Box
                  key={`${item}${index}`}
                  display="flex"
                  justifyContent={'space-between'}
                  mt="s16"
                  px="s16"
                >
                  <Box h="36px" display="flex" alignItems="center" flex={1}>
                    <Text
                      fontSize="r1"
                      fontWeight="400"
                      color="gray.800"
                      lineHeight={1.5}
                    >
                      {item}
                    </Text>
                  </Box>
                  <Input
                    variant="outline"
                    type={'number'}
                    textAlign="left"
                    size="sm"
                    w="25%"
                    h="36px"
                    borderColor={'#CBD0D6'}
                  />
                </Box>
              ))}
            </Box>
            <Box
              pl="s16"
              border={'1px'}
              py="s16"
              borderColor="border.layout"
              w="100%"
              display={'flex'}
              alignItems={'center'}
            >
              <Button
                variant="ghost"
                size={'md'}
                shade="primary"
                leftIcon={<AddIcon />}
              >
                {t['settingsMemberAddNewOption']}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Members;
Members.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsMemberLayout>{page}</SettingsMemberLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
