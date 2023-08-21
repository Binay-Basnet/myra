import { useRouter } from 'next/router';
import { migrateExcel } from '@dhadda-migration/data-access';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Box, Button, toast } from '@myra-ui';

export const MigrateExcel = (props: { validationStatus: boolean }) => {
  const { validationStatus } = props;
  const router = useRouter();
  const queryClient = useQueryClient();

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
    validateExcelMutation(formData as unknown as { project_name: string }).then(() => {
      queryClient.invalidateQueries(['project-status']);
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
