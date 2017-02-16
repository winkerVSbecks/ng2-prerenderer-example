import 'ts-helpers';
import 'angular2-universal-polyfills';
require('./universal-hotfix.ts');

import { platformUniversalDynamic } from 'angular2-universal';
import { PrebootOptions } from 'preboot';

var fs = require('fs');
var path = require('path');

import { AppModule } from '../src/app/app.node.module';

declare var Zone: any;

export interface IUniversalPrerender {
  documentPath?: string;
  document?: string;
  DOCUMENT?: string;
  cancelHandler?: () => boolean;
  CANCEL_HANDLER?: () => boolean;
  req?: any;
  REQ?: any;
  res?: any;
  RES?: any;
  time?: boolean;
  TIME?: boolean;
  id?: string;
  ID?: string;
  ngModule?: any;
  precompile?: boolean;
  preboot?: PrebootOptions;
  cancel?: boolean;
  CANCEL?: boolean;
  requestUrl?: string;
  REQUEST_URL?: string;
  originUrl?: string;
  ORIGIN_URL?: string;
  baseUrl?: string;
  BASE_URL?: string;
  cookie?: string;
  COOKIE?: string;
}

const document = fs.readFileSync(
  path.join(__dirname, '../src/index.html')
).toString();

const options: IUniversalPrerender = {
  ngModule: AppModule,
  time: false,
  originUrl: 'http://localhost:8080',
  baseUrl: 'http://localhost:8080',
  requestUrl: 'http://localhost:8080',
  preboot: true,
  documentPath: './index.html',
  document: document,
};

const platformRef: any = platformUniversalDynamic();

const zone = Zone.current.fork({
  name: 'UNIVERSAL PRERENDER WEBPACK PLUGIN',
  properties: options
});

zone.run(() => (platformRef.serializeModule(
  options.ngModule,
  options,
))
.then((html) => {
  if (typeof html !== 'string' || options.cancel) {
    console.error('Invalid HTML generated', html);
  }

  fs.writeFile(
    path.join(__dirname, '../prerender-dist/index.html'),
    html,
    (err) => {
    if(err) { return console.log(err); }

    console.log('\n\n\n✨ You have pre-rendered! ✨\n\n\n');
  });
}));
