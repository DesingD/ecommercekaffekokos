// src/lib/orders.ts
import { supabase } from "./supabase";

const createOrder = async (orderData: any) => {
  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id;
};

export default createOrder;