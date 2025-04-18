
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const storage = {
  upload: async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(path, file);

    if (error) throw error;
    return data;
  },

  getPublicUrl: (path: string) => {
    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(path);
    
    return data.publicUrl;
  },

  delete: async (path: string) => {
    const { error } = await supabase.storage
      .from('product-images')
      .remove([path]);

    if (error) throw error;
  }
};

