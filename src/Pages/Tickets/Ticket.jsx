import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Menu } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import RaiseTicketModal from "../../Pages/Tickets/RaiseTicketModal";
import ViewTicketDetailsModal from "../../Pages/Tickets/ViewTicketDetailsModal";
const Ticket = () => {
  const [tickets, setTickets] = useState([
    {
      id: "#001",
      date: "2025-09-12",
      subject: "LinkedIn not active",
      status: "opened",
      comment: "Looking into it",
      email: "john.doe@example.com",
      attachment: { name: "linkedin_issue_screenshot.png" },
    },
    {
      id: "#002",
      date: "2025-07-14",
      subject: "GPT Pro access",
      status: "closed",
      comment: "Not eligible",
      email: "susan.smith@example.com",
      attachment: null,
    },
    {
      id: "#003",
      date: "2025-09-12",
      subject: "API Access",
      status: "opened",
      comment: "Pending review",
      email: "tech.team@example.com",
      attachment: { name: "api_request_doc.pdf" },
    },
  ]);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const results = tickets.filter(
      (ticket) =>
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(results);
    setCurrentPage(1);
  }, [searchTerm, tickets]);

  const indexOfLastTicket = currentPage * entriesPerPage;
  const indexOfFirstTicket = indexOfLastTicket - entriesPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );
  const totalPages = Math.ceil(filteredTickets.length / entriesPerPage);

  const handleDelete = (id) => {
    const newTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(newTickets);
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
          <div className="flex items-center w-full md:w-auto">
            <span className="mr-2">Show</span>
            <select
              className="border text-tblBody rounded px-2 py-1 mr-2 flex-shrink-0"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              {[10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 border rounded w-full text-tblBody"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <button
              className="bg-primary text-text px-4 py-2 rounded whitespace-nowrap w-full md:w-auto"
              onClick={() => setShowModal(true)}
            >
              Raise a Ticket
            </button>

            {/* Only show menu button on small screens */}
            <button
              className="md:hidden border rounded p-2 w-full flex justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-auto rounded-lg mt-5 shadow-lg">
          <table className="min-w-full table-auto text-sm md:text-base">
            <thead>
              <tr className="bg-primary text-tblHead text-left whitespace-nowrap">
                <th className="px-2 py-3 md:px-4">Ticket ID</th>
                <th className="px-2 py-3 md:px-4">Date</th>
                <th className="px-2 py-3 md:px-4">Subject</th>
                <th className="px-2 py-3 md:px-4">Email</th>
                <th className="px-2 py-3 md:px-4">Attachment</th>
                <th className="px-2 py-3 md:px-4">Status</th>
                <th className="px-2 py-3 md:px-4 hidden sm:table-cell">
                  Comment
                </th>
                <th className="px-2 py-3 md:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="bg-white hover:bg-gray-50 text-tblBody border-t"
                >
                  <td className="px-2 py-3 md:px-4 whitespace-nowrap">
                    {ticket.id}
                  </td>
                  <td className="px-2 py-3 md:px-4 whitespace-nowrap">
                    {ticket.date}
                  </td>
                  <td className="px-2 py-3 md:px-4 whitespace-nowrap">
                    {ticket.subject}
                  </td>
                  <td className="px-2 py-3 md:px-4 whitespace-nowrap">
                    {ticket.email || "—"}
                  </td>
                  <td className="px-2 py-3 md:px-4 whitespace-nowrap">
                    {ticket.attachment ? (
                      <span className="text-green-600 text-sm bg-green-200 cursor-pointer rounded-3xl p-1">
                        {ticket.attachment.name}
                      </span>
                    ) : (
                      <span className="text-gray-700 tex-sm bg-gray-300 p-1 rounded-3xl w-full">
                        No file
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-3 md:px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.status === "opened"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-2 py-3 md:px-4 hidden sm:table-cell">
                    {ticket.comment}
                  </td>
                  <td className="px-2 py-3 md:px-4">
                    <div className="flex items-center gap-2">
                      {/* View */}
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        title="View"
                        className="p-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 transition"
                      >
                        <FaEye className="h-4 w-4" />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(ticket.id)}
                        title="Delete"
                        className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 transition"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div>
            Showing {filteredTickets.length > 0 ? indexOfFirstTicket + 1 : 0} to{" "}
            {Math.min(indexOfLastTicket, filteredTickets.length)} of{" "}
            {filteredTickets.length} entries
          </div>
          <div className="flex mt-2 md:mt-0">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-l ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 border border-l-0 rounded-r ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-gray-100 text-gray-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modals */}
        {showModal && (
          <RaiseTicketModal
            onClose={() => setShowModal(false)}
            onSubmit={(newTicket) => {
              setTickets((prev) => [...prev, newTicket]);
              setShowModal(false);
            }}
          />
        )}
        {selectedTicket && (
          <ViewTicketDetailsModal
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Ticket;
