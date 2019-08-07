var Allowance = function () {
    var getChildren = function () {
        return [
            { "id": 1, "name": "Tatiana", "max_weekly_amount": 10, "owed_week_amount": 7.5, "backpay_amount": 0 },
            { "id": 2, "name": "Jayden", "max_weekly_amount": 8, "owed_week_amount": 4, "backpay_amount": 0 },
            { "id": 3, "name": "Amaya", "max_weekly_amount": 8, "owed_week_amount": 8, "backpay_amount": 0 }
        ];
    };

    var drawChildCards = function () {
        var container = $(".children").first();
        var template = $(".child-template");
        var children = getChildren();
        $(children).each(function (index, child) {
            var card = template;
            card.find(".child-avatar img").attr("src", "img/tatiana.jpg");
            var owedThisWeekElement = card.find(".child-week-amount");

            owedThisWeekElement.html(child.owed_week_amount);
            if (child.max_weekly_amount > child.owed_week_amount) {
                owedThisWeekElement.addClass("text-warning");
            } else {
                owedThisWeekElement.removeClass("text-warning");
                owedThisWeekElement.addClass("text-success");
            }
            
            card.find(".child-backpay-amount").html(child.backpay_amount);
            container.append(card.html());
        });
    };

    return {
        init: function () {
            drawChildCards();
        }
    }

}();

$(document).ready(function(){
    Allowance.init();
    $("#sidebarToggleTop").click();
});