import dotenv from 'dotenv';
import {createClient} from '@supabase/supabase-js';

dotenv.config();

export const supabase_config = () => {
    const supabaseUrl = process.env.SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    return supabase;
}
