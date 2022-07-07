import { FormProvider, useForm } from 'react-hook-form';

import { FormAccountInput, FormInput, FormSelect } from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const AddSupplierForm = () => {
  const { t } = useTranslation();
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
                label={t['addSuppliersName']}
                placeholder={t['addSuppliersEnterName']}
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
                name="SuppliersCode"
                label={t['addSuppliersVendorCode']}
                placeholder={t['addSuppliersEnterVendorCode']}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormSelect
                name="address"
                label={t['addSuppliersAddress']}
                placeholder={t['addSuppliersSelectAddress']}
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
                label={t['addSuppliersPanNo']}
                placeholder={t['addSuppliersEnterPanNo']}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <FormInput
                type="text"
                name="phoneNumber"
                label={t['addSuppliersPhoneNumber']}
                placeholder={t['addSuppliersPhoneNumber']}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <FormInput
                type="text"
                name="emailAddress"
                label={t['addSuppliersEmailAddress']}
                placeholder={t['addSuppliersEmailAddress']}
              />
            </GridItem>
          </Grid>

          <Box flexDirection="column" display="flex" gap="s16">
            <Text fontSize="r1" fontWeight="SemiBold" color="gray.500">
              {t['addSuppliersContactPerson']}
            </Text>
            <Grid templateColumns="repeat(3,1fr)" gap="s20">
              <GridItem>
                <FormInput
                  type="text"
                  name="contactName"
                  label={t['addSuppliersContactName']}
                  placeholder={t['addSuppliersContactName']}
                />
              </GridItem>
              <GridItem>
                <FormInput
                  type="text"
                  name="email"
                  label={t['addSuppliersEmailAddress']}
                  placeholder={t['addSuppliersEmailAddress']}
                />
              </GridItem>
            </Grid>
          </Box>

          <Box flexDirection="column" display="flex" gap="s16">
            <Text fontSize="r1" fontWeight="SemiBold" color="gray.500">
              {t['addSuppliersAdditionalField']}
            </Text>
            <Grid templateColumns="repeat(3,1fr)" gap="s20">
              <GridItem>
                <FormAccountInput
                  name="openingBalance"
                  label={t['addSuppliersOpeningBalance']}
                />
              </GridItem>
              <GridItem>
                <FormSelect
                  name="creditTerms"
                  label={t['addSuppliersCreditTerms']}
                  placeholder={t['addSuppliersCreditTerms']}
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
                  label={t['addSuppliersCreditLimit']}
                  placeholder={t['addSuppliersCreditLimit']}
                />
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};
