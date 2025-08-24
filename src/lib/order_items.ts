// src/lib/order_items.ts
import { supabase } from "./supabase";

const createOrderItem = async (itemData: any) => {
  const { data, error } = await supabase
    .from("order_items")
    .insert([itemData]);

  if (error) throw new Error(error.message);
  return data;
};

export default createOrderItem;