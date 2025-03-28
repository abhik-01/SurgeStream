import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data); 
        setLoading(false);
        console.log(data)
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const categoryCount = products.reduce((acc, product) => {
    const category = product.category.trim();
    acc[category] = (acc[category] || 0)+1;
    return acc;
  }, {});

  const categoryCountData = Object.entries(categoryCount).map(([category, count]) => ({
    category,
    count,
  }));

  // Total rating count per category
  const ratingCount = products.reduce((acc, product) => {
    const category = product.category.trim();
    acc[category] = (acc[category] || 0) + product.rating.count;
    return acc;
  }, {});

  const ratingCountData = Object.entries(ratingCount).map(([category, ratingCount]) => ({
    category,
    ratingCount,
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <div>
      <h1>Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} style={{ width: "150px", height: "150px", objectFit: "contain" }} />
            <p>Category - {product.category}</p>
            <p>Price - {product.price} Count - {product.rating.count}</p>
          </div>
        ))}
      </div>

      {/*bar*/}
      <div style={{border:"0px solid black", padding:"50px"}}>
      <h3>Total count of product as per category</h3>
      <BarChart width={600} height={300} data={categoryCountData}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      {/*pie*/}
      <h3>Total rating count as per category</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={ratingCountData}
          dataKey="ratingCount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {ratingCountData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </div>

    </div>
  );
};

export default Dashboard;