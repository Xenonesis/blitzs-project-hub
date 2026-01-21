import { supabase } from '../lib/supabase';

export interface Order {
  id: string;
  user_id: string;
  project_id: string;
  user?: {
    id: string;
    full_name: string;
    email: string;
  };
  project?: {
    id: string;
    title: string;
    price: number;
  };
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export const orderService = {
  async createOrder(projectId: string, userId: string) {
    try {
      // First get the project details
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('title, price, is_free')
        .eq('id', projectId)
        .single();

      if (projectError) {
        console.error('Error fetching project:', projectError);
        throw projectError;
      }

      // Create the order
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          user_id: userId,
          project_id: projectId,
          amount: project?.is_free ? 0 : project?.price || 0,
          status: 'completed',
          created_at: new Date().toISOString()
        }])
        .select(`
          *,
          user:profiles(id, full_name, email),
          project:projects(id, title, price)
        `)
        .single();

      if (error) {
        console.error('Error creating order:', error);
        throw error;
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        error: 'Failed to create order'
      };
    }
  },

  async getUserOrders(userId: string) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          project:projects(id, title, price, images, category)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user orders:', error);
        throw error;
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return {
        success: false,
        error: 'Failed to fetch orders'
      };
    }
  },

  async getAllOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          user:profiles(id, full_name, email),
          project:projects(id, title, price)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all orders:', error);
        throw error;
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error fetching all orders:', error);
      return {
        success: false,
        error: 'Failed to fetch orders'
      };
    }
  },

  async updateOrderStatus(orderId: string, status: Order['status']) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select(`
          *,
          user:profiles(id, full_name, email),
          project:projects(id, title, price)
        `)
        .single();

      if (error) {
        console.error('Error updating order status:', error);
        throw error;
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error updating order status:', error);
      return {
        success: false,
        error: 'Failed to update order status'
      };
    }
  }
};
