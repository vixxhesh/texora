import React from 'react';
import Layout from './Layout';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const UserDashboard = () => {
  const tasks = [
    {
      id: 1,
      title: 'Complete Profile Setup',
      status: 'pending',
      deadline: '2024-01-20',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Review Documentation',
      status: 'in-progress',
      deadline: '2024-01-25',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Submit Weekly Report',
      status: 'completed',
      deadline: '2024-01-15',
      priority: 'low',
    },
  ];

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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-500';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'low':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back! Here are your tasks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Tasks</h3>
            <div className="text-3xl font-bold text-white">{tasks.length}</div>
            <p className="text-gray-400">Total assigned tasks</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Completed</h3>
            <div className="text-3xl font-bold text-white">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <p className="text-gray-400">Tasks completed</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Pending</h3>
            <div className="text-3xl font-bold text-white">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
            <p className="text-gray-400">Tasks pending</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Tasks</h3>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(task.status)}
                    <div>
                      <h4 className="text-white font-medium">{task.title}</h4>
                      <p className="text-gray-400 text-sm">
                        Due: {task.deadline}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;