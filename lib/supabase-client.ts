import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function storeInvestmentStrategy(strategy: any) {
  const { data, error } = await supabase
    .from('investment_strategies')
    .insert([strategy])
    .select();

  if (error) throw error;
  return data;
}

export async function getInvestmentStrategies() {
  const { data, error } = await supabase
    .from('investment_strategies')
    .select('*');

  if (error) throw error;
  return data;
}