'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/services/api';
import type { Order, Enquiry } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [tab, setTab] = useState<'orders' | 'enquiries'>('orders');

  useEffect(() => {
    adminApi.getOrders().then((r) => setOrders(r.data)).catch(() => {});
    adminApi.getEnquiries().then((r) => setEnquiries(r.data)).catch(() => {});
  }, []);

  const updateOrderStatus = async (id: string, status: string) => {
    await adminApi.updateOrder(id, { status });
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  const updateEnquiryStatus = async (id: string, status: string) => {
    await adminApi.updateEnquiry(id, { status });
    setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, status } : e)));
  };

  const statuses = ['new', 'contacted', 'in_discussion', 'confirmed', 'completed', 'cancelled'];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Orders & Enquiries</h1>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('orders')} className={`px-4 py-2 rounded-lg text-sm ${tab === 'orders' ? 'bg-red-900 text-white' : 'bg-gray-100'}`}>
          Orders ({orders.length})
        </button>
        <button onClick={() => setTab('enquiries')} className={`px-4 py-2 rounded-lg text-sm ${tab === 'enquiries' ? 'bg-red-900 text-white' : 'bg-gray-100'}`}>
          Enquiries ({enquiries.length})
        </button>
      </div>

      {tab === 'orders' ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">{order.referenceNumber}</p>
                  <p className="text-gray-600 text-sm">{order.customerName} · {order.email}</p>
                  <p className="text-gray-400 text-xs">{formatDate(order.createdAt)}</p>
                </div>
                <select value={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm">
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <ul className="text-sm text-gray-600">
                {order.items.map((item, i) => (
                  <li key={i}>{item.productTitle} × {item.quantity}</li>
                ))}
              </ul>
              {order.message && <p className="text-gray-500 text-sm mt-2">{order.message}</p>}
            </div>
          ))}
          {orders.length === 0 && <p className="text-gray-500">No orders yet.</p>}
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div key={enq._id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">{enq.referenceNumber} · {enq.enquiryType}</p>
                  <p className="text-gray-600 text-sm">{enq.name} · {enq.email}</p>
                  <p className="text-gray-400 text-xs">{formatDate(enq.createdAt)}</p>
                </div>
                <select value={enq.status} onChange={(e) => updateEnquiryStatus(enq._id, e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm">
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <p className="text-gray-600 text-sm">{enq.message}</p>
            </div>
          ))}
          {enquiries.length === 0 && <p className="text-gray-500">No enquiries yet.</p>}
        </div>
      )}
    </div>
  );
}
