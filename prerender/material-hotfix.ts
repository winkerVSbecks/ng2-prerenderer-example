import { NodeDomRootRenderer, NodeDomRenderer } from 'angular2-universal/node';

const noop = function() {};
global['document'] = {
  createElement() {
    return {
      setAttribute: function(type) { this.type = type; },
      type: ''
    };
  },
};

function renderComponentFix(componentProto: any) {
  return new NodeDomRenderer(this, componentProto, this._animationDriver);
}

NodeDomRootRenderer.prototype.renderComponent = renderComponentFix;
// End Fix Universal Style

// Material style fix
var createElementOriginal = NodeDomRenderer.prototype.createElement;
function createElementFix(parent: any, name: any, _debugInfo: any) {
  var el = createElementOriginal.apply( this, [parent, name, _debugInfo] );
  if ( el != null ) {
    el.style = {};
    el.nodeName = el.name;
  }
  return el;
}
NodeDomRenderer.prototype.createElement = createElementFix;
// Material style fix

// Material disable MdRipple work around.
import { MdRipple } from '@angular/material/core/ripple/ripple';

// Make these functions NOOP.
MdRipple.prototype.ngOnInit = noop;
MdRipple.prototype.ngOnDestroy = noop;
MdRipple.prototype.ngOnChanges = noop;
// Material disable MdRipple work around.

// Material disable ripple on Button work around.
import { MdButton } from '@angular/material/button/button';
MdButton.prototype._isRippleDisabled = function () {
  return true;
};
// Material disable MdRipple work around.

// Disable observe content on the server.
import { ObserveContent } from '@angular/material/core/observe-content/observe-content';
ObserveContent.prototype.ngAfterContentInit = noop;
// Disable observe content on the server.

// import {getSupportedInputTypes} from '@angular/material/core/platform/features';
//
// getSupportedInputTypes = () => new Set([
//   'button',
//   'checkbox',
//   'color',
//   'date',
//   'datetime-local',
//   'email',
//   'file',
//   'hidden',
//   'image',
//   'month',
//   'number',
//   'password',
//   'radio',
//   'range',
//   'reset',
//   'search',
//   'submit',
//   'tel',
//   'text',
//   'time',
//   'url',
//   'week',
// ]);
