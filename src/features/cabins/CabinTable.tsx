import { useSearchParams } from 'react-router-dom';
import { useGetCabins } from '../../hooks/react-query/cabins/useGetCabins';
import { ICabin } from '../../types/cabin';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';

function CabinTable() {
  const { cabins, isLoading } = useGetCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get('discount') || 'all';

  let filterCabins;

  if (filterValue === 'all') filterCabins = cabins;
  if (filterValue === 'no-discount')
    filterCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filterCabins = cabins?.filter((cabin) => cabin.discount > 0);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filterCabins as ICabin[]}
          render={(cabin: ICabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
