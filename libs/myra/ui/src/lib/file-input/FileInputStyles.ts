const baseStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed #91979F',
  borderRadius: '2px',
  color: '#343C46',
  backgroundColor: '##e2e8f0',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  fontSize: '1.2rem',
};

const focusedStyle = {
  borderColor: '2px dashed #006837',
  bg: '#F5F9F7',
  color: '#006837',
};

const acceptStyle = {
  borderColor: '2px dashed #006837',
  bg: '#F5F9F7',
  color: '#006837',
};

const rejectStyle = {
  borderColor: '2px dashed #FF4538',
  bg: '#FFECEB',
};

export const dropdownStyles = {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
};
