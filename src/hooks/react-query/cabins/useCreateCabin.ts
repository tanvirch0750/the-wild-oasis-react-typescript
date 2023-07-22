import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createEditCabin } from '../../../services/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCabinCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },

    onError: () => toast.error('Cabins could not be added'),
  });

  return { createCabin, isCabinCreating };
}
