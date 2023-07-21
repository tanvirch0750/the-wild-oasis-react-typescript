/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ICabin } from '../types/cabin';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins(): Promise<ICabin[]> {
  const { data, error } = await supabase.from('oasis_cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data as ICabin[];
}

export async function createCabin(newCabin: ICabin | any) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
    /\//g,
    ''
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/oasis-cabin-images/${imageName}`;

  // https://vufwuomaggvbzodgaegz.supabase.co/storage/v1/object/public/oasis-cabin-images/cabin-001.jpg

  // 1. Create table
  const { data, error } = await supabase
    .from('oasis_cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    throw new Error('Cabins could not be added');
  }

  // 2. Update image
  const { error: storageError } = await supabase.storage
    .from('oasis-cabin-images')
    .upload(imageName, newCabin.image);

  // delete the cabin if image upload fail
  if (storageError) {
    const dataObj = data as unknown as ICabin;

    await supabase.from('oasis_cabins').delete().eq('id', dataObj.id);

    throw new Error('Cabins could not be updated and cabin was not created');
  }

  return data as ICabin[];
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase
    .from('oasis_cabins')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error('Cabins could not be deleted');
  }

  return data;
}
