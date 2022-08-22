import { IoIosInformationCircle } from 'react-icons/io';
import { IoCheckmarkCircleSharp, IoWarning } from 'react-icons/io5';
import { MdError } from 'react-icons/md';

export const TOAST_ICONS = {
  success: IoCheckmarkCircleSharp,
  error: MdError,
  warning: IoWarning,
  info: IoIosInformationCircle,
};

export const TOAST_COLORS = {
  error: 'danger.500',
  info: 'info.900',
  warning: 'warning.500',
  success: 'success.500',
};
