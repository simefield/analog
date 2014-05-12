// Select text: http://stackoverflow.com/questions/12243898/how-to-select-all-text-in-contenteditable-div
jQuery.prototype.selectText = function(){
    var doc = document;
    var element = this[0];
    var range;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};
