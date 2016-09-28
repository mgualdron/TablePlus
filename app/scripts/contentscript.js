/* global toastr */
'use strict';

/**
 * Insert the text at the cursor into the active element. Note that we're
 * intentionally not appending or simply replacing the value of the editable
 * field, as we want to allow normal pasting conventions. If you paste at the
 * beginning, you shouldn't see all your text be replaced.
 * Taken from:
 * http://stackoverflow.com/questions/7404366/how-do-i-insert-some-text-where-the-cursor-is
 */


/**
 * This method appears not to be working since Chrome version 53:
 *
 * function insertTextAtCursor(text) {
 *     var el = document.activeElement;
 *     var ev = document.createEvent('TextEvent');
 *     ev.initTextEvent('textInput', true, true, null, text);
 *     el.focus();
 *     el.dispatchEvent(ev);
 * }
 */


// Trying a new way, also explained here:
// http://stackoverflow.com/questions/7404366/how-do-i-insert-some-text-where-the-cursor-is
function insertTextAtCursor(text) {
    var el = document.activeElement;
    var val = el.value, endIndex, range, doc = el.ownerDocument;
    if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
        endIndex = el.selectionEnd;
        el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
        el.selectionStart = el.selectionEnd = endIndex + text.length;
    } else if (doc.selection !== 'undefined' && doc.selection.createRange) {
        el.focus();
        range = doc.selection.createRange();
        range.collapse(false);
        range.text = text;
        range.select();
    }
}

/**
 * Configure our toasting library.
 */
function initializeToastr() {
    toastr.options = {
        'closeButton': false,
        'debug': false,
        'newestOnTop': false,
        'progressBar': false,
        'positionClass': 'toast-top-right',
        'preventDuplicates': false,
        'onclick': null,
        'showDuration': '300',
        'hideDuration': '1000',
        'timeOut': '3000',
        'extendedTimeOut': '1000',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut'
    };
}

function makeSuccessToast(text) {
    initializeToastr();
    toastr.success(text);
}

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.type === 'paste') {
            insertTextAtCursor(request.data);
        } else if (request.type === 'message') {
            // we will assume that all of the messages are successes.
            makeSuccessToast(request.message);
        }
    }
);
