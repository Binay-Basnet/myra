import { FormProvider, useForm } from 'react-hook-form';

import { FormEmailInput, FormInput, FormPhoneNumber, FormSelect } from '@coop/shared/form';
import { Box, Button, Grid, GridItem } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

const roles = [
  {
    label: 'Super Admin',
    value: 'superadmin',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'user',
  },
];

export const NeosysUsersForm = () => {
  const { t } = useTranslation();
  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <form>
        <Box display="flex" flexDirection="column" gap="s32" p="s20">
          <Box display="flex" flexDirection="column" gap="s32">
            <Grid templateColumns="repeat(3,1fr)" gap="s20">
              <GridItem colSpan={2}>
                <FormInput
                  type="text"
                  name="name"
                  label={t['neoUsersName']}
                  __placeholder={t['neoUsersName']}
                />
              </GridItem>
              <GridItem>
                <FormSelect
                  name="role"
                  label={t['neoUsersRole']}
                  __placeholder={t['neoUsersSelectRole']}
                  options={roles.map((d) => ({
                    label: d.label,
                    value: d.value,
                  }))}
                />
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(3,1fr)" gap="s20">
              <GridItem colSpan={2}>
                <FormEmailInput
                  // type="text"
                  name="emailAddress"
                  label={t['neoUsersEmailAddress']}
                  __placeholder={t['neoUsersEmailAddress']}
                />
              </GridItem>
              <GridItem>
                <FormPhoneNumber
                  // type="text"
                  name="phoneNumber"
                  label={t['neoUsersPhoneNumber']}
                  __placeholder={t['neoUsersPhoneNumber']}
                />
              </GridItem>
            </Grid>
          </Box>
          <Box>
            <Button variant="ghost">{t['neoUsersViewEditFullPermission']}</Button>
          </Box>
          {/* <Text fontSize="s3" fontWeight="Medium" color="primary.800">
        {t['neoUsersViewEditFullPermission']}
      </Text> */}
        </Box>
      </form>
    </FormProvider>
  );
};
