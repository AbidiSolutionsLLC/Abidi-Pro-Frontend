import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Menu } from 'lucide-react';
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

function Ticket() {
  const [tickets, setTickets] = useState([
    { id: '#001', date: '2025-09-12', subject: 'LinkedIn not active', status: 'opened', comment: 'Looking into it' },
    { id: '#002', date: '2025-07-14', subject: 'GPT Pro access', status: 'closed', comment: 'Not eligible' },
    { id: '#003', date: '2025-09-12', subject: 'API Access', status: 'opened', comment: 'Pending review' },
  ]);

  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const results = tickets.filter(ticket =>
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(results);
    setCurrentPage(1);
  }, [searchTerm, tickets]);

  const indexOfLastTicket = currentPage * entriesPerPage;
  const indexOfFirstTicket = indexOfLastTicket - entriesPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / entriesPerPage);

  const toggleDropdown = (id) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };

  const handleDelete = (id) => {
    const newTickets = tickets.filter(ticket => ticket.id !== id);
    setTickets(newTickets);
    setDropdownOpenId(null);
  };

  const handleEdit = (id) => {
    alert(`Edit Ticket ${id}`);
  };

  const handleView = (id) => {
    alert(`View Ticket ${id}`);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-primary m-5 rounded-2xl min-h-[700px] p-4 md:p-6">
      <div className="text-text bg-background rounded-lg shadow-md p-4 md:p-6 min-h-[700px] ">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex items-center">
            <span className="mr-2">Show</span>
            <select
              className="border rounded px-2 py-1 mr-2"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              {[10, 25, 50, 100].map((num) => <option key={num} value={num}>{num}</option>)}
            </select>
            <span>entries</span>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 border rounded w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <button className="bg-primary text-text px-4 py-2 rounded whitespace-nowrap">Raise a Ticket</button>
            <button className="md:hidden border rounded p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg min-h-auto overflow-y-visible">
          <table className="min-w-full border-collapse overflow-y-auto ">
            <thead>
              <tr className="bg-primary text-text text-sm">
                <th className="px-4 py-3 text-left">Ticket ID</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Comment</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTickets.map((ticket, index) => (
                <tr key={ticket.id} className="bg-white hover:bg-gray-50 relative">
                  <td className="px-4 py-3">{ticket.id}</td>
                  <td className="px-4 py-3">{ticket.date}</td>
                  <td className="px-4 py-3">{ticket.subject}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${ticket.status === 'opened' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{ticket.comment}</td>
                  <td className="px-4 py-3 relative">
                    <button onClick={() => toggleDropdown(ticket.id)} className="text-gray-500 hover:text-gray-700">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>
                    {dropdownOpenId === ticket.id && (
                      <div className="absolute w-32 bg-background border border-gray-200 rounded shadow-lg z-99 overflow-visible">
                        <button onClick={() => handleView(ticket.id)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">View</button>
                        <button onClick={() => handleEdit(ticket.id)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Edit</button>
                        <button onClick={() => handleDelete(ticket.id)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div>
            Showing {filteredTickets.length > 0 ? indexOfFirstTicket + 1 : 0} to {Math.min(indexOfLastTicket, filteredTickets.length)} of {filteredTickets.length} entries
          </div>
          <div className="flex mt-2 md:mt-0">
            <button onClick={goToPrevPage} disabled={currentPage === 1} className={`px-3 py-1 border rounded-l ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-100'}`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={goToNextPage} disabled={currentPage === totalPages || totalPages === 0} className={`px-3 py-1 border border-l-0 rounded-r ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-100'}`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
