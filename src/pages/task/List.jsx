import { useState, useEffect } from 'react';
import { 
  Save, 
  X, 
  Calendar, 
  User, 
  Tag, 
  Users, 
  FileText,
  AlertCircle,
  Clock,
  CalendarX,
  Phone,
  CheckSquare,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  SortAsc,
  SortDesc
} from 'lucide-react';

export default function List() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    contact: '',
    startDate: '',
    dueDate: '',
    noDueDate: false,
    assignedTo: [],
    description: '',
    priority: 'medium',
    status: 'pending'
  });

  // Sample existing tasks data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design new landing page',
      category: 2, // Design
      contact: 2, // Jane Smith
      startDate: '2025-08-01',
      dueDate: '2025-08-15',
      assignedTo: [2, 3], // Bob Wilson, Carol Davis
      description: '<p>Create a modern, responsive landing page for the new product launch.</p>',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2025-07-25'
    },
    {
      id: 2,
      title: 'Implement user authentication',
      category: 1, // Development
      contact: 1, // John Doe
      startDate: '2025-07-28',
      dueDate: '2025-08-10',
      assignedTo: [1, 6], // Alice Cooper, Frank Miller
      description: '<p>Implement secure user authentication system with <strong>JWT tokens</strong> and password encryption.</p>',
      priority: 'urgent',
      status: 'pending',
      createdAt: '2025-07-20'
    },
    {
      id: 3,
      title: 'Market research analysis',
      category: 4, // Research
      contact: 4, // Sarah Wilson
      startDate: '2025-07-15',
      dueDate: '2025-07-30',
      assignedTo: [5], // Eva Garcia
      description: '<p>Conduct comprehensive market research for Q3 product strategy.</p>',
      priority: 'medium',
      status: 'completed',
      createdAt: '2025-07-10'
    },
    {
      id: 4,
      title: 'Mobile app testing',
      category: 5, // Testing
      contact: 5, // David Brown
      startDate: '2025-08-01',
      dueDate: '',
      noDueDate: true,
      assignedTo: [4], // Daniel Lee
      description: '<p>Comprehensive testing of mobile application across different devices.</p>',
      priority: 'low',
      status: 'pending',
      createdAt: '2025-07-30'
    },
    {
      id: 5,
      title: 'SEO optimization',
      category: 3, // Marketing
      contact: 3, // Mike Johnson
      startDate: '2025-07-20',
      dueDate: '2025-08-05',
      assignedTo: [3], // Carol Davis
      description: '<p>Optimize website for search engines and improve organic traffic.</p>',
      priority: 'medium',
      status: 'review',
      createdAt: '2025-07-18'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  
  // List view states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

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

  // Sample data for dropdowns
  const categories = [
    { id: 1, name: 'Development', color: '#3B82F6' },
    { id: 2, name: 'Design', color: '#10B981' },
    { id: 3, name: 'Marketing', color: '#F59E0B' },
    { id: 4, name: 'Research', color: '#8B5CF6' },
    { id: 5, name: 'Testing', color: '#EF4444' }
  ];

  const contacts = [
    { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Tech Corp' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Design Studio' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', company: 'Marketing Inc' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', company: 'Research Lab' },
    { id: 5, name: 'David Brown', email: 'david@example.com', company: 'Testing Solutions' }
  ];

  const teamMembers = [
    { id: 1, name: 'Alice Cooper', role: 'Developer', avatar: '#3B82F6' },
    { id: 2, name: 'Bob Wilson', role: 'Designer', avatar: '#10B981' },
    { id: 3, name: 'Carol Davis', role: 'Manager', avatar: '#F59E0B' },
    { id: 4, name: 'Daniel Lee', role: 'Tester', avatar: '#8B5CF6' },
    { id: 5, name: 'Eva Garcia', role: 'Analyst', avatar: '#EF4444' },
    { id: 6, name: 'Frank Miller', role: 'Developer', avatar: '#06B6D4' }
  ];

  // Theme classes
  const bgPrimary = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const bgSecondary = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const bgTertiary = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const textPrimary = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverBg = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  // Helper functions
  const getCategoryById = (id) => categories.find(cat => cat.id === id);
  const getContactById = (id) => contacts.find(contact => contact.id === id);
  const getTeamMemberById = (id) => teamMembers.find(member => member.id === id);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'review': return 'text-purple-600 bg-purple-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const overdueTasks = tasks.filter(task => isOverdue(task.dueDate)).length;

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || task.category.toString() === filterCategory;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  }).sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'dueDate':
        aValue = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
        bValue = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
        break;
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority] || 0;
        bValue = priorityOrder[b.priority] || 0;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        aValue = a[sortBy];
        bValue = b[sortBy];
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear due date if no due date is checked
    if (name === 'noDueDate' && checked) {
      setFormData(prev => ({
        ...prev,
        dueDate: ''
      }));
    }

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAssignedToChange = (memberId) => {
    setFormData(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(memberId)
        ? prev.assignedTo.filter(id => id !== memberId)
        : [...prev.assignedTo, memberId]
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.noDueDate && !formData.dueDate) {
      newErrors.dueDate = 'Due date is required or check "No due date"';
    }

    if (formData.startDate && formData.dueDate && new Date(formData.startDate) > new Date(formData.dueDate)) {
      newErrors.dueDate = 'Due date must be after start date';
    }

    if (formData.assignedTo.length === 0) {
      newErrors.assignedTo = 'Please assign at least one team member';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new task
      const newTask = {
        id: tasks.length + 1,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        category: parseInt(formData.category),
        contact: formData.contact ? parseInt(formData.contact) : null
      };
      
      setTasks(prev => [newTask, ...prev]);
      console.log('Task created:', newTask);
      
      // Reset form after successful submission
      resetForm();
      alert('Task created successfully!');
      setCurrentView('list');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      contact: '',
      startDate: '',
      dueDate: '',
      noDueDate: false,
      assignedTo: [],
      description: '',
      priority: 'medium',
      status: 'pending'
    });
    setErrors({});
    setShowForm(false);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Simple rich text editor component
  const RichTextEditor = ({ value, onChange }) => {
    const [content, setContent] = useState(value);
    const [activeFormat, setActiveFormat] = useState({});

    const handleFormat = (command) => {
      document.execCommand(command, false, null);
      setActiveFormat(prev => ({
        ...prev,
        [command]: !prev[command]
      }));
    };

    const handleContentChange = (e) => {
      const newContent = e.target.innerHTML;
      setContent(newContent);
      onChange(newContent);
    };

    return (
      <div className={`border ${borderColor} rounded-lg overflow-hidden`}>
        {/* Toolbar */}
        <div className={`${bgTertiary} px-3 py-2 border-b ${borderColor} flex flex-wrap gap-1`}>
          <button
            type="button"
            onClick={() => handleFormat('bold')}
            className={`px-2 py-1 text-sm rounded ${activeFormat.bold ? 'bg-blue-500 text-white' : `${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}`}
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => handleFormat('italic')}
            className={`px-2 py-1 text-sm rounded ${activeFormat.italic ? 'bg-blue-500 text-white' : `${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}`}
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => handleFormat('underline')}
            className={`px-2 py-1 text-sm rounded ${activeFormat.underline ? 'bg-blue-500 text-white' : `${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}`}
          >
            <u>U</u>
          </button>
          <div className="w-px bg-gray-300 mx-1"></div>
          <button
            type="button"
            onClick={() => handleFormat('insertUnorderedList')}
            className={`px-2 py-1 text-sm rounded ${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => handleFormat('insertOrderedList')}
            className={`px-2 py-1 text-sm rounded ${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
          >
            1. List
          </button>
        </div>
        {/* Editor */}
        <div
          contentEditable
          onInput={handleContentChange}
          className={`p-4 min-h-[120px] ${bgSecondary} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          style={{ wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  };

  return (
    <div className={`min-h-screen p-6 ${bgPrimary} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>Task Management</h1>
              <p className={`${textSecondary}`}>Create and manage your tasks efficiently</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentView('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentView === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : `${bgTertiary} ${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`
                }`}
              >
                <FileText size={20} />
                View Tasks
              </button>
              <button
                onClick={() => setCurrentView('create')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentView === 'create' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <Plus size={20} />
                Add New Task
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>Total Tasks</p>
                <p className={`${textPrimary} text-3xl font-bold`}>{totalTasks}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <FileText className="text-blue-500" size={24} />
              </div>
            </div>
          </div>
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>In Progress</p>
                <p className={`${textPrimary} text-3xl font-bold text-orange-500`}>{inProgressTasks}</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Clock className="text-orange-500" size={24} />
              </div>
            </div>
          </div>
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>Completed</p>
                <p className={`${textPrimary} text-3xl font-bold text-green-500`}>{completedTasks}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CheckSquare className="text-green-500" size={24} />
              </div>
            </div>
          </div>
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${textSecondary} text-sm`}>Overdue</p>
                <p className={`${textPrimary} text-3xl font-bold text-red-500`}>{overdueTasks}</p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-lg">
                <AlertCircle className="text-red-500" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {currentView === 'list' ? (
          <>
            {/* Search and Filters */}
            <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor} p-6`}>
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary}`} size={20} />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
                
                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${borderColor} ${bgTertiary} ${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} transition-colors duration-150`}
                >
                  <Filter size={20} />
                  Filters
                </button>
                
                {/* Sort */}
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className={`px-4 py-3 rounded-lg border ${borderColor} ${bgTertiary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="dueDate-asc">Due Date (Earliest)</option>
                  <option value="dueDate-desc">Due Date (Latest)</option>
                  <option value="title-asc">Title (A-Z)</option>
                  <option value="title-desc">Title (Z-A)</option>
                  <option value="priority-desc">Priority (High-Low)</option>
                  <option value="priority-asc">Priority (Low-High)</option>
                </select>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Status</label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border ${borderColor} ${bgTertiary} ${textPrimary} focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="review">Under Review</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Priority</label>
                      <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border ${borderColor} ${bgTertiary} ${textPrimary} focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="all">All Priorities</option>
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Category</label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border ${borderColor} ${bgTertiary} ${textPrimary} focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id.toString()}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tasks List */}
            <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor}`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className={`text-xl font-semibold ${textPrimary}`}>
                  Tasks ({filteredTasks.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTasks.length === 0 ? (
                  <div className="p-8 text-center">
                    <FileText className={`mx-auto mb-4 ${textSecondary}`} size={48} />
                    <p className={`${textSecondary} text-lg`}>No tasks found</p>
                    <p className={`${textSecondary} text-sm mt-2`}>
                      {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' || filterCategory !== 'all' 
                        ? 'Try adjusting your search or filters' 
                        : 'Create your first task to get started'}
                    </p>
                  </div>
                ) : (
                  filteredTasks.map(task => {
                    const category = getCategoryById(task.category);
                    const contact = getContactById(task.contact);
                    const assignedMembers = task.assignedTo.map(id => getTeamMemberById(id)).filter(Boolean);
                    
                    return (
                      <div key={task.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className={`text-lg font-semibold ${textPrimary} truncate`}>
                                {task.title}
                              </h3>
                              
                              {/* Priority Badge */}
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </span>
                              
                              {/* Status Badge */}
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                                {task.status === 'in-progress' ? 'In Progress' : 
                                 task.status === 'review' ? 'Under Review' : 
                                 task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                              </span>
                              
                              {/* Overdue Badge */}
                              {isOverdue(task.dueDate) && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full text-red-600 bg-red-100">
                                  Overdue
                                </span>
                              )}
                            </div>
                            
                            {/* Task Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Tag size={14} className={textSecondary} />
                                <span className={textSecondary}>Category:</span>
                                <span 
                                  className="px-2 py-1 rounded text-white text-xs font-medium"
                                  style={{ backgroundColor: category?.color }}
                                >
                                  {category?.name}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Calendar size={14} className={textSecondary} />
                                <span className={textSecondary}>Due:</span>
                                <span className={`${textPrimary} ${isOverdue(task.dueDate) ? 'text-red-600 font-medium' : ''}`}>
                                  {formatDate(task.dueDate)}
                                </span>
                              </div>
                              
                              {contact && (
                                <div className="flex items-center gap-2">
                                  <Phone size={14} className={textSecondary} />
                                  <span className={textSecondary}>Contact:</span>
                                  <span className={textPrimary}>{contact.name}</span>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-2">
                                <Users size={14} className={textSecondary} />
                                <span className={textSecondary}>Assigned:</span>
                                <div className="flex -space-x-1">
                                  {assignedMembers.slice(0, 3).map(member => (
                                    <div
                                      key={member.id}
                                      className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                                      style={{ backgroundColor: member.avatar }}
                                      title={member.name}
                                    >
                                      {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                  ))}
                                  {assignedMembers.length > 3 && (
                                    <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                                      +{assignedMembers.length - 3}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Description Preview */}
                            {task.description && (
                              <div className="mt-3">
                                <div 
                                  className={`${textSecondary} text-sm line-clamp-2`}
                                  dangerouslySetInnerHTML={{ 
                                    __html: task.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-4">
                            {/* Status Quick Change */}
                            <select
                              value={task.status}
                              onChange={(e) => handleStatusChange(task.id, e.target.value)}
                              className={`px-2 py-1 text-xs rounded border ${borderColor} ${bgTertiary} ${textPrimary} focus:ring-1 focus:ring-blue-500`}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="review">Under Review</option>
                              <option value="completed">Completed</option>
                            </select>
                            
                            {/* More Actions */}
                            <div className="relative group">
                              <button className={`p-2 rounded-lg ${hoverBg} transition-colors duration-150`}>
                                <MoreVertical size={16} className={textSecondary} />
                              </button>
                              <div className={`absolute right-0 top-8 w-48 ${bgSecondary} rounded-lg shadow-lg border ${borderColor} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10`}>
                                <div className="py-2">
                                  <button className={`w-full px-4 py-2 text-left text-sm ${textPrimary} hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center gap-2`}>
                                    <Eye size={14} />
                                    View Details
                                  </button>
                                  <button className={`w-full px-4 py-2 text-left text-sm ${textPrimary} hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center gap-2`}>
                                    <Edit size={14} />
                                    Edit Task
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteTask(task.id)}
                                    className={`w-full px-4 py-2 text-left text-sm text-red-600 hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center gap-2`}
                                  >
                                    <Trash2 size={14} />
                                    Delete Task
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        ) : (
          /* Task Creation Form */
          <div className={`${bgSecondary} rounded-2xl shadow-lg border ${borderColor}`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-semibold ${textPrimary}`}>
                  Create New Task
                </h2>
                <button
                  onClick={() => setCurrentView('list')}
                  className={`p-2 ${hoverBg} rounded-lg transition-colors duration-150`}
                >
                  <X className={`${textSecondary}`} size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Task Title */}
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                  <FileText size={16} className="inline mr-2" />
                  Task Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-red-500' : borderColor} ${bgPrimary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter task title"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    <Tag size={16} className="inline mr-2" />
                    Task Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.category ? 'border-red-500' : borderColor} ${bgPrimary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    <Phone size={16} className="inline mr-2" />
                    Contact
                  </label>
                  <select
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select a contact (optional)</option>
                    {contacts.map(contact => (
                      <option key={contact.id} value={contact.id}>
                        {contact.name} - {contact.company}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    <Calendar size={16} className="inline mr-2" />
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.startDate ? 'border-red-500' : borderColor} ${bgPrimary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    <Clock size={16} className="inline mr-2" />
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    disabled={formData.noDueDate}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.dueDate ? 'border-red-500' : borderColor} ${bgPrimary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-all duration-200`}
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="noDueDate"
                      name="noDueDate"
                      checked={formData.noDueDate}
                      onChange={handleChange}
                      className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="noDueDate" className={`text-sm ${textSecondary} flex items-center gap-1`}>
                      <CalendarX size={14} />
                      No due date
                    </label>
                  </div>
                  {errors.dueDate && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.dueDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    <CheckSquare size={16} className="inline mr-2" />
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Under Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Assigned To */}
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                  <Users size={16} className="inline mr-2" />
                  Assigned To * (Multiple selection allowed)
                </label>
                <div className={`p-4 border ${errors.assignedTo ? 'border-red-500' : borderColor} rounded-lg ${bgTertiary} max-h-48 overflow-y-auto`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {teamMembers.map(member => (
                      <label key={member.id} className={`flex items-center gap-3 p-3 rounded-lg ${hoverBg} cursor-pointer transition-colors duration-150`}>
                        <input
                          type="checkbox"
                          checked={formData.assignedTo.includes(member.id)}
                          onChange={() => handleAssignedToChange(member.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div className="flex items-center gap-2 flex-1">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                            style={{ backgroundColor: member.avatar }}
                          >
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${textPrimary}`}>{member.name}</p>
                            <p className={`text-xs ${textSecondary}`}>{member.role}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                {errors.assignedTo && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.assignedTo}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                  Description
                </label>
                <RichTextEditor 
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={20} />
                  )}
                  {isLoading ? 'Creating Task...' : 'Create Task'}
                </button>
                <button
                  onClick={() => setCurrentView('list')}
                  className={`px-6 py-3 rounded-lg border ${borderColor} ${bgTertiary} ${textSecondary} hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} transition-all duration-200 font-medium`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}