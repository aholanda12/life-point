const currentYear = new Date().getFullYear();
const source = [];

function getCalendarData(data) {
  $.ajax({
    url: "/api/calendar",
    method: "GET",
    data: { data: data }
  })
    .then(function (res) {
      for (let i = 0;i < res.length;i++) {
        const month = (res[i].Journal.date.slice(5, 7)) - 1;
        const day = res[i].Journal.date.slice(8, 10);
        source.push({
          startDate: new Date(currentYear, month, day),
          endDate: new Date(currentYear, month, day)
        });
      }
      console.log(source);
      const calendar = new Calendar("#calendar", {
        dataSource: source
      });
      console.log(calendar);
      return source;
    });
}

function getDate(data) {
  $.ajax({
    url: "/api/calendar",
    method: "GET",
    data: { data: data }
  })
    .then(function (res) {
      for (let i = 0;i < res.length;i++) {
        const year = (res[i].Journal.date.slice(0, 4));
        const month = (res[i].Journal.date.slice(5, 7));
        const splitMonth = month.split("");
        if (splitMonth[0] === "0") {
          newMonth = splitMonth[1];
        }
        else {
          newMonth = month;
        }
        const day = res[i].Journal.date.slice(8, 10);
        console.log(newMonth + "/" + day + "/" + year);
      }
    });
}

getCalendarData();
getDate();

document.querySelector("#calendar").addEventListener("clickDay", function (e) {
  console.log(e.date.toLocaleDateString());
});

console.log(source);










// //     .then(function (res) {
// //       const calendar = new Calendar("#calendar", {
// //         dataSource: [
// //           {
// //             startDate: new Date(currentYear, 8, 13),
// //             endDate: new Date(currentYear, 8, 13)
// //           }
// //         ]
// //       });
// //       console.log(res);
// //       for (let i = 0; i < res.length; i++) {
// //         const month = (res[i].Journal.date.slice(5,7)) - 1;
// //         const day = res[i].Journal.date.slice(8,10);
// //         calendar._dataSource.push({
// //           startDate: new Date (currentYear, month, day),
// //           endDate: new Date (currentYear, month, day)
// //         });
// //       }
// //       console.log(calendar);
// //     });
// // }
// // getCalendarData();

// const calendar = new Calendar("#calendar", {
//   dataSource: function (data) {
//     $.ajax({
//       url: "/api/calendar",
//       method: "GET",
//       data: { data: data }
//     })
//       .then(function (res) {
//         console.log(res);
//         for (let i = 0;i < res.length;i++) {
//           const month = (res[i].Journal.date.slice(5, 7)) - 1;
//           const day = res[i].Journal.date.slice(8, 10);
//           const source = [];
//           source.push({
//             startDate: new Date(currentYear, month, day),
//             endDate: new Date(currentYear, month, day)
//           });
//         }
//         return source;
//       });
//   }
// });

