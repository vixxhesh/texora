import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Calendar, Clock, AlertCircle, CheckCircle, ArrowUpCircle } from 'lucide-react';

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  // Mock tasks data - replace with API call
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const mockTasks = [
          {
            id: 1,
            title: 'Complete System Analysis',
            description: 'Analyze and document the current system architecture',
            status: 'in-progress',
            priority: 'high',
            deadline: '2024-01-25',
            assignedBy: 'John Manager',
            assignedDate: '2024-01-15',
          },
          {
            id: 2,
            title: 'Update Documentation',
            description: 'Review and update user documentation for new features',
            status: 'pending',
            priority: 'medium',
            deadline: '2024-01-30',
            assignedBy: 'Sarah Lead',
            assignedDate: '2024-01-16',
          },
          {
            id: 3,
            title: 'Bug Fixes',
            description: 'Fix reported issues in the login module',
            status: 'completed',
            priority: 'high',
            deadline: '2024-01-20',
            assignedBy: 'Mike Tech',
            assignedDate: '2024-01-14',
          },
        ];
        setTasks(mockTasks);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-red-500/10 text-red-500`;
      case 'medium':
        return `${baseClasses} bg-yellow-500/10 text-yellow-500`;
      case 'low':
        return `${baseClasses} bg-green-500/10 text-green-500`;
      default:
        return `${baseClasses} bg-gray-500/10 text-gray-500`;
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const handleStatusUpdate = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Assigned Tasks</h1>
          <p className="text-gray-400 mt-2">Manage and track your assigned tasks</p>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400">Total Tasks</p>
                <p className="text-2xl font-bold text-white mt-1">{tasks.length}</p>
              </div>
              <ArrowUpCircle className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          {['pending', 'in-progress', 'completed'].map((status) => (
            <div key={status} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400">{status.charAt(0).toUpperCase() + status.slice(1)}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {tasks.filter(t => t.status === status).length}
                  </p>
                </div>
                {getStatusIcon(status)}
              </div>
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="flex space-x-4 bg-gray-800 p-4 rounded-lg border border-gray-700">
          {['all', 'pending', 'in-progress', 'completed'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg ${
                filter === filterOption
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(task.status)}
                      <h3 className="text-lg font-medium text-white">{task.title}</h3>
                      <span className={getPriorityBadge(task.priority)}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-gray-400">{task.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Due: {task.deadline}
                      </div>
                      <div>
                        Assigned by: {task.assignedBy}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {task.status !== 'completed' && (
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AssignedTasks;