import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProjectStatus } from '@dhadda-migration/data-access';
import { useQuery } from '@tanstack/react-query';

import { Box, Loader } from '@myra-ui';

import { MigrateExcel } from './MigrateExcel';
import UploadCsv from './UploadCsv';
import { ValidateExcel } from './ValidateExcel';

export const ProjectDetails = () => {
  const router = useRouter();
  const [errorData, setErrorData] = useState([]);

  const clearErrorData = () => {
    setErrorData([]);
  };

  const errorDataSet = (value: []) => {
    setErrorData(value);
  };

  const { data, refetch, isLoading } = useQuery(['project-status'], () =>
    getProjectStatus({ project_name: router?.query?.['projectName'] as string })
  );
  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return (
      <Box>
        <Loader />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDir="column" gap={5}>
      <UploadCsv clearErrorData={clearErrorData} />
      <ValidateExcel
        inputStatus={data?.data?.data?.input_file_status || false}
        errorData={errorData}
        setErrorData={errorDataSet}
      />
      <MigrateExcel validationStatus={data?.data?.data?.validation_status || false} />
    </Box>
  );
};

export default ProjectDetails;
