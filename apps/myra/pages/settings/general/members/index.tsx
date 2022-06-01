import { SettingsGeneralMember } from '@saccos/myra/components';
import {
  Box,
  Button,
  CheckboxGroup,
  Grid,
  GridItem,
  Input,
  Text,
} from '@saccos/myra/ui';
const checkBox = [
  'Individual',
  'Institutional',
  'Cooperative',
  'Corporative Union',
];
import { AddIcon } from '@chakra-ui/icons';
const riskArray = ['General Risk', 'Medium Risk', 'High Risk'];

import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';
const Members = () => {
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
              General
            </Text>
            <Text pt={'s2'} fontSize="r1" fontWeight="400" color="gray.400">
              These settings will be applied across all member related pages
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
                Types of New Member
              </Text>
              <Text pt={'s2'} fontSize="s3" fontWeight="400" color="gray.400">
                Choose which type of member is allowed
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
                Member Risk Level
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
                  Risk Level
                </Text>
                <Text
                  fontSize="r1"
                  fontWeight="600"
                  color="gray.800"
                  lineHeight={1.5}
                  w="25%"
                >
                  {' '}
                  Years till KYM Update
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
                Add New Option
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
  return <GeneralLayout>{page}</GeneralLayout>;
};
