// src/pages/appointments/AppointmentCalender.jsx
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dateClick
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

export default function AppointmentCalender() {
  const [events, setEvents] = useState([
    { title: "Dr.Jay Soni", date: "2025-08-20" },
    { title: "Dr.Sarah Smith", date: "2025-08-22" },
  ]);

  const handleDateClick = (info) => {
    const title = prompt("Enter Event Title:");
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  return (
    <section className="content">
         <div className="content-block">
           <div className="block-header">
             <CustomBreadcrumb title={'Appointment'} activeItem={'Calender'} items={'Appointment Calender'} />
          
           </div>
    <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card p-3">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        dateClick={handleDateClick}
        height="80vh"
      />
    </div>
    </div>
    </div>
    </div>
    </section>
  );
}
