import { useLocalSearchParams } from "expo-router";
import ProductForm from "../../components/shared/productForm";


export default function EditProductScreen() {
  const { product } = useLocalSearchParams();
  let parsedProduct = null;

  try {
    parsedProduct = product ? JSON.parse(product as string) : null;
  } catch (e) {
    console.error("Invalid product data");
  }

  return <ProductForm type="edit" product={parsedProduct} />;
}
