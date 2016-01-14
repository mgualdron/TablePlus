/* global describe, it, assert */

(function () {
    'use strict';

    var functions = window.tableFunctions;

    describe('Jira Escape', function() {

        it('Exists and is a function', function() {
            assert.isFunction(functions.escapeJira);
        });

        it('Handles empty string', function() {
            var target = '';
            var actual = functions.escapeJira('');
            assert.equal(actual, target);
        });

        it('Does not escape alpha-numerics', function() {
            var target = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var actual = functions.escapeJira('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
            assert.equal(actual, target);
        });

        // var jiraRE = /[()\[\]{}|?~!#\^*_+-]/g;
        it('Does escape special characters', function() {
            var target = '\\(\\)\\[\\]\\{\\}\\|\\?\\~\\!\\#\\^\\*\\_\\+\\-';
            var actual = functions.escapeJira('()[]{}|?~!#^*_+-');
            assert.equal(actual, target);
        });

    });

    describe('Jira Table', function() {

        it('Exists and is a function', function() {
            assert.isFunction(functions.getJira);
        });

        it('Handles empty string', function() {
            var target = '|| ||\n';
            var actual = functions.getJira('');
            assert.equal(actual, target);
        });

        it('Handles spaces', function() {
            var target = '||  ||\n';
            var actual = functions.getJira('  ');
            assert.equal(actual, target);
        });

        it('Handles multiple columns in one line', function() {
            var target = '||a||b||c||\n';
            var actual = functions.getJira('a\tb\tc');
            assert.equal(actual, target);
        });

        it('Handles multiple columns in multiple lines', function() {
            var target = '||a||b||c||\n|d|e|f|\n|h|i|j|\n';
            var actual = functions.getJira('a\tb\tc\nd\te\tf\nh\ti\tj');
            assert.equal(actual, target);
        });

        it('Handles escapes', function() {
            var target = '||a||b||c||\n|\\{d\\}|\\(e\\)|\\[f\\]|\n|\\#|\\^|\\*|\n';
            var actual = functions.getJira('a\tb\tc\n{d}\t(e)\t[f]\n#\t^\t*');
            assert.equal(actual, target);
        });

    });


})();
