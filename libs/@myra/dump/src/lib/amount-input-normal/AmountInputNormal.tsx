import { forwardRef } from 'react';
import { Input, InputGroup, InputProps } from '@chakra-ui/react';

import { TextFields } from '../text-fields/TextFields';

/* eslint-disable-next-line */
export interface AmountInputNormalProps extends InputProps {
  labelColor?: string;
  label?: string;
}

export const AmountInputNormal = forwardRef<HTMLInputElement, AmountInputNormalProps>(
  (props, ref) => {
    const { labelColor, label, ...rest } = props;
    // const [isDebit, setIsDebit] = useState(true);
    // const handleClick = () => setIsDebit(!isDebit);

    return (
      <>
        <TextFields variant="formLabel" color={labelColor ?? 'gray.700'}>
          {' '}
          {label ?? 'Quantity'}
        </TextFields>
        <InputGroup h="44px">
          <Input variant="outline" type="number" fontSize="s2" ref={ref} {...rest} />
        </InputGroup>
      </>
    );
  }
);

export default AmountInputNormal;
