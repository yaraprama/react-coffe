import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import MenuFormModal from "./MenuFormModal";
import { useAuth } from "../../../context/AuthContext"; 
import "./menu-admin.css";

export default function MenuAdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Gagal ambil produk", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editData) {
        await axios.patch(`http://localhost:8000/api/admin/products/${editData.id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post("http://localhost:8000/api/admin/products", data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setOpen(false);
      setEditData(null);
      fetchProducts();
      alert("Berhasil menyimpan produk!");
    } catch (err) {
      alert("Gagal menyimpan: " + (err.response?.data?.message || "Cek Role Admin"));
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus produk ini?")) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
      } catch (err) {
        alert("Gagal menghapus");
      }
    }
  };

  if (loading) return <div className="menu-admin">Memuat...</div>;

  return (
    <div className="menu-admin">
      <div className="menu-header">
        <h2>Manajemen Menu</h2>
        <button className="btn-primary" onClick={() => setOpen(true)}>
          <Icon icon="mdi:plus" /> Tambah Produk
        </button>
      </div>

      <table className="menu-table">
        <thead>
          <tr>
            <th>Gambar</th>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map(item => (
            <tr key={item.id}>
              <td>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80"; }} 
                />
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>Rp {parseInt(item.price).toLocaleString("id-ID")}</td>
              <td><b>{item.stock}</b></td>
             {/* Pastikan strukturnya seperti ini saja di baris tabel kamu */}
            <td className="actions">
              <button onClick={() => { setEditData(item); setOpen(true); }}>
                <Icon icon="mdi:pencil" />
              </button>
              <button className="danger" onClick={() => handleDelete(item.id)}>
                <Icon icon="mdi:delete" />
              </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <MenuFormModal
          onClose={() => { setOpen(false); setEditData(null); }}
          onSave={handleSave}
          data={editData}
        />
      )}
    </div>
  );
}