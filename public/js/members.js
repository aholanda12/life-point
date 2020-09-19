// Upon the page loading
$(document).ready(() => {

  // When the submit button is clicked
  $("#allDataForm").on("submit", function (event) {
    event.preventDefault();

    // Submit the journal data
    const journalData = {
      entry: $("#exampleFormControlTextarea1").val().trim(),
      date: $("#date").text()
    };

    // Submit the mood data
    const moodData = {
      mood: $("[name=inlineRadioOptions]:checked").val(),
      medication: $("#medication").prop("checked"),
      hoursSleep: $("#sleepTime").val().trim(),
      minutesExercise: $("#exerciseTime").val().trim(),
      minutesNapping: $("#napTime").val().trim(),
      servingsCaffiene: $("#caffieneCount").val().trim(),
      servingsAlcohol: $("#alcoholCount").val().trim(),
      hoursTV: $("#mediaTime").val().trim(),
      showered: $("#showered").prop("checked"),
      brushedTeeth: $("#teeth").prop("checked"),
      selfCare: $("#selfCare").prop("checked"),
      minutesSocial: $("#socialTime").val().trim(),
      headache: $("#headAche").prop("checked"),
      nausea: $("#nausea").prop("checked"),
      exhaustion: $("#exhaustion").prop("checked"),
      insomnia: $("#insomnia").prop("checked"),
      appetite: $("[data-appetite]").attr("data-appetite"),
      menstruation: $("#menstruation").prop("checked")
    };

    // Submit the grateful data
    const gratefulData = {
      one: $("#grateful1").val().trim(),
      two: $("#grateful2").val().trim(),
      three: $("#grateful3").val().trim(),
      four: $("#grateful4").val().trim(),
      five: $("#grateful5").val().trim()
    };

    // Submit the remember data
    const rememberData = {
      one: $("#remember1").val().trim(),
      two: $("#remember2").val().trim(),
      three: $("#remember3").val().trim(),
      four: $("#remember4").val().trim(),
      five: $("#remember5").val().trim()
    };
    
    // Submit the entry with all of the above data
    submitEntry(journalData, moodData, gratefulData, rememberData);

  });

  // Function to post the entry to our data base, then 
  function submitEntry(data1, data2, data3, data4) {
    $.ajax({
      url: "/api/entry",
      method: "POST",
      data: { data1: data1, data2: data2, data3: data3, data4: data4 }
    })
      .then(function (data) {

        window.location.href = data.redirect;
      });
  }

  // Function that gets the current date, reformats it to the js-year-calendar format, and displays it on the page
  function getHeaderDate() {
    const currentHeaderDate = moment().format("MM/DD/YYYY");
    const month = (currentHeaderDate.slice(0, 2));
    const remainder = (currentHeaderDate.slice(2, 10));
    console.log(month, remainder);
    const splitMonth = month.split("");
    if (splitMonth[0] === "0") {
      newMonth = splitMonth[1];
    }
    else {
      newMonth = month;
    }
    console.log(newMonth);
    const correctDate = (newMonth + remainder);
    console.log(correctDate);
    $("#date").text(correctDate);
  }
  getHeaderDate();

  // Function that allows the dropdown for appetite to be chosen and redisplay the correct value when chosen
  $("body").on("click touchend", ".appetite-dropdown", function (event) {
    console.log(event.target);
    // #appetiteDropdownButton
    console.log($("#appetiteDropdownButton").text());
    setTimeout(function (event) {
      $("#appetiteDropdownButton").text("Appetite: " + $(event.target).text());
      $("#appetiteDropdownButton").attr("data-appetite", $(event.target).attr("data-appetite-value"));
    }, 50, event);
  
  });
});

