# OPML to JSON converter, should also work for xml structured strings

Will convert:
'''
<?xml version="1.0" encoding="ISO-8859-1"?>
<opml version="2.0">
	<head>
		<title>mySubscriptions.opml</title>
		<dateCreated>Sat, 18 Jun 2005 12:11:52 GMT</dateCreated>
		<dateModified>Tue, 02 Aug 2005 21:42:48 GMT</dateModified>
	</head>
	<body>
		<outline text="CNET News.com" description="Tech news and business reports by CNET News.com. Focused on information technology, core topics include computers, hardware, software, networking, and Internet media." htmlUrl="http://news.com.com/" language="unknown" title="CNET News.com" type="rss" version="RSS2" xmlUrl="http://news.com.com/2547-1_3-0-5.xml"/>
		<outline text="washingtonpost.com - Politics" description="Politics" htmlUrl="http://www.washingtonpost.com/wp-dyn/politics?nav=rss_politics" language="unknown" title="washingtonpost.com - Politics" type="rss" version="RSS2" xmlUrl="http://www.washingtonpost.com/wp-srv/politics/rssheadlines.xml"/>
	</body>
</opml>
'''

to:
'''
{
  "tag": "#document",
  "children": [
    {
      "tag": "opml",
      "children": [
        {
          "tag": "head",
          "children": [
            {
              "tag": "title",
              "children": [
                {
                  "tag": "#text",
                  "text": "mySubscriptions.opml"
                }
              ]
            }
          ]
        },
        {
          "tag": "body",
          "children": [
            {
              "tag": "outline",
              "attributes": [
                {
                  "text": "CNET News.com"
                },
                {
                  "description": "Tech news and business reports by CNET News.com. Focused on information technology, core topics include computers, hardware, software, networking, and Internet media."
                },
                {
                  "htmlUrl": "http://news.com.com/"
                },
                {
                  "language": "unknown"
                },
                {
                  "title": "CNET News.com"
                },
                {
                  "type": "rss"
                },
                {
                  "version": "RSS2"
                },
                {
                  "xmlUrl": "http://news.com.com/2547-1_3-0-5.xml"
                }
              ]
            }
          ]
        }
      ],
      "attributes": [
        {
          "version": "2.0"
        }
      ]
    }
  ]
}
'''
or this, if pretty print is used:
'''
{"tag":"#document","children":[{"tag":"opml","children":[{"tag":"head","children":[{"tag":"title","children":[{"tag":"#text","text":"mySubscriptions.opml"}]}]},{"tag":"body","children":[{"tag":"outline","attributes":[{"text":"CNET News.com"},{"description":"Tech news and business reports by CNET News.com. Focused on information technology, core topics include computers, hardware, software, networking, and Internet media."},{"htmlUrl":"http://news.com.com/"},{"language":"unknown"},{"title":"CNET News.com"},{"type":"rss"},{"version":"RSS2"},{"xmlUrl":"http://news.com.com/2547-1_3-0-5.xml"}]}]}],"attributes":[{"version":"2.0"}]}]}
'''

## Syntax:
opmlToJson(data, pretty)

data: xml formatted string or dom to convert to json
pretty: if true, return json data in a human readable form, default is false

## Usage:

With jQuery:

'''
  $.ajax({
    url: 'example.opml',
    dataType: 'xml'
  }).done(function (data) {
    var json = opmlToJson(data, true);
    console.log(json);
  });
'''


Using XMLHttpRequest:

'''
  var req = new XMLHttpRequests();
  req.onload = function () {
    var json = opmlToJson(this.response);
    console.log(json);
  };
  req.open('get', 'example.opml', true);
  req.send();
'''


Without ajax, using an xml formatted string as an argument:

'''
  var json_str = '<?xml version="1.0" encoding="ISO-8859-1"?>\
    <opml version="2.0">\
    <head>\
      <title>mySubscriptions.opml</title>\
    </head>\
    <body>\
      <outline text="CNET News.com" description="Tech news and business reports by CNET News.com. Focused on information technology, core topics include computers, hardware, software, networking, and Internet media." htmlUrl="http://news.com.com/" language="unknown" title="CNET News.com" type="rss" version="RSS2" xmlUrl="http://news.com.com/2547-1_3-0-5.xml"/>\
    </body>\
  </opml>';
  var json = opmlToJson(json_str);
  console.log(json);
'''
