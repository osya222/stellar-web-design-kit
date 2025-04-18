
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock storage service if Supabase is not configured
const createMockStorage = () => {
  console.warn(
    'Using local file storage for images. ' +
    'Images will be stored in public/images/products directory.'
  );

  return {
    upload: async (file: File, path: string) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', path);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        
        const data = await response.json();
        return { path: data.path };
      } catch (error) {
        console.error('Upload error:', error);
        throw error;
      }
    },

    getPublicUrl: (path: string) => {
      // Return the direct path to the image in the public directory
      return `/images/products/${path.split('/').pop()}`;
    },

    delete: async (path: string) => {
      try {
        const response = await fetch(`/api/upload?path=${encodeURIComponent(path)}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Delete failed');
        }
      } catch (error) {
        console.error('Delete error:', error);
        throw error;
      }
    }
  };
};

// Export Supabase client if environment variables are available, otherwise use mock storage
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export const storage = supabaseUrl && supabaseKey
  ? {
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
  }
  : createMockStorage();
