/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ISetting } from '../types/setting';
import supabase from './supabase';

export async function getSettings() {
  const { data, error } = await supabase
    .from('oasis_settings')
    .select('*')
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
  return data as ISetting;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: Partial<ISetting>) {
  const { data, error } = await supabase
    .from('oasis_settings')
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }
  return data;
}
