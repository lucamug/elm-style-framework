(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 1:
			var url = fact1;
			throw new Error('Browser.fullscreen programs cannot handle URLs like this:\n\n    ' + url + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var message = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + message);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel);
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, object)
{
	object['worker'] = function(flags)
	{
		return _Platform_initialize(
			flagDecoder,
			flags,
			impl.init,
			impl.update,
			impl.subscriptions,
			function() { return function() {} }
		);
	};
	return object;
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, flags, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(flags));
	elm$core$Result$isOk(result) || _Debug_crash(2, result.a);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (typeof name === 'function')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (typeof name === 'function')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return elm$core$Maybe$Nothing;
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return elm$core$Maybe$Nothing;
		}
		return elm$core$Maybe$Just(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && ((c !== '-' && c !== '+') || len === 1)))
	{
		return elm$core$Maybe$Nothing;
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return elm$core$Maybe$Nothing;
		}
	}

	return elm$core$Maybe$Just(parseInt(s, 10));
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// HELPERS


var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, object)
{
	// NOTE: this function needs _Platform_export available to work
	object['embed'] = function(node)
	{
		node.parentNode.replaceChild(
			_VirtualDom_render(virtualNode, function() {}),
			node
		);
	};
	return object;
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^\s*javascript:/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^\s*javascript:/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			A3(elm$json$Json$Decode$map2,
				!tag
					? _VirtualDom_mapTimed
					:
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapTimed = F2(function(func, timed)
{
	return {
		$: timed.$,
		a: func(timed.a)
	};
});

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(
		_VirtualDom_mapTimed(func, tuple.a),
		tuple.b
	);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: _VirtualDom_mapTimed(func, record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var ok = result.a;
		var timedMsg = _VirtualDom_eventToTimedMsg(event, elm$virtual_dom$VirtualDom$toHandlerInt(handler), ok);
		var message = timedMsg.a;
		var currentEventNode = eventNode;
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger === 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, elm$virtual_dom$VirtualDom$isSync(timedMsg));
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ === y.$ && _Json_equality(x.a, y.a);
}

function _VirtualDom_eventToTimedMsg(event, tag, value)
{
	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	if (!tag)
	{
		return value;
	}

	if (tag === 1 ? value.b : tag === 3 && value.stopPropagation) event.stopPropagation();
	if (tag === 2 ? value.b : tag === 3 && value.preventDefault) event.preventDefault();

	return tag < 3 ? value.a : value.message;
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, xLen - yLen);
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, yKids.slice(xLen));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			v: localPatches,
			w: inserts,
			x: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			y: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, z: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, z: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.y, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			v: subPatches,
			z: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			y: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.y, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			v: subPatches,
			z: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.v;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.z.s = domNode;
				var subPatches = data.v;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var i = patch.s;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 7:
			var newNodes = patch.s;
			for (var i = 0; i < newNodes.length; i++)
			{
				_VirtualDom_appendChild(domNode, _VirtualDom_render(newNodes[i], patch.u));
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.z;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.v);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.x, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.v);

	// inserts
	var inserts = data.w;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.z;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.y, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.z;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.y, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}


function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm$core$Maybe$Nothing;
	}
}



// FAKE NAVIGATION


function _Browser_go(n)
{
	return _Scheduler_binding(function(callback)
	{
		if (n !== 0)
		{
			history.go(n);
		}
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


function _Browser_pushState(url)
{
	return _Scheduler_binding(function(callback)
	{
		history.pushState({}, '', url);
		callback(_Scheduler_succeed(_Browser_getUrl()));
	});
}


function _Browser_replaceState(url)
{
	return _Scheduler_binding(function(callback)
	{
		history.replaceState({}, '', url);
		callback(_Scheduler_succeed(_Browser_getUrl()));
	});
}



// REAL NAVIGATION


function _Browser_reload(skipCache)
{
	return _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	});
}

function _Browser_load(url)
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	});
}



// GET URL


function _Browser_getUrl()
{
	return _VirtualDom_doc.location.href;
}



// DETECT IE11 PROBLEMS


function _Browser_isInternetExplorer11()
{
	return window.navigator.userAgent.indexOf('Trident') !== -1;
}



// INVALID URL


function _Browser_invalidUrl(url)
{
	_Debug_crash(1, url);
}


// PROGRAMS


var _Browser_staticPage = F4(function(virtualNode, flagDecoder, debugMetadata, object)
{
	object['embed'] = function(node)
	{
		node.parentNode.replaceChild(
			_VirtualDom_render(virtualNode, function() {}),
			node
		);
	};
	return object;
});


var _Debugger_embed;

var _Browser_embed = _Debugger_embed || F4(function(impl, flagDecoder, debugMetadata, object)
{
	object['embed'] = function(node, flags)
	{
		return _Platform_initialize(
			flagDecoder,
			flags,
			impl.init,
			impl.update,
			impl.subscriptions,
			_Browser_makeStepperBuilder(node, impl.view)
		);
	};
	return object;
});

var _Debugger_fullscreen;

var _Browser_fullscreen = _Debugger_fullscreen || F4(function(impl, flagDecoder, debugMetadata, object)
{
	object['fullscreen'] = function(flags)
	{
		return _Platform_initialize(
			A2(elm$json$Json$Decode$map, _Browser_toEnv, flagDecoder),
			flags,
			impl.init,
			impl.update,
			impl.subscriptions,
			_Browser_makeStepperBuilder(_VirtualDom_doc.body, function(model) {
				var ui = impl.view(model);
				if (_VirtualDom_doc.title !== ui.title)
				{
					_VirtualDom_doc.title = ui.title;
				}
				return _VirtualDom_node('body')(_List_Nil)(ui.body);
			})
		);
	};
	return object;
});


function _Browser_toEnv(flags)
{
	return {
		url: _Browser_getUrl(),
		flags: flags
	};
}



// RENDERER


function _Browser_makeStepperBuilder(domNode, view)
{
	return function(sendToApp, initialModel)
	{
		var currNode = _VirtualDom_virtualize(domNode);

		return _Browser_makeAnimator(initialModel, function(model)
		{
			var nextNode = view(model);
			var patches = _VirtualDom_diff(currNode, nextNode);
			domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
			currNode = nextNode;
		});
	};
}



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function()
		{
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$NotFound(id))
			);
		});
	});
}


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// SCROLLING


function _Browser_getScroll(id)
{
	return _Browser_withNode(id, function(node) {
		return _Utils_Tuple2(node.scrollLeft, node.scrollTop);
	});
}

var _Browser_setPositiveScroll = F3(function(scroll, id, offset)
{
	return _Browser_withNode(id, function(node) {
		node[scroll] = offset;
		return _Utils_Tuple0;
	});
});

var _Browser_setNegativeScroll = F4(function(scroll, scrollMax, id, offset)
{
	return _Browser_withNode(id, function(node) {
		node[scroll] = node[scrollMax] - offset;
		return _Utils_Tuple0;
	});
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_document = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F4(function(node, passive, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: passive });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result)
		? (result.a.b && event.preventDefault(), elm$core$Maybe$Just(result.a.a))
		: elm$core$Maybe$Nothing
});var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var author$project$Framework$initCmd = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Framework$debug = true;
var elm$json$Json$Decode$map2 = _Json_map2;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var elm$json$Json$Decode$field = _Json_decodeField;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2(elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var author$project$Framework$Flag = F2(
	function (width, height) {
		return {height: height, width: width};
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$Framework$decodeFlag = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'height',
	elm$json$Json$Decode$int,
	A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
		'width',
		elm$json$Json$Decode$int,
		elm$json$Json$Decode$succeed(author$project$Framework$Flag)));
var elm$json$Json$Decode$decodeValue = _Json_run;
var author$project$Framework$decodeFlagFromJson = function (json) {
	var decoded = A2(elm$json$Json$Decode$decodeValue, author$project$Framework$decodeFlag, json);
	if (decoded.$ === 'Ok') {
		var flag = decoded.a;
		return elm$core$Maybe$Just(flag);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Color$RGBA = F4(
	function (a, b, c, d) {
		return {$: 'RGBA', a: a, b: b, c: c, d: d};
	});
var author$project$Color$rgb = F3(
	function (r, g, b) {
		return A4(author$project$Color$RGBA, r, g, b, 1);
	});
var author$project$Color$black = A3(author$project$Color$rgb, 20, 20, 20);
var author$project$Color$toFloatNorm255 = function (_int) {
	return _int / 255;
};
var author$project$Color$fmod = F2(
	function (f, n) {
		var integer = elm$core$Basics$floor(f);
		return ((n % integer) + f) - integer;
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var elm$core$Basics$pi = _Basics_pi;
var elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * elm$core$Basics$pi) / 180;
};
var author$project$Color$hslToRgb = F3(
	function (hue, saturation, lightness) {
		var normHue = hue / elm$core$Basics$degrees(60);
		var chroma = (1 - elm$core$Basics$abs((2 * lightness) - 1)) * saturation;
		var m = lightness - (chroma / 2);
		var x = chroma * (1 - elm$core$Basics$abs(
			A2(author$project$Color$fmod, normHue, 2) - 1));
		var _n0 = (normHue < 0) ? _Utils_Tuple3(0, 0, 0) : ((normHue < 1) ? _Utils_Tuple3(chroma, x, 0) : ((normHue < 2) ? _Utils_Tuple3(x, chroma, 0) : ((normHue < 3) ? _Utils_Tuple3(0, chroma, x) : ((normHue < 4) ? _Utils_Tuple3(0, x, chroma) : ((normHue < 5) ? _Utils_Tuple3(x, 0, chroma) : ((normHue < 6) ? _Utils_Tuple3(chroma, 0, x) : _Utils_Tuple3(0, 0, 0)))))));
		var r = _n0.a;
		var g = _n0.b;
		var b = _n0.c;
		return _Utils_Tuple3(r + m, g + m, b + m);
	});
var elm$core$Basics$round = _Basics_round;
var author$project$Color$toRgb = function (color) {
	if (color.$ === 'RGBA') {
		var r = color.a;
		var g = color.b;
		var b = color.c;
		var a = color.d;
		return {alpha: a, blue: b, green: g, red: r};
	} else {
		var h = color.a;
		var s = color.b;
		var l = color.c;
		var a = color.d;
		var _n1 = A3(author$project$Color$hslToRgb, h, s, l);
		var r = _n1.a;
		var g = _n1.b;
		var b = _n1.c;
		return {
			alpha: a,
			blue: elm$core$Basics$round(255 * b),
			green: elm$core$Basics$round(255 * g),
			red: elm$core$Basics$round(255 * r)
		};
	}
};
var author$project$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 'Rgba', a: a, b: b, c: c, d: d};
	});
var author$project$Element$rgba = author$project$Internal$Model$Rgba;
var author$project$Color$toElementColor = function (color) {
	var c = author$project$Color$toRgb(color);
	return A4(
		author$project$Element$rgba,
		author$project$Color$toFloatNorm255(c.red),
		author$project$Color$toFloatNorm255(c.green),
		author$project$Color$toFloatNorm255(c.blue),
		c.alpha);
};
var author$project$ColorElement$black = author$project$Color$toElementColor(author$project$Color$black);
var author$project$Internal$Model$AlignX = function (a) {
	return {$: 'AlignX', a: a};
};
var author$project$Internal$Model$Right = {$: 'Right'};
var author$project$Element$alignRight = author$project$Internal$Model$AlignX(author$project$Internal$Model$Right);
var author$project$Internal$Flag$Flag = function (a) {
	return {$: 'Flag', a: a};
};
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Basics$pow = _Basics_pow;
var author$project$Internal$Flag$col = function (i) {
	return author$project$Internal$Flag$Flag(
		A2(elm$core$Basics$pow, 2, i));
};
var author$project$Internal$Flag$transparency = author$project$Internal$Flag$col(1);
var author$project$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 'StyleClass', a: a, b: b};
	});
var author$project$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 'Transparency', a: a, b: b};
	});
var elm$core$String$fromInt = _String_fromNumber;
var author$project$Internal$Model$floatClass = function (x) {
	return elm$core$String$fromInt(
		elm$core$Basics$round(x * 100));
};
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var author$project$Element$alpha = function (o) {
	var transparency = function (x) {
		return 1 - x;
	}(
		A2(
			elm$core$Basics$min,
			1.0,
			A2(elm$core$Basics$max, 0.0, o)));
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$transparency,
		A2(
			author$project$Internal$Model$Transparency,
			'transparency-' + author$project$Internal$Model$floatClass(transparency),
			transparency));
};
var author$project$Internal$Model$Fill = function (a) {
	return {$: 'Fill', a: a};
};
var author$project$Element$fill = author$project$Internal$Model$Fill(1);
var author$project$Internal$Model$Height = function (a) {
	return {$: 'Height', a: a};
};
var author$project$Element$height = author$project$Internal$Model$Height;
var author$project$Internal$Model$Width = function (a) {
	return {$: 'Width', a: a};
};
var author$project$Element$width = author$project$Internal$Model$Width;
var author$project$Internal$Model$Unkeyed = function (a) {
	return {$: 'Unkeyed', a: a};
};
var author$project$Internal$Model$AsColumn = {$: 'AsColumn'};
var author$project$Internal$Model$asColumn = author$project$Internal$Model$AsColumn;
var author$project$Internal$Flag$heightContent = author$project$Internal$Flag$col(36);
var elm$core$Bitwise$and = _Bitwise_and;
var author$project$Internal$Flag$present = F2(
	function (_n0, _n1) {
		var query = _n0.a;
		var truth = _n1.a;
		return _Utils_eq(query & truth, query);
	});
var author$project$Internal$Flag$widthContent = author$project$Internal$Flag$col(38);
var author$project$Internal$Model$Keyed = function (a) {
	return {$: 'Keyed', a: a};
};
var author$project$Internal$Model$Styled = function (a) {
	return {$: 'Styled', a: a};
};
var author$project$Internal$Model$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var author$project$Internal$Model$AsEl = {$: 'AsEl'};
var author$project$Internal$Model$asEl = author$project$Internal$Model$AsEl;
var author$project$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 'Px':
			var px = x.a;
			return elm$core$String$fromInt(px) + 'px';
		case 'Content':
			return 'auto';
		case 'Fill':
			var i = x.a;
			return elm$core$String$fromInt(i) + 'fr';
		case 'Min':
			var min = x.a;
			var len = x.b;
			return 'min' + (elm$core$String$fromInt(min) + author$project$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + (elm$core$String$fromInt(max) + author$project$Internal$Model$lengthClassName(len));
	}
};
var author$project$Internal$Model$pseudoClassName = function (_class) {
	switch (_class.$) {
		case 'Focus':
			return 'focus';
		case 'Hover':
			return 'hover';
		default:
			return 'active';
	}
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var author$project$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 'Shadows':
			var name = style.a;
			return name;
		case 'Transparency':
			var name = style.a;
			var o = style.b;
			return name;
		case 'Style':
			var _class = style.a;
			return _class;
		case 'FontFamily':
			var name = style.a;
			return name;
		case 'FontSize':
			var i = style.a;
			return 'font-size-' + elm$core$String$fromInt(i);
		case 'Single':
			var _class = style.a;
			return _class;
		case 'Colored':
			var _class = style.a;
			return _class;
		case 'SpacingStyle':
			var x = style.a;
			var y = style.b;
			return 'spacing-' + (elm$core$String$fromInt(x) + ('-' + elm$core$String$fromInt(y)));
		case 'PaddingStyle':
			var top = style.a;
			var right = style.b;
			var bottom = style.c;
			var left = style.d;
			return 'pad-' + (elm$core$String$fromInt(top) + ('-' + (elm$core$String$fromInt(right) + ('-' + (elm$core$String$fromInt(bottom) + ('-' + elm$core$String$fromInt(left)))))));
		case 'GridTemplateStyle':
			var template = style.a;
			return 'grid-rows-' + (A2(
				elm$core$String$join,
				'-',
				A2(elm$core$List$map, author$project$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
				elm$core$String$join,
				'-',
				A2(elm$core$List$map, author$project$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + (author$project$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + author$project$Internal$Model$lengthClassName(template.spacing.b)))))));
		case 'GridPosition':
			var pos = style.a;
			return 'grid-pos-' + (elm$core$String$fromInt(pos.row) + ('-' + (elm$core$String$fromInt(pos.col) + ('-' + (elm$core$String$fromInt(pos.width) + ('-' + elm$core$String$fromInt(pos.height)))))));
		case 'PseudoSelector':
			var selector = style.a;
			var subStyle = style.b;
			return A2(
				elm$core$String$join,
				' ',
				A2(
					elm$core$List$cons,
					author$project$Internal$Model$pseudoClassName(selector),
					A2(elm$core$List$map, author$project$Internal$Model$getStyleName, subStyle)));
		default:
			return 'transformation';
	}
};
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return elm$core$Set$Set_elm_builtin(
			A3(elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (_n0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return A2(elm$core$Dict$member, key, dict);
	});
var author$project$Internal$Model$reduceStyles = F2(
	function (style, _n0) {
		var cache = _n0.a;
		var existing = _n0.b;
		var styleName = author$project$Internal$Model$getStyleName(style);
		return A2(elm$core$Set$member, styleName, cache) ? _Utils_Tuple2(cache, existing) : _Utils_Tuple2(
			A2(elm$core$Set$insert, styleName, cache),
			A2(elm$core$List$cons, style, existing));
	});
var author$project$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 'Property', a: a, b: b};
	});
var author$project$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 'Style', a: a, b: b};
	});
var elm$core$String$fromFloat = _String_fromNumber;
var author$project$Internal$Model$formatColor = function (_n0) {
	var red = _n0.a;
	var green = _n0.b;
	var blue = _n0.c;
	var alpha = _n0.d;
	return 'rgba(' + (elm$core$String$fromInt(
		elm$core$Basics$round(red * 255)) + ((',' + elm$core$String$fromInt(
		elm$core$Basics$round(green * 255))) + ((',' + elm$core$String$fromInt(
		elm$core$Basics$round(blue * 255))) + (',' + (elm$core$String$fromFloat(alpha) + ')')))));
};
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var author$project$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		elm$core$String$join,
		' ',
		A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.inset ? elm$core$Maybe$Just('inset') : elm$core$Maybe$Nothing,
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.offset.a) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.offset.b) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.blur) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.size) + 'px'),
					elm$core$Maybe$Just(
					author$project$Internal$Model$formatColor(shadow.color))
				])));
};
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var author$project$Internal$Model$renderFocusStyle = function (focus) {
	return A2(
		author$project$Internal$Model$Style,
		'.se:focus .focusable, .se.focusable:focus',
		A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					A2(
					elm$core$Maybe$map,
					function (color) {
						return A2(
							author$project$Internal$Model$Property,
							'border-color',
							author$project$Internal$Model$formatColor(color));
					},
					focus.borderColor),
					A2(
					elm$core$Maybe$map,
					function (color) {
						return A2(
							author$project$Internal$Model$Property,
							'background-color',
							author$project$Internal$Model$formatColor(color));
					},
					focus.backgroundColor),
					A2(
					elm$core$Maybe$map,
					function (shadow) {
						return A2(
							author$project$Internal$Model$Property,
							'box-shadow',
							author$project$Internal$Model$formatBoxShadow(
								{
									blur: shadow.blur,
									color: shadow.color,
									inset: false,
									offset: A2(
										elm$core$Tuple$mapSecond,
										elm$core$Basics$toFloat,
										A2(elm$core$Tuple$mapFirst, elm$core$Basics$toFloat, shadow.offset)),
									size: shadow.size
								}));
					},
					focus.shadow),
					elm$core$Maybe$Just(
					A2(author$project$Internal$Model$Property, 'outline', 'none'))
				])));
};
var author$project$Internal$Flag$alignBottom = author$project$Internal$Flag$col(41);
var author$project$Internal$Flag$alignRight = author$project$Internal$Flag$col(40);
var author$project$Internal$Flag$centerX = author$project$Internal$Flag$col(42);
var author$project$Internal$Flag$centerY = author$project$Internal$Flag$col(43);
var author$project$Internal$Flag$heightFill = author$project$Internal$Flag$col(37);
var author$project$Internal$Flag$widthFill = author$project$Internal$Flag$col(39);
var elm$json$Json$Encode$string = _Json_wrap;
var elm$json$Json$Decode$map = _Json_map1;
var elm$virtual_dom$VirtualDom$isSync = function (timed) {
	if (timed.$ === 'Sync') {
		return true;
	} else {
		return false;
	}
};
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var author$project$Internal$Model$vDomClass = function (cls) {
	return A2(
		elm$virtual_dom$VirtualDom$property,
		'className',
		elm$json$Json$Encode$string(cls));
};
var author$project$Internal$Style$classes = {above: 'a', active: 'av', alignBottom: 'ab', alignCenterX: 'cx', alignCenterY: 'cy', alignContainerBottom: 'acb', alignContainerCenterX: 'accx', alignContainerCenterY: 'accy', alignContainerRight: 'acr', alignLeft: 'al', alignRight: 'ar', alignTop: 'at', any: 's', behind: 'bh', below: 'b', bold: 'w7', borderDashed: 'bd', borderDotted: 'bdt', borderNone: 'bn', borderSolid: 'bs', capturePointerEvents: 'cpe', clip: 'cp', clipX: 'cpx', clipY: 'cpy', column: 'c', container: 'cr', contentBottom: 'cb', contentCenterX: 'ccx', contentCenterY: 'ccy', contentLeft: 'cl', contentRight: 'cr', contentTop: 'ct', cursorPointer: 'cptr', cursorText: 'ctxt', focus: 'fs', grid: 'g', heightContent: 'hc', heightFill: 'hf', heightFillPortion: 'hfp', hover: 'hv', inFront: 'fr', italic: 'i', noTextSelection: 'notxt', onLeft: 'ol', onRight: 'or', opaque: 'oq', overflowHidden: 'oh', page: 'pg', paragraph: 'p', passPointerEvents: 'ppe', root: 'se', row: 'r', scrollbars: 'sb', scrollbarsX: 'sbx', scrollbarsY: 'sby', seButton: 'sb', single: 'e', spaceEvenly: 'se', strike: 'sk', text: 't', textCenter: 'tc', textExtraBold: 'w8', textExtraLight: 'w2', textHeavy: 'w9', textJustify: 'tj', textJustifyAll: 'tja', textLeft: 'tl', textLight: 'w3', textMedium: 'w5', textNormalWeight: 'w4', textRight: 'tr', textSemiBold: 'w6', textThin: 'w1', textUnitalicized: 'tun', transition: 'ts', transparent: 'clr', underline: 'u', widthContent: 'wc', widthExact: 'we', widthFill: 'wf', widthFillPortion: 'wfp'};
var elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var author$project$Internal$Model$renderNode = F4(
	function (_n0, children, styles, context) {
		var attributes = _n0.attributes;
		var node = _n0.node;
		var has = _n0.has;
		var createNode = F3(
			function (nodeName, attrs, withStyles) {
				if (children.$ === 'Keyed') {
					var keyed = children.a;
					return A3(
						elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							if (withStyles.$ === 'Nothing') {
								return keyed;
							} else {
								var stylesheet = withStyles.a;
								return A2(
									elm$core$List$cons,
									_Utils_Tuple2(
										'stylesheet',
										A3(
											elm$virtual_dom$VirtualDom$node,
											'style',
											_List_fromArray(
												[
													author$project$Internal$Model$vDomClass('stylesheet')
												]),
											_List_fromArray(
												[
													elm$virtual_dom$VirtualDom$text(stylesheet)
												]))),
									keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A3(
						elm$virtual_dom$VirtualDom$node,
						nodeName,
						attrs,
						function () {
							if (withStyles.$ === 'Nothing') {
								return unkeyed;
							} else {
								var stylesheet = withStyles.a;
								return A2(
									elm$core$List$cons,
									A3(
										elm$virtual_dom$VirtualDom$node,
										'style',
										_List_fromArray(
											[
												author$project$Internal$Model$vDomClass('stylesheet')
											]),
										_List_fromArray(
											[
												elm$virtual_dom$VirtualDom$text(stylesheet)
											])),
									unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 'Generic':
					return A3(createNode, 'div', attributes, styles);
				case 'NodeName':
					var nodeName = node.a;
					return A3(createNode, nodeName, attributes, styles);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A3(
								createNode,
								internal,
								_List_fromArray(
									[
										author$project$Internal$Model$vDomClass(author$project$Internal$Style$classes.any + (' ' + author$project$Internal$Style$classes.single))
									]),
								styles)
							]));
			}
		}();
		switch (context.$) {
			case 'AsRow':
				return A2(author$project$Internal$Flag$present, author$project$Internal$Flag$widthFill, has) ? html : (A2(author$project$Internal$Flag$present, author$project$Internal$Flag$alignRight, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					'u',
					_List_fromArray(
						[
							author$project$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.single, author$project$Internal$Style$classes.container, author$project$Internal$Style$classes.contentCenterY, author$project$Internal$Style$classes.alignContainerRight])))
						]),
					_List_fromArray(
						[html])) : (A2(author$project$Internal$Flag$present, author$project$Internal$Flag$centerX, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					's',
					_List_fromArray(
						[
							author$project$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.single, author$project$Internal$Style$classes.container, author$project$Internal$Style$classes.contentCenterY, author$project$Internal$Style$classes.alignContainerCenterX])))
						]),
					_List_fromArray(
						[html])) : html));
			case 'AsColumn':
				return A2(author$project$Internal$Flag$present, author$project$Internal$Flag$heightFill, has) ? html : (A2(author$project$Internal$Flag$present, author$project$Internal$Flag$centerY, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					's',
					_List_fromArray(
						[
							author$project$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.single, author$project$Internal$Style$classes.container, author$project$Internal$Style$classes.alignContainerCenterY])))
						]),
					_List_fromArray(
						[html])) : (A2(author$project$Internal$Flag$present, author$project$Internal$Flag$alignBottom, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					'u',
					_List_fromArray(
						[
							author$project$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.single, author$project$Internal$Style$classes.container, author$project$Internal$Style$classes.alignContainerBottom])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var author$project$Internal$Model$textElement = function (str) {
	return A3(
		elm$virtual_dom$VirtualDom$node,
		'div',
		_List_fromArray(
			[
				A2(
				elm$virtual_dom$VirtualDom$property,
				'className',
				elm$json$Json$Encode$string(
					A2(
						elm$core$String$join,
						' ',
						_List_fromArray(
							[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.text, author$project$Internal$Style$classes.widthContent, author$project$Internal$Style$classes.heightContent]))))
			]),
		_List_fromArray(
			[
				elm$virtual_dom$VirtualDom$text(str)
			]));
};
var author$project$Internal$Model$textElementFill = function (str) {
	return A3(
		elm$virtual_dom$VirtualDom$node,
		'div',
		_List_fromArray(
			[
				A2(
				elm$virtual_dom$VirtualDom$property,
				'className',
				elm$json$Json$Encode$string(
					A2(
						elm$core$String$join,
						' ',
						_List_fromArray(
							[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.text, author$project$Internal$Style$classes.widthFill, author$project$Internal$Style$classes.heightFill]))))
			]),
		_List_fromArray(
			[
				elm$virtual_dom$VirtualDom$text(str)
			]));
};
var author$project$Internal$Model$Active = {$: 'Active'};
var author$project$Internal$Model$Focus = {$: 'Focus'};
var author$project$Internal$Model$Hover = {$: 'Hover'};
var author$project$Internal$Model$renderFont = function (families) {
	var fontName = function (font) {
		switch (font.$) {
			case 'Serif':
				return 'serif';
			case 'SansSerif':
				return 'sans-serif';
			case 'Monospace':
				return 'monospace';
			case 'Typeface':
				var name = font.a;
				return '\"' + (name + '\"');
			default:
				var name = font.a;
				var url = font.b;
				return '\"' + (name + '\"');
		}
	};
	return A2(
		elm$core$String$join,
		', ',
		A2(elm$core$List$map, fontName, families));
};
var author$project$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var renderTopLevels = function (rule) {
			if (rule.$ === 'FontFamily') {
				var name = rule.a;
				var typefaces = rule.b;
				var getImports = function (font) {
					if (font.$ === 'ImportFont') {
						var url = font.b;
						return elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
					} else {
						return elm$core$Maybe$Nothing;
					}
				};
				return elm$core$Maybe$Just(
					A2(
						elm$core$String$join,
						'\n',
						A2(elm$core$List$filterMap, getImports, typefaces)));
			} else {
				return elm$core$Maybe$Nothing;
			}
		};
		var renderProps = F3(
			function (force, _n18, existing) {
				var key = _n18.a;
				var val = _n18.b;
				return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
			});
		var renderStyle = F4(
			function (force, maybePseudo, selector, props) {
				if (maybePseudo.$ === 'Nothing') {
					return selector + ('{' + (A3(
						elm$core$List$foldl,
						renderProps(force),
						'',
						props) + '\n}'));
				} else {
					var pseudo = maybePseudo.a;
					switch (pseudo.$) {
						case 'Hover':
							return selector + (':hover {' + (A3(
								elm$core$List$foldl,
								renderProps(force),
								'',
								props) + '\n}'));
						case 'Focus':
							var renderedProps = A3(
								elm$core$List$foldl,
								renderProps(force),
								'',
								props);
							return A2(
								elm$core$String$join,
								'\n',
								_List_fromArray(
									[selector + (':focus {' + (renderedProps + '\n}')), '.se:focus ~ ' + (selector + (':not(.focus)  {' + (renderedProps + '\n}'))), '.se:focus ' + (selector + ('  {' + (renderedProps + '\n}')))]));
						default:
							return selector + (':active {' + (A3(
								elm$core$List$foldl,
								renderProps(force),
								'',
								props) + '\n}'));
					}
				}
			});
		var renderStyleRule = F3(
			function (rule, maybePseudo, force) {
				switch (rule.$) {
					case 'Style':
						var selector = rule.a;
						var props = rule.b;
						return A4(renderStyle, force, maybePseudo, selector, props);
					case 'Shadows':
						var name = rule.a;
						var prop = rule.b;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(author$project$Internal$Model$Property, 'box-shadow', prop)
								]));
					case 'Transparency':
						var name = rule.a;
						var transparency = rule.b;
						var opacity = A2(
							elm$core$Basics$max,
							0,
							A2(elm$core$Basics$min, 1, 1 - transparency));
						return (opacity <= 0) ? A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(author$project$Internal$Model$Property, 'opacity', '0'),
									A2(author$project$Internal$Model$Property, 'pointer-events', 'none')
								])) : A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(
									author$project$Internal$Model$Property,
									'opacity',
									elm$core$String$fromFloat(opacity)),
									A2(author$project$Internal$Model$Property, 'pointer-events', 'auto')
								]));
					case 'FontSize':
						var i = rule.a;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.font-size-' + elm$core$String$fromInt(i),
							_List_fromArray(
								[
									A2(
									author$project$Internal$Model$Property,
									'font-size',
									elm$core$String$fromInt(i) + 'px')
								]));
					case 'FontFamily':
						var name = rule.a;
						var typefaces = rule.b;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(
									author$project$Internal$Model$Property,
									'font-family',
									author$project$Internal$Model$renderFont(typefaces))
								]));
					case 'Single':
						var _class = rule.a;
						var prop = rule.b;
						var val = rule.c;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							_class,
							_List_fromArray(
								[
									A2(author$project$Internal$Model$Property, prop, val)
								]));
					case 'Colored':
						var _class = rule.a;
						var prop = rule.b;
						var color = rule.c;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							_class,
							_List_fromArray(
								[
									A2(
									author$project$Internal$Model$Property,
									prop,
									author$project$Internal$Model$formatColor(color))
								]));
					case 'SpacingStyle':
						var x = rule.a;
						var y = rule.b;
						var yPx = elm$core$String$fromInt(y) + 'px';
						var xPx = elm$core$String$fromInt(x) + 'px';
						var row = '.' + function ($) {
							return $.row;
						}(author$project$Internal$Style$classes);
						var right = '.' + function ($) {
							return $.alignRight;
						}(author$project$Internal$Style$classes);
						var paragraph = '.' + function ($) {
							return $.paragraph;
						}(author$project$Internal$Style$classes);
						var page = '.' + function ($) {
							return $.page;
						}(author$project$Internal$Style$classes);
						var left = '.' + function ($) {
							return $.alignLeft;
						}(author$project$Internal$Style$classes);
						var column = '.' + function ($) {
							return $.column;
						}(author$project$Internal$Style$classes);
						var _class = '.spacing-' + (elm$core$String$fromInt(x) + ('-' + elm$core$String$fromInt(y)));
						var any = '.' + function ($) {
							return $.any;
						}(author$project$Internal$Style$classes);
						return A3(
							elm$core$List$foldl,
							elm$core$Basics$append,
							'',
							_List_fromArray(
								[
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (row + (' > ' + (any + (' + ' + any)))),
									_List_fromArray(
										[
											A2(author$project$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (column + (' > ' + (any + (' + ' + any)))),
									_List_fromArray(
										[
											A2(author$project$Internal$Model$Property, 'margin-top', yPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + (any + (' + ' + any)))),
									_List_fromArray(
										[
											A2(author$project$Internal$Model$Property, 'margin-top', yPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + left)),
									_List_fromArray(
										[
											A2(author$project$Internal$Model$Property, 'margin-right', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + right)),
									_List_fromArray(
										[
											A2(author$project$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_Utils_ap(_class, paragraph),
									_List_fromArray(
										[
											A2(
											author$project$Internal$Model$Property,
											'line-height',
											'calc(1em + ' + (elm$core$String$fromInt(y) + 'px)'))
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									'textarea' + _class,
									_List_fromArray(
										[
											A2(
											author$project$Internal$Model$Property,
											'line-height',
											'calc(1em + ' + (elm$core$String$fromInt(y) + 'px)'))
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + (' > ' + left)),
									_List_fromArray(
										[
											A2(author$project$Internal$Model$Property, 'margin-right', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + (' > ' + right)),
									_List_fromArray(
										[
											A2(author$project$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + '::after'),
									_List_fromArray(
										[
											A2(author$project$Internal$Model$Property, 'content', '\'\''),
											A2(author$project$Internal$Model$Property, 'display', 'block'),
											A2(author$project$Internal$Model$Property, 'height', '0'),
											A2(author$project$Internal$Model$Property, 'width', '0'),
											A2(
											author$project$Internal$Model$Property,
											'margin-top',
											elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + '::before'),
									_List_fromArray(
										[
											A2(author$project$Internal$Model$Property, 'content', '\'\''),
											A2(author$project$Internal$Model$Property, 'display', 'block'),
											A2(author$project$Internal$Model$Property, 'height', '0'),
											A2(author$project$Internal$Model$Property, 'width', '0'),
											A2(
											author$project$Internal$Model$Property,
											'margin-bottom',
											elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
										]))
								]));
					case 'PaddingStyle':
						var top = rule.a;
						var right = rule.b;
						var bottom = rule.c;
						var left = rule.d;
						var _class = '.pad-' + (elm$core$String$fromInt(top) + ('-' + (elm$core$String$fromInt(right) + ('-' + (elm$core$String$fromInt(bottom) + ('-' + elm$core$String$fromInt(left)))))));
						return A4(
							renderStyle,
							force,
							maybePseudo,
							_class,
							_List_fromArray(
								[
									A2(
									author$project$Internal$Model$Property,
									'padding',
									elm$core$String$fromInt(top) + ('px ' + (elm$core$String$fromInt(right) + ('px ' + (elm$core$String$fromInt(bottom) + ('px ' + (elm$core$String$fromInt(left) + 'px')))))))
								]));
					case 'GridTemplateStyle':
						var template = rule.a;
						var toGridLengthHelper = F3(
							function (minimum, maximum, x) {
								switch (x.$) {
									case 'Px':
										var px = x.a;
										return elm$core$String$fromInt(px) + 'px';
									case 'Content':
										var _n2 = _Utils_Tuple2(minimum, maximum);
										if (_n2.a.$ === 'Nothing') {
											if (_n2.b.$ === 'Nothing') {
												var _n3 = _n2.a;
												var _n4 = _n2.b;
												return 'max-content';
											} else {
												var _n6 = _n2.a;
												var maxSize = _n2.b.a;
												return 'minmax(max-content, ' + (elm$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n2.b.$ === 'Nothing') {
												var minSize = _n2.a.a;
												var _n5 = _n2.b;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
											} else {
												var minSize = _n2.a.a;
												var maxSize = _n2.b.a;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 'Fill':
										var i = x.a;
										var _n7 = _Utils_Tuple2(minimum, maximum);
										if (_n7.a.$ === 'Nothing') {
											if (_n7.b.$ === 'Nothing') {
												var _n8 = _n7.a;
												var _n9 = _n7.b;
												return elm$core$String$fromInt(i) + 'fr';
											} else {
												var _n11 = _n7.a;
												var maxSize = _n7.b.a;
												return 'minmax(max-content, ' + (elm$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n7.b.$ === 'Nothing') {
												var minSize = _n7.a.a;
												var _n10 = _n7.b;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
											} else {
												var minSize = _n7.a.a;
												var maxSize = _n7.b.a;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 'Min':
										var m = x.a;
										var len = x.b;
										return A3(
											toGridLengthHelper,
											elm$core$Maybe$Just(m),
											maximum,
											len);
									default:
										var m = x.a;
										var len = x.b;
										return A3(
											toGridLengthHelper,
											minimum,
											elm$core$Maybe$Just(m),
											len);
								}
							});
						var toGridLength = function (x) {
							return A3(toGridLengthHelper, elm$core$Maybe$Nothing, elm$core$Maybe$Nothing, x);
						};
						var xSpacing = toGridLength(template.spacing.a);
						var ySpacing = toGridLength(template.spacing.b);
						var rows = function (x) {
							return 'grid-template-rows: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								' ',
								A2(elm$core$List$map, toGridLength, template.rows)));
						var msRows = function (x) {
							return '-ms-grid-rows: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								ySpacing,
								A2(elm$core$List$map, toGridLength, template.columns)));
						var msColumns = function (x) {
							return '-ms-grid-columns: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								ySpacing,
								A2(elm$core$List$map, toGridLength, template.columns)));
						var gapY = 'grid-row-gap:' + (toGridLength(template.spacing.b) + ';');
						var gapX = 'grid-column-gap:' + (toGridLength(template.spacing.a) + ';');
						var columns = function (x) {
							return 'grid-template-columns: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								' ',
								A2(elm$core$List$map, toGridLength, template.columns)));
						var _class = '.grid-rows-' + (A2(
							elm$core$String$join,
							'-',
							A2(elm$core$List$map, author$project$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
							elm$core$String$join,
							'-',
							A2(elm$core$List$map, author$project$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + (author$project$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + author$project$Internal$Model$lengthClassName(template.spacing.b)))))));
						var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
						var supports = '@supports (display:grid) {' + (modernGrid + '}');
						var base = _class + ('{' + (msColumns + (msRows + '}')));
						return _Utils_ap(base, supports);
					case 'GridPosition':
						var position = rule.a;
						var msPosition = A2(
							elm$core$String$join,
							' ',
							_List_fromArray(
								[
									'-ms-grid-row: ' + (elm$core$String$fromInt(position.row) + ';'),
									'-ms-grid-row-span: ' + (elm$core$String$fromInt(position.height) + ';'),
									'-ms-grid-column: ' + (elm$core$String$fromInt(position.col) + ';'),
									'-ms-grid-column-span: ' + (elm$core$String$fromInt(position.width) + ';')
								]));
						var modernPosition = A2(
							elm$core$String$join,
							' ',
							_List_fromArray(
								[
									'grid-row: ' + (elm$core$String$fromInt(position.row) + (' / ' + (elm$core$String$fromInt(position.row + position.height) + ';'))),
									'grid-column: ' + (elm$core$String$fromInt(position.col) + (' / ' + (elm$core$String$fromInt(position.col + position.width) + ';')))
								]));
						var _class = '.grid-pos-' + (elm$core$String$fromInt(position.row) + ('-' + (elm$core$String$fromInt(position.col) + ('-' + (elm$core$String$fromInt(position.width) + ('-' + elm$core$String$fromInt(position.height)))))));
						var modernGrid = _class + ('{' + (modernPosition + '}'));
						var supports = '@supports (display:grid) {' + (modernGrid + '}');
						var base = _class + ('{' + (msPosition + '}'));
						return _Utils_ap(base, supports);
					case 'PseudoSelector':
						var _class = rule.a;
						var styles = rule.b;
						var renderPseudoRule = function (style) {
							switch (_class.$) {
								case 'Focus':
									return A3(
										renderStyleRule,
										style,
										elm$core$Maybe$Just(author$project$Internal$Model$Focus),
										false);
								case 'Active':
									return A3(
										renderStyleRule,
										style,
										elm$core$Maybe$Just(author$project$Internal$Model$Active),
										false);
								default:
									var _n13 = options.hover;
									switch (_n13.$) {
										case 'NoHover':
											return '';
										case 'AllowHover':
											return A3(
												renderStyleRule,
												style,
												elm$core$Maybe$Just(author$project$Internal$Model$Hover),
												false);
										default:
											return A3(renderStyleRule, style, elm$core$Maybe$Nothing, true);
									}
							}
						};
						return A2(
							elm$core$String$join,
							' ',
							A2(elm$core$List$map, renderPseudoRule, styles));
					default:
						return '';
				}
			});
		var combine = F2(
			function (style, rendered) {
				return _Utils_update(
					rendered,
					{
						rules: _Utils_ap(
							rendered.rules,
							A3(renderStyleRule, style, elm$core$Maybe$Nothing, false)),
						topLevel: function () {
							var _n15 = renderTopLevels(style);
							if (_n15.$ === 'Nothing') {
								return rendered.topLevel;
							} else {
								var topLevel = _n15.a;
								return _Utils_ap(rendered.topLevel, topLevel);
							}
						}()
					});
			});
		return function (_n14) {
			var rules = _n14.rules;
			var topLevel = _n14.topLevel;
			return _Utils_ap(topLevel, rules);
		}(
			A3(
				elm$core$List$foldl,
				combine,
				{rules: '', topLevel: ''},
				stylesheet));
	});
var author$project$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		return A3(
			elm$virtual_dom$VirtualDom$node,
			'style',
			_List_Nil,
			_List_fromArray(
				[
					elm$virtual_dom$VirtualDom$text(
					A2(author$project$Internal$Model$toStyleSheetString, options, styleSheet))
				]));
	});
var author$project$Internal$Style$Batch = function (a) {
	return {$: 'Batch', a: a};
};
var author$project$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 'Child', a: a, b: b};
	});
var author$project$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var author$project$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 'Descriptor', a: a, b: b};
	});
var author$project$Internal$Style$Left = {$: 'Left'};
var author$project$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 'Prop', a: a, b: b};
	});
var author$project$Internal$Style$Right = {$: 'Right'};
var author$project$Internal$Style$Self = function (a) {
	return {$: 'Self', a: a};
};
var author$project$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 'Supports', a: a, b: b};
	});
var author$project$Internal$Style$Content = function (a) {
	return {$: 'Content', a: a};
};
var author$project$Internal$Style$Bottom = {$: 'Bottom'};
var author$project$Internal$Style$CenterX = {$: 'CenterX'};
var author$project$Internal$Style$CenterY = {$: 'CenterY'};
var author$project$Internal$Style$Top = {$: 'Top'};
var author$project$Internal$Style$alignments = _List_fromArray(
	[author$project$Internal$Style$Top, author$project$Internal$Style$Bottom, author$project$Internal$Style$Right, author$project$Internal$Style$Left, author$project$Internal$Style$CenterX, author$project$Internal$Style$CenterY]);
var author$project$Internal$Style$dot = function (c) {
	return '.' + c;
};
var author$project$Internal$Style$contentName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _n1 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.contentTop);
		case 'Bottom':
			var _n2 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.contentBottom);
		case 'Right':
			var _n3 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.contentRight);
		case 'Left':
			var _n4 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.contentLeft);
		case 'CenterX':
			var _n5 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.contentCenterX);
		default:
			var _n6 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.contentCenterY);
	}
};
var author$project$Internal$Style$selfName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _n1 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignTop);
		case 'Bottom':
			var _n2 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignBottom);
		case 'Right':
			var _n3 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignRight);
		case 'Left':
			var _n4 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignLeft);
		case 'CenterX':
			var _n5 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignCenterX);
		default:
			var _n6 = desc.a;
			return author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignCenterY);
	}
};
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var author$project$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _n0 = values(alignment);
		var content = _n0.a;
		var indiv = _n0.b;
		return _List_fromArray(
			[
				A2(
				author$project$Internal$Style$Descriptor,
				author$project$Internal$Style$contentName(
					author$project$Internal$Style$Content(alignment)),
				content),
				A2(
				author$project$Internal$Style$Child,
				author$project$Internal$Style$dot(author$project$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$selfName(
							author$project$Internal$Style$Self(alignment)),
						indiv)
					]))
			]);
	};
	return author$project$Internal$Style$Batch(
		A2(elm$core$List$concatMap, createDescription, author$project$Internal$Style$alignments));
};
var author$project$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				author$project$Internal$Style$Child,
				author$project$Internal$Style$dot(author$project$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$selfName(
							author$project$Internal$Style$Self(alignment)),
						values(alignment))
					]))
			]);
	};
	return author$project$Internal$Style$Batch(
		A2(elm$core$List$concatMap, createDescription, author$project$Internal$Style$alignments));
};
var author$project$Internal$Style$Above = {$: 'Above'};
var author$project$Internal$Style$Behind = {$: 'Behind'};
var author$project$Internal$Style$Below = {$: 'Below'};
var author$project$Internal$Style$OnLeft = {$: 'OnLeft'};
var author$project$Internal$Style$OnRight = {$: 'OnRight'};
var author$project$Internal$Style$Within = {$: 'Within'};
var author$project$Internal$Style$locations = function () {
	var loc = author$project$Internal$Style$Above;
	var _n0 = function () {
		switch (loc.$) {
			case 'Above':
				return _Utils_Tuple0;
			case 'Below':
				return _Utils_Tuple0;
			case 'OnRight':
				return _Utils_Tuple0;
			case 'OnLeft':
				return _Utils_Tuple0;
			case 'Within':
				return _Utils_Tuple0;
			default:
				return _Utils_Tuple0;
		}
	}();
	return _List_fromArray(
		[author$project$Internal$Style$Above, author$project$Internal$Style$Below, author$project$Internal$Style$OnRight, author$project$Internal$Style$OnLeft, author$project$Internal$Style$Within, author$project$Internal$Style$Behind]);
}();
var author$project$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .se.row > .se { flex-basis: auto !important; }\n  .se.row > .se.container { flex-basis: auto !important; }\n}';
var author$project$Internal$Style$Intermediate = function (a) {
	return {$: 'Intermediate', a: a};
};
var author$project$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return author$project$Internal$Style$Intermediate(
			{closing: closing, others: _List_Nil, props: _List_Nil, selector: selector});
	});
var author$project$Internal$Style$renderRules = F2(
	function (_n0, rulesToRender) {
		var parent = _n0.a;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 'Prop':
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								props: A2(
									elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.props)
							});
					case 'Supports':
						var _n2 = rule.a;
						var prop = _n2.a;
						var value = _n2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm$core$List$cons,
									author$project$Internal$Style$Intermediate(
										{closing: '\n}', others: _List_Nil, props: props, selector: '@supports (' + (prop + (':' + (value + (') {' + parent.selector))))}),
									rendered.others)
							});
					case 'Adjacent':
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm$core$List$cons,
									A2(
										author$project$Internal$Style$renderRules,
										A2(author$project$Internal$Style$emptyIntermediate, parent.selector + (' + ' + selector), ''),
										adjRules),
									rendered.others)
							});
					case 'Child':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm$core$List$cons,
									A2(
										author$project$Internal$Style$renderRules,
										A2(author$project$Internal$Style$emptyIntermediate, parent.selector + (' > ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'Descriptor':
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm$core$List$cons,
									A2(
										author$project$Internal$Style$renderRules,
										A2(
											author$project$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.selector, descriptor),
											''),
										descriptorRules),
									rendered.others)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm$core$List$cons,
									A2(
										author$project$Internal$Style$renderRules,
										A2(author$project$Internal$Style$emptyIntermediate, parent.selector, ''),
										batched),
									rendered.others)
							});
				}
			});
		return author$project$Internal$Style$Intermediate(
			A3(elm$core$List$foldr, generateIntermediates, parent, rulesToRender));
	});
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var author$project$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return elm$core$String$concat(
			A2(
				elm$core$List$map,
				function (_n3) {
					var x = _n3.a;
					var y = _n3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _n2 = rule.props;
		if (!_n2.b) {
			return '';
		} else {
			return rule.selector + ('{' + (renderValues(rule.props) + (rule.closing + '}')));
		}
	};
	var renderIntermediate = function (_n0) {
		var rule = _n0.a;
		return _Utils_ap(
			renderClass(rule),
			elm$core$String$concat(
				A2(elm$core$List$map, renderIntermediate, rule.others)));
	};
	return elm$core$String$concat(
		A2(
			elm$core$List$map,
			renderIntermediate,
			A3(
				elm$core$List$foldr,
				F2(
					function (_n1, existing) {
						var name = _n1.a;
						var styleRules = _n1.b;
						return A2(
							elm$core$List$cons,
							A2(
								author$project$Internal$Style$renderRules,
								A2(author$project$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var author$project$Internal$Style$rules = _Utils_ap(
	author$project$Internal$Style$overrides,
	author$project$Internal$Style$renderCompact(
		_List_fromArray(
			[
				A2(
				author$project$Internal$Style$Class,
				'html,body',
				_List_fromArray(
					[
						A2(author$project$Internal$Style$Prop, 'height', '100%'),
						A2(author$project$Internal$Style$Prop, 'padding', '0'),
						A2(author$project$Internal$Style$Prop, 'margin', '0')
					])),
				A2(
				author$project$Internal$Style$Class,
				author$project$Internal$Style$dot(author$project$Internal$Style$classes.any) + ':focus',
				_List_fromArray(
					[
						A2(author$project$Internal$Style$Prop, 'outline', 'none')
					])),
				A2(
				author$project$Internal$Style$Class,
				author$project$Internal$Style$dot(author$project$Internal$Style$classes.root),
				_List_fromArray(
					[
						A2(author$project$Internal$Style$Prop, 'width', '100%'),
						A2(author$project$Internal$Style$Prop, 'height', 'auto'),
						A2(author$project$Internal$Style$Prop, 'min-height', '100%'),
						A2(
						author$project$Internal$Style$Descriptor,
						_Utils_ap(
							author$project$Internal$Style$dot(author$project$Internal$Style$classes.any),
							_Utils_ap(
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.single),
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.heightContent))),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'height', '100%'),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'height', '100%')
									]))
							]))
					])),
				A2(
				author$project$Internal$Style$Class,
				author$project$Internal$Style$dot(author$project$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(author$project$Internal$Style$Prop, 'position', 'relative'),
						A2(author$project$Internal$Style$Prop, 'border', 'none'),
						A2(author$project$Internal$Style$Prop, 'flex-shrink', '0'),
						A2(author$project$Internal$Style$Prop, 'display', 'flex'),
						A2(author$project$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(author$project$Internal$Style$Prop, 'flex-basis', 'auto'),
						A2(author$project$Internal$Style$Prop, 'resize', 'none'),
						A2(author$project$Internal$Style$Prop, 'box-sizing', 'border-box'),
						A2(author$project$Internal$Style$Prop, 'margin', '0'),
						A2(author$project$Internal$Style$Prop, 'padding', '0'),
						A2(author$project$Internal$Style$Prop, 'border-width', '0'),
						A2(author$project$Internal$Style$Prop, 'border-style', 'solid'),
						A2(author$project$Internal$Style$Prop, 'font-size', 'inherit'),
						A2(author$project$Internal$Style$Prop, 'color', 'inherit'),
						A2(author$project$Internal$Style$Prop, 'font-family', 'inherit'),
						A2(author$project$Internal$Style$Prop, 'line-height', '1'),
						A2(author$project$Internal$Style$Prop, 'font-weight', 'inherit'),
						A2(author$project$Internal$Style$Prop, 'text-decoration', 'none'),
						A2(author$project$Internal$Style$Prop, 'font-style', 'inherit'),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.noTextSelection),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'user-select', 'none'),
								A2(author$project$Internal$Style$Prop, '-ms-user-select', 'none')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.cursorPointer),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'cursor', 'pointer')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.cursorText),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'cursor', 'text')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.passPointerEvents),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'pointer-events', 'none')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.capturePointerEvents),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'pointer-events', 'auto')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.transparent),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.opaque),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(
							_Utils_ap(author$project$Internal$Style$classes.hover, author$project$Internal$Style$classes.transparent)) + ':hover',
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(
							_Utils_ap(author$project$Internal$Style$classes.hover, author$project$Internal$Style$classes.opaque)) + ':hover',
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(
							_Utils_ap(author$project$Internal$Style$classes.focus, author$project$Internal$Style$classes.transparent)) + ':focus',
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(
							_Utils_ap(author$project$Internal$Style$classes.focus, author$project$Internal$Style$classes.opaque)) + ':focus',
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(
							_Utils_ap(author$project$Internal$Style$classes.active, author$project$Internal$Style$classes.transparent)) + ':active',
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(
							_Utils_ap(author$project$Internal$Style$classes.active, author$project$Internal$Style$classes.opaque)) + ':active',
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.transition),
						_List_fromArray(
							[
								A2(
								author$project$Internal$Style$Prop,
								'transition',
								A2(
									elm$core$String$join,
									', ',
									A2(
										elm$core$List$map,
										function (x) {
											return x + ' 160ms';
										},
										_List_fromArray(
											['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.overflowHidden),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'overflow', 'hidden'),
								A2(author$project$Internal$Style$Prop, '-ms-overflow-style', 'none')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.scrollbars),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'overflow', 'auto'),
								A2(author$project$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.scrollbarsX),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'overflow-x', 'auto'),
								A2(
								author$project$Internal$Style$Descriptor,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.row),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.scrollbarsY),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'overflow-y', 'auto'),
								A2(
								author$project$Internal$Style$Descriptor,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.column),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.clip),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'overflow', 'hidden')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.clipX),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'overflow-x', 'hidden')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.clipY),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'overflow-y', 'hidden')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.widthContent),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'width', 'auto')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.borderNone),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'border-width', '0')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.borderDashed),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'border-style', 'dashed')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.borderDotted),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'border-style', 'dotted')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.borderSolid),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'border-style', 'solid')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.text),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'white-space', 'pre'),
								A2(author$project$Internal$Style$Prop, 'display', 'inline-block')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'display', 'flex'),
								A2(author$project$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(author$project$Internal$Style$Prop, 'white-space', 'pre'),
								A2(
								author$project$Internal$Style$Descriptor,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.seButton),
								_List_fromArray(
									[
										A2(
										author$project$Internal$Style$Child,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.text),
										_List_fromArray(
											[
												A2(
												author$project$Internal$Style$Descriptor,
												author$project$Internal$Style$dot(author$project$Internal$Style$classes.heightFill),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'flex-grow', '0')
													])),
												A2(
												author$project$Internal$Style$Descriptor,
												author$project$Internal$Style$dot(author$project$Internal$Style$classes.widthFill),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-self', 'auto !important')
													]))
											]))
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.heightContent),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'height', 'auto')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.widthFill),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.widthContent),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'align-self', 'left')
									])),
								author$project$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
														A2(author$project$Internal$Style$Prop, 'margin-top', '0 !important')
													]));
										case 'Bottom':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'margin-top', 'auto !important'),
														A2(author$project$Internal$Style$Prop, 'margin-bottom', '0 !important')
													]));
										case 'Right':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 'CenterX':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-self', 'center')
													]));
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(
														author$project$Internal$Style$Child,
														author$project$Internal$Style$dot(author$project$Internal$Style$classes.any),
														_List_fromArray(
															[
																A2(author$project$Internal$Style$Prop, 'margin-top', 'auto'),
																A2(author$project$Internal$Style$Prop, 'margin-bottom', 'auto')
															]))
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'margin-top', 'auto !important'),
														A2(author$project$Internal$Style$Prop, 'margin-bottom', 'auto !important')
													]));
									}
								})
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'display', 'flex'),
								A2(author$project$Internal$Style$Prop, 'flex-direction', 'row'),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-basis', '0%'),
										A2(
										author$project$Internal$Style$Descriptor,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.widthExact),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'flex-basis', 'auto')
											]))
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.heightFillPortion),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.widthFill),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.container),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '0'),
										A2(author$project$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(author$project$Internal$Style$Prop, 'align-self', 'stretch')
									])),
								A2(
								author$project$Internal$Style$Child,
								'u:first-of-type.' + author$project$Internal$Style$classes.alignContainerRight,
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								author$project$Internal$Style$Child,
								's:first-of-type.' + author$project$Internal$Style$classes.alignContainerCenterX,
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										author$project$Internal$Style$Child,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignCenterX),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'margin-left', 'auto !important')
											]))
									])),
								A2(
								author$project$Internal$Style$Child,
								's:last-of-type.' + author$project$Internal$Style$classes.alignContainerCenterX,
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										author$project$Internal$Style$Child,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignCenterX),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'margin-right', 'auto !important')
											]))
									])),
								A2(
								author$project$Internal$Style$Child,
								's:only-of-type.' + author$project$Internal$Style$classes.alignContainerCenterX,
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										author$project$Internal$Style$Child,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(author$project$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								author$project$Internal$Style$Child,
								's:last-of-type.' + (author$project$Internal$Style$classes.alignContainerCenterX + ' ~ u'),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								author$project$Internal$Style$Child,
								'u:first-of-type.' + (author$project$Internal$Style$classes.alignContainerRight + (' ~ s.' + author$project$Internal$Style$classes.alignContainerCenterX)),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '0')
									])),
								author$project$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 'Bottom':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 'Right':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_Nil);
										case 'Left':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_Nil);
										case 'CenterX':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'justify-content', 'center')
													]),
												_List_Nil);
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-self', 'center')
													]));
									}
								}),
								A2(
								author$project$Internal$Style$Descriptor,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.spaceEvenly),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'display', 'flex'),
								A2(author$project$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.widthFill),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.widthFillPortion),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.widthContent),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'align-self', 'left')
									])),
								A2(
								author$project$Internal$Style$Child,
								'u:first-of-type.' + author$project$Internal$Style$classes.alignContainerBottom,
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								author$project$Internal$Style$Child,
								's:first-of-type.' + author$project$Internal$Style$classes.alignContainerCenterY,
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										author$project$Internal$Style$Child,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(author$project$Internal$Style$Prop, 'margin-bottom', '0 !important')
											]))
									])),
								A2(
								author$project$Internal$Style$Child,
								's:last-of-type.' + author$project$Internal$Style$classes.alignContainerCenterY,
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										author$project$Internal$Style$Child,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
												A2(author$project$Internal$Style$Prop, 'margin-top', '0 !important')
											]))
									])),
								A2(
								author$project$Internal$Style$Child,
								's:only-of-type.' + author$project$Internal$Style$classes.alignContainerCenterY,
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										author$project$Internal$Style$Child,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(author$project$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								author$project$Internal$Style$Child,
								's:last-of-type.' + (author$project$Internal$Style$classes.alignContainerCenterY + ' ~ u'),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								author$project$Internal$Style$Child,
								'u:first-of-type.' + (author$project$Internal$Style$classes.alignContainerBottom + (' ~ s.' + author$project$Internal$Style$classes.alignContainerCenterY)),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '0')
									])),
								author$project$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'margin-bottom', 'auto')
													]));
										case 'Bottom':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'margin-top', 'auto')
													]));
										case 'Right':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 'CenterX':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'align-self', 'center')
													]));
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'justify-content', 'center')
													]),
												_List_Nil);
									}
								}),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.container),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'flex-grow', '0'),
										A2(author$project$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(author$project$Internal$Style$Prop, 'width', '100%'),
										A2(author$project$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								author$project$Internal$Style$Descriptor,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.spaceEvenly),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.grid),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'display', '-ms-grid'),
								A2(
								author$project$Internal$Style$Supports,
								_Utils_Tuple2('display', 'grid'),
								_List_fromArray(
									[
										_Utils_Tuple2('display', 'grid')
									])),
								author$project$Internal$Style$gridAlignments(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'justify-content', 'flex-start')
												]);
										case 'Bottom':
											return _List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'justify-content', 'flex-end')
												]);
										case 'Right':
											return _List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'align-items', 'flex-end')
												]);
										case 'Left':
											return _List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'align-items', 'flex-start')
												]);
										case 'CenterX':
											return _List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'align-items', 'center')
												]);
										default:
											return _List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'justify-content', 'center')
												]);
									}
								})
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.page),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'display', 'block'),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.any + ':first-child'),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(
									author$project$Internal$Style$classes.any + (author$project$Internal$Style$selfName(
										author$project$Internal$Style$Self(author$project$Internal$Style$Left)) + (':first-child + .' + author$project$Internal$Style$classes.any))),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(
									author$project$Internal$Style$classes.any + (author$project$Internal$Style$selfName(
										author$project$Internal$Style$Self(author$project$Internal$Style$Right)) + (':first-child + .' + author$project$Internal$Style$classes.any))),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'margin', '0 !important')
									])),
								author$project$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Bottom':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Right':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'float', 'right'),
														A2(
														author$project$Internal$Style$Descriptor,
														':after:',
														_List_fromArray(
															[
																A2(author$project$Internal$Style$Prop, 'content', '\"\"'),
																A2(author$project$Internal$Style$Prop, 'display', 'table'),
																A2(author$project$Internal$Style$Prop, 'clear', 'both')
															]))
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'float', 'left'),
														A2(
														author$project$Internal$Style$Descriptor,
														':after:',
														_List_fromArray(
															[
																A2(author$project$Internal$Style$Prop, 'content', '\"\"'),
																A2(author$project$Internal$Style$Prop, 'display', 'table'),
																A2(author$project$Internal$Style$Prop, 'clear', 'both')
															]))
													]));
										case 'CenterX':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										default:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
									}
								})
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.paragraph),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'display', 'block'),
								A2(author$project$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.text),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'display', 'inline'),
										A2(author$project$Internal$Style$Prop, 'white-space', 'normal')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.single),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'display', 'inline'),
										A2(author$project$Internal$Style$Prop, 'white-space', 'normal'),
										A2(
										author$project$Internal$Style$Descriptor,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.inFront),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										author$project$Internal$Style$Descriptor,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.behind),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										author$project$Internal$Style$Descriptor,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.above),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										author$project$Internal$Style$Descriptor,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.below),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										author$project$Internal$Style$Descriptor,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.onRight),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										author$project$Internal$Style$Descriptor,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.onLeft),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										author$project$Internal$Style$Child,
										author$project$Internal$Style$dot(author$project$Internal$Style$classes.text),
										_List_fromArray(
											[
												A2(author$project$Internal$Style$Prop, 'display', 'inline'),
												A2(author$project$Internal$Style$Prop, 'white-space', 'normal')
											]))
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.row),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.column),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								author$project$Internal$Style$Child,
								author$project$Internal$Style$dot(author$project$Internal$Style$classes.grid),
								_List_fromArray(
									[
										A2(author$project$Internal$Style$Prop, 'display', 'inline-grid')
									])),
								author$project$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Bottom':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Right':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'float', 'right')
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(author$project$Internal$Style$Prop, 'float', 'left')
													]));
										case 'CenterX':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										default:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
									}
								})
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						'.hidden',
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'display', 'none')
							])),
						author$project$Internal$Style$Batch(
						function (fn) {
							return A2(elm$core$List$map, fn, author$project$Internal$Style$locations);
						}(
							function (loc) {
								switch (loc.$) {
									case 'Above':
										return A2(
											author$project$Internal$Style$Descriptor,
											author$project$Internal$Style$dot(author$project$Internal$Style$classes.above),
											_List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'position', 'absolute'),
													A2(author$project$Internal$Style$Prop, 'bottom', '100%'),
													A2(author$project$Internal$Style$Prop, 'left', '0'),
													A2(author$project$Internal$Style$Prop, 'width', '100%'),
													A2(author$project$Internal$Style$Prop, 'z-index', '10'),
													A2(author$project$Internal$Style$Prop, 'margin', '0 !important'),
													A2(
													author$project$Internal$Style$Child,
													author$project$Internal$Style$dot(author$project$Internal$Style$classes.heightFill),
													_List_fromArray(
														[
															A2(author$project$Internal$Style$Prop, 'height', 'auto')
														])),
													A2(
													author$project$Internal$Style$Child,
													author$project$Internal$Style$dot(author$project$Internal$Style$classes.widthFill),
													_List_fromArray(
														[
															A2(author$project$Internal$Style$Prop, 'width', '100%')
														])),
													A2(author$project$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													author$project$Internal$Style$Child,
													author$project$Internal$Style$dot(author$project$Internal$Style$classes.any),
													_List_fromArray(
														[
															A2(author$project$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									case 'Below':
										return A2(
											author$project$Internal$Style$Descriptor,
											author$project$Internal$Style$dot(author$project$Internal$Style$classes.below),
											_List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'position', 'absolute'),
													A2(author$project$Internal$Style$Prop, 'bottom', '0'),
													A2(author$project$Internal$Style$Prop, 'left', '0'),
													A2(author$project$Internal$Style$Prop, 'height', '0'),
													A2(author$project$Internal$Style$Prop, 'width', '100%'),
													A2(author$project$Internal$Style$Prop, 'z-index', '10'),
													A2(author$project$Internal$Style$Prop, 'margin', '0 !important'),
													A2(author$project$Internal$Style$Prop, 'pointer-events', 'auto'),
													A2(
													author$project$Internal$Style$Child,
													author$project$Internal$Style$dot(author$project$Internal$Style$classes.heightFill),
													_List_fromArray(
														[
															A2(author$project$Internal$Style$Prop, 'height', 'auto')
														]))
												]));
									case 'OnRight':
										return A2(
											author$project$Internal$Style$Descriptor,
											author$project$Internal$Style$dot(author$project$Internal$Style$classes.onRight),
											_List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'position', 'absolute'),
													A2(author$project$Internal$Style$Prop, 'left', '100%'),
													A2(author$project$Internal$Style$Prop, 'top', '0'),
													A2(author$project$Internal$Style$Prop, 'height', '100%'),
													A2(author$project$Internal$Style$Prop, 'margin', '0 !important'),
													A2(author$project$Internal$Style$Prop, 'z-index', '10'),
													A2(author$project$Internal$Style$Prop, 'pointer-events', 'auto')
												]));
									case 'OnLeft':
										return A2(
											author$project$Internal$Style$Descriptor,
											author$project$Internal$Style$dot(author$project$Internal$Style$classes.onLeft),
											_List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'position', 'absolute'),
													A2(author$project$Internal$Style$Prop, 'right', '100%'),
													A2(author$project$Internal$Style$Prop, 'top', '0'),
													A2(author$project$Internal$Style$Prop, 'height', '100%'),
													A2(author$project$Internal$Style$Prop, 'margin', '0 !important'),
													A2(author$project$Internal$Style$Prop, 'z-index', '10'),
													A2(author$project$Internal$Style$Prop, 'pointer-events', 'auto')
												]));
									case 'Within':
										return A2(
											author$project$Internal$Style$Descriptor,
											author$project$Internal$Style$dot(author$project$Internal$Style$classes.inFront),
											_List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'position', 'absolute'),
													A2(author$project$Internal$Style$Prop, 'width', '100%'),
													A2(author$project$Internal$Style$Prop, 'height', '100%'),
													A2(author$project$Internal$Style$Prop, 'left', '0'),
													A2(author$project$Internal$Style$Prop, 'top', '0'),
													A2(author$project$Internal$Style$Prop, 'margin', '0 !important'),
													A2(author$project$Internal$Style$Prop, 'z-index', '10'),
													A2(author$project$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													author$project$Internal$Style$Child,
													author$project$Internal$Style$dot(author$project$Internal$Style$classes.any),
													_List_fromArray(
														[
															A2(author$project$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									default:
										return A2(
											author$project$Internal$Style$Descriptor,
											author$project$Internal$Style$dot(author$project$Internal$Style$classes.behind),
											_List_fromArray(
												[
													A2(author$project$Internal$Style$Prop, 'position', 'absolute'),
													A2(author$project$Internal$Style$Prop, 'width', '100%'),
													A2(author$project$Internal$Style$Prop, 'height', '100%'),
													A2(author$project$Internal$Style$Prop, 'left', '0'),
													A2(author$project$Internal$Style$Prop, 'top', '0'),
													A2(author$project$Internal$Style$Prop, 'margin', '0 !important'),
													A2(author$project$Internal$Style$Prop, 'z-index', '0'),
													A2(author$project$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													author$project$Internal$Style$Child,
													'.se',
													_List_fromArray(
														[
															A2(author$project$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
								}
							})),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textThin),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'font-weight', '100')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textExtraLight),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'font-weight', '200')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textLight),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'font-weight', '300')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textNormalWeight),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'font-weight', '400')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textMedium),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'font-weight', '500')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textSemiBold),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'font-weight', '600')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.bold),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'font-weight', '700')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textExtraBold),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'font-weight', '800')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textHeavy),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'font-weight', '900')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.italic),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'font-style', 'italic')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.strike),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'text-decoration', 'line-through')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.underline),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'text-decoration', 'underline'),
								A2(author$project$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
								A2(author$project$Internal$Style$Prop, 'text-decoration-skip', 'ink')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textUnitalicized),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'font-style', 'normal')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textJustify),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'text-align', 'justify')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textJustifyAll),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'text-align', 'justify-all')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textCenter),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'text-align', 'center')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textRight),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'text-align', 'right')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						author$project$Internal$Style$dot(author$project$Internal$Style$classes.textLeft),
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'text-align', 'left')
							])),
						A2(
						author$project$Internal$Style$Descriptor,
						'.modal',
						_List_fromArray(
							[
								A2(author$project$Internal$Style$Prop, 'position', 'fixed'),
								A2(author$project$Internal$Style$Prop, 'left', '0'),
								A2(author$project$Internal$Style$Prop, 'top', '0'),
								A2(author$project$Internal$Style$Prop, 'width', '100%'),
								A2(author$project$Internal$Style$Prop, 'height', '100%'),
								A2(author$project$Internal$Style$Prop, 'pointer-events', 'none')
							]))
					]))
			])));
var elm$core$Basics$and = _Basics_and;
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Set$empty = elm$core$Set$Set_elm_builtin(elm$core$Dict$empty);
var author$project$Internal$Model$asElement = F4(
	function (embedMode, children, context, rendered) {
		var gatherKeyed = F2(
			function (_n10, _n11) {
				var key = _n10.a;
				var child = _n10.b;
				var htmls = _n11.a;
				var existingStyles = _n11.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, elm$core$Maybe$Nothing, context)),
								htmls),
							_Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return (A2(author$project$Internal$Flag$present, author$project$Internal$Flag$widthContent, rendered.has) && (A2(author$project$Internal$Flag$present, author$project$Internal$Flag$heightContent, rendered.has) && _Utils_eq(context, author$project$Internal$Model$asEl))) ? _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									elm$virtual_dom$VirtualDom$text(str)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									author$project$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _n8) {
				var htmls = _n8.a;
				var existingStyles = _n8.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								A2(styled.html, elm$core$Maybe$Nothing, context),
								htmls),
							_Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_eq(context, author$project$Internal$Model$asEl) ? _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								author$project$Internal$Model$textElementFill(str),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								author$project$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var _n0 = function () {
			if (children.$ === 'Keyed') {
				var keyedChildren = children.a;
				return A2(
					elm$core$Tuple$mapFirst,
					author$project$Internal$Model$Keyed,
					A3(
						elm$core$List$foldr,
						gatherKeyed,
						_Utils_Tuple2(_List_Nil, rendered.styles),
						keyedChildren));
			} else {
				var unkeyedChildren = children.a;
				return A2(
					elm$core$Tuple$mapFirst,
					author$project$Internal$Model$Unkeyed,
					A3(
						elm$core$List$foldr,
						gather,
						_Utils_Tuple2(_List_Nil, rendered.styles),
						unkeyedChildren));
			}
		}();
		var htmlChildren = _n0.a;
		var styleChildren = _n0.b;
		switch (embedMode.$) {
			case 'NoStyleSheet':
				var renderedChildren = function () {
					if (htmlChildren.$ === 'Keyed') {
						var keyed = htmlChildren.a;
						return author$project$Internal$Model$Keyed(
							_Utils_ap(
								keyed,
								A2(
									elm$core$List$map,
									function (x) {
										return _Utils_Tuple2('nearby-elements-pls', x);
									},
									rendered.children)));
					} else {
						var unkeyed = htmlChildren.a;
						return author$project$Internal$Model$Unkeyed(
							_Utils_ap(unkeyed, rendered.children));
					}
				}();
				if (!styleChildren.b) {
					return author$project$Internal$Model$Unstyled(
						A3(author$project$Internal$Model$renderNode, rendered, renderedChildren, elm$core$Maybe$Nothing));
				} else {
					return author$project$Internal$Model$Styled(
						{
							html: A2(author$project$Internal$Model$renderNode, rendered, renderedChildren),
							styles: styleChildren
						});
				}
			case 'StaticRootAndDynamic':
				var options = embedMode.a;
				var styles = A3(
					elm$core$List$foldl,
					author$project$Internal$Model$reduceStyles,
					_Utils_Tuple2(
						elm$core$Set$empty,
						_List_fromArray(
							[
								author$project$Internal$Model$renderFocusStyle(options.focus)
							])),
					styleChildren).b;
				var renderedChildren = function () {
					if (htmlChildren.$ === 'Keyed') {
						var keyed = htmlChildren.a;
						return author$project$Internal$Model$Keyed(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									'static-stylesheet',
									A3(
										elm$virtual_dom$VirtualDom$node,
										'style',
										_List_Nil,
										_List_fromArray(
											[
												elm$virtual_dom$VirtualDom$text(author$project$Internal$Style$rules)
											]))),
								A2(
									elm$core$List$cons,
									_Utils_Tuple2(
										'dynamic-stylesheet',
										A2(author$project$Internal$Model$toStyleSheet, options, styles)),
									_Utils_ap(
										keyed,
										A2(
											elm$core$List$map,
											function (x) {
												return _Utils_Tuple2('nearby-elements-pls', x);
											},
											rendered.children)))));
					} else {
						var unkeyed = htmlChildren.a;
						return author$project$Internal$Model$Unkeyed(
							A2(
								elm$core$List$cons,
								A3(
									elm$virtual_dom$VirtualDom$node,
									'style',
									_List_Nil,
									_List_fromArray(
										[
											elm$virtual_dom$VirtualDom$text(author$project$Internal$Style$rules)
										])),
								A2(
									elm$core$List$cons,
									A2(author$project$Internal$Model$toStyleSheet, options, styles),
									_Utils_ap(unkeyed, rendered.children))));
					}
				}();
				return author$project$Internal$Model$Unstyled(
					A3(author$project$Internal$Model$renderNode, rendered, renderedChildren, elm$core$Maybe$Nothing));
			default:
				var options = embedMode.a;
				var styles = A3(
					elm$core$List$foldl,
					author$project$Internal$Model$reduceStyles,
					_Utils_Tuple2(
						elm$core$Set$empty,
						_List_fromArray(
							[
								author$project$Internal$Model$renderFocusStyle(options.focus)
							])),
					styleChildren).b;
				var renderedChildren = function () {
					if (htmlChildren.$ === 'Keyed') {
						var keyed = htmlChildren.a;
						return author$project$Internal$Model$Keyed(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									'dynamic-stylesheet',
									A2(author$project$Internal$Model$toStyleSheet, options, styles)),
								_Utils_ap(
									keyed,
									A2(
										elm$core$List$map,
										function (x) {
											return _Utils_Tuple2('nearby-elements-pls', x);
										},
										rendered.children))));
					} else {
						var unkeyed = htmlChildren.a;
						return author$project$Internal$Model$Unkeyed(
							A2(
								elm$core$List$cons,
								A2(author$project$Internal$Model$toStyleSheet, options, styles),
								_Utils_ap(unkeyed, rendered.children)));
					}
				}();
				return author$project$Internal$Model$Unstyled(
					A3(author$project$Internal$Model$renderNode, rendered, renderedChildren, elm$core$Maybe$Nothing));
		}
	});
var author$project$Internal$Model$Attr = function (a) {
	return {$: 'Attr', a: a};
};
var author$project$Internal$Model$htmlClass = function (cls) {
	return author$project$Internal$Model$Attr(
		A2(
			elm$virtual_dom$VirtualDom$property,
			'className',
			elm$json$Json$Encode$string(cls)));
};
var author$project$Internal$Model$contextClasses = function (context) {
	switch (context.$) {
		case 'AsRow':
			return author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.any + (' ' + author$project$Internal$Style$classes.row));
		case 'AsColumn':
			return author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.any + (' ' + author$project$Internal$Style$classes.column));
		case 'AsEl':
			return author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.any + (' ' + author$project$Internal$Style$classes.single));
		case 'AsGrid':
			return author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.any + (' ' + author$project$Internal$Style$classes.grid));
		case 'AsParagraph':
			return author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.any + (' ' + author$project$Internal$Style$classes.paragraph));
		default:
			return author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.any + (' ' + author$project$Internal$Style$classes.page));
	}
};
var author$project$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 'Single', a: a, b: b, c: c};
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var author$project$Internal$Model$renderTransformationGroup = F2(
	function (maybePseudo, group) {
		var translate = A2(
			elm$core$Maybe$map,
			function (_n9) {
				var x = _n9.a;
				var y = _n9.b;
				var z = _n9.c;
				return 'translate3d(' + (elm$core$String$fromFloat(
					A2(elm$core$Maybe$withDefault, 0, x)) + ('px, ' + (elm$core$String$fromFloat(
					A2(elm$core$Maybe$withDefault, 0, y)) + ('px, ' + (elm$core$String$fromFloat(
					A2(elm$core$Maybe$withDefault, 0, z)) + 'px)')))));
			},
			group.translate);
		var scale = A2(
			elm$core$Maybe$map,
			function (_n8) {
				var x = _n8.a;
				var y = _n8.b;
				var z = _n8.c;
				return 'scale3d(' + (elm$core$String$fromFloat(x) + (', ' + (elm$core$String$fromFloat(y) + (', ' + (elm$core$String$fromFloat(z) + ')')))));
			},
			group.scale);
		var rotate = A2(
			elm$core$Maybe$map,
			function (_n7) {
				var x = _n7.a;
				var y = _n7.b;
				var z = _n7.c;
				var angle = _n7.d;
				return 'rotate3d(' + (elm$core$String$fromFloat(x) + (',' + (elm$core$String$fromFloat(y) + (',' + (elm$core$String$fromFloat(z) + (',' + (elm$core$String$fromFloat(angle) + 'rad)')))))));
			},
			group.rotate);
		var transformations = A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			_List_fromArray(
				[scale, translate, rotate]));
		var name = A2(
			elm$core$String$join,
			'-',
			A2(
				elm$core$List$filterMap,
				elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						elm$core$Maybe$map,
						function (_n4) {
							var x = _n4.a;
							var y = _n4.b;
							var z = _n4.c;
							return 'move-' + (author$project$Internal$Model$floatClass(
								A2(elm$core$Maybe$withDefault, 0, x)) + ('-' + (author$project$Internal$Model$floatClass(
								A2(elm$core$Maybe$withDefault, 0, y)) + ('-' + author$project$Internal$Model$floatClass(
								A2(elm$core$Maybe$withDefault, 0, z))))));
						},
						group.translate),
						A2(
						elm$core$Maybe$map,
						function (_n5) {
							var x = _n5.a;
							var y = _n5.b;
							var z = _n5.c;
							return 'scale' + (author$project$Internal$Model$floatClass(x) + ('-' + (author$project$Internal$Model$floatClass(y) + ('-' + author$project$Internal$Model$floatClass(z)))));
						},
						group.scale),
						A2(
						elm$core$Maybe$map,
						function (_n6) {
							var x = _n6.a;
							var y = _n6.b;
							var z = _n6.c;
							var angle = _n6.d;
							return 'rotate-' + (author$project$Internal$Model$floatClass(x) + ('-' + (author$project$Internal$Model$floatClass(y) + ('-' + (author$project$Internal$Model$floatClass(z) + ('-' + author$project$Internal$Model$floatClass(angle)))))));
						},
						group.rotate)
					])));
		if (!transformations.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var trans = transformations;
			var transforms = A2(elm$core$String$join, ' ', trans);
			var _n1 = function () {
				if (maybePseudo.$ === 'Nothing') {
					return _Utils_Tuple2('transform-' + name, '.transform-' + name);
				} else {
					var pseudo = maybePseudo.a;
					switch (pseudo.$) {
						case 'Hover':
							return _Utils_Tuple2('transform-' + (name + '-hover'), '.transform-' + (name + '-hover:hover'));
						case 'Focus':
							return _Utils_Tuple2('transform-' + (name + '-focus'), '.transform-' + (name + ('-focus:focus, .se:focus ~ .transform-' + (name + '-focus'))));
						default:
							return _Utils_Tuple2('transform-' + (name + '-active'), '.transform-' + (name + '-active:active'));
					}
				}
			}();
			var classOnElement = _n1.a;
			var classInStylesheet = _n1.b;
			return elm$core$Maybe$Just(
				_Utils_Tuple2(
					classOnElement,
					A3(author$project$Internal$Model$Single, classInStylesheet, 'transform', transforms)));
		}
	});
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Internal$Model$finalize = function (gathered) {
	var addTextShadows = function (_n11) {
		var classes = _n11.a;
		var styles = _n11.b;
		var _n9 = gathered.textShadows;
		if (_n9.$ === 'Nothing') {
			return _Utils_Tuple2(classes, styles);
		} else {
			var _n10 = _n9.a;
			var shadowClass = _n10.a;
			var shades = _n10.b;
			return _Utils_Tuple2(
				A2(elm$core$List$cons, shadowClass, classes),
				A2(
					elm$core$List$cons,
					A3(author$project$Internal$Model$Single, '.' + shadowClass, 'text-shadow', shades),
					styles));
		}
	};
	var addBoxShadows = function (_n8) {
		var classes = _n8.a;
		var styles = _n8.b;
		var _n6 = gathered.boxShadows;
		if (_n6.$ === 'Nothing') {
			return _Utils_Tuple2(classes, styles);
		} else {
			var _n7 = _n6.a;
			var shadowClass = _n7.a;
			var shades = _n7.b;
			return _Utils_Tuple2(
				A2(elm$core$List$cons, shadowClass, classes),
				A2(
					elm$core$List$cons,
					A3(author$project$Internal$Model$Single, '.' + shadowClass, 'box-shadow', shades),
					styles));
		}
	};
	var add = F2(
		function (_new, _n5) {
			var classes = _n5.a;
			var styles = _n5.b;
			if (_new.$ === 'Nothing') {
				return _Utils_Tuple2(classes, styles);
			} else {
				var _n4 = _new.a;
				var newClass = _n4.a;
				var newStyle = _n4.b;
				return _Utils_Tuple2(
					A2(elm$core$List$cons, newClass, classes),
					A2(elm$core$List$cons, newStyle, styles));
			}
		});
	var addTransform = function (_n2) {
		var classes = _n2.a;
		var styles = _n2.b;
		var _n1 = gathered.transform;
		if (_n1.$ === 'Nothing') {
			return _Utils_Tuple2(classes, styles);
		} else {
			var transform = _n1.a;
			return A2(
				add,
				A2(
					elm$core$Maybe$andThen,
					author$project$Internal$Model$renderTransformationGroup(
						elm$core$Maybe$Just(author$project$Internal$Model$Active)),
					transform.active),
				A2(
					add,
					A2(
						elm$core$Maybe$andThen,
						author$project$Internal$Model$renderTransformationGroup(
							elm$core$Maybe$Just(author$project$Internal$Model$Hover)),
						transform.hover),
					A2(
						add,
						A2(
							elm$core$Maybe$andThen,
							author$project$Internal$Model$renderTransformationGroup(
								elm$core$Maybe$Just(author$project$Internal$Model$Focus)),
							transform.focus),
						A2(
							add,
							A2(
								elm$core$Maybe$andThen,
								author$project$Internal$Model$renderTransformationGroup(elm$core$Maybe$Nothing),
								transform.normal),
							_Utils_Tuple2(classes, styles)))));
		}
	};
	var _n0 = addTransform(
		addTextShadows(
			addBoxShadows(
				_Utils_Tuple2(_List_Nil, gathered.styles))));
	var newClasses = _n0.a;
	var newStyles = _n0.b;
	return _Utils_update(
		gathered,
		{
			attributes: A2(
				elm$core$List$cons,
				author$project$Internal$Model$vDomClass(
					A2(elm$core$String$join, ' ', newClasses)),
				gathered.attributes),
			styles: newStyles
		});
};
var elm$core$Bitwise$or = _Bitwise_or;
var author$project$Internal$Flag$add = F2(
	function (_n0, _n1) {
		var flipTo = _n0.a;
		var truth = _n1.a;
		return author$project$Internal$Flag$Flag(flipTo | truth);
	});
var author$project$Internal$Flag$height = author$project$Internal$Flag$col(7);
var author$project$Internal$Flag$width = author$project$Internal$Flag$col(6);
var author$project$Internal$Flag$xAlign = author$project$Internal$Flag$col(30);
var author$project$Internal$Flag$yAlign = author$project$Internal$Flag$col(29);
var author$project$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 'Colored', a: a, b: b, c: c};
	});
var author$project$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 'FontFamily', a: a, b: b};
	});
var author$project$Internal$Model$FontSize = function (a) {
	return {$: 'FontSize', a: a};
};
var author$project$Internal$Model$GridPosition = function (a) {
	return {$: 'GridPosition', a: a};
};
var author$project$Internal$Model$GridTemplateStyle = function (a) {
	return {$: 'GridTemplateStyle', a: a};
};
var author$project$Internal$Model$PaddingStyle = F4(
	function (a, b, c, d) {
		return {$: 'PaddingStyle', a: a, b: b, c: c, d: d};
	});
var author$project$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 'PseudoSelector', a: a, b: b};
	});
var author$project$Internal$Model$Shadows = F2(
	function (a, b) {
		return {$: 'Shadows', a: a, b: b};
	});
var author$project$Internal$Model$SpacingStyle = F2(
	function (a, b) {
		return {$: 'SpacingStyle', a: a, b: b};
	});
var author$project$Internal$Model$Transform = function (a) {
	return {$: 'Transform', a: a};
};
var author$project$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 'Embedded', a: a, b: b};
	});
var author$project$Internal$Model$NodeName = function (a) {
	return {$: 'NodeName', a: a};
};
var author$project$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 'Generic':
				return author$project$Internal$Model$NodeName(newNode);
			case 'NodeName':
				var name = old.a;
				return A2(author$project$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2(author$project$Internal$Model$Embedded, x, y);
		}
	});
var author$project$Internal$Model$alignXName = function (align) {
	switch (align.$) {
		case 'Left':
			return 'aligned-horizontally ' + author$project$Internal$Style$classes.alignLeft;
		case 'Right':
			return 'aligned-horizontally ' + author$project$Internal$Style$classes.alignRight;
		default:
			return 'aligned-horizontally ' + author$project$Internal$Style$classes.alignCenterX;
	}
};
var author$project$Internal$Model$alignYName = function (align) {
	switch (align.$) {
		case 'Top':
			return 'aligned-vertically ' + author$project$Internal$Style$classes.alignTop;
		case 'Bottom':
			return 'aligned-vertically ' + author$project$Internal$Style$classes.alignBottom;
		default:
			return 'aligned-vertically ' + author$project$Internal$Style$classes.alignCenterY;
	}
};
var author$project$Internal$Model$formatColorClass = function (_n0) {
	var red = _n0.a;
	var green = _n0.b;
	var blue = _n0.c;
	var alpha = _n0.d;
	return author$project$Internal$Model$floatClass(red) + ('-' + (author$project$Internal$Model$floatClass(green) + ('-' + (author$project$Internal$Model$floatClass(blue) + ('-' + author$project$Internal$Model$floatClass(alpha))))));
};
var author$project$Internal$Model$boxShadowName = function (shadow) {
	return elm$core$String$concat(
		_List_fromArray(
			[
				shadow.inset ? 'box-inset' : 'box-',
				elm$core$String$fromFloat(shadow.offset.a) + 'px',
				elm$core$String$fromFloat(shadow.offset.b) + 'px',
				elm$core$String$fromFloat(shadow.blur) + 'px',
				elm$core$String$fromFloat(shadow.size) + 'px',
				author$project$Internal$Model$formatColorClass(shadow.color)
			]));
};
var author$project$Internal$Model$formatTextShadow = function (shadow) {
	return A2(
		elm$core$String$join,
		' ',
		_List_fromArray(
			[
				elm$core$String$fromFloat(shadow.offset.a) + 'px',
				elm$core$String$fromFloat(shadow.offset.b) + 'px',
				elm$core$String$fromFloat(shadow.blur) + 'px',
				author$project$Internal$Model$formatColor(shadow.color)
			]));
};
var author$project$Internal$Model$emptyTransformGroup = {rotate: elm$core$Maybe$Nothing, scale: elm$core$Maybe$Nothing, translate: elm$core$Maybe$Nothing};
var author$project$Internal$Model$emptyTransformationStates = {active: elm$core$Maybe$Nothing, focus: elm$core$Maybe$Nothing, hover: elm$core$Maybe$Nothing, normal: elm$core$Maybe$Nothing};
var author$project$Internal$Model$Rotation = F4(
	function (a, b, c, d) {
		return {$: 'Rotation', a: a, b: b, c: c, d: d};
	});
var author$project$Internal$Model$addIfNothing = F2(
	function (val, existing) {
		if (existing.$ === 'Nothing') {
			return val;
		} else {
			var x = existing;
			return x;
		}
	});
var author$project$Internal$Model$stackTransforms = F2(
	function (transform, group) {
		switch (transform.$) {
			case 'Move':
				var mx = transform.a;
				var my = transform.b;
				var mz = transform.c;
				var _n1 = group.translate;
				if (_n1.$ === 'Nothing') {
					return _Utils_update(
						group,
						{
							translate: elm$core$Maybe$Just(
								_Utils_Tuple3(mx, my, mz))
						});
				} else {
					var _n2 = _n1.a;
					var existingX = _n2.a;
					var existingY = _n2.b;
					var existingZ = _n2.c;
					return _Utils_update(
						group,
						{
							translate: elm$core$Maybe$Just(
								_Utils_Tuple3(
									A2(author$project$Internal$Model$addIfNothing, mx, existingX),
									A2(author$project$Internal$Model$addIfNothing, my, existingY),
									A2(author$project$Internal$Model$addIfNothing, mz, existingZ)))
						});
				}
			case 'Rotate':
				var x = transform.a;
				var y = transform.b;
				var z = transform.c;
				var angle = transform.d;
				return _Utils_update(
					group,
					{
						rotate: A2(
							author$project$Internal$Model$addIfNothing,
							elm$core$Maybe$Just(
								A4(author$project$Internal$Model$Rotation, x, y, z, angle)),
							group.rotate)
					});
			default:
				var x = transform.a;
				var y = transform.b;
				var z = transform.c;
				return _Utils_update(
					group,
					{
						scale: A2(
							author$project$Internal$Model$addIfNothing,
							elm$core$Maybe$Just(
								_Utils_Tuple3(x, y, z)),
							group.scale)
					});
		}
	});
var author$project$Internal$Model$stackOn = F3(
	function (maybePseudo, transform, gathered) {
		var states = A2(elm$core$Maybe$withDefault, author$project$Internal$Model$emptyTransformationStates, gathered.transform);
		if (maybePseudo.$ === 'Nothing') {
			var normal = states.normal;
			return _Utils_update(
				gathered,
				{
					transform: elm$core$Maybe$Just(
						_Utils_update(
							states,
							{
								normal: elm$core$Maybe$Just(
									A2(
										author$project$Internal$Model$stackTransforms,
										transform,
										A2(elm$core$Maybe$withDefault, author$project$Internal$Model$emptyTransformGroup, normal)))
							}))
				});
		} else {
			switch (maybePseudo.a.$) {
				case 'Hover':
					var _n1 = maybePseudo.a;
					var hover = states.hover;
					return _Utils_update(
						gathered,
						{
							transform: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										hover: elm$core$Maybe$Just(
											A2(
												author$project$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, author$project$Internal$Model$emptyTransformGroup, hover)))
									}))
						});
				case 'Active':
					var _n2 = maybePseudo.a;
					var active = states.active;
					return _Utils_update(
						gathered,
						{
							transform: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										active: elm$core$Maybe$Just(
											A2(
												author$project$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, author$project$Internal$Model$emptyTransformGroup, active)))
									}))
						});
				default:
					var _n3 = maybePseudo.a;
					var focus = states.focus;
					return _Utils_update(
						gathered,
						{
							transform: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										focus: elm$core$Maybe$Just(
											A2(
												author$project$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, author$project$Internal$Model$emptyTransformGroup, focus)))
									}))
						});
			}
		}
	});
var author$project$Internal$Model$textShadowName = function (shadow) {
	return elm$core$String$concat(
		_List_fromArray(
			[
				'txt',
				elm$core$String$fromFloat(shadow.offset.a) + 'px',
				elm$core$String$fromFloat(shadow.offset.b) + 'px',
				elm$core$String$fromFloat(shadow.blur) + 'px',
				author$project$Internal$Model$formatColor(shadow.color)
			]));
};
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$Basics$not = _Basics_not;
var elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _n0) {
				var trues = _n0.a;
				var falses = _n0.b;
				return pred(x) ? _Utils_Tuple2(
					A2(elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2(elm$core$List$cons, x, falses));
			});
		return A3(
			elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var author$project$Internal$Model$gatherAttributes = F2(
	function (attr, gathered) {
		var styleName = function (name) {
			return '.' + name;
		};
		var formatStyleClass = function (styleType) {
			switch (styleType.$) {
				case 'Transform':
					var x = styleType.a;
					return author$project$Internal$Model$Transform(x);
				case 'Shadows':
					var x = styleType.a;
					var y = styleType.b;
					return A2(author$project$Internal$Model$Shadows, x, y);
				case 'PseudoSelector':
					var selector = styleType.a;
					var style = styleType.b;
					return A2(
						author$project$Internal$Model$PseudoSelector,
						selector,
						A2(elm$core$List$map, formatStyleClass, style));
				case 'Style':
					var cls = styleType.a;
					var props = styleType.b;
					return A2(
						author$project$Internal$Model$Style,
						styleName(cls),
						props);
				case 'Single':
					var cls = styleType.a;
					var name = styleType.b;
					var val = styleType.c;
					return A3(
						author$project$Internal$Model$Single,
						styleName(cls),
						name,
						val);
				case 'Colored':
					var cls = styleType.a;
					var name = styleType.b;
					var val = styleType.c;
					return A3(
						author$project$Internal$Model$Colored,
						styleName(cls),
						name,
						val);
				case 'SpacingStyle':
					var x = styleType.a;
					var y = styleType.b;
					return A2(author$project$Internal$Model$SpacingStyle, x, y);
				case 'PaddingStyle':
					var top = styleType.a;
					var right = styleType.b;
					var bottom = styleType.c;
					var left = styleType.d;
					return A4(author$project$Internal$Model$PaddingStyle, top, right, bottom, left);
				case 'GridTemplateStyle':
					var grid = styleType.a;
					return author$project$Internal$Model$GridTemplateStyle(grid);
				case 'GridPosition':
					var pos = styleType.a;
					return author$project$Internal$Model$GridPosition(pos);
				case 'FontFamily':
					var name = styleType.a;
					var fam = styleType.b;
					return A2(author$project$Internal$Model$FontFamily, name, fam);
				case 'FontSize':
					var i = styleType.a;
					return author$project$Internal$Model$FontSize(i);
				default:
					var name = styleType.a;
					var o = styleType.b;
					return A2(author$project$Internal$Model$Transparency, name, o);
			}
		};
		var classNameAttr = function (name) {
			return A2(
				elm$virtual_dom$VirtualDom$property,
				'className',
				elm$json$Json$Encode$string(name));
		};
		switch (attr.$) {
			case 'NoAttribute':
				return gathered;
			case 'Class':
				var flag = attr.a;
				var exactClassName = attr.b;
				return A2(author$project$Internal$Flag$present, flag, gathered.has) ? gathered : _Utils_update(
					gathered,
					{
						attributes: A2(
							elm$core$List$cons,
							classNameAttr(exactClassName),
							gathered.attributes),
						has: A2(author$project$Internal$Flag$add, flag, gathered.has)
					});
			case 'Attr':
				var attribute = attr.a;
				return _Utils_update(
					gathered,
					{
						attributes: A2(elm$core$List$cons, attribute, gathered.attributes)
					});
			case 'StyleClass':
				var flag = attr.a;
				var style = attr.b;
				var addNormalStyle = F2(
					function (styleProp, gatheredProps) {
						return A2(author$project$Internal$Flag$present, flag, gatheredProps.has) ? gatheredProps : _Utils_update(
							gatheredProps,
							{
								attributes: function () {
									if (styleProp.$ === 'PseudoSelector') {
										return A2(
											elm$core$List$cons,
											A2(
												elm$virtual_dom$VirtualDom$property,
												'className',
												elm$json$Json$Encode$string(author$project$Internal$Style$classes.transition)),
											A2(
												elm$core$List$cons,
												classNameAttr(
													author$project$Internal$Model$getStyleName(styleProp)),
												gatheredProps.attributes));
									} else {
										return A2(
											elm$core$List$cons,
											classNameAttr(
												author$project$Internal$Model$getStyleName(styleProp)),
											gatheredProps.attributes);
									}
								}(),
								has: A2(author$project$Internal$Flag$add, flag, gatheredProps.has),
								styles: A2(
									elm$core$List$cons,
									formatStyleClass(styleProp),
									gatheredProps.styles)
							});
					});
				switch (style.$) {
					case 'Transform':
						var transformation = style.a;
						return A3(author$project$Internal$Model$stackOn, elm$core$Maybe$Nothing, transformation, gathered);
					case 'PseudoSelector':
						var pseudo = style.a;
						var props = style.b;
						var forTransforms = function (attribute) {
							if (attribute.$ === 'Transform') {
								var x = attribute.a;
								return elm$core$Maybe$Just(x);
							} else {
								return elm$core$Maybe$Nothing;
							}
						};
						var _n3 = A2(
							elm$core$List$partition,
							function (x) {
								return !_Utils_eq(
									forTransforms(x),
									elm$core$Maybe$Nothing);
							},
							props);
						var transformationProps = _n3.a;
						var otherProps = _n3.b;
						var withTransforms = A3(
							elm$core$List$foldr,
							author$project$Internal$Model$stackOn(
								elm$core$Maybe$Just(pseudo)),
							gathered,
							A2(elm$core$List$filterMap, forTransforms, transformationProps));
						return A2(
							addNormalStyle,
							A2(author$project$Internal$Model$PseudoSelector, pseudo, otherProps),
							withTransforms);
					default:
						return A2(addNormalStyle, style, gathered);
				}
			case 'Width':
				var width = attr.a;
				if (!A2(author$project$Internal$Flag$present, author$project$Internal$Flag$width, gathered.has)) {
					var widthHelper = F2(
						function (w, gath) {
							switch (w.$) {
								case 'Px':
									var px = w.a;
									return _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(
													author$project$Internal$Style$classes.widthExact + (' width-px-' + elm$core$String$fromInt(px))),
												gath.attributes),
											styles: A2(
												elm$core$List$cons,
												A3(
													author$project$Internal$Model$Single,
													styleName(
														'width-px-' + elm$core$String$fromInt(px)),
													'width',
													elm$core$String$fromInt(px) + 'px'),
												gath.styles)
										});
								case 'Content':
									return _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(author$project$Internal$Style$classes.widthContent),
												gath.attributes),
											has: A2(author$project$Internal$Flag$add, author$project$Internal$Flag$widthContent, gathered.has)
										});
								case 'Fill':
									var portion = w.a;
									return (portion === 1) ? _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(author$project$Internal$Style$classes.widthFill),
												gath.attributes),
											has: A2(author$project$Internal$Flag$add, author$project$Internal$Flag$widthFill, gathered.has)
										}) : _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(
													author$project$Internal$Style$classes.widthFillPortion + (' width-fill-' + elm$core$String$fromInt(portion))),
												gath.attributes),
											has: A2(author$project$Internal$Flag$add, author$project$Internal$Flag$widthFill, gathered.has),
											styles: A2(
												elm$core$List$cons,
												A3(
													author$project$Internal$Model$Single,
													'.' + (author$project$Internal$Style$classes.any + ('.' + (author$project$Internal$Style$classes.row + (' > ' + styleName(
														'width-fill-' + elm$core$String$fromInt(portion)))))),
													'flex-grow',
													elm$core$String$fromInt(portion * 100000)),
												gath.styles)
										});
								case 'Min':
									var minSize = w.a;
									var len = w.b;
									var _n7 = _Utils_Tuple2(
										'min-width-' + elm$core$String$fromInt(minSize),
										A3(
											author$project$Internal$Model$Single,
											'.min-width-' + elm$core$String$fromInt(minSize),
											'min-width',
											elm$core$String$fromInt(minSize) + 'px'));
									var cls = _n7.a;
									var style = _n7.b;
									var newGathered = _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(cls),
												gath.attributes),
											styles: A2(elm$core$List$cons, style, gath.styles)
										});
									return A2(widthHelper, len, newGathered);
								default:
									var maxSize = w.a;
									var len = w.b;
									var _n8 = _Utils_Tuple2(
										'max-width-' + elm$core$String$fromInt(maxSize),
										A3(
											author$project$Internal$Model$Single,
											'.max-width-' + elm$core$String$fromInt(maxSize),
											'max-width',
											elm$core$String$fromInt(maxSize) + 'px'));
									var cls = _n8.a;
									var style = _n8.b;
									var newGathered = _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(cls),
												gath.attributes),
											styles: A2(elm$core$List$cons, style, gath.styles)
										});
									return A2(widthHelper, len, newGathered);
							}
						});
					return A2(
						widthHelper,
						width,
						_Utils_update(
							gathered,
							{
								has: A2(author$project$Internal$Flag$add, author$project$Internal$Flag$width, gathered.has)
							}));
				} else {
					return gathered;
				}
			case 'Height':
				var height = attr.a;
				if (!A2(author$project$Internal$Flag$present, author$project$Internal$Flag$height, gathered.has)) {
					var heightHelper = F2(
						function (h, gath) {
							switch (h.$) {
								case 'Px':
									var px = h.a;
									return _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(
													'height-px-' + elm$core$String$fromInt(px)),
												gath.attributes),
											styles: A2(
												elm$core$List$cons,
												A3(
													author$project$Internal$Model$Single,
													styleName(
														'height-px-' + elm$core$String$fromInt(px)),
													'height',
													elm$core$String$fromInt(px) + 'px'),
												gath.styles)
										});
								case 'Content':
									return _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(author$project$Internal$Style$classes.heightContent),
												gath.attributes),
											has: A2(author$project$Internal$Flag$add, author$project$Internal$Flag$heightContent, gathered.has)
										});
								case 'Fill':
									var portion = h.a;
									return (portion === 1) ? _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(author$project$Internal$Style$classes.heightFill),
												gath.attributes),
											has: A2(author$project$Internal$Flag$add, author$project$Internal$Flag$heightFill, gathered.has)
										}) : _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(
													author$project$Internal$Style$classes.heightFillPortion + (' height-fill-' + elm$core$String$fromInt(portion))),
												gath.attributes),
											has: A2(author$project$Internal$Flag$add, author$project$Internal$Flag$heightFill, gathered.has),
											styles: A2(
												elm$core$List$cons,
												A3(
													author$project$Internal$Model$Single,
													'.' + (author$project$Internal$Style$classes.any + ('.' + (author$project$Internal$Style$classes.column + (' > ' + styleName(
														'height-fill-' + elm$core$String$fromInt(portion)))))),
													'flex-grow',
													elm$core$String$fromInt(portion * 100000)),
												gath.styles)
										});
								case 'Min':
									var minSize = h.a;
									var len = h.b;
									var _n10 = _Utils_Tuple2(
										'min-height-' + elm$core$String$fromInt(minSize),
										A3(
											author$project$Internal$Model$Single,
											'.min-height-' + elm$core$String$fromInt(minSize),
											'min-height',
											elm$core$String$fromInt(minSize) + 'px'));
									var cls = _n10.a;
									var style = _n10.b;
									var newGathered = _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(cls),
												gath.attributes),
											styles: A2(elm$core$List$cons, style, gath.styles)
										});
									return A2(heightHelper, len, newGathered);
								default:
									var maxSize = h.a;
									var len = h.b;
									var _n11 = _Utils_Tuple2(
										'max-height-' + elm$core$String$fromInt(maxSize),
										A3(
											author$project$Internal$Model$Single,
											'.max-height-' + elm$core$String$fromInt(maxSize),
											'max-height',
											elm$core$String$fromInt(maxSize) + 'px'));
									var cls = _n11.a;
									var style = _n11.b;
									var newGathered = _Utils_update(
										gath,
										{
											attributes: A2(
												elm$core$List$cons,
												classNameAttr(cls),
												gath.attributes),
											styles: A2(elm$core$List$cons, style, gath.styles)
										});
									return A2(heightHelper, len, newGathered);
							}
						});
					return A2(
						heightHelper,
						height,
						_Utils_update(
							gathered,
							{
								has: A2(author$project$Internal$Flag$add, author$project$Internal$Flag$height, gathered.has)
							}));
				} else {
					return gathered;
				}
			case 'Describe':
				var description = attr.a;
				switch (description.$) {
					case 'Main':
						return _Utils_update(
							gathered,
							{
								node: A2(author$project$Internal$Model$addNodeName, 'main', gathered.node)
							});
					case 'Navigation':
						return _Utils_update(
							gathered,
							{
								node: A2(author$project$Internal$Model$addNodeName, 'nav', gathered.node)
							});
					case 'ContentInfo':
						return _Utils_update(
							gathered,
							{
								node: A2(author$project$Internal$Model$addNodeName, 'footer', gathered.node)
							});
					case 'Complementary':
						return _Utils_update(
							gathered,
							{
								node: A2(author$project$Internal$Model$addNodeName, 'aside', gathered.node)
							});
					case 'Heading':
						var i = description.a;
						return (i <= 1) ? _Utils_update(
							gathered,
							{
								node: A2(author$project$Internal$Model$addNodeName, 'h1', gathered.node)
							}) : ((i < 7) ? _Utils_update(
							gathered,
							{
								node: A2(
									author$project$Internal$Model$addNodeName,
									'h' + elm$core$String$fromInt(i),
									gathered.node)
							}) : _Utils_update(
							gathered,
							{
								node: A2(author$project$Internal$Model$addNodeName, 'h6', gathered.node)
							}));
					case 'Button':
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									gathered.attributes)
							});
					case 'Label':
						var label = description.a;
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									gathered.attributes)
							});
					case 'LivePolite':
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									gathered.attributes)
							});
					default:
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									gathered.attributes)
							});
				}
			case 'Nearby':
				var location = attr.a;
				var elem = attr.b;
				var styles = function () {
					switch (elem.$) {
						case 'Empty':
							return elm$core$Maybe$Nothing;
						case 'Text':
							var str = elem.a;
							return elm$core$Maybe$Nothing;
						case 'Unstyled':
							var html = elem.a;
							return elm$core$Maybe$Nothing;
						default:
							var styled = elem.a;
							return elm$core$Maybe$Just(
								_Utils_ap(gathered.styles, styled.styles));
					}
				}();
				var nearbyElement = A3(
					elm$virtual_dom$VirtualDom$node,
					'div',
					_List_fromArray(
						[
							author$project$Internal$Model$vDomClass(
							function () {
								switch (location.$) {
									case 'Above':
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.single, author$project$Internal$Style$classes.above]));
									case 'Below':
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.single, author$project$Internal$Style$classes.below]));
									case 'OnRight':
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.single, author$project$Internal$Style$classes.onRight]));
									case 'OnLeft':
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.single, author$project$Internal$Style$classes.onLeft]));
									case 'InFront':
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.single, author$project$Internal$Style$classes.inFront]));
									default:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.single, author$project$Internal$Style$classes.behind]));
								}
							}())
						]),
					_List_fromArray(
						[
							function () {
							switch (elem.$) {
								case 'Empty':
									return elm$virtual_dom$VirtualDom$text('');
								case 'Text':
									var str = elem.a;
									return author$project$Internal$Model$textElement(str);
								case 'Unstyled':
									var html = elem.a;
									return html(author$project$Internal$Model$asEl);
								default:
									var styled = elem.a;
									return A2(styled.html, elm$core$Maybe$Nothing, author$project$Internal$Model$asEl);
							}
						}()
						]));
				return _Utils_update(
					gathered,
					{
						children: A2(elm$core$List$cons, nearbyElement, gathered.children),
						styles: function () {
							if (styles.$ === 'Nothing') {
								return gathered.styles;
							} else {
								var newStyles = styles.a;
								return newStyles;
							}
						}()
					});
			case 'AlignX':
				var x = attr.a;
				return (!A2(author$project$Internal$Flag$present, author$project$Internal$Flag$xAlign, gathered.has)) ? _Utils_update(
					gathered,
					{
						attributes: A2(
							elm$core$List$cons,
							classNameAttr(
								author$project$Internal$Model$alignXName(x)),
							gathered.attributes),
						has: function (flags) {
							switch (x.$) {
								case 'CenterX':
									return A2(author$project$Internal$Flag$add, author$project$Internal$Flag$centerX, flags);
								case 'Right':
									return A2(author$project$Internal$Flag$add, author$project$Internal$Flag$alignRight, flags);
								default:
									return flags;
							}
						}(
							A2(author$project$Internal$Flag$add, author$project$Internal$Flag$xAlign, gathered.has))
					}) : gathered;
			case 'AlignY':
				var y = attr.a;
				return (!A2(author$project$Internal$Flag$present, author$project$Internal$Flag$yAlign, gathered.has)) ? _Utils_update(
					gathered,
					{
						attributes: A2(
							elm$core$List$cons,
							classNameAttr(
								author$project$Internal$Model$alignYName(y)),
							gathered.attributes),
						has: function (flags) {
							switch (y.$) {
								case 'CenterY':
									return A2(author$project$Internal$Flag$add, author$project$Internal$Flag$centerY, flags);
								case 'Bottom':
									return A2(author$project$Internal$Flag$add, author$project$Internal$Flag$alignBottom, flags);
								default:
									return flags;
							}
						}(
							A2(author$project$Internal$Flag$add, author$project$Internal$Flag$yAlign, gathered.has))
					}) : gathered;
			case 'BoxShadow':
				var shadow = attr.a;
				var _n19 = gathered.boxShadows;
				if (_n19.$ === 'Nothing') {
					return _Utils_update(
						gathered,
						{
							boxShadows: elm$core$Maybe$Just(
								_Utils_Tuple2(
									author$project$Internal$Model$boxShadowName(shadow),
									author$project$Internal$Model$formatBoxShadow(shadow)))
						});
				} else {
					var _n20 = _n19.a;
					var existingClass = _n20.a;
					var existing = _n20.b;
					return _Utils_update(
						gathered,
						{
							boxShadows: elm$core$Maybe$Just(
								_Utils_Tuple2(
									author$project$Internal$Model$boxShadowName(shadow) + ('-' + existingClass),
									author$project$Internal$Model$formatBoxShadow(shadow) + (', ' + existing)))
						});
				}
			default:
				var shadow = attr.a;
				var _n21 = gathered.textShadows;
				if (_n21.$ === 'Nothing') {
					return _Utils_update(
						gathered,
						{
							textShadows: elm$core$Maybe$Just(
								_Utils_Tuple2(
									author$project$Internal$Model$textShadowName(shadow),
									author$project$Internal$Model$formatTextShadow(shadow)))
						});
				} else {
					var _n22 = _n21.a;
					var existingClass = _n22.a;
					var existing = _n22.b;
					return _Utils_update(
						gathered,
						{
							textShadows: elm$core$Maybe$Just(
								_Utils_Tuple2(
									author$project$Internal$Model$textShadowName(shadow) + ('-' + existingClass),
									author$project$Internal$Model$formatTextShadow(shadow) + (', ' + existing)))
						});
				}
		}
	});
var author$project$Internal$Flag$none = author$project$Internal$Flag$Flag(0);
var author$project$Internal$Model$Generic = {$: 'Generic'};
var author$project$Internal$Model$initGathered = function (maybeNodeName) {
	return {
		attributes: _List_Nil,
		boxShadows: elm$core$Maybe$Nothing,
		children: _List_Nil,
		has: author$project$Internal$Flag$none,
		node: function () {
			if (maybeNodeName.$ === 'Nothing') {
				return author$project$Internal$Model$Generic;
			} else {
				var name = maybeNodeName.a;
				return author$project$Internal$Model$NodeName(name);
			}
		}(),
		styles: _List_Nil,
		textShadows: elm$core$Maybe$Nothing,
		transform: elm$core$Maybe$Nothing
	};
};
var author$project$Internal$Model$element = F5(
	function (embedMode, context, node, attributes, children) {
		return A4(
			author$project$Internal$Model$asElement,
			embedMode,
			children,
			context,
			author$project$Internal$Model$finalize(
				A3(
					elm$core$List$foldr,
					author$project$Internal$Model$gatherAttributes,
					author$project$Internal$Model$initGathered(node),
					A2(
						elm$core$List$cons,
						author$project$Internal$Model$contextClasses(context),
						attributes))));
	});
var author$project$Internal$Model$NoStyleSheet = {$: 'NoStyleSheet'};
var author$project$Internal$Model$noStyleSheet = author$project$Internal$Model$NoStyleSheet;
var author$project$Element$column = F2(
	function (attrs, children) {
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asColumn,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentTop),
				A2(
					elm$core$List$cons,
					author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentLeft),
					A2(
						elm$core$List$cons,
						author$project$Element$height(author$project$Element$fill),
						A2(
							elm$core$List$cons,
							author$project$Element$width(author$project$Element$fill),
							attrs)))),
			author$project$Internal$Model$Unkeyed(children));
	});
var author$project$Internal$Model$Content = {$: 'Content'};
var author$project$Element$shrink = author$project$Internal$Model$Content;
var author$project$Element$el = F2(
	function (attrs, child) {
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				author$project$Element$width(author$project$Element$shrink),
				A2(
					elm$core$List$cons,
					author$project$Element$height(author$project$Element$shrink),
					attrs)),
			author$project$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var author$project$Internal$Flag$overflow = author$project$Internal$Flag$col(20);
var author$project$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var author$project$Element$clip = A2(author$project$Internal$Model$Class, author$project$Internal$Flag$overflow, author$project$Internal$Style$classes.clip);
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$alt = elm$html$Html$Attributes$stringProperty('alt');
var elm$html$Html$Attributes$src = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var author$project$Element$image = F2(
	function (attrs, _n0) {
		var src = _n0.src;
		var description = _n0.description;
		var imageAttributes = A2(
			elm$core$List$filter,
			function (a) {
				switch (a.$) {
					case 'Width':
						return true;
					case 'Height':
						return true;
					default:
						return false;
				}
			},
			attrs);
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(elm$core$List$cons, author$project$Element$clip, attrs),
			author$project$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A5(
						author$project$Internal$Model$element,
						author$project$Internal$Model$noStyleSheet,
						author$project$Internal$Model$asEl,
						elm$core$Maybe$Just('img'),
						_Utils_ap(
							imageAttributes,
							_List_fromArray(
								[
									author$project$Internal$Model$Attr(
									elm$html$Html$Attributes$src(src)),
									author$project$Internal$Model$Attr(
									elm$html$Html$Attributes$alt(description))
								])),
						author$project$Internal$Model$Unkeyed(_List_Nil))
					])));
	});
var author$project$Internal$Model$InFront = {$: 'InFront'};
var author$project$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 'Nearby', a: a, b: b};
	});
var author$project$Element$inFront = function (element) {
	return A2(author$project$Internal$Model$Nearby, author$project$Internal$Model$InFront, element);
};
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var author$project$Element$link = F2(
	function (attrs, _n0) {
		var url = _n0.url;
		var label = _n0.label;
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asEl,
			elm$core$Maybe$Just('a'),
			A2(
				elm$core$List$cons,
				author$project$Internal$Model$Attr(
					elm$html$Html$Attributes$href(url)),
				A2(
					elm$core$List$cons,
					author$project$Internal$Model$Attr(
						elm$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						elm$core$List$cons,
						author$project$Element$width(author$project$Element$shrink),
						A2(
							elm$core$List$cons,
							author$project$Element$height(author$project$Element$shrink),
							A2(
								elm$core$List$cons,
								author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentCenterX),
								A2(
									elm$core$List$cons,
									author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentCenterY),
									attrs)))))),
			author$project$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var author$project$Internal$Flag$moveX = author$project$Internal$Flag$col(25);
var author$project$Internal$Model$Move = F3(
	function (a, b, c) {
		return {$: 'Move', a: a, b: b, c: c};
	});
var author$project$Element$moveLeft = function (x) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$moveX,
		author$project$Internal$Model$Transform(
			A3(
				author$project$Internal$Model$Move,
				elm$core$Maybe$Just(-x),
				elm$core$Maybe$Nothing,
				elm$core$Maybe$Nothing)));
};
var author$project$Internal$Model$Empty = {$: 'Empty'};
var author$project$Element$none = author$project$Internal$Model$Empty;
var author$project$Internal$Flag$spacing = author$project$Internal$Flag$col(3);
var author$project$Element$spacing = function (x) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$spacing,
		A2(author$project$Internal$Model$SpacingStyle, x, x));
};
var author$project$Internal$Model$AsParagraph = {$: 'AsParagraph'};
var author$project$Internal$Model$asParagraph = author$project$Internal$Model$AsParagraph;
var author$project$Element$paragraph = F2(
	function (attrs, children) {
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asParagraph,
			elm$core$Maybe$Just('p'),
			A2(
				elm$core$List$cons,
				author$project$Element$width(author$project$Element$fill),
				A2(
					elm$core$List$cons,
					author$project$Element$spacing(5),
					attrs)),
			author$project$Internal$Model$Unkeyed(children));
	});
var author$project$Internal$Model$Px = function (a) {
	return {$: 'Px', a: a};
};
var author$project$Element$px = author$project$Internal$Model$Px;
var author$project$Element$rgb = F3(
	function (r, g, b) {
		return A4(author$project$Internal$Model$Rgba, r, g, b, 1);
	});
var author$project$Internal$Model$Text = function (a) {
	return {$: 'Text', a: a};
};
var author$project$Element$text = function (content) {
	return author$project$Internal$Model$Text(content);
};
var author$project$Internal$Flag$fontWeight = author$project$Internal$Flag$col(13);
var author$project$Element$Font$bold = A2(author$project$Internal$Model$Class, author$project$Internal$Flag$fontWeight, author$project$Internal$Style$classes.bold);
var author$project$Internal$Flag$fontColor = author$project$Internal$Flag$col(14);
var author$project$Element$Font$color = function (fontColor) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$fontColor,
		A3(
			author$project$Internal$Model$Colored,
			'fc-' + author$project$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var author$project$Internal$Flag$fontSize = author$project$Internal$Flag$col(4);
var author$project$Element$Font$size = function (i) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$fontSize,
		author$project$Internal$Model$FontSize(i));
};
var author$project$Framework$Logo$ElmColor = function (a) {
	return {$: 'ElmColor', a: a};
};
var author$project$Framework$Logo$LogoElm = function (a) {
	return {$: 'LogoElm', a: a};
};
var author$project$Framework$Logo$White = {$: 'White'};
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var author$project$Internal$Model$unstyled = function ($) {
	return author$project$Internal$Model$Unstyled(
		elm$core$Basics$always($));
};
var author$project$Element$html = author$project$Internal$Model$unstyled;
var author$project$Framework$Logo$Blue = {$: 'Blue'};
var author$project$Framework$Logo$Green = {$: 'Green'};
var author$project$Framework$Logo$LightBlue = {$: 'LightBlue'};
var author$project$Framework$Logo$Orange = {$: 'Orange'};
var author$project$Framework$Logo$cssRgb = function (color) {
	switch (color.$) {
		case 'Orange':
			return '#f0ad00';
		case 'Green':
			return '#7fd13b';
		case 'LightBlue':
			return '#60b5cc';
		case 'Blue':
			return '#5a6378';
		case 'White':
			return '#fff';
		default:
			return '#000';
	}
};
var author$project$Framework$Logo$ratio = 1;
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$path = elm$svg$Svg$trustedNode('path');
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$version = _VirtualDom_attribute('version');
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var author$project$Framework$Logo$elmLogo = F2(
	function (type_, height) {
		var p = elm$svg$Svg$path;
		var f = elm$svg$Svg$Attributes$fill;
		var d = elm$svg$Svg$Attributes$d;
		var c = function () {
			if (type_.$ === 'ElmColorful') {
				return {
					c1: author$project$Framework$Logo$cssRgb(author$project$Framework$Logo$Orange),
					c2: author$project$Framework$Logo$cssRgb(author$project$Framework$Logo$Green),
					c3: author$project$Framework$Logo$cssRgb(author$project$Framework$Logo$LightBlue),
					c4: author$project$Framework$Logo$cssRgb(author$project$Framework$Logo$Blue)
				};
			} else {
				var cl = type_.a;
				return {
					c1: author$project$Framework$Logo$cssRgb(cl),
					c2: author$project$Framework$Logo$cssRgb(cl),
					c3: author$project$Framework$Logo$cssRgb(cl),
					c4: author$project$Framework$Logo$cssRgb(cl)
				};
			}
		}();
		return A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$version('1'),
					elm$svg$Svg$Attributes$viewBox('0 0 323 323'),
					elm$svg$Svg$Attributes$height(
					elm$core$String$fromInt(height)),
					elm$svg$Svg$Attributes$width(
					elm$core$String$fromInt(
						elm$core$Basics$floor(height * author$project$Framework$Logo$ratio)))
				]),
			_List_fromArray(
				[
					A2(
					p,
					_List_fromArray(
						[
							f(c.c1),
							d('M162 153l70-70H92zm94 94l67 67V179z')
						]),
					_List_Nil),
					A2(
					p,
					_List_fromArray(
						[
							f(c.c2),
							d('M9 0l70 70h153L162 0zm238 85l77 76-77 77-76-77z')
						]),
					_List_Nil),
					A2(
					p,
					_List_fromArray(
						[
							f(c.c3),
							d('M323 144V0H180zm-161 27L9 323h305z')
						]),
					_List_Nil),
					A2(
					p,
					_List_fromArray(
						[
							f(c.c4),
							d('M153 162L0 9v305z')
						]),
					_List_Nil)
				]));
	});
var elm$svg$Svg$circle = elm$svg$Svg$trustedNode('circle');
var elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var author$project$Framework$Logo$logoLucamug = function (height) {
	return A2(
		elm$svg$Svg$svg,
		_List_fromArray(
			[
				elm$svg$Svg$Attributes$viewBox('0 0 100 100'),
				elm$svg$Svg$Attributes$height(
				elm$core$String$fromInt(height)),
				elm$svg$Svg$Attributes$width(
				elm$core$String$fromInt(
					elm$core$Basics$floor(height * 1)))
			]),
		_List_fromArray(
			[
				A2(
				elm$svg$Svg$path,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$fill('none'),
						elm$svg$Svg$Attributes$d('M0 0h100v100H0z')
					]),
				_List_Nil),
				A2(
				elm$svg$Svg$circle,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$cx('50'),
						elm$svg$Svg$Attributes$cy('50'),
						elm$svg$Svg$Attributes$r('50'),
						elm$svg$Svg$Attributes$fill('tomato')
					]),
				_List_Nil),
				A2(
				elm$svg$Svg$path,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$fill('#1e90ff'),
						elm$svg$Svg$Attributes$d('M7 75.6a49.8 49.8 0 0 0 67.2 18c-26-5.2-35.7-28.7-38-45.7-3.8.2-10.9 0-15.8.2-3 17-7.9 21-13.3 27.5z')
					]),
				_List_Nil),
				A2(
				elm$svg$Svg$path,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$fill('#fff'),
						elm$svg$Svg$Attributes$d('M3 43h15c4 0 4-5 0-5h-5c-1 0-1-1 0-1h22c4 0 4-5 0-5H7c-3 0-3 5 0 5h3c1 0 1 1 0 1H1.5l-1 5zm90.8 18l-15-.1c-4 0-4 5 0 5h5c1 0 1 1 0 1h-22c-4 0-4 5 0 5h28c3 0 3-5 0-5h-3c-1 0-1-1 0-1l10.6.1c.6-1.9 1-3 1.4-5zM20.2 47.6a47 47 0 0 1-7.6 21.5c4.4 3 8.9-15.5 10.1-15 1.7 0-2 12.7-.5 12.9 1.6-.1 2.8-8.3 4.8-8.3 1.8.3 2.3 9.1 4.1 8.7 1.9-.3 0-12.2 2-13.1 2-.2 5.1 16.3 9.7 14.8-3.7-7-5.7-14.7-6.7-21.4H20.2z')
					]),
				_List_Nil)
			]));
};
var author$project$Framework$Logo$logo = F2(
	function (lg, size) {
		return author$project$Element$html(
			function () {
				if (lg.$ === 'LogoLucamug') {
					return author$project$Framework$Logo$logoLucamug(size);
				} else {
					var logoElmType = lg.a;
					return A2(author$project$Framework$Logo$elmLogo, logoElmType, size);
				}
			}());
	});
var author$project$Framework$initConf = {
	forkMe: author$project$Element$inFront(
		A2(
			author$project$Element$link,
			_List_fromArray(
				[
					author$project$Element$alignRight,
					author$project$Element$Font$color(author$project$ColorElement$black)
				]),
			{
				label: A2(
					author$project$Element$image,
					_List_fromArray(
						[
							author$project$Element$width(
							author$project$Element$px(60)),
							author$project$Element$alpha(0.5)
						]),
					{description: 'Fork me on Github', src: 'images/github.png'}),
				url: 'https://github.com/lucamug/elm-style-framework'
			})),
	gray3: A3(author$project$Element$rgb, 51, 51, 51),
	gray9: A3(author$project$Element$rgb, 153, 153, 153),
	grayB: A3(author$project$Element$rgb, 182, 182, 182),
	grayD: A3(author$project$Element$rgb, 209, 209, 209),
	grayF: A3(author$project$Element$rgb, 247, 247, 247),
	hostnamesWithoutPassword: function (hostname) {
		return hostname === 'localhost';
	},
	introduction: author$project$Element$none,
	mainPadding: 41,
	password: '',
	subTitle: 'FRAMEWORK',
	title: A2(
		author$project$Element$column,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				author$project$Element$link,
				_List_Nil,
				{
					label: A2(
						author$project$Element$el,
						_List_fromArray(
							[
								author$project$Element$alpha(0.3)
							]),
						A2(
							author$project$Framework$Logo$logo,
							author$project$Framework$Logo$LogoElm(
								author$project$Framework$Logo$ElmColor(author$project$Framework$Logo$White)),
							60)),
					url: '..'
				}),
				A2(
				author$project$Element$paragraph,
				_List_fromArray(
					[
						author$project$Element$Font$size(55),
						author$project$Element$Font$bold,
						author$project$Element$moveLeft(3)
					]),
				_List_fromArray(
					[
						A2(
						author$project$Element$el,
						_List_fromArray(
							[
								author$project$Element$alpha(0.5)
							]),
						author$project$Element$text('elm')),
						author$project$Element$text('Style')
					]))
			])),
	version: '0.19'
};
var author$project$Internal$Model$AsRow = {$: 'AsRow'};
var author$project$Internal$Model$asRow = author$project$Internal$Model$AsRow;
var author$project$Element$row = F2(
	function (attrs, children) {
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asRow,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentLeft),
				A2(
					elm$core$List$cons,
					author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentCenterY),
					A2(
						elm$core$List$cons,
						author$project$Element$width(author$project$Element$fill),
						A2(
							elm$core$List$cons,
							author$project$Element$height(author$project$Element$shrink),
							attrs)))),
			author$project$Internal$Model$Unkeyed(children));
	});
var author$project$Internal$Flag$cursor = author$project$Internal$Flag$col(21);
var author$project$Element$pointer = A2(author$project$Internal$Model$Class, author$project$Internal$Flag$cursor, author$project$Internal$Style$classes.cursorPointer);
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$Sync = function (a) {
	return {$: 'Sync', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(
				A2(elm$json$Json$Decode$map, elm$virtual_dom$VirtualDom$Sync, decoder)));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Element$Events$onClick = function ($) {
	return author$project$Internal$Model$Attr(
		elm$html$Html$Events$onClick($));
};
var author$project$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 'StyleClass') && (attr.b.$ === 'PseudoSelector')) && (attr.b.a.$ === 'Focus')) {
		var _n1 = attr.b;
		var _n2 = _n1.a;
		return true;
	} else {
		return false;
	}
};
var author$project$Internal$Model$NoAttribute = {$: 'NoAttribute'};
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var author$project$Element$Input$focusDefault = function (attrs) {
	return A2(elm$core$List$any, author$project$Element$Input$hasFocusStyle, attrs) ? author$project$Internal$Model$NoAttribute : author$project$Internal$Model$htmlClass('focusable');
};
var author$project$Element$Input$enter = 'Enter';
var elm$html$Html$Events$syncTuple = function (_n0) {
	var msg = _n0.a;
	var bool = _n0.b;
	return _Utils_Tuple2(
		elm$virtual_dom$VirtualDom$Sync(msg),
		bool);
};
var elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayPreventDefault(
				A2(elm$json$Json$Decode$map, elm$html$Html$Events$syncTuple, decoder)));
	});
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$Element$Input$onKey = F2(
	function (desiredCode, msg) {
		var decode = function (code) {
			return _Utils_eq(code, desiredCode) ? elm$json$Json$Decode$succeed(msg) : elm$json$Json$Decode$fail('Not the enter key');
		};
		var isKey = A2(
			elm$json$Json$Decode$andThen,
			decode,
			A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string));
		return author$project$Internal$Model$Attr(
			A2(
				elm$html$Html$Events$preventDefaultOn,
				'keyup',
				A2(
					elm$json$Json$Decode$map,
					function (fired) {
						return _Utils_Tuple2(fired, true);
					},
					isKey)));
	});
var author$project$Element$Input$onEnter = function (msg) {
	return A2(author$project$Element$Input$onKey, author$project$Element$Input$enter, msg);
};
var author$project$Internal$Model$Button = {$: 'Button'};
var author$project$Internal$Model$Describe = function (a) {
	return {$: 'Describe', a: a};
};
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$disabled = elm$html$Html$Attributes$boolProperty('disabled');
var elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		elm$core$String$fromInt(n));
};
var author$project$Element$Input$button = F2(
	function (attrs, _n0) {
		var onPress = _n0.onPress;
		var label = _n0.label;
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				author$project$Element$width(author$project$Element$shrink),
				A2(
					elm$core$List$cons,
					author$project$Element$height(author$project$Element$shrink),
					A2(
						elm$core$List$cons,
						author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentCenterX),
						A2(
							elm$core$List$cons,
							author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentCenterY),
							A2(
								elm$core$List$cons,
								author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.seButton),
								A2(
									elm$core$List$cons,
									author$project$Element$pointer,
									A2(
										elm$core$List$cons,
										author$project$Element$Input$focusDefault(attrs),
										A2(
											elm$core$List$cons,
											author$project$Internal$Model$Describe(author$project$Internal$Model$Button),
											A2(
												elm$core$List$cons,
												author$project$Internal$Model$Attr(
													elm$html$Html$Attributes$tabindex(0)),
												function () {
													if (onPress.$ === 'Nothing') {
														return A2(
															elm$core$List$cons,
															author$project$Internal$Model$Attr(
																elm$html$Html$Attributes$disabled(true)),
															attrs);
													} else {
														var msg = onPress.a;
														return A2(
															elm$core$List$cons,
															author$project$Element$Events$onClick(msg),
															A2(
																elm$core$List$cons,
																author$project$Element$Input$onEnter(msg),
																attrs));
													}
												}()))))))))),
			author$project$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var author$project$Internal$Model$CenterX = {$: 'CenterX'};
var author$project$Element$centerX = author$project$Internal$Model$AlignX(author$project$Internal$Model$CenterX);
var author$project$Internal$Model$AlignY = function (a) {
	return {$: 'AlignY', a: a};
};
var author$project$Internal$Model$CenterY = {$: 'CenterY'};
var author$project$Element$centerY = author$project$Internal$Model$AlignY(author$project$Internal$Model$CenterY);
var author$project$Element$htmlAttribute = author$project$Internal$Model$Attr;
var author$project$Internal$Flag$hover = author$project$Internal$Flag$col(33);
var author$project$Internal$Model$tag = F2(
	function (label, style) {
		switch (style.$) {
			case 'Single':
				var _class = style.a;
				var prop = style.b;
				var val = style.c;
				return A3(author$project$Internal$Model$Single, label + ('-' + _class), prop, val);
			case 'Colored':
				var _class = style.a;
				var prop = style.b;
				var val = style.c;
				return A3(author$project$Internal$Model$Colored, label + ('-' + _class), prop, val);
			case 'Style':
				var _class = style.a;
				var props = style.b;
				return A2(author$project$Internal$Model$Style, label + ('-' + _class), props);
			case 'Transparency':
				var _class = style.a;
				var o = style.b;
				return A2(author$project$Internal$Model$Transparency, label + ('-' + _class), o);
			default:
				var x = style;
				return x;
		}
	});
var author$project$Internal$Model$onlyStyles = function (attr) {
	switch (attr.$) {
		case 'StyleClass':
			var style = attr.b;
			return elm$core$Maybe$Just(style);
		case 'TextShadow':
			var shadow = attr.a;
			var stringName = author$project$Internal$Model$formatTextShadow(shadow);
			return elm$core$Maybe$Just(
				A2(
					author$project$Internal$Model$Shadows,
					'txt-shadow-' + author$project$Internal$Model$textShadowName(shadow),
					stringName));
		case 'BoxShadow':
			var shadow = attr.a;
			var stringName = author$project$Internal$Model$formatBoxShadow(shadow);
			return elm$core$Maybe$Just(
				A2(
					author$project$Internal$Model$Shadows,
					'box-shadow-' + author$project$Internal$Model$boxShadowName(shadow),
					stringName));
		default:
			return elm$core$Maybe$Nothing;
	}
};
var author$project$Internal$Model$BoxShadow = function (a) {
	return {$: 'BoxShadow', a: a};
};
var author$project$Internal$Model$TextShadow = function (a) {
	return {$: 'TextShadow', a: a};
};
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var author$project$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 'Styled':
				var styled = el.a;
				return author$project$Internal$Model$Styled(
					{
						html: F2(
							function (add, context) {
								return A2(
									elm$virtual_dom$VirtualDom$map,
									fn,
									A2(styled.html, add, context));
							}),
						styles: styled.styles
					});
			case 'Unstyled':
				var html = el.a;
				return author$project$Internal$Model$Unstyled(
					function ($) {
						return A2(
							elm$virtual_dom$VirtualDom$map,
							fn,
							html($));
					});
			case 'Text':
				var str = el.a;
				return author$project$Internal$Model$Text(str);
			default:
				return author$project$Internal$Model$Empty;
		}
	});
var elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var author$project$Internal$Model$mapAttrFromStyle = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 'NoAttribute':
				return author$project$Internal$Model$NoAttribute;
			case 'Describe':
				var description = attr.a;
				return author$project$Internal$Model$Describe(description);
			case 'AlignX':
				var x = attr.a;
				return author$project$Internal$Model$AlignX(x);
			case 'AlignY':
				var y = attr.a;
				return author$project$Internal$Model$AlignY(y);
			case 'Width':
				var x = attr.a;
				return author$project$Internal$Model$Width(x);
			case 'Height':
				var x = attr.a;
				return author$project$Internal$Model$Height(x);
			case 'Class':
				var x = attr.a;
				var y = attr.b;
				return A2(author$project$Internal$Model$Class, x, y);
			case 'StyleClass':
				var flag = attr.a;
				var style = attr.b;
				return A2(author$project$Internal$Model$StyleClass, flag, style);
			case 'Nearby':
				var location = attr.a;
				var elem = attr.b;
				return A2(
					author$project$Internal$Model$Nearby,
					location,
					A2(author$project$Internal$Model$map, fn, elem));
			case 'Attr':
				var htmlAttr = attr.a;
				return author$project$Internal$Model$Attr(
					A2(elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			case 'TextShadow':
				var shadow = attr.a;
				return author$project$Internal$Model$TextShadow(shadow);
			default:
				var shadow = attr.a;
				return author$project$Internal$Model$BoxShadow(shadow);
		}
	});
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var author$project$Internal$Model$removeNever = function (style) {
	return A2(author$project$Internal$Model$mapAttrFromStyle, elm$core$Basics$never, style);
};
var author$project$Internal$Model$unwrapDecorations = function (attrs) {
	var joinShadows = F2(
		function (x, styles) {
			if (x.$ === 'Shadows') {
				var name = x.a;
				var shadowProps = x.b;
				var _n3 = styles.shadows;
				if (_n3.$ === 'Nothing') {
					return _Utils_update(
						styles,
						{
							shadows: elm$core$Maybe$Just(
								_Utils_Tuple2(name, shadowProps))
						});
				} else {
					var _n4 = _n3.a;
					var existingName = _n4.a;
					var existingShadow = _n4.b;
					return _Utils_update(
						styles,
						{
							shadows: elm$core$Maybe$Just(
								_Utils_Tuple2(
									_Utils_ap(existingName, name),
									existingShadow + (', ' + shadowProps)))
						});
				}
			} else {
				return _Utils_update(
					styles,
					{
						styles: A2(elm$core$List$cons, x, styles.styles)
					});
			}
		});
	var addShadow = function (styles) {
		var _n0 = styles.shadows;
		if (_n0.$ === 'Nothing') {
			return styles.styles;
		} else {
			var _n1 = _n0.a;
			var shadowName = _n1.a;
			var shadowProps = _n1.b;
			return A2(
				elm$core$List$cons,
				A2(author$project$Internal$Model$Shadows, shadowName, shadowProps),
				styles.styles);
		}
	};
	return addShadow(
		A3(
			elm$core$List$foldr,
			joinShadows,
			{shadows: elm$core$Maybe$Nothing, styles: _List_Nil},
			A2(
				elm$core$List$filterMap,
				function ($) {
					return author$project$Internal$Model$onlyStyles(
						author$project$Internal$Model$removeNever($));
				},
				attrs)));
};
var author$project$Element$mouseOver = function (decs) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$hover,
		A2(
			author$project$Internal$Model$PseudoSelector,
			author$project$Internal$Model$Hover,
			A2(
				elm$core$List$map,
				author$project$Internal$Model$tag(author$project$Internal$Style$classes.hover),
				author$project$Internal$Model$unwrapDecorations(decs))));
};
var author$project$Internal$Flag$padding = author$project$Internal$Flag$col(2);
var author$project$Element$paddingXY = F2(
	function (x, y) {
		return A2(
			author$project$Internal$Model$StyleClass,
			author$project$Internal$Flag$padding,
			A4(author$project$Internal$Model$PaddingStyle, y, x, y, x));
	});
var author$project$Internal$Flag$bgColor = author$project$Internal$Flag$col(8);
var author$project$Element$Background$color = function (clr) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$bgColor,
		A3(
			author$project$Internal$Model$Colored,
			'bg-' + author$project$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var author$project$Internal$Flag$borderColor = author$project$Internal$Flag$col(28);
var author$project$Element$Border$color = function (clr) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$borderColor,
		A3(
			author$project$Internal$Model$Colored,
			'border-color-' + author$project$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var author$project$Internal$Flag$borderRound = author$project$Internal$Flag$col(17);
var author$project$Element$Border$rounded = function (radius) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$borderRound,
		A3(
			author$project$Internal$Model$Single,
			'border-radius-' + elm$core$String$fromInt(radius),
			'border-radius',
			elm$core$String$fromInt(radius) + 'px'));
};
var author$project$Internal$Flag$borderWidth = author$project$Internal$Flag$col(27);
var author$project$Element$Border$width = function (v) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$borderWidth,
		A3(
			author$project$Internal$Model$Single,
			'border-' + elm$core$String$fromInt(v),
			'border-width',
			elm$core$String$fromInt(v) + 'px'));
};
var author$project$Framework$Button$SizeDefault = {$: 'SizeDefault'};
var author$project$Framework$Button$StateDefault = {$: 'StateDefault'};
var author$project$Framework$Button$StateDisabled = {$: 'StateDisabled'};
var elm$core$String$cons = _String_cons;
var elm$core$String$startsWith = _String_startsWith;
var author$project$Color$withPrecedingHash = function (str) {
	return A2(elm$core$String$startsWith, '#', str) ? str : A2(
		elm$core$String$cons,
		_Utils_chr('#'),
		str);
};
var author$project$Color$erroneousHex = function (str) {
	return {
		alpha: 1,
		blue: 0,
		green: 0,
		red: 0,
		value: author$project$Color$withPrecedingHash(str)
	};
};
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var author$project$Color$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char.valueOf()) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2(elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return elm$core$Result$Err(
							elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$length = _String_length;
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var author$project$Color$fromString = function (str) {
	if (elm$core$String$isEmpty(str)) {
		return elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2(elm$core$String$startsWith, '-', str)) {
				var list = A2(
					elm$core$Maybe$withDefault,
					_List_Nil,
					elm$core$List$tail(
						elm$core$String$toList(str)));
				return A2(
					elm$core$Result$map,
					elm$core$Basics$negate,
					A3(
						author$project$Color$fromStringHelp,
						elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					author$project$Color$fromStringHelp,
					elm$core$String$length(str) - 1,
					elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2(elm$core$Result$mapError, formatError, result);
	}
};
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$String$fromList = _String_fromList;
var elm$core$String$toLower = _String_toLower;
var author$project$Color$validHex = F5(
	function (str, _n0, _n1, _n2, _n3) {
		var r1 = _n0.a;
		var r2 = _n0.b;
		var g1 = _n1.a;
		var g2 = _n1.b;
		var b1 = _n2.a;
		var b2 = _n2.b;
		var a1 = _n3.a;
		var a2 = _n3.b;
		var toResult = function ($) {
			return author$project$Color$fromString(
				elm$core$String$toLower(
					elm$core$String$fromList($)));
		};
		var results = _Utils_Tuple2(
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[r1, r2])),
				toResult(
					_List_fromArray(
						[g1, g2]))),
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[b1, b2])),
				toResult(
					_List_fromArray(
						[a1, a2]))));
		if ((((results.a.a.$ === 'Ok') && (results.a.b.$ === 'Ok')) && (results.b.a.$ === 'Ok')) && (results.b.b.$ === 'Ok')) {
			var _n5 = results.a;
			var red = _n5.a.a;
			var green = _n5.b.a;
			var _n6 = results.b;
			var blue = _n6.a.a;
			var alpha = _n6.b.a;
			return {
				alpha: alpha / 255,
				blue: blue,
				green: green,
				red: red,
				value: author$project$Color$withPrecedingHash(str)
			};
		} else {
			return author$project$Color$erroneousHex(str);
		}
	});
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var author$project$Color$hex = function (str) {
	var withoutHash = A2(elm$core$String$startsWith, '#', str) ? A2(elm$core$String$dropLeft, 1, str) : str;
	var _n0 = elm$core$String$toList(withoutHash);
	_n0$4:
	while (true) {
		if ((_n0.b && _n0.b.b) && _n0.b.b.b) {
			if (!_n0.b.b.b.b) {
				var r = _n0.a;
				var _n1 = _n0.b;
				var g = _n1.a;
				var _n2 = _n1.b;
				var b = _n2.a;
				return A5(
					author$project$Color$validHex,
					str,
					_Utils_Tuple2(r, r),
					_Utils_Tuple2(g, g),
					_Utils_Tuple2(b, b),
					_Utils_Tuple2(
						_Utils_chr('f'),
						_Utils_chr('f')));
			} else {
				if (!_n0.b.b.b.b.b) {
					var r = _n0.a;
					var _n3 = _n0.b;
					var g = _n3.a;
					var _n4 = _n3.b;
					var b = _n4.a;
					var _n5 = _n4.b;
					var a = _n5.a;
					return A5(
						author$project$Color$validHex,
						str,
						_Utils_Tuple2(r, r),
						_Utils_Tuple2(g, g),
						_Utils_Tuple2(b, b),
						_Utils_Tuple2(a, a));
				} else {
					if (_n0.b.b.b.b.b.b) {
						if (!_n0.b.b.b.b.b.b.b) {
							var r1 = _n0.a;
							var _n6 = _n0.b;
							var r2 = _n6.a;
							var _n7 = _n6.b;
							var g1 = _n7.a;
							var _n8 = _n7.b;
							var g2 = _n8.a;
							var _n9 = _n8.b;
							var b1 = _n9.a;
							var _n10 = _n9.b;
							var b2 = _n10.a;
							return A5(
								author$project$Color$validHex,
								str,
								_Utils_Tuple2(r1, r2),
								_Utils_Tuple2(g1, g2),
								_Utils_Tuple2(b1, b2),
								_Utils_Tuple2(
									_Utils_chr('f'),
									_Utils_chr('f')));
						} else {
							if (_n0.b.b.b.b.b.b.b.b && (!_n0.b.b.b.b.b.b.b.b.b)) {
								var r1 = _n0.a;
								var _n11 = _n0.b;
								var r2 = _n11.a;
								var _n12 = _n11.b;
								var g1 = _n12.a;
								var _n13 = _n12.b;
								var g2 = _n13.a;
								var _n14 = _n13.b;
								var b1 = _n14.a;
								var _n15 = _n14.b;
								var b2 = _n15.a;
								var _n16 = _n15.b;
								var a1 = _n16.a;
								var _n17 = _n16.b;
								var a2 = _n17.a;
								return A5(
									author$project$Color$validHex,
									str,
									_Utils_Tuple2(r1, r2),
									_Utils_Tuple2(g1, g2),
									_Utils_Tuple2(b1, b2),
									_Utils_Tuple2(a1, a2));
							} else {
								break _n0$4;
							}
						}
					} else {
						break _n0$4;
					}
				}
			}
		} else {
			break _n0$4;
		}
	}
	return author$project$Color$erroneousHex(str);
};
var author$project$Color$rgba = author$project$Color$RGBA;
var author$project$Color$hexToColor = function (string) {
	var c = author$project$Color$hex(string);
	return A4(author$project$Color$rgba, c.red, c.green, c.blue, c.alpha);
};
var author$project$ColorElement$hexToColor = function (string) {
	return author$project$Color$toElementColor(
		author$project$Color$hexToColor(string));
};
var elm$core$Basics$modBy = _Basics_modBy;
var elm$core$Char$fromCode = _Char_fromCode;
var author$project$Color$toRadix = function (n) {
	var getChr = function (c) {
		return (c < 10) ? elm$core$String$fromInt(c) : elm$core$String$fromChar(
			elm$core$Char$fromCode(87 + c));
	};
	return (n < 16) ? getChr(n) : _Utils_ap(
		author$project$Color$toRadix((n / 16) | 0),
		getChr(
			A2(elm$core$Basics$modBy, 16, n)));
};
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)),
			string);
	});
var author$project$Color$toHex = function ($) {
	return A3(
		elm$core$String$padLeft,
		2,
		_Utils_chr('0'),
		author$project$Color$toRadix($));
};
var author$project$Color$colorToHex = function (cl) {
	var c = author$project$Color$toRgb(cl);
	return A2(
		elm$core$String$join,
		'',
		A2(
			elm$core$List$cons,
			'#',
			A2(
				elm$core$List$map,
				author$project$Color$toHex,
				_List_fromArray(
					[c.red, c.green, c.blue]))));
};
var author$project$Color$HSLA = F4(
	function (a, b, c, d) {
		return {$: 'HSLA', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$turns = function (angleInTurns) {
	return (2 * elm$core$Basics$pi) * angleInTurns;
};
var author$project$Color$hsla = F4(
	function (hue, saturation, lightness, alpha) {
		return A4(
			author$project$Color$HSLA,
			hue - elm$core$Basics$turns(
				elm$core$Basics$floor(hue / (2 * elm$core$Basics$pi))),
			saturation,
			lightness,
			alpha);
	});
var author$project$Color$hsl = F3(
	function (hue, saturation, lightness) {
		return A4(author$project$Color$hsla, hue, saturation, lightness, 1);
	});
var author$project$Color$hsltoString = F3(
	function (h, s, l) {
		return author$project$Color$colorToHex(
			A3(
				author$project$Color$hsl,
				elm$core$Basics$degrees(h),
				s / 100,
				l / 100));
	});
var author$project$ColorElement$hsltoString = F3(
	function (h, s, l) {
		return A3(author$project$Color$hsltoString, h, s, l);
	});
var author$project$Framework$Configuration$bulmaColor = {
	black: A3(author$project$ColorElement$hsltoString, 0, 0, 4),
	black_bis: A3(author$project$ColorElement$hsltoString, 0, 0, 7),
	black_ter: A3(author$project$ColorElement$hsltoString, 0, 0, 14),
	blue: A3(author$project$ColorElement$hsltoString, 217, 71, 53),
	cyan: A3(author$project$ColorElement$hsltoString, 204, 86, 53),
	green: A3(author$project$ColorElement$hsltoString, 141, 71, 48),
	grey: A3(author$project$ColorElement$hsltoString, 0, 0, 48),
	grey_dark: A3(author$project$ColorElement$hsltoString, 0, 0, 29),
	grey_darker: A3(author$project$ColorElement$hsltoString, 0, 0, 21),
	grey_light: A3(author$project$ColorElement$hsltoString, 0, 0, 71),
	grey_lighter: A3(author$project$ColorElement$hsltoString, 0, 0, 86),
	orange: A3(author$project$ColorElement$hsltoString, 14, 100, 53),
	purple: A3(author$project$ColorElement$hsltoString, 271, 100, 71),
	red: A3(author$project$ColorElement$hsltoString, 348, 100, 61),
	turquoise: A3(author$project$ColorElement$hsltoString, 171, 100, 41),
	white: A3(author$project$ColorElement$hsltoString, 0, 0, 100),
	white_bis: A3(author$project$ColorElement$hsltoString, 0, 0, 98),
	white_ter: A3(author$project$ColorElement$hsltoString, 0, 0, 96),
	yellow: A3(author$project$ColorElement$hsltoString, 48, 100, 67)
};
var author$project$Framework$Configuration$bulmaSizes = {size1: '3.00', size2: '2.50', size3: '2.00', size4: '1.50', size5: '1.25', size6: '1.00', size7: '0.75'};
var author$project$Framework$Configuration$findColorInvert = function (color) {
	return '#000000';
};
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var author$project$Framework$Configuration$configuration = elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('black', author$project$Framework$Configuration$bulmaColor.black),
			_Utils_Tuple2('black_bis', author$project$Framework$Configuration$bulmaColor.black_bis),
			_Utils_Tuple2('black_ter', author$project$Framework$Configuration$bulmaColor.black_ter),
			_Utils_Tuple2('grey_darker', author$project$Framework$Configuration$bulmaColor.grey_darker),
			_Utils_Tuple2('grey_dark', author$project$Framework$Configuration$bulmaColor.grey_dark),
			_Utils_Tuple2('grey', author$project$Framework$Configuration$bulmaColor.grey),
			_Utils_Tuple2('grey_light', author$project$Framework$Configuration$bulmaColor.grey_light),
			_Utils_Tuple2('grey_lighter', author$project$Framework$Configuration$bulmaColor.grey_lighter),
			_Utils_Tuple2('white_ter', author$project$Framework$Configuration$bulmaColor.white_ter),
			_Utils_Tuple2('white_bis', author$project$Framework$Configuration$bulmaColor.white_bis),
			_Utils_Tuple2('white', author$project$Framework$Configuration$bulmaColor.white),
			_Utils_Tuple2('orange', author$project$Framework$Configuration$bulmaColor.orange),
			_Utils_Tuple2('yellow', author$project$Framework$Configuration$bulmaColor.yellow),
			_Utils_Tuple2('green', author$project$Framework$Configuration$bulmaColor.green),
			_Utils_Tuple2('turquoise', author$project$Framework$Configuration$bulmaColor.turquoise),
			_Utils_Tuple2('cyan', author$project$Framework$Configuration$bulmaColor.cyan),
			_Utils_Tuple2('blue', author$project$Framework$Configuration$bulmaColor.blue),
			_Utils_Tuple2('purple', author$project$Framework$Configuration$bulmaColor.purple),
			_Utils_Tuple2('red', author$project$Framework$Configuration$bulmaColor.red),
			_Utils_Tuple2('font_url', 'https://fonts.googleapis.com/css?family=Noto+Sans'),
			_Utils_Tuple2('font_typeface', 'Noto Sans'),
			_Utils_Tuple2('font_typeface_fallback', 'sans-serif'),
			_Utils_Tuple2('size1', author$project$Framework$Configuration$bulmaSizes.size1),
			_Utils_Tuple2('size2', author$project$Framework$Configuration$bulmaSizes.size2),
			_Utils_Tuple2('size3', author$project$Framework$Configuration$bulmaSizes.size3),
			_Utils_Tuple2('size4', author$project$Framework$Configuration$bulmaSizes.size4),
			_Utils_Tuple2('size5', author$project$Framework$Configuration$bulmaSizes.size5),
			_Utils_Tuple2('size6', author$project$Framework$Configuration$bulmaSizes.size6),
			_Utils_Tuple2('size7', author$project$Framework$Configuration$bulmaSizes.size7),
			_Utils_Tuple2('primary', author$project$Framework$Configuration$bulmaColor.turquoise),
			_Utils_Tuple2('info', author$project$Framework$Configuration$bulmaColor.cyan),
			_Utils_Tuple2('success', author$project$Framework$Configuration$bulmaColor.green),
			_Utils_Tuple2('warning', author$project$Framework$Configuration$bulmaColor.yellow),
			_Utils_Tuple2('danger', author$project$Framework$Configuration$bulmaColor.red),
			_Utils_Tuple2('light', author$project$Framework$Configuration$bulmaColor.white_ter),
			_Utils_Tuple2('dark', author$project$Framework$Configuration$bulmaColor.grey_darker),
			_Utils_Tuple2('background', author$project$Framework$Configuration$bulmaColor.white_ter),
			_Utils_Tuple2('border', author$project$Framework$Configuration$bulmaColor.grey_lighter),
			_Utils_Tuple2('border-hover', author$project$Framework$Configuration$bulmaColor.grey_light),
			_Utils_Tuple2('text', author$project$Framework$Configuration$bulmaColor.grey_dark),
			_Utils_Tuple2('text-light', author$project$Framework$Configuration$bulmaColor.grey),
			_Utils_Tuple2('text-strong', author$project$Framework$Configuration$bulmaColor.grey_darker),
			_Utils_Tuple2('code', author$project$Framework$Configuration$bulmaColor.red),
			_Utils_Tuple2('code-background', author$project$Framework$Configuration$bulmaColor.white_ter),
			_Utils_Tuple2('pre', author$project$Framework$Configuration$bulmaColor.grey_dark),
			_Utils_Tuple2('pre-background', author$project$Framework$Configuration$bulmaColor.white_ter),
			_Utils_Tuple2('link', author$project$Framework$Configuration$bulmaColor.blue),
			_Utils_Tuple2(
			'link_invert',
			author$project$Framework$Configuration$findColorInvert(author$project$Framework$Configuration$bulmaColor.blue)),
			_Utils_Tuple2('link_visited', author$project$Framework$Configuration$bulmaColor.purple),
			_Utils_Tuple2('link_hover', author$project$Framework$Configuration$bulmaColor.grey_darker),
			_Utils_Tuple2('link_hover_border', author$project$Framework$Configuration$bulmaColor.grey_light),
			_Utils_Tuple2('link_focus', author$project$Framework$Configuration$bulmaColor.grey_darker),
			_Utils_Tuple2('link_focus_border', author$project$Framework$Configuration$bulmaColor.blue),
			_Utils_Tuple2('link_active', author$project$Framework$Configuration$bulmaColor.grey_darker),
			_Utils_Tuple2('link_active_border', author$project$Framework$Configuration$bulmaColor.grey_dark),
			_Utils_Tuple2('size_small', author$project$Framework$Configuration$bulmaSizes.size7),
			_Utils_Tuple2('size_normal', author$project$Framework$Configuration$bulmaSizes.size6),
			_Utils_Tuple2('size_medium', author$project$Framework$Configuration$bulmaSizes.size5),
			_Utils_Tuple2('size_large', author$project$Framework$Configuration$bulmaSizes.size4),
			_Utils_Tuple2('moveDownPlaceHolderLarge', '31'),
			_Utils_Tuple2('moveDownPlaceHolderSmall', '30'),
			_Utils_Tuple2('transparent', '#ffffff00'),
			_Utils_Tuple2('muted', author$project$Framework$Configuration$bulmaColor.grey_light),
			_Utils_Tuple2('buttonFontSmall', '12'),
			_Utils_Tuple2('buttonFontDefault', '16'),
			_Utils_Tuple2('buttonFontMedium', '20'),
			_Utils_Tuple2('buttonFontLarge', '24'),
			_Utils_Tuple2('buttonFontJumbo', '16'),
			_Utils_Tuple2('buttonPaddingXSmall', '9'),
			_Utils_Tuple2('buttonPaddingYSmall', '3'),
			_Utils_Tuple2('buttonPaddingXDefault', '12'),
			_Utils_Tuple2('buttonPaddingYDefault', '5'),
			_Utils_Tuple2('buttonPaddingXMedium', '15'),
			_Utils_Tuple2('buttonPaddingYMedium', '7'),
			_Utils_Tuple2('buttonPaddingXLarge', '18'),
			_Utils_Tuple2('buttonPaddingYLarge', '9'),
			_Utils_Tuple2('buttonPaddingXJumbo', '24'),
			_Utils_Tuple2('buttonPaddingYJumbo', '24')
		]));
var author$project$Framework$Configuration$getValue = F3(
	function (key, original, replacement) {
		var repl = A2(elm$core$Dict$get, key, replacement);
		var orig = A2(elm$core$Dict$get, key, original);
		if (repl.$ === 'Just') {
			var value = repl.a;
			return elm$core$Maybe$Just(value);
		} else {
			if (orig.$ === 'Just') {
				var value = orig.a;
				return elm$core$Maybe$Just(value);
			} else {
				return elm$core$Maybe$Nothing;
			}
		}
	});
var author$project$MyStyle$configuration = elm$core$Dict$fromList(_List_Nil);
var author$project$Framework$Configuration$getString = function (key) {
	return A2(
		elm$core$Maybe$withDefault,
		'',
		A3(author$project$Framework$Configuration$getValue, key, author$project$Framework$Configuration$configuration, author$project$MyStyle$configuration));
};
var elm$core$Debug$log = _Debug_log;
var author$project$Framework$Configuration$getColor = function (key) {
	var value = author$project$Framework$Configuration$getString(key);
	var _n0 = A2(elm$core$Debug$log, 'xxx', key);
	var _n1 = A2(elm$core$Debug$log, 'xxx', value);
	return author$project$ColorElement$hexToColor(value);
};
var elm$core$String$toFloat = _String_toFloat;
var author$project$Framework$Configuration$getFloat = function (key) {
	var _n0 = elm$core$String$toFloat(
		author$project$Framework$Configuration$getString(key));
	if (_n0.$ === 'Just') {
		var value2 = _n0.a;
		return value2;
	} else {
		return 0;
	}
};
var author$project$Framework$Configuration$getInt = function (key) {
	return elm$core$Basics$round(
		author$project$Framework$Configuration$getFloat(key));
};
var author$project$Internal$Model$Monospace = {$: 'Monospace'};
var author$project$Element$Font$monospace = author$project$Internal$Model$Monospace;
var author$project$Internal$Model$SansSerif = {$: 'SansSerif'};
var author$project$Element$Font$sansSerif = author$project$Internal$Model$SansSerif;
var author$project$Internal$Model$Serif = {$: 'Serif'};
var author$project$Element$Font$serif = author$project$Internal$Model$Serif;
var author$project$Framework$Configuration$getTypeface = function (key) {
	var value = author$project$Framework$Configuration$getString(key);
	return (value === 'sans-serif') ? author$project$Element$Font$sansSerif : ((value === 'monospace') ? author$project$Element$Font$monospace : ((value === 'cursive') ? author$project$Element$Font$serif : author$project$Element$Font$serif));
};
var author$project$Framework$Configuration$conf = {
	button: {
		fontDefault: author$project$Framework$Configuration$getInt('buttonFontDefault'),
		fontJumbo: author$project$Framework$Configuration$getInt('buttonFontJumbo'),
		fontLarge: author$project$Framework$Configuration$getInt('buttonFontLarge'),
		fontMedium: author$project$Framework$Configuration$getInt('buttonFontMedium'),
		fontSmall: author$project$Framework$Configuration$getInt('buttonFontSmall'),
		paddingXDefault: author$project$Framework$Configuration$getInt('buttonPaddingXDefault'),
		paddingXJumbo: author$project$Framework$Configuration$getInt('buttonPaddingXJumbo'),
		paddingXLarge: author$project$Framework$Configuration$getInt('buttonPaddingXLarge'),
		paddingXMedium: author$project$Framework$Configuration$getInt('buttonPaddingXMedium'),
		paddingXSmall: author$project$Framework$Configuration$getInt('buttonPaddingXSmall'),
		paddingYDefault: author$project$Framework$Configuration$getInt('buttonPaddingYDefault'),
		paddingYJumbo: author$project$Framework$Configuration$getInt('buttonPaddingYJumbo'),
		paddingYLarge: author$project$Framework$Configuration$getInt('buttonPaddingYLarge'),
		paddingYMedium: author$project$Framework$Configuration$getInt('buttonPaddingYMedium'),
		paddingYSmall: author$project$Framework$Configuration$getInt('buttonPaddingYSmall')
	},
	color: {
		background: author$project$Framework$Configuration$getColor('background'),
		black: author$project$Framework$Configuration$getColor('black'),
		black_bis: author$project$Framework$Configuration$getColor('black_bis'),
		black_ter: author$project$Framework$Configuration$getColor('black_ter'),
		blue: author$project$Framework$Configuration$getColor('blue'),
		border: author$project$Framework$Configuration$getColor('border'),
		border_hover: author$project$Framework$Configuration$getColor('border_hover'),
		code: author$project$Framework$Configuration$getColor('code'),
		code_background: author$project$Framework$Configuration$getColor('code_background'),
		cyan: author$project$Framework$Configuration$getColor('cyan'),
		danger: author$project$Framework$Configuration$getColor('danger'),
		dark: author$project$Framework$Configuration$getColor('dark'),
		green: author$project$Framework$Configuration$getColor('green'),
		grey: author$project$Framework$Configuration$getColor('grey'),
		grey_dark: author$project$Framework$Configuration$getColor('grey_dark'),
		grey_darker: author$project$Framework$Configuration$getColor('grey_darker'),
		grey_light: author$project$Framework$Configuration$getColor('grey_light'),
		grey_lighter: author$project$Framework$Configuration$getColor('grey_lighter'),
		info: author$project$Framework$Configuration$getColor('info'),
		light: author$project$Framework$Configuration$getColor('light'),
		link: author$project$Framework$Configuration$getColor('link'),
		link_active: author$project$Framework$Configuration$getColor('link_active'),
		link_active_border: author$project$Framework$Configuration$getColor('link_active_border'),
		link_focus: author$project$Framework$Configuration$getColor('link_focus'),
		link_focus_border: author$project$Framework$Configuration$getColor('link_focus_border'),
		link_hover: author$project$Framework$Configuration$getColor('link_hover'),
		link_hover_border: author$project$Framework$Configuration$getColor('link_hover_border'),
		link_invert: author$project$Framework$Configuration$getColor('link_invert'),
		link_visited: author$project$Framework$Configuration$getColor('link_visited'),
		muted: author$project$Framework$Configuration$getColor('muted'),
		orange: author$project$Framework$Configuration$getColor('orange'),
		pre: author$project$Framework$Configuration$getColor('pre'),
		pre_background: author$project$Framework$Configuration$getColor('pre_background'),
		primary: author$project$Framework$Configuration$getColor('primary'),
		purple: author$project$Framework$Configuration$getColor('purple'),
		red: author$project$Framework$Configuration$getColor('red'),
		success: author$project$Framework$Configuration$getColor('success'),
		text: author$project$Framework$Configuration$getColor('text'),
		text_light: author$project$Framework$Configuration$getColor('text_light'),
		text_strong: author$project$Framework$Configuration$getColor('text_strong'),
		transparent: author$project$Framework$Configuration$getColor('transparent'),
		turquoise: author$project$Framework$Configuration$getColor('turquoise'),
		warning: author$project$Framework$Configuration$getColor('warning'),
		white: author$project$Framework$Configuration$getColor('white'),
		white_bis: author$project$Framework$Configuration$getColor('white_bis'),
		white_ter: author$project$Framework$Configuration$getColor('white_ter'),
		yellow: author$project$Framework$Configuration$getColor('yellow')
	},
	font: {
		typeface: author$project$Framework$Configuration$getString('font_typeface'),
		typefaceFallback: author$project$Framework$Configuration$getTypeface('font_typeface_fallback'),
		url: author$project$Framework$Configuration$getString('font_url')
	},
	moveDownPlaceHolder: {
		large: author$project$Framework$Configuration$getFloat('moveDownPlaceHolderLarge'),
		small: author$project$Framework$Configuration$getFloat('moveDownPlaceHolderSmall')
	},
	size: {
		size1: author$project$Framework$Configuration$getFloat('size1'),
		size2: author$project$Framework$Configuration$getFloat('size2'),
		size3: author$project$Framework$Configuration$getFloat('size3'),
		size4: author$project$Framework$Configuration$getFloat('size4'),
		size5: author$project$Framework$Configuration$getFloat('size5'),
		size6: author$project$Framework$Configuration$getFloat('size6'),
		size7: author$project$Framework$Configuration$getFloat('size7')
	}
};
var author$project$Framework$Color$grey_lighter = author$project$Framework$Configuration$conf.color.grey_lighter;
var author$project$Framework$Button$colorBorderDefault = author$project$Framework$Color$grey_lighter;
var author$project$Framework$Color$white = author$project$Framework$Configuration$conf.color.white;
var author$project$Framework$Button$colorDefault = author$project$Framework$Color$white;
var author$project$Framework$Button$SizeJumbo = {$: 'SizeJumbo'};
var author$project$Framework$Button$SizeLarge = {$: 'SizeLarge'};
var author$project$Framework$Button$SizeMedium = {$: 'SizeMedium'};
var author$project$Framework$Button$SizeSmall = {$: 'SizeSmall'};
var author$project$Framework$Button$StateLoading = {$: 'StateLoading'};
var author$project$Framework$Button$StateOutlined = {$: 'StateOutlined'};
var author$project$Framework$Button$StateWaiting = {$: 'StateWaiting'};
var author$project$Framework$Color$danger = author$project$Framework$Configuration$conf.color.danger;
var author$project$Framework$Color$info = author$project$Framework$Configuration$conf.color.info;
var author$project$Framework$Color$muted = author$project$Framework$Configuration$conf.color.muted;
var author$project$Framework$Color$primary = author$project$Framework$Configuration$conf.color.primary;
var author$project$Framework$Color$success = author$project$Framework$Configuration$conf.color.success;
var author$project$Framework$Color$warning = author$project$Framework$Configuration$conf.color.warning;
var author$project$Framework$Button$processConf = F2(
	function (modifier, confButton) {
		switch (modifier.$) {
			case 'Muted':
				return _Utils_update(
					confButton,
					{color: author$project$Framework$Color$muted});
			case 'Primary':
				return _Utils_update(
					confButton,
					{color: author$project$Framework$Color$primary});
			case 'Success':
				return _Utils_update(
					confButton,
					{color: author$project$Framework$Color$success});
			case 'Info':
				return _Utils_update(
					confButton,
					{color: author$project$Framework$Color$info});
			case 'Warning':
				return _Utils_update(
					confButton,
					{color: author$project$Framework$Color$warning});
			case 'Danger':
				return _Utils_update(
					confButton,
					{color: author$project$Framework$Color$danger});
			case 'Small':
				return _Utils_update(
					confButton,
					{size: author$project$Framework$Button$SizeSmall});
			case 'Medium':
				return _Utils_update(
					confButton,
					{size: author$project$Framework$Button$SizeMedium});
			case 'Large':
				return _Utils_update(
					confButton,
					{size: author$project$Framework$Button$SizeLarge});
			case 'Jumbo':
				return _Utils_update(
					confButton,
					{size: author$project$Framework$Button$SizeJumbo});
			case 'Outlined':
				return _Utils_update(
					confButton,
					{state: author$project$Framework$Button$StateOutlined});
			case 'Loading':
				return _Utils_update(
					confButton,
					{state: author$project$Framework$Button$StateLoading});
			case 'Waiting':
				return _Utils_update(
					confButton,
					{state: author$project$Framework$Button$StateWaiting});
			default:
				return _Utils_update(
					confButton,
					{state: author$project$Framework$Button$StateDisabled});
		}
	});
var author$project$Framework$Button$toButtonPadding = function (size) {
	switch (size.$) {
		case 'SizeSmall':
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.button.paddingXSmall, author$project$Framework$Configuration$conf.button.paddingYSmall);
		case 'SizeDefault':
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.button.paddingXDefault, author$project$Framework$Configuration$conf.button.paddingYDefault);
		case 'SizeMedium':
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.button.paddingXMedium, author$project$Framework$Configuration$conf.button.paddingYMedium);
		case 'SizeLarge':
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.button.paddingXLarge, author$project$Framework$Configuration$conf.button.paddingYLarge);
		default:
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.button.paddingXJumbo, author$project$Framework$Configuration$conf.button.paddingYJumbo);
	}
};
var author$project$Framework$Button$toPx = function (size) {
	switch (size.$) {
		case 'SizeSmall':
			return author$project$Framework$Configuration$conf.button.fontSmall;
		case 'SizeDefault':
			return author$project$Framework$Configuration$conf.button.fontDefault;
		case 'SizeMedium':
			return author$project$Framework$Configuration$conf.button.fontMedium;
		case 'SizeLarge':
			return author$project$Framework$Configuration$conf.button.fontLarge;
		default:
			return author$project$Framework$Configuration$conf.button.fontJumbo;
	}
};
var author$project$Framework$Color$grey_dark = author$project$Framework$Configuration$conf.color.grey_dark;
var author$project$Framework$Color$transparent = author$project$Framework$Configuration$conf.color.transparent;
var author$project$Framework$ColorManipulation$lighten = F2(
	function (quantity, cl) {
		return cl;
	});
var author$project$Framework$ColorManipulation$saturate = F2(
	function (quantity, cl) {
		return cl;
	});
var author$project$Framework$Spinner$Rotation = {$: 'Rotation'};
var author$project$Framework$Spinner$ThreeCircles = {$: 'ThreeCircles'};
var author$project$Framework$ColorManipulation$colorToHex = function (cl) {
	return '#666666';
};
var elm$svg$Svg$animateTransform = elm$svg$Svg$trustedNode('animateTransform');
var elm$svg$Svg$defs = elm$svg$Svg$trustedNode('defs');
var elm$svg$Svg$g = elm$svg$Svg$trustedNode('g');
var elm$svg$Svg$linearGradient = elm$svg$Svg$trustedNode('linearGradient');
var elm$svg$Svg$stop = elm$svg$Svg$trustedNode('stop');
var elm$svg$Svg$Attributes$attributeName = _VirtualDom_attribute('attributeName');
var elm$svg$Svg$Attributes$dur = _VirtualDom_attribute('dur');
var elm$svg$Svg$Attributes$fillRule = _VirtualDom_attribute('fill-rule');
var elm$svg$Svg$Attributes$from = function (value) {
	return A2(
		_VirtualDom_attribute,
		'from',
		_VirtualDom_noJavaScriptUri(value));
};
var elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var elm$svg$Svg$Attributes$offset = _VirtualDom_attribute('offset');
var elm$svg$Svg$Attributes$repeatCount = _VirtualDom_attribute('repeatCount');
var elm$svg$Svg$Attributes$stopColor = _VirtualDom_attribute('stop-color');
var elm$svg$Svg$Attributes$stopOpacity = _VirtualDom_attribute('stop-opacity');
var elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var elm$svg$Svg$Attributes$to = function (value) {
	return A2(
		_VirtualDom_attribute,
		'to',
		_VirtualDom_noJavaScriptUri(value));
};
var elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var elm$svg$Svg$Attributes$type_ = _VirtualDom_attribute('type');
var elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var elm$svg$Svg$Attributes$xmlSpace = A2(_VirtualDom_attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var author$project$Framework$Spinner$spinnerRotationHtml = F2(
	function (size, color) {
		var speed = '0.6s';
		var colorString = author$project$Framework$ColorManipulation$colorToHex(color);
		var idElement = 'id' + A2(elm$core$String$dropLeft, 1, colorString);
		return A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$viewBox('0 0 38 38'),
					elm$svg$Svg$Attributes$xmlSpace('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width(
					elm$core$String$fromInt(size)),
					elm$svg$Svg$Attributes$height(
					elm$core$String$fromInt(size))
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$defs,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$svg$Svg$linearGradient,
							_List_fromArray(
								[
									elm$svg$Svg$Attributes$id(idElement),
									elm$svg$Svg$Attributes$x1('8%'),
									elm$svg$Svg$Attributes$x2('65.7%'),
									elm$svg$Svg$Attributes$y1('0%'),
									elm$svg$Svg$Attributes$y2('23.9%')
								]),
							_List_fromArray(
								[
									A2(
									elm$svg$Svg$stop,
									_List_fromArray(
										[
											elm$svg$Svg$Attributes$offset('0%'),
											elm$svg$Svg$Attributes$stopColor(colorString),
											elm$svg$Svg$Attributes$stopOpacity('0')
										]),
									_List_Nil),
									A2(
									elm$svg$Svg$stop,
									_List_fromArray(
										[
											elm$svg$Svg$Attributes$offset('63.1%'),
											elm$svg$Svg$Attributes$stopColor(colorString),
											elm$svg$Svg$Attributes$stopOpacity('.6')
										]),
									_List_Nil),
									A2(
									elm$svg$Svg$stop,
									_List_fromArray(
										[
											elm$svg$Svg$Attributes$offset('100%'),
											elm$svg$Svg$Attributes$stopColor(colorString)
										]),
									_List_Nil)
								]))
						])),
					A2(
					elm$svg$Svg$g,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$fill('none'),
							elm$svg$Svg$Attributes$fillRule('evenodd'),
							elm$svg$Svg$Attributes$transform('translate(1 1)')
						]),
					_List_fromArray(
						[
							A2(
							elm$svg$Svg$path,
							_List_fromArray(
								[
									elm$svg$Svg$Attributes$d('M36 18C36 8 28 0 18 0'),
									elm$svg$Svg$Attributes$stroke('url(#' + (idElement + ')')),
									elm$svg$Svg$Attributes$strokeWidth('2')
								]),
							_List_fromArray(
								[
									A2(
									elm$svg$Svg$animateTransform,
									_List_fromArray(
										[
											elm$svg$Svg$Attributes$attributeName('transform'),
											elm$svg$Svg$Attributes$dur(speed),
											elm$svg$Svg$Attributes$from('0 18 18'),
											elm$svg$Svg$Attributes$repeatCount('indefinite'),
											elm$svg$Svg$Attributes$to('360 18 18'),
											elm$svg$Svg$Attributes$type_('rotate')
										]),
									_List_Nil)
								])),
							A2(
							elm$svg$Svg$circle,
							_List_fromArray(
								[
									elm$svg$Svg$Attributes$cx('36'),
									elm$svg$Svg$Attributes$cy('18'),
									elm$svg$Svg$Attributes$fill(colorString),
									elm$svg$Svg$Attributes$r('1')
								]),
							_List_fromArray(
								[
									A2(
									elm$svg$Svg$animateTransform,
									_List_fromArray(
										[
											elm$svg$Svg$Attributes$attributeName('transform'),
											elm$svg$Svg$Attributes$dur(speed),
											elm$svg$Svg$Attributes$from('0 18 18'),
											elm$svg$Svg$Attributes$repeatCount('indefinite'),
											elm$svg$Svg$Attributes$to('360 18 18'),
											elm$svg$Svg$Attributes$type_('rotate')
										]),
									_List_Nil)
								]))
						]))
				]));
	});
var elm$svg$Svg$animate = elm$svg$Svg$trustedNode('animate');
var elm$svg$Svg$Attributes$values = function (value) {
	return A2(
		_VirtualDom_attribute,
		'values',
		_VirtualDom_noJavaScriptUri(value));
};
var author$project$Framework$Spinner$spinnerThreeCirclesHtml = F2(
	function (_n0, color) {
		var size = 32;
		var colorString = author$project$Framework$ColorManipulation$colorToHex(color);
		return A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$viewBox('0 0 64 64'),
					elm$svg$Svg$Attributes$xmlSpace('http://www.w3.org/2000/svg'),
					elm$svg$Svg$Attributes$width(
					elm$core$String$fromInt(size)),
					elm$svg$Svg$Attributes$height(
					elm$core$String$fromInt(size))
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$g,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$svg$Svg$circle,
							_List_fromArray(
								[
									elm$svg$Svg$Attributes$cx('16'),
									elm$svg$Svg$Attributes$cy('32'),
									elm$svg$Svg$Attributes$strokeWidth('0'),
									elm$svg$Svg$Attributes$r('4.26701'),
									elm$svg$Svg$Attributes$fill(colorString)
								]),
							_List_fromArray(
								[
									A2(
									elm$svg$Svg$animate,
									_List_fromArray(
										[
											elm$svg$Svg$Attributes$attributeName('fill-opacity'),
											elm$svg$Svg$Attributes$dur('750ms'),
											elm$svg$Svg$Attributes$values('.5;.6;.8;1;.8;.6;.5;.5'),
											elm$svg$Svg$Attributes$repeatCount('indefinite')
										]),
									_List_Nil),
									A2(
									elm$svg$Svg$animate,
									_List_fromArray(
										[
											elm$svg$Svg$Attributes$attributeName('r'),
											elm$svg$Svg$Attributes$dur('750ms'),
											elm$svg$Svg$Attributes$values('3;3;4;5;6;5;4;3'),
											elm$svg$Svg$Attributes$repeatCount('indefinite')
										]),
									_List_Nil)
								])),
							A2(
							elm$svg$Svg$circle,
							_List_fromArray(
								[
									elm$svg$Svg$Attributes$cx('32'),
									elm$svg$Svg$Attributes$cy('32'),
									elm$svg$Svg$Attributes$strokeWidth('0'),
									elm$svg$Svg$Attributes$r('5.26701'),
									elm$svg$Svg$Attributes$fill(colorString)
								]),
							_List_fromArray(
								[
									A2(
									elm$svg$Svg$animate,
									_List_fromArray(
										[
											elm$svg$Svg$Attributes$attributeName('fill-opacity'),
											elm$svg$Svg$Attributes$dur('750ms'),
											elm$svg$Svg$Attributes$values('.5;.5;.6;.8;1;.8;.6;.5'),
											elm$svg$Svg$Attributes$repeatCount('indefinite')
										]),
									_List_Nil),
									A2(
									elm$svg$Svg$animate,
									_List_fromArray(
										[
											elm$svg$Svg$Attributes$attributeName('r'),
											elm$svg$Svg$Attributes$dur('750ms'),
											elm$svg$Svg$Attributes$values('4;3;3;4;5;6;5;4'),
											elm$svg$Svg$Attributes$repeatCount('indefinite')
										]),
									_List_Nil)
								])),
							A2(
							elm$svg$Svg$circle,
							_List_fromArray(
								[
									elm$svg$Svg$Attributes$cx('48'),
									elm$svg$Svg$Attributes$cy('32'),
									elm$svg$Svg$Attributes$strokeWidth('0'),
									elm$svg$Svg$Attributes$r('5.73299'),
									elm$svg$Svg$Attributes$fill(colorString)
								]),
							_List_fromArray(
								[
									A2(
									elm$svg$Svg$animate,
									_List_fromArray(
										[
											elm$svg$Svg$Attributes$attributeName('fill-opacity'),
											elm$svg$Svg$Attributes$dur('750ms'),
											elm$svg$Svg$Attributes$values('.6;.5;.5;.6;.8;1;.8;.6'),
											elm$svg$Svg$Attributes$repeatCount('indefinite')
										]),
									_List_Nil),
									A2(
									elm$svg$Svg$animate,
									_List_fromArray(
										[
											elm$svg$Svg$Attributes$attributeName('r'),
											elm$svg$Svg$Attributes$dur('750ms'),
											elm$svg$Svg$Attributes$values('5;4;3;3;4;5;6;5'),
											elm$svg$Svg$Attributes$repeatCount('indefinite')
										]),
									_List_Nil)
								]))
						]))
				]));
	});
var author$project$Framework$Spinner$spinner = F3(
	function (sp, size, color) {
		return author$project$Element$html(
			function () {
				if (sp.$ === 'ThreeCircles') {
					return A2(author$project$Framework$Spinner$spinnerThreeCirclesHtml, size, color);
				} else {
					return A2(author$project$Framework$Spinner$spinnerRotationHtml, size, color);
				}
			}());
	});
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var author$project$Framework$Button$buttonAttr = function (modifiers) {
	var confButton = A3(
		elm$core$List$foldl,
		author$project$Framework$Button$processConf,
		{color: author$project$Framework$Button$colorDefault, size: author$project$Framework$Button$SizeDefault, state: author$project$Framework$Button$StateDefault},
		modifiers);
	var fontSize = author$project$Framework$Button$toPx(confButton.size);
	var spinnerColor = _Utils_eq(confButton.color, author$project$Framework$Color$white) ? author$project$Framework$Color$grey_dark : author$project$Framework$Color$white;
	var inFrontAddon = function () {
		var _n6 = confButton.state;
		switch (_n6.$) {
			case 'StateLoading':
				return _List_fromArray(
					[
						author$project$Element$inFront(
						A2(
							author$project$Element$el,
							_List_fromArray(
								[author$project$Element$centerY, author$project$Element$centerX]),
							A3(author$project$Framework$Spinner$spinner, author$project$Framework$Spinner$Rotation, fontSize, spinnerColor)))
					]);
			case 'StateWaiting':
				return _List_fromArray(
					[
						author$project$Element$inFront(
						A2(
							author$project$Element$el,
							_List_fromArray(
								[author$project$Element$centerY, author$project$Element$centerX]),
							A3(author$project$Framework$Spinner$spinner, author$project$Framework$Spinner$ThreeCircles, fontSize, spinnerColor)))
					]);
			default:
				return _List_Nil;
		}
	}();
	var cc = confButton.color;
	var fontColor = function () {
		var _n5 = confButton.state;
		switch (_n5.$) {
			case 'StateOutlined':
				return cc;
			case 'StateLoading':
				return author$project$Framework$Color$transparent;
			case 'StateWaiting':
				return author$project$Framework$Color$transparent;
			default:
				return _Utils_eq(confButton.color, author$project$Framework$Color$white) ? author$project$Framework$Color$grey_dark : author$project$Framework$Color$white;
		}
	}();
	var fontMouseOverColor = function () {
		var _n4 = confButton.state;
		switch (_n4.$) {
			case 'StateLoading':
				return author$project$Framework$Color$transparent;
			case 'StateWaiting':
				return author$project$Framework$Color$transparent;
			case 'StateOutlined':
				return author$project$Framework$Color$white;
			default:
				return A2(
					author$project$Framework$ColorManipulation$saturate,
					0.9,
					A2(author$project$Framework$ColorManipulation$lighten, 0.8, fontColor));
		}
	}();
	var buttonPadding = author$project$Framework$Button$toButtonPadding(confButton.size);
	var borderRounded = function () {
		var _n3 = confButton.size;
		if (_n3.$ === 'SizeSmall') {
			return 2;
		} else {
			return 3;
		}
	}();
	var backgroundColor = function () {
		var _n2 = confButton.state;
		switch (_n2.$) {
			case 'StateDefault':
				return cc;
			case 'StateOutlined':
				return _Utils_eq(confButton.color, author$project$Framework$Color$white) ? author$project$Framework$Button$colorBorderDefault : author$project$Framework$Color$transparent;
			case 'StateLoading':
				return cc;
			case 'StateWaiting':
				return cc;
			default:
				return A2(
					author$project$Framework$ColorManipulation$saturate,
					0.4,
					A2(author$project$Framework$ColorManipulation$lighten, 1.1, cc));
		}
	}();
	var backgroundMouseOverColor = function () {
		var _n1 = confButton.state;
		if (_n1.$ === 'StateOutlined') {
			return cc;
		} else {
			return A2(
				author$project$Framework$ColorManipulation$saturate,
				0.9,
				A2(author$project$Framework$ColorManipulation$lighten, 0.8, backgroundColor));
		}
	}();
	var borderColor = function () {
		if (_Utils_eq(confButton.color, author$project$Framework$Color$white)) {
			return author$project$Framework$Button$colorBorderDefault;
		} else {
			var _n0 = confButton.state;
			if (_n0.$ === 'StateOutlined') {
				return cc;
			} else {
				return backgroundColor;
			}
		}
	}();
	var borderMouseOverColor = A2(
		author$project$Framework$ColorManipulation$saturate,
		0.9,
		A2(author$project$Framework$ColorManipulation$lighten, 0.8, borderColor));
	return _Utils_ap(
		_List_fromArray(
			[
				author$project$Element$Font$size(fontSize),
				author$project$Element$Font$color(fontColor),
				author$project$Element$Background$color(backgroundColor),
				A2(author$project$Element$paddingXY, buttonPadding.a, buttonPadding.b),
				author$project$Element$Border$rounded(borderRounded),
				author$project$Element$Border$width(1),
				author$project$Element$Border$color(borderColor)
			]),
		_Utils_ap(
			_Utils_eq(confButton.state, author$project$Framework$Button$StateDisabled) ? _List_fromArray(
				[
					author$project$Element$htmlAttribute(
					A2(elm$html$Html$Attributes$style, 'cursor', 'not-allowed'))
				]) : _List_fromArray(
				[
					author$project$Element$mouseOver(
					_List_fromArray(
						[
							author$project$Element$Font$color(fontMouseOverColor),
							author$project$Element$Background$color(backgroundMouseOverColor),
							author$project$Element$Border$color(borderMouseOverColor)
						]))
				]),
			inFrontAddon));
};
var author$project$Framework$Button$button = F3(
	function (modifiers, onPress, label) {
		return A2(
			author$project$Element$Input$button,
			author$project$Framework$Button$buttonAttr(modifiers),
			{
				label: author$project$Element$text(label),
				onPress: onPress
			});
	});
var author$project$Framework$Button$buttonLink = F3(
	function (modifiers, url, label) {
		return A2(
			author$project$Element$link,
			author$project$Framework$Button$buttonAttr(modifiers),
			{
				label: author$project$Element$text(label),
				url: url
			});
	});
var author$project$Internal$Flag$fontAlignment = author$project$Internal$Flag$col(12);
var author$project$Element$Font$center = A2(author$project$Internal$Model$Class, author$project$Internal$Flag$fontAlignment, author$project$Internal$Style$classes.textCenter);
var author$project$Framework$Button$extraAttrForButtonWidth = function (buttonX) {
	return _List_fromArray(
		[
			author$project$Element$htmlAttribute(
			A2(elm$html$Html$Attributes$style, 'width', '100%')),
			author$project$Element$htmlAttribute(
			A2(
				elm$html$Html$Attributes$style,
				'max-width',
				elm$core$String$fromInt(buttonX) + 'px')),
			author$project$Element$Font$center,
			author$project$Element$centerX
		]);
};
var author$project$Framework$Button$buttonLinkWidth = F4(
	function (modifiers, url, label, buttonX) {
		return A2(
			author$project$Element$link,
			_Utils_ap(
				author$project$Framework$Button$buttonAttr(modifiers),
				author$project$Framework$Button$extraAttrForButtonWidth(buttonX)),
			{
				label: author$project$Element$text(label),
				url: url
			});
	});
var author$project$Framework$Button$buttonWidth = F4(
	function (modifiers, onPress, label, buttonX) {
		return A2(
			author$project$Element$Input$button,
			_Utils_ap(
				author$project$Framework$Button$buttonAttr(modifiers),
				author$project$Framework$Button$extraAttrForButtonWidth(buttonX)),
			{
				label: author$project$Element$text(label),
				onPress: onPress
			});
	});
var author$project$Framework$Modifier$Danger = {$: 'Danger'};
var author$project$Framework$Modifier$Disabled = {$: 'Disabled'};
var author$project$Framework$Modifier$Info = {$: 'Info'};
var author$project$Framework$Modifier$Jumbo = {$: 'Jumbo'};
var author$project$Framework$Modifier$Large = {$: 'Large'};
var author$project$Framework$Modifier$Loading = {$: 'Loading'};
var author$project$Framework$Modifier$Medium = {$: 'Medium'};
var author$project$Framework$Modifier$Muted = {$: 'Muted'};
var author$project$Framework$Modifier$Outlined = {$: 'Outlined'};
var author$project$Framework$Modifier$Primary = {$: 'Primary'};
var author$project$Framework$Modifier$Small = {$: 'Small'};
var author$project$Framework$Modifier$Success = {$: 'Success'};
var author$project$Framework$Modifier$Waiting = {$: 'Waiting'};
var author$project$Framework$Modifier$Warning = {$: 'Warning'};
var author$project$Framework$Button$introspection = function () {
	var buttonText = 'Button';
	return {
		description: 'Buttons accept a list of modifiers, a Maybe msg (for example: \"Just DoSomething\") and the text to display inside the button.',
		name: 'Buttons',
		signature: 'List Modifier -> Maybe msg -> String -> Element msg',
		variations: _List_fromArray(
			[
				_Utils_Tuple2(
				'States',
				_List_fromArray(
					[
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Primary]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Primary, author$project$Framework$Modifier$Outlined]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary, Outlined ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Primary, author$project$Framework$Modifier$Loading]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary, Loading ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Primary, author$project$Framework$Modifier$Waiting]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary, Waiting ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Primary, author$project$Framework$Modifier$Disabled]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary, Disabled ] Nothing \"' + (buttonText + '\"'))
					])),
				_Utils_Tuple2(
				'Colors',
				_List_fromArray(
					[
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Muted]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Muted ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Primary]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Success]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Success ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Info]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Info ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Warning]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Warning ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Danger]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Danger ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(author$project$Framework$Button$button, _List_Nil, elm$core$Maybe$Nothing, buttonText),
						'button [] Nothing \"' + (buttonText + '\"'))
					])),
				_Utils_Tuple2(
				'Sizes',
				_List_fromArray(
					[
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Small]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Small ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(author$project$Framework$Button$button, _List_Nil, elm$core$Maybe$Nothing, buttonText),
						'button [] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Medium]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Medium ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Large]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Large ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Jumbo]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Jumbo ] Nothing \"' + (buttonText + '\"'))
					])),
				_Utils_Tuple2(
				'Composed',
				_List_fromArray(
					[
						_Utils_Tuple2(
						A2(
							author$project$Element$Input$button,
							author$project$Framework$Button$buttonAttr(
								_List_fromArray(
									[author$project$Framework$Modifier$Primary])),
							{
								label: author$project$Element$text('button'),
								onPress: elm$core$Maybe$Nothing
							}),
						'-- This is the longest form for\n-- button [ Primary ] Nothing "Button"\n\nInput.button (buttonAttr [ Primary ]) <|\n    { onPress = Nothing, label = text "Button" }'),
						_Utils_Tuple2(
						A2(
							author$project$Element$el,
							author$project$Framework$Button$buttonAttr(
								_List_fromArray(
									[author$project$Framework$Modifier$Primary])),
							author$project$Element$text('Button')),
						'-- Is possible to use the button\n-- styling also with other elements,\n-- for example with "el":\n\nel (buttonAttr [ Primary ]) <|\n    text "Button\"'),
						_Utils_Tuple2(
						A2(
							author$project$Element$el,
							author$project$Framework$Button$buttonAttr(
								_List_fromArray(
									[author$project$Framework$Modifier$Danger, author$project$Framework$Modifier$Outlined, author$project$Framework$Modifier$Medium])),
							author$project$Element$text('Button')),
						'el (buttonAttr [ Danger, Outlined, Medium ]) <| text \"Button\"'),
						_Utils_Tuple2(
						A2(
							author$project$Element$column,
							_Utils_ap(
								author$project$Framework$Button$buttonAttr(
									_List_fromArray(
										[author$project$Framework$Modifier$Warning])),
								_List_fromArray(
									[
										author$project$Element$spacing(10)
									])),
							_List_fromArray(
								[
									author$project$Element$text('Row 1'),
									author$project$Element$text('Row 2')
								])),
						'column (buttonAttr [ Warning ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ]'),
						_Utils_Tuple2(
						A2(
							author$project$Element$column,
							_Utils_ap(
								author$project$Framework$Button$buttonAttr(
									_List_fromArray(
										[author$project$Framework$Modifier$Warning, author$project$Framework$Modifier$Waiting])),
								_List_fromArray(
									[
										author$project$Element$spacing(10)
									])),
							_List_fromArray(
								[
									author$project$Element$text('Row 1'),
									author$project$Element$text('Row 2')
								])),
						'column (buttonAttr [ Warning, Waiting ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ]'),
						_Utils_Tuple2(
						A2(
							author$project$Element$row,
							_Utils_ap(
								author$project$Framework$Button$buttonAttr(
									_List_fromArray(
										[author$project$Framework$Modifier$Info])),
								_List_fromArray(
									[
										author$project$Element$spacing(10)
									])),
							_List_fromArray(
								[
									author$project$Element$text('Col 1'),
									author$project$Element$text('Col 2')
								])),
						'row (buttonAttr [ Info ] ++ [ spacing 10 ]) [ text "Col 1", text "Col 2" ]'),
						_Utils_Tuple2(
						A2(
							author$project$Element$Input$button,
							author$project$Framework$Button$buttonAttr(
								_List_fromArray(
									[author$project$Framework$Modifier$Primary, author$project$Framework$Modifier$Danger])),
							{
								label: author$project$Element$text('button'),
								onPress: elm$core$Maybe$Nothing
							}),
						'-- If conflicting modifiers are given,\n-- only the last one is taken in consideration\n\nInput.button (buttonAttr [ Primary, Danger ]) <|\n    { onPress = Nothing, label = text "button" }')
					])),
				_Utils_Tuple2(
				'Disabled',
				_List_fromArray(
					[
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Disabled, author$project$Framework$Modifier$Muted]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Muted ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Disabled, author$project$Framework$Modifier$Primary]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Disabled, author$project$Framework$Modifier$Success]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Success ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Disabled, author$project$Framework$Modifier$Info]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Info ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Disabled, author$project$Framework$Modifier$Warning]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Warning ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Disabled, author$project$Framework$Modifier$Danger]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Danger ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[author$project$Framework$Modifier$Disabled]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [] Nothing \"' + (buttonText + '\"'))
					])),
				_Utils_Tuple2(
				'Button Link',
				_List_fromArray(
					[
						_Utils_Tuple2(
						A3(author$project$Framework$Button$buttonLink, _List_Nil, 'http://example.com', 'Button Link'),
						'( buttonLink [ Small ] "http://example.com" "Button Link" ')
					])),
				_Utils_Tuple2(
				'Button Width',
				_List_fromArray(
					[
						_Utils_Tuple2(
						A3(author$project$Framework$Button$button, _List_Nil, elm$core$Maybe$Nothing, 'Button'),
						'button [] Nothing "Button" '),
						_Utils_Tuple2(
						A4(author$project$Framework$Button$buttonWidth, _List_Nil, elm$core$Maybe$Nothing, 'ButtonWidth 200', 200),
						'buttonWidth [] Nothing "ButtonWidth 200" 200'),
						_Utils_Tuple2(
						A4(author$project$Framework$Button$buttonWidth, _List_Nil, elm$core$Maybe$Nothing, 'ButtonWidth 300', 300),
						'buttonWidth [] Nothing "ButtonWidth 300" 300'),
						_Utils_Tuple2(
						A4(author$project$Framework$Button$buttonWidth, _List_Nil, elm$core$Maybe$Nothing, 'ButtonWidth of 200px with very long text', 200),
						'buttonWidth [] Nothing "ButtonWidth of 200px with very long text" 200'),
						_Utils_Tuple2(
						A4(author$project$Framework$Button$buttonLinkWidth, _List_Nil, 'http://example.com', 'ButtonWidthLink 300', 300),
						'buttonLinkWidth [] "http://example.com" "ButtonWidthLink 300" 300')
					]))
			])
	};
}();
var author$project$Element$padding = function (x) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$padding,
		A4(author$project$Internal$Model$PaddingStyle, x, x, x, x));
};
var author$project$ColorElement$rgba = F4(
	function (r, g, b, a) {
		return author$project$Color$toElementColor(
			A4(author$project$Color$rgba, r, g, b, a));
	});
var author$project$Element$Border$shadow = function (shade) {
	return author$project$Internal$Model$BoxShadow(
		{blur: shade.blur, color: shade.color, inset: false, offset: shade.offset, size: shade.size});
};
var author$project$Framework$Card$cardCommonAttr = _List_fromArray(
	[
		author$project$Element$Border$shadow(
		{
			blur: 10,
			color: A4(author$project$ColorElement$rgba, 0, 0, 0, 5.0e-2),
			offset: _Utils_Tuple2(0, 2),
			size: 1
		}),
		author$project$Element$Border$width(1),
		author$project$Element$Border$color(author$project$Framework$Color$grey_lighter),
		author$project$Element$Background$color(author$project$Framework$Color$white),
		author$project$Element$Border$rounded(4)
	]);
var author$project$Framework$Card$simple = function (content) {
	return A2(
		author$project$Element$el,
		_Utils_ap(
			author$project$Framework$Card$cardCommonAttr,
			_List_fromArray(
				[
					author$project$Element$padding(20),
					author$project$Element$width(author$project$Element$fill),
					author$project$Element$height(author$project$Element$shrink)
				])),
		content);
};
var author$project$Element$Border$widthEach = function (_n0) {
	var bottom = _n0.bottom;
	var top = _n0.top;
	var left = _n0.left;
	var right = _n0.right;
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$borderWidth,
		A3(
			author$project$Internal$Model$Single,
			'border-' + (elm$core$String$fromInt(top) + ('-' + (elm$core$String$fromInt(right) + (elm$core$String$fromInt(bottom) + ('-' + elm$core$String$fromInt(left)))))),
			'border-width',
			elm$core$String$fromInt(top) + ('px ' + (elm$core$String$fromInt(right) + ('px ' + (elm$core$String$fromInt(bottom) + ('px ' + (elm$core$String$fromInt(left) + 'px'))))))));
};
var author$project$Framework$Color$grey = author$project$Framework$Configuration$conf.color.grey;
var author$project$Framework$Color$grey_light = author$project$Framework$Configuration$conf.color.grey_light;
var author$project$Framework$Card$simpleWithTitle = F3(
	function (title, subTitle, content) {
		return A2(
			author$project$Element$column,
			_Utils_ap(
				author$project$Framework$Card$cardCommonAttr,
				_List_fromArray(
					[
						author$project$Element$Border$width(1),
						author$project$Element$width(author$project$Element$fill),
						author$project$Element$height(author$project$Element$shrink)
					])),
			_List_fromArray(
				[
					A2(
					author$project$Element$el,
					_List_fromArray(
						[
							author$project$Element$padding(10),
							author$project$Element$Border$widthEach(
							{bottom: 1, left: 0, right: 0, top: 0}),
							author$project$Element$Border$color(author$project$Framework$Color$grey_light),
							author$project$Element$width(author$project$Element$fill)
						]),
					A2(
						author$project$Element$row,
						_List_fromArray(
							[
								author$project$Element$spacing(10)
							]),
						_List_fromArray(
							[
								A2(
								author$project$Element$el,
								_List_fromArray(
									[author$project$Element$Font$bold]),
								author$project$Element$text(title)),
								A2(
								author$project$Element$el,
								_List_fromArray(
									[
										author$project$Element$Font$color(author$project$Framework$Color$grey)
									]),
								author$project$Element$text(subTitle))
							]))),
					A2(
					author$project$Element$el,
					_List_fromArray(
						[
							author$project$Element$padding(20),
							author$project$Element$width(author$project$Element$fill)
						]),
					content)
				]));
	});
var author$project$Framework$Card$introspection = {
	description: 'Wrapper for content',
	name: 'Cards',
	signature: '',
	variations: _List_fromArray(
		[
			_Utils_Tuple2(
			'Flipping',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: Cards.example1'),
					'')
				])),
			_Utils_Tuple2(
			'Simple with Title',
			_List_fromArray(
				[
					_Utils_Tuple2(
					A3(
						author$project$Framework$Card$simpleWithTitle,
						'Simple',
						'with Title',
						author$project$Element$text('Content')),
					'simpleWithTitle "Simple" "with Title" <|\ntext "Content\"')
				])),
			_Utils_Tuple2(
			'Simple',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Framework$Card$simple(
						author$project$Element$text('Content')),
					'simple <| text "Content\"')
				]))
		])
};
var author$project$Framework$Color$background = author$project$Framework$Configuration$conf.color.background;
var author$project$Framework$Color$black = author$project$Framework$Configuration$conf.color.black;
var author$project$Framework$Color$black_bis = author$project$Framework$Configuration$conf.color.black_bis;
var author$project$Framework$Color$black_ter = author$project$Framework$Configuration$conf.color.black_ter;
var author$project$Framework$Color$blue = author$project$Framework$Configuration$conf.color.blue;
var author$project$Framework$Color$border = author$project$Framework$Configuration$conf.color.border;
var author$project$Framework$Color$border_hover = author$project$Framework$Configuration$conf.color.border_hover;
var author$project$Framework$Color$code = author$project$Framework$Configuration$conf.color.code;
var author$project$Framework$Color$code_background = author$project$Framework$Configuration$conf.color.code_background;
var author$project$Framework$Color$cyan = author$project$Framework$Configuration$conf.color.cyan;
var author$project$Framework$Color$dark = author$project$Framework$Configuration$conf.color.dark;
var author$project$Framework$Color$green = author$project$Framework$Configuration$conf.color.green;
var author$project$Framework$Color$grey_darker = author$project$Framework$Configuration$conf.color.grey_darker;
var author$project$Framework$Color$light = author$project$Framework$Configuration$conf.color.light;
var author$project$Framework$Color$link = author$project$Framework$Configuration$conf.color.link;
var author$project$Framework$Color$link_active = author$project$Framework$Configuration$conf.color.link_active;
var author$project$Framework$Color$link_active_border = author$project$Framework$Configuration$conf.color.link_active_border;
var author$project$Framework$Color$link_focus = author$project$Framework$Configuration$conf.color.link_focus;
var author$project$Framework$Color$link_focus_border = author$project$Framework$Configuration$conf.color.link_focus_border;
var author$project$Framework$Color$link_hover = author$project$Framework$Configuration$conf.color.link_hover;
var author$project$Framework$Color$link_hover_border = author$project$Framework$Configuration$conf.color.link_hover_border;
var author$project$Framework$Color$link_invert = author$project$Framework$Configuration$conf.color.link_invert;
var author$project$Framework$Color$link_visited = author$project$Framework$Configuration$conf.color.link_visited;
var author$project$Framework$Color$orange = author$project$Framework$Configuration$conf.color.orange;
var author$project$Framework$Color$pre = author$project$Framework$Configuration$conf.color.pre;
var author$project$Framework$Color$pre_background = author$project$Framework$Configuration$conf.color.pre_background;
var author$project$Framework$Color$purple = author$project$Framework$Configuration$conf.color.purple;
var author$project$Framework$Color$red = author$project$Framework$Configuration$conf.color.red;
var author$project$Framework$Color$text = author$project$Framework$Configuration$conf.color.text;
var author$project$Framework$Color$text_light = author$project$Framework$Configuration$conf.color.text_light;
var author$project$Framework$Color$text_strong = author$project$Framework$Configuration$conf.color.text_strong;
var author$project$Framework$Color$turquoise = author$project$Framework$Configuration$conf.color.turquoise;
var author$project$Framework$Color$usageWrapper = function (cl) {
	return A2(
		author$project$Element$el,
		_List_fromArray(
			[
				author$project$Element$Background$color(cl),
				author$project$Element$width(
				author$project$Element$px(200)),
				author$project$Element$padding(10),
				author$project$Element$Border$rounded(5)
			]),
		A2(author$project$Element$column, _List_Nil, _List_Nil));
};
var author$project$Framework$Color$white_bis = author$project$Framework$Configuration$conf.color.white_bis;
var author$project$Framework$Color$white_ter = author$project$Framework$Configuration$conf.color.white_ter;
var author$project$Framework$Color$yellow = author$project$Framework$Configuration$conf.color.yellow;
var author$project$Framework$Color$introspection = {
	description: '',
	name: 'Colors',
	signature: 'Element.Color',
	variations: _List_fromArray(
		[
			_Utils_Tuple2(
			'Colors',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$orange),
					'orange'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$yellow),
					'yellow'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$green),
					'green'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$turquoise),
					'turquoise'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$cyan),
					'cyan'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$blue),
					'blue'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$purple),
					'purple'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$red),
					'red')
				])),
			_Utils_Tuple2(
			'Gray Scale',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$black),
					'black'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$black_bis),
					'black_bis'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$black_ter),
					'black_ter'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$grey_darker),
					'grey_darker'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$grey_dark),
					'grey_dark'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$grey),
					'grey'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$grey_light),
					'grey_light'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$grey_lighter),
					'grey_lighter'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$white_ter),
					'white_ter'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$white_bis),
					'white_bis'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$white),
					'white')
				])),
			_Utils_Tuple2(
			'Derived',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$primary),
					'primary'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$info),
					'info'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$success),
					'success'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$warning),
					'warning'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$danger),
					'danger'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$light),
					'light'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$dark),
					'dark')
				])),
			_Utils_Tuple2(
			'Fonts',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$text),
					'text'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$text_light),
					'text_light'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$text_strong),
					'text_strong'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$code),
					'code'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$code_background),
					'code_background'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$pre),
					'pre'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$pre_background),
					'pre_background')
				])),
			_Utils_Tuple2(
			'Links',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$link),
					'link'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$link_invert),
					'link_invert'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$link_visited),
					'link_visited'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$link_hover),
					'link_hover'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$link_hover_border),
					'link_hover_border'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$link_focus),
					'link_focus'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$link_focus_border),
					'link_focus_border'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$link_active),
					'link_active'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$link_active_border),
					'link_active_border')
				])),
			_Utils_Tuple2(
			'Others',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$background),
					'background'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$border),
					'border'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$border_hover),
					'border_hover'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$transparent),
					'transparent'),
					_Utils_Tuple2(
					author$project$Framework$Color$usageWrapper(author$project$Framework$Color$muted),
					'muted')
				]))
		])
};
var author$project$Framework$FormField$introspection = {
	description: 'List of elements for Web Forms',
	name: 'Fields',
	signature: '',
	variations: _List_fromArray(
		[
			_Utils_Tuple2(
			'Email',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: Form.example1'),
					'')
				]))
		])
};
var author$project$Framework$FormFieldWithPattern$introspection = {
	description: 'List of elements for Web Forms',
	name: 'Fields With Patterns',
	signature: '',
	variations: _List_fromArray(
		[
			_Utils_Tuple2(
			'Phone number USA',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: FormFieldWithPattern.example1'),
					'')
				])),
			_Utils_Tuple2(
			'Credit Card number',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: FormFieldWithPattern.example2'),
					'')
				])),
			_Utils_Tuple2(
			'4 Digit Code',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: FormFieldWithPattern.example3'),
					'')
				]))
		])
};
var author$project$Framework$Icon$arrows = F2(
	function (_n0, size) {
		return author$project$Element$html(
			A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$viewBox('0 0 490 490'),
						elm$svg$Svg$Attributes$height(
						elm$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$d('M112 97c72-65 181-66 254-7l-58 3c-8 0-13 6-13 14 0 7 6 13 13 13h1l89-4c7 0 13-6 13-13v-2l-3-88a14 14 0 0 0-27 1l2 55c-36-29-81-47-129-49A222 222 0 0 0 27 294a13 13 0 0 0 17 10c7-2 11-9 9-16-16-70 6-143 59-191zm350 99a14 14 0 0 0-26 6 195 195 0 0 1-314 196l59-5a13 13 0 1 0-3-27l-88 8c-8 1-13 7-13 15l8 88c1 7 7 13 14 13h1c7-1 13-8 12-15l-5-54a221 221 0 0 0 289-8c60-55 86-138 66-217z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$chevronDown = F2(
	function (_n0, size) {
		return author$project$Element$html(
			A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$viewBox('0 0 256 256'),
						elm$svg$Svg$Attributes$height(
						elm$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$d('M225.81 48.9L128 146.73 30.19 48.91 0 79.09l128 128 128-128z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$exitFullscreen = F2(
	function (_n0, size) {
		return author$project$Element$html(
			A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						A2(
						elm$html$Html$Attributes$style,
						'height',
						elm$core$String$fromInt(size) + 'px'),
						elm$svg$Svg$Attributes$viewBox('0 0 32 32')
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill('#030104'),
								elm$svg$Svg$Attributes$d('M25 27l4 5 3-3-5-4 5-5H20v12zM0 12h12V0L7 5 3 0 0 3l5 4zm0 17l3 3 4-5 5 5V20H0l5 5zm20-17h12l-5-5 5-4-3-3-4 5-5-5z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$fullscreen = F2(
	function (_n0, size) {
		return author$project$Element$html(
			A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						A2(
						elm$html$Html$Attributes$style,
						'height',
						elm$core$String$fromInt(size) + 'px'),
						elm$svg$Svg$Attributes$viewBox('0 0 533 533')
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$d('M533 0v217l-83-84-100 100-50-50L400 83 317 0h216zM233 350L133 450l84 83H0V317l83 83 100-100 50 50z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$hide = F2(
	function (cl, size) {
		return author$project$Element$html(
			A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$viewBox('0 0 512 512'),
						elm$svg$Svg$Attributes$height(
						elm$core$String$fromInt(size)),
						elm$svg$Svg$Attributes$width(
						elm$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M506 241l-89-89-14-13-258 258a227 227 0 0 0 272-37l89-89c8-8 8-22 0-30zM256 363a21 21 0 0 1 0-43c35 0 64-29 64-64a21 21 0 0 1 43 0c0 59-48 107-107 107zM95 152L6 241c-8 8-8 22 0 30l89 89 14 13 258-258c-86-49-198-37-272 37zm161 40c-35 0-64 29-64 64a21 21 0 0 1-43 0c0-59 48-107 107-107a21 21 0 0 1 0 43z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$home = F2(
	function (_n0, size) {
		return author$project$Element$html(
			A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						A2(
						elm$html$Html$Attributes$style,
						'height',
						elm$core$String$fromInt(size) + 'px'),
						elm$svg$Svg$Attributes$viewBox('0 0 34.94 32.63')
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$d('M34.94 15.58L17.24 0 0 15.65l1.5 1.66 2.14-1.92v17.25h27.68V15.38l2.14 1.88zM14.8 29.93V21.6h5.35v8.34zm14.27.45H22.4v-11h-9.84v11H5.88v-17L17.25 3l11.82 10.4z'),
								elm$svg$Svg$Attributes$fill('#262626'),
								elm$svg$Svg$Attributes$id('_01')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$mobileNotification = F2(
	function (cl, size) {
		return author$project$Element$html(
			A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$viewBox('0 0 60 60'),
						elm$svg$Svg$Attributes$height(
						elm$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M20 49a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM17 5h4a1 1 0 1 0 0-2h-4a1 1 0 1 0 0 2zm7 0h1a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2z')
							]),
						_List_Nil),
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M56 12H38V4c0-2-2-4-4-4H8C6 0 4 2 4 4v52c0 2 2 4 4 4h26c2 0 4-2 4-4V33h18V12zM8 2h26l2 2v2H6V4l2-2zm26 56H8l-2-2v-8h30v8l-2 2zm2-12H6V8h30v4H18v21h4v7l9-7h5v13zm18-15H31l-7 5v-5h-4V14h34v17z')
							]),
						_List_Nil),
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M25 21h10a1 1 0 1 0 0-2H25a1 1 0 1 0 0 2zm-1 4l1 1h24a1 1 0 1 0 0-2H25l-1 1z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$mobileNotification2 = F2(
	function (cl, size) {
		return author$project$Element$html(
			A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$viewBox('0 0 31.68 31.68'),
						elm$svg$Svg$Attributes$height(
						elm$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M21.5 25.67H7V3.89h14.5v4.7h1.73V2.3a2.3 2.3 0 0 0-2.3-2.3H7.58a2.3 2.3 0 0 0-2.3 2.3v27.08a2.3 2.3 0 0 0 2.3 2.3h13.33a2.3 2.3 0 0 0 2.3-2.3V19.2H21.5v6.46zM19.4 1.44c.33 0 .59.27.59.6s-.26.58-.59.58-.59-.26-.59-.59.26-.59.59-.59zm-8.24.23h6.19v.67h-6.19v-.67zm5.91 27.55h-5.63V27.5h5.63v1.73z')
							]),
						_List_Nil),
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M13.05 9.3v9h1.56L13.05 22l4.54-3.7h8.81v-9H13.05zm12.21 7.86H17.2l-.32.25-1 .81.45-1.06H14.2v-6.71h11.07v6.7z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$mobileRinging = F2(
	function (cl, size) {
		var hexColor = author$project$Framework$ColorManipulation$colorToHex(cl);
		return author$project$Element$html(
			A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$viewBox('0 0 60 60'),
						elm$svg$Svg$Attributes$height(
						elm$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(hexColor),
								elm$svg$Svg$Attributes$d('M43 0H17c-2 0-4 2-4 4v52c0 2 2 4 4 4h26c2 0 4-2 4-4V4c0-2-2-4-4-4zM15 8h30v38H15V8zm2-6h26l2 2v2H15V4l2-2zm26 56H17l-2-2v-8h30v8l-2 2z')
							]),
						_List_Nil),
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(hexColor),
								elm$svg$Svg$Attributes$d('M30 49a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM26 5h4a1 1 0 1 0 0-2h-4a1 1 0 1 0 0 2zm7 0h1a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2zm24 0a1 1 0 1 0-2 1c4 4 4 10 0 14a1 1 0 1 0 2 1c4-5 4-12 0-16z')
							]),
						_List_Nil),
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(hexColor),
								elm$svg$Svg$Attributes$d('M52 7a1 1 0 1 0-1 1 7 7 0 0 1 0 10 1 1 0 1 0 1 1 8 8 0 0 0 0-12zM5 6a1 1 0 1 0-2-1c-4 4-4 11 0 16a1 1 0 0 0 2 0v-1C1 16 1 10 5 6z')
							]),
						_List_Nil),
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(hexColor),
								elm$svg$Svg$Attributes$d('M9 7H8a8 8 0 0 0 0 12 1 1 0 0 0 1 0v-2a7 7 0 0 1 0-9V7z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$pencil = F2(
	function (_n0, size) {
		return author$project$Element$html(
			A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						A2(
						elm$html$Html$Attributes$style,
						'height',
						elm$core$String$fromInt(size) + 'px'),
						elm$svg$Svg$Attributes$viewBox('0 0 529 529')
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$d('M329 89l107 108-272 272L57 361 329 89zm189-26l-48-48a48 48 0 0 0-67 0l-46 46 108 108 53-54c14-14 14-37 0-52zM0 513c-2 9 6 16 15 14l120-29L27 391 0 513z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$show = F2(
	function (cl, size) {
		return author$project$Element$html(
			A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$viewBox('0 0 512 512'),
						elm$svg$Svg$Attributes$height(
						elm$core$String$fromInt(size)),
						elm$svg$Svg$Attributes$width(
						elm$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M256 192a64 64 0 1 0 0 128 64 64 0 0 0 0-128zm250 49l-89-89c-89-89-233-89-322 0L6 241c-8 8-8 22 0 30l89 89a227 227 0 0 0 322 0l89-89c8-8 8-22 0-30zM256 363a107 107 0 1 1 0-214 107 107 0 0 1 0 214z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$introspection = {
	description: 'List of SVG icons',
	name: 'Icons',
	signature: 'Element.Color -> Int -> Element.Element msg',
	variations: _List_fromArray(
		[
			_Utils_Tuple2(
			'Icons',
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(author$project$Framework$Icon$pencil, author$project$Framework$Color$black, 32),
					'pencil black 32'),
					_Utils_Tuple2(
					A2(author$project$Framework$Icon$exitFullscreen, author$project$Framework$Color$black, 32),
					'exitFullscreen black 32'),
					_Utils_Tuple2(
					A2(author$project$Framework$Icon$fullscreen, author$project$Framework$Color$black, 32),
					'fullscreen black 32'),
					_Utils_Tuple2(
					A2(author$project$Framework$Icon$home, author$project$Framework$Color$black, 32),
					'home black 32'),
					_Utils_Tuple2(
					A2(author$project$Framework$Icon$hide, author$project$Framework$Color$black, 32),
					'hide black 32'),
					_Utils_Tuple2(
					A2(author$project$Framework$Icon$show, author$project$Framework$Color$black, 32),
					'show black 32'),
					_Utils_Tuple2(
					A2(author$project$Framework$Icon$mobileRinging, author$project$Framework$Color$black, 32),
					'mobileRinging black 32'),
					_Utils_Tuple2(
					A2(author$project$Framework$Icon$mobileNotification, author$project$Framework$Color$black, 32),
					'mobileNotification black 32'),
					_Utils_Tuple2(
					A2(author$project$Framework$Icon$mobileNotification2, author$project$Framework$Color$black, 32),
					'mobileNotification2 black 32'),
					_Utils_Tuple2(
					A2(author$project$Framework$Icon$chevronDown, author$project$Framework$Color$black, 32),
					'chevronDown black 32'),
					_Utils_Tuple2(
					A2(author$project$Framework$Icon$arrows, author$project$Framework$Color$black, 32),
					'arrows black 32')
				]))
		])
};
var author$project$Framework$Logo$Black = {$: 'Black'};
var author$project$Framework$Logo$ElmColorful = {$: 'ElmColorful'};
var author$project$Framework$Logo$LogoLucamug = {$: 'LogoLucamug'};
var author$project$Framework$Logo$introspection = {
	description: 'List of SVG logos',
	name: 'Logos',
	signature: '',
	variations: _List_fromArray(
		[
			_Utils_Tuple2(
			'Logos',
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(author$project$Framework$Logo$ElmColorful),
						100),
					'logo (LogoElm <| ElmColorful) 100'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(
							author$project$Framework$Logo$ElmColor(author$project$Framework$Logo$Orange)),
						100),
					'logo (LogoElm <| (ElmColor Orange) 100'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(
							author$project$Framework$Logo$ElmColor(author$project$Framework$Logo$Green)),
						100),
					'logo (LogoElm <| (ElmColor Green) 100'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(
							author$project$Framework$Logo$ElmColor(author$project$Framework$Logo$LightBlue)),
						100),
					'logo (LogoElm <| (ElmColor LightBlue) 100'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(
							author$project$Framework$Logo$ElmColor(author$project$Framework$Logo$Blue)),
						100),
					'logo (LogoElm <| (ElmColor Blue) 100'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(
							author$project$Framework$Logo$ElmColor(author$project$Framework$Logo$White)),
						100),
					'logo (LogoElm <| (ElmColor White) 100'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(
							author$project$Framework$Logo$ElmColor(author$project$Framework$Logo$Black)),
						100),
					'logo (LogoElm <| (ElmColor Black) 100'),
					_Utils_Tuple2(
					A2(author$project$Framework$Logo$logo, author$project$Framework$Logo$LogoLucamug, 100),
					'logo Lucamug 100')
				]))
		])
};
var author$project$Framework$Spinner$introspection = {
	description: 'List of SVG spinners',
	name: 'Spinners',
	signature: '',
	variations: _List_fromArray(
		[
			_Utils_Tuple2(
			'Spinners',
			_List_fromArray(
				[
					_Utils_Tuple2(
					A3(author$project$Framework$Spinner$spinner, author$project$Framework$Spinner$ThreeCircles, 32, author$project$ColorElement$black),
					'spinner ThreeCircles 32 Color.black'),
					_Utils_Tuple2(
					A3(author$project$Framework$Spinner$spinner, author$project$Framework$Spinner$Rotation, 32, author$project$ColorElement$black),
					'spinner Rotation 32 Color.black')
				]))
		])
};
var author$project$Element$decorativeImage = F2(
	function (attrs, _n0) {
		var src = _n0.src;
		var imageAttributes = A2(
			elm$core$List$filter,
			function (a) {
				switch (a.$) {
					case 'Width':
						return true;
					case 'Height':
						return true;
					default:
						return false;
				}
			},
			attrs);
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(elm$core$List$cons, author$project$Element$clip, attrs),
			author$project$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A5(
						author$project$Internal$Model$element,
						author$project$Internal$Model$noStyleSheet,
						author$project$Internal$Model$asEl,
						elm$core$Maybe$Just('img'),
						_Utils_ap(
							imageAttributes,
							_List_fromArray(
								[
									author$project$Internal$Model$Attr(
									elm$html$Html$Attributes$src(src)),
									author$project$Internal$Model$Attr(
									elm$html$Html$Attributes$alt(''))
								])),
						author$project$Internal$Model$Unkeyed(_List_Nil))
					])));
	});
var elm$html$Html$Attributes$download = function (fileName) {
	return A2(elm$html$Html$Attributes$stringProperty, 'download', fileName);
};
var author$project$Element$download = F2(
	function (attrs, _n0) {
		var url = _n0.url;
		var label = _n0.label;
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asEl,
			elm$core$Maybe$Just('a'),
			A2(
				elm$core$List$cons,
				author$project$Internal$Model$Attr(
					elm$html$Html$Attributes$href(url)),
				A2(
					elm$core$List$cons,
					author$project$Internal$Model$Attr(
						elm$html$Html$Attributes$download('')),
					A2(
						elm$core$List$cons,
						author$project$Element$width(author$project$Element$shrink),
						A2(
							elm$core$List$cons,
							author$project$Element$height(author$project$Element$shrink),
							A2(
								elm$core$List$cons,
								author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentCenterX),
								A2(
									elm$core$List$cons,
									author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentCenterY),
									attrs)))))),
			author$project$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var author$project$Element$downloadAs = F2(
	function (attrs, _n0) {
		var url = _n0.url;
		var filename = _n0.filename;
		var label = _n0.label;
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asEl,
			elm$core$Maybe$Just('a'),
			A2(
				elm$core$List$cons,
				author$project$Internal$Model$Attr(
					elm$html$Html$Attributes$href(url)),
				A2(
					elm$core$List$cons,
					author$project$Internal$Model$Attr(
						elm$html$Html$Attributes$download(filename)),
					A2(
						elm$core$List$cons,
						author$project$Element$width(author$project$Element$shrink),
						A2(
							elm$core$List$cons,
							author$project$Element$height(author$project$Element$shrink),
							A2(
								elm$core$List$cons,
								author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentCenterX),
								A2(
									elm$core$List$cons,
									author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentCenterY),
									attrs)))))),
			author$project$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var elm$html$Html$Attributes$target = elm$html$Html$Attributes$stringProperty('target');
var author$project$Element$newTabLink = F2(
	function (attrs, _n0) {
		var url = _n0.url;
		var label = _n0.label;
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asEl,
			elm$core$Maybe$Just('a'),
			A2(
				elm$core$List$cons,
				author$project$Internal$Model$Attr(
					elm$html$Html$Attributes$href(url)),
				A2(
					elm$core$List$cons,
					author$project$Internal$Model$Attr(
						elm$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						elm$core$List$cons,
						author$project$Internal$Model$Attr(
							elm$html$Html$Attributes$target('_blank')),
						A2(
							elm$core$List$cons,
							author$project$Element$width(author$project$Element$shrink),
							A2(
								elm$core$List$cons,
								author$project$Element$height(author$project$Element$shrink),
								A2(
									elm$core$List$cons,
									author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentCenterX),
									A2(
										elm$core$List$cons,
										author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.contentCenterY),
										attrs))))))),
			author$project$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var author$project$Framework$StyleElements$introspection = {
	description: 'This is a raw list of all elements of style-elements as they are',
	name: 'Style-Elements',
	signature: '',
	variations: _List_fromArray(
		[
			_Utils_Tuple2(
			'Basic Elements',
			_List_fromArray(
				[
					_Utils_Tuple2(author$project$Element$none, 'none'),
					_Utils_Tuple2(
					author$project$Element$text('text'),
					'text "text\"'),
					_Utils_Tuple2(
					A2(
						author$project$Element$el,
						_List_Nil,
						author$project$Element$text('el')),
					'el [] <| text "el\"')
				])),
			_Utils_Tuple2(
			'Rows and Columns',
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						author$project$Element$row,
						_List_fromArray(
							[
								author$project$Element$spacing(20)
							]),
						_List_fromArray(
							[
								author$project$Element$text('item 1'),
								author$project$Element$text('item 2')
							])),
					'row [ spacing 20 ] [ text "item 1", text "item 2" ]'),
					_Utils_Tuple2(
					A2(
						author$project$Element$column,
						_List_fromArray(
							[
								author$project$Element$spacing(20)
							]),
						_List_fromArray(
							[
								author$project$Element$text('item 1'),
								author$project$Element$text('item 2')
							])),
					'column [ spacing 20 ] [ text "item 1", text "item 2" ]')
				])),
			_Utils_Tuple2(
			'Links and Images',
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						author$project$Element$link,
						_List_Nil,
						{
							label: author$project$Element$text('link'),
							url: 'http://example.com'
						}),
					'link [] { url = "http://example.com", label = text "label" }'),
					_Utils_Tuple2(
					A2(
						author$project$Element$newTabLink,
						_List_Nil,
						{
							label: author$project$Element$text('newTabLink'),
							url: 'http://example.com'
						}),
					'newTabLink [] { url = "http://example.com", label = text "newTabLink" }'),
					_Utils_Tuple2(
					A2(
						author$project$Element$download,
						_List_Nil,
						{
							label: author$project$Element$text('download'),
							url: 'http://example.com'
						}),
					'download [] { url = "http://example.com", label = text "download" }'),
					_Utils_Tuple2(
					A2(
						author$project$Element$downloadAs,
						_List_Nil,
						{
							filename: 'filename',
							label: author$project$Element$text('downloadAs'),
							url: 'http://example.com'
						}),
					'downloadAs [] { url = "http://example.com", label = text "downloadAs", filename = "filename" }'),
					_Utils_Tuple2(
					A2(
						author$project$Element$image,
						_List_Nil,
						{description: 'description', src: 'http://via.placeholder.com/200x100/ff3399/000'}),
					'image [] { src = "http://via.placeholder.com/200x100/ff3399/000", description = "description" }'),
					_Utils_Tuple2(
					A2(
						author$project$Element$decorativeImage,
						_List_Nil,
						{src: 'http://via.placeholder.com/200x100/ff3399/000'}),
					'decorativeImage [] { src = "http://via.placeholder.com/200x100/ff3399/000" }')
				]))
		])
};
var author$project$Framework$StyleElementsInput$introspection = {
	description: 'This is a raw list of all elements of style-elements as they are',
	name: 'Style-Elements Input',
	signature: '',
	variations: _List_fromArray(
		[
			_Utils_Tuple2(
			'Button',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example0'),
					'')
				])),
			_Utils_Tuple2(
			'Checkbox',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example2'),
					'')
				])),
			_Utils_Tuple2(
			'Radio',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example3'),
					'')
				])),
			_Utils_Tuple2(
			'Radio Row',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example4'),
					'')
				])),
			_Utils_Tuple2(
			'Text',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example1'),
					'')
				])),
			_Utils_Tuple2(
			'Username',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example5'),
					'')
				])),
			_Utils_Tuple2(
			'New Password',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example6'),
					'')
				])),
			_Utils_Tuple2(
			'Current Password',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example7'),
					'')
				])),
			_Utils_Tuple2(
			'Email',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example8'),
					'')
				])),
			_Utils_Tuple2(
			'Search',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example9'),
					'')
				])),
			_Utils_Tuple2(
			'Multiline',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example10'),
					'')
				])),
			_Utils_Tuple2(
			'Multiline with spellcheck',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Element$text('special: example11'),
					'')
				]))
		])
};
var author$project$Framework$Typography$SizeH1 = {$: 'SizeH1'};
var author$project$Internal$Model$Left = {$: 'Left'};
var author$project$Element$alignLeft = author$project$Internal$Model$AlignX(author$project$Internal$Model$Left);
var author$project$Element$paddingEach = function (_n0) {
	var top = _n0.top;
	var right = _n0.right;
	var bottom = _n0.bottom;
	var left = _n0.left;
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$padding,
		A4(author$project$Internal$Model$PaddingStyle, top, right, bottom, left));
};
var author$project$Internal$Model$Heading = function (a) {
	return {$: 'Heading', a: a};
};
var author$project$Element$Region$heading = function ($) {
	return author$project$Internal$Model$Describe(
		author$project$Internal$Model$Heading($));
};
var author$project$Framework$Typography$fontSize = function (level) {
	switch (level.$) {
		case 'SizeH1':
			return 32;
		case 'SizeH2':
			return 28;
		case 'SizeH3':
			return 24;
		case 'SizeH4':
			return 20;
		case 'SizeH5':
			return 16;
		case 'SizeH6':
			return 14;
		case 'SizeLead':
			return 24;
		case 'SizeSmall':
			return 14;
		default:
			return 12;
	}
};
var author$project$Framework$Typography$headingLevel = function (level) {
	switch (level.$) {
		case 'SizeH1':
			return 1;
		case 'SizeH2':
			return 2;
		case 'SizeH3':
			return 3;
		case 'SizeH4':
			return 4;
		case 'SizeH5':
			return 5;
		case 'SizeH6':
			return 6;
		default:
			return 5;
	}
};
var author$project$Framework$Typography$heading = F3(
	function (level, attributes, child) {
		return A2(
			author$project$Element$el,
			_Utils_ap(
				_List_fromArray(
					[
						author$project$Element$Region$heading(
						author$project$Framework$Typography$headingLevel(level)),
						author$project$Element$Font$size(
						author$project$Framework$Typography$fontSize(level)),
						author$project$Element$paddingEach(
						{bottom: 0, left: 0, right: 0, top: 0}),
						author$project$Element$alignLeft,
						author$project$Element$Font$bold
					]),
				attributes),
			child);
	});
var author$project$Framework$Typography$h1 = F2(
	function (listAttr, element) {
		return A3(author$project$Framework$Typography$heading, author$project$Framework$Typography$SizeH1, listAttr, element);
	});
var author$project$Framework$Typography$SizeH2 = {$: 'SizeH2'};
var author$project$Framework$Typography$h2 = author$project$Framework$Typography$heading(author$project$Framework$Typography$SizeH2);
var author$project$Framework$Typography$SizeH3 = {$: 'SizeH3'};
var author$project$Framework$Typography$h3 = author$project$Framework$Typography$heading(author$project$Framework$Typography$SizeH3);
var author$project$Framework$Typography$SizeH4 = {$: 'SizeH4'};
var author$project$Framework$Typography$h4 = author$project$Framework$Typography$heading(author$project$Framework$Typography$SizeH4);
var author$project$Framework$Typography$SizeH5 = {$: 'SizeH5'};
var author$project$Framework$Typography$h5 = author$project$Framework$Typography$heading(author$project$Framework$Typography$SizeH5);
var author$project$Framework$Typography$SizeH6 = {$: 'SizeH6'};
var author$project$Framework$Typography$h6 = author$project$Framework$Typography$heading(author$project$Framework$Typography$SizeH6);
var author$project$Framework$Typography$SizeExtraSmall = {$: 'SizeExtraSmall'};
var author$project$Framework$Typography$textSection = F3(
	function (level, attributes, child) {
		return A2(
			author$project$Element$el,
			A2(
				elm$core$List$cons,
				author$project$Element$Font$size(
					author$project$Framework$Typography$fontSize(level)),
				attributes),
			child);
	});
var author$project$Framework$Typography$textExtraSmall = author$project$Framework$Typography$textSection(author$project$Framework$Typography$SizeExtraSmall);
var author$project$Framework$Typography$SizeLead = {$: 'SizeLead'};
var author$project$Framework$Typography$textLead = author$project$Framework$Typography$textSection(author$project$Framework$Typography$SizeLead);
var author$project$Framework$Typography$SizeSmall = {$: 'SizeSmall'};
var author$project$Framework$Typography$textSmall = author$project$Framework$Typography$textSection(author$project$Framework$Typography$SizeSmall);
var author$project$Framework$Typography$introspection = {
	description: '',
	name: 'Typography',
	signature: 'List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg',
	variations: _List_fromArray(
		[
			_Utils_Tuple2(
			'Heading',
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h1,
						_List_Nil,
						author$project$Element$text('h1. Heading')),
					'h1 [] <| text "h1. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h2,
						_List_Nil,
						author$project$Element$text('h2. Heading')),
					'h2 [] <| text "h2. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h3,
						_List_Nil,
						author$project$Element$text('h3. Heading')),
					'h3 [] <| text "h3. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h4,
						_List_Nil,
						author$project$Element$text('h4. Heading')),
					'h4 [] <| text "h4. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h5,
						_List_Nil,
						author$project$Element$text('h5. Heading')),
					'h5 [] <| text "h5. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h6,
						_List_Nil,
						author$project$Element$text('h6. Heading')),
					'h6 [] <| text "h6. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$textLead,
						_List_Nil,
						author$project$Element$text('textLead')),
					'textLead [] <| text "textLead\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$textSmall,
						_List_Nil,
						author$project$Element$text('textSmall')),
					'textSmall [] <| text "textSmall\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$textExtraSmall,
						_List_Nil,
						author$project$Element$text('textExtraSmall')),
					'textExtraSmall [] <| text "textExtraSmall\"')
				]))
		])
};
var author$project$Framework$introspections = _List_fromArray(
	[
		_Utils_Tuple2(author$project$Framework$Color$introspection, true),
		_Utils_Tuple2(author$project$Framework$FormField$introspection, true),
		_Utils_Tuple2(author$project$Framework$FormFieldWithPattern$introspection, true),
		_Utils_Tuple2(author$project$Framework$Typography$introspection, true),
		_Utils_Tuple2(author$project$Framework$Card$introspection, true),
		_Utils_Tuple2(author$project$Framework$Button$introspection, true),
		_Utils_Tuple2(author$project$Framework$Spinner$introspection, true),
		_Utils_Tuple2(author$project$Framework$Logo$introspection, true),
		_Utils_Tuple2(author$project$Framework$Icon$introspection, true),
		_Utils_Tuple2(author$project$Framework$StyleElements$introspection, true),
		_Utils_Tuple2(author$project$Framework$StyleElementsInput$introspection, true)
	]);
var author$project$Framework$introspectionExample = function (id) {
	return {
		description: 'Description ' + id,
		name: 'Element ' + id,
		signature: 'Signature ' + id,
		variations: _List_fromArray(
			[
				_Utils_Tuple2(
				'Element ' + (id + ' - Example A'),
				_List_fromArray(
					[
						_Utils_Tuple2(
						author$project$Element$text('Element ' + (id + ' - Example A - Case 1')),
						'source A1'),
						_Utils_Tuple2(
						author$project$Element$text('Element ' + (id + ' - Example A - Case 2')),
						'source A2')
					])),
				_Utils_Tuple2(
				'Element ' + (id + ' - Example B'),
				_List_fromArray(
					[
						_Utils_Tuple2(
						author$project$Element$text('Element ' + (id + ' - Example B - Case 1')),
						'source B1'),
						_Utils_Tuple2(
						author$project$Element$text('Element ' + (id + ' - Example B - Case 2')),
						'source B2')
					]))
			])
	};
};
var author$project$Framework$introspectionsForDebugging = _List_fromArray(
	[
		_Utils_Tuple2(
		author$project$Framework$introspectionExample('ID 1'),
		true),
		_Utils_Tuple2(
		author$project$Framework$introspectionExample('ID 2'),
		true),
		_Utils_Tuple2(
		author$project$Framework$introspectionExample('ID 3'),
		true)
	]);
var author$project$Framework$Card$initModel = true;
var author$project$Framework$FormField$initModel = {focus: elm$core$Maybe$Nothing, valueEmail: ''};
var author$project$Framework$FormFieldWithPattern$initModel = {focus: elm$core$Maybe$Nothing, value: ''};
var author$project$Framework$StyleElementsInput$initModel = {
	checkbox: false,
	radio: elm$core$Maybe$Just('A'),
	text: ''
};
var author$project$Framework$initModel = F2(
	function (value, url) {
		var flag = author$project$Framework$decodeFlagFromJson(value);
		return {
			conf: author$project$Framework$initConf,
			introspections: author$project$Framework$debug ? author$project$Framework$introspections : author$project$Framework$introspectionsForDebugging,
			maybeWindowSize: flag,
			modelCards: author$project$Framework$Card$initModel,
			modelFormField: author$project$Framework$FormField$initModel,
			modelFormFieldWithPattern: author$project$Framework$FormFieldWithPattern$initModel,
			modelStyleElementsInput: author$project$Framework$StyleElementsInput$initModel,
			password: '',
			url: url
		};
	});
var author$project$Framework$init = function (_n0) {
	var url = _n0.url;
	var flags = _n0.flags;
	return _Utils_Tuple2(
		A2(author$project$Framework$initModel, flags, url),
		author$project$Framework$initCmd);
};
var author$project$Framework$MsgChangeUrl = function (a) {
	return {$: 'MsgChangeUrl', a: a};
};
var author$project$Framework$onNavigation = function (url) {
	return author$project$Framework$MsgChangeUrl(url);
};
var elm$core$Platform$Sub$batch = _Platform_batch;
var author$project$Framework$subscriptions = function (_n0) {
	return elm$core$Platform$Sub$batch(_List_Nil);
};
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Framework$Card$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(!model, elm$core$Platform$Cmd$none);
	});
var author$project$Framework$FormField$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Input':
				var field = msg.a;
				var value = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{valueEmail: value}),
					elm$core$Platform$Cmd$none);
			case 'OnFocus':
				var field = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							focus: elm$core$Maybe$Just(field)
						}),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{focus: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
		}
	});
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$fromString = function (string) {
	return A2(
		elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var elm$regex$Regex$never = _Regex_never;
var author$project$Framework$FormFieldWithPattern$regexNotDigit = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('[^0-9]'));
var author$project$Framework$FormFieldWithPattern$regexNotDigitsAtTheEnd = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('[^0-9]*$'));
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Framework$FormFieldWithPattern$append = F3(
	function (tokens, input, formatted) {
		append:
		while (true) {
			var maybeToken = elm$core$List$head(tokens);
			var appendInput = A2(
				elm$core$Maybe$withDefault,
				formatted,
				A2(
					elm$core$Maybe$map,
					A2(
						author$project$Framework$FormFieldWithPattern$append,
						A2(
							elm$core$Maybe$withDefault,
							_List_Nil,
							elm$core$List$tail(tokens)),
						A2(
							elm$core$Maybe$withDefault,
							_List_Nil,
							elm$core$List$tail(input))),
					A2(
						elm$core$Maybe$map,
						function (_char) {
							return _Utils_ap(
								formatted,
								elm$core$String$fromChar(_char));
						},
						elm$core$List$head(input))));
			if (maybeToken.$ === 'Nothing') {
				return formatted;
			} else {
				var token = maybeToken.a;
				if (token.$ === 'InputValue') {
					return appendInput;
				} else {
					var _char = token.a;
					var $temp$tokens = A2(
						elm$core$Maybe$withDefault,
						_List_Nil,
						elm$core$List$tail(tokens)),
						$temp$input = input,
						$temp$formatted = _Utils_ap(
						formatted,
						elm$core$String$fromChar(_char));
					tokens = $temp$tokens;
					input = $temp$input;
					formatted = $temp$formatted;
					continue append;
				}
			}
		}
	});
var author$project$Framework$FormFieldWithPattern$format = F2(
	function (tokens, input) {
		return elm$core$String$isEmpty(input) ? input : A3(
			author$project$Framework$FormFieldWithPattern$append,
			tokens,
			elm$core$String$toList(input),
			'');
	});
var author$project$Framework$FormFieldWithPattern$InputValue = {$: 'InputValue'};
var author$project$Framework$FormFieldWithPattern$Other = function (a) {
	return {$: 'Other', a: a};
};
var elm$core$Basics$or = _Basics_or;
var author$project$Framework$FormFieldWithPattern$tokenize = F2(
	function (inputChar, pattern) {
		return (_Utils_eq(pattern, inputChar) || _Utils_eq(
			pattern,
			_Utils_chr('_'))) ? author$project$Framework$FormFieldWithPattern$InputValue : author$project$Framework$FormFieldWithPattern$Other(pattern);
	});
var author$project$Framework$FormFieldWithPattern$parse = F2(
	function (inputChar, pattern) {
		return A2(
			elm$core$List$map,
			author$project$Framework$FormFieldWithPattern$tokenize(inputChar),
			elm$core$String$toList(pattern));
	});
var author$project$Framework$FormFieldWithPattern$result = F2(
	function (template, string) {
		return A2(
			author$project$Framework$FormFieldWithPattern$format,
			A2(
				author$project$Framework$FormFieldWithPattern$parse,
				_Utils_chr('0'),
				template),
			string);
	});
var elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var author$project$Framework$FormFieldWithPattern$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Input':
				var field = msg.a;
				var pattern = msg.b;
				var value = msg.c;
				var onlyDigits = A3(
					elm$regex$Regex$replace,
					author$project$Framework$FormFieldWithPattern$regexNotDigit,
					function (_n3) {
						return '';
					},
					value);
				var withPattern = A2(author$project$Framework$FormFieldWithPattern$result, pattern, onlyDigits);
				var removeCharactedAtTheEndIfNotNumbers = A3(
					elm$regex$Regex$replace,
					author$project$Framework$FormFieldWithPattern$regexNotDigitsAtTheEnd,
					function (_n2) {
						return '';
					},
					withPattern);
				return _Utils_Tuple2(
					function () {
						switch (field.$) {
							case 'FieldTelephone':
								return _Utils_update(
									model,
									{value: removeCharactedAtTheEndIfNotNumbers});
							case 'FieldCreditCard':
								return _Utils_update(
									model,
									{value: removeCharactedAtTheEndIfNotNumbers});
							default:
								return _Utils_update(
									model,
									{value: removeCharactedAtTheEndIfNotNumbers});
						}
					}(),
					elm$core$Platform$Cmd$none);
			case 'OnFocus':
				var field = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							focus: elm$core$Maybe$Just(field)
						}),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{focus: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Framework$StyleElementsInput$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Radio':
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							radio: elm$core$Maybe$Just(value)
						}),
					elm$core$Platform$Cmd$none);
			case 'Button':
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 'Input':
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{text: value}),
					elm$core$Platform$Cmd$none);
			default:
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{checkbox: value}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Framework$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'MsgChangeUrl':
				var url = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{url: url}),
					elm$core$Platform$Cmd$none);
			case 'MsgChangePassword':
				var password = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{password: password}),
					elm$core$Platform$Cmd$none);
			case 'MsgOpenAllSections':
				var intros = A2(
					elm$core$List$map,
					function (_n1) {
						var data = _n1.a;
						return _Utils_Tuple2(data, true);
					},
					model.introspections);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{introspections: intros}),
					elm$core$Platform$Cmd$none);
			case 'MsgCloseAllSections':
				var intros = A2(
					elm$core$List$map,
					function (_n2) {
						var data = _n2.a;
						return _Utils_Tuple2(data, false);
					},
					model.introspections);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{introspections: intros}),
					elm$core$Platform$Cmd$none);
			case 'MsgToggleSection':
				var dataName = msg.a;
				var toggle = function (_n3) {
					var data = _n3.a;
					var show = _n3.b;
					return _Utils_eq(data.name, dataName) ? _Utils_Tuple2(data, !show) : _Utils_Tuple2(data, show);
				};
				var intros = A2(elm$core$List$map, toggle, model.introspections);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{introspections: intros}),
					elm$core$Platform$Cmd$none);
			case 'MsgChangeWindowSize':
				var windowSize = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							maybeWindowSize: elm$core$Maybe$Just(windowSize)
						}),
					elm$core$Platform$Cmd$none);
			case 'MsgStyleElementsInput':
				var msg2 = msg.a;
				var _n4 = A2(author$project$Framework$StyleElementsInput$update, msg2, model.modelStyleElementsInput);
				var newModel = _n4.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{modelStyleElementsInput: newModel}),
					elm$core$Platform$Cmd$none);
			case 'MsgFormField':
				var msg2 = msg.a;
				var _n5 = A2(author$project$Framework$FormField$update, msg2, model.modelFormField);
				var newModel = _n5.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{modelFormField: newModel}),
					elm$core$Platform$Cmd$none);
			case 'MsgFormFieldWithPattern':
				var msg2 = msg.a;
				var _n6 = A2(author$project$Framework$FormFieldWithPattern$update, msg2, model.modelFormFieldWithPattern);
				var newModel = _n6.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{modelFormFieldWithPattern: newModel}),
					elm$core$Platform$Cmd$none);
			default:
				var msg2 = msg.a;
				var _n7 = A2(author$project$Framework$Card$update, msg2, model.modelCards);
				var newModel = _n7.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{modelCards: newModel}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Color$white = A3(author$project$Color$rgb, 230, 230, 230);
var author$project$ColorElement$white = author$project$Color$toElementColor(author$project$Color$white);
var author$project$Internal$Model$FocusStyleOption = function (a) {
	return {$: 'FocusStyleOption', a: a};
};
var author$project$Element$focusStyle = author$project$Internal$Model$FocusStyleOption;
var author$project$Internal$Model$OnlyDynamic = function (a) {
	return {$: 'OnlyDynamic', a: a};
};
var author$project$Internal$Model$StaticRootAndDynamic = function (a) {
	return {$: 'StaticRootAndDynamic', a: a};
};
var author$project$Internal$Model$AllowHover = {$: 'AllowHover'};
var author$project$Internal$Model$Layout = {$: 'Layout'};
var author$project$Internal$Model$focusDefaultStyle = {
	backgroundColor: elm$core$Maybe$Nothing,
	borderColor: elm$core$Maybe$Nothing,
	shadow: elm$core$Maybe$Just(
		{
			blur: 3,
			color: A4(author$project$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			offset: _Utils_Tuple2(0, 0),
			size: 3
		})
};
var author$project$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 'HoverOption':
					var hoverable = opt.a;
					var _n4 = record.hover;
					if (_n4.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								hover: elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 'FocusStyleOption':
					var focusStyle = opt.a;
					var _n5 = record.focus;
					if (_n5.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								focus: elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _n6 = record.mode;
					if (_n6.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								mode: elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			focus: function () {
				var _n0 = record.focus;
				if (_n0.$ === 'Nothing') {
					return author$project$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _n0.a;
					return focusable;
				}
			}(),
			hover: function () {
				var _n1 = record.hover;
				if (_n1.$ === 'Nothing') {
					return author$project$Internal$Model$AllowHover;
				} else {
					var hoverable = _n1.a;
					return hoverable;
				}
			}(),
			mode: function () {
				var _n2 = record.mode;
				if (_n2.$ === 'Nothing') {
					return author$project$Internal$Model$Layout;
				} else {
					var actualMode = _n2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			elm$core$List$foldr,
			combine,
			{focus: elm$core$Maybe$Nothing, hover: elm$core$Maybe$Nothing, mode: elm$core$Maybe$Nothing},
			options));
};
var author$project$Internal$Model$toHtml = F2(
	function (options, el) {
		switch (el.$) {
			case 'Unstyled':
				var html = el.a;
				return html(author$project$Internal$Model$asEl);
			case 'Styled':
				var styles = el.a.styles;
				var html = el.a.html;
				var styleSheet = A2(
					author$project$Internal$Model$toStyleSheetString,
					options,
					A3(
						elm$core$List$foldl,
						author$project$Internal$Model$reduceStyles,
						_Utils_Tuple2(
							elm$core$Set$empty,
							_List_fromArray(
								[
									author$project$Internal$Model$renderFocusStyle(options.focus)
								])),
						styles).b);
				return A2(
					html,
					elm$core$Maybe$Just(styleSheet),
					author$project$Internal$Model$asEl);
			case 'Text':
				var text = el.a;
				return author$project$Internal$Model$textElement(text);
			default:
				return author$project$Internal$Model$textElement('');
		}
	});
var author$project$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = author$project$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _n0 = options.mode;
			if (_n0.$ === 'NoStaticStyleSheet') {
				return author$project$Internal$Model$OnlyDynamic(options);
			} else {
				return author$project$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			author$project$Internal$Model$toHtml,
			options,
			A5(
				author$project$Internal$Model$element,
				embedStyle,
				author$project$Internal$Model$asEl,
				elm$core$Maybe$Nothing,
				attributes,
				author$project$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var author$project$Internal$Flag$fontFamily = author$project$Internal$Flag$col(5);
var author$project$Internal$Model$Typeface = function (a) {
	return {$: 'Typeface', a: a};
};
var elm$core$String$words = _String_words;
var author$project$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 'Serif':
						return 'serif';
					case 'SansSerif':
						return 'sans-serif';
					case 'Monospace':
						return 'monospace';
					case 'Typeface':
						var name = font.a;
						return A2(
							elm$core$String$join,
							'-',
							elm$core$String$words(
								elm$core$String$toLower(name)));
					default:
						var name = font.a;
						var url = font.b;
						return A2(
							elm$core$String$join,
							'-',
							elm$core$String$words(
								elm$core$String$toLower(name)));
				}
			}());
	});
var author$project$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			author$project$Internal$Model$Typeface('Open Sans'),
			author$project$Internal$Model$Typeface('Helvetica'),
			author$project$Internal$Model$Typeface('Verdana'),
			author$project$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			author$project$Internal$Model$StyleClass,
			author$project$Internal$Flag$bgColor,
			A3(
				author$project$Internal$Model$Colored,
				'bg-color-' + author$project$Internal$Model$formatColorClass(
					A4(author$project$Internal$Model$Rgba, 1, 1, 1, 1)),
				'background-color',
				A4(author$project$Internal$Model$Rgba, 1, 1, 1, 1))),
			A2(
			author$project$Internal$Model$StyleClass,
			author$project$Internal$Flag$fontColor,
			A3(
				author$project$Internal$Model$Colored,
				'font-color-' + author$project$Internal$Model$formatColorClass(
					A4(author$project$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4(author$project$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			author$project$Internal$Model$StyleClass,
			author$project$Internal$Flag$fontSize,
			A3(author$project$Internal$Model$Single, 'font-size-20', 'font-size', '20px')),
			A2(
			author$project$Internal$Model$StyleClass,
			author$project$Internal$Flag$fontFamily,
			A2(
				author$project$Internal$Model$FontFamily,
				A3(elm$core$List$foldl, author$project$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var author$project$Element$layoutWith = F3(
	function (_n0, attrs, child) {
		var options = _n0.options;
		return A3(
			author$project$Internal$Model$renderRoot,
			options,
			A2(
				elm$core$List$cons,
				author$project$Internal$Model$htmlClass(
					A2(
						elm$core$String$join,
						' ',
						_List_fromArray(
							[author$project$Internal$Style$classes.root, author$project$Internal$Style$classes.any, author$project$Internal$Style$classes.single, author$project$Internal$Style$classes.contentCenterX, author$project$Internal$Style$classes.contentCenterY]))),
				_Utils_ap(author$project$Internal$Model$rootStyle, attrs)),
			child);
	});
var author$project$Internal$Model$ImportFont = F2(
	function (a, b) {
		return {$: 'ImportFont', a: a, b: b};
	});
var author$project$Element$Font$external = function (_n0) {
	var url = _n0.url;
	var name = _n0.name;
	return A2(author$project$Internal$Model$ImportFont, name, url);
};
var author$project$Element$Font$family = function (families) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$fontFamily,
		A2(
			author$project$Internal$Model$FontFamily,
			A3(elm$core$List$foldl, author$project$Internal$Model$renderFontClassName, 'ff-', families),
			families));
};
var author$project$Element$Font$typeface = author$project$Internal$Model$Typeface;
var author$project$Element$clipX = A2(author$project$Internal$Model$Class, author$project$Internal$Flag$overflow, author$project$Internal$Style$classes.clipX);
var author$project$Element$scrollbarY = A2(author$project$Internal$Model$Class, author$project$Internal$Flag$overflow, author$project$Internal$Style$classes.scrollbarsY);
var author$project$Framework$css = '\nbody {\n    line-height: normal !important;\n}\n.elmStyleguideGenerator-open {\ntransition: all .8s;\nttransform: translateY(0);\nmax-height: 500px;\n}\n.elmStyleguideGenerator-close {\ntransition: all .1s;\nttransform: translateY(-100%);\nmax-height: 0;\n}\npre {\n    margin: 0;\n}\n';
var author$project$Element$scrollbars = A2(author$project$Internal$Model$Class, author$project$Internal$Flag$overflow, author$project$Internal$Style$classes.scrollbars);
var author$project$Framework$emptyIntrospection = {description: '', name: 'Not found', signature: '', variations: _List_Nil};
var author$project$Framework$emptyVariation = _Utils_Tuple2('Not found', _List_Nil);
var author$project$Framework$slugToString = function (_n0) {
	var slug = _n0.a;
	return slug;
};
var author$project$Framework$RouteHome = {$: 'RouteHome'};
var author$project$Framework$fragmentAsPath = function (url) {
	var _n0 = url.fragment;
	if (_n0.$ === 'Nothing') {
		return _Utils_update(
			url,
			{path: ''});
	} else {
		var fragment = _n0.a;
		return _Utils_update(
			url,
			{path: fragment});
	}
};
var author$project$Framework$RouteSubPage = F2(
	function (a, b) {
		return {$: 'RouteSubPage', a: a, b: b};
	});
var author$project$Framework$rootRoute = 'framework';
var author$project$Framework$Slug = function (a) {
	return {$: 'Slug', a: a};
};
var elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return elm$url$Url$Parser$Parser(
			function (_n0) {
				var visited = _n0.visited;
				var unvisited = _n0.unvisited;
				var params = _n0.params;
				var frag = _n0.frag;
				var value = _n0.value;
				if (!unvisited.b) {
					return _List_Nil;
				} else {
					var next = unvisited.a;
					var rest = unvisited.b;
					var _n2 = stringToSomething(next);
					if (_n2.$ === 'Just') {
						var nextValue = _n2.a;
						return _List_fromArray(
							[
								A5(
								elm$url$Url$Parser$State,
								A2(elm$core$List$cons, next, visited),
								rest,
								params,
								frag,
								value(nextValue))
							]);
					} else {
						return _List_Nil;
					}
				}
			});
	});
var author$project$Framework$slugParser = A2(
	elm$url$Url$Parser$custom,
	'SLUG',
	function ($) {
		return elm$core$Maybe$Just(
			author$project$Framework$Slug($));
	});
var elm$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.visited;
		var unvisited = _n0.unvisited;
		var params = _n0.params;
		var frag = _n0.frag;
		var value = _n0.value;
		return A5(
			elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var elm$url$Url$Parser$map = F2(
	function (subValue, _n0) {
		var parseArg = _n0.a;
		return elm$url$Url$Parser$Parser(
			function (_n1) {
				var visited = _n1.visited;
				var unvisited = _n1.unvisited;
				var params = _n1.params;
				var frag = _n1.frag;
				var value = _n1.value;
				return A2(
					elm$core$List$map,
					elm$url$Url$Parser$mapState(value),
					parseArg(
						A5(elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var elm$url$Url$Parser$oneOf = function (parsers) {
	return elm$url$Url$Parser$Parser(
		function (state) {
			return A2(
				elm$core$List$concatMap,
				function (_n0) {
					var parser = _n0.a;
					return parser(state);
				},
				parsers);
		});
};
var elm$url$Url$Parser$s = function (str) {
	return elm$url$Url$Parser$Parser(
		function (_n0) {
			var visited = _n0.visited;
			var unvisited = _n0.unvisited;
			var params = _n0.params;
			var frag = _n0.frag;
			var value = _n0.value;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				return _Utils_eq(next, str) ? _List_fromArray(
					[
						A5(
						elm$url$Url$Parser$State,
						A2(elm$core$List$cons, next, visited),
						rest,
						params,
						frag,
						value)
					]) : _List_Nil;
			}
		});
};
var elm$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0.a;
		var parseAfter = _n1.a;
		return elm$url$Url$Parser$Parser(
			function (state) {
				return A2(
					elm$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var author$project$Framework$routeParser = elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$url$Url$Parser$map,
			author$project$Framework$RouteSubPage,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s(author$project$Framework$rootRoute),
				A2(elm$url$Url$Parser$slash, author$project$Framework$slugParser, author$project$Framework$slugParser)))
		]));
var elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _n1 = state.unvisited;
			if (!_n1.b) {
				return elm$core$Maybe$Just(state.value);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				elm$core$List$cons,
				segment,
				elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var elm$url$Url$Parser$preparePath = function (path) {
	var _n0 = A2(elm$core$String$split, '/', path);
	if (_n0.b && (_n0.a === '')) {
		var segments = _n0.b;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _n0;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$url$Url$percentDecode = _Url_percentDecode;
var elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return elm$core$Maybe$Just(
				A2(elm$core$List$cons, value, list));
		}
	});
var elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _n0 = A2(elm$core$String$split, '=', segment);
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			var rawKey = _n0.a;
			var _n1 = _n0.b;
			var rawValue = _n1.a;
			var _n2 = elm$url$Url$percentDecode(rawKey);
			if (_n2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm$url$Url$percentDecode(rawValue);
				if (_n3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _n3.a;
					return A3(
						elm$core$Dict$update,
						key,
						elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			elm$core$List$foldr,
			elm$url$Url$Parser$addParam,
			elm$core$Dict$empty,
			A2(elm$core$String$split, '&', qry));
	}
};
var elm$url$Url$Parser$parse = F2(
	function (_n0, url) {
		var parser = _n0.a;
		return elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm$url$Url$Parser$State,
					_List_Nil,
					elm$url$Url$Parser$preparePath(url.path),
					elm$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					elm$core$Basics$identity)));
	});
var author$project$Framework$urlToRoute = function (url) {
	var maybeRoute = A2(
		elm$url$Url$Parser$parse,
		author$project$Framework$routeParser,
		author$project$Framework$fragmentAsPath(url));
	if (maybeRoute.$ === 'Nothing') {
		return author$project$Framework$RouteHome;
	} else {
		var route = maybeRoute.a;
		return route;
	}
};
var author$project$Framework$maybeSelected = function (model) {
	var _n0 = function () {
		var _n1 = author$project$Framework$urlToRoute(model.url);
		if (_n1.$ === 'RouteSubPage') {
			var slug3 = _n1.a;
			var slug4 = _n1.b;
			return _Utils_Tuple2(
				A2(
					elm$core$Maybe$withDefault,
					'',
					elm$url$Url$percentDecode(
						author$project$Framework$slugToString(slug3))),
				A2(
					elm$core$Maybe$withDefault,
					'',
					elm$url$Url$percentDecode(
						author$project$Framework$slugToString(slug4))));
		} else {
			return _Utils_Tuple2('', '');
		}
	}();
	var slug1 = _n0.a;
	var slug2 = _n0.b;
	var _n2 = A2(
		elm$core$Maybe$withDefault,
		_Utils_Tuple2(author$project$Framework$emptyIntrospection, false),
		elm$core$List$head(
			A2(
				elm$core$List$filter,
				function (_n3) {
					var introspection2 = _n3.a;
					return _Utils_eq(introspection2.name, slug1);
				},
				model.introspections)));
	var introspection = _n2.a;
	var variation = A2(
		elm$core$Maybe$withDefault,
		author$project$Framework$emptyVariation,
		elm$core$List$head(
			A2(
				elm$core$List$filter,
				function (_n5) {
					var name = _n5.a;
					return _Utils_eq(name, slug2);
				},
				introspection.variations)));
	var _n4 = author$project$Framework$urlToRoute(model.url);
	return (_Utils_eq(introspection, author$project$Framework$emptyIntrospection) || _Utils_eq(variation, author$project$Framework$emptyVariation)) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(
		_Utils_Tuple2(introspection, variation));
};
var author$project$Internal$Model$Top = {$: 'Top'};
var author$project$Element$alignTop = author$project$Internal$Model$AlignY(author$project$Internal$Model$Top);
var author$project$Element$scrollbarX = A2(author$project$Internal$Model$Class, author$project$Internal$Flag$overflow, author$project$Internal$Style$classes.scrollbarsX);
var author$project$Framework$sourceCodeWrapper = F2(
	function (configuration, sourceCode) {
		return A2(
			author$project$Element$el,
			_List_fromArray(
				[
					author$project$Element$width(author$project$Element$fill),
					author$project$Element$scrollbarX,
					author$project$Element$Background$color(configuration.gray3),
					author$project$Element$Border$rounded(8)
				]),
			A2(
				author$project$Element$el,
				_List_fromArray(
					[
						author$project$Element$Font$family(
						_List_fromArray(
							[author$project$Element$Font$monospace])),
						author$project$Element$Font$color(author$project$ColorElement$black),
						author$project$Element$Font$size(16),
						author$project$Element$padding(16),
						author$project$Element$htmlAttribute(
						A2(elm$html$Html$Attributes$style, 'white-space', 'pre'))
					]),
				author$project$Element$text(sourceCode)));
	});
var author$project$Element$map = author$project$Internal$Model$map;
var author$project$Framework$MsgStyleElementsInput = function (a) {
	return {$: 'MsgStyleElementsInput', a: a};
};
var author$project$Framework$specialComponent = F2(
	function (model, component) {
		var componentTuplet = component(model.modelStyleElementsInput);
		return _Utils_Tuple2(
			A2(author$project$Element$map, author$project$Framework$MsgStyleElementsInput, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Framework$MsgCards = function (a) {
	return {$: 'MsgCards', a: a};
};
var author$project$Framework$specialComponentCards = F2(
	function (model, component) {
		var componentTuplet = component(model.modelCards);
		return _Utils_Tuple2(
			A2(author$project$Element$map, author$project$Framework$MsgCards, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Framework$MsgFormField = function (a) {
	return {$: 'MsgFormField', a: a};
};
var author$project$Framework$specialComponentFormField = F2(
	function (model, component) {
		var componentTuplet = component(model.modelFormField);
		return _Utils_Tuple2(
			A2(author$project$Element$map, author$project$Framework$MsgFormField, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Framework$MsgFormFieldWithPattern = function (a) {
	return {$: 'MsgFormFieldWithPattern', a: a};
};
var author$project$Framework$specialComponentFormFieldWithPattern = F2(
	function (model, component) {
		var componentTuplet = component(model.modelFormFieldWithPattern);
		return _Utils_Tuple2(
			A2(author$project$Element$map, author$project$Framework$MsgFormFieldWithPattern, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Color$yellow = A3(author$project$Color$rgb, 0, 200, 200);
var author$project$ColorElement$yellow = author$project$Color$toElementColor(author$project$Color$yellow);
var author$project$Framework$Card$Flip = {$: 'Flip'};
var author$project$Framework$Card$stylexxx = F2(
	function (key, value) {
		return ((key === 'backface-visibility') || ((key === 'perspective') || ((key === 'transition') || ((key === 'transform-style') || (key === 'transform'))))) ? _List_fromArray(
			[
				author$project$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, '-webkit-' + key, value)),
				author$project$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, '-moz-' + key, value)),
				author$project$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, '-ms-' + key, value)),
				author$project$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, '-o-' + key, value)),
				author$project$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, key, value))
			]) : _List_fromArray(
			[
				author$project$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, key, value))
			]);
	});
var elm$html$Html$node = elm$virtual_dom$VirtualDom$node;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var author$project$Framework$Card$flipping = function (data) {
	var y = author$project$Element$px(data.height);
	var x = author$project$Element$px(data.width);
	var commonAttr = _Utils_ap(
		author$project$Framework$Card$cardCommonAttr,
		_Utils_ap(
			_List_fromArray(
				[
					author$project$Element$width(x),
					author$project$Element$height(y)
				]),
			_Utils_ap(
				A2(author$project$Framework$Card$stylexxx, 'backface-visibility', 'hidden'),
				A2(author$project$Framework$Card$stylexxx, 'position', 'absolute'))));
	return A2(
		author$project$Element$column,
		A2(
			elm$core$List$cons,
			author$project$Element$alignTop,
			A2(author$project$Framework$Card$stylexxx, 'perspective', '1500px')),
		_List_fromArray(
			[
				author$project$Element$html(
				A3(
					elm$html$Html$node,
					'style',
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('alignbottom, alignright {pointer-events:none}')
						]))),
				A2(
				author$project$Element$row,
				_Utils_ap(
					_List_fromArray(
						[
							author$project$Element$width(x),
							author$project$Element$height(y)
						]),
					_Utils_ap(
						A2(author$project$Framework$Card$stylexxx, 'transition', 'all 0.7s cubic-bezier(0.365, 1.440, 0.430, 0.965)'),
						_Utils_ap(
							A2(author$project$Framework$Card$stylexxx, 'transform-style', 'preserve-3d'),
							data.activeFront ? A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(0deg)') : A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(180deg)')))),
				_List_fromArray(
					[
						A2(
						author$project$Element$el,
						_Utils_ap(
							commonAttr,
							_Utils_ap(
								A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(0deg)'),
								A2(author$project$Framework$Card$stylexxx, 'z-index', '2'))),
						data.front),
						A2(
						author$project$Element$el,
						_Utils_ap(
							commonAttr,
							A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(180deg)')),
						data.back)
					]))
			]));
};
var author$project$Framework$Card$example1 = function (model) {
	var contentAttr = _List_fromArray(
		[
			author$project$Element$width(author$project$Element$shrink),
			author$project$Element$height(author$project$Element$shrink),
			author$project$Element$centerX,
			author$project$Element$centerY,
			author$project$Element$spacing(50)
		]);
	var commonAttr = _List_fromArray(
		[
			author$project$Element$height(author$project$Element$fill),
			author$project$Element$width(author$project$Element$fill),
			author$project$Element$pointer,
			author$project$Element$Events$onClick(author$project$Framework$Card$Flip)
		]);
	return _Utils_Tuple2(
		author$project$Framework$Card$flipping(
			{
				activeFront: model,
				back: A2(
					author$project$Element$el,
					_Utils_ap(
						commonAttr,
						_List_fromArray(
							[
								author$project$Element$Background$color(author$project$ColorElement$yellow)
							])),
					A2(
						author$project$Element$column,
						contentAttr,
						_List_fromArray(
							[
								A2(
								author$project$Element$el,
								_List_fromArray(
									[author$project$Element$centerX]),
								author$project$Element$text('Click Me')),
								A2(
								author$project$Element$el,
								_List_fromArray(
									[author$project$Element$centerX]),
								author$project$Element$text('Back'))
							]))),
				front: A2(
					author$project$Element$el,
					commonAttr,
					A2(
						author$project$Element$column,
						contentAttr,
						_List_fromArray(
							[
								A2(
								author$project$Element$el,
								_List_fromArray(
									[author$project$Element$centerX]),
								author$project$Element$text('Click Me')),
								A2(
								author$project$Element$el,
								_List_fromArray(
									[author$project$Element$centerX]),
								author$project$Element$text('Front'))
							]))),
				height: 300,
				width: 200
			}),
		'\nflipping\n    { width = 200\n    , height = 300\n    , activeFront = model.flip\n    , front =\n        el commonAttr <|\n            column contentAttr\n                [ el [ centerX ] <| text "Click Me"\n                , el [ centerX ] <| text "Front"\n                ]\n    , back =\n        el (commonAttr ++ [ Background.color Color.yellow ]) <|\n            column contentAttr\n                [ el [ centerX ] <| text "Click Me"\n                , el [ centerX ] <| text "Back"\n                ]\n    }');
};
var author$project$Framework$FormField$FieldEmail = {$: 'FieldEmail'};
var author$project$Internal$Flag$moveY = author$project$Internal$Flag$col(26);
var author$project$Element$moveDown = function (y) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$moveY,
		author$project$Internal$Model$Transform(
			A3(
				author$project$Internal$Model$Move,
				elm$core$Maybe$Nothing,
				elm$core$Maybe$Just(y),
				elm$core$Maybe$Nothing)));
};
var author$project$Internal$Flag$scale = author$project$Internal$Flag$col(23);
var author$project$Internal$Model$Scale = F3(
	function (a, b, c) {
		return {$: 'Scale', a: a, b: b, c: c};
	});
var author$project$Element$scale = function (n) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$scale,
		author$project$Internal$Model$Transform(
			A3(author$project$Internal$Model$Scale, n, n, 1)));
};
var elm$html$Html$Events$onFocus = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'focus',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Element$Events$onFocus = function ($) {
	return author$project$Internal$Model$Attr(
		elm$html$Html$Events$onFocus($));
};
var elm$html$Html$Events$onBlur = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'blur',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Element$Events$onLoseFocus = function ($) {
	return author$project$Internal$Model$Attr(
		elm$html$Html$Events$onBlur($));
};
var author$project$Element$Input$TextInputNode = function (a) {
	return {$: 'TextInputNode', a: a};
};
var author$project$Element$Input$Padding = F4(
	function (a, b, c, d) {
		return {$: 'Padding', a: a, b: b, c: c, d: d};
	});
var author$project$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		var position = label.a;
		var labelAttrs = label.b;
		var labelChild = label.c;
		var labelElement = A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			labelAttrs,
			author$project$Internal$Model$Unkeyed(
				_List_fromArray(
					[labelChild])));
		switch (position.$) {
			case 'Above':
				return A5(
					author$project$Internal$Model$element,
					author$project$Internal$Model$noStyleSheet,
					author$project$Internal$Model$asColumn,
					elm$core$Maybe$Just('label'),
					attrs,
					author$project$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			case 'Below':
				return A5(
					author$project$Internal$Model$element,
					author$project$Internal$Model$noStyleSheet,
					author$project$Internal$Model$asColumn,
					elm$core$Maybe$Just('label'),
					attrs,
					author$project$Internal$Model$Unkeyed(
						_List_fromArray(
							[input, labelElement])));
			case 'OnRight':
				return A5(
					author$project$Internal$Model$element,
					author$project$Internal$Model$noStyleSheet,
					author$project$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					author$project$Internal$Model$Unkeyed(
						_List_fromArray(
							[input, labelElement])));
			case 'OnLeft':
				return A5(
					author$project$Internal$Model$element,
					author$project$Internal$Model$noStyleSheet,
					author$project$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					author$project$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			case 'InFront':
				return A5(
					author$project$Internal$Model$element,
					author$project$Internal$Model$noStyleSheet,
					author$project$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					author$project$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			default:
				return A5(
					author$project$Internal$Model$element,
					author$project$Internal$Model$noStyleSheet,
					author$project$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					author$project$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
		}
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var author$project$Element$Input$autofill = function ($) {
	return author$project$Internal$Model$Attr(
		A2(elm$html$Html$Attributes$attribute, 'autocomplete', $));
};
var author$project$Element$Input$charcoal = A3(author$project$Element$rgb, 136 / 255, 138 / 255, 133 / 255);
var author$project$Element$Input$darkGrey = A3(author$project$Element$rgb, 186 / 255, 189 / 255, 182 / 255);
var author$project$Element$Input$defaultTextPadding = A2(author$project$Element$paddingXY, 12, 12);
var author$project$Element$Input$white = A3(author$project$Element$rgb, 1, 1, 1);
var author$project$Element$Input$defaultTextBoxStyle = _List_fromArray(
	[
		author$project$Element$Input$defaultTextPadding,
		author$project$Element$Border$rounded(3),
		author$project$Element$Border$color(author$project$Element$Input$darkGrey),
		author$project$Element$Background$color(author$project$Element$Input$white),
		author$project$Element$Border$width(1),
		author$project$Element$spacing(3)
	]);
var elm$html$Html$Attributes$spellcheck = elm$html$Html$Attributes$boolProperty('spellcheck');
var author$project$Element$Input$spellcheck = function ($) {
	return author$project$Internal$Model$Attr(
		elm$html$Html$Attributes$spellcheck($));
};
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var author$project$Element$Input$value = function ($) {
	return author$project$Internal$Model$Attr(
		elm$html$Html$Attributes$value($));
};
var author$project$Internal$Model$LivePolite = {$: 'LivePolite'};
var author$project$Element$Region$announce = author$project$Internal$Model$Describe(author$project$Internal$Model$LivePolite);
var author$project$Internal$Model$filter = function (attrs) {
	return A3(
		elm$core$List$foldr,
		F2(
			function (x, _n0) {
				var found = _n0.a;
				var has = _n0.b;
				switch (x.$) {
					case 'NoAttribute':
						return _Utils_Tuple2(found, has);
					case 'Class':
						var key = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 'Attr':
						var attr = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 'StyleClass':
						var style = x.b;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 'Width':
						var width = x.a;
						return A2(elm$core$Set$member, 'width', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'width', has));
					case 'Height':
						var height = x.a;
						return A2(elm$core$Set$member, 'height', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'height', has));
					case 'Describe':
						var description = x.a;
						return A2(elm$core$Set$member, 'described', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'described', has));
					case 'Nearby':
						var location = x.a;
						var elem = x.b;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 'AlignX':
						return A2(elm$core$Set$member, 'align-x', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'align-x', has));
					case 'AlignY':
						return A2(elm$core$Set$member, 'align-y', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'align-y', has));
					case 'BoxShadow':
						var shadow = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					default:
						var shadow = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
				}
			}),
		_Utils_Tuple2(_List_Nil, elm$core$Set$empty),
		attrs).a;
};
var author$project$Internal$Model$get = F2(
	function (attrs, isAttr) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, found) {
					return isAttr(x) ? A2(elm$core$List$cons, x, found) : found;
				}),
			_List_Nil,
			author$project$Internal$Model$filter(attrs));
	});
var elm$core$String$lines = _String_lines;
var elm$core$String$trim = _String_trim;
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$on,
		'input',
		A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue));
};
var author$project$Element$Input$textHelper = F3(
	function (textInput, attrs, textOptions) {
		var forNearby = function (attr) {
			if (attr.$ === 'Nearby') {
				return true;
			} else {
				return false;
			}
		};
		var behavior = function () {
			var _n25 = textOptions.onChange;
			if (_n25.$ === 'Nothing') {
				return _List_fromArray(
					[
						author$project$Internal$Model$Attr(
						elm$html$Html$Attributes$disabled(true))
					]);
			} else {
				var checkMsg = _n25.a;
				return _List_fromArray(
					[
						author$project$Internal$Model$Attr(
						elm$html$Html$Events$onInput(checkMsg))
					]);
			}
		}();
		var attributes = A2(
			elm$core$List$cons,
			author$project$Element$width(author$project$Element$fill),
			_Utils_ap(author$project$Element$Input$defaultTextBoxStyle, attrs));
		var attributesFromChild = A2(
			author$project$Internal$Model$get,
			attributes,
			function (attr) {
				_n22$7:
				while (true) {
					switch (attr.$) {
						case 'Width':
							if (attr.a.$ === 'Fill') {
								return true;
							} else {
								break _n22$7;
							}
						case 'Height':
							if (attr.a.$ === 'Fill') {
								return true;
							} else {
								break _n22$7;
							}
						case 'AlignX':
							return true;
						case 'AlignY':
							return true;
						case 'StyleClass':
							switch (attr.b.$) {
								case 'SpacingStyle':
									var _n23 = attr.b;
									return true;
								case 'FontSize':
									return true;
								case 'FontFamily':
									var _n24 = attr.b;
									return true;
								default:
									break _n22$7;
							}
						default:
							break _n22$7;
					}
				}
				return false;
			});
		var inputPadding = A2(
			author$project$Internal$Model$get,
			attributes,
			function (attr) {
				if ((attr.$ === 'StyleClass') && (attr.b.$ === 'PaddingStyle')) {
					var _n21 = attr.b;
					return true;
				} else {
					return false;
				}
			});
		var nearbys = A2(
			author$project$Internal$Model$get,
			attributes,
			function (attr) {
				if (attr.$ === 'Nearby') {
					return true;
				} else {
					return false;
				}
			});
		var noNearbys = A2(
			elm$core$List$filter,
			function ($) {
				return !forNearby($);
			},
			attributes);
		var _n0 = function () {
			var _n1 = textInput.type_;
			if (_n1.$ === 'TextInputNode') {
				var inputType = _n1.a;
				return _Utils_Tuple3(
					'input',
					_Utils_ap(
						_List_fromArray(
							[
								author$project$Element$Input$value(textOptions.text),
								author$project$Internal$Model$Attr(
								elm$html$Html$Attributes$type_(inputType)),
								author$project$Element$Input$spellcheck(textInput.spellchecked),
								function () {
								var _n2 = textInput.autofill;
								if (_n2.$ === 'Nothing') {
									return author$project$Internal$Model$NoAttribute;
								} else {
									var fill = _n2.a;
									return author$project$Element$Input$autofill(fill);
								}
							}()
							]),
						noNearbys),
					_List_Nil);
			} else {
				var _n3 = A3(
					elm$core$List$foldr,
					F2(
						function (attr, found) {
							_n4$4:
							while (true) {
								switch (attr.$) {
									case 'Describe':
										return found;
									case 'Height':
										var val = attr.a;
										var _n5 = found.heightContent;
										if (_n5.$ === 'Nothing') {
											if (val.$ === 'Content') {
												return _Utils_update(
													found,
													{
														adjustedAttributes: A2(elm$core$List$cons, attr, found.adjustedAttributes),
														heightContent: elm$core$Maybe$Just(val)
													});
											} else {
												return _Utils_update(
													found,
													{
														heightContent: elm$core$Maybe$Just(val)
													});
											}
										} else {
											var i = _n5.a;
											return found;
										}
									case 'StyleClass':
										switch (attr.b.$) {
											case 'PaddingStyle':
												var _n7 = attr.b;
												var t = _n7.a;
												var r = _n7.b;
												var b = _n7.c;
												var l = _n7.d;
												var _n8 = found.maybePadding;
												if (_n8.$ === 'Nothing') {
													return _Utils_update(
														found,
														{
															adjustedAttributes: found.adjustedAttributes,
															maybePadding: elm$core$Maybe$Just(
																A4(author$project$Element$Input$Padding, t, r, b, l))
														});
												} else {
													return found;
												}
											case 'SpacingStyle':
												var _n9 = attr.b;
												var x = _n9.a;
												var y = _n9.b;
												var _n10 = found.maybeSpacing;
												if (_n10.$ === 'Nothing') {
													return _Utils_update(
														found,
														{
															adjustedAttributes: A2(elm$core$List$cons, attr, found.adjustedAttributes),
															maybeSpacing: elm$core$Maybe$Just(y)
														});
												} else {
													return found;
												}
											default:
												break _n4$4;
										}
									default:
										break _n4$4;
								}
							}
							return _Utils_update(
								found,
								{
									adjustedAttributes: A2(elm$core$List$cons, attr, found.adjustedAttributes)
								});
						}),
					{adjustedAttributes: _List_Nil, heightContent: elm$core$Maybe$Nothing, maybePadding: elm$core$Maybe$Nothing, maybeSpacing: elm$core$Maybe$Nothing},
					attributes);
				var maybePadding = _n3.maybePadding;
				var heightContent = _n3.heightContent;
				var maybeSpacing = _n3.maybeSpacing;
				var adjustedAttributes = _n3.adjustedAttributes;
				var spacing = A2(elm$core$Maybe$withDefault, 5, maybeSpacing);
				return _Utils_Tuple3(
					'textarea',
					_Utils_ap(
						_List_fromArray(
							[
								author$project$Element$Input$spellcheck(textInput.spellchecked),
								A2(
								elm$core$Maybe$withDefault,
								author$project$Internal$Model$NoAttribute,
								A2(elm$core$Maybe$map, author$project$Element$Input$autofill, textInput.autofill)),
								function () {
								if (maybePadding.$ === 'Nothing') {
									return author$project$Internal$Model$NoAttribute;
								} else {
									var _n12 = maybePadding.a;
									var t = _n12.a;
									var r = _n12.b;
									var b = _n12.c;
									var l = _n12.d;
									return author$project$Element$paddingEach(
										{
											bottom: A2(elm$core$Basics$max, 0, b - ((spacing / 2) | 0)),
											left: l,
											right: r,
											top: A2(elm$core$Basics$max, 0, t - ((spacing / 2) | 0))
										});
								}
							}(),
								function () {
								if (heightContent.$ === 'Nothing') {
									return author$project$Internal$Model$NoAttribute;
								} else {
									if (heightContent.a.$ === 'Content') {
										var _n14 = heightContent.a;
										var newlineCount = function (x) {
											return (x < 1) ? 1 : x;
										}(
											elm$core$List$length(
												elm$core$String$lines(textOptions.text)));
										var heightValue = function (count) {
											if (maybePadding.$ === 'Nothing') {
												return 'calc(' + (elm$core$String$fromInt(count) + ('em + ' + (elm$core$String$fromInt((count - 1) * spacing) + 'px) !important')));
											} else {
												var _n16 = maybePadding.a;
												var t = _n16.a;
												var r = _n16.b;
												var b = _n16.c;
												var l = _n16.d;
												return 'calc(' + (elm$core$String$fromInt(count) + ('em + ' + (elm$core$String$fromInt((t + b) + ((count - 1) * spacing)) + 'px) !important')));
											}
										};
										return A2(
											author$project$Internal$Model$StyleClass,
											author$project$Internal$Flag$height,
											A3(
												author$project$Internal$Model$Single,
												'textarea-height-' + elm$core$String$fromInt(newlineCount),
												'height',
												heightValue(newlineCount)));
									} else {
										var x = heightContent.a;
										return author$project$Internal$Model$Height(x);
									}
								}
							}()
							]),
						adjustedAttributes),
					_List_fromArray(
						[
							author$project$Internal$Model$unstyled(
							elm$html$Html$text(textOptions.text))
						]));
			}
		}();
		var inputNode = _n0.a;
		var inputAttrs = _n0.b;
		var inputChildren = _n0.c;
		var inputElement = A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				author$project$Element$width(author$project$Element$fill),
				elm$core$List$concat(
					_List_fromArray(
						[
							nearbys,
							function () {
							var _n17 = textOptions.placeholder;
							if (_n17.$ === 'Nothing') {
								return _List_Nil;
							} else {
								var _n18 = _n17.a;
								var placeholderAttrs = _n18.a;
								var placeholderEl = _n18.b;
								return (elm$core$String$trim(textOptions.text) !== '') ? _List_Nil : _List_fromArray(
									[
										author$project$Element$clip,
										author$project$Element$inFront(
										A2(
											author$project$Element$el,
											A2(
												elm$core$List$cons,
												author$project$Element$Input$defaultTextPadding,
												_Utils_ap(
													noNearbys,
													_Utils_ap(
														_List_fromArray(
															[
																author$project$Element$Font$color(author$project$Element$Input$charcoal),
																author$project$Internal$Model$htmlClass(author$project$Internal$Style$classes.noTextSelection),
																author$project$Element$Border$color(
																A4(author$project$Element$rgba, 0, 0, 0, 0)),
																author$project$Element$Background$color(
																A4(author$project$Element$rgba, 0, 0, 0, 0)),
																author$project$Element$height(author$project$Element$fill),
																author$project$Element$width(author$project$Element$fill)
															]),
														placeholderAttrs))),
											placeholderEl))
									]);
							}
						}()
						]))),
			author$project$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A5(
						author$project$Internal$Model$element,
						author$project$Internal$Model$noStyleSheet,
						author$project$Internal$Model$asEl,
						elm$core$Maybe$Just(inputNode),
						elm$core$List$concat(
							_List_fromArray(
								[
									_List_fromArray(
									[
										author$project$Element$Input$focusDefault(attrs)
									]),
									inputAttrs,
									behavior
								])),
						author$project$Internal$Model$Unkeyed(inputChildren))
					])));
		return A3(
			author$project$Element$Input$applyLabel,
			A2(
				elm$core$List$cons,
				A2(author$project$Internal$Model$Class, author$project$Internal$Flag$cursor, author$project$Internal$Style$classes.cursorText),
				A2(
					elm$core$List$cons,
					author$project$Element$spacing(5),
					A2(elm$core$List$cons, author$project$Element$Region$announce, attributesFromChild))),
			textOptions.label,
			inputElement);
	});
var author$project$Element$Input$email = author$project$Element$Input$textHelper(
	{
		autofill: elm$core$Maybe$Just('email'),
		spellchecked: false,
		type_: author$project$Element$Input$TextInputNode('email')
	});
var author$project$Element$Input$Label = F3(
	function (a, b, c) {
		return {$: 'Label', a: a, b: b, c: c};
	});
var author$project$Internal$Model$Above = {$: 'Above'};
var author$project$Element$Input$labelAbove = author$project$Element$Input$Label(author$project$Internal$Model$Above);
var author$project$Framework$FormField$Input = F2(
	function (a, b) {
		return {$: 'Input', a: a, b: b};
	});
var author$project$Framework$FormField$OnFocus = function (a) {
	return {$: 'OnFocus', a: a};
};
var author$project$Framework$FormField$OnLoseFocus = function (a) {
	return {$: 'OnLoseFocus', a: a};
};
var author$project$Framework$FormField$hackInLineStyle = F2(
	function (text1, text2) {
		return author$project$Element$htmlAttribute(
			A2(elm$html$Html$Attributes$style, text1, text2));
	});
var author$project$Framework$FormField$hasFocus = F2(
	function (model, field) {
		var _n0 = model.focus;
		if (_n0.$ === 'Just') {
			var focus = _n0.a;
			return _Utils_eq(focus, field);
		} else {
			return false;
		}
	});
var author$project$Framework$FormField$inputText = F2(
	function (model, _n0) {
		var field = _n0.field;
		var label = _n0.label;
		var modelValue = model.valueEmail;
		var labelIsAbove = A2(author$project$Framework$FormField$hasFocus, model, field) || (modelValue !== '');
		return A2(
			author$project$Element$Input$email,
			_Utils_ap(
				_List_fromArray(
					[
						author$project$Element$Events$onFocus(
						author$project$Framework$FormField$OnFocus(field)),
						author$project$Element$Events$onLoseFocus(
						author$project$Framework$FormField$OnLoseFocus(field)),
						author$project$Element$Background$color(author$project$Framework$Color$transparent),
						author$project$Element$Border$widthEach(
						{bottom: 1, left: 0, right: 0, top: 0}),
						author$project$Element$Border$rounded(0),
						A2(author$project$Element$paddingXY, 0, 8),
						author$project$Element$width(author$project$Element$fill),
						A2(author$project$Framework$FormField$hackInLineStyle, 'transition', 'all 0.15s'),
						A2(author$project$Framework$FormField$hackInLineStyle, 'z-index', '10')
					]),
				A2(author$project$Framework$FormField$hasFocus, model, field) ? _List_fromArray(
					[
						author$project$Element$Border$color(author$project$Framework$Color$primary)
					]) : _List_Nil),
			{
				label: A2(
					author$project$Element$Input$labelAbove,
					_Utils_ap(
						_List_fromArray(
							[
								A2(author$project$Framework$FormField$hackInLineStyle, 'transition', 'all 0.15s'),
								A2(author$project$Framework$FormField$hackInLineStyle, 'z-index', '10'),
								A2(author$project$Framework$FormField$hackInLineStyle, 'pointer-events', 'none')
							]),
						labelIsAbove ? _List_fromArray(
							[
								author$project$Element$scale(1),
								author$project$Element$moveLeft(0)
							]) : _List_fromArray(
							[
								author$project$Element$moveDown(33),
								author$project$Element$alpha(0.5)
							])),
					author$project$Element$text(label)),
				onChange: elm$core$Maybe$Just(
					author$project$Framework$FormField$Input(field)),
				placeholder: elm$core$Maybe$Nothing,
				text: modelValue
			});
	});
var author$project$Framework$FormField$example1 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormField$inputText,
			model,
			{field: author$project$Framework$FormField$FieldEmail, label: 'E-mail address'}),
		'inputText model\n    { field = FieldEmail\n    , label = "E-mail address"\n    }');
};
var author$project$Framework$FormFieldWithPattern$FieldTelephone = {$: 'FieldTelephone'};
var author$project$Element$Input$text = author$project$Element$Input$textHelper(
	{
		autofill: elm$core$Maybe$Nothing,
		spellchecked: false,
		type_: author$project$Element$Input$TextInputNode('text')
	});
var author$project$Framework$FormFieldWithPattern$Field4DigitCode = {$: 'Field4DigitCode'};
var author$project$Framework$FormFieldWithPattern$Input = F3(
	function (a, b, c) {
		return {$: 'Input', a: a, b: b, c: c};
	});
var author$project$Framework$FormFieldWithPattern$OnFocus = function (a) {
	return {$: 'OnFocus', a: a};
};
var author$project$Framework$FormFieldWithPattern$OnLoseFocus = function (a) {
	return {$: 'OnLoseFocus', a: a};
};
var author$project$Framework$FormFieldWithPattern$hackInLineStyle = F2(
	function (text1, text2) {
		return author$project$Element$htmlAttribute(
			A2(elm$html$Html$Attributes$style, text1, text2));
	});
var author$project$Framework$FormFieldWithPattern$hasFocus = F2(
	function (model, field) {
		var _n0 = model.focus;
		if (_n0.$ === 'Just') {
			var focus = _n0.a;
			return _Utils_eq(focus, field);
		} else {
			return false;
		}
	});
var elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			elm$core$String$slice,
			-n,
			elm$core$String$length(string),
			string);
	});
var author$project$Framework$FormFieldWithPattern$inputText = F2(
	function (model, _n0) {
		var field = _n0.field;
		var pattern = _n0.pattern;
		var label = _n0.label;
		var modelValue = function () {
			switch (field.$) {
				case 'FieldTelephone':
					return model.value;
				case 'FieldCreditCard':
					return model.value;
				default:
					return model.value;
			}
		}();
		var lengthDifference = elm$core$String$length(pattern) - elm$core$String$length(modelValue);
		var patternToShow = _Utils_ap(
			modelValue,
			A2(elm$core$String$right, lengthDifference, pattern));
		var largeSize = _Utils_eq(field, author$project$Framework$FormFieldWithPattern$Field4DigitCode);
		var moveDownPlaceHolder = largeSize ? author$project$Framework$Configuration$conf.moveDownPlaceHolder.large : author$project$Framework$Configuration$conf.moveDownPlaceHolder.small;
		var labelIsAbove = A2(author$project$Framework$FormFieldWithPattern$hasFocus, model, field) || ((modelValue !== '') || largeSize);
		var font = largeSize ? _List_fromArray(
			[
				author$project$Element$Font$family(
				_List_fromArray(
					[author$project$Element$Font$monospace])),
				author$project$Element$Font$size(54)
			]) : _List_Nil;
		return A2(
			author$project$Element$el,
			_List_fromArray(
				[
					author$project$Element$inFront(
					A2(
						author$project$Element$el,
						_Utils_ap(
							_List_fromArray(
								[
									(A2(author$project$Framework$FormFieldWithPattern$hasFocus, model, field) && largeSize) ? author$project$Element$Font$color(author$project$Framework$Color$primary) : author$project$Element$Font$color(author$project$Framework$Color$grey_light),
									author$project$Element$moveDown(moveDownPlaceHolder),
									A2(author$project$Framework$FormFieldWithPattern$hackInLineStyle, 'pointer-events', 'none')
								]),
							font),
						author$project$Element$text(
							labelIsAbove ? patternToShow : ''))),
					author$project$Element$inFront(
					A2(
						author$project$Element$Input$text,
						_Utils_ap(
							_List_fromArray(
								[
									author$project$Element$Events$onFocus(
									author$project$Framework$FormFieldWithPattern$OnFocus(field)),
									author$project$Element$Events$onLoseFocus(
									author$project$Framework$FormFieldWithPattern$OnLoseFocus(field)),
									author$project$Element$Background$color(
									A4(author$project$Element$rgba, 0, 0, 0, 0)),
									largeSize ? author$project$Element$Border$width(0) : author$project$Element$Border$widthEach(
									{bottom: 2, left: 0, right: 0, top: 0}),
									author$project$Element$Border$rounded(0),
									A2(author$project$Element$paddingXY, 0, 8),
									author$project$Element$width(
									author$project$Element$px(230)),
									A2(author$project$Framework$FormFieldWithPattern$hackInLineStyle, 'transition', 'all 0.15s')
								]),
							_Utils_ap(
								font,
								A2(author$project$Framework$FormFieldWithPattern$hasFocus, model, field) ? _List_fromArray(
									[
										author$project$Element$Border$color(author$project$Framework$Color$primary)
									]) : _List_Nil)),
						{
							label: A2(
								author$project$Element$Input$labelAbove,
								_Utils_ap(
									_List_fromArray(
										[
											A2(author$project$Framework$FormFieldWithPattern$hackInLineStyle, 'transition', 'all 0.15s'),
											A2(author$project$Framework$FormFieldWithPattern$hackInLineStyle, 'pointer-events', 'none'),
											author$project$Element$Font$family(
											_List_fromArray(
												[
													author$project$Element$Font$typeface(author$project$Framework$Configuration$conf.font.typeface),
													author$project$Framework$Configuration$conf.font.typefaceFallback
												])),
											author$project$Element$Font$size(16)
										]),
									labelIsAbove ? _List_fromArray(
										[
											author$project$Element$scale(0.9),
											author$project$Element$moveLeft(14)
										]) : _List_fromArray(
										[
											author$project$Element$moveDown(33)
										])),
								author$project$Element$text(label)),
							onChange: elm$core$Maybe$Just(
								A2(author$project$Framework$FormFieldWithPattern$Input, field, pattern)),
							placeholder: elm$core$Maybe$Nothing,
							text: modelValue
						}))
				]),
			author$project$Element$none);
	});
var author$project$Framework$FormFieldWithPattern$example1 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormFieldWithPattern$inputText,
			model,
			{field: author$project$Framework$FormFieldWithPattern$FieldTelephone, label: 'Phone number USA', pattern: '(000) 000 - 0000'}),
		'inputText model\n    { field = FieldTelephone\n    , pattern = "(000) 000 - 0000"\n    , label = "Phone number USA"\n    }');
};
var author$project$Framework$FormFieldWithPattern$FieldCreditCard = {$: 'FieldCreditCard'};
var author$project$Framework$FormFieldWithPattern$example2 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormFieldWithPattern$inputText,
			model,
			{field: author$project$Framework$FormFieldWithPattern$FieldCreditCard, label: 'Credit Card number', pattern: '0000 - 0000 - 0000 - 0000'}),
		'inputText model\n    { field = FieldCreditCard\n    , pattern = "0000 - 0000 - 0000 - 0000"\n    , label = "Credit Card number"\n    }');
};
var author$project$Framework$FormFieldWithPattern$example3 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormFieldWithPattern$inputText,
			model,
			{field: author$project$Framework$FormFieldWithPattern$Field4DigitCode, label: '4 Digits Code', pattern: '_ _ _ _'}),
		'inputText model\n    { field = Field4DigitCode\n    , pattern = "_ _ _ _"\n    , label = "4 Digits Code"\n    }');
};
var author$project$Framework$StyleElementsInput$Button = {$: 'Button'};
var author$project$Framework$StyleElementsInput$example0 = function (_n0) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$button,
			_List_Nil,
			{
				label: author$project$Element$text('Label'),
				onPress: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Button)
			}),
		'Input.button []\n    { label = text "Label"\n    , onPress = Just Button\n    }');
};
var author$project$Framework$StyleElementsInput$Input = function (a) {
	return {$: 'Input', a: a};
};
var author$project$Framework$StyleElementsInput$example1 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$text,
			_List_Nil,
			{
				label: A2(
					author$project$Element$Input$labelAbove,
					_List_Nil,
					author$project$Element$text('Label')),
				onChange: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				placeholder: elm$core$Maybe$Nothing,
				text: model.text
			}),
		'Input.text []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    }');
};
var author$project$Element$Input$TextArea = {$: 'TextArea'};
var author$project$Element$Input$multiline = F2(
	function (attrs, multi) {
		return A3(
			author$project$Element$Input$textHelper,
			{autofill: elm$core$Maybe$Nothing, spellchecked: multi.spellcheck, type_: author$project$Element$Input$TextArea},
			attrs,
			{label: multi.label, onChange: multi.onChange, placeholder: multi.placeholder, text: multi.text});
	});
var author$project$Framework$StyleElementsInput$example10 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$multiline,
			_List_Nil,
			{
				label: A2(
					author$project$Element$Input$labelAbove,
					_List_Nil,
					author$project$Element$text('Label')),
				onChange: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				placeholder: elm$core$Maybe$Nothing,
				spellcheck: false,
				text: model.text
			}),
		'Input.multiline []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , spellcheck = False\n    }');
};
var author$project$Framework$StyleElementsInput$example11 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$multiline,
			_List_Nil,
			{
				label: A2(
					author$project$Element$Input$labelAbove,
					_List_Nil,
					author$project$Element$text('Label')),
				onChange: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				placeholder: elm$core$Maybe$Nothing,
				spellcheck: true,
				text: model.text
			}),
		'Input.multiline []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , spellcheck = True\n    }');
};
var author$project$Element$moveUp = function (y) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$moveY,
		author$project$Internal$Model$Transform(
			A3(
				author$project$Internal$Model$Move,
				elm$core$Maybe$Nothing,
				elm$core$Maybe$Just(-y),
				elm$core$Maybe$Nothing)));
};
var author$project$Internal$Flag$rotate = author$project$Internal$Flag$col(24);
var author$project$Internal$Model$Rotate = F4(
	function (a, b, c, d) {
		return {$: 'Rotate', a: a, b: b, c: c, d: d};
	});
var author$project$Element$rotate = function (angle) {
	return A2(
		author$project$Internal$Model$StyleClass,
		author$project$Internal$Flag$rotate,
		author$project$Internal$Model$Transform(
			A4(author$project$Internal$Model$Rotate, 0, 0, 1, angle)));
};
var author$project$Element$Input$defaultCheckbox = function (checked) {
	return A2(
		author$project$Element$el,
		_List_fromArray(
			[
				author$project$Internal$Model$htmlClass('focusable'),
				author$project$Element$width(
				author$project$Element$px(14)),
				author$project$Element$height(
				author$project$Element$px(14)),
				author$project$Element$Font$color(author$project$Element$Input$white),
				author$project$Element$centerY,
				author$project$Element$Font$size(9),
				author$project$Element$Font$center,
				author$project$Element$Border$rounded(3),
				author$project$Element$Border$color(
				checked ? A3(author$project$Element$rgb, 59 / 255, 153 / 255, 252 / 255) : A3(author$project$Element$rgb, 211 / 255, 211 / 255, 211 / 255)),
				author$project$Element$Border$shadow(
				{
					blur: 1,
					color: checked ? A4(author$project$Element$rgba, 238 / 255, 238 / 255, 238 / 255, 0) : A3(author$project$Element$rgb, 238 / 255, 238 / 255, 238 / 255),
					offset: _Utils_Tuple2(0, 0),
					size: 1
				}),
				author$project$Element$Background$color(
				checked ? A3(author$project$Element$rgb, 59 / 255, 153 / 255, 252 / 255) : author$project$Element$Input$white),
				author$project$Element$Border$width(
				checked ? 0 : 1)
			]),
		checked ? A2(
			author$project$Element$el,
			_List_fromArray(
				[
					author$project$Element$Border$color(author$project$Element$Input$white),
					author$project$Element$height(
					author$project$Element$px(6)),
					author$project$Element$width(
					author$project$Element$px(9)),
					author$project$Element$rotate(
					elm$core$Basics$degrees(-45)),
					author$project$Element$centerX,
					author$project$Element$centerY,
					author$project$Element$moveUp(1),
					author$project$Element$Border$widthEach(
					{bottom: 2, left: 2, right: 0, top: 0})
				]),
			author$project$Element$none) : author$project$Element$none);
};
var author$project$Element$Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _n0 = lookup(code);
		if (_n0.$ === 'Nothing') {
			return elm$json$Json$Decode$fail('No key matched');
		} else {
			var msg = _n0.a;
			return elm$json$Json$Decode$succeed(msg);
		}
	};
	var isKey = A2(
		elm$json$Json$Decode$andThen,
		decode,
		A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string));
	return author$project$Internal$Model$Attr(
		A2(elm$html$Html$Events$on, 'keyup', isKey));
};
var author$project$Element$Input$space = ' ';
var author$project$Element$Input$tabindex = function ($) {
	return author$project$Internal$Model$Attr(
		elm$html$Html$Attributes$tabindex($));
};
var author$project$Element$Input$checkbox = F2(
	function (attrs, _n0) {
		var label = _n0.label;
		var icon = _n0.icon;
		var checked = _n0.checked;
		var onChange = _n0.onChange;
		var attributes = A2(
			elm$core$List$cons,
			author$project$Element$spacing(6),
			_Utils_ap(
				function () {
					if (onChange.$ === 'Nothing') {
						return _List_fromArray(
							[
								author$project$Internal$Model$Attr(
								elm$html$Html$Attributes$disabled(true)),
								author$project$Element$Region$announce
							]);
					} else {
						var checkMsg = onChange.a;
						return _List_fromArray(
							[
								author$project$Internal$Model$Attr(
								elm$html$Html$Events$onClick(
									checkMsg(!checked))),
								author$project$Element$Region$announce,
								author$project$Element$Input$onKeyLookup(
								function (code) {
									return _Utils_eq(code, author$project$Element$Input$enter) ? elm$core$Maybe$Just(
										checkMsg(!checked)) : (_Utils_eq(code, author$project$Element$Input$space) ? elm$core$Maybe$Just(
										checkMsg(!checked)) : elm$core$Maybe$Nothing);
								})
							]);
					}
				}(),
				A2(
					elm$core$List$cons,
					author$project$Element$Input$tabindex(0),
					A2(
						elm$core$List$cons,
						author$project$Element$pointer,
						A2(
							elm$core$List$cons,
							author$project$Element$alignLeft,
							A2(
								elm$core$List$cons,
								author$project$Element$width(author$project$Element$fill),
								attrs))))));
		return A3(
			author$project$Element$Input$applyLabel,
			attributes,
			label,
			A5(
				author$project$Internal$Model$element,
				author$project$Internal$Model$noStyleSheet,
				author$project$Internal$Model$asEl,
				elm$core$Maybe$Nothing,
				_List_fromArray(
					[
						author$project$Internal$Model$Attr(
						A2(elm$html$Html$Attributes$attribute, 'role', 'checkbox')),
						author$project$Internal$Model$Attr(
						A2(
							elm$html$Html$Attributes$attribute,
							'aria-checked',
							checked ? 'true' : 'false')),
						author$project$Element$centerY,
						author$project$Element$height(author$project$Element$fill),
						author$project$Element$width(author$project$Element$shrink)
					]),
				author$project$Internal$Model$Unkeyed(
					_List_fromArray(
						[
							function () {
							if (icon.$ === 'Nothing') {
								return author$project$Element$Input$defaultCheckbox(checked);
							} else {
								var actualIcon = icon.a;
								return actualIcon;
							}
						}()
						]))));
	});
var author$project$Framework$StyleElementsInput$Checkbox = function (a) {
	return {$: 'Checkbox', a: a};
};
var author$project$Framework$StyleElementsInput$example2 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$checkbox,
			_List_Nil,
			{
				checked: model.checkbox,
				icon: elm$core$Maybe$Nothing,
				label: A2(
					author$project$Element$Input$labelAbove,
					_List_Nil,
					author$project$Element$text('Label')),
				onChange: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Checkbox)
			}),
		'Input.checkbox []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Checkbox\n    , checked = model.checkbox\n    , icon = Nothing\n    }');
};
var author$project$Element$Input$Option = F2(
	function (a, b) {
		return {$: 'Option', a: a, b: b};
	});
var author$project$Element$Input$defaultRadioOption = F2(
	function (optionLabel, status) {
		return A2(
			author$project$Element$row,
			_List_fromArray(
				[
					author$project$Element$spacing(10),
					author$project$Element$alignLeft,
					author$project$Element$width(author$project$Element$shrink)
				]),
			_List_fromArray(
				[
					A2(
					author$project$Element$el,
					_List_fromArray(
						[
							author$project$Element$width(
							author$project$Element$px(14)),
							author$project$Element$height(
							author$project$Element$px(14)),
							author$project$Element$Background$color(author$project$Element$Input$white),
							author$project$Element$Border$rounded(7),
							function () {
							if (status.$ === 'Selected') {
								return author$project$Internal$Model$htmlClass('focusable');
							} else {
								return author$project$Internal$Model$NoAttribute;
							}
						}(),
							author$project$Element$Border$width(
							function () {
								switch (status.$) {
									case 'Idle':
										return 1;
									case 'Focused':
										return 1;
									default:
										return 5;
								}
							}()),
							author$project$Element$Border$color(
							function () {
								switch (status.$) {
									case 'Idle':
										return A3(author$project$Element$rgb, 208 / 255, 208 / 255, 208 / 255);
									case 'Focused':
										return A3(author$project$Element$rgb, 208 / 255, 208 / 255, 208 / 255);
									default:
										return A3(author$project$Element$rgb, 59 / 255, 153 / 255, 252 / 255);
								}
							}())
						]),
					author$project$Element$none),
					A2(
					author$project$Element$el,
					_List_fromArray(
						[
							author$project$Element$width(author$project$Element$fill),
							author$project$Internal$Model$htmlClass('unfocusable')
						]),
					optionLabel)
				]));
	});
var author$project$Element$Input$option = F2(
	function (val, txt) {
		return A2(
			author$project$Element$Input$Option,
			val,
			author$project$Element$Input$defaultRadioOption(txt));
	});
var author$project$Element$Input$Column = {$: 'Column'};
var author$project$Element$Input$AfterFound = {$: 'AfterFound'};
var author$project$Element$Input$BeforeFound = {$: 'BeforeFound'};
var author$project$Element$Input$Idle = {$: 'Idle'};
var author$project$Element$Input$NotFound = {$: 'NotFound'};
var author$project$Element$Input$Selected = {$: 'Selected'};
var author$project$Element$Input$column = F2(
	function (attributes, children) {
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asColumn,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				author$project$Element$height(author$project$Element$shrink),
				A2(
					elm$core$List$cons,
					author$project$Element$width(author$project$Element$fill),
					attributes)),
			author$project$Internal$Model$Unkeyed(children));
	});
var author$project$Element$Input$downArrow = 'ArrowDown';
var author$project$Element$Input$leftArrow = 'ArrowLeft';
var author$project$Element$Input$rightArrow = 'ArrowRight';
var author$project$Element$Input$row = F2(
	function (attributes, children) {
		return A5(
			author$project$Internal$Model$element,
			author$project$Internal$Model$noStyleSheet,
			author$project$Internal$Model$asRow,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				author$project$Element$width(author$project$Element$fill),
				attributes),
			author$project$Internal$Model$Unkeyed(children));
	});
var author$project$Element$Input$upArrow = 'ArrowUp';
var author$project$Internal$Flag$active = author$project$Internal$Flag$col(32);
var author$project$Internal$Flag$focus = author$project$Internal$Flag$col(31);
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var author$project$Element$Input$radioHelper = F3(
	function (orientation, attrs, input) {
		var track = F2(
			function (opt, _n26) {
				var found = _n26.a;
				var prev = _n26.b;
				var nxt = _n26.c;
				var val = opt.a;
				switch (found.$) {
					case 'NotFound':
						return _Utils_eq(
							elm$core$Maybe$Just(val),
							input.selected) ? _Utils_Tuple3(author$project$Element$Input$BeforeFound, prev, nxt) : _Utils_Tuple3(found, val, nxt);
					case 'BeforeFound':
						return _Utils_Tuple3(author$project$Element$Input$AfterFound, prev, val);
					default:
						return _Utils_Tuple3(found, prev, nxt);
				}
			});
		var renderOption = function (_n23) {
			var val = _n23.a;
			var view = _n23.b;
			var status = _Utils_eq(
				elm$core$Maybe$Just(val),
				input.selected) ? author$project$Element$Input$Selected : author$project$Element$Input$Idle;
			return A2(
				author$project$Element$el,
				_List_fromArray(
					[
						author$project$Element$pointer,
						function () {
						if (orientation.$ === 'Row') {
							return author$project$Element$width(author$project$Element$shrink);
						} else {
							return author$project$Element$width(author$project$Element$fill);
						}
					}(),
						function () {
						var _n21 = input.onChange;
						if (_n21.$ === 'Nothing') {
							return author$project$Internal$Model$NoAttribute;
						} else {
							var send = _n21.a;
							return author$project$Element$Events$onClick(
								send(val));
						}
					}(),
						function () {
						if (status.$ === 'Selected') {
							return author$project$Internal$Model$Attr(
								A2(elm$html$Html$Attributes$attribute, 'aria-checked', 'true'));
						} else {
							return author$project$Internal$Model$Attr(
								A2(elm$html$Html$Attributes$attribute, 'aria-checked', 'false'));
						}
					}(),
						author$project$Internal$Model$Attr(
						A2(elm$html$Html$Attributes$attribute, 'role', 'radio'))
					]),
				view(status));
		};
		var prevNext = function () {
			var _n16 = input.options;
			if (!_n16.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var _n17 = _n16.a;
				var val = _n17.a;
				return function (_n18) {
					var found = _n18.a;
					var b = _n18.b;
					var a = _n18.c;
					switch (found.$) {
						case 'NotFound':
							return elm$core$Maybe$Just(
								_Utils_Tuple2(b, val));
						case 'BeforeFound':
							return elm$core$Maybe$Just(
								_Utils_Tuple2(b, val));
						default:
							return elm$core$Maybe$Just(
								_Utils_Tuple2(b, a));
					}
				}(
					A3(
						elm$core$List$foldl,
						track,
						_Utils_Tuple3(author$project$Element$Input$NotFound, val, val),
						input.options));
			}
		}();
		var optionArea = function () {
			if (orientation.$ === 'Row') {
				return A2(
					author$project$Element$Input$row,
					attrs,
					A2(elm$core$List$map, renderOption, input.options));
			} else {
				return A2(
					author$project$Element$Input$column,
					attrs,
					A2(elm$core$List$map, renderOption, input.options));
			}
		}();
		var labelVisible = function () {
			var _n12 = input.label;
			var labelAttrs = _n12.b;
			return elm$core$List$isEmpty(
				A2(
					author$project$Internal$Model$get,
					labelAttrs,
					function (attr) {
						_n13$2:
						while (true) {
							switch (attr.$) {
								case 'StyleClass':
									if (attr.b.$ === 'Transparency') {
										var _n14 = attr.b;
										return true;
									} else {
										break _n13$2;
									}
								case 'Class':
									if (attr.b === 'hidden') {
										return true;
									} else {
										break _n13$2;
									}
								default:
									break _n13$2;
							}
						}
						return false;
					}));
		}();
		var inputVisible = elm$core$List$isEmpty(
			A2(
				author$project$Internal$Model$get,
				attrs,
				function (attr) {
					_n10$2:
					while (true) {
						switch (attr.$) {
							case 'StyleClass':
								if (attr.b.$ === 'Transparency') {
									var _n11 = attr.b;
									return true;
								} else {
									break _n10$2;
								}
							case 'Class':
								if (attr.b === 'hidden') {
									return true;
								} else {
									break _n10$2;
								}
							default:
								break _n10$2;
						}
					}
					return false;
				}));
		var hideIfEverythingisInvisible = function () {
			if ((!labelVisible) && (!inputVisible)) {
				var pseudos = A2(
					elm$core$List$filterMap,
					function (attr) {
						if (attr.$ === 'StyleClass') {
							var style = attr.b;
							if (style.$ === 'PseudoSelector') {
								var pseudo = style.a;
								var styles = style.b;
								var forTransparency = function (psuedoStyle) {
									if (psuedoStyle.$ === 'Transparency') {
										return true;
									} else {
										return false;
									}
								};
								var transparent = A2(elm$core$List$filter, forTransparency, styles);
								var flag = function () {
									switch (pseudo.$) {
										case 'Hover':
											return author$project$Internal$Flag$hover;
										case 'Focus':
											return author$project$Internal$Flag$focus;
										default:
											return author$project$Internal$Flag$active;
									}
								}();
								if (!transparent.b) {
									return elm$core$Maybe$Nothing;
								} else {
									return elm$core$Maybe$Just(
										A2(
											author$project$Internal$Model$StyleClass,
											flag,
											A2(author$project$Internal$Model$PseudoSelector, pseudo, transparent)));
								}
							} else {
								return elm$core$Maybe$Nothing;
							}
						} else {
							return elm$core$Maybe$Nothing;
						}
					},
					attrs);
				return A2(
					elm$core$List$cons,
					A2(
						author$project$Internal$Model$StyleClass,
						author$project$Internal$Flag$transparency,
						A2(author$project$Internal$Model$Transparency, 'transparent', 1.0)),
					pseudos);
			} else {
				return _List_Nil;
			}
		}();
		var events = A2(
			author$project$Internal$Model$get,
			attrs,
			function (attr) {
				_n4$3:
				while (true) {
					switch (attr.$) {
						case 'Width':
							if (attr.a.$ === 'Fill') {
								return true;
							} else {
								break _n4$3;
							}
						case 'Height':
							if (attr.a.$ === 'Fill') {
								return true;
							} else {
								break _n4$3;
							}
						case 'Attr':
							return true;
						default:
							break _n4$3;
					}
				}
				return false;
			});
		return A3(
			author$project$Element$Input$applyLabel,
			function () {
				var _n0 = input.onChange;
				if (_n0.$ === 'Nothing') {
					return A2(
						elm$core$List$cons,
						author$project$Element$alignLeft,
						A2(
							elm$core$List$cons,
							author$project$Element$Region$announce,
							_Utils_ap(hideIfEverythingisInvisible, events)));
				} else {
					var onChange = _n0.a;
					return _Utils_ap(
						A2(
							elm$core$List$filterMap,
							elm$core$Basics$identity,
							_List_fromArray(
								[
									elm$core$Maybe$Just(author$project$Element$alignLeft),
									elm$core$Maybe$Just(
									author$project$Element$Input$tabindex(0)),
									elm$core$Maybe$Just(
									author$project$Internal$Model$htmlClass('focus')),
									elm$core$Maybe$Just(author$project$Element$Region$announce),
									elm$core$Maybe$Just(
									author$project$Internal$Model$Attr(
										A2(elm$html$Html$Attributes$attribute, 'role', 'radiogroup'))),
									function () {
									if (prevNext.$ === 'Nothing') {
										return elm$core$Maybe$Nothing;
									} else {
										var _n2 = prevNext.a;
										var prev = _n2.a;
										var next = _n2.b;
										return elm$core$Maybe$Just(
											author$project$Element$Input$onKeyLookup(
												function (code) {
													if (_Utils_eq(code, author$project$Element$Input$leftArrow)) {
														return elm$core$Maybe$Just(
															onChange(prev));
													} else {
														if (_Utils_eq(code, author$project$Element$Input$upArrow)) {
															return elm$core$Maybe$Just(
																onChange(prev));
														} else {
															if (_Utils_eq(code, author$project$Element$Input$rightArrow)) {
																return elm$core$Maybe$Just(
																	onChange(next));
															} else {
																if (_Utils_eq(code, author$project$Element$Input$downArrow)) {
																	return elm$core$Maybe$Just(
																		onChange(next));
																} else {
																	if (_Utils_eq(code, author$project$Element$Input$space)) {
																		var _n3 = input.selected;
																		if (_n3.$ === 'Nothing') {
																			return elm$core$Maybe$Just(
																				onChange(prev));
																		} else {
																			return elm$core$Maybe$Nothing;
																		}
																	} else {
																		return elm$core$Maybe$Nothing;
																	}
																}
															}
														}
													}
												}));
									}
								}()
								])),
						_Utils_ap(events, hideIfEverythingisInvisible));
				}
			}(),
			input.label,
			optionArea);
	});
var author$project$Element$Input$radio = author$project$Element$Input$radioHelper(author$project$Element$Input$Column);
var author$project$Framework$StyleElementsInput$Radio = function (a) {
	return {$: 'Radio', a: a};
};
var author$project$Framework$StyleElementsInput$example3 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$radio,
			_List_Nil,
			{
				label: A2(
					author$project$Element$Input$labelAbove,
					_List_Nil,
					author$project$Element$text('Label')),
				onChange: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Radio),
				options: _List_fromArray(
					[
						A2(
						author$project$Element$Input$option,
						'A',
						author$project$Element$text('Radio A')),
						A2(
						author$project$Element$Input$option,
						'B',
						author$project$Element$text('Radio B')),
						A2(
						author$project$Element$Input$option,
						'C',
						author$project$Element$text('Radio C'))
					]),
				selected: model.radio
			}),
		'Input.radio []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Radio\n    , selected = model.radio\n    , options =\n        [ Input.option "A" (text "Radio A")\n        , Input.option "B" (text "Radio B")\n        , Input.option "C" (text "Radio C")\n        ]\n    }');
};
var author$project$Element$Input$Row = {$: 'Row'};
var author$project$Element$Input$radioRow = author$project$Element$Input$radioHelper(author$project$Element$Input$Row);
var author$project$Framework$StyleElementsInput$example4 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$radioRow,
			_List_Nil,
			{
				label: A2(
					author$project$Element$Input$labelAbove,
					_List_Nil,
					author$project$Element$text('Label')),
				onChange: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Radio),
				options: _List_fromArray(
					[
						A2(
						author$project$Element$Input$option,
						'A',
						author$project$Element$text('Radio A')),
						A2(
						author$project$Element$Input$option,
						'B',
						author$project$Element$text('Radio B')),
						A2(
						author$project$Element$Input$option,
						'C',
						author$project$Element$text('Radio C'))
					]),
				selected: model.radio
			}),
		'Input.radioRow []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Radio\n    , selected = model.radio\n    , options =\n        [ Input.option "A" (text "Radio A")\n        , Input.option "B" (text "Radio B")\n        , Input.option "C" (text "Radio C")\n        ]\n    }');
};
var author$project$Element$Input$username = author$project$Element$Input$textHelper(
	{
		autofill: elm$core$Maybe$Just('username'),
		spellchecked: false,
		type_: author$project$Element$Input$TextInputNode('text')
	});
var author$project$Framework$StyleElementsInput$example5 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$username,
			_List_Nil,
			{
				label: A2(
					author$project$Element$Input$labelAbove,
					_List_Nil,
					author$project$Element$text('Label')),
				onChange: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				placeholder: elm$core$Maybe$Nothing,
				text: model.text
			}),
		'Input.username []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    }');
};
var author$project$Element$Input$newPassword = F2(
	function (attrs, pass) {
		return A3(
			author$project$Element$Input$textHelper,
			{
				autofill: elm$core$Maybe$Just('new-password'),
				spellchecked: false,
				type_: author$project$Element$Input$TextInputNode(
					pass.show ? 'text' : 'password')
			},
			attrs,
			{label: pass.label, onChange: pass.onChange, placeholder: pass.placeholder, text: pass.text});
	});
var author$project$Framework$StyleElementsInput$example6 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$newPassword,
			_List_Nil,
			{
				label: A2(
					author$project$Element$Input$labelAbove,
					_List_Nil,
					author$project$Element$text('Label')),
				onChange: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				placeholder: elm$core$Maybe$Nothing,
				show: false,
				text: model.text
			}),
		'Input.newPassword []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , show = False\n    }');
};
var author$project$Element$Input$currentPassword = F2(
	function (attrs, pass) {
		return A3(
			author$project$Element$Input$textHelper,
			{
				autofill: elm$core$Maybe$Just('current-password'),
				spellchecked: false,
				type_: author$project$Element$Input$TextInputNode(
					pass.show ? 'text' : 'password')
			},
			attrs,
			{label: pass.label, onChange: pass.onChange, placeholder: pass.placeholder, text: pass.text});
	});
var author$project$Framework$StyleElementsInput$example7 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$currentPassword,
			_List_Nil,
			{
				label: A2(
					author$project$Element$Input$labelAbove,
					_List_Nil,
					author$project$Element$text('Label')),
				onChange: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				placeholder: elm$core$Maybe$Nothing,
				show: false,
				text: model.text
			}),
		'Input.currentPassword []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , show = False\n    }');
};
var author$project$Framework$StyleElementsInput$example8 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$email,
			_List_Nil,
			{
				label: A2(
					author$project$Element$Input$labelAbove,
					_List_Nil,
					author$project$Element$text('Label')),
				onChange: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				placeholder: elm$core$Maybe$Nothing,
				text: model.text
			}),
		'Input.email []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    }');
};
var author$project$Element$Input$search = author$project$Element$Input$textHelper(
	{
		autofill: elm$core$Maybe$Nothing,
		spellchecked: false,
		type_: author$project$Element$Input$TextInputNode('search')
	});
var author$project$Framework$StyleElementsInput$example9 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Element$Input$search,
			_List_Nil,
			{
				label: A2(
					author$project$Element$Input$labelAbove,
					_List_Nil,
					author$project$Element$text('Label')),
				onChange: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				placeholder: elm$core$Maybe$Nothing,
				text: model.text
			}),
		'Input.search []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    }');
};
var author$project$Framework$viewSubSection = F2(
	function (model, _n0) {
		var componentExample = _n0.a;
		var componentExampleSourceCode = _n0.b;
		var _n1 = _Utils_eq(
			componentExample,
			author$project$Element$text('special: Form.example1')) ? A2(author$project$Framework$specialComponentFormField, model, author$project$Framework$FormField$example1) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: FormFieldWithPattern.example1')) ? A2(author$project$Framework$specialComponentFormFieldWithPattern, model, author$project$Framework$FormFieldWithPattern$example1) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: FormFieldWithPattern.example2')) ? A2(author$project$Framework$specialComponentFormFieldWithPattern, model, author$project$Framework$FormFieldWithPattern$example2) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: FormFieldWithPattern.example3')) ? A2(author$project$Framework$specialComponentFormFieldWithPattern, model, author$project$Framework$FormFieldWithPattern$example3) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: Cards.example1')) ? A2(author$project$Framework$specialComponentCards, model, author$project$Framework$Card$example1) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example0')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example0) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example1')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example1) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example2')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example2) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example3')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example3) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example4')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example4) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example5')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example5) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example6')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example6) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example7')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example7) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example8')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example8) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example9')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example9) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example9')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example9) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example10')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example10) : (_Utils_eq(
			componentExample,
			author$project$Element$text('special: example11')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example11) : _Utils_Tuple2(componentExample, componentExampleSourceCode))))))))))))))))));
		var componentExampleToDisplay = _n1.a;
		var componentExampleSourceCodeToDisplay = _n1.b;
		return A2(
			author$project$Element$row,
			_List_fromArray(
				[
					author$project$Element$spacing(16)
				]),
			_List_fromArray(
				[
					A2(
					author$project$Element$column,
					_List_fromArray(
						[
							author$project$Element$width(author$project$Element$fill),
							author$project$Element$alignTop
						]),
					_List_fromArray(
						[componentExampleToDisplay])),
					A2(author$project$Framework$sourceCodeWrapper, model.conf, componentExampleSourceCodeToDisplay)
				]));
	});
var author$project$Framework$viewIntrospectionBody = F3(
	function (model, title, listSubSection) {
		return A2(
			author$project$Element$column,
			_List_fromArray(
				[
					author$project$Element$padding(model.conf.mainPadding),
					author$project$Element$spacing(model.conf.mainPadding),
					author$project$Element$Background$color(author$project$ColorElement$white)
				]),
			_List_fromArray(
				[
					A2(
					author$project$Element$el,
					_List_fromArray(
						[
							author$project$Element$Font$size(28)
						]),
					author$project$Element$text(title)),
					A2(
					author$project$Element$column,
					_List_fromArray(
						[
							author$project$Element$spacing(10)
						]),
					A2(
						elm$core$List$map,
						function (_n0) {
							var part = _n0.a;
							var name = _n0.b;
							return A2(
								author$project$Framework$viewSubSection,
								model,
								_Utils_Tuple2(part, name));
						},
						listSubSection))
				]));
	});
var author$project$Element$Font$extraLight = A2(author$project$Internal$Model$Class, author$project$Internal$Flag$fontWeight, author$project$Internal$Style$classes.textExtraLight);
var author$project$Framework$viewTitleAndSubTitle = F3(
	function (configuration, title, subTitle) {
		return A2(
			author$project$Element$column,
			_List_fromArray(
				[
					author$project$Element$Background$color(configuration.grayF),
					author$project$Element$padding(configuration.mainPadding),
					author$project$Element$spacing(10),
					author$project$Element$height(author$project$Element$shrink)
				]),
			_List_fromArray(
				[
					A2(
					author$project$Element$el,
					_List_fromArray(
						[
							author$project$Element$Font$size(32),
							author$project$Element$Font$bold
						]),
					author$project$Element$text(title)),
					A2(
					author$project$Element$paragraph,
					_List_fromArray(
						[
							author$project$Element$Font$size(24),
							author$project$Element$Font$extraLight
						]),
					_List_fromArray(
						[subTitle]))
				]));
	});
var author$project$Framework$viewIntrospectionTitle = F2(
	function (configuration, introspection) {
		return A3(
			author$project$Framework$viewTitleAndSubTitle,
			configuration,
			introspection.name,
			author$project$Element$text(introspection.description));
	});
var author$project$Framework$viewIntrospection = F2(
	function (model, introspection) {
		return A2(
			author$project$Element$column,
			_List_Nil,
			A2(
				elm$core$List$cons,
				A2(author$project$Framework$viewIntrospectionTitle, model.conf, introspection),
				A2(
					elm$core$List$map,
					function (_n0) {
						var string = _n0.a;
						var listSubSections = _n0.b;
						return A3(author$project$Framework$viewIntrospectionBody, model, string, listSubSections);
					},
					introspection.variations)));
	});
var author$project$Framework$routeRoot = '#/';
var author$project$Framework$routeToString = function (page) {
	var pieces = function () {
		if (page.$ === 'RouteHome') {
			return _List_fromArray(
				[author$project$Framework$rootRoute]);
		} else {
			var slug1 = page.a;
			var slug2 = page.b;
			return _List_fromArray(
				[
					author$project$Framework$rootRoute,
					author$project$Framework$slugToString(slug1),
					author$project$Framework$slugToString(slug2)
				]);
		}
	}();
	return _Utils_ap(
		author$project$Framework$routeRoot,
		A2(elm$core$String$join, '/', pieces));
};
var author$project$Framework$viewLogo = F3(
	function (title, subTitle, version) {
		return A2(
			author$project$Element$link,
			_List_Nil,
			{
				label: A2(
					author$project$Element$column,
					_List_fromArray(
						[
							author$project$Element$height(author$project$Element$shrink),
							author$project$Element$spacing(10)
						]),
					_List_fromArray(
						[
							A2(
							author$project$Element$el,
							_List_fromArray(
								[
									author$project$Element$Font$size(60),
									author$project$Element$Font$bold
								]),
							title),
							A2(
							author$project$Element$el,
							_List_fromArray(
								[
									author$project$Element$Font$size(16),
									author$project$Element$Font$bold
								]),
							author$project$Element$text(subTitle)),
							A2(
							author$project$Element$el,
							_List_fromArray(
								[
									author$project$Element$Font$size(12),
									author$project$Element$Font$bold
								]),
							author$project$Element$text('v' + version))
						])),
				url: author$project$Framework$routeToString(author$project$Framework$RouteHome)
			});
	});
var author$project$Framework$viewSomething = F2(
	function (model, _n0) {
		var introspection = _n0.a;
		var _n1 = _n0.b;
		var title = _n1.a;
		var listSubSection = _n1.b;
		return A2(
			author$project$Element$column,
			_List_Nil,
			A2(
				elm$core$List$cons,
				A2(author$project$Framework$viewIntrospectionTitle, model.conf, introspection),
				_Utils_ap(
					(introspection.signature !== '') ? _List_fromArray(
						[
							A2(
							author$project$Element$paragraph,
							_List_fromArray(
								[
									author$project$Element$Font$family(
									_List_fromArray(
										[author$project$Element$Font$monospace])),
									A2(author$project$Element$paddingXY, 40, 20)
								]),
							_List_fromArray(
								[
									author$project$Element$text(
									A2(
										elm$core$String$join,
										'⇾',
										A2(elm$core$String$split, '->', introspection.signature)))
								]))
						]) : _List_Nil,
					_List_fromArray(
						[
							A3(author$project$Framework$viewIntrospectionBody, model, title, listSubSection)
						]))));
	});
var author$project$Framework$viewContentColumn = function (model) {
	var _n0 = author$project$Framework$maybeSelected(model);
	if (_n0.$ === 'Just') {
		var something = _n0.a;
		return A2(author$project$Framework$viewSomething, model, something);
	} else {
		return A2(
			author$project$Element$el,
			_List_fromArray(
				[
					author$project$Element$height(author$project$Element$fill),
					author$project$Element$width(author$project$Element$fill),
					author$project$Element$scrollbars
				]),
			A2(
				author$project$Element$column,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						author$project$Element$column,
						_List_fromArray(
							[
								author$project$Element$padding(model.conf.mainPadding + 100),
								author$project$Element$spacing(model.conf.mainPadding)
							]),
						_List_fromArray(
							[
								A2(
								author$project$Element$el,
								_List_Nil,
								A3(author$project$Framework$viewLogo, model.conf.title, model.conf.subTitle, model.conf.version)),
								A2(
								author$project$Element$el,
								_List_fromArray(
									[
										author$project$Element$Font$size(24)
									]),
								model.conf.introduction),
								A2(
								author$project$Element$el,
								_List_fromArray(
									[
										author$project$Element$centerX,
										author$project$Element$alpha(0.2)
									]),
								A2(author$project$Framework$Icon$chevronDown, author$project$Framework$Color$grey, 32))
							])),
						A2(
						author$project$Element$column,
						_List_Nil,
						A2(
							elm$core$List$map,
							function (_n1) {
								var introspection = _n1.a;
								return A2(author$project$Framework$viewIntrospection, model, introspection);
							},
							model.introspections))
					])));
	}
};
var author$project$Framework$MsgCloseAllSections = {$: 'MsgCloseAllSections'};
var author$project$Framework$MsgOpenAllSections = {$: 'MsgOpenAllSections'};
var author$project$Framework$MsgToggleSection = function (a) {
	return {$: 'MsgToggleSection', a: a};
};
var author$project$Framework$viewListVariationForMenu = F2(
	function (introspection, variations) {
		return A2(
			elm$core$List$map,
			function (_n0) {
				var title = _n0.a;
				return A2(
					author$project$Element$link,
					_List_Nil,
					{
						label: author$project$Element$text(title),
						url: author$project$Framework$routeToString(
							A2(
								author$project$Framework$RouteSubPage,
								author$project$Framework$Slug(introspection.name),
								author$project$Framework$Slug(title)))
					});
			},
			variations);
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var author$project$Framework$viewIntrospectionForMenu = F3(
	function (configuration, introspection, open) {
		return A2(
			author$project$Element$column,
			_List_fromArray(
				[
					author$project$Element$Font$color(author$project$ColorElement$black)
				]),
			_List_fromArray(
				[
					A2(
					author$project$Element$el,
					_List_fromArray(
						[
							author$project$Element$pointer,
							author$project$Element$Events$onClick(
							author$project$Framework$MsgToggleSection(introspection.name)),
							author$project$Element$width(author$project$Element$fill),
							author$project$Element$Font$bold
						]),
					A2(
						author$project$Element$paragraph,
						_List_fromArray(
							[author$project$Element$alignLeft]),
						_List_fromArray(
							[
								A2(
								author$project$Element$el,
								_List_fromArray(
									[
										author$project$Element$padding(5),
										author$project$Element$rotate(
										open ? (elm$core$Basics$pi / 2) : 0)
									]),
								author$project$Element$text('⟩ ')),
								A2(
								author$project$Element$el,
								_List_fromArray(
									[
										author$project$Element$Font$size(18),
										author$project$Element$Font$bold
									]),
								author$project$Element$text(introspection.name))
							]))),
					A2(
					author$project$Element$column,
					_Utils_ap(
						_List_fromArray(
							[
								author$project$Element$clip,
								author$project$Element$height(author$project$Element$shrink),
								author$project$Element$Font$size(16),
								author$project$Element$Font$color(author$project$ColorElement$black),
								author$project$Element$spacing(12),
								author$project$Element$paddingEach(
								{bottom: 0, left: 26, right: 0, top: 12})
							]),
						open ? _List_fromArray(
							[
								author$project$Element$htmlAttribute(
								elm$html$Html$Attributes$class('elmStyleguideGenerator-open'))
							]) : _List_fromArray(
							[
								author$project$Element$htmlAttribute(
								elm$html$Html$Attributes$class('elmStyleguideGenerator-close'))
							])),
					A2(author$project$Framework$viewListVariationForMenu, introspection, introspection.variations))
				]));
	});
var author$project$Framework$viewMenuColumn = function (model) {
	return A2(
		author$project$Element$column,
		_List_fromArray(
			[
				author$project$Element$Background$color(model.conf.gray3),
				author$project$Element$Font$color(author$project$ColorElement$black),
				author$project$Element$width(author$project$Element$fill),
				author$project$Element$height(author$project$Element$shrink),
				author$project$Element$spacing(30),
				A2(author$project$Element$paddingXY, model.conf.mainPadding, model.conf.mainPadding),
				author$project$Element$height(author$project$Element$fill)
			]),
		_List_fromArray(
			[
				A2(
				author$project$Element$column,
				_List_fromArray(
					[
						author$project$Element$height(author$project$Element$shrink)
					]),
				_List_fromArray(
					[
						A3(author$project$Framework$viewLogo, model.conf.title, model.conf.subTitle, model.conf.version),
						A2(
						author$project$Element$row,
						_List_fromArray(
							[
								author$project$Element$spacing(10),
								author$project$Element$Font$size(14),
								author$project$Element$Font$color(author$project$ColorElement$black),
								A2(author$project$Element$paddingXY, 0, 20)
							]),
						_List_fromArray(
							[
								A2(
								author$project$Element$el,
								_List_fromArray(
									[
										author$project$Element$pointer,
										author$project$Element$Events$onClick(author$project$Framework$MsgOpenAllSections)
									]),
								author$project$Element$text('Expand All')),
								A2(
								author$project$Element$el,
								_List_fromArray(
									[
										author$project$Element$pointer,
										author$project$Element$Events$onClick(author$project$Framework$MsgCloseAllSections)
									]),
								author$project$Element$text('Close All'))
							]))
					])),
				A2(
				author$project$Element$column,
				_List_fromArray(
					[
						author$project$Element$spacing(30),
						author$project$Element$height(author$project$Element$shrink),
						author$project$Element$alignTop
					]),
				A2(
					elm$core$List$map,
					function (_n0) {
						var data = _n0.a;
						var show = _n0.b;
						return A3(author$project$Framework$viewIntrospectionForMenu, model.conf, data, show);
					},
					model.introspections))
			]));
};
var author$project$Framework$viewPage = F2(
	function (maybeWindowSize, model) {
		return A2(
			author$project$Element$row,
			_List_fromArray(
				[
					author$project$Element$height(
					function () {
						if (maybeWindowSize.$ === 'Just') {
							var windowSize = maybeWindowSize.a;
							return author$project$Element$px(windowSize.height);
						} else {
							return author$project$Element$fill;
						}
					}()),
					author$project$Element$width(author$project$Element$fill)
				]),
			_List_fromArray(
				[
					author$project$Element$html(
					A3(
						elm$html$Html$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(author$project$Framework$css)
							]))),
					A2(
					author$project$Element$el,
					_List_fromArray(
						[
							author$project$Element$height(author$project$Element$fill),
							author$project$Element$scrollbarY,
							author$project$Element$clipX,
							author$project$Element$width(
							author$project$Element$px(310))
						]),
					author$project$Framework$viewMenuColumn(model)),
					A2(
					author$project$Element$el,
					_List_fromArray(
						[
							author$project$Element$height(author$project$Element$fill),
							author$project$Element$scrollbarY,
							author$project$Element$clipX,
							author$project$Element$width(author$project$Element$fill)
						]),
					author$project$Framework$viewContentColumn(model))
				]));
	});
var author$project$Framework$view = function (model) {
	return {
		body: _List_fromArray(
			[
				A3(
				author$project$Element$layoutWith,
				{
					options: _List_fromArray(
						[
							author$project$Element$focusStyle(
							{
								backgroundColor: elm$core$Maybe$Nothing,
								borderColor: elm$core$Maybe$Just(
									A3(author$project$Element$rgb, 0.9, 0.2, 0.2)),
								shadow: elm$core$Maybe$Nothing
							})
						])
				},
				_List_fromArray(
					[
						author$project$Element$Font$family(
						_List_fromArray(
							[
								author$project$Element$Font$external(
								{name: author$project$Framework$Configuration$conf.font.typeface, url: author$project$Framework$Configuration$conf.font.url}),
								author$project$Element$Font$typeface(author$project$Framework$Configuration$conf.font.typeface),
								author$project$Framework$Configuration$conf.font.typefaceFallback
							])),
						author$project$Element$Font$size(16),
						author$project$Element$Font$color(author$project$ColorElement$black),
						author$project$Element$Background$color(author$project$ColorElement$white),
						model.conf.forkMe
					]),
				A2(author$project$Framework$viewPage, model.maybeWindowSize, model))
			]),
		title: '0.19 - Elm Style Framework'
	};
};
var elm$browser$Browser$Env = F2(
	function (flags, url) {
		return {flags: flags, url: url};
	});
var elm$browser$Browser$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$unsafeToUrl = function (string) {
	var _n0 = elm$url$Url$fromString(string);
	if (_n0.$ === 'Just') {
		var url = _n0.a;
		return url;
	} else {
		return _Browser_invalidUrl(string);
	}
};
var elm$browser$Browser$Navigation$Manager$Listen = function (a) {
	return {$: 'Listen', a: a};
};
var elm$browser$Browser$Navigation$Manager$State = F2(
	function (subs, popWatcher) {
		return {popWatcher: popWatcher, subs: subs};
	});
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$browser$Browser$Navigation$Manager$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Navigation$Manager$State, _List_Nil, elm$core$Maybe$Nothing));
var elm$browser$Browser$Navigation$Manager$go = _Browser_go;
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$browser$Browser$Navigation$Manager$ignore = F2(
	function (task, b) {
		return A2(
			elm$core$Task$andThen,
			function (_n0) {
				return elm$core$Task$succeed(b);
			},
			task);
	});
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$browser$Browser$Navigation$Manager$notify = F3(
	function (router, subs, url) {
		var send = function (_n0) {
			var tagger = _n0.a;
			return A2(
				elm$core$Platform$sendToApp,
				router,
				tagger(url));
		};
		return A2(
			elm$browser$Browser$Navigation$Manager$ignore,
			elm$core$Task$sequence(
				A2(elm$core$List$map, send, subs)),
			_Utils_Tuple0);
	});
var elm$browser$Browser$Navigation$Manager$pushState = _Browser_pushState;
var elm$browser$Browser$Navigation$Manager$replaceState = _Browser_replaceState;
var elm$browser$Browser$Navigation$Manager$cmdHelp = F3(
	function (router, subs, cmd) {
		switch (cmd.$) {
			case 'Go':
				var n = cmd.a;
				return elm$browser$Browser$Navigation$Manager$go(n);
			case 'Push':
				var url = cmd.a;
				return A2(
					elm$core$Task$andThen,
					A2(elm$browser$Browser$Navigation$Manager$notify, router, subs),
					elm$browser$Browser$Navigation$Manager$pushState(url));
			default:
				var url = cmd.a;
				return A2(
					elm$core$Task$andThen,
					A2(elm$browser$Browser$Navigation$Manager$notify, router, subs),
					elm$browser$Browser$Navigation$Manager$replaceState(url));
		}
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$browser$Browser$Navigation$Manager$killPopWatcher = function (popWatcher) {
	if (popWatcher.$ === 'Normal') {
		var pid = popWatcher.a;
		return elm$core$Process$kill(pid);
	} else {
		var pid1 = popWatcher.a;
		var pid2 = popWatcher.b;
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Process$kill(pid2);
			},
			elm$core$Process$kill(pid1));
	}
};
var elm$browser$Browser$Navigation$Manager$InternetExplorer = F2(
	function (a, b) {
		return {$: 'InternetExplorer', a: a, b: b};
	});
var elm$browser$Browser$Navigation$Manager$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$browser$Browser$Navigation$Manager$reportUrl = F2(
	function (name, router) {
		return A4(
			_Browser_on,
			_Browser_window,
			true,
			name,
			function (_n0) {
				return A2(
					elm$core$Platform$sendToSelf,
					router,
					_Browser_getUrl(_Utils_Tuple0));
			});
	});
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$browser$Browser$Navigation$Manager$spawnPopWatcher = function (router) {
	return _Browser_isInternetExplorer11(_Utils_Tuple0) ? A3(
		elm$core$Task$map2,
		elm$browser$Browser$Navigation$Manager$InternetExplorer,
		A2(elm$browser$Browser$Navigation$Manager$reportUrl, 'popstate', router),
		A2(elm$browser$Browser$Navigation$Manager$reportUrl, 'hashchange', router)) : A2(
		elm$core$Task$map,
		elm$browser$Browser$Navigation$Manager$Normal,
		A2(elm$browser$Browser$Navigation$Manager$reportUrl, 'popstate', router));
};
var elm$browser$Browser$Navigation$Manager$onEffects = F4(
	function (router, cmds, subs, _n0) {
		var popWatcher = _n0.popWatcher;
		var stepState = function () {
			var _n2 = _Utils_Tuple2(subs, popWatcher);
			_n2$2:
			while (true) {
				if (!_n2.a.b) {
					if (_n2.b.$ === 'Just') {
						var watcher = _n2.b.a;
						return A2(
							elm$browser$Browser$Navigation$Manager$ignore,
							elm$browser$Browser$Navigation$Manager$killPopWatcher(watcher),
							A2(elm$browser$Browser$Navigation$Manager$State, subs, elm$core$Maybe$Nothing));
					} else {
						break _n2$2;
					}
				} else {
					if (_n2.b.$ === 'Nothing') {
						var _n3 = _n2.a;
						var _n4 = _n2.b;
						return A2(
							elm$core$Task$map,
							function ($) {
								return A2(
									elm$browser$Browser$Navigation$Manager$State,
									subs,
									elm$core$Maybe$Just($));
							},
							elm$browser$Browser$Navigation$Manager$spawnPopWatcher(router));
					} else {
						break _n2$2;
					}
				}
			}
			return elm$core$Task$succeed(
				A2(elm$browser$Browser$Navigation$Manager$State, subs, popWatcher));
		}();
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return stepState;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					A2(elm$browser$Browser$Navigation$Manager$cmdHelp, router, subs),
					cmds)));
	});
var elm$browser$Browser$Navigation$Manager$onSelfMsg = F3(
	function (router, url, state) {
		return A2(
			elm$browser$Browser$Navigation$Manager$ignore,
			A3(elm$browser$Browser$Navigation$Manager$notify, router, state.subs, url),
			state);
	});
var elm$browser$Browser$Navigation$Manager$Go = function (a) {
	return {$: 'Go', a: a};
};
var elm$browser$Browser$Navigation$Manager$Push = function (a) {
	return {$: 'Push', a: a};
};
var elm$browser$Browser$Navigation$Manager$Replace = function (a) {
	return {$: 'Replace', a: a};
};
var elm$browser$Browser$Navigation$Manager$cmdMap = F2(
	function (_n0, myCmd) {
		switch (myCmd.$) {
			case 'Go':
				var n = myCmd.a;
				return elm$browser$Browser$Navigation$Manager$Go(n);
			case 'Push':
				var url = myCmd.a;
				return elm$browser$Browser$Navigation$Manager$Push(url);
			default:
				var url = myCmd.a;
				return elm$browser$Browser$Navigation$Manager$Replace(url);
		}
	});
var elm$browser$Browser$Navigation$Manager$subMap = F2(
	function (func, _n0) {
		var tagger = _n0.a;
		return elm$browser$Browser$Navigation$Manager$Listen(
			function ($) {
				return func(
					tagger($));
			});
	});
_Platform_effectManagers['Browser.Navigation.Manager'] = _Platform_createManager(elm$browser$Browser$Navigation$Manager$init, elm$browser$Browser$Navigation$Manager$onEffects, elm$browser$Browser$Navigation$Manager$onSelfMsg, elm$browser$Browser$Navigation$Manager$cmdMap, elm$browser$Browser$Navigation$Manager$subMap);
var elm$browser$Browser$Navigation$Manager$command = _Platform_leaf('Browser.Navigation.Manager');
var elm$browser$Browser$Navigation$Manager$subscription = _Platform_leaf('Browser.Navigation.Manager');
var elm$browser$Browser$Navigation$Manager$addListen = F3(
	function (toMsg, toSubs, model) {
		return elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					elm$browser$Browser$Navigation$Manager$subscription(
					elm$browser$Browser$Navigation$Manager$Listen(toMsg)),
					toSubs(model)
				]));
	});
var elm$browser$Browser$fullscreen = function (impl) {
	return _Browser_fullscreen(
		{
			init: function (_n0) {
				var flags = _n0.flags;
				var url = _n0.url;
				return impl.init(
					A2(
						elm$browser$Browser$Env,
						flags,
						elm$browser$Browser$unsafeToUrl(url)));
			},
			subscriptions: function () {
				var _n1 = impl.onNavigation;
				if (_n1.$ === 'Nothing') {
					return impl.subscriptions;
				} else {
					var toMsg = _n1.a;
					return A2(
						elm$browser$Browser$Navigation$Manager$addListen,
						function ($) {
							return toMsg(
								elm$browser$Browser$unsafeToUrl($));
						},
						impl.subscriptions);
				}
			}(),
			update: impl.update,
			view: impl.view
		});
};
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$Framework$main = elm$browser$Browser$fullscreen(
	{
		init: author$project$Framework$init,
		onNavigation: elm$core$Maybe$Just(author$project$Framework$onNavigation),
		subscriptions: author$project$Framework$subscriptions,
		update: author$project$Framework$update,
		view: author$project$Framework$view
	});
_Platform_export({'Framework':author$project$Framework$main(elm$json$Json$Decode$value)(0)({})});}(this));