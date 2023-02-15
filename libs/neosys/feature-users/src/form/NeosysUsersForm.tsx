import { Box, Grid, GridItem } from '@myra-ui';

import { FormDatePicker, FormEmailInput, FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const NeosysUsersForm = () => {
  const { t } = useTranslation();

  return (
    <form>
      <Box display="flex" flexDirection="column" gap="s32" p="s20">
        <Box display="flex" flexDirection="column" gap="s32">
          <Grid templateColumns="repeat(2,1fr)" gap="s20">
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
                name="gender"
                label="Gender"
                __placeholder={t['neoUsersSelectRole']}
                options={[
                  { label: 'Male', value: 'MALE' },
                  { label: 'Female', value: 'FEMALE' },
                  { label: 'Other', value: 'OTHER' },
                ]}
              />
            </GridItem>
            <GridItem>
              <FormDatePicker isRequired name="dob" label="Date of birth" maxDate={new Date()} />
            </GridItem>
            <GridItem>
              <FormInput
                type="text"
                name="contactNo"
                label="Contact No"
                __placeholder={t['neoUsersName']}
              />
            </GridItem>
            <GridItem>
              <FormEmailInput
                // type="text"
                name="email"
                label={t['neoUsersEmailAddress']}
                __placeholder={t['neoUsersEmailAddress']}
              />
            </GridItem>
          </Grid>
        </Box>
        {/* <Box>
          <Button variant="ghost">{t['neoUsersViewEditFullPermission']}</Button>
        </Box> */}
      </Box>
    </form>
  );
};
