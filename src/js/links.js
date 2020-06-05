$(document).ready(function () {
    $("ul.social a").click(function () {
        window.open(this.href);
        return false;
    });
});
