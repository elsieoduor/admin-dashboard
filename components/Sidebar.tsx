import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#003262] text-white p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link href="/" className="block py-2 px-4 hover:bg-blue-800 rounded">Dashboard</Link></li>
          <li><Link href="/technicians"className="block py-2 px-4 hover:bg-blue-800 rounded">Technicians</Link></li>
          <li><Link href="/activity" className="block py-2 px-4 hover:bg-blue-800 rounded">Activity</Link></li>
          <li><Link href="/disputes" className="block py-2 px-4 hover:bg-blue-800 rounded">Disputes</Link></li>
          <li><Link href="/analytics"className="block py-2 px-4 hover:bg-blue-800 rounded">Analytics</Link></li>
        </ul>
      </nav>
      <div className="absolute bottom-4 w-64 px-2">
        <Link href="/settings" className="block py-2 px-4  rounded">Settings
        </Link>
        <button
          // onClick={() => signOut()}
          className="block py-2 px-4  rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
