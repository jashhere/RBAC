import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { User, Settings, Users, Shield } from 'lucide-react';
import { Header } from '../components/Header';
import { UserManagement } from '../components/UserManagement';

export const Dashboard = () => {
  const { user } = useAuthStore();

  const AdminContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-100 p-6 rounded-lg">
          <Users className="h-8 w-8 text-purple-600 mb-2" />
          <h3 className="text-lg font-semibold">User Management</h3>
          <p>Manage user accounts and permissions</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <Shield className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="text-lg font-semibold">Security Settings</h3>
          <p>Configure system security parameters</p>
        </div>
      </div>
      
      <UserManagement />
    </div>
  );

  const UserContent = () => (
    <div className="bg-blue-100 p-6 rounded-lg">
      <Settings className="h-8 w-8 text-blue-600 mb-2" />
      <h3 className="text-lg font-semibold">User Settings</h3>
      <p>Manage your account preferences</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200 pb-5 mb-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-gray-600 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h2>
                <p className="text-sm text-gray-500">Role: {user?.role}</p>
              </div>
            </div>
          </div>

          {user?.role === 'admin' ? <AdminContent /> : <UserContent />}
        </div>
      </div>
    </div>
  );
};