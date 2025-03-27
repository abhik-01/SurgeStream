import React, { useEffect, useState } from "react";

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
            <p>prince - {product.price} Count-{product.rating.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
