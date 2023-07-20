import { ICabin } from '../types/cabin';
import supabase from './supabase';

export async function getCabins(): Promise<ICabin[]> {
  const { data, error } = await supabase.from('oasis_cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data as ICabin[];
}

export async function createCabin(newCabin: ICabin) {
  const { data, error } = await supabase
    .from('oasis_cabins')
    .insert([newCabin])
    .select();

  if (error) {
    throw new Error('Cabins could not be added');
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
