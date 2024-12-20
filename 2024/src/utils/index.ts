export * from "./Number";
export * from "./Array";

export const copy = (data: any) => {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(JSON.stringify(data));
  proc.stdin.end();
};
