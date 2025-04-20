
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a minimal storage service without upload functionality
const createMockStorage = () => {
  console.warn('Image upload functionality has been disabled.');

  return {
    upload: async () => {
      throw new Error('Upload functionality has been disabled');
    },

    getPublicUrl: (path: string) => {
      return `/images/${path.split('/').pop()}`;
    },

    delete: async () => {
      throw new Error('Delete functionality has been disabled');
    }
  };
};

// Export Supabase client if environment variables are available, otherwise use mock storage
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export const storage = createMockStorage();

