import React, { useState } from 'react'
import AttendanceCard from '../../Components/AttendanceCard'
import { FaUmbrellaBeach, FaUserFriends, FaHospital, FaTools } from 'react-icons/fa';
import { HiOutlineUserRemove } from 'react-icons/hi';
import { DropDownPicker } from '../../Components/DropDownPicker';
import HolidayTable from '../../Components/HolidayTable';
import ApplyLeaveModal from '../../Components/LeaveModal';
import StatusDropDown from '../../Components/StatusDropDown';
const LeaveRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(true);

  const leaveRecord = [
    {
      "date": "12/5/2025",
      "leaveType": "Sick Leave",
      "reason": "Illness",
      "duration": "2 days",
      "status": "Approved"
    },
    {
      "date": "11/20/2025",
      "leaveType": "Casual Leave",
      "reason": "Personal Work",
      "duration": "1 day",
      "status": "Pending"
    }
  ]

  const [departmentLeaveRecord,setDepartmentLeaveRecord] =useState([
    {
      "date": "12/5/2025",
      "id": "2443",
      "name": "joseph",
      "email": "joseph@abidisolutions.com",
      "leaveType": "Sick Leave",
      "reason": "Illness",
      "duration": "2 days",
      "status": "Approve"
    },
    {
      "date": "11/20/2025",
      "id": "2446",
      "name": "kamran",
      "email": "kamran@abidisolutions.com",
      "leaveType": "Sick Leave",
      "reason": "Personal Work",
      "duration": "10 day",
      "status": "Reject"
    }

  ]
)
  const leaveData = [
    {
      icon: <HiOutlineUserRemove />,
      label: 'Absents',
      available: 0,
      badgeColor: 'bg-red-400',
    },
    {
      icon: <FaUmbrellaBeach />,
      label: 'Holidays',
      available: 10,
      badgeColor: 'bg-yellow-300',
    },
    {
      icon: <FaUserFriends />,
      label: 'Personal',
      available: 10,
      badgeColor: 'bg-green-500',
    },
    {
      icon: <FaHospital />,
      label: 'Sick Leave',
      available: 0,
      badgeColor: 'bg-blue-500',
    },
    // {
    //   icon: <FaTools />,
    //   label: 'Compensatory',
    //   available: 0,
    //   badgeColor: 'bg-purple-400',
    // },
  ];

  return (
    // MainBody
    <div className='px-4 py-2 '>
      {/* roundercorner main Content */}
      <div className='p-8 rounded-xl bg-primary'>
       


                {/* Route */}
                <h1 className='flex text-text-white font-bold text-sm'>
                  People/<h3 className='font-normal'>Leave Tracker/Apply Leave</h3>
                </h1>
                {/* Top Tab */}
                {/* <div className='flex mt-2 bg-background px-6 py-1 w-72 rounded-md items-center justify-around text-xs'>
                  <span onClick={() => setPage(0)} className='px-2 cursor-pointer'>Summary</span>
                  <div className='w-[1px] h-8 bg-black'></div>
                  <span onClick={() => setPage(1)} className='px-2 cursor-pointer'>Leave Request</span>

                  {isAdmin && <>            <div className='w-[1px] h-8 bg-black'></div>
                    <span onClick={() => setPage(2)} className='px-2 cursor-pointer'>Admin</span>

                  </>}
                </div> */}
                {/* LeaveSummaryDiv */}
                {/* <div className='mt-3 bg-background px-6 py-1  rounded-md text-sm font-medium'>
                  <div className='flex justify-between items-center align-bottom '>
                    <div>
                      <div className='px-2 text-lg'>Leave Summary</div>
                      <div className=''>
                        <h1 className='px-2 text-xs font-light mt-3 ml-1'>Available Leaves        :   02</h1>
                        <h1 className='px-2 text-xs font-light mt-2 ml-1 '>Booked Leaves        :   20</h1>
                      </div>
                    </div>
                    <button className='bg-[#76FA9E] h-8 px-4 rounded-lg text-xs'>Apply Now</button>
                  </div>

                </div> */}
                {/* attendance summary card view horizontal */}
                {/* <div className='my-6 flex flex-wrap items-start justify-start gap-6 '>
                  {
                    leaveData.map((item, index) => {
                      return (
                        <AttendanceCard title={item.label} value={item.available} icon={item.icon} badgeColor={item.badgeColor} />
                      )
                    })
                  }
                </div> */}
                <div className='mt-3 bg-background px-6 py-1  rounded-md text-sm font-medium'>
                  <div className='px-2 my-4 text-lg'>Applied Leave</div>
                  <div className='bg-primary py-4 grid grid-cols-[1fr_2fr_2fr_3fr_1fr] rounded-t-lg text-white'>
                    <span className='text-center'>Date</span>
                    <span className='text-center'>Leave Type</span>
                    <span className='text-center'>Reason</span>
                    <span className='text-center'>Duration in days</span>
                    <span className='text-center'>Status</span>
                  </div>
                  {
                    leaveRecord.map((item) => {
                      return (
                        <div className='bg-background py-4 grid grid-cols-[1fr_2fr_2fr_3fr_1fr] rounded-t-lg text-description'>
                          <span className='text-center'>{item.date}</span>
                          <span className='text-center'>{item.leaveType}</span>
                          <span className='text-center'>{item.reason}</span>
                          <span className='text-center'>{item.duration}</span>
                          <span className={`text-center ${item.status == "Approved" ? 'bg-completed' : 'bg-slate-500 text-white'} rounded-sm`}>{item.status}</span>
                        </div>
                      )
                    })
                  }

                </div>

      </div>
      <ApplyLeaveModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default LeaveRequest
