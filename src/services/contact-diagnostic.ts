import { supabase } from '../lib/supabase';

export const diagnoseContactSystem = async () => {
  console.log('🔍 Diagnosing contact form system...');
  
  // Test 1: Check Supabase connection
  try {
    const { data, error } = await supabase.from('projects').select('id').limit(1);
    if (error) {
      console.log('❌ Supabase connection failed:', error.message);
      console.log('📝 Using fallback localStorage storage');
      return { success: false, usingFallback: true };
    } else {
      console.log('✅ Supabase connection successful');
    }
  } catch (err) {
    console.log('❌ Supabase connection error:', err);
    console.log('📝 Using fallback localStorage storage');
    return { success: false, usingFallback: true };
  }

  // Test 2: Check if client_requests table exists
  try {
    const { data, error } = await supabase.from('client_requests').select('id').limit(1);
    if (error) {
      console.log('❌ client_requests table not found:', error.message);
      console.log('💡 Suggestion: Create client_requests table in Supabase');
      console.log('📝 Using fallback localStorage storage');
      
      // Try to create the table (this might fail due to permissions)
      await tryCreateClientRequestsTable();
      
      return { success: false, usingFallback: true, tableMissing: true };
    } else {
      console.log('✅ client_requests table exists');
    }
  } catch (err) {
    console.log('❌ Error checking client_requests table:', err);
    return { success: false, usingFallback: true };
  }

  // Test 3: Check table structure
  try {
    const { data, error } = await supabase
      .from('client_requests')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Error accessing client_requests table:', error.message);
      return { success: false, usingFallback: true };
    } else {
      console.log('✅ client_requests table accessible');
      if (data && data.length > 0) {
        console.log('📋 Table columns:', Object.keys(data[0]));
      } else {
        console.log('📋 Table is empty (that\'s ok)');
      }
    }
  } catch (err) {
    console.log('❌ Error checking table structure:', err);
    return { success: false, usingFallback: true };
  }

  console.log('✅ Contact system diagnostic complete - all systems operational');
  return { success: true, usingFallback: false };
};

const tryCreateClientRequestsTable = async () => {
  console.log('🔧 Attempting to create client_requests table...');
  
  // This is a basic SQL that would create the table
  // Note: This will likely fail due to Supabase permissions, but it's worth trying
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS client_requests (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      projectType TEXT NOT NULL,
      budget TEXT,
      timeline TEXT,
      description TEXT NOT NULL,
      requirements TEXT[],
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql: createTableSQL });
    if (error) {
      console.log('❌ Could not create table automatically:', error.message);
      console.log('💡 Please create the table manually in Supabase dashboard');
    } else {
      console.log('✅ Table created successfully');
    }
  } catch (err) {
    console.log('❌ Auto table creation failed:', err);
  }
};

export const getClientRequestsFromAllSources = async () => {
  const results = {
    supabase: null,
    localStorage: null,
    total: 0
  };

  // Try Supabase
  try {
    const { data, error } = await supabase
      .from('client_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      results.supabase = data;
      console.log(`📊 Found ${data.length} requests in Supabase`);
    }
  } catch (err) {
    console.log('❌ Could not fetch from Supabase:', err);
  }

  // Try localStorage
  try {
    const localData = JSON.parse(localStorage.getItem('client_requests') || '[]');
    results.localStorage = localData;
    console.log(`📊 Found ${localData.length} requests in localStorage`);
  } catch (err) {
    console.log('❌ Could not fetch from localStorage:', err);
  }

  results.total = (results.supabase?.length || 0) + (results.localStorage?.length || 0);
  
  return results;
};
