$(document).ready(function() {
  function moveToSelected(element) {
    if (element == "next") {
      var selected = $(".selected").next();
    } else if (element == "prev") {
      var selected = $(".selected").prev();
    } else {
      var selected = element;
    }

    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();

    $(selected)
      .removeClass()
      .addClass("selected");

    $(prev)
      .removeClass()
      .addClass("prev");
    $(next)
      .removeClass()
      .addClass("next");

    $(nextSecond)
      .removeClass()
      .addClass("nextRightSecond");
    $(prevSecond)
      .removeClass()
      .addClass("prevLeftSecond");

    $(nextSecond)
      .nextAll()
      .removeClass()
      .addClass("hideRight");
    $(prevSecond)
      .prevAll()
      .removeClass()
      .addClass("hideLeft");
  };
  // events triggered
  $(document).keydown(function(e) {
    switch (e.which) {
      case 37: // left
        moveToSelected("prev");
        break;

      case 39: // right
        moveToSelected("next");
        break;

      default:
        return;
    }
    e.preventDefault();
  });
  //Bug when clicking on pictures in carousel
  // $("#carousel").click(function() {
  //   moveToSelected($(this));
  // });

  $("#prev").click(function() {
    moveToSelected("prev");
  });

  $("#next").click(function() {
    moveToSelected("next");
  });
});

//Quote form validation
jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
$( "#workType" ).validate({
  rules: {
    field: {
      required: true
    }
  }
});
$( "#budget" ).validate({
  rules: {
    field: {
      required: true
    }
  }
});
