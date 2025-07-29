'use client';

import { useState } from 'react';
import { Menu, X, Plus, Trash2 } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setFormData({});
  };

  const tableHeaders = {
    Schools: ['ID', 'Name', 'Email', 'Phone', 'ID', 'Password', 'Total Students', 'Action'],
    Students: ['ID', 'Name', 'Email', 'Phone', 'ID', 'Password', 'Action'],
    Courses: ['ID', 'Course Name', 'Duration', 'Enrolled', 'Action'],
  };

  const dummyRows = {
    Schools: [['1', 'Sunrise School', 'sunrise@email.com', '0300-0000000', 'SCH123', 'pass123', '600'],['3', 'School', 'sunrise@email.com', '0300-0000000', 'SCH123', 'pass123', '500'],['2', 'Sunrise School', 'sunrise@email.com', '0300-0000000', 'SCH123', 'pass123', '500']],
    Students: [['1', 'Ali Raza', 'ali@email.com', '0321-1111111', 'STU123', 'pass456']],
    Courses: [['1', 'Web Dev', '3 Months', '200']],
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case 'Schools':
        return (
          <>
            <input placeholder="School Name" className={inputClass} />
            <input placeholder="Principal Name" className={inputClass} />
            <input placeholder="Email" className={inputClass} />
            <input placeholder="Phone" className={inputClass} />
          </>
        );
      case 'Students':
        return (
          <>
            <input placeholder="Full Name" className={inputClass} />
            <input placeholder="Father Name" className={inputClass} />
            <input placeholder="School Name" className={inputClass} />
            <input placeholder="Email" className={inputClass} />
            <input placeholder="Address" className={inputClass} />
            <input placeholder="Phone" className={inputClass} />
          </>
        );
      case 'Courses':
        return (
          <>
            <input placeholder="Course Name" className={inputClass} />
            <input placeholder="Month/Duration" className={inputClass} />
            <input placeholder="About" className={inputClass} />
           <input type="file" accept="image/*" className={inputClass} onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Selected file:', file); 
    }
  }}
/>
            <input placeholder="Icon (e.g., 📘)" className={inputClass} />
          </>
        );
      default:
        return null;
    }
  };

const getFilteredRows = () => {
  const rows = dummyRows[activeTab] || [];
  const query = searchQuery.trim().toLowerCase();
  if (!query) return rows;

  return rows.filter(row =>
    row.some(cell =>
      cell?.toString().toLowerCase().includes(query)
    )
  );
};


  const renderTable = () => {
    if (activeTab === 'Student Fees') {
      return (
        <div className="overflow-x-auto mt-6">
          <table className="w-full table-auto border text-left text-sm text-[#0F172A]">
            <thead className="bg-[#E2E8F0] text-[#0F172A]">
              <tr>
                <th className="px-4 py-2 border">School</th>
                <th className="px-4 py-2 border">Student</th>
                <th className="px-4 py-2 border">Course</th>
                <th className="px-4 py-2 border">Duration</th>
                <th className="px-4 py-2 border">Fee</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#F1F5F9]">
                <td className="px-4 py-2 border">Sunrise School</td>
                <td className="px-4 py-2 border">Ali Raza</td>
                <td className="px-4 py-2 border">Web Dev</td>
                <td className="px-4 py-2 border">3 Months</td>
                <td className="px-4 py-2 border">Rs. 15,000</td>
                <td className="px-4 py-2 border text-green-600">Paid</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === 'School Payouts') {
      return (
        <div className="overflow-x-auto mt-6">
          <table className="w-full table-auto border text-left text-sm text-[#0F172A]">
            <thead className="bg-[#E2E8F0] text-[#0F172A]">
              <tr>
                <th className="px-4 py-2 border">School</th>
                <th className="px-4 py-2 border">Enroll</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Payout</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#F1F5F9]">
                <td className="px-4 py-2 border">Sunrise School</td>
                <td className="px-4 py-2 border">200</td>
                <td className="px-4 py-2 border">0300-0000000</td>
                <td className="px-4 py-2 border">Rs. 120,000</td>
                <td className="px-4 py-2 border text-green-600">Paid</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto mt-6">
        <table className="w-full table-auto border text-left text-sm text-[#0F172A]">
          <thead className="bg-[#E2E8F0] text-[#0F172A]">
            <tr>
              {tableHeaders[activeTab].map((header, idx) => (
                <th key={idx} className="px-4 py-2 border">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getFilteredRows().map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-[#F1F5F9]">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2 border">{cell}</td>
                ))}
                <td className="px-4 py-2 border">
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-5 h-5" />
                  </button>
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
            <h2 className="text-xl font-semibold">Manage all {activeTab.toLowerCase()} from here.</h2>
            {!['Student Fees', 'School Payouts'].includes(activeTab) && (
              <button
                className="flex items-center gap-2 px-4 py-2 bg-[#0EA5E9] text-white rounded hover:bg-[#0284C7]"
                onClick={openModal}
              >
                <Plus className="w-4 h-4" /> Add {activeTab.slice(0, -1)}
              </button>
            )}
          </div>

          {!['Student Fees', 'School Payouts'].includes(activeTab) && (
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          )}

          {renderTable()}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add {activeTab.slice(0, -1)}</h3>
              <button onClick={closeModal}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              {renderFormFields()}
              <button
                type="submit"
                className="w-full bg-[#0EA5E9] text-white py-2 rounded hover:bg-[#0284C7]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
