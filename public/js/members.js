$(document).ready(() => {

  // Mood constants
  const mood = $("");
  const medication = $("input#medication");
  const hoursSleep = $("input#sleepTime");
  const minutesExercise = $("input#exerciseTime");
  const minutesNapping = $("input#napTime");
  const servingsCaffiene = $("input#caffieneCount");
  const servingsAlcohol = $("input#alcoholCount");
  const hoursDigital = $("input#mediaTime");
  const minutesSocial = $("input#socialTime");
  const showered = $("input#showered");
  const teeth = $("input#teeth");
  const selfCare = $("input#selfCare");
  const headAche = $("input#headAche");
  const nausea = $("input#nausea");
  const exhaustion = $("input#exhaustion");
  const insomnia = $("input#insomnia");
  const menstruation = $("input#mensturation");
  const appetite = $("#appetite");

  // Grateful constants
  const grateful1 = $("input#grateful1");
  const grateful2 = $("input#grateful2");
  const grateful3 = $("input#grateful3");
  const grateful4 = $("input#grateful4");
  const grateful5 = $("input#grateful5");

  // Remember constants
  const remember1 = $("input#remember1");
  const remember2 = $("input#remember2");
  const remember3 = $("input#remember3");
  const remember4 = $("input#remember4");
  const remember5 = $("input#remember5");

  // Journal constants
  const journalEntry = $("exampleFormControlTextarea1");
  const date = $("");

  $(document).on("submit", function(event) {
    event.preventDefault();

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

  function submitEntry() {
    $.post("/api/entry", journalData, moodData, gratefulData, rememberData)
      .then(() => {
        window.location.replace("/home");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
});

