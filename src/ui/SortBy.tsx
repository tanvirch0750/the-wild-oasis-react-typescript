import { useSearchParams } from 'react-router-dom';
import Select from './Select';

interface ISortType {
  options: { value: string; label: string }[];
}

function SortBy({ options }: ISortType) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || '';

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      types="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
