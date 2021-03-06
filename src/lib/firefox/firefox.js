// Load Firefox based resources
var self          = require("sdk/self"),
    data          = self.data,
    sp            = require("sdk/simple-prefs"),
    Request       = require("sdk/request").Request,
    prefs         = sp.prefs,
    buttons       = require('sdk/ui/button/action'),
    system        = require("sdk/system"),
    pageMod       = require("sdk/page-mod"),
    tabs          = require("sdk/tabs"),
    {Cc, Ci, Cu}  = require('chrome'),
    windows          = {
      get active () { /* Chrome window */
        return require('sdk/window/utils').getMostRecentBrowserWindow()
      }
    };

Cu.import("resource://gre/modules/Promise.jsm");

var button = buttons.ActionButton({
  id: "igshortcuts",
  label: "Shortcuts for Google™ Products",
  icon: {
    "16": "./icon16.png",
    "32": "./icon32.png",
    "64": "./icon64.png"
  },
  onClick: function (state) {
    popup.show({
      position: button
    });
  }
});

var popup = require("sdk/panel").Panel({
  width: 250,
  height: 210,
  contentURL: data.url("./popup/popup.html"),
  contentScriptFile: [data.url("./popup/popup.js"), data.url("./popup/drag.js"), data.url("./popup/jscolor/jscolor.js")]
});
popup.on('show', function() {
  popup.port.emit('show', true);
});
popup.on('hide', function() {
  popup.port.emit('hide', true);
});
popup.port.on('resize', function(obj) {
  var padding = 0;
  var isMozilla = system.vendor.indexOf('Mozilla') != -1;
  var isDarwin = system.platform.indexOf('darwin') != -1;
  if (isMozilla && isDarwin) padding = 2;
  popup.resize(obj.w + padding, obj.h + padding);
});
popup.port.on('close-panel', function () {
  popup.hide();
});

exports.storage = {
  read: function (id) {
    return (prefs[id] || prefs[id] + "" == "false") ? (prefs[id] + "") : null;
  },
  write: function (id, data) {
    data = data + "";
    if (data === "true" || data === "false") {
      prefs[id] = data === "true" ? true : false;
    }
    else if (parseInt(data) === data) {
      prefs[id] = parseInt(data);
    }
    else {
      prefs[id] = data + "";
    }
  }
}

exports.popup = {
  send: function (id, data) {
    popup.port.emit(id, data);
  },
  receive: function (id, callback) {
    popup.port.on(id, callback);
  }
}

exports.tab = {
  open: function (url, inBackground, inCurrent) {
    if (inCurrent) {
      tabs.activeTab.url = url;
    }
    else {
      tabs.open({
        url: url,
        inBackground: typeof inBackground == 'undefined' ? false : inBackground
      });
    }
  }
}

exports.version = function () {
  return self.version;
}

exports.window = require('sdk/window/utils').getMostRecentBrowserWindow();

/**************************************************************************************************/

var icons = [
  {
    label: "Google Alerts",
    icon: "alerts",
    url: "https://www.google.com/alerts"
  },
  {
    label: "Google Analytics",
    icon: "analytics",
    url: "https://www.google.com/analytics/"
  },
  {
    label: "Google Blog Search",
    icon: "blog",
    url: "https://www.google.com/blogsearch/"
  },
  {
    label: "Google Blogger",
    icon: "blogger",
    url: "https://www.blogger.com/"
  },
  {
    label: "Google Books",
    icon: "book",
    url: "https://books.google.com/"
  },
  {
    label: "Google Calendar",
    icon: "calender",
    url: "https://www.google.com/calendar/"
  },
  {
    label: "Google Code",
    icon: "code",
    url: "https://code.google.com/"
  },
  {
    label: "Google Dashboard",
    icon: "dashboard",
    url: 'https://www.google.com/dashboard/'
  },
  {
    label: "Google Drive",
    icon: "drive",
    url: 'https://drive.google.com/'
  },
  {
    label: "Google Earth",
    icon: "earth",
    url: 'https://earth.google.com/'
  },
  {
    label: "Google Finance",
    icon: "finance",
    url: 'https://www.google.com/finance'
  },
  {
    label: "Gmail",
    icon: "gmail",
    url: 'https://mail.google.com/mail/'
  },
  {
    label: "Google Groups",
    icon: "groups",
    url: 'https://groups.google.com/'
  },
  {
    label: "Google Image Search",
    icon: "image",
    url: 'http://images.google.com/imghp'
  },
  {
    label: "Google Maps",
    icon: "maps",
    url: 'https://www.google.com/maps/'
  },
  {
    label: "Google Mobile",
    icon: "mobile",
    url: 'https://www.google.com/mobile/'
  },
  {
    label: "Google Music",
    icon: "music",
    url: 'https://music.google.com/'
  },
  {
    label: "Google News",
    icon: "news",
    url: 'https://news.google.com/'
  },
  {
    label: "Google Keep (notes)",
    icon: "note",
    url: 'https://drive.google.com/keep'
  },
  {
    label: "Google Panoramio",
    icon: "panoramio",
    url: 'http://www.panoramio.com/'
  },
  {
    label: "Google Picasa",
    icon: "picasa",
    url: 'http://picasa.google.com/'
  },
  {
    label: "Google Play",
    icon: "play",
    url: 'https://play.google.com/store/'
  },
  {
    label: "Google Plus",
    icon: "plus",
    url: 'https://plus.google.com/'
  },
  {
    label: "Google Cloud Print",
    icon: "print",
    url: 'https://www.google.com/cloudprint/'
  },
  {
    label: "Google Scholar Search",
    icon: "scholar",
    url: 'https://scholar.google.com/'
  },
  {
    label: "Google Web Search",
    icon: "search",
    url: 'https://www.google.com/'
  },
  {
    label: "Google Sites",
    icon: "site",
    url: 'https://sites.google.com/'
  },
  {
    label: "Google SketchUp",
    icon: "sketchup",
    url: 'http://www.sketchup.com/'
  },
  {
    label: "Google SketchUp",
    icon: "hangouts",
    url: 'https://www.google.com/hangouts/'
  },
  {
    label: "Google Translate",
    icon: "translate",
    url: 'https://translate.google.com/'
  },
  {
    label: "Google Trends",
    icon: "trends",
    url: 'https://www.google.com/trends/'
  },
  {
    label: "Google Wallet",
    icon: "wallet",
    url: 'https://www.google.com/wallet/'
  },
  {
    label: "YouTube",
    icon: "youtube",
    url: 'https://www.youtube.com/'
  },
  {
    label: "Google Hotel Search",
    icon: "hotel",
    url: 'https://www.google.com/hotelfinder/'
  },
  {
    label: "Google Patent Search",
    icon: "patent",
    url: 'https://www.google.com/patents/'
  },
  {
    label: "Google Shopping",
    icon: "shopping",
    url: 'https://www.google.com/shopping/'
  },
  {
    label: "Android",
    icon: "android",
    url: 'http://www.android.com/'
  },
  {
    label: "Google Bookmarks",
    icon: "bookmarks",
    url: 'https://www.google.com/bookmarks/'
  },
  {
    label: "Google Feedburner",
    icon: "feedburner",
    url: 'http://feedburner.google.com/'
  },
  {
    label: "Google Fusion Tables",
    icon: "fusion",
    url: 'https://www.google.com/fusiontables/'
  },
  {
    label: "Google Offers",
    icon: "offers",
    url: 'https://www.google.com/offers/'
  },
  {
    label: "Google URL Shortner",
    icon: "urlshortner",
    url: 'http://goo.gl/'
  },
  {
    label: "Google Web History",
    icon: "webhistory",
    url: 'https://history.google.com/history/'
  },
  {
    label: "Google Webmaster Tools",
    icon: "webmaster",
    url: 'https://www.google.com/webmasters/'
  },
  {
    label: "Google Chromebook",
    icon: "chromebook",
    url: 'https://www.google.com/intl/en/chrome/devices/'
  },
  {
    label: "Chromium",
    icon: "chromium",
    url: 'http://www.chromium.org/'
  },
  {
    label: "Google Cloude Platform",
    icon: "cloudeplatform",
    url: 'https://cloud.google.com/'
  },
  {
    label: "Google Contacts",
    icon: "contacts",
    url: 'https://www.google.com/contacts/'
  },
  {
    label: "Google Correlate",
    icon: "correlate",
    url: 'https://www.google.com/trends/correlate/'
  },
  {
    label: "Google Currents",
    icon: "currents",
    url: 'http://www.google.com/producer/currents/'
  },
  {
    label: "Google Developement Dashboard",
    icon: "developersdashboard",
    url: 'https://chrome.google.com/webstore/developer/dashboard/'
  },
  {
    label: "Google Input Tool",
    icon: "inputtool",
    url: 'http://www.google.com/inputtools/'
  },
  {
    label: "Google Ideas",
    icon: "ideas",
    url: 'https://www.google.com/ideas/'
  },
  {
    label: "Google Mars",
    icon: "mars",
    url: 'https://www.google.com/mars/'
  },
  {
    label: "Google Sky",
    icon: "sky",
    url: 'https://www.google.com/sky/'
  },
  {
    label: "Google Transit",
    icon: "transit",
    url: 'https://www.google.com/intl/en/landing/transit/'
  },
  {
    label: "Google Webpage Test",
    icon: "webpagetest",
    url: 'http://www.webpagetest.org/'
  },
  {
    label: "What Do You Love",
    icon: "wdyl",
    url: 'http://www.wdyl.com/'
  },
  {
    label: "Google Adwords",
    icon: "adwords",
    url: 'https://www.google.com/adwords/'
  },
  {
    label: "Google Adsense",
    icon: "adsense",
    url: 'https://www.google.com/adsense/'
  },
  {
    label: "Google Videos",
    icon: "video",
    url: 'https://www.google.com/videohp'
  },
  {
    label: "Google Voice",
    icon: "voice",
    url: 'https://www.google.com/voice'
  },
  {
    label: "Google Catalogs",
    icon: "catalogs",
    url: 'https://www.google.com/catalogs/'
  },
  {
    label: "Google Authenticator",
    icon: "authenticator",
    url: 'https://support.google.com/accounts/answer/1066447/'
  },
  {
    label: "Google Business",
    icon: "business",
    url: 'https://www.google.com/business/'
  },
  {
    label: "Google Compute Engine",
    icon: "computeengine",
    url: 'https://console.developers.google.com/project?getstarted/'
  },
  {
    label: "Google Maps Coordinate",
    icon: "coordinate",
    url: 'https://www.google.com/enterprise/mapsearth/products/coordinate.html'
  },
  {
    label: "Google Earth Engine",
    icon: "earthengine",
    url: 'https://earthengine.google.org/'
  },
  {
    label: "Google Fonts",
    icon: "fonts",
    url: 'https://www.google.com/fonts/'
  },
  {
    label: "Google Forms",
    icon: "forms",
    url: 'http://www.google.com/drive'
  },
  {
    label: "Google Glass",
    icon: "glass",
    url: 'https://www.google.com/glass/'
  },
  {
    label: "Google Goggles",
    icon: "goggles",
    url: 'https://support.google.com/websearch/topic/25275?hl=en&ref_topic=1733205'
  },
  {
    label: "Google Help",
    icon: "help",
    url: 'https://support.google.com/'
  },
  {
    label: "Google Partner Dash",
    icon: "partnerdash",
    url: 'https://partnerdash.google.com/partnerdash/'
  },
  {
    label: "Google Photos",
    icon: "photos",
    url: 'https://plus.google.com/photos/'
  },
  {
    label: "Google Local",
    icon: "local",
    url: 'https://plus.google.com/u/0/local/'
  },
  {
    label: "Google Presentation",
    icon: "presentation",
    url: 'https://docs.google.com/presentation/'
  },
  {
    label: "Google App Script",
    icon: "script",
    url: 'https://developers.google.com/apps-script/'
  },
  {
    label: "Google Street View",
    icon: "streetview",
    url: 'https://www.google.com/maps/views/streetview/'
  },
  {
    label: "Google Sync",
    icon: "sync",
    url: 'https://www.google.com/sync/'
  },
  {
    label: "Google Tag Manager",
    icon: "tagmanager",
    url: 'https://www.google.com/tagmanager/web/'
  },
  {
    label: "Google Tasks",
    icon: "tasks",
    url: 'https://mail.google.com/tasks/canvas'
  },
  {
    label: "Google Web Store",
    icon: "webstore",
    url: 'https://chrome.google.com/webstore/category/apps'
  },
  {
    label: "Google Maps Engine",
    icon: "mapsengine",
    url: 'https://mapsengine.google.com/map/'
  },
  {
    label: "Google Chrome",
    icon: "chrome",
    url: 'https://www.google.com/chrome/'
  },
  {
    label: "Google Slides",
    icon: "slides",
    url: 'https://docs.google.com/presentation/'
  },
  {
    label: "Google Sheets",
    icon: "sheets",
    url: 'https://docs.google.com/spreadsheets/'
  },
  {
    label: "Google Privacy Checkup",
    icon: "privacy",
    url: 'https://myaccount.google.com/privacycheckup/'
  },
  {
    label: "Google Admin",
    icon: "admin",
    url: 'https://admin.google.com/'
  },
  {
    label: "Google Apps for Works",
    icon: "apps",
    url: 'https://www.google.com/work/apps/business/'
  },
  {
    label: "Google Flights",
    icon: "flights",
    url: 'https://www.google.com/flights/'
  },
  {
    label: "Google Domains",
    icon: "domains",
    url: 'https://domains.google.com/'
  },
  {
    label: "Google Security Checkup",
    icon: "security",
    url: 'https://myaccount.google.com/security/'
  },
  {
    label: "Google Drawings",
    icon: "drawings",
    url: 'https://docs.google.com/drawings/'
  },
  {
    label: "Google Inbox",
    icon: "inbox",
    url: 'https://inbox.google.com/'
  },
  {
    label: "Google Support",
    icon: "support",
    url: 'https://support.google.com/'
  },
  {
    label: "Google My Account",
    icon: "account",
    url: 'https://myaccount.google.com/'
  },
  {
    label: "Google AdMob",
    icon: "admob",
    url: 'https://www.google.com/admob/'
  },
  {
    label: "Google Store",
    icon: "store",
    url: 'https://store.google.com/'
  }
];

icons.forEach(function (obj) {
  if (prefs[obj.icon]) {
    buttons.ActionButton({
      id: "igshortcuts-" + obj.icon,
      label: obj.label,
      icon: {
        "16": "./firefox/toolbar/" + obj.icon + ".png"
      },
      onClick: function (state) {
        if (prefs.individualAction == 0) {
          tabs.open(obj.url);
        }
        if (prefs.individualAction == 1) {
          tabs.open({
            url: obj.url,
            inBackground: true
          });
        }
        if (prefs.individualAction == 2) {
          tabs.activeTab.url = obj.url;
        }
      }
    });
  }
});