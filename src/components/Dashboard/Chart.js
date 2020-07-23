import React from "react";
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export const Chart = ({data}) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width="100%"
      height={700}
      data={data}
      margin={{left: 100, right: 100}}
    >
      <XAxis dataKey="Date" />
      <YAxis dataKey="Clicks" label={{value: "Clicks", angle: -90, position: "left", offset: 50 }}/>
      <YAxis dataKey="Impressions" yAxisId={1} orientation="right" label={{value: "Impressions", angle: -90, position: "right", offset: 50}} />
      <Legend/>
      <Tooltip />
      <Line dataKey="Clicks" stroke="red" animationDuration={150} dot={false} />
      <Line dataKey="Impressions" stroke="blue" yAxisId={1} animationDuration={150} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);