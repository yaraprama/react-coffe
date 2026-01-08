import { useState } from "react";
import { Icon } from "@iconify/react";

export default function MenuFormModal({ onClose, onSave, data }) {
  const [form, setForm] = useState(
    data || {
      name: "",
      category: "Coffee",
      price: "",
      stock: "",
      description: "",
      image: ""
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      ...form, 
      price: Number(form.price), 
      stock: Number(form.stock) 
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{data ? "Edit Produk" : "Tambah Produk"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nama Produk"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          
          <textarea
            placeholder="Deskripsi"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            required
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="number"
              placeholder="Harga"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Stok"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              required
            />
          </div>

          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="Coffee">Coffee</option>
            <option value="Non-Coffee">Non-Coffee</option>
            <option value="Snack">Snack</option>
          </select>

          <input
            placeholder="Nama File Gambar (Contoh: btrsct.jpg)"
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Batal</button>
            <button className="btn-primary" type="submit">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}