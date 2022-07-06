import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoAddOutline } from 'react-icons/io5';

import {
  FormAccountInput,
  FormInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import { Box, Button, Divider, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const AddVendorForm = () => {
  const { t } = useTranslation();
  const [addnInfo, setAddnInfo] = useState(false);
  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <form>
        <Box
          w="100%"
          background="white"
          p="s20"
          display="flex"
          flexDirection="column"
          gap="s32"
        >
          <Grid templateColumns="repeat(3,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormSelect
                name="name"
                label={t['addVendorName']}
                placeholder={t['addVendorEnterName']}
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="text"
                name="vendorCode"
                label={t['addVendorVendorCode']}
                placeholder={t['addVendorEnterVendorCode']}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormSelect
                name="address"
                label={t['addVendorAddress']}
                placeholder={t['addVendorSelectAddress']}
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="text"
                name="panNo"
                label={t['addVendorPanNo']}
                placeholder={t['addVendorEnterPanNo']}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <FormInput
                type="text"
                name="phoneNumber"
                label={t['addVendorPhoneNumber']}
                placeholder={t['addVendorPhoneNumber']}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <FormInput
                type="text"
                name="emailAddress"
                label={t['addVendorEmailAddress']}
                placeholder={t['addVendorEmailAddress']}
              />
            </GridItem>
          </Grid>

          <Box flexDirection="column" display="flex" gap="s16">
            <Text fontSize="r1" fontWeight="SemiBold" color="gray.500">
              {t['addVendorContactPerson']}
            </Text>
            <Grid templateColumns="repeat(3,1fr)" gap="s20">
              <GridItem>
                <FormInput
                  type="text"
                  name="contactName"
                  label={t['addVendorContactName']}
                  placeholder={t['addVendorContactName']}
                />
              </GridItem>
              <GridItem>
                <FormInput
                  type="text"
                  name="email"
                  label={t['addVendorEmailAddress']}
                  placeholder={t['addVendorEmailAddress']}
                />
              </GridItem>
            </Grid>
          </Box>

          <Box flexDirection="column" display="flex" gap="s16">
            <Text fontSize="r1" fontWeight="SemiBold" color="gray.500">
              {t['addVendorAdditionalField']}
            </Text>
            <Grid templateColumns="repeat(3,1fr)" gap="s20">
              <GridItem>
                <FormAccountInput
                  name="openingBalance"
                  label={t['addVendorOpeningBalance']}
                />
              </GridItem>
              <GridItem>
                <FormSelect
                  name="creditTerms"
                  label={t['addVendorCreditTerms']}
                  placeholder={t['addVendorCreditTerms']}
                  options={[
                    {
                      label: '1',
                      value: '1',
                    },
                    {
                      label: '2',
                      value: '2',
                    },
                    {
                      label: '3',
                      value: '3',
                    },
                  ]}
                />
              </GridItem>
              <GridItem>
                <FormInput
                  type="text"
                  name="creditLimit"
                  label={t['addVendorCreditLimit']}
                  placeholder={t['addVendorCreditLimit']}
                />
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};
