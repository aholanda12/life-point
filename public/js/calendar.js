// Global variables
const currentYear = new Date().getFullYear();
const source = [];

// This function is getting the data related to the user's calendar, calibrating it to the js-year-calendar format, and creating the calendar
function getCalendarData(data) {
  // Getting the calendar data
  $.ajax({
    url: "/api/calendar",
    method: "GET",
    data: { data: data }
  })
    .then(function (res) {
      // console.log(res);
      // For loop that reformats the data function into js-year-calendar format
      for (let i = 0;i < res.length;i++) {
        const splitMonth = res[i].Journal.date.split("");
        if (splitMonth[0] === "1") {
          newMonth = (res[i].Journal.date.slice(0, 2));
        }
        else {
          newMonth = (res[i].Journal.date.slice(0, 1));
        }
        const month = parseInt(newMonth) - 1;
        const day = parseInt(res[i].Journal.date.slice(2, 4));
        console.log(currentYear, month, day);
        // Pushes the formatted dates into the data source for the calendar
        source.push({
          startDate: new Date(currentYear, month, day),
          endDate: new Date(currentYear, month, day)
        });
      }
      // Generates the calendar with the created data source
      calendar = new Calendar("#calendar", {
        dataSource: source
      });
      return source;
    });
}
// Call the above function upon loading
getCalendarData();

// Click event on every separate date
document.querySelector("#calendar").addEventListener("clickDay", function (e) {
  // Global variable for calendar day data
  const calDate = e.date.toLocaleDateString();
  // get the calendar data
  function getDate (data) {
    $.ajax({
      url: "/api/calendar",
      method: "GET",
      data: { data: data }
    })
      .then(function (res) {
        // For loop to grab the date from our data
        for (let i = 0;i < res.length;i++) {
          const dataDate = res[i].Journal.date;
          // If our data date matches the calendar date, take the id from that date and call that entry
          if (dataDate === calDate) {
            const entryId = res[i].Journal.id;
            callEntry(entryId);
          }
        }
      });
  }
  getDate();
});

// Function that redirects us to the journal entry for that id
function callEntry(id) {
  window.location.href = "/api/entry/" + id;
}


