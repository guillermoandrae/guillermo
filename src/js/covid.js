$(document).ready(function () {
    $.get("https://covid-19.bklyn.dev", function (res) {
        const data = res.data;
        let $template = $(".covid-tile");
        $.each(data, function (i) {
            let $tile = $($template).clone();
            let count = data[i].numConfirmedCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let dateTime = data[i].updatedAt.toString().split("+")[0].replace("T", " at ");
            $tile.find(".covid-state").html(data[i].state);
            $tile.find(".covid-count").html(count);
            $tile.find(".covid-time").html("Last updated " + dateTime);
            let $link = $("<a></a>");
            $tile.find(".covid-url a").html(data[i].url);
            $tile.find(".covid-url a").attr("href", data[i].url);
            $tile.insertAfter($template);
            $tile.fadeIn();
        });
    });
});
