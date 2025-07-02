import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Order {
  id: number;
  transaction_id: string;
  package_code: string;
  price: number;
  created_at: string;
}

export default function MyOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/esim/order?userEmail=${session.user.email}`);
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders:", data.error);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (status === "loading" || loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!session) {
    return <p className="text-center mt-10">Та эхлээд нэвтэрнэ үү.</p>;
  }

  return (
    <div className="min-h-screen px-6 py-10 text-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-center">Миний захиалгууд</h1>

      {loading ? (
        <p className="text-center text-gray-500">Уншиж байна...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">Таны захиалга хараахан алга байна.</p>
      ) : (
        <div className="bg-gray-50 drop-shadow-2xl rounded-xl overflow-hidden max-w-5xl mx-auto">
          <div className="flex w-full font-bold bg-gray-100 text-black border-b border-gray-300 text-sm">
            <div className="w-1/4 p-2.5 text-center">Transaction</div>
            <div className="w-1/4 p-2.5 text-center">Package Code</div>
            <div className="w-1/4 p-2.5 text-center">Price</div>
            <div className="w-1/4 p-2.5 text-center">Date</div>
          </div>

          {orders.map((order) => (
            <div key={order.id} className="flex w-full text-sm border-b border-gray-200 hover:bg-white transition">
              <div className="w-1/4 p-2.5 text-center">{order.transaction_id}</div>
              <div className="w-1/4 p-2.5 text-center">{order.package_code}</div>
              <div className="w-1/4 p-2.5 text-center">{order.price.toLocaleString()} ₮</div>
              <div className="w-1/4 p-2.5 text-center">{new Date(order.created_at).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
