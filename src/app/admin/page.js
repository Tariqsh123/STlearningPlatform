'use client';

import { useState } from 'react';
import { Menu, X, Plus, Trash2, Pencil } from 'lucide-react';

const menuItems = [
  { label: 'Schools' },
  { label: 'Students' },
  { label: 'Courses' },
  { label: 'Student Fees' },
  { label: 'School Payouts' },
];

const inputClass = `w-full px-4 py-2 border border-[#E2E8F0] rounded focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] transition`;

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Schools');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [dataRows, setDataRows] = useState({
    Schools: [],
    Students: [],
    Courses: [],
    'Student Fees': [],
    'School Payouts': [],
  });

  const tableHeaders = {
    Schools: ['ID', 'School Name', 'Principal Name', 'Email', 'Phone', 'Log In ID', 'Password', 'Total Students', 'Commission', 'Action'],
    Students: ['ID', 'Full Name', 'School Name', 'Email', 'Phone', 'Course Name', 'Duration', 'Remaining Months', 'Log In ID', 'Password', 'Action'],
    Courses: ['ID', 'Course Name', 'Duration', 'Fees', 'Total Students', 'Action'],
    'Student Fees': ['School Name', 'Student Name', 'Course', 'Duration', 'Fee', 'Status', 'Action'],
    'School Payouts': ['School Name', 'Total Students', 'Phone', 'Payout', 'Status', 'Action'],
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const openModal = (edit = false, index = null, row = null) => {
    setIsEditing(edit);
    setEditIndex(index);

    const headers = tableHeaders[activeTab];
    const initialForm = {};

    headers.forEach((key, idx) => {
      if (key !== 'Action') {
        initialForm[key] = edit && row ? row[idx] : '';
      }
    });

    if (!edit) {
      if (headers.includes('ID')) initialForm['ID'] = (dataRows[activeTab].length + 1).toString();

      if (headers.includes('Log In ID')) {
        const prefix = activeTab === 'Schools' ? 'SCH' : activeTab === 'Students' ? 'STU' : 'USR';
        initialForm['Log In ID'] = `${prefix}${Math.floor(100 + Math.random() * 900)}`;
      }

      if (headers.includes('Password')) initialForm['Password'] = generateRandomPassword();
      if (headers.includes('Total Students')) initialForm['Total Students'] = '0';
      if (headers.includes('Commission')) initialForm['Commission'] = '0';

      if (activeTab === 'Students' && headers.includes('Remaining Months')) {
        initialForm['Remaining Months'] = '0';
      }
    }

    setFormData(initialForm);
    setModalOpen(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setEditIndex(null);
    setFormData({});
    setModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = [...dataRows[activeTab]];

    if (isEditing && editIndex !== null) {
      updatedData[editIndex] = Object.values(formData);
    } else {
      updatedData.push(Object.values(formData));
    }

    setDataRows(prev => ({ ...prev, [activeTab]: updatedData }));
    closeModal();
  };

  const handleDelete = (index) => {
    const updated = dataRows[activeTab].filter((_, i) => i !== index);
    setDataRows(prev => ({ ...prev, [activeTab]: updated }));
  };

  const getFilteredRows = () => {
    const query = searchQuery.trim().toLowerCase();
    const rows = dataRows[activeTab] || [];
    return !query ? rows : rows.filter(row =>
      row.some(cell => cell?.toString().toLowerCase().includes(query))
    );
  };

  const renderFormFields = () => {
    const hiddenFields = ['ID', 'Log In ID', 'Password', 'Total Students'];
    const readOnlyFields = ['Remaining Months'];
    const headers = tableHeaders[activeTab].filter(key => key !== 'Action');

    return headers.map((key, idx) => {
      if (hiddenFields.includes(key)) return null;

      const readOnly = readOnlyFields.includes(key);
      return (
        <input
          key={idx}
          placeholder={key}
          className={`${inputClass} ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          value={formData[key] || ''}
          readOnly={readOnly}
          onChange={(e) => {
            if (!readOnly) {
              setFormData(prev => ({ ...prev, [key]: e.target.value }));
            }
          }}
        />
      );
    });
  };

  const renderTable = () => {
    const headers = tableHeaders[activeTab] || [];
    const rows = getFilteredRows();

    return (
      <div className="overflow-x-auto mt-6">
        <table className="w-full table-auto border text-left text-sm text-[#0F172A]">
          <thead className="bg-[#E2E8F0] text-[#0F172A]">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="px-4 py-2 border">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-4 text-center border text-gray-400 italic">
                  No Data
                </td>
              </tr>
            ) : rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-[#F1F5F9]">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2 border">{cell}</td>
                ))}
                <td className="px-4 py-2 border flex gap-2">
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(rowIndex)}>
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {activeTab !== 'Students' && (
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => openModal(true, rowIndex, row)}>
                      <Pencil className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-[#FFFFFF] text-[#0F172A] font-sans">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#E2E8F0] p-5 transition-transform transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:block`}>
        <div className="flex items-center justify-between mb-10 md:hidden">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-8 hidden md:block">Admin Panel</h2>
        <nav className="space-y-3">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`block w-full text-left py-2 px-4 rounded-lg transition ${activeTab === item.label ? 'bg-[#0EA5E9] text-white' : 'hover:bg-[#E2E8F0]'}`}
              onClick={() => {
                setActiveTab(item.label);
                setModalOpen(false);
                setSearchQuery('');
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="w-full px-6 py-4 border-b border-[#E2E8F0] bg-white flex items-center justify-between">
          <button className="text-[#0F172A] md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold hidden md:block">Welcome, Admin</h1>
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Manage all {activeTab.toLowerCase()} from here.
            </h2>

            {activeTab !== 'Students' && (
              <button
                className="flex items-center gap-2 px-4 py-2 bg-[#0EA5E9] text-white rounded hover:bg-[#0284C7]"
                onClick={() => openModal()}
              >
                <Plus className="w-4 h-4" /> Add {activeTab === 'School Payouts' ? 'Payout' : activeTab.slice(0, -1)}
              </button>
            )}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full"
          />

          {renderTable()}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {isEditing ? `Edit ${activeTab.slice(0, -1)}` : `Add ${activeTab === 'School Payouts' ? 'Payout' : activeTab.slice(0, -1)}`}
              </h3>
              <button onClick={closeModal}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              {renderFormFields()}
              <button
                type="submit"
                className="w-full bg-[#0EA5E9] text-white py-2 rounded hover:bg-[#0284C7]"
              >
                {isEditing ? 'Update' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
