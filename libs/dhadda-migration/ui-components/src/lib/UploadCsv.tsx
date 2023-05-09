import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { uploadExcel } from '@dhadda-migration/data-access';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Box, Button, Input, Text } from '@myra-ui';

export const UploadCsv = () => {
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit } = methods;
  const [selectedFile, setSelectedFile] = useState();
  const queryClient = useQueryClient();

  const { mutate: uploadExcelMutation } = useMutation(uploadExcel, {
    onSuccess: () => {
      queryClient.invalidateQueries(['project-status']);
    },
    onError: () => {},
    onSettled: () => {
      // queryClient.invalidateQueries('create');
    },
  });

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('project_name', router?.query?.['projectName'] as string);
    formData.append('excel_file', selectedFile as unknown as string | Blob);
    uploadExcelMutation(formData as unknown as { project_name: string; excel_file: string | Blob });
  };
  const handleUploadFile = async (e) => {
    setSelectedFile(e.target.files[0]);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDir="column"
          gap={5}
          bg="white"
          p={5}
          w="-webkit-fit-content"
          borderRadius={5}
          boxShadow="lg"
        >
          <Text fontSize="r3" fontWeight="medium">
            Upload Csv
          </Text>
          <Input type="file" border="none" onChange={handleUploadFile} w="-webkit-fit-content" />
          <Button type="submit" w="-webkit-fit-content">
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default UploadCsv;
