$(document).ready(() => {

  // Mood constants
  const mood = $(".moods");
  const medication = $("#medication");
  const hoursSleep = $("#sleepTime");
  const minutesExercise = $("#exerciseTime");
  const minutesNapping = $("#napTime");
  const servingsCaffiene = $("#caffieneCount");
  const servingsAlcohol = $("#alcoholCount");
  const hoursDigital = $("#mediaTime");
  const minutesSocial = $("#socialTime");
  const showered = $("#showered");
  const teeth = $("#teeth");
  const selfCare = $("#selfCare");
  const headAche = $("#headAche");
  const nausea = $("#nausea");
  const exhaustion = $("#exhaustion");
  const insomnia = $("#insomnia");
  const menstruation = $("#mensturation");
  const appetite = $("#appetite");

  // Grateful constants
  const grateful1 = $("#grateful1");
  const grateful2 = $("#grateful2");
  const grateful3 = $("#grateful3");
  const grateful4 = $("#grateful4");
  const grateful5 = $("#grateful5");

  // Remember constants
  const remember1 = $("#remember1");
  const remember2 = $("#remember2");
  const remember3 = $("#remember3");
  const remember4 = $("#remember4");
  const remember5 = $("#remember5");

  // Journal constants
  const journalEntry = $("#exampleFormControlTextarea1");
  const date = $("#date");

  $("#submit").on("click", function () {

    const journalData = {
      entry: journalEntry.val().trim(),
      date: date.val().trim()
    };

    const moodData = {
      mood: mood.val().trim(),
      medication: medication.val().trim(),
      hoursSleep: hoursSleep.val().trim(),
      minutesExercise: minutesExercise.val().trim(),
      minutesNapping: minutesNapping.val().trim(),
      servingsCaffiene: servingsCaffiene.val().trim(),
      servingsAlcohol: servingsAlcohol.val().trim(),
      hoursTV: hoursDigital.val().trim(),
      showered: showered.val().trim(),
      brushedTeeth: teeth.val().trim(),
      madeBed: madeBed.val().trim(),
      selfCare: selfCare.val().trim(),
      minutesSocial: minutesSocial.val().trim(),
      headache: headAche.val().trim(),
      nausea: nausea.val().trim(),
      exhaustion: exhaustion.val().trim(),
      insomnia: insomnia.val().trim(),
      appetite: appetite.val().trim(),
      menstruation: menstruation.val().trim()
    };

    const gratefulData = {
      one: grateful1.val().trim(),
      two: grateful2.val().trim(),
      three: grateful3.val().trim(),
      four: grateful4.val().trim(),
      five: grateful5.val().trim()
    };

    const rememberData = {
      one: remember1.val().trim(),
      two: remember2.val().trim(),
      three: remember3.val().trim(),
      four: remember4.val().trim(),
      five: remember5.val().trim()
    };


    submitEntry(journalData, moodData, gratefulData, rememberData);

  });

  function submitEntry(data1, data2, data3, data4) {
    $.ajax({
      url: "/api/entry",
      method: "POST",
      body: { data1: data1, data2: data2, data3: data3, data4: data4 }
    })
      .then(function () {
        window.location.href = "/home";
      });
  }
});

