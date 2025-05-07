import React, { useState } from 'react';
import Login from './Login';
import UsersTable from './UsersTable';
import ItemsTable from './ItemsTable';
import OrdersTable from './OrdersTable';
import AdminsTable from './AdminsTable';
import ShopOwnersTable from './ShopOwnersTable';
import ShopTakersTable from './ShopTakersTable';
import RentsTable from './RentsTable';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [section, setSection] = useState('users');

  if (!loggedIn) return <Login setLoggedIn={setLoggedIn} />;

  return (
    <div>
      <h1 style={{ textAlign: 'center', background: '#333', color: 'white', padding: '15px 0' }}>
        🛠️ Total Admin Dashboard
      </h1>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <aside style={{ width: '220px', padding: '20px', background: '#f0f0f0' }}>
          <h3>Sections</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><button onClick={() => setSection('users')}>Users</button></li>
            <li><button onClick={() => setSection('items')}>Items</button></li>
            <li><button onClick={() => setSection('orders')}>Orders</button></li>
            <li><button onClick={() => setSection('admins')}>Admins</button></li>
            <li><button onClick={() => setSection('owners')}>Shop Owners</button></li>
            <li><button onClick={() => setSection('takers')}>Shop Takers</button></li>
            <li><button onClick={() => setSection('rents')}>Rents</button></li>
          </ul>
        </aside>

        <main style={{ flex: 1, padding: '20px', background: '#fff' }}>
          {section === 'users' && <UsersTable />}
          {section === 'items' && <ItemsTable />}
          {section === 'orders' && <OrdersTable />}
          {section === 'admins' && <AdminsTable />}
          {section === 'owners' && <ShopOwnersTable />}
          {section === 'takers' && <ShopTakersTable />}
          {section === 'rents' && <RentsTable />}
        </main>
      </div>
    </div>
  );
};

export default App;
