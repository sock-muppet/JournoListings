var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

pageMod.PageMod({
  include: ["http://*", "https://*"],
  contentScriptFile: [self.data.url("lib/sites.js"), self.data.url("lib/inject.js"), self.data.url("lib/lists/gamejournopros.js"), self.data.url("lib/lists/journolist.js"), self.data.url("lib/lists/gamechanger-salon.js")],
  contentStyleFile: self.data.url("lib/inject.css")
});
