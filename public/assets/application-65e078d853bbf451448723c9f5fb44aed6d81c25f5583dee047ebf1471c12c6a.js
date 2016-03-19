/*!
 * jQuery JavaScript Library v1.12.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-08T19:56Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// we once tried to use readyState "interactive" here,
		// but it caused issues like the one
		// discovered by ChrisS here:
		// http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			// Subtract offsetParent scroll positions
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
				offsetParent.scrollTop();
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
				offsetParent.scrollLeft();
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
// Generated by CoffeeScript 1.7.1

/*
jQuery.Turbolinks ~ https://github.com/kossnocorp/jquery.turbolinks
jQuery plugin for drop-in fix binded events problem caused by Turbolinks

The MIT License
Copyright (c) 2012-2013 Sasha Koss & Rico Sta. Cruz
 */


(function() {
  var $, $document;

  $ = window.jQuery || (typeof require === "function" ? require('jquery') : void 0);

  $document = $(document);

  $.turbo = {
    version: '2.1.0',
    isReady: false,
    use: function(load, fetch) {
      return $document.off('.turbo').on("" + load + ".turbo", this.onLoad).on("" + fetch + ".turbo", this.onFetch);
    },
    addCallback: function(callback) {
      if ($.turbo.isReady) {
        callback($);
      }
      return $document.on('turbo:ready', function() {
        return callback($);
      });
    },
    onLoad: function() {
      $.turbo.isReady = true;
      return $document.trigger('turbo:ready');
    },
    onFetch: function() {
      return $.turbo.isReady = false;
    },
    register: function() {
      $(this.onLoad);
      return $.fn.ready = this.addCallback;
    }
  };

  $.turbo.register();

  $.turbo.use('page:load', 'page:fetch');

}).call(this);
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0].elements).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
    TimelineJS - ver. 3.3.13 - 2016-02-25
    Copyright (c) 2012-2015 Northwestern University
    a project of the Northwestern University Knight Lab, originally created by Zach Wise
    https://github.com/NUKnightLab/TimelineJS3
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
    If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/* **********************************************
     Begin TL.js
********************************************** */

/*!
  TL
*/


(function (root) {
  root.TL = {
    VERSION: '0.1',
    _originalL: root.TL
  };
}(this));

/*	TL.Debug
  Debug mode
================================================== */
TL.debug = false;



/*	TL.Bind
================================================== */
TL.Bind = function (/*Function*/ fn, /*Object*/ obj) /*-> Object*/ {
  return function () {
    return fn.apply(obj, arguments);
  };
};



/* Trace (console.log)
================================================== */
trace = function( msg ) {
  if (TL.debug) {
    if (window.console) {
      console.log(msg);
    } else if ( typeof( jsTrace ) != 'undefined' ) {
      jsTrace.send( msg );
    } else {
      //alert(msg);
    }
  }
}


/* **********************************************
     Begin TL.Error.js
********************************************** */

/* Timeline Error class */

function TL_Error(message_key, detail) {
    this.name = 'TL.Error';
    this.message = message_key || 'error';
    this.message_key = this.message;
    this.detail = detail || '';

    // Grab stack?
    var e = new Error();
    if(e.hasOwnProperty('stack')) {
        this.stack = e.stack;
    }
}

TL_Error.prototype = Object.create(Error.prototype);
TL_Error.prototype.constructor = TL_Error;

TL.Error = TL_Error;


/* **********************************************
     Begin TL.Util.js
********************************************** */

/*	TL.Util
  Class of utilities
================================================== */

TL.Util = {
  mergeData: function(data_main, data_to_merge) {
    var x;
    for (x in data_to_merge) {
      if (Object.prototype.hasOwnProperty.call(data_to_merge, x)) {
        data_main[x] = data_to_merge[x];
      }
    }
    return data_main;
  },

  // like TL.Util.mergeData but takes an arbitrarily long list of sources to merge.
  extend: function (/*Object*/ dest) /*-> Object*/ {	// merge src properties into dest
    var sources = Array.prototype.slice.call(arguments, 1);
    for (var j = 0, len = sources.length, src; j < len; j++) {
      src = sources[j] || {};
      TL.Util.mergeData(dest, src);
    }
    return dest;
  },

  isEven: function(n) {
    return n == parseFloat(n)? !(n%2) : void 0;
  },

  isTrue: function(s) {
    if (s == null) return false;
    return s == true || String(s).toLowerCase() == 'true' || Number(s) == 1;
  },

  findArrayNumberByUniqueID: function(id, array, prop, defaultVal) {
    var _n = defaultVal || 0;

    for (var i = 0; i < array.length; i++) {
      if (array[i].data[prop] == id) {
        _n = i;
      }
    };

    return _n;
  },

  convertUnixTime: function(str) {
    var _date, _months, _year, _month, _day, _time, _date_array = [],
      _date_str = {
        ymd:"",
        time:"",
        time_array:[],
        date_array:[],
        full_array:[]
      };

    _date_str.ymd = str.split(" ")[0];
    _date_str.time = str.split(" ")[1];
    _date_str.date_array = _date_str.ymd.split("-");
    _date_str.time_array = _date_str.time.split(":");
    _date_str.full_array = _date_str.date_array.concat(_date_str.time_array)

    for(var i = 0; i < _date_str.full_array.length; i++) {
      _date_array.push( parseInt(_date_str.full_array[i]) )
    }

    _date = new Date(_date_array[0], _date_array[1], _date_array[2], _date_array[3], _date_array[4], _date_array[5]);
    _months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    _year = _date.getFullYear();
    _month = _months[_date.getMonth()];
    _day = _date.getDate();
    _time = _month + ', ' + _day + ' ' + _year;

    return _time;
  },

  setData: function (obj, data) {
    obj.data = TL.Util.extend({}, obj.data, data);
    if (obj.data.unique_id === "") {
      obj.data.unique_id = TL.Util.unique_ID(6);
    }
  },

  stamp: (function () {
    var lastId = 0, key = '_tl_id';


    return function (/*Object*/ obj) {
      obj[key] = obj[key] || ++lastId;
      return obj[key];
    };
  }()),

  isArray: (function () {
      // Use compiler's own isArray when available
      if (Array.isArray) {
          return Array.isArray;
      }

      // Retain references to variables for performance
      // optimization
      var objectToStringFn = Object.prototype.toString,
          arrayToStringResult = objectToStringFn.call([]);

      return function (subject) {
          return objectToStringFn.call(subject) === arrayToStringResult;
      };
  }()),

    getRandomNumber: function(range) {
       return Math.floor(Math.random() * range);
     },

  unique_ID: function(size, prefix) {

    var getRandomNumber = function(range) {
      return Math.floor(Math.random() * range);
    };

    var getRandomChar = function() {
      var chars = "abcdefghijklmnopqurstuvwxyz";
      return chars.substr( getRandomNumber(32), 1 );
    };

    var randomID = function(size) {
      var str = "";
      for(var i = 0; i < size; i++) {
        str += getRandomChar();
      }
      return str;
    };

    if (prefix) {
      return prefix + "-" + randomID(size);
    } else {
      return "tl-" + randomID(size);
    }
  },

  ensureUniqueKey: function(obj, candidate) {
    if (!candidate) { candidate = TL.Util.unique_ID(6); }

    if (!(candidate in obj)) { return candidate; }

    var root = candidate.match(/^(.+)(-\d+)?$/)[1];
    var similar_ids = [];
    // get an alternative
    for (key in obj) {
      if (key.match(/^(.+?)(-\d+)?$/)[1] == root) {
        similar_ids.push(key);
      }
    }
    candidate = root + "-" + (similar_ids.length + 1);

    for (var counter = similar_ids.length; similar_ids.indexOf(candidate) != -1; counter++) {
      candidate = root + '-' + counter;
    }

    return candidate;
  },


  htmlify: function(str) {
    //if (str.match(/<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/)) {
    if (str.match(/<p>[\s\S]*?<\/p>/)) {

      return str;
    } else {
      return "<p>" + str + "</p>";
    }
  },

  /*	* Turns plain text links into real links
  ================================================== */
  linkify: function(text,targets,is_touch) {

        var make_link = function(url, link_text, prefix) {
            if (!prefix) {
                prefix = "";
            }
            var MAX_LINK_TEXT_LENGTH = 30;
            if (link_text && link_text.length > MAX_LINK_TEXT_LENGTH) {
                link_text = link_text.substring(0,MAX_LINK_TEXT_LENGTH) + "\u2026"; // unicode ellipsis
            }
            return prefix + "<a class='tl-makelink' href='" + url + "' onclick='void(0)'>" + link_text + "</a>";
        }
    // http://, https://, ftp://
    var urlPattern = /\b(?:https?|ftp):\/\/([a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|])/gim;

    // www. sans http:// or https://
    var pseudoUrlPattern = /(^|[^\/>])(www\.[\S]+(\b|$))/gim;

    // Email addresses
    var emailAddressPattern = /([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/gim;


    return text
      .replace(urlPattern, function(match, url_sans_protocol, offset, string) {
                // Javascript doesn't support negative lookbehind assertions, so
                // we need to handle risk of matching URLs in legit hrefs
                if (offset > 0) {
                    var prechar = string[offset-1];
                    if (prechar == '"' || prechar == "'" || prechar == "=") {
                        return match;
                    }
                }
                return make_link(match, url_sans_protocol);
            })
      .replace(pseudoUrlPattern, function(match, beforePseudo, pseudoUrl, offset, string) {
                return make_link('http://' + pseudoUrl, pseudoUrl, beforePseudo);
            })
      .replace(emailAddressPattern, function(match, email, offset, string) {
                return make_link('mailto:' + email, email);
            });
  },

  unlinkify: function(text) {
    if(!text) return text;
    text = text.replace(/<a\b[^>]*>/i,"");
    text = text.replace(/<\/a>/i, "");
    return text;
  },

  getParamString: function (obj) {
    var params = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        params.push(i + '=' + obj[i]);
      }
    }
    return '?' + params.join('&');
  },

  formatNum: function (num, digits) {
    var pow = Math.pow(10, digits || 5);
    return Math.round(num * pow) / pow;
  },

  falseFn: function () {
    return false;
  },

  requestAnimFrame: (function () {
    function timeoutDefer(callback) {
      window.setTimeout(callback, 1000 / 60);
    }

    var requestFn = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      timeoutDefer;

    return function (callback, context, immediate, contextEl) {
      callback = context ? TL.Util.bind(callback, context) : callback;
      if (immediate && requestFn === timeoutDefer) {
        callback();
      } else {
        requestFn(callback, contextEl);
      }
    };
  }()),

  bind: function (/*Function*/ fn, /*Object*/ obj) /*-> Object*/ {
    return function () {
      return fn.apply(obj, arguments);
    };
  },

  template: function (str, data) {
    return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
      var value = data[key];
      if (!data.hasOwnProperty(key)) {
          throw new TL.Error("template_value_err", str);
      }
      return value;
    });
  },

  hexToRgb: function(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        if (TL.Util.css_named_colors[hex.toLowerCase()]) {
            hex = TL.Util.css_named_colors[hex.toLowerCase()];
        }
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
  },
  // given an object with r, g, and b keys, or a string of the form 'rgb(mm,nn,ll)', return a CSS hex string including the leading '#' character
  rgbToHex: function(rgb) {
    var r,g,b;
    if (typeof(rgb) == 'object') {
      r = rgb.r;
      g = rgb.g;
      b = rgb.b;
    } else if (typeof(rgb.match) == 'function'){
      var parts = rgb.match(/^rgb\((\d+),(\d+),(\d+)\)$/);
      if (parts) {
        r = parts[1];
        g = parts[2];
        b = parts[3];
      }
    }
    if (isNaN(r) || isNaN(b) || isNaN(g)) {
      throw new TL.Error("invalid_rgb_err");
    }
    return "#" + TL.Util.intToHexString(r) + TL.Util.intToHexString(g) + TL.Util.intToHexString(b);
  },
  colorObjToHex: function(o) {
    var parts = [o.r, o.g, o.b];
    return TL.Util.rgbToHex("rgb(" + parts.join(',') + ")")
  },
    css_named_colors: {
        "aliceblue": "#f0f8ff",
        "antiquewhite": "#faebd7",
        "aqua": "#00ffff",
        "aquamarine": "#7fffd4",
        "azure": "#f0ffff",
        "beige": "#f5f5dc",
        "bisque": "#ffe4c4",
        "black": "#000000",
        "blanchedalmond": "#ffebcd",
        "blue": "#0000ff",
        "blueviolet": "#8a2be2",
        "brown": "#a52a2a",
        "burlywood": "#deb887",
        "cadetblue": "#5f9ea0",
        "chartreuse": "#7fff00",
        "chocolate": "#d2691e",
        "coral": "#ff7f50",
        "cornflowerblue": "#6495ed",
        "cornsilk": "#fff8dc",
        "crimson": "#dc143c",
        "cyan": "#00ffff",
        "darkblue": "#00008b",
        "darkcyan": "#008b8b",
        "darkgoldenrod": "#b8860b",
        "darkgray": "#a9a9a9",
        "darkgreen": "#006400",
        "darkkhaki": "#bdb76b",
        "darkmagenta": "#8b008b",
        "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00",
        "darkorchid": "#9932cc",
        "darkred": "#8b0000",
        "darksalmon": "#e9967a",
        "darkseagreen": "#8fbc8f",
        "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f",
        "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3",
        "deeppink": "#ff1493",
        "deepskyblue": "#00bfff",
        "dimgray": "#696969",
        "dodgerblue": "#1e90ff",
        "firebrick": "#b22222",
        "floralwhite": "#fffaf0",
        "forestgreen": "#228b22",
        "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc",
        "ghostwhite": "#f8f8ff",
        "gold": "#ffd700",
        "goldenrod": "#daa520",
        "gray": "#808080",
        "green": "#008000",
        "greenyellow": "#adff2f",
        "honeydew": "#f0fff0",
        "hotpink": "#ff69b4",
        "indianred": "#cd5c5c",
        "indigo": "#4b0082",
        "ivory": "#fffff0",
        "khaki": "#f0e68c",
        "lavender": "#e6e6fa",
        "lavenderblush": "#fff0f5",
        "lawngreen": "#7cfc00",
        "lemonchiffon": "#fffacd",
        "lightblue": "#add8e6",
        "lightcoral": "#f08080",
        "lightcyan": "#e0ffff",
        "lightgoldenrodyellow": "#fafad2",
        "lightgray": "#d3d3d3",
        "lightgreen": "#90ee90",
        "lightpink": "#ffb6c1",
        "lightsalmon": "#ffa07a",
        "lightseagreen": "#20b2aa",
        "lightskyblue": "#87cefa",
        "lightslategray": "#778899",
        "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0",
        "lime": "#00ff00",
        "limegreen": "#32cd32",
        "linen": "#faf0e6",
        "magenta": "#ff00ff",
        "maroon": "#800000",
        "mediumaquamarine": "#66cdaa",
        "mediumblue": "#0000cd",
        "mediumorchid": "#ba55d3",
        "mediumpurple": "#9370db",
        "mediumseagreen": "#3cb371",
        "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a",
        "mediumturquoise": "#48d1cc",
        "mediumvioletred": "#c71585",
        "midnightblue": "#191970",
        "mintcream": "#f5fffa",
        "mistyrose": "#ffe4e1",
        "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead",
        "navy": "#000080",
        "oldlace": "#fdf5e6",
        "olive": "#808000",
        "olivedrab": "#6b8e23",
        "orange": "#ffa500",
        "orangered": "#ff4500",
        "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa",
        "palegreen": "#98fb98",
        "paleturquoise": "#afeeee",
        "palevioletred": "#db7093",
        "papayawhip": "#ffefd5",
        "peachpuff": "#ffdab9",
        "peru": "#cd853f",
        "pink": "#ffc0cb",
        "plum": "#dda0dd",
        "powderblue": "#b0e0e6",
        "purple": "#800080",
        "rebeccapurple": "#663399",
        "red": "#ff0000",
        "rosybrown": "#bc8f8f",
        "royalblue": "#4169e1",
        "saddlebrown": "#8b4513",
        "salmon": "#fa8072",
        "sandybrown": "#f4a460",
        "seagreen": "#2e8b57",
        "seashell": "#fff5ee",
        "sienna": "#a0522d",
        "silver": "#c0c0c0",
        "skyblue": "#87ceeb",
        "slateblue": "#6a5acd",
        "slategray": "#708090",
        "snow": "#fffafa",
        "springgreen": "#00ff7f",
        "steelblue": "#4682b4",
        "tan": "#d2b48c",
        "teal": "#008080",
        "thistle": "#d8bfd8",
        "tomato": "#ff6347",
        "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3",
        "white": "#ffffff",
        "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00",
        "yellowgreen": "#9acd32"
    },
  ratio: {
    square: function(size) {
      var s = {
        w: 0,
        h: 0
      }
      if (size.w > size.h && size.h > 0) {
        s.h = size.h;
        s.w = size.h;
      } else {
        s.w = size.w;
        s.h = size.w;
      }
      return s;
    },

    r16_9: function(size) {
      if (size.w !== null && size.w !== "") {
        return Math.round((size.w / 16) * 9);
      } else if (size.h !== null && size.h !== "") {
        return Math.round((size.h / 9) * 16);
      } else {
        return 0;
      }
    },
    r4_3: function(size) {
      if (size.w !== null && size.w !== "") {
        return Math.round((size.w / 4) * 3);
      } else if (size.h !== null && size.h !== "") {
        return Math.round((size.h / 3) * 4);
      }
    }
  },
  getObjectAttributeByIndex: function(obj, index) {
    if(typeof obj != 'undefined') {
      var i = 0;
      for (var attr in obj){
        if (index === i){
          return obj[attr];
        }
        i++;
      }
      return "";
    } else {
      return "";
    }

  },
  getUrlVars: function(string) {
    var str,
      vars = [],
      hash,
      hashes;

    str = string.toString();

    if (str.match('&#038;')) {
      str = str.replace("&#038;", "&");
    } else if (str.match('&#38;')) {
      str = str.replace("&#38;", "&");
    } else if (str.match('&amp;')) {
      str = str.replace("&amp;", "&");
    }

    hashes = str.slice(str.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }


    return vars;
  },
    /**
     * Remove any leading or trailing whitespace from the given string.
     * If `str` is undefined or does not have a `replace` function, return
     * an empty string.
     */
  trim: function(str) {
        if (str && typeof(str.replace) == 'function') {
            return str.replace(/^\s+|\s+$/g, '');
        }
        return "";
  },

  slugify: function(str) {
    // borrowed from http://stackoverflow.com/a/5782563/102476
    str = TL.Util.trim(str);
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

    str = str.replace(/^([0-9])/,'_$1');
    return str;
  },
  maxDepth: function(ary) {
    // given a sorted array of 2-tuples of numbers, count how many "deep" the items are.
    // that is, what is the maximum number of tuples that occupy any one moment
    // each tuple should also be sorted
    var stack = [];
    var max_depth = 0;
    for (var i = 0; i < ary.length; i++) {

      stack.push(ary[i]);
      if (stack.length > 1) {
        var top = stack[stack.length - 1]
        var bottom_idx = -1;
        for (var j = 0; j < stack.length - 1; j++) {
          if (stack[j][1] < top[0]) {
            bottom_idx = j;
          }
        };
        if (bottom_idx >= 0) {
          stack = stack.slice(bottom_idx + 1);
        }

      }

      if (stack.length > max_depth) {
        max_depth = stack.length;
      }
    };
    return max_depth;
  },

  pad: function (val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) val = "0" + val;
    return val;
  },
  intToHexString: function(i) {
    return TL.Util.pad(parseInt(i,10).toString(16));
  },
    findNextGreater: function(list, current, default_value) {
        // given a sorted list and a current value which *might* be in the list,
        // return the next greatest value if the current value is >= the last item in the list, return default,
        // or if default is undefined, return input value
        for (var i = 0; i < list.length; i++) {
            if (current < list[i]) {
                return list[i];
            }
        }

        return (default_value) ? default_value : current;
    },

    findNextLesser: function(list, current, default_value) {
        // given a sorted list and a current value which *might* be in the list,
        // return the next lesser value if the current value is <= the last item in the list, return default,
        // or if default is undefined, return input value
        for (var i = list.length - 1; i >= 0; i--) {
            if (current > list[i]) {
                return list[i];
            }
        }

        return (default_value) ? default_value : current;
    },

  isEmptyObject: function(o) {
    var properties = []
    if (Object.keys) {
      properties = Object.keys(o);
    } else { // all this to support IE 8
        for (var p in o) if (Object.prototype.hasOwnProperty.call(o,p)) properties.push(p);
    }
    for (var i = 0; i < properties.length; i++) {
      var k = properties[i];
      if (o[k] != null && typeof o[k] != "string") return false;
      if (TL.Util.trim(o[k]).length != 0) return false;
    }
    return true;
  },
  parseYouTubeTime: function(s) {
      // given a YouTube start time string in a reasonable format, reduce it to a number of seconds as an integer.
    if (typeof(s) == 'string') {
      parts = s.match(/^\s*(\d+h)?(\d+m)?(\d+s)?\s*/i);
      if (parts) {
        var hours = parseInt(parts[1]) || 0;
        var minutes = parseInt(parts[2]) || 0;
        var seconds = parseInt(parts[3]) || 0;
        return seconds + (minutes * 60) + (hours * 60 * 60);
      }
    } else if (typeof(s) == 'number') {
      return s;
    }
    return 0;
  },
  /**
   * Try to make seamless the process of interpreting a URL to a web page which embeds an image for sharing purposes
   * as a direct image link. Some services have predictable transformations we can use rather than explain to people
   * this subtlety.
   */
  transformImageURL: function(url) {
    return url.replace(/(.*)www.dropbox.com\/(.*)/, '$1dl.dropboxusercontent.com/$2')
  },

  base58: (function(alpha) {
      var alphabet = alpha || '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
          base = alphabet.length;
      return {
          encode: function(enc) {
              if(typeof enc!=='number' || enc !== parseInt(enc))
                  throw '"encode" only accepts integers.';
              var encoded = '';
              while(enc) {
                  var remainder = enc % base;
                  enc = Math.floor(enc / base);
                  encoded = alphabet[remainder].toString() + encoded;
              }
              return encoded;
          },
          decode: function(dec) {
              if(typeof dec!=='string')
                  throw '"decode" only accepts strings.';
              var decoded = 0;
              while(dec) {
                  var alphabetPosition = alphabet.indexOf(dec[0]);
                  if (alphabetPosition < 0)
                      throw '"decode" can\'t find "' + dec[0] + '" in the alphabet: "' + alphabet + '"';
                  var powerOf = dec.length - 1;
                  decoded += alphabetPosition * (Math.pow(base, powerOf));
                  dec = dec.substring(1);
              }
              return decoded;
          }
      };
  })()

};


/* **********************************************
     Begin TL.Data.js
********************************************** */

// Expects TL to be visible in scope

;(function(TL){
    /* Zepto v1.1.2-15-g59d3fe5 - zepto event ajax form ie - zeptojs.com/license */

    var Zepto = (function() {
      var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
        document = window.document,
        elementDisplay = {}, classCache = {},
        cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        rootNodeRE = /^(?:body|html)$/i,
        capitalRE = /([A-Z])/g,

        // special attributes that should be get/set via method calls
        methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

        adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
        table = document.createElement('table'),
        tableRow = document.createElement('tr'),
        containers = {
          'tr': document.createElement('tbody'),
          'tbody': table, 'thead': table, 'tfoot': table,
          'td': tableRow, 'th': tableRow,
          '*': document.createElement('div')
        },
        readyRE = /complete|loaded|interactive/,
        classSelectorRE = /^\.([\w-]+)$/,
        idSelectorRE = /^#([\w-]*)$/,
        simpleSelectorRE = /^[\w-]*$/,
        class2type = {},
        toString = class2type.toString,
        zepto = {},
        camelize, uniq,
        tempParent = document.createElement('div'),
        propMap = {
          'tabindex': 'tabIndex',
          'readonly': 'readOnly',
          'for': 'htmlFor',
          'class': 'className',
          'maxlength': 'maxLength',
          'cellspacing': 'cellSpacing',
          'cellpadding': 'cellPadding',
          'rowspan': 'rowSpan',
          'colspan': 'colSpan',
          'usemap': 'useMap',
          'frameborder': 'frameBorder',
          'contenteditable': 'contentEditable'
        },
        isArray = Array.isArray ||
          function(object){ return object instanceof Array }

      zepto.matches = function(element, selector) {
        if (!selector || !element || element.nodeType !== 1) return false
        var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                              element.oMatchesSelector || element.matchesSelector
        if (matchesSelector) return matchesSelector.call(element, selector)
        // fall back to performing a selector:
        var match, parent = element.parentNode, temp = !parent
        if (temp) (parent = tempParent).appendChild(element)
        match = ~zepto.qsa(parent, selector).indexOf(element)
        temp && tempParent.removeChild(element)
        return match
      }

      function type(obj) {
        return obj == null ? String(obj) :
          class2type[toString.call(obj)] || "object"
      }

      function isFunction(value) { return type(value) == "function" }
      function isWindow(obj)     { return obj != null && obj == obj.window }
      function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
      function isObject(obj)     { return type(obj) == "object" }
      function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
      }
      function likeArray(obj) { return typeof obj.length == 'number' }

      function compact(array) { return filter.call(array, function(item){ return item != null }) }
      function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
      camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
      function dasherize(str) {
        return str.replace(/::/g, '/')
               .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/_/g, '-')
               .toLowerCase()
      }
      uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

      function classRE(name) {
        return name in classCache ?
          classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
      }

      function maybeAddPx(name, value) {
        return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
      }

      function defaultDisplay(nodeName) {
        var element, display
        if (!elementDisplay[nodeName]) {
          element = document.createElement(nodeName)
          document.body.appendChild(element)
          display = getComputedStyle(element, '').getPropertyValue("display")
          element.parentNode.removeChild(element)
          display == "none" && (display = "block")
          elementDisplay[nodeName] = display
        }
        return elementDisplay[nodeName]
      }

      function children(element) {
        return 'children' in element ?
          slice.call(element.children) :
          $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
      }

      // `$.zepto.fragment` takes a html string and an optional tag name
      // to generate DOM nodes nodes from the given html string.
      // The generated DOM nodes are returned as an array.
      // This function can be overriden in plugins for example to make
      // it compatible with browsers that don't support the DOM fully.
      zepto.fragment = function(html, name, properties) {
        var dom, nodes, container

        // A special case optimization for a single tag
        if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

        if (!dom) {
          if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
          if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
          if (!(name in containers)) name = '*'

          container = containers[name]
          container.innerHTML = '' + html
          dom = $.each(slice.call(container.childNodes), function(){
            container.removeChild(this)
          })
        }

        if (isPlainObject(properties)) {
          nodes = $(dom)
          $.each(properties, function(key, value) {
            if (methodAttributes.indexOf(key) > -1) nodes[key](value)
            else nodes.attr(key, value)
          })
        }

        return dom
      }

      // `$.zepto.Z` swaps out the prototype of the given `dom` array
      // of nodes with `$.fn` and thus supplying all the Zepto functions
      // to the array. Note that `__proto__` is not supported on Internet
      // Explorer. This method can be overriden in plugins.
      zepto.Z = function(dom, selector) {
        dom = dom || []
        dom.__proto__ = $.fn
        dom.selector = selector || ''
        return dom
      }

      // `$.zepto.isZ` should return `true` if the given object is a Zepto
      // collection. This method can be overriden in plugins.
      zepto.isZ = function(object) {
        return object instanceof zepto.Z
      }

      // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
      // takes a CSS selector and an optional context (and handles various
      // special cases).
      // This method can be overriden in plugins.
      zepto.init = function(selector, context) {
        var dom
        // If nothing given, return an empty Zepto collection
        if (!selector) return zepto.Z()
        // Optimize for string selectors
        else if (typeof selector == 'string') {
          selector = selector.trim()
          // If it's a html fragment, create nodes from it
          // Note: In both Chrome 21 and Firefox 15, DOM error 12
          // is thrown if the fragment doesn't begin with <
          if (selector[0] == '<' && fragmentRE.test(selector))
            dom = zepto.fragment(selector, RegExp.$1, context), selector = null
          // If there's a context, create a collection on that context first, and select
          // nodes from there
          else if (context !== undefined) return $(context).find(selector)
          // If it's a CSS selector, use it to select nodes.
          else dom = zepto.qsa(document, selector)
        }
        // If a function is given, call it when the DOM is ready
        else if (isFunction(selector)) return $(document).ready(selector)
        // If a Zepto collection is given, just return it
        else if (zepto.isZ(selector)) return selector
        else {
          // normalize array if an array of nodes is given
          if (isArray(selector)) dom = compact(selector)
          // Wrap DOM nodes.
          else if (isObject(selector))
            dom = [selector], selector = null
          // If it's a html fragment, create nodes from it
          else if (fragmentRE.test(selector))
            dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
          // If there's a context, create a collection on that context first, and select
          // nodes from there
          else if (context !== undefined) return $(context).find(selector)
          // And last but no least, if it's a CSS selector, use it to select nodes.
          else dom = zepto.qsa(document, selector)
        }
        // create a new Zepto collection from the nodes found
        return zepto.Z(dom, selector)
      }

      // `$` will be the base `Zepto` object. When calling this
      // function just call `$.zepto.init, which makes the implementation
      // details of selecting nodes and creating Zepto collections
      // patchable in plugins.
      $ = function(selector, context){
        return zepto.init(selector, context)
      }

      function extend(target, source, deep) {
        for (key in source)
          if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key]))
              target[key] = {}
            if (isArray(source[key]) && !isArray(target[key]))
              target[key] = []
            extend(target[key], source[key], deep)
          }
          else if (source[key] !== undefined) target[key] = source[key]
      }

      // Copy all but undefined properties from one or more
      // objects to the `target` object.
      $.extend = function(target){
        var deep, args = slice.call(arguments, 1)
        if (typeof target == 'boolean') {
          deep = target
          target = args.shift()
        }
        args.forEach(function(arg){ extend(target, arg, deep) })
        return target
      }

      // `$.zepto.qsa` is Zepto's CSS selector implementation which
      // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
      // This method can be overriden in plugins.
      zepto.qsa = function(element, selector){
        var found,
            maybeID = selector[0] == '#',
            maybeClass = !maybeID && selector[0] == '.',
            nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
            isSimple = simpleSelectorRE.test(nameOnly)
        return (isDocument(element) && isSimple && maybeID) ?
          ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
          (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
          slice.call(
            isSimple && !maybeID ?
              maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
              element.getElementsByTagName(selector) : // Or a tag
              element.querySelectorAll(selector) // Or it's not simple, and we need to query all
          )
      }

      function filtered(nodes, selector) {
        return selector == null ? $(nodes) : $(nodes).filter(selector)
      }

      $.contains = function(parent, node) {
        return parent !== node && parent.contains(node)
      }

      function funcArg(context, arg, idx, payload) {
        return isFunction(arg) ? arg.call(context, idx, payload) : arg
      }

      function setAttribute(node, name, value) {
        value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
      }

      // access className property while respecting SVGAnimatedString
      function className(node, value){
        var klass = node.className,
            svg   = klass && klass.baseVal !== undefined

        if (value === undefined) return svg ? klass.baseVal : klass
        svg ? (klass.baseVal = value) : (node.className = value)
      }

      // "true"  => true
      // "false" => false
      // "null"  => null
      // "42"    => 42
      // "42.5"  => 42.5
      // "08"    => "08"
      // JSON    => parse if valid
      // String  => self
      function deserializeValue(value) {
        var num
        try {
          return value ?
            value == "true" ||
            ( value == "false" ? false :
              value == "null" ? null :
              !/^0/.test(value) && !isNaN(num = Number(value)) ? num :
              /^[\[\{]/.test(value) ? $.parseJSON(value) :
              value )
            : value
        } catch(e) {
          return value
        }
      }

      $.type = type
      $.isFunction = isFunction
      $.isWindow = isWindow
      $.isArray = isArray
      $.isPlainObject = isPlainObject

      $.isEmptyObject = function(obj) {
        var name
        for (name in obj) return false
        return true
      }

      $.inArray = function(elem, array, i){
        return emptyArray.indexOf.call(array, elem, i)
      }

      $.camelCase = camelize
      $.trim = function(str) {
        return str == null ? "" : String.prototype.trim.call(str)
      }

      // plugin compatibility
      $.uuid = 0
      $.support = { }
      $.expr = { }

      $.map = function(elements, callback){
        var value, values = [], i, key
        if (likeArray(elements))
          for (i = 0; i < elements.length; i++) {
            value = callback(elements[i], i)
            if (value != null) values.push(value)
          }
        else
          for (key in elements) {
            value = callback(elements[key], key)
            if (value != null) values.push(value)
          }
        return flatten(values)
      }

      $.each = function(elements, callback){
        var i, key
        if (likeArray(elements)) {
          for (i = 0; i < elements.length; i++)
            if (callback.call(elements[i], i, elements[i]) === false) return elements
        } else {
          for (key in elements)
            if (callback.call(elements[key], key, elements[key]) === false) return elements
        }

        return elements
      }

      $.grep = function(elements, callback){
        return filter.call(elements, callback)
      }

      if (window.JSON) $.parseJSON = JSON.parse

      // Populate the class2type map
      $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase()
      })

      // Define methods that will be available on all
      // Zepto collections
      $.fn = {
        // Because a collection acts like an array
        // copy over these useful array functions.
        forEach: emptyArray.forEach,
        reduce: emptyArray.reduce,
        push: emptyArray.push,
        sort: emptyArray.sort,
        indexOf: emptyArray.indexOf,
        concat: emptyArray.concat,

        // `map` and `slice` in the jQuery API work differently
        // from their array counterparts
        map: function(fn){
          return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
        },
        slice: function(){
          return $(slice.apply(this, arguments))
        },

        ready: function(callback){
          // need to check if document.body exists for IE as that browser reports
          // document ready when it hasn't yet created the body element
          if (readyRE.test(document.readyState) && document.body) callback($)
          else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
          return this
        },
        get: function(idx){
          return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
        },
        toArray: function(){ return this.get() },
        size: function(){
          return this.length
        },
        remove: function(){
          return this.each(function(){
            if (this.parentNode != null)
              this.parentNode.removeChild(this)
          })
        },
        each: function(callback){
          emptyArray.every.call(this, function(el, idx){
            return callback.call(el, idx, el) !== false
          })
          return this
        },
        filter: function(selector){
          if (isFunction(selector)) return this.not(this.not(selector))
          return $(filter.call(this, function(element){
            return zepto.matches(element, selector)
          }))
        },
        add: function(selector,context){
          return $(uniq(this.concat($(selector,context))))
        },
        is: function(selector){
          return this.length > 0 && zepto.matches(this[0], selector)
        },
        not: function(selector){
          var nodes=[]
          if (isFunction(selector) && selector.call !== undefined)
            this.each(function(idx){
              if (!selector.call(this,idx)) nodes.push(this)
            })
          else {
            var excludes = typeof selector == 'string' ? this.filter(selector) :
              (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
            this.forEach(function(el){
              if (excludes.indexOf(el) < 0) nodes.push(el)
            })
          }
          return $(nodes)
        },
        has: function(selector){
          return this.filter(function(){
            return isObject(selector) ?
              $.contains(this, selector) :
              $(this).find(selector).size()
          })
        },
        eq: function(idx){
          return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
        },
        first: function(){
          var el = this[0]
          return el && !isObject(el) ? el : $(el)
        },
        last: function(){
          var el = this[this.length - 1]
          return el && !isObject(el) ? el : $(el)
        },
        find: function(selector){
          var result, $this = this
          if (typeof selector == 'object')
            result = $(selector).filter(function(){
              var node = this
              return emptyArray.some.call($this, function(parent){
                return $.contains(parent, node)
              })
            })
          else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
          else result = this.map(function(){ return zepto.qsa(this, selector) })
          return result
        },
        closest: function(selector, context){
          var node = this[0], collection = false
          if (typeof selector == 'object') collection = $(selector)
          while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
            node = node !== context && !isDocument(node) && node.parentNode
          return $(node)
        },
        parents: function(selector){
          var ancestors = [], nodes = this
          while (nodes.length > 0)
            nodes = $.map(nodes, function(node){
              if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
                ancestors.push(node)
                return node
              }
            })
          return filtered(ancestors, selector)
        },
        parent: function(selector){
          return filtered(uniq(this.pluck('parentNode')), selector)
        },
        children: function(selector){
          return filtered(this.map(function(){ return children(this) }), selector)
        },
        contents: function() {
          return this.map(function() { return slice.call(this.childNodes) })
        },
        siblings: function(selector){
          return filtered(this.map(function(i, el){
            return filter.call(children(el.parentNode), function(child){ return child!==el })
          }), selector)
        },
        empty: function(){
          return this.each(function(){ this.innerHTML = '' })
        },
        // `pluck` is borrowed from Prototype.js
        pluck: function(property){
          return $.map(this, function(el){ return el[property] })
        },
        show: function(){
          return this.each(function(){
            this.style.display == "none" && (this.style.display = '')
            if (getComputedStyle(this, '').getPropertyValue("display") == "none")
              this.style.display = defaultDisplay(this.nodeName)
          })
        },
        replaceWith: function(newContent){
          return this.before(newContent).remove()
        },
        wrap: function(structure){
          var func = isFunction(structure)
          if (this[0] && !func)
            var dom   = $(structure).get(0),
                clone = dom.parentNode || this.length > 1

          return this.each(function(index){
            $(this).wrapAll(
              func ? structure.call(this, index) :
                clone ? dom.cloneNode(true) : dom
            )
          })
        },
        wrapAll: function(structure){
          if (this[0]) {
            $(this[0]).before(structure = $(structure))
            var children
            // drill down to the inmost element
            while ((children = structure.children()).length) structure = children.first()
            $(structure).append(this)
          }
          return this
        },
        wrapInner: function(structure){
          var func = isFunction(structure)
          return this.each(function(index){
            var self = $(this), contents = self.contents(),
                dom  = func ? structure.call(this, index) : structure
            contents.length ? contents.wrapAll(dom) : self.append(dom)
          })
        },
        unwrap: function(){
          this.parent().each(function(){
            $(this).replaceWith($(this).children())
          })
          return this
        },
        clone: function(){
          return this.map(function(){ return this.cloneNode(true) })
        },
        hide: function(){
          return this.css("display", "none")
        },
        toggle: function(setting){
          return this.each(function(){
            var el = $(this)
            ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
          })
        },
        prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
        next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
        html: function(html){
          return arguments.length === 0 ?
            (this.length > 0 ? this[0].innerHTML : null) :
            this.each(function(idx){
              var originHtml = this.innerHTML
              $(this).empty().append( funcArg(this, html, idx, originHtml) )
            })
        },
        text: function(text){
          return arguments.length === 0 ?
            (this.length > 0 ? this[0].textContent : null) :
            this.each(function(){ this.textContent = (text === undefined) ? '' : ''+text })
        },
        attr: function(name, value){
          var result
          return (typeof name == 'string' && value === undefined) ?
            (this.length == 0 || this[0].nodeType !== 1 ? undefined :
              (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
              (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
            ) :
            this.each(function(idx){
              if (this.nodeType !== 1) return
              if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
              else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
            })
        },
        removeAttr: function(name){
          return this.each(function(){ this.nodeType === 1 && setAttribute(this, name) })
        },
        prop: function(name, value){
          name = propMap[name] || name
          return (value === undefined) ?
            (this[0] && this[0][name]) :
            this.each(function(idx){
              this[name] = funcArg(this, value, idx, this[name])
            })
        },
        data: function(name, value){
          var data = this.attr('data-' + name.replace(capitalRE, '-$1').toLowerCase(), value)
          return data !== null ? deserializeValue(data) : undefined
        },
        val: function(value){
          return arguments.length === 0 ?
            (this[0] && (this[0].multiple ?
               $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
               this[0].value)
            ) :
            this.each(function(idx){
              this.value = funcArg(this, value, idx, this.value)
            })
        },
        offset: function(coordinates){
          if (coordinates) return this.each(function(index){
            var $this = $(this),
                coords = funcArg(this, coordinates, index, $this.offset()),
                parentOffset = $this.offsetParent().offset(),
                props = {
                  top:  coords.top  - parentOffset.top,
                  left: coords.left - parentOffset.left
                }

            if ($this.css('position') == 'static') props['position'] = 'relative'
            $this.css(props)
          })
          if (this.length==0) return null
          var obj = this[0].getBoundingClientRect()
          return {
            left: obj.left + window.pageXOffset,
            top: obj.top + window.pageYOffset,
            width: Math.round(obj.width),
            height: Math.round(obj.height)
          }
        },
        css: function(property, value){
          if (arguments.length < 2) {
            var element = this[0], computedStyle = getComputedStyle(element, '')
            if(!element) return
            if (typeof property == 'string')
              return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
            else if (isArray(property)) {
              var props = {}
              $.each(isArray(property) ? property: [property], function(_, prop){
                props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
              })
              return props
            }
          }

          var css = ''
          if (type(property) == 'string') {
            if (!value && value !== 0)
              this.each(function(){ this.style.removeProperty(dasherize(property)) })
            else
              css = dasherize(property) + ":" + maybeAddPx(property, value)
          } else {
            for (key in property)
              if (!property[key] && property[key] !== 0)
                this.each(function(){ this.style.removeProperty(dasherize(key)) })
              else
                css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
          }

          return this.each(function(){ this.style.cssText += ';' + css })
        },
        index: function(element){
          return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(name){
          if (!name) return false
          return emptyArray.some.call(this, function(el){
            return this.test(className(el))
          }, classRE(name))
        },
        addClass: function(name){
          if (!name) return this
          return this.each(function(idx){
            classList = []
            var cls = className(this), newName = funcArg(this, name, idx, cls)
            newName.split(/\s+/g).forEach(function(klass){
              if (!$(this).hasClass(klass)) classList.push(klass)
            }, this)
            classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
          })
        },
        removeClass: function(name){
          return this.each(function(idx){
            if (name === undefined) return className(this, '')
            classList = className(this)
            funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
              classList = classList.replace(classRE(klass), " ")
            })
            className(this, classList.trim())
          })
        },
        toggleClass: function(name, when){
          if (!name) return this
          return this.each(function(idx){
            var $this = $(this), names = funcArg(this, name, idx, className(this))
            names.split(/\s+/g).forEach(function(klass){
              (when === undefined ? !$this.hasClass(klass) : when) ?
                $this.addClass(klass) : $this.removeClass(klass)
            })
          })
        },
        scrollTop: function(value){
          if (!this.length) return
          var hasScrollTop = 'scrollTop' in this[0]
          if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
          return this.each(hasScrollTop ?
            function(){ this.scrollTop = value } :
            function(){ this.scrollTo(this.scrollX, value) })
        },
        scrollLeft: function(value){
          if (!this.length) return
          var hasScrollLeft = 'scrollLeft' in this[0]
          if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
          return this.each(hasScrollLeft ?
            function(){ this.scrollLeft = value } :
            function(){ this.scrollTo(value, this.scrollY) })
        },
        position: function() {
          if (!this.length) return

          var elem = this[0],
            // Get *real* offsetParent
            offsetParent = this.offsetParent(),
            // Get correct offsets
            offset       = this.offset(),
            parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

          // Subtract element margins
          // note: when an element has margin: auto the offsetLeft and marginLeft
          // are the same in Safari causing offset.left to incorrectly be 0
          offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
          offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

          // Add offsetParent borders
          parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
          parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

          // Subtract the two offsets
          return {
            top:  offset.top  - parentOffset.top,
            left: offset.left - parentOffset.left
          }
        },
        offsetParent: function() {
          return this.map(function(){
            var parent = this.offsetParent || document.body
            while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
              parent = parent.offsetParent
            return parent
          })
        }
      }

      // for now
      $.fn.detach = $.fn.remove

      // Generate the `width` and `height` functions
      ;['width', 'height'].forEach(function(dimension){
        var dimensionProperty =
          dimension.replace(/./, function(m){ return m[0].toUpperCase() })

        $.fn[dimension] = function(value){
          var offset, el = this[0]
          if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
            isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
            (offset = this.offset()) && offset[dimension]
          else return this.each(function(idx){
            el = $(this)
            el.css(dimension, funcArg(this, value, idx, el[dimension]()))
          })
        }
      })

      function traverseNode(node, fun) {
        fun(node)
        for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
      }

      // Generate the `after`, `prepend`, `before`, `append`,
      // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
      adjacencyOperators.forEach(function(operator, operatorIndex) {
        var inside = operatorIndex % 2 //=> prepend, append

        $.fn[operator] = function(){
          // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
          var argType, nodes = $.map(arguments, function(arg) {
                argType = type(arg)
                return argType == "object" || argType == "array" || arg == null ?
                  arg : zepto.fragment(arg)
              }),
              parent, copyByClone = this.length > 1
          if (nodes.length < 1) return this

          return this.each(function(_, target){
            parent = inside ? target : target.parentNode

            // convert all methods to a "before" operation
            target = operatorIndex == 0 ? target.nextSibling :
                     operatorIndex == 1 ? target.firstChild :
                     operatorIndex == 2 ? target :
                     null

            nodes.forEach(function(node){
              if (copyByClone) node = node.cloneNode(true)
              else if (!parent) return $(node).remove()

              traverseNode(parent.insertBefore(node, target), function(el){
                if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
                   (!el.type || el.type === 'text/javascript') && !el.src)
                  window['eval'].call(window, el.innerHTML)
              })
            })
          })
        }

        // after    => insertAfter
        // prepend  => prependTo
        // before   => insertBefore
        // append   => appendTo
        $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
          $(html)[operator](this)
          return this
        }
      })

      zepto.Z.prototype = $.fn

      // Export internal API functions in the `$.zepto` namespace
      zepto.uniq = uniq
      zepto.deserializeValue = deserializeValue
      $.zepto = zepto

      return $
    })()

    window.Zepto = Zepto
    window.$ === undefined && (window.$ = Zepto)

    ;(function($){
      var $$ = $.zepto.qsa, _zid = 1, undefined,
          slice = Array.prototype.slice,
          isFunction = $.isFunction,
          isString = function(obj){ return typeof obj == 'string' },
          handlers = {},
          specialEvents={},
          focusinSupported = 'onfocusin' in window,
          focus = { focus: 'focusin', blur: 'focusout' },
          hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

      specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

      function zid(element) {
        return element._zid || (element._zid = _zid++)
      }
      function findHandlers(element, event, fn, selector) {
        event = parse(event)
        if (event.ns) var matcher = matcherFor(event.ns)
        return (handlers[zid(element)] || []).filter(function(handler) {
          return handler
            && (!event.e  || handler.e == event.e)
            && (!event.ns || matcher.test(handler.ns))
            && (!fn       || zid(handler.fn) === zid(fn))
            && (!selector || handler.sel == selector)
        })
      }
      function parse(event) {
        var parts = ('' + event).split('.')
        return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
      }
      function matcherFor(ns) {
        return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
      }

      function eventCapture(handler, captureSetting) {
        return handler.del &&
          (!focusinSupported && (handler.e in focus)) ||
          !!captureSetting
      }

      function realEvent(type) {
        return hover[type] || (focusinSupported && focus[type]) || type
      }

      function add(element, events, fn, data, selector, delegator, capture){
        var id = zid(element), set = (handlers[id] || (handlers[id] = []))
        events.split(/\s/).forEach(function(event){
          if (event == 'ready') return $(document).ready(fn)
          var handler   = parse(event)
          handler.fn    = fn
          handler.sel   = selector
          // emulate mouseenter, mouseleave
          if (handler.e in hover) fn = function(e){
            var related = e.relatedTarget
            if (!related || (related !== this && !$.contains(this, related)))
              return handler.fn.apply(this, arguments)
          }
          handler.del   = delegator
          var callback  = delegator || fn
          handler.proxy = function(e){
            e = compatible(e)
            if (e.isImmediatePropagationStopped()) return
            e.data = data
            var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
            if (result === false) e.preventDefault(), e.stopPropagation()
            return result
          }
          handler.i = set.length
          set.push(handler)
          if ('addEventListener' in element)
            element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
        })
      }
      function remove(element, events, fn, selector, capture){
        var id = zid(element)
        ;(events || '').split(/\s/).forEach(function(event){
          findHandlers(element, event, fn, selector).forEach(function(handler){
            delete handlers[id][handler.i]
          if ('removeEventListener' in element)
            element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
          })
        })
      }

      $.event = { add: add, remove: remove }

      $.proxy = function(fn, context) {
        if (isFunction(fn)) {
          var proxyFn = function(){ return fn.apply(context, arguments) }
          proxyFn._zid = zid(fn)
          return proxyFn
        } else if (isString(context)) {
          return $.proxy(fn[context], fn)
        } else {
          throw new TypeError("expected function")
        }
      }

      $.fn.bind = function(event, data, callback){
        return this.on(event, data, callback)
      }
      $.fn.unbind = function(event, callback){
        return this.off(event, callback)
      }
      $.fn.one = function(event, selector, data, callback){
        return this.on(event, selector, data, callback, 1)
      }

      var returnTrue = function(){return true},
          returnFalse = function(){return false},
          ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
          eventMethods = {
            preventDefault: 'isDefaultPrevented',
            stopImmediatePropagation: 'isImmediatePropagationStopped',
            stopPropagation: 'isPropagationStopped'
          }

      function compatible(event, source) {
        if (source || !event.isDefaultPrevented) {
          source || (source = event)

          $.each(eventMethods, function(name, predicate) {
            var sourceMethod = source[name]
            event[name] = function(){
              this[predicate] = returnTrue
              return sourceMethod && sourceMethod.apply(source, arguments)
            }
            event[predicate] = returnFalse
          })

          if (source.defaultPrevented !== undefined ? source.defaultPrevented :
              'returnValue' in source ? source.returnValue === false :
              source.getPreventDefault && source.getPreventDefault())
            event.isDefaultPrevented = returnTrue
        }
        return event
      }

      function createProxy(event) {
        var key, proxy = { originalEvent: event }
        for (key in event)
          if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

        return compatible(proxy, event)
      }

      $.fn.delegate = function(selector, event, callback){
        return this.on(event, selector, callback)
      }
      $.fn.undelegate = function(selector, event, callback){
        return this.off(event, selector, callback)
      }

      $.fn.live = function(event, callback){
        $(document.body).delegate(this.selector, event, callback)
        return this
      }
      $.fn.die = function(event, callback){
        $(document.body).undelegate(this.selector, event, callback)
        return this
      }

      $.fn.on = function(event, selector, data, callback, one){
        var autoRemove, delegator, $this = this
        if (event && !isString(event)) {
          $.each(event, function(type, fn){
            $this.on(type, selector, data, fn, one)
          })
          return $this
        }

        if (!isString(selector) && !isFunction(callback) && callback !== false)
          callback = data, data = selector, selector = undefined
        if (isFunction(data) || data === false)
          callback = data, data = undefined

        if (callback === false) callback = returnFalse

        return $this.each(function(_, element){
          if (one) autoRemove = function(e){
            remove(element, e.type, callback)
            return callback.apply(this, arguments)
          }

          if (selector) delegator = function(e){
            var evt, match = $(e.target).closest(selector, element).get(0)
            if (match && match !== element) {
              evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
              return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
            }
          }

          add(element, event, callback, data, selector, delegator || autoRemove)
        })
      }
      $.fn.off = function(event, selector, callback){
        var $this = this
        if (event && !isString(event)) {
          $.each(event, function(type, fn){
            $this.off(type, selector, fn)
          })
          return $this
        }

        if (!isString(selector) && !isFunction(callback) && callback !== false)
          callback = selector, selector = undefined

        if (callback === false) callback = returnFalse

        return $this.each(function(){
          remove(this, event, callback, selector)
        })
      }

      $.fn.trigger = function(event, args){
        event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
        event._args = args
        return this.each(function(){
          // items in the collection might not be DOM elements
          if('dispatchEvent' in this) this.dispatchEvent(event)
          else $(this).triggerHandler(event, args)
        })
      }

      // triggers event handlers on current element just as if an event occurred,
      // doesn't trigger an actual event, doesn't bubble
      $.fn.triggerHandler = function(event, args){
        var e, result
        this.each(function(i, element){
          e = createProxy(isString(event) ? $.Event(event) : event)
          e._args = args
          e.target = element
          $.each(findHandlers(element, event.type || event), function(i, handler){
            result = handler.proxy(e)
            if (e.isImmediatePropagationStopped()) return false
          })
        })
        return result
      }

      // shortcut methods for `.bind(event, fn)` for each event type
      ;('focusin focusout load resize scroll unload click dblclick '+
      'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
      'change select keydown keypress keyup error').split(' ').forEach(function(event) {
        $.fn[event] = function(callback) {
          return callback ?
            this.bind(event, callback) :
            this.trigger(event)
        }
      })

      ;['focus', 'blur'].forEach(function(name) {
        $.fn[name] = function(callback) {
          if (callback) this.bind(name, callback)
          else this.each(function(){
            try { this[name]() }
            catch(e) {}
          })
          return this
        }
      })

      $.Event = function(type, props) {
        if (!isString(type)) props = type, type = props.type
        var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
        if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
        event.initEvent(type, bubbles, true)
        return compatible(event)
      }

    })(Zepto)

    ;(function($){
      var jsonpID = 0,
          document = window.document,
          key,
          name,
          rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          scriptTypeRE = /^(?:text|application)\/javascript/i,
          xmlTypeRE = /^(?:text|application)\/xml/i,
          jsonType = 'application/json',
          htmlType = 'text/html',
          blankRE = /^\s*$/

      // trigger a custom event and return false if it was cancelled
      function triggerAndReturn(context, eventName, data) {
        var event = $.Event(eventName)
        $(context).trigger(event, data)
        return !event.isDefaultPrevented()
      }

      // trigger an Ajax "global" event
      function triggerGlobal(settings, context, eventName, data) {
        if (settings.global) return triggerAndReturn(context || document, eventName, data)
      }

      // Number of active Ajax requests
      $.active = 0

      function ajaxStart(settings) {
        if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
      }
      function ajaxStop(settings) {
        if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
      }

      // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
      function ajaxBeforeSend(xhr, settings) {
        var context = settings.context
        if (settings.beforeSend.call(context, xhr, settings) === false ||
            triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
          return false

        triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
      }
      function ajaxSuccess(data, xhr, settings, deferred) {
        var context = settings.context, status = 'success'
        settings.success.call(context, data, status, xhr)
        if (deferred) deferred.resolveWith(context, [data, status, xhr])
        triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
        ajaxComplete(status, xhr, settings)
      }
      // type: "timeout", "error", "abort", "parsererror"
      function ajaxError(error, type, xhr, settings, deferred) {
        var context = settings.context
        settings.error.call(context, xhr, type, error)
        if (deferred) deferred.rejectWith(context, [xhr, type, error])
        triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
        ajaxComplete(type, xhr, settings)
      }
      // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
      function ajaxComplete(status, xhr, settings) {
        var context = settings.context
        settings.complete.call(context, xhr, status)
        triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
        ajaxStop(settings)
      }

      // Empty function, used as default callback
      function empty() {}

      $.ajaxJSONP = function(options, deferred){
        if (!('type' in options)) return $.ajax(options)

        var _callbackName = options.jsonpCallback,
          callbackName = ($.isFunction(_callbackName) ?
            _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
          script = document.createElement('script'),
          originalCallback = window[callbackName],
          responseData,
          abort = function(errorType) {
            $(script).triggerHandler('error', errorType || 'abort')
          },
          xhr = { abort: abort }, abortTimeout

        if (deferred) deferred.promise(xhr)

        $(script).on('load error', function(e, errorType){
          clearTimeout(abortTimeout)
          $(script).off().remove()

          if (e.type == 'error' || !responseData) {
            ajaxError(null, errorType || 'error', xhr, options, deferred)
          } else {
            ajaxSuccess(responseData[0], xhr, options, deferred)
          }

          window[callbackName] = originalCallback
          if (responseData && $.isFunction(originalCallback))
            originalCallback(responseData[0])

          originalCallback = responseData = undefined
        })

        if (ajaxBeforeSend(xhr, options) === false) {
          abort('abort')
          return xhr
        }

        window[callbackName] = function(){
          responseData = arguments
        }

        script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
        document.head.appendChild(script)

        if (options.timeout > 0) abortTimeout = setTimeout(function(){
          abort('timeout')
        }, options.timeout)

        return xhr
      }

      $.ajaxSettings = {
        // Default type of request
        type: 'GET',
        // Callback that is executed before request
        beforeSend: empty,
        // Callback that is executed if the request succeeds
        success: empty,
        // Callback that is executed the the server drops error
        error: empty,
        // Callback that is executed on request complete (both: error and success)
        complete: empty,
        // The context for the callbacks
        context: null,
        // Whether to trigger "global" Ajax events
        global: true,
        // Transport
        xhr: function () {
          return new window.XMLHttpRequest()
        },
        // MIME types mapping
        // IIS returns Javascript as "application/x-javascript"
        accepts: {
          script: 'text/javascript, application/javascript, application/x-javascript',
          json:   jsonType,
          xml:    'application/xml, text/xml',
          html:   htmlType,
          text:   'text/plain'
        },
        // Whether the request is to another domain
        crossDomain: false,
        // Default timeout
        timeout: 0,
        // Whether data should be serialized to string
        processData: true,
        // Whether the browser should be allowed to cache GET responses
        cache: true
      }

      function mimeToDataType(mime) {
        if (mime) mime = mime.split(';', 2)[0]
        return mime && ( mime == htmlType ? 'html' :
          mime == jsonType ? 'json' :
          scriptTypeRE.test(mime) ? 'script' :
          xmlTypeRE.test(mime) && 'xml' ) || 'text'
      }

      function appendQuery(url, query) {
        if (query == '') return url
        return (url + '&' + query).replace(/[&?]{1,2}/, '?')
      }

      // serialize payload and append it to the URL for GET requests
      function serializeData(options) {
        if (options.processData && options.data && $.type(options.data) != "string")
          options.data = $.param(options.data, options.traditional)
        if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
          options.url = appendQuery(options.url, options.data), options.data = undefined
      }

      $.ajax = function(options){
        var settings = $.extend({}, options || {}),
            deferred = $.Deferred && $.Deferred()
        for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

        ajaxStart(settings)

        if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
          RegExp.$2 != window.location.host

        if (!settings.url) settings.url = window.location.toString()
        serializeData(settings)
        if (settings.cache === false) settings.url = appendQuery(settings.url, '_=' + Date.now())

        var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
        if (dataType == 'jsonp' || hasPlaceholder) {
          if (!hasPlaceholder)
            settings.url = appendQuery(settings.url,
              settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
          return $.ajaxJSONP(settings, deferred)
        }

        var mime = settings.accepts[dataType],
            headers = { },
            setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
            protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
            xhr = settings.xhr(),
            nativeSetHeader = xhr.setRequestHeader,
            abortTimeout

        if (deferred) deferred.promise(xhr)

        if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
        setHeader('Accept', mime || '*/*')
        if (mime = settings.mimeType || mime) {
          if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
          xhr.overrideMimeType && xhr.overrideMimeType(mime)
        }
        if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
          setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

        if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
        xhr.setRequestHeader = setHeader

        xhr.onreadystatechange = function(){
          if (xhr.readyState == 4) {
            xhr.onreadystatechange = empty
            clearTimeout(abortTimeout)
            var result, error = false
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
              dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
              result = xhr.responseText

              try {
                // http://perfectionkills.com/global-eval-what-are-the-options/
                if (dataType == 'script')    (1,eval)(result)
                else if (dataType == 'xml')  result = xhr.responseXML
                else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
              } catch (e) { error = e }

              if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
              else ajaxSuccess(result, xhr, settings, deferred)
            } else {
              ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
            }
          }
        }

        if (ajaxBeforeSend(xhr, settings) === false) {
          xhr.abort()
          ajaxError(null, 'abort', xhr, settings, deferred)
          return xhr
        }

        if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

        var async = 'async' in settings ? settings.async : true
        xhr.open(settings.type, settings.url, async, settings.username, settings.password)

        for (name in headers) nativeSetHeader.apply(xhr, headers[name])

        if (settings.timeout > 0) abortTimeout = setTimeout(function(){
            xhr.onreadystatechange = empty
            xhr.abort()
            ajaxError(null, 'timeout', xhr, settings, deferred)
          }, settings.timeout)

        // avoid sending empty string (#319)
        xhr.send(settings.data ? settings.data : null)
        return xhr
      }

      // handle optional data/success arguments
      function parseArguments(url, data, success, dataType) {
        var hasData = !$.isFunction(data)
        return {
          url:      url,
          data:     hasData  ? data : undefined,
          success:  !hasData ? data : $.isFunction(success) ? success : undefined,
          dataType: hasData  ? dataType || success : success
        }
      }

      $.get = function(url, data, success, dataType){
        return $.ajax(parseArguments.apply(null, arguments))
      }

      $.post = function(url, data, success, dataType){
        var options = parseArguments.apply(null, arguments)
        options.type = 'POST'
        return $.ajax(options)
      }

      $.getJSON = function(url, data, success){
        var options = parseArguments.apply(null, arguments)
        options.dataType = 'json'
        return $.ajax(options)
      }

      $.fn.load = function(url, data, success){
        if (!this.length) return this
        var self = this, parts = url.split(/\s/), selector,
            options = parseArguments(url, data, success),
            callback = options.success
        if (parts.length > 1) options.url = parts[0], selector = parts[1]
        options.success = function(response){
          self.html(selector ?
            $('<div>').html(response.replace(rscript, "")).find(selector)
            : response)
          callback && callback.apply(self, arguments)
        }
        $.ajax(options)
        return this
      }

      var escape = encodeURIComponent

      function serialize(params, obj, traditional, scope){
        var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
        $.each(obj, function(key, value) {
          type = $.type(value)
          if (scope) key = traditional ? scope :
            scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
          // handle data in serializeArray() format
          if (!scope && array) params.add(value.name, value.value)
          // recurse into nested objects
          else if (type == "array" || (!traditional && type == "object"))
            serialize(params, value, traditional, key)
          else params.add(key, value)
        })
      }

      $.param = function(obj, traditional){
        var params = []
        params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
        serialize(params, obj, traditional)
        return params.join('&').replace(/%20/g, '+')
      }
    })(Zepto)

    ;(function($){
      $.fn.serializeArray = function() {
        var result = [], el
        $([].slice.call(this.get(0).elements)).each(function(){
          el = $(this)
          var type = el.attr('type')
          if (this.nodeName.toLowerCase() != 'fieldset' &&
            !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
            ((type != 'radio' && type != 'checkbox') || this.checked))
            result.push({
              name: el.attr('name'),
              value: el.val()
            })
        })
        return result
      }

      $.fn.serialize = function(){
        var result = []
        this.serializeArray().forEach(function(elm){
          result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
        })
        return result.join('&')
      }

      $.fn.submit = function(callback) {
        if (callback) this.bind('submit', callback)
        else if (this.length) {
          var event = $.Event('submit')
          this.eq(0).trigger(event)
          if (!event.isDefaultPrevented()) this.get(0).submit()
        }
        return this
      }

    })(Zepto)

    ;(function($){
      // __proto__ doesn't exist on IE<11, so redefine
      // the Z function to use object extension instead
      if (!('__proto__' in {})) {
        $.extend($.zepto, {
          Z: function(dom, selector){
            dom = dom || []
            $.extend(dom, $.fn)
            dom.selector = selector || ''
            dom.__Z = true
            return dom
          },
          // this is a kludge but works
          isZ: function(object){
            return $.type(object) === 'array' && '__Z' in object
          }
        })
      }

      // getComputedStyle shouldn't freak out when called
      // without a valid element as argument
      try {
        getComputedStyle(undefined)
      } catch(e) {
        var nativeGetComputedStyle = getComputedStyle;
        window.getComputedStyle = function(element){
          try {
            return nativeGetComputedStyle(element)
          } catch(e) {
            return null
          }
        }
      }
    })(Zepto)


  TL.getJSON = Zepto.getJSON;
  TL.ajax = Zepto.ajax;
})(TL)

//     Based on https://github.com/madrobby/zepto/blob/5585fe00f1828711c04208372265a5d71e3238d1/src/ajax.js
//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.
/*
Copyright (c) 2010-2012 Thomas Fuchs
http://zeptojs.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/* **********************************************
     Begin TL.Class.js
********************************************** */

/*	TL.Class
  Class powers the OOP facilities of the library.
================================================== */
TL.Class = function () {};

TL.Class.extend = function (/*Object*/ props) /*-> Class*/ {

  // extended class with the new prototype
  var NewClass = function () {
    if (this.initialize) {
      this.initialize.apply(this, arguments);
    }
  };

  // instantiate class without calling constructor
  var F = function () {};
  F.prototype = this.prototype;
  var proto = new F();

  proto.constructor = NewClass;
  NewClass.prototype = proto;

  // add superclass access
  NewClass.superclass = this.prototype;

  // add class name
  //proto.className = props;

  //inherit parent's statics
  for (var i in this) {
    if (this.hasOwnProperty(i) && i !== 'prototype' && i !== 'superclass') {
      NewClass[i] = this[i];
    }
  }

  // mix static properties into the class
  if (props.statics) {
    TL.Util.extend(NewClass, props.statics);
    delete props.statics;
  }

  // mix includes into the prototype
  if (props.includes) {
    TL.Util.extend.apply(null, [proto].concat(props.includes));
    delete props.includes;
  }

  // merge options
  if (props.options && proto.options) {
    props.options = TL.Util.extend({}, proto.options, props.options);
  }

  // mix given properties into the prototype
  TL.Util.extend(proto, props);

  // allow inheriting further
  NewClass.extend = TL.Class.extend;

  // method for adding properties to prototype
  NewClass.include = function (props) {
    TL.Util.extend(this.prototype, props);
  };

  return NewClass;
};


/* **********************************************
     Begin TL.Events.js
********************************************** */

/*	TL.Events
  adds custom events functionality to TL classes
================================================== */
TL.Events = {
  addEventListener: function (/*String*/ type, /*Function*/ fn, /*(optional) Object*/ context) {
    var events = this._tl_events = this._tl_events || {};
    events[type] = events[type] || [];
    events[type].push({
      action: fn,
      context: context || this
    });
    return this;
  },

  hasEventListeners: function (/*String*/ type) /*-> Boolean*/ {
    var k = '_tl_events';
    return (k in this) && (type in this[k]) && (this[k][type].length > 0);
  },

  removeEventListener: function (/*String*/ type, /*Function*/ fn, /*(optional) Object*/ context) {
    if (!this.hasEventListeners(type)) {
      return this;
    }

    for (var i = 0, events = this._tl_events, len = events[type].length; i < len; i++) {
      if (
        (events[type][i].action === fn) &&
        (!context || (events[type][i].context === context))
      ) {
        events[type].splice(i, 1);
        return this;
      }
    }
    return this;
  },

  fireEvent: function (/*String*/ type, /*(optional) Object*/ data) {
    if (!this.hasEventListeners(type)) {
      return this;
    }

    var event = TL.Util.mergeData({
      type: type,
      target: this
    }, data);

    var listeners = this._tl_events[type].slice();

    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i].action.call(listeners[i].context || this, event);
    }

    return this;
  }
};

TL.Events.on	= TL.Events.addEventListener;
TL.Events.off	= TL.Events.removeEventListener;
TL.Events.fire = TL.Events.fireEvent;


/* **********************************************
     Begin TL.Browser.js
********************************************** */

/*
  Based on Leaflet Browser
  TL.Browser handles different browser and feature detections for internal  use.
*/


(function() {

  var ua = navigator.userAgent.toLowerCase(),
    doc = document.documentElement,

    ie = 'ActiveXObject' in window,

    webkit = ua.indexOf('webkit') !== -1,
    phantomjs = ua.indexOf('phantom') !== -1,
    android23 = ua.search('android [23]') !== -1,

    mobile = typeof orientation !== 'undefined',
    msPointer = navigator.msPointerEnabled && navigator.msMaxTouchPoints && !window.PointerEvent,
    pointer = (window.PointerEvent && navigator.pointerEnabled && navigator.maxTouchPoints) || msPointer,

    ie3d = ie && ('transition' in doc.style),
    webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
    gecko3d = 'MozPerspective' in doc.style,
    opera3d = 'OTransition' in doc.style,
    opera = window.opera;


  var retina = 'devicePixelRatio' in window && window.devicePixelRatio > 1;

  if (!retina && 'matchMedia' in window) {
    var matches = window.matchMedia('(min-resolution:144dpi)');
    retina = matches && matches.matches;
  }

  var touch = !window.L_NO_TOUCH && !phantomjs && (pointer || 'ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch));

  TL.Browser = {
    ie: ie,
    ua: ua,
    ie9: Boolean(ie && ua.match(/MSIE 9/i)),
    ielt9: ie && !document.addEventListener,
    webkit: webkit,
    //gecko: (ua.indexOf('gecko') !== -1) && !webkit && !window.opera && !ie,
    firefox: (ua.indexOf('gecko') !== -1) && !webkit && !window.opera && !ie,
    android: ua.indexOf('android') !== -1,
    android23: android23,
    chrome: ua.indexOf('chrome') !== -1,
    edge: ua.indexOf('edge/') !== -1,

    ie3d: ie3d,
    webkit3d: webkit3d,
    gecko3d: gecko3d,
    opera3d: opera3d,
    any3d: !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d || opera3d) && !phantomjs,

    mobile: mobile,
    mobileWebkit: mobile && webkit,
    mobileWebkit3d: mobile && webkit3d,
    mobileOpera: mobile && window.opera,

    touch: !! touch,
    msPointer: !! msPointer,
    pointer: !! pointer,

    retina: !! retina,
    orientation: function() {
      var w = window.innerWidth,
        h = window.innerHeight,
        _orientation = "portrait";

      if (w > h) {
        _orientation = "landscape";
      }
      if (Math.abs(window.orientation) == 90) {
        //_orientation = "landscape";
      }
      trace(_orientation);
      return _orientation;
    }
  };

}());


/* **********************************************
     Begin TL.Load.js
********************************************** */

/*	TL.Load
  Loads External Javascript and CSS
================================================== */

TL.Load = (function (doc) {
  var loaded	= [];

  function isLoaded(url) {

    var i			= 0,
      has_loaded	= false;

    for (i = 0; i < loaded.length; i++) {
      if (loaded[i] == url) {
        has_loaded = true;
      }
    }

    if (has_loaded) {
      return true;
    } else {
      loaded.push(url);
      return false;
    }

  }

  return {

    css: function (urls, callback, obj, context) {
      if (!isLoaded(urls)) {
        TL.LoadIt.css(urls, callback, obj, context);
      } else {
        callback();
      }
    },

    js: function (urls, callback, obj, context) {
      if (!isLoaded(urls)) {
        TL.LoadIt.js(urls, callback, obj, context);
      } else {
        callback();
      }
    }
    };

})(this.document);


/*jslint browser: true, eqeqeq: true, bitwise: true, newcap: true, immed: true, regexp: false */

/*
LazyLoad makes it easy and painless to lazily load one or more external
JavaScript or CSS files on demand either during or after the rendering of a web
page.

Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
are not officially supported.

Visit https://github.com/rgrove/lazyload/ for more info.

Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

@module lazyload
@class LazyLoad
@static
@version 2.0.3 (git)
*/

TL.LoadIt = (function (doc) {
  // -- Private Variables ------------------------------------------------------

  // User agent and feature test information.
  var env,

  // Reference to the <head> element (populated lazily).
  head,

  // Requests currently in progress, if any.
  pending = {},

  // Number of times we've polled to check whether a pending stylesheet has
  // finished loading. If this gets too high, we're probably stalled.
  pollCount = 0,

  // Queued requests.
  queue = {css: [], js: []},

  // Reference to the browser's list of stylesheets.
  styleSheets = doc.styleSheets;

  // -- Private Methods --------------------------------------------------------

  /**
  Creates and returns an HTML element with the specified name and attributes.

  @method createNode
  @param {String} name element name
  @param {Object} attrs name/value mapping of element attributes
  @return {HTMLElement}
  @private
  */
  function createNode(name, attrs) {
    var node = doc.createElement(name), attr;

    for (attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        node.setAttribute(attr, attrs[attr]);
      }
    }

    return node;
  }

  /**
  Called when the current pending resource of the specified type has finished
  loading. Executes the associated callback (if any) and loads the next
  resource in the queue.

  @method finish
  @param {String} type resource type ('css' or 'js')
  @private
  */
  function finish(type) {
    var p = pending[type],
        callback,
        urls;

    if (p) {
      callback = p.callback;
      urls     = p.urls;

      urls.shift();
      pollCount = 0;

      // If this is the last of the pending URLs, execute the callback and
      // start the next request in the queue (if any).
      if (!urls.length) {
        callback && callback.call(p.context, p.obj);
        pending[type] = null;
        queue[type].length && load(type);
      }
    }
  }

  /**
  Populates the <code>env</code> variable with user agent and feature test
  information.

  @method getEnv
  @private
  */
  function getEnv() {
    var ua = navigator.userAgent;

    env = {
      // True if this browser supports disabling async mode on dynamically
      // created script nodes. See
      // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
      async: doc.createElement('script').async === true
    };

    (env.webkit = /AppleWebKit\//.test(ua))
      || (env.ie = /MSIE/.test(ua))
      || (env.opera = /Opera/.test(ua))
      || (env.gecko = /Gecko\//.test(ua))
      || (env.unknown = true);
  }

  /**
  Loads the specified resources, or the next resource of the specified type
  in the queue if no resources are specified. If a resource of the specified
  type is already being loaded, the new request will be queued until the
  first request has been finished.

  When an array of resource URLs is specified, those URLs will be loaded in
  parallel if it is possible to do so while preserving execution order. All
  browsers support parallel loading of CSS, but only Firefox and Opera
  support parallel loading of scripts. In other browsers, scripts will be
  queued and loaded one at a time to ensure correct execution order.

  @method load
  @param {String} type resource type ('css' or 'js')
  @param {String|Array} urls (optional) URL or array of URLs to load
  @param {Function} callback (optional) callback function to execute when the
    resource is loaded
  @param {Object} obj (optional) object to pass to the callback function
  @param {Object} context (optional) if provided, the callback function will
    be executed in this object's context
  @private
  */
  function load(type, urls, callback, obj, context) {
    var _finish = function () { finish(type); },
        isCSS   = type === 'css',
        nodes   = [],
        i, len, node, p, pendingUrls, url;

    env || getEnv();

    if (urls) {
      // If urls is a string, wrap it in an array. Otherwise assume it's an
      // array and create a copy of it so modifications won't be made to the
      // original.
      urls = typeof urls === 'string' ? [urls] : urls.concat();

      // Create a request object for each URL. If multiple URLs are specified,
      // the callback will only be executed after all URLs have been loaded.
      //
      // Sadly, Firefox and Opera are the only browsers capable of loading
      // scripts in parallel while preserving execution order. In all other
      // browsers, scripts must be loaded sequentially.
      //
      // All browsers respect CSS specificity based on the order of the link
      // elements in the DOM, regardless of the order in which the stylesheets
      // are actually downloaded.
      if (isCSS || env.async || env.gecko || env.opera) {
        // Load in parallel.
        queue[type].push({
          urls    : urls,
          callback: callback,
          obj     : obj,
          context : context
        });
      } else {
        // Load sequentially.
        for (i = 0, len = urls.length; i < len; ++i) {
          queue[type].push({
            urls    : [urls[i]],
            callback: i === len - 1 ? callback : null, // callback is only added to the last URL
            obj     : obj,
            context : context
          });
        }
      }
    }

    // If a previous load request of this type is currently in progress, we'll
    // wait our turn. Otherwise, grab the next item in the queue.
    if (pending[type] || !(p = pending[type] = queue[type].shift())) {
      return;
    }

    head || (head = doc.head || doc.getElementsByTagName('head')[0]);
    pendingUrls = p.urls;

    for (i = 0, len = pendingUrls.length; i < len; ++i) {
      url = pendingUrls[i];

      if (isCSS) {
          node = env.gecko ? createNode('style') : createNode('link', {
            href: url,
            rel : 'stylesheet'
          });
      } else {
        node = createNode('script', {src: url});
        node.async = false;
      }

      node.className = 'lazyload';
      node.setAttribute('charset', 'utf-8');

      if (env.ie && !isCSS) {
        node.onreadystatechange = function () {
          if (/loaded|complete/.test(node.readyState)) {
            node.onreadystatechange = null;
            _finish();
          }
        };
      } else if (isCSS && (env.gecko || env.webkit)) {
        // Gecko and WebKit don't support the onload event on link nodes.
        if (env.webkit) {
          // In WebKit, we can poll for changes to document.styleSheets to
          // figure out when stylesheets have loaded.
          p.urls[i] = node.href; // resolve relative URLs (or polling won't work)
          pollWebKit();
        } else {
          // In Gecko, we can import the requested URL into a <style> node and
          // poll for the existence of node.sheet.cssRules. Props to Zach
          // Leatherman for calling my attention to this technique.
          node.innerHTML = '@import "' + url + '";';
          pollGecko(node);
        }
      } else {
        node.onload = node.onerror = _finish;
      }

      nodes.push(node);
    }

    for (i = 0, len = nodes.length; i < len; ++i) {
      head.appendChild(nodes[i]);
    }
  }

  /**
  Begins polling to determine when the specified stylesheet has finished loading
  in Gecko. Polling stops when all pending stylesheets have loaded or after 10
  seconds (to prevent stalls).

  Thanks to Zach Leatherman for calling my attention to the @import-based
  cross-domain technique used here, and to Oleg Slobodskoi for an earlier
  same-domain implementation. See Zach's blog for more details:
  http://www.zachleat.com/web/2010/07/29/load-css-dynamically/

  @method pollGecko
  @param {HTMLElement} node Style node to poll.
  @private
  */
  function pollGecko(node) {
    var hasRules;

    try {
      // We don't really need to store this value or ever refer to it again, but
      // if we don't store it, Closure Compiler assumes the code is useless and
      // removes it.
      hasRules = !!node.sheet.cssRules;
    } catch (ex) {
      // An exception means the stylesheet is still loading.
      pollCount += 1;

      if (pollCount < 200) {
        setTimeout(function () { pollGecko(node); }, 50);
      } else {
        // We've been polling for 10 seconds and nothing's happened. Stop
        // polling and finish the pending requests to avoid blocking further
        // requests.
        hasRules && finish('css');
      }

      return;
    }

    // If we get here, the stylesheet has loaded.
    finish('css');
  }

  /**
  Begins polling to determine when pending stylesheets have finished loading
  in WebKit. Polling stops when all pending stylesheets have loaded or after 10
  seconds (to prevent stalls).

  @method pollWebKit
  @private
  */
  function pollWebKit() {
    var css = pending.css, i;

    if (css) {
      i = styleSheets.length;

      // Look for a stylesheet matching the pending URL.
      while (--i >= 0) {
        if (styleSheets[i].href === css.urls[0]) {
          finish('css');
          break;
        }
      }

      pollCount += 1;

      if (css) {
        if (pollCount < 200) {
          setTimeout(pollWebKit, 50);
        } else {
          // We've been polling for 10 seconds and nothing's happened, which may
          // indicate that the stylesheet has been removed from the document
          // before it had a chance to load. Stop polling and finish the pending
          // request to prevent blocking further requests.
          finish('css');
        }
      }
    }
  }

  return {

    /**
    Requests the specified CSS URL or URLs and executes the specified
    callback (if any) when they have finished loading. If an array of URLs is
    specified, the stylesheets will be loaded in parallel and the callback
    will be executed after all stylesheets have finished loading.

    @method css
    @param {String|Array} urls CSS URL or array of CSS URLs to load
    @param {Function} callback (optional) callback function to execute when
      the specified stylesheets are loaded
    @param {Object} obj (optional) object to pass to the callback function
    @param {Object} context (optional) if provided, the callback function
      will be executed in this object's context
    @static
    */
    css: function (urls, callback, obj, context) {
      load('css', urls, callback, obj, context);
    },

    /**
    Requests the specified JavaScript URL or URLs and executes the specified
    callback (if any) when they have finished loading. If an array of URLs is
    specified and the browser supports it, the scripts will be loaded in
    parallel and the callback will be executed after all scripts have
    finished loading.

    Currently, only Firefox and Opera support parallel loading of scripts while
    preserving execution order. In other browsers, scripts will be
    queued and loaded one at a time to ensure correct execution order.

    @method js
    @param {String|Array} urls JS URL or array of JS URLs to load
    @param {Function} callback (optional) callback function to execute when
      the specified scripts are loaded
    @param {Object} obj (optional) object to pass to the callback function
    @param {Object} context (optional) if provided, the callback function
      will be executed in this object's context
    @static
    */
    js: function (urls, callback, obj, context) {
      load('js', urls, callback, obj, context);
    }

  };
})(this.document);


/* **********************************************
     Begin TL.TimelineConfig.js
********************************************** */

/*  TL.TimelineConfig
separate the configuration from the display (TL.Timeline)
to make testing easier
================================================== */
TL.TimelineConfig = TL.Class.extend({

  includes: [],
  initialize: function (data) {
    this.title = '';
    this.scale = '';
    this.events = [];
    this.eras = [];
    this.event_dict = {}; // despite name, all slides (events + title) indexed by slide.unique_id
    this.messages = {
      errors: [],
      warnings: []
    };

    // Initialize the data
    if (typeof data === 'object' && data.events) {
      this.scale = data.scale;
      this.events = [];
      this._ensureValidScale(data.events);

      if (data.title) {
        var title_id = this._assignID(data.title);
        this._tidyFields(data.title);
        this.title = data.title;
        this.event_dict[title_id] = this.title;
      }

      for (var i = 0; i < data.events.length; i++) {
        try {
          this.addEvent(data.events[i], true);
        } catch (e) {
            this.logError(e);
        }
      }

      if (data.eras) {
        for (var i = 0; i < data.eras.length; i++) {
          try {
            this.addEra(data.eras[i], true);
          } catch (e) {
            this.logError("Era " + i + ": " + e);
          }
        }
      }

      TL.DateUtil.sortByDate(this.events);
      TL.DateUtil.sortByDate(this.eras);

    }
  },
  logError: function(msg) {
    trace(msg);
    this.messages.errors.push(msg);
  },
  /*
   * Return any accumulated error messages. If `sep` is passed, it should be a string which will be used to join all messages, resulting in a string return value. Otherwise,
   * errors will be returned as an array.
   */
  getErrors: function(sep) {
    if (sep) {
      return this.messages.errors.join(sep);
    } else {
      return this.messages.errors;
    }
  },
  /*
   * Perform any sanity checks we can before trying to use this to make a timeline. Returns nothing, but errors will be logged
   * such that after this is called, one can test `this.isValid()` to see if everything is OK.
   */
  validate: function() {
    if (typeof(this.events) == "undefined" || typeof(this.events.length) == "undefined" || this.events.length == 0) {
      this.logError("Timeline configuration has no events.")
    }

    // make sure all eras have start and end dates
    for (var i = 0; i < this.eras.length; i++) {
      if (typeof(this.eras[i].start_date) == 'undefined' || typeof(this.eras[i].end_date) == 'undefined') {
        var era_identifier;
        if (this.eras[i].text && this.eras[i].text.headline) {
          era_identifier = this.eras[i].text.headline
        } else {
          era_identifier = "era " + (i+1);
        }
        this.logError("All eras must have start and end dates. [" + era_identifier + "]") // add internationalization (I18N) and context
      }
    };
  },

  isValid: function() {
    return this.messages.errors.length == 0;
  },
  /* Add an event (including cleaning/validation) and return the unique id.
  * All event data validation should happen in here.
  * Throws: TL.Error for any validation problems.
  */
  addEvent: function(data, defer_sort) {
    var event_id = this._assignID(data);

    if (typeof(data.start_date) == 'undefined') {
        throw new TL.Error("missing_start_date_err", event_id);
    } else {
      this._processDates(data);
      this._tidyFields(data);
    }

    this.events.push(data);
    this.event_dict[event_id] = data;

    if (!defer_sort) {
      TL.DateUtil.sortByDate(this.events);
    }
    return event_id;
  },

  addEra: function(data, defer_sort) {
    var event_id = this._assignID(data);

    if (typeof(data.start_date) == 'undefined') {
        throw new TL.Error("missing_start_date_err", event_id);
    } else {
      this._processDates(data);
      this._tidyFields(data);
    }

    this.eras.push(data);
    this.event_dict[event_id] = data;

    if (!defer_sort) {
      TL.DateUtil.sortByDate(this.eras);
    }
    return event_id;
  },

  /**
   * Given a slide, verify that its ID is unique, or assign it one which is.
   * The assignment happens in this function, and the assigned ID is also
   * the return value. Not thread-safe, because ids are not reserved
   * when assigned here.
   */
  _assignID: function(slide) {
    var slide_id = slide.unique_id;
    if (!TL.Util.trim(slide_id)) {
      // give it an ID if it doesn't have one
      slide_id = (slide.text) ? TL.Util.slugify(slide.text.headline) : null;
    }
    // make sure it's unique and add it.
    slide.unique_id = TL.Util.ensureUniqueKey(this.event_dict,slide_id);
    return slide.unique_id
  },

  /**
   * Given an array of slide configs (the events), ensure that each one has a distinct unique_id. The id of the title
   * is also passed in because in most ways it functions as an event slide, and the event IDs must also all be unique
   * from the title ID.
   */
  _makeUniqueIdentifiers: function(title_id, array) {
    var used = [title_id];

    // establish which IDs are assigned and if any appear twice, clear out successors.
    for (var i = 0; i < array.length; i++) {
      if (TL.Util.trim(array[i].unique_id)) {
        array[i].unique_id = TL.Util.slugify(array[i].unique_id); // enforce valid
        if (used.indexOf(array[i].unique_id) == -1) {
          used.push(array[i].unique_id);
        } else { // it was already used, wipe it out
          array[i].unique_id = '';
        }
      }
    };

    if (used.length != (array.length + 1)) {
      // at least some are yet to be assigned
      for (var i = 0; i < array.length; i++) {
        if (!array[i].unique_id) {
          // use the headline for the unique ID if it's available
          var slug = (array[i].text) ? TL.Util.slugify(array[i].text.headline) : null;
          if (!slug) {
            slug = TL.Util.unique_ID(6); // or generate a random ID
          }
          if (used.indexOf(slug) != -1) {
            slug = slug + '-' + i; // use the index to get a unique ID.
          }
          used.push(slug);
          array[i].unique_id = slug;
        }
      }
    }
  },
  _ensureValidScale: function(events) {
    if(!this.scale) {
      trace("Determining scale dynamically");
      this.scale = "human"; // default to human unless there's a slide which is explicitly 'cosmological' or one which has a cosmological year

      for (var i = 0; i < events.length; i++) {
        if (events[i].scale == 'cosmological') {
          this.scale = 'cosmological';
          break;
        }
        if (events[i].start_date && typeof(events[i].start_date.year) != "undefined") {
          var d = new TL.BigDate(events[i].start_date);
          var year = d.data.date_obj.year;
          if(year < -271820 || year >  275759) {
            this.scale = "cosmological";
            break;
          }
        }
      }
    }
    var dateCls = TL.DateUtil.SCALE_DATE_CLASSES[this.scale];
    if (!dateCls) { this.logError("Don't know how to process dates on scale "+this.scale); }
  },
  /*
     Given a thing which has a start_date and optionally an end_date, make sure that it is an instance
     of the correct date class (for human or cosmological scale). For slides, remove redundant end dates
     (people frequently configure an end date which is the same as the start date).
   */
  _processDates: function(slide_or_era) {
    var dateCls = TL.DateUtil.SCALE_DATE_CLASSES[this.scale];
    if(!(slide_or_era.start_date instanceof dateCls)) {
      var start_date = slide_or_era.start_date;
      slide_or_era.start_date = new dateCls(start_date);

      // eliminate redundant end dates.
      if (typeof(slide_or_era.end_date) != 'undefined' && !(slide_or_era.end_date instanceof dateCls)) {
        var end_date = slide_or_era.end_date;
        var equal = true;
        for (property in start_date) {
          equal = equal && (start_date[property] == end_date[property]);
        }
        if (equal) {
          trace("End date same as start date is redundant; dropping end date");
          delete slide_or_era.end_date;
        } else {
          slide_or_era.end_date = new dateCls(end_date);
        }

      }
    }

  },
  /**
   * Return the earliest date that this config knows about, whether it's a slide or an era
   */
  getEarliestDate: function() {
    // counting that dates were sorted in initialization
    var date = this.events[0].start_date;
    if (this.eras && this.eras.length > 0) {
      if (this.eras[0].start_date.isBefore(date)) {
        return this.eras[0].start_date;
      }
    }
    return date;

  },
  /**
   * Return the latest date that this config knows about, whether it's a slide or an era, taking end_dates into account.
   */
  getLatestDate: function() {
    var dates = [];
    for (var i = 0; i < this.events.length; i++) {
      if (this.events[i].end_date) {
        dates.push({ date: this.events[i].end_date });
      } else {
        dates.push({ date: this.events[i].start_date });
      }
    }
    for (var i = 0; i < this.eras.length; i++) {
      if (this.eras[i].end_date) {
        dates.push({ date: this.eras[i].end_date });
      } else {
        dates.push({ date: this.eras[i].start_date });
      }
    }
    TL.DateUtil.sortByDate(dates, 'date');
    return dates.slice(-1)[0].date;
  },
  _tidyFields: function(slide) {

    function fillIn(obj,key,default_value) {
      if (!default_value) default_value = '';
      if (!obj.hasOwnProperty(key)) { obj[key] = default_value }
    }

    if (slide.group) {
      slide.group = TL.Util.trim(slide.group);
    }

    if (!slide.text) {
      slide.text = {};
    }
    fillIn(slide.text,'text');
    fillIn(slide.text,'headline');
  }
});


/* **********************************************
     Begin TL.ConfigFactory.js
********************************************** */

/* TL.ConfigFactory.js
 * Build TimelineConfig objects from other data sources
 */
;(function(TL){
    /*
     * Convert a URL to a Google Spreadsheet (typically a /pubhtml version but somewhat flexible) into an object with the spreadsheet key (ID) and worksheet ID.

     If `url` is actually a string which is only letters, numbers, '-' and '_', then it's assumed to be an ID already. If we had a more precise way of testing to see if the input argument was a valid key, we might apply it, but I don't know where that's documented.

     If we're pretty sure this isn't a bare key or a url that could be used to find a Google spreadsheet then return null.
     */
    function parseGoogleSpreadsheetURL(url) {
        parts = {
            key: null,
            worksheet: 0 // not really sure how to use this to get the feed for that sheet, so this is not ready except for first sheet right now
        }
        // key as url parameter (old-fashioned)
        var key_pat = /\bkey=([-_A-Za-z0-9]+)&?/i;
        var url_pat = /docs.google.com\/spreadsheets(.*?)\/d\//; // fixing issue of URLs with u/0/d

        if (url.match(key_pat)) {
            parts.key = url.match(key_pat)[1];
            // can we get a worksheet from this form?
        } else if (url.match(url_pat)) {
            var pos = url.search(url_pat) + url.match(url_pat)[0].length;
            var tail = url.substr(pos);
            parts.key = tail.split('/')[0]
            if (url.match(/\?gid=(\d+)/)) {
                parts.worksheet = url.match(/\?gid=(\d+)/)[1];
            }
        } else if (url.match(/^\b[-_A-Za-z0-9]+$/)) {
            parts.key = url;
        }

        if (parts.key) {
            return parts;
        } else {
            return null;
        }
    }

    function extractGoogleEntryData_V1(item) {
        var item_data = {}
        for (k in item) {
            if (k.indexOf('gsx$') == 0) {
                item_data[k.substr(4)] = item[k].$t;
            }
        }
        if (TL.Util.isEmptyObject(item_data)) return null;
        var d = {
            media: {
                caption: item_data.mediacaption || '',
                credit: item_data.mediacredit || '',
                url: item_data.media || '',
                thumbnail: item_data.mediathumbnail || ''
            },
            text: {
                headline: item_data.headline || '',
                text: item_data.text || ''
            },
            group: item_data.tag || '',
            type: item_data.type || ''
        }
        if (item_data.startdate) {
            d['start_date'] = TL.Date.parseDate(item_data.startdate);
        }
        if (item_data.enddate) {
            d['end_date'] = TL.Date.parseDate(item_data.enddate);
        }


        return d;
    }

    function extractGoogleEntryData_V3(item) {

        function clean_integer(s) {
            if (s) {
                return s.replace(/[\s,]+/g,''); // doesn't handle '.' as comma separator, but how to distinguish that from decimal separator?
            }
        }

        var item_data = {}
        for (k in item) {
            if (k.indexOf('gsx$') == 0) {
                item_data[k.substr(4)] = TL.Util.trim(item[k].$t);
            }
        }
        if (TL.Util.isEmptyObject(item_data)) return null;
        var d = {
            media: {
                caption: item_data.mediacaption || '',
                credit: item_data.mediacredit || '',
                url: item_data.media || '',
                thumbnail: item_data.mediathumbnail || ''
            },
            text: {
                headline: item_data.headline || '',
                text: item_data.text || ''
            },
            start_date: {
                year: clean_integer(item_data.year),
                month: clean_integer(item_data.month) || '',
                day: clean_integer(item_data.day) || ''
            },
            end_date: {
                year: clean_integer(item_data.endyear) || '',
                month: clean_integer(item_data.endmonth) || '',
                day: clean_integer(item_data.endday) || ''
            },
            display_date: item_data.displaydate || '',

            type: item_data.type || ''
        }

        if (item_data.time) {
            TL.Util.mergeData(d.start_date,TL.DateUtil.parseTime(item_data.time));
        }

        if (item_data.endtime) {
            TL.Util.mergeData(d.end_date,TL.DateUtil.parseTime(item_data.endtime));
        }


        if (item_data.group) {
            d.group = item_data.group;
        }

        if (d.end_date.year == '') {
            var bad_date = d.end_date;
            delete d.end_date;
            if (bad_date.month != '' || bad_date.day != '' || bad_date.time != '') {
                var label = d.text.headline ||
                trace("Invalid end date for spreadsheet row. Must have a year if any other date fields are specified.");
                trace(item);
            }
        }

        if (item_data.background) {
            if (item_data.background.match(/^(https?:)?\/\/?/)) { // support http, https, protocol relative, site relative
                d['background'] = { 'url': item_data.background }
            } else { // for now we'll trust it's a color
                d['background'] = { 'color': item_data.background }
            }
        }

        return d;
    }

    var getGoogleItemExtractor = function(data) {
        if (typeof data.feed.entry === 'undefined'
                || data.feed.entry.length == 0) {
            throw new TL.Error("empty_feed_err");
        }
        var entry = data.feed.entry[0];

        if (typeof entry.gsx$startdate !== 'undefined') {
            // check headers V1
            // var headers_V1 = ['startdate', 'enddate', 'headline','text','media','mediacredit','mediacaption','mediathumbnail','media','type','tag'];
            // for (var i = 0; i < headers_V1.length; i++) {
            //     if (typeof entry['gsx$' + headers_V1[i]] == 'undefined') {
            //         throw new TL.Error("invalid_data_format_err");
            //     }
            // }
            return extractGoogleEntryData_V1;
        } else if (typeof entry.gsx$year !== 'undefined') {
            // check rest of V3 headers
            var headers_V3 = ['month', 'day', 'time', 'endmonth', 'endyear', 'endday', 'endtime', 'displaydate', 'headline','text','media','mediacredit','mediacaption','mediathumbnail','type','group','background'];
            // for (var i = 0; i < headers_V3.length; i++) {
            //     if (typeof entry['gsx$' + headers_V3[i]] == 'undefined') {
            //         throw new TL.Error("invalid_data_format_err");
            //     }
            // }
            return extractGoogleEntryData_V3;
        }
        throw new TL.Error("invalid_data_format_err");
    }

    var buildGoogleFeedURL = function(parts) {
        return "https://spreadsheets.google.com/feeds/list/" + parts.key + "/1/public/values?alt=json";

    }

    var jsonFromGoogleURL = function(url) {
        var url = buildGoogleFeedURL(parseGoogleSpreadsheetURL(url));
            var timeline_config = { 'events': [] };
            var data = TL.ajax({
                url: url,
                async: false
            });
            data = JSON.parse(data.responseText);
            return googleFeedJSONtoTimelineJSON(data);
        }

    var googleFeedJSONtoTimelineJSON = function(data) {
        var timeline_config = { 'events': [], 'errors': [], 'warnings': [], 'eras': [] }
        var extract = getGoogleItemExtractor(data);
        for (var i = 0; i < data.feed.entry.length; i++) {
            try {
                var event = extract(data.feed.entry[i]);
                if (event) { // blank rows return null
                  var row_type = 'event';
                  if (typeof(event.type) != 'undefined') {
                      row_type = event.type;
                      delete event.type;
                  }
                  if (row_type == 'title') {
                    if (!timeline_config.title) {
                      timeline_config.title = event;
                    } else {
                      timeline_config.warnings.push("Multiple title slides detected.");
                      timeline_config.events.push(event);
                    }
                  } else if (row_type == 'era') {
                    timeline_config.eras.push(event);
                  } else {
                      timeline_config.events.push(event);
                  }
                }
            } catch(e) {
                if (e.message) {
                    e = e.message;
                }
                timeline_config.errors.push(e + " ["+ i +"]");
            }
        };
        return timeline_config;

    }

    var makeConfig = function(url, callback) {
        var tc,
            key = parseGoogleSpreadsheetURL(url);

        if (key) {
            try {
                var json = jsonFromGoogleURL(url);
            } catch(e) {
                tc = new TL.TimelineConfig();
                if (e.name == 'NetworkError') {
                    tc.logError(new TL.Error("network_err"));
                } else if(e.name == 'TL.Error') {
                    tc.logError(e);
                } else {
                    tc.logError(new TL.Error("unknown_read_err", e.name));
                }
                callback(tc);
                return;
            }
            tc = new TL.TimelineConfig(json);
            if (json.errors) {
                for (var i = 0; i < json.errors.length; i++) {
                    tc.logError(json.errors[i]);
                };
            }
            callback(tc);
        } else {
            TL.getJSON(url, function(data){
                try {
                    tc = new TL.TimelineConfig(data);
                } catch(e) {
                    tc = new TL.TimelineConfig();
                    tc.logError(e);
                }
                callback(tc);
            });
        }
    }

    TL.ConfigFactory = {
        // export for unit testing and use by authoring tool
        parseGoogleSpreadsheetURL: parseGoogleSpreadsheetURL,
        // export for unit testing
        googleFeedJSONtoTimelineJSON: googleFeedJSONtoTimelineJSON,


        fromGoogle: function(url) {
            console.warn("TL.ConfigFactory.fromGoogle is deprecated and will be removed soon. Use TL.ConfigFactory.makeConfig(url,callback)")
            return jsonFromGoogleURL(url);

        },

        /*
         * Given a URL to a Timeline data source, read the data, create a TimelineConfig
         * object, and call the given `callback` function passing the created config as
         * the only argument. This should be the main public interface to getting configs
         * from any kind of URL, Google or direct JSON.
         */
        makeConfig: makeConfig,
    }
})(TL)


/* **********************************************
     Begin TL.Language.js
********************************************** */

TL.Language = function(options) {
  // borrowed from http://stackoverflow.com/a/14446414/102476
  for (k in TL.Language.languages.en) {
    this[k] = TL.Language.languages.en[k];
  }
  if (options && options.language && typeof(options.language) == 'string' && options.language != 'en') {
    var code = options.language;
    if (!(code in TL.Language.languages)) {
      if (/\.json$/.test(code)) {
        var url = code;
      } else {
        var fragment = "/locale/" + code + ".json";
        var script_path = options.script_path || TL.Timeline.source_path;
        if (/\/$/.test(script_path)) { fragment = fragment.substr(1)}
        var url = script_path + fragment;
      }
      var self = this;
      var xhr = TL.ajax({
        url: url, async: false
      });
      if (xhr.status == 200) {
        TL.Language.languages[code] = JSON.parse(xhr.responseText);
      } else {
        throw "Could not load language [" + code + "]: " + xhr.statusText;
      }
    }
    TL.Util.mergeData(this,TL.Language.languages[code]);

  }
}

TL.Language.formatNumber = function(val,mask) {
    if (mask.match(/%(\.(\d+))?f/)) {
      var match = mask.match(/%(\.(\d+))?f/);
      var token = match[0];
      if (match[2]) {
        val = val.toFixed(match[2]);
      }
      return mask.replace(token,val);
    }
    // use mask as literal display value.
    return mask;
  }



/* TL.Util.mergeData is shallow, we have nested dicts.
   This is a simplistic handling but should work.
 */
TL.Language.prototype.mergeData = function(lang_json) {
  for (k in TL.Language.languages.en) {
    if (lang_json[k]) {
      if (typeof(this[k]) == 'object') {
        TL.Util.mergeData(lang_json[k], this[k]);
      } else {
        this[k] = lang_json[k]; // strings, mostly
      }
    }
  }
}

TL.Language.fallback = { messages: {} }; // placeholder to satisfy IE8 early compilation
TL.Language.prototype.getMessage = function(k) {
  return this.messages[k] || TL.Language.fallback.messages[k] || k;
}

TL.Language.prototype._ = TL.Language.prototype.getMessage; // keep it concise

TL.Language.prototype.formatDate = function(date, format_name) {

  if (date.constructor == Date) {
    return this.formatJSDate(date, format_name);
  }

  if (date.constructor == TL.BigYear) {
    return this.formatBigYear(date, format_name);
  }

  if (date.data && date.data.date_obj) {
    return this.formatDate(date.data.date_obj, format_name);
  }

  trace("Unfamiliar date presented for formatting");
  return date.toString();
}

TL.Language.prototype.formatBigYear = function(bigyear, format_name) {
  var the_year = bigyear.year;
  var format_list = this.bigdateformats[format_name] || this.bigdateformats['fallback'];

  if (format_list) {
    for (var i = 0; i < format_list.length; i++) {
      var tuple = format_list[i];
      if (Math.abs(the_year / tuple[0]) > 1) {
        // will we ever deal with distant future dates?
        return TL.Language.formatNumber(Math.abs(the_year / tuple[0]),tuple[1])
      }
    };

    return the_year.toString();

  } else {
      trace("Language file dateformats missing cosmological. Falling back.");
      return TL.Language.formatNumber(the_year,format_name);
  }
}

TL.Language.prototype.formatJSDate = function(js_date, format_name) {
  // ultimately we probably want this to work with TL.Date instead of (in addition to?) JS Date
  // utc, timezone and timezoneClip are carry over from Steven Levithan implementation. We probably aren't going to use them.
  var self = this;
  var formatPeriod = function(fmt, value) {
    var formats = self.period_labels[fmt];
    if (formats) {
      var fmt = (value < 12) ? formats[0] : formats[1];
    }
    return "<span class='tl-timeaxis-timesuffix'>" + fmt + "</span>";
  }

  var utc = false,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g;


  if (!format_name) {
    format_name = 'full';
  }

  var mask = this.dateformats[format_name] || TL.Language.fallback.dateformats[format_name];
  if (!mask) {
    mask = format_name; // allow custom format strings
  }


  var	_ = utc ? "getUTC" : "get",
    d = js_date[_ + "Date"](),
    D = js_date[_ + "Day"](),
    m = js_date[_ + "Month"](),
    y = js_date[_ + "FullYear"](),
    H = js_date[_ + "Hours"](),
    M = js_date[_ + "Minutes"](),
    s = js_date[_ + "Seconds"](),
    L = js_date[_ + "Milliseconds"](),
    o = utc ? 0 : js_date.getTimezoneOffset(),
    year = "",
    flags = {
      d:    d,
      dd:   TL.Util.pad(d),
      ddd:  this.date.day_abbr[D],
      dddd: this.date.day[D],
      m:    m + 1,
      mm:   TL.Util.pad(m + 1),
      mmm:  this.date.month_abbr[m],
      mmmm: this.date.month[m],
      yy:   String(y).slice(2),
      yyyy: (y < 0 && this.has_negative_year_modifier()) ? Math.abs(y) : y,
      h:    H % 12 || 12,
      hh:   TL.Util.pad(H % 12 || 12),
      H:    H,
      HH:   TL.Util.pad(H),
      M:    M,
      MM:   TL.Util.pad(M),
      s:    s,
      ss:   TL.Util.pad(s),
      l:    TL.Util.pad(L, 3),
      L:    TL.Util.pad(L > 99 ? Math.round(L / 10) : L),
      t:    formatPeriod('t',H),
      tt:   formatPeriod('tt',H),
      T:    formatPeriod('T',H),
      TT:   formatPeriod('TT',H),
      Z:    utc ? "UTC" : (String(js_date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
      o:    (o > 0 ? "-" : "+") + TL.Util.pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
      S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
    };

    var formatted = mask.replace(TL.Language.DATE_FORMAT_TOKENS, function ($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });

    return this._applyEra(formatted, y);
}

TL.Language.prototype.has_negative_year_modifier = function() {
  return Boolean(this.era_labels.negative_year.prefix || this.era_labels.negative_year.suffix);
}


TL.Language.prototype._applyEra = function(formatted_date, original_year) {
  // trusts that the formatted_date was property created with a non-negative year if there are
  // negative affixes to be applied
  var labels = (original_year < 0) ? this.era_labels.negative_year : this.era_labels.positive_year;
  var result = '';
  if (labels.prefix) { result += '<span>' + labels.prefix + '</span> ' }
  result += formatted_date;
  if (labels.suffix) { result += ' <span>' + labels.suffix + '</span>' }
  return result;
}


TL.Language.DATE_FORMAT_TOKENS = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;

TL.Language.languages = {
/*
  This represents the canonical list of message keys which translation files should handle. The existence of the 'en.json' file should not mislead you.
  It is provided more as a starting point for someone who wants to provide a
  new translation since the form for non-default languages (JSON not JS) is slightly different from what appears below. Also, those files have some message keys grandfathered in from TimelineJS2 which we'd rather not have to
  get "re-translated" if we use them.
*/
  en: {
    name: 					"English",
    lang: 					"en",
        api: {
            wikipedia:          "en" // the two letter code at the beginning of the Wikipedia subdomain for this language
        },
    messages: {
      loading: 			            		  "Loading",
      wikipedia: 			            		"From Wikipedia, the free encyclopedia",
      error: 				            			"Error",
      contract_timeline:              "Contract Timeline",
      return_to_title:                "Return to Title",
      loading_content:                "Loading Content",
      expand_timeline:                "Expand Timeline",
      loading_timeline:               "Loading Timeline... ",
      swipe_to_navigate:              "Swipe to Navigate<br><span class='tl-button'>OK</span>",
      unknown_read_err:               "An unexpected error occurred trying to read your spreadsheet data",
      network_err:                    "Unable to read your Google Spreadsheet. Make sure you have published it to the web.",
      empty_feed_err:                 "No data entries found",
      missing_start_date_err:         "Missing start_date",
      invalid_data_format_err:        "Header row has been modified.",
      date_compare_err:               "Can't compare TL.Dates on different scales",
      invalid_scale_err:              "Invalid scale",
      invalid_date_err:               "Invalid date: month, day and year must be numbers.",
      invalid_separator_error:        "Invalid time: misuse of : or . as separator.",
      invalid_hour_err:               "Invalid time (hour)",
      invalid_minute_err:             "Invalid time (minute)",
      invalid_second_err:             "Invalid time (second)",
      invalid_fractional_err:         "Invalid time (fractional seconds)",
      invalid_second_fractional_err:  "Invalid time (seconds and fractional seconds)",
      invalid_year_err:               "Invalid year",
      flickr_notfound_err:            "Photo not found or private",
      flickr_invalidurl_err:          "Invalid Flickr URL",
      imgur_invalidurl_err:           "Invalid Imgur URL",
      twitter_invalidurl_err:         "Invalid Twitter URL",
      twitter_load_err:               "Unable to load Tweet",
      twitterembed_invalidurl_err:    "Invalid Twitter Embed url",
      wikipedia_load_err:             "Unable to load Wikipedia entry",
      youtube_invalidurl_err:         "Invalid YouTube URL",
      spotify_invalid_url:            "Invalid Spotify URL",
      template_value_err:             "No value provided for variable",
      invalid_rgb_err:                "Invalid RGB argument",
      time_scale_scale_err:           "Don't know how to get date from time for scale",
      axis_helper_no_options_err:     "Axis helper must be configured with options",
      axis_helper_scale_err:          "No AxisHelper available for scale",
      invalid_integer_option:       	"Invalid option value—must be a whole number."
    },
    date: {
      month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      month_abbr: ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
      day: ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      day_abbr: ["Sun.","Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."]
    },
    era_labels: { // specify prefix or suffix to apply to formatted date. Blanks mean no change.
          positive_year: {
            prefix: '',
            suffix: ''
          },
          negative_year: { // if either of these is specified, the year will be converted to positive before they are applied
            prefix: '',
            suffix: 'BCE'
          }
        },
        period_labels: {  // use of t/tt/T/TT legacy of original Timeline date format
      t: ['a', 'p'],
      tt: ['am', 'pm'],
      T: ['A', 'P'],
      TT: ['AM', 'PM']
    },
    dateformats: {
      year: "yyyy",
      month_short: "mmm",
      month: "mmmm yyyy",
      full_short: "mmm d",
      full: "mmmm d',' yyyy",
      time: "h:MM:ss TT' <small>'mmmm d',' yyyy'</small>'",
      time_short: "h:MM:ss TT",
      time_no_seconds_short: "h:MM TT",
      time_no_minutes_short: "h TT",
      time_no_seconds_small_date: "h:MM TT' <small>'mmmm d',' yyyy'</small>'",
      time_milliseconds: "l",
      full_long: "mmm d',' yyyy 'at' h:MM TT",
      full_long_small_date: "h:MM TT' <small>mmm d',' yyyy'</small>'"
    },
    bigdateformats: {
      fallback: [ // a list of tuples, with t[0] an order of magnitude and t[1] a format string. format string syntax may change...
        [1000000000,"%.2f billion years ago"],
        [1000000,"%.1f million years ago"],
        [1000,"%.1f thousand years ago"],
        [1, "%f years ago"]
      ],
        compact: [
        [1000000000,"%.2f bya"],
        [1000000,"%.1f mya"],
        [1000,"%.1f kya"],
        [1, "%f years ago"]
      ],
        verbose: [
        [1000000000,"%.2f billion years ago"],
        [1000000,"%.1f million years ago"],
        [1000,"%.1f thousand years ago"],
        [1, "%f years ago"]
      ]
    }
  }
}

TL.Language.fallback = new TL.Language();


/* **********************************************
     Begin TL.I18NMixins.js
********************************************** */

/*  TL.I18NMixins
    assumes that its class has an options object with a TL.Language instance
================================================== */
TL.I18NMixins = {
    getLanguage: function() {
        if (this.options && this.options.language) {
            return this.options.language;
        }
        trace("Expected a language option");
        return TL.Language.fallback;
    },

    _: function(msg) {
        return this.getLanguage()._(msg);
    }
}


/* **********************************************
     Begin TL.Ease.js
********************************************** */

/* The equations defined here are open source under BSD License.
 * http://www.robertpenner.com/easing_terms_of_use.html (c) 2003 Robert Penner
 * Adapted to single time-based by
 * Brian Crescimanno <brian.crescimanno@gmail.com>
 * Ken Snyder <kendsnyder@gmail.com>
 */

/** MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
/**
 * KeySpline - use bezier curve for transition easing function
 * is inspired from Firefox's nsSMILKeySpline.cpp
 * Usage:
 * var spline = new KeySpline(0.25, 0.1, 0.25, 1.0)
 * spline.get(x) => returns the easing value | x must be in [0, 1] range
 */

TL.Easings = {
    ease:        [0.25, 0.1, 0.25, 1.0],
    linear:      [0.00, 0.0, 1.00, 1.0],
    easein:     [0.42, 0.0, 1.00, 1.0],
    easeout:    [0.00, 0.0, 0.58, 1.0],
    easeinout: [0.42, 0.0, 0.58, 1.0]
};

TL.Ease = {
  KeySpline: function(a) {
  //KeySpline: function(mX1, mY1, mX2, mY2) {
    this.get = function(aX) {
      if (a[0] == a[1] && a[2] == a[3]) return aX; // linear
      return CalcBezier(GetTForX(aX), a[1], a[3]);
    }

    function A(aA1, aA2) {
      return 1.0 - 3.0 * aA2 + 3.0 * aA1;
    }

    function B(aA1, aA2) {
      return 3.0 * aA2 - 6.0 * aA1;
    }

    function C(aA1) {
      return 3.0 * aA1;
    }

    // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.

    function CalcBezier(aT, aA1, aA2) {
      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }

    // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.

    function GetSlope(aT, aA1, aA2) {
      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
    }

    function GetTForX(aX) {
      // Newton raphson iteration
      var aGuessT = aX;
      for (var i = 0; i < 4; ++i) {
        var currentSlope = GetSlope(aGuessT, a[0], a[2]);
        if (currentSlope == 0.0) return aGuessT;
        var currentX = CalcBezier(aGuessT, a[0], a[2]) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }
  },

  easeInSpline: function(t) {
    var spline = new TL.Ease.KeySpline(TL.Easings.easein);
    return spline.get(t);
  },

  easeInOutExpo: function(t) {
    var spline = new TL.Ease.KeySpline(TL.Easings.easein);
    return spline.get(t);
  },

  easeOut: function(t) {
    return Math.sin(t * Math.PI / 2);
  },
  easeOutStrong: function(t) {
    return (t == 1) ? 1 : 1 - Math.pow(2, - 10 * t);
  },
  easeIn: function(t) {
    return t * t;
  },
  easeInStrong: function(t) {
    return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1));
  },
  easeOutBounce: function(pos) {
    if ((pos) < (1 / 2.75)) {
      return (7.5625 * pos * pos);
    } else if (pos < (2 / 2.75)) {
      return (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
    } else if (pos < (2.5 / 2.75)) {
      return (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
    } else {
      return (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
    }
  },
  easeInBack: function(pos) {
    var s = 1.70158;
    return (pos) * pos * ((s + 1) * pos - s);
  },
  easeOutBack: function(pos) {
    var s = 1.70158;
    return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
  },
  bounce: function(t) {
    if (t < (1 / 2.75)) {
      return 7.5625 * t * t;
    }
    if (t < (2 / 2.75)) {
      return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
    }
    if (t < (2.5 / 2.75)) {
      return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
    }
    return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
  },
  bouncePast: function(pos) {
    if (pos < (1 / 2.75)) {
      return (7.5625 * pos * pos);
    } else if (pos < (2 / 2.75)) {
      return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
    } else if (pos < (2.5 / 2.75)) {
      return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
    } else {
      return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
    }
  },
  swingTo: function(pos) {
    var s = 1.70158;
    return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
  },
  swingFrom: function(pos) {
    var s = 1.70158;
    return pos * pos * ((s + 1) * pos - s);
  },
  elastic: function(pos) {
    return -1 * Math.pow(4, - 8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
  },
  spring: function(pos) {
    return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));
  },
  blink: function(pos, blinks) {
    return Math.round(pos * (blinks || 5)) % 2;
  },
  pulse: function(pos, pulses) {
    return (-Math.cos((pos * ((pulses || 5) - .5) * 2) * Math.PI) / 2) + .5;
  },
  wobble: function(pos) {
    return (-Math.cos(pos * Math.PI * (9 * pos)) / 2) + 0.5;
  },
  sinusoidal: function(pos) {
    return (-Math.cos(pos * Math.PI) / 2) + 0.5;
  },
  flicker: function(pos) {
    var pos = pos + (Math.random() - 0.5) / 5;
    return easings.sinusoidal(pos < 0 ? 0 : pos > 1 ? 1 : pos);
  },
  mirror: function(pos) {
    if (pos < 0.5) return easings.sinusoidal(pos * 2);
    else return easings.sinusoidal(1 - (pos - 0.5) * 2);
  },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
};

/*
Math.easeInExpo = function (t, b, c, d) {
  return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
};



// exponential easing out - decelerating to zero velocity


Math.easeOutExpo = function (t, b, c, d) {
  return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
};



// exponential easing in/out - accelerating until halfway, then decelerating


Math.easeInOutExpo = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
  t--;
  return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};
*/

/* **********************************************
     Begin TL.Animate.js
********************************************** */

/*	TL.Animate
  Basic animation
================================================== */

TL.Animate = function(el, options) {
  var animation = new tlanimate(el, options),
    webkit_timeout;
    /*
    // POSSIBLE ISSUE WITH WEBKIT FUTURE BUILDS
  var onWebKitTimeout = function() {

    animation.stop(true);
  }
  if (TL.Browser.webkit) {
    webkit_timeout = setTimeout(function(){onWebKitTimeout()}, options.duration);
  }
  */
  return animation;
};


/*	Based on: Morpheus
  https://github.com/ded/morpheus - (c) Dustin Diaz 2011
  License MIT
================================================== */
window.tlanimate = (function() {

  var doc = document,
    win = window,
    perf = win.performance,
    perfNow = perf && (perf.now || perf.webkitNow || perf.msNow || perf.mozNow),
    now = perfNow ? function () { return perfNow.call(perf) } : function () { return +new Date() },
    html = doc.documentElement,
    fixTs = false, // feature detected below
    thousand = 1000,
    rgbOhex = /^rgb\(|#/,
    relVal = /^([+\-])=([\d\.]+)/,
    numUnit = /^(?:[\+\-]=?)?\d+(?:\.\d+)?(%|in|cm|mm|em|ex|pt|pc|px)$/,
    rotate = /rotate\(((?:[+\-]=)?([\-\d\.]+))deg\)/,
    scale = /scale\(((?:[+\-]=)?([\d\.]+))\)/,
    skew = /skew\(((?:[+\-]=)?([\-\d\.]+))deg, ?((?:[+\-]=)?([\-\d\.]+))deg\)/,
    translate = /translate\(((?:[+\-]=)?([\-\d\.]+))px, ?((?:[+\-]=)?([\-\d\.]+))px\)/,
    // these elements do not require 'px'
    unitless = { lineHeight: 1, zoom: 1, zIndex: 1, opacity: 1, transform: 1};

  // which property name does this browser use for transform
  var transform = function () {
    var styles = doc.createElement('a').style,
      props = ['webkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'Transform'],
      i;

    for (i = 0; i < props.length; i++) {
      if (props[i] in styles) return props[i]
    };
  }();

  // does this browser support the opacity property?
  var opacity = function () {
    return typeof doc.createElement('a').style.opacity !== 'undefined'
  }();

  // initial style is determined by the elements themselves
  var getStyle = doc.defaultView && doc.defaultView.getComputedStyle ?
  function (el, property) {
    property = property == 'transform' ? transform : property
    property = camelize(property)
    var value = null,
      computed = doc.defaultView.getComputedStyle(el, '');

    computed && (value = computed[property]);
    return el.style[property] || value;
  } : html.currentStyle ?

    function (el, property) {
    property = camelize(property)

    if (property == 'opacity') {
      var val = 100
      try {
        val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity
      } catch (e1) {
        try {
          val = el.filters('alpha').opacity
        } catch (e2) {

        }
      }
      return val / 100
    }
    var value = el.currentStyle ? el.currentStyle[property] : null
    return el.style[property] || value
  } :

    function (el, property) {
    return el.style[camelize(property)]
    }

  var frame = function () {
    // native animation frames
    // http://webstuff.nfshost.com/anim-timing/Overview.html
    // http://dev.chromium.org/developers/design-documents/requestanimationframe-implementation
    return win.requestAnimationFrame  ||
      win.webkitRequestAnimationFrame ||
      win.mozRequestAnimationFrame    ||
      win.msRequestAnimationFrame     ||
      win.oRequestAnimationFrame      ||
      function (callback) {
        win.setTimeout(function () {
          callback(+new Date())
        }, 17) // when I was 17..
      }
  }()

  var children = []

  frame(function(timestamp) {
      // feature-detect if rAF and now() are of the same scale (epoch or high-res),
    // if not, we have to do a timestamp fix on each frame
    fixTs = timestamp > 1e12 != now() > 1e12
  })

  function has(array, elem, i) {
    if (Array.prototype.indexOf) return array.indexOf(elem)
    for (i = 0; i < array.length; ++i) {
      if (array[i] === elem) return i
    }
  }

  function render(timestamp) {
    var i, count = children.length
    // if we're using a high res timer, make sure timestamp is not the old epoch-based value.
    // http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision
    if (perfNow && timestamp > 1e12) timestamp = now()
  if (fixTs) timestamp = now()
    for (i = count; i--;) {
      children[i](timestamp)
    }
    children.length && frame(render)
  }

  function live(f) {
    if (children.push(f) === 1) frame(render)
  }

  function die(f) {
    var rest, index = has(children, f)
    if (index >= 0) {
      rest = children.slice(index + 1)
      children.length = index
      children = children.concat(rest)
    }
  }

  function parseTransform(style, base) {
    var values = {}, m
    if (m = style.match(rotate)) values.rotate = by(m[1], base ? base.rotate : null)
    if (m = style.match(scale)) values.scale = by(m[1], base ? base.scale : null)
    if (m = style.match(skew)) {values.skewx = by(m[1], base ? base.skewx : null); values.skewy = by(m[3], base ? base.skewy : null)}
    if (m = style.match(translate)) {values.translatex = by(m[1], base ? base.translatex : null); values.translatey = by(m[3], base ? base.translatey : null)}
    return values
  }

  function formatTransform(v) {
    var s = ''
    if ('rotate' in v) s += 'rotate(' + v.rotate + 'deg) '
    if ('scale' in v) s += 'scale(' + v.scale + ') '
    if ('translatex' in v) s += 'translate(' + v.translatex + 'px,' + v.translatey + 'px) '
    if ('skewx' in v) s += 'skew(' + v.skewx + 'deg,' + v.skewy + 'deg)'
    return s
  }

  function rgb(r, g, b) {
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)
  }

  // convert rgb and short hex to long hex
  function toHex(c) {
    var m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    return (m ? rgb(m[1], m[2], m[3]) : c)
      .replace(/#(\w)(\w)(\w)$/, '#$1$1$2$2$3$3') // short skirt to long jacket
  }

  // change font-size => fontSize etc.
  function camelize(s) {
    return s.replace(/-(.)/g, function (m, m1) {
      return m1.toUpperCase()
    })
  }

  // aren't we having it?
  function fun(f) {
    return typeof f == 'function'
  }

  function nativeTween(t) {
    // default to a pleasant-to-the-eye easeOut (like native animations)
    return Math.sin(t * Math.PI / 2)
  }

  /**
    * Core tween method that requests each frame
    * @param duration: time in milliseconds. defaults to 1000
    * @param fn: tween frame callback function receiving 'position'
    * @param done {optional}: complete callback function
    * @param ease {optional}: easing method. defaults to easeOut
    * @param from {optional}: integer to start from
    * @param to {optional}: integer to end at
    * @returns method to stop the animation
    */
  function tween(duration, fn, done, ease, from, to) {
    ease = fun(ease) ? ease : morpheus.easings[ease] || nativeTween
    var time = duration || thousand
      , self = this
      , diff = to - from
      , start = now()
      , stop = 0
      , end = 0

    function run(t) {
      var delta = t - start
      if (delta > time || stop) {
        to = isFinite(to) ? to : 1
        stop ? end && fn(to) : fn(to)
        die(run)
        return done && done.apply(self)
      }
      // if you don't specify a 'to' you can use tween as a generic delta tweener
      // cool, eh?
      isFinite(to) ?
        fn((diff * ease(delta / time)) + from) :
        fn(ease(delta / time))
    }

    live(run)

    return {
      stop: function (jump) {
        stop = 1
        end = jump // jump to end of animation?
        if (!jump) done = null // remove callback if not jumping to end
      }
    }
  }

  /**
    * generic bezier method for animating x|y coordinates
    * minimum of 2 points required (start and end).
    * first point start, last point end
    * additional control points are optional (but why else would you use this anyway ;)
    * @param points: array containing control points
       [[0, 0], [100, 200], [200, 100]]
    * @param pos: current be(tween) position represented as float  0 - 1
    * @return [x, y]
    */
  function bezier(points, pos) {
    var n = points.length, r = [], i, j
    for (i = 0; i < n; ++i) {
      r[i] = [points[i][0], points[i][1]]
    }
    for (j = 1; j < n; ++j) {
      for (i = 0; i < n - j; ++i) {
        r[i][0] = (1 - pos) * r[i][0] + pos * r[parseInt(i + 1, 10)][0]
        r[i][1] = (1 - pos) * r[i][1] + pos * r[parseInt(i + 1, 10)][1]
      }
    }
    return [r[0][0], r[0][1]]
  }

  // this gets you the next hex in line according to a 'position'
  function nextColor(pos, start, finish) {
    var r = [], i, e, from, to
    for (i = 0; i < 6; i++) {
      from = Math.min(15, parseInt(start.charAt(i),  16))
      to   = Math.min(15, parseInt(finish.charAt(i), 16))
      e = Math.floor((to - from) * pos + from)
      e = e > 15 ? 15 : e < 0 ? 0 : e
      r[i] = e.toString(16)
    }
    return '#' + r.join('')
  }

  // this retreives the frame value within a sequence
  function getTweenVal(pos, units, begin, end, k, i, v) {
    if (k == 'transform') {
      v = {}
      for (var t in begin[i][k]) {
        v[t] = (t in end[i][k]) ? Math.round(((end[i][k][t] - begin[i][k][t]) * pos + begin[i][k][t]) * thousand) / thousand : begin[i][k][t]
      }
      return v
    } else if (typeof begin[i][k] == 'string') {
      return nextColor(pos, begin[i][k], end[i][k])
    } else {
      // round so we don't get crazy long floats
      v = Math.round(((end[i][k] - begin[i][k]) * pos + begin[i][k]) * thousand) / thousand
      // some css properties don't require a unit (like zIndex, lineHeight, opacity)
      if (!(k in unitless)) v += units[i][k] || 'px'
      return v
    }
  }

  // support for relative movement via '+=n' or '-=n'
  function by(val, start, m, r, i) {
    return (m = relVal.exec(val)) ?
      (i = parseFloat(m[2])) && (start + (m[1] == '+' ? 1 : -1) * i) :
      parseFloat(val)
  }

  /**
    * morpheus:
    * @param element(s): HTMLElement(s)
    * @param options: mixed bag between CSS Style properties & animation options
    *  - {n} CSS properties|values
    *     - value can be strings, integers,
    *     - or callback function that receives element to be animated. method must return value to be tweened
    *     - relative animations start with += or -= followed by integer
    *  - duration: time in ms - defaults to 1000(ms)
    *  - easing: a transition method - defaults to an 'easeOut' algorithm
    *  - complete: a callback method for when all elements have finished
    *  - bezier: array of arrays containing x|y coordinates that define the bezier points. defaults to none
    *     - this may also be a function that receives element to be animated. it must return a value
    */
  function morpheus(elements, options) {
    var els = elements ? (els = isFinite(elements.length) ? elements : [elements]) : [], i
      , complete = options.complete
      , duration = options.duration
      , ease = options.easing
      , points = options.bezier
      , begin = []
      , end = []
      , units = []
      , bez = []
      , originalLeft
      , originalTop

    if (points) {
      // remember the original values for top|left
      originalLeft = options.left;
      originalTop = options.top;
      delete options.right;
      delete options.bottom;
      delete options.left;
      delete options.top;
    }

    for (i = els.length; i--;) {

      // record beginning and end states to calculate positions
      begin[i] = {}
      end[i] = {}
      units[i] = {}

      // are we 'moving'?
      if (points) {

        var left = getStyle(els[i], 'left')
          , top = getStyle(els[i], 'top')
          , xy = [by(fun(originalLeft) ? originalLeft(els[i]) : originalLeft || 0, parseFloat(left)),
                  by(fun(originalTop) ? originalTop(els[i]) : originalTop || 0, parseFloat(top))]

        bez[i] = fun(points) ? points(els[i], xy) : points
        bez[i].push(xy)
        bez[i].unshift([
          parseInt(left, 10),
          parseInt(top, 10)
        ])
      }

      for (var k in options) {
        switch (k) {
        case 'complete':
        case 'duration':
        case 'easing':
        case 'bezier':
          continue
        }
        var v = getStyle(els[i], k), unit
          , tmp = fun(options[k]) ? options[k](els[i]) : options[k]
        if (typeof tmp == 'string' &&
            rgbOhex.test(tmp) &&
            !rgbOhex.test(v)) {
          delete options[k]; // remove key :(
          continue; // cannot animate colors like 'orange' or 'transparent'
                    // only #xxx, #xxxxxx, rgb(n,n,n)
        }

        begin[i][k] = k == 'transform' ? parseTransform(v) :
          typeof tmp == 'string' && rgbOhex.test(tmp) ?
            toHex(v).slice(1) :
            parseFloat(v)
        end[i][k] = k == 'transform' ? parseTransform(tmp, begin[i][k]) :
          typeof tmp == 'string' && tmp.charAt(0) == '#' ?
            toHex(tmp).slice(1) :
            by(tmp, parseFloat(v));
        // record original unit
        (typeof tmp == 'string') && (unit = tmp.match(numUnit)) && (units[i][k] = unit[1])
      }
    }
    // ONE TWEEN TO RULE THEM ALL
    return tween.apply(els, [duration, function (pos, v, xy) {
      // normally not a fan of optimizing for() loops, but we want something
      // fast for animating
      for (i = els.length; i--;) {
        if (points) {
          xy = bezier(bez[i], pos)
          els[i].style.left = xy[0] + 'px'
          els[i].style.top = xy[1] + 'px'
        }
        for (var k in options) {
          v = getTweenVal(pos, units, begin, end, k, i)
          k == 'transform' ?
            els[i].style[transform] = formatTransform(v) :
            k == 'opacity' && !opacity ?
              (els[i].style.filter = 'alpha(opacity=' + (v * 100) + ')') :
              (els[i].style[camelize(k)] = v)
        }
      }
    }, complete, ease])
  }

  // expose useful methods
  morpheus.tween = tween
  morpheus.getStyle = getStyle
  morpheus.bezier = bezier
  morpheus.transform = transform
  morpheus.parseTransform = parseTransform
  morpheus.formatTransform = formatTransform
  morpheus.easings = {}

  return morpheus
})();


/* **********************************************
     Begin TL.Point.js
********************************************** */

/*	TL.Point
  Inspired by Leaflet
  TL.Point represents a point with x and y coordinates.
================================================== */

TL.Point = function (/*Number*/ x, /*Number*/ y, /*Boolean*/ round) {
  this.x = (round ? Math.round(x) : x);
  this.y = (round ? Math.round(y) : y);
};

TL.Point.prototype = {
  add: function (point) {
    return this.clone()._add(point);
  },

  _add: function (point) {
    this.x += point.x;
    this.y += point.y;
    return this;
  },

  subtract: function (point) {
    return this.clone()._subtract(point);
  },

  // destructive subtract (faster)
  _subtract: function (point) {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  },

  divideBy: function (num, round) {
    return new TL.Point(this.x / num, this.y / num, round);
  },

  multiplyBy: function (num) {
    return new TL.Point(this.x * num, this.y * num);
  },

  distanceTo: function (point) {
    var x = point.x - this.x,
      y = point.y - this.y;
    return Math.sqrt(x * x + y * y);
  },

  round: function () {
    return this.clone()._round();
  },

  // destructive round
  _round: function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  },

  clone: function () {
    return new TL.Point(this.x, this.y);
  },

  toString: function () {
    return 'Point(' +
        TL.Util.formatNum(this.x) + ', ' +
        TL.Util.formatNum(this.y) + ')';
  }
};

/* **********************************************
     Begin TL.DomMixins.js
********************************************** */

/*	TL.DomMixins
  DOM methods used regularly
  Assumes there is a _el.container and animator
================================================== */
TL.DomMixins = {

  /*	Adding, Hiding, Showing etc
  ================================================== */
  show: function(animate) {
    if (animate) {
      /*
      this.animator = TL.Animate(this._el.container, {
        left: 		-(this._el.container.offsetWidth * n) + "px",
        duration: 	this.options.duration,
        easing: 	this.options.ease
      });
      */
    } else {
      this._el.container.style.display = "block";
    }
  },

  hide: function(animate) {
    this._el.container.style.display = "none";
  },

  addTo: function(container) {
    container.appendChild(this._el.container);
    this.onAdd();
  },

  removeFrom: function(container) {
    container.removeChild(this._el.container);
    this.onRemove();
  },

  /*	Animate to Position
  ================================================== */
  animatePosition: function(pos, el) {
    var ani = {
      duration: 	this.options.duration,
      easing: 	this.options.ease
    };
    for (var name in pos) {
      if (pos.hasOwnProperty(name)) {
        ani[name] = pos[name] + "px";
      }
    }

    if (this.animator) {
      this.animator.stop();
    }
    this.animator = TL.Animate(el, ani);
  },

  /*	Events
  ================================================== */

  onLoaded: function() {
    this.fire("loaded", this.data);
  },

  onAdd: function() {
    this.fire("added", this.data);
  },

  onRemove: function() {
    this.fire("removed", this.data);
  },

  /*	Set the Position
  ================================================== */
  setPosition: function(pos, el) {
    for (var name in pos) {
      if (pos.hasOwnProperty(name)) {
        if (el) {
          el.style[name] = pos[name] + "px";
        } else {
          this._el.container.style[name] = pos[name] + "px";
        };
      }
    }
  },

  getPosition: function() {
    return TL.Dom.getPosition(this._el.container);
  }

};


/* **********************************************
     Begin TL.Dom.js
********************************************** */

/*	TL.Dom
  Utilities for working with the DOM
================================================== */

TL.Dom = {

  get: function(id) {
    return (typeof id === 'string' ? document.getElementById(id) : id);
  },

  getByClass: function(id) {
    if (id) {
      return document.getElementsByClassName(id);
    }
  },

  create: function(tagName, className, container) {
    var el = document.createElement(tagName);
    el.className = className;
    if (container) {
      container.appendChild(el);
    }
    return el;
  },

  createText: function(content, container) {
    var el = document.createTextNode(content);
    if (container) {
      container.appendChild(el);
    }
    return el;
  },

  getTranslateString: function (point) {
    return TL.Dom.TRANSLATE_OPEN +
        point.x + 'px,' + point.y + 'px' +
        TL.Dom.TRANSLATE_CLOSE;
  },

  setPosition: function (el, point) {
    el._tl_pos = point;
    if (TL.Browser.webkit3d) {
      el.style[TL.Dom.TRANSFORM] =  TL.Dom.getTranslateString(point);

      if (TL.Browser.android) {
        el.style['-webkit-perspective'] = '1000';
        el.style['-webkit-backface-visibility'] = 'hidden';
      }
    } else {
      el.style.left = point.x + 'px';
      el.style.top = point.y + 'px';
    }
  },

  getPosition: function(el){
      var pos = {
        x: 0,
      y: 0
      }
      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          pos.x += el.offsetLeft// - el.scrollLeft;
          pos.y += el.offsetTop// - el.scrollTop;
          el = el.offsetParent;
      }
      return pos;
  },

  testProp: function(props) {
    var style = document.documentElement.style;

    for (var i = 0; i < props.length; i++) {
      if (props[i] in style) {
        return props[i];
      }
    }
    return false;
  }

};

TL.Util.mergeData(TL.Dom, {
  TRANSITION: TL.Dom.testProp(['transition', 'webkitTransition', 'OTransition', 'MozTransition', 'msTransition']),
  TRANSFORM: TL.Dom.testProp(['transformProperty', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']),

  TRANSLATE_OPEN: 'translate' + (TL.Browser.webkit3d ? '3d(' : '('),
  TRANSLATE_CLOSE: TL.Browser.webkit3d ? ',0)' : ')'
});


/* **********************************************
     Begin TL.DomUtil.js
********************************************** */

/*	TL.DomUtil
  Inspired by Leaflet
  TL.DomUtil contains various utility functions for working with DOM
================================================== */


TL.DomUtil = {
  get: function (id) {
    return (typeof id === 'string' ? document.getElementById(id) : id);
  },

  getStyle: function (el, style) {
    var value = el.style[style];
    if (!value && el.currentStyle) {
      value = el.currentStyle[style];
    }
    if (!value || value === 'auto') {
      var css = document.defaultView.getComputedStyle(el, null);
      value = css ? css[style] : null;
    }
    return (value === 'auto' ? null : value);
  },

  getViewportOffset: function (element) {
    var top = 0,
      left = 0,
      el = element,
      docBody = document.body;

    do {
      top += el.offsetTop || 0;
      left += el.offsetLeft || 0;

      if (el.offsetParent === docBody &&
          TL.DomUtil.getStyle(el, 'position') === 'absolute') {
        break;
      }
      el = el.offsetParent;
    } while (el);

    el = element;

    do {
      if (el === docBody) {
        break;
      }

      top -= el.scrollTop || 0;
      left -= el.scrollLeft || 0;

      el = el.parentNode;
    } while (el);

    return new TL.Point(left, top);
  },

  create: function (tagName, className, container) {
    var el = document.createElement(tagName);
    el.className = className;
    if (container) {
      container.appendChild(el);
    }
    return el;
  },

  disableTextSelection: function () {
    if (document.selection && document.selection.empty) {
      document.selection.empty();
    }
    if (!this._onselectstart) {
      this._onselectstart = document.onselectstart;
      document.onselectstart = TL.Util.falseFn;
    }
  },

  enableTextSelection: function () {
    document.onselectstart = this._onselectstart;
    this._onselectstart = null;
  },

  hasClass: function (el, name) {
    return (el.className.length > 0) &&
        new RegExp("(^|\\s)" + name + "(\\s|$)").test(el.className);
  },

  addClass: function (el, name) {
    if (!TL.DomUtil.hasClass(el, name)) {
      el.className += (el.className ? ' ' : '') + name;
    }
  },

  removeClass: function (el, name) {
    el.className = el.className.replace(/(\S+)\s*/g, function (w, match) {
      if (match === name) {
        return '';
      }
      return w;
    }).replace(/^\s+/, '');
  },

  setOpacity: function (el, value) {
    if (TL.Browser.ie) {
      el.style.filter = 'alpha(opacity=' + Math.round(value * 100) + ')';
    } else {
      el.style.opacity = value;
    }
  },


  testProp: function (props) {
    var style = document.documentElement.style;

    for (var i = 0; i < props.length; i++) {
      if (props[i] in style) {
        return props[i];
      }
    }
    return false;
  },

  getTranslateString: function (point) {

    return TL.DomUtil.TRANSLATE_OPEN +
        point.x + 'px,' + point.y + 'px' +
        TL.DomUtil.TRANSLATE_CLOSE;
  },

  getScaleString: function (scale, origin) {
    var preTranslateStr = TL.DomUtil.getTranslateString(origin),
      scaleStr = ' scale(' + scale + ') ',
      postTranslateStr = TL.DomUtil.getTranslateString(origin.multiplyBy(-1));

    return preTranslateStr + scaleStr + postTranslateStr;
  },

  setPosition: function (el, point) {
    el._tl_pos = point;
    if (TL.Browser.webkit3d) {
      el.style[TL.DomUtil.TRANSFORM] =  TL.DomUtil.getTranslateString(point);

      if (TL.Browser.android) {
        el.style['-webkit-perspective'] = '1000';
        el.style['-webkit-backface-visibility'] = 'hidden';
      }
    } else {
      el.style.left = point.x + 'px';
      el.style.top = point.y + 'px';
    }
  },

  getPosition: function (el) {
    return el._tl_pos;
  }
};

/* **********************************************
     Begin TL.DomEvent.js
********************************************** */

/*	TL.DomEvent
  Inspired by Leaflet
  DomEvent contains functions for working with DOM events.
================================================== */
// TODO stamp

TL.DomEvent = {
  /* inpired by John Resig, Dean Edwards and YUI addEvent implementations */
  addListener: function (/*HTMLElement*/ obj, /*String*/ type, /*Function*/ fn, /*Object*/ context) {
    var id = TL.Util.stamp(fn),
      key = '_tl_' + type + id;

    if (obj[key]) {
      return;
    }

    var handler = function (e) {
      return fn.call(context || obj, e || TL.DomEvent._getEvent());
    };

    if (TL.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener) {
      this.addDoubleTapListener(obj, handler, id);
    } else if ('addEventListener' in obj) {
      if (type === 'mousewheel') {
        obj.addEventListener('DOMMouseScroll', handler, false);
        obj.addEventListener(type, handler, false);
      } else if ((type === 'mouseenter') || (type === 'mouseleave')) {
        var originalHandler = handler,
          newType = (type === 'mouseenter' ? 'mouseover' : 'mouseout');
        handler = function (e) {
          if (!TL.DomEvent._checkMouse(obj, e)) {
            return;
          }
          return originalHandler(e);
        };
        obj.addEventListener(newType, handler, false);
      } else {
        obj.addEventListener(type, handler, false);
      }
    } else if ('attachEvent' in obj) {
      obj.attachEvent("on" + type, handler);
    }

    obj[key] = handler;
  },

  removeListener: function (/*HTMLElement*/ obj, /*String*/ type, /*Function*/ fn) {
    var id = TL.Util.stamp(fn),
      key = '_tl_' + type + id,
      handler = obj[key];

    if (!handler) {
      return;
    }

    if (TL.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
      this.removeDoubleTapListener(obj, id);
    } else if ('removeEventListener' in obj) {
      if (type === 'mousewheel') {
        obj.removeEventListener('DOMMouseScroll', handler, false);
        obj.removeEventListener(type, handler, false);
      } else if ((type === 'mouseenter') || (type === 'mouseleave')) {
        obj.removeEventListener((type === 'mouseenter' ? 'mouseover' : 'mouseout'), handler, false);
      } else {
        obj.removeEventListener(type, handler, false);
      }
    } else if ('detachEvent' in obj) {
      obj.detachEvent("on" + type, handler);
    }
    obj[key] = null;
  },

  _checkMouse: function (el, e) {
    var related = e.relatedTarget;

    if (!related) {
      return true;
    }

    try {
      while (related && (related !== el)) {
        related = related.parentNode;
      }
    } catch (err) {
      return false;
    }

    return (related !== el);
  },

  /*jshint noarg:false */ // evil magic for IE
  _getEvent: function () {
    var e = window.event;
    if (!e) {
      var caller = arguments.callee.caller;
      while (caller) {
        e = caller['arguments'][0];
        if (e && window.Event === e.constructor) {
          break;
        }
        caller = caller.caller;
      }
    }
    return e;
  },
  /*jshint noarg:false */

  stopPropagation: function (/*Event*/ e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  },

  // TODO TL.Draggable.START
  disableClickPropagation: function (/*HTMLElement*/ el) {
    TL.DomEvent.addListener(el, TL.Draggable.START, TL.DomEvent.stopPropagation);
    TL.DomEvent.addListener(el, 'click', TL.DomEvent.stopPropagation);
    TL.DomEvent.addListener(el, 'dblclick', TL.DomEvent.stopPropagation);
  },

  preventDefault: function (/*Event*/ e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  },

  stop: function (e) {
    TL.DomEvent.preventDefault(e);
    TL.DomEvent.stopPropagation(e);
  },


  getWheelDelta: function (e) {
    var delta = 0;
    if (e.wheelDelta) {
      delta = e.wheelDelta / 120;
    }
    if (e.detail) {
      delta = -e.detail / 3;
    }
    return delta;
  }
};




/* **********************************************
     Begin TL.StyleSheet.js
********************************************** */

/*	TL.StyleSheet
  Style Sheet Object
================================================== */

TL.StyleSheet = TL.Class.extend({

  includes: [TL.Events],

  _el: {},

  /*	Constructor
  ================================================== */
  initialize: function() {
    // Borrowed from: http://davidwalsh.name/add-rules-stylesheets
    this.style = document.createElement("style");

    // WebKit hack :(
    this.style.appendChild(document.createTextNode(""));

    // Add the <style> element to the page
    document.head.appendChild(this.style);

    this.sheet = this.style.sheet;

  },

  addRule: function(selector, rules, index) {
    var _index = 0;

    if (index) {
      _index = index;
    }

    if("insertRule" in this.sheet) {
      this.sheet.insertRule(selector + "{" + rules + "}", _index);
    }
    else if("addRule" in this.sheet) {
      this.sheet.addRule(selector, rules, _index);
    }
  },


  /*	Events
  ================================================== */
  onLoaded: function(error) {
    this._state.loaded = true;
    this.fire("loaded", this.data);
  }

});

/* **********************************************
     Begin TL.Date.js
********************************************** */

/*	TL.Date
  Date object
  MONTHS are 1-BASED, not 0-BASED (different from Javascript date objects)
================================================== */

//
// Class for human dates
//

TL.Date = TL.Class.extend({

    // @data = ms, JS Date object, or JS dictionary with date properties
  initialize: function (data, format, format_short) {
      if (typeof(data) == 'number') {
      this.data = {
        format:     "yyyy mmmm",
        date_obj:   new Date(data)
      };
      } else if(Date == data.constructor) {
      this.data = {
        format:     "yyyy mmmm",
        date_obj:   data
      };
      } else {
          this.data = JSON.parse(JSON.stringify(data)); // clone don't use by reference.
            this._createDateObj();
      }

    this._setFormat(format, format_short);
    },

  setDateFormat: function(format) {
    this.data.format = format;
  },

  getDisplayDate: function(language, format) {
      if (this.data.display_date) {
          return this.data.display_date;
      }
        if (!language) {
            language = TL.Language.fallback;
        }
        if (language.constructor != TL.Language) {
            trace("First argument to getDisplayDate must be TL.Language");
            language = TL.Language.fallback;
        }

        var format_key = format || this.data.format;
        return language.formatDate(this.data.date_obj, format_key);
  },

  getMillisecond: function() {
    return this.getTime();
  },

  getTime: function() {
    return this.data.date_obj.getTime();
  },

  isBefore: function(other_date) {
        if (!this.data.date_obj.constructor == other_date.data.date_obj.constructor) {
            throw new TL.Error("date_compare_err") // but should be able to compare 'cosmological scale' dates once we get to that...
        }
        if ('isBefore' in this.data.date_obj) {
            return this.data.date_obj['isBefore'](other_date.data.date_obj);
        }
        return this.data.date_obj < other_date.data.date_obj
  },

  isAfter: function(other_date) {
        if (!this.data.date_obj.constructor == other_date.data.date_obj.constructor) {
            throw new TL.Error("date_compare_err") // but should be able to compare 'cosmological scale' dates once we get to that...
        }
        if ('isAfter' in this.data.date_obj) {
            return this.data.date_obj['isAfter'](other_date.data.date_obj);
        }
        return this.data.date_obj > other_date.data.date_obj
  },

    // Return a new TL.Date which has been 'floored' at the given scale.
    // @scale = string value from TL.Date.SCALES
    floor: function(scale) {
        var d = new Date(this.data.date_obj.getTime());
        for (var i = 0; i < TL.Date.SCALES.length; i++) {
             // for JS dates, we iteratively apply flooring functions
            TL.Date.SCALES[i][2](d);
            if (TL.Date.SCALES[i][0] == scale) return new TL.Date(d);
        };

        throw new TL.Error("invalid_scale_err", scale);
    },

  /*	Private Methods
  ================================================== */

    _getDateData: function() {
        var _date = {
            year: 			0,
            month: 			1, // stupid JS dates
            day: 			1,
            hour: 			0,
            minute: 		0,
            second: 		0,
            millisecond: 	0
    };

    // Merge data
    TL.Util.mergeData(_date, this.data);

     // Make strings into numbers
    var DATE_PARTS = TL.Date.DATE_PARTS;

     for (var ix in DATE_PARTS) {
         var x = TL.Util.trim(_date[DATE_PARTS[ix]]);
         if (!x.match(/^-?\d*$/)) {
             throw new TL.Error("invalid_date_err", DATE_PARTS[ix] + " = '" + _date[DATE_PARTS[ix]] + "'");
         }

      var parsed = parseInt(_date[DATE_PARTS[ix]]);
      if (isNaN(parsed)) {
                parsed = (ix == 4 || ix == 5) ? 1 : 0; // month and day have diff baselines
            }
      _date[DATE_PARTS[ix]] = parsed;
    }

    if (_date.month > 0 && _date.month <= 12) { // adjust for JS's weirdness
      _date.month = _date.month - 1;
    }

    return _date;
    },

  _createDateObj: function() {
      var _date = this._getDateData();
        this.data.date_obj = new Date(_date.year, _date.month, _date.day, _date.hour, _date.minute, _date.second, _date.millisecond);
        if (this.data.date_obj.getFullYear() != _date.year) {
            // Javascript has stupid defaults for two-digit years
            this.data.date_obj.setFullYear(_date.year);
        }
  },

    /*  Find Best Format
     * this may not work with 'cosmologic' dates, or with TL.Date if we
     * support constructing them based on JS Date and time
    ================================================== */
    findBestFormat: function(variant) {
        var eval_array = TL.Date.DATE_PARTS,
            format = "";

        for (var i = 0; i < eval_array.length; i++) {
            if ( this.data[eval_array[i]]) {
                if (variant) {
                    if (!(variant in TL.Date.BEST_DATEFORMATS)) {
                        variant = 'short'; // legacy
                    }
                } else {
                    variant = 'base'
                }
                return TL.Date.BEST_DATEFORMATS[variant][eval_array[i]];
            }
        };
        return "";
    },
    _setFormat: function(format, format_short) {
    if (format) {
      this.data.format = format;
    } else if (!this.data.format) {
      this.data.format = this.findBestFormat();
    }

    if (format_short) {
      this.data.format_short = format_short;
    } else if (!this.data.format_short) {
      this.data.format_short = this.findBestFormat(true);
    }
    }
});

// offer something that can figure out the right date class to return
TL.Date.makeDate = function(data) {
    var date = new TL.Date(data);
    if (!isNaN(date.getTime())) {
        return date;
    }
    return new TL.BigDate(data);
}

TL.BigYear = TL.Class.extend({
    initialize: function (year) {
        this.year = parseInt(year);
        if (isNaN(this.year)) {
            throw new TL.Error('invalid_year_err', year);
        }
    },

    isBefore: function(that) {
        return this.year < that.year;
    },

    isAfter: function(that) {
        return this.year > that.year;
    },

    getTime: function() {
        return this.year;
    }
});

(function(cls){
    // human scales
    cls.SCALES = [ // ( name, units_per_tick, flooring function )
        ['millisecond',1, function(d) { }],
        ['second',1000, function(d) { d.setMilliseconds(0);}],
        ['minute',1000 * 60, function(d) { d.setSeconds(0);}],
        ['hour',1000 * 60 * 60, function(d) { d.setMinutes(0);}],
        ['day',1000 * 60 * 60 * 24, function(d) { d.setHours(0);}],
        ['month',1000 * 60 * 60 * 24 * 30, function(d) { d.setDate(1);}],
        ['year',1000 * 60 * 60 * 24 * 365, function(d) { d.setMonth(0);}],
        ['decade',1000 * 60 * 60 * 24 * 365 * 10, function(d) {
            var real_year = d.getFullYear();
            d.setFullYear( real_year - (real_year % 10))
        }],
        ['century',1000 * 60 * 60 * 24 * 365 * 100, function(d) {
            var real_year = d.getFullYear();
            d.setFullYear( real_year - (real_year % 100))
        }],
        ['millennium',1000 * 60 * 60 * 24 * 365 * 1000, function(d) {
            var real_year = d.getFullYear();
            d.setFullYear( real_year - (real_year % 1000))
        }]
    ];

    // Date parts from highest to lowest precision
    cls.DATE_PARTS = ["millisecond", "second", "minute", "hour", "day", "month", "year"];

    var ISO8601_SHORT_PATTERN = /^([\+-]?\d+?)(-\d{2}?)?(-\d{2}?)?$/;
    // regex below from
    // http://www.pelagodesign.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/
    var ISO8601_PATTERN = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

    /* For now, rather than extract parts from regexp, lets trust the browser.
     * Famous last words...
     * What about UTC vs local time?
     * see also http://stackoverflow.com/questions/10005374/ecmascript-5-date-parse-results-for-iso-8601-test-cases
     */
    cls.parseISODate = function(str) {
        var d = new Date(str);
        if (isNaN(d)) {
            throw new TL.Error("invalid_date_err", str);
        }
        return {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate(),
            hour: d.getHours(),
            minute: d.getMinutes(),
            second: d.getSeconds(),
            millisecond: d.getMilliseconds()
        }

    }

    cls.parseDate = function(str) {

        if (str.match(ISO8601_SHORT_PATTERN)) {
            // parse short specifically to avoid timezone offset confusion
            // most browsers assume short is UTC, not local time.
            var parts = str.match(ISO8601_SHORT_PATTERN).slice(1);
            var d = { year: parts[0].replace('+','')} // year can be negative
            if (parts[1]) { d['month'] = parts[1].replace('-',''); }
            if (parts[2]) { d['day'] = parts[2].replace('-',''); }
            return d;
        }

        if (str.match(ISO8601_PATTERN)) {
            return cls.parseISODate(str);
        }

        if (str.match(/^\-?\d+$/)) {
            return { year: str }
        }

        var parsed = {}
        if (str.match(/\d+\/\d+\/\d+/)) { // mm/yy/dddd
            var date = str.match(/\d+\/\d+\/\d+/)[0];
            str = TL.Util.trim(str.replace(date,''));
            var date_parts = date.split('/');
            parsed.month = date_parts[0];
            parsed.day = date_parts[1];
            parsed.year = date_parts[2];
        }

        if (str.match(/\d+\/\d+/)) { // mm/yy
            var date = str.match(/\d+\/\d+/)[0];
            str = TL.Util.trim(str.replace(date,''));
            var date_parts = date.split('/');
            parsed.month = date_parts[0];
            parsed.year = date_parts[1];
        }
        // todo: handle hours, minutes, seconds, millis other date formats, etc...
        if (str.match(':')) {
            var time_parts = str.split(':');
            parsed.hour = time_parts[0];
            parsed.minute = time_parts[1];
            if (time_parts[2]) {
                second_parts = time_parts[2].split('.');
                parsed.second = second_parts[0];
                parsed.millisecond = second_parts[1];
            }
        }
        return parsed;
    }

    cls.BEST_DATEFORMATS = {
        base: {
            millisecond: 'time_short',
            second: 'time',
            minute: 'time_no_seconds_small_date',
            hour: 'time_no_seconds_small_date',
            day: 'full',
            month: 'month',
            year: 'year',
            decade: 'year',
            century: 'year',
            millennium: 'year',
            age: 'fallback',
            epoch: 'fallback',
            era: 'fallback',
            eon: 'fallback',
            eon2: 'fallback'
        },

        short: {
            millisecond: 'time_short',
            second: 'time_short',
            minute: 'time_no_seconds_short',
            hour: 'time_no_minutes_short',
            day: 'full_short',
            month: 'month_short',
            year: 'year',
            decade: 'year',
            century: 'year',
            millennium: 'year',
            age: 'fallback',
            epoch: 'fallback',
            era: 'fallback',
            eon: 'fallback',
            eon2: 'fallback'
        }
    }


})(TL.Date)


//
// Class for cosmological dates
//
TL.BigDate = TL.Date.extend({

    // @data = TL.BigYear object or JS dictionary with date properties
    initialize: function(data, format, format_short) {
        if (TL.BigYear == data.constructor) {
            this.data = {
                date_obj:   data
            }
        } else {
            this.data = JSON.parse(JSON.stringify(data));
            this._createDateObj();
        }

        this._setFormat(format, format_short);
    },

    // Create date_obj
    _createDateObj: function() {
      var _date = this._getDateData();
        this.data.date_obj = new TL.BigYear(_date.year);
    },

    // Return a new TL.BigDate which has been 'floored' at the given scale.
    // @scale = string value from TL.BigDate.SCALES
    floor: function(scale) {
        for (var i = 0; i < TL.BigDate.SCALES.length; i++) {
            if (TL.BigDate.SCALES[i][0] == scale) {
                var floored = TL.BigDate.SCALES[i][2](this.data.date_obj);
                return new TL.BigDate(floored);
            }
        };

        throw new TL.Error("invalid_scale_err", scale);
    }
});

(function(cls){
    // cosmo units are years, not millis
    var AGE = 1000000;
    var EPOCH = AGE * 10;
    var ERA = EPOCH * 10;
    var EON = ERA * 10;

    var Floorer = function(unit) {
        return function(a_big_year) {
            var year = a_big_year.getTime();
            return new TL.BigYear(Math.floor(year/unit) * unit);
        }
    }

    // cosmological scales
    cls.SCALES = [ // ( name, units_per_tick, flooring function )
        ['year',1, new Floorer(1)],
        ['decade',10, new Floorer(10)],
        ['century',100, new Floorer(100)],
        ['millennium',1000, new Floorer(1000)],
        ['age',AGE, new Floorer(AGE)],          // 1M years
        ['epoch',EPOCH, new Floorer(EPOCH)],    // 10M years
        ['era',ERA, new Floorer(ERA)],          // 100M years
        ['eon',EON, new Floorer(EON)]           // 1B years
    ];

})(TL.BigDate)


/* **********************************************
     Begin TL.DateUtil.js
********************************************** */

/*	TL.DateUtil
  Utilities for parsing time
================================================== */


TL.DateUtil = {
  get: function (id) {
    return (typeof id === 'string' ? document.getElementById(id) : id);
  },

  sortByDate: function(array,prop_name) { // only for use with slide data objects
    var prop_name = prop_name || 'start_date';
    array.sort(function(a,b){
      if (a[prop_name].isBefore(b[prop_name])) return -1;
      if (a[prop_name].isAfter(b[prop_name])) return 1;
      return 0;
    });
  },

  parseTime: function(time_str) {
    var parsed = {
      hour: null, minute: null, second: null, millisecond: null // conform to keys in TL.Date
    }
    var period = null;
    var match = time_str.match(/(\s*[AaPp]\.?[Mm]\.?\s*)$/);
    if (match) {
      period = TL.Util.trim(match[0]);
      time_str = TL.Util.trim(time_str.substring(0,time_str.lastIndexOf(period)));
    }

    var parts = [];
    var no_separators = time_str.match(/^\s*(\d{1,2})(\d{2})\s*$/);
    if (no_separators) {
      parts = no_separators.slice(1);
    } else {
      parts = time_str.split(':');
      if (parts.length == 1) {
        parts = time_str.split('.');
      }
    }

    if (parts.length > 4) {
        throw new TL.Error("invalid_separator_error");
    }

    parsed.hour = parseInt(parts[0]);

    if (period && period.toLowerCase()[0] == 'p' && parsed.hour != 12) {
      parsed.hour += 12;
    } else if (period && period.toLowerCase()[0] == 'a' && parsed.hour == 12) {
      parsed.hour = 0;
    }


    if (isNaN(parsed.hour) || parsed.hour < 0 || parsed.hour > 23) {
      throw new TL.Error("invalid_hour_err", parsed.hour);
    }

    if (parts.length > 1) {
      parsed.minute = parseInt(parts[1]);
      if (isNaN(parsed.minute)) {
          throw new TL.Error("invalid_minute_err", parsed.minute);
      }
    }

    if (parts.length > 2) {
      var sec_parts = parts[2].split(/[\.,]/);
      parts = sec_parts.concat(parts.slice(3)) // deal with various methods of specifying fractional seconds
      if (parts.length > 2) {
          throw new TL.Error("invalid_second_fractional_err");
      }
      parsed.second = parseInt(parts[0]);
      if (isNaN(parsed.second)) {
          throw new TL.Error("invalid_second_err");
      }
      if (parts.length == 2) {
        var frac_secs = parseInt(parts[1]);
        if (isNaN(frac_secs)) {
            throw new TL.Error("invalid_fractional_err");
        }
        parsed.millisecond = 100 * frac_secs;
      }
    }

    return parsed;
  },

  SCALE_DATE_CLASSES: {
    human: TL.Date,
    cosmological: TL.BigDate
  }


};


/* **********************************************
     Begin TL.Draggable.js
********************************************** */

/*	TL.Draggable
  TL.Draggable allows you to add dragging capabilities to any element. Supports mobile devices too.
  TODO Enable constraints
================================================== */

TL.Draggable = TL.Class.extend({

  includes: TL.Events,

  _el: {},

  mousedrag: {
    down:		"mousedown",
    up:			"mouseup",
    leave:		"mouseleave",
    move:		"mousemove"
  },

  touchdrag: {
    down:		"touchstart",
    up:			"touchend",
    leave:		"mouseleave",
    move:		"touchmove"
  },

  initialize: function (drag_elem, options, move_elem) {

    // DOM ELements
    this._el = {
      drag: drag_elem,
      move: drag_elem
    };

    if (move_elem) {
      this._el.move = move_elem;
    }


    //Options
    this.options = {
      enable:	{
        x: true,
        y: true
      },
      constraint: {
        top: false,
        bottom: false,
        left: false,
        right: false
      },
      momentum_multiplier: 	2000,
      duration: 				1000,
      ease: 					TL.Ease.easeInOutQuint
    };


    // Animation Object
    this.animator = null;

    // Drag Event Type
    this.dragevent = this.mousedrag;

    if (TL.Browser.touch) {
      this.dragevent = this.touchdrag;
    }

    // Draggable Data
    this.data = {
      sliding:		false,
      direction: 		"none",
      pagex: {
        start:		0,
        end:		0
      },
      pagey: {
        start:		0,
        end:		0
      },
      pos: {
        start: {
          x: 0,
          y:0
        },
        end: {
          x: 0,
          y:0
        }
      },
      new_pos: {
        x: 0,
        y: 0
      },
      new_pos_parent: {
        x: 0,
        y: 0
      },
      time: {
        start:		0,
        end:		0
      },
      touch:			false
    };

    // Merge Data and Options
    TL.Util.mergeData(this.options, options);


  },

  enable: function(e) {

    this.data.pos.start = 0;
    this._el.move.style.left = this.data.pos.start.x + "px";
    this._el.move.style.top = this.data.pos.start.y + "px";
    this._el.move.style.position = "absolute";
  },

  disable: function() {
    TL.DomEvent.removeListener(this._el.drag, this.dragevent.down, this._onDragStart, this);
    TL.DomEvent.removeListener(this._el.drag, this.dragevent.up, this._onDragEnd, this);
  },

  stopMomentum: function() {
    if (this.animator) {
      this.animator.stop();
    }

  },

  updateConstraint: function(c) {
    this.options.constraint = c;

  },

  /*	Private Methods
  ================================================== */
  _onDragStart: function(e) {
    if (TL.Browser.touch) {
      if (e.originalEvent) {
        this.data.pagex.start = e.originalEvent.touches[0].screenX;
        this.data.pagey.start = e.originalEvent.touches[0].screenY;
      } else {
        this.data.pagex.start = e.targetTouches[0].screenX;
        this.data.pagey.start = e.targetTouches[0].screenY;
      }
    } else {
      this.data.pagex.start = e.pageX;
      this.data.pagey.start = e.pageY;
    }

    // Center element to finger or mouse
    if (this.options.enable.x) {
      this._el.move.style.left = this.data.pagex.start - (this._el.move.offsetWidth / 2) + "px";
    }

    if (this.options.enable.y) {
      this._el.move.style.top = this.data.pagey.start - (this._el.move.offsetHeight / 2) + "px";
    }

    this.data.pos.start = TL.Dom.getPosition(this._el.drag);
    this.data.time.start = new Date().getTime();

    this.fire("dragstart", this.data);
    TL.DomEvent.addListener(this._el.drag, this.dragevent.move, this._onDragMove, this);
    TL.DomEvent.addListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this);
  },

  _onDragEnd: function(e) {
    this.data.sliding = false;
    TL.DomEvent.removeListener(this._el.drag, this.dragevent.move, this._onDragMove, this);
    TL.DomEvent.removeListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this);
    this.fire("dragend", this.data);

    //  momentum
    this._momentum();
  },

  _onDragMove: function(e) {
    e.preventDefault();
    this.data.sliding = true;

    if (TL.Browser.touch) {
      if (e.originalEvent) {
        this.data.pagex.end = e.originalEvent.touches[0].screenX;
        this.data.pagey.end = e.originalEvent.touches[0].screenY;
      } else {
        this.data.pagex.end = e.targetTouches[0].screenX;
        this.data.pagey.end = e.targetTouches[0].screenY;
      }

    } else {
      this.data.pagex.end = e.pageX;
      this.data.pagey.end = e.pageY;
    }

    this.data.pos.end = TL.Dom.getPosition(this._el.drag);
    this.data.new_pos.x = -(this.data.pagex.start - this.data.pagex.end - this.data.pos.start.x);
    this.data.new_pos.y = -(this.data.pagey.start - this.data.pagey.end - this.data.pos.start.y );

    if (this.options.enable.x) {
      this._el.move.style.left = this.data.new_pos.x + "px";
    }

    if (this.options.enable.y) {
      this._el.move.style.top = this.data.new_pos.y + "px";
    }

    this.fire("dragmove", this.data);
  },

  _momentum: function() {
    var pos_adjust = {
        x: 0,
        y: 0,
        time: 0
      },
      pos_change = {
        x: 0,
        y: 0,
        time: 0
      },
      swipe = false,
      swipe_direction = "";


    if (TL.Browser.touch) {
      // Treat mobile multiplier differently
      //this.options.momentum_multiplier = this.options.momentum_multiplier * 2;
    }

    pos_adjust.time = (new Date().getTime() - this.data.time.start) * 10;
    pos_change.time = (new Date().getTime() - this.data.time.start) * 10;

    pos_change.x = this.options.momentum_multiplier * (Math.abs(this.data.pagex.end) - Math.abs(this.data.pagex.start));
    pos_change.y = this.options.momentum_multiplier * (Math.abs(this.data.pagey.end) - Math.abs(this.data.pagey.start));

    pos_adjust.x = Math.round(pos_change.x / pos_change.time);
    pos_adjust.y = Math.round(pos_change.y / pos_change.time);

    this.data.new_pos.x = Math.min(this.data.pos.end.x + pos_adjust.x);
    this.data.new_pos.y = Math.min(this.data.pos.end.y + pos_adjust.y);


    if (!this.options.enable.x) {
      this.data.new_pos.x = this.data.pos.start.x;
    } else if (this.data.new_pos.x < 0) {
      this.data.new_pos.x = 0;
    }

    if (!this.options.enable.y) {
      this.data.new_pos.y = this.data.pos.start.y;
    } else if (this.data.new_pos.y < 0) {
      this.data.new_pos.y = 0;
    }

    // Detect Swipe
    if (pos_change.time < 3000) {
      swipe = true;
    }

    // Detect Direction
    if (Math.abs(pos_change.x) > 10000) {
      this.data.direction = "left";
      if (pos_change.x > 0) {
        this.data.direction = "right";
      }
    }
    // Detect Swipe
    if (Math.abs(pos_change.y) > 10000) {
      this.data.direction = "up";
      if (pos_change.y > 0) {
        this.data.direction = "down";
      }
    }
    this._animateMomentum();
    if (swipe) {
      this.fire("swipe_" + this.data.direction, this.data);
    }

  },


  _animateMomentum: function() {
    var pos = {
        x: this.data.new_pos.x,
        y: this.data.new_pos.y
      },
      animate = {
        duration: 	this.options.duration,
        easing: 	TL.Ease.easeOutStrong
      };

    if (this.options.enable.y) {
      if (this.options.constraint.top || this.options.constraint.bottom) {
        if (pos.y > this.options.constraint.bottom) {
          pos.y = this.options.constraint.bottom;
        } else if (pos.y < this.options.constraint.top) {
          pos.y = this.options.constraint.top;
        }
      }
      animate.top = Math.floor(pos.y) + "px";
    }

    if (this.options.enable.x) {
      if (this.options.constraint.left || this.options.constraint.right) {
        if (pos.x > this.options.constraint.left) {
          pos.x = this.options.constraint.left;
        } else if (pos.x < this.options.constraint.right) {
          pos.x = this.options.constraint.right;
        }
      }
      animate.left = Math.floor(pos.x) + "px";
    }

    this.animator = TL.Animate(this._el.move, animate);

    this.fire("momentum", this.data);
  }
});


/* **********************************************
     Begin TL.Swipable.js
********************************************** */

/*	TL.Swipable
  TL.Draggable allows you to add dragging capabilities to any element. Supports mobile devices too.
  TODO Enable constraints
================================================== */

TL.Swipable = TL.Class.extend({

  includes: TL.Events,

  _el: {},

  mousedrag: {
    down:		"mousedown",
    up:			"mouseup",
    leave:		"mouseleave",
    move:		"mousemove"
  },

  touchdrag: {
    down:		"touchstart",
    up:			"touchend",
    leave:		"mouseleave",
    move:		"touchmove"
  },

  initialize: function (drag_elem, move_elem, options) {

    // DOM ELements
    this._el = {
      drag: drag_elem,
      move: drag_elem
    };

    if (move_elem) {
      this._el.move = move_elem;
    }


    //Options
    this.options = {
      snap: false,
      enable:	{
        x: true,
        y: true
      },
      constraint: {
        top: false,
        bottom: false,
        left: 0,
        right: false
      },
      momentum_multiplier: 	2000,
      duration: 				1000,
      ease: 					TL.Ease.easeInOutQuint
    };


    // Animation Object
    this.animator = null;

    // Drag Event Type
    this.dragevent = this.mousedrag;

    if (TL.Browser.touch) {
      this.dragevent = this.touchdrag;
    }

    // Draggable Data
    this.data = {
      sliding:		false,
      direction: 		"none",
      pagex: {
        start:		0,
        end:		0
      },
      pagey: {
        start:		0,
        end:		0
      },
      pos: {
        start: {
          x: 0,
          y:0
        },
        end: {
          x: 0,
          y:0
        }
      },
      new_pos: {
        x: 0,
        y: 0
      },
      new_pos_parent: {
        x: 0,
        y: 0
      },
      time: {
        start:		0,
        end:		0
      },
      touch:			false
    };

    // Merge Data and Options
    TL.Util.mergeData(this.options, options);


  },

  enable: function(e) {
    TL.DomEvent.addListener(this._el.drag, this.dragevent.down, this._onDragStart, this);
    TL.DomEvent.addListener(this._el.drag, this.dragevent.up, this._onDragEnd, this);

    this.data.pos.start = 0; //TL.Dom.getPosition(this._el.move);
    this._el.move.style.left = this.data.pos.start.x + "px";
    this._el.move.style.top = this.data.pos.start.y + "px";
    this._el.move.style.position = "absolute";
    //this._el.move.style.zIndex = "11";
    //this._el.move.style.cursor = "move";
  },

  disable: function() {
    TL.DomEvent.removeListener(this._el.drag, this.dragevent.down, this._onDragStart, this);
    TL.DomEvent.removeListener(this._el.drag, this.dragevent.up, this._onDragEnd, this);
  },

  stopMomentum: function() {
    if (this.animator) {
      this.animator.stop();
    }

  },

  updateConstraint: function(c) {
    this.options.constraint = c;

    // Temporary until issues are fixed

  },

  /*	Private Methods
  ================================================== */
  _onDragStart: function(e) {

    if (this.animator) {
      this.animator.stop();
    }

    if (TL.Browser.touch) {
      if (e.originalEvent) {
        this.data.pagex.start = e.originalEvent.touches[0].screenX;
        this.data.pagey.start = e.originalEvent.touches[0].screenY;
      } else {
        this.data.pagex.start = e.targetTouches[0].screenX;
        this.data.pagey.start = e.targetTouches[0].screenY;
      }
    } else {
      this.data.pagex.start = e.pageX;
      this.data.pagey.start = e.pageY;
    }

    // Center element to finger or mouse
    if (this.options.enable.x) {
      //this._el.move.style.left = this.data.pagex.start - (this._el.move.offsetWidth / 2) + "px";
    }

    if (this.options.enable.y) {
      //this._el.move.style.top = this.data.pagey.start - (this._el.move.offsetHeight / 2) + "px";
    }

    this.data.pos.start = {x:this._el.move.offsetLeft, y:this._el.move.offsetTop};


    this.data.time.start 			= new Date().getTime();

    this.fire("dragstart", this.data);
    TL.DomEvent.addListener(this._el.drag, this.dragevent.move, this._onDragMove, this);
    TL.DomEvent.addListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this);
  },

  _onDragEnd: function(e) {
    this.data.sliding = false;
    TL.DomEvent.removeListener(this._el.drag, this.dragevent.move, this._onDragMove, this);
    TL.DomEvent.removeListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this);
    this.fire("dragend", this.data);

    //  momentum
    this._momentum();
  },

  _onDragMove: function(e) {
    var change = {
      x:0,
      y:0
    }
    //e.preventDefault();
    this.data.sliding = true;

    if (TL.Browser.touch) {
      if (e.originalEvent) {
        this.data.pagex.end = e.originalEvent.touches[0].screenX;
        this.data.pagey.end = e.originalEvent.touches[0].screenY;
      } else {
        this.data.pagex.end = e.targetTouches[0].screenX;
        this.data.pagey.end = e.targetTouches[0].screenY;
      }

    } else {
      this.data.pagex.end = e.pageX;
      this.data.pagey.end = e.pageY;
    }

    change.x = this.data.pagex.start - this.data.pagex.end;
    change.y = this.data.pagey.start - this.data.pagey.end;

    this.data.pos.end = {x:this._el.drag.offsetLeft, y:this._el.drag.offsetTop};

    this.data.new_pos.x = -(change.x - this.data.pos.start.x);
    this.data.new_pos.y = -(change.y - this.data.pos.start.y );

    if (this.options.enable.x && ( Math.abs(change.x) > Math.abs(change.y) ) ) {
      e.preventDefault();
      this._el.move.style.left = this.data.new_pos.x + "px";
    }

    if (this.options.enable.y && ( Math.abs(change.y) > Math.abs(change.y) ) ) {
      e.preventDefault();
      this._el.move.style.top = this.data.new_pos.y + "px";
    }

    this.fire("dragmove", this.data);
  },

  _momentum: function() {
    var pos_adjust = {
        x: 0,
        y: 0,
        time: 0
      },
      pos_change = {
        x: 0,
        y: 0,
        time: 0
      },
      swipe_detect = {
        x: false,
        y: false
      },
      swipe = false,
      swipe_direction = "";


    this.data.direction = null;

    pos_adjust.time = (new Date().getTime() - this.data.time.start) * 10;
    pos_change.time = (new Date().getTime() - this.data.time.start) * 10;

    pos_change.x = this.options.momentum_multiplier * (Math.abs(this.data.pagex.end) - Math.abs(this.data.pagex.start));
    pos_change.y = this.options.momentum_multiplier * (Math.abs(this.data.pagey.end) - Math.abs(this.data.pagey.start));

    pos_adjust.x = Math.round(pos_change.x / pos_change.time);
    pos_adjust.y = Math.round(pos_change.y / pos_change.time);

    this.data.new_pos.x = Math.min(this.data.new_pos.x + pos_adjust.x);
    this.data.new_pos.y = Math.min(this.data.new_pos.y + pos_adjust.y);

    if (!this.options.enable.x) {
      this.data.new_pos.x = this.data.pos.start.x;
    } else if (this.options.constraint.left && this.data.new_pos.x > this.options.constraint.left) {
      this.data.new_pos.x = this.options.constraint.left;
    }

    if (!this.options.enable.y) {
      this.data.new_pos.y = this.data.pos.start.y;
    } else if (this.data.new_pos.y < 0) {
      this.data.new_pos.y = 0;
    }

    // Detect Swipe
    if (pos_change.time < 2000) {
      swipe = true;
    }


    if (this.options.enable.x && this.options.enable.y) {
      if (Math.abs(pos_change.x) > Math.abs(pos_change.y)) {
        swipe_detect.x = true;
      } else {
        swipe_detect.y = true;
      }
    } else if (this.options.enable.x) {
      if (Math.abs(pos_change.x) > Math.abs(pos_change.y)) {
        swipe_detect.x = true;
      }
    } else {
      if (Math.abs(pos_change.y) > Math.abs(pos_change.x)) {
        swipe_detect.y = true;
      }
    }

    // Detect Direction and long swipe
    if (swipe_detect.x) {

      // Long Swipe
      if (Math.abs(pos_change.x) > (this._el.drag.offsetWidth/2)) {
        swipe = true;
      }

      if (Math.abs(pos_change.x) > 10000) {
        this.data.direction = "left";
        if (pos_change.x > 0) {
          this.data.direction = "right";
        }
      }
    }

    if (swipe_detect.y) {

      // Long Swipe
      if (Math.abs(pos_change.y) > (this._el.drag.offsetHeight/2)) {
        swipe = true;
      }

      if (Math.abs(pos_change.y) > 10000) {
        this.data.direction = "up";
        if (pos_change.y > 0) {
          this.data.direction = "down";
        }
      }
    }

    if (pos_change.time < 1000 ) {

    } else {
      this._animateMomentum();
    }

    if (swipe && this.data.direction) {
      this.fire("swipe_" + this.data.direction, this.data);
    } else if (this.data.direction) {
      this.fire("swipe_nodirection", this.data);
    } else if (this.options.snap) {
      this.animator.stop();

      this.animator = TL.Animate(this._el.move, {
        top: 		this.data.pos.start.y,
        left: 		this.data.pos.start.x,
        duration: 	this.options.duration,
        easing: 	TL.Ease.easeOutStrong
      });
    }

  },


  _animateMomentum: function() {
    var pos = {
        x: this.data.new_pos.x,
        y: this.data.new_pos.y
      },
      animate = {
        duration: 	this.options.duration,
        easing: 	TL.Ease.easeOutStrong
      };

    if (this.options.enable.y) {
      if (this.options.constraint.top || this.options.constraint.bottom) {
        if (pos.y > this.options.constraint.bottom) {
          pos.y = this.options.constraint.bottom;
        } else if (pos.y < this.options.constraint.top) {
          pos.y = this.options.constraint.top;
        }
      }
      animate.top = Math.floor(pos.y) + "px";
    }

    if (this.options.enable.x) {
      if (this.options.constraint.left && pos.x >= this.options.constraint.left) {
        pos.x = this.options.constraint.left;
      }
      if (this.options.constraint.right && pos.x < this.options.constraint.right) {
        pos.x = this.options.constraint.right;
      }

      animate.left = Math.floor(pos.x) + "px";
    }

    this.animator = TL.Animate(this._el.move, animate);

    this.fire("momentum", this.data);
  }
});


/* **********************************************
     Begin TL.MenuBar.js
********************************************** */

/*	TL.MenuBar
  Draggable component to control size
================================================== */

TL.MenuBar = TL.Class.extend({

  includes: [TL.Events, TL.DomMixins],

  _el: {},

  /*	Constructor
  ================================================== */
  initialize: function(elem, parent_elem, options) {
    // DOM ELEMENTS
    this._el = {
      parent: {},
      container: {},
      button_backtostart: {},
      button_zoomin: {},
      button_zoomout: {},
      arrow: {},
      line: {},
      coverbar: {},
      grip: {}
    };

    this.collapsed = false;

    if (typeof elem === 'object') {
      this._el.container = elem;
    } else {
      this._el.container = TL.Dom.get(elem);
    }

    if (parent_elem) {
      this._el.parent = parent_elem;
    }

    //Options
    this.options = {
      width: 					600,
      height: 				600,
      duration: 				1000,
      ease: 					TL.Ease.easeInOutQuint,
      menubar_default_y: 		0
    };

    // Animation
    this.animator = {};

    // Merge Data and Options
    TL.Util.mergeData(this.options, options);

    this._initLayout();
    this._initEvents();
  },

  /*	Public
  ================================================== */
  show: function(d) {

    var duration = this.options.duration;
    if (d) {
      duration = d;
    }
    /*
    this.animator = TL.Animate(this._el.container, {
      top: 		this.options.menubar_default_y + "px",
      duration: 	duration,
      easing: 	TL.Ease.easeOutStrong
    });
    */
  },

  hide: function(top) {
    /*
    this.animator = TL.Animate(this._el.container, {
      top: 		top,
      duration: 	this.options.duration,
      easing: 	TL.Ease.easeOutStrong
    });
    */
  },

  toogleZoomIn: function(show) {
    if (show) {
      TL.DomUtil.removeClass(this._el.button_zoomin,'tl-menubar-button-inactive');
    } else {
      TL.DomUtil.addClass(this._el.button_zoomin,'tl-menubar-button-inactive');
    }
  },

  toogleZoomOut: function(show) {
    if (show) {
      TL.DomUtil.removeClass(this._el.button_zoomout,'tl-menubar-button-inactive');
    } else {
      TL.DomUtil.addClass(this._el.button_zoomout,'tl-menubar-button-inactive');
    }
  },

  setSticky: function(y) {
    this.options.menubar_default_y = y;
  },

  /*	Color
  ================================================== */
  setColor: function(inverted) {
    if (inverted) {
      this._el.container.className = 'tl-menubar tl-menubar-inverted';
    } else {
      this._el.container.className = 'tl-menubar';
    }
  },

  /*	Update Display
  ================================================== */
  updateDisplay: function(w, h, a, l) {
    this._updateDisplay(w, h, a, l);
  },


  /*	Events
  ================================================== */
  _onButtonZoomIn: function(e) {
    this.fire("zoom_in", e);
  },

  _onButtonZoomOut: function(e) {
    this.fire("zoom_out", e);
  },

  _onButtonBackToStart: function(e) {
    this.fire("back_to_start", e);
  },


  /*	Private Methods
  ================================================== */
  _initLayout: function () {

    // Create Layout
    this._el.button_zoomin 							= TL.Dom.create('span', 'tl-menubar-button', this._el.container);
    this._el.button_zoomout 						= TL.Dom.create('span', 'tl-menubar-button', this._el.container);
    this._el.button_backtostart 					= TL.Dom.create('span', 'tl-menubar-button', this._el.container);

    if (TL.Browser.mobile) {
      this._el.container.setAttribute("ontouchstart"," ");
    }

    this._el.button_backtostart.innerHTML		= "<span class='tl-icon-goback'></span>";
    this._el.button_zoomin.innerHTML			= "<span class='tl-icon-zoom-in'></span>";
    this._el.button_zoomout.innerHTML			= "<span class='tl-icon-zoom-out'></span>";


  },

  _initEvents: function () {
    TL.DomEvent.addListener(this._el.button_backtostart, 'click', this._onButtonBackToStart, this);
    TL.DomEvent.addListener(this._el.button_zoomin, 'click', this._onButtonZoomIn, this);
    TL.DomEvent.addListener(this._el.button_zoomout, 'click', this._onButtonZoomOut, this);
  },

  // Update Display
  _updateDisplay: function(width, height, animate) {

    if (width) {
      this.options.width = width;
    }
    if (height) {
      this.options.height = height;
    }
  }

});


/* **********************************************
     Begin TL.Message.js
********************************************** */

/*	TL.Message

================================================== */

TL.Message = TL.Class.extend({

  includes: [TL.Events, TL.DomMixins, TL.I18NMixins],

  _el: {},

  /*	Constructor
  ================================================== */
  initialize: function(data, options, add_to_container) {
    // DOM ELEMENTS
    this._el = {
      parent: {},
      container: {},
      message_container: {},
      loading_icon: {},
      message: {}
    };

    //Options
    this.options = {
      width: 					600,
      height: 				600,
      message_class: 			"tl-message",
      message_icon_class: 	"tl-loading-icon"
    };

    this._add_to_container = add_to_container || {}; // save ref

    // Merge Data and Options
    TL.Util.mergeData(this.data, data);
    TL.Util.mergeData(this.options, options);

    this._el.container = TL.Dom.create("div", this.options.message_class);

    if (add_to_container) {
      add_to_container.appendChild(this._el.container);
      this._el.parent = add_to_container;
    }

    // Animation
    this.animator = {};

    this._initLayout();
    this._initEvents();
  },

  /*	Public
  ================================================== */
  updateMessage: function(t) {
    this._updateMessage(t);
  },


  /*	Update Display
  ================================================== */
  updateDisplay: function(w, h) {
    this._updateDisplay(w, h);
  },

  _updateMessage: function(t) {
    if (!t) {
      this._el.message.innerHTML = this._('loading');
    } else {
      this._el.message.innerHTML = t;
    }

    // Re-add to DOM?
    if(!this._el.parent.atrributes && this._add_to_container.attributes) {
        this._add_to_container.appendChild(this._el.container);
        this._el.parent = this._add_to_container;
    }
  },


  /*	Events
  ================================================== */


  _onMouseClick: function() {
    this.fire("clicked", this.options);
  },

  _onRemove: function() {
      this._el.parent = {};
  },


  /*	Private Methods
  ================================================== */
  _initLayout: function () {

    // Create Layout
    this._el.message_container = TL.Dom.create("div", "tl-message-container", this._el.container);
    this._el.loading_icon = TL.Dom.create("div", this.options.message_icon_class, this._el.message_container);
    this._el.message = TL.Dom.create("div", "tl-message-content", this._el.message_container);

    this._updateMessage();

  },

  _initEvents: function () {
    TL.DomEvent.addListener(this._el.container, 'click', this._onMouseClick, this);
    TL.DomEvent.addListener(this, 'removed', this._onRemove, this);
  },

  // Update Display
  _updateDisplay: function(width, height, animate) {

  }

});

/* **********************************************
     Begin TL.MediaType.js
********************************************** */

/*	TL.MediaType
  Determines the type of media the url string is.
  returns an object with .type and .id
  You can add new media types by adding a regex
  to match and the media class name to use to
  render the media

  The image_only parameter indicates that the
  call only wants an image-based media type
  that can be resolved to an image URL.

  TODO
  Allow array so a slideshow can be a mediatype
================================================== */
TL.MediaType = function(m, image_only) {
  var media = {},
    media_types = 	[
      {
        type: 		"youtube",
        name: 		"YouTube",
        match_str: 	"^(https?:)?\/*(www.)?youtube|youtu\.be",
        cls: 		TL.Media.YouTube
      },
      {
        type: 		"vimeo",
        name: 		"Vimeo",
        match_str: 	"^(https?:)?\/*(player.)?vimeo\.com",
        cls: 		TL.Media.Vimeo
      },
      {
        type: 		"dailymotion",
        name: 		"DailyMotion",
        match_str: 	"^(https?:)?\/*(www.)?dailymotion\.com",
        cls: 		TL.Media.DailyMotion
      },
      {
        type: 		"vine",
        name: 		"Vine",
        match_str: 	"^(https?:)?\/*(www.)?vine\.co",
        cls: 		TL.Media.Vine
      },
      {
        type: 		"soundcloud",
        name: 		"SoundCloud",
        match_str: 	"^(https?:)?\/*(player.)?soundcloud\.com",
        cls: 		TL.Media.SoundCloud
      },
      {
        type: 		"twitter",
        name: 		"Twitter",
        match_str: 	"^(https?:)?\/*(www.)?twitter\.com",
        cls: 		TL.Media.Twitter
      },
      {
        type: 		"twitterembed",
        name: 		"TwitterEmbed",
        match_str: 	"<blockquote class=\"twitter-tweet\"",
        cls: 		TL.Media.TwitterEmbed
      },
      {
        type: 		"googlemaps",
        name: 		"Google Map",
        match_str: 	/google.+?\/maps\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)|google.+?\/maps\/search\/([\w\W]+)\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)|google.+?\/maps\/place\/([\w\W]+)\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)|google.+?\/maps\/dir\/([\w\W]+)\/([\w\W]+)\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)/,
        cls: 		TL.Media.GoogleMap
      },
      {
        type: 		"googleplus",
        name: 		"Google+",
        match_str: 	"^(https?:)?\/*plus.google",
        cls: 		TL.Media.GooglePlus
      },
      {
        type: 		"flickr",
        name: 		"Flickr",
        match_str: 	"^(https?:)?\/*(www.)?flickr.com\/photos",
        cls: 		TL.Media.Flickr
      },
      {
        type: 		"flickr",
        name: 		"Flickr",
        match_str: 	"^(https?:\/\/)?flic.kr\/.*",
        cls: 		TL.Media.Flickr
      },
      {
        type: 		"instagram",
        name: 		"Instagram",
        match_str: 	/^(https?:)?\/*(www.)?(instagr.am|^(https?:)?\/*(www.)?instagram.com)\/p\//,
        cls: 		TL.Media.Instagram
      },
      {
        type: 		"profile",
        name: 		"Profile",
        match_str: 	/^(https?:)?\/*(www.)?instagr.am\/[a-zA-Z0-9]{2,}|^(https?:)?\/*(www.)?instagram.com\/[a-zA-Z0-9]{2,}/,
        cls: 		TL.Media.Profile
      },
      {
          type:       "documentcloud",
          name:       "Document Cloud",
          match_str:  /documentcloud.org\//,
          cls:        TL.Media.DocumentCloud
      },
      {
        type: 		"image",
        name: 		"Image",
        match_str: 	/(jpg|jpeg|png|gif|svg)(\?.*)?$/i,
        cls: 		TL.Media.Image
      },
      {
        type: 		"imgur",
        name: 		"Imgur",
        match_str: 	/^.*imgur.com\/.+$/i,
        cls: 		TL.Media.Imgur
      },
      {
        type: 		"googledocs",
        name: 		"Google Doc",
        match_str: 	"^(https?:)?\/*[^.]*.google.com\/[^\/]*\/d\/[^\/]*\/[^\/]*\?usp=sharing|^(https?:)?\/*drive.google.com\/open\?id=[^\&]*\&authuser=0|^(https?:)?\/*drive.google.com\/open\?id=[^\&]*|^(https?:)?\/*[^.]*.googledrive.com\/host\/[^\/]*\/",
        cls: 		TL.Media.GoogleDoc
      },
      {
        type: 		"pdf",
        name: 		"PDF",
        match_str: 	/^.*\.pdf(\?.*)?(\#.*)?/,
        cls: 		TL.Media.PDF
      },
      {
        type: 		"wikipedia",
        name: 		"Wikipedia",
        match_str: 	"^(https?:)?\/*(www.)?wikipedia\.org|^(https?:)?\/*([a-z][a-z].)?wikipedia\.org",
        cls: 		TL.Media.Wikipedia
      },
      {
        type: 		"spotify",
        name: 		"spotify",
        match_str: 	"spotify",
        cls: 		TL.Media.Spotify
      },
      {
        type: 		"iframe",
        name: 		"iFrame",
        match_str: 	"iframe",
        cls: 		TL.Media.IFrame
      },
      {
        type: 		"storify",
        name: 		"Storify",
        match_str: 	"storify",
        cls: 		TL.Media.Storify
      },
      {
        type: 		"blockquote",
        name: 		"Quote",
        match_str: 	"blockquote",
        cls: 		TL.Media.Blockquote
      },
      // {
      // 	type: 		"website",
      // 	name: 		"Website",
      // 	match_str: 	"https?://",
      // 	cls: 		TL.Media.Website
      // },
      {
        type: 		"imageblank",
        name: 		"Imageblank",
        match_str: 	"",
        cls: 		TL.Media.Image
      }
    ];

  if(image_only) {
        if (m instanceof Array) {
            return false;
        }
        for (var i = 0; i < media_types.length; i++) {
            switch(media_types[i].type) {
                case "flickr":
                case "image":
                case "imgur":
                case "instagram":
                    if (m.url.match(media_types[i].match_str)) {
                        media = media_types[i];
                        return media;
                    }
                    break;

                default:
                    break;
            }
        }

  } else {
        for (var i = 0; i < media_types.length; i++) {
            if (m instanceof Array) {
                return media = {
                    type: 		"slider",
                    cls: 		TL.Media.Slider
                };
            } else if (m.url.match(media_types[i].match_str)) {
                media 		= media_types[i];
                return media;
            }
        };
    }

  return false;

}


/* **********************************************
     Begin TL.Media.js
********************************************** */

/*	TL.Media
  Main media template for media assets.
  Takes a data object and populates a dom object
================================================== */
// TODO add link

TL.Media = TL.Class.extend({

  includes: [TL.Events, TL.I18NMixins],

  _el: {},

  /*	Constructor
  ================================================== */
  initialize: function(data, options, add_to_container) {
    // DOM ELEMENTS
    this._el = {
      container: {},
      content_container: {},
      content: {},
      content_item: {},
      content_link: {},
      caption: null,
      credit: null,
      parent: {},
      link: null
    };

    // Player (If Needed)
    this.player = null;

    // Timer (If Needed)
    this.timer = null;
    this.load_timer = null;

    // Message
    this.message = null;

    // Media ID
    this.media_id = null;

    // State
    this._state = {
      loaded: false,
      show_meta: false,
      media_loaded: false
    };

    // Data
    this.data = {
      unique_id: 			null,
      url: 				null,
      credit:				null,
      caption:			null,
      credit_alternate: 	null,
      caption_alternate: 	null,
      link: 				null,
      link_target: 		null
    };

    //Options
    this.options = {
      api_key_flickr: 		"f2cc870b4d233dd0a5bfe73fd0d64ef0",
      api_key_googlemaps: 	"AIzaSyB9dW8e_iRrATFa8g24qB6BDBGdkrLDZYI",
      api_key_embedly: 		"", // ae2da610d1454b66abdf2e6a4c44026d
      credit_height: 			0,
      caption_height: 		0,
      background:             0   // is background media (for slide)
    };

    this.animator = {};

    // Merge Data and Options
    TL.Util.mergeData(this.options, options);
    TL.Util.mergeData(this.data, data);

        // Don't create DOM elements if this is background media
        if(!this.options.background) {
            this._el.container = TL.Dom.create("div", "tl-media");

            if (this.data.unique_id) {
                this._el.container.id = this.data.unique_id;
            }

            this._initLayout();

            if (add_to_container) {
                add_to_container.appendChild(this._el.container);
                this._el.parent = add_to_container;
            }
        }
  },

  loadMedia: function() {
    var self = this;

    if (!this._state.loaded) {
      try {
        this.load_timer = setTimeout(function() {
                self.loadingMessage();
          self._loadMedia();
          // self._state.loaded = true; handled in onLoaded()
          self._updateDisplay();
        }, 1200);
      } catch (e) {
        trace("Error loading media for ", this._media);
        trace(e);
      }
    }
  },

    _updateMessage: function(msg) {
        if(this.message) {
            this.message.updateMessage(msg);
        }
    },

  loadingMessage: function() {
      this._updateMessage(this._('loading') + " " + this.options.media_name);
  },

  errorMessage: function(msg) {
    if (msg) {
      msg = this._('error') + ": " + msg;
    } else {
      msg = this._('error');
    }
    this._updateMessage(msg);
  },

  updateMediaDisplay: function(layout) {
    if (this._state.loaded && !this.options.background) {

      if (TL.Browser.mobile) {
        this._el.content_item.style.maxHeight = (this.options.height/2) + "px";
      } else {
        this._el.content_item.style.maxHeight = this.options.height - this.options.credit_height - this.options.caption_height - 30 + "px";
      }

      //this._el.content_item.style.maxWidth = this.options.width + "px";
      this._el.container.style.maxWidth = this.options.width + "px";
      // Fix for max-width issues in Firefox
      if (TL.Browser.firefox) {
        if (this._el.content_item.offsetWidth > this._el.content_item.offsetHeight) {
          //this._el.content_item.style.width = "100%";
        }
      }

      this._updateMediaDisplay(layout);

      if (this._state.media_loaded) {
        if (this._el.credit) {
          this._el.credit.style.width		= this._el.content_item.offsetWidth + "px";
        }
        if (this._el.caption) {
          this._el.caption.style.width		= this._el.content_item.offsetWidth + "px";
        }
      }

    }
  },

  /*	Media Specific
  ================================================== */
    _loadMedia: function() {
        // All overrides must call this.onLoaded() to set state
        this.onLoaded();
    },

    _updateMediaDisplay: function(l) {
        //this._el.content_item.style.maxHeight = (this.options.height - this.options.credit_height - this.options.caption_height - 16) + "px";
        if(TL.Browser.firefox) {
            this._el.content_item.style.maxWidth = this.options.width + "px";
            this._el.content_item.style.width = "auto";
        }
    },

    _getMeta: function() {

    },

    _getImageURL: function(w, h) {
        // Image-based media types should return <img>-compatible src url
        return "";
    },

  /*	Public
  ================================================== */
  show: function() {

  },

  hide: function() {

  },

  addTo: function(container) {
    container.appendChild(this._el.container);
    this.onAdd();
  },

  removeFrom: function(container) {
    container.removeChild(this._el.container);
    this.onRemove();
  },

    getImageURL: function(w, h) {
        return this._getImageURL(w, h);
    },

  // Update Display
  updateDisplay: function(w, h, l) {
    this._updateDisplay(w, h, l);
  },

  stopMedia: function() {
    this._stopMedia();
  },

  loadErrorDisplay: function(message) {
    try {
      this._el.content.removeChild(this._el.content_item);
    } catch(e) {
      // if this._el.content_item isn't a child of this._el then just keep truckin
    }
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-loaderror", this._el.content);
    this._el.content_item.innerHTML = "<div class='tl-icon-" + this.options.media_type + "'></div><p>" + message + "</p>";

    // After Loaded
    this.onLoaded(true);
  },

  /*	Events
  ================================================== */
  onLoaded: function(error) {
    this._state.loaded = true;
    this.fire("loaded", this.data);
    if (this.message) {
      this.message.hide();
    }
    if (!(error || this.options.background)) {
      this.showMeta();
    }
    this.updateDisplay();
  },

  onMediaLoaded: function(e) {
    this._state.media_loaded = true;
    this.fire("media_loaded", this.data);
    if (this._el.credit) {
      this._el.credit.style.width		= this._el.content_item.offsetWidth + "px";
    }
    if (this._el.caption) {
      this._el.caption.style.width		= this._el.content_item.offsetWidth + "px";
    }
  },

  showMeta: function(credit, caption) {
    this._state.show_meta = true;
    // Credit
    if (this.data.credit && this.data.credit != "") {
      this._el.credit					= TL.Dom.create("div", "tl-credit", this._el.content_container);
      this._el.credit.innerHTML		= this.options.autolink == true ? TL.Util.linkify(this.data.credit) : this.data.credit;
      this.options.credit_height 		= this._el.credit.offsetHeight;
    }

    // Caption
    if (this.data.caption && this.data.caption != "") {
      this._el.caption				= TL.Dom.create("div", "tl-caption", this._el.content_container);
      this._el.caption.innerHTML		= this.options.autolink == true ? TL.Util.linkify(this.data.caption) : this.data.caption;
      this.options.caption_height 	= this._el.caption.offsetHeight;
    }

    if (!this.data.caption || !this.data.credit) {
      this.getMeta();
    }

  },

  getMeta: function() {
    this._getMeta();
  },

  updateMeta: function() {
    if (!this.data.credit && this.data.credit_alternate) {
      this._el.credit					= TL.Dom.create("div", "tl-credit", this._el.content_container);
      this._el.credit.innerHTML		= this.data.credit_alternate;
      this.options.credit_height 		= this._el.credit.offsetHeight;
    }

    if (!this.data.caption && this.data.caption_alternate) {
      this._el.caption				= TL.Dom.create("div", "tl-caption", this._el.content_container);
      this._el.caption.innerHTML		= this.data.caption_alternate;
      this.options.caption_height 	= this._el.caption.offsetHeight;
    }

    this.updateDisplay();
  },

  onAdd: function() {
    this.fire("added", this.data);
  },

  onRemove: function() {
    this.fire("removed", this.data);
  },

  /*	Private Methods
  ================================================== */
  _initLayout: function () {

    // Message
    this.message = new TL.Message({}, this.options);
    this.message.addTo(this._el.container);

    // Create Layout
    this._el.content_container = TL.Dom.create("div", "tl-media-content-container", this._el.container);

    // Link
    if (this.data.link && this.data.link != "") {

      this._el.link = TL.Dom.create("a", "tl-media-link", this._el.content_container);
      this._el.link.href = this.data.link;
      if (this.data.link_target && this.data.link_target != "") {
        this._el.link.target = this.data.link_target;
      } else {
        this._el.link.target = "_blank";
      }

      this._el.content = TL.Dom.create("div", "tl-media-content", this._el.link);

    } else {
      this._el.content = TL.Dom.create("div", "tl-media-content", this._el.content_container);
    }


  },

  // Update Display
  _updateDisplay: function(w, h, l) {
    if (w) {
      this.options.width = w;

    }
    //this._el.container.style.width = this.options.width + "px";
    if (h) {
      this.options.height = h;
    }

    if (l) {
      this.options.layout = l;
    }

    if (this._el.credit) {
      this.options.credit_height 		= this._el.credit.offsetHeight;
    }
    if (this._el.caption) {
      this.options.caption_height 	= this._el.caption.offsetHeight + 5;
    }

    this.updateMediaDisplay(this.options.layout);

  },

  _stopMedia: function() {

  }

});


/* **********************************************
     Begin TL.Media.Blockquote.js
********************************************** */

/*	TL.Media.Blockquote
================================================== */

TL.Media.Blockquote = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-blockquote", this._el.content);
    this._el.content_container.className = "tl-media-content-container tl-media-content-container-text";

    // Get Media ID
    this.media_id = this.data.url;

    // API Call
    this._el.content_item.innerHTML = this.media_id;

    // After Loaded
    this.onLoaded();
  },

  updateMediaDisplay: function() {

  },

  _updateMediaDisplay: function() {

  }


});


/* **********************************************
     Begin TL.Media.DailyMotion.js
********************************************** */

/*	TL.Media.DailyMotion
================================================== */

TL.Media.DailyMotion = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var api_url,
      self = this;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-dailymotion", this._el.content);

    // Get Media ID
    if (this.data.url.match("video")) {
      this.media_id = this.data.url.split("video\/")[1].split(/[?&]/)[0];
    } else {
      this.media_id = this.data.url.split("embed\/")[1].split(/[?&]/)[0];
    }

    // API URL
    api_url = "https://www.dailymotion.com/embed/video/" + this.media_id;

    // API Call
    this._el.content_item.innerHTML = "<iframe autostart='false' frameborder='0' width='100%' height='100%' src='" + api_url + "'></iframe>"

    // After Loaded
    this.onLoaded();
  },

  // Update Media Display
  _updateMediaDisplay: function() {
    this._el.content_item.style.height = TL.Util.ratio.r16_9({w:this._el.content_item.offsetWidth}) + "px";
  }

});


/* **********************************************
     Begin TL.Media.DocumentCloud.js
********************************************** */

/*	TL.Media.DocumentCloud
================================================== */

TL.Media.DocumentCloud = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var self = this;

    // Create Dom elements
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-documentcloud tl-media-shadow", this._el.content);
    this._el.content_item.id = TL.Util.unique_ID(7)

    // Check url
    if(this.data.url.match(/\.html$/)) {
        this.data.url = this._transformURL(this.data.url);
    } else if(!(this.data.url.match(/.(json|js)$/))) {
        trace("DOCUMENT CLOUD IN URL BUT INVALID SUFFIX");
    }

    // Load viewer API
        TL.Load.js([
          'https://assets.documentcloud.org/viewer/loader.js',
          'https://assets.documentcloud.org/viewer/viewer.js'],
            function() {
              self.createMedia();
      }
    );
  },

  // Viewer API needs js, not html
  _transformURL: function(url) {
        return url.replace(/(.*)\.html$/, '$1.js')
  },

  // Update Media Display
  _updateMediaDisplay: function() {
        this._el.content_item.style.height = this.options.height + "px";
    //this._el.content_item.style.width = this.options.width + "px";
  },

  createMedia: function() {
    // DocumentCloud API call
    DV.load(this.data.url, {
        container: '#'+this._el.content_item.id,
        showSidebar: false
    });
    this.onLoaded();
  },



  /*	Events
  ================================================== */



});


/* **********************************************
     Begin TL.Media.Flickr.js
********************************************** */

/*	TL.Media.Flickr

================================================== */

TL.Media.Flickr = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var api_url,
      self = this;

    try {
        // Get Media ID
        this.establishMediaID();

            // API URL
            api_url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + this.options.api_key_flickr + "&photo_id=" + this.media_id + "&format=json&jsoncallback=?";

            // API Call
            TL.getJSON(api_url, function(d) {
                if (d.stat == "ok") {
                    self.sizes = d.sizes.size; // store sizes info

                    if(!self.options.background) {
                        self.createMedia();
                    }

                    self.onLoaded();
                } else {
                    self.loadErrorDisplay(self._("flickr_notfound_err"));
                }
            });
    } catch(e) {
        self.loadErrorDisplay(self._(e.message_key));
    }
  },

  establishMediaID: function() {
    if (this.data.url.match(/flic.kr\/.+/i)) {
      var encoded = this.data.url.split('/').slice(-1)[0];
      this.media_id = TL.Util.base58.decode(encoded);
    } else {
      var marker = 'flickr.com/photos/';
      var idx = this.data.url.indexOf(marker);
      if (idx == -1) { throw new TL.Error("flickr_invalidurl_err"); }
      var pos = idx + marker.length;
      this.media_id = this.data.url.substr(pos).split("/")[1];
    }
  },

  createMedia: function() {
      var self = this;

    // Link
    this._el.content_link = TL.Dom.create("a", "", this._el.content);
    this._el.content_link.href = this.data.url;
    this._el.content_link.target = "_blank";

    // Photo
    this._el.content_item = TL.Dom.create("img", "tl-media-item tl-media-image tl-media-flickr tl-media-shadow", this._el.content_link);

    // Media Loaded Event
    this._el.content_item.addEventListener('load', function(e) {
      self.onMediaLoaded();
    });

    // Set Image Source
    this._el.content_item.src = this.getImageURL(this.options.width, this.options.height);
  },

    getImageURL: function(w, h) {
        var best_size 	= this.size_label(h),
            source = this.sizes[this.sizes.length - 2].source;

    for(var i = 0; i < this.sizes.length; i++) {
      if (this.sizes[i].label == best_size) {
        source = this.sizes[i].source;
      }
    }

    return source;
    },

  _getMeta: function() {
    var self = this,
    api_url;

    // API URL
    api_url = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + this.options.api_key_flickr + "&photo_id=" + this.media_id + "&format=json&jsoncallback=?";

    // API Call
    TL.getJSON(api_url, function(d) {
      self.data.credit_alternate = "<a href='" + self.data.url + "' target='_blank'>" + d.photo.owner.realname + "</a>";
      self.data.caption_alternate = d.photo.title._content + " " + d.photo.description._content;
      self.updateMeta();
    });
  },

  size_label: function(s) {
    var _size = "";

    if (s <= 75) {
      if (s <= 0) {
        _size = "Large";
      } else {
        _size = "Thumbnail";
      }
    } else if (s <= 180) {
      _size = "Small";
    } else if (s <= 240) {
      _size = "Small 320";
    } else if (s <= 375) {
      _size = "Medium";
    } else if (s <= 480) {
      _size = "Medium 640";
    } else if (s <= 600) {
      _size = "Large";
    } else {
      _size = "Large";
    }

    return _size;
  }



});


/* **********************************************
     Begin TL.Media.GoogleDoc.js
********************************************** */

/*	TL.Media.GoogleDoc

================================================== */

TL.Media.GoogleDoc = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var url,
      self = this;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-iframe", this._el.content);

    // Get Media ID
    if (this.data.url.match("open\?id\=")) {
      this.media_id = this.data.url.split("open\?id\=")[1];
      if (this.data.url.match("\&authuser\=0")) {
        url = this.media_id.match("\&authuser\=0")[0];
      };
    } else if (this.data.url.match(/file\/d\/([^/]*)\/?/)) {
      var doc_id = this.data.url.match(/file\/d\/([^/]*)\/?/)[1];
      url = 'https://drive.google.com/file/d/' + doc_id + '/preview'
    } else {
      url = this.data.url;
    }

    // this URL makes something suitable for an img src but what if it's not an image?
    // api_url = "http://www.googledrive.com/host/" + this.media_id + "/";

    this._el.content_item.innerHTML	=	"<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + url + "'></iframe>";

    // After Loaded
    this.onLoaded();
  },

  // Update Media Display
  _updateMediaDisplay: function() {
    this._el.content_item.style.height = this.options.height + "px";
  }


});


/* **********************************************
     Begin TL.Media.GooglePlus.js
********************************************** */

/*	TL.Media.GooglePlus
================================================== */

TL.Media.GooglePlus = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var api_url,
      self = this;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-googleplus", this._el.content);

    // Get Media ID
    this.media_id = this.data.url;

    // API URL
    api_url = this.media_id;

    // API Call
    this._el.content_item.innerHTML = "<iframe frameborder='0' width='100%' height='100%' src='" + api_url + "'></iframe>"

    // After Loaded
    this.onLoaded();
  },

  // Update Media Display
  _updateMediaDisplay: function() {
    this._el.content_item.style.height = this.options.height + "px";
  }


});


/* **********************************************
     Begin TL.Media.IFrame.js
********************************************** */

/*	TL.Media.IFrame
================================================== */

TL.Media.IFrame = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var api_url,
      self = this;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-iframe", this._el.content);

    // Get Media ID
    this.media_id = this.data.url;

    // API URL
    api_url = this.media_id;

    // API Call
    this._el.content_item.innerHTML = api_url;

    // After Loaded
    this.onLoaded();
  },

  // Update Media Display
  _updateMediaDisplay: function() {
    this._el.content_item.style.height = this.options.height + "px";
  }

});


/* **********************************************
     Begin TL.Media.Image.js
********************************************** */

/*	TL.Media.Image
  Produces image assets.
  Takes a data object and populates a dom object
================================================== */

TL.Media.Image = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    // Loading Message
    this.loadingMessage();

        // Create media?
        if(!this.options.background) {
            this.createMedia();
        }

        // After loaded
    this.onLoaded();
  },

    createMedia: function() {
        var self = this,
            image_class = "tl-media-item tl-media-image tl-media-shadow";

    if (this.data.url.match(/.png(\?.*)?$/) || this.data.url.match(/.svg(\?.*)?$/)) {
      image_class = "tl-media-item tl-media-image"
    }

     // Link
    if (this.data.link) {
      this._el.content_link 				= TL.Dom.create("a", "", this._el.content);
      this._el.content_link.href 			= this.data.link;
      this._el.content_link.target 		= "_blank";
      this._el.content_item				= TL.Dom.create("img", image_class, this._el.content_link);
    } else {
      this._el.content_item				= TL.Dom.create("img", image_class, this._el.content);
    }

    // Media Loaded Event
    this._el.content_item.addEventListener('load', function(e) {
      self.onMediaLoaded();
    });

    this._el.content_item.src			= this.getImageURL();
    },

    getImageURL: function(w, h) {
        return TL.Util.transformImageURL(this.data.url);
    },

  _updateMediaDisplay: function(layout) {
    if(TL.Browser.firefox) {
      //this._el.content_item.style.maxWidth = (this.options.width/2) - 40 + "px";
      this._el.content_item.style.width = "auto";
    }
  }

});


/* **********************************************
     Begin TL.Media.Imgur.js
********************************************** */

/*	TL.Media.Flickr

================================================== */

TL.Media.Imgur = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    try {
        this.media_id = this.data.url.split('/').slice(-1)[0];

            if(!this.options.background) {
                this.createMedia();
            }

      // After Loaded
      this.onLoaded();

    } catch(e) {
        this.loadErrorDisplay(self._("imgur_invalidurl_err"));
    }
  },

  createMedia: function() {
      var self = this;

    // Link
    this._el.content_link 				= TL.Dom.create("a", "", this._el.content);
    this._el.content_link.href 			= this.data.url;
    this._el.content_link.target 		= "_blank";

    // Photo
    this._el.content_item	= TL.Dom.create("img", "tl-media-item tl-media-image tl-media-imgur tl-media-shadow", this._el.content_link);

    // Media Loaded Event
    this._el.content_item.addEventListener('load', function(e) {
      self.onMediaLoaded();
    });

        this._el.content_item.src			= this.getImageURL();
  },

  getImageURL: function(w, h) {
      return 'https://i.imgur.com/' + this.media_id + '.png';
  }

});


/* **********************************************
     Begin TL.Media.Instagram.js
********************************************** */

/*	TL.Media.Instagram

================================================== */

TL.Media.Instagram = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    // Get Media ID
    this.media_id = this.data.url.split("\/p\/")[1].split("/")[0];

    if(!this.options.background) {
        this.createMedia();
    }

    // After Loaded
    this.onLoaded();
  },

    createMedia: function() {
        var self = this;

    // Link
    this._el.content_link 				= TL.Dom.create("a", "", this._el.content);
    this._el.content_link.href 			= this.data.url;
    this._el.content_link.target 		= "_blank";

    // Photo
    this._el.content_item				= TL.Dom.create("img", "tl-media-item tl-media-image tl-media-instagram tl-media-shadow", this._el.content_link);

    // Media Loaded Event
    this._el.content_item.addEventListener('load', function(e) {
      self.onMediaLoaded();
    });

      this._el.content_item.src = this.getImageURL(this._el.content.offsetWidth);
    },

    getImageURL: function(w, h) {
        return "https://instagram.com/p/" + this.media_id + "/media/?size=" + this.sizes(w);
    },

  _getMeta: function() {
    var self = this,
        api_url;

    // API URL
    api_url = "https://api.instagram.com/oembed?url=https://instagr.am/p/" + this.media_id + "&callback=?";

    // API Call
    TL.getJSON(api_url, function(d) {
      self.data.credit_alternate = "<a href='" + d.author_url + "' target='_blank'>" + d.author_name + "</a>";
      self.data.caption_alternate = d.title;
      self.updateMeta();
    });
  },

  sizes: function(s) {
    var _size = "";
    if (s <= 150) {
      _size = "t";
    } else if (s <= 306) {
      _size = "m";
    } else {
      _size = "l";
    }

    return _size;
  }



});


/* **********************************************
     Begin TL.Media.GoogleMap.js
********************************************** */

/*  TL.Media.Map
================================================== */

TL.Media.GoogleMap = TL.Media.extend({
  includes: [TL.Events],

  /*  Load the media
  ================================================== */
  _loadMedia: function() {

    // Create Dom element
    this._el.content_item   = TL.Dom.create("div", "tl-media-item tl-media-map tl-media-shadow", this._el.content);

    // Get Media ID
    this.media_id = this.data.url;

    // API Call
    this.mapframe = TL.Dom.create("iframe", "", this._el.content_item);
    window.stash = this;
    this.mapframe.width       = "100%";
    this.mapframe.height      = "100%";
    this.mapframe.frameBorder = "0";
    this.mapframe.src         = this.makeGoogleMapsEmbedURL(this.media_id, this.options.api_key_googlemaps);


    // After Loaded
    this.onLoaded();
  },

  _updateMediaDisplay: function() {
    if (this._state.loaded) {
      var dimensions = TL.Util.ratio.square({w:this._el.content_item.offsetWidth});
      this._el.content_item.style.height = dimensions.h + "px";
    }
  },

  makeGoogleMapsEmbedURL: function(url,api_key) {
    // Test with https://docs.google.com/spreadsheets/d/1zCpvtRdftlR5fBPppmy_-SkGIo7RMwoPUiGFZDAXbTc/edit
    var Streetview = false;

    function determineMapMode(url){
      function parseDisplayMode(display_mode, param_string) {
        // Set the zoom param
        if (display_mode.slice(-1) == "z") {
          param_string["zoom"] = display_mode;
          // Set the maptype to something other than "roadmap"
        } else if (display_mode.slice(-1) == "m") {
          // TODO: make this somehow interpret the correct zoom level
          // until then fake it by using Google's default zoom level
          param_string["zoom"] = 14;
          param_string["maptype"] = "satellite";
          // Set all the fun streetview params
        } else if (display_mode.slice(-1) == "t") {
          Streetview = true;
          // streetview uses "location" instead of "center"
          // "place" mode doesn't have the center param, so we may need to grab that now
          if (mapmode == "place") {
            var center = url.match(regexes["place"])[3] + "," + url.match(regexes["place"])[4];
          } else {
            var center = param_string["center"];
            delete param_string["center"];
          }
          // Clear out all the other params -- this is so hacky
          param_string = {};
          param_string["location"] = center;
          streetview_params = display_mode.split(",");
          for (param in param_defs["streetview"]) {
            var i = parseInt(param) + 1;
            if (param_defs["streetview"][param] == "pitch" && streetview_params[i] == "90t"){
              // Although 90deg is the horizontal default in the URL, 0 is horizontal default for embed URL. WHY??
              // https://developers.google.com/maps/documentation/javascript/streetview
              param_string[param_defs["streetview"][param]] = 0;
            } else {
              param_string[param_defs["streetview"][param]] = streetview_params[i].slice(0,-1);
            }
          }

        }
        return param_string;
      }
      function determineMapModeURL(mapmode, match) {
        var param_string = {};
        var url_root = match[1], display_mode = match[match.length - 1];
        for (param in param_defs[mapmode]) {
          // skip first 2 matches, because they reflect the URL and not params
          var i = parseInt(param)+2;
          if (param_defs[mapmode][param] == "center") {
            param_string[param_defs[mapmode][param]] = match[i] + "," + match[++i];
          } else {
            param_string[param_defs[mapmode][param]] = match[i];
          }
        }

        param_string = parseDisplayMode(display_mode, param_string);
        param_string["key"] = api_key;
        if (Streetview == true) {
          mapmode = "streetview";
        } else {
        }
        return (url_root + "/embed/v1/" + mapmode + TL.Util.getParamString(param_string));
      }


      mapmode = "view";
      if (url.match(regexes["place"])) {
        mapmode = "place";
      } else if (url.match(regexes["directions"])) {
        mapmode = "directions";
      } else if (url.match(regexes["search"])) {
        mapmode = "search";
      }
      return determineMapModeURL(mapmode, url.match(regexes[mapmode]));

    }

    // These must be in the order they appear in the original URL
    // "key" param not included since it's not in the URL structure
    // Streetview "location" param not included since it's captured as "center"
    // Place "center" param ...um...
    var param_defs = {
      "view": ["center"],
      "place": ["q", "center"],
      "directions": ["origin", "destination", "center"],
      "search": ["q", "center"],
      "streetview": ["fov", "heading", "pitch"]
    };
    // Set up regex parts to make updating these easier if Google changes them
    var root_url_regex = /(https:\/\/.+google.+?\/maps)/;
    var coords_regex = /@([-\d.]+),([-\d.]+)/;
    var address_regex = /([\w\W]+)/;

    // Data doesn't seem to get used for anything
    var data_regex = /data=[\S]*/;

    // Capture the parameters that determine what map tiles to use
    // In roadmap view, mode URLs include zoom paramater (e.g. "14z")
    // In satellite (or "earth") view, URLs include a distance parameter (e.g. "84511m")
    // In streetview, URLs include paramaters like "3a,75y,49.76h,90t" -- see http://stackoverflow.com/a/22988073
    var display_mode_regex = /,((?:[-\d.]+[zmayht],?)*)/;

    var regexes = {
      view: new RegExp(root_url_regex.source + "/" + coords_regex.source + display_mode_regex.source),
      place: new RegExp(root_url_regex.source + "/place/" + address_regex.source + "/" + coords_regex.source + display_mode_regex.source),
      directions: new RegExp(root_url_regex.source + "/dir/" + address_regex.source + "/" + address_regex.source + "/" + coords_regex.source + display_mode_regex.source),
      search: new RegExp(root_url_regex.source + "/search/" + address_regex.source + "/" + coords_regex.source + display_mode_regex.source)
    };
    return determineMapMode(url);
  }

});


/* **********************************************
     Begin TL.Media.PDF.js
********************************************** */

/*	TL.Media.PDF
 * Chrome and Firefox on both OSes and Safari all support PDFs as iframe src.
 * This prompts for a download on IE10/11. We should investigate using
 * https://mozilla.github.io/pdf.js/ to support showing PDFs on IE.
================================================== */

TL.Media.PDF = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var url = TL.Util.transformImageURL(this.data.url),
      self = this;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-iframe", this._el.content);
    var markup = "";
    // not assigning media_id attribute. Seems like a holdover which is no longer used.
    if (TL.Browser.ie || TL.Browser.edge || url.match(/dl.dropboxusercontent.com/)) {
      markup = "<iframe class='doc' frameborder='0' width='100%' height='100%' src='//docs.google.com/viewer?url=" + url + "&amp;embedded=true'></iframe>";
    } else {
      markup = "<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + url + "'></iframe>"
    }
    this._el.content_item.innerHTML	= markup
    this.onLoaded();
  },

  // Update Media Display
  _updateMediaDisplay: function() {
    this._el.content_item.style.height = this.options.height + "px";
  }


});


/* **********************************************
     Begin TL.Media.Profile.js
********************************************** */

/*	TL.Media.Profile

================================================== */

TL.Media.Profile = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {

    this._el.content_item				= TL.Dom.create("img", "tl-media-item tl-media-image tl-media-profile tl-media-shadow", this._el.content);
    this._el.content_item.src			= this.data.url;

    this.onLoaded();
  },

  _updateMediaDisplay: function(layout) {


    if(TL.Browser.firefox) {
      this._el.content_item.style.maxWidth = (this.options.width/2) - 40 + "px";
    }
  }

});

/* **********************************************
     Begin TL.Media.Slider.js
********************************************** */

/*	TL.Media.SLider
  Produces a Slider
  Takes a data object and populates a dom object
  TODO
  Placeholder
================================================== */

TL.Media.Slider = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {

    this._el.content_item				= TL.Dom.create("img", "tl-media-item tl-media-image", this._el.content);
    this._el.content_item.src			= this.data.url;

    this.onLoaded();
  }

});

/* **********************************************
     Begin TL.Media.SoundCloud.js
********************************************** */

/*	TL.Media.SoundCloud
================================================== */

TL.Media.SoundCloud = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var api_url,
      self = this;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-soundcloud tl-media-shadow", this._el.content);

    // Get Media ID
    this.media_id = this.data.url;

    // API URL
    api_url = "https://soundcloud.com/oembed?url=" + this.media_id + "&format=js&callback=?"

    // API Call
    TL.getJSON(api_url, function(d) {
      self.createMedia(d);
    });

  },

  createMedia: function(d) {
    this._el.content_item.innerHTML = d.html;

    // After Loaded
    this.onLoaded();
  }

});


/* **********************************************
     Begin TL.Media.Spotify.js
********************************************** */

/*	TL.Media.Spotify
================================================== */

TL.Media.Spotify = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var api_url,
      self = this;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-spotify", this._el.content);

    // Get Media ID
    if (this.data.url.match(/^spotify:track/) || this.data.url.match(/^spotify:user:.+:playlist:/)) {
      this.media_id = this.data.url;
    }
    if (this.data.url.match(/spotify.com\/track\/(.+)/)) {
      this.media_id = "spotify:track:" + this.data.url.match(/spotify.com\/track\/(.+)/)[1];
    } else if (this.data.url.match(/spotify.com\/user\/(.+?)\/playlist\/(.+)/)) {
      var user = this.data.url.match(/spotify.com\/user\/(.+?)\/playlist\/(.+)/)[1];
      var playlist = this.data.url.match(/spotify.com\/user\/(.+?)\/playlist\/(.+)/)[2];
      this.media_id = "spotify:user:" + user + ":playlist:" + playlist;
    }

    if (this.media_id) {
      // API URL
      api_url = "https://embed.spotify.com/?uri=" + this.media_id + "&theme=white&view=coverart";

      this.player = TL.Dom.create("iframe", "tl-media-shadow", this._el.content_item);
      this.player.width 		= "100%";
      this.player.height 		= "100%";
      this.player.frameBorder = "0";
      this.player.src 		= api_url;

      // After Loaded
      this.onLoaded();

    } else {
        this.loadErrorDisplay(this._('spotify_invalid_url'));
    }
  },

  // Update Media Display

  _updateMediaDisplay: function(l) {
    var _height = this.options.height,
      _player_height = 0,
      _player_width = 0;

    if (TL.Browser.mobile) {
      _height = (this.options.height/2);
    } else {
      _height = this.options.height - this.options.credit_height - this.options.caption_height - 30;
    }

    this._el.content_item.style.maxHeight = "none";
    trace(_height);
    trace(this.options.width)
    if (_height > this.options.width) {
      trace("height is greater")
      _player_height = this.options.width + 80 + "px";
      _player_width = this.options.width + "px";
    } else {
      trace("width is greater")
      trace(this.options.width)
      _player_height = _height + "px";
      _player_width = _height - 80 + "px";
    }


    this.player.style.width = _player_width;
    this.player.style.height = _player_height;

    if (this._el.credit) {
      this._el.credit.style.width		= _player_width;
    }
    if (this._el.caption) {
      this._el.caption.style.width		= _player_width;
    }
  },


  _stopMedia: function() {
    // Need spotify stop code

  }

});


/* **********************************************
     Begin TL.Media.Storify.js
********************************************** */

/*	TL.Media.Storify
================================================== */

TL.Media.Storify = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var content;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-storify", this._el.content);

    // Get Media ID
    this.media_id = this.data.url;

    // Content
    content =	"<iframe frameborder='0' width='100%' height='100%' src='" + this.media_id + "/embed'></iframe>";
    content +=	"<script src='" + this.media_id + ".js'></script>";

    // API Call
    this._el.content_item.innerHTML = content;

    // After Loaded
    this.onLoaded();
  },

  // Update Media Display
  _updateMediaDisplay: function() {
    this._el.content_item.style.height = this.options.height + "px";
  }


});


/* **********************************************
     Begin TL.Media.Text.js
********************************************** */

TL.Media.Text = TL.Class.extend({

  includes: [TL.Events],

  // DOM ELEMENTS
  _el: {
    container: {},
    content_container: {},
    content: {},
    headline: {},
    date: {}
  },

  // Data
  data: {
    unique_id: 			"",
    headline: 			"headline",
    text: 				"text"
  },

  // Options
  options: {
    title: 			false
  },

  /*	Constructor
  ================================================== */
  initialize: function(data, options, add_to_container) {

    TL.Util.setData(this, data);

    // Merge Options
    TL.Util.mergeData(this.options, options);

    this._el.container = TL.Dom.create("div", "tl-text");
    this._el.container.id = this.data.unique_id;

    this._initLayout();

    if (add_to_container) {
      add_to_container.appendChild(this._el.container);
    };

  },

  /*	Adding, Hiding, Showing etc
  ================================================== */
  show: function() {

  },

  hide: function() {

  },

  addTo: function(container) {
    container.appendChild(this._el.container);
    //this.onAdd();
  },

  removeFrom: function(container) {
    container.removeChild(this._el.container);
  },

  headlineHeight: function() {
    return this._el.headline.offsetHeight + 40;
  },

  addDateText: function(str) {
    this._el.date.innerHTML = str;
  },

  /*	Events
  ================================================== */
  onLoaded: function() {
    this.fire("loaded", this.data);
  },

  onAdd: function() {
    this.fire("added", this.data);
  },

  onRemove: function() {
    this.fire("removed", this.data);
  },

  /*	Private Methods
  ================================================== */
  _initLayout: function () {

    // Create Layout
    this._el.content_container			= TL.Dom.create("div", "tl-text-content-container", this._el.container);

    // Date
    this._el.date 				= TL.Dom.create("h3", "tl-headline-date", this._el.content_container);

    // Headline
    if (this.data.headline != "") {
      var headline_class = "tl-headline";
      if (this.options.title) {
        headline_class = "tl-headline tl-headline-title";
      }
      this._el.headline				= TL.Dom.create("h2", headline_class, this._el.content_container);
      this._el.headline.innerHTML		= this.data.headline;
    }

    // Text
    if (this.data.text != "") {
      var text_content = "";

      text_content += TL.Util.htmlify(this.options.autolink == true ? TL.Util.linkify(this.data.text) : this.data.text);
      trace(this.data.text);
      this._el.content				= TL.Dom.create("div", "tl-text-content", this._el.content_container);
      this._el.content.innerHTML		= text_content;
      trace(text_content);
      trace(this._el.content)
    }

    // Fire event that the slide is loaded
    this.onLoaded();

  }

});


/* **********************************************
     Begin TL.Media.Twitter.js
********************************************** */

/*	TL.Media.Twitter
  Produces Twitter Display
================================================== */

TL.Media.Twitter = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var api_url,
      self = this;

    // Create Dom element
    this._el.content_item = TL.Dom.create("div", "tl-media-twitter", this._el.content);
    this._el.content_container.className = "tl-media-content-container tl-media-content-container-text";

    // Get Media ID
    if (this.data.url.match("status\/")) {
      this.media_id = this.data.url.split("status\/")[1];
    } else if (this.data.url.match("statuses\/")) {
      this.media_id = this.data.url.split("statuses\/")[1];
    } else {
      this.media_id = "";
    }

    // API URL
    api_url = "https://api.twitter.com/1/statuses/oembed.json?id=" + this.media_id + "&omit_script=true&include_entities=true&callback=?";

    // API Call
    TL.ajax({
      type: 'GET',
      url: api_url,
      dataType: 'json', //json data type
      success: function(d){
        self.createMedia(d);
      },
      error:function(xhr, type){
        var error_text = "";
        error_text += self._("twitter_load_err") + "<br/>" + self.media_id + "<br/>" + type;
        self.loadErrorDisplay(error_text);
      }
    });

  },

  createMedia: function(d) {
    var tweet				= "",
      tweet_text			= "",
      tweetuser			= "",
      tweet_status_temp 	= "",
      tweet_status_url 	= "",
      tweet_status_date 	= "";

    //	TWEET CONTENT
    tweet_text 			= d.html.split("<\/p>\&mdash;")[0] + "</p></blockquote>";
    tweetuser			= d.author_url.split("twitter.com\/")[1];
    tweet_status_temp 	= d.html.split("<\/p>\&mdash;")[1].split("<a href=\"")[1];
    tweet_status_url 	= tweet_status_temp.split("\"\>")[0];
    tweet_status_date 	= tweet_status_temp.split("\"\>")[1].split("<\/a>")[0];

    // Open links in new window
    tweet_text = tweet_text.replace(/<a href/ig, '<a class="tl-makelink" target="_blank" href');

    // 	TWEET CONTENT
    tweet += tweet_text;

    //	TWEET AUTHOR
    tweet += "<div class='vcard'>";
    tweet += "<a href='" + tweet_status_url + "' class='twitter-date' target='_blank'>" + tweet_status_date + "</a>";
    tweet += "<div class='author'>";
    tweet += "<a class='screen-name url' href='" + d.author_url + "' target='_blank'>";
    tweet += "<span class='avatar'></span>";
    tweet += "<span class='fn'>" + d.author_name + " <span class='tl-icon-twitter'></span></span>";
    tweet += "<span class='nickname'>@" + tweetuser + "<span class='thumbnail-inline'></span></span>";
    tweet += "</a>";
    tweet += "</div>";
    tweet += "</div>";


    // Add to DOM
    this._el.content_item.innerHTML	= tweet;

    // After Loaded
    this.onLoaded();

  },

  updateMediaDisplay: function() {

  },

  _updateMediaDisplay: function() {

  }



});


/* **********************************************
     Begin TL.Media.TwitterEmbed.js
********************************************** */

/*	TL.Media.TwitterEmbed
  Produces Twitter Display
================================================== */

TL.Media.TwitterEmbed = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var api_url,
      self = this;

    // Create Dom element
    this._el.content_item = TL.Dom.create("div", "tl-media-twitter", this._el.content);
    this._el.content_container.className = "tl-media-content-container tl-media-content-container-text";

    // Get Media ID
    var found = this.data.url.match(/(status|statuses)\/(\d+)/);
    if (found && found.length > 2) {
        this.media_id = found[2];
    } else {
        self.loadErrorDisplay(self._("twitterembed_invalidurl_err"));
        return;
    }

    // API URL
    api_url = "https://api.twitter.com/1/statuses/oembed.json?id=" + this.media_id + "&omit_script=true&include_entities=true&callback=?";

    // API Call
    TL.ajax({
      type: 'GET',
      url: api_url,
      dataType: 'json', //json data type
      success: function(d){
        self.createMedia(d);
      },
      error:function(xhr, type){
        var error_text = "";
        error_text += self._("twitter_load_err") + "<br/>" + self.media_id + "<br/>" + type;
        self.loadErrorDisplay(error_text);
      }
    });

  },

  createMedia: function(d) {
    trace("create_media")
    var tweet				= "",
      tweet_text			= "",
      tweetuser			= "",
      tweet_status_temp 	= "",
      tweet_status_url 	= "",
      tweet_status_date 	= "";

    //	TWEET CONTENT
    tweet_text 			= d.html.split("<\/p>\&mdash;")[0] + "</p></blockquote>";
    tweetuser			= d.author_url.split("twitter.com\/")[1];
    tweet_status_temp 	= d.html.split("<\/p>\&mdash;")[1].split("<a href=\"")[1];
    tweet_status_url 	= tweet_status_temp.split("\"\>")[0];
    tweet_status_date 	= tweet_status_temp.split("\"\>")[1].split("<\/a>")[0];

    // Open links in new window
    tweet_text = tweet_text.replace(/<a href/ig, '<a target="_blank" href');

    // 	TWEET CONTENT
    tweet += tweet_text;

    //	TWEET AUTHOR
    tweet += "<div class='vcard'>";
    tweet += "<a href='" + tweet_status_url + "' class='twitter-date' target='_blank'>" + tweet_status_date + "</a>";
    tweet += "<div class='author'>";
    tweet += "<a class='screen-name url' href='" + d.author_url + "' target='_blank'>";
    tweet += "<span class='avatar'></span>";
    tweet += "<span class='fn'>" + d.author_name + " <span class='tl-icon-twitter'></span></span>";
    tweet += "<span class='nickname'>@" + tweetuser + "<span class='thumbnail-inline'></span></span>";
    tweet += "</a>";
    tweet += "</div>";
    tweet += "</div>";


    // Add to DOM
    this._el.content_item.innerHTML	= tweet;

    // After Loaded
    this.onLoaded();

  },

  updateMediaDisplay: function() {

  },

  _updateMediaDisplay: function() {

  }



});


/* **********************************************
     Begin TL.Media.Vimeo.js
********************************************** */

/*	TL.Media.Vimeo
================================================== */

TL.Media.Vimeo = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var api_url,
      self = this;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-vimeo tl-media-shadow", this._el.content);

    // Get Media ID
    this.media_id = this.data.url.split(/video\/|\/\/vimeo\.com\//)[1].split(/[?&]/)[0];

    // API URL
    api_url = "https://player.vimeo.com/video/" + this.media_id + "?api=1&title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff";

    this.player = TL.Dom.create("iframe", "", this._el.content_item);

    // Media Loaded Event
    this.player.addEventListener('load', function(e) {
      self.onMediaLoaded();
    });

    this.player.width 		= "100%";
    this.player.height 		= "100%";
    this.player.frameBorder = "0";
    this.player.src 		= api_url;

    // After Loaded
    this.onLoaded();
  },

  // Update Media Display
  _updateMediaDisplay: function() {
    this._el.content_item.style.height = TL.Util.ratio.r16_9({w:this._el.content_item.offsetWidth}) + "px";

  },

  _stopMedia: function() {

    try {
      this.player.contentWindow.postMessage(JSON.stringify({method: "pause"}), "https://player.vimeo.com");
    }
    catch(err) {
      trace(err);
    }

  }
});


/* **********************************************
     Begin TL.Media.Vine.js
********************************************** */

/*	TL.Media.Vine

================================================== */

TL.Media.Vine = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var api_url,
      self = this;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-vine tl-media-shadow", this._el.content);

    // Get Media ID
    this.media_id = this.data.url.split("vine.co/v/")[1];

    // API URL
    api_url = "https://vine.co/v/" + this.media_id + "/embed/simple";

    // API Call
    this._el.content_item.innerHTML = "<iframe frameborder='0' width='100%' height='100%' src='" + api_url + "'></iframe><script async src='https://platform.vine.co/static/scripts/embed.js' charset='utf-8'></script>"

    // After Loaded
    this.onLoaded();
  },

  // Update Media Display
  _updateMediaDisplay: function() {
    var size = TL.Util.ratio.square({w:this._el.content_item.offsetWidth , h:this.options.height});
    this._el.content_item.style.height = size.h + "px";
  }

});


/* **********************************************
     Begin TL.Media.Website.js
********************************************** */

/*	TL.Media.Website
  Uses Embedly
  http://embed.ly/docs/api/extract/endpoints/1/extract
================================================== */

TL.Media.Website = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var self = this;

    // Get Media ID
    this.media_id = this.data.url.replace(/.*?:\/\//g, "");

    if (this.options.api_key_embedly) {
      // API URL
      api_url = "https://api.embed.ly/1/extract?key=" + this.options.api_key_embedly + "&url=" + this.media_id + "&callback=?";

      // API Call
      TL.getJSON(api_url, function(d) {
        self.createMedia(d);
      });
    } else {
      this.createCardContent();
    }
  },

  createCardContent: function() {
    (function(w, d){
      var id='embedly-platform', n = 'script';
      if (!d.getElementById(id)){
       w.embedly = w.embedly || function() {(w.embedly.q = w.embedly.q || []).push(arguments);};
       var e = d.createElement(n); e.id = id; e.async=1;
       e.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.embedly.com/widgets/platform.js';
       var s = d.getElementsByTagName(n)[0];
       s.parentNode.insertBefore(e, s);
      }
    })(window, document);

    var content = "<a href=\"" + this.data.url + "\" class=\"embedly-card\">" + this.data.url + "</a>";
    this._setContent(content);

  },
  createMedia: function(d) { // this costs API credits...
    var content = "";


    content		+=	"<h4><a href='" + this.data.url + "' target='_blank'>" + d.title + "</a></h4>";
    if (d.images) {
      if (d.images[0]) {
        trace(d.images[0].url);
        content		+=	"<img src='" + d.images[0].url + "' />";
      }
    }
    if (d.favicon_url) {
      content		+=	"<img class='tl-media-website-icon' src='" + d.favicon_url + "' />";
    }
    content		+=	"<span class='tl-media-website-description'>" + d.provider_name + "</span><br/>";
    content		+=	"<p>" + d.description + "</p>";

    this._setContent(content);
  },

  _setContent: function(content) {
    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-website", this._el.content);
    this._el.content_container.className = "tl-media-content-container tl-media-content-container-text";
    this._el.content_item.innerHTML = content;

    // After Loaded
    this.onLoaded();

  },

  updateMediaDisplay: function() {

  },

  _updateMediaDisplay: function() {

  }


});


/* **********************************************
     Begin TL.Media.Wikipedia.js
********************************************** */

/*	TL.Media.Wikipedia
================================================== */

TL.Media.Wikipedia = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var api_url,
      api_language,
      self = this;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-wikipedia", this._el.content);
    this._el.content_container.className = "tl-media-content-container tl-media-content-container-text";

    // Get Media ID
    this.media_id	 = this.data.url.split("wiki\/")[1].split("#")[0].replace("_", " ");
    this.media_id	 = this.media_id.replace(" ", "%20");
    api_language	 = this.data.url.split("//")[1].split(".wikipedia")[0];

    // API URL
    api_url = "https://" + api_language + ".wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&redirects=&titles=" + this.media_id + "&exintro=1&format=json&callback=?";

    // API Call
    TL.ajax({
      type: 'GET',
      url: api_url,
      dataType: 'json', //json data type

      success: function(d){
        self.createMedia(d);
      },
      error:function(xhr, type){
        var error_text = "";
        error_text += self._("wikipedia_load_err") + "<br/>" + self.media_id + "<br/>" + type;
        self.loadErrorDisplay(error_text);
      }
    });

  },

  createMedia: function(d) {
    var wiki = "";

    if (d.query) {
      var content = "",
        wiki = {
          entry: {},
          title: "",
          text: "",
          extract: "",
          paragraphs: 1,
          page_image: "",
          text_array: []
        };

      wiki.entry		 = TL.Util.getObjectAttributeByIndex(d.query.pages, 0);
      wiki.extract	 = wiki.entry.extract;
      wiki.title		 = wiki.entry.title;
      wiki.page_image	 = wiki.entry.thumbnail;

      if (wiki.extract.match("<p>")) {
        wiki.text_array = wiki.extract.split("<p>");
      } else {
        wiki.text_array.push(wiki.extract);
      }

      for(var i = 0; i < wiki.text_array.length; i++) {
        if (i+1 <= wiki.paragraphs && i+1 < wiki.text_array.length) {
          wiki.text	+= "<p>" + wiki.text_array[i+1];
        }
      }


      content		+=	"<span class='tl-icon-wikipedia'></span>";
      content		+=	"<div class='tl-wikipedia-title'><h4><a href='" + this.data.url + "' target='_blank'>" + wiki.title + "</a></h4>";
      content		+=	"<span class='tl-wikipedia-source'>" + this._('wikipedia') + "</span></div>";

      if (wiki.page_image) {
        //content 	+= 	"<img class='tl-wikipedia-pageimage' src='" + wiki.page_image.source +"'>";
      }

      content		+=	wiki.text;

      if (wiki.extract.match("REDIRECT")) {

      } else {
        // Add to DOM
        this._el.content_item.innerHTML	= content;
        // After Loaded
        this.onLoaded();
      }


    }

  },

  updateMediaDisplay: function() {

  },

  _updateMediaDisplay: function() {

  }

});


/* **********************************************
     Begin TL.Media.YouTube.js
********************************************** */

/*	TL.Media.YouTube
================================================== */

TL.Media.YouTube = TL.Media.extend({

  includes: [TL.Events],

  /*	Load the media
  ================================================== */
  _loadMedia: function() {
    var self = this,
      url_vars;

    this.youtube_loaded = false;

    // Create Dom element
    this._el.content_item	= TL.Dom.create("div", "tl-media-item tl-media-youtube tl-media-shadow", this._el.content);
    this._el.content_item.id = TL.Util.unique_ID(7)

    // URL Vars
    url_vars = TL.Util.getUrlVars(this.data.url);

    // Get Media ID
    this.media_id = {};

    if (this.data.url.match('v=')) {
      this.media_id.id	= url_vars["v"];
    } else if (this.data.url.match('\/embed\/')) {
      this.media_id.id	= this.data.url.split("embed\/")[1].split(/[?&]/)[0];
    } else if (this.data.url.match(/v\/|v=|youtu\.be\//)){
      this.media_id.id	= this.data.url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
    } else {
      trace("YOUTUBE IN URL BUT NOT A VALID VIDEO");
    }

    this.media_id.start		= TL.Util.parseYouTubeTime(url_vars["t"]);
    this.media_id.hd		= Boolean(typeof(url_vars["hd"]) != 'undefined');


    // API Call
    TL.Load.js('https://www.youtube.com/iframe_api', function() {
      self.createMedia();
    });

  },

  // Update Media Display
  _updateMediaDisplay: function() {
    //this.el.content_item = document.getElementById(this._el.content_item.id);
    this._el.content_item.style.height = TL.Util.ratio.r16_9({w:this.options.width}) + "px";
    this._el.content_item.style.width = this.options.width + "px";
  },

  _stopMedia: function() {
    if (this.youtube_loaded) {
      try {
          if(this.player.getPlayerState() == YT.PlayerState.PLAYING) {
              this.player.pauseVideo();
          }
      }
      catch(err) {
        trace(err);
      }

    }
  },
  createMedia: function() {
    var self = this;

    clearTimeout(this.timer);

    if(typeof YT != 'undefined' && typeof YT.Player != 'undefined') {
      // Create Player
      this.player = new YT.Player(this._el.content_item.id, {
        playerVars: {
          enablejsapi:		1,
          color: 				'white',
          autohide: 			1,
          showinfo:			0,
          theme:				'light',
          start:				this.media_id.start,
          fs: 				0,
          rel:				0
        },
        videoId: this.media_id.id,
        events: {
          onReady: 			function() {
            self.onPlayerReady();
            // After Loaded
            self.onLoaded();
          },
          'onStateChange': 	self.onStateChange
        }
      });
    } else {
      this.timer = setTimeout(function() {
        self.createMedia();
      }, 1000);
    }
  },

  /*	Events
  ================================================== */
  onPlayerReady: function(e) {
    this.youtube_loaded = true;
    this._el.content_item = document.getElementById(this._el.content_item.id);
    this.onMediaLoaded();

  },

  onStateChange: function(e) {
        if(e.data == YT.PlayerState.ENDED) {
            e.target.seekTo(0);
            e.target.pauseVideo();
        }
  }


});


/* **********************************************
     Begin TL.Slide.js
********************************************** */

/*	TL.Slide
  Creates a slide. Takes a data object and
  populates the slide with content.
================================================== */

TL.Slide = TL.Class.extend({

  includes: [TL.Events, TL.DomMixins, TL.I18NMixins],

  _el: {},

  /*	Constructor
  ================================================== */
  initialize: function(data, options, title_slide) {
    // DOM Elements
    this._el = {
      container: {},
      scroll_container: {},
      background: {},
      content_container: {},
      content: {}
    };

    // Components
    this._media 		= null;
    this._mediaclass	= {};
    this._text			= {};
    this._background_media = null;

    // State
    this._state = {
      loaded: 		false
    };

    this.has = {
      headline: 	false,
      text: 		false,
      media: 		false,
      title: 		false,
      background: {
        image: false,
        color: false,
        color_value :""
      }
    }

    this.has.title = title_slide;

    // Data
    this.data = {
      unique_id: 				null,
      background: 			null,
      start_date: 			null,
      end_date: 				null,
      location: 				null,
      text: 					null,
      media: 					null,
            autolink: true
    };

    // Options
    this.options = {
      // animation
      duration: 			1000,
      slide_padding_lr: 	40,
      ease: 				TL.Ease.easeInSpline,
      width: 				600,
      height: 			600,
      skinny_size: 		650,
      media_name: 		""
    };

    // Actively Displaying
    this.active = false;

    // Animation Object
    this.animator = {};

    // Merge Data and Options
    TL.Util.mergeData(this.options, options);
    TL.Util.mergeData(this.data, data);

    this._initLayout();
    this._initEvents();


  },

  /*	Adding, Hiding, Showing etc
  ================================================== */
  show: function() {
    this.animator = TL.Animate(this._el.slider_container, {
      left: 		-(this._el.container.offsetWidth * n) + "px",
      duration: 	this.options.duration,
      easing: 	this.options.ease
    });
  },

  hide: function() {

  },

  setActive: function(is_active) {
    this.active = is_active;

    if (this.active) {
      if (this.data.background) {
        this.fire("background_change", this.has.background);
      }
      this.loadMedia();
    } else {
      this.stopMedia();
    }
  },

  addTo: function(container) {
    container.appendChild(this._el.container);
    //this.onAdd();
  },

  removeFrom: function(container) {
    container.removeChild(this._el.container);
  },

  updateDisplay: function(w, h, l) {
    this._updateDisplay(w, h, l);
  },

  loadMedia: function() {
        var self = this;

    if (this._media && !this._state.loaded) {
      this._media.loadMedia();
      this._state.loaded = true;
    }

    if(this._background_media && !this._background_media._state.loaded) {
        this._background_media.on("loaded", function() {
            self._updateBackgroundDisplay();
        });
        this._background_media.loadMedia();
    }
  },

  stopMedia: function() {
    if (this._media && this._state.loaded) {
      this._media.stopMedia();
    }
  },

  getBackground: function() {
    return this.has.background;
  },

  scrollToTop: function() {
    this._el.container.scrollTop = 0;
  },

  getFormattedDate: function() {

    if (TL.Util.trim(this.data.display_date).length > 0) {
      return this.data.display_date;
    }
    var date_text = "";

    if(!this.has.title) {
            if (this.data.end_date) {
                date_text = " &mdash; " + this.data.end_date.getDisplayDate(this.getLanguage());
            }
            if (this.data.start_date) {
                date_text = this.data.start_date.getDisplayDate(this.getLanguage()) + date_text;
            }
        }
    return date_text;
  },

  /*	Events
  ================================================== */


  /*	Private Methods
  ================================================== */
  _initLayout: function () {
    // Create Layout
    this._el.container 				= TL.Dom.create("div", "tl-slide");

    if (this.has.title) {
      this._el.container.className = "tl-slide tl-slide-titleslide";
    }

    if (this.data.unique_id) {
      this._el.container.id 		= this.data.unique_id;
    }
    this._el.scroll_container 		= TL.Dom.create("div", "tl-slide-scrollable-container", this._el.container);
    this._el.content_container		= TL.Dom.create("div", "tl-slide-content-container", this._el.scroll_container);
    this._el.content				= TL.Dom.create("div", "tl-slide-content", this._el.content_container);
    this._el.background				= TL.Dom.create("div", "tl-slide-background", this._el.container);
    // Style Slide Background
    if (this.data.background) {
      if (this.data.background.url) {
          var media_type = TL.MediaType(this.data.background, true);
          if(media_type) {
                    this._background_media = new media_type.cls(this.data.background, {background: 1});

                    this.has.background.image 					= true;
                    this._el.container.className 				+= ' tl-full-image-background';
                    this.has.background.color_value 			= "#000";
                    this._el.background.style.display 			= "block";
                }
      }
      if (this.data.background.color) {
        this.has.background.color 					= true;
        this._el.container.className 				+= ' tl-full-color-background';
        this.has.background.color_value 			= this.data.background.color;
        //this._el.container.style.backgroundColor = this.data.background.color;
        //this._el.background.style.backgroundColor 	= this.data.background.color;
        //this._el.background.style.display 			= "block";
      }
      if (this.data.background.text_background) {
        this._el.container.className 				+= ' tl-text-background';
      }

    }



    // Determine Assets for layout and loading
    if (this.data.media && this.data.media.url && this.data.media.url != "") {
      this.has.media = true;
    }
    if (this.data.text && this.data.text.text) {
      this.has.text = true;
    }
    if (this.data.text && this.data.text.headline) {
      this.has.headline = true;
    }

    // Create Media
    if (this.has.media) {

      // Determine the media type
      this.data.media.mediatype 	= TL.MediaType(this.data.media);
      this.options.media_name 	= this.data.media.mediatype.name;
      this.options.media_type 	= this.data.media.mediatype.type;
            this.options.autolink = this.data.autolink;

      // Create a media object using the matched class name
      this._media = new this.data.media.mediatype.cls(this.data.media, this.options);

    }

    // Create Text
    if (this.has.text || this.has.headline) {
      this._text = new TL.Media.Text(this.data.text, {title:this.has.title,language: this.options.language, autolink: this.data.autolink });
      this._text.addDateText(this.getFormattedDate());
    }



    // Add to DOM
    if (!this.has.text && !this.has.headline && this.has.media) {
      TL.DomUtil.addClass(this._el.container, 'tl-slide-media-only');
      this._media.addTo(this._el.content);
    } else if (this.has.headline && this.has.media && !this.has.text) {
      TL.DomUtil.addClass(this._el.container, 'tl-slide-media-only');
      this._text.addTo(this._el.content);
      this._media.addTo(this._el.content);
    } else if (this.has.text && this.has.media) {
      this._media.addTo(this._el.content);
      this._text.addTo(this._el.content);
    } else if (this.has.text || this.has.headline) {
      TL.DomUtil.addClass(this._el.container, 'tl-slide-text-only');
      this._text.addTo(this._el.content);
    }

    // Fire event that the slide is loaded
    this.onLoaded();

  },

  _initEvents: function() {

  },

  // Update Display
  _updateDisplay: function(width, height, layout) {
    var content_width,
      content_padding_left = this.options.slide_padding_lr,
      content_padding_right = this.options.slide_padding_lr;

    if (width) {
      this.options.width 					= width;
    } else {
      this.options.width 					= this._el.container.offsetWidth;
    }

    content_width = this.options.width - (this.options.slide_padding_lr * 2);

    if(TL.Browser.mobile && (this.options.width <= this.options.skinny_size)) {
      content_padding_left = 0;
      content_padding_right = 0;
      content_width = this.options.width;
    } else if (layout == "landscape") {

    } else if (this.options.width <= this.options.skinny_size) {
      content_padding_left = 50;
      content_padding_right = 50;
      content_width = this.options.width - content_padding_left - content_padding_right;
    } else {

    }

    this._el.content.style.paddingLeft 	= content_padding_left + "px";
    this._el.content.style.paddingRight = content_padding_right + "px";
    this._el.content.style.width		= content_width + "px";

    if (height) {
      this.options.height = height;
      //this._el.scroll_container.style.height		= this.options.height + "px";

    } else {
      this.options.height = this._el.container.offsetHeight;
    }

    if (this._media) {

      if (!this.has.text && this.has.headline) {
        this._media.updateDisplay(content_width, (this.options.height - this._text.headlineHeight()), layout);
      } else if (!this.has.text && !this.has.headline) {
        this._media.updateDisplay(content_width, this.options.height, layout);
      } else if (this.options.width <= this.options.skinny_size) {
        this._media.updateDisplay(content_width, this.options.height, layout);
      } else {
        this._media.updateDisplay(content_width/2, this.options.height, layout);
      }
    }

    this._updateBackgroundDisplay();
  },

  _updateBackgroundDisplay: function() {
      if(this._background_media && this._background_media._state.loaded) {
          this._el.background.style.backgroundImage 	= "url('" + this._background_media.getImageURL(this.options.width, this.options.height) + "')";
      }
  }

});


/* **********************************************
     Begin TL.SlideNav.js
********************************************** */

/*	TL.SlideNav
  encapsulate DOM display/events for the
  'next' and 'previous' buttons on a slide.
================================================== */
// TODO null out data

TL.SlideNav = TL.Class.extend({

  includes: [TL.Events, TL.DomMixins],

  _el: {},

  /*	Constructor
  ================================================== */
  initialize: function(data, options, add_to_container) {
    // DOM ELEMENTS
    this._el = {
      container: {},
      content_container: {},
      icon: {},
      title: {},
      description: {}
    };

    // Media Type
    this.mediatype = {};

    // Data
    this.data = {
      title: "Navigation",
      description: "Description",
      date: "Date"
    };

    //Options
    this.options = {
      direction: 			"previous"
    };

    this.animator = null;

    // Merge Data and Options
    TL.Util.mergeData(this.options, options);
    TL.Util.mergeData(this.data, data);


    this._el.container = TL.Dom.create("div", "tl-slidenav-" + this.options.direction);

    if (TL.Browser.mobile) {
      this._el.container.setAttribute("ontouchstart"," ");
    }

    this._initLayout();
    this._initEvents();

    if (add_to_container) {
      add_to_container.appendChild(this._el.container);
    };

  },

  /*	Update Content
  ================================================== */
  update: function(slide) {
    var d = {
      title: "",
      description: "",
      date: slide.getFormattedDate()
    };

    if (slide.data.text) {
      if (slide.data.text.headline) {
        d.title = slide.data.text.headline;
      }
    }

    this._update(d);
  },

  /*	Color
  ================================================== */
  setColor: function(inverted) {
    if (inverted) {
      this._el.content_container.className = 'tl-slidenav-content-container tl-slidenav-inverted';
    } else {
      this._el.content_container.className = 'tl-slidenav-content-container';
    }
  },

  /*	Events
  ================================================== */
  _onMouseClick: function() {
    this.fire("clicked", this.options);
  },

  /*	Private Methods
  ================================================== */
  _update: function(d) {
    // update data
    this.data = TL.Util.mergeData(this.data, d);

    // Title
    this._el.title.innerHTML = TL.Util.unlinkify(this.data.title);

    // Date
    this._el.description.innerHTML	= TL.Util.unlinkify(this.data.date);
  },

  _initLayout: function () {

    // Create Layout
    this._el.content_container			= TL.Dom.create("div", "tl-slidenav-content-container", this._el.container);
    this._el.icon						= TL.Dom.create("div", "tl-slidenav-icon", this._el.content_container);
    this._el.title						= TL.Dom.create("div", "tl-slidenav-title", this._el.content_container);
    this._el.description				= TL.Dom.create("div", "tl-slidenav-description", this._el.content_container);

    this._el.icon.innerHTML				= "&nbsp;"

    this._update();
  },

  _initEvents: function () {
    TL.DomEvent.addListener(this._el.container, 'click', this._onMouseClick, this);
  }


});

/* **********************************************
     Begin TL.StorySlider.js
********************************************** */

/*	StorySlider
  is the central class of the API - it is used to create a StorySlider

  Events:
  nav_next
  nav_previous
  slideDisplayUpdate
  loaded
  slideAdded
  slideLoaded
  slideRemoved


================================================== */

TL.StorySlider = TL.Class.extend({

  includes: [TL.Events, TL.I18NMixins],

  /*	Private Methods
  ================================================== */
  initialize: function (elem, data, options, init) {

    // DOM ELEMENTS
    this._el = {
      container: {},
      background: {},
      slider_container_mask: {},
      slider_container: {},
      slider_item_container: {}
    };

    this._nav = {};
    this._nav.previous = {};
    this._nav.next = {};

    // Slide Spacing
    this.slide_spacing = 0;

    // Slides Array
    this._slides = [];

    // Swipe Object
    this._swipable;

    // Preload Timer
    this.preloadTimer;

    // Message
    this._message;

    // Current Slide
    this.current_id = '';

    // Data Object
    this.data = {};

    this.options = {
      id: 					"",
      layout: 				"portrait",
      width: 					600,
      height: 				600,
      default_bg_color: 		{r:255, g:255, b:255},
      slide_padding_lr: 		40, 			// padding on slide of slide
      start_at_slide: 		1,
      slide_default_fade: 	"0%", 			// landscape fade
      // animation
      duration: 				1000,
      ease: 					TL.Ease.easeInOutQuint,
      // interaction
      dragging: 				true,
      trackResize: 			true
    };

    // Main element ID
    if (typeof elem === 'object') {
      this._el.container = elem;
      this.options.id = TL.Util.unique_ID(6, "tl");
    } else {
      this.options.id = elem;
      this._el.container = TL.Dom.get(elem);
    }

    if (!this._el.container.id) {
      this._el.container.id = this.options.id;
    }

    // Animation Object
    this.animator = null;

    // Merge Data and Options
    TL.Util.mergeData(this.options, options);
    TL.Util.mergeData(this.data, data);

    if (init) {
      this.init();
    }
  },

  init: function() {
    this._initLayout();
    this._initEvents();
    this._initData();
    this._updateDisplay();

    // Go to initial slide
    this.goTo(this.options.start_at_slide);

    this._onLoaded();
  },

  /* Slides
  ================================================== */
  _addSlide:function(slide) {
    slide.addTo(this._el.slider_item_container);
    slide.on('added', this._onSlideAdded, this);
    slide.on('background_change', this._onBackgroundChange, this);
  },

  _createSlide: function(d, title_slide, n) {
    var slide = new TL.Slide(d, this.options, title_slide);
    this._addSlide(slide);
    if(n < 0) {
        this._slides.push(slide);
    } else {
        this._slides.splice(n, 0, slide);
    }
  },

  _createSlides: function(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].unique_id == "") {
        array[i].unique_id = TL.Util.unique_ID(6, "tl-slide");
      }
            this._createSlide(array[i], false, -1);
    }
  },

  _removeSlide: function(slide) {
    slide.removeFrom(this._el.slider_item_container);
    slide.off('added', this._onSlideRemoved, this);
    slide.off('background_change', this._onBackgroundChange);
  },

  _destroySlide: function(n) {
    this._removeSlide(this._slides[n]);
    this._slides.splice(n, 1);
  },

    _findSlideIndex: function(n) {
        var _n = n;
    if (typeof n == 'string' || n instanceof String) {
      _n = TL.Util.findArrayNumberByUniqueID(n, this._slides, "unique_id");
    }
    return _n;
    },

  /*	Public
  ================================================== */
  updateDisplay: function(w, h, a, l) {
    this._updateDisplay(w, h, a, l);
  },

  // Create a slide
  createSlide: function(d, n) {
    this._createSlide(d, false, n);
  },

  // Create Many Slides from an array
  createSlides: function(array) {
    this._createSlides(array);
  },

  // Destroy slide by index
  destroySlide: function(n) {
      this._destroySlide(n);
  },

  // Destroy slide by id
  destroySlideId: function(id) {
      this.destroySlide(this._findSlideIndex(id));
  },

  /*	Navigation
  ================================================== */
  goTo: function(n, fast, displayupdate) {
    n = parseInt(n);
    if (isNaN(n)) n = 0;

    var self = this;

    this.changeBackground({color_value:"", image:false});

    // Clear Preloader Timer
    if (this.preloadTimer) {
      clearTimeout(this.preloadTimer);
    }

    // Set Slide Active State
    for (var i = 0; i < this._slides.length; i++) {
      this._slides[i].setActive(false);
    }

    if (n < this._slides.length && n >= 0) {
      this.current_id = this._slides[n].data.unique_id;

      // Stop animation
      if (this.animator) {
        this.animator.stop();
      }
      if (this._swipable) {
        this._swipable.stopMomentum();
      }

      if (fast) {
        this._el.slider_container.style.left = -(this.slide_spacing * n) + "px";
        this._onSlideChange(displayupdate);
      } else {
        this.animator = TL.Animate(this._el.slider_container, {
          left: 		-(this.slide_spacing * n) + "px",
          duration: 	this.options.duration,
          easing: 	this.options.ease,
          complete: 	this._onSlideChange(displayupdate)
        });
      }

      // Set Slide Active State
      this._slides[n].setActive(true);

      // Update Navigation and Info
      if (this._slides[n + 1]) {
        this.showNav(this._nav.next, true);
        this._nav.next.update(this._slides[n + 1]);
      } else {
        this.showNav(this._nav.next, false);
      }
      if (this._slides[n - 1]) {
        this.showNav(this._nav.previous, true);
        this._nav.previous.update(this._slides[n - 1]);
      } else {
        this.showNav(this._nav.previous, false);
      }

      // Preload Slides
      this.preloadTimer = setTimeout(function() {
        self.preloadSlides(n);
      }, this.options.duration);
    }
  },

  goToId: function(id, fast, displayupdate) {
    this.goTo(this._findSlideIndex(id), fast, displayupdate);
  },

  preloadSlides: function(n) {
    if (this._slides[n + 1]) {
      this._slides[n + 1].loadMedia();
      this._slides[n + 1].scrollToTop();
    }
    if (this._slides[n + 2]) {
      this._slides[n + 2].loadMedia();
      this._slides[n + 2].scrollToTop();
    }
    if (this._slides[n - 1]) {
      this._slides[n - 1].loadMedia();
      this._slides[n - 1].scrollToTop();
    }
    if (this._slides[n - 2]) {
      this._slides[n - 2].loadMedia();
      this._slides[n - 2].scrollToTop();
    }
  },

  next: function() {
      var n = this._findSlideIndex(this.current_id);
    if ((n + 1) < (this._slides.length)) {
      this.goTo(n + 1);
    } else {
      this.goTo(n);
    }
  },

  previous: function() {
      var n = this._findSlideIndex(this.current_id);
    if (n - 1 >= 0) {
      this.goTo(n - 1);
    } else {
      this.goTo(n);
    }
  },

  showNav: function(nav_obj, show) {

    if (this.options.width <= 500 && TL.Browser.mobile) {

    } else {
      if (show) {
        nav_obj.show();
      } else {
        nav_obj.hide();
      }

    }
  },



  changeBackground: function(bg) {
    var bg_color = {r:256, g:256, b:256},
      bg_color_rgb;

    if (bg.color_value && bg.color_value != "") {
      bg_color = TL.Util.hexToRgb(bg.color_value);
      if (!bg_color) {
        trace("Invalid color value " + bg.color_value);
        bg_color = this.options.default_bg_color;
      }
    } else {
      bg_color = this.options.default_bg_color;
      bg.color_value = "rgb(" + bg_color.r + " , " + bg_color.g + ", " + bg_color.b + ")";
    }

    bg_color_rgb 	= bg_color.r + "," + bg_color.g + "," + bg_color.b;
    this._el.background.style.backgroundImage = "none";


    if (bg.color_value) {
      this._el.background.style.backgroundColor = bg.color_value;
    } else {
      this._el.background.style.backgroundColor = "transparent";
    }

    if (bg_color.r < 255 || bg_color.g < 255 || bg_color.b < 255 || bg.image) {
      this._nav.next.setColor(true);
      this._nav.previous.setColor(true);
    } else {
      this._nav.next.setColor(false);
      this._nav.previous.setColor(false);
    }
  },
  /*	Private Methods
  ================================================== */

  // Update Display
  _updateDisplay: function(width, height, animate, layout) {
    var nav_pos, _layout;

    if(typeof layout === 'undefined'){
      _layout = this.options.layout;
    } else {
      _layout = layout;
    }

    this.options.layout = _layout;

    this.slide_spacing = this.options.width*2;

    if (width) {
      this.options.width = width;
    } else {
      this.options.width = this._el.container.offsetWidth;
    }

    if (height) {
      this.options.height = height;
    } else {
      this.options.height = this._el.container.offsetHeight;
    }

    //this._el.container.style.height = this.options.height;

    // position navigation
    nav_pos = (this.options.height/2);
    this._nav.next.setPosition({top:nav_pos});
    this._nav.previous.setPosition({top:nav_pos});


    // Position slides
    for (var i = 0; i < this._slides.length; i++) {
      this._slides[i].updateDisplay(this.options.width, this.options.height, _layout);
      this._slides[i].setPosition({left:(this.slide_spacing * i), top:0});

    };

    // Go to the current slide
    this.goToId(this.current_id, true, true);
  },

  // Reposition and redraw slides
    _updateDrawSlides: function() {
      var _layout = this.options.layout;

    for (var i = 0; i < this._slides.length; i++) {
      this._slides[i].updateDisplay(this.options.width, this.options.height, _layout);
      this._slides[i].setPosition({left:(this.slide_spacing * i), top:0});
    };

    this.goToId(this.current_id, true, false);
  },


  /*	Init
  ================================================== */
  _initLayout: function () {

    TL.DomUtil.addClass(this._el.container, 'tl-storyslider');

    // Create Layout
    this._el.slider_container_mask		= TL.Dom.create('div', 'tl-slider-container-mask', this._el.container);
    this._el.background 				= TL.Dom.create('div', 'tl-slider-background tl-animate', this._el.container);
    this._el.slider_container			= TL.Dom.create('div', 'tl-slider-container tlanimate', this._el.slider_container_mask);
    this._el.slider_item_container		= TL.Dom.create('div', 'tl-slider-item-container', this._el.slider_container);


    // Update Size
    this.options.width = this._el.container.offsetWidth;
    this.options.height = this._el.container.offsetHeight;

    // Create Navigation
    this._nav.previous = new TL.SlideNav({title: "Previous", description: "description"}, {direction:"previous"});
    this._nav.next = new TL.SlideNav({title: "Next",description: "description"}, {direction:"next"});

    // add the navigation to the dom
    this._nav.next.addTo(this._el.container);
    this._nav.previous.addTo(this._el.container);



    this._el.slider_container.style.left="0px";

    if (TL.Browser.touch) {
      //this._el.slider_touch_mask = TL.Dom.create('div', 'tl-slider-touch-mask', this._el.slider_container_mask);
      this._swipable = new TL.Swipable(this._el.slider_container_mask, this._el.slider_container, {
        enable: {x:true, y:false},
        snap: 	true
      });
      this._swipable.enable();

      // Message
      this._message = new TL.Message({}, {
        message_class: 		"tl-message-full",
        message_icon_class: "tl-icon-swipe-left"
      });
      this._message.updateMessage(this._("swipe_to_navigate"));
      this._message.addTo(this._el.container);
    }

  },

  _initEvents: function () {
    this._nav.next.on('clicked', this._onNavigation, this);
    this._nav.previous.on('clicked', this._onNavigation, this);

    if (this._message) {
      this._message.on('clicked', this._onMessageClick, this);
    }

    if (this._swipable) {
      this._swipable.on('swipe_left', this._onNavigation, this);
      this._swipable.on('swipe_right', this._onNavigation, this);
      this._swipable.on('swipe_nodirection', this._onSwipeNoDirection, this);
    }


  },

  _initData: function() {
      if(this.data.title) {
          this._createSlide(this.data.title, true, -1);
      }
        this._createSlides(this.data.events);
  },

  /*	Events
  ================================================== */
  _onBackgroundChange: function(e) {
      var n = this._findSlideIndex(this.current_id);
    var slide_background = this._slides[n].getBackground();
    this.changeBackground(e);
    this.fire("colorchange", slide_background);
  },

  _onMessageClick: function(e) {
    this._message.hide();
  },

  _onSwipeNoDirection: function(e) {
    this.goToId(this.current_id);
  },

  _onNavigation: function(e) {

    if (e.direction == "next" || e.direction == "left") {
      this.next();
    } else if (e.direction == "previous" || e.direction == "right") {
      this.previous();
    }
    this.fire("nav_" + e.direction, this.data);
  },

  _onSlideAdded: function(e) {
    trace("slideadded")
    this.fire("slideAdded", this.data);
  },

  _onSlideRemoved: function(e) {
    this.fire("slideRemoved", this.data);
  },

  _onSlideChange: function(displayupdate) {
    if (!displayupdate) {
      this.fire("change", {unique_id: this.current_id});
    }
  },

  _onMouseClick: function(e) {

  },

  _fireMouseEvent: function (e) {
    if (!this._loaded) {
      return;
    }

    var type = e.type;
    type = (type === 'mouseenter' ? 'mouseover' : (type === 'mouseleave' ? 'mouseout' : type));

    if (!this.hasEventListeners(type)) {
      return;
    }

    if (type === 'contextmenu') {
      TL.DomEvent.preventDefault(e);
    }

    this.fire(type, {
      latlng: "something", //this.mouseEventToLatLng(e),
      layerPoint: "something else" //this.mouseEventToLayerPoint(e)
    });
  },

  _onLoaded: function() {
    this.fire("loaded", this.data);
  }


});


/* **********************************************
     Begin TL.TimeNav.js
********************************************** */

/*	TL.TimeNav

================================================== */

TL.TimeNav = TL.Class.extend({

  includes: [TL.Events, TL.DomMixins],

  _el: {},

  /*	Constructor
  ================================================== */
  initialize: function (elem, timeline_config, options, init) {
    // DOM ELEMENTS
    this._el = {
      parent: {},
      container: {},
      slider: {},
      slider_background: {},
      line: {},
      marker_container_mask: {},
      marker_container: {},
      marker_item_container: {},
      timeaxis: {},
      timeaxis_background: {},
      attribution: {}
    };

    this.collapsed = false;

    if (typeof elem === 'object') {
      this._el.container = elem;
    } else {
      this._el.container = TL.Dom.get(elem);
    }

    this.config = timeline_config;

    //Options
    this.options = {
      width: 					600,
      height: 				600,
      duration: 				1000,
      ease: 					TL.Ease.easeInOutQuint,
      has_groups: 			false,
      optimal_tick_width: 	50,
      scale_factor: 			2, 				// How many screen widths wide should the timeline be
      marker_padding: 		5,
      timenav_height_min: 	150, 			// Minimum timenav height
      marker_height_min: 		30, 			// Minimum Marker Height
      marker_width_min: 		100, 			// Minimum Marker Width
      zoom_sequence:          [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89] // Array of Fibonacci numbers for TimeNav zoom levels http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/fibtable.html
    };

    // Animation
    this.animator = null;

    // Ready state
    this.ready = false;

    // Markers Array
    this._markers = [];

    // Eras Array
    this._eras = [];
    this.has_eras = false;

    // Groups Array
    this._groups = [];

    // Row Height
    this._calculated_row_height = 100;

    // Current Marker
    this.current_id = "";

    // TimeScale
    this.timescale = {};

    // TimeAxis
    this.timeaxis = {};
    this.axishelper = {};

    // Max Rows
    this.max_rows = 6;

    // Animate CSS
    this.animate_css = false;

    // Swipe Object
    this._swipable;

    // Merge Data and Options
    TL.Util.mergeData(this.options, options);

    if (init) {
      this.init();
    }
  },

  init: function() {
    this._initLayout();
    this._initEvents();
    this._initData();
    this._updateDisplay();

    this._onLoaded();
  },

  /*	Public
  ================================================== */
  positionMarkers: function() {
    this._positionMarkers();
  },

  /*	Update Display
  ================================================== */
  updateDisplay: function(w, h, a, l) {
    this._updateDisplay(w, h, a, l);
  },


  /*	TimeScale
  ================================================== */
  _getTimeScale: function() {
    /* maybe the establishing config values (marker_height_min and max_rows) should be
    separated from making a TimeScale object, which happens in another spot in this file with duplicate mapping of properties of this TimeNav into the TimeScale options object? */
    // Set Max Rows
    var marker_height_min = 0;
    try {
      marker_height_min = parseInt(this.options.marker_height_min);
    } catch(e) {
      trace("Invalid value for marker_height_min option.");
      marker_height_min = 30;
    }
    if (marker_height_min == 0) {
      trace("marker_height_min option must not be zero.")
      marker_height_min = 30;
    }
    this.max_rows = Math.round((this.options.height - this._el.timeaxis_background.offsetHeight - (this.options.marker_padding)) / marker_height_min);
    if (this.max_rows < 1) {
      this.max_rows = 1;
    }
    return new TL.TimeScale(this.config, {
            display_width: this._el.container.offsetWidth,
            screen_multiplier: this.options.scale_factor,
            max_rows: this.max_rows

    });
  },

  _updateTimeScale: function(new_scale) {
    this.options.scale_factor = new_scale;
    this._updateDrawTimeline();
  },

  zoomIn: function() { // move the the next "higher" scale factor
    var new_scale = TL.Util.findNextGreater(this.options.zoom_sequence, this.options.scale_factor);
    this.setZoomFactor(new_scale);
  },

  zoomOut: function() { // move the the next "lower" scale factor
    var new_scale = TL.Util.findNextLesser(this.options.zoom_sequence, this.options.scale_factor);
    this.setZoomFactor(new_scale);
  },

  setZoom: function(level) {
    var zoom_factor = this.options.zoom_sequence[level];
    if (typeof(zoom_factor) == 'number') {
      this.setZoomFactor(zoom_factor);
    } else {
      console.warn("Invalid zoom level. Please use an index number between 0 and " + (this.options.zoom_sequence.length - 1));
    }
  },

  setZoomFactor: function(factor) {
    if (factor <= this.options.zoom_sequence[0]) {
      this.fire("zoomtoggle", {zoom:"out", show:false});
    } else {
      this.fire("zoomtoggle", {zoom:"out", show:true});
    }

    if (factor >= this.options.zoom_sequence[this.options.zoom_sequence.length-1]) {
      this.fire("zoomtoggle", {zoom:"in", show:false});
    } else {
      this.fire("zoomtoggle", {zoom:"in", show:true});
    }

    if (factor == 0) {
      console.warn("Zoom factor must be greater than zero. Using 0.1");
      factor = 0.1;
    }
    this.options.scale_factor = factor;
    //this._updateDrawTimeline(true);
    this.goToId(this.current_id, !this._updateDrawTimeline(true), true);
  },

  /*	Groups
  ================================================== */
  _createGroups: function() {
    var group_labels = this.timescale.getGroupLabels();

    if (group_labels) {
      this.options.has_groups = true;
      for (var i = 0; i < group_labels.length; i++) {
        this._createGroup(group_labels[i]);
      }
    }

  },

  _createGroup: function(group_label) {
    var group = new TL.TimeGroup(group_label);
    this._addGroup(group);
    this._groups.push(group);
  },

  _addGroup:function(group) {
    group.addTo(this._el.container);

  },

  _positionGroups: function() {
    if (this.options.has_groups) {
      var available_height 	= (this.options.height - this._el.timeaxis_background.offsetHeight ),
        group_height 		= Math.floor((available_height /this.timescale.getNumberOfRows()) - this.options.marker_padding),
        group_labels		= this.timescale.getGroupLabels();

      for (var i = 0, group_rows = 0; i < this._groups.length; i++) {
        var group_y = Math.floor(group_rows * (group_height + this.options.marker_padding));
        var group_hide = false;
        if (group_y > (available_height- this.options.marker_padding)) {
          group_hide = true;
        }

        this._groups[i].setRowPosition(group_y, this._calculated_row_height + this.options.marker_padding/2);
        this._groups[i].setAlternateRowColor(TL.Util.isEven(i), group_hide);

        group_rows += this._groups[i].data.rows;    // account for groups spanning multiple rows
      }
    }
  },

  /*	Markers
  ================================================== */
  _addMarker:function(marker) {
    marker.addTo(this._el.marker_item_container);
    marker.on('markerclick', this._onMarkerClick, this);
    marker.on('added', this._onMarkerAdded, this);
  },

  _createMarker: function(data, n) {
    var marker = new TL.TimeMarker(data, this.options);
    this._addMarker(marker);
    if(n < 0) {
        this._markers.push(marker);
    } else {
        this._markers.splice(n, 0, marker);
    }
  },

  _createMarkers: function(array) {
    for (var i = 0; i < array.length; i++) {
      this._createMarker(array[i], -1);
    }
  },

  _removeMarker: function(marker) {
    marker.removeFrom(this._el.marker_item_container);
    //marker.off('added', this._onMarkerRemoved, this);
  },

  _destroyMarker: function(n) {
      this._removeMarker(this._markers[n]);
      this._markers.splice(n, 1);
  },

  _positionMarkers: function(fast) {
    // POSITION X
    for (var i = 0; i < this._markers.length; i++) {
      var pos = this.timescale.getPositionInfo(i);
      if (fast) {
        this._markers[i].setClass("tl-timemarker tl-timemarker-fast");
      } else {
        this._markers[i].setClass("tl-timemarker");
      }
      this._markers[i].setPosition({left:pos.start});
      this._markers[i].setWidth(pos.width);
    };

  },

  _calculateMarkerHeight: function(h) {
    return ((h /this.timescale.getNumberOfRows()) - this.options.marker_padding);
  },

  _calculateRowHeight: function(h) {
    return (h /this.timescale.getNumberOfRows());
  },

  _calculateAvailableHeight: function() {
    return (this.options.height - this._el.timeaxis_background.offsetHeight - (this.options.marker_padding));
  },

  _calculateMinimumTimeNavHeight: function() {
    return (this.timescale.getNumberOfRows() * this.options.marker_height_min) + this._el.timeaxis_background.offsetHeight + (this.options.marker_padding);

  },

  getMinimumHeight: function() {
    return this._calculateMinimumTimeNavHeight();
  },

  _assignRowsToMarkers: function() {
    var available_height 	= this._calculateAvailableHeight(),
      marker_height 		= this._calculateMarkerHeight(available_height);


    this._positionGroups();

    this._calculated_row_height = this._calculateRowHeight(available_height);

    for (var i = 0; i < this._markers.length; i++) {

      // Set Height
      this._markers[i].setHeight(marker_height);

      //Position by Row
      var row = this.timescale.getPositionInfo(i).row;

      var marker_y = Math.floor(row * (marker_height + this.options.marker_padding)) + this.options.marker_padding;

      var remainder_height = available_height - marker_y + this.options.marker_padding;
      this._markers[i].setRowPosition(marker_y, remainder_height);
    };

  },

  _resetMarkersActive: function() {
    for (var i = 0; i < this._markers.length; i++) {
      this._markers[i].setActive(false);
    };
  },

  _findMarkerIndex: function(n) {
      var _n = -1;
    if (typeof n == 'string' || n instanceof String) {
      _n = TL.Util.findArrayNumberByUniqueID(n, this._markers, "unique_id", _n);
    }
    return _n;
  },

  /*	ERAS
  ================================================== */
  _createEras: function(array) {
    for (var i = 0; i < array.length; i++) {
      this._createEra(array[i], -1);
    }
  },

  _createEra: function(data, n) {
    var era = new TL.TimeEra(data, this.options);
    this._addEra(era);
    if(n < 0) {
        this._eras.push(era);
    } else {
        this._eras.splice(n, 0, era);
    }
  },

  _addEra:function(era) {
    era.addTo(this._el.marker_item_container);
    era.on('added', this._onEraAdded, this);
  },

  _removeEra: function(era) {
    era.removeFrom(this._el.marker_item_container);
    //marker.off('added', this._onMarkerRemoved, this);
  },

  _destroyEra: function(n) {
      this._removeEra(this._eras[n]);
      this._eras.splice(n, 1);
  },

  _positionEras: function(fast) {

    var era_color = 0;
    // POSITION X
    for (var i = 0; i < this._eras.length; i++) {
      var pos = {
        start:0,
        end:0,
        width:0
      };

      pos.start = this.timescale.getPosition(this._eras[i].data.start_date.getTime());
      pos.end = this.timescale.getPosition(this._eras[i].data.end_date.getTime());
      pos.width = pos.end - pos.start;

      if (fast) {
        this._eras[i].setClass("tl-timeera tl-timeera-fast");
      } else {
        this._eras[i].setClass("tl-timeera");
      }
      this._eras[i].setPosition({left:pos.start});
      this._eras[i].setWidth(pos.width);

      era_color++;
      if (era_color > 5) {
        era_color = 0;
      }
      this._eras[i].setColor(era_color);
    };

  },

  /*	Public
  ================================================== */

  // Create a marker
  createMarker: function(d, n) {
      this._createMarker(d, n);
  },

  // Create many markers from an array
  createMarkers: function(array) {
      this._createMarkers(array);
  },

  // Destroy marker by index
  destroyMarker: function(n) {
      this._destroyMarker(n);
  },

  // Destroy marker by id
  destroyMarkerId: function(id) {
      this.destroyMarker(this._findMarkerIndex(id));
  },

  /*	Navigation
  ================================================== */
  goTo: function(n, fast, css_animation) {
    var self = 	this,
      _ease = this.options.ease,
      _duration = this.options.duration,
      _n = (n < 0) ? 0 : n;

    // Set Marker active state
    this._resetMarkersActive();
    if(n >= 0 && n < this._markers.length) {
        this._markers[n].setActive(true);
    }
    // Stop animation
    if (this.animator) {
      this.animator.stop();
    }

    if (fast) {
      this._el.slider.className = "tl-timenav-slider";
      this._el.slider.style.left = -this._markers[_n].getLeft() + (this.options.width/2) + "px";
    } else {
      if (css_animation) {
        this._el.slider.className = "tl-timenav-slider tl-timenav-slider-animate";
        this.animate_css = true;
        this._el.slider.style.left = -this._markers[_n].getLeft() + (this.options.width/2) + "px";
      } else {
        this._el.slider.className = "tl-timenav-slider";
        this.animator = TL.Animate(this._el.slider, {
          left: 		-this._markers[_n].getLeft() + (this.options.width/2) + "px",
          duration: 	_duration,
          easing: 	_ease
        });
      }
    }

    if(n >= 0 && n < this._markers.length) {
        this.current_id = this._markers[n].data.unique_id;
    } else {
        this.current_id = '';
    }
  },

  goToId: function(id, fast, css_animation) {
    this.goTo(this._findMarkerIndex(id), fast, css_animation);
  },

  /*	Events
  ================================================== */
  _onLoaded: function() {
    this.ready = true;
    this.fire("loaded", this.config);
  },

  _onMarkerAdded: function(e) {
    this.fire("dateAdded", this.config);
  },

  _onEraAdded: function(e) {
    this.fire("eraAdded", this.config);
  },

  _onMarkerRemoved: function(e) {
    this.fire("dateRemoved", this.config);
  },

  _onMarkerClick: function(e) {
    // Go to the clicked marker
    this.goToId(e.unique_id);
    this.fire("change", {unique_id: e.unique_id});
  },

  _onMouseScroll: function(e) {

    var delta		= 0,
      scroll_to	= 0,
      constraint 	= {
        right: 	-(this.timescale.getPixelWidth() - (this.options.width/2)),
        left: 	this.options.width/2
      };
    if (!e) {
      e = window.event;
    }
    if (e.originalEvent) {
      e = e.originalEvent;
    }

    // Webkit and browsers able to differntiate between up/down and left/right scrolling
    if (typeof e.wheelDeltaX != 'undefined' ) {
      delta = e.wheelDeltaY/6;
      if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) {
        delta = e.wheelDeltaX/6;
      } else {
        //delta = e.wheelDeltaY/6;
        delta = 0;
      }
    }
    if (delta) {
      if (e.preventDefault) {
         e.preventDefault();
      }
      e.returnValue = false;
    }
    // Stop from scrolling too far
    scroll_to = parseInt(this._el.slider.style.left.replace("px", "")) + delta;


    if (scroll_to > constraint.left) {
      scroll_to = constraint.left;
    } else if (scroll_to < constraint.right) {
      scroll_to = constraint.right;
    }

    if (this.animate_css) {
      this._el.slider.className = "tl-timenav-slider";
      this.animate_css = false;
    }

    this._el.slider.style.left = scroll_to + "px";

  },

  _onDragMove: function(e) {
    if (this.animate_css) {
      this._el.slider.className = "tl-timenav-slider";
      this.animate_css = false;
    }

  },

  /*	Private Methods
  ================================================== */
  // Update Display
  _updateDisplay: function(width, height, animate) {

    if (width) {
      this.options.width = width;
    }
    if (height && height != this.options.height) {
      this.options.height = height;
      this.timescale = this._getTimeScale();
    }

    // Size Markers
    this._assignRowsToMarkers();

    // Size swipable area
    this._el.slider_background.style.width = this.timescale.getPixelWidth() + this.options.width + "px";
    this._el.slider_background.style.left = -(this.options.width/2) + "px";
    this._el.slider.style.width = this.timescale.getPixelWidth() + this.options.width + "px";

    // Update Swipable constraint
    this._swipable.updateConstraint({top: false,bottom: false,left: (this.options.width/2),right: -(this.timescale.getPixelWidth() - (this.options.width/2))});

    // Go to the current slide
    this.goToId(this.current_id, true);
  },

  _drawTimeline: function(fast) {
    this.timescale = this._getTimeScale();
    this.timeaxis.drawTicks(this.timescale, this.options.optimal_tick_width);
    this._positionMarkers(fast);
    this._assignRowsToMarkers();
    this._createGroups();
    this._positionGroups();

    if (this.has_eras) {

      this._positionEras(fast);
    }
  },

  _updateDrawTimeline: function(check_update) {
    var do_update = false;

    // Check to see if redraw is needed
    if (check_update) {
      /* keep this aligned with _getTimeScale or reduce code duplication */
      var temp_timescale = new TL.TimeScale(this.config, {
              display_width: this._el.container.offsetWidth,
              screen_multiplier: this.options.scale_factor,
              max_rows: this.max_rows

      });

      if (this.timescale.getMajorScale() == temp_timescale.getMajorScale()
       && this.timescale.getMinorScale() == temp_timescale.getMinorScale()) {
        do_update = true;
      }
    } else {
      do_update = true;
    }

    // Perform update or redraw
    if (do_update) {
      this.timescale = this._getTimeScale();
      this.timeaxis.positionTicks(this.timescale, this.options.optimal_tick_width);
      this._positionMarkers();
      this._assignRowsToMarkers();
      this._positionGroups();
      if (this.has_eras) {
        this._positionEras();
      }
      this._updateDisplay();
    } else {
      this._drawTimeline(true);
    }

    return do_update;

  },


  /*	Init
  ================================================== */
  _initLayout: function () {
    // Create Layout
    this._el.attribution 				= TL.Dom.create('div', 'tl-attribution', this._el.container);
    this._el.line						= TL.Dom.create('div', 'tl-timenav-line', this._el.container);
    this._el.slider						= TL.Dom.create('div', 'tl-timenav-slider', this._el.container);
    this._el.slider_background			= TL.Dom.create('div', 'tl-timenav-slider-background', this._el.slider);
    this._el.marker_container_mask		= TL.Dom.create('div', 'tl-timenav-container-mask', this._el.slider);
    this._el.marker_container			= TL.Dom.create('div', 'tl-timenav-container', this._el.marker_container_mask);
    this._el.marker_item_container		= TL.Dom.create('div', 'tl-timenav-item-container', this._el.marker_container);
    this._el.timeaxis 					= TL.Dom.create('div', 'tl-timeaxis', this._el.slider);
    this._el.timeaxis_background 		= TL.Dom.create('div', 'tl-timeaxis-background', this._el.container);


    // Knight Lab Logo
    this._el.attribution.innerHTML = "<a href='http://timeline.knightlab.com' target='_blank'><span class='tl-knightlab-logo'></span>Timeline JS</a>"

    // Time Axis
    this.timeaxis = new TL.TimeAxis(this._el.timeaxis, this.options);

    // Swipable
    this._swipable = new TL.Swipable(this._el.slider_background, this._el.slider, {
      enable: {x:true, y:false},
      constraint: {top: false,bottom: false,left: (this.options.width/2),right: false},
      snap: 	false
    });
    this._swipable.enable();

  },

  _initEvents: function () {
    // Drag Events
    this._swipable.on('dragmove', this._onDragMove, this);

    // Scroll Events
    TL.DomEvent.addListener(this._el.container, 'mousewheel', this._onMouseScroll, this);
    TL.DomEvent.addListener(this._el.container, 'DOMMouseScroll', this._onMouseScroll, this);
  },

  _initData: function() {
    // Create Markers and then add them
    this._createMarkers(this.config.events);

    if (this.config.eras) {
      this.has_eras = true;
      this._createEras(this.config.eras);
    }

    this._drawTimeline();

  }


});


/* **********************************************
     Begin TL.TimeMarker.js
********************************************** */

/*	TL.TimeMarker

================================================== */

TL.TimeMarker = TL.Class.extend({

  includes: [TL.Events, TL.DomMixins],

  _el: {},

  /*	Constructor
  ================================================== */
  initialize: function(data, options) {

    // DOM Elements
    this._el = {
      container: {},
      content_container: {},
      media_container: {},
      timespan: {},
      line_left: {},
      line_right: {},
      content: {},
      text: {},
      media: {},
    };

    // Components
    this._text			= {};

    // State
    this._state = {
      loaded: 		false
    };


    // Data
    this.data = {
      unique_id: 			"",
      background: 		null,
      date: {
        year:			0,
        month:			0,
        day: 			0,
        hour: 			0,
        minute: 		0,
        second: 		0,
        millisecond: 	0,
        thumbnail: 		"",
        format: 		""
      },
      text: {
        headline: 		"",
        text: 			""
      },
      media: 				null
    };

    // Options
    this.options = {
      duration: 			1000,
      ease: 				TL.Ease.easeInSpline,
      width: 				600,
      height: 			600,
      marker_width_min: 	100 			// Minimum Marker Width
    };

    // Actively Displaying
    this.active = false;

    // Animation Object
    this.animator = {};

    // End date
    this.has_end_date = false;

    // Merge Data and Options
    TL.Util.mergeData(this.options, options);
    TL.Util.mergeData(this.data, data);

    this._initLayout();
    this._initEvents();


  },

  /*	Adding, Hiding, Showing etc
  ================================================== */
  show: function() {

  },

  hide: function() {

  },

  setActive: function(is_active) {
    this.active = is_active;

    if (this.active && this.has_end_date) {
      this._el.container.className = 'tl-timemarker tl-timemarker-with-end tl-timemarker-active';
    } else if (this.active){
      this._el.container.className = 'tl-timemarker tl-timemarker-active';
    } else if (this.has_end_date){
      this._el.container.className = 'tl-timemarker tl-timemarker-with-end';
    } else {
      this._el.container.className = 'tl-timemarker';
    }
  },

  addTo: function(container) {
    container.appendChild(this._el.container);
  },

  removeFrom: function(container) {
    container.removeChild(this._el.container);
  },

  updateDisplay: function(w, h) {
    this._updateDisplay(w, h);
  },

  loadMedia: function() {

    if (this._media && !this._state.loaded) {
      this._media.loadMedia();
      this._state.loaded = true;
    }
  },

  stopMedia: function() {
    if (this._media && this._state.loaded) {
      this._media.stopMedia();
    }
  },

  getLeft: function() {
    return this._el.container.style.left.slice(0, -2);
  },

  getTime: function() { // TODO does this need to know about the end date?
    return this.data.start_date.getTime();
  },

  getEndTime: function() {

    if (this.data.end_date) {
      return this.data.end_date.getTime();
    } else {
      return false;
    }
  },

  setHeight: function(h) {
    var text_line_height = 12,
      text_lines = 1;

    this._el.content_container.style.height = h  + "px";
    this._el.timespan_content.style.height = h + "px";
    // Handle Line height for better display of text
    if (h <= 30) {
      this._el.content.className = "tl-timemarker-content tl-timemarker-content-small";
    } else {
      this._el.content.className = "tl-timemarker-content";
    }

    if (h <= 56) {
      TL.DomUtil.addClass(this._el.content_container, "tl-timemarker-content-container-small");
    } else {
      TL.DomUtil.removeClass(this._el.content_container, "tl-timemarker-content-container-small");
    }

    // Handle number of lines visible vertically

    if (TL.Browser.webkit) {
      text_lines = Math.floor(h / (text_line_height + 2));
      if (text_lines < 1) {
        text_lines = 1;
      }
      this._text.className = "tl-headline";
      this._text.style.webkitLineClamp = text_lines;
    } else {
      text_lines = h / text_line_height;
      if (text_lines > 1) {
        this._text.className = "tl-headline tl-headline-fadeout";
      } else {
        this._text.className = "tl-headline";
      }
      this._text.style.height = (text_lines * text_line_height)  + "px";
    }

  },

  setWidth: function(w) {
    if (this.data.end_date) {
      this._el.container.style.width = w + "px";

      if (w > this.options.marker_width_min) {
        this._el.content_container.style.width = w + "px";
        this._el.content_container.className = "tl-timemarker-content-container tl-timemarker-content-container-long";
      } else {
        this._el.content_container.style.width = this.options.marker_width_min + "px";
        this._el.content_container.className = "tl-timemarker-content-container";
      }
    }

  },

  setClass: function(n) {
    this._el.container.className = n;
  },

  setRowPosition: function(n, remainder) {
    this.setPosition({top:n});
    this._el.timespan.style.height = remainder + "px";

    if (remainder < 56) {
      //TL.DomUtil.removeClass(this._el.content_container, "tl-timemarker-content-container-small");
    }
  },

  /*	Events
  ================================================== */
  _onMarkerClick: function(e) {
    this.fire("markerclick", {unique_id:this.data.unique_id});
  },

  /*	Private Methods
  ================================================== */
  _initLayout: function () {
    //trace(this.data)
    // Create Layout
    this._el.container 				= TL.Dom.create("div", "tl-timemarker");
    if (this.data.unique_id) {
      this._el.container.id 		= this.data.unique_id + "-marker";
    }

    if (this.data.end_date) {
      this.has_end_date = true;
      this._el.container.className = 'tl-timemarker tl-timemarker-with-end';
    }

    this._el.timespan				= TL.Dom.create("div", "tl-timemarker-timespan", this._el.container);
    this._el.timespan_content		= TL.Dom.create("div", "tl-timemarker-timespan-content", this._el.timespan);
    this._el.content_container		= TL.Dom.create("div", "tl-timemarker-content-container", this._el.container);

    this._el.content				= TL.Dom.create("div", "tl-timemarker-content", this._el.content_container);

    this._el.line_left				= TL.Dom.create("div", "tl-timemarker-line-left", this._el.timespan);
    this._el.line_right				= TL.Dom.create("div", "tl-timemarker-line-right", this._el.timespan);

    // Thumbnail or Icon
    if (this.data.media) {
      this._el.media_container	= TL.Dom.create("div", "tl-timemarker-media-container", this._el.content);

      if (this.data.media.thumbnail && this.data.media.thumbnail != "") {
        this._el.media				= TL.Dom.create("img", "tl-timemarker-media", this._el.media_container);
        this._el.media.src			= TL.Util.transformImageURL(this.data.media.thumbnail);

      } else {
        var media_type = TL.MediaType(this.data.media).type;
        this._el.media				= TL.Dom.create("span", "tl-icon-" + media_type, this._el.media_container);

      }

    }


    // Text
    this._el.text					= TL.Dom.create("div", "tl-timemarker-text", this._el.content);
    this._text						= TL.Dom.create("h2", "tl-headline", this._el.text);
    if (this.data.text.headline && this.data.text.headline != "") {
      this._text.innerHTML		= TL.Util.unlinkify(this.data.text.headline);
    } else if (this.data.text.text && this.data.text.text != "") {
      this._text.innerHTML		= TL.Util.unlinkify(this.data.text.text);
    } else if (this.data.media.caption && this.data.media.caption != "") {
      this._text.innerHTML		= TL.Util.unlinkify(this.data.media.caption);
    }



    // Fire event that the slide is loaded
    this.onLoaded();

  },

  _initEvents: function() {
    TL.DomEvent.addListener(this._el.container, 'click', this._onMarkerClick, this);
  },

  // Update Display
  _updateDisplay: function(width, height, layout) {

    if (width) {
      this.options.width 					= width;
    }

    if (height) {
      this.options.height = height;
    }

  }

});


/* **********************************************
     Begin TL.TimeEra.js
********************************************** */

/*	TL.TimeMarker

================================================== */

TL.TimeEra = TL.Class.extend({

  includes: [TL.Events, TL.DomMixins],

  _el: {},

  /*	Constructor
  ================================================== */
  initialize: function(data, options) {

    // DOM Elements
    this._el = {
      container: {},
      background: {},
      content_container: {},
      content: {},
      text: {}
    };

    // Components
    this._text			= {};

    // State
    this._state = {
      loaded: 		false
    };


    // Data
    this.data = {
      unique_id: 			"",
      date: {
        year:			0,
        month:			0,
        day: 			0,
        hour: 			0,
        minute: 		0,
        second: 		0,
        millisecond: 	0,
        thumbnail: 		"",
        format: 		""
      },
      text: {
        headline: 		"",
        text: 			""
      }
    };

    // Options
    this.options = {
      duration: 			1000,
      ease: 				TL.Ease.easeInSpline,
      width: 				600,
      height: 			600,
      marker_width_min: 	100 			// Minimum Marker Width
    };

    // Actively Displaying
    this.active = false;

    // Animation Object
    this.animator = {};

    // End date
    this.has_end_date = false;

    // Merge Data and Options
    TL.Util.mergeData(this.options, options);
    TL.Util.mergeData(this.data, data);

    this._initLayout();
    this._initEvents();


  },

  /*	Adding, Hiding, Showing etc
  ================================================== */
  show: function() {

  },

  hide: function() {

  },

  setActive: function(is_active) {

  },

  addTo: function(container) {
    container.appendChild(this._el.container);
  },

  removeFrom: function(container) {
    container.removeChild(this._el.container);
  },

  updateDisplay: function(w, h) {
    this._updateDisplay(w, h);
  },

  getLeft: function() {
    return this._el.container.style.left.slice(0, -2);
  },

  getTime: function() { // TODO does this need to know about the end date?
    return this.data.start_date.getTime();
  },

  getEndTime: function() {

    if (this.data.end_date) {
      return this.data.end_date.getTime();
    } else {
      return false;
    }
  },

  setHeight: function(h) {
    var text_line_height = 12,
      text_lines = 1;

    this._el.content_container.style.height = h  + "px";
    this._el.content.className = "tl-timeera-content";

    // Handle number of lines visible vertically

    if (TL.Browser.webkit) {
      text_lines = Math.floor(h / (text_line_height + 2));
      if (text_lines < 1) {
        text_lines = 1;
      }
      this._text.className = "tl-headline";
      this._text.style.webkitLineClamp = text_lines;
    } else {
      text_lines = h / text_line_height;
      if (text_lines > 1) {
        this._text.className = "tl-headline tl-headline-fadeout";
      } else {
        this._text.className = "tl-headline";
      }
      this._text.style.height = (text_lines * text_line_height)  + "px";
    }

  },

  setWidth: function(w) {
    if (this.data.end_date) {
      this._el.container.style.width = w + "px";

      if (w > this.options.marker_width_min) {
        this._el.content_container.style.width = w + "px";
        this._el.content_container.className = "tl-timeera-content-container tl-timeera-content-container-long";
      } else {
        this._el.content_container.style.width = this.options.marker_width_min + "px";
        this._el.content_container.className = "tl-timeera-content-container";
      }
    }

  },

  setClass: function(n) {
    this._el.container.className = n;
  },

  setRowPosition: function(n, remainder) {
    this.setPosition({top:n});

    if (remainder < 56) {
      //TL.DomUtil.removeClass(this._el.content_container, "tl-timeera-content-container-small");
    }
  },

  setColor: function(color_num) {
    this._el.container.className = 'tl-timeera tl-timeera-color' + color_num;
  },

  /*	Events
  ================================================== */


  /*	Private Methods
  ================================================== */
  _initLayout: function () {
    //trace(this.data)
    // Create Layout
    this._el.container 				= TL.Dom.create("div", "tl-timeera");
    if (this.data.unique_id) {
      this._el.container.id 		= this.data.unique_id + "-era";
    }

    if (this.data.end_date) {
      this.has_end_date = true;
      this._el.container.className = 'tl-timeera tl-timeera-with-end';
    }

    this._el.content_container		= TL.Dom.create("div", "tl-timeera-content-container", this._el.container);

    this._el.background 			= TL.Dom.create("div", "tl-timeera-background", this._el.content_container);

    this._el.content				= TL.Dom.create("div", "tl-timeera-content", this._el.content_container);



    // Text
    this._el.text					= TL.Dom.create("div", "tl-timeera-text", this._el.content);
    this._text						= TL.Dom.create("h2", "tl-headline", this._el.text);
    if (this.data.text.headline && this.data.text.headline != "") {
      this._text.innerHTML		= TL.Util.unlinkify(this.data.text.headline);
    }



    // Fire event that the slide is loaded
    this.onLoaded();

  },

  _initEvents: function() {

  },

  // Update Display
  _updateDisplay: function(width, height, layout) {

    if (width) {
      this.options.width 					= width;
    }

    if (height) {
      this.options.height = height;
    }

  }

});


/* **********************************************
     Begin TL.TimeGroup.js
********************************************** */

/*	TL.TimeGroup

================================================== */

TL.TimeGroup = TL.Class.extend({

  includes: [TL.Events, TL.DomMixins],

  _el: {},

  /*	Constructor
  ================================================== */
  initialize: function(data) {

    // DOM ELEMENTS
    this._el = {
      parent: {},
      container: {},
      message: {}
    };

    //Options
    this.options = {
      width: 					600,
      height: 				600
    };

    // Data
    this.data = {
      label: "",
      rows: 1
    };


    this._el.container = TL.Dom.create("div", "tl-timegroup");

    // Merge Data
    TL.Util.mergeData(this.data, data);

    // Animation
    this.animator = {};


    this._initLayout();
    this._initEvents();
  },

  /*	Public
  ================================================== */



  /*	Update Display
  ================================================== */
  updateDisplay: function(w, h) {

  },

  setRowPosition: function(n, h) {
    // trace(n);
    // trace(this._el.container)
    this.options.height = h * this.data.rows;
    this.setPosition({top:n});
    this._el.container.style.height = this.options.height + "px";

  },

  setAlternateRowColor: function(alternate, hide) {
    var class_name = "tl-timegroup";
    if (alternate) {
      class_name += " tl-timegroup-alternate";
    }
    if (hide) {
      class_name += " tl-timegroup-hidden";
    }
    this._el.container.className = class_name;
  },

  /*	Events
  ================================================== */


  _onMouseClick: function() {
    this.fire("clicked", this.options);
  },


  /*	Private Methods
  ================================================== */
  _initLayout: function () {

    // Create Layout
    this._el.message = TL.Dom.create("div", "tl-timegroup-message", this._el.container);
    this._el.message.innerHTML = this.data.label;


  },

  _initEvents: function () {
    TL.DomEvent.addListener(this._el.container, 'click', this._onMouseClick, this);
  },

  // Update Display
  _updateDisplay: function(width, height, animate) {

  }

});

/* **********************************************
     Begin TL.TimeScale.js
********************************************** */

/*  TL.TimeScale
    Strategies for laying out the timenav
    make a new one if the slides change

    TODOS: deal with clustering
================================================== */
TL.TimeScale = TL.Class.extend({

    initialize: function (timeline_config, options) {

        var slides = timeline_config.events;
        this._scale = timeline_config.scale;

        options = TL.Util.mergeData({ // establish defaults
            display_width: 500,
            screen_multiplier: 3,
            max_rows: null
        }, options);

        this._display_width = options.display_width;
        this._screen_multiplier = options.screen_multiplier;
        this._pixel_width = this._screen_multiplier * this._display_width;

        this._group_labels = undefined;
        this._positions = [];
        this._pixels_per_milli = 0;

        this._earliest = timeline_config.getEarliestDate().getTime();
        this._latest = timeline_config.getLatestDate().getTime();
        this._span_in_millis = this._latest - this._earliest;
        if (this._span_in_millis <= 0) {
            this._span_in_millis = this._computeDefaultSpan(timeline_config);
        }
        this._average = (this._span_in_millis)/slides.length;

        this._pixels_per_milli = this.getPixelWidth() / this._span_in_millis;

        this._axis_helper = TL.AxisHelper.getBestHelper(this);

        this._scaled_padding = (1/this.getPixelsPerTick()) * (this._display_width/2)
        this._computePositionInfo(slides, options.max_rows);
    },

    _computeDefaultSpan: function(timeline_config) {
        // this gets called when all events are at the same instant,
        // or maybe when the span_in_millis is > 0 but still below a desired threshold
        // TODO: does this need smarts about eras?
        if (timeline_config.scale == 'human') {
            var formats = {}
            for (var i = 0; i < timeline_config.events.length; i++) {
                var fmt = timeline_config.events[i].start_date.findBestFormat();
                formats[fmt] = (formats[fmt]) ? formats[fmt] + 1 : 1;
            };

            for (var i = TL.Date.SCALES.length - 1; i >= 0; i--) {
                if (formats.hasOwnProperty(TL.Date.SCALES[i][0])) {
                    var scale = TL.Date.SCALES[TL.Date.SCALES.length - 1]; // default
                    if (TL.Date.SCALES[i+1]) {
                        scale = TL.Date.SCALES[i+1]; // one larger than the largest in our data
                    }
                    return scale[1]
                }
            };
            return 365 * 24 * 60 * 60 * 1000; // default to a year?
        }

        return 200000; // what is the right handling for cosmo dates?
    },
    getGroupLabels: function() { /*
        return an array of objects, one per group, in the order (top to bottom) that the groups are expected to appear. Each object will have two properties:
            * label (the string as specified in one or more 'group' properties of events in the configuration)
            * rows (the number of rows occupied by events associated with the label. )
        */
        return (this._group_labels || []);
    },

    getScale: function() {
        return this._scale;
    },

    getNumberOfRows: function() {
        return this._number_of_rows
    },

    getPixelWidth: function() {
        return this._pixel_width;
    },

    getPosition: function(time_in_millis) {
        // be careful using millis, as they won't scale to cosmological time.
        // however, we're moving to make the arg to this whatever value
        // comes from TL.Date.getTime() which could be made smart about that --
        // so it may just be about the naming.
        return ( time_in_millis - this._earliest ) * this._pixels_per_milli
    },

    getPositionInfo: function(idx) {
        return this._positions[idx];
    },

    getPixelsPerTick: function() {
        return this._axis_helper.getPixelsPerTick(this._pixels_per_milli);
    },

    getTicks: function() {
        return {
            major: this._axis_helper.getMajorTicks(this),
            minor: this._axis_helper.getMinorTicks(this) }
    },

    getDateFromTime: function(t) {
        if(this._scale == 'human') {
            return new TL.Date(t);
        } else if(this._scale == 'cosmological') {
            return new TL.BigDate(new TL.BigYear(t));
        }
        throw new TL.Error("time_scale_scale_err", this._scale);
    },

    getMajorScale: function() {
        return this._axis_helper.major.name;
    },

    getMinorScale: function() {
        return this._axis_helper.minor.name;
    },

    _assessGroups: function(slides) {
        var groups = [];
        var empty_group = false;
        for (var i = 0; i < slides.length; i++) {
            if(slides[i].group) {
                if(groups.indexOf(slides[i].group) < 0) {
                    groups.push(slides[i].group);
                } else {
                    empty_group = true;
                }
            }
        };
        if (groups.length && empty_group) {
            groups.push('');
        }
        return groups;
    },

    /*  Compute the marker row positions, minimizing the number of
        overlaps.

        @positions = list of objects from this._positions
        @rows_left = number of rows available (assume > 0)
    */
    _computeRowInfo: function(positions, rows_left) {
        var lasts_in_row = [];
        var n_overlaps = 0;

        for (var i = 0; i < positions.length; i++) {
            var pos_info = positions[i];
            var overlaps = [];

            // See if we can add item to an existing row without
            // overlapping the previous item in that row
            delete pos_info.row;

            for (var j = 0; j < lasts_in_row.length; j++) {
                overlaps.push(lasts_in_row[j].end - pos_info.start);
                if(overlaps[j] <= 0) {
                    pos_info.row = j;
                    lasts_in_row[j] = pos_info;
                    break;
                }
            }

            // If we couldn't add to an existing row without overlap...
            if (typeof(pos_info.row) == 'undefined') {
                if (rows_left === null) {
                    // Make a new row
                    pos_info.row = lasts_in_row.length;
                    lasts_in_row.push(pos_info);
                } else if (rows_left > 0) {
                    // Make a new row
                    pos_info.row = lasts_in_row.length;
                    lasts_in_row.push(pos_info);
                    rows_left--;
                } else {
                    // Add to existing row with minimum overlap.
                    var min_overlap = Math.min.apply(null, overlaps);
                    var idx = overlaps.indexOf(min_overlap);
                    pos_info.row = idx;
                    if (pos_info.end > lasts_in_row[idx].end) {
                        lasts_in_row[idx] = pos_info;
                    }
                    n_overlaps++;
                }
            }
        }

        return {n_rows: lasts_in_row.length, n_overlaps: n_overlaps};
    },

    /*  Compute marker positions.  If using groups, this._number_of_rows
        will never be less than the number of groups.

        @max_rows = total number of available rows
        @default_marker_width should be in pixels
    */
    _computePositionInfo: function(slides, max_rows, default_marker_width) {
        default_marker_width = default_marker_width || 100;

        var groups = [];
        var empty_group = false;

        // Set start/end/width; enumerate groups
        for (var i = 0; i < slides.length; i++) {
            var pos_info = {
                start: this.getPosition(slides[i].start_date.getTime())
            };
            this._positions.push(pos_info);

            if (typeof(slides[i].end_date) != 'undefined') {
                var end_pos = this.getPosition(slides[i].end_date.getTime());
                pos_info.width = end_pos - pos_info.start;
                if (pos_info.width > default_marker_width) {
                    pos_info.end = pos_info.start + pos_info.width;
                } else {
                    pos_info.end = pos_info.start + default_marker_width;
                }
            } else {
                pos_info.width = default_marker_width;
                pos_info.end = pos_info.start + default_marker_width;
            }

            if(slides[i].group) {
                if(groups.indexOf(slides[i].group) < 0) {
                    groups.push(slides[i].group);
                }
            } else {
                empty_group = true;
            }
        }

        if(!(groups.length)) {
            var result = this._computeRowInfo(this._positions, max_rows);
            this._number_of_rows = result.n_rows;
        } else {
            if(empty_group) {
                groups.push("");
            }

            // Init group info
            var group_info = [];

            for(var i = 0; i < groups.length; i++) {
                group_info[i] = {
                    label: groups[i],
                    idx: i,
                    positions: [],
                    n_rows: 1,      // default
                    n_overlaps: 0
                };
            }

            for(var i = 0; i < this._positions.length; i++) {
                var pos_info = this._positions[i];

                pos_info.group = groups.indexOf(slides[i].group || "");
                pos_info.row = 0;

                var gi = group_info[pos_info.group];
                for(var j = gi.positions.length - 1; j >= 0; j--) {
                    if(gi.positions[j].end > pos_info.start) {
                        gi.n_overlaps++;
                    }
                }

                gi.positions.push(pos_info);
            }

            var n_rows = groups.length; // start with 1 row per group

            while(true) {
                // Count free rows available
                var rows_left = Math.max(0, max_rows - n_rows);
                if(!rows_left) {
                    break;  // no free rows, nothing to do
                }

                // Sort by # overlaps, idx
               group_info.sort(function(a, b) {
                    if(a.n_overlaps > b.n_overlaps) {
                        return -1;
                    } else if(a.n_overlaps < b.n_overlaps) {
                        return 1;
                    }
                    return a.idx - b.idx;
                });
                if(!group_info[0].n_overlaps) {
                    break; // no overlaps, nothing to do
                }

                // Distribute free rows among groups with overlaps
                var n_rows = 0;
                for(var i = 0; i < group_info.length; i++) {
                    var gi = group_info[i];

                    if(gi.n_overlaps && rows_left) {
                        var res = this._computeRowInfo(gi.positions,  gi.n_rows + 1);
                        gi.n_rows = res.n_rows;     // update group info
                        gi.n_overlaps = res.n_overlaps;
                        rows_left--;                // update rows left
                    }

                    n_rows += gi.n_rows;            // update rows used
                }
            }

            // Set number of rows
            this._number_of_rows = n_rows;

            // Set group labels; offset row positions
            this._group_labels = [];

            group_info.sort(function(a, b) {return a.idx - b.idx; });

            for(var i = 0, row_offset = 0; i < group_info.length; i++) {
                this._group_labels.push({
                    label: group_info[i].label,
                    rows: group_info[i].n_rows
                });

                for(var j = 0; j < group_info[i].positions.length; j++) {
                    var pos_info = group_info[i].positions[j];
                    pos_info.row += row_offset;
                }

                row_offset += group_info[i].n_rows;
            }
        }

    }
});


/* **********************************************
     Begin TL.TimeAxis.js
********************************************** */

/*	TL.TimeAxis
  Display element for showing timescale ticks
================================================== */

TL.TimeAxis = TL.Class.extend({

  includes: [TL.Events, TL.DomMixins, TL.I18NMixins],

  _el: {},

  /*	Constructor
  ================================================== */
  initialize: function(elem, options) {
    // DOM Elements
    this._el = {
      container: {},
      content_container: {},
      major: {},
      minor: {},
    };

    // Components
    this._text			= {};

    // State
    this._state = {
      loaded: 		false
    };


    // Data
    this.data = {};

    // Options
    this.options = {
      duration: 				1000,
      ease: 					TL.Ease.easeInSpline,
      width: 					600,
      height: 				600
    };

    // Actively Displaying
    this.active = false;

    // Animation Object
    this.animator = {};

    // Axis Helper
    this.axis_helper = {};

    // Minor tick dom element array
    this.minor_ticks = [];

    // Minor tick dom element array
    this.major_ticks = [];

    // Date Format Lookup, map TL.Date.SCALES names to...
    this.dateformat_lookup = {
          millisecond: 'time_milliseconds',     // ...TL.Language.<code>.dateformats
          second: 'time_short',
          minute: 'time_no_seconds_short',
          hour: 'time_no_minutes_short',
          day: 'full_short',
          month: 'month_short',
          year: 'year',
          decade: 'year',
          century: 'year',
          millennium: 'year',
          age: 'compact',  // ...TL.Language.<code>.bigdateformats
          epoch: 'compact',
          era: 'compact',
          eon: 'compact',
          eon2: 'compact'
      }

    // Main element
    if (typeof elem === 'object') {
      this._el.container = elem;
    } else {
      this._el.container = TL.Dom.get(elem);
    }

    // Merge Data and Options
    TL.Util.mergeData(this.options, options);

    this._initLayout();
    this._initEvents();

  },

  /*	Adding, Hiding, Showing etc
  ================================================== */
  show: function() {

  },

  hide: function() {

  },

  addTo: function(container) {
    container.appendChild(this._el.container);
  },

  removeFrom: function(container) {
    container.removeChild(this._el.container);
  },

  updateDisplay: function(w, h) {
    this._updateDisplay(w, h);
  },

  getLeft: function() {
    return this._el.container.style.left.slice(0, -2);
  },

  drawTicks: function(timescale, optimal_tick_width) {

    var ticks = timescale.getTicks();

    var controls = {
      minor: {
        el: this._el.minor,
        dateformat: this.dateformat_lookup[ticks['minor'].name],
        ts_ticks: ticks['minor'].ticks,
        tick_elements: this.minor_ticks
      },
      major: {
        el: this._el.major,
        dateformat: this.dateformat_lookup[ticks['major'].name],
        ts_ticks: ticks['major'].ticks,
        tick_elements: this.major_ticks
      }
    }
    // FADE OUT
    this._el.major.className = "tl-timeaxis-major";
    this._el.minor.className = "tl-timeaxis-minor";
    this._el.major.style.opacity = 0;
    this._el.minor.style.opacity = 0;

    // CREATE MAJOR TICKS
    this.major_ticks = this._createTickElements(
      ticks['major'].ticks,
      this._el.major,
      this.dateformat_lookup[ticks['major'].name]
    );

    // CREATE MINOR TICKS
    this.minor_ticks = this._createTickElements(
      ticks['minor'].ticks,
      this._el.minor,
      this.dateformat_lookup[ticks['minor'].name],
      ticks['major'].ticks
    );

    this.positionTicks(timescale, optimal_tick_width, true);

    // FADE IN
    this._el.major.className = "tl-timeaxis-major tl-animate-opacity tl-timeaxis-animate-opacity";
    this._el.minor.className = "tl-timeaxis-minor tl-animate-opacity tl-timeaxis-animate-opacity";
    this._el.major.style.opacity = 1;
    this._el.minor.style.opacity = 1;
  },

  _createTickElements: function(ts_ticks,tick_element,dateformat,ticks_to_skip) {
    tick_element.innerHTML = "";
    var skip_times = {}
    if (ticks_to_skip){
      for (var i = 0; i < ticks_to_skip.length; i++) {
        skip_times[ticks_to_skip[i].getTime()] = true;
      }
    }

    var tick_elements = []
    for (var i = 0; i < ts_ticks.length; i++) {
      var ts_tick = ts_ticks[i];
      if (!(ts_tick.getTime() in skip_times)) {
        var tick = TL.Dom.create("div", "tl-timeaxis-tick", tick_element),
          tick_text 	= TL.Dom.create("span", "tl-timeaxis-tick-text tl-animate-opacity", tick);

        tick_text.innerHTML = ts_tick.getDisplayDate(this.getLanguage(), dateformat);

        tick_elements.push({
          tick:tick,
          tick_text:tick_text,
          display_date:ts_tick.getDisplayDate(this.getLanguage(), dateformat),
          date:ts_tick
        });
      }
    }
    return tick_elements;
  },

  positionTicks: function(timescale, optimal_tick_width, no_animate) {

    // Handle Animation
    if (no_animate) {
      this._el.major.className = "tl-timeaxis-major";
      this._el.minor.className = "tl-timeaxis-minor";
    } else {
      this._el.major.className = "tl-timeaxis-major tl-timeaxis-animate";
      this._el.minor.className = "tl-timeaxis-minor tl-timeaxis-animate";
    }

    this._positionTickArray(this.major_ticks, timescale, optimal_tick_width);
    this._positionTickArray(this.minor_ticks, timescale, optimal_tick_width);

  },

  _positionTickArray: function(tick_array, timescale, optimal_tick_width) {
    // Poition Ticks & Handle density of ticks
    if (tick_array[1] && tick_array[0]) {
      var distance = ( timescale.getPosition(tick_array[1].date.getMillisecond()) - timescale.getPosition(tick_array[0].date.getMillisecond()) ),
        fraction_of_array = 1;


      if (distance < optimal_tick_width) {
        fraction_of_array = Math.round(optimal_tick_width/timescale.getPixelsPerTick());
      }

      var show = 1;

      for (var i = 0; i < tick_array.length; i++) {

        var tick = tick_array[i];

        // Poition Ticks
        tick.tick.style.left = timescale.getPosition(tick.date.getMillisecond()) + "px";
        tick.tick_text.innerHTML = tick.display_date;

        // Handle density of ticks
        if (fraction_of_array > 1) {
          if (show >= fraction_of_array) {
            show = 1;
            tick.tick_text.style.opacity = 1;
            tick.tick.className = "tl-timeaxis-tick";
          } else {
            show++;
            tick.tick_text.style.opacity = 0;
            tick.tick.className = "tl-timeaxis-tick tl-timeaxis-tick-hidden";
          }
        } else {
          tick.tick_text.style.opacity = 1;
          tick.tick.className = "tl-timeaxis-tick";
        }

      };
    }
  },

  /*	Events
  ================================================== */


  /*	Private Methods
  ================================================== */
  _initLayout: function () {
    this._el.content_container		= TL.Dom.create("div", "tl-timeaxis-content-container", this._el.container);
    this._el.major					= TL.Dom.create("div", "tl-timeaxis-major", this._el.content_container);
    this._el.minor					= TL.Dom.create("div", "tl-timeaxis-minor", this._el.content_container);

    // Fire event that the slide is loaded
    this.onLoaded();
  },

  _initEvents: function() {

  },

  // Update Display
  _updateDisplay: function(width, height, layout) {

    if (width) {
      this.options.width 					= width;
    }

    if (height) {
      this.options.height = height;
    }

  }

});


/* **********************************************
     Begin TL.AxisHelper.js
********************************************** */

/*  TL.AxisHelper
    Strategies for laying out the timenav
    markers and time axis
    Intended as a private class -- probably only known to TimeScale
================================================== */
TL.AxisHelper = TL.Class.extend({
    initialize: function (options) {
    if (options) {
            this.scale = options.scale;
          this.minor = options.minor;
          this.major = options.major;
    } else {
            throw new TL.Error("axis_helper_no_options_err")
        }

    },

    getPixelsPerTick: function(pixels_per_milli) {
        return pixels_per_milli * this.minor.factor;
    },

    getMajorTicks: function(timescale) {
    return this._getTicks(timescale, this.major)
    },

    getMinorTicks: function(timescale) {
        return this._getTicks(timescale, this.minor)
    },

    _getTicks: function(timescale, option) {

        var factor_scale = timescale._scaled_padding * option.factor;
        var first_tick_time = timescale._earliest - factor_scale;
        var last_tick_time = timescale._latest + factor_scale;
        var ticks = []
        for (var i = first_tick_time; i < last_tick_time; i += option.factor) {
            ticks.push(timescale.getDateFromTime(i).floor(option.name));
        }

        return {
            name: option.name,
            ticks: ticks
        }

    }

});

(function(cls){ // add some class-level behavior

    var HELPERS = {};

    var setHelpers = function(scale_type, scales) {
        HELPERS[scale_type] = [];

        for (var idx = 0; idx < scales.length - 1; idx++) {
            var minor = scales[idx];
            var major = scales[idx+1];
            HELPERS[scale_type].push(new cls({
                scale: minor[3],
                minor: { name: minor[0], factor: minor[1]},
                major: { name: major[0], factor: major[1]}
            }));
        }
    };

    setHelpers('human', TL.Date.SCALES);
    setHelpers('cosmological', TL.BigDate.SCALES);

    cls.HELPERS = HELPERS;

    cls.getBestHelper = function(ts,optimal_tick_width) {
        if (typeof(optimal_tick_width) != 'number' ) {
            optimal_tick_width = 100;
        }
        var ts_scale = ts.getScale();
        var helpers = HELPERS[ts_scale];

        if (!helpers) {
            throw new TL.Error("axis_helper_scale_err", ts_scale);
        }

        var prev = null;
        for (var idx = 0; idx < helpers.length; idx++) {
            var curr = helpers[idx];
            var pixels_per_tick = curr.getPixelsPerTick(ts._pixels_per_milli);
            if (pixels_per_tick > optimal_tick_width)  {
                if (prev == null) return curr;
                var curr_dist = Math.abs(optimal_tick_width - pixels_per_tick);
                var prev_dist = Math.abs(optimal_tick_width - pixels_per_tick);
                if (curr_dist < prev_dist) {
                    return curr;
                } else {
                    return prev;
                }
            }
            prev = curr;
        }
        return helpers[helpers.length - 1]; // last resort
    }
})(TL.AxisHelper);


/* **********************************************
     Begin TL.Timeline.js
********************************************** */

/*  TimelineJS
Designed and built by Zach Wise at KnightLab

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

================================================== */
/*
TODO

*/

/*  Required Files
CodeKit Import
https://incident57.com/codekit/
================================================== */

// CORE
  // @codekit-prepend "core/TL.js";
  // @codekit-prepend "core/TL.Error.js";
  // @codekit-prepend "core/TL.Util.js";
  // @codekit-prepend "data/TL.Data.js";
  // @codekit-prepend "core/TL.Class.js";
  // @codekit-prepend "core/TL.Events.js";
  // @codekit-prepend "core/TL.Browser.js";
  // @codekit-prepend "core/TL.Load.js";
  // @codekit-prepend "core/TL.TimelineConfig.js";
  // @codekit-prepend "core/TL.ConfigFactory.js";


// LANGUAGE
  // @codekit-prepend "language/TL.Language.js";
  // @codekit-prepend "language/TL.I18NMixins.js";

// ANIMATION
  // @codekit-prepend "animation/TL.Ease.js";
  // @codekit-prepend "animation/TL.Animate.js";

// DOM
  // @codekit-prepend "dom/TL.Point.js";
  // @codekit-prepend "dom/TL.DomMixins.js";
  // @codekit-prepend "dom/TL.Dom.js";
  // @codekit-prepend "dom/TL.DomUtil.js";
  // @codekit-prepend "dom/TL.DomEvent.js";
  // @codekit-prepend "dom/TL.StyleSheet.js";

// Date
  // @codekit-prepend "date/TL.Date.js";
  // @codekit-prepend "date/TL.DateUtil.js";

// UI
  // @codekit-prepend "ui/TL.Draggable.js";
  // @codekit-prepend "ui/TL.Swipable.js";
  // @codekit-prepend "ui/TL.MenuBar.js";
  // @codekit-prepend "ui/TL.Message.js";

// MEDIA
  // @codekit-prepend "media/TL.MediaType.js";
  // @codekit-prepend "media/TL.Media.js";

// MEDIA TYPES
  // @codekit-prepend "media/types/TL.Media.Blockquote.js";
  // @codekit-prepend "media/types/TL.Media.DailyMotion.js";
  // @codekit-prepend "media/types/TL.Media.DocumentCloud.js";
  // @codekit-prepend "media/types/TL.Media.Flickr.js";
  // @codekit-prepend "media/types/TL.Media.GoogleDoc.js";
  // @codekit-prepend "media/types/TL.Media.GooglePlus.js";
  // @codekit-prepend "media/types/TL.Media.IFrame.js";
  // @codekit-prepend "media/types/TL.Media.Image.js";
  // @codekit-prepend "media/types/TL.Media.Imgur.js";
  // @codekit-prepend "media/types/TL.Media.Instagram.js";
  // @codekit-prepend "media/types/TL.Media.GoogleMap.js";
  // @codekit-prepend "media/types/TL.Media.PDF.js";
  // @codekit-prepend "media/types/TL.Media.Profile.js";
  // @codekit-prepend "media/types/TL.Media.Slider.js";
  // @codekit-prepend "media/types/TL.Media.SoundCloud.js";
  // @codekit-prepend "media/types/TL.Media.Spotify.js";
  // @codekit-prepend "media/types/TL.Media.Storify.js";
  // @codekit-prepend "media/types/TL.Media.Text.js";
  // @codekit-prepend "media/types/TL.Media.Twitter.js";
  // @codekit-prepend "media/types/TL.Media.TwitterEmbed.js";
  // @codekit-prepend "media/types/TL.Media.Vimeo.js";
  // @codekit-prepend "media/types/TL.Media.Vine.js";
  // @codekit-prepend "media/types/TL.Media.Website.js";
  // @codekit-prepend "media/types/TL.Media.Wikipedia.js";
  // @codekit-prepend "media/types/TL.Media.YouTube.js";

// STORYSLIDER
  // @codekit-prepend "slider/TL.Slide.js";
  // @codekit-prepend "slider/TL.SlideNav.js";
  // @codekit-prepend "slider/TL.StorySlider.js";

// TIMENAV
  // @codekit-prepend "timenav/TL.TimeNav.js";
  // @codekit-prepend "timenav/TL.TimeMarker.js";
  // @codekit-prepend "timenav/TL.TimeEra.js";
  // @codekit-prepend "timenav/TL.TimeGroup.js";
  // @codekit-prepend "timenav/TL.TimeScale.js";
  // @codekit-prepend "timenav/TL.TimeAxis.js";
  // @codekit-prepend "timenav/TL.AxisHelper.js";


TL.Timeline = TL.Class.extend({
  includes: [TL.Events, TL.I18NMixins],

  /*  Private Methods
  ================================================== */
  initialize: function (elem, data, options) {
    var self = this;
    if (!options) { options = {}};
    // Version
    this.version = "3.2.6";

    // Ready
    this.ready = false;

    // DOM ELEMENTS
    this._el = {
      container: {},
      storyslider: {},
      timenav: {},
      menubar: {}
    };

    // Determine Container Element
    if (typeof elem === 'object') {
      this._el.container = elem;
    } else {
      this._el.container = TL.Dom.get(elem);
    }

    // Slider
    this._storyslider = {};

    // Style Sheet
    this._style_sheet = new TL.StyleSheet();

    // TimeNav
    this._timenav = {};

    // Menu Bar
    this._menubar = {};

    // Loaded State
    this._loaded = {storyslider:false, timenav:false};

    // Data Object
    this.config = null;

    this.options = {
      script_path: 				"",
      height: 					this._el.container.offsetHeight,
      width: 						this._el.container.offsetWidth,
      debug: 						true,
      is_embed: 					false,
      is_full_embed: 				false,
      hash_bookmark: false,
      default_bg_color: 			{r:255, g:255, b:255},
      scale_factor: 				2,						// How many screen widths wide should the timeline be
      layout: 					"landscape",			// portrait or landscape
      timenav_position: 			"bottom",				// timeline on top or bottom
      optimal_tick_width: 		60,						// optimal distance (in pixels) between ticks on axis
      base_class: 				"tl-timeline", 		// removing tl-timeline will break all default stylesheets...
      timenav_height: 			null,
      timenav_height_percentage: 	25,						// Overrides timenav height as a percentage of the screen
      timenav_mobile_height_percentage: 40, 				// timenav height as a percentage on mobile devices
      timenav_height_min: 		175,					// Minimum timenav height
      marker_height_min: 			30,						// Minimum Marker Height
      marker_width_min: 			100,					// Minimum Marker Width
      marker_padding: 			5,						// Top Bottom Marker Padding
      start_at_slide: 			0,
      start_at_end: 				false,
      menubar_height: 			0,
      skinny_size: 				650,
      medium_size: 				800,
      relative_date: 				false,					// Use momentjs to show a relative date from the slide.text.date.created_time field
      use_bc: 					false,					// Use declared suffix on dates earlier than 0
      // animation
      duration: 					1000,
      ease: 						TL.Ease.easeInOutQuint,
      // interaction
      dragging: 					true,
      trackResize: 				true,
      map_type: 					"stamen:toner-lite",
      slide_padding_lr: 			100,					// padding on slide of slide
      slide_default_fade: 		"0%",					// landscape fade
      zoom_sequence: 				[0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89], // Array of Fibonacci numbers for TimeNav zoom levels
      language: 					"en",
      ga_property_id: 			null,
      track_events: 				['back_to_start','nav_next','nav_previous','zoom_in','zoom_out' ]
    };

    // Animation Objects
    this.animator_timenav = null;
    this.animator_storyslider = null;
    this.animator_menubar = null;

    // Add message to DOM
    this.message = new TL.Message({}, {message_class: "tl-message-full"}, this._el.container);

    // Merge Options
    if (typeof(options.default_bg_color) == "string") {
      var parsed = TL.Util.hexToRgb(options.default_bg_color); // will clear it out if its invalid
      if (parsed) {
        options.default_bg_color = parsed;
      } else {
        delete options.default_bg_color
        trace("Invalid default background color. Ignoring.");
      }
    }
    TL.Util.mergeData(this.options, options);

    window.addEventListener("resize", function(e){
      self.updateDisplay();
    });

    // Set Debug Mode
    TL.debug = this.options.debug;

    // Apply base class to container
    TL.DomUtil.addClass(this._el.container, 'tl-timeline');

    if (this.options.is_embed) {
      TL.DomUtil.addClass(this._el.container, 'tl-timeline-embed');
    }

    if (this.options.is_full_embed) {
      TL.DomUtil.addClass(this._el.container, 'tl-timeline-full-embed');
    }

    // Use Relative Date Calculations
    // NOT YET IMPLEMENTED
    if(this.options.relative_date) {
      if (typeof(moment) !== 'undefined') {
        self._loadLanguage(data);
      } else {
        TL.Load.js(this.options.script_path + "/library/moment.js", function() {
          self._loadLanguage(data);
          trace("LOAD MOMENTJS")
        });
      }
    } else {
      self._loadLanguage(data);
    }

  },
  _translateError: function(e) {
      if(e.hasOwnProperty('stack')) {
          trace(e.stack);
      }
      if(e.message_key) {
          return this._(e.message_key) + (e.detail ? ' [' + e.detail +']' : '')
      }
      return e;
  },

  /*  Load Language
  ================================================== */
  _loadLanguage: function(data) {
    try {
        this.options.language = new TL.Language(this.options);
        this._initData(data);
    } catch(e) {
        this.showMessage(this._translateError(e));
    }
  },


  /*  Navigation
  ================================================== */

  // Goto slide with id
  goToId: function(id) {
    if (this.current_id != id) {
      this.current_id = id;
      this._timenav.goToId(this.current_id);
      this._storyslider.goToId(this.current_id, false, true);
      this.fire("change", {unique_id: this.current_id}, this);
    }
  },

  // Goto slide n
  goTo: function(n) {
    if(this.config.title) {
      if(n == 0) {
        this.goToId(this.config.title.unique_id);
      } else {
        this.goToId(this.config.events[n - 1].unique_id);
      }
    } else {
      this.goToId(this.config.events[n].unique_id);
    }
  },

  // Goto first slide
  goToStart: function() {
    this.goTo(0);
  },

  // Goto last slide
  goToEnd: function() {
    var _n = this.config.events.length - 1;
    this.goTo(this.config.title ? _n + 1 : _n);
  },

  // Goto previous slide
  goToPrev: function() {
    this.goTo(this._getSlideIndex(this.current_id) - 1);
  },

  // Goto next slide
  goToNext: function() {
    this.goTo(this._getSlideIndex(this.current_id) + 1);
  },

  /* Event maniupluation
  ================================================== */

  // Add an event
  add: function(data) {
    var unique_id = this.config.addEvent(data);

    var n = this._getEventIndex(unique_id);
    var d = this.config.events[n];

    this._storyslider.createSlide(d, this.config.title ? n+1 : n);
    this._storyslider._updateDrawSlides();

    this._timenav.createMarker(d, n);
    this._timenav._updateDrawTimeline(false);

    this.fire("added", {unique_id: unique_id});
  },

  // Remove an event
  remove: function(n) {
    if(n >= 0  && n < this.config.events.length) {
      // If removing the current, nav to new one first
      if(this.config.events[n].unique_id == this.current_id) {
        if(n < this.config.events.length - 1) {
          this.goTo(n + 1);
        } else {
          this.goTo(n - 1);
        }
      }

      var event = this.config.events.splice(n, 1);
      delete this.config.event_dict[event[0].unique_id];
      this._storyslider.destroySlide(this.config.title ? n+1 : n);
      this._storyslider._updateDrawSlides();

      this._timenav.destroyMarker(n);
      this._timenav._updateDrawTimeline(false);

      this.fire("removed", {unique_id: event[0].unique_id});
    }
  },

  removeId: function(id) {
    this.remove(this._getEventIndex(id));
  },

  /* Get slide data
  ================================================== */

  getData: function(n) {
    if(this.config.title) {
      if(n == 0) {
        return this.config.title;
      } else if(n > 0 && n <= this.config.events.length) {
        return this.config.events[n - 1];
      }
    } else if(n >= 0 && n < this.config.events.length) {
      return this.config.events[n];
    }
    return null;
  },

  getDataById: function(id) {
    return this.getData(this._getSlideIndex(id));
  },

  /* Get slide object
  ================================================== */

  getSlide: function(n) {
    if(n >= 0 && n < this._storyslider._slides.length) {
      return this._storyslider._slides[n];
    }
    return null;
  },

  getSlideById: function(id) {
    return this.getSlide(this._getSlideIndex(id));
  },

  getCurrentSlide: function() {
    return this.getSlideById(this.current_id);
  },


  /*  Display
  ================================================== */
  updateDisplay: function() {
    if (this.ready) {
      this._updateDisplay();
    }
  },

    /*
      Compute the height of the navigation section of the Timeline, taking into account
      the possibility of an explicit height or height percentage, but also honoring the
      `timenav_height_min` option value. If `timenav_height` is specified it takes precedence over `timenav_height_percentage` but in either case, if the resultant pixel height is less than `options.timenav_height_min` then the value of `options.timenav_height_min` will be returned. (A minor adjustment is made to the returned value to account for marker padding.)

      Arguments:
      @timenav_height (optional): an integer value for the desired height in pixels
      @timenav_height_percentage (optional): an integer between 1 and 100

     */
  _calculateTimeNavHeight: function(timenav_height, timenav_height_percentage) {

    var height = 0;

    if (timenav_height) {
      height = timenav_height;
    } else {
      if (this.options.timenav_height_percentage || timenav_height_percentage) {
        if (timenav_height_percentage) {
          height = Math.round((this.options.height/100)*timenav_height_percentage);
        } else {
          height = Math.round((this.options.height/100)*this.options.timenav_height_percentage);
        }

      }
    }

    // Set new minimum based on how many rows needed
    if (this._timenav.ready) {
      if (this.options.timenav_height_min < this._timenav.getMinimumHeight()) {
        this.options.timenav_height_min = this._timenav.getMinimumHeight();
      }
    }

    // If height is less than minimum set it to minimum
    if (height < this.options.timenav_height_min) {
      height = this.options.timenav_height_min;
    }

    height = height - (this.options.marker_padding * 2);

    return height;
  },

  /*  Private Methods
  ================================================== */

  // Update View
  _updateDisplay: function(timenav_height, animate, d) {
    var duration    = this.options.duration,
    display_class   = this.options.base_class,
    menu_position   = 0,
    self      = this;

    if (d) {
      duration = d;
    }

    // Update width and height
    this.options.width = this._el.container.offsetWidth;
    this.options.height = this._el.container.offsetHeight;

    // Check if skinny
    if (this.options.width <= this.options.skinny_size) {
      display_class += " tl-skinny";
      this.options.layout = "portrait";
    } else if (this.options.width <= this.options.medium_size) {
      display_class += " tl-medium";
      this.options.layout = "landscape";
    } else {
      this.options.layout = "landscape";
    }

    // Detect Mobile and Update Orientation on Touch devices
    if (TL.Browser.touch) {
      this.options.layout = TL.Browser.orientation();
    }

    if (TL.Browser.mobile) {
      display_class += " tl-mobile";
      // Set TimeNav Height
      this.options.timenav_height = this._calculateTimeNavHeight(timenav_height, this.options.timenav_mobile_height_percentage);
    } else {
      // Set TimeNav Height
      this.options.timenav_height = this._calculateTimeNavHeight(timenav_height);
    }

    // LAYOUT
    if (this.options.layout == "portrait") {
      // Portrait
      display_class += " tl-layout-portrait";

    } else {
      // Landscape
      display_class += " tl-layout-landscape";

    }

    // Set StorySlider Height
    this.options.storyslider_height = (this.options.height - this.options.timenav_height);

    // Positon Menu
    if (this.options.timenav_position == "top") {
      menu_position = ( Math.ceil(this.options.timenav_height)/2 ) - (this._el.menubar.offsetHeight/2) - (39/2) ;
    } else {
      menu_position = Math.round(this.options.storyslider_height + 1 + ( Math.ceil(this.options.timenav_height)/2 ) - (this._el.menubar.offsetHeight/2) - (35/2));
    }


    if (animate) {

      // Animate TimeNav

      /*
      if (this.animator_timenav) {
      this.animator_timenav.stop();
      }

      this.animator_timenav = TL.Animate(this._el.timenav, {
      height:   (this.options.timenav_height) + "px",
      duration:   duration/4,
      easing:   TL.Ease.easeOutStrong,
      complete: function () {
      //self._map.updateDisplay(self.options.width, self.options.timenav_height, animate, d, self.options.menubar_height);
      }
      });
      */

      this._el.timenav.style.height = Math.ceil(this.options.timenav_height) + "px";

      // Animate StorySlider
      if (this.animator_storyslider) {
        this.animator_storyslider.stop();
      }
      this.animator_storyslider = TL.Animate(this._el.storyslider, {
        height:   this.options.storyslider_height + "px",
        duration:   duration/2,
        easing:   TL.Ease.easeOutStrong
      });

      // Animate Menubar
      if (this.animator_menubar) {
        this.animator_menubar.stop();
      }

      this.animator_menubar = TL.Animate(this._el.menubar, {
        top:  menu_position + "px",
        duration:   duration/2,
        easing:   TL.Ease.easeOutStrong
      });

    } else {
      // TimeNav
      this._el.timenav.style.height = Math.ceil(this.options.timenav_height) + "px";

      // StorySlider
      this._el.storyslider.style.height = this.options.storyslider_height + "px";

      // Menubar
      this._el.menubar.style.top = menu_position + "px";
    }

    if (this.message) {
      this.message.updateDisplay(this.options.width, this.options.height);
    }
    // Update Component Displays
    this._timenav.updateDisplay(this.options.width, this.options.timenav_height, animate);
    this._storyslider.updateDisplay(this.options.width, this.options.storyslider_height, animate, this.options.layout);

    // Apply class
    this._el.container.className = display_class;

  },

  // Update hashbookmark in the url bar
  _updateHashBookmark: function(id) {
    var hash = "#" + "event-" + id.toString();
    if (window.location.protocol != 'file:') {
      window.history.replaceState(null, "Browsing TimelineJS", hash);
    }
    this.fire("hash_updated", {unique_id:this.current_id, hashbookmark:"#" + "event-" + id.toString()}, this);
  },

  /*  Init
  ================================================== */
  // Initialize the data
  _initData: function(data) {
    var self = this;

    if (typeof data == 'string') {
      var self = this;
      TL.ConfigFactory.makeConfig(data, function(config) {
        self.setConfig(config);
      });
    } else if (TL.TimelineConfig == data.constructor) {
      this.setConfig(data);
    } else {
      this.setConfig(new TL.TimelineConfig(data));
    }
  },

  setConfig: function(config) {
    this.config = config;
    this.config.validate();
    this._validateOptions();
    if (this.config.isValid()) {
        try {
          this._onDataLoaded();
      } catch(e) {
          this.showMessage("<strong>"+ this._('error') +":</strong> " + this._translateError(e));
      }
    } else {
        var translated_errs = [];

        for(var i = 0, errs = this.config.getErrors(); i < errs.length; i++) {
            translated_errs.push(this._translateError(errs[i]));
        }

      this.showMessage("<strong>"+ this._('error') +":</strong> " + translated_errs.join('<br>'));
      // should we set 'self.ready'? if not, it won't resize,
      // but most resizing would only work
      // if more setup happens
    }
  },
  _validateOptions: function() {
    // assumes that this.options and this.config have been set.
    var INTEGER_PROPERTIES = ['timenav_height', 'timenav_height_min', 'marker_height_min', 'marker_width_min', 'marker_padding', 'start_at_slide', 'slide_padding_lr'  ];

    for (var i = 0; i < INTEGER_PROPERTIES.length; i++) {
        var opt = INTEGER_PROPERTIES[i];
        var value = this.options[opt];
        valid = true;
        if (typeof(value) == 'number') {
          valid = (value == parseInt(value))
        } else if (typeof(value) == "string") {
          valid = (value.match(/^\s*(\-?\d+)?\s*$/));
        }
        if (!valid) {
          this.config.logError({ message_key: 'invalid_integer_option', detail: opt });
        }
    }
  },
  // Initialize the layout
  _initLayout: function () {
    var self = this;

        this.message.removeFrom(this._el.container);
    this._el.container.innerHTML = "";

    // Create Layout
    if (this.options.timenav_position == "top") {
      this._el.timenav		= TL.Dom.create('div', 'tl-timenav', this._el.container);
      this._el.storyslider	= TL.Dom.create('div', 'tl-storyslider', this._el.container);
    } else {
      this._el.storyslider  	= TL.Dom.create('div', 'tl-storyslider', this._el.container);
      this._el.timenav		= TL.Dom.create('div', 'tl-timenav', this._el.container);
    }

    this._el.menubar			= TL.Dom.create('div', 'tl-menubar', this._el.container);


    // Initial Default Layout
    this.options.width        = this._el.container.offsetWidth;
    this.options.height       = this._el.container.offsetHeight;
    this._el.storyslider.style.top  = "1px";

    // Set TimeNav Height
    this.options.timenav_height = this._calculateTimeNavHeight(this.options.timenav_height);

    // Create TimeNav
    this._timenav = new TL.TimeNav(this._el.timenav, this.config, this.options);
    this._timenav.on('loaded', this._onTimeNavLoaded, this);
    this._timenav.on('update_timenav_min', this._updateTimeNavHeightMin, this);
    this._timenav.options.height = this.options.timenav_height;
    this._timenav.init();

        // intial_zoom cannot be applied before the timenav has been created
        if (this.options.initial_zoom) {
            // at this point, this.options refers to the merged set of options
            this.setZoom(this.options.initial_zoom);
        }

    // Create StorySlider
    this._storyslider = new TL.StorySlider(this._el.storyslider, this.config, this.options);
    this._storyslider.on('loaded', this._onStorySliderLoaded, this);
    this._storyslider.init();

    // Create Menu Bar
    this._menubar = new TL.MenuBar(this._el.menubar, this._el.container, this.options);

    // LAYOUT
    if (this.options.layout == "portrait") {
      this.options.storyslider_height = (this.options.height - this.options.timenav_height - 1);
    } else {
      this.options.storyslider_height = (this.options.height - 1);
    }


    // Update Display
    this._updateDisplay(this._timenav.options.height, true, 2000);

  },

  /* Depends upon _initLayout because these events are on things the layout initializes */
  _initEvents: function () {
    // TimeNav Events
    this._timenav.on('change', this._onTimeNavChange, this);
    this._timenav.on('zoomtoggle', this._onZoomToggle, this);

    // StorySlider Events
    this._storyslider.on('change', this._onSlideChange, this);
    this._storyslider.on('colorchange', this._onColorChange, this);
    this._storyslider.on('nav_next', this._onStorySliderNext, this);
    this._storyslider.on('nav_previous', this._onStorySliderPrevious, this);

    // Menubar Events
    this._menubar.on('zoom_in', this._onZoomIn, this);
    this._menubar.on('zoom_out', this._onZoomOut, this);
    this._menubar.on('back_to_start', this._onBackToStart, this);

  },

  /* Analytics
  ================================================== */
  _initGoogleAnalytics: function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', this.options.ga_property_id, 'auto');
  },

  _initAnalytics: function() {
    if (this.options.ga_property_id === null) { return; }
    this._initGoogleAnalytics();
        ga('send', 'pageview');
    var events = this.options.track_events;
    for (i=0; i < events.length; i++) {
      var event_ = events[i];
      this.addEventListener(event_, function(e) {
        ga('send', 'event', e.type, 'clicked');
      });
    }
  },

  _onZoomToggle: function(e) {
    if (e.zoom == "in") {
      this._menubar.toogleZoomIn(e.show);
    } else if (e.zoom == "out") {
      this._menubar.toogleZoomOut(e.show);
    }

  },

  /* Get index of event by id
  ================================================== */
  _getEventIndex: function(id) {
    for(var i = 0; i < this.config.events.length; i++) {
      if(id == this.config.events[i].unique_id) {
        return i;
      }
    }
    return -1;
  },

  /*  Get index of slide by id
  ================================================== */
  _getSlideIndex: function(id) {
    if(this.config.title && this.config.title.unique_id == id) {
      return 0;
    }
    for(var i = 0; i < this.config.events.length; i++) {
      if(id == this.config.events[i].unique_id) {
        return this.config.title ? i+1 : i;
      }
    }
    return -1;
  },

  /*  Events
  ================================================== */

  _onDataLoaded: function(e) {
    this.fire("dataloaded");
    this._initLayout();
    this._initEvents();
    this._initAnalytics();
    if (this.message) {
      this.message.hide();
    }

    this.ready = true;

  },

  showMessage: function(msg) {
    if (this.message) {
      this.message.updateMessage(msg);
    } else {
      trace("No message display available.")
      trace(msg);
    }
  },

  _onColorChange: function(e) {
    this.fire("color_change", {unique_id:this.current_id}, this);
    if (e.color || e.image) {

    } else {

    }
  },

  _onSlideChange: function(e) {
    if (this.current_id != e.unique_id) {
      this.current_id = e.unique_id;
      this._timenav.goToId(this.current_id);
      this._onChange(e);
    }
  },

  _onTimeNavChange: function(e) {
    if (this.current_id != e.unique_id) {
      this.current_id = e.unique_id;
      this._storyslider.goToId(this.current_id);
      this._onChange(e);
    }
  },

  _onChange: function(e) {
    this.fire("change", {unique_id:this.current_id}, this);
    if (this.options.hash_bookmark && this.current_id) {
      this._updateHashBookmark(this.current_id);
    }
  },

  _onBackToStart: function(e) {
    this._storyslider.goTo(0);
    this.fire("back_to_start", {unique_id:this.current_id}, this);
  },

  /**
   * Zoom in and zoom out should be part of the public API.
   */
  zoomIn: function() {
      this._timenav.zoomIn();
  },
  zoomOut: function() {
      this._timenav.zoomOut();
  },

  setZoom: function(level) {
      this._timenav.setZoom(level);
  },

  _onZoomIn: function(e) {
    this._timenav.zoomIn();
    this.fire("zoom_in", {zoom_level:this._timenav.options.scale_factor}, this);
  },

  _onZoomOut: function(e) {
    this._timenav.zoomOut();
    this.fire("zoom_out", {zoom_level:this._timenav.options.scale_factor}, this);
  },

  _onTimeNavLoaded: function() {
    this._loaded.timenav = true;
    this._onLoaded();
  },

  _onStorySliderLoaded: function() {
    this._loaded.storyslider = true;
    this._onLoaded();
  },

  _onStorySliderNext: function(e) {
    this.fire("nav_next", e);
  },

  _onStorySliderPrevious: function(e) {
    this.fire("nav_previous", e);
  },

  _onLoaded: function() {
    if (this._loaded.storyslider && this._loaded.timenav) {
      this.fire("loaded", this.config);
      // Go to proper slide
      if (this.options.hash_bookmark && window.location.hash != "") {
        this.goToId(window.location.hash.replace("#event-", ""));
      } else {
        if( TL.Util.isTrue(this.options.start_at_end) || this.options.start_at_slide > this.config.events.length ) {
          this.goToEnd();
        } else {
          this.goTo(this.options.start_at_slide);
        }
        if (this.options.hash_bookmark ) {
          this._updateHashBookmark(this.current_id);
        }
      }

    }
  }

});

TL.Timeline.source_path = (function() {
  var script_tags = document.getElementsByTagName('script');
  var src = script_tags[script_tags.length-1].src;
  return src.substr(0,src.lastIndexOf('/'));
})();
/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */


(function (window, document, $, undefined) {
	"use strict";

	var H = $("html"),
		W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		IE =  navigator.userAgent.match(/msie/i),
		didUpdate	= null,
		isTouch		= document.createTouch !== undefined,

		isQuery	= function(obj) {
			return obj && obj.hasOwnProperty && obj instanceof $;
		},
		isString = function(str) {
			return str && $.type(str) === "string";
		},
		isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		},
		isScrollable = function(el) {
			return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
		},
		getScalar = function(orig, dim) {
			var value = parseInt(orig, 10) || 0;

			if (dim && isPercentage(orig)) {
				value = F.getViewport()[ dim ] / 100 * value;
			}

			return Math.ceil(value);
		},
		getValue = function(value, dim) {
			return getScalar(value, dim) + 'px';
		};

	$.extend(F, {
		// The current version of fancyBox
		version: '2.1.5',

		defaults: {
			padding : 15,
			margin  : 20,

			width     : 800,
			height    : 600,
			minWidth  : 100,
			minHeight : 100,
			maxWidth  : 9999,
			maxHeight : 9999,
			pixelRatio: 1, // Set to 2 for retina display support

			autoSize   : true,
			autoHeight : false,
			autoWidth  : false,

			autoResize  : true,
			autoCenter  : !isTouch,
			fitToView   : true,
			aspectRatio : false,
			topRatio    : 0.5,
			leftRatio   : 0.5,

			scrolling : 'auto', // 'auto', 'yes' or 'no'
			wrapCSS   : '',

			arrows     : true,
			closeBtn   : true,
			closeClick : false,
			nextClick  : false,
			mouseWheel : true,
			autoPlay   : false,
			playSpeed  : 3000,
			preload    : 3,
			modal      : false,
			loop       : true,

			ajax  : {
				dataType : 'html',
				headers  : { 'X-fancyBox': true }
			},
			iframe : {
				scrolling : 'auto',
				preload   : true
			},
			swf : {
				wmode: 'transparent',
				allowfullscreen   : 'true',
				allowscriptaccess : 'always'
			},

			keys  : {
				next : {
					13 : 'left', // enter
					34 : 'up',   // page down
					39 : 'left', // right arrow
					40 : 'up'    // down arrow
				},
				prev : {
					8  : 'right',  // backspace
					33 : 'down',   // page up
					37 : 'right',  // left arrow
					38 : 'down'    // up arrow
				},
				close  : [27], // escape key
				play   : [32], // space - start/stop slideshow
				toggle : [70]  // letter "f" - toggle fullscreen
			},

			direction : {
				next : 'left',
				prev : 'right'
			},

			scrollOutside  : true,

			// Override some properties
			index   : 0,
			type    : null,
			href    : null,
			content : null,
			title   : null,

			// HTML templates
			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image    : '<img class="fancybox-image" src="{href}" alt="" />',
				iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
				error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect  : 'fade', // 'elastic', 'fade' or 'none'
			openSpeed   : 250,
			openEasing  : 'swing',
			openOpacity : true,
			openMethod  : 'zoomIn',

			// Closing fancyBox
			closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed   : 250,
			closeEasing  : 'swing',
			closeOpacity : true,
			closeMethod  : 'zoomOut',

			// Changing next gallery item
			nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
			nextSpeed  : 250,
			nextEasing : 'swing',
			nextMethod : 'changeIn',

			// Changing previous gallery item
			prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
			prevSpeed  : 250,
			prevEasing : 'swing',
			prevMethod : 'changeOut',

			// Enable default helpers
			helpers : {
				overlay : true,
				title   : true
			},

			// Callbacks
			onCancel     : $.noop, // If canceling
			beforeLoad   : $.noop, // Before loading
			afterLoad    : $.noop, // After loading
			beforeShow   : $.noop, // Before changing in current item
			afterShow    : $.noop, // After opening
			beforeChange : $.noop, // Before changing gallery item
			beforeClose  : $.noop, // Before closing
			afterClose   : $.noop  // After closing
		},

		//Current state
		group    : {}, // Selected group
		opts     : {}, // Group options
		previous : null,  // Previous element
		coming   : null,  // Element being loaded
		current  : null,  // Currently loaded element
		isActive : false, // Is activated
		isOpen   : false, // Is currently open
		isOpened : false, // Have been fully opened at least once

		wrap  : null,
		skin  : null,
		outer : null,
		inner : null,

		player : {
			timer    : null,
			isActive : false
		},

		// Loaders
		ajaxLoad   : null,
		imgPreload : null,

		// Some collections
		transitions : {},
		helpers     : {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			if (!group) {
				return;
			}

			if (!$.isPlainObject(opts)) {
				opts = {};
			}

			// Close if already active
			if (false === F.close(true)) {
				return;
			}

			// Normalize group
			if (!$.isArray(group)) {
				group = isQuery(group) ? $(group).get() : [group];
			}

			// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
			$.each(group, function(i, element) {
				var obj = {},
					href,
					title,
					content,
					type,
					rez,
					hrefParts,
					selector;

				if ($.type(element) === "object") {
					// Check if is DOM element
					if (element.nodeType) {
						element = $(element);
					}

					if (isQuery(element)) {
						obj = {
							href    : element.data('fancybox-href') || element.attr('href'),
							title   : element.data('fancybox-title') || element.attr('title'),
							isDom   : true,
							element : element
						};

						if ($.metadata) {
							$.extend(true, obj, element.metadata());
						}

					} else {
						obj = element;
					}
				}

				href  = opts.href  || obj.href || (isString(element) ? element : null);
				title = opts.title !== undefined ? opts.title : obj.title || '';

				content = opts.content || obj.content;
				type    = content ? 'html' : (opts.type  || obj.type);

				if (!type && obj.isDom) {
					type = element.data('fancybox-type');

					if (!type) {
						rez  = element.prop('class').match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (isString(href)) {
					// Try to guess the content type
					if (!type) {
						if (F.isImage(href)) {
							type = 'image';

						} else if (F.isSWF(href)) {
							type = 'swf';

						} else if (href.charAt(0) === '#') {
							type = 'inline';

						} else if (isString(element)) {
							type    = 'html';
							content = element;
						}
					}

					// Split url into two pieces with source url and content selector, e.g,
					// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
					if (type === 'ajax') {
						hrefParts = href.split(/\s+/, 2);
						href      = hrefParts.shift();
						selector  = hrefParts.shift();
					}
				}

				if (!content) {
					if (type === 'inline') {
						if (href) {
							content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

						} else if (obj.isDom) {
							content = element;
						}

					} else if (type === 'html') {
						content = href;

					} else if (!type && !href && obj.isDom) {
						type    = 'inline';
						content = element;
					}
				}

				$.extend(obj, {
					href     : href,
					type     : type,
					content  : content,
					title    : title,
					selector : selector
				});

				group[ i ] = obj;
			});

			// Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			// All options are merged recursive except keys
			if (opts.keys !== undefined) {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			return F._start(F.opts.index);
		},

		// Cancel image loading or abort ajax request
		cancel: function () {
			var coming = F.coming;

			if (!coming || false === F.trigger('onCancel')) {
				return;
			}

			F.hideLoading();

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onerror = null;
			}

			if (coming.wrap) {
				coming.wrap.stop(true, true).trigger('onReset').remove();
			}

			F.coming = null;

			// If the first item has been canceled, then clear everything
			if (!F.current) {
				F._afterZoomOut( coming );
			}
		},

		// Start closing animation if is open; remove immediately if opening/closing
		close: function (event) {
			F.cancel();

			if (false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			if (!F.isActive) {
				return;
			}

			if (!F.isOpen || event === true) {
				$('.fancybox-wrap').stop(true).trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;
				F.isClosing = true;

				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true, true).removeClass('fancybox-opened');

				F.transitions[ F.current.closeMethod ]();
			}
		},

		// Manage slideshow:
		//   $.fancybox.play(); - toggle slideshow
		//   $.fancybox.play( true ); - start
		//   $.fancybox.play( false ); - stop
		play: function ( action ) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					D.unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						D.bind({
							'onCancel.player beforeClose.player' : stop,
							'onUpdate.player'   : set,
							'beforeLoad.player' : clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (action === true || (!F.player.isActive && action !== false)) {
				start();
			} else {
				stop();
			}
		},

		// Navigate to next gallery item
		next: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.next;
				}

				F.jumpto(current.index + 1, direction, 'next');
			}
		},

		// Navigate to previous gallery item
		prev: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.prev;
				}

				F.jumpto(current.index - 1, direction, 'prev');
			}
		},

		// Navigate to gallery item by index
		jumpto: function ( index, direction, router ) {
			var current = F.current;

			if (!current) {
				return;
			}

			index = getScalar(index);

			F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
			F.router    = router || 'jumpto';

			if (current.loop) {
				if (index < 0) {
					index = current.group.length + (index % current.group.length);
				}

				index = index % current.group.length;
			}

			if (current.group[ index ] !== undefined) {
				F.cancel();

				F._start(index);
			}
		},

		// Center inside viewport and toggle position type to fixed or absolute if needed
		reposition: function (e, onlyAbsolute) {
			var current = F.current,
				wrap    = current ? current.wrap : null,
				pos;

			if (wrap) {
				pos = F._getPosition(onlyAbsolute);

				if (e && e.type === 'scroll') {
					delete pos.position;

					wrap.stop(true, true).animate(pos, 200);

				} else {
					wrap.css(pos);

					current.pos = $.extend({}, current.dim, pos);
				}
			}
		},

		update: function (e) {
			var type = (e && e.type),
				anyway = !type || type === 'orientationchange';

			if (anyway) {
				clearTimeout(didUpdate);

				didUpdate = null;
			}

			if (!F.isOpen || didUpdate) {
				return;
			}

			didUpdate = setTimeout(function() {
				var current = F.current;

				if (!current || F.isClosing) {
					return;
				}

				F.wrap.removeClass('fancybox-tmp');

				if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
					F._setDimension();
				}

				if (!(type === 'scroll' && current.canShrink)) {
					F.reposition(e);
				}

				F.trigger('onUpdate');

				didUpdate = null;

			}, (anyway && !isTouch ? 0 : 300));
		},

		// Shrink content to fit inside viewport or restore if resized
		toggle: function ( action ) {
			if (F.isOpen) {
				F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

				// Help browser to restore document dimensions
				if (isTouch) {
					F.wrap.removeAttr('style').addClass('fancybox-tmp');

					F.trigger('onUpdate');
				}

				F.update();
			}
		},

		hideLoading: function () {
			D.unbind('.loading');

			$('#fancybox-loading').remove();
		},

		showLoading: function () {
			var el, viewport;

			F.hideLoading();

			el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

			// If user will press the escape-button, the request will be canceled
			D.bind('keydown.loading', function(e) {
				if ((e.which || e.keyCode) === 27) {
					e.preventDefault();

					F.cancel();
				}
			});

			if (!F.defaults.fixed) {
				viewport = F.getViewport();

				el.css({
					position : 'absolute',
					top  : (viewport.h * 0.5) + viewport.y,
					left : (viewport.w * 0.5) + viewport.x
				});
			}
		},

		getViewport: function () {
			var locked = (F.current && F.current.locked) || false,
				rez    = {
					x: W.scrollLeft(),
					y: W.scrollTop()
				};

			if (locked) {
				rez.w = locked[0].clientWidth;
				rez.h = locked[0].clientHeight;

			} else {
				// See http://bugs.jquery.com/ticket/6724
				rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
				rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
			}

			return rez;
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap && isQuery(F.wrap)) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys;

			if (!current) {
				return;
			}

			// Changing document height on iOS devices triggers a 'resize' event,
			// that can change document height... repeating infinitely
			W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

			keys = current.keys;

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code   = e.which || e.keyCode,
						target = e.target || e.srcElement;

					// Skip esc key if loading, because showLoading will cancel preloading
					if (code === 27 && F.coming) {
						return false;
					}

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
						$.each(keys, function(i, val) {
							if (current.group.length > 1 && val[ code ] !== undefined) {
								F[ i ]( val[ code ] );

								e.preventDefault();
								return false;
							}

							if ($.inArray(code, val) > -1) {
								F[ i ] ();

								e.preventDefault();
								return false;
							}
						});
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel) {
				F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
					var target = e.target || null,
						parent = $(target),
						canScroll = false;

					while (parent.length) {
						if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
							break;
						}

						canScroll = isScrollable( parent[0] );
						parent    = $(parent).parent();
					}

					if (delta !== 0 && !canScroll) {
						if (F.group.length > 1 && !current.canShrink) {
							if (deltaY > 0 || deltaX > 0) {
								F.prev( deltaY > 0 ? 'down' : 'left' );

							} else if (deltaY < 0 || deltaX < 0) {
								F.next( deltaY < 0 ? 'up' : 'right' );
							}

							e.preventDefault();
						}
					}
				});
			}
		},

		trigger: function (event, o) {
			var ret, obj = o || F.coming || F.current;

			if (!obj) {
				return;
			}

			if ($.isFunction( obj[event] )) {
				ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
			}

			if (ret === false) {
				return false;
			}

			if (obj.helpers) {
				$.each(obj.helpers, function (helper, opts) {
					if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
						F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
					}
				});
			}

			D.trigger(event);
		},

		isImage: function (str) {
			return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
		},

		isSWF: function (str) {
			return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				obj,
				href,
				type,
				margin,
				padding;

			index = getScalar( index );
			obj   = F.group[ index ] || null;

			if (!obj) {
				return false;
			}

			coming = $.extend(true, {}, F.opts, obj);

			// Convert margin and padding properties to array - top, right, bottom, left
			margin  = coming.margin;
			padding = coming.padding;

			if ($.type(margin) === 'number') {
				coming.margin = [margin, margin, margin, margin];
			}

			if ($.type(padding) === 'number') {
				coming.padding = [padding, padding, padding, padding];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn   : false,
					closeClick : false,
					nextClick  : false,
					arrows     : false,
					mouseWheel : false,
					keys       : null,
					helpers: {
						overlay : {
							closeClick : false
						}
					}
				});
			}

			// 'autoSize' property is a shortcut, too
			if (coming.autoSize) {
				coming.autoWidth = coming.autoHeight = true;
			}

			if (coming.width === 'auto') {
				coming.autoWidth = true;
			}

			if (coming.height === 'auto') {
				coming.autoHeight = true;
			}

			/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */

			coming.group  = F.group;
			coming.index  = index;

			// Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;

				return;
			}

			type = coming.type;
			href = coming.href;

			if (!type) {
				F.coming = null;

				//If we can not determine content type then drop silently or display next/prev item if looping through gallery
				if (F.current && F.router && F.router !== 'jumpto') {
					F.current.index = index;

					return F[ F.router ]( F.direction );
				}

				return false;
			}

			F.isActive = true;

			if (type === 'image' || type === 'swf') {
				coming.autoHeight = coming.autoWidth = false;
				coming.scrolling  = 'visible';
			}

			if (type === 'image') {
				coming.aspectRatio = true;
			}

			if (type === 'iframe' && isTouch) {
				coming.scrolling = 'scroll';
			}

			// Build the neccessary markup
			coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

			$.extend(coming, {
				skin  : $('.fancybox-skin',  coming.wrap),
				outer : $('.fancybox-outer', coming.wrap),
				inner : $('.fancybox-inner', coming.wrap)
			});

			$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
				coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
			});

			F.trigger('onReady');

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content || !coming.content.length) {
					return F._error( 'content' );
				}

			} else if (!href) {
				return F._error( 'href' );
			}

			if (type === 'image') {
				F._loadImage();

			} else if (type === 'ajax') {
				F._loadAjax();

			} else if (type === 'iframe') {
				F._loadIframe();

			} else {
				F._afterLoad();
			}
		},

		_error: function ( type ) {
			$.extend(F.coming, {
				type       : 'html',
				autoWidth  : true,
				autoHeight : true,
				minWidth   : 0,
				minHeight  : 0,
				scrolling  : 'no',
				hasError   : type,
				content    : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			var img = F.imgPreload = new Image();

			img.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width  = this.width / F.opts.pixelRatio;
				F.coming.height = this.height / F.opts.pixelRatio;

				F._afterLoad();
			};

			img.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			img.src = F.coming.href;

			if (img.complete !== true) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			var coming = F.coming;

			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
				url: coming.href,
				error: function (jqXHR, textStatus) {
					if (F.coming && textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_loadIframe: function() {
			var coming = F.coming,
				iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
					.attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
					.attr('src', coming.href);

			// This helps IE
			$(coming.wrap).bind('onReset', function () {
				try {
					$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
				} catch (e) {}
			});

			if (coming.iframe.preload) {
				F.showLoading();

				iframe.one('load', function() {
					$(this).data('ready', 1);

					// iOS will lose scrolling if we resize
					if (!isTouch) {
						$(this).bind('load.fb', F.update);
					}

					// Without this trick:
					//   - iframe won't scroll on iOS devices
					//   - IE7 sometimes displays empty iframe
					$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

					F._afterLoad();
				});
			}

			coming.content = iframe.appendTo( coming.inner );

			if (!coming.iframe.preload) {
				F._afterLoad();
			}
		},

		_preloadImages: function() {
			var group   = F.group,
				current = F.current,
				len     = group.length,
				cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
				item,
				i;

			for (i = 1; i <= cnt; i += 1) {
				item = group[ (current.index + i ) % len ];

				if (item.type === 'image' && item.href) {
					new Image().src = item.href;
				}
			}
		},

		_afterLoad: function () {
			var coming   = F.coming,
				previous = F.current,
				placeholder = 'fancybox-placeholder',
				current,
				content,
				type,
				scrolling,
				href,
				embed;

			F.hideLoading();

			if (!coming || F.isActive === false) {
				return;
			}

			if (false === F.trigger('afterLoad', coming, previous)) {
				coming.wrap.stop(true).trigger('onReset').remove();

				F.coming = null;

				return;
			}

			if (previous) {
				F.trigger('beforeChange', previous);

				previous.wrap.stop(true).removeClass('fancybox-opened')
					.find('.fancybox-item, .fancybox-nav')
					.remove();
			}

			F.unbindEvents();

			current   = coming;
			content   = coming.content;
			type      = coming.type;
			scrolling = coming.scrolling;

			$.extend(F, {
				wrap  : current.wrap,
				skin  : current.skin,
				outer : current.outer,
				inner : current.inner,
				current  : current,
				previous : previous
			});

			href = current.href;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					if (current.selector) {
						content = $('<div>').html(content).find(current.selector);

					} else if (isQuery(content)) {
						if (!content.data(placeholder)) {
							content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
						}

						content = content.show().detach();

						current.wrap.bind('onReset', function () {
							if ($(this).find(content).length) {
								content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
							}
						});
					}
				break;

				case 'image':
					content = current.tpl.image.replace('{href}', href);
				break;

				case 'swf':
					content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
					embed   = '';

					$.each(current.swf, function(name, val) {
						content += '<param name="' + name + '" value="' + val + '"></param>';
						embed   += ' ' + name + '="' + val + '"';
					});

					content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
				break;
			}

			if (!(isQuery(content) && content.parent().is(current.inner))) {
				current.inner.append( content );
			}

			// Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			// Set scrolling before calculating dimensions
			current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			// Set initial dimensions and start position
			F._setDimension();

			F.reposition();

			F.isOpen = false;
			F.coming = null;

			F.bindEvents();

			if (!F.isOpened) {
				$('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

			} else if (previous.prevMethod) {
				F.transitions[ previous.prevMethod ]();
			}

			F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

			F._preloadImages();
		},

		_setDimension: function () {
			var viewport   = F.getViewport(),
				steps      = 0,
				canShrink  = false,
				canExpand  = false,
				wrap       = F.wrap,
				skin       = F.skin,
				inner      = F.inner,
				current    = F.current,
				width      = current.width,
				height     = current.height,
				minWidth   = current.minWidth,
				minHeight  = current.minHeight,
				maxWidth   = current.maxWidth,
				maxHeight  = current.maxHeight,
				scrolling  = current.scrolling,
				scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
				margin     = current.margin,
				wMargin    = getScalar(margin[1] + margin[3]),
				hMargin    = getScalar(margin[0] + margin[2]),
				wPadding,
				hPadding,
				wSpace,
				hSpace,
				origWidth,
				origHeight,
				origMaxWidth,
				origMaxHeight,
				ratio,
				width_,
				height_,
				maxWidth_,
				maxHeight_,
				iframe,
				body;

			// Reset dimensions so we could re-check actual size
			wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

			wPadding = getScalar(skin.outerWidth(true)  - skin.width());
			hPadding = getScalar(skin.outerHeight(true) - skin.height());

			// Any space between content and viewport (margin, padding, border, title)
			wSpace = wMargin + wPadding;
			hSpace = hMargin + hPadding;

			origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
			origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

			if (current.type === 'iframe') {
				iframe = current.content;

				if (current.autoHeight && iframe.data('ready') === 1) {
					try {
						if (iframe[0].contentWindow.document.location) {
							inner.width( origWidth ).height(9999);

							body = iframe.contents().find('body');

							if (scrollOut) {
								body.css('overflow-x', 'hidden');
							}

							origHeight = body.outerHeight(true);
						}

					} catch (e) {}
				}

			} else if (current.autoWidth || current.autoHeight) {
				inner.addClass( 'fancybox-tmp' );

				// Set width or height in case we need to calculate only one dimension
				if (!current.autoWidth) {
					inner.width( origWidth );
				}

				if (!current.autoHeight) {
					inner.height( origHeight );
				}

				if (current.autoWidth) {
					origWidth = inner.width();
				}

				if (current.autoHeight) {
					origHeight = inner.height();
				}

				inner.removeClass( 'fancybox-tmp' );
			}

			width  = getScalar( origWidth );
			height = getScalar( origHeight );

			ratio  = origWidth / origHeight;

			// Calculations for the content
			minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
			maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

			minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
			maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

			// These will be used to determine if wrap can fit in the viewport
			origMaxWidth  = maxWidth;
			origMaxHeight = maxHeight;

			if (current.fitToView) {
				maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
				maxHeight = Math.min(viewport.h - hSpace, maxHeight);
			}

			maxWidth_  = viewport.w - wMargin;
			maxHeight_ = viewport.h - hMargin;

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width  = maxWidth;
					height = getScalar(width / ratio);
				}

				if (height > maxHeight) {
					height = maxHeight;
					width  = getScalar(height * ratio);
				}

				if (width < minWidth) {
					width  = minWidth;
					height = getScalar(width / ratio);
				}

				if (height < minHeight) {
					height = minHeight;
					width  = getScalar(height * ratio);
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));

				if (current.autoHeight && current.type !== 'iframe') {
					inner.width( width );

					height = inner.height();
				}

				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			// Try to fit inside viewport (including the title)
			if (current.fitToView) {
				inner.width( width ).height( height );

				wrap.width( width + wPadding );

				// Real wrap dimensions
				width_  = wrap.width();
				height_ = wrap.height();

				if (current.aspectRatio) {
					while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
						if (steps++ > 19) {
							break;
						}

						height = Math.max(minHeight, Math.min(maxHeight, height - 10));
						width  = getScalar(height * ratio);

						if (width < minWidth) {
							width  = minWidth;
							height = getScalar(width / ratio);
						}

						if (width > maxWidth) {
							width  = maxWidth;
							height = getScalar(width / ratio);
						}

						inner.width( width ).height( height );

						wrap.width( width + wPadding );

						width_  = wrap.width();
						height_ = wrap.height();
					}

				} else {
					width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
					height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
				}
			}

			if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
				width += scrollOut;
			}

			inner.width( width ).height( height );

			wrap.width( width + wPadding );

			width_  = wrap.width();
			height_ = wrap.height();

			canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
			canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

			$.extend(current, {
				dim : {
					width	: getValue( width_ ),
					height	: getValue( height_ )
				},
				origWidth  : origWidth,
				origHeight : origHeight,
				canShrink  : canShrink,
				canExpand  : canExpand,
				wPadding   : wPadding,
				hPadding   : hPadding,
				wrapSpace  : height_ - skin.outerHeight(true),
				skinSpace  : skin.height() - height
			});

			if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
				inner.height('auto');
			}
		},

		_getPosition: function (onlyAbsolute) {
			var current  = F.current,
				viewport = F.getViewport(),
				margin   = current.margin,
				width    = F.wrap.width()  + margin[1] + margin[3],
				height   = F.wrap.height() + margin[0] + margin[2],
				rez      = {
					position: 'absolute',
					top  : margin[0],
					left : margin[3]
				};

			if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
				rez.position = 'fixed';

			} else if (!current.locked) {
				rez.top  += viewport.y;
				rez.left += viewport.x;
			}

			rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
			rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current;

			if (!current) {
				return;
			}

			F.isOpen = F.isOpened = true;

			F.wrap.css('overflow', 'visible').addClass('fancybox-opened');

			F.update();

			// Assign a click event
			if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
				F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
					if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
						e.preventDefault();

						F[ current.closeClick ? 'close' : 'next' ]();
					}
				});
			}

			// Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
					e.preventDefault();

					F.close();
				});
			}

			// Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
				}
			}

			F.trigger('afterShow');

			// Stop the slideshow if this is the last item
			if (!current.loop && current.index === current.group.length - 1) {
				F.play( false );

			} else if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play();
			}
		},

		_afterZoomOut: function ( obj ) {
			obj = obj || F.current;

			$('.fancybox-wrap').trigger('onReset').remove();

			$.extend(F, {
				group  : {},
				opts   : {},
				router : false,
				current   : null,
				isActive  : false,
				isOpened  : false,
				isOpen    : false,
				isClosing : false,
				wrap   : null,
				skin   : null,
				outer  : null,
				inner  : null
			});

			F.trigger('afterClose', obj);
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current  = F.current,
				element  = current.element,
				orig     = current.orig,
				pos      = {},
				width    = 50,
				height   = 50,
				hPadding = current.hPadding,
				wPadding = current.wPadding,
				viewport = F.getViewport();

			if (!orig && current.isDom && element.is(':visible')) {
				orig = element.find('img:first');

				if (!orig.length) {
					orig = element;
				}
			}

			if (isQuery(orig)) {
				pos = orig.offset();

				if (orig.is('img')) {
					width  = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
				pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
			}

			if (F.wrap.css('position') === 'fixed' || current.locked) {
				pos.top  -= viewport.y;
				pos.left -= viewport.x;
			}

			pos = {
				top     : getValue(pos.top  - hPadding * current.topRatio),
				left    : getValue(pos.left - wPadding * current.leftRatio),
				width   : getValue(width  + wPadding),
				height  : getValue(height + hPadding)
			};

			return pos;
		},

		step: function (now, fx) {
			var ratio,
				padding,
				value,
				prop       = fx.prop,
				current    = F.current,
				wrapSpace  = current.wrapSpace,
				skinSpace  = current.skinSpace;

			if (prop === 'width' || prop === 'height') {
				ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

				if (F.isClosing) {
					ratio = 1 - ratio;
				}

				padding = prop === 'width' ? current.wPadding : current.hPadding;
				value   = now - padding;

				F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
				F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
			}
		},

		zoomIn: function () {
			var current  = F.current,
				startPos = current.pos,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				endPos   = $.extend({opacity : 1}, startPos);

			// Remove "position" property that breaks older IE
			delete endPos.position;

			if (elastic) {
				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0.1;
				}

			} else if (effect === 'fade') {
				startPos.opacity = 0.1;
			}

			F.wrap.css(startPos).animate(endPos, {
				duration : effect === 'none' ? 0 : current.openSpeed,
				easing   : current.openEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomIn
			});
		},

		zoomOut: function () {
			var current  = F.current,
				effect   = current.closeEffect,
				elastic  = effect === 'elastic',
				endPos   = {opacity : 0.1};

			if (elastic) {
				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0.1;
				}
			}

			F.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.closeSpeed,
				easing   : current.closeEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomOut
			});
		},

		changeIn: function () {
			var current   = F.current,
				effect    = current.nextEffect,
				startPos  = current.pos,
				endPos    = { opacity : 1 },
				direction = F.direction,
				distance  = 200,
				field;

			startPos.opacity = 0.1;

			if (effect === 'elastic') {
				field = direction === 'down' || direction === 'up' ? 'top' : 'left';

				if (direction === 'down' || direction === 'right') {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
					endPos[ field ]   = '+=' + distance + 'px';

				} else {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
					endPos[ field ]   = '-=' + distance + 'px';
				}
			}

			// Workaround for http://bugs.jquery.com/ticket/12273
			if (effect === 'none') {
				F._afterZoomIn();

			} else {
				F.wrap.css(startPos).animate(endPos, {
					duration : current.nextSpeed,
					easing   : current.nextEasing,
					complete : F._afterZoomIn
				});
			}
		},

		changeOut: function () {
			var previous  = F.previous,
				effect    = previous.prevEffect,
				endPos    = { opacity : 0.1 },
				direction = F.direction,
				distance  = 200;

			if (effect === 'elastic') {
				endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
			}

			previous.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : previous.prevSpeed,
				easing   : previous.prevEasing,
				complete : function () {
					$(this).trigger('onReset').remove();
				}
			});
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		defaults : {
			closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
			speedOut   : 200,       // duration of fadeOut animation
			showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
			css        : {},        // custom CSS properties
			locked     : !isTouch,  // if true, the content will be locked into overlay
			fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
		},

		overlay : null,      // current handle
		fixed   : false,     // indicates if the overlay has position "fixed"
		el      : $('html'), // element that contains "the lock"

		// Public methods
		create : function(opts) {
			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.close();
			}

			this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( F.coming ? F.coming.parent : opts.parent );
			this.fixed   = false;

			if (opts.fixed && F.defaults.fixed) {
				this.overlay.addClass('fancybox-overlay-fixed');

				this.fixed = true;
			}
		},

		open : function(opts) {
			var that = this;

			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.overlay.unbind('.overlay').width('auto').height('auto');

			} else {
				this.create(opts);
			}

			if (!this.fixed) {
				W.bind('resize.overlay', $.proxy( this.update, this) );

				this.update();
			}

			if (opts.closeClick) {
				this.overlay.bind('click.overlay', function(e) {
					if ($(e.target).hasClass('fancybox-overlay')) {
						if (F.isActive) {
							F.close();
						} else {
							that.close();
						}

						return false;
					}
				});
			}

			this.overlay.css( opts.css ).show();
		},

		close : function() {
			var scrollV, scrollH;

			W.unbind('resize.overlay');

			if (this.el.hasClass('fancybox-lock')) {
				$('.fancybox-margin').removeClass('fancybox-margin');

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.removeClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			$('.fancybox-overlay').remove().hide();

			$.extend(this, {
				overlay : null,
				fixed   : false
			});
		},

		// Private, callbacks

		update : function () {
			var width = '100%', offsetWidth;

			// Reset width/height so it will not mess
			this.overlay.width(width).height('100%');

			// jQuery does not return reliable result for IE
			if (IE) {
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				if (D.width() > offsetWidth) {
					width = D.width();
				}

			} else if (D.width() > W.width()) {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		// This is where we can manipulate DOM, because later it would cause iframes to reload
		onReady : function (opts, obj) {
			var overlay = this.overlay;

			$('.fancybox-overlay').stop(true, true);

			if (!overlay) {
				this.create(opts);
			}

			if (opts.locked && this.fixed && obj.fixed) {
				if (!overlay) {
					this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
				}

				obj.locked = this.overlay.append( obj.wrap );
				obj.fixed  = false;
			}

			if (opts.showEarly === true) {
				this.beforeShow.apply(this, arguments);
			}
		},

		beforeShow : function(opts, obj) {
			var scrollV, scrollH;

			if (obj.locked) {
				if (this.margin !== false) {
					$('*').filter(function(){
						return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
					}).addClass('fancybox-margin');

					this.el.addClass('fancybox-margin');
				}

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.addClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			this.open(opts);
		},

		onUpdate : function() {
			if (!this.fixed) {
				this.update();
			}
		},

		afterClose: function (opts) {
			// Remove overlay if exists and fancyBox is not opening
			// (e.g., it is not being open using afterClose callback)
			//if (this.overlay && !F.isActive) {
			if (this.overlay && !F.coming) {
				this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
			}
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		defaults : {
			type     : 'float', // 'float', 'inside', 'outside' or 'over',
			position : 'bottom' // 'top' or 'bottom'
		},

		beforeShow: function (opts) {
			var current = F.current,
				text    = current.title,
				type    = opts.type,
				title,
				target;

			if ($.isFunction(text)) {
				text = text.call(current.element, current);
			}

			if (!isString(text) || $.trim(text) === '') {
				return;
			}

			title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

			switch (type) {
				case 'inside':
					target = F.skin;
				break;

				case 'outside':
					target = F.wrap;
				break;

				case 'over':
					target = F.inner;
				break;

				default: // 'float'
					target = F.skin;

					title.appendTo('body');

					if (IE) {
						title.width( title.width() );
					}

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
				break;
			}

			title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var index,
			that     = $(this),
			selector = this.selector || '',
			run      = function(e) {
				var what = $(this).blur(), idx = index, relType, relVal;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
					relType = options.groupAttr || 'data-fancybox-group';
					relVal  = what.attr(relType);

					if (!relVal) {
						relType = 'rel';
						relVal  = what.get(0)[ relType ];
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx  = what.index(this);
					}

					options.index = idx;

					// Stop an event from bubbling if everything is fine
					if (F.open(what, options) !== false) {
						e.preventDefault();
					}
				}
			};

		options = options || {};
		index   = options.index || 0;

		if (!selector || options.live === false) {
			that.unbind('click.fb-start').bind('click.fb-start', run);

		} else {
			D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
		}

		this.filter('[data-fancybox-start=1]').trigger('click');

		return this;
	};

	// Tests that need a body at doc ready
	D.ready(function() {
		var w1, w2;

		if ( $.scrollbarWidth === undefined ) {
			// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
			$.scrollbarWidth = function() {
				var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
					child  = parent.children(),
					width  = child.innerWidth() - child.height( 99 ).innerWidth();

				parent.remove();

				return width;
			};
		}

		if ( $.support.fixedPosition === undefined ) {
			$.support.fixedPosition = (function() {
				var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
					fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

				elem.remove();

				return fixed;
			}());
		}

		$.extend(F.defaults, {
			scrollbarWidth : $.scrollbarWidth(),
			fixed  : $.support.fixedPosition,
			parent : $('body')
		});

		//Get real width of page scroll-bar
		w1 = $(window).width();

		H.addClass('fancybox-lock-test');

		w2 = $(window).width();

		H.removeClass('fancybox-lock-test');

		$("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
	});

}(window, document, jQuery));

$(document).on('ready page:load', function () {
  if ($(".js").length > 0 ) {


    ;(function(window) {

    	'use strict';

    	// helper functions

    	/**
    	 * enable/disable page scrolling. from http://stackoverflow.com/a/4770179
    	 */
    	// left: 37, up: 38, right: 39, down: 40,
    	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    	var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    	function preventDefault(e) {
    	  e = e || window.event;
    	  if (e.preventDefault)
    		  e.preventDefault();
    	  e.returnValue = false;
    	}

    	function preventDefaultForScrollKeys(e) {
    		if (keys[e.keyCode]) {
    			preventDefault(e);
    			return false;
    		}
    	}

    	function disableScroll() {
    	  if (window.addEventListener) // older FF
    		  window.addEventListener('DOMMouseScroll', preventDefault, false);
    	  window.onwheel = preventDefault; // modern standard
    	  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    	  window.ontouchmove  = preventDefault; // mobile
    	  document.onkeydown  = preventDefaultForScrollKeys;
    	}

    	function enableScroll() {
    		if (window.removeEventListener)
    			window.removeEventListener('DOMMouseScroll', preventDefault, false);
    		window.onmousewheel = document.onmousewheel = null;
    		window.onwheel = null;
    		window.ontouchmove = null;
    		document.onkeydown = null;
    	}

    	/**
    	 * from https://davidwalsh.name/javascript-debounce-function
    	 */
    	function debounce(func, wait, immediate) {
    		var timeout;
    		return function() {
    			var context = this, args = arguments;
    			var later = function() {
    				timeout = null;
    				if (!immediate) func.apply(context, args);
    			};
    			var callNow = immediate && !timeout;
    			clearTimeout(timeout);
    			timeout = setTimeout(later, wait);
    			if (callNow) func.apply(context, args);
    		};
    	};

    	/**
    	 * from http://stackoverflow.com/a/7228322
    	 */
    	function randomIntFromInterval(min,max) {
    		return Math.floor(Math.random()*(max-min+1)+min);
    	}

    		// main page container
    	var mainContainer = document.querySelector('.view'),
    		// the grid element
    		gridEl = mainContainer.querySelector('.grid'),
    		// grid items
    		gridItems = [].slice.call($('.grid_item')),
    		// main title element
    		titleEl = mainContainer.querySelector('.title-wrap > .title--main'),
    		// main subtitle element
    		subtitleEl = mainContainer.querySelector('.title-wrap > .title--sub'),
    		// the fullscreen element/division that will slide up, giving the illusion the items will fall down
    		pagemover = mainContainer.querySelector('.page--mover'),
    		// the loading element shown while the images are loaded
    		loadingStatusEl = pagemover.querySelector('.la-square-loader'),
    		// window sizes (width and height)
    		winsize = {width: window.innerWidth, height: window.innerHeight},
    		// translation values (x and y): percentages of the item´s width and height; scale value; rotation (z) value
    		// these are the values that the 6 initial images will have
    		introPositions = [
    			{tx: -.6, ty:-.3, s:1.1, r:-20},
    			{tx: .2, ty:-.7, s:1.4, r:1},
    			{tx: .5, ty:-.5, s:1.3, r:15},
    			{tx: -.2, ty:-.4, s:1.4, r:-17},
    			{tx: -.15, ty:-.4, s:1.2, r:-5},
    			{tx: .7, ty:-.2, s:1.1, r:15}
    		],
    		// the phone
    		deviceEl = mainContainer.querySelector('.device'),
    		// the animated button that triggers the effect when clicked
    		showGridCtrl = document.getElementById('showgrid'),
    		// the title and subtitle shown on top of the grid
    		pageTitleEl = mainContainer.querySelector('.page__title > .page__title-main'),
    		pageSubTitleEl = mainContainer.querySelector('.page__title > .page__title-sub'),
    		// the grid´s load more button
    		loadMoreCtrl = mainContainer.querySelector('button.button--load'),
    		// true if the animation is currently running
    		isAnimating,
    		// true if the user scrolls (rather than clicking the down arrow)
    		scrolled,
    		// current view: stack | grid
    		view = 'stack';

    	function init() {
    		// appending a unique string to every image src as a workaround for an apparent Chrome issue with the imagesLoaded (cache is not cleared, premature firing seems to happen)
    		[].slice.call(gridEl.querySelectorAll('img')).forEach(function(el) { el.src += '?' + Number(new Date()); });

    		// disable scroll while loading images
    		classie.add(document.body, 'overflow');
    		disableScroll();
    		// preload images
    		imagesLoaded(gridEl, function() {
    			// enable page scroll again
    			enableScroll();
    			// controls the visibility of the grid items. Adding this class will make them visible.
    			classie.add(mainContainer, 'view--loaded');
    			// show initial view
    			showIntro();
    			// bind events
    			initEvents();
    		});
    	}

    	/**
    	 * shows the initial stack with the 6 images behind the phone
    	 */
    	function showIntro() {
    		// display the first set of 6 grid items behind the phone
    		gridItems.slice(0,6).forEach(function(item, pos) {
    			// first we position all the 6 items on the bottom of the page (item´s center is positioned on the middle of the page bottom)
    			// then we move them up and to the sides (extra values) and also apply a scale and rotation
    			var itemOffset = item.getBoundingClientRect(),
    				settings = introPositions[pos],
    				center = {
    					x : winsize.width/2 - (itemOffset.left + item.offsetWidth/2),
    					y : winsize.height - (itemOffset.top + item.offsetHeight/2)
    				};

    			// first position the items behind the phone
    			dynamics.css(item, {
    				opacity: 1,
    				translateX: center.x,
    				translateY: center.y,
    				scale: 0.5
    			});

    			// now animate each item to its final position
    			dynamics.animate(item, {
    				translateX: center.x + settings.tx*item.offsetWidth,
    				translateY: center.y + settings.ty*item.offsetWidth,
    				scale : settings.s,
    				rotateZ: settings.r
    			}, {
    				type: dynamics.bezier,
    				points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
    				duration: 1000,
    				delay: pos * 80
    			});
    		});

    		// also animate/slide the device in:
    		// first, push it slightly down (to make it complete out of the viewport we´d need to set the translateY to winsize.height * 0.45 --> 45vh)
    		dynamics.css(deviceEl, { translateY: winsize.height * 0.25 } );
    		// now animate it up
    		dynamics.animate(deviceEl, { translateY: 0 }, {
    			type: dynamics.bezier,
    			points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
    			duration: 1000
    		});
    	}

    	/**
    	 * bind/initialize the events
    	 */
    	function initEvents() {
    		// show the grid when the showGridCtrl is clicked
    		showGridCtrl.addEventListener('click', showGrid);

    		// show the grid when the user scrolls the page
    		var scrollfn = function() {
    			scrolled = true;
    			showGrid();
    			window.removeEventListener('scroll', scrollfn);
    		};
    		window.addEventListener('scroll', scrollfn);

    		// todo: show/load more grid items

    		// window resize: recalculate window sizes and reposition the 6 grid items behind the phone (if the grid view is not yet shown)
    		window.addEventListener('resize', debounce(function(ev) {
    			// reset window sizes
    			winsize = {width: window.innerWidth, height: window.innerHeight};

    			if( view === 'stack' ) {
    				gridItems.slice(0,6).forEach(function(item, pos) {
    					// first reset all items
    					dynamics.css(item, { scale: 1, translateX: 0, translateY: 0, rotateZ: 0 });

    					// now, recalculate..
    					var itemOffset = item.getBoundingClientRect(),
    						settings = introPositions[pos];

    					dynamics.css(item, {
    						translateX: winsize.width/2 - (itemOffset.left + item.offsetWidth/2) + settings.tx*item.offsetWidth,
    						translateY: winsize.height - (itemOffset.top + item.offsetHeight/2) + settings.ty*item.offsetWidth,
    						scale : settings.s,
    						rotateZ: settings.r
    					});
    				});
    			}
    		}, 10));
    	}

    	/**
    	 * shows the grid
    	 */
    	function showGrid() {
    		// return if currently animating
    		if( isAnimating ) return;
    		isAnimating = true;

    		// hide the showGrid ctrl
    		dynamics.css(showGridCtrl, {display: 'none'});

    		// main title animation
    		dynamics.animate(titleEl, { translateY: -winsize.height/2, opacity: 0 }, {
    			type: dynamics.bezier,
    			points: [{"x":0,"y":0,"cp":[{"x":0.7,"y":0}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
    			duration: 600
    		});

    		// main subtitle animation
    		dynamics.animate(subtitleEl, { translateY: -winsize.height/2, opacity: 0 }, {
    			type: dynamics.bezier,
    			points: [{"x":0,"y":0,"cp":[{"x":0.7,"y":0}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
    			duration: 600,
    			delay: 100
    		});

    		// device animation
    		dynamics.animate(deviceEl, { translateY: 500, opacity: 0 }, {
    			type: dynamics.bezier,
    			points: [{"x":0,"y":0,"cp":[{"x":0.7,"y":0}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
    			duration: 600
    		});

    		// pagemover animation
    		dynamics.animate(pagemover, { translateY: -winsize.height}, {
    			type: dynamics.bezier,
    			points: [{"x":0,"y":0,"cp":[{"x":0.7,"y":0}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
    			duration: 600,
    			delay: scrolled ? 0 : 120,
    			complete: function(el) {
    				// hide the pagemover
    				dynamics.css(el, { opacity: 0 });
    				// view is now ´grid´
    				view = 'grid';
    				classie.add(mainContainer, 'view--grid');
    			}
    		});

    		// items animation
    		gridItems.slice(0,6).forEach(function(item, pos) {
    			dynamics.stop(item);
    			dynamics.animate(item, { scale: 1, translateX: 0, translateY: 0, rotateZ: 0 }, {
    				type: dynamics.easeInOut,
    				duration: 600,
    				delay: scrolled ? 0 : 120
    			});
    		});

    		// page title animation
    		dynamics.css(pageTitleEl, { translateY: 200, opacity: 0 });
    		dynamics.animate(pageTitleEl, { translateY: 0, opacity: 1 }, {
    			type: dynamics.bezier,
    			points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
    			duration: 800,
    			delay: 400
    		});

    		// page subtitle animation
    		dynamics.css(pageSubTitleEl, { translateY: 150, opacity: 0 });
    		dynamics.animate(pageSubTitleEl, { translateY: 0, opacity: 1 }, {
    			type: dynamics.bezier,
    			points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
    			duration: 800,
    			delay: 500
    		});

    		// the remaining grid items
    		gridItems.slice(6).forEach(function(item) {
    			dynamics.css(item, { scale: 0, opacity: 0 });
    			dynamics.animate(item, { scale: 1, opacity: 1 }, {
    				type: dynamics.bezier,
    				points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
    				duration: 800,
    				delay: randomIntFromInterval(100,400)
    			});
    		});
    	}

    	/**
    	 * dummy fn: simulate the load of the next grid items
    	 */
    	function loadNextItems() {
    		// loadMoreCtrl button gets class button--loading. This will transform the button into a loading/animated button
    		classie.add(loadMoreCtrl, 'button--loading');
    		// the timeout serves to simulate the time that we would probably wait for the response
    		setTimeout(function() {
    			// hide button
    			classie.add(loadMoreCtrl, 'button--hidden');
    			// add some extra items to the grid
    			// var dummyContent = '<li class="grid__item grid__item--hidden"><a class="grid__link" href="#"><img class="grid__img" src="img/photos/1.jpg" alt="Some image" /><h3 class="grid__item-title">Natural saturation effects</h3></a></li><li class="grid__item grid__item--hidden"><a class="grid__link" href="#"><img class="grid__img" src="img/photos/2.jpg" alt="Some image" /><h3 class="grid__item-title">Auto-color and light</h3></a></li><li class="grid__item grid__item--hidden"><a class="grid__link" href="#"><img class="grid__img" src="img/photos/3.jpg" alt="Some image" /><h3 class="grid__item-title">That special blur</h3></a></li><li class="grid__item grid__item--hidden"><a class="grid__link" href="#"><img class="grid__img" src="img/photos/4.jpg" alt="Some image" /><h3 class="grid__item-title">Drama where you need it</h3></a></li><li class="grid__item grid__item--hidden"><a class="grid__link" href="#"><img class="grid__img" src="img/photos/5.jpg" alt="Some image" /><h3 class="grid__item-title">Realistic depth</h3></a></li><li class="grid__item grid__item--hidden"><a class="grid__link" href="#"><img class="grid__img" src="img/photos/6.jpg" alt="Some image" /><h3 class="grid__item-title">The common, but special</h3></a></li>';
    			gridEl.innerHTML += dummyContent;
    			[].slice.call(gridEl.querySelectorAll('.grid__item--hidden')).forEach(function(item) {
    				gridItems.push(item);
    				dynamics.css(item, { scale: 0, opacity: 0 });
    				classie.remove(item, 'grid__item--hidden');
    				dynamics.animate(item, { scale: 1, opacity: 1 }, {
    					type: dynamics.bezier,
    					points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
    					duration: 800,
    					delay: randomIntFromInterval(0,300)
    				});
    			});
    		}, 1500);
    	}

    	// force the scrolling to the top of the page (from http://stackoverflow.com/a/23312671)
    	window.onbeforeunload = function(){
    		window.scrollTo(0,0);
    	}

    	init();

    })(window);
  }
});
/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */


( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = classie;
} else {
  // browser global
  window.classie = classie;
}

})( window );
(function(){var t,e,n,r,i,o,s,a,l,u,f,h,c,p,m,d,g,y,v,b,w,x,M,k,S,T,C,F,H,R,q,X,Y,j,z,I,A,G,V,Z,E,O,L,D,P,W,N,$,B,U,K,J,Q,_,te,ee,ne=function(t,e){return function(){return t.apply(e,arguments)}};H=function(){return"visible"===document.visibilityState||null!=T.tests},j=function(){var t;return t=[],"undefined"!=typeof document&&null!==document&&document.addEventListener("visibilitychange",function(){var e,n,r,i;for(i=[],n=0,r=t.length;r>n;n++)e=t[n],i.push(e(H()));return i}),function(e){return t.push(e)}}(),x=function(t){var e,n,r;n={};for(e in t)r=t[e],n[e]=r;return n},b=function(t){var e;return e={},function(){var n,r,i,o,s;for(r="",o=0,s=arguments.length;s>o;o++)n=arguments[o],r+=n.toString()+",";return i=e[r],i||(e[r]=i=t.apply(this,arguments)),i}},Y=function(t){return function(e){var n,r,i;return e instanceof Array||e instanceof NodeList||e instanceof HTMLCollection?i=function(){var i,o,s;for(s=[],r=i=0,o=e.length;o>=0?o>i:i>o;r=o>=0?++i:--i)n=Array.prototype.slice.call(arguments,1),n.splice(0,0,e[r]),s.push(t.apply(this,n));return s}.apply(this,arguments):t.apply(this,arguments)}},d=function(t,e){var n,r,i;i=[];for(n in e)r=e[n],i.push(null!=t[n]?t[n]:t[n]=r);return i},g=function(t,e){var n,r,i;if(null!=t.style)return y(t,e);i=[];for(n in e)r=e[n],i.push(t[n]=r.format());return i},y=function(t,e){var n,r,i,o,s;e=z(e),o=[],n=R(t);for(r in e)s=e[r],_.contains(r)?o.push([r,s]):(s=null!=s.format?s.format():""+s+ee(r,s),n&&B.contains(r)?t.setAttribute(r,s):t.style[A(r)]=s);return o.length>0?n?(i=new l,i.applyProperties(o),t.setAttribute("transform",i.decompose().format())):(s=o.map(function(t){return te(t[0],t[1])}).join(" "),t.style[A("transform")]=s):void 0},R=function(t){var e,n;return"undefined"!=typeof SVGElement&&null!==SVGElement&&"undefined"!=typeof SVGSVGElement&&null!==SVGSVGElement?t instanceof SVGElement&&!(t instanceof SVGSVGElement):null!=(e=null!=(n=T.tests)&&"function"==typeof n.isSVG?n.isSVG(t):void 0)?e:!1},Z=function(t,e){var n;return n=Math.pow(10,e),Math.round(t*n)/n},u=function(){function t(t){var e,n,r;for(this.obj={},n=0,r=t.length;r>n;n++)e=t[n],this.obj[e]=1}return t.prototype.contains=function(t){return 1===this.obj[t]},t}(),Q=function(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})},G=new u("marginTop,marginLeft,marginBottom,marginRight,paddingTop,paddingLeft,paddingBottom,paddingRight,top,left,bottom,right,translateX,translateY,translateZ,perspectiveX,perspectiveY,perspectiveZ,width,height,maxWidth,maxHeight,minWidth,minHeight,borderRadius".split(",")),S=new u("rotate,rotateX,rotateY,rotateZ,skew,skewX,skewY,skewZ".split(",")),_=new u("translate,translateX,translateY,translateZ,scale,scaleX,scaleY,scaleZ,rotate,rotateX,rotateY,rotateZ,rotateC,rotateCX,rotateCY,skew,skewX,skewY,skewZ,perspective".split(",")),B=new u("accent-height,ascent,azimuth,baseFrequency,baseline-shift,bias,cx,cy,d,diffuseConstant,divisor,dx,dy,elevation,filterRes,fx,fy,gradientTransform,height,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,letter-spacing,limitingConeAngle,markerHeight,markerWidth,numOctaves,order,overline-position,overline-thickness,pathLength,points,pointsAtX,pointsAtY,pointsAtZ,r,radius,rx,ry,seed,specularConstant,specularExponent,stdDeviation,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,surfaceScale,target,targetX,targetY,transform,underline-position,underline-thickness,viewBox,width,x,x1,x2,y,y1,y2,z".split(",")),ee=function(t,e){return"number"!=typeof e?"":G.contains(t)?"px":S.contains(t)?"deg":""},te=function(t,e){var n,r;return n=(""+e).match(/^([0-9.-]*)([^0-9]*)$/),null!=n?(e=n[1],r=n[2]):e=parseFloat(e),e=Z(parseFloat(e),10),(null==r||""===r)&&(r=ee(t,e)),""+t+"("+e+r+")"},z=function(t){var e,n,r,i,o,s,a,l;r={};for(i in t)if(o=t[i],_.contains(i))if(n=i.match(/(translate|rotateC|rotate|skew|scale|perspective)(X|Y|Z|)/),n&&n[2].length>0)r[i]=o;else for(l=["X","Y","Z"],s=0,a=l.length;a>s;s++)e=l[s],r[n[1]+e]=o;else r[i]=o;return r},k=function(t){var e;return e="opacity"===t?1:0,""+e+ee(t,e)},C=function(t,e){var n,r,i,o,s,u,f,h,c,p,m;if(o={},n=R(t),null!=t.style)for(s=window.getComputedStyle(t,null),f=0,c=e.length;c>f;f++)r=e[f],_.contains(r)?null==o.transform&&(i=n?new l(null!=(m=t.transform.baseVal.consolidate())?m.matrix:void 0):a.fromTransform(s[A("transform")]),o.transform=i.decompose()):(u=s[r],null==u&&B.contains(r)&&(u=t.getAttribute(r)),(""===u||null==u)&&(u=k(r)),o[r]=M(u));else for(h=0,p=e.length;p>h;h++)r=e[h],o[r]=M(t[r]);return o},M=function(t){var e,n,a,l,u;for(a=[i,r,o,s],l=0,u=a.length;u>l;l++)if(n=a[l],e=n.create(t),null!=e)return e;return null},o=function(){function t(t){this.format=ne(this.format,this),this.interpolate=ne(this.interpolate,this),this.obj=t}return t.prototype.interpolate=function(e,n){var r,i,o,s,a;s=this.obj,r=e.obj,o={};for(i in s)a=s[i],o[i]=null!=a.interpolate?a.interpolate(r[i],n):a;return new t(o)},t.prototype.format=function(){return this.obj},t.create=function(e){var n,r,i;if(e instanceof Object){r={};for(n in e)i=e[n],r[n]=M(i);return new t(r)}return null},t}(),s=function(){function t(t,e,n){this.prefix=e,this.suffix=n,this.format=ne(this.format,this),this.interpolate=ne(this.interpolate,this),this.value=parseFloat(t)}return t.prototype.interpolate=function(e,n){var r,i;return i=this.value,r=e.value,new t((r-i)*n+i,e.prefix||this.prefix,e.suffix||this.suffix)},t.prototype.format=function(){return null==this.prefix&&null==this.suffix?Z(this.value,5):this.prefix+Z(this.value,5)+this.suffix},t.create=function(e){var n;return"string"!=typeof e?new t(e):(n=(""+e).match("([^0-9.+-]*)([0-9.+-]+)([^0-9.+-]*)"),null!=n?new t(n[2],n[1],n[3]):null)},t}(),r=function(){function t(t,e){this.values=t,this.sep=e,this.format=ne(this.format,this),this.interpolate=ne(this.interpolate,this)}return t.prototype.interpolate=function(e,n){var r,i,o,s,a,l;for(s=this.values,r=e.values,o=[],i=a=0,l=Math.min(s.length,r.length);l>=0?l>a:a>l;i=l>=0?++a:--a)o.push(null!=s[i].interpolate?s[i].interpolate(r[i],n):s[i]);return new t(o,this.sep)},t.prototype.format=function(){var t;return t=this.values.map(function(t){return null!=t.format?t.format():t}),null!=this.sep?t.join(this.sep):t},t.createFromArray=function(e,n){var r;return r=e.map(function(t){return M(t)||t}),r=r.filter(function(t){return null!=t}),new t(r,n)},t.create=function(e){var n,r,i,o,s;if(e instanceof Array)return t.createFromArray(e,null);if("string"==typeof e){for(i=[" ",",","|",";","/",":"],o=0,s=i.length;s>o;o++)if(r=i[o],n=e.split(r),n.length>1)return t.createFromArray(n,r);return null}},t}(),t=function(){function t(t,e){this.rgb=null!=t?t:{},this.format=e,this.toRgba=ne(this.toRgba,this),this.toRgb=ne(this.toRgb,this),this.toHex=ne(this.toHex,this)}return t.fromHex=function(e){var n,r;return n=e.match(/^#([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i),null!=n&&(e="#"+n[1]+n[1]+n[2]+n[2]+n[3]+n[3]),r=e.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i),null!=r?new t({r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16),a:1},"hex"):null},t.fromRgb=function(e){var n,r;return n=e.match(/^rgba?\(([0-9.]*), ?([0-9.]*), ?([0-9.]*)(?:, ?([0-9.]*))?\)$/),null!=n?new t({r:parseFloat(n[1]),g:parseFloat(n[2]),b:parseFloat(n[3]),a:parseFloat(null!=(r=n[4])?r:1)},null!=n[4]?"rgba":"rgb"):null},t.componentToHex=function(t){var e;return e=t.toString(16),1===e.length?"0"+e:e},t.prototype.toHex=function(){return"#"+t.componentToHex(this.rgb.r)+t.componentToHex(this.rgb.g)+t.componentToHex(this.rgb.b)},t.prototype.toRgb=function(){return"rgb("+this.rgb.r+", "+this.rgb.g+", "+this.rgb.b+")"},t.prototype.toRgba=function(){return"rgba("+this.rgb.r+", "+this.rgb.g+", "+this.rgb.b+", "+this.rgb.a+")"},t}(),i=function(){function e(t){this.color=t,this.format=ne(this.format,this),this.interpolate=ne(this.interpolate,this)}return e.prototype.interpolate=function(n,r){var i,o,s,a,l,u,f,h;for(a=this.color,i=n.color,s={},h=["r","g","b"],u=0,f=h.length;f>u;u++)o=h[u],l=Math.round((i.rgb[o]-a.rgb[o])*r+a.rgb[o]),s[o]=Math.min(255,Math.max(0,l));return o="a",l=Z((i.rgb[o]-a.rgb[o])*r+a.rgb[o],5),s[o]=Math.min(1,Math.max(0,l)),new e(new t(s,i.format))},e.prototype.format=function(){return"hex"===this.color.format?this.color.toHex():"rgb"===this.color.format?this.color.toRgb():"rgba"===this.color.format?this.color.toRgba():void 0},e.create=function(n){var r;if("string"==typeof n)return r=t.fromHex(n)||t.fromRgb(n),null!=r?new e(r):null},e}(),n=function(){function t(t){this.props=t,this.applyRotateCenter=ne(this.applyRotateCenter,this),this.format=ne(this.format,this),this.interpolate=ne(this.interpolate,this)}return t.prototype.interpolate=function(e,n){var r,i,o,s,a,l,u,f,h,c,p,m;for(o={},c=["translate","scale","rotate"],s=0,f=c.length;f>s;s++)for(i=c[s],o[i]=[],r=a=0,p=this.props[i].length;p>=0?p>a:a>p;r=p>=0?++a:--a)o[i][r]=(e.props[i][r]-this.props[i][r])*n+this.props[i][r];for(r=l=1;2>=l;r=++l)o.rotate[r]=e.props.rotate[r];for(m=["skew"],u=0,h=m.length;h>u;u++)i=m[u],o[i]=(e.props[i]-this.props[i])*n+this.props[i];return new t(o)},t.prototype.format=function(){return"translate("+this.props.translate.join(",")+") rotate("+this.props.rotate.join(",")+") skewX("+this.props.skew+") scale("+this.props.scale.join(",")+")"},t.prototype.applyRotateCenter=function(t){var e,n,r,i,o,s;for(n=v.createSVGMatrix(),n=n.translate(t[0],t[1]),n=n.rotate(this.props.rotate[0]),n=n.translate(-t[0],-t[1]),r=new l(n),i=r.decompose().props.translate,s=[],e=o=0;1>=o;e=++o)s.push(this.props.translate[e]-=i[e]);return s},t}(),v="undefined"!=typeof document&&null!==document?document.createElementNS("http://www.w3.org/2000/svg","svg"):void 0,l=function(){function t(t){this.m=t,this.applyProperties=ne(this.applyProperties,this),this.decompose=ne(this.decompose,this),this.m||(this.m=v.createSVGMatrix())}return t.prototype.decompose=function(){var t,e,r,i,o;return i=new f([this.m.a,this.m.b]),o=new f([this.m.c,this.m.d]),t=i.length(),r=i.dot(o),i=i.normalize(),e=o.combine(i,1,-r).length(),new n({translate:[this.m.e,this.m.f],rotate:[180*Math.atan2(this.m.b,this.m.a)/Math.PI,this.rotateCX,this.rotateCY],scale:[t,e],skew:r/e*180/Math.PI})},t.prototype.applyProperties=function(t){var e,n,r,i,o,s,a,l;for(e={},o=0,s=t.length;s>o;o++)r=t[o],e[r[0]]=r[1];for(n in e)i=e[n],"translateX"===n?this.m=this.m.translate(i,0):"translateY"===n?this.m=this.m.translate(0,i):"scaleX"===n?this.m=this.m.scale(i,1):"scaleY"===n?this.m=this.m.scale(1,i):"rotateZ"===n?this.m=this.m.rotate(i):"skewX"===n?this.m=this.m.skewX(i):"skewY"===n&&(this.m=this.m.skewY(i));return this.rotateCX=null!=(a=e.rotateCX)?a:0,this.rotateCY=null!=(l=e.rotateCY)?l:0},t}(),f=function(){function t(t){this.els=t,this.combine=ne(this.combine,this),this.normalize=ne(this.normalize,this),this.length=ne(this.length,this),this.cross=ne(this.cross,this),this.dot=ne(this.dot,this),this.e=ne(this.e,this)}return t.prototype.e=function(t){return 1>t||t>this.els.length?null:this.els[t-1]},t.prototype.dot=function(t){var e,n,r;if(e=t.els||t,r=0,n=this.els.length,n!==e.length)return null;for(n+=1;--n;)r+=this.els[n-1]*e[n-1];return r},t.prototype.cross=function(e){var n,r;return r=e.els||e,3!==this.els.length||3!==r.length?null:(n=this.els,new t([n[1]*r[2]-n[2]*r[1],n[2]*r[0]-n[0]*r[2],n[0]*r[1]-n[1]*r[0]]))},t.prototype.length=function(){var t,e,n,r,i;for(t=0,i=this.els,n=0,r=i.length;r>n;n++)e=i[n],t+=Math.pow(e,2);return Math.sqrt(t)},t.prototype.normalize=function(){var e,n,r,i,o;r=this.length(),i=[],o=this.els;for(n in o)e=o[n],i[n]=e/r;return new t(i)},t.prototype.combine=function(e,n,r){var i,o,s,a;for(o=[],i=s=0,a=this.els.length;a>=0?a>s:s>a;i=a>=0?++s:--s)o[i]=n*this.els[i]+r*e.els[i];return new t(o)},t}(),e=function(){function t(){this.toMatrix=ne(this.toMatrix,this),this.format=ne(this.format,this),this.interpolate=ne(this.interpolate,this)}return t.prototype.interpolate=function(e,n,r){var i,o,s,a,l,u,f,h,c,p,m,d,g,y,v,b,w,x;for(null==r&&(r=null),s=this,o=new t,w=["translate","scale","skew","perspective"],d=0,b=w.length;b>d;d++)for(f=w[d],o[f]=[],a=g=0,x=s[f].length-1;x>=0?x>=g:g>=x;a=x>=0?++g:--g)o[f][a]=null==r||r.indexOf(f)>-1||r.indexOf(""+f+["x","y","z"][a])>-1?(e[f][a]-s[f][a])*n+s[f][a]:s[f][a];if(null==r||-1!==r.indexOf("rotate")){if(h=s.quaternion,c=e.quaternion,i=h[0]*c[0]+h[1]*c[1]+h[2]*c[2]+h[3]*c[3],0>i){for(a=y=0;3>=y;a=++y)h[a]=-h[a];i=-i}for(i+1>.05?1-i>=.05?(m=Math.acos(i),u=1/Math.sin(m),p=Math.sin(m*(1-n))*u,l=Math.sin(m*n)*u):(p=1-n,l=n):(c[0]=-h[1],c[1]=h[0],c[2]=-h[3],c[3]=h[2],p=Math.sin(piDouble*(.5-n)),l=Math.sin(piDouble*n)),o.quaternion=[],a=v=0;3>=v;a=++v)o.quaternion[a]=h[a]*p+c[a]*l}else o.quaternion=s.quaternion;return o},t.prototype.format=function(){return this.toMatrix().toString()},t.prototype.toMatrix=function(){var t,e,n,r,i,o,s,l,u,f,h,c,p,m,d,g;for(t=this,i=a.I(4),e=p=0;3>=p;e=++p)i.els[e][3]=t.perspective[e];for(o=t.quaternion,f=o[0],h=o[1],c=o[2],u=o[3],s=t.skew,r=[[1,0],[2,0],[2,1]],e=m=2;m>=0;e=--m)s[e]&&(l=a.I(4),l.els[r[e][0]][r[e][1]]=s[e],i=i.multiply(l));for(i=i.multiply(new a([[1-2*(h*h+c*c),2*(f*h-c*u),2*(f*c+h*u),0],[2*(f*h+c*u),1-2*(f*f+c*c),2*(h*c-f*u),0],[2*(f*c-h*u),2*(h*c+f*u),1-2*(f*f+h*h),0],[0,0,0,1]])),e=d=0;2>=d;e=++d){for(n=g=0;2>=g;n=++g)i.els[e][n]*=t.scale[e];i.els[3][e]=t.translate[e]}return i},t}(),a=function(){function t(t){this.els=t,this.toString=ne(this.toString,this),this.decompose=ne(this.decompose,this),this.inverse=ne(this.inverse,this),this.augment=ne(this.augment,this),this.toRightTriangular=ne(this.toRightTriangular,this),this.transpose=ne(this.transpose,this),this.multiply=ne(this.multiply,this),this.dup=ne(this.dup,this),this.e=ne(this.e,this)}return t.prototype.e=function(t,e){return 1>t||t>this.els.length||1>e||e>this.els[0].length?null:this.els[t-1][e-1]},t.prototype.dup=function(){return new t(this.els)},t.prototype.multiply=function(e){var n,r,i,o,s,a,l,u,f,h,c,p,m;for(p=e.modulus?!0:!1,n=e.els||e,"undefined"==typeof n[0][0]&&(n=new t(n).els),h=this.els.length,l=h,u=n[0].length,i=this.els[0].length,o=[],h+=1;--h;)for(s=l-h,o[s]=[],c=u,c+=1;--c;){for(a=u-c,m=0,f=i,f+=1;--f;)r=i-f,m+=this.els[s][r]*n[r][a];o[s][a]=m}return n=new t(o),p?n.col(1):n},t.prototype.transpose=function(){var e,n,r,i,o,s,a;for(a=this.els.length,e=this.els[0].length,n=[],o=e,o+=1;--o;)for(r=e-o,n[r]=[],s=a,s+=1;--s;)i=a-s,n[r][i]=this.els[i][r];return new t(n)},t.prototype.toRightTriangular=function(){var t,e,n,r,i,o,s,a,l,u,f,h,c,p;for(t=this.dup(),a=this.els.length,i=a,o=this.els[0].length;--a;){if(n=i-a,0===t.els[n][n])for(r=f=c=n+1;i>=c?i>f:f>i;r=i>=c?++f:--f)if(0!==t.els[r][n]){for(e=[],l=o,l+=1;--l;)u=o-l,e.push(t.els[n][u]+t.els[r][u]);t.els[n]=e;break}if(0!==t.els[n][n])for(r=h=p=n+1;i>=p?i>h:h>i;r=i>=p?++h:--h){for(s=t.els[r][n]/t.els[n][n],e=[],l=o,l+=1;--l;)u=o-l,e.push(n>=u?0:t.els[r][u]-t.els[n][u]*s);t.els[r]=e}}return t},t.prototype.augment=function(e){var n,r,i,o,s,a,l,u,f;if(n=e.els||e,"undefined"==typeof n[0][0]&&(n=new t(n).els),r=this.dup(),i=r.els[0].length,u=r.els.length,a=u,l=n[0].length,u!==n.length)return null;for(u+=1;--u;)for(o=a-u,f=l,f+=1;--f;)s=l-f,r.els[o][i+s]=n[o][s];return r},t.prototype.inverse=function(){var e,n,r,i,o,s,a,l,u,f,h,c,p;for(f=this.els.length,a=f,e=this.augment(t.I(f)).toRightTriangular(),l=e.els[0].length,o=[],f+=1;--f;){for(i=f-1,r=[],h=l,o[i]=[],n=e.els[i][i],h+=1;--h;)c=l-h,u=e.els[i][c]/n,r.push(u),c>=a&&o[i].push(u);for(e.els[i]=r,s=p=0;i>=0?i>p:p>i;s=i>=0?++p:--p){for(r=[],h=l,h+=1;--h;)c=l-h,r.push(e.els[s][c]-e.els[i][c]*e.els[s][i]);e.els[s]=r}}return new t(o)},t.I=function(e){var n,r,i,o,s;for(n=[],o=e,e+=1;--e;)for(r=o-e,n[r]=[],s=o,s+=1;--s;)i=o-s,n[r][i]=r===i?1:0;return new t(n)},t.prototype.decompose=function(){var t,n,r,i,o,s,a,l,u,h,c,p,m,d,g,y,v,b,w,x,M,k,S,T,C,F,H,R,q,X,Y,j,z,I,A,G,V,Z;for(s=this,x=[],v=[],b=[],h=[],l=[],t=[],n=q=0;3>=q;n=++q)for(t[n]=[],i=X=0;3>=X;i=++X)t[n][i]=s.els[n][i];if(0===t[3][3])return!1;for(n=Y=0;3>=Y;n=++Y)for(i=j=0;3>=j;i=++j)t[n][i]/=t[3][3];for(u=s.dup(),n=z=0;2>=z;n=++z)u.els[n][3]=0;if(u.els[3][3]=1,0!==t[0][3]||0!==t[1][3]||0!==t[2][3]){for(p=new f(t.slice(0,4)[3]),r=u.inverse(),M=r.transpose(),l=M.multiply(p).els,n=I=0;2>=I;n=++I)t[n][3]=0;t[3][3]=1}else l=[0,0,0,1];for(n=A=0;2>=A;n=++A)x[n]=t[3][n],t[3][n]=0;for(d=[],n=G=0;2>=G;n=++G)d[n]=new f(t[n].slice(0,3));if(v[0]=d[0].length(),d[0]=d[0].normalize(),b[0]=d[0].dot(d[1]),d[1]=d[1].combine(d[0],1,-b[0]),v[1]=d[1].length(),d[1]=d[1].normalize(),b[0]/=v[1],b[1]=d[0].dot(d[2]),d[2]=d[2].combine(d[0],1,-b[1]),b[2]=d[1].dot(d[2]),d[2]=d[2].combine(d[1],1,-b[2]),v[2]=d[2].length(),d[2]=d[2].normalize(),b[1]/=v[2],b[2]/=v[2],a=d[1].cross(d[2]),d[0].dot(a)<0)for(n=V=0;2>=V;n=++V)for(v[n]*=-1,i=Z=0;2>=Z;i=++Z)d[n].els[i]*=-1;g=function(t,e){return d[t].els[e]},m=[],m[1]=Math.asin(-g(0,2)),0!==Math.cos(m[1])?(m[0]=Math.atan2(g(1,2),g(2,2)),m[2]=Math.atan2(g(0,1),g(0,0))):(m[0]=Math.atan2(-g(2,0),g(1,1)),m[1]=0),w=g(0,0)+g(1,1)+g(2,2)+1,w>1e-4?(y=.5/Math.sqrt(w),C=.25/y,F=(g(2,1)-g(1,2))*y,H=(g(0,2)-g(2,0))*y,R=(g(1,0)-g(0,1))*y):g(0,0)>g(1,1)&&g(0,0)>g(2,2)?(y=2*Math.sqrt(1+g(0,0)-g(1,1)-g(2,2)),F=.25*y,H=(g(0,1)+g(1,0))/y,R=(g(0,2)+g(2,0))/y,C=(g(2,1)-g(1,2))/y):g(1,1)>g(2,2)?(y=2*Math.sqrt(1+g(1,1)-g(0,0)-g(2,2)),F=(g(0,1)+g(1,0))/y,H=.25*y,R=(g(1,2)+g(2,1))/y,C=(g(0,2)-g(2,0))/y):(y=2*Math.sqrt(1+g(2,2)-g(0,0)-g(1,1)),F=(g(0,2)+g(2,0))/y,H=(g(1,2)+g(2,1))/y,R=.25*y,C=(g(1,0)-g(0,1))/y),h=[F,H,R,C],c=new e,c.translate=x,c.scale=v,c.skew=b,c.quaternion=h,c.perspective=l,c.rotate=m;for(S in c){k=c[S];for(o in k)T=k[o],isNaN(T)&&(k[o]=0)}return c},t.prototype.toString=function(){var t,e,n,r,i;for(n="matrix3d(",t=r=0;3>=r;t=++r)for(e=i=0;3>=i;e=++i)n+=Z(this.els[t][e],10),(3!==t||3!==e)&&(n+=",");return n+=")"},t.matrixForTransform=b(function(t){var e,n,r,i,o,s;return e=document.createElement("div"),e.style.position="absolute",e.style.visibility="hidden",e.style[A("transform")]=t,document.body.appendChild(e),r=window.getComputedStyle(e,null),n=null!=(i=null!=(o=r.transform)?o:r[A("transform")])?i:null!=(s=T.tests)?s.matrixForTransform(t):void 0,document.body.removeChild(e),n}),t.fromTransform=function(e){var n,r,i,o,s,a;for(o=null!=e?e.match(/matrix3?d?\(([-0-9,e \.]*)\)/):void 0,o?(n=o[1].split(","),n=n.map(parseFloat),r=6===n.length?[n[0],n[1],0,0,n[2],n[3],0,0,0,0,1,0,n[4],n[5],0,1]:n):r=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],s=[],i=a=0;3>=a;i=++a)s.push(r.slice(4*i,4*i+4));return new t(s)},t}(),I=b(function(t){var e,n,r,i,o,s,a,l,u,f;if(void 0!==document.body.style[t])return"";for(i=t.split("-"),o="",s=0,l=i.length;l>s;s++)r=i[s],o+=r.substring(0,1).toUpperCase()+r.substring(1);for(f=["Webkit","Moz","ms"],a=0,u=f.length;u>a;a++)if(n=f[a],e=n+o,void 0!==document.body.style[e])return n;return""}),A=b(function(t){var e;return e=I(t),"Moz"===e?""+e+(t.substring(0,1).toUpperCase()+t.substring(1)):""!==e?"-"+e.toLowerCase()+"-"+Q(t):Q(t)}),V="undefined"!=typeof window&&null!==window?window.requestAnimationFrame:void 0,p=[],m=[],P=!1,W=1,"undefined"!=typeof window&&null!==window&&window.addEventListener("keyup",function(t){return 68===t.keyCode&&t.shiftKey&&t.ctrlKey?T.toggleSlow():void 0}),null==V&&(q=0,V=function(t){var e,n,r;return e=Date.now(),r=Math.max(0,16-(e-q)),n=window.setTimeout(function(){return t(e+r)},r),q=e+r,n}),O=!1,E=!1,$=function(){return O?void 0:(O=!0,V(L))},L=function(t){var e,n,r,i;if(E)return void V(L);for(n=[],r=0,i=p.length;i>r;r++)e=p[r],c(t,e)||n.push(e);return p=p.filter(function(t){return-1===n.indexOf(t)}),0===p.length?O=!1:V(L)},c=function(t,e){var n,r,i,o,s,a,l,u;if(null==e.tStart&&(e.tStart=t),o=(t-e.tStart)/e.options.duration,s=e.curve(o),r={},o>=1)r=e.curve.initialForce?e.properties.start:e.properties.end;else{u=e.properties.start;for(n in u)i=u[n],r[n]=F(i,e.properties.end[n],s)}return g(e.el,r),"function"==typeof(a=e.options).change&&a.change(e.el),o>=1&&"function"==typeof(l=e.options).complete&&l.complete(e.el),1>o},F=function(t,e,n){return null!=t&&null!=t.interpolate?t.interpolate(e,n):null},N=function(t,e,n,r){var i,o,u,f,h,c,d,g;if(null!=r&&(m=m.filter(function(t){return t.id!==r})),T.stop(t,{timeout:!1}),!n.animated)return T.css(t,e),void("function"==typeof n.complete&&n.complete(this));e=z(e),h=C(t,Object.keys(e)),i={},c=[];for(u in e)d=e[u],null!=t.style&&_.contains(u)?c.push([u,d]):(i[u]=M(d),i[u]instanceof s&&null!=t.style&&(i[u].prefix="",null==(g=i[u]).suffix&&(g.suffix=ee(u,0))));return c.length>0&&(o=R(t),o?(f=new l,f.applyProperties(c)):(d=c.map(function(t){return te(t[0],t[1])}).join(" "),f=a.fromTransform(a.matrixForTransform(d))),i.transform=f.decompose(),o&&h.transform.applyRotateCenter([i.transform.props.rotate[1],i.transform.props.rotate[2]])),p.push({el:t,properties:{start:h,end:i},options:n,curve:n.type.call(n.type,n)}),$()},J=[],K=0,D=function(t){return H()?t.realTimeoutId=setTimeout(function(){return t.fn(),w(t.id)},t.delay):void 0},h=function(t,e){var n;return K+=1,n={id:K,tStart:Date.now(),fn:t,delay:e,originalDelay:e},D(n),J.push(n),K},w=function(t){return J=J.filter(function(e){return e.id===t&&clearTimeout(e.realTimeoutId),e.id!==t})},X=function(t,e){var n;return null!=t?(n=t-e.tStart,e.originalDelay-n):e.originalDelay},"undefined"!=typeof window&&null!==window&&window.addEventListener("unload",function(){}),U=null,j(function(t){var e,n,r,i,o,s,a,l,u,f;if(E=!t,t){if(O)for(n=Date.now()-U,o=0,l=p.length;l>o;o++)e=p[o],null!=e.tStart&&(e.tStart+=n);for(s=0,u=J.length;u>s;s++)r=J[s],r.delay=X(U,r),D(r);return U=null}for(U=Date.now(),f=[],i=0,a=J.length;a>i;i++)r=J[i],f.push(clearTimeout(r.realTimeoutId));return f}),T={},T.linear=function(){return function(t){return t}},T.spring=function(t){var e,n,r,i,o,s;return null==t&&(t={}),d(t,arguments.callee.defaults),i=Math.max(1,t.frequency/20),o=Math.pow(20,t.friction/100),s=t.anticipationSize/1e3,r=Math.max(0,s),e=function(e){var n,r,i,o,a;return n=.8,o=s/(1-s),a=0,i=(o-n*a)/(o-a),r=(n-i)/o,r*e*t.anticipationStrength/100+i},n=function(t){return Math.pow(o/10,-t)*(1-t)},function(t){var r,o,a,l,u,f,h,c;return f=t/(1-s)-s/(1-s),s>t?(c=s/(1-s)-s/(1-s),h=0/(1-s)-s/(1-s),u=Math.acos(1/e(c)),a=(Math.acos(1/e(h))-u)/(i*-s),r=e):(r=n,u=0,a=1),o=r(f),l=i*(t-s)*a+u,1-o*Math.cos(l)}},T.bounce=function(t){var e,n,r,i;return null==t&&(t={}),d(t,arguments.callee.defaults),r=Math.max(1,t.frequency/20),i=Math.pow(20,t.friction/100),e=function(t){return Math.pow(i/10,-t)*(1-t)},n=function(t){var n,i,o,s;return s=-1.57,i=1,n=e(t),o=r*t*i+s,n*Math.cos(o)},n.initialForce=!0,n},T.gravity=function(t){var e,n,r,i,o,s,a;return null==t&&(t={}),d(t,arguments.callee.defaults),n=Math.min(t.bounciness/1250,.8),i=t.elasticity/1e3,a=100,r=[],e=function(){var r,i;for(r=Math.sqrt(2/a),i={a:-r,b:r,H:1},t.initialForce&&(i.a=0,i.b=2*i.b);i.H>.001;)e=i.b-i.a,i={a:i.b,b:i.b+e*n,H:i.H*n*n};return i.b}(),s=function(n,r,i,o){var s,a;return e=r-n,a=2/e*o-1-2*n/e,s=a*a*i-i+1,t.initialForce&&(s=1-s),s},function(){var o,s,l,u;for(s=Math.sqrt(2/(a*e*e)),l={a:-s,b:s,H:1},t.initialForce&&(l.a=0,l.b=2*l.b),r.push(l),o=e,u=[];l.b<1&&l.H>.001;)o=l.b-l.a,l={a:l.b,b:l.b+o*n,H:l.H*i},u.push(r.push(l));return u}(),o=function(e){var n,i,o;for(i=0,n=r[i];!(e>=n.a&&e<=n.b)&&(i+=1,n=r[i]););return o=n?s(n.a,n.b,n.H,e):t.initialForce?0:1},o.initialForce=t.initialForce,o},T.forceWithGravity=function(t){return null==t&&(t={}),d(t,arguments.callee.defaults),t.initialForce=!0,T.gravity(t)},T.bezier=function(){var t,e,n;return e=function(t,e,n,r,i){return Math.pow(1-t,3)*e+3*Math.pow(1-t,2)*t*n+3*(1-t)*Math.pow(t,2)*r+Math.pow(t,3)*i},t=function(t,n,r,i,o){return{x:e(t,n.x,r.x,i.x,o.x),y:e(t,n.y,r.y,i.y,o.y)}},n=function(t,e,n){var r,i,o,s,a,l,u,f,h,c;for(r=null,h=0,c=e.length;c>h&&(i=e[h],t>=i(0).x&&t<=i(1).x&&(r=i),null===r);h++);if(!r)return n?0:1;for(f=1e-4,s=0,l=1,a=(l+s)/2,u=r(a).x,o=0;Math.abs(t-u)>f&&100>o;)t>u?s=a:l=a,a=(l+s)/2,u=r(a).x,o+=1;return r(a).y},function(e){var r,i,o;return null==e&&(e={}),i=e.points,o=!1,r=function(){var e,n,o;r=[],o=function(e,n){var i;return i=function(r){return t(r,e,e.cp[e.cp.length-1],n.cp[0],n)},r.push(i)};for(e in i){if(n=parseInt(e),n>=i.length-1)break;o(i[n],i[n+1])}return r}(),function(t){return 0===t?0:1===t?1:n(t,r,o)}}}(),T.easeInOut=function(t){var e,n;return null==t&&(t={}),e=null!=(n=t.friction)?n:arguments.callee.defaults.friction,T.bezier({points:[{x:0,y:0,cp:[{x:.92-e/1e3,y:0}]},{x:1,y:1,cp:[{x:.08+e/1e3,y:1}]}]})},T.easeIn=function(t){var e,n;return null==t&&(t={}),e=null!=(n=t.friction)?n:arguments.callee.defaults.friction,T.bezier({points:[{x:0,y:0,cp:[{x:.92-e/1e3,y:0}]},{x:1,y:1,cp:[{x:1,y:1}]}]})},T.easeOut=function(t){var e,n;return null==t&&(t={}),e=null!=(n=t.friction)?n:arguments.callee.defaults.friction,T.bezier({points:[{x:0,y:0,cp:[{x:0,y:0}]},{x:1,y:1,cp:[{x:.08+e/1e3,y:1}]}]})},T.spring.defaults={frequency:300,friction:200,anticipationSize:0,anticipationStrength:0},T.bounce.defaults={frequency:300,friction:200},T.forceWithGravity.defaults=T.gravity.defaults={bounciness:400,elasticity:200},T.easeInOut.defaults=T.easeIn.defaults=T.easeOut.defaults={friction:500},T.css=Y(function(t,e){return y(t,e,!0)}),T.animate=Y(function(t,e,n){var r;return null==n&&(n={}),n=x(n),d(n,{type:T.easeInOut,duration:1e3,delay:0,animated:!0}),n.duration=Math.max(0,n.duration*W),n.delay=Math.max(0,n.delay),0===n.delay?N(t,e,n):(r=T.setTimeout(function(){return N(t,e,n,r)},n.delay),m.push({id:r,el:t}))}),T.stop=Y(function(t,e){return null==e&&(e={}),null==e.timeout&&(e.timeout=!0),e.timeout&&(m=m.filter(function(n){return n.el!==t||null!=e.filter&&!e.filter(n)?!0:(T.clearTimeout(n.id),!1)})),p=p.filter(function(e){return e.el!==t})}),T.setTimeout=function(t,e){return h(t,e*W)},T.clearTimeout=function(t){return w(t)},T.toggleSlow=function(){return P=!P,W=P?3:1,"undefined"!=typeof console&&null!==console&&"function"==typeof console.log?console.log("dynamics.js: slow animations "+(P?"enabled":"disabled")):void 0},"object"==typeof module&&"object"==typeof module.exports?module.exports=T:"function"==typeof define?define("dynamics",function(){return T}):window.dynamics=T}).call(this);
/*!
 * imagesLoaded PACKAGED v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}(this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||[];return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});

/*
 *
 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
 *
 * Copyright (c) 2012, Matias Meno
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */


(function() {
  var Dropzone, Emitter, camelize, contentLoaded, detectVerticalSquash, drawImageIOSFix, noop, without,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  noop = function() {};

  Emitter = (function() {
    function Emitter() {}

    Emitter.prototype.addEventListener = Emitter.prototype.on;

    Emitter.prototype.on = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (!this._callbacks[event]) {
        this._callbacks[event] = [];
      }
      this._callbacks[event].push(fn);
      return this;
    };

    Emitter.prototype.emit = function() {
      var args, callback, callbacks, event, _i, _len;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this._callbacks = this._callbacks || {};
      callbacks = this._callbacks[event];
      if (callbacks) {
        for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
          callback = callbacks[_i];
          callback.apply(this, args);
        }
      }
      return this;
    };

    Emitter.prototype.removeListener = Emitter.prototype.off;

    Emitter.prototype.removeAllListeners = Emitter.prototype.off;

    Emitter.prototype.removeEventListener = Emitter.prototype.off;

    Emitter.prototype.off = function(event, fn) {
      var callback, callbacks, i, _i, _len;
      if (!this._callbacks || arguments.length === 0) {
        this._callbacks = {};
        return this;
      }
      callbacks = this._callbacks[event];
      if (!callbacks) {
        return this;
      }
      if (arguments.length === 1) {
        delete this._callbacks[event];
        return this;
      }
      for (i = _i = 0, _len = callbacks.length; _i < _len; i = ++_i) {
        callback = callbacks[i];
        if (callback === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      return this;
    };

    return Emitter;

  })();

  Dropzone = (function(_super) {
    var extend, resolveOption;

    __extends(Dropzone, _super);

    Dropzone.prototype.Emitter = Emitter;


    /*
    This is a list of all available events you can register on a dropzone object.

    You can register an event handler like this:

        dropzone.on("dragEnter", function() { });
     */

    Dropzone.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"];

    Dropzone.prototype.defaultOptions = {
      url: null,
      method: "post",
      withCredentials: false,
      parallelUploads: 2,
      uploadMultiple: false,
      maxFilesize: 256,
      paramName: "file",
      createImageThumbnails: true,
      maxThumbnailFilesize: 10,
      thumbnailWidth: 120,
      thumbnailHeight: 120,
      filesizeBase: 1000,
      maxFiles: null,
      params: {},
      clickable: true,
      ignoreHiddenFiles: true,
      acceptedFiles: null,
      acceptedMimeTypes: null,
      autoProcessQueue: true,
      autoQueue: true,
      addRemoveLinks: true,
      previewsContainer: null,
      hiddenInputContainer: "body",
      capture: null,
      renameFilename: null,
      dictDefaultMessage: "Drop files here to upload",
      dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
      dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
      dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
      dictInvalidFileType: "You can't upload files of this type.",
      dictResponseError: "Server responded with {{statusCode}} code.",
      dictCancelUpload: "Cancel upload",
      dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
      dictRemoveFile: "Remove file",
      dictRemoveFileConfirmation: null,
      dictMaxFilesExceeded: "You can not upload any more files.",
      accept: function(file, done) {
        return done();
      },
      init: function() {
        return noop;
      },
      forceFallback: false,
      fallback: function() {
        var child, messageElement, span, _i, _len, _ref;
        this.element.className = "" + this.element.className + " dz-browser-not-supported";
        _ref = this.element.getElementsByTagName("div");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (/(^| )dz-message($| )/.test(child.className)) {
            messageElement = child;
            child.className = "dz-message";
            continue;
          }
        }
        if (!messageElement) {
          messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
          this.element.appendChild(messageElement);
        }
        span = messageElement.getElementsByTagName("span")[0];
        if (span) {
          if (span.textContent != null) {
            span.textContent = this.options.dictFallbackMessage;
          } else if (span.innerText != null) {
            span.innerText = this.options.dictFallbackMessage;
          }
        }
        return this.element.appendChild(this.getFallbackForm());
      },
      resize: function(file) {
        var info, srcRatio, trgRatio;
        info = {
          srcX: 0,
          srcY: 0,
          srcWidth: file.width,
          srcHeight: file.height
        };
        srcRatio = file.width / file.height;
        info.optWidth = this.options.thumbnailWidth;
        info.optHeight = this.options.thumbnailHeight;
        if ((info.optWidth == null) && (info.optHeight == null)) {
          info.optWidth = info.srcWidth;
          info.optHeight = info.srcHeight;
        } else if (info.optWidth == null) {
          info.optWidth = srcRatio * info.optHeight;
        } else if (info.optHeight == null) {
          info.optHeight = (1 / srcRatio) * info.optWidth;
        }
        trgRatio = info.optWidth / info.optHeight;
        if (file.height < info.optHeight || file.width < info.optWidth) {
          info.trgHeight = info.srcHeight;
          info.trgWidth = info.srcWidth;
        } else {
          if (srcRatio > trgRatio) {
            info.srcHeight = file.height;
            info.srcWidth = info.srcHeight * trgRatio;
          } else {
            info.srcWidth = file.width;
            info.srcHeight = info.srcWidth / trgRatio;
          }
        }
        info.srcX = (file.width - info.srcWidth) / 2;
        info.srcY = (file.height - info.srcHeight) / 2;
        return info;
      },

      /*
      Those functions register themselves to the events on init and handle all
      the user interface specific stuff. Overwriting them won't break the upload
      but can break the way it's displayed.
      You can overwrite them if you don't like the default behavior. If you just
      want to add an additional event handler, register it on the dropzone object
      and don't overwrite those options.
       */
      drop: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      dragstart: noop,
      dragend: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      dragenter: function(e) {
        return this.element.classList.add("dz-drag-hover");
      },
      dragover: function(e) {
        return this.element.classList.add("dz-drag-hover");
      },
      dragleave: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      paste: noop,
      reset: function() {
        return this.element.classList.remove("dz-started");
      },
      addedfile: function(file) {
        var node, removeFileEvent, removeLink, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
        if (this.element === this.previewsContainer) {
          this.element.classList.add("dz-started");
        }
        if (this.previewsContainer) {
          file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
          file.previewTemplate = file.previewElement;
          this.previewsContainer.appendChild(file.previewElement);
          _ref = file.previewElement.querySelectorAll("[data-dz-name]");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            node.textContent = this._renameFilename(file.name);
          }
          _ref1 = file.previewElement.querySelectorAll("[data-dz-size]");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            node = _ref1[_j];
            node.innerHTML = this.filesize(file.size);
          }
          if (this.options.addRemoveLinks) {
            file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>" + this.options.dictRemoveFile + "</a>");
            file.previewElement.appendChild(file._removeLink);
          }
          removeFileEvent = (function(_this) {
            return function(e) {
              e.preventDefault();
              e.stopPropagation();
              if (file.status === Dropzone.UPLOADING) {
                return Dropzone.confirm(_this.options.dictCancelUploadConfirmation, function() {
                  return _this.removeFile(file);
                });
              } else {
                if (_this.options.dictRemoveFileConfirmation) {
                  return Dropzone.confirm(_this.options.dictRemoveFileConfirmation, function() {
                    return _this.removeFile(file);
                  });
                } else {
                  return _this.removeFile(file);
                }
              }
            };
          })(this);
          _ref2 = file.previewElement.querySelectorAll("[data-dz-remove]");
          _results = [];
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            removeLink = _ref2[_k];
            _results.push(removeLink.addEventListener("click", removeFileEvent));
          }
          return _results;
        }
      },
      removedfile: function(file) {
        var _ref;
        if (file.previewElement) {
          if ((_ref = file.previewElement) != null) {
            _ref.parentNode.removeChild(file.previewElement);
          }
        }
        return this._updateMaxFilesReachedClass();
      },
      thumbnail: function(file, dataUrl) {
        var thumbnailElement, _i, _len, _ref;
        if (file.previewElement) {
          file.previewElement.classList.remove("dz-file-preview");
          _ref = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            thumbnailElement = _ref[_i];
            thumbnailElement.alt = file.name;
            thumbnailElement.src = dataUrl;
          }
          return setTimeout(((function(_this) {
            return function() {
              return file.previewElement.classList.add("dz-image-preview");
            };
          })(this)), 1);
        }
      },
      error: function(file, message) {
        var node, _i, _len, _ref, _results;
        if (file.previewElement) {
          file.previewElement.classList.add("dz-error");
          if (typeof message !== "String" && message.error) {
            message = message.error;
          }
          _ref = file.previewElement.querySelectorAll("[data-dz-errormessage]");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            _results.push(node.textContent = message);
          }
          return _results;
        }
      },
      errormultiple: noop,
      processing: function(file) {
        if (file.previewElement) {
          file.previewElement.classList.add("dz-processing");
          if (file._removeLink) {
            return file._removeLink.textContent = this.options.dictCancelUpload;
          }
        }
      },
      processingmultiple: noop,
      uploadprogress: function(file, progress, bytesSent) {
        var node, _i, _len, _ref, _results;
        if (file.previewElement) {
          _ref = file.previewElement.querySelectorAll("[data-dz-uploadprogress]");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            if (node.nodeName === 'PROGRESS') {
              _results.push(node.value = progress);
            } else {
              _results.push(node.style.width = "" + progress + "%");
            }
          }
          return _results;
        }
      },
      totaluploadprogress: noop,
      sending: noop,
      sendingmultiple: noop,
      success: function(file) {
        if (file.previewElement) {
          return file.previewElement.classList.add("dz-success");
        }
      },
      successmultiple: noop,
      canceled: function(file) {
        return this.emit("error", file, "Upload canceled.");
      },
      canceledmultiple: noop,
      complete: function(file) {
        if (file._removeLink) {
          file._removeLink.textContent = this.options.dictRemoveFile;
        }
        if (file.previewElement) {
          return file.previewElement.classList.add("dz-complete");
        }
      },
      completemultiple: noop,
      maxfilesexceeded: noop,
      maxfilesreached: noop,
      queuecomplete: noop,
      addedfiles: noop,
      previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"
    };

    extend = function() {
      var key, object, objects, target, val, _i, _len;
      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        for (key in object) {
          val = object[key];
          target[key] = val;
        }
      }
      return target;
    };

    function Dropzone(element, options) {
      var elementOptions, fallback, _ref;
      this.element = element;
      this.version = Dropzone.version;
      this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, "");
      this.clickableElements = [];
      this.listeners = [];
      this.files = [];
      if (typeof this.element === "string") {
        this.element = document.querySelector(this.element);
      }
      if (!(this.element && (this.element.nodeType != null))) {
        throw new Error("Invalid dropzone element.");
      }
      if (this.element.dropzone) {
        throw new Error("Dropzone already attached.");
      }
      Dropzone.instances.push(this);
      this.element.dropzone = this;
      elementOptions = (_ref = Dropzone.optionsForElement(this.element)) != null ? _ref : {};
      this.options = extend({}, this.defaultOptions, elementOptions, options != null ? options : {});
      if (this.options.forceFallback || !Dropzone.isBrowserSupported()) {
        return this.options.fallback.call(this);
      }
      if (this.options.url == null) {
        this.options.url = this.element.getAttribute("action");
      }
      if (!this.options.url) {
        throw new Error("No URL provided.");
      }
      if (this.options.acceptedFiles && this.options.acceptedMimeTypes) {
        throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
      }
      if (this.options.acceptedMimeTypes) {
        this.options.acceptedFiles = this.options.acceptedMimeTypes;
        delete this.options.acceptedMimeTypes;
      }
      this.options.method = this.options.method.toUpperCase();
      if ((fallback = this.getExistingFallback()) && fallback.parentNode) {
        fallback.parentNode.removeChild(fallback);
      }
      if (this.options.previewsContainer !== false) {
        if (this.options.previewsContainer) {
          this.previewsContainer = Dropzone.getElement(this.options.previewsContainer, "previewsContainer");
        } else {
          this.previewsContainer = this.element;
        }
      }
      if (this.options.clickable) {
        if (this.options.clickable === true) {
          this.clickableElements = [this.element];
        } else {
          this.clickableElements = Dropzone.getElements(this.options.clickable, "clickable");
        }
      }
      this.init();
    }

    Dropzone.prototype.getAcceptedFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.accepted) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getRejectedFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (!file.accepted) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getFilesWithStatus = function(status) {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status === status) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getQueuedFiles = function() {
      return this.getFilesWithStatus(Dropzone.QUEUED);
    };

    Dropzone.prototype.getUploadingFiles = function() {
      return this.getFilesWithStatus(Dropzone.UPLOADING);
    };

    Dropzone.prototype.getAddedFiles = function() {
      return this.getFilesWithStatus(Dropzone.ADDED);
    };

    Dropzone.prototype.getActiveFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.init = function() {
      var eventName, noPropagation, setupHiddenFileInput, _i, _len, _ref, _ref1;
      if (this.element.tagName === "form") {
        this.element.setAttribute("enctype", "multipart/form-data");
      }
      if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {
        this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
      }
      if (this.clickableElements.length) {
        setupHiddenFileInput = (function(_this) {
          return function() {
            if (_this.hiddenFileInput) {
              _this.hiddenFileInput.parentNode.removeChild(_this.hiddenFileInput);
            }
            _this.hiddenFileInput = document.createElement("input");
            _this.hiddenFileInput.setAttribute("type", "file");
            if ((_this.options.maxFiles == null) || _this.options.maxFiles > 1) {
              _this.hiddenFileInput.setAttribute("multiple", "multiple");
            }
            _this.hiddenFileInput.className = "dz-hidden-input";
            if (_this.options.acceptedFiles != null) {
              _this.hiddenFileInput.setAttribute("accept", _this.options.acceptedFiles);
            }
            if (_this.options.capture != null) {
              _this.hiddenFileInput.setAttribute("capture", _this.options.capture);
            }
            _this.hiddenFileInput.style.visibility = "hidden";
            _this.hiddenFileInput.style.position = "absolute";
            _this.hiddenFileInput.style.top = "0";
            _this.hiddenFileInput.style.left = "0";
            _this.hiddenFileInput.style.height = "0";
            _this.hiddenFileInput.style.width = "0";
            document.querySelector(_this.options.hiddenInputContainer).appendChild(_this.hiddenFileInput);
            return _this.hiddenFileInput.addEventListener("change", function() {
              var file, files, _i, _len;
              files = _this.hiddenFileInput.files;
              if (files.length) {
                for (_i = 0, _len = files.length; _i < _len; _i++) {
                  file = files[_i];
                  _this.addFile(file);
                }
              }
              _this.emit("addedfiles", files);
              return setupHiddenFileInput();
            });
          };
        })(this);
        setupHiddenFileInput();
      }
      this.URL = (_ref = window.URL) != null ? _ref : window.webkitURL;
      _ref1 = this.events;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        eventName = _ref1[_i];
        this.on(eventName, this.options[eventName]);
      }
      this.on("uploadprogress", (function(_this) {
        return function() {
          return _this.updateTotalUploadProgress();
        };
      })(this));
      this.on("removedfile", (function(_this) {
        return function() {
          return _this.updateTotalUploadProgress();
        };
      })(this));
      this.on("canceled", (function(_this) {
        return function(file) {
          return _this.emit("complete", file);
        };
      })(this));
      this.on("complete", (function(_this) {
        return function(file) {
          if (_this.getAddedFiles().length === 0 && _this.getUploadingFiles().length === 0 && _this.getQueuedFiles().length === 0) {
            return setTimeout((function() {
              return _this.emit("queuecomplete");
            }), 0);
          }
        };
      })(this));
      noPropagation = function(e) {
        e.stopPropagation();
        if (e.preventDefault) {
          return e.preventDefault();
        } else {
          return e.returnValue = false;
        }
      };
      this.listeners = [
        {
          element: this.element,
          events: {
            "dragstart": (function(_this) {
              return function(e) {
                return _this.emit("dragstart", e);
              };
            })(this),
            "dragenter": (function(_this) {
              return function(e) {
                noPropagation(e);
                return _this.emit("dragenter", e);
              };
            })(this),
            "dragover": (function(_this) {
              return function(e) {
                var efct;
                try {
                  efct = e.dataTransfer.effectAllowed;
                } catch (_error) {}
                e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';
                noPropagation(e);
                return _this.emit("dragover", e);
              };
            })(this),
            "dragleave": (function(_this) {
              return function(e) {
                return _this.emit("dragleave", e);
              };
            })(this),
            "drop": (function(_this) {
              return function(e) {
                noPropagation(e);
                return _this.drop(e);
              };
            })(this),
            "dragend": (function(_this) {
              return function(e) {
                return _this.emit("dragend", e);
              };
            })(this)
          }
        }
      ];
      this.clickableElements.forEach((function(_this) {
        return function(clickableElement) {
          return _this.listeners.push({
            element: clickableElement,
            events: {
              "click": function(evt) {
                if ((clickableElement !== _this.element) || (evt.target === _this.element || Dropzone.elementInside(evt.target, _this.element.querySelector(".dz-message")))) {
                  _this.hiddenFileInput.click();
                }
                return true;
              }
            }
          });
        };
      })(this));
      this.enable();
      return this.options.init.call(this);
    };

    Dropzone.prototype.destroy = function() {
      var _ref;
      this.disable();
      this.removeAllFiles(true);
      if ((_ref = this.hiddenFileInput) != null ? _ref.parentNode : void 0) {
        this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = null;
      }
      delete this.element.dropzone;
      return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
    };

    Dropzone.prototype.updateTotalUploadProgress = function() {
      var activeFiles, file, totalBytes, totalBytesSent, totalUploadProgress, _i, _len, _ref;
      totalBytesSent = 0;
      totalBytes = 0;
      activeFiles = this.getActiveFiles();
      if (activeFiles.length) {
        _ref = this.getActiveFiles();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          file = _ref[_i];
          totalBytesSent += file.upload.bytesSent;
          totalBytes += file.upload.total;
        }
        totalUploadProgress = 100 * totalBytesSent / totalBytes;
      } else {
        totalUploadProgress = 100;
      }
      return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
    };

    Dropzone.prototype._getParamName = function(n) {
      if (typeof this.options.paramName === "function") {
        return this.options.paramName(n);
      } else {
        return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
      }
    };

    Dropzone.prototype._renameFilename = function(name) {
      if (typeof this.options.renameFilename !== "function") {
        return name;
      }
      return this.options.renameFilename(name);
    };

    Dropzone.prototype.getFallbackForm = function() {
      var existingFallback, fields, fieldsString, form;
      if (existingFallback = this.getExistingFallback()) {
        return existingFallback;
      }
      fieldsString = "<div class=\"dz-fallback\">";
      if (this.options.dictFallbackText) {
        fieldsString += "<p>" + this.options.dictFallbackText + "</p>";
      }
      fieldsString += "<input type=\"file\" name=\"" + (this._getParamName(0)) + "\" " + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + " /><input type=\"submit\" value=\"Upload!\"></div>";
      fields = Dropzone.createElement(fieldsString);
      if (this.element.tagName !== "FORM") {
        form = Dropzone.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>");
        form.appendChild(fields);
      } else {
        this.element.setAttribute("enctype", "multipart/form-data");
        this.element.setAttribute("method", this.options.method);
      }
      return form != null ? form : fields;
    };

    Dropzone.prototype.getExistingFallback = function() {
      var fallback, getFallback, tagName, _i, _len, _ref;
      getFallback = function(elements) {
        var el, _i, _len;
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          el = elements[_i];
          if (/(^| )fallback($| )/.test(el.className)) {
            return el;
          }
        }
      };
      _ref = ["div", "form"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagName = _ref[_i];
        if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
          return fallback;
        }
      }
    };

    Dropzone.prototype.setupEventListeners = function() {
      var elementListeners, event, listener, _i, _len, _ref, _results;
      _ref = this.listeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elementListeners = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = elementListeners.events;
          _results1 = [];
          for (event in _ref1) {
            listener = _ref1[event];
            _results1.push(elementListeners.element.addEventListener(event, listener, false));
          }
          return _results1;
        })());
      }
      return _results;
    };

    Dropzone.prototype.removeEventListeners = function() {
      var elementListeners, event, listener, _i, _len, _ref, _results;
      _ref = this.listeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elementListeners = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = elementListeners.events;
          _results1 = [];
          for (event in _ref1) {
            listener = _ref1[event];
            _results1.push(elementListeners.element.removeEventListener(event, listener, false));
          }
          return _results1;
        })());
      }
      return _results;
    };

    Dropzone.prototype.disable = function() {
      var file, _i, _len, _ref, _results;
      this.clickableElements.forEach(function(element) {
        return element.classList.remove("dz-clickable");
      });
      this.removeEventListeners();
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.cancelUpload(file));
      }
      return _results;
    };

    Dropzone.prototype.enable = function() {
      this.clickableElements.forEach(function(element) {
        return element.classList.add("dz-clickable");
      });
      return this.setupEventListeners();
    };

    Dropzone.prototype.filesize = function(size) {
      var cutoff, i, selectedSize, selectedUnit, unit, units, _i, _len;
      selectedSize = 0;
      selectedUnit = "b";
      if (size > 0) {
        units = ['TB', 'GB', 'MB', 'KB', 'b'];
        for (i = _i = 0, _len = units.length; _i < _len; i = ++_i) {
          unit = units[i];
          cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
          if (size >= cutoff) {
            selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
            selectedUnit = unit;
            break;
          }
        }
        selectedSize = Math.round(10 * selectedSize) / 10;
      }
      return "<strong>" + selectedSize + "</strong> " + selectedUnit;
    };

    Dropzone.prototype._updateMaxFilesReachedClass = function() {
      if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
        if (this.getAcceptedFiles().length === this.options.maxFiles) {
          this.emit('maxfilesreached', this.files);
        }
        return this.element.classList.add("dz-max-files-reached");
      } else {
        return this.element.classList.remove("dz-max-files-reached");
      }
    };

    Dropzone.prototype.drop = function(e) {
      var files, items;
      if (!e.dataTransfer) {
        return;
      }
      this.emit("drop", e);
      files = e.dataTransfer.files;
      this.emit("addedfiles", files);
      if (files.length) {
        items = e.dataTransfer.items;
        if (items && items.length && (items[0].webkitGetAsEntry != null)) {
          this._addFilesFromItems(items);
        } else {
          this.handleFiles(files);
        }
      }
    };

    Dropzone.prototype.paste = function(e) {
      var items, _ref;
      if ((e != null ? (_ref = e.clipboardData) != null ? _ref.items : void 0 : void 0) == null) {
        return;
      }
      this.emit("paste", e);
      items = e.clipboardData.items;
      if (items.length) {
        return this._addFilesFromItems(items);
      }
    };

    Dropzone.prototype.handleFiles = function(files) {
      var file, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(this.addFile(file));
      }
      return _results;
    };

    Dropzone.prototype._addFilesFromItems = function(items) {
      var entry, item, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if ((item.webkitGetAsEntry != null) && (entry = item.webkitGetAsEntry())) {
          if (entry.isFile) {
            _results.push(this.addFile(item.getAsFile()));
          } else if (entry.isDirectory) {
            _results.push(this._addFilesFromDirectory(entry, entry.name));
          } else {
            _results.push(void 0);
          }
        } else if (item.getAsFile != null) {
          if ((item.kind == null) || item.kind === "file") {
            _results.push(this.addFile(item.getAsFile()));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Dropzone.prototype._addFilesFromDirectory = function(directory, path) {
      var dirReader, errorHandler, readEntries;
      dirReader = directory.createReader();
      errorHandler = function(error) {
        return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log(error) : void 0 : void 0;
      };
      readEntries = (function(_this) {
        return function() {
          return dirReader.readEntries(function(entries) {
            var entry, _i, _len;
            if (entries.length > 0) {
              for (_i = 0, _len = entries.length; _i < _len; _i++) {
                entry = entries[_i];
                if (entry.isFile) {
                  entry.file(function(file) {
                    if (_this.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
                      return;
                    }
                    file.fullPath = "" + path + "/" + file.name;
                    return _this.addFile(file);
                  });
                } else if (entry.isDirectory) {
                  _this._addFilesFromDirectory(entry, "" + path + "/" + entry.name);
                }
              }
              readEntries();
            }
            return null;
          }, errorHandler);
        };
      })(this);
      return readEntries();
    };

    Dropzone.prototype.accept = function(file, done) {
      if (file.size > this.options.maxFilesize * 1024 * 1024) {
        return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
      } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
        return done(this.options.dictInvalidFileType);
      } else if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
        done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
        return this.emit("maxfilesexceeded", file);
      } else {
        return this.options.accept.call(this, file, done);
      }
    };

    Dropzone.prototype.addFile = function(file) {
      file.upload = {
        progress: 0,
        total: file.size,
        bytesSent: 0
      };
      this.files.push(file);
      file.status = Dropzone.ADDED;
      this.emit("addedfile", file);
      this._enqueueThumbnail(file);
      return this.accept(file, (function(_this) {
        return function(error) {
          if (error) {
            file.accepted = false;
            _this._errorProcessing([file], error);
          } else {
            file.accepted = true;
            if (_this.options.autoQueue) {
              _this.enqueueFile(file);
            }
          }
          return _this._updateMaxFilesReachedClass();
        };
      })(this));
    };

    Dropzone.prototype.enqueueFiles = function(files) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        this.enqueueFile(file);
      }
      return null;
    };

    Dropzone.prototype.enqueueFile = function(file) {
      if (file.status === Dropzone.ADDED && file.accepted === true) {
        file.status = Dropzone.QUEUED;
        if (this.options.autoProcessQueue) {
          return setTimeout(((function(_this) {
            return function() {
              return _this.processQueue();
            };
          })(this)), 0);
        }
      } else {
        throw new Error("This file can't be queued because it has already been processed or was rejected.");
      }
    };

    Dropzone.prototype._thumbnailQueue = [];

    Dropzone.prototype._processingThumbnail = false;

    Dropzone.prototype._enqueueThumbnail = function(file) {
      if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
        this._thumbnailQueue.push(file);
        return setTimeout(((function(_this) {
          return function() {
            return _this._processThumbnailQueue();
          };
        })(this)), 0);
      }
    };

    Dropzone.prototype._processThumbnailQueue = function() {
      if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
        return;
      }
      this._processingThumbnail = true;
      return this.createThumbnail(this._thumbnailQueue.shift(), (function(_this) {
        return function() {
          _this._processingThumbnail = false;
          return _this._processThumbnailQueue();
        };
      })(this));
    };

    Dropzone.prototype.removeFile = function(file) {
      if (file.status === Dropzone.UPLOADING) {
        this.cancelUpload(file);
      }
      this.files = without(this.files, file);
      this.emit("removedfile", file);
      if (this.files.length === 0) {
        return this.emit("reset");
      }
    };

    Dropzone.prototype.removeAllFiles = function(cancelIfNecessary) {
      var file, _i, _len, _ref;
      if (cancelIfNecessary == null) {
        cancelIfNecessary = false;
      }
      _ref = this.files.slice();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
          this.removeFile(file);
        }
      }
      return null;
    };

    Dropzone.prototype.createThumbnail = function(file, callback) {
      var fileReader;
      fileReader = new FileReader;
      fileReader.onload = (function(_this) {
        return function() {
          if (file.type === "image/svg+xml") {
            _this.emit("thumbnail", file, fileReader.result);
            if (callback != null) {
              callback();
            }
            return;
          }
          return _this.createThumbnailFromUrl(file, fileReader.result, callback);
        };
      })(this);
      return fileReader.readAsDataURL(file);
    };

    Dropzone.prototype.createThumbnailFromUrl = function(file, imageUrl, callback, crossOrigin) {
      var img;
      img = document.createElement("img");
      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }
      img.onload = (function(_this) {
        return function() {
          var canvas, ctx, resizeInfo, thumbnail, _ref, _ref1, _ref2, _ref3;
          file.width = img.width;
          file.height = img.height;
          resizeInfo = _this.options.resize.call(_this, file);
          if (resizeInfo.trgWidth == null) {
            resizeInfo.trgWidth = resizeInfo.optWidth;
          }
          if (resizeInfo.trgHeight == null) {
            resizeInfo.trgHeight = resizeInfo.optHeight;
          }
          canvas = document.createElement("canvas");
          ctx = canvas.getContext("2d");
          canvas.width = resizeInfo.trgWidth;
          canvas.height = resizeInfo.trgHeight;
          drawImageIOSFix(ctx, img, (_ref = resizeInfo.srcX) != null ? _ref : 0, (_ref1 = resizeInfo.srcY) != null ? _ref1 : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, (_ref2 = resizeInfo.trgX) != null ? _ref2 : 0, (_ref3 = resizeInfo.trgY) != null ? _ref3 : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
          thumbnail = canvas.toDataURL("image/png");
          _this.emit("thumbnail", file, thumbnail);
          if (callback != null) {
            return callback();
          }
        };
      })(this);
      if (callback != null) {
        img.onerror = callback;
      }
      return img.src = imageUrl;
    };

    Dropzone.prototype.processQueue = function() {
      var i, parallelUploads, processingLength, queuedFiles;
      parallelUploads = this.options.parallelUploads;
      processingLength = this.getUploadingFiles().length;
      i = processingLength;
      if (processingLength >= parallelUploads) {
        return;
      }
      queuedFiles = this.getQueuedFiles();
      if (!(queuedFiles.length > 0)) {
        return;
      }
      if (this.options.uploadMultiple) {
        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
      } else {
        while (i < parallelUploads) {
          if (!queuedFiles.length) {
            return;
          }
          this.processFile(queuedFiles.shift());
          i++;
        }
      }
    };

    Dropzone.prototype.processFile = function(file) {
      return this.processFiles([file]);
    };

    Dropzone.prototype.processFiles = function(files) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.processing = true;
        file.status = Dropzone.UPLOADING;
        this.emit("processing", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("processingmultiple", files);
      }
      return this.uploadFiles(files);
    };

    Dropzone.prototype._getFilesWithXhr = function(xhr) {
      var file, files;
      return files = (function() {
        var _i, _len, _ref, _results;
        _ref = this.files;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          file = _ref[_i];
          if (file.xhr === xhr) {
            _results.push(file);
          }
        }
        return _results;
      }).call(this);
    };

    Dropzone.prototype.cancelUpload = function(file) {
      var groupedFile, groupedFiles, _i, _j, _len, _len1, _ref;
      if (file.status === Dropzone.UPLOADING) {
        groupedFiles = this._getFilesWithXhr(file.xhr);
        for (_i = 0, _len = groupedFiles.length; _i < _len; _i++) {
          groupedFile = groupedFiles[_i];
          groupedFile.status = Dropzone.CANCELED;
        }
        file.xhr.abort();
        for (_j = 0, _len1 = groupedFiles.length; _j < _len1; _j++) {
          groupedFile = groupedFiles[_j];
          this.emit("canceled", groupedFile);
        }
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", groupedFiles);
        }
      } else if ((_ref = file.status) === Dropzone.ADDED || _ref === Dropzone.QUEUED) {
        file.status = Dropzone.CANCELED;
        this.emit("canceled", file);
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", [file]);
        }
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    resolveOption = function() {
      var args, option;
      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (typeof option === 'function') {
        return option.apply(this, args);
      }
      return option;
    };

    Dropzone.prototype.uploadFile = function(file) {
      return this.uploadFiles([file]);
    };

    Dropzone.prototype.uploadFiles = function(files) {
      var file, formData, handleError, headerName, headerValue, headers, i, input, inputName, inputType, key, method, option, progressObj, response, updateProgress, url, value, xhr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      xhr = new XMLHttpRequest();
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.xhr = xhr;
      }
      method = resolveOption(this.options.method, files);
      url = resolveOption(this.options.url, files);
      xhr.open(method, url, true);
      xhr.withCredentials = !!this.options.withCredentials;
      response = null;
      handleError = (function(_this) {
        return function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
            file = files[_j];
            _results.push(_this._errorProcessing(files, response || _this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr));
          }
          return _results;
        };
      })(this);
      updateProgress = (function(_this) {
        return function(e) {
          var allFilesFinished, progress, _j, _k, _l, _len1, _len2, _len3, _results;
          if (e != null) {
            progress = 100 * e.loaded / e.total;
            for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
              file = files[_j];
              file.upload = {
                progress: progress,
                total: e.total,
                bytesSent: e.loaded
              };
            }
          } else {
            allFilesFinished = true;
            progress = 100;
            for (_k = 0, _len2 = files.length; _k < _len2; _k++) {
              file = files[_k];
              if (!(file.upload.progress === 100 && file.upload.bytesSent === file.upload.total)) {
                allFilesFinished = false;
              }
              file.upload.progress = progress;
              file.upload.bytesSent = file.upload.total;
            }
            if (allFilesFinished) {
              return;
            }
          }
          _results = [];
          for (_l = 0, _len3 = files.length; _l < _len3; _l++) {
            file = files[_l];
            _results.push(_this.emit("uploadprogress", file, progress, file.upload.bytesSent));
          }
          return _results;
        };
      })(this);
      xhr.onload = (function(_this) {
        return function(e) {
          var _ref;
          if (files[0].status === Dropzone.CANCELED) {
            return;
          }
          if (xhr.readyState !== 4) {
            return;
          }
          response = xhr.responseText;
          if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
            try {
              response = JSON.parse(response);
            } catch (_error) {
              e = _error;
              response = "Invalid JSON response from server.";
            }
          }
          updateProgress();
          if (!((200 <= (_ref = xhr.status) && _ref < 300))) {
            return handleError();
          } else {
            return _this._finished(files, response, e);
          }
        };
      })(this);
      xhr.onerror = (function(_this) {
        return function() {
          if (files[0].status === Dropzone.CANCELED) {
            return;
          }
          return handleError();
        };
      })(this);
      progressObj = (_ref = xhr.upload) != null ? _ref : xhr;
      progressObj.onprogress = updateProgress;
      headers = {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"
      };
      if (this.options.headers) {
        extend(headers, this.options.headers);
      }
      for (headerName in headers) {
        headerValue = headers[headerName];
        if (headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        }
      }
      formData = new FormData();
      if (this.options.params) {
        _ref1 = this.options.params;
        for (key in _ref1) {
          value = _ref1[key];
          formData.append(key, value);
        }
      }
      for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
        file = files[_j];
        this.emit("sending", file, xhr, formData);
      }
      if (this.options.uploadMultiple) {
        this.emit("sendingmultiple", files, xhr, formData);
      }
      if (this.element.tagName === "FORM") {
        _ref2 = this.element.querySelectorAll("input, textarea, select, button");
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          input = _ref2[_k];
          inputName = input.getAttribute("name");
          inputType = input.getAttribute("type");
          if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
            _ref3 = input.options;
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              option = _ref3[_l];
              if (option.selected) {
                formData.append(inputName, option.value);
              }
            }
          } else if (!inputType || ((_ref4 = inputType.toLowerCase()) !== "checkbox" && _ref4 !== "radio") || input.checked) {
            formData.append(inputName, input.value);
          }
        }
      }
      for (i = _m = 0, _ref5 = files.length - 1; 0 <= _ref5 ? _m <= _ref5 : _m >= _ref5; i = 0 <= _ref5 ? ++_m : --_m) {
        formData.append(this._getParamName(i), files[i], this._renameFilename(files[i].name));
      }
      return this.submitRequest(xhr, formData, files);
    };

    Dropzone.prototype.submitRequest = function(xhr, formData, files) {
      return xhr.send(formData);
    };

    Dropzone.prototype._finished = function(files, responseText, e) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.status = Dropzone.SUCCESS;
        this.emit("success", file, responseText, e);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("successmultiple", files, responseText, e);
        this.emit("completemultiple", files);
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    Dropzone.prototype._errorProcessing = function(files, message, xhr) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.status = Dropzone.ERROR;
        this.emit("error", file, message, xhr);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("errormultiple", files, message, xhr);
        this.emit("completemultiple", files);
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    return Dropzone;

  })(Emitter);

  Dropzone.version = "4.3.0";

  Dropzone.options = {};

  Dropzone.optionsForElement = function(element) {
    if (element.getAttribute("id")) {
      return Dropzone.options[camelize(element.getAttribute("id"))];
    } else {
      return void 0;
    }
  };

  Dropzone.instances = [];

  Dropzone.forElement = function(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    if ((element != null ? element.dropzone : void 0) == null) {
      throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
    }
    return element.dropzone;
  };

  Dropzone.autoDiscover = true;

  Dropzone.discover = function() {
    var checkElements, dropzone, dropzones, _i, _len, _results;
    if (document.querySelectorAll) {
      dropzones = document.querySelectorAll(".dropzone");
    } else {
      dropzones = [];
      checkElements = function(elements) {
        var el, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          el = elements[_i];
          if (/(^| )dropzone($| )/.test(el.className)) {
            _results.push(dropzones.push(el));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      checkElements(document.getElementsByTagName("div"));
      checkElements(document.getElementsByTagName("form"));
    }
    _results = [];
    for (_i = 0, _len = dropzones.length; _i < _len; _i++) {
      dropzone = dropzones[_i];
      if (Dropzone.optionsForElement(dropzone) !== false) {
        _results.push(new Dropzone(dropzone));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Dropzone.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i];

  Dropzone.isBrowserSupported = function() {
    var capableBrowser, regex, _i, _len, _ref;
    capableBrowser = true;
    if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
      if (!("classList" in document.createElement("a"))) {
        capableBrowser = false;
      } else {
        _ref = Dropzone.blacklistedBrowsers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          regex = _ref[_i];
          if (regex.test(navigator.userAgent)) {
            capableBrowser = false;
            continue;
          }
        }
      }
    } else {
      capableBrowser = false;
    }
    return capableBrowser;
  };

  without = function(list, rejectedItem) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      item = list[_i];
      if (item !== rejectedItem) {
        _results.push(item);
      }
    }
    return _results;
  };

  camelize = function(str) {
    return str.replace(/[\-_](\w)/g, function(match) {
      return match.charAt(1).toUpperCase();
    });
  };

  Dropzone.createElement = function(string) {
    var div;
    div = document.createElement("div");
    div.innerHTML = string;
    return div.childNodes[0];
  };

  Dropzone.elementInside = function(element, container) {
    if (element === container) {
      return true;
    }
    while (element = element.parentNode) {
      if (element === container) {
        return true;
      }
    }
    return false;
  };

  Dropzone.getElement = function(el, name) {
    var element;
    if (typeof el === "string") {
      element = document.querySelector(el);
    } else if (el.nodeType != null) {
      element = el;
    }
    if (element == null) {
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
    }
    return element;
  };

  Dropzone.getElements = function(els, name) {
    var e, el, elements, _i, _j, _len, _len1, _ref;
    if (els instanceof Array) {
      elements = [];
      try {
        for (_i = 0, _len = els.length; _i < _len; _i++) {
          el = els[_i];
          elements.push(this.getElement(el, name));
        }
      } catch (_error) {
        e = _error;
        elements = null;
      }
    } else if (typeof els === "string") {
      elements = [];
      _ref = document.querySelectorAll(els);
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        el = _ref[_j];
        elements.push(el);
      }
    } else if (els.nodeType != null) {
      elements = [els];
    }
    if (!((elements != null) && elements.length)) {
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
    }
    return elements;
  };

  Dropzone.confirm = function(question, accepted, rejected) {
    if (window.confirm(question)) {
      return accepted();
    } else if (rejected != null) {
      return rejected();
    }
  };

  Dropzone.isValidFile = function(file, acceptedFiles) {
    var baseMimeType, mimeType, validType, _i, _len;
    if (!acceptedFiles) {
      return true;
    }
    acceptedFiles = acceptedFiles.split(",");
    mimeType = file.type;
    baseMimeType = mimeType.replace(/\/.*$/, "");
    for (_i = 0, _len = acceptedFiles.length; _i < _len; _i++) {
      validType = acceptedFiles[_i];
      validType = validType.trim();
      if (validType.charAt(0) === ".") {
        if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
          return true;
        }
      } else if (/\/\*$/.test(validType)) {
        if (baseMimeType === validType.replace(/\/.*$/, "")) {
          return true;
        }
      } else {
        if (mimeType === validType) {
          return true;
        }
      }
    }
    return false;
  };

  if (typeof jQuery !== "undefined" && jQuery !== null) {
    jQuery.fn.dropzone = function(options) {
      return this.each(function() {
        return new Dropzone(this, options);
      });
    };
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Dropzone;
  } else {
    window.Dropzone = Dropzone;
  }

  Dropzone.ADDED = "added";

  Dropzone.QUEUED = "queued";

  Dropzone.ACCEPTED = Dropzone.QUEUED;

  Dropzone.UPLOADING = "uploading";

  Dropzone.PROCESSING = Dropzone.UPLOADING;

  Dropzone.CANCELED = "canceled";

  Dropzone.ERROR = "error";

  Dropzone.SUCCESS = "success";


  /*

  Bugfix for iOS 6 and 7
  Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
  based on the work of https://github.com/stomita/ios-imagefile-megapixel
   */

  detectVerticalSquash = function(img) {
    var alpha, canvas, ctx, data, ey, ih, iw, py, ratio, sy;
    iw = img.naturalWidth;
    ih = img.naturalHeight;
    canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = ih;
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    data = ctx.getImageData(0, 0, 1, ih).data;
    sy = 0;
    ey = ih;
    py = ih;
    while (py > sy) {
      alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    ratio = py / ih;
    if (ratio === 0) {
      return 1;
    } else {
      return ratio;
    }
  };

  drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    var vertSquashRatio;
    vertSquashRatio = detectVerticalSquash(img);
    return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
  };


  /*
   * contentloaded.js
   *
   * Author: Diego Perini (diego.perini at gmail.com)
   * Summary: cross-browser wrapper for DOMContentLoaded
   * Updated: 20101020
   * License: MIT
   * Version: 1.2
   *
   * URL:
   * http://javascript.nwbox.com/ContentLoaded/
   * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
   */

  contentLoaded = function(win, fn) {
    var add, doc, done, init, poll, pre, rem, root, top;
    done = false;
    top = true;
    doc = win.document;
    root = doc.documentElement;
    add = (doc.addEventListener ? "addEventListener" : "attachEvent");
    rem = (doc.addEventListener ? "removeEventListener" : "detachEvent");
    pre = (doc.addEventListener ? "" : "on");
    init = function(e) {
      if (e.type === "readystatechange" && doc.readyState !== "complete") {
        return;
      }
      (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
      if (!done && (done = true)) {
        return fn.call(win, e.type || e);
      }
    };
    poll = function() {
      var e;
      try {
        root.doScroll("left");
      } catch (_error) {
        e = _error;
        setTimeout(poll, 50);
        return;
      }
      return init("poll");
    };
    if (doc.readyState !== "complete") {
      if (doc.createEventObject && root.doScroll) {
        try {
          top = !win.frameElement;
        } catch (_error) {}
        if (top) {
          poll();
        }
      }
      doc[add](pre + "DOMContentLoaded", init, false);
      doc[add](pre + "readystatechange", init, false);
      return win[add](pre + "load", init, false);
    }
  };

  Dropzone._autoDiscoverFunction = function() {
    if (Dropzone.autoDiscover) {
      return Dropzone.discover();
    }
  };

  contentLoaded(window, Dropzone._autoDiscoverFunction);

}).call(this);
"use strict";
(function(root, factory) {
  if(typeof exports === 'object') {
    module.exports = factory();
  }
  else if(typeof define === 'function' && define.amd) {
    define(['jquery', 'googlemaps!'], factory);
  }
  else {
    root.GMaps = factory();
  }


}(this, function() {

/*!
 * GMaps.js v0.4.22
 * http://hpneo.github.com/gmaps/
 *
 * Copyright 2016, Gustavo Leon
 * Released under the MIT License.
 */

var extend_object = function(obj, new_obj) {
  var name;

  if (obj === new_obj) {
    return obj;
  }

  for (name in new_obj) {
    if (new_obj[name] !== undefined) {
      obj[name] = new_obj[name];
    }
  }

  return obj;
};

var replace_object = function(obj, replace) {
  var name;

  if (obj === replace) {
    return obj;
  }

  for (name in replace) {
    if (obj[name] != undefined) {
      obj[name] = replace[name];
    }
  }

  return obj;
};

var array_map = function(array, callback) {
  var original_callback_params = Array.prototype.slice.call(arguments, 2),
      array_return = [],
      array_length = array.length,
      i;

  if (Array.prototype.map && array.map === Array.prototype.map) {
    array_return = Array.prototype.map.call(array, function(item) {
      var callback_params = original_callback_params.slice(0);
      callback_params.splice(0, 0, item);

      return callback.apply(this, callback_params);
    });
  }
  else {
    for (i = 0; i < array_length; i++) {
      callback_params = original_callback_params;
      callback_params.splice(0, 0, array[i]);
      array_return.push(callback.apply(this, callback_params));
    }
  }

  return array_return;
};

var array_flat = function(array) {
  var new_array = [],
      i;

  for (i = 0; i < array.length; i++) {
    new_array = new_array.concat(array[i]);
  }

  return new_array;
};

var coordsToLatLngs = function(coords, useGeoJSON) {
  var first_coord = coords[0],
      second_coord = coords[1];

  if (useGeoJSON) {
    first_coord = coords[1];
    second_coord = coords[0];
  }

  return new google.maps.LatLng(first_coord, second_coord);
};

var arrayToLatLng = function(coords, useGeoJSON) {
  var i;

  for (i = 0; i < coords.length; i++) {
    if (!(coords[i] instanceof google.maps.LatLng)) {
      if (coords[i].length > 0 && typeof(coords[i][0]) === "object") {
        coords[i] = arrayToLatLng(coords[i], useGeoJSON);
      }
      else {
        coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
      }
    }
  }

  return coords;
};

var getElementsByClassName = function (class_name, context) {
    var element,
        _class = class_name.replace('.', '');

    if ('jQuery' in this && context) {
        element = $("." + _class, context)[0];
    } else {
        element = document.getElementsByClassName(_class)[0];
    }
    return element;

};

var getElementById = function(id, context) {
  var element,
  id = id.replace('#', '');

  if ('jQuery' in window && context) {
    element = $('#' + id, context)[0];
  } else {
    element = document.getElementById(id);
  };

  return element;
};

var findAbsolutePosition = function(obj)  {
  var curleft = 0,
      curtop = 0;

  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
  }

  return [curleft, curtop];
};

var GMaps = (function(global) {
  "use strict";

  var doc = document;

  var GMaps = function(options) {

    if (!(typeof window.google === 'object' && window.google.maps)) {
      if (typeof window.console === 'object' && window.console.error) {
        console.error('Google Maps API is required. Please register the following JavaScript library https://maps.googleapis.com/maps/api/js.');
      }

      return function() {};
    }

    if (!this) return new GMaps(options);

    options.zoom = options.zoom || 15;
    options.mapType = options.mapType || 'roadmap';

    var valueOrDefault = function(value, defaultValue) {
      return value === undefined ? defaultValue : value;
    };

    var self = this,
        i,
        events_that_hide_context_menu = [
          'bounds_changed', 'center_changed', 'click', 'dblclick', 'drag',
          'dragend', 'dragstart', 'idle', 'maptypeid_changed', 'projection_changed',
          'resize', 'tilesloaded', 'zoom_changed'
        ],
        events_that_doesnt_hide_context_menu = ['mousemove', 'mouseout', 'mouseover'],
        options_to_be_deleted = ['el', 'lat', 'lng', 'mapType', 'width', 'height', 'markerClusterer', 'enableNewStyle'],
        identifier = options.el || options.div,
        markerClustererFunction = options.markerClusterer,
        mapType = google.maps.MapTypeId[options.mapType.toUpperCase()],
        map_center = new google.maps.LatLng(options.lat, options.lng),
        zoomControl = valueOrDefault(options.zoomControl, true),
        zoomControlOpt = options.zoomControlOpt || {
          style: 'DEFAULT',
          position: 'TOP_LEFT'
        },
        zoomControlStyle = zoomControlOpt.style || 'DEFAULT',
        zoomControlPosition = zoomControlOpt.position || 'TOP_LEFT',
        panControl = valueOrDefault(options.panControl, true),
        mapTypeControl = valueOrDefault(options.mapTypeControl, true),
        scaleControl = valueOrDefault(options.scaleControl, true),
        streetViewControl = valueOrDefault(options.streetViewControl, true),
        overviewMapControl = valueOrDefault(overviewMapControl, true),
        map_options = {},
        map_base_options = {
          zoom: this.zoom,
          center: map_center,
          mapTypeId: mapType
        },
        map_controls_options = {
          panControl: panControl,
          zoomControl: zoomControl,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle[zoomControlStyle],
            position: google.maps.ControlPosition[zoomControlPosition]
          },
          mapTypeControl: mapTypeControl,
          scaleControl: scaleControl,
          streetViewControl: streetViewControl,
          overviewMapControl: overviewMapControl
        };

      if (typeof(options.el) === 'string' || typeof(options.div) === 'string') {
        if (identifier.indexOf("#") > -1) {
            this.el = getElementById(identifier, options.context);
        } else {
            this.el = getElementsByClassName.apply(this, [identifier, options.context]);
        }
      } else {
          this.el = identifier;
      }

    if (typeof(this.el) === 'undefined' || this.el === null) {
      throw 'No element defined.';
    }

    window.context_menu = window.context_menu || {};
    window.context_menu[self.el.id] = {};

    this.controls = [];
    this.overlays = [];
    this.layers = []; // array with kml/georss and fusiontables layers, can be as many
    this.singleLayers = {}; // object with the other layers, only one per layer
    this.markers = [];
    this.polylines = [];
    this.routes = [];
    this.polygons = [];
    this.infoWindow = null;
    this.overlay_el = null;
    this.zoom = options.zoom;
    this.registered_events = {};

    this.el.style.width = options.width || this.el.scrollWidth || this.el.offsetWidth;
    this.el.style.height = options.height || this.el.scrollHeight || this.el.offsetHeight;

    google.maps.visualRefresh = options.enableNewStyle;

    for (i = 0; i < options_to_be_deleted.length; i++) {
      delete options[options_to_be_deleted[i]];
    }

    if(options.disableDefaultUI != true) {
      map_base_options = extend_object(map_base_options, map_controls_options);
    }

    map_options = extend_object(map_base_options, options);

    for (i = 0; i < events_that_hide_context_menu.length; i++) {
      delete map_options[events_that_hide_context_menu[i]];
    }

    for (i = 0; i < events_that_doesnt_hide_context_menu.length; i++) {
      delete map_options[events_that_doesnt_hide_context_menu[i]];
    }

    this.map = new google.maps.Map(this.el, map_options);

    if (markerClustererFunction) {
      this.markerClusterer = markerClustererFunction.apply(this, [this.map]);
    }

    var buildContextMenuHTML = function(control, e) {
      var html = '',
          options = window.context_menu[self.el.id][control];

      for (var i in options){
        if (options.hasOwnProperty(i)) {
          var option = options[i];

          html += '<li><a id="' + control + '_' + i + '" href="#">' + option.title + '</a></li>';
        }
      }

      if (!getElementById('gmaps_context_menu')) return;

      var context_menu_element = getElementById('gmaps_context_menu');

      context_menu_element.innerHTML = html;

      var context_menu_items = context_menu_element.getElementsByTagName('a'),
          context_menu_items_count = context_menu_items.length,
          i;

      for (i = 0; i < context_menu_items_count; i++) {
        var context_menu_item = context_menu_items[i];

        var assign_menu_item_action = function(ev){
          ev.preventDefault();

          options[this.id.replace(control + '_', '')].action.apply(self, [e]);
          self.hideContextMenu();
        };

        google.maps.event.clearListeners(context_menu_item, 'click');
        google.maps.event.addDomListenerOnce(context_menu_item, 'click', assign_menu_item_action, false);
      }

      var position = findAbsolutePosition.apply(this, [self.el]),
          left = position[0] + e.pixel.x - 15,
          top = position[1] + e.pixel.y- 15;

      context_menu_element.style.left = left + "px";
      context_menu_element.style.top = top + "px";

      // context_menu_element.style.display = 'block';
    };

    this.buildContextMenu = function(control, e) {
      if (control === 'marker') {
        e.pixel = {};

        var overlay = new google.maps.OverlayView();
        overlay.setMap(self.map);

        overlay.draw = function() {
          var projection = overlay.getProjection(),
              position = e.marker.getPosition();

          e.pixel = projection.fromLatLngToContainerPixel(position);

          buildContextMenuHTML(control, e);
        };
      }
      else {
        buildContextMenuHTML(control, e);
      }

      var context_menu_element = getElementById('gmaps_context_menu');

      setTimeout(function() {
        context_menu_element.style.display = 'block';
      }, 0);
    };

    this.setContextMenu = function(options) {
      window.context_menu[self.el.id][options.control] = {};

      var i,
          ul = doc.createElement('ul');

      for (i in options.options) {
        if (options.options.hasOwnProperty(i)) {
          var option = options.options[i];

          window.context_menu[self.el.id][options.control][option.name] = {
            title: option.title,
            action: option.action
          };
        }
      }

      ul.id = 'gmaps_context_menu';
      ul.style.display = 'none';
      ul.style.position = 'absolute';
      ul.style.minWidth = '100px';
      ul.style.background = 'white';
      ul.style.listStyle = 'none';
      ul.style.padding = '8px';
      ul.style.boxShadow = '2px 2px 6px #ccc';

      if (!getElementById('gmaps_context_menu')) {
        doc.body.appendChild(ul);
      }

      var context_menu_element = getElementById('gmaps_context_menu');

      google.maps.event.addDomListener(context_menu_element, 'mouseout', function(ev) {
        if (!ev.relatedTarget || !this.contains(ev.relatedTarget)) {
          window.setTimeout(function(){
            context_menu_element.style.display = 'none';
          }, 400);
        }
      }, false);
    };

    this.hideContextMenu = function() {
      var context_menu_element = getElementById('gmaps_context_menu');

      if (context_menu_element) {
        context_menu_element.style.display = 'none';
      }
    };

    var setupListener = function(object, name) {
      google.maps.event.addListener(object, name, function(e){
        if (e == undefined) {
          e = this;
        }

        options[name].apply(this, [e]);

        self.hideContextMenu();
      });
    };

    //google.maps.event.addListener(this.map, 'idle', this.hideContextMenu);
    google.maps.event.addListener(this.map, 'zoom_changed', this.hideContextMenu);

    for (var ev = 0; ev < events_that_hide_context_menu.length; ev++) {
      var name = events_that_hide_context_menu[ev];

      if (name in options) {
        setupListener(this.map, name);
      }
    }

    for (var ev = 0; ev < events_that_doesnt_hide_context_menu.length; ev++) {
      var name = events_that_doesnt_hide_context_menu[ev];

      if (name in options) {
        setupListener(this.map, name);
      }
    }

    google.maps.event.addListener(this.map, 'rightclick', function(e) {
      if (options.rightclick) {
        options.rightclick.apply(this, [e]);
      }

      if(window.context_menu[self.el.id]['map'] != undefined) {
        self.buildContextMenu('map', e);
      }
    });

    this.refresh = function() {
      google.maps.event.trigger(this.map, 'resize');
    };

    this.fitZoom = function() {
      var latLngs = [],
          markers_length = this.markers.length,
          i;

      for (i = 0; i < markers_length; i++) {
        if(typeof(this.markers[i].visible) === 'boolean' && this.markers[i].visible) {
          latLngs.push(this.markers[i].getPosition());
        }
      }

      this.fitLatLngBounds(latLngs);
    };

    this.fitLatLngBounds = function(latLngs) {
      var total = latLngs.length,
          bounds = new google.maps.LatLngBounds(),
          i;

      for(i = 0; i < total; i++) {
        bounds.extend(latLngs[i]);
      }

      this.map.fitBounds(bounds);
    };

    this.setCenter = function(lat, lng, callback) {
      this.map.panTo(new google.maps.LatLng(lat, lng));

      if (callback) {
        callback();
      }
    };

    this.getElement = function() {
      return this.el;
    };

    this.zoomIn = function(value) {
      value = value || 1;

      this.zoom = this.map.getZoom() + value;
      this.map.setZoom(this.zoom);
    };

    this.zoomOut = function(value) {
      value = value || 1;

      this.zoom = this.map.getZoom() - value;
      this.map.setZoom(this.zoom);
    };

    var native_methods = [],
        method;

    for (method in this.map) {
      if (typeof(this.map[method]) == 'function' && !this[method]) {
        native_methods.push(method);
      }
    }

    for (i = 0; i < native_methods.length; i++) {
      (function(gmaps, scope, method_name) {
        gmaps[method_name] = function(){
          return scope[method_name].apply(scope, arguments);
        };
      })(this, this.map, native_methods[i]);
    }
  };

  return GMaps;
})(this);

GMaps.prototype.createControl = function(options) {
  var control = document.createElement('div');

  control.style.cursor = 'pointer';

  if (options.disableDefaultStyles !== true) {
    control.style.fontFamily = 'Roboto, Arial, sans-serif';
    control.style.fontSize = '11px';
    control.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
  }

  for (var option in options.style) {
    control.style[option] = options.style[option];
  }

  if (options.id) {
    control.id = options.id;
  }

  if (options.title) {
    control.title = options.title;
  }

  if (options.classes) {
    control.className = options.classes;
  }

  if (options.content) {
    if (typeof options.content === 'string') {
      control.innerHTML = options.content;
    }
    else if (options.content instanceof HTMLElement) {
      control.appendChild(options.content);
    }
  }

  if (options.position) {
    control.position = google.maps.ControlPosition[options.position.toUpperCase()];
  }

  for (var ev in options.events) {
    (function(object, name) {
      google.maps.event.addDomListener(object, name, function(){
        options.events[name].apply(this, [this]);
      });
    })(control, ev);
  }

  control.index = 1;

  return control;
};

GMaps.prototype.addControl = function(options) {
  var control = this.createControl(options);

  this.controls.push(control);
  this.map.controls[control.position].push(control);

  return control;
};

GMaps.prototype.removeControl = function(control) {
  var position = null,
      i;

  for (i = 0; i < this.controls.length; i++) {
    if (this.controls[i] == control) {
      position = this.controls[i].position;
      this.controls.splice(i, 1);
    }
  }

  if (position) {
    for (i = 0; i < this.map.controls.length; i++) {
      var controlsForPosition = this.map.controls[control.position];

      if (controlsForPosition.getAt(i) == control) {
        controlsForPosition.removeAt(i);

        break;
      }
    }
  }

  return control;
};

GMaps.prototype.createMarker = function(options) {
  if (options.lat == undefined && options.lng == undefined && options.position == undefined) {
    throw 'No latitude or longitude defined.';
  }

  var self = this,
      details = options.details,
      fences = options.fences,
      outside = options.outside,
      base_options = {
        position: new google.maps.LatLng(options.lat, options.lng),
        map: null
      },
      marker_options = extend_object(base_options, options);

  delete marker_options.lat;
  delete marker_options.lng;
  delete marker_options.fences;
  delete marker_options.outside;

  var marker = new google.maps.Marker(marker_options);

  marker.fences = fences;

  if (options.infoWindow) {
    marker.infoWindow = new google.maps.InfoWindow(options.infoWindow);

    var info_window_events = ['closeclick', 'content_changed', 'domready', 'position_changed', 'zindex_changed'];

    for (var ev = 0; ev < info_window_events.length; ev++) {
      (function(object, name) {
        if (options.infoWindow[name]) {
          google.maps.event.addListener(object, name, function(e){
            options.infoWindow[name].apply(this, [e]);
          });
        }
      })(marker.infoWindow, info_window_events[ev]);
    }
  }

  var marker_events = ['animation_changed', 'clickable_changed', 'cursor_changed', 'draggable_changed', 'flat_changed', 'icon_changed', 'position_changed', 'shadow_changed', 'shape_changed', 'title_changed', 'visible_changed', 'zindex_changed'];

  var marker_events_with_mouse = ['dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];

  for (var ev = 0; ev < marker_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(){
          options[name].apply(this, [this]);
        });
      }
    })(marker, marker_events[ev]);
  }

  for (var ev = 0; ev < marker_events_with_mouse.length; ev++) {
    (function(map, object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(me){
          if(!me.pixel){
            me.pixel = map.getProjection().fromLatLngToPoint(me.latLng)
          }

          options[name].apply(this, [me]);
        });
      }
    })(this.map, marker, marker_events_with_mouse[ev]);
  }

  google.maps.event.addListener(marker, 'click', function() {
    this.details = details;

    if (options.click) {
      options.click.apply(this, [this]);
    }

    if (marker.infoWindow) {
      self.hideInfoWindows();
      marker.infoWindow.open(self.map, marker);
    }
  });

  google.maps.event.addListener(marker, 'rightclick', function(e) {
    e.marker = this;

    if (options.rightclick) {
      options.rightclick.apply(this, [e]);
    }

    if (window.context_menu[self.el.id]['marker'] != undefined) {
      self.buildContextMenu('marker', e);
    }
  });

  if (marker.fences) {
    google.maps.event.addListener(marker, 'dragend', function() {
      self.checkMarkerGeofence(marker, function(m, f) {
        outside(m, f);
      });
    });
  }

  return marker;
};

GMaps.prototype.addMarker = function(options) {
  var marker;
  if(options.hasOwnProperty('gm_accessors_')) {
    // Native google.maps.Marker object
    marker = options;
  }
  else {
    if ((options.hasOwnProperty('lat') && options.hasOwnProperty('lng')) || options.position) {
      marker = this.createMarker(options);
    }
    else {
      throw 'No latitude or longitude defined.';
    }
  }

  marker.setMap(this.map);

  if(this.markerClusterer) {
    this.markerClusterer.addMarker(marker);
  }

  this.markers.push(marker);

  GMaps.fire('marker_added', marker, this);

  return marker;
};

GMaps.prototype.addMarkers = function(array) {
  for (var i = 0, marker; marker=array[i]; i++) {
    this.addMarker(marker);
  }

  return this.markers;
};

GMaps.prototype.hideInfoWindows = function() {
  for (var i = 0, marker; marker = this.markers[i]; i++){
    if (marker.infoWindow) {
      marker.infoWindow.close();
    }
  }
};

GMaps.prototype.removeMarker = function(marker) {
  for (var i = 0; i < this.markers.length; i++) {
    if (this.markers[i] === marker) {
      this.markers[i].setMap(null);
      this.markers.splice(i, 1);

      if(this.markerClusterer) {
        this.markerClusterer.removeMarker(marker);
      }

      GMaps.fire('marker_removed', marker, this);

      break;
    }
  }

  return marker;
};

GMaps.prototype.removeMarkers = function (collection) {
  var new_markers = [];

  if (typeof collection == 'undefined') {
    for (var i = 0; i < this.markers.length; i++) {
      var marker = this.markers[i];
      marker.setMap(null);

      if(this.markerClusterer) {
        this.markerClusterer.removeMarker(marker);
      }

      GMaps.fire('marker_removed', marker, this);
    }

    this.markers = new_markers;
  }
  else {
    for (var i = 0; i < collection.length; i++) {
      var index = this.markers.indexOf(collection[i]);

      if (index > -1) {
        var marker = this.markers[index];
        marker.setMap(null);

        if(this.markerClusterer) {
          this.markerClusterer.removeMarker(marker);
        }

        GMaps.fire('marker_removed', marker, this);
      }
    }

    for (var i = 0; i < this.markers.length; i++) {
      var marker = this.markers[i];
      if (marker.getMap() != null) {
        new_markers.push(marker);
      }
    }

    this.markers = new_markers;
  }
};

GMaps.prototype.drawOverlay = function(options) {
  var overlay = new google.maps.OverlayView(),
      auto_show = true;

  overlay.setMap(this.map);

  if (options.auto_show != null) {
    auto_show = options.auto_show;
  }

  overlay.onAdd = function() {
    var el = document.createElement('div');

    el.style.borderStyle = "none";
    el.style.borderWidth = "0px";
    el.style.position = "absolute";
    el.style.zIndex = 100;
    el.innerHTML = options.content;

    overlay.el = el;

    if (!options.layer) {
      options.layer = 'overlayLayer';
    }

    var panes = this.getPanes(),
        overlayLayer = panes[options.layer],
        stop_overlay_events = ['contextmenu', 'DOMMouseScroll', 'dblclick', 'mousedown'];

    overlayLayer.appendChild(el);

    for (var ev = 0; ev < stop_overlay_events.length; ev++) {
      (function(object, name) {
        google.maps.event.addDomListener(object, name, function(e){
          if (navigator.userAgent.toLowerCase().indexOf('msie') != -1 && document.all) {
            e.cancelBubble = true;
            e.returnValue = false;
          }
          else {
            e.stopPropagation();
          }
        });
      })(el, stop_overlay_events[ev]);
    }

    if (options.click) {
      panes.overlayMouseTarget.appendChild(overlay.el);
      google.maps.event.addDomListener(overlay.el, 'click', function() {
        options.click.apply(overlay, [overlay]);
      });
    }

    google.maps.event.trigger(this, 'ready');
  };

  overlay.draw = function() {
    var projection = this.getProjection(),
        pixel = projection.fromLatLngToDivPixel(new google.maps.LatLng(options.lat, options.lng));

    options.horizontalOffset = options.horizontalOffset || 0;
    options.verticalOffset = options.verticalOffset || 0;

    var el = overlay.el,
        content = el.children[0],
        content_height = content.clientHeight,
        content_width = content.clientWidth;

    switch (options.verticalAlign) {
      case 'top':
        el.style.top = (pixel.y - content_height + options.verticalOffset) + 'px';
        break;
      default:
      case 'middle':
        el.style.top = (pixel.y - (content_height / 2) + options.verticalOffset) + 'px';
        break;
      case 'bottom':
        el.style.top = (pixel.y + options.verticalOffset) + 'px';
        break;
    }

    switch (options.horizontalAlign) {
      case 'left':
        el.style.left = (pixel.x - content_width + options.horizontalOffset) + 'px';
        break;
      default:
      case 'center':
        el.style.left = (pixel.x - (content_width / 2) + options.horizontalOffset) + 'px';
        break;
      case 'right':
        el.style.left = (pixel.x + options.horizontalOffset) + 'px';
        break;
    }

    el.style.display = auto_show ? 'block' : 'none';

    if (!auto_show) {
      options.show.apply(this, [el]);
    }
  };

  overlay.onRemove = function() {
    var el = overlay.el;

    if (options.remove) {
      options.remove.apply(this, [el]);
    }
    else {
      overlay.el.parentNode.removeChild(overlay.el);
      overlay.el = null;
    }
  };

  this.overlays.push(overlay);
  return overlay;
};

GMaps.prototype.removeOverlay = function(overlay) {
  for (var i = 0; i < this.overlays.length; i++) {
    if (this.overlays[i] === overlay) {
      this.overlays[i].setMap(null);
      this.overlays.splice(i, 1);

      break;
    }
  }
};

GMaps.prototype.removeOverlays = function() {
  for (var i = 0, item; item = this.overlays[i]; i++) {
    item.setMap(null);
  }

  this.overlays = [];
};

GMaps.prototype.drawPolyline = function(options) {
  var path = [],
      points = options.path;

  if (points.length) {
    if (points[0][0] === undefined) {
      path = points;
    }
    else {
      for (var i = 0, latlng; latlng = points[i]; i++) {
        path.push(new google.maps.LatLng(latlng[0], latlng[1]));
      }
    }
  }

  var polyline_options = {
    map: this.map,
    path: path,
    strokeColor: options.strokeColor,
    strokeOpacity: options.strokeOpacity,
    strokeWeight: options.strokeWeight,
    geodesic: options.geodesic,
    clickable: true,
    editable: false,
    visible: true
  };

  if (options.hasOwnProperty("clickable")) {
    polyline_options.clickable = options.clickable;
  }

  if (options.hasOwnProperty("editable")) {
    polyline_options.editable = options.editable;
  }

  if (options.hasOwnProperty("icons")) {
    polyline_options.icons = options.icons;
  }

  if (options.hasOwnProperty("zIndex")) {
    polyline_options.zIndex = options.zIndex;
  }

  var polyline = new google.maps.Polyline(polyline_options);

  var polyline_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polyline_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polyline, polyline_events[ev]);
  }

  this.polylines.push(polyline);

  GMaps.fire('polyline_added', polyline, this);

  return polyline;
};

GMaps.prototype.removePolyline = function(polyline) {
  for (var i = 0; i < this.polylines.length; i++) {
    if (this.polylines[i] === polyline) {
      this.polylines[i].setMap(null);
      this.polylines.splice(i, 1);

      GMaps.fire('polyline_removed', polyline, this);

      break;
    }
  }
};

GMaps.prototype.removePolylines = function() {
  for (var i = 0, item; item = this.polylines[i]; i++) {
    item.setMap(null);
  }

  this.polylines = [];
};

GMaps.prototype.drawCircle = function(options) {
  options =  extend_object({
    map: this.map,
    center: new google.maps.LatLng(options.lat, options.lng)
  }, options);

  delete options.lat;
  delete options.lng;

  var polygon = new google.maps.Circle(options),
      polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polygon_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polygon, polygon_events[ev]);
  }

  this.polygons.push(polygon);

  return polygon;
};

GMaps.prototype.drawRectangle = function(options) {
  options = extend_object({
    map: this.map
  }, options);

  var latLngBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(options.bounds[0][0], options.bounds[0][1]),
    new google.maps.LatLng(options.bounds[1][0], options.bounds[1][1])
  );

  options.bounds = latLngBounds;

  var polygon = new google.maps.Rectangle(options),
      polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polygon_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polygon, polygon_events[ev]);
  }

  this.polygons.push(polygon);

  return polygon;
};

GMaps.prototype.drawPolygon = function(options) {
  var useGeoJSON = false;

  if(options.hasOwnProperty("useGeoJSON")) {
    useGeoJSON = options.useGeoJSON;
  }

  delete options.useGeoJSON;

  options = extend_object({
    map: this.map
  }, options);

  if (useGeoJSON == false) {
    options.paths = [options.paths.slice(0)];
  }

  if (options.paths.length > 0) {
    if (options.paths[0].length > 0) {
      options.paths = array_flat(array_map(options.paths, arrayToLatLng, useGeoJSON));
    }
  }

  var polygon = new google.maps.Polygon(options),
      polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polygon_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polygon, polygon_events[ev]);
  }

  this.polygons.push(polygon);

  GMaps.fire('polygon_added', polygon, this);

  return polygon;
};

GMaps.prototype.removePolygon = function(polygon) {
  for (var i = 0; i < this.polygons.length; i++) {
    if (this.polygons[i] === polygon) {
      this.polygons[i].setMap(null);
      this.polygons.splice(i, 1);

      GMaps.fire('polygon_removed', polygon, this);

      break;
    }
  }
};

GMaps.prototype.removePolygons = function() {
  for (var i = 0, item; item = this.polygons[i]; i++) {
    item.setMap(null);
  }

  this.polygons = [];
};

GMaps.prototype.getFromFusionTables = function(options) {
  var events = options.events;

  delete options.events;

  var fusion_tables_options = options,
      layer = new google.maps.FusionTablesLayer(fusion_tables_options);

  for (var ev in events) {
    (function(object, name) {
      google.maps.event.addListener(object, name, function(e) {
        events[name].apply(this, [e]);
      });
    })(layer, ev);
  }

  this.layers.push(layer);

  return layer;
};

GMaps.prototype.loadFromFusionTables = function(options) {
  var layer = this.getFromFusionTables(options);
  layer.setMap(this.map);

  return layer;
};

GMaps.prototype.getFromKML = function(options) {
  var url = options.url,
      events = options.events;

  delete options.url;
  delete options.events;

  var kml_options = options,
      layer = new google.maps.KmlLayer(url, kml_options);

  for (var ev in events) {
    (function(object, name) {
      google.maps.event.addListener(object, name, function(e) {
        events[name].apply(this, [e]);
      });
    })(layer, ev);
  }

  this.layers.push(layer);

  return layer;
};

GMaps.prototype.loadFromKML = function(options) {
  var layer = this.getFromKML(options);
  layer.setMap(this.map);

  return layer;
};

GMaps.prototype.addLayer = function(layerName, options) {
  //var default_layers = ['weather', 'clouds', 'traffic', 'transit', 'bicycling', 'panoramio', 'places'];
  options = options || {};
  var layer;

  switch(layerName) {
    case 'weather': this.singleLayers.weather = layer = new google.maps.weather.WeatherLayer();
      break;
    case 'clouds': this.singleLayers.clouds = layer = new google.maps.weather.CloudLayer();
      break;
    case 'traffic': this.singleLayers.traffic = layer = new google.maps.TrafficLayer();
      break;
    case 'transit': this.singleLayers.transit = layer = new google.maps.TransitLayer();
      break;
    case 'bicycling': this.singleLayers.bicycling = layer = new google.maps.BicyclingLayer();
      break;
    case 'panoramio':
        this.singleLayers.panoramio = layer = new google.maps.panoramio.PanoramioLayer();
        layer.setTag(options.filter);
        delete options.filter;

        //click event
        if (options.click) {
          google.maps.event.addListener(layer, 'click', function(event) {
            options.click(event);
            delete options.click;
          });
        }
      break;
      case 'places':
        this.singleLayers.places = layer = new google.maps.places.PlacesService(this.map);

        //search, nearbySearch, radarSearch callback, Both are the same
        if (options.search || options.nearbySearch || options.radarSearch) {
          var placeSearchRequest  = {
            bounds : options.bounds || null,
            keyword : options.keyword || null,
            location : options.location || null,
            name : options.name || null,
            radius : options.radius || null,
            rankBy : options.rankBy || null,
            types : options.types || null
          };

          if (options.radarSearch) {
            layer.radarSearch(placeSearchRequest, options.radarSearch);
          }

          if (options.search) {
            layer.search(placeSearchRequest, options.search);
          }

          if (options.nearbySearch) {
            layer.nearbySearch(placeSearchRequest, options.nearbySearch);
          }
        }

        //textSearch callback
        if (options.textSearch) {
          var textSearchRequest  = {
            bounds : options.bounds || null,
            location : options.location || null,
            query : options.query || null,
            radius : options.radius || null
          };

          layer.textSearch(textSearchRequest, options.textSearch);
        }
      break;
  }

  if (layer !== undefined) {
    if (typeof layer.setOptions == 'function') {
      layer.setOptions(options);
    }
    if (typeof layer.setMap == 'function') {
      layer.setMap(this.map);
    }

    return layer;
  }
};

GMaps.prototype.removeLayer = function(layer) {
  if (typeof(layer) == "string" && this.singleLayers[layer] !== undefined) {
     this.singleLayers[layer].setMap(null);

     delete this.singleLayers[layer];
  }
  else {
    for (var i = 0; i < this.layers.length; i++) {
      if (this.layers[i] === layer) {
        this.layers[i].setMap(null);
        this.layers.splice(i, 1);

        break;
      }
    }
  }
};

var travelMode, unitSystem;

GMaps.prototype.getRoutes = function(options) {
  switch (options.travelMode) {
    case 'bicycling':
      travelMode = google.maps.TravelMode.BICYCLING;
      break;
    case 'transit':
      travelMode = google.maps.TravelMode.TRANSIT;
      break;
    case 'driving':
      travelMode = google.maps.TravelMode.DRIVING;
      break;
    default:
      travelMode = google.maps.TravelMode.WALKING;
      break;
  }

  if (options.unitSystem === 'imperial') {
    unitSystem = google.maps.UnitSystem.IMPERIAL;
  }
  else {
    unitSystem = google.maps.UnitSystem.METRIC;
  }

  var base_options = {
        avoidHighways: false,
        avoidTolls: false,
        optimizeWaypoints: false,
        waypoints: []
      },
      request_options =  extend_object(base_options, options);

  request_options.origin = /string/.test(typeof options.origin) ? options.origin : new google.maps.LatLng(options.origin[0], options.origin[1]);
  request_options.destination = /string/.test(typeof options.destination) ? options.destination : new google.maps.LatLng(options.destination[0], options.destination[1]);
  request_options.travelMode = travelMode;
  request_options.unitSystem = unitSystem;

  delete request_options.callback;
  delete request_options.error;

  var self = this,
      service = new google.maps.DirectionsService();

  service.route(request_options, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      for (var r in result.routes) {
        if (result.routes.hasOwnProperty(r)) {
          self.routes.push(result.routes[r]);
        }
      }

      if (options.callback) {
        options.callback(self.routes, result, status);
      }
    }
    else {
      if (options.error) {
        options.error(result, status);
      }
    }
  });
};

GMaps.prototype.removeRoutes = function() {
  this.routes.length = 0;
};

GMaps.prototype.getElevations = function(options) {
  options = extend_object({
    locations: [],
    path : false,
    samples : 256
  }, options);

  if (options.locations.length > 0) {
    if (options.locations[0].length > 0) {
      options.locations = array_flat(array_map([options.locations], arrayToLatLng,  false));
    }
  }

  var callback = options.callback;
  delete options.callback;

  var service = new google.maps.ElevationService();

  //location request
  if (!options.path) {
    delete options.path;
    delete options.samples;

    service.getElevationForLocations(options, function(result, status) {
      if (callback && typeof(callback) === "function") {
        callback(result, status);
      }
    });
  //path request
  } else {
    var pathRequest = {
      path : options.locations,
      samples : options.samples
    };

    service.getElevationAlongPath(pathRequest, function(result, status) {
     if (callback && typeof(callback) === "function") {
        callback(result, status);
      }
    });
  }
};

GMaps.prototype.cleanRoute = GMaps.prototype.removePolylines;

GMaps.prototype.renderRoute = function(options, renderOptions) {
  var self = this,
      panel = ((typeof renderOptions.panel === 'string') ? document.getElementById(renderOptions.panel.replace('#', '')) : renderOptions.panel),
      display;

  renderOptions.panel = panel;
  renderOptions = extend_object({
    map: this.map
  }, renderOptions);
  display = new google.maps.DirectionsRenderer(renderOptions);

  this.getRoutes({
    origin: options.origin,
    destination: options.destination,
    travelMode: options.travelMode,
    waypoints: options.waypoints,
    unitSystem: options.unitSystem,
    error: options.error,
    avoidHighways: options.avoidHighways,
    avoidTolls: options.avoidTolls,
    optimizeWaypoints: options.optimizeWaypoints,
    callback: function(routes, response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        display.setDirections(response);
      }
    }
  });
};

GMaps.prototype.drawRoute = function(options) {
  var self = this;

  this.getRoutes({
    origin: options.origin,
    destination: options.destination,
    travelMode: options.travelMode,
    waypoints: options.waypoints,
    unitSystem: options.unitSystem,
    error: options.error,
    avoidHighways: options.avoidHighways,
    avoidTolls: options.avoidTolls,
    optimizeWaypoints: options.optimizeWaypoints,
    callback: function(routes) {
      if (routes.length > 0) {
        var polyline_options = {
          path: routes[routes.length - 1].overview_path,
          strokeColor: options.strokeColor,
          strokeOpacity: options.strokeOpacity,
          strokeWeight: options.strokeWeight
        };

        if (options.hasOwnProperty("icons")) {
          polyline_options.icons = options.icons;
        }

        self.drawPolyline(polyline_options);

        if (options.callback) {
          options.callback(routes[routes.length - 1]);
        }
      }
    }
  });
};

GMaps.prototype.travelRoute = function(options) {
  if (options.origin && options.destination) {
    this.getRoutes({
      origin: options.origin,
      destination: options.destination,
      travelMode: options.travelMode,
      waypoints : options.waypoints,
      unitSystem: options.unitSystem,
      error: options.error,
      callback: function(e) {
        //start callback
        if (e.length > 0 && options.start) {
          options.start(e[e.length - 1]);
        }

        //step callback
        if (e.length > 0 && options.step) {
          var route = e[e.length - 1];
          if (route.legs.length > 0) {
            var steps = route.legs[0].steps;
            for (var i = 0, step; step = steps[i]; i++) {
              step.step_number = i;
              options.step(step, (route.legs[0].steps.length - 1));
            }
          }
        }

        //end callback
        if (e.length > 0 && options.end) {
           options.end(e[e.length - 1]);
        }
      }
    });
  }
  else if (options.route) {
    if (options.route.legs.length > 0) {
      var steps = options.route.legs[0].steps;
      for (var i = 0, step; step = steps[i]; i++) {
        step.step_number = i;
        options.step(step);
      }
    }
  }
};

GMaps.prototype.drawSteppedRoute = function(options) {
  var self = this;

  if (options.origin && options.destination) {
    this.getRoutes({
      origin: options.origin,
      destination: options.destination,
      travelMode: options.travelMode,
      waypoints : options.waypoints,
      error: options.error,
      callback: function(e) {
        //start callback
        if (e.length > 0 && options.start) {
          options.start(e[e.length - 1]);
        }

        //step callback
        if (e.length > 0 && options.step) {
          var route = e[e.length - 1];
          if (route.legs.length > 0) {
            var steps = route.legs[0].steps;
            for (var i = 0, step; step = steps[i]; i++) {
              step.step_number = i;
              var polyline_options = {
                path: step.path,
                strokeColor: options.strokeColor,
                strokeOpacity: options.strokeOpacity,
                strokeWeight: options.strokeWeight
              };

              if (options.hasOwnProperty("icons")) {
                polyline_options.icons = options.icons;
              }

              self.drawPolyline(polyline_options);
              options.step(step, (route.legs[0].steps.length - 1));
            }
          }
        }

        //end callback
        if (e.length > 0 && options.end) {
           options.end(e[e.length - 1]);
        }
      }
    });
  }
  else if (options.route) {
    if (options.route.legs.length > 0) {
      var steps = options.route.legs[0].steps;
      for (var i = 0, step; step = steps[i]; i++) {
        step.step_number = i;
        var polyline_options = {
          path: step.path,
          strokeColor: options.strokeColor,
          strokeOpacity: options.strokeOpacity,
          strokeWeight: options.strokeWeight
        };

        if (options.hasOwnProperty("icons")) {
          polyline_options.icons = options.icons;
        }

        self.drawPolyline(polyline_options);
        options.step(step);
      }
    }
  }
};

GMaps.Route = function(options) {
  this.origin = options.origin;
  this.destination = options.destination;
  this.waypoints = options.waypoints;

  this.map = options.map;
  this.route = options.route;
  this.step_count = 0;
  this.steps = this.route.legs[0].steps;
  this.steps_length = this.steps.length;

  var polyline_options = {
    path: new google.maps.MVCArray(),
    strokeColor: options.strokeColor,
    strokeOpacity: options.strokeOpacity,
    strokeWeight: options.strokeWeight
  };

  if (options.hasOwnProperty("icons")) {
    polyline_options.icons = options.icons;
  }

  this.polyline = this.map.drawPolyline(polyline_options).getPath();
};

GMaps.Route.prototype.getRoute = function(options) {
  var self = this;

  this.map.getRoutes({
    origin : this.origin,
    destination : this.destination,
    travelMode : options.travelMode,
    waypoints : this.waypoints || [],
    error: options.error,
    callback : function() {
      self.route = e[0];

      if (options.callback) {
        options.callback.call(self);
      }
    }
  });
};

GMaps.Route.prototype.back = function() {
  if (this.step_count > 0) {
    this.step_count--;
    var path = this.route.legs[0].steps[this.step_count].path;

    for (var p in path){
      if (path.hasOwnProperty(p)){
        this.polyline.pop();
      }
    }
  }
};

GMaps.Route.prototype.forward = function() {
  if (this.step_count < this.steps_length) {
    var path = this.route.legs[0].steps[this.step_count].path;

    for (var p in path){
      if (path.hasOwnProperty(p)){
        this.polyline.push(path[p]);
      }
    }
    this.step_count++;
  }
};

GMaps.prototype.checkGeofence = function(lat, lng, fence) {
  return fence.containsLatLng(new google.maps.LatLng(lat, lng));
};

GMaps.prototype.checkMarkerGeofence = function(marker, outside_callback) {
  if (marker.fences) {
    for (var i = 0, fence; fence = marker.fences[i]; i++) {
      var pos = marker.getPosition();
      if (!this.checkGeofence(pos.lat(), pos.lng(), fence)) {
        outside_callback(marker, fence);
      }
    }
  }
};

GMaps.prototype.toImage = function(options) {
  var options = options || {},
      static_map_options = {};

  static_map_options['size'] = options['size'] || [this.el.clientWidth, this.el.clientHeight];
  static_map_options['lat'] = this.getCenter().lat();
  static_map_options['lng'] = this.getCenter().lng();

  if (this.markers.length > 0) {
    static_map_options['markers'] = [];

    for (var i = 0; i < this.markers.length; i++) {
      static_map_options['markers'].push({
        lat: this.markers[i].getPosition().lat(),
        lng: this.markers[i].getPosition().lng()
      });
    }
  }

  if (this.polylines.length > 0) {
    var polyline = this.polylines[0];

    static_map_options['polyline'] = {};
    static_map_options['polyline']['path'] = google.maps.geometry.encoding.encodePath(polyline.getPath());
    static_map_options['polyline']['strokeColor'] = polyline.strokeColor
    static_map_options['polyline']['strokeOpacity'] = polyline.strokeOpacity
    static_map_options['polyline']['strokeWeight'] = polyline.strokeWeight
  }

  return GMaps.staticMapURL(static_map_options);
};

GMaps.staticMapURL = function(options){
  var parameters = [],
      data,
      static_root = (location.protocol === 'file:' ? 'http:' : location.protocol ) + '//maps.googleapis.com/maps/api/staticmap';

  if (options.url) {
    static_root = options.url;
    delete options.url;
  }

  static_root += '?';

  var markers = options.markers;

  delete options.markers;

  if (!markers && options.marker) {
    markers = [options.marker];
    delete options.marker;
  }

  var styles = options.styles;

  delete options.styles;

  var polyline = options.polyline;
  delete options.polyline;

  /** Map options **/
  if (options.center) {
    parameters.push('center=' + options.center);
    delete options.center;
  }
  else if (options.address) {
    parameters.push('center=' + options.address);
    delete options.address;
  }
  else if (options.lat) {
    parameters.push(['center=', options.lat, ',', options.lng].join(''));
    delete options.lat;
    delete options.lng;
  }
  else if (options.visible) {
    var visible = encodeURI(options.visible.join('|'));
    parameters.push('visible=' + visible);
  }

  var size = options.size;
  if (size) {
    if (size.join) {
      size = size.join('x');
    }
    delete options.size;
  }
  else {
    size = '630x300';
  }
  parameters.push('size=' + size);

  if (!options.zoom && options.zoom !== false) {
    options.zoom = 15;
  }

  var sensor = options.hasOwnProperty('sensor') ? !!options.sensor : true;
  delete options.sensor;
  parameters.push('sensor=' + sensor);

  for (var param in options) {
    if (options.hasOwnProperty(param)) {
      parameters.push(param + '=' + options[param]);
    }
  }

  /** Markers **/
  if (markers) {
    var marker, loc;

    for (var i = 0; data = markers[i]; i++) {
      marker = [];

      if (data.size && data.size !== 'normal') {
        marker.push('size:' + data.size);
        delete data.size;
      }
      else if (data.icon) {
        marker.push('icon:' + encodeURI(data.icon));
        delete data.icon;
      }

      if (data.color) {
        marker.push('color:' + data.color.replace('#', '0x'));
        delete data.color;
      }

      if (data.label) {
        marker.push('label:' + data.label[0].toUpperCase());
        delete data.label;
      }

      loc = (data.address ? data.address : data.lat + ',' + data.lng);
      delete data.address;
      delete data.lat;
      delete data.lng;

      for(var param in data){
        if (data.hasOwnProperty(param)) {
          marker.push(param + ':' + data[param]);
        }
      }

      if (marker.length || i === 0) {
        marker.push(loc);
        marker = marker.join('|');
        parameters.push('markers=' + encodeURI(marker));
      }
      // New marker without styles
      else {
        marker = parameters.pop() + encodeURI('|' + loc);
        parameters.push(marker);
      }
    }
  }

  /** Map Styles **/
  if (styles) {
    for (var i = 0; i < styles.length; i++) {
      var styleRule = [];
      if (styles[i].featureType){
        styleRule.push('feature:' + styles[i].featureType.toLowerCase());
      }

      if (styles[i].elementType) {
        styleRule.push('element:' + styles[i].elementType.toLowerCase());
      }

      for (var j = 0; j < styles[i].stylers.length; j++) {
        for (var p in styles[i].stylers[j]) {
          var ruleArg = styles[i].stylers[j][p];
          if (p == 'hue' || p == 'color') {
            ruleArg = '0x' + ruleArg.substring(1);
          }
          styleRule.push(p + ':' + ruleArg);
        }
      }

      var rule = styleRule.join('|');
      if (rule != '') {
        parameters.push('style=' + rule);
      }
    }
  }

  /** Polylines **/
  function parseColor(color, opacity) {
    if (color[0] === '#'){
      color = color.replace('#', '0x');

      if (opacity) {
        opacity = parseFloat(opacity);
        opacity = Math.min(1, Math.max(opacity, 0));
        if (opacity === 0) {
          return '0x00000000';
        }
        opacity = (opacity * 255).toString(16);
        if (opacity.length === 1) {
          opacity += opacity;
        }

        color = color.slice(0,8) + opacity;
      }
    }
    return color;
  }

  if (polyline) {
    data = polyline;
    polyline = [];

    if (data.strokeWeight) {
      polyline.push('weight:' + parseInt(data.strokeWeight, 10));
    }

    if (data.strokeColor) {
      var color = parseColor(data.strokeColor, data.strokeOpacity);
      polyline.push('color:' + color);
    }

    if (data.fillColor) {
      var fillcolor = parseColor(data.fillColor, data.fillOpacity);
      polyline.push('fillcolor:' + fillcolor);
    }

    var path = data.path;
    if (path.join) {
      for (var j=0, pos; pos=path[j]; j++) {
        polyline.push(pos.join(','));
      }
    }
    else {
      polyline.push('enc:' + path);
    }

    polyline = polyline.join('|');
    parameters.push('path=' + encodeURI(polyline));
  }

  /** Retina support **/
  var dpi = window.devicePixelRatio || 1;
  parameters.push('scale=' + dpi);

  parameters = parameters.join('&');
  return static_root + parameters;
};

GMaps.prototype.addMapType = function(mapTypeId, options) {
  if (options.hasOwnProperty("getTileUrl") && typeof(options["getTileUrl"]) == "function") {
    options.tileSize = options.tileSize || new google.maps.Size(256, 256);

    var mapType = new google.maps.ImageMapType(options);

    this.map.mapTypes.set(mapTypeId, mapType);
  }
  else {
    throw "'getTileUrl' function required.";
  }
};

GMaps.prototype.addOverlayMapType = function(options) {
  if (options.hasOwnProperty("getTile") && typeof(options["getTile"]) == "function") {
    var overlayMapTypeIndex = options.index;

    delete options.index;

    this.map.overlayMapTypes.insertAt(overlayMapTypeIndex, options);
  }
  else {
    throw "'getTile' function required.";
  }
};

GMaps.prototype.removeOverlayMapType = function(overlayMapTypeIndex) {
  this.map.overlayMapTypes.removeAt(overlayMapTypeIndex);
};

GMaps.prototype.addStyle = function(options) {
  var styledMapType = new google.maps.StyledMapType(options.styles, { name: options.styledMapName });

  this.map.mapTypes.set(options.mapTypeId, styledMapType);
};

GMaps.prototype.setStyle = function(mapTypeId) {
  this.map.setMapTypeId(mapTypeId);
};

GMaps.prototype.createPanorama = function(streetview_options) {
  if (!streetview_options.hasOwnProperty('lat') || !streetview_options.hasOwnProperty('lng')) {
    streetview_options.lat = this.getCenter().lat();
    streetview_options.lng = this.getCenter().lng();
  }

  this.panorama = GMaps.createPanorama(streetview_options);

  this.map.setStreetView(this.panorama);

  return this.panorama;
};

GMaps.createPanorama = function(options) {
  var el = getElementById(options.el, options.context);

  options.position = new google.maps.LatLng(options.lat, options.lng);

  delete options.el;
  delete options.context;
  delete options.lat;
  delete options.lng;

  var streetview_events = ['closeclick', 'links_changed', 'pano_changed', 'position_changed', 'pov_changed', 'resize', 'visible_changed'],
      streetview_options = extend_object({visible : true}, options);

  for (var i = 0; i < streetview_events.length; i++) {
    delete streetview_options[streetview_events[i]];
  }

  var panorama = new google.maps.StreetViewPanorama(el, streetview_options);

  for (var i = 0; i < streetview_events.length; i++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(){
          options[name].apply(this);
        });
      }
    })(panorama, streetview_events[i]);
  }

  return panorama;
};

GMaps.prototype.on = function(event_name, handler) {
  return GMaps.on(event_name, this, handler);
};

GMaps.prototype.off = function(event_name) {
  GMaps.off(event_name, this);
};

GMaps.prototype.once = function(event_name, handler) {
  return GMaps.once(event_name, this, handler);
};

GMaps.custom_events = ['marker_added', 'marker_removed', 'polyline_added', 'polyline_removed', 'polygon_added', 'polygon_removed', 'geolocated', 'geolocation_failed'];

GMaps.on = function(event_name, object, handler) {
  if (GMaps.custom_events.indexOf(event_name) == -1) {
    if(object instanceof GMaps) object = object.map;
    return google.maps.event.addListener(object, event_name, handler);
  }
  else {
    var registered_event = {
      handler : handler,
      eventName : event_name
    };

    object.registered_events[event_name] = object.registered_events[event_name] || [];
    object.registered_events[event_name].push(registered_event);

    return registered_event;
  }
};

GMaps.off = function(event_name, object) {
  if (GMaps.custom_events.indexOf(event_name) == -1) {
    if(object instanceof GMaps) object = object.map;
    google.maps.event.clearListeners(object, event_name);
  }
  else {
    object.registered_events[event_name] = [];
  }
};

GMaps.once = function(event_name, object, handler) {
  if (GMaps.custom_events.indexOf(event_name) == -1) {
    if(object instanceof GMaps) object = object.map;
    return google.maps.event.addListenerOnce(object, event_name, handler);
  }
};

GMaps.fire = function(event_name, object, scope) {
  if (GMaps.custom_events.indexOf(event_name) == -1) {
    google.maps.event.trigger(object, event_name, Array.prototype.slice.apply(arguments).slice(2));
  }
  else {
    if(event_name in scope.registered_events) {
      var firing_events = scope.registered_events[event_name];

      for(var i = 0; i < firing_events.length; i++) {
        (function(handler, scope, object) {
          handler.apply(scope, [object]);
        })(firing_events[i]['handler'], scope, object);
      }
    }
  }
};

GMaps.geolocate = function(options) {
  var complete_callback = options.always || options.complete;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      options.success(position);

      if (complete_callback) {
        complete_callback();
      }
    }, function(error) {
      options.error(error);

      if (complete_callback) {
        complete_callback();
      }
    }, options.options);
  }
  else {
    options.not_supported();

    if (complete_callback) {
      complete_callback();
    }
  }
};

GMaps.geocode = function(options) {
  this.geocoder = new google.maps.Geocoder();
  var callback = options.callback;
  if (options.hasOwnProperty('lat') && options.hasOwnProperty('lng')) {
    options.latLng = new google.maps.LatLng(options.lat, options.lng);
  }

  delete options.lat;
  delete options.lng;
  delete options.callback;

  this.geocoder.geocode(options, function(results, status) {
    callback(results, status);
  });
};

if (typeof window.google === 'object' && window.google.maps) {
  //==========================
  // Polygon containsLatLng
  // https://github.com/tparkin/Google-Maps-Point-in-Polygon
  // Poygon getBounds extension - google-maps-extensions
  // http://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js
  if (!google.maps.Polygon.prototype.getBounds) {
    google.maps.Polygon.prototype.getBounds = function(latLng) {
      var bounds = new google.maps.LatLngBounds();
      var paths = this.getPaths();
      var path;

      for (var p = 0; p < paths.getLength(); p++) {
        path = paths.getAt(p);
        for (var i = 0; i < path.getLength(); i++) {
          bounds.extend(path.getAt(i));
        }
      }

      return bounds;
    };
  }

  if (!google.maps.Polygon.prototype.containsLatLng) {
    // Polygon containsLatLng - method to determine if a latLng is within a polygon
    google.maps.Polygon.prototype.containsLatLng = function(latLng) {
      // Exclude points outside of bounds as there is no way they are in the poly
      var bounds = this.getBounds();

      if (bounds !== null && !bounds.contains(latLng)) {
        return false;
      }

      // Raycast point in polygon method
      var inPoly = false;

      var numPaths = this.getPaths().getLength();
      for (var p = 0; p < numPaths; p++) {
        var path = this.getPaths().getAt(p);
        var numPoints = path.getLength();
        var j = numPoints - 1;

        for (var i = 0; i < numPoints; i++) {
          var vertex1 = path.getAt(i);
          var vertex2 = path.getAt(j);

          if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng()) {
            if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
              inPoly = !inPoly;
            }
          }

          j = i;
        }
      }

      return inPoly;
    };
  }

  if (!google.maps.Circle.prototype.containsLatLng) {
    google.maps.Circle.prototype.containsLatLng = function(latLng) {
      if (google.maps.geometry) {
        return google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
      }
      else {
        return true;
      }
    };
  }

  google.maps.LatLngBounds.prototype.containsLatLng = function(latLng) {
    return this.contains(latLng);
  };

  google.maps.Marker.prototype.setFences = function(fences) {
    this.fences = fences;
  };

  google.maps.Marker.prototype.addFence = function(fence) {
    this.fences.push(fence);
  };

  google.maps.Marker.prototype.getId = function() {
    return this['__gm_id'];
  };
}

//==========================
// Array indexOf
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      "use strict";
      if (this == null) {
          throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
          return -1;
      }
      var n = 0;
      if (arguments.length > 1) {
          n = Number(arguments[1]);
          if (n != n) { // shortcut for verifying if it's NaN
              n = 0;
          } else if (n != 0 && n != Infinity && n != -Infinity) {
              n = (n > 0 || -1) * Math.floor(Math.abs(n));
          }
      }
      if (n >= len) {
          return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
          if (k in t && t[k] === searchElement) {
              return k;
          }
      }
      return -1;
  }
}

return GMaps;
}));
!function(a){a.fn.animatedModal=function(n){function o(){m.css({"z-index":e.zIndexOut}),e.afterClose()}function t(){e.afterOpen()}var i=a(this),e=a.extend({modalTarget:"animatedModal",position:"fixed",width:"100%",height:"100%",top:"0px",left:"0px",zIndexIn:"9999",zIndexOut:"-9999",color:"#39BEB9",opacityIn:"1",opacityOut:"0",animatedIn:"zoomIn",animatedOut:"zoomOut",animationDuration:".6s",overflow:"auto",beforeOpen:function(){},afterOpen:function(){},beforeClose:function(){},afterClose:function(){}},n),d=a(".close-"+e.modalTarget),s=a(i).attr("href"),m=a("body").find("#"+e.modalTarget),l="#"+m.attr("id");m.addClass("animated"),m.addClass(e.modalTarget+"-off");var r={position:e.position,width:e.width,height:e.height,top:e.top,left:e.left,"background-color":e.color,"overflow-y":e.overflow,"z-index":e.zIndexOut,opacity:e.opacityOut,"-webkit-animation-duration":e.animationDuration,"-moz-animation-duration":e.animationDuration,"-ms-animation-duration":e.animationDuration,"animation-duration":e.animationDuration};m.css(r),i.click(function(n){n.preventDefault(),a("body, html").css({overflow:"hidden"}),s==l&&(m.hasClass(e.modalTarget+"-off")&&(m.removeClass(e.animatedOut),m.removeClass(e.modalTarget+"-off"),m.addClass(e.modalTarget+"-on")),m.hasClass(e.modalTarget+"-on")&&(e.beforeOpen(),m.css({opacity:e.opacityIn,"z-index":e.zIndexIn}),m.addClass(e.animatedIn),m.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",t)))}),d.click(function(n){n.preventDefault(),a("body, html").css({overflow:"auto"}),e.beforeClose(),m.hasClass(e.modalTarget+"-on")&&(m.removeClass(e.modalTarget+"-on"),m.addClass(e.modalTarget+"-off")),m.hasClass(e.modalTarget+"-off")&&(m.removeClass(e.animatedIn),m.addClass(e.animatedOut),m.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",o))})}}(jQuery);
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('ready page:load', function () {

  $('.comment-form').submit(function(event) {
    event.preventDefault();
    var commentList = $(this).parent().siblings('.comment-list')[0];
    $.ajax({
      url: $(this).attr('action'),
      type: 'POST',
      dataType: 'json',
      data: $(this).serialize(),

      success: function (data) {
        console.log(this);
        var comment = '<div class="comment-list-item">' + '<img src="http://res.cloudinary.com/frankychau/image/upload/c_thumb,h_100,w_100/' + data.comment.user.profile_img +'" >' + '<h2 class="commenter-name">' + data.comment.user.name + '</h2> <h4 class="commenter-info">' +
                      data.comment.created_at + '</h4>' + '<hr class="recomm-underline">' + '<p>' +
                     data.comment.body + '</p>'+ '</div>';
        $(commentList).append(comment);

        gotoBottom(commentList);

       }
    });
  });
});

function gotoBottom(div){
  div.scrollTop = div.scrollHeight;
}
;
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// var map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map-canvas'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });
// }
//
// $(document).on('ready page:load', function () {
//     initMap();
//    $("h1").on('click', function () {
//     $('.map-wrap').css({ height: '500px', width: '500px' }); //For showing your map
//     });
//     // $("h1").on('click', function () {
//     //    initMap();
//     //    google.maps.event.trigger(map, 'resize');
//     //    map.setCenter({lat: -34.397, lng: 150.644});
//     // })
// });

  $(document).on('ready page:load', function () {
    

     $('#path_map>a').on('click', function (e) {
       e.preventDefault();
       $.ajax({
          url: $('#path_map>a').attr('href'),
          type: 'GET',
          dataType: 'json',
          success: function (data) {

            var map = new GMaps({
              el: '#path_map',
              lat: -12.043333,
              lng: -77.028333
            });
            var styles = [
              {
                stylers: [
                  { hue: "#00ffe6" },
                  { saturation: -20 }
                ]
              }, {
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [
                      { lightness: 100 },
                      { visibility: "simplified" }
                ]
              }, {
                  featureType: "road",
                  elementType: "labels",
                  stylers: [
                      { visibility: "off" }
                ]
              }
            ];

            map.addStyle({
                styledMapName:"Styled Map",
                styles: styles,
                mapTypeId: "map_style"
            });

            map.setStyle("map_style");

                console.log(data[0].title);

            var latlngs = [];
            for (var i = 0; i < data.length; i++) {
              // latlngs[i].lat = data[i].latitude;
              // latlngs[i].lng = data[i].longitude;
              latlngs.push({lat:data[i].latitude, lng:data[i].longitude, title:data[i].title, id:data[i].id, description:data[i].description})

            }
            var bounds = [];

            for (var i in latlngs) {
              var latlng = new google.maps.LatLng(latlngs[i].lat, latlngs[i].lng);
              bounds.push(latlng);
              map.addMarker({
                lat: latlngs[i].lat,
                lng: latlngs[i].lng,
                icon: "/assets/Map-marker-2-1-766b307ce0c7c09568f9cde6542d5557e95f4ae78ea1c4a88f0c1ff1fdc9b99a.png",
                infoWindow: {
                  content: "<a href= /journeys/" + latlngs[i].id + " " + "data-no-turbolink='true' >"
                  + '<div class="map-journey-title">' + latlngs[i].title
                  + "<span> GO!</span> </div>"+ "</a>" + "<div class='journey-map-content'>" + latlngs[i].description.substring(0, 150) + "</div>",
                  maxWidth: 200
                },
                animation: google.maps.Animation.DROP
                // icon: .
              }
            );
          }
            map.fitLatLngBounds(bounds);

         }
      });
    });

    var callMap = function () {
      $('#path_map>a').trigger('click');
    }

     $("#demo01").animatedModal({

        animatedIn:'lightSpeedIn',
        animatedOut:'bounceOutDown',
        color:'#3498db',
        // Callbacks
        beforeOpen: function() {

        },
        afterOpen: function() {
            callMap();
        },
        beforeClose: function() {

        },
        afterClose: function() {

        }
      });

    $('.map-button-container').on('click', function(e) {
      e.preventDefault();
      $('#demo01').trigger('click');
    });

});



            //
            //
            // events: {
            //   click: function(){
            //     map.setZoom(8);
            //     map.setCenter(marker.getPosition());
            //   }
            // }

            // marker.addListener('click', function() {
            //   map.setZoom(8);
            //   map.setCenter(marker.getPosition());
            // });
            //  map.addMarker({
            //    lat: data.latitude,
            //    lng: data.longitude,
            //    title: 'Lima',
            //    click: function(e) {
            //      alert('You clicked in this marker');
            //    }
            //  });

          //
;
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on('ready page:load', function () {


  $('.new_favourite').on('click', function (e) {
    e.preventDefault();
    var self = $(this);
    $.ajax({
      url: self.attr('action'),
      method: "POST",
      data: self.serialize(),
      dataType: 'json',
      success: function (data) {
        if (data) {
          $('.fa.fa-heart').css("color","#FF6767");
        }
      }
    });
  });

  $(".no-f-yet").on('click', function() {
    $('.new_favourite').click();
    // success: function() {
    //   $(".no-f-yet").toggleClass(".f-already");

  })

  $('.edit_favourite').on('click', function (e) {
    e.preventDefault();
    var self = $(this);
    $.ajax({
      url: self.attr('action'),
      method: "DELETE",
      data: self.serialize(),
      dataType: 'json',
      success: function (data) {
        if (data) {
          $('.fa.fa-heart').css("color","grey");
        }
      }
    });
  });

  $(".f-already").on('click', function() {
    $('.edit_favourite').click();
  })




})
;
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('ready page:load', function() {


  $('.newPost button[data-func]').click(function(){
    document.execCommand( $(this).data('func'), false 	);
  });

  $('.newPost select[data-func]').change(function(){
    var $value = $(this).find(':selected').val();
    document.execCommand( $(this).data('func'), false, $value);
  });

  if(typeof(Storage) !== "undefined") {

  $('.editor').keypress(function(){
    $(this).find('.saved').detach();
  });
    $('.editor').html(localStorage.getItem("wysiwyg")) ;

    $('button[data-func="save"]').click(function(){
      $content = $('.editor').html();
      localStorage.setItem("wysiwyg", $content);
      dataText = JSON.stringify($('.editor').html());
      // dataText = ActiveSupport::JSON.decode("{\"content\": $('.editor').html()}")
      if ($('.new_diary_entry').length > 0) {
        $.ajax({
          url: $('.new_diary_entry').attr('action'),
          type: 'POST',
          dataType: 'json',
          data: { "content": dataText},
        });
      }
      else {
        $.ajax({
          url: $('.edit_diary_entry').attr('action'),
          type: 'PUT',
          dataType: 'json',
          data: { "content": dataText},
        });
      }
      // $('.editor').append('<span class="saved"><i class="fa fa-check"></i></span>').fadeIn(function(){
      //   $(this).find('.saved').fadeOut(500);
      // });
    });

    $('button[data-func="clear"]').click(function(){
      $('.editor').html('');
      localStorage.removeItem("wysiwyg");
    });
  }

  $('#first_diary').one('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($('.new_diary_entry').length > 0) {
      $.ajax({
        url: $('.new_diary_entry').attr('action'),
        type: 'POST',
        dataType: 'json',
        data: $('.new_diary_entry').serialize(),
      });
    }
    else {
      $.ajax({
        url: $('.edit_diary_entry').attr('action'),
        type: 'PUT',
        dataType: 'json',
        data: $('.edit_diary_entry').serialize(),
      });
    }
  });

  $('#second_diary').one('click', function (e) {
    e.preventDefault();
    $('button[data-func="save"]').click();
  });

  $('#final_diary').on('click', function (e) {
    e.preventDefault();
    $(".h-link").find("a")[0].click();
  });

//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$('#first_submit').one('click', function (e) {
  e.preventDefault();
  if ($('.new_journey').length > 0) {
    $.ajax({
      url: $('.new_journey').attr('action'),
      type: 'POST',
      dataType: 'json',
      data: $('.new_journey').serialize(),
    });
  }
  else {
    $.ajax({
      url: $('.edit_journey').attr('action'),
      type: 'PUT',
      dataType: 'json',
      data: $('.edit_journey').serialize(),
    });
  }
});

$('#second_submit').one('click', function (e) {
  e.preventDefault();
  if ($('.existing-journey').length > 0) {
    $.ajax({
      url: '/journeys',
      type: 'post',
      dataType: 'json',
      data: $('.existing-journey').serialize(),
    });
  }
  else {
    $.ajax({
      url: $('.editing-journey').attr('action'),
      type: 'PUT',
      dataType: 'json',
      data: $('.editing-journey').serialize(),
    });
  }
});

$('#final_submit').on('click', function (e) {
  e.preventDefault();
  $(".h-link").find("a")[0].click();
});

$(".next").click(function(){
  if(animating) return false;
  animating = true;
  // var newJourney = $('.new_journey')[0]

  current_fs = $(this).parent();
  next_fs = $(this).parent().next();

  //activate next step on progressbar using the index of next_fs
  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

  //show the next fieldset
  next_fs.show();
  //hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function(now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale current_fs down to 80%
      scale = 1 - (1 - now) * 0.2;
      //2. bring next_fs from the right(50%)
      left = (now * 50)+"%";
      //3. increase opacity of next_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
      next_fs.css({'left': left, 'opacity': opacity});
    },
    duration: 800,
    complete: function(){
      current_fs.hide();
      animating = false;
    },

  });
});

$(".previous").click(function(){
  if(animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  //de-activate current step on progressbar
  $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

  //show the previous fieldset
  previous_fs.show();
  //hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function(now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - now) * 0.2;
      //2. take current_fs to the right(50%) - from 0%
      left = ((1-now) * 50)+"%";
      //3. increase opacity of previous_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({'left': left});
      previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
    },
    duration: 800,
    complete: function(){
      current_fs.hide();
      animating = false;
    },
    //this comes from the custom easing plugin
  });
});

  $(".submit").click(function(){
    return false;
  })
  if ($('#journey_path_map').length > 0) {

  var mapData = $('#journey_path_map').data('diaries')
  if (mapData[0]) {
    var map = new GMaps({
      el: '#journey_path_map',
      lat: -12.043333,
      lng: -77.028333,
      zoom: 13,
      scrollwheel: false
    });
    var styles = [
      {
        stylers: [
          { hue: "#052772" },
          { saturation: 0 }
        ]
      }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" }
        ]
      }, {
        featureType: "road",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];

    map.addStyle({
      styledMapName:"Styled Map",
      styles: styles,
      mapTypeId: "map_style"
    });

    map.setStyle("map_style");

    console.log(mapData[0].title);

    var latlngs = [];
    for (var i = 0; i < mapData.length; i++) {
      // latlngs[i].lat = data[i].latitude;
      // latlngs[i].lng = data[i].longitude;
      latlngs.push({lat:mapData[i].latitude, lng:mapData[i].longitude, title:mapData[i].title, id:mapData[i].id, journey_id:mapData[i].journey_id})

    }
    var bounds = [];

    for (var i in latlngs) {
      var latlng = new google.maps.LatLng(latlngs[i].lat, latlngs[i].lng);
      bounds.push(latlng);
      map.addMarker({
        lat: latlngs[i].lat,
        lng: latlngs[i].lng,
        icon: "/assets/Map-marker-2-1-766b307ce0c7c09568f9cde6542d5557e95f4ae78ea1c4a88f0c1ff1fdc9b99a.png",
        infoWindow: {
          content: "<a href= /journeys/" +latlngs[i].journey_id + "/diary_entries/" + latlngs[i].id + " " + "data-no-turbolink='true' >"
          + '<div class="map-diary-title">' + latlngs[i].title
          + "<span> GO!</span> </div>"+ "</a>",
          maxWidth: 200,
          height:100
        },
        animation: google.maps.Animation.DROP
        // icon: .
      }
    );
  }
  map.fitLatLngBounds(bounds);
  }
  else {
    var map = new GMaps({
      el: '#journey_path_map',
      lat: mapData.latitude,
      lng: mapData.longitude,
      zoom: 10,
      scrollwheel: false
    });
    var styles = [
      {
        stylers: [
          { hue: "#052772" },
          { saturation: 0 }
        ]
      }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" }
        ]
      }, {
        featureType: "road",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];

    map.addStyle({
      styledMapName:"Styled Map",
      styles: styles,
      mapTypeId: "map_style"
    });

    map.setStyle("map_style");
  }
  }

});




    function cambiar_login() {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
    document.querySelector('.cont_form_login').style.display = "block";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";

    setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);

    setTimeout(function(){
    document.querySelector('.cont_form_sign_up').style.display = "none";
    },200);
    }

    function cambiar_sign_up(at) {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
    document.querySelector('.cont_form_sign_up').style.display = "block";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
    },100);

    setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
    },400);


    }



    function ocultar_login_sign_up() {

    document.querySelector('.cont_forms').className = "cont_forms";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(function(){
    document.querySelector('.cont_form_sign_up').style.display = "none";
    document.querySelector('.cont_form_login').style.display = "none";
    },500);

    }
;
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('ready page:load', function() {

  $('.fancybox').fancybox();

  $(".fancybox-effects-d").fancybox({
    padding: 0,

    openEffect : 'elastic',
    openSpeed  : 150,

    closeEffect : 'elastic',
    closeSpeed  : 150,

    closeClick : true,

    helpers : {
      overlay : null
    }
  });



    $("#modal-1").on("change", function() {
      if ($(this).is(":checked")) {
        $("body").addClass("modal-open");
      } else {
        $("body").removeClass("modal-open");
      }
    });

    $(".modal-fade-screen, .modal-close").on("click", function() {
      $(".modal-state:checked").prop("checked", false).change();
    });

    $(".modal-inner").on("click", function(e) {
      e.stopPropagation();
    });


});


// Dropzone.options.myAwesomeDropzone = { // The camelized version of the ID of the form element
//
//   // The configuration we've talked about above
//   autoProcessQueue: false,
//   uploadMultiple: true,
//   parallelUploads: 100,
//   maxFiles: 100,
//   addRemoveLinks:true,
//
//   // The setting up of the dropzone
//   init: function() {
//     var myDropzone = this;
//
//     // First change the button to actually tell Dropzone to process the queue.
//     // var self = this.element.getElementsByClassName("submit-picture")
//     $('.submit-picture').on("click", function(e) {
//       // Make sure that the form isn't actually being sent.
//       e.preventDefault();
//       e.stopPropagation();
//       myDropzone.processQueue();
//     });
//
//     // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
//     // of the sending event because uploadMultiple is set to true.
//     this.on("sendingmultiple", function() {
//       // Gets triggered when the form is actually being sent.
//       // Hide the success button or the complete form.
//     });
//     this.on("successmultiple", function(files, response) {
//       // Gets triggered when the files have successfully been sent.
//       // Redirect user or notify of success.
//     });
//     this.on("errormultiple", function(files, response) {
//       // Gets triggered when there was an error sending the files.
//       // Maybe show form again, and notify user of error
//     });
//   }
// }

// $(document).ready(function(){
//   // disable auto discover
//   Dropzone.autoDiscover = false;
//
//   var dropzone = new Dropzone (".dropzone", {
//     maxFilesize: 256, // set the maximum file size to 256 MB
//     paramName: "image[avatar]", // Rails expects the file upload to be something like model[field_name]
//     addRemoveLinks: false // don't show remove links on dropzone itself.
//   });
//
//   dropzone.on("success", function(file) {
//     this.removeFile(file);
//     $.getScript("/images");
//   })
// });
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
;
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('ready page:load', function () {
  // $('.tag-form').hide();

  $('.accordion-tabs-minimal').each(function(index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });
  $('.accordion-tabs-minimal').on('click', 'li > a.tab-link', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs-minimal');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');

    } else {
      event.preventDefault();
    }
    $('#search_tag').trigger('submit');
  });

  $('.new_tag').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
      url: $(this).attr('action'),
      method: 'POST',
      data: $(this).serialize(),
      dataType:'script'
    });
  })

  $('.add-new-tag').on('click', function (e) {
    e.preventDefault();
    if ($('.tag-form').css("display") == "block") {
      $('.tag-form').css("display", "none");
    }
    else {
      $('.tag-form').css("display", "block");
    }
  });


  $('#search_tag').on('submit', function (e) {
    $('.search-tag-results').html(' ')
    e.preventDefault();

    var params = {
      method: 'GET',
      data: $(this).serialize(),
      dataType: 'script'

    }
    if ($('.is-active').html() == "Tag") {
      params.url = $('#search_tag').attr('action');
    } else if ($('.is-active').html() == "Location") {
      params.url = '/';
    } else if ($('.is-active').html() == "Top") {
      params.url = '/users/1/favourites';
    } else if ($('.is-active').html() == "Name") {
      params.url = '/users';
    }

    $.ajax(params);
    flipBoard();

  });

  // $('.tab-link').on('click', function (e) {
  //
  //   $('#search_tag').trigger('submit');
  //
  // });
});


$(document).on('ready page:load', function () {

  $("#home-top-picks").on("click", function() {
    $('.title-single').next().slideToggle();
    $(this).toggleClass("active");
})

});
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on('ready page:change', function () {

  $('.flip').click(function(){
    $(document).find('.board').addClass('flipped').mouseleave(function(){
      $(this).removeClass('flipped');
    });
    return false;
  });
  
  $('.new_relationship .relationship-button-border').on('click', function () {
    $('.follow-button').submit();
  });
  $('.edit_relationship .relationship-button-border').on('click', function () {
    $('.follow-button').submit();
  });

  $('.timeline-button-border').on('click', function(e){
    e.preventDefault();

    $.ajax({
      url: window.location.pathname,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        var timeline = new TL.Timeline('page-content', data,
        {
          theme_color: "#288EC3",
          ga_property_id: "UA-27829802-4"
        });
      }
    });
  });

  $('#search_nearby').on('click', function() {
    if("geolocation" in navigator)  {
      navigator.geolocation.getCurrentPosition(itWorked, itDidNotWork);
    }
  });
});

function itWorked(position){
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  $.ajax({
    url: window.location.pathname,
    method: 'get',
    data: {latitude: lat, longitude: lon},
    dataType: 'script'
  })

  flipBoard();
}

function itDidNotWork(error){
  console.log(error.message);
}

function flipBoard(){
  // $('.flip').click(function(){
    $(document).find('.board').addClass('flipped').mouseleave(function(){
      $(this).removeClass('flipped');
    });
    return false;
  // });
}
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//














