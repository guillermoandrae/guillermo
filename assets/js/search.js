var getSourceColumnContent = function (source, url) {
    var link = document.createElement("a");
    link.setAttribute("href", url);
    link.innerHTML = "<i class=\"fab fa-" + source.toString().toLocaleLowerCase() + "\"></i>";
    return link;
};

var getContentColumnContent = function (source, body) {
    var postUrl = hashTagUrl = "";
    switch (source.toLowerCase()) {
        case "github":
            postUrl = "https://github.com/$1";
            hashTagUrl = "https://github.com/guillermoandrae";
            break;
        case "instagram":
            postUrl = "https://instagram.com/$1";
            hashTagUrl = "https://www.instagram.com/explore/tags/$1/";
            break;
        case "twitter":
            postUrl = "https://twitter.com/$1";
            hashTagUrl = "https://twitter.com/hashtag/$1?src=hash";
            break;
    }
    var content = body.replace(/\@([a-z0-9_]+)([ ;:.]?)/ig, '<a href="' + postUrl + '">@$1</a>$2')
        .replace(/http(.*)(jpg|png|gif)/ig, '<a href="$&">$&</a>')
        .replace(/https:\/\/t.co\/([a-z0-9]+){10}/ig, '<a href="$&">$&</a>')
        .replace(/\`(.*)\`/ig, "<code>$1</code>")
        .replace(/\#([a-z0-9_-]+)([ ;:.]?)/ig, '<a href="' + hashTagUrl + '">#$1</a>$2');
    return content;
};

var getDateColumnContent = function (id, createdAt) {
    var timestamp = (createdAt.length === 0) ? parseFloat(id) : parseFloat(createdAt) * 1000;
    var newDate = new Date(timestamp);
    return newDate.toLocaleDateString();
};

$(document).ready(function () {
    $("#posts").DataTable({
        "info": false,
        "lengthChange": false,
        "pageLength": 10,
        "pagingType": $(window).width() < 991.98 ? "full" : "full_numbers",
        "order": [[ 2, "desc" ]],
        "ajax": "https://api.guillermoandraefisher.com/posts?limit=9999",
        "columns": [
            { "data": "source" },
            { "data": "body" },
            { "data": "id" }
        ],
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Curious? Go for it..."
        },
        "rowCallback": function (row, data, dataIndex) {
            $("td:eq(0)", row).html(getSourceColumnContent(data.source, data.htmlUrl));
            $("td:eq(1)", row).html(getContentColumnContent(data.source, data.body));
            $("td:eq(2)", row).html(getDateColumnContent(data.id, data.createdAt));
        }
    });
});
