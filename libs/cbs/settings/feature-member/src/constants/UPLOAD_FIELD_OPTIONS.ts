import { Kym_Option_Field_Type as Field_Types } from '@coop/shared/data-access';

export const UPLOAD_FIELD_OPTIONS = [
  {
    label: 'Single',
    value: Field_Types.SingleFile,
  },
  {
    label: 'Multiple',
    value: Field_Types.MultipleFile,
  },
];
