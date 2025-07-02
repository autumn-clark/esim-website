import Head from "next/head";
import Script from "next/script";

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>PayPal Checkout</title>
      </Head>

      {/* Load PayPal SDK script with proper strategy */}
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=AeARHxy8oKcgd7pz1DKTnL93Qu2i43GponrGg2WnChqOVdHnNMf9dyVSGLcJnTrnVRQUWaPT1JfpoXev&currency=USD`}
        strategy="beforeInteractive"
      />

      <div id="paypal-button-container" />

      {/* Inline script to render the PayPal buttons */}
      <Script id="paypal-buttons">
        {`
          paypal.Buttons({
            createOrder: function(data, actions) {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: '10.00'
                  }
                }]
              });
            },
            onApprove: function(data, actions) {
              return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
              });
            }
          }).render('#paypal-button-container');
        `}
      </Script>
    </>
  );
}
