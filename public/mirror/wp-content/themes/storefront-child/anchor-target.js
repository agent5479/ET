var offset = 88;

$(".et-anchor").on("click", function (e) {
  e.preventDefault();
  var target = this.hash;
  if ($(this).data("offset") != undefined) offset = $(this).data("offset");
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: $(target).offset().top - offset,
      },
      500,
      "swing"
      //   ,
      //   function () {
      //     window.location.hash = target;
      //   }
    );
});

$(".nav-anchor > a").on("click", function (e) {
  var target = this.hash;
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: $(target).offset().top - offset,
      },
      500,
      "swing",
      function () {
        window.location.hash = target;
      }
    );
});
