/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateCabin } from '../../hooks/react-query/cabins/useCreateCabin';
import { useEditCabin } from '../../hooks/react-query/cabins/useEditCabin';
import { ICabin } from '../../types/cabin';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';

type IFormInputs = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

type ICreateCabinProps = {
  cabinToEdit?: ICabin;
};

function CreateCabinForm({
  cabinToEdit = {
    name: '',
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    description: '',
  },
}: ICreateCabinProps) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, getValues, reset, formState } =
    useForm<IFormInputs>({
      defaultValues: isEditSession ? editValues : {},
    });

  const { errors } = formState;

  const { createCabin, isCabinCreating } = useCreateCabin();

  const { editCabin, isCabinEditing } = useEditCabin();

  const isWorking = isCabinCreating || isCabinEditing;

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          // onSuccess: (data) => reset(), // We can also get the newly created data here
          onSuccess: () => reset(),
        }
      );

    if (!isEditSession)
      createCabin(
        { ...data, image },
        {
          // onSuccess: (data) => reset(), // We can also get the newly created data here
          onSuccess: () => reset(),
        }
      );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" errorMsg={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" errorMsg={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'maxCapacity should be atleast one',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" errorMsg={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be atleast one',
            },
          })}
        />
      </FormRow>

      <FormRow label="discount" errorMsg={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should not be greater than regular price',
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow label="Description" errorMsg={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? 'Edit Cabin' : 'Create new cabin'}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
