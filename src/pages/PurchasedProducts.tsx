import { useCart } from "../hooks/useCart";
import { PurchasedProductCard } from "../components/PurchasedProductCard";

export default function PurchasedProducts() {
  const { purchased } = useCart();

  return (
    <div className="md:col-span-3">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">My Purchased Items</h2>
        {purchased.length == 0 ? (
          <p className="text-xl flex justify-center">
            You don't have any purchase yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {purchased.map((product) => (
              <PurchasedProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
