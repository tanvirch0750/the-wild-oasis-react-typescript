import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCabinDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabins successfully deleted');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) =>
      toast.error(err instanceof Error ? err?.message : 'Somethng went wrong'),
  });

  return { isCabinDeleting, deleteCabin };
}
