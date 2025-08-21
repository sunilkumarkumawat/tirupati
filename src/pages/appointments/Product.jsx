import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Package,
  DollarSign,
  CheckCircle,
  XCircle,
  Save,
  X,
  AlertTriangle,
  ShoppingCart
} from 'lucide-react';

export default function Product() {
  const [formData, setFormData] = useState({ 
    name: '', 
    category: '', 
    brand: '', 
    unit: '', 
    purchasePrice: '', 
    sellingPrice: '', 
    status: 'active' 
  });
  
const [list, setList] = useState([
  { 
    id: 1, 
    name: 'Floor Cleaner 5L', 
    category: 'Cleaning Supplies', 
    brand: 'Harpic', 
    unit: '1', 
    purchasePrice: '350', 
    sellingPrice: '450', 
    status: 'active', 
    createdAt: '2025-01-15' 
  },
  { 
    id: 2, 
    name: 'Liquid Handwash 500ml', 
    category: 'Personal Hygiene', 
    brand: 'Dettol', 
    unit: '1', 
    purchasePrice: '120', 
    sellingPrice: '160', 
    status: 'active', 
    createdAt: '2025-01-14' 
  },
  { 
    id: 3, 
    name: 'Toilet Tissue Roll Pack (6 Rolls)', 
    category: 'Paper Products', 
    brand: 'Origami', 
    unit: '1', 
    purchasePrice: '200', 
    sellingPrice: '280', 
    status: 'deactive', 
    createdAt: '2025-01-13' 
  }
]);
  
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Categories and Brands options
const categories = [
  'Cleaning Supplies',
  'Personal Hygiene',
  'Paper Products',
  'Sanitary Napkins',
  'Baby Care',
  'Bathroom Accessories',
  'Disinfectants',
  'Laundry Care'
];
  const brands = [
  'Harpic',
  'Lizol',
  'Dettol',
  'Savlon',
  'Origami',
  'Domex',
  'Vim',
  'Scotch-Brite',
  'Colgate-Palmolive',
  'Patanjali'
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
    if (!formData.name.trim() || !formData.category || !formData.brand || !formData.unit || !formData.purchasePrice || !formData.sellingPrice) {
      return;
    }

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
    setFormData({ name: '', category: '', brand: '', unit: '', purchasePrice: '', sellingPrice: '', status: 'active' });
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
    console.log('🟡 Saving product to DB...', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
  };

  // Filter and search logic
  const filteredList = list.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const resetForm = () => {
    setFormData({ name: '', category: '', brand: '', unit: '', purchasePrice: '', sellingPrice: '', status: 'active' });
    setEditIndex(null);
    setShowForm(false);
  };

  // Calculate profit for each product
  const calculateProfit = (purchasePrice, sellingPrice) => {
    const profit = parseFloat(sellingPrice) - parseFloat(purchasePrice);
    const profitPercentage = ((profit / parseFloat(purchasePrice)) * 100).toFixed(1);
    return { profit, profitPercentage };
  };

  // Get unique categories from the list
  const uniqueCategories = [...new Set(list.map(item => item.category))];

  return (
    <div className={`min-h-screen p-6 ${bgPrimary} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>Product Management</h1>
              <p className={`${textSecondary}`}>Manage your products, pricing, and inventory</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                Add Product
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
                placeholder="Search products, categories, or brands..."
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
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={`px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer`}
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>Total Products</p>
                <p className={`${textPrimary} text-3xl font-bold`}>{list.length}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Package className="text-blue-500" size={24} />
              </div>
            </div>
          </div>
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>Active Products</p>
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
                <p className={`${textSecondary} text-sm`}>Categories</p>
                <p className={`${textPrimary} text-3xl font-bold text-purple-500`}>
                  {uniqueCategories.length}
                </p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Filter className="text-purple-500" size={24} />
              </div>
            </div>
          </div>
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>Avg. Profit Margin</p>
                <p className={`${textPrimary} text-3xl font-bold text-orange-500`}>
                  {list.length > 0 ? 
                    (list.reduce((acc, item) => acc + calculateProfit(item.purchasePrice, item.sellingPrice).profitPercentage, 0) / list.length).toFixed(1) + '%'
                    : '0%'
                  }
                </p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <DollarSign className="text-orange-500" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} overflow-hidden`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold ${textPrimary}`}>Products Inventory</h2>
            <p className={`${textSecondary} mt-1`}>Showing {filteredList.length} of {list.length} products</p>
          </div>
          
          {filteredList.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className={`${textSecondary}`} size={32} />
              </div>
              <p className={`${textPrimary} text-lg font-medium mb-2`}>No products found</p>
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
                      Product Name
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Category
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Brand
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Unit
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Purchase Price
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Selling Price
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Profit
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
                  {filteredList.map((item, index) => {
                    const { profit, profitPercentage } = calculateProfit(item.purchasePrice, item.sellingPrice);
                    return (
                      <tr key={item.id} className={`${hoverBg} transition-colors duration-150`}>
                        <td className={`px-6 py-4 text-sm ${textPrimary}`}>
                          {index + 1}
                        </td>
                        <td className={`px-6 py-4 text-sm font-medium ${textPrimary}`}>
                          {item.name}
                        </td>
                        <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                          {item.category}
                        </td>
                        <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                          {item.brand}
                        </td>
                        <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                          {item.unit}
                        </td>
                        <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                          ₹{parseFloat(item.purchasePrice).toLocaleString()}
                        </td>
                        <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                          ₹{parseFloat(item.sellingPrice).toLocaleString()}
                        </td>
                        <td className={`px-6 py-4 text-sm`}>
                          <div className="flex flex-col">
                            <span className={`font-medium ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              ₹{profit.toLocaleString()}
                            </span>
                            <span className={`text-xs ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              ({profitPercentage}%)
                            </span>
                          </div>
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
                    );
                  })}
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
                  {editIndex !== null ? 'Edit Product' : 'Add New Product'}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Brand *
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Unit *
                  </label>
                  <input
                    type="number"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter unit quantity"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Purchase Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter purchase price"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter selling price"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              {formData.purchasePrice && formData.sellingPrice && (
                <div className={`p-4 rounded-lg ${bgTertiary} border ${borderColor}`}>
                  <h3 className={`font-medium ${textPrimary} mb-2`}>Profit Analysis</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className={`text-sm ${textSecondary}`}>Profit Amount</p>
                      <p className={`text-lg font-semibold ${(formData.sellingPrice - formData.purchasePrice) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        ₹{(formData.sellingPrice - formData.purchasePrice).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${textSecondary}`}>Profit Margin</p>
                      <p className={`text-lg font-semibold ${(formData.sellingPrice - formData.purchasePrice) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {(((formData.sellingPrice - formData.purchasePrice) / formData.purchasePrice) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
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
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.name.trim() || !formData.category || !formData.brand || !formData.unit || !formData.purchasePrice || !formData.sellingPrice}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={20} />
                  )}
                  {editIndex !== null ? 'Update Product' : 'Save Product'}
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