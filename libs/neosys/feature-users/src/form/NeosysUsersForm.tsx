import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
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

export const NeosysUsersForm = ({ watch }: any) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" gap="s32" p="s20">
      <Box display="flex" flexDirection="column" gap="s32">
        <Grid templateColumns="repeat(3,1fr)" gap="s20">
          <GridItem colSpan={2}>
            <FormInput
              type="text"
              name="name"
              label={t['neoUsersName']}
              placeholder={t['neoUsersName']}
            />
          </GridItem>
          <GridItem>
            <FormSelect
              name="role"
              label={t['neoUsersRole']}
              placeholder={t['neoUsersSelectRole']}
              options={roles.map((d) => ({
                label: d.label,
                value: d.value,
              }))}
            />
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(3,1fr)" gap="s20">
          <GridItem colSpan={2}>
            <FormInput
              type="text"
              name="emailAddress"
              label={t['neoUsersEmailAddress']}
              placeholder={t['neoUsersEmailAddress']}
            />
          </GridItem>
          <GridItem>
            <FormInput
              type="text"
              name="phoneNumber"
              label={t['neoUsersPhoneNumber']}
              placeholder={t['neoUsersPhoneNumber']}
            />
          </GridItem>
        </Grid>
      </Box>

      <Text fontSize="s3" fontWeight="Medium" color="primary.800">
        {t['neoUsersViewEditFullPermission']}
      </Text>
    </Box>
  );
};
