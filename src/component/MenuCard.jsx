// src/components/MenuCard.jsx
export default function MenuCard({ item, addToCart }) {
  return (
    <div className="menu-card min-w-[220px] flex-shrink-0">
      {item.image ? (
        <img
          src={`http://localhost:8000/storage/uploads/product/${item.image}`}
          alt={item.name}
          onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
        />
      ) : (
        <div style={{
          width: "100%",
          height: "160px",
          backgroundColor: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          No Image
        </div>
      )}

      <div className="menu-info">
        <h4>{item.name}</h4>
        <p>{item.description}</p>

        <div className="menu-footer">
          <span className="price">Rp {item.price}</span>
        <button className="add-btn" onClick={() => addToCart(item.id)}>+</button>

        </div>
      </div>
    </div>
  );
}
