var opmlToJson = (function () {

  var traverse = function (node) {
    var currObj;
    currObj = { tag: node.nodeName };

    // if text node, check if it contains any text, otherwise don't create a node for it
    if (node.nodeType === 3) {
      // remove extra white space
      currObj.text = node.data.trim();
      // if there's no text left then ignore this node
      if (!currObj.text.length) return null;
    }
    processChildren(node, currObj);
    processAttributes(node, currObj);
    return currObj;
  };

  var processChildren = function (node, nodeObj) {
    var currChild, i = 0, loops;
    if (!node.childNodes || !(loops = node.childNodes.length)) return;
    nodeObj.children = [];
    for (; i < loops; i += 1) {
      currChild = node.childNodes[i];
      currChild = traverse(currChild);
      // if child is an emty text node, currChild will be null, in which case don't add it to children
      if (currChild) {
        nodeObj.children.push(currChild);
      }
    }
  };

  var processAttributes = function (node, nodeObj) {
    var currAttr, currAttrObj, i = 0, loops;
    if (!node.attributes || !(loops = node.attributes.length)) return;
    nodeObj.attributes = [];
    for (; i < loops; i += 1) {
      currAttrObj = {};
      currAttr = node.attributes[i];
      currAttrObj[currAttr.nodeName] = currAttr.value;
      nodeObj.attributes.push(currAttrObj);
    }
  };

  return function (data, pretty) {
    pretty = pretty || false;

    // convert string data to dom so that it is easy to traverse
    if (typeof data === 'string') {
      data = new DOMParser().parseFromString(data, 'text/xml');
    }

    return JSON.stringify(traverse(data), null, pretty ? '  ' : '');
  };
})();
