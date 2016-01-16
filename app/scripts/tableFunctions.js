// Functions for manipulating tables.
'use strict';

var localFunctions = function() {

    // Regular expressions containint CR/NL:
    var endCrRE    = /\r$/g;
    var anyCrRE    = /\r/g;
    var endNlRE    = /\n$/g;
    var endsNlRE   = /^\n|\n$/g;
    var anyNlRE    = /\n/g;
    var anyCrNlRE  = /\r\n/g;
    var crOrNlRE   = /[\r\n]{1,2}/g;
    var endsQuotRE = /^\042|\042$/g;

    // Regular expressions with a TAB character:
    var tabRE      = /\t/g;
    var tabsRE     = /\t\t/g;
    var startTabRE = /^\t/g;
    var endTabRE   = /\t$/g;
    var tabQuotRE  = /\042?\t\042?/g;

    // Jira special characters (to be escaped):
    var jiraRE = /[()\[\]{}|?~!#\^*_+-]/g;
    
    // This will be the object we export.
    var pub = {};

    // This will be the object housing the private methods.
    var pri = {};

    /**
     * Escape some characters in Jira markup
     */
    pub.escapeJira = function(string) {
        return string.replace(jiraRE, '\\$&');
    };


    /**
     * Split by new line, and replace tabs with pipes
     */
    pub.getJira = function(table) {
        var result = '';
        var lines = table.split(anyNlRE);
        record:
        for (var i = 0; i < lines.length; i++) {
            var currentLine = lines[i];
            currentLine = currentLine.replace(tabsRE,'\t \t');
            currentLine = currentLine.replace(tabsRE,'\t \t');
            currentLine = currentLine.replace(startTabRE,' \t');
            currentLine = currentLine.replace(endTabRE,'\t ');
            currentLine = pub.escapeJira(currentLine);
            if (i == 0) {
                currentLine = currentLine.replace(tabQuotRE, '||');
                if (currentLine == "") {
                    currentLine = " ";
                }
                currentLine = '||' + currentLine + '||\n';
            }
            else {
                currentLine = currentLine.replace(tabQuotRE, '|');
                if (currentLine == "") {
                    if (i == lines.length - 1) {
                        break record;
                    }
                    else {
                        currentLine = " ";
                    }
                }
                currentLine = '|' + currentLine + '|\n';
            }
            result += currentLine;
        }

        return result;
    };


    /**
     * Build a 2D array, and transpose it into a single string var
     */
    pub.getTranspose = function(table) {
        var result = 'Col\tField Name';
        var lines = table.split(anyNlRE);
        var cells = new Array();
        record:
        for (var i = 0; i < lines.length; i++) {
            var currentLine = lines[i];

            // blank lines at the end:
            if (currentLine == "" && i == lines.length - 1) {
                break record;
            }

            // 2D array:
            cells[i] = currentLine.split(tabRE);

            // the header:
            if (i > 0) {
                result = result + '\tRecord ' + i;
            }
        }

        // Put it all togetther in transposed form:
        // [Assuming every line has the same No. of cols as the first.]
        // j steps through the columns in the original string
        // i steps through the rows
        for (var j = 0; j < cells[0].length; j++) {
            var col = j + 1;
            result = result + '\n' + col;
            for (var i = 0; i < cells.length; i++) {
                result += '\t' + cells[i][j];
            }
        }

        return result;
    };

    /**
     * Transpose and convert to Jira markup
     */
    pub.getJiraTranspose = function(table) {

        return pub.getJira(pub.getTranspose(table));
    }

    return pub;
};

window.tableFunctions = localFunctions();
