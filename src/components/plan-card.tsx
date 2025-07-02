import React, { useState } from "react";
import { useSession } from "next-auth/react";
import type { Package } from "../models/Package";
import { PayPalCheckoutButton } from "./paypal-checkout-button";

interface PlanCardProps {
    pkg: Package;
    isGlobal?: boolean;
    mainCountryName?: string;
}

export function PlanCard({ pkg, isGlobal = false, mainCountryName = "" }: PlanCardProps) {
    const [showPayPal, setShowPayPal] = useState(false);
    const { data: session } = useSession();

    const formattedData = (pkg.volume / (1024 ** 3)).toFixed(2);

    const handleOrder = async (transactionId: string) => {
        if (!session?.user?.email) {
            alert("Please login to place an order.");
            return;
        }

        try {
            const res = await fetch("/api/esim/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    transactionId,
                    packageCode: pkg.packageCode,
                    price: pkg.price,
                    userEmail: session.user.email,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success || !data.obj) {
                alert("Order failed: " + (data.error || "Unknown error"));
                return;
            }

            alert("Order successful! Order No: " + data.obj.orderNo);
        } catch (error) {
            console.error("Order error:", error);
            alert("An error occurred during order. Please try again.");
        }
    };

    return (
        <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
            <p>Дата: {formattedData} GB</p>
            <p>Хугацаа: {pkg.duration} {pkg.durationUnit.toLowerCase()}</p>
            <p className="text-blue-600 font-bold mt-2">
                {pkg.price.toLocaleString()} {pkg.currencyCode}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {isGlobal ? (
                    <div className="flex items-center space-x-2">
                        <span className="font-medium">{mainCountryName} and {pkg.locationNetworkList.length - 1} more</span>
                    </div>
                ) : (
                    pkg.locationNetworkList.map((loc) => (
                        <div key={loc.locationName} className="flex items-center space-x-2">
                            <span className="font-medium">{loc.locationName}</span>
                        </div>
                    ))
                )}
            </div>

            {showPayPal ? (
                <PayPalCheckoutButton
                amount={(pkg.price / 100).toFixed(2)}
                onSuccess={async (details) => {
                  const captureStatus = details?.purchase_units?.[0]?.payments?.captures?.[0]?.status;
              
                  if (captureStatus === "COMPLETED") {
                    await handleOrder(details.id);
                    setShowPayPal(false);
                  } else {
                    alert("💳 Payment failed. eSIM not ordered.");
                  }
                }}
              />
              

            ) : (
                <button
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => setShowPayPal(true)}
                >
                    Худалдан авах
                </button>
            )}
        </div>
    );
}
