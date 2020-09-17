const currentYear = new Date().getFullYear();

const calendar = new Calendar("#calendar", {
  dataSource: [{
    id: 0,
    startDate: new Date(currentYear, 5, 10),
    endDate: new Date(currentYear, 5, 10)
  }]
});
console.log(calendar);

document.querySelector("#calendar").addEventListener("clickDay", function() {
  console.log(calendar._dataSource.id);
});


// const calendar = new Calendar("#calendar", {
//   dataSource: getCalendarData()
// });
// console.log(calendar);

// function getCalendarData(data) {
//   $.ajax({
//     url: "/api/calendar",
//     method: "GET",
//     data: { data: data }
//   })
//     .then(function (res) {
//       console.log(res);
//       const source = [];
//       for (let i = 0;i < res.length;i++) {
//         const month = (res[i].Journal.date.slice(5, 7)) - 1;
//         const day = res[i].Journal.date.slice(8, 10);
//         source.push({
//           startDate: new Date(currentYear, month, day),
//           endDate: new Date(currentYear, month, day)
//         });
//       }
//       console.log(source);
//       return source;
//     });
// }










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

