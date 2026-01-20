<<<<<<< HEAD
import { createClient } from '@supabase/supabase-js';

// Direct Supabase client with correct API key
const supabase = createClient(
  'https://afgromdzethkscaskofz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZ3JvbWR6ZXRoZ3Nrc2Fza29meiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzA4NzI4NzAwLCJleHAiOjIwMjQzMDQ3MDB9.3Qk4mYVjZkT2Q8Y3n4X7wP6qL8vR9zX1K2mN8o3dF4'
);
=======
<<<<<<< HEAD
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
=======
import api from '../lib/api';
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd

export interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
<<<<<<< HEAD
  category: string;
  price: number;
=======
  price: number;
  category: string;
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
  techStack: string[];
  features: string[];
  images: string[];
  demoLink: string;
  githubLink?: string;
  difficulty: string;
  isFree: boolean;
  isPublished: boolean;
<<<<<<< HEAD
=======
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
  downloads: number;
  purchases: number;
  rating: number;
  tags: string[];
<<<<<<< HEAD
  createdAt: string;
  updatedAt: string;
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
=======
<<<<<<< HEAD
  added_by?: {
    id: string;
    full_name: string;
  };
  created_at: string;
  updated_at: string;
=======
  addedBy: {
    _id: string;
    fullName: string;
  };
  createdAt: string;
  updatedAt: string;
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
}

export interface ProjectsResponse {
  success: boolean;
  data: {
    projects: Project[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalProjects: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export const projectService = {
  async getAllProjects(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    isFree?: boolean;
  }): Promise<ProjectsResponse> {
<<<<<<< HEAD
    try {
      let query = supabase
        .from('projects')
        .select('*', { count: 'exact' })
        .eq('is_published', true);

      // Apply filters
      if (params?.category && params.category !== 'all') {
        query = query.eq('category', params.category);
      }

      if (params?.isFree !== undefined) {
        query = query.eq('is_free', params.isFree);
      }

      if (params?.search) {
        query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%`);
      }

      // Apply sorting
      const sortBy = params?.sortBy || 'created_at';
      const sortOrder = params?.sortOrder || 'desc';
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      // Apply pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to);

<<<<<<< HEAD
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
=======
      const { data: projects, error, count } = await query;

      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }

      const totalPages = Math.ceil((count || 0) / limit);

      return {
        success: true,
        data: {
          projects: projects || [],
          pagination: {
            currentPage: page,
            totalPages,
            totalProjects: count || 0,
            hasNext: page < totalPages,
            hasPrev: page > 1
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
          }
        }
      };
    } catch (error) {
<<<<<<< HEAD
      console.error('Error fetching projects:', error);
      return {
        success: false,
        message: 'Failed to fetch projects'
=======
      console.error('Get all projects error:', error);
      return {
        success: false,
        data: {
          projects: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalProjects: 0,
            hasNext: false,
            hasPrev: false
          }
        }
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      };
    }
  },

<<<<<<< HEAD
  async getProjectById(projectId: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('_id', projectId)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        return {
          success: false,
          message: 'Project not found'
=======
  async getProjectById(id: string) {
    try {
      const { data: project, error } = await supabase
        .from('projects')
        .select(`
          *,
          added_by:profiles(id, full_name)
        `)
        .eq('id', id)
        .single();

      if (error) {
        return {
          success: false,
          message: error.message,
          data: null
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
        };
      }

      return {
        success: true,
<<<<<<< HEAD
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

  async getProjectBySlug(slug: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching project by slug:', error);
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
      console.error('Error fetching project by slug:', error);
      return {
        success: false,
        message: 'Failed to fetch project'
=======
        message: 'Project fetched successfully',
        data: project
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch project',
        data: null
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      };
    }
  },

  async purchaseProject(projectId: string) {
    try {
<<<<<<< HEAD
      // First get the project
      const { data: project, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('_id', projectId)
        .single();

      if (fetchError) {
        console.error('Error fetching project:', fetchError);
=======
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated'
        };
      }

      // Get project details
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('price, is_free')
        .eq('id', projectId)
        .single();

      if (projectError || !project) {
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
        return {
          success: false,
          message: 'Project not found'
        };
      }

<<<<<<< HEAD
      // Update purchases count
      const { error: updateError } = await supabase
        .from('projects')
        .update({ purchases: (project?.purchases || 0) + 1 })
        .eq('_id', projectId);

      if (updateError) {
        console.error('Error purchasing project:', updateError);
        return {
          success: false,
          message: 'Failed to purchase project'
=======
      if (project.is_free) {
        return {
          success: false,
          message: 'This project is free'
        };
      }

      // Create order
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          project_id: projectId,
          amount: project.price,
          status: 'pending'
        });

      if (orderError) {
        return {
          success: false,
          message: orderError.message
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
        };
      }

      return {
        success: true,
<<<<<<< HEAD
        message: 'Project purchased successfully!',
        data: {
          isFree: project?.isFree ?? false
        }
      };
    } catch (error) {
      console.error('Error purchasing project:', error);
=======
        message: 'Order created successfully'
      };
    } catch (error) {
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      return {
        success: false,
        message: 'Failed to purchase project'
      };
    }
  },

<<<<<<< HEAD
  async createProject(projectData: Partial<Project>) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...projectData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        return {
          success: false,
          message: 'Failed to create project'
=======
  async downloadProject(projectId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated'
        };
      }

      // Check if user has purchased the project or if it's free
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('is_free')
        .eq('id', projectId)
        .single();

      if (projectError || !project) {
        return {
          success: false,
          message: 'Project not found'
        };
      }

      if (!project.is_free) {
        // Check if user has purchased
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .select('status')
          .eq('user_id', user.id)
          .eq('project_id', projectId)
          .eq('status', 'completed')
          .single();

        if (orderError || !order) {
          return {
            success: false,
            message: 'You need to purchase this project first'
          };
        }
      }

      // Increment download count
      const { data: currentProject } = await supabase
        .from('projects')
        .select('downloads')
        .eq('id', projectId)
        .single();

      if (currentProject) {
        await supabase
          .from('projects')
          .update({ downloads: (currentProject.downloads || 0) + 1 })
          .eq('id', projectId);
      }

      return {
        success: true,
        message: 'Download started'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to download project'
      };
    }
  },

  async addReview(projectId: string, data: { rating: number; comment: string }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated'
        };
      }

      const { error } = await supabase
        .from('project_reviews')
        .upsert({
          project_id: projectId,
          user_id: user.id,
          rating: data.rating,
          comment: data.comment
        });

      if (error) {
        return {
          success: false,
          message: error.message
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
        };
      }

      return {
        success: true,
<<<<<<< HEAD
        data
      };
    } catch (error) {
      console.error('Error creating project:', error);
=======
        message: 'Review added successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add review'
      };
    }
=======
    const response = await api.get('/projects', { params });
    return response.data;
  },

  async getProjectById(id: string) {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  async purchaseProject(projectId: string) {
    const response = await api.post(`/projects/${projectId}/purchase`);
    return response.data;
  },

  async downloadProject(projectId: string) {
    const response = await api.post(`/projects/${projectId}/download`);
    return response.data;
  },

  async addReview(projectId: string, data: { rating: number; comment: string }) {
    const response = await api.post(`/projects/${projectId}/review`, data);
    return response.data;
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
  },

  // Admin only
  async createProject(data: Partial<Project>) {
<<<<<<< HEAD
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated'
        };
      }

      const { data: project, error } = await supabase
        .from('projects')
        .insert({
          ...data,
          added_by: user.id
        })
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Project created successfully',
        data: project
      };
    } catch (error) {
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      return {
        success: false,
        message: 'Failed to create project'
      };
    }
  },

<<<<<<< HEAD
  async updateProject(projectId: string, projectData: Partial<Project>) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...projectData,
          updatedAt: new Date().toISOString()
        })
        .eq('_id', projectId)
=======
  async updateProject(id: string, data: Partial<Project>) {
    try {
      const { data: project, error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id)
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
        .select()
        .single();

      if (error) {
<<<<<<< HEAD
        console.error('Error updating project:', error);
        return {
          success: false,
          message: 'Failed to update project'
=======
        return {
          success: false,
          message: error.message
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
        };
      }

      return {
        success: true,
<<<<<<< HEAD
        data
      };
    } catch (error) {
      console.error('Error updating project:', error);
=======
        message: 'Project updated successfully',
        data: project
      };
    } catch (error) {
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      return {
        success: false,
        message: 'Failed to update project'
      };
    }
  },

<<<<<<< HEAD
  async deleteProject(projectId: string) {
=======
  async deleteProject(id: string) {
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
<<<<<<< HEAD
        .eq('_id', projectId);

      if (error) {
        console.error('Error deleting project:', error);
        return {
          success: false,
          message: 'Failed to delete project'
=======
        .eq('id', id);

      if (error) {
        return {
          success: false,
          message: error.message
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
        };
      }

      return {
        success: true,
        message: 'Project deleted successfully'
      };
    } catch (error) {
<<<<<<< HEAD
      console.error('Error deleting project:', error);
=======
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      return {
        success: false,
        message: 'Failed to delete project'
      };
    }
<<<<<<< HEAD
  },

  async getFeaturedProjects(limit: number = 6) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('isPublished', true)
        .eq('isFeatured', true)
        .order('createdAt', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching featured projects:', error);
        return {
          success: false,
          message: 'Failed to fetch featured projects'
        };
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return {
        success: false,
        message: 'Failed to fetch featured projects'
      };
    }
  },

  async getProjectsByCategory(category: string, limit?: number) {
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('category', category)
        .eq('isPublished', true)
        .order('createdAt', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching projects by category:', error);
        return {
          success: false,
          message: 'Failed to fetch projects by category'
        };
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      return {
        success: false,
        message: 'Failed to fetch projects by category'
      };
    }
  },

  async searchProjects(query: string, limit?: number) {
    try {
      let searchQuery = supabase
        .from('projects')
        .select('*')
        .eq('isPublished', true)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order('createdAt', { ascending: false });

      if (limit) {
        searchQuery = searchQuery.limit(limit);
      }

      const { data, error } = await searchQuery;

      if (error) {
        console.error('Error searching projects:', error);
        return {
          success: false,
          message: 'Failed to search projects'
        };
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error searching projects:', error);
      return {
        success: false,
        message: 'Failed to search projects'
      };
    }
=======
=======
    const response = await api.post('/projects', data);
    return response.data;
  },

  async updateProject(id: string, data: Partial<Project>) {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  async deleteProject(id: string) {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
  }
};
