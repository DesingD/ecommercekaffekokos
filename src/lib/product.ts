import { supabase } from "./supabase";

export async function getProductById(id: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export const decreaseProductStock = async (productId: string, quantity: number) => {
  // Obtiene el stock actual
  const { data: product, error } = await supabase
    .from("products")
    .select("stock")
    .eq("id", productId)
    .single();

  if (error) throw new Error(error.message);

  const newStock = Math.max(0, (product?.stock || 0) - quantity);

  const { error: updateError } = await supabase
    .from("products")
    .update({ stock: newStock })
    .eq("id", productId);

  if (updateError) throw new Error(updateError.message);
};