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
