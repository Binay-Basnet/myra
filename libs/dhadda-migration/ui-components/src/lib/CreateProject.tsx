import { FormProvider, useForm } from 'react-hook-form';
import { createProject } from '@dhadda-migration/data-access';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Box, Button, Text, toast } from '@myra-ui';

import { FormInput } from '@coop/shared/form';

export const CreateProject = () => {
  const methods = useForm();
  const queryClient = useQueryClient();
  const { handleSubmit, getValues } = methods;
  const { mutate, isLoading } = useMutation(createProject, {
    onSuccess: () => {
      toast({
        id: 'create-project',
        type: 'success',
        message: 'Project created successfully',
      });
      queryClient.invalidateQueries(['list']);
    },
    onError: () => {
      toast({
        id: 'create-project',
        type: 'error',
        message: 'Failed to create Project',
      });
    },
  });
  const onSubmit = () => {
    const formData = new FormData();
    formData.append('project_name', getValues()?.projectName);
    mutate(formData as unknown as { project_name: string });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDir="column"
          p={5}
          gap={5}
          bg="white"
          width="-webkit-fit-content"
          borderRadius={5}
          boxShadow="lg"
          mb={10}
        >
          <Text fontSize="r3" fontWeight="medium">
            Create new project
          </Text>
          <FormInput name="projectName" label="Project Name" />
          <Button w="-webkit-fit-content" type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default CreateProject;
