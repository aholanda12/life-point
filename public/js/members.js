$(document).ready(() => {

  $("#allDataForm").on("submit", function (event) {
    event.preventDefault();

    const journalData = {
      entry: $("#exampleFormControlTextarea1").val().trim(),
      date: $("#date").text() + " 00:00:00"
    };

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

    const gratefulData = {
      one: $("#grateful1").val().trim(),
      two: $("#grateful2").val().trim(),
      three: $("#grateful3").val().trim(),
      four: $("#grateful4").val().trim(),
      five: $("#grateful5").val().trim()
    };

    const rememberData = {
      one: $("#remember1").val().trim(),
      two: $("#remember2").val().trim(),
      three: $("#remember3").val().trim(),
      four: $("#remember4").val().trim(),
      five: $("#remember5").val().trim()
    };


    submitEntry(journalData, moodData, gratefulData, rememberData);

  });

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

  function getHeaderDate() {
    const currentHeaderDate = moment().format("YYYY-MM-DD");
    $("#date").text(currentHeaderDate);
  }
  getHeaderDate();
});

$("body").on("click touchend", ".appetite-dropdown",function(event){
  console.log(event.target);
  // #appetiteDropdownButton
  console.log($("#appetiteDropdownButton").text());
  setTimeout( function(event){
    $("#appetiteDropdownButton").text("Appetite: " + $(event.target).text());
    $("#appetiteDropdownButton").attr("data-appetite", $(event.target).attr("data-appetite-value"));
  }, 50, event);
  
});