$(document).ready(function () {
    $.get("https://covid-19.bklyn.dev/cases", function (res) {
        var data = res.data;
        var $template = $(".covid-tile");
        $.each(data, function (i) {
            var $tile = $($template).clone();
            var count = data[i].numConfirmedCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (typeof count == null || count == 0) {
                count = "OOPS!";
            }
            var dateTime;
            if (data[i].updatedAt.toString().search("1970-") == -1 ) {
                dateTime = data[i].updatedAt.toString().split("+")[0].replace("T", " at ");
            } else {
                dateTime = "some time in the past, but with errors!";
            }
            $tile.find(".covid-state").html(data[i].state);
            $tile.find(".covid-count").html(count);
            $tile.find(".covid-time").html("Last updated " + dateTime);
            $tile.find(".covid-url a").attr("href", data[i].url);
            $tile.insertAfter($template);
            $tile.css("display", "block");
        });
    });
});
