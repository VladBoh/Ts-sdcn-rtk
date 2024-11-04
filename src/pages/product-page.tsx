import AddUserModal from "@/product/add-product-form";
import { ProductCard } from "@/product/product-card";

export function ProductPage() {

    return (
      <>
        <ProductCard />
        <div className="flex justify-end fixed bottom-4 right-4">
            <AddUserModal/>
        </div>
      </>
    )
  }
  
  