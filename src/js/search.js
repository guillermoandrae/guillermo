$(document).ready(function() {
    $("#posts").DataTable({
        "info": false,
        "lengthChange": false,
        "pageLength": 7,
        "pagingType": "full_numbers",
        "order": [[ 2, "desc" ]],
        "ajax": "https://api.guillermoandraefisher.com/posts?limit=9999",
        "columns": [
            { "data": "source" },
            { "data": "body" },
            { "data": "id" }
        ],
        "language": {
            "search": "_INPUT_",
            "searchPlaceholder": "Search..."
        },
        "rowCallback": function( row, data, dataIndex ) {
            var link = document.createElement("a");
            link.setAttribute("href", data.htmlUrl);
            link.innerHTML = data.source;
            $("td:eq(0)", row).html(link);
            var postUrl = hashTagUrl = "";
            switch (data.source.toLowerCase()) {
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
            var content = data.body.replace(/\@([a-z0-9_]+)([ ;:.]?)/ig, '<a href="' + postUrl + '">@$1</a>$2')
                        .replace(/http(.*)(jpg|png|gif)/ig, '<a href="$&">$&</a>')
                        .replace(/https:\/\/t.co\/([a-z0-9]+){10}/ig, '<a href="$&">$&</a>')
                        .replace(/\`(.*)\`/ig, "<code>$1</code>")
                        .replace(/\#([a-z0-9_-]+)([ ;:.]?)/ig, '<a href="' + hashTagUrl + '">#$1</a>$2');
            $("td:eq(1)", row).html(content);                 
            var timestamp = (data.createdAt.length === 0) ? parseFloat(data.id) : parseFloat(data.createdAt) * 1000;
            var newDate = new Date(timestamp);
            $("td:eq(2)", row).html(newDate.toLocaleDateString());
        }
    });
});
