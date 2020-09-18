const currentYear = new Date().getFullYear();
const source = [];

function getCalendarData(data) {
  $.ajax({
    url: "/api/calendar",
    method: "GET",
    data: { data: data }
  })
    .then(function (res) {
      console.log(res);
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
        source.push({
          startDate: new Date(currentYear, month, day),
          endDate: new Date(currentYear, month, day)
        });
      }
      calendar = new Calendar("#calendar", {
        dataSource: source
      });
      return source;
    });
}

getCalendarData();

document.querySelector("#calendar").addEventListener("clickDay", function (e) {
  const calDate = e.date.toLocaleDateString();
  function getDate (data) {
    $.ajax({
      url: "/api/calendar",
      method: "GET",
      data: { data: data }
    })
      .then(function (res) {
        for (let i = 0;i < res.length;i++) {
          const dataDate = res[i].Journal.date;
          if (dataDate === calDate) {
            const entryId = res[i].Journal.id;
            callEntry(entryId);
          }
        }
      });
  }
  getDate();
});

function callEntry(id) {
  window.location.href = "/api/entry/" + id;
}


