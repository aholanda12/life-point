$(function () {
  $("button-a").on("click", event => {
    event.preventDefault();
    $.ajax("/members", type = "GET")
      .then(() => {
        console.log("we hhere");
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  });
});