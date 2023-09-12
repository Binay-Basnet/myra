import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Collapse, Column, Table, Text } from '@myra-ui';

import { useGetEmployeeExitDetailsQuery } from '@coop/cbs/data-access';
import { DetailsKeyValueCard } from '@coop/shared/components';

export const Exit = () => {
  const router = useRouter();
  const [futureIntentionCollapse, setFutureIntentionCollapse] = useState(false);
  const [overallExperienceCollapse, setOverallExperienceCollapse] = useState(false);
  const [suggestionCollapse, setSuggestionCollapse] = useState(false);
  const [otherCollapse, setOtherCollapse] = useState(false);

  const { data } = useGetEmployeeExitDetailsQuery({
    employeeId: router?.query?.['id'] as string,
  });

  const employeeExitData =
    data?.hr?.employeelifecycle?.employeeExit?.getEmployeeExitDetailsFromEmployeeId?.data;

  const rowData = useMemo(() => employeeExitData?.checklists ?? [], [employeeExitData]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'S.N',
        accessorFn: (_, index) => index + 1,
        meta: {
          width: '5%',
        },
      },
      {
        header: 'Activity Name',
        accessorFn: (row) => row?.activityName,
      },
      {
        header: 'User Name',
        accessorFn: (row) => row?.user,
      },
      {
        header: 'Role',
        accessorFn: (row) => row?.role,
      },
      {
        header: 'Begins on',
        accessorFn: (row) => row?.beginsOn?.local,
      },
      {
        header: 'Duration',
        accessorFn: (row) => row?.duration,
      },
    ],
    []
  );

  return (
    <>
      <DetailsKeyValueCard
        title="Separation Details"
        keyValueList={[
          { label: 'Separation ID', value: employeeExitData?.separationId },
          { label: 'Exit Status', value: employeeExitData?.exitStatus },
          { label: 'Exit Date', value: employeeExitData?.exitDate?.local },
        ]}
      />
      <Box
        display="flex"
        flexDir="column"
        gap="s16"
        mx="s24"
        p="s16"
        bg="white"
        borderRadius={4}
        boxShadow="xs"
      >
        <Text fontSize="r1" fontWeight="medium" color="gray.600" mb="s24">
          Questionnaire
        </Text>

        <Box border="1px" borderColor="border.layout" borderRadius={5} padding="s12">
          <Text
            fontSize="r1"
            fontWeight="medium"
            color="gray.800"
            cursor="pointer"
            onClick={() => setFutureIntentionCollapse(!futureIntentionCollapse)}
          >
            Future Intentions:
          </Text>
          <Collapse in={futureIntentionCollapse}>
            <Text fontSize="s3" fontWeight="medium" color="gray.700" mt="s20">
              Do you see yourself working for this organization again in the future?
            </Text>
            <Text fontSize="r1" fontWeight="semibold" color="gray.700">
              {employeeExitData?.futureIntentions}
            </Text>
          </Collapse>
        </Box>
        <Box border="1px" borderColor="border.layout" borderRadius={5} padding="s12">
          <Text
            fontSize="r1"
            fontWeight="medium"
            color="gray.800"
            cursor="pointer"
            onClick={() => setOverallExperienceCollapse(!overallExperienceCollapse)}
          >
            Overall Experience
          </Text>
          <Collapse in={overallExperienceCollapse}>
            <Text fontSize="s3" fontWeight="medium" color="gray.700" mt="s20">
              What do you like the most of the organization?
            </Text>
            <Text fontSize="r1" fontWeight="semibold" color="gray.700">
              {employeeExitData?.overallExp}
            </Text>
          </Collapse>
        </Box>
        <Box border="1px" borderColor="border.layout" borderRadius={5} padding="s12">
          <Text
            fontSize="r1"
            fontWeight="medium"
            color="gray.800"
            cursor="pointer"
            onClick={() => setSuggestionCollapse(!suggestionCollapse)}
          >
            Suggestion for Improvement
          </Text>
          <Collapse in={suggestionCollapse}>
            <Text fontSize="s3" fontWeight="medium" color="gray.700" mt="s20">
              Do you have any suggestions for how hte company or management oculd do to improve
              staff welfare?
            </Text>
            <Text fontSize="r1" fontWeight="semibold" color="gray.700">
              {employeeExitData?.suggestions}
            </Text>
          </Collapse>
        </Box>
        <Box border="1px" borderColor="border.layout" borderRadius={5} padding="s12">
          <Text
            fontSize="r1"
            fontWeight="medium"
            color="gray.800"
            cursor="pointer"
            onClick={() => setOtherCollapse(!otherCollapse)}
          >
            Other
          </Text>
          <Collapse in={otherCollapse}>
            <Text fontSize="s3" fontWeight="medium" color="gray.700" mt="s20">
              Anything you wish to share with us.
            </Text>
            <Text fontSize="r1" fontWeight="semibold" color="gray.700">
              {employeeExitData?.others}
            </Text>
          </Collapse>
        </Box>
      </Box>
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Checklist of Exit
        </Text>
        <Table data={rowData} columns={columns} variant="report" size="report" isStatic />
      </Box>
    </>
  );
};

export default Exit;
