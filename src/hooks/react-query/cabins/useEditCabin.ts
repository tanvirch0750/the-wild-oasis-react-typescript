/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createEditCabin } from '../../../services/apiCabins';
import { ICabin } from '../../../types/cabin';

export type IEditCabinData = {
  newCabinData: ICabin;
  id: number | string | undefined;
};

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isCabinEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: IEditCabinData) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully updated');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },

    onError: () => toast.error('Cabins could not be updated'),
  });

  return { editCabin, isCabinEditing };
}
