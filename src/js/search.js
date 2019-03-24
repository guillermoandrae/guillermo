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
            var content = "";
            var urlPrefix = "https://" + data.source.toLowerCase() + ".com";
            content = data.body.replace(/\@([a-z]+)([ ;:.]?)/ig, '<a href="' + urlPrefix + '/$1">@$1</a>$2');
            content = content.replace(/http(.*)(jpg|png|gif)/ig, '<a href="$&">$&</a>');
            content = content.replace(/https:\/\/t.co\/(.*)/ig, '<a href="$&">$&</a>');
            content = content.replace(/\`(.*)\`/ig, "<code>$1</code>");
            $("td:eq(1)", row).html(content);                 
            var timestamp = (data.createdAt.length === 0) ? parseFloat(data.id) : parseFloat(data.createdAt) * 1000;
            var newDate = new Date(timestamp);
            $("td:eq(2)", row).html(newDate.toLocaleDateString());
        }
    });
});
