---
layout: post
title: Introducing TablePlus
---

TablePlus is a [Chrome](https://www.google.com/chrome/index.html) extension to transform the contents of your clipboard and render markup text usable in [Jira](http://www.atlassian.com/jira).

### A Chrome extension

TablePlus adds entries to the context (right-click) menu in Google Chrome, so
that when you are entering text you can do some enhanced pasting:

* Paste Jira Table Markup
* Paste Jira Transposed Table Markup
* Paste Jira Escaped Markup

### Download

Install it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/tableplus/fhgekekdakigpdfdppllmpackoklhklb)

TablePlus is developed on and hosted with GitHub. Head to the <a href="https://github.com/mgualdron/TablePlus">GitHub repository</a> for code downloads, bug reports, and feature requests.

### Paste Jira Table Markup

Suppose you have a section of a spreadhseet or a portion of output from a
database client program you would like to include in a Jira comment:

![Spreadsheet selection]({{ site.baseurl }}img/Selection_004.png "Spreadsheet selection")

After selecting, and copying the data, right-click in the Jira comment field, and
select the TablePlus context menu entry for "Paste Jira Table Markup":

![Paste as markup]({{ site.baseurl }}img/Selection_005.png "Paste as markup")

TablePlus will transform the clipboard data into the markup that Jira expects
in order to render the table appropriately.  After pasting, you can click the
small "preview" icon on the lower-left to see what the final outcome will be:

![Pasted markup]({{ site.baseurl }}img/Selection_006.png "Pasted markup")

...and we see that we are taking full advantage of the Jira table rendering
features without typing a single pipe character:

![Preview and submission]({{ site.baseurl }}img/Selection_008.png "Preview and submission")

If satisfied with the results, you can click "Add" to submit the comment. You
can, of course mix this with other text or code within your comment:

![Preview with other text]({{ site.baseurl }}img/Selection_009.png "Preview with other text")


### Paste Jira Transposed Table Markup

In some cases the width of the data makes it impractical to paste as-is.  For
those cases it may make the data more readable to paste it in transposed form
(rows become columns).  This is especially helpful if there are only one or
two records, but many columns (10 in the example below).

Select and copy the wide data from the other application, as before:

![Wide selection]({{ site.baseurl }}img/Selection_010.png "Wide selection")

Then right-click on the Jira comment field and select "Paste Transposed Jira
Table Markup":

![Transposed menu entry]({{ site.baseurl }}img/Selection_011.png "Transposed menu entry")

The pasted markup looks as follows:

![Transposed markup]({{ site.baseurl }}img/Selection_014.png "Transposed markup")

And if we preview it as before, we see the following, which is more readable
than a 10 column table with 2 rows of data:

![Transposed preview]({{ site.baseurl }}img/Selection_013.png "Transposed preview")

### Paste Jira Escaped Markup

This last function is available in the event that you are entering text that
would normally be interpreted as markup, but you would like it to be taken
literally.

For example, you would like to type the word "Enter" surrounded by asterisks,
but you do NOT want it interpreted as bold text.

In that case start with the string in your clipboard, and then select the
"Paste Jira Escaped Markup" menu.  The extension will escape those characters
considered as markup by Jira.

![Paste escaped]({{ site.baseurl }}img/Selection_016.png "Paste escaped")

![Pasted text]({{ site.baseurl }}img/Selection_017.png "Pasted text")

...and the asterisks are escaped so the rendered result is not bolded:

![Pasted text]({{ site.baseurl }}img/Selection_018.png "Pasted text")

This was a short string that could have been escaped manually, but the
function is useful for large paragraphs that could contain special characters
that may alter the appearance of the text.

-----

Want to see something else added? <a href="https://github.com/mgualdron/TablePlus/issues/new">Open an issue.</a>
