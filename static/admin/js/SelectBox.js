<<<<<<< HEAD
(function($) {
=======
(function() {
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
    'use strict';
    var SelectBox = {
        cache: {},
        init: function(id) {
            var box = document.getElementById(id);
            var node;
            SelectBox.cache[id] = [];
            var cache = SelectBox.cache[id];
<<<<<<< HEAD
            var boxOptions = box.options;
            var boxOptionsLength = boxOptions.length;
            for (var i = 0, j = boxOptionsLength; i < j; i++) {
                node = boxOptions[i];
=======
            for (var i = 0, j = box.options.length; i < j; i++) {
                node = box.options[i];
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
                cache.push({value: node.value, text: node.text, displayed: 1});
            }
        },
        redisplay: function(id) {
            // Repopulate HTML select box from cache
            var box = document.getElementById(id);
            var node;
<<<<<<< HEAD
            $(box).empty(); // clear all options
            var new_options = box.outerHTML.slice(0, -9);  // grab just the opening tag
=======
            box.options.length = 0; // clear all options
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
            var cache = SelectBox.cache[id];
            for (var i = 0, j = cache.length; i < j; i++) {
                node = cache[i];
                if (node.displayed) {
                    var new_option = new Option(node.text, node.value, false, false);
                    // Shows a tooltip when hovering over the option
                    new_option.setAttribute("title", node.text);
<<<<<<< HEAD
                    new_options += new_option.outerHTML;
                }
            }
            new_options += '</select>';
            box.outerHTML = new_options;
=======
                    box.options[box.options.length] = new_option;
                }
            }
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
        },
        filter: function(id, text) {
            // Redisplay the HTML select box, displaying only the choices containing ALL
            // the words in text. (It's an AND search.)
            var tokens = text.toLowerCase().split(/\s+/);
            var node, token;
            var cache = SelectBox.cache[id];
            for (var i = 0, j = cache.length; i < j; i++) {
                node = cache[i];
                node.displayed = 1;
<<<<<<< HEAD
                var node_text = node.text.toLowerCase();
                var numTokens = tokens.length;
                for (var k = 0; k < numTokens; k++) {
                    token = tokens[k];
                    if (node_text.indexOf(token) === -1) {
                        node.displayed = 0;
                        break;  // Once the first token isn't found we're done
=======
                var numTokens = tokens.length;
                for (var k = 0; k < numTokens; k++) {
                    token = tokens[k];
                    if (node.text.toLowerCase().indexOf(token) === -1) {
                        node.displayed = 0;
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
                    }
                }
            }
            SelectBox.redisplay(id);
        },
        delete_from_cache: function(id, value) {
            var node, delete_index = null;
            var cache = SelectBox.cache[id];
            for (var i = 0, j = cache.length; i < j; i++) {
                node = cache[i];
                if (node.value === value) {
                    delete_index = i;
                    break;
                }
            }
<<<<<<< HEAD
            cache.splice(delete_index, 1);
=======
            var k = cache.length - 1;
            for (i = delete_index; i < k; i++) {
                cache[i] = cache[i + 1];
            }
            cache.length--;
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
        },
        add_to_cache: function(id, option) {
            SelectBox.cache[id].push({value: option.value, text: option.text, displayed: 1});
        },
        cache_contains: function(id, value) {
            // Check if an item is contained in the cache
            var node;
            var cache = SelectBox.cache[id];
            for (var i = 0, j = cache.length; i < j; i++) {
                node = cache[i];
                if (node.value === value) {
                    return true;
                }
            }
            return false;
        },
        move: function(from, to) {
            var from_box = document.getElementById(from);
            var option;
            var boxOptions = from_box.options;
<<<<<<< HEAD
            var boxOptionsLength = boxOptions.length;
            for (var i = 0, j = boxOptionsLength; i < j; i++) {
                option = boxOptions[i];
                var option_value = option.value;
                if (option.selected && SelectBox.cache_contains(from, option_value)) {
                    SelectBox.add_to_cache(to, {value: option_value, text: option.text, displayed: 1});
                    SelectBox.delete_from_cache(from, option_value);
=======
            for (var i = 0, j = boxOptions.length; i < j; i++) {
                option = boxOptions[i];
                if (option.selected && SelectBox.cache_contains(from, option.value)) {
                    SelectBox.add_to_cache(to, {value: option.value, text: option.text, displayed: 1});
                    SelectBox.delete_from_cache(from, option.value);
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
                }
            }
            SelectBox.redisplay(from);
            SelectBox.redisplay(to);
        },
        move_all: function(from, to) {
            var from_box = document.getElementById(from);
            var option;
            var boxOptions = from_box.options;
<<<<<<< HEAD
            var boxOptionsLength = boxOptions.length;
            for (var i = 0, j = boxOptionsLength; i < j; i++) {
                option = boxOptions[i];
                var option_value = option.value;
                if (SelectBox.cache_contains(from, option_value)) {
                    SelectBox.add_to_cache(to, {value: option_value, text: option.text, displayed: 1});
                    SelectBox.delete_from_cache(from, option_value);
=======
            for (var i = 0, j = boxOptions.length; i < j; i++) {
                option = boxOptions[i];
                if (SelectBox.cache_contains(from, option.value)) {
                    SelectBox.add_to_cache(to, {value: option.value, text: option.text, displayed: 1});
                    SelectBox.delete_from_cache(from, option.value);
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
                }
            }
            SelectBox.redisplay(from);
            SelectBox.redisplay(to);
        },
        sort: function(id) {
            SelectBox.cache[id].sort(function(a, b) {
                a = a.text.toLowerCase();
                b = b.text.toLowerCase();
                try {
                    if (a > b) {
                        return 1;
                    }
                    if (a < b) {
                        return -1;
                    }
                }
                catch (e) {
                    // silently fail on IE 'unknown' exception
                }
                return 0;
            } );
        },
        select_all: function(id) {
            var box = document.getElementById(id);
<<<<<<< HEAD
            var boxOptions = box.options;
            var boxOptionsLength = boxOptions.length;
            for (var i = 0; i < boxOptionsLength; i++) {
                boxOptions[i].selected = 'selected';
=======
            for (var i = 0; i < box.options.length; i++) {
                box.options[i].selected = 'selected';
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
            }
        }
    };
    window.SelectBox = SelectBox;
<<<<<<< HEAD
})(django.jQuery);
=======
})();
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
