import { RadioGroup, Radio, Box, Grid, GridItem } from '@chakra-ui/react';

export const RadioOrganization = (register) => {
  return (
    <RadioGroup fontWeight={'400'} {...register('TypeOfMember')}>
      {/* <Box display="flex" justifyContent={'flex-start'}> */}
      <Grid templateColumns={'repeat(5, 1fr)'} gap={'s16'}>
        <Radio value="1"> Individual</Radio>
        <Radio value="2"> Institutional</Radio>
      </Grid>
      {/* </Box> */}
      {/* <Box display="flex" justifyContent={'flex-start'}> */}
      <Grid templateColumns={'repeat(5, 1fr)'} gap={'s16'}>
        <Radio value="3"> Cooperative</Radio>
        <Radio value="4"> Cooperative Union</Radio>
      </Grid>
      {/* </Box> */}
    </RadioGroup>
  );
};
