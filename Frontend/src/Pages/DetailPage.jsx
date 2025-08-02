import React from "react";
import { useParams } from "react-router-dom";

const detailMap = {
  available: { title: "Available Stock", description: "List of all available stock." },
  stocked: { title: "Stocked Items", description: "Items currently in stock." },
  "out-of-stock": { title: "Out of Stock", description: "Items currently unavailable." },
  pending: { title: "Pending Orders", description: "Orders that are pending delivery." }
};

const DetailPage = () => {
  const { type } = useParams();
  const data = detailMap[type];

  if (!data) return <h2>Invalid Page</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      
    </div>
  );
};

export default DetailPage;
