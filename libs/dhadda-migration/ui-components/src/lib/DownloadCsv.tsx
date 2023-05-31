import { useRouter } from 'next/router';
import { downloadCSVs } from '@dhadda-migration/data-access';
import { useMutation } from '@tanstack/react-query';

import { Box, Button, toast } from '@myra-ui';

export const DownloadCsvs = () => {
  const router = useRouter();

  const { mutateAsync: downloadCsvMutation, isLoading } = useMutation(downloadCSVs, {
    onSuccess: () => {
      toast({
        id: 'download-csv',
        type: 'success',
        message: 'zip file downloaded successfully',
      });
    },
    onError: () => {
      toast({
        id: 'download-csv',
        type: 'error',
        message: 'Something went wrong',
      });
    },
  });
  const onDownloadCsv = () => {
    const formData = new FormData();
    formData.append('project_name', router?.query?.['projectName'] as string);
    downloadCsvMutation(formData as unknown as { project_name: string }).then((res) => {
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
    >
      <Button w="-webkit-fit-content" onClick={onDownloadCsv} isLoading={isLoading}>
        Download CSVs
      </Button>
    </Box>
  );
};
