import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getProjectStatus } from '@dhadda-migration/data-access';
import { useQuery } from '@tanstack/react-query';

import { Box } from '@myra-ui';

import { MigrateExcel } from './MigrateExcel';
import UploadCsv from './UploadCsv';
import { ValidateExcel } from './ValidateExcel';

export const ProjectDetails = () => {
  const router = useRouter();

  const { data, refetch } = useQuery(['project-status'], () =>
    getProjectStatus({ project_name: router?.query?.['projectName'] as string })
  );
  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box display="flex" flexDir="column" gap={5}>
      <UploadCsv />
      <ValidateExcel inputStatus={data?.data?.data?.input_file_status} />
      <MigrateExcel validationStatus={data?.data?.data?.validation_status} />
    </Box>
  );
};

export default ProjectDetails;
