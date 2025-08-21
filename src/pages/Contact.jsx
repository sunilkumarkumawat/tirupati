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
  Camera,
  Building,
  Calendar,
  MessageCircle,
  Star,
  Globe,
  FileText,
  UserCheck
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ 
    leadSource: '',
    leadFor: '',
    leadPriority: '',
    contactPerson: '',
    companyName: '',
    mobileNo: '',
    whatsappNo: '',
    emailId: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    referencePersonName: '',
    referencePersonMobile: '',
    businessCard: '',
    whatsappTemplate: '',
    contactAllocation: '',
    remark: '',
    nextFollowUpDate: '',
    status: 'active'
  });
  
  const [list, setList] = useState([
    { 
      id: 1,
      leadSource: 'Website',
      leadFor: 'Software Development',
      leadPriority: 'High',
      contactPerson: 'John Smith',
      companyName: 'TechCorp Solutions',
      mobileNo: '+1-234-567-8901',
      whatsappNo: '+1-234-567-8901',
      emailId: 'john.smith@techcorp.com',
      address: '123 Business Ave, Suite 100',
      country: 'USA',
      state: 'California',
      city: 'San Francisco',
      pincode: '94102',
      referencePersonName: 'Mike Johnson',
      referencePersonMobile: '+1-234-567-8902',
      businessCard: '',
      whatsappTemplate: 'Template 1',
      contactAllocation: 'Sales Team A',
      remark: 'Interested in mobile app development',
      nextFollowUpDate: '2025-08-10',
      status: 'active',
      createdAt: '2025-08-01'
    },
    { 
      id: 2,
      leadSource: 'Social Media',
      leadFor: 'Web Design',
      leadPriority: 'Medium',
      contactPerson: 'Sarah Wilson',
      companyName: 'Creative Agency Ltd',
      mobileNo: '+1-234-567-8903',
      whatsappNo: '+1-234-567-8903',
      emailId: 'sarah.wilson@creative.com',
      address: '456 Design Street',
      country: 'USA',
      state: 'New York',
      city: 'New York',
      pincode: '10001',
      referencePersonName: 'Lisa Brown',
      referencePersonMobile: '+1-234-567-8904',
      businessCard: '',
      whatsappTemplate: 'Template 2',
      contactAllocation: 'Sales Team B',
      remark: 'Looking for e-commerce solution',
      nextFollowUpDate: '2025-08-12',
      status: 'active',
      createdAt: '2025-08-02'
    },
    { 
      id: 3,
      leadSource: 'Referral',
      leadFor: 'Digital Marketing',
      leadPriority: 'Low',
      contactPerson: 'Robert Davis',
      companyName: 'Marketing Pro Inc',
      mobileNo: '+1-234-567-8905',
      whatsappNo: '+1-234-567-8905',
      emailId: 'robert.davis@marketingpro.com',
      address: '789 Marketing Blvd',
      country: 'USA',
      state: 'Texas',
      city: 'Austin',
      pincode: '73301',
      referencePersonName: 'Tom Anderson',
      referencePersonMobile: '+1-234-567-8906',
      businessCard: '',
      whatsappTemplate: 'Template 3',
      contactAllocation: 'Sales Team C',
      remark: 'Budget discussion pending',
      nextFollowUpDate: '2025-08-15',
      status: 'inactive',
      createdAt: '2025-08-03'
    }
  ]);
  
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Dropdown options
  const leadSources = [
    'Website',
    'Social Media',
    'Referral',
    'Cold Call',
    'Email Campaign',
    'Trade Show',
    'Advertisement',
    'Direct Mail',
    'Partner'
  ];

  const leadForOptions = [
    'Software Development',
    'Web Design',
    'Mobile App',
    'Digital Marketing',
    'SEO Services',
    'Consulting',
    'E-commerce',
    'Maintenance',
    'Other'
  ];

  const leadPriorities = [
    'High',
    'Medium',
    'Low'
  ];

  const countries = [
    'USA',
    'Canada',
    'UK',
    'India',
    'Australia',
    'Germany',
    'France',
    'Other'
  ];

  const whatsappTemplates = [
    'Template 1 - Welcome',
    'Template 2 - Follow Up',
    'Template 3 - Proposal',
    'Template 4 - Thank You',
    'Template 5 - Custom'
  ];

  const contactAllocations = [
    'Sales Team A',
    'Sales Team B',
    'Sales Team C',
    'Manager',
    'Senior Executive',
    'Junior Executive'
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
    if (formData.contactPerson.trim() === '' || formData.emailId.trim() === '') return;

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
      leadSource: '',
      leadFor: '',
      leadPriority: '',
      contactPerson: '',
      companyName: '',
      mobileNo: '',
      whatsappNo: '',
      emailId: '',
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      referencePersonName: '',
      referencePersonMobile: '',
      businessCard: '',
      whatsappTemplate: '',
      contactAllocation: '',
      remark: '',
      nextFollowUpDate: '',
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
    const matchesSearch = item.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.emailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.leadSource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const resetForm = () => {
    setFormData({ 
      leadSource: '',
      leadFor: '',
      leadPriority: '',
      contactPerson: '',
      companyName: '',
      mobileNo: '',
      whatsappNo: '',
      emailId: '',
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      referencePersonName: '',
      referencePersonMobile: '',
      businessCard: '',
      whatsappTemplate: '',
      contactAllocation: '',
      remark: '',
      nextFollowUpDate: '',
      status: 'active'
    });
    setEditIndex(null);
    setShowForm(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className={`min-h-screen p-6 ${bgPrimary} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>Contact Management</h1>
              <p className={`${textSecondary}`}>Manage your contacts and leads efficiently</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                Add New Contact
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
                placeholder="Search contacts..."
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
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>Total Contacts</p>
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
                <p className={`${textSecondary} text-sm`}>Active Contacts</p>
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
                <p className={`${textSecondary} text-sm`}>High Priority</p>
                <p className={`${textPrimary} text-3xl font-bold text-red-500`}>
                  {list.filter(item => item.leadPriority === 'High').length}
                </p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-lg">
                <Star className="text-red-500" size={24} />
              </div>
            </div>
          </div>
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>Follow-ups Due</p>
                <p className={`${textPrimary} text-3xl font-bold text-orange-500`}>
                  {list.filter(item => item.nextFollowUpDate && new Date(item.nextFollowUpDate) <= new Date()).length}
                </p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Calendar className="text-orange-500" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} overflow-hidden`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold ${textPrimary}`}>Contact List</h2>
            <p className={`${textSecondary} mt-1`}>Showing {filteredList.length} of {list.length} entries</p>
          </div>
          
          {filteredList.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Search className={`${textSecondary}`} size={32} />
              </div>
              <p className={`${textPrimary} text-lg font-medium mb-2`}>No contacts found</p>
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
                      Contact Person
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Company
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Lead Source
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Priority
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Email
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Mobile
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary} uppercase tracking-wider`}>
                      Next Follow-up
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
                          {item.contactPerson}
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${textPrimary}`}>
                        <div className="flex items-center gap-2">
                          <Building size={14} className={textSecondary} />
                          {item.companyName}
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${textPrimary}`}>
                        {item.leadSource}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.leadPriority)}`}>
                          <Star size={12} className="mr-1" />
                          {item.leadPriority}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                        <div className="flex items-center gap-2">
                          <Mail size={14} />
                          {item.emailId}
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          {item.mobileNo}
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {item.nextFollowUpDate || 'Not set'}
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
          <div className={`${bgSecondary} rounded-2xl shadow-2xl border ${borderColor} w-full max-w-4xl max-h-[90vh] overflow-y-auto`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-semibold ${textPrimary}`}>
                  {editIndex !== null ? 'Edit Contact' : 'Add New Contact'}
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
              {/* Lead Information */}
              <div>
                <h3 className={`text-lg font-medium ${textPrimary} mb-4 flex items-center gap-2`}>
                  <Star size={20} className="text-blue-500" />
                  Lead Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Lead Source
                    </label>
                    <select
                      name="leadSource"
                      value={formData.leadSource}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select Lead Source</option>
                      {leadSources.map((source) => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Lead For
                    </label>
                    <select
                      name="leadFor"
                      value={formData.leadFor}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select Lead For</option>
                      {leadForOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Lead Priority
                    </label>
                    <select
                      name="leadPriority"
                      value={formData.leadPriority}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select Priority</option>
                      {leadPriorities.map((priority) => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className={`text-lg font-medium ${textPrimary} mb-4 flex items-center gap-2`}>
                  <User size={20} className="text-green-500" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter contact person name"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      <Building size={16} className="inline mr-1" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      <Phone size={16} className="inline mr-1" />
                      Mobile No
                    </label>
                    <input
                      type="tel"
                      name="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      <MessageCircle size={16} className="inline mr-1" />
                      WhatsApp No
                    </label>
                    <input
                      type="tel"
                      name="whatsappNo"
                      value={formData.whatsappNo}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter WhatsApp number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      <Mail size={16} className="inline mr-1" />
                      Email ID *
                    </label>
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className={`text-lg font-medium ${textPrimary} mb-4 flex items-center gap-2`}>
                  <MapPin size={20} className="text-purple-500" />
                  Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
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
                      <Globe size={16} className="inline mr-1" />
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter state"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter city"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>
              </div>

              {/* Reference Information */}
              <div>
                <h3 className={`text-lg font-medium ${textPrimary} mb-4 flex items-center gap-2`}>
                  <Users size={20} className="text-orange-500" />
                  Reference Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Reference Person Name
                    </label>
                    <input
                      type="text"
                      name="referencePersonName"
                      value={formData.referencePersonName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter reference person name"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Reference Person Mobile
                    </label>
                    <input
                      type="tel"
                      name="referencePersonMobile"
                      value={formData.referencePersonMobile}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter reference person mobile"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className={`text-lg font-medium ${textPrimary} mb-4 flex items-center gap-2`}>
                  <FileText size={20} className="text-indigo-500" />
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      <Camera size={16} className="inline mr-1" />
                      Upload Business Card
                    </label>
                    <input
                      type="file"
                      name="businessCard"
                      accept="image/*"
                      onChange={(e) => setFormData(prev => ({ ...prev, businessCard: e.target.files[0]?.name || '' }))}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      WhatsApp Template
                    </label>
                    <select
                      name="whatsappTemplate"
                      value={formData.whatsappTemplate}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select Template</option>
                      {whatsappTemplates.map((template) => (
                        <option key={template} value={template}>{template}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      <UserCheck size={16} className="inline mr-1" />
                      Contact Allocation
                    </label>
                    <select
                      name="contactAllocation"
                      value={formData.contactAllocation}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select Allocation</option>
                      {contactAllocations.map((allocation) => (
                        <option key={allocation} value={allocation}>{allocation}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      <Calendar size={16} className="inline mr-1" />
                      Next Follow-up Date
                    </label>
                    <input
                      type="date"
                      name="nextFollowUpDate"
                      value={formData.nextFollowUpDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Remark
                    </label>
                    <textarea
                      name="remark"
                      value={formData.remark}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgSecondary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none`}
                      placeholder="Enter remarks or notes"
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
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.contactPerson.trim() || !formData.emailId.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={20} />
                  )}
                  {editIndex !== null ? 'Update Contact' : 'Save Contact'}
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
                Are you sure you want to delete "{deleteIndex !== null ? list[deleteIndex]?.contactPerson : ''}"? This action cannot be undone.
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