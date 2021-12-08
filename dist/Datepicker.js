/*
* @sum.cumo/vue-datepicker v3.2.0
* (c) 2018-2021 sum.cumo GmbH
* Released under the Apache-2.0 License.
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vuejsDatepicker = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global_1 = // eslint-disable-next-line no-undef
	check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
	function () {
	  return this;
	}() || Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, {
	    get: function () {
	      return 7;
	    }
	  })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
	  1: 2
	}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;
	var objectPropertyIsEnumerable = {
	  f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};
	var objectGetOwnPropertyDescriptor = {
	  f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var objectDefineProperty = {
	  f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  }

	  return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});
	var sharedStore = store;

	var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	  (module.exports = function (key, value) {
	    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: '3.7.0',
	    mode:  'global',
	    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	  });
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;

	  set = function (it, metadata) {
	    metadata.facade = it;
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };

	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;

	  set = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };

	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	  var getInternalState = internalState.get;
	  var enforceInternalState = internalState.enforce;
	  var TEMPLATE = String(String).split('String');
	  (module.exports = function (O, key, value, options) {
	    var unsafe = options ? !!options.unsafe : false;
	    var simple = options ? !!options.enumerable : false;
	    var noTargetGet = options ? !!options.noTargetGet : false;
	    var state;

	    if (typeof value == 'function') {
	      if (typeof key == 'string' && !has(value, 'name')) {
	        createNonEnumerableProperty(value, 'name', key);
	      }

	      state = enforceInternalState(value);

	      if (!state.source) {
	        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	      }
	    }

	    if (O === global_1) {
	      if (simple) O[key] = value;else setGlobal(key, value);
	      return;
	    } else if (!unsafe) {
	      delete O[key];
	    } else if (!noTargetGet && O[key]) {
	      simple = true;
	    }

	    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  })(Function.prototype, 'toString', function toString() {
	    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	  });
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor; // `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger

	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min; // `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength

	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
	  f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;
	var objectGetOwnPropertySymbols = {
	  f: f$4
	};

	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/

	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }

	  if (target) for (key in source) {
	    sourceProperty = source[key];

	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];

	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    } // add a flag to not completely full polyfills


	    if (options.sham || targetProperty && targetProperty.sham) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    } // extend global


	    redefine(target, key, sourceProperty, options);
	  }
	};

	// https://tc39.github.io/ecma262/#sec-isarray

	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// https://tc39.github.io/ecma262/#sec-toobject

	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
	&& !Symbol.sham // eslint-disable-next-line no-undef
	&& typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  }

	  return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

	var arraySpeciesCreate = function (originalArray, length) {
	  var C;

	  if (isArray(originalArray)) {
	    C = originalArray.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }

	  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);

	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};

	    constructor[SPECIES$1] = function () {
	      return {
	        foo: 1
	      };
	    };

	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679

	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});
	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: FORCED
	}, {
	  concat: function concat(arg) {
	    // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;

	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];

	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }

	    A.length = n;
	    return A;
	  }
	});

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  }

	  return it;
	};

	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 0:
	      return function () {
	        return fn.call(that);
	      };

	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };

	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };

	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;

	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);

	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	            case 3:
	              return true;
	            // some

	            case 5:
	              return value;
	            // find

	            case 6:
	              return index;
	            // findIndex

	            case 2:
	              push.call(target, value);
	            // filter
	          } else if (IS_EVERY) return false; // every
	      }
	    }

	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var defineProperty = Object.defineProperty;
	var cache = {};

	var thrower = function (it) {
	  throw it;
	};

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;
	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = {
	      length: -1
	    };
	    if (ACCESSORS) defineProperty(O, 1, {
	      enumerable: true,
	      get: thrower
	    });else O[1] = 1;
	    method.call(O, argument0, argument1);
	  });
	};

	var $filter = arrayIteration.filter;
	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

	var USES_TO_LENGTH = arrayMethodUsesToLength('filter'); // `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
	}, {
	  filter: function filter(callbackfn
	  /* , thisArg */
	  ) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-object.keys

	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// https://tc39.github.io/ecma262/#sec-object.defineproperties

	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;

	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () {
	  /* empty */
	};

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak

	  return temp;
	}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	}; // Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug


	var activeXDocument;

	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {
	    /* ignore */
	  }

	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;

	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true; // `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create

	var objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();

	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	} // add a key to Array.prototype[@@unscopables]


	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $findIndex = arrayIteration.findIndex;
	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES = true;
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength(FIND_INDEX); // Shouldn't skip holes

	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () {
	  SKIPS_HOLES = false;
	}); // `Array.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.findindex

	_export({
	  target: 'Array',
	  proto: true,
	  forced: SKIPS_HOLES || !USES_TO_LENGTH$1
	}, {
	  findIndex: function findIndex(callbackfn
	  /* , that = undefined */
	  ) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables(FIND_INDEX);

	var $includes = arrayIncludes.includes;
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	}); // `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !USES_TO_LENGTH$2
	}, {
	  includes: function includes(el
	  /* , fromIndex = 0 */
	  ) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('includes');

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () {
	      throw 1;
	    }, 1);
	  });
	};

	var $indexOf = arrayIncludes.indexOf;
	var nativeIndexOf = [].indexOf;
	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	}); // `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

	_export({
	  target: 'Array',
	  proto: true,
	  forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH$3
	}, {
	  indexOf: function indexOf(searchElement
	  /* , fromIndex = 0 */
	  ) {
	    return NEGATIVE_ZERO // convert -0 to +0
	    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var DatePrototype = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var nativeDateToString = DatePrototype[TO_STRING];
	var getTime = DatePrototype.getTime; // `Date.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-date.prototype.tostring

	if (new Date(NaN) + '' != INVALID_DATE) {
	  redefine(DatePrototype, TO_STRING, function toString() {
	    var value = getTime.call(this); // eslint-disable-next-line no-self-compare

	    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
	  });
	}

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  }

	  return it;
	};

	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.

	/* eslint-disable no-proto */

	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;

	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {
	    /* empty */
	  }

	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if ( // it can work only with native `setPrototypeOf`
	  objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	  typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

	var createMethod$2 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$2(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$2(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$2(3)
	};

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$1 = objectDefineProperty.f;
	var trim = stringTrim.trim;
	var NUMBER = 'Number';
	var NativeNumber = global_1[NUMBER];
	var NumberPrototype = NativeNumber.prototype; // Opera ~12 has broken Object#toString

	var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER; // `ToNumber` abstract operation
	// https://tc39.github.io/ecma262/#sec-tonumber

	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  var first, third, radix, maxCode, digits, length, index, code;

	  if (typeof it == 'string' && it.length > 2) {
	    it = trim(it);
	    first = it.charCodeAt(0);

	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66:
	        case 98:
	          radix = 2;
	          maxCode = 49;
	          break;
	        // fast equal of /^0b[01]+$/i

	        case 79:
	        case 111:
	          radix = 8;
	          maxCode = 55;
	          break;
	        // fast equal of /^0o[0-7]+$/i

	        default:
	          return +it;
	      }

	      digits = it.slice(2);
	      length = digits.length;

	      for (index = 0; index < length; index++) {
	        code = digits.charCodeAt(index); // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols

	        if (code < 48 || code > maxCode) return NaN;
	      }

	      return parseInt(digits, radix);
	    }
	  }

	  return +it;
	}; // `Number` constructor
	// https://tc39.github.io/ecma262/#sec-number-constructor


	if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var dummy = this;
	    return dummy instanceof NumberWrapper // check on 1..constructor(foo) case
	    && (BROKEN_CLASSOF ? fails(function () {
	      NumberPrototype.valueOf.call(dummy);
	    }) : classofRaw(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
	  };

	  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : ( // ES3:
	  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
	  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys$1.length > j; j++) {
	    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
	      defineProperty$1(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
	    }
	  }

	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine(global_1, NUMBER, NumberWrapper);
	}

	// https://tc39.github.io/ecma262/#sec-number.isnan

	_export({
	  target: 'Number',
	  stat: true
	}, {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('slice', {
	  ACCESSORS: true,
	  0: 0,
	  1: 2
	});
	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max; // `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$4
	}, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

	    var Constructor, result, n;

	    if (isArray(O)) {
	      Constructor = O.constructor; // cross-realm fallback

	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }

	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }

	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

	    result.length = n;
	    return result;
	  }
	});

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
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

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function ownKeys$1(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    if (enumerableOnly) symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    });
	    keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};

	    if (i % 2) {
	      ownKeys$1(Object(source), true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys$1(Object(source)).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	      });
	    }
	  }

	  return target;
	}

	var Language = /*#__PURE__*/function () {
	  // eslint-disable-next-line max-params
	  function Language(language, months, monthsAbbr, days) {
	    var rtl = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
	    var ymd = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
	    var yearSuffix = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';

	    _classCallCheck(this, Language);

	    this.language = language;
	    this.months = months;
	    this.monthsAbbr = monthsAbbr;
	    this.days = days;
	    this.rtl = rtl;
	    this.ymd = ymd;
	    this.yearSuffix = yearSuffix;
	  }
	  /* eslint-disable no-underscore-dangle */


	  _createClass(Language, [{
	    key: "getDaysStartingOn",
	    value: function getDaysStartingOn(firstDayOfWeek) {
	      var firstDays = this._days.slice(firstDayOfWeek);

	      var lastDays = this._days.slice(0, firstDayOfWeek);

	      return firstDays.concat(lastDays);
	    }
	  }, {
	    key: "getMonthByAbbrName",
	    value: function getMonthByAbbrName(name) {
	      var monthValue = this._monthsAbbr.findIndex(function (month) {
	        return month === name;
	      }) + 1;
	      return monthValue < 10 ? "0".concat(monthValue) : "".concat(monthValue);
	    }
	  }, {
	    key: "getMonthByName",
	    value: function getMonthByName(name) {
	      var monthValue = this._months.findIndex(function (month) {
	        return month === name;
	      }) + 1;
	      return monthValue < 10 ? "0".concat(monthValue) : "".concat(monthValue);
	    }
	  }, {
	    key: "language",
	    get: function get() {
	      return this._language;
	    },
	    set: function set(language) {
	      if (typeof language !== 'string') {
	        throw new TypeError('Language must be a string');
	      }

	      this._language = language;
	    }
	  }, {
	    key: "months",
	    get: function get() {
	      return this._months;
	    },
	    set: function set(months) {
	      if (months.length !== 12) {
	        throw new RangeError("There must be 12 months for ".concat(this.language, " language"));
	      }

	      this._months = months;
	    }
	  }, {
	    key: "monthsAbbr",
	    get: function get() {
	      return this._monthsAbbr;
	    },
	    set: function set(monthsAbbr) {
	      if (monthsAbbr.length !== 12) {
	        throw new RangeError("There must be 12 abbreviated months for ".concat(this.language, " language"));
	      }

	      this._monthsAbbr = monthsAbbr;
	    }
	  }, {
	    key: "days",
	    get: function get() {
	      return this._days;
	    },
	    set: function set(days) {
	      if (days.length !== 7) {
	        throw new RangeError("There must be 7 days for ".concat(this.language, " language"));
	      }

	      this._days = days;
	    }
	  }]);

	  return Language;
	}();

	var en = new Language('English', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

	var calendarSlots = ['beforeCalendarHeaderDay', 'calendarFooterDay', 'beforeCalendarHeaderMonth', 'calendarFooterMonth', 'beforeCalendarHeaderYear', 'calendarFooterYear', 'nextIntervalBtn', 'prevIntervalBtn'];

	var nativeJoin = [].join;
	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$1 = arrayMethodIsStrict('join', ','); // `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join

	_export({
	  target: 'Array',
	  proto: true,
	  forced: ES3_STRINGS || !STRICT_METHOD$1
	}, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};
	test[TO_STRING_TAG] = 'z';
	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag'); // ES3 wrong here

	var CORRECT_ARGUMENTS = classofRaw(function () {
	  return arguments;
	}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) {
	    /* empty */
	  }
	}; // getting tag from ES6+ `Object.prototype.toString`


	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
	  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
	  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
	  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, {
	    unsafe: true
	  });
	}

	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags


	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// so we use an intermediate function.


	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});
	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});
	var regexpStickyHelpers = {
	  UNSUPPORTED_Y: UNSUPPORTED_Y,
	  BROKEN_CARET: BROKEN_CARET
	};

	var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.

	var nativeReplace = String.prototype.replace;
	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	}();

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');

	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex); // Support anchored sticky behavior.

	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      } // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.


	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }

	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }

	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: /./.exec !== regexpExec
	}, {
	  exec: regexpExec
	});

	var TO_STRING$1 = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING$1];
	var NOT_GENERIC = fails(function () {
	  return nativeToString.call({
	    source: 'a',
	    flags: 'b'
	  }) != '/a/b';
	}); // FF44- RegExp#toString has a wrong name

	var INCORRECT_NAME = nativeToString.name != TO_STRING$1; // `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring

	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING$1, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, {
	    unsafe: true
	  });
	}

	var SPECIES$3 = wellKnownSymbol('species');
	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;

	  re.exec = function () {
	    var result = [];
	    result.groups = {
	      a: '7'
	    };
	    return result;
	  };

	  return ''.replace(re, '$<a>') !== '7';
	}); // IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

	var REPLACE_KEEPS_$0 = function () {
	  return 'a'.replace(/./, '$0') === '$0';
	}();

	var REPLACE = wellKnownSymbol('replace'); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }

	  return false;
	}(); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper


	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;

	  re.exec = function () {
	    return originalExec.apply(this, arguments);
	  };

	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);
	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};

	    O[SYMBOL] = function () {
	      return 7;
	    };

	    return ''[KEY](O) != 7;
	  });
	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.

	      re.constructor = {};

	      re.constructor[SPECIES$3] = function () {
	        return re;
	      };

	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () {
	      execCalled = true;
	      return null;
	    };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return {
	            done: true,
	            value: nativeRegExpMethod.call(regexp, str, arg2)
	          };
	        }

	        return {
	          done: true,
	          value: nativeMethod.call(str, regexp, arg2)
	        };
	      }

	      return {
	        done: false
	      };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];
	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	    ? function (string, arg) {
	      return regexMethod.call(string, this, arg);
	    } // 21.2.5.6 RegExp.prototype[@@match](string)
	    // 21.2.5.9 RegExp.prototype[@@search](string)
	    : function (string) {
	      return regexMethod.call(string, this);
	    });
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var createMethod$3 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$3(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$3(true)
	};

	var charAt = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex

	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};

	// https://tc39.github.io/ecma262/#sec-regexpexec

	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;

	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);

	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }

	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
	  return [// `String.prototype.match` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.match
	  function match(regexp) {
	    var O = requireObjectCoercible(this);
	    var matcher = regexp == undefined ? undefined : regexp[MATCH];
	    return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, // `RegExp.prototype[@@match]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	  function (regexp) {
	    var res = maybeCallNative(nativeMatch, regexp, this);
	    if (res.done) return res.value;
	    var rx = anObject(regexp);
	    var S = String(this);
	    if (!rx.global) return regexpExecAbstract(rx, S);
	    var fullUnicode = rx.unicode;
	    rx.lastIndex = 0;
	    var A = [];
	    var n = 0;
	    var result;

	    while ((result = regexpExecAbstract(rx, S)) !== null) {
	      var matchStr = String(result[0]);
	      A[n] = matchStr;
	      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      n++;
	    }

	    return n === 0 ? null : A;
	  }];
	});

	var max$2 = Math.max;
	var min$2 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	}; // @@replace logic


	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
	  return [// `String.prototype.replace` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	  function replace(searchValue, replaceValue) {
	    var O = requireObjectCoercible(this);
	    var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
	  }, // `RegExp.prototype[@@replace]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	  function (regexp, replaceValue) {
	    if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
	      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	      if (res.done) return res.value;
	    }

	    var rx = anObject(regexp);
	    var S = String(this);
	    var functionalReplace = typeof replaceValue === 'function';
	    if (!functionalReplace) replaceValue = String(replaceValue);
	    var global = rx.global;

	    if (global) {
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	    }

	    var results = [];

	    while (true) {
	      var result = regexpExecAbstract(rx, S);
	      if (result === null) break;
	      results.push(result);
	      if (!global) break;
	      var matchStr = String(result[0]);
	      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	    }

	    var accumulatedResult = '';
	    var nextSourcePosition = 0;

	    for (var i = 0; i < results.length; i++) {
	      result = results[i];
	      var matched = String(result[0]);
	      var position = max$2(min$2(toInteger(result.index), S.length), 0);
	      var captures = []; // NOTE: This is equivalent to
	      //   captures = result.slice(1).map(maybeToString)
	      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

	      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

	      var namedCaptures = result.groups;

	      if (functionalReplace) {
	        var replacerArgs = [matched].concat(captures, position, S);
	        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	        var replacement = String(replaceValue.apply(undefined, replacerArgs));
	      } else {
	        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	      }

	      if (position >= nextSourcePosition) {
	        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	        nextSourcePosition = position + matched.length;
	      }
	    }

	    return accumulatedResult + S.slice(nextSourcePosition);
	  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }

	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;

	      switch (ch.charAt(0)) {
	        case '$':
	          return '$';

	        case '&':
	          return matched;

	        case '`':
	          return str.slice(0, position);

	        case "'":
	          return str.slice(tailPos);

	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;

	        default:
	          // \d\d?
	          var n = +ch;
	          if (n === 0) return match;

	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }

	          capture = captures[n - 1];
	      }

	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp

	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var SPECIES$4 = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor

	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var arrayPush = [].push;
	var min$3 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

	var SUPPORTS_Y = !fails(function () {
	  return !RegExp(MAX_UINT32, 'y');
	}); // @@split logic

	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;

	  if ('abbc'.split(/(b)*/)[1] == 'c' || 'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }

	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;

	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;

	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }

	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }

	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));

	      return output.length > lim ? output.slice(0, lim) : output;
	    }; // Chakra, V8

	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [// `String.prototype.split` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.split
	  function split(separator, limit) {
	    var O = requireObjectCoercible(this);
	    var splitter = separator == undefined ? undefined : separator[SPLIT];
	    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
	  }, // `RegExp.prototype[@@split]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	  //
	  // NOTE: This cannot be properly polyfilled in engines that don't support
	  // the 'y' flag.
	  function (regexp, limit) {
	    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	    if (res.done) return res.value;
	    var rx = anObject(regexp);
	    var S = String(this);
	    var C = speciesConstructor(rx, RegExp);
	    var unicodeMatching = rx.unicode;
	    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
	    // simulate the 'y' flag.

	    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	    if (lim === 0) return [];
	    if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	    var p = 0;
	    var q = 0;
	    var A = [];

	    while (q < S.length) {
	      splitter.lastIndex = SUPPORTS_Y ? q : 0;
	      var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	      var e;

	      if (z === null || (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
	        q = advanceStringIndex(S, q, unicodeMatching);
	      } else {
	        A.push(S.slice(p, q));
	        if (A.length === lim) return A;

	        for (var i = 1; i <= z.length - 1; i++) {
	          A.push(z[i]);
	          if (A.length === lim) return A;
	        }

	        q = p = e;
	      }
	    }

	    A.push(S.slice(p));
	    return A;
	  }];
	}, !SUPPORTS_Y);

	var getParsedDate = function getParsedDate(_ref) {
	  var formatStr = _ref.formatStr,
	      dateStr = _ref.dateStr,
	      translation = _ref.translation;
	  var splitter = formatStr.match(/-|\/|\s|\./) || ['-'];
	  var df = formatStr.split(splitter[0]);
	  var ds = dateStr.split(splitter[0]);
	  var ymd = [new Date().getFullYear(), '01', '01'];

	  for (var i = 0; i < df.length; i += 1) {
	    if (/yyyy/i.test(df[i])) {
	      ymd[0] = ds[i];
	    } else if (/mmmm/i.test(df[i])) {
	      ymd[1] = translation.getMonthByName(ds[i]);
	    } else if (/mmm/i.test(df[i])) {
	      ymd[1] = translation.getMonthByAbbrName(ds[i]);
	    } else if (/mm/i.test(df[i])) {
	      ymd[1] = ds[i];
	    } else if (/m/i.test(df[i])) {
	      ymd[1] = ds[i];
	    } else if (/dd/i.test(df[i])) {
	      ymd[2] = ds[i];
	    } else if (/d/i.test(df[i])) {
	      var tmp = ds[i].replace(/st|rd|nd|th/g, '');
	      ymd[2] = tmp < 10 ? "0".concat(tmp) : "".concat(tmp);
	    }
	  }

	  return ymd;
	};

	var utils = {
	  /**
	   * @type {Boolean}
	   */
	  useUtc: false,

	  /**
	   * Returns the full year, using UTC or not
	   * @param {Date} date
	   */
	  getFullYear: function getFullYear(date) {
	    return this.useUtc ? date.getUTCFullYear() : date.getFullYear();
	  },

	  /**
	   * Returns the month, using UTC or not
	   * @param {Date} date
	   */
	  getMonth: function getMonth(date) {
	    return this.useUtc ? date.getUTCMonth() : date.getMonth();
	  },

	  /**
	   * Returns the number of days in the month, using UTC or not
	   * @param {Date} date
	   */
	  getDaysInMonth: function getDaysInMonth(date) {
	    return this.daysInMonth(this.getFullYear(date), this.getMonth(date));
	  },

	  /**
	   * Returns the date, using UTC or not
	   * @param {Date} date
	   */
	  getDate: function getDate(date) {
	    return this.useUtc ? date.getUTCDate() : date.getDate();
	  },

	  /**
	   * Returns the day, using UTC or not
	   * @param {Date} date
	   */
	  getDay: function getDay(date) {
	    return this.useUtc ? date.getUTCDay() : date.getDay();
	  },

	  /**
	   * Returns the hours, using UTC or not
	   * @param {Date} date
	   */
	  getHours: function getHours(date) {
	    return this.useUtc ? date.getUTCHours() : date.getHours();
	  },

	  /**
	   * Returns the minutes, using UTC or not
	   * @param {Date} date
	   */
	  getMinutes: function getMinutes(date) {
	    return this.useUtc ? date.getUTCMinutes() : date.getMinutes();
	  },

	  /**
	   * Sets the full year, using UTC or not
	   * @param {Date} date
	   * @param {String, Number} value
	   */
	  setFullYear: function setFullYear(date, value) {
	    return this.useUtc ? date.setUTCFullYear(value) : date.setFullYear(value);
	  },

	  /**
	   * Sets the month, using UTC or not
	   * @param {Date} date
	   * @param {String, Number} value
	   */
	  setMonth: function setMonth(date, value) {
	    return this.useUtc ? date.setUTCMonth(value) : date.setMonth(value);
	  },

	  /**
	   * Sets the date, using UTC or not
	   * @param {Date} date
	   * @param {String, Number} value
	   */
	  setDate: function setDate(date, value) {
	    return this.useUtc ? date.setUTCDate(value) : date.setDate(value);
	  },

	  /**
	   * Check if date1 is equivalent to date2, without comparing the time
	   * @see https://stackoverflow.com/a/6202196/4455925
	   * @param {Date} date1
	   * @param {Date} date2
	   */
	  compareDates: function compareDates(date1, date2) {
	    var d1 = new Date(date1.valueOf());
	    var d2 = new Date(date2.valueOf());
	    this.resetDateTime(d1);
	    this.resetDateTime(d2);
	    return d1.valueOf() === d2.valueOf();
	  },

	  /**
	   * Validates a date object
	   * @param {Date} date - an object instantiated with the new Date constructor
	   * @return {Boolean}
	   */
	  isValidDate: function isValidDate(date) {
	    if (Object.prototype.toString.call(date) !== '[object Date]') {
	      return false;
	    }

	    return !Number.isNaN(date.valueOf());
	  },

	  /**
	   * Return abbreviated week day name
	   * @param {Date} date
	   * @param {Array} days
	   * @return {String}
	   */
	  getDayNameAbbr: function getDayNameAbbr(date, days) {
	    if (_typeof(date) !== 'object') {
	      throw TypeError('Invalid Type');
	    }

	    return days[this.getDay(date)];
	  },

	  /**
	   * Return day number from abbreviated week day name
	   * @param {String} abbr
	   * @return {Number}
	   */
	  getDayFromAbbr: function getDayFromAbbr(abbr) {
	    for (var i = 0; i < en.days.length; i += 1) {
	      if (abbr.toLowerCase() === en.days[i].toLowerCase()) {
	        return i;
	      }
	    }

	    throw TypeError('Invalid week day');
	  },

	  /**
	   * Return name of the month
	   * @param {Number|Date} month
	   * @param {Array} months
	   * @return {String}
	   */
	  getMonthName: function getMonthName(month, months) {
	    if (!months) {
	      throw Error('missing 2nd parameter Months array');
	    }

	    if (_typeof(month) === 'object') {
	      return months[this.getMonth(month)];
	    }

	    if (typeof month === 'number') {
	      return months[month];
	    }

	    throw TypeError('Invalid type');
	  },

	  /**
	   * Return an abbreviated version of the month
	   * @param {Number|Date} month
	   * @param {Array} monthsAbbr
	   * @return {String}
	   */
	  getMonthNameAbbr: function getMonthNameAbbr(month, monthsAbbr) {
	    if (!monthsAbbr) {
	      throw Error('missing 2nd paramter Months array');
	    }

	    if (_typeof(month) === 'object') {
	      return monthsAbbr[this.getMonth(month)];
	    }

	    if (typeof month === 'number') {
	      return monthsAbbr[month];
	    }

	    throw TypeError('Invalid type');
	  },

	  /**
	   * Alternative get total number of days in month
	   * @param {Number} year
	   * @param {Number} month
	   * @return {Number}
	   */
	  // eslint-disable-next-line complexity
	  daysInMonth: function daysInMonth(year, month) {
	    if (/8|3|5|10/.test(month)) {
	      return 30;
	    }

	    if (month === 1) {
	      return !(year % 4) && year % 100 || !(year % 400) ? 29 : 28;
	    }

	    return 31;
	  },

	  /**
	   * Get nth suffix for date
	   * @param {Number} day
	   * @return {String}
	   */
	  // eslint-disable-next-line complexity
	  getNthSuffix: function getNthSuffix(day) {
	    switch (day) {
	      case 1:
	      case 21:
	      case 31:
	        return 'st';

	      case 2:
	      case 22:
	        return 'nd';

	      case 3:
	      case 23:
	        return 'rd';

	      default:
	        return 'th';
	    }
	  },

	  /**
	   * Formats date object
	   * @param {Date} date
	   * @param {String} formatStr
	   * @param {Object} translation
	   * @return {String}
	   */
	  formatDate: function formatDate(date, formatStr) {
	    var translation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : en;
	    var year = this.getFullYear(date);
	    var month = this.getMonth(date) + 1;
	    var day = this.getDate(date);
	    var matches = {
	      dd: "0".concat(day).slice(-2),
	      d: day,
	      yyyy: year,
	      yy: String(year).slice(2),
	      MMMM: this.getMonthName(this.getMonth(date), translation.months),
	      MMM: this.getMonthNameAbbr(this.getMonth(date), translation.monthsAbbr),
	      MM: "0".concat(month).slice(-2),
	      M: month,
	      o: this.getNthSuffix(this.getDate(date)),
	      E: this.getDayNameAbbr(date, translation.days)
	    };
	    var REGEX_FORMAT = /y{4}|y{2}|M{1,4}(?![aäe])|d{1,2}|o{1}|E{1}(?![eéi])/g;
	    return formatStr.replace(REGEX_FORMAT, function (match) {
	      return matches[match] || match;
	    });
	  },

	  /**
	   * makes date parseable
	   * to use with international dates
	   * @param {String} dateStr
	   * @param {String|Function} formatStr
	   * @param {Object} translation
	   * @param {Function} parser
	   * @return {Date | String}
	   */
	  // eslint-disable-next-line max-params,complexity,max-statements
	  parseDate: function parseDate(dateStr, formatStr) {
	    var translation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : en;
	    var parser = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	    if (!(dateStr && formatStr)) {
	      return dateStr;
	    }

	    if (typeof formatStr === 'function') {
	      if (!parser || typeof parser !== 'function') {
	        throw new Error('Parser need to be a function if you are using a custom formatter');
	      }

	      return parser(dateStr);
	    }

	    var ymd = getParsedDate({
	      formatStr: formatStr,
	      dateStr: dateStr,
	      translation: translation
	    });
	    var dat = "".concat(ymd.join('-')).concat(this.getTime());

	    if (Number.isNaN(Date.parse(dat))) {
	      return dateStr;
	    }

	    return dat;
	  },
	  getTime: function getTime() {
	    var time = 'T00:00:00';

	    if (this.useUtc) {
	      return "".concat(time, "Z");
	    }

	    return time;
	  },

	  /**
	   * Creates an array of dates for each day in between two dates.
	   * @param {Date} start
	   * @param {Date} end
	   * @return {Array}
	   */
	  createDateArray: function createDateArray(start, end) {
	    var dates = [];
	    var startTemp = start;

	    while (startTemp <= end) {
	      dates.push(new Date(startTemp));
	      startTemp = this.setDate(new Date(startTemp), this.getDate(new Date(startTemp)) + 1);
	    }

	    return dates;
	  },

	  /**
	   * Remove hours/minutes/seconds/milliseconds from a date object
	   * @param {Date} date
	   * @return {Date}
	   */
	  resetDateTime: function resetDateTime(date) {
	    return new Date(this.useUtc ? date.setUTCHours(0, 0, 0, 0) : date.setHours(0, 0, 0, 0));
	  },

	  /**
	   * Return a new date object with hours/minutes/seconds/milliseconds removed
	   * @return {Date}
	   */
	  getNewDateObject: function getNewDateObject(date) {
	    return date ? this.resetDateTime(new Date(date)) : this.resetDateTime(new Date());
	  }
	};
	var makeDateUtils = (function (useUtc) {
	  return _objectSpread2(_objectSpread2({}, utils), {}, {
	    useUtc: useUtc
	  });
	});

	var script = {
	  props: {
	    autofocus: {
	      type: Boolean,
	      "default": false
	    },
	    bootstrapStyling: {
	      type: Boolean,
	      "default": false
	    },
	    clearButton: {
	      type: Boolean,
	      "default": false
	    },
	    clearButtonIcon: {
	      type: String,
	      "default": ''
	    },
	    calendarButton: {
	      type: Boolean,
	      "default": false
	    },
	    calendarButtonIcon: {
	      type: String,
	      "default": ''
	    },
	    calendarButtonIconContent: {
	      type: String,
	      "default": ''
	    },
	    disabled: {
	      type: Boolean,
	      "default": false
	    },
	    format: {
	      type: [String, Function],
	      "default": 'dd MMM yyyy'
	    },
	    id: {
	      type: String,
	      "default": null
	    },
	    inline: {
	      type: Boolean,
	      "default": false
	    },
	    inputClass: {
	      type: [String, Object, Array],
	      "default": null
	    },
	    maxlength: {
	      type: [Number, String],
	      "default": null
	    },
	    name: {
	      type: String,
	      "default": null
	    },
	    openDate: {
	      type: [String, Date, Number],
	      "default": null,
	      validator: function validator(val) {
	        return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number';
	      }
	    },
	    parser: {
	      type: Function,
	      "default": null
	    },
	    pattern: {
	      type: String,
	      "default": null
	    },
	    placeholder: {
	      type: String,
	      "default": null
	    },
	    refName: {
	      type: String,
	      "default": ''
	    },
	    required: {
	      type: Boolean,
	      "default": false
	    },
	    showCalendarOnButtonClick: {
	      type: Boolean,
	      "default": false
	    },
	    showCalendarOnFocus: {
	      type: Boolean,
	      "default": false
	    },
	    tabindex: {
	      type: [Number, String],
	      "default": null
	    },
	    typeable: {
	      type: Boolean,
	      "default": false
	    },
	    useUtc: {
	      type: Boolean,
	      "default": false
	    }
	  }
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	    if (typeof shadowMode !== 'boolean') {
	        createInjectorSSR = createInjector;
	        createInjector = shadowMode;
	        shadowMode = false;
	    }
	    // Vue.extend constructor export interop.
	    const options = typeof script === 'function' ? script.options : script;
	    // render functions
	    if (template && template.render) {
	        options.render = template.render;
	        options.staticRenderFns = template.staticRenderFns;
	        options._compiled = true;
	        // functional template
	        if (isFunctionalTemplate) {
	            options.functional = true;
	        }
	    }
	    // scopedId
	    if (scopeId) {
	        options._scopeId = scopeId;
	    }
	    let hook;
	    if (moduleIdentifier) {
	        // server build
	        hook = function (context) {
	            // 2.3 injection
	            context =
	                context || // cached call
	                    (this.$vnode && this.$vnode.ssrContext) || // stateful
	                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
	            // 2.2 with runInNewContext: true
	            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	                context = __VUE_SSR_CONTEXT__;
	            }
	            // inject component styles
	            if (style) {
	                style.call(this, createInjectorSSR(context));
	            }
	            // register component module identifier for async chunk inference
	            if (context && context._registeredComponents) {
	                context._registeredComponents.add(moduleIdentifier);
	            }
	        };
	        // used by ssr in case component is cached and beforeCreate
	        // never gets called
	        options._ssrRegister = hook;
	    }
	    else if (style) {
	        hook = shadowMode
	            ? function (context) {
	                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	            }
	            : function (context) {
	                style.call(this, createInjector(context));
	            };
	    }
	    if (hook) {
	        if (options.functional) {
	            // register for functional component in vue file
	            const originalRender = options.render;
	            options.render = function renderWithStyleInjection(h, context) {
	                hook.call(context);
	                return originalRender(h, context);
	            };
	        }
	        else {
	            // inject component registration as beforeCreate hook
	            const existing = options.beforeCreate;
	            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	    }
	    return script;
	}

	/* script */
	const __vue_script__ = script;

	/* template */

	  /* style */
	  const __vue_inject_styles__ = undefined;
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__ = /*#__PURE__*/normalizeComponent(
	    {},
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	var script$1 = {
	  name: 'DateInput',
	  mixins: [__vue_component__],
	  props: {
	    isOpen: {
	      type: Boolean,
	      "default": false
	    },
	    resetTypedDate: {
	      type: [Date],
	      "default": null
	    },
	    selectedDate: {
	      type: Date,
	      "default": null
	    },
	    translation: {
	      type: Object,
	      "default": function _default() {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      input: null,
	      isFocusedUsed: false,
	      isBlurred: false,
	      typedDate: '',
	      utils: makeDateUtils(this.useUtc)
	    };
	  },
	  computed: {
	    computedInputClass: function computedInputClass() {
	      if (this.bootstrapStyling) {
	        if (typeof this.inputClass === 'string') {
	          return [this.inputClass, 'form-control'].join(' ');
	        }

	        return _objectSpread2({
	          'form-control': true
	        }, this.inputClass);
	      }

	      return this.inputClass;
	    },
	    formattedDate: function formattedDate() {
	      return typeof this.format === 'function' ? this.format(new Date(this.selectedDate)) : this.utils.formatDate(new Date(this.selectedDate), this.format, this.translation);
	    },
	    formattedValue: function formattedValue() {
	      if (!this.selectedDate) {
	        return null;
	      }

	      if (this.typedDate.length) {
	        return this.typedDate;
	      }

	      return this.formattedDate;
	    }
	  },
	  watch: {
	    resetTypedDate: function resetTypedDate() {
	      this.typedDate = '';
	    }
	  },
	  mounted: function mounted() {
	    this.input = this.$el.querySelector('input');
	  },
	  methods: {
	    /**
	     * emit a clearDate event
	     */
	    clearDate: function clearDate() {
	      this.$emit('clear-date');
	    },

	    /**
	     * submit typedDate and emit a blur event
	     */
	    handleInputBlur: function handleInputBlur() {
	      this.isBlurred = this.isOpen;

	      if (this.typeable) {
	        this.submitTypedDate();
	      }

	      this.$emit('blur');
	      this.$emit('close');
	      this.isFocusedUsed = false;
	    },
	    handleInputClick: function handleInputClick() {
	      var isFocusedUsed = this.showCalendarOnFocus && !this.isFocusedUsed;

	      if (!this.showCalendarOnButtonClick && !isFocusedUsed) {
	        this.toggle();
	      }

	      if (this.showCalendarOnFocus) {
	        this.isFocusedUsed = true;
	      }
	    },
	    handleInputFocus: function handleInputFocus() {
	      if (this.showCalendarOnFocus) {
	        this.$emit('open');
	      }

	      this.isBlurred = false;
	      this.$emit('focus');
	    },
	    handleKeydownEnter: function handleKeydownEnter() {
	      if (this.typeable) {
	        this.submitTypedDate();
	      }

	      this.$emit('close');
	    },
	    parseDate: function parseDate(value) {
	      return this.utils.parseDate(value, this.format, this.translation, this.parser);
	    },

	    /**
	     * Attempt to parse a typed date
	     */
	    parseTypedDate: function parseTypedDate() {
	      if (this.typeable) {
	        var parsableDate = this.parseDate(this.input.value);
	        var parsedDate = Date.parse(parsableDate);

	        if (!Number.isNaN(parsedDate)) {
	          this.typedDate = this.input.value;
	          this.$emit('typed-date', new Date(parsedDate));
	        }
	      }
	    },

	    /**
	     * Submits a typed date if it's valid
	     */
	    submitTypedDate: function submitTypedDate() {
	      var parsableDate = this.parseDate(this.input.value);
	      var parsedDate = Date.parse(parsableDate);

	      if (Number.isNaN(parsedDate)) {
	        this.clearDate();
	      } else {
	        this.input.value = this.formattedDate;
	        this.typedDate = '';
	        this.$emit('typed-date', parsedDate);
	      }
	    },
	    toggle: function toggle() {
	      if (!this.isOpen && this.isBlurred) {
	        this.isBlurred = false;
	        return;
	      }

	      this.$emit(this.isOpen ? 'close' : 'open');
	    }
	  }
	};

	/* script */
	const __vue_script__$1 = script$1;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    { class: { "input-group": _vm.bootstrapStyling } },
	    [
	      _vm._t("beforeDateInput"),
	      _vm._v(" "),
	      _vm.calendarButton
	        ? _c(
	            "span",
	            {
	              staticClass: "vdp-datepicker__calendar-button",
	              class: {
	                "input-group-prepend": _vm.bootstrapStyling,
	                "calendar-btn-disabled": _vm.disabled
	              },
	              on: { click: _vm.toggle }
	            },
	            [
	              _c(
	                "span",
	                { class: { "input-group-text": _vm.bootstrapStyling } },
	                [
	                  _vm._t("calendarBtn", [
	                    _c("i", { class: _vm.calendarButtonIcon }, [
	                      _vm._v(
	                        "\n          " +
	                          _vm._s(_vm.calendarButtonIconContent) +
	                          "\n          "
	                      ),
	                      !_vm.calendarButtonIcon
	                        ? _c("span", [_vm._v("…")])
	                        : _vm._e()
	                    ])
	                  ])
	                ],
	                2
	              )
	            ]
	          )
	        : _vm._e(),
	      _vm._v(" "),
	      _c("input", {
	        ref: _vm.refName,
	        class: _vm.computedInputClass,
	        attrs: {
	          id: _vm.id,
	          autocomplete: "off",
	          autofocus: _vm.autofocus,
	          "clear-button": _vm.clearButton,
	          disabled: _vm.disabled,
	          maxlength: _vm.maxlength,
	          name: _vm.name,
	          pattern: _vm.pattern,
	          placeholder: _vm.placeholder,
	          readonly: !_vm.typeable,
	          required: _vm.required,
	          tabindex: _vm.tabindex,
	          type: _vm.inline ? "hidden" : null
	        },
	        domProps: { value: _vm.formattedValue },
	        on: {
	          blur: _vm.handleInputBlur,
	          click: _vm.handleInputClick,
	          focus: _vm.handleInputFocus,
	          keydown: [
	            function($event) {
	              if (
	                !$event.type.indexOf("key") &&
	                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
	              ) {
	                return null
	              }
	              $event.preventDefault();
	              return _vm.handleKeydownEnter($event)
	            },
	            function($event) {
	              if (
	                !$event.type.indexOf("key") &&
	                _vm._k(
	                  $event.keyCode,
	                  "escape",
	                  undefined,
	                  $event.key,
	                  undefined
	                )
	              ) {
	                return null
	              }
	              $event.preventDefault();
	              return _vm.$emit("close")
	            }
	          ],
	          keyup: _vm.parseTypedDate
	        }
	      }),
	      _vm._v(" "),
	      _vm.clearButton && _vm.selectedDate
	        ? _c(
	            "span",
	            {
	              staticClass: "vdp-datepicker__clear-button",
	              class: { "input-group-append": _vm.bootstrapStyling },
	              on: {
	                click: function($event) {
	                  return _vm.clearDate()
	                }
	              }
	            },
	            [
	              _c(
	                "span",
	                { class: { "input-group-text": _vm.bootstrapStyling } },
	                [
	                  _vm._t("clearBtn", [
	                    _c("i", { class: _vm.clearButtonIcon }, [
	                      !_vm.clearButtonIcon
	                        ? _c("span", [_vm._v("×")])
	                        : _vm._e()
	                    ])
	                  ])
	                ],
	                2
	              )
	            ]
	          )
	        : _vm._e(),
	      _vm._v(" "),
	      _vm._t("afterDateInput")
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$1 = undefined;
	  /* scoped */
	  const __vue_scope_id__$1 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$1 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$1 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__$1,
	    __vue_script__$1,
	    __vue_scope_id__$1,
	    __vue_is_functional_template__$1,
	    __vue_module_identifier__$1,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	var $some = arrayIteration.some;
	var STRICT_METHOD$2 = arrayMethodIsStrict('some');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('some'); // `Array.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.some

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$2 || !USES_TO_LENGTH$5
	}, {
	  some: function some(callbackfn
	  /* , thisArg */
	  ) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var FAILS_ON_PRIMITIVES = fails(function () {
	  objectKeys(1);
	}); // `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES
	}, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var cellUtils = {
	  configExists: function configExists(obj) {
	    return typeof obj !== 'undefined' && Object.keys(obj).length > 0;
	  },
	  isDefined: function isDefined(obj, prop) {
	    return this.configExists(obj) && typeof obj[prop] !== 'undefined';
	  },
	  hasArray: function hasArray(obj, prop) {
	    return this.isDefined(obj, prop) && obj[prop].length > 0;
	  },
	  hasDate: function hasDate(obj, prop) {
	    return this.isDefined(obj, prop) && this.utils.isValidDate(obj[prop]);
	  },
	  dayMonthYear: function dayMonthYear(obj, prop) {
	    var utils = this.utils;
	    var hasDate = this.hasDate(obj, prop);

	    if (!hasDate) {
	      return {
	        day: undefined,
	        month: undefined,
	        year: undefined
	      };
	    }

	    var d = obj[prop];
	    return {
	      day: utils.getDate(d),
	      month: utils.getMonth(d),
	      year: utils.getFullYear(d)
	    };
	  }
	};
	var makeCellUtils = (function (utils) {
	  return _objectSpread2(_objectSpread2({}, cellUtils), {}, {
	    utils: utils
	  });
	});

	var DisabledDate = /*#__PURE__*/function () {
	  function DisabledDate(utils, disabledDates) {
	    _classCallCheck(this, DisabledDate);

	    this._utils = utils;
	    this._disabledDates = disabledDates;
	  }

	  _createClass(DisabledDate, [{
	    key: "daysInMonth",
	    value: function daysInMonth(date) {
	      var utils = this._utils;
	      var month = utils.getMonth(date);
	      var year = utils.getFullYear(date);
	      return utils.daysInMonth(year, month);
	    }
	  }, {
	    key: "isDateDisabledVia",
	    value: function isDateDisabledVia(date) {
	      var _this = this;

	      var disabledDates = this._disabledDates;
	      var has = this.config.has;
	      return {
	        to: function to() {
	          return has.to && date < disabledDates.to;
	        },
	        from: function from() {
	          return has.from && date > disabledDates.from;
	        },
	        range: function range() {
	          if (!has.ranges) return false;
	          var ranges = disabledDates.ranges;
	          var u = makeCellUtils(_this._utils);
	          return ranges.some(function (thisRange) {
	            var hasFrom = u.isDefined(thisRange, 'from');
	            var hasTo = u.isDefined(thisRange, 'to');
	            return hasFrom && hasTo && date < thisRange.to && date > thisRange.from;
	          });
	        },
	        customPredictor: function customPredictor() {
	          return has.customPredictor && disabledDates.customPredictor(date);
	        },
	        specificDate: function specificDate() {
	          if (!has.specificDates) return false;
	          return disabledDates.dates.some(function (d) {
	            return _this._utils.compareDates(date, d);
	          });
	        },
	        daysOfWeek: function daysOfWeek() {
	          if (!has.daysOfWeek) return false;
	          return disabledDates.days.indexOf(_this._utils.getDay(date)) !== -1;
	        },
	        daysOfMonth: function daysOfMonth() {
	          if (!has.daysOfMonth) return false;
	          return disabledDates.daysOfMonth.indexOf(_this._utils.getDate(date)) !== -1;
	        }
	      };
	    }
	  }, {
	    key: "isMonthDisabledVia",
	    value: function isMonthDisabledVia(date) {
	      var _this$config = this.config,
	          _from = _this$config.from,
	          has = _this$config.has,
	          _to = _this$config.to;

	      var month = this._utils.getMonth(date);

	      var year = this._utils.getFullYear(date);

	      return {
	        to: function to() {
	          var isYearInPast = has.to && year < _to.year;

	          if (isYearInPast) {
	            return true;
	          }

	          return has.to && month < _to.month && year <= _to.year;
	        },
	        from: function from() {
	          var isYearInFuture = has.from && year > _from.year;

	          if (isYearInFuture) {
	            return true;
	          }

	          return has.from && month > _from.month && year >= _from.year;
	        }
	      };
	    }
	  }, {
	    key: "isYearDisabledVia",
	    value: function isYearDisabledVia(date) {
	      var _this$config2 = this.config,
	          _from2 = _this$config2.from,
	          has = _this$config2.has,
	          _to2 = _this$config2.to;

	      var year = this._utils.getFullYear(date);

	      return {
	        to: function to() {
	          return has.to && year < _to2.year;
	        },
	        from: function from() {
	          return has.from && year > _from2.year;
	        }
	      };
	    }
	    /**
	     * Checks if the given date should be disabled
	     * @param {Date} date
	     * @return {Boolean}
	     */
	    // eslint-disable-next-line complexity,max-statements

	  }, {
	    key: "isDateDisabled",
	    value: function isDateDisabled(date) {
	      if (!this.config.exists) return false;
	      var isDisabledVia = this.isDateDisabledVia(date);
	      return isDisabledVia.to() || isDisabledVia.from() || isDisabledVia.range() || isDisabledVia.specificDate() || isDisabledVia.daysOfWeek() || isDisabledVia.daysOfMonth() || isDisabledVia.customPredictor();
	    }
	    /**
	     * Checks if the given month should be disabled
	     * @param {Date} date
	     * @return {Boolean}
	     */
	    // eslint-disable-next-line complexity,max-statements

	  }, {
	    key: "isMonthDisabled",
	    value: function isMonthDisabled(date) {
	      var config = this.config;
	      var isDisabledVia = this.isMonthDisabledVia(date);

	      if (!config.exists) {
	        return false;
	      }

	      if (isDisabledVia.to() || isDisabledVia.from()) {
	        return true;
	      } // now we have to check each day of the month


	      for (var i = 1; i <= this.daysInMonth(date); i += 1) {
	        var dayDate = new Date(date);
	        dayDate.setDate(i); // if at least one day of this month is NOT disabled,
	        // we can conclude that this month SHOULD be selectable

	        if (!this.isDateDisabled(dayDate)) {
	          return false;
	        }
	      }

	      return true;
	    }
	    /**
	     * Checks if the given year should be disabled
	     * @param {Date} date
	     * @return {Boolean}
	     */
	    // eslint-disable-next-line complexity,max-statements

	  }, {
	    key: "isYearDisabled",
	    value: function isYearDisabled(date) {
	      var config = this.config;
	      var isDisabledVia = this.isYearDisabledVia(date);

	      if (!config.exists) {
	        return false;
	      }

	      if (isDisabledVia.to() || isDisabledVia.from()) {
	        return true;
	      } // now we have to check each month of the year


	      for (var i = 0; i < 12; i += 1) {
	        var monthDate = new Date(date);
	        monthDate.setMonth(i); // if at least one month of this year is NOT disabled,
	        // we can conclude that this year SHOULD be selectable

	        if (!this.isMonthDisabled(monthDate)) {
	          return false;
	        }
	      }

	      return true;
	    }
	  }, {
	    key: "config",
	    get: function get() {
	      var disabledDates = this._disabledDates;
	      var utils = makeCellUtils(this._utils);
	      return {
	        exists: utils.configExists(disabledDates),
	        to: utils.dayMonthYear(disabledDates, 'to'),
	        from: utils.dayMonthYear(disabledDates, 'from'),
	        has: {
	          customPredictor: utils.isDefined(disabledDates, 'customPredictor'),
	          daysOfMonth: utils.hasArray(disabledDates, 'daysOfMonth'),
	          daysOfWeek: utils.hasArray(disabledDates, 'days'),
	          from: utils.hasDate(disabledDates, 'from'),
	          ranges: utils.hasArray(disabledDates, 'ranges'),
	          specificDates: utils.hasArray(disabledDates, 'dates'),
	          to: utils.hasDate(disabledDates, 'to')
	        }
	      };
	    }
	  }]);

	  return DisabledDate;
	}();

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	var script$2 = {
	  name: 'PickerHeader',
	  props: {
	    isNextDisabled: {
	      type: Boolean,
	      required: true
	    },
	    isPreviousDisabled: {
	      type: Boolean,
	      required: true
	    },
	    isRtl: {
	      type: Boolean,
	      required: true
	    }
	  },
	  computed: {
	    /**
	     * Is the left hand navigation button disabled?
	     * @return {Boolean}
	     */
	    isLeftNavDisabled: function isLeftNavDisabled() {
	      return this.isRtl ? this.isNextDisabled : this.isPreviousDisabled;
	    },

	    /**
	     * Is the right hand navigation button disabled?
	     * @return {Boolean}
	     */
	    isRightNavDisabled: function isRightNavDisabled() {
	      return this.isRtl ? this.isPreviousDisabled : this.isNextDisabled;
	    }
	  }
	};

	/* script */
	const __vue_script__$2 = script$2;

	/* template */
	var __vue_render__$1 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "header",
	    [
	      _c(
	        "span",
	        {
	          staticClass: "prev",
	          class: { disabled: _vm.isLeftNavDisabled },
	          on: {
	            click: function($event) {
	              return _vm.$emit(_vm.isRtl ? "next" : "previous")
	            }
	          }
	        },
	        [
	          _vm._t("prevIntervalBtn", [
	            _c("span", { staticClass: "default" }, [_vm._v("<")])
	          ])
	        ],
	        2
	      ),
	      _vm._v(" "),
	      _vm._t("default"),
	      _vm._v(" "),
	      _c(
	        "span",
	        {
	          staticClass: "next",
	          class: { disabled: _vm.isRightNavDisabled },
	          on: {
	            click: function($event) {
	              return _vm.$emit(_vm.isRtl ? "previous" : "next")
	            }
	          }
	        },
	        [
	          _vm._t("nextIntervalBtn", [
	            _c("span", { staticClass: "default" }, [_vm._v(">")])
	          ])
	        ],
	        2
	      )
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$1 = [];
	__vue_render__$1._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$2 = undefined;
	  /* scoped */
	  const __vue_scope_id__$2 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$2 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$2 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
	    __vue_inject_styles__$2,
	    __vue_script__$2,
	    __vue_scope_id__$2,
	    __vue_is_functional_template__$2,
	    __vue_module_identifier__$2,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	var script$3 = {
	  components: {
	    PickerHeader: __vue_component__$2
	  },
	  inheritAttrs: false,
	  props: {
	    disabledDates: {
	      type: Object,
	      "default": function _default() {
	        return {};
	      }
	    },
	    isRtl: {
	      type: Boolean,
	      "default": false
	    },
	    isUpDisabled: {
	      type: Boolean,
	      "default": false
	    },
	    pageDate: {
	      type: Date,
	      "default": null
	    },
	    selectedDate: {
	      type: Date,
	      "default": null
	    },
	    showHeader: {
	      type: Boolean,
	      "default": true
	    },
	    translation: {
	      type: Object,
	      "default": function _default() {
	        return {};
	      }
	    },
	    useUtc: {
	      type: Boolean,
	      "default": false
	    }
	  },
	  data: function data() {
	    return {
	      utils: makeDateUtils(this.useUtc)
	    };
	  },
	  computed: {
	    /**
	     * A look-up object created from 'disabledDates' prop
	     * @return {Object}
	     */
	    disabledConfig: function disabledConfig() {
	      return new DisabledDate(this.utils, this.disabledDates).config;
	    },

	    /**
	     * Returns the current page's full year as an integer.
	     * @return {Number}
	     */
	    pageYear: function pageYear() {
	      return this.utils.getFullYear(this.pageDate);
	    }
	  },
	  methods: {
	    /**
	     * Changes the page up or down
	     * @param {Number} incrementBy
	     */
	    changePage: function changePage(incrementBy) {
	      var date = this.pageDate;
	      this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
	      this.$emit('page-change', date);
	    },

	    /**
	     * Emits a 'select' or 'select-disabled' event
	     * @param {Object} cell
	     */
	    select: function select(cell) {
	      if (cell.isDisabled) {
	        this.$emit('select-disabled', cell);
	      } else {
	        this.$emit('select', cell);
	      }
	    },

	    /**
	     * Increment the current page
	     */
	    nextPage: function nextPage() {
	      if (!this.isNextDisabled) {
	        this.changePage(+1);
	      }
	    },

	    /**
	     * Decrement the page
	     */
	    previousPage: function previousPage() {
	      if (!this.isPreviousDisabled) {
	        this.changePage(-1);
	      }
	    }
	  }
	};

	/* script */
	const __vue_script__$3 = script$3;

	/* template */

	  /* style */
	  const __vue_inject_styles__$3 = undefined;
	  /* scoped */
	  const __vue_scope_id__$3 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$3 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$3 = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
	    {},
	    __vue_inject_styles__$3,
	    __vue_script__$3,
	    __vue_scope_id__$3,
	    __vue_is_functional_template__$3,
	    __vue_module_identifier__$3,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	var HighlightedDate = /*#__PURE__*/function () {
	  function HighlightedDate(utils, disabledDates, highlighted) {
	    _classCallCheck(this, HighlightedDate);

	    this._utils = utils;
	    this._disabledDates = disabledDates;
	    this._highlighted = highlighted;
	  }

	  _createClass(HighlightedDate, [{
	    key: "isDateDisabled",
	    value: function isDateDisabled(date) {
	      var utils = this._utils;
	      var disabledDates = this._disabledDates;
	      return new DisabledDate(utils, disabledDates).isDateDisabled(date);
	    }
	  }, {
	    key: "isHighlightingNotPossible",
	    value: function isHighlightingNotPossible(date) {
	      var config = this.config;
	      if (!config.exists) return false;
	      return !config.has.includeDisabled && this.isDateDisabled(date);
	    }
	  }, {
	    key: "isDateHighlightedVia",
	    value: function isDateHighlightedVia(date) {
	      var _this = this;

	      var highlightedDates = this._highlighted;
	      var has = this.config.has;
	      return {
	        to: function to() {
	          return has.to && date <= highlightedDates.to;
	        },
	        from: function from() {
	          return has.from && date >= highlightedDates.from;
	        },
	        customPredictor: function customPredictor() {
	          return has.customPredictor && highlightedDates.customPredictor(date);
	        },
	        specificDate: function specificDate() {
	          if (!has.specificDates) return false;
	          return highlightedDates.dates.some(function (d) {
	            return _this._utils.compareDates(date, d);
	          });
	        },
	        daysOfWeek: function daysOfWeek() {
	          if (!has.daysOfWeek) return false;
	          return highlightedDates.days.indexOf(_this._utils.getDay(date)) !== -1;
	        },
	        daysOfMonth: function daysOfMonth() {
	          if (!has.daysOfMonth) return false;
	          return highlightedDates.daysOfMonth.indexOf(_this._utils.getDate(date)) !== -1;
	        }
	      };
	    } // eslint-disable-next-line complexity,max-statements

	  }, {
	    key: "isDateHighlighted",
	    value: function isDateHighlighted(date) {
	      if (this.isHighlightingNotPossible(date)) return false;
	      var isHighlightedVia = this.isDateHighlightedVia(date);
	      return isHighlightedVia.to() && isHighlightedVia.from() || isHighlightedVia.specificDate() || isHighlightedVia.daysOfWeek() || isHighlightedVia.daysOfMonth() || isHighlightedVia.customPredictor();
	    }
	  }, {
	    key: "config",
	    get: function get() {
	      var highlightedDates = this._highlighted;
	      var utils = makeCellUtils(this._utils);
	      return {
	        exists: utils.configExists(highlightedDates),
	        to: utils.dayMonthYear(highlightedDates, 'to'),
	        from: utils.dayMonthYear(highlightedDates, 'from'),
	        has: {
	          customPredictor: utils.isDefined(highlightedDates, 'customPredictor'),
	          daysOfMonth: utils.hasArray(highlightedDates, 'daysOfMonth'),
	          daysOfWeek: utils.hasArray(highlightedDates, 'days'),
	          from: utils.hasDate(highlightedDates, 'from'),
	          specificDates: utils.hasArray(highlightedDates, 'dates'),
	          to: utils.hasDate(highlightedDates, 'to'),
	          includeDisabled: utils.isDefined(highlightedDates, 'includeDisabled') && highlightedDates.includeDisabled
	        }
	      };
	    }
	  }]);

	  return HighlightedDate;
	}();

	var script$4 = {
	  name: 'PickerDay',
	  mixins: [__vue_component__$3],
	  props: {
	    dayCellContent: {
	      type: Function,
	      "default": function _default(day) {
	        return day.date;
	      }
	    },
	    highlighted: {
	      type: Object,
	      "default": function _default() {
	        return {};
	      }
	    },
	    firstDayOfWeek: {
	      type: String,
	      "default": 'sun'
	    },
	    showFullMonthName: {
	      type: Boolean,
	      "default": false
	    },
	    showEdgeDates: {
	      type: Boolean,
	      "default": true
	    },
	    useDateRange: {
	      type: Boolean,
	      "default": false
	    }
	  },
	  computed: {
	    /**
	     * Sets an array with all days to show this month
	     * @return {Array}
	     */
	    cells: function cells() {
	      var days = [];
	      var daysInCalendar = this.daysFromPrevMonth + this.daysInMonth + this.daysFromNextMonth;
	      var dObj = this.firstCellDate();

	      for (var i = 0; i < daysInCalendar; i += 1) {
	        days.push(this.makeDay(i, dObj));
	        this.utils.setDate(dObj, this.utils.getDate(dObj) + 1);
	      }

	      return days;
	    },

	    /**
	     * Gets the name of the month the current page is on
	     * @return {String}
	     */
	    currMonthName: function currMonthName() {
	      var monthName = this.showFullMonthName ? this.translation.months : this.translation.monthsAbbr;
	      return this.utils.getMonthNameAbbr(this.pageMonth, monthName);
	    },

	    /**
	     * Gets the name of the year that current page is on
	     * @return {String}
	     */
	    currYearName: function currYearName() {
	      var yearSuffix = this.translation.yearSuffix;
	      return "".concat(this.pageYear).concat(yearSuffix);
	    },

	    /**
	     * Returns an array of day names
	     * @return {String[]}
	     */
	    daysOfWeek: function daysOfWeek() {
	      return this.translation.getDaysStartingOn(this.firstDayOfWeekNumber);
	    },

	    /**
	     * Returns the number of days in this month
	     * @return {String[]}
	     */
	    daysInMonth: function daysInMonth() {
	      return this.utils.getDaysInMonth(this.pageDate);
	    },

	    /**
	     * Calculates how many days to show from the previous month
	     * @return {number}
	     */
	    daysFromPrevMonth: function daysFromPrevMonth() {
	      var firstOfMonthDayNumber = this.utils.getDay(this.pageDate);
	      return (7 - this.firstDayOfWeekNumber + firstOfMonthDayNumber) % 7;
	    },

	    /**
	     * Calculates how many days to show from the next month
	     * @return {number}
	     */
	    daysFromNextMonth: function daysFromNextMonth() {
	      var daysThisAndPrevMonth = this.daysFromPrevMonth + this.daysInMonth;
	      return Math.ceil(daysThisAndPrevMonth / 7) * 7 - daysThisAndPrevMonth;
	    },

	    /**
	     * Returns first-day-of-week as a number (Sunday is 0)
	     * @return {Number}
	     */
	    firstDayOfWeekNumber: function firstDayOfWeekNumber() {
	      return this.utils.getDayFromAbbr(this.firstDayOfWeek);
	    },

	    /**
	     * A look-up object created from 'highlighted' prop
	     * @return {Object}
	     */
	    highlightedConfig: function highlightedConfig() {
	      return new HighlightedDate(this.utils, this.disabledDates, this.highlighted).config;
	    },

	    /**
	     * Is the next month disabled?
	     * @return {Boolean}
	     */
	    isNextDisabled: function isNextDisabled() {
	      if (!this.disabledConfig.has.from) {
	        return false;
	      }

	      return this.disabledConfig.from.month <= this.pageMonth && this.disabledConfig.from.year <= this.pageYear;
	    },

	    /**
	     * Is the previous month disabled?
	     * @return {Boolean}
	     */
	    isPreviousDisabled: function isPreviousDisabled() {
	      if (!this.disabledConfig.has.to) {
	        return false;
	      }

	      return this.disabledConfig.to.month >= this.pageMonth && this.disabledConfig.to.year >= this.pageYear;
	    },

	    /**
	     * Returns the current page's month as an integer.
	     * @return {Number}
	     */
	    pageMonth: function pageMonth() {
	      return this.utils.getMonth(this.pageDate);
	    },

	    /**
	     * Display the current page's month & year as the title.
	     * @return {String}
	     */
	    pageTitleDay: function pageTitleDay() {
	      return this.translation.ymd ? "".concat(this.currYearName, " ").concat(this.currMonthName) : "".concat(this.currMonthName, " ").concat(this.currYearName);
	    },

	    /**
	     * The first day of the next page's month.
	     * @return {Date}
	     */
	    firstOfNextMonth: function firstOfNextMonth() {
	      var d = new Date(this.pageDate);
	      return new Date(this.utils.setMonth(d, this.utils.getMonth(d) + 1));
	    },
	    dayWrapperClasses: function dayWrapperClasses() {
	      return {
	        'date-wrapper__cell-parent': true,
	        'date-wrapper__cell-parent--range': this.useDateRange
	      };
	    }
	  },
	  methods: {
	    /**
	     * Changes the page up or down (overrides changePage in pickerMixin)
	     * @param {Number} incrementBy
	     */
	    changePage: function changePage(incrementBy) {
	      var date = this.pageDate;
	      this.utils.setMonth(date, this.utils.getMonth(date) + incrementBy);
	      this.$emit('page-change', date);
	    },

	    /**
	     * Set the class for a specific day
	     * @param {Object} day
	     * @return {Object}
	     */
	    dayClasses: function dayClasses(day) {
	      return {
	        'selected': day.isSelected,
	        'disabled': day.isDisabled,
	        'highlighted': day.isHighlighted,
	        'muted': day.isPreviousMonth || day.isNextMonth,
	        'today': this.useDateRange ? false : day.isToday,
	        'weekend': day.isWeekend,
	        'sat': day.isSaturday,
	        'sun': day.isSunday,
	        'highlight-start': day.isHighlightStart,
	        'highlight-end': day.isHighlightEnd
	      };
	    },

	    /**
	     * Whether a day is disabled
	     * @param {Date} date to check if disabled
	     * @return {Boolean}
	     */
	    isDisabledDate: function isDisabledDate(date) {
	      return new DisabledDate(this.utils, this.disabledDates).isDateDisabled(date);
	    },

	    /**
	     * Whether a day is highlighted
	     * (only if it is not disabled already except when highlighted.includeDisabled is true)
	     * @param {Date} date to check if highlighted
	     * @return {Boolean}
	     */
	    isHighlightedDate: function isHighlightedDate(date) {
	      var dateWithoutTime = this.utils.resetDateTime(date);
	      return new HighlightedDate(this.utils, this.disabledDates, this.highlighted).isDateHighlighted(dateWithoutTime);
	    },

	    /**
	     * Whether a day is highlighted and it is the last date
	     * in the highlighted range of dates
	     * @param {Date} date end highlight
	     * @return {Boolean}
	     */
	    isHighlightEnd: function isHighlightEnd(date) {
	      var config = this.highlightedConfig;
	      return this.isHighlightedDate(date) && config.to.year === this.utils.getFullYear(date) && config.to.month === this.utils.getMonth(date) && config.to.day === this.utils.getDate(date);
	    },

	    /**
	     * Whether a day is highlighted and it is the first date
	     * in the highlighted range of dates
	     * @param {Date} date start highlight
	     * @return {Boolean}
	     */
	    isHighlightStart: function isHighlightStart(date) {
	      var config = this.highlightedConfig;
	      return this.isHighlightedDate(date) && config.from.year === this.utils.getFullYear(date) && config.from.month === this.utils.getMonth(date) && config.from.day === this.utils.getDate(date);
	    },

	    /**
	     * Whether a day is selected
	     * @param {Date} dObj to check if selected
	     * @return {Boolean}
	     */
	    isSelectedDate: function isSelectedDate(dObj) {
	      return this.selectedDate && this.utils.compareDates(this.selectedDate, dObj);
	    },

	    /**
	     * Defines the objects within the days array
	     * @param  {id}  id
	     * @param  {Date}  dObj
	     * @return {Object}
	     */
	    // eslint-disable-next-line complexity
	    makeDay: function makeDay(id, dObj) {
	      var isNextMonth = dObj >= this.firstOfNextMonth;
	      var isPreviousMonth = dObj < this.pageDate;
	      var isSaturday = this.utils.getDay(dObj) === 6;
	      var isSunday = this.utils.getDay(dObj) === 0;
	      var showDate = this.showEdgeDates || !(isPreviousMonth || isNextMonth);
	      return {
	        date: showDate ? this.utils.getDate(dObj) : '',
	        timestamp: dObj.valueOf(),
	        isSelected: this.isSelectedDate(dObj),
	        isDisabled: showDate ? this.isDisabledDate(dObj) : true,
	        isHighlighted: this.isHighlightedDate(dObj),
	        isHighlightStart: this.isHighlightStart(dObj),
	        isHighlightEnd: this.isHighlightEnd(dObj),
	        isToday: this.utils.compareDates(dObj, new Date()),
	        isWeekend: isSaturday || isSunday,
	        isSaturday: isSaturday,
	        isSunday: isSunday,
	        isPreviousMonth: isPreviousMonth,
	        isNextMonth: isNextMonth
	      };
	    },

	    /**
	     * Set up a new date object to the first day of the current 'page'
	     * @return Date
	     */
	    firstCellDate: function firstCellDate() {
	      var d = this.pageDate;
	      var firstOfMonth = this.useUtc ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)) : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
	      return new Date(firstOfMonth.setDate(firstOfMonth.getDate() - this.daysFromPrevMonth));
	    },
	    handleHighlightedDate: function handleHighlightedDate(cell) {
	      this.$emit('set-highlighted-date', cell);
	    },
	    handleResetHighlightedDate: function handleResetHighlightedDate() {
	      this.$emit('remove-highlighted-date');
	    }
	  }
	};

	/* script */
	const __vue_script__$4 = script$4;

	/* template */
	var __vue_render__$2 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    { staticClass: "picker-view" },
	    [
	      _vm._t("beforeCalendarHeaderDay"),
	      _vm._v(" "),
	      _vm.showHeader
	        ? _c(
	            "PickerHeader",
	            {
	              attrs: {
	                "is-next-disabled": _vm.isNextDisabled,
	                "is-previous-disabled": _vm.isPreviousDisabled,
	                "is-rtl": _vm.isRtl
	              },
	              on: { next: _vm.nextPage, previous: _vm.previousPage }
	            },
	            [
	              _c(
	                "span",
	                {
	                  staticClass: "day__month_btn",
	                  class: {
	                    up: !_vm.isUpDisabled,
	                    "up--disabled": _vm.useDateRange
	                  },
	                  on: {
	                    click: function($event) {
	                      return _vm.$emit("set-view", "month")
	                    }
	                  }
	                },
	                [_vm._v("\n      " + _vm._s(_vm.pageTitleDay) + "\n    ")]
	              ),
	              _vm._v(" "),
	              _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
	              _vm._v(" "),
	              _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
	            ],
	            2
	          )
	        : _vm._e(),
	      _vm._v(" "),
	      _c("div", { class: { "flex-rtl": _vm.isRtl } }, [
	        _c(
	          "div",
	          { staticClass: "day-header-wrapper" },
	          _vm._l(_vm.daysOfWeek, function(day) {
	            return _c("span", { key: day, staticClass: "day-header" }, [
	              _vm._v("\n        " + _vm._s(day) + "\n      ")
	            ])
	          }),
	          0
	        ),
	        _vm._v(" "),
	        _c(
	          "div",
	          { ref: "cells", staticClass: "date-wrapper" },
	          _vm._l(_vm.cells, function(cell) {
	            return _c(
	              "div",
	              { key: cell.timestamp, class: _vm.dayWrapperClasses },
	              [
	                _c(
	                  "span",
	                  {
	                    staticClass: "cell day",
	                    class: _vm.dayClasses(cell),
	                    on: {
	                      click: function($event) {
	                        return _vm.select(cell)
	                      },
	                      mouseover: function($event) {
	                        return _vm.handleHighlightedDate(cell)
	                      },
	                      mouseout: _vm.handleResetHighlightedDate
	                    }
	                  },
	                  [
	                    _vm._v(
	                      "\n          " +
	                        _vm._s(_vm.dayCellContent(cell)) +
	                        "\n        "
	                    )
	                  ]
	                )
	              ]
	            )
	          }),
	          0
	        )
	      ]),
	      _vm._v(" "),
	      _vm._t("calendarFooterDay")
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$2 = [];
	__vue_render__$2._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$4 = undefined;
	  /* scoped */
	  const __vue_scope_id__$4 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$4 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$4 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
	    __vue_inject_styles__$4,
	    __vue_script__$4,
	    __vue_scope_id__$4,
	    __vue_is_functional_template__$4,
	    __vue_module_identifier__$4,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	var script$5 = {
	  name: 'PickerMonth',
	  mixins: [__vue_component__$3],
	  computed: {
	    /**
	     * Sets an array with all months to show this year
	     * @return {Array}
	     */
	    cells: function cells() {
	      var d = this.pageDate;
	      var months = []; // set up a new date object to the beginning of the current 'page'

	      var dObj = this.useUtc ? new Date(Date.UTC(d.getUTCFullYear(), 0, d.getUTCDate())) : new Date(d.getFullYear(), 0, d.getDate(), d.getHours(), d.getMinutes());

	      for (var i = 0; i < 12; i += 1) {
	        months.push({
	          month: this.utils.getMonthName(i, this.translation.months),
	          timestamp: dObj.valueOf(),
	          isSelected: this.isSelectedMonth(dObj),
	          isDisabled: this.isDisabledMonth(dObj)
	        });
	        this.utils.setMonth(dObj, this.utils.getMonth(dObj) + 1);
	      }

	      return months;
	    },

	    /**
	     * Is the next year disabled?
	     * @return {Boolean}
	     */
	    isNextDisabled: function isNextDisabled() {
	      if (!this.disabledConfig.has.from) {
	        return false;
	      }

	      return this.disabledConfig.from.year <= this.pageYear;
	    },

	    /**
	     * Is the previous year disabled?
	     * @return {Boolean}
	     */
	    isPreviousDisabled: function isPreviousDisabled() {
	      if (!this.disabledConfig.has.to) {
	        return false;
	      }

	      return this.disabledConfig.to.year >= this.pageYear;
	    },

	    /**
	     * Display the current page's year as the title.
	     * @return {String}
	     */
	    pageTitleMonth: function pageTitleMonth() {
	      var yearSuffix = this.translation.yearSuffix;
	      return "".concat(this.pageYear).concat(yearSuffix);
	    }
	  },
	  methods: {
	    /**
	     * Whether a month is disabled
	     * @param {Date} date
	     * @return {Boolean}
	     */
	    isDisabledMonth: function isDisabledMonth(date) {
	      return new DisabledDate(this.utils, this.disabledDates).isMonthDisabled(date);
	    },

	    /**
	     * Whether the selected date is in this month
	     * @param {Date} date
	     * @return {Boolean}
	     */
	    isSelectedMonth: function isSelectedMonth(date) {
	      var month = this.utils.getMonth(date);
	      var year = this.utils.getFullYear(date);
	      return this.selectedDate && year === this.utils.getFullYear(this.selectedDate) && month === this.utils.getMonth(this.selectedDate);
	    }
	  }
	};

	/* script */
	const __vue_script__$5 = script$5;

	/* template */
	var __vue_render__$3 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    { staticClass: "picker-view" },
	    [
	      _vm._t("beforeCalendarHeaderMonth"),
	      _vm._v(" "),
	      _vm.showHeader
	        ? _c(
	            "PickerHeader",
	            {
	              attrs: {
	                "is-next-disabled": _vm.isNextDisabled,
	                "is-previous-disabled": _vm.isPreviousDisabled,
	                "is-rtl": _vm.isRtl
	              },
	              on: { next: _vm.nextPage, previous: _vm.previousPage }
	            },
	            [
	              _c(
	                "span",
	                {
	                  staticClass: "month__year_btn",
	                  class: { up: !_vm.isUpDisabled },
	                  on: {
	                    click: function($event) {
	                      return _vm.$emit("set-view", "year")
	                    }
	                  }
	                },
	                [_vm._v("\n      " + _vm._s(_vm.pageTitleMonth) + "\n    ")]
	              ),
	              _vm._v(" "),
	              _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
	              _vm._v(" "),
	              _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
	            ],
	            2
	          )
	        : _vm._e(),
	      _vm._v(" "),
	      _c(
	        "div",
	        { ref: "cells", staticClass: "date-wrapper" },
	        _vm._l(_vm.cells, function(cell) {
	          return _c(
	            "span",
	            {
	              key: cell.timestamp,
	              staticClass: "cell month",
	              class: { selected: cell.isSelected, disabled: cell.isDisabled },
	              on: {
	                click: function($event) {
	                  return _vm.select(cell)
	                }
	              }
	            },
	            [_vm._v("\n      " + _vm._s(cell.month) + "\n    ")]
	          )
	        }),
	        0
	      ),
	      _vm._v(" "),
	      _vm._t("calendarFooterMonth")
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$3 = [];
	__vue_render__$3._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$5 = undefined;
	  /* scoped */
	  const __vue_scope_id__$5 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$5 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$5 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
	    __vue_inject_styles__$5,
	    __vue_script__$5,
	    __vue_scope_id__$5,
	    __vue_is_functional_template__$5,
	    __vue_module_identifier__$5,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	var script$6 = {
	  name: 'PickerYear',
	  mixins: [__vue_component__$3],
	  props: {
	    yearRange: {
	      type: Number,
	      "default": 10
	    }
	  },
	  computed: {
	    /**
	     * Sets an array with all years to show this decade (or yearRange)
	     * @return {Array}
	     */
	    cells: function cells() {
	      var d = this.pageDate;
	      var years = [];
	      var year = this.useUtc ? Math.floor(d.getUTCFullYear() / this.yearRange) * this.yearRange : Math.floor(d.getFullYear() / this.yearRange) * this.yearRange; // set up a new date object to the beginning of the current 'page'7

	      var dObj = this.useUtc ? new Date(Date.UTC(year, d.getUTCMonth(), d.getUTCDate())) : new Date(year, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());

	      for (var i = 0; i < this.yearRange; i += 1) {
	        years.push({
	          year: this.utils.getFullYear(dObj),
	          timestamp: dObj.valueOf(),
	          isSelected: this.isSelectedYear(dObj),
	          isDisabled: this.isDisabledYear(dObj)
	        });
	        this.utils.setFullYear(dObj, this.utils.getFullYear(dObj) + 1);
	      }

	      return years;
	    },

	    /**
	     * Is the next decade disabled?
	     * @return {Boolean}
	     */
	    isNextDisabled: function isNextDisabled() {
	      if (!this.disabledConfig.has.from) {
	        return false;
	      }

	      return this.disabledConfig.from.year <= this.pageDecadeEnd;
	    },

	    /**
	     * Is the previous decade disabled?
	     * @return {Boolean}
	     */
	    isPreviousDisabled: function isPreviousDisabled() {
	      if (!this.disabledConfig.has.to) {
	        return false;
	      }

	      return this.disabledConfig.to.year >= this.pageDecadeStart;
	    },

	    /**
	     * The year at which the current yearRange starts
	     * @return {Number}
	     */
	    pageDecadeStart: function pageDecadeStart() {
	      return Math.floor(this.pageYear / this.yearRange) * this.yearRange;
	    },

	    /**
	     * The year at which the current yearRange ends
	     * @return {Number}
	     */
	    pageDecadeEnd: function pageDecadeEnd() {
	      return this.pageDecadeStart + this.yearRange - 1;
	    },

	    /**
	     * Display the current page's decade (or year range) as the title.
	     * @return {String}
	     */
	    pageTitleYear: function pageTitleYear() {
	      var yearSuffix = this.translation.yearSuffix;
	      return "".concat(this.pageDecadeStart, " - ").concat(this.pageDecadeEnd).concat(yearSuffix);
	    }
	  },
	  methods: {
	    /**
	     * Whether a year is disabled
	     * @param {Date} date
	     * @return {Boolean}
	     */
	    isDisabledYear: function isDisabledYear(date) {
	      return new DisabledDate(this.utils, this.disabledDates).isYearDisabled(date);
	    },

	    /**
	     * Whether the selected date is in this year
	     * @param {Date} date
	     * @return {Boolean}
	     */
	    isSelectedYear: function isSelectedYear(date) {
	      var year = this.utils.getFullYear(date);
	      return this.selectedDate && year === this.utils.getFullYear(this.selectedDate);
	    },

	    /**
	     * Increments the page (overrides nextPage in pickerMixin)
	     */
	    nextPage: function nextPage() {
	      if (!this.isNextDisabled) {
	        this.changePage(this.yearRange);
	      }
	    },

	    /**
	     * Decrements the page (overrides previousPage in pickerMixin)
	     */
	    previousPage: function previousPage() {
	      if (!this.isPreviousDisabled) {
	        this.changePage(-this.yearRange);
	      }
	    }
	  }
	};

	/* script */
	const __vue_script__$6 = script$6;

	/* template */
	var __vue_render__$4 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    { staticClass: "picker-view" },
	    [
	      _vm._t("beforeCalendarHeaderYear"),
	      _vm._v(" "),
	      _vm.showHeader
	        ? _c(
	            "PickerHeader",
	            {
	              attrs: {
	                "is-next-disabled": _vm.isNextDisabled,
	                "is-previous-disabled": _vm.isPreviousDisabled,
	                "is-rtl": _vm.isRtl
	              },
	              on: { next: _vm.nextPage, previous: _vm.previousPage }
	            },
	            [
	              _c("span", [
	                _vm._v("\n      " + _vm._s(_vm.pageTitleYear) + "\n    ")
	              ]),
	              _vm._v(" "),
	              _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
	              _vm._v(" "),
	              _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
	            ],
	            2
	          )
	        : _vm._e(),
	      _vm._v(" "),
	      _c(
	        "div",
	        { ref: "cells", staticClass: "date-wrapper" },
	        _vm._l(_vm.cells, function(cell) {
	          return _c(
	            "span",
	            {
	              key: cell.timestamp,
	              staticClass: "cell year",
	              class: { selected: cell.isSelected, disabled: cell.isDisabled },
	              on: {
	                click: function($event) {
	                  return _vm.select(cell)
	                }
	              }
	            },
	            [_vm._v("\n      " + _vm._s(cell.year) + "\n    ")]
	          )
	        }),
	        0
	      ),
	      _vm._v(" "),
	      _vm._t("calendarFooterYear")
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$4 = [];
	__vue_render__$4._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$6 = undefined;
	  /* scoped */
	  const __vue_scope_id__$6 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$6 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$6 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
	    __vue_inject_styles__$6,
	    __vue_script__$6,
	    __vue_scope_id__$6,
	    __vue_is_functional_template__$6,
	    __vue_module_identifier__$6,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	var trim$1 = stringTrim.trim;
	var $parseInt = global_1.parseInt;
	var hex = /^[+-]?0[Xx]/;
	var FORCED$1 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22; // `parseInt` method
	// https://tc39.github.io/ecma262/#sec-parseint-string-radix

	var numberParseInt = FORCED$1 ? function parseInt(string, radix) {
	  var S = trim$1(String(string));
	  return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
	} : $parseInt;

	// https://tc39.github.io/ecma262/#sec-parseint-string-radix

	_export({
	  global: true,
	  forced: parseInt != numberParseInt
	}, {
	  parseInt: numberParseInt
	});

	/* eslint no-param-reassign: 0 */

	/**
	 * get the hidden element width, height
	 * @param {HTMLElement} element dom
	 */
	function getPopupElementSize(element) {
	  var originalDisplay = element.style.display;
	  var originalVisibility = element.style.visibility;
	  element.style.display = 'block';
	  element.style.visibility = 'hidden';
	  var styles = window.getComputedStyle(element);
	  var width = element.offsetWidth + parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10);
	  var height = element.offsetHeight + parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
	  element.style.display = originalDisplay;
	  element.style.visibility = originalVisibility;
	  return {
	    width: width,
	    height: height
	  };
	}
	/**
	 * get the popup position
	 * @param {Element} el element
	 * @param {Element} elRelative relative element
	 * @param {Number} targetWidth target element's width
	 * @param {Number} targetHeight target element's height
	 * @param {Boolean} appendToBody
	 * @param {String} fixedPosition
	 * @param {Boolean} rtl
	 */
	// eslint-disable-next-line complexity,max-statements

	function getRelativePosition(_ref) {
	  var el = _ref.el,
	      elRelative = _ref.elRelative,
	      targetWidth = _ref.targetWidth,
	      targetHeight = _ref.targetHeight,
	      appendToBody = _ref.appendToBody,
	      fixedPosition = _ref.fixedPosition,
	      rtl = _ref.rtl;
	  var left = 0;
	  var top = 0;
	  var offsetX = 0;
	  var offsetY = 0;
	  var relativeRect = elRelative.getBoundingClientRect();
	  var documentWidth = document.documentElement.clientWidth;
	  var documentHeight = document.documentElement.clientHeight;

	  if (appendToBody) {
	    offsetX = window.pageXOffset + relativeRect.left;
	    offsetY = window.pageYOffset + relativeRect.top;
	  }

	  var calendarBounding = el.getBoundingClientRect();
	  var outOfBoundsRight = calendarBounding.right > window.innerWidth;
	  var outOfBoundsBottom = calendarBounding.bottom > window.innerHeight;
	  var fixedPositionRight = fixedPosition && fixedPosition.indexOf('right') !== -1;
	  var fixedPositionTop = fixedPosition && fixedPosition.indexOf('top') !== -1;

	  var setLeft = function setLeft() {
	    left = offsetX;
	  };

	  var setRight = function setRight() {
	    left = offsetX + relativeRect.width - targetWidth;
	  };

	  var setBottom = function setBottom() {
	    top = offsetY + relativeRect.height;
	  };

	  var setTop = function setTop() {
	    top = offsetY - targetHeight;
	  };

	  if (fixedPosition === '') {
	    if (outOfBoundsRight || rtl) {
	      setRight();
	    } else {
	      setLeft();
	    }

	    if (outOfBoundsBottom) {
	      setTop();
	    } else {
	      setBottom();
	    }

	    var hasRelativWidth = documentWidth - relativeRect.left < targetWidth && relativeRect.right < targetWidth;
	    var hasRelativHeight = relativeRect.top <= targetHeight && documentHeight - relativeRect.bottom <= targetHeight;

	    if (hasRelativWidth) {
	      left = offsetX - relativeRect.left + 1;
	    }

	    if (hasRelativHeight) {
	      top = offsetY + documentHeight - relativeRect.top - targetHeight;
	    }
	  } else {
	    if (fixedPositionRight) {
	      setRight();
	    } else {
	      setLeft();
	    }

	    if (fixedPositionTop) {
	      setTop();
	    } else {
	      setBottom();
	    }
	  }

	  return {
	    left: "".concat(left, "px"),
	    top: "".concat(top, "px")
	  };
	}

	var script$7 = {
	  name: 'Popup',
	  props: {
	    appendToBody: {
	      type: Boolean,
	      "default": true
	    },
	    fixedPosition: {
	      type: String,
	      "default": ''
	    },
	    inline: {
	      type: Boolean,
	      "default": false
	    },
	    rtl: {
	      type: Boolean,
	      "default": false
	    },
	    visible: {
	      type: Boolean,
	      "default": false
	    }
	  },
	  data: function data() {
	    return {
	      popupRect: null
	    };
	  },
	  watch: {
	    visible: {
	      immediate: true,
	      handler: function handler(val) {
	        var _this = this;

	        this.$nextTick(function () {
	          if (val) {
	            _this.displayPopup();
	          }
	        });
	      }
	    }
	  },
	  mounted: function mounted() {
	    if (this.inline) {
	      return;
	    }

	    if (this.appendToBody) {
	      document.body.appendChild(this.$el);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.inline) {
	      return;
	    }

	    if (this.appendToBody && this.$el.parentNode) {
	      this.$el.parentNode.removeChild(this.$el);
	    }
	  },
	  methods: {
	    setTopStyle: function setTopStyle() {
	      if (this.appendToBody) {
	        var relativeRect = this.$parent.$el.getBoundingClientRect();
	        this.$el.style.top = "".concat(relativeRect.bottom + window.scrollY, "px");
	      }
	    },
	    displayPopup: function displayPopup() {
	      if (this.inline || !this.visible) return;
	      this.setTopStyle();
	      var popup = this.$el;
	      var relativeElement = this.$parent.$el;

	      if (!this.popupRect) {
	        this.popupRect = getPopupElementSize(popup);
	      }

	      var _this$popupRect = this.popupRect,
	          width = _this$popupRect.width,
	          height = _this$popupRect.height;

	      var _getRelativePosition = getRelativePosition({
	        el: popup,
	        elRelative: relativeElement,
	        targetWidth: width,
	        targetHeight: height,
	        appendToBody: this.appendToBody,
	        fixedPosition: this.fixedPosition,
	        rtl: this.rtl
	      }),
	          left = _getRelativePosition.left,
	          top = _getRelativePosition.top;

	      this.$el.style.left = left;
	      this.$el.style.top = top;
	    }
	  },
	  render: function render() {
	    return this.$slots["default"];
	  }
	};

	/* script */
	const __vue_script__$7 = script$7;

	/* template */

	  /* style */
	  const __vue_inject_styles__$7 = undefined;
	  /* scoped */
	  const __vue_scope_id__$7 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$7 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$7 = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
	    {},
	    __vue_inject_styles__$7,
	    __vue_script__$7,
	    __vue_scope_id__$7,
	    __vue_is_functional_template__$7,
	    __vue_module_identifier__$7,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	var script$8 = {
	  name: 'Datepicker',
	  components: {
	    DateInput: __vue_component__$1,
	    PickerDay: __vue_component__$4,
	    PickerMonth: __vue_component__$5,
	    PickerYear: __vue_component__$6,
	    Popup: __vue_component__$7
	  },
	  mixins: [__vue_component__],
	  props: {
	    appendToBody: {
	      type: Boolean,
	      "default": false
	    },
	    calendarClass: {
	      type: [String, Object, Array],
	      "default": ''
	    },
	    currentDateRangeType: {
	      type: String,
	      "default": 'from',
	      validator: function validator(val) {
	        return ['from', 'to'].indexOf(val) >= 0;
	      }
	    },
	    dayCellContent: {
	      type: Function,
	      "default": function _default(day) {
	        return day.date;
	      }
	    },
	    disabledDates: {
	      type: Object,
	      "default": function _default() {
	        return {};
	      }
	    },
	    firstDayOfWeek: {
	      type: String,
	      "default": 'sun'
	    },
	    fixedPosition: {
	      type: String,
	      "default": '',
	      validator: function validator(val) {
	        var possibleValues = ['', 'bottom', 'bottom-left', 'bottom-right', 'top', 'top-left', 'top-right'];
	        return possibleValues.includes(val);
	      }
	    },
	    fullMonthName: {
	      type: Boolean,
	      "default": false
	    },
	    highlighted: {
	      type: Object,
	      "default": function _default() {
	        return {};
	      }
	    },
	    initialView: {
	      type: String,
	      "default": ''
	    },
	    inline: {
	      type: Boolean,
	      "default": false
	    },
	    language: {
	      type: Object,
	      "default": function _default() {
	        return en;
	      }
	    },
	    maximumView: {
	      type: String,
	      "default": 'year'
	    },
	    minimumView: {
	      type: String,
	      "default": 'day'
	    },
	    showEdgeDates: {
	      type: Boolean,
	      "default": true
	    },
	    showHeader: {
	      type: Boolean,
	      "default": true
	    },
	    useDateRange: {
	      type: Boolean,
	      "default": false
	    },
	    value: {
	      type: [String, Date, Number],
	      "default": '',
	      validator: function validator(val) {
	        return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number';
	      }
	    },
	    wrapperClass: {
	      type: [String, Object, Array],
	      "default": ''
	    },
	    yearPickerRange: {
	      type: Number,
	      "default": 10
	    }
	  },
	  data: function data() {
	    var utils = makeDateUtils(this.useUtc);
	    var startDate = utils.getNewDateObject(this.openDate || null);
	    var pageTimestamp = utils.setDate(startDate, 1);
	    return {
	      calendarHeight: 0,
	      calendarSlots: calendarSlots,

	      /*
	       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
	       * This represents the first day of the current viewing month
	       * {Number}
	       */
	      from: {},
	      fromMouseover: null,
	      pageTimestamp: pageTimestamp,
	      resetTypedDate: utils.getNewDateObject(),

	      /*
	       * Selected Date
	       * {Date}
	       */
	      selectedDate: null,
	      to: {},
	      toMouseover: null,
	      utils: utils,
	      view: ''
	    };
	  },
	  computed: {
	    allowedViews: function allowedViews() {
	      var _this = this;

	      var views = ['day', 'month', 'year'];
	      return views.filter(function (view) {
	        return _this.allowedToShowView(view);
	      });
	    },
	    computedInitialView: function computedInitialView() {
	      return this.initialView || this.minimumView;
	    },
	    getFromTimestamp: function getFromTimestamp() {
	      return this.from.timestamp || null;
	    },
	    getToTimestamp: function getToTimestamp() {
	      return this.to.timestamp || null;
	    },
	    highlightedDate: function highlightedDate() {
	      if (!this.useDateRange) return this.highlighted;
	      var _this$from$value = this.from.value,
	          fromValue = _this$from$value === void 0 ? this.fromMouseover : _this$from$value;
	      var _this$to$value = this.to.value,
	          toValue = _this$to$value === void 0 ? this.toMouseover : _this$to$value;
	      return {
	        from: fromValue,
	        to: toValue
	      };
	    },
	    isEligibleToHighlightCell: function isEligibleToHighlightCell() {
	      if (!this.useDateRange) return false;
	      var enableFromHighlight = this.currentDateRangeType === 'from' && !this.getFromTimestamp;
	      var enableToHighlight = this.currentDateRangeType === 'to' && !this.getToTimestamp;
	      return enableFromHighlight || enableToHighlight;
	    },
	    isInline: function isInline() {
	      return !!this.inline || this.useDateRange;
	    },
	    isOpen: function isOpen() {
	      return this.view !== '';
	    },
	    isRtl: function isRtl() {
	      return this.translation.rtl;
	    },
	    isUpDisabled: function isUpDisabled() {
	      return !this.allowedToShowView(this.nextView.up);
	    },
	    nextView: function nextView() {
	      var _this2 = this;

	      var isCurrentView = function isCurrentView(view) {
	        return view === _this2.view;
	      };

	      var viewIndex = this.allowedViews.findIndex(isCurrentView);

	      var nextViewDown = function nextViewDown(index) {
	        return index <= 0 ? undefined : _this2.allowedViews[index - 1];
	      };

	      var nextViewUp = function nextViewUp(index) {
	        if (index < 0) {
	          return undefined;
	        }

	        if (index === _this2.allowedViews.length - 1) {
	          return 'decade';
	        }

	        return _this2.allowedViews[index + 1];
	      };

	      return {
	        up: nextViewUp(viewIndex),
	        down: nextViewDown(viewIndex)
	      };
	    },
	    pageDate: function pageDate() {
	      return new Date(this.pageTimestamp);
	    },
	    picker: function picker() {
	      var view = this.view || this.computedInitialView;
	      return "Picker".concat(this.ucFirst(view));
	    },
	    pickerClasses: function pickerClasses() {
	      return [this.calendarClass, this.isInline && 'inline', this.isRtl && this.appendToBody && 'rtl'];
	    },
	    translation: function translation() {
	      return this.language;
	    }
	  },
	  watch: {
	    initialView: function initialView() {
	      this.setInitialView();
	    },
	    openDate: function openDate() {
	      this.setPageDate();
	    },
	    value: function value(_value) {
	      var parsedValue = this.parseValue(_value);
	      this.setValue(parsedValue);
	    }
	  },
	  mounted: function mounted() {
	    this.init();
	  },
	  methods: {
	    /**
	     * Are we allowed to show a specific picker view?
	     * @param {String} view
	     * @return {Boolean}
	     */
	    allowedToShowView: function allowedToShowView(view) {
	      var views = ['day', 'month', 'year'];
	      var minimumViewIndex = views.indexOf(this.minimumView);
	      var maximumViewIndex = views.indexOf(this.maximumView);
	      var viewIndex = views.indexOf(view);
	      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex;
	    },

	    /**
	     * Clear the selected date
	     */
	    clearDate: function clearDate() {
	      this.selectedDate = null;
	      this.setPageDate();
	      this.$emit('selected', null);
	      this.$emit('input', null);
	      this.$emit('cleared');
	    },

	    /**
	     * Close the calendar views
	     */
	    close: function close() {
	      if (!this.isInline) {
	        this.view = '';
	        this.$emit('closed');
	      }
	    },
	    getDateRangeValue: function getDateRangeValue(cell) {
	      var timestamp = cell.timestamp;
	      return {
	        timestamp: timestamp,
	        value: new Date(timestamp)
	      };
	    },
	    handleDateRange: function handleDateRange(selectedDate) {
	      if (this.currentDateRangeType === 'from') {
	        this.handleFromDateRange(selectedDate);
	      } else {
	        this.handleToDateRange(selectedDate);
	      }
	    },
	    handleDateRangeCallback: function handleDateRangeCallback() {
	      this.removeMouseoverHighlight();

	      if (this.currentDateRangeType === 'from') {
	        this.$emit('on-from-date-change');
	      } else {
	        this.$emit('on-to-date-change');
	      }

	      this.$emit('on-date-range-change', {
	        from: this.getFromTimestamp,
	        to: this.getToTimestamp
	      });
	    },
	    handleDefaultSelect: function handleDefaultSelect(cell) {
	      if (this.allowedToShowView(this.nextView.down)) {
	        this.setPageDate(new Date(cell.timestamp));
	        this.$emit("changed-".concat(this.view), cell);
	        this.setView(this.nextView.down);
	        return;
	      }

	      this.resetTypedDate = this.utils.getNewDateObject();
	      this.setDate(cell.timestamp);
	      this.close();
	    },
	    handleFromDateRange: function handleFromDateRange(selectedDate) {
	      var timestamp = selectedDate.timestamp;

	      if (!this.getToTimestamp) {
	        this.setInitialDateRange({
	          selectedDate: selectedDate,
	          dateType: 'from'
	        });
	        return;
	      }

	      this.setValue(null);
	      var isDateRangeValid = timestamp < this.getToTimestamp || timestamp === this.getToTimestamp;

	      if (isDateRangeValid) {
	        this.setFromDate(selectedDate);
	      } else {
	        this.handleInvalidDateRange({
	          selectedDate: selectedDate,
	          dateType: 'from'
	        });
	      }

	      this.handleDateRangeCallback();
	    },

	    /**
	     * Set the new pageDate and emit `changed-<view>` event
	     */
	    handlePageChange: function handlePageChange(pageDate) {
	      this.setPageDate(pageDate);
	      this.$emit("changed-".concat(this.nextView.up), pageDate);
	    },

	    /**
	     * Emits a 'blur' event
	     */
	    handleInputBlur: function handleInputBlur() {
	      this.$emit('blur');
	    },

	    /**
	     * Emits a 'focus' event
	     */
	    handleInputFocus: function handleInputFocus() {
	      this.$emit('focus');
	    },
	    handleInvalidDateRange: function handleInvalidDateRange(_ref) {
	      var selectedDate = _ref.selectedDate,
	          dateType = _ref.dateType;
	      var timestamp = selectedDate.timestamp;
	      this.handleResetDateRange();
	      this.setTemporaryValue(timestamp);

	      if (dateType === 'from') {
	        this.setFromDate(selectedDate);
	      } else {
	        this.setToDate(selectedDate);
	      }
	    },
	    handleResetDateRange: function handleResetDateRange() {
	      this.from = {};
	      this.to = {};
	      this.setValue(null);
	      this.fromMouseover = null;
	      this.toMouseover = null;
	    },
	    handleSelect: function handleSelect(cell) {
	      if (this.useDateRange) {
	        this.handleDateRange(cell);
	      } else {
	        this.handleDefaultSelect(cell);
	      }
	    },

	    /**
	     * Emit a 'selected-disabled' event
	     */
	    handleSelectDisabled: function handleSelectDisabled(cell) {
	      this.$emit('selected-disabled', cell);
	    },
	    handleToDateRange: function handleToDateRange(selectedDate) {
	      var timestamp = selectedDate.timestamp;

	      if (!this.getFromTimestamp) {
	        this.setInitialDateRange({
	          selectedDate: selectedDate,
	          dateType: 'to'
	        });
	        return;
	      }

	      this.setValue(null);
	      var isDateRangeValid = timestamp > this.getFromTimestamp || timestamp === this.getFromTimestamp;

	      if (isDateRangeValid) {
	        this.setToDate(selectedDate);
	      } else {
	        this.handleInvalidDateRange({
	          selectedDate: selectedDate,
	          dateType: 'to'
	        });
	      }

	      this.handleDateRangeCallback();
	    },

	    /**
	     * Set the date from a 'typed-date' event
	     */
	    handleTypedDate: function handleTypedDate(date) {
	      this.setDate(date.valueOf());
	    },

	    /**
	     * Initiate the component
	     */

	    /* eslint-disable */
	    init: function init() {
	      if (this.value && !this.useDateRange) {
	        var parsedValue = this.parseValue(this.value);
	        var isDateDisabled = parsedValue && this.isDateDisabled(parsedValue);

	        if (isDateDisabled) {
	          parsedValue = null;
	          this.$emit('input', parsedValue);
	        }

	        this.setValue(parsedValue);
	      }

	      if (this.isInline) {
	        this.setInitialView();
	      }
	    },

	    /* eslint-enable */

	    /**
	     * Returns true if a date is disabled
	     * @param {Date} date
	     */
	    isDateDisabled: function isDateDisabled(date) {
	      return new DisabledDate(this.utils, this.disabledDates).isDateDisabled(date);
	    },

	    /**
	     * Opens the calendar with the relevant view: 'day', 'month', or 'year'
	     */
	    open: function open() {
	      if (this.disabled || this.isInline) {
	        return;
	      }

	      this.setInitialView();
	      this.$emit('opened');
	    },

	    /**
	     * Parse a datepicker value from string/number to date
	     * @param {Date|String|Number|null} date
	     */
	    parseValue: function parseValue(date) {
	      var dateTemp = date;

	      if (typeof dateTemp === 'string' || typeof dateTemp === 'number') {
	        var parsed = new Date(dateTemp);
	        dateTemp = Number.isNaN(parsed.valueOf()) ? null : parsed;
	      }

	      return dateTemp;
	    },
	    removeMouseoverHighlight: function removeMouseoverHighlight() {
	      this.toMouseover = null;
	      this.FromMouseover = null;
	    },

	    /**
	     * Set the date, or go to the next view down
	     */

	    /**
	     * Called in the event that the user navigates to date pages and
	     * closes the picker without selecting a date.
	     */
	    resetDefaultPageDate: function resetDefaultPageDate() {
	      if (this.selectedDate === null) {
	        this.setPageDate();
	        return;
	      }

	      this.setPageDate(this.selectedDate);
	    },

	    /**
	     * Set the selected date
	     * @param {Number} timestamp
	     */
	    setDate: function setDate(timestamp) {
	      var date = new Date(timestamp);
	      this.selectedDate = date;
	      this.setPageDate(date);
	      this.$emit('selected', date);
	      this.$emit('input', date);
	    },
	    setFromDate: function setFromDate(cell) {
	      this.from = this.getDateRangeValue(cell);
	    },
	    setInitialDateRange: function setInitialDateRange(_ref2) {
	      var selectedDate = _ref2.selectedDate,
	          dateType = _ref2.dateType;
	      var timestamp = selectedDate.timestamp;
	      this.setTemporaryValue(timestamp);

	      if (dateType === 'from') {
	        this.setFromDate(selectedDate);
	      } else {
	        this.setToDate(selectedDate);
	      }

	      this.handleDateRangeCallback();
	    },
	    setMouseoverHighlight: function setMouseoverHighlight(cell) {
	      if (this.isEligibleToHighlightCell) {
	        var _this$getDateRangeVal = this.getDateRangeValue(cell),
	            value = _this$getDateRangeVal.value;

	        if (this.currentDateRangeType === 'from') {
	          this.fromMouseover = value;
	        } else {
	          this.toMouseover = value;
	        }
	      }
	    },
	    setTemporaryValue: function setTemporaryValue(timestamp) {
	      var selectedDate = new Date(timestamp);
	      var parsedValue = this.parseValue(selectedDate);
	      this.setValue(parsedValue);
	    },
	    setToDate: function setToDate(cell) {
	      this.to = this.getDateRangeValue(cell);
	    },

	    /**
	     * Sets the initial picker page view: day, month or year
	     */
	    setInitialView: function setInitialView() {
	      var initialView = this.computedInitialView;

	      if (!this.allowedToShowView(initialView)) {
	        throw new Error("initialView '".concat(this.initialView, "' cannot be rendered based on minimum '").concat(this.minimumView, "' and maximum '").concat(this.maximumView, "'"));
	      }

	      this.setView(initialView);
	    },

	    /**
	     * Sets the date that the calendar should open on
	     */
	    setPageDate: function setPageDate(date) {
	      var dateTemp = date;

	      if (!dateTemp) {
	        if (this.openDate) {
	          dateTemp = new Date(this.openDate);
	        } else {
	          dateTemp = new Date();
	        }

	        dateTemp = this.utils.resetDateTime(dateTemp);
	      }

	      this.pageTimestamp = this.utils.setDate(new Date(dateTemp), 1);
	    },

	    /**
	     * Set the datepicker value
	     * @param {Date|String|Number|null} date
	     */
	    setValue: function setValue(date) {
	      if (!date) {
	        this.setPageDate();
	        this.selectedDate = null;
	        return;
	      }

	      this.selectedDate = date;
	      this.setPageDate(date);
	    },

	    /**
	     * Set the picker view
	     */
	    setView: function setView(view) {
	      if (this.allowedToShowView(view)) {
	        this.view = view;
	      }
	    },

	    /**
	     * Capitalizes the first letter
	     */
	    ucFirst: function ucFirst(str) {
	      return str[0].toUpperCase() + str.substring(1);
	    }
	  }
	};

	/* script */
	const __vue_script__$8 = script$8;
	/* template */
	var __vue_render__$5 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      staticClass: "vdp-datepicker",
	      class: [_vm.wrapperClass, { rtl: _vm.isRtl }]
	    },
	    [
	      _c(
	        "DateInput",
	        {
	          attrs: {
	            id: _vm.id,
	            autofocus: _vm.autofocus,
	            "bootstrap-styling": _vm.bootstrapStyling,
	            "calendar-button": _vm.calendarButton,
	            "calendar-button-icon": _vm.calendarButtonIcon,
	            "calendar-button-icon-content": _vm.calendarButtonIconContent,
	            "clear-button": _vm.clearButton,
	            "clear-button-icon": _vm.clearButtonIcon,
	            disabled: _vm.disabled,
	            format: _vm.format,
	            inline: _vm.isInline,
	            "is-open": _vm.isOpen,
	            "input-class": _vm.inputClass,
	            maxlength: _vm.maxlength,
	            name: _vm.name,
	            parser: _vm.parser,
	            pattern: _vm.pattern,
	            placeholder: _vm.placeholder,
	            "ref-name": _vm.refName,
	            required: _vm.required,
	            "reset-typed-date": _vm.resetTypedDate,
	            "selected-date": _vm.selectedDate,
	            "show-calendar-on-button-click": _vm.showCalendarOnButtonClick,
	            "show-calendar-on-focus": _vm.showCalendarOnFocus,
	            tabindex: _vm.tabindex,
	            translation: _vm.translation,
	            typeable: _vm.typeable,
	            "use-utc": _vm.useUtc
	          },
	          on: {
	            blur: _vm.handleInputBlur,
	            "clear-date": _vm.clearDate,
	            close: _vm.close,
	            focus: _vm.handleInputFocus,
	            open: _vm.open,
	            "typed-date": _vm.handleTypedDate
	          }
	        },
	        [
	          _vm._t("beforeDateInput", null, { slot: "beforeDateInput" }),
	          _vm._v(" "),
	          _vm._t("afterDateInput", null, { slot: "afterDateInput" }),
	          _vm._v(" "),
	          _vm._t("clearBtn", null, { slot: "clearBtn" }),
	          _vm._v(" "),
	          _vm._t("calendarBtn", null, { slot: "calendarBtn" })
	        ],
	        2
	      ),
	      _vm._v(" "),
	      _c(
	        "Popup",
	        {
	          ref: "popup",
	          attrs: {
	            "append-to-body": _vm.appendToBody,
	            "fixed-position": _vm.fixedPosition,
	            inline: _vm.isInline,
	            rtl: _vm.isRtl,
	            visible: _vm.isOpen
	          }
	        },
	        [
	          _c(
	            "div",
	            {
	              directives: [
	                {
	                  name: "show",
	                  rawName: "v-show",
	                  value: _vm.isOpen,
	                  expression: "isOpen"
	                }
	              ],
	              ref: "datepicker",
	              staticClass: "vdp-datepicker__calendar",
	              class: _vm.pickerClasses,
	              on: {
	                mousedown: function($event) {
	                  $event.preventDefault();
	                }
	              }
	            },
	            [
	              _vm._t("beforeCalendarHeader"),
	              _vm._v(" "),
	              _c(
	                _vm.picker,
	                {
	                  tag: "Component",
	                  attrs: {
	                    "day-cell-content": _vm.dayCellContent,
	                    "disabled-dates": _vm.disabledDates,
	                    "first-day-of-week": _vm.firstDayOfWeek,
	                    highlighted: _vm.highlightedDate,
	                    "use-date-range": _vm.useDateRange,
	                    "is-rtl": _vm.isRtl,
	                    "is-up-disabled": _vm.isUpDisabled,
	                    "page-date": _vm.pageDate,
	                    "selected-date": _vm.selectedDate,
	                    "show-edge-dates": _vm.showEdgeDates,
	                    "show-full-month-name": _vm.fullMonthName,
	                    "show-header": _vm.showHeader,
	                    translation: _vm.translation,
	                    "use-utc": _vm.useUtc,
	                    "year-range": _vm.yearPickerRange
	                  },
	                  on: {
	                    "page-change": _vm.handlePageChange,
	                    select: _vm.handleSelect,
	                    "select-disabled": _vm.handleSelectDisabled,
	                    "set-view": _vm.setView,
	                    "set-highlighted-date": _vm.setMouseoverHighlight,
	                    "remove-highlighted-date": _vm.removeMouseoverHighlight
	                  }
	                },
	                [
	                  _vm._l(_vm.calendarSlots, function(slotKey) {
	                    return [_vm._t(slotKey, null, { slot: slotKey })]
	                  })
	                ],
	                2
	              ),
	              _vm._v(" "),
	              _vm._t("calendarFooter")
	            ],
	            2
	          )
	        ]
	      )
	    ],
	    1
	  )
	};
	var __vue_staticRenderFns__$5 = [];
	__vue_render__$5._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$8 = undefined;
	  /* scoped */
	  const __vue_scope_id__$8 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$8 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$8 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
	    __vue_inject_styles__$8,
	    __vue_script__$8,
	    __vue_scope_id__$8,
	    __vue_is_functional_template__$8,
	    __vue_module_identifier__$8,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	return __vue_component__$8;

})));
//# sourceMappingURL=Datepicker.js.map
