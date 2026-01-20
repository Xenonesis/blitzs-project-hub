<<<<<<< HEAD
import api from '../lib/api';

export interface ClientRequest {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  requirements: string[];
}

export const clientService = {
  async createClientRequest(requestData: ClientRequest) {
    try {
      const response = await api.post('/contact', requestData);
      return response.data;
    } catch (error) {
      console.error('Error creating client request:', error);
      return {
        success: false,
        message: 'Failed to submit request'
=======
<<<<<<< HEAD
import { supabase } from '../lib/supabase';
=======
import api from '../lib/api';
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10

export interface ClientRequestData {
  name: string;
  email: string;
  phone?: string;
<<<<<<< HEAD
  project_type: string;
  budget: string;
  timeline: string;
  description: string;
=======
  company?: string;
  projectType: string; // This will be mapped to project_type in the controller
  budget: string;
  timeline: string;
  description: string;
  requirements?: string[];
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
}

export const clientService = {
  async createClientRequest(data: ClientRequestData) {
<<<<<<< HEAD
    try {
      const { data: request, error } = await supabase
        .from('client_requests')
        .insert(data)
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
        message: 'Client request created successfully',
        data: request
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create client request'
      };
    }
=======
    const response = await api.post('/clients', data);
    return response.data;
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
  },

  async getUserClientRequests(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
<<<<<<< HEAD
    try {
      let query = supabase
        .from('client_requests')
        .select('*', { count: 'exact' });

      if (params?.status) {
        query = query.eq('status', params.status);
      }

      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to).order('created_at', { ascending: false });

      const { data: requests, error, count } = await query;

      if (error) {
        throw error;
      }

      const totalPages = Math.ceil((count || 0) / limit);

      return {
        success: true,
        data: {
          requests: requests || [],
          pagination: {
            currentPage: page,
            totalPages,
            totalRequests: count || 0,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          requests: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalRequests: 0,
            hasNext: false,
            hasPrev: false
          }
        }
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      };
    }
  },

<<<<<<< HEAD
  async getClientRequests() {
    try {
      const response = await api.get('/contact/requests');
      return response.data;
    } catch (error) {
      console.error('Error fetching client requests:', error);
      return {
        success: false,
        message: 'Failed to fetch requests'
      };
    }
=======
  async getClientRequestById(id: string) {
    try {
      const { data: request, error } = await supabase
        .from('client_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return {
          success: false,
          message: error.message,
          data: null
        };
      }

      return {
        success: true,
        message: 'Client request fetched successfully',
        data: request
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch client request',
        data: null
      };
    }
=======
    const response = await api.get('/clients/user', { params });
    return response.data;
  },

  async getClientRequestById(id: string) {
    const response = await api.get(`/clients/${id}`);
    return response.data;
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
  }
};
