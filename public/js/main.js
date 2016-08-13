$(function () {
  "use strict";

  console.log("testFire");
  function pad (n, i, ch, left) {

    n = n.toString();

    while(n.length < i) {
      if (left) {
        n = ch + n;
      } else {
        n += ch;
      }
    }

    return n;
  }

  //var dateParts = new Date().toLocaleString().split(/,/)[0].split(/\//);
  var d = new Date();
  //console.log(dateParts);
  $('.js-date').val(d.getFullYear() + "-" + pad(d.getMonth() + 1, 2, '0', true) + '-' + pad(d.getDate(), 2, '0', true));
  $('.js-time').val(pad(d.getHours(), 2, '0', true) + ":" + pad(d.getMinutes(), 2, '0', true));
  $('body').on('submit', 'form.js-submit', function (ev){
    ev.preventDefault();
    ev.stopPropagation();
    var data = {
      email: $('.js-email').val(),
      date: $('.js-date').val(),
      time: $('.js-time').val()
    }
    $.ajax({
      method: "POST",
      url: "/api/com.mailgun/send",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": 'application/json; charset="utf-8"'
      }
    }).then(function (data){
      console.log(data);
    });
  });

});
