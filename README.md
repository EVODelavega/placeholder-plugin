placeholder-plugin
==================

A tinyMCE plugin to add a placeholder menu to the editor

## Installation

Just install the plugin under tinymce's plugin directory (`plugins/placeholder`). At the moment, there is no automated build/install, so either minify the source yourself following the instructions below, or simply rename the `plugin.js` file to `plugin.min.js`.
A minified version of the plugin can be found int `tinymce/plugins/placeholder`. It is not auto-generated, and could be out of date, though.

Compile command:

`java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js plugin.js --js_output_file plugin.min.js`

The `--compilation_level` flag is optional, but preferred. Note that using `ADVANCED_OPTIMIZATIONS` will break the code.

## Usage

Using this plugin is easy. There are three config parameters you can pass to `tinymce.init`:

```javascript
        tinymce.init({
            selector: 'textarea',
            theme: "modern",
            plugins: ['placeholder'],
            toolbar: "placeholder",
            placeholders: '.placeholder',
            ph_remove: true,
            ph_callback: function()
            {
                tinymce.activeEditor.execCommand(
                    'mceInsertContent',
                    false,
                    this._value
                );
            }
        });
```

The `placeholders` value can be any one of three things: an array of object literals, each object requires either `text` or `value` to be set (in case one of them is missing, both will resolve to the same vale). In addition to this, an `onclick` property can be defined, if ommitted, the default callback will be used.
Alternatively, a `NodeList` can be passed here, too, including a jQuery object (`$('.hiddenPlaceholderElements')`).
If a string is passed, the plugin will use `document.querySelectorAll`, and use all found instances of the `HTMLElement` class, using `textContent` for `text`, its `value` attribute as value (if this is not available, the value defaults to the `text` value), and the `ph_callback` function will be used for the `onclick` property.
If neither an array, jQuery object, `NodeList` instance nor a string is passed, a `TypeError` will be thrown.

In case you are using DOM elements, it's not uncommon to want them deleted after they've been added to the editor(s). For this, you simply set the `ph_remove` property to `true`, and the plugin will attemt to delete the elements (using `elem.parentNode.removeChild(elem);`). Default behaviour is to *not* delete anything.

the `ph_callback` parameter is the default `onclick` handler when a placeholder is selected. The function in the snippet above is the default callback (inserting the placeholder value in the active editor). Set this value to `function(){}` will, essentially, disable the plugin (except for placeholders that have their own callback).
If the value of `ph_callback` is anything but a function, the default function will be used.

With this in mind, the example above should make sense now: all elements with the `placeholder` class will be used, to build the menu, and the elements will be removed. When one of these menu items is selected, the corresponding value will be added to the active editor. Simple.

Check the examples in the _example_ directory for more details.

## TODO's

- Automate build/installation
- Write tests
- Perhaps send a pull-request to the TinyMCE main repo
- Add support for asynchronous loading of the placeholders
- ...

## Invitation

If you feel as though there are things missing from this plugin, don't hesitate to fork and send me a pull-request, I'll be only too happy to merge it in.
I'm open to any feature requests, suggested bug-fixes or improvements you might have. Creating an issues therefore is greatly appreciated, too.
