import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Button, Grid, GridItem, Modal, Text } from '@myra-ui';

import { FormCheckbox, FormInput, FormTextArea } from '@coop/shared/form';

export const NeosysFeatureClientView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box p="s8">
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="r2">MYRA Validation</Text>
        <Button onClick={handleModalOpen}>Create Environment</Button>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        isCentered
        title="Setup Environment"
        width="3xl"
      >
        <FormProvider {...methods}>
          <Grid templateColumns="repeat(2, 1fr)" rowGap="s12" columnGap="20px" py="s8">
            <GridItem>
              <FormInput name="environement" label="Environment" />
            </GridItem>
            <GridItem>
              <FormInput name="otpToken" label="OTP Token" />
            </GridItem>
            <GridItem colSpan={2}>
              <FormTextArea name="description" label="Description" />
            </GridItem>
            <GridItem colSpan={2}>
              <FormCheckbox name="isProduction" label="Is For Production?" />
            </GridItem>
          </Grid>
          <Box display="flex" justifyContent="flex-end">
            <Button>Submit</Button>
          </Box>
        </FormProvider>
      </Modal>
    </Box>
  );
};

export default NeosysFeatureClientView;
