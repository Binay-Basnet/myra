import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';
import React from 'react';
import { Box, Text } from '@saccos/myra/ui';

const Organization = () => {
  return (
    <Box
      py="s20"
      width="full"
      borderBottom="1px"
      borderBottomColor="border.layout"
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
  );
};

export default Organization;

Organization.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
