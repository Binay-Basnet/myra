/* eslint-disable-next-line */
// export interface MigrationUiComponentsProps {}

import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useCreateProjectMutation, useGetProjectsQuery } from '@migration/data-access';

import { Box, Button, Grid, GridItem, Text } from '@myra-ui';

import { FormInput } from '@coop/shared/form';

export const MigrationUiComponents = () => {
  const { data, refetch } = useGetProjectsQuery();
  const { mutateAsync } = useCreateProjectMutation();
  const methods = useForm();
  const { handleSubmit, getValues, reset } = methods;
  const onSubmit = () => {
    mutateAsync({ input: { dbName: getValues()?.dbName } }).then(() => {
      refetch();
      reset({ dbName: '' });
    });
  };

  return (
    <Box display="flex" flexDir="column" gap={5}>
      <Text fontSize="3xl" fontWeight="semibold">
        Migration
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap="s32">
        <GridItem>
          <Box
            display="flex"
            flexDir="column"
            p={5}
            gap={5}
            bg="whiteAlpha.900"
            borderRadius={6}
            boxShadow="lg"
          >
            <Box display="flex" justifyContent="space-between">
              <Text fontSize="r3" fontWeight="medium">
                Projects
              </Text>
              <Button onClick={() => refetch()}>Reload</Button>
            </Box>

            {data?.protectedQuery?.getProjects?.map((item, index) => (
              <Link href={`/${item}`}>
                {index + 1}. {item}
              </Link>
            ))}
          </Box>
        </GridItem>
        <GridItem>
          <Box
            display="flex"
            flexDir="column"
            p={5}
            gap={5}
            bg="whiteAlpha.900"
            borderRadius={6}
            boxShadow="lg"
          >
            <Text fontSize="r3" fontWeight="medium">
              New Project
            </Text>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDir="column" gap={5}>
                  <FormInput name="dbName" label="DB Name" />
                  <Button w={100} type="submit">
                    Submit
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MigrationUiComponents;
