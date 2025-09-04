import React, { useReducer, useMemo } from "react";
import "./MiniECommerce.css"; // styling biasa

// useFetchAdvanced hook
function useFetchAdvanced(url) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

// usePrevious hook
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Reducer keranjang
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.product];
    case "REMOVE":
      return state.filter((_, i) => i !== action.index);
    default:
      return state;
  }
}

// useOptimistic (dummy)
function useOptimistic(state, reducer) {
  const [optimistic, dispatch] = useReducer(reducer, state);
  return [optimistic, dispatch];
}

export default function MiniECommerce() {
  const { data: products, loading } = useFetchAdvanced(
    "https://fakestoreapi.com/products?limit=18"
  );

  const [cart, dispatch] = useOptimistic([], cartReducer);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }, [cart]);

  const prevCart = usePrevious(cart);

  return (
    <div className="container">
      <h1 className="title">🛒 Mini E-Commerce</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div>
          <h2 className="subtitle">Products</h2>
          <div className="grid">
            {products.map((p) => (
              <div key={p.id} className="card">
                <img src={p.image} alt={p.title} />
                <h3>{p.title}</h3>
                <p>${p.price}</p>
                <button
                  className="btn add"
                  onClick={() => dispatch({ type: "ADD", product: p })}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="cart">
        <h2 className="subtitle">Cart</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul>
            {cart.map((c, i) => (
              <li key={i} className="cart-item">
                <span>
                  {c.title} - ${c.price}
                </span>
                <button
                  className="btn remove"
                  onClick={() => dispatch({ type: "REMOVE", index: i })}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="total">Total: ${total}</p>
      </div>

      <div className="transaction">
        <h2 className="subtitle">Last Transaction</h2>
        {prevCart ? (
          <p>
            {prevCart.length} items ($
            {prevCart.reduce((s, i) => s + i.price, 0).toFixed(2)})
          </p>
        ) : (
          <p>No previous transaction</p>
        )}
      </div>
    </div>
  );
}
