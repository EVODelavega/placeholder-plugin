tinymce.PluginManager.add('placeholder', function(editor)
{
    var i, item, placeholders = [],
        config = {
            remove: editor.settings.ph_remove || false,
            ph_items: editor.settings.placeholders,
            ph_cb: typeof editor.settings.ph_callback === 'function' ? editor.settings.ph_callback : function()
            {
                tinymce.activeEditor.execCommand(
                    'mceInsertContent',
                    false,
                    this._value
                );
            }
        };
    if (typeof config.ph_items === 'string') {
        config.ph_items = document.querySelectorAll(config.ph_items);
    }
    if (!(config instanceof NodeList) && typeof config.ph_items[0] !== 'object') {
        throw new TypeError('placeholder items must be objects (pass either an array, a NodeList, a jQuery object or a selector string)');
    }
    for (i=0;i<config.ph_items.length;++i) {
        if (config.ph_items[i] instanceof HTMLElement) {
            item = {
                text: config.ph_items[i].textContent,
                value: config.ph_items[i].value || this.text,
                onclick: config.ph_cb
            };
        } else {
            item = config.ph_items[i];
            if (!item.hasOwnProperty('value')) {
                item.value = item.text || '';
            }
            if (!item.hasOwnProperty('text')) {
                item.text = item.value;
            }
            if (!item.hasOwnProperty('onclick')) {
                item.onclick = config.ph_cb;
            }
        }
        placeholders.push(item);
    }
    if (config.remove) {
        for(i=0;i<config.ph_items.length;++i) {
            if (config.ph_items[i] instanceof HTMLElement) {
                config.ph_items[i].parentNode.removeChild(
                    config.ph_items[i]
                );
            }
        }
    }
    editor.addButton('placeholder', {
        text: 'Placeholders',
        type: 'menubutton',
        name: 'placeholder',
        icon: false,
        menu: placeholders
    });
});
