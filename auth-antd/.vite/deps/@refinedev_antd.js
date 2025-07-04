"use client";
import {
  Keyframes_default,
  _assertThisInitialized,
  _classCallCheck,
  _createClass,
  _createSuper,
  _inherits,
  app_default,
  avatar_default,
  breadcrumb_default,
  button_default,
  card_default,
  checkbox_default,
  col_default,
  commonLocale,
  config_provider_default,
  createTheme,
  divider_default,
  drawer_default,
  es_default,
  form_default,
  get,
  grid_default,
  image_default,
  input_default,
  layout_default,
  menu_default,
  notification_default,
  popconfirm_default,
  progress_default,
  require_customParseFormat,
  require_dayjs_min,
  result_default,
  row_default,
  space_default,
  spin_default,
  tag_default,
  theme_default,
  tooltip_default,
  typography_default,
  upload_default,
  useStyleRegister,
  version_default
} from "./chunk-6AK7SGFY.js";
import {
  ArrowLeftOutlined_default,
  ArrowRightOutlined_default,
  BarsOutlined_default,
  CheckCircleOutlined_default,
  CheckOutlined_default,
  CloseCircleFilled_default,
  CloseOutlined_default,
  DashboardOutlined_default,
  DeleteOutlined_default,
  DownOutlined_default,
  EditOutlined_default,
  EllipsisOutlined_default,
  ExclamationCircleOutlined_default,
  ExportOutlined_default,
  EyeOutlined_default,
  FilterOutlined_default,
  FolderOutlined_default,
  HomeOutlined_default,
  ImportOutlined_default,
  InfoCircleOutlined_default,
  LeftOutlined_default,
  LogoutOutlined_default,
  PlusSquareOutlined_default,
  ReadOutlined_default,
  RedoOutlined_default,
  RightOutlined_default,
  SaveOutlined_default,
  SyncOutlined_default,
  TeamOutlined_default,
  UndoOutlined_default,
  UnorderedListOutlined_default,
  _defineProperty,
  _objectSpread2,
  _objectWithoutProperties,
  _slicedToArray,
  create,
  es_exports,
  init_defineProperty,
  init_es2 as init_es,
  init_typeof,
  noteOnce,
  require_classnames
} from "./chunk-3TRDIZYA.js";
import {
  Ae,
  At,
  Cr,
  Du,
  Ht,
  I,
  IC,
  Jv,
  Mo,
  Mr,
  PC,
  Pe,
  RP,
  Sc,
  Stack_default,
  TR,
  Ta,
  Te,
  Ts,
  Uint8Array_default,
  Vc,
  Yv,
  Zv,
  _e,
  arrayLikeKeys_default,
  as,
  ba,
  baseGetTag_default,
  baseRest_default,
  co,
  defineProperty_default,
  eD,
  eq_default,
  fb,
  fo,
  ge,
  he,
  ht,
  ie,
  isArguments_default,
  isArrayLikeObject_default,
  isArrayLike_default,
  isArray_default,
  isBuffer_default,
  isFunction_default,
  isIterateeCall_default,
  isObjectLike_default,
  isObject_default,
  isPrototype_default,
  isTypedArray_default,
  lo,
  mR,
  mc,
  no,
  oD,
  oe,
  overArg_default,
  pe,
  q,
  qu,
  qv,
  rD,
  require_shim,
  root_default,
  sn,
  tD,
  tc,
  to,
  va,
  vt,
  yo,
  yt,
  z,
  zu
} from "./chunk-2HJEM4DJ.js";
import {
  require_react_dom
} from "./chunk-AGL3XMSE.js";
import {
  require_react
} from "./chunk-KL4SNAOQ.js";
import {
  __commonJS,
  __export,
  __toCommonJS,
  __toESM
} from "./chunk-PLDDJCW6.js";

// node_modules/dayjs/plugin/localizedFormat.js
var require_localizedFormat = __commonJS({
  "node_modules/dayjs/plugin/localizedFormat.js"(exports2, module2) {
    !function(e2, t) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define(t) : (e2 = "undefined" != typeof globalThis ? globalThis : e2 || self).dayjs_plugin_localizedFormat = t();
    }(exports2, function() {
      "use strict";
      var e2 = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
      return function(t, o3, n2) {
        var r = o3.prototype, i = r.format;
        n2.en.formats = e2, r.format = function(t2) {
          void 0 === t2 && (t2 = "YYYY-MM-DDTHH:mm:ssZ");
          var o4 = this.$locale().formats, n3 = function(t3, o5) {
            return t3.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t4, n4, r2) {
              var i2 = r2 && r2.toUpperCase();
              return n4 || o5[r2] || e2[r2] || o5[i2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e3, t5, o6) {
                return t5 || o6.slice(1);
              });
            });
          }(t2, void 0 === o4 ? {} : o4);
          return i.call(this, n3);
        };
      };
    });
  }
});

// node_modules/unist-util-stringify-position/index.js
var require_unist_util_stringify_position = __commonJS({
  "node_modules/unist-util-stringify-position/index.js"(exports2, module2) {
    "use strict";
    var own = {}.hasOwnProperty;
    module2.exports = stringify2;
    function stringify2(value) {
      if (!value || typeof value !== "object") {
        return "";
      }
      if (own.call(value, "position") || own.call(value, "type")) {
        return position(value.position);
      }
      if (own.call(value, "start") || own.call(value, "end")) {
        return position(value);
      }
      if (own.call(value, "line") || own.call(value, "column")) {
        return point(value);
      }
      return "";
    }
    function point(point2) {
      if (!point2 || typeof point2 !== "object") {
        point2 = {};
      }
      return index(point2.line) + ":" + index(point2.column);
    }
    function position(pos) {
      if (!pos || typeof pos !== "object") {
        pos = {};
      }
      return point(pos.start) + "-" + point(pos.end);
    }
    function index(value) {
      return value && typeof value === "number" ? value : 1;
    }
  }
});

// node_modules/vfile-message/index.js
var require_vfile_message = __commonJS({
  "node_modules/vfile-message/index.js"(exports2, module2) {
    "use strict";
    var stringify2 = require_unist_util_stringify_position();
    module2.exports = VMessage;
    function VMessagePrototype() {
    }
    VMessagePrototype.prototype = Error.prototype;
    VMessage.prototype = new VMessagePrototype();
    var proto = VMessage.prototype;
    proto.file = "";
    proto.name = "";
    proto.reason = "";
    proto.message = "";
    proto.stack = "";
    proto.fatal = null;
    proto.column = null;
    proto.line = null;
    function VMessage(reason, position, origin) {
      var parts;
      var range;
      var location2;
      if (typeof position === "string") {
        origin = position;
        position = null;
      }
      parts = parseOrigin(origin);
      range = stringify2(position) || "1:1";
      location2 = {
        start: { line: null, column: null },
        end: { line: null, column: null }
      };
      if (position && position.position) {
        position = position.position;
      }
      if (position) {
        if (position.start) {
          location2 = position;
          position = position.start;
        } else {
          location2.start = position;
        }
      }
      if (reason.stack) {
        this.stack = reason.stack;
        reason = reason.message;
      }
      this.message = reason;
      this.name = range;
      this.reason = reason;
      this.line = position ? position.line : null;
      this.column = position ? position.column : null;
      this.location = location2;
      this.source = parts[0];
      this.ruleId = parts[1];
    }
    function parseOrigin(origin) {
      var result = [null, null];
      var index;
      if (typeof origin === "string") {
        index = origin.indexOf(":");
        if (index === -1) {
          result[1] = origin;
        } else {
          result[0] = origin.slice(0, index);
          result[1] = origin.slice(index + 1);
        }
      }
      return result;
    }
  }
});

// node_modules/vfile/lib/minpath.browser.js
var require_minpath_browser = __commonJS({
  "node_modules/vfile/lib/minpath.browser.js"(exports2) {
    "use strict";
    exports2.basename = basename;
    exports2.dirname = dirname;
    exports2.extname = extname;
    exports2.join = join;
    exports2.sep = "/";
    function basename(path, ext) {
      var start = 0;
      var end = -1;
      var index;
      var firstNonSlashEnd;
      var seenNonSlash;
      var extIndex;
      if (ext !== void 0 && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
      }
      assertPath(path);
      index = path.length;
      if (ext === void 0 || !ext.length || ext.length > path.length) {
        while (index--) {
          if (path.charCodeAt(index) === 47) {
            if (seenNonSlash) {
              start = index + 1;
              break;
            }
          } else if (end < 0) {
            seenNonSlash = true;
            end = index + 1;
          }
        }
        return end < 0 ? "" : path.slice(start, end);
      }
      if (ext === path) {
        return "";
      }
      firstNonSlashEnd = -1;
      extIndex = ext.length - 1;
      while (index--) {
        if (path.charCodeAt(index) === 47) {
          if (seenNonSlash) {
            start = index + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd < 0) {
            seenNonSlash = true;
            firstNonSlashEnd = index + 1;
          }
          if (extIndex > -1) {
            if (path.charCodeAt(index) === ext.charCodeAt(extIndex--)) {
              if (extIndex < 0) {
                end = index;
              }
            } else {
              extIndex = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end) {
        end = firstNonSlashEnd;
      } else if (end < 0) {
        end = path.length;
      }
      return path.slice(start, end);
    }
    function dirname(path) {
      var end;
      var unmatchedSlash;
      var index;
      assertPath(path);
      if (!path.length) {
        return ".";
      }
      end = -1;
      index = path.length;
      while (--index) {
        if (path.charCodeAt(index) === 47) {
          if (unmatchedSlash) {
            end = index;
            break;
          }
        } else if (!unmatchedSlash) {
          unmatchedSlash = true;
        }
      }
      return end < 0 ? path.charCodeAt(0) === 47 ? "/" : "." : end === 1 && path.charCodeAt(0) === 47 ? "//" : path.slice(0, end);
    }
    function extname(path) {
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var preDotState = 0;
      var unmatchedSlash;
      var code;
      var index;
      assertPath(path);
      index = path.length;
      while (index--) {
        code = path.charCodeAt(index);
        if (code === 47) {
          if (unmatchedSlash) {
            startPart = index + 1;
            break;
          }
          continue;
        }
        if (end < 0) {
          unmatchedSlash = true;
          end = index + 1;
        }
        if (code === 46) {
          if (startDot < 0) {
            startDot = index;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot > -1) {
          preDotState = -1;
        }
      }
      if (startDot < 0 || end < 0 || // We saw a non-dot character immediately before the dot.
      preDotState === 0 || // The (right-most) trimmed path component is exactly `..`.
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path.slice(startDot, end);
    }
    function join() {
      var index = -1;
      var joined;
      while (++index < arguments.length) {
        assertPath(arguments[index]);
        if (arguments[index]) {
          joined = joined === void 0 ? arguments[index] : joined + "/" + arguments[index];
        }
      }
      return joined === void 0 ? "." : normalize2(joined);
    }
    function normalize2(path) {
      var absolute;
      var value;
      assertPath(path);
      absolute = path.charCodeAt(0) === 47;
      value = normalizeString(path, !absolute);
      if (!value.length && !absolute) {
        value = ".";
      }
      if (value.length && path.charCodeAt(path.length - 1) === 47) {
        value += "/";
      }
      return absolute ? "/" + value : value;
    }
    function normalizeString(path, allowAboveRoot) {
      var result = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var index = -1;
      var code;
      var lastSlashIndex;
      while (++index <= path.length) {
        if (index < path.length) {
          code = path.charCodeAt(index);
        } else if (code === 47) {
          break;
        } else {
          code = 47;
        }
        if (code === 47) {
          if (lastSlash === index - 1 || dots === 1) {
          } else if (lastSlash !== index - 1 && dots === 2) {
            if (result.length < 2 || lastSegmentLength !== 2 || result.charCodeAt(result.length - 1) !== 46 || result.charCodeAt(result.length - 2) !== 46) {
              if (result.length > 2) {
                lastSlashIndex = result.lastIndexOf("/");
                if (lastSlashIndex !== result.length - 1) {
                  if (lastSlashIndex < 0) {
                    result = "";
                    lastSegmentLength = 0;
                  } else {
                    result = result.slice(0, lastSlashIndex);
                    lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
                  }
                  lastSlash = index;
                  dots = 0;
                  continue;
                }
              } else if (result.length) {
                result = "";
                lastSegmentLength = 0;
                lastSlash = index;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              result = result.length ? result + "/.." : "..";
              lastSegmentLength = 2;
            }
          } else {
            if (result.length) {
              result += "/" + path.slice(lastSlash + 1, index);
            } else {
              result = path.slice(lastSlash + 1, index);
            }
            lastSegmentLength = index - lastSlash - 1;
          }
          lastSlash = index;
          dots = 0;
        } else if (code === 46 && dots > -1) {
          dots++;
        } else {
          dots = -1;
        }
      }
      return result;
    }
    function assertPath(path) {
      if (typeof path !== "string") {
        throw new TypeError(
          "Path must be a string. Received " + JSON.stringify(path)
        );
      }
    }
  }
});

// node_modules/vfile/lib/minproc.browser.js
var require_minproc_browser = __commonJS({
  "node_modules/vfile/lib/minproc.browser.js"(exports2) {
    "use strict";
    exports2.cwd = cwd;
    function cwd() {
      return "/";
    }
  }
});

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports2, module2) {
    module2.exports = function isBuffer(obj) {
      return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    };
  }
});

// node_modules/vfile/lib/core.js
var require_core = __commonJS({
  "node_modules/vfile/lib/core.js"(exports2, module2) {
    "use strict";
    var p = require_minpath_browser();
    var proc = require_minproc_browser();
    var buffer = require_is_buffer();
    module2.exports = VFile;
    var own = {}.hasOwnProperty;
    var order = ["history", "path", "basename", "stem", "extname", "dirname"];
    VFile.prototype.toString = toString;
    Object.defineProperty(VFile.prototype, "path", { get: getPath, set: setPath });
    Object.defineProperty(VFile.prototype, "dirname", {
      get: getDirname,
      set: setDirname
    });
    Object.defineProperty(VFile.prototype, "basename", {
      get: getBasename,
      set: setBasename
    });
    Object.defineProperty(VFile.prototype, "extname", {
      get: getExtname,
      set: setExtname
    });
    Object.defineProperty(VFile.prototype, "stem", { get: getStem, set: setStem });
    function VFile(options) {
      var prop;
      var index;
      if (!options) {
        options = {};
      } else if (typeof options === "string" || buffer(options)) {
        options = { contents: options };
      } else if ("message" in options && "messages" in options) {
        return options;
      }
      if (!(this instanceof VFile)) {
        return new VFile(options);
      }
      this.data = {};
      this.messages = [];
      this.history = [];
      this.cwd = proc.cwd();
      index = -1;
      while (++index < order.length) {
        prop = order[index];
        if (own.call(options, prop)) {
          this[prop] = options[prop];
        }
      }
      for (prop in options) {
        if (order.indexOf(prop) < 0) {
          this[prop] = options[prop];
        }
      }
    }
    function getPath() {
      return this.history[this.history.length - 1];
    }
    function setPath(path) {
      assertNonEmpty(path, "path");
      if (this.path !== path) {
        this.history.push(path);
      }
    }
    function getDirname() {
      return typeof this.path === "string" ? p.dirname(this.path) : void 0;
    }
    function setDirname(dirname) {
      assertPath(this.path, "dirname");
      this.path = p.join(dirname || "", this.basename);
    }
    function getBasename() {
      return typeof this.path === "string" ? p.basename(this.path) : void 0;
    }
    function setBasename(basename) {
      assertNonEmpty(basename, "basename");
      assertPart(basename, "basename");
      this.path = p.join(this.dirname || "", basename);
    }
    function getExtname() {
      return typeof this.path === "string" ? p.extname(this.path) : void 0;
    }
    function setExtname(extname) {
      assertPart(extname, "extname");
      assertPath(this.path, "extname");
      if (extname) {
        if (extname.charCodeAt(0) !== 46) {
          throw new Error("`extname` must start with `.`");
        }
        if (extname.indexOf(".", 1) > -1) {
          throw new Error("`extname` cannot contain multiple dots");
        }
      }
      this.path = p.join(this.dirname, this.stem + (extname || ""));
    }
    function getStem() {
      return typeof this.path === "string" ? p.basename(this.path, this.extname) : void 0;
    }
    function setStem(stem) {
      assertNonEmpty(stem, "stem");
      assertPart(stem, "stem");
      this.path = p.join(this.dirname || "", stem + (this.extname || ""));
    }
    function toString(encoding) {
      return (this.contents || "").toString(encoding);
    }
    function assertPart(part, name) {
      if (part && part.indexOf(p.sep) > -1) {
        throw new Error(
          "`" + name + "` cannot be a path: did not expect `" + p.sep + "`"
        );
      }
    }
    function assertNonEmpty(part, name) {
      if (!part) {
        throw new Error("`" + name + "` cannot be empty");
      }
    }
    function assertPath(path, name) {
      if (!path) {
        throw new Error("Setting `" + name + "` requires `path` to be set too");
      }
    }
  }
});

// node_modules/vfile/lib/index.js
var require_lib = __commonJS({
  "node_modules/vfile/lib/index.js"(exports2, module2) {
    "use strict";
    var VMessage = require_vfile_message();
    var VFile = require_core();
    module2.exports = VFile;
    VFile.prototype.message = message;
    VFile.prototype.info = info;
    VFile.prototype.fail = fail;
    function message(reason, position, origin) {
      var message2 = new VMessage(reason, position, origin);
      if (this.path) {
        message2.name = this.path + ":" + message2.name;
        message2.file = this.path;
      }
      message2.fatal = false;
      this.messages.push(message2);
      return message2;
    }
    function fail() {
      var message2 = this.message.apply(this, arguments);
      message2.fatal = true;
      throw message2;
    }
    function info() {
      var message2 = this.message.apply(this, arguments);
      message2.fatal = null;
      return message2;
    }
  }
});

// node_modules/vfile/index.js
var require_vfile = __commonJS({
  "node_modules/vfile/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_lib();
  }
});

// node_modules/bail/index.js
var require_bail = __commonJS({
  "node_modules/bail/index.js"(exports2, module2) {
    "use strict";
    module2.exports = bail;
    function bail(err) {
      if (err) {
        throw err;
      }
    }
  }
});

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports2, module2) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject2 = function isPlainObject3(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module2.exports = function extend() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject2(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject2(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// node_modules/is-plain-obj/index.js
var require_is_plain_obj = __commonJS({
  "node_modules/is-plain-obj/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (value) => {
      if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype === Object.prototype;
    };
  }
});

// node_modules/trough/wrap.js
var require_wrap = __commonJS({
  "node_modules/trough/wrap.js"(exports2, module2) {
    "use strict";
    var slice = [].slice;
    module2.exports = wrap;
    function wrap(fn, callback) {
      var invoked;
      return wrapped;
      function wrapped() {
        var params = slice.call(arguments, 0);
        var callback2 = fn.length > params.length;
        var result;
        if (callback2) {
          params.push(done);
        }
        try {
          result = fn.apply(null, params);
        } catch (error) {
          if (callback2 && invoked) {
            throw error;
          }
          return done(error);
        }
        if (!callback2) {
          if (result && typeof result.then === "function") {
            result.then(then, done);
          } else if (result instanceof Error) {
            done(result);
          } else {
            then(result);
          }
        }
      }
      function done() {
        if (!invoked) {
          invoked = true;
          callback.apply(null, arguments);
        }
      }
      function then(value) {
        done(null, value);
      }
    }
  }
});

// node_modules/trough/index.js
var require_trough = __commonJS({
  "node_modules/trough/index.js"(exports2, module2) {
    "use strict";
    var wrap = require_wrap();
    module2.exports = trough;
    trough.wrap = wrap;
    var slice = [].slice;
    function trough() {
      var fns = [];
      var middleware2 = {};
      middleware2.run = run;
      middleware2.use = use3;
      return middleware2;
      function run() {
        var index = -1;
        var input = slice.call(arguments, 0, -1);
        var done = arguments[arguments.length - 1];
        if (typeof done !== "function") {
          throw new Error("Expected function as last argument, not " + done);
        }
        next.apply(null, [null].concat(input));
        function next(err) {
          var fn = fns[++index];
          var params = slice.call(arguments, 0);
          var values = params.slice(1);
          var length = input.length;
          var pos = -1;
          if (err) {
            done(err);
            return;
          }
          while (++pos < length) {
            if (values[pos] === null || values[pos] === void 0) {
              values[pos] = input[pos];
            }
          }
          input = values;
          if (fn) {
            wrap(fn, next).apply(null, input);
          } else {
            done.apply(null, [null].concat(input));
          }
        }
      }
      function use3(fn) {
        if (typeof fn !== "function") {
          throw new Error("Expected `fn` to be a function, not " + fn);
        }
        fns.push(fn);
        return middleware2;
      }
    }
  }
});

// node_modules/unified/index.js
var require_unified = __commonJS({
  "node_modules/unified/index.js"(exports2, module2) {
    "use strict";
    var bail = require_bail();
    var buffer = require_is_buffer();
    var extend = require_extend();
    var plain = require_is_plain_obj();
    var trough = require_trough();
    var vfile = require_vfile();
    module2.exports = unified().freeze();
    var slice = [].slice;
    var own = {}.hasOwnProperty;
    var pipeline = trough().use(pipelineParse).use(pipelineRun).use(pipelineStringify);
    function pipelineParse(p, ctx) {
      ctx.tree = p.parse(ctx.file);
    }
    function pipelineRun(p, ctx, next) {
      p.run(ctx.tree, ctx.file, done);
      function done(error, tree, file) {
        if (error) {
          next(error);
        } else {
          ctx.tree = tree;
          ctx.file = file;
          next();
        }
      }
    }
    function pipelineStringify(p, ctx) {
      var result = p.stringify(ctx.tree, ctx.file);
      if (result === void 0 || result === null) {
      } else if (typeof result === "string" || buffer(result)) {
        if ("value" in ctx.file) {
          ctx.file.value = result;
        }
        ctx.file.contents = result;
      } else {
        ctx.file.result = result;
      }
    }
    function unified() {
      var attachers = [];
      var transformers = trough();
      var namespace = {};
      var freezeIndex = -1;
      var frozen;
      processor.data = data;
      processor.freeze = freeze;
      processor.attachers = attachers;
      processor.use = use3;
      processor.parse = parse;
      processor.stringify = stringify2;
      processor.run = run;
      processor.runSync = runSync;
      processor.process = process2;
      processor.processSync = processSync;
      return processor;
      function processor() {
        var destination = unified();
        var index = -1;
        while (++index < attachers.length) {
          destination.use.apply(null, attachers[index]);
        }
        destination.data(extend(true, {}, namespace));
        return destination;
      }
      function freeze() {
        var values;
        var transformer;
        if (frozen) {
          return processor;
        }
        while (++freezeIndex < attachers.length) {
          values = attachers[freezeIndex];
          if (values[1] === false) {
            continue;
          }
          if (values[1] === true) {
            values[1] = void 0;
          }
          transformer = values[0].apply(processor, values.slice(1));
          if (typeof transformer === "function") {
            transformers.use(transformer);
          }
        }
        frozen = true;
        freezeIndex = Infinity;
        return processor;
      }
      function data(key, value) {
        if (typeof key === "string") {
          if (arguments.length === 2) {
            assertUnfrozen("data", frozen);
            namespace[key] = value;
            return processor;
          }
          return own.call(namespace, key) && namespace[key] || null;
        }
        if (key) {
          assertUnfrozen("data", frozen);
          namespace = key;
          return processor;
        }
        return namespace;
      }
      function use3(value) {
        var settings;
        assertUnfrozen("use", frozen);
        if (value === null || value === void 0) {
        } else if (typeof value === "function") {
          addPlugin.apply(null, arguments);
        } else if (typeof value === "object") {
          if ("length" in value) {
            addList(value);
          } else {
            addPreset(value);
          }
        } else {
          throw new Error("Expected usable value, not `" + value + "`");
        }
        if (settings) {
          namespace.settings = extend(namespace.settings || {}, settings);
        }
        return processor;
        function addPreset(result) {
          addList(result.plugins);
          if (result.settings) {
            settings = extend(settings || {}, result.settings);
          }
        }
        function add(value2) {
          if (typeof value2 === "function") {
            addPlugin(value2);
          } else if (typeof value2 === "object") {
            if ("length" in value2) {
              addPlugin.apply(null, value2);
            } else {
              addPreset(value2);
            }
          } else {
            throw new Error("Expected usable value, not `" + value2 + "`");
          }
        }
        function addList(plugins) {
          var index = -1;
          if (plugins === null || plugins === void 0) {
          } else if (typeof plugins === "object" && "length" in plugins) {
            while (++index < plugins.length) {
              add(plugins[index]);
            }
          } else {
            throw new Error("Expected a list of plugins, not `" + plugins + "`");
          }
        }
        function addPlugin(plugin, value2) {
          var entry = find(plugin);
          if (entry) {
            if (plain(entry[1]) && plain(value2)) {
              value2 = extend(true, entry[1], value2);
            }
            entry[1] = value2;
          } else {
            attachers.push(slice.call(arguments));
          }
        }
      }
      function find(plugin) {
        var index = -1;
        while (++index < attachers.length) {
          if (attachers[index][0] === plugin) {
            return attachers[index];
          }
        }
      }
      function parse(doc) {
        var file = vfile(doc);
        var Parser;
        freeze();
        Parser = processor.Parser;
        assertParser("parse", Parser);
        if (newable(Parser, "parse")) {
          return new Parser(String(file), file).parse();
        }
        return Parser(String(file), file);
      }
      function run(node, file, cb) {
        assertNode(node);
        freeze();
        if (!cb && typeof file === "function") {
          cb = file;
          file = null;
        }
        if (!cb) {
          return new Promise(executor);
        }
        executor(null, cb);
        function executor(resolve, reject) {
          transformers.run(node, vfile(file), done);
          function done(error, tree, file2) {
            tree = tree || node;
            if (error) {
              reject(error);
            } else if (resolve) {
              resolve(tree);
            } else {
              cb(null, tree, file2);
            }
          }
        }
      }
      function runSync(node, file) {
        var result;
        var complete;
        run(node, file, done);
        assertDone("runSync", "run", complete);
        return result;
        function done(error, tree) {
          complete = true;
          result = tree;
          bail(error);
        }
      }
      function stringify2(node, doc) {
        var file = vfile(doc);
        var Compiler;
        freeze();
        Compiler = processor.Compiler;
        assertCompiler("stringify", Compiler);
        assertNode(node);
        if (newable(Compiler, "compile")) {
          return new Compiler(node, file).compile();
        }
        return Compiler(node, file);
      }
      function process2(doc, cb) {
        freeze();
        assertParser("process", processor.Parser);
        assertCompiler("process", processor.Compiler);
        if (!cb) {
          return new Promise(executor);
        }
        executor(null, cb);
        function executor(resolve, reject) {
          var file = vfile(doc);
          pipeline.run(processor, { file }, done);
          function done(error) {
            if (error) {
              reject(error);
            } else if (resolve) {
              resolve(file);
            } else {
              cb(null, file);
            }
          }
        }
      }
      function processSync(doc) {
        var file;
        var complete;
        freeze();
        assertParser("processSync", processor.Parser);
        assertCompiler("processSync", processor.Compiler);
        file = vfile(doc);
        process2(file, done);
        assertDone("processSync", "process", complete);
        return file;
        function done(error) {
          complete = true;
          bail(error);
        }
      }
    }
    function newable(value, name) {
      return typeof value === "function" && value.prototype && // A function with keys in its prototype is probably a constructor.
      // Classes’ prototype methods are not enumerable, so we check if some value
      // exists in the prototype.
      (keys(value.prototype) || name in value.prototype);
    }
    function keys(value) {
      var key;
      for (key in value) {
        return true;
      }
      return false;
    }
    function assertParser(name, Parser) {
      if (typeof Parser !== "function") {
        throw new Error("Cannot `" + name + "` without `Parser`");
      }
    }
    function assertCompiler(name, Compiler) {
      if (typeof Compiler !== "function") {
        throw new Error("Cannot `" + name + "` without `Compiler`");
      }
    }
    function assertUnfrozen(name, frozen) {
      if (frozen) {
        throw new Error(
          "Cannot invoke `" + name + "` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`."
        );
      }
    }
    function assertNode(node) {
      if (!node || typeof node.type !== "string") {
        throw new Error("Expected node, got `" + node + "`");
      }
    }
    function assertDone(name, asyncName, complete) {
      if (!complete) {
        throw new Error(
          "`" + name + "` finished async. Use `" + asyncName + "` instead"
        );
      }
    }
  }
});

// node_modules/mdast-util-to-string/index.js
var require_mdast_util_to_string = __commonJS({
  "node_modules/mdast-util-to-string/index.js"(exports2, module2) {
    "use strict";
    module2.exports = toString;
    function toString(node) {
      return node && (node.value || node.alt || node.title || "children" in node && all(node.children) || "length" in node && all(node)) || "";
    }
    function all(values) {
      var result = [];
      var index = -1;
      while (++index < values.length) {
        result[index] = toString(values[index]);
      }
      return result.join("");
    }
  }
});

// node_modules/micromark/dist/constant/assign.js
var require_assign = __commonJS({
  "node_modules/micromark/dist/constant/assign.js"(exports2, module2) {
    "use strict";
    var assign = Object.assign;
    module2.exports = assign;
  }
});

// node_modules/micromark/dist/constant/has-own-property.js
var require_has_own_property = __commonJS({
  "node_modules/micromark/dist/constant/has-own-property.js"(exports2, module2) {
    "use strict";
    var own = {}.hasOwnProperty;
    module2.exports = own;
  }
});

// node_modules/micromark/dist/util/normalize-identifier.js
var require_normalize_identifier = __commonJS({
  "node_modules/micromark/dist/util/normalize-identifier.js"(exports2, module2) {
    "use strict";
    function normalizeIdentifier(value) {
      return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
    }
    module2.exports = normalizeIdentifier;
  }
});

// node_modules/micromark/dist/constant/from-char-code.js
var require_from_char_code = __commonJS({
  "node_modules/micromark/dist/constant/from-char-code.js"(exports2, module2) {
    "use strict";
    var fromCharCode = String.fromCharCode;
    module2.exports = fromCharCode;
  }
});

// node_modules/micromark/dist/util/safe-from-int.js
var require_safe_from_int = __commonJS({
  "node_modules/micromark/dist/util/safe-from-int.js"(exports2, module2) {
    "use strict";
    var fromCharCode = require_from_char_code();
    function safeFromInt(value, base) {
      var code = parseInt(value, base);
      if (
        // C0 except for HT, LF, FF, CR, space
        code < 9 || code === 11 || code > 13 && code < 32 || // Control character (DEL) of the basic block and C1 controls.
        code > 126 && code < 160 || // Lone high surrogates and low surrogates.
        code > 55295 && code < 57344 || // Noncharacters.
        code > 64975 && code < 65008 || (code & 65535) === 65535 || (code & 65535) === 65534 || // Out of range
        code > 1114111
      ) {
        return "�";
      }
      return fromCharCode(code);
    }
    module2.exports = safeFromInt;
  }
});

// node_modules/micromark/dist/character/markdown-line-ending.js
var require_markdown_line_ending = __commonJS({
  "node_modules/micromark/dist/character/markdown-line-ending.js"(exports2, module2) {
    "use strict";
    function markdownLineEnding(code) {
      return code < -2;
    }
    module2.exports = markdownLineEnding;
  }
});

// node_modules/micromark/dist/character/markdown-space.js
var require_markdown_space = __commonJS({
  "node_modules/micromark/dist/character/markdown-space.js"(exports2, module2) {
    "use strict";
    function markdownSpace(code) {
      return code === -2 || code === -1 || code === 32;
    }
    module2.exports = markdownSpace;
  }
});

// node_modules/micromark/dist/tokenize/factory-space.js
var require_factory_space = __commonJS({
  "node_modules/micromark/dist/tokenize/factory-space.js"(exports2, module2) {
    "use strict";
    var markdownSpace = require_markdown_space();
    function spaceFactory(effects, ok, type, max) {
      var limit = max ? max - 1 : Infinity;
      var size = 0;
      return start;
      function start(code) {
        if (markdownSpace(code)) {
          effects.enter(type);
          return prefix(code);
        }
        return ok(code);
      }
      function prefix(code) {
        if (markdownSpace(code) && size++ < limit) {
          effects.consume(code);
          return prefix;
        }
        effects.exit(type);
        return ok(code);
      }
    }
    module2.exports = spaceFactory;
  }
});

// node_modules/micromark/dist/initialize/content.js
var require_content = __commonJS({
  "node_modules/micromark/dist/initialize/content.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var markdownLineEnding = require_markdown_line_ending();
    var factorySpace = require_factory_space();
    var tokenize = initializeContent;
    function initializeContent(effects) {
      var contentStart = effects.attempt(
        this.parser.constructs.contentInitial,
        afterContentStartConstruct,
        paragraphInitial
      );
      var previous;
      return contentStart;
      function afterContentStartConstruct(code) {
        if (code === null) {
          effects.consume(code);
          return;
        }
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return factorySpace(effects, contentStart, "linePrefix");
      }
      function paragraphInitial(code) {
        effects.enter("paragraph");
        return lineStart(code);
      }
      function lineStart(code) {
        var token2 = effects.enter("chunkText", {
          contentType: "text",
          previous
        });
        if (previous) {
          previous.next = token2;
        }
        previous = token2;
        return data(code);
      }
      function data(code) {
        if (code === null) {
          effects.exit("chunkText");
          effects.exit("paragraph");
          effects.consume(code);
          return;
        }
        if (markdownLineEnding(code)) {
          effects.consume(code);
          effects.exit("chunkText");
          return lineStart;
        }
        effects.consume(code);
        return data;
      }
    }
    exports2.tokenize = tokenize;
  }
});

// node_modules/micromark/dist/tokenize/partial-blank-line.js
var require_partial_blank_line = __commonJS({
  "node_modules/micromark/dist/tokenize/partial-blank-line.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var factorySpace = require_factory_space();
    var partialBlankLine = {
      tokenize: tokenizePartialBlankLine,
      partial: true
    };
    function tokenizePartialBlankLine(effects, ok, nok) {
      return factorySpace(effects, afterWhitespace, "linePrefix");
      function afterWhitespace(code) {
        return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
      }
    }
    module2.exports = partialBlankLine;
  }
});

// node_modules/micromark/dist/initialize/document.js
var require_document = __commonJS({
  "node_modules/micromark/dist/initialize/document.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var markdownLineEnding = require_markdown_line_ending();
    var factorySpace = require_factory_space();
    var partialBlankLine = require_partial_blank_line();
    var tokenize = initializeDocument;
    var containerConstruct = {
      tokenize: tokenizeContainer
    };
    var lazyFlowConstruct = {
      tokenize: tokenizeLazyFlow
    };
    function initializeDocument(effects) {
      var self2 = this;
      var stack = [];
      var continued = 0;
      var inspectConstruct = {
        tokenize: tokenizeInspect,
        partial: true
      };
      var inspectResult;
      var childFlow;
      var childToken;
      return start;
      function start(code) {
        if (continued < stack.length) {
          self2.containerState = stack[continued][1];
          return effects.attempt(
            stack[continued][0].continuation,
            documentContinue,
            documentContinued
          )(code);
        }
        return documentContinued(code);
      }
      function documentContinue(code) {
        continued++;
        return start(code);
      }
      function documentContinued(code) {
        if (inspectResult && inspectResult.flowContinue) {
          return flowStart(code);
        }
        self2.interrupt = childFlow && childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
        self2.containerState = {};
        return effects.attempt(
          containerConstruct,
          containerContinue,
          flowStart
        )(code);
      }
      function containerContinue(code) {
        stack.push([self2.currentConstruct, self2.containerState]);
        self2.containerState = void 0;
        return documentContinued(code);
      }
      function flowStart(code) {
        if (code === null) {
          exitContainers(0, true);
          effects.consume(code);
          return;
        }
        childFlow = childFlow || self2.parser.flow(self2.now());
        effects.enter("chunkFlow", {
          contentType: "flow",
          previous: childToken,
          _tokenizer: childFlow
        });
        return flowContinue(code);
      }
      function flowContinue(code) {
        if (code === null) {
          continueFlow(effects.exit("chunkFlow"));
          return flowStart(code);
        }
        if (markdownLineEnding(code)) {
          effects.consume(code);
          continueFlow(effects.exit("chunkFlow"));
          return effects.check(inspectConstruct, documentAfterPeek);
        }
        effects.consume(code);
        return flowContinue;
      }
      function documentAfterPeek(code) {
        exitContainers(
          inspectResult.continued,
          inspectResult && inspectResult.flowEnd
        );
        continued = 0;
        return start(code);
      }
      function continueFlow(token2) {
        if (childToken) childToken.next = token2;
        childToken = token2;
        childFlow.lazy = inspectResult && inspectResult.lazy;
        childFlow.defineSkip(token2.start);
        childFlow.write(self2.sliceStream(token2));
      }
      function exitContainers(size, end) {
        var index = stack.length;
        if (childFlow && end) {
          childFlow.write([null]);
          childToken = childFlow = void 0;
        }
        while (index-- > size) {
          self2.containerState = stack[index][1];
          stack[index][0].exit.call(self2, effects);
        }
        stack.length = size;
      }
      function tokenizeInspect(effects2, ok) {
        var subcontinued = 0;
        inspectResult = {};
        return inspectStart;
        function inspectStart(code) {
          if (subcontinued < stack.length) {
            self2.containerState = stack[subcontinued][1];
            return effects2.attempt(
              stack[subcontinued][0].continuation,
              inspectContinue,
              inspectLess
            )(code);
          }
          if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
            inspectResult.flowContinue = true;
            return inspectDone(code);
          }
          self2.interrupt = childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
          self2.containerState = {};
          return effects2.attempt(
            containerConstruct,
            inspectFlowEnd,
            inspectDone
          )(code);
        }
        function inspectContinue(code) {
          subcontinued++;
          return self2.containerState._closeFlow ? inspectFlowEnd(code) : inspectStart(code);
        }
        function inspectLess(code) {
          if (childFlow.currentConstruct && childFlow.currentConstruct.lazy) {
            self2.containerState = {};
            return effects2.attempt(
              containerConstruct,
              inspectFlowEnd,
              // Maybe flow, or a blank line?
              effects2.attempt(
                lazyFlowConstruct,
                inspectFlowEnd,
                effects2.check(partialBlankLine, inspectFlowEnd, inspectLazy)
              )
            )(code);
          }
          return inspectFlowEnd(code);
        }
        function inspectLazy(code) {
          subcontinued = stack.length;
          inspectResult.lazy = true;
          inspectResult.flowContinue = true;
          return inspectDone(code);
        }
        function inspectFlowEnd(code) {
          inspectResult.flowEnd = true;
          return inspectDone(code);
        }
        function inspectDone(code) {
          inspectResult.continued = subcontinued;
          self2.interrupt = self2.containerState = void 0;
          return ok(code);
        }
      }
    }
    function tokenizeContainer(effects, ok, nok) {
      return factorySpace(
        effects,
        effects.attempt(this.parser.constructs.document, ok, nok),
        "linePrefix",
        this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4
      );
    }
    function tokenizeLazyFlow(effects, ok, nok) {
      return factorySpace(
        effects,
        effects.lazy(this.parser.constructs.flow, ok, nok),
        "linePrefix",
        this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4
      );
    }
    exports2.tokenize = tokenize;
  }
});

// node_modules/micromark/dist/util/size-chunks.js
var require_size_chunks = __commonJS({
  "node_modules/micromark/dist/util/size-chunks.js"(exports2, module2) {
    "use strict";
    function sizeChunks(chunks) {
      var index = -1;
      var size = 0;
      while (++index < chunks.length) {
        size += typeof chunks[index] === "string" ? chunks[index].length : 1;
      }
      return size;
    }
    module2.exports = sizeChunks;
  }
});

// node_modules/micromark/dist/util/prefix-size.js
var require_prefix_size = __commonJS({
  "node_modules/micromark/dist/util/prefix-size.js"(exports2, module2) {
    "use strict";
    var sizeChunks = require_size_chunks();
    function prefixSize(events, type) {
      var tail = events[events.length - 1];
      if (!tail || tail[1].type !== type) return 0;
      return sizeChunks(tail[2].sliceStream(tail[1]));
    }
    module2.exports = prefixSize;
  }
});

// node_modules/micromark/dist/constant/splice.js
var require_splice = __commonJS({
  "node_modules/micromark/dist/constant/splice.js"(exports2, module2) {
    "use strict";
    var splice = [].splice;
    module2.exports = splice;
  }
});

// node_modules/micromark/dist/util/chunked-splice.js
var require_chunked_splice = __commonJS({
  "node_modules/micromark/dist/util/chunked-splice.js"(exports2, module2) {
    "use strict";
    var splice = require_splice();
    function chunkedSplice(list, start, remove, items) {
      var end = list.length;
      var chunkStart = 0;
      var parameters;
      if (start < 0) {
        start = -start > end ? 0 : end + start;
      } else {
        start = start > end ? end : start;
      }
      remove = remove > 0 ? remove : 0;
      if (items.length < 1e4) {
        parameters = Array.from(items);
        parameters.unshift(start, remove);
        splice.apply(list, parameters);
      } else {
        if (remove) splice.apply(list, [start, remove]);
        while (chunkStart < items.length) {
          parameters = items.slice(chunkStart, chunkStart + 1e4);
          parameters.unshift(start, 0);
          splice.apply(list, parameters);
          chunkStart += 1e4;
          start += 1e4;
        }
      }
    }
    module2.exports = chunkedSplice;
  }
});

// node_modules/micromark/dist/util/shallow.js
var require_shallow = __commonJS({
  "node_modules/micromark/dist/util/shallow.js"(exports2, module2) {
    "use strict";
    var assign = require_assign();
    function shallow(object) {
      return assign({}, object);
    }
    module2.exports = shallow;
  }
});

// node_modules/micromark/dist/util/subtokenize.js
var require_subtokenize = __commonJS({
  "node_modules/micromark/dist/util/subtokenize.js"(exports2, module2) {
    "use strict";
    var assign = require_assign();
    var chunkedSplice = require_chunked_splice();
    var shallow = require_shallow();
    function subtokenize(events) {
      var jumps = {};
      var index = -1;
      var event;
      var lineIndex;
      var otherIndex;
      var otherEvent;
      var parameters;
      var subevents;
      var more;
      while (++index < events.length) {
        while (index in jumps) {
          index = jumps[index];
        }
        event = events[index];
        if (index && event[1].type === "chunkFlow" && events[index - 1][1].type === "listItemPrefix") {
          subevents = event[1]._tokenizer.events;
          otherIndex = 0;
          if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
            otherIndex += 2;
          }
          if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
            while (++otherIndex < subevents.length) {
              if (subevents[otherIndex][1].type === "content") {
                break;
              }
              if (subevents[otherIndex][1].type === "chunkText") {
                subevents[otherIndex][1].isInFirstContentOfListItem = true;
                otherIndex++;
              }
            }
          }
        }
        if (event[0] === "enter") {
          if (event[1].contentType) {
            assign(jumps, subcontent(events, index));
            index = jumps[index];
            more = true;
          }
        } else if (event[1]._container || event[1]._movePreviousLineEndings) {
          otherIndex = index;
          lineIndex = void 0;
          while (otherIndex--) {
            otherEvent = events[otherIndex];
            if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
              if (otherEvent[0] === "enter") {
                if (lineIndex) {
                  events[lineIndex][1].type = "lineEndingBlank";
                }
                otherEvent[1].type = "lineEnding";
                lineIndex = otherIndex;
              }
            } else {
              break;
            }
          }
          if (lineIndex) {
            event[1].end = shallow(events[lineIndex][1].start);
            parameters = events.slice(lineIndex, index);
            parameters.unshift(event);
            chunkedSplice(events, lineIndex, index - lineIndex + 1, parameters);
          }
        }
      }
      return !more;
    }
    function subcontent(events, eventIndex) {
      var token2 = events[eventIndex][1];
      var context = events[eventIndex][2];
      var startPosition = eventIndex - 1;
      var startPositions = [];
      var tokenizer = token2._tokenizer || context.parser[token2.contentType](token2.start);
      var childEvents = tokenizer.events;
      var jumps = [];
      var gaps = {};
      var stream;
      var previous;
      var index;
      var entered;
      var end;
      var adjust;
      while (token2) {
        while (events[++startPosition][1] !== token2) {
        }
        startPositions.push(startPosition);
        if (!token2._tokenizer) {
          stream = context.sliceStream(token2);
          if (!token2.next) {
            stream.push(null);
          }
          if (previous) {
            tokenizer.defineSkip(token2.start);
          }
          if (token2.isInFirstContentOfListItem) {
            tokenizer._gfmTasklistFirstContentOfListItem = true;
          }
          tokenizer.write(stream);
          if (token2.isInFirstContentOfListItem) {
            tokenizer._gfmTasklistFirstContentOfListItem = void 0;
          }
        }
        previous = token2;
        token2 = token2.next;
      }
      token2 = previous;
      index = childEvents.length;
      while (index--) {
        if (childEvents[index][0] === "enter") {
          entered = true;
        } else if (
          // Find a void token that includes a break.
          entered && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line
        ) {
          add(childEvents.slice(index + 1, end));
          token2._tokenizer = token2.next = void 0;
          token2 = token2.previous;
          end = index + 1;
        }
      }
      tokenizer.events = token2._tokenizer = token2.next = void 0;
      add(childEvents.slice(0, end));
      index = -1;
      adjust = 0;
      while (++index < jumps.length) {
        gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
        adjust += jumps[index][1] - jumps[index][0] - 1;
      }
      return gaps;
      function add(slice) {
        var start = startPositions.pop();
        jumps.unshift([start, start + slice.length - 1]);
        chunkedSplice(events, start, 2, slice);
      }
    }
    module2.exports = subtokenize;
  }
});

// node_modules/micromark/dist/tokenize/content.js
var require_content2 = __commonJS({
  "node_modules/micromark/dist/tokenize/content.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var prefixSize = require_prefix_size();
    var subtokenize = require_subtokenize();
    var factorySpace = require_factory_space();
    var content = {
      tokenize: tokenizeContent,
      resolve: resolveContent,
      interruptible: true,
      lazy: true
    };
    var continuationConstruct = {
      tokenize: tokenizeContinuation,
      partial: true
    };
    function resolveContent(events) {
      subtokenize(events);
      return events;
    }
    function tokenizeContent(effects, ok) {
      var previous;
      return start;
      function start(code) {
        effects.enter("content");
        previous = effects.enter("chunkContent", {
          contentType: "content"
        });
        return data(code);
      }
      function data(code) {
        if (code === null) {
          return contentEnd(code);
        }
        if (markdownLineEnding(code)) {
          return effects.check(
            continuationConstruct,
            contentContinue,
            contentEnd
          )(code);
        }
        effects.consume(code);
        return data;
      }
      function contentEnd(code) {
        effects.exit("chunkContent");
        effects.exit("content");
        return ok(code);
      }
      function contentContinue(code) {
        effects.consume(code);
        effects.exit("chunkContent");
        previous = previous.next = effects.enter("chunkContent", {
          contentType: "content",
          previous
        });
        return data;
      }
    }
    function tokenizeContinuation(effects, ok, nok) {
      var self2 = this;
      return startLookahead;
      function startLookahead(code) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return factorySpace(effects, prefixed, "linePrefix");
      }
      function prefixed(code) {
        if (code === null || markdownLineEnding(code)) {
          return nok(code);
        }
        if (self2.parser.constructs.disable.null.indexOf("codeIndented") > -1 || prefixSize(self2.events, "linePrefix") < 4) {
          return effects.interrupt(self2.parser.constructs.flow, nok, ok)(code);
        }
        return ok(code);
      }
    }
    module2.exports = content;
  }
});

// node_modules/micromark/dist/initialize/flow.js
var require_flow = __commonJS({
  "node_modules/micromark/dist/initialize/flow.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var content = require_content2();
    var factorySpace = require_factory_space();
    var partialBlankLine = require_partial_blank_line();
    var tokenize = initializeFlow;
    function initializeFlow(effects) {
      var self2 = this;
      var initial = effects.attempt(
        // Try to parse a blank line.
        partialBlankLine,
        atBlankEnding,
        // Try to parse initial flow (essentially, only code).
        effects.attempt(
          this.parser.constructs.flowInitial,
          afterConstruct,
          factorySpace(
            effects,
            effects.attempt(
              this.parser.constructs.flow,
              afterConstruct,
              effects.attempt(content, afterConstruct)
            ),
            "linePrefix"
          )
        )
      );
      return initial;
      function atBlankEnding(code) {
        if (code === null) {
          effects.consume(code);
          return;
        }
        effects.enter("lineEndingBlank");
        effects.consume(code);
        effects.exit("lineEndingBlank");
        self2.currentConstruct = void 0;
        return initial;
      }
      function afterConstruct(code) {
        if (code === null) {
          effects.consume(code);
          return;
        }
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        self2.currentConstruct = void 0;
        return initial;
      }
    }
    exports2.tokenize = tokenize;
  }
});

// node_modules/micromark/dist/initialize/text.js
var require_text = __commonJS({
  "node_modules/micromark/dist/initialize/text.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var assign = require_assign();
    var shallow = require_shallow();
    var text = initializeFactory("text");
    var string = initializeFactory("string");
    var resolver = {
      resolveAll: createResolver()
    };
    function initializeFactory(field) {
      return {
        tokenize: initializeText,
        resolveAll: createResolver(
          field === "text" ? resolveAllLineSuffixes : void 0
        )
      };
      function initializeText(effects) {
        var self2 = this;
        var constructs = this.parser.constructs[field];
        var text2 = effects.attempt(constructs, start, notText);
        return start;
        function start(code) {
          return atBreak(code) ? text2(code) : notText(code);
        }
        function notText(code) {
          if (code === null) {
            effects.consume(code);
            return;
          }
          effects.enter("data");
          effects.consume(code);
          return data;
        }
        function data(code) {
          if (atBreak(code)) {
            effects.exit("data");
            return text2(code);
          }
          effects.consume(code);
          return data;
        }
        function atBreak(code) {
          var list = constructs[code];
          var index = -1;
          if (code === null) {
            return true;
          }
          if (list) {
            while (++index < list.length) {
              if (!list[index].previous || list[index].previous.call(self2, self2.previous)) {
                return true;
              }
            }
          }
        }
      }
    }
    function createResolver(extraResolver) {
      return resolveAllText;
      function resolveAllText(events, context) {
        var index = -1;
        var enter;
        while (++index <= events.length) {
          if (enter === void 0) {
            if (events[index] && events[index][1].type === "data") {
              enter = index;
              index++;
            }
          } else if (!events[index] || events[index][1].type !== "data") {
            if (index !== enter + 2) {
              events[enter][1].end = events[index - 1][1].end;
              events.splice(enter + 2, index - enter - 2);
              index = enter + 2;
            }
            enter = void 0;
          }
        }
        return extraResolver ? extraResolver(events, context) : events;
      }
    }
    function resolveAllLineSuffixes(events, context) {
      var eventIndex = -1;
      var chunks;
      var data;
      var chunk;
      var index;
      var bufferIndex;
      var size;
      var tabs;
      var token2;
      while (++eventIndex <= events.length) {
        if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
          data = events[eventIndex - 1][1];
          chunks = context.sliceStream(data);
          index = chunks.length;
          bufferIndex = -1;
          size = 0;
          tabs = void 0;
          while (index--) {
            chunk = chunks[index];
            if (typeof chunk === "string") {
              bufferIndex = chunk.length;
              while (chunk.charCodeAt(bufferIndex - 1) === 32) {
                size++;
                bufferIndex--;
              }
              if (bufferIndex) break;
              bufferIndex = -1;
            } else if (chunk === -2) {
              tabs = true;
              size++;
            } else if (chunk === -1) ;
            else {
              index++;
              break;
            }
          }
          if (size) {
            token2 = {
              type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
              start: {
                line: data.end.line,
                column: data.end.column - size,
                offset: data.end.offset - size,
                _index: data.start._index + index,
                _bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex
              },
              end: shallow(data.end)
            };
            data.end = shallow(token2.start);
            if (data.start.offset === data.end.offset) {
              assign(data, token2);
            } else {
              events.splice(
                eventIndex,
                0,
                ["enter", token2, context],
                ["exit", token2, context]
              );
              eventIndex += 2;
            }
          }
          eventIndex++;
        }
      }
      return events;
    }
    exports2.resolver = resolver;
    exports2.string = string;
    exports2.text = text;
  }
});

// node_modules/micromark/dist/util/miniflat.js
var require_miniflat = __commonJS({
  "node_modules/micromark/dist/util/miniflat.js"(exports2, module2) {
    "use strict";
    function miniflat(value) {
      return value === null || value === void 0 ? [] : "length" in value ? value : [value];
    }
    module2.exports = miniflat;
  }
});

// node_modules/micromark/dist/util/combine-extensions.js
var require_combine_extensions = __commonJS({
  "node_modules/micromark/dist/util/combine-extensions.js"(exports2, module2) {
    "use strict";
    var hasOwnProperty4 = require_has_own_property();
    var chunkedSplice = require_chunked_splice();
    var miniflat = require_miniflat();
    function combineExtensions(extensions) {
      var all = {};
      var index = -1;
      while (++index < extensions.length) {
        extension(all, extensions[index]);
      }
      return all;
    }
    function extension(all, extension2) {
      var hook;
      var left;
      var right;
      var code;
      for (hook in extension2) {
        left = hasOwnProperty4.call(all, hook) ? all[hook] : all[hook] = {};
        right = extension2[hook];
        for (code in right) {
          left[code] = constructs(
            miniflat(right[code]),
            hasOwnProperty4.call(left, code) ? left[code] : []
          );
        }
      }
    }
    function constructs(list, existing) {
      var index = -1;
      var before = [];
      while (++index < list.length) {
        ;
        (list[index].add === "after" ? existing : before).push(list[index]);
      }
      chunkedSplice(existing, 0, 0, before);
      return existing;
    }
    module2.exports = combineExtensions;
  }
});

// node_modules/micromark/dist/util/chunked-push.js
var require_chunked_push = __commonJS({
  "node_modules/micromark/dist/util/chunked-push.js"(exports2, module2) {
    "use strict";
    var chunkedSplice = require_chunked_splice();
    function chunkedPush(list, items) {
      if (list.length) {
        chunkedSplice(list, list.length, 0, items);
        return list;
      }
      return items;
    }
    module2.exports = chunkedPush;
  }
});

// node_modules/micromark/dist/util/resolve-all.js
var require_resolve_all = __commonJS({
  "node_modules/micromark/dist/util/resolve-all.js"(exports2, module2) {
    "use strict";
    function resolveAll(constructs, events, context) {
      var called = [];
      var index = -1;
      var resolve;
      while (++index < constructs.length) {
        resolve = constructs[index].resolveAll;
        if (resolve && called.indexOf(resolve) < 0) {
          events = resolve(events, context);
          called.push(resolve);
        }
      }
      return events;
    }
    module2.exports = resolveAll;
  }
});

// node_modules/micromark/dist/util/serialize-chunks.js
var require_serialize_chunks = __commonJS({
  "node_modules/micromark/dist/util/serialize-chunks.js"(exports2, module2) {
    "use strict";
    var fromCharCode = require_from_char_code();
    function serializeChunks(chunks) {
      var index = -1;
      var result = [];
      var chunk;
      var value;
      var atTab;
      while (++index < chunks.length) {
        chunk = chunks[index];
        if (typeof chunk === "string") {
          value = chunk;
        } else if (chunk === -5) {
          value = "\r";
        } else if (chunk === -4) {
          value = "\n";
        } else if (chunk === -3) {
          value = "\r\n";
        } else if (chunk === -2) {
          value = "	";
        } else if (chunk === -1) {
          if (atTab) continue;
          value = " ";
        } else {
          value = fromCharCode(chunk);
        }
        atTab = chunk === -2;
        result.push(value);
      }
      return result.join("");
    }
    module2.exports = serializeChunks;
  }
});

// node_modules/micromark/dist/util/slice-chunks.js
var require_slice_chunks = __commonJS({
  "node_modules/micromark/dist/util/slice-chunks.js"(exports2, module2) {
    "use strict";
    function sliceChunks(chunks, token2) {
      var startIndex = token2.start._index;
      var startBufferIndex = token2.start._bufferIndex;
      var endIndex = token2.end._index;
      var endBufferIndex = token2.end._bufferIndex;
      var view;
      if (startIndex === endIndex) {
        view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
      } else {
        view = chunks.slice(startIndex, endIndex);
        if (startBufferIndex > -1) {
          view[0] = view[0].slice(startBufferIndex);
        }
        if (endBufferIndex > 0) {
          view.push(chunks[endIndex].slice(0, endBufferIndex));
        }
      }
      return view;
    }
    module2.exports = sliceChunks;
  }
});

// node_modules/micromark/dist/util/create-tokenizer.js
var require_create_tokenizer = __commonJS({
  "node_modules/micromark/dist/util/create-tokenizer.js"(exports2, module2) {
    "use strict";
    var assign = require_assign();
    var markdownLineEnding = require_markdown_line_ending();
    var chunkedPush = require_chunked_push();
    var chunkedSplice = require_chunked_splice();
    var miniflat = require_miniflat();
    var resolveAll = require_resolve_all();
    var serializeChunks = require_serialize_chunks();
    var shallow = require_shallow();
    var sliceChunks = require_slice_chunks();
    function createTokenizer(parser, initialize, from) {
      var point = from ? shallow(from) : {
        line: 1,
        column: 1,
        offset: 0
      };
      var columnStart = {};
      var resolveAllConstructs = [];
      var chunks = [];
      var stack = [];
      var effects = {
        consume,
        enter,
        exit,
        attempt: constructFactory(onsuccessfulconstruct),
        check: constructFactory(onsuccessfulcheck),
        interrupt: constructFactory(onsuccessfulcheck, {
          interrupt: true
        }),
        lazy: constructFactory(onsuccessfulcheck, {
          lazy: true
        })
      };
      var context = {
        previous: null,
        events: [],
        parser,
        sliceStream,
        sliceSerialize,
        now,
        defineSkip: skip,
        write
      };
      var state = initialize.tokenize.call(context, effects);
      if (initialize.resolveAll) {
        resolveAllConstructs.push(initialize);
      }
      point._index = 0;
      point._bufferIndex = -1;
      return context;
      function write(slice) {
        chunks = chunkedPush(chunks, slice);
        main();
        if (chunks[chunks.length - 1] !== null) {
          return [];
        }
        addResult(initialize, 0);
        context.events = resolveAll(resolveAllConstructs, context.events, context);
        return context.events;
      }
      function sliceSerialize(token2) {
        return serializeChunks(sliceStream(token2));
      }
      function sliceStream(token2) {
        return sliceChunks(chunks, token2);
      }
      function now() {
        return shallow(point);
      }
      function skip(value) {
        columnStart[value.line] = value.column;
        accountForPotentialSkip();
      }
      function main() {
        var chunkIndex;
        var chunk;
        while (point._index < chunks.length) {
          chunk = chunks[point._index];
          if (typeof chunk === "string") {
            chunkIndex = point._index;
            if (point._bufferIndex < 0) {
              point._bufferIndex = 0;
            }
            while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
              go2(chunk.charCodeAt(point._bufferIndex));
            }
          } else {
            go2(chunk);
          }
        }
      }
      function go2(code) {
        state = state(code);
      }
      function consume(code) {
        if (markdownLineEnding(code)) {
          point.line++;
          point.column = 1;
          point.offset += code === -3 ? 2 : 1;
          accountForPotentialSkip();
        } else if (code !== -1) {
          point.column++;
          point.offset++;
        }
        if (point._bufferIndex < 0) {
          point._index++;
        } else {
          point._bufferIndex++;
          if (point._bufferIndex === chunks[point._index].length) {
            point._bufferIndex = -1;
            point._index++;
          }
        }
        context.previous = code;
      }
      function enter(type, fields) {
        var token2 = fields || {};
        token2.type = type;
        token2.start = now();
        context.events.push(["enter", token2, context]);
        stack.push(token2);
        return token2;
      }
      function exit(type) {
        var token2 = stack.pop();
        token2.end = now();
        context.events.push(["exit", token2, context]);
        return token2;
      }
      function onsuccessfulconstruct(construct, info) {
        addResult(construct, info.from);
      }
      function onsuccessfulcheck(construct, info) {
        info.restore();
      }
      function constructFactory(onreturn, fields) {
        return hook;
        function hook(constructs, returnState, bogusState) {
          var listOfConstructs;
          var constructIndex;
          var currentConstruct;
          var info;
          return constructs.tokenize || "length" in constructs ? handleListOfConstructs(miniflat(constructs)) : handleMapOfConstructs;
          function handleMapOfConstructs(code) {
            if (code in constructs || null in constructs) {
              return handleListOfConstructs(
                constructs.null ? (
                  /* c8 ignore next */
                  miniflat(constructs[code]).concat(miniflat(constructs.null))
                ) : constructs[code]
              )(code);
            }
            return bogusState(code);
          }
          function handleListOfConstructs(list) {
            listOfConstructs = list;
            constructIndex = 0;
            return handleConstruct(list[constructIndex]);
          }
          function handleConstruct(construct) {
            return start;
            function start(code) {
              info = store();
              currentConstruct = construct;
              if (!construct.partial) {
                context.currentConstruct = construct;
              }
              if (construct.name && context.parser.constructs.disable.null.indexOf(construct.name) > -1) {
                return nok();
              }
              return construct.tokenize.call(
                fields ? assign({}, context, fields) : context,
                effects,
                ok,
                nok
              )(code);
            }
          }
          function ok(code) {
            onreturn(currentConstruct, info);
            return returnState;
          }
          function nok(code) {
            info.restore();
            if (++constructIndex < listOfConstructs.length) {
              return handleConstruct(listOfConstructs[constructIndex]);
            }
            return bogusState;
          }
        }
      }
      function addResult(construct, from2) {
        if (construct.resolveAll && resolveAllConstructs.indexOf(construct) < 0) {
          resolveAllConstructs.push(construct);
        }
        if (construct.resolve) {
          chunkedSplice(
            context.events,
            from2,
            context.events.length - from2,
            construct.resolve(context.events.slice(from2), context)
          );
        }
        if (construct.resolveTo) {
          context.events = construct.resolveTo(context.events, context);
        }
      }
      function store() {
        var startPoint = now();
        var startPrevious = context.previous;
        var startCurrentConstruct = context.currentConstruct;
        var startEventsIndex = context.events.length;
        var startStack = Array.from(stack);
        return {
          restore,
          from: startEventsIndex
        };
        function restore() {
          point = startPoint;
          context.previous = startPrevious;
          context.currentConstruct = startCurrentConstruct;
          context.events.length = startEventsIndex;
          stack = startStack;
          accountForPotentialSkip();
        }
      }
      function accountForPotentialSkip() {
        if (point.line in columnStart && point.column < 2) {
          point.column = columnStart[point.line];
          point.offset += columnStart[point.line] - 1;
        }
      }
    }
    module2.exports = createTokenizer;
  }
});

// node_modules/micromark/dist/character/markdown-line-ending-or-space.js
var require_markdown_line_ending_or_space = __commonJS({
  "node_modules/micromark/dist/character/markdown-line-ending-or-space.js"(exports2, module2) {
    "use strict";
    function markdownLineEndingOrSpace(code) {
      return code < 0 || code === 32;
    }
    module2.exports = markdownLineEndingOrSpace;
  }
});

// node_modules/micromark/dist/constant/unicode-punctuation-regex.js
var require_unicode_punctuation_regex = __commonJS({
  "node_modules/micromark/dist/constant/unicode-punctuation-regex.js"(exports2, module2) {
    "use strict";
    var unicodePunctuation = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
    module2.exports = unicodePunctuation;
  }
});

// node_modules/micromark/dist/util/regex-check.js
var require_regex_check = __commonJS({
  "node_modules/micromark/dist/util/regex-check.js"(exports2, module2) {
    "use strict";
    var fromCharCode = require_from_char_code();
    function regexCheck(regex) {
      return check;
      function check(code) {
        return regex.test(fromCharCode(code));
      }
    }
    module2.exports = regexCheck;
  }
});

// node_modules/micromark/dist/character/unicode-punctuation.js
var require_unicode_punctuation = __commonJS({
  "node_modules/micromark/dist/character/unicode-punctuation.js"(exports2, module2) {
    "use strict";
    var unicodePunctuationRegex = require_unicode_punctuation_regex();
    var regexCheck = require_regex_check();
    var unicodePunctuation = regexCheck(unicodePunctuationRegex);
    module2.exports = unicodePunctuation;
  }
});

// node_modules/micromark/dist/character/unicode-whitespace.js
var require_unicode_whitespace = __commonJS({
  "node_modules/micromark/dist/character/unicode-whitespace.js"(exports2, module2) {
    "use strict";
    var regexCheck = require_regex_check();
    var unicodeWhitespace = regexCheck(/\s/);
    module2.exports = unicodeWhitespace;
  }
});

// node_modules/micromark/dist/util/classify-character.js
var require_classify_character = __commonJS({
  "node_modules/micromark/dist/util/classify-character.js"(exports2, module2) {
    "use strict";
    var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
    var unicodePunctuation = require_unicode_punctuation();
    var unicodeWhitespace = require_unicode_whitespace();
    function classifyCharacter(code) {
      if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
        return 1;
      }
      if (unicodePunctuation(code)) {
        return 2;
      }
    }
    module2.exports = classifyCharacter;
  }
});

// node_modules/micromark/dist/util/move-point.js
var require_move_point = __commonJS({
  "node_modules/micromark/dist/util/move-point.js"(exports2, module2) {
    "use strict";
    function movePoint(point, offset) {
      point.column += offset;
      point.offset += offset;
      point._bufferIndex += offset;
      return point;
    }
    module2.exports = movePoint;
  }
});

// node_modules/micromark/dist/tokenize/attention.js
var require_attention = __commonJS({
  "node_modules/micromark/dist/tokenize/attention.js"(exports2, module2) {
    "use strict";
    var chunkedPush = require_chunked_push();
    var chunkedSplice = require_chunked_splice();
    var classifyCharacter = require_classify_character();
    var movePoint = require_move_point();
    var resolveAll = require_resolve_all();
    var shallow = require_shallow();
    var attention = {
      name: "attention",
      tokenize: tokenizeAttention,
      resolveAll: resolveAllAttention
    };
    function resolveAllAttention(events, context) {
      var index = -1;
      var open;
      var group;
      var text;
      var openingSequence;
      var closingSequence;
      var use3;
      var nextEvents;
      var offset;
      while (++index < events.length) {
        if (events[index][0] === "enter" && events[index][1].type === "attentionSequence" && events[index][1]._close) {
          open = index;
          while (open--) {
            if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && // If the markers are the same:
            context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
              if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) {
                continue;
              }
              use3 = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
              openingSequence = {
                type: use3 > 1 ? "strongSequence" : "emphasisSequence",
                start: movePoint(shallow(events[open][1].end), -use3),
                end: shallow(events[open][1].end)
              };
              closingSequence = {
                type: use3 > 1 ? "strongSequence" : "emphasisSequence",
                start: shallow(events[index][1].start),
                end: movePoint(shallow(events[index][1].start), use3)
              };
              text = {
                type: use3 > 1 ? "strongText" : "emphasisText",
                start: shallow(events[open][1].end),
                end: shallow(events[index][1].start)
              };
              group = {
                type: use3 > 1 ? "strong" : "emphasis",
                start: shallow(openingSequence.start),
                end: shallow(closingSequence.end)
              };
              events[open][1].end = shallow(openingSequence.start);
              events[index][1].start = shallow(closingSequence.end);
              nextEvents = [];
              if (events[open][1].end.offset - events[open][1].start.offset) {
                nextEvents = chunkedPush(nextEvents, [
                  ["enter", events[open][1], context],
                  ["exit", events[open][1], context]
                ]);
              }
              nextEvents = chunkedPush(nextEvents, [
                ["enter", group, context],
                ["enter", openingSequence, context],
                ["exit", openingSequence, context],
                ["enter", text, context]
              ]);
              nextEvents = chunkedPush(
                nextEvents,
                resolveAll(
                  context.parser.constructs.insideSpan.null,
                  events.slice(open + 1, index),
                  context
                )
              );
              nextEvents = chunkedPush(nextEvents, [
                ["exit", text, context],
                ["enter", closingSequence, context],
                ["exit", closingSequence, context],
                ["exit", group, context]
              ]);
              if (events[index][1].end.offset - events[index][1].start.offset) {
                offset = 2;
                nextEvents = chunkedPush(nextEvents, [
                  ["enter", events[index][1], context],
                  ["exit", events[index][1], context]
                ]);
              } else {
                offset = 0;
              }
              chunkedSplice(events, open - 1, index - open + 3, nextEvents);
              index = open + nextEvents.length - offset - 2;
              break;
            }
          }
        }
      }
      index = -1;
      while (++index < events.length) {
        if (events[index][1].type === "attentionSequence") {
          events[index][1].type = "data";
        }
      }
      return events;
    }
    function tokenizeAttention(effects, ok) {
      var before = classifyCharacter(this.previous);
      var marker;
      return start;
      function start(code) {
        effects.enter("attentionSequence");
        marker = code;
        return sequence(code);
      }
      function sequence(code) {
        var token2;
        var after;
        var open;
        var close;
        if (code === marker) {
          effects.consume(code);
          return sequence;
        }
        token2 = effects.exit("attentionSequence");
        after = classifyCharacter(code);
        open = !after || after === 2 && before;
        close = !before || before === 2 && after;
        token2._open = marker === 42 ? open : open && (before || !close);
        token2._close = marker === 42 ? close : close && (after || !open);
        return ok(code);
      }
    }
    module2.exports = attention;
  }
});

// node_modules/micromark/dist/character/ascii-alpha.js
var require_ascii_alpha = __commonJS({
  "node_modules/micromark/dist/character/ascii-alpha.js"(exports2, module2) {
    "use strict";
    var regexCheck = require_regex_check();
    var asciiAlpha = regexCheck(/[A-Za-z]/);
    module2.exports = asciiAlpha;
  }
});

// node_modules/micromark/dist/character/ascii-alphanumeric.js
var require_ascii_alphanumeric = __commonJS({
  "node_modules/micromark/dist/character/ascii-alphanumeric.js"(exports2, module2) {
    "use strict";
    var regexCheck = require_regex_check();
    var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
    module2.exports = asciiAlphanumeric;
  }
});

// node_modules/micromark/dist/character/ascii-atext.js
var require_ascii_atext = __commonJS({
  "node_modules/micromark/dist/character/ascii-atext.js"(exports2, module2) {
    "use strict";
    var regexCheck = require_regex_check();
    var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
    module2.exports = asciiAtext;
  }
});

// node_modules/micromark/dist/character/ascii-control.js
var require_ascii_control = __commonJS({
  "node_modules/micromark/dist/character/ascii-control.js"(exports2, module2) {
    "use strict";
    function asciiControl(code) {
      return (
        // Special whitespace codes (which have negative values), C0 and Control
        // character DEL
        code < 32 || code === 127
      );
    }
    module2.exports = asciiControl;
  }
});

// node_modules/micromark/dist/tokenize/autolink.js
var require_autolink = __commonJS({
  "node_modules/micromark/dist/tokenize/autolink.js"(exports2, module2) {
    "use strict";
    var asciiAlpha = require_ascii_alpha();
    var asciiAlphanumeric = require_ascii_alphanumeric();
    var asciiAtext = require_ascii_atext();
    var asciiControl = require_ascii_control();
    var autolink = {
      name: "autolink",
      tokenize: tokenizeAutolink
    };
    function tokenizeAutolink(effects, ok, nok) {
      var size = 1;
      return start;
      function start(code) {
        effects.enter("autolink");
        effects.enter("autolinkMarker");
        effects.consume(code);
        effects.exit("autolinkMarker");
        effects.enter("autolinkProtocol");
        return open;
      }
      function open(code) {
        if (asciiAlpha(code)) {
          effects.consume(code);
          return schemeOrEmailAtext;
        }
        return asciiAtext(code) ? emailAtext(code) : nok(code);
      }
      function schemeOrEmailAtext(code) {
        return code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code) ? schemeInsideOrEmailAtext(code) : emailAtext(code);
      }
      function schemeInsideOrEmailAtext(code) {
        if (code === 58) {
          effects.consume(code);
          return urlInside;
        }
        if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32) {
          effects.consume(code);
          return schemeInsideOrEmailAtext;
        }
        return emailAtext(code);
      }
      function urlInside(code) {
        if (code === 62) {
          effects.exit("autolinkProtocol");
          return end(code);
        }
        if (code === 32 || code === 60 || asciiControl(code)) {
          return nok(code);
        }
        effects.consume(code);
        return urlInside;
      }
      function emailAtext(code) {
        if (code === 64) {
          effects.consume(code);
          size = 0;
          return emailAtSignOrDot;
        }
        if (asciiAtext(code)) {
          effects.consume(code);
          return emailAtext;
        }
        return nok(code);
      }
      function emailAtSignOrDot(code) {
        return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
      }
      function emailLabel(code) {
        if (code === 46) {
          effects.consume(code);
          size = 0;
          return emailAtSignOrDot;
        }
        if (code === 62) {
          effects.exit("autolinkProtocol").type = "autolinkEmail";
          return end(code);
        }
        return emailValue(code);
      }
      function emailValue(code) {
        if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
          effects.consume(code);
          return code === 45 ? emailValue : emailLabel;
        }
        return nok(code);
      }
      function end(code) {
        effects.enter("autolinkMarker");
        effects.consume(code);
        effects.exit("autolinkMarker");
        effects.exit("autolink");
        return ok;
      }
    }
    module2.exports = autolink;
  }
});

// node_modules/micromark/dist/tokenize/block-quote.js
var require_block_quote = __commonJS({
  "node_modules/micromark/dist/tokenize/block-quote.js"(exports2, module2) {
    "use strict";
    var markdownSpace = require_markdown_space();
    var factorySpace = require_factory_space();
    var blockQuote = {
      name: "blockQuote",
      tokenize: tokenizeBlockQuoteStart,
      continuation: {
        tokenize: tokenizeBlockQuoteContinuation
      },
      exit
    };
    function tokenizeBlockQuoteStart(effects, ok, nok) {
      var self2 = this;
      return start;
      function start(code) {
        if (code === 62) {
          if (!self2.containerState.open) {
            effects.enter("blockQuote", {
              _container: true
            });
            self2.containerState.open = true;
          }
          effects.enter("blockQuotePrefix");
          effects.enter("blockQuoteMarker");
          effects.consume(code);
          effects.exit("blockQuoteMarker");
          return after;
        }
        return nok(code);
      }
      function after(code) {
        if (markdownSpace(code)) {
          effects.enter("blockQuotePrefixWhitespace");
          effects.consume(code);
          effects.exit("blockQuotePrefixWhitespace");
          effects.exit("blockQuotePrefix");
          return ok;
        }
        effects.exit("blockQuotePrefix");
        return ok(code);
      }
    }
    function tokenizeBlockQuoteContinuation(effects, ok, nok) {
      return factorySpace(
        effects,
        effects.attempt(blockQuote, ok, nok),
        "linePrefix",
        this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4
      );
    }
    function exit(effects) {
      effects.exit("blockQuote");
    }
    module2.exports = blockQuote;
  }
});

// node_modules/micromark/dist/character/ascii-punctuation.js
var require_ascii_punctuation = __commonJS({
  "node_modules/micromark/dist/character/ascii-punctuation.js"(exports2, module2) {
    "use strict";
    var regexCheck = require_regex_check();
    var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
    module2.exports = asciiPunctuation;
  }
});

// node_modules/micromark/dist/tokenize/character-escape.js
var require_character_escape = __commonJS({
  "node_modules/micromark/dist/tokenize/character-escape.js"(exports2, module2) {
    "use strict";
    var asciiPunctuation = require_ascii_punctuation();
    var characterEscape = {
      name: "characterEscape",
      tokenize: tokenizeCharacterEscape
    };
    function tokenizeCharacterEscape(effects, ok, nok) {
      return start;
      function start(code) {
        effects.enter("characterEscape");
        effects.enter("escapeMarker");
        effects.consume(code);
        effects.exit("escapeMarker");
        return open;
      }
      function open(code) {
        if (asciiPunctuation(code)) {
          effects.enter("characterEscapeValue");
          effects.consume(code);
          effects.exit("characterEscapeValue");
          effects.exit("characterEscape");
          return ok;
        }
        return nok(code);
      }
    }
    module2.exports = characterEscape;
  }
});

// node_modules/micromark/node_modules/parse-entities/decode-entity.browser.js
var require_decode_entity_browser = __commonJS({
  "node_modules/micromark/node_modules/parse-entities/decode-entity.browser.js"(exports2, module2) {
    "use strict";
    var el;
    var semicolon = 59;
    module2.exports = decodeEntity;
    function decodeEntity(characters) {
      var entity = "&" + characters + ";";
      var char;
      el = el || document.createElement("i");
      el.innerHTML = entity;
      char = el.textContent;
      if (char.charCodeAt(char.length - 1) === semicolon && characters !== "semi") {
        return false;
      }
      return char === entity ? false : char;
    }
  }
});

// node_modules/micromark/dist/character/ascii-digit.js
var require_ascii_digit = __commonJS({
  "node_modules/micromark/dist/character/ascii-digit.js"(exports2, module2) {
    "use strict";
    var regexCheck = require_regex_check();
    var asciiDigit = regexCheck(/\d/);
    module2.exports = asciiDigit;
  }
});

// node_modules/micromark/dist/character/ascii-hex-digit.js
var require_ascii_hex_digit = __commonJS({
  "node_modules/micromark/dist/character/ascii-hex-digit.js"(exports2, module2) {
    "use strict";
    var regexCheck = require_regex_check();
    var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
    module2.exports = asciiHexDigit;
  }
});

// node_modules/micromark/dist/tokenize/character-reference.js
var require_character_reference = __commonJS({
  "node_modules/micromark/dist/tokenize/character-reference.js"(exports2, module2) {
    "use strict";
    var decodeEntity = require_decode_entity_browser();
    var asciiAlphanumeric = require_ascii_alphanumeric();
    var asciiDigit = require_ascii_digit();
    var asciiHexDigit = require_ascii_hex_digit();
    function _interopDefaultLegacy(e2) {
      return e2 && typeof e2 === "object" && "default" in e2 ? e2 : { default: e2 };
    }
    var decodeEntity__default = _interopDefaultLegacy(decodeEntity);
    var characterReference = {
      name: "characterReference",
      tokenize: tokenizeCharacterReference
    };
    function tokenizeCharacterReference(effects, ok, nok) {
      var self2 = this;
      var size = 0;
      var max;
      var test;
      return start;
      function start(code) {
        effects.enter("characterReference");
        effects.enter("characterReferenceMarker");
        effects.consume(code);
        effects.exit("characterReferenceMarker");
        return open;
      }
      function open(code) {
        if (code === 35) {
          effects.enter("characterReferenceMarkerNumeric");
          effects.consume(code);
          effects.exit("characterReferenceMarkerNumeric");
          return numeric;
        }
        effects.enter("characterReferenceValue");
        max = 31;
        test = asciiAlphanumeric;
        return value(code);
      }
      function numeric(code) {
        if (code === 88 || code === 120) {
          effects.enter("characterReferenceMarkerHexadecimal");
          effects.consume(code);
          effects.exit("characterReferenceMarkerHexadecimal");
          effects.enter("characterReferenceValue");
          max = 6;
          test = asciiHexDigit;
          return value;
        }
        effects.enter("characterReferenceValue");
        max = 7;
        test = asciiDigit;
        return value(code);
      }
      function value(code) {
        var token2;
        if (code === 59 && size) {
          token2 = effects.exit("characterReferenceValue");
          if (test === asciiAlphanumeric && !decodeEntity__default["default"](self2.sliceSerialize(token2))) {
            return nok(code);
          }
          effects.enter("characterReferenceMarker");
          effects.consume(code);
          effects.exit("characterReferenceMarker");
          effects.exit("characterReference");
          return ok;
        }
        if (test(code) && size++ < max) {
          effects.consume(code);
          return value;
        }
        return nok(code);
      }
    }
    module2.exports = characterReference;
  }
});

// node_modules/micromark/dist/tokenize/code-fenced.js
var require_code_fenced = __commonJS({
  "node_modules/micromark/dist/tokenize/code-fenced.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
    var prefixSize = require_prefix_size();
    var factorySpace = require_factory_space();
    var codeFenced = {
      name: "codeFenced",
      tokenize: tokenizeCodeFenced,
      concrete: true
    };
    function tokenizeCodeFenced(effects, ok, nok) {
      var self2 = this;
      var closingFenceConstruct = {
        tokenize: tokenizeClosingFence,
        partial: true
      };
      var initialPrefix = prefixSize(this.events, "linePrefix");
      var sizeOpen = 0;
      var marker;
      return start;
      function start(code) {
        effects.enter("codeFenced");
        effects.enter("codeFencedFence");
        effects.enter("codeFencedFenceSequence");
        marker = code;
        return sequenceOpen(code);
      }
      function sequenceOpen(code) {
        if (code === marker) {
          effects.consume(code);
          sizeOpen++;
          return sequenceOpen;
        }
        effects.exit("codeFencedFenceSequence");
        return sizeOpen < 3 ? nok(code) : factorySpace(effects, infoOpen, "whitespace")(code);
      }
      function infoOpen(code) {
        if (code === null || markdownLineEnding(code)) {
          return openAfter(code);
        }
        effects.enter("codeFencedFenceInfo");
        effects.enter("chunkString", {
          contentType: "string"
        });
        return info(code);
      }
      function info(code) {
        if (code === null || markdownLineEndingOrSpace(code)) {
          effects.exit("chunkString");
          effects.exit("codeFencedFenceInfo");
          return factorySpace(effects, infoAfter, "whitespace")(code);
        }
        if (code === 96 && code === marker) return nok(code);
        effects.consume(code);
        return info;
      }
      function infoAfter(code) {
        if (code === null || markdownLineEnding(code)) {
          return openAfter(code);
        }
        effects.enter("codeFencedFenceMeta");
        effects.enter("chunkString", {
          contentType: "string"
        });
        return meta(code);
      }
      function meta(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("chunkString");
          effects.exit("codeFencedFenceMeta");
          return openAfter(code);
        }
        if (code === 96 && code === marker) return nok(code);
        effects.consume(code);
        return meta;
      }
      function openAfter(code) {
        effects.exit("codeFencedFence");
        return self2.interrupt ? ok(code) : content(code);
      }
      function content(code) {
        if (code === null) {
          return after(code);
        }
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          return effects.attempt(
            closingFenceConstruct,
            after,
            initialPrefix ? factorySpace(effects, content, "linePrefix", initialPrefix + 1) : content
          );
        }
        effects.enter("codeFlowValue");
        return contentContinue(code);
      }
      function contentContinue(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("codeFlowValue");
          return content(code);
        }
        effects.consume(code);
        return contentContinue;
      }
      function after(code) {
        effects.exit("codeFenced");
        return ok(code);
      }
      function tokenizeClosingFence(effects2, ok2, nok2) {
        var size = 0;
        return factorySpace(
          effects2,
          closingSequenceStart,
          "linePrefix",
          this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4
        );
        function closingSequenceStart(code) {
          effects2.enter("codeFencedFence");
          effects2.enter("codeFencedFenceSequence");
          return closingSequence(code);
        }
        function closingSequence(code) {
          if (code === marker) {
            effects2.consume(code);
            size++;
            return closingSequence;
          }
          if (size < sizeOpen) return nok2(code);
          effects2.exit("codeFencedFenceSequence");
          return factorySpace(effects2, closingSequenceEnd, "whitespace")(code);
        }
        function closingSequenceEnd(code) {
          if (code === null || markdownLineEnding(code)) {
            effects2.exit("codeFencedFence");
            return ok2(code);
          }
          return nok2(code);
        }
      }
    }
    module2.exports = codeFenced;
  }
});

// node_modules/micromark/dist/tokenize/code-indented.js
var require_code_indented = __commonJS({
  "node_modules/micromark/dist/tokenize/code-indented.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var chunkedSplice = require_chunked_splice();
    var prefixSize = require_prefix_size();
    var factorySpace = require_factory_space();
    var codeIndented = {
      name: "codeIndented",
      tokenize: tokenizeCodeIndented,
      resolve: resolveCodeIndented
    };
    var indentedContentConstruct = {
      tokenize: tokenizeIndentedContent,
      partial: true
    };
    function resolveCodeIndented(events, context) {
      var code = {
        type: "codeIndented",
        start: events[0][1].start,
        end: events[events.length - 1][1].end
      };
      chunkedSplice(events, 0, 0, [["enter", code, context]]);
      chunkedSplice(events, events.length, 0, [["exit", code, context]]);
      return events;
    }
    function tokenizeCodeIndented(effects, ok, nok) {
      return effects.attempt(indentedContentConstruct, afterPrefix, nok);
      function afterPrefix(code) {
        if (code === null) {
          return ok(code);
        }
        if (markdownLineEnding(code)) {
          return effects.attempt(indentedContentConstruct, afterPrefix, ok)(code);
        }
        effects.enter("codeFlowValue");
        return content(code);
      }
      function content(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("codeFlowValue");
          return afterPrefix(code);
        }
        effects.consume(code);
        return content;
      }
    }
    function tokenizeIndentedContent(effects, ok, nok) {
      var self2 = this;
      return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1);
      function afterPrefix(code) {
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1);
        }
        return prefixSize(self2.events, "linePrefix") < 4 ? nok(code) : ok(code);
      }
    }
    module2.exports = codeIndented;
  }
});

// node_modules/micromark/dist/tokenize/code-text.js
var require_code_text = __commonJS({
  "node_modules/micromark/dist/tokenize/code-text.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var codeText = {
      name: "codeText",
      tokenize: tokenizeCodeText,
      resolve: resolveCodeText,
      previous
    };
    function resolveCodeText(events) {
      var tailExitIndex = events.length - 4;
      var headEnterIndex = 3;
      var index;
      var enter;
      if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
        index = headEnterIndex;
        while (++index < tailExitIndex) {
          if (events[index][1].type === "codeTextData") {
            events[tailExitIndex][1].type = events[headEnterIndex][1].type = "codeTextPadding";
            headEnterIndex += 2;
            tailExitIndex -= 2;
            break;
          }
        }
      }
      index = headEnterIndex - 1;
      tailExitIndex++;
      while (++index <= tailExitIndex) {
        if (enter === void 0) {
          if (index !== tailExitIndex && events[index][1].type !== "lineEnding") {
            enter = index;
          }
        } else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
          events[enter][1].type = "codeTextData";
          if (index !== enter + 2) {
            events[enter][1].end = events[index - 1][1].end;
            events.splice(enter + 2, index - enter - 2);
            tailExitIndex -= index - enter - 2;
            index = enter + 2;
          }
          enter = void 0;
        }
      }
      return events;
    }
    function previous(code) {
      return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
    }
    function tokenizeCodeText(effects, ok, nok) {
      var sizeOpen = 0;
      var size;
      var token2;
      return start;
      function start(code) {
        effects.enter("codeText");
        effects.enter("codeTextSequence");
        return openingSequence(code);
      }
      function openingSequence(code) {
        if (code === 96) {
          effects.consume(code);
          sizeOpen++;
          return openingSequence;
        }
        effects.exit("codeTextSequence");
        return gap(code);
      }
      function gap(code) {
        if (code === null) {
          return nok(code);
        }
        if (code === 96) {
          token2 = effects.enter("codeTextSequence");
          size = 0;
          return closingSequence(code);
        }
        if (code === 32) {
          effects.enter("space");
          effects.consume(code);
          effects.exit("space");
          return gap;
        }
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          return gap;
        }
        effects.enter("codeTextData");
        return data(code);
      }
      function data(code) {
        if (code === null || code === 32 || code === 96 || markdownLineEnding(code)) {
          effects.exit("codeTextData");
          return gap(code);
        }
        effects.consume(code);
        return data;
      }
      function closingSequence(code) {
        if (code === 96) {
          effects.consume(code);
          size++;
          return closingSequence;
        }
        if (size === sizeOpen) {
          effects.exit("codeTextSequence");
          effects.exit("codeText");
          return ok(code);
        }
        token2.type = "codeTextData";
        return data(code);
      }
    }
    module2.exports = codeText;
  }
});

// node_modules/micromark/dist/tokenize/factory-destination.js
var require_factory_destination = __commonJS({
  "node_modules/micromark/dist/tokenize/factory-destination.js"(exports2, module2) {
    "use strict";
    var asciiControl = require_ascii_control();
    var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
    var markdownLineEnding = require_markdown_line_ending();
    function destinationFactory(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
      var limit = max || Infinity;
      var balance = 0;
      return start;
      function start(code) {
        if (code === 60) {
          effects.enter(type);
          effects.enter(literalType);
          effects.enter(literalMarkerType);
          effects.consume(code);
          effects.exit(literalMarkerType);
          return destinationEnclosedBefore;
        }
        if (asciiControl(code) || code === 41) {
          return nok(code);
        }
        effects.enter(type);
        effects.enter(rawType);
        effects.enter(stringType);
        effects.enter("chunkString", {
          contentType: "string"
        });
        return destinationRaw(code);
      }
      function destinationEnclosedBefore(code) {
        if (code === 62) {
          effects.enter(literalMarkerType);
          effects.consume(code);
          effects.exit(literalMarkerType);
          effects.exit(literalType);
          effects.exit(type);
          return ok;
        }
        effects.enter(stringType);
        effects.enter("chunkString", {
          contentType: "string"
        });
        return destinationEnclosed(code);
      }
      function destinationEnclosed(code) {
        if (code === 62) {
          effects.exit("chunkString");
          effects.exit(stringType);
          return destinationEnclosedBefore(code);
        }
        if (code === null || code === 60 || markdownLineEnding(code)) {
          return nok(code);
        }
        effects.consume(code);
        return code === 92 ? destinationEnclosedEscape : destinationEnclosed;
      }
      function destinationEnclosedEscape(code) {
        if (code === 60 || code === 62 || code === 92) {
          effects.consume(code);
          return destinationEnclosed;
        }
        return destinationEnclosed(code);
      }
      function destinationRaw(code) {
        if (code === 40) {
          if (++balance > limit) return nok(code);
          effects.consume(code);
          return destinationRaw;
        }
        if (code === 41) {
          if (!balance--) {
            effects.exit("chunkString");
            effects.exit(stringType);
            effects.exit(rawType);
            effects.exit(type);
            return ok(code);
          }
          effects.consume(code);
          return destinationRaw;
        }
        if (code === null || markdownLineEndingOrSpace(code)) {
          if (balance) return nok(code);
          effects.exit("chunkString");
          effects.exit(stringType);
          effects.exit(rawType);
          effects.exit(type);
          return ok(code);
        }
        if (asciiControl(code)) return nok(code);
        effects.consume(code);
        return code === 92 ? destinationRawEscape : destinationRaw;
      }
      function destinationRawEscape(code) {
        if (code === 40 || code === 41 || code === 92) {
          effects.consume(code);
          return destinationRaw;
        }
        return destinationRaw(code);
      }
    }
    module2.exports = destinationFactory;
  }
});

// node_modules/micromark/dist/tokenize/factory-label.js
var require_factory_label = __commonJS({
  "node_modules/micromark/dist/tokenize/factory-label.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var markdownSpace = require_markdown_space();
    function labelFactory(effects, ok, nok, type, markerType, stringType) {
      var self2 = this;
      var size = 0;
      var data;
      return start;
      function start(code) {
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        effects.enter(stringType);
        return atBreak;
      }
      function atBreak(code) {
        if (code === null || code === 91 || code === 93 && !data || /* c8 ignore next */
        code === 94 && /* c8 ignore next */
        !size && /* c8 ignore next */
        "_hiddenFootnoteSupport" in self2.parser.constructs || size > 999) {
          return nok(code);
        }
        if (code === 93) {
          effects.exit(stringType);
          effects.enter(markerType);
          effects.consume(code);
          effects.exit(markerType);
          effects.exit(type);
          return ok;
        }
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          return atBreak;
        }
        effects.enter("chunkString", {
          contentType: "string"
        });
        return label(code);
      }
      function label(code) {
        if (code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999) {
          effects.exit("chunkString");
          return atBreak(code);
        }
        effects.consume(code);
        data = data || !markdownSpace(code);
        return code === 92 ? labelEscape : label;
      }
      function labelEscape(code) {
        if (code === 91 || code === 92 || code === 93) {
          effects.consume(code);
          size++;
          return label;
        }
        return label(code);
      }
    }
    module2.exports = labelFactory;
  }
});

// node_modules/micromark/dist/tokenize/factory-whitespace.js
var require_factory_whitespace = __commonJS({
  "node_modules/micromark/dist/tokenize/factory-whitespace.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var markdownSpace = require_markdown_space();
    var factorySpace = require_factory_space();
    function whitespaceFactory(effects, ok) {
      var seen;
      return start;
      function start(code) {
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          seen = true;
          return start;
        }
        if (markdownSpace(code)) {
          return factorySpace(
            effects,
            start,
            seen ? "linePrefix" : "lineSuffix"
          )(code);
        }
        return ok(code);
      }
    }
    module2.exports = whitespaceFactory;
  }
});

// node_modules/micromark/dist/tokenize/factory-title.js
var require_factory_title = __commonJS({
  "node_modules/micromark/dist/tokenize/factory-title.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var factorySpace = require_factory_space();
    function titleFactory(effects, ok, nok, type, markerType, stringType) {
      var marker;
      return start;
      function start(code) {
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        marker = code === 40 ? 41 : code;
        return atFirstTitleBreak;
      }
      function atFirstTitleBreak(code) {
        if (code === marker) {
          effects.enter(markerType);
          effects.consume(code);
          effects.exit(markerType);
          effects.exit(type);
          return ok;
        }
        effects.enter(stringType);
        return atTitleBreak(code);
      }
      function atTitleBreak(code) {
        if (code === marker) {
          effects.exit(stringType);
          return atFirstTitleBreak(marker);
        }
        if (code === null) {
          return nok(code);
        }
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          return factorySpace(effects, atTitleBreak, "linePrefix");
        }
        effects.enter("chunkString", {
          contentType: "string"
        });
        return title(code);
      }
      function title(code) {
        if (code === marker || code === null || markdownLineEnding(code)) {
          effects.exit("chunkString");
          return atTitleBreak(code);
        }
        effects.consume(code);
        return code === 92 ? titleEscape : title;
      }
      function titleEscape(code) {
        if (code === marker || code === 92) {
          effects.consume(code);
          return title;
        }
        return title(code);
      }
    }
    module2.exports = titleFactory;
  }
});

// node_modules/micromark/dist/tokenize/definition.js
var require_definition = __commonJS({
  "node_modules/micromark/dist/tokenize/definition.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
    var normalizeIdentifier = require_normalize_identifier();
    var factoryDestination = require_factory_destination();
    var factoryLabel = require_factory_label();
    var factorySpace = require_factory_space();
    var factoryWhitespace = require_factory_whitespace();
    var factoryTitle = require_factory_title();
    var definition = {
      name: "definition",
      tokenize: tokenizeDefinition
    };
    var titleConstruct = {
      tokenize: tokenizeTitle,
      partial: true
    };
    function tokenizeDefinition(effects, ok, nok) {
      var self2 = this;
      var identifier;
      return start;
      function start(code) {
        effects.enter("definition");
        return factoryLabel.call(
          self2,
          effects,
          labelAfter,
          nok,
          "definitionLabel",
          "definitionLabelMarker",
          "definitionLabelString"
        )(code);
      }
      function labelAfter(code) {
        identifier = normalizeIdentifier(
          self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1)
        );
        if (code === 58) {
          effects.enter("definitionMarker");
          effects.consume(code);
          effects.exit("definitionMarker");
          return factoryWhitespace(
            effects,
            factoryDestination(
              effects,
              effects.attempt(
                titleConstruct,
                factorySpace(effects, after, "whitespace"),
                factorySpace(effects, after, "whitespace")
              ),
              nok,
              "definitionDestination",
              "definitionDestinationLiteral",
              "definitionDestinationLiteralMarker",
              "definitionDestinationRaw",
              "definitionDestinationString"
            )
          );
        }
        return nok(code);
      }
      function after(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("definition");
          if (self2.parser.defined.indexOf(identifier) < 0) {
            self2.parser.defined.push(identifier);
          }
          return ok(code);
        }
        return nok(code);
      }
    }
    function tokenizeTitle(effects, ok, nok) {
      return start;
      function start(code) {
        return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, before)(code) : nok(code);
      }
      function before(code) {
        if (code === 34 || code === 39 || code === 40) {
          return factoryTitle(
            effects,
            factorySpace(effects, after, "whitespace"),
            nok,
            "definitionTitle",
            "definitionTitleMarker",
            "definitionTitleString"
          )(code);
        }
        return nok(code);
      }
      function after(code) {
        return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
      }
    }
    module2.exports = definition;
  }
});

// node_modules/micromark/dist/tokenize/hard-break-escape.js
var require_hard_break_escape = __commonJS({
  "node_modules/micromark/dist/tokenize/hard-break-escape.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var hardBreakEscape = {
      name: "hardBreakEscape",
      tokenize: tokenizeHardBreakEscape
    };
    function tokenizeHardBreakEscape(effects, ok, nok) {
      return start;
      function start(code) {
        effects.enter("hardBreakEscape");
        effects.enter("escapeMarker");
        effects.consume(code);
        return open;
      }
      function open(code) {
        if (markdownLineEnding(code)) {
          effects.exit("escapeMarker");
          effects.exit("hardBreakEscape");
          return ok(code);
        }
        return nok(code);
      }
    }
    module2.exports = hardBreakEscape;
  }
});

// node_modules/micromark/dist/tokenize/heading-atx.js
var require_heading_atx = __commonJS({
  "node_modules/micromark/dist/tokenize/heading-atx.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
    var markdownSpace = require_markdown_space();
    var chunkedSplice = require_chunked_splice();
    var factorySpace = require_factory_space();
    var headingAtx = {
      name: "headingAtx",
      tokenize: tokenizeHeadingAtx,
      resolve: resolveHeadingAtx
    };
    function resolveHeadingAtx(events, context) {
      var contentEnd = events.length - 2;
      var contentStart = 3;
      var content;
      var text;
      if (events[contentStart][1].type === "whitespace") {
        contentStart += 2;
      }
      if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
        contentEnd -= 2;
      }
      if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
        contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
      }
      if (contentEnd > contentStart) {
        content = {
          type: "atxHeadingText",
          start: events[contentStart][1].start,
          end: events[contentEnd][1].end
        };
        text = {
          type: "chunkText",
          start: events[contentStart][1].start,
          end: events[contentEnd][1].end,
          contentType: "text"
        };
        chunkedSplice(events, contentStart, contentEnd - contentStart + 1, [
          ["enter", content, context],
          ["enter", text, context],
          ["exit", text, context],
          ["exit", content, context]
        ]);
      }
      return events;
    }
    function tokenizeHeadingAtx(effects, ok, nok) {
      var self2 = this;
      var size = 0;
      return start;
      function start(code) {
        effects.enter("atxHeading");
        effects.enter("atxHeadingSequence");
        return fenceOpenInside(code);
      }
      function fenceOpenInside(code) {
        if (code === 35 && size++ < 6) {
          effects.consume(code);
          return fenceOpenInside;
        }
        if (code === null || markdownLineEndingOrSpace(code)) {
          effects.exit("atxHeadingSequence");
          return self2.interrupt ? ok(code) : headingBreak(code);
        }
        return nok(code);
      }
      function headingBreak(code) {
        if (code === 35) {
          effects.enter("atxHeadingSequence");
          return sequence(code);
        }
        if (code === null || markdownLineEnding(code)) {
          effects.exit("atxHeading");
          return ok(code);
        }
        if (markdownSpace(code)) {
          return factorySpace(effects, headingBreak, "whitespace")(code);
        }
        effects.enter("atxHeadingText");
        return data(code);
      }
      function sequence(code) {
        if (code === 35) {
          effects.consume(code);
          return sequence;
        }
        effects.exit("atxHeadingSequence");
        return headingBreak(code);
      }
      function data(code) {
        if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
          effects.exit("atxHeadingText");
          return headingBreak(code);
        }
        effects.consume(code);
        return data;
      }
    }
    module2.exports = headingAtx;
  }
});

// node_modules/micromark/dist/constant/html-block-names.js
var require_html_block_names = __commonJS({
  "node_modules/micromark/dist/constant/html-block-names.js"(exports2, module2) {
    "use strict";
    var basics = [
      "address",
      "article",
      "aside",
      "base",
      "basefont",
      "blockquote",
      "body",
      "caption",
      "center",
      "col",
      "colgroup",
      "dd",
      "details",
      "dialog",
      "dir",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "frame",
      "frameset",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hr",
      "html",
      "iframe",
      "legend",
      "li",
      "link",
      "main",
      "menu",
      "menuitem",
      "nav",
      "noframes",
      "ol",
      "optgroup",
      "option",
      "p",
      "param",
      "section",
      "source",
      "summary",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "title",
      "tr",
      "track",
      "ul"
    ];
    module2.exports = basics;
  }
});

// node_modules/micromark/dist/constant/html-raw-names.js
var require_html_raw_names = __commonJS({
  "node_modules/micromark/dist/constant/html-raw-names.js"(exports2, module2) {
    "use strict";
    var raws = ["pre", "script", "style", "textarea"];
    module2.exports = raws;
  }
});

// node_modules/micromark/dist/tokenize/html-flow.js
var require_html_flow = __commonJS({
  "node_modules/micromark/dist/tokenize/html-flow.js"(exports2, module2) {
    "use strict";
    var asciiAlpha = require_ascii_alpha();
    var asciiAlphanumeric = require_ascii_alphanumeric();
    var markdownLineEnding = require_markdown_line_ending();
    var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
    var markdownSpace = require_markdown_space();
    var fromCharCode = require_from_char_code();
    var htmlBlockNames = require_html_block_names();
    var htmlRawNames = require_html_raw_names();
    var partialBlankLine = require_partial_blank_line();
    var htmlFlow = {
      name: "htmlFlow",
      tokenize: tokenizeHtmlFlow,
      resolveTo: resolveToHtmlFlow,
      concrete: true
    };
    var nextBlankConstruct = {
      tokenize: tokenizeNextBlank,
      partial: true
    };
    function resolveToHtmlFlow(events) {
      var index = events.length;
      while (index--) {
        if (events[index][0] === "enter" && events[index][1].type === "htmlFlow") {
          break;
        }
      }
      if (index > 1 && events[index - 2][1].type === "linePrefix") {
        events[index][1].start = events[index - 2][1].start;
        events[index + 1][1].start = events[index - 2][1].start;
        events.splice(index - 2, 2);
      }
      return events;
    }
    function tokenizeHtmlFlow(effects, ok, nok) {
      var self2 = this;
      var kind;
      var startTag;
      var buffer;
      var index;
      var marker;
      return start;
      function start(code) {
        effects.enter("htmlFlow");
        effects.enter("htmlFlowData");
        effects.consume(code);
        return open;
      }
      function open(code) {
        if (code === 33) {
          effects.consume(code);
          return declarationStart;
        }
        if (code === 47) {
          effects.consume(code);
          return tagCloseStart;
        }
        if (code === 63) {
          effects.consume(code);
          kind = 3;
          return self2.interrupt ? ok : continuationDeclarationInside;
        }
        if (asciiAlpha(code)) {
          effects.consume(code);
          buffer = fromCharCode(code);
          startTag = true;
          return tagName;
        }
        return nok(code);
      }
      function declarationStart(code) {
        if (code === 45) {
          effects.consume(code);
          kind = 2;
          return commentOpenInside;
        }
        if (code === 91) {
          effects.consume(code);
          kind = 5;
          buffer = "CDATA[";
          index = 0;
          return cdataOpenInside;
        }
        if (asciiAlpha(code)) {
          effects.consume(code);
          kind = 4;
          return self2.interrupt ? ok : continuationDeclarationInside;
        }
        return nok(code);
      }
      function commentOpenInside(code) {
        if (code === 45) {
          effects.consume(code);
          return self2.interrupt ? ok : continuationDeclarationInside;
        }
        return nok(code);
      }
      function cdataOpenInside(code) {
        if (code === buffer.charCodeAt(index++)) {
          effects.consume(code);
          return index === buffer.length ? self2.interrupt ? ok : continuation : cdataOpenInside;
        }
        return nok(code);
      }
      function tagCloseStart(code) {
        if (asciiAlpha(code)) {
          effects.consume(code);
          buffer = fromCharCode(code);
          return tagName;
        }
        return nok(code);
      }
      function tagName(code) {
        if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
          if (code !== 47 && startTag && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
            kind = 1;
            return self2.interrupt ? ok(code) : continuation(code);
          }
          if (htmlBlockNames.indexOf(buffer.toLowerCase()) > -1) {
            kind = 6;
            if (code === 47) {
              effects.consume(code);
              return basicSelfClosing;
            }
            return self2.interrupt ? ok(code) : continuation(code);
          }
          kind = 7;
          return self2.interrupt ? nok(code) : startTag ? completeAttributeNameBefore(code) : completeClosingTagAfter(code);
        }
        if (code === 45 || asciiAlphanumeric(code)) {
          effects.consume(code);
          buffer += fromCharCode(code);
          return tagName;
        }
        return nok(code);
      }
      function basicSelfClosing(code) {
        if (code === 62) {
          effects.consume(code);
          return self2.interrupt ? ok : continuation;
        }
        return nok(code);
      }
      function completeClosingTagAfter(code) {
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeClosingTagAfter;
        }
        return completeEnd(code);
      }
      function completeAttributeNameBefore(code) {
        if (code === 47) {
          effects.consume(code);
          return completeEnd;
        }
        if (code === 58 || code === 95 || asciiAlpha(code)) {
          effects.consume(code);
          return completeAttributeName;
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAttributeNameBefore;
        }
        return completeEnd(code);
      }
      function completeAttributeName(code) {
        if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
          effects.consume(code);
          return completeAttributeName;
        }
        return completeAttributeNameAfter(code);
      }
      function completeAttributeNameAfter(code) {
        if (code === 61) {
          effects.consume(code);
          return completeAttributeValueBefore;
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAttributeNameAfter;
        }
        return completeAttributeNameBefore(code);
      }
      function completeAttributeValueBefore(code) {
        if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
          return nok(code);
        }
        if (code === 34 || code === 39) {
          effects.consume(code);
          marker = code;
          return completeAttributeValueQuoted;
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAttributeValueBefore;
        }
        marker = void 0;
        return completeAttributeValueUnquoted(code);
      }
      function completeAttributeValueQuoted(code) {
        if (code === marker) {
          effects.consume(code);
          return completeAttributeValueQuotedAfter;
        }
        if (code === null || markdownLineEnding(code)) {
          return nok(code);
        }
        effects.consume(code);
        return completeAttributeValueQuoted;
      }
      function completeAttributeValueUnquoted(code) {
        if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code)) {
          return completeAttributeNameAfter(code);
        }
        effects.consume(code);
        return completeAttributeValueUnquoted;
      }
      function completeAttributeValueQuotedAfter(code) {
        if (code === 47 || code === 62 || markdownSpace(code)) {
          return completeAttributeNameBefore(code);
        }
        return nok(code);
      }
      function completeEnd(code) {
        if (code === 62) {
          effects.consume(code);
          return completeAfter;
        }
        return nok(code);
      }
      function completeAfter(code) {
        if (markdownSpace(code)) {
          effects.consume(code);
          return completeAfter;
        }
        return code === null || markdownLineEnding(code) ? continuation(code) : nok(code);
      }
      function continuation(code) {
        if (code === 45 && kind === 2) {
          effects.consume(code);
          return continuationCommentInside;
        }
        if (code === 60 && kind === 1) {
          effects.consume(code);
          return continuationRawTagOpen;
        }
        if (code === 62 && kind === 4) {
          effects.consume(code);
          return continuationClose;
        }
        if (code === 63 && kind === 3) {
          effects.consume(code);
          return continuationDeclarationInside;
        }
        if (code === 93 && kind === 5) {
          effects.consume(code);
          return continuationCharacterDataInside;
        }
        if (markdownLineEnding(code) && (kind === 6 || kind === 7)) {
          return effects.check(
            nextBlankConstruct,
            continuationClose,
            continuationAtLineEnding
          )(code);
        }
        if (code === null || markdownLineEnding(code)) {
          return continuationAtLineEnding(code);
        }
        effects.consume(code);
        return continuation;
      }
      function continuationAtLineEnding(code) {
        effects.exit("htmlFlowData");
        return htmlContinueStart(code);
      }
      function htmlContinueStart(code) {
        if (code === null) {
          return done(code);
        }
        if (markdownLineEnding(code)) {
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          return htmlContinueStart;
        }
        effects.enter("htmlFlowData");
        return continuation(code);
      }
      function continuationCommentInside(code) {
        if (code === 45) {
          effects.consume(code);
          return continuationDeclarationInside;
        }
        return continuation(code);
      }
      function continuationRawTagOpen(code) {
        if (code === 47) {
          effects.consume(code);
          buffer = "";
          return continuationRawEndTag;
        }
        return continuation(code);
      }
      function continuationRawEndTag(code) {
        if (code === 62 && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
          effects.consume(code);
          return continuationClose;
        }
        if (asciiAlpha(code) && buffer.length < 8) {
          effects.consume(code);
          buffer += fromCharCode(code);
          return continuationRawEndTag;
        }
        return continuation(code);
      }
      function continuationCharacterDataInside(code) {
        if (code === 93) {
          effects.consume(code);
          return continuationDeclarationInside;
        }
        return continuation(code);
      }
      function continuationDeclarationInside(code) {
        if (code === 62) {
          effects.consume(code);
          return continuationClose;
        }
        return continuation(code);
      }
      function continuationClose(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("htmlFlowData");
          return done(code);
        }
        effects.consume(code);
        return continuationClose;
      }
      function done(code) {
        effects.exit("htmlFlow");
        return ok(code);
      }
    }
    function tokenizeNextBlank(effects, ok, nok) {
      return start;
      function start(code) {
        effects.exit("htmlFlowData");
        effects.enter("lineEndingBlank");
        effects.consume(code);
        effects.exit("lineEndingBlank");
        return effects.attempt(partialBlankLine, ok, nok);
      }
    }
    module2.exports = htmlFlow;
  }
});

// node_modules/micromark/dist/tokenize/html-text.js
var require_html_text = __commonJS({
  "node_modules/micromark/dist/tokenize/html-text.js"(exports2, module2) {
    "use strict";
    var asciiAlpha = require_ascii_alpha();
    var asciiAlphanumeric = require_ascii_alphanumeric();
    var markdownLineEnding = require_markdown_line_ending();
    var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
    var markdownSpace = require_markdown_space();
    var factorySpace = require_factory_space();
    var htmlText = {
      name: "htmlText",
      tokenize: tokenizeHtmlText
    };
    function tokenizeHtmlText(effects, ok, nok) {
      var self2 = this;
      var marker;
      var buffer;
      var index;
      var returnState;
      return start;
      function start(code) {
        effects.enter("htmlText");
        effects.enter("htmlTextData");
        effects.consume(code);
        return open;
      }
      function open(code) {
        if (code === 33) {
          effects.consume(code);
          return declarationOpen;
        }
        if (code === 47) {
          effects.consume(code);
          return tagCloseStart;
        }
        if (code === 63) {
          effects.consume(code);
          return instruction;
        }
        if (asciiAlpha(code)) {
          effects.consume(code);
          return tagOpen;
        }
        return nok(code);
      }
      function declarationOpen(code) {
        if (code === 45) {
          effects.consume(code);
          return commentOpen;
        }
        if (code === 91) {
          effects.consume(code);
          buffer = "CDATA[";
          index = 0;
          return cdataOpen;
        }
        if (asciiAlpha(code)) {
          effects.consume(code);
          return declaration;
        }
        return nok(code);
      }
      function commentOpen(code) {
        if (code === 45) {
          effects.consume(code);
          return commentStart;
        }
        return nok(code);
      }
      function commentStart(code) {
        if (code === null || code === 62) {
          return nok(code);
        }
        if (code === 45) {
          effects.consume(code);
          return commentStartDash;
        }
        return comment(code);
      }
      function commentStartDash(code) {
        if (code === null || code === 62) {
          return nok(code);
        }
        return comment(code);
      }
      function comment(code) {
        if (code === null) {
          return nok(code);
        }
        if (code === 45) {
          effects.consume(code);
          return commentClose;
        }
        if (markdownLineEnding(code)) {
          returnState = comment;
          return atLineEnding(code);
        }
        effects.consume(code);
        return comment;
      }
      function commentClose(code) {
        if (code === 45) {
          effects.consume(code);
          return end;
        }
        return comment(code);
      }
      function cdataOpen(code) {
        if (code === buffer.charCodeAt(index++)) {
          effects.consume(code);
          return index === buffer.length ? cdata : cdataOpen;
        }
        return nok(code);
      }
      function cdata(code) {
        if (code === null) {
          return nok(code);
        }
        if (code === 93) {
          effects.consume(code);
          return cdataClose;
        }
        if (markdownLineEnding(code)) {
          returnState = cdata;
          return atLineEnding(code);
        }
        effects.consume(code);
        return cdata;
      }
      function cdataClose(code) {
        if (code === 93) {
          effects.consume(code);
          return cdataEnd;
        }
        return cdata(code);
      }
      function cdataEnd(code) {
        if (code === 62) {
          return end(code);
        }
        if (code === 93) {
          effects.consume(code);
          return cdataEnd;
        }
        return cdata(code);
      }
      function declaration(code) {
        if (code === null || code === 62) {
          return end(code);
        }
        if (markdownLineEnding(code)) {
          returnState = declaration;
          return atLineEnding(code);
        }
        effects.consume(code);
        return declaration;
      }
      function instruction(code) {
        if (code === null) {
          return nok(code);
        }
        if (code === 63) {
          effects.consume(code);
          return instructionClose;
        }
        if (markdownLineEnding(code)) {
          returnState = instruction;
          return atLineEnding(code);
        }
        effects.consume(code);
        return instruction;
      }
      function instructionClose(code) {
        return code === 62 ? end(code) : instruction(code);
      }
      function tagCloseStart(code) {
        if (asciiAlpha(code)) {
          effects.consume(code);
          return tagClose;
        }
        return nok(code);
      }
      function tagClose(code) {
        if (code === 45 || asciiAlphanumeric(code)) {
          effects.consume(code);
          return tagClose;
        }
        return tagCloseBetween(code);
      }
      function tagCloseBetween(code) {
        if (markdownLineEnding(code)) {
          returnState = tagCloseBetween;
          return atLineEnding(code);
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return tagCloseBetween;
        }
        return end(code);
      }
      function tagOpen(code) {
        if (code === 45 || asciiAlphanumeric(code)) {
          effects.consume(code);
          return tagOpen;
        }
        if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
          return tagOpenBetween(code);
        }
        return nok(code);
      }
      function tagOpenBetween(code) {
        if (code === 47) {
          effects.consume(code);
          return end;
        }
        if (code === 58 || code === 95 || asciiAlpha(code)) {
          effects.consume(code);
          return tagOpenAttributeName;
        }
        if (markdownLineEnding(code)) {
          returnState = tagOpenBetween;
          return atLineEnding(code);
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return tagOpenBetween;
        }
        return end(code);
      }
      function tagOpenAttributeName(code) {
        if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
          effects.consume(code);
          return tagOpenAttributeName;
        }
        return tagOpenAttributeNameAfter(code);
      }
      function tagOpenAttributeNameAfter(code) {
        if (code === 61) {
          effects.consume(code);
          return tagOpenAttributeValueBefore;
        }
        if (markdownLineEnding(code)) {
          returnState = tagOpenAttributeNameAfter;
          return atLineEnding(code);
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return tagOpenAttributeNameAfter;
        }
        return tagOpenBetween(code);
      }
      function tagOpenAttributeValueBefore(code) {
        if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
          return nok(code);
        }
        if (code === 34 || code === 39) {
          effects.consume(code);
          marker = code;
          return tagOpenAttributeValueQuoted;
        }
        if (markdownLineEnding(code)) {
          returnState = tagOpenAttributeValueBefore;
          return atLineEnding(code);
        }
        if (markdownSpace(code)) {
          effects.consume(code);
          return tagOpenAttributeValueBefore;
        }
        effects.consume(code);
        marker = void 0;
        return tagOpenAttributeValueUnquoted;
      }
      function tagOpenAttributeValueQuoted(code) {
        if (code === marker) {
          effects.consume(code);
          return tagOpenAttributeValueQuotedAfter;
        }
        if (code === null) {
          return nok(code);
        }
        if (markdownLineEnding(code)) {
          returnState = tagOpenAttributeValueQuoted;
          return atLineEnding(code);
        }
        effects.consume(code);
        return tagOpenAttributeValueQuoted;
      }
      function tagOpenAttributeValueQuotedAfter(code) {
        if (code === 62 || code === 47 || markdownLineEndingOrSpace(code)) {
          return tagOpenBetween(code);
        }
        return nok(code);
      }
      function tagOpenAttributeValueUnquoted(code) {
        if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) {
          return nok(code);
        }
        if (code === 62 || markdownLineEndingOrSpace(code)) {
          return tagOpenBetween(code);
        }
        effects.consume(code);
        return tagOpenAttributeValueUnquoted;
      }
      function atLineEnding(code) {
        effects.exit("htmlTextData");
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return factorySpace(
          effects,
          afterPrefix,
          "linePrefix",
          self2.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4
        );
      }
      function afterPrefix(code) {
        effects.enter("htmlTextData");
        return returnState(code);
      }
      function end(code) {
        if (code === 62) {
          effects.consume(code);
          effects.exit("htmlTextData");
          effects.exit("htmlText");
          return ok;
        }
        return nok(code);
      }
    }
    module2.exports = htmlText;
  }
});

// node_modules/micromark/dist/tokenize/label-end.js
var require_label_end = __commonJS({
  "node_modules/micromark/dist/tokenize/label-end.js"(exports2, module2) {
    "use strict";
    var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
    var chunkedPush = require_chunked_push();
    var chunkedSplice = require_chunked_splice();
    var normalizeIdentifier = require_normalize_identifier();
    var resolveAll = require_resolve_all();
    var shallow = require_shallow();
    var factoryDestination = require_factory_destination();
    var factoryLabel = require_factory_label();
    var factoryTitle = require_factory_title();
    var factoryWhitespace = require_factory_whitespace();
    var labelEnd = {
      name: "labelEnd",
      tokenize: tokenizeLabelEnd,
      resolveTo: resolveToLabelEnd,
      resolveAll: resolveAllLabelEnd
    };
    var resourceConstruct = {
      tokenize: tokenizeResource
    };
    var fullReferenceConstruct = {
      tokenize: tokenizeFullReference
    };
    var collapsedReferenceConstruct = {
      tokenize: tokenizeCollapsedReference
    };
    function resolveAllLabelEnd(events) {
      var index = -1;
      var token2;
      while (++index < events.length) {
        token2 = events[index][1];
        if (!token2._used && (token2.type === "labelImage" || token2.type === "labelLink" || token2.type === "labelEnd")) {
          events.splice(index + 1, token2.type === "labelImage" ? 4 : 2);
          token2.type = "data";
          index++;
        }
      }
      return events;
    }
    function resolveToLabelEnd(events, context) {
      var index = events.length;
      var offset = 0;
      var group;
      var label;
      var text;
      var token2;
      var open;
      var close;
      var media;
      while (index--) {
        token2 = events[index][1];
        if (open) {
          if (token2.type === "link" || token2.type === "labelLink" && token2._inactive) {
            break;
          }
          if (events[index][0] === "enter" && token2.type === "labelLink") {
            token2._inactive = true;
          }
        } else if (close) {
          if (events[index][0] === "enter" && (token2.type === "labelImage" || token2.type === "labelLink") && !token2._balanced) {
            open = index;
            if (token2.type !== "labelLink") {
              offset = 2;
              break;
            }
          }
        } else if (token2.type === "labelEnd") {
          close = index;
        }
      }
      group = {
        type: events[open][1].type === "labelLink" ? "link" : "image",
        start: shallow(events[open][1].start),
        end: shallow(events[events.length - 1][1].end)
      };
      label = {
        type: "label",
        start: shallow(events[open][1].start),
        end: shallow(events[close][1].end)
      };
      text = {
        type: "labelText",
        start: shallow(events[open + offset + 2][1].end),
        end: shallow(events[close - 2][1].start)
      };
      media = [
        ["enter", group, context],
        ["enter", label, context]
      ];
      media = chunkedPush(media, events.slice(open + 1, open + offset + 3));
      media = chunkedPush(media, [["enter", text, context]]);
      media = chunkedPush(
        media,
        resolveAll(
          context.parser.constructs.insideSpan.null,
          events.slice(open + offset + 4, close - 3),
          context
        )
      );
      media = chunkedPush(media, [
        ["exit", text, context],
        events[close - 2],
        events[close - 1],
        ["exit", label, context]
      ]);
      media = chunkedPush(media, events.slice(close + 1));
      media = chunkedPush(media, [["exit", group, context]]);
      chunkedSplice(events, open, events.length, media);
      return events;
    }
    function tokenizeLabelEnd(effects, ok, nok) {
      var self2 = this;
      var index = self2.events.length;
      var labelStart;
      var defined;
      while (index--) {
        if ((self2.events[index][1].type === "labelImage" || self2.events[index][1].type === "labelLink") && !self2.events[index][1]._balanced) {
          labelStart = self2.events[index][1];
          break;
        }
      }
      return start;
      function start(code) {
        if (!labelStart) {
          return nok(code);
        }
        if (labelStart._inactive) return balanced(code);
        defined = self2.parser.defined.indexOf(
          normalizeIdentifier(
            self2.sliceSerialize({
              start: labelStart.end,
              end: self2.now()
            })
          )
        ) > -1;
        effects.enter("labelEnd");
        effects.enter("labelMarker");
        effects.consume(code);
        effects.exit("labelMarker");
        effects.exit("labelEnd");
        return afterLabelEnd;
      }
      function afterLabelEnd(code) {
        if (code === 40) {
          return effects.attempt(
            resourceConstruct,
            ok,
            defined ? ok : balanced
          )(code);
        }
        if (code === 91) {
          return effects.attempt(
            fullReferenceConstruct,
            ok,
            defined ? effects.attempt(collapsedReferenceConstruct, ok, balanced) : balanced
          )(code);
        }
        return defined ? ok(code) : balanced(code);
      }
      function balanced(code) {
        labelStart._balanced = true;
        return nok(code);
      }
    }
    function tokenizeResource(effects, ok, nok) {
      return start;
      function start(code) {
        effects.enter("resource");
        effects.enter("resourceMarker");
        effects.consume(code);
        effects.exit("resourceMarker");
        return factoryWhitespace(effects, open);
      }
      function open(code) {
        if (code === 41) {
          return end(code);
        }
        return factoryDestination(
          effects,
          destinationAfter,
          nok,
          "resourceDestination",
          "resourceDestinationLiteral",
          "resourceDestinationLiteralMarker",
          "resourceDestinationRaw",
          "resourceDestinationString",
          3
        )(code);
      }
      function destinationAfter(code) {
        return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, between)(code) : end(code);
      }
      function between(code) {
        if (code === 34 || code === 39 || code === 40) {
          return factoryTitle(
            effects,
            factoryWhitespace(effects, end),
            nok,
            "resourceTitle",
            "resourceTitleMarker",
            "resourceTitleString"
          )(code);
        }
        return end(code);
      }
      function end(code) {
        if (code === 41) {
          effects.enter("resourceMarker");
          effects.consume(code);
          effects.exit("resourceMarker");
          effects.exit("resource");
          return ok;
        }
        return nok(code);
      }
    }
    function tokenizeFullReference(effects, ok, nok) {
      var self2 = this;
      return start;
      function start(code) {
        return factoryLabel.call(
          self2,
          effects,
          afterLabel,
          nok,
          "reference",
          "referenceMarker",
          "referenceString"
        )(code);
      }
      function afterLabel(code) {
        return self2.parser.defined.indexOf(
          normalizeIdentifier(
            self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1)
          )
        ) < 0 ? nok(code) : ok(code);
      }
    }
    function tokenizeCollapsedReference(effects, ok, nok) {
      return start;
      function start(code) {
        effects.enter("reference");
        effects.enter("referenceMarker");
        effects.consume(code);
        effects.exit("referenceMarker");
        return open;
      }
      function open(code) {
        if (code === 93) {
          effects.enter("referenceMarker");
          effects.consume(code);
          effects.exit("referenceMarker");
          effects.exit("reference");
          return ok;
        }
        return nok(code);
      }
    }
    module2.exports = labelEnd;
  }
});

// node_modules/micromark/dist/tokenize/label-start-image.js
var require_label_start_image = __commonJS({
  "node_modules/micromark/dist/tokenize/label-start-image.js"(exports2, module2) {
    "use strict";
    var labelEnd = require_label_end();
    var labelStartImage = {
      name: "labelStartImage",
      tokenize: tokenizeLabelStartImage,
      resolveAll: labelEnd.resolveAll
    };
    function tokenizeLabelStartImage(effects, ok, nok) {
      var self2 = this;
      return start;
      function start(code) {
        effects.enter("labelImage");
        effects.enter("labelImageMarker");
        effects.consume(code);
        effects.exit("labelImageMarker");
        return open;
      }
      function open(code) {
        if (code === 91) {
          effects.enter("labelMarker");
          effects.consume(code);
          effects.exit("labelMarker");
          effects.exit("labelImage");
          return after;
        }
        return nok(code);
      }
      function after(code) {
        return code === 94 && /* c8 ignore next */
        "_hiddenFootnoteSupport" in self2.parser.constructs ? (
          /* c8 ignore next */
          nok(code)
        ) : ok(code);
      }
    }
    module2.exports = labelStartImage;
  }
});

// node_modules/micromark/dist/tokenize/label-start-link.js
var require_label_start_link = __commonJS({
  "node_modules/micromark/dist/tokenize/label-start-link.js"(exports2, module2) {
    "use strict";
    var labelEnd = require_label_end();
    var labelStartLink = {
      name: "labelStartLink",
      tokenize: tokenizeLabelStartLink,
      resolveAll: labelEnd.resolveAll
    };
    function tokenizeLabelStartLink(effects, ok, nok) {
      var self2 = this;
      return start;
      function start(code) {
        effects.enter("labelLink");
        effects.enter("labelMarker");
        effects.consume(code);
        effects.exit("labelMarker");
        effects.exit("labelLink");
        return after;
      }
      function after(code) {
        return code === 94 && /* c8 ignore next */
        "_hiddenFootnoteSupport" in self2.parser.constructs ? (
          /* c8 ignore next */
          nok(code)
        ) : ok(code);
      }
    }
    module2.exports = labelStartLink;
  }
});

// node_modules/micromark/dist/tokenize/line-ending.js
var require_line_ending = __commonJS({
  "node_modules/micromark/dist/tokenize/line-ending.js"(exports2, module2) {
    "use strict";
    var factorySpace = require_factory_space();
    var lineEnding = {
      name: "lineEnding",
      tokenize: tokenizeLineEnding
    };
    function tokenizeLineEnding(effects, ok) {
      return start;
      function start(code) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return factorySpace(effects, ok, "linePrefix");
      }
    }
    module2.exports = lineEnding;
  }
});

// node_modules/micromark/dist/tokenize/thematic-break.js
var require_thematic_break = __commonJS({
  "node_modules/micromark/dist/tokenize/thematic-break.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var markdownSpace = require_markdown_space();
    var factorySpace = require_factory_space();
    var thematicBreak = {
      name: "thematicBreak",
      tokenize: tokenizeThematicBreak
    };
    function tokenizeThematicBreak(effects, ok, nok) {
      var size = 0;
      var marker;
      return start;
      function start(code) {
        effects.enter("thematicBreak");
        marker = code;
        return atBreak(code);
      }
      function atBreak(code) {
        if (code === marker) {
          effects.enter("thematicBreakSequence");
          return sequence(code);
        }
        if (markdownSpace(code)) {
          return factorySpace(effects, atBreak, "whitespace")(code);
        }
        if (size < 3 || code !== null && !markdownLineEnding(code)) {
          return nok(code);
        }
        effects.exit("thematicBreak");
        return ok(code);
      }
      function sequence(code) {
        if (code === marker) {
          effects.consume(code);
          size++;
          return sequence;
        }
        effects.exit("thematicBreakSequence");
        return atBreak(code);
      }
    }
    module2.exports = thematicBreak;
  }
});

// node_modules/micromark/dist/tokenize/list.js
var require_list = __commonJS({
  "node_modules/micromark/dist/tokenize/list.js"(exports2, module2) {
    "use strict";
    var asciiDigit = require_ascii_digit();
    var markdownSpace = require_markdown_space();
    var prefixSize = require_prefix_size();
    var sizeChunks = require_size_chunks();
    var factorySpace = require_factory_space();
    var partialBlankLine = require_partial_blank_line();
    var thematicBreak = require_thematic_break();
    var list = {
      name: "list",
      tokenize: tokenizeListStart,
      continuation: {
        tokenize: tokenizeListContinuation
      },
      exit: tokenizeListEnd
    };
    var listItemPrefixWhitespaceConstruct = {
      tokenize: tokenizeListItemPrefixWhitespace,
      partial: true
    };
    var indentConstruct = {
      tokenize: tokenizeIndent,
      partial: true
    };
    function tokenizeListStart(effects, ok, nok) {
      var self2 = this;
      var initialSize = prefixSize(self2.events, "linePrefix");
      var size = 0;
      return start;
      function start(code) {
        var kind = self2.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
        if (kind === "listUnordered" ? !self2.containerState.marker || code === self2.containerState.marker : asciiDigit(code)) {
          if (!self2.containerState.type) {
            self2.containerState.type = kind;
            effects.enter(kind, {
              _container: true
            });
          }
          if (kind === "listUnordered") {
            effects.enter("listItemPrefix");
            return code === 42 || code === 45 ? effects.check(thematicBreak, nok, atMarker)(code) : atMarker(code);
          }
          if (!self2.interrupt || code === 49) {
            effects.enter("listItemPrefix");
            effects.enter("listItemValue");
            return inside(code);
          }
        }
        return nok(code);
      }
      function inside(code) {
        if (asciiDigit(code) && ++size < 10) {
          effects.consume(code);
          return inside;
        }
        if ((!self2.interrupt || size < 2) && (self2.containerState.marker ? code === self2.containerState.marker : code === 41 || code === 46)) {
          effects.exit("listItemValue");
          return atMarker(code);
        }
        return nok(code);
      }
      function atMarker(code) {
        effects.enter("listItemMarker");
        effects.consume(code);
        effects.exit("listItemMarker");
        self2.containerState.marker = self2.containerState.marker || code;
        return effects.check(
          partialBlankLine,
          // Can’t be empty when interrupting.
          self2.interrupt ? nok : onBlank,
          effects.attempt(
            listItemPrefixWhitespaceConstruct,
            endOfPrefix,
            otherPrefix
          )
        );
      }
      function onBlank(code) {
        self2.containerState.initialBlankLine = true;
        initialSize++;
        return endOfPrefix(code);
      }
      function otherPrefix(code) {
        if (markdownSpace(code)) {
          effects.enter("listItemPrefixWhitespace");
          effects.consume(code);
          effects.exit("listItemPrefixWhitespace");
          return endOfPrefix;
        }
        return nok(code);
      }
      function endOfPrefix(code) {
        self2.containerState.size = initialSize + sizeChunks(self2.sliceStream(effects.exit("listItemPrefix")));
        return ok(code);
      }
    }
    function tokenizeListContinuation(effects, ok, nok) {
      var self2 = this;
      self2.containerState._closeFlow = void 0;
      return effects.check(partialBlankLine, onBlank, notBlank);
      function onBlank(code) {
        self2.containerState.furtherBlankLines = self2.containerState.furtherBlankLines || self2.containerState.initialBlankLine;
        return factorySpace(
          effects,
          ok,
          "listItemIndent",
          self2.containerState.size + 1
        )(code);
      }
      function notBlank(code) {
        if (self2.containerState.furtherBlankLines || !markdownSpace(code)) {
          self2.containerState.furtherBlankLines = self2.containerState.initialBlankLine = void 0;
          return notInCurrentItem(code);
        }
        self2.containerState.furtherBlankLines = self2.containerState.initialBlankLine = void 0;
        return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
      }
      function notInCurrentItem(code) {
        self2.containerState._closeFlow = true;
        self2.interrupt = void 0;
        return factorySpace(
          effects,
          effects.attempt(list, ok, nok),
          "linePrefix",
          self2.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4
        )(code);
      }
    }
    function tokenizeIndent(effects, ok, nok) {
      var self2 = this;
      return factorySpace(
        effects,
        afterPrefix,
        "listItemIndent",
        self2.containerState.size + 1
      );
      function afterPrefix(code) {
        return prefixSize(self2.events, "listItemIndent") === self2.containerState.size ? ok(code) : nok(code);
      }
    }
    function tokenizeListEnd(effects) {
      effects.exit(this.containerState.type);
    }
    function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
      var self2 = this;
      return factorySpace(
        effects,
        afterPrefix,
        "listItemPrefixWhitespace",
        self2.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4 + 1
      );
      function afterPrefix(code) {
        return markdownSpace(code) || !prefixSize(self2.events, "listItemPrefixWhitespace") ? nok(code) : ok(code);
      }
    }
    module2.exports = list;
  }
});

// node_modules/micromark/dist/tokenize/setext-underline.js
var require_setext_underline = __commonJS({
  "node_modules/micromark/dist/tokenize/setext-underline.js"(exports2, module2) {
    "use strict";
    var markdownLineEnding = require_markdown_line_ending();
    var shallow = require_shallow();
    var factorySpace = require_factory_space();
    var setextUnderline = {
      name: "setextUnderline",
      tokenize: tokenizeSetextUnderline,
      resolveTo: resolveToSetextUnderline
    };
    function resolveToSetextUnderline(events, context) {
      var index = events.length;
      var content;
      var text;
      var definition;
      var heading;
      while (index--) {
        if (events[index][0] === "enter") {
          if (events[index][1].type === "content") {
            content = index;
            break;
          }
          if (events[index][1].type === "paragraph") {
            text = index;
          }
        } else {
          if (events[index][1].type === "content") {
            events.splice(index, 1);
          }
          if (!definition && events[index][1].type === "definition") {
            definition = index;
          }
        }
      }
      heading = {
        type: "setextHeading",
        start: shallow(events[text][1].start),
        end: shallow(events[events.length - 1][1].end)
      };
      events[text][1].type = "setextHeadingText";
      if (definition) {
        events.splice(text, 0, ["enter", heading, context]);
        events.splice(definition + 1, 0, ["exit", events[content][1], context]);
        events[content][1].end = shallow(events[definition][1].end);
      } else {
        events[content][1] = heading;
      }
      events.push(["exit", heading, context]);
      return events;
    }
    function tokenizeSetextUnderline(effects, ok, nok) {
      var self2 = this;
      var index = self2.events.length;
      var marker;
      var paragraph;
      while (index--) {
        if (self2.events[index][1].type !== "lineEnding" && self2.events[index][1].type !== "linePrefix" && self2.events[index][1].type !== "content") {
          paragraph = self2.events[index][1].type === "paragraph";
          break;
        }
      }
      return start;
      function start(code) {
        if (!self2.lazy && (self2.interrupt || paragraph)) {
          effects.enter("setextHeadingLine");
          effects.enter("setextHeadingLineSequence");
          marker = code;
          return closingSequence(code);
        }
        return nok(code);
      }
      function closingSequence(code) {
        if (code === marker) {
          effects.consume(code);
          return closingSequence;
        }
        effects.exit("setextHeadingLineSequence");
        return factorySpace(effects, closingSequenceEnd, "lineSuffix")(code);
      }
      function closingSequenceEnd(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("setextHeadingLine");
          return ok(code);
        }
        return nok(code);
      }
    }
    module2.exports = setextUnderline;
  }
});

// node_modules/micromark/dist/constructs.js
var require_constructs = __commonJS({
  "node_modules/micromark/dist/constructs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var text$1 = require_text();
    var attention = require_attention();
    var autolink = require_autolink();
    var blockQuote = require_block_quote();
    var characterEscape = require_character_escape();
    var characterReference = require_character_reference();
    var codeFenced = require_code_fenced();
    var codeIndented = require_code_indented();
    var codeText = require_code_text();
    var definition = require_definition();
    var hardBreakEscape = require_hard_break_escape();
    var headingAtx = require_heading_atx();
    var htmlFlow = require_html_flow();
    var htmlText = require_html_text();
    var labelEnd = require_label_end();
    var labelStartImage = require_label_start_image();
    var labelStartLink = require_label_start_link();
    var lineEnding = require_line_ending();
    var list = require_list();
    var setextUnderline = require_setext_underline();
    var thematicBreak = require_thematic_break();
    var document2 = {
      42: list,
      // Asterisk
      43: list,
      // Plus sign
      45: list,
      // Dash
      48: list,
      // 0
      49: list,
      // 1
      50: list,
      // 2
      51: list,
      // 3
      52: list,
      // 4
      53: list,
      // 5
      54: list,
      // 6
      55: list,
      // 7
      56: list,
      // 8
      57: list,
      // 9
      62: blockQuote
      // Greater than
    };
    var contentInitial = {
      91: definition
      // Left square bracket
    };
    var flowInitial = {
      "-2": codeIndented,
      // Horizontal tab
      "-1": codeIndented,
      // Virtual space
      32: codeIndented
      // Space
    };
    var flow = {
      35: headingAtx,
      // Number sign
      42: thematicBreak,
      // Asterisk
      45: [setextUnderline, thematicBreak],
      // Dash
      60: htmlFlow,
      // Less than
      61: setextUnderline,
      // Equals to
      95: thematicBreak,
      // Underscore
      96: codeFenced,
      // Grave accent
      126: codeFenced
      // Tilde
    };
    var string = {
      38: characterReference,
      // Ampersand
      92: characterEscape
      // Backslash
    };
    var text = {
      "-5": lineEnding,
      // Carriage return
      "-4": lineEnding,
      // Line feed
      "-3": lineEnding,
      // Carriage return + line feed
      33: labelStartImage,
      // Exclamation mark
      38: characterReference,
      // Ampersand
      42: attention,
      // Asterisk
      60: [autolink, htmlText],
      // Less than
      91: labelStartLink,
      // Left square bracket
      92: [hardBreakEscape, characterEscape],
      // Backslash
      93: labelEnd,
      // Right square bracket
      95: attention,
      // Underscore
      96: codeText
      // Grave accent
    };
    var insideSpan = {
      null: [attention, text$1.resolver]
    };
    var disable = {
      null: []
    };
    exports2.contentInitial = contentInitial;
    exports2.disable = disable;
    exports2.document = document2;
    exports2.flow = flow;
    exports2.flowInitial = flowInitial;
    exports2.insideSpan = insideSpan;
    exports2.string = string;
    exports2.text = text;
  }
});

// node_modules/micromark/dist/parse.js
var require_parse = __commonJS({
  "node_modules/micromark/dist/parse.js"(exports2, module2) {
    "use strict";
    var content = require_content();
    var document2 = require_document();
    var flow = require_flow();
    var text = require_text();
    var combineExtensions = require_combine_extensions();
    var createTokenizer = require_create_tokenizer();
    var miniflat = require_miniflat();
    var constructs = require_constructs();
    function parse(options) {
      var settings = options || {};
      var parser = {
        defined: [],
        constructs: combineExtensions(
          [constructs].concat(miniflat(settings.extensions))
        ),
        content: create2(content),
        document: create2(document2),
        flow: create2(flow),
        string: create2(text.string),
        text: create2(text.text)
      };
      return parser;
      function create2(initializer) {
        return creator;
        function creator(from) {
          return createTokenizer(parser, initializer, from);
        }
      }
    }
    module2.exports = parse;
  }
});

// node_modules/micromark/dist/preprocess.js
var require_preprocess = __commonJS({
  "node_modules/micromark/dist/preprocess.js"(exports2, module2) {
    "use strict";
    var search = /[\0\t\n\r]/g;
    function preprocess() {
      var start = true;
      var column = 1;
      var buffer = "";
      var atCarriageReturn;
      return preprocessor;
      function preprocessor(value, encoding, end) {
        var chunks = [];
        var match3;
        var next;
        var startPosition;
        var endPosition;
        var code;
        value = buffer + value.toString(encoding);
        startPosition = 0;
        buffer = "";
        if (start) {
          if (value.charCodeAt(0) === 65279) {
            startPosition++;
          }
          start = void 0;
        }
        while (startPosition < value.length) {
          search.lastIndex = startPosition;
          match3 = search.exec(value);
          endPosition = match3 ? match3.index : value.length;
          code = value.charCodeAt(endPosition);
          if (!match3) {
            buffer = value.slice(startPosition);
            break;
          }
          if (code === 10 && startPosition === endPosition && atCarriageReturn) {
            chunks.push(-3);
            atCarriageReturn = void 0;
          } else {
            if (atCarriageReturn) {
              chunks.push(-5);
              atCarriageReturn = void 0;
            }
            if (startPosition < endPosition) {
              chunks.push(value.slice(startPosition, endPosition));
              column += endPosition - startPosition;
            }
            if (code === 0) {
              chunks.push(65533);
              column++;
            } else if (code === 9) {
              next = Math.ceil(column / 4) * 4;
              chunks.push(-2);
              while (column++ < next) chunks.push(-1);
            } else if (code === 10) {
              chunks.push(-4);
              column = 1;
            } else {
              atCarriageReturn = true;
              column = 1;
            }
          }
          startPosition = endPosition + 1;
        }
        if (end) {
          if (atCarriageReturn) chunks.push(-5);
          if (buffer) chunks.push(buffer);
          chunks.push(null);
        }
        return chunks;
      }
    }
    module2.exports = preprocess;
  }
});

// node_modules/micromark/dist/postprocess.js
var require_postprocess = __commonJS({
  "node_modules/micromark/dist/postprocess.js"(exports2, module2) {
    "use strict";
    var subtokenize = require_subtokenize();
    function postprocess(events) {
      while (!subtokenize(events)) {
      }
      return events;
    }
    module2.exports = postprocess;
  }
});

// node_modules/mdast-util-from-markdown/node_modules/parse-entities/decode-entity.browser.js
var require_decode_entity_browser2 = __commonJS({
  "node_modules/mdast-util-from-markdown/node_modules/parse-entities/decode-entity.browser.js"(exports2, module2) {
    "use strict";
    var el;
    var semicolon = 59;
    module2.exports = decodeEntity;
    function decodeEntity(characters) {
      var entity = "&" + characters + ";";
      var char;
      el = el || document.createElement("i");
      el.innerHTML = entity;
      char = el.textContent;
      if (char.charCodeAt(char.length - 1) === semicolon && characters !== "semi") {
        return false;
      }
      return char === entity ? false : char;
    }
  }
});

// node_modules/mdast-util-from-markdown/dist/index.js
var require_dist = __commonJS({
  "node_modules/mdast-util-from-markdown/dist/index.js"(exports2, module2) {
    "use strict";
    module2.exports = fromMarkdown;
    var toString = require_mdast_util_to_string();
    var assign = require_assign();
    var own = require_has_own_property();
    var normalizeIdentifier = require_normalize_identifier();
    var safeFromInt = require_safe_from_int();
    var parser = require_parse();
    var preprocessor = require_preprocess();
    var postprocess = require_postprocess();
    var decode = require_decode_entity_browser2();
    var stringifyPosition = require_unist_util_stringify_position();
    function fromMarkdown(value, encoding, options) {
      if (typeof encoding !== "string") {
        options = encoding;
        encoding = void 0;
      }
      return compiler(options)(
        postprocess(
          parser(options).document().write(preprocessor()(value, encoding, true))
        )
      );
    }
    function compiler(options) {
      var settings = options || {};
      var config = configure2(
        {
          transforms: [],
          canContainEols: [
            "emphasis",
            "fragment",
            "heading",
            "paragraph",
            "strong"
          ],
          enter: {
            autolink: opener(link),
            autolinkProtocol: onenterdata,
            autolinkEmail: onenterdata,
            atxHeading: opener(heading),
            blockQuote: opener(blockQuote),
            characterEscape: onenterdata,
            characterReference: onenterdata,
            codeFenced: opener(codeFlow),
            codeFencedFenceInfo: buffer,
            codeFencedFenceMeta: buffer,
            codeIndented: opener(codeFlow, buffer),
            codeText: opener(codeText, buffer),
            codeTextData: onenterdata,
            data: onenterdata,
            codeFlowValue: onenterdata,
            definition: opener(definition),
            definitionDestinationString: buffer,
            definitionLabelString: buffer,
            definitionTitleString: buffer,
            emphasis: opener(emphasis),
            hardBreakEscape: opener(hardBreak),
            hardBreakTrailing: opener(hardBreak),
            htmlFlow: opener(html, buffer),
            htmlFlowData: onenterdata,
            htmlText: opener(html, buffer),
            htmlTextData: onenterdata,
            image: opener(image),
            label: buffer,
            link: opener(link),
            listItem: opener(listItem),
            listItemValue: onenterlistitemvalue,
            listOrdered: opener(list, onenterlistordered),
            listUnordered: opener(list),
            paragraph: opener(paragraph),
            reference: onenterreference,
            referenceString: buffer,
            resourceDestinationString: buffer,
            resourceTitleString: buffer,
            setextHeading: opener(heading),
            strong: opener(strong),
            thematicBreak: opener(thematicBreak)
          },
          exit: {
            atxHeading: closer(),
            atxHeadingSequence: onexitatxheadingsequence,
            autolink: closer(),
            autolinkEmail: onexitautolinkemail,
            autolinkProtocol: onexitautolinkprotocol,
            blockQuote: closer(),
            characterEscapeValue: onexitdata,
            characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
            characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
            characterReferenceValue: onexitcharacterreferencevalue,
            codeFenced: closer(onexitcodefenced),
            codeFencedFence: onexitcodefencedfence,
            codeFencedFenceInfo: onexitcodefencedfenceinfo,
            codeFencedFenceMeta: onexitcodefencedfencemeta,
            codeFlowValue: onexitdata,
            codeIndented: closer(onexitcodeindented),
            codeText: closer(onexitcodetext),
            codeTextData: onexitdata,
            data: onexitdata,
            definition: closer(),
            definitionDestinationString: onexitdefinitiondestinationstring,
            definitionLabelString: onexitdefinitionlabelstring,
            definitionTitleString: onexitdefinitiontitlestring,
            emphasis: closer(),
            hardBreakEscape: closer(onexithardbreak),
            hardBreakTrailing: closer(onexithardbreak),
            htmlFlow: closer(onexithtmlflow),
            htmlFlowData: onexitdata,
            htmlText: closer(onexithtmltext),
            htmlTextData: onexitdata,
            image: closer(onexitimage),
            label: onexitlabel,
            labelText: onexitlabeltext,
            lineEnding: onexitlineending,
            link: closer(onexitlink),
            listItem: closer(),
            listOrdered: closer(),
            listUnordered: closer(),
            paragraph: closer(),
            referenceString: onexitreferencestring,
            resourceDestinationString: onexitresourcedestinationstring,
            resourceTitleString: onexitresourcetitlestring,
            resource: onexitresource,
            setextHeading: closer(onexitsetextheading),
            setextHeadingLineSequence: onexitsetextheadinglinesequence,
            setextHeadingText: onexitsetextheadingtext,
            strong: closer(),
            thematicBreak: closer()
          }
        },
        settings.mdastExtensions || []
      );
      var data = {};
      return compile;
      function compile(events) {
        var tree = { type: "root", children: [] };
        var stack = [tree];
        var tokenStack = [];
        var listStack = [];
        var index = -1;
        var handler;
        var listStart;
        var context = {
          stack,
          tokenStack,
          config,
          enter,
          exit,
          buffer,
          resume,
          setData,
          getData
        };
        while (++index < events.length) {
          if (events[index][1].type === "listOrdered" || events[index][1].type === "listUnordered") {
            if (events[index][0] === "enter") {
              listStack.push(index);
            } else {
              listStart = listStack.pop(index);
              index = prepareList(events, listStart, index);
            }
          }
        }
        index = -1;
        while (++index < events.length) {
          handler = config[events[index][0]];
          if (own.call(handler, events[index][1].type)) {
            handler[events[index][1].type].call(
              assign({ sliceSerialize: events[index][2].sliceSerialize }, context),
              events[index][1]
            );
          }
        }
        if (tokenStack.length) {
          throw new Error(
            "Cannot close document, a token (`" + tokenStack[tokenStack.length - 1].type + "`, " + stringifyPosition({
              start: tokenStack[tokenStack.length - 1].start,
              end: tokenStack[tokenStack.length - 1].end
            }) + ") is still open"
          );
        }
        tree.position = {
          start: point(
            events.length ? events[0][1].start : { line: 1, column: 1, offset: 0 }
          ),
          end: point(
            events.length ? events[events.length - 2][1].end : { line: 1, column: 1, offset: 0 }
          )
        };
        index = -1;
        while (++index < config.transforms.length) {
          tree = config.transforms[index](tree) || tree;
        }
        return tree;
      }
      function prepareList(events, start, length) {
        var index = start - 1;
        var containerBalance = -1;
        var listSpread = false;
        var listItem2;
        var tailIndex;
        var lineIndex;
        var tailEvent;
        var event;
        var firstBlankLineIndex;
        var atMarker;
        while (++index <= length) {
          event = events[index];
          if (event[1].type === "listUnordered" || event[1].type === "listOrdered" || event[1].type === "blockQuote") {
            if (event[0] === "enter") {
              containerBalance++;
            } else {
              containerBalance--;
            }
            atMarker = void 0;
          } else if (event[1].type === "lineEndingBlank") {
            if (event[0] === "enter") {
              if (listItem2 && !atMarker && !containerBalance && !firstBlankLineIndex) {
                firstBlankLineIndex = index;
              }
              atMarker = void 0;
            }
          } else if (event[1].type === "linePrefix" || event[1].type === "listItemValue" || event[1].type === "listItemMarker" || event[1].type === "listItemPrefix" || event[1].type === "listItemPrefixWhitespace") {
          } else {
            atMarker = void 0;
          }
          if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
            if (listItem2) {
              tailIndex = index;
              lineIndex = void 0;
              while (tailIndex--) {
                tailEvent = events[tailIndex];
                if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
                  if (tailEvent[0] === "exit") continue;
                  if (lineIndex) {
                    events[lineIndex][1].type = "lineEndingBlank";
                    listSpread = true;
                  }
                  tailEvent[1].type = "lineEnding";
                  lineIndex = tailIndex;
                } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {
                } else {
                  break;
                }
              }
              if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
                listItem2._spread = true;
              }
              listItem2.end = point(
                lineIndex ? events[lineIndex][1].start : event[1].end
              );
              events.splice(lineIndex || index, 0, ["exit", listItem2, event[2]]);
              index++;
              length++;
            }
            if (event[1].type === "listItemPrefix") {
              listItem2 = {
                type: "listItem",
                _spread: false,
                start: point(event[1].start)
              };
              events.splice(index, 0, ["enter", listItem2, event[2]]);
              index++;
              length++;
              firstBlankLineIndex = void 0;
              atMarker = true;
            }
          }
        }
        events[start][1]._spread = listSpread;
        return length;
      }
      function setData(key, value) {
        data[key] = value;
      }
      function getData(key) {
        return data[key];
      }
      function point(d) {
        return { line: d.line, column: d.column, offset: d.offset };
      }
      function opener(create2, and) {
        return open;
        function open(token2) {
          enter.call(this, create2(token2), token2);
          if (and) and.call(this, token2);
        }
      }
      function buffer() {
        this.stack.push({ type: "fragment", children: [] });
      }
      function enter(node, token2) {
        this.stack[this.stack.length - 1].children.push(node);
        this.stack.push(node);
        this.tokenStack.push(token2);
        node.position = { start: point(token2.start) };
        return node;
      }
      function closer(and) {
        return close;
        function close(token2) {
          if (and) and.call(this, token2);
          exit.call(this, token2);
        }
      }
      function exit(token2) {
        var node = this.stack.pop();
        var open = this.tokenStack.pop();
        if (!open) {
          throw new Error(
            "Cannot close `" + token2.type + "` (" + stringifyPosition({ start: token2.start, end: token2.end }) + "): it’s not open"
          );
        } else if (open.type !== token2.type) {
          throw new Error(
            "Cannot close `" + token2.type + "` (" + stringifyPosition({ start: token2.start, end: token2.end }) + "): a different token (`" + open.type + "`, " + stringifyPosition({ start: open.start, end: open.end }) + ") is open"
          );
        }
        node.position.end = point(token2.end);
        return node;
      }
      function resume() {
        return toString(this.stack.pop());
      }
      function onenterlistordered() {
        setData("expectingFirstListItemValue", true);
      }
      function onenterlistitemvalue(token2) {
        if (getData("expectingFirstListItemValue")) {
          this.stack[this.stack.length - 2].start = parseInt(
            this.sliceSerialize(token2),
            10
          );
          setData("expectingFirstListItemValue");
        }
      }
      function onexitcodefencedfenceinfo() {
        var data2 = this.resume();
        this.stack[this.stack.length - 1].lang = data2;
      }
      function onexitcodefencedfencemeta() {
        var data2 = this.resume();
        this.stack[this.stack.length - 1].meta = data2;
      }
      function onexitcodefencedfence() {
        if (getData("flowCodeInside")) return;
        this.buffer();
        setData("flowCodeInside", true);
      }
      function onexitcodefenced() {
        var data2 = this.resume();
        this.stack[this.stack.length - 1].value = data2.replace(
          /^(\r?\n|\r)|(\r?\n|\r)$/g,
          ""
        );
        setData("flowCodeInside");
      }
      function onexitcodeindented() {
        var data2 = this.resume();
        this.stack[this.stack.length - 1].value = data2;
      }
      function onexitdefinitionlabelstring(token2) {
        var label = this.resume();
        this.stack[this.stack.length - 1].label = label;
        this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
          this.sliceSerialize(token2)
        ).toLowerCase();
      }
      function onexitdefinitiontitlestring() {
        var data2 = this.resume();
        this.stack[this.stack.length - 1].title = data2;
      }
      function onexitdefinitiondestinationstring() {
        var data2 = this.resume();
        this.stack[this.stack.length - 1].url = data2;
      }
      function onexitatxheadingsequence(token2) {
        if (!this.stack[this.stack.length - 1].depth) {
          this.stack[this.stack.length - 1].depth = this.sliceSerialize(
            token2
          ).length;
        }
      }
      function onexitsetextheadingtext() {
        setData("setextHeadingSlurpLineEnding", true);
      }
      function onexitsetextheadinglinesequence(token2) {
        this.stack[this.stack.length - 1].depth = this.sliceSerialize(token2).charCodeAt(0) === 61 ? 1 : 2;
      }
      function onexitsetextheading() {
        setData("setextHeadingSlurpLineEnding");
      }
      function onenterdata(token2) {
        var siblings = this.stack[this.stack.length - 1].children;
        var tail = siblings[siblings.length - 1];
        if (!tail || tail.type !== "text") {
          tail = text();
          tail.position = { start: point(token2.start) };
          this.stack[this.stack.length - 1].children.push(tail);
        }
        this.stack.push(tail);
      }
      function onexitdata(token2) {
        var tail = this.stack.pop();
        tail.value += this.sliceSerialize(token2);
        tail.position.end = point(token2.end);
      }
      function onexitlineending(token2) {
        var context = this.stack[this.stack.length - 1];
        if (getData("atHardBreak")) {
          context.children[context.children.length - 1].position.end = point(
            token2.end
          );
          setData("atHardBreak");
          return;
        }
        if (!getData("setextHeadingSlurpLineEnding") && config.canContainEols.indexOf(context.type) > -1) {
          onenterdata.call(this, token2);
          onexitdata.call(this, token2);
        }
      }
      function onexithardbreak() {
        setData("atHardBreak", true);
      }
      function onexithtmlflow() {
        var data2 = this.resume();
        this.stack[this.stack.length - 1].value = data2;
      }
      function onexithtmltext() {
        var data2 = this.resume();
        this.stack[this.stack.length - 1].value = data2;
      }
      function onexitcodetext() {
        var data2 = this.resume();
        this.stack[this.stack.length - 1].value = data2;
      }
      function onexitlink() {
        var context = this.stack[this.stack.length - 1];
        if (getData("inReference")) {
          context.type += "Reference";
          context.referenceType = getData("referenceType") || "shortcut";
          delete context.url;
          delete context.title;
        } else {
          delete context.identifier;
          delete context.label;
          delete context.referenceType;
        }
        setData("referenceType");
      }
      function onexitimage() {
        var context = this.stack[this.stack.length - 1];
        if (getData("inReference")) {
          context.type += "Reference";
          context.referenceType = getData("referenceType") || "shortcut";
          delete context.url;
          delete context.title;
        } else {
          delete context.identifier;
          delete context.label;
          delete context.referenceType;
        }
        setData("referenceType");
      }
      function onexitlabeltext(token2) {
        this.stack[this.stack.length - 2].identifier = normalizeIdentifier(
          this.sliceSerialize(token2)
        ).toLowerCase();
      }
      function onexitlabel() {
        var fragment = this.stack[this.stack.length - 1];
        var value = this.resume();
        this.stack[this.stack.length - 1].label = value;
        setData("inReference", true);
        if (this.stack[this.stack.length - 1].type === "link") {
          this.stack[this.stack.length - 1].children = fragment.children;
        } else {
          this.stack[this.stack.length - 1].alt = value;
        }
      }
      function onexitresourcedestinationstring() {
        var data2 = this.resume();
        this.stack[this.stack.length - 1].url = data2;
      }
      function onexitresourcetitlestring() {
        var data2 = this.resume();
        this.stack[this.stack.length - 1].title = data2;
      }
      function onexitresource() {
        setData("inReference");
      }
      function onenterreference() {
        setData("referenceType", "collapsed");
      }
      function onexitreferencestring(token2) {
        var label = this.resume();
        this.stack[this.stack.length - 1].label = label;
        this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
          this.sliceSerialize(token2)
        ).toLowerCase();
        setData("referenceType", "full");
      }
      function onexitcharacterreferencemarker(token2) {
        setData("characterReferenceType", token2.type);
      }
      function onexitcharacterreferencevalue(token2) {
        var data2 = this.sliceSerialize(token2);
        var type = getData("characterReferenceType");
        var value;
        var tail;
        if (type) {
          value = safeFromInt(
            data2,
            type === "characterReferenceMarkerNumeric" ? 10 : 16
          );
          setData("characterReferenceType");
        } else {
          value = decode(data2);
        }
        tail = this.stack.pop();
        tail.value += value;
        tail.position.end = point(token2.end);
      }
      function onexitautolinkprotocol(token2) {
        onexitdata.call(this, token2);
        this.stack[this.stack.length - 1].url = this.sliceSerialize(token2);
      }
      function onexitautolinkemail(token2) {
        onexitdata.call(this, token2);
        this.stack[this.stack.length - 1].url = "mailto:" + this.sliceSerialize(token2);
      }
      function blockQuote() {
        return { type: "blockquote", children: [] };
      }
      function codeFlow() {
        return { type: "code", lang: null, meta: null, value: "" };
      }
      function codeText() {
        return { type: "inlineCode", value: "" };
      }
      function definition() {
        return {
          type: "definition",
          identifier: "",
          label: null,
          title: null,
          url: ""
        };
      }
      function emphasis() {
        return { type: "emphasis", children: [] };
      }
      function heading() {
        return { type: "heading", depth: void 0, children: [] };
      }
      function hardBreak() {
        return { type: "break" };
      }
      function html() {
        return { type: "html", value: "" };
      }
      function image() {
        return { type: "image", title: null, url: "", alt: null };
      }
      function link() {
        return { type: "link", title: null, url: "", children: [] };
      }
      function list(token2) {
        return {
          type: "list",
          ordered: token2.type === "listOrdered",
          start: null,
          spread: token2._spread,
          children: []
        };
      }
      function listItem(token2) {
        return {
          type: "listItem",
          spread: token2._spread,
          checked: null,
          children: []
        };
      }
      function paragraph() {
        return { type: "paragraph", children: [] };
      }
      function strong() {
        return { type: "strong", children: [] };
      }
      function text() {
        return { type: "text", value: "" };
      }
      function thematicBreak() {
        return { type: "thematicBreak" };
      }
    }
    function configure2(config, extensions) {
      var index = -1;
      while (++index < extensions.length) {
        extension(config, extensions[index]);
      }
      return config;
    }
    function extension(config, extension2) {
      var key;
      var left;
      for (key in extension2) {
        left = own.call(config, key) ? config[key] : config[key] = {};
        if (key === "canContainEols" || key === "transforms") {
          config[key] = [].concat(left, extension2[key]);
        } else {
          Object.assign(left, extension2[key]);
        }
      }
    }
  }
});

// node_modules/mdast-util-from-markdown/index.js
var require_mdast_util_from_markdown = __commonJS({
  "node_modules/mdast-util-from-markdown/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_dist();
  }
});

// node_modules/remark-parse/index.js
var require_remark_parse = __commonJS({
  "node_modules/remark-parse/index.js"(exports2, module2) {
    "use strict";
    module2.exports = parse;
    var fromMarkdown = require_mdast_util_from_markdown();
    function parse(options) {
      var self2 = this;
      this.Parser = parse2;
      function parse2(doc) {
        return fromMarkdown(
          doc,
          Object.assign({}, self2.data("settings"), options, {
            // Note: these options are not in the readme.
            // The goal is for them to be set by plugins on `data` instead of being
            // passed by users.
            extensions: self2.data("micromarkExtensions") || [],
            mdastExtensions: self2.data("fromMarkdownExtensions") || []
          })
        );
      }
    }
  }
});

// node_modules/unist-builder/index.js
var require_unist_builder = __commonJS({
  "node_modules/unist-builder/index.js"(exports2, module2) {
    "use strict";
    module2.exports = u;
    function u(type, props, value) {
      var node;
      if ((value === null || value === void 0) && (typeof props !== "object" || Array.isArray(props))) {
        value = props;
        props = {};
      }
      node = Object.assign({ type: String(type) }, props);
      if (Array.isArray(value)) {
        node.children = value;
      } else if (value !== null && value !== void 0) {
        node.value = String(value);
      }
      return node;
    }
  }
});

// node_modules/unist-util-is/convert.js
var require_convert = __commonJS({
  "node_modules/unist-util-is/convert.js"(exports2, module2) {
    "use strict";
    module2.exports = convert;
    function convert(test) {
      if (test == null) {
        return ok;
      }
      if (typeof test === "string") {
        return typeFactory(test);
      }
      if (typeof test === "object") {
        return "length" in test ? anyFactory(test) : allFactory(test);
      }
      if (typeof test === "function") {
        return test;
      }
      throw new Error("Expected function, string, or object as test");
    }
    function allFactory(test) {
      return all;
      function all(node) {
        var key;
        for (key in test) {
          if (node[key] !== test[key]) return false;
        }
        return true;
      }
    }
    function anyFactory(tests) {
      var checks = [];
      var index = -1;
      while (++index < tests.length) {
        checks[index] = convert(tests[index]);
      }
      return any;
      function any() {
        var index2 = -1;
        while (++index2 < checks.length) {
          if (checks[index2].apply(this, arguments)) {
            return true;
          }
        }
        return false;
      }
    }
    function typeFactory(test) {
      return type;
      function type(node) {
        return Boolean(node && node.type === test);
      }
    }
    function ok() {
      return true;
    }
  }
});

// node_modules/unist-util-visit-parents/color.browser.js
var require_color_browser = __commonJS({
  "node_modules/unist-util-visit-parents/color.browser.js"(exports2, module2) {
    module2.exports = identity;
    function identity(d) {
      return d;
    }
  }
});

// node_modules/unist-util-visit-parents/index.js
var require_unist_util_visit_parents = __commonJS({
  "node_modules/unist-util-visit-parents/index.js"(exports2, module2) {
    "use strict";
    module2.exports = visitParents;
    var convert = require_convert();
    var color = require_color_browser();
    var CONTINUE = true;
    var SKIP = "skip";
    var EXIT = false;
    visitParents.CONTINUE = CONTINUE;
    visitParents.SKIP = SKIP;
    visitParents.EXIT = EXIT;
    function visitParents(tree, test, visitor, reverse) {
      var step;
      var is2;
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      is2 = convert(test);
      step = reverse ? -1 : 1;
      factory(tree, null, [])();
      function factory(node, index, parents) {
        var value = typeof node === "object" && node !== null ? node : {};
        var name;
        if (typeof value.type === "string") {
          name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
          visit.displayName = "node (" + color(value.type + (name ? "<" + name + ">" : "")) + ")";
        }
        return visit;
        function visit() {
          var grandparents = parents.concat(node);
          var result = [];
          var subresult;
          var offset;
          if (!test || is2(node, index, parents[parents.length - 1] || null)) {
            result = toResult(visitor(node, parents));
            if (result[0] === EXIT) {
              return result;
            }
          }
          if (node.children && result[0] !== SKIP) {
            offset = (reverse ? node.children.length : -1) + step;
            while (offset > -1 && offset < node.children.length) {
              subresult = factory(node.children[offset], offset, grandparents)();
              if (subresult[0] === EXIT) {
                return subresult;
              }
              offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
            }
          }
          return result;
        }
      }
    }
    function toResult(value) {
      if (value !== null && typeof value === "object" && "length" in value) {
        return value;
      }
      if (typeof value === "number") {
        return [CONTINUE, value];
      }
      return [value];
    }
  }
});

// node_modules/mdast-util-to-hast/node_modules/unist-util-visit/index.js
var require_unist_util_visit = __commonJS({
  "node_modules/mdast-util-to-hast/node_modules/unist-util-visit/index.js"(exports2, module2) {
    "use strict";
    module2.exports = visit;
    var visitParents = require_unist_util_visit_parents();
    var CONTINUE = visitParents.CONTINUE;
    var SKIP = visitParents.SKIP;
    var EXIT = visitParents.EXIT;
    visit.CONTINUE = CONTINUE;
    visit.SKIP = SKIP;
    visit.EXIT = EXIT;
    function visit(tree, test, visitor, reverse) {
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      visitParents(tree, test, overload, reverse);
      function overload(node, parents) {
        var parent = parents[parents.length - 1];
        var index = parent ? parent.children.indexOf(node) : null;
        return visitor(node, index, parent);
      }
    }
  }
});

// node_modules/mdast-util-to-hast/node_modules/unist-util-position/index.js
var require_unist_util_position = __commonJS({
  "node_modules/mdast-util-to-hast/node_modules/unist-util-position/index.js"(exports2, module2) {
    "use strict";
    var start = factory("start");
    var end = factory("end");
    module2.exports = position;
    position.start = start;
    position.end = end;
    function position(node) {
      return { start: start(node), end: end(node) };
    }
    function factory(type) {
      point.displayName = type;
      return point;
      function point(node) {
        var point2 = node && node.position && node.position[type] || {};
        return {
          line: point2.line || null,
          column: point2.column || null,
          offset: isNaN(point2.offset) ? null : point2.offset
        };
      }
    }
  }
});

// node_modules/unist-util-generated/index.js
var require_unist_util_generated = __commonJS({
  "node_modules/unist-util-generated/index.js"(exports2, module2) {
    "use strict";
    module2.exports = generated;
    function generated(node) {
      return !node || !node.position || !node.position.start || !node.position.start.line || !node.position.start.column || !node.position.end || !node.position.end.line || !node.position.end.column;
    }
  }
});

// node_modules/mdast-util-definitions/node_modules/unist-util-visit/index.js
var require_unist_util_visit2 = __commonJS({
  "node_modules/mdast-util-definitions/node_modules/unist-util-visit/index.js"(exports2, module2) {
    "use strict";
    module2.exports = visit;
    var visitParents = require_unist_util_visit_parents();
    var CONTINUE = visitParents.CONTINUE;
    var SKIP = visitParents.SKIP;
    var EXIT = visitParents.EXIT;
    visit.CONTINUE = CONTINUE;
    visit.SKIP = SKIP;
    visit.EXIT = EXIT;
    function visit(tree, test, visitor, reverse) {
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      visitParents(tree, test, overload, reverse);
      function overload(node, parents) {
        var parent = parents[parents.length - 1];
        var index = parent ? parent.children.indexOf(node) : null;
        return visitor(node, index, parent);
      }
    }
  }
});

// node_modules/mdast-util-definitions/index.js
var require_mdast_util_definitions = __commonJS({
  "node_modules/mdast-util-definitions/index.js"(exports2, module2) {
    "use strict";
    var visit = require_unist_util_visit2();
    module2.exports = getDefinitionFactory;
    var own = {}.hasOwnProperty;
    function getDefinitionFactory(node, options) {
      return getterFactory(gather(node, options));
    }
    function gather(node) {
      var cache2 = {};
      if (!node || !node.type) {
        throw new Error("mdast-util-definitions expected node");
      }
      visit(node, "definition", ondefinition);
      return cache2;
      function ondefinition(definition) {
        var id = normalise(definition.identifier);
        if (!own.call(cache2, id)) {
          cache2[id] = definition;
        }
      }
    }
    function getterFactory(cache2) {
      return getter;
      function getter(identifier) {
        var id = identifier && normalise(identifier);
        return id && own.call(cache2, id) ? cache2[id] : null;
      }
    }
    function normalise(identifier) {
      return identifier.toUpperCase();
    }
  }
});

// node_modules/mdast-util-to-hast/lib/all.js
var require_all = __commonJS({
  "node_modules/mdast-util-to-hast/lib/all.js"(exports2, module2) {
    "use strict";
    module2.exports = all;
    var one = require_one();
    function all(h, parent) {
      var nodes = parent.children || [];
      var length = nodes.length;
      var values = [];
      var index = -1;
      var result;
      var head;
      while (++index < length) {
        result = one(h, nodes[index], parent);
        if (result) {
          if (index && nodes[index - 1].type === "break") {
            if (result.value) {
              result.value = result.value.replace(/^\s+/, "");
            }
            head = result.children && result.children[0];
            if (head && head.value) {
              head.value = head.value.replace(/^\s+/, "");
            }
          }
          values = values.concat(result);
        }
      }
      return values;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/one.js
var require_one = __commonJS({
  "node_modules/mdast-util-to-hast/lib/one.js"(exports2, module2) {
    "use strict";
    module2.exports = one;
    var u = require_unist_builder();
    var all = require_all();
    var own = {}.hasOwnProperty;
    function unknown(h, node) {
      if (text(node)) {
        return h.augment(node, u("text", node.value));
      }
      return h(node, "div", all(h, node));
    }
    function one(h, node, parent) {
      var type = node && node.type;
      var fn;
      if (!type) {
        throw new Error("Expected node, got `" + node + "`");
      }
      if (own.call(h.handlers, type)) {
        fn = h.handlers[type];
      } else if (h.passThrough && h.passThrough.indexOf(type) > -1) {
        fn = returnNode;
      } else {
        fn = h.unknownHandler;
      }
      return (typeof fn === "function" ? fn : unknown)(h, node, parent);
    }
    function text(node) {
      var data = node.data || {};
      if (own.call(data, "hName") || own.call(data, "hProperties") || own.call(data, "hChildren")) {
        return false;
      }
      return "value" in node;
    }
    function returnNode(h, node) {
      var clone;
      if (node.children) {
        clone = Object.assign({}, node);
        clone.children = all(h, node);
        return clone;
      }
      return node;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
var require_thematic_break2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js"(exports2, module2) {
    "use strict";
    module2.exports = thematicBreak;
    function thematicBreak(h, node) {
      return h(node, "hr");
    }
  }
});

// node_modules/mdast-util-to-hast/lib/wrap.js
var require_wrap2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/wrap.js"(exports2, module2) {
    "use strict";
    module2.exports = wrap;
    var u = require_unist_builder();
    function wrap(nodes, loose) {
      var result = [];
      var index = -1;
      var length = nodes.length;
      if (loose) {
        result.push(u("text", "\n"));
      }
      while (++index < length) {
        if (index) {
          result.push(u("text", "\n"));
        }
        result.push(nodes[index]);
      }
      if (loose && nodes.length > 0) {
        result.push(u("text", "\n"));
      }
      return result;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/list.js
var require_list2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/list.js"(exports2, module2) {
    "use strict";
    module2.exports = list;
    var wrap = require_wrap2();
    var all = require_all();
    function list(h, node) {
      var props = {};
      var name = node.ordered ? "ol" : "ul";
      var items;
      var index = -1;
      var length;
      if (typeof node.start === "number" && node.start !== 1) {
        props.start = node.start;
      }
      items = all(h, node);
      length = items.length;
      while (++index < length) {
        if (items[index].properties.className && items[index].properties.className.indexOf("task-list-item") !== -1) {
          props.className = ["contains-task-list"];
          break;
        }
      }
      return h(node, name, props, wrap(items, true));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/footer.js
var require_footer = __commonJS({
  "node_modules/mdast-util-to-hast/lib/footer.js"(exports2, module2) {
    "use strict";
    module2.exports = generateFootnotes;
    var thematicBreak = require_thematic_break2();
    var list = require_list2();
    var wrap = require_wrap2();
    function generateFootnotes(h) {
      var footnoteById = h.footnoteById;
      var footnoteOrder = h.footnoteOrder;
      var length = footnoteOrder.length;
      var index = -1;
      var listItems = [];
      var def;
      var backReference;
      var content;
      var tail;
      while (++index < length) {
        def = footnoteById[footnoteOrder[index].toUpperCase()];
        if (!def) {
          continue;
        }
        content = def.children.concat();
        tail = content[content.length - 1];
        backReference = {
          type: "link",
          url: "#fnref-" + def.identifier,
          data: { hProperties: { className: ["footnote-backref"] } },
          children: [{ type: "text", value: "↩" }]
        };
        if (!tail || tail.type !== "paragraph") {
          tail = { type: "paragraph", children: [] };
          content.push(tail);
        }
        tail.children.push(backReference);
        listItems.push({
          type: "listItem",
          data: { hProperties: { id: "fn-" + def.identifier } },
          children: content,
          position: def.position
        });
      }
      if (listItems.length === 0) {
        return null;
      }
      return h(
        null,
        "div",
        { className: ["footnotes"] },
        wrap(
          [
            thematicBreak(h),
            list(h, { type: "list", ordered: true, children: listItems })
          ],
          true
        )
      );
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
var require_blockquote = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/blockquote.js"(exports2, module2) {
    "use strict";
    module2.exports = blockquote;
    var wrap = require_wrap2();
    var all = require_all();
    function blockquote(h, node) {
      return h(node, "blockquote", wrap(all(h, node), true));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/break.js
var require_break = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/break.js"(exports2, module2) {
    "use strict";
    module2.exports = hardBreak;
    var u = require_unist_builder();
    function hardBreak(h, node) {
      return [h(node, "br"), u("text", "\n")];
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/code.js
var require_code = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/code.js"(exports2, module2) {
    "use strict";
    module2.exports = code;
    var u = require_unist_builder();
    function code(h, node) {
      var value = node.value ? node.value + "\n" : "";
      var lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
      var props = {};
      var code2;
      if (lang) {
        props.className = ["language-" + lang];
      }
      code2 = h(node, "code", props, [u("text", value)]);
      if (node.meta) {
        code2.data = { meta: node.meta };
      }
      return h(node.position, "pre", [code2]);
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/delete.js
var require_delete = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/delete.js"(exports2, module2) {
    "use strict";
    module2.exports = strikethrough;
    var all = require_all();
    function strikethrough(h, node) {
      return h(node, "del", all(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
var require_emphasis = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/emphasis.js"(exports2, module2) {
    "use strict";
    module2.exports = emphasis;
    var all = require_all();
    function emphasis(h, node) {
      return h(node, "em", all(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
var require_footnote_reference = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js"(exports2, module2) {
    "use strict";
    module2.exports = footnoteReference;
    var u = require_unist_builder();
    function footnoteReference(h, node) {
      var footnoteOrder = h.footnoteOrder;
      var identifier = String(node.identifier);
      if (footnoteOrder.indexOf(identifier) === -1) {
        footnoteOrder.push(identifier);
      }
      return h(node.position, "sup", { id: "fnref-" + identifier }, [
        h(node, "a", { href: "#fn-" + identifier, className: ["footnote-ref"] }, [
          u("text", node.label || identifier)
        ])
      ]);
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/footnote.js
var require_footnote = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/footnote.js"(exports2, module2) {
    "use strict";
    module2.exports = footnote;
    var footnoteReference = require_footnote_reference();
    function footnote(h, node) {
      var footnoteById = h.footnoteById;
      var footnoteOrder = h.footnoteOrder;
      var identifier = 1;
      while (identifier in footnoteById) {
        identifier++;
      }
      identifier = String(identifier);
      footnoteOrder.push(identifier);
      footnoteById[identifier] = {
        type: "footnoteDefinition",
        identifier,
        children: [{ type: "paragraph", children: node.children }],
        position: node.position
      };
      return footnoteReference(h, {
        type: "footnoteReference",
        identifier,
        position: node.position
      });
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/heading.js
var require_heading = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/heading.js"(exports2, module2) {
    "use strict";
    module2.exports = heading;
    var all = require_all();
    function heading(h, node) {
      return h(node, "h" + node.depth, all(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/html.js
var require_html = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/html.js"(exports2, module2) {
    "use strict";
    module2.exports = html;
    var u = require_unist_builder();
    function html(h, node) {
      return h.dangerous ? h.augment(node, u("raw", node.value)) : null;
    }
  }
});

// node_modules/mdurl/encode.js
var require_encode = __commonJS({
  "node_modules/mdurl/encode.js"(exports2, module2) {
    "use strict";
    var encodeCache = {};
    function getEncodeCache(exclude) {
      var i, ch, cache2 = encodeCache[exclude];
      if (cache2) {
        return cache2;
      }
      cache2 = encodeCache[exclude] = [];
      for (i = 0; i < 128; i++) {
        ch = String.fromCharCode(i);
        if (/^[0-9a-z]$/i.test(ch)) {
          cache2.push(ch);
        } else {
          cache2.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
        }
      }
      for (i = 0; i < exclude.length; i++) {
        cache2[exclude.charCodeAt(i)] = exclude[i];
      }
      return cache2;
    }
    function encode(string, exclude, keepEscaped) {
      var i, l, code, nextCode, cache2, result = "";
      if (typeof exclude !== "string") {
        keepEscaped = exclude;
        exclude = encode.defaultChars;
      }
      if (typeof keepEscaped === "undefined") {
        keepEscaped = true;
      }
      cache2 = getEncodeCache(exclude);
      for (i = 0, l = string.length; i < l; i++) {
        code = string.charCodeAt(i);
        if (keepEscaped && code === 37 && i + 2 < l) {
          if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
            result += string.slice(i, i + 3);
            i += 2;
            continue;
          }
        }
        if (code < 128) {
          result += cache2[code];
          continue;
        }
        if (code >= 55296 && code <= 57343) {
          if (code >= 55296 && code <= 56319 && i + 1 < l) {
            nextCode = string.charCodeAt(i + 1);
            if (nextCode >= 56320 && nextCode <= 57343) {
              result += encodeURIComponent(string[i] + string[i + 1]);
              i++;
              continue;
            }
          }
          result += "%EF%BF%BD";
          continue;
        }
        result += encodeURIComponent(string[i]);
      }
      return result;
    }
    encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
    encode.componentChars = "-_.!~*'()";
    module2.exports = encode;
  }
});

// node_modules/mdast-util-to-hast/lib/revert.js
var require_revert = __commonJS({
  "node_modules/mdast-util-to-hast/lib/revert.js"(exports2, module2) {
    "use strict";
    module2.exports = revert;
    var u = require_unist_builder();
    var all = require_all();
    function revert(h, node) {
      var subtype = node.referenceType;
      var suffix = "]";
      var contents;
      var head;
      var tail;
      if (subtype === "collapsed") {
        suffix += "[]";
      } else if (subtype === "full") {
        suffix += "[" + (node.label || node.identifier) + "]";
      }
      if (node.type === "imageReference") {
        return u("text", "![" + node.alt + suffix);
      }
      contents = all(h, node);
      head = contents[0];
      if (head && head.type === "text") {
        head.value = "[" + head.value;
      } else {
        contents.unshift(u("text", "["));
      }
      tail = contents[contents.length - 1];
      if (tail && tail.type === "text") {
        tail.value += suffix;
      } else {
        contents.push(u("text", suffix));
      }
      return contents;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
var require_image_reference = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/image-reference.js"(exports2, module2) {
    "use strict";
    module2.exports = imageReference;
    var normalize2 = require_encode();
    var revert = require_revert();
    function imageReference(h, node) {
      var def = h.definition(node.identifier);
      var props;
      if (!def) {
        return revert(h, node);
      }
      props = { src: normalize2(def.url || ""), alt: node.alt };
      if (def.title !== null && def.title !== void 0) {
        props.title = def.title;
      }
      return h(node, "img", props);
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/image.js
var require_image = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/image.js"(exports2, module2) {
    "use strict";
    var normalize2 = require_encode();
    module2.exports = image;
    function image(h, node) {
      var props = { src: normalize2(node.url), alt: node.alt };
      if (node.title !== null && node.title !== void 0) {
        props.title = node.title;
      }
      return h(node, "img", props);
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
var require_inline_code = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/inline-code.js"(exports2, module2) {
    "use strict";
    module2.exports = inlineCode;
    var u = require_unist_builder();
    function inlineCode(h, node) {
      var value = node.value.replace(/\r?\n|\r/g, " ");
      return h(node, "code", [u("text", value)]);
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
var require_link_reference = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/link-reference.js"(exports2, module2) {
    "use strict";
    module2.exports = linkReference;
    var normalize2 = require_encode();
    var revert = require_revert();
    var all = require_all();
    function linkReference(h, node) {
      var def = h.definition(node.identifier);
      var props;
      if (!def) {
        return revert(h, node);
      }
      props = { href: normalize2(def.url || "") };
      if (def.title !== null && def.title !== void 0) {
        props.title = def.title;
      }
      return h(node, "a", props, all(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/link.js
var require_link = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/link.js"(exports2, module2) {
    "use strict";
    var normalize2 = require_encode();
    var all = require_all();
    module2.exports = link;
    function link(h, node) {
      var props = { href: normalize2(node.url) };
      if (node.title !== null && node.title !== void 0) {
        props.title = node.title;
      }
      return h(node, "a", props, all(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/list-item.js
var require_list_item = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/list-item.js"(exports2, module2) {
    "use strict";
    module2.exports = listItem;
    var u = require_unist_builder();
    var all = require_all();
    function listItem(h, node, parent) {
      var result = all(h, node);
      var head = result[0];
      var loose = parent ? listLoose(parent) : listItemLoose(node);
      var props = {};
      var wrapped = [];
      var length;
      var index;
      var child;
      if (typeof node.checked === "boolean") {
        if (!head || head.tagName !== "p") {
          head = h(null, "p", []);
          result.unshift(head);
        }
        if (head.children.length > 0) {
          head.children.unshift(u("text", " "));
        }
        head.children.unshift(
          h(null, "input", {
            type: "checkbox",
            checked: node.checked,
            disabled: true
          })
        );
        props.className = ["task-list-item"];
      }
      length = result.length;
      index = -1;
      while (++index < length) {
        child = result[index];
        if (loose || index !== 0 || child.tagName !== "p") {
          wrapped.push(u("text", "\n"));
        }
        if (child.tagName === "p" && !loose) {
          wrapped = wrapped.concat(child.children);
        } else {
          wrapped.push(child);
        }
      }
      if (length && (loose || child.tagName !== "p")) {
        wrapped.push(u("text", "\n"));
      }
      return h(node, "li", props, wrapped);
    }
    function listLoose(node) {
      var loose = node.spread;
      var children = node.children;
      var length = children.length;
      var index = -1;
      while (!loose && ++index < length) {
        loose = listItemLoose(children[index]);
      }
      return loose;
    }
    function listItemLoose(node) {
      var spread = node.spread;
      return spread === void 0 || spread === null ? node.children.length > 1 : spread;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
var require_paragraph = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/paragraph.js"(exports2, module2) {
    "use strict";
    module2.exports = paragraph;
    var all = require_all();
    function paragraph(h, node) {
      return h(node, "p", all(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/root.js
var require_root = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/root.js"(exports2, module2) {
    "use strict";
    module2.exports = root;
    var u = require_unist_builder();
    var wrap = require_wrap2();
    var all = require_all();
    function root(h, node) {
      return h.augment(node, u("root", wrap(all(h, node))));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/strong.js
var require_strong = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/strong.js"(exports2, module2) {
    "use strict";
    module2.exports = strong;
    var all = require_all();
    function strong(h, node) {
      return h(node, "strong", all(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/table.js
var require_table = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/table.js"(exports2, module2) {
    "use strict";
    module2.exports = table2;
    var position = require_unist_util_position();
    var wrap = require_wrap2();
    var all = require_all();
    function table2(h, node) {
      var rows = node.children;
      var index = rows.length;
      var align = node.align || [];
      var alignLength = align.length;
      var result = [];
      var pos;
      var row;
      var out;
      var name;
      var cell;
      while (index--) {
        row = rows[index].children;
        name = index === 0 ? "th" : "td";
        pos = alignLength || row.length;
        out = [];
        while (pos--) {
          cell = row[pos];
          out[pos] = h(cell, name, { align: align[pos] }, cell ? all(h, cell) : []);
        }
        result[index] = h(rows[index], "tr", wrap(out, true));
      }
      return h(
        node,
        "table",
        wrap(
          [h(result[0].position, "thead", wrap([result[0]], true))].concat(
            result[1] ? h(
              {
                start: position.start(result[1]),
                end: position.end(result[result.length - 1])
              },
              "tbody",
              wrap(result.slice(1), true)
            ) : []
          ),
          true
        )
      );
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/text.js
var require_text2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/text.js"(exports2, module2) {
    "use strict";
    module2.exports = text;
    var u = require_unist_builder();
    function text(h, node) {
      return h.augment(
        node,
        u("text", String(node.value).replace(/[ \t]*(\r?\n|\r)[ \t]*/g, "$1"))
      );
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/index.js
var require_handlers = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      blockquote: require_blockquote(),
      break: require_break(),
      code: require_code(),
      delete: require_delete(),
      emphasis: require_emphasis(),
      footnoteReference: require_footnote_reference(),
      footnote: require_footnote(),
      heading: require_heading(),
      html: require_html(),
      imageReference: require_image_reference(),
      image: require_image(),
      inlineCode: require_inline_code(),
      linkReference: require_link_reference(),
      link: require_link(),
      listItem: require_list_item(),
      list: require_list2(),
      paragraph: require_paragraph(),
      root: require_root(),
      strong: require_strong(),
      table: require_table(),
      text: require_text2(),
      thematicBreak: require_thematic_break2(),
      toml: ignore,
      yaml: ignore,
      definition: ignore,
      footnoteDefinition: ignore
    };
    function ignore() {
      return null;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/index.js"(exports2, module2) {
    "use strict";
    module2.exports = toHast;
    var u = require_unist_builder();
    var visit = require_unist_util_visit();
    var position = require_unist_util_position();
    var generated = require_unist_util_generated();
    var definitions = require_mdast_util_definitions();
    var one = require_one();
    var footer = require_footer();
    var handlers = require_handlers();
    var own = {}.hasOwnProperty;
    var deprecationWarningIssued = false;
    function factory(tree, options) {
      var settings = options || {};
      if (settings.allowDangerousHTML !== void 0 && !deprecationWarningIssued) {
        deprecationWarningIssued = true;
        console.warn(
          "mdast-util-to-hast: deprecation: `allowDangerousHTML` is nonstandard, use `allowDangerousHtml` instead"
        );
      }
      var dangerous = settings.allowDangerousHtml || settings.allowDangerousHTML;
      var footnoteById = {};
      h.dangerous = dangerous;
      h.definition = definitions(tree);
      h.footnoteById = footnoteById;
      h.footnoteOrder = [];
      h.augment = augment;
      h.handlers = Object.assign({}, handlers, settings.handlers);
      h.unknownHandler = settings.unknownHandler;
      h.passThrough = settings.passThrough;
      visit(tree, "footnoteDefinition", onfootnotedefinition);
      return h;
      function augment(left, right) {
        var data;
        var ctx;
        if (left && left.data) {
          data = left.data;
          if (data.hName) {
            if (right.type !== "element") {
              right = {
                type: "element",
                tagName: "",
                properties: {},
                children: []
              };
            }
            right.tagName = data.hName;
          }
          if (right.type === "element" && data.hProperties) {
            right.properties = Object.assign({}, right.properties, data.hProperties);
          }
          if (right.children && data.hChildren) {
            right.children = data.hChildren;
          }
        }
        ctx = left && left.position ? left : { position: left };
        if (!generated(ctx)) {
          right.position = {
            start: position.start(ctx),
            end: position.end(ctx)
          };
        }
        return right;
      }
      function h(node, tagName, props, children) {
        if ((children === void 0 || children === null) && typeof props === "object" && "length" in props) {
          children = props;
          props = {};
        }
        return augment(node, {
          type: "element",
          tagName,
          properties: props || {},
          children: children || []
        });
      }
      function onfootnotedefinition(definition) {
        var id = String(definition.identifier).toUpperCase();
        if (!own.call(footnoteById, id)) {
          footnoteById[id] = definition;
        }
      }
    }
    function toHast(tree, options) {
      var h = factory(tree, options);
      var node = one(h, tree);
      var foot = footer(h);
      if (foot) {
        node.children = node.children.concat(u("text", "\n"), foot);
      }
      return node;
    }
  }
});

// node_modules/mdast-util-to-hast/index.js
var require_mdast_util_to_hast = __commonJS({
  "node_modules/mdast-util-to-hast/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_lib2();
  }
});

// node_modules/remark-rehype/index.js
var require_remark_rehype = __commonJS({
  "node_modules/remark-rehype/index.js"(exports2, module2) {
    "use strict";
    var mdast2hast = require_mdast_util_to_hast();
    module2.exports = remark2rehype;
    function remark2rehype(destination, options) {
      if (destination && !destination.process) {
        options = destination;
        destination = null;
      }
      return destination ? bridge(destination, options) : mutate2(options);
    }
    function bridge(destination, options) {
      return transformer;
      function transformer(node, file, next) {
        destination.run(mdast2hast(node, options), file, done);
        function done(error) {
          next(error);
        }
      }
    }
    function mutate2(options) {
      return transformer;
      function transformer(node) {
        return mdast2hast(node, options);
      }
    }
  }
});

// node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js"(exports2) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment2 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports2.AsyncMode = AsyncMode;
        exports2.ConcurrentMode = ConcurrentMode;
        exports2.ContextConsumer = ContextConsumer;
        exports2.ContextProvider = ContextProvider;
        exports2.Element = Element;
        exports2.ForwardRef = ForwardRef;
        exports2.Fragment = Fragment2;
        exports2.Lazy = Lazy;
        exports2.Memo = Memo;
        exports2.Portal = Portal;
        exports2.Profiler = Profiler;
        exports2.StrictMode = StrictMode;
        exports2.Suspense = Suspense;
        exports2.isAsyncMode = isAsyncMode;
        exports2.isConcurrentMode = isConcurrentMode;
        exports2.isContextConsumer = isContextConsumer;
        exports2.isContextProvider = isContextProvider;
        exports2.isElement = isElement;
        exports2.isForwardRef = isForwardRef;
        exports2.isFragment = isFragment;
        exports2.isLazy = isLazy;
        exports2.isMemo = isMemo;
        exports2.isPortal = isPortal;
        exports2.isProfiler = isProfiler;
        exports2.isStrictMode = isStrictMode;
        exports2.isSuspense = isSuspense;
        exports2.isValidElementType = isValidElementType;
        exports2.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/prop-types/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/prop-types/node_modules/react-is/index.js"(exports2, module2) {
    "use strict";
    if (false) {
      module2.exports = null;
    } else {
      module2.exports = require_react_is_development();
    }
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports2, module2) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty4 = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
          return test2[n2];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to3 = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty4.call(from, key)) {
            to3[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to3[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to3;
    };
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports2, module2) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module2.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports2, module2) {
    module2.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports2, module2) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has2 = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has2;
    function checkPropTypes(typeSpecs, values, location2, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has2(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error(
                  (componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                );
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || "React class") + ": type specification of " + location2 + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning(
                "Failed " + location2 + " type: " + error.message + (stack != null ? stack : "")
              );
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module2.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports2, module2) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has2 = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module2.exports = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is2(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location2, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3) {
                printWarning(
                  "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location2 + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location2 + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location2, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location2, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              "Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location2, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location2, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location2, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location2, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location2, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning(
                "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              );
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location2, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is2(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location2, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has2(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location2, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location2, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has2(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location2, propFullName) {
          if (!isNode2(props[propName])) {
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location2, propFullName, key, type) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location2 + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
        );
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location2, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location2, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location2, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has2(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location2, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                "Invalid " + location2 + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
            }
            var error = checker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode2(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode2);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode2(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode2(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports2, module2) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module2.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module2.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/xtend/immutable.js
var require_immutable = __commonJS({
  "node_modules/xtend/immutable.js"(exports2, module2) {
    module2.exports = extend;
    var hasOwnProperty4 = Object.prototype.hasOwnProperty;
    function extend() {
      var target = {};
      for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty4.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
  }
});

// node_modules/property-information/lib/util/schema.js
var require_schema = __commonJS({
  "node_modules/property-information/lib/util/schema.js"(exports2, module2) {
    "use strict";
    module2.exports = Schema;
    var proto = Schema.prototype;
    proto.space = null;
    proto.normal = {};
    proto.property = {};
    function Schema(property, normal, space) {
      this.property = property;
      this.normal = normal;
      if (space) {
        this.space = space;
      }
    }
  }
});

// node_modules/property-information/lib/util/merge.js
var require_merge = __commonJS({
  "node_modules/property-information/lib/util/merge.js"(exports2, module2) {
    "use strict";
    var xtend = require_immutable();
    var Schema = require_schema();
    module2.exports = merge4;
    function merge4(definitions) {
      var length = definitions.length;
      var property = [];
      var normal = [];
      var index = -1;
      var info;
      var space;
      while (++index < length) {
        info = definitions[index];
        property.push(info.property);
        normal.push(info.normal);
        space = info.space;
      }
      return new Schema(
        xtend.apply(null, property),
        xtend.apply(null, normal),
        space
      );
    }
  }
});

// node_modules/property-information/normalize.js
var require_normalize = __commonJS({
  "node_modules/property-information/normalize.js"(exports2, module2) {
    "use strict";
    module2.exports = normalize2;
    function normalize2(value) {
      return value.toLowerCase();
    }
  }
});

// node_modules/property-information/lib/util/info.js
var require_info = __commonJS({
  "node_modules/property-information/lib/util/info.js"(exports2, module2) {
    "use strict";
    module2.exports = Info;
    var proto = Info.prototype;
    proto.space = null;
    proto.attribute = null;
    proto.property = null;
    proto.boolean = false;
    proto.booleanish = false;
    proto.overloadedBoolean = false;
    proto.number = false;
    proto.commaSeparated = false;
    proto.spaceSeparated = false;
    proto.commaOrSpaceSeparated = false;
    proto.mustUseProperty = false;
    proto.defined = false;
    function Info(property, attribute) {
      this.property = property;
      this.attribute = attribute;
    }
  }
});

// node_modules/property-information/lib/util/types.js
var require_types = __commonJS({
  "node_modules/property-information/lib/util/types.js"(exports2) {
    "use strict";
    var powers = 0;
    exports2.boolean = increment();
    exports2.booleanish = increment();
    exports2.overloadedBoolean = increment();
    exports2.number = increment();
    exports2.spaceSeparated = increment();
    exports2.commaSeparated = increment();
    exports2.commaOrSpaceSeparated = increment();
    function increment() {
      return Math.pow(2, ++powers);
    }
  }
});

// node_modules/property-information/lib/util/defined-info.js
var require_defined_info = __commonJS({
  "node_modules/property-information/lib/util/defined-info.js"(exports2, module2) {
    "use strict";
    var Info = require_info();
    var types = require_types();
    module2.exports = DefinedInfo;
    DefinedInfo.prototype = new Info();
    DefinedInfo.prototype.defined = true;
    var checks = [
      "boolean",
      "booleanish",
      "overloadedBoolean",
      "number",
      "commaSeparated",
      "spaceSeparated",
      "commaOrSpaceSeparated"
    ];
    var checksLength = checks.length;
    function DefinedInfo(property, attribute, mask, space) {
      var index = -1;
      var check;
      mark(this, "space", space);
      Info.call(this, property, attribute);
      while (++index < checksLength) {
        check = checks[index];
        mark(this, check, (mask & types[check]) === types[check]);
      }
    }
    function mark(values, key, value) {
      if (value) {
        values[key] = value;
      }
    }
  }
});

// node_modules/property-information/lib/util/create.js
var require_create = __commonJS({
  "node_modules/property-information/lib/util/create.js"(exports2, module2) {
    "use strict";
    var normalize2 = require_normalize();
    var Schema = require_schema();
    var DefinedInfo = require_defined_info();
    module2.exports = create2;
    function create2(definition) {
      var space = definition.space;
      var mustUseProperty = definition.mustUseProperty || [];
      var attributes = definition.attributes || {};
      var props = definition.properties;
      var transform = definition.transform;
      var property = {};
      var normal = {};
      var prop;
      var info;
      for (prop in props) {
        info = new DefinedInfo(
          prop,
          transform(attributes, prop),
          props[prop],
          space
        );
        if (mustUseProperty.indexOf(prop) !== -1) {
          info.mustUseProperty = true;
        }
        property[prop] = info;
        normal[normalize2(prop)] = prop;
        normal[normalize2(info.attribute)] = prop;
      }
      return new Schema(property, normal, space);
    }
  }
});

// node_modules/property-information/lib/xlink.js
var require_xlink = __commonJS({
  "node_modules/property-information/lib/xlink.js"(exports2, module2) {
    "use strict";
    var create2 = require_create();
    module2.exports = create2({
      space: "xlink",
      transform: xlinkTransform,
      properties: {
        xLinkActuate: null,
        xLinkArcRole: null,
        xLinkHref: null,
        xLinkRole: null,
        xLinkShow: null,
        xLinkTitle: null,
        xLinkType: null
      }
    });
    function xlinkTransform(_, prop) {
      return "xlink:" + prop.slice(5).toLowerCase();
    }
  }
});

// node_modules/property-information/lib/xml.js
var require_xml = __commonJS({
  "node_modules/property-information/lib/xml.js"(exports2, module2) {
    "use strict";
    var create2 = require_create();
    module2.exports = create2({
      space: "xml",
      transform: xmlTransform,
      properties: {
        xmlLang: null,
        xmlBase: null,
        xmlSpace: null
      }
    });
    function xmlTransform(_, prop) {
      return "xml:" + prop.slice(3).toLowerCase();
    }
  }
});

// node_modules/property-information/lib/util/case-sensitive-transform.js
var require_case_sensitive_transform = __commonJS({
  "node_modules/property-information/lib/util/case-sensitive-transform.js"(exports2, module2) {
    "use strict";
    module2.exports = caseSensitiveTransform;
    function caseSensitiveTransform(attributes, attribute) {
      return attribute in attributes ? attributes[attribute] : attribute;
    }
  }
});

// node_modules/property-information/lib/util/case-insensitive-transform.js
var require_case_insensitive_transform = __commonJS({
  "node_modules/property-information/lib/util/case-insensitive-transform.js"(exports2, module2) {
    "use strict";
    var caseSensitiveTransform = require_case_sensitive_transform();
    module2.exports = caseInsensitiveTransform;
    function caseInsensitiveTransform(attributes, property) {
      return caseSensitiveTransform(attributes, property.toLowerCase());
    }
  }
});

// node_modules/property-information/lib/xmlns.js
var require_xmlns = __commonJS({
  "node_modules/property-information/lib/xmlns.js"(exports2, module2) {
    "use strict";
    var create2 = require_create();
    var caseInsensitiveTransform = require_case_insensitive_transform();
    module2.exports = create2({
      space: "xmlns",
      attributes: {
        xmlnsxlink: "xmlns:xlink"
      },
      transform: caseInsensitiveTransform,
      properties: {
        xmlns: null,
        xmlnsXLink: null
      }
    });
  }
});

// node_modules/property-information/lib/aria.js
var require_aria = __commonJS({
  "node_modules/property-information/lib/aria.js"(exports2, module2) {
    "use strict";
    var types = require_types();
    var create2 = require_create();
    var booleanish = types.booleanish;
    var number = types.number;
    var spaceSeparated = types.spaceSeparated;
    module2.exports = create2({
      transform: ariaTransform,
      properties: {
        ariaActiveDescendant: null,
        ariaAtomic: booleanish,
        ariaAutoComplete: null,
        ariaBusy: booleanish,
        ariaChecked: booleanish,
        ariaColCount: number,
        ariaColIndex: number,
        ariaColSpan: number,
        ariaControls: spaceSeparated,
        ariaCurrent: null,
        ariaDescribedBy: spaceSeparated,
        ariaDetails: null,
        ariaDisabled: booleanish,
        ariaDropEffect: spaceSeparated,
        ariaErrorMessage: null,
        ariaExpanded: booleanish,
        ariaFlowTo: spaceSeparated,
        ariaGrabbed: booleanish,
        ariaHasPopup: null,
        ariaHidden: booleanish,
        ariaInvalid: null,
        ariaKeyShortcuts: null,
        ariaLabel: null,
        ariaLabelledBy: spaceSeparated,
        ariaLevel: number,
        ariaLive: null,
        ariaModal: booleanish,
        ariaMultiLine: booleanish,
        ariaMultiSelectable: booleanish,
        ariaOrientation: null,
        ariaOwns: spaceSeparated,
        ariaPlaceholder: null,
        ariaPosInSet: number,
        ariaPressed: booleanish,
        ariaReadOnly: booleanish,
        ariaRelevant: null,
        ariaRequired: booleanish,
        ariaRoleDescription: spaceSeparated,
        ariaRowCount: number,
        ariaRowIndex: number,
        ariaRowSpan: number,
        ariaSelected: booleanish,
        ariaSetSize: number,
        ariaSort: null,
        ariaValueMax: number,
        ariaValueMin: number,
        ariaValueNow: number,
        ariaValueText: null,
        role: null
      }
    });
    function ariaTransform(_, prop) {
      return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
    }
  }
});

// node_modules/property-information/lib/html.js
var require_html2 = __commonJS({
  "node_modules/property-information/lib/html.js"(exports2, module2) {
    "use strict";
    var types = require_types();
    var create2 = require_create();
    var caseInsensitiveTransform = require_case_insensitive_transform();
    var boolean = types.boolean;
    var overloadedBoolean = types.overloadedBoolean;
    var booleanish = types.booleanish;
    var number = types.number;
    var spaceSeparated = types.spaceSeparated;
    var commaSeparated = types.commaSeparated;
    module2.exports = create2({
      space: "html",
      attributes: {
        acceptcharset: "accept-charset",
        classname: "class",
        htmlfor: "for",
        httpequiv: "http-equiv"
      },
      transform: caseInsensitiveTransform,
      mustUseProperty: ["checked", "multiple", "muted", "selected"],
      properties: {
        // Standard Properties.
        abbr: null,
        accept: commaSeparated,
        acceptCharset: spaceSeparated,
        accessKey: spaceSeparated,
        action: null,
        allow: null,
        allowFullScreen: boolean,
        allowPaymentRequest: boolean,
        allowUserMedia: boolean,
        alt: null,
        as: null,
        async: boolean,
        autoCapitalize: null,
        autoComplete: spaceSeparated,
        autoFocus: boolean,
        autoPlay: boolean,
        capture: boolean,
        charSet: null,
        checked: boolean,
        cite: null,
        className: spaceSeparated,
        cols: number,
        colSpan: null,
        content: null,
        contentEditable: booleanish,
        controls: boolean,
        controlsList: spaceSeparated,
        coords: number | commaSeparated,
        crossOrigin: null,
        data: null,
        dateTime: null,
        decoding: null,
        default: boolean,
        defer: boolean,
        dir: null,
        dirName: null,
        disabled: boolean,
        download: overloadedBoolean,
        draggable: booleanish,
        encType: null,
        enterKeyHint: null,
        form: null,
        formAction: null,
        formEncType: null,
        formMethod: null,
        formNoValidate: boolean,
        formTarget: null,
        headers: spaceSeparated,
        height: number,
        hidden: boolean,
        high: number,
        href: null,
        hrefLang: null,
        htmlFor: spaceSeparated,
        httpEquiv: spaceSeparated,
        id: null,
        imageSizes: null,
        imageSrcSet: commaSeparated,
        inputMode: null,
        integrity: null,
        is: null,
        isMap: boolean,
        itemId: null,
        itemProp: spaceSeparated,
        itemRef: spaceSeparated,
        itemScope: boolean,
        itemType: spaceSeparated,
        kind: null,
        label: null,
        lang: null,
        language: null,
        list: null,
        loading: null,
        loop: boolean,
        low: number,
        manifest: null,
        max: null,
        maxLength: number,
        media: null,
        method: null,
        min: null,
        minLength: number,
        multiple: boolean,
        muted: boolean,
        name: null,
        nonce: null,
        noModule: boolean,
        noValidate: boolean,
        onAbort: null,
        onAfterPrint: null,
        onAuxClick: null,
        onBeforePrint: null,
        onBeforeUnload: null,
        onBlur: null,
        onCancel: null,
        onCanPlay: null,
        onCanPlayThrough: null,
        onChange: null,
        onClick: null,
        onClose: null,
        onContextMenu: null,
        onCopy: null,
        onCueChange: null,
        onCut: null,
        onDblClick: null,
        onDrag: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragExit: null,
        onDragLeave: null,
        onDragOver: null,
        onDragStart: null,
        onDrop: null,
        onDurationChange: null,
        onEmptied: null,
        onEnded: null,
        onError: null,
        onFocus: null,
        onFormData: null,
        onHashChange: null,
        onInput: null,
        onInvalid: null,
        onKeyDown: null,
        onKeyPress: null,
        onKeyUp: null,
        onLanguageChange: null,
        onLoad: null,
        onLoadedData: null,
        onLoadedMetadata: null,
        onLoadEnd: null,
        onLoadStart: null,
        onMessage: null,
        onMessageError: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        onMouseMove: null,
        onMouseOut: null,
        onMouseOver: null,
        onMouseUp: null,
        onOffline: null,
        onOnline: null,
        onPageHide: null,
        onPageShow: null,
        onPaste: null,
        onPause: null,
        onPlay: null,
        onPlaying: null,
        onPopState: null,
        onProgress: null,
        onRateChange: null,
        onRejectionHandled: null,
        onReset: null,
        onResize: null,
        onScroll: null,
        onSecurityPolicyViolation: null,
        onSeeked: null,
        onSeeking: null,
        onSelect: null,
        onSlotChange: null,
        onStalled: null,
        onStorage: null,
        onSubmit: null,
        onSuspend: null,
        onTimeUpdate: null,
        onToggle: null,
        onUnhandledRejection: null,
        onUnload: null,
        onVolumeChange: null,
        onWaiting: null,
        onWheel: null,
        open: boolean,
        optimum: number,
        pattern: null,
        ping: spaceSeparated,
        placeholder: null,
        playsInline: boolean,
        poster: null,
        preload: null,
        readOnly: boolean,
        referrerPolicy: null,
        rel: spaceSeparated,
        required: boolean,
        reversed: boolean,
        rows: number,
        rowSpan: number,
        sandbox: spaceSeparated,
        scope: null,
        scoped: boolean,
        seamless: boolean,
        selected: boolean,
        shape: null,
        size: number,
        sizes: null,
        slot: null,
        span: number,
        spellCheck: booleanish,
        src: null,
        srcDoc: null,
        srcLang: null,
        srcSet: commaSeparated,
        start: number,
        step: null,
        style: null,
        tabIndex: number,
        target: null,
        title: null,
        translate: null,
        type: null,
        typeMustMatch: boolean,
        useMap: null,
        value: booleanish,
        width: number,
        wrap: null,
        // Legacy.
        // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
        align: null,
        // Several. Use CSS `text-align` instead,
        aLink: null,
        // `<body>`. Use CSS `a:active {color}` instead
        archive: spaceSeparated,
        // `<object>`. List of URIs to archives
        axis: null,
        // `<td>` and `<th>`. Use `scope` on `<th>`
        background: null,
        // `<body>`. Use CSS `background-image` instead
        bgColor: null,
        // `<body>` and table elements. Use CSS `background-color` instead
        border: number,
        // `<table>`. Use CSS `border-width` instead,
        borderColor: null,
        // `<table>`. Use CSS `border-color` instead,
        bottomMargin: number,
        // `<body>`
        cellPadding: null,
        // `<table>`
        cellSpacing: null,
        // `<table>`
        char: null,
        // Several table elements. When `align=char`, sets the character to align on
        charOff: null,
        // Several table elements. When `char`, offsets the alignment
        classId: null,
        // `<object>`
        clear: null,
        // `<br>`. Use CSS `clear` instead
        code: null,
        // `<object>`
        codeBase: null,
        // `<object>`
        codeType: null,
        // `<object>`
        color: null,
        // `<font>` and `<hr>`. Use CSS instead
        compact: boolean,
        // Lists. Use CSS to reduce space between items instead
        declare: boolean,
        // `<object>`
        event: null,
        // `<script>`
        face: null,
        // `<font>`. Use CSS instead
        frame: null,
        // `<table>`
        frameBorder: null,
        // `<iframe>`. Use CSS `border` instead
        hSpace: number,
        // `<img>` and `<object>`
        leftMargin: number,
        // `<body>`
        link: null,
        // `<body>`. Use CSS `a:link {color: *}` instead
        longDesc: null,
        // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
        lowSrc: null,
        // `<img>`. Use a `<picture>`
        marginHeight: number,
        // `<body>`
        marginWidth: number,
        // `<body>`
        noResize: boolean,
        // `<frame>`
        noHref: boolean,
        // `<area>`. Use no href instead of an explicit `nohref`
        noShade: boolean,
        // `<hr>`. Use background-color and height instead of borders
        noWrap: boolean,
        // `<td>` and `<th>`
        object: null,
        // `<applet>`
        profile: null,
        // `<head>`
        prompt: null,
        // `<isindex>`
        rev: null,
        // `<link>`
        rightMargin: number,
        // `<body>`
        rules: null,
        // `<table>`
        scheme: null,
        // `<meta>`
        scrolling: booleanish,
        // `<frame>`. Use overflow in the child context
        standby: null,
        // `<object>`
        summary: null,
        // `<table>`
        text: null,
        // `<body>`. Use CSS `color` instead
        topMargin: number,
        // `<body>`
        valueType: null,
        // `<param>`
        version: null,
        // `<html>`. Use a doctype.
        vAlign: null,
        // Several. Use CSS `vertical-align` instead
        vLink: null,
        // `<body>`. Use CSS `a:visited {color}` instead
        vSpace: number,
        // `<img>` and `<object>`
        // Non-standard Properties.
        allowTransparency: null,
        autoCorrect: null,
        autoSave: null,
        disablePictureInPicture: boolean,
        disableRemotePlayback: boolean,
        prefix: null,
        property: null,
        results: number,
        security: null,
        unselectable: null
      }
    });
  }
});

// node_modules/property-information/html.js
var require_html3 = __commonJS({
  "node_modules/property-information/html.js"(exports2, module2) {
    "use strict";
    var merge4 = require_merge();
    var xlink = require_xlink();
    var xml = require_xml();
    var xmlns = require_xmlns();
    var aria = require_aria();
    var html = require_html2();
    module2.exports = merge4([xml, xlink, xmlns, aria, html]);
  }
});

// node_modules/react-markdown/node_modules/unist-util-visit/index.js
var require_unist_util_visit3 = __commonJS({
  "node_modules/react-markdown/node_modules/unist-util-visit/index.js"(exports2, module2) {
    "use strict";
    module2.exports = visit;
    var visitParents = require_unist_util_visit_parents();
    var CONTINUE = visitParents.CONTINUE;
    var SKIP = visitParents.SKIP;
    var EXIT = visitParents.EXIT;
    visit.CONTINUE = CONTINUE;
    visit.SKIP = SKIP;
    visit.EXIT = EXIT;
    function visit(tree, test, visitor, reverse) {
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      visitParents(tree, test, overload, reverse);
      function overload(node, parents) {
        var parent = parents[parents.length - 1];
        var index = parent ? parent.children.indexOf(node) : null;
        return visitor(node, index, parent);
      }
    }
  }
});

// node_modules/react-markdown/src/rehype-filter.js
var require_rehype_filter = __commonJS({
  "node_modules/react-markdown/src/rehype-filter.js"(exports2, module2) {
    var visit = require_unist_util_visit3();
    module2.exports = rehypeFilter;
    function rehypeFilter(options) {
      if (options.allowedElements && options.disallowedElements) {
        throw new TypeError(
          "Only one of `allowedElements` and `disallowedElements` should be defined"
        );
      }
      if (options.allowedElements || options.disallowedElements || options.allowElement) {
        return (tree) => {
          const node = (
            /** @type {Root} */
            tree
          );
          visit(node, "element", onelement);
        };
      }
      function onelement(node_, index, parent_) {
        const node = (
          /** @type {Element} */
          node_
        );
        const parent = (
          /** @type {Element|Root} */
          parent_
        );
        let remove;
        if (options.allowedElements) {
          remove = !options.allowedElements.includes(node.tagName);
        } else if (options.disallowedElements) {
          remove = options.disallowedElements.includes(node.tagName);
        }
        if (!remove && options.allowElement && typeof index === "number") {
          remove = !options.allowElement(node, index, parent);
        }
        if (remove && typeof index === "number") {
          if (options.unwrapDisallowed && node.children) {
            parent.children.splice(index, 1, ...node.children);
          } else {
            parent.children.splice(index, 1);
          }
          return index;
        }
        return void 0;
      }
    }
  }
});

// node_modules/react-markdown/src/uri-transformer.js
var require_uri_transformer = __commonJS({
  "node_modules/react-markdown/src/uri-transformer.js"(exports2, module2) {
    var protocols = ["http", "https", "mailto", "tel"];
    module2.exports = uriTransformer;
    function uriTransformer(uri) {
      const url = (uri || "").trim();
      const first = url.charAt(0);
      if (first === "#" || first === "/") {
        return url;
      }
      const colon = url.indexOf(":");
      if (colon === -1) {
        return url;
      }
      let index = -1;
      while (++index < protocols.length) {
        const protocol = protocols[index];
        if (colon === protocol.length && url.slice(0, protocol.length).toLowerCase() === protocol) {
          return url;
        }
      }
      index = url.indexOf("?");
      if (index !== -1 && colon > index) {
        return url;
      }
      index = url.indexOf("#");
      if (index !== -1 && colon > index) {
        return url;
      }
      return "javascript:void(0)";
    }
  }
});

// node_modules/react-markdown/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development2 = __commonJS({
  "node_modules/react-markdown/node_modules/react-is/cjs/react-is.development.js"(exports2) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment2 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports2.ContextConsumer = ContextConsumer;
        exports2.ContextProvider = ContextProvider;
        exports2.Element = Element;
        exports2.ForwardRef = ForwardRef;
        exports2.Fragment = Fragment2;
        exports2.Lazy = Lazy;
        exports2.Memo = Memo;
        exports2.Portal = Portal;
        exports2.Profiler = Profiler;
        exports2.StrictMode = StrictMode;
        exports2.Suspense = Suspense;
        exports2.isAsyncMode = isAsyncMode;
        exports2.isConcurrentMode = isConcurrentMode;
        exports2.isContextConsumer = isContextConsumer;
        exports2.isContextProvider = isContextProvider;
        exports2.isElement = isElement;
        exports2.isForwardRef = isForwardRef;
        exports2.isFragment = isFragment;
        exports2.isLazy = isLazy;
        exports2.isMemo = isMemo;
        exports2.isPortal = isPortal;
        exports2.isProfiler = isProfiler;
        exports2.isStrictMode = isStrictMode;
        exports2.isSuspense = isSuspense;
        exports2.isValidElementType = isValidElementType;
        exports2.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/react-markdown/node_modules/react-is/index.js
var require_react_is2 = __commonJS({
  "node_modules/react-markdown/node_modules/react-is/index.js"(exports2, module2) {
    "use strict";
    if (false) {
      module2.exports = null;
    } else {
      module2.exports = require_react_is_development2();
    }
  }
});

// node_modules/property-information/lib/svg.js
var require_svg = __commonJS({
  "node_modules/property-information/lib/svg.js"(exports2, module2) {
    "use strict";
    var types = require_types();
    var create2 = require_create();
    var caseSensitiveTransform = require_case_sensitive_transform();
    var boolean = types.boolean;
    var number = types.number;
    var spaceSeparated = types.spaceSeparated;
    var commaSeparated = types.commaSeparated;
    var commaOrSpaceSeparated = types.commaOrSpaceSeparated;
    module2.exports = create2({
      space: "svg",
      attributes: {
        accentHeight: "accent-height",
        alignmentBaseline: "alignment-baseline",
        arabicForm: "arabic-form",
        baselineShift: "baseline-shift",
        capHeight: "cap-height",
        className: "class",
        clipPath: "clip-path",
        clipRule: "clip-rule",
        colorInterpolation: "color-interpolation",
        colorInterpolationFilters: "color-interpolation-filters",
        colorProfile: "color-profile",
        colorRendering: "color-rendering",
        crossOrigin: "crossorigin",
        dataType: "datatype",
        dominantBaseline: "dominant-baseline",
        enableBackground: "enable-background",
        fillOpacity: "fill-opacity",
        fillRule: "fill-rule",
        floodColor: "flood-color",
        floodOpacity: "flood-opacity",
        fontFamily: "font-family",
        fontSize: "font-size",
        fontSizeAdjust: "font-size-adjust",
        fontStretch: "font-stretch",
        fontStyle: "font-style",
        fontVariant: "font-variant",
        fontWeight: "font-weight",
        glyphName: "glyph-name",
        glyphOrientationHorizontal: "glyph-orientation-horizontal",
        glyphOrientationVertical: "glyph-orientation-vertical",
        hrefLang: "hreflang",
        horizAdvX: "horiz-adv-x",
        horizOriginX: "horiz-origin-x",
        horizOriginY: "horiz-origin-y",
        imageRendering: "image-rendering",
        letterSpacing: "letter-spacing",
        lightingColor: "lighting-color",
        markerEnd: "marker-end",
        markerMid: "marker-mid",
        markerStart: "marker-start",
        navDown: "nav-down",
        navDownLeft: "nav-down-left",
        navDownRight: "nav-down-right",
        navLeft: "nav-left",
        navNext: "nav-next",
        navPrev: "nav-prev",
        navRight: "nav-right",
        navUp: "nav-up",
        navUpLeft: "nav-up-left",
        navUpRight: "nav-up-right",
        onAbort: "onabort",
        onActivate: "onactivate",
        onAfterPrint: "onafterprint",
        onBeforePrint: "onbeforeprint",
        onBegin: "onbegin",
        onCancel: "oncancel",
        onCanPlay: "oncanplay",
        onCanPlayThrough: "oncanplaythrough",
        onChange: "onchange",
        onClick: "onclick",
        onClose: "onclose",
        onCopy: "oncopy",
        onCueChange: "oncuechange",
        onCut: "oncut",
        onDblClick: "ondblclick",
        onDrag: "ondrag",
        onDragEnd: "ondragend",
        onDragEnter: "ondragenter",
        onDragExit: "ondragexit",
        onDragLeave: "ondragleave",
        onDragOver: "ondragover",
        onDragStart: "ondragstart",
        onDrop: "ondrop",
        onDurationChange: "ondurationchange",
        onEmptied: "onemptied",
        onEnd: "onend",
        onEnded: "onended",
        onError: "onerror",
        onFocus: "onfocus",
        onFocusIn: "onfocusin",
        onFocusOut: "onfocusout",
        onHashChange: "onhashchange",
        onInput: "oninput",
        onInvalid: "oninvalid",
        onKeyDown: "onkeydown",
        onKeyPress: "onkeypress",
        onKeyUp: "onkeyup",
        onLoad: "onload",
        onLoadedData: "onloadeddata",
        onLoadedMetadata: "onloadedmetadata",
        onLoadStart: "onloadstart",
        onMessage: "onmessage",
        onMouseDown: "onmousedown",
        onMouseEnter: "onmouseenter",
        onMouseLeave: "onmouseleave",
        onMouseMove: "onmousemove",
        onMouseOut: "onmouseout",
        onMouseOver: "onmouseover",
        onMouseUp: "onmouseup",
        onMouseWheel: "onmousewheel",
        onOffline: "onoffline",
        onOnline: "ononline",
        onPageHide: "onpagehide",
        onPageShow: "onpageshow",
        onPaste: "onpaste",
        onPause: "onpause",
        onPlay: "onplay",
        onPlaying: "onplaying",
        onPopState: "onpopstate",
        onProgress: "onprogress",
        onRateChange: "onratechange",
        onRepeat: "onrepeat",
        onReset: "onreset",
        onResize: "onresize",
        onScroll: "onscroll",
        onSeeked: "onseeked",
        onSeeking: "onseeking",
        onSelect: "onselect",
        onShow: "onshow",
        onStalled: "onstalled",
        onStorage: "onstorage",
        onSubmit: "onsubmit",
        onSuspend: "onsuspend",
        onTimeUpdate: "ontimeupdate",
        onToggle: "ontoggle",
        onUnload: "onunload",
        onVolumeChange: "onvolumechange",
        onWaiting: "onwaiting",
        onZoom: "onzoom",
        overlinePosition: "overline-position",
        overlineThickness: "overline-thickness",
        paintOrder: "paint-order",
        panose1: "panose-1",
        pointerEvents: "pointer-events",
        referrerPolicy: "referrerpolicy",
        renderingIntent: "rendering-intent",
        shapeRendering: "shape-rendering",
        stopColor: "stop-color",
        stopOpacity: "stop-opacity",
        strikethroughPosition: "strikethrough-position",
        strikethroughThickness: "strikethrough-thickness",
        strokeDashArray: "stroke-dasharray",
        strokeDashOffset: "stroke-dashoffset",
        strokeLineCap: "stroke-linecap",
        strokeLineJoin: "stroke-linejoin",
        strokeMiterLimit: "stroke-miterlimit",
        strokeOpacity: "stroke-opacity",
        strokeWidth: "stroke-width",
        tabIndex: "tabindex",
        textAnchor: "text-anchor",
        textDecoration: "text-decoration",
        textRendering: "text-rendering",
        typeOf: "typeof",
        underlinePosition: "underline-position",
        underlineThickness: "underline-thickness",
        unicodeBidi: "unicode-bidi",
        unicodeRange: "unicode-range",
        unitsPerEm: "units-per-em",
        vAlphabetic: "v-alphabetic",
        vHanging: "v-hanging",
        vIdeographic: "v-ideographic",
        vMathematical: "v-mathematical",
        vectorEffect: "vector-effect",
        vertAdvY: "vert-adv-y",
        vertOriginX: "vert-origin-x",
        vertOriginY: "vert-origin-y",
        wordSpacing: "word-spacing",
        writingMode: "writing-mode",
        xHeight: "x-height",
        // These were camelcased in Tiny. Now lowercased in SVG 2
        playbackOrder: "playbackorder",
        timelineBegin: "timelinebegin"
      },
      transform: caseSensitiveTransform,
      properties: {
        about: commaOrSpaceSeparated,
        accentHeight: number,
        accumulate: null,
        additive: null,
        alignmentBaseline: null,
        alphabetic: number,
        amplitude: number,
        arabicForm: null,
        ascent: number,
        attributeName: null,
        attributeType: null,
        azimuth: number,
        bandwidth: null,
        baselineShift: null,
        baseFrequency: null,
        baseProfile: null,
        bbox: null,
        begin: null,
        bias: number,
        by: null,
        calcMode: null,
        capHeight: number,
        className: spaceSeparated,
        clip: null,
        clipPath: null,
        clipPathUnits: null,
        clipRule: null,
        color: null,
        colorInterpolation: null,
        colorInterpolationFilters: null,
        colorProfile: null,
        colorRendering: null,
        content: null,
        contentScriptType: null,
        contentStyleType: null,
        crossOrigin: null,
        cursor: null,
        cx: null,
        cy: null,
        d: null,
        dataType: null,
        defaultAction: null,
        descent: number,
        diffuseConstant: number,
        direction: null,
        display: null,
        dur: null,
        divisor: number,
        dominantBaseline: null,
        download: boolean,
        dx: null,
        dy: null,
        edgeMode: null,
        editable: null,
        elevation: number,
        enableBackground: null,
        end: null,
        event: null,
        exponent: number,
        externalResourcesRequired: null,
        fill: null,
        fillOpacity: number,
        fillRule: null,
        filter: null,
        filterRes: null,
        filterUnits: null,
        floodColor: null,
        floodOpacity: null,
        focusable: null,
        focusHighlight: null,
        fontFamily: null,
        fontSize: null,
        fontSizeAdjust: null,
        fontStretch: null,
        fontStyle: null,
        fontVariant: null,
        fontWeight: null,
        format: null,
        fr: null,
        from: null,
        fx: null,
        fy: null,
        g1: commaSeparated,
        g2: commaSeparated,
        glyphName: commaSeparated,
        glyphOrientationHorizontal: null,
        glyphOrientationVertical: null,
        glyphRef: null,
        gradientTransform: null,
        gradientUnits: null,
        handler: null,
        hanging: number,
        hatchContentUnits: null,
        hatchUnits: null,
        height: null,
        href: null,
        hrefLang: null,
        horizAdvX: number,
        horizOriginX: number,
        horizOriginY: number,
        id: null,
        ideographic: number,
        imageRendering: null,
        initialVisibility: null,
        in: null,
        in2: null,
        intercept: number,
        k: number,
        k1: number,
        k2: number,
        k3: number,
        k4: number,
        kernelMatrix: commaOrSpaceSeparated,
        kernelUnitLength: null,
        keyPoints: null,
        // SEMI_COLON_SEPARATED
        keySplines: null,
        // SEMI_COLON_SEPARATED
        keyTimes: null,
        // SEMI_COLON_SEPARATED
        kerning: null,
        lang: null,
        lengthAdjust: null,
        letterSpacing: null,
        lightingColor: null,
        limitingConeAngle: number,
        local: null,
        markerEnd: null,
        markerMid: null,
        markerStart: null,
        markerHeight: null,
        markerUnits: null,
        markerWidth: null,
        mask: null,
        maskContentUnits: null,
        maskUnits: null,
        mathematical: null,
        max: null,
        media: null,
        mediaCharacterEncoding: null,
        mediaContentEncodings: null,
        mediaSize: number,
        mediaTime: null,
        method: null,
        min: null,
        mode: null,
        name: null,
        navDown: null,
        navDownLeft: null,
        navDownRight: null,
        navLeft: null,
        navNext: null,
        navPrev: null,
        navRight: null,
        navUp: null,
        navUpLeft: null,
        navUpRight: null,
        numOctaves: null,
        observer: null,
        offset: null,
        onAbort: null,
        onActivate: null,
        onAfterPrint: null,
        onBeforePrint: null,
        onBegin: null,
        onCancel: null,
        onCanPlay: null,
        onCanPlayThrough: null,
        onChange: null,
        onClick: null,
        onClose: null,
        onCopy: null,
        onCueChange: null,
        onCut: null,
        onDblClick: null,
        onDrag: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragExit: null,
        onDragLeave: null,
        onDragOver: null,
        onDragStart: null,
        onDrop: null,
        onDurationChange: null,
        onEmptied: null,
        onEnd: null,
        onEnded: null,
        onError: null,
        onFocus: null,
        onFocusIn: null,
        onFocusOut: null,
        onHashChange: null,
        onInput: null,
        onInvalid: null,
        onKeyDown: null,
        onKeyPress: null,
        onKeyUp: null,
        onLoad: null,
        onLoadedData: null,
        onLoadedMetadata: null,
        onLoadStart: null,
        onMessage: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        onMouseMove: null,
        onMouseOut: null,
        onMouseOver: null,
        onMouseUp: null,
        onMouseWheel: null,
        onOffline: null,
        onOnline: null,
        onPageHide: null,
        onPageShow: null,
        onPaste: null,
        onPause: null,
        onPlay: null,
        onPlaying: null,
        onPopState: null,
        onProgress: null,
        onRateChange: null,
        onRepeat: null,
        onReset: null,
        onResize: null,
        onScroll: null,
        onSeeked: null,
        onSeeking: null,
        onSelect: null,
        onShow: null,
        onStalled: null,
        onStorage: null,
        onSubmit: null,
        onSuspend: null,
        onTimeUpdate: null,
        onToggle: null,
        onUnload: null,
        onVolumeChange: null,
        onWaiting: null,
        onZoom: null,
        opacity: null,
        operator: null,
        order: null,
        orient: null,
        orientation: null,
        origin: null,
        overflow: null,
        overlay: null,
        overlinePosition: number,
        overlineThickness: number,
        paintOrder: null,
        panose1: null,
        path: null,
        pathLength: number,
        patternContentUnits: null,
        patternTransform: null,
        patternUnits: null,
        phase: null,
        ping: spaceSeparated,
        pitch: null,
        playbackOrder: null,
        pointerEvents: null,
        points: null,
        pointsAtX: number,
        pointsAtY: number,
        pointsAtZ: number,
        preserveAlpha: null,
        preserveAspectRatio: null,
        primitiveUnits: null,
        propagate: null,
        property: commaOrSpaceSeparated,
        r: null,
        radius: null,
        referrerPolicy: null,
        refX: null,
        refY: null,
        rel: commaOrSpaceSeparated,
        rev: commaOrSpaceSeparated,
        renderingIntent: null,
        repeatCount: null,
        repeatDur: null,
        requiredExtensions: commaOrSpaceSeparated,
        requiredFeatures: commaOrSpaceSeparated,
        requiredFonts: commaOrSpaceSeparated,
        requiredFormats: commaOrSpaceSeparated,
        resource: null,
        restart: null,
        result: null,
        rotate: null,
        rx: null,
        ry: null,
        scale: null,
        seed: null,
        shapeRendering: null,
        side: null,
        slope: null,
        snapshotTime: null,
        specularConstant: number,
        specularExponent: number,
        spreadMethod: null,
        spacing: null,
        startOffset: null,
        stdDeviation: null,
        stemh: null,
        stemv: null,
        stitchTiles: null,
        stopColor: null,
        stopOpacity: null,
        strikethroughPosition: number,
        strikethroughThickness: number,
        string: null,
        stroke: null,
        strokeDashArray: commaOrSpaceSeparated,
        strokeDashOffset: null,
        strokeLineCap: null,
        strokeLineJoin: null,
        strokeMiterLimit: number,
        strokeOpacity: number,
        strokeWidth: null,
        style: null,
        surfaceScale: number,
        syncBehavior: null,
        syncBehaviorDefault: null,
        syncMaster: null,
        syncTolerance: null,
        syncToleranceDefault: null,
        systemLanguage: commaOrSpaceSeparated,
        tabIndex: number,
        tableValues: null,
        target: null,
        targetX: number,
        targetY: number,
        textAnchor: null,
        textDecoration: null,
        textRendering: null,
        textLength: null,
        timelineBegin: null,
        title: null,
        transformBehavior: null,
        type: null,
        typeOf: commaOrSpaceSeparated,
        to: null,
        transform: null,
        u1: null,
        u2: null,
        underlinePosition: number,
        underlineThickness: number,
        unicode: null,
        unicodeBidi: null,
        unicodeRange: null,
        unitsPerEm: number,
        values: null,
        vAlphabetic: number,
        vMathematical: number,
        vectorEffect: null,
        vHanging: number,
        vIdeographic: number,
        version: null,
        vertAdvY: number,
        vertOriginX: number,
        vertOriginY: number,
        viewBox: null,
        viewTarget: null,
        visibility: null,
        width: null,
        widths: null,
        wordSpacing: null,
        writingMode: null,
        x: null,
        x1: null,
        x2: null,
        xChannelSelector: null,
        xHeight: number,
        y: null,
        y1: null,
        y2: null,
        yChannelSelector: null,
        z: null,
        zoomAndPan: null
      }
    });
  }
});

// node_modules/property-information/svg.js
var require_svg2 = __commonJS({
  "node_modules/property-information/svg.js"(exports2, module2) {
    "use strict";
    var merge4 = require_merge();
    var xlink = require_xlink();
    var xml = require_xml();
    var xmlns = require_xmlns();
    var aria = require_aria();
    var svg = require_svg();
    module2.exports = merge4([xml, xlink, xmlns, aria, svg]);
  }
});

// node_modules/property-information/find.js
var require_find = __commonJS({
  "node_modules/property-information/find.js"(exports2, module2) {
    "use strict";
    var normalize2 = require_normalize();
    var DefinedInfo = require_defined_info();
    var Info = require_info();
    var data = "data";
    module2.exports = find;
    var valid = /^data[-\w.:]+$/i;
    var dash = /-[a-z]/g;
    var cap = /[A-Z]/g;
    function find(schema, value) {
      var normal = normalize2(value);
      var prop = value;
      var Type = Info;
      if (normal in schema.normal) {
        return schema.property[schema.normal[normal]];
      }
      if (normal.length > 4 && normal.slice(0, 4) === data && valid.test(value)) {
        if (value.charAt(4) === "-") {
          prop = datasetToProperty(value);
        } else {
          value = datasetToAttribute(value);
        }
        Type = DefinedInfo;
      }
      return new Type(prop, value);
    }
    function datasetToProperty(attribute) {
      var value = attribute.slice(5).replace(dash, camelcase);
      return data + value.charAt(0).toUpperCase() + value.slice(1);
    }
    function datasetToAttribute(property) {
      var value = property.slice(4);
      if (dash.test(value)) {
        return property;
      }
      value = value.replace(cap, kebab);
      if (value.charAt(0) !== "-") {
        value = "-" + value;
      }
      return data + value;
    }
    function kebab($0) {
      return "-" + $0.toLowerCase();
    }
    function camelcase($0) {
      return $0.charAt(1).toUpperCase();
    }
  }
});

// node_modules/property-information/hast-to-react.json
var require_hast_to_react = __commonJS({
  "node_modules/property-information/hast-to-react.json"(exports2, module2) {
    module2.exports = {
      classId: "classID",
      dataType: "datatype",
      itemId: "itemID",
      strokeDashArray: "strokeDasharray",
      strokeDashOffset: "strokeDashoffset",
      strokeLineCap: "strokeLinecap",
      strokeLineJoin: "strokeLinejoin",
      strokeMiterLimit: "strokeMiterlimit",
      typeOf: "typeof",
      xLinkActuate: "xlinkActuate",
      xLinkArcRole: "xlinkArcrole",
      xLinkHref: "xlinkHref",
      xLinkRole: "xlinkRole",
      xLinkShow: "xlinkShow",
      xLinkTitle: "xlinkTitle",
      xLinkType: "xlinkType",
      xmlnsXLink: "xmlnsXlink"
    };
  }
});

// node_modules/space-separated-tokens/index.js
var require_space_separated_tokens = __commonJS({
  "node_modules/space-separated-tokens/index.js"(exports2) {
    "use strict";
    exports2.parse = parse;
    exports2.stringify = stringify2;
    var empty = "";
    var space = " ";
    var whiteSpace = /[ \t\n\r\f]+/g;
    function parse(value) {
      var input = String(value || empty).trim();
      return input === empty ? [] : input.split(whiteSpace);
    }
    function stringify2(values) {
      return values.join(space).trim();
    }
  }
});

// node_modules/comma-separated-tokens/index.js
var require_comma_separated_tokens = __commonJS({
  "node_modules/comma-separated-tokens/index.js"(exports2) {
    "use strict";
    exports2.parse = parse;
    exports2.stringify = stringify2;
    var comma = ",";
    var space = " ";
    var empty = "";
    function parse(value) {
      var values = [];
      var input = String(value || empty);
      var index = input.indexOf(comma);
      var lastIndex = 0;
      var end = false;
      var val;
      while (!end) {
        if (index === -1) {
          index = input.length;
          end = true;
        }
        val = input.slice(lastIndex, index).trim();
        if (val || !end) {
          values.push(val);
        }
        lastIndex = index + 1;
        index = input.indexOf(comma, lastIndex);
      }
      return values;
    }
    function stringify2(values, options) {
      var settings = options || {};
      var left = settings.padLeft === false ? empty : space;
      var right = settings.padRight ? space : empty;
      if (values[values.length - 1] === empty) {
        values = values.concat(empty);
      }
      return values.join(right + comma + left).trim();
    }
  }
});

// node_modules/inline-style-parser/index.js
var require_inline_style_parser = __commonJS({
  "node_modules/inline-style-parser/index.js"(exports2, module2) {
    var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
    var NEWLINE_REGEX = /\n/g;
    var WHITESPACE_REGEX = /^\s*/;
    var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
    var COLON_REGEX = /^:\s*/;
    var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
    var SEMICOLON_REGEX = /^[;\s]*/;
    var TRIM_REGEX = /^\s+|\s+$/g;
    var NEWLINE = "\n";
    var FORWARD_SLASH = "/";
    var ASTERISK = "*";
    var EMPTY_STRING = "";
    var TYPE_COMMENT = "comment";
    var TYPE_DECLARATION = "declaration";
    module2.exports = function(style, options) {
      if (typeof style !== "string") {
        throw new TypeError("First argument must be a string");
      }
      if (!style) return [];
      options = options || {};
      var lineno = 1;
      var column = 1;
      function updatePosition(str) {
        var lines = str.match(NEWLINE_REGEX);
        if (lines) lineno += lines.length;
        var i = str.lastIndexOf(NEWLINE);
        column = ~i ? str.length - i : column + str.length;
      }
      function position() {
        var start = { line: lineno, column };
        return function(node) {
          node.position = new Position(start);
          whitespace();
          return node;
        };
      }
      function Position(start) {
        this.start = start;
        this.end = { line: lineno, column };
        this.source = options.source;
      }
      Position.prototype.content = style;
      var errorsList = [];
      function error(msg) {
        var err = new Error(
          options.source + ":" + lineno + ":" + column + ": " + msg
        );
        err.reason = msg;
        err.filename = options.source;
        err.line = lineno;
        err.column = column;
        err.source = style;
        if (options.silent) {
          errorsList.push(err);
        } else {
          throw err;
        }
      }
      function match3(re2) {
        var m = re2.exec(style);
        if (!m) return;
        var str = m[0];
        updatePosition(str);
        style = style.slice(str.length);
        return m;
      }
      function whitespace() {
        match3(WHITESPACE_REGEX);
      }
      function comments(rules) {
        var c;
        rules = rules || [];
        while (c = comment()) {
          if (c !== false) {
            rules.push(c);
          }
        }
        return rules;
      }
      function comment() {
        var pos = position();
        if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
        var i = 2;
        while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) {
          ++i;
        }
        i += 2;
        if (EMPTY_STRING === style.charAt(i - 1)) {
          return error("End of comment missing");
        }
        var str = style.slice(2, i - 2);
        column += 2;
        updatePosition(str);
        style = style.slice(i);
        column += 2;
        return pos({
          type: TYPE_COMMENT,
          comment: str
        });
      }
      function declaration() {
        var pos = position();
        var prop = match3(PROPERTY_REGEX);
        if (!prop) return;
        comment();
        if (!match3(COLON_REGEX)) return error("property missing ':'");
        var val = match3(VALUE_REGEX);
        var ret = pos({
          type: TYPE_DECLARATION,
          property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
          value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
        });
        match3(SEMICOLON_REGEX);
        return ret;
      }
      function declarations() {
        var decls = [];
        comments(decls);
        var decl;
        while (decl = declaration()) {
          if (decl !== false) {
            decls.push(decl);
            comments(decls);
          }
        }
        return decls;
      }
      whitespace();
      return declarations();
    };
    function trim(str) {
      return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
    }
  }
});

// node_modules/style-to-object/index.js
var require_style_to_object = __commonJS({
  "node_modules/style-to-object/index.js"(exports2, module2) {
    var parse = require_inline_style_parser();
    function StyleToObject(style, iterator) {
      var output = null;
      if (!style || typeof style !== "string") {
        return output;
      }
      var declaration;
      var declarations = parse(style);
      var hasIterator = typeof iterator === "function";
      var property;
      var value;
      for (var i = 0, len = declarations.length; i < len; i++) {
        declaration = declarations[i];
        property = declaration.property;
        value = declaration.value;
        if (hasIterator) {
          iterator(property, value, declaration);
        } else if (value) {
          output || (output = {});
          output[property] = value;
        }
      }
      return output;
    }
    module2.exports = StyleToObject;
  }
});

// node_modules/react-markdown/src/ast-to-react.js
var require_ast_to_react = __commonJS({
  "node_modules/react-markdown/src/ast-to-react.js"(exports2) {
    "use strict";
    var React48 = require_react();
    var ReactIs = require_react_is2();
    var svg = require_svg2();
    var find = require_find();
    var hastToReact = require_hast_to_react();
    var spaces = require_space_separated_tokens();
    var commas = require_comma_separated_tokens();
    var style = require_style_to_object();
    exports2.hastToReact = toReact;
    exports2.hastChildrenToReact = childrenToReact;
    var own = {}.hasOwnProperty;
    var tableElements = /* @__PURE__ */ new Set(["table", "thead", "tbody", "tfoot", "tr"]);
    function childrenToReact(context, node) {
      const children = [];
      let childIndex = -1;
      let child;
      while (++childIndex < node.children.length) {
        child = node.children[childIndex];
        if (child.type === "element") {
          children.push(toReact(context, child, childIndex, node));
        } else if (child.type === "text") {
          if (node.type !== "element" || !tableElements.has(node.tagName) || child.value !== "\n") {
            children.push(child.value);
          }
        } else if (child.type === "raw" && !context.options.skipHtml) {
          children.push(child.value);
        }
      }
      return children;
    }
    function toReact(context, node, index, parent) {
      const options = context.options;
      const parentSchema = context.schema;
      const name = node.tagName;
      const properties = {};
      let schema = parentSchema;
      let property;
      if (parentSchema.space === "html" && name === "svg") {
        schema = svg;
        context.schema = schema;
      }
      if (node.properties) {
        for (property in node.properties) {
          if (own.call(node.properties, property)) {
            addProperty(properties, property, node.properties[property], context);
          }
        }
      }
      if (name === "ol" || name === "ul") {
        context.listDepth++;
      }
      const children = childrenToReact(context, node);
      if (name === "ol" || name === "ul") {
        context.listDepth--;
      }
      context.schema = parentSchema;
      const position = node.position || {
        start: { line: null, column: null, offset: null },
        end: { line: null, column: null, offset: null }
      };
      const component = options.components && own.call(options.components, name) ? options.components[name] : name;
      const basic = typeof component === "string" || component === React48.Fragment;
      if (!ReactIs.isValidElementType(component)) {
        throw new TypeError(
          `Component for name \`${name}\` not defined or is not renderable`
        );
      }
      properties.key = [
        name,
        position.start.line,
        position.start.column,
        index
      ].join("-");
      if (name === "a" && options.linkTarget) {
        properties.target = typeof options.linkTarget === "function" ? (
          // @ts-expect-error assume `href` is a string
          options.linkTarget(properties.href, node.children, properties.title)
        ) : options.linkTarget;
      }
      if (name === "a" && options.transformLinkUri) {
        properties.href = options.transformLinkUri(
          // @ts-expect-error assume `href` is a string
          properties.href,
          node.children,
          properties.title
        );
      }
      if (!basic && name === "code" && parent.type === "element" && parent.tagName !== "pre") {
        properties.inline = true;
      }
      if (!basic && (name === "h1" || name === "h2" || name === "h3" || name === "h4" || name === "h5" || name === "h6")) {
        properties.level = parseInt(name.charAt(1), 10);
      }
      if (name === "img" && options.transformImageUri) {
        properties.src = options.transformImageUri(
          // @ts-expect-error assume `src` is a string
          properties.src,
          properties.alt,
          properties.title
        );
      }
      if (!basic && name === "li" && parent.type === "element") {
        const input = getInputElement(node);
        properties.checked = input && input.properties ? Boolean(input.properties.checked) : null;
        properties.index = getElementsBeforeCount(parent, node);
        properties.ordered = parent.tagName === "ol";
      }
      if (!basic && (name === "ol" || name === "ul")) {
        properties.ordered = name === "ol";
        properties.depth = context.listDepth;
      }
      if (name === "td" || name === "th") {
        if (properties.align) {
          if (!properties.style) properties.style = {};
          properties.style.textAlign = properties.align;
          delete properties.align;
        }
        if (!basic) {
          properties.isHeader = name === "th";
        }
      }
      if (!basic && name === "tr" && parent.type === "element") {
        properties.isHeader = Boolean(parent.tagName === "thead");
      }
      if (options.sourcePos) {
        properties["data-sourcepos"] = flattenPosition(position);
      }
      if (!basic && options.rawSourcePos) {
        properties.sourcePosition = node.position;
      }
      if (!basic && options.includeElementIndex) {
        properties.index = getElementsBeforeCount(parent, node);
        properties.siblingCount = getElementsBeforeCount(parent);
      }
      if (!basic) {
        properties.node = node;
      }
      return children.length > 0 ? React48.createElement(component, properties, children) : React48.createElement(component, properties);
    }
    function getInputElement(node) {
      let index = -1;
      while (++index < node.children.length) {
        const child = node.children[index];
        if (child.type === "element" && child.tagName === "input") {
          return child;
        }
      }
      return null;
    }
    function getElementsBeforeCount(parent, node) {
      let index = -1;
      let count = 0;
      while (++index < parent.children.length) {
        if (parent.children[index] === node) break;
        if (parent.children[index].type === "element") count++;
      }
      return count;
    }
    function addProperty(props, prop, value, ctx) {
      const info = find(ctx.schema, prop);
      let result = value;
      if (result === null || result === void 0 || result !== result) {
        return;
      }
      if (result && typeof result === "object" && "length" in result) {
        result = (info.commaSeparated ? commas : spaces).stringify(result);
      }
      if (info.property === "style" && typeof result === "string") {
        result = parseStyle(result);
      }
      if (info.space && info.property) {
        props[own.call(hastToReact, info.property) ? hastToReact[info.property] : info.property] = result;
      } else if (info.attribute) {
        props[info.attribute] = result;
      }
    }
    function parseStyle(value) {
      const result = {};
      try {
        style(value, iterator);
      } catch (_) {
      }
      return result;
      function iterator(name, v) {
        const k = name.slice(0, 4) === "-ms-" ? `ms-${name.slice(4)}` : name;
        result[k.replace(/-([a-z])/g, styleReplacer)] = v;
      }
    }
    function styleReplacer(_, $1) {
      return $1.toUpperCase();
    }
    function flattenPosition(pos) {
      return [
        pos.start.line,
        ":",
        pos.start.column,
        "-",
        pos.end.line,
        ":",
        pos.end.column
      ].map((d) => String(d)).join("");
    }
  }
});

// node_modules/react-markdown/src/react-markdown.js
var require_react_markdown = __commonJS({
  "node_modules/react-markdown/src/react-markdown.js"(exports2, module2) {
    "use strict";
    var React48 = require_react();
    var vfile = require_vfile();
    var unified = require_unified();
    var parse = require_remark_parse();
    var remarkRehype = require_remark_rehype();
    var PropTypes = require_prop_types();
    var html = require_html3();
    var filter = require_rehype_filter();
    var uriTransformer = require_uri_transformer();
    var childrenToReact = require_ast_to_react().hastChildrenToReact;
    module2.exports = ReactMarkdown;
    var own = {}.hasOwnProperty;
    var changelog = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md";
    var deprecated = {
      renderers: { to: "components", id: "change-renderers-to-components" },
      astPlugins: { id: "remove-buggy-html-in-markdown-parser" },
      allowDangerousHtml: { id: "remove-buggy-html-in-markdown-parser" },
      escapeHtml: { id: "remove-buggy-html-in-markdown-parser" },
      source: { to: "children", id: "change-source-to-children" },
      allowNode: {
        to: "allowElement",
        id: "replace-allownode-allowedtypes-and-disallowedtypes"
      },
      allowedTypes: {
        to: "allowedElements",
        id: "replace-allownode-allowedtypes-and-disallowedtypes"
      },
      disallowedTypes: {
        to: "disallowedElements",
        id: "replace-allownode-allowedtypes-and-disallowedtypes"
      },
      includeNodeIndex: {
        to: "includeElementIndex",
        id: "change-includenodeindex-to-includeelementindex"
      }
    };
    function ReactMarkdown(options) {
      for (const key in deprecated) {
        if (own.call(deprecated, key) && own.call(options, key)) {
          const deprecation = deprecated[key];
          console.warn(
            `[react-markdown] Warning: please ${deprecation.to ? `use \`${deprecation.to}\` instead of` : "remove"} \`${key}\` (see <${changelog}#${deprecation.id}> for more info)`
          );
          delete deprecated[key];
        }
      }
      const processor = unified().use(parse).use(options.remarkPlugins || options.plugins || []).use(remarkRehype, { allowDangerousHtml: true }).use(options.rehypePlugins || []).use(filter, options);
      let file;
      if (typeof options.children === "string") {
        file = vfile(options.children);
      } else {
        if (options.children !== void 0 && options.children !== null) {
          console.warn(
            `[react-markdown] Warning: please pass a string as \`children\` (not: \`${options.children}\`)`
          );
        }
        file = vfile();
      }
      const hastNode = processor.runSync(processor.parse(file), file);
      if (hastNode.type !== "root") {
        throw new TypeError("Expected a `root` node");
      }
      let result = React48.createElement(
        React48.Fragment,
        {},
        childrenToReact({ options, schema: html, listDepth: 0 }, hastNode)
      );
      if (options.className) {
        result = React48.createElement("div", { className: options.className }, result);
      }
      return result;
    }
    ReactMarkdown.defaultProps = { transformLinkUri: uriTransformer };
    ReactMarkdown.propTypes = {
      // Core options:
      children: PropTypes.string,
      // Layout options:
      className: PropTypes.string,
      // Filter options:
      allowElement: PropTypes.func,
      allowedElements: PropTypes.arrayOf(PropTypes.string),
      disallowedElements: PropTypes.arrayOf(PropTypes.string),
      unwrapDisallowed: PropTypes.bool,
      // Plugin options:
      // type-coverage:ignore-next-line
      remarkPlugins: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.object,
          PropTypes.func,
          PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func]))
        ])
      ),
      // type-coverage:ignore-next-line
      rehypePlugins: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.object,
          PropTypes.func,
          PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func]))
        ])
      ),
      // Transform options:
      sourcePos: PropTypes.bool,
      rawSourcePos: PropTypes.bool,
      skipHtml: PropTypes.bool,
      includeElementIndex: PropTypes.bool,
      transformLinkUri: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
      linkTarget: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      transformImageUri: PropTypes.func,
      components: PropTypes.object
    };
    ReactMarkdown.uriTransformer = uriTransformer;
  }
});

// node_modules/micromark-extension-gfm-autolink-literal/syntax.js
var require_syntax = __commonJS({
  "node_modules/micromark-extension-gfm-autolink-literal/syntax.js"(exports2) {
    var asciiAlpha = require_ascii_alpha();
    var asciiAlphanumeric = require_ascii_alphanumeric();
    var asciiControl = require_ascii_control();
    var markdownLineEnding = require_markdown_line_ending();
    var unicodePunctuation = require_unicode_punctuation();
    var unicodeWhitespace = require_unicode_whitespace();
    var www = { tokenize: tokenizeWww, partial: true };
    var domain = { tokenize: tokenizeDomain, partial: true };
    var path = { tokenize: tokenizePath, partial: true };
    var punctuation = { tokenize: tokenizePunctuation, partial: true };
    var namedCharacterReference = {
      tokenize: tokenizeNamedCharacterReference,
      partial: true
    };
    var wwwAutolink = { tokenize: tokenizeWwwAutolink, previous: previousWww };
    var httpAutolink = { tokenize: tokenizeHttpAutolink, previous: previousHttp };
    var emailAutolink = { tokenize: tokenizeEmailAutolink, previous: previousEmail };
    var text = {};
    exports2.text = text;
    var code = 48;
    while (code < 123) {
      text[code] = emailAutolink;
      code++;
      if (code === 58) code = 65;
      else if (code === 91) code = 97;
    }
    text[43] = emailAutolink;
    text[45] = emailAutolink;
    text[46] = emailAutolink;
    text[95] = emailAutolink;
    text[72] = [emailAutolink, httpAutolink];
    text[104] = [emailAutolink, httpAutolink];
    text[87] = [emailAutolink, wwwAutolink];
    text[119] = [emailAutolink, wwwAutolink];
    function tokenizeEmailAutolink(effects, ok, nok) {
      var self2 = this;
      var hasDot;
      return start;
      function start(code2) {
        if (!gfmAtext(code2) || !previousEmail(self2.previous) || previous(self2.events)) {
          return nok(code2);
        }
        effects.enter("literalAutolink");
        effects.enter("literalAutolinkEmail");
        return atext(code2);
      }
      function atext(code2) {
        if (gfmAtext(code2)) {
          effects.consume(code2);
          return atext;
        }
        if (code2 === 64) {
          effects.consume(code2);
          return label;
        }
        return nok(code2);
      }
      function label(code2) {
        if (code2 === 46) {
          return effects.check(punctuation, done, dotContinuation)(code2);
        }
        if (
          // `-`
          code2 === 45 || // `_`
          code2 === 95
        ) {
          return effects.check(punctuation, nok, dashOrUnderscoreContinuation)(code2);
        }
        if (asciiAlphanumeric(code2)) {
          effects.consume(code2);
          return label;
        }
        return done(code2);
      }
      function dotContinuation(code2) {
        effects.consume(code2);
        hasDot = true;
        return label;
      }
      function dashOrUnderscoreContinuation(code2) {
        effects.consume(code2);
        return afterDashOrUnderscore;
      }
      function afterDashOrUnderscore(code2) {
        if (code2 === 46) {
          return effects.check(punctuation, nok, dotContinuation)(code2);
        }
        return label(code2);
      }
      function done(code2) {
        if (hasDot) {
          effects.exit("literalAutolinkEmail");
          effects.exit("literalAutolink");
          return ok(code2);
        }
        return nok(code2);
      }
    }
    function tokenizeWwwAutolink(effects, ok, nok) {
      var self2 = this;
      return start;
      function start(code2) {
        if (code2 !== 87 && code2 - 32 !== 87 || !previousWww(self2.previous) || previous(self2.events)) {
          return nok(code2);
        }
        effects.enter("literalAutolink");
        effects.enter("literalAutolinkWww");
        return effects.check(
          www,
          effects.attempt(domain, effects.attempt(path, done), nok),
          nok
        )(code2);
      }
      function done(code2) {
        effects.exit("literalAutolinkWww");
        effects.exit("literalAutolink");
        return ok(code2);
      }
    }
    function tokenizeHttpAutolink(effects, ok, nok) {
      var self2 = this;
      return start;
      function start(code2) {
        if (code2 !== 72 && code2 - 32 !== 72 || !previousHttp(self2.previous) || previous(self2.events)) {
          return nok(code2);
        }
        effects.enter("literalAutolink");
        effects.enter("literalAutolinkHttp");
        effects.consume(code2);
        return t1;
      }
      function t1(code2) {
        if (code2 === 84 || code2 - 32 === 84) {
          effects.consume(code2);
          return t2;
        }
        return nok(code2);
      }
      function t2(code2) {
        if (code2 === 84 || code2 - 32 === 84) {
          effects.consume(code2);
          return p;
        }
        return nok(code2);
      }
      function p(code2) {
        if (code2 === 80 || code2 - 32 === 80) {
          effects.consume(code2);
          return s;
        }
        return nok(code2);
      }
      function s(code2) {
        if (code2 === 83 || code2 - 32 === 83) {
          effects.consume(code2);
          return colon;
        }
        return colon(code2);
      }
      function colon(code2) {
        if (code2 === 58) {
          effects.consume(code2);
          return slash1;
        }
        return nok(code2);
      }
      function slash1(code2) {
        if (code2 === 47) {
          effects.consume(code2);
          return slash2;
        }
        return nok(code2);
      }
      function slash2(code2) {
        if (code2 === 47) {
          effects.consume(code2);
          return after;
        }
        return nok(code2);
      }
      function after(code2) {
        return asciiControl(code2) || unicodeWhitespace(code2) || unicodePunctuation(code2) ? nok(code2) : effects.attempt(domain, effects.attempt(path, done), nok)(code2);
      }
      function done(code2) {
        effects.exit("literalAutolinkHttp");
        effects.exit("literalAutolink");
        return ok(code2);
      }
    }
    function tokenizeWww(effects, ok, nok) {
      return start;
      function start(code2) {
        effects.consume(code2);
        return w2;
      }
      function w2(code2) {
        if (code2 === 87 || code2 - 32 === 87) {
          effects.consume(code2);
          return w3;
        }
        return nok(code2);
      }
      function w3(code2) {
        if (code2 === 87 || code2 - 32 === 87) {
          effects.consume(code2);
          return dot;
        }
        return nok(code2);
      }
      function dot(code2) {
        if (code2 === 46) {
          effects.consume(code2);
          return after;
        }
        return nok(code2);
      }
      function after(code2) {
        return code2 === null || markdownLineEnding(code2) ? nok(code2) : ok(code2);
      }
    }
    function tokenizeDomain(effects, ok, nok) {
      var hasUnderscoreInLastSegment;
      var hasUnderscoreInLastLastSegment;
      return domain2;
      function domain2(code2) {
        if (code2 === 38) {
          return effects.check(
            namedCharacterReference,
            done,
            punctuationContinuation
          )(code2);
        }
        if (code2 === 46 || code2 === 95) {
          return effects.check(punctuation, done, punctuationContinuation)(code2);
        }
        if (asciiControl(code2) || unicodeWhitespace(code2) || code2 !== 45 && unicodePunctuation(code2)) {
          return done(code2);
        }
        effects.consume(code2);
        return domain2;
      }
      function punctuationContinuation(code2) {
        if (code2 === 46) {
          hasUnderscoreInLastLastSegment = hasUnderscoreInLastSegment;
          hasUnderscoreInLastSegment = void 0;
          effects.consume(code2);
          return domain2;
        }
        if (code2 === 95) hasUnderscoreInLastSegment = true;
        effects.consume(code2);
        return domain2;
      }
      function done(code2) {
        if (!hasUnderscoreInLastLastSegment && !hasUnderscoreInLastSegment) {
          return ok(code2);
        }
        return nok(code2);
      }
    }
    function tokenizePath(effects, ok) {
      var balance = 0;
      return inPath;
      function inPath(code2) {
        if (code2 === 38) {
          return effects.check(
            namedCharacterReference,
            ok,
            continuedPunctuation
          )(code2);
        }
        if (code2 === 40) {
          balance++;
        }
        if (code2 === 41) {
          return effects.check(
            punctuation,
            parenAtPathEnd,
            continuedPunctuation
          )(code2);
        }
        if (pathEnd(code2)) {
          return ok(code2);
        }
        if (trailingPunctuation(code2)) {
          return effects.check(punctuation, ok, continuedPunctuation)(code2);
        }
        effects.consume(code2);
        return inPath;
      }
      function continuedPunctuation(code2) {
        effects.consume(code2);
        return inPath;
      }
      function parenAtPathEnd(code2) {
        balance--;
        return balance < 0 ? ok(code2) : continuedPunctuation(code2);
      }
    }
    function tokenizeNamedCharacterReference(effects, ok, nok) {
      return start;
      function start(code2) {
        effects.consume(code2);
        return inside;
      }
      function inside(code2) {
        if (asciiAlpha(code2)) {
          effects.consume(code2);
          return inside;
        }
        if (code2 === 59) {
          effects.consume(code2);
          return after;
        }
        return nok(code2);
      }
      function after(code2) {
        return pathEnd(code2) ? ok(code2) : nok(code2);
      }
    }
    function tokenizePunctuation(effects, ok, nok) {
      return start;
      function start(code2) {
        effects.consume(code2);
        return after;
      }
      function after(code2) {
        if (trailingPunctuation(code2)) {
          effects.consume(code2);
          return after;
        }
        return pathEnd(code2) ? ok(code2) : nok(code2);
      }
    }
    function trailingPunctuation(code2) {
      return (
        // `!`
        code2 === 33 || // `"`
        code2 === 34 || // `'`
        code2 === 39 || // `)`
        code2 === 41 || // `*`
        code2 === 42 || // `,`
        code2 === 44 || // `.`
        code2 === 46 || // `:`
        code2 === 58 || // `;`
        code2 === 59 || // `<`
        code2 === 60 || // `?`
        code2 === 63 || // `_`.
        code2 === 95 || // `~`
        code2 === 126
      );
    }
    function pathEnd(code2) {
      return (
        // EOF.
        code2 === null || // CR, LF, CRLF, HT, VS.
        code2 < 0 || // Space.
        code2 === 32 || // `<`
        code2 === 60
      );
    }
    function gfmAtext(code2) {
      return code2 === 43 || code2 === 45 || code2 === 46 || code2 === 95 || asciiAlphanumeric(code2);
    }
    function previousWww(code2) {
      return code2 === null || code2 < 0 || code2 === 32 || code2 === 40 || code2 === 42 || code2 === 95 || code2 === 126;
    }
    function previousHttp(code2) {
      return code2 === null || !asciiAlpha(code2);
    }
    function previousEmail(code2) {
      return code2 !== 47 && previousHttp(code2);
    }
    function previous(events) {
      var index = events.length;
      while (index--) {
        if ((events[index][1].type === "labelLink" || events[index][1].type === "labelImage") && !events[index][1]._balanced) {
          return true;
        }
      }
    }
  }
});

// node_modules/micromark-extension-gfm-autolink-literal/index.js
var require_micromark_extension_gfm_autolink_literal = __commonJS({
  "node_modules/micromark-extension-gfm-autolink-literal/index.js"(exports2, module2) {
    module2.exports = require_syntax();
  }
});

// node_modules/micromark-extension-gfm-strikethrough/index.js
var require_micromark_extension_gfm_strikethrough = __commonJS({
  "node_modules/micromark-extension-gfm-strikethrough/index.js"(exports2, module2) {
    module2.exports = create2;
    var classifyCharacter = require_classify_character();
    var chunkedSplice = require_chunked_splice();
    var resolveAll = require_resolve_all();
    var shallow = require_shallow();
    function create2(options) {
      var settings = options || {};
      var single = settings.singleTilde;
      var tokenizer = {
        tokenize: tokenizeStrikethrough,
        resolveAll: resolveAllStrikethrough
      };
      if (single === null || single === void 0) {
        single = true;
      }
      return { text: { 126: tokenizer }, insideSpan: { null: tokenizer } };
      function resolveAllStrikethrough(events, context) {
        var index = -1;
        var strikethrough;
        var text;
        var open;
        var nextEvents;
        while (++index < events.length) {
          if (events[index][0] === "enter" && events[index][1].type === "strikethroughSequenceTemporary" && events[index][1]._close) {
            open = index;
            while (open--) {
              if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && // If the sizes are the same:
              events[index][1].end.offset - events[index][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
                events[index][1].type = "strikethroughSequence";
                events[open][1].type = "strikethroughSequence";
                strikethrough = {
                  type: "strikethrough",
                  start: shallow(events[open][1].start),
                  end: shallow(events[index][1].end)
                };
                text = {
                  type: "strikethroughText",
                  start: shallow(events[open][1].end),
                  end: shallow(events[index][1].start)
                };
                nextEvents = [
                  ["enter", strikethrough, context],
                  ["enter", events[open][1], context],
                  ["exit", events[open][1], context],
                  ["enter", text, context]
                ];
                chunkedSplice(
                  nextEvents,
                  nextEvents.length,
                  0,
                  resolveAll(
                    context.parser.constructs.insideSpan.null,
                    events.slice(open + 1, index),
                    context
                  )
                );
                chunkedSplice(nextEvents, nextEvents.length, 0, [
                  ["exit", text, context],
                  ["enter", events[index][1], context],
                  ["exit", events[index][1], context],
                  ["exit", strikethrough, context]
                ]);
                chunkedSplice(events, open - 1, index - open + 3, nextEvents);
                index = open + nextEvents.length - 2;
                break;
              }
            }
          }
        }
        return removeRemainingSequences(events);
      }
      function removeRemainingSequences(events) {
        var index = -1;
        var length = events.length;
        while (++index < length) {
          if (events[index][1].type === "strikethroughSequenceTemporary") {
            events[index][1].type = "data";
          }
        }
        return events;
      }
      function tokenizeStrikethrough(effects, ok, nok) {
        var previous = this.previous;
        var events = this.events;
        var size = 0;
        return start;
        function start(code) {
          if (code !== 126 || previous === 126 && events[events.length - 1][1].type !== "characterEscape") {
            return nok(code);
          }
          effects.enter("strikethroughSequenceTemporary");
          return more(code);
        }
        function more(code) {
          var before = classifyCharacter(previous);
          var token2;
          var after;
          if (code === 126) {
            if (size > 1) return nok(code);
            effects.consume(code);
            size++;
            return more;
          }
          if (size < 2 && !single) return nok(code);
          token2 = effects.exit("strikethroughSequenceTemporary");
          after = classifyCharacter(code);
          token2._open = !after || after === 2 && before;
          token2._close = !before || before === 2 && after;
          return ok(code);
        }
      }
    }
  }
});

// node_modules/micromark-extension-gfm-table/syntax.js
var require_syntax2 = __commonJS({
  "node_modules/micromark-extension-gfm-table/syntax.js"(exports2) {
    exports2.flow = {
      null: { tokenize: tokenizeTable, resolve: resolveTable, interruptible: true }
    };
    var createSpace = require_factory_space();
    var setextUnderlineMini = { tokenize: tokenizeSetextUnderlineMini, partial: true };
    var nextPrefixedOrBlank = { tokenize: tokenizeNextPrefixedOrBlank, partial: true };
    function resolveTable(events, context) {
      var length = events.length;
      var index = -1;
      var token2;
      var inHead;
      var inDelimiterRow;
      var inRow;
      var cell;
      var content;
      var text;
      var contentStart;
      var contentEnd;
      var cellStart;
      while (++index < length) {
        token2 = events[index][1];
        if (inRow) {
          if (token2.type === "temporaryTableCellContent") {
            contentStart = contentStart || index;
            contentEnd = index;
          }
          if (
            // Combine separate content parts into one.
            (token2.type === "tableCellDivider" || token2.type === "tableRow") && contentEnd
          ) {
            content = {
              type: "tableContent",
              start: events[contentStart][1].start,
              end: events[contentEnd][1].end
            };
            text = {
              type: "chunkText",
              start: content.start,
              end: content.end,
              contentType: "text"
            };
            events.splice(
              contentStart,
              contentEnd - contentStart + 1,
              ["enter", content, context],
              ["enter", text, context],
              ["exit", text, context],
              ["exit", content, context]
            );
            index -= contentEnd - contentStart - 3;
            length = events.length;
            contentStart = void 0;
            contentEnd = void 0;
          }
        }
        if (events[index][0] === "exit" && cellStart && cellStart + 1 < index && (token2.type === "tableCellDivider" || token2.type === "tableRow" && (cellStart + 3 < index || events[cellStart][1].type !== "whitespace"))) {
          cell = {
            type: inDelimiterRow ? "tableDelimiter" : inHead ? "tableHeader" : "tableData",
            start: events[cellStart][1].start,
            end: events[index][1].end
          };
          events.splice(index + (token2.type === "tableCellDivider" ? 1 : 0), 0, [
            "exit",
            cell,
            context
          ]);
          events.splice(cellStart, 0, ["enter", cell, context]);
          index += 2;
          length = events.length;
          cellStart = index + 1;
        }
        if (token2.type === "tableRow") {
          inRow = events[index][0] === "enter";
          if (inRow) {
            cellStart = index + 1;
          }
        }
        if (token2.type === "tableDelimiterRow") {
          inDelimiterRow = events[index][0] === "enter";
          if (inDelimiterRow) {
            cellStart = index + 1;
          }
        }
        if (token2.type === "tableHead") {
          inHead = events[index][0] === "enter";
        }
      }
      return events;
    }
    function tokenizeTable(effects, ok, nok) {
      var align = [];
      var tableHeaderCount = 0;
      var seenDelimiter;
      var hasDash;
      return start;
      function start(code) {
        if (code === null || code === -5 || code === -4 || code === -3) {
          return nok(code);
        }
        effects.enter("table")._align = align;
        effects.enter("tableHead");
        effects.enter("tableRow");
        if (code === 124) {
          return cellDividerHead(code);
        }
        tableHeaderCount++;
        effects.enter("temporaryTableCellContent");
        return inCellContentHead(code);
      }
      function cellDividerHead(code) {
        effects.enter("tableCellDivider");
        effects.consume(code);
        effects.exit("tableCellDivider");
        seenDelimiter = true;
        return cellBreakHead;
      }
      function cellBreakHead(code) {
        if (code === null || code === -5 || code === -4 || code === -3) {
          return atRowEndHead(code);
        }
        if (code === -2 || code === -1 || code === 32) {
          effects.enter("whitespace");
          effects.consume(code);
          return inWhitespaceHead;
        }
        if (seenDelimiter) {
          seenDelimiter = void 0;
          tableHeaderCount++;
        }
        if (code === 124) {
          return cellDividerHead(code);
        }
        effects.enter("temporaryTableCellContent");
        return inCellContentHead(code);
      }
      function inWhitespaceHead(code) {
        if (code === -2 || code === -1 || code === 32) {
          effects.consume(code);
          return inWhitespaceHead;
        }
        effects.exit("whitespace");
        return cellBreakHead(code);
      }
      function inCellContentHead(code) {
        if (code === null || code < 0 || code === 32 || code === 124) {
          effects.exit("temporaryTableCellContent");
          return cellBreakHead(code);
        }
        effects.consume(code);
        return code === 92 ? inCellContentEscapeHead : inCellContentHead;
      }
      function inCellContentEscapeHead(code) {
        if (code === 92 || code === 124) {
          effects.consume(code);
          return inCellContentHead;
        }
        return inCellContentHead(code);
      }
      function atRowEndHead(code) {
        if (code === null) {
          return nok(code);
        }
        effects.exit("tableRow");
        effects.exit("tableHead");
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return effects.check(
          setextUnderlineMini,
          nok,
          // Support an indent before the delimiter row.
          createSpace(effects, rowStartDelimiter, "linePrefix", 4)
        );
      }
      function rowStartDelimiter(code) {
        if (code === null || code < 0 || code === 32) {
          return nok(code);
        }
        effects.enter("tableDelimiterRow");
        return atDelimiterRowBreak(code);
      }
      function atDelimiterRowBreak(code) {
        if (code === null || code === -5 || code === -4 || code === -3) {
          return rowEndDelimiter(code);
        }
        if (code === -2 || code === -1 || code === 32) {
          effects.enter("whitespace");
          effects.consume(code);
          return inWhitespaceDelimiter;
        }
        if (code === 45) {
          effects.enter("tableDelimiterFiller");
          effects.consume(code);
          hasDash = true;
          align.push(null);
          return inFillerDelimiter;
        }
        if (code === 58) {
          effects.enter("tableDelimiterAlignment");
          effects.consume(code);
          effects.exit("tableDelimiterAlignment");
          align.push("left");
          return afterLeftAlignment;
        }
        if (code === 124) {
          effects.enter("tableCellDivider");
          effects.consume(code);
          effects.exit("tableCellDivider");
          return atDelimiterRowBreak;
        }
        return nok(code);
      }
      function inWhitespaceDelimiter(code) {
        if (code === -2 || code === -1 || code === 32) {
          effects.consume(code);
          return inWhitespaceDelimiter;
        }
        effects.exit("whitespace");
        return atDelimiterRowBreak(code);
      }
      function inFillerDelimiter(code) {
        if (code === 45) {
          effects.consume(code);
          return inFillerDelimiter;
        }
        effects.exit("tableDelimiterFiller");
        if (code === 58) {
          effects.enter("tableDelimiterAlignment");
          effects.consume(code);
          effects.exit("tableDelimiterAlignment");
          align[align.length - 1] = align[align.length - 1] === "left" ? "center" : "right";
          return afterRightAlignment;
        }
        return atDelimiterRowBreak(code);
      }
      function afterLeftAlignment(code) {
        if (code === 45) {
          effects.enter("tableDelimiterFiller");
          effects.consume(code);
          hasDash = true;
          return inFillerDelimiter;
        }
        return nok(code);
      }
      function afterRightAlignment(code) {
        if (code === null || code === -5 || code === -4 || code === -3) {
          return rowEndDelimiter(code);
        }
        if (code === -2 || code === -1 || code === 32) {
          effects.enter("whitespace");
          effects.consume(code);
          return inWhitespaceDelimiter;
        }
        if (code === 124) {
          effects.enter("tableCellDivider");
          effects.consume(code);
          effects.exit("tableCellDivider");
          return atDelimiterRowBreak;
        }
        return nok(code);
      }
      function rowEndDelimiter(code) {
        effects.exit("tableDelimiterRow");
        if (!hasDash || tableHeaderCount !== align.length) {
          return nok(code);
        }
        if (code === null) {
          return tableClose(code);
        }
        return effects.check(nextPrefixedOrBlank, tableClose, tableContinue)(code);
      }
      function tableClose(code) {
        effects.exit("table");
        return ok(code);
      }
      function tableContinue(code) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return createSpace(effects, bodyStart, "linePrefix", 4);
      }
      function bodyStart(code) {
        effects.enter("tableBody");
        return rowStartBody(code);
      }
      function rowStartBody(code) {
        effects.enter("tableRow");
        if (code === 124) {
          return cellDividerBody(code);
        }
        effects.enter("temporaryTableCellContent");
        return inCellContentBody(code);
      }
      function cellDividerBody(code) {
        effects.enter("tableCellDivider");
        effects.consume(code);
        effects.exit("tableCellDivider");
        return cellBreakBody;
      }
      function cellBreakBody(code) {
        if (code === null || code === -5 || code === -4 || code === -3) {
          return atRowEndBody(code);
        }
        if (code === -2 || code === -1 || code === 32) {
          effects.enter("whitespace");
          effects.consume(code);
          return inWhitespaceBody;
        }
        if (code === 124) {
          return cellDividerBody(code);
        }
        effects.enter("temporaryTableCellContent");
        return inCellContentBody(code);
      }
      function inWhitespaceBody(code) {
        if (code === -2 || code === -1 || code === 32) {
          effects.consume(code);
          return inWhitespaceBody;
        }
        effects.exit("whitespace");
        return cellBreakBody(code);
      }
      function inCellContentBody(code) {
        if (code === null || code < 0 || code === 32 || code === 124) {
          effects.exit("temporaryTableCellContent");
          return cellBreakBody(code);
        }
        effects.consume(code);
        return code === 92 ? inCellContentEscapeBody : inCellContentBody;
      }
      function inCellContentEscapeBody(code) {
        if (code === 92 || code === 124) {
          effects.consume(code);
          return inCellContentBody;
        }
        return inCellContentBody(code);
      }
      function atRowEndBody(code) {
        effects.exit("tableRow");
        if (code === null) {
          return tableBodyClose(code);
        }
        return effects.check(
          nextPrefixedOrBlank,
          tableBodyClose,
          tableBodyContinue
        )(code);
      }
      function tableBodyClose(code) {
        effects.exit("tableBody");
        return tableClose(code);
      }
      function tableBodyContinue(code) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return createSpace(effects, rowStartBody, "linePrefix", 4);
      }
    }
    function tokenizeSetextUnderlineMini(effects, ok, nok) {
      return start;
      function start(code) {
        if (code !== 45) {
          return nok(code);
        }
        effects.enter("setextUnderline");
        return sequence(code);
      }
      function sequence(code) {
        if (code === 45) {
          effects.consume(code);
          return sequence;
        }
        return whitespace(code);
      }
      function whitespace(code) {
        if (code === -2 || code === -1 || code === 32) {
          effects.consume(code);
          return whitespace;
        }
        if (code === null || code === -5 || code === -4 || code === -3) {
          return ok(code);
        }
        return nok(code);
      }
    }
    function tokenizeNextPrefixedOrBlank(effects, ok, nok) {
      var size = 0;
      return start;
      function start(code) {
        effects.enter("check");
        effects.consume(code);
        return whitespace;
      }
      function whitespace(code) {
        if (code === -1 || code === 32) {
          effects.consume(code);
          size++;
          return size === 4 ? ok : whitespace;
        }
        if (code === null || code < 0) {
          return ok(code);
        }
        return nok(code);
      }
    }
  }
});

// node_modules/micromark-extension-gfm-table/index.js
var require_micromark_extension_gfm_table = __commonJS({
  "node_modules/micromark-extension-gfm-table/index.js"(exports2, module2) {
    module2.exports = require_syntax2();
  }
});

// node_modules/micromark-extension-gfm-task-list-item/syntax.js
var require_syntax3 = __commonJS({
  "node_modules/micromark-extension-gfm-task-list-item/syntax.js"(exports2) {
    var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
    var spaceFactory = require_factory_space();
    var prefixSize = require_prefix_size();
    var tasklistCheck = { tokenize: tokenizeTasklistCheck };
    exports2.text = { 91: tasklistCheck };
    function tokenizeTasklistCheck(effects, ok, nok) {
      var self2 = this;
      return open;
      function open(code) {
        if (
          // Exit if not `[`.
          code !== 91 || // Exit if there’s stuff before.
          self2.previous !== null || // Exit if not in the first content that is the first child of a list
          // item.
          !self2._gfmTasklistFirstContentOfListItem
        ) {
          return nok(code);
        }
        effects.enter("taskListCheck");
        effects.enter("taskListCheckMarker");
        effects.consume(code);
        effects.exit("taskListCheckMarker");
        return inside;
      }
      function inside(code) {
        if (code === -2 || code === 32) {
          effects.enter("taskListCheckValueUnchecked");
          effects.consume(code);
          effects.exit("taskListCheckValueUnchecked");
          return close;
        }
        if (code === 88 || code === 120) {
          effects.enter("taskListCheckValueChecked");
          effects.consume(code);
          effects.exit("taskListCheckValueChecked");
          return close;
        }
        return nok(code);
      }
      function close(code) {
        if (code === 93) {
          effects.enter("taskListCheckMarker");
          effects.consume(code);
          effects.exit("taskListCheckMarker");
          effects.exit("taskListCheck");
          return effects.check({ tokenize: spaceThenNonSpace }, ok, nok);
        }
        return nok(code);
      }
    }
    function spaceThenNonSpace(effects, ok, nok) {
      var self2 = this;
      return spaceFactory(effects, after, "whitespace");
      function after(code) {
        return prefixSize(self2.events, "whitespace") && code !== null && !markdownLineEndingOrSpace(code) ? ok(code) : nok(code);
      }
    }
  }
});

// node_modules/micromark-extension-gfm-task-list-item/index.js
var require_micromark_extension_gfm_task_list_item = __commonJS({
  "node_modules/micromark-extension-gfm-task-list-item/index.js"(exports2, module2) {
    module2.exports = require_syntax3();
  }
});

// node_modules/micromark-extension-gfm/syntax.js
var require_syntax4 = __commonJS({
  "node_modules/micromark-extension-gfm/syntax.js"(exports2, module2) {
    var combine = require_combine_extensions();
    var autolink = require_micromark_extension_gfm_autolink_literal();
    var strikethrough = require_micromark_extension_gfm_strikethrough();
    var table2 = require_micromark_extension_gfm_table();
    var tasklist = require_micromark_extension_gfm_task_list_item();
    module2.exports = create2;
    function create2(options) {
      return combine([autolink, strikethrough(options), table2, tasklist]);
    }
  }
});

// node_modules/micromark-extension-gfm/index.js
var require_micromark_extension_gfm = __commonJS({
  "node_modules/micromark-extension-gfm/index.js"(exports2, module2) {
    module2.exports = require_syntax4();
  }
});

// node_modules/mdast-util-gfm-autolink-literal/node_modules/ccount/index.js
var require_ccount = __commonJS({
  "node_modules/mdast-util-gfm-autolink-literal/node_modules/ccount/index.js"(exports2, module2) {
    "use strict";
    module2.exports = ccount;
    function ccount(source, character) {
      var value = String(source);
      var count = 0;
      var index;
      if (typeof character !== "string") {
        throw new Error("Expected character");
      }
      index = value.indexOf(character);
      while (index !== -1) {
        count++;
        index = value.indexOf(character, index + character.length);
      }
      return count;
    }
  }
});

// node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (string) => {
      if (typeof string !== "string") {
        throw new TypeError("Expected a string");
      }
      return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    };
  }
});

// node_modules/mdast-util-find-and-replace/index.js
var require_mdast_util_find_and_replace = __commonJS({
  "node_modules/mdast-util-find-and-replace/index.js"(exports2, module2) {
    "use strict";
    module2.exports = findAndReplace;
    var visit = require_unist_util_visit_parents();
    var convert = require_convert();
    var escape = require_escape_string_regexp();
    var splice = [].splice;
    function findAndReplace(tree, find, replace, options) {
      var settings;
      var schema;
      if (typeof find === "string" || find && typeof find.exec === "function") {
        schema = [[find, replace]];
      } else {
        schema = find;
        options = replace;
      }
      settings = options || {};
      search(tree, settings, handlerFactory(toPairs(schema)));
      return tree;
      function handlerFactory(pairs) {
        var pair = pairs[0];
        return handler;
        function handler(node, parent) {
          var find2 = pair[0];
          var replace2 = pair[1];
          var nodes = [];
          var start = 0;
          var index = parent.children.indexOf(node);
          var position;
          var match3;
          var subhandler;
          var value;
          find2.lastIndex = 0;
          match3 = find2.exec(node.value);
          while (match3) {
            position = match3.index;
            value = replace2.apply(
              null,
              [].concat(match3, { index: match3.index, input: match3.input })
            );
            if (value !== false) {
              if (start !== position) {
                nodes.push({ type: "text", value: node.value.slice(start, position) });
              }
              if (typeof value === "string" && value.length > 0) {
                value = { type: "text", value };
              }
              if (value) {
                nodes = [].concat(nodes, value);
              }
              start = position + match3[0].length;
            }
            if (!find2.global) {
              break;
            }
            match3 = find2.exec(node.value);
          }
          if (position === void 0) {
            nodes = [node];
            index--;
          } else {
            if (start < node.value.length) {
              nodes.push({ type: "text", value: node.value.slice(start) });
            }
            nodes.unshift(index, 1);
            splice.apply(parent.children, nodes);
          }
          if (pairs.length > 1) {
            subhandler = handlerFactory(pairs.slice(1));
            position = -1;
            while (++position < nodes.length) {
              node = nodes[position];
              if (node.type === "text") {
                subhandler(node, parent);
              } else {
                search(node, settings, subhandler);
              }
            }
          }
          return index + nodes.length + 1;
        }
      }
    }
    function search(tree, settings, handler) {
      var ignored = convert(settings.ignore || []);
      var result = [];
      visit(tree, "text", visitor);
      return result;
      function visitor(node, parents) {
        var index = -1;
        var parent;
        var grandparent;
        while (++index < parents.length) {
          parent = parents[index];
          if (ignored(
            parent,
            grandparent ? grandparent.children.indexOf(parent) : void 0,
            grandparent
          )) {
            return;
          }
          grandparent = parent;
        }
        return handler(node, grandparent);
      }
    }
    function toPairs(schema) {
      var result = [];
      var key;
      var index;
      if (typeof schema !== "object") {
        throw new Error("Expected array or object as schema");
      }
      if ("length" in schema) {
        index = -1;
        while (++index < schema.length) {
          result.push([
            toExpression(schema[index][0]),
            toFunction(schema[index][1])
          ]);
        }
      } else {
        for (key in schema) {
          result.push([toExpression(key), toFunction(schema[key])]);
        }
      }
      return result;
    }
    function toExpression(find) {
      return typeof find === "string" ? new RegExp(escape(find), "g") : find;
    }
    function toFunction(replace) {
      return typeof replace === "function" ? replace : returner;
      function returner() {
        return replace;
      }
    }
  }
});

// node_modules/mdast-util-gfm-autolink-literal/from-markdown.js
var require_from_markdown = __commonJS({
  "node_modules/mdast-util-gfm-autolink-literal/from-markdown.js"(exports2) {
    var ccount = require_ccount();
    var findAndReplace = require_mdast_util_find_and_replace();
    var unicodePunctuation = require_unicode_punctuation();
    var unicodeWhitespace = require_unicode_whitespace();
    exports2.transforms = [transformGfmAutolinkLiterals];
    exports2.enter = {
      literalAutolink: enterLiteralAutolink,
      literalAutolinkEmail: enterLiteralAutolinkValue,
      literalAutolinkHttp: enterLiteralAutolinkValue,
      literalAutolinkWww: enterLiteralAutolinkValue
    };
    exports2.exit = {
      literalAutolink: exitLiteralAutolink,
      literalAutolinkEmail: exitLiteralAutolinkEmail,
      literalAutolinkHttp: exitLiteralAutolinkHttp,
      literalAutolinkWww: exitLiteralAutolinkWww
    };
    function enterLiteralAutolink(token2) {
      this.enter({ type: "link", title: null, url: "", children: [] }, token2);
    }
    function enterLiteralAutolinkValue(token2) {
      this.config.enter.autolinkProtocol.call(this, token2);
    }
    function exitLiteralAutolinkHttp(token2) {
      this.config.exit.autolinkProtocol.call(this, token2);
    }
    function exitLiteralAutolinkWww(token2) {
      this.config.exit.data.call(this, token2);
      this.stack[this.stack.length - 1].url = "http://" + this.sliceSerialize(token2);
    }
    function exitLiteralAutolinkEmail(token2) {
      this.config.exit.autolinkEmail.call(this, token2);
    }
    function exitLiteralAutolink(token2) {
      this.exit(token2);
    }
    function transformGfmAutolinkLiterals(tree) {
      findAndReplace(
        tree,
        [
          [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/i, findUrl],
          [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/, findEmail]
        ],
        { ignore: ["link", "linkReference"] }
      );
    }
    function findUrl($0, protocol, domain, path, match3) {
      var prefix = "";
      var parts;
      var result;
      if (!previous(match3)) {
        return false;
      }
      if (/^w/i.test(protocol)) {
        domain = protocol + domain;
        protocol = "";
        prefix = "http://";
      }
      if (!isCorrectDomain(domain)) {
        return false;
      }
      parts = splitUrl(domain + path);
      if (!parts[0]) return false;
      result = {
        type: "link",
        title: null,
        url: prefix + protocol + parts[0],
        children: [{ type: "text", value: protocol + parts[0] }]
      };
      if (parts[1]) {
        result = [result, { type: "text", value: parts[1] }];
      }
      return result;
    }
    function findEmail($0, atext, label, match3) {
      if (!previous(match3, true) || /[_-]$/.test(label)) {
        return false;
      }
      return {
        type: "link",
        title: null,
        url: "mailto:" + atext + "@" + label,
        children: [{ type: "text", value: atext + "@" + label }]
      };
    }
    function isCorrectDomain(domain) {
      var parts = domain.split(".");
      if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
        return false;
      }
      return true;
    }
    function splitUrl(url) {
      var trail = /[!"&'),.:;<>?\]}]+$/.exec(url);
      var closingParenIndex;
      var openingParens;
      var closingParens;
      if (trail) {
        url = url.slice(0, trail.index);
        trail = trail[0];
        closingParenIndex = trail.indexOf(")");
        openingParens = ccount(url, "(");
        closingParens = ccount(url, ")");
        while (closingParenIndex !== -1 && openingParens > closingParens) {
          url += trail.slice(0, closingParenIndex + 1);
          trail = trail.slice(closingParenIndex + 1);
          closingParenIndex = trail.indexOf(")");
          closingParens++;
        }
      }
      return [url, trail];
    }
    function previous(match3, email) {
      var code = match3.input.charCodeAt(match3.index - 1);
      return (code !== code || unicodeWhitespace(code) || unicodePunctuation(code)) && (!email || code !== 47);
    }
  }
});

// node_modules/mdast-util-gfm-strikethrough/from-markdown.js
var require_from_markdown2 = __commonJS({
  "node_modules/mdast-util-gfm-strikethrough/from-markdown.js"(exports2) {
    exports2.canContainEols = ["delete"];
    exports2.enter = { strikethrough: enterStrikethrough };
    exports2.exit = { strikethrough: exitStrikethrough };
    function enterStrikethrough(token2) {
      this.enter({ type: "delete", children: [] }, token2);
    }
    function exitStrikethrough(token2) {
      this.exit(token2);
    }
  }
});

// node_modules/mdast-util-gfm-table/from-markdown.js
var require_from_markdown3 = __commonJS({
  "node_modules/mdast-util-gfm-table/from-markdown.js"(exports2) {
    exports2.enter = {
      table: enterTable,
      tableData: enterCell,
      tableHeader: enterCell,
      tableRow: enterRow
    };
    exports2.exit = {
      codeText: exitCodeText,
      table: exitTable,
      tableData: exit,
      tableHeader: exit,
      tableRow: exit
    };
    function enterTable(token2) {
      this.enter({ type: "table", align: token2._align, children: [] }, token2);
      this.setData("inTable", true);
    }
    function exitTable(token2) {
      this.exit(token2);
      this.setData("inTable");
    }
    function enterRow(token2) {
      this.enter({ type: "tableRow", children: [] }, token2);
    }
    function exit(token2) {
      this.exit(token2);
    }
    function enterCell(token2) {
      this.enter({ type: "tableCell", children: [] }, token2);
    }
    function exitCodeText(token2) {
      var value = this.resume();
      if (this.getData("inTable")) {
        value = value.replace(/\\([\\|])/g, replace);
      }
      this.stack[this.stack.length - 1].value = value;
      this.exit(token2);
    }
    function replace($0, $1) {
      return $1 === "|" ? $1 : $0;
    }
  }
});

// node_modules/mdast-util-gfm-task-list-item/from-markdown.js
var require_from_markdown4 = __commonJS({
  "node_modules/mdast-util-gfm-task-list-item/from-markdown.js"(exports2) {
    exports2.exit = {
      taskListCheckValueChecked: exitCheck,
      taskListCheckValueUnchecked: exitCheck,
      paragraph: exitParagraphWithTaskListItem
    };
    function exitCheck(token2) {
      this.stack[this.stack.length - 2].checked = token2.type === "taskListCheckValueChecked";
    }
    function exitParagraphWithTaskListItem(token2) {
      var parent = this.stack[this.stack.length - 2];
      var node = this.stack[this.stack.length - 1];
      var siblings = parent.children;
      var head = node.children[0];
      var index = -1;
      var firstParaghraph;
      if (parent && parent.type === "listItem" && typeof parent.checked === "boolean" && head && head.type === "text") {
        while (++index < siblings.length) {
          if (siblings[index].type === "paragraph") {
            firstParaghraph = siblings[index];
            break;
          }
        }
        if (firstParaghraph === node) {
          head.value = head.value.slice(1);
          if (head.value.length === 0) {
            node.children.shift();
          } else {
            head.position.start.column++;
            head.position.start.offset++;
            node.position.start = Object.assign({}, head.position.start);
          }
        }
      }
      this.exit(token2);
    }
  }
});

// node_modules/mdast-util-gfm/from-markdown.js
var require_from_markdown5 = __commonJS({
  "node_modules/mdast-util-gfm/from-markdown.js"(exports2, module2) {
    var autolinkLiteral = require_from_markdown();
    var strikethrough = require_from_markdown2();
    var table2 = require_from_markdown3();
    var taskListItem = require_from_markdown4();
    var own = {}.hasOwnProperty;
    module2.exports = configure2([
      autolinkLiteral,
      strikethrough,
      table2,
      taskListItem
    ]);
    function configure2(extensions) {
      var config = { transforms: [], canContainEols: [] };
      var length = extensions.length;
      var index = -1;
      while (++index < length) {
        extension(config, extensions[index]);
      }
      return config;
    }
    function extension(config, extension2) {
      var key;
      var left;
      var right;
      for (key in extension2) {
        left = own.call(config, key) ? config[key] : config[key] = {};
        right = extension2[key];
        if (key === "canContainEols" || key === "transforms") {
          config[key] = [].concat(left, right);
        } else {
          Object.assign(left, right);
        }
      }
    }
  }
});

// node_modules/mdast-util-gfm-autolink-literal/to-markdown.js
var require_to_markdown = __commonJS({
  "node_modules/mdast-util-gfm-autolink-literal/to-markdown.js"(exports2) {
    var inConstruct = "phrasing";
    var notInConstruct = ["autolink", "link", "image", "label"];
    exports2.unsafe = [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct,
        notInConstruct
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct,
        notInConstruct
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct,
        notInConstruct
      }
    ];
  }
});

// node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js
var require_container_phrasing = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js"(exports2, module2) {
    module2.exports = phrasing;
    function phrasing(parent, context, safeOptions) {
      var children = parent.children || [];
      var results = [];
      var index = -1;
      var before = safeOptions.before;
      var after;
      var handle;
      var child;
      while (++index < children.length) {
        child = children[index];
        if (index + 1 < children.length) {
          handle = context.handle.handlers[children[index + 1].type];
          if (handle && handle.peek) handle = handle.peek;
          after = handle ? handle(children[index + 1], parent, context, {
            before: "",
            after: ""
          }).charAt(0) : "";
        } else {
          after = safeOptions.after;
        }
        if (results.length > 0 && (before === "\r" || before === "\n") && child.type === "html") {
          results[results.length - 1] = results[results.length - 1].replace(
            /(\r?\n|\r)$/,
            " "
          );
          before = " ";
        }
        results.push(
          context.handle(child, parent, context, {
            before,
            after
          })
        );
        before = results[results.length - 1].slice(-1);
      }
      return results.join("");
    }
  }
});

// node_modules/mdast-util-gfm-strikethrough/to-markdown.js
var require_to_markdown2 = __commonJS({
  "node_modules/mdast-util-gfm-strikethrough/to-markdown.js"(exports2) {
    var phrasing = require_container_phrasing();
    exports2.unsafe = [{ character: "~", inConstruct: "phrasing" }];
    exports2.handlers = { delete: handleDelete };
    handleDelete.peek = peekDelete;
    function handleDelete(node, _, context) {
      var exit = context.enter("emphasis");
      var value = phrasing(node, context, { before: "~", after: "~" });
      exit();
      return "~~" + value + "~~";
    }
    function peekDelete() {
      return "~";
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/pattern-compile.js
var require_pattern_compile = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/pattern-compile.js"(exports2, module2) {
    module2.exports = patternCompile;
    function patternCompile(pattern) {
      var before;
      var after;
      if (!pattern._compiled) {
        before = pattern.before ? "(?:" + pattern.before + ")" : "";
        after = pattern.after ? "(?:" + pattern.after + ")" : "";
        if (pattern.atBreak) {
          before = "[\\r\\n][\\t ]*" + before;
        }
        pattern._compiled = new RegExp(
          (before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (after || ""),
          "g"
        );
      }
      return pattern._compiled;
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
var require_inline_code2 = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/handle/inline-code.js"(exports2, module2) {
    module2.exports = inlineCode;
    inlineCode.peek = inlineCodePeek;
    var patternCompile = require_pattern_compile();
    function inlineCode(node, parent, context) {
      var value = node.value || "";
      var sequence = "`";
      var index = -1;
      var pattern;
      var expression;
      var match3;
      var position;
      while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value)) {
        sequence += "`";
      }
      if (/[^ \r\n]/.test(value) && (/[ \r\n`]/.test(value.charAt(0)) || /[ \r\n`]/.test(value.charAt(value.length - 1)))) {
        value = " " + value + " ";
      }
      while (++index < context.unsafe.length) {
        pattern = context.unsafe[index];
        if (!pattern.atBreak) continue;
        expression = patternCompile(pattern);
        while (match3 = expression.exec(value)) {
          position = match3.index;
          if (value.charCodeAt(position) === 10 && value.charCodeAt(position - 1) === 13) {
            position--;
          }
          value = value.slice(0, position) + " " + value.slice(match3.index + 1);
        }
      }
      return sequence + value + sequence;
    }
    function inlineCodePeek() {
      return "`";
    }
  }
});

// node_modules/repeat-string/index.js
var require_repeat_string = __commonJS({
  "node_modules/repeat-string/index.js"(exports2, module2) {
    "use strict";
    var res = "";
    var cache2;
    module2.exports = repeat;
    function repeat(str, num) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      if (num === 1) return str;
      if (num === 2) return str + str;
      var max = str.length * num;
      if (cache2 !== str || typeof cache2 === "undefined") {
        cache2 = str;
        res = "";
      } else if (res.length >= max) {
        return res.substr(0, max);
      }
      while (max > res.length && num > 1) {
        if (num & 1) {
          res += str;
        }
        num >>= 1;
        str += str;
      }
      res += str;
      res = res.substr(0, max);
      return res;
    }
  }
});

// node_modules/markdown-table/index.js
var require_markdown_table = __commonJS({
  "node_modules/markdown-table/index.js"(exports2, module2) {
    "use strict";
    var repeat = require_repeat_string();
    module2.exports = markdownTable;
    var trailingWhitespace = / +$/;
    var space = " ";
    var lineFeed = "\n";
    var dash = "-";
    var colon = ":";
    var verticalBar = "|";
    var x = 0;
    var C = 67;
    var L = 76;
    var R = 82;
    var c = 99;
    var l = 108;
    var r = 114;
    function markdownTable(table2, options) {
      var settings = options || {};
      var padding = settings.padding !== false;
      var start = settings.delimiterStart !== false;
      var end = settings.delimiterEnd !== false;
      var align = (settings.align || []).concat();
      var alignDelimiters = settings.alignDelimiters !== false;
      var alignments = [];
      var stringLength = settings.stringLength || defaultStringLength;
      var rowIndex = -1;
      var rowLength = table2.length;
      var cellMatrix = [];
      var sizeMatrix = [];
      var row = [];
      var sizes = [];
      var longestCellByColumn = [];
      var mostCellsPerRow = 0;
      var cells;
      var columnIndex;
      var columnLength;
      var largest;
      var size;
      var cell;
      var lines;
      var line;
      var before;
      var after;
      var code;
      while (++rowIndex < rowLength) {
        cells = table2[rowIndex];
        columnIndex = -1;
        columnLength = cells.length;
        row = [];
        sizes = [];
        if (columnLength > mostCellsPerRow) {
          mostCellsPerRow = columnLength;
        }
        while (++columnIndex < columnLength) {
          cell = serialize2(cells[columnIndex]);
          if (alignDelimiters === true) {
            size = stringLength(cell);
            sizes[columnIndex] = size;
            largest = longestCellByColumn[columnIndex];
            if (largest === void 0 || size > largest) {
              longestCellByColumn[columnIndex] = size;
            }
          }
          row.push(cell);
        }
        cellMatrix[rowIndex] = row;
        sizeMatrix[rowIndex] = sizes;
      }
      columnIndex = -1;
      columnLength = mostCellsPerRow;
      if (typeof align === "object" && "length" in align) {
        while (++columnIndex < columnLength) {
          alignments[columnIndex] = toAlignment(align[columnIndex]);
        }
      } else {
        code = toAlignment(align);
        while (++columnIndex < columnLength) {
          alignments[columnIndex] = code;
        }
      }
      columnIndex = -1;
      columnLength = mostCellsPerRow;
      row = [];
      sizes = [];
      while (++columnIndex < columnLength) {
        code = alignments[columnIndex];
        before = "";
        after = "";
        if (code === l) {
          before = colon;
        } else if (code === r) {
          after = colon;
        } else if (code === c) {
          before = colon;
          after = colon;
        }
        size = alignDelimiters ? Math.max(
          1,
          longestCellByColumn[columnIndex] - before.length - after.length
        ) : 1;
        cell = before + repeat(dash, size) + after;
        if (alignDelimiters === true) {
          size = before.length + size + after.length;
          if (size > longestCellByColumn[columnIndex]) {
            longestCellByColumn[columnIndex] = size;
          }
          sizes[columnIndex] = size;
        }
        row[columnIndex] = cell;
      }
      cellMatrix.splice(1, 0, row);
      sizeMatrix.splice(1, 0, sizes);
      rowIndex = -1;
      rowLength = cellMatrix.length;
      lines = [];
      while (++rowIndex < rowLength) {
        row = cellMatrix[rowIndex];
        sizes = sizeMatrix[rowIndex];
        columnIndex = -1;
        columnLength = mostCellsPerRow;
        line = [];
        while (++columnIndex < columnLength) {
          cell = row[columnIndex] || "";
          before = "";
          after = "";
          if (alignDelimiters === true) {
            size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
            code = alignments[columnIndex];
            if (code === r) {
              before = repeat(space, size);
            } else if (code === c) {
              if (size % 2 === 0) {
                before = repeat(space, size / 2);
                after = before;
              } else {
                before = repeat(space, size / 2 + 0.5);
                after = repeat(space, size / 2 - 0.5);
              }
            } else {
              after = repeat(space, size);
            }
          }
          if (start === true && columnIndex === 0) {
            line.push(verticalBar);
          }
          if (padding === true && // Don’t add the opening space if we’re not aligning and the cell is
          // empty: there will be a closing space.
          !(alignDelimiters === false && cell === "") && (start === true || columnIndex !== 0)) {
            line.push(space);
          }
          if (alignDelimiters === true) {
            line.push(before);
          }
          line.push(cell);
          if (alignDelimiters === true) {
            line.push(after);
          }
          if (padding === true) {
            line.push(space);
          }
          if (end === true || columnIndex !== columnLength - 1) {
            line.push(verticalBar);
          }
        }
        line = line.join("");
        if (end === false) {
          line = line.replace(trailingWhitespace, "");
        }
        lines.push(line);
      }
      return lines.join(lineFeed);
    }
    function serialize2(value) {
      return value === null || value === void 0 ? "" : String(value);
    }
    function defaultStringLength(value) {
      return value.length;
    }
    function toAlignment(value) {
      var code = typeof value === "string" ? value.charCodeAt(0) : x;
      return code === L || code === l ? l : code === R || code === r ? r : code === C || code === c ? c : x;
    }
  }
});

// node_modules/mdast-util-gfm-table/to-markdown.js
var require_to_markdown3 = __commonJS({
  "node_modules/mdast-util-gfm-table/to-markdown.js"(exports2, module2) {
    var phrasing = require_container_phrasing();
    var defaultInlineCode = require_inline_code2();
    var markdownTable = require_markdown_table();
    module2.exports = toMarkdown;
    function toMarkdown(options) {
      var settings = options || {};
      var padding = settings.tableCellPadding;
      var alignDelimiters = settings.tablePipeAlign;
      var stringLength = settings.stringLength;
      var around = padding ? " " : "|";
      return {
        unsafe: [
          { character: "\r", inConstruct: "tableCell" },
          { character: "\n", inConstruct: "tableCell" },
          // A pipe, when followed by a tab or space (padding), or a dash or colon
          // (unpadded delimiter row), could result in a table.
          { atBreak: true, character: "|", after: "[	 :-]" },
          // A pipe in a cell must be encoded.
          { character: "|", inConstruct: "tableCell" },
          // A colon must be followed by a dash, in which case it could start a
          // delimiter row.
          { atBreak: true, character: ":", after: "-" },
          // A delimiter row can also start with a dash, when followed by more
          // dashes, a colon, or a pipe.
          // This is a stricter version than the built in check for lists, thematic
          // breaks, and setex heading underlines though:
          // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
          { atBreak: true, character: "-", after: "[:|-]" }
        ],
        handlers: {
          table: handleTable,
          tableRow: handleTableRow,
          tableCell: handleTableCell,
          inlineCode: inlineCodeWithTable
        }
      };
      function handleTable(node, _, context) {
        return serializeData(handleTableAsData(node, context), node.align);
      }
      function handleTableRow(node, _, context) {
        var row = handleTableRowAsData(node, context);
        var value = serializeData([row]);
        return value.slice(0, value.indexOf("\n"));
      }
      function handleTableCell(node, _, context) {
        var exit = context.enter("tableCell");
        var value = phrasing(node, context, { before: around, after: around });
        exit();
        return value;
      }
      function serializeData(matrix, align) {
        return markdownTable(matrix, {
          align,
          alignDelimiters,
          padding,
          stringLength
        });
      }
      function handleTableAsData(node, context) {
        var children = node.children;
        var index = -1;
        var length = children.length;
        var result = [];
        var subexit = context.enter("table");
        while (++index < length) {
          result[index] = handleTableRowAsData(children[index], context);
        }
        subexit();
        return result;
      }
      function handleTableRowAsData(node, context) {
        var children = node.children;
        var index = -1;
        var length = children.length;
        var result = [];
        var subexit = context.enter("tableRow");
        while (++index < length) {
          result[index] = handleTableCell(children[index], node, context);
        }
        subexit();
        return result;
      }
      function inlineCodeWithTable(node, parent, context) {
        var value = defaultInlineCode(node, parent, context);
        if (context.stack.indexOf("tableCell") !== -1) {
          value = value.replace(/\|/g, "\\$&");
        }
        return value;
      }
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
var require_check_bullet = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/check-bullet.js"(exports2, module2) {
    module2.exports = checkBullet;
    function checkBullet(context) {
      var marker = context.options.bullet || "*";
      if (marker !== "*" && marker !== "+" && marker !== "-") {
        throw new Error(
          "Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`"
        );
      }
      return marker;
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
var require_check_list_item_indent = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js"(exports2, module2) {
    module2.exports = checkListItemIndent;
    function checkListItemIndent(context) {
      var style = context.options.listItemIndent || "tab";
      if (style === 1 || style === "1") {
        return "one";
      }
      if (style !== "tab" && style !== "one" && style !== "mixed") {
        throw new Error(
          "Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
        );
      }
      return style;
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/container-flow.js
var require_container_flow = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/container-flow.js"(exports2, module2) {
    module2.exports = flow;
    var repeat = require_repeat_string();
    function flow(parent, context) {
      var children = parent.children || [];
      var results = [];
      var index = -1;
      var child;
      while (++index < children.length) {
        child = children[index];
        results.push(
          context.handle(child, parent, context, { before: "\n", after: "\n" })
        );
        if (index + 1 < children.length) {
          results.push(between(child, children[index + 1]));
        }
      }
      return results.join("");
      function between(left, right) {
        var index2 = -1;
        var result;
        while (++index2 < context.join.length) {
          result = context.join[index2](left, right, parent, context);
          if (result === true || result === 1) {
            break;
          }
          if (typeof result === "number") {
            return repeat("\n", 1 + Number(result));
          }
          if (result === false) {
            return "\n\n<!---->\n\n";
          }
        }
        return "\n\n";
      }
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/indent-lines.js
var require_indent_lines = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/util/indent-lines.js"(exports2, module2) {
    module2.exports = indentLines;
    var eol = /\r?\n|\r/g;
    function indentLines(value, map) {
      var result = [];
      var start = 0;
      var line = 0;
      var match3;
      while (match3 = eol.exec(value)) {
        one(value.slice(start, match3.index));
        result.push(match3[0]);
        start = match3.index + match3[0].length;
        line++;
      }
      one(value.slice(start));
      return result.join("");
      function one(value2) {
        result.push(map(value2, line, !value2));
      }
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/handle/list-item.js
var require_list_item2 = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/handle/list-item.js"(exports2, module2) {
    module2.exports = listItem;
    var repeat = require_repeat_string();
    var checkBullet = require_check_bullet();
    var checkListItemIndent = require_check_list_item_indent();
    var flow = require_container_flow();
    var indentLines = require_indent_lines();
    function listItem(node, parent, context) {
      var bullet = checkBullet(context);
      var listItemIndent = checkListItemIndent(context);
      var size;
      var value;
      var exit;
      if (parent && parent.ordered) {
        bullet = (parent.start > -1 ? parent.start : 1) + (context.options.incrementListMarker === false ? 0 : parent.children.indexOf(node)) + ".";
      }
      size = bullet.length + 1;
      if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.spread || node.spread)) {
        size = Math.ceil(size / 4) * 4;
      }
      exit = context.enter("listItem");
      value = indentLines(flow(node, context), map);
      exit();
      return value;
      function map(line, index, blank) {
        if (index) {
          return (blank ? "" : repeat(" ", size)) + line;
        }
        return (blank ? bullet : bullet + repeat(" ", size - bullet.length)) + line;
      }
    }
  }
});

// node_modules/mdast-util-gfm-task-list-item/to-markdown.js
var require_to_markdown4 = __commonJS({
  "node_modules/mdast-util-gfm-task-list-item/to-markdown.js"(exports2) {
    var defaultListItem = require_list_item2();
    exports2.unsafe = [{ atBreak: true, character: "-", after: "[:|-]" }];
    exports2.handlers = {
      listItem: listItemWithTaskListItem
    };
    function listItemWithTaskListItem(node, parent, context) {
      var value = defaultListItem(node, parent, context);
      var head = node.children[0];
      if (typeof node.checked === "boolean" && head && head.type === "paragraph") {
        value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
      }
      return value;
      function check($0) {
        return $0 + "[" + (node.checked ? "x" : " ") + "] ";
      }
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/configure.js
var require_configure = __commonJS({
  "node_modules/mdast-util-to-markdown/lib/configure.js"(exports2, module2) {
    module2.exports = configure2;
    function configure2(base, extension) {
      var index = -1;
      var key;
      if (extension.extensions) {
        while (++index < extension.extensions.length) {
          configure2(base, extension.extensions[index]);
        }
      }
      for (key in extension) {
        if (key === "extensions") {
        } else if (key === "unsafe" || key === "join") {
          base[key] = base[key].concat(extension[key] || []);
        } else if (key === "handlers") {
          base[key] = Object.assign(base[key], extension[key] || {});
        } else {
          base.options[key] = extension[key];
        }
      }
      return base;
    }
  }
});

// node_modules/mdast-util-gfm/to-markdown.js
var require_to_markdown5 = __commonJS({
  "node_modules/mdast-util-gfm/to-markdown.js"(exports2, module2) {
    var autolinkLiteral = require_to_markdown();
    var strikethrough = require_to_markdown2();
    var table2 = require_to_markdown3();
    var taskListItem = require_to_markdown4();
    var configure2 = require_configure();
    module2.exports = toMarkdown;
    function toMarkdown(options) {
      var config = configure2(
        { handlers: {}, join: [], unsafe: [], options: {} },
        {
          extensions: [autolinkLiteral, strikethrough, table2(options), taskListItem]
        }
      );
      return Object.assign(config.options, {
        handlers: config.handlers,
        join: config.join,
        unsafe: config.unsafe
      });
    }
  }
});

// node_modules/remark-gfm/index.js
var require_remark_gfm = __commonJS({
  "node_modules/remark-gfm/index.js"(exports2, module2) {
    "use strict";
    var syntax = require_micromark_extension_gfm();
    var fromMarkdown = require_from_markdown5();
    var toMarkdown = require_to_markdown5();
    var warningIssued;
    module2.exports = gfm;
    function gfm(options) {
      var data = this.data();
      if (!warningIssued && (this.Parser && this.Parser.prototype && this.Parser.prototype.blockTokenizers || this.Compiler && this.Compiler.prototype && this.Compiler.prototype.visitors)) {
        warningIssued = true;
        console.warn(
          "[remark-gfm] Warning: please upgrade to remark 13 to use this plugin"
        );
      }
      add("micromarkExtensions", syntax(options));
      add("fromMarkdownExtensions", fromMarkdown);
      add("toMarkdownExtensions", toMarkdown(options));
      function add(field, value) {
        if (data[field]) data[field].push(value);
        else data[field] = [value];
      }
    }
  }
});

// node_modules/dayjs/locale/zh-cn.js
var require_zh_cn = __commonJS({
  "node_modules/dayjs/locale/zh-cn.js"(exports2, module2) {
    !function(e2, _) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = _(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], _) : (e2 = "undefined" != typeof globalThis ? globalThis : e2 || self).dayjs_locale_zh_cn = _(e2.dayjs);
    }(exports2, function(e2) {
      "use strict";
      function _(e3) {
        return e3 && "object" == typeof e3 && "default" in e3 ? e3 : { default: e3 };
      }
      var t = _(e2), d = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(e3, _2) {
        return "W" === _2 ? e3 + "周" : e3 + "日";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(e3, _2) {
        var t2 = 100 * e3 + _2;
        return t2 < 600 ? "凌晨" : t2 < 900 ? "早上" : t2 < 1100 ? "上午" : t2 < 1300 ? "中午" : t2 < 1800 ? "下午" : "晚上";
      } };
      return t.default.locale(d, null, true), d;
    });
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports2) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var React48 = require_react();
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactSharedInternals = React48.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var assign = Object.assign;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match3 = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match3 && match3[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var hasOwnProperty4 = Object.prototype.hasOwnProperty;
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location2, componentName, element) {
          {
            var has2 = Function.call.bind(hasOwnProperty4);
            for (var typeSpecName in typeSpecs) {
              if (has2(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location2, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e2) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        var didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty4.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty4.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function warnIfStringRefCannotBeAutoConverted(config, self2) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        function defineKeyPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingKey = function() {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
        }
        function defineRefPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
        var ReactElement = function(type, key, ref, self2, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self2
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function jsxDEV(type, config, maybeKey, source, self2) {
          {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            if (maybeKey !== void 0) {
              {
                checkKeyStringCoercion(maybeKey);
              }
              key = "" + maybeKey;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            if (hasValidRef(config)) {
              ref = config.ref;
              warnIfStringRefCannotBeAutoConverted(config, self2);
            }
            for (propName in config) {
              if (hasOwnProperty4.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
            return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function isValidElement(object) {
          {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
        }
        function getDeclarationErrorAddendum() {
          {
            if (ReactCurrentOwner$1.current) {
              var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
        }
        function getSourceInfoErrorAddendum(source) {
          {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
        }
        function validateExplicitKey(element, parentType) {
          {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        var didWarnAboutKeySpread = {};
        function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
          {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendum(source);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = jsxDEV(type, props, key, source, self2);
            if (element == null) {
              return element;
            }
            if (validType) {
              var children = props.children;
              if (children !== void 0) {
                if (isStaticChildren) {
                  if (isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                      validateChildKeys(children[i], type);
                    }
                    if (Object.freeze) {
                      Object.freeze(children);
                    }
                  } else {
                    error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                  }
                } else {
                  validateChildKeys(children, type);
                }
              }
            }
            {
              if (hasOwnProperty4.call(props, "key")) {
                var componentName = getComponentNameFromType(type);
                var keys = Object.keys(props).filter(function(k) {
                  return k !== "key";
                });
                var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
                if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                  var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                  error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                  didWarnAboutKeySpread[componentName + beforeExample] = true;
                }
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
        }
        function jsxWithValidationStatic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, true);
          }
        }
        function jsxWithValidationDynamic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, false);
          }
        }
        var jsx = jsxWithValidationDynamic;
        var jsxs = jsxWithValidationStatic;
        exports2.Fragment = REACT_FRAGMENT_TYPE;
        exports2.jsx = jsx;
        exports2.jsxs = jsxs;
      })();
    }
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports2, module2) {
    "use strict";
    if (false) {
      module2.exports = null;
    } else {
      module2.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/dayjs/plugin/quarterOfYear.js
var require_quarterOfYear = __commonJS({
  "node_modules/dayjs/plugin/quarterOfYear.js"(exports2, module2) {
    !function(t, n2) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = n2() : "function" == typeof define && define.amd ? define(n2) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_quarterOfYear = n2();
    }(exports2, function() {
      "use strict";
      var t = "month", n2 = "quarter";
      return function(e2, i) {
        var r = i.prototype;
        r.quarter = function(t2) {
          return this.$utils().u(t2) ? Math.ceil((this.month() + 1) / 3) : this.month(this.month() % 3 + 3 * (t2 - 1));
        };
        var s = r.add;
        r.add = function(e3, i2) {
          return e3 = Number(e3), this.$utils().p(i2) === n2 ? this.add(3 * e3, t) : s.bind(this)(e3, i2);
        };
        var u = r.startOf;
        r.startOf = function(e3, i2) {
          var r2 = this.$utils(), s2 = !!r2.u(i2) || i2;
          if (r2.p(e3) === n2) {
            var o3 = this.quarter() - 1;
            return s2 ? this.month(3 * o3).startOf(t).startOf("day") : this.month(3 * o3 + 2).endOf(t).endOf("day");
          }
          return u.bind(this)(e3, i2);
        };
      };
    });
  }
});

// node_modules/safe-stable-stringify/index.js
var require_safe_stable_stringify = __commonJS({
  "node_modules/safe-stable-stringify/index.js"(exports2, module2) {
    "use strict";
    var { hasOwnProperty: hasOwnProperty4 } = Object.prototype;
    var stringify2 = configure2();
    stringify2.configure = configure2;
    stringify2.stringify = stringify2;
    stringify2.default = stringify2;
    exports2.stringify = stringify2;
    exports2.configure = configure2;
    module2.exports = stringify2;
    var strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]/;
    function strEscape(str) {
      if (str.length < 5e3 && !strEscapeSequencesRegExp.test(str)) {
        return `"${str}"`;
      }
      return JSON.stringify(str);
    }
    function sort(array, comparator) {
      if (array.length > 200 || comparator) {
        return array.sort(comparator);
      }
      for (let i = 1; i < array.length; i++) {
        const currentValue = array[i];
        let position = i;
        while (position !== 0 && array[position - 1] > currentValue) {
          array[position] = array[position - 1];
          position--;
        }
        array[position] = currentValue;
      }
      return array;
    }
    var typedArrayPrototypeGetSymbolToStringTag = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(
        Object.getPrototypeOf(
          new Int8Array()
        )
      ),
      Symbol.toStringTag
    ).get;
    function isTypedArrayWithEntries(value) {
      return typedArrayPrototypeGetSymbolToStringTag.call(value) !== void 0 && value.length !== 0;
    }
    function stringifyTypedArray(array, separator, maximumBreadth) {
      if (array.length < maximumBreadth) {
        maximumBreadth = array.length;
      }
      const whitespace = separator === "," ? "" : " ";
      let res = `"0":${whitespace}${array[0]}`;
      for (let i = 1; i < maximumBreadth; i++) {
        res += `${separator}"${i}":${whitespace}${array[i]}`;
      }
      return res;
    }
    function getCircularValueOption(options) {
      if (hasOwnProperty4.call(options, "circularValue")) {
        const circularValue = options.circularValue;
        if (typeof circularValue === "string") {
          return `"${circularValue}"`;
        }
        if (circularValue == null) {
          return circularValue;
        }
        if (circularValue === Error || circularValue === TypeError) {
          return {
            toString() {
              throw new TypeError("Converting circular structure to JSON");
            }
          };
        }
        throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined');
      }
      return '"[Circular]"';
    }
    function getDeterministicOption(options) {
      let value;
      if (hasOwnProperty4.call(options, "deterministic")) {
        value = options.deterministic;
        if (typeof value !== "boolean" && typeof value !== "function") {
          throw new TypeError('The "deterministic" argument must be of type boolean or comparator function');
        }
      }
      return value === void 0 ? true : value;
    }
    function getBooleanOption(options, key) {
      let value;
      if (hasOwnProperty4.call(options, key)) {
        value = options[key];
        if (typeof value !== "boolean") {
          throw new TypeError(`The "${key}" argument must be of type boolean`);
        }
      }
      return value === void 0 ? true : value;
    }
    function getPositiveIntegerOption(options, key) {
      let value;
      if (hasOwnProperty4.call(options, key)) {
        value = options[key];
        if (typeof value !== "number") {
          throw new TypeError(`The "${key}" argument must be of type number`);
        }
        if (!Number.isInteger(value)) {
          throw new TypeError(`The "${key}" argument must be an integer`);
        }
        if (value < 1) {
          throw new RangeError(`The "${key}" argument must be >= 1`);
        }
      }
      return value === void 0 ? Infinity : value;
    }
    function getItemCount(number) {
      if (number === 1) {
        return "1 item";
      }
      return `${number} items`;
    }
    function getUniqueReplacerSet(replacerArray) {
      const replacerSet = /* @__PURE__ */ new Set();
      for (const value of replacerArray) {
        if (typeof value === "string" || typeof value === "number") {
          replacerSet.add(String(value));
        }
      }
      return replacerSet;
    }
    function getStrictOption(options) {
      if (hasOwnProperty4.call(options, "strict")) {
        const value = options.strict;
        if (typeof value !== "boolean") {
          throw new TypeError('The "strict" argument must be of type boolean');
        }
        if (value) {
          return (value2) => {
            let message = `Object can not safely be stringified. Received type ${typeof value2}`;
            if (typeof value2 !== "function") message += ` (${value2.toString()})`;
            throw new Error(message);
          };
        }
      }
    }
    function configure2(options) {
      options = { ...options };
      const fail = getStrictOption(options);
      if (fail) {
        if (options.bigint === void 0) {
          options.bigint = false;
        }
        if (!("circularValue" in options)) {
          options.circularValue = Error;
        }
      }
      const circularValue = getCircularValueOption(options);
      const bigint = getBooleanOption(options, "bigint");
      const deterministic = getDeterministicOption(options);
      const comparator = typeof deterministic === "function" ? deterministic : void 0;
      const maximumDepth = getPositiveIntegerOption(options, "maximumDepth");
      const maximumBreadth = getPositiveIntegerOption(options, "maximumBreadth");
      function stringifyFnReplacer(key, parent, stack, replacer, spacer, indentation) {
        let value = parent[key];
        if (typeof value === "object" && value !== null && typeof value.toJSON === "function") {
          value = value.toJSON(key);
        }
        value = replacer.call(parent, key, value);
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            let res = "";
            let join = ",";
            const originalIndentation = indentation;
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              if (spacer !== "") {
                indentation += spacer;
                res += `
${indentation}`;
                join = `,
${indentation}`;
              }
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += join;
              }
              const tmp = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              if (spacer !== "") {
                res += `
${originalIndentation}`;
              }
              stack.pop();
              return `[${res}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            let whitespace = "";
            let separator = "";
            if (spacer !== "") {
              indentation += spacer;
              join = `,
${indentation}`;
              whitespace = " ";
            }
            const maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (deterministic && !isTypedArrayWithEntries(value)) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifyFnReplacer(key2, value, stack, replacer, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
                separator = join;
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`;
              separator = join;
            }
            if (spacer !== "" && separator.length > 1) {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringifyArrayReplacer(key, value, stack, replacer, spacer, indentation) {
        if (typeof value === "object" && value !== null && typeof value.toJSON === "function") {
          value = value.toJSON(key);
        }
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            const originalIndentation = indentation;
            let res = "";
            let join = ",";
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              if (spacer !== "") {
                indentation += spacer;
                res += `
${indentation}`;
                join = `,
${indentation}`;
              }
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += join;
              }
              const tmp = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              if (spacer !== "") {
                res += `
${originalIndentation}`;
              }
              stack.pop();
              return `[${res}]`;
            }
            stack.push(value);
            let whitespace = "";
            if (spacer !== "") {
              indentation += spacer;
              join = `,
${indentation}`;
              whitespace = " ";
            }
            let separator = "";
            for (const key2 of replacer) {
              const tmp = stringifyArrayReplacer(key2, value[key2], stack, replacer, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
                separator = join;
              }
            }
            if (spacer !== "" && separator.length > 1) {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringifyIndent(key, value, stack, spacer, indentation) {
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (typeof value.toJSON === "function") {
              value = value.toJSON(key);
              if (typeof value !== "object") {
                return stringifyIndent(key, value, stack, spacer, indentation);
              }
              if (value === null) {
                return "null";
              }
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            const originalIndentation = indentation;
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              indentation += spacer;
              let res2 = `
${indentation}`;
              const join2 = `,
${indentation}`;
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyIndent(String(i), value[i], stack, spacer, indentation);
                res2 += tmp2 !== void 0 ? tmp2 : "null";
                res2 += join2;
              }
              const tmp = stringifyIndent(String(i), value[i], stack, spacer, indentation);
              res2 += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res2 += `${join2}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              res2 += `
${originalIndentation}`;
              stack.pop();
              return `[${res2}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            indentation += spacer;
            const join = `,
${indentation}`;
            let res = "";
            let separator = "";
            let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (isTypedArrayWithEntries(value)) {
              res += stringifyTypedArray(value, join, maximumBreadth);
              keys = keys.slice(value.length);
              maximumPropertiesToStringify -= value.length;
              separator = join;
            }
            if (deterministic) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifyIndent(key2, value[key2], stack, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}: ${tmp}`;
                separator = join;
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`;
              separator = join;
            }
            if (separator !== "") {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringifySimple(key, value, stack) {
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (typeof value.toJSON === "function") {
              value = value.toJSON(key);
              if (typeof value !== "object") {
                return stringifySimple(key, value, stack);
              }
              if (value === null) {
                return "null";
              }
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            let res = "";
            const hasLength = value.length !== void 0;
            if (hasLength && Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifySimple(String(i), value[i], stack);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += ",";
              }
              const tmp = stringifySimple(String(i), value[i], stack);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `,"... ${getItemCount(removedKeys)} not stringified"`;
              }
              stack.pop();
              return `[${res}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            let separator = "";
            let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (hasLength && isTypedArrayWithEntries(value)) {
              res += stringifyTypedArray(value, ",", maximumBreadth);
              keys = keys.slice(value.length);
              maximumPropertiesToStringify -= value.length;
              separator = ",";
            }
            if (deterministic) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifySimple(key2, value[key2], stack);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${tmp}`;
                separator = ",";
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringify3(value, replacer, space) {
        if (arguments.length > 1) {
          let spacer = "";
          if (typeof space === "number") {
            spacer = " ".repeat(Math.min(space, 10));
          } else if (typeof space === "string") {
            spacer = space.slice(0, 10);
          }
          if (replacer != null) {
            if (typeof replacer === "function") {
              return stringifyFnReplacer("", { "": value }, [], replacer, spacer, "");
            }
            if (Array.isArray(replacer)) {
              return stringifyArrayReplacer("", value, [], getUniqueReplacerSet(replacer), spacer, "");
            }
          }
          if (spacer.length !== 0) {
            return stringifyIndent("", value, [], spacer, "");
          }
        }
        return stringifySimple("", value, []);
      }
      return stringify3;
    }
  }
});

// node_modules/@babel/runtime/helpers/typeof.js
var require_typeof = __commonJS({
  "node_modules/@babel/runtime/helpers/typeof.js"(exports2, module2) {
    function _typeof3(o3) {
      "@babel/helpers - typeof";
      return module2.exports = _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o4) {
        return typeof o4;
      } : function(o4) {
        return o4 && "function" == typeof Symbol && o4.constructor === Symbol && o4 !== Symbol.prototype ? "symbol" : typeof o4;
      }, module2.exports.__esModule = true, module2.exports["default"] = module2.exports, _typeof3(o3);
    }
    module2.exports = _typeof3, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/interopRequireWildcard.js
var require_interopRequireWildcard = __commonJS({
  "node_modules/@babel/runtime/helpers/interopRequireWildcard.js"(exports2, module2) {
    var _typeof3 = require_typeof()["default"];
    function _interopRequireWildcard(e2, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap();
      return (module2.exports = _interopRequireWildcard = function _interopRequireWildcard2(e3, t2) {
        if (!t2 && e3 && e3.__esModule) return e3;
        var o3, i, f = {
          __proto__: null,
          "default": e3
        };
        if (null === e3 || "object" != _typeof3(e3) && "function" != typeof e3) return f;
        if (o3 = t2 ? n2 : r) {
          if (o3.has(e3)) return o3.get(e3);
          o3.set(e3, f);
        }
        for (var _t2 in e3) "default" !== _t2 && {}.hasOwnProperty.call(e3, _t2) && ((i = (o3 = Object.defineProperty) && Object.getOwnPropertyDescriptor(e3, _t2)) && (i.get || i.set) ? o3(f, _t2, i) : f[_t2] = e3[_t2]);
        return f;
      }, module2.exports.__esModule = true, module2.exports["default"] = module2.exports)(e2, t);
    }
    module2.exports = _interopRequireWildcard, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/interopRequireDefault.js
var require_interopRequireDefault = __commonJS({
  "node_modules/@babel/runtime/helpers/interopRequireDefault.js"(exports2, module2) {
    function _interopRequireDefault(e2) {
      return e2 && e2.__esModule ? e2 : {
        "default": e2
      };
    }
    module2.exports = _interopRequireDefault, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/extends.js
var require_extends = __commonJS({
  "node_modules/@babel/runtime/helpers/extends.js"(exports2, module2) {
    function _extends() {
      return module2.exports = _extends = Object.assign ? Object.assign.bind() : function(n2) {
        for (var e2 = 1; e2 < arguments.length; e2++) {
          var t = arguments[e2];
          for (var r in t) ({}).hasOwnProperty.call(t, r) && (n2[r] = t[r]);
        }
        return n2;
      }, module2.exports.__esModule = true, module2.exports["default"] = module2.exports, _extends.apply(null, arguments);
    }
    module2.exports = _extends, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@ant-design/icons-svg/lib/asn/ArrowLeftOutlined.js
var require_ArrowLeftOutlined = __commonJS({
  "node_modules/@ant-design/icons-svg/lib/asn/ArrowLeftOutlined.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var ArrowLeftOutlined2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" } }] }, "name": "arrow-left", "theme": "outlined" };
    exports2.default = ArrowLeftOutlined2;
  }
});

// node_modules/@babel/runtime/helpers/arrayWithHoles.js
var require_arrayWithHoles = __commonJS({
  "node_modules/@babel/runtime/helpers/arrayWithHoles.js"(exports2, module2) {
    function _arrayWithHoles2(r) {
      if (Array.isArray(r)) return r;
    }
    module2.exports = _arrayWithHoles2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/iterableToArrayLimit.js
var require_iterableToArrayLimit = __commonJS({
  "node_modules/@babel/runtime/helpers/iterableToArrayLimit.js"(exports2, module2) {
    function _iterableToArrayLimit2(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e2, n2, i, u, a = [], f = true, o3 = false;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t) return;
            f = false;
          } else for (; !(f = (e2 = i.call(t)).done) && (a.push(e2.value), a.length !== l); f = true) ;
        } catch (r2) {
          o3 = true, n2 = r2;
        } finally {
          try {
            if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
          } finally {
            if (o3) throw n2;
          }
        }
        return a;
      }
    }
    module2.exports = _iterableToArrayLimit2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/arrayLikeToArray.js
var require_arrayLikeToArray = __commonJS({
  "node_modules/@babel/runtime/helpers/arrayLikeToArray.js"(exports2, module2) {
    function _arrayLikeToArray2(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e2 = 0, n2 = Array(a); e2 < a; e2++) n2[e2] = r[e2];
      return n2;
    }
    module2.exports = _arrayLikeToArray2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js
var require_unsupportedIterableToArray = __commonJS({
  "node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js"(exports2, module2) {
    var arrayLikeToArray = require_arrayLikeToArray();
    function _unsupportedIterableToArray2(r, a) {
      if (r) {
        if ("string" == typeof r) return arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
      }
    }
    module2.exports = _unsupportedIterableToArray2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/nonIterableRest.js
var require_nonIterableRest = __commonJS({
  "node_modules/@babel/runtime/helpers/nonIterableRest.js"(exports2, module2) {
    function _nonIterableRest2() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    module2.exports = _nonIterableRest2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/slicedToArray.js
var require_slicedToArray = __commonJS({
  "node_modules/@babel/runtime/helpers/slicedToArray.js"(exports2, module2) {
    var arrayWithHoles = require_arrayWithHoles();
    var iterableToArrayLimit = require_iterableToArrayLimit();
    var unsupportedIterableToArray = require_unsupportedIterableToArray();
    var nonIterableRest = require_nonIterableRest();
    function _slicedToArray3(r, e2) {
      return arrayWithHoles(r) || iterableToArrayLimit(r, e2) || unsupportedIterableToArray(r, e2) || nonIterableRest();
    }
    module2.exports = _slicedToArray3, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/toPrimitive.js
var require_toPrimitive = __commonJS({
  "node_modules/@babel/runtime/helpers/toPrimitive.js"(exports2, module2) {
    var _typeof3 = require_typeof()["default"];
    function toPrimitive(t, r) {
      if ("object" != _typeof3(t) || !t) return t;
      var e2 = t[Symbol.toPrimitive];
      if (void 0 !== e2) {
        var i = e2.call(t, r || "default");
        if ("object" != _typeof3(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    module2.exports = toPrimitive, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/toPropertyKey.js
var require_toPropertyKey = __commonJS({
  "node_modules/@babel/runtime/helpers/toPropertyKey.js"(exports2, module2) {
    var _typeof3 = require_typeof()["default"];
    var toPrimitive = require_toPrimitive();
    function toPropertyKey(t) {
      var i = toPrimitive(t, "string");
      return "symbol" == _typeof3(i) ? i : i + "";
    }
    module2.exports = toPropertyKey, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/defineProperty.js
var require_defineProperty = __commonJS({
  "node_modules/@babel/runtime/helpers/defineProperty.js"(exports2, module2) {
    var toPropertyKey = require_toPropertyKey();
    function _defineProperty2(e2, r, t) {
      return (r = toPropertyKey(r)) in e2 ? Object.defineProperty(e2, r, {
        value: t,
        enumerable: true,
        configurable: true,
        writable: true
      }) : e2[r] = t, e2;
    }
    module2.exports = _defineProperty2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js
var require_objectWithoutPropertiesLoose = __commonJS({
  "node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"(exports2, module2) {
    function _objectWithoutPropertiesLoose(r, e2) {
      if (null == r) return {};
      var t = {};
      for (var n2 in r) if ({}.hasOwnProperty.call(r, n2)) {
        if (-1 !== e2.indexOf(n2)) continue;
        t[n2] = r[n2];
      }
      return t;
    }
    module2.exports = _objectWithoutPropertiesLoose, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var require_objectWithoutProperties = __commonJS({
  "node_modules/@babel/runtime/helpers/objectWithoutProperties.js"(exports2, module2) {
    var objectWithoutPropertiesLoose = require_objectWithoutPropertiesLoose();
    function _objectWithoutProperties2(e2, t) {
      if (null == e2) return {};
      var o3, r, i = objectWithoutPropertiesLoose(e2, t);
      if (Object.getOwnPropertySymbols) {
        var n2 = Object.getOwnPropertySymbols(e2);
        for (r = 0; r < n2.length; r++) o3 = n2[r], -1 === t.indexOf(o3) && {}.propertyIsEnumerable.call(e2, o3) && (i[o3] = e2[o3]);
      }
      return i;
    }
    module2.exports = _objectWithoutProperties2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/@ant-design/icons/lib/components/Context.js
var require_Context = __commonJS({
  "node_modules/@ant-design/icons/lib/components/Context.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _react = require_react();
    var IconContext = (0, _react.createContext)({});
    var _default = exports2.default = IconContext;
  }
});

// node_modules/@babel/runtime/helpers/objectSpread2.js
var require_objectSpread2 = __commonJS({
  "node_modules/@babel/runtime/helpers/objectSpread2.js"(exports2, module2) {
    var defineProperty = require_defineProperty();
    function ownKeys(e2, r) {
      var t = Object.keys(e2);
      if (Object.getOwnPropertySymbols) {
        var o3 = Object.getOwnPropertySymbols(e2);
        r && (o3 = o3.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e2, r2).enumerable;
        })), t.push.apply(t, o3);
      }
      return t;
    }
    function _objectSpread22(e2) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          defineProperty(e2, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e2, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e2;
    }
    module2.exports = _objectSpread22, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// node_modules/rc-util/lib/Dom/canUseDom.js
var require_canUseDom = __commonJS({
  "node_modules/rc-util/lib/Dom/canUseDom.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = canUseDom;
    function canUseDom() {
      return !!(typeof window !== "undefined" && window.document && window.document.createElement);
    }
  }
});

// node_modules/rc-util/lib/Dom/contains.js
var require_contains = __commonJS({
  "node_modules/rc-util/lib/Dom/contains.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = contains;
    function contains(root, n2) {
      if (!root) {
        return false;
      }
      if (root.contains) {
        return root.contains(n2);
      }
      var node = n2;
      while (node) {
        if (node === root) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }
  }
});

// node_modules/rc-util/lib/Dom/dynamicCSS.js
var require_dynamicCSS = __commonJS({
  "node_modules/rc-util/lib/Dom/dynamicCSS.js"(exports2) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault().default;
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.clearContainerCache = clearContainerCache;
    exports2.injectCSS = injectCSS;
    exports2.removeCSS = removeCSS;
    exports2.updateCSS = updateCSS;
    var _objectSpread22 = _interopRequireDefault(require_objectSpread2());
    var _canUseDom = _interopRequireDefault(require_canUseDom());
    var _contains = _interopRequireDefault(require_contains());
    var APPEND_ORDER = "data-rc-order";
    var APPEND_PRIORITY = "data-rc-priority";
    var MARK_KEY = "rc-util-key";
    var containerCache = /* @__PURE__ */ new Map();
    function getMark() {
      var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, mark = _ref.mark;
      if (mark) {
        return mark.startsWith("data-") ? mark : "data-".concat(mark);
      }
      return MARK_KEY;
    }
    function getContainer(option) {
      if (option.attachTo) {
        return option.attachTo;
      }
      var head = document.querySelector("head");
      return head || document.body;
    }
    function getOrder(prepend) {
      if (prepend === "queue") {
        return "prependQueue";
      }
      return prepend ? "prepend" : "append";
    }
    function findStyles(container) {
      return Array.from((containerCache.get(container) || container).children).filter(function(node) {
        return node.tagName === "STYLE";
      });
    }
    function injectCSS(css) {
      var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (!(0, _canUseDom.default)()) {
        return null;
      }
      var csp = option.csp, prepend = option.prepend, _option$priority = option.priority, priority = _option$priority === void 0 ? 0 : _option$priority;
      var mergedOrder = getOrder(prepend);
      var isPrependQueue = mergedOrder === "prependQueue";
      var styleNode = document.createElement("style");
      styleNode.setAttribute(APPEND_ORDER, mergedOrder);
      if (isPrependQueue && priority) {
        styleNode.setAttribute(APPEND_PRIORITY, "".concat(priority));
      }
      if (csp !== null && csp !== void 0 && csp.nonce) {
        styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
      }
      styleNode.innerHTML = css;
      var container = getContainer(option);
      var firstChild = container.firstChild;
      if (prepend) {
        if (isPrependQueue) {
          var existStyle = (option.styles || findStyles(container)).filter(function(node) {
            if (!["prepend", "prependQueue"].includes(node.getAttribute(APPEND_ORDER))) {
              return false;
            }
            var nodePriority = Number(node.getAttribute(APPEND_PRIORITY) || 0);
            return priority >= nodePriority;
          });
          if (existStyle.length) {
            container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
            return styleNode;
          }
        }
        container.insertBefore(styleNode, firstChild);
      } else {
        container.appendChild(styleNode);
      }
      return styleNode;
    }
    function findExistNode(key) {
      var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var container = getContainer(option);
      return (option.styles || findStyles(container)).find(function(node) {
        return node.getAttribute(getMark(option)) === key;
      });
    }
    function removeCSS(key) {
      var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var existNode = findExistNode(key, option);
      if (existNode) {
        var container = getContainer(option);
        container.removeChild(existNode);
      }
    }
    function syncRealContainer(container, option) {
      var cachedRealContainer = containerCache.get(container);
      if (!cachedRealContainer || !(0, _contains.default)(document, cachedRealContainer)) {
        var placeholderStyle = injectCSS("", option);
        var parentNode = placeholderStyle.parentNode;
        containerCache.set(container, parentNode);
        container.removeChild(placeholderStyle);
      }
    }
    function clearContainerCache() {
      containerCache.clear();
    }
    function updateCSS(css, key) {
      var originOption = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var container = getContainer(originOption);
      var styles = findStyles(container);
      var option = (0, _objectSpread22.default)((0, _objectSpread22.default)({}, originOption), {}, {
        styles
      });
      syncRealContainer(container, option);
      var existNode = findExistNode(key, option);
      if (existNode) {
        var _option$csp, _option$csp2;
        if ((_option$csp = option.csp) !== null && _option$csp !== void 0 && _option$csp.nonce && existNode.nonce !== ((_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce)) {
          var _option$csp3;
          existNode.nonce = (_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce;
        }
        if (existNode.innerHTML !== css) {
          existNode.innerHTML = css;
        }
        return existNode;
      }
      var newNode = injectCSS(css, option);
      newNode.setAttribute(getMark(option), key);
      return newNode;
    }
  }
});

// node_modules/rc-util/lib/Dom/shadow.js
var require_shadow = __commonJS({
  "node_modules/rc-util/lib/Dom/shadow.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.getShadowRoot = getShadowRoot;
    exports2.inShadow = inShadow;
    function getRoot(ele) {
      var _ele$getRootNode;
      return ele === null || ele === void 0 || (_ele$getRootNode = ele.getRootNode) === null || _ele$getRootNode === void 0 ? void 0 : _ele$getRootNode.call(ele);
    }
    function inShadow(ele) {
      return getRoot(ele) instanceof ShadowRoot;
    }
    function getShadowRoot(ele) {
      return inShadow(ele) ? getRoot(ele) : null;
    }
  }
});

// node_modules/rc-util/lib/warning.js
var require_warning = __commonJS({
  "node_modules/rc-util/lib/warning.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.call = call;
    exports2.default = void 0;
    exports2.note = note;
    exports2.noteOnce = noteOnce2;
    exports2.preMessage = void 0;
    exports2.resetWarned = resetWarned;
    exports2.warning = warning;
    exports2.warningOnce = warningOnce;
    var warned = {};
    var preWarningFns = [];
    var preMessage = exports2.preMessage = function preMessage2(fn) {
      preWarningFns.push(fn);
    };
    function warning(valid, message) {
      if (!valid && console !== void 0) {
        var finalMessage = preWarningFns.reduce(function(msg, preMessageFn) {
          return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "warning");
        }, message);
        if (finalMessage) {
          console.error("Warning: ".concat(finalMessage));
        }
      }
    }
    function note(valid, message) {
      if (!valid && console !== void 0) {
        var finalMessage = preWarningFns.reduce(function(msg, preMessageFn) {
          return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "note");
        }, message);
        if (finalMessage) {
          console.warn("Note: ".concat(finalMessage));
        }
      }
    }
    function resetWarned() {
      warned = {};
    }
    function call(method, valid, message) {
      if (!valid && !warned[message]) {
        method(false, message);
        warned[message] = true;
      }
    }
    function warningOnce(valid, message) {
      call(warning, valid, message);
    }
    function noteOnce2(valid, message) {
      call(note, valid, message);
    }
    warningOnce.preMessage = preMessage;
    warningOnce.resetWarned = resetWarned;
    warningOnce.noteOnce = noteOnce2;
    var _default = exports2.default = warningOnce;
  }
});

// node_modules/@ant-design/icons/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@ant-design/icons/lib/utils.js"(exports2) {
    "use strict";
    var _interopRequireWildcard = require_interopRequireWildcard().default;
    var _interopRequireDefault = require_interopRequireDefault().default;
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.generate = generate;
    exports2.getSecondaryColor = getSecondaryColor;
    exports2.iconStyles = void 0;
    exports2.isIconDefinition = isIconDefinition;
    exports2.normalizeAttrs = normalizeAttrs;
    exports2.normalizeTwoToneColors = normalizeTwoToneColors;
    exports2.useInsertStyles = exports2.svgBaseProps = void 0;
    exports2.warning = warning;
    var _objectSpread22 = _interopRequireDefault(require_objectSpread2());
    var _typeof22 = _interopRequireDefault(require_typeof());
    var _colors = (init_es(), __toCommonJS(es_exports));
    var _dynamicCSS = require_dynamicCSS();
    var _shadow = require_shadow();
    var _warning = _interopRequireDefault(require_warning());
    var _react = _interopRequireWildcard(require_react());
    var _Context = _interopRequireDefault(require_Context());
    function camelCase(input) {
      return input.replace(/-(.)/g, function(match3, g) {
        return g.toUpperCase();
      });
    }
    function warning(valid, message) {
      (0, _warning.default)(valid, "[@ant-design/icons] ".concat(message));
    }
    function isIconDefinition(target) {
      return (0, _typeof22.default)(target) === "object" && typeof target.name === "string" && typeof target.theme === "string" && ((0, _typeof22.default)(target.icon) === "object" || typeof target.icon === "function");
    }
    function normalizeAttrs() {
      var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return Object.keys(attrs).reduce(function(acc, key) {
        var val = attrs[key];
        switch (key) {
          case "class":
            acc.className = val;
            delete acc.class;
            break;
          default:
            delete acc[key];
            acc[camelCase(key)] = val;
        }
        return acc;
      }, {});
    }
    function generate(node, key, rootProps) {
      if (!rootProps) {
        return _react.default.createElement(node.tag, (0, _objectSpread22.default)({
          key
        }, normalizeAttrs(node.attrs)), (node.children || []).map(function(child, index) {
          return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
        }));
      }
      return _react.default.createElement(node.tag, (0, _objectSpread22.default)((0, _objectSpread22.default)({
        key
      }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function(child, index) {
        return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
      }));
    }
    function getSecondaryColor(primaryColor) {
      return (0, _colors.generate)(primaryColor)[0];
    }
    function normalizeTwoToneColors(twoToneColor) {
      if (!twoToneColor) {
        return [];
      }
      return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
    }
    var svgBaseProps = exports2.svgBaseProps = {
      width: "1em",
      height: "1em",
      fill: "currentColor",
      "aria-hidden": "true",
      focusable: "false"
    };
    var iconStyles = exports2.iconStyles = "\n.anticon {\n  display: inline-flex;\n  align-items: center;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
    var useInsertStyles = exports2.useInsertStyles = function useInsertStyles2(eleRef) {
      var _useContext = (0, _react.useContext)(_Context.default), csp = _useContext.csp, prefixCls = _useContext.prefixCls, layer = _useContext.layer;
      var mergedStyleStr = iconStyles;
      if (prefixCls) {
        mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
      }
      if (layer) {
        mergedStyleStr = "@layer ".concat(layer, " {\n").concat(mergedStyleStr, "\n}");
      }
      (0, _react.useEffect)(function() {
        var ele = eleRef.current;
        var shadowRoot = (0, _shadow.getShadowRoot)(ele);
        (0, _dynamicCSS.updateCSS)(mergedStyleStr, "@ant-design-icons", {
          prepend: !layer,
          csp,
          attachTo: shadowRoot
        });
      }, []);
    };
  }
});

// node_modules/@ant-design/icons/lib/components/IconBase.js
var require_IconBase = __commonJS({
  "node_modules/@ant-design/icons/lib/components/IconBase.js"(exports2) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault().default;
    var _interopRequireWildcard = require_interopRequireWildcard().default;
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _objectWithoutProperties2 = _interopRequireDefault(require_objectWithoutProperties());
    var _objectSpread22 = _interopRequireDefault(require_objectSpread2());
    var React48 = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _excluded2 = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"];
    var twoToneColorPalette = {
      primaryColor: "#333",
      secondaryColor: "#E6E6E6",
      calculated: false
    };
    function setTwoToneColors(_ref) {
      var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
      twoToneColorPalette.primaryColor = primaryColor;
      twoToneColorPalette.secondaryColor = secondaryColor || (0, _utils.getSecondaryColor)(primaryColor);
      twoToneColorPalette.calculated = !!secondaryColor;
    }
    function getTwoToneColors() {
      return (0, _objectSpread22.default)({}, twoToneColorPalette);
    }
    var IconBase = function IconBase2(props) {
      var icon = props.icon, className = props.className, onClick = props.onClick, style = props.style, primaryColor = props.primaryColor, secondaryColor = props.secondaryColor, restProps = (0, _objectWithoutProperties2.default)(props, _excluded2);
      var svgRef = React48.useRef();
      var colors = twoToneColorPalette;
      if (primaryColor) {
        colors = {
          primaryColor,
          secondaryColor: secondaryColor || (0, _utils.getSecondaryColor)(primaryColor)
        };
      }
      (0, _utils.useInsertStyles)(svgRef);
      (0, _utils.warning)((0, _utils.isIconDefinition)(icon), "icon should be icon definiton, but got ".concat(icon));
      if (!(0, _utils.isIconDefinition)(icon)) {
        return null;
      }
      var target = icon;
      if (target && typeof target.icon === "function") {
        target = (0, _objectSpread22.default)((0, _objectSpread22.default)({}, target), {}, {
          icon: target.icon(colors.primaryColor, colors.secondaryColor)
        });
      }
      return (0, _utils.generate)(target.icon, "svg-".concat(target.name), (0, _objectSpread22.default)((0, _objectSpread22.default)({
        className,
        onClick,
        style,
        "data-icon": target.name,
        width: "1em",
        height: "1em",
        fill: "currentColor",
        "aria-hidden": "true"
      }, restProps), {}, {
        ref: svgRef
      }));
    };
    IconBase.displayName = "IconReact";
    IconBase.getTwoToneColors = getTwoToneColors;
    IconBase.setTwoToneColors = setTwoToneColors;
    var _default = exports2.default = IconBase;
  }
});

// node_modules/@ant-design/icons/lib/components/twoTonePrimaryColor.js
var require_twoTonePrimaryColor = __commonJS({
  "node_modules/@ant-design/icons/lib/components/twoTonePrimaryColor.js"(exports2) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault().default;
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.getTwoToneColor = getTwoToneColor;
    exports2.setTwoToneColor = setTwoToneColor;
    var _slicedToArray22 = _interopRequireDefault(require_slicedToArray());
    var _IconBase = _interopRequireDefault(require_IconBase());
    var _utils = require_utils();
    function setTwoToneColor(twoToneColor) {
      var _normalizeTwoToneColo = (0, _utils.normalizeTwoToneColors)(twoToneColor), _normalizeTwoToneColo2 = (0, _slicedToArray22.default)(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
      return _IconBase.default.setTwoToneColors({
        primaryColor,
        secondaryColor
      });
    }
    function getTwoToneColor() {
      var colors = _IconBase.default.getTwoToneColors();
      if (!colors.calculated) {
        return colors.primaryColor;
      }
      return [colors.primaryColor, colors.secondaryColor];
    }
  }
});

// node_modules/@ant-design/icons/lib/components/AntdIcon.js
var require_AntdIcon = __commonJS({
  "node_modules/@ant-design/icons/lib/components/AntdIcon.js"(exports2) {
    "use strict";
    "use client";
    var _interopRequireDefault = require_interopRequireDefault().default;
    var _interopRequireWildcard = require_interopRequireWildcard().default;
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _extends2 = _interopRequireDefault(require_extends());
    var _slicedToArray22 = _interopRequireDefault(require_slicedToArray());
    var _defineProperty2 = _interopRequireDefault(require_defineProperty());
    var _objectWithoutProperties2 = _interopRequireDefault(require_objectWithoutProperties());
    var React48 = _interopRequireWildcard(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _colors = (init_es(), __toCommonJS(es_exports));
    var _Context = _interopRequireDefault(require_Context());
    var _IconBase = _interopRequireDefault(require_IconBase());
    var _twoTonePrimaryColor = require_twoTonePrimaryColor();
    var _utils = require_utils();
    var _excluded2 = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
    (0, _twoTonePrimaryColor.setTwoToneColor)(_colors.blue.primary);
    var Icon = React48.forwardRef(function(props, ref) {
      var className = props.className, icon = props.icon, spin = props.spin, rotate = props.rotate, tabIndex = props.tabIndex, onClick = props.onClick, twoToneColor = props.twoToneColor, restProps = (0, _objectWithoutProperties2.default)(props, _excluded2);
      var _React$useContext = React48.useContext(_Context.default), _React$useContext$pre = _React$useContext.prefixCls, prefixCls = _React$useContext$pre === void 0 ? "anticon" : _React$useContext$pre, rootClassName = _React$useContext.rootClassName;
      var classString = (0, _classnames.default)(rootClassName, prefixCls, (0, _defineProperty2.default)((0, _defineProperty2.default)({}, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), "".concat(prefixCls, "-spin"), !!spin || icon.name === "loading"), className);
      var iconTabIndex = tabIndex;
      if (iconTabIndex === void 0 && onClick) {
        iconTabIndex = -1;
      }
      var svgStyle = rotate ? {
        msTransform: "rotate(".concat(rotate, "deg)"),
        transform: "rotate(".concat(rotate, "deg)")
      } : void 0;
      var _normalizeTwoToneColo = (0, _utils.normalizeTwoToneColors)(twoToneColor), _normalizeTwoToneColo2 = (0, _slicedToArray22.default)(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
      return React48.createElement("span", (0, _extends2.default)({
        role: "img",
        "aria-label": icon.name
      }, restProps, {
        ref,
        tabIndex: iconTabIndex,
        onClick,
        className: classString
      }), React48.createElement(_IconBase.default, {
        icon,
        primaryColor,
        secondaryColor,
        style: svgStyle
      }));
    });
    Icon.displayName = "AntdIcon";
    Icon.getTwoToneColor = _twoTonePrimaryColor.getTwoToneColor;
    Icon.setTwoToneColor = _twoTonePrimaryColor.setTwoToneColor;
    var _default = exports2.default = Icon;
  }
});

// node_modules/@ant-design/icons/lib/icons/ArrowLeftOutlined.js
var require_ArrowLeftOutlined2 = __commonJS({
  "node_modules/@ant-design/icons/lib/icons/ArrowLeftOutlined.js"(exports2) {
    "use strict";
    var _interopRequireWildcard = require_interopRequireWildcard().default;
    var _interopRequireDefault = require_interopRequireDefault().default;
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _extends2 = _interopRequireDefault(require_extends());
    var React48 = _interopRequireWildcard(require_react());
    var _ArrowLeftOutlined = _interopRequireDefault(require_ArrowLeftOutlined());
    var _AntdIcon = _interopRequireDefault(require_AntdIcon());
    var ArrowLeftOutlined2 = function ArrowLeftOutlined3(props, ref) {
      return React48.createElement(_AntdIcon.default, (0, _extends2.default)({}, props, {
        ref,
        icon: _ArrowLeftOutlined.default
      }));
    };
    var RefIcon = React48.forwardRef(ArrowLeftOutlined2);
    if (true) {
      RefIcon.displayName = "ArrowLeftOutlined";
    }
    var _default = exports2.default = RefIcon;
  }
});

// node_modules/@ant-design/icons/ArrowLeftOutlined.js
var require_ArrowLeftOutlined3 = __commonJS({
  "node_modules/@ant-design/icons/ArrowLeftOutlined.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _ArrowLeftOutlined = _interopRequireDefault(require_ArrowLeftOutlined2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _default = _ArrowLeftOutlined;
    exports2.default = _default;
    module2.exports = _default;
  }
});

// node_modules/@ant-design/icons-svg/lib/asn/ArrowRightOutlined.js
var require_ArrowRightOutlined = __commonJS({
  "node_modules/@ant-design/icons-svg/lib/asn/ArrowRightOutlined.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var ArrowRightOutlined2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z" } }] }, "name": "arrow-right", "theme": "outlined" };
    exports2.default = ArrowRightOutlined2;
  }
});

// node_modules/@ant-design/icons/lib/icons/ArrowRightOutlined.js
var require_ArrowRightOutlined2 = __commonJS({
  "node_modules/@ant-design/icons/lib/icons/ArrowRightOutlined.js"(exports2) {
    "use strict";
    var _interopRequireWildcard = require_interopRequireWildcard().default;
    var _interopRequireDefault = require_interopRequireDefault().default;
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _extends2 = _interopRequireDefault(require_extends());
    var React48 = _interopRequireWildcard(require_react());
    var _ArrowRightOutlined = _interopRequireDefault(require_ArrowRightOutlined());
    var _AntdIcon = _interopRequireDefault(require_AntdIcon());
    var ArrowRightOutlined2 = function ArrowRightOutlined3(props, ref) {
      return React48.createElement(_AntdIcon.default, (0, _extends2.default)({}, props, {
        ref,
        icon: _ArrowRightOutlined.default
      }));
    };
    var RefIcon = React48.forwardRef(ArrowRightOutlined2);
    if (true) {
      RefIcon.displayName = "ArrowRightOutlined";
    }
    var _default = exports2.default = RefIcon;
  }
});

// node_modules/@ant-design/icons/ArrowRightOutlined.js
var require_ArrowRightOutlined3 = __commonJS({
  "node_modules/@ant-design/icons/ArrowRightOutlined.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _ArrowRightOutlined = _interopRequireDefault(require_ArrowRightOutlined2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _default = _ArrowRightOutlined;
    exports2.default = _default;
    module2.exports = _default;
  }
});

// node_modules/path-to-regexp/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/path-to-regexp/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TokenData = void 0;
    exports2.parse = parse;
    exports2.compile = compile;
    exports2.match = match3;
    exports2.pathToRegexp = pathToRegexp3;
    exports2.stringify = stringify2;
    var DEFAULT_DELIMITER = "/";
    var NOOP_VALUE = (value) => value;
    var ID_START = /^[$_\p{ID_Start}]$/u;
    var ID_CONTINUE = /^[$\u200c\u200d\p{ID_Continue}]$/u;
    var DEBUG_URL = "https://git.new/pathToRegexpError";
    var SIMPLE_TOKENS = {
      // Groups.
      "{": "{",
      "}": "}",
      // Reserved.
      "(": "(",
      ")": ")",
      "[": "[",
      "]": "]",
      "+": "+",
      "?": "?",
      "!": "!"
    };
    function escapeText(str) {
      return str.replace(/[{}()\[\]+?!:*]/g, "\\$&");
    }
    function escape(str) {
      return str.replace(/[.+*?^${}()[\]|/\\]/g, "\\$&");
    }
    function* lexer(str) {
      const chars = [...str];
      let i = 0;
      function name() {
        let value = "";
        if (ID_START.test(chars[++i])) {
          value += chars[i];
          while (ID_CONTINUE.test(chars[++i])) {
            value += chars[i];
          }
        } else if (chars[i] === '"') {
          let pos = i;
          while (i < chars.length) {
            if (chars[++i] === '"') {
              i++;
              pos = 0;
              break;
            }
            if (chars[i] === "\\") {
              value += chars[++i];
            } else {
              value += chars[i];
            }
          }
          if (pos) {
            throw new TypeError(`Unterminated quote at ${pos}: ${DEBUG_URL}`);
          }
        }
        if (!value) {
          throw new TypeError(`Missing parameter name at ${i}: ${DEBUG_URL}`);
        }
        return value;
      }
      while (i < chars.length) {
        const value = chars[i];
        const type = SIMPLE_TOKENS[value];
        if (type) {
          yield { type, index: i++, value };
        } else if (value === "\\") {
          yield { type: "ESCAPED", index: i++, value: chars[i++] };
        } else if (value === ":") {
          const value2 = name();
          yield { type: "PARAM", index: i, value: value2 };
        } else if (value === "*") {
          const value2 = name();
          yield { type: "WILDCARD", index: i, value: value2 };
        } else {
          yield { type: "CHAR", index: i, value: chars[i++] };
        }
      }
      return { type: "END", index: i, value: "" };
    }
    var Iter = class {
      constructor(tokens) {
        this.tokens = tokens;
      }
      peek() {
        if (!this._peek) {
          const next = this.tokens.next();
          this._peek = next.value;
        }
        return this._peek;
      }
      tryConsume(type) {
        const token2 = this.peek();
        if (token2.type !== type)
          return;
        this._peek = void 0;
        return token2.value;
      }
      consume(type) {
        const value = this.tryConsume(type);
        if (value !== void 0)
          return value;
        const { type: nextType, index } = this.peek();
        throw new TypeError(`Unexpected ${nextType} at ${index}, expected ${type}: ${DEBUG_URL}`);
      }
      text() {
        let result = "";
        let value;
        while (value = this.tryConsume("CHAR") || this.tryConsume("ESCAPED")) {
          result += value;
        }
        return result;
      }
    };
    var TokenData = class {
      constructor(tokens) {
        this.tokens = tokens;
      }
    };
    exports2.TokenData = TokenData;
    function parse(str, options = {}) {
      const { encodePath = NOOP_VALUE } = options;
      const it2 = new Iter(lexer(str));
      function consume(endType) {
        const tokens2 = [];
        while (true) {
          const path = it2.text();
          if (path)
            tokens2.push({ type: "text", value: encodePath(path) });
          const param = it2.tryConsume("PARAM");
          if (param) {
            tokens2.push({
              type: "param",
              name: param
            });
            continue;
          }
          const wildcard = it2.tryConsume("WILDCARD");
          if (wildcard) {
            tokens2.push({
              type: "wildcard",
              name: wildcard
            });
            continue;
          }
          const open = it2.tryConsume("{");
          if (open) {
            tokens2.push({
              type: "group",
              tokens: consume("}")
            });
            continue;
          }
          it2.consume(endType);
          return tokens2;
        }
      }
      const tokens = consume("END");
      return new TokenData(tokens);
    }
    function compile(path, options = {}) {
      const { encode = encodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
      const data = path instanceof TokenData ? path : parse(path, options);
      const fn = tokensToFunction(data.tokens, delimiter, encode);
      return function path2(data2 = {}) {
        const [path3, ...missing] = fn(data2);
        if (missing.length) {
          throw new TypeError(`Missing parameters: ${missing.join(", ")}`);
        }
        return path3;
      };
    }
    function tokensToFunction(tokens, delimiter, encode) {
      const encoders = tokens.map((token2) => tokenToFunction(token2, delimiter, encode));
      return (data) => {
        const result = [""];
        for (const encoder of encoders) {
          const [value, ...extras] = encoder(data);
          result[0] += value;
          result.push(...extras);
        }
        return result;
      };
    }
    function tokenToFunction(token2, delimiter, encode) {
      if (token2.type === "text")
        return () => [token2.value];
      if (token2.type === "group") {
        const fn = tokensToFunction(token2.tokens, delimiter, encode);
        return (data) => {
          const [value, ...missing] = fn(data);
          if (!missing.length)
            return [value];
          return [""];
        };
      }
      const encodeValue = encode || NOOP_VALUE;
      if (token2.type === "wildcard" && encode !== false) {
        return (data) => {
          const value = data[token2.name];
          if (value == null)
            return ["", token2.name];
          if (!Array.isArray(value) || value.length === 0) {
            throw new TypeError(`Expected "${token2.name}" to be a non-empty array`);
          }
          return [
            value.map((value2, index) => {
              if (typeof value2 !== "string") {
                throw new TypeError(`Expected "${token2.name}/${index}" to be a string`);
              }
              return encodeValue(value2);
            }).join(delimiter)
          ];
        };
      }
      return (data) => {
        const value = data[token2.name];
        if (value == null)
          return ["", token2.name];
        if (typeof value !== "string") {
          throw new TypeError(`Expected "${token2.name}" to be a string`);
        }
        return [encodeValue(value)];
      };
    }
    function match3(path, options = {}) {
      const { decode = decodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
      const { regexp, keys } = pathToRegexp3(path, options);
      const decoders = keys.map((key) => {
        if (decode === false)
          return NOOP_VALUE;
        if (key.type === "param")
          return decode;
        return (value) => value.split(delimiter).map(decode);
      });
      return function match4(input) {
        const m = regexp.exec(input);
        if (!m)
          return false;
        const path2 = m[0];
        const params = /* @__PURE__ */ Object.create(null);
        for (let i = 1; i < m.length; i++) {
          if (m[i] === void 0)
            continue;
          const key = keys[i - 1];
          const decoder = decoders[i - 1];
          params[key.name] = decoder(m[i]);
        }
        return { path: path2, params };
      };
    }
    function pathToRegexp3(path, options = {}) {
      const { delimiter = DEFAULT_DELIMITER, end = true, sensitive = false, trailing = true } = options;
      const keys = [];
      const sources = [];
      const flags = sensitive ? "" : "i";
      const paths = Array.isArray(path) ? path : [path];
      const items = paths.map((path2) => path2 instanceof TokenData ? path2 : parse(path2, options));
      for (const { tokens } of items) {
        for (const seq of flatten(tokens, 0, [])) {
          const regexp2 = sequenceToRegExp(seq, delimiter, keys);
          sources.push(regexp2);
        }
      }
      let pattern = `^(?:${sources.join("|")})`;
      if (trailing)
        pattern += `(?:${escape(delimiter)}$)?`;
      pattern += end ? "$" : `(?=${escape(delimiter)}|$)`;
      const regexp = new RegExp(pattern, flags);
      return { regexp, keys };
    }
    function* flatten(tokens, index, init) {
      if (index === tokens.length) {
        return yield init;
      }
      const token2 = tokens[index];
      if (token2.type === "group") {
        const fork = init.slice();
        for (const seq of flatten(token2.tokens, 0, fork)) {
          yield* flatten(tokens, index + 1, seq);
        }
      } else {
        init.push(token2);
      }
      yield* flatten(tokens, index + 1, init);
    }
    function sequenceToRegExp(tokens, delimiter, keys) {
      let result = "";
      let backtrack = "";
      let isSafeSegmentParam = true;
      for (let i = 0; i < tokens.length; i++) {
        const token2 = tokens[i];
        if (token2.type === "text") {
          result += escape(token2.value);
          backtrack += token2.value;
          isSafeSegmentParam || (isSafeSegmentParam = token2.value.includes(delimiter));
          continue;
        }
        if (token2.type === "param" || token2.type === "wildcard") {
          if (!isSafeSegmentParam && !backtrack) {
            throw new TypeError(`Missing text after "${token2.name}": ${DEBUG_URL}`);
          }
          if (token2.type === "param") {
            result += `(${negate(delimiter, isSafeSegmentParam ? "" : backtrack)}+)`;
          } else {
            result += `([\\s\\S]+)`;
          }
          keys.push(token2);
          backtrack = "";
          isSafeSegmentParam = false;
          continue;
        }
      }
      return result;
    }
    function negate(delimiter, backtrack) {
      if (backtrack.length < 2) {
        if (delimiter.length < 2)
          return `[^${escape(delimiter + backtrack)}]`;
        return `(?:(?!${escape(delimiter)})[^${escape(backtrack)}])`;
      }
      if (delimiter.length < 2) {
        return `(?:(?!${escape(backtrack)})[^${escape(delimiter)}])`;
      }
      return `(?:(?!${escape(backtrack)}|${escape(delimiter)})[\\s\\S])`;
    }
    function stringify2(data) {
      return data.tokens.map(function stringifyToken(token2, index, tokens) {
        if (token2.type === "text")
          return escapeText(token2.value);
        if (token2.type === "group") {
          return `{${token2.tokens.map(stringifyToken).join("")}}`;
        }
        const isSafe = isNameSafe(token2.name) && isNextNameSafe(tokens[index + 1]);
        const key = isSafe ? token2.name : JSON.stringify(token2.name);
        if (token2.type === "param")
          return `:${key}`;
        if (token2.type === "wildcard")
          return `*${key}`;
        throw new TypeError(`Unexpected token: ${token2}`);
      }).join("");
    }
    function isNameSafe(name) {
      const [first, ...rest] = name;
      if (!ID_START.test(first))
        return false;
      return rest.every((char) => ID_CONTINUE.test(char));
    }
    function isNextNameSafe(token2) {
      if ((token2 === null || token2 === void 0 ? void 0 : token2.type) !== "text")
        return true;
      return !ID_CONTINUE.test(token2.value[0]);
    }
  }
});

// node_modules/@umijs/route-utils/es/path-to-regexp.js
var require_path_to_regexp = __commonJS({
  "node_modules/@umijs/route-utils/es/path-to-regexp.js"(exports2) {
    function _typeof3(obj) {
      "@babel/helpers - typeof";
      return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof3(obj);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.pathToRegexp = exports2.tokensToRegexp = exports2.regexpToFunction = exports2.match = exports2.tokensToFunction = exports2.compile = exports2.parse = void 0;
    function lexer(str) {
      var tokens = [];
      var i = 0;
      while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
          tokens.push({
            type: "MODIFIER",
            index: i,
            value: str[i++]
          });
          continue;
        }
        if (char === "\\") {
          tokens.push({
            type: "ESCAPED_CHAR",
            index: i++,
            value: str[i++]
          });
          continue;
        }
        if (char === "{") {
          tokens.push({
            type: "OPEN",
            index: i,
            value: str[i++]
          });
          continue;
        }
        if (char === "}") {
          tokens.push({
            type: "CLOSE",
            index: i,
            value: str[i++]
          });
          continue;
        }
        if (char === ":") {
          var name = "";
          var j2 = i + 1;
          while (j2 < str.length) {
            var code = str.charCodeAt(j2);
            if (
              // `0-9`
              code >= 48 && code <= 57 || // `A-Z`
              code >= 65 && code <= 90 || // `a-z`
              code >= 97 && code <= 122 || // `_`
              code === 95
            ) {
              name += str[j2++];
              continue;
            }
            break;
          }
          if (!name) throw new TypeError("Missing parameter name at " + i);
          tokens.push({
            type: "NAME",
            index: i,
            value: name
          });
          i = j2;
          continue;
        }
        if (char === "(") {
          var count = 1;
          var pattern = "";
          var j2 = i + 1;
          if (str[j2] === "?") {
            throw new TypeError('Pattern cannot start with "?" at ' + j2);
          }
          while (j2 < str.length) {
            if (str[j2] === "\\") {
              pattern += str[j2++] + str[j2++];
              continue;
            }
            if (str[j2] === ")") {
              count--;
              if (count === 0) {
                j2++;
                break;
              }
            } else if (str[j2] === "(") {
              count++;
              if (str[j2 + 1] !== "?") {
                throw new TypeError("Capturing groups are not allowed at " + j2);
              }
            }
            pattern += str[j2++];
          }
          if (count) throw new TypeError("Unbalanced pattern at " + i);
          if (!pattern) throw new TypeError("Missing pattern at " + i);
          tokens.push({
            type: "PATTERN",
            index: i,
            value: pattern
          });
          i = j2;
          continue;
        }
        tokens.push({
          type: "CHAR",
          index: i,
          value: str[i++]
        });
      }
      tokens.push({
        type: "END",
        index: i,
        value: ""
      });
      return tokens;
    }
    function parse(str, options) {
      if (options === void 0) {
        options = {};
      }
      var tokens = lexer(str);
      var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
      var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
      var result = [];
      var key = 0;
      var i = 0;
      var path = "";
      var tryConsume = function tryConsume2(type) {
        if (i < tokens.length && tokens[i].type === type) return tokens[i++].value;
      };
      var mustConsume = function mustConsume2(type) {
        var value2 = tryConsume(type);
        if (value2 !== void 0) return value2;
        var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
      };
      var consumeText = function consumeText2() {
        var result2 = "";
        var value2;
        while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
          result2 += value2;
        }
        return result2;
      };
      while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
          var prefix = char || "";
          if (prefixes.indexOf(prefix) === -1) {
            path += prefix;
            prefix = "";
          }
          if (path) {
            result.push(path);
            path = "";
          }
          result.push({
            name: name || key++,
            prefix,
            suffix: "",
            pattern: pattern || defaultPattern,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
          path += value;
          continue;
        }
        if (path) {
          result.push(path);
          path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
          var prefix = consumeText();
          var name_1 = tryConsume("NAME") || "";
          var pattern_1 = tryConsume("PATTERN") || "";
          var suffix = consumeText();
          mustConsume("CLOSE");
          result.push({
            name: name_1 || (pattern_1 ? key++ : ""),
            pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
            prefix,
            suffix,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }
        mustConsume("END");
      }
      return result;
    }
    exports2.parse = parse;
    function compile(str, options) {
      return tokensToFunction(parse(str, options), options);
    }
    exports2.compile = compile;
    function tokensToFunction(tokens, options) {
      if (options === void 0) {
        options = {};
      }
      var reFlags = flags(options);
      var _a = options.encode, encode = _a === void 0 ? function(x) {
        return x;
      } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
      var matches = tokens.map(function(token2) {
        if (_typeof3(token2) === "object") {
          return new RegExp("^(?:" + token2.pattern + ")$", reFlags);
        }
      });
      return function(data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
          var token2 = tokens[i];
          if (typeof token2 === "string") {
            path += token2;
            continue;
          }
          var value = data ? data[token2.name] : void 0;
          var optional = token2.modifier === "?" || token2.modifier === "*";
          var repeat = token2.modifier === "*" || token2.modifier === "+";
          if (Array.isArray(value)) {
            if (!repeat) {
              throw new TypeError('Expected "' + token2.name + '" to not repeat, but got an array');
            }
            if (value.length === 0) {
              if (optional) continue;
              throw new TypeError('Expected "' + token2.name + '" to not be empty');
            }
            for (var j2 = 0; j2 < value.length; j2++) {
              var segment = encode(value[j2], token2);
              if (validate && !matches[i].test(segment)) {
                throw new TypeError('Expected all "' + token2.name + '" to match "' + token2.pattern + '", but got "' + segment + '"');
              }
              path += token2.prefix + segment + token2.suffix;
            }
            continue;
          }
          if (typeof value === "string" || typeof value === "number") {
            var segment = encode(String(value), token2);
            if (validate && !matches[i].test(segment)) {
              throw new TypeError('Expected "' + token2.name + '" to match "' + token2.pattern + '", but got "' + segment + '"');
            }
            path += token2.prefix + segment + token2.suffix;
            continue;
          }
          if (optional) continue;
          var typeOfMessage = repeat ? "an array" : "a string";
          throw new TypeError('Expected "' + token2.name + '" to be ' + typeOfMessage);
        }
        return path;
      };
    }
    exports2.tokensToFunction = tokensToFunction;
    function match3(str, options) {
      var keys = [];
      var re2 = pathToRegexp3(str, keys, options);
      return regexpToFunction(re2, keys, options);
    }
    exports2.match = match3;
    function regexpToFunction(re2, keys, options) {
      if (options === void 0) {
        options = {};
      }
      var _a = options.decode, decode = _a === void 0 ? function(x) {
        return x;
      } : _a;
      return function(pathname) {
        var m = re2.exec(pathname);
        if (!m) return false;
        var path = m[0], index = m.index;
        var params = /* @__PURE__ */ Object.create(null);
        var _loop_1 = function _loop_12(i2) {
          if (m[i2] === void 0) return "continue";
          var key = keys[i2 - 1];
          if (key.modifier === "*" || key.modifier === "+") {
            params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
              return decode(value, key);
            });
          } else {
            params[key.name] = decode(m[i2], key);
          }
        };
        for (var i = 1; i < m.length; i++) {
          _loop_1(i);
        }
        return {
          path,
          index,
          params
        };
      };
    }
    exports2.regexpToFunction = regexpToFunction;
    function escapeString(str) {
      return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }
    function flags(options) {
      return options && options.sensitive ? "" : "i";
    }
    function regexpToRegexp(path, keys) {
      if (!keys) return path;
      var groups = path.source.match(/\((?!\?)/g);
      if (groups) {
        for (var i = 0; i < groups.length; i++) {
          keys.push({
            name: i,
            prefix: "",
            suffix: "",
            modifier: "",
            pattern: ""
          });
        }
      }
      return path;
    }
    function arrayToRegexp(paths, keys, options) {
      var parts = paths.map(function(path) {
        return pathToRegexp3(path, keys, options).source;
      });
      return new RegExp("(?:" + parts.join("|") + ")", flags(options));
    }
    function stringToRegexp(path, keys, options) {
      return tokensToRegexp(parse(path, options), keys, options);
    }
    function tokensToRegexp(tokens, keys, options) {
      if (options === void 0) {
        options = {};
      }
      var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
        return x;
      } : _d;
      var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
      var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
      var route = start ? "^" : "";
      for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token2 = tokens_1[_i];
        if (typeof token2 === "string") {
          route += escapeString(encode(token2));
        } else {
          var prefix = escapeString(encode(token2.prefix));
          var suffix = escapeString(encode(token2.suffix));
          if (token2.pattern) {
            if (keys) keys.push(token2);
            if (prefix || suffix) {
              if (token2.modifier === "+" || token2.modifier === "*") {
                var mod = token2.modifier === "*" ? "?" : "";
                route += "(?:" + prefix + "((?:" + token2.pattern + ")(?:" + suffix + prefix + "(?:" + token2.pattern + "))*)" + suffix + ")" + mod;
              } else {
                route += "(?:" + prefix + "(" + token2.pattern + ")" + suffix + ")" + token2.modifier;
              }
            } else {
              route += "(" + token2.pattern + ")" + token2.modifier;
            }
          } else {
            route += "(?:" + prefix + suffix + ")" + token2.modifier;
          }
        }
      }
      if (end) {
        if (!strict) route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
      } else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : (
          // tslint:disable-next-line
          endToken === void 0
        );
        if (!strict) {
          route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
          route += "(?=" + delimiter + "|" + endsWith + ")";
        }
      }
      return new RegExp(route, flags(options));
    }
    exports2.tokensToRegexp = tokensToRegexp;
    function pathToRegexp3(path, keys, options) {
      if (path instanceof RegExp) return regexpToRegexp(path, keys);
      if (Array.isArray(path)) return arrayToRegexp(path, keys, options);
      return stringToRegexp(path, keys, options);
    }
    exports2.pathToRegexp = pathToRegexp3;
  }
});

// node_modules/@refinedev/antd/dist/index.mjs
var import_react76 = __toESM(require_react(), 1);

// node_modules/tslib/tslib.es6.mjs
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

// node_modules/sunflower-antd/es/useFormTable/index.js
var import_react2 = __toESM(require_react());

// node_modules/sunflower-antd/es/form.js
var form_default2 = form_default;

// node_modules/sunflower-antd/es/useSearchResult/index.js
var import_react = __toESM(require_react());

// node_modules/sunflower-antd/es/useCascadeSelect/index.js
var import_react4 = __toESM(require_react());

// node_modules/sunflower-antd/es/useCascadeSearch/index.js
var import_react3 = __toESM(require_react());

// node_modules/sunflower-antd/es/useModal/index.js
var import_react5 = __toESM(require_react());

// node_modules/sunflower-antd/es/useForm/index.js
var import_react6 = __toESM(require_react());
var useForm = function(config) {
  var _a = (0, import_react6.useState)(false), defaultFormValuesLoading = _a[0], setDefaultFormValuesLoading = _a[1];
  var _b = (0, import_react6.useState)({}), initialValues = _b[0], setInitialValues = _b[1];
  var defaultFormValues = config.defaultFormValues, form = config.form, submit = config.submit;
  var _c = (0, import_react6.useState)({}), formValues = _c[0], setFormValues = _c[1];
  var _d = (0, import_react6.useState)(false), formLoading = _d[0], setFormLoading = _d[1];
  var _e3 = (0, import_react6.useState)(), formResult = _e3[0], setFormResult = _e3[1];
  var version = 3;
  if (form_default2["useForm"]) {
    version = 4;
  }
  var formInstance = form;
  if (!form) {
    if (version === 4) {
      formInstance = form_default2["useForm"]()[0];
    } else {
      throw new Error('"form" need in antd@3');
    }
  }
  var onFinish = function(formValue) {
    setFormValues(formValue);
    setFormLoading(true);
    return new Promise(function(resolve, reject) {
      if (version === 4) {
        formInstance.validateFields().then(function() {
          resolve(Promise.resolve(submit(formValue)).then(function(data) {
            setFormLoading(false);
            setFormResult(data);
            return data;
          }).catch(function(err) {
            setFormLoading(false);
            throw err;
          }));
        }).catch(function(validateErr) {
          setFormLoading(false);
          reject(validateErr);
        });
      } else {
        formInstance.validateFields(function(validateErr) {
          if (validateErr) {
            setFormLoading(false);
            reject(validateErr);
          } else {
            resolve(Promise.resolve(submit(formValue)).then(function(data) {
              setFormLoading(false);
              setFormResult(data);
              return data;
            }).catch(function(err) {
              setFormLoading(false);
              throw err;
            }));
          }
        });
      }
    });
  };
  (0, import_react6.useEffect)(function() {
    var isUnMounted = false;
    if (!defaultFormValues) {
      return;
    }
    var value;
    if (typeof defaultFormValues === "function") {
      setDefaultFormValuesLoading(true);
      value = defaultFormValues();
    } else {
      value = defaultFormValues;
    }
    Promise.resolve(value).then(function(data) {
      if (!isUnMounted) {
        var obj_1 = __assign({}, data);
        Object.keys(data).forEach(function(name) {
          obj_1[name] = formInstance.isFieldTouched(name) ? formInstance.getFieldValue(name) : data[name];
        });
        setDefaultFormValuesLoading(false);
        setInitialValues(data);
        formInstance.setFieldsValue(obj_1);
      }
    }).catch(function() {
      if (!isUnMounted) {
        setDefaultFormValuesLoading(false);
      }
    });
    return function() {
      isUnMounted = true;
    };
  }, []);
  var formProps = version === 4 ? {
    form: formInstance,
    onFinish,
    initialValues
  } : {
    onSubmit: function(e2) {
      e2.preventDefault();
      onFinish(formInstance.getFieldsValue(version === 4 ? true : void 0));
    }
  };
  return {
    form: formInstance,
    formProps,
    defaultFormValuesLoading,
    formValues,
    initialValues,
    formResult,
    formLoading,
    submit: function(values) {
      formInstance.setFieldsValue(values);
      return onFinish(formInstance.getFieldsValue(version === 4 ? true : void 0));
    }
  };
};

// node_modules/sunflower-antd/es/useStepsForm/index.js
var import_react7 = __toESM(require_react());
var useStepsForm = function(config) {
  var _a = config || {}, form = _a.form, defaultFormValues = _a.defaultFormValues, _b = _a.defaultCurrent, defaultCurrent = _b === void 0 ? 0 : _b, submit = _a.submit, total = _a.total, _c = _a.isBackValidate, isBackValidate = _c === void 0 ? true : _c;
  var _d = (0, import_react7.useState)(defaultCurrent), current = _d[0], setCurrent = _d[1];
  var _e3 = useForm({
    form,
    submit,
    defaultFormValues
  }), formInstance = _e3.form, formProps = _e3.formProps, formLoading = _e3.formLoading, defaultFormValuesLoading = _e3.defaultFormValuesLoading, formValues = _e3.formValues, initialValues = _e3.initialValues, formResult = _e3.formResult, formSubmit = _e3.submit;
  var go2 = function(step) {
    var targetStep = step;
    if (step > total - 1) {
      targetStep = total - 1;
    }
    if (step < 0) {
      targetStep = 0;
    }
    setCurrent(targetStep);
  };
  var gotoStep = function(step) {
    if (step === current) {
      return true;
    }
    if (step < current && !isBackValidate) {
      go2(step);
      return true;
    }
    return formInstance.validateFields().then(function(values) {
      go2(step);
      return values;
    });
  };
  var handleStepChange = function(currentStep) {
    return gotoStep(currentStep);
  };
  return {
    current,
    gotoStep,
    stepsProps: {
      current,
      onChange: handleStepChange
    },
    formProps,
    formLoading,
    defaultFormValuesLoading,
    formValues,
    initialValues,
    formResult,
    form: formInstance,
    submit: formSubmit
  };
};

// node_modules/@refinedev/antd/dist/index.mjs
var import_react77 = __toESM(require_react(), 1);
var import_react78 = __toESM(require_react(), 1);
var import_react79 = __toESM(require_react(), 1);
var import_react80 = __toESM(require_react(), 1);
var import_react81 = __toESM(require_react(), 1);
var import_react82 = __toESM(require_react(), 1);
var import_react83 = __toESM(require_react(), 1);
var import_react84 = __toESM(require_react(), 1);
var import_react85 = __toESM(require_react(), 1);
var import_react86 = __toESM(require_react(), 1);
var import_react87 = __toESM(require_react(), 1);
var import_react88 = __toESM(require_react(), 1);
var import_react89 = __toESM(require_react(), 1);
var import_react90 = __toESM(require_react(), 1);
var import_react91 = __toESM(require_react(), 1);
var import_react92 = __toESM(require_react(), 1);
var import_react93 = __toESM(require_react(), 1);
var import_react94 = __toESM(require_react(), 1);
var import_react95 = __toESM(require_react(), 1);
var import_react96 = __toESM(require_react(), 1);
var import_react97 = __toESM(require_react(), 1);
var import_react98 = __toESM(require_react(), 1);
var import_react99 = __toESM(require_react(), 1);
var import_react100 = __toESM(require_react(), 1);
var import_react101 = __toESM(require_react(), 1);

// node_modules/@refinedev/ui-types/dist/index.mjs
var o = { Title: "refine-pageHeader-title", SubTitle: "refine-pageHeader-subTitle" };
var n = { CloneButton: "refine-clone-button", DeleteButton: "refine-delete-button", EditButton: "refine-edit-button", SaveButton: "refine-save-button", CreateButton: "refine-create-button", ImportButton: "refine-import-button", ExportButton: "refine-export-button", ListButton: "refine-list-button", RefreshButton: "refine-refresh-button", ShowButton: "refine-show-button" };

// node_modules/@refinedev/antd/dist/index.mjs
var import_react102 = __toESM(require_react(), 1);
var import_react103 = __toESM(require_react(), 1);
var import_react104 = __toESM(require_react(), 1);
var import_react105 = __toESM(require_react(), 1);
var import_react106 = __toESM(require_react(), 1);
var import_react107 = __toESM(require_react(), 1);
var import_react108 = __toESM(require_react(), 1);
var import_react109 = __toESM(require_react(), 1);
var import_react110 = __toESM(require_react(), 1);
var import_react111 = __toESM(require_react(), 1);
var import_react112 = __toESM(require_react(), 1);
var import_react113 = __toESM(require_react(), 1);
var import_react114 = __toESM(require_react(), 1);
var import_react115 = __toESM(require_react(), 1);
var import_react116 = __toESM(require_react(), 1);
var import_react117 = __toESM(require_react(), 1);
var import_react118 = __toESM(require_react(), 1);
var import_react119 = __toESM(require_react(), 1);
var import_react120 = __toESM(require_react(), 1);
var import_dayjs5 = __toESM(require_dayjs_min(), 1);
var import_localizedFormat = __toESM(require_localizedFormat(), 1);
var import_react121 = __toESM(require_react(), 1);
var import_react122 = __toESM(require_react(), 1);
var import_react123 = __toESM(require_react(), 1);
var import_react124 = __toESM(require_react(), 1);
var import_react_markdown = __toESM(require_react_markdown(), 1);
var import_remark_gfm = __toESM(require_remark_gfm(), 1);
var import_react125 = __toESM(require_react(), 1);
var import_dayjs6 = __toESM(require_dayjs_min(), 1);
var import_react126 = __toESM(require_react(), 1);
var import_react127 = __toESM(require_react(), 1);
var re = __toESM(require_react(), 1);
var import_react128 = __toESM(require_react(), 1);
var import_react129 = __toESM(require_react(), 1);
var import_react130 = __toESM(require_react(), 1);
var import_react131 = __toESM(require_react(), 1);
var import_react132 = __toESM(require_react(), 1);
var import_react133 = __toESM(require_react(), 1);
var import_react134 = __toESM(require_react(), 1);
var import_react135 = __toESM(require_react(), 1);

// node_modules/@ant-design/pro-layout/es/components/FooterToolbar/index.js
init_defineProperty();

// node_modules/rc-picker/es/locale/zh_CN.js
var locale = _objectSpread2(_objectSpread2({}, commonLocale), {}, {
  locale: "zh_CN",
  today: "今天",
  now: "此刻",
  backToToday: "返回今天",
  ok: "确定",
  timeSelect: "选择时间",
  dateSelect: "选择日期",
  weekSelect: "选择周",
  clear: "清除",
  week: "周",
  month: "月",
  year: "年",
  previousMonth: "上个月 (翻页上键)",
  nextMonth: "下个月 (翻页下键)",
  monthSelect: "选择月份",
  yearSelect: "选择年份",
  decadeSelect: "选择年代",
  previousYear: "上一年 (Control键加左方向键)",
  nextYear: "下一年 (Control键加右方向键)",
  previousDecade: "上一年代",
  nextDecade: "下一年代",
  previousCentury: "上一世纪",
  nextCentury: "下一世纪",
  yearFormat: "YYYY年",
  cellDateFormat: "D",
  monthBeforeYear: false
});
var zh_CN_default = locale;

// node_modules/antd/es/time-picker/locale/zh_CN.js
var locale2 = {
  placeholder: "请选择时间",
  rangePlaceholder: ["开始时间", "结束时间"]
};
var zh_CN_default2 = locale2;

// node_modules/antd/es/date-picker/locale/zh_CN.js
var locale3 = {
  lang: Object.assign({
    placeholder: "请选择日期",
    yearPlaceholder: "请选择年份",
    quarterPlaceholder: "请选择季度",
    monthPlaceholder: "请选择月份",
    weekPlaceholder: "请选择周",
    rangePlaceholder: ["开始日期", "结束日期"],
    rangeYearPlaceholder: ["开始年份", "结束年份"],
    rangeMonthPlaceholder: ["开始月份", "结束月份"],
    rangeQuarterPlaceholder: ["开始季度", "结束季度"],
    rangeWeekPlaceholder: ["开始周", "结束周"]
  }, zh_CN_default),
  timePickerLocale: Object.assign({}, zh_CN_default2)
};
locale3.lang.ok = "确定";

// node_modules/@ant-design/pro-provider/es/index.js
var import_react12 = __toESM(require_react());

// node_modules/swr/dist/index/index.mjs
var import_react10 = __toESM(require_react(), 1);
var import_shim = __toESM(require_shim(), 1);

// node_modules/swr/dist/_internal/config-context-client-v7VOFo66.mjs
var import_react8 = __toESM(require_react(), 1);

// node_modules/swr/dist/_internal/events.mjs
var events_exports = {};
__export(events_exports, {
  ERROR_REVALIDATE_EVENT: () => ERROR_REVALIDATE_EVENT,
  FOCUS_EVENT: () => FOCUS_EVENT,
  MUTATE_EVENT: () => MUTATE_EVENT,
  RECONNECT_EVENT: () => RECONNECT_EVENT
});
var FOCUS_EVENT = 0;
var RECONNECT_EVENT = 1;
var MUTATE_EVENT = 2;
var ERROR_REVALIDATE_EVENT = 3;

// node_modules/dequal/lite/index.mjs
var has = Object.prototype.hasOwnProperty;
function dequal(foo, bar) {
  var ctor, len;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal(foo[len], bar[len])) ;
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}

// node_modules/swr/dist/_internal/config-context-client-v7VOFo66.mjs
var SWRGlobalState = /* @__PURE__ */ new WeakMap();
var noop = () => {
};
var UNDEFINED = (
  /*#__NOINLINE__*/
  noop()
);
var OBJECT = Object;
var isUndefined = (v) => v === UNDEFINED;
var isFunction = (v) => typeof v == "function";
var mergeObjects = (a, b) => ({
  ...a,
  ...b
});
var isPromiseLike = (x) => isFunction(x.then);
var EMPTY_CACHE = {};
var INITIAL_CACHE = {};
var STR_UNDEFINED = "undefined";
var isWindowDefined = typeof window != STR_UNDEFINED;
var isDocumentDefined = typeof document != STR_UNDEFINED;
var isLegacyDeno = isWindowDefined && "Deno" in window;
var hasRequestAnimationFrame = () => isWindowDefined && typeof window["requestAnimationFrame"] != STR_UNDEFINED;
var createCacheHelper = (cache2, key) => {
  const state = SWRGlobalState.get(cache2);
  return [
    // Getter
    () => !isUndefined(key) && cache2.get(key) || EMPTY_CACHE,
    // Setter
    (info) => {
      if (!isUndefined(key)) {
        const prev = cache2.get(key);
        if (!(key in INITIAL_CACHE)) {
          INITIAL_CACHE[key] = prev;
        }
        state[5](key, mergeObjects(prev, info), prev || EMPTY_CACHE);
      }
    },
    // Subscriber
    state[6],
    // Get server cache snapshot
    () => {
      if (!isUndefined(key)) {
        if (key in INITIAL_CACHE) return INITIAL_CACHE[key];
      }
      return !isUndefined(key) && cache2.get(key) || EMPTY_CACHE;
    }
  ];
};
var online = true;
var isOnline = () => online;
var [onWindowEvent, offWindowEvent] = isWindowDefined && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  noop,
  noop
];
var isVisible = () => {
  const visibilityState = isDocumentDefined && document.visibilityState;
  return isUndefined(visibilityState) || visibilityState !== "hidden";
};
var initFocus = (callback) => {
  if (isDocumentDefined) {
    document.addEventListener("visibilitychange", callback);
  }
  onWindowEvent("focus", callback);
  return () => {
    if (isDocumentDefined) {
      document.removeEventListener("visibilitychange", callback);
    }
    offWindowEvent("focus", callback);
  };
};
var initReconnect = (callback) => {
  const onOnline = () => {
    online = true;
    callback();
  };
  const onOffline = () => {
    online = false;
  };
  onWindowEvent("online", onOnline);
  onWindowEvent("offline", onOffline);
  return () => {
    offWindowEvent("online", onOnline);
    offWindowEvent("offline", onOffline);
  };
};
var preset = {
  isOnline,
  isVisible
};
var defaultConfigOptions = {
  initFocus,
  initReconnect
};
var IS_REACT_LEGACY = !import_react8.default.useId;
var IS_SERVER = !isWindowDefined || isLegacyDeno;
var rAF = (f) => hasRequestAnimationFrame() ? window["requestAnimationFrame"](f) : setTimeout(f, 1);
var useIsomorphicLayoutEffect = IS_SERVER ? import_react8.useEffect : import_react8.useLayoutEffect;
var navigatorConnection = typeof navigator !== "undefined" && navigator.connection;
var slowConnection = !IS_SERVER && navigatorConnection && ([
  "slow-2g",
  "2g"
].includes(navigatorConnection.effectiveType) || navigatorConnection.saveData);
var table = /* @__PURE__ */ new WeakMap();
var isObjectType = (value, type) => OBJECT.prototype.toString.call(value) === `[object ${type}]`;
var counter = 0;
var stableHash = (arg) => {
  const type = typeof arg;
  const isDate = isObjectType(arg, "Date");
  const isRegex = isObjectType(arg, "RegExp");
  const isPlainObject2 = isObjectType(arg, "Object");
  let result;
  let index;
  if (OBJECT(arg) === arg && !isDate && !isRegex) {
    result = table.get(arg);
    if (result) return result;
    result = ++counter + "~";
    table.set(arg, result);
    if (Array.isArray(arg)) {
      result = "@";
      for (index = 0; index < arg.length; index++) {
        result += stableHash(arg[index]) + ",";
      }
      table.set(arg, result);
    }
    if (isPlainObject2) {
      result = "#";
      const keys = OBJECT.keys(arg).sort();
      while (!isUndefined(index = keys.pop())) {
        if (!isUndefined(arg[index])) {
          result += index + ":" + stableHash(arg[index]) + ",";
        }
      }
      table.set(arg, result);
    }
  } else {
    result = isDate ? arg.toJSON() : type == "symbol" ? arg.toString() : type == "string" ? JSON.stringify(arg) : "" + arg;
  }
  return result;
};
var serialize = (key) => {
  if (isFunction(key)) {
    try {
      key = key();
    } catch (err) {
      key = "";
    }
  }
  const args = key;
  key = typeof key == "string" ? key : (Array.isArray(key) ? key.length : key) ? stableHash(key) : "";
  return [
    key,
    args
  ];
};
var __timestamp = 0;
var getTimestamp = () => ++__timestamp;
async function internalMutate(...args) {
  const [cache2, _key, _data, _opts] = args;
  const options = mergeObjects({
    populateCache: true,
    throwOnError: true
  }, typeof _opts === "boolean" ? {
    revalidate: _opts
  } : _opts || {});
  let populateCache = options.populateCache;
  const rollbackOnErrorOption = options.rollbackOnError;
  let optimisticData = options.optimisticData;
  const rollbackOnError = (error) => {
    return typeof rollbackOnErrorOption === "function" ? rollbackOnErrorOption(error) : rollbackOnErrorOption !== false;
  };
  const throwOnError = options.throwOnError;
  if (isFunction(_key)) {
    const keyFilter = _key;
    const matchedKeys = [];
    const it2 = cache2.keys();
    for (const key of it2) {
      if (
        // Skip the special useSWRInfinite and useSWRSubscription keys.
        !/^\$(inf|sub)\$/.test(key) && keyFilter(cache2.get(key)._k)
      ) {
        matchedKeys.push(key);
      }
    }
    return Promise.all(matchedKeys.map(mutateByKey));
  }
  return mutateByKey(_key);
  async function mutateByKey(_k) {
    const [key] = serialize(_k);
    if (!key) return;
    const [get2, set2] = createCacheHelper(cache2, key);
    const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache2);
    const startRevalidate = () => {
      const revalidators = EVENT_REVALIDATORS[key];
      const revalidate = isFunction(options.revalidate) ? options.revalidate(get2().data, _k) : options.revalidate !== false;
      if (revalidate) {
        delete FETCH[key];
        delete PRELOAD[key];
        if (revalidators && revalidators[0]) {
          return revalidators[0](MUTATE_EVENT).then(() => get2().data);
        }
      }
      return get2().data;
    };
    if (args.length < 3) {
      return startRevalidate();
    }
    let data = _data;
    let error;
    const beforeMutationTs = getTimestamp();
    MUTATION[key] = [
      beforeMutationTs,
      0
    ];
    const hasOptimisticData = !isUndefined(optimisticData);
    const state = get2();
    const displayedData = state.data;
    const currentData = state._c;
    const committedData = isUndefined(currentData) ? displayedData : currentData;
    if (hasOptimisticData) {
      optimisticData = isFunction(optimisticData) ? optimisticData(committedData, displayedData) : optimisticData;
      set2({
        data: optimisticData,
        _c: committedData
      });
    }
    if (isFunction(data)) {
      try {
        data = data(committedData);
      } catch (err) {
        error = err;
      }
    }
    if (data && isPromiseLike(data)) {
      data = await data.catch((err) => {
        error = err;
      });
      if (beforeMutationTs !== MUTATION[key][0]) {
        if (error) throw error;
        return data;
      } else if (error && hasOptimisticData && rollbackOnError(error)) {
        populateCache = true;
        set2({
          data: committedData,
          _c: UNDEFINED
        });
      }
    }
    if (populateCache) {
      if (!error) {
        if (isFunction(populateCache)) {
          const populateCachedData = populateCache(data, committedData);
          set2({
            data: populateCachedData,
            error: UNDEFINED,
            _c: UNDEFINED
          });
        } else {
          set2({
            data,
            error: UNDEFINED,
            _c: UNDEFINED
          });
        }
      }
    }
    MUTATION[key][1] = getTimestamp();
    Promise.resolve(startRevalidate()).then(() => {
      set2({
        _c: UNDEFINED
      });
    });
    if (error) {
      if (throwOnError) throw error;
      return;
    }
    return data;
  }
}
var revalidateAllKeys = (revalidators, type) => {
  for (const key in revalidators) {
    if (revalidators[key][0]) revalidators[key][0](type);
  }
};
var initCache = (provider, options) => {
  if (!SWRGlobalState.has(provider)) {
    const opts = mergeObjects(defaultConfigOptions, options);
    const EVENT_REVALIDATORS = /* @__PURE__ */ Object.create(null);
    const mutate2 = internalMutate.bind(UNDEFINED, provider);
    let unmount = noop;
    const subscriptions = /* @__PURE__ */ Object.create(null);
    const subscribe = (key, callback) => {
      const subs = subscriptions[key] || [];
      subscriptions[key] = subs;
      subs.push(callback);
      return () => subs.splice(subs.indexOf(callback), 1);
    };
    const setter = (key, value, prev) => {
      provider.set(key, value);
      const subs = subscriptions[key];
      if (subs) {
        for (const fn of subs) {
          fn(value, prev);
        }
      }
    };
    const initProvider = () => {
      if (!SWRGlobalState.has(provider)) {
        SWRGlobalState.set(provider, [
          EVENT_REVALIDATORS,
          /* @__PURE__ */ Object.create(null),
          /* @__PURE__ */ Object.create(null),
          /* @__PURE__ */ Object.create(null),
          mutate2,
          setter,
          subscribe
        ]);
        if (!IS_SERVER) {
          const releaseFocus = opts.initFocus(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, FOCUS_EVENT)));
          const releaseReconnect = opts.initReconnect(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, RECONNECT_EVENT)));
          unmount = () => {
            releaseFocus && releaseFocus();
            releaseReconnect && releaseReconnect();
            SWRGlobalState.delete(provider);
          };
        }
      }
    };
    initProvider();
    return [
      provider,
      mutate2,
      initProvider,
      unmount
    ];
  }
  return [
    provider,
    SWRGlobalState.get(provider)[4]
  ];
};
var onErrorRetry = (_, __, config, revalidate, opts) => {
  const maxRetryCount = config.errorRetryCount;
  const currentRetryCount = opts.retryCount;
  const timeout = ~~((Math.random() + 0.5) * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))) * config.errorRetryInterval;
  if (!isUndefined(maxRetryCount) && currentRetryCount > maxRetryCount) {
    return;
  }
  setTimeout(revalidate, timeout, opts);
};
var compare = dequal;
var [cache, mutate] = initCache(/* @__PURE__ */ new Map());
var defaultConfig = mergeObjects(
  {
    // events
    onLoadingSlow: noop,
    onSuccess: noop,
    onError: noop,
    onErrorRetry,
    onDiscarded: noop,
    // switches
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    shouldRetryOnError: true,
    // timeouts
    errorRetryInterval: slowConnection ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: slowConnection ? 5e3 : 3e3,
    // providers
    compare,
    isPaused: () => false,
    cache,
    mutate,
    fallback: {}
  },
  // use web preset by default
  preset
);
var mergeConfigs = (a, b) => {
  const v = mergeObjects(a, b);
  if (b) {
    const { use: u1, fallback: f1 } = a;
    const { use: u2, fallback: f2 } = b;
    if (u1 && u2) {
      v.use = u1.concat(u2);
    }
    if (f1 && f2) {
      v.fallback = mergeObjects(f1, f2);
    }
  }
  return v;
};
var SWRConfigContext = (0, import_react8.createContext)({});
var SWRConfig = (props) => {
  const { value } = props;
  const parentConfig = (0, import_react8.useContext)(SWRConfigContext);
  const isFunctionalConfig = isFunction(value);
  const config = (0, import_react8.useMemo)(() => isFunctionalConfig ? value(parentConfig) : value, [
    isFunctionalConfig,
    parentConfig,
    value
  ]);
  const extendedConfig = (0, import_react8.useMemo)(() => isFunctionalConfig ? config : mergeConfigs(parentConfig, config), [
    isFunctionalConfig,
    parentConfig,
    config
  ]);
  const provider = config && config.provider;
  const cacheContextRef = (0, import_react8.useRef)(UNDEFINED);
  if (provider && !cacheContextRef.current) {
    cacheContextRef.current = initCache(provider(extendedConfig.cache || cache), config);
  }
  const cacheContext = cacheContextRef.current;
  if (cacheContext) {
    extendedConfig.cache = cacheContext[0];
    extendedConfig.mutate = cacheContext[1];
  }
  useIsomorphicLayoutEffect(() => {
    if (cacheContext) {
      cacheContext[2] && cacheContext[2]();
      return cacheContext[3];
    }
  }, []);
  return (0, import_react8.createElement)(SWRConfigContext.Provider, mergeObjects(props, {
    value: extendedConfig
  }));
};

// node_modules/swr/dist/_internal/constants.mjs
var INFINITE_PREFIX = "$inf$";

// node_modules/swr/dist/_internal/index.mjs
var import_react9 = __toESM(require_react(), 1);
var enableDevtools = isWindowDefined && window.__SWR_DEVTOOLS_USE__;
var use = enableDevtools ? window.__SWR_DEVTOOLS_USE__ : [];
var setupDevTools = () => {
  if (enableDevtools) {
    window.__SWR_DEVTOOLS_REACT__ = import_react9.default;
  }
};
var normalize = (args) => {
  return isFunction(args[1]) ? [
    args[0],
    args[1],
    args[2] || {}
  ] : [
    args[0],
    null,
    (args[1] === null ? args[2] : args[1]) || {}
  ];
};
var useSWRConfig = () => {
  return mergeObjects(defaultConfig, (0, import_react9.useContext)(SWRConfigContext));
};
var middleware = (useSWRNext) => (key_, fetcher_, config) => {
  const fetcher = fetcher_ && ((...args) => {
    const [key] = serialize(key_);
    const [, , , PRELOAD] = SWRGlobalState.get(cache);
    if (key.startsWith(INFINITE_PREFIX)) {
      return fetcher_(...args);
    }
    const req = PRELOAD[key];
    if (isUndefined(req)) return fetcher_(...args);
    delete PRELOAD[key];
    return req;
  });
  return useSWRNext(key_, fetcher, config);
};
var BUILT_IN_MIDDLEWARE = use.concat(middleware);
var withArgs = (hook) => {
  return function useSWRArgs(...args) {
    const fallbackConfig = useSWRConfig();
    const [key, fn, _config] = normalize(args);
    const config = mergeConfigs(fallbackConfig, _config);
    let next = hook;
    const { use: use3 } = config;
    const middleware2 = (use3 || []).concat(BUILT_IN_MIDDLEWARE);
    for (let i = middleware2.length; i--; ) {
      next = middleware2[i](next);
    }
    return next(key, fn || config.fetcher || null, config);
  };
};
var subscribeCallback = (key, callbacks, callback) => {
  const keyedRevalidators = callbacks[key] || (callbacks[key] = []);
  keyedRevalidators.push(callback);
  return () => {
    const index = keyedRevalidators.indexOf(callback);
    if (index >= 0) {
      keyedRevalidators[index] = keyedRevalidators[keyedRevalidators.length - 1];
      keyedRevalidators.pop();
    }
  };
};
setupDevTools();

// node_modules/swr/dist/index/index.mjs
var noop2 = () => {
};
var UNDEFINED2 = (
  /*#__NOINLINE__*/
  noop2()
);
var use2 = import_react10.default.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
// and emitting an error.
// We assume that this is only for the `use(thenable)` case, not `use(context)`.
// https://github.com/facebook/react/blob/aed00dacfb79d17c53218404c52b1c7aa59c4a89/packages/react-server/src/ReactFizzThenable.js#L45
((thenable) => {
  switch (thenable.status) {
    case "pending":
      throw thenable;
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      thenable.status = "pending";
      thenable.then((v) => {
        thenable.status = "fulfilled";
        thenable.value = v;
      }, (e2) => {
        thenable.status = "rejected";
        thenable.reason = e2;
      });
      throw thenable;
  }
});
var WITH_DEDUPE = {
  dedupe: true
};
var useSWRHandler = (_key, fetcher, config) => {
  const { cache: cache2, compare: compare2, suspense, fallbackData, revalidateOnMount, revalidateIfStale, refreshInterval, refreshWhenHidden, refreshWhenOffline, keepPreviousData } = config;
  const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache2);
  const [key, fnArg] = serialize(_key);
  const initialMountedRef = (0, import_react10.useRef)(false);
  const unmountedRef = (0, import_react10.useRef)(false);
  const keyRef = (0, import_react10.useRef)(key);
  const fetcherRef = (0, import_react10.useRef)(fetcher);
  const configRef = (0, import_react10.useRef)(config);
  const getConfig = () => configRef.current;
  const isActive = () => getConfig().isVisible() && getConfig().isOnline();
  const [getCache, setCache, subscribeCache, getInitialCache] = createCacheHelper(cache2, key);
  const stateDependencies = (0, import_react10.useRef)({}).current;
  const fallback = isUndefined(fallbackData) ? isUndefined(config.fallback) ? UNDEFINED : config.fallback[key] : fallbackData;
  const isEqual = (prev, current) => {
    for (const _ in stateDependencies) {
      const t = _;
      if (t === "data") {
        if (!compare2(prev[t], current[t])) {
          if (!isUndefined(prev[t])) {
            return false;
          }
          if (!compare2(returnedData, current[t])) {
            return false;
          }
        }
      } else {
        if (current[t] !== prev[t]) {
          return false;
        }
      }
    }
    return true;
  };
  const getSnapshot = (0, import_react10.useMemo)(() => {
    const shouldStartRequest = (() => {
      if (!key) return false;
      if (!fetcher) return false;
      if (!isUndefined(revalidateOnMount)) return revalidateOnMount;
      if (getConfig().isPaused()) return false;
      if (suspense) return false;
      return revalidateIfStale !== false;
    })();
    const getSelectedCache = (state) => {
      const snapshot = mergeObjects(state);
      delete snapshot._k;
      if (!shouldStartRequest) {
        return snapshot;
      }
      return {
        isValidating: true,
        isLoading: true,
        ...snapshot
      };
    };
    const cachedData2 = getCache();
    const initialData = getInitialCache();
    const clientSnapshot = getSelectedCache(cachedData2);
    const serverSnapshot = cachedData2 === initialData ? clientSnapshot : getSelectedCache(initialData);
    let memorizedSnapshot = clientSnapshot;
    return [
      () => {
        const newSnapshot = getSelectedCache(getCache());
        const compareResult = isEqual(newSnapshot, memorizedSnapshot);
        if (compareResult) {
          memorizedSnapshot.data = newSnapshot.data;
          memorizedSnapshot.isLoading = newSnapshot.isLoading;
          memorizedSnapshot.isValidating = newSnapshot.isValidating;
          memorizedSnapshot.error = newSnapshot.error;
          return memorizedSnapshot;
        } else {
          memorizedSnapshot = newSnapshot;
          return newSnapshot;
        }
      },
      () => serverSnapshot
    ];
  }, [
    cache2,
    key
  ]);
  const cached = (0, import_shim.useSyncExternalStore)((0, import_react10.useCallback)(
    (callback) => subscribeCache(key, (current, prev) => {
      if (!isEqual(prev, current)) callback();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      cache2,
      key
    ]
  ), getSnapshot[0], getSnapshot[1]);
  const isInitialMount = !initialMountedRef.current;
  const hasRevalidator = EVENT_REVALIDATORS[key] && EVENT_REVALIDATORS[key].length > 0;
  const cachedData = cached.data;
  const data = isUndefined(cachedData) ? fallback && isPromiseLike(fallback) ? use2(fallback) : fallback : cachedData;
  const error = cached.error;
  const laggyDataRef = (0, import_react10.useRef)(data);
  const returnedData = keepPreviousData ? isUndefined(cachedData) ? isUndefined(laggyDataRef.current) ? data : laggyDataRef.current : cachedData : data;
  const shouldDoInitialRevalidation = (() => {
    if (hasRevalidator && !isUndefined(error)) return false;
    if (isInitialMount && !isUndefined(revalidateOnMount)) return revalidateOnMount;
    if (getConfig().isPaused()) return false;
    if (suspense) return isUndefined(data) ? false : revalidateIfStale;
    return isUndefined(data) || revalidateIfStale;
  })();
  const defaultValidatingState = !!(key && fetcher && isInitialMount && shouldDoInitialRevalidation);
  const isValidating = isUndefined(cached.isValidating) ? defaultValidatingState : cached.isValidating;
  const isLoading = isUndefined(cached.isLoading) ? defaultValidatingState : cached.isLoading;
  const revalidate = (0, import_react10.useCallback)(
    async (revalidateOpts) => {
      const currentFetcher = fetcherRef.current;
      if (!key || !currentFetcher || unmountedRef.current || getConfig().isPaused()) {
        return false;
      }
      let newData;
      let startAt;
      let loading = true;
      const opts = revalidateOpts || {};
      const shouldStartNewRequest = !FETCH[key] || !opts.dedupe;
      const callbackSafeguard = () => {
        if (IS_REACT_LEGACY) {
          return !unmountedRef.current && key === keyRef.current && initialMountedRef.current;
        }
        return key === keyRef.current;
      };
      const finalState = {
        isValidating: false,
        isLoading: false
      };
      const finishRequestAndUpdateState = () => {
        setCache(finalState);
      };
      const cleanupState = () => {
        const requestInfo = FETCH[key];
        if (requestInfo && requestInfo[1] === startAt) {
          delete FETCH[key];
        }
      };
      const initialState = {
        isValidating: true
      };
      if (isUndefined(getCache().data)) {
        initialState.isLoading = true;
      }
      try {
        if (shouldStartNewRequest) {
          setCache(initialState);
          if (config.loadingTimeout && isUndefined(getCache().data)) {
            setTimeout(() => {
              if (loading && callbackSafeguard()) {
                getConfig().onLoadingSlow(key, config);
              }
            }, config.loadingTimeout);
          }
          FETCH[key] = [
            currentFetcher(fnArg),
            getTimestamp()
          ];
        }
        ;
        [newData, startAt] = FETCH[key];
        newData = await newData;
        if (shouldStartNewRequest) {
          setTimeout(cleanupState, config.dedupingInterval);
        }
        if (!FETCH[key] || FETCH[key][1] !== startAt) {
          if (shouldStartNewRequest) {
            if (callbackSafeguard()) {
              getConfig().onDiscarded(key);
            }
          }
          return false;
        }
        finalState.error = UNDEFINED;
        const mutationInfo = MUTATION[key];
        if (!isUndefined(mutationInfo) && // case 1
        (startAt <= mutationInfo[0] || // case 2
        startAt <= mutationInfo[1] || // case 3
        mutationInfo[1] === 0)) {
          finishRequestAndUpdateState();
          if (shouldStartNewRequest) {
            if (callbackSafeguard()) {
              getConfig().onDiscarded(key);
            }
          }
          return false;
        }
        const cacheData = getCache().data;
        finalState.data = compare2(cacheData, newData) ? cacheData : newData;
        if (shouldStartNewRequest) {
          if (callbackSafeguard()) {
            getConfig().onSuccess(newData, key, config);
          }
        }
      } catch (err) {
        cleanupState();
        const currentConfig = getConfig();
        const { shouldRetryOnError } = currentConfig;
        if (!currentConfig.isPaused()) {
          finalState.error = err;
          if (shouldStartNewRequest && callbackSafeguard()) {
            currentConfig.onError(err, key, currentConfig);
            if (shouldRetryOnError === true || isFunction(shouldRetryOnError) && shouldRetryOnError(err)) {
              if (!getConfig().revalidateOnFocus || !getConfig().revalidateOnReconnect || isActive()) {
                currentConfig.onErrorRetry(err, key, currentConfig, (_opts) => {
                  const revalidators = EVENT_REVALIDATORS[key];
                  if (revalidators && revalidators[0]) {
                    revalidators[0](events_exports.ERROR_REVALIDATE_EVENT, _opts);
                  }
                }, {
                  retryCount: (opts.retryCount || 0) + 1,
                  dedupe: true
                });
              }
            }
          }
        }
      }
      loading = false;
      finishRequestAndUpdateState();
      return true;
    },
    // `setState` is immutable, and `eventsCallback`, `fnArg`, and
    // `keyValidating` are depending on `key`, so we can exclude them from
    // the deps array.
    //
    // FIXME:
    // `fn` and `config` might be changed during the lifecycle,
    // but they might be changed every render like this.
    // `useSWR('key', () => fetch('/api/'), { suspense: true })`
    // So we omit the values from the deps array
    // even though it might cause unexpected behaviors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      key,
      cache2
    ]
  );
  const boundMutate = (0, import_react10.useCallback)(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...args) => {
      return internalMutate(cache2, keyRef.current, ...args);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useIsomorphicLayoutEffect(() => {
    fetcherRef.current = fetcher;
    configRef.current = config;
    if (!isUndefined(cachedData)) {
      laggyDataRef.current = cachedData;
    }
  });
  useIsomorphicLayoutEffect(() => {
    if (!key) return;
    const softRevalidate = revalidate.bind(UNDEFINED, WITH_DEDUPE);
    let nextFocusRevalidatedAt = 0;
    if (getConfig().revalidateOnFocus) {
      const initNow = Date.now();
      nextFocusRevalidatedAt = initNow + getConfig().focusThrottleInterval;
    }
    const onRevalidate = (type, opts = {}) => {
      if (type == events_exports.FOCUS_EVENT) {
        const now = Date.now();
        if (getConfig().revalidateOnFocus && now > nextFocusRevalidatedAt && isActive()) {
          nextFocusRevalidatedAt = now + getConfig().focusThrottleInterval;
          softRevalidate();
        }
      } else if (type == events_exports.RECONNECT_EVENT) {
        if (getConfig().revalidateOnReconnect && isActive()) {
          softRevalidate();
        }
      } else if (type == events_exports.MUTATE_EVENT) {
        return revalidate();
      } else if (type == events_exports.ERROR_REVALIDATE_EVENT) {
        return revalidate(opts);
      }
      return;
    };
    const unsubEvents = subscribeCallback(key, EVENT_REVALIDATORS, onRevalidate);
    unmountedRef.current = false;
    keyRef.current = key;
    initialMountedRef.current = true;
    setCache({
      _k: fnArg
    });
    if (shouldDoInitialRevalidation) {
      if (isUndefined(data) || IS_SERVER) {
        softRevalidate();
      } else {
        rAF(softRevalidate);
      }
    }
    return () => {
      unmountedRef.current = true;
      unsubEvents();
    };
  }, [
    key
  ]);
  useIsomorphicLayoutEffect(() => {
    let timer;
    function next() {
      const interval = isFunction(refreshInterval) ? refreshInterval(getCache().data) : refreshInterval;
      if (interval && timer !== -1) {
        timer = setTimeout(execute, interval);
      }
    }
    function execute() {
      if (!getCache().error && (refreshWhenHidden || getConfig().isVisible()) && (refreshWhenOffline || getConfig().isOnline())) {
        revalidate(WITH_DEDUPE).then(next);
      } else {
        next();
      }
    }
    next();
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = -1;
      }
    };
  }, [
    refreshInterval,
    refreshWhenHidden,
    refreshWhenOffline,
    key
  ]);
  (0, import_react10.useDebugValue)(returnedData);
  if (suspense && isUndefined(data) && key) {
    if (!IS_REACT_LEGACY && IS_SERVER) {
      throw new Error("Fallback data is required when using Suspense in SSR.");
    }
    fetcherRef.current = fetcher;
    configRef.current = config;
    unmountedRef.current = false;
    const req = PRELOAD[key];
    if (!isUndefined(req)) {
      const promise = boundMutate(req);
      use2(promise);
    }
    if (isUndefined(error)) {
      const promise = revalidate(WITH_DEDUPE);
      if (!isUndefined(returnedData)) {
        promise.status = "fulfilled";
        promise.value = true;
      }
      use2(promise);
    } else {
      throw error;
    }
  }
  const swrResponse = {
    mutate: boundMutate,
    get data() {
      stateDependencies.data = true;
      return returnedData;
    },
    get error() {
      stateDependencies.error = true;
      return error;
    },
    get isValidating() {
      stateDependencies.isValidating = true;
      return isValidating;
    },
    get isLoading() {
      stateDependencies.isLoading = true;
      return isLoading;
    }
  };
  return swrResponse;
};
var SWRConfig2 = OBJECT.defineProperty(SWRConfig, "defaultValue", {
  value: defaultConfig
});
var useSWR = withArgs(useSWRHandler);

// node_modules/@ant-design/pro-provider/es/locale/ar_EG.js
var ar_EG_default = {
  moneySymbol: "$",
  form: {
    lightFilter: {
      more: "المزيد",
      clear: "نظف",
      confirm: "تأكيد",
      itemUnit: "عناصر"
    }
  },
  tableForm: {
    search: "ابحث",
    reset: "إعادة تعيين",
    submit: "ارسال",
    collapsed: "مُقلص",
    expand: "مُوسع",
    inputPlaceholder: "الرجاء الإدخال",
    selectPlaceholder: "الرجاء الإختيار"
  },
  alert: {
    clear: "نظف",
    selected: "محدد",
    item: "عنصر"
  },
  pagination: {
    total: {
      range: " ",
      total: "من",
      item: "عناصر"
    }
  },
  tableToolBar: {
    leftPin: "ثبت على اليسار",
    rightPin: "ثبت على اليمين",
    noPin: "الغاء التثبيت",
    leftFixedTitle: "لصق على اليسار",
    rightFixedTitle: "لصق على اليمين",
    noFixedTitle: "إلغاء الإلصاق",
    reset: "إعادة تعيين",
    columnDisplay: "الأعمدة المعروضة",
    columnSetting: "الإعدادات",
    fullScreen: "وضع كامل الشاشة",
    exitFullScreen: "الخروج من وضع كامل الشاشة",
    reload: "تحديث",
    density: "الكثافة",
    densityDefault: "افتراضي",
    densityLarger: "أكبر",
    densityMiddle: "وسط",
    densitySmall: "مدمج"
  },
  stepsForm: {
    next: "التالي",
    prev: "السابق",
    submit: "أنهى"
  },
  loginForm: {
    submitText: "تسجيل الدخول"
  },
  editableTable: {
    action: {
      save: "أنقذ",
      cancel: "إلغاء الأمر",
      delete: "حذف",
      add: "إضافة صف من البيانات"
    }
  },
  switch: {
    open: "مفتوح",
    close: "غلق"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/ca_ES.js
var ca_ES_default = {
  moneySymbol: "€",
  form: {
    lightFilter: {
      more: "Més",
      clear: "Netejar",
      confirm: "Confirmar",
      itemUnit: "Elements"
    }
  },
  tableForm: {
    search: "Cercar",
    reset: "Netejar",
    submit: "Enviar",
    collapsed: "Expandir",
    expand: "Col·lapsar",
    inputPlaceholder: "Introduïu valor",
    selectPlaceholder: "Seleccioneu valor"
  },
  alert: {
    clear: "Netejar",
    selected: "Seleccionat",
    item: "Article"
  },
  pagination: {
    total: {
      range: " ",
      total: "de",
      item: "articles"
    }
  },
  tableToolBar: {
    leftPin: "Pin a l'esquerra",
    rightPin: "Pin a la dreta",
    noPin: "Sense Pin",
    leftFixedTitle: "Fixat a l'esquerra",
    rightFixedTitle: "Fixat a la dreta",
    noFixedTitle: "Sense fixar",
    reset: "Reiniciar",
    columnDisplay: "Mostrar Columna",
    columnSetting: "Configuració",
    fullScreen: "Pantalla Completa",
    exitFullScreen: "Sortir Pantalla Completa",
    reload: "Refrescar",
    density: "Densitat",
    densityDefault: "Per Defecte",
    densityLarger: "Llarg",
    densityMiddle: "Mitjà",
    densitySmall: "Compacte"
  },
  stepsForm: {
    next: "Següent",
    prev: "Anterior",
    submit: "Finalizar"
  },
  loginForm: {
    submitText: "Entrar"
  },
  editableTable: {
    action: {
      save: "Guardar",
      cancel: "Cancel·lar",
      delete: "Eliminar",
      add: "afegir una fila de dades"
    }
  },
  switch: {
    open: "obert",
    close: "tancat"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/cs_CZ.js
var cs_CZ_default = {
  moneySymbol: "Kč",
  deleteThisLine: "Smazat tento řádek",
  copyThisLine: "Kopírovat tento řádek",
  form: {
    lightFilter: {
      more: "Víc",
      clear: "Vymazat",
      confirm: "Potvrdit",
      itemUnit: "Položky"
    }
  },
  tableForm: {
    search: "Dotaz",
    reset: "Resetovat",
    submit: "Odeslat",
    collapsed: "Zvětšit",
    expand: "Zmenšit",
    inputPlaceholder: "Zadejte prosím",
    selectPlaceholder: "Vyberte prosím"
  },
  alert: {
    clear: "Vymazat",
    selected: "Vybraný",
    item: "Položka"
  },
  pagination: {
    total: {
      range: " ",
      total: "z",
      item: "položek"
    }
  },
  tableToolBar: {
    leftPin: "Připnout doleva",
    rightPin: "Připnout doprava",
    noPin: "Odepnuto",
    leftFixedTitle: "Fixováno nalevo",
    rightFixedTitle: "Fixováno napravo",
    noFixedTitle: "Neopraveno",
    reset: "Resetovat",
    columnDisplay: "Zobrazení sloupců",
    columnSetting: "Nastavení",
    fullScreen: "Celá obrazovka",
    exitFullScreen: "Ukončete celou obrazovku",
    reload: "Obnovit",
    density: "Hustota",
    densityDefault: "Výchozí",
    densityLarger: "Větší",
    densityMiddle: "Střední",
    densitySmall: "Kompaktní"
  },
  stepsForm: {
    next: "Další",
    prev: "Předchozí",
    submit: "Dokončit"
  },
  loginForm: {
    submitText: "Přihlásit se"
  },
  editableTable: {
    onlyOneLineEditor: "Upravit lze pouze jeden řádek",
    action: {
      save: "Uložit",
      cancel: "Zrušit",
      delete: "Vymazat",
      add: "přidat řádek dat"
    }
  },
  switch: {
    open: "otevřít",
    close: "zavřít"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/de_DE.js
var de_DE_default = {
  moneySymbol: "€",
  form: {
    lightFilter: {
      more: "Mehr",
      clear: "Zurücksetzen",
      confirm: "Bestätigen",
      itemUnit: "Einträge"
    }
  },
  tableForm: {
    search: "Suchen",
    reset: "Zurücksetzen",
    submit: "Absenden",
    collapsed: "Zeige mehr",
    expand: "Zeige weniger",
    inputPlaceholder: "Bitte eingeben",
    selectPlaceholder: "Bitte auswählen"
  },
  alert: {
    clear: "Zurücksetzen",
    selected: "Ausgewählt",
    item: "Eintrag"
  },
  pagination: {
    total: {
      range: " ",
      total: "von",
      item: "Einträgen"
    }
  },
  tableToolBar: {
    leftPin: "Links anheften",
    rightPin: "Rechts anheften",
    noPin: "Nicht angeheftet",
    leftFixedTitle: "Links fixiert",
    rightFixedTitle: "Rechts fixiert",
    noFixedTitle: "Nicht fixiert",
    reset: "Zurücksetzen",
    columnDisplay: "Angezeigte Reihen",
    columnSetting: "Einstellungen",
    fullScreen: "Vollbild",
    exitFullScreen: "Vollbild verlassen",
    reload: "Aktualisieren",
    density: "Abstand",
    densityDefault: "Standard",
    densityLarger: "Größer",
    densityMiddle: "Mittel",
    densitySmall: "Kompakt"
  },
  stepsForm: {
    next: "Weiter",
    prev: "Zurück",
    submit: "Abschließen"
  },
  loginForm: {
    submitText: "Anmelden"
  },
  editableTable: {
    action: {
      save: "Retten",
      cancel: "Abbrechen",
      delete: "Löschen",
      add: "Hinzufügen einer Datenzeile"
    }
  },
  switch: {
    open: "offen",
    close: "schließen"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/en_GB.js
var en_GB_default = {
  moneySymbol: "£",
  form: {
    lightFilter: {
      more: "More",
      clear: "Clear",
      confirm: "Confirm",
      itemUnit: "Items"
    }
  },
  tableForm: {
    search: "Query",
    reset: "Reset",
    submit: "Submit",
    collapsed: "Expand",
    expand: "Collapse",
    inputPlaceholder: "Please enter",
    selectPlaceholder: "Please select"
  },
  alert: {
    clear: "Clear",
    selected: "Selected",
    item: "Item"
  },
  pagination: {
    total: {
      range: " ",
      total: "of",
      item: "items"
    }
  },
  tableToolBar: {
    leftPin: "Pin to left",
    rightPin: "Pin to right",
    noPin: "Unpinned",
    leftFixedTitle: "Fixed to the left",
    rightFixedTitle: "Fixed to the right",
    noFixedTitle: "Not Fixed",
    reset: "Reset",
    columnDisplay: "Column Display",
    columnSetting: "Table Settings",
    fullScreen: "Full Screen",
    exitFullScreen: "Exit Full Screen",
    reload: "Refresh",
    density: "Density",
    densityDefault: "Default",
    densityLarger: "Larger",
    densityMiddle: "Middle",
    densitySmall: "Compact"
  },
  stepsForm: {
    next: "Next",
    prev: "Previous",
    submit: "Finish"
  },
  loginForm: {
    submitText: "Login"
  },
  editableTable: {
    onlyOneLineEditor: "Only one line can be edited",
    onlyAddOneLine: "Only one line can be added",
    action: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      add: "add a row of data"
    }
  },
  switch: {
    open: "open",
    close: "close"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/en_US.js
var en_US_default = {
  moneySymbol: "$",
  deleteThisLine: "Delete this line",
  copyThisLine: "Copy this line",
  form: {
    lightFilter: {
      more: "More",
      clear: "Clear",
      confirm: "Confirm",
      itemUnit: "Items"
    }
  },
  tableForm: {
    search: "Query",
    reset: "Reset",
    submit: "Submit",
    collapsed: "Expand",
    expand: "Collapse",
    inputPlaceholder: "Please enter",
    selectPlaceholder: "Please select"
  },
  alert: {
    clear: "Clear",
    selected: "Selected",
    item: "Item"
  },
  pagination: {
    total: {
      range: " ",
      total: "of",
      item: "items"
    }
  },
  tableToolBar: {
    leftPin: "Pin to left",
    rightPin: "Pin to right",
    noPin: "Unpinned",
    leftFixedTitle: "Fixed to the left",
    rightFixedTitle: "Fixed to the right",
    noFixedTitle: "Not Fixed",
    reset: "Reset",
    columnDisplay: "Column Display",
    columnSetting: "Table Settings",
    fullScreen: "Full Screen",
    exitFullScreen: "Exit Full Screen",
    reload: "Refresh",
    density: "Density",
    densityDefault: "Default",
    densityLarger: "Larger",
    densityMiddle: "Middle",
    densitySmall: "Compact"
  },
  stepsForm: {
    next: "Next",
    prev: "Previous",
    submit: "Finish"
  },
  loginForm: {
    submitText: "Login"
  },
  editableTable: {
    onlyOneLineEditor: "Only one line can be edited",
    onlyAddOneLine: "Only one line can be added",
    action: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      add: "add a row of data"
    }
  },
  switch: {
    open: "open",
    close: "close"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/es_ES.js
var es_ES_default = {
  moneySymbol: "€",
  form: {
    lightFilter: {
      more: "Más",
      clear: "Limpiar",
      confirm: "Confirmar",
      itemUnit: "artículos"
    }
  },
  tableForm: {
    search: "Buscar",
    reset: "Limpiar",
    submit: "Submit",
    collapsed: "Expandir",
    expand: "Colapsar",
    inputPlaceholder: "Ingrese valor",
    selectPlaceholder: "Seleccione valor"
  },
  alert: {
    clear: "Limpiar",
    selected: "Seleccionado",
    item: "Articulo"
  },
  pagination: {
    total: {
      range: " ",
      total: "de",
      item: "artículos"
    }
  },
  tableToolBar: {
    leftPin: "Pin a la izquierda",
    rightPin: "Pin a la derecha",
    noPin: "Sin Pin",
    leftFixedTitle: "Fijado a la izquierda",
    rightFixedTitle: "Fijado a la derecha",
    noFixedTitle: "Sin Fijar",
    reset: "Reiniciar",
    columnDisplay: "Mostrar Columna",
    columnSetting: "Configuración",
    fullScreen: "Pantalla Completa",
    exitFullScreen: "Salir Pantalla Completa",
    reload: "Refrescar",
    density: "Densidad",
    densityDefault: "Por Defecto",
    densityLarger: "Largo",
    densityMiddle: "Medio",
    densitySmall: "Compacto"
  },
  stepsForm: {
    next: "Siguiente",
    prev: "Anterior",
    submit: "Finalizar"
  },
  loginForm: {
    submitText: "Entrar"
  },
  editableTable: {
    action: {
      save: "Guardar",
      cancel: "Descartar",
      delete: "Borrar",
      add: "añadir una fila de datos"
    }
  },
  switch: {
    open: "abrir",
    close: "cerrar"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/fa_IR.js
var fa_IR_default = {
  moneySymbol: "تومان",
  form: {
    lightFilter: {
      more: "بیشتر",
      clear: "پاک کردن",
      confirm: "تایید",
      itemUnit: "مورد"
    }
  },
  tableForm: {
    search: "جستجو",
    reset: "بازنشانی",
    submit: "تایید",
    collapsed: "نمایش بیشتر",
    expand: "نمایش کمتر",
    inputPlaceholder: "پیدا کنید",
    selectPlaceholder: "انتخاب کنید"
  },
  alert: {
    clear: "پاک سازی",
    selected: "انتخاب",
    item: "مورد"
  },
  pagination: {
    total: {
      range: " ",
      total: "از",
      item: "مورد"
    }
  },
  tableToolBar: {
    leftPin: "سنجاق به چپ",
    rightPin: "سنجاق به راست",
    noPin: "سنجاق نشده",
    leftFixedTitle: "ثابت شده در چپ",
    rightFixedTitle: "ثابت شده در راست",
    noFixedTitle: "شناور",
    reset: "بازنشانی",
    columnDisplay: "نمایش همه",
    columnSetting: "تنظیمات",
    fullScreen: "تمام صفحه",
    exitFullScreen: "خروج از حالت تمام صفحه",
    reload: "تازه سازی",
    density: "تراکم",
    densityDefault: "پیش فرض",
    densityLarger: "بزرگ",
    densityMiddle: "متوسط",
    densitySmall: "کوچک"
  },
  stepsForm: {
    next: "بعدی",
    prev: "قبلی",
    submit: "اتمام"
  },
  loginForm: {
    submitText: "ورود"
  },
  editableTable: {
    action: {
      save: "ذخیره",
      cancel: "لغو",
      delete: "حذف",
      add: "یک ردیف داده اضافه کنید"
    }
  },
  switch: {
    open: "باز",
    close: "نزدیک"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/fr_FR.js
var fr_FR_default = {
  moneySymbol: "€",
  form: {
    lightFilter: {
      more: "Plus",
      clear: "Effacer",
      confirm: "Confirmer",
      itemUnit: "Items"
    }
  },
  tableForm: {
    search: "Rechercher",
    reset: "Réinitialiser",
    submit: "Envoyer",
    collapsed: "Agrandir",
    expand: "Réduire",
    inputPlaceholder: "Entrer une valeur",
    selectPlaceholder: "Sélectionner une valeur"
  },
  alert: {
    clear: "Réinitialiser",
    selected: "Sélectionné",
    item: "Item"
  },
  pagination: {
    total: {
      range: " ",
      total: "sur",
      item: "éléments"
    }
  },
  tableToolBar: {
    leftPin: "Épingler à gauche",
    rightPin: "Épingler à gauche",
    noPin: "Sans épingle",
    leftFixedTitle: "Fixer à gauche",
    rightFixedTitle: "Fixer à droite",
    noFixedTitle: "Non fixé",
    reset: "Réinitialiser",
    columnDisplay: "Affichage colonne",
    columnSetting: "Réglages",
    fullScreen: "Plein écran",
    exitFullScreen: "Quitter Plein écran",
    reload: "Rafraichir",
    density: "Densité",
    densityDefault: "Par défaut",
    densityLarger: "Larger",
    densityMiddle: "Moyenne",
    densitySmall: "Compacte"
  },
  stepsForm: {
    next: "Suivante",
    prev: "Précédente",
    submit: "Finaliser"
  },
  loginForm: {
    submitText: "Se connecter"
  },
  editableTable: {
    action: {
      save: "Sauvegarder",
      cancel: "Annuler",
      delete: "Supprimer",
      add: "ajouter une ligne de données"
    }
  },
  switch: {
    open: "ouvert",
    close: "près"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/he_IL.js
var he_IL_default = {
  moneySymbol: "₪",
  deleteThisLine: "מחק שורה זו",
  copyThisLine: "העתק שורה זו",
  form: {
    lightFilter: {
      more: "יותר",
      clear: "נקה",
      confirm: "אישור",
      itemUnit: "פריטים"
    }
  },
  tableForm: {
    search: "חיפוש",
    reset: "איפוס",
    submit: "שלח",
    collapsed: "הרחב",
    expand: "כווץ",
    inputPlaceholder: "אנא הכנס",
    selectPlaceholder: "אנא בחר"
  },
  alert: {
    clear: "נקה",
    selected: "נבחר",
    item: "פריט"
  },
  pagination: {
    total: {
      range: " ",
      total: "מתוך",
      item: "פריטים"
    }
  },
  tableToolBar: {
    leftPin: "הצמד לשמאל",
    rightPin: "הצמד לימין",
    noPin: "לא מצורף",
    leftFixedTitle: "מוצמד לשמאל",
    rightFixedTitle: "מוצמד לימין",
    noFixedTitle: "לא מוצמד",
    reset: "איפוס",
    columnDisplay: "תצוגת עמודות",
    columnSetting: "הגדרות",
    fullScreen: "מסך מלא",
    exitFullScreen: "צא ממסך מלא",
    reload: "רענן",
    density: "רזולוציה",
    densityDefault: "ברירת מחדל",
    densityLarger: "גדול",
    densityMiddle: "בינוני",
    densitySmall: "קטן"
  },
  stepsForm: {
    next: "הבא",
    prev: "קודם",
    submit: "סיום"
  },
  loginForm: {
    submitText: "כניסה"
  },
  editableTable: {
    onlyOneLineEditor: "ניתן לערוך רק שורה אחת",
    action: {
      save: "שמור",
      cancel: "ביטול",
      delete: "מחיקה",
      add: "הוסף שורת נתונים"
    }
  },
  switch: {
    open: "פתח",
    close: "סגור"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/hr_HR.js
var hr_HR_default = {
  moneySymbol: "kn",
  form: {
    lightFilter: {
      more: "Više",
      clear: "Očisti",
      confirm: "Potvrdi",
      itemUnit: "Stavke"
    }
  },
  tableForm: {
    search: "Pretraži",
    reset: "Poništi",
    submit: "Potvrdi",
    collapsed: "Raširi",
    expand: "Skupi",
    inputPlaceholder: "Unesite",
    selectPlaceholder: "Odaberite"
  },
  alert: {
    clear: "Očisti",
    selected: "Odaberi",
    item: "stavke"
  },
  pagination: {
    total: {
      range: " ",
      total: "od",
      item: "stavke"
    }
  },
  tableToolBar: {
    leftPin: "Prikači lijevo",
    rightPin: "Prikači desno",
    noPin: "Bez prikačenja",
    leftFixedTitle: "Fiksiraj lijevo",
    rightFixedTitle: "Fiksiraj desno",
    noFixedTitle: "Bez fiksiranja",
    reset: "Resetiraj",
    columnDisplay: "Prikaz stupaca",
    columnSetting: "Postavke",
    fullScreen: "Puni zaslon",
    exitFullScreen: "Izađi iz punog zaslona",
    reload: "Ponovno učitaj",
    density: "Veličina",
    densityDefault: "Zadano",
    densityLarger: "Veliko",
    densityMiddle: "Srednje",
    densitySmall: "Malo"
  },
  stepsForm: {
    next: "Sljedeći",
    prev: "Prethodni",
    submit: "Kraj"
  },
  loginForm: {
    submitText: "Prijava"
  },
  editableTable: {
    action: {
      save: "Spremi",
      cancel: "Odustani",
      delete: "Obriši",
      add: "dodajte red podataka"
    }
  },
  switch: {
    open: "otvori",
    close: "zatvori"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/id_ID.js
var id_ID_default = {
  moneySymbol: "RP",
  form: {
    lightFilter: {
      more: "Lebih",
      clear: "Hapus",
      confirm: "Konfirmasi",
      itemUnit: "Unit"
    }
  },
  tableForm: {
    search: "Cari",
    reset: "Atur ulang",
    submit: "Kirim",
    collapsed: "Lebih sedikit",
    expand: "Lebih banyak",
    inputPlaceholder: "Masukkan pencarian",
    selectPlaceholder: "Pilih"
  },
  alert: {
    clear: "Hapus",
    selected: "Dipilih",
    item: "Butir"
  },
  pagination: {
    total: {
      range: " ",
      total: "Dari",
      item: "Butir"
    }
  },
  tableToolBar: {
    leftPin: "Pin kiri",
    rightPin: "Pin kanan",
    noPin: "Tidak ada pin",
    leftFixedTitle: "Rata kiri",
    rightFixedTitle: "Rata kanan",
    noFixedTitle: "Tidak tetap",
    reset: "Atur ulang",
    columnDisplay: "Tampilan kolom",
    columnSetting: "Pengaturan",
    fullScreen: "Layar penuh",
    exitFullScreen: "Keluar layar penuh",
    reload: "Atur ulang",
    density: "Kerapatan",
    densityDefault: "Standar",
    densityLarger: "Lebih besar",
    densityMiddle: "Sedang",
    densitySmall: "Rapat"
  },
  stepsForm: {
    next: "Selanjutnya",
    prev: "Sebelumnya",
    submit: "Selesai"
  },
  loginForm: {
    submitText: "Login"
  },
  editableTable: {
    action: {
      save: "simpan",
      cancel: "batal",
      delete: "hapus",
      add: "Tambahkan baris data"
    }
  },
  switch: {
    open: "buka",
    close: "tutup"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/it_IT.js
var it_IT_default = {
  moneySymbol: "€",
  form: {
    lightFilter: {
      more: "più",
      clear: "pulisci",
      confirm: "conferma",
      itemUnit: "elementi"
    }
  },
  tableForm: {
    search: "Filtra",
    reset: "Pulisci",
    submit: "Invia",
    collapsed: "Espandi",
    expand: "Contrai",
    inputPlaceholder: "Digita",
    selectPlaceholder: "Seleziona"
  },
  alert: {
    clear: "Rimuovi",
    selected: "Selezionati",
    item: "elementi"
  },
  pagination: {
    total: {
      range: " ",
      total: "di",
      item: "elementi"
    }
  },
  tableToolBar: {
    leftPin: "Fissa a sinistra",
    rightPin: "Fissa a destra",
    noPin: "Ripristina posizione",
    leftFixedTitle: "Fissato a sinistra",
    rightFixedTitle: "Fissato a destra",
    noFixedTitle: "Non fissato",
    reset: "Ripristina",
    columnDisplay: "Disposizione colonne",
    columnSetting: "Impostazioni",
    fullScreen: "Modalità schermo intero",
    exitFullScreen: "Esci da modalità schermo intero",
    reload: "Ricarica",
    density: "Grandezza tabella",
    densityDefault: "predefinito",
    densityLarger: "Grande",
    densityMiddle: "Media",
    densitySmall: "Compatta"
  },
  stepsForm: {
    next: "successivo",
    prev: "precedente",
    submit: "finisci"
  },
  loginForm: {
    submitText: "Accedi"
  },
  editableTable: {
    action: {
      save: "salva",
      cancel: "annulla",
      delete: "Delete",
      add: "add a row of data"
    }
  },
  switch: {
    open: "open",
    close: "chiudi"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/ja_JP.js
var ja_JP_default = {
  moneySymbol: "¥",
  form: {
    lightFilter: {
      more: "更に",
      clear: "クリア",
      confirm: "確認",
      itemUnit: "アイテム"
    }
  },
  tableForm: {
    search: "検索",
    reset: "リセット",
    submit: "送信",
    collapsed: "拡大",
    expand: "折畳",
    inputPlaceholder: "入力してください",
    selectPlaceholder: "選択してください"
  },
  alert: {
    clear: "クリア",
    selected: "選択した",
    item: "アイテム"
  },
  pagination: {
    total: {
      range: "レコード",
      total: "/合計",
      item: " "
    }
  },
  tableToolBar: {
    leftPin: "左に固定",
    rightPin: "右に固定",
    noPin: "キャンセル",
    leftFixedTitle: "左に固定された項目",
    rightFixedTitle: "右に固定された項目",
    noFixedTitle: "固定されてない項目",
    reset: "リセット",
    columnDisplay: "表示列",
    columnSetting: "列表示設定",
    fullScreen: "フルスクリーン",
    exitFullScreen: "終了",
    reload: "更新",
    density: "行高",
    densityDefault: "デフォルト",
    densityLarger: "大",
    densityMiddle: "中",
    densitySmall: "小"
  },
  stepsForm: {
    next: "次へ",
    prev: "前へ",
    submit: "送信"
  },
  loginForm: {
    submitText: "ログイン"
  },
  editableTable: {
    action: {
      save: "保存",
      cancel: "キャンセル",
      delete: "削除",
      add: "追加"
    }
  },
  switch: {
    open: "開く",
    close: "閉じる"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/ko_KR.js
var ko_KR_default = {
  moneySymbol: "₩",
  form: {
    lightFilter: {
      more: "더보기",
      clear: "초기화",
      confirm: "확인",
      itemUnit: "건수"
    }
  },
  tableForm: {
    search: "조회",
    reset: "초기화",
    submit: "제출",
    collapsed: "확장",
    expand: "닫기",
    inputPlaceholder: "입력해 주세요",
    selectPlaceholder: "선택해 주세요"
  },
  alert: {
    clear: "취소",
    selected: "선택",
    item: "건"
  },
  pagination: {
    total: {
      range: " ",
      total: "/ 총",
      item: "건"
    }
  },
  tableToolBar: {
    leftPin: "왼쪽으로 핀",
    rightPin: "오른쪽으로 핀",
    noPin: "핀 제거",
    leftFixedTitle: "왼쪽으로 고정",
    rightFixedTitle: "오른쪽으로 고정",
    noFixedTitle: "비고정",
    reset: "초기화",
    columnDisplay: "컬럼 표시",
    columnSetting: "설정",
    fullScreen: "전체 화면",
    exitFullScreen: "전체 화면 취소",
    reload: "새로 고침",
    density: "여백",
    densityDefault: "기본",
    densityLarger: "많은 여백",
    densityMiddle: "중간 여백",
    densitySmall: "좁은 여백"
  },
  stepsForm: {
    next: "다음",
    prev: "이전",
    submit: "종료"
  },
  loginForm: {
    submitText: "로그인"
  },
  editableTable: {
    action: {
      save: "저장",
      cancel: "취소",
      delete: "삭제",
      add: "데이터 행 추가"
    }
  },
  switch: {
    open: "열",
    close: "가까 운"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/mn_MN.js
var mn_MN_default = {
  moneySymbol: "₮",
  form: {
    lightFilter: {
      more: "Илүү",
      clear: "Цэвэрлэх",
      confirm: "Баталгаажуулах",
      itemUnit: "Нэгжүүд"
    }
  },
  tableForm: {
    search: "Хайх",
    reset: "Шинэчлэх",
    submit: "Илгээх",
    collapsed: "Өргөтгөх",
    expand: "Хураах",
    inputPlaceholder: "Утга оруулна уу",
    selectPlaceholder: "Утга сонгоно уу"
  },
  alert: {
    clear: "Цэвэрлэх",
    selected: "Сонгогдсон",
    item: "Нэгж"
  },
  pagination: {
    total: {
      range: " ",
      total: "Нийт",
      item: "мөр"
    }
  },
  tableToolBar: {
    leftPin: "Зүүн тийш бэхлэх",
    rightPin: "Баруун тийш бэхлэх",
    noPin: "Бэхлэхгүй",
    leftFixedTitle: "Зүүн зэрэгцүүлэх",
    rightFixedTitle: "Баруун зэрэгцүүлэх",
    noFixedTitle: "Зэрэгцүүлэхгүй",
    reset: "Шинэчлэх",
    columnDisplay: "Баганаар харуулах",
    columnSetting: "Тохиргоо",
    fullScreen: "Бүтэн дэлгэцээр",
    exitFullScreen: "Бүтэн дэлгэц цуцлах",
    reload: "Шинэчлэх",
    density: "Хэмжээ",
    densityDefault: "Хэвийн",
    densityLarger: "Том",
    densityMiddle: "Дунд",
    densitySmall: "Жижиг"
  },
  stepsForm: {
    next: "Дараах",
    prev: "Өмнөх",
    submit: "Дуусгах"
  },
  loginForm: {
    submitText: "Нэвтрэх"
  },
  editableTable: {
    action: {
      save: "Хадгалах",
      cancel: "Цуцлах",
      delete: "Устгах",
      add: "Мөр нэмэх"
    }
  },
  switch: {
    open: "Нээх",
    close: "Хаах"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/ms_MY.js
var ms_MY_default = {
  moneySymbol: "RM",
  form: {
    lightFilter: {
      more: "Lebih banyak",
      clear: "Jelas",
      confirm: "Mengesahkan",
      itemUnit: "Item"
    }
  },
  tableForm: {
    search: "Cari",
    reset: "Menetapkan semula",
    submit: "Hantar",
    collapsed: "Kembang",
    expand: "Kuncup",
    inputPlaceholder: "Sila masuk",
    selectPlaceholder: "Sila pilih"
  },
  alert: {
    clear: "Padam",
    selected: "Dipilih",
    item: "Item"
  },
  pagination: {
    total: {
      range: " ",
      total: "daripada",
      item: "item"
    }
  },
  tableToolBar: {
    leftPin: "Pin ke kiri",
    rightPin: "Pin ke kanan",
    noPin: "Tidak pin",
    leftFixedTitle: "Tetap ke kiri",
    rightFixedTitle: "Tetap ke kanan",
    noFixedTitle: "Tidak Tetap",
    reset: "Menetapkan semula",
    columnDisplay: "Lajur",
    columnSetting: "Settings",
    fullScreen: "Full Screen",
    exitFullScreen: "Keluar Full Screen",
    reload: "Muat Semula",
    density: "Densiti",
    densityDefault: "Biasa",
    densityLarger: "Besar",
    densityMiddle: "Tengah",
    densitySmall: "Kecil"
  },
  stepsForm: {
    next: "Seterusnya",
    prev: "Sebelumnya",
    submit: "Selesai"
  },
  loginForm: {
    submitText: "Log Masuk"
  },
  editableTable: {
    action: {
      save: "Simpan",
      cancel: "Membatalkan",
      delete: "Menghapuskan",
      add: "tambah baris data"
    }
  },
  switch: {
    open: "Terbuka",
    close: "Tutup"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/nl_NL.js
var nl_NL_default = {
  moneySymbol: "€",
  deleteThisLine: "Verwijder deze regel",
  copyThisLine: "Kopieer deze regel",
  form: {
    lightFilter: {
      more: "Meer filters",
      clear: "Wissen",
      confirm: "Bevestigen",
      itemUnit: "item"
    }
  },
  tableForm: {
    search: "Zoeken",
    reset: "Resetten",
    submit: "Indienen",
    collapsed: "Uitvouwen",
    expand: "Inklappen",
    inputPlaceholder: "Voer in",
    selectPlaceholder: "Selecteer"
  },
  alert: {
    clear: "Selectie annuleren",
    selected: "Geselecteerd",
    item: "item"
  },
  pagination: {
    total: {
      range: "Van",
      total: "items/totaal",
      item: "items"
    }
  },
  tableToolBar: {
    leftPin: "Vastzetten aan begin",
    rightPin: "Vastzetten aan einde",
    noPin: "Niet vastzetten",
    leftFixedTitle: "Vastzetten aan de linkerkant",
    rightFixedTitle: "Vastzetten aan de rechterkant",
    noFixedTitle: "Niet vastzetten",
    reset: "Resetten",
    columnDisplay: "Kolomweergave",
    columnSetting: "Kolominstellingen",
    fullScreen: "Volledig scherm",
    exitFullScreen: "Verlaat volledig scherm",
    reload: "Vernieuwen",
    density: "Dichtheid",
    densityDefault: "Normaal",
    densityLarger: "Ruim",
    densityMiddle: "Gemiddeld",
    densitySmall: "Compact"
  },
  stepsForm: {
    next: "Volgende stap",
    prev: "Vorige stap",
    submit: "Indienen"
  },
  loginForm: {
    submitText: "Inloggen"
  },
  editableTable: {
    onlyOneLineEditor: "Slechts één regel tegelijk bewerken",
    action: {
      save: "Opslaan",
      cancel: "Annuleren",
      delete: "Verwijderen",
      add: "Een regel toevoegen"
    }
  },
  switch: {
    open: "Openen",
    close: "Sluiten"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/pl_PL.js
var pl_PL_default = {
  moneySymbol: "zł",
  form: {
    lightFilter: {
      more: "Więcej",
      clear: "Wyczyść",
      confirm: "Potwierdź",
      itemUnit: "Ilość"
    }
  },
  tableForm: {
    search: "Szukaj",
    reset: "Reset",
    submit: "Zatwierdź",
    collapsed: "Pokaż wiecej",
    expand: "Pokaż mniej",
    inputPlaceholder: "Proszę podać",
    selectPlaceholder: "Proszę wybrać"
  },
  alert: {
    clear: "Wyczyść",
    selected: "Wybrane",
    item: "Wpis"
  },
  pagination: {
    total: {
      range: " ",
      total: "z",
      item: "Wpisów"
    }
  },
  tableToolBar: {
    leftPin: "Przypnij do lewej",
    rightPin: "Przypnij do prawej",
    noPin: "Odepnij",
    leftFixedTitle: "Przypięte do lewej",
    rightFixedTitle: "Przypięte do prawej",
    noFixedTitle: "Nieprzypięte",
    reset: "Reset",
    columnDisplay: "Wyświetlane wiersze",
    columnSetting: "Ustawienia",
    fullScreen: "Pełen ekran",
    exitFullScreen: "Zamknij pełen ekran",
    reload: "Odśwież",
    density: "Odstęp",
    densityDefault: "Standard",
    densityLarger: "Wiekszy",
    densityMiddle: "Sredni",
    densitySmall: "Kompaktowy"
  },
  stepsForm: {
    next: "Weiter",
    prev: "Zurück",
    submit: "Abschließen"
  },
  loginForm: {
    submitText: "Zaloguj się"
  },
  editableTable: {
    action: {
      save: "Zapisać",
      cancel: "Anuluj",
      delete: "Usunąć",
      add: "dodawanie wiersza danych"
    }
  },
  switch: {
    open: "otwierać",
    close: "zamykać"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/pt_BR.js
var pt_BR_default = {
  moneySymbol: "R$",
  form: {
    lightFilter: {
      more: "Mais",
      clear: "Limpar",
      confirm: "Confirmar",
      itemUnit: "Itens"
    }
  },
  tableForm: {
    search: "Filtrar",
    reset: "Limpar",
    submit: "Confirmar",
    collapsed: "Expandir",
    expand: "Colapsar",
    inputPlaceholder: "Por favor insira",
    selectPlaceholder: "Por favor selecione"
  },
  alert: {
    clear: "Limpar",
    selected: "Selecionado(s)",
    item: "Item(s)"
  },
  pagination: {
    total: {
      range: " ",
      total: "de",
      item: "itens"
    }
  },
  tableToolBar: {
    leftPin: "Fixar à esquerda",
    rightPin: "Fixar à direita",
    noPin: "Desfixado",
    leftFixedTitle: "Fixado à esquerda",
    rightFixedTitle: "Fixado à direita",
    noFixedTitle: "Não fixado",
    reset: "Limpar",
    columnDisplay: "Mostrar Coluna",
    columnSetting: "Configurações",
    fullScreen: "Tela Cheia",
    exitFullScreen: "Sair da Tela Cheia",
    reload: "Atualizar",
    density: "Densidade",
    densityDefault: "Padrão",
    densityLarger: "Largo",
    densityMiddle: "Médio",
    densitySmall: "Compacto"
  },
  stepsForm: {
    next: "Próximo",
    prev: "Anterior",
    submit: "Enviar"
  },
  loginForm: {
    submitText: "Entrar"
  },
  editableTable: {
    action: {
      save: "Salvar",
      cancel: "Cancelar",
      delete: "Apagar",
      add: "adicionar uma linha de dados"
    }
  },
  switch: {
    open: "abrir",
    close: "fechar"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/ro_RO.js
var ro_RO_default = {
  moneySymbol: "RON",
  deleteThisLine: "Șterge acest rând",
  copyThisLine: "Copiază acest rând",
  form: {
    lightFilter: {
      more: "Mai multe filtre",
      clear: "Curăță",
      confirm: "Confirmă",
      itemUnit: "elemente"
    }
  },
  tableForm: {
    search: "Caută",
    reset: "Resetează",
    submit: "Trimite",
    collapsed: "Extinde",
    expand: "Restrânge",
    inputPlaceholder: "Introduceți",
    selectPlaceholder: "Selectați"
  },
  alert: {
    clear: "Anulează selecția",
    selected: "Selectat",
    item: "elemente"
  },
  pagination: {
    total: {
      range: "De la",
      total: "elemente/total",
      item: "elemente"
    }
  },
  tableToolBar: {
    leftPin: "Fixează la început",
    rightPin: "Fixează la sfârșit",
    noPin: "Nu fixa",
    leftFixedTitle: "Fixează în stânga",
    rightFixedTitle: "Fixează în dreapta",
    noFixedTitle: "Nu fixa",
    reset: "Resetează",
    columnDisplay: "Afișare coloane",
    columnSetting: "Setări coloane",
    fullScreen: "Ecran complet",
    exitFullScreen: "Ieși din ecran complet",
    reload: "Reîncarcă",
    density: "Densitate",
    densityDefault: "Normal",
    densityLarger: "Larg",
    densityMiddle: "Mediu",
    densitySmall: "Compact"
  },
  stepsForm: {
    next: "Pasul următor",
    prev: "Pasul anterior",
    submit: "Trimite"
  },
  loginForm: {
    submitText: "Autentificare"
  },
  editableTable: {
    onlyOneLineEditor: "Se poate edita doar un rând simultan",
    action: {
      save: "Salvează",
      cancel: "Anulează",
      delete: "Șterge",
      add: "Adaugă un rând"
    }
  },
  switch: {
    open: "Deschide",
    close: "Închide"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/ru_RU.js
var ru_RU_default = {
  moneySymbol: "₽",
  form: {
    lightFilter: {
      more: "Еще",
      clear: "Очистить",
      confirm: "ОК",
      itemUnit: "Позиции"
    }
  },
  tableForm: {
    search: "Найти",
    reset: "Сброс",
    submit: "Отправить",
    collapsed: "Развернуть",
    expand: "Свернуть",
    inputPlaceholder: "Введите значение",
    selectPlaceholder: "Выберите значение"
  },
  alert: {
    clear: "Очистить",
    selected: "Выбрано",
    item: "элементов"
  },
  pagination: {
    total: {
      range: " ",
      total: "из",
      item: "элементов"
    }
  },
  tableToolBar: {
    leftPin: "Закрепить слева",
    rightPin: "Закрепить справа",
    noPin: "Открепить",
    leftFixedTitle: "Закреплено слева",
    rightFixedTitle: "Закреплено справа",
    noFixedTitle: "Не закреплено",
    reset: "Сброс",
    columnDisplay: "Отображение столбца",
    columnSetting: "Настройки",
    fullScreen: "Полный экран",
    exitFullScreen: "Выйти из полноэкранного режима",
    reload: "Обновить",
    density: "Размер",
    densityDefault: "По умолчанию",
    densityLarger: "Большой",
    densityMiddle: "Средний",
    densitySmall: "Сжатый"
  },
  stepsForm: {
    next: "Следующий",
    prev: "Предыдущий",
    submit: "Завершить"
  },
  loginForm: {
    submitText: "Вход"
  },
  editableTable: {
    action: {
      save: "Сохранить",
      cancel: "Отменить",
      delete: "Удалить",
      add: "добавить ряд данных"
    }
  },
  switch: {
    open: "Открытый чемпионат мира по теннису",
    close: "По адресу:"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/sk_SK.js
var sk_SK_default = {
  moneySymbol: "€",
  deleteThisLine: "Odstrániť tento riadok",
  copyThisLine: "Skopírujte tento riadok",
  form: {
    lightFilter: {
      more: "Viac",
      clear: "Vyčistiť",
      confirm: "Potvrďte",
      itemUnit: "Položky"
    }
  },
  tableForm: {
    search: "Vyhladať",
    reset: "Resetovať",
    submit: "Odoslať",
    collapsed: "Rozbaliť",
    expand: "Zbaliť",
    inputPlaceholder: "Prosím, zadajte",
    selectPlaceholder: "Prosím, vyberte"
  },
  alert: {
    clear: "Vyčistiť",
    selected: "Vybraný",
    item: "Položka"
  },
  pagination: {
    total: {
      range: " ",
      total: "z",
      item: "položiek"
    }
  },
  tableToolBar: {
    leftPin: "Pripnúť vľavo",
    rightPin: "Pripnúť vpravo",
    noPin: "Odopnuté",
    leftFixedTitle: "Fixované na ľavo",
    rightFixedTitle: "Fixované na pravo",
    noFixedTitle: "Nefixované",
    reset: "Resetovať",
    columnDisplay: "Zobrazenie stĺpcov",
    columnSetting: "Nastavenia",
    fullScreen: "Celá obrazovka",
    exitFullScreen: "Ukončiť celú obrazovku",
    reload: "Obnoviť",
    density: "Hustota",
    densityDefault: "Predvolené",
    densityLarger: "Väčšie",
    densityMiddle: "Stredné",
    densitySmall: "Kompaktné"
  },
  stepsForm: {
    next: "Ďalšie",
    prev: "Predchádzajúce",
    submit: "Potvrdiť"
  },
  loginForm: {
    submitText: "Prihlásiť sa"
  },
  editableTable: {
    onlyOneLineEditor: "Upravovať možno iba jeden riadok",
    action: {
      save: "Uložiť",
      cancel: "Zrušiť",
      delete: "Odstrániť",
      add: "pridať riadok údajov"
    }
  },
  switch: {
    open: "otvoriť",
    close: "zavrieť"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/sr_RS.js
var sr_RS_default = {
  moneySymbol: "RSD",
  form: {
    lightFilter: {
      more: "Više",
      clear: "Očisti",
      confirm: "Potvrdi",
      itemUnit: "Stavke"
    }
  },
  tableForm: {
    search: "Pronađi",
    reset: "Resetuj",
    submit: "Pošalji",
    collapsed: "Proširi",
    expand: "Skupi",
    inputPlaceholder: "Molimo unesite",
    selectPlaceholder: "Molimo odaberite"
  },
  alert: {
    clear: "Očisti",
    selected: "Odabrano",
    item: "Stavka"
  },
  pagination: {
    total: {
      range: " ",
      total: "od",
      item: "stavki"
    }
  },
  tableToolBar: {
    leftPin: "Zakači levo",
    rightPin: "Zakači desno",
    noPin: "Nije zakačeno",
    leftFixedTitle: "Fiksirano levo",
    rightFixedTitle: "Fiksirano desno",
    noFixedTitle: "Nije fiksirano",
    reset: "Resetuj",
    columnDisplay: "Prikaz kolona",
    columnSetting: "Podešavanja",
    fullScreen: "Pun ekran",
    exitFullScreen: "Zatvori pun ekran",
    reload: "Osveži",
    density: "Veličina",
    densityDefault: "Podrazumevana",
    densityLarger: "Veća",
    densityMiddle: "Srednja",
    densitySmall: "Kompaktna"
  },
  stepsForm: {
    next: "Dalje",
    prev: "Nazad",
    submit: "Gotovo"
  },
  loginForm: {
    submitText: "Prijavi se"
  },
  editableTable: {
    action: {
      save: "Sačuvaj",
      cancel: "Poništi",
      delete: "Obriši",
      add: "dodajte red podataka"
    }
  },
  switch: {
    open: "Отворите",
    close: "Затворите"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/sv_SE.js
var sv_SE_default = {
  moneySymbol: "SEK",
  deleteThisLine: "Radera denna rad",
  copyThisLine: "Kopiera denna rad",
  form: {
    lightFilter: {
      more: "Fler filter",
      clear: "Rensa",
      confirm: "Bekräfta",
      itemUnit: "objekt"
    }
  },
  tableForm: {
    search: "Sök",
    reset: "Återställ",
    submit: "Skicka",
    collapsed: "Expandera",
    expand: "Fäll ihop",
    inputPlaceholder: "Vänligen ange",
    selectPlaceholder: "Vänligen välj"
  },
  alert: {
    clear: "Avbryt val",
    selected: "Vald",
    item: "objekt"
  },
  pagination: {
    total: {
      range: "Från",
      total: "objekt/totalt",
      item: "objekt"
    }
  },
  tableToolBar: {
    leftPin: "Fäst till vänster",
    rightPin: "Fäst till höger",
    noPin: "Inte fäst",
    leftFixedTitle: "Fäst till vänster",
    rightFixedTitle: "Fäst till höger",
    noFixedTitle: "Inte fäst",
    reset: "Återställ",
    columnDisplay: "Kolumnvisning",
    columnSetting: "Kolumninställningar",
    fullScreen: "Fullskärm",
    exitFullScreen: "Avsluta fullskärm",
    reload: "Ladda om",
    density: "Täthet",
    densityDefault: "Normal",
    densityLarger: "Lös",
    densityMiddle: "Medium",
    densitySmall: "Kompakt"
  },
  stepsForm: {
    next: "Nästa steg",
    prev: "Föregående steg",
    submit: "Skicka"
  },
  loginForm: {
    submitText: "Logga in"
  },
  editableTable: {
    onlyOneLineEditor: "Endast en rad kan redigeras åt gången",
    action: {
      save: "Spara",
      cancel: "Avbryt",
      delete: "Radera",
      add: "Lägg till en rad"
    }
  },
  switch: {
    open: "Öppna",
    close: "Stäng"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/th_TH.js
var th_TH_default = {
  moneySymbol: "฿",
  deleteThisLine: "ลบบรรทัดนี้",
  copyThisLine: "คัดลอกบรรทัดนี้",
  form: {
    lightFilter: {
      more: "มากกว่า",
      clear: "ชัดเจน",
      confirm: "ยืนยัน",
      itemUnit: "รายการ"
    }
  },
  tableForm: {
    search: "สอบถาม",
    reset: "รีเซ็ต",
    submit: "ส่ง",
    collapsed: "ขยาย",
    expand: "ทรุด",
    inputPlaceholder: "กรุณาป้อน",
    selectPlaceholder: "โปรดเลือก"
  },
  alert: {
    clear: "ชัดเจน",
    selected: "เลือกแล้ว",
    item: "รายการ"
  },
  pagination: {
    total: {
      range: " ",
      total: "ของ",
      item: "รายการ"
    }
  },
  tableToolBar: {
    leftPin: "ปักหมุดไปทางซ้าย",
    rightPin: "ปักหมุดไปทางขวา",
    noPin: "เลิกตรึงแล้ว",
    leftFixedTitle: "แก้ไขด้านซ้าย",
    rightFixedTitle: "แก้ไขด้านขวา",
    noFixedTitle: "ไม่คงที่",
    reset: "รีเซ็ต",
    columnDisplay: "การแสดงคอลัมน์",
    columnSetting: "การตั้งค่า",
    fullScreen: "เต็มจอ",
    exitFullScreen: "ออกจากโหมดเต็มหน้าจอ",
    reload: "รีเฟรช",
    density: "ความหนาแน่น",
    densityDefault: "ค่าเริ่มต้น",
    densityLarger: "ขนาดใหญ่ขึ้น",
    densityMiddle: "กลาง",
    densitySmall: "กะทัดรัด"
  },
  stepsForm: {
    next: "ถัดไป",
    prev: "ก่อนหน้า",
    submit: "เสร็จ"
  },
  loginForm: {
    submitText: "เข้าสู่ระบบ"
  },
  editableTable: {
    onlyOneLineEditor: "แก้ไขได้เพียงบรรทัดเดียวเท่านั้น",
    action: {
      save: "บันทึก",
      cancel: "ยกเลิก",
      delete: "ลบ",
      add: "เพิ่มแถวของข้อมูล"
    }
  },
  switch: {
    open: "เปิด",
    close: "ปิด"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/tr_TR.js
var tr_TR_default = {
  moneySymbol: "₺",
  form: {
    lightFilter: {
      more: "Daha Fazla",
      clear: "Temizle",
      confirm: "Onayla",
      itemUnit: "Öğeler"
    }
  },
  tableForm: {
    search: "Filtrele",
    reset: "Sıfırla",
    submit: "Gönder",
    collapsed: "Daha fazla",
    expand: "Daha az",
    inputPlaceholder: "Filtrelemek için bir değer girin",
    selectPlaceholder: "Filtrelemek için bir değer seçin"
  },
  alert: {
    clear: "Temizle",
    selected: "Seçili",
    item: "Öğe"
  },
  pagination: {
    total: {
      range: " ",
      total: "Toplam",
      item: "Öğe"
    }
  },
  tableToolBar: {
    leftPin: "Sola sabitle",
    rightPin: "Sağa sabitle",
    noPin: "Sabitlemeyi kaldır",
    leftFixedTitle: "Sola sabitlendi",
    rightFixedTitle: "Sağa sabitlendi",
    noFixedTitle: "Sabitlenmedi",
    reset: "Sıfırla",
    columnDisplay: "Kolon Görünümü",
    columnSetting: "Ayarlar",
    fullScreen: "Tam Ekran",
    exitFullScreen: "Tam Ekrandan Çık",
    reload: "Yenile",
    density: "Kalınlık",
    densityDefault: "Varsayılan",
    densityLarger: "Büyük",
    densityMiddle: "Orta",
    densitySmall: "Küçük"
  },
  stepsForm: {
    next: "Sıradaki",
    prev: "Önceki",
    submit: "Gönder"
  },
  loginForm: {
    submitText: "Giriş Yap"
  },
  editableTable: {
    action: {
      save: "Kaydet",
      cancel: "Vazgeç",
      delete: "Sil",
      add: "foegje in rige gegevens ta"
    }
  },
  switch: {
    open: "açık",
    close: "kapatmak"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/uk_UA.js
var uk_UA_default = {
  moneySymbol: "₴",
  deleteThisLine: "Видатили рядок",
  copyThisLine: "Скопіювати рядок",
  form: {
    lightFilter: {
      more: "Ще",
      clear: "Очистити",
      confirm: "Ок",
      itemUnit: "Позиції"
    }
  },
  tableForm: {
    search: "Пошук",
    reset: "Очистити",
    submit: "Відправити",
    collapsed: "Розгорнути",
    expand: "Згорнути",
    inputPlaceholder: "Введіть значення",
    selectPlaceholder: "Оберіть значення"
  },
  alert: {
    clear: "Очистити",
    selected: "Обрано",
    item: "елементів"
  },
  pagination: {
    total: {
      range: " ",
      total: "з",
      item: "елементів"
    }
  },
  tableToolBar: {
    leftPin: "Закріпити зліва",
    rightPin: "Закріпити справа",
    noPin: "Відкріпити",
    leftFixedTitle: "Закріплено зліва",
    rightFixedTitle: "Закріплено справа",
    noFixedTitle: "Не закріплено",
    reset: "Скинути",
    columnDisplay: "Відображення стовпців",
    columnSetting: "Налаштування",
    fullScreen: "Повноекранний режим",
    exitFullScreen: "Вийти з повноекранного режиму",
    reload: "Оновити",
    density: "Розмір",
    densityDefault: "За замовчуванням",
    densityLarger: "Великий",
    densityMiddle: "Середній",
    densitySmall: "Стислий"
  },
  stepsForm: {
    next: "Наступний",
    prev: "Попередній",
    submit: "Завершити"
  },
  loginForm: {
    submitText: "Вхіх"
  },
  editableTable: {
    onlyOneLineEditor: "Тільки один рядок може бути редагований одночасно",
    action: {
      save: "Зберегти",
      cancel: "Відмінити",
      delete: "Видалити",
      add: "додати рядок"
    }
  },
  switch: {
    open: "Відкрито",
    close: "Закрито"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/uz_UZ.js
var uz_UZ_default = {
  moneySymbol: "UZS",
  form: {
    lightFilter: {
      more: "Yana",
      clear: "Tozalash",
      confirm: "OK",
      itemUnit: "Pozitsiyalar"
    }
  },
  tableForm: {
    search: "Qidirish",
    reset: "Qayta tiklash",
    submit: "Yuborish",
    collapsed: "Yig‘ish",
    expand: "Kengaytirish",
    inputPlaceholder: "Qiymatni kiriting",
    selectPlaceholder: "Qiymatni tanlang"
  },
  alert: {
    clear: "Tozalash",
    selected: "Tanlangan",
    item: "elementlar"
  },
  pagination: {
    total: {
      range: " ",
      total: "dan",
      item: "elementlar"
    }
  },
  tableToolBar: {
    leftPin: "Chapga mahkamlash",
    rightPin: "O‘ngga mahkamlash",
    noPin: "Mahkamlashni olib tashlash",
    leftFixedTitle: "Chapga mahkamlangan",
    rightFixedTitle: "O‘ngga mahkamlangan",
    noFixedTitle: "Mahkamlashsiz",
    reset: "Qayta tiklash",
    columnDisplay: "Ustunni ko‘rsatish",
    columnSetting: "Sozlamalar",
    fullScreen: "To‘liq ekran",
    exitFullScreen: "To‘liq ekrandan chiqish",
    reload: "Yangilash",
    density: "O‘lcham",
    densityDefault: "Standart",
    densityLarger: "Katta",
    densityMiddle: "O‘rtacha",
    densitySmall: "Kichik"
  },
  stepsForm: {
    next: "Keyingi",
    prev: "Oldingi",
    submit: "Tugatish"
  },
  loginForm: {
    submitText: "Kirish"
  },
  editableTable: {
    action: {
      save: "Saqlash",
      cancel: "Bekor qilish",
      delete: "O‘chirish",
      add: "maʼlumotlar qatorini qo‘shish"
    }
  },
  switch: {
    open: "Ochish",
    close: "Yopish"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/vi_VN.js
var vi_VN_default = {
  moneySymbol: "₫",
  form: {
    lightFilter: {
      more: "Nhiều hơn",
      clear: "Trong",
      confirm: "Xác nhận",
      itemUnit: "Mục"
    }
  },
  tableForm: {
    search: "Tìm kiếm",
    reset: "Làm lại",
    submit: "Gửi đi",
    collapsed: "Mở rộng",
    expand: "Thu gọn",
    inputPlaceholder: "nhập dữ liệu",
    selectPlaceholder: "Vui lòng chọn"
  },
  alert: {
    clear: "Xóa",
    selected: "đã chọn",
    item: "mục"
  },
  pagination: {
    total: {
      range: " ",
      total: "trên",
      item: "mặt hàng"
    }
  },
  tableToolBar: {
    leftPin: "Ghim trái",
    rightPin: "Ghim phải",
    noPin: "Bỏ ghim",
    leftFixedTitle: "Cố định trái",
    rightFixedTitle: "Cố định phải",
    noFixedTitle: "Chưa cố định",
    reset: "Làm lại",
    columnDisplay: "Cột hiển thị",
    columnSetting: "Cấu hình",
    fullScreen: "Chế độ toàn màn hình",
    exitFullScreen: "Thoát chế độ toàn màn hình",
    reload: "Làm mới",
    density: "Mật độ hiển thị",
    densityDefault: "Mặc định",
    densityLarger: "Mặc định",
    densityMiddle: "Trung bình",
    densitySmall: "Chật"
  },
  stepsForm: {
    next: "Sau",
    prev: "Trước",
    submit: "Kết thúc"
  },
  loginForm: {
    submitText: "Đăng nhập"
  },
  editableTable: {
    action: {
      save: "Cứu",
      cancel: "Hủy",
      delete: "Xóa",
      add: "thêm một hàng dữ liệu"
    }
  },
  switch: {
    open: "mở",
    close: "đóng"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/zh_CN.js
var zh_CN_default6 = {
  moneySymbol: "¥",
  deleteThisLine: "删除此项",
  copyThisLine: "复制此项",
  form: {
    lightFilter: {
      more: "更多筛选",
      clear: "清除",
      confirm: "确认",
      itemUnit: "项"
    }
  },
  tableForm: {
    search: "查询",
    reset: "重置",
    submit: "提交",
    collapsed: "展开",
    expand: "收起",
    inputPlaceholder: "请输入",
    selectPlaceholder: "请选择"
  },
  alert: {
    clear: "取消选择",
    selected: "已选择",
    item: "项"
  },
  pagination: {
    total: {
      range: "第",
      total: "条/总共",
      item: "条"
    }
  },
  tableToolBar: {
    leftPin: "固定在列首",
    rightPin: "固定在列尾",
    noPin: "不固定",
    leftFixedTitle: "固定在左侧",
    rightFixedTitle: "固定在右侧",
    noFixedTitle: "不固定",
    reset: "重置",
    columnDisplay: "列展示",
    columnSetting: "列设置",
    fullScreen: "全屏",
    exitFullScreen: "退出全屏",
    reload: "刷新",
    density: "密度",
    densityDefault: "正常",
    densityLarger: "宽松",
    densityMiddle: "中等",
    densitySmall: "紧凑"
  },
  stepsForm: {
    next: "下一步",
    prev: "上一步",
    submit: "提交"
  },
  loginForm: {
    submitText: "登录"
  },
  editableTable: {
    onlyOneLineEditor: "只能同时编辑一行",
    action: {
      save: "保存",
      cancel: "取消",
      delete: "删除",
      add: "添加一行数据"
    }
  },
  switch: {
    open: "打开",
    close: "关闭"
  }
};

// node_modules/@ant-design/pro-provider/es/locale/zh_TW.js
var zh_TW_default = {
  moneySymbol: "NT$",
  deleteThisLine: "刪除此项",
  copyThisLine: "複製此项",
  form: {
    lightFilter: {
      more: "更多篩選",
      clear: "清除",
      confirm: "確認",
      itemUnit: "項"
    }
  },
  tableForm: {
    search: "查詢",
    reset: "重置",
    submit: "提交",
    collapsed: "展開",
    expand: "收起",
    inputPlaceholder: "請輸入",
    selectPlaceholder: "請選擇"
  },
  alert: {
    clear: "取消選擇",
    selected: "已選擇",
    item: "項"
  },
  pagination: {
    total: {
      range: "第",
      total: "條/總共",
      item: "條"
    }
  },
  tableToolBar: {
    leftPin: "固定到左邊",
    rightPin: "固定到右邊",
    noPin: "不固定",
    leftFixedTitle: "固定在左側",
    rightFixedTitle: "固定在右側",
    noFixedTitle: "不固定",
    reset: "重置",
    columnDisplay: "列展示",
    columnSetting: "列設置",
    fullScreen: "全屏",
    exitFullScreen: "退出全屏",
    reload: "刷新",
    density: "密度",
    densityDefault: "正常",
    densityLarger: "寬鬆",
    densityMiddle: "中等",
    densitySmall: "緊湊"
  },
  stepsForm: {
    next: "下一步",
    prev: "上一步",
    submit: "完成"
  },
  loginForm: {
    submitText: "登入"
  },
  editableTable: {
    onlyOneLineEditor: "只能同時編輯一行",
    action: {
      save: "保存",
      cancel: "取消",
      delete: "刪除",
      add: "新增一行資料"
    }
  },
  switch: {
    open: "打開",
    close: "關閉"
  }
};

// node_modules/@ant-design/pro-provider/es/intl.js
var createIntl = function createIntl2(locale4, localeMap) {
  return {
    getMessage: function getMessage(id, defaultMessage) {
      var msg = get(localeMap, id.replace(/\[(\d+)\]/g, ".$1").split(".")) || "";
      if (msg) return msg;
      var localKey = locale4.replace("_", "-");
      if (localKey === "zh-CN") {
        return defaultMessage;
      }
      var intl = intlMap["zh-CN"];
      return intl ? intl.getMessage(id, defaultMessage) : defaultMessage;
    },
    locale: locale4
  };
};
var mnMNIntl = createIntl("mn_MN", mn_MN_default);
var arEGIntl = createIntl("ar_EG", ar_EG_default);
var zhCNIntl = createIntl("zh_CN", zh_CN_default6);
var enUSIntl = createIntl("en_US", en_US_default);
var enGBIntl = createIntl("en_GB", en_GB_default);
var viVNIntl = createIntl("vi_VN", vi_VN_default);
var itITIntl = createIntl("it_IT", it_IT_default);
var jaJPIntl = createIntl("ja_JP", ja_JP_default);
var esESIntl = createIntl("es_ES", es_ES_default);
var caESIntl = createIntl("ca_ES", ca_ES_default);
var ruRUIntl = createIntl("ru_RU", ru_RU_default);
var srRSIntl = createIntl("sr_RS", sr_RS_default);
var msMYIntl = createIntl("ms_MY", ms_MY_default);
var zhTWIntl = createIntl("zh_TW", zh_TW_default);
var frFRIntl = createIntl("fr_FR", fr_FR_default);
var ptBRIntl = createIntl("pt_BR", pt_BR_default);
var koKRIntl = createIntl("ko_KR", ko_KR_default);
var idIDIntl = createIntl("id_ID", id_ID_default);
var deDEIntl = createIntl("de_DE", de_DE_default);
var faIRIntl = createIntl("fa_IR", fa_IR_default);
var trTRIntl = createIntl("tr_TR", tr_TR_default);
var plPLIntl = createIntl("pl_PL", pl_PL_default);
var hrHRIntl = createIntl("hr_", hr_HR_default);
var thTHIntl = createIntl("th_TH", th_TH_default);
var csCZIntl = createIntl("cs_cz", cs_CZ_default);
var skSKIntl = createIntl("sk_SK", sk_SK_default);
var heILIntl = createIntl("he_IL", he_IL_default);
var ukUAIntl = createIntl("uk_UA", uk_UA_default);
var uzUZIntl = createIntl("uz_UZ", uz_UZ_default);
var nlNLIntl = createIntl("nl_NL", nl_NL_default);
var roROIntl = createIntl("ro_RO", ro_RO_default);
var svSEIntl = createIntl("sv_SE", sv_SE_default);
var intlMap = {
  "mn-MN": mnMNIntl,
  "ar-EG": arEGIntl,
  "zh-CN": zhCNIntl,
  "en-US": enUSIntl,
  "en-GB": enGBIntl,
  "vi-VN": viVNIntl,
  "it-IT": itITIntl,
  "ja-JP": jaJPIntl,
  "es-ES": esESIntl,
  "ca-ES": caESIntl,
  "ru-RU": ruRUIntl,
  "sr-RS": srRSIntl,
  "ms-MY": msMYIntl,
  "zh-TW": zhTWIntl,
  "fr-FR": frFRIntl,
  "pt-BR": ptBRIntl,
  "ko-KR": koKRIntl,
  "id-ID": idIDIntl,
  "de-DE": deDEIntl,
  "fa-IR": faIRIntl,
  "tr-TR": trTRIntl,
  "pl-PL": plPLIntl,
  "hr-HR": hrHRIntl,
  "th-TH": thTHIntl,
  "cs-CZ": csCZIntl,
  "sk-SK": skSKIntl,
  "he-IL": heILIntl,
  "uk-UA": ukUAIntl,
  "uz-UZ": uzUZIntl,
  "nl-NL": nlNLIntl,
  "ro-RO": roROIntl,
  "sv-SE": svSEIntl
};
var intlMapKeys = Object.keys(intlMap);
var findIntlKeyByAntdLocaleKey = function findIntlKeyByAntdLocaleKey2(localeKey) {
  var localeName = (localeKey || "zh-CN").toLocaleLowerCase();
  return intlMapKeys.find(function(intlKey) {
    var LowerCaseKey = intlKey.toLocaleLowerCase();
    return LowerCaseKey.includes(localeName);
  });
};

// node_modules/@ant-design/pro-provider/es/index.js
var import_dayjs = __toESM(require_dayjs_min());

// node_modules/@ctrl/tinycolor/dist/module/util.js
function bound01(n2, max) {
  if (isOnePointZero(n2)) {
    n2 = "100%";
  }
  var isPercent = isPercentage(n2);
  n2 = max === 360 ? n2 : Math.min(max, Math.max(0, parseFloat(n2)));
  if (isPercent) {
    n2 = parseInt(String(n2 * max), 10) / 100;
  }
  if (Math.abs(n2 - max) < 1e-6) {
    return 1;
  }
  if (max === 360) {
    n2 = (n2 < 0 ? n2 % max + max : n2 % max) / parseFloat(String(max));
  } else {
    n2 = n2 % max / parseFloat(String(max));
  }
  return n2;
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function isOnePointZero(n2) {
  return typeof n2 === "string" && n2.indexOf(".") !== -1 && parseFloat(n2) === 1;
}
function isPercentage(n2) {
  return typeof n2 === "string" && n2.indexOf("%") !== -1;
}
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}
function convertToPercentage(n2) {
  if (n2 <= 1) {
    return "".concat(Number(n2) * 100, "%");
  }
  return n2;
}
function pad2(c) {
  return c.length === 1 ? "0" + c : String(c);
}

// node_modules/@ctrl/tinycolor/dist/module/conversion.js
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = 0;
  var s = 0;
  var l = (max + min) / 2;
  if (max === min) {
    s = 0;
    h = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  return { h, s, l };
}
function hue2rgb(p, q2, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q2 - p) * (6 * t);
  }
  if (t < 1 / 2) {
    return q2;
  }
  if (t < 2 / 3) {
    return p + (q2 - p) * (2 / 3 - t) * 6;
  }
  return p;
}
function hslToRgb(h, s, l) {
  var r;
  var g;
  var b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  if (s === 0) {
    g = l;
    b = l;
    r = l;
  } else {
    var q2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q2;
    r = hue2rgb(p, q2, h + 1 / 3);
    g = hue2rgb(p, q2, h);
    b = hue2rgb(p, q2, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = 0;
  var v = max;
  var d = max - min;
  var s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  return { h, s, v };
}
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h);
  var f = h - i;
  var p = v * (1 - s);
  var q2 = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var mod = i % 6;
  var r = [v, q2, p, p, t, v][mod];
  var g = [t, v, v, q2, p, p][mod];
  var b = [p, p, t, v, v, q2][mod];
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHex(r, g, b, allow3Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
  ];
  if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
    pad2(convertDecimalToHex(a))
  ];
  if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function numberInputToObject(color) {
  return {
    r: color >> 16,
    g: (color & 65280) >> 8,
    b: color & 255
  };
}

// node_modules/@ctrl/tinycolor/dist/module/css-color-names.js
var names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};

// node_modules/@ctrl/tinycolor/dist/module/format-input.js
function inputToRGB(color) {
  var rgb = { r: 0, g: 0, b: 0 };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color === "string") {
    color = stringInputToObject(color);
  }
  if (typeof color === "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (Object.prototype.hasOwnProperty.call(color, "a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a
  };
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
  color = color.trim().toLowerCase();
  if (color.length === 0) {
    return false;
  }
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  }
  var match3 = matchers.rgb.exec(color);
  if (match3) {
    return { r: match3[1], g: match3[2], b: match3[3] };
  }
  match3 = matchers.rgba.exec(color);
  if (match3) {
    return { r: match3[1], g: match3[2], b: match3[3], a: match3[4] };
  }
  match3 = matchers.hsl.exec(color);
  if (match3) {
    return { h: match3[1], s: match3[2], l: match3[3] };
  }
  match3 = matchers.hsla.exec(color);
  if (match3) {
    return { h: match3[1], s: match3[2], l: match3[3], a: match3[4] };
  }
  match3 = matchers.hsv.exec(color);
  if (match3) {
    return { h: match3[1], s: match3[2], v: match3[3] };
  }
  match3 = matchers.hsva.exec(color);
  if (match3) {
    return { h: match3[1], s: match3[2], v: match3[3], a: match3[4] };
  }
  match3 = matchers.hex8.exec(color);
  if (match3) {
    return {
      r: parseIntFromHex(match3[1]),
      g: parseIntFromHex(match3[2]),
      b: parseIntFromHex(match3[3]),
      a: convertHexToDecimal(match3[4]),
      format: named ? "name" : "hex8"
    };
  }
  match3 = matchers.hex6.exec(color);
  if (match3) {
    return {
      r: parseIntFromHex(match3[1]),
      g: parseIntFromHex(match3[2]),
      b: parseIntFromHex(match3[3]),
      format: named ? "name" : "hex"
    };
  }
  match3 = matchers.hex4.exec(color);
  if (match3) {
    return {
      r: parseIntFromHex(match3[1] + match3[1]),
      g: parseIntFromHex(match3[2] + match3[2]),
      b: parseIntFromHex(match3[3] + match3[3]),
      a: convertHexToDecimal(match3[4] + match3[4]),
      format: named ? "name" : "hex8"
    };
  }
  match3 = matchers.hex3.exec(color);
  if (match3) {
    return {
      r: parseIntFromHex(match3[1] + match3[1]),
      g: parseIntFromHex(match3[2] + match3[2]),
      b: parseIntFromHex(match3[3] + match3[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}

// node_modules/@ctrl/tinycolor/dist/module/index.js
var TinyColor = (
  /** @class */
  function() {
    function TinyColor2(color, opts) {
      if (color === void 0) {
        color = "";
      }
      if (opts === void 0) {
        opts = {};
      }
      var _a;
      if (color instanceof TinyColor2) {
        return color;
      }
      if (typeof color === "number") {
        color = numberInputToObject(color);
      }
      this.originalInput = color;
      var rgb = inputToRGB(color);
      this.originalInput = color;
      this.r = rgb.r;
      this.g = rgb.g;
      this.b = rgb.b;
      this.a = rgb.a;
      this.roundA = Math.round(100 * this.a) / 100;
      this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
      this.gradientType = opts.gradientType;
      if (this.r < 1) {
        this.r = Math.round(this.r);
      }
      if (this.g < 1) {
        this.g = Math.round(this.g);
      }
      if (this.b < 1) {
        this.b = Math.round(this.b);
      }
      this.isValid = rgb.ok;
    }
    TinyColor2.prototype.isDark = function() {
      return this.getBrightness() < 128;
    };
    TinyColor2.prototype.isLight = function() {
      return !this.isDark();
    };
    TinyColor2.prototype.getBrightness = function() {
      var rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
    };
    TinyColor2.prototype.getLuminance = function() {
      var rgb = this.toRgb();
      var R;
      var G;
      var B;
      var RsRGB = rgb.r / 255;
      var GsRGB = rgb.g / 255;
      var BsRGB = rgb.b / 255;
      if (RsRGB <= 0.03928) {
        R = RsRGB / 12.92;
      } else {
        R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      }
      if (GsRGB <= 0.03928) {
        G = GsRGB / 12.92;
      } else {
        G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      }
      if (BsRGB <= 0.03928) {
        B = BsRGB / 12.92;
      } else {
        B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    TinyColor2.prototype.getAlpha = function() {
      return this.a;
    };
    TinyColor2.prototype.setAlpha = function(alpha) {
      this.a = boundAlpha(alpha);
      this.roundA = Math.round(100 * this.a) / 100;
      return this;
    };
    TinyColor2.prototype.isMonochrome = function() {
      var s = this.toHsl().s;
      return s === 0;
    };
    TinyColor2.prototype.toHsv = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    TinyColor2.prototype.toHsvString = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      var h = Math.round(hsv.h * 360);
      var s = Math.round(hsv.s * 100);
      var v = Math.round(hsv.v * 100);
      return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHsl = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    TinyColor2.prototype.toHslString = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      var h = Math.round(hsl.h * 360);
      var s = Math.round(hsl.s * 100);
      var l = Math.round(hsl.l * 100);
      return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHex = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    TinyColor2.prototype.toHexString = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return "#" + this.toHex(allow3Char);
    };
    TinyColor2.prototype.toHex8 = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    TinyColor2.prototype.toHex8String = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return "#" + this.toHex8(allow4Char);
    };
    TinyColor2.prototype.toHexShortString = function(allowShortChar) {
      if (allowShortChar === void 0) {
        allowShortChar = false;
      }
      return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
    };
    TinyColor2.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toRgbString = function() {
      var r = Math.round(this.r);
      var g = Math.round(this.g);
      var b = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toPercentageRgb = function() {
      var fmt = function(x) {
        return "".concat(Math.round(bound01(x, 255) * 100), "%");
      };
      return {
        r: fmt(this.r),
        g: fmt(this.g),
        b: fmt(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toPercentageRgbString = function() {
      var rnd = function(x) {
        return Math.round(bound01(x, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toName = function() {
      if (this.a === 0) {
        return "transparent";
      }
      if (this.a < 1) {
        return false;
      }
      var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
      for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (hex === value) {
          return key;
        }
      }
      return false;
    };
    TinyColor2.prototype.toString = function(format) {
      var formatSet = Boolean(format);
      format = format !== null && format !== void 0 ? format : this.format;
      var formattedString = false;
      var hasAlpha = this.a < 1 && this.a >= 0;
      var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith("hex") || format === "name");
      if (needsAlphaFormat) {
        if (format === "name" && this.a === 0) {
          return this.toName();
        }
        return this.toRgbString();
      }
      if (format === "rgb") {
        formattedString = this.toRgbString();
      }
      if (format === "prgb") {
        formattedString = this.toPercentageRgbString();
      }
      if (format === "hex" || format === "hex6") {
        formattedString = this.toHexString();
      }
      if (format === "hex3") {
        formattedString = this.toHexString(true);
      }
      if (format === "hex4") {
        formattedString = this.toHex8String(true);
      }
      if (format === "hex8") {
        formattedString = this.toHex8String();
      }
      if (format === "name") {
        formattedString = this.toName();
      }
      if (format === "hsl") {
        formattedString = this.toHslString();
      }
      if (format === "hsv") {
        formattedString = this.toHsvString();
      }
      return formattedString || this.toHexString();
    };
    TinyColor2.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor2.prototype.clone = function() {
      return new TinyColor2(this.toString());
    };
    TinyColor2.prototype.lighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.brighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var rgb = this.toRgb();
      rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
      rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
      rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
      return new TinyColor2(rgb);
    };
    TinyColor2.prototype.darken = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.tint = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("white", amount);
    };
    TinyColor2.prototype.shade = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("black", amount);
    };
    TinyColor2.prototype.desaturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.saturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.greyscale = function() {
      return this.desaturate(100);
    };
    TinyColor2.prototype.spin = function(amount) {
      var hsl = this.toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.mix = function(color, amount) {
      if (amount === void 0) {
        amount = 50;
      }
      var rgb1 = this.toRgb();
      var rgb2 = new TinyColor2(color).toRgb();
      var p = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
      };
      return new TinyColor2(rgba);
    };
    TinyColor2.prototype.analogous = function(results, slices) {
      if (results === void 0) {
        results = 6;
      }
      if (slices === void 0) {
        slices = 30;
      }
      var hsl = this.toHsl();
      var part = 360 / slices;
      var ret = [this];
      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(new TinyColor2(hsl));
      }
      return ret;
    };
    TinyColor2.prototype.complement = function() {
      var hsl = this.toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.monochromatic = function(results) {
      if (results === void 0) {
        results = 6;
      }
      var hsv = this.toHsv();
      var h = hsv.h;
      var s = hsv.s;
      var v = hsv.v;
      var res = [];
      var modification = 1 / results;
      while (results--) {
        res.push(new TinyColor2({ h, s, v }));
        v = (v + modification) % 1;
      }
      return res;
    };
    TinyColor2.prototype.splitcomplement = function() {
      var hsl = this.toHsl();
      var h = hsl.h;
      return [
        this,
        new TinyColor2({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
        new TinyColor2({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
      ];
    };
    TinyColor2.prototype.onBackground = function(background) {
      var fg = this.toRgb();
      var bg = new TinyColor2(background).toRgb();
      var alpha = fg.a + bg.a * (1 - fg.a);
      return new TinyColor2({
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
        a: alpha
      });
    };
    TinyColor2.prototype.triad = function() {
      return this.polyad(3);
    };
    TinyColor2.prototype.tetrad = function() {
      return this.polyad(4);
    };
    TinyColor2.prototype.polyad = function(n2) {
      var hsl = this.toHsl();
      var h = hsl.h;
      var result = [this];
      var increment = 360 / n2;
      for (var i = 1; i < n2; i++) {
        result.push(new TinyColor2({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
      }
      return result;
    };
    TinyColor2.prototype.equals = function(color) {
      return this.toRgbString() === new TinyColor2(color).toRgbString();
    };
    return TinyColor2;
  }()
);

// node_modules/@ant-design/pro-provider/es/useStyle/index.js
var import_react11 = __toESM(require_react());

// node_modules/@ant-design/pro-provider/es/useStyle/token.js
var token_exports = {};
__export(token_exports, {
  defaultToken: () => defaultToken,
  emptyTheme: () => emptyTheme,
  hashCode: () => hashCode,
  token: () => token,
  useToken: () => useToken
});
var _theme$defaultAlgorit;
var defaultToken = {
  blue: "#1677ff",
  purple: "#722ED1",
  cyan: "#13C2C2",
  green: "#52C41A",
  magenta: "#EB2F96",
  pink: "#eb2f96",
  red: "#F5222D",
  orange: "#FA8C16",
  yellow: "#FADB14",
  volcano: "#FA541C",
  geekblue: "#2F54EB",
  gold: "#FAAD14",
  lime: "#A0D911",
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff7875",
  colorInfo: "#1677ff",
  colorTextBase: "#000",
  colorBgBase: "#fff",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  fontSize: 14,
  lineWidth: 1,
  lineType: "solid",
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
  motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
  motionEaseInQuint: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  borderRadius: 4,
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  controlHeight: 32,
  zIndexBase: 0,
  zIndexPopupBase: 1e3,
  opacityImage: 1,
  wireframe: false,
  "blue-1": "#e6f4ff",
  "blue-2": "#bae0ff",
  "blue-3": "#91caff",
  "blue-4": "#69b1ff",
  "blue-5": "#4096ff",
  "blue-6": "#1677ff",
  "blue-7": "#0958d9",
  "blue-8": "#003eb3",
  "blue-9": "#002c8c",
  "blue-10": "#001d66",
  "purple-1": "#f9f0ff",
  "purple-2": "#efdbff",
  "purple-3": "#d3adf7",
  "purple-4": "#b37feb",
  "purple-5": "#9254de",
  "purple-6": "#722ed1",
  "purple-7": "#531dab",
  "purple-8": "#391085",
  "purple-9": "#22075e",
  "purple-10": "#120338",
  "cyan-1": "#e6fffb",
  "cyan-2": "#b5f5ec",
  "cyan-3": "#87e8de",
  "cyan-4": "#5cdbd3",
  "cyan-5": "#36cfc9",
  "cyan-6": "#13c2c2",
  "cyan-7": "#08979c",
  "cyan-8": "#006d75",
  "cyan-9": "#00474f",
  "cyan-10": "#002329",
  "green-1": "#f6ffed",
  "green-2": "#d9f7be",
  "green-3": "#b7eb8f",
  "green-4": "#95de64",
  "green-5": "#73d13d",
  "green-6": "#52c41a",
  "green-7": "#389e0d",
  "green-8": "#237804",
  "green-9": "#135200",
  "green-10": "#092b00",
  "magenta-1": "#fff0f6",
  "magenta-2": "#ffd6e7",
  "magenta-3": "#ffadd2",
  "magenta-4": "#ff85c0",
  "magenta-5": "#f759ab",
  "magenta-6": "#eb2f96",
  "magenta-7": "#c41d7f",
  "magenta-8": "#9e1068",
  "magenta-9": "#780650",
  "magenta-10": "#520339",
  "pink-1": "#fff0f6",
  "pink-2": "#ffd6e7",
  "pink-3": "#ffadd2",
  "pink-4": "#ff85c0",
  "pink-5": "#f759ab",
  "pink-6": "#eb2f96",
  "pink-7": "#c41d7f",
  "pink-8": "#9e1068",
  "pink-9": "#780650",
  "pink-10": "#520339",
  "red-1": "#fff1f0",
  "red-2": "#ffccc7",
  "red-3": "#ffa39e",
  "red-4": "#ff7875",
  "red-5": "#ff4d4f",
  "red-6": "#f5222d",
  "red-7": "#cf1322",
  "red-8": "#a8071a",
  "red-9": "#820014",
  "red-10": "#5c0011",
  "orange-1": "#fff7e6",
  "orange-2": "#ffe7ba",
  "orange-3": "#ffd591",
  "orange-4": "#ffc069",
  "orange-5": "#ffa940",
  "orange-6": "#fa8c16",
  "orange-7": "#d46b08",
  "orange-8": "#ad4e00",
  "orange-9": "#873800",
  "orange-10": "#612500",
  "yellow-1": "#feffe6",
  "yellow-2": "#ffffb8",
  "yellow-3": "#fffb8f",
  "yellow-4": "#fff566",
  "yellow-5": "#ffec3d",
  "yellow-6": "#fadb14",
  "yellow-7": "#d4b106",
  "yellow-8": "#ad8b00",
  "yellow-9": "#876800",
  "yellow-10": "#614700",
  "volcano-1": "#fff2e8",
  "volcano-2": "#ffd8bf",
  "volcano-3": "#ffbb96",
  "volcano-4": "#ff9c6e",
  "volcano-5": "#ff7a45",
  "volcano-6": "#fa541c",
  "volcano-7": "#d4380d",
  "volcano-8": "#ad2102",
  "volcano-9": "#871400",
  "volcano-10": "#610b00",
  "geekblue-1": "#f0f5ff",
  "geekblue-2": "#d6e4ff",
  "geekblue-3": "#adc6ff",
  "geekblue-4": "#85a5ff",
  "geekblue-5": "#597ef7",
  "geekblue-6": "#2f54eb",
  "geekblue-7": "#1d39c4",
  "geekblue-8": "#10239e",
  "geekblue-9": "#061178",
  "geekblue-10": "#030852",
  "gold-1": "#fffbe6",
  "gold-2": "#fff1b8",
  "gold-3": "#ffe58f",
  "gold-4": "#ffd666",
  "gold-5": "#ffc53d",
  "gold-6": "#faad14",
  "gold-7": "#d48806",
  "gold-8": "#ad6800",
  "gold-9": "#874d00",
  "gold-10": "#613400",
  "lime-1": "#fcffe6",
  "lime-2": "#f4ffb8",
  "lime-3": "#eaff8f",
  "lime-4": "#d3f261",
  "lime-5": "#bae637",
  "lime-6": "#a0d911",
  "lime-7": "#7cb305",
  "lime-8": "#5b8c00",
  "lime-9": "#3f6600",
  "lime-10": "#254000",
  colorText: "rgba(0, 0, 0, 0.88)",
  colorTextSecondary: "rgba(0, 0, 0, 0.65)",
  colorTextTertiary: "rgba(0, 0, 0, 0.45)",
  colorTextQuaternary: "rgba(0, 0, 0, 0.25)",
  colorFill: "rgba(0, 0, 0, 0.15)",
  colorFillSecondary: "rgba(0, 0, 0, 0.06)",
  colorFillTertiary: "rgba(0, 0, 0, 0.04)",
  colorFillQuaternary: "rgba(0, 0, 0, 0.02)",
  colorBgLayout: "hsl(220,23%,97%)",
  colorBgContainer: "#ffffff",
  colorBgElevated: "#ffffff",
  colorBgSpotlight: "rgba(0, 0, 0, 0.85)",
  colorBorder: "#d9d9d9",
  colorBorderSecondary: "#f0f0f0",
  colorPrimaryBg: "#e6f4ff",
  colorPrimaryBgHover: "#bae0ff",
  colorPrimaryBorder: "#91caff",
  colorPrimaryBorderHover: "#69b1ff",
  colorPrimaryHover: "#4096ff",
  colorPrimaryActive: "#0958d9",
  colorPrimaryTextHover: "#4096ff",
  colorPrimaryText: "#1677ff",
  colorPrimaryTextActive: "#0958d9",
  colorSuccessBg: "#f6ffed",
  colorSuccessBgHover: "#d9f7be",
  colorSuccessBorder: "#b7eb8f",
  colorSuccessBorderHover: "#95de64",
  colorSuccessHover: "#95de64",
  colorSuccessActive: "#389e0d",
  colorSuccessTextHover: "#73d13d",
  colorSuccessText: "#52c41a",
  colorSuccessTextActive: "#389e0d",
  colorErrorBg: "#fff2f0",
  colorErrorBgHover: "#fff1f0",
  colorErrorBorder: "#ffccc7",
  colorErrorBorderHover: "#ffa39e",
  colorErrorHover: "#ffa39e",
  colorErrorActive: "#d9363e",
  colorErrorTextHover: "#ff7875",
  colorErrorText: "#ff4d4f",
  colorErrorTextActive: "#d9363e",
  colorWarningBg: "#fffbe6",
  colorWarningBgHover: "#fff1b8",
  colorWarningBorder: "#ffe58f",
  colorWarningBorderHover: "#ffd666",
  colorWarningHover: "#ffd666",
  colorWarningActive: "#d48806",
  colorWarningTextHover: "#ffc53d",
  colorWarningText: "#faad14",
  colorWarningTextActive: "#d48806",
  colorInfoBg: "#e6f4ff",
  colorInfoBgHover: "#bae0ff",
  colorInfoBorder: "#91caff",
  colorInfoBorderHover: "#69b1ff",
  colorInfoHover: "#69b1ff",
  colorInfoActive: "#0958d9",
  colorInfoTextHover: "#4096ff",
  colorInfoText: "#1677ff",
  colorInfoTextActive: "#0958d9",
  colorBgMask: "rgba(0, 0, 0, 0.45)",
  colorWhite: "#fff",
  sizeXXL: 48,
  sizeXL: 32,
  sizeLG: 24,
  sizeMD: 20,
  sizeMS: 16,
  size: 16,
  sizeSM: 12,
  sizeXS: 8,
  sizeXXS: 4,
  controlHeightSM: 24,
  controlHeightXS: 16,
  controlHeightLG: 40,
  motionDurationFast: "0.1s",
  motionDurationMid: "0.2s",
  motionDurationSlow: "0.3s",
  fontSizes: [12, 14, 16, 20, 24, 30, 38, 46, 56, 68],
  lineHeights: [1.6666666666666667, 1.5714285714285714, 1.5, 1.4, 1.3333333333333333, 1.2666666666666666, 1.2105263157894737, 1.173913043478261, 1.1428571428571428, 1.1176470588235294],
  lineWidthBold: 2,
  borderRadiusXS: 1,
  borderRadiusSM: 4,
  borderRadiusLG: 8,
  borderRadiusOuter: 4,
  colorLink: "#1677ff",
  colorLinkHover: "#69b1ff",
  colorLinkActive: "#0958d9",
  colorFillContent: "rgba(0, 0, 0, 0.06)",
  colorFillContentHover: "rgba(0, 0, 0, 0.15)",
  colorFillAlter: "rgba(0, 0, 0, 0.02)",
  colorBgContainerDisabled: "rgba(0, 0, 0, 0.04)",
  colorBorderBg: "#ffffff",
  colorSplit: "rgba(5, 5, 5, 0.06)",
  colorTextPlaceholder: "rgba(0, 0, 0, 0.25)",
  colorTextDisabled: "rgba(0, 0, 0, 0.25)",
  colorTextHeading: "rgba(0, 0, 0, 0.88)",
  colorTextLabel: "rgba(0, 0, 0, 0.65)",
  colorTextDescription: "rgba(0, 0, 0, 0.45)",
  colorTextLightSolid: "#fff",
  colorHighlight: "#ff7875",
  colorBgTextHover: "rgba(0, 0, 0, 0.06)",
  colorBgTextActive: "rgba(0, 0, 0, 0.15)",
  colorIcon: "rgba(0, 0, 0, 0.45)",
  colorIconHover: "rgba(0, 0, 0, 0.88)",
  colorErrorOutline: "rgba(255, 38, 5, 0.06)",
  colorWarningOutline: "rgba(255, 215, 5, 0.1)",
  fontSizeSM: 12,
  fontSizeLG: 16,
  fontSizeXL: 20,
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,
  fontSizeIcon: 12,
  lineHeight: 1.5714285714285714,
  lineHeightLG: 1.5,
  lineHeightSM: 1.6666666666666667,
  lineHeightHeading1: 1.2105263157894737,
  lineHeightHeading2: 1.2666666666666666,
  lineHeightHeading3: 1.3333333333333333,
  lineHeightHeading4: 1.4,
  lineHeightHeading5: 1.5,
  controlOutlineWidth: 2,
  controlInteractiveSize: 16,
  controlItemBgHover: "rgba(0, 0, 0, 0.04)",
  controlItemBgActive: "#e6f4ff",
  controlItemBgActiveHover: "#bae0ff",
  controlItemBgActiveDisabled: "rgba(0, 0, 0, 0.15)",
  controlTmpOutline: "rgba(0, 0, 0, 0.02)",
  controlOutline: "rgba(5, 145, 255, 0.1)",
  fontWeightStrong: 600,
  opacityLoading: 0.65,
  linkDecoration: "none",
  linkHoverDecoration: "none",
  linkFocusDecoration: "none",
  controlPaddingHorizontal: 12,
  controlPaddingHorizontalSM: 8,
  paddingXXS: 4,
  paddingXS: 8,
  paddingSM: 12,
  padding: 16,
  paddingMD: 20,
  paddingLG: 24,
  paddingXL: 32,
  paddingContentHorizontalLG: 24,
  paddingContentVerticalLG: 16,
  paddingContentHorizontal: 16,
  paddingContentVertical: 12,
  paddingContentHorizontalSM: 16,
  paddingContentVerticalSM: 8,
  marginXXS: 4,
  marginXS: 8,
  marginSM: 12,
  margin: 16,
  marginMD: 20,
  marginLG: 24,
  marginXL: 32,
  marginXXL: 48,
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)",
  boxShadowSecondary: "0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)",
  screenXS: 480,
  screenXSMin: 480,
  screenXSMax: 479,
  screenSM: 576,
  screenSMMin: 576,
  screenSMMax: 575,
  screenMD: 768,
  screenMDMin: 768,
  screenMDMax: 767,
  screenLG: 992,
  screenLGMin: 992,
  screenLGMax: 991,
  screenXL: 1200,
  screenXLMin: 1200,
  screenXLMax: 1199,
  screenXXL: 1600,
  screenXXLMin: 1600,
  screenXXLMax: 1599,
  boxShadowPopoverArrow: "3px 3px 7px rgba(0, 0, 0, 0.1)",
  boxShadowCard: "0 1px 2px -2px rgba(0, 0, 0, 0.16),0 3px 6px 0 rgba(0, 0, 0, 0.12),0 5px 12px 4px rgba(0, 0, 0, 0.09)",
  boxShadowDrawerRight: "-6px 0 16px 0 rgba(0, 0, 0, 0.08),-3px 0 6px -4px rgba(0, 0, 0, 0.12),-9px 0 28px 8px rgba(0, 0, 0, 0.05)",
  boxShadowDrawerLeft: "6px 0 16px 0 rgba(0, 0, 0, 0.08),3px 0 6px -4px rgba(0, 0, 0, 0.12),9px 0 28px 8px rgba(0, 0, 0, 0.05)",
  boxShadowDrawerUp: "0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)",
  boxShadowDrawerDown: "0 -6px 16px 0 rgba(0, 0, 0, 0.08),0 -3px 6px -4px rgba(0, 0, 0, 0.12),0 -9px 28px 8px rgba(0, 0, 0, 0.05)",
  boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
  boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
  boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
  boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)",
  _tokenKey: "19w80ff",
  _hashId: "css-dev-only-do-not-override-i2zu9q"
};
var hashCode = function hashCode2(str) {
  var seed = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  var h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
  for (var i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
var emptyTheme = createTheme(function(token2) {
  return token2;
});
var token = {
  theme: emptyTheme,
  token: _objectSpread2(_objectSpread2({}, defaultToken), theme_default === null || theme_default === void 0 || (_theme$defaultAlgorit = theme_default.defaultAlgorithm) === null || _theme$defaultAlgorit === void 0 ? void 0 : _theme$defaultAlgorit.call(theme_default, theme_default === null || theme_default === void 0 ? void 0 : theme_default.defaultSeed)),
  hashId: "pro-".concat(hashCode(JSON.stringify(defaultToken)))
};
var useToken = function useToken2() {
  return token;
};

// node_modules/@ant-design/pro-provider/es/useStyle/index.js
var genTheme = function genTheme2() {
  if (typeof theme_default === "undefined" || !theme_default) return token_exports;
  return theme_default;
};
var proTheme = genTheme();
var useToken3 = proTheme.useToken;
var resetComponent = function resetComponent2(token2) {
  return {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    color: token2.colorText,
    fontSize: token2.fontSize,
    lineHeight: token2.lineHeight,
    listStyle: "none"
  };
};
var operationUnit = function operationUnit2(token2) {
  return {
    // FIXME: This use link but is a operation unit. Seems should be a colorPrimary.
    // And Typography use this to generate link style which should not do this.
    color: token2.colorLink,
    outline: "none",
    cursor: "pointer",
    transition: "color ".concat(token2.motionDurationSlow),
    "&:focus, &:hover": {
      color: token2.colorLinkHover
    },
    "&:active": {
      color: token2.colorLinkActive
    }
  };
};
function useStyle(componentName, styleFn) {
  var _token$proComponentsC;
  var _useContext = (0, import_react11.useContext)(ProProvider), _useContext$token = _useContext.token, token2 = _useContext$token === void 0 ? {} : _useContext$token;
  var _useContext2 = (0, import_react11.useContext)(ProProvider), hashed = _useContext2.hashed;
  var _useToken = useToken3(), antdToken = _useToken.token, hashId = _useToken.hashId;
  var _useContext3 = (0, import_react11.useContext)(ProProvider), provideTheme = _useContext3.theme;
  var _useContext4 = (0, import_react11.useContext)(config_provider_default.ConfigContext), getPrefixCls = _useContext4.getPrefixCls, csp = _useContext4.csp;
  if (!token2.layout) {
    token2 = _objectSpread2({}, antdToken);
  }
  token2.proComponentsCls = (_token$proComponentsC = token2.proComponentsCls) !== null && _token$proComponentsC !== void 0 ? _token$proComponentsC : ".".concat(getPrefixCls("pro"));
  token2.antCls = ".".concat(getPrefixCls());
  return {
    wrapSSR: useStyleRegister({
      theme: provideTheme,
      token: token2,
      path: [componentName],
      nonce: csp === null || csp === void 0 ? void 0 : csp.nonce,
      layer: {
        name: "antd-pro",
        dependencies: ["antd"]
      }
    }, function() {
      return styleFn(token2);
    }),
    hashId: hashed ? hashId : ""
  };
}

// node_modules/@ant-design/pro-provider/es/utils/merge.js
init_typeof();

// node_modules/@ant-design/pro-provider/es/index.js
var import_zh_cn = __toESM(require_zh_cn());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ProConfigContext = import_react12.default.createContext({
  intl: _objectSpread2(_objectSpread2({}, zhCNIntl), {}, {
    locale: "default"
  }),
  valueTypeMap: {},
  theme: emptyTheme,
  hashed: true,
  dark: false,
  token: defaultToken
});
var ConfigConsumer = ProConfigContext.Consumer;
function useIntl() {
  var _useContext3 = (0, import_react12.useContext)(config_provider_default.ConfigContext), locale4 = _useContext3.locale;
  var _useContext4 = (0, import_react12.useContext)(ProConfigContext), intl = _useContext4.intl;
  if (intl && intl.locale !== "default") {
    return intl || zhCNIntl;
  }
  if (locale4 !== null && locale4 !== void 0 && locale4.locale) {
    return intlMap[findIntlKeyByAntdLocaleKey(locale4.locale)] || zhCNIntl;
  }
  return zhCNIntl;
}
ProConfigContext.displayName = "ProProvider";
var ProProvider = ProConfigContext;

// node_modules/@ant-design/pro-utils/es/components/DropdownFooter/index.js
var import_classnames = __toESM(require_classnames());
var import_react13 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/components/DropdownFooter/style.js
init_defineProperty();

// node_modules/@ant-design/pro-utils/es/components/DropdownFooter/index.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-utils/es/components/ErrorBoundary/index.js
init_defineProperty();
var import_react14 = __toESM(require_react());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var ErrorBoundary = function(_React$Component) {
  _inherits(ErrorBoundary2, _React$Component);
  var _super = _createSuper(ErrorBoundary2);
  function ErrorBoundary2() {
    var _this;
    _classCallCheck(this, ErrorBoundary2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      hasError: false,
      errorInfo: ""
    });
    return _this;
  }
  _createClass(ErrorBoundary2, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return (0, import_jsx_runtime5.jsx)(result_default, {
          status: "error",
          title: "Something went wrong.",
          extra: this.state.errorInfo
        });
      }
      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true,
        errorInfo: error.message
      };
    }
  }]);
  return ErrorBoundary2;
}(import_react14.default.Component);

// node_modules/@ant-design/pro-utils/es/components/FieldLabel/index.js
init_defineProperty();
var import_classnames2 = __toESM(require_classnames());
var import_react15 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/components/FieldLabel/style.js
init_defineProperty();
var genProStyle = function genProStyle2(token2) {
  return _defineProperty({}, token2.componentCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    display: "inline-flex",
    gap: token2.marginXXS,
    alignItems: "center",
    height: "30px",
    paddingBlock: 0,
    paddingInline: 8,
    fontSize: token2.fontSize,
    lineHeight: "30px",
    borderRadius: "2px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: token2.colorBgTextHover
    },
    "&-active": _defineProperty({
      paddingBlock: 0,
      paddingInline: 8,
      backgroundColor: token2.colorBgTextHover
    }, "&".concat(token2.componentCls, "-allow-clear:hover:not(").concat(token2.componentCls, "-disabled)"), _defineProperty(_defineProperty({}, "".concat(token2.componentCls, "-arrow"), {
      display: "none"
    }), "".concat(token2.componentCls, "-close"), {
      display: "inline-flex"
    }))
  }, "".concat(token2.antCls, "-select"), _defineProperty({}, "".concat(token2.antCls, "-select-clear"), {
    borderRadius: "50%"
  })), "".concat(token2.antCls, "-picker"), _defineProperty({}, "".concat(token2.antCls, "-picker-clear"), {
    borderRadius: "50%"
  })), "&-icon", _defineProperty(_defineProperty({
    color: token2.colorIcon,
    transition: "color 0.3s",
    fontSize: 12,
    verticalAlign: "middle"
  }, "&".concat(token2.componentCls, "-close"), {
    display: "none",
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    color: token2.colorTextPlaceholder,
    borderRadius: "50%"
  }), "&:hover", {
    color: token2.colorIconHover
  })), "&-disabled", _defineProperty({
    color: token2.colorTextPlaceholder,
    cursor: "not-allowed"
  }, "".concat(token2.componentCls, "-icon"), {
    color: token2.colorTextPlaceholder
  })), "&-small", _defineProperty(_defineProperty(_defineProperty({
    height: "24px",
    paddingBlock: 0,
    paddingInline: 4,
    fontSize: token2.fontSizeSM,
    lineHeight: "24px"
  }, "&".concat(token2.componentCls, "-active"), {
    paddingBlock: 0,
    paddingInline: 8
  }), "".concat(token2.componentCls, "-icon"), {
    paddingBlock: 0,
    paddingInline: 0
  }), "".concat(token2.componentCls, "-close"), {
    marginBlockStart: "-2px",
    paddingBlock: 4,
    paddingInline: 4,
    fontSize: "6px"
  })), "&-bordered", {
    height: "32px",
    paddingBlock: 0,
    paddingInline: 8,
    border: "".concat(token2.lineWidth, "px solid ").concat(token2.colorBorder),
    borderRadius: "@border-radius-base"
  }), "&-bordered&-small", {
    height: "24px",
    paddingBlock: 0,
    paddingInline: 8
  }), "&-bordered&-active", {
    backgroundColor: token2.colorBgContainer
  }));
};
function useStyle3(prefixCls) {
  return useStyle("FieldLabel", function(token2) {
    var proToken = _objectSpread2(_objectSpread2({}, token2), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proToken)];
  });
}

// node_modules/@ant-design/pro-utils/es/components/FieldLabel/index.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var FieldLabelFunction = function FieldLabelFunction2(props, ref) {
  var _ConfigProvider$useCo, _ref2, _props$size;
  var label = props.label, onClear = props.onClear, value = props.value, disabled = props.disabled, onLabelClick = props.onLabelClick, ellipsis = props.ellipsis, placeholder = props.placeholder, className = props.className, formatter = props.formatter, bordered = props.bordered, style = props.style, downIcon = props.downIcon, _props$allowClear = props.allowClear, allowClear = _props$allowClear === void 0 ? true : _props$allowClear, _props$valueMaxLength = props.valueMaxLength, valueMaxLength = _props$valueMaxLength === void 0 ? 41 : _props$valueMaxLength;
  var _ref = (config_provider_default === null || config_provider_default === void 0 || (_ConfigProvider$useCo = config_provider_default.useConfig) === null || _ConfigProvider$useCo === void 0 ? void 0 : _ConfigProvider$useCo.call(config_provider_default)) || {
    componentSize: "middle"
  }, componentSize = _ref.componentSize;
  var size = componentSize;
  var _useContext = (0, import_react15.useContext)(config_provider_default.ConfigContext), getPrefixCls = _useContext.getPrefixCls;
  var prefixCls = getPrefixCls("pro-core-field-label");
  var _useStyle = useStyle3(prefixCls), wrapSSR = _useStyle.wrapSSR, hashId = _useStyle.hashId;
  var intl = useIntl();
  var clearRef = (0, import_react15.useRef)(null);
  var labelRef = (0, import_react15.useRef)(null);
  (0, import_react15.useImperativeHandle)(ref, function() {
    return {
      labelRef,
      clearRef
    };
  });
  var wrapElements = function wrapElements2(array) {
    if (array.every(function(item) {
      return typeof item === "string";
    })) return array.join(",");
    return array.map(function(item, index) {
      var comma = index === array.length - 1 ? "" : ",";
      if (typeof item === "string") {
        return (0, import_jsx_runtime6.jsxs)("span", {
          children: [item, comma]
        }, index);
      }
      return (0, import_jsx_runtime6.jsxs)("span", {
        style: {
          display: "flex"
        },
        children: [item, comma]
      }, index);
    });
  };
  var formatterText = function formatterText2(aValue) {
    if (formatter) {
      return formatter(aValue);
    }
    return Array.isArray(aValue) ? wrapElements(aValue) : aValue;
  };
  var getTextByValue = function getTextByValue2(aLabel, aValue) {
    if (aValue !== void 0 && aValue !== null && aValue !== "" && (!Array.isArray(aValue) || aValue.length)) {
      var _str$toString, _str$toString$slice;
      var prefix = aLabel ? (0, import_jsx_runtime6.jsxs)("span", {
        onClick: function onClick() {
          onLabelClick === null || onLabelClick === void 0 || onLabelClick();
        },
        className: "".concat(prefixCls, "-text"),
        children: [aLabel, ": "]
      }) : "";
      var str = formatterText(aValue);
      if (!ellipsis) {
        return (0, import_jsx_runtime6.jsxs)("span", {
          style: {
            display: "inline-flex",
            alignItems: "center"
          },
          children: [prefix, formatterText(aValue)]
        });
      }
      var getText = function getText2() {
        var isArrayValue = Array.isArray(aValue) && aValue.length > 1;
        var unitText = intl.getMessage("form.lightFilter.itemUnit", "项");
        if (typeof str === "string" && str.length > valueMaxLength && isArrayValue) {
          return "...".concat(aValue.length).concat(unitText);
        }
        return "";
      };
      var tail = getText();
      return (0, import_jsx_runtime6.jsxs)("span", {
        title: typeof str === "string" ? str : void 0,
        style: {
          display: "inline-flex",
          alignItems: "center"
        },
        children: [prefix, (0, import_jsx_runtime7.jsx)("span", {
          style: {
            paddingInlineStart: 4,
            display: "flex"
          },
          children: typeof str === "string" ? str === null || str === void 0 || (_str$toString = str.toString()) === null || _str$toString === void 0 || (_str$toString$slice = _str$toString.slice) === null || _str$toString$slice === void 0 ? void 0 : _str$toString$slice.call(_str$toString, 0, valueMaxLength) : str
        }), tail]
      });
    }
    return aLabel || placeholder;
  };
  return wrapSSR((0, import_jsx_runtime6.jsxs)("span", {
    className: (0, import_classnames2.default)(prefixCls, hashId, "".concat(prefixCls, "-").concat((_ref2 = (_props$size = props.size) !== null && _props$size !== void 0 ? _props$size : size) !== null && _ref2 !== void 0 ? _ref2 : "middle"), _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-active"), (Array.isArray(value) ? value.length > 0 : !!value) || value === 0), "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-bordered"), bordered), "".concat(prefixCls, "-allow-clear"), allowClear), className),
    style,
    ref: labelRef,
    onClick: function onClick() {
      var _props$onClick;
      props === null || props === void 0 || (_props$onClick = props.onClick) === null || _props$onClick === void 0 || _props$onClick.call(props);
    },
    children: [getTextByValue(label, value), (value || value === 0) && allowClear && (0, import_jsx_runtime7.jsx)(CloseCircleFilled_default, {
      role: "button",
      title: intl.getMessage("form.lightFilter.clear", "清除"),
      className: (0, import_classnames2.default)("".concat(prefixCls, "-icon"), hashId, "".concat(prefixCls, "-close")),
      onClick: function onClick(e2) {
        if (!disabled) onClear === null || onClear === void 0 || onClear();
        e2.stopPropagation();
      },
      ref: clearRef
    }), downIcon !== false ? downIcon !== null && downIcon !== void 0 ? downIcon : (0, import_jsx_runtime7.jsx)(DownOutlined_default, {
      className: (0, import_classnames2.default)("".concat(prefixCls, "-icon"), hashId, "".concat(prefixCls, "-arrow"))
    }) : null]
  }));
};
var FieldLabel = import_react15.default.forwardRef(FieldLabelFunction);

// node_modules/@ant-design/pro-utils/es/components/FilterDropdown/index.js
init_defineProperty();
var import_react16 = __toESM(require_react());
var import_classnames3 = __toESM(require_classnames());

// node_modules/@ant-design/pro-utils/es/compareVersions/index.js
init_typeof();

// node_modules/@ant-design/pro-utils/es/components/FilterDropdown/style.js
init_defineProperty();

// node_modules/@ant-design/pro-utils/es/components/FilterDropdown/index.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var import_jsx_runtime9 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-utils/es/components/InlineErrorFormItem/index.js
var import_react17 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/components/InlineErrorFormItem/style.js
init_defineProperty();

// node_modules/@ant-design/pro-utils/es/components/InlineErrorFormItem/index.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var import_jsx_runtime12 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-utils/es/components/LabelIconTip/index.js
init_defineProperty();
var import_classnames4 = __toESM(require_classnames());
var import_react18 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/components/LabelIconTip/style.js
init_defineProperty();
var genProStyle3 = function genProStyle4(token2) {
  return _defineProperty({}, token2.componentCls, {
    display: "inline-flex",
    alignItems: "center",
    maxWidth: "100%",
    "&-icon": {
      display: "block",
      marginInlineStart: "4px",
      cursor: "pointer",
      "&:hover": {
        color: token2.colorPrimary
      }
    },
    "&-title": {
      display: "inline-flex",
      flex: "1"
    },
    "&-subtitle ": {
      marginInlineStart: 8,
      color: token2.colorTextSecondary,
      fontWeight: "normal",
      fontSize: token2.fontSize,
      whiteSpace: "nowrap"
    },
    "&-title-ellipsis": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      wordBreak: "keep-all"
    }
  });
};
function useStyle6(prefixCls) {
  return useStyle("LabelIconTip", function(token2) {
    var proToken = _objectSpread2(_objectSpread2({}, token2), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle3(proToken)];
  });
}

// node_modules/@ant-design/pro-utils/es/components/LabelIconTip/index.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var LabelIconTip = import_react18.default.memo(function(props) {
  var label = props.label, tooltip = props.tooltip, ellipsis = props.ellipsis, subTitle = props.subTitle;
  var _useContext = (0, import_react18.useContext)(config_provider_default.ConfigContext), getPrefixCls = _useContext.getPrefixCls;
  var className = getPrefixCls("pro-core-label-tip");
  var _useStyle = useStyle6(className), wrapSSR = _useStyle.wrapSSR, hashId = _useStyle.hashId;
  if (!tooltip && !subTitle) {
    return (0, import_jsx_runtime14.jsx)(import_jsx_runtime13.Fragment, {
      children: label
    });
  }
  var tooltipProps = typeof tooltip === "string" || import_react18.default.isValidElement(tooltip) ? {
    title: tooltip
  } : tooltip;
  var icon = (tooltipProps === null || tooltipProps === void 0 ? void 0 : tooltipProps.icon) || (0, import_jsx_runtime14.jsx)(InfoCircleOutlined_default, {});
  return wrapSSR((0, import_jsx_runtime15.jsxs)("div", {
    className: (0, import_classnames4.default)(className, hashId),
    onMouseDown: function onMouseDown(e2) {
      return e2.stopPropagation();
    },
    onMouseLeave: function onMouseLeave(e2) {
      return e2.stopPropagation();
    },
    onMouseMove: function onMouseMove(e2) {
      return e2.stopPropagation();
    },
    children: [(0, import_jsx_runtime14.jsx)("div", {
      className: (0, import_classnames4.default)("".concat(className, "-title"), hashId, _defineProperty({}, "".concat(className, "-title-ellipsis"), ellipsis)),
      children: label
    }), subTitle && (0, import_jsx_runtime14.jsx)("div", {
      className: "".concat(className, "-subtitle ").concat(hashId).trim(),
      children: subTitle
    }), tooltip && (0, import_jsx_runtime14.jsx)(tooltip_default, _objectSpread2(_objectSpread2({}, tooltipProps), {}, {
      children: (0, import_jsx_runtime14.jsx)("span", {
        className: "".concat(className, "-icon ").concat(hashId).trim(),
        children: icon
      })
    }))]
  }));
});

// node_modules/@ant-design/pro-utils/es/components/ProFormContext/index.js
var import_react19 = __toESM(require_react());
var ProFormContext = import_react19.default.createContext({});

// node_modules/@ant-design/pro-utils/es/conversionMomentValue/index.js
init_typeof();
var import_dayjs2 = __toESM(require_dayjs_min());
var import_quarterOfYear = __toESM(require_quarterOfYear());
import_dayjs2.default.extend(import_quarterOfYear.default);

// node_modules/@ant-design/pro-utils/es/dateArrayFormatter/index.js
init_typeof();
var import_dayjs3 = __toESM(require_dayjs_min());

// node_modules/@ant-design/pro-utils/es/genCopyable/index.js
var import_react20 = __toESM(require_react());
var import_jsx_runtime16 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-utils/es/compareVersions/menuOverlayCompatible.js
var import_jsx_runtime17 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-utils/es/hooks/useDebounceFn/index.js
var import_react22 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/hooks/useRefFunction/index.js
var import_react21 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/hooks/useDebounceValue/index.js
var import_react24 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/hooks/useLatest/index.js
var import_react23 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/hooks/useDeepCompareEffect/index.js
var import_react25 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/isDeepEqualReact/index.js
init_typeof();

// node_modules/@ant-design/pro-utils/es/hooks/useDeepCompareMemo/index.js
var import_react26 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/hooks/useDocumentTitle/index.js
var import_react27 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/isBrowser/index.js
var isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;

// node_modules/@ant-design/pro-utils/es/hooks/useFetchData/index.js
var import_react28 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/hooks/usePrevious/index.js
var import_react29 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/hooks/useForceRender/index.js
var import_react30 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/hooks/useRefCallback/index.js
var import_react31 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/isImg/index.js
function isImg(path) {
  return /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(path);
}

// node_modules/@ant-design/pro-utils/es/isUrl/index.js
var isUrl = function isUrl2(path) {
  if (!path) return false;
  if (!path.startsWith("http")) {
    return false;
  }
  try {
    var url = new URL(path);
    return !!url;
  } catch (error) {
    return false;
  }
};

// node_modules/@ant-design/pro-utils/es/merge/index.js
init_typeof();

// node_modules/@ant-design/pro-utils/es/parseValueToMoment/index.js
var import_dayjs4 = __toESM(require_dayjs_min());
var import_customParseFormat = __toESM(require_customParseFormat());
import_dayjs4.default.extend(import_customParseFormat.default);

// node_modules/@ant-design/pro-utils/es/proFieldParsingText/index.js
init_typeof();
var import_react32 = __toESM(require_react());
var import_jsx_runtime18 = __toESM(require_jsx_runtime());

// node_modules/safe-stable-stringify/esm/wrapper.js
var import__2 = __toESM(require_safe_stable_stringify());
var configure = import__2.default.configure;

// node_modules/@ant-design/pro-utils/es/stringify/index.js
var stringify = configure({
  bigint: true,
  circularValue: "Magic circle!",
  deterministic: false,
  maximumDepth: 4
  //   maximumBreadth: 4,
});

// node_modules/@ant-design/pro-utils/es/transformKeySubmitValue/index.js
init_typeof();

// node_modules/lodash-es/_baseAssignValue.js
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty_default) {
    defineProperty_default(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var baseAssignValue_default = baseAssignValue;

// node_modules/lodash-es/_assignMergeValue.js
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq_default(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var assignMergeValue_default = assignMergeValue;

// node_modules/lodash-es/_createBaseFor.js
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var createBaseFor_default = createBaseFor;

// node_modules/lodash-es/_baseFor.js
var baseFor = createBaseFor_default();
var baseFor_default = baseFor;

// node_modules/lodash-es/_cloneBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root_default.Buffer : void 0;
var allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
var cloneBuffer_default = cloneBuffer;

// node_modules/lodash-es/_cloneArrayBuffer.js
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
  return result;
}
var cloneArrayBuffer_default = cloneArrayBuffer;

// node_modules/lodash-es/_cloneTypedArray.js
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var cloneTypedArray_default = cloneTypedArray;

// node_modules/lodash-es/_copyArray.js
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var copyArray_default = copyArray;

// node_modules/lodash-es/_baseCreate.js
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ function() {
  function object() {
  }
  return function(proto) {
    if (!isObject_default(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var baseCreate_default = baseCreate;

// node_modules/lodash-es/_getPrototype.js
var getPrototype = overArg_default(Object.getPrototypeOf, Object);
var getPrototype_default = getPrototype;

// node_modules/lodash-es/_initCloneObject.js
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
}
var initCloneObject_default = initCloneObject;

// node_modules/lodash-es/isPlainObject.js
var objectTag = "[object Object]";
var funcProto = Function.prototype;
var objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike_default(value) || baseGetTag_default(value) != objectTag) {
    return false;
  }
  var proto = getPrototype_default(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isPlainObject_default = isPlainObject;

// node_modules/lodash-es/_safeGet.js
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var safeGet_default = safeGet;

// node_modules/lodash-es/_assignValue.js
var objectProto2 = Object.prototype;
var hasOwnProperty2 = objectProto2.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty2.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var assignValue_default = assignValue;

// node_modules/lodash-es/_copyObject.js
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue_default(object, key, newValue);
    } else {
      assignValue_default(object, key, newValue);
    }
  }
  return object;
}
var copyObject_default = copyObject;

// node_modules/lodash-es/_nativeKeysIn.js
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var nativeKeysIn_default = nativeKeysIn;

// node_modules/lodash-es/_baseKeysIn.js
var objectProto3 = Object.prototype;
var hasOwnProperty3 = objectProto3.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject_default(object)) {
    return nativeKeysIn_default(object);
  }
  var isProto = isPrototype_default(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var baseKeysIn_default = baseKeysIn;

// node_modules/lodash-es/keysIn.js
function keysIn(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
}
var keysIn_default = keysIn;

// node_modules/lodash-es/toPlainObject.js
function toPlainObject(value) {
  return copyObject_default(value, keysIn_default(value));
}
var toPlainObject_default = toPlainObject;

// node_modules/lodash-es/_baseMergeDeep.js
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet_default(object, key), srcValue = safeGet_default(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue_default(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray_default(srcValue), isBuff = !isArr && isBuffer_default(srcValue), isTyped = !isArr && !isBuff && isTypedArray_default(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray_default(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject_default(objValue)) {
        newValue = copyArray_default(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer_default(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray_default(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject_default(srcValue) || isArguments_default(srcValue)) {
      newValue = objValue;
      if (isArguments_default(objValue)) {
        newValue = toPlainObject_default(objValue);
      } else if (!isObject_default(objValue) || isFunction_default(objValue)) {
        newValue = initCloneObject_default(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue_default(object, key, newValue);
}
var baseMergeDeep_default = baseMergeDeep;

// node_modules/lodash-es/_baseMerge.js
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor_default(source, function(srcValue, key) {
    stack || (stack = new Stack_default());
    if (isObject_default(srcValue)) {
      baseMergeDeep_default(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet_default(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue_default(object, key, newValue);
    }
  }, keysIn_default);
}
var baseMerge_default = baseMerge;

// node_modules/lodash-es/_createAssigner.js
function createAssigner(assigner) {
  return baseRest_default(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var createAssigner_default = createAssigner;

// node_modules/lodash-es/merge.js
var merge2 = createAssigner_default(function(object, source, srcIndex) {
  baseMerge_default(object, source, srcIndex);
});

// node_modules/@ant-design/pro-utils/es/transformKeySubmitValue/index.js
var import_react33 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/useEditableArray/index.js
init_defineProperty();
init_typeof();
var import_react34 = __toESM(require_react());
var import_jsx_runtime19 = __toESM(require_jsx_runtime());
var import_jsx_runtime20 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-utils/es/useEditableMap/index.js
var import_react35 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/useMediaQuery/index.js
var import_react37 = __toESM(require_react());

// node_modules/@ant-design/pro-utils/es/useMediaQuery/query.js
var import_react36 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/FooterToolbar/index.js
var import_classnames5 = __toESM(require_classnames());
var import_react38 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/@ant-design/pro-layout/es/components/FooterToolbar/style/index.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/FooterToolbar/style/stylish.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/FooterToolbar/index.js
var import_jsx_runtime21 = __toESM(require_jsx_runtime());
var import_jsx_runtime22 = __toESM(require_jsx_runtime());
var import_jsx_runtime23 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/GridContent/index.js
init_defineProperty();
var import_classnames6 = __toESM(require_classnames());
var import_react40 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/context/RouteContext.js
var import_react39 = __toESM(require_react());
var RouteContext = (0, import_react39.createContext)({});

// node_modules/@ant-design/pro-layout/es/components/GridContent/style.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/GridContent/index.js
var import_jsx_runtime24 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/PageContainer/index.js
init_defineProperty();
init_typeof();
var import_classnames9 = __toESM(require_classnames());
var import_react43 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/PageHeader/index.js
init_defineProperty();
var import_ArrowLeftOutlined = __toESM(require_ArrowLeftOutlined3());
var import_ArrowRightOutlined = __toESM(require_ArrowRightOutlined3());
var import_classnames7 = __toESM(require_classnames());
var React19 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/PageHeader/style/index.js
init_defineProperty();
var textOverflowEllipsis = function textOverflowEllipsis2() {
  return {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  };
};
var genPageHeaderStyle = function genPageHeaderStyle2(token2) {
  var _token$layout;
  return _defineProperty({}, token2.componentCls, _objectSpread2(_objectSpread2({}, resetComponent === null || resetComponent === void 0 ? void 0 : resetComponent(token2)), {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    position: "relative",
    backgroundColor: token2.colorWhite,
    paddingBlock: token2.pageHeaderPaddingVertical + 2,
    paddingInline: token2.pageHeaderPadding,
    "&&-ghost": {
      backgroundColor: token2.pageHeaderBgGhost
    },
    "&-no-children": {
      height: (_token$layout = token2.layout) === null || _token$layout === void 0 || (_token$layout = _token$layout.pageContainer) === null || _token$layout === void 0 ? void 0 : _token$layout.paddingBlockPageContainerContent
    },
    "&&-has-breadcrumb": {
      paddingBlockStart: token2.pageHeaderPaddingBreadCrumb
    },
    "&&-has-footer": {
      paddingBlockEnd: 0
    },
    "& &-back": _defineProperty({
      marginInlineEnd: token2.margin,
      fontSize: 16,
      lineHeight: 1,
      "&-button": _objectSpread2(_objectSpread2({
        fontSize: 16
      }, operationUnit === null || operationUnit === void 0 ? void 0 : operationUnit(token2)), {}, {
        color: token2.pageHeaderColorBack,
        cursor: "pointer"
      })
    }, "".concat(token2.componentCls, "-rlt &"), {
      float: "right",
      marginInlineEnd: 0,
      marginInlineStart: 0
    })
  }, "& ".concat("ant", "-divider-vertical"), {
    height: 14,
    marginBlock: 0,
    marginInline: token2.marginSM,
    verticalAlign: "middle"
  }), "& &-breadcrumb + &-heading", {
    marginBlockStart: token2.marginXS
  }), "& &-heading", {
    display: "flex",
    justifyContent: "space-between",
    "&-left": {
      display: "flex",
      alignItems: "center",
      marginBlock: token2.marginXS / 2,
      marginInlineEnd: 0,
      marginInlineStart: 0,
      overflow: "hidden"
    },
    "&-title": _objectSpread2(_objectSpread2({
      marginInlineEnd: token2.marginSM,
      marginBlockEnd: 0,
      color: token2.colorTextHeading,
      fontWeight: 600,
      fontSize: token2.pageHeaderFontSizeHeaderTitle,
      lineHeight: token2.controlHeight + "px"
    }, textOverflowEllipsis()), {}, _defineProperty({}, "".concat(token2.componentCls, "-rlt &"), {
      marginInlineEnd: 0,
      marginInlineStart: token2.marginSM
    })),
    "&-avatar": _defineProperty({
      marginInlineEnd: token2.marginSM
    }, "".concat(token2.componentCls, "-rlt &"), {
      float: "right",
      marginInlineEnd: 0,
      marginInlineStart: token2.marginSM
    }),
    "&-tags": _defineProperty({}, "".concat(token2.componentCls, "-rlt &"), {
      float: "right"
    }),
    "&-sub-title": _objectSpread2(_objectSpread2({
      marginInlineEnd: token2.marginSM,
      color: token2.colorTextSecondary,
      fontSize: token2.pageHeaderFontSizeHeaderSubTitle,
      lineHeight: token2.lineHeight
    }, textOverflowEllipsis()), {}, _defineProperty({}, "".concat(token2.componentCls, "-rlt &"), {
      float: "right",
      marginInlineEnd: 0,
      marginInlineStart: 12
    })),
    "&-extra": _defineProperty(_defineProperty({
      marginBlock: token2.marginXS / 2,
      marginInlineEnd: 0,
      marginInlineStart: 0,
      whiteSpace: "nowrap",
      "> *": _defineProperty({
        "white-space": "unset"
      }, "".concat(token2.componentCls, "-rlt &"), {
        marginInlineEnd: token2.marginSM,
        marginInlineStart: 0
      })
    }, "".concat(token2.componentCls, "-rlt &"), {
      float: "left"
    }), "*:first-child", _defineProperty({}, "".concat(token2.componentCls, "-rlt &"), {
      marginInlineEnd: 0
    }))
  }), "&-content", {
    paddingBlockStart: token2.pageHeaderPaddingContentPadding
  }), "&-footer", {
    marginBlockStart: token2.margin
  }), "&-compact &-heading", {
    flexWrap: "wrap"
  }), "&-wide", {
    maxWidth: 1152,
    margin: "0 auto"
  }), "&-rtl", {
    direction: "rtl"
  })));
};
function useStyle9(prefixCls) {
  return useStyle("ProLayoutPageHeader", function(token2) {
    var proCardToken = _objectSpread2(_objectSpread2({}, token2), {}, {
      componentCls: ".".concat(prefixCls),
      pageHeaderBgGhost: "transparent",
      pageHeaderPadding: 16,
      pageHeaderPaddingVertical: 4,
      pageHeaderPaddingBreadCrumb: token2.paddingSM,
      pageHeaderColorBack: token2.colorTextHeading,
      pageHeaderFontSizeHeaderTitle: token2.fontSizeHeading4,
      pageHeaderFontSizeHeaderSubTitle: 14,
      pageHeaderPaddingContentPadding: token2.paddingSM
    });
    return [genPageHeaderStyle(proCardToken)];
  });
}

// node_modules/@ant-design/pro-layout/es/components/PageHeader/index.js
var import_jsx_runtime25 = __toESM(require_jsx_runtime());
var import_jsx_runtime26 = __toESM(require_jsx_runtime());
var renderBack = function renderBack2(prefixCls, hashId, backIcon, onBack) {
  if (!backIcon || !onBack) {
    return null;
  }
  return (0, import_jsx_runtime25.jsx)("div", {
    className: "".concat(prefixCls, "-back ").concat(hashId).trim(),
    children: (0, import_jsx_runtime25.jsx)("div", {
      role: "button",
      onClick: function onClick(e2) {
        onBack === null || onBack === void 0 || onBack(e2);
      },
      className: "".concat(prefixCls, "-back-button ").concat(hashId).trim(),
      "aria-label": "back",
      children: backIcon
    })
  });
};
var renderBreadcrumb = function renderBreadcrumb2(breadcrumb, prefixCls) {
  var _breadcrumb$items;
  if (!((_breadcrumb$items = breadcrumb.items) !== null && _breadcrumb$items !== void 0 && _breadcrumb$items.length)) return null;
  return (0, import_jsx_runtime25.jsx)(breadcrumb_default, _objectSpread2(_objectSpread2({}, breadcrumb), {}, {
    className: (0, import_classnames7.default)("".concat(prefixCls, "-breadcrumb"), breadcrumb.className)
  }));
};
var getBackIcon = function getBackIcon2(props) {
  var direction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "ltr";
  if (props.backIcon !== void 0) {
    return props.backIcon;
  }
  return direction === "rtl" ? (0, import_jsx_runtime25.jsx)(import_ArrowRightOutlined.default, {}) : (0, import_jsx_runtime25.jsx)(import_ArrowLeftOutlined.default, {});
};
var renderTitle = function renderTitle2(prefixCls, props) {
  var direction = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "ltr";
  var hashId = arguments.length > 3 ? arguments[3] : void 0;
  var title = props.title, avatar = props.avatar, subTitle = props.subTitle, tags = props.tags, extra = props.extra, onBack = props.onBack;
  var headingPrefixCls = "".concat(prefixCls, "-heading");
  var hasHeading = title || subTitle || tags || extra;
  if (!hasHeading) {
    return null;
  }
  var backIcon = getBackIcon(props, direction);
  var backIconDom = renderBack(prefixCls, hashId, backIcon, onBack);
  var hasTitle = backIconDom || avatar || hasHeading;
  return (0, import_jsx_runtime26.jsxs)("div", {
    className: headingPrefixCls + " " + hashId,
    children: [hasTitle && (0, import_jsx_runtime26.jsxs)("div", {
      className: "".concat(headingPrefixCls, "-left ").concat(hashId).trim(),
      children: [backIconDom, avatar && (0, import_jsx_runtime25.jsx)(avatar_default, _objectSpread2({
        className: (0, import_classnames7.default)("".concat(headingPrefixCls, "-avatar"), hashId, avatar.className)
      }, avatar)), title && (0, import_jsx_runtime25.jsx)("span", {
        className: "".concat(headingPrefixCls, "-title ").concat(hashId).trim(),
        title: typeof title === "string" ? title : void 0,
        children: title
      }), subTitle && (0, import_jsx_runtime25.jsx)("span", {
        className: "".concat(headingPrefixCls, "-sub-title ").concat(hashId).trim(),
        title: typeof subTitle === "string" ? subTitle : void 0,
        children: subTitle
      }), tags && (0, import_jsx_runtime25.jsx)("span", {
        className: "".concat(headingPrefixCls, "-tags ").concat(hashId).trim(),
        children: tags
      })]
    }), extra && (0, import_jsx_runtime25.jsx)("span", {
      className: "".concat(headingPrefixCls, "-extra ").concat(hashId).trim(),
      children: (0, import_jsx_runtime25.jsx)(space_default, {
        children: extra
      })
    })]
  });
};
var renderFooter = function renderFooter2(prefixCls, footer, hashId) {
  if (footer) {
    return (0, import_jsx_runtime25.jsx)("div", {
      className: "".concat(prefixCls, "-footer ").concat(hashId).trim(),
      children: footer
    });
  }
  return null;
};
var renderChildren = function renderChildren2(prefixCls, children, hashId) {
  return (0, import_jsx_runtime25.jsx)("div", {
    className: "".concat(prefixCls, "-content ").concat(hashId).trim(),
    children
  });
};
var transformBreadcrumbRoutesToItems = function transformBreadcrumbRoutesToItems2(routes) {
  return routes === null || routes === void 0 ? void 0 : routes.map(function(route) {
    var _route$children;
    noteOnce(!!route.breadcrumbName, "Route.breadcrumbName is deprecated, please use Route.title instead.");
    return _objectSpread2(_objectSpread2({}, route), {}, {
      breadcrumbName: void 0,
      children: void 0,
      title: route.title || route.breadcrumbName
    }, (_route$children = route.children) !== null && _route$children !== void 0 && _route$children.length ? {
      menu: {
        items: transformBreadcrumbRoutesToItems2(route.children)
      }
    } : {});
  });
};
var PageHeader = function PageHeader2(props) {
  var _breadcrumbRender;
  var _React$useState = React19.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), compact = _React$useState2[0], updateCompact = _React$useState2[1];
  var onResize = function onResize2(_ref) {
    var width = _ref.width;
    return updateCompact(width < 768);
  };
  var _React$useContext = React19.useContext(config_provider_default.ConfigContext), getPrefixCls = _React$useContext.getPrefixCls, direction = _React$useContext.direction;
  var customizePrefixCls = props.prefixCls, style = props.style, footer = props.footer, children = props.children, breadcrumb = props.breadcrumb, breadcrumbRender = props.breadcrumbRender, customizeClassName = props.className, contentWidth = props.contentWidth, layout = props.layout, _props$ghost = props.ghost, ghost = _props$ghost === void 0 ? true : _props$ghost;
  var prefixCls = getPrefixCls("page-header", customizePrefixCls);
  var _useStyle = useStyle9(prefixCls), wrapSSR = _useStyle.wrapSSR, hashId = _useStyle.hashId;
  var getDefaultBreadcrumbDom = function getDefaultBreadcrumbDom2() {
    if (breadcrumb && !(breadcrumb !== null && breadcrumb !== void 0 && breadcrumb.items) && breadcrumb !== null && breadcrumb !== void 0 && breadcrumb.routes) {
      noteOnce(false, "The routes of Breadcrumb is deprecated, please use items instead.");
      breadcrumb.items = transformBreadcrumbRoutesToItems(breadcrumb.routes);
    }
    if (breadcrumb !== null && breadcrumb !== void 0 && breadcrumb.items) {
      return renderBreadcrumb(breadcrumb, prefixCls);
    }
    return null;
  };
  var defaultBreadcrumbDom = getDefaultBreadcrumbDom();
  var isBreadcrumbComponent = breadcrumb && "props" in breadcrumb;
  var breadcrumbRenderDomFromProps = (_breadcrumbRender = breadcrumbRender === null || breadcrumbRender === void 0 ? void 0 : breadcrumbRender(_objectSpread2(_objectSpread2({}, props), {}, {
    prefixCls
  }), defaultBreadcrumbDom)) !== null && _breadcrumbRender !== void 0 ? _breadcrumbRender : defaultBreadcrumbDom;
  var breadcrumbDom = isBreadcrumbComponent ? breadcrumb : breadcrumbRenderDomFromProps;
  var className = (0, import_classnames7.default)(prefixCls, hashId, customizeClassName, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-has-breadcrumb"), !!breadcrumbDom), "".concat(prefixCls, "-has-footer"), !!footer), "".concat(prefixCls, "-rtl"), direction === "rtl"), "".concat(prefixCls, "-compact"), compact), "".concat(prefixCls, "-wide"), contentWidth === "Fixed" && layout == "top"), "".concat(prefixCls, "-ghost"), ghost));
  var title = renderTitle(prefixCls, props, direction, hashId);
  var childDom = children && renderChildren(prefixCls, children, hashId);
  var footerDom = renderFooter(prefixCls, footer, hashId);
  if (!breadcrumbDom && !title && !footerDom && !childDom) {
    return (0, import_jsx_runtime25.jsx)("div", {
      className: (0, import_classnames7.default)(hashId, ["".concat(prefixCls, "-no-children")])
    });
  }
  return wrapSSR((0, import_jsx_runtime25.jsx)(es_default, {
    onResize,
    children: (0, import_jsx_runtime26.jsxs)("div", {
      className,
      style,
      children: [breadcrumbDom, title, childDom, footerDom]
    })
  }));
};

// node_modules/@ant-design/pro-layout/es/components/PageLoading/index.js
var import_react41 = __toESM(require_react());
var import_jsx_runtime27 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/WaterMark/index.js
var import_classnames8 = __toESM(require_classnames());
var import_react42 = __toESM(require_react());
var import_jsx_runtime28 = __toESM(require_jsx_runtime());
var import_jsx_runtime29 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/PageContainer/style/index.js
init_defineProperty();
var _map = [576, 768, 992, 1200].map(function(bp) {
  return "@media (max-width: ".concat(bp, "px)");
});
var _map2 = _slicedToArray(_map, 4);
var sm = _map2[0];
var md = _map2[1];
var lg = _map2[2];
var xl = _map2[3];

// node_modules/@ant-design/pro-layout/es/components/PageContainer/style/stylish.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/PageContainer/index.js
var import_jsx_runtime30 = __toESM(require_jsx_runtime());
var import_jsx_runtime31 = __toESM(require_jsx_runtime());
var import_jsx_runtime32 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/Footer.js
var import_react45 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/GlobalFooter/index.js
var import_classnames10 = __toESM(require_classnames());
var import_react44 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/GlobalFooter/style.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/GlobalFooter/index.js
var import_jsx_runtime33 = __toESM(require_jsx_runtime());
var import_jsx_runtime34 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/Footer.js
var import_jsx_runtime35 = __toESM(require_jsx_runtime());
var import_jsx_runtime36 = __toESM(require_jsx_runtime());
var Footer = layout_default.Footer;

// node_modules/@ant-design/pro-layout/es/components/Header/index.js
init_defineProperty();
var import_classnames18 = __toESM(require_classnames());
var import_react57 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/GlobalHeader/index.js
init_defineProperty();
var import_classnames17 = __toESM(require_classnames());
var import_react56 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/index.js
init_defineProperty();
var import_classnames11 = __toESM(require_classnames());
var import_react48 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/AppsLogo.js
var import_jsx_runtime37 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/DefaultContent.js
var import_react46 = __toESM(require_react());
var import_jsx_runtime38 = __toESM(require_jsx_runtime());
var import_jsx_runtime39 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/SimpleContent.js
var import_react47 = __toESM(require_react());
var import_jsx_runtime40 = __toESM(require_jsx_runtime());
var import_jsx_runtime41 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/style/index.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/index.js
var import_jsx_runtime42 = __toESM(require_jsx_runtime());
var import_jsx_runtime43 = __toESM(require_jsx_runtime());
var import_jsx_runtime44 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/SiderMenu/SiderMenu.js
init_defineProperty();
var import_classnames14 = __toESM(require_classnames());
var import_react51 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/CollapsedIcon/index.js
init_defineProperty();
var import_classnames12 = __toESM(require_classnames());

// node_modules/@ant-design/pro-layout/es/components/SiderMenu/Arrow.js
var import_jsx_runtime45 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/CollapsedIcon/style.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/CollapsedIcon/index.js
var import_jsx_runtime46 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/SiderMenu/BaseMenu.js
init_defineProperty();
var import_classnames13 = __toESM(require_classnames());
var import_react49 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/defaultSettings.js
var defaultSettings = {
  navTheme: "light",
  layout: "side",
  contentWidth: "Fluid",
  fixedHeader: false,
  fixSiderbar: true,
  iconfontUrl: "",
  colorPrimary: "#1677FF",
  splitMenus: false
};

// node_modules/@ant-design/pro-layout/es/components/SiderMenu/style/menu.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/SiderMenu/BaseMenu.js
var import_jsx_runtime47 = __toESM(require_jsx_runtime());
var import_jsx_runtime48 = __toESM(require_jsx_runtime());
var import_react50 = __toESM(require_react());
var MenuItemTooltip = function MenuItemTooltip2(props) {
  var _useState = (0, import_react49.useState)(props.collapsed), _useState2 = _slicedToArray(_useState, 2), collapsed = _useState2[0], setCollapsed = _useState2[1];
  var _useState3 = (0, import_react49.useState)(false), _useState4 = _slicedToArray(_useState3, 2), open = _useState4[0], setOpen = _useState4[1];
  (0, import_react49.useEffect)(function() {
    setOpen(false);
    setTimeout(function() {
      setCollapsed(props.collapsed);
    }, 400);
  }, [props.collapsed]);
  if (props.disable) {
    return props.children;
  }
  return (0, import_jsx_runtime47.jsx)(tooltip_default, {
    title: props.title,
    open: collapsed && props.collapsed ? open : false,
    placement: "right",
    onOpenChange: setOpen,
    children: props.children
  });
};
var IconFont = create({
  scriptUrl: defaultSettings.iconfontUrl
});
var getIcon = function getIcon2(icon) {
  var iconPrefixes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "icon-";
  var className = arguments.length > 2 ? arguments[2] : void 0;
  if (typeof icon === "string" && icon !== "") {
    if (isUrl(icon) || isImg(icon)) {
      return (0, import_jsx_runtime47.jsx)("img", {
        width: 16,
        src: icon,
        alt: "icon",
        className
      }, icon);
    }
    if (icon.startsWith(iconPrefixes)) {
      return (0, import_jsx_runtime47.jsx)(IconFont, {
        type: icon
      });
    }
  }
  return icon;
};
var getMenuTitleSymbol = function getMenuTitleSymbol2(title) {
  if (title && typeof title === "string") {
    var symbol = title.substring(0, 1).toUpperCase();
    return symbol;
  }
  return null;
};
var MenuUtil = _createClass(function MenuUtil2(props) {
  var _this = this;
  _classCallCheck(this, MenuUtil2);
  _defineProperty(this, "props", void 0);
  _defineProperty(this, "getNavMenuItems", function() {
    var menusData = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    var level = arguments.length > 1 ? arguments[1] : void 0;
    var noGroupLevel = arguments.length > 2 ? arguments[2] : void 0;
    return menusData.map(function(item) {
      return _this.getSubMenuOrItem(item, level, noGroupLevel);
    }).filter(function(item) {
      return item;
    }).flat(1);
  });
  _defineProperty(this, "getSubMenuOrItem", function(item, level, noGroupLevel) {
    var _this$props = _this.props, subMenuItemRender = _this$props.subMenuItemRender, baseClassName = _this$props.baseClassName, prefixCls = _this$props.prefixCls, collapsed = _this$props.collapsed, menu = _this$props.menu, iconPrefixes = _this$props.iconPrefixes, layout = _this$props.layout;
    var isGroup = (menu === null || menu === void 0 ? void 0 : menu.type) === "group" && layout !== "top";
    var designToken = _this.props.token;
    var name = _this.getIntlName(item);
    var children = (item === null || item === void 0 ? void 0 : item.children) || (item === null || item === void 0 ? void 0 : item.routes);
    var menuType = isGroup && level === 0 ? "group" : void 0;
    if (Array.isArray(children) && children.length > 0) {
      var _this$props2, _this$props3, _this$props4, _this$props5, _designToken$layout;
      var shouldHasIcon = level === 0 || isGroup && level === 1;
      var iconDom = getIcon(item.icon, iconPrefixes, "".concat(baseClassName, "-icon ").concat((_this$props2 = _this.props) === null || _this$props2 === void 0 ? void 0 : _this$props2.hashId));
      var defaultIcon = collapsed && shouldHasIcon ? getMenuTitleSymbol(name) : null;
      var defaultTitle = (0, import_jsx_runtime48.jsxs)("div", {
        className: (0, import_classnames13.default)("".concat(baseClassName, "-item-title"), (_this$props3 = _this.props) === null || _this$props3 === void 0 ? void 0 : _this$props3.hashId, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(baseClassName, "-item-title-collapsed"), collapsed), "".concat(baseClassName, "-item-title-collapsed-level-").concat(noGroupLevel), collapsed), "".concat(baseClassName, "-group-item-title"), menuType === "group"), "".concat(baseClassName, "-item-collapsed-show-title"), (menu === null || menu === void 0 ? void 0 : menu.collapsedShowTitle) && collapsed)),
        children: [menuType === "group" && collapsed ? null : shouldHasIcon && iconDom ? (0, import_jsx_runtime47.jsx)("span", {
          className: "".concat(baseClassName, "-item-icon ").concat((_this$props4 = _this.props) === null || _this$props4 === void 0 ? void 0 : _this$props4.hashId).trim(),
          children: iconDom
        }) : defaultIcon, (0, import_jsx_runtime47.jsx)("span", {
          className: (0, import_classnames13.default)("".concat(baseClassName, "-item-text"), (_this$props5 = _this.props) === null || _this$props5 === void 0 ? void 0 : _this$props5.hashId, _defineProperty({}, "".concat(baseClassName, "-item-text-has-icon"), menuType !== "group" && shouldHasIcon && (iconDom || defaultIcon))),
          children: name
        })]
      });
      var title = subMenuItemRender ? subMenuItemRender(_objectSpread2(_objectSpread2({}, item), {}, {
        isUrl: false
      }), defaultTitle, _this.props) : defaultTitle;
      if (isGroup && level === 0 && _this.props.collapsed && !menu.collapsedShowGroupTitle) {
        return _this.getNavMenuItems(children, level + 1, level);
      }
      var childrenList = _this.getNavMenuItems(children, level + 1, isGroup && level === 0 && _this.props.collapsed ? level : level + 1);
      return [{
        type: menuType,
        key: item.key || item.path,
        label: title,
        onClick: isGroup ? void 0 : item.onTitleClick,
        children: childrenList,
        className: (0, import_classnames13.default)(_defineProperty(_defineProperty(_defineProperty({}, "".concat(baseClassName, "-group"), menuType === "group"), "".concat(baseClassName, "-submenu"), menuType !== "group"), "".concat(baseClassName, "-submenu-has-icon"), menuType !== "group" && shouldHasIcon && iconDom))
      }, isGroup && level === 0 ? {
        type: "divider",
        prefixCls,
        className: "".concat(baseClassName, "-divider"),
        key: (item.key || item.path) + "-group-divider",
        style: {
          padding: 0,
          borderBlockEnd: 0,
          margin: _this.props.collapsed ? "4px" : "6px 16px",
          marginBlockStart: _this.props.collapsed ? 4 : 8,
          borderColor: designToken === null || designToken === void 0 || (_designToken$layout = designToken.layout) === null || _designToken$layout === void 0 || (_designToken$layout = _designToken$layout.sider) === null || _designToken$layout === void 0 ? void 0 : _designToken$layout.colorMenuItemDivider
        }
      } : void 0].filter(Boolean);
    }
    return {
      className: "".concat(baseClassName, "-menu-item"),
      disabled: item.disabled,
      key: item.key || item.path,
      onClick: item.onTitleClick,
      // eslint-disable-next-line react/no-is-mounted
      label: _this.getMenuItemPath(item, level, noGroupLevel)
    };
  });
  _defineProperty(this, "getIntlName", function(item) {
    var name = item.name, locale4 = item.locale;
    var _this$props6 = _this.props, menu = _this$props6.menu, formatMessage = _this$props6.formatMessage;
    var finalName = name;
    if (locale4 && (menu === null || menu === void 0 ? void 0 : menu.locale) !== false) {
      finalName = formatMessage === null || formatMessage === void 0 ? void 0 : formatMessage({
        id: locale4,
        defaultMessage: name
      });
    }
    if (_this.props.menuTextRender) {
      return _this.props.menuTextRender(item, finalName, _this.props);
    }
    return finalName;
  });
  _defineProperty(this, "getMenuItemPath", function(item, level, noGroupLevel) {
    var _this$props9, _this$props10, _this$props11, _this$props12;
    var itemPath = _this.conversionPath(item.path || "/");
    var _this$props7 = _this.props, _this$props7$location = _this$props7.location, location2 = _this$props7$location === void 0 ? {
      pathname: "/"
    } : _this$props7$location, isMobile = _this$props7.isMobile, onCollapse = _this$props7.onCollapse, menuItemRender = _this$props7.menuItemRender, iconPrefixes = _this$props7.iconPrefixes;
    var menuItemTitle = _this.getIntlName(item);
    var _this$props8 = _this.props, baseClassName = _this$props8.baseClassName, menu = _this$props8.menu, collapsed = _this$props8.collapsed;
    var isGroup = (menu === null || menu === void 0 ? void 0 : menu.type) === "group";
    var hasIcon = level === 0 || isGroup && level === 1;
    var icon = !hasIcon ? null : getIcon(item.icon, iconPrefixes, "".concat(baseClassName, "-icon ").concat((_this$props9 = _this.props) === null || _this$props9 === void 0 ? void 0 : _this$props9.hashId));
    var defaultIcon = collapsed && hasIcon ? getMenuTitleSymbol(menuItemTitle) : null;
    var defaultItem = (0, import_jsx_runtime48.jsxs)("div", {
      className: (0, import_classnames13.default)("".concat(baseClassName, "-item-title"), (_this$props10 = _this.props) === null || _this$props10 === void 0 ? void 0 : _this$props10.hashId, _defineProperty(_defineProperty(_defineProperty({}, "".concat(baseClassName, "-item-title-collapsed"), collapsed), "".concat(baseClassName, "-item-title-collapsed-level-").concat(noGroupLevel), collapsed), "".concat(baseClassName, "-item-collapsed-show-title"), (menu === null || menu === void 0 ? void 0 : menu.collapsedShowTitle) && collapsed)),
      children: [(0, import_jsx_runtime47.jsx)("span", {
        className: "".concat(baseClassName, "-item-icon ").concat((_this$props11 = _this.props) === null || _this$props11 === void 0 ? void 0 : _this$props11.hashId).trim(),
        style: {
          display: defaultIcon === null && !icon ? "none" : ""
        },
        children: icon || (0, import_jsx_runtime47.jsx)("span", {
          className: "anticon",
          children: defaultIcon
        })
      }), (0, import_jsx_runtime47.jsx)("span", {
        className: (0, import_classnames13.default)("".concat(baseClassName, "-item-text"), (_this$props12 = _this.props) === null || _this$props12 === void 0 ? void 0 : _this$props12.hashId, _defineProperty({}, "".concat(baseClassName, "-item-text-has-icon"), hasIcon && (icon || defaultIcon))),
        children: menuItemTitle
      })]
    }, itemPath);
    var isHttpUrl = isUrl(itemPath);
    if (isHttpUrl) {
      var _this$props13, _this$props14, _this$props15;
      defaultItem = (0, import_jsx_runtime48.jsxs)("span", {
        onClick: function onClick() {
          var _window, _window$open;
          (_window = window) === null || _window === void 0 || (_window$open = _window.open) === null || _window$open === void 0 || _window$open.call(_window, itemPath, "_blank");
        },
        className: (0, import_classnames13.default)("".concat(baseClassName, "-item-title"), (_this$props13 = _this.props) === null || _this$props13 === void 0 ? void 0 : _this$props13.hashId, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(baseClassName, "-item-title-collapsed"), collapsed), "".concat(baseClassName, "-item-title-collapsed-level-").concat(noGroupLevel), collapsed), "".concat(baseClassName, "-item-link"), true), "".concat(baseClassName, "-item-collapsed-show-title"), (menu === null || menu === void 0 ? void 0 : menu.collapsedShowTitle) && collapsed)),
        children: [(0, import_jsx_runtime47.jsx)("span", {
          className: "".concat(baseClassName, "-item-icon ").concat((_this$props14 = _this.props) === null || _this$props14 === void 0 ? void 0 : _this$props14.hashId).trim(),
          style: {
            display: defaultIcon === null && !icon ? "none" : ""
          },
          children: icon || (0, import_jsx_runtime47.jsx)("span", {
            className: "anticon",
            children: defaultIcon
          })
        }), (0, import_jsx_runtime47.jsx)("span", {
          className: (0, import_classnames13.default)("".concat(baseClassName, "-item-text"), (_this$props15 = _this.props) === null || _this$props15 === void 0 ? void 0 : _this$props15.hashId, _defineProperty({}, "".concat(baseClassName, "-item-text-has-icon"), hasIcon && (icon || defaultIcon))),
          children: menuItemTitle
        })]
      }, itemPath);
    }
    if (menuItemRender) {
      var renderItemProps = _objectSpread2(_objectSpread2({}, item), {}, {
        isUrl: isHttpUrl,
        itemPath,
        isMobile,
        replace: itemPath === location2.pathname,
        onClick: function onClick() {
          return onCollapse && onCollapse(true);
        },
        children: void 0
      });
      return level === 0 ? (0, import_jsx_runtime47.jsx)(MenuItemTooltip, {
        collapsed,
        title: menuItemTitle,
        disable: item.disabledTooltip,
        children: menuItemRender(renderItemProps, defaultItem, _this.props)
      }) : menuItemRender(renderItemProps, defaultItem, _this.props);
    }
    return level === 0 ? (0, import_jsx_runtime47.jsx)(MenuItemTooltip, {
      collapsed,
      title: menuItemTitle,
      disable: item.disabledTooltip,
      children: defaultItem
    }) : defaultItem;
  });
  _defineProperty(this, "conversionPath", function(path) {
    if (path && path.indexOf("http") === 0) {
      return path;
    }
    return "/".concat(path || "").replace(/\/+/g, "/");
  });
  this.props = props;
});

// node_modules/@ant-design/pro-layout/es/components/SiderMenu/style/stylish.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/SiderMenu/SiderMenu.js
var import_jsx_runtime49 = __toESM(require_jsx_runtime());
var import_jsx_runtime50 = __toESM(require_jsx_runtime());
var import_jsx_runtime51 = __toESM(require_jsx_runtime());
var import_react52 = __toESM(require_react());
var _SafetyWarningProvider = import_react51.default.memo(function(props) {
  if (true) {
    console.warn("[pro-layout] SiderMenu required antd@^4.24.15 || antd@^5.11.2 for access the menu context, please upgrade your antd version (current ".concat(version_default, ")."));
  }
  return (0, import_jsx_runtime50.jsx)(import_jsx_runtime49.Fragment, {
    children: props.children
  });
});
var Sider = layout_default.Sider;
var _Layout$_InternalSide = layout_default._InternalSiderContext;

// node_modules/@ant-design/pro-layout/es/components/TopNavHeader/index.js
init_defineProperty();
var import_classnames16 = __toESM(require_classnames());
var import_react55 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/GlobalHeader/ActionsContent.js
init_defineProperty();
var import_classnames15 = __toESM(require_classnames());
var import_react53 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/GlobalHeader/rightContentStyle.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/GlobalHeader/ActionsContent.js
var import_react54 = __toESM(require_react());
var import_jsx_runtime52 = __toESM(require_jsx_runtime());
var import_jsx_runtime53 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/TopNavHeader/style.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/TopNavHeader/index.js
var import_jsx_runtime54 = __toESM(require_jsx_runtime());
var import_jsx_runtime55 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/GlobalHeader/style.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/GlobalHeader/index.js
var import_jsx_runtime56 = __toESM(require_jsx_runtime());
var import_jsx_runtime57 = __toESM(require_jsx_runtime());
var import_jsx_runtime58 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/Header/style/header.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/Header/style/stylish.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/Header/index.js
var import_jsx_runtime59 = __toESM(require_jsx_runtime());
var import_jsx_runtime60 = __toESM(require_jsx_runtime());
var import_jsx_runtime61 = __toESM(require_jsx_runtime());
var Header = layout_default.Header;

// node_modules/@umijs/use-params/es/index.js
var import_react58 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/SettingDrawer/index.js
var import_react63 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/locales/en-US/settingDrawer.js
var settingDrawer_default = {
  "app.setting.pagestyle": "Page style setting",
  "app.setting.pagestyle.dark": "Dark Menu style",
  "app.setting.pagestyle.light": "Light Menu style",
  "app.setting.pagestyle.realdark": "Dark style (Beta)",
  "app.setting.content-width": "Content Width",
  "app.setting.content-width.fixed": "Fixed",
  "app.setting.content-width.fluid": "Fluid",
  "app.setting.themecolor": "Theme Color",
  "app.setting.themecolor.dust": "Dust Red",
  "app.setting.themecolor.volcano": "Volcano",
  "app.setting.themecolor.sunset": "Sunset Orange",
  "app.setting.themecolor.cyan": "Cyan",
  "app.setting.themecolor.green": "Polar Green",
  "app.setting.themecolor.techBlue": "Tech Blue (default)",
  "app.setting.themecolor.daybreak": "Daybreak Blue",
  "app.setting.themecolor.geekblue": "Geek Blue",
  "app.setting.themecolor.purple": "Golden Purple",
  "app.setting.sidermenutype": "SideMenu Type",
  "app.setting.sidermenutype-sub": "Classic",
  "app.setting.sidermenutype-group": "Grouping",
  "app.setting.navigationmode": "Navigation Mode",
  "app.setting.regionalsettings": "Regional Settings",
  "app.setting.regionalsettings.header": "Header",
  "app.setting.regionalsettings.menu": "Menu",
  "app.setting.regionalsettings.footer": "Footer",
  "app.setting.regionalsettings.menuHeader": "Menu Header",
  "app.setting.sidemenu": "Side Menu Layout",
  "app.setting.topmenu": "Top Menu Layout",
  "app.setting.mixmenu": "Mix Menu Layout",
  "app.setting.splitMenus": "Split Menus",
  "app.setting.fixedheader": "Fixed Header",
  "app.setting.fixedsidebar": "Fixed Sidebar",
  "app.setting.fixedsidebar.hint": "Works on Side Menu Layout",
  "app.setting.hideheader": "Hidden Header when scrolling",
  "app.setting.hideheader.hint": "Works when Hidden Header is enabled",
  "app.setting.othersettings": "Other Settings",
  "app.setting.weakmode": "Weak Mode",
  "app.setting.copy": "Copy Setting",
  "app.setting.loading": "Loading theme",
  "app.setting.copyinfo": "copy success，please replace defaultSettings in src/models/setting.js",
  "app.setting.production.hint": "Setting panel shows in development environment only, please manually modify"
};

// node_modules/@ant-design/pro-layout/es/locales/en-US.js
var en_US_default2 = _objectSpread2({}, settingDrawer_default);

// node_modules/@ant-design/pro-layout/es/locales/it-IT/settingDrawer.js
var settingDrawer_default2 = {
  "app.setting.pagestyle": "Impostazioni di stile",
  "app.setting.pagestyle.dark": "Tema scuro",
  "app.setting.pagestyle.light": "Tema chiaro",
  "app.setting.content-width": "Largezza contenuto",
  "app.setting.content-width.fixed": "Fissa",
  "app.setting.content-width.fluid": "Fluida",
  "app.setting.themecolor": "Colore del tema",
  "app.setting.themecolor.dust": "Rosso polvere",
  "app.setting.themecolor.volcano": "Vulcano",
  "app.setting.themecolor.sunset": "Arancione tramonto",
  "app.setting.themecolor.cyan": "Ciano",
  "app.setting.themecolor.green": "Verde polare",
  "app.setting.themecolor.techBlue": "Tech Blu (default)",
  "app.setting.themecolor.daybreak": "Blu cielo mattutino",
  "app.setting.themecolor.geekblue": "Blu geek",
  "app.setting.themecolor.purple": "Viola dorato",
  "app.setting.navigationmode": "Modalità di navigazione",
  "app.setting.sidemenu": "Menu laterale",
  "app.setting.topmenu": "Menu in testata",
  "app.setting.mixmenu": "Menu misto",
  "app.setting.splitMenus": "Menu divisi",
  "app.setting.fixedheader": "Testata fissa",
  "app.setting.fixedsidebar": "Menu laterale fisso",
  "app.setting.fixedsidebar.hint": "Solo se selezionato Menu laterale",
  "app.setting.hideheader": "Nascondi testata durante lo scorrimento",
  "app.setting.hideheader.hint": "Solo se abilitato Nascondi testata durante lo scorrimento",
  "app.setting.othersettings": "Altre impostazioni",
  "app.setting.weakmode": "Inverti colori",
  "app.setting.copy": "Copia impostazioni",
  "app.setting.loading": "Carico tema...",
  "app.setting.copyinfo": "Impostazioni copiate con successo! Incolla il contenuto in config/defaultSettings.js",
  "app.setting.production.hint": "Questo pannello è visibile solo durante lo sviluppo. Le impostazioni devono poi essere modificate manulamente"
};

// node_modules/@ant-design/pro-layout/es/locales/it-IT.js
var it_IT_default2 = _objectSpread2({}, settingDrawer_default2);

// node_modules/@ant-design/pro-layout/es/locales/ko-KR/settingDrawer.js
var settingDrawer_default3 = {
  "app.setting.pagestyle": "스타일 설정",
  "app.setting.pagestyle.dark": "다크 모드",
  "app.setting.pagestyle.light": "라이트 모드",
  "app.setting.content-width": "컨텐츠 너비",
  "app.setting.content-width.fixed": "고정",
  "app.setting.content-width.fluid": "흐름",
  "app.setting.themecolor": "테마 색상",
  "app.setting.themecolor.dust": "Dust Red",
  "app.setting.themecolor.volcano": "Volcano",
  "app.setting.themecolor.sunset": "Sunset Orange",
  "app.setting.themecolor.cyan": "Cyan",
  "app.setting.themecolor.green": "Polar Green",
  "app.setting.themecolor.techBlue": "Tech Blu (default)",
  "app.setting.themecolor.daybreak": "Daybreak Blue",
  "app.setting.themecolor.geekblue": "Geek Blue",
  "app.setting.themecolor.purple": "Golden Purple",
  "app.setting.navigationmode": "네비게이션 모드",
  "app.setting.regionalsettings": "영역별 설정",
  "app.setting.regionalsettings.header": "헤더",
  "app.setting.regionalsettings.menu": "메뉴",
  "app.setting.regionalsettings.footer": "바닥글",
  "app.setting.regionalsettings.menuHeader": "메뉴 헤더",
  "app.setting.sidemenu": "메뉴 사이드 배치",
  "app.setting.topmenu": "메뉴 상단 배치",
  "app.setting.mixmenu": "혼합형 배치",
  "app.setting.splitMenus": "메뉴 분리",
  "app.setting.fixedheader": "헤더 고정",
  "app.setting.fixedsidebar": "사이드바 고정",
  "app.setting.fixedsidebar.hint": "'메뉴 사이드 배치'를 선택했을 때 동작함",
  "app.setting.hideheader": "스크롤 중 헤더 감추기",
  "app.setting.hideheader.hint": "'헤더 감추기 옵션'을 선택했을 때 동작함",
  "app.setting.othersettings": "다른 설정",
  "app.setting.weakmode": "고대비 모드",
  "app.setting.copy": "설정값 복사",
  "app.setting.loading": "테마 로딩 중",
  "app.setting.copyinfo": "복사 성공. src/models/settings.js에 있는 defaultSettings를 교체해 주세요.",
  "app.setting.production.hint": "설정 판넬은 개발 환경에서만 보여집니다. 직접 수동으로 변경바랍니다."
};

// node_modules/@ant-design/pro-layout/es/locales/ko-KR.js
var ko_KR_default2 = _objectSpread2({}, settingDrawer_default3);

// node_modules/@ant-design/pro-layout/es/locales/zh-CN/settingDrawer.js
var settingDrawer_default4 = {
  "app.setting.pagestyle": "整体风格设置",
  "app.setting.pagestyle.dark": "暗色菜单风格",
  "app.setting.pagestyle.light": "亮色菜单风格",
  "app.setting.pagestyle.realdark": "暗色风格(实验功能)",
  "app.setting.content-width": "内容区域宽度",
  "app.setting.content-width.fixed": "定宽",
  "app.setting.content-width.fluid": "流式",
  "app.setting.themecolor": "主题色",
  "app.setting.themecolor.dust": "薄暮",
  "app.setting.themecolor.volcano": "火山",
  "app.setting.themecolor.sunset": "日暮",
  "app.setting.themecolor.cyan": "明青",
  "app.setting.themecolor.green": "极光绿",
  "app.setting.themecolor.techBlue": "科技蓝（默认）",
  "app.setting.themecolor.daybreak": "拂晓",
  "app.setting.themecolor.geekblue": "极客蓝",
  "app.setting.themecolor.purple": "酱紫",
  "app.setting.navigationmode": "导航模式",
  "app.setting.sidermenutype": "侧边菜单类型",
  "app.setting.sidermenutype-sub": "经典模式",
  "app.setting.sidermenutype-group": "分组模式",
  "app.setting.regionalsettings": "内容区域",
  "app.setting.regionalsettings.header": "顶栏",
  "app.setting.regionalsettings.menu": "菜单",
  "app.setting.regionalsettings.footer": "页脚",
  "app.setting.regionalsettings.menuHeader": "菜单头",
  "app.setting.sidemenu": "侧边菜单布局",
  "app.setting.topmenu": "顶部菜单布局",
  "app.setting.mixmenu": "混合菜单布局",
  "app.setting.splitMenus": "自动分割菜单",
  "app.setting.fixedheader": "固定 Header",
  "app.setting.fixedsidebar": "固定侧边菜单",
  "app.setting.fixedsidebar.hint": "侧边菜单布局时可配置",
  "app.setting.hideheader": "下滑时隐藏 Header",
  "app.setting.hideheader.hint": "固定 Header 时可配置",
  "app.setting.othersettings": "其他设置",
  "app.setting.weakmode": "色弱模式",
  "app.setting.copy": "拷贝设置",
  "app.setting.loading": "正在加载主题",
  "app.setting.copyinfo": "拷贝成功，请到 src/defaultSettings.js 中替换默认配置",
  "app.setting.production.hint": "配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件"
};

// node_modules/@ant-design/pro-layout/es/locales/zh-CN.js
var zh_CN_default8 = _objectSpread2({}, settingDrawer_default4);

// node_modules/@ant-design/pro-layout/es/locales/zh-TW/settingDrawer.js
var settingDrawer_default5 = {
  "app.setting.pagestyle": "整體風格設置",
  "app.setting.pagestyle.dark": "暗色菜單風格",
  "app.setting.pagestyle.realdark": "暗色風格(实验功能)",
  "app.setting.pagestyle.light": "亮色菜單風格",
  "app.setting.content-width": "內容區域寬度",
  "app.setting.content-width.fixed": "定寬",
  "app.setting.content-width.fluid": "流式",
  "app.setting.themecolor": "主題色",
  "app.setting.themecolor.dust": "薄暮",
  "app.setting.themecolor.volcano": "火山",
  "app.setting.themecolor.sunset": "日暮",
  "app.setting.themecolor.cyan": "明青",
  "app.setting.themecolor.green": "極光綠",
  "app.setting.themecolor.techBlue": "科技蓝（默認）",
  "app.setting.themecolor.daybreak": "拂曉藍",
  "app.setting.themecolor.geekblue": "極客藍",
  "app.setting.themecolor.purple": "醬紫",
  "app.setting.navigationmode": "導航模式",
  "app.setting.sidemenu": "側邊菜單布局",
  "app.setting.topmenu": "頂部菜單布局",
  "app.setting.mixmenu": "混合菜單布局",
  "app.setting.splitMenus": "自动分割菜单",
  "app.setting.fixedheader": "固定 Header",
  "app.setting.fixedsidebar": "固定側邊菜單",
  "app.setting.fixedsidebar.hint": "側邊菜單布局時可配置",
  "app.setting.hideheader": "下滑時隱藏 Header",
  "app.setting.hideheader.hint": "固定 Header 時可配置",
  "app.setting.othersettings": "其他設置",
  "app.setting.weakmode": "色弱模式",
  "app.setting.copy": "拷貝設置",
  "app.setting.loading": "正在加載主題",
  "app.setting.copyinfo": "拷貝成功，請到 src/defaultSettings.js 中替換默認配置",
  "app.setting.production.hint": "配置欄只在開發環境用於預覽，生產環境不會展現，請拷貝後手動修改配置文件"
};

// node_modules/@ant-design/pro-layout/es/locales/zh-TW.js
var zh_TW_default2 = _objectSpread2({}, settingDrawer_default5);

// node_modules/@ant-design/pro-layout/es/components/SettingDrawer/BlockCheckbox.js
var import_classnames19 = __toESM(require_classnames());
var import_react59 = __toESM(require_react());
var import_jsx_runtime62 = __toESM(require_jsx_runtime());
var import_jsx_runtime63 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/SettingDrawer/LayoutChange.js
var import_react60 = __toESM(require_react());
var import_jsx_runtime64 = __toESM(require_jsx_runtime());
var import_jsx_runtime65 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/SettingDrawer/RegionalChange.js
var import_react61 = __toESM(require_react());
var import_jsx_runtime66 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/SettingDrawer/ThemeColor.js
var import_react62 = __toESM(require_react());
var import_jsx_runtime67 = __toESM(require_jsx_runtime());
var _excluded = ["color", "check"];
var Tag = import_react62.default.forwardRef(function(_ref, ref) {
  var color = _ref.color, check = _ref.check, rest = _objectWithoutProperties(_ref, _excluded);
  return (0, import_jsx_runtime67.jsx)("div", _objectSpread2(_objectSpread2({}, rest), {}, {
    style: {
      backgroundColor: color
    },
    ref,
    children: check ? (0, import_jsx_runtime67.jsx)(CheckOutlined_default, {}) : ""
  }));
});

// node_modules/@ant-design/pro-layout/es/components/SettingDrawer/icon/group.js
var import_jsx_runtime68 = __toESM(require_jsx_runtime());
var import_jsx_runtime69 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/SettingDrawer/icon/sub.js
var import_jsx_runtime70 = __toESM(require_jsx_runtime());
var import_jsx_runtime71 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/SettingDrawer/style/index.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/components/SettingDrawer/index.js
var import_jsx_runtime72 = __toESM(require_jsx_runtime());
var import_jsx_runtime73 = __toESM(require_jsx_runtime());
var import_jsx_runtime74 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/getPageTitle.js
var import_path_to_regexp = __toESM(require_dist2());

// node_modules/@ant-design/pro-layout/es/ProLayout.js
init_defineProperty();

// node_modules/@umijs/route-utils/es/transformRoute/transformRoute.js
var import_path_to_regexp2 = __toESM(require_path_to_regexp());
function _typeof2(obj) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof2(obj);
}
function _slicedToArray2(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e3;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e3 = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e3;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _createForOfIteratorHelper2(o3, allowArrayLike) {
  var it2 = typeof Symbol !== "undefined" && o3[Symbol.iterator] || o3["@@iterator"];
  if (!it2) {
    if (Array.isArray(o3) || (it2 = _unsupportedIterableToArray(o3)) || allowArrayLike && o3 && typeof o3.length === "number") {
      if (it2) o3 = it2;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n2() {
        if (i >= o3.length) return { done: true };
        return { done: false, value: o3[i++] };
      }, e: function e2(_e22) {
        throw _e22;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it2 = it2.call(o3);
  }, n: function n2() {
    var step = it2.next();
    normalCompletion = step.done;
    return step;
  }, e: function e2(_e3) {
    didErr = true;
    err = _e3;
  }, f: function f() {
    try {
      if (!normalCompletion && it2.return != null) it2.return();
    } finally {
      if (didErr) throw err;
    }
  } };
}
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _createSuper2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized2(self2);
}
function _assertThisInitialized2(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2)) return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2) _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o3, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o4, p2) {
    o4.__proto__ = p2;
    return o4;
  };
  return _setPrototypeOf(o3, p);
}
function _getPrototypeOf(o3) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o4) {
    return o4.__proto__ || Object.getPrototypeOf(o4);
  };
  return _getPrototypeOf(o3);
}
function _unsupportedIterableToArray(o3, minLen) {
  if (!o3) return;
  if (typeof o3 === "string") return _arrayLikeToArray(o3, minLen);
  var n2 = Object.prototype.toString.call(o3).slice(8, -1);
  if (n2 === "Object" && o3.constructor) n2 = o3.constructor.name;
  if (n2 === "Map" || n2 === "Set") return Array.from(o3);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray(o3, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function stripQueryStringAndHashFromPath(url) {
  return url.split("?")[0].split("#")[0];
}
var isUrl3 = function isUrl4(path) {
  if (!path.startsWith("http")) {
    return false;
  }
  try {
    var url = new URL(path);
    return !!url;
  } catch (error) {
    return false;
  }
};
var RouteListMap = function(_Map) {
  _inherits2(RouteListMap2, _Map);
  var _super = _createSuper2(RouteListMap2);
  function RouteListMap2() {
    _classCallCheck2(this, RouteListMap2);
    return _super.apply(this, arguments);
  }
  _createClass2(RouteListMap2, [{
    key: "get",
    value: function get2(pathname) {
      var routeValue;
      try {
        var _iterator = _createForOfIteratorHelper2(this.entries()), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray2(_step.value, 2), key = _step$value[0], value = _step$value[1];
            var path = stripQueryStringAndHashFromPath(key);
            if (!isUrl3(key) && (0, import_path_to_regexp2.pathToRegexp)(path, []).test(pathname)) {
              routeValue = value;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } catch (error) {
        routeValue = void 0;
      }
      return routeValue;
    }
  }]);
  return RouteListMap2;
}(_wrapNativeSuper(Map));

// node_modules/@umijs/route-utils/es/getMatchMenu/getMatchMenu.js
var import_path_to_regexp3 = __toESM(require_path_to_regexp());

// node_modules/@ant-design/pro-layout/es/ProLayout.js
var import_classnames22 = __toESM(require_classnames());
var import_react67 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/WrapContent.js
init_defineProperty();
var import_classnames20 = __toESM(require_classnames());
var import_react64 = __toESM(require_react());
var import_jsx_runtime75 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/assert/Logo.js
var import_jsx_runtime76 = __toESM(require_jsx_runtime());
var import_jsx_runtime77 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/SiderMenu/index.js
var import_classnames21 = __toESM(require_classnames());
var import_react65 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/SiderMenu/style/index.js
init_defineProperty();
var proLayoutTitleHide = new Keyframes_default("antBadgeLoadingCircle", {
  "0%": {
    display: "none",
    opacity: 0,
    overflow: "hidden"
  },
  "80%": {
    overflow: "hidden"
  },
  "100%": {
    display: "unset",
    opacity: 1
  }
});

// node_modules/@ant-design/pro-layout/es/components/SiderMenu/index.js
var import_jsx_runtime78 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/style/index.js
init_defineProperty();

// node_modules/@ant-design/pro-layout/es/utils/getBreadcrumbProps.js
var import_path_to_regexp4 = __toESM(require_dist2());
var import_jsx_runtime79 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/utils/useCurrentMenuLayoutProps.js
init_typeof();
var import_react66 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/ProLayout.js
var import_jsx_runtime80 = __toESM(require_jsx_runtime());
var import_jsx_runtime81 = __toESM(require_jsx_runtime());
var import_jsx_runtime82 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/Help/index.js
var import_react75 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/Help/HelpProvide.js
var import_react68 = __toESM(require_react());
var ProHelpProvide = import_react68.default.createContext({
  dataSource: [],
  valueTypeMap: /* @__PURE__ */ new Map()
});

// node_modules/@ant-design/pro-layout/es/components/Help/Search.js
init_defineProperty();
var import_classnames23 = __toESM(require_classnames());
var import_react69 = __toESM(require_react());
var import_jsx_runtime83 = __toESM(require_jsx_runtime());
var import_jsx_runtime84 = __toESM(require_jsx_runtime());
var import_jsx_runtime85 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/Help/index.js
var import_jsx_runtime95 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/Help/ProHelpContentPanel.js
var import_classnames24 = __toESM(require_classnames());
var import_react73 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/Help/AsyncContentPanel.js
var import_react72 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/Help/RenderContentPanel.js
var import_react71 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/Help/ProHelpPanel.js
var import_react70 = __toESM(require_react());

// node_modules/@ant-design/pro-layout/es/components/Help/style.js
init_defineProperty();
var actionsInputAnimal = new Keyframes_default("actionsInputAnimal", {
  "0%": {
    width: "0px"
  },
  "30%": {
    width: "20px"
  },
  "100%": {
    width: "120px"
  }
});

// node_modules/@ant-design/pro-layout/es/components/Help/ProHelpPanel.js
var import_jsx_runtime86 = __toESM(require_jsx_runtime());
var import_jsx_runtime87 = __toESM(require_jsx_runtime());
var import_jsx_runtime88 = __toESM(require_jsx_runtime());
var SelectKeyProvide = import_react70.default.createContext({
  selectedKey: void 0,
  setSelectedKey: function setSelectedKey() {
  }
});

// node_modules/@ant-design/pro-layout/es/components/Help/RenderContentPanel.js
var import_jsx_runtime89 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/Help/AsyncContentPanel.js
var import_jsx_runtime90 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/Help/ProHelpContentPanel.js
var import_jsx_runtime91 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/Help/ProHelpDrawer.js
var import_jsx_runtime92 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/Help/ProHelpModal.js
var import_jsx_runtime93 = __toESM(require_jsx_runtime());

// node_modules/@ant-design/pro-layout/es/components/Help/ProHelpPopover.js
var import_classnames25 = __toESM(require_classnames());
var import_react74 = __toESM(require_react());
var import_jsx_runtime94 = __toESM(require_jsx_runtime());

// node_modules/@refinedev/antd/dist/index.mjs
var import_react136 = __toESM(require_react(), 1);
var import_dayjs7 = __toESM(require_dayjs_min(), 1);
var rr = Object.defineProperty;
var o2 = (e2, t) => rr(e2, "name", { value: t, configurable: true });
var he2 = o2(({ action: e2, resource: t, onMutationSuccess: r, onMutationError: s, autoSave: n2, submitOnEnter: i = false, warnWhenUnsavedChanges: a, redirect: p, successNotification: l, errorNotification: m, meta: u, metaData: d, queryMeta: y, mutationMeta: T, liveMode: h, liveParams: c, mutationMode: g, dataProviderName: b, onLiveEvent: C, invalidates: v, undoableTimeout: P, queryOptions: B, createMutationOptions: k, updateMutationOptions: F, id: D, overtimeOptions: L, optimisticUpdateMap: f, defaultFormValues: R, disableServerSideValidation: W = false } = {}) => {
  var _, fe;
  let { options: H } = ge(), x = (H == null ? void 0 : H.disableServerSideValidation) || W, q2 = z(), [$] = form_default.useForm(), A = useForm({ form: $, defaultFormValues: R }), { form: w } = A, G = RP({ onMutationSuccess: r || void 0, onMutationError: async (Z, ee, le) => {
    if (x) {
      s == null || s(Z, ee, le);
      return;
    }
    let ie2 = [], de = w.getFieldsValue();
    ie2 = Object.keys(Cr(de)).map((ce) => ({ name: Ts(ce), errors: void 0 })), w.setFields(ie2);
    let me = Z == null ? void 0 : Z.errors;
    for (let ce in me) {
      let ne = me[ce], Te2 = [];
      Array.isArray(ne) && (Te2 = ne), typeof ne == "string" && (Te2 = [ne]), typeof ne == "boolean" && ne && (Te2 = ["Field is not valid."]), typeof ne == "object" && "key" in ne && (Te2 = [q2(ne.key, ne.message)]), ie2.push({ name: Ts(ce), errors: Te2 });
    }
    w.setFields([...ie2]), s == null || s(Z, ee, le);
  }, redirect: p, action: e2, resource: t, successNotification: l, errorNotification: m, meta: I(u, d), metaData: I(u, d), queryMeta: y, mutationMeta: T, liveMode: h, liveParams: c, mutationMode: g, dataProviderName: b, onLiveEvent: C, invalidates: v, undoableTimeout: P, queryOptions: B, createMutationOptions: k, updateMutationOptions: F, id: D, overtimeOptions: L, optimisticUpdateMap: f, autoSave: n2 }), { formLoading: S, onFinish: O, query: M, id: Y, onFinishAutoSave: N } = G, { warnWhenUnsavedChanges: z2, setWarnWhen: I2 } = vt(), E = a ?? z2;
  import_react76.default.useEffect(() => {
    w.resetFields();
  }, [(_ = M == null ? void 0 : M.data) == null ? void 0 : _.data, Y]);
  let J = o2((Z) => {
    i && Z.key === "Enter" && w.submit();
  }, "onKeyUp"), X = o2((Z, ee) => {
    if (Z && E && I2(true), n2 != null && n2.enabled) {
      I2(false);
      let le = (n2 == null ? void 0 : n2.onFinish) ?? ((ie2) => ie2);
      return N(le(ee)).catch((ie2) => ie2);
    }
    return Z;
  }, "onValuesChange"), se = { disabled: S, onClick: () => {
    w.submit();
  } };
  return { form: A.form, formProps: { ...A.formProps, onFinish: (Z) => O(Z).catch((ee) => ee), onKeyUp: J, onValuesChange: X, initialValues: (fe = M == null ? void 0 : M.data) == null ? void 0 : fe.data }, saveButtonProps: se, defaultFormValuesLoading: A.defaultFormValuesLoading, ...G, onFinish: async (Z) => await O(Z ?? A.form.getFieldsValue(true)) };
}, "useForm");
var to2 = o2(({ modalProps: e2 = {} } = {}) => {
  let { show: t, close: r, visible: s } = TR({ defaultVisible: e2.open });
  return { modalProps: { ...e2, onCancel: (n2) => {
    var i;
    (i = e2.onCancel) == null || i.call(e2, n2), r();
  }, open: s, visible: s }, show: t, close: r };
}, "useModal");
var ro = o2(({ syncWithLocation: e2, defaultVisible: t = false, autoSubmitClose: r = true, autoResetForm: s = true, autoSave: n2, invalidates: i, ...a }) => {
  var z2, I2;
  let [p, l] = import_react77.default.useState(false), m = Ae(), { resource: u, action: d, identifier: y } = q(a.resource), T = Te(), h = Pe(), c = ht(), g = a.action ?? d ?? "", b = !(typeof e2 == "object" && (e2 == null ? void 0 : e2.syncId) === false), C = typeof e2 == "object" && "key" in e2 ? e2.key : u && g && e2 ? `modal-${y}-${g}` : void 0, v = he2({ meta: { ...C ? { [C]: void 0 } : {}, ...a.meta }, autoSave: n2, invalidates: i, ...a }), { form: P, formProps: B, id: k, setId: F, formLoading: D, onFinish: L, autoSaveProps: f } = v, R = z(), { warnWhen: W, setWarnWhen: H } = vt(), { show: x, close: q2, modalProps: $ } = to2({ modalProps: { open: t } }), A = $.open || false, w = { modalProps: $, form: P, formLoading: D, formProps: B, formResult: void 0, formValues: P.getFieldsValue, defaultFormValuesLoading: false, initialValues: {}, submit: L, close: q2, open: $.open || false, show: x, visible: A };
  import_react77.default.useEffect(() => {
    var E, J, X, se;
    if (p === false && C) {
      let _ = (J = (E = T == null ? void 0 : T.params) == null ? void 0 : E[C]) == null ? void 0 : J.open;
      if (typeof _ == "boolean" ? _ && x() : typeof _ == "string" && _ === "true" && x(), b) {
        let fe = (se = (X = T == null ? void 0 : T.params) == null ? void 0 : X[C]) == null ? void 0 : se.id;
        fe && (F == null || F(fe));
      }
      l(true);
    }
  }, [C, T, b, F]), import_react77.default.useEffect(() => {
    var E;
    p === true && (A && C ? h({ query: { [C]: { ...(E = T == null ? void 0 : T.params) == null ? void 0 : E[C], open: true, ...b && k && { id: k } } }, options: { keepQuery: true }, type: "replace" }) : C && !A && h({ query: { [C]: void 0 }, options: { keepQuery: true }, type: "replace" }));
  }, [k, A, x, C, b]);
  let G = { disabled: D, loading: D, onClick: () => {
    P.submit();
  } }, S = (0, import_react77.useCallback)(() => {
    if (f.status === "success" && (n2 != null && n2.invalidateOnClose) && m({ id: k, invalidates: i || ["list", "many", "detail"], dataProviderName: a.dataProviderName, resource: y }), W) if (window.confirm(R("warnWhenUnsavedChanges", "Are you sure you want to leave? You have unsaved changes."))) H(false);
    else return;
    F == null || F(void 0), w.close();
  }, [W, f.status]), O = (0, import_react77.useCallback)((E) => {
    typeof E < "u" && (F == null || F(E)), (!(g === "edit" || g === "clone") || (typeof E < "u" || typeof k < "u")) && w.show();
  }, [k]), { visible: M, ...Y } = $, N = { open: M, ...Y };
  return { ...v, ...w, show: O, close: S, open: A, formProps: { ...B, ...v.formProps, onValuesChange: B == null ? void 0 : B.onValuesChange, onKeyUp: B == null ? void 0 : B.onKeyUp, onFinish: async (E) => {
    await L(E), r && q2(), s && P.resetFields();
  } }, modalProps: { ...N, width: "1000px", okButtonProps: G, title: R(`${y}.titles.${a.action}`, `${c(`${a.action} ${((z2 = u == null ? void 0 : u.meta) == null ? void 0 : z2.label) ?? ((I2 = u == null ? void 0 : u.options) == null ? void 0 : I2.label) ?? (u == null ? void 0 : u.label) ?? y}`, "singular")}`), okText: R("buttons.save", "Save"), cancelText: R("buttons.cancel", "Cancel"), onCancel: S, forceRender: true }, formLoading: D };
}, "useModalForm");
var no2 = o2(({ syncWithLocation: e2, defaultVisible: t = false, autoSubmitClose: r = true, autoResetForm: s = true, autoSave: n2, invalidates: i, ...a }) => {
  let p = Ae(), [l, m] = import_react78.default.useState(false), { visible: u, show: d, close: y } = TR({ defaultVisible: t }), { resource: T, action: h, identifier: c } = q(a.resource), g = Te(), b = Pe(), C = a.action ?? h ?? "", v = !(typeof e2 == "object" && (e2 == null ? void 0 : e2.syncId) === false), P = typeof e2 == "object" && "key" in e2 ? e2.key : T && C && e2 ? `drawer-${(T == null ? void 0 : T.identifier) ?? (T == null ? void 0 : T.name)}-${C}` : void 0, B = he2({ meta: { ...P ? { [P]: void 0 } : {}, ...a.meta }, autoSave: n2, invalidates: i, ...a }), { form: k, formProps: F, formLoading: D, id: L, setId: f, onFinish: R, autoSaveProps: W } = B;
  import_react78.default.useEffect(() => {
    var S, O, M, Y;
    if (l === false && P) {
      let N = (O = (S = g == null ? void 0 : g.params) == null ? void 0 : S[P]) == null ? void 0 : O.open;
      if (typeof N == "boolean" ? N ? d() : y() : typeof N == "string" && N === "true" && d(), v) {
        let z2 = (Y = (M = g == null ? void 0 : g.params) == null ? void 0 : M[P]) == null ? void 0 : Y.id;
        z2 && (f == null || f(z2));
      }
      m(true);
    }
  }, [P, g, v, f, l]), import_react78.default.useEffect(() => {
    var S;
    l === true && (u && P ? b({ query: { [P]: { ...(S = g == null ? void 0 : g.params) == null ? void 0 : S[P], open: true, ...v && L && { id: L } } }, options: { keepQuery: true }, type: "replace" }) : P && !u && b({ query: { [P]: void 0 }, options: { keepQuery: true }, type: "replace" }));
  }, [L, u, d, y, P, v, l]);
  let H = z(), { warnWhen: x, setWarnWhen: q2 } = vt(), $ = { disabled: D, onClick: () => {
    k.submit();
  }, loading: D }, A = { recordItemId: L, onSuccess: () => {
    f == null || f(void 0), y();
  } }, w = (0, import_react78.useCallback)(() => {
    if (W.status === "success" && (n2 != null && n2.invalidateOnClose) && p({ id: L, invalidates: i || ["list", "many", "detail"], dataProviderName: a.dataProviderName, resource: c }), x) if (window.confirm(H("warnWhenUnsavedChanges", "Are you sure you want to leave? You have unsaved changes."))) q2(false);
    else return;
    y(), f == null || f(void 0);
  }, [x]), G = (0, import_react78.useCallback)((S) => {
    typeof S < "u" && (f == null || f(S)), (!(C === "edit" || C === "clone") || (typeof S < "u" || typeof L < "u")) && d();
  }, [L]);
  return { ...B, show: G, close: w, formProps: { form: k, ...B.formProps, onValuesChange: F == null ? void 0 : F.onValuesChange, onKeyUp: F == null ? void 0 : F.onKeyUp, onFinish: async (S) => {
    await R(S), r && y(), s && k.resetFields();
  } }, drawerProps: { width: "500px", onClose: w, open: u, forceRender: true }, saveButtonProps: $, deleteButtonProps: A, formLoading: D };
}, "useDrawerForm");
var ao = o2((e2 = {}) => {
  let t = he2({ ...e2 }), { form: r, formProps: s } = t, n2 = useStepsForm({ isBackValidate: false, form: r, submit: (i) => {
    var a;
    (a = s == null ? void 0 : s.onFinish) == null || a.call(s, i);
  }, ...e2 });
  return { ...t, ...n2, formLoading: t.formLoading, formProps: { ...n2.formProps, ...t.formProps, onValuesChange: s == null ? void 0 : s.onValuesChange, onKeyUp: s == null ? void 0 : s.onKeyUp }, saveButtonProps: { ...t.saveButtonProps, onClick: () => n2.submit() } };
}, "useStepsForm");
var Er = o2((e2, t) => {
  let r = ba(e2, t);
  if (r) return `${r}end`;
}, "getDefaultSortOrder");
var wr = o2((e2, t, r = "eq") => va(e2, t, r), "getDefaultFilter");
var yt2 = o2((e2) => {
  let t = [];
  if (Array.isArray(e2)) e2.sort((r, s) => {
    var n2, i;
    return (((n2 = r.column) == null ? void 0 : n2.sorter).multiple ?? 0) < (((i = s.column) == null ? void 0 : i.sorter).multiple ?? 0) ? -1 : 0;
  }).map((r) => {
    if (r.field && r.order) {
      let s = Array.isArray(r.field) ? r.field.join(".") : `${r.field}`;
      t.push({ field: `${r.columnKey ?? s}`, order: r.order.replace("end", "") });
    }
  });
  else if (e2.field && e2.order) {
    let r = Array.isArray(e2.field) ? e2.field.join(".") : `${e2.field}`;
    t.push({ field: `${e2.columnKey ?? r}`, order: e2.order.replace("end", "") });
  }
  return t;
}, "mapAntdSorterToCrudSorting");
var ft = o2((e2, t, r) => {
  let s = [], n2 = (r ?? []).reduce((i, a) => {
    let p = a.key || a.field;
    return { ...i, [p]: a };
  }, {});
  return Object.keys(e2).map((i) => {
    var l, m;
    let a = e2[i], p = ((l = t.filter((u) => u.operator !== "or").find((u) => u.field === i)) == null ? void 0 : l.operator) || ((m = n2[i]) == null ? void 0 : m.operator);
    p !== "or" && p !== "and" && s.push({ field: i, operator: p ?? (Array.isArray(a) ? "in" : "eq"), value: a });
  }), s;
}, "mapAntdFilterToCrudFilter");
var Fe = o2(({ to: e2, element: t }) => {
  let { Link: r } = pe(), s = oe(), n2 = yt();
  return import_react80.default.createElement(s === "legacy" ? r : n2, { to: e2, replace: false, onClick: (a) => {
    a.preventDefault();
  } }, t);
}, "PaginationLink");
var gt = o2(({ onSearch: e2, initialCurrent: t, initialPageSize: r, hasPagination: s = true, pagination: n2, initialSorter: i, permanentSorter: a, initialFilter: p, permanentFilter: l, defaultSetFilterBehavior: m, filters: u, sorters: d, syncWithLocation: y, resource: T, successNotification: h, errorNotification: c, queryOptions: g, liveMode: b, onLiveEvent: C, liveParams: v, meta: P, metaData: B, dataProviderName: k } = {}) => {
  let { tableQueryResult: F, tableQuery: D, current: L, setCurrent: f, pageSize: R, setPageSize: W, filters: H, setFilters: x, sorters: q2, setSorters: $, sorter: A, setSorter: w, createLinkForSyncWithLocation: G, pageCount: S, overtime: O } = IC({ permanentSorter: a, permanentFilter: l, initialCurrent: t, initialPageSize: r, pagination: n2, hasPagination: s, filters: u, sorters: d, initialSorter: i, initialFilter: p, syncWithLocation: y, resource: T, defaultSetFilterBehavior: m, successNotification: h, errorNotification: c, queryOptions: g, liveMode: b, onLiveEvent: C, liveParams: v, meta: I(P, B), metaData: I(P, B), dataProviderName: k }), { syncWithLocation: M } = to(), Y = y ?? M, N = grid_default.useBreakpoint(), [z2] = form_default.useForm(), I2 = useForm({ form: z2 }), E = sn(b), J = s === false ? "off" : "server", X = ((n2 == null ? void 0 : n2.mode) ?? J) !== "off", se = I(u == null ? void 0 : u.initial, p), { data: _, isFetched: fe, isLoading: Z } = F;
  import_react79.default.useEffect(() => {
    if (Y) {
      let de = I2.form.getFieldsValue(), te = Object.keys(de).reduce((me, ce) => {
        let ne = H.find((Te2) => "field" in Te2 && Te2.field === ce);
        return ne && (me[ce] = ne == null ? void 0 : ne.value), me;
      }, {});
      I2.form.setFieldsValue(te);
    }
  }, [Y]);
  let ee = o2((de, te, me) => {
    if (te && Object.keys(te).length > 0) {
      let ce = ft(te, H, se);
      x(ce);
    }
    if (me && Object.keys(me).length > 0) {
      let ce = yt2(me);
      $(ce);
    }
    X && (f == null || f(de.current || 1), W == null || W(de.pageSize || 10));
  }, "onChange"), le = o2(async (de) => {
    if (e2) {
      let te = await e2(de);
      x(te), X && (f == null || f(1));
    }
  }, "onFinish"), ie2 = o2(() => X ? { itemRender: (de, te, me) => {
    var ne;
    let ce = G({ pagination: { pageSize: R, current: de }, sorters: q2, filters: H });
    if (te === "page") return (0, import_react79.createElement)(Fe, { to: ce, element: `${de}` });
    if (te === "next" || te === "prev") return (0, import_react79.createElement)(Fe, { to: ce, element: me });
    if (te === "jump-next" || te === "jump-prev") {
      let Te2 = (ne = me == null ? void 0 : me.props) == null ? void 0 : ne.children;
      return (0, import_react79.createElement)(Fe, { to: ce, element: import_react79.Children.count(Te2) > 1 ? (0, import_react79.createElement)(import_react79.Fragment, {}, Te2) : Te2 });
    }
    return me;
  }, pageSize: R, current: L, simple: !N.sm, position: N.sm ? ["bottomRight"] : ["bottomCenter"], total: _ == null ? void 0 : _.total } : false, "antdPagination");
  return { searchFormProps: { ...I2.formProps, onFinish: le }, tableProps: { dataSource: _ == null ? void 0 : _.data, loading: E === "auto" ? Z : !fe, onChange: ee, pagination: ie2(), scroll: { x: true } }, tableQueryResult: F, tableQuery: D, sorters: q2, sorter: A, filters: H, setSorters: $, setSorter: w, setFilters: x, current: L, setCurrent: f, pageSize: R, setPageSize: W, pageCount: S, createLinkForSyncWithLocation: G, overtime: O };
}, "useTable");
var qr = o2(({ autoSubmitClose: e2 = true, ...t } = {}) => {
  let r = gt({ ...t, successNotification: void 0, errorNotification: void 0 }), s = he2({ ...t, action: "edit", redirect: false }), { id: n2, setId: i, saveButtonProps: a } = s, p = { onClick: () => {
    i(void 0);
  } }, l = o2((u) => ({ onClick: () => i(u) }), "editButtonProps"), m = o2((u) => u === n2, "isEditing");
  return { ...r, ...s, formProps: { ...s.formProps, onFinish: async (u) => {
    let d = await s.onFinish(u);
    return e2 && i(void 0), d;
  } }, saveButtonProps: a, cancelButtonProps: p, editButtonProps: l, isEditing: m };
}, "useEditableTable");
var pm = o2((e2) => {
  let { query: t, defaultValueQuery: r, onSearch: s, options: n2 } = PC(e2);
  return { selectProps: { options: n2, onSearch: s, loading: r.isFetching, showSearch: true, filterOption: false }, query: t, defaultValueQuery: r, queryResult: t, defaultValueQueryResult: r };
}, "useSelect");
var mm = o2(({ resource: e2, sort: t, sorters: r, filters: s, optionLabel: n2, optionValue: i, queryOptions: a, fetchSize: p, pagination: l, liveMode: m, defaultValue: u, selectedOptionsOrder: d, onLiveEvent: y, liveParams: T, meta: h, metaData: c, dataProviderName: g }) => {
  let { query: b, options: C } = PC({ resource: e2, sort: t, sorters: r, filters: s, optionLabel: n2, optionValue: i, queryOptions: a, fetchSize: p, pagination: l, liveMode: m, defaultValue: u, selectedOptionsOrder: d, onLiveEvent: y, liveParams: T, meta: I(h, c), metaData: I(h, c), dataProviderName: g });
  return { checkboxGroupProps: { options: C, defaultValue: u }, query: b, queryResult: b };
}, "useCheckboxGroup");
var Tm = o2(({ resource: e2, sort: t, sorters: r, filters: s, optionLabel: n2, optionValue: i, queryOptions: a, fetchSize: p, pagination: l, liveMode: m, defaultValue: u, selectedOptionsOrder: d, onLiveEvent: y, liveParams: T, meta: h, metaData: c, dataProviderName: g }) => {
  let { query: b, options: C } = PC({ resource: e2, sort: t, sorters: r, filters: s, optionLabel: n2, optionValue: i, queryOptions: a, fetchSize: p, pagination: l, liveMode: m, defaultValue: u, selectedOptionsOrder: d, onLiveEvent: y, liveParams: T, meta: I(h, c), metaData: I(h, c), dataProviderName: g });
  return { radioGroupProps: { options: C, defaultValue: u }, query: b, queryResult: b };
}, "useRadioGroup");
var Cm = o2(({ resource: e2, resourceName: t, mapData: r = o2((u) => u, "mapData"), paparseOptions: s, batchSize: n2 = Number.MAX_SAFE_INTEGER, onFinish: i, meta: a, metaData: p, dataProviderName: l, onProgress: m } = {}) => {
  let u = z(), { resource: d } = q(e2 ?? t), { mutationResult: y, isLoading: T, handleChange: h } = mR({ resource: (d == null ? void 0 : d.identifier) ?? (d == null ? void 0 : d.name), mapData: r, paparseOptions: s, batchSize: n2, meta: I(a, p), metaData: I(a, p), dataProviderName: l, onFinish: i, onProgress: m ?? (({ totalAmount: c, processedAmount: g }) => {
    if (c > 0 && g > 0) {
      let b = import_react81.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "-7px" } }, import_react81.default.createElement(progress_default, { type: "circle", percent: Math.floor(g / c * 100), size: 50, strokeColor: "#1890ff", status: "normal" }), import_react81.default.createElement("span", { style: { marginLeft: 8, width: "100%" } }, u("notifications.importProgress", { processed: g, total: c }, `Importing: ${g}/${c}`)));
      notification_default.open({ description: b, message: null, key: `${d}-import`, duration: 0 }), g >= c, g === c && setTimeout(() => {
        notification_default.destroy(`${d}-import`);
      }, 4500);
    }
  }) });
  return { uploadProps: { onChange: h, beforeUpload: () => false, showUploadList: false, accept: ".csv" }, buttonProps: { type: "default", loading: T }, mutationResult: y, isLoading: T };
}, "useImport");
var ns = o2(({ resource: e2, initialCurrent: t, initialPageSize: r, pagination: s, hasPagination: n2 = true, initialSorter: i, permanentSorter: a, initialFilter: p, permanentFilter: l, defaultSetFilterBehavior: m, filters: u, sorters: d, onSearch: y, queryOptions: T, syncWithLocation: h, successNotification: c, errorNotification: g, liveMode: b, onLiveEvent: C, liveParams: v, meta: P, metaData: B, dataProviderName: k } = {}) => {
  let { sorters: F, sorter: D, filters: L, current: f, pageSize: R, pageCount: W, setFilters: H, setCurrent: x, setPageSize: q2, setSorter: $, setSorters: A, createLinkForSyncWithLocation: w, tableQueryResult: G, tableQuery: S, overtime: O } = IC({ resource: e2, initialSorter: i, permanentSorter: a, initialFilter: p, permanentFilter: l, filters: u, sorters: d, defaultSetFilterBehavior: m, initialCurrent: t, initialPageSize: r, queryOptions: T, successNotification: c, errorNotification: g, liveMode: b, onLiveEvent: C, liveParams: v, meta: I(P, B), metaData: I(P, B), syncWithLocation: h, dataProviderName: k, pagination: s, hasPagination: n2 }), M = n2 === false ? "off" : "server", Y = ((s == null ? void 0 : s.mode) ?? M) !== "off", N = grid_default.useBreakpoint(), z2 = sn(b), [I2] = form_default.useForm(), { data: E, isFetched: J, isLoading: X } = G, se = o2((Z, ee) => {
    Y && (x(Z), q2(ee || 10));
  }, "onChange"), _ = o2(async (Z) => {
    if (y) {
      let ee = await y(Z);
      return Y && (x == null || x(1)), H(ee);
    }
  }, "onFinish"), fe = o2(() => Y ? { itemRender: (Z, ee, le) => {
    var de;
    let ie2 = w({ pagination: { pageSize: R, current: Z }, sorters: F, filters: L });
    if (ee === "page") return (0, import_react82.createElement)(Fe, { to: ie2, element: `${Z}` });
    if (ee === "next" || ee === "prev") return (0, import_react82.createElement)(Fe, { to: ie2, element: le });
    if (ee === "jump-next" || ee === "jump-prev") {
      let te = (de = le == null ? void 0 : le.props) == null ? void 0 : de.children;
      return (0, import_react82.createElement)(Fe, { to: ie2, element: import_react82.Children.count(te) > 1 ? (0, import_react82.createElement)(import_react82.Fragment, {}, te) : te });
    }
    return le;
  }, pageSize: R, current: f, simple: !N.sm, total: E == null ? void 0 : E.total, onChange: se } : false, "antdPagination");
  return { searchFormProps: { form: I2, onFinish: _ }, listProps: { dataSource: E == null ? void 0 : E.data, loading: z2 === "auto" ? X : !J, pagination: fe() }, query: S, queryResult: G, filters: L, setFilters: H, sorter: D, setSorter: $, sorters: F, setSorters: A, current: f, setCurrent: x, pageSize: R, setPageSize: q2, pageCount: W, createLinkForSyncWithLocation: w, overtime: O };
}, "useSimpleList");
var Um = o2(() => {
  let [e2, t] = (0, import_react83.useState)(false), r = (0, import_react83.useCallback)((s) => {
    ls(s.fileList).includes(true) ? t(true) : t(false);
  }, []);
  return (0, import_react83.useMemo)(() => ({ isLoading: e2, onChange: r }), [e2]);
}, "useFileUploadState");
var ls = o2((e2) => e2.map((t) => {
  switch (t.status) {
    case "uploading":
      return true;
    default:
      return false;
  }
}), "mapStatusToLoading");
var He = import_react85.default.createContext({ siderCollapsed: false, mobileSiderOpen: false, setSiderCollapsed: () => {
}, setMobileSiderOpen: () => {
} });
var xt = o2(({ children: e2, initialSiderCollapsed: t, onSiderCollapsed: r }) => {
  let [s, n2] = (0, import_react85.useState)(t ?? false), [i, a] = (0, import_react85.useState)(false), p = o2((l) => {
    n2(l), r && r(l);
  }, "setSiderCollapsed");
  return import_react85.default.createElement(He.Provider, { value: { siderCollapsed: s, mobileSiderOpen: i, setSiderCollapsed: p, setMobileSiderOpen: a } }, e2);
}, "ThemedLayoutContextProvider");
var qm = o2(() => {
  let { mobileSiderOpen: e2, siderCollapsed: t, setMobileSiderOpen: r, setSiderCollapsed: s } = (0, import_react84.useContext)(He);
  return { siderVisible: e2, setSiderVisible: r, drawerSiderVisible: t, setDrawerSiderVisible: s };
}, "useSiderVisible");
var fo2 = o2(() => {
  let { mobileSiderOpen: e2, siderCollapsed: t, setMobileSiderOpen: r, setSiderCollapsed: s } = (0, import_react86.useContext)(He);
  return { mobileSiderOpen: e2, siderCollapsed: t, setMobileSiderOpen: r, setSiderCollapsed: s };
}, "useThemedLayoutContext");
var ht2 = o2(({ message: e2, cancelMutation: t, undoableTimeout: r }) => import_react88.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "-7px" } }, import_react88.default.createElement(progress_default, { type: "circle", percent: (r ?? 0) * 20, format: (s) => s && s / 20, size: 50, strokeColor: "#1890ff", status: "normal" }), import_react88.default.createElement("span", { style: { marginLeft: 8, width: "100%" } }, e2), import_react88.default.createElement(button_default, { style: { flexShrink: 0 }, onClick: t, disabled: r === 0, icon: import_react88.default.createElement(UndoOutlined_default, null) })), "UndoableNotification");
var ac = { open: ({ key: e2, message: t, description: r, type: s, cancelMutation: n2, undoableTimeout: i }) => {
  s === "progress" ? notification_default.open({ key: e2, description: import_react87.default.createElement(ht2, { notificationKey: e2, message: t, cancelMutation: () => {
    n2 == null || n2(), notification_default.destroy(e2 ?? "");
  }, undoableTimeout: i }), message: null, duration: 0, closeIcon: import_react87.default.createElement(import_react87.default.Fragment, null) }) : notification_default.open({ key: e2, description: t, message: r ?? null, type: s });
}, close: (e2) => notification_default.destroy(e2) };
var ic = o2(() => {
  let { notification: e2 } = app_default.useApp(), t = "open" in e2 ? e2 : notification_default;
  return { open: ({ key: s, message: n2, description: i, type: a, cancelMutation: p, undoableTimeout: l }) => {
    a === "progress" ? t.open({ key: s, description: import_react87.default.createElement(ht2, { notificationKey: s, message: n2, cancelMutation: () => {
      p == null || p(), t.destroy(s ?? "");
    }, undoableTimeout: l }), message: null, duration: 0, closeIcon: import_react87.default.createElement(import_react87.default.Fragment, null) }) : t.open({ key: s, description: n2, message: i ?? null, type: a });
  }, close: (s) => t.destroy(s) };
}, "useNotificationProvider");
var To = { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, position: "fixed", top: 64, zIndex: 999 };
var Ct = o2(({ Title: e2, render: t, meta: r }) => {
  let [s, n2] = (0, import_react90.useState)(false), [i, a] = (0, import_react90.useState)(false), p = yo(), l = oe(), m = yt(), { warnWhen: u, setWarnWhen: d } = vt(), { Link: y } = pe(), T = l === "legacy" ? y : m, h = Ta(), c = z(), { menuItems: g, selectedKey: b, defaultOpenKeys: C } = zu({ meta: r }), v = grid_default.useBreakpoint(), { hasDashboard: P } = ge(), B = ie(), { mutate: k } = Mr({ v3LegacyAuthProviderCompatible: !!(B != null && B.isLegacy) }), F = typeof v.lg > "u" ? false : !v.lg, D = e2 ?? h ?? Ft, L = o2((w, G) => w.map((S) => {
    let { icon: O, label: M, route: Y, key: N, name: z2, children: I2, parentName: E, meta: J, options: X } = S;
    if (I2.length > 0) return import_react90.default.createElement(Sc, { key: S.key, resource: z2, action: "list", params: { resource: S } }, import_react90.default.createElement(menu_default.SubMenu, { key: S.key, icon: O ?? import_react90.default.createElement(UnorderedListOutlined_default, null), title: M }, L(I2, G)));
    let se = N === G, _ = !(I(J == null ? void 0 : J.parent, X == null ? void 0 : X.parent, E) !== void 0 && I2.length === 0);
    return import_react90.default.createElement(Sc, { key: S.key, resource: z2, action: "list", params: { resource: S } }, import_react90.default.createElement(menu_default.Item, { key: S.key, style: { fontWeight: se ? "bold" : "normal" }, icon: O ?? (_ && import_react90.default.createElement(UnorderedListOutlined_default, null)) }, import_react90.default.createElement(T, { to: Y ?? "" }, M), !s && se && import_react90.default.createElement("div", { className: "ant-menu-tree-arrow" })));
  }), "renderTreeView"), f = o2(() => {
    u ? window.confirm(c("warnWhenUnsavedChanges", "Are you sure you want to leave? You have unsaved changes.")) && (d(false), k()) : k();
  }, "handleLogout"), R = p && import_react90.default.createElement(menu_default.Item, { key: "logout", onClick: f, icon: import_react90.default.createElement(LogoutOutlined_default, null) }, c("buttons.logout", "Logout")), W = P ? import_react90.default.createElement(menu_default.Item, { key: "dashboard", style: { fontWeight: b === "/" ? "bold" : "normal" }, icon: import_react90.default.createElement(DashboardOutlined_default, null) }, import_react90.default.createElement(T, { to: "/" }, c("dashboard.title", "Dashboard")), !s && b === "/" && import_react90.default.createElement("div", { className: "ant-menu-tree-arrow" })) : null, H = L(g, b), x = o2(() => t ? t({ dashboard: W, items: H, logout: R, collapsed: s }) : import_react90.default.createElement(import_react90.default.Fragment, null, W, H, R), "renderSider"), q2 = o2(() => import_react90.default.createElement(import_react90.default.Fragment, null, import_react90.default.createElement(menu_default, { theme: "dark", selectedKeys: b ? [b] : [], defaultOpenKeys: C, mode: "inline", onClick: () => {
    a(false), v.lg || n2(true);
  } }, x())), "renderMenu"), $ = o2(() => import_react90.default.createElement(import_react90.default.Fragment, null, import_react90.default.createElement(drawer_default, { open: i, onClose: () => a(false), placement: "left", closable: false, width: 200, bodyStyle: { padding: 0 }, maskClosable: true }, import_react90.default.createElement(layout_default, null, import_react90.default.createElement(layout_default.Sider, { style: { height: "100vh", overflow: "hidden" } }, import_react90.default.createElement(D, { collapsed: false }), q2()))), import_react90.default.createElement(button_default, { style: To, size: "large", onClick: () => a(true), icon: import_react90.default.createElement(BarsOutlined_default, null) })), "renderDrawerSider");
  return import_react90.default.createElement(config_provider_default, { theme: { components: { Menu: { colorItemBg: "transparent", colorItemText: "#fff", colorItemTextSelected: "#fff", colorItemBgSelected: "transparent", colorItemTextHover: "#fff" } } } }, o2(() => F ? $() : import_react90.default.createElement(layout_default.Sider, { collapsible: true, collapsed: s, onCollapse: (w) => n2(w), collapsedWidth: 80, breakpoint: "lg" }, import_react90.default.createElement(D, { collapsed: s }), q2()), "renderContent")());
}, "Sider");
var Bt = o2(() => {
  let e2 = ie(), { data: t } = no({ v3LegacyAuthProviderCompatible: !!(e2 != null && e2.isLegacy) });
  return t && (t.name || t.avatar) ? import_react91.default.createElement(layout_default.Header, { style: { display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "0px 24px", height: "64px" } }, import_react91.default.createElement(space_default, { style: { marginLeft: "8px" } }, (t == null ? void 0 : t.name) && import_react91.default.createElement(typography_default.Text, { style: { color: "white" }, strong: true }, t.name), (t == null ? void 0 : t.avatar) && import_react91.default.createElement(avatar_default, { src: t == null ? void 0 : t.avatar, alt: t == null ? void 0 : t.name }))) : null;
}, "Header");
var zs = o2(({ children: e2, Header: t, Sider: r, Title: s, Footer: n2, OffLayoutArea: i }) => {
  let a = grid_default.useBreakpoint(), p = r ?? Ct, l = t ?? Bt, m = typeof a.sm > "u" ? true : a.sm;
  return import_react89.default.createElement(layout_default, { style: { minHeight: "100vh" } }, import_react89.default.createElement(p, { Title: s }), import_react89.default.createElement(layout_default, null, import_react89.default.createElement(l, null), import_react89.default.createElement(layout_default.Content, null, import_react89.default.createElement("div", { style: { minHeight: 360, padding: m ? 24 : 12 } }, e2), i && import_react89.default.createElement(i, null)), n2 && import_react89.default.createElement(n2, null)));
}, "Layout");
var Ft = o2(({ collapsed: e2 }) => {
  let t = oe(), r = yt(), { Link: s } = pe();
  return import_react92.default.createElement(t === "legacy" ? s : r, { to: "/" }, e2 ? import_react92.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center" } }, import_react92.default.createElement("img", { src: "https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine-mini.svg", alt: "Refine", style: { margin: "0 auto", padding: "12px 0", maxHeight: "65.5px" } })) : import_react92.default.createElement("img", { src: "https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg", alt: "Refine", style: { width: "200px", padding: "12px 24px" } }));
}, "Title");
var ho = { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, position: "fixed", top: 64, zIndex: 999 };
var Lt = o2(({ Title: e2, render: t, meta: r }) => {
  let { token: s } = theme_default.useToken(), [n2, i] = (0, import_react94.useState)(false), [a, p] = (0, import_react94.useState)(false), l = yo(), m = oe(), u = yt(), { warnWhen: d, setWarnWhen: y } = vt(), { Link: T } = pe(), h = m === "legacy" ? T : u, c = Ta(), g = z(), { menuItems: b, selectedKey: C, defaultOpenKeys: v } = zu({ meta: r }), P = grid_default.useBreakpoint(), { hasDashboard: B } = ge(), k = ie(), { mutate: F } = Mr({ v3LegacyAuthProviderCompatible: !!(k != null && k.isLegacy) }), D = typeof P.lg > "u" ? false : !P.lg, L = e2 ?? c ?? kt, f = o2((w, G) => w.map((S) => {
    let { icon: O, label: M, route: Y, key: N, name: z2, children: I2, parentName: E, meta: J, options: X } = S;
    if (I2.length > 0) return import_react94.default.createElement(Sc, { key: S.key, resource: z2, action: "list", params: { resource: S } }, import_react94.default.createElement(menu_default.SubMenu, { key: S.key, icon: O ?? import_react94.default.createElement(UnorderedListOutlined_default, null), title: M }, f(I2, G)));
    let se = N === G, _ = !(I(J == null ? void 0 : J.parent, X == null ? void 0 : X.parent, E) !== void 0 && I2.length === 0);
    return import_react94.default.createElement(Sc, { key: S.key, resource: z2, action: "list", params: { resource: S } }, import_react94.default.createElement(menu_default.Item, { key: S.key, icon: O ?? (_ && import_react94.default.createElement(UnorderedListOutlined_default, null)) }, import_react94.default.createElement(h, { to: Y ?? "" }, M), !n2 && se && import_react94.default.createElement("div", { className: "ant-menu-tree-arrow" })));
  }), "renderTreeView"), R = o2(() => {
    d ? window.confirm(g("warnWhenUnsavedChanges", "Are you sure you want to leave? You have unsaved changes.")) && (y(false), F()) : F();
  }, "handleLogout"), W = l && import_react94.default.createElement(menu_default.Item, { key: "logout", onClick: () => R(), icon: import_react94.default.createElement(LogoutOutlined_default, null) }, g("buttons.logout", "Logout")), H = B ? import_react94.default.createElement(menu_default.Item, { key: "dashboard", icon: import_react94.default.createElement(DashboardOutlined_default, null) }, import_react94.default.createElement(h, { to: "/" }, g("dashboard.title", "Dashboard")), !n2 && C === "/" && import_react94.default.createElement("div", { className: "ant-menu-tree-arrow" })) : null, x = f(b, C), q2 = o2(() => t ? t({ dashboard: H, items: x, logout: W, collapsed: n2 }) : import_react94.default.createElement(import_react94.default.Fragment, null, H, x, W), "renderSider"), $ = o2(() => import_react94.default.createElement(import_react94.default.Fragment, null, import_react94.default.createElement(menu_default, { selectedKeys: C ? [C] : [], defaultOpenKeys: v, mode: "inline", style: { marginTop: "8px", border: "none" }, onClick: () => {
    p(false), P.lg || i(true);
  } }, q2())), "renderMenu"), A = o2(() => import_react94.default.createElement(import_react94.default.Fragment, null, import_react94.default.createElement(drawer_default, { open: a, onClose: () => p(false), placement: "left", closable: false, width: 200, bodyStyle: { padding: 0 }, maskClosable: true }, import_react94.default.createElement(layout_default, null, import_react94.default.createElement(layout_default.Sider, { style: { height: "100vh", overflow: "hidden", backgroundColor: s.colorBgContainer, borderRight: `1px solid ${s.colorBgElevated}` } }, import_react94.default.createElement("div", { style: { width: "200px", padding: "0 16px", display: "flex", justifyContent: "flex-start", alignItems: "center", height: "64px", backgroundColor: s.colorBgElevated } }, import_react94.default.createElement(L, { collapsed: false })), $()))), import_react94.default.createElement(button_default, { style: ho, size: "large", onClick: () => p(true), icon: import_react94.default.createElement(BarsOutlined_default, null) })), "renderDrawerSider");
  return D ? A() : import_react94.default.createElement(layout_default.Sider, { style: { backgroundColor: s.colorBgContainer, borderRight: `1px solid ${s.colorBgElevated}` }, collapsible: true, collapsed: n2, onCollapse: (w) => i(w), collapsedWidth: 80, breakpoint: "lg", trigger: import_react94.default.createElement(button_default, { type: "text", style: { borderRadius: 0, height: "100%", width: "100%", backgroundColor: s.colorBgElevated } }, n2 ? import_react94.default.createElement(RightOutlined_default, { style: { color: s.colorPrimary } }) : import_react94.default.createElement(LeftOutlined_default, { style: { color: s.colorPrimary } })) }, import_react94.default.createElement("div", { style: { width: n2 ? "80px" : "200px", padding: n2 ? "0" : "0 16px", display: "flex", justifyContent: n2 ? "center" : "flex-start", alignItems: "center", height: "64px", backgroundColor: s.colorBgElevated, fontSize: "14px" } }, import_react94.default.createElement(L, { collapsed: n2 })), $());
}, "ThemedSider");
var Dt = o2(() => {
  let { token: e2 } = theme_default.useToken(), t = ie(), { data: r } = no({ v3LegacyAuthProviderCompatible: !!(t != null && t.isLegacy) });
  return r && (r.name || r.avatar) ? import_react95.default.createElement(layout_default.Header, { style: { backgroundColor: e2.colorBgElevated, display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "0px 24px", height: "64px" } }, import_react95.default.createElement(space_default, null, import_react95.default.createElement(space_default, { size: "middle" }, (r == null ? void 0 : r.name) && import_react95.default.createElement(typography_default.Text, { strong: true }, r.name), (r == null ? void 0 : r.avatar) && import_react95.default.createElement(avatar_default, { src: r == null ? void 0 : r.avatar, alt: r == null ? void 0 : r.name })))) : null;
}, "ThemedHeader");
var hn = o2(({ children: e2, Header: t, Sider: r, Title: s, Footer: n2, OffLayoutArea: i }) => {
  let a = grid_default.useBreakpoint(), p = r ?? Lt, l = t ?? Dt, m = typeof a.sm > "u" ? true : a.sm;
  return import_react93.default.createElement(layout_default, { style: { minHeight: "100vh" } }, import_react93.default.createElement(p, { Title: s }), import_react93.default.createElement(layout_default, null, import_react93.default.createElement(l, null), import_react93.default.createElement(layout_default.Content, null, import_react93.default.createElement("div", { style: { minHeight: 360, padding: m ? 24 : 12 } }, e2), i && import_react93.default.createElement(i, null)), n2 && import_react93.default.createElement(n2, null)));
}, "ThemedLayout");
var Ln = "zrthzrth";
var kn = import_react96.default.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, import_react96.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13.7889 0.422291C12.6627 -0.140764 11.3373 -0.140764 10.2111 0.422291L2.21115 4.42229C0.85601 5.09986 0 6.48491 0 8V16C0 17.5151 0.85601 18.9001 2.21115 19.5777L10.2111 23.5777C11.3373 24.1408 12.6627 24.1408 13.7889 23.5777L21.7889 19.5777C23.144 18.9001 24 17.5151 24 16V8C24 6.48491 23.144 5.09986 21.7889 4.42229L13.7889 0.422291ZM8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16V8Z", fill: "currentColor" }), import_react96.default.createElement("path", { d: "M14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8Z", fill: "currentColor" }));
var kt = o2(({ collapsed: e2, icon: t = kn, text: r = Ln, wrapperStyles: s }) => {
  let { token: n2 } = theme_default.useToken(), i = oe(), a = yt(), { Link: p } = pe();
  return import_react96.default.createElement(i === "legacy" ? p : a, { to: "/", style: { display: "inline-block", textDecoration: "none" } }, import_react96.default.createElement(space_default, { style: { display: "flex", alignItems: "center", fontSize: "inherit", ...s } }, import_react96.default.createElement("div", { style: { height: "24px", width: "24px", color: n2.colorPrimary } }, t), !e2 && import_react96.default.createElement(typography_default.Title, { style: { fontSize: "inherit", marginBottom: 0, fontWeight: 700 } }, r)));
}, "ThemedTitle");
var vo = { borderStartStartRadius: 0, borderEndStartRadius: 0, position: "fixed", top: 64, zIndex: 999 };
var Rt = o2(({ Title: e2, render: t, meta: r, fixed: s, activeItemDisabled: n2 = false }) => {
  var Y;
  let { token: i } = theme_default.useToken(), { siderCollapsed: a, setSiderCollapsed: p, mobileSiderOpen: l, setMobileSiderOpen: m } = fo2(), u = yo(), d = (Y = (0, import_react98.useContext)(config_provider_default.ConfigContext)) == null ? void 0 : Y.direction, y = oe(), T = yt(), { warnWhen: h, setWarnWhen: c } = vt(), { Link: g } = pe(), b = y === "legacy" ? g : T, C = Ta(), v = z(), { menuItems: P, selectedKey: B, defaultOpenKeys: k } = zu({ meta: r }), F = grid_default.useBreakpoint(), { hasDashboard: D } = ge(), L = ie(), { mutate: f } = Mr({ v3LegacyAuthProviderCompatible: !!(L != null && L.isLegacy) }), R = typeof F.lg > "u" ? false : !F.lg, W = e2 ?? C ?? be, H = o2((N, z2) => N.map((I2) => {
    let { icon: E, label: J, route: X, key: se, name: _, children: fe, parentName: Z, meta: ee, options: le } = I2;
    if (fe.length > 0) return import_react98.default.createElement(Sc, { key: I2.key, resource: _, action: "list", params: { resource: I2 } }, import_react98.default.createElement(menu_default.SubMenu, { key: I2.key, icon: E ?? import_react98.default.createElement(UnorderedListOutlined_default, null), title: J }, H(fe, z2)));
    let ie2 = se === z2, de = !(I(ee == null ? void 0 : ee.parent, le == null ? void 0 : le.parent, Z) !== void 0 && fe.length === 0), te = n2 && ie2 ? { pointerEvents: "none" } : {};
    return import_react98.default.createElement(Sc, { key: I2.key, resource: _, action: "list", params: { resource: I2 } }, import_react98.default.createElement(menu_default.Item, { key: I2.key, icon: E ?? (de && import_react98.default.createElement(UnorderedListOutlined_default, null)), style: te }, import_react98.default.createElement(b, { to: X ?? "", style: te }, J), !a && ie2 && import_react98.default.createElement("div", { className: "ant-menu-tree-arrow" })));
  }), "renderTreeView"), x = o2(() => {
    h ? window.confirm(v("warnWhenUnsavedChanges", "Are you sure you want to leave? You have unsaved changes.")) && (c(false), f()) : f();
  }, "handleLogout"), q2 = u && import_react98.default.createElement(menu_default.Item, { key: "logout", onClick: () => x(), icon: import_react98.default.createElement(LogoutOutlined_default, null) }, v("buttons.logout", "Logout")), $ = D ? import_react98.default.createElement(menu_default.Item, { key: "dashboard", icon: import_react98.default.createElement(DashboardOutlined_default, null) }, import_react98.default.createElement(b, { to: "/" }, v("dashboard.title", "Dashboard")), !a && B === "/" && import_react98.default.createElement("div", { className: "ant-menu-tree-arrow" })) : null, A = H(P, B), w = o2(() => t ? t({ dashboard: $, items: A, logout: q2, collapsed: a }) : import_react98.default.createElement(import_react98.default.Fragment, null, $, A, q2), "renderSider"), G = o2(() => import_react98.default.createElement(menu_default, { selectedKeys: B ? [B] : [], defaultOpenKeys: k, mode: "inline", style: { paddingTop: "8px", border: "none", overflow: "auto", height: "calc(100% - 72px)" }, onClick: () => {
    m(false);
  } }, w()), "renderMenu"), S = o2(() => import_react98.default.createElement(import_react98.default.Fragment, null, import_react98.default.createElement(drawer_default, { open: l, onClose: () => m(false), placement: d === "rtl" ? "right" : "left", closable: false, width: 200, bodyStyle: { padding: 0 }, maskClosable: true }, import_react98.default.createElement(layout_default, null, import_react98.default.createElement(layout_default.Sider, { style: { height: "100vh", backgroundColor: i.colorBgContainer, borderRight: `1px solid ${i.colorBgElevated}` } }, import_react98.default.createElement("div", { style: { width: "200px", padding: "0 16px", display: "flex", justifyContent: "flex-start", alignItems: "center", height: "64px", backgroundColor: i.colorBgElevated } }, import_react98.default.createElement(W, { collapsed: false })), G()))), import_react98.default.createElement(button_default, { style: vo, size: "large", onClick: () => m(true), icon: import_react98.default.createElement(BarsOutlined_default, null) })), "renderDrawerSider");
  if (R) return S();
  let O = { backgroundColor: i.colorBgContainer, borderRight: `1px solid ${i.colorBgElevated}` };
  s && (O.position = "fixed", O.top = 0, O.height = "100vh", O.zIndex = 999);
  let M = o2(() => {
    let N = { style: { color: i.colorPrimary } };
    return import_react98.default.createElement(a ? d === "rtl" ? LeftOutlined_default : RightOutlined_default : d === "rtl" ? RightOutlined_default : LeftOutlined_default, { ...N });
  }, "renderClosingIcons");
  return import_react98.default.createElement(import_react98.default.Fragment, null, s && import_react98.default.createElement("div", { style: { width: a ? "80px" : "200px", transition: "all 0.2s" } }), import_react98.default.createElement(layout_default.Sider, { style: O, collapsible: true, collapsed: a, onCollapse: (N, z2) => {
    z2 === "clickTrigger" && p(N);
  }, collapsedWidth: 80, breakpoint: "lg", trigger: import_react98.default.createElement(button_default, { type: "text", style: { borderRadius: 0, height: "100%", width: "100%", backgroundColor: i.colorBgElevated } }, M()) }, import_react98.default.createElement("div", { style: { width: a ? "80px" : "200px", padding: a ? "0" : "0 16px", display: "flex", justifyContent: a ? "center" : "flex-start", alignItems: "center", height: "64px", backgroundColor: i.colorBgElevated, fontSize: "14px" } }, import_react98.default.createElement(W, { collapsed: a })), G()));
}, "ThemedSiderV2");
var It = o2(({ isSticky: e2, sticky: t }) => {
  let { token: r } = theme_default.useToken(), s = ie(), { data: n2 } = no({ v3LegacyAuthProviderCompatible: !!(s != null && s.isLegacy) });
  if (!(n2 && (n2.name || n2.avatar))) return null;
  let a = { backgroundColor: r.colorBgElevated, display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "0px 24px", height: "64px" };
  return I(t, e2) && (a.position = "sticky", a.top = 0, a.zIndex = 1), import_react99.default.createElement(layout_default.Header, { style: a }, import_react99.default.createElement(space_default, null, import_react99.default.createElement(space_default, { size: "middle" }, (n2 == null ? void 0 : n2.name) && import_react99.default.createElement(typography_default.Text, { strong: true }, n2.name), (n2 == null ? void 0 : n2.avatar) && import_react99.default.createElement(avatar_default, { src: n2 == null ? void 0 : n2.avatar, alt: n2 == null ? void 0 : n2.name }))));
}, "ThemedHeaderV2");
var ra = o2(({ children: e2, Header: t, Sider: r, Title: s, Footer: n2, OffLayoutArea: i, initialSiderCollapsed: a, onSiderCollapsed: p }) => {
  let l = grid_default.useBreakpoint(), m = r ?? Rt, u = t ?? It, d = typeof l.sm > "u" ? true : l.sm, y = !!m({ Title: s });
  return import_react97.default.createElement(xt, { initialSiderCollapsed: a, onSiderCollapsed: p }, import_react97.default.createElement(layout_default, { style: { minHeight: "100vh" }, hasSider: y }, import_react97.default.createElement(m, { Title: s }), import_react97.default.createElement(layout_default, null, import_react97.default.createElement(u, null), import_react97.default.createElement(layout_default.Content, null, import_react97.default.createElement("div", { style: { minHeight: 360, padding: d ? 24 : 12 } }, e2), i && import_react97.default.createElement(i, null)), n2 && import_react97.default.createElement(n2, null))));
}, "ThemedLayoutV2");
var be = o2(({ collapsed: e2, icon: t, text: r, wrapperStyles: s }) => {
  let { title: { icon: n2, text: i } = {} } = At(), a = typeof t > "u" ? n2 : t, p = typeof r > "u" ? i : r, { token: l } = theme_default.useToken(), m = oe(), u = yt(), { Link: d } = pe();
  return import_react100.default.createElement(m === "legacy" ? d : u, { to: "/", style: { display: "inline-block", textDecoration: "none" } }, import_react100.default.createElement(space_default, { style: { display: "flex", alignItems: "center", fontSize: "inherit", ...s } }, import_react100.default.createElement("div", { style: { height: "24px", width: "24px", color: l.colorPrimary } }, a), !e2 && import_react100.default.createElement(typography_default.Title, { style: { fontSize: "inherit", marginBottom: 0, fontWeight: 700 } }, p)));
}, "ThemedTitleV2");
var Ht2 = o2(({ resource: e2, resourceNameOrRouteName: t, hideText: r = false, accessControl: s, meta: n2, children: i, onClick: a, ...p }) => {
  let { hidden: l, disabled: m, label: u, title: d, LinkComponent: y, to: T } = qv({ resource: e2 ?? t, meta: n2, accessControl: s }), h = m || p.disabled;
  return l || p.hidden ? null : import_react101.default.createElement(y, { to: T, replace: false, onClick: (g) => {
    if (h) {
      g.preventDefault();
      return;
    }
    a && (g.preventDefault(), a(g));
  } }, import_react101.default.createElement(button_default, { icon: import_react101.default.createElement(PlusSquareOutlined_default, null), disabled: h, title: d, className: n.CreateButton, type: "primary", ...p }, !r && (i ?? u)));
}, "CreateButton");
var Ot = o2(({ resource: e2, resourceNameOrRouteName: t, recordItemId: r, hideText: s = false, accessControl: n2, meta: i, children: a, onClick: p, ...l }) => {
  let { to: m, label: u, title: d, hidden: y, disabled: T, LinkComponent: h } = Yv({ resource: e2 ?? t, id: r, meta: i, accessControl: n2 }), c = T || l.disabled;
  return y || l.hidden ? null : import_react102.default.createElement(h, { to: m, replace: false, onClick: (b) => {
    if (c) {
      b.preventDefault();
      return;
    }
    p && (b.preventDefault(), p(b));
  } }, import_react102.default.createElement(button_default, { icon: import_react102.default.createElement(EditOutlined_default, null), disabled: c, title: d, className: n.EditButton, ...l }, !s && (a ?? u)));
}, "EditButton");
var Ye = o2(({ resource: e2, resourceNameOrRouteName: t, recordItemId: r, onSuccess: s, mutationMode: n2, children: i, successNotification: a, errorNotification: p, hideText: l = false, accessControl: m, metaData: u, meta: d, dataProviderName: y, confirmTitle: T, confirmOkText: h, confirmCancelText: c, invalidates: g, ...b }) => {
  let { title: C, label: v, hidden: P, disabled: B, loading: k, confirmTitle: F, confirmOkLabel: D, cancelLabel: L, onConfirm: f } = qu({ resource: e2 ?? t, id: r, dataProviderName: y, invalidates: g, meta: d, onSuccess: s, mutationMode: n2, errorNotification: p, successNotification: a, accessControl: m }), R = B || b.disabled;
  return P || b.hidden ? null : import_react103.default.createElement(popconfirm_default, { key: "delete", okText: h ?? D, cancelText: c ?? L, okType: "danger", title: T ?? F, okButtonProps: { disabled: k }, onConfirm: f, disabled: R }, import_react103.default.createElement(button_default, { danger: true, loading: k, icon: import_react103.default.createElement(DeleteOutlined_default, null), title: C, disabled: R, className: n.DeleteButton, ...b }, !l && (i ?? v)));
}, "DeleteButton");
var _e2 = o2(({ resource: e2, resourceNameOrRouteName: t, recordItemId: r, hideText: s = false, dataProviderName: n2, children: i, meta: a, metaData: p, ...l }) => {
  let { onClick: m, label: u, loading: d } = tc({ resource: e2 ?? t, id: r, dataProviderName: n2 });
  return import_react104.default.createElement(button_default, { onClick: m, icon: import_react104.default.createElement(RedoOutlined_default, { spin: d }), className: n.RefreshButton, ...l }, !s && (i ?? u));
}, "RefreshButton");
var Aa = o2(({ resource: e2, resourceNameOrRouteName: t, recordItemId: r, hideText: s = false, accessControl: n2, meta: i, children: a, onClick: p, ...l }) => {
  let { to: m, label: u, title: d, hidden: y, disabled: T, LinkComponent: h } = Zv({ resource: e2 ?? t, id: r, accessControl: n2, meta: i }), c = T || l.disabled;
  return y || l.hidden ? null : import_react105.default.createElement(h, { to: m, replace: false, onClick: (b) => {
    if (c) {
      b.preventDefault();
      return;
    }
    p && (b.preventDefault(), p(b));
  } }, import_react105.default.createElement(button_default, { disabled: c, icon: import_react105.default.createElement(EyeOutlined_default, null), title: d, className: n.ShowButton, ...l }, !s && (a ?? u)));
}, "ShowButton");
var Ze = o2(({ resource: e2, resourceNameOrRouteName: t, hideText: r = false, accessControl: s, meta: n2, children: i, onClick: a, ...p }) => {
  let { to: l, label: m, title: u, hidden: d, disabled: y, LinkComponent: T } = eD({ resource: e2 ?? t, meta: n2, accessControl: s }), h = y || p.disabled;
  return d || p.hidden ? null : import_react106.default.createElement(T, { to: l, replace: false, onClick: (g) => {
    if (h) {
      g.preventDefault();
      return;
    }
    a && (g.preventDefault(), a(g));
  } }, import_react106.default.createElement(button_default, { icon: import_react106.default.createElement(BarsOutlined_default, null), disabled: h, title: u, className: n.ListButton, ...p }, !r && (i ?? m)));
}, "ListButton");
var $a = o2(({ hideText: e2 = false, children: t, ...r }) => {
  let { label: s } = rD();
  return import_react107.default.createElement(button_default, { type: "default", icon: import_react107.default.createElement(ExportOutlined_default, null), className: n.ExportButton, ...r }, !e2 && (t ?? s));
}, "ExportButton");
var Xe = o2(({ hideText: e2 = false, children: t, ...r }) => {
  let { label: s } = tD();
  return import_react108.default.createElement(button_default, { type: "primary", icon: import_react108.default.createElement(SaveOutlined_default, null), className: n.SaveButton, ...r }, !e2 && (t ?? s));
}, "SaveButton");
var ni = o2(({ resourceNameOrRouteName: e2, resource: t, recordItemId: r, hideText: s = false, accessControl: n2, meta: i, children: a, onClick: p, ...l }) => {
  let { to: m, LinkComponent: u, label: d, disabled: y, hidden: T, title: h } = Jv({ id: r, resource: t ?? e2, accessControl: n2, meta: i }), c = y || l.disabled;
  return T || l.hidden ? null : import_react109.default.createElement(u, { to: m, replace: false, onClick: (b) => {
    if (c) {
      b.preventDefault();
      return;
    }
    p && (b.preventDefault(), p(b));
  } }, import_react109.default.createElement(button_default, { icon: import_react109.default.createElement(PlusSquareOutlined_default, null), disabled: c, title: h, className: n.CloneButton, ...l }, !s && (a ?? d)));
}, "CloneButton");
var mi = o2(({ uploadProps: e2, buttonProps: t, hideText: r = false, children: s, loading: n2, ...i }) => {
  let { label: a } = oD();
  return import_react110.default.createElement(upload_default, { ...e2 }, import_react110.default.createElement(button_default, { icon: import_react110.default.createElement(ImportOutlined_default, null), className: n.ImportButton, loading: n2, ...t, ...i }, !r && (s ?? a)));
}, "ImportButton");
var xi = o2(({ canCreate: e2, title: t, children: r, createButtonProps: s, resource: n2, wrapperProps: i, contentProps: a, headerProps: p, breadcrumb: l, headerButtonProps: m, headerButtons: u }) => {
  var B, k;
  let d = z(), { options: { breadcrumb: y } = {} } = ge(), T = oe(), h = ht(), { resource: c, identifier: g } = q(n2), b = e2 ?? (((c == null ? void 0 : c.canCreate) ?? !!(c != null && c.create)) || s), C = typeof l > "u" ? y : l, v = b ? { size: "middle", resource: T === "legacy" ? c == null ? void 0 : c.route : g, ...s } : void 0, P = b ? import_react111.default.createElement(Ht2, { ...v }) : null;
  return import_react111.default.createElement("div", { ...i ?? {} }, import_react111.default.createElement(ke, { title: t ?? d(`${g}.titles.list`, h(((B = c == null ? void 0 : c.meta) == null ? void 0 : B.label) ?? ((k = c == null ? void 0 : c.options) == null ? void 0 : k.label) ?? (c == null ? void 0 : c.label) ?? g, "plural")), extra: u ? import_react111.default.createElement(space_default, { wrap: true, ...m }, typeof u == "function" ? u({ defaultButtons: P, createButtonProps: v }) : u) : P, breadcrumb: typeof C < "u" ? import_react111.default.createElement(import_react111.default.Fragment, null, C) ?? void 0 : import_react111.default.createElement(Le, null), ...p ?? {} }, import_react111.default.createElement("div", { ...a ?? {} }, r)));
}, "List");
var Di = o2(({ title: e2, saveButtonProps: t, children: r, resource: s, isLoading: n2 = false, breadcrumb: i, wrapperProps: a, headerProps: p, contentProps: l, headerButtonProps: m, headerButtons: u, footerButtonProps: d, footerButtons: y, goBack: T }) => {
  var f, R;
  let h = z(), { options: { breadcrumb: c } = {} } = ge(), g = oe(), b = Mo(), { goBack: C } = he(), v = ht(), { resource: P, action: B, identifier: k } = q(s), F = typeof i > "u" ? c : i, D = { ...n2 ? { disabled: true } : {}, ...t, htmlType: "submit" }, L = import_react112.default.createElement(import_react112.default.Fragment, null, import_react112.default.createElement(Xe, { ...D }));
  return import_react112.default.createElement("div", { ...a ?? {} }, import_react112.default.createElement(ke, { backIcon: T, onBack: B !== "list" || typeof B < "u" ? g === "legacy" ? C : b : void 0, title: e2 ?? h(`${k}.titles.create`, `Create ${v(((f = P == null ? void 0 : P.meta) == null ? void 0 : f.label) ?? ((R = P == null ? void 0 : P.options) == null ? void 0 : R.label) ?? (P == null ? void 0 : P.label) ?? k, "singular")}`), breadcrumb: typeof F < "u" ? import_react112.default.createElement(import_react112.default.Fragment, null, F) ?? void 0 : import_react112.default.createElement(Le, null), extra: import_react112.default.createElement(space_default, { wrap: true, ...m ?? {} }, u ? typeof u == "function" ? u({ defaultButtons: null }) : u : null), ...p ?? {} }, import_react112.default.createElement(spin_default, { spinning: n2 }, import_react112.default.createElement(card_default, { bordered: false, actions: [import_react112.default.createElement(space_default, { key: "action-buttons", style: { float: "right", marginRight: 24 }, ...d ?? {} }, y ? typeof y == "function" ? y({ defaultButtons: L, saveButtonProps: D }) : y : L)], ...l ?? {} }, r))));
}, "Create");
var zi = o2(({ title: e2, saveButtonProps: t, mutationMode: r, recordItemId: s, children: n2, deleteButtonProps: i, canDelete: a, resource: p, isLoading: l = false, dataProviderName: m, breadcrumb: u, wrapperProps: d, headerProps: y, contentProps: T, headerButtonProps: h, headerButtons: c, footerButtonProps: g, footerButtons: b, goBack: C, autoSaveProps: v }) => {
  var X, se, _;
  let P = z(), { options: { breadcrumb: B } = {} } = ge(), { mutationMode: k } = _e(), F = r ?? k, D = oe(), L = Mo(), f = Pe(), { goBack: R, list: W } = he(), H = ht(), { resource: x, action: q2, id: $, identifier: A } = q(p), w = Du({ resource: x, action: "list" }), G = s ?? $, S = typeof u > "u" ? B : u, O = (x == null ? void 0 : x.list) && !s, M = a ?? ((((X = x == null ? void 0 : x.meta) == null ? void 0 : X.canDelete) ?? (x == null ? void 0 : x.canDelete)) || i), Y = O ? { ...l ? { disabled: true } : {}, resource: D === "legacy" ? x == null ? void 0 : x.route : A } : void 0, N = { ...l ? { disabled: true } : {}, resource: D === "legacy" ? x == null ? void 0 : x.route : A, recordItemId: G, dataProviderName: m }, z2 = M ? { ...l ? { disabled: true } : {}, resource: D === "legacy" ? x == null ? void 0 : x.route : A, mutationMode: F, onSuccess: () => {
    D === "legacy" ? W((x == null ? void 0 : x.route) ?? (x == null ? void 0 : x.name) ?? "") : f({ to: w });
  }, recordItemId: G, dataProviderName: m, ...i } : void 0, I2 = { ...l ? { disabled: true } : {}, ...t }, E = import_react113.default.createElement(import_react113.default.Fragment, null, v && import_react113.default.createElement(Oo, { ...v }), O && import_react113.default.createElement(Ze, { ...Y }), import_react113.default.createElement(_e2, { ...N })), J = import_react113.default.createElement(import_react113.default.Fragment, null, M && import_react113.default.createElement(Ye, { ...z2 }), import_react113.default.createElement(Xe, { ...I2 }));
  return import_react113.default.createElement("div", { ...d ?? {} }, import_react113.default.createElement(ke, { backIcon: C, onBack: q2 !== "list" && typeof q2 < "u" ? D === "legacy" ? R : L : void 0, title: e2 ?? P(`${A}.titles.edit`, `Edit ${H(((se = x == null ? void 0 : x.meta) == null ? void 0 : se.label) ?? ((_ = x == null ? void 0 : x.options) == null ? void 0 : _.label) ?? (x == null ? void 0 : x.label) ?? A, "singular")}`), extra: import_react113.default.createElement(space_default, { wrap: true, ...h ?? {} }, c ? typeof c == "function" ? c({ defaultButtons: E, listButtonProps: Y, refreshButtonProps: N }) : c : E), breadcrumb: typeof S < "u" ? import_react113.default.createElement(import_react113.default.Fragment, null, S) ?? void 0 : import_react113.default.createElement(Le, null), ...y ?? {} }, import_react113.default.createElement(spin_default, { spinning: l }, import_react113.default.createElement(card_default, { bordered: false, actions: [import_react113.default.createElement(space_default, { key: "footer-buttons", wrap: true, style: { float: "right", marginRight: 24 }, ...g ?? {} }, b ? typeof b == "function" ? b({ defaultButtons: J, deleteButtonProps: z2, saveButtonProps: I2 }) : b : J)], ...T ?? {} }, n2))));
}, "Edit");
var ep = o2(({ title: e2, canEdit: t, canDelete: r, deleteButtonProps: s, isLoading: n2 = false, children: i, resource: a, recordItemId: p, dataProviderName: l, breadcrumb: m, contentProps: u, headerProps: d, wrapperProps: y, headerButtons: T, footerButtons: h, footerButtonProps: c, headerButtonProps: g, goBack: b }) => {
  var z2, I2, E;
  let C = z(), { options: { breadcrumb: v } = {} } = ge(), P = oe(), B = Mo(), k = Pe(), { goBack: F, list: D } = he(), L = ht(), { resource: f, action: R, id: W, identifier: H } = q(a), x = Du({ resource: f, action: "list" }), q2 = p ?? W, $ = typeof m > "u" ? v : m, A = (f == null ? void 0 : f.list) && !p, w = r ?? ((((z2 = f == null ? void 0 : f.meta) == null ? void 0 : z2.canDelete) ?? (f == null ? void 0 : f.canDelete)) || s), G = t ?? (f == null ? void 0 : f.canEdit) ?? !!(f != null && f.edit), S = A ? { resource: P === "legacy" ? f == null ? void 0 : f.route : H } : void 0, O = G ? { ...n2 ? { disabled: true } : {}, type: "primary", resource: P === "legacy" ? f == null ? void 0 : f.route : H, recordItemId: q2 } : void 0, M = w ? { ...n2 ? { disabled: true } : {}, resource: P === "legacy" ? f == null ? void 0 : f.route : H, recordItemId: q2, onSuccess: () => {
    P === "legacy" ? D((f == null ? void 0 : f.route) ?? (f == null ? void 0 : f.name) ?? "") : k({ to: x });
  }, dataProviderName: l, ...s } : void 0, Y = { ...n2 ? { disabled: true } : {}, resource: P === "legacy" ? f == null ? void 0 : f.route : H, recordItemId: q2, dataProviderName: l }, N = import_react114.default.createElement(import_react114.default.Fragment, null, A && import_react114.default.createElement(Ze, { ...S }), G && import_react114.default.createElement(Ot, { ...O }), w && import_react114.default.createElement(Ye, { ...M }), import_react114.default.createElement(_e2, { ...Y }));
  return import_react114.default.createElement("div", { ...y ?? {} }, import_react114.default.createElement(ke, { backIcon: b, onBack: R !== "list" && typeof R < "u" ? P === "legacy" ? F : B : void 0, title: e2 ?? C(`${H}.titles.show`, `Show ${L(((I2 = f == null ? void 0 : f.meta) == null ? void 0 : I2.label) ?? ((E = f == null ? void 0 : f.options) == null ? void 0 : E.label) ?? (f == null ? void 0 : f.label) ?? H, "singular")}`), extra: import_react114.default.createElement(space_default, { key: "extra-buttons", wrap: true, ...g ?? {} }, T ? typeof T == "function" ? T({ defaultButtons: N, deleteButtonProps: M, editButtonProps: O, listButtonProps: S, refreshButtonProps: Y }) : T : N), breadcrumb: typeof $ < "u" ? import_react114.default.createElement(import_react114.default.Fragment, null, $) ?? void 0 : import_react114.default.createElement(Le, null), ...d ?? {} }, import_react114.default.createElement(spin_default, { spinning: n2 }, import_react114.default.createElement(card_default, { bordered: false, actions: h ? [import_react114.default.createElement(space_default, { key: "footer-buttons", wrap: true, ...c }, typeof h == "function" ? h({ defaultButtons: null }) : h)] : void 0, ...u ?? {} }, i))));
}, "Show");
var rp = o2(({ value: e2, ...t }) => import_react115.default.createElement(typography_default.Text, { ...t }, e2), "TextField");
var ap = o2(({ value: e2, ...t }) => import_react116.default.createElement(tag_default, { ...t }, e2 == null ? void 0 : e2.toString()), "TagField");
var lp = o2(({ value: e2, ...t }) => import_react117.default.createElement(typography_default.Link, { href: `mailto:${e2}`, ...t }, e2), "EmailField");
var mp = o2(({ value: e2, imageTitle: t, ...r }) => import_react118.default.createElement(image_default, { ...r, src: e2, title: t }), "ImageField");
var Tp = o2(({ value: e2, valueLabelTrue: t = "true", valueLabelFalse: r = "false", trueIcon: s = import_react119.default.createElement(CheckOutlined_default, null), falseIcon: n2 = import_react119.default.createElement(CloseOutlined_default, null), ...i }) => import_react119.default.createElement(tooltip_default, { title: e2 ? t : r, ...i }, e2 ? import_react119.default.createElement("span", null, s) : import_react119.default.createElement("span", null, n2)), "BooleanField");
var hp = o2(({ value: e2, locales: t, format: r = "L", ...s }) => {
  import_dayjs5.default.extend(import_localizedFormat.default);
  let n2 = import_dayjs5.default.locale();
  return import_react120.default.createElement(typography_default.Text, { ...s }, e2 ? (0, import_dayjs5.default)(e2).locale(t || n2).format(r) : "");
}, "DateField");
var Cp = o2(({ title: e2, src: t, ...r }) => import_react121.default.createElement(qt, { value: t, title: e2, ...r }, e2 ?? t), "FileField");
var qt = o2(({ children: e2, value: t, ...r }) => import_react122.default.createElement(typography_default.Link, { href: t, ...r }, e2 ?? t), "UrlField");
function Lp() {
  return !!(typeof Intl == "object" && Intl && typeof Intl.NumberFormat == "function");
}
o2(Lp, "toLocaleStringSupportsOptions");
var kp = o2(({ value: e2, locale: t, options: r, ...s }) => {
  let n2 = Number(e2);
  return import_react123.default.createElement(typography_default.Text, { ...s }, Lp() ? n2.toLocaleString(t, r) : n2);
}, "NumberField");
var Rp = o2(({ value: e2 = "" }) => import_react124.default.createElement(import_react_markdown.default, { remarkPlugins: [import_remark_gfm.default] }, e2), "MarkdownField");
var Hp = o2((e2) => {
  let { setSelectedKeys: t, confirm: r, clearFilters: s, mapValue: n2 = o2((y) => y, "mapValue"), selectedKeys: i, children: a } = e2, p = z(), l = o2(() => {
    s && s();
  }, "clearFilter"), m = o2(() => {
    let y;
    typeof i == "number" ? y = `${i}` : import_dayjs6.default.isDayjs(i) ? y = [i.toISOString()] : y = i, t(y), r == null || r();
  }, "onFilter"), u = o2((y) => {
    if (typeof y == "object") {
      if (Array.isArray(y)) {
        let b = n2(y, "onChange");
        return t(b);
      }
      let h = !y || !y.target || import_dayjs6.default.isDayjs(y) ? { target: { value: y } } : y, { target: c } = h, g = n2(c.value, "onChange");
      t(g);
      return;
    }
    let T = n2(y, "onChange");
    t(T);
  }, "onChange"), d = import_react125.default.Children.map(a, (y) => import_react125.default.isValidElement(y) ? import_react125.default.cloneElement(y, { onChange: u, value: n2(i, "value") }) : y);
  return import_react125.default.createElement("div", { style: { padding: 10, display: "flex", flexDirection: "column", alignItems: "flex-end" } }, import_react125.default.createElement("div", { style: { marginBottom: 15 } }, d), import_react125.default.createElement(space_default, null, import_react125.default.createElement(button_default, { type: "primary", size: "small", onClick: () => m() }, import_react125.default.createElement(FilterOutlined_default, null), " ", p("buttons.filter", "Filter")), import_react125.default.createElement(button_default, { danger: true, size: "small", onClick: () => l() }, p("buttons.clear", "Clear"))));
}, "FilterDropdown");
var Yp = o2(() => {
  let [e2, t] = (0, import_react126.useState)(), r = z(), { push: s } = he(), n2 = Pe(), i = oe(), { resource: a, action: p } = q();
  return (0, import_react126.useEffect)(() => {
    a && p && t(r("pages.error.info", { action: p, resource: a == null ? void 0 : a.name }, `You may have forgotten to add the "${p}" component to "${a == null ? void 0 : a.name}" resource.`));
  }, [a, p]), import_react126.default.createElement(result_default, { status: "404", title: "404", extra: import_react126.default.createElement(space_default, { direction: "vertical", size: "large" }, import_react126.default.createElement(space_default, null, import_react126.default.createElement(typography_default.Text, null, r("pages.error.404", "Sorry, the page you visited does not exist.")), e2 && import_react126.default.createElement(tooltip_default, { title: e2 }, import_react126.default.createElement(InfoCircleOutlined_default, {}))), import_react126.default.createElement(button_default, { type: "primary", onClick: () => {
    i === "legacy" ? s("/") : n2({ to: "/" });
  } }, r("pages.error.backHome", "Back Home"))) });
}, "ErrorComponent");
var jo = { background: "radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)", backgroundSize: "cover" };
var Wo = { maxWidth: "408px", margin: "auto" };
var qo = { textAlign: "center", color: "#626262", fontSize: "30px", letterSpacing: "-0.04em" };
var Go = { display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px" };
var nl = o2(() => {
  let [e2] = form_default.useForm(), t = z(), r = ie(), { mutate: s, isLoading: n2 } = Ht({ v3LegacyAuthProviderCompatible: !!(r != null && r.isLegacy) }), i = import_react127.default.createElement(typography_default.Title, { level: 3, style: qo }, t("pages.login.title", "Sign in your account"));
  return import_react127.default.createElement(layout_default, { style: jo }, import_react127.default.createElement(row_default, { justify: "center", align: "middle", style: { height: "100vh" } }, import_react127.default.createElement(col_default, { xs: 22 }, import_react127.default.createElement("div", { style: Wo }, import_react127.default.createElement("div", { style: Go }, import_react127.default.createElement("img", { src: "https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg", alt: "Refine Logo" })), import_react127.default.createElement(card_default, { title: i, headStyle: { borderBottom: 0 } }, import_react127.default.createElement(form_default, { layout: "vertical", form: e2, onFinish: (a) => {
    s(a);
  }, requiredMark: false, initialValues: { remember: false } }, import_react127.default.createElement(form_default.Item, { name: "username", label: t("pages.login.username", "Username"), rules: [{ required: true }] }, import_react127.default.createElement(input_default, { size: "large", placeholder: t("pages.login.username", "Username") })), import_react127.default.createElement(form_default.Item, { name: "password", label: t("pages.login.password", "Password"), rules: [{ required: true }], style: { marginBottom: "12px" } }, import_react127.default.createElement(input_default, { type: "password", placeholder: "●●●●●●●●", size: "large" })), import_react127.default.createElement("div", { style: { marginBottom: "12px" } }, import_react127.default.createElement(form_default.Item, { name: "remember", valuePropName: "checked", noStyle: true }, import_react127.default.createElement(checkbox_default, { style: { fontSize: "12px" } }, t("pages.login.remember", "Remember me"))), import_react127.default.createElement("a", { style: { float: "right", fontSize: "12px" }, href: "#" }, t("pages.login.forgotPassword", "Forgot password?"))), import_react127.default.createElement(button_default, { type: "primary", size: "large", htmlType: "submit", loading: n2, block: true }, t("pages.login.signin", "Sign in"))), import_react127.default.createElement("div", { style: { marginTop: 8 } }, import_react127.default.createElement(typography_default.Text, { style: { fontSize: 12 } }, t("pages.login.noAccount", "Don’t have an account?"), " ", import_react127.default.createElement("a", { href: "#", style: { fontWeight: "bold" } }, t("pages.login.signup", "Sign up")))))))));
}, "LoginPage");
var Oe = { root: { height: "100vh", backgroundImage: "url('https://refine.ams3.cdn.digitaloceanspaces.com/login-background/background.png')", backgroundSize: "cover", backgroundColor: "#331049" }, title: { color: "white", fontWeight: 800, fontSize: "64px", marginBottom: "8px" }, p1: { color: "white", marginBottom: 0, fontSize: "20px", fontWeight: "bold" }, p2: { color: "white", fontSize: "20px" }, code: { backgroundColor: "white", color: "#331049" } };
var cl = o2(() => re.createElement(row_default, { align: "middle", justify: "center", style: Oe.root }, re.createElement(col_default, { style: { textAlign: "center" } }, re.createElement("img", { style: { marginBottom: "48px" }, src: "https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg", alt: "Refine Logo" }), re.createElement(typography_default.Title, { style: Oe.title }, "Welcome on board"), re.createElement("p", { style: Oe.p1 }, "Your configuration is completed."), re.createElement("p", { style: Oe.p2 }, "Now you can get started by adding your resources to the", " ", re.createElement("code", { style: Oe.code }, "resources"), " property of", " ", re.createElement("code", { style: Oe.code }, "<Refine>")), re.createElement(space_default, { size: "large", wrap: true, style: { marginTop: "70px", justifyContent: "center" } }, re.createElement("a", { href: "https://refine.dev", target: "_blank", rel: "noreferrer" }, re.createElement(button_default, { size: "large", icon: re.createElement(ReadOutlined_default, null) }, "Documentation")), re.createElement("a", { href: "https://refine.dev/examples", target: "_blank", rel: "noreferrer" }, re.createElement(button_default, { size: "large", icon: re.createElement(FolderOutlined_default, null) }, "Examples")), re.createElement("a", { href: "https://discord.gg/refine", target: "_blank", rel: "noreferrer" }, re.createElement(button_default, { size: "large", icon: re.createElement(TeamOutlined_default, null) }, "Community"))))), "ReadyPage");
var Tl = o2(() => import_react128.default.createElement(mc, null), "WelcomePage");
var De = {};
var Ee = { maxWidth: "400px", margin: "auto", padding: "32px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.03)" };
var we = { borderBottom: 0, padding: 0 };
var Re = { padding: 0, marginTop: "32px" };
var Ie = { textAlign: "center", marginBottom: 0, fontSize: "24px", lineHeight: "32px", fontWeight: 700, overflowWrap: "break-word", hyphens: "manual", textOverflow: "unset", whiteSpace: "pre-wrap" };
var $t = o2(({ providers: e2, registerLink: t, forgotPasswordLink: r, rememberMe: s, contentProps: n2, wrapperProps: i, renderContent: a, formProps: p, title: l, hideForm: m, mutationVariables: u }) => {
  let { token: d } = theme_default.useToken(), [y] = form_default.useForm(), T = z(), h = oe(), c = yt(), { Link: g } = pe(), b = h === "legacy" ? g : c, C = ie(), { mutate: v, isLoading: P } = Ht({ v3LegacyAuthProviderCompatible: !!(C != null && C.isLegacy) }), B = l === false ? null : import_react130.default.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: "32px", fontSize: "20px" } }, l ?? import_react130.default.createElement(be, { collapsed: false })), k = import_react130.default.createElement(typography_default.Title, { level: 3, style: { color: d.colorPrimaryTextHover, ...Ie } }, T("pages.login.title", "Sign in to your account")), F = o2(() => e2 && e2.length > 0 ? import_react130.default.createElement(import_react130.default.Fragment, null, e2.map((L) => import_react130.default.createElement(button_default, { key: L.name, type: "default", block: true, icon: L.icon, style: { display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: "8px" }, onClick: () => v({ ...u, providerName: L.name }) }, L.label)), !m && import_react130.default.createElement(divider_default, null, import_react130.default.createElement(typography_default.Text, { style: { color: d.colorTextLabel } }, T("pages.login.divider", "or")))) : null, "renderProviders"), D = import_react130.default.createElement(card_default, { title: k, headStyle: we, bodyStyle: Re, style: { ...Ee, backgroundColor: d.colorBgElevated }, ...n2 ?? {} }, F(), !m && import_react130.default.createElement(form_default, { layout: "vertical", form: y, onFinish: (L) => v({ ...L, ...u }), requiredMark: false, initialValues: { remember: false }, ...p }, import_react130.default.createElement(form_default.Item, { name: "email", label: T("pages.login.fields.email", "Email"), rules: [{ required: true, message: T("pages.login.errors.requiredEmail", "Email is required") }, { type: "email", message: T("pages.login.errors.validEmail", "Invalid email address") }] }, import_react130.default.createElement(input_default, { size: "large", placeholder: T("pages.login.fields.email", "Email") })), import_react130.default.createElement(form_default.Item, { name: "password", label: T("pages.login.fields.password", "Password"), rules: [{ required: true, message: T("pages.login.errors.requiredPassword", "Password is required") }] }, import_react130.default.createElement(input_default, { type: "password", autoComplete: "current-password", placeholder: "●●●●●●●●", size: "large" })), import_react130.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "24px" } }, s ?? import_react130.default.createElement(form_default.Item, { name: "remember", valuePropName: "checked", noStyle: true }, import_react130.default.createElement(checkbox_default, { style: { fontSize: "12px" } }, T("pages.login.buttons.rememberMe", "Remember me"))), r ?? import_react130.default.createElement(b, { style: { color: d.colorPrimaryTextHover, fontSize: "12px", marginLeft: "auto" }, to: "/forgot-password" }, T("pages.login.buttons.forgotPassword", "Forgot password?"))), !m && import_react130.default.createElement(form_default.Item, null, import_react130.default.createElement(button_default, { type: "primary", size: "large", htmlType: "submit", loading: P, block: true }, T("pages.login.signin", "Sign in")))), t ?? import_react130.default.createElement("div", { style: { marginTop: m ? 16 : 8 } }, import_react130.default.createElement(typography_default.Text, { style: { fontSize: 12 } }, T("pages.login.buttons.noAccount", "Don’t have an account?"), " ", import_react130.default.createElement(b, { to: "/register", style: { fontWeight: "bold", color: d.colorPrimaryTextHover } }, T("pages.login.signup", "Sign up")))));
  return import_react130.default.createElement(layout_default, { style: De, ...i ?? {} }, import_react130.default.createElement(row_default, { justify: "center", align: m ? "top" : "middle", style: { padding: "16px 0", minHeight: "100dvh", paddingTop: m ? "15dvh" : "16px" } }, import_react130.default.createElement(col_default, { xs: 22 }, a ? a(D, B) : import_react130.default.createElement(import_react130.default.Fragment, null, B, D))));
}, "LoginPage");
var Yt = o2(({ providers: e2, loginLink: t, wrapperProps: r, contentProps: s, renderContent: n2, formProps: i, title: a, hideForm: p, mutationVariables: l }) => {
  let { token: m } = theme_default.useToken(), [u] = form_default.useForm(), d = z(), y = oe(), T = yt(), { Link: h } = pe(), c = y === "legacy" ? h : T, g = ie(), { mutate: b, isLoading: C } = co({ v3LegacyAuthProviderCompatible: !!(g != null && g.isLegacy) }), v = a === false ? null : import_react131.default.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: "32px", fontSize: "20px" } }, a ?? import_react131.default.createElement(be, { collapsed: false })), P = import_react131.default.createElement(typography_default.Title, { level: 3, style: { color: m.colorPrimaryTextHover, ...Ie } }, d("pages.register.title", "Sign up for your account")), B = o2(() => e2 && e2.length > 0 ? import_react131.default.createElement(import_react131.default.Fragment, null, e2.map((F) => import_react131.default.createElement(button_default, { key: F.name, type: "default", block: true, icon: F.icon, style: { display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: "8px" }, onClick: () => b({ ...l, providerName: F.name }) }, F.label)), !p && import_react131.default.createElement(divider_default, null, import_react131.default.createElement(typography_default.Text, { style: { color: m.colorTextLabel } }, d("pages.register.divider", d("pages.login.divider", "or"))))) : null, "renderProviders"), k = import_react131.default.createElement(card_default, { title: P, headStyle: we, bodyStyle: Re, style: { ...Ee, backgroundColor: m.colorBgElevated }, ...s ?? {} }, B(), !p && import_react131.default.createElement(form_default, { layout: "vertical", form: u, onFinish: (F) => b({ ...l, ...F }), requiredMark: false, ...i }, import_react131.default.createElement(form_default.Item, { name: "email", label: d("pages.register.email", "Email"), rules: [{ required: true, message: d("pages.register.errors.requiredEmail", "Email is required") }, { type: "email", message: d("pages.register.errors.validEmail", "Invalid email address") }] }, import_react131.default.createElement(input_default, { size: "large", placeholder: d("pages.register.fields.email", "Email") })), import_react131.default.createElement(form_default.Item, { name: "password", label: d("pages.register.fields.password", "Password"), rules: [{ required: true, message: d("pages.register.errors.requiredPassword", "Password is required") }] }, import_react131.default.createElement(input_default, { type: "password", placeholder: "●●●●●●●●", size: "large" })), import_react131.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "24px" } }, t ?? import_react131.default.createElement(typography_default.Text, { style: { fontSize: 12, marginLeft: "auto" } }, d("pages.register.buttons.haveAccount", d("pages.login.buttons.haveAccount", "Have an account?")), " ", import_react131.default.createElement(c, { style: { fontWeight: "bold", color: m.colorPrimaryTextHover }, to: "/login" }, d("pages.register.signin", d("pages.login.signin", "Sign in"))))), import_react131.default.createElement(form_default.Item, { style: { marginBottom: 0 } }, import_react131.default.createElement(button_default, { type: "primary", size: "large", htmlType: "submit", loading: C, block: true }, d("pages.register.buttons.submit", "Sign up")))), p && t !== false && import_react131.default.createElement("div", { style: { marginTop: p ? 16 : 8 } }, import_react131.default.createElement(typography_default.Text, { style: { fontSize: 12 } }, d("pages.register.buttons.haveAccount", d("pages.login.buttons.haveAccount", "Have an account?")), " ", import_react131.default.createElement(c, { style: { fontWeight: "bold", color: m.colorPrimaryTextHover }, to: "/login" }, d("pages.register.signin", d("pages.login.signin", "Sign in"))))));
  return import_react131.default.createElement(layout_default, { style: De, ...r ?? {} }, import_react131.default.createElement(row_default, { justify: "center", align: p ? "top" : "middle", style: { padding: "16px 0", minHeight: "100dvh", paddingTop: p ? "15dvh" : "16px" } }, import_react131.default.createElement(col_default, { xs: 22 }, n2 ? n2(k, v) : import_react131.default.createElement(import_react131.default.Fragment, null, v, k))));
}, "RegisterPage");
var _t = o2(({ loginLink: e2, wrapperProps: t, contentProps: r, renderContent: s, formProps: n2, title: i, mutationVariables: a }) => {
  let { token: p } = theme_default.useToken(), [l] = form_default.useForm(), m = z(), u = oe(), d = yt(), { Link: y } = pe(), T = u === "legacy" ? y : d, { mutate: h, isLoading: c } = lo(), g = i === false ? null : import_react132.default.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: "32px", fontSize: "20px" } }, i ?? import_react132.default.createElement(be, { collapsed: false })), b = import_react132.default.createElement(typography_default.Title, { level: 3, style: { color: p.colorPrimaryTextHover, ...Ie } }, m("pages.forgotPassword.title", "Forgot your password?")), C = import_react132.default.createElement(card_default, { title: b, headStyle: we, bodyStyle: Re, style: { ...Ee, backgroundColor: p.colorBgElevated }, ...r ?? {} }, import_react132.default.createElement(form_default, { layout: "vertical", form: l, onFinish: (v) => h({ ...v, ...a }), requiredMark: false, ...n2 }, import_react132.default.createElement(form_default.Item, { name: "email", label: m("pages.forgotPassword.fields.email", "Email"), rules: [{ required: true, message: m("pages.forgotPassword.errors.requiredEmail", "Email is required") }, { type: "email", message: m("pages.forgotPassword.errors.validEmail", "Invalid email address") }] }, import_react132.default.createElement(input_default, { type: "email", size: "large", placeholder: m("pages.forgotPassword.fields.email", "Email") })), import_react132.default.createElement("div", { style: { display: "flex", justifyContent: "space-between" } }, e2 ?? import_react132.default.createElement(typography_default.Text, { style: { fontSize: 12, marginLeft: "auto" } }, m("pages.forgotPassword.buttons.haveAccount", m("pages.register.buttons.haveAccount", "Have an account? ")), " ", import_react132.default.createElement(T, { style: { fontWeight: "bold", color: p.colorPrimaryTextHover }, to: "/login" }, m("pages.forgotPassword.signin", m("pages.login.signin", "Sign in"))))), import_react132.default.createElement(form_default.Item, { style: { marginTop: "24px", marginBottom: 0 } }, import_react132.default.createElement(button_default, { type: "primary", size: "large", htmlType: "submit", loading: c, block: true }, m("pages.forgotPassword.buttons.submit", "Send reset instructions")))));
  return import_react132.default.createElement(layout_default, { style: De, ...t ?? {} }, import_react132.default.createElement(row_default, { justify: "center", align: "middle", style: { padding: "16px 0", minHeight: "100dvh" } }, import_react132.default.createElement(col_default, { xs: 22 }, s ? s(C, g) : import_react132.default.createElement(import_react132.default.Fragment, null, g, C))));
}, "ForgotPasswordPage");
var Zt = o2(({ wrapperProps: e2, contentProps: t, renderContent: r, formProps: s, title: n2, mutationVariables: i }) => {
  let { token: a } = theme_default.useToken(), [p] = form_default.useForm(), l = z(), m = ie(), { mutate: u, isLoading: d } = fo({ v3LegacyAuthProviderCompatible: !!(m != null && m.isLegacy) }), y = n2 === false ? null : import_react133.default.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: "32px", fontSize: "20px" } }, n2 ?? import_react133.default.createElement(be, { collapsed: false })), T = import_react133.default.createElement(typography_default.Title, { level: 3, style: { color: a.colorPrimaryTextHover, ...Ie } }, l("pages.updatePassword.title", "Set New Password")), h = import_react133.default.createElement(card_default, { title: T, headStyle: we, bodyStyle: Re, style: { ...Ee, backgroundColor: a.colorBgElevated }, ...t ?? {} }, import_react133.default.createElement(form_default, { layout: "vertical", form: p, onFinish: (c) => u({ ...c, ...i }), requiredMark: false, ...s }, import_react133.default.createElement(form_default.Item, { name: "password", label: l("pages.updatePassword.fields.password", "New Password"), rules: [{ required: true, message: l("pages.updatePassword.errors.requiredPassword", "Password is required") }], style: { marginBottom: "12px" } }, import_react133.default.createElement(input_default, { type: "password", placeholder: "●●●●●●●●", size: "large" })), import_react133.default.createElement(form_default.Item, { name: "confirmPassword", label: l("pages.updatePassword.fields.confirmPassword", "Confirm New Password"), hasFeedback: true, dependencies: ["password"], rules: [{ required: true, message: l("pages.updatePassword.errors.requiredConfirmPassword", "Confirm password is required") }, ({ getFieldValue: c }) => ({ validator(g, b) {
    return !b || c("password") === b ? Promise.resolve() : Promise.reject(new Error(l("pages.updatePassword.errors.confirmPasswordNotMatch", "Passwords do not match")));
  } })] }, import_react133.default.createElement(input_default, { type: "password", placeholder: "●●●●●●●●", size: "large" })), import_react133.default.createElement(form_default.Item, { style: { marginBottom: 0 } }, import_react133.default.createElement(button_default, { type: "primary", size: "large", htmlType: "submit", loading: d, block: true }, l("pages.updatePassword.buttons.submit", "Update")))));
  return import_react133.default.createElement(layout_default, { style: De, ...e2 ?? {} }, import_react133.default.createElement(row_default, { justify: "center", align: "middle", style: { padding: "16px 0", minHeight: "100dvh" } }, import_react133.default.createElement(col_default, { xs: 22 }, r ? r(h, y) : import_react133.default.createElement(import_react133.default.Fragment, null, y, h))));
}, "UpdatePasswordPage");
var dd = o2((e2) => {
  let { type: t } = e2;
  return import_react129.default.createElement(import_react129.default.Fragment, null, o2(() => {
    switch (t) {
      case "register":
        return import_react129.default.createElement(Yt, { ...e2 });
      case "forgotPassword":
        return import_react129.default.createElement(_t, { ...e2 });
      case "updatePassword":
        return import_react129.default.createElement(Zt, { ...e2 });
      default:
        return import_react129.default.createElement($t, { ...e2 });
    }
  }, "renderView")());
}, "AuthPage");
var Le = o2(({ breadcrumbProps: e2, showHome: t = true, hideIcons: r = false, meta: s, minItems: n2 = 2 }) => {
  let i = oe(), { breadcrumbs: a } = fb({ meta: s }), p = yt(), { Link: l } = pe(), { hasDashboard: m } = ge(), { resources: u } = q(), d = as("/", u), y = i === "legacy" ? l : p;
  if (a.length < n2) return null;
  let T = a.map(({ label: c, icon: g, href: b }) => ({ key: `breadcrumb-item-${c}`, title: import_react134.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 4 } }, !r && g, b ? import_react134.default.createElement(y, { to: b }, c) : import_react134.default.createElement("span", null, c)) }));
  return import_react134.default.createElement(breadcrumb_default, { items: o2(() => {
    var c, g;
    return t && (m || d.found) ? [{ key: "breadcrumb-item-home", title: import_react134.default.createElement(y, { to: "/" }, ((g = (c = d == null ? void 0 : d.resource) == null ? void 0 : c.meta) == null ? void 0 : g.icon) ?? import_react134.default.createElement(HomeOutlined_default, null)) }, ...T] : T;
  }, "getBreadcrumbItems")(), ...e2 });
}, "Breadcrumb");
var ke = o2(({ children: e2, ...t }) => {
  var p;
  let r = (p = (0, import_react135.useContext)(config_provider_default.ConfigContext)) == null ? void 0 : p.direction, s = o2(() => import_react135.default.createElement(button_default, { type: "text", icon: import_react135.default.createElement(r === "rtl" ? ArrowRightOutlined_default : ArrowLeftOutlined_default, null) }), "renderBackButton"), n2 = typeof t.backIcon > "u" ? s() : t.backIcon, i = typeof t.title == "string" ? import_react135.default.createElement(typography_default.Title, { className: o.Title, level: 4, style: { marginBottom: 0 } }, t.title) : t.title, a = typeof t.title == "string" ? import_react135.default.createElement(typography_default.Title, { className: o.SubTitle, level: 5, type: "secondary", style: { marginBottom: 0 } }, t.subTitle) : t.subTitle;
  return import_react135.default.createElement(PageHeader, { ...t, backIcon: n2, title: i, subTitle: a, style: { padding: 0, ...t.style } }, e2);
}, "PageHeader");
var Oo = o2(({ status: e2, elements: { success: t = import_react136.default.createElement(ut, { translationKey: "autoSave.success", defaultMessage: "saved", icon: import_react136.default.createElement(CheckCircleOutlined_default, null) }), error: r = import_react136.default.createElement(ut, { translationKey: "autoSave.error", defaultMessage: "auto save failure", icon: import_react136.default.createElement(ExclamationCircleOutlined_default, null) }), loading: s = import_react136.default.createElement(ut, { translationKey: "autoSave.loading", defaultMessage: "saving...", icon: import_react136.default.createElement(SyncOutlined_default, null) }), idle: n2 = import_react136.default.createElement(ut, { translationKey: "autoSave.idle", defaultMessage: "waiting for changes", icon: import_react136.default.createElement(EllipsisOutlined_default, null) }) } = {} }) => import_react136.default.createElement(Vc, { status: e2, elements: { success: t, error: r, loading: s, idle: n2 } }), "AutoSaveIndicator");
var ut = o2(({ translationKey: e2, defaultMessage: t, icon: r }) => {
  let s = z(), { token: n2 } = theme_default.useToken();
  return import_react136.default.createElement(typography_default.Text, { style: { marginRight: 5, color: n2.colorTextTertiary, fontSize: ".8rem" } }, s(e2, t), import_react136.default.createElement("span", { style: { marginLeft: ".2rem" } }, r));
}, "Message");
var Vd = o2((e2, t) => e2 && (t === "value" ? e2.map((r) => typeof r == "string" ? (0, import_dayjs7.default)(r) : r) : t === "onChange" && e2.every(import_dayjs7.default.isDayjs) ? e2.map((r) => (0, import_dayjs7.default)(r).toISOString()) : e2), "rangePickerFilterMapper");
var Ud = o2((e2) => {
  let { fileList: t } = e2;
  return [...t];
}, "getValueFromEvent");
var ah = { Blue: { token: { colorPrimary: "#1677FF" } }, Purple: { token: { colorPrimary: "#722ED1" } }, Magenta: { token: { colorPrimary: "#EB2F96" } }, Red: { token: { colorPrimary: "#F5222D" } }, Orange: { token: { colorPrimary: "#FA541C" } }, Yellow: { token: { colorPrimary: "#FAAD14" } }, Green: { token: { colorPrimary: "#52C41A" } } };
export {
  dd as AuthPage,
  Oo as AutoSaveIndicator,
  Tp as BooleanField,
  Le as Breadcrumb,
  ni as CloneButton,
  Di as Create,
  Ht2 as CreateButton,
  hp as DateField,
  Ye as DeleteButton,
  zi as Edit,
  Ot as EditButton,
  lp as EmailField,
  Yp as ErrorComponent,
  $a as ExportButton,
  Cp as FileField,
  Hp as FilterDropdown,
  Bt as Header,
  mp as ImageField,
  mi as ImportButton,
  zs as Layout,
  xi as List,
  Ze as ListButton,
  nl as LoginPage,
  Rp as MarkdownField,
  kp as NumberField,
  ke as PageHeader,
  cl as ReadyPage,
  ah as RefineThemes,
  _e2 as RefreshButton,
  Xe as SaveButton,
  ep as Show,
  Aa as ShowButton,
  Ct as Sider,
  ap as TagField,
  rp as TextField,
  Dt as ThemedHeader,
  It as ThemedHeaderV2,
  hn as ThemedLayout,
  He as ThemedLayoutContext,
  xt as ThemedLayoutContextProvider,
  ra as ThemedLayoutV2,
  Lt as ThemedSider,
  Rt as ThemedSiderV2,
  kt as ThemedTitle,
  be as ThemedTitleV2,
  Ft as Title,
  qt as UrlField,
  Tl as WelcomePage,
  wr as getDefaultFilter,
  Er as getDefaultSortOrder,
  Ud as getValueFromEvent,
  ft as mapAntdFilterToCrudFilter,
  yt2 as mapAntdSorterToCrudSorting,
  ac as notificationProvider,
  Vd as rangePickerFilterMapper,
  mm as useCheckboxGroup,
  no2 as useDrawerForm,
  qr as useEditableTable,
  Um as useFileUploadState,
  he2 as useForm,
  Cm as useImport,
  to2 as useModal,
  ro as useModalForm,
  ic as useNotificationProvider,
  Tm as useRadioGroup,
  pm as useSelect,
  qm as useSiderVisible,
  ns as useSimpleList,
  ao as useStepsForm,
  gt as useTable,
  fo2 as useThemedLayoutContext
};
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

react-is/cjs/react-is.development.js:
  (** @license React v17.0.2
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

repeat-string/index.js:
  (*!
   * repeat-string <https://github.com/jonschlinkert/repeat-string>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=@refinedev_antd.js.map
