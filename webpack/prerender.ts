import { platformUniversalDynamic } from 'angular2-universal';
import { PrebootOptions } from 'preboot';

// declare var Zone: any;

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

export class UniversalPrerender {
  platformRef: any;
  constructor(private options: IUniversalPrerender) {
    // if (this.options.ngModule) {
    //   this.platformRef.cacheModuleFactory(this.options.ngModule);
    // }
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {

      this.platformRef = this.platformRef || platformUniversalDynamic();
      this.options.document = this.options.document || compilation.assets[this.options.documentPath].source();

      // setTimeout(() => {
      //   const html = `hello world!`;
      //   console.log('hello world!');
      //   compilation.assets[this.options.documentPath] = {
      //     source: () => html,
      //     size: () => html.length
      //   };
      //   callback();
      // }, 1000);

      console.log(this.platformRef.serializeModule);

      this.platformRef.serializeModule(this.options.ngModule, this.options)
        .then((html) => {

          console.log('####', this.options, html);

          // if (typeof html !== 'string' || this.options.cancel) {
          //   compilation.assets[this.options.documentPath] = {
          //     source: () => this.options.document,
          //     size: () => this.options.document.length
          //   };
          //   return callback();
          // }
          //
          // compilation.assets[this.options.documentPath] = {
          //   source: () => html,
          //   size: () => html.length
          // };

          callback();
        })
        .catch(err => {
          console.error(err);
        });

    });
  }

  // otherApply(compiler) {
  //   compiler.plugin('emit', (_compilation, _callback) => {
  //     this.platformRef = this.platformRef || platformUniversalDynamic();
  //     this.options.document = this.options.document || _compilation.assets[this.options.documentPath].source();
  //     const zone = Zone.current.fork({
  //       name: 'UNIVERSAL prerender',
  //       properties: this.options
  //     });
  //     zone.run(() => (this.platformRef.serializeModule(this.options.ngModule, this.options))
  //       .then((html) => {
  //         console.log('UniversalPrerender!');
  //         console.log(this.options.documentPath, typeof html !== 'string');
  //         if (typeof html !== 'string' || this.options.cancel) {
  //           _compilation.assets[this.options.documentPath] = {
  //             source: () => this.options.document,
  //             size: () => this.options.document.length
  //           };
  //           return _callback();
  //         }
  //         _compilation.assets[this.options.documentPath] = {
  //           source: () => html,
  //           size: () => html.length
  //         };
  //         return _callback();
  //       })); // zone.run
  //   }); // compiler.plugin
  // } // apply
}
