'use strict';

console.log('The TablePlus event page is live!');

// This Chrome extension is based on the fine work by srsudar on biotool
// (https://github.com/srsudar/biotool).
//
// Only the content scripts can interact with the page that a user loads. This
// means that paste calls cannot be made from the background file, because
// the background scripts are not allowed to interact with the dom of the
// page.
//
// However, only background pages are able to access the
// system clipboard.  We define the functions here to actually read from
// the clipboard into a textarea defined in background html, and then
// we'll get that pasted data from the background page and do the actual
// insertion in the content script.
//
// The idea comes from:
// http://stackoverflow.com/questions/7144702/the-proper-use-of-execcommandpaste-in-a-chrome-extension
//
/**
 * Retrieve the current content of the system clipboard.
 */
function getContentFromClipboard() {
    var result = '';
    var sandbox = document.getElementById('sandbox');
    sandbox.value = '';
    sandbox.select();
    if (document.execCommand('paste')) {
        result = sandbox.value;
        console.log('got value from sandbox: ' + result);
    }
    sandbox.value = '';
    return result;
}

/**
 * Send the value that should be pasted to the content script.
 */
function sendPasteToContentScript(toBePasted) {
    // Find the active tab and window and then send the data along.
    // This is based on:
    // https://developer.chrome.com/extensions/messaging
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {type: 'paste', data: toBePasted}
        );
    });
}

function sendMessageToUser(msg) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {type: 'message', message: msg}
        );
    });
}

/**
 * The context menu
 */
function onClickHandler(info, tab) {
    console.log('info: ' + JSON.stringify(info));
    console.log('tab: ' + JSON.stringify(tab));
    var clipboardContent = getContentFromClipboard();
    var functions = window.tableFunctions;
    if (functions === undefined) {
        console.log('could not load table functions, will cause errors');
    }
    console.log('clipboardContent: ' + clipboardContent);
    var toPaste = '[blank]';
    if (info.menuItemId === 'pasteJira') {
        console.log('clicked paste Jira');
        sendMessageToUser('Pasted Jira table markup');
        toPaste = functions.getJira(clipboardContent);
        console.log('toPaste: ' + toPaste);
    } else if (info.menuItemId === 'pasteJiraTranspose') {
        console.log('clicked paste Jira Transposed');
        sendMessageToUser('Pasted Jira transposed table markup');
        toPaste = functions.getJiraTranspose(clipboardContent);
    } else if (info.menuItemId === 'pasteJiraEscape') {
        console.log('clicked paste Jira escaped');
        sendMessageToUser('Pasted Jira escaped markup');
        toPaste = functions.escapeJira(clipboardContent);
        console.log('toPaste: ' + toPaste);
    } else {
        console.log('unrecognized context menu id: ' + info.menuItemId);
    }
    sendPasteToContentScript(toPaste);
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// we're going to set up the context menu tree at install time.
chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);

    // We're going to create some context menu items. We need three such menus:
    // paste reverse
    // paste complement
    // paste reverse complement
    // This is following the example set forth in:
    // https://developer.chrome.com/extensions/samples#search:
    var parentItem = chrome.contextMenus.create(
        {
            'title': 'TablePlus',
            'id': 'parentItem',
            'contexts': ['editable']
        });
    chrome.contextMenus.create(
        {
            'title': 'Paste Jira Table Markup',
            'id': 'pasteJira',
            'parentId': parentItem,
            'contexts': ['editable']
        });
    chrome.contextMenus.create(
        {
            'title': 'Paste Jira Transposed Table Markup',
            'id': 'pasteJiraTranspose',
            'parentId': parentItem,
            'contexts': ['editable']
        });
    chrome.contextMenus.create(
        {
            'title': 'Paste Jira Escaped Markup',
            'id': 'pasteJiraEscape',
            'parentId': parentItem,
            'contexts': ['editable']
        });
});
