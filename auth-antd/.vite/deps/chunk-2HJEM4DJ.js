import {
  require_react_dom
} from "./chunk-AGL3XMSE.js";
import {
  require_react
} from "./chunk-KL4SNAOQ.js";
import {
  __commonJS,
  __require,
  __toESM
} from "./chunk-PLDDJCW6.js";

// node_modules/stackframe/stackframe.js
var require_stackframe = __commonJS({
  "node_modules/stackframe/stackframe.js"(exports2, module2) {
    (function(root2, factory) {
      "use strict";
      if (typeof define === "function" && define.amd) {
        define("stackframe", [], factory);
      } else if (typeof exports2 === "object") {
        module2.exports = factory();
      } else {
        root2.StackFrame = factory();
      }
    })(exports2, function() {
      "use strict";
      function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
      }
      function _getter(p3) {
        return function() {
          return this[p3];
        };
      }
      var booleanProps = ["isConstructor", "isEval", "isNative", "isToplevel"];
      var numericProps = ["columnNumber", "lineNumber"];
      var stringProps = ["fileName", "functionName", "source"];
      var arrayProps = ["args"];
      var objectProps = ["evalOrigin"];
      var props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);
      function StackFrame(obj) {
        if (!obj) return;
        for (var i3 = 0; i3 < props.length; i3++) {
          if (obj[props[i3]] !== void 0) {
            this["set" + _capitalize(props[i3])](obj[props[i3]]);
          }
        }
      }
      StackFrame.prototype = {
        getArgs: function() {
          return this.args;
        },
        setArgs: function(v) {
          if (Object.prototype.toString.call(v) !== "[object Array]") {
            throw new TypeError("Args must be an Array");
          }
          this.args = v;
        },
        getEvalOrigin: function() {
          return this.evalOrigin;
        },
        setEvalOrigin: function(v) {
          if (v instanceof StackFrame) {
            this.evalOrigin = v;
          } else if (v instanceof Object) {
            this.evalOrigin = new StackFrame(v);
          } else {
            throw new TypeError("Eval Origin must be an Object or StackFrame");
          }
        },
        toString: function() {
          var fileName = this.getFileName() || "";
          var lineNumber = this.getLineNumber() || "";
          var columnNumber = this.getColumnNumber() || "";
          var functionName = this.getFunctionName() || "";
          if (this.getIsEval()) {
            if (fileName) {
              return "[eval] (" + fileName + ":" + lineNumber + ":" + columnNumber + ")";
            }
            return "[eval]:" + lineNumber + ":" + columnNumber;
          }
          if (functionName) {
            return functionName + " (" + fileName + ":" + lineNumber + ":" + columnNumber + ")";
          }
          return fileName + ":" + lineNumber + ":" + columnNumber;
        }
      };
      StackFrame.fromString = function StackFrame$$fromString(str) {
        var argsStartIndex = str.indexOf("(");
        var argsEndIndex = str.lastIndexOf(")");
        var functionName = str.substring(0, argsStartIndex);
        var args = str.substring(argsStartIndex + 1, argsEndIndex).split(",");
        var locationString = str.substring(argsEndIndex + 1);
        if (locationString.indexOf("@") === 0) {
          var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, "");
          var fileName = parts[1];
          var lineNumber = parts[2];
          var columnNumber = parts[3];
        }
        return new StackFrame({
          functionName,
          args: args || void 0,
          fileName,
          lineNumber: lineNumber || void 0,
          columnNumber: columnNumber || void 0
        });
      };
      for (var i2 = 0; i2 < booleanProps.length; i2++) {
        StackFrame.prototype["get" + _capitalize(booleanProps[i2])] = _getter(booleanProps[i2]);
        StackFrame.prototype["set" + _capitalize(booleanProps[i2])] = /* @__PURE__ */ function(p3) {
          return function(v) {
            this[p3] = Boolean(v);
          };
        }(booleanProps[i2]);
      }
      for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype["get" + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype["set" + _capitalize(numericProps[j])] = /* @__PURE__ */ function(p3) {
          return function(v) {
            if (!_isNumber(v)) {
              throw new TypeError(p3 + " must be a Number");
            }
            this[p3] = Number(v);
          };
        }(numericProps[j]);
      }
      for (var k2 = 0; k2 < stringProps.length; k2++) {
        StackFrame.prototype["get" + _capitalize(stringProps[k2])] = _getter(stringProps[k2]);
        StackFrame.prototype["set" + _capitalize(stringProps[k2])] = /* @__PURE__ */ function(p3) {
          return function(v) {
            this[p3] = String(v);
          };
        }(stringProps[k2]);
      }
      return StackFrame;
    });
  }
});

// node_modules/error-stack-parser/error-stack-parser.js
var require_error_stack_parser = __commonJS({
  "node_modules/error-stack-parser/error-stack-parser.js"(exports2, module2) {
    (function(root2, factory) {
      "use strict";
      if (typeof define === "function" && define.amd) {
        define("error-stack-parser", ["stackframe"], factory);
      } else if (typeof exports2 === "object") {
        module2.exports = factory(require_stackframe());
      } else {
        root2.ErrorStackParser = factory(root2.StackFrame);
      }
    })(exports2, function ErrorStackParser(StackFrame) {
      "use strict";
      var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
      var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
      var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
      return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
          if (typeof error.stacktrace !== "undefined" || typeof error["opera#sourceloc"] !== "undefined") {
            return this.parseOpera(error);
          } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
            return this.parseV8OrIE(error);
          } else if (error.stack) {
            return this.parseFFOrSafari(error);
          } else {
            throw new Error("Cannot parse given Error object");
          }
        },
        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
          if (urlLike.indexOf(":") === -1) {
            return [urlLike];
          }
          var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
          var parts = regExp.exec(urlLike.replace(/[()]/g, ""));
          return [parts[1], parts[2] || void 0, parts[3] || void 0];
        },
        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
          var filtered = error.stack.split("\n").filter(function(line) {
            return !!line.match(CHROME_IE_STACK_REGEXP);
          }, this);
          return filtered.map(function(line) {
            if (line.indexOf("(eval ") > -1) {
              line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, "");
            }
            var sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, "");
            var location = sanitizedLine.match(/ (\(.+\)$)/);
            sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
            var locationParts = this.extractLocation(location ? location[1] : sanitizedLine);
            var functionName = location && sanitizedLine || void 0;
            var fileName = ["eval", "<anonymous>"].indexOf(locationParts[0]) > -1 ? void 0 : locationParts[0];
            return new StackFrame({
              functionName,
              fileName,
              lineNumber: locationParts[1],
              columnNumber: locationParts[2],
              source: line
            });
          }, this);
        },
        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
          var filtered = error.stack.split("\n").filter(function(line) {
            return !line.match(SAFARI_NATIVE_CODE_REGEXP);
          }, this);
          return filtered.map(function(line) {
            if (line.indexOf(" > eval") > -1) {
              line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1");
            }
            if (line.indexOf("@") === -1 && line.indexOf(":") === -1) {
              return new StackFrame({
                functionName: line
              });
            } else {
              var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
              var matches = line.match(functionNameRegex);
              var functionName = matches && matches[1] ? matches[1] : void 0;
              var locationParts = this.extractLocation(line.replace(functionNameRegex, ""));
              return new StackFrame({
                functionName,
                fileName: locationParts[0],
                lineNumber: locationParts[1],
                columnNumber: locationParts[2],
                source: line
              });
            }
          }, this);
        },
        parseOpera: function ErrorStackParser$$parseOpera(e) {
          if (!e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length) {
            return this.parseOpera9(e);
          } else if (!e.stack) {
            return this.parseOpera10(e);
          } else {
            return this.parseOpera11(e);
          }
        },
        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
          var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
          var lines = e.message.split("\n");
          var result = [];
          for (var i2 = 2, len = lines.length; i2 < len; i2 += 2) {
            var match = lineRE.exec(lines[i2]);
            if (match) {
              result.push(new StackFrame({
                fileName: match[2],
                lineNumber: match[1],
                source: lines[i2]
              }));
            }
          }
          return result;
        },
        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
          var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
          var lines = e.stacktrace.split("\n");
          var result = [];
          for (var i2 = 0, len = lines.length; i2 < len; i2 += 2) {
            var match = lineRE.exec(lines[i2]);
            if (match) {
              result.push(
                new StackFrame({
                  functionName: match[3] || void 0,
                  fileName: match[2],
                  lineNumber: match[1],
                  source: lines[i2]
                })
              );
            }
          }
          return result;
        },
        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
          var filtered = error.stack.split("\n").filter(function(line) {
            return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
          }, this);
          return filtered.map(function(line) {
            var tokens = line.split("@");
            var locationParts = this.extractLocation(tokens.pop());
            var functionCall = tokens.shift() || "";
            var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0;
            var argsRaw;
            if (functionCall.match(/\(([^)]*)\)/)) {
              argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, "$1");
            }
            var args = argsRaw === void 0 || argsRaw === "[arguments not available]" ? void 0 : argsRaw.split(",");
            return new StackFrame({
              functionName,
              args,
              fileName: locationParts[0],
              lineNumber: locationParts[1],
              columnNumber: locationParts[2],
              source: line
            });
          }, this);
        }
      };
    });
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports2) {
    "use strict";
    (function() {
      function is2(x, y2) {
        return x === y2 && (0 !== x || 1 / x === 1 / y2) || x !== x && y2 !== y2;
      }
      function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React11.startTransition || (didWarnOld18Alpha = true, console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
          var cachedValue = getSnapshot();
          objectIs(value, cachedValue) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        }
        cachedValue = useState5({
          inst: { value, getSnapshot }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe, value, getSnapshot]
        );
        useEffect6(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe]
        );
        useDebugValue(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$12(subscribe, getSnapshot) {
        return getSnapshot();
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React11 = require_react(), objectIs = "function" === typeof Object.is ? Object.is : is2, useState5 = React11.useState, useEffect6 = React11.useEffect, useLayoutEffect = React11.useLayoutEffect, useDebugValue = React11.useDebugValue, didWarnOld18Alpha = false, didWarnUncachedGetSnapshot = false, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$12 : useSyncExternalStore$2;
      exports2.useSyncExternalStore = void 0 !== React11.useSyncExternalStore ? React11.useSyncExternalStore : shim;
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports2, module2) {
    "use strict";
    if (false) {
      module2.exports = null;
    } else {
      module2.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports2, module2) {
    "use strict";
    module2.exports = TypeError;
  }
});

// (disabled):node_modules/object-inspect/util.inspect
var require_util = __commonJS({
  "(disabled):node_modules/object-inspect/util.inspect"() {
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports2, module2) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString2 = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = require_util();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol2(inspectCustom) ? inspectCustom : null;
    var quotes = {
      __proto__: null,
      "double": '"',
      single: "'"
    };
    var quoteREs = {
      __proto__: null,
      "double": /(["\\])/g,
      single: /(['\\])/g
    };
    module2.exports = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray2(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys2 = arrObjKeys(obj, inspect);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys2.length > 0 ? " { " + $join.call(keys2, ", ") + " }" : "");
      }
      if (isSymbol2(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i2 = 0; i2 < attrs.length; i2++) {
          s += " " + attrs[i2].name + "=" + wrapQuotes(quote(attrs[i2].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray2(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError2(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function(value, key) {
            mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys2 = arrObjKeys(obj, inspect);
        var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag3 = !isPlainObject2 && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag3 || protoTag ? "[" + $join.call($concat.call([], stringTag3 || [], protoTag || []), ": ") + "] " : "");
        if (ys2.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys2, indent) + "}";
        }
        return tag + "{ " + $join.call(ys2, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
      var style = opts.quoteStyle || defaultStyle;
      var quoteChar = quotes[style];
      return quoteChar + s + quoteChar;
    }
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    function canTrustToString(obj) {
      return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
    }
    function isArray2(obj) {
      return toStr(obj) === "[object Array]" && canTrustToString(obj);
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && canTrustToString(obj);
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
    }
    function isError2(obj) {
      return toStr(obj) === "[object Error]" && canTrustToString(obj);
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && canTrustToString(obj);
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && canTrustToString(obj);
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
    }
    function isSymbol2(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString2.call(obj);
    }
    function nameOf(f2) {
      if (f2.name) {
        return f2.name;
      }
      var m2 = $match.call(functionToString.call(f2), /^function\s*([\w$]+)/);
      if (m2) {
        return m2[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i2 = 0, l2 = xs.length; i2 < l2; i2++) {
        if (xs[i2] === x) {
          return i2;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m2) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var quoteRE = quoteREs[opts.quoteStyle || "single"];
      quoteRE.lastIndex = 0;
      var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, "single", opts);
    }
    function lowbyte(c2) {
      var n = c2.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i2 = 0; i2 < xs.length; i2++) {
        if (indexOf(xs[i2], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray2(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i2 = 0; i2 < obj.length; i2++) {
          xs[i2] = has(obj, i2) ? inspect(obj[i2], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k2 = 0; k2 < syms.length; k2++) {
          symMap["$" + syms[k2]] = syms[k2];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// node_modules/side-channel-list/index.js
var require_side_channel_list = __commonJS({
  "node_modules/side-channel-list/index.js"(exports2, module2) {
    "use strict";
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var listGetNode = function(list, key, isDelete) {
      var prev = list;
      var curr;
      for (; (curr = prev.next) != null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          if (!isDelete) {
            curr.next = /** @type {NonNullable<typeof list.next>} */
            list.next;
            list.next = curr;
          }
          return curr;
        }
      }
    };
    var listGet = function(objects, key) {
      if (!objects) {
        return void 0;
      }
      var node = listGetNode(objects, key);
      return node && node.value;
    };
    var listSet = function(objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
        {
          // eslint-disable-line no-param-reassign, no-extra-parens
          key,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key) {
      if (!objects) {
        return false;
      }
      return !!listGetNode(objects, key);
    };
    var listDelete = function(objects, key) {
      if (objects) {
        return listGetNode(objects, key, true);
      }
    };
    module2.exports = function getSideChannelList() {
      var $o;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          var root2 = $o && $o.next;
          var deletedNode = listDelete($o, key);
          if (deletedNode && root2 && root2 === deletedNode) {
            $o = void 0;
          }
          return !!deletedNode;
        },
        get: function(key) {
          return listGet($o, key);
        },
        has: function(key) {
          return listHas($o, key);
        },
        set: function(key, value) {
          if (!$o) {
            $o = {
              next: void 0
            };
          }
          listSet(
            /** @type {NonNullable<typeof $o>} */
            $o,
            key,
            value
          );
        }
      };
      return channel;
    };
  }
});

// node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "node_modules/es-object-atoms/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Object;
  }
});

// node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/es-errors/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Error;
  }
});

// node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/es-errors/eval.js"(exports2, module2) {
    "use strict";
    module2.exports = EvalError;
  }
});

// node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/es-errors/range.js"(exports2, module2) {
    "use strict";
    module2.exports = RangeError;
  }
});

// node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/es-errors/ref.js"(exports2, module2) {
    "use strict";
    module2.exports = ReferenceError;
  }
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports2, module2) {
    "use strict";
    module2.exports = SyntaxError;
  }
});

// node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/es-errors/uri.js"(exports2, module2) {
    "use strict";
    module2.exports = URIError;
  }
});

// node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "node_modules/math-intrinsics/abs.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.abs;
  }
});

// node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "node_modules/math-intrinsics/floor.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.floor;
  }
});

// node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "node_modules/math-intrinsics/max.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.max;
  }
});

// node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "node_modules/math-intrinsics/min.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.min;
  }
});

// node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "node_modules/math-intrinsics/pow.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.pow;
  }
});

// node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "node_modules/math-intrinsics/round.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.round;
  }
});

// node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/math-intrinsics/isNaN.js"(exports2, module2) {
    "use strict";
    module2.exports = Number.isNaN || function isNaN2(a) {
      return a !== a;
    };
  }
});

// node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "node_modules/math-intrinsics/sign.js"(exports2, module2) {
    "use strict";
    var $isNaN = require_isNaN();
    module2.exports = function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    };
  }
});

// node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/gopd/gOPD.js"(exports2, module2) {
    "use strict";
    module2.exports = Object.getOwnPropertyDescriptor;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports2, module2) {
    "use strict";
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  }
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/es-define-property/index.js"(exports2, module2) {
    "use strict";
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module2.exports = $defineProperty;
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports2, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _2 in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = (
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym)
        );
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports2, module2) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    module2.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  }
});

// node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Object.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    var $Object = require_es_object_atoms();
    module2.exports = $Object.getPrototypeOf || null;
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i2 = 0; i2 < a.length; i2 += 1) {
        arr[i2] = a[i2];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i2 = offset || 0, j = 0; i2 < arrLike.length; i2 += 1, j += 1) {
        arr[j] = arrLike[i2];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i2 = 0; i2 < arr.length; i2 += 1) {
        str += arr[i2];
        if (i2 + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i2 = 0; i2 < boundLength; i2++) {
        boundArgs[i2] = "$" + i2;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "node_modules/call-bind-apply-helpers/functionCall.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.call;
  }
});

// node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "node_modules/call-bind-apply-helpers/functionApply.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.apply;
  }
});

// node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "node_modules/call-bind-apply-helpers/reflectApply.js"(exports2, module2) {
    "use strict";
    module2.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  }
});

// node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "node_modules/call-bind-apply-helpers/actualApply.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module2.exports = $reflectApply || bind.call($call, $apply);
  }
});

// node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "node_modules/call-bind-apply-helpers/index.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module2.exports = function callBindBasic(args) {
      if (args.length < 1 || typeof args[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind, $call, args);
    };
  }
});

// node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "node_modules/dunder-proto/get.js"(exports2, module2) {
    "use strict";
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
      [].__proto__ === Array.prototype;
    } catch (e) {
      if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
        throw e;
      }
    }
    var desc = !!hasProtoAccessor && gOPD && gOPD(
      Object.prototype,
      /** @type {keyof typeof Object.prototype} */
      "__proto__"
    );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module2.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
      /** @type {import('./get')} */
      function getDunder(value) {
        return $getPrototypeOf(value == null ? value : $Object(value));
      }
    ) : false;
  }
});

// node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "node_modules/get-proto/index.js"(exports2, module2) {
    "use strict";
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module2.exports = reflectGetProto ? function getProto(O) {
      return reflectGetProto(O);
    } : originalGetProto ? function getProto(O) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new TypeError("getProto: not an object");
      }
      return originalGetProto(O);
    } : getDunderProto ? function getProto(O) {
      return getDunderProto(O);
    } : null;
  }
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports2, module2) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module2.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports2, module2) {
    "use strict";
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn2 = doEval2("%AsyncGeneratorFunction%");
        if (fn2) {
          value = fn2.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call($call, Array.prototype.concat);
    var $spliceApply = bind.call($apply, Array.prototype.splice);
    var $replace = bind.call($call, String.prototype.replace);
    var $strSlice = bind.call($call, String.prototype.slice);
    var $exec = bind.call($call, RegExp.prototype.exec);
    var rePropName2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar2 = /\\(\\)?/g;
    var stringToPath2 = function stringToPath3(string) {
      var first = $strSlice(string, 0, 1);
      var last2 = $strSlice(string, -1);
      if (first === "%" && last2 !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last2 === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName2, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar2, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath2(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i2 = 1, isOwn = true; i2 < parts.length; i2 += 1) {
        var part = parts[i2];
        var first = $strSlice(part, 0, 1);
        var last2 = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last2 === '"' || last2 === "'" || last2 === "`")) && first !== last2) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i2 + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bound/index.js
var require_call_bound = __commonJS({
  "node_modules/call-bound/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBindBasic = require_call_bind_apply_helpers();
    var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = (
        /** @type {(this: unknown, ...args: unknown[]) => unknown} */
        GetIntrinsic(name, !!allowMissing)
      );
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBindBasic(
          /** @type {const} */
          [intrinsic]
        );
      }
      return intrinsic;
    };
  }
});

// node_modules/side-channel-map/index.js
var require_side_channel_map = __commonJS({
  "node_modules/side-channel-map/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var $Map = GetIntrinsic("%Map%", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var $mapDelete = callBound("Map.prototype.delete", true);
    var $mapSize = callBound("Map.prototype.size", true);
    module2.exports = !!$Map && /** @type {Exclude<import('.'), false>} */
    function getSideChannelMap() {
      var $m;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          if ($m) {
            var result = $mapDelete($m, key);
            if ($mapSize($m) === 0) {
              $m = void 0;
            }
            return result;
          }
          return false;
        },
        get: function(key) {
          if ($m) {
            return $mapGet($m, key);
          }
        },
        has: function(key) {
          if ($m) {
            return $mapHas($m, key);
          }
          return false;
        },
        set: function(key, value) {
          if (!$m) {
            $m = new $Map();
          }
          $mapSet($m, key, value);
        }
      };
      return channel;
    };
  }
});

// node_modules/side-channel-weakmap/index.js
var require_side_channel_weakmap = __commonJS({
  "node_modules/side-channel-weakmap/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var getSideChannelMap = require_side_channel_map();
    var $TypeError = require_type();
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
    module2.exports = $WeakMap ? (
      /** @type {Exclude<import('.'), false>} */
      function getSideChannelWeakMap() {
        var $wm;
        var $m;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          "delete": function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapDelete($wm, key);
              }
            } else if (getSideChannelMap) {
              if ($m) {
                return $m["delete"](key);
              }
            }
            return false;
          },
          get: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapGet($wm, key);
              }
            }
            return $m && $m.get(key);
          },
          has: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapHas($wm, key);
              }
            }
            return !!$m && $m.has(key);
          },
          set: function(key, value) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if (!$wm) {
                $wm = new $WeakMap();
              }
              $weakMapSet($wm, key, value);
            } else if (getSideChannelMap) {
              if (!$m) {
                $m = getSideChannelMap();
              }
              $m.set(key, value);
            }
          }
        };
        return channel;
      }
    ) : getSideChannelMap;
  }
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports2, module2) {
    "use strict";
    var $TypeError = require_type();
    var inspect = require_object_inspect();
    var getSideChannelList = require_side_channel_list();
    var getSideChannelMap = require_side_channel_map();
    var getSideChannelWeakMap = require_side_channel_weakmap();
    var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
    module2.exports = function getSideChannel() {
      var $channelData;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          return !!$channelData && $channelData["delete"](key);
        },
        get: function(key) {
          return $channelData && $channelData.get(key);
        },
        has: function(key) {
          return !!$channelData && $channelData.has(key);
        },
        set: function(key, value) {
          if (!$channelData) {
            $channelData = makeChannel();
          }
          $channelData.set(key, value);
        }
      };
      return channel;
    };
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports2, module2) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module2.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports2, module2) {
    "use strict";
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray2 = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i2 = 0; i2 < 256; ++i2) {
        array.push("%" + ((i2 < 16 ? "0" : "") + i2.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray2(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? { __proto__: null } : {};
      for (var i2 = 0; i2 < source.length; ++i2) {
        if (typeof source[i2] !== "undefined") {
          obj[i2] = source[i2];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object" && typeof source !== "function") {
        if (isArray2(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray2(target) && !isArray2(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray2(target) && isArray2(source)) {
        source.forEach(function(item, i2) {
          if (has.call(target, i2)) {
            var targetItem = target[i2];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i2] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i2] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };
    var decode = function(str, defaultDecoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var limit = 1024;
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var j = 0; j < string.length; j += limit) {
        var segment = string.length >= limit ? string.slice(j, j + limit) : string;
        var arr = [];
        for (var i2 = 0; i2 < segment.length; ++i2) {
          var c2 = segment.charCodeAt(i2);
          if (c2 === 45 || c2 === 46 || c2 === 95 || c2 === 126 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || format === formats.RFC1738 && (c2 === 40 || c2 === 41)) {
            arr[arr.length] = segment.charAt(i2);
            continue;
          }
          if (c2 < 128) {
            arr[arr.length] = hexTable[c2];
            continue;
          }
          if (c2 < 2048) {
            arr[arr.length] = hexTable[192 | c2 >> 6] + hexTable[128 | c2 & 63];
            continue;
          }
          if (c2 < 55296 || c2 >= 57344) {
            arr[arr.length] = hexTable[224 | c2 >> 12] + hexTable[128 | c2 >> 6 & 63] + hexTable[128 | c2 & 63];
            continue;
          }
          i2 += 1;
          c2 = 65536 + ((c2 & 1023) << 10 | segment.charCodeAt(i2) & 1023);
          arr[arr.length] = hexTable[240 | c2 >> 18] + hexTable[128 | c2 >> 12 & 63] + hexTable[128 | c2 >> 6 & 63] + hexTable[128 | c2 & 63];
        }
        out += arr.join("");
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i2 = 0; i2 < queue.length; ++i2) {
        var item = queue[i2];
        var obj = item.obj[item.prop];
        var keys2 = Object.keys(obj);
        for (var j = 0; j < keys2.length; ++j) {
          var key = keys2[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer2 = function isBuffer3(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a, b) {
      return [].concat(a, b);
    };
    var maybeMap = function maybeMap2(val, fn2) {
      if (isArray2(val)) {
        var mapped = [];
        for (var i2 = 0; i2 < val.length; i2 += 1) {
          mapped.push(fn2(val[i2]));
        }
        return mapped;
      }
      return fn2(val);
    };
    module2.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer: isBuffer2,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports2, module2) {
    "use strict";
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray2 = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray2(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      allowEmptyArrays: false,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: false,
      commaRoundTrip: false,
      delimiter: "&",
      encode: true,
      encodeDotInKeys: false,
      encoder: utils.encode,
      encodeValuesOnly: false,
      filter: void 0,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    };
    var sentinel = {};
    var stringify = function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
      var obj = object;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray2(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray2(obj)) {
        if (encodeValuesOnly && encoder) {
          obj = utils.maybeMap(obj, encoder);
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray2(filter)) {
        objKeys = filter;
      } else {
        var keys2 = Object.keys(obj);
        objKeys = sort ? keys2.sort(sort) : keys2;
      }
      var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
      var adjustedPrefix = commaRoundTrip && isArray2(obj) && obj.length === 1 ? encodedPrefix + "[]" : encodedPrefix;
      if (allowEmptyArrays && isArray2(obj) && obj.length === 0) {
        return adjustedPrefix + "[]";
      }
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === "object" && key && typeof key.value !== "undefined" ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var encodedKey = allowDots && encodeDotInKeys ? String(key).replace(/\./g, "%2E") : String(key);
        var keyPrefix = isArray2(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify2(
          value,
          keyPrefix,
          generateArrayPrefix,
          commaRoundTrip,
          allowEmptyArrays,
          strictNullHandling,
          skipNulls,
          encodeDotInKeys,
          generateArrayPrefix === "comma" && encodeValuesOnly && isArray2(obj) ? null : encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          valueSideChannel
        ));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      }
      if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
        throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray2(opts.filter)) {
        filter = opts.filter;
      }
      var arrayFormat;
      if (opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if ("indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = defaults.arrayFormat;
      }
      if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var allowDots = typeof opts.allowDots === "undefined" ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        arrayFormat,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        commaRoundTrip: !!opts.commaRoundTrip,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray2(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys2 = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
      var commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i2 = 0; i2 < objKeys.length; ++i2) {
        var key = objKeys[i2];
        var value = obj[key];
        if (options.skipNulls && value === null) {
          continue;
        }
        pushToArray(keys2, stringify(
          value,
          key,
          generateArrayPrefix,
          commaRoundTrip,
          options.allowEmptyArrays,
          options.strictNullHandling,
          options.skipNulls,
          options.encodeDotInKeys,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset,
          sideChannel
        ));
      }
      var joined = keys2.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray2 = Array.isArray;
    var defaults = {
      allowDots: false,
      allowEmptyArrays: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decodeDotInKeys: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      duplicates: "combine",
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictDepth: false,
      strictNullHandling: false,
      throwOnLimitExceeded: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options, currentArrayLength) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) {
        throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = { __proto__: null };
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(
        options.delimiter,
        options.throwOnLimitExceeded ? limit + 1 : limit
      );
      if (options.throwOnLimitExceeded && parts.length > limit) {
        throw new RangeError("Parameter limit exceeded. Only " + limit + " parameter" + (limit === 1 ? "" : "s") + " allowed.");
      }
      var skipIndex = -1;
      var i2;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i2 = 0; i2 < parts.length; ++i2) {
          if (parts[i2].indexOf("utf8=") === 0) {
            if (parts[i2] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i2] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i2;
            i2 = parts.length;
          }
        }
      }
      for (i2 = 0; i2 < parts.length; ++i2) {
        if (i2 === skipIndex) {
          continue;
        }
        var part = parts[i2];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key;
        var val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(
            parseArrayValue(
              part.slice(pos + 1),
              options,
              isArray2(obj[key]) ? obj[key].length : 0
            ),
            function(encodedVal) {
              return options.decoder(encodedVal, defaults.decoder, charset, "value");
            }
          );
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(String(val));
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray2(val) ? [val] : val;
        }
        var existing = has.call(obj, key);
        if (existing && options.duplicates === "combine") {
          obj[key] = utils.combine(obj[key], val);
        } else if (!existing || options.duplicates === "last") {
          obj[key] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
      var currentArrayLength = 0;
      if (chain.length > 0 && chain[chain.length - 1] === "[]") {
        var parentKey = chain.slice(0, -1).join("");
        currentArrayLength = Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
      }
      var leaf = valuesParsed ? val : parseArrayValue(val, options, currentArrayLength);
      for (var i2 = chain.length - 1; i2 >= 0; --i2) {
        var obj;
        var root2 = chain[i2];
        if (root2 === "[]" && options.parseArrays) {
          obj = options.allowEmptyArrays && (leaf === "" || options.strictNullHandling && leaf === null) ? [] : utils.combine([], leaf);
        } else {
          obj = options.plainObjects ? { __proto__: null } : {};
          var cleanRoot = root2.charAt(0) === "[" && root2.charAt(root2.length - 1) === "]" ? root2.slice(1, -1) : root2;
          var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, ".") : cleanRoot;
          var index = parseInt(decodedRoot, 10);
          if (!options.parseArrays && decodedRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index) && root2 !== decodedRoot && String(index) === decodedRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
            obj = [];
            obj[index] = leaf;
          } else if (decodedRoot !== "__proto__") {
            obj[decodedRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys2 = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys2.push(parent);
      }
      var i2 = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i2 < options.depth) {
        i2 += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys2.push(segment[1]);
      }
      if (segment) {
        if (options.strictDepth === true) {
          throw new RangeError("Input depth exceeded depth option of " + options.depth + " and strictDepth is true");
        }
        keys2.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys2, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      }
      if (typeof opts.decodeDotInKeys !== "undefined" && typeof opts.decodeDotInKeys !== "boolean") {
        throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
      }
      if (opts.decoder !== null && typeof opts.decoder !== "undefined" && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      if (typeof opts.throwOnLimitExceeded !== "undefined" && typeof opts.throwOnLimitExceeded !== "boolean") {
        throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      var duplicates = typeof opts.duplicates === "undefined" ? defaults.duplicates : opts.duplicates;
      if (duplicates !== "combine" && duplicates !== "first" && duplicates !== "last") {
        throw new TypeError("The duplicates option must be either combine, first, or last");
      }
      var allowDots = typeof opts.allowDots === "undefined" ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
      return {
        allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decodeDotInKeys: typeof opts.decodeDotInKeys === "boolean" ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        duplicates,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictDepth: typeof opts.strictDepth === "boolean" ? !!opts.strictDepth : defaults.strictDepth,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling,
        throwOnLimitExceeded: typeof opts.throwOnLimitExceeded === "boolean" ? opts.throwOnLimitExceeded : false
      };
    };
    module2.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? { __proto__: null } : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? { __proto__: null } : {};
      var keys2 = Object.keys(tempObj);
      for (var i2 = 0; i2 < keys2.length; ++i2) {
        var key = keys2[i2];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// node_modules/warn-once/index.js
var require_warn_once = __commonJS({
  "node_modules/warn-once/index.js"(exports2, module2) {
    var DEV = true;
    var warnings = /* @__PURE__ */ new Set();
    function warnOnce(condition, ...rest) {
      if (DEV && condition) {
        const key = rest.join(" ");
        if (warnings.has(key)) {
          return;
        }
        warnings.add(key);
        console.warn(...rest);
      }
    }
    module2.exports = warnOnce;
  }
});

// node_modules/pluralize/pluralize.js
var require_pluralize = __commonJS({
  "node_modules/pluralize/pluralize.js"(exports2, module2) {
    (function(root2, pluralize) {
      if (typeof __require === "function" && typeof exports2 === "object" && typeof module2 === "object") {
        module2.exports = pluralize();
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return pluralize();
        });
      } else {
        root2.pluralize = pluralize();
      }
    })(exports2, function() {
      var pluralRules = [];
      var singularRules = [];
      var uncountables = {};
      var irregularPlurals = {};
      var irregularSingles = {};
      function sanitizeRule(rule) {
        if (typeof rule === "string") {
          return new RegExp("^" + rule + "$", "i");
        }
        return rule;
      }
      function restoreCase(word, token) {
        if (word === token) return token;
        if (word === word.toLowerCase()) return token.toLowerCase();
        if (word === word.toUpperCase()) return token.toUpperCase();
        if (word[0] === word[0].toUpperCase()) {
          return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
        }
        return token.toLowerCase();
      }
      function interpolate(str, args) {
        return str.replace(/\$(\d{1,2})/g, function(match, index) {
          return args[index] || "";
        });
      }
      function replace(word, rule) {
        return word.replace(rule[0], function(match, index) {
          var result = interpolate(rule[1], arguments);
          if (match === "") {
            return restoreCase(word[index - 1], result);
          }
          return restoreCase(match, result);
        });
      }
      function sanitizeWord(token, word, rules) {
        if (!token.length || uncountables.hasOwnProperty(token)) {
          return word;
        }
        var len = rules.length;
        while (len--) {
          var rule = rules[len];
          if (rule[0].test(word)) return replace(word, rule);
        }
        return word;
      }
      function replaceWord(replaceMap, keepMap, rules) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token)) {
            return restoreCase(word, token);
          }
          if (replaceMap.hasOwnProperty(token)) {
            return restoreCase(word, replaceMap[token]);
          }
          return sanitizeWord(token, word, rules);
        };
      }
      function checkWord(replaceMap, keepMap, rules, bool) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token)) return true;
          if (replaceMap.hasOwnProperty(token)) return false;
          return sanitizeWord(token, token, rules) === token;
        };
      }
      function pluralize(word, count, inclusive) {
        var pluralized = count === 1 ? pluralize.singular(word) : pluralize.plural(word);
        return (inclusive ? count + " " : "") + pluralized;
      }
      pluralize.plural = replaceWord(
        irregularSingles,
        irregularPlurals,
        pluralRules
      );
      pluralize.isPlural = checkWord(
        irregularSingles,
        irregularPlurals,
        pluralRules
      );
      pluralize.singular = replaceWord(
        irregularPlurals,
        irregularSingles,
        singularRules
      );
      pluralize.isSingular = checkWord(
        irregularPlurals,
        irregularSingles,
        singularRules
      );
      pluralize.addPluralRule = function(rule, replacement) {
        pluralRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize.addSingularRule = function(rule, replacement) {
        singularRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize.addUncountableRule = function(word) {
        if (typeof word === "string") {
          uncountables[word.toLowerCase()] = true;
          return;
        }
        pluralize.addPluralRule(word, "$0");
        pluralize.addSingularRule(word, "$0");
      };
      pluralize.addIrregularRule = function(single, plural) {
        plural = plural.toLowerCase();
        single = single.toLowerCase();
        irregularSingles[single] = plural;
        irregularPlurals[plural] = single;
      };
      [
        // Pronouns.
        ["I", "we"],
        ["me", "us"],
        ["he", "they"],
        ["she", "they"],
        ["them", "them"],
        ["myself", "ourselves"],
        ["yourself", "yourselves"],
        ["itself", "themselves"],
        ["herself", "themselves"],
        ["himself", "themselves"],
        ["themself", "themselves"],
        ["is", "are"],
        ["was", "were"],
        ["has", "have"],
        ["this", "these"],
        ["that", "those"],
        // Words ending in with a consonant and `o`.
        ["echo", "echoes"],
        ["dingo", "dingoes"],
        ["volcano", "volcanoes"],
        ["tornado", "tornadoes"],
        ["torpedo", "torpedoes"],
        // Ends with `us`.
        ["genus", "genera"],
        ["viscus", "viscera"],
        // Ends with `ma`.
        ["stigma", "stigmata"],
        ["stoma", "stomata"],
        ["dogma", "dogmata"],
        ["lemma", "lemmata"],
        ["schema", "schemata"],
        ["anathema", "anathemata"],
        // Other irregular rules.
        ["ox", "oxen"],
        ["axe", "axes"],
        ["die", "dice"],
        ["yes", "yeses"],
        ["foot", "feet"],
        ["eave", "eaves"],
        ["goose", "geese"],
        ["tooth", "teeth"],
        ["quiz", "quizzes"],
        ["human", "humans"],
        ["proof", "proofs"],
        ["carve", "carves"],
        ["valve", "valves"],
        ["looey", "looies"],
        ["thief", "thieves"],
        ["groove", "grooves"],
        ["pickaxe", "pickaxes"],
        ["passerby", "passersby"]
      ].forEach(function(rule) {
        return pluralize.addIrregularRule(rule[0], rule[1]);
      });
      [
        [/s?$/i, "s"],
        [/[^\u0000-\u007F]$/i, "$0"],
        [/([^aeiou]ese)$/i, "$1"],
        [/(ax|test)is$/i, "$1es"],
        [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
        [/(e[mn]u)s?$/i, "$1s"],
        [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
        [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
        [/(seraph|cherub)(?:im)?$/i, "$1im"],
        [/(her|at|gr)o$/i, "$1oes"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
        [/sis$/i, "ses"],
        [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
        [/([^aeiouy]|qu)y$/i, "$1ies"],
        [/([^ch][ieo][ln])ey$/i, "$1ies"],
        [/(x|ch|ss|sh|zz)$/i, "$1es"],
        [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
        [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
        [/(pe)(?:rson|ople)$/i, "$1ople"],
        [/(child)(?:ren)?$/i, "$1ren"],
        [/eaux$/i, "$0"],
        [/m[ae]n$/i, "men"],
        ["thou", "you"]
      ].forEach(function(rule) {
        return pluralize.addPluralRule(rule[0], rule[1]);
      });
      [
        [/s$/i, ""],
        [/(ss)$/i, "$1"],
        [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, "$1fe"],
        [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
        [/ies$/i, "y"],
        [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, "$1ie"],
        [/\b(mon|smil)ies$/i, "$1ey"],
        [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
        [/(seraph|cherub)im$/i, "$1"],
        [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
        [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
        [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
        [/(test)(?:is|es)$/i, "$1is"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
        [/(alumn|alg|vertebr)ae$/i, "$1a"],
        [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
        [/(matr|append)ices$/i, "$1ix"],
        [/(pe)(rson|ople)$/i, "$1rson"],
        [/(child)ren$/i, "$1"],
        [/(eau)x?$/i, "$1"],
        [/men$/i, "man"]
      ].forEach(function(rule) {
        return pluralize.addSingularRule(rule[0], rule[1]);
      });
      [
        // Singular words with no plurals.
        "adulthood",
        "advice",
        "agenda",
        "aid",
        "aircraft",
        "alcohol",
        "ammo",
        "analytics",
        "anime",
        "athletics",
        "audio",
        "bison",
        "blood",
        "bream",
        "buffalo",
        "butter",
        "carp",
        "cash",
        "chassis",
        "chess",
        "clothing",
        "cod",
        "commerce",
        "cooperation",
        "corps",
        "debris",
        "diabetes",
        "digestion",
        "elk",
        "energy",
        "equipment",
        "excretion",
        "expertise",
        "firmware",
        "flounder",
        "fun",
        "gallows",
        "garbage",
        "graffiti",
        "hardware",
        "headquarters",
        "health",
        "herpes",
        "highjinks",
        "homework",
        "housework",
        "information",
        "jeans",
        "justice",
        "kudos",
        "labour",
        "literature",
        "machinery",
        "mackerel",
        "mail",
        "media",
        "mews",
        "moose",
        "music",
        "mud",
        "manga",
        "news",
        "only",
        "personnel",
        "pike",
        "plankton",
        "pliers",
        "police",
        "pollution",
        "premises",
        "rain",
        "research",
        "rice",
        "salmon",
        "scissors",
        "series",
        "sewage",
        "shambles",
        "shrimp",
        "software",
        "species",
        "staff",
        "swine",
        "tennis",
        "traffic",
        "transportation",
        "trout",
        "tuna",
        "wealth",
        "welfare",
        "whiting",
        "wildebeest",
        "wildlife",
        "you",
        /pok[eé]mon$/i,
        // Regexes.
        /[^aeiou]ese$/i,
        // "chinese", "japanese"
        /deer$/i,
        // "deer", "reindeer"
        /fish$/i,
        // "fish", "blowfish", "angelfish"
        /measles$/i,
        /o[iu]s$/i,
        // "carnivorous"
        /pox$/i,
        // "chickpox", "smallpox"
        /sheep$/i
      ].forEach(pluralize.addUncountableRule);
      return pluralize;
    });
  }
});

// node_modules/papaparse/papaparse.min.js
var require_papaparse_min = __commonJS({
  "node_modules/papaparse/papaparse.min.js"(exports2, module2) {
    ((e, t) => {
      "function" == typeof define && define.amd ? define([], t) : "object" == typeof module2 && "undefined" != typeof exports2 ? module2.exports = t() : e.Papa = t();
    })(exports2, function r() {
      var n = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {};
      var d3, s = !n.document && !!n.postMessage, a = n.IS_PAPA_WORKER || false, o2 = {}, h = 0, v = {};
      function u2(e) {
        this._handle = null, this._finished = false, this._completed = false, this._halted = false, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = true, this._completeResults = { data: [], errors: [], meta: {} }, (function(e2) {
          var t = b(e2);
          t.chunkSize = parseInt(t.chunkSize), e2.step || e2.chunk || (t.chunkSize = null);
          this._handle = new i2(t), (this._handle.streamer = this)._config = t;
        }).call(this, e), this.parseChunk = function(t, e2) {
          var i3 = parseInt(this._config.skipFirstNLines) || 0;
          if (this.isFirstChunk && 0 < i3) {
            let e3 = this._config.newline;
            e3 || (r2 = this._config.quoteChar || '"', e3 = this._handle.guessLineEndings(t, r2)), t = [...t.split(e3).slice(i3)].join(e3);
          }
          this.isFirstChunk && U(this._config.beforeFirstChunk) && void 0 !== (r2 = this._config.beforeFirstChunk(t)) && (t = r2), this.isFirstChunk = false, this._halted = false;
          var i3 = this._partialLine + t, r2 = (this._partialLine = "", this._handle.parse(i3, this._baseIndex, !this._finished));
          if (!this._handle.paused() && !this._handle.aborted()) {
            t = r2.meta.cursor, i3 = (this._finished || (this._partialLine = i3.substring(t - this._baseIndex), this._baseIndex = t), r2 && r2.data && (this._rowCount += r2.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview);
            if (a) n.postMessage({ results: r2, workerId: v.WORKER_ID, finished: i3 });
            else if (U(this._config.chunk) && !e2) {
              if (this._config.chunk(r2, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = true);
              this._completeResults = r2 = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(r2.data), this._completeResults.errors = this._completeResults.errors.concat(r2.errors), this._completeResults.meta = r2.meta), this._completed || !i3 || !U(this._config.complete) || r2 && r2.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = true), i3 || r2 && r2.meta.paused || this._nextChunk(), r2;
          }
          this._halted = true;
        }, this._sendError = function(e2) {
          U(this._config.error) ? this._config.error(e2) : a && this._config.error && n.postMessage({ workerId: v.WORKER_ID, error: e2, finished: false });
        };
      }
      function f2(e) {
        var r2;
        (e = e || {}).chunkSize || (e.chunkSize = v.RemoteChunkSize), u2.call(this, e), this._nextChunk = s ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(e2) {
          this._input = e2, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished) this._chunkLoaded();
          else {
            if (r2 = new XMLHttpRequest(), this._config.withCredentials && (r2.withCredentials = this._config.withCredentials), s || (r2.onload = y2(this._chunkLoaded, this), r2.onerror = y2(this._chunkError, this)), r2.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !s), this._config.downloadRequestHeaders) {
              var e2, t = this._config.downloadRequestHeaders;
              for (e2 in t) r2.setRequestHeader(e2, t[e2]);
            }
            var i3;
            this._config.chunkSize && (i3 = this._start + this._config.chunkSize - 1, r2.setRequestHeader("Range", "bytes=" + this._start + "-" + i3));
            try {
              r2.send(this._config.downloadRequestBody);
            } catch (e3) {
              this._chunkError(e3.message);
            }
            s && 0 === r2.status && this._chunkError();
          }
        }, this._chunkLoaded = function() {
          4 === r2.readyState && (r2.status < 200 || 400 <= r2.status ? this._chunkError() : (this._start += this._config.chunkSize || r2.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((e2) => null !== (e2 = e2.getResponseHeader("Content-Range")) ? parseInt(e2.substring(e2.lastIndexOf("/") + 1)) : -1)(r2), this.parseChunk(r2.responseText)));
        }, this._chunkError = function(e2) {
          e2 = r2.statusText || e2;
          this._sendError(new Error(e2));
        };
      }
      function l2(e) {
        (e = e || {}).chunkSize || (e.chunkSize = v.LocalChunkSize), u2.call(this, e);
        var i3, r2, n2 = "undefined" != typeof FileReader;
        this.stream = function(e2) {
          this._input = e2, r2 = e2.slice || e2.webkitSlice || e2.mozSlice, n2 ? ((i3 = new FileReader()).onload = y2(this._chunkLoaded, this), i3.onerror = y2(this._chunkError, this)) : i3 = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function() {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
          var e2 = this._input, t = (this._config.chunkSize && (t = Math.min(this._start + this._config.chunkSize, this._input.size), e2 = r2.call(e2, this._start, t)), i3.readAsText(e2, this._config.encoding));
          n2 || this._chunkLoaded({ target: { result: t } });
        }, this._chunkLoaded = function(e2) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e2.target.result);
        }, this._chunkError = function() {
          this._sendError(i3.error);
        };
      }
      function c2(e) {
        var i3;
        u2.call(this, e = e || {}), this.stream = function(e2) {
          return i3 = e2, this._nextChunk();
        }, this._nextChunk = function() {
          var e2, t;
          if (!this._finished) return e2 = this._config.chunkSize, i3 = e2 ? (t = i3.substring(0, e2), i3.substring(e2)) : (t = i3, ""), this._finished = !i3, this.parseChunk(t);
        };
      }
      function p3(e) {
        u2.call(this, e = e || {});
        var t = [], i3 = true, r2 = false;
        this.pause = function() {
          u2.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
          u2.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(e2) {
          this._input = e2, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
          r2 && 1 === t.length && (this._finished = true);
        }, this._nextChunk = function() {
          this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i3 = true;
        }, this._streamData = y2(function(e2) {
          try {
            t.push("string" == typeof e2 ? e2 : e2.toString(this._config.encoding)), i3 && (i3 = false, this._checkIsFinished(), this.parseChunk(t.shift()));
          } catch (e3) {
            this._streamError(e3);
          }
        }, this), this._streamError = y2(function(e2) {
          this._streamCleanUp(), this._sendError(e2);
        }, this), this._streamEnd = y2(function() {
          this._streamCleanUp(), r2 = true, this._streamData("");
        }, this), this._streamCleanUp = y2(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function i2(m3) {
        var n2, s2, a2, t, o3 = Math.pow(2, 53), h2 = -o3, u3 = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, d4 = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, i3 = this, r2 = 0, f3 = 0, l3 = false, e = false, c3 = [], p4 = { data: [], errors: [], meta: {} };
        function y3(e2) {
          return "greedy" === m3.skipEmptyLines ? "" === e2.join("").trim() : 1 === e2.length && 0 === e2[0].length;
        }
        function g3() {
          if (p4 && a2 && (k2("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + v.DefaultDelimiter + "'"), a2 = false), m3.skipEmptyLines && (p4.data = p4.data.filter(function(e3) {
            return !y3(e3);
          })), _3()) {
            let t3 = function(e3, t4) {
              U(m3.transformHeader) && (e3 = m3.transformHeader(e3, t4)), c3.push(e3);
            };
            var t2 = t3;
            if (p4) if (Array.isArray(p4.data[0])) {
              for (var e2 = 0; _3() && e2 < p4.data.length; e2++) p4.data[e2].forEach(t3);
              p4.data.splice(0, 1);
            } else p4.data.forEach(t3);
          }
          function i4(e3, t3) {
            for (var i5 = m3.header ? {} : [], r4 = 0; r4 < e3.length; r4++) {
              var n3 = r4, s3 = e3[r4], s3 = ((e4, t4) => ((e5) => (m3.dynamicTypingFunction && void 0 === m3.dynamicTyping[e5] && (m3.dynamicTyping[e5] = m3.dynamicTypingFunction(e5)), true === (m3.dynamicTyping[e5] || m3.dynamicTyping)))(e4) ? "true" === t4 || "TRUE" === t4 || "false" !== t4 && "FALSE" !== t4 && (((e5) => {
                if (u3.test(e5)) {
                  e5 = parseFloat(e5);
                  if (h2 < e5 && e5 < o3) return 1;
                }
              })(t4) ? parseFloat(t4) : d4.test(t4) ? new Date(t4) : "" === t4 ? null : t4) : t4)(n3 = m3.header ? r4 >= c3.length ? "__parsed_extra" : c3[r4] : n3, s3 = m3.transform ? m3.transform(s3, n3) : s3);
              "__parsed_extra" === n3 ? (i5[n3] = i5[n3] || [], i5[n3].push(s3)) : i5[n3] = s3;
            }
            return m3.header && (r4 > c3.length ? k2("FieldMismatch", "TooManyFields", "Too many fields: expected " + c3.length + " fields but parsed " + r4, f3 + t3) : r4 < c3.length && k2("FieldMismatch", "TooFewFields", "Too few fields: expected " + c3.length + " fields but parsed " + r4, f3 + t3)), i5;
          }
          var r3;
          p4 && (m3.header || m3.dynamicTyping || m3.transform) && (r3 = 1, !p4.data.length || Array.isArray(p4.data[0]) ? (p4.data = p4.data.map(i4), r3 = p4.data.length) : p4.data = i4(p4.data, 0), m3.header && p4.meta && (p4.meta.fields = c3), f3 += r3);
        }
        function _3() {
          return m3.header && 0 === c3.length;
        }
        function k2(e2, t2, i4, r3) {
          e2 = { type: e2, code: t2, message: i4 };
          void 0 !== r3 && (e2.row = r3), p4.errors.push(e2);
        }
        U(m3.step) && (t = m3.step, m3.step = function(e2) {
          p4 = e2, _3() ? g3() : (g3(), 0 !== p4.data.length && (r2 += e2.data.length, m3.preview && r2 > m3.preview ? s2.abort() : (p4.data = p4.data[0], t(p4, i3))));
        }), this.parse = function(e2, t2, i4) {
          var r3 = m3.quoteChar || '"', r3 = (m3.newline || (m3.newline = this.guessLineEndings(e2, r3)), a2 = false, m3.delimiter ? U(m3.delimiter) && (m3.delimiter = m3.delimiter(e2), p4.meta.delimiter = m3.delimiter) : ((r3 = ((e3, t3, i5, r4, n3) => {
            var s3, a3, o4, h3;
            n3 = n3 || [",", "	", "|", ";", v.RECORD_SEP, v.UNIT_SEP];
            for (var u4 = 0; u4 < n3.length; u4++) {
              for (var d5, f4 = n3[u4], l4 = 0, c4 = 0, p5 = 0, g4 = (o4 = void 0, new E2({ comments: r4, delimiter: f4, newline: t3, preview: 10 }).parse(e3)), _4 = 0; _4 < g4.data.length; _4++) i5 && y3(g4.data[_4]) ? p5++ : (d5 = g4.data[_4].length, c4 += d5, void 0 === o4 ? o4 = d5 : 0 < d5 && (l4 += Math.abs(d5 - o4), o4 = d5));
              0 < g4.data.length && (c4 /= g4.data.length - p5), (void 0 === a3 || l4 <= a3) && (void 0 === h3 || h3 < c4) && 1.99 < c4 && (a3 = l4, s3 = f4, h3 = c4);
            }
            return { successful: !!(m3.delimiter = s3), bestDelimiter: s3 };
          })(e2, m3.newline, m3.skipEmptyLines, m3.comments, m3.delimitersToGuess)).successful ? m3.delimiter = r3.bestDelimiter : (a2 = true, m3.delimiter = v.DefaultDelimiter), p4.meta.delimiter = m3.delimiter), b(m3));
          return m3.preview && m3.header && r3.preview++, n2 = e2, s2 = new E2(r3), p4 = s2.parse(n2, t2, i4), g3(), l3 ? { meta: { paused: true } } : p4 || { meta: { paused: false } };
        }, this.paused = function() {
          return l3;
        }, this.pause = function() {
          l3 = true, s2.abort(), n2 = U(m3.chunk) ? "" : n2.substring(s2.getCharIndex());
        }, this.resume = function() {
          i3.streamer._halted ? (l3 = false, i3.streamer.parseChunk(n2, true)) : setTimeout(i3.resume, 3);
        }, this.aborted = function() {
          return e;
        }, this.abort = function() {
          e = true, s2.abort(), p4.meta.aborted = true, U(m3.complete) && m3.complete(p4), n2 = "";
        }, this.guessLineEndings = function(e2, t2) {
          e2 = e2.substring(0, 1048576);
          var t2 = new RegExp(P(t2) + "([^]*?)" + P(t2), "gm"), i4 = (e2 = e2.replace(t2, "")).split("\r"), t2 = e2.split("\n"), e2 = 1 < t2.length && t2[0].length < i4[0].length;
          if (1 === i4.length || e2) return "\n";
          for (var r3 = 0, n3 = 0; n3 < i4.length; n3++) "\n" === i4[n3][0] && r3++;
          return r3 >= i4.length / 2 ? "\r\n" : "\r";
        };
      }
      function P(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function E2(C2) {
        var S = (C2 = C2 || {}).delimiter, O = C2.newline, x = C2.comments, I3 = C2.step, A3 = C2.preview, T3 = C2.fastMode, D = null, L2 = false, F = null == C2.quoteChar ? '"' : C2.quoteChar, j = F;
        if (void 0 !== C2.escapeChar && (j = C2.escapeChar), ("string" != typeof S || -1 < v.BAD_DELIMITERS.indexOf(S)) && (S = ","), x === S) throw new Error("Comment character same as delimiter");
        true === x ? x = "#" : ("string" != typeof x || -1 < v.BAD_DELIMITERS.indexOf(x)) && (x = false), "\n" !== O && "\r" !== O && "\r\n" !== O && (O = "\n");
        var z2 = 0, M = false;
        this.parse = function(i3, t, r2) {
          if ("string" != typeof i3) throw new Error("Input must be a string");
          var n2 = i3.length, e = S.length, s2 = O.length, a2 = x.length, o3 = U(I3), h2 = [], u3 = [], d4 = [], f3 = z2 = 0;
          if (!i3) return w();
          if (T3 || false !== T3 && -1 === i3.indexOf(F)) {
            for (var l3 = i3.split(O), c3 = 0; c3 < l3.length; c3++) {
              if (d4 = l3[c3], z2 += d4.length, c3 !== l3.length - 1) z2 += O.length;
              else if (r2) return w();
              if (!x || d4.substring(0, a2) !== x) {
                if (o3) {
                  if (h2 = [], k2(d4.split(S)), R2(), M) return w();
                } else k2(d4.split(S));
                if (A3 && A3 <= c3) return h2 = h2.slice(0, A3), w(true);
              }
            }
            return w();
          }
          for (var p4 = i3.indexOf(S, z2), g3 = i3.indexOf(O, z2), _3 = new RegExp(P(j) + P(F), "g"), m3 = i3.indexOf(F, z2); ; ) if (i3[z2] === F) for (m3 = z2, z2++; ; ) {
            if (-1 === (m3 = i3.indexOf(F, m3 + 1))) return r2 || u3.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: h2.length, index: z2 }), E3();
            if (m3 === n2 - 1) return E3(i3.substring(z2, m3).replace(_3, F));
            if (F === j && i3[m3 + 1] === j) m3++;
            else if (F === j || 0 === m3 || i3[m3 - 1] !== j) {
              -1 !== p4 && p4 < m3 + 1 && (p4 = i3.indexOf(S, m3 + 1));
              var y3 = v2(-1 === (g3 = -1 !== g3 && g3 < m3 + 1 ? i3.indexOf(O, m3 + 1) : g3) ? p4 : Math.min(p4, g3));
              if (i3.substr(m3 + 1 + y3, e) === S) {
                d4.push(i3.substring(z2, m3).replace(_3, F)), i3[z2 = m3 + 1 + y3 + e] !== F && (m3 = i3.indexOf(F, z2)), p4 = i3.indexOf(S, z2), g3 = i3.indexOf(O, z2);
                break;
              }
              y3 = v2(g3);
              if (i3.substring(m3 + 1 + y3, m3 + 1 + y3 + s2) === O) {
                if (d4.push(i3.substring(z2, m3).replace(_3, F)), b2(m3 + 1 + y3 + s2), p4 = i3.indexOf(S, z2), m3 = i3.indexOf(F, z2), o3 && (R2(), M)) return w();
                if (A3 && h2.length >= A3) return w(true);
                break;
              }
              u3.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: h2.length, index: z2 }), m3++;
            }
          }
          else if (x && 0 === d4.length && i3.substring(z2, z2 + a2) === x) {
            if (-1 === g3) return w();
            z2 = g3 + s2, g3 = i3.indexOf(O, z2), p4 = i3.indexOf(S, z2);
          } else if (-1 !== p4 && (p4 < g3 || -1 === g3)) d4.push(i3.substring(z2, p4)), z2 = p4 + e, p4 = i3.indexOf(S, z2);
          else {
            if (-1 === g3) break;
            if (d4.push(i3.substring(z2, g3)), b2(g3 + s2), o3 && (R2(), M)) return w();
            if (A3 && h2.length >= A3) return w(true);
          }
          return E3();
          function k2(e2) {
            h2.push(e2), f3 = z2;
          }
          function v2(e2) {
            var t2 = 0;
            return t2 = -1 !== e2 && (e2 = i3.substring(m3 + 1, e2)) && "" === e2.trim() ? e2.length : t2;
          }
          function E3(e2) {
            return r2 || (void 0 === e2 && (e2 = i3.substring(z2)), d4.push(e2), z2 = n2, k2(d4), o3 && R2()), w();
          }
          function b2(e2) {
            z2 = e2, k2(d4), d4 = [], g3 = i3.indexOf(O, z2);
          }
          function w(e2) {
            if (C2.header && !t && h2.length && !L2) {
              var s3 = h2[0], a3 = /* @__PURE__ */ Object.create(null), o4 = new Set(s3);
              let n3 = false;
              for (let r3 = 0; r3 < s3.length; r3++) {
                let i4 = s3[r3];
                if (a3[i4 = U(C2.transformHeader) ? C2.transformHeader(i4, r3) : i4]) {
                  let e3, t2 = a3[i4];
                  for (; e3 = i4 + "_" + t2, t2++, o4.has(e3); ) ;
                  o4.add(e3), s3[r3] = e3, a3[i4]++, n3 = true, (D = null === D ? {} : D)[e3] = i4;
                } else a3[i4] = 1, s3[r3] = i4;
                o4.add(i4);
              }
              n3 && console.warn("Duplicate headers found and renamed."), L2 = true;
            }
            return { data: h2, errors: u3, meta: { delimiter: S, linebreak: O, aborted: M, truncated: !!e2, cursor: f3 + (t || 0), renamedHeaders: D } };
          }
          function R2() {
            I3(w()), h2 = [], u3 = [];
          }
        }, this.abort = function() {
          M = true;
        }, this.getCharIndex = function() {
          return z2;
        };
      }
      function g2(e) {
        var t = e.data, i3 = o2[t.workerId], r2 = false;
        if (t.error) i3.userError(t.error, t.file);
        else if (t.results && t.results.data) {
          var n2 = { abort: function() {
            r2 = true, _2(t.workerId, { data: [], errors: [], meta: { aborted: true } });
          }, pause: m2, resume: m2 };
          if (U(i3.userStep)) {
            for (var s2 = 0; s2 < t.results.data.length && (i3.userStep({ data: t.results.data[s2], errors: t.results.errors, meta: t.results.meta }, n2), !r2); s2++) ;
            delete t.results;
          } else U(i3.userChunk) && (i3.userChunk(t.results, n2, t.file), delete t.results);
        }
        t.finished && !r2 && _2(t.workerId, t.results);
      }
      function _2(e, t) {
        var i3 = o2[e];
        U(i3.userComplete) && i3.userComplete(t), i3.terminate(), delete o2[e];
      }
      function m2() {
        throw new Error("Not implemented.");
      }
      function b(e) {
        if ("object" != typeof e || null === e) return e;
        var t, i3 = Array.isArray(e) ? [] : {};
        for (t in e) i3[t] = b(e[t]);
        return i3;
      }
      function y2(e, t) {
        return function() {
          e.apply(t, arguments);
        };
      }
      function U(e) {
        return "function" == typeof e;
      }
      return v.parse = function(e, t) {
        var i3 = (t = t || {}).dynamicTyping || false;
        U(i3) && (t.dynamicTypingFunction = i3, i3 = {});
        if (t.dynamicTyping = i3, t.transform = !!U(t.transform) && t.transform, !t.worker || !v.WORKERS_SUPPORTED) return i3 = null, v.NODE_STREAM_INPUT, "string" == typeof e ? (e = ((e2) => 65279 !== e2.charCodeAt(0) ? e2 : e2.slice(1))(e), i3 = new (t.download ? f2 : c2)(t)) : true === e.readable && U(e.read) && U(e.on) ? i3 = new p3(t) : (n.File && e instanceof File || e instanceof Object) && (i3 = new l2(t)), i3.stream(e);
        (i3 = (() => {
          var e2;
          return !!v.WORKERS_SUPPORTED && (e2 = (() => {
            var e3 = n.URL || n.webkitURL || null, t2 = r.toString();
            return v.BLOB_URL || (v.BLOB_URL = e3.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", t2, ")();"], { type: "text/javascript" })));
          })(), (e2 = new n.Worker(e2)).onmessage = g2, e2.id = h++, o2[e2.id] = e2);
        })()).userStep = t.step, i3.userChunk = t.chunk, i3.userComplete = t.complete, i3.userError = t.error, t.step = U(t.step), t.chunk = U(t.chunk), t.complete = U(t.complete), t.error = U(t.error), delete t.worker, i3.postMessage({ input: e, config: t, workerId: i3.id });
      }, v.unparse = function(e, t) {
        var n2 = false, _3 = true, m3 = ",", y3 = "\r\n", s2 = '"', a2 = s2 + s2, i3 = false, r2 = null, o3 = false, h2 = ((() => {
          if ("object" == typeof t) {
            if ("string" != typeof t.delimiter || v.BAD_DELIMITERS.filter(function(e2) {
              return -1 !== t.delimiter.indexOf(e2);
            }).length || (m3 = t.delimiter), "boolean" != typeof t.quotes && "function" != typeof t.quotes && !Array.isArray(t.quotes) || (n2 = t.quotes), "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (i3 = t.skipEmptyLines), "string" == typeof t.newline && (y3 = t.newline), "string" == typeof t.quoteChar && (s2 = t.quoteChar), "boolean" == typeof t.header && (_3 = t.header), Array.isArray(t.columns)) {
              if (0 === t.columns.length) throw new Error("Option columns is empty");
              r2 = t.columns;
            }
            void 0 !== t.escapeChar && (a2 = t.escapeChar + s2), t.escapeFormulae instanceof RegExp ? o3 = t.escapeFormulae : "boolean" == typeof t.escapeFormulae && t.escapeFormulae && (o3 = /^[=+\-@\t\r].*$/);
          }
        })(), new RegExp(P(s2), "g"));
        "string" == typeof e && (e = JSON.parse(e));
        if (Array.isArray(e)) {
          if (!e.length || Array.isArray(e[0])) return u3(null, e, i3);
          if ("object" == typeof e[0]) return u3(r2 || Object.keys(e[0]), e, i3);
        } else if ("object" == typeof e) return "string" == typeof e.data && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields || r2), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : "object" == typeof e.data[0] ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || "object" == typeof e.data[0] || (e.data = [e.data])), u3(e.fields || [], e.data || [], i3);
        throw new Error("Unable to serialize unrecognized input");
        function u3(e2, t2, i4) {
          var r3 = "", n3 = ("string" == typeof e2 && (e2 = JSON.parse(e2)), "string" == typeof t2 && (t2 = JSON.parse(t2)), Array.isArray(e2) && 0 < e2.length), s3 = !Array.isArray(t2[0]);
          if (n3 && _3) {
            for (var a3 = 0; a3 < e2.length; a3++) 0 < a3 && (r3 += m3), r3 += k2(e2[a3], a3);
            0 < t2.length && (r3 += y3);
          }
          for (var o4 = 0; o4 < t2.length; o4++) {
            var h3 = (n3 ? e2 : t2[o4]).length, u4 = false, d4 = n3 ? 0 === Object.keys(t2[o4]).length : 0 === t2[o4].length;
            if (i4 && !n3 && (u4 = "greedy" === i4 ? "" === t2[o4].join("").trim() : 1 === t2[o4].length && 0 === t2[o4][0].length), "greedy" === i4 && n3) {
              for (var f3 = [], l3 = 0; l3 < h3; l3++) {
                var c3 = s3 ? e2[l3] : l3;
                f3.push(t2[o4][c3]);
              }
              u4 = "" === f3.join("").trim();
            }
            if (!u4) {
              for (var p4 = 0; p4 < h3; p4++) {
                0 < p4 && !d4 && (r3 += m3);
                var g3 = n3 && s3 ? e2[p4] : p4;
                r3 += k2(t2[o4][g3], p4);
              }
              o4 < t2.length - 1 && (!i4 || 0 < h3 && !d4) && (r3 += y3);
            }
          }
          return r3;
        }
        function k2(e2, t2) {
          var i4, r3;
          return null == e2 ? "" : e2.constructor === Date ? JSON.stringify(e2).slice(1, 25) : (r3 = false, o3 && "string" == typeof e2 && o3.test(e2) && (e2 = "'" + e2, r3 = true), i4 = e2.toString().replace(h2, a2), (r3 = r3 || true === n2 || "function" == typeof n2 && n2(e2, t2) || Array.isArray(n2) && n2[t2] || ((e3, t3) => {
            for (var i5 = 0; i5 < t3.length; i5++) if (-1 < e3.indexOf(t3[i5])) return true;
            return false;
          })(i4, v.BAD_DELIMITERS) || -1 < i4.indexOf(m3) || " " === i4.charAt(0) || " " === i4.charAt(i4.length - 1)) ? s2 + i4 + s2 : i4);
        }
      }, v.RECORD_SEP = String.fromCharCode(30), v.UNIT_SEP = String.fromCharCode(31), v.BYTE_ORDER_MARK = "\uFEFF", v.BAD_DELIMITERS = ["\r", "\n", '"', v.BYTE_ORDER_MARK], v.WORKERS_SUPPORTED = !s && !!n.Worker, v.NODE_STREAM_INPUT = 1, v.LocalChunkSize = 10485760, v.RemoteChunkSize = 5242880, v.DefaultDelimiter = ",", v.Parser = E2, v.ParserHandle = i2, v.NetworkStreamer = f2, v.FileStreamer = l2, v.StringStreamer = c2, v.ReadableStreamStreamer = p3, n.jQuery && ((d3 = n.jQuery).fn.parse = function(o3) {
        var i3 = o3.config || {}, h2 = [];
        return this.each(function(e2) {
          if (!("INPUT" === d3(this).prop("tagName").toUpperCase() && "file" === d3(this).attr("type").toLowerCase() && n.FileReader) || !this.files || 0 === this.files.length) return true;
          for (var t = 0; t < this.files.length; t++) h2.push({ file: this.files[t], inputElem: this, instanceConfig: d3.extend({}, i3) });
        }), e(), this;
        function e() {
          if (0 === h2.length) U(o3.complete) && o3.complete();
          else {
            var e2, t, i4, r2, n2 = h2[0];
            if (U(o3.before)) {
              var s2 = o3.before(n2.file, n2.inputElem);
              if ("object" == typeof s2) {
                if ("abort" === s2.action) return e2 = "AbortError", t = n2.file, i4 = n2.inputElem, r2 = s2.reason, void (U(o3.error) && o3.error({ name: e2 }, t, i4, r2));
                if ("skip" === s2.action) return void u3();
                "object" == typeof s2.config && (n2.instanceConfig = d3.extend(n2.instanceConfig, s2.config));
              } else if ("skip" === s2) return void u3();
            }
            var a2 = n2.instanceConfig.complete;
            n2.instanceConfig.complete = function(e3) {
              U(a2) && a2(e3, n2.file, n2.inputElem), u3();
            }, v.parse(n2.file, n2.instanceConfig);
          }
        }
        function u3() {
          h2.splice(0, 1), e();
        }
      }), a && (n.onmessage = function(e) {
        e = e.data;
        void 0 === v.WORKER_ID && e && (v.WORKER_ID = e.workerId);
        "string" == typeof e.input ? n.postMessage({ workerId: v.WORKER_ID, results: v.parse(e.input, e.config), finished: true }) : (n.File && e.input instanceof File || e.input instanceof Object) && (e = v.parse(e.input, e.config)) && n.postMessage({ workerId: v.WORKER_ID, results: e, finished: true });
      }), (f2.prototype = Object.create(u2.prototype)).constructor = f2, (l2.prototype = Object.create(u2.prototype)).constructor = l2, (c2.prototype = Object.create(c2.prototype)).constructor = c2, (p3.prototype = Object.create(u2.prototype)).constructor = p3, v;
    });
  }
});

// node_modules/@refinedev/core/dist/index.mjs
var import_react3 = __toESM(require_react(), 1);

// node_modules/@refinedev/devtools-internal/dist/index.mjs
var import_error_stack_parser = __toESM(require_error_stack_parser(), 1);

// node_modules/@refinedev/devtools-shared/dist/index.mjs
var import_react = __toESM(require_react(), 1);
var c = ((t) => (t.RELOAD = "devtools:reload", t.DEVTOOLS_INIT = "devtools:init", t.DEVTOOLS_ALREADY_CONNECTED = "devtools:already-connected", t.ACTIVITY = "devtools:send-activity", t.DEVTOOLS_ACTIVITY_UPDATE = "devtools:activity-update", t.DEVTOOLS_CONNECTED_APP = "devtools:connected-app", t.DEVTOOLS_DISCONNECTED_APP = "devtools:disconnected-app", t.DEVTOOLS_HIGHLIGHT_IN_MONITOR = "devtools:highlight-in-monitor", t.DEVTOOLS_HIGHLIGHT_IN_MONITOR_ACTION = "devtools:highlight-in-monitor-action", t.DEVTOOLS_LOGIN_SUCCESS = "devtools:login-success", t.DEVTOOLS_DISPLAY_LOGIN_FAILURE = "devtools:display-login-failure", t.DEVTOOLS_LOGIN_FAILURE = "devtools:login-failure", t.DEVTOOLS_RELOAD_AFTER_LOGIN = "devtools:reload-after-login", t.DEVTOOLS_INVALIDATE_QUERY = "devtools:invalidate-query", t.DEVTOOLS_INVALIDATE_QUERY_ACTION = "devtools:invalidate-query-action", t))(c || {});
var T = { useCan: "access-control", useLog: "audit-log", useLogList: "audit-log", useCreate: "data", useCreateMany: "data", useCustom: "data", useCustomMutation: "data", useDelete: "data", useDeleteMany: "data", useInfiniteList: "data", useList: "data", useMany: "data", useOne: "data", useUpdate: "data", useUpdateMany: "data", useForgotPassword: "auth", useGetIdentity: "auth", useIsAuthenticated: "auth", useLogin: "auth", useLogout: "auth", useOnError: "auth", usePermissions: "auth", useRegister: "auth", useUpdatePassword: "auth" };
var L = Object.entries(T).reduce((e, [o2, s]) => (e[s] || (e[s] = []), e[s].push(o2), e), {});
async function d(e, o2, s) {
  if (e.readyState !== e.OPEN) {
    await new Promise((n) => {
      let r = () => {
        e.send(JSON.stringify({ event: o2, payload: s })), n(), e.removeEventListener("open", r);
      };
      e.addEventListener("open", r);
    });
    return;
  }
  e.send(JSON.stringify({ event: o2, payload: s }));
}
var p = import_react.default.createContext({ __devtools: false, httpUrl: "http://localhost:5001", wsUrl: "ws://localhost:5001", ws: null });
function _(e, o2, s) {
  let n = (r) => {
    let { event: i2, payload: y2 } = JSON.parse(r.data);
    o2 === i2 && s(y2);
  };
  return e.addEventListener("message", n), () => {
    e.removeEventListener("message", n);
  };
}

// node_modules/@refinedev/devtools-internal/dist/index.mjs
var import_react2 = __toESM(require_react(), 1);
var T2 = "renderWithHooks";
var y = (r) => {
  let e = r.findIndex((n) => n.functionName === T2);
  return e !== -1 ? r.slice(0, e) : r;
};
var f = false ? /node_modules\/refinedev\/(?<name>.*?)\// : /\/refine\/packages\/(?<name>.*?)\//;
var d2 = (r) => r ? !!r.match(f) : false;
var m = (r) => {
  var o2;
  if (!r) return;
  let e = r.match(f), n = (o2 = e == null ? void 0 : e.groups) == null ? void 0 : o2.name;
  if (n) return `@refinedev/${n}`;
};
function p2(r) {
  if (false) return [];
  try {
    let e = new Error(), n = import_error_stack_parser.default.parse(e);
    return y(n).map((t) => ({ file: t.fileName, line: t.lineNumber, column: t.columnNumber, function: t.functionName, isRefine: d2(t.fileName), packageName: m(t.fileName) })).filter((t) => t.function).filter((t) => !(r != null && r.includes(t.function ?? ""))).slice(1);
  } catch {
    return [];
  }
}
var E = (r, e) => {
  if (T[r] === "auth") return null;
  if (r === "useCan") return e ? "key[1].resource" : "key[1]";
  if (T[r] === "audit-log") return r === "useLog" ? "variables.resource" : "key[1]";
  if (T[r] === "data") {
    if (r === "useCustom" || r === "useCustomMutation") return null;
    switch (r) {
      case "useList":
      case "useInfiniteList":
      case "useOne":
      case "useMany":
        return e ? "key[1]" : "key[2]";
      case "useCreate":
      case "useCreateMany":
      case "useDelete":
      case "useDeleteMany":
      case "useUpdate":
      case "useUpdateMany":
        return "variables.resource";
    }
  }
  return null;
};
function k(r, e, n, o2) {
  if (false) return { hookName: "", trace: [], resourcePath: null, legacyKey: false };
  let s = p2(o2).slice(1), t = E(r, e);
  return { hookName: r, trace: s, resourcePath: t, legacyKey: e, resourceName: n };
}
var l = (r, e) => {
  let n = e == null ? void 0 : e.map((s) => `${s.file}:${s.line}:${s.column}#${s.function}-${s.packageName}-${s.isRefine ? 1 : 0}`);
  return JSON.stringify([...r ?? [], ...n ?? []]);
};
var g = (r) => (e) => {
  var o2;
  if (!((o2 = e == null ? void 0 : e.meta) != null && o2.trace)) return;
  let n = e == null ? void 0 : e.meta;
  new Promise((s) => {
    var t, a;
    d(r, c.ACTIVITY, { type: "mutation", identifier: l(e == null ? void 0 : e.options.mutationKey, (t = e == null ? void 0 : e.meta) == null ? void 0 : t.trace), key: e == null ? void 0 : e.options.mutationKey, status: e == null ? void 0 : e.state.status, state: e == null ? void 0 : e.state, variables: (a = e == null ? void 0 : e.state) == null ? void 0 : a.variables, ...n }), s();
  });
};
var R = (r) => (e) => {
  var o2;
  if (!((o2 = e == null ? void 0 : e.meta) != null && o2.trace)) return;
  let n = e == null ? void 0 : e.meta;
  new Promise((s) => {
    var t;
    d(r, c.ACTIVITY, { type: "query", identifier: l(e.queryKey, (t = e.meta) == null ? void 0 : t.trace), key: e.queryKey, status: e.state.status, state: e.state, ...n }), s();
  });
};
var C = false ? x : (r) => {
  let { ws: e } = (0, import_react2.useContext)(p), n = import_react2.default.useRef(), o2 = import_react2.default.useRef();
  return import_react2.default.useEffect(() => {
    if (!e) return () => 0;
    let s = r.getQueryCache(), t = R(e);
    return s.getAll().forEach(t), n.current = s.subscribe(({ query: a, type: c2 }) => (c2 === "added" || c2 === "updated") && t(a)), () => {
      var a;
      (a = n.current) == null || a.call(n);
    };
  }, [e, r]), import_react2.default.useEffect(() => {
    if (!e) return () => 0;
    let s = r.getMutationCache(), t = g(e);
    return s.getAll().forEach(t), o2.current = s.subscribe(({ mutation: a, type: c2 }) => (c2 === "added" || c2 === "updated") && t(a)), () => {
      var a;
      (a = o2.current) == null || a.call(o2);
    };
  }, [e, r]), import_react2.default.useEffect(() => e ? _(e, c.DEVTOOLS_INVALIDATE_QUERY_ACTION, ({ queryKey: t }) => {
    t && r.invalidateQueries(t);
  }) : () => 0, [e, r]), {};
};

// node_modules/@tanstack/query-core/build/lib/subscribable.mjs
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    const identity2 = {
      listener
    };
    this.listeners.add(identity2);
    this.onSubscribe();
    return () => {
      this.listeners.delete(identity2);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

// node_modules/@tanstack/query-core/build/lib/utils.mjs
var isServer = typeof window === "undefined" || "Deno" in window;
function noop() {
  return void 0;
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }
  if (typeof arg2 === "function") {
    return {
      ...arg3,
      queryKey: arg1,
      queryFn: arg2
    };
  }
  return {
    ...arg2,
    queryKey: arg1
  };
}
function parseMutationArgs(arg1, arg2, arg3) {
  if (isQueryKey(arg1)) {
    if (typeof arg2 === "function") {
      return {
        ...arg3,
        mutationKey: arg1,
        mutationFn: arg2
      };
    }
    return {
      ...arg2,
      mutationKey: arg1
    };
  }
  if (typeof arg1 === "function") {
    return {
      ...arg2,
      mutationFn: arg1
    };
  }
  return {
    ...arg1
  };
}
function parseFilterArgs(arg1, arg2, arg3) {
  return isQueryKey(arg1) ? [{
    ...arg2,
    queryKey: arg1
  }, arg3] : [arg1 || {}, arg2];
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (isQueryKey(queryKey)) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (typeof fetchStatus !== "undefined" && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const {
    exact,
    fetching,
    predicate,
    mutationKey
  } = filters;
  if (isQueryKey(mutationKey)) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (typeof fetching === "boolean" && mutation.state.status === "loading" !== fetching) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashQueryKey;
  return hashFn(queryKey);
}
function hashQueryKey(queryKey) {
  return JSON.stringify(queryKey, (_2, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
    result[key] = val[key];
    return result;
  }, {}) : val);
}
function partialMatchKey(a, b) {
  return partialDeepEqual(a, b);
}
function partialDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some((key) => !partialDeepEqual(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aSize = array ? a.length : Object.keys(a).length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i2 = 0; i2 < bSize; i2++) {
      const key = array ? i2 : bItems[i2];
      copy[key] = replaceEqualDeep(a[key], b[key]);
      if (copy[key] === a[key]) {
        equalItems++;
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (a && !b || b && !a) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o2) {
  if (!hasObjectPrototype(o2)) {
    return false;
  }
  const ctor = o2.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o2) {
  return Object.prototype.toString.call(o2) === "[object Object]";
}
function isQueryKey(value) {
  return Array.isArray(value);
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function scheduleMicrotask(callback) {
  sleep(0).then(callback);
}
function getAbortController() {
  if (typeof AbortController === "function") {
    return new AbortController();
  }
  return;
}
function replaceData(prevData, data, options) {
  if (options.isDataEqual != null && options.isDataEqual(prevData, data)) {
    return prevData;
  } else if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    return replaceEqualDeep(prevData, data);
  }
  return data;
}

// node_modules/@tanstack/query-core/build/lib/focusManager.mjs
var FocusManager = class extends Subscribable {
  constructor() {
    super();
    this.setup = (onFocus) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        window.addEventListener("focus", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
          window.removeEventListener("focus", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;
      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _this$cleanup2;
    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    const changed = this.focused !== focused;
    if (changed) {
      this.focused = focused;
      this.onFocus();
    }
  }
  onFocus() {
    this.listeners.forEach(({
      listener
    }) => {
      listener();
    });
  }
  isFocused() {
    if (typeof this.focused === "boolean") {
      return this.focused;
    }
    if (typeof document === "undefined") {
      return true;
    }
    return [void 0, "visible", "prerender"].includes(document.visibilityState);
  }
};
var focusManager = new FocusManager();

// node_modules/@tanstack/query-core/build/lib/onlineManager.mjs
var onlineEvents = ["online", "offline"];
var OnlineManager = class extends Subscribable {
  constructor() {
    super();
    this.setup = (onOnline) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onOnline();
        onlineEvents.forEach((event) => {
          window.addEventListener(event, listener, false);
        });
        return () => {
          onlineEvents.forEach((event) => {
            window.removeEventListener(event, listener);
          });
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;
      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _this$cleanup2;
    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup((online) => {
      if (typeof online === "boolean") {
        this.setOnline(online);
      } else {
        this.onOnline();
      }
    });
  }
  setOnline(online) {
    const changed = this.online !== online;
    if (changed) {
      this.online = online;
      this.onOnline();
    }
  }
  onOnline() {
    this.listeners.forEach(({
      listener
    }) => {
      listener();
    });
  }
  isOnline() {
    if (typeof this.online === "boolean") {
      return this.online;
    }
    if (typeof navigator === "undefined" || typeof navigator.onLine === "undefined") {
      return true;
    }
    return navigator.onLine;
  }
};
var onlineManager = new OnlineManager();

// node_modules/@tanstack/query-core/build/lib/retryer.mjs
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode != null ? networkMode : "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class {
  constructor(options) {
    this.revert = options == null ? void 0 : options.revert;
    this.silent = options == null ? void 0 : options.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  let promiseResolve;
  let promiseReject;
  const promise = new Promise((outerResolve, outerReject) => {
    promiseResolve = outerResolve;
    promiseReject = outerReject;
  });
  const cancel = (cancelOptions) => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort == null ? void 0 : config.abort();
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const shouldPause = () => !focusManager.isFocused() || config.networkMode !== "always" && !onlineManager.isOnline();
  const resolve = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess == null ? void 0 : config.onSuccess(value);
      continueFn == null ? void 0 : continueFn();
      promiseResolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onError == null ? void 0 : config.onError(value);
      continueFn == null ? void 0 : continueFn();
      promiseReject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        const canContinue = isResolved || !shouldPause();
        if (canContinue) {
          continueResolve(value);
        }
        return canContinue;
      };
      config.onPause == null ? void 0 : config.onPause();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved) {
        config.onContinue == null ? void 0 : config.onContinue();
      }
    });
  };
  const run = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    try {
      promiseOrValue = config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      var _config$retry, _config$retryDelay;
      if (isResolved) {
        return;
      }
      const retry = (_config$retry = config.retry) != null ? _config$retry : 3;
      const retryDelay = (_config$retryDelay = config.retryDelay) != null ? _config$retryDelay : defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail == null ? void 0 : config.onFail(failureCount, error);
      sleep(delay).then(() => {
        if (shouldPause()) {
          return pause();
        }
        return;
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  if (canFetch(config.networkMode)) {
    run();
  } else {
    pause().then(run);
  }
  return {
    promise,
    cancel,
    continue: () => {
      const didContinue = continueFn == null ? void 0 : continueFn();
      return didContinue ? promise : Promise.resolve();
    },
    cancelRetry,
    continueRetry
  };
}

// node_modules/@tanstack/query-core/build/lib/logger.mjs
var defaultLogger = console;

// node_modules/@tanstack/query-core/build/lib/notifyManager.mjs
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  const batch = (callback) => {
    let result;
    transactions++;
    try {
      result = callback();
    } finally {
      transactions--;
      if (!transactions) {
        flush();
      }
    }
    return result;
  };
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleMicrotask(() => {
        notifyFn(callback);
      });
    }
  };
  const batchCalls = (callback) => {
    return (...args) => {
      schedule(() => {
        callback(...args);
      });
    };
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleMicrotask(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  const setNotifyFunction = (fn2) => {
    notifyFn = fn2;
  };
  const setBatchNotifyFunction = (fn2) => {
    batchNotifyFn = fn2;
  };
  return {
    batch,
    batchCalls,
    schedule,
    setNotifyFunction,
    setBatchNotifyFunction
  };
}
var notifyManager = createNotifyManager();

// node_modules/@tanstack/query-core/build/lib/removable.mjs
var Removable = class {
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.cacheTime)) {
      this.gcTimeout = setTimeout(() => {
        this.optionalRemove();
      }, this.cacheTime);
    }
  }
  updateCacheTime(newCacheTime) {
    this.cacheTime = Math.max(this.cacheTime || 0, newCacheTime != null ? newCacheTime : isServer ? Infinity : 5 * 60 * 1e3);
  }
  clearGcTimeout() {
    if (this.gcTimeout) {
      clearTimeout(this.gcTimeout);
      this.gcTimeout = void 0;
    }
  }
};

// node_modules/@tanstack/query-core/build/lib/query.mjs
var Query = class extends Removable {
  constructor(config) {
    super();
    this.abortSignalConsumed = false;
    this.defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.cache = config.cache;
    this.logger = config.logger || defaultLogger;
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.initialState = config.state || getDefaultState(this.options);
    this.state = this.initialState;
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  setOptions(options) {
    this.options = {
      ...this.defaultOptions,
      ...options
    };
    this.updateCacheTime(this.options.cacheTime);
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      this.cache.remove(this);
    }
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    this.dispatch({
      data,
      type: "success",
      dataUpdatedAt: options == null ? void 0 : options.updatedAt,
      manual: options == null ? void 0 : options.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    this.dispatch({
      type: "setState",
      state,
      setStateOptions
    });
  }
  cancel(options) {
    var _this$retryer;
    const promise = this.promise;
    (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({
      silent: true
    });
  }
  reset() {
    this.destroy();
    this.setState(this.initialState);
  }
  isActive() {
    return this.observers.some((observer) => observer.options.enabled !== false);
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }
  isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some((observer) => observer.getCurrentResult().isStale);
  }
  isStaleByTime(staleTime = 0) {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    var _this$retryer2;
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    if (observer) {
      observer.refetch({
        cancelRefetch: false
      });
    }
    (_this$retryer2 = this.retryer) == null ? void 0 : _this$retryer2.continue();
  }
  onOnline() {
    var _this$retryer3;
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    if (observer) {
      observer.refetch({
        cancelRefetch: false
      });
    }
    (_this$retryer3 = this.retryer) == null ? void 0 : _this$retryer3.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.cache.notify({
        type: "observerAdded",
        query: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (this.retryer) {
          if (this.abortSignalConsumed) {
            this.retryer.cancel({
              revert: true
            });
          } else {
            this.retryer.cancelRetry();
          }
        }
        this.scheduleGc();
      }
      this.cache.notify({
        type: "observerRemoved",
        query: this,
        observer
      });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.dispatch({
        type: "invalidate"
      });
    }
  }
  fetch(options, fetchOptions) {
    var _this$options$behavio, _context$fetchOptions;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.dataUpdatedAt && fetchOptions != null && fetchOptions.cancelRefetch) {
        this.cancel({
          silent: true
        });
      } else if (this.promise) {
        var _this$retryer4;
        (_this$retryer4 = this.retryer) == null ? void 0 : _this$retryer4.continueRetry();
        return this.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    if (true) {
      if (!Array.isArray(this.options.queryKey)) {
        this.logger.error("As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']");
      }
    }
    const abortController = getAbortController();
    const queryFnContext = {
      queryKey: this.queryKey,
      pageParam: void 0,
      meta: this.meta
    };
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          if (abortController) {
            this.abortSignalConsumed = true;
            return abortController.signal;
          }
          return void 0;
        }
      });
    };
    addSignalProperty(queryFnContext);
    const fetchFn = () => {
      if (!this.options.queryFn) {
        return Promise.reject("Missing queryFn for queryKey '" + this.options.queryHash + "'");
      }
      this.abortSignalConsumed = false;
      return this.options.queryFn(queryFnContext);
    };
    const context = {
      fetchOptions,
      options: this.options,
      queryKey: this.queryKey,
      state: this.state,
      fetchFn
    };
    addSignalProperty(context);
    (_this$options$behavio = this.options.behavior) == null ? void 0 : _this$options$behavio.onFetch(context);
    this.revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((_context$fetchOptions = context.fetchOptions) == null ? void 0 : _context$fetchOptions.meta)) {
      var _context$fetchOptions2;
      this.dispatch({
        type: "fetch",
        meta: (_context$fetchOptions2 = context.fetchOptions) == null ? void 0 : _context$fetchOptions2.meta
      });
    }
    const onError = (error) => {
      if (!(isCancelledError(error) && error.silent)) {
        this.dispatch({
          type: "error",
          error
        });
      }
      if (!isCancelledError(error)) {
        var _this$cache$config$on, _this$cache$config, _this$cache$config$on2, _this$cache$config2;
        (_this$cache$config$on = (_this$cache$config = this.cache.config).onError) == null ? void 0 : _this$cache$config$on.call(_this$cache$config, error, this);
        (_this$cache$config$on2 = (_this$cache$config2 = this.cache.config).onSettled) == null ? void 0 : _this$cache$config$on2.call(_this$cache$config2, this.state.data, error, this);
        if (true) {
          this.logger.error(error);
        }
      }
      if (!this.isFetchingOptimistic) {
        this.scheduleGc();
      }
      this.isFetchingOptimistic = false;
    };
    this.retryer = createRetryer({
      fn: context.fetchFn,
      abort: abortController == null ? void 0 : abortController.abort.bind(abortController),
      onSuccess: (data) => {
        var _this$cache$config$on3, _this$cache$config3, _this$cache$config$on4, _this$cache$config4;
        if (typeof data === "undefined") {
          if (true) {
            this.logger.error("Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: " + this.queryHash);
          }
          onError(new Error(this.queryHash + " data is undefined"));
          return;
        }
        this.setData(data);
        (_this$cache$config$on3 = (_this$cache$config3 = this.cache.config).onSuccess) == null ? void 0 : _this$cache$config$on3.call(_this$cache$config3, data, this);
        (_this$cache$config$on4 = (_this$cache$config4 = this.cache.config).onSettled) == null ? void 0 : _this$cache$config$on4.call(_this$cache$config4, data, this.state.error, this);
        if (!this.isFetchingOptimistic) {
          this.scheduleGc();
        }
        this.isFetchingOptimistic = false;
      },
      onError,
      onFail: (failureCount, error) => {
        this.dispatch({
          type: "failed",
          failureCount,
          error
        });
      },
      onPause: () => {
        this.dispatch({
          type: "pause"
        });
      },
      onContinue: () => {
        this.dispatch({
          type: "continue"
        });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode
    });
    this.promise = this.retryer.promise;
    return this.promise;
  }
  dispatch(action) {
    const reducer = (state) => {
      var _action$meta, _action$dataUpdatedAt;
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchMeta: (_action$meta = action.meta) != null ? _action$meta : null,
            fetchStatus: canFetch(this.options.networkMode) ? "fetching" : "paused",
            ...!state.dataUpdatedAt && {
              error: null,
              status: "loading"
            }
          };
        case "success":
          return {
            ...state,
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: (_action$dataUpdatedAt = action.dataUpdatedAt) != null ? _action$dataUpdatedAt : Date.now(),
            error: null,
            isInvalidated: false,
            status: "success",
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
        case "error":
          const error = action.error;
          if (isCancelledError(error) && error.revert && this.revertState) {
            return {
              ...this.revertState,
              fetchStatus: "idle"
            };
          }
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error"
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate(action);
      });
      this.cache.notify({
        query: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = typeof data !== "undefined";
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "loading",
    fetchStatus: "idle"
  };
}

// node_modules/@tanstack/query-core/build/lib/queryCache.mjs
var QueryCache = class extends Subscribable {
  constructor(config) {
    super();
    this.config = config || {};
    this.queries = [];
    this.queriesMap = {};
  }
  build(client, options, state) {
    var _options$queryHash;
    const queryKey = options.queryKey;
    const queryHash = (_options$queryHash = options.queryHash) != null ? _options$queryHash : hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        cache: this,
        logger: client.getLogger(),
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.queriesMap[query.queryHash]) {
      this.queriesMap[query.queryHash] = query;
      this.queries.push(query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.queriesMap[query.queryHash];
    if (queryInMap) {
      query.destroy();
      this.queries = this.queries.filter((x) => x !== query);
      if (queryInMap === query) {
        delete this.queriesMap[query.queryHash];
      }
      this.notify({
        type: "removed",
        query
      });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.queriesMap[queryHash];
  }
  getAll() {
    return this.queries;
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  find(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.queries.find((query) => matchQuery(filters, query));
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  findAll(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    return Object.keys(filters).length > 0 ? this.queries.filter((query) => matchQuery(filters, query)) : this.queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach(({
        listener
      }) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        query.onOnline();
      });
    });
  }
};

// node_modules/@tanstack/query-core/build/lib/mutation.mjs
var Mutation = class extends Removable {
  constructor(config) {
    super();
    this.defaultOptions = config.defaultOptions;
    this.mutationId = config.mutationId;
    this.mutationCache = config.mutationCache;
    this.logger = config.logger || defaultLogger;
    this.observers = [];
    this.state = config.state || getDefaultState2();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = {
      ...this.defaultOptions,
      ...options
    };
    this.updateCacheTime(this.options.cacheTime);
  }
  get meta() {
    return this.options.meta;
  }
  setState(state) {
    this.dispatch({
      type: "setState",
      state
    });
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    this.observers = this.observers.filter((x) => x !== observer);
    this.scheduleGc();
    this.mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.observers.length) {
      if (this.state.status === "loading") {
        this.scheduleGc();
      } else {
        this.mutationCache.remove(this);
      }
    }
  }
  continue() {
    var _this$retryer$continu, _this$retryer;
    return (_this$retryer$continu = (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.continue()) != null ? _this$retryer$continu : this.execute();
  }
  async execute() {
    const executeMutation = () => {
      var _this$options$retry;
      this.retryer = createRetryer({
        fn: () => {
          if (!this.options.mutationFn) {
            return Promise.reject("No mutationFn found");
          }
          return this.options.mutationFn(this.state.variables);
        },
        onFail: (failureCount, error) => {
          this.dispatch({
            type: "failed",
            failureCount,
            error
          });
        },
        onPause: () => {
          this.dispatch({
            type: "pause"
          });
        },
        onContinue: () => {
          this.dispatch({
            type: "continue"
          });
        },
        retry: (_this$options$retry = this.options.retry) != null ? _this$options$retry : 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode
      });
      return this.retryer.promise;
    };
    const restored = this.state.status === "loading";
    try {
      var _this$mutationCache$c3, _this$mutationCache$c4, _this$options$onSucce, _this$options2, _this$mutationCache$c5, _this$mutationCache$c6, _this$options$onSettl, _this$options3;
      if (!restored) {
        var _this$mutationCache$c, _this$mutationCache$c2, _this$options$onMutat, _this$options;
        this.dispatch({
          type: "loading",
          variables: this.options.variables
        });
        await ((_this$mutationCache$c = (_this$mutationCache$c2 = this.mutationCache.config).onMutate) == null ? void 0 : _this$mutationCache$c.call(_this$mutationCache$c2, this.state.variables, this));
        const context = await ((_this$options$onMutat = (_this$options = this.options).onMutate) == null ? void 0 : _this$options$onMutat.call(_this$options, this.state.variables));
        if (context !== this.state.context) {
          this.dispatch({
            type: "loading",
            context,
            variables: this.state.variables
          });
        }
      }
      const data = await executeMutation();
      await ((_this$mutationCache$c3 = (_this$mutationCache$c4 = this.mutationCache.config).onSuccess) == null ? void 0 : _this$mutationCache$c3.call(_this$mutationCache$c4, data, this.state.variables, this.state.context, this));
      await ((_this$options$onSucce = (_this$options2 = this.options).onSuccess) == null ? void 0 : _this$options$onSucce.call(_this$options2, data, this.state.variables, this.state.context));
      await ((_this$mutationCache$c5 = (_this$mutationCache$c6 = this.mutationCache.config).onSettled) == null ? void 0 : _this$mutationCache$c5.call(_this$mutationCache$c6, data, null, this.state.variables, this.state.context, this));
      await ((_this$options$onSettl = (_this$options3 = this.options).onSettled) == null ? void 0 : _this$options$onSettl.call(_this$options3, data, null, this.state.variables, this.state.context));
      this.dispatch({
        type: "success",
        data
      });
      return data;
    } catch (error) {
      try {
        var _this$mutationCache$c7, _this$mutationCache$c8, _this$options$onError, _this$options4, _this$mutationCache$c9, _this$mutationCache$c10, _this$options$onSettl2, _this$options5;
        await ((_this$mutationCache$c7 = (_this$mutationCache$c8 = this.mutationCache.config).onError) == null ? void 0 : _this$mutationCache$c7.call(_this$mutationCache$c8, error, this.state.variables, this.state.context, this));
        if (true) {
          this.logger.error(error);
        }
        await ((_this$options$onError = (_this$options4 = this.options).onError) == null ? void 0 : _this$options$onError.call(_this$options4, error, this.state.variables, this.state.context));
        await ((_this$mutationCache$c9 = (_this$mutationCache$c10 = this.mutationCache.config).onSettled) == null ? void 0 : _this$mutationCache$c9.call(_this$mutationCache$c10, void 0, error, this.state.variables, this.state.context, this));
        await ((_this$options$onSettl2 = (_this$options5 = this.options).onSettled) == null ? void 0 : _this$options$onSettl2.call(_this$options5, void 0, error, this.state.variables, this.state.context));
        throw error;
      } finally {
        this.dispatch({
          type: "error",
          error
        });
      }
    }
  }
  dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "loading":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: !canFetch(this.options.networkMode),
            status: "loading",
            variables: action.variables
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState2() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0
  };
}

// node_modules/@tanstack/query-core/build/lib/mutationCache.mjs
var MutationCache = class extends Subscribable {
  constructor(config) {
    super();
    this.config = config || {};
    this.mutations = [];
    this.mutationId = 0;
  }
  build(client, options, state) {
    const mutation = new Mutation({
      mutationCache: this,
      logger: client.getLogger(),
      mutationId: ++this.mutationId,
      options: client.defaultMutationOptions(options),
      state,
      defaultOptions: options.mutationKey ? client.getMutationDefaults(options.mutationKey) : void 0
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    this.mutations.push(mutation);
    this.notify({
      type: "added",
      mutation
    });
  }
  remove(mutation) {
    this.mutations = this.mutations.filter((x) => x !== mutation);
    this.notify({
      type: "removed",
      mutation
    });
  }
  clear() {
    notifyManager.batch(() => {
      this.mutations.forEach((mutation) => {
        this.remove(mutation);
      });
    });
  }
  getAll() {
    return this.mutations;
  }
  find(filters) {
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.mutations.find((mutation) => matchMutation(filters, mutation));
  }
  findAll(filters) {
    return this.mutations.filter((mutation) => matchMutation(filters, mutation));
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach(({
        listener
      }) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    var _this$resuming;
    this.resuming = ((_this$resuming = this.resuming) != null ? _this$resuming : Promise.resolve()).then(() => {
      const pausedMutations = this.mutations.filter((x) => x.state.isPaused);
      return notifyManager.batch(() => pausedMutations.reduce((promise, mutation) => promise.then(() => mutation.continue().catch(noop)), Promise.resolve()));
    }).then(() => {
      this.resuming = void 0;
    });
    return this.resuming;
  }
};

// node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.mjs
function infiniteQueryBehavior() {
  return {
    onFetch: (context) => {
      context.fetchFn = () => {
        var _context$fetchOptions, _context$fetchOptions2, _context$fetchOptions3, _context$fetchOptions4, _context$state$data, _context$state$data2;
        const refetchPage = (_context$fetchOptions = context.fetchOptions) == null ? void 0 : (_context$fetchOptions2 = _context$fetchOptions.meta) == null ? void 0 : _context$fetchOptions2.refetchPage;
        const fetchMore = (_context$fetchOptions3 = context.fetchOptions) == null ? void 0 : (_context$fetchOptions4 = _context$fetchOptions3.meta) == null ? void 0 : _context$fetchOptions4.fetchMore;
        const pageParam = fetchMore == null ? void 0 : fetchMore.pageParam;
        const isFetchingNextPage = (fetchMore == null ? void 0 : fetchMore.direction) === "forward";
        const isFetchingPreviousPage = (fetchMore == null ? void 0 : fetchMore.direction) === "backward";
        const oldPages = ((_context$state$data = context.state.data) == null ? void 0 : _context$state$data.pages) || [];
        const oldPageParams = ((_context$state$data2 = context.state.data) == null ? void 0 : _context$state$data2.pageParams) || [];
        let newPageParams = oldPageParams;
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              var _context$signal;
              if ((_context$signal = context.signal) != null && _context$signal.aborted) {
                cancelled = true;
              } else {
                var _context$signal2;
                (_context$signal2 = context.signal) == null ? void 0 : _context$signal2.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = context.options.queryFn || (() => Promise.reject("Missing queryFn for queryKey '" + context.options.queryHash + "'"));
        const buildNewPages = (pages, param, page, previous) => {
          newPageParams = previous ? [param, ...newPageParams] : [...newPageParams, param];
          return previous ? [page, ...pages] : [...pages, page];
        };
        const fetchPage = (pages, manual, param, previous) => {
          if (cancelled) {
            return Promise.reject("Cancelled");
          }
          if (typeof param === "undefined" && !manual && pages.length) {
            return Promise.resolve(pages);
          }
          const queryFnContext = {
            queryKey: context.queryKey,
            pageParam: param,
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext);
          const queryFnResult = queryFn(queryFnContext);
          const promise2 = Promise.resolve(queryFnResult).then((page) => buildNewPages(pages, param, page, previous));
          return promise2;
        };
        let promise;
        if (!oldPages.length) {
          promise = fetchPage([]);
        } else if (isFetchingNextPage) {
          const manual = typeof pageParam !== "undefined";
          const param = manual ? pageParam : getNextPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param);
        } else if (isFetchingPreviousPage) {
          const manual = typeof pageParam !== "undefined";
          const param = manual ? pageParam : getPreviousPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param, true);
        } else {
          newPageParams = [];
          const manual = typeof context.options.getNextPageParam === "undefined";
          const shouldFetchFirstPage = refetchPage && oldPages[0] ? refetchPage(oldPages[0], 0, oldPages) : true;
          promise = shouldFetchFirstPage ? fetchPage([], manual, oldPageParams[0]) : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0]));
          for (let i2 = 1; i2 < oldPages.length; i2++) {
            promise = promise.then((pages) => {
              const shouldFetchNextPage = refetchPage && oldPages[i2] ? refetchPage(oldPages[i2], i2, oldPages) : true;
              if (shouldFetchNextPage) {
                const param = manual ? oldPageParams[i2] : getNextPageParam(context.options, pages);
                return fetchPage(pages, manual, param);
              }
              return Promise.resolve(buildNewPages(pages, oldPageParams[i2], oldPages[i2]));
            });
          }
        }
        const finalPromise = promise.then((pages) => ({
          pages,
          pageParams: newPageParams
        }));
        return finalPromise;
      };
    }
  };
}
function getNextPageParam(options, pages) {
  return options.getNextPageParam == null ? void 0 : options.getNextPageParam(pages[pages.length - 1], pages);
}
function getPreviousPageParam(options, pages) {
  return options.getPreviousPageParam == null ? void 0 : options.getPreviousPageParam(pages[0], pages);
}
function hasNextPage(options, pages) {
  if (options.getNextPageParam && Array.isArray(pages)) {
    const nextPageParam = getNextPageParam(options, pages);
    return typeof nextPageParam !== "undefined" && nextPageParam !== null && nextPageParam !== false;
  }
  return;
}
function hasPreviousPage(options, pages) {
  if (options.getPreviousPageParam && Array.isArray(pages)) {
    const previousPageParam = getPreviousPageParam(options, pages);
    return typeof previousPageParam !== "undefined" && previousPageParam !== null && previousPageParam !== false;
  }
  return;
}

// node_modules/@tanstack/query-core/build/lib/queryClient.mjs
var QueryClient = class {
  constructor(config = {}) {
    this.queryCache = config.queryCache || new QueryCache();
    this.mutationCache = config.mutationCache || new MutationCache();
    this.logger = config.logger || defaultLogger;
    this.defaultOptions = config.defaultOptions || {};
    this.queryDefaults = [];
    this.mutationDefaults = [];
    this.mountCount = 0;
    if (config.logger) {
      this.logger.error("Passing a custom logger has been deprecated and will be removed in the next major version.");
    }
  }
  mount() {
    this.mountCount++;
    if (this.mountCount !== 1) return;
    this.unsubscribeFocus = focusManager.subscribe(() => {
      if (focusManager.isFocused()) {
        this.resumePausedMutations();
        this.queryCache.onFocus();
      }
    });
    this.unsubscribeOnline = onlineManager.subscribe(() => {
      if (onlineManager.isOnline()) {
        this.resumePausedMutations();
        this.queryCache.onOnline();
      }
    });
  }
  unmount() {
    var _this$unsubscribeFocu, _this$unsubscribeOnli;
    this.mountCount--;
    if (this.mountCount !== 0) return;
    (_this$unsubscribeFocu = this.unsubscribeFocus) == null ? void 0 : _this$unsubscribeFocu.call(this);
    this.unsubscribeFocus = void 0;
    (_this$unsubscribeOnli = this.unsubscribeOnline) == null ? void 0 : _this$unsubscribeOnli.call(this);
    this.unsubscribeOnline = void 0;
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  isFetching(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    filters.fetchStatus = "fetching";
    return this.queryCache.findAll(filters).length;
  }
  isMutating(filters) {
    return this.mutationCache.findAll({
      ...filters,
      fetching: true
    }).length;
  }
  /**
   * @deprecated This method will accept only queryKey in the next major version.
   */
  getQueryData(queryKey, filters) {
    var _this$queryCache$find;
    return (_this$queryCache$find = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find.state.data;
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  ensureQueryData(arg1, arg2, arg3) {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    const cachedData = this.getQueryData(parsedOptions.queryKey);
    return cachedData ? Promise.resolve(cachedData) : this.fetchQuery(parsedOptions);
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  getQueriesData(queryKeyOrFilters) {
    return this.getQueryCache().findAll(queryKeyOrFilters).map(({
      queryKey,
      state
    }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const query = this.queryCache.find(queryKey);
    const prevData = query == null ? void 0 : query.state.data;
    const data = functionalUpdate(updater, prevData);
    if (typeof data === "undefined") {
      return void 0;
    }
    const parsedOptions = parseQueryArgs(queryKey);
    const defaultedOptions = this.defaultQueryOptions(parsedOptions);
    return this.queryCache.build(this, defaultedOptions).setData(data, {
      ...options,
      manual: true
    });
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  setQueriesData(queryKeyOrFilters, updater, options) {
    return notifyManager.batch(() => this.getQueryCache().findAll(queryKeyOrFilters).map(({
      queryKey
    }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
  }
  getQueryState(queryKey, filters) {
    var _this$queryCache$find2;
    return (_this$queryCache$find2 = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find2.state;
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  removeQueries(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    const queryCache = this.queryCache;
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  resetQueries(arg1, arg2, arg3) {
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    const queryCache = this.queryCache;
    const refetchFilters = {
      type: "active",
      ...filters
    };
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  cancelQueries(arg1, arg2, arg3) {
    const [filters, cancelOptions = {}] = parseFilterArgs(arg1, arg2, arg3);
    if (typeof cancelOptions.revert === "undefined") {
      cancelOptions.revert = true;
    }
    const promises = notifyManager.batch(() => this.queryCache.findAll(filters).map((query) => query.cancel(cancelOptions)));
    return Promise.all(promises).then(noop).catch(noop);
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  invalidateQueries(arg1, arg2, arg3) {
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    return notifyManager.batch(() => {
      var _ref, _filters$refetchType;
      this.queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters.refetchType === "none") {
        return Promise.resolve();
      }
      const refetchFilters = {
        ...filters,
        type: (_ref = (_filters$refetchType = filters.refetchType) != null ? _filters$refetchType : filters.type) != null ? _ref : "active"
      };
      return this.refetchQueries(refetchFilters, options);
    });
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  refetchQueries(arg1, arg2, arg3) {
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    const promises = notifyManager.batch(() => this.queryCache.findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
      var _options$cancelRefetc;
      return query.fetch(void 0, {
        ...options,
        cancelRefetch: (_options$cancelRefetc = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc : true,
        meta: {
          refetchPage: filters.refetchPage
        }
      });
    }));
    let promise = Promise.all(promises).then(noop);
    if (!(options != null && options.throwOnError)) {
      promise = promise.catch(noop);
    }
    return promise;
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  fetchQuery(arg1, arg2, arg3) {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    const defaultedOptions = this.defaultQueryOptions(parsedOptions);
    if (typeof defaultedOptions.retry === "undefined") {
      defaultedOptions.retry = false;
    }
    const query = this.queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  prefetchQuery(arg1, arg2, arg3) {
    return this.fetchQuery(arg1, arg2, arg3).then(noop).catch(noop);
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  fetchInfiniteQuery(arg1, arg2, arg3) {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    parsedOptions.behavior = infiniteQueryBehavior();
    return this.fetchQuery(parsedOptions);
  }
  /**
   * @deprecated This method should be used with only one object argument.
   */
  prefetchInfiniteQuery(arg1, arg2, arg3) {
    return this.fetchInfiniteQuery(arg1, arg2, arg3).then(noop).catch(noop);
  }
  resumePausedMutations() {
    return this.mutationCache.resumePausedMutations();
  }
  getQueryCache() {
    return this.queryCache;
  }
  getMutationCache() {
    return this.mutationCache;
  }
  getLogger() {
    return this.logger;
  }
  getDefaultOptions() {
    return this.defaultOptions;
  }
  setDefaultOptions(options) {
    this.defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    const result = this.queryDefaults.find((x) => hashQueryKey(queryKey) === hashQueryKey(x.queryKey));
    if (result) {
      result.defaultOptions = options;
    } else {
      this.queryDefaults.push({
        queryKey,
        defaultOptions: options
      });
    }
  }
  getQueryDefaults(queryKey) {
    if (!queryKey) {
      return void 0;
    }
    const firstMatchingDefaults = this.queryDefaults.find((x) => partialMatchKey(queryKey, x.queryKey));
    if (true) {
      const matchingDefaults = this.queryDefaults.filter((x) => partialMatchKey(queryKey, x.queryKey));
      if (matchingDefaults.length > 1) {
        this.logger.error("[QueryClient] Several query defaults match with key '" + JSON.stringify(queryKey) + "'. The first matching query defaults are used. Please check how query defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydefaults.");
      }
    }
    return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
  }
  setMutationDefaults(mutationKey, options) {
    const result = this.mutationDefaults.find((x) => hashQueryKey(mutationKey) === hashQueryKey(x.mutationKey));
    if (result) {
      result.defaultOptions = options;
    } else {
      this.mutationDefaults.push({
        mutationKey,
        defaultOptions: options
      });
    }
  }
  getMutationDefaults(mutationKey) {
    if (!mutationKey) {
      return void 0;
    }
    const firstMatchingDefaults = this.mutationDefaults.find((x) => partialMatchKey(mutationKey, x.mutationKey));
    if (true) {
      const matchingDefaults = this.mutationDefaults.filter((x) => partialMatchKey(mutationKey, x.mutationKey));
      if (matchingDefaults.length > 1) {
        this.logger.error("[QueryClient] Several mutation defaults match with key '" + JSON.stringify(mutationKey) + "'. The first matching mutation defaults are used. Please check how mutation defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetmutationdefaults.");
      }
    }
    return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
  }
  defaultQueryOptions(options) {
    if (options != null && options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...this.defaultOptions.queries,
      ...this.getQueryDefaults(options == null ? void 0 : options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
    }
    if (typeof defaultedOptions.refetchOnReconnect === "undefined") {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (typeof defaultedOptions.useErrorBoundary === "undefined") {
      defaultedOptions.useErrorBoundary = !!defaultedOptions.suspense;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options != null && options._defaulted) {
      return options;
    }
    return {
      ...this.defaultOptions.mutations,
      ...this.getMutationDefaults(options == null ? void 0 : options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    this.queryCache.clear();
    this.mutationCache.clear();
  }
};

// node_modules/@tanstack/query-core/build/lib/queryObserver.mjs
var QueryObserver = class extends Subscribable {
  constructor(client, options) {
    super();
    this.client = client;
    this.options = options;
    this.trackedProps = /* @__PURE__ */ new Set();
    this.selectError = null;
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.remove = this.remove.bind(this);
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      this.currentQuery.addObserver(this);
      if (shouldFetchOnMount(this.currentQuery, this.options)) {
        this.executeFetch();
      }
      this.updateTimers();
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    this.clearStaleTimeout();
    this.clearRefetchInterval();
    this.currentQuery.removeObserver(this);
  }
  setOptions(options, notifyOptions) {
    const prevOptions = this.options;
    const prevQuery = this.currentQuery;
    this.options = this.client.defaultQueryOptions(options);
    if (typeof (options == null ? void 0 : options.isDataEqual) !== "undefined") {
      this.client.getLogger().error("The isDataEqual option has been deprecated and will be removed in the next major version. You can achieve the same functionality by passing a function as the structuralSharing option");
    }
    if (!shallowEqualObjects(prevOptions, this.options)) {
      this.client.getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: this.currentQuery,
        observer: this
      });
    }
    if (typeof this.options.enabled !== "undefined" && typeof this.options.enabled !== "boolean") {
      throw new Error("Expected enabled to be a boolean");
    }
    if (!this.options.queryKey) {
      this.options.queryKey = prevOptions.queryKey;
    }
    this.updateQuery();
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(this.currentQuery, prevQuery, this.options, prevOptions)) {
      this.executeFetch();
    }
    this.updateResult(notifyOptions);
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || this.options.staleTime !== prevOptions.staleTime)) {
      this.updateStaleTimeout();
    }
    const nextRefetchInterval = this.computeRefetchInterval();
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || nextRefetchInterval !== this.currentRefetchInterval)) {
      this.updateRefetchInterval(nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = this.client.getQueryCache().build(this.client, options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result, options)) {
      this.currentResult = result;
      this.currentResultOptions = this.options;
      this.currentResultState = this.currentQuery.state;
    }
    return result;
  }
  getCurrentResult() {
    return this.currentResult;
  }
  trackResult(result) {
    const trackedResult = {};
    Object.keys(result).forEach((key) => {
      Object.defineProperty(trackedResult, key, {
        configurable: false,
        enumerable: true,
        get: () => {
          this.trackedProps.add(key);
          return result[key];
        }
      });
    });
    return trackedResult;
  }
  getCurrentQuery() {
    return this.currentQuery;
  }
  remove() {
    this.client.getQueryCache().remove(this.currentQuery);
  }
  refetch({
    refetchPage,
    ...options
  } = {}) {
    return this.fetch({
      ...options,
      meta: {
        refetchPage
      }
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = this.client.defaultQueryOptions(options);
    const query = this.client.getQueryCache().build(this.client, defaultedOptions);
    query.isFetchingOptimistic = true;
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    var _fetchOptions$cancelR;
    return this.executeFetch({
      ...fetchOptions,
      cancelRefetch: (_fetchOptions$cancelR = fetchOptions.cancelRefetch) != null ? _fetchOptions$cancelR : true
    }).then(() => {
      this.updateResult();
      return this.currentResult;
    });
  }
  executeFetch(fetchOptions) {
    this.updateQuery();
    let promise = this.currentQuery.fetch(this.options, fetchOptions);
    if (!(fetchOptions != null && fetchOptions.throwOnError)) {
      promise = promise.catch(noop);
    }
    return promise;
  }
  updateStaleTimeout() {
    this.clearStaleTimeout();
    if (isServer || this.currentResult.isStale || !isValidTimeout(this.options.staleTime)) {
      return;
    }
    const time = timeUntilStale(this.currentResult.dataUpdatedAt, this.options.staleTime);
    const timeout = time + 1;
    this.staleTimeoutId = setTimeout(() => {
      if (!this.currentResult.isStale) {
        this.updateResult();
      }
    }, timeout);
  }
  computeRefetchInterval() {
    var _this$options$refetch;
    return typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.currentResult.data, this.currentQuery) : (_this$options$refetch = this.options.refetchInterval) != null ? _this$options$refetch : false;
  }
  updateRefetchInterval(nextInterval) {
    this.clearRefetchInterval();
    this.currentRefetchInterval = nextInterval;
    if (isServer || this.options.enabled === false || !isValidTimeout(this.currentRefetchInterval) || this.currentRefetchInterval === 0) {
      return;
    }
    this.refetchIntervalId = setInterval(() => {
      if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
        this.executeFetch();
      }
    }, this.currentRefetchInterval);
  }
  updateTimers() {
    this.updateStaleTimeout();
    this.updateRefetchInterval(this.computeRefetchInterval());
  }
  clearStaleTimeout() {
    if (this.staleTimeoutId) {
      clearTimeout(this.staleTimeoutId);
      this.staleTimeoutId = void 0;
    }
  }
  clearRefetchInterval() {
    if (this.refetchIntervalId) {
      clearInterval(this.refetchIntervalId);
      this.refetchIntervalId = void 0;
    }
  }
  createResult(query, options) {
    const prevQuery = this.currentQuery;
    const prevOptions = this.options;
    const prevResult = this.currentResult;
    const prevResultState = this.currentResultState;
    const prevResultOptions = this.currentResultOptions;
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : this.currentQueryInitialState;
    const prevQueryResult = queryChange ? this.currentResult : this.previousQueryResult;
    const {
      state
    } = query;
    let {
      dataUpdatedAt,
      error,
      errorUpdatedAt,
      fetchStatus,
      status
    } = state;
    let isPreviousData = false;
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        fetchStatus = canFetch(query.options.networkMode) ? "fetching" : "paused";
        if (!dataUpdatedAt) {
          status = "loading";
        }
      }
      if (options._optimisticResults === "isRestoring") {
        fetchStatus = "idle";
      }
    }
    if (options.keepPreviousData && !state.dataUpdatedAt && prevQueryResult != null && prevQueryResult.isSuccess && status !== "error") {
      data = prevQueryResult.data;
      dataUpdatedAt = prevQueryResult.dataUpdatedAt;
      status = prevQueryResult.status;
      isPreviousData = true;
    } else if (options.select && typeof state.data !== "undefined") {
      if (prevResult && state.data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === this.selectFn) {
        data = this.selectResult;
      } else {
        try {
          this.selectFn = options.select;
          data = options.select(state.data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          this.selectResult = data;
          this.selectError = null;
        } catch (selectError) {
          if (true) {
            this.client.getLogger().error(selectError);
          }
          this.selectError = selectError;
        }
      }
    } else {
      data = state.data;
    }
    if (typeof options.placeholderData !== "undefined" && typeof data === "undefined" && status === "loading") {
      let placeholderData;
      if (prevResult != null && prevResult.isPlaceholderData && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData() : options.placeholderData;
        if (options.select && typeof placeholderData !== "undefined") {
          try {
            placeholderData = options.select(placeholderData);
            this.selectError = null;
          } catch (selectError) {
            if (true) {
              this.client.getLogger().error(selectError);
            }
            this.selectError = selectError;
          }
        }
      }
      if (typeof placeholderData !== "undefined") {
        status = "success";
        data = replaceData(prevResult == null ? void 0 : prevResult.data, placeholderData, options);
        isPlaceholderData = true;
      }
    }
    if (this.selectError) {
      error = this.selectError;
      data = this.selectResult;
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = fetchStatus === "fetching";
    const isLoading = status === "loading";
    const isError2 = status === "error";
    const result = {
      status,
      fetchStatus,
      isLoading,
      isSuccess: status === "success",
      isError: isError2,
      isInitialLoading: isLoading && isFetching,
      data,
      dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: state.fetchFailureCount,
      failureReason: state.fetchFailureReason,
      errorUpdateCount: state.errorUpdateCount,
      isFetched: state.dataUpdateCount > 0 || state.errorUpdateCount > 0,
      isFetchedAfterMount: state.dataUpdateCount > queryInitialState.dataUpdateCount || state.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isLoading,
      isLoadingError: isError2 && state.dataUpdatedAt === 0,
      isPaused: fetchStatus === "paused",
      isPlaceholderData,
      isPreviousData,
      isRefetchError: isError2 && state.dataUpdatedAt !== 0,
      isStale: isStale(query, options),
      refetch: this.refetch,
      remove: this.remove
    };
    return result;
  }
  updateResult(notifyOptions) {
    const prevResult = this.currentResult;
    const nextResult = this.createResult(this.currentQuery, this.options);
    this.currentResultState = this.currentQuery.state;
    this.currentResultOptions = this.options;
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    this.currentResult = nextResult;
    const defaultNotifyOptions = {
      cache: true
    };
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const {
        notifyOnChangeProps
      } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.trackedProps.size) {
        return true;
      }
      const includedProps = new Set(notifyOnChangePropsValue != null ? notifyOnChangePropsValue : this.trackedProps);
      if (this.options.useErrorBoundary) {
        includedProps.add("error");
      }
      return Object.keys(this.currentResult).some((key) => {
        const typedKey = key;
        const changed = this.currentResult[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    if ((notifyOptions == null ? void 0 : notifyOptions.listeners) !== false && shouldNotifyListeners()) {
      defaultNotifyOptions.listeners = true;
    }
    this.notify({
      ...defaultNotifyOptions,
      ...notifyOptions
    });
  }
  updateQuery() {
    const query = this.client.getQueryCache().build(this.client, this.options);
    if (query === this.currentQuery) {
      return;
    }
    const prevQuery = this.currentQuery;
    this.currentQuery = query;
    this.currentQueryInitialState = query.state;
    this.previousQueryResult = this.currentResult;
    if (this.hasListeners()) {
      prevQuery == null ? void 0 : prevQuery.removeObserver(this);
      query.addObserver(this);
    }
  }
  onQueryUpdate(action) {
    const notifyOptions = {};
    if (action.type === "success") {
      notifyOptions.onSuccess = !action.manual;
    } else if (action.type === "error" && !isCancelledError(action.error)) {
      notifyOptions.onError = true;
    }
    this.updateResult(notifyOptions);
    if (this.hasListeners()) {
      this.updateTimers();
    }
  }
  notify(notifyOptions) {
    notifyManager.batch(() => {
      if (notifyOptions.onSuccess) {
        var _this$options$onSucce, _this$options, _this$options$onSettl, _this$options2;
        (_this$options$onSucce = (_this$options = this.options).onSuccess) == null ? void 0 : _this$options$onSucce.call(_this$options, this.currentResult.data);
        (_this$options$onSettl = (_this$options2 = this.options).onSettled) == null ? void 0 : _this$options$onSettl.call(_this$options2, this.currentResult.data, null);
      } else if (notifyOptions.onError) {
        var _this$options$onError, _this$options3, _this$options$onSettl2, _this$options4;
        (_this$options$onError = (_this$options3 = this.options).onError) == null ? void 0 : _this$options$onError.call(_this$options3, this.currentResult.error);
        (_this$options$onSettl2 = (_this$options4 = this.options).onSettled) == null ? void 0 : _this$options$onSettl2.call(_this$options4, void 0, this.currentResult.error);
      }
      if (notifyOptions.listeners) {
        this.listeners.forEach(({
          listener
        }) => {
          listener(this.currentResult);
        });
      }
      if (notifyOptions.cache) {
        this.client.getQueryCache().notify({
          query: this.currentQuery,
          type: "observerResultsUpdated"
        });
      }
    });
  }
};
function shouldLoadOnMount(query, options) {
  return options.enabled !== false && !query.state.dataUpdatedAt && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.dataUpdatedAt > 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (options.enabled !== false) {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return options.enabled !== false && (query !== prevQuery || prevOptions.enabled === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return query.isStaleByTime(options.staleTime);
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult, options) {
  if (options.keepPreviousData) {
    return false;
  }
  if (options.placeholderData !== void 0) {
    return optimisticResult.isPlaceholderData;
  }
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}

// node_modules/@tanstack/query-core/build/lib/infiniteQueryObserver.mjs
var InfiniteQueryObserver = class extends QueryObserver {
  // Type override
  // Type override
  // Type override
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(client, options) {
    super(client, options);
  }
  bindMethods() {
    super.bindMethods();
    this.fetchNextPage = this.fetchNextPage.bind(this);
    this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
  }
  setOptions(options, notifyOptions) {
    super.setOptions({
      ...options,
      behavior: infiniteQueryBehavior()
    }, notifyOptions);
  }
  getOptimisticResult(options) {
    options.behavior = infiniteQueryBehavior();
    return super.getOptimisticResult(options);
  }
  fetchNextPage({
    pageParam,
    ...options
  } = {}) {
    return this.fetch({
      ...options,
      meta: {
        fetchMore: {
          direction: "forward",
          pageParam
        }
      }
    });
  }
  fetchPreviousPage({
    pageParam,
    ...options
  } = {}) {
    return this.fetch({
      ...options,
      meta: {
        fetchMore: {
          direction: "backward",
          pageParam
        }
      }
    });
  }
  createResult(query, options) {
    var _state$fetchMeta, _state$fetchMeta$fetc, _state$fetchMeta2, _state$fetchMeta2$fet, _state$data, _state$data2;
    const {
      state
    } = query;
    const result = super.createResult(query, options);
    const {
      isFetching,
      isRefetching
    } = result;
    const isFetchingNextPage = isFetching && ((_state$fetchMeta = state.fetchMeta) == null ? void 0 : (_state$fetchMeta$fetc = _state$fetchMeta.fetchMore) == null ? void 0 : _state$fetchMeta$fetc.direction) === "forward";
    const isFetchingPreviousPage = isFetching && ((_state$fetchMeta2 = state.fetchMeta) == null ? void 0 : (_state$fetchMeta2$fet = _state$fetchMeta2.fetchMore) == null ? void 0 : _state$fetchMeta2$fet.direction) === "backward";
    return {
      ...result,
      fetchNextPage: this.fetchNextPage,
      fetchPreviousPage: this.fetchPreviousPage,
      hasNextPage: hasNextPage(options, (_state$data = state.data) == null ? void 0 : _state$data.pages),
      hasPreviousPage: hasPreviousPage(options, (_state$data2 = state.data) == null ? void 0 : _state$data2.pages),
      isFetchingNextPage,
      isFetchingPreviousPage,
      isRefetching: isRefetching && !isFetchingNextPage && !isFetchingPreviousPage
    };
  }
};

// node_modules/@tanstack/query-core/build/lib/mutationObserver.mjs
var MutationObserver = class extends Subscribable {
  constructor(client, options) {
    super();
    this.client = client;
    this.setOptions(options);
    this.bindMethods();
    this.updateResult();
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _this$currentMutation;
    const prevOptions = this.options;
    this.options = this.client.defaultMutationOptions(options);
    if (!shallowEqualObjects(prevOptions, this.options)) {
      this.client.getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: this.currentMutation,
        observer: this
      });
    }
    (_this$currentMutation = this.currentMutation) == null ? void 0 : _this$currentMutation.setOptions(this.options);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$currentMutation2;
      (_this$currentMutation2 = this.currentMutation) == null ? void 0 : _this$currentMutation2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    this.updateResult();
    const notifyOptions = {
      listeners: true
    };
    if (action.type === "success") {
      notifyOptions.onSuccess = true;
    } else if (action.type === "error") {
      notifyOptions.onError = true;
    }
    this.notify(notifyOptions);
  }
  getCurrentResult() {
    return this.currentResult;
  }
  reset() {
    this.currentMutation = void 0;
    this.updateResult();
    this.notify({
      listeners: true
    });
  }
  mutate(variables, options) {
    this.mutateOptions = options;
    if (this.currentMutation) {
      this.currentMutation.removeObserver(this);
    }
    this.currentMutation = this.client.getMutationCache().build(this.client, {
      ...this.options,
      variables: typeof variables !== "undefined" ? variables : this.options.variables
    });
    this.currentMutation.addObserver(this);
    return this.currentMutation.execute();
  }
  updateResult() {
    const state = this.currentMutation ? this.currentMutation.state : getDefaultState2();
    const isLoading = state.status === "loading";
    const result = {
      ...state,
      isLoading,
      isPending: isLoading,
      isSuccess: state.status === "success",
      isError: state.status === "error",
      isIdle: state.status === "idle",
      mutate: this.mutate,
      reset: this.reset
    };
    this.currentResult = result;
  }
  notify(options) {
    notifyManager.batch(() => {
      if (this.mutateOptions && this.hasListeners()) {
        if (options.onSuccess) {
          var _this$mutateOptions$o, _this$mutateOptions, _this$mutateOptions$o2, _this$mutateOptions2;
          (_this$mutateOptions$o = (_this$mutateOptions = this.mutateOptions).onSuccess) == null ? void 0 : _this$mutateOptions$o.call(_this$mutateOptions, this.currentResult.data, this.currentResult.variables, this.currentResult.context);
          (_this$mutateOptions$o2 = (_this$mutateOptions2 = this.mutateOptions).onSettled) == null ? void 0 : _this$mutateOptions$o2.call(_this$mutateOptions2, this.currentResult.data, null, this.currentResult.variables, this.currentResult.context);
        } else if (options.onError) {
          var _this$mutateOptions$o3, _this$mutateOptions3, _this$mutateOptions$o4, _this$mutateOptions4;
          (_this$mutateOptions$o3 = (_this$mutateOptions3 = this.mutateOptions).onError) == null ? void 0 : _this$mutateOptions$o3.call(_this$mutateOptions3, this.currentResult.error, this.currentResult.variables, this.currentResult.context);
          (_this$mutateOptions$o4 = (_this$mutateOptions4 = this.mutateOptions).onSettled) == null ? void 0 : _this$mutateOptions$o4.call(_this$mutateOptions4, void 0, this.currentResult.error, this.currentResult.variables, this.currentResult.context);
        }
      }
      if (options.listeners) {
        this.listeners.forEach(({
          listener
        }) => {
          listener(this.currentResult);
        });
      }
    });
  }
};

// node_modules/@tanstack/react-query/build/lib/reactBatchedUpdates.mjs
var ReactDOM = __toESM(require_react_dom(), 1);
var unstable_batchedUpdates2 = ReactDOM.unstable_batchedUpdates;

// node_modules/@tanstack/react-query/build/lib/setBatchUpdatesFn.mjs
notifyManager.setBatchNotifyFunction(unstable_batchedUpdates2);

// node_modules/@tanstack/react-query/build/lib/useQueries.mjs
var React5 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs
var import_shim = __toESM(require_shim(), 1);
var useSyncExternalStore = import_shim.useSyncExternalStore;

// node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs
var React = __toESM(require_react(), 1);
var defaultContext = React.createContext(void 0);
var QueryClientSharingContext = React.createContext(false);
function getQueryClientContext(context, contextSharing) {
  if (context) {
    return context;
  }
  if (contextSharing && typeof window !== "undefined") {
    if (!window.ReactQueryClientContext) {
      window.ReactQueryClientContext = defaultContext;
    }
    return window.ReactQueryClientContext;
  }
  return defaultContext;
}
var useQueryClient = ({
  context
} = {}) => {
  const queryClient = React.useContext(getQueryClientContext(context, React.useContext(QueryClientSharingContext)));
  if (!queryClient) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return queryClient;
};
var QueryClientProvider = ({
  client,
  children,
  context,
  contextSharing = false
}) => {
  React.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  if (contextSharing) {
    client.getLogger().error("The contextSharing option has been deprecated and will be removed in the next major version");
  }
  const Context = getQueryClientContext(context, contextSharing);
  return React.createElement(QueryClientSharingContext.Provider, {
    value: !context && contextSharing
  }, React.createElement(Context.Provider, {
    value: client
  }, children));
};

// node_modules/@tanstack/react-query/build/lib/isRestoring.mjs
var React2 = __toESM(require_react(), 1);
var IsRestoringContext = React2.createContext(false);
var useIsRestoring = () => React2.useContext(IsRestoringContext);
var IsRestoringProvider = IsRestoringContext.Provider;

// node_modules/@tanstack/react-query/build/lib/QueryErrorResetBoundary.mjs
var React3 = __toESM(require_react(), 1);
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = React3.createContext(createValue());
var useQueryErrorResetBoundary = () => React3.useContext(QueryErrorResetBoundaryContext);

// node_modules/@tanstack/react-query/build/lib/errorBoundaryUtils.mjs
var React4 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-query/build/lib/utils.mjs
function shouldThrowError(_useErrorBoundary, params) {
  if (typeof _useErrorBoundary === "function") {
    return _useErrorBoundary(...params);
  }
  return !!_useErrorBoundary;
}

// node_modules/@tanstack/react-query/build/lib/errorBoundaryUtils.mjs
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary) => {
  if (options.suspense || options.useErrorBoundary) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  React4.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  useErrorBoundary,
  query
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && shouldThrowError(useErrorBoundary, [result.error, query]);
};

// node_modules/@tanstack/react-query/build/lib/suspense.mjs
var ensureStaleTime = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    if (typeof defaultedOptions.staleTime !== "number") {
      defaultedOptions.staleTime = 1e3;
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result, isRestoring) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && willFetch(result, isRestoring);
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).then(({
  data
}) => {
  defaultedOptions.onSuccess == null ? void 0 : defaultedOptions.onSuccess(data);
  defaultedOptions.onSettled == null ? void 0 : defaultedOptions.onSettled(data, null);
}).catch((error) => {
  errorResetBoundary.clearReset();
  defaultedOptions.onError == null ? void 0 : defaultedOptions.onError(error);
  defaultedOptions.onSettled == null ? void 0 : defaultedOptions.onSettled(void 0, error);
});

// node_modules/@tanstack/react-query/build/lib/useBaseQuery.mjs
var React6 = __toESM(require_react(), 1);
function useBaseQuery(options, Observer) {
  const queryClient = useQueryClient({
    context: options.context
  });
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const defaultedOptions = queryClient.defaultQueryOptions(options);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  if (defaultedOptions.onError) {
    defaultedOptions.onError = notifyManager.batchCalls(defaultedOptions.onError);
  }
  if (defaultedOptions.onSuccess) {
    defaultedOptions.onSuccess = notifyManager.batchCalls(defaultedOptions.onSuccess);
  }
  if (defaultedOptions.onSettled) {
    defaultedOptions.onSettled = notifyManager.batchCalls(defaultedOptions.onSettled);
  }
  ensureStaleTime(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary);
  useClearResetErrorBoundary(errorResetBoundary);
  const [observer] = React6.useState(() => new Observer(queryClient, defaultedOptions));
  const result = observer.getOptimisticResult(defaultedOptions);
  useSyncExternalStore(React6.useCallback((onStoreChange) => {
    const unsubscribe = isRestoring ? () => void 0 : observer.subscribe(notifyManager.batchCalls(onStoreChange));
    observer.updateResult();
    return unsubscribe;
  }, [observer, isRestoring]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
  React6.useEffect(() => {
    observer.setOptions(defaultedOptions, {
      listeners: false
    });
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result, isRestoring)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    useErrorBoundary: defaultedOptions.useErrorBoundary,
    query: observer.getCurrentQuery()
  })) {
    throw result.error;
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}

// node_modules/@tanstack/react-query/build/lib/useQuery.mjs
function useQuery(arg1, arg2, arg3) {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  return useBaseQuery(parsedOptions, QueryObserver);
}

// node_modules/@tanstack/react-query/build/lib/Hydrate.mjs
var React7 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-query/build/lib/useIsFetching.mjs
var React8 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-query/build/lib/useIsMutating.mjs
var React9 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-query/build/lib/useMutation.mjs
var React10 = __toESM(require_react(), 1);
function useMutation(arg1, arg2, arg3) {
  const options = parseMutationArgs(arg1, arg2, arg3);
  const queryClient = useQueryClient({
    context: options.context
  });
  const [observer] = React10.useState(() => new MutationObserver(queryClient, options));
  React10.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = useSyncExternalStore(React10.useCallback((onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)), [observer]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
  const mutate = React10.useCallback((variables, mutateOptions) => {
    observer.mutate(variables, mutateOptions).catch(noop2);
  }, [observer]);
  if (result.error && shouldThrowError(observer.options.useErrorBoundary, [result.error])) {
    throw result.error;
  }
  return {
    ...result,
    mutate,
    mutateAsync: result.mutate
  };
}
function noop2() {
}

// node_modules/@tanstack/react-query/build/lib/useInfiniteQuery.mjs
function useInfiniteQuery(arg1, arg2, arg3) {
  const options = parseQueryArgs(arg1, arg2, arg3);
  return useBaseQuery(options, InfiniteQueryObserver);
}

// node_modules/@refinedev/core/dist/index.mjs
var import_react4 = __toESM(require_react(), 1);

// node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal_default = freeGlobal;

// node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal_default || freeSelf || Function("return this")();
var root_default = root;

// node_modules/lodash-es/_Symbol.js
var Symbol2 = root_default.Symbol;
var Symbol_default = Symbol2;

// node_modules/lodash-es/_getRawTag.js
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var getRawTag_default = getRawTag;

// node_modules/lodash-es/_objectToString.js
var objectProto2 = Object.prototype;
var nativeObjectToString2 = objectProto2.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;

// node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction;

// node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"];
var coreJsData_default = coreJsData;

// node_modules/lodash-es/_isMasked.js
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var toSource_default = toSource;

// node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto2 = Function.prototype;
var objectProto3 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty2 = objectProto3.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create");
var nativeCreate_default = nativeCreate;

// node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default = hashClear;

// node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var hashDelete_default = hashDelete;

// node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto4 = Object.prototype;
var hasOwnProperty3 = objectProto4.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty3.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// node_modules/lodash-es/_hashHas.js
var objectProto5 = Object.prototype;
var hasOwnProperty4 = objectProto5.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty4.call(data, key);
}
var hashHas_default = hashHas;

// node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var hashSet_default = hashSet;

// node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype["delete"] = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default = listCacheClear;

// node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq;

// node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var listCacheDelete_default = listCacheDelete;

// node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var listCacheGet_default = listCacheGet;

// node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var listCacheSet_default = listCacheSet;

// node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype["delete"] = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// node_modules/lodash-es/_Map.js
var Map2 = getNative_default(root_default, "Map");
var Map_default = Map2;

// node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// node_modules/lodash-es/_getMapData.js
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result = getMapData_default(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var mapCacheDelete_default = mapCacheDelete;

// node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var mapCacheSet_default = mapCacheSet;

// node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype["delete"] = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// node_modules/lodash-es/_setCacheAdd.js
var HASH_UNDEFINED3 = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED3);
  return this;
}
var setCacheAdd_default = setCacheAdd;

// node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
var setCacheHas_default = setCacheHas;

// node_modules/lodash-es/_SetCache.js
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache_default();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
SetCache.prototype.has = setCacheHas_default;
var SetCache_default = SetCache;

// node_modules/lodash-es/_baseFindIndex.js
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
var baseFindIndex_default = baseFindIndex;

// node_modules/lodash-es/_baseIsNaN.js
function baseIsNaN(value) {
  return value !== value;
}
var baseIsNaN_default = baseIsNaN;

// node_modules/lodash-es/_strictIndexOf.js
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
var strictIndexOf_default = strictIndexOf;

// node_modules/lodash-es/_baseIndexOf.js
function baseIndexOf(array, value, fromIndex) {
  return value === value ? strictIndexOf_default(array, value, fromIndex) : baseFindIndex_default(array, baseIsNaN_default, fromIndex);
}
var baseIndexOf_default = baseIndexOf;

// node_modules/lodash-es/_arrayIncludes.js
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf_default(array, value, 0) > -1;
}
var arrayIncludes_default = arrayIncludes;

// node_modules/lodash-es/_arrayIncludesWith.js
function arrayIncludesWith(array, value, comparator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}
var arrayIncludesWith_default = arrayIncludesWith;

// node_modules/lodash-es/_arrayMap.js
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var arrayMap_default = arrayMap;

// node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// node_modules/lodash-es/_cacheHas.js
function cacheHas(cache, key) {
  return cache.has(key);
}
var cacheHas_default = cacheHas;

// node_modules/lodash-es/_baseDifference.js
var LARGE_ARRAY_SIZE = 200;
function baseDifference(array, values, iteratee, comparator) {
  var index = -1, includes = arrayIncludes_default, isCommon = true, length = array.length, result = [], valuesLength = values.length;
  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap_default(values, baseUnary_default(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith_default;
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas_default;
    isCommon = false;
    values = new SetCache_default(values);
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee == null ? value : iteratee(value);
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values[valuesIndex] === computed) {
            continue outer;
          }
        }
        result.push(value);
      } else if (!includes(values, computed, comparator)) {
        result.push(value);
      }
    }
  return result;
}
var baseDifference_default = baseDifference;

// node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var arrayPush_default = arrayPush;

// node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// node_modules/lodash-es/_baseIsArguments.js
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var baseIsArguments_default = baseIsArguments;

// node_modules/lodash-es/isArguments.js
var objectProto6 = Object.prototype;
var hasOwnProperty5 = objectProto6.hasOwnProperty;
var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
var isArguments = baseIsArguments_default(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments_default : function(value) {
  return isObjectLike_default(value) && hasOwnProperty5.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_default = isArguments;

// node_modules/lodash-es/isArray.js
var isArray = Array.isArray;
var isArray_default = isArray;

// node_modules/lodash-es/_isFlattenable.js
var spreadableSymbol = Symbol_default ? Symbol_default.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return isArray_default(value) || isArguments_default(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var isFlattenable_default = isFlattenable;

// node_modules/lodash-es/_baseFlatten.js
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1, length = array.length;
  predicate || (predicate = isFlattenable_default);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush_default(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
var baseFlatten_default = baseFlatten;

// node_modules/lodash-es/identity.js
function identity(value) {
  return value;
}
var identity_default = identity;

// node_modules/lodash-es/_apply.js
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var apply_default = apply;

// node_modules/lodash-es/_overRest.js
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply_default(func, this, otherArgs);
  };
}
var overRest_default = overRest;

// node_modules/lodash-es/constant.js
function constant(value) {
  return function() {
    return value;
  };
}
var constant_default = constant;

// node_modules/lodash-es/_defineProperty.js
var defineProperty = function() {
  try {
    var func = getNative_default(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var defineProperty_default = defineProperty;

// node_modules/lodash-es/_baseSetToString.js
var baseSetToString = !defineProperty_default ? identity_default : function(func, string) {
  return defineProperty_default(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant_default(string),
    "writable": true
  });
};
var baseSetToString_default = baseSetToString;

// node_modules/lodash-es/_shortOut.js
var HOT_COUNT = 800;
var HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var shortOut_default = shortOut;

// node_modules/lodash-es/_setToString.js
var setToString = shortOut_default(baseSetToString_default);
var setToString_default = setToString;

// node_modules/lodash-es/_baseRest.js
function baseRest(func, start) {
  return setToString_default(overRest_default(func, start, identity_default), func + "");
}
var baseRest_default = baseRest;

// node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_default = isLength;

// node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// node_modules/lodash-es/isArrayLikeObject.js
function isArrayLikeObject(value) {
  return isObjectLike_default(value) && isArrayLike_default(value);
}
var isArrayLikeObject_default = isArrayLikeObject;

// node_modules/lodash-es/last.js
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
var last_default = last;

// node_modules/lodash-es/differenceWith.js
var differenceWith = baseRest_default(function(array, values) {
  var comparator = last_default(values);
  if (isArrayLikeObject_default(comparator)) {
    comparator = void 0;
  }
  return isArrayLikeObject_default(array) ? baseDifference_default(array, baseFlatten_default(values, 1, isArrayLikeObject_default, true), void 0, comparator) : [];
});
var differenceWith_default = differenceWith;

// node_modules/lodash-es/_Set.js
var Set2 = getNative_default(root_default, "Set");
var Set_default = Set2;

// node_modules/lodash-es/noop.js
function noop3() {
}
var noop_default = noop3;

// node_modules/lodash-es/_setToArray.js
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var setToArray_default = setToArray;

// node_modules/lodash-es/_createSet.js
var INFINITY = 1 / 0;
var createSet = !(Set_default && 1 / setToArray_default(new Set_default([, -0]))[1] == INFINITY) ? noop_default : function(values) {
  return new Set_default(values);
};
var createSet_default = createSet;

// node_modules/lodash-es/_baseUniq.js
var LARGE_ARRAY_SIZE2 = 200;
function baseUniq(array, iteratee, comparator) {
  var index = -1, includes = arrayIncludes_default, length = array.length, isCommon = true, result = [], seen = result;
  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith_default;
  } else if (length >= LARGE_ARRAY_SIZE2) {
    var set = iteratee ? null : createSet_default(array);
    if (set) {
      return setToArray_default(set);
    }
    isCommon = false;
    includes = cacheHas_default;
    seen = new SetCache_default();
  } else {
    seen = iteratee ? [] : result;
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
  return result;
}
var baseUniq_default = baseUniq;

// node_modules/lodash-es/unionWith.js
var unionWith = baseRest_default(function(arrays) {
  var comparator = last_default(arrays);
  comparator = typeof comparator == "function" ? comparator : void 0;
  return baseUniq_default(baseFlatten_default(arrays, 1, isArrayLikeObject_default, true), void 0, comparator);
});
var unionWith_default = unionWith;

// node_modules/@refinedev/core/dist/index.mjs
var import_qs = __toESM(require_lib(), 1);
var import_warn_once = __toESM(require_warn_once(), 1);

// node_modules/lodash-es/fromPairs.js
function fromPairs(pairs) {
  var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
  while (++index < length) {
    var pair = pairs[index];
    result[pair[0]] = pair[1];
  }
  return result;
}
var fromPairs_default = fromPairs;

// node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var arrayFilter_default = arrayFilter;

// node_modules/lodash-es/_baseProperty.js
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
var baseProperty_default = baseProperty;

// node_modules/lodash-es/_baseTimes.js
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var baseTimes_default = baseTimes;

// node_modules/lodash-es/unzip.js
var nativeMax2 = Math.max;
function unzip(array) {
  if (!(array && array.length)) {
    return [];
  }
  var length = 0;
  array = arrayFilter_default(array, function(group) {
    if (isArrayLikeObject_default(group)) {
      length = nativeMax2(group.length, length);
      return true;
    }
  });
  return baseTimes_default(length, function(index) {
    return arrayMap_default(array, baseProperty_default(index));
  });
}
var unzip_default = unzip;

// node_modules/lodash-es/zip.js
var zip = baseRest_default(unzip_default);
var zip_default = zip;

// node_modules/@refinedev/core/dist/index.mjs
var import_pluralize = __toESM(require_pluralize(), 1);
var import_react5 = __toESM(require_react(), 1);
var import_pluralize2 = __toESM(require_pluralize(), 1);
var import_react6 = __toESM(require_react(), 1);
var import_react7 = __toESM(require_react(), 1);
var import_react8 = __toESM(require_react(), 1);
var import_react9 = __toESM(require_react(), 1);
var import_react10 = __toESM(require_react(), 1);
var import_react11 = __toESM(require_react(), 1);
var import_react12 = __toESM(require_react(), 1);
var import_react13 = __toESM(require_react(), 1);

// node_modules/lodash-es/now.js
var now = function() {
  return root_default.Date.now();
};
var now_default = now;

// node_modules/lodash-es/_trimmedEndIndex.js
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var trimmedEndIndex_default = trimmedEndIndex;

// node_modules/lodash-es/_baseTrim.js
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
var baseTrim_default = baseTrim;

// node_modules/lodash-es/isSymbol.js
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
}
var isSymbol_default = isSymbol;

// node_modules/lodash-es/toNumber.js
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN;
  }
  if (isObject_default(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject_default(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim_default(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_default = toNumber;

// node_modules/lodash-es/debounce.js
var FUNC_ERROR_TEXT = "Expected a function";
var nativeMax3 = Math.max;
var nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber_default(wait) || 0;
  if (isObject_default(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax3(toNumber_default(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now_default();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now_default());
  }
  function debounced() {
    var time = now_default(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var debounce_default = debounce;

// node_modules/@refinedev/core/dist/index.mjs
var import_react14 = __toESM(require_react(), 1);
var import_qs2 = __toESM(require_lib(), 1);
var import_react15 = __toESM(require_react(), 1);
var import_qs3 = __toESM(require_lib(), 1);
var import_react16 = __toESM(require_react(), 1);
var import_warn_once2 = __toESM(require_warn_once(), 1);
var import_react17 = __toESM(require_react(), 1);
var import_react18 = __toESM(require_react(), 1);
var import_react19 = __toESM(require_react(), 1);
var import_react20 = __toESM(require_react(), 1);
var import_react21 = __toESM(require_react(), 1);
var import_react22 = __toESM(require_react(), 1);
var import_react23 = __toESM(require_react(), 1);
var import_react24 = __toESM(require_react(), 1);
var import_react25 = __toESM(require_react(), 1);

// node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default = stackClear;

// node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var stackDelete_default = stackDelete;

// node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE3 = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE3 - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var stackSet_default = stackSet;

// node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype["delete"] = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var arraySome_default = arraySome;

// node_modules/lodash-es/_equalArrays.js
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function(othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var equalArrays_default = equalArrays;

// node_modules/lodash-es/_Uint8Array.js
var Uint8Array2 = root_default.Uint8Array;
var Uint8Array_default = Uint8Array2;

// node_modules/lodash-es/_mapToArray.js
function mapToArray(map) {
  var index = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var mapToArray_default = mapToArray;

// node_modules/lodash-es/_equalByTag.js
var COMPARE_PARTIAL_FLAG2 = 1;
var COMPARE_UNORDERED_FLAG2 = 2;
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var symbolTag2 = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq_default(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag:
      var convert = mapToArray_default;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag2:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var equalByTag_default = equalByTag;

// node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// node_modules/lodash-es/_getSymbols.js
var objectProto7 = Object.prototype;
var propertyIsEnumerable2 = objectProto7.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable2.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default = stubFalse;

// node_modules/lodash-es/isBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer2 = moduleExports ? root_default.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse_default;
var isBuffer_default = isBuffer;

// node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER2 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var isIndex_default = isIndex;

// node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var errorTag2 = "[object Error]";
var funcTag2 = "[object Function]";
var mapTag2 = "[object Map]";
var numberTag2 = "[object Number]";
var objectTag = "[object Object]";
var regexpTag2 = "[object RegExp]";
var setTag2 = "[object Set]";
var stringTag2 = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag2 = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag2] = typedArrayTags[boolTag2] = typedArrayTags[dataViewTag2] = typedArrayTags[dateTag2] = typedArrayTags[errorTag2] = typedArrayTags[funcTag2] = typedArrayTags[mapTag2] = typedArrayTags[numberTag2] = typedArrayTags[objectTag] = typedArrayTags[regexpTag2] = typedArrayTags[setTag2] = typedArrayTags[stringTag2] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// node_modules/lodash-es/_nodeUtil.js
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
var freeProcess = moduleExports2 && freeGlobal_default.process;
var nodeUtil = function() {
  try {
    var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeUtil_default = nodeUtil;

// node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
var isTypedArray_default = isTypedArray;

// node_modules/lodash-es/_arrayLikeKeys.js
var objectProto8 = Object.prototype;
var hasOwnProperty6 = objectProto8.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty6.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex_default(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var arrayLikeKeys_default = arrayLikeKeys;

// node_modules/lodash-es/_isPrototype.js
var objectProto9 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto9;
  return value === proto;
}
var isPrototype_default = isPrototype;

// node_modules/lodash-es/_overArg.js
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var overArg_default = overArg;

// node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object);
var nativeKeys_default = nativeKeys;

// node_modules/lodash-es/_baseKeys.js
var objectProto10 = Object.prototype;
var hasOwnProperty7 = objectProto10.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty7.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var baseKeys_default = baseKeys;

// node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// node_modules/lodash-es/_equalObjects.js
var COMPARE_PARTIAL_FLAG3 = 1;
var objectProto11 = Object.prototype;
var hasOwnProperty8 = objectProto11.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty8.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var equalObjects_default = equalObjects;

// node_modules/lodash-es/_DataView.js
var DataView2 = getNative_default(root_default, "DataView");
var DataView_default = DataView2;

// node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise");
var Promise_default = Promise2;

// node_modules/lodash-es/_WeakMap.js
var WeakMap2 = getNative_default(root_default, "WeakMap");
var WeakMap_default = WeakMap2;

// node_modules/lodash-es/_getTag.js
var mapTag3 = "[object Map]";
var objectTag2 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag3 = "[object Set]";
var weakMapTag2 = "[object WeakMap]";
var dataViewTag3 = "[object DataView]";
var dataViewCtorString = toSource_default(DataView_default);
var mapCtorString = toSource_default(Map_default);
var promiseCtorString = toSource_default(Promise_default);
var setCtorString = toSource_default(Set_default);
var weakMapCtorString = toSource_default(WeakMap_default);
var getTag = baseGetTag_default;
if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag3 || Map_default && getTag(new Map_default()) != mapTag3 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag3 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
  getTag = function(value) {
    var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag3;
        case mapCtorString:
          return mapTag3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag3;
        case weakMapCtorString:
          return weakMapTag2;
      }
    }
    return result;
  };
}
var getTag_default = getTag;

// node_modules/lodash-es/_baseIsEqualDeep.js
var COMPARE_PARTIAL_FLAG4 = 1;
var argsTag3 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var objectTag3 = "[object Object]";
var objectProto12 = Object.prototype;
var hasOwnProperty9 = objectProto12.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag2 : getTag_default(object), othTag = othIsArr ? arrayTag2 : getTag_default(other);
  objTag = objTag == argsTag3 ? objectTag3 : objTag;
  othTag = othTag == argsTag3 ? objectTag3 : othTag;
  var objIsObj = objTag == objectTag3, othIsObj = othTag == objectTag3, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty9.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty9.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var baseIsEqualDeep_default = baseIsEqualDeep;

// node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var baseIsEqual_default = baseIsEqual;

// node_modules/lodash-es/isEqual.js
function isEqual(value, other) {
  return baseIsEqual_default(value, other);
}
var isEqual_default = isEqual;

// node_modules/@refinedev/core/dist/index.mjs
var import_react26 = __toESM(require_react(), 1);
var import_react27 = __toESM(require_react(), 1);
var import_react28 = __toESM(require_react(), 1);
var import_react29 = __toESM(require_react(), 1);
var import_react30 = __toESM(require_react(), 1);
var import_react31 = __toESM(require_react(), 1);
var import_react32 = __toESM(require_react(), 1);
var import_react33 = __toESM(require_react(), 1);
var import_react34 = __toESM(require_react(), 1);
var import_react35 = __toESM(require_react(), 1);
var import_react36 = __toESM(require_react(), 1);
var import_react37 = __toESM(require_react(), 1);
var import_react38 = __toESM(require_react(), 1);
var import_react39 = __toESM(require_react(), 1);
var import_react40 = __toESM(require_react(), 1);
var import_react41 = __toESM(require_react(), 1);
var import_react42 = __toESM(require_react(), 1);
var import_react43 = __toESM(require_react(), 1);
var import_papaparse = __toESM(require_papaparse_min(), 1);
var import_warn_once3 = __toESM(require_warn_once(), 1);
var import_react44 = __toESM(require_react(), 1);
var import_warn_once4 = __toESM(require_warn_once(), 1);
var import_react45 = __toESM(require_react(), 1);
var import_react46 = __toESM(require_react(), 1);
var import_react47 = __toESM(require_react(), 1);
var import_react48 = __toESM(require_react(), 1);
var import_warn_once5 = __toESM(require_warn_once(), 1);
var import_react49 = __toESM(require_react(), 1);

// node_modules/lodash-es/_baseSlice.js
function baseSlice(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
var baseSlice_default = baseSlice;

// node_modules/lodash-es/_isIterateeCall.js
function isIterateeCall(value, index, object) {
  if (!isObject_default(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike_default(object) && isIndex_default(index, object.length) : type == "string" && index in object) {
    return eq_default(object[index], value);
  }
  return false;
}
var isIterateeCall_default = isIterateeCall;

// node_modules/lodash-es/toFinite.js
var INFINITY2 = 1 / 0;
var MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_default(value);
  if (value === INFINITY2 || value === -INFINITY2) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
var toFinite_default = toFinite;

// node_modules/lodash-es/toInteger.js
function toInteger(value) {
  var result = toFinite_default(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
var toInteger_default = toInteger;

// node_modules/lodash-es/chunk.js
var nativeCeil = Math.ceil;
var nativeMax4 = Math.max;
function chunk(array, size, guard) {
  if (guard ? isIterateeCall_default(array, size, guard) : size === void 0) {
    size = 1;
  } else {
    size = nativeMax4(toInteger_default(size), 0);
  }
  var length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  var index = 0, resIndex = 0, result = Array(nativeCeil(length / size));
  while (index < length) {
    result[resIndex++] = baseSlice_default(array, index, index += size);
  }
  return result;
}
var chunk_default = chunk;

// node_modules/@refinedev/core/dist/index.mjs
var import_papaparse2 = __toESM(require_papaparse_min(), 1);
var import_react50 = __toESM(require_react(), 1);
var import_react51 = __toESM(require_react(), 1);
var import_warn_once6 = __toESM(require_warn_once(), 1);
var import_react52 = __toESM(require_react(), 1);
var import_react53 = __toESM(require_react(), 1);
var import_react54 = __toESM(require_react(), 1);
var import_react55 = __toESM(require_react(), 1);
var import_react56 = __toESM(require_react(), 1);
var import_react57 = __toESM(require_react(), 1);

// node_modules/lodash-es/_isKey.js
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray_default(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var isKey_default = isKey;

// node_modules/lodash-es/memoize.js
var FUNC_ERROR_TEXT2 = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT2);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache_default)();
  return memoized;
}
memoize.Cache = MapCache_default;
var memoize_default = memoize;

// node_modules/lodash-es/_memoizeCapped.js
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize_default(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var memoizeCapped_default = memoizeCapped;

// node_modules/lodash-es/_stringToPath.js
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped_default(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
var stringToPath_default = stringToPath;

// node_modules/lodash-es/_baseToString.js
var INFINITY3 = 1 / 0;
var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolToString = symbolProto2 ? symbolProto2.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_default(value)) {
    return arrayMap_default(value, baseToString) + "";
  }
  if (isSymbol_default(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY3 ? "-0" : result;
}
var baseToString_default = baseToString;

// node_modules/lodash-es/toString.js
function toString(value) {
  return value == null ? "" : baseToString_default(value);
}
var toString_default = toString;

// node_modules/lodash-es/_castPath.js
function castPath(value, object) {
  if (isArray_default(value)) {
    return value;
  }
  return isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
}
var castPath_default = castPath;

// node_modules/lodash-es/_toKey.js
var INFINITY4 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol_default(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY4 ? "-0" : result;
}
var toKey_default = toKey;

// node_modules/lodash-es/_baseGet.js
function baseGet(object, path) {
  path = castPath_default(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey_default(path[index++])];
  }
  return index && index == length ? object : void 0;
}
var baseGet_default = baseGet;

// node_modules/lodash-es/get.js
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet_default(object, path);
  return result === void 0 ? defaultValue : result;
}
var get_default = get;

// node_modules/lodash-es/_baseIsMatch.js
var COMPARE_PARTIAL_FLAG5 = 1;
var COMPARE_UNORDERED_FLAG3 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack_default();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG5 | COMPARE_UNORDERED_FLAG3, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var baseIsMatch_default = baseIsMatch;

// node_modules/lodash-es/_isStrictComparable.js
function isStrictComparable(value) {
  return value === value && !isObject_default(value);
}
var isStrictComparable_default = isStrictComparable;

// node_modules/lodash-es/_getMatchData.js
function getMatchData(object) {
  var result = keys_default(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable_default(value)];
  }
  return result;
}
var getMatchData_default = getMatchData;

// node_modules/lodash-es/_matchesStrictComparable.js
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var matchesStrictComparable_default = matchesStrictComparable;

// node_modules/lodash-es/_baseMatches.js
function baseMatches(source) {
  var matchData = getMatchData_default(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch_default(object, source, matchData);
  };
}
var baseMatches_default = baseMatches;

// node_modules/lodash-es/_baseHasIn.js
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
var baseHasIn_default = baseHasIn;

// node_modules/lodash-es/_hasPath.js
function hasPath(object, path, hasFunc) {
  path = castPath_default(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey_default(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_default(length) && isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
}
var hasPath_default = hasPath;

// node_modules/lodash-es/hasIn.js
function hasIn(object, path) {
  return object != null && hasPath_default(object, path, baseHasIn_default);
}
var hasIn_default = hasIn;

// node_modules/lodash-es/_baseMatchesProperty.js
var COMPARE_PARTIAL_FLAG6 = 1;
var COMPARE_UNORDERED_FLAG4 = 2;
function baseMatchesProperty(path, srcValue) {
  if (isKey_default(path) && isStrictComparable_default(srcValue)) {
    return matchesStrictComparable_default(toKey_default(path), srcValue);
  }
  return function(object) {
    var objValue = get_default(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path) : baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG6 | COMPARE_UNORDERED_FLAG4);
  };
}
var baseMatchesProperty_default = baseMatchesProperty;

// node_modules/lodash-es/_basePropertyDeep.js
function basePropertyDeep(path) {
  return function(object) {
    return baseGet_default(object, path);
  };
}
var basePropertyDeep_default = basePropertyDeep;

// node_modules/lodash-es/property.js
function property(path) {
  return isKey_default(path) ? baseProperty_default(toKey_default(path)) : basePropertyDeep_default(path);
}
var property_default = property;

// node_modules/lodash-es/_baseIteratee.js
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_default;
  }
  if (typeof value == "object") {
    return isArray_default(value) ? baseMatchesProperty_default(value[0], value[1]) : baseMatches_default(value);
  }
  return property_default(value);
}
var baseIteratee_default = baseIteratee;

// node_modules/lodash-es/uniqBy.js
function uniqBy(array, iteratee) {
  return array && array.length ? baseUniq_default(array, baseIteratee_default(iteratee, 2)) : [];
}
var uniqBy_default = uniqBy;

// node_modules/@refinedev/core/dist/index.mjs
var import_react58 = __toESM(require_react(), 1);
var import_qs4 = __toESM(require_lib(), 1);
var import_warn_once7 = __toESM(require_warn_once(), 1);
var import_react59 = __toESM(require_react(), 1);
var import_react60 = __toESM(require_react(), 1);
var import_react61 = __toESM(require_react(), 1);
var import_react62 = __toESM(require_react(), 1);
var import_warn_once8 = __toESM(require_warn_once(), 1);
var import_react63 = __toESM(require_react(), 1);
var import_react64 = __toESM(require_react(), 1);
var import_react65 = __toESM(require_react(), 1);
var import_react66 = __toESM(require_react(), 1);
var import_react67 = __toESM(require_react(), 1);
var import_react68 = __toESM(require_react(), 1);
var import_react69 = __toESM(require_react(), 1);
var import_react70 = __toESM(require_react(), 1);
var import_react71 = __toESM(require_react(), 1);
var import_react72 = __toESM(require_react(), 1);
var import_react73 = __toESM(require_react(), 1);
var import_react74 = __toESM(require_react(), 1);
var import_react75 = __toESM(require_react(), 1);
var import_react76 = __toESM(require_react(), 1);
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
var na = Object.defineProperty;
var o = (e, t) => na(e, "name", { value: t, configurable: true });
var Xo = import_react4.default.createContext({});
var Zo = o(({ children: e, isProvided: t, ...r }) => {
  let { replace: s } = he(), n = o(async (c2) => {
    var p3;
    try {
      return await ((p3 = r.login) == null ? void 0 : p3.call(r, c2));
    } catch (l2) {
      return Promise.reject(l2);
    }
  }, "loginFunc"), i2 = o(async (c2) => {
    var p3;
    try {
      return await ((p3 = r.register) == null ? void 0 : p3.call(r, c2));
    } catch (l2) {
      return Promise.reject(l2);
    }
  }, "registerFunc"), a = o(async (c2) => {
    var p3;
    try {
      return await ((p3 = r.logout) == null ? void 0 : p3.call(r, c2));
    } catch (l2) {
      return Promise.reject(l2);
    }
  }, "logoutFunc"), u2 = o(async (c2) => {
    var p3;
    try {
      return await ((p3 = r.checkAuth) == null ? void 0 : p3.call(r, c2)), Promise.resolve();
    } catch (l2) {
      return l2 != null && l2.redirectPath && s(l2.redirectPath), Promise.reject(l2);
    }
  }, "checkAuthFunc");
  return import_react4.default.createElement(Xo.Provider, { value: { ...r, login: n, logout: a, checkAuth: u2, register: i2, isProvided: t } }, e);
}, "LegacyAuthContextProvider");
var Yo = import_react4.default.createContext({});
var Jo = o(({ children: e, isProvided: t, ...r }) => {
  let s = o(async (p3) => {
    var l2;
    try {
      return await ((l2 = r.login) == null ? void 0 : l2.call(r, p3));
    } catch (m2) {
      return console.warn("Unhandled Error in login: refine always expects a resolved promise.", m2), Promise.reject(m2);
    }
  }, "handleLogin"), n = o(async (p3) => {
    var l2;
    try {
      return await ((l2 = r.register) == null ? void 0 : l2.call(r, p3));
    } catch (m2) {
      return console.warn("Unhandled Error in register: refine always expects a resolved promise.", m2), Promise.reject(m2);
    }
  }, "handleRegister"), i2 = o(async (p3) => {
    var l2;
    try {
      return await ((l2 = r.logout) == null ? void 0 : l2.call(r, p3));
    } catch (m2) {
      return console.warn("Unhandled Error in logout: refine always expects a resolved promise.", m2), Promise.reject(m2);
    }
  }, "handleLogout"), a = o(async (p3) => {
    var l2;
    try {
      let m2 = await ((l2 = r.check) == null ? void 0 : l2.call(r, p3));
      return Promise.resolve(m2);
    } catch (m2) {
      return console.warn("Unhandled Error in check: refine always expects a resolved promise.", m2), Promise.reject(m2);
    }
  }, "handleCheck"), u2 = o(async (p3) => {
    var l2;
    try {
      let m2 = await ((l2 = r.forgotPassword) == null ? void 0 : l2.call(r, p3));
      return Promise.resolve(m2);
    } catch (m2) {
      return console.warn("Unhandled Error in forgotPassword: refine always expects a resolved promise.", m2), Promise.reject(m2);
    }
  }, "handleForgotPassword"), c2 = o(async (p3) => {
    var l2;
    try {
      let m2 = await ((l2 = r.updatePassword) == null ? void 0 : l2.call(r, p3));
      return Promise.resolve(m2);
    } catch (m2) {
      return console.warn("Unhandled Error in updatePassword: refine always expects a resolved promise.", m2), Promise.reject(m2);
    }
  }, "handleUpdatePassword");
  return import_react4.default.createElement(Yo.Provider, { value: { ...r, login: s, logout: i2, check: a, register: n, forgotPassword: u2, updatePassword: c2, isProvided: t } }, e);
}, "AuthBindingsContextProvider");
var xe = o(() => import_react4.default.useContext(Xo), "useLegacyAuthContext");
var Ue = o(() => import_react4.default.useContext(Yo), "useAuthBindingsContext");
var Bt = o((e) => e / 1e3, "userFriendlySecond");
var sr = o((e, t = (r) => r) => {
  let [r, ...s] = e;
  return s.map((n) => fromPairs_default(zip_default(r, n))).map((n, i2, a) => t.call(void 0, n, i2, a));
}, "importCSVMapper");
var nr = o((e = "", t) => {
  let r = Kt(e);
  return t === "singular" ? import_pluralize.default.singular(r) : import_pluralize.default.plural(r);
}, "userFriendlyResourceName");
var es = o((e = {}) => e != null && e.id ? { ...e, id: decodeURIComponent(e.id) } : e, "handleUseParams");
function pt(e, t) {
  return e.findIndex((r, s) => s <= e.length - t.length && t.every((n, i2) => e[s + i2] === n));
}
o(pt, "arrayFindIndex");
function ua(e) {
  if (e[0] === "data") {
    let t = e.slice(1);
    if (t[2] === "many") t[2] = "getMany";
    else if (t[2] === "infinite") t[2] = "list";
    else if (t[2] === "one") t[2] = "detail";
    else if (t[1] === "custom") {
      let r = { ...t[2] };
      return delete r.method, delete r.url, [t[0], t[1], t[2].method, t[2].url, r];
    }
    return t;
  }
  if (e[0] === "audit" && e[2] === "list") return ["logList", e[1], e[3]];
  if (e[0] === "access" && e.length === 4) return ["useCan", { resource: e[1], action: e[2], ...e[3] }];
  if (e[0] === "auth") {
    if (pt(e, ["auth", "login"]) !== -1) return ["useLogin"];
    if (pt(e, ["auth", "logout"]) !== -1) return ["useLogout"];
    if (pt(e, ["auth", "identity"]) !== -1) return ["getUserIdentity"];
    if (pt(e, ["auth", "register"]) !== -1) return ["useRegister"];
    if (pt(e, ["auth", "forgotPassword"]) !== -1) return ["useForgotPassword"];
    if (pt(e, ["auth", "check"]) !== -1) return ["useAuthenticated", e[2]];
    if (pt(e, ["auth", "onError"]) !== -1) return ["useCheckError"];
    if (pt(e, ["auth", "permissions"]) !== -1) return ["usePermissions"];
    if (pt(e, ["auth", "updatePassword"]) !== -1) return ["useUpdatePassword"];
  }
  return e;
}
o(ua, "convertToLegacy");
var Oe = class {
  constructor(t = []) {
    this.segments = [];
    this.segments = t;
  }
  key() {
    return this.segments;
  }
  legacy() {
    return ua(this.segments);
  }
  get(t) {
    return t ? this.legacy() : this.segments;
  }
};
o(Oe, "BaseKeyBuilder");
var st = class extends Oe {
  params(t) {
    return new Oe([...this.segments, t]);
  }
};
o(st, "ParamsKeyBuilder");
var ar = class extends Oe {
  id(t) {
    return new st([...this.segments, t ? String(t) : void 0]);
  }
};
o(ar, "DataIdRequiringKeyBuilder");
var ir = class extends Oe {
  ids(...t) {
    return new st([...this.segments, ...t.length ? [t.map((r) => String(r))] : []]);
  }
};
o(ir, "DataIdsRequiringKeyBuilder");
var ur = class extends Oe {
  action(t) {
    if (t === "one") return new ar([...this.segments, t]);
    if (t === "many") return new ir([...this.segments, t]);
    if (["list", "infinite"].includes(t)) return new st([...this.segments, t]);
    throw new Error("Invalid action type");
  }
};
o(ur, "DataResourceKeyBuilder");
var cr = class extends Oe {
  resource(t) {
    return new ur([...this.segments, t]);
  }
  mutation(t) {
    return new st([...t === "custom" ? this.segments : [this.segments[0]], t]);
  }
};
o(cr, "DataKeyBuilder");
var pr = class extends Oe {
  action(t) {
    return new st([...this.segments, t]);
  }
};
o(pr, "AuthKeyBuilder");
var dr = class extends Oe {
  action(t) {
    return new st([...this.segments, t]);
  }
};
o(dr, "AccessResourceKeyBuilder");
var lr = class extends Oe {
  resource(t) {
    return new dr([...this.segments, t]);
  }
};
o(lr, "AccessKeyBuilder");
var mr = class extends Oe {
  action(t) {
    return new st([...this.segments, t]);
  }
};
o(mr, "AuditActionKeyBuilder");
var fr = class extends Oe {
  resource(t) {
    return new mr([...this.segments, t]);
  }
  action(t) {
    return new st([...this.segments, t]);
  }
};
o(fr, "AuditKeyBuilder");
var wt = class extends Oe {
  data(t) {
    return new cr(["data", t || "default"]);
  }
  auth() {
    return new pr(["auth"]);
  }
  access() {
    return new lr(["access"]);
  }
  audit() {
    return new fr(["audit"]);
  }
};
o(wt, "KeyBuilder");
var nt = o(() => new wt([]), "keys");
var I2 = o((...e) => e.find((t) => typeof t < "u"), "pickNotDeprecated");
var ts = o((e, t, r, s) => {
  let n = t || "default", i2 = { all: [n], resourceAll: [n, e || ""], list: (a) => [...i2.resourceAll, "list", { ...a, ...I2(r, s) || {} }], many: (a) => [...i2.resourceAll, "getMany", a == null ? void 0 : a.map(String), { ...I2(r, s) || {} }].filter((u2) => u2 !== void 0), detail: (a) => [...i2.resourceAll, "detail", a == null ? void 0 : a.toString(), { ...I2(r, s) || {} }], logList: (a) => ["logList", e, a, s].filter((u2) => u2 !== void 0) };
  return i2;
}, "queryKeys");
var dt = o((e) => (t, r, s, n) => {
  let i2 = r || "default";
  return { all: nt().data(i2).get(e), resourceAll: nt().data(r).resource(t ?? "").get(e), list: (u2) => nt().data(r).resource(t ?? "").action("list").params({ ...u2, ...I2(s, n) || {} }).get(e), many: (u2) => nt().data(r).resource(t ?? "").action("many").ids(...u2 ?? []).params({ ...I2(s, n) || {} }).get(e), detail: (u2) => nt().data(r).resource(t ?? "").action("one").id(u2 ?? "").params({ ...I2(s, n) || {} }).get(e), logList: (u2) => [...nt().audit().resource(t).action("list").params(u2).get(e), n].filter((c2) => c2 !== void 0) };
}, "queryKeysReplacement");
var Xr = o((e, t) => !e || !t ? false : !!e.find((r) => r === t), "hasPermission");
var It = o((e) => e.startsWith(":"), "isParameter");
var it = o((e) => e.split("/").filter((r) => r !== ""), "splitToSegments");
var rs = o((e, t) => {
  let r = it(e), s = it(t);
  return r.length === s.length;
}, "isSegmentCountsSame");
var ke = o((e) => e.replace(/^\/|\/$/g, ""), "removeLeadingTrailingSlashes");
var os = o((e, t) => {
  let r = ke(e), s = ke(t);
  if (!rs(r, s)) return false;
  let n = it(r);
  return it(s).every((a, u2) => It(a) || a === n[u2]);
}, "checkBySegments");
var ss = o((e, t, r) => {
  let s = ke(r || ""), n = `${s}${s ? "/" : ""}${e}`;
  return t === "list" ? n = `${n}` : t === "create" ? n = `${n}/create` : t === "edit" ? n = `${n}/edit/:id` : t === "show" ? n = `${n}/show/:id` : t === "clone" && (n = `${n}/clone/:id`), `/${n.replace(/^\//, "")}`;
}, "getDefaultActionPath");
var ze = o((e, t) => {
  var n, i2;
  let r = I2((n = e.meta) == null ? void 0 : n.parent, (i2 = e.options) == null ? void 0 : i2.parent, e.parentName);
  return r ? t.find((a) => (a.identifier ?? a.name) === r) ?? { name: r } : void 0;
}, "getParentResource");
var Gt = o((e, t, r) => {
  let s = [], n = ze(e, t);
  for (; n; ) s.push(n), n = ze(n, t);
  if (s.length !== 0) return `/${s.reverse().map((i2) => {
    var u2;
    let a = r ? ((u2 = i2.options) == null ? void 0 : u2.route) ?? i2.name : i2.name;
    return ke(a);
  }).join("/")}`;
}, "getParentPrefixForResource");
var Se = o((e, t, r) => {
  let s = [], n = ["list", "show", "edit", "create", "clone"], i2 = Gt(e, t, r);
  return n.forEach((a) => {
    var p3, l2;
    let u2 = r && a === "clone" ? e.create : e[a], c2;
    typeof u2 == "function" || r ? c2 = ss(r ? ((p3 = e.meta) == null ? void 0 : p3.route) ?? ((l2 = e.options) == null ? void 0 : l2.route) ?? e.name : e.name, a, r ? i2 : void 0) : typeof u2 == "string" ? c2 = u2 : typeof u2 == "object" && (c2 = u2.path), c2 && s.push({ action: a, resource: e, route: `/${c2.replace(/^\//, "")}` });
  }), s;
}, "getActionRoutesFromResource");
var ns = o((e) => {
  var n;
  if (e.length === 0) return;
  if (e.length === 1) return e[0];
  let t = e.map((i2) => ({ ...i2, splitted: it(ke(i2.route)) })), r = ((n = t[0]) == null ? void 0 : n.splitted.length) ?? 0, s = [...t];
  for (let i2 = 0; i2 < r; i2++) {
    let a = s.filter((u2) => !It(u2.splitted[i2]));
    if (a.length !== 0) {
      if (a.length === 1) {
        s = a;
        break;
      }
      s = a;
    }
  }
  return s[0];
}, "pickMatchedRoute");
var as = o((e, t) => {
  let s = t.flatMap((i2) => Se(i2, t)).filter((i2) => os(e, i2.route)), n = ns(s);
  return { found: !!n, resource: n == null ? void 0 : n.resource, action: n == null ? void 0 : n.action, matchedRoute: n == null ? void 0 : n.route };
}, "matchResourceFromRoute");
var yr = o((e, t) => {
  var n;
  let r, s = Gt(e, t, true);
  if (s) {
    let i2 = I2(e.meta, e.options);
    r = `${s}/${(i2 == null ? void 0 : i2.route) ?? e.name}`;
  } else r = ((n = e.options) == null ? void 0 : n.route) ?? e.name;
  return `/${r.replace(/^\//, "")}`;
}, "routeGenerator");
var is = o((e) => {
  var a;
  let t = [], r = {}, s = {}, n, i2;
  for (let u2 = 0; u2 < e.length; u2++) {
    n = e[u2];
    let c2 = n.route ?? ((a = I2(n == null ? void 0 : n.meta, n.options)) == null ? void 0 : a.route) ?? "";
    r[c2] = n, r[c2].children = [], s[n.name] = n, s[n.name].children = [];
  }
  for (let u2 in r) Object.hasOwn(r, u2) && (i2 = r[u2], i2.parentName && s[i2.parentName] ? s[i2.parentName].children.push(i2) : t.push(i2));
  return t;
}, "createTreeView");
var Kt = o((e) => (e = e.replace(/([a-z]{1})([A-Z]{1})/g, "$1-$2"), e = e.replace(/([A-Z]{1})([A-Z]{1})([a-z]{1})/g, "$1-$2$3"), e = e.toLowerCase().replace(/[_-]+/g, " ").replace(/\s{2,}/g, " ").trim(), e = e.charAt(0).toUpperCase() + e.slice(1), e), "humanizeString");
var Zr = o(({ children: e }) => import_react6.default.createElement("div", null, e), "DefaultLayout");
var pa = { icon: import_react5.default.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "data-testid": "refine-logo", id: "refine-default-logo" }, import_react5.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13.7889 0.422291C12.6627 -0.140764 11.3373 -0.140764 10.2111 0.422291L2.21115 4.42229C0.85601 5.09986 0 6.48491 0 8V16C0 17.5151 0.85601 18.9001 2.21115 19.5777L10.2111 23.5777C11.3373 24.1408 12.6627 24.1408 13.7889 23.5777L21.7889 19.5777C23.144 18.9001 24 17.5151 24 16V8C24 6.48491 23.144 5.09986 21.7889 4.42229L13.7889 0.422291ZM8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16V8Z", fill: "currentColor" }), import_react5.default.createElement("path", { d: "M14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8Z", fill: "currentColor" })), text: "Refine Project" };
var Fe = { mutationMode: "pessimistic", syncWithLocation: false, undoableTimeout: 5e3, warnWhenUnsavedChanges: false, liveMode: "off", redirect: { afterCreate: "list", afterClone: "list", afterEdit: "list" }, overtime: { enabled: true, interval: 1e3 }, textTransformers: { humanize: Kt, plural: import_pluralize2.default.plural, singular: import_pluralize2.default.singular }, disableServerSideValidation: false, title: pa };
var Qe = import_react5.default.createContext({ hasDashboard: false, mutationMode: "pessimistic", warnWhenUnsavedChanges: false, syncWithLocation: false, undoableTimeout: 5e3, Title: void 0, Sider: void 0, Header: void 0, Footer: void 0, Layout: Zr, OffLayoutArea: void 0, liveMode: "off", onLiveEvent: void 0, options: Fe });
var cs = o(({ hasDashboard: e, mutationMode: t, warnWhenUnsavedChanges: r, syncWithLocation: s, undoableTimeout: n, children: i2, DashboardPage: a, Title: u2, Layout: c2 = Zr, Header: p3, Sider: l2, Footer: m2, OffLayoutArea: y2, LoginPage: d3 = Yr, catchAll: T3, liveMode: x = "off", onLiveEvent: v, options: f2 }) => import_react5.default.createElement(Qe.Provider, { value: { __initialized: true, hasDashboard: e, mutationMode: t, warnWhenUnsavedChanges: r, syncWithLocation: s, Title: u2, undoableTimeout: n, Layout: c2, Header: p3, Sider: l2, Footer: m2, OffLayoutArea: y2, DashboardPage: a, LoginPage: d3, catchAll: T3, liveMode: x, onLiveEvent: v, options: f2 } }, i2), "RefineContextProvider");
var Jr = o(({ options: e, disableTelemetry: t, liveMode: r, mutationMode: s, reactQueryClientConfig: n, reactQueryDevtoolConfig: i2, syncWithLocation: a, undoableTimeout: u2, warnWhenUnsavedChanges: c2 } = {}) => {
  var y2, d3, T3, x, v, f2, P, M, Q, g2, C2, h;
  let p3 = { breadcrumb: e == null ? void 0 : e.breadcrumb, mutationMode: (e == null ? void 0 : e.mutationMode) ?? s ?? Fe.mutationMode, undoableTimeout: (e == null ? void 0 : e.undoableTimeout) ?? u2 ?? Fe.undoableTimeout, syncWithLocation: (e == null ? void 0 : e.syncWithLocation) ?? a ?? Fe.syncWithLocation, warnWhenUnsavedChanges: (e == null ? void 0 : e.warnWhenUnsavedChanges) ?? c2 ?? Fe.warnWhenUnsavedChanges, liveMode: (e == null ? void 0 : e.liveMode) ?? r ?? Fe.liveMode, redirect: { afterCreate: ((y2 = e == null ? void 0 : e.redirect) == null ? void 0 : y2.afterCreate) ?? Fe.redirect.afterCreate, afterClone: ((d3 = e == null ? void 0 : e.redirect) == null ? void 0 : d3.afterClone) ?? Fe.redirect.afterClone, afterEdit: ((T3 = e == null ? void 0 : e.redirect) == null ? void 0 : T3.afterEdit) ?? Fe.redirect.afterEdit }, overtime: (e == null ? void 0 : e.overtime) ?? Fe.overtime, textTransformers: { humanize: ((x = e == null ? void 0 : e.textTransformers) == null ? void 0 : x.humanize) ?? Fe.textTransformers.humanize, plural: ((v = e == null ? void 0 : e.textTransformers) == null ? void 0 : v.plural) ?? Fe.textTransformers.plural, singular: ((f2 = e == null ? void 0 : e.textTransformers) == null ? void 0 : f2.singular) ?? Fe.textTransformers.singular }, disableServerSideValidation: (e == null ? void 0 : e.disableServerSideValidation) ?? Fe.disableServerSideValidation, projectId: e == null ? void 0 : e.projectId, useNewQueryKeys: e == null ? void 0 : e.useNewQueryKeys, title: { icon: typeof ((P = e == null ? void 0 : e.title) == null ? void 0 : P.icon) > "u" ? Fe.title.icon : (M = e == null ? void 0 : e.title) == null ? void 0 : M.icon, text: typeof ((Q = e == null ? void 0 : e.title) == null ? void 0 : Q.text) > "u" ? Fe.title.text : (g2 = e == null ? void 0 : e.title) == null ? void 0 : g2.text } }, l2 = (e == null ? void 0 : e.disableTelemetry) ?? t ?? false, m2 = { clientConfig: ((C2 = e == null ? void 0 : e.reactQuery) == null ? void 0 : C2.clientConfig) ?? n ?? {}, devtoolConfig: ((h = e == null ? void 0 : e.reactQuery) == null ? void 0 : h.devtoolConfig) ?? i2 ?? {} };
  return { optionsWithDefaults: p3, disableTelemetryWithDefault: l2, reactQueryWithDefaults: m2 };
}, "handleRefineOptions");
var qr = o(({ redirectFromProps: e, action: t, redirectOptions: r }) => {
  if (e || e === false) return e;
  switch (t) {
    case "clone":
      return r.afterClone;
    case "create":
      return r.afterCreate;
    case "edit":
      return r.afterEdit;
    default:
      return false;
  }
}, "redirectPage");
var gr = o(async (e, t, r) => {
  let s = [];
  for (let [n, i2] of e.entries()) try {
    let a = await i2();
    s.push(t(a, n));
  } catch (a) {
    s.push(r(a, n));
  }
  return s;
}, "sequentialPromises");
var Ee = o((e, t = [], r = false) => {
  if (!e) return;
  if (r) {
    let n = t.find((a) => ke(a.route ?? "") === ke(e));
    return n || t.find((a) => a.name === e);
  }
  let s = t.find((n) => n.identifier === e);
  return s || (s = t.find((n) => n.name === e)), s;
}, "pickResource");
var ee = o((e, t, r) => {
  if (t) return t;
  let s = Ee(e, r), n = I2(s == null ? void 0 : s.meta, s == null ? void 0 : s.options);
  return n != null && n.dataProviderName ? n.dataProviderName : "default";
}, "pickDataProvider");
var lt = o(async (e) => ({ data: (await Promise.all(e)).map((t) => t.data) }), "handleMultiple");
var Tr = o((e) => {
  let { pagination: t, cursor: r } = e;
  if (r != null && r.next) return r.next;
  let s = (t == null ? void 0 : t.current) || 1, n = (t == null ? void 0 : t.pageSize) || 10, i2 = Math.ceil((e.total || 0) / n);
  return s < i2 ? Number(s) + 1 : void 0;
}, "getNextPageParam");
var xr = o((e) => {
  let { pagination: t, cursor: r } = e;
  if (r != null && r.prev) return r.prev;
  let s = (t == null ? void 0 : t.current) || 1;
  return s === 1 ? void 0 : s - 1;
}, "getPreviousPageParam");
var hr = o((e) => {
  let t = [];
  return e.forEach((r) => {
    var s, n;
    t.push({ ...r, label: ((s = r.meta) == null ? void 0 : s.label) ?? ((n = r.options) == null ? void 0 : n.label), route: yr(r, e), canCreate: !!r.create, canEdit: !!r.edit, canShow: !!r.show, canDelete: r.canDelete });
  }), t;
}, "legacyResourceTransform");
var ps = o((e) => it(ke(e)).flatMap((r) => It(r) ? [r.slice(1)] : []), "pickRouteParams");
var ds = o((e, t = {}) => e.reduce((r, s) => {
  let n = t[s];
  return typeof n < "u" && (r[s] = n), r;
}, {}), "prepareRouteParams");
var We = o((e, t = {}, r = {}, s = {}) => {
  let n = ps(e), i2 = ds(n, { ...t, ...typeof (r == null ? void 0 : r.id) < "u" ? { id: r.id } : {}, ...typeof (r == null ? void 0 : r.action) < "u" ? { action: r.action } : {}, ...typeof (r == null ? void 0 : r.resource) < "u" ? { resource: r.resource } : {}, ...r == null ? void 0 : r.params, ...s });
  return e.replace(/:([^\/]+)/g, (a, u2) => {
    let c2 = i2[u2];
    return typeof c2 < "u" ? `${c2}` : a;
  });
}, "composeRoute");
var ie = o(() => {
  let e = xe(), t = Ue();
  return t.isProvided ? { isLegacy: false, ...t } : e.isProvided ? { isLegacy: true, ...e, check: e.checkAuth, onError: e.checkError, getIdentity: e.getUserIdentity } : null;
}, "useActiveAuthProvider");
var Wt = o(({ hasPagination: e, pagination: t, configPagination: r } = {}) => {
  let s = e === false ? "off" : "server", n = (t == null ? void 0 : t.mode) ?? s, i2 = I2(t == null ? void 0 : t.current, r == null ? void 0 : r.current) ?? 1, a = I2(t == null ? void 0 : t.pageSize, r == null ? void 0 : r.pageSize) ?? 10;
  return { current: i2, pageSize: a, mode: n };
}, "handlePaginationParams");
var Pr = o((e) => {
  let [t, r] = (0, import_react7.useState)(false);
  return (0, import_react7.useEffect)(() => {
    let s = window.matchMedia(e);
    s.matches !== t && r(s.matches);
    let n = o(() => r(s.matches), "listener");
    return window.addEventListener("resize", n), () => window.removeEventListener("resize", n);
  }, [t, e]), t;
}, "useMediaQuery");
var Rr = o((e, t, r, s) => {
  let n = s ? e(t, s, r) : e(t, r), i2 = r ?? t;
  return n === t || typeof n > "u" ? i2 : n;
}, "safeTranslate");
function ls(e, t, r, s, n) {
  var y2;
  let i2 = { create: "Create new ", clone: `#${s ?? ""} Clone `, edit: `#${s ?? ""} Edit `, show: `#${s ?? ""} Show `, list: "" }, a = (t == null ? void 0 : t.identifier) ?? (t == null ? void 0 : t.name), u2 = (t == null ? void 0 : t.label) ?? ((y2 = t == null ? void 0 : t.meta) == null ? void 0 : y2.label) ?? nr(a, r === "list" ? "plural" : "singular"), c2 = n ?? u2, p3 = Rr(e, "documentTitle.default", "Refine"), l2 = Rr(e, "documentTitle.suffix", " | Refine"), m2 = p3;
  return r && a && (m2 = Rr(e, `documentTitle.${a}.${r}`, `${i2[r] ?? ""}${c2}${l2}`, { id: s })), m2;
}
o(ls, "generateDefaultDocumentTitle");
var _e = o((e, t) => {
  let { mutationMode: r, undoableTimeout: s } = (0, import_react8.useContext)(Qe);
  return { mutationMode: e ?? r, undoableTimeout: t ?? s };
}, "useMutationMode");
var eo = import_react10.default.createContext({});
var fs = o(({ children: e }) => {
  let [t, r] = (0, import_react10.useState)(false);
  return import_react10.default.createElement(eo.Provider, { value: { warnWhen: t, setWarnWhen: r } }, e);
}, "UnsavedWarnContextProvider");
var vt = o(() => {
  let { warnWhenUnsavedChanges: e } = (0, import_react9.useContext)(Qe), { warnWhen: t, setWarnWhen: r } = (0, import_react9.useContext)(eo);
  return { warnWhenUnsavedChanges: e, warnWhen: !!t, setWarnWhen: r ?? (() => {
  }) };
}, "useWarnAboutChange");
var to = o(() => {
  let { syncWithLocation: e } = (0, import_react11.useContext)(Qe);
  return { syncWithLocation: e };
}, "useSyncWithLocation");
var Ta = o(() => {
  let { Title: e } = (0, import_react12.useContext)(Qe);
  return e;
}, "useTitle");
var ge = o(() => {
  let { Footer: e, Header: t, Layout: r, OffLayoutArea: s, Sider: n, Title: i2, hasDashboard: a, mutationMode: u2, syncWithLocation: c2, undoableTimeout: p3, warnWhenUnsavedChanges: l2, DashboardPage: m2, LoginPage: y2, catchAll: d3, options: T3, __initialized: x } = (0, import_react13.useContext)(Qe);
  return { __initialized: x, Footer: e, Header: t, Layout: r, OffLayoutArea: s, Sider: n, Title: i2, hasDashboard: a, mutationMode: u2, syncWithLocation: c2, undoableTimeout: p3, warnWhenUnsavedChanges: l2, DashboardPage: m2, LoginPage: y2, catchAll: d3, options: T3 };
}, "useRefineContext");
var ht = o(() => {
  let { options: { textTransformers: e } } = ge();
  return o((r = "", s) => {
    let n = e.humanize(r);
    return s === "singular" ? e.singular(n) : e.plural(n);
  }, "getFriendlyName");
}, "useUserFriendlyName");
var gs = o((e) => typeof e == "object" && e !== null, "isNested");
var ha = o((e) => Array.isArray(e), "isArray");
var Cr = o((e, t = "") => gs(e) ? Object.keys(e).reduce((r, s) => {
  let n = t.length ? `${t}.` : "";
  return gs(e[s]) && Object.keys(e[s]).length && (ha(e[s]) && e[s].length ? e[s].forEach((i2, a) => {
    Object.assign(r, Cr(i2, `${n + s}.${a}`));
  }) : Object.assign(r, Cr(e[s], n + s))), r[n + s] = e[s], r;
}, {}) : { [t]: e }, "flattenObjectKeys");
var Ts = o((e) => e.split(".").map((t) => Number.isNaN(Number(t)) ? t : Number(t)), "propertyPathToArray");
var ro = o((e, t, r) => {
  if (typeof window > "u") return;
  let s = new Blob([t], { type: r }), n = document.createElement("a");
  n.setAttribute("visibility", "hidden"), n.download = e;
  let i2 = URL.createObjectURL(s);
  n.href = i2, document.body.appendChild(n), n.click(), document.body.removeChild(n), setTimeout(() => {
    URL.revokeObjectURL(i2);
  });
}, "downloadInBrowser");
var br = o((e) => {
  setTimeout(e, 0);
}, "deferExecution");
var oo = o((e, t = 1e3, r) => {
  let s = [], n = o(() => {
    s.forEach((u2) => {
      var c2;
      return (c2 = u2.reject) == null ? void 0 : c2.call(u2, r);
    }), s = [];
  }, "cancelPrevious"), i2 = debounce_default((...u2) => {
    let { resolve: c2, reject: p3 } = s.pop() || {};
    Promise.resolve(e(...u2)).then(c2).catch(p3);
  }, t), a = o((...u2) => new Promise((c2, p3) => {
    n(), s.push({ resolve: c2, reject: p3 }), i2(...u2);
  }), "runner");
  return a.flush = () => i2.flush(), a.cancel = () => {
    i2.cancel(), n();
  }, a;
}, "asyncDebounce");
var je = o((e) => {
  let t = { queryKey: e.queryKey, pageParam: e.pageParam };
  return Object.defineProperty(t, "signal", { enumerable: true, get: () => e.signal }), t;
}, "prepareQueryContext");
var vr = o((e) => {
  let { current: t, pageSize: r, sorter: s, sorters: n, filters: i2 } = import_qs.default.parse(e.substring(1));
  return { parsedCurrent: t && Number(t), parsedPageSize: r && Number(r), parsedSorter: I2(n, s) ?? [], parsedFilters: i2 ?? [] };
}, "parseTableParams");
var Ca = o((e) => {
  let t = import_qs.default.stringify(e);
  return vr(`/${t}`);
}, "parseTableParamsFromQuery");
var Dr = o((e) => {
  let t = { skipNulls: true, arrayFormat: "indices", encode: false }, { pagination: r, sorter: s, sorters: n, filters: i2, ...a } = e;
  return import_qs.default.stringify({ ...a, ...r || {}, sorters: I2(n, s), filters: i2 }, t);
}, "stringifyTableParams");
var Ps = o((e, t) => e.operator !== "and" && e.operator !== "or" && t.operator !== "and" && t.operator !== "or" ? ("field" in e ? e.field : void 0) === ("field" in t ? t.field : void 0) && e.operator === t.operator : ("key" in e ? e.key : void 0) === ("key" in t ? t.key : void 0) && e.operator === t.operator, "compareFilters");
var Rs = o((e, t) => e.field === t.field, "compareSorters");
var St = o((e, t, r = []) => (t.filter((n) => (n.operator === "or" || n.operator === "and") && !n.key).length > 1 && (0, import_warn_once.default)(true, `[conditionalFilters]: You have created multiple Conditional Filters at the top level, this requires the key parameter. 
For more information, see https://refine.dev/docs/advanced-tutorials/data-provider/handling-filters/#top-level-multiple-conditional-filters-usage`), unionWith_default(e, t, r, Ps).filter((n) => n.value !== void 0 && n.value !== null && (n.operator !== "or" || n.operator === "or" && n.value.length !== 0) && (n.operator !== "and" || n.operator === "and" && n.value.length !== 0))), "unionFilters");
var Ur = o((e, t) => unionWith_default(e, t, Rs).filter((r) => r.order !== void 0 && r.order !== null), "unionSorters");
var Er = o((e, t) => [...differenceWith_default(t, e, Ps), ...e], "setInitialFilters");
var Lr = o((e, t) => [...differenceWith_default(t, e, Rs), ...e], "setInitialSorters");
var ba = o((e, t) => {
  if (!t) return;
  let r = t.find((s) => s.field === e);
  if (r) return r.order;
}, "getDefaultSortOrder");
var va = o((e, t, r = "eq") => {
  let s = t == null ? void 0 : t.find((n) => {
    if (n.operator !== "or" && n.operator !== "and" && "field" in n) {
      let { operator: i2, field: a } = n;
      return a === e && i2 === r;
    }
  });
  if (s) return s.value || [];
}, "getDefaultFilter");
var Da = o((e) => new Promise((t, r) => {
  let s = new FileReader(), n = o(() => {
    s.result && (s.removeEventListener("load", n, false), t(s.result));
  }, "resultHandler");
  s.addEventListener("load", n, false), s.readAsDataURL(e.originFileObj), s.onerror = (i2) => (s.removeEventListener("load", n, false), r(i2));
}), "file2Base64");
var Z = o(() => {
  let { options: { useNewQueryKeys: e } } = ge();
  return { keys: nt, preferLegacyKeys: !e };
}, "useKeys");
function Ua({ v3LegacyAuthProviderCompatible: e = false, options: t, params: r } = {}) {
  let { getPermissions: s } = xe(), { getPermissions: n } = Ue(), { keys: i2, preferLegacyKeys: a } = Z(), u2 = useQuery({ queryKey: i2().auth().action("permissions").get(a), queryFn: n ? () => n(r) : () => Promise.resolve(void 0), enabled: !e && !!n, ...e ? {} : t, meta: { ...e ? {} : t == null ? void 0 : t.meta, ...k("usePermissions", a) } }), c2 = useQuery({ queryKey: [...i2().auth().action("permissions").get(a), "v3LegacyAuthProviderCompatible"], queryFn: s ? () => s(r) : () => Promise.resolve(void 0), enabled: e && !!s, ...e ? t : {}, meta: { ...e ? t == null ? void 0 : t.meta : {}, ...k("usePermissions", a) } });
  return e ? c2 : u2;
}
o(Ua, "usePermissions");
function no({ v3LegacyAuthProviderCompatible: e = false, queryOptions: t } = {}) {
  let { getUserIdentity: r } = xe(), { getIdentity: s } = Ue(), { keys: n, preferLegacyKeys: i2 } = Z(), a = useQuery({ queryKey: n().auth().action("identity").get(i2), queryFn: s ?? (() => Promise.resolve({})), enabled: !e && !!s, retry: false, ...e === true ? {} : t, meta: { ...e === true ? {} : t == null ? void 0 : t.meta, ...k("useGetIdentity", i2) } }), u2 = useQuery({ queryKey: [...n().auth().action("identity").get(i2), "v3LegacyAuthProviderCompatible"], queryFn: r ?? (() => Promise.resolve({})), enabled: e && !!r, retry: false, ...e ? t : {}, meta: { ...e ? t == null ? void 0 : t.meta : {}, ...k("useGetIdentity", i2) } });
  return e ? u2 : a;
}
o(no, "useGetIdentity");
var Dt = o(() => {
  let e = useQueryClient(), { keys: t, preferLegacyKeys: r } = Z();
  return o(async () => {
    await Promise.all(["check", "identity", "permissions"].map((n) => e.invalidateQueries(t().auth().action(n).get(r))));
  }, "invalidate");
}, "useInvalidateAuthStore");
function Mr({ v3LegacyAuthProviderCompatible: e, mutationOptions: t } = {}) {
  let r = Dt(), s = oe(), n = Pe(), { push: i2 } = he(), { open: a, close: u2 } = He(), { logout: c2 } = xe(), { logout: p3 } = Ue(), { keys: l2, preferLegacyKeys: m2 } = Z(), y2 = useMutation({ mutationKey: l2().auth().action("logout").get(m2), mutationFn: p3, onSuccess: async (T3, x) => {
    let { success: v, error: f2, redirectTo: P, successNotification: M } = T3, { redirectPath: Q } = x ?? {}, g2 = Q ?? P;
    v && (u2 == null || u2("useLogout-error"), M && (a == null || a(La(M)))), (f2 || !v) && (a == null || a(ao(f2))), g2 !== false && (s === "legacy" ? i2(g2 ?? "/login") : g2 && n({ to: g2 })), await r();
  }, onError: (T3) => {
    a == null || a(ao(T3));
  }, ...e === true ? {} : t, meta: { ...e === true ? {} : t == null ? void 0 : t.meta, ...k("useLogout", m2) } }), d3 = useMutation({ mutationKey: [...l2().auth().action("logout").get(m2), "v3LegacyAuthProviderCompatible"], mutationFn: c2, onSuccess: async (T3, x) => {
    let v = (x == null ? void 0 : x.redirectPath) ?? T3;
    if (v !== false) {
      if (v) {
        s === "legacy" ? i2(v) : n({ to: v });
        return;
      }
      s === "legacy" ? i2("/login") : n({ to: "/login" }), await r();
    }
  }, onError: (T3) => {
    a == null || a(ao(T3));
  }, ...e ? t : {}, meta: { ...e ? t == null ? void 0 : t.meta : {}, ...k("useLogout", m2) } });
  return e ? d3 : y2;
}
o(Mr, "useLogout");
var ao = o((e) => ({ key: "useLogout-error", type: "error", message: (e == null ? void 0 : e.name) || "Logout Error", description: (e == null ? void 0 : e.message) || "Something went wrong during logout" }), "buildNotification");
var La = o((e) => ({ message: e.message, description: e.description, key: "logout-success", type: "success" }), "buildSuccessNotification");
function Ht({ v3LegacyAuthProviderCompatible: e, mutationOptions: t } = {}) {
  let r = Dt(), s = oe(), n = Pe(), { replace: i2 } = he(), a = Te(), { useLocation: u2 } = pe(), { search: c2 } = u2(), { close: p3, open: l2 } = He(), { login: m2 } = xe(), { login: y2 } = Ue(), { keys: d3, preferLegacyKeys: T3 } = Z(), x = import_react14.default.useMemo(() => {
    var P;
    return s === "legacy" ? import_qs2.default.parse(c2, { ignoreQueryPrefix: true }).to : (P = a.params) == null ? void 0 : P.to;
  }, [s, a.params, c2]), v = useMutation({ mutationKey: d3().auth().action("login").get(T3), mutationFn: y2, onSuccess: async ({ success: P, redirectTo: M, error: Q, successNotification: g2 }) => {
    P && (p3 == null || p3("login-error"), g2 && (l2 == null || l2(Ia(g2)))), (Q || !P) && (l2 == null || l2(io(Q))), x && P ? s === "legacy" ? i2(x) : n({ to: x, type: "replace" }) : M ? s === "legacy" ? i2(M) : n({ to: M, type: "replace" }) : s === "legacy" && i2("/"), setTimeout(() => {
      r();
    }, 32);
  }, onError: (P) => {
    l2 == null || l2(io(P));
  }, ...e === true ? {} : t, meta: { ...e === true ? {} : t == null ? void 0 : t.meta, ...k("useLogin", T3) } }), f2 = useMutation({ mutationKey: [...d3().auth().action("login").get(T3), "v3LegacyAuthProviderCompatible"], mutationFn: m2, onSuccess: async (P) => {
    x && i2(x), P !== false && !x && (typeof P == "string" ? s === "legacy" ? i2(P) : n({ to: P, type: "replace" }) : s === "legacy" ? i2("/") : n({ to: "/", type: "replace" })), setTimeout(() => {
      r();
    }, 32), p3 == null || p3("login-error");
  }, onError: (P) => {
    l2 == null || l2(io(P));
  }, ...e ? t : {}, meta: { ...e ? t == null ? void 0 : t.meta : {}, ...k("useLogin", T3) } });
  return e ? f2 : v;
}
o(Ht, "useLogin");
var io = o((e) => ({ message: (e == null ? void 0 : e.name) || "Login Error", description: (e == null ? void 0 : e.message) || "Invalid credentials", key: "login-error", type: "error" }), "buildNotification");
var Ia = o((e) => ({ message: e.message, description: e.description, key: "login-success", type: "success" }), "buildSuccessNotification");
function co({ v3LegacyAuthProviderCompatible: e, mutationOptions: t } = {}) {
  let r = Dt(), s = oe(), n = Pe(), { replace: i2 } = he(), { register: a } = xe(), { register: u2 } = Ue(), { close: c2, open: p3 } = He(), { keys: l2, preferLegacyKeys: m2 } = Z(), y2 = useMutation({ mutationKey: l2().auth().action("register").get(m2), mutationFn: u2, onSuccess: async ({ success: T3, redirectTo: x, error: v, successNotification: f2 }) => {
    T3 && (c2 == null || c2("register-error"), f2 && (p3 == null || p3(Sa(f2))), await r()), (v || !T3) && (p3 == null || p3(uo(v))), x ? s === "legacy" ? i2(x) : n({ to: x, type: "replace" }) : s === "legacy" && i2("/");
  }, onError: (T3) => {
    p3 == null || p3(uo(T3));
  }, ...e === true ? {} : t, meta: { ...e === true ? {} : t == null ? void 0 : t.meta, ...k("useRegister", m2) } }), d3 = useMutation({ mutationKey: [...l2().auth().action("register").get(m2), "v3LegacyAuthProviderCompatible"], mutationFn: a, onSuccess: async (T3) => {
    T3 !== false && (T3 ? s === "legacy" ? i2(T3) : n({ to: T3, type: "replace" }) : s === "legacy" ? i2("/") : n({ to: "/", type: "replace" }), await r(), c2 == null || c2("register-error"));
  }, onError: (T3) => {
    p3 == null || p3(uo(T3));
  }, ...e ? t : {}, meta: { ...e ? t == null ? void 0 : t.meta : {}, ...k("useRegister", m2) } });
  return e ? d3 : y2;
}
o(co, "useRegister");
var uo = o((e) => ({ message: (e == null ? void 0 : e.name) || "Register Error", description: (e == null ? void 0 : e.message) || "Error while registering", key: "register-error", type: "error" }), "buildNotification");
var Sa = o((e) => ({ message: e.message, description: e.description, key: "register-success", type: "success" }), "buildSuccessNotification");
function lo({ v3LegacyAuthProviderCompatible: e, mutationOptions: t } = {}) {
  let r = oe(), s = Pe(), { replace: n } = he(), { forgotPassword: i2 } = xe(), { forgotPassword: a } = Ue(), { close: u2, open: c2 } = He(), { keys: p3, preferLegacyKeys: l2 } = Z(), m2 = useMutation({ mutationKey: p3().auth().action("forgotPassword").get(l2), mutationFn: a, onSuccess: ({ success: d3, redirectTo: T3, error: x, successNotification: v }) => {
    d3 && (u2 == null || u2("forgot-password-error"), v && (c2 == null || c2(Aa(v)))), (x || !d3) && (c2 == null || c2(po(x))), T3 && (r === "legacy" ? n(T3) : s({ to: T3, type: "replace" }));
  }, onError: (d3) => {
    c2 == null || c2(po(d3));
  }, ...e === true ? {} : t, meta: { ...e === true ? {} : t == null ? void 0 : t.meta, ...k("useForgotPassword", l2) } }), y2 = useMutation({ mutationKey: [...p3().auth().action("forgotPassword").get(l2), "v3LegacyAuthProviderCompatible"], mutationFn: i2, onSuccess: (d3) => {
    d3 !== false && d3 && (r === "legacy" ? n(d3) : s({ to: d3, type: "replace" })), u2 == null || u2("forgot-password-error");
  }, onError: (d3) => {
    c2 == null || c2(po(d3));
  }, ...e ? t : {}, meta: { ...e ? t == null ? void 0 : t.meta : {}, ...k("useForgotPassword", l2) } });
  return e ? y2 : m2;
}
o(lo, "useForgotPassword");
var po = o((e) => ({ message: (e == null ? void 0 : e.name) || "Forgot Password Error", description: (e == null ? void 0 : e.message) || "Error while resetting password", key: "forgot-password-error", type: "error" }), "buildNotification");
var Aa = o((e) => ({ message: e.message, description: e.description, key: "forgot-password-success", type: "success" }), "buildSuccessNotification");
function fo({ v3LegacyAuthProviderCompatible: e, mutationOptions: t } = {}) {
  let r = oe(), s = Pe(), { replace: n } = he(), { updatePassword: i2 } = xe(), { updatePassword: a } = Ue(), { close: u2, open: c2 } = He(), { keys: p3, preferLegacyKeys: l2 } = Z(), m2 = Te(), { useLocation: y2 } = pe(), { search: d3 } = y2(), T3 = import_react15.default.useMemo(() => r === "legacy" ? import_qs3.default.parse(d3, { ignoreQueryPrefix: true }) ?? {} : m2.params ?? {}, [d3, m2, r]), x = useMutation({ mutationKey: p3().auth().action("updatePassword").get(l2), mutationFn: async (f2) => a == null ? void 0 : a({ ...T3, ...f2 }), onSuccess: ({ success: f2, redirectTo: P, error: M, successNotification: Q }) => {
    f2 && (u2 == null || u2("update-password-error"), Q && (c2 == null || c2(Qa(Q)))), (M || !f2) && (c2 == null || c2(mo(M))), P && (r === "legacy" ? n(P) : s({ to: P, type: "replace" }));
  }, onError: (f2) => {
    c2 == null || c2(mo(f2));
  }, ...e === true ? {} : t, meta: { ...e === true ? {} : t == null ? void 0 : t.meta, ...k("useUpdatePassword", l2) } }), v = useMutation({ mutationKey: [...p3().auth().action("updatePassword").get(l2), "v3LegacyAuthProviderCompatible"], mutationFn: async (f2) => i2 == null ? void 0 : i2({ ...T3, ...f2 }), onSuccess: (f2) => {
    f2 !== false && f2 && (r === "legacy" ? n(f2) : s({ to: f2, type: "replace" })), u2 == null || u2("update-password-error");
  }, onError: (f2) => {
    c2 == null || c2(mo(f2));
  }, ...e ? t : {}, meta: { ...e ? t == null ? void 0 : t.meta : {}, ...k("useUpdatePassword", l2) } });
  return e ? v : x;
}
o(fo, "useUpdatePassword");
var mo = o((e) => ({ message: (e == null ? void 0 : e.name) || "Update Password Error", description: (e == null ? void 0 : e.message) || "Error while updating password", key: "update-password-error", type: "error" }), "buildNotification");
var Qa = o((e) => ({ message: e.message, description: e.description, key: "update-password-success", type: "success" }), "buildSuccessNotification");
function wr({ v3LegacyAuthProviderCompatible: e = false, params: t } = {}) {
  let { checkAuth: r } = xe(), { check: s } = Ue(), { keys: n, preferLegacyKeys: i2 } = Z(), a = useQuery({ queryKey: n().auth().action("check").params(t).get(i2), queryFn: async () => await (s == null ? void 0 : s(t)) ?? {}, retry: false, enabled: !e, meta: { ...k("useIsAuthenticated", i2) } }), u2 = useQuery({ queryKey: [...n().auth().action("check").params(t).get(i2), "v3LegacyAuthProviderCompatible"], queryFn: async () => await (r == null ? void 0 : r(t)) ?? {}, retry: false, enabled: e, meta: { ...k("useIsAuthenticated", i2) } });
  return e ? u2 : a;
}
o(wr, "useIsAuthenticated");
var Va = wr;
function Re({ v3LegacyAuthProviderCompatible: e = false } = {}) {
  let t = oe(), r = Pe(), { replace: s } = he(), { checkError: n } = xe(), { onError: i2 } = Ue(), { keys: a, preferLegacyKeys: u2 } = Z(), { mutate: c2 } = Mr({ v3LegacyAuthProviderCompatible: !!e }), { mutate: p3 } = Mr({ v3LegacyAuthProviderCompatible: !!e }), l2 = useMutation({ mutationKey: a().auth().action("onError").get(u2), ...i2 ? { mutationFn: i2, onSuccess: ({ logout: y2, redirectTo: d3 }) => {
    if (y2) {
      p3({ redirectPath: d3 });
      return;
    }
    if (d3) {
      t === "legacy" ? s(d3) : r({ to: d3, type: "replace" });
      return;
    }
  } } : { mutationFn: () => ({}) }, meta: { ...k("useOnError", u2) } }), m2 = useMutation({ mutationKey: [...a().auth().action("onError").get(u2), "v3LegacyAuthProviderCompatible"], mutationFn: n, onError: (y2) => {
    c2({ redirectPath: y2 });
  }, meta: { ...k("useOnError", u2) } });
  return e ? m2 : l2;
}
o(Re, "useOnError");
var Na = Re;
var yo = o(() => {
  let { isProvided: e } = xe(), { isProvided: t } = Ue();
  return !!(t || e);
}, "useIsExistAuthentication");
var fe = o(({ enabled: e, isLoading: t, interval: r, onInterval: s }) => {
  let [n, i2] = (0, import_react16.useState)(void 0), { options: a } = ge(), { overtime: u2 } = a, c2 = r ?? u2.interval, p3 = s ?? (u2 == null ? void 0 : u2.onInterval), l2 = typeof e < "u" ? e : typeof u2.enabled < "u" ? u2.enabled : true;
  return (0, import_react16.useEffect)(() => {
    let m2;
    return l2 && t && (m2 = setInterval(() => {
      i2((y2) => y2 === void 0 ? c2 : y2 + c2);
    }, c2)), () => {
      typeof m2 < "u" && clearInterval(m2), i2(void 0);
    };
  }, [t, c2, l2]), (0, import_react16.useEffect)(() => {
    p3 && n && p3(n);
  }, [n]), { elapsedTime: n };
}, "useLoadingOvertime");
var $t = o(({ resource: e, config: t, filters: r, hasPagination: s, pagination: n, sorters: i2, queryOptions: a, successNotification: u2, errorNotification: c2, meta: p3, metaData: l2, liveMode: m2, onLiveEvent: y2, liveParams: d3, dataProviderName: T3, overtimeOptions: x } = {}) => {
  let { resources: v, resource: f2, identifier: P } = q(e), M = le(), Q = z(), g2 = ie(), { mutate: C2 } = Re({ v3LegacyAuthProviderCompatible: !!(g2 != null && g2.isLegacy) }), h = Ce(), D = ue(), { keys: k2, preferLegacyKeys: E2 } = Z(), L2 = ee(P, T3, v), U = I2(p3, l2), w = I2(r, t == null ? void 0 : t.filters), N = I2(i2, t == null ? void 0 : t.sort), b = I2(s, t == null ? void 0 : t.hasPagination), F = Wt({ pagination: n, configPagination: t == null ? void 0 : t.pagination, hasPagination: b }), V = F.mode === "server", G = D({ resource: f2, meta: U }), W = { meta: G, metaData: G, filters: w, hasPagination: V, pagination: F, sorters: N, config: { ...t, sort: N } }, K = (a == null ? void 0 : a.enabled) === void 0 || (a == null ? void 0 : a.enabled) === true, { getList: j } = M(L2);
  Pt({ resource: P, types: ["*"], params: { meta: G, metaData: G, pagination: F, hasPagination: V, sort: N, sorters: N, filters: w, subscriptionType: "useList", ...d3 }, channel: `resources/${f2 == null ? void 0 : f2.name}`, enabled: K, liveMode: m2, onLiveEvent: y2, dataProviderName: L2, meta: { ...p3, dataProviderName: T3 } });
  let re = useQuery({ queryKey: k2().data(L2).resource(P ?? "").action("list").params({ ...U || {}, filters: w, hasPagination: V, ...V && { pagination: F }, ...i2 && { sorters: i2 }, ...(t == null ? void 0 : t.sort) && { sort: t == null ? void 0 : t.sort } }).get(E2), queryFn: (R2) => {
    let S = { ...G, queryContext: je(R2) };
    return j({ resource: (f2 == null ? void 0 : f2.name) ?? "", pagination: F, hasPagination: V, filters: w, sort: N, sorters: N, meta: S, metaData: S });
  }, ...a, enabled: typeof (a == null ? void 0 : a.enabled) < "u" ? a == null ? void 0 : a.enabled : !!(f2 != null && f2.name), select: (R2) => {
    var X;
    let S = R2, { current: B, mode: H, pageSize: $ } = F;
    return H === "client" && (S = { ...S, data: S.data.slice((B - 1) * $, B * $), total: S.total }), a != null && a.select ? (X = a == null ? void 0 : a.select) == null ? void 0 : X.call(a, S) : S;
  }, onSuccess: (R2) => {
    var B;
    (B = a == null ? void 0 : a.onSuccess) == null || B.call(a, R2);
    let S = typeof u2 == "function" ? u2(R2, W, P) : u2;
    h(S);
  }, onError: (R2) => {
    var B;
    C2(R2), (B = a == null ? void 0 : a.onError) == null || B.call(a, R2);
    let S = typeof c2 == "function" ? c2(R2, W, P) : c2;
    h(S, { key: `${P}-useList-notification`, message: Q("notifications.error", { statusCode: R2.statusCode }, `Error (status code: ${R2.statusCode})`), description: R2.message, type: "error" });
  }, meta: { ...a == null ? void 0 : a.meta, ...k("useList", E2, f2 == null ? void 0 : f2.name) } }), { elapsedTime: te } = fe({ ...x, isLoading: re.isFetching });
  return { ...re, overtime: { elapsedTime: te } };
}, "useList");
var zt = o(({ resource: e, id: t, queryOptions: r, successNotification: s, errorNotification: n, meta: i2, metaData: a, liveMode: u2, onLiveEvent: c2, liveParams: p3, dataProviderName: l2, overtimeOptions: m2 }) => {
  let { resources: y2, resource: d3, identifier: T3 } = q(e), x = le(), v = z(), f2 = ie(), { mutate: P } = Re({ v3LegacyAuthProviderCompatible: !!(f2 != null && f2.isLegacy) }), M = Ce(), Q = ue(), { keys: g2, preferLegacyKeys: C2 } = Z(), h = I2(i2, a), D = ee(T3, l2, y2), { getOne: k2 } = x(D), E2 = Q({ resource: d3, meta: h });
  Pt({ resource: T3, types: ["*"], channel: `resources/${d3 == null ? void 0 : d3.name}`, params: { ids: t ? [t] : [], id: t, meta: E2, metaData: E2, subscriptionType: "useOne", ...p3 }, enabled: typeof (r == null ? void 0 : r.enabled) < "u" ? r == null ? void 0 : r.enabled : typeof (d3 == null ? void 0 : d3.name) < "u" && typeof t < "u", liveMode: u2, onLiveEvent: c2, dataProviderName: D, meta: { ...i2, dataProviderName: l2 } });
  let L2 = useQuery({ queryKey: g2().data(D).resource(T3 ?? "").action("one").id(t ?? "").params({ ...h || {} }).get(C2), queryFn: (w) => k2({ resource: (d3 == null ? void 0 : d3.name) ?? "", id: t, meta: { ...E2, queryContext: je(w) }, metaData: { ...E2, queryContext: je(w) } }), ...r, enabled: typeof (r == null ? void 0 : r.enabled) < "u" ? r == null ? void 0 : r.enabled : typeof t < "u", onSuccess: (w) => {
    var b;
    (b = r == null ? void 0 : r.onSuccess) == null || b.call(r, w);
    let N = typeof s == "function" ? s(w, { id: t, ...E2 }, T3) : s;
    M(N);
  }, onError: (w) => {
    var b;
    P(w), (b = r == null ? void 0 : r.onError) == null || b.call(r, w);
    let N = typeof n == "function" ? n(w, { id: t, ...E2 }, T3) : n;
    M(N, { key: `${t}-${T3}-getOne-notification`, message: v("notifications.error", { statusCode: w.statusCode }, `Error (status code: ${w.statusCode})`), description: w.message, type: "error" });
  }, meta: { ...r == null ? void 0 : r.meta, ...k("useOne", C2, d3 == null ? void 0 : d3.name) } }), { elapsedTime: U } = fe({ ...m2, isLoading: L2.isFetching });
  return { ...L2, overtime: { elapsedTime: U } };
}, "useOne");
var go = o(({ resource: e, ids: t, queryOptions: r, successNotification: s, errorNotification: n, meta: i2, metaData: a, liveMode: u2, onLiveEvent: c2, liveParams: p3, dataProviderName: l2, overtimeOptions: m2 }) => {
  let { resources: y2, resource: d3, identifier: T3 } = q(e), x = le(), v = z(), f2 = ie(), { mutate: P } = Re({ v3LegacyAuthProviderCompatible: !!(f2 != null && f2.isLegacy) }), M = Ce(), Q = ue(), { keys: g2, preferLegacyKeys: C2 } = Z(), h = I2(i2, a), D = ee(T3, l2, y2), k2 = (r == null ? void 0 : r.enabled) === void 0 || (r == null ? void 0 : r.enabled) === true, { getMany: E2, getOne: L2 } = x(D), U = Q({ resource: d3, meta: h }), w = Array.isArray(t), N = !!(d3 != null && d3.name), b = (r == null ? void 0 : r.enabled) === true;
  (0, import_warn_once2.default)(!w && !b, za(t, d3 == null ? void 0 : d3.name)), (0, import_warn_once2.default)(!N && !b, _a()), Pt({ resource: T3, types: ["*"], params: { ids: t ?? [], meta: U, metaData: U, subscriptionType: "useMany", ...p3 }, channel: `resources/${(d3 == null ? void 0 : d3.name) ?? ""}`, enabled: k2, liveMode: u2, onLiveEvent: c2, dataProviderName: D, meta: { ...i2, dataProviderName: l2 } });
  let F = useQuery({ queryKey: g2().data(D).resource(T3).action("many").ids(...t ?? []).params({ ...h || {} }).get(C2), queryFn: (G) => {
    let W = { ...U, queryContext: je(G) };
    return E2 ? E2({ resource: d3 == null ? void 0 : d3.name, ids: t, meta: W, metaData: W }) : lt(t.map((K) => L2({ resource: d3 == null ? void 0 : d3.name, id: K, meta: W, metaData: W })));
  }, enabled: w && N, ...r, onSuccess: (G) => {
    var K;
    (K = r == null ? void 0 : r.onSuccess) == null || K.call(r, G);
    let W = typeof s == "function" ? s(G, t, T3) : s;
    M(W);
  }, onError: (G) => {
    var K;
    P(G), (K = r == null ? void 0 : r.onError) == null || K.call(r, G);
    let W = typeof n == "function" ? n(G, t, T3) : n;
    M(W, { key: `${t[0]}-${T3}-getMany-notification`, message: v("notifications.error", { statusCode: G.statusCode }, `Error (status code: ${G.statusCode})`), description: G.message, type: "error" });
  }, meta: { ...r == null ? void 0 : r.meta, ...k("useMany", C2, d3 == null ? void 0 : d3.name) } }), { elapsedTime: V } = fe({ ...m2, isLoading: F.isFetching });
  return { ...F, overtime: { elapsedTime: V } };
}, "useMany");
var za = o((e, t) => `[useMany]: Missing "ids" prop. Expected an array of ids, but got "${typeof e}". Resource: "${t}"

See https://refine.dev/docs/data/hooks/use-many/#ids-`, "idsWarningMessage");
var _a = o(() => `[useMany]: Missing "resource" prop. Expected a string, but got undefined.

See https://refine.dev/docs/data/hooks/use-many/#resource-`, "resourceWarningMessage");
var Os = ((s) => (s.ADD = "ADD", s.REMOVE = "REMOVE", s.DECREASE_NOTIFICATION_SECOND = "DECREASE_NOTIFICATION_SECOND", s))(Os || {});
var To = o(({ id: e, resource: t, values: r, dataProviderName: s, successNotification: n, errorNotification: i2, meta: a, metaData: u2, mutationMode: c2, undoableTimeout: p3, onCancel: l2, optimisticUpdateMap: m2, invalidates: y2, mutationOptions: d3, overtimeOptions: T3 } = {}) => {
  let { resources: x, select: v } = q(), f2 = useQueryClient(), P = le(), { mutationMode: M, undoableTimeout: Q } = _e(), g2 = z(), C2 = ie(), { mutate: h } = Re({ v3LegacyAuthProviderCompatible: !!(C2 != null && C2.isLegacy) }), D = Ye(), { log: k2 } = Je(), { notificationDispatch: E2 } = ut(), L2 = Ce(), U = Ae(), w = ue(), { options: { textTransformers: N } } = ge(), { keys: b, preferLegacyKeys: F } = Z(), V = useMutation({ mutationFn: ({ id: R2 = e, values: S = r, resource: B = t, mutationMode: H = c2, undoableTimeout: $ = p3, onCancel: X = l2, meta: ne = a, metaData: Y = u2, dataProviderName: O = s }) => {
    if (typeof R2 > "u") throw jt;
    if (!S) throw Ir;
    if (!B) throw _t;
    let { resource: _2, identifier: ae } = v(B), J = w({ resource: _2, meta: I2(ne, Y) }), we = H ?? M, ye = $ ?? Q;
    return we !== "undoable" ? P(ee(ae, O, x)).update({ resource: _2.name, id: R2, variables: S, meta: J, metaData: J }) : new Promise((Ne, se) => {
      let me = o(() => {
        P(ee(ae, O, x)).update({ resource: _2.name, id: R2, variables: S, meta: J, metaData: J }).then((ve) => Ne(ve)).catch((ve) => se(ve));
      }, "doMutation"), ce = o(() => {
        se({ message: "mutationCancelled" });
      }, "cancelMutation");
      X && X(ce), E2({ type: "ADD", payload: { id: R2, resource: ae, cancelMutation: ce, doMutation: me, seconds: ye, isSilent: !!X } });
    });
  }, onMutate: async ({ resource: R2 = t, id: S = e, mutationMode: B = c2, values: H = r, dataProviderName: $ = s, meta: X = a, metaData: ne = u2, optimisticUpdateMap: Y = m2 ?? { list: true, many: true, detail: true } }) => {
    if (typeof S > "u") throw jt;
    if (!H) throw Ir;
    if (!R2) throw _t;
    let { identifier: O } = v(R2), { gqlMutation: _2, gqlQuery: ae, ...J } = I2(X, ne) ?? {}, we = dt(F)(O, ee(O, $, x), J), ye = b().data(ee(O, $, x)).resource(O), Ve = f2.getQueriesData(ye.get(F)), Ne = B ?? M;
    return await f2.cancelQueries(ye.get(F), void 0, { silent: true }), Ne !== "pessimistic" && (Y.list && f2.setQueriesData(ye.action("list").params(J ?? {}).get(F), (se) => {
      if (typeof Y.list == "function") return Y.list(se, H, S);
      if (!se) return null;
      let me = se.data.map((ce) => {
        var ve;
        return ((ve = ce.id) == null ? void 0 : ve.toString()) === (S == null ? void 0 : S.toString()) ? { id: S, ...ce, ...H } : ce;
      });
      return { ...se, data: me };
    }), Y.many && f2.setQueriesData(ye.action("many").get(F), (se) => {
      if (typeof Y.many == "function") return Y.many(se, H, S);
      if (!se) return null;
      let me = se.data.map((ce) => {
        var ve;
        return ((ve = ce.id) == null ? void 0 : ve.toString()) === (S == null ? void 0 : S.toString()) && (ce = { id: S, ...ce, ...H }), ce;
      });
      return { ...se, data: me };
    }), Y.detail && f2.setQueriesData(ye.action("one").id(S).params(J ?? {}).get(F), (se) => typeof Y.detail == "function" ? Y.detail(se, H, S) : se ? { ...se, data: { ...se.data, ...H } } : null)), { previousQueries: Ve, queryKey: we };
  }, onSettled: (R2, S, B, H) => {
    var _2;
    let { id: $ = e, resource: X = t, dataProviderName: ne = s, invalidates: Y = y2 ?? ["list", "many", "detail"] } = B;
    if (typeof $ > "u") throw jt;
    if (!X) throw _t;
    let { identifier: O } = v(X);
    U({ resource: O, dataProviderName: ee(O, ne, x), invalidates: Y, id: $ }), E2({ type: "REMOVE", payload: { id: $, resource: O } }), (_2 = d3 == null ? void 0 : d3.onSettled) == null || _2.call(d3, R2, S, B, H);
  }, onSuccess: (R2, S, B) => {
    var Ke, Ct;
    let { id: H = e, resource: $ = t, successNotification: X = n, dataProviderName: ne = s, values: Y = r, meta: O = a, metaData: _2 = u2 } = S;
    if (typeof H > "u") throw jt;
    if (!Y) throw Ir;
    if (!$) throw _t;
    let { resource: ae, identifier: J } = v($), we = N.singular(J), ye = ee(J, ne, x), Ve = w({ resource: ae, meta: I2(O, _2) }), Ne = typeof X == "function" ? X(R2, { id: H, values: Y }, J) : X;
    L2(Ne, { key: `${H}-${J}-notification`, description: g2("notifications.success", "Successful"), message: g2("notifications.editSuccess", { resource: g2(`${J}.${J}`, we) }, `Successfully updated ${we}`), type: "success" }), D == null || D({ channel: `resources/${ae.name}`, type: "updated", payload: { ids: (Ke = R2.data) != null && Ke.id ? [R2.data.id] : void 0 }, date: /* @__PURE__ */ new Date(), meta: { ...Ve, dataProviderName: ye } });
    let se;
    if (B) {
      let Ge = f2.getQueryData(B.queryKey.detail(H));
      se = Object.keys(Y || {}).reduce((Tt, xt) => {
        var bt;
        return Tt[xt] = (bt = Ge == null ? void 0 : Ge.data) == null ? void 0 : bt[xt], Tt;
      }, {});
    }
    let { fields: me, operation: ce, variables: ve, ...rt } = Ve || {};
    k2 == null || k2.mutate({ action: "update", resource: ae.name, data: Y, previousData: se, meta: { id: H, dataProviderName: ye, ...rt } }), (Ct = d3 == null ? void 0 : d3.onSuccess) == null || Ct.call(d3, R2, S, B);
  }, onError: (R2, S, B) => {
    var O;
    let { id: H = e, resource: $ = t, errorNotification: X = i2, values: ne = r } = S;
    if (typeof H > "u") throw jt;
    if (!ne) throw Ir;
    if (!$) throw _t;
    let { identifier: Y } = v($);
    if (B) for (let _2 of B.previousQueries) f2.setQueryData(_2[0], _2[1]);
    if (R2.message !== "mutationCancelled") {
      h == null || h(R2);
      let _2 = N.singular(Y), ae = typeof X == "function" ? X(R2, { id: H, values: ne }, Y) : X;
      L2(ae, { key: `${H}-${Y}-notification`, message: g2("notifications.editError", { resource: g2(`${Y}.${Y}`, _2), statusCode: R2.statusCode }, `Error when updating ${_2} (status code: ${R2.statusCode})`), description: R2.message, type: "error" });
    }
    (O = d3 == null ? void 0 : d3.onError) == null || O.call(d3, R2, S, B);
  }, mutationKey: b().data().mutation("update").get(F), ...d3, meta: { ...d3 == null ? void 0 : d3.meta, ...k("useUpdate", F) } }), { mutate: G, mutateAsync: W, ...K } = V, { elapsedTime: j } = fe({ ...T3, isLoading: K.isLoading });
  return { ...K, mutate: o((R2, S) => G(R2 || {}, S), "handleMutation"), mutateAsync: o((R2, S) => W(R2 || {}, S), "handleMutateAsync"), overtime: { elapsedTime: j } };
}, "useUpdate");
var _t = new Error("[useUpdate]: `resource` is not defined or not matched but is required");
var jt = new Error("[useUpdate]: `id` is not defined but is required in edit and clone actions");
var Ir = new Error("[useUpdate]: `values` is not provided but is required");
var Xt = o(({ resource: e, values: t, dataProviderName: r, successNotification: s, errorNotification: n, invalidates: i2, meta: a, metaData: u2, mutationOptions: c2, overtimeOptions: p3 } = {}) => {
  let l2 = ie(), { mutate: m2 } = Re({ v3LegacyAuthProviderCompatible: !!(l2 != null && l2.isLegacy) }), y2 = le(), d3 = Ae(), { resources: T3, select: x } = q(), v = z(), f2 = Ye(), { log: P } = Je(), M = Ce(), Q = ue(), { options: { textTransformers: g2 } } = ge(), { keys: C2, preferLegacyKeys: h } = Z(), D = useMutation({ mutationFn: ({ resource: b = e, values: F = t, meta: V = a, metaData: G = u2, dataProviderName: W = r }) => {
    if (!F) throw ho;
    if (!b) throw xo;
    let { resource: K, identifier: j } = x(b), re = Q({ resource: K, meta: I2(V, G) });
    return y2(ee(j, W, T3)).create({ resource: K.name, variables: F, meta: re, metaData: re });
  }, onSuccess: (b, F, V) => {
    var J, we, ye;
    let { resource: G = e, successNotification: W = s, dataProviderName: K = r, invalidates: j = i2 ?? ["list", "many"], values: re = t, meta: te = a, metaData: R2 = u2 } = F;
    if (!re) throw ho;
    if (!G) throw xo;
    let { resource: S, identifier: B } = x(G), H = g2.singular(B), $ = ee(B, K, T3), X = Q({ resource: S, meta: I2(te, R2) }), ne = typeof W == "function" ? W(b, re, B) : W;
    M(ne, { key: `create-${B}-notification`, message: v("notifications.createSuccess", { resource: v(`${B}.${B}`, H) }, `Successfully created ${H}`), description: v("notifications.success", "Success"), type: "success" }), d3({ resource: B, dataProviderName: $, invalidates: j }), f2 == null || f2({ channel: `resources/${S.name}`, type: "created", payload: { ids: (J = b == null ? void 0 : b.data) != null && J.id ? [b.data.id] : void 0 }, date: /* @__PURE__ */ new Date(), meta: { ...X, dataProviderName: $ } });
    let { fields: Y, operation: O, variables: _2, ...ae } = X || {};
    P == null || P.mutate({ action: "create", resource: S.name, data: re, meta: { dataProviderName: $, id: ((we = b == null ? void 0 : b.data) == null ? void 0 : we.id) ?? void 0, ...ae } }), (ye = c2 == null ? void 0 : c2.onSuccess) == null || ye.call(c2, b, F, V);
  }, onError: (b, F, V) => {
    var R2;
    let { resource: G = e, errorNotification: W = n, values: K = t } = F;
    if (!K) throw ho;
    if (!G) throw xo;
    m2(b);
    let { identifier: j } = x(G), re = g2.singular(j), te = typeof W == "function" ? W(b, K, j) : W;
    M(te, { key: `create-${j}-notification`, description: b.message, message: v("notifications.createError", { resource: v(`${j}.${j}`, re), statusCode: b.statusCode }, `There was an error creating ${re} (status code: ${b.statusCode})`), type: "error" }), (R2 = c2 == null ? void 0 : c2.onError) == null || R2.call(c2, b, F, V);
  }, mutationKey: C2().data().mutation("create").get(h), ...c2, meta: { ...c2 == null ? void 0 : c2.meta, ...k("useCreate", h) } }), { mutate: k2, mutateAsync: E2, ...L2 } = D, { elapsedTime: U } = fe({ ...p3, isLoading: L2.isLoading });
  return { ...L2, mutate: o((b, F) => k2(b || {}, F), "handleMutation"), mutateAsync: o((b, F) => E2(b || {}, F), "handleMutateAsync"), overtime: { elapsedTime: U } };
}, "useCreate");
var xo = new Error("[useCreate]: `resource` is not defined or not matched but is required");
var ho = new Error("[useCreate]: `values` is not provided but is required");
var Po = o(({ mutationOptions: e, overtimeOptions: t } = {}) => {
  let r = ie(), { mutate: s } = Re({ v3LegacyAuthProviderCompatible: !!(r != null && r.isLegacy) }), n = le(), { resources: i2, select: a } = q(), u2 = useQueryClient(), { mutationMode: c2, undoableTimeout: p3 } = _e(), { notificationDispatch: l2 } = ut(), m2 = z(), y2 = Ye(), { log: d3 } = Je(), T3 = Ce(), x = Ae(), v = ue(), { options: { textTransformers: f2 } } = ge(), { keys: P, preferLegacyKeys: M } = Z(), Q = useMutation({ mutationFn: ({ id: C2, mutationMode: h, undoableTimeout: D, resource: k2, onCancel: E2, meta: L2, metaData: U, dataProviderName: w, values: N }) => {
    let { resource: b, identifier: F } = a(k2), V = v({ resource: b, meta: I2(L2, U) }), G = h ?? c2, W = D ?? p3;
    return G !== "undoable" ? n(ee(F, w, i2)).deleteOne({ resource: b.name, id: C2, meta: V, metaData: V, variables: N }) : new Promise((j, re) => {
      let te = o(() => {
        n(ee(F, w, i2)).deleteOne({ resource: b.name, id: C2, meta: V, metaData: V, variables: N }).then((S) => j(S)).catch((S) => re(S));
      }, "doMutation"), R2 = o(() => {
        re({ message: "mutationCancelled" });
      }, "cancelMutation");
      E2 && E2(R2), l2({ type: "ADD", payload: { id: C2, resource: F, cancelMutation: R2, doMutation: te, seconds: W, isSilent: !!E2 } });
    });
  }, onMutate: async ({ id: C2, resource: h, mutationMode: D, dataProviderName: k2, meta: E2, metaData: L2 }) => {
    let { identifier: U } = a(h), { gqlMutation: w, gqlQuery: N, ...b } = I2(E2, L2) ?? {}, F = dt(M)(U, ee(U, k2, i2), b), V = P().data(ee(U, k2, i2)).resource(U), G = D ?? c2;
    await u2.cancelQueries(V.get(M), void 0, { silent: true });
    let W = u2.getQueriesData(V.get(M));
    return G !== "pessimistic" && (u2.setQueriesData(V.action("list").params(b ?? {}).get(M), (K) => K ? { data: K.data.filter((re) => {
      var te;
      return ((te = re.id) == null ? void 0 : te.toString()) !== C2.toString();
    }), total: K.total - 1 } : null), u2.setQueriesData(V.action("many").get(M), (K) => {
      if (!K) return null;
      let j = K.data.filter((re) => {
        var te;
        return ((te = re.id) == null ? void 0 : te.toString()) !== (C2 == null ? void 0 : C2.toString());
      });
      return { ...K, data: j };
    })), { previousQueries: W, queryKey: F };
  }, onSettled: (C2, h, { id: D, resource: k2, dataProviderName: E2, invalidates: L2 = ["list", "many"] }) => {
    let { identifier: U } = a(k2);
    x({ resource: U, dataProviderName: ee(U, E2, i2), invalidates: L2 }), l2({ type: "REMOVE", payload: { id: D, resource: U } });
  }, onSuccess: (C2, { id: h, resource: D, successNotification: k2, dataProviderName: E2, meta: L2, metaData: U }, w) => {
    let { resource: N, identifier: b } = a(D), F = f2.singular(b), V = ee(b, E2, i2), G = v({ resource: N, meta: I2(L2, U) });
    u2.removeQueries(w == null ? void 0 : w.queryKey.detail(h));
    let W = typeof k2 == "function" ? k2(C2, h, b) : k2;
    T3(W, { key: `${h}-${b}-notification`, description: m2("notifications.success", "Success"), message: m2("notifications.deleteSuccess", { resource: m2(`${b}.${b}`, F) }, `Successfully deleted a ${F}`), type: "success" }), y2 == null || y2({ channel: `resources/${N.name}`, type: "deleted", payload: { ids: [h] }, date: /* @__PURE__ */ new Date(), meta: { ...G, dataProviderName: V } });
    let { fields: K, operation: j, variables: re, ...te } = G || {};
    d3 == null || d3.mutate({ action: "delete", resource: N.name, meta: { id: h, dataProviderName: V, ...te } }), u2.removeQueries(w == null ? void 0 : w.queryKey.detail(h));
  }, onError: (C2, { id: h, resource: D, errorNotification: k2 }, E2) => {
    let { identifier: L2 } = a(D);
    if (E2) for (let U of E2.previousQueries) u2.setQueryData(U[0], U[1]);
    if (C2.message !== "mutationCancelled") {
      s(C2);
      let U = f2.singular(L2), w = typeof k2 == "function" ? k2(C2, h, L2) : k2;
      T3(w, { key: `${h}-${L2}-notification`, message: m2("notifications.deleteError", { resource: U, statusCode: C2.statusCode }, `Error (status code: ${C2.statusCode})`), description: C2.message, type: "error" });
    }
  }, mutationKey: P().data().mutation("delete").get(M), ...e, meta: { ...e == null ? void 0 : e.meta, ...k("useDelete", M) } }), { elapsedTime: g2 } = fe({ ...t, isLoading: Q.isLoading });
  return { ...Q, overtime: { elapsedTime: g2 } };
}, "useDelete");
var bo = o(({ resource: e, values: t, dataProviderName: r, successNotification: s, errorNotification: n, meta: i2, metaData: a, invalidates: u2, mutationOptions: c2, overtimeOptions: p3 } = {}) => {
  let l2 = le(), { resources: m2, select: y2 } = q(), d3 = z(), T3 = Ye(), x = Ce(), v = Ae(), { log: f2 } = Je(), P = ue(), { options: { textTransformers: M } } = ge(), { keys: Q, preferLegacyKeys: g2 } = Z(), C2 = useMutation({ mutationFn: ({ resource: w = e, values: N = t, meta: b = i2, metaData: F = a, dataProviderName: V = r }) => {
    if (!N) throw Co;
    if (!w) throw Ro;
    let { resource: G, identifier: W } = y2(w), K = P({ resource: G, meta: I2(b, F) }), j = l2(ee(W, V, m2));
    return j.createMany ? j.createMany({ resource: G.name, variables: N, meta: K, metaData: K }) : lt(N.map((re) => j.create({ resource: G.name, variables: re, meta: K, metaData: K })));
  }, onSuccess: (w, N, b) => {
    var ae;
    let { resource: F = e, successNotification: V = s, dataProviderName: G = r, invalidates: W = u2 ?? ["list", "many"], values: K = t, meta: j = i2, metaData: re = a } = N;
    if (!K) throw Co;
    if (!F) throw Ro;
    let { resource: te, identifier: R2 } = y2(F), S = M.plural(R2), B = ee(R2, G, m2), H = P({ resource: te, meta: I2(j, re) }), $ = typeof V == "function" ? V(w, K, R2) : V;
    x($, { key: `createMany-${R2}-notification`, message: d3("notifications.createSuccess", { resource: d3(`${R2}.${R2}`, R2) }, `Successfully created ${S}`), description: d3("notifications.success", "Success"), type: "success" }), v({ resource: R2, dataProviderName: B, invalidates: W });
    let X = w == null ? void 0 : w.data.filter((J) => (J == null ? void 0 : J.id) !== void 0).map((J) => J.id);
    T3 == null || T3({ channel: `resources/${te.name}`, type: "created", payload: { ids: X }, date: /* @__PURE__ */ new Date(), meta: { ...H, dataProviderName: B } });
    let { fields: ne, operation: Y, variables: O, ..._2 } = H || {};
    f2 == null || f2.mutate({ action: "createMany", resource: te.name, data: K, meta: { dataProviderName: B, ids: X, ..._2 } }), (ae = c2 == null ? void 0 : c2.onSuccess) == null || ae.call(c2, w, N, b);
  }, onError: (w, N, b) => {
    var j;
    let { resource: F = e, errorNotification: V = n, values: G = t } = N;
    if (!G) throw Co;
    if (!F) throw Ro;
    let { identifier: W } = y2(F), K = typeof V == "function" ? V(w, G, W) : V;
    x(K, { key: `createMany-${W}-notification`, description: w.message, message: d3("notifications.createError", { resource: d3(`${W}.${W}`, W), statusCode: w.statusCode }, `There was an error creating ${W} (status code: ${w.statusCode}`), type: "error" }), (j = c2 == null ? void 0 : c2.onError) == null || j.call(c2, w, N, b);
  }, mutationKey: Q().data().mutation("createMany").get(g2), ...c2, meta: { ...c2 == null ? void 0 : c2.meta, ...k("useCreateMany", g2) } }), { mutate: h, mutateAsync: D, ...k2 } = C2, { elapsedTime: E2 } = fe({ ...p3, isLoading: k2.isLoading });
  return { ...k2, mutate: o((w, N) => h(w || {}, N), "handleMutation"), mutateAsync: o((w, N) => D(w || {}, N), "handleMutateAsync"), overtime: { elapsedTime: E2 } };
}, "useCreateMany");
var Ro = new Error("[useCreateMany]: `resource` is not defined or not matched but is required");
var Co = new Error("[useCreateMany]: `values` is not provided but is required");
var ii = o(({ ids: e, resource: t, values: r, dataProviderName: s, successNotification: n, errorNotification: i2, meta: a, metaData: u2, mutationMode: c2, undoableTimeout: p3, onCancel: l2, optimisticUpdateMap: m2, invalidates: y2, mutationOptions: d3, overtimeOptions: T3 } = {}) => {
  let { resources: x, select: v } = q(), f2 = useQueryClient(), P = le(), M = z(), { mutationMode: Q, undoableTimeout: g2 } = _e(), C2 = ie(), { mutate: h } = Re({ v3LegacyAuthProviderCompatible: !!(C2 != null && C2.isLegacy) }), { notificationDispatch: D } = ut(), k2 = Ye(), E2 = Ce(), L2 = Ae(), { log: U } = Je(), w = ue(), { options: { textTransformers: N } } = ge(), { keys: b, preferLegacyKeys: F } = Z(), V = useMutation({ mutationFn: ({ ids: R2 = e, values: S = r, resource: B = t, onCancel: H = l2, mutationMode: $ = c2, undoableTimeout: X = p3, meta: ne = a, metaData: Y = u2, dataProviderName: O = s }) => {
    if (!R2) throw Yt;
    if (!S) throw Sr;
    if (!B) throw Zt;
    let { resource: _2, identifier: ae } = v(B), J = w({ resource: _2, meta: I2(ne, Y) }), we = $ ?? Q, ye = X ?? g2, Ve = P(ee(ae, O, x)), Ne = o(() => Ve.updateMany ? Ve.updateMany({ resource: _2.name, ids: R2, variables: S, meta: J, metaData: J }) : lt(R2.map((me) => Ve.update({ resource: _2.name, id: me, variables: S, meta: J, metaData: J }))), "mutationFn");
    return we !== "undoable" ? Ne() : new Promise((me, ce) => {
      let ve = o(() => {
        Ne().then((Ke) => me(Ke)).catch((Ke) => ce(Ke));
      }, "doMutation"), rt = o(() => {
        ce({ message: "mutationCancelled" });
      }, "cancelMutation");
      H && H(rt), D({ type: "ADD", payload: { id: R2, resource: ae, cancelMutation: rt, doMutation: ve, seconds: ye, isSilent: !!H } });
    });
  }, onMutate: async ({ resource: R2 = t, ids: S = e, values: B = r, mutationMode: H = c2, dataProviderName: $ = s, meta: X = a, metaData: ne = u2, optimisticUpdateMap: Y = m2 ?? { list: true, many: true, detail: true } }) => {
    if (!S) throw Yt;
    if (!B) throw Sr;
    if (!R2) throw Zt;
    let { identifier: O } = v(R2), { gqlMutation: _2, gqlQuery: ae, ...J } = I2(X, ne) ?? {}, we = dt(F)(O, ee(O, $, x), J), ye = b().data(ee(O, $, x)).resource(O), Ve = H ?? Q;
    await f2.cancelQueries(ye.get(F), void 0, { silent: true });
    let Ne = f2.getQueriesData(ye.get(F));
    if (Ve !== "pessimistic" && (Y.list && f2.setQueriesData(ye.action("list").params(J ?? {}).get(F), (se) => {
      if (typeof Y.list == "function") return Y.list(se, B, S);
      if (!se) return null;
      let me = se.data.map((ce) => ce.id !== void 0 && S.filter((ve) => ve !== void 0).map(String).includes(ce.id.toString()) ? { ...ce, ...B } : ce);
      return { ...se, data: me };
    }), Y.many && f2.setQueriesData(ye.action("many").get(F), (se) => {
      if (typeof Y.many == "function") return Y.many(se, B, S);
      if (!se) return null;
      let me = se.data.map((ce) => ce.id !== void 0 && S.filter((ve) => ve !== void 0).map(String).includes(ce.id.toString()) ? { ...ce, ...B } : ce);
      return { ...se, data: me };
    }), Y.detail)) for (let se of S) f2.setQueriesData(ye.action("one").id(se).params(J ?? {}).get(F), (me) => {
      if (typeof Y.detail == "function") return Y.detail(me, B, se);
      if (!me) return null;
      let ce = { ...me.data, ...B };
      return { ...me, data: ce };
    });
    return { previousQueries: Ne, queryKey: we };
  }, onSettled: (R2, S, B, H) => {
    var _2;
    let { ids: $ = e, resource: X = t, dataProviderName: ne = s, invalidates: Y = y2 } = B;
    if (!$) throw Yt;
    if (!X) throw Zt;
    let { identifier: O } = v(X);
    L2({ resource: O, invalidates: Y ?? ["list", "many"], dataProviderName: ee(O, ne, x) }), $.forEach((ae) => L2({ resource: O, invalidates: Y ?? ["detail"], dataProviderName: ee(O, ne, x), id: ae })), D({ type: "REMOVE", payload: { id: $, resource: O } }), (_2 = d3 == null ? void 0 : d3.onSettled) == null || _2.call(d3, R2, S, B, H);
  }, onSuccess: (R2, S, B) => {
    var Ke;
    let { ids: H = e, resource: $ = t, values: X = r, meta: ne = a, metaData: Y = u2, dataProviderName: O = s, successNotification: _2 = n } = S;
    if (!H) throw Yt;
    if (!X) throw Sr;
    if (!$) throw Zt;
    let { resource: ae, identifier: J } = v($), we = N.singular(J), ye = ee(J, O, x), Ve = w({ resource: ae, meta: I2(ne, Y) }), Ne = typeof _2 == "function" ? _2(R2, { ids: H, values: X }, J) : _2;
    E2(Ne, { key: `${H}-${J}-notification`, description: M("notifications.success", "Successful"), message: M("notifications.editSuccess", { resource: M(`${J}.${J}`, J) }, `Successfully updated ${we}`), type: "success" }), k2 == null || k2({ channel: `resources/${ae.name}`, type: "updated", payload: { ids: H.map(String) }, date: /* @__PURE__ */ new Date(), meta: { ...Ve, dataProviderName: ye } });
    let se = [];
    B && H.forEach((Ct) => {
      let Ge = f2.getQueryData(B.queryKey.detail(Ct));
      se.push(Object.keys(X || {}).reduce((Tt, xt) => {
        var bt;
        return Tt[xt] = (bt = Ge == null ? void 0 : Ge.data) == null ? void 0 : bt[xt], Tt;
      }, {}));
    });
    let { fields: me, operation: ce, variables: ve, ...rt } = Ve || {};
    U == null || U.mutate({ action: "updateMany", resource: ae.name, data: X, previousData: se, meta: { ids: H, dataProviderName: ye, ...rt } }), (Ke = d3 == null ? void 0 : d3.onSuccess) == null || Ke.call(d3, R2, S, B);
  }, onError: (R2, S, B) => {
    var O;
    let { ids: H = e, resource: $ = t, errorNotification: X = i2, values: ne = r } = S;
    if (!H) throw Yt;
    if (!ne) throw Sr;
    if (!$) throw Zt;
    let { identifier: Y } = v($);
    if (B) for (let _2 of B.previousQueries) f2.setQueryData(_2[0], _2[1]);
    if (R2.message !== "mutationCancelled") {
      h == null || h(R2);
      let _2 = N.singular(Y), ae = typeof X == "function" ? X(R2, { ids: H, values: ne }, Y) : X;
      E2(ae, { key: `${H}-${Y}-updateMany-error-notification`, message: M("notifications.editError", { resource: _2, statusCode: R2.statusCode }, `Error when updating ${_2} (status code: ${R2.statusCode})`), description: R2.message, type: "error" });
    }
    (O = d3 == null ? void 0 : d3.onError) == null || O.call(d3, R2, S, B);
  }, mutationKey: b().data().mutation("updateMany").get(F), ...d3, meta: { ...d3 == null ? void 0 : d3.meta, ...k("useUpdateMany", F) } }), { mutate: G, mutateAsync: W, ...K } = V, { elapsedTime: j } = fe({ ...T3, isLoading: K.isLoading });
  return { ...K, mutate: o((R2, S) => G(R2 || {}, S), "handleMutation"), mutateAsync: o((R2, S) => W(R2 || {}, S), "handleMutateAsync"), overtime: { elapsedTime: j } };
}, "useUpdateMany");
var Zt = new Error("[useUpdateMany]: `resource` is not defined or not matched but is required");
var Yt = new Error("[useUpdateMany]: `id` is not defined but is required in edit and clone actions");
var Sr = new Error("[useUpdateMany]: `values` is not provided but is required");
var di = o(({ mutationOptions: e, overtimeOptions: t } = {}) => {
  let r = ie(), { mutate: s } = Re({ v3LegacyAuthProviderCompatible: !!(r != null && r.isLegacy) }), { mutationMode: n, undoableTimeout: i2 } = _e(), a = le(), { notificationDispatch: u2 } = ut(), c2 = z(), p3 = Ye(), l2 = Ce(), m2 = Ae(), { log: y2 } = Je(), { resources: d3, select: T3 } = q(), x = useQueryClient(), v = ue(), { options: { textTransformers: f2 } } = ge(), { keys: P, preferLegacyKeys: M } = Z(), Q = useMutation({ mutationFn: ({ resource: C2, ids: h, mutationMode: D, undoableTimeout: k2, onCancel: E2, meta: L2, metaData: U, dataProviderName: w, values: N }) => {
    let { resource: b, identifier: F } = T3(C2), V = v({ resource: b, meta: I2(L2, U) }), G = D ?? n, W = k2 ?? i2, K = a(ee(F, w, d3)), j = o(() => K.deleteMany ? K.deleteMany({ resource: b.name, ids: h, meta: V, metaData: V, variables: N }) : lt(h.map((te) => K.deleteOne({ resource: b.name, id: te, meta: V, metaData: V, variables: N }))), "mutationFn");
    return G !== "undoable" ? j() : new Promise((te, R2) => {
      let S = o(() => {
        j().then((H) => te(H)).catch((H) => R2(H));
      }, "doMutation"), B = o(() => {
        R2({ message: "mutationCancelled" });
      }, "cancelMutation");
      E2 && E2(B), u2({ type: "ADD", payload: { id: h, resource: F, cancelMutation: B, doMutation: S, seconds: W, isSilent: !!E2 } });
    });
  }, onMutate: async ({ ids: C2, resource: h, mutationMode: D, dataProviderName: k2, meta: E2, metaData: L2 }) => {
    let { identifier: U } = T3(h), { gqlMutation: w, gqlQuery: N, ...b } = I2(E2, L2) ?? {}, F = dt(M)(U, ee(U, k2, d3), b), V = P().data(ee(U, k2, d3)).resource(U), G = D ?? n;
    await x.cancelQueries(V.get(M), void 0, { silent: true });
    let W = x.getQueriesData(V.get(M));
    if (G !== "pessimistic") {
      x.setQueriesData(V.action("list").params(b ?? {}).get(M), (K) => K ? { data: K.data.filter((re) => re.id && !C2.map(String).includes(re.id.toString())), total: K.total - 1 } : null), x.setQueriesData(V.action("many").get(M), (K) => {
        if (!K) return null;
        let j = K.data.filter((re) => re.id ? !C2.map(String).includes(re.id.toString()) : false);
        return { ...K, data: j };
      });
      for (let K of C2) x.setQueriesData(V.action("one").id(K).params(b).get(M), (j) => !j || j.data.id === K ? null : { ...j });
    }
    return { previousQueries: W, queryKey: F };
  }, onSettled: (C2, h, { resource: D, ids: k2, dataProviderName: E2, invalidates: L2 = ["list", "many"] }) => {
    let { identifier: U } = T3(D);
    m2({ resource: U, dataProviderName: ee(U, E2, d3), invalidates: L2 }), u2({ type: "REMOVE", payload: { id: k2, resource: U } });
  }, onSuccess: (C2, { ids: h, resource: D, meta: k2, metaData: E2, dataProviderName: L2, successNotification: U }, w) => {
    let { resource: N, identifier: b } = T3(D), F = ee(b, L2, d3), V = v({ resource: N, meta: I2(k2, E2) });
    h.forEach((te) => x.removeQueries(w == null ? void 0 : w.queryKey.detail(te)));
    let G = typeof U == "function" ? U(C2, h, b) : U;
    l2(G, { key: `${h}-${b}-notification`, description: c2("notifications.success", "Success"), message: c2("notifications.deleteSuccess", { resource: c2(`${b}.${b}`, b) }, `Successfully deleted ${b}`), type: "success" }), p3 == null || p3({ channel: `resources/${N.name}`, type: "deleted", payload: { ids: h }, date: /* @__PURE__ */ new Date(), meta: { ...V, dataProviderName: F } });
    let { fields: W, operation: K, variables: j, ...re } = V || {};
    y2 == null || y2.mutate({ action: "deleteMany", resource: N.name, meta: { ids: h, dataProviderName: F, ...re } }), h.forEach((te) => x.removeQueries(w == null ? void 0 : w.queryKey.detail(te)));
  }, onError: (C2, { ids: h, resource: D, errorNotification: k2 }, E2) => {
    let { identifier: L2 } = T3(D);
    if (E2) for (let U of E2.previousQueries) x.setQueryData(U[0], U[1]);
    if (C2.message !== "mutationCancelled") {
      s(C2);
      let U = f2.singular(L2), w = typeof k2 == "function" ? k2(C2, h, L2) : k2;
      l2(w, { key: `${h}-${L2}-notification`, message: c2("notifications.deleteError", { resource: U, statusCode: C2.statusCode }, `Error (status code: ${C2.statusCode})`), description: C2.message, type: "error" });
    }
  }, mutationKey: P().data().mutation("deleteMany").get(M), ...e, meta: { ...e == null ? void 0 : e.meta, ...k("useDeleteMany", M) } }), { elapsedTime: g2 } = fe({ ...t, isLoading: Q.isLoading });
  return { ...Q, overtime: { elapsedTime: g2 } };
}, "useDeleteMany");
var li = o((e) => {
  var n;
  let t = le(), { resource: r } = q(), { getApiUrl: s } = t(e ?? ((n = I2(r == null ? void 0 : r.meta, r == null ? void 0 : r.options)) == null ? void 0 : n.dataProviderName));
  return s();
}, "useApiUrl");
var yi = o(({ url: e, method: t, config: r, queryOptions: s, successNotification: n, errorNotification: i2, meta: a, metaData: u2, dataProviderName: c2, overtimeOptions: p3 }) => {
  let l2 = le(), m2 = ie(), { mutate: y2 } = Re({ v3LegacyAuthProviderCompatible: !!(m2 != null && m2.isLegacy) }), d3 = z(), T3 = Ce(), x = ue(), { keys: v, preferLegacyKeys: f2 } = Z(), P = I2(a, u2), { custom: M } = l2(c2), Q = x({ meta: P });
  if (M) {
    let g2 = useQuery({ queryKey: v().data(c2).mutation("custom").params({ method: t, url: e, ...r, ...P || {} }).get(f2), queryFn: (h) => M({ url: e, method: t, ...r, meta: { ...Q, queryContext: je(h) }, metaData: { ...Q, queryContext: je(h) } }), ...s, onSuccess: (h) => {
      var k2;
      (k2 = s == null ? void 0 : s.onSuccess) == null || k2.call(s, h);
      let D = typeof n == "function" ? n(h, { ...r, ...Q }) : n;
      T3(D);
    }, onError: (h) => {
      var k2;
      y2(h), (k2 = s == null ? void 0 : s.onError) == null || k2.call(s, h);
      let D = typeof i2 == "function" ? i2(h, { ...r, ...Q }) : i2;
      T3(D, { key: `${t}-notification`, message: d3("notifications.error", { statusCode: h.statusCode }, `Error (status code: ${h.statusCode})`), description: h.message, type: "error" });
    }, meta: { ...s == null ? void 0 : s.meta, ...k("useCustom", f2) } }), { elapsedTime: C2 } = fe({ ...p3, isLoading: g2.isFetching });
    return { ...g2, overtime: { elapsedTime: C2 } };
  }
  throw Error("Not implemented custom on data provider.");
}, "useCustom");
var xi = o(({ mutationOptions: e, overtimeOptions: t } = {}) => {
  let r = ie(), { mutate: s } = Re({ v3LegacyAuthProviderCompatible: !!(r != null && r.isLegacy) }), n = Ce(), i2 = le(), a = z(), u2 = ue(), { keys: c2, preferLegacyKeys: p3 } = Z(), l2 = useMutation(({ url: y2, method: d3, values: T3, meta: x, metaData: v, dataProviderName: f2, config: P }) => {
    let M = u2({ meta: I2(x, v) }), { custom: Q } = i2(f2);
    if (Q) return Q({ url: y2, method: d3, payload: T3, meta: M, metaData: M, headers: { ...P == null ? void 0 : P.headers } });
    throw Error("Not implemented custom on data provider.");
  }, { onSuccess: (y2, { successNotification: d3, config: T3, meta: x, metaData: v }) => {
    let f2 = typeof d3 == "function" ? d3(y2, { ...T3, ...I2(x, v) || {} }) : d3;
    n(f2);
  }, onError: (y2, { errorNotification: d3, method: T3, config: x, meta: v, metaData: f2 }) => {
    s(y2);
    let P = typeof d3 == "function" ? d3(y2, { ...x, ...I2(v, f2) || {} }) : d3;
    n(P, { key: `${T3}-notification`, message: a("notifications.error", { statusCode: y2.statusCode }, `Error (status code: ${y2.statusCode})`), description: y2.message, type: "error" });
  }, mutationKey: c2().data().mutation("customMutation").get(p3), ...e, meta: { ...e == null ? void 0 : e.meta, ...k("useCustomMutation", p3) } }), { elapsedTime: m2 } = fe({ ...t, isLoading: l2.isLoading });
  return { ...l2, overtime: { elapsedTime: m2 } };
}, "useCustomMutation");
var Hs = { default: {} };
var Jt = import_react18.default.createContext(Hs);
var $s = o(({ children: e, dataProvider: t }) => {
  let r = Hs;
  return t && (!("default" in t) && ("getList" in t || "getOne" in t) ? r = { default: t } : r = t), import_react18.default.createElement(Jt.Provider, { value: r }, e);
}, "DataContextProvider");
var le = o(() => {
  let e = (0, import_react17.useContext)(Jt);
  return (0, import_react17.useCallback)((r) => {
    if (r) {
      let s = e == null ? void 0 : e[r];
      if (!s) throw new Error(`"${r}" Data provider not found`);
      if (s && !(e != null && e.default)) throw new Error("If you have multiple data providers, you must provide default data provider property");
      return e[r];
    }
    if (e.default) return e.default;
    throw new Error('There is no "default" data provider. Please pass dataProviderName.');
  }, [e]);
}, "useDataProvider");
var bi = o(({ resource: e, config: t, filters: r, hasPagination: s, pagination: n, sorters: i2, queryOptions: a, successNotification: u2, errorNotification: c2, meta: p3, metaData: l2, liveMode: m2, onLiveEvent: y2, liveParams: d3, dataProviderName: T3, overtimeOptions: x }) => {
  let { resources: v, resource: f2, identifier: P } = q(e), M = le(), Q = z(), g2 = ie(), { mutate: C2 } = Re({ v3LegacyAuthProviderCompatible: !!(g2 != null && g2.isLegacy) }), h = Ce(), D = ue(), { keys: k2, preferLegacyKeys: E2 } = Z(), L2 = ee(P, T3, v), U = I2(p3, l2), w = I2(r, t == null ? void 0 : t.filters), N = I2(i2, t == null ? void 0 : t.sort), b = I2(s, t == null ? void 0 : t.hasPagination), F = Wt({ pagination: n, configPagination: t == null ? void 0 : t.pagination, hasPagination: b }), V = F.mode === "server", G = { meta: U, metaData: U, filters: w, hasPagination: V, pagination: F, sorters: N, config: { ...t, sort: N } }, W = (a == null ? void 0 : a.enabled) === void 0 || (a == null ? void 0 : a.enabled) === true, K = D({ resource: f2, meta: U }), { getList: j } = M(L2);
  Pt({ resource: P, types: ["*"], params: { meta: K, metaData: K, pagination: F, hasPagination: V, sort: N, sorters: N, filters: w, subscriptionType: "useList", ...d3 }, channel: `resources/${f2.name}`, enabled: W, liveMode: m2, onLiveEvent: y2, dataProviderName: L2, meta: { ...K, dataProviderName: T3 } });
  let re = useInfiniteQuery({ queryKey: k2().data(L2).resource(P).action("infinite").params({ ...U || {}, filters: w, hasPagination: V, ...V && { pagination: F }, ...i2 && { sorters: i2 }, ...(t == null ? void 0 : t.sort) && { sort: t == null ? void 0 : t.sort } }).get(E2), queryFn: (R2) => {
    let S = { ...F, current: R2.pageParam }, B = { ...K, queryContext: je(R2) };
    return j({ resource: f2.name, pagination: S, hasPagination: V, filters: w, sort: N, sorters: N, meta: B, metaData: B }).then(({ data: H, total: $, ...X }) => ({ data: H, total: $, pagination: S, ...X }));
  }, getNextPageParam: (R2) => Tr(R2), getPreviousPageParam: (R2) => xr(R2), ...a, onSuccess: (R2) => {
    var B;
    (B = a == null ? void 0 : a.onSuccess) == null || B.call(a, R2);
    let S = typeof u2 == "function" ? u2(R2, G, P) : u2;
    h(S);
  }, onError: (R2) => {
    var B;
    C2(R2), (B = a == null ? void 0 : a.onError) == null || B.call(a, R2);
    let S = typeof c2 == "function" ? c2(R2, G, P) : c2;
    h(S, { key: `${P}-useInfiniteList-notification`, message: Q("notifications.error", { statusCode: R2.statusCode }, `Error (status code: ${R2.statusCode})`), description: R2.message, type: "error" });
  }, meta: { ...a == null ? void 0 : a.meta, ...k("useInfiniteList", E2, f2 == null ? void 0 : f2.name) } }), { elapsedTime: te } = fe({ ...x, isLoading: re.isFetching });
  return { ...re, overtime: { elapsedTime: te } };
}, "useInfiniteList");
var mt = import_react20.default.createContext({});
var _s = o(({ liveProvider: e, children: t }) => import_react20.default.createElement(mt.Provider, { value: { liveProvider: e } }, t), "LiveContextProvider");
var Ae = o(() => {
  let { resources: e } = q(), t = useQueryClient(), { keys: r, preferLegacyKeys: s } = Z();
  return (0, import_react21.useCallback)(async ({ resource: i2, dataProviderName: a, invalidates: u2, id: c2, invalidationFilters: p3 = { type: "all", refetchType: "active" }, invalidationOptions: l2 = { cancelRefetch: false } }) => {
    if (u2 === false) return;
    let m2 = ee(i2, a, e), y2 = r().data(m2).resource(i2 ?? "");
    await Promise.all(u2.map((d3) => {
      switch (d3) {
        case "all":
          return t.invalidateQueries(r().data(m2).get(s), p3, l2);
        case "list":
          return t.invalidateQueries(y2.action("list").get(s), p3, l2);
        case "many":
          return t.invalidateQueries(y2.action("many").get(s), p3, l2);
        case "resourceAll":
          return t.invalidateQueries(y2.get(s), p3, l2);
        case "detail":
          return t.invalidateQueries(y2.action("one").id(c2 || "").get(s), p3, l2);
        default:
          return;
      }
    }));
  }, []);
}, "useInvalidate");
var js = o((e) => {
  let t = (0, import_react25.useRef)(e);
  return isEqual_default(t.current, e) || (t.current = e), t.current;
}, "useMemoized");
var Ar = o((e, t) => {
  let r = js(t);
  return (0, import_react24.useMemo)(e, r);
}, "useDeepMemo");
var Rt = import_react23.default.createContext({ resources: [] });
var Zs = o(({ resources: e, children: t }) => {
  let r = Ar(() => hr(e ?? []), [e]);
  return import_react23.default.createElement(Rt.Provider, { value: { resources: r } }, t);
}, "ResourceContextProvider");
var Js = import_react26.default.createContext("new");
var qs = Js.Provider;
var oe = o(() => import_react26.default.useContext(Js), "useRouterType");
var en = {};
var ft = (0, import_react28.createContext)(en);
var tn = o(({ children: e, router: t }) => import_react28.default.createElement(ft.Provider, { value: t ?? en }, e), "RouterContextProvider");
var vo = o(() => {
  let e = (0, import_react29.useContext)(ft);
  return import_react29.default.useMemo(() => (e == null ? void 0 : e.parse) ?? (() => () => ({})), [e == null ? void 0 : e.parse])();
}, "useParse");
var Te = o(() => {
  let e = vo();
  return import_react27.default.useMemo(() => e(), [e]);
}, "useParsed");
function q(e) {
  let { resources: t } = (0, import_react22.useContext)(Rt), r = oe(), s = Te(), n = { resourceName: e && typeof e != "string" ? e.resourceName : e, resourceNameOrRouteName: e && typeof e != "string" ? e.resourceNameOrRouteName : e, recordItemId: e && typeof e != "string" ? e.recordItemId : void 0 }, i2 = o((m2, y2 = true) => {
    let T3 = Ee(m2, t, r === "legacy");
    if (T3) return { resource: T3, identifier: T3.identifier ?? T3.name };
    if (y2) {
      let x = { name: m2, identifier: m2 }, v = x.identifier ?? x.name;
      return { resource: x, identifier: v };
    }
  }, "select"), a = rn(), { useParams: u2 } = pe(), c2 = u2();
  if (r === "legacy") {
    let m2 = n.resourceNameOrRouteName ? n.resourceNameOrRouteName : c2.resource, y2 = m2 ? a(m2) : void 0, d3 = (n == null ? void 0 : n.recordItemId) ?? c2.id, T3 = c2.action, x = (n == null ? void 0 : n.resourceName) ?? (y2 == null ? void 0 : y2.name), v = (y2 == null ? void 0 : y2.identifier) ?? (y2 == null ? void 0 : y2.name);
    return { resources: t, resource: y2, resourceName: x, id: d3, action: T3, select: i2, identifier: v };
  }
  let p3, l2 = typeof e == "string" ? e : n == null ? void 0 : n.resourceNameOrRouteName;
  if (l2) {
    let m2 = Ee(l2, t);
    m2 ? p3 = m2 : p3 = { name: l2 };
  } else s != null && s.resource && (p3 = s.resource);
  return { resources: t, resource: p3, resourceName: p3 == null ? void 0 : p3.name, id: s.id, action: s.action, select: i2, identifier: (p3 == null ? void 0 : p3.identifier) ?? (p3 == null ? void 0 : p3.name) };
}
o(q, "useResource");
var rn = o(() => {
  let { resources: e } = (0, import_react30.useContext)(Rt);
  return (0, import_react30.useCallback)((r) => {
    let s = Ee(r, e, true);
    return s || { name: r, route: r };
  }, [e]);
}, "useResourceWithRoute");
var Pt = o(({ resource: e, params: t, channel: r, types: s, enabled: n = true, liveMode: i2, onLiveEvent: a, dataProviderName: u2, meta: c2 }) => {
  var f2;
  let { resource: p3, identifier: l2 } = q(e), { liveProvider: m2 } = (0, import_react19.useContext)(mt), { liveMode: y2, onLiveEvent: d3 } = (0, import_react19.useContext)(Qe), T3 = i2 ?? y2, x = Ae(), v = u2 ?? (c2 == null ? void 0 : c2.dataProviderName) ?? ((f2 = p3 == null ? void 0 : p3.meta) == null ? void 0 : f2.dataProviderName);
  (0, import_react19.useEffect)(() => {
    let P, M = o((Q) => {
      T3 === "auto" && x({ resource: l2, dataProviderName: v, invalidates: ["resourceAll"], invalidationFilters: { type: "active", refetchType: "active" }, invalidationOptions: { cancelRefetch: false } }), a == null || a(Q), d3 == null || d3(Q);
    }, "callback");
    return T3 && T3 !== "off" && n && (P = m2 == null ? void 0 : m2.subscribe({ channel: r, params: { resource: p3 == null ? void 0 : p3.name, ...t }, types: s, callback: M, dataProviderName: v, meta: { ...c2, dataProviderName: v } })), () => {
      P && (m2 == null || m2.unsubscribe(P));
    };
  }, [n]);
}, "useResourceSubscription");
var sn = o((e) => {
  let { liveMode: t } = (0, import_react31.useContext)(Qe);
  return e ?? t;
}, "useLiveMode");
var ph = o(({ params: e, channel: t, types: r = ["*"], enabled: s = true, onLiveEvent: n, dataProviderName: i2 = "default", meta: a }) => {
  let { liveProvider: u2 } = (0, import_react32.useContext)(mt);
  (0, import_react32.useEffect)(() => {
    let c2;
    return s && (c2 = u2 == null ? void 0 : u2.subscribe({ channel: t, params: e, types: r, callback: n, dataProviderName: i2, meta: { ...a, dataProviderName: i2 } })), () => {
      c2 && (u2 == null || u2.unsubscribe(c2));
    };
  }, [s]);
}, "useSubscription");
var Ye = o(() => {
  let { liveProvider: e } = (0, import_react33.useContext)(mt);
  return e == null ? void 0 : e.publish;
}, "usePublish");
var Uo = (0, import_react35.createContext)({ notifications: [], notificationDispatch: () => false });
var Hi = [];
var $i = o((e, t) => {
  switch (t.type) {
    case "ADD":
      return [...e.filter((s) => !(isEqual_default(s.id, t.payload.id) && s.resource === t.payload.resource)), { ...t.payload, isRunning: true }];
    case "REMOVE":
      return e.filter((r) => !(isEqual_default(r.id, t.payload.id) && r.resource === t.payload.resource));
    case "DECREASE_NOTIFICATION_SECOND":
      return e.map((r) => isEqual_default(r.id, t.payload.id) && r.resource === t.payload.resource ? { ...r, seconds: t.payload.seconds - 1e3 } : r);
    default:
      return e;
  }
}, "undoableQueueReducer");
var an = o(({ children: e }) => {
  let [t, r] = (0, import_react35.useReducer)($i, Hi), s = { notifications: t, notificationDispatch: r };
  return import_react35.default.createElement(Uo.Provider, { value: s }, e, typeof window < "u" ? t.map((n) => import_react35.default.createElement(un, { key: `${n.id}-${n.resource}-queue`, notification: n })) : null);
}, "UndoableQueueContextProvider");
var ut = o(() => {
  let { notifications: e, notificationDispatch: t } = (0, import_react34.useContext)(Uo);
  return { notifications: e, notificationDispatch: t };
}, "useCancelNotification");
var qt = (0, import_react37.createContext)({});
var cn = o(({ open: e, close: t, children: r }) => import_react37.default.createElement(qt.Provider, { value: { open: e, close: t } }, r), "NotificationContextProvider");
var He = o(() => {
  let { open: e, close: t } = (0, import_react36.useContext)(qt);
  return { open: e, close: t };
}, "useNotification");
var Ce = o(() => {
  let { open: e } = He();
  return (0, import_react38.useCallback)((r, s) => {
    r !== false && (r ? e == null || e(r) : s && (e == null || e(s)));
  }, []);
}, "useHandleNotification");
var Xe = import_react40.default.createContext({});
var dn = o(({ children: e, i18nProvider: t }) => import_react40.default.createElement(Xe.Provider, { value: { i18nProvider: t } }, e), "I18nContextProvider");
var Eo = o(() => {
  let { i18nProvider: e } = (0, import_react39.useContext)(Xe);
  return (0, import_react39.useCallback)((t) => e == null ? void 0 : e.changeLocale(t), []);
}, "useSetLocale");
var z = o(() => {
  let { i18nProvider: e } = (0, import_react41.useContext)(Xe);
  return (0, import_react41.useMemo)(() => {
    function r(s, n, i2) {
      return (e == null ? void 0 : e.translate(s, n, i2)) ?? i2 ?? (typeof n == "string" && typeof i2 > "u" ? n : s);
    }
    return o(r, "translate"), r;
  }, [e]);
}, "useTranslate");
var Lo = o(() => {
  let { i18nProvider: e } = (0, import_react42.useContext)(Xe);
  return (0, import_react42.useCallback)(() => e == null ? void 0 : e.getLocale(), []);
}, "useGetLocale");
var tP = o(() => {
  let e = z(), t = Eo(), r = Lo();
  return { translate: e, changeLocale: t, getLocale: r };
}, "useTranslation");
var fP = o(({ resourceName: e, resource: t, sorter: r, sorters: s, filters: n, maxItemCount: i2, pageSize: a = 20, mapData: u2 = o((x) => x, "mapData"), exportOptions: c2, unparseConfig: p3, meta: l2, metaData: m2, dataProviderName: y2, onError: d3, download: T3 } = {}) => {
  let [x, v] = (0, import_react43.useState)(false), f2 = le(), P = ue(), { resource: M, resources: Q, identifier: g2 } = q(I2(t, e)), h = `${ht()(g2, "plural")}-${(/* @__PURE__ */ new Date()).toLocaleString()}`, { getList: D } = f2(ee(g2, y2, Q)), k2 = P({ resource: M, meta: I2(l2, m2) });
  return { isLoading: x, triggerExport: o(async () => {
    v(true);
    let L2 = [], U = 1, w = true;
    for (; w; ) try {
      let { data: V, total: G } = await D({ resource: (M == null ? void 0 : M.name) ?? "", filters: n, sort: I2(s, r), sorters: I2(s, r), pagination: { current: U, pageSize: a, mode: "server" }, meta: k2, metaData: k2 });
      U++, L2.push(...V), i2 && L2.length >= i2 && (L2 = L2.slice(0, i2), w = false), G === L2.length && (w = false);
    } catch (V) {
      v(false), w = false, d3 == null || d3(V);
      return;
    }
    let N = typeof p3 < "u" && p3 !== null;
    (0, import_warn_once3.default)(N && typeof c2 < "u" && c2 !== null, `[useExport]: resource: "${g2}" 

Both \`unparseConfig\` and \`exportOptions\` are set, \`unparseConfig\` will take precedence`);
    let b = { filename: h, useKeysAsHeaders: true, useBom: true, title: "My Generated Report", quoteStrings: '"', ...c2 };
    (0, import_warn_once3.default)((c2 == null ? void 0 : c2.decimalSeparator) !== void 0, `[useExport]: resource: "${g2}" 

Use of \`decimalSeparator\` no longer supported, please use \`mapData\` instead.

See https://refine.dev/docs/api-reference/core/hooks/import-export/useExport/`), N ? p3 = { quotes: true, ...p3 } : p3 = { columns: b.useKeysAsHeaders ? void 0 : b.headers, delimiter: b.fieldSeparator, header: b.showLabels || b.useKeysAsHeaders, quoteChar: b.quoteStrings, quotes: true };
    let F = import_papaparse.default.unparse(L2.map(u2), p3);
    if (b.showTitle && (F = `${b.title}\r

${F}`), typeof window < "u" && F.length > 0 && (T3 ?? true)) {
      let V = b.useTextFile ? ".txt" : ".csv", G = `text/${b.useTextFile ? "plain" : "csv"};charset=utf8;`, W = `${(b.filename ?? "download").replace(/ /g, "_")}${V}`;
      ro(W, `${b != null && b.useBom ? "\uFEFF" : ""}${F}`, G);
    }
    return v(false), F;
  }, "triggerExport") };
}, "useExport");
var RP = o((e = {}) => {
  var K, j, re;
  let t = ue(), r = Ae(), { redirect: s } = At(), { mutationMode: n } = _e(), { setWarnWhen: i2 } = vt(), a = fn(), u2 = I2(e.meta, e.metaData), c2 = e.mutationMode ?? n, { id: p3, setId: l2, resource: m2, identifier: y2, formAction: d3 } = qe({ resource: e.resource, id: e.id, action: e.action }), [T3, x] = import_react44.default.useState(false), v = d3 === "edit", f2 = d3 === "clone", P = d3 === "create", M = t({ resource: m2, meta: u2 }), Q = (v || f2) && !!e.resource, g2 = typeof e.id < "u", C2 = ((K = e.queryOptions) == null ? void 0 : K.enabled) === false;
  (0, import_warn_once4.default)(Q && !g2 && !C2, pu(d3, y2, p3));
  let h = qr({ redirectFromProps: e.redirect, action: d3, redirectOptions: s }), D = o((te = v ? "list" : "edit", R2 = p3, S = {}) => {
    a({ redirect: te, resource: m2, id: R2, meta: { ...u2, ...S } });
  }, "redirect"), k2 = zt({ resource: y2, id: p3, queryOptions: { enabled: !P && p3 !== void 0, ...e.queryOptions }, liveMode: e.liveMode, onLiveEvent: e.onLiveEvent, liveParams: e.liveParams, meta: { ...M, ...e.queryMeta }, dataProviderName: e.dataProviderName, overtimeOptions: { enabled: false } }), E2 = Xt({ mutationOptions: e.createMutationOptions, overtimeOptions: { enabled: false } }), L2 = To({ mutationOptions: e.updateMutationOptions, overtimeOptions: { enabled: false } }), U = v ? L2 : E2, N = U.isLoading || k2.isFetching, { elapsedTime: b } = fe({ ...e.overtimeOptions, isLoading: N });
  import_react44.default.useEffect(() => () => {
    var te;
    (te = e.autoSave) != null && te.invalidateOnUnmount && T3 && y2 && typeof p3 < "u" && r({ id: p3, invalidates: e.invalidates || ["list", "many", "detail"], dataProviderName: e.dataProviderName, resource: y2 });
  }, [(j = e.autoSave) == null ? void 0 : j.invalidateOnUnmount, T3]);
  let F = o(async (te, { isAutosave: R2 = false } = {}) => {
    let S = c2 === "pessimistic";
    i2(false);
    let B = o(($) => D(h, $), "onSuccessRedirect");
    return new Promise(($, X) => {
      if (!m2) return X(au);
      if (f2 && !p3) return X(iu);
      if (!te) return X(uu);
      if (R2 && !v) return X(cu);
      !S && !R2 && (br(() => B()), $());
      let ne = { values: te, resource: y2 ?? m2.name, meta: { ...M, ...e.mutationMeta }, metaData: { ...M, ...e.mutationMeta }, dataProviderName: e.dataProviderName, invalidates: R2 ? [] : e.invalidates, successNotification: R2 ? false : e.successNotification, errorNotification: R2 ? false : e.errorNotification, ...v ? { id: p3 ?? "", mutationMode: c2, undoableTimeout: e.undoableTimeout, optimisticUpdateMap: e.optimisticUpdateMap } : {} }, { mutateAsync: Y } = v ? L2 : E2;
      Y(ne, { onSuccess: e.onMutationSuccess ? (O, _2, ae) => {
        var J;
        (J = e.onMutationSuccess) == null || J.call(e, O, te, ae, R2);
      } : void 0, onError: e.onMutationError ? (O, _2, ae) => {
        var J;
        (J = e.onMutationError) == null || J.call(e, O, te, ae, R2);
      } : void 0 }).then((O) => {
        S && !R2 && br(() => {
          var _2;
          return B((_2 = O == null ? void 0 : O.data) == null ? void 0 : _2.id);
        }), R2 && x(true), $(O);
      }).catch(X);
    });
  }, "onFinish"), V = oo((te) => F(te, { isAutosave: true }), ((re = e.autoSave) == null ? void 0 : re.debounce) || 1e3, "Cancelled by debounce"), G = { elapsedTime: b }, W = { status: L2.status, data: L2.data, error: L2.error };
  return { onFinish: F, onFinishAutoSave: V, formLoading: N, mutationResult: U, mutation: U, queryResult: k2, query: k2, autoSaveProps: W, id: p3, setId: l2, redirect: D, overtime: G };
}, "useForm");
var au = new Error("[useForm]: `resource` is not defined or not matched but is required");
var iu = new Error("[useForm]: `id` is not defined but is required in edit and clone actions");
var uu = new Error("[useForm]: `values` is not provided but is required");
var cu = new Error("[useForm]: `autoSave` is only allowed in edit action");
var pu = o((e, t, r) => `[useForm]: action: "${e}", resource: "${t}", id: ${r}

If you don't use the \`setId\` method to set the \`id\`, you should pass the \`id\` prop to \`useForm\`. Otherwise, \`useForm\` will not be able to infer the \`id\` from the current URL with custom resource provided.

See https://refine.dev/docs/data/hooks/use-form/#id-`, "idWarningMessage");
var fn = o(() => {
  let { show: e, edit: t, list: r, create: s } = he();
  return (0, import_react45.useCallback)(({ redirect: i2, resource: a, id: u2, meta: c2 = {} }) => {
    if (i2 && a) return a.show && i2 === "show" && u2 ? e(a, u2, void 0, c2) : a.edit && i2 === "edit" && u2 ? t(a, u2, void 0, c2) : a.create && i2 === "create" ? s(a, void 0, c2) : r(a, "push", c2);
  }, []);
}, "useRedirectionAfterSubmission");
var Mo = o(() => {
  let e = (0, import_react46.useContext)(ft);
  return import_react46.default.useMemo(() => (e == null ? void 0 : e.back) ?? (() => () => {
  }), [e == null ? void 0 : e.back])();
}, "useBack");
var Ut = o(() => {
  let e = oe(), { resource: t, resources: r } = q(), s = Te();
  return import_react48.default.useCallback(({ resource: i2, action: a, meta: u2 }) => {
    var y2;
    let c2 = i2 || t;
    if (!c2) return;
    let l2 = (y2 = Se(c2, r, e === "legacy").find((d3) => d3.action === a)) == null ? void 0 : y2.route;
    return l2 ? We(l2, c2 == null ? void 0 : c2.meta, s, u2) : void 0;
  }, [r, t, s]);
}, "useGetToPath");
var Pe = o(() => {
  let e = (0, import_react47.useContext)(ft), { select: t } = q(), r = Ut(), n = import_react47.default.useMemo(() => (e == null ? void 0 : e.go) ?? (() => () => {
  }), [e == null ? void 0 : e.go])();
  return (0, import_react47.useCallback)((a) => {
    if (typeof a.to != "object") return n({ ...a, to: a.to });
    let { resource: u2 } = t(a.to.resource);
    xu(a.to, u2);
    let c2 = r({ resource: u2, action: a.to.action, meta: { id: a.to.id, ...a.to.meta } });
    return n({ ...a, to: c2 });
  }, [t, n]);
}, "useGo");
var xu = o((e, t) => {
  if (!(e != null && e.action) || !(e != null && e.resource)) throw new Error('[useGo]: "action" or "resource" is required.');
  if (["edit", "show", "clone"].includes(e == null ? void 0 : e.action) && !e.id) throw new Error(`[useGo]: [action: ${e.action}] requires an "id" for resource [resource: ${e.resource}]`);
  if (!t[e.action]) throw new Error(`[useGo]: [action: ${e.action}] is not defined for [resource: ${e.resource}]`);
}, "handleResourceErrors");
var he = o(() => {
  let { resources: e } = q(), t = oe(), { useHistory: r } = pe(), s = r(), n = Te(), i2 = Pe(), a = Mo(), u2 = o((g2, C2 = "push") => {
    t === "legacy" ? s[C2](g2) : i2({ to: g2, type: C2 });
  }, "handleUrl"), c2 = o((g2, C2 = {}) => {
    var k2;
    if (t === "legacy") {
      let E2 = typeof g2 == "string" ? Ee(g2, e, true) ?? { name: g2, route: g2 } : g2, L2 = Se(E2, e, true).find((U) => U.action === "create");
      return L2 ? We(L2.route, E2 == null ? void 0 : E2.meta, n, C2) : "";
    }
    let h = typeof g2 == "string" ? Ee(g2, e) ?? { name: g2 } : g2, D = (k2 = Se(h, e).find((E2) => E2.action === "create")) == null ? void 0 : k2.route;
    return D ? i2({ to: We(D, h == null ? void 0 : h.meta, n, C2), type: "path", query: C2.query }) : "";
  }, "createUrl"), p3 = o((g2, C2, h = {}) => {
    var L2;
    let D = encodeURIComponent(C2);
    if (t === "legacy") {
      let U = typeof g2 == "string" ? Ee(g2, e, true) ?? { name: g2, route: g2 } : g2, w = Se(U, e, true).find((N) => N.action === "edit");
      return w ? We(w.route, U == null ? void 0 : U.meta, n, { ...h, id: D }) : "";
    }
    let k2 = typeof g2 == "string" ? Ee(g2, e) ?? { name: g2 } : g2, E2 = (L2 = Se(k2, e).find((U) => U.action === "edit")) == null ? void 0 : L2.route;
    return E2 ? i2({ to: We(E2, k2 == null ? void 0 : k2.meta, n, { ...h, id: D }), type: "path", query: h.query }) : "";
  }, "editUrl"), l2 = o((g2, C2, h = {}) => {
    var L2;
    let D = encodeURIComponent(C2);
    if (t === "legacy") {
      let U = typeof g2 == "string" ? Ee(g2, e, true) ?? { name: g2, route: g2 } : g2, w = Se(U, e, true).find((N) => N.action === "clone");
      return w ? We(w.route, U == null ? void 0 : U.meta, n, { ...h, id: D }) : "";
    }
    let k2 = typeof g2 == "string" ? Ee(g2, e) ?? { name: g2 } : g2, E2 = (L2 = Se(k2, e).find((U) => U.action === "clone")) == null ? void 0 : L2.route;
    return E2 ? i2({ to: We(E2, k2 == null ? void 0 : k2.meta, n, { ...h, id: D }), type: "path", query: h.query }) : "";
  }, "cloneUrl"), m2 = o((g2, C2, h = {}) => {
    var L2;
    let D = encodeURIComponent(C2);
    if (t === "legacy") {
      let U = typeof g2 == "string" ? Ee(g2, e, true) ?? { name: g2, route: g2 } : g2, w = Se(U, e, true).find((N) => N.action === "show");
      return w ? We(w.route, U == null ? void 0 : U.meta, n, { ...h, id: D }) : "";
    }
    let k2 = typeof g2 == "string" ? Ee(g2, e) ?? { name: g2 } : g2, E2 = (L2 = Se(k2, e).find((U) => U.action === "show")) == null ? void 0 : L2.route;
    return E2 ? i2({ to: We(E2, k2 == null ? void 0 : k2.meta, n, { ...h, id: D }), type: "path", query: h.query }) : "";
  }, "showUrl"), y2 = o((g2, C2 = {}) => {
    var k2;
    if (t === "legacy") {
      let E2 = typeof g2 == "string" ? Ee(g2, e, true) ?? { name: g2, route: g2 } : g2, L2 = Se(E2, e, true).find((U) => U.action === "list");
      return L2 ? We(L2.route, E2 == null ? void 0 : E2.meta, n, C2) : "";
    }
    let h = typeof g2 == "string" ? Ee(g2, e) ?? { name: g2 } : g2, D = (k2 = Se(h, e).find((E2) => E2.action === "list")) == null ? void 0 : k2.route;
    return D ? i2({ to: We(D, h == null ? void 0 : h.meta, n, C2), type: "path", query: C2.query }) : "";
  }, "listUrl");
  return { create: o((g2, C2 = "push", h = {}) => {
    u2(c2(g2, h), C2);
  }, "create"), createUrl: c2, edit: o((g2, C2, h = "push", D = {}) => {
    u2(p3(g2, C2, D), h);
  }, "edit"), editUrl: p3, clone: o((g2, C2, h = "push", D = {}) => {
    u2(l2(g2, C2, D), h);
  }, "clone"), cloneUrl: l2, show: o((g2, C2, h = "push", D = {}) => {
    u2(m2(g2, C2, D), h);
  }, "show"), showUrl: m2, list: o((g2, C2 = "push", h = {}) => {
    u2(y2(g2, h), C2);
  }, "list"), listUrl: y2, push: o((g2, ...C2) => {
    t === "legacy" ? s.push(g2, ...C2) : i2({ to: g2, type: "push" });
  }, "push"), replace: o((g2, ...C2) => {
    t === "legacy" ? s.replace(g2, ...C2) : i2({ to: g2, type: "replace" });
  }, "replace"), goBack: o(() => {
    t === "legacy" ? s.goBack() : a();
  }, "goBack") };
}, "useNavigation");
var nR = o(({ resource: e, id: t, meta: r, metaData: s, queryOptions: n, overtimeOptions: i2, ...a } = {}) => {
  let { resource: u2, identifier: c2, id: p3, setId: l2 } = qe({ id: t, resource: e }), y2 = ue()({ resource: u2, meta: I2(r, s) });
  (0, import_warn_once5.default)(!!e && !p3, Pu(c2, p3));
  let d3 = zt({ resource: c2, id: p3 ?? "", queryOptions: { enabled: p3 !== void 0, ...n }, meta: y2, metaData: y2, overtimeOptions: i2, ...a });
  return { queryResult: d3, query: d3, showId: p3, setShowId: l2, overtime: d3.overtime };
}, "useShow");
var Pu = o((e, t) => `[useShow]: resource: "${e}", id: ${t} 

If you don't use the \`setShowId\` method to set the \`showId\`, you should pass the \`id\` prop to \`useShow\`. Otherwise, \`useShow\` will not be able to infer the \`id\` from the current URL. 

See https://refine.dev/docs/data/hooks/use-show/#resource`, "idWarningMessage");
var mR = o(({ resourceName: e, resource: t, mapData: r = o((l2) => l2, "mapData"), paparseOptions: s, batchSize: n = Number.MAX_SAFE_INTEGER, onFinish: i2, meta: a, metaData: u2, onProgress: c2, dataProviderName: p3 } = {}) => {
  let [l2, m2] = (0, import_react49.useState)(0), [y2, d3] = (0, import_react49.useState)(0), [T3, x] = (0, import_react49.useState)(false), { resource: v, identifier: f2 } = q(t ?? e), P = ue(), M = bo(), Q = Xt(), g2 = P({ resource: v, meta: I2(a, u2) }), C2;
  n === 1 ? C2 = Q : C2 = M;
  let h = o(() => {
    d3(0), m2(0), x(false);
  }, "handleCleanup"), D = o((E2) => {
    let L2 = { succeeded: E2.filter((U) => U.type === "success"), errored: E2.filter((U) => U.type === "error") };
    i2 == null || i2(L2), x(false);
  }, "handleFinish");
  (0, import_react49.useEffect)(() => {
    c2 == null || c2({ totalAmount: y2, processedAmount: l2 });
  }, [y2, l2]);
  let k2 = o(({ file: E2 }) => (h(), new Promise((L2) => {
    x(true), import_papaparse2.default.parse(E2, { complete: async ({ data: U }) => {
      let w = sr(U, r);
      if (d3(w.length), n === 1) {
        let N = w.map((F) => o(async () => ({ response: await Q.mutateAsync({ resource: f2 ?? "", values: F, successNotification: false, errorNotification: false, dataProviderName: p3, meta: g2, metaData: g2 }), value: F }), "fn")), b = await gr(N, ({ response: F, value: V }) => (m2((G) => G + 1), { response: [F.data], type: "success", request: [V] }), (F, V) => ({ response: [F], type: "error", request: [w[V]] }));
        L2(b);
      } else {
        let N = chunk_default(w, n), b = N.map((V) => o(async () => ({ response: await M.mutateAsync({ resource: f2 ?? "", values: V, successNotification: false, errorNotification: false, dataProviderName: p3, meta: g2, metaData: g2 }), value: V, currentBatchLength: V.length }), "fn")), F = await gr(b, ({ response: V, currentBatchLength: G, value: W }) => (m2((K) => K + G), { response: V.data, type: "success", request: W }), (V, G) => ({ response: [V], type: "error", request: N[G] }));
        L2(F);
      }
    }, ...s });
  }).then((L2) => (D(L2), L2))), "handleChange");
  return { inputProps: { type: "file", accept: ".csv", onChange: (E2) => {
    E2.target.files && E2.target.files.length > 0 && k2({ file: E2.target.files[0] });
  } }, mutationResult: C2, isLoading: T3, handleChange: k2 };
}, "useImport");
var TR = o(({ defaultVisible: e = false } = {}) => {
  let [t, r] = (0, import_react50.useState)(e), s = (0, import_react50.useCallback)(() => r(true), [t]), n = (0, import_react50.useCallback)(() => r(false), [t]);
  return { visible: t, show: s, close: n };
}, "useModal");
var Du = o(({ resource: e, action: t, meta: r, legacy: s }) => Ut()({ resource: e, action: t, meta: r, legacy: s }), "useToPath");
var Mu = o((e, t) => {
  let r = (0, import_react51.useContext)(ft), s = r == null ? void 0 : r.Link, n = Pe(), i2 = "";
  return "go" in e && (r != null && r.go || (0, import_warn_once6.default)(true, "[Link]: `routerProvider` is not found. To use `go`, Please make sure that you have provided the `routerProvider` for `<Refine />` https://refine.dev/docs/routing/router-provider/ \n"), i2 = n({ ...e.go, type: "path" })), "to" in e && (i2 = e.to), s ? import_react51.default.createElement(s, { ref: t, ...e, to: i2, go: void 0 }) : import_react51.default.createElement("a", { ref: t, href: i2, ...e, to: void 0, go: void 0 });
}, "LinkComponent");
var Io = (0, import_react51.forwardRef)(Mu);
var yt = o(() => Io, "useLink");
var gt = { useHistory: () => false, useLocation: () => false, useParams: () => ({}), Prompt: () => null, Link: () => null };
var er = import_react53.default.createContext(gt);
var xn = o(({ children: e, useHistory: t, useLocation: r, useParams: s, Prompt: n, Link: i2, routes: a }) => import_react53.default.createElement(er.Provider, { value: { useHistory: t ?? gt.useHistory, useLocation: r ?? gt.useLocation, useParams: s ?? gt.useParams, Prompt: n ?? gt.Prompt, Link: i2 ?? gt.Link, routes: a ?? gt.routes } }, e), "LegacyRouterContextProvider");
var pe = o(() => {
  let e = (0, import_react52.useContext)(er), { useHistory: t, useLocation: r, useParams: s, Prompt: n, Link: i2, routes: a } = e ?? gt;
  return { useHistory: t, useLocation: r, useParams: s, Prompt: n, Link: i2, routes: a };
}, "useRouterContext");
var ct = import_react55.default.createContext({ options: { buttons: { enableAccessControl: true, hideIfUnauthorized: false } } });
var Pn = o(({ can: e, children: t, options: r }) => import_react55.default.createElement(ct.Provider, { value: { can: e, options: r ? { ...r, buttons: { enableAccessControl: true, hideIfUnauthorized: false, ...r.buttons } } : { buttons: { enableAccessControl: true, hideIfUnauthorized: false }, queryOptions: void 0 } } }, t), "AccessControlContextProvider");
var kt = o((e) => {
  if (!e) return;
  let { icon: t, list: r, edit: s, create: n, show: i2, clone: a, children: u2, meta: c2, options: p3, ...l2 } = e, { icon: m2, ...y2 } = c2 ?? {}, { icon: d3, ...T3 } = p3 ?? {};
  return { ...l2, ...c2 ? { meta: y2 } : {}, ...p3 ? { options: T3 } : {} };
}, "sanitizeResource");
var kr = o(({ action: e, resource: t, params: r, queryOptions: s }) => {
  let { can: n, options: i2 } = (0, import_react54.useContext)(ct), { keys: a, preferLegacyKeys: u2 } = Z(), { queryOptions: c2 } = i2 || {}, p3 = { ...c2, ...s }, { resource: l2, ...m2 } = r ?? {}, y2 = kt(l2), d3 = useQuery({ queryKey: a().access().resource(t).action(e).params({ params: { ...m2, resource: y2 }, enabled: p3 == null ? void 0 : p3.enabled }).get(u2), queryFn: () => (n == null ? void 0 : n({ action: e, resource: t, params: { ...m2, resource: y2 } })) ?? Promise.resolve({ can: true }), enabled: typeof n < "u", ...p3, meta: { ...p3 == null ? void 0 : p3.meta, ...k("useCan", u2, t, ["useButtonCanAccess", "useNavigationButton"]) }, retry: false });
  return typeof n > "u" ? { data: { can: true } } : d3;
}, "useCan");
var cC = o(() => {
  let { can: e } = import_react56.default.useContext(ct);
  return { can: import_react56.default.useMemo(() => e ? o(async ({ params: s, ...n }) => {
    let i2 = s != null && s.resource ? kt(s.resource) : void 0;
    return e({ ...n, ...s ? { params: { ...s, resource: i2 } } : {} });
  }, "canWithSanitizedResource") : void 0, [e]) };
}, "useCanWithoutCache");
var PC = o((e) => {
  let [t, r] = (0, import_react57.useState)([]), [s, n] = (0, import_react57.useState)([]), [i2, a] = (0, import_react57.useState)([]), { resource: u2, sort: c2, sorters: p3, filters: l2 = [], optionLabel: m2 = "title", optionValue: y2 = "id", searchField: d3 = typeof m2 == "string" ? m2 : "title", debounce: T3 = 300, successNotification: x, errorNotification: v, defaultValueQueryOptions: f2, queryOptions: P, fetchSize: M, pagination: Q, hasPagination: g2 = false, liveMode: C2, defaultValue: h = [], selectedOptionsOrder: D = "in-place", onLiveEvent: k2, onSearch: E2, liveParams: L2, meta: U, metaData: w, dataProviderName: N, overtimeOptions: b } = e, F = (0, import_react57.useCallback)((O) => typeof m2 == "string" ? get_default(O, m2) : m2(O), [m2]), V = (0, import_react57.useCallback)((O) => typeof y2 == "string" ? get_default(O, y2) : y2(O), [y2]), { resource: G, identifier: W } = q(u2), j = ue()({ resource: G, meta: I2(U, w) }), re = Array.isArray(h) ? h : [h], te = (0, import_react57.useCallback)((O) => {
    a(O.data.map((_2) => ({ label: F(_2), value: V(_2) })));
  }, [m2, y2]), R2 = f2 ?? P, S = go({ resource: W, ids: re, queryOptions: { ...R2, enabled: re.length > 0 && ((R2 == null ? void 0 : R2.enabled) ?? true), onSuccess: (O) => {
    var _2;
    te(O), (_2 = R2 == null ? void 0 : R2.onSuccess) == null || _2.call(R2, O);
  } }, overtimeOptions: { enabled: false }, meta: j, metaData: j, liveMode: "off", dataProviderName: N }), B = (0, import_react57.useCallback)((O) => {
    n(O.data.map((_2) => ({ label: F(_2), value: V(_2) })));
  }, [m2, y2]), H = $t({ resource: W, sorters: I2(p3, c2), filters: l2.concat(t), pagination: { current: Q == null ? void 0 : Q.current, pageSize: (Q == null ? void 0 : Q.pageSize) ?? M, mode: Q == null ? void 0 : Q.mode }, hasPagination: g2, queryOptions: { ...P, onSuccess: (O) => {
    var _2;
    B(O), (_2 = P == null ? void 0 : P.onSuccess) == null || _2.call(P, O);
  } }, overtimeOptions: { enabled: false }, successNotification: x, errorNotification: v, meta: j, metaData: j, liveMode: C2, liveParams: L2, onLiveEvent: k2, dataProviderName: N }), { elapsedTime: $ } = fe({ ...b, isLoading: H.isFetching || S.isFetching }), X = (0, import_react57.useMemo)(() => uniqBy_default(D === "in-place" ? [...s, ...i2] : [...i2, ...s], "value"), [s, i2]), ne = (0, import_react57.useRef)(E2), Y = (0, import_react57.useMemo)(() => debounce_default((O) => {
    if (ne.current) {
      r(ne.current(O));
      return;
    }
    if (!O) {
      r([]);
      return;
    }
    r([{ field: d3, operator: "contains", value: O }]);
  }, T3), [d3, T3]);
  return (0, import_react57.useEffect)(() => {
    ne.current = E2;
  }, [E2]), { queryResult: H, defaultValueQueryResult: S, query: H, defaultValueQuery: S, options: X, onSearch: Y, overtime: { elapsedTime: $ } };
}, "useSelect");
var Un = [];
var En = [];
function IC({ initialCurrent: e, initialPageSize: t, hasPagination: r = true, pagination: s, initialSorter: n, permanentSorter: i2 = En, defaultSetFilterBehavior: a, initialFilter: u2, permanentFilter: c2 = Un, filters: p3, sorters: l2, syncWithLocation: m2, resource: y2, successNotification: d3, errorNotification: T3, queryOptions: x, liveMode: v, onLiveEvent: f2, liveParams: P, meta: M, metaData: Q, dataProviderName: g2, overtimeOptions: C2 } = {}) {
  var Wo, Ho, $o, zo, _o;
  let { syncWithLocation: h } = to(), D = m2 ?? h, k2 = sn(v), E2 = oe(), { useLocation: L2 } = pe(), { search: U, pathname: w } = L2(), N = ue(), b = Te(), F = ((p3 == null ? void 0 : p3.mode) || "server") === "server", V = ((l2 == null ? void 0 : l2.mode) || "server") === "server", G = r === false ? "off" : "server", W = ((s == null ? void 0 : s.mode) ?? G) !== "off", K = I2(s == null ? void 0 : s.current, e), j = I2(s == null ? void 0 : s.pageSize, t), re = I2(M, Q), { parsedCurrent: te, parsedPageSize: R2, parsedSorter: S, parsedFilters: B } = vr(U ?? "?"), H = I2(p3 == null ? void 0 : p3.initial, u2), $ = I2(p3 == null ? void 0 : p3.permanent, c2) ?? Un, X = I2(l2 == null ? void 0 : l2.initial, n), ne = I2(l2 == null ? void 0 : l2.permanent, i2) ?? En, Y = I2(p3 == null ? void 0 : p3.defaultBehavior, a) ?? "merge", O, _2, ae, J;
  D ? (O = ((Wo = b == null ? void 0 : b.params) == null ? void 0 : Wo.current) || te || K || 1, _2 = ((Ho = b == null ? void 0 : b.params) == null ? void 0 : Ho.pageSize) || R2 || j || 10, ae = (($o = b == null ? void 0 : b.params) == null ? void 0 : $o.sorters) || (S.length ? S : X), J = ((zo = b == null ? void 0 : b.params) == null ? void 0 : zo.filters) || (B.length ? B : H)) : (O = K || 1, _2 = j || 10, ae = X, J = H);
  let { replace: we } = he(), ye = Pe(), { resource: Ve, identifier: Ne } = q(y2), se = N({ resource: Ve, meta: re });
  import_react58.default.useEffect(() => {
    (0, import_warn_once7.default)(typeof Ne > "u", "useTable: `resource` is not defined.");
  }, [Ne]);
  let [me, ce] = (0, import_react58.useState)(Lr(ne, ae ?? [])), [ve, rt] = (0, import_react58.useState)(Er($, J ?? [])), [Ke, Ct] = (0, import_react58.useState)(O), [Ge, Tt] = (0, import_react58.useState)(_2), xt = o(() => {
    if (E2 === "new") {
      let { sorters: jo, filters: Nc, pageSize: Bc, current: Kc, ...sa } = (b == null ? void 0 : b.params) ?? {};
      return sa;
    }
    let { sorter: Ie, filters: ot, pageSize: zr, current: _r, ...jr } = import_qs4.default.parse(U, { ignoreQueryPrefix: true });
    return jr;
  }, "getCurrentQueryParams"), bt = o(({ pagination: { current: Ie, pageSize: ot }, sorter: zr, filters: _r }) => {
    if (E2 === "new") return ye({ type: "path", options: { keepHash: true, keepQuery: true }, query: { ...W ? { current: Ie, pageSize: ot } : {}, sorters: zr, filters: _r, ...xt() } }) ?? "";
    let jr = import_qs4.default.parse(U == null ? void 0 : U.substring(1)), jo = Dr({ pagination: { pageSize: ot, current: Ie }, sorters: me ?? zr, filters: _r, ...jr });
    return `${w ?? ""}?${jo ?? ""}`;
  }, "createLinkForSyncWithLocation");
  (0, import_react58.useEffect)(() => {
    U === "" && (Ct(O), Tt(_2), ce(Lr(ne, ae ?? [])), rt(Er($, J ?? [])));
  }, [U]), (0, import_react58.useEffect)(() => {
    if (D) {
      let Ie = xt();
      if (E2 === "new") ye({ type: "replace", options: { keepQuery: true }, query: { ...W ? { pageSize: Ge, current: Ke } : {}, sorters: differenceWith_default(me, ne, isEqual_default), filters: differenceWith_default(ve, $, isEqual_default) } });
      else {
        let ot = Dr({ ...W ? { pagination: { pageSize: Ge, current: Ke } } : {}, sorters: differenceWith_default(me, ne, isEqual_default), filters: differenceWith_default(ve, $, isEqual_default), ...Ie });
        return we == null ? void 0 : we(`${w}?${ot}`, void 0, { shallow: true });
      }
    }
  }, [D, Ke, Ge, me, ve]);
  let or = $t({ resource: Ne, hasPagination: r, pagination: { current: Ke, pageSize: Ge, mode: s == null ? void 0 : s.mode }, filters: F ? St($, ve) : void 0, sorters: V ? Ur(ne, me) : void 0, queryOptions: x, overtimeOptions: C2, successNotification: d3, errorNotification: T3, meta: se, metaData: se, liveMode: k2, liveParams: P, onLiveEvent: f2, dataProviderName: g2 }), Bo = (0, import_react58.useCallback)((Ie) => {
    rt((ot) => St($, Ie, ot));
  }, [$]), Ko = (0, import_react58.useCallback)((Ie) => {
    rt(St($, Ie));
  }, [$]), Go = (0, import_react58.useCallback)((Ie) => {
    rt((ot) => St($, Ie(ot)));
  }, [$]), oa = (0, import_react58.useCallback)((Ie, ot = Y) => {
    typeof Ie == "function" ? Go(Ie) : ot === "replace" ? Ko(Ie) : Bo(Ie);
  }, [Go, Ko, Bo]), Oo = (0, import_react58.useCallback)((Ie) => {
    ce(() => Ur(ne, Ie));
  }, [ne]);
  return { tableQueryResult: or, tableQuery: or, sorters: me, setSorters: Oo, sorter: me, setSorter: Oo, filters: ve, setFilters: oa, current: Ke, setCurrent: Ct, pageSize: Ge, setPageSize: Tt, pageCount: Ge ? Math.ceil((((_o = or.data) == null ? void 0 : _o.total) ?? 0) / Ge) : 1, createLinkForSyncWithLocation: bt, overtime: or.overtime };
}
o(IC, "useTable");
var Et = import_react60.default.createContext({});
var Mn = o(({ create: e, get: t, update: r, children: s }) => import_react60.default.createElement(Et.Provider, { value: { create: e, get: t, update: r } }, s), "AuditLogContextProvider");
var Je = o(({ logMutationOptions: e, renameMutationOptions: t } = {}) => {
  let r = useQueryClient(), s = (0, import_react59.useContext)(Et), { keys: n, preferLegacyKeys: i2 } = Z(), a = ie(), { resources: u2 } = (0, import_react59.useContext)(Rt), { data: c2, refetch: p3, isLoading: l2 } = no({ v3LegacyAuthProviderCompatible: !!(a != null && a.isLegacy), queryOptions: { enabled: !!(s != null && s.create) } }), m2 = useMutation(async (d3) => {
    var f2, P, M, Q, g2;
    let T3 = Ee(d3.resource, u2), x = I2((f2 = T3 == null ? void 0 : T3.meta) == null ? void 0 : f2.audit, (P = T3 == null ? void 0 : T3.options) == null ? void 0 : P.audit, (Q = (M = T3 == null ? void 0 : T3.options) == null ? void 0 : M.auditLog) == null ? void 0 : Q.permissions);
    if (x && !Xr(x, d3.action)) return;
    let v;
    return l2 && (s != null && s.create) && (v = await p3()), await ((g2 = s.create) == null ? void 0 : g2.call(s, { ...d3, author: c2 ?? (v == null ? void 0 : v.data) }));
  }, { mutationKey: n().audit().action("log").get(), ...e, meta: { ...e == null ? void 0 : e.meta, ...k("useLog", i2) } }), y2 = useMutation(async (d3) => {
    var T3;
    return await ((T3 = s.update) == null ? void 0 : T3.call(s, d3));
  }, { onSuccess: (d3) => {
    d3 != null && d3.resource && r.invalidateQueries(n().audit().resource((d3 == null ? void 0 : d3.resource) ?? "").action("list").get(i2));
  }, mutationKey: n().audit().action("rename").get(), ...t, meta: { ...t == null ? void 0 : t.meta, ...k("useLog", i2) } });
  return { log: m2, rename: y2 };
}, "useLog");
var eb = o(({ resource: e, action: t, meta: r, author: s, metaData: n, queryOptions: i2 }) => {
  let { get: a } = (0, import_react61.useContext)(Et), { keys: u2, preferLegacyKeys: c2 } = Z();
  return useQuery({ queryKey: u2().audit().resource(e).action("list").params(r).get(c2), queryFn: () => (a == null ? void 0 : a({ resource: e, action: t, author: s, meta: r, metaData: n })) ?? Promise.resolve([]), enabled: typeof a < "u", ...i2, retry: false, meta: { ...i2 == null ? void 0 : i2.meta, ...k("useLogList", c2, e) } });
}, "useLogList");
var fb = o(({ meta: e = {} } = {}) => {
  let t = oe(), { i18nProvider: r } = (0, import_react62.useContext)(Xe), s = Te(), n = z(), { resources: i2, resource: a, action: u2 } = q(), { options: { textTransformers: c2 } } = ge(), p3 = [];
  if (!(a != null && a.name)) return { breadcrumbs: p3 };
  let l2 = o((m2) => {
    var d3, T3, x, v, f2, P;
    let y2 = typeof m2 == "string" ? Ee(m2, i2, t === "legacy") ?? { name: m2 } : m2;
    if (y2) {
      let M = I2((d3 = y2 == null ? void 0 : y2.meta) == null ? void 0 : d3.parent, y2 == null ? void 0 : y2.parentName);
      M && l2(M);
      let Q = Se(y2, i2, t === "legacy").find((h) => h.action === "list"), g2 = (T3 = Q == null ? void 0 : Q.resource) != null && T3.list ? Q == null ? void 0 : Q.route : void 0, C2 = g2 ? t === "legacy" ? g2 : We(g2, y2 == null ? void 0 : y2.meta, s, e) : void 0;
      p3.push({ label: I2((x = y2.meta) == null ? void 0 : x.label, (v = y2.options) == null ? void 0 : v.label) ?? n(`${y2.name}.${y2.name}`, c2.humanize(y2.name)), href: C2, icon: I2((f2 = y2.meta) == null ? void 0 : f2.icon, (P = y2.options) == null ? void 0 : P.icon, y2.icon) });
    }
  }, "addBreadcrumb");
  if (l2(a), u2 && u2 !== "list") {
    let m2 = `actions.${u2}`, y2 = n(m2);
    typeof r < "u" && y2 === m2 ? ((0, import_warn_once8.default)(true, `[useBreadcrumb]: Breadcrumb missing translate key for the "${u2}" action. Please add "actions.${u2}" key to your translation file.
For more information, see https://refine.dev/docs/api-reference/core/hooks/useBreadcrumb/#i18n-support`), p3.push({ label: n(`buttons.${u2}`, c2.humanize(u2)) })) : p3.push({ label: n(m2, c2.humanize(u2)) });
  }
  return { breadcrumbs: p3 };
}, "useBreadcrumb");
var Ft = o((e, t, r = false) => {
  let s = [], n = ze(e, t);
  for (; n; ) s.push(n), n = ze(n, t);
  return s.reverse(), `/${[...s, e].map((a) => ke((r ? a.route : void 0) ?? a.identifier ?? a.name)).join("/").replace(/^\//, "")}`;
}, "createResourceKey");
var An = o((e, t = false) => {
  let r = { item: { name: "__root__" }, children: {} };
  e.forEach((n) => {
    let i2 = [], a = ze(n, e);
    for (; a; ) i2.push(a), a = ze(a, e);
    i2.reverse();
    let u2 = r;
    i2.forEach((p3) => {
      let l2 = (t ? p3.route : void 0) ?? p3.identifier ?? p3.name;
      u2.children[l2] || (u2.children[l2] = { item: p3, children: {} }), u2 = u2.children[l2];
    });
    let c2 = (t ? n.route : void 0) ?? n.identifier ?? n.name;
    u2.children[c2] || (u2.children[c2] = { item: n, children: {} });
  });
  let s = o((n) => {
    let i2 = [];
    return Object.keys(n.children).forEach((a) => {
      let u2 = Ft(n.children[a].item, e, t), c2 = { ...n.children[a].item, key: u2, children: s(n.children[a]) };
      i2.push(c2);
    }), i2;
  }, "flatten");
  return s(r);
}, "createTree");
var kn = o((e) => e.split("?")[0].split("#")[0].replace(/(.+)(\/$)/, "$1"), "getCleanPath");
var zu = o(({ meta: e, hideOnMissingParameter: t = true } = { hideOnMissingParameter: true }) => {
  let r = z(), s = Ut(), n = oe(), { resource: i2, resources: a } = q(), { pathname: u2 } = Te(), { useLocation: c2 } = pe(), { pathname: p3 } = c2(), l2 = ht(), y2 = `/${((n === "legacy" ? kn(p3) : u2 ? kn(u2) : void 0) ?? "").replace(/^\//, "")}`, d3 = i2 ? Ft(i2, a, n === "legacy") : y2 ?? "", T3 = import_react63.default.useMemo(() => {
    if (!i2) return [];
    let f2 = ze(i2, a), P = [Ft(i2, a)];
    for (; f2; ) P.push(Ft(f2, a)), f2 = ze(f2, a);
    return P;
  }, []), x = import_react63.default.useCallback((f2) => {
    var M, Q, g2, C2, h, D;
    if (I2((M = f2 == null ? void 0 : f2.meta) == null ? void 0 : M.hide, (Q = f2 == null ? void 0 : f2.options) == null ? void 0 : Q.hide) || !(f2 != null && f2.list) && f2.children.length === 0) return;
    let P = f2.list ? s({ resource: f2, action: "list", legacy: n === "legacy", meta: e }) : void 0;
    if (!(t && P && P.match(/(\/|^):(.+?)(\/|$){1}/))) return { ...f2, route: P, icon: I2((g2 = f2.meta) == null ? void 0 : g2.icon, (C2 = f2.options) == null ? void 0 : C2.icon, f2.icon), label: I2((h = f2 == null ? void 0 : f2.meta) == null ? void 0 : h.label, (D = f2 == null ? void 0 : f2.options) == null ? void 0 : D.label) ?? r(`${f2.name}.${f2.name}`, l2(f2.name, "plural")) };
  }, [n, e, s, r, t]), v = import_react63.default.useMemo(() => {
    let f2 = An(a, n === "legacy"), P = o((M) => M.flatMap((Q) => {
      let g2 = P(Q.children), C2 = x({ ...Q, children: g2 });
      return C2 ? [C2] : [];
    }), "prepare");
    return P(f2);
  }, [a, n, x]);
  return { defaultOpenKeys: T3, selectedKey: d3, menuItems: v };
}, "useMenu");
var ko = (0, import_react64.createContext)({});
var Zu = o(({ children: e, value: t }) => {
  let r = Br(), s = (0, import_react64.useMemo)(() => ({ ...r, ...t }), [r, t]);
  return import_react64.default.createElement(ko.Provider, { value: s }, e);
}, "MetaContextProvider");
var Br = o(() => {
  if (!(0, import_react64.useContext)(ko)) throw new Error("useMetaContext must be used within a MetaContextProvider");
  return (0, import_react64.useContext)(ko);
}, "useMetaContext");
var ue = o(() => {
  let { params: e } = Te(), t = Br();
  return o(({ resource: s, meta: n } = {}) => {
    let { meta: i2 } = kt(s) ?? { meta: {} }, { filters: a, sorters: u2, current: c2, pageSize: p3, ...l2 } = e ?? {}, m2 = { ...i2, ...l2, ...n };
    return t != null && t.tenantId && (m2.tenantId = t.tenantId), m2;
  }, "getMetaFn");
}, "useMeta");
var At = o(() => {
  let { options: e } = import_react65.default.useContext(Qe);
  return e;
}, "useRefineOptions");
var Qn = o((e) => {
  let t = oe(), { useParams: r } = pe(), s = Te(), n = r(), i2 = t === "legacy" ? n.id : s.id;
  return e ?? i2;
}, "useId");
var Vn = o((e) => {
  let t = oe(), { useParams: r } = pe(), s = Te(), n = r(), i2 = t === "legacy" ? n.action : s.action;
  return e ?? i2;
}, "useAction");
function qe(e) {
  let { select: t, identifier: r } = q(), s = (e == null ? void 0 : e.resource) ?? r, { identifier: n = void 0, resource: i2 = void 0 } = s ? t(s, true) : {}, a = r === n, u2 = Qn(), c2 = Vn(e == null ? void 0 : e.action), p3 = import_react66.default.useMemo(() => a ? (e == null ? void 0 : e.id) ?? u2 : e == null ? void 0 : e.id, [a, e == null ? void 0 : e.id, u2]), [l2, m2] = import_react66.default.useState(p3);
  import_react66.default.useMemo(() => m2(p3), [p3]);
  let y2 = import_react66.default.useMemo(() => !a && !(e != null && e.action) ? "create" : c2 === "edit" || c2 === "clone" ? c2 : "create", [c2, a, e == null ? void 0 : e.action]);
  return { id: l2, setId: m2, resource: i2, action: c2, identifier: n, formAction: y2 };
}
o(qe, "useResourceParams");
function Gr({ type: e }) {
  let t = z(), { textTransformers: { humanize: r } } = At(), s = `buttons.${e}`, n = r(e);
  return { label: t(s, n) };
}
o(Gr, "useActionableButton");
var Or = o((e) => {
  var p3, l2, m2;
  let t = z(), r = import_react68.default.useContext(ct), s = ((p3 = e.accessControl) == null ? void 0 : p3.enabled) ?? r.options.buttons.enableAccessControl, n = ((l2 = e.accessControl) == null ? void 0 : l2.hideIfUnauthorized) ?? r.options.buttons.hideIfUnauthorized, { data: i2 } = kr({ resource: (m2 = e.resource) == null ? void 0 : m2.name, action: e.action === "clone" ? "create" : e.action, params: { id: e.id, resource: e.resource }, queryOptions: { enabled: s } }), a = import_react68.default.useMemo(() => i2 != null && i2.can ? "" : i2 != null && i2.reason ? i2.reason : t("buttons.notAccessTitle", "You don't have permission to access"), [i2 == null ? void 0 : i2.can, i2 == null ? void 0 : i2.reason, t]), u2 = s && n && !(i2 != null && i2.can), c2 = (i2 == null ? void 0 : i2.can) === false;
  return { title: a, hidden: u2, disabled: c2, canAccess: i2 };
}, "useButtonCanAccess");
function Qt(e) {
  var P;
  let t = he(), r = oe(), s = yt(), { Link: n } = pe(), i2 = z(), a = ht(), { textTransformers: { humanize: u2 } } = At(), { id: c2, resource: p3, identifier: l2 } = qe({ resource: e.resource, id: e.action === "create" ? void 0 : e.id }), { canAccess: m2, title: y2, hidden: d3, disabled: T3 } = Or({ action: e.action, accessControl: e.accessControl, id: c2, resource: p3 }), x = r === "legacy" ? n : s, v = import_react67.default.useMemo(() => {
    if (!p3) return "";
    switch (e.action) {
      case "create":
      case "list":
        return t[`${e.action}Url`](p3, e.meta);
      default:
        return c2 ? t[`${e.action}Url`](p3, c2, e.meta) : "";
    }
  }, [p3, c2, e.meta, t[`${e.action}Url`]]), f2 = e.action === "list" ? i2(`${l2 ?? e.resource}.titles.list`, a(((P = p3 == null ? void 0 : p3.meta) == null ? void 0 : P.label) ?? (p3 == null ? void 0 : p3.label) ?? l2 ?? e.resource, "plural")) : i2(`buttons.${e.action}`, u2(e.action));
  return { to: v, label: f2, title: y2, disabled: T3, hidden: d3, canAccess: m2, LinkComponent: x };
}
o(Qt, "useNavigationButton");
function qu(e) {
  let t = z(), { mutate: r, isLoading: s, variables: n } = Po(), { setWarnWhen: i2 } = vt(), { mutationMode: a } = _e(e.mutationMode), { id: u2, resource: c2, identifier: p3 } = qe({ resource: e.resource, id: e.id }), { title: l2, disabled: m2, hidden: y2, canAccess: d3 } = Or({ action: "delete", accessControl: e.accessControl, id: u2, resource: c2 }), T3 = t("buttons.delete", "Delete"), x = t("buttons.delete", "Delete"), v = t("buttons.confirm", "Are you sure?"), f2 = t("buttons.cancel", "Cancel"), P = u2 === (n == null ? void 0 : n.id) && s;
  return { label: T3, title: l2, hidden: y2, disabled: m2, canAccess: d3, loading: P, confirmOkLabel: x, cancelLabel: f2, confirmTitle: v, onConfirm: o(() => {
    u2 && p3 && (i2(false), r({ id: u2, resource: p3, mutationMode: a, successNotification: e.successNotification, errorNotification: e.errorNotification, meta: e.meta, metaData: e.meta, dataProviderName: e.dataProviderName, invalidates: e.invalidates }, { onSuccess: e.onSuccess }));
  }, "onConfirm") };
}
o(qu, "useDeleteButton");
function tc(e) {
  let t = z(), { keys: r, preferLegacyKeys: s } = Z(), n = useQueryClient(), i2 = Ae(), { identifier: a, id: u2 } = qe({ resource: e.resource, id: e.id }), { resources: c2 } = q(), p3 = !!n.isFetching({ queryKey: r().data(ee(a, e.dataProviderName, c2)).resource(a).action("one").get(s) }), l2 = o(() => {
    i2({ id: u2, invalidates: ["detail"], dataProviderName: e.dataProviderName, resource: a });
  }, "onClick"), m2 = t("buttons.refresh", "Refresh");
  return { onClick: l2, label: m2, loading: p3 };
}
o(tc, "useRefreshButton");
var Zv = o((e) => Qt({ ...e, action: "show" }), "useShowButton");
var Yv = o((e) => Qt({ ...e, action: "edit" }), "useEditButton");
var Jv = o((e) => Qt({ ...e, action: "clone" }), "useCloneButton");
var qv = o((e) => Qt({ ...e, action: "create" }), "useCreateButton");
var eD = o((e) => Qt({ ...e, action: "list" }), "useListButton");
var tD = o(() => Gr({ type: "save" }), "useSaveButton");
var rD = o(() => Gr({ type: "export" }), "useExportButton");
var oD = o(() => Gr({ type: "import" }), "useImportButton");
var sc = o(() => {
  let [e, t] = (0, import_react3.useState)(), r = z(), { push: s } = he(), n = Pe(), i2 = oe(), { resource: a, action: u2 } = q();
  return (0, import_react3.useEffect)(() => {
    a && u2 && t(r("pages.error.info", { action: u2, resource: a.name }, `You may have forgotten to add the "${u2}" component to "${a.name}" resource.`));
  }, [a, u2]), import_react3.default.createElement(import_react3.default.Fragment, null, import_react3.default.createElement("h1", null, r("pages.error.404", void 0, "Sorry, the page you visited does not exist.")), e && import_react3.default.createElement("p", null, e), import_react3.default.createElement("button", { onClick: () => {
    i2 === "legacy" ? s("/") : n({ to: "/" });
  } }, r("pages.error.backHome", void 0, "Back Home")));
}, "ErrorComponent");
var Yr = o(() => {
  let [e, t] = (0, import_react69.useState)(""), [r, s] = (0, import_react69.useState)(""), n = z(), i2 = ie(), { mutate: a } = Ht({ v3LegacyAuthProviderCompatible: !!(i2 != null && i2.isLegacy) });
  return import_react69.default.createElement(import_react69.default.Fragment, null, import_react69.default.createElement("h1", null, n("pages.login.title", "Sign in your account")), import_react69.default.createElement("form", { onSubmit: (u2) => {
    u2.preventDefault(), a({ username: e, password: r });
  } }, import_react69.default.createElement("table", null, import_react69.default.createElement("tbody", null, import_react69.default.createElement("tr", null, import_react69.default.createElement("td", null, n("pages.login.username", void 0, "username"), ":"), import_react69.default.createElement("td", null, import_react69.default.createElement("input", { type: "text", size: 20, autoCorrect: "off", spellCheck: false, autoCapitalize: "off", autoFocus: true, required: true, value: e, onChange: (u2) => t(u2.target.value) }))), import_react69.default.createElement("tr", null, import_react69.default.createElement("td", null, n("pages.login.password", void 0, "password"), ":"), import_react69.default.createElement("td", null, import_react69.default.createElement("input", { type: "password", required: true, size: 20, value: r, onChange: (u2) => s(u2.target.value) }))))), import_react69.default.createElement("br", null), import_react69.default.createElement("input", { type: "submit", value: "login" })));
}, "LoginPage");
var Kn = o(({ providers: e, registerLink: t, forgotPasswordLink: r, rememberMe: s, contentProps: n, wrapperProps: i2, renderContent: a, formProps: u2, title: c2 = void 0, hideForm: p3, mutationVariables: l2 }) => {
  let m2 = oe(), y2 = yt(), { Link: d3 } = pe(), T3 = m2 === "legacy" ? d3 : y2, [x, v] = (0, import_react71.useState)(""), [f2, P] = (0, import_react71.useState)(""), [M, Q] = (0, import_react71.useState)(false), g2 = z(), C2 = ie(), { mutate: h } = Ht({ v3LegacyAuthProviderCompatible: !!(C2 != null && C2.isLegacy) }), D = o((L2, U) => import_react71.default.createElement(T3, { to: L2 }, U), "renderLink"), k2 = o(() => e ? e.map((L2) => import_react71.default.createElement("div", { key: L2.name, style: { display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" } }, import_react71.default.createElement("button", { onClick: () => h({ ...l2, providerName: L2.name }), style: { display: "flex", alignItems: "center" } }, L2 == null ? void 0 : L2.icon, L2.label ?? import_react71.default.createElement("label", null, L2.label)))) : null, "renderProviders"), E2 = import_react71.default.createElement("div", { ...n }, import_react71.default.createElement("h1", { style: { textAlign: "center" } }, g2("pages.login.title", "Sign in to your account")), k2(), !p3 && import_react71.default.createElement(import_react71.default.Fragment, null, import_react71.default.createElement("hr", null), import_react71.default.createElement("form", { onSubmit: (L2) => {
    L2.preventDefault(), h({ ...l2, email: x, password: f2, remember: M });
  }, ...u2 }, import_react71.default.createElement("div", { style: { display: "flex", flexDirection: "column", padding: 25 } }, import_react71.default.createElement("label", { htmlFor: "email-input" }, g2("pages.login.fields.email", "Email")), import_react71.default.createElement("input", { id: "email-input", name: "email", type: "text", size: 20, autoCorrect: "off", spellCheck: false, autoCapitalize: "off", required: true, value: x, onChange: (L2) => v(L2.target.value) }), import_react71.default.createElement("label", { htmlFor: "password-input" }, g2("pages.login.fields.password", "Password")), import_react71.default.createElement("input", { id: "password-input", type: "password", name: "password", required: true, size: 20, value: f2, onChange: (L2) => P(L2.target.value) }), s ?? import_react71.default.createElement(import_react71.default.Fragment, null, import_react71.default.createElement("label", { htmlFor: "remember-me-input" }, g2("pages.login.buttons.rememberMe", "Remember me"), import_react71.default.createElement("input", { id: "remember-me-input", name: "remember", type: "checkbox", size: 20, checked: M, value: M.toString(), onChange: () => {
    Q(!M);
  } }))), import_react71.default.createElement("br", null), r ?? D("/forgot-password", g2("pages.login.buttons.forgotPassword", "Forgot password?")), import_react71.default.createElement("input", { type: "submit", value: g2("pages.login.signin", "Sign in") }), t ?? import_react71.default.createElement("span", null, g2("pages.login.buttons.noAccount", "Don’t have an account?"), " ", D("/register", g2("pages.login.register", "Sign up")))))), t !== false && p3 && import_react71.default.createElement("div", { style: { textAlign: "center" } }, g2("pages.login.buttons.noAccount", "Don’t have an account?"), " ", D("/register", g2("pages.login.register", "Sign up"))));
  return import_react71.default.createElement("div", { ...i2 }, a ? a(E2, c2) : E2);
}, "LoginPage");
var On = o(({ providers: e, loginLink: t, wrapperProps: r, contentProps: s, renderContent: n, formProps: i2, title: a = void 0, hideForm: u2, mutationVariables: c2 }) => {
  let p3 = oe(), l2 = yt(), { Link: m2 } = pe(), y2 = p3 === "legacy" ? m2 : l2, [d3, T3] = (0, import_react72.useState)(""), [x, v] = (0, import_react72.useState)(""), f2 = z(), P = ie(), { mutate: M, isLoading: Q } = co({ v3LegacyAuthProviderCompatible: !!(P != null && P.isLegacy) }), g2 = o((D, k2) => import_react72.default.createElement(y2, { to: D }, k2), "renderLink"), C2 = o(() => e ? e.map((D) => import_react72.default.createElement("div", { key: D.name, style: { display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" } }, import_react72.default.createElement("button", { onClick: () => M({ ...c2, providerName: D.name }), style: { display: "flex", alignItems: "center" } }, D == null ? void 0 : D.icon, D.label ?? import_react72.default.createElement("label", null, D.label)))) : null, "renderProviders"), h = import_react72.default.createElement("div", { ...s }, import_react72.default.createElement("h1", { style: { textAlign: "center" } }, f2("pages.register.title", "Sign up for your account")), C2(), !u2 && import_react72.default.createElement(import_react72.default.Fragment, null, import_react72.default.createElement("hr", null), import_react72.default.createElement("form", { onSubmit: (D) => {
    D.preventDefault(), M({ ...c2, email: d3, password: x });
  }, ...i2 }, import_react72.default.createElement("div", { style: { display: "flex", flexDirection: "column", padding: 25 } }, import_react72.default.createElement("label", { htmlFor: "email-input" }, f2("pages.register.fields.email", "Email")), import_react72.default.createElement("input", { id: "email-input", name: "email", type: "email", size: 20, autoCorrect: "off", spellCheck: false, autoCapitalize: "off", required: true, value: d3, onChange: (D) => T3(D.target.value) }), import_react72.default.createElement("label", { htmlFor: "password-input" }, f2("pages.register.fields.password", "Password")), import_react72.default.createElement("input", { id: "password-input", name: "password", type: "password", required: true, size: 20, value: x, onChange: (D) => v(D.target.value) }), import_react72.default.createElement("input", { type: "submit", value: f2("pages.register.buttons.submit", "Sign up"), disabled: Q }), t ?? import_react72.default.createElement(import_react72.default.Fragment, null, import_react72.default.createElement("span", null, f2("pages.login.buttons.haveAccount", "Have an account?"), " ", g2("/login", f2("pages.login.signin", "Sign in"))))))), t !== false && u2 && import_react72.default.createElement("div", { style: { textAlign: "center" } }, f2("pages.login.buttons.haveAccount", "Have an account?"), " ", g2("/login", f2("pages.login.signin", "Sign in"))));
  return import_react72.default.createElement("div", { ...r }, n ? n(h, a) : h);
}, "RegisterPage");
var Wn = o(({ loginLink: e, wrapperProps: t, contentProps: r, renderContent: s, formProps: n, title: i2 = void 0, mutationVariables: a }) => {
  let u2 = z(), c2 = oe(), p3 = yt(), { Link: l2 } = pe(), m2 = c2 === "legacy" ? l2 : p3, [y2, d3] = (0, import_react73.useState)(""), { mutate: T3, isLoading: x } = lo(), v = o((P, M) => import_react73.default.createElement(m2, { to: P }, M), "renderLink"), f2 = import_react73.default.createElement("div", { ...r }, import_react73.default.createElement("h1", { style: { textAlign: "center" } }, u2("pages.forgotPassword.title", "Forgot your password?")), import_react73.default.createElement("hr", null), import_react73.default.createElement("form", { onSubmit: (P) => {
    P.preventDefault(), T3({ ...a, email: y2 });
  }, ...n }, import_react73.default.createElement("div", { style: { display: "flex", flexDirection: "column", padding: 25 } }, import_react73.default.createElement("label", { htmlFor: "email-input" }, u2("pages.forgotPassword.fields.email", "Email")), import_react73.default.createElement("input", { id: "email-input", name: "email", type: "mail", autoCorrect: "off", spellCheck: false, autoCapitalize: "off", required: true, value: y2, onChange: (P) => d3(P.target.value) }), import_react73.default.createElement("input", { type: "submit", disabled: x, value: u2("pages.forgotPassword.buttons.submit", "Send reset instructions") }), import_react73.default.createElement("br", null), e ?? import_react73.default.createElement("span", null, u2("pages.register.buttons.haveAccount", "Have an account? "), " ", v("/login", u2("pages.login.signin", "Sign in"))))));
  return import_react73.default.createElement("div", { ...t }, s ? s(f2, i2) : f2);
}, "ForgotPasswordPage");
var $n = o(({ wrapperProps: e, contentProps: t, renderContent: r, formProps: s, title: n = void 0, mutationVariables: i2 }) => {
  let a = z(), u2 = ie(), { mutate: c2, isLoading: p3 } = fo({ v3LegacyAuthProviderCompatible: !!(u2 != null && u2.isLegacy) }), [l2, m2] = (0, import_react74.useState)(""), [y2, d3] = (0, import_react74.useState)(""), T3 = import_react74.default.createElement("div", { ...t }, import_react74.default.createElement("h1", { style: { textAlign: "center" } }, a("pages.updatePassword.title", "Update Password")), import_react74.default.createElement("hr", null), import_react74.default.createElement("form", { onSubmit: (x) => {
    x.preventDefault(), c2({ ...i2, password: l2, confirmPassword: y2 });
  }, ...s }, import_react74.default.createElement("div", { style: { display: "flex", flexDirection: "column", padding: 25 } }, import_react74.default.createElement("label", { htmlFor: "password-input" }, a("pages.updatePassword.fields.password", "New Password")), import_react74.default.createElement("input", { id: "password-input", name: "password", type: "password", required: true, size: 20, value: l2, onChange: (x) => m2(x.target.value) }), import_react74.default.createElement("label", { htmlFor: "confirm-password-input" }, a("pages.updatePassword.fields.confirmPassword", "Confirm New Password")), import_react74.default.createElement("input", { id: "confirm-password-input", name: "confirmPassword", type: "password", required: true, size: 20, value: y2, onChange: (x) => d3(x.target.value) }), import_react74.default.createElement("input", { type: "submit", disabled: p3, value: a("pages.updatePassword.buttons.submit", "Update") }))));
  return import_react74.default.createElement("div", { ...e }, r ? r(T3, n) : T3);
}, "UpdatePasswordPage");
var ac = o((e) => {
  let { type: t } = e;
  return import_react70.default.createElement(import_react70.default.Fragment, null, o(() => {
    switch (t) {
      case "register":
        return import_react70.default.createElement(On, { ...e });
      case "forgotPassword":
        return import_react70.default.createElement(Wn, { ...e });
      case "updatePassword":
        return import_react70.default.createElement($n, { ...e });
      default:
        return import_react70.default.createElement(Kn, { ...e });
    }
  }, "renderView")());
}, "AuthPage");
var Qo = o(() => import_react75.default.createElement(import_react75.default.Fragment, null, import_react75.default.createElement("h1", null, "Welcome on board"), import_react75.default.createElement("p", null, "Your configuration is completed."), import_react75.default.createElement("p", null, "Now you can get started by adding your resources to the", " ", import_react75.default.createElement("code", null, "`resources`"), " property of ", import_react75.default.createElement("code", null, "`<Refine>`")), import_react75.default.createElement("div", { style: { display: "flex", gap: 8 } }, import_react75.default.createElement("a", { href: "https://refine.dev", target: "_blank", rel: "noreferrer" }, import_react75.default.createElement("button", null, "Documentation")), import_react75.default.createElement("a", { href: "https://refine.dev/examples", target: "_blank", rel: "noreferrer" }, import_react75.default.createElement("button", null, "Examples")), import_react75.default.createElement("a", { href: "https://discord.gg/refine", target: "_blank", rel: "noreferrer" }, import_react75.default.createElement("button", null, "Community")))), "ReadyPage");
var uc = [{ title: "Documentation", description: "Learn about the technical details of using Refine in your projects.", link: "https://refine.dev/docs", iconUrl: "https://refine.ams3.cdn.digitaloceanspaces.com/welcome-page/book.svg" }, { title: "Tutorial", description: "Learn how to use Refine by building a fully-functioning CRUD app, from scratch to full launch.", link: "https://refine.dev/tutorial", iconUrl: "https://refine.ams3.cdn.digitaloceanspaces.com/welcome-page/hat.svg" }, { title: "Templates", description: "Explore a range of pre-built templates, perfect everything from admin panels to dashboards and CRMs.", link: "https://refine.dev/templates", iconUrl: "https://refine.ams3.cdn.digitaloceanspaces.com/welcome-page/application.svg" }, { title: "Community", description: "Join our Discord community and keep up with the latest news.", link: "https://discord.gg/refine", iconUrl: "https://refine.ams3.cdn.digitaloceanspaces.com/welcome-page/discord.svg" }];
var zn = o(() => {
  let e = Pr("(max-width: 1010px)"), t = Pr("(max-width: 650px)"), r = o(() => t ? "1, 280px" : e ? "2, 280px" : "4, 1fr", "getGridTemplateColumns"), s = o(() => t ? "32px" : e ? "40px" : "48px", "getHeaderFontSize"), n = o(() => t ? "16px" : e ? "20px" : "24px", "getSubHeaderFontSize");
  return import_react77.default.createElement("div", { style: { position: "fixed", zIndex: 10, inset: 0, overflow: "auto", width: "100dvw", height: "100dvh" } }, import_react77.default.createElement("div", { style: { overflow: "hidden", position: "relative", backgroundSize: "cover", backgroundRepeat: "no-repeat", background: t ? "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp), radial-gradient(88.89% 50% at 50% 100%, rgba(38, 217, 127, 0.10) 0%, rgba(38, 217, 127, 0.00) 100%), radial-gradient(88.89% 50% at 50% 0%, rgba(71, 235, 235, 0.15) 0%, rgba(71, 235, 235, 0.00) 100%), #1D1E30" : e ? "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp), radial-gradient(66.67% 50% at 50% 100%, rgba(38, 217, 127, 0.10) 0%, rgba(38, 217, 127, 0.00) 100%), radial-gradient(66.67% 50% at 50% 0%, rgba(71, 235, 235, 0.15) 0%, rgba(71, 235, 235, 0.00) 100%), #1D1E30" : "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp), radial-gradient(35.56% 50% at 50% 100%, rgba(38, 217, 127, 0.12) 0%, rgba(38, 217, 127, 0) 100%), radial-gradient(35.56% 50% at 50% 0%, rgba(71, 235, 235, 0.18) 0%, rgba(71, 235, 235, 0) 100%), #1D1E30", minHeight: "100%", minWidth: "100%", fontFamily: "Arial", color: "#FFFFFF" } }, import_react77.default.createElement("div", { style: { zIndex: 2, position: "absolute", width: t ? "400px" : "800px", height: "552px", opacity: "0.5", background: "url(https://refine.ams3.cdn.digitaloceanspaces.com/assets/welcome-page-hexagon.png)", backgroundRepeat: "no-repeat", backgroundSize: "contain", top: "0", left: "50%", transform: "translateX(-50%)" } }), import_react77.default.createElement("div", { style: { height: t ? "40px" : "80px" } }), import_react77.default.createElement("div", { style: { display: "flex", justifyContent: "center" } }, import_react77.default.createElement("div", { style: { backgroundRepeat: "no-repeat", backgroundSize: t ? "112px 58px" : "224px 116px", backgroundImage: "url(https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-logo.svg)", width: t ? 112 : 224, height: t ? 58 : 116 } })), import_react77.default.createElement("div", { style: { height: t ? "120px" : e ? "200px" : "30vh", minHeight: t ? "120px" : "200px" } }), import_react77.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "16px", textAlign: "center" } }, import_react77.default.createElement("h1", { style: { fontSize: s(), fontWeight: 700, margin: "0px" } }, "Welcome Aboard!"), import_react77.default.createElement("h4", { style: { fontSize: n(), fontWeight: 400, margin: "0px" } }, "Your configuration is completed.")), import_react77.default.createElement("div", { style: { height: "64px" } }), import_react77.default.createElement("div", { style: { display: "grid", gridTemplateColumns: `repeat(${r()})`, justifyContent: "center", gap: "48px", paddingRight: "16px", paddingLeft: "16px", paddingBottom: "32px", maxWidth: "976px", margin: "auto" } }, uc.map((i2) => import_react77.default.createElement(cc, { key: `welcome-page-${i2.title}`, card: i2 })))));
}, "ConfigSuccessPage");
var cc = o(({ card: e }) => {
  let { title: t, description: r, iconUrl: s, link: n } = e, [i2, a] = (0, import_react77.useState)(false);
  return import_react77.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "16px" } }, import_react77.default.createElement("div", { style: { display: "flex", alignItems: "center" } }, import_react77.default.createElement("a", { onPointerEnter: () => a(true), onPointerLeave: () => a(false), style: { display: "flex", alignItems: "center", color: "#fff", textDecoration: "none" }, href: n }, import_react77.default.createElement("div", { style: { width: "16px", height: "16px", backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundImage: `url(${s})` } }), import_react77.default.createElement("span", { style: { fontSize: "16px", fontWeight: 700, marginLeft: "13px", marginRight: "14px" } }, t), import_react77.default.createElement("svg", { style: { transition: "transform 0.5s ease-in-out, opacity 0.2s ease-in-out", ...i2 && { transform: "translateX(4px)", opacity: 1 } }, width: "12", height: "8", fill: "none", opacity: "0.5", xmlns: "http://www.w3.org/2000/svg" }, import_react77.default.createElement("path", { d: "M7.293.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L8.586 5H1a1 1 0 0 1 0-2h7.586L7.293 1.707a1 1 0 0 1 0-1.414Z", fill: "#fff" })))), import_react77.default.createElement("span", { style: { fontSize: "12px", opacity: 0.5, lineHeight: "16px" } }, r));
}, "Card");
var _n = o(() => import_react78.default.createElement("div", { style: { position: "fixed", zIndex: 11, inset: 0, overflow: "auto", width: "100dvw", height: "100dvh" } }, import_react78.default.createElement("div", { style: { width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "24px", background: "#14141FBF", backdropFilter: "blur(3px)" } }, import_react78.default.createElement("div", { style: { maxWidth: "640px", width: "100%", background: "#1D1E30", borderRadius: "16px", border: "1px solid #303450", boxShadow: "0px 0px 120px -24px #000000" } }, import_react78.default.createElement("div", { style: { padding: "16px 20px", borderBottom: "1px solid #303450", display: "flex", alignItems: "center", gap: "8px", position: "relative" } }, import_react78.default.createElement(dc, { style: { position: "absolute", left: 0, top: 0 } }), import_react78.default.createElement("div", { style: { lineHeight: "24px", fontSize: "16px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "16px" } }, import_react78.default.createElement(lc, null), import_react78.default.createElement("span", { style: { fontWeight: 400 } }, "Configuration Error"))), import_react78.default.createElement("div", { style: { padding: "20px", color: "#A3ADC2", lineHeight: "20px", fontSize: "14px", display: "flex", flexDirection: "column", gap: "20px" } }, import_react78.default.createElement("p", { style: { margin: 0, padding: 0, lineHeight: "28px", fontSize: "16px" } }, import_react78.default.createElement("code", { style: { display: "inline-block", background: "#30345080", padding: "0 4px", lineHeight: "24px", fontSize: "16px", borderRadius: "4px", color: "#FFFFFF" } }, "<Refine />"), " ", "is not initialized. Please make sure you have it mounted in your app and placed your components inside it."), import_react78.default.createElement("div", null, import_react78.default.createElement(pc, null)))))), "ConfigErrorPage");
var pc = o(() => import_react78.default.createElement("pre", { style: { display: "block", overflowX: "auto", borderRadius: "8px", fontSize: "14px", lineHeight: "24px", backgroundColor: "#14141F", color: "#E5ECF2", padding: "16px", margin: "0", maxHeight: "400px", overflow: "auto" } }, import_react78.default.createElement("span", { style: { color: "#FF7B72" } }, "import"), " ", "{", " Refine, WelcomePage", " ", "}", " ", import_react78.default.createElement("span", { style: { color: "#FF7B72" } }, "from"), " ", import_react78.default.createElement("span", { style: { color: "#A5D6FF" } }, '"@refinedev/core"'), ";", `
`, `
`, import_react78.default.createElement("span", { style: { color: "#FF7B72" } }, "export"), " ", import_react78.default.createElement("span", { style: { color: "#FF7B72" } }, "default"), " ", import_react78.default.createElement("span", null, import_react78.default.createElement("span", { style: { color: "#FF7B72" } }, "function"), " ", import_react78.default.createElement("span", { style: { color: "#FFA657" } }, "App"), "(", import_react78.default.createElement("span", { style: { color: "rgb(222, 147, 95)" } }), ")", " "), "{", `
`, "  ", import_react78.default.createElement("span", { style: { color: "#FF7B72" } }, "return"), " (", `
`, "    ", import_react78.default.createElement("span", null, import_react78.default.createElement("span", { style: { color: "#79C0FF" } }, "<", import_react78.default.createElement("span", { style: { color: "#79C0FF" } }, "Refine"), `
`, "      ", import_react78.default.createElement("span", { style: { color: "#E5ECF2", opacity: 0.6 } }, "// ", import_react78.default.createElement("span", null, "...")), `
`, "    ", ">"), `
`, "      ", import_react78.default.createElement("span", { style: { opacity: 0.6 } }, "{", "/* ... */", "}"), `
`, "      ", import_react78.default.createElement("span", { style: { color: "#79C0FF" } }, "<", import_react78.default.createElement("span", { style: { color: "#79C0FF" } }, "WelcomePage"), " />"), `
`, "      ", import_react78.default.createElement("span", { style: { opacity: 0.6 } }, "{", "/* ... */", "}"), `
`, "    ", import_react78.default.createElement("span", { style: { color: "#79C0FF" } }, "</", import_react78.default.createElement("span", { style: { color: "#79C0FF" } }, "Refine"), ">")), `
`, "  ", ");", `
`, "}"), "ExampleImplementation");
var dc = o((e) => import_react78.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 204, height: 56, viewBox: "0 0 204 56", fill: "none", ...e }, import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-a)", d: "M12 0H0v12L12 0Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-b)", d: "M28 0h-8L0 20v8L28 0Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-c)", d: "M36 0h8L0 44v-8L36 0Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-d)", d: "M60 0h-8L0 52v4h4L60 0Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-e)", d: "M68 0h8L20 56h-8L68 0Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-f)", d: "M92 0h-8L28 56h8L92 0Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-g)", d: "M100 0h8L52 56h-8l56-56Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-h)", d: "M124 0h-8L60 56h8l56-56Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-i)", d: "M140 0h-8L76 56h8l56-56Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-j)", d: "M132 0h8L84 56h-8l56-56Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-k)", d: "M156 0h-8L92 56h8l56-56Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-l)", d: "M164 0h8l-56 56h-8l56-56Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-m)", d: "M188 0h-8l-56 56h8l56-56Z" }), import_react78.default.createElement("path", { fill: "url(#welcome-page-error-gradient-n)", d: "M204 0h-8l-56 56h8l56-56Z" }), import_react78.default.createElement("defs", null, import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-a", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-b", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-c", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-d", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-e", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-f", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-g", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-h", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-i", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-j", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-k", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-l", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-m", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })), import_react78.default.createElement("radialGradient", { id: "welcome-page-error-gradient-n", cx: 0, cy: 0, r: 1, gradientTransform: "scale(124)", gradientUnits: "userSpaceOnUse" }, import_react78.default.createElement("stop", { stopColor: "#FF4C4D", stopOpacity: 0.1 }), import_react78.default.createElement("stop", { offset: 1, stopColor: "#FF4C4D", stopOpacity: 0 })))), "ErrorGradient");
var lc = o((e) => import_react78.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", ...e }, import_react78.default.createElement("path", { fill: "#FF4C4D", fillRule: "evenodd", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Z", clipRule: "evenodd" }), import_react78.default.createElement("path", { fill: "#fff", fillRule: "evenodd", d: "M7 8a1 1 0 1 0 2 0V5a1 1 0 1 0-2 0v3Zm0 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z", clipRule: "evenodd" })), "ErrorIcon");
var mc = o(() => {
  let { __initialized: e } = ge();
  return import_react76.default.createElement(import_react76.default.Fragment, null, import_react76.default.createElement(zn, null), !e && import_react76.default.createElement(_n, null));
}, "WelcomePage");
var fc = "4.57.9";
var jn = o(() => {
  var P;
  let e = yo(), t = (0, import_react81.useContext)(Et), { liveProvider: r } = (0, import_react81.useContext)(mt), s = (0, import_react81.useContext)(er), n = (0, import_react81.useContext)(Jt), { i18nProvider: i2 } = (0, import_react81.useContext)(Xe), a = (0, import_react81.useContext)(qt), u2 = (0, import_react81.useContext)(ct), { resources: c2 } = q(), p3 = ge(), l2 = !!t.create || !!t.get || !!t.update, m2 = !!(r != null && r.publish) || !!(r != null && r.subscribe) || !!(r != null && r.unsubscribe), y2 = !!s.useHistory || !!s.Link || !!s.Prompt || !!s.useLocation || !!s.useParams, d3 = !!n, T3 = !!(i2 != null && i2.changeLocale) || !!(i2 != null && i2.getLocale) || !!(i2 != null && i2.translate), x = !!a.close || !!a.open, v = !!u2.can, f2 = (P = p3 == null ? void 0 : p3.options) == null ? void 0 : P.projectId;
  return { providers: { auth: e, auditLog: l2, live: m2, router: y2, data: d3, i18n: T3, notification: x, accessControl: v }, version: fc, resourceCount: c2.length, projectId: f2 };
}, "useTelemetryData");
var yc = o((e) => {
  try {
    let t = JSON.stringify(e || {});
    return typeof btoa < "u" ? btoa(t) : Buffer.from(t).toString("base64");
  } catch {
    return;
  }
}, "encode");
var gc = o((e) => {
  let t = new Image();
  t.src = e;
}, "throughImage");
var Tc = o((e) => {
  fetch(e);
}, "throughFetch");
var xc = o((e) => {
  typeof Image < "u" ? gc(e) : typeof fetch < "u" && Tc(e);
}, "transport");
var Zn = o(() => {
  let e = jn(), t = import_react80.default.useRef(false);
  return import_react80.default.useEffect(() => {
    if (t.current) return;
    let r = yc(e);
    r && (xc(`https://telemetry.refine.dev/telemetry?payload=${r}`), t.current = true);
  }, []), null;
}, "Telemetry");
var Yn = o((e) => {
  let t = ["go", "parse", "back", "Link"], r = Object.keys(e).filter((n) => !t.includes(n));
  return r.length > 0 ? (console.warn(`Unsupported properties are found in \`routerProvider\` prop. You provided \`${r.join(", ")}\`. Supported properties are \`${t.join(", ")}\`. You may wanted to use \`legacyRouterProvider\` prop instead.`), true) : false;
}, "checkRouterPropMisuse");
var qn = o((e) => {
  let t = import_react82.default.useRef(false);
  import_react82.default.useEffect(() => {
    t.current === false && e && Yn(e) && (t.current = true);
  }, [e]);
}, "useRouterMisuseWarning");
var Rc = o(({ legacyAuthProvider: e, authProvider: t, dataProvider: r, legacyRouterProvider: s, routerProvider: n, notificationProvider: i2, accessControlProvider: a, auditLogProvider: u2, resources: c2, DashboardPage: p3, ReadyPage: l2, LoginPage: m2, catchAll: y2, children: d3, liveProvider: T3, i18nProvider: x, Title: v, Layout: f2, Sider: P, Header: M, Footer: Q, OffLayoutArea: g2, onLiveEvent: C2, options: h }) => {
  let { optionsWithDefaults: D, disableTelemetryWithDefault: k2, reactQueryWithDefaults: E2 } = Jr({ options: h }), L2 = Ar(() => {
    var b;
    return E2.clientConfig instanceof QueryClient ? E2.clientConfig : new QueryClient({ ...E2.clientConfig, defaultOptions: { ...E2.clientConfig.defaultOptions, queries: { refetchOnWindowFocus: false, keepPreviousData: true, ...(b = E2.clientConfig.defaultOptions) == null ? void 0 : b.queries } } });
  }, [E2.clientConfig]);
  C(L2);
  let w = import_react79.default.useMemo(() => typeof i2 == "function" ? i2 : () => i2, [i2])();
  if (qn(n), s && !n && (c2 ?? []).length === 0) return l2 ? import_react79.default.createElement(l2, null) : import_react79.default.createElement(Qo, null);
  let { RouterComponent: N = import_react79.default.Fragment } = n ? {} : s ?? {};
  return import_react79.default.createElement(QueryClientProvider, { client: L2 }, import_react79.default.createElement(cn, { ...w }, import_react79.default.createElement(Zo, { ...e ?? {}, isProvided: !!e }, import_react79.default.createElement(Jo, { ...t ?? {}, isProvided: !!t }, import_react79.default.createElement($s, { dataProvider: r }, import_react79.default.createElement(_s, { liveProvider: T3 }, import_react79.default.createElement(qs, { value: s && !n ? "legacy" : "new" }, import_react79.default.createElement(tn, { router: n }, import_react79.default.createElement(xn, { ...s }, import_react79.default.createElement(Zs, { resources: c2 ?? [] }, import_react79.default.createElement(dn, { i18nProvider: x }, import_react79.default.createElement(Pn, { ...a ?? {} }, import_react79.default.createElement(Mn, { ...u2 ?? {} }, import_react79.default.createElement(an, null, import_react79.default.createElement(cs, { mutationMode: D.mutationMode, warnWhenUnsavedChanges: D.warnWhenUnsavedChanges, syncWithLocation: D.syncWithLocation, Title: v, undoableTimeout: D.undoableTimeout, catchAll: y2, DashboardPage: p3, LoginPage: m2, Layout: f2, Sider: P, Footer: Q, Header: M, OffLayoutArea: g2, hasDashboard: !!p3, liveMode: D.liveMode, onLiveEvent: C2, options: D }, import_react79.default.createElement(fs, null, import_react79.default.createElement(N, null, d3, !k2 && import_react79.default.createElement(Zn, null), import_react79.default.createElement(Vo, null))))))))))))))))));
}, "Refine");
var un = o(({ notification: e }) => {
  let t = z(), { notificationDispatch: r } = ut(), { open: s } = He(), [n, i2] = (0, import_react83.useState)(), a = o(() => {
    if (e.isRunning === true && (e.seconds === 0 && e.doMutation(), e.isSilent || s == null || s({ key: `${e.id}-${e.resource}-notification`, type: "progress", message: t("notifications.undoable", { seconds: Bt(e.seconds) }, `You have ${Bt(e.seconds)} seconds to undo`), cancelMutation: e.cancelMutation, undoableTimeout: Bt(e.seconds) }), e.seconds > 0)) {
      n && clearTimeout(n);
      let u2 = setTimeout(() => {
        r({ type: "DECREASE_NOTIFICATION_SECOND", payload: { id: e.id, seconds: e.seconds, resource: e.resource } });
      }, 1e3);
      i2(u2);
    }
  }, "cancelNotification");
  return (0, import_react83.useEffect)(() => {
    a();
  }, [e]), null;
}, "UndoableQueue");
var Dc = o(({ children: e, Layout: t, Sider: r, Header: s, Title: n, Footer: i2, OffLayoutArea: a }) => {
  let { Layout: u2, Footer: c2, Header: p3, Sider: l2, Title: m2, OffLayoutArea: y2 } = ge();
  return import_react84.default.createElement(t ?? u2, { Sider: r ?? l2, Header: s ?? p3, Footer: i2 ?? c2, Title: n ?? m2, OffLayoutArea: a ?? y2 }, e, import_react84.default.createElement(Uc, null));
}, "LayoutWrapper");
var Uc = o(() => {
  let { Prompt: e } = pe(), t = z(), { warnWhen: r, setWarnWhen: s } = vt(), n = o((i2) => (i2.preventDefault(), i2.returnValue = t("warnWhenUnsavedChanges", "Are you sure you want to leave? You have unsaved changes."), i2.returnValue), "warnWhenListener");
  return (0, import_react84.useEffect)(() => (r && window.addEventListener("beforeunload", n), window.removeEventListener("beforeunload", n)), [r]), import_react84.default.createElement(e, { when: r, message: t("warnWhenUnsavedChanges", "Are you sure you want to leave? You have unsaved changes."), setWarnWhen: s });
}, "UnsavedPrompt");
function Ec({ redirectOnFail: e = true, appendCurrentPathToQuery: t = true, children: r, fallback: s, loading: n, params: i2 }) {
  var C2;
  let a = ie(), u2 = oe(), c2 = !!(a != null && a.isProvided), p3 = !!(a != null && a.isLegacy), l2 = u2 === "legacy", m2 = Te(), y2 = Pe(), { useLocation: d3 } = pe(), T3 = d3(), { isFetching: x, isSuccess: v, data: { authenticated: f2, redirectTo: P } = {} } = wr({ v3LegacyAuthProviderCompatible: p3, params: i2 }), M = c2 ? p3 ? v : f2 : true;
  if (!c2) return import_react85.default.createElement(import_react85.default.Fragment, null, r ?? null);
  if (x) return import_react85.default.createElement(import_react85.default.Fragment, null, n ?? null);
  if (M) return import_react85.default.createElement(import_react85.default.Fragment, null, r ?? null);
  if (typeof s < "u") return import_react85.default.createElement(import_react85.default.Fragment, null, s ?? null);
  let Q = p3 ? typeof e == "string" ? e : "/login" : typeof e == "string" ? e : P, g2 = `${l2 ? T3 == null ? void 0 : T3.pathname : m2.pathname}`.replace(/(\?.*|#.*)$/, "");
  if (Q) {
    if (l2) {
      let D = t ? `?to=${encodeURIComponent(g2)}` : "";
      return import_react85.default.createElement(Mc, { to: `${Q}${D}` });
    }
    let h = (C2 = m2.params) != null && C2.to ? m2.params.to : y2({ to: g2, options: { keepQuery: true }, type: "path" });
    return import_react85.default.createElement(Lc, { config: { to: Q, query: t && (h ?? "").length > 1 ? { to: h } : void 0, type: "replace" } });
  }
  return null;
}
o(Ec, "Authenticated");
var Lc = o(({ config: e }) => {
  let t = Pe();
  return import_react85.default.useEffect(() => {
    t(e);
  }, [t, e]), null;
}, "Redirect");
var Mc = o(({ to: e }) => {
  let { replace: t } = he();
  return import_react85.default.useEffect(() => {
    t(e);
  }, [t, e]), null;
}, "RedirectLegacy");
var Vo = o(() => {
  let { useLocation: e } = pe(), { checkAuth: t } = xe(), r = e();
  return (0, import_react86.useEffect)(() => {
    t == null || t().catch(() => false);
  }, [r == null ? void 0 : r.pathname]), null;
}, "RouteChangeHandler");
var Sc = o(({ resource: e, action: t, params: r, fallback: s, onUnauthorized: n, children: i2, queryOptions: a, ...u2 }) => {
  let { id: c2, resource: p3, action: l2 = "" } = qe({ resource: e, id: r == null ? void 0 : r.id }), m2 = t ?? l2, y2 = r ?? { id: c2, resource: p3 }, { data: d3 } = kr({ resource: p3 == null ? void 0 : p3.name, action: m2, params: y2, queryOptions: a });
  return (0, import_react87.useEffect)(() => {
    n && (d3 == null ? void 0 : d3.can) === false && n({ resource: p3 == null ? void 0 : p3.name, action: m2, reason: d3 == null ? void 0 : d3.reason, params: y2 });
  }, [d3 == null ? void 0 : d3.can]), d3 != null && d3.can ? import_react87.default.isValidElement(i2) ? import_react87.default.cloneElement(i2, u2) : import_react87.default.createElement(import_react87.default.Fragment, null, i2) : (d3 == null ? void 0 : d3.can) === false ? import_react87.default.createElement(import_react87.default.Fragment, null, s ?? null) : null;
}, "CanAccess");
var ta = [`
    .bg-top-announcement {
        border-bottom: 1px solid rgba(71, 235, 235, 0.15);
        background: radial-gradient(
                218.19% 111.8% at 0% 0%,
                rgba(71, 235, 235, 0.1) 0%,
                rgba(71, 235, 235, 0.2) 100%
            ),
            #14141f;
    }
    `, `
    .top-announcement-mask {
        mask-image: url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hexagon.svg);
        -webkit-mask-image: url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hexagon.svg);
        mask-repeat: repeat;
        -webkit-mask-repeat: repeat;
        background: rgba(71, 235, 235, 0.25);
    }
    `, `
    .banner {
        display: flex;
        @media (max-width: 1000px) {
            display: none;
        }
    }`, `
    .gh-link, .gh-link:hover, .gh-link:active, .gh-link:visited, .gh-link:focus {
        text-decoration: none;
        z-index: 9;
    }
    `, `
    @keyframes top-announcement-glow {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
    `];
var kc = "If you find Refine useful, you can contribute to its growth by giving it a star on GitHub";
var Fc = o(({ containerStyle: e }) => ((0, import_react88.useEffect)(() => {
  let t = document.createElement("style");
  document.head.appendChild(t), ta.forEach((r) => {
    var s;
    return (s = t.sheet) == null ? void 0 : s.insertRule(r, t.sheet.cssRules.length);
  });
}, []), import_react88.default.createElement("div", { className: "banner bg-top-announcement", style: { width: "100%", height: "48px" } }, import_react88.default.createElement("div", { style: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "200px", width: "100%", maxWidth: "100vw", height: "100%", borderBottom: "1px solid #47ebeb26", ...e } }, import_react88.default.createElement("div", { className: "top-announcement-mask", style: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", borderBottom: "1px solid #47ebeb26" } }, import_react88.default.createElement("div", { style: { position: "relative", width: "960px", height: "100%", display: "flex", justifyContent: "space-between", margin: "0 auto" } }, import_react88.default.createElement("div", { style: { width: "calc(50% - 300px)", height: "100%", position: "relative" } }, import_react88.default.createElement(Hr, { style: { animationDelay: "1.5s", position: "absolute", top: "2px", right: "220px" }, id: "1" }), import_react88.default.createElement(Hr, { style: { animationDelay: "1s", position: "absolute", top: "8px", right: "100px", transform: "rotate(180deg)" }, id: "2" }), import_react88.default.createElement(ra, { style: { position: "absolute", right: "10px" }, id: "3" })), import_react88.default.createElement("div", { style: { width: "calc(50% - 300px)", height: "100%", position: "relative" } }, import_react88.default.createElement(Hr, { style: { animationDelay: "2s", position: "absolute", top: "6px", right: "180px", transform: "rotate(180deg)" }, id: "4" }), import_react88.default.createElement(Hr, { style: { animationDelay: "0.5s", transitionDelay: "1.3s", position: "absolute", top: "2px", right: "40px" }, id: "5" }), import_react88.default.createElement(ra, { style: { position: "absolute", right: "-70px" }, id: "6" })))), import_react88.default.createElement(Qc, { text: kc })))), "GitHubBanner");
var Qc = o(({ text: e }) => import_react88.default.createElement("a", { className: "gh-link", href: "https://s.refine.dev/github-support", target: "_blank", rel: "noreferrer", style: { position: "absolute", height: "100%", padding: "0 60px", display: "flex", flexWrap: "nowrap", whiteSpace: "nowrap", justifyContent: "center", alignItems: "center", backgroundImage: "linear-gradient(90deg, rgba(31, 63, 72, 0.00) 0%, #1F3F48 10%, #1F3F48 90%, rgba(31, 63, 72, 0.00) 100%)" } }, import_react88.default.createElement("div", { style: { color: "#fff", display: "flex", flexDirection: "row", gap: "8px" } }, import_react88.default.createElement("span", { style: { display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" } }, "⭐️"), import_react88.default.createElement("span", { className: "text", style: { fontSize: "16px", lineHeight: "24px" } }, e), import_react88.default.createElement("span", { style: { display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" } }, "⭐️"))), "Text");
var Hr = o(({ style: e, ...t }) => import_react88.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 80, height: 40, fill: "none", style: { opacity: 1, animation: "top-announcement-glow 1s ease-in-out infinite alternate", ...e } }, import_react88.default.createElement("circle", { cx: 40, r: 40, fill: `url(#${t.id}-a)`, fillOpacity: 0.5 }), import_react88.default.createElement("defs", null, import_react88.default.createElement("radialGradient", { id: `${t.id}-a`, cx: 0, cy: 0, r: 1, gradientTransform: "matrix(0 40 -40 0 40 0)", gradientUnits: "userSpaceOnUse" }, import_react88.default.createElement("stop", { stopColor: "#47EBEB" }), import_react88.default.createElement("stop", { offset: 1, stopColor: "#47EBEB", stopOpacity: 0 })))), "GlowSmall");
var ra = o(({ style: e, ...t }) => import_react88.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 120, height: 48, fill: "none", ...t, style: { opacity: 1, animation: "top-announcement-glow 1s ease-in-out infinite alternate", ...e } }, import_react88.default.createElement("circle", { cx: 60, cy: 24, r: 60, fill: `url(#${t.id}-a)`, fillOpacity: 0.5 }), import_react88.default.createElement("defs", null, import_react88.default.createElement("radialGradient", { id: `${t.id}-a`, cx: 0, cy: 0, r: 1, gradientTransform: "matrix(0 60 -60 0 60 24)", gradientUnits: "userSpaceOnUse" }, import_react88.default.createElement("stop", { stopColor: "#47EBEB" }), import_react88.default.createElement("stop", { offset: 1, stopColor: "#47EBEB", stopOpacity: 0 })))), "GlowBig");
var Vc = o(({ status: e, elements: { success: t = import_react89.default.createElement($r, { translationKey: "autoSave.success", defaultMessage: "saved" }), error: r = import_react89.default.createElement($r, { translationKey: "autoSave.error", defaultMessage: "auto save failure" }), loading: s = import_react89.default.createElement($r, { translationKey: "autoSave.loading", defaultMessage: "saving..." }), idle: n = import_react89.default.createElement($r, { translationKey: "autoSave.idle", defaultMessage: "waiting for changes" }) } = {} }) => {
  switch (e) {
    case "success":
      return import_react89.default.createElement(import_react89.default.Fragment, null, t);
    case "error":
      return import_react89.default.createElement(import_react89.default.Fragment, null, r);
    case "loading":
      return import_react89.default.createElement(import_react89.default.Fragment, null, s);
    default:
      return import_react89.default.createElement(import_react89.default.Fragment, null, n);
  }
}, "AutoSaveIndicator");
var $r = o(({ translationKey: e, defaultMessage: t }) => {
  let r = z();
  return import_react89.default.createElement("span", null, r(e, t));
}, "Message");

export {
  require_shim,
  root_default,
  baseGetTag_default,
  isObject_default,
  isFunction_default,
  eq_default,
  isObjectLike_default,
  isArguments_default,
  isArray_default,
  defineProperty_default,
  baseRest_default,
  isArrayLike_default,
  isArrayLikeObject_default,
  require_lib,
  Stack_default,
  Uint8Array_default,
  isBuffer_default,
  isTypedArray_default,
  arrayLikeKeys_default,
  isPrototype_default,
  overArg_default,
  isIterateeCall_default,
  sr,
  nr,
  es,
  wt,
  nt,
  I2 as I,
  ts,
  as,
  yr,
  is,
  ee,
  Tr,
  xr,
  hr,
  ie,
  ls,
  _e,
  vt,
  to,
  Ta,
  ge,
  ht,
  Cr,
  Ts,
  vr,
  Ca,
  Dr,
  St,
  Ur,
  Er,
  Lr,
  ba,
  va,
  Da,
  Z,
  Ua,
  no,
  Dt,
  Mr,
  Ht,
  co,
  lo,
  fo,
  wr,
  Va,
  Re,
  Na,
  yo,
  fe,
  $t,
  zt,
  go,
  Os,
  To,
  Xt,
  Po,
  bo,
  ii,
  di,
  li,
  yi,
  xi,
  le,
  bi,
  Ae,
  Rt,
  oe,
  vo,
  Te,
  q,
  rn,
  Pt,
  sn,
  ph,
  Ye,
  ut,
  He,
  Ce,
  Xe,
  Eo,
  z,
  Lo,
  tP,
  fP,
  RP,
  fn,
  Mo,
  Ut,
  Pe,
  he,
  nR,
  mR,
  TR,
  Du,
  Io,
  yt,
  pe,
  ct,
  kr,
  cC,
  PC,
  IC,
  Je,
  eb,
  fb,
  zu,
  Zu,
  Br,
  ue,
  At,
  qe,
  qu,
  tc,
  Zv,
  Yv,
  Jv,
  qv,
  eD,
  tD,
  rD,
  oD,
  sc,
  Yr,
  ac,
  Qo,
  mc,
  Rc,
  un,
  Dc,
  Ec,
  Vo,
  Sc,
  Fc,
  Vc
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

papaparse/papaparse.min.js:
  (* @license
  Papa Parse
  v5.5.3
  https://github.com/mholt/PapaParse
  License: MIT
  *)
*/
//# sourceMappingURL=chunk-2HJEM4DJ.js.map
