'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { AnalyticsDaily } from '@/types/firestore';

export default function RevenueChart({ data }: { data: AnalyticsDaily[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2E8E0" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(val) => new Date(val).toLocaleDateString('de-DE', { weekday: 'short' })}
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#8A8A8A', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-nunito)' }}
          dy={10}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#8A8A8A', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-nunito)' }}
          tickFormatter={(val) => `€${val}`}
          dx={-10}
        />
        <Tooltip 
          cursor={{ stroke: '#C41E3A', strokeWidth: 2, strokeDasharray: '4 4' }}
          contentStyle={{ backgroundColor: '#fef8f5', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(196,30,58,0.15)', fontWeight: 700 }}
          itemStyle={{ color: '#C41E3A', fontWeight: 800 }}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#C41E3A" 
          strokeWidth={4}
          dot={{ r: 6, fill: '#FAF8F5', stroke: '#C41E3A', strokeWidth: 3 }}
          activeDot={{ r: 8, fill: '#C41E3A', stroke: '#FAF8F5', strokeWidth: 3 }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
