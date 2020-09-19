// Global variables for grabbing and formatting today's date to match data date
const currentHeaderDate = moment().format("MM/DD/YYYY");
const month = (currentHeaderDate.slice(0, 2));
const remainder = (currentHeaderDate.slice(2, 10));
const splitMonth = month.split("");
if (splitMonth[0] === "0") {
  newMonth = splitMonth[1];
}
else {
  newMonth = month;
}
const currentDate = (newMonth + remainder);

// Function to get the current date to see if we have or have not made a journal entry for that day
function getDate(data) {
  // Get the calendar data
  $.ajax({
    url: "/api/calendar",
    method: "GET",
    data: { data: data }
  })
    .then(function (res) {
      // console.log(res);
      // If the user is new and has no previous data, direct them to a blank entry page
      if (res === undefined || res.length === 0) {
        window.location.href = "/members";
      } 
      // If the user does have data, check to see if the current date matches the date of any submitted journal entries
      else {
        for (let i = 0;i < res.length;i++) {
          const dataDate = res[i].Journal.date;
          console.log(dataDate);
          if (dataDate === currentDate) {
            const entryId = res[i].Journal.id;
            // If it does match a previous entry, send them to the historical page of that entry
            callEntry(entryId);
          }
          // If no entry exists for the current date, send them to a blank entry page
          else {
            window.location.href = "/members";
          }
        }
      }
    });
}

// The above function works for the daily entry button on the home page
$("#button-a").on("click", function (event) {
  event.preventDefault();
  getDate();
});

// Tha above function works on the daily entry button on all nav bars
$("#daily").on("click", function (event) {
  event.preventDefault();
  getDate();

});

// Function that redirects us to the journal entry for that id
function callEntry(id) {
  window.location.href = "/api/entry/" + id;
}