import { useUpdateSetting } from '../../hooks/react-query/settings/useEditSetting';
import { useGetSetting } from '../../hooks/react-query/settings/useGetSetting';
import { ISetting } from '../../types/setting';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const { isLoading, settings } = useGetSetting();

  const {
    minimumBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = (settings as ISetting) || {};

  const { isSettingUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e: React.FocusEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;

    if (!value) return;

    const newSettingData: Partial<ISetting> = {
      [field]: value,
    };

    updateSetting({ newSettingData });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minimumBookingLength}
          disabled={isSettingUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'minimumBookingLength')
          }
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isSettingUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'maxBookingLength')
          }
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isSettingUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'maxGuestsPerBooking')
          }
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isSettingUpdating}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, 'breakfastPrice')
          }
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
