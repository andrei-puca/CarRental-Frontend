/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApplicationRef, NgModuleRef } from "@angular/core";
import { enableDebugTools } from "@angular/platform-browser";
import { Environment } from "./model";

Error.stackTraceLimit = Infinity;
require("zone.js/dist/long-stack-trace-zone");

export const environment: Environment = {
  production: false,

  showDevModule: true,

  /** Angular debug tools in the dev console
   * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
   *
   * @param modRef
   * @return {any}
   */
  decorateModuleRef(modRef: NgModuleRef<any>) {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    const { ng } = window as any;
    enableDebugTools(cmpRef);
    (window as any).ng.probe = ng.probe;
    (window as any).ng.coreTokens = ng.coreTokens;
    return modRef;
  },
  ENV_PROVIDERS: [],
};
