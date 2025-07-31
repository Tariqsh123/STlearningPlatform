'use client';

import { useState } from 'react';
import { Menu, X, Plus, Trash2, Pencil } from 'lucide-react';

const menuItems = [
  { label: 'Students' },
  { label: 'Courses' },
  { label: 'Student Fees' },
  { label: 'School Payouts' },
];

const colors = {
  primary: '#1E293B',
  accent: '#0EA5E9',
  background: '#F1F5F9',
  container: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  textSecondary: '#64748B',
  hover: '#0284C7',
  error: '#DC2626',
};

const inputClass = `w-full px-4 py-2 border border-[${colors.border}] rounded focus:outline-none focus:ring-2 focus:ring-[${colors.accent}] transition`;

const generatePassword = (existingPasswords, length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let password = '';
  let attempts = 0;

  do {
    password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    attempts++;
    if (attempts > 100) break;
  } while (existingPasswords.includes(password));

  return password;
};

export default function SchoolDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Students');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [rowsData, setRowsData] = useState({
    Students: [],
    Courses: [],
    'Student Fees': [],
    'School Payouts': [],
  });

  const openModal = () => {
    setModalOpen(true);
    setIsEditing(false);
    setEditIndex(null);
    setFormData({});
  };

  const openEditModal = (rowData, index) => {
    setModalOpen(true);
    setIsEditing(true);
    setEditIndex(index);
    if (activeTab === 'Students') {
      setFormData({
        fullName: rowData[1],
        schoolName: rowData[2],
        email: rowData[3],
        phone: rowData[4],
        course: rowData[5],
        duration: rowData[6],
      });
    } else if (activeTab === 'Student Fees') {
      setFormData({
        school: rowData[0],
        student: rowData[1],
        course: rowData[2],
        duration: rowData[3],
        fee: rowData[4],
        status: rowData[5],
      });
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({});
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRows = { ...rowsData };

    if (activeTab === 'Students') {
      const existingPasswords = rowsData.Students.map(row => row[9]);
      const newPassword = generatePassword(existingPasswords);
      const newRow = [
        (rowsData.Students.length + 1).toString(),
        formData.fullName || '',
        formData.schoolName || '',
        formData.email || '',
        formData.phone || '',
        formData.course || '',
        formData.duration || '',
        '0',
        `STU${100 + rowsData.Students.length}`,
        newPassword,
      ];
      if (isEditing && editIndex !== null) {
        updatedRows.Students[editIndex] = newRow;
      } else {
        updatedRows.Students.push(newRow);
      }
    } else if (activeTab === 'Student Fees') {
      const newRow = [
        formData.school || '',
        formData.student || '',
        formData.course || '',
        formData.duration || '',
        formData.fee || '',
        formData.status || '',
      ];
      if (isEditing && editIndex !== null) {
        updatedRows['Student Fees'][editIndex] = newRow;
      } else {
        updatedRows['Student Fees'].push(newRow);
      }
    }

    setRowsData(updatedRows);
    closeModal();
  };

  const deleteRow = (index) => {
    const updated = { ...rowsData };
    updated[activeTab] = rowsData[activeTab].filter((_, i) => i !== index);
    setRowsData(updated);
  };

  const tableHeaders = {
    Students: ['ID', 'Full Name', 'School Name', 'Email', 'Phone', 'Course Name', 'Duration', 'Remaining Months', 'Log In ID', 'Password', 'Action'],
    Courses: ['ID', 'Course Name', 'Duration', 'Fees', 'Total Students'],
    'Student Fees': ['School Name', 'Student Name', 'Course', 'Duration', 'Fee', 'Status', 'Action'],
    'School Payouts': ['School Name', 'Total Students', 'Phone', 'Payout', 'Status'],
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case 'Students':
        return (
          <>
            <input placeholder="Full Name" value={formData.fullName || ''} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={inputClass} />
            <input placeholder="School Name" value={formData.schoolName || ''} onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })} className={inputClass} />
            <input placeholder="Email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
            <input placeholder="Phone" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
            <input placeholder="Course Name" value={formData.course || ''} onChange={(e) => setFormData({ ...formData, course: e.target.value })} className={inputClass} />
            <input placeholder="Duration" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className={inputClass} />
            <input placeholder="Remaining Months" value="0" readOnly className={inputClass} />
          </>
        );
      case 'Student Fees':
        return (
          <>
            <input placeholder="School" value={formData.school || ''} onChange={(e) => setFormData({ ...formData, school: e.target.value })} className={inputClass} />
            <input placeholder="Student" value={formData.student || ''} onChange={(e) => setFormData({ ...formData, student: e.target.value })} className={inputClass} />
            <input placeholder="Course" value={formData.course || ''} onChange={(e) => setFormData({ ...formData, course: e.target.value })} className={inputClass} />
            <input placeholder="Duration" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className={inputClass} />
            <input placeholder="Fee" value={formData.fee || ''} onChange={(e) => setFormData({ ...formData, fee: e.target.value })} className={inputClass} />
            <input placeholder="Status (Paid/Pending)" value={formData.status || ''} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className={inputClass} />
          </>
        );
      default:
        return null;
    }
  };

  const getFilteredRows = () => {
    const rows = rowsData[activeTab] || [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) =>
      row.some((cell) => cell?.toString().toLowerCase().includes(query))
    );
  };

  const calculateCommission = () => {
    if (activeTab === 'Students' || activeTab === 'School Payouts') {
      return `${rowsData.Students.length * 50} Rs`;
    }
    return '0 Rs';
  };

  const renderTable = () => {
    let headers = tableHeaders[activeTab] || [];
    const rows = getFilteredRows();

    if (activeTab === 'Courses' || activeTab === 'School Payouts') {
      headers = headers.filter(header => header !== 'Action');
    }

    return (
      <div className="overflow-x-auto mt-6">
        <table className="w-full table-auto border text-sm" style={{ color: colors.text }}>
          <thead style={{ backgroundColor: colors.border }}>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="px-4 py-2 border" style={{ borderColor: colors.border }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-4 border text-center" style={{ borderColor: colors.border, color: colors.textSecondary }}>
                  No Data
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-[#F1F5F9]">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2 border" style={{ borderColor: colors.border }}>{cell}</td>
                  ))}
                  {(activeTab === 'Students' || activeTab === 'Student Fees') && (
                    <td className="px-4 py-2 border flex gap-2" style={{ borderColor: colors.border }}>
                      <button className="text-blue-600 hover:text-blue-800" onClick={() => openEditModal(row, rowIndex)}>
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800" onClick={() => deleteRow(rowIndex)}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex font-sans" style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* Sidebar */}
     <div
  className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#1e293b] border-r p-5 transition-transform transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:block text-white`}
  style={{ borderColor: colors.border }}
>
  <div className="flex items-center justify-between mb-10 md:hidden">
    <h2 className="text-xl font-bold">School Panel</h2>
    <button onClick={() => setSidebarOpen(false)}>
      <X className="w-6 h-6 text-white" />
    </button>
  </div>
  <h2 className="text-2xl font-bold mb-8 hidden md:block">School Panel</h2>
  <nav className="space-y-3">
    {menuItems.map((item, idx) => (
      <button
        key={idx}
        className={`block w-full text-left py-2 px-4 rounded-lg transition ${
          activeTab === item.label ? 'bg-[#0EA5E9]' : 'hover:bg-[#334155]'
        }`}
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


      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="w-full px-6 py-4 border-b flex items-center justify-between" style={{ backgroundColor: colors.container, borderColor: colors.border }}>
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold hidden md:block">Welcome, Sunrise School</h1>
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage all {activeTab.toLowerCase()} from here.</h2>
            {(activeTab === 'Students' || activeTab === 'Student Fees') && (
              <button className="flex items-center gap-2 px-4 py-2 rounded text-white" style={{ backgroundColor: colors.accent }} onClick={openModal}>
                <Plus className="w-4 h-4" /> Add {activeTab === 'Student Fees' ? 'Student Fee' : 'Student'}
              </button>
            )}
          </div>

          {(activeTab === 'Students' || activeTab === 'School Payouts') && (
            <div className="mb-4 p-4 rounded-lg text-lg font-medium" style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}` }}>
              Commission: <span className="font-semibold text-[#0EA5E9]">{calculateCommission()}</span>
            </div>
          )}

          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 border rounded-md w-full"
              style={{ borderColor: colors.border }}
            />
          </div>

          {renderTable()}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {isEditing ? 'Edit' : 'Add'} {activeTab === 'Student Fees' ? 'Fee' : 'Student'}
              </h3>
              <button onClick={closeModal}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {renderFormFields()}
              <button type="submit" className="w-full py-2 rounded text-white" style={{ backgroundColor: colors.accent }}>
                {isEditing ? 'Update' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
