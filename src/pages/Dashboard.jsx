function Dashboard({isSidebarOpen}) {
  return (
    <div
  className={`mt-16 p-6 bg-gray-100 min-h-[calc(100vh-4rem)] ${
    isSidebarOpen ? 'ml-64' : 'ml-0'
  }`}
>
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Widget 1</h3>
          <p className="text-gray-600">Some data or content here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Widget 2</h3>
          <p className="text-gray-600">More information or metrics.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Widget 3</h3>
          <p className="text-gray-600">Additional dashboard content.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;