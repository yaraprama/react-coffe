import { Dataorder } from "./Dataorder";

export default function OrderList() {
  return (
    <div className="card order">
      <h3>Riwayat Pesanan</h3>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Status</th>
            <th>Tanggal</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {Dataorder.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.date}</td>
              <td>
                Rp {order.total.toLocaleString("id-ID")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
