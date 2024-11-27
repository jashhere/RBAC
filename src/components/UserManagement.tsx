import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { User } from '../types/auth';
import { Pencil, Trash2, X, Check, UserCog } from 'lucide-react';

export const UserManagement = () => {
  const { users, deleteUser, updateUser, user: currentUser } = useAuthStore();
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  const handleDelete = (id: string) => {
    try {
      deleteUser(id);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error deleting user');
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user.id);
    setEditForm(user);
  };

  const handleUpdate = (id: string) => {
    updateUser(id, editForm);
    setEditingUser(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({});
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 flex items-center">
        <UserCog className="h-6 w-6 text-gray-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">User Management</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {users.filter(u => u.id !== currentUser?.id).map(user => (
            <li key={user.id} className="px-4 py-4">
              {editingUser === user.id ? (
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={editForm.email || ''}
                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Email"
                  />
                  <select
                    value={editForm.role || user.role}
                    onChange={e => setEditForm({ ...editForm, role: e.target.value as User['role'] })}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="p-2 text-green-600 hover:text-green-800"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    <p className="text-sm text-gray-500">Role: {user.role}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};