/*global SelectBox, interpolate*/
// Handles related-objects functionality: lookup link for raw_id_fields
// and Add Another links.

(function($) {
    'use strict';

<<<<<<< HEAD
=======
    function html_unescape(text) {
        // Unescape a string that was escaped using django.utils.html.escape.
        text = text.replace(/&lt;/g, '<');
        text = text.replace(/&gt;/g, '>');
        text = text.replace(/&quot;/g, '"');
        text = text.replace(/&#39;/g, "'");
        text = text.replace(/&amp;/g, '&');
        return text;
    }

>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
    // IE doesn't accept periods or dashes in the window name, but the element IDs
    // we use to generate popup window names may contain them, therefore we map them
    // to allowed characters in a reversible way so that we can locate the correct
    // element when the popup window is dismissed.
    function id_to_windowname(text) {
        text = text.replace(/\./g, '__dot__');
        text = text.replace(/\-/g, '__dash__');
        return text;
    }

    function windowname_to_id(text) {
        text = text.replace(/__dot__/g, '.');
        text = text.replace(/__dash__/g, '-');
        return text;
    }

    function showAdminPopup(triggeringLink, name_regexp, add_popup) {
        var name = triggeringLink.id.replace(name_regexp, '');
        name = id_to_windowname(name);
        var href = triggeringLink.href;
        if (add_popup) {
            if (href.indexOf('?') === -1) {
                href += '?_popup=1';
            } else {
                href += '&_popup=1';
            }
        }
        var win = window.open(href, name, 'height=500,width=800,resizable=yes,scrollbars=yes');
        win.focus();
        return false;
    }

    function showRelatedObjectLookupPopup(triggeringLink) {
        return showAdminPopup(triggeringLink, /^lookup_/, true);
    }

    function dismissRelatedLookupPopup(win, chosenId) {
        var name = windowname_to_id(win.name);
        var elem = document.getElementById(name);
        if (elem.className.indexOf('vManyToManyRawIdAdminField') !== -1 && elem.value) {
            elem.value += ',' + chosenId;
        } else {
            document.getElementById(name).value = chosenId;
        }
        win.close();
    }

    function showRelatedObjectPopup(triggeringLink) {
        return showAdminPopup(triggeringLink, /^(change|add|delete)_/, false);
    }

    function updateRelatedObjectLinks(triggeringLink) {
<<<<<<< HEAD
        var $this = $(triggeringLink);
=======
        var $this = django.jQuery(triggeringLink);
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
        var siblings = $this.nextAll('.change-related, .delete-related');
        if (!siblings.length) {
            return;
        }
        var value = $this.val();
        if (value) {
            siblings.each(function() {
<<<<<<< HEAD
                var elm = $(this);
=======
                var elm = django.jQuery(this);
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
                elm.attr('href', elm.attr('data-href-template').replace('__fk__', value));
            });
        } else {
            siblings.removeAttr('href');
        }
    }

    function dismissAddRelatedObjectPopup(win, newId, newRepr) {
<<<<<<< HEAD
=======
        // newId and newRepr are expected to have previously been escaped by
        // django.utils.html.escape.
        newId = html_unescape(newId);
        newRepr = html_unescape(newRepr);
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
        var name = windowname_to_id(win.name);
        var elem = document.getElementById(name);
        if (elem) {
            var elemName = elem.nodeName.toUpperCase();
            if (elemName === 'SELECT') {
                elem.options[elem.options.length] = new Option(newRepr, newId, true, true);
            } else if (elemName === 'INPUT') {
                if (elem.className.indexOf('vManyToManyRawIdAdminField') !== -1 && elem.value) {
                    elem.value += ',' + newId;
                } else {
                    elem.value = newId;
                }
            }
            // Trigger a change event to update related links if required.
<<<<<<< HEAD
            $(elem).trigger('change');
=======
            django.jQuery(elem).trigger('change');
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
        } else {
            var toId = name + "_to";
            var o = new Option(newRepr, newId);
            SelectBox.add_to_cache(toId, o);
            SelectBox.redisplay(toId);
        }
        win.close();
    }

    function dismissChangeRelatedObjectPopup(win, objId, newRepr, newId) {
<<<<<<< HEAD
        var id = windowname_to_id(win.name).replace(/^edit_/, '');
        var selectsSelector = interpolate('#%s, #%s_from, #%s_to', [id, id, id]);
        var selects = $(selectsSelector);
        selects.find('option').each(function() {
            if (this.value === objId) {
                this.textContent = newRepr;
=======
        objId = html_unescape(objId);
        newRepr = html_unescape(newRepr);
        var id = windowname_to_id(win.name).replace(/^edit_/, '');
        var selectsSelector = interpolate('#%s, #%s_from, #%s_to', [id, id, id]);
        var selects = django.jQuery(selectsSelector);
        selects.find('option').each(function() {
            if (this.value === objId) {
                this.innerHTML = newRepr;
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
                this.value = newId;
            }
        });
        win.close();
    }

    function dismissDeleteRelatedObjectPopup(win, objId) {
<<<<<<< HEAD
        var id = windowname_to_id(win.name).replace(/^delete_/, '');
        var selectsSelector = interpolate('#%s, #%s_from, #%s_to', [id, id, id]);
        var selects = $(selectsSelector);
        selects.find('option').each(function() {
            if (this.value === objId) {
                $(this).remove();
=======
        objId = html_unescape(objId);
        var id = windowname_to_id(win.name).replace(/^delete_/, '');
        var selectsSelector = interpolate('#%s, #%s_from, #%s_to', [id, id, id]);
        var selects = django.jQuery(selectsSelector);
        selects.find('option').each(function() {
            if (this.value === objId) {
                django.jQuery(this).remove();
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
            }
        }).trigger('change');
        win.close();
    }

    // Global for testing purposes
<<<<<<< HEAD
=======
    window.html_unescape = html_unescape;
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
    window.id_to_windowname = id_to_windowname;
    window.windowname_to_id = windowname_to_id;

    window.showRelatedObjectLookupPopup = showRelatedObjectLookupPopup;
    window.dismissRelatedLookupPopup = dismissRelatedLookupPopup;
    window.showRelatedObjectPopup = showRelatedObjectPopup;
    window.updateRelatedObjectLinks = updateRelatedObjectLinks;
    window.dismissAddRelatedObjectPopup = dismissAddRelatedObjectPopup;
    window.dismissChangeRelatedObjectPopup = dismissChangeRelatedObjectPopup;
    window.dismissDeleteRelatedObjectPopup = dismissDeleteRelatedObjectPopup;

    // Kept for backward compatibility
    window.showAddAnotherPopup = showRelatedObjectPopup;
    window.dismissAddAnotherPopup = dismissAddRelatedObjectPopup;

    $(document).ready(function() {
<<<<<<< HEAD
        $("a[data-popup-opener]").click(function(event) {
            event.preventDefault();
            opener.dismissRelatedLookupPopup(window, $(this).data("popup-opener"));
        });
=======
>>>>>>> 4022fc7946d2b6db29ef921a75a1a44058c92971
        $('body').on('click', '.related-widget-wrapper-link', function(e) {
            e.preventDefault();
            if (this.href) {
                var event = $.Event('django:show-related', {href: this.href});
                $(this).trigger(event);
                if (!event.isDefaultPrevented()) {
                    showRelatedObjectPopup(this);
                }
            }
        });
        $('body').on('change', '.related-widget-wrapper select', function(e) {
            var event = $.Event('django:update-related');
            $(this).trigger(event);
            if (!event.isDefaultPrevented()) {
                updateRelatedObjectLinks(this);
            }
        });
        $('.related-widget-wrapper select').trigger('change');
        $('.related-lookup').click(function(e) {
            e.preventDefault();
            var event = $.Event('django:lookup-related');
            $(this).trigger(event);
            if (!event.isDefaultPrevented()) {
                showRelatedObjectLookupPopup(this);
            }
        });
    });

})(django.jQuery);
