import { Icon } from "@iconify/react";

export default function StatsCards() {
  return (
    <div className="stats-row">

      <div className="stat-card">
        <div className="icon dashed">
          <Icon icon="mdi:account-group" />
        </div>
        <div className="stat-info">
          <p>Jumlah User</p>
          <h3>16.000+</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon dashed">
          <Icon icon="mdi:coffee" />
        </div>
        <div className="stat-info">
          <p>Menu Tersedia</p>
          <h3>35</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon dashed">
          <Icon icon="mdi:clipboard-list" />
        </div>
        <div className="stat-info">
          <p>Total Pesanan</p>
          <h3>1.600</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon dashed">
          <Icon icon="mdi:cash-multiple" />
        </div>
        <div className="stat-info">
          <p>Total Pendapatan</p>
          <h3>50.000.000</h3>
        </div>
      </div>

    </div>
  );
}
