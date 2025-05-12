"use client";

import { useState } from "react";
import { Search, MapPin, Clock, Mail, Briefcase, Phone } from "lucide-react";

const profileData = {
  topCards: [
    {
      title: "Department Head",
      id: "MD-005",
      name: "Musharraf Sajjad",
      role: "Chief Technology Officer",
    },
    {
      title: "Manager",
      id: "KAR-033",
      name: "Murtaza Mehmood",
      role: "Software Developer",
    },
  ],
  employees: [
    { id: 1, name: "Murtaza Mehmood", role: "Manager" },
    { id: 2, name: "Zara Ejaz", role: "Developer" },
    { id: 3, name: "Abid Mehmood", role: "Developer" },
    { id: 4, name: "Bilal", role: "Developer" },
  ],
  mainProfile: {
    id: "KAR-039",
    name: "Zara Ejaz",
    role: "Software Developer",
    location: "Karachi",
    department: "Software Development",
    timezone: "(GMT+05:00)",
    email: "zeja@datasolutions.com",
    shift: "General",
    phone: "03257459999",
    about:
      "I'm Frontend Developer with over a year of experience in building responsive web-based solutions using React.js, JavaScript, and Restful APIs. Currently working at FastSolutions as a Frontend developer. I'm also pursuing a bachelor's in software engineering at Bahria University and constantly looking to grow through impactful, real-world projects.",
    workExperience: {
      designation: "Designation",
      company: "Company Name XYZ",
      description: "Job description",
      type: "Full-time",
    },
    education: {
      degree: "Degree",
      institute: "Educational institute name",
      duration: "degree completion date or present",
    },
  },
  profileCards: [
    {
      icon: MapPin,
      label: "Location",
      value: "Karachi",
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Briefcase,
      label: "Department",
      value: "Software Development",
      bg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: Clock,
      label: "Time Zone",
      value: "(GMT+05:00)",
      bg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: Mail,
      label: "Email ID",
      value: "zeja@datasolutions.com",
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Briefcase,
      label: "Shift",
      value: "General",
      bg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      icon: Phone,
      label: "Work phone",
      value: "03257459999",
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ],
};

export default function Profile() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = profileData.employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-hidden bg-primary p-5 border m-4 shadow-sm min-h-[700px] border-none rounded-lg ">
      {/* Top Cards */}
      <div className="bg-background p-4 border-0 rounded-lg mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profileData.topCards.map((card, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-teal-500 rounded-md"></div>
              <div>
                <div className="font-medium text-heading">{card.title}</div>
                <div className="text-sm text-text">{`${card.id}- ${card.name}`}</div>
                <div className="text-sm text-text">{card.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 p-4 bg-background rounded-lg m-2">
          <h2 className="font-medium mb-2 text-text">Employees</h2>
          <div className="relative mb-4 text-text">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-2 pr-8 py-1 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                <div>
                  <div className="text-sm font-medium text-text">
                    {employee.role}
                  </div>
                  <div className="text-xs text-text">{employee.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Profile Section */}
        <div className="flex-1 p-4  card bg-background rounded-lg m-2">
          <div className="relative mb-5">
            {/* Header Banner */}
            <div className="h-24 shadow-md bg-gradient-to-r from-purple-800 to-purple-500 rounded-lg"></div>

            {/* Profile Picture */}
            <div className="absolute top-12 left-6 z-20">
              <div className="w-24 h-24 bg-white rounded-full shadow-md"></div>
              <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-white absolute bottom-0 right-0"></div>
            </div>

            {/* Info Card */}
            <div className="relative z-10 mt-4">
              <div className="card bg-secondary shadow rounded-md py-4 pr-4 pl-36 flex flex-wrap justify-between gap-2 sm:gap-4 text-[clamp(12px,1.1vw,16px)]">
                {/* Left: Name and Role (stacked) */}
                <div className="flex flex-col min-w-0">
                  <p className="font-semibold text-text truncate sm:max-w-[250px]">
                    {profileData.mainProfile.id} -{" "}
                    {profileData.mainProfile.name}
                  </p>
                  <p className="text-text truncate">
                    {profileData.mainProfile.role}
                  </p>
                </div>

                {/* Right: Reporting Manager (stacked) */}
                <div className="flex flex-col min-w-[140px]">
                  <p className="text-text">Reporting to</p>
                  <p className="font-medium text-text text-opacity-80 break-words">
                    KAR-033 - Murtaza Mehmood
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="md:col-span-2 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 card m-2">
                {profileData.profileCards.map((item, idx) => (
                  <div
  key={idx}
  className="flex items-center gap-3 p-2 bg-secondary rounded-md shadow-sm"
>
  <div className={`w-10 h-10 flex items-center justify-center rounded-md shadow-md ${item.bg}`}>
    <item.icon className={`h-5 w-5 ${item.iconColor}`} />
  </div>
  <div>
    <div className="text-sm font-medium text-text">{item.label}</div>
    <div className="text-xs text-text">{item.value}</div>
  </div>
</div>
                  
                ))}
              </div>

              <div className="mb-6 card bg-secondary m-2 shadow p-2 rounded-lg">
                <h3 className="font-semibold mb-2 text-heading">About</h3>
                <p className="text-sm text-text">
                  {profileData.mainProfile.about}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 card bg-secondary m-2 shadow p-2">
                <div>
                  <h3 className="font-semibold mb-2 text-text">Work experience</h3>
                  <div className="text-sm">
                    <div className="font-medium">
                      {profileData.mainProfile.workExperience.designation}
                    </div>
                    <div className="text-text">
                      {profileData.mainProfile.workExperience.company}
                    </div>
                    <div className="text-text">
                      {profileData.mainProfile.workExperience.description}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <div className="font-medium">
                      {profileData.mainProfile.workExperience.type}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Education</h3>
                  <div className="text-sm">
                    <div className="font-medium">
                      {profileData.mainProfile.education.degree}
                    </div>
                    <div className="text-text">
                      {profileData.mainProfile.education.institute}
                    </div>
                    <div className="text-text">
                      {profileData.mainProfile.education.duration}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right-side content could go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
