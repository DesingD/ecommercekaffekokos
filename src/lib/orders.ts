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

export const getOrdersByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, product:id_product(name))")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
};

export default createOrder;