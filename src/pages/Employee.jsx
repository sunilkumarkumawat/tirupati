import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Save,
  X,
  AlertTriangle,
  User,
  Users,
  Mail,
  Phone,
  MapPin,
  Camera
} from 'lucide-react';

export default function Employee() {
  const [formData, setFormData] = useState({ 
    name: '', 
    role: '', 
    designation: '', 
    email: '', 
    mobile: '', 
    photo: '', 
    address: '', 
    status: 'active' 
  });
  
  const [list, setList] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      role: 'Admin', 
      designation: 'Manager', 
      email: 'john.doe@company.com', 
      mobile: '+1-234-567-8901', 
      photo: '', 
      address: '123 Main St, City, State', 
      status: 'active', 
      createdAt: '2025-01-15' 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      role: 'Sales Executive', 
      designation: 'Senior Executive', 
      email: 'jane.smith@company.com', 
      mobile: '+1-234-567-8902', 
      photo: '', 
      address: '456 Oak Ave, City, State', 
      status: 'active', 
      createdAt: '2025-01-14' 
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      role: 'Manager', 
      designation: 'Team Lead', 
      email: 'mike.johnson@company.com', 
      mobile: '+1-234-567-8903', 
      photo: '', 
      address: '789 Pine Rd, City, State', 
      status: 'deactive', 
      createdAt: '2025-01-13' 
    }
  ]);
  
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Sample roles and designations
  const roles = [
    'Super Admin',
    'Admin', 
    'Manager',
    'Sales Executive',
    'Team Lead',
    'Developer',
    'Designer',
    'HR Executive'
  ];

  const designations = [
    'Manager',
    'Senior Manager',
    'Team Lead',
    'Senior Executive',
    'Executive',
    'Associate',
    'Junior Associate',
    'Intern'
  ];

  // Get theme from window object
  const [isDarkMode, setIsDarkMode] = useState(() => window.darkMode || false);

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = () => {
      setIsDarkMode(window.darkMode || false);
    };
    
    // Check theme periodically (simple approach)
    const interval = setInterval(handleThemeChange, 100);
    return () => clearInterval(interval);
  }, []);

  // Theme classes
  const bgPrimary = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const bgSecondary = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const bgTertiary = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const textPrimary = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverBg = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.name.trim() === '' || formData.email.trim() === '') return;

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedList = [...list];
    const newEntry = {
      ...formData,
      id: editIndex !== null ? list[editIndex].id : Date.now(),
      createdAt: editIndex !== null ? list[editIndex].createdAt : new Date().toISOString().split('T')[0]
    };

    if (editIndex !== null) {
      updatedList[editIndex] = newEntry;
      setEditIndex(null);
    } else {
      updatedList.unshift(newEntry);
    }

    setList(updatedList);
    await saveToDatabase(newEntry);
    setFormData({ 
      name: '', 
      role: '', 
      designation: '', 
      email: '', 
      mobile: '', 
      photo: '', 
      address: '', 
      status: 'active' 
    });
    setShowForm(false);
    setIsLoading(false);
  };

  const handleEdit = (index) => {
    setFormData(list[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteIndex === null) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updatedList = list.filter((_, i) => i !== deleteIndex);
    setList(updatedList);
    setShowDeleteModal(false);
    setDeleteIndex(null);
    setIsLoading(false);
  };

  const saveToDatabase = async (data) => {
    console.log('🟡 Saving to DB...', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
  };

  // Filter and search logic
  const filteredList = list.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const resetForm = () => {
    setFormData({ 
      name: '', 
      role: '', 
      designation: '', 
      email: '', 
      mobile: '', 
      photo: '', 
      address: '', 
      status: 'active' 
    });
    setEditIndex(null);
    setShowForm(false);
  };

  return (
    <div className={`min-h-screen p-6 ${bgPrimary} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>Employee Management</h1>
              <p className={`${textSecondary}`}>Manage your employees and their information</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                Add New
              </button>
              <button className={`flex items-center gap-2 ${bgTertiary} ${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} px-4 py-2 rounded-lg transition-all duration-200`}>
                <Download size={20} />
                Export
              </button>
              <button className={`flex items-center gap-2 ${bgTertiary} ${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} px-4 py-2 rounded-lg transition-all duration-200`}>
                <Upload size={20} />
                Import
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary}`} size={20} />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary}`} size={20} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`pl-10 pr-8 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer`}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="deactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>Total Employees</p>
                <p className={`${textPrimary} text-3xl font-bold`}>{list.length}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="text-blue-500" size={24} />
              </div>
            </div>
          </div>
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>Active</p>
                <p className={`${textPrimary} text-3xl font-bold text-green-500`}>
                  {list.filter(item => item.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
          </div>
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>Inactive</p>
                <p className={`${textPrimary} text-3xl font-bold text-red-500`}>
                  {list.filter(item => item.status === 'deactive').length}
                </p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-lg">
                <EyeOff className="text-red-500" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} overflow-hidden`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold ${textPrimary}`}>Employee List</h2>
            <p className={`${textSecondary} mt-1`}>Showing {filteredList.length} of {list.length} entries</p>
          </div>
          
          {filteredList.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Search className={`${textSecondary}`} size={32} />
              </div>
              <p className={`${textPrimary} text-lg font-medium mb-2`}>No entries found</p>
              <p className={`${textSecondary}`}>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${bgTertiary}`}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      #
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Name
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Role
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Designation
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Email
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Mobile
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Status
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredList.map((item, index) => (
                    <tr key={item.id} className={`${hoverBg} transition-colors duration-150`}>
                      <td className={`px-6 py-4 text-sm ${textPrimary}`}>
                        {index + 1}
                      </td>
                      <td className={`px-6 py-4 text-sm font-medium ${textPrimary}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <User className="text-blue-500" size={16} />
                          </div>
                          {item.name}
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${textPrimary}`}>
                        {item.role}
                      </td>
                      <td className={`px-6 py-4 text-sm ${textPrimary}`}>
                        {item.designation}
                      </td>
                      <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                        {item.email}
                      </td>
                      <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                        {item.mobile}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {item.status === 'active' ? (
                            <CheckCircle size={12} className="mr-1" />
                          ) : (
                            <XCircle size={12} className="mr-1" />
                          )}
                          {item.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(index)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150"
                          >
                            <Edit3 size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(index)}
                            className="flex items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${bgSecondary} rounded-2xl shadow-2xl border ${borderColor} w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-semibold ${textPrimary}`}>
                  {editIndex !== null ? 'Edit Employee' : 'Add New Employee'}
                </h2>
                <button
                  onClick={resetForm}
                  className={`p-2 ${hoverBg} rounded-lg transition-colors duration-150`}
                >
                  <X className={`${textSecondary}`} size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    <User size={16} className="inline mr-1" />
                    Employee Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter employee name"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Role Name
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Designation
                  </label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select Designation</option>
                    {designations.map((designation) => (
                      <option key={designation} value={designation}>{designation}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    <Mail size={16} className="inline mr-1" />
                    Email ID *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    <Phone size={16} className="inline mr-1" />
                    Mobile No
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter mobile number"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    <Camera size={16} className="inline mr-1" />
                    Photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.files[0]?.name || '' }))}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    <MapPin size={16} className="inline mr-1" />
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none`}
                    placeholder="Enter address"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="active">Active</option>
                    <option value="deactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.name.trim() || !formData.email.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={20} />
                  )}
                  {editIndex !== null ? 'Update' : 'Save'}
                </button>
                <button
                  onClick={resetForm}
                  className={`px-6 py-3 rounded-lg border ${borderColor} ${bgTertiary} ${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} transition-all duration-200 font-medium`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${bgSecondary} rounded-2xl shadow-2xl border ${borderColor} w-full max-w-md`}>
            <div className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-600 dark:text-red-400" size={32} />
              </div>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>
                Confirm Deletion
              </h3>
              <p className={`${textSecondary} mb-6`}>
                Are you sure you want to delete "{deleteIndex !== null ? list[deleteIndex]?.name : ''}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmDelete}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg border ${borderColor} ${bgTertiary} ${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} transition-all duration-200 font-medium`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}