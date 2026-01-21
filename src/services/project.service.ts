import { supabase } from '../lib/supabase';

export interface Project {
  id: string;
  title: string;
  description: string;
  short_description: string;
  price: number;
  category: string;
  tech_stack: string[];
  features: string[];
  images: string[];
  demo_link: string;
  github_link?: string;
  difficulty: string;
  is_free: boolean;
  is_published: boolean;
  downloads: number;
  purchases: number;
  rating: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export const projectService = {
  async getAllProjects(options?: any) {
    console.log('Fetching projects from Supabase...', options);
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('is_published', true);

      // Apply filters
      if (options?.category && options.category !== 'all') {
        query = query.eq('category', options.category);
      }
      if (options?.search) {
        query = query.ilike('title', `%${options.search}%`);
      }
      if (options?.isFree !== undefined) {
        query = query.eq('is_free', options.isFree === 'true');
      }

      // Apply sorting
      if (options?.sortBy) {
        switch (options.sortBy) {
          case 'price':
            query = query.order('price', { ascending: true });
            break;
          case '-price':
            query = query.order('price', { ascending: false });
            break;
          case 'purchases':
            query = query.order('purchases', { ascending: false });
            break;
          case 'rating':
            query = query.order('rating', { ascending: false });
            break;
          default:
            query = query.order('created_at', { ascending: false });
        }
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Apply pagination
      const page = options?.page || 1;
      const limit = options?.limit || 12;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to);

      const { data, error, count } = await query;

      console.log('Supabase projects response:', { data, error, count });

      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }

      console.log('Projects found:', data?.length || 0);
      return {
        success: true,
        data: {
          projects: data || [],
          pagination: {
            currentPage: page,
            totalPages: Math.ceil((count || 0) / limit),
            totalProjects: count || 0
          }
        }
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return {
        success: false,
        message: 'Failed to fetch projects'
      };
    }
  },

  async getProjectById(projectId: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        return {
          success: false,
          message: 'Project not found'
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error fetching project:', error);
      return {
        success: false,
        message: 'Failed to fetch project'
      };
    }
  },

  async purchaseProject(projectId: string) {
    try {
      // First get the project
      const { data: project, error: fetchError } = await supabase
        .from('projects')
        .select('is_free, purchases')
        .eq('id', projectId)
        .single();

      if (fetchError) {
        console.error('Error fetching project:', fetchError);
        return {
          success: false,
          message: 'Project not found'
        };
      }

      // Update purchases count
      const { error: updateError } = await supabase
        .from('projects')
        .update({
          purchases: (project?.purchases || 0) + 1
        })
        .eq('id', projectId);

      if (updateError) {
        console.error('Error updating purchases:', updateError);
        return {
          success: false,
          message: 'Failed to purchase project'
        };
      }

      return {
        success: true,
        message: 'Project purchased successfully!',
        data: {
          isFree: project?.is_free ?? false
        }
      };
    } catch (error) {
      console.error('Error purchasing project:', error);
      return {
        success: false,
        message: 'Failed to purchase project'
      };
    }
  }
};
