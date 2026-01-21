import { supabase } from '../lib/supabase';

export const adminService = {
  getAllDevelopers: async () => {
    console.log('Fetching developers from Supabase...');
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .eq('is_active', true);

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Error fetching developers:', error);
        throw error;
      }

      console.log('Developers found:', data?.length || 0);
      return {
        success: true,
        data: {
          developers: data || []
        }
      };
    } catch (error) {
      console.error('Error fetching developers:', error);
      throw error;
    }
  }
};
