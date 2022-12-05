import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  Id_Type,
  MyraUserInput,
  Roles,
  setAddUserData,
  useAppDispatch,
  useGetNewIdMutation,
  UserGender,
  useSetSettingsUserDataMutation,
} from '@coop/cbs/data-access';
import {
  FormBranchSelect,
  FormDatePicker,
  FormEmailInput,
  FormInput,
  FormPhoneNumber,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import { asyncToast, Box, Modal, Grid } from '@myra-ui';

interface INewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchUserList: () => void;
}

const genderOptions = [
  { label: 'Male', value: UserGender.Male },
  { label: 'Female', value: UserGender.Female },
  { label: 'Other', value: UserGender.Other },
];

const roleOptions = [
  { label: 'Market Representative', value: Roles.Agent },
  { label: 'Service Center Manager', value: Roles.BranchManager },
  { label: 'Head Teller', value: Roles.HeadTeller },
  { label: 'Teller', value: Roles.Teller },
  { label: 'Super Admin', value: Roles.Superadmin },
];

export const NewUserModal = ({ isOpen, onClose, refetchUserList }: INewUserModalProps) => {
  const methods = useForm<MyraUserInput>();

  const { getValues, watch, reset } = methods;

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { mutateAsync: newIdMutate } = useGetNewIdMutation();

  const { mutateAsync: userMutateAsync } = useSetSettingsUserDataMutation();

  const handleSendInvitation = () => {
    // console.log({ values: getValues() });
    newIdMutate({ idType: Id_Type.Myrauser }).then((res) => {
      asyncToast({
        id: 'create-new-user-modal',
        msgs: {
          success: 'New User Created',
          loading: 'Creating New User',
        },
        onSuccess: () => {
          refetchUserList();
          handleModalClose();
        },
        promise: userMutateAsync({ id: res.newId, data: getValues() }),
      });
    });
  };

  const handleAddMoreDetails = () => {
    const formData = getValues();
    dispatch(
      setAddUserData({
        userData: { ...formData },
      })
    );

    newIdMutate({ idType: Id_Type.Myrauser }).then((res) => {
      router.push(`/settings/users/super-admin/add/${res.newId}`);
    });

    handleModalClose();
  };

  const role = watch('role');

  const handleModalClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      width="xl"
      title="Add User"
      linkButtonLabel="Add more details"
      linkButtonHandler={handleAddMoreDetails}
      primaryButtonLabel="Send Invitation"
      primaryButtonHandler={handleSendInvitation}
    >
      <FormProvider {...methods}>
        <form>
          <Box px="s12" py="s8" display="flex" flexDirection="column" gap="s24">
            <FormSwitch name="isCoreEmployee" label="This user is a core employee" />
            <FormInput type="text" name="name" label="Name" />
            <FormInput type="text" name="empCode" label="Employee Code" />
            <Grid templateColumns="repeat(2, 1fr)" rowGap="s24" columnGap="s20">
              <FormSelect name="gender" label="Gender" options={genderOptions} />

              {/* <FormInput type="date" name="dob" label="Date of Birth (BS)" /> */}

              <FormDatePicker name="dob" label="Date of Birth" />

              <FormPhoneNumber name="contactNo" label="Mobile No" />

              <FormEmailInput name="email" label="Email" />
            </Grid>

            <FormSelect name="role" label="Role" options={roleOptions} />

            <FormBranchSelect
              name="branch"
              label="Service Center"
              isDisabled={role === Roles.Superadmin}
            />
          </Box>
        </form>
      </FormProvider>
    </Modal>
  );
};
