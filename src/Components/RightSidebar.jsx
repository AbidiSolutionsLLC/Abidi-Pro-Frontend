import React, { useEffect, useState } from "react";
import {
    UserCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { checkInNow, checkOutNow } from "../slices/attendanceTimer";
import { toast } from "react-toastify";

const RightSidebar = ({ isOpen, toggleSidebar }) => {
    const dispatch = useDispatch();
    const [elapsedTime, setElapsedTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [timerInterval, setTimerInterval] = useState(null);

    // Get data from Redux store
    const { checkInn, checkOut, loading } = useSelector((state) => state.attendanceTimer);
    const { user } = useSelector((state) => state.auth);
    const profileImage = user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e";
    const firstName = user?.firstName || "User";

    // Format time from seconds
    const formatTimeFromSeconds = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { hours, minutes, seconds };
    };

    // Calculate elapsed time from check-in
    useEffect(() => {
        if (checkInn?.log?.checkInTime && !checkInn?.log?.checkOutTime) {
            const startTime = new Date(checkInn.log.checkInTime).getTime();

            // Update elapsed time immediately
            const updateElapsed = () => {
                const now = Date.now();
                const elapsedSeconds = Math.floor((now - startTime) / 1000);
                setElapsedTime(formatTimeFromSeconds(elapsedSeconds));
            };

            updateElapsed(); // Initial update

            // Start timer interval
            const interval = setInterval(updateElapsed, 1000);
            setTimerInterval(interval);

            return () => {
                if (interval) clearInterval(interval);
            };
        } else {
            // Reset timer if checked out or no active session
            if (timerInterval) {
                clearInterval(timerInterval);
                setTimerInterval(null);
            }
            setElapsedTime({ hours: 0, minutes: 0, seconds: 0 });
        }
    }, [checkInn]);

    // Handle check-in button click
    const handleCheckIn = () => {
        if (!checkInn?.log?.checkInTime || checkInn?.log?.checkOutTime) {
            dispatch(checkInNow())
                .unwrap()
                .catch((error) => {
                    toast.error(error?.message || "Failed to check in");
                });
        }
    };

    // Handle check-out button click
    const handleCheckOut = () => {
        if (checkInn?.log?.checkInTime && !checkInn?.log?.checkOutTime) {
            dispatch(checkOutNow())
                .unwrap()
                .then(() => {
                    toast.success("Checked out successfully!");
                })
                .catch((error) => {
                    toast.error(error?.message || "Failed to check out");
                });
        }
    };

    // Determine button state and text
    const getButtonState = () => {
        if (!checkInn?.log) {
            return {
                text: "Check In",
                onClick: handleCheckIn,
                bgColor: "bg-emerald-500 hover:bg-emerald-600",
                disabled: false
            };
        }

        if (checkInn?.log?.checkInTime && !checkInn?.log?.checkOutTime) {
            return {
                text: "Check Out",
                onClick: handleCheckOut,
                bgColor: "bg-red-500 hover:bg-red-600",
                disabled: false
            };
        }

        return {
            text: "Already Checked Out",
            onClick: null,
            bgColor: "bg-slate-400",
            disabled: true
        };
    };

    const buttonState = getButtonState();

    return (
        <aside className={`sticky top-14 z-50 h-[calc(100vh-3.5rem)] transition-all duration-500 ease-in-out flex-shrink-0 flex items-center py-2 pr-3 overflow-auto ${isOpen ? "w-52" : "w-8"
            }`}>

            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -left-0 top-12 z-[70] p-1.5 bg-white border border-slate-200 shadow-md rounded-full text-slate-600 hover:text-slate-900 hover:shadow-lg transition-all active:scale-90"
            >
                {isOpen ? (
                    <ChevronRightIcon className="w-4 h-4" />
                ) : (
                    <ChevronLeftIcon className="w-4 h-4" />
                )}
            </button>

            {/* Sidebar Content */}
            <div className={`h-full w-full bg-[#ECF0F3] backdrop-blur-sm rounded-[2rem] shadow-lg border border-white/50 flex flex-col items-center py-5 px-4 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}>

                {/* Profile Section */}
                <div className="flex flex-col items-center w-full">
                    <div className="w-16 h-16 rounded-full border-2 border-white shadow-md mb-3 overflow-hidden bg-slate-200">
                       {profileImage ? (
              <img
                src={profileImage}
                alt={firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-11 w-11 rounded-full bg-[#E0E5EA] text-slate-700 flex items-center justify-center text-sm font-bold border-2 border-white shadow-md">
                {firstName.charAt(0).toUpperCase()}
              </div>
            )}
                    </div>



                    <div className="text-center bg-white rounded-xl px-4 py-2 w-full mb-2 shadow-sm border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-800">
                            {user?.name || "- Name -"}
                        </h3>
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                            {user?.designation || "- Designation -"}
                        </p>
                    </div>

                    {/* Check In/Out Button */}
                    <button
                        onClick={buttonState.onClick}
                        disabled={buttonState.disabled || loading}
                        className={`${buttonState.bgColor} text-white text-xs font-bold py-2 px-8 rounded-full shadow-md transition-all active:scale-95 mb-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {loading ? "Processing..." : buttonState.text}
                    </button>

                    {/* Timer Display - Only show when checked in */}
                    {(checkInn?.log?.checkInTime && !checkInn?.log?.checkOutTime) && (
                        <div className="flex flex-col items-center mb-5">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                                Current Session
                            </span>
                            <div className="flex items-center justify-center gap-1.5">
                                <div className="bg-slate-100 text-slate-800 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-inner">
                                    {elapsedTime.hours.toString().padStart(2, '0')}
                                </div>
                                <span className="text-slate-800 font-bold text-sm">:</span>
                                <div className="bg-slate-100 text-slate-800 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-inner">
                                    {elapsedTime.minutes.toString().padStart(2, '0')}
                                </div>
                                <span className="text-slate-800 font-bold text-sm">:</span>
                                <div className="bg-slate-100 text-slate-800 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-inner">
                                    {elapsedTime.seconds.toString().padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Today's Status
          {checkInn?.log && (
            <div className="w-full bg-white rounded-xl p-3 mb-3 shadow-sm border border-slate-100">
              <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Today's Status</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700">Check-in:</span>
                <span className="text-xs font-bold text-slate-800">
                  {checkInn.log.checkInTime ? 
                    new Date(checkInn.log.checkInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 
                    '--:--'
                  }
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-medium text-slate-700">Check-out:</span>
                <span className="text-xs font-bold text-slate-800">
                  {checkInn.log.checkOutTime ? 
                    new Date(checkInn.log.checkOutTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 
                    '--:--'
                  }
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-700">Status: </span>
                <span className={`text-xs font-bold ml-1 ${
                  checkInn.log.status === 'Present' ? 'text-green-600' :
                  checkInn.log.status === 'Half Day' ? 'text-yellow-600' :
                  checkInn.log.status === 'Absent' ? 'text-red-600' :
                  'text-slate-600'
                }`}>
                  {checkInn.log.status || 'Pending'}
                </span>
              </div>
            </div>
          )} */}
                </div>

                {/* Reporting Manager */}
                <div className="w-full bg-white rounded-xl p-3 mb-3 shadow-sm border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Reporting Manager</p>
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-slate-300 shrink-0 flex items-center justify-center">
                            <UserCircleIcon className="w-7 h-7 text-slate-500" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-slate-800 truncate">{user?.reportsTo}</p>
                            <p className="text-[9px] text-slate-600 truncate">Project Manager</p>
                        </div>
                    </div>
                </div>

                {/* Team Overview */}
                <div className="w-full bg-white rounded-xl p-3 flex-1 shadow-sm border border-slate-100 flex flex-col min-h-0">
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-3">Team Overview</p>
                    <div className="flex flex-col gap-2.5 overflow-y-auto no-scrollbar">
                        {[
                            { role: "Manager", name: "Murtaza Mehmood" },
                            { role: "Developer", name: "Zara Gul" },
                            { role: "Developer", name: "Aqsa Mehmood" },
                            { role: "Developer", name: "Robina" },
                        ].map((member, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-slate-200 shrink-0 flex items-center justify-center">
                                    <UserCircleIcon className="w-6 h-6 text-slate-500" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-bold text-slate-700 truncate">{member.role}</p>
                                    <p className="text-[9px] text-slate-500 truncate">{member.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside >
    );
};

export default RightSidebar;