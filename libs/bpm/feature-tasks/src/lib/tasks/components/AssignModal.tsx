import { useForm } from 'react-hook-form';
import {
  useGetDepartmentOptions,
  useGetEployeeLevelOptions,
  useGetEployeeOptions,
} from '@hr/common';
import { omit } from 'lodash';

import { asyncToast, Grid, GridItem, Modal } from '@myra-ui';

import { AssignedTo, AssignTask, useAssignTaskMutation } from '@coop/cbs/data-access';
import { FormLayout, FormSelect, FormSwitchTab } from '@coop/shared/form';

interface Props {
  selectedTaskId: string;
  handleClearTaskId: () => void;
  isAssignModalOpen: boolean;
  handleCloseAssignModal: () => void;
  refetch: () => void;
}

const defaultFormValues = {
  assignedTo: AssignedTo?.Person,
  name: '',
  department: '',
  minimumLevelOfAuthority: '',
};

const AssignModal = (props: Props) => {
  const { selectedTaskId, handleClearTaskId, isAssignModalOpen, handleCloseAssignModal, refetch } =
    props;

  const { mutateAsync } = useAssignTaskMutation();

  const { employeeOptions } = useGetEployeeOptions();
  const { departmentOptions } = useGetDepartmentOptions();
  const { employeeLevelOptions } = useGetEployeeLevelOptions();

  const methods = useForm<AssignTask>({
    defaultValues: defaultFormValues,
  });

  const { watch, getValues, reset } = methods;
  const assignedToWatch = watch('assignedTo');

  const handleModalClose = () => {
    handleClearTaskId();
    handleCloseAssignModal();
    reset(defaultFormValues);
  };

  const saveChangesHandler = () => {
    const values = getValues();
    asyncToast({
      id: 'assign-task',
      msgs: {
        success: 'task assigned succesfully',
        loading: 'assigning task',
      },
      onSuccess: () => {
        refetch();
        handleModalClose();
      },
      promise: mutateAsync({
        id: selectedTaskId,
        input:
          assignedToWatch === 'PERSON'
            ? omit({ ...values }, ['department', 'minimumLevelOfAuthority'])
            : omit({ ...values }, ['name']),
      }),
    });
  };

  const discardHandler = () => {
    handleModalClose();
  };

  return (
    <Modal
      open={isAssignModalOpen}
      onClose={handleModalClose}
      isCentered
      title="Assign Task"
      width="xl"
      primaryButtonLabel="SaveChanges"
      secondaryButtonLabel="Discard"
      primaryButtonHandler={saveChangesHandler}
      secondaryButtonHandler={discardHandler}
    >
      <FormLayout methods={methods}>
        <Grid templateColumns="repeat(4, 1fr)" gap="s16">
          <GridItem colSpan={4}>
            <FormSwitchTab
              name="assignedTo"
              label="Assigned To"
              options={[
                { label: 'Person', value: AssignedTo?.Person },
                { label: 'Department', value: AssignedTo?.Department },
              ]}
            />
          </GridItem>
          {assignedToWatch === AssignedTo?.Person ? (
            <GridItem colSpan={2}>
              <FormSelect name="name" label="Name" options={employeeOptions} menuPosition="fixed" />
            </GridItem>
          ) : (
            <>
              <GridItem colSpan={2}>
                <FormSelect
                  name="department"
                  label="Department"
                  options={departmentOptions}
                  menuPosition="fixed"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormSelect
                  name="minimumLevelOfAuthority"
                  label="Minimum Level of Authority"
                  options={employeeLevelOptions}
                  menuPosition="fixed"
                />
              </GridItem>
            </>
          )}
        </Grid>
      </FormLayout>
    </Modal>
  );
};

export default AssignModal;
