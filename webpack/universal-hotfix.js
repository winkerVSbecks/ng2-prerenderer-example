var compiler = require('@angular/compiler');
var corePrivate = require('@angular/core').__core_private__;
if (!corePrivate.ViewUtils) {
    corePrivate.ViewUtils = corePrivate.view_utils;
}
if (compiler && compiler.SelectorMatcher && compiler.CssSelector) {
    Object.assign(compiler, {
        __compiler_private__: {
            SelectorMatcher: compiler.SelectorMatcher,
            CssSelector: compiler.CssSelector,
        },
    });
}
