import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export function PayPalCheckoutButton({
  amount,
  onSuccess,
}: {
  amount: string; // amount as a string in dollars, e.g. "15.00"
  onSuccess: (details: any) => {
    
  }
  
}) {
  
  return (
    
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              { amount: { value: amount.toString() } },
            ],
          });
        }}
        
        onApprove={async (data, actions) => {
          const details = await actions.order?.capture();
          onSuccess(details);
        }}
        
        onError={(err) => {
          console.error("PayPal Error:", err);
          alert("Payment failed. Please try again.");
        }}
      />
    </PayPalScriptProvider>
  );
}
