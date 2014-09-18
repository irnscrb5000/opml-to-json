# OPML to JSON converter, should also work for xml structured strings

## Syntax:
opmlToJson(data, prettyPrint)

- **data:** xml formatted string or dom to convert to json
- **prettyPrint:** if true, return json data in a human readable form, default is false

## Usage:
**With jQuery:**

```
  $.ajax({
    url: 'example.opml',
    dataType: 'xml'
  }).done(function (data) {
    var json = opmlToJson(data, true);
  });
```


**Using XMLHttpRequest:**

```
  var req = new XMLHttpRequests();
  req.onload = function () {
    var json = opmlToJson(this.response);
  };
  req.open('get', 'example.opml', true);
  req.send();
```


**Without ajax, using an xml formatted string as an argument:**

```
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
```
