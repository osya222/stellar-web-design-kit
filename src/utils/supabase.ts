
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock storage service if Supabase is not configured
const createMockStorage = () => {
  console.warn(
    'Supabase environment variables are missing. Using localStorage fallback for image storage. ' +
    'For production, please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.'
  );

  // Local storage key for images
  const STORAGE_KEY = 'product_images';

  // Get stored images from localStorage
  const getStoredImages = (): Record<string, string> => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return {};
    }
  };

  // Save images to localStorage
  const saveStoredImages = (images: Record<string, string>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return {
    upload: async (file: File, path: string) => {
      return new Promise<{ path: string }>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const base64Data = event.target?.result as string;
            const images = getStoredImages();
            images[path] = base64Data;
            saveStoredImages(images);
            resolve({ path });
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    },

    getPublicUrl: (path: string) => {
      const images = getStoredImages();
      return images[path] || '';
    },

    delete: async (path: string) => {
      const images = getStoredImages();
      delete images[path];
      saveStoredImages(images);
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
