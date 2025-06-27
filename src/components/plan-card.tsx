// src/components/PlanCard.tsx
import React from "react";
import type { Package } from "./Package";

interface PlanCardProps {
  pkg: Package;
  isGlobal?: boolean;
  mainCountryName?: string;
}

export function PlanCard({ pkg, isGlobal = false, mainCountryName = "" }: PlanCardProps) {
  const formattedData = (pkg.volume / (1024 ** 3)).toFixed(2);

  const handlePurchase = async () => {
    try {
      const res = await fetch("/api/esim/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: `txn-${Date.now()}`,
          packageCode: pkg.packageCode,
          price: pkg.price,
          count: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Захиалга амжилтгүй боллоо: " + data.error);
        return;
      }

      alert("Захиалга амжилттай! Order No: " + data.orderNo);
    } catch (err) {
      console.error("Order error:", err);
      alert("Алдаа гарлаа. Дахин оролдоно уу.");
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

      <button
        onClick={handlePurchase}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Худалдан авах
      </button>
    </div>
  );
}
