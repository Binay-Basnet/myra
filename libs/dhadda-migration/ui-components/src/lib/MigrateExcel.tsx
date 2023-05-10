import { useRouter } from 'next/router';
import { migrateExcel } from '@dhadda-migration/data-access';
import { useMutation } from '@tanstack/react-query';

import { Box, Button, toast } from '@myra-ui';

export const MigrateExcel = (props: { validationStatus: boolean }) => {
  const { validationStatus } = props;
  const router = useRouter();

  const { mutateAsync: validateExcelMutation, isLoading } = useMutation(migrateExcel, {
    onSuccess: (res) => {
      toast({
        id: 'migrate-excel',
        type: 'success',
        message: res?.data?.message,
      });
    },
    onError: () => {
      toast({
        id: 'migrate-excel',
        type: 'error',
        message: 'Something went wrong',
      });
    },
  });
  const onMigrateExcel = () => {
    const formData = new FormData();
    formData.append('project_name', router?.query?.['projectName'] as string);
    validateExcelMutation(formData as unknown as { project_name: string }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${router?.query?.['projectName']}.zip`);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
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
      <Button
        w="-webkit-fit-content"
        onClick={onMigrateExcel}
        isLoading={isLoading}
        disabled={!validationStatus}
      >
        Generate CSVs
      </Button>
    </Box>
  );
};
