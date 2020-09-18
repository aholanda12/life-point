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


$("#button-a").on("click", function (event) {
  event.preventDefault();
  console.log(currentDate);
  function getDate(data) {
    $.ajax({
      url: "/api/calendar",
      method: "GET",
      data: { data: data }
    })
      .then(function (res) {
        for (let i = 0;i < res.length;i++) {
          const dataDate = res[i].Journal.date;
          console.log(dataDate);
          if (dataDate === currentDate) {
            console.log("It matches");
            const entryId = res[i].Journal.id;
            callEntry(entryId);
          }
          else {
            window.location.href = "/members";
          }
        }
      });
  }
  getDate();

});

function callEntry(id) {
  window.location.href = "/entry/:" + id;
}