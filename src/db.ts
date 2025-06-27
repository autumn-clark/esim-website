// lib/db.ts

import sqlite from 'better-sqlite3';
const db = sqlite('esim.db');

export function saveOrderToDb(order: {
  userEmail: string;
  orderNo: string;
  transactionId: string;
  packageCode: string;
  price: number;
}) {
  const stmt = db.prepare(
    "INSERT INTO orders (userEmail, orderNo, transactionId, packageCode, price) VALUES (?, ?, ?, ?, ?)"
  );
  stmt.run(order.userEmail, order.orderNo, order.transactionId, order.packageCode, order.price);
}

export function getOrdersByUser(userEmail: string) {
  const stmt = db.prepare("SELECT * FROM orders WHERE userEmail = ?");
  return stmt.all(userEmail);
}
