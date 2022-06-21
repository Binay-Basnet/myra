import { Grid, Radio, RadioGroup } from '@chakra-ui/react';
import { useTranslation } from '@coop/shared/utils';
// import{ Control} from 'react-hook-form';

// interface Props extends RadioGroupProps{
//     control:Control;
// }
export const RadioOrganization = () => {
  const { t } = useTranslation();
  return (
    <RadioGroup fontWeight={'400'}>
      {/* <Box display="flex" justifyContent={'flex-start'}> */}
      <Grid templateRows={'repeat(2, 1fr)'} gap={'s8'}>
        <Radio size="md" value="1">
          {t['settingsOrganizationCooperative']}
        </Radio>
        <Radio value="2" size="md">
          {t['settingsOrganizationCooperativeUnion']}
        </Radio>
      </Grid>
      {/* </Box> */}
      {/* <Box display="flex" justifyContent={'flex-start'}> */}
      {/* </Box> */}
    </RadioGroup>
  );
};
