import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Option {
  value?: string;
  label: string;
}

interface StyledSelectProps {
  types?: string;
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.types === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps {
  options: Option[];
  value?: string;
  types?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ options, value, types, onChange }: SelectProps) {
  return (
    <div>
      <StyledSelect value={value} types={types} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
}

export default Select;
