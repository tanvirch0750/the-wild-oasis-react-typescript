/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';
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

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, getValues, reset, formState } =
    useForm<IFormInputs>();

  const { errors } = formState;

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },

    onError: () => toast.error('Cabins could not be added'),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    mutate({ ...data, image: data.image[0] });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" errorMsg={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" errorMsg={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isCreating}>Add Cabin</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
