/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateSetting as updateSettingApi } from '../../../services/apiSettings';
import { ISetting } from '../../../types/setting';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isSettingUpdating } = useMutation({
    mutationFn: ({ newSettingData }: { newSettingData: Partial<ISetting> }) =>
      updateSettingApi(newSettingData),
    onSuccess: () => {
      toast.success('Setting successfully updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },

    onError: () => toast.error('Setting could not be updated'),
  });

  return { updateSetting, isSettingUpdating };
}
