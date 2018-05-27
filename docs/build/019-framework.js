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




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


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

	/**_UNUSED/
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

	/**/
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

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
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

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


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

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
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

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
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


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
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
	if (region.bl.an === region.bz.an)
	{
		return 'on line ' + region.bl.an;
	}
	return 'on lines ' + region.bl.an + ' through ' + region.bz.an;
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

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

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
			impl.dc,
			impl.ez,
			impl.d9,
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


function _Platform_export(exports)
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


function _Platform_export_UNUSED(exports)
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

function _VirtualDom_noJavaScriptUri(value)
{
	return /^\s*javascript:/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^\s*javascript:/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
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
		I: _VirtualDom_mapTimed(func, record.I),
		b1: record.b1,
		bU: record.bU
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

	if (tag === 1 ? value.b : tag === 3 && value.b1) event.stopPropagation();
	if (tag === 2 ? value.b : tag === 3 && value.bU) event.preventDefault();

	return tag < 3 ? value.a : value.I;
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
	if (options.bL) { flags += 'm'; }
	if (options.bv) { flags += 'i'; }

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
			impl.dc,
			impl.ez,
			impl.d9,
			_Browser_makeStepperBuilder(node, impl.eA)
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
			impl.dc,
			impl.ez,
			impl.d9,
			_Browser_makeStepperBuilder(_VirtualDom_doc.body, function(model) {
				var ui = impl.eA(model);
				if (_VirtualDom_doc.title !== ui.az)
				{
					_VirtualDom_doc.title = ui.az;
				}
				return _VirtualDom_node('body')(_List_Nil)(ui.cs);
			})
		);
	};
	return object;
});


function _Browser_toEnv(flags)
{
	return {
		n: _Browser_getUrl(),
		cU: flags
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
});var elm$core$Basics$False = 1;
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = 1;
var elm$core$Basics$GT = 2;
var elm$core$Basics$LT = 0;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
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
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
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
		return {$: 0, a: a, b: b, c: c, d: d};
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
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
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
		if (!builder.d) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.e),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.e);
		} else {
			var treeLen = builder.d * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.g) : builder.g;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.d);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.e) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.e);
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
					{g: nodeList, d: (len / elm$core$Array$branchFactor) | 0, e: tail});
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
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
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
		return {bd: height, b5: width};
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
	if (!decoded.$) {
		var flag = decoded.a;
		return elm$core$Maybe$Just(flag);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Color$RGBA = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var author$project$Color$rgb = F3(
	function (r, g, b) {
		return A4(author$project$Color$RGBA, r, g, b, 1);
	});
var author$project$Color$black = A3(author$project$Color$rgb, 20, 20, 20);
var author$project$Color$toFloatNorm255 = function (_int) {
	return _int / 255;
};
var elm$core$Basics$modBy = _Basics_modBy;
var author$project$Color$fmod = F2(
	function (f, n) {
		var integer = elm$core$Basics$floor(f);
		return (A2(elm$core$Basics$modBy, n, integer) + f) - integer;
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
	if (!color.$) {
		var r = color.a;
		var g = color.b;
		var b = color.c;
		var a = color.d;
		return {x: a, y: b, A: g, D: r};
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
			x: a,
			y: elm$core$Basics$round(255 * b),
			A: elm$core$Basics$round(255 * g),
			D: elm$core$Basics$round(255 * r)
		};
	}
};
var mdgriffith$stylish_elephants$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Element$rgba = mdgriffith$stylish_elephants$Internal$Model$Rgba;
var author$project$Color$toElementColor = function (color) {
	var c = author$project$Color$toRgb(color);
	return A4(
		mdgriffith$stylish_elephants$Element$rgba,
		author$project$Color$toFloatNorm255(c.D),
		author$project$Color$toFloatNorm255(c.A),
		author$project$Color$toFloatNorm255(c.y),
		c.x);
};
var author$project$Framework$Logo$ElmColor = function (a) {
	return {$: 0, a: a};
};
var author$project$Framework$Logo$LogoElm = function (a) {
	return {$: 0, a: a};
};
var author$project$Framework$Logo$White = 4;
var author$project$Framework$Logo$Blue = 3;
var author$project$Framework$Logo$Green = 1;
var author$project$Framework$Logo$LightBlue = 2;
var author$project$Framework$Logo$Orange = 0;
var author$project$Framework$Logo$cssRgb = function (color) {
	switch (color) {
		case 0:
			return '#f0ad00';
		case 1:
			return '#7fd13b';
		case 2:
			return '#60b5cc';
		case 3:
			return '#5a6378';
		case 4:
			return '#fff';
		default:
			return '#000';
	}
};
var author$project$Framework$Logo$ratio = 1;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$json$Json$Decode$map = _Json_map1;
var elm$virtual_dom$VirtualDom$isSync = function (timed) {
	if (!timed.$) {
		return true;
	} else {
		return false;
	}
};
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
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
			if (type_.$ === 1) {
				return {
					a4: author$project$Framework$Logo$cssRgb(0),
					a5: author$project$Framework$Logo$cssRgb(1),
					a6: author$project$Framework$Logo$cssRgb(2),
					a7: author$project$Framework$Logo$cssRgb(3)
				};
			} else {
				var cl = type_.a;
				return {
					a4: author$project$Framework$Logo$cssRgb(cl),
					a5: author$project$Framework$Logo$cssRgb(cl),
					a6: author$project$Framework$Logo$cssRgb(cl),
					a7: author$project$Framework$Logo$cssRgb(cl)
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
							f(c.a4),
							d('M162 153l70-70H92zm94 94l67 67V179z')
						]),
					_List_Nil),
					A2(
					p,
					_List_fromArray(
						[
							f(c.a5),
							d('M9 0l70 70h153L162 0zm238 85l77 76-77 77-76-77z')
						]),
					_List_Nil),
					A2(
					p,
					_List_fromArray(
						[
							f(c.a6),
							d('M323 144V0H180zm-161 27L9 323h305z')
						]),
					_List_Nil),
					A2(
					p,
					_List_fromArray(
						[
							f(c.a7),
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
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var mdgriffith$stylish_elephants$Internal$Model$Unstyled = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$unstyled = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
		elm$core$Basics$always($));
};
var mdgriffith$stylish_elephants$Element$html = mdgriffith$stylish_elephants$Internal$Model$unstyled;
var author$project$Framework$Logo$logo = F2(
	function (lg, size) {
		return mdgriffith$stylish_elephants$Element$html(
			function () {
				if (lg.$ === 1) {
					return author$project$Framework$Logo$logoLucamug(size);
				} else {
					var logoElmType = lg.a;
					return A2(author$project$Framework$Logo$elmLogo, logoElmType, size);
				}
			}());
	});
var mdgriffith$stylish_elephants$Internal$Model$AlignX = function (a) {
	return {$: 6, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Right = 2;
var mdgriffith$stylish_elephants$Element$alignRight = mdgriffith$stylish_elephants$Internal$Model$AlignX(2);
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var elm$core$Basics$pow = _Basics_pow;
var mdgriffith$stylish_elephants$Internal$Flag$Flag = elm$core$Basics$identity;
var mdgriffith$stylish_elephants$Internal$Flag$col = function (i) {
	return A2(elm$core$Basics$pow, 2, i);
};
var mdgriffith$stylish_elephants$Internal$Flag$transparency = mdgriffith$stylish_elephants$Internal$Flag$col(1);
var mdgriffith$stylish_elephants$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$floatClass = function (x) {
	return elm$core$String$fromInt(
		elm$core$Basics$round(x * 100));
};
var mdgriffith$stylish_elephants$Element$alpha = function (o) {
	var transparency = function (x) {
		return 1 - x;
	}(
		A2(
			elm$core$Basics$min,
			1.0,
			A2(elm$core$Basics$max, 0.0, o)));
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$transparency,
		A2(
			mdgriffith$stylish_elephants$Internal$Model$Transparency,
			'transparency-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(transparency),
			transparency));
};
var mdgriffith$stylish_elephants$Internal$Model$Fill = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Element$fill = mdgriffith$stylish_elephants$Internal$Model$Fill(1);
var mdgriffith$stylish_elephants$Internal$Model$Height = function (a) {
	return {$: 8, a: a};
};
var mdgriffith$stylish_elephants$Element$height = mdgriffith$stylish_elephants$Internal$Model$Height;
var mdgriffith$stylish_elephants$Internal$Model$Width = function (a) {
	return {$: 7, a: a};
};
var mdgriffith$stylish_elephants$Element$width = mdgriffith$stylish_elephants$Internal$Model$Width;
var mdgriffith$stylish_elephants$Internal$Model$Unkeyed = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AsColumn = 1;
var mdgriffith$stylish_elephants$Internal$Model$asColumn = 1;
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
var elm$core$Basics$and = _Basics_and;
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
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Set$Set_elm_builtin = elm$core$Basics$identity;
var elm$core$Set$empty = elm$core$Dict$empty;
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var mdgriffith$stylish_elephants$Internal$Flag$heightContent = mdgriffith$stylish_elephants$Internal$Flag$col(36);
var elm$core$Bitwise$and = _Bitwise_and;
var mdgriffith$stylish_elephants$Internal$Flag$present = F2(
	function (_n0, _n1) {
		var query = _n0;
		var truth = _n1;
		return _Utils_eq(query & truth, query);
	});
var mdgriffith$stylish_elephants$Internal$Flag$widthContent = mdgriffith$stylish_elephants$Internal$Flag$col(38);
var mdgriffith$stylish_elephants$Internal$Model$Keyed = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Styled = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AsEl = 2;
var mdgriffith$stylish_elephants$Internal$Model$asEl = 2;
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
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
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
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
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0;
		return A3(elm$core$Dict$insert, key, 0, dict);
	});
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
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
		if (!_n0.$) {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$member, key, dict);
	});
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var mdgriffith$stylish_elephants$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 0:
			var px = x.a;
			return elm$core$String$fromInt(px) + 'px';
		case 1:
			return 'auto';
		case 2:
			var i = x.a;
			return elm$core$String$fromInt(i) + 'fr';
		case 3:
			var min = x.a;
			var len = x.b;
			return 'min' + (elm$core$String$fromInt(min) + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + (elm$core$String$fromInt(max) + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(len));
	}
};
var mdgriffith$stylish_elephants$Internal$Model$pseudoClassName = function (_class) {
	switch (_class) {
		case 0:
			return 'focus';
		case 1:
			return 'hover';
		default:
			return 'active';
	}
};
var mdgriffith$stylish_elephants$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 12:
			var name = style.a;
			return name;
		case 11:
			var name = style.a;
			var o = style.b;
			return name;
		case 0:
			var _class = style.a;
			return _class;
		case 1:
			var name = style.a;
			return name;
		case 2:
			var i = style.a;
			return 'font-size-' + elm$core$String$fromInt(i);
		case 3:
			var _class = style.a;
			return _class;
		case 4:
			var _class = style.a;
			return _class;
		case 5:
			var x = style.a;
			var y = style.b;
			return 'spacing-' + (elm$core$String$fromInt(x) + ('-' + elm$core$String$fromInt(y)));
		case 6:
			var top = style.a;
			var right = style.b;
			var bottom = style.c;
			var left = style.d;
			return 'pad-' + (elm$core$String$fromInt(top) + ('-' + (elm$core$String$fromInt(right) + ('-' + (elm$core$String$fromInt(bottom) + ('-' + elm$core$String$fromInt(left)))))));
		case 7:
			var template = style.a;
			return 'grid-rows-' + (A2(
				elm$core$String$join,
				'-',
				A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.dW)) + ('-cols-' + (A2(
				elm$core$String$join,
				'-',
				A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.p)) + ('-space-x-' + (mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.d3.a) + ('-space-y-' + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.d3.b)))))));
		case 8:
			var pos = style.a;
			return 'grid-pos-' + (elm$core$String$fromInt(pos.L) + ('-' + (elm$core$String$fromInt(pos.cL) + ('-' + (elm$core$String$fromInt(pos.b5) + ('-' + elm$core$String$fromInt(pos.bd)))))));
		case 10:
			var selector = style.a;
			var subStyle = style.b;
			return A2(
				elm$core$String$join,
				' ',
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$pseudoClassName(selector),
					A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$getStyleName, subStyle)));
		default:
			return 'transformation';
	}
};
var mdgriffith$stylish_elephants$Internal$Model$reduceStyles = F2(
	function (style, _n0) {
		var cache = _n0.a;
		var existing = _n0.b;
		var styleName = mdgriffith$stylish_elephants$Internal$Model$getStyleName(style);
		return A2(elm$core$Set$member, styleName, cache) ? _Utils_Tuple2(cache, existing) : _Utils_Tuple2(
			A2(elm$core$Set$insert, styleName, cache),
			A2(elm$core$List$cons, style, existing));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (!_n0.$) {
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
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var mdgriffith$stylish_elephants$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$core$String$fromFloat = _String_fromNumber;
var mdgriffith$stylish_elephants$Internal$Model$formatColor = function (_n0) {
	var red = _n0.a;
	var green = _n0.b;
	var blue = _n0.c;
	var alpha = _n0.d;
	return 'rgba(' + (elm$core$String$fromInt(
		elm$core$Basics$round(red * 255)) + ((',' + elm$core$String$fromInt(
		elm$core$Basics$round(green * 255))) + ((',' + elm$core$String$fromInt(
		elm$core$Basics$round(blue * 255))) + (',' + (elm$core$String$fromFloat(alpha) + ')')))));
};
var mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		elm$core$String$join,
		' ',
		A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.be ? elm$core$Maybe$Just('inset') : elm$core$Maybe$Nothing,
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.dw.a) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.dw.b) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.cr) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.F) + 'px'),
					elm$core$Maybe$Just(
					mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.j))
				])));
};
var mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle = function (focus) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$Style,
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
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'border-color',
							mdgriffith$stylish_elephants$Internal$Model$formatColor(color));
					},
					focus.cv),
					A2(
					elm$core$Maybe$map,
					function (color) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'background-color',
							mdgriffith$stylish_elephants$Internal$Model$formatColor(color));
					},
					focus.cl),
					A2(
					elm$core$Maybe$map,
					function (shadow) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'box-shadow',
							mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(
								{
									cr: shadow.cr,
									j: shadow.j,
									be: false,
									dw: A2(
										elm$core$Tuple$mapSecond,
										elm$core$Basics$toFloat,
										A2(elm$core$Tuple$mapFirst, elm$core$Basics$toFloat, shadow.dw)),
									F: shadow.F
								}));
					},
					focus.d$),
					elm$core$Maybe$Just(
					A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'outline', 'none'))
				])));
};
var elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var mdgriffith$stylish_elephants$Internal$Flag$alignBottom = mdgriffith$stylish_elephants$Internal$Flag$col(41);
var mdgriffith$stylish_elephants$Internal$Flag$alignRight = mdgriffith$stylish_elephants$Internal$Flag$col(40);
var mdgriffith$stylish_elephants$Internal$Flag$centerX = mdgriffith$stylish_elephants$Internal$Flag$col(42);
var mdgriffith$stylish_elephants$Internal$Flag$centerY = mdgriffith$stylish_elephants$Internal$Flag$col(43);
var mdgriffith$stylish_elephants$Internal$Flag$heightFill = mdgriffith$stylish_elephants$Internal$Flag$col(37);
var mdgriffith$stylish_elephants$Internal$Flag$widthFill = mdgriffith$stylish_elephants$Internal$Flag$col(39);
var elm$json$Json$Encode$string = _Json_wrap;
var elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var mdgriffith$stylish_elephants$Internal$Model$vDomClass = function (cls) {
	return A2(
		elm$virtual_dom$VirtualDom$property,
		'className',
		elm$json$Json$Encode$string(cls));
};
var mdgriffith$stylish_elephants$Internal$Style$classes = {b8: 'a', b9: 'av', ca: 'ab', cb: 'cx', cc: 'cy', cd: 'acb', ce: 'accx', cf: 'accy', cg: 'acr', br: 'al', bs: 'ar', ch: 'at', ci: 's', cm: 'bh', cn: 'b', ct: 'w7', cw: 'bd', cx: 'bdt', aF: 'bn', cy: 'bs', aG: 'cpe', cG: 'cp', cH: 'cpx', cI: 'cpy', H: 'c', aJ: 'cr', aK: 'cb', ah: 'ccx', X: 'ccy', bx: 'cl', aL: 'cr', cM: 'ct', cN: 'cptr', cO: 'ctxt', aj: 'fs', c3: 'g', am: 'hc', bF: 'hf', c4: 'hfp', c5: 'hv', c9: 'fr', dd: 'i', du: 'notxt', dy: 'ol', dA: 'or', R: 'oq', aU: 'oh', bM: 'pg', bN: 'p', aV: 'ppe', dV: 'se', L: 'r', dX: 'sb', dY: 'sbx', dZ: 'sby', d_: 'sb', d0: 'e', d2: 'se', d6: 'sk', eb: 't', ec: 'tc', ed: 'w8', ee: 'w2', ef: 'w9', eg: 'tj', a1: 'tja', eh: 'tl', ei: 'w3', ej: 'w5', ek: 'w4', el: 'tr', em: 'w6', en: 'w1', eo: 'tun', eu: 'ts', ev: 'clr', ey: 'u', b6: 'wc', eF: 'we', b7: 'wf', eG: 'wfp'};
var mdgriffith$stylish_elephants$Internal$Model$renderNode = F4(
	function (_n0, children, styles, context) {
		var attributes = _n0.a;
		var node = _n0.f;
		var has = _n0.b;
		var createNode = F3(
			function (nodeName, attrs, withStyles) {
				if (children.$ === 1) {
					var keyed = children.a;
					return A3(
						elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							if (withStyles.$ === 1) {
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
													mdgriffith$stylish_elephants$Internal$Model$vDomClass('stylesheet')
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
							if (withStyles.$ === 1) {
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
												mdgriffith$stylish_elephants$Internal$Model$vDomClass('stylesheet')
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
				case 0:
					return A3(createNode, 'div', attributes, styles);
				case 1:
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
										mdgriffith$stylish_elephants$Internal$Model$vDomClass(mdgriffith$stylish_elephants$Internal$Style$classes.ci + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.d0))
									]),
								styles)
							]));
			}
		}();
		switch (context) {
			case 0:
				return A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$widthFill, has) ? html : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$alignRight, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					'u',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.d0, mdgriffith$stylish_elephants$Internal$Style$classes.aJ, mdgriffith$stylish_elephants$Internal$Style$classes.X, mdgriffith$stylish_elephants$Internal$Style$classes.cg])))
						]),
					_List_fromArray(
						[html])) : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$centerX, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					's',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.d0, mdgriffith$stylish_elephants$Internal$Style$classes.aJ, mdgriffith$stylish_elephants$Internal$Style$classes.X, mdgriffith$stylish_elephants$Internal$Style$classes.ce])))
						]),
					_List_fromArray(
						[html])) : html));
			case 1:
				return A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$heightFill, has) ? html : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$centerY, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					's',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.d0, mdgriffith$stylish_elephants$Internal$Style$classes.aJ, mdgriffith$stylish_elephants$Internal$Style$classes.cf])))
						]),
					_List_fromArray(
						[html])) : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$alignBottom, has) ? A3(
					elm$virtual_dom$VirtualDom$node,
					'u',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.d0, mdgriffith$stylish_elephants$Internal$Style$classes.aJ, mdgriffith$stylish_elephants$Internal$Style$classes.cd])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$textElement = function (str) {
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
							[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.eb, mdgriffith$stylish_elephants$Internal$Style$classes.b6, mdgriffith$stylish_elephants$Internal$Style$classes.am]))))
			]),
		_List_fromArray(
			[
				elm$virtual_dom$VirtualDom$text(str)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$textElementFill = function (str) {
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
							[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.eb, mdgriffith$stylish_elephants$Internal$Style$classes.b7, mdgriffith$stylish_elephants$Internal$Style$classes.bF]))))
			]),
		_List_fromArray(
			[
				elm$virtual_dom$VirtualDom$text(str)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$Active = 2;
var mdgriffith$stylish_elephants$Internal$Model$Focus = 0;
var mdgriffith$stylish_elephants$Internal$Model$Hover = 1;
var mdgriffith$stylish_elephants$Internal$Model$renderFont = function (families) {
	var fontName = function (font) {
		switch (font.$) {
			case 0:
				return 'serif';
			case 1:
				return 'sans-serif';
			case 2:
				return 'monospace';
			case 3:
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
var mdgriffith$stylish_elephants$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var renderTopLevels = function (rule) {
			if (rule.$ === 1) {
				var name = rule.a;
				var typefaces = rule.b;
				var getImports = function (font) {
					if (font.$ === 4) {
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
				if (maybePseudo.$ === 1) {
					return selector + ('{' + (A3(
						elm$core$List$foldl,
						renderProps(force),
						'',
						props) + '\n}'));
				} else {
					var pseudo = maybePseudo.a;
					switch (pseudo) {
						case 1:
							return selector + (':hover {' + (A3(
								elm$core$List$foldl,
								renderProps(force),
								'',
								props) + '\n}'));
						case 0:
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
					case 0:
						var selector = rule.a;
						var props = rule.b;
						return A4(renderStyle, force, maybePseudo, selector, props);
					case 12:
						var name = rule.a;
						var prop = rule.b;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'box-shadow', prop)
								]));
					case 11:
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
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'opacity', '0'),
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'pointer-events', 'none')
								])) : A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'opacity',
									elm$core$String$fromFloat(opacity)),
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'pointer-events', 'auto')
								]));
					case 2:
						var i = rule.a;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.font-size-' + elm$core$String$fromInt(i),
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'font-size',
									elm$core$String$fromInt(i) + 'px')
								]));
					case 1:
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
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'font-family',
									mdgriffith$stylish_elephants$Internal$Model$renderFont(typefaces))
								]));
					case 3:
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
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, prop, val)
								]));
					case 4:
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
									mdgriffith$stylish_elephants$Internal$Model$Property,
									prop,
									mdgriffith$stylish_elephants$Internal$Model$formatColor(color))
								]));
					case 5:
						var x = rule.a;
						var y = rule.b;
						var yPx = elm$core$String$fromInt(y) + 'px';
						var xPx = elm$core$String$fromInt(x) + 'px';
						var row = '.' + function ($) {
							return $.L;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var right = '.' + function ($) {
							return $.bs;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var paragraph = '.' + function ($) {
							return $.bN;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var page = '.' + function ($) {
							return $.bM;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var left = '.' + function ($) {
							return $.br;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var column = '.' + function ($) {
							return $.H;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var _class = '.spacing-' + (elm$core$String$fromInt(x) + ('-' + elm$core$String$fromInt(y)));
						var any = '.' + function ($) {
							return $.ci;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
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
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (column + (' > ' + (any + (' + ' + any)))),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-top', yPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + (any + (' + ' + any)))),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-top', yPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + left)),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-right', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + right)),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_Utils_ap(_class, paragraph),
									_List_fromArray(
										[
											A2(
											mdgriffith$stylish_elephants$Internal$Model$Property,
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
											mdgriffith$stylish_elephants$Internal$Model$Property,
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
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-right', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + (' > ' + right)),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + '::after'),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'content', '\'\''),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'display', 'block'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'height', '0'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'width', '0'),
											A2(
											mdgriffith$stylish_elephants$Internal$Model$Property,
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
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'content', '\'\''),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'display', 'block'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'height', '0'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'width', '0'),
											A2(
											mdgriffith$stylish_elephants$Internal$Model$Property,
											'margin-bottom',
											elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
										]))
								]));
					case 6:
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
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'padding',
									elm$core$String$fromInt(top) + ('px ' + (elm$core$String$fromInt(right) + ('px ' + (elm$core$String$fromInt(bottom) + ('px ' + (elm$core$String$fromInt(left) + 'px')))))))
								]));
					case 7:
						var template = rule.a;
						var toGridLengthHelper = F3(
							function (minimum, maximum, x) {
								switch (x.$) {
									case 0:
										var px = x.a;
										return elm$core$String$fromInt(px) + 'px';
									case 1:
										var _n2 = _Utils_Tuple2(minimum, maximum);
										if (_n2.a.$ === 1) {
											if (_n2.b.$ === 1) {
												var _n3 = _n2.a;
												var _n4 = _n2.b;
												return 'max-content';
											} else {
												var _n6 = _n2.a;
												var maxSize = _n2.b.a;
												return 'minmax(max-content, ' + (elm$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n2.b.$ === 1) {
												var minSize = _n2.a.a;
												var _n5 = _n2.b;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
											} else {
												var minSize = _n2.a.a;
												var maxSize = _n2.b.a;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 2:
										var i = x.a;
										var _n7 = _Utils_Tuple2(minimum, maximum);
										if (_n7.a.$ === 1) {
											if (_n7.b.$ === 1) {
												var _n8 = _n7.a;
												var _n9 = _n7.b;
												return elm$core$String$fromInt(i) + 'fr';
											} else {
												var _n11 = _n7.a;
												var maxSize = _n7.b.a;
												return 'minmax(max-content, ' + (elm$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n7.b.$ === 1) {
												var minSize = _n7.a.a;
												var _n10 = _n7.b;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
											} else {
												var minSize = _n7.a.a;
												var maxSize = _n7.b.a;
												return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 3:
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
						var xSpacing = toGridLength(template.d3.a);
						var ySpacing = toGridLength(template.d3.b);
						var rows = function (x) {
							return 'grid-template-rows: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								' ',
								A2(elm$core$List$map, toGridLength, template.dW)));
						var msRows = function (x) {
							return '-ms-grid-rows: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								ySpacing,
								A2(elm$core$List$map, toGridLength, template.p)));
						var msColumns = function (x) {
							return '-ms-grid-columns: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								ySpacing,
								A2(elm$core$List$map, toGridLength, template.p)));
						var gapY = 'grid-row-gap:' + (toGridLength(template.d3.b) + ';');
						var gapX = 'grid-column-gap:' + (toGridLength(template.d3.a) + ';');
						var columns = function (x) {
							return 'grid-template-columns: ' + (x + ';');
						}(
							A2(
								elm$core$String$join,
								' ',
								A2(elm$core$List$map, toGridLength, template.p)));
						var _class = '.grid-rows-' + (A2(
							elm$core$String$join,
							'-',
							A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.dW)) + ('-cols-' + (A2(
							elm$core$String$join,
							'-',
							A2(elm$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.p)) + ('-space-x-' + (mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.d3.a) + ('-space-y-' + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.d3.b)))))));
						var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
						var supports = '@supports (display:grid) {' + (modernGrid + '}');
						var base = _class + ('{' + (msColumns + (msRows + '}')));
						return _Utils_ap(base, supports);
					case 8:
						var position = rule.a;
						var msPosition = A2(
							elm$core$String$join,
							' ',
							_List_fromArray(
								[
									'-ms-grid-row: ' + (elm$core$String$fromInt(position.L) + ';'),
									'-ms-grid-row-span: ' + (elm$core$String$fromInt(position.bd) + ';'),
									'-ms-grid-column: ' + (elm$core$String$fromInt(position.cL) + ';'),
									'-ms-grid-column-span: ' + (elm$core$String$fromInt(position.b5) + ';')
								]));
						var modernPosition = A2(
							elm$core$String$join,
							' ',
							_List_fromArray(
								[
									'grid-row: ' + (elm$core$String$fromInt(position.L) + (' / ' + (elm$core$String$fromInt(position.L + position.bd) + ';'))),
									'grid-column: ' + (elm$core$String$fromInt(position.cL) + (' / ' + (elm$core$String$fromInt(position.cL + position.b5) + ';')))
								]));
						var _class = '.grid-pos-' + (elm$core$String$fromInt(position.L) + ('-' + (elm$core$String$fromInt(position.cL) + ('-' + (elm$core$String$fromInt(position.b5) + ('-' + elm$core$String$fromInt(position.bd)))))));
						var modernGrid = _class + ('{' + (modernPosition + '}'));
						var supports = '@supports (display:grid) {' + (modernGrid + '}');
						var base = _class + ('{' + (msPosition + '}'));
						return _Utils_ap(base, supports);
					case 10:
						var _class = rule.a;
						var styles = rule.b;
						var renderPseudoRule = function (style) {
							switch (_class) {
								case 0:
									return A3(
										renderStyleRule,
										style,
										elm$core$Maybe$Just(0),
										false);
								case 2:
									return A3(
										renderStyleRule,
										style,
										elm$core$Maybe$Just(2),
										false);
								default:
									var _n13 = options.c5;
									switch (_n13) {
										case 0:
											return '';
										case 1:
											return A3(
												renderStyleRule,
												style,
												elm$core$Maybe$Just(1),
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
						aX: _Utils_ap(
							rendered.aX,
							A3(renderStyleRule, style, elm$core$Maybe$Nothing, false)),
						aC: function () {
							var _n15 = renderTopLevels(style);
							if (_n15.$ === 1) {
								return rendered.aC;
							} else {
								var topLevel = _n15.a;
								return _Utils_ap(rendered.aC, topLevel);
							}
						}()
					});
			});
		return function (_n14) {
			var rules = _n14.aX;
			var topLevel = _n14.aC;
			return _Utils_ap(topLevel, rules);
		}(
			A3(
				elm$core$List$foldl,
				combine,
				{aX: '', aC: ''},
				stylesheet));
	});
var mdgriffith$stylish_elephants$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		return A3(
			elm$virtual_dom$VirtualDom$node,
			'style',
			_List_Nil,
			_List_fromArray(
				[
					elm$virtual_dom$VirtualDom$text(
					A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheetString, options, styleSheet))
				]));
	});
var mdgriffith$stylish_elephants$Internal$Style$Batch = function (a) {
	return {$: 5, a: a};
};
var mdgriffith$stylish_elephants$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Left = 3;
var mdgriffith$stylish_elephants$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Right = 2;
var mdgriffith$stylish_elephants$Internal$Style$Self = elm$core$Basics$identity;
var mdgriffith$stylish_elephants$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
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
var mdgriffith$stylish_elephants$Internal$Style$Content = elm$core$Basics$identity;
var mdgriffith$stylish_elephants$Internal$Style$Bottom = 1;
var mdgriffith$stylish_elephants$Internal$Style$CenterX = 4;
var mdgriffith$stylish_elephants$Internal$Style$CenterY = 5;
var mdgriffith$stylish_elephants$Internal$Style$Top = 0;
var mdgriffith$stylish_elephants$Internal$Style$alignments = _List_fromArray(
	[0, 1, 2, 3, 4, 5]);
var mdgriffith$stylish_elephants$Internal$Style$dot = function (c) {
	return '.' + c;
};
var mdgriffith$stylish_elephants$Internal$Style$contentName = function (desc) {
	switch (desc) {
		case 0:
			var _n1 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cM);
		case 1:
			var _n2 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aK);
		case 2:
			var _n3 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aL);
		case 3:
			var _n4 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bx);
		case 4:
			var _n5 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ah);
		default:
			var _n6 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.X);
	}
};
var mdgriffith$stylish_elephants$Internal$Style$selfName = function (desc) {
	switch (desc) {
		case 0:
			var _n1 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ch);
		case 1:
			var _n2 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ca);
		case 2:
			var _n3 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bs);
		case 3:
			var _n4 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.br);
		case 4:
			var _n5 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cb);
		default:
			var _n6 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cc);
	}
};
var mdgriffith$stylish_elephants$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _n0 = values(alignment);
		var content = _n0.a;
		var indiv = _n0.b;
		return _List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Descriptor,
				mdgriffith$stylish_elephants$Internal$Style$contentName(alignment),
				content),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Child,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ci),
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$selfName(alignment),
						indiv)
					]))
			]);
	};
	return mdgriffith$stylish_elephants$Internal$Style$Batch(
		A2(elm$core$List$concatMap, createDescription, mdgriffith$stylish_elephants$Internal$Style$alignments));
};
var mdgriffith$stylish_elephants$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Child,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ci),
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$selfName(alignment),
						values(alignment))
					]))
			]);
	};
	return mdgriffith$stylish_elephants$Internal$Style$Batch(
		A2(elm$core$List$concatMap, createDescription, mdgriffith$stylish_elephants$Internal$Style$alignments));
};
var mdgriffith$stylish_elephants$Internal$Style$Above = 0;
var mdgriffith$stylish_elephants$Internal$Style$Behind = 5;
var mdgriffith$stylish_elephants$Internal$Style$Below = 1;
var mdgriffith$stylish_elephants$Internal$Style$OnLeft = 3;
var mdgriffith$stylish_elephants$Internal$Style$OnRight = 2;
var mdgriffith$stylish_elephants$Internal$Style$Within = 4;
var mdgriffith$stylish_elephants$Internal$Style$locations = function () {
	var loc = 0;
	var _n0 = function () {
		switch (loc) {
			case 0:
				return 0;
			case 1:
				return 0;
			case 2:
				return 0;
			case 3:
				return 0;
			case 4:
				return 0;
			default:
				return 0;
		}
	}();
	return _List_fromArray(
		[0, 1, 2, 3, 4, 5]);
}();
var mdgriffith$stylish_elephants$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .se.row > .se { flex-basis: auto !important; }\n  .se.row > .se.container { flex-basis: auto !important; }\n}';
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var mdgriffith$stylish_elephants$Internal$Style$Intermediate = elm$core$Basics$identity;
var mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return {aI: closing, i: _List_Nil, K: _List_Nil, E: selector};
	});
var mdgriffith$stylish_elephants$Internal$Style$renderRules = F2(
	function (_n0, rulesToRender) {
		var parent = _n0;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 0:
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								K: A2(
									elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.K)
							});
					case 2:
						var _n2 = rule.a;
						var prop = _n2.a;
						var value = _n2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								i: A2(
									elm$core$List$cons,
									{aI: '\n}', i: _List_Nil, K: props, E: '@supports (' + (prop + (':' + (value + (') {' + parent.E))))},
									rendered.i)
							});
					case 4:
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								i: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.E + (' + ' + selector), ''),
										adjRules),
									rendered.i)
							});
					case 1:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								i: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.E + (' > ' + child), ''),
										childRules),
									rendered.i)
							});
					case 3:
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								i: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(
											mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.E, descriptor),
											''),
										descriptorRules),
									rendered.i)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								i: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.E, ''),
										batched),
									rendered.i)
							});
				}
			});
		return A3(elm$core$List$foldr, generateIntermediates, parent, rulesToRender);
	});
var mdgriffith$stylish_elephants$Internal$Style$renderCompact = function (styleClasses) {
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
		var _n2 = rule.K;
		if (!_n2.b) {
			return '';
		} else {
			return rule.E + ('{' + (renderValues(rule.K) + (rule.aI + '}')));
		}
	};
	var renderIntermediate = function (_n0) {
		var rule = _n0;
		return _Utils_ap(
			renderClass(rule),
			elm$core$String$concat(
				A2(elm$core$List$map, renderIntermediate, rule.i)));
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
								mdgriffith$stylish_elephants$Internal$Style$renderRules,
								A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var mdgriffith$stylish_elephants$Internal$Style$rules = _Utils_ap(
	mdgriffith$stylish_elephants$Internal$Style$overrides,
	mdgriffith$stylish_elephants$Internal$Style$renderCompact(
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				'html,body',
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'padding', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0')
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ci) + ':focus',
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'outline', 'none')
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dV),
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'min-height', '100%'),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						_Utils_ap(
							mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ci),
							_Utils_ap(
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d0),
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.am))),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bF),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%')
									]))
							]))
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ci),
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'relative'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border', 'none'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'resize', 'none'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'box-sizing', 'border-box'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'padding', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-width', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'solid'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-size', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'color', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-family', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'line-height', '1'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'none'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'inherit'),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.du),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'user-select', 'none'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-ms-user-select', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cN),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'cursor', 'pointer')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cO),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'cursor', 'text')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aV),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aG),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ev),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.R),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.c5, mdgriffith$stylish_elephants$Internal$Style$classes.ev)) + ':hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.c5, mdgriffith$stylish_elephants$Internal$Style$classes.R)) + ':hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.aj, mdgriffith$stylish_elephants$Internal$Style$classes.ev)) + ':focus',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.aj, mdgriffith$stylish_elephants$Internal$Style$classes.R)) + ':focus',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.b9, mdgriffith$stylish_elephants$Internal$Style$classes.ev)) + ':active',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.b9, mdgriffith$stylish_elephants$Internal$Style$classes.R)) + ':active',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eu),
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Prop,
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
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aU),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'hidden'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-ms-overflow-style', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dX),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'auto'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dY),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-x', 'auto'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.L),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dZ),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-y', 'auto'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.H),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cG),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cH),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-x', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cI),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-y', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.b6),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', 'auto')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aF),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-width', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cw),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'dashed')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cx),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'dotted')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cy),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'solid')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eb),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-block')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d0),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d_),
								_List_fromArray(
									[
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eb),
										_List_fromArray(
											[
												A2(
												mdgriffith$stylish_elephants$Internal$Style$Descriptor,
												mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bF),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
													])),
												A2(
												mdgriffith$stylish_elephants$Internal$Style$Descriptor,
												mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.b7),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'auto !important')
													]))
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.am),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bF),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.b7),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.b6),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'left')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment) {
										case 0:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', '0 !important')
													]));
										case 1:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', '0 !important')
													]));
										case 2:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 3:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 4:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'center')
													]));
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(
														mdgriffith$stylish_elephants$Internal$Style$Child,
														mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ci),
														_List_fromArray(
															[
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto')
															]))
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
													]));
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.L),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'row'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ci),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', '0%'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eF),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bF),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c4),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.b7),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aJ),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.cg,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.ce,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cb),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-left', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.ce,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cb),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-right', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:only-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.ce,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cc),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.ce + ' ~ u'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.cg + (' ~ s.' + mdgriffith$stylish_elephants$Internal$Style$classes.ce)),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment) {
										case 0:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 1:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 2:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_Nil);
										case 3:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_Nil);
										case 4:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'center')
													]),
												_List_Nil);
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'center')
													]));
									}
								}),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d2),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.H),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bF),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.b7),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eG),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.b6),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'left')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.cd,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.cf,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cc),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', '0 !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.cf,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cc),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', '0 !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:only-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.cf,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cc),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.cf + ' ~ u'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.cd + (' ~ s.' + mdgriffith$stylish_elephants$Internal$Style$classes.cf)),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment) {
										case 0:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto')
													]));
										case 1:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto')
													]));
										case 2:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 3:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 4:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'center')
													]));
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'center')
													]),
												_List_Nil);
									}
								}),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aJ),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d2),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c3),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', '-ms-grid'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Supports,
								_Utils_Tuple2('display', 'grid'),
								_List_fromArray(
									[
										_Utils_Tuple2('display', 'grid')
									])),
								mdgriffith$stylish_elephants$Internal$Style$gridAlignments(
								function (alignment) {
									switch (alignment) {
										case 0:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
												]);
										case 1:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
												]);
										case 2:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
												]);
										case 3:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
												]);
										case 4:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
												]);
										default:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'center')
												]);
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bM),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'block'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ci + ':first-child'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(
									mdgriffith$stylish_elephants$Internal$Style$classes.ci + (mdgriffith$stylish_elephants$Internal$Style$selfName(3) + (':first-child + .' + mdgriffith$stylish_elephants$Internal$Style$classes.ci))),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(
									mdgriffith$stylish_elephants$Internal$Style$classes.ci + (mdgriffith$stylish_elephants$Internal$Style$selfName(2) + (':first-child + .' + mdgriffith$stylish_elephants$Internal$Style$classes.ci))),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment) {
										case 0:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 1:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 2:
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'right'),
														A2(
														mdgriffith$stylish_elephants$Internal$Style$Descriptor,
														':after:',
														_List_fromArray(
															[
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'content', '\"\"'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'table'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'clear', 'both')
															]))
													]));
										case 3:
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'left'),
														A2(
														mdgriffith$stylish_elephants$Internal$Style$Descriptor,
														':after:',
														_List_fromArray(
															[
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'content', '\"\"'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'table'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'clear', 'both')
															]))
													]));
										case 4:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										default:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bN),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'block'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eb),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d0),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c9),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cm),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.b8),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cn),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dA),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dy),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eb),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.L),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.H),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c3),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-grid')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment) {
										case 0:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 1:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 2:
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'right')
													]));
										case 3:
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'left')
													]));
										case 4:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										default:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.hidden',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'none')
							])),
						mdgriffith$stylish_elephants$Internal$Style$Batch(
						function (fn) {
							return A2(elm$core$List$map, fn, mdgriffith$stylish_elephants$Internal$Style$locations);
						}(
							function (loc) {
								switch (loc) {
									case 0:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.b8),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'bottom', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bF),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
														])),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.b7),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
														])),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ci),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									case 1:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cn),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'bottom', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bF),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
														]))
												]));
									case 2:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dA),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
												]));
									case 3:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dy),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'right', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
												]));
									case 4:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c9),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ci),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									default:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cm),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													'.se',
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
								}
							})),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.en),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '100')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ee),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '200')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ei),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '300')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ek),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '400')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ej),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '500')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.em),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '600')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ct),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '700')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ed),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '800')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ef),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '900')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dd),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'italic')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.d6),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'line-through')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ey),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'underline'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration-skip', 'ink')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eo),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'normal')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eg),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'justify')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.a1),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'justify-all')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ec),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'center')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.el),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'right')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eh),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'left')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.modal',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'fixed'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none')
							]))
					]))
			])));
var mdgriffith$stylish_elephants$Internal$Model$asElement = F4(
	function (embedMode, children, context, rendered) {
		var gatherKeyed = F2(
			function (_n10, _n11) {
				var key = _n10.a;
				var child = _n10.b;
				var htmls = _n11.a;
				var existingStyles = _n11.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.c6, elm$core$Maybe$Nothing, context)),
								htmls),
							_Utils_ap(styled.d7, existingStyles));
					case 2:
						var str = child.a;
						return (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$widthContent, rendered.b) && (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$heightContent, rendered.b) && _Utils_eq(context, mdgriffith$stylish_elephants$Internal$Model$asEl))) ? _Utils_Tuple2(
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
									mdgriffith$stylish_elephants$Internal$Model$textElement(str)),
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
					case 0:
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								A2(styled.c6, elm$core$Maybe$Nothing, context),
								htmls),
							_Utils_ap(styled.d7, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_eq(context, mdgriffith$stylish_elephants$Internal$Model$asEl) ? _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$textElementFill(str),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var _n0 = function () {
			if (children.$ === 1) {
				var keyedChildren = children.a;
				return A2(
					elm$core$Tuple$mapFirst,
					mdgriffith$stylish_elephants$Internal$Model$Keyed,
					A3(
						elm$core$List$foldr,
						gatherKeyed,
						_Utils_Tuple2(_List_Nil, rendered.d7),
						keyedChildren));
			} else {
				var unkeyedChildren = children.a;
				return A2(
					elm$core$Tuple$mapFirst,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed,
					A3(
						elm$core$List$foldr,
						gather,
						_Utils_Tuple2(_List_Nil, rendered.d7),
						unkeyedChildren));
			}
		}();
		var htmlChildren = _n0.a;
		var styleChildren = _n0.b;
		switch (embedMode.$) {
			case 0:
				var renderedChildren = function () {
					if (htmlChildren.$ === 1) {
						var keyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Keyed(
							_Utils_ap(
								keyed,
								A2(
									elm$core$List$map,
									function (x) {
										return _Utils_Tuple2('nearby-elements-pls', x);
									},
									rendered.u)));
					} else {
						var unkeyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
							_Utils_ap(unkeyed, rendered.u));
					}
				}();
				if (!styleChildren.b) {
					return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
						A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm$core$Maybe$Nothing));
				} else {
					return mdgriffith$stylish_elephants$Internal$Model$Styled(
						{
							c6: A2(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren),
							d7: styleChildren
						});
				}
			case 1:
				var options = embedMode.a;
				var styles = A3(
					elm$core$List$foldl,
					mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
					_Utils_Tuple2(
						elm$core$Set$empty,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.aj)
							])),
					styleChildren).b;
				var renderedChildren = function () {
					if (htmlChildren.$ === 1) {
						var keyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Keyed(
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
												elm$virtual_dom$VirtualDom$text(mdgriffith$stylish_elephants$Internal$Style$rules)
											]))),
								A2(
									elm$core$List$cons,
									_Utils_Tuple2(
										'dynamic-stylesheet',
										A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles)),
									_Utils_ap(
										keyed,
										A2(
											elm$core$List$map,
											function (x) {
												return _Utils_Tuple2('nearby-elements-pls', x);
											},
											rendered.u)))));
					} else {
						var unkeyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
							A2(
								elm$core$List$cons,
								A3(
									elm$virtual_dom$VirtualDom$node,
									'style',
									_List_Nil,
									_List_fromArray(
										[
											elm$virtual_dom$VirtualDom$text(mdgriffith$stylish_elephants$Internal$Style$rules)
										])),
								A2(
									elm$core$List$cons,
									A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles),
									_Utils_ap(unkeyed, rendered.u))));
					}
				}();
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm$core$Maybe$Nothing));
			default:
				var options = embedMode.a;
				var styles = A3(
					elm$core$List$foldl,
					mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
					_Utils_Tuple2(
						elm$core$Set$empty,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.aj)
							])),
					styleChildren).b;
				var renderedChildren = function () {
					if (htmlChildren.$ === 1) {
						var keyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Keyed(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									'dynamic-stylesheet',
									A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles)),
								_Utils_ap(
									keyed,
									A2(
										elm$core$List$map,
										function (x) {
											return _Utils_Tuple2('nearby-elements-pls', x);
										},
										rendered.u))));
					} else {
						var unkeyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
							A2(
								elm$core$List$cons,
								A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles),
								_Utils_ap(unkeyed, rendered.u)));
					}
				}();
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm$core$Maybe$Nothing));
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$Attr = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$htmlClass = function (cls) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		A2(
			elm$virtual_dom$VirtualDom$property,
			'className',
			elm$json$Json$Encode$string(cls)));
};
var mdgriffith$stylish_elephants$Internal$Model$contextClasses = function (context) {
	switch (context) {
		case 0:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ci + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.L));
		case 1:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ci + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.H));
		case 2:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ci + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.d0));
		case 3:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ci + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.c3));
		case 4:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ci + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.bN));
		default:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ci + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.bM));
	}
};
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup = F2(
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
			group.U);
		var scale = A2(
			elm$core$Maybe$map,
			function (_n8) {
				var x = _n8.a;
				var y = _n8.b;
				var z = _n8.c;
				return 'scale3d(' + (elm$core$String$fromFloat(x) + (', ' + (elm$core$String$fromFloat(y) + (', ' + (elm$core$String$fromFloat(z) + ')')))));
			},
			group.ab);
		var rotate = A2(
			elm$core$Maybe$map,
			function (_n7) {
				var x = _n7.a;
				var y = _n7.b;
				var z = _n7.c;
				var angle = _n7.d;
				return 'rotate3d(' + (elm$core$String$fromFloat(x) + (',' + (elm$core$String$fromFloat(y) + (',' + (elm$core$String$fromFloat(z) + (',' + (elm$core$String$fromFloat(angle) + 'rad)')))))));
			},
			group.aa);
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
							return 'move-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm$core$Maybe$withDefault, 0, x)) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm$core$Maybe$withDefault, 0, y)) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm$core$Maybe$withDefault, 0, z))))));
						},
						group.U),
						A2(
						elm$core$Maybe$map,
						function (_n5) {
							var x = _n5.a;
							var y = _n5.b;
							var z = _n5.c;
							return 'scale' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(x) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(y) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(z)))));
						},
						group.ab),
						A2(
						elm$core$Maybe$map,
						function (_n6) {
							var x = _n6.a;
							var y = _n6.b;
							var z = _n6.c;
							var angle = _n6.d;
							return 'rotate-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(x) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(y) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(z) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(angle)))))));
						},
						group.aa)
					])));
		if (!transformations.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var trans = transformations;
			var transforms = A2(elm$core$String$join, ' ', trans);
			var _n1 = function () {
				if (maybePseudo.$ === 1) {
					return _Utils_Tuple2('transform-' + name, '.transform-' + name);
				} else {
					var pseudo = maybePseudo.a;
					switch (pseudo) {
						case 1:
							return _Utils_Tuple2('transform-' + (name + '-hover'), '.transform-' + (name + '-hover:hover'));
						case 0:
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
					A3(mdgriffith$stylish_elephants$Internal$Model$Single, classInStylesheet, 'transform', transforms)));
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$finalize = function (gathered) {
	var addTextShadows = function (_n11) {
		var classes = _n11.a;
		var styles = _n11.b;
		var _n9 = gathered.ad;
		if (_n9.$ === 1) {
			return _Utils_Tuple2(classes, styles);
		} else {
			var _n10 = _n9.a;
			var shadowClass = _n10.a;
			var shades = _n10.b;
			return _Utils_Tuple2(
				A2(elm$core$List$cons, shadowClass, classes),
				A2(
					elm$core$List$cons,
					A3(mdgriffith$stylish_elephants$Internal$Model$Single, '.' + shadowClass, 'text-shadow', shades),
					styles));
		}
	};
	var addBoxShadows = function (_n8) {
		var classes = _n8.a;
		var styles = _n8.b;
		var _n6 = gathered.W;
		if (_n6.$ === 1) {
			return _Utils_Tuple2(classes, styles);
		} else {
			var _n7 = _n6.a;
			var shadowClass = _n7.a;
			var shades = _n7.b;
			return _Utils_Tuple2(
				A2(elm$core$List$cons, shadowClass, classes),
				A2(
					elm$core$List$cons,
					A3(mdgriffith$stylish_elephants$Internal$Model$Single, '.' + shadowClass, 'box-shadow', shades),
					styles));
		}
	};
	var add = F2(
		function (_new, _n5) {
			var classes = _n5.a;
			var styles = _n5.b;
			if (_new.$ === 1) {
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
		var _n1 = gathered.M;
		if (_n1.$ === 1) {
			return _Utils_Tuple2(classes, styles);
		} else {
			var transform = _n1.a;
			return A2(
				add,
				A2(
					elm$core$Maybe$andThen,
					mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
						elm$core$Maybe$Just(2)),
					transform.b9),
				A2(
					add,
					A2(
						elm$core$Maybe$andThen,
						mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
							elm$core$Maybe$Just(1)),
						transform.c5),
					A2(
						add,
						A2(
							elm$core$Maybe$andThen,
							mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
								elm$core$Maybe$Just(0)),
							transform.aj),
						A2(
							add,
							A2(
								elm$core$Maybe$andThen,
								mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(elm$core$Maybe$Nothing),
								transform.as),
							_Utils_Tuple2(classes, styles)))));
		}
	};
	var _n0 = addTransform(
		addTextShadows(
			addBoxShadows(
				_Utils_Tuple2(_List_Nil, gathered.d7))));
	var newClasses = _n0.a;
	var newStyles = _n0.b;
	return _Utils_update(
		gathered,
		{
			a: A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$vDomClass(
					A2(elm$core$String$join, ' ', newClasses)),
				gathered.a),
			d7: newStyles
		});
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
var elm$core$Bitwise$or = _Bitwise_or;
var mdgriffith$stylish_elephants$Internal$Flag$add = F2(
	function (_n0, _n1) {
		var flipTo = _n0;
		var truth = _n1;
		return flipTo | truth;
	});
var mdgriffith$stylish_elephants$Internal$Flag$height = mdgriffith$stylish_elephants$Internal$Flag$col(7);
var mdgriffith$stylish_elephants$Internal$Flag$width = mdgriffith$stylish_elephants$Internal$Flag$col(6);
var mdgriffith$stylish_elephants$Internal$Flag$xAlign = mdgriffith$stylish_elephants$Internal$Flag$col(30);
var mdgriffith$stylish_elephants$Internal$Flag$yAlign = mdgriffith$stylish_elephants$Internal$Flag$col(29);
var mdgriffith$stylish_elephants$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$FontSize = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$GridPosition = function (a) {
	return {$: 8, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$GridTemplateStyle = function (a) {
	return {$: 7, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$PaddingStyle = F4(
	function (a, b, c, d) {
		return {$: 6, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Shadows = F2(
	function (a, b) {
		return {$: 12, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$SpacingStyle = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Transform = function (a) {
	return {$: 9, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$NodeName = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 0:
				return mdgriffith$stylish_elephants$Internal$Model$NodeName(newNode);
			case 1:
				var name = old.a;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Embedded, x, y);
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$alignXName = function (align) {
	switch (align) {
		case 0:
			return 'aligned-horizontally ' + mdgriffith$stylish_elephants$Internal$Style$classes.br;
		case 2:
			return 'aligned-horizontally ' + mdgriffith$stylish_elephants$Internal$Style$classes.bs;
		default:
			return 'aligned-horizontally ' + mdgriffith$stylish_elephants$Internal$Style$classes.cb;
	}
};
var mdgriffith$stylish_elephants$Internal$Model$alignYName = function (align) {
	switch (align) {
		case 0:
			return 'aligned-vertically ' + mdgriffith$stylish_elephants$Internal$Style$classes.ch;
		case 2:
			return 'aligned-vertically ' + mdgriffith$stylish_elephants$Internal$Style$classes.ca;
		default:
			return 'aligned-vertically ' + mdgriffith$stylish_elephants$Internal$Style$classes.cc;
	}
};
var mdgriffith$stylish_elephants$Internal$Model$formatColorClass = function (_n0) {
	var red = _n0.a;
	var green = _n0.b;
	var blue = _n0.c;
	var alpha = _n0.d;
	return mdgriffith$stylish_elephants$Internal$Model$floatClass(red) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(green) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(blue) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(alpha))))));
};
var mdgriffith$stylish_elephants$Internal$Model$boxShadowName = function (shadow) {
	return elm$core$String$concat(
		_List_fromArray(
			[
				shadow.be ? 'box-inset' : 'box-',
				elm$core$String$fromFloat(shadow.dw.a) + 'px',
				elm$core$String$fromFloat(shadow.dw.b) + 'px',
				elm$core$String$fromFloat(shadow.cr) + 'px',
				elm$core$String$fromFloat(shadow.F) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColorClass(shadow.j)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$formatTextShadow = function (shadow) {
	return A2(
		elm$core$String$join,
		' ',
		_List_fromArray(
			[
				elm$core$String$fromFloat(shadow.dw.a) + 'px',
				elm$core$String$fromFloat(shadow.dw.b) + 'px',
				elm$core$String$fromFloat(shadow.cr) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.j)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup = {aa: elm$core$Maybe$Nothing, ab: elm$core$Maybe$Nothing, U: elm$core$Maybe$Nothing};
var mdgriffith$stylish_elephants$Internal$Model$emptyTransformationStates = {b9: elm$core$Maybe$Nothing, aj: elm$core$Maybe$Nothing, c5: elm$core$Maybe$Nothing, as: elm$core$Maybe$Nothing};
var mdgriffith$stylish_elephants$Internal$Model$Rotation = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Internal$Model$addIfNothing = F2(
	function (val, existing) {
		if (existing.$ === 1) {
			return val;
		} else {
			var x = existing;
			return x;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$stackTransforms = F2(
	function (transform, group) {
		switch (transform.$) {
			case 0:
				var mx = transform.a;
				var my = transform.b;
				var mz = transform.c;
				var _n1 = group.U;
				if (_n1.$ === 1) {
					return _Utils_update(
						group,
						{
							U: elm$core$Maybe$Just(
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
							U: elm$core$Maybe$Just(
								_Utils_Tuple3(
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, mx, existingX),
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, my, existingY),
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, mz, existingZ)))
						});
				}
			case 1:
				var x = transform.a;
				var y = transform.b;
				var z = transform.c;
				var angle = transform.d;
				return _Utils_update(
					group,
					{
						aa: A2(
							mdgriffith$stylish_elephants$Internal$Model$addIfNothing,
							elm$core$Maybe$Just(
								A4(mdgriffith$stylish_elephants$Internal$Model$Rotation, x, y, z, angle)),
							group.aa)
					});
			default:
				var x = transform.a;
				var y = transform.b;
				var z = transform.c;
				return _Utils_update(
					group,
					{
						ab: A2(
							mdgriffith$stylish_elephants$Internal$Model$addIfNothing,
							elm$core$Maybe$Just(
								_Utils_Tuple3(x, y, z)),
							group.ab)
					});
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$stackOn = F3(
	function (maybePseudo, transform, gathered) {
		var states = A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformationStates, gathered.M);
		if (maybePseudo.$ === 1) {
			var normal = states.as;
			return _Utils_update(
				gathered,
				{
					M: elm$core$Maybe$Just(
						_Utils_update(
							states,
							{
								as: elm$core$Maybe$Just(
									A2(
										mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
										transform,
										A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, normal)))
							}))
				});
		} else {
			switch (maybePseudo.a) {
				case 1:
					var _n1 = maybePseudo.a;
					var hover = states.c5;
					return _Utils_update(
						gathered,
						{
							M: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										c5: elm$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, hover)))
									}))
						});
				case 2:
					var _n2 = maybePseudo.a;
					var active = states.b9;
					return _Utils_update(
						gathered,
						{
							M: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										b9: elm$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, active)))
									}))
						});
				default:
					var _n3 = maybePseudo.a;
					var focus = states.aj;
					return _Utils_update(
						gathered,
						{
							M: elm$core$Maybe$Just(
								_Utils_update(
									states,
									{
										aj: elm$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, focus)))
									}))
						});
			}
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$textShadowName = function (shadow) {
	return elm$core$String$concat(
		_List_fromArray(
			[
				'txt',
				elm$core$String$fromFloat(shadow.dw.a) + 'px',
				elm$core$String$fromFloat(shadow.dw.b) + 'px',
				elm$core$String$fromFloat(shadow.cr) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.j)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$gatherAttributes = F2(
	function (attr, gathered) {
		var styleName = function (name) {
			return '.' + name;
		};
		var formatStyleClass = function (styleType) {
			switch (styleType.$) {
				case 9:
					var x = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$Transform(x);
				case 12:
					var x = styleType.a;
					var y = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$Shadows, x, y);
				case 10:
					var selector = styleType.a;
					var style = styleType.b;
					return A2(
						mdgriffith$stylish_elephants$Internal$Model$PseudoSelector,
						selector,
						A2(elm$core$List$map, formatStyleClass, style));
				case 0:
					var cls = styleType.a;
					var props = styleType.b;
					return A2(
						mdgriffith$stylish_elephants$Internal$Model$Style,
						styleName(cls),
						props);
				case 3:
					var cls = styleType.a;
					var name = styleType.b;
					var val = styleType.c;
					return A3(
						mdgriffith$stylish_elephants$Internal$Model$Single,
						styleName(cls),
						name,
						val);
				case 4:
					var cls = styleType.a;
					var name = styleType.b;
					var val = styleType.c;
					return A3(
						mdgriffith$stylish_elephants$Internal$Model$Colored,
						styleName(cls),
						name,
						val);
				case 5:
					var x = styleType.a;
					var y = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$SpacingStyle, x, y);
				case 6:
					var top = styleType.a;
					var right = styleType.b;
					var bottom = styleType.c;
					var left = styleType.d;
					return A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, top, right, bottom, left);
				case 7:
					var grid = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$GridTemplateStyle(grid);
				case 8:
					var pos = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$GridPosition(pos);
				case 1:
					var name = styleType.a;
					var fam = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$FontFamily, name, fam);
				case 2:
					var i = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$FontSize(i);
				default:
					var name = styleType.a;
					var o = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$Transparency, name, o);
			}
		};
		var classNameAttr = function (name) {
			return A2(
				elm$virtual_dom$VirtualDom$property,
				'className',
				elm$json$Json$Encode$string(name));
		};
		switch (attr.$) {
			case 0:
				return gathered;
			case 3:
				var flag = attr.a;
				var exactClassName = attr.b;
				return A2(mdgriffith$stylish_elephants$Internal$Flag$present, flag, gathered.b) ? gathered : _Utils_update(
					gathered,
					{
						a: A2(
							elm$core$List$cons,
							classNameAttr(exactClassName),
							gathered.a),
						b: A2(mdgriffith$stylish_elephants$Internal$Flag$add, flag, gathered.b)
					});
			case 1:
				var attribute = attr.a;
				return _Utils_update(
					gathered,
					{
						a: A2(elm$core$List$cons, attribute, gathered.a)
					});
			case 4:
				var flag = attr.a;
				var style = attr.b;
				var addNormalStyle = F2(
					function (styleProp, gatheredProps) {
						return A2(mdgriffith$stylish_elephants$Internal$Flag$present, flag, gatheredProps.b) ? gatheredProps : _Utils_update(
							gatheredProps,
							{
								a: function () {
									if (styleProp.$ === 10) {
										return A2(
											elm$core$List$cons,
											A2(
												elm$virtual_dom$VirtualDom$property,
												'className',
												elm$json$Json$Encode$string(mdgriffith$stylish_elephants$Internal$Style$classes.eu)),
											A2(
												elm$core$List$cons,
												classNameAttr(
													mdgriffith$stylish_elephants$Internal$Model$getStyleName(styleProp)),
												gatheredProps.a));
									} else {
										return A2(
											elm$core$List$cons,
											classNameAttr(
												mdgriffith$stylish_elephants$Internal$Model$getStyleName(styleProp)),
											gatheredProps.a);
									}
								}(),
								b: A2(mdgriffith$stylish_elephants$Internal$Flag$add, flag, gatheredProps.b),
								d7: A2(
									elm$core$List$cons,
									formatStyleClass(styleProp),
									gatheredProps.d7)
							});
					});
				switch (style.$) {
					case 9:
						var transformation = style.a;
						return A3(mdgriffith$stylish_elephants$Internal$Model$stackOn, elm$core$Maybe$Nothing, transformation, gathered);
					case 10:
						var pseudo = style.a;
						var props = style.b;
						var forTransforms = function (attribute) {
							if (attribute.$ === 9) {
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
							mdgriffith$stylish_elephants$Internal$Model$stackOn(
								elm$core$Maybe$Just(pseudo)),
							gathered,
							A2(elm$core$List$filterMap, forTransforms, transformationProps));
						return A2(
							addNormalStyle,
							A2(mdgriffith$stylish_elephants$Internal$Model$PseudoSelector, pseudo, otherProps),
							withTransforms);
					default:
						return A2(addNormalStyle, style, gathered);
				}
			case 7:
				var width = attr.a;
				if (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$width, gathered.b)) {
					var widthHelper = F2(
						function (w, gath) {
							switch (w.$) {
								case 0:
									var px = w.a;
									return _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(
													mdgriffith$stylish_elephants$Internal$Style$classes.eF + (' width-px-' + elm$core$String$fromInt(px))),
												gath.a),
											d7: A2(
												elm$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													styleName(
														'width-px-' + elm$core$String$fromInt(px)),
													'width',
													elm$core$String$fromInt(px) + 'px'),
												gath.d7)
										});
								case 1:
									return _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.b6),
												gath.a),
											b: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthContent, gathered.b)
										});
								case 2:
									var portion = w.a;
									return (portion === 1) ? _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.b7),
												gath.a),
											b: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthFill, gathered.b)
										}) : _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(
													mdgriffith$stylish_elephants$Internal$Style$classes.eG + (' width-fill-' + elm$core$String$fromInt(portion))),
												gath.a),
											b: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthFill, gathered.b),
											d7: A2(
												elm$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													'.' + (mdgriffith$stylish_elephants$Internal$Style$classes.ci + ('.' + (mdgriffith$stylish_elephants$Internal$Style$classes.L + (' > ' + styleName(
														'width-fill-' + elm$core$String$fromInt(portion)))))),
													'flex-grow',
													elm$core$String$fromInt(portion * 100000)),
												gath.d7)
										});
								case 3:
									var minSize = w.a;
									var len = w.b;
									var _n7 = _Utils_Tuple2(
										'min-width-' + elm$core$String$fromInt(minSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.min-width-' + elm$core$String$fromInt(minSize),
											'min-width',
											elm$core$String$fromInt(minSize) + 'px'));
									var cls = _n7.a;
									var style = _n7.b;
									var newGathered = _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(cls),
												gath.a),
											d7: A2(elm$core$List$cons, style, gath.d7)
										});
									return A2(widthHelper, len, newGathered);
								default:
									var maxSize = w.a;
									var len = w.b;
									var _n8 = _Utils_Tuple2(
										'max-width-' + elm$core$String$fromInt(maxSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.max-width-' + elm$core$String$fromInt(maxSize),
											'max-width',
											elm$core$String$fromInt(maxSize) + 'px'));
									var cls = _n8.a;
									var style = _n8.b;
									var newGathered = _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(cls),
												gath.a),
											d7: A2(elm$core$List$cons, style, gath.d7)
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
								b: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$width, gathered.b)
							}));
				} else {
					return gathered;
				}
			case 8:
				var height = attr.a;
				if (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$height, gathered.b)) {
					var heightHelper = F2(
						function (h, gath) {
							switch (h.$) {
								case 0:
									var px = h.a;
									return _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(
													'height-px-' + elm$core$String$fromInt(px)),
												gath.a),
											d7: A2(
												elm$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													styleName(
														'height-px-' + elm$core$String$fromInt(px)),
													'height',
													elm$core$String$fromInt(px) + 'px'),
												gath.d7)
										});
								case 1:
									return _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.am),
												gath.a),
											b: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightContent, gathered.b)
										});
								case 2:
									var portion = h.a;
									return (portion === 1) ? _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.bF),
												gath.a),
											b: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightFill, gathered.b)
										}) : _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(
													mdgriffith$stylish_elephants$Internal$Style$classes.c4 + (' height-fill-' + elm$core$String$fromInt(portion))),
												gath.a),
											b: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightFill, gathered.b),
											d7: A2(
												elm$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													'.' + (mdgriffith$stylish_elephants$Internal$Style$classes.ci + ('.' + (mdgriffith$stylish_elephants$Internal$Style$classes.H + (' > ' + styleName(
														'height-fill-' + elm$core$String$fromInt(portion)))))),
													'flex-grow',
													elm$core$String$fromInt(portion * 100000)),
												gath.d7)
										});
								case 3:
									var minSize = h.a;
									var len = h.b;
									var _n10 = _Utils_Tuple2(
										'min-height-' + elm$core$String$fromInt(minSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.min-height-' + elm$core$String$fromInt(minSize),
											'min-height',
											elm$core$String$fromInt(minSize) + 'px'));
									var cls = _n10.a;
									var style = _n10.b;
									var newGathered = _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(cls),
												gath.a),
											d7: A2(elm$core$List$cons, style, gath.d7)
										});
									return A2(heightHelper, len, newGathered);
								default:
									var maxSize = h.a;
									var len = h.b;
									var _n11 = _Utils_Tuple2(
										'max-height-' + elm$core$String$fromInt(maxSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.max-height-' + elm$core$String$fromInt(maxSize),
											'max-height',
											elm$core$String$fromInt(maxSize) + 'px'));
									var cls = _n11.a;
									var style = _n11.b;
									var newGathered = _Utils_update(
										gath,
										{
											a: A2(
												elm$core$List$cons,
												classNameAttr(cls),
												gath.a),
											d7: A2(elm$core$List$cons, style, gath.d7)
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
								b: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$height, gathered.b)
							}));
				} else {
					return gathered;
				}
			case 2:
				var description = attr.a;
				switch (description.$) {
					case 0:
						return _Utils_update(
							gathered,
							{
								f: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'main', gathered.f)
							});
					case 1:
						return _Utils_update(
							gathered,
							{
								f: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'nav', gathered.f)
							});
					case 2:
						return _Utils_update(
							gathered,
							{
								f: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'footer', gathered.f)
							});
					case 3:
						return _Utils_update(
							gathered,
							{
								f: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'aside', gathered.f)
							});
					case 4:
						var i = description.a;
						return (i <= 1) ? _Utils_update(
							gathered,
							{
								f: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'h1', gathered.f)
							}) : ((i < 7) ? _Utils_update(
							gathered,
							{
								f: A2(
									mdgriffith$stylish_elephants$Internal$Model$addNodeName,
									'h' + elm$core$String$fromInt(i),
									gathered.f)
							}) : _Utils_update(
							gathered,
							{
								f: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'h6', gathered.f)
							}));
					case 8:
						return _Utils_update(
							gathered,
							{
								a: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									gathered.a)
							});
					case 5:
						var label = description.a;
						return _Utils_update(
							gathered,
							{
								a: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									gathered.a)
							});
					case 6:
						return _Utils_update(
							gathered,
							{
								a: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									gathered.a)
							});
					default:
						return _Utils_update(
							gathered,
							{
								a: A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									gathered.a)
							});
				}
			case 9:
				var location = attr.a;
				var elem = attr.b;
				var styles = function () {
					switch (elem.$) {
						case 3:
							return elm$core$Maybe$Nothing;
						case 2:
							var str = elem.a;
							return elm$core$Maybe$Nothing;
						case 0:
							var html = elem.a;
							return elm$core$Maybe$Nothing;
						default:
							var styled = elem.a;
							return elm$core$Maybe$Just(
								_Utils_ap(gathered.d7, styled.d7));
					}
				}();
				var nearbyElement = A3(
					elm$virtual_dom$VirtualDom$node,
					'div',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							function () {
								switch (location) {
									case 0:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.d0, mdgriffith$stylish_elephants$Internal$Style$classes.b8]));
									case 1:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.d0, mdgriffith$stylish_elephants$Internal$Style$classes.cn]));
									case 2:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.d0, mdgriffith$stylish_elephants$Internal$Style$classes.dA]));
									case 3:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.d0, mdgriffith$stylish_elephants$Internal$Style$classes.dy]));
									case 4:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.d0, mdgriffith$stylish_elephants$Internal$Style$classes.c9]));
									default:
										return A2(
											elm$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.d0, mdgriffith$stylish_elephants$Internal$Style$classes.cm]));
								}
							}())
						]),
					_List_fromArray(
						[
							function () {
							switch (elem.$) {
								case 3:
									return elm$virtual_dom$VirtualDom$text('');
								case 2:
									var str = elem.a;
									return mdgriffith$stylish_elephants$Internal$Model$textElement(str);
								case 0:
									var html = elem.a;
									return html(mdgriffith$stylish_elephants$Internal$Model$asEl);
								default:
									var styled = elem.a;
									return A2(styled.c6, elm$core$Maybe$Nothing, mdgriffith$stylish_elephants$Internal$Model$asEl);
							}
						}()
						]));
				return _Utils_update(
					gathered,
					{
						u: A2(elm$core$List$cons, nearbyElement, gathered.u),
						d7: function () {
							if (styles.$ === 1) {
								return gathered.d7;
							} else {
								var newStyles = styles.a;
								return newStyles;
							}
						}()
					});
			case 6:
				var x = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$xAlign, gathered.b)) ? _Utils_update(
					gathered,
					{
						a: A2(
							elm$core$List$cons,
							classNameAttr(
								mdgriffith$stylish_elephants$Internal$Model$alignXName(x)),
							gathered.a),
						b: function (flags) {
							switch (x) {
								case 1:
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$centerX, flags);
								case 2:
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$alignRight, flags);
								default:
									return flags;
							}
						}(
							A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$xAlign, gathered.b))
					}) : gathered;
			case 5:
				var y = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$yAlign, gathered.b)) ? _Utils_update(
					gathered,
					{
						a: A2(
							elm$core$List$cons,
							classNameAttr(
								mdgriffith$stylish_elephants$Internal$Model$alignYName(y)),
							gathered.a),
						b: function (flags) {
							switch (y) {
								case 1:
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$centerY, flags);
								case 2:
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$alignBottom, flags);
								default:
									return flags;
							}
						}(
							A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$yAlign, gathered.b))
					}) : gathered;
			case 11:
				var shadow = attr.a;
				var _n19 = gathered.W;
				if (_n19.$ === 1) {
					return _Utils_update(
						gathered,
						{
							W: elm$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$boxShadowName(shadow),
									mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(shadow)))
						});
				} else {
					var _n20 = _n19.a;
					var existingClass = _n20.a;
					var existing = _n20.b;
					return _Utils_update(
						gathered,
						{
							W: elm$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$boxShadowName(shadow) + ('-' + existingClass),
									mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(shadow) + (', ' + existing)))
						});
				}
			default:
				var shadow = attr.a;
				var _n21 = gathered.ad;
				if (_n21.$ === 1) {
					return _Utils_update(
						gathered,
						{
							ad: elm$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow),
									mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow)))
						});
				} else {
					var _n22 = _n21.a;
					var existingClass = _n22.a;
					var existing = _n22.b;
					return _Utils_update(
						gathered,
						{
							ad: elm$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow) + ('-' + existingClass),
									mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow) + (', ' + existing)))
						});
				}
		}
	});
var mdgriffith$stylish_elephants$Internal$Flag$none = 0;
var mdgriffith$stylish_elephants$Internal$Model$Generic = {$: 0};
var mdgriffith$stylish_elephants$Internal$Model$initGathered = function (maybeNodeName) {
	return {
		a: _List_Nil,
		W: elm$core$Maybe$Nothing,
		u: _List_Nil,
		b: mdgriffith$stylish_elephants$Internal$Flag$none,
		f: function () {
			if (maybeNodeName.$ === 1) {
				return mdgriffith$stylish_elephants$Internal$Model$Generic;
			} else {
				var name = maybeNodeName.a;
				return mdgriffith$stylish_elephants$Internal$Model$NodeName(name);
			}
		}(),
		d7: _List_Nil,
		ad: elm$core$Maybe$Nothing,
		M: elm$core$Maybe$Nothing
	};
};
var mdgriffith$stylish_elephants$Internal$Model$element = F5(
	function (embedMode, context, node, attributes, children) {
		return A4(
			mdgriffith$stylish_elephants$Internal$Model$asElement,
			embedMode,
			children,
			context,
			mdgriffith$stylish_elephants$Internal$Model$finalize(
				A3(
					elm$core$List$foldr,
					mdgriffith$stylish_elephants$Internal$Model$gatherAttributes,
					mdgriffith$stylish_elephants$Internal$Model$initGathered(node),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Internal$Model$contextClasses(context),
						attributes))));
	});
var mdgriffith$stylish_elephants$Internal$Model$NoStyleSheet = {$: 0};
var mdgriffith$stylish_elephants$Internal$Model$noStyleSheet = mdgriffith$stylish_elephants$Internal$Model$NoStyleSheet;
var mdgriffith$stylish_elephants$Element$column = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asColumn,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.cM),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.bx),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
							attrs)))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Internal$Model$Content = {$: 1};
var mdgriffith$stylish_elephants$Element$shrink = mdgriffith$stylish_elephants$Internal$Model$Content;
var mdgriffith$stylish_elephants$Element$el = F2(
	function (attrs, child) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
					attrs)),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
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
var mdgriffith$stylish_elephants$Internal$Flag$overflow = mdgriffith$stylish_elephants$Internal$Flag$col(20);
var mdgriffith$stylish_elephants$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$clip = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$overflow, mdgriffith$stylish_elephants$Internal$Style$classes.cG);
var mdgriffith$stylish_elephants$Element$image = F2(
	function (attrs, _n0) {
		var src = _n0.d4;
		var description = _n0.ai;
		var imageAttributes = A2(
			elm$core$List$filter,
			function (a) {
				switch (a.$) {
					case 7:
						return true;
					case 8:
						return true;
					default:
						return false;
				}
			},
			attrs);
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(elm$core$List$cons, mdgriffith$stylish_elephants$Element$clip, attrs),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A5(
						mdgriffith$stylish_elephants$Internal$Model$element,
						mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
						mdgriffith$stylish_elephants$Internal$Model$asEl,
						elm$core$Maybe$Just('img'),
						_Utils_ap(
							imageAttributes,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Internal$Model$Attr(
									elm$html$Html$Attributes$src(src)),
									mdgriffith$stylish_elephants$Internal$Model$Attr(
									elm$html$Html$Attributes$alt(description))
								])),
						mdgriffith$stylish_elephants$Internal$Model$Unkeyed(_List_Nil))
					])));
	});
var mdgriffith$stylish_elephants$Internal$Model$InFront = 4;
var mdgriffith$stylish_elephants$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$inFront = function (element) {
	return A2(mdgriffith$stylish_elephants$Internal$Model$Nearby, 4, element);
};
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var mdgriffith$stylish_elephants$Element$link = F2(
	function (attrs, _n0) {
		var url = _n0.n;
		var label = _n0.aP;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Just('a'),
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$Attr(
					elm$html$Html$Attributes$href(url)),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ah),
								A2(
									elm$core$List$cons,
									mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.X),
									attrs)))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var mdgriffith$stylish_elephants$Internal$Flag$moveX = mdgriffith$stylish_elephants$Internal$Flag$col(25);
var mdgriffith$stylish_elephants$Internal$Model$Move = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Element$moveLeft = function (x) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$moveX,
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Move,
				elm$core$Maybe$Just(-x),
				elm$core$Maybe$Nothing,
				elm$core$Maybe$Nothing)));
};
var mdgriffith$stylish_elephants$Internal$Model$Empty = {$: 3};
var mdgriffith$stylish_elephants$Element$none = mdgriffith$stylish_elephants$Internal$Model$Empty;
var mdgriffith$stylish_elephants$Internal$Flag$spacing = mdgriffith$stylish_elephants$Internal$Flag$col(3);
var mdgriffith$stylish_elephants$Element$spacing = function (x) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$spacing,
		A2(mdgriffith$stylish_elephants$Internal$Model$SpacingStyle, x, x));
};
var mdgriffith$stylish_elephants$Internal$Model$AsParagraph = 4;
var mdgriffith$stylish_elephants$Internal$Model$asParagraph = 4;
var mdgriffith$stylish_elephants$Element$paragraph = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asParagraph,
			elm$core$Maybe$Just('p'),
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$spacing(5),
					attrs)),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Internal$Model$Px = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$stylish_elephants$Element$px = mdgriffith$stylish_elephants$Internal$Model$Px;
var mdgriffith$stylish_elephants$Internal$Model$Text = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Element$text = function (content) {
	return mdgriffith$stylish_elephants$Internal$Model$Text(content);
};
var mdgriffith$stylish_elephants$Internal$Flag$fontWeight = mdgriffith$stylish_elephants$Internal$Flag$col(13);
var mdgriffith$stylish_elephants$Element$Font$bold = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontWeight, mdgriffith$stylish_elephants$Internal$Style$classes.ct);
var mdgriffith$stylish_elephants$Internal$Flag$fontColor = mdgriffith$stylish_elephants$Internal$Flag$col(14);
var mdgriffith$stylish_elephants$Element$Font$color = function (fontColor) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$fontColor,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Colored,
			'fc-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var mdgriffith$stylish_elephants$Internal$Flag$fontSize = mdgriffith$stylish_elephants$Internal$Flag$col(4);
var mdgriffith$stylish_elephants$Element$Font$size = function (i) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$fontSize,
		mdgriffith$stylish_elephants$Internal$Model$FontSize(i));
};
var author$project$Framework$initConf = {
	a9: mdgriffith$stylish_elephants$Element$inFront(
		A2(
			mdgriffith$stylish_elephants$Element$link,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$alignRight,
					mdgriffith$stylish_elephants$Element$Font$color(
					author$project$Color$toElementColor(author$project$Color$black))
				]),
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$image,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$width(
							mdgriffith$stylish_elephants$Element$px(60)),
							mdgriffith$stylish_elephants$Element$alpha(0.5)
						]),
					{ai: 'Fork me on Github', d4: 'images/github.png'}),
				n: 'https://github.com/lucamug/elm-style-framework'
			})),
	ak: A3(author$project$Color$rgb, 51, 51, 51),
	al: A3(author$project$Color$rgb, 153, 153, 153),
	ba: A3(author$project$Color$rgb, 182, 182, 182),
	bb: A3(author$project$Color$rgb, 209, 209, 209),
	bc: A3(author$project$Color$rgb, 247, 247, 247),
	bH: function (hostname) {
		return hostname === 'localhost';
	},
	bf: mdgriffith$stylish_elephants$Element$none,
	B: 41,
	at: '',
	a0: 'FRAMEWORK',
	az: A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$link,
				_List_Nil,
				{
					aP: A2(
						mdgriffith$stylish_elephants$Element$el,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$alpha(0.3)
							]),
						A2(
							author$project$Framework$Logo$logo,
							author$project$Framework$Logo$LogoElm(
								author$project$Framework$Logo$ElmColor(4)),
							60)),
					n: '..'
				}),
				A2(
				mdgriffith$stylish_elephants$Element$paragraph,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$size(55),
						mdgriffith$stylish_elephants$Element$Font$bold,
						mdgriffith$stylish_elephants$Element$moveLeft(3)
					]),
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Element$el,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$alpha(0.5)
							]),
						mdgriffith$stylish_elephants$Element$text('elm')),
						mdgriffith$stylish_elephants$Element$text('Style')
					]))
			])),
	a3: '0.19'
};
var author$project$Color$lighten = F2(
	function (quantity, cl) {
		return cl;
	});
var author$project$Color$saturate = F2(
	function (quantity, cl) {
		return cl;
	});
var author$project$Framework$Button$SizeDefault = 1;
var author$project$Framework$Button$StateDefault = 0;
var author$project$Framework$Button$StateDisabled = 4;
var elm$core$String$cons = _String_cons;
var elm$core$String$startsWith = _String_startsWith;
var author$project$Color$withPrecedingHash = function (str) {
	return A2(elm$core$String$startsWith, '#', str) ? str : A2(elm$core$String$cons, '#', str);
};
var author$project$Color$erroneousHex = function (str) {
	return {
		x: 1,
		y: 0,
		A: 0,
		D: 0,
		bn: author$project$Color$withPrecedingHash(str)
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
				switch (_char) {
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
		if (!ra.$) {
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
		if (!result.$) {
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
		if ((((!results.a.a.$) && (!results.a.b.$)) && (!results.b.a.$)) && (!results.b.b.$)) {
			var _n5 = results.a;
			var red = _n5.a.a;
			var green = _n5.b.a;
			var _n6 = results.b;
			var blue = _n6.a.a;
			var alpha = _n6.b.a;
			return {
				x: alpha / 255,
				y: blue,
				A: green,
				D: red,
				bn: author$project$Color$withPrecedingHash(str)
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
					_Utils_Tuple2('f', 'f'));
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
								_Utils_Tuple2('f', 'f'));
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
	return A4(author$project$Color$rgba, c.D, c.A, c.y, c.x);
};
var elm$core$Char$fromCode = _Char_fromCode;
var author$project$Color$toRadix = function (n) {
	var getChr = function (c) {
		return (c < 10) ? elm$core$String$fromInt(c) : elm$core$String$fromChar(
			elm$core$Char$fromCode(87 + c));
	};
	var result = (n < 16) ? getChr(n) : _Utils_ap(
		author$project$Color$toRadix((n / 16) | 0),
		getChr(n % 16));
	return result;
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
		'0',
		author$project$Color$toRadix($));
};
var author$project$Color$colorToHex = function (cl) {
	var _n0 = author$project$Color$toRgb(cl);
	var red = _n0.D;
	var green = _n0.A;
	var blue = _n0.y;
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
					[red, green, blue]))));
};
var author$project$Color$HSLA = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
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
var author$project$Color$hsl2 = F3(
	function (h2, s2, l2) {
		return A3(
			author$project$Color$hsl,
			elm$core$Basics$degrees(h2),
			s2 / 100,
			l2 / 100);
	});
var author$project$Color$hsl2ToString = F3(
	function (h2, s2, l2) {
		return author$project$Color$colorToHex(
			A3(author$project$Color$hsl2, h2, s2, l2));
	});
var author$project$Framework$Configuration$bulmaColor = {
	co: A3(author$project$Color$hsl2ToString, 0, 0, 4),
	cp: A3(author$project$Color$hsl2ToString, 0, 0, 7),
	cq: A3(author$project$Color$hsl2ToString, 0, 0, 14),
	y: A3(author$project$Color$hsl2ToString, 217, 71, 53),
	cP: A3(author$project$Color$hsl2ToString, 204, 86, 53),
	A: A3(author$project$Color$hsl2ToString, 141, 71, 48),
	c_: A3(author$project$Color$hsl2ToString, 0, 0, 48),
	c$: A3(author$project$Color$hsl2ToString, 0, 0, 29),
	c0: A3(author$project$Color$hsl2ToString, 0, 0, 21),
	c1: A3(author$project$Color$hsl2ToString, 0, 0, 71),
	c2: A3(author$project$Color$hsl2ToString, 0, 0, 86),
	dD: A3(author$project$Color$hsl2ToString, 14, 100, 53),
	dS: A3(author$project$Color$hsl2ToString, 271, 100, 71),
	D: A3(author$project$Color$hsl2ToString, 348, 100, 61),
	ew: A3(author$project$Color$hsl2ToString, 171, 100, 41),
	eC: A3(author$project$Color$hsl2ToString, 0, 0, 100),
	eD: A3(author$project$Color$hsl2ToString, 0, 0, 98),
	eE: A3(author$project$Color$hsl2ToString, 0, 0, 96),
	eK: A3(author$project$Color$hsl2ToString, 48, 100, 67)
};
var author$project$Framework$Configuration$bulmaSizes = {bi: '3.00', bj: '2.50', bk: '2.00', aY: '1.50', aZ: '1.25', a_: '1.00', a$: '0.75'};
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
			_Utils_Tuple2('black', author$project$Framework$Configuration$bulmaColor.co),
			_Utils_Tuple2('black_bis', author$project$Framework$Configuration$bulmaColor.cp),
			_Utils_Tuple2('black_ter', author$project$Framework$Configuration$bulmaColor.cq),
			_Utils_Tuple2('grey_darker', author$project$Framework$Configuration$bulmaColor.c0),
			_Utils_Tuple2('grey_dark', author$project$Framework$Configuration$bulmaColor.c$),
			_Utils_Tuple2('grey', author$project$Framework$Configuration$bulmaColor.c_),
			_Utils_Tuple2('grey_light', author$project$Framework$Configuration$bulmaColor.c1),
			_Utils_Tuple2('grey_lighter', author$project$Framework$Configuration$bulmaColor.c2),
			_Utils_Tuple2('white_ter', author$project$Framework$Configuration$bulmaColor.eE),
			_Utils_Tuple2('white_bis', author$project$Framework$Configuration$bulmaColor.eD),
			_Utils_Tuple2('white', author$project$Framework$Configuration$bulmaColor.eC),
			_Utils_Tuple2('orange', author$project$Framework$Configuration$bulmaColor.dD),
			_Utils_Tuple2('yellow', author$project$Framework$Configuration$bulmaColor.eK),
			_Utils_Tuple2('green', author$project$Framework$Configuration$bulmaColor.A),
			_Utils_Tuple2('turquoise', author$project$Framework$Configuration$bulmaColor.ew),
			_Utils_Tuple2('cyan', author$project$Framework$Configuration$bulmaColor.cP),
			_Utils_Tuple2('blue', author$project$Framework$Configuration$bulmaColor.y),
			_Utils_Tuple2('purple', author$project$Framework$Configuration$bulmaColor.dS),
			_Utils_Tuple2('red', author$project$Framework$Configuration$bulmaColor.D),
			_Utils_Tuple2('font_url', 'https://fonts.googleapis.com/css?family=Noto+Sans'),
			_Utils_Tuple2('font_typeface', 'Noto Sans'),
			_Utils_Tuple2('font_typeface_fallback', 'sans-serif'),
			_Utils_Tuple2('size1', author$project$Framework$Configuration$bulmaSizes.bi),
			_Utils_Tuple2('size2', author$project$Framework$Configuration$bulmaSizes.bj),
			_Utils_Tuple2('size3', author$project$Framework$Configuration$bulmaSizes.bk),
			_Utils_Tuple2('size4', author$project$Framework$Configuration$bulmaSizes.aY),
			_Utils_Tuple2('size5', author$project$Framework$Configuration$bulmaSizes.aZ),
			_Utils_Tuple2('size6', author$project$Framework$Configuration$bulmaSizes.a_),
			_Utils_Tuple2('size7', author$project$Framework$Configuration$bulmaSizes.a$),
			_Utils_Tuple2('primary', author$project$Framework$Configuration$bulmaColor.ew),
			_Utils_Tuple2('info', author$project$Framework$Configuration$bulmaColor.cP),
			_Utils_Tuple2('success', author$project$Framework$Configuration$bulmaColor.A),
			_Utils_Tuple2('warning', author$project$Framework$Configuration$bulmaColor.eK),
			_Utils_Tuple2('danger', author$project$Framework$Configuration$bulmaColor.D),
			_Utils_Tuple2('light', author$project$Framework$Configuration$bulmaColor.eE),
			_Utils_Tuple2('dark', author$project$Framework$Configuration$bulmaColor.c0),
			_Utils_Tuple2('background', author$project$Framework$Configuration$bulmaColor.eE),
			_Utils_Tuple2('border', author$project$Framework$Configuration$bulmaColor.c2),
			_Utils_Tuple2('border-hover', author$project$Framework$Configuration$bulmaColor.c1),
			_Utils_Tuple2('text', author$project$Framework$Configuration$bulmaColor.c$),
			_Utils_Tuple2('text-light', author$project$Framework$Configuration$bulmaColor.c_),
			_Utils_Tuple2('text-strong', author$project$Framework$Configuration$bulmaColor.c0),
			_Utils_Tuple2('code', author$project$Framework$Configuration$bulmaColor.D),
			_Utils_Tuple2('code-background', author$project$Framework$Configuration$bulmaColor.eE),
			_Utils_Tuple2('pre', author$project$Framework$Configuration$bulmaColor.c$),
			_Utils_Tuple2('pre-background', author$project$Framework$Configuration$bulmaColor.eE),
			_Utils_Tuple2('link', author$project$Framework$Configuration$bulmaColor.y),
			_Utils_Tuple2(
			'link_invert',
			author$project$Framework$Configuration$findColorInvert(author$project$Framework$Configuration$bulmaColor.y)),
			_Utils_Tuple2('link_visited', author$project$Framework$Configuration$bulmaColor.dS),
			_Utils_Tuple2('link_hover', author$project$Framework$Configuration$bulmaColor.c0),
			_Utils_Tuple2('link_hover_border', author$project$Framework$Configuration$bulmaColor.c1),
			_Utils_Tuple2('link_focus', author$project$Framework$Configuration$bulmaColor.c0),
			_Utils_Tuple2('link_focus_border', author$project$Framework$Configuration$bulmaColor.y),
			_Utils_Tuple2('link_active', author$project$Framework$Configuration$bulmaColor.c0),
			_Utils_Tuple2('link_active_border', author$project$Framework$Configuration$bulmaColor.c$),
			_Utils_Tuple2('size_small', author$project$Framework$Configuration$bulmaSizes.a$),
			_Utils_Tuple2('size_normal', author$project$Framework$Configuration$bulmaSizes.a_),
			_Utils_Tuple2('size_medium', author$project$Framework$Configuration$bulmaSizes.aZ),
			_Utils_Tuple2('size_large', author$project$Framework$Configuration$bulmaSizes.aY),
			_Utils_Tuple2('moveDownPlaceHolderLarge', '31'),
			_Utils_Tuple2('moveDownPlaceHolderSmall', '30'),
			_Utils_Tuple2('transparent', '#ffffff00'),
			_Utils_Tuple2('muted', author$project$Framework$Configuration$bulmaColor.c1),
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
		if (!repl.$) {
			var value = repl.a;
			return elm$core$Maybe$Just(value);
		} else {
			if (!orig.$) {
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
var author$project$Framework$Configuration$getColor = function (key) {
	var value = author$project$Framework$Configuration$getString(key);
	return author$project$Color$hexToColor(value);
};
var elm$core$String$toFloat = _String_toFloat;
var author$project$Framework$Configuration$getFloat = function (key) {
	var _n0 = elm$core$String$toFloat(
		author$project$Framework$Configuration$getString(key));
	if (!_n0.$) {
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
var mdgriffith$stylish_elephants$Internal$Model$Monospace = {$: 2};
var mdgriffith$stylish_elephants$Element$Font$monospace = mdgriffith$stylish_elephants$Internal$Model$Monospace;
var mdgriffith$stylish_elephants$Internal$Model$SansSerif = {$: 1};
var mdgriffith$stylish_elephants$Element$Font$sansSerif = mdgriffith$stylish_elephants$Internal$Model$SansSerif;
var mdgriffith$stylish_elephants$Internal$Model$Serif = {$: 0};
var mdgriffith$stylish_elephants$Element$Font$serif = mdgriffith$stylish_elephants$Internal$Model$Serif;
var author$project$Framework$Configuration$getTypeface = function (key) {
	var value = author$project$Framework$Configuration$getString(key);
	return (value === 'sans-serif') ? mdgriffith$stylish_elephants$Element$Font$sansSerif : ((value === 'monospace') ? mdgriffith$stylish_elephants$Element$Font$monospace : ((value === 'cursive') ? mdgriffith$stylish_elephants$Element$Font$serif : mdgriffith$stylish_elephants$Element$Font$serif));
};
var author$project$Framework$Configuration$conf = {
	h: {
		cV: author$project$Framework$Configuration$getInt('buttonFontDefault'),
		cW: author$project$Framework$Configuration$getInt('buttonFontJumbo'),
		cX: author$project$Framework$Configuration$getInt('buttonFontLarge'),
		cY: author$project$Framework$Configuration$getInt('buttonFontMedium'),
		cZ: author$project$Framework$Configuration$getInt('buttonFontSmall'),
		dE: author$project$Framework$Configuration$getInt('buttonPaddingXDefault'),
		dF: author$project$Framework$Configuration$getInt('buttonPaddingXJumbo'),
		dG: author$project$Framework$Configuration$getInt('buttonPaddingXLarge'),
		dH: author$project$Framework$Configuration$getInt('buttonPaddingXMedium'),
		dI: author$project$Framework$Configuration$getInt('buttonPaddingXSmall'),
		dJ: author$project$Framework$Configuration$getInt('buttonPaddingYDefault'),
		dK: author$project$Framework$Configuration$getInt('buttonPaddingYJumbo'),
		dL: author$project$Framework$Configuration$getInt('buttonPaddingYLarge'),
		dM: author$project$Framework$Configuration$getInt('buttonPaddingYMedium'),
		dN: author$project$Framework$Configuration$getInt('buttonPaddingYSmall')
	},
	j: {
		ck: author$project$Framework$Configuration$getColor('background'),
		co: author$project$Framework$Configuration$getColor('black'),
		cp: author$project$Framework$Configuration$getColor('black_bis'),
		cq: author$project$Framework$Configuration$getColor('black_ter'),
		y: author$project$Framework$Configuration$getColor('blue'),
		cu: author$project$Framework$Configuration$getColor('border'),
		cz: author$project$Framework$Configuration$getColor('border_hover'),
		cJ: author$project$Framework$Configuration$getColor('code'),
		cK: author$project$Framework$Configuration$getColor('code_background'),
		cP: author$project$Framework$Configuration$getColor('cyan'),
		cQ: author$project$Framework$Configuration$getColor('danger'),
		cR: author$project$Framework$Configuration$getColor('dark'),
		A: author$project$Framework$Configuration$getColor('green'),
		c_: author$project$Framework$Configuration$getColor('grey'),
		c$: author$project$Framework$Configuration$getColor('grey_dark'),
		c0: author$project$Framework$Configuration$getColor('grey_darker'),
		c1: author$project$Framework$Configuration$getColor('grey_light'),
		c2: author$project$Framework$Configuration$getColor('grey_lighter'),
		db: author$project$Framework$Configuration$getColor('info'),
		dg: author$project$Framework$Configuration$getColor('light'),
		dh: author$project$Framework$Configuration$getColor('link'),
		di: author$project$Framework$Configuration$getColor('link_active'),
		dj: author$project$Framework$Configuration$getColor('link_active_border'),
		dk: author$project$Framework$Configuration$getColor('link_focus'),
		dl: author$project$Framework$Configuration$getColor('link_focus_border'),
		dm: author$project$Framework$Configuration$getColor('link_hover'),
		dn: author$project$Framework$Configuration$getColor('link_hover_border'),
		$7: author$project$Framework$Configuration$getColor('link_invert'),
		dp: author$project$Framework$Configuration$getColor('link_visited'),
		dt: author$project$Framework$Configuration$getColor('muted'),
		dD: author$project$Framework$Configuration$getColor('orange'),
		dP: author$project$Framework$Configuration$getColor('pre'),
		dQ: author$project$Framework$Configuration$getColor('pre_background'),
		dR: author$project$Framework$Configuration$getColor('primary'),
		dS: author$project$Framework$Configuration$getColor('purple'),
		D: author$project$Framework$Configuration$getColor('red'),
		ea: author$project$Framework$Configuration$getColor('success'),
		eb: author$project$Framework$Configuration$getColor('text'),
		ep: author$project$Framework$Configuration$getColor('text_light'),
		eq: author$project$Framework$Configuration$getColor('text_strong'),
		ev: author$project$Framework$Configuration$getColor('transparent'),
		ew: author$project$Framework$Configuration$getColor('turquoise'),
		eB: author$project$Framework$Configuration$getColor('warning'),
		eC: author$project$Framework$Configuration$getColor('white'),
		eD: author$project$Framework$Configuration$getColor('white_bis'),
		eE: author$project$Framework$Configuration$getColor('white_ter'),
		eK: author$project$Framework$Configuration$getColor('yellow')
	},
	aM: {
		b4: author$project$Framework$Configuration$getString('font_typeface'),
		ex: author$project$Framework$Configuration$getTypeface('font_typeface_fallback'),
		n: author$project$Framework$Configuration$getString('font_url')
	},
	ds: {
		de: author$project$Framework$Configuration$getFloat('moveDownPlaceHolderLarge'),
		d1: author$project$Framework$Configuration$getFloat('moveDownPlaceHolderSmall')
	},
	F: {
		bi: author$project$Framework$Configuration$getFloat('size1'),
		bj: author$project$Framework$Configuration$getFloat('size2'),
		bk: author$project$Framework$Configuration$getFloat('size3'),
		aY: author$project$Framework$Configuration$getFloat('size4'),
		aZ: author$project$Framework$Configuration$getFloat('size5'),
		a_: author$project$Framework$Configuration$getFloat('size6'),
		a$: author$project$Framework$Configuration$getFloat('size7')
	}
};
var author$project$Framework$Color$grey_lighter = author$project$Framework$Configuration$conf.j.c2;
var author$project$Framework$Button$colorBorderDefault = author$project$Framework$Color$grey_lighter;
var author$project$Framework$Color$white = author$project$Framework$Configuration$conf.j.eC;
var author$project$Framework$Button$colorDefault = author$project$Framework$Color$white;
var author$project$Framework$Button$SizeJumbo = 4;
var author$project$Framework$Button$SizeLarge = 3;
var author$project$Framework$Button$SizeMedium = 2;
var author$project$Framework$Button$SizeSmall = 0;
var author$project$Framework$Button$StateLoading = 2;
var author$project$Framework$Button$StateOutlined = 1;
var author$project$Framework$Button$StateWaiting = 3;
var author$project$Framework$Color$danger = author$project$Framework$Configuration$conf.j.cQ;
var author$project$Framework$Color$info = author$project$Framework$Configuration$conf.j.db;
var author$project$Framework$Color$muted = author$project$Framework$Configuration$conf.j.dt;
var author$project$Framework$Color$primary = author$project$Framework$Configuration$conf.j.dR;
var author$project$Framework$Color$success = author$project$Framework$Configuration$conf.j.ea;
var author$project$Framework$Color$warning = author$project$Framework$Configuration$conf.j.eB;
var author$project$Framework$Button$processConf = F2(
	function (modifier, confButton) {
		switch (modifier) {
			case 0:
				return _Utils_update(
					confButton,
					{j: author$project$Framework$Color$muted});
			case 1:
				return _Utils_update(
					confButton,
					{j: author$project$Framework$Color$primary});
			case 2:
				return _Utils_update(
					confButton,
					{j: author$project$Framework$Color$success});
			case 3:
				return _Utils_update(
					confButton,
					{j: author$project$Framework$Color$info});
			case 4:
				return _Utils_update(
					confButton,
					{j: author$project$Framework$Color$warning});
			case 5:
				return _Utils_update(
					confButton,
					{j: author$project$Framework$Color$danger});
			case 6:
				return _Utils_update(
					confButton,
					{F: 0});
			case 7:
				return _Utils_update(
					confButton,
					{F: 2});
			case 8:
				return _Utils_update(
					confButton,
					{F: 3});
			case 9:
				return _Utils_update(
					confButton,
					{F: 4});
			case 10:
				return _Utils_update(
					confButton,
					{l: 1});
			case 11:
				return _Utils_update(
					confButton,
					{l: 2});
			case 12:
				return _Utils_update(
					confButton,
					{l: 3});
			default:
				return _Utils_update(
					confButton,
					{l: 4});
		}
	});
var author$project$Framework$Button$toButtonPadding = function (size) {
	switch (size) {
		case 0:
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.h.dI, author$project$Framework$Configuration$conf.h.dN);
		case 1:
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.h.dE, author$project$Framework$Configuration$conf.h.dJ);
		case 2:
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.h.dH, author$project$Framework$Configuration$conf.h.dM);
		case 3:
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.h.dG, author$project$Framework$Configuration$conf.h.dL);
		default:
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.h.dF, author$project$Framework$Configuration$conf.h.dK);
	}
};
var author$project$Framework$Button$toPx = function (size) {
	switch (size) {
		case 0:
			return author$project$Framework$Configuration$conf.h.cZ;
		case 1:
			return author$project$Framework$Configuration$conf.h.cV;
		case 2:
			return author$project$Framework$Configuration$conf.h.cY;
		case 3:
			return author$project$Framework$Configuration$conf.h.cX;
		default:
			return author$project$Framework$Configuration$conf.h.cW;
	}
};
var author$project$Framework$Color$grey_dark = author$project$Framework$Configuration$conf.j.c$;
var author$project$Framework$Color$transparent = author$project$Framework$Configuration$conf.j.ev;
var author$project$Framework$Spinner$Rotation = 1;
var author$project$Framework$Spinner$ThreeCircles = 0;
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
		var colorString = author$project$Color$colorToHex(color);
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
		var colorString = author$project$Color$colorToHex(color);
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
		return mdgriffith$stylish_elephants$Element$html(
			function () {
				if (!sp) {
					return A2(author$project$Framework$Spinner$spinnerThreeCirclesHtml, size, color);
				} else {
					return A2(author$project$Framework$Spinner$spinnerRotationHtml, size, color);
				}
			}());
	});
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var mdgriffith$stylish_elephants$Internal$Model$CenterX = 1;
var mdgriffith$stylish_elephants$Element$centerX = mdgriffith$stylish_elephants$Internal$Model$AlignX(1);
var mdgriffith$stylish_elephants$Internal$Model$AlignY = function (a) {
	return {$: 5, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$CenterY = 1;
var mdgriffith$stylish_elephants$Element$centerY = mdgriffith$stylish_elephants$Internal$Model$AlignY(1);
var mdgriffith$stylish_elephants$Element$htmlAttribute = mdgriffith$stylish_elephants$Internal$Model$Attr;
var mdgriffith$stylish_elephants$Internal$Flag$hover = mdgriffith$stylish_elephants$Internal$Flag$col(33);
var mdgriffith$stylish_elephants$Internal$Model$tag = F2(
	function (label, style) {
		switch (style.$) {
			case 3:
				var _class = style.a;
				var prop = style.b;
				var val = style.c;
				return A3(mdgriffith$stylish_elephants$Internal$Model$Single, label + ('-' + _class), prop, val);
			case 4:
				var _class = style.a;
				var prop = style.b;
				var val = style.c;
				return A3(mdgriffith$stylish_elephants$Internal$Model$Colored, label + ('-' + _class), prop, val);
			case 0:
				var _class = style.a;
				var props = style.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Style, label + ('-' + _class), props);
			case 11:
				var _class = style.a;
				var o = style.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Transparency, label + ('-' + _class), o);
			default:
				var x = style;
				return x;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$onlyStyles = function (attr) {
	switch (attr.$) {
		case 4:
			var style = attr.b;
			return elm$core$Maybe$Just(style);
		case 10:
			var shadow = attr.a;
			var stringName = mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow);
			return elm$core$Maybe$Just(
				A2(
					mdgriffith$stylish_elephants$Internal$Model$Shadows,
					'txt-shadow-' + mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow),
					stringName));
		case 11:
			var shadow = attr.a;
			var stringName = mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(shadow);
			return elm$core$Maybe$Just(
				A2(
					mdgriffith$stylish_elephants$Internal$Model$Shadows,
					'box-shadow-' + mdgriffith$stylish_elephants$Internal$Model$boxShadowName(shadow),
					stringName));
		default:
			return elm$core$Maybe$Nothing;
	}
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var mdgriffith$stylish_elephants$Internal$Model$BoxShadow = function (a) {
	return {$: 11, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Describe = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$NoAttribute = {$: 0};
var mdgriffith$stylish_elephants$Internal$Model$TextShadow = function (a) {
	return {$: 10, a: a};
};
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var mdgriffith$stylish_elephants$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 1:
				var styled = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$Styled(
					{
						c6: F2(
							function (add, context) {
								return A2(
									elm$virtual_dom$VirtualDom$map,
									fn,
									A2(styled.c6, add, context));
							}),
						d7: styled.d7
					});
			case 0:
				var html = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					function ($) {
						return A2(
							elm$virtual_dom$VirtualDom$map,
							fn,
							html($));
					});
			case 2:
				var str = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$Text(str);
			default:
				return mdgriffith$stylish_elephants$Internal$Model$Empty;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$mapAttrFromStyle = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 0:
				return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
			case 2:
				var description = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Describe(description);
			case 6:
				var x = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$AlignX(x);
			case 5:
				var y = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$AlignY(y);
			case 7:
				var x = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Width(x);
			case 8:
				var x = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Height(x);
			case 3:
				var x = attr.a;
				var y = attr.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Class, x, y);
			case 4:
				var flag = attr.a;
				var style = attr.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$StyleClass, flag, style);
			case 9:
				var location = attr.a;
				var elem = attr.b;
				return A2(
					mdgriffith$stylish_elephants$Internal$Model$Nearby,
					location,
					A2(mdgriffith$stylish_elephants$Internal$Model$map, fn, elem));
			case 1:
				var htmlAttr = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Attr(
					A2(elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			case 10:
				var shadow = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$TextShadow(shadow);
			default:
				var shadow = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$BoxShadow(shadow);
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$removeNever = function (style) {
	return A2(mdgriffith$stylish_elephants$Internal$Model$mapAttrFromStyle, elm$core$Basics$never, style);
};
var mdgriffith$stylish_elephants$Internal$Model$unwrapDecorations = function (attrs) {
	var joinShadows = F2(
		function (x, styles) {
			if (x.$ === 12) {
				var name = x.a;
				var shadowProps = x.b;
				var _n3 = styles.av;
				if (_n3.$ === 1) {
					return _Utils_update(
						styles,
						{
							av: elm$core$Maybe$Just(
								_Utils_Tuple2(name, shadowProps))
						});
				} else {
					var _n4 = _n3.a;
					var existingName = _n4.a;
					var existingShadow = _n4.b;
					return _Utils_update(
						styles,
						{
							av: elm$core$Maybe$Just(
								_Utils_Tuple2(
									_Utils_ap(existingName, name),
									existingShadow + (', ' + shadowProps)))
						});
				}
			} else {
				return _Utils_update(
					styles,
					{
						d7: A2(elm$core$List$cons, x, styles.d7)
					});
			}
		});
	var addShadow = function (styles) {
		var _n0 = styles.av;
		if (_n0.$ === 1) {
			return styles.d7;
		} else {
			var _n1 = _n0.a;
			var shadowName = _n1.a;
			var shadowProps = _n1.b;
			return A2(
				elm$core$List$cons,
				A2(mdgriffith$stylish_elephants$Internal$Model$Shadows, shadowName, shadowProps),
				styles.d7);
		}
	};
	return addShadow(
		A3(
			elm$core$List$foldr,
			joinShadows,
			{av: elm$core$Maybe$Nothing, d7: _List_Nil},
			A2(
				elm$core$List$filterMap,
				function ($) {
					return mdgriffith$stylish_elephants$Internal$Model$onlyStyles(
						mdgriffith$stylish_elephants$Internal$Model$removeNever($));
				},
				attrs)));
};
var mdgriffith$stylish_elephants$Element$mouseOver = function (decs) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$hover,
		A2(
			mdgriffith$stylish_elephants$Internal$Model$PseudoSelector,
			1,
			A2(
				elm$core$List$map,
				mdgriffith$stylish_elephants$Internal$Model$tag(mdgriffith$stylish_elephants$Internal$Style$classes.c5),
				mdgriffith$stylish_elephants$Internal$Model$unwrapDecorations(decs))));
};
var mdgriffith$stylish_elephants$Internal$Flag$padding = mdgriffith$stylish_elephants$Internal$Flag$col(2);
var mdgriffith$stylish_elephants$Element$paddingXY = F2(
	function (x, y) {
		return A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$padding,
			A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, y, x, y, x));
	});
var mdgriffith$stylish_elephants$Internal$Flag$bgColor = mdgriffith$stylish_elephants$Internal$Flag$col(8);
var mdgriffith$stylish_elephants$Element$Background$color = function (clr) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$bgColor,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Colored,
			'bg-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var mdgriffith$stylish_elephants$Internal$Flag$borderColor = mdgriffith$stylish_elephants$Internal$Flag$col(28);
var mdgriffith$stylish_elephants$Element$Border$color = function (clr) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$borderColor,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Colored,
			'border-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var mdgriffith$stylish_elephants$Internal$Flag$borderRound = mdgriffith$stylish_elephants$Internal$Flag$col(17);
var mdgriffith$stylish_elephants$Element$Border$rounded = function (radius) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$borderRound,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Single,
			'border-radius-' + elm$core$String$fromInt(radius),
			'border-radius',
			elm$core$String$fromInt(radius) + 'px'));
};
var mdgriffith$stylish_elephants$Internal$Flag$borderWidth = mdgriffith$stylish_elephants$Internal$Flag$col(27);
var mdgriffith$stylish_elephants$Element$Border$width = function (v) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$borderWidth,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Single,
			'border-' + elm$core$String$fromInt(v),
			'border-width',
			elm$core$String$fromInt(v) + 'px'));
};
var author$project$Framework$Button$buttonAttr = function (modifiers) {
	var confButton = A3(
		elm$core$List$foldl,
		author$project$Framework$Button$processConf,
		{j: author$project$Framework$Button$colorDefault, F: 1, l: 0},
		modifiers);
	var fontSize = author$project$Framework$Button$toPx(confButton.F);
	var spinnerColor = _Utils_eq(confButton.j, author$project$Framework$Color$white) ? author$project$Framework$Color$grey_dark : author$project$Framework$Color$white;
	var inFrontAddon = function () {
		var _n6 = confButton.l;
		switch (_n6) {
			case 2:
				return _List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$inFront(
						A2(
							mdgriffith$stylish_elephants$Element$el,
							_List_fromArray(
								[mdgriffith$stylish_elephants$Element$centerY, mdgriffith$stylish_elephants$Element$centerX]),
							A3(author$project$Framework$Spinner$spinner, 1, fontSize, spinnerColor)))
					]);
			case 3:
				return _List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$inFront(
						A2(
							mdgriffith$stylish_elephants$Element$el,
							_List_fromArray(
								[mdgriffith$stylish_elephants$Element$centerY, mdgriffith$stylish_elephants$Element$centerX]),
							A3(author$project$Framework$Spinner$spinner, 0, fontSize, spinnerColor)))
					]);
			default:
				return _List_Nil;
		}
	}();
	var cc = confButton.j;
	var fontColor = function () {
		var _n5 = confButton.l;
		switch (_n5) {
			case 1:
				return cc;
			case 2:
				return author$project$Framework$Color$transparent;
			case 3:
				return author$project$Framework$Color$transparent;
			default:
				return _Utils_eq(confButton.j, author$project$Framework$Color$white) ? author$project$Framework$Color$grey_dark : author$project$Framework$Color$white;
		}
	}();
	var fontMouseOverColor = function () {
		var _n4 = confButton.l;
		switch (_n4) {
			case 2:
				return author$project$Framework$Color$transparent;
			case 3:
				return author$project$Framework$Color$transparent;
			case 1:
				return author$project$Framework$Color$white;
			default:
				return A2(
					author$project$Color$saturate,
					0.9,
					A2(author$project$Color$lighten, 0.8, fontColor));
		}
	}();
	var buttonPadding = author$project$Framework$Button$toButtonPadding(confButton.F);
	var borderRounded = function () {
		var _n3 = confButton.F;
		if (!_n3) {
			return 2;
		} else {
			return 3;
		}
	}();
	var backgroundColor = function () {
		var _n2 = confButton.l;
		switch (_n2) {
			case 0:
				return cc;
			case 1:
				return _Utils_eq(confButton.j, author$project$Framework$Color$white) ? author$project$Framework$Button$colorBorderDefault : author$project$Framework$Color$transparent;
			case 2:
				return cc;
			case 3:
				return cc;
			default:
				return A2(
					author$project$Color$saturate,
					0.4,
					A2(author$project$Color$lighten, 1.1, cc));
		}
	}();
	var backgroundMouseOverColor = function () {
		var _n1 = confButton.l;
		if (_n1 === 1) {
			return cc;
		} else {
			return A2(
				author$project$Color$saturate,
				0.9,
				A2(author$project$Color$lighten, 0.8, backgroundColor));
		}
	}();
	var borderColor = function () {
		if (_Utils_eq(confButton.j, author$project$Framework$Color$white)) {
			return author$project$Framework$Button$colorBorderDefault;
		} else {
			var _n0 = confButton.l;
			if (_n0 === 1) {
				return cc;
			} else {
				return backgroundColor;
			}
		}
	}();
	var borderMouseOverColor = A2(
		author$project$Color$saturate,
		0.9,
		A2(author$project$Color$lighten, 0.8, borderColor));
	return _Utils_ap(
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Font$size(fontSize),
				mdgriffith$stylish_elephants$Element$Font$color(
				author$project$Color$toElementColor(fontColor)),
				mdgriffith$stylish_elephants$Element$Background$color(
				author$project$Color$toElementColor(backgroundColor)),
				A2(mdgriffith$stylish_elephants$Element$paddingXY, buttonPadding.a, buttonPadding.b),
				mdgriffith$stylish_elephants$Element$Border$rounded(borderRounded),
				mdgriffith$stylish_elephants$Element$Border$width(1),
				mdgriffith$stylish_elephants$Element$Border$color(
				author$project$Color$toElementColor(borderColor))
			]),
		_Utils_ap(
			(confButton.l === 4) ? _List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$htmlAttribute(
					A2(elm$html$Html$Attributes$style, 'cursor', 'not-allowed'))
				]) : _List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$mouseOver(
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$Font$color(
							author$project$Color$toElementColor(fontMouseOverColor)),
							mdgriffith$stylish_elephants$Element$Background$color(
							author$project$Color$toElementColor(backgroundMouseOverColor)),
							mdgriffith$stylish_elephants$Element$Border$color(
							author$project$Color$toElementColor(borderMouseOverColor))
						]))
				]),
			inFrontAddon));
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
var mdgriffith$stylish_elephants$Internal$Flag$cursor = mdgriffith$stylish_elephants$Internal$Flag$col(21);
var mdgriffith$stylish_elephants$Element$pointer = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$cursor, mdgriffith$stylish_elephants$Internal$Style$classes.cN);
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var elm$virtual_dom$VirtualDom$Sync = function (a) {
	return {$: 0, a: a};
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
var mdgriffith$stylish_elephants$Element$Events$onClick = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm$html$Html$Events$onClick($));
};
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
var mdgriffith$stylish_elephants$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 4) && (attr.b.$ === 10)) && (!attr.b.a)) {
		var _n1 = attr.b;
		var _n2 = _n1.a;
		return true;
	} else {
		return false;
	}
};
var mdgriffith$stylish_elephants$Element$Input$focusDefault = function (attrs) {
	return A2(elm$core$List$any, mdgriffith$stylish_elephants$Element$Input$hasFocusStyle, attrs) ? mdgriffith$stylish_elephants$Internal$Model$NoAttribute : mdgriffith$stylish_elephants$Internal$Model$htmlClass('focusable');
};
var mdgriffith$stylish_elephants$Element$Input$enter = 'Enter';
var elm$html$Html$Events$syncTuple = function (_n0) {
	var msg = _n0.a;
	var bool = _n0.b;
	return _Utils_Tuple2(
		elm$virtual_dom$VirtualDom$Sync(msg),
		bool);
};
var elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
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
var mdgriffith$stylish_elephants$Element$Input$onKey = F2(
	function (desiredCode, msg) {
		var decode = function (code) {
			return _Utils_eq(code, desiredCode) ? elm$json$Json$Decode$succeed(msg) : elm$json$Json$Decode$fail('Not the enter key');
		};
		var isKey = A2(
			elm$json$Json$Decode$andThen,
			decode,
			A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string));
		return mdgriffith$stylish_elephants$Internal$Model$Attr(
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
var mdgriffith$stylish_elephants$Element$Input$onEnter = function (msg) {
	return A2(mdgriffith$stylish_elephants$Element$Input$onKey, mdgriffith$stylish_elephants$Element$Input$enter, msg);
};
var mdgriffith$stylish_elephants$Internal$Model$Button = {$: 8};
var mdgriffith$stylish_elephants$Element$Input$button = F2(
	function (attrs, _n0) {
		var onPress = _n0.aT;
		var label = _n0.aP;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ah),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.X),
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.d_),
								A2(
									elm$core$List$cons,
									mdgriffith$stylish_elephants$Element$pointer,
									A2(
										elm$core$List$cons,
										mdgriffith$stylish_elephants$Element$Input$focusDefault(attrs),
										A2(
											elm$core$List$cons,
											mdgriffith$stylish_elephants$Internal$Model$Describe(mdgriffith$stylish_elephants$Internal$Model$Button),
											A2(
												elm$core$List$cons,
												mdgriffith$stylish_elephants$Internal$Model$Attr(
													elm$html$Html$Attributes$tabindex(0)),
												function () {
													if (onPress.$ === 1) {
														return A2(
															elm$core$List$cons,
															mdgriffith$stylish_elephants$Internal$Model$Attr(
																elm$html$Html$Attributes$disabled(true)),
															attrs);
													} else {
														var msg = onPress.a;
														return A2(
															elm$core$List$cons,
															mdgriffith$stylish_elephants$Element$Events$onClick(msg),
															A2(
																elm$core$List$cons,
																mdgriffith$stylish_elephants$Element$Input$onEnter(msg),
																attrs));
													}
												}()))))))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var author$project$Framework$Button$button = F3(
	function (modifiers, onPress, label) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			author$project$Framework$Button$buttonAttr(modifiers),
			{
				aP: mdgriffith$stylish_elephants$Element$text(label),
				aT: onPress
			});
	});
var author$project$Framework$Button$buttonLink = F3(
	function (modifiers, url, label) {
		return A2(
			mdgriffith$stylish_elephants$Element$link,
			author$project$Framework$Button$buttonAttr(modifiers),
			{
				aP: mdgriffith$stylish_elephants$Element$text(label),
				n: url
			});
	});
var mdgriffith$stylish_elephants$Internal$Flag$fontAlignment = mdgriffith$stylish_elephants$Internal$Flag$col(12);
var mdgriffith$stylish_elephants$Element$Font$center = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontAlignment, mdgriffith$stylish_elephants$Internal$Style$classes.ec);
var author$project$Framework$Button$extraAttrForButtonWidth = function (buttonX) {
	return _List_fromArray(
		[
			mdgriffith$stylish_elephants$Element$htmlAttribute(
			A2(elm$html$Html$Attributes$style, 'width', '100%')),
			mdgriffith$stylish_elephants$Element$htmlAttribute(
			A2(
				elm$html$Html$Attributes$style,
				'max-width',
				elm$core$String$fromInt(buttonX) + 'px')),
			mdgriffith$stylish_elephants$Element$Font$center,
			mdgriffith$stylish_elephants$Element$centerX
		]);
};
var author$project$Framework$Button$buttonLinkWidth = F4(
	function (modifiers, url, label, buttonX) {
		return A2(
			mdgriffith$stylish_elephants$Element$link,
			_Utils_ap(
				author$project$Framework$Button$buttonAttr(modifiers),
				author$project$Framework$Button$extraAttrForButtonWidth(buttonX)),
			{
				aP: mdgriffith$stylish_elephants$Element$text(label),
				n: url
			});
	});
var author$project$Framework$Button$buttonWidth = F4(
	function (modifiers, onPress, label, buttonX) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			_Utils_ap(
				author$project$Framework$Button$buttonAttr(modifiers),
				author$project$Framework$Button$extraAttrForButtonWidth(buttonX)),
			{
				aP: mdgriffith$stylish_elephants$Element$text(label),
				aT: onPress
			});
	});
var author$project$Framework$Modifier$Danger = 5;
var author$project$Framework$Modifier$Disabled = 13;
var author$project$Framework$Modifier$Info = 3;
var author$project$Framework$Modifier$Jumbo = 9;
var author$project$Framework$Modifier$Large = 8;
var author$project$Framework$Modifier$Loading = 11;
var author$project$Framework$Modifier$Medium = 7;
var author$project$Framework$Modifier$Muted = 0;
var author$project$Framework$Modifier$Outlined = 10;
var author$project$Framework$Modifier$Primary = 1;
var author$project$Framework$Modifier$Small = 6;
var author$project$Framework$Modifier$Success = 2;
var author$project$Framework$Modifier$Waiting = 12;
var author$project$Framework$Modifier$Warning = 4;
var mdgriffith$stylish_elephants$Internal$Model$AsRow = 0;
var mdgriffith$stylish_elephants$Internal$Model$asRow = 0;
var mdgriffith$stylish_elephants$Element$row = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asRow,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.bx),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.X),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							attrs)))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var author$project$Framework$Button$introspection = function () {
	var buttonText = 'Button';
	return {
		ai: 'Buttons accept a list of modifiers, a Maybe msg (for example: \"Just DoSomething\") and the text to display inside the button.',
		r: 'Buttons',
		aw: 'List Modifier -> Maybe msg -> String -> Element msg',
		ae: _List_fromArray(
			[
				_Utils_Tuple2(
				'States',
				_List_fromArray(
					[
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[1]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[1, 10]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary, Outlined ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[1, 11]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary, Loading ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[1, 12]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary, Waiting ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[1, 13]),
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
								[0]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Muted ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[1]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[2]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Success ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[3]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Info ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[4]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Warning ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[5]),
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
								[6]),
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
								[7]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Medium ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[8]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Large ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[9]),
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
							mdgriffith$stylish_elephants$Element$Input$button,
							author$project$Framework$Button$buttonAttr(
								_List_fromArray(
									[1])),
							{
								aP: mdgriffith$stylish_elephants$Element$text('button'),
								aT: elm$core$Maybe$Nothing
							}),
						'-- This is the longest form for\n-- button [ Primary ] Nothing "Button"\n\nInput.button (buttonAttr [ Primary ]) <|\n    { onPress = Nothing, label = text "Button" }'),
						_Utils_Tuple2(
						A2(
							mdgriffith$stylish_elephants$Element$el,
							author$project$Framework$Button$buttonAttr(
								_List_fromArray(
									[1])),
							mdgriffith$stylish_elephants$Element$text('Button')),
						'-- Is possible to use the button\n-- styling also with other elements,\n-- for example with "el":\n\nel (buttonAttr [ Primary ]) <|\n    text "Button\"'),
						_Utils_Tuple2(
						A2(
							mdgriffith$stylish_elephants$Element$el,
							author$project$Framework$Button$buttonAttr(
								_List_fromArray(
									[5, 10, 7])),
							mdgriffith$stylish_elephants$Element$text('Button')),
						'el (buttonAttr [ Danger, Outlined, Medium ]) <| text \"Button\"'),
						_Utils_Tuple2(
						A2(
							mdgriffith$stylish_elephants$Element$column,
							_Utils_ap(
								author$project$Framework$Button$buttonAttr(
									_List_fromArray(
										[4])),
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$spacing(10)
									])),
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$text('Row 1'),
									mdgriffith$stylish_elephants$Element$text('Row 2')
								])),
						'column (buttonAttr [ Warning ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ]'),
						_Utils_Tuple2(
						A2(
							mdgriffith$stylish_elephants$Element$column,
							_Utils_ap(
								author$project$Framework$Button$buttonAttr(
									_List_fromArray(
										[4, 12])),
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$spacing(10)
									])),
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$text('Row 1'),
									mdgriffith$stylish_elephants$Element$text('Row 2')
								])),
						'column (buttonAttr [ Warning, Waiting ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ]'),
						_Utils_Tuple2(
						A2(
							mdgriffith$stylish_elephants$Element$row,
							_Utils_ap(
								author$project$Framework$Button$buttonAttr(
									_List_fromArray(
										[3])),
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$spacing(10)
									])),
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$text('Col 1'),
									mdgriffith$stylish_elephants$Element$text('Col 2')
								])),
						'row (buttonAttr [ Info ] ++ [ spacing 10 ]) [ text "Col 1", text "Col 2" ]'),
						_Utils_Tuple2(
						A2(
							mdgriffith$stylish_elephants$Element$Input$button,
							author$project$Framework$Button$buttonAttr(
								_List_fromArray(
									[1, 5])),
							{
								aP: mdgriffith$stylish_elephants$Element$text('button'),
								aT: elm$core$Maybe$Nothing
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
								[13, 0]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Muted ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13, 1]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Primary ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13, 2]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Success ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13, 3]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Info ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13, 4]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Warning ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13, 5]),
							elm$core$Maybe$Nothing,
							buttonText),
						'button [ Danger ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13]),
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
var mdgriffith$stylish_elephants$Element$Border$shadow = function (shade) {
	return mdgriffith$stylish_elephants$Internal$Model$BoxShadow(
		{cr: shade.cr, j: shade.j, be: false, dw: shade.dw, F: shade.F});
};
var author$project$Framework$Card$cardCommonAttr = _List_fromArray(
	[
		mdgriffith$stylish_elephants$Element$Border$shadow(
		{
			cr: 10,
			j: author$project$Color$toElementColor(
				A4(author$project$Color$rgba, 0, 0, 0, 5.0e-2)),
			dw: _Utils_Tuple2(0, 2),
			F: 1
		}),
		mdgriffith$stylish_elephants$Element$Border$width(1),
		mdgriffith$stylish_elephants$Element$Border$color(
		author$project$Color$toElementColor(author$project$Framework$Color$grey_lighter)),
		mdgriffith$stylish_elephants$Element$Background$color(
		author$project$Color$toElementColor(author$project$Framework$Color$white)),
		mdgriffith$stylish_elephants$Element$Border$rounded(4)
	]);
var mdgriffith$stylish_elephants$Element$padding = function (x) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$padding,
		A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, x, x, x, x));
};
var author$project$Framework$Card$simple = function (content) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_Utils_ap(
			author$project$Framework$Card$cardCommonAttr,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$padding(20),
					mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink)
				])),
		content);
};
var author$project$Framework$Color$grey = author$project$Framework$Configuration$conf.j.c_;
var author$project$Framework$Color$grey_light = author$project$Framework$Configuration$conf.j.c1;
var mdgriffith$stylish_elephants$Element$Border$widthEach = function (_n0) {
	var bottom = _n0.cA;
	var top = _n0.er;
	var left = _n0.df;
	var right = _n0.dU;
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$borderWidth,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Single,
			'border-' + (elm$core$String$fromInt(top) + ('-' + (elm$core$String$fromInt(right) + (elm$core$String$fromInt(bottom) + ('-' + elm$core$String$fromInt(left)))))),
			'border-width',
			elm$core$String$fromInt(top) + ('px ' + (elm$core$String$fromInt(right) + ('px ' + (elm$core$String$fromInt(bottom) + ('px ' + (elm$core$String$fromInt(left) + 'px'))))))));
};
var author$project$Framework$Card$simpleWithTitle = F3(
	function (title, subTitle, content) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_Utils_ap(
				author$project$Framework$Card$cardCommonAttr,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Border$width(1),
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
						mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink)
					])),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$padding(10),
							mdgriffith$stylish_elephants$Element$Border$widthEach(
							{cA: 1, df: 0, dU: 0, er: 0}),
							mdgriffith$stylish_elephants$Element$Border$color(
							author$project$Color$toElementColor(author$project$Framework$Color$grey_light)),
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill)
						]),
					A2(
						mdgriffith$stylish_elephants$Element$row,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$spacing(10)
							]),
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[mdgriffith$stylish_elephants$Element$Font$bold]),
								mdgriffith$stylish_elephants$Element$text(title)),
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Font$color(
										author$project$Color$toElementColor(author$project$Framework$Color$grey))
									]),
								mdgriffith$stylish_elephants$Element$text(subTitle))
							]))),
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$padding(20),
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill)
						]),
					content)
				]));
	});
var author$project$Framework$Card$introspection = {
	ai: 'Wrapper for content',
	r: 'Cards',
	aw: '',
	ae: _List_fromArray(
		[
			_Utils_Tuple2(
			'Flipping',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: Cards.example1'),
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
						mdgriffith$stylish_elephants$Element$text('Content')),
					'simpleWithTitle "Simple" "with Title" <|\ntext "Content\"')
				])),
			_Utils_Tuple2(
			'Simple',
			_List_fromArray(
				[
					_Utils_Tuple2(
					author$project$Framework$Card$simple(
						mdgriffith$stylish_elephants$Element$text('Content')),
					'simple <| text "Content\"')
				]))
		])
};
var author$project$Framework$Color$background = author$project$Framework$Configuration$conf.j.ck;
var author$project$Framework$Color$black = author$project$Framework$Configuration$conf.j.co;
var author$project$Framework$Color$black_bis = author$project$Framework$Configuration$conf.j.cp;
var author$project$Framework$Color$black_ter = author$project$Framework$Configuration$conf.j.cq;
var author$project$Framework$Color$blue = author$project$Framework$Configuration$conf.j.y;
var author$project$Framework$Color$border = author$project$Framework$Configuration$conf.j.cu;
var author$project$Framework$Color$border_hover = author$project$Framework$Configuration$conf.j.cz;
var author$project$Framework$Color$code = author$project$Framework$Configuration$conf.j.cJ;
var author$project$Framework$Color$code_background = author$project$Framework$Configuration$conf.j.cK;
var author$project$Framework$Color$cyan = author$project$Framework$Configuration$conf.j.cP;
var author$project$Framework$Color$dark = author$project$Framework$Configuration$conf.j.cR;
var author$project$Framework$Color$green = author$project$Framework$Configuration$conf.j.A;
var author$project$Framework$Color$grey_darker = author$project$Framework$Configuration$conf.j.c0;
var author$project$Framework$Color$light = author$project$Framework$Configuration$conf.j.dg;
var author$project$Framework$Color$link = author$project$Framework$Configuration$conf.j.dh;
var author$project$Framework$Color$link_active = author$project$Framework$Configuration$conf.j.di;
var author$project$Framework$Color$link_active_border = author$project$Framework$Configuration$conf.j.dj;
var author$project$Framework$Color$link_focus = author$project$Framework$Configuration$conf.j.dk;
var author$project$Framework$Color$link_focus_border = author$project$Framework$Configuration$conf.j.dl;
var author$project$Framework$Color$link_hover = author$project$Framework$Configuration$conf.j.dm;
var author$project$Framework$Color$link_hover_border = author$project$Framework$Configuration$conf.j.dn;
var author$project$Framework$Color$link_invert = author$project$Framework$Configuration$conf.j.$7;
var author$project$Framework$Color$link_visited = author$project$Framework$Configuration$conf.j.dp;
var author$project$Framework$Color$orange = author$project$Framework$Configuration$conf.j.dD;
var author$project$Framework$Color$pre = author$project$Framework$Configuration$conf.j.dP;
var author$project$Framework$Color$pre_background = author$project$Framework$Configuration$conf.j.dQ;
var author$project$Framework$Color$purple = author$project$Framework$Configuration$conf.j.dS;
var author$project$Framework$Color$red = author$project$Framework$Configuration$conf.j.D;
var author$project$Framework$Color$text = author$project$Framework$Configuration$conf.j.eb;
var author$project$Framework$Color$text_light = author$project$Framework$Configuration$conf.j.ep;
var author$project$Framework$Color$text_strong = author$project$Framework$Configuration$conf.j.eq;
var author$project$Framework$Color$turquoise = author$project$Framework$Configuration$conf.j.ew;
var author$project$Color$intensity = function (c) {
	var c2 = author$project$Color$toRgb(c);
	return ((c2.D * 0.299) + (c2.A * 0.587)) + (c2.y * 0.114);
};
var author$project$Color$maximumContrast = F3(
	function (c, dark, bright) {
		return (author$project$Color$intensity(c) < 186) ? bright : dark;
	});
var author$project$Framework$Color$usageWrapper = function (cl) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Background$color(
				author$project$Color$toElementColor(cl)),
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$px(200)),
				mdgriffith$stylish_elephants$Element$padding(10),
				mdgriffith$stylish_elephants$Element$Border$rounded(5),
				mdgriffith$stylish_elephants$Element$Font$color(
				author$project$Color$toElementColor(
					A3(
						author$project$Color$maximumContrast,
						cl,
						A3(author$project$Color$rgb, 0, 0, 0),
						A3(author$project$Color$rgb, 255, 255, 255))))
			]),
		A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_Nil,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$text(
					author$project$Color$colorToHex(cl))
				])));
};
var author$project$Framework$Color$white_bis = author$project$Framework$Configuration$conf.j.eD;
var author$project$Framework$Color$white_ter = author$project$Framework$Configuration$conf.j.eE;
var author$project$Framework$Color$yellow = author$project$Framework$Configuration$conf.j.eK;
var author$project$Framework$Color$introspection = {
	ai: '',
	r: 'Colors',
	aw: 'Color.Color',
	ae: _List_fromArray(
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
	ai: 'List of elements for Web Forms',
	r: 'Fields',
	aw: '',
	ae: _List_fromArray(
		[
			_Utils_Tuple2(
			'Email',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: Form.example1'),
					'')
				]))
		])
};
var author$project$Framework$FormFieldWithPattern$introspection = {
	ai: 'List of elements for Web Forms',
	r: 'Fields With Patterns',
	aw: '',
	ae: _List_fromArray(
		[
			_Utils_Tuple2(
			'Phone number USA',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: FormFieldWithPattern.example1'),
					'')
				])),
			_Utils_Tuple2(
			'Credit Card number',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: FormFieldWithPattern.example2'),
					'')
				])),
			_Utils_Tuple2(
			'4 Digit Code',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: FormFieldWithPattern.example3'),
					'')
				]))
		])
};
var author$project$Framework$Icon$arrows = F2(
	function (_n0, size) {
		return mdgriffith$stylish_elephants$Element$html(
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
		return mdgriffith$stylish_elephants$Element$html(
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
		return mdgriffith$stylish_elephants$Element$html(
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
		return mdgriffith$stylish_elephants$Element$html(
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
		return mdgriffith$stylish_elephants$Element$html(
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
								author$project$Color$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M506 241l-89-89-14-13-258 258a227 227 0 0 0 272-37l89-89c8-8 8-22 0-30zM256 363a21 21 0 0 1 0-43c35 0 64-29 64-64a21 21 0 0 1 43 0c0 59-48 107-107 107zM95 152L6 241c-8 8-8 22 0 30l89 89 14 13 258-258c-86-49-198-37-272 37zm161 40c-35 0-64 29-64 64a21 21 0 0 1-43 0c0-59 48-107 107-107a21 21 0 0 1 0 43z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$home = F2(
	function (_n0, size) {
		return mdgriffith$stylish_elephants$Element$html(
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
		return mdgriffith$stylish_elephants$Element$html(
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
								author$project$Color$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M20 49a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM17 5h4a1 1 0 1 0 0-2h-4a1 1 0 1 0 0 2zm7 0h1a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2z')
							]),
						_List_Nil),
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(
								author$project$Color$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M56 12H38V4c0-2-2-4-4-4H8C6 0 4 2 4 4v52c0 2 2 4 4 4h26c2 0 4-2 4-4V33h18V12zM8 2h26l2 2v2H6V4l2-2zm26 56H8l-2-2v-8h30v8l-2 2zm2-12H6V8h30v4H18v21h4v7l9-7h5v13zm18-15H31l-7 5v-5h-4V14h34v17z')
							]),
						_List_Nil),
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(
								author$project$Color$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M25 21h10a1 1 0 1 0 0-2H25a1 1 0 1 0 0 2zm-1 4l1 1h24a1 1 0 1 0 0-2H25l-1 1z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$mobileNotification2 = F2(
	function (cl, size) {
		return mdgriffith$stylish_elephants$Element$html(
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
								author$project$Color$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M21.5 25.67H7V3.89h14.5v4.7h1.73V2.3a2.3 2.3 0 0 0-2.3-2.3H7.58a2.3 2.3 0 0 0-2.3 2.3v27.08a2.3 2.3 0 0 0 2.3 2.3h13.33a2.3 2.3 0 0 0 2.3-2.3V19.2H21.5v6.46zM19.4 1.44c.33 0 .59.27.59.6s-.26.58-.59.58-.59-.26-.59-.59.26-.59.59-.59zm-8.24.23h6.19v.67h-6.19v-.67zm5.91 27.55h-5.63V27.5h5.63v1.73z')
							]),
						_List_Nil),
						A2(
						elm$svg$Svg$path,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill(
								author$project$Color$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M13.05 9.3v9h1.56L13.05 22l4.54-3.7h8.81v-9H13.05zm12.21 7.86H17.2l-.32.25-1 .81.45-1.06H14.2v-6.71h11.07v6.7z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$mobileRinging = F2(
	function (cl, size) {
		var hexColor = author$project$Color$colorToHex(cl);
		return mdgriffith$stylish_elephants$Element$html(
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
		return mdgriffith$stylish_elephants$Element$html(
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
		return mdgriffith$stylish_elephants$Element$html(
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
								author$project$Color$colorToHex(cl)),
								elm$svg$Svg$Attributes$d('M256 192a64 64 0 1 0 0 128 64 64 0 0 0 0-128zm250 49l-89-89c-89-89-233-89-322 0L6 241c-8 8-8 22 0 30l89 89a227 227 0 0 0 322 0l89-89c8-8 8-22 0-30zM256 363a107 107 0 1 1 0-214 107 107 0 0 1 0 214z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$introspection = {
	ai: 'List of SVG icons',
	r: 'Icons',
	aw: 'Color.Color -> Int -> Element.Element msg',
	ae: _List_fromArray(
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
var author$project$Framework$Logo$Black = 5;
var author$project$Framework$Logo$ElmColorful = {$: 1};
var author$project$Framework$Logo$LogoLucamug = {$: 1};
var author$project$Framework$Logo$introspection = {
	ai: 'List of SVG logos',
	r: 'Logos',
	aw: '',
	ae: _List_fromArray(
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
							author$project$Framework$Logo$ElmColor(0)),
						100),
					'logo (LogoElm <| (ElmColor Orange) 100'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(
							author$project$Framework$Logo$ElmColor(1)),
						100),
					'logo (LogoElm <| (ElmColor Green) 100'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(
							author$project$Framework$Logo$ElmColor(2)),
						100),
					'logo (LogoElm <| (ElmColor LightBlue) 100'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(
							author$project$Framework$Logo$ElmColor(3)),
						100),
					'logo (LogoElm <| (ElmColor Blue) 100'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(
							author$project$Framework$Logo$ElmColor(4)),
						100),
					'logo (LogoElm <| (ElmColor White) 100'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Logo$logo,
						author$project$Framework$Logo$LogoElm(
							author$project$Framework$Logo$ElmColor(5)),
						100),
					'logo (LogoElm <| (ElmColor Black) 100'),
					_Utils_Tuple2(
					A2(author$project$Framework$Logo$logo, author$project$Framework$Logo$LogoLucamug, 100),
					'logo Lucamug 100')
				]))
		])
};
var author$project$Framework$Spinner$introspection = {
	ai: 'List of SVG spinners',
	r: 'Spinners',
	aw: '',
	ae: _List_fromArray(
		[
			_Utils_Tuple2(
			'Spinners',
			_List_fromArray(
				[
					_Utils_Tuple2(
					A3(author$project$Framework$Spinner$spinner, 0, 32, author$project$Color$black),
					'spinner ThreeCircles 32 Color.black'),
					_Utils_Tuple2(
					A3(author$project$Framework$Spinner$spinner, 1, 32, author$project$Color$black),
					'spinner Rotation 32 Color.black')
				]))
		])
};
var mdgriffith$stylish_elephants$Element$decorativeImage = F2(
	function (attrs, _n0) {
		var src = _n0.d4;
		var imageAttributes = A2(
			elm$core$List$filter,
			function (a) {
				switch (a.$) {
					case 7:
						return true;
					case 8:
						return true;
					default:
						return false;
				}
			},
			attrs);
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(elm$core$List$cons, mdgriffith$stylish_elephants$Element$clip, attrs),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A5(
						mdgriffith$stylish_elephants$Internal$Model$element,
						mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
						mdgriffith$stylish_elephants$Internal$Model$asEl,
						elm$core$Maybe$Just('img'),
						_Utils_ap(
							imageAttributes,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Internal$Model$Attr(
									elm$html$Html$Attributes$src(src)),
									mdgriffith$stylish_elephants$Internal$Model$Attr(
									elm$html$Html$Attributes$alt(''))
								])),
						mdgriffith$stylish_elephants$Internal$Model$Unkeyed(_List_Nil))
					])));
	});
var elm$html$Html$Attributes$download = function (fileName) {
	return A2(elm$html$Html$Attributes$stringProperty, 'download', fileName);
};
var mdgriffith$stylish_elephants$Element$download = F2(
	function (attrs, _n0) {
		var url = _n0.n;
		var label = _n0.aP;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Just('a'),
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$Attr(
					elm$html$Html$Attributes$href(url)),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm$html$Html$Attributes$download('')),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ah),
								A2(
									elm$core$List$cons,
									mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.X),
									attrs)))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var mdgriffith$stylish_elephants$Element$downloadAs = F2(
	function (attrs, _n0) {
		var url = _n0.n;
		var filename = _n0.cT;
		var label = _n0.aP;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Just('a'),
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$Attr(
					elm$html$Html$Attributes$href(url)),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm$html$Html$Attributes$download(filename)),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ah),
								A2(
									elm$core$List$cons,
									mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.X),
									attrs)))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var elm$html$Html$Attributes$target = elm$html$Html$Attributes$stringProperty('target');
var mdgriffith$stylish_elephants$Element$newTabLink = F2(
	function (attrs, _n0) {
		var url = _n0.n;
		var label = _n0.aP;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Just('a'),
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$Attr(
					elm$html$Html$Attributes$href(url)),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Internal$Model$Attr(
							elm$html$Html$Attributes$target('_blank')),
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
								A2(
									elm$core$List$cons,
									mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.ah),
									A2(
										elm$core$List$cons,
										mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.X),
										attrs))))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var author$project$Framework$StyleElements$introspection = {
	ai: 'This is a raw list of all elements of style-elements as they are',
	r: 'Style-Elements',
	aw: '',
	ae: _List_fromArray(
		[
			_Utils_Tuple2(
			'Basic Elements',
			_List_fromArray(
				[
					_Utils_Tuple2(mdgriffith$stylish_elephants$Element$none, 'none'),
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('text'),
					'text "text\"'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$el,
						_List_Nil,
						mdgriffith$stylish_elephants$Element$text('el')),
					'el [] <| text "el\"')
				])),
			_Utils_Tuple2(
			'Rows and Columns',
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$row,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$spacing(20)
							]),
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$text('item 1'),
								mdgriffith$stylish_elephants$Element$text('item 2')
							])),
					'row [ spacing 20 ] [ text "item 1", text "item 2" ]'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$column,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$spacing(20)
							]),
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$text('item 1'),
								mdgriffith$stylish_elephants$Element$text('item 2')
							])),
					'column [ spacing 20 ] [ text "item 1", text "item 2" ]')
				])),
			_Utils_Tuple2(
			'Links and Images',
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$link,
						_List_Nil,
						{
							aP: mdgriffith$stylish_elephants$Element$text('link'),
							n: 'http://example.com'
						}),
					'link [] { url = "http://example.com", label = text "label" }'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$newTabLink,
						_List_Nil,
						{
							aP: mdgriffith$stylish_elephants$Element$text('newTabLink'),
							n: 'http://example.com'
						}),
					'newTabLink [] { url = "http://example.com", label = text "newTabLink" }'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$download,
						_List_Nil,
						{
							aP: mdgriffith$stylish_elephants$Element$text('download'),
							n: 'http://example.com'
						}),
					'download [] { url = "http://example.com", label = text "download" }'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$downloadAs,
						_List_Nil,
						{
							cT: 'filename',
							aP: mdgriffith$stylish_elephants$Element$text('downloadAs'),
							n: 'http://example.com'
						}),
					'downloadAs [] { url = "http://example.com", label = text "downloadAs", filename = "filename" }'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$image,
						_List_Nil,
						{ai: 'description', d4: 'http://via.placeholder.com/200x100/ff3399/000'}),
					'image [] { src = "http://via.placeholder.com/200x100/ff3399/000", description = "description" }'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$decorativeImage,
						_List_Nil,
						{d4: 'http://via.placeholder.com/200x100/ff3399/000'}),
					'decorativeImage [] { src = "http://via.placeholder.com/200x100/ff3399/000" }')
				]))
		])
};
var author$project$Framework$StyleElementsInput$introspection = {
	ai: 'This is a raw list of all elements of style-elements as they are',
	r: 'Style-Elements Input',
	aw: '',
	ae: _List_fromArray(
		[
			_Utils_Tuple2(
			'Button',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example0'),
					'')
				])),
			_Utils_Tuple2(
			'Checkbox',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example2'),
					'')
				])),
			_Utils_Tuple2(
			'Radio',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example3'),
					'')
				])),
			_Utils_Tuple2(
			'Radio Row',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example4'),
					'')
				])),
			_Utils_Tuple2(
			'Text',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example1'),
					'')
				])),
			_Utils_Tuple2(
			'Username',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example5'),
					'')
				])),
			_Utils_Tuple2(
			'New Password',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example6'),
					'')
				])),
			_Utils_Tuple2(
			'Current Password',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example7'),
					'')
				])),
			_Utils_Tuple2(
			'Email',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example8'),
					'')
				])),
			_Utils_Tuple2(
			'Search',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example9'),
					'')
				])),
			_Utils_Tuple2(
			'Multiline',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example10'),
					'')
				])),
			_Utils_Tuple2(
			'Multiline with spellcheck',
			_List_fromArray(
				[
					_Utils_Tuple2(
					mdgriffith$stylish_elephants$Element$text('special: example11'),
					'')
				]))
		])
};
var author$project$Framework$Typography$SizeH1 = 0;
var author$project$Framework$Typography$fontSize = function (level) {
	switch (level) {
		case 0:
			return 32;
		case 1:
			return 28;
		case 2:
			return 24;
		case 3:
			return 20;
		case 4:
			return 16;
		case 5:
			return 14;
		case 6:
			return 24;
		case 7:
			return 14;
		default:
			return 12;
	}
};
var author$project$Framework$Typography$headingLevel = function (level) {
	switch (level) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		default:
			return 5;
	}
};
var mdgriffith$stylish_elephants$Internal$Model$Left = 0;
var mdgriffith$stylish_elephants$Element$alignLeft = mdgriffith$stylish_elephants$Internal$Model$AlignX(0);
var mdgriffith$stylish_elephants$Element$paddingEach = function (_n0) {
	var top = _n0.er;
	var right = _n0.dU;
	var bottom = _n0.cA;
	var left = _n0.df;
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$padding,
		A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, top, right, bottom, left));
};
var mdgriffith$stylish_elephants$Internal$Model$Heading = function (a) {
	return {$: 4, a: a};
};
var mdgriffith$stylish_elephants$Element$Region$heading = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Describe(
		mdgriffith$stylish_elephants$Internal$Model$Heading($));
};
var author$project$Framework$Typography$heading = F3(
	function (level, attributes, child) {
		return A2(
			mdgriffith$stylish_elephants$Element$el,
			_Utils_ap(
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Region$heading(
						author$project$Framework$Typography$headingLevel(level)),
						mdgriffith$stylish_elephants$Element$Font$size(
						author$project$Framework$Typography$fontSize(level)),
						mdgriffith$stylish_elephants$Element$paddingEach(
						{cA: 0, df: 0, dU: 0, er: 0}),
						mdgriffith$stylish_elephants$Element$alignLeft,
						mdgriffith$stylish_elephants$Element$Font$bold
					]),
				attributes),
			child);
	});
var author$project$Framework$Typography$h1 = F2(
	function (listAttr, element) {
		return A3(author$project$Framework$Typography$heading, 0, listAttr, element);
	});
var author$project$Framework$Typography$SizeH2 = 1;
var author$project$Framework$Typography$h2 = author$project$Framework$Typography$heading(1);
var author$project$Framework$Typography$SizeH3 = 2;
var author$project$Framework$Typography$h3 = author$project$Framework$Typography$heading(2);
var author$project$Framework$Typography$SizeH4 = 3;
var author$project$Framework$Typography$h4 = author$project$Framework$Typography$heading(3);
var author$project$Framework$Typography$SizeH5 = 4;
var author$project$Framework$Typography$h5 = author$project$Framework$Typography$heading(4);
var author$project$Framework$Typography$SizeH6 = 5;
var author$project$Framework$Typography$h6 = author$project$Framework$Typography$heading(5);
var author$project$Framework$Typography$SizeExtraSmall = 8;
var author$project$Framework$Typography$textSection = F3(
	function (level, attributes, child) {
		return A2(
			mdgriffith$stylish_elephants$Element$el,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$Font$size(
					author$project$Framework$Typography$fontSize(level)),
				attributes),
			child);
	});
var author$project$Framework$Typography$textExtraSmall = author$project$Framework$Typography$textSection(8);
var author$project$Framework$Typography$SizeLead = 6;
var author$project$Framework$Typography$textLead = author$project$Framework$Typography$textSection(6);
var author$project$Framework$Typography$SizeSmall = 7;
var author$project$Framework$Typography$textSmall = author$project$Framework$Typography$textSection(7);
var author$project$Framework$Typography$introspection = {
	ai: '',
	r: 'Typography',
	aw: 'List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg',
	ae: _List_fromArray(
		[
			_Utils_Tuple2(
			'Heading',
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h1,
						_List_Nil,
						mdgriffith$stylish_elephants$Element$text('h1. Heading')),
					'h1 [] <| text "h1. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h2,
						_List_Nil,
						mdgriffith$stylish_elephants$Element$text('h2. Heading')),
					'h2 [] <| text "h2. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h3,
						_List_Nil,
						mdgriffith$stylish_elephants$Element$text('h3. Heading')),
					'h3 [] <| text "h3. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h4,
						_List_Nil,
						mdgriffith$stylish_elephants$Element$text('h4. Heading')),
					'h4 [] <| text "h4. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h5,
						_List_Nil,
						mdgriffith$stylish_elephants$Element$text('h5. Heading')),
					'h5 [] <| text "h5. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$h6,
						_List_Nil,
						mdgriffith$stylish_elephants$Element$text('h6. Heading')),
					'h6 [] <| text "h6. Heading\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$textLead,
						_List_Nil,
						mdgriffith$stylish_elephants$Element$text('textLead')),
					'textLead [] <| text "textLead\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$textSmall,
						_List_Nil,
						mdgriffith$stylish_elephants$Element$text('textSmall')),
					'textSmall [] <| text "textSmall\"'),
					_Utils_Tuple2(
					A2(
						author$project$Framework$Typography$textExtraSmall,
						_List_Nil,
						mdgriffith$stylish_elephants$Element$text('textExtraSmall')),
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
		ai: 'Description ' + id,
		r: 'Element ' + id,
		aw: 'Signature ' + id,
		ae: _List_fromArray(
			[
				_Utils_Tuple2(
				'Element ' + (id + ' - Example A'),
				_List_fromArray(
					[
						_Utils_Tuple2(
						mdgriffith$stylish_elephants$Element$text('Element ' + (id + ' - Example A - Case 1')),
						'source A1'),
						_Utils_Tuple2(
						mdgriffith$stylish_elephants$Element$text('Element ' + (id + ' - Example A - Case 2')),
						'source A2')
					])),
				_Utils_Tuple2(
				'Element ' + (id + ' - Example B'),
				_List_fromArray(
					[
						_Utils_Tuple2(
						mdgriffith$stylish_elephants$Element$text('Element ' + (id + ' - Example B - Case 1')),
						'source B1'),
						_Utils_Tuple2(
						mdgriffith$stylish_elephants$Element$text('Element ' + (id + ' - Example B - Case 2')),
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
var author$project$Framework$FormField$initModel = {aj: elm$core$Maybe$Nothing, a2: ''};
var author$project$Framework$FormFieldWithPattern$initModel = {aj: elm$core$Maybe$Nothing, bn: ''};
var author$project$Framework$StyleElementsInput$initModel = {
	aH: false,
	au: elm$core$Maybe$Just('A'),
	eb: ''
};
var author$project$Framework$initModel = F2(
	function (value, url) {
		var flag = author$project$Framework$decodeFlagFromJson(value);
		return {
			c: author$project$Framework$initConf,
			q: author$project$Framework$debug ? author$project$Framework$introspections : author$project$Framework$introspectionsForDebugging,
			aS: flag,
			ao: author$project$Framework$Card$initModel,
			ap: author$project$Framework$FormField$initModel,
			aq: author$project$Framework$FormFieldWithPattern$initModel,
			ar: author$project$Framework$StyleElementsInput$initModel,
			at: '',
			n: url
		};
	});
var author$project$Framework$init = function (_n0) {
	var url = _n0.n;
	var flags = _n0.cU;
	return _Utils_Tuple2(
		A2(author$project$Framework$initModel, flags, url),
		author$project$Framework$initCmd);
};
var author$project$Framework$MsgChangeUrl = function (a) {
	return {$: 8, a: a};
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
			case 0:
				var field = msg.a;
				var value = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a2: value}),
					elm$core$Platform$Cmd$none);
			case 1:
				var field = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aj: elm$core$Maybe$Just(field)
						}),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aj: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
		}
	});
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {da: index, dq: match, dv: number, d8: submatches};
	});
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$fromString = function (string) {
	return A2(
		elm$regex$Regex$fromStringWith,
		{bv: false, bL: false},
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
			if (maybeToken.$ === 1) {
				return formatted;
			} else {
				var token = maybeToken.a;
				if (!token.$) {
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
var author$project$Framework$FormFieldWithPattern$InputValue = {$: 0};
var author$project$Framework$FormFieldWithPattern$Other = function (a) {
	return {$: 1, a: a};
};
var elm$core$Basics$or = _Basics_or;
var author$project$Framework$FormFieldWithPattern$tokenize = F2(
	function (inputChar, pattern) {
		return (_Utils_eq(pattern, inputChar) || (pattern === '_')) ? author$project$Framework$FormFieldWithPattern$InputValue : author$project$Framework$FormFieldWithPattern$Other(pattern);
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
			A2(author$project$Framework$FormFieldWithPattern$parse, '0', template),
			string);
	});
var elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var author$project$Framework$FormFieldWithPattern$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
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
						switch (field) {
							case 0:
								return _Utils_update(
									model,
									{bn: removeCharactedAtTheEndIfNotNumbers});
							case 1:
								return _Utils_update(
									model,
									{bn: removeCharactedAtTheEndIfNotNumbers});
							default:
								return _Utils_update(
									model,
									{bn: removeCharactedAtTheEndIfNotNumbers});
						}
					}(),
					elm$core$Platform$Cmd$none);
			case 1:
				var field = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aj: elm$core$Maybe$Just(field)
						}),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aj: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Framework$StyleElementsInput$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							au: elm$core$Maybe$Just(value)
						}),
					elm$core$Platform$Cmd$none);
			case 1:
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 2:
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{eb: value}),
					elm$core$Platform$Cmd$none);
			default:
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aH: value}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Framework$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 8:
				var url = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{n: url}),
					elm$core$Platform$Cmd$none);
			case 9:
				var password = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{at: password}),
					elm$core$Platform$Cmd$none);
			case 1:
				var intros = A2(
					elm$core$List$map,
					function (_n1) {
						var data = _n1.a;
						return _Utils_Tuple2(data, true);
					},
					model.q);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{q: intros}),
					elm$core$Platform$Cmd$none);
			case 2:
				var intros = A2(
					elm$core$List$map,
					function (_n2) {
						var data = _n2.a;
						return _Utils_Tuple2(data, false);
					},
					model.q);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{q: intros}),
					elm$core$Platform$Cmd$none);
			case 0:
				var dataName = msg.a;
				var toggle = function (_n3) {
					var data = _n3.a;
					var show = _n3.b;
					return _Utils_eq(data.r, dataName) ? _Utils_Tuple2(data, !show) : _Utils_Tuple2(data, show);
				};
				var intros = A2(elm$core$List$map, toggle, model.q);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{q: intros}),
					elm$core$Platform$Cmd$none);
			case 3:
				var windowSize = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aS: elm$core$Maybe$Just(windowSize)
						}),
					elm$core$Platform$Cmd$none);
			case 4:
				var msg2 = msg.a;
				var _n4 = A2(author$project$Framework$StyleElementsInput$update, msg2, model.ar);
				var newModel = _n4.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ar: newModel}),
					elm$core$Platform$Cmd$none);
			case 5:
				var msg2 = msg.a;
				var _n5 = A2(author$project$Framework$FormField$update, msg2, model.ap);
				var newModel = _n5.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ap: newModel}),
					elm$core$Platform$Cmd$none);
			case 6:
				var msg2 = msg.a;
				var _n6 = A2(author$project$Framework$FormFieldWithPattern$update, msg2, model.aq);
				var newModel = _n6.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aq: newModel}),
					elm$core$Platform$Cmd$none);
			default:
				var msg2 = msg.a;
				var _n7 = A2(author$project$Framework$Card$update, msg2, model.ao);
				var newModel = _n7.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ao: newModel}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Color$white = A3(author$project$Color$rgb, 230, 230, 230);
var author$project$Framework$css = '\nbody {\n    line-height: normal !important;\n}\n.elmStyleguideGenerator-open {\ntransition: all .8s;\nttransform: translateY(0);\nmax-height: 500px;\n}\n.elmStyleguideGenerator-close {\ntransition: all .1s;\nttransform: translateY(-100%);\nmax-height: 0;\n}\npre {\n    margin: 0;\n}\n';
var author$project$Framework$emptyIntrospection = {ai: '', r: 'Not found', aw: '', ae: _List_Nil};
var author$project$Framework$emptyVariation = _Utils_Tuple2('Not found', _List_Nil);
var author$project$Framework$slugToString = function (_n0) {
	var slug = _n0;
	return slug;
};
var author$project$Framework$RouteHome = {$: 0};
var author$project$Framework$fragmentAsPath = function (url) {
	var _n0 = url.bC;
	if (_n0.$ === 1) {
		return _Utils_update(
			url,
			{bO: ''});
	} else {
		var fragment = _n0.a;
		return _Utils_update(
			url,
			{bO: fragment});
	}
};
var author$project$Framework$RouteSubPage = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$Framework$rootRoute = 'framework';
var author$project$Framework$Slug = elm$core$Basics$identity;
var elm$url$Url$Parser$Parser = elm$core$Basics$identity;
var elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {P: frag, S: params, N: unvisited, bn: value, V: visited};
	});
var elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return function (_n0) {
			var visited = _n0.V;
			var unvisited = _n0.N;
			var params = _n0.S;
			var frag = _n0.P;
			var value = _n0.bn;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				var _n2 = stringToSomething(next);
				if (!_n2.$) {
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
		};
	});
var author$project$Framework$slugParser = A2(
	elm$url$Url$Parser$custom,
	'SLUG',
	function ($) {
		return elm$core$Maybe$Just($);
	});
var elm$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.V;
		var unvisited = _n0.N;
		var params = _n0.S;
		var frag = _n0.P;
		var value = _n0.bn;
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
		var parseArg = _n0;
		return function (_n1) {
			var visited = _n1.V;
			var unvisited = _n1.N;
			var params = _n1.S;
			var frag = _n1.P;
			var value = _n1.bn;
			return A2(
				elm$core$List$map,
				elm$url$Url$Parser$mapState(value),
				parseArg(
					A5(elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var elm$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			elm$core$List$concatMap,
			function (_n0) {
				var parser = _n0;
				return parser(state);
			},
			parsers);
	};
};
var elm$url$Url$Parser$s = function (str) {
	return function (_n0) {
		var visited = _n0.V;
		var unvisited = _n0.N;
		var params = _n0.S;
		var frag = _n0.P;
		var value = _n0.bn;
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
	};
};
var elm$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0;
		var parseAfter = _n1;
		return function (state) {
			return A2(
				elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
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
			var _n1 = state.N;
			if (!_n1.b) {
				return elm$core$Maybe$Just(state.bn);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm$core$Maybe$Just(state.bn);
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
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
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
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
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
				0,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
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
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
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
				0,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
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
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
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
				A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
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
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
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
				if (_n4.$ === -1) {
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
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
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
						if (_n7.$ === -1) {
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
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === -1) {
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
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (!_n0.$) {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$url$Url$percentDecode = _Url_percentDecode;
var elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
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
			if (_n2.$ === 1) {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm$url$Url$percentDecode(rawValue);
				if (_n3.$ === 1) {
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
	if (maybeQuery.$ === 1) {
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
		var parser = _n0;
		return elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm$url$Url$Parser$State,
					_List_Nil,
					elm$url$Url$Parser$preparePath(url.bO),
					elm$url$Url$Parser$prepareQuery(url.bX),
					url.bC,
					elm$core$Basics$identity)));
	});
var author$project$Framework$urlToRoute = function (url) {
	var maybeRoute = A2(
		elm$url$Url$Parser$parse,
		author$project$Framework$routeParser,
		author$project$Framework$fragmentAsPath(url));
	if (maybeRoute.$ === 1) {
		return author$project$Framework$RouteHome;
	} else {
		var route = maybeRoute.a;
		return route;
	}
};
var author$project$Framework$maybeSelected = function (model) {
	var _n0 = function () {
		var _n1 = author$project$Framework$urlToRoute(model.n);
		if (_n1.$ === 1) {
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
					return _Utils_eq(introspection2.r, slug1);
				},
				model.q)));
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
				introspection.ae)));
	var _n4 = author$project$Framework$urlToRoute(model.n);
	return (_Utils_eq(introspection, author$project$Framework$emptyIntrospection) || _Utils_eq(variation, author$project$Framework$emptyVariation)) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(
		_Utils_Tuple2(introspection, variation));
};
var mdgriffith$stylish_elephants$Element$scrollbarX = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$overflow, mdgriffith$stylish_elephants$Internal$Style$classes.dY);
var mdgriffith$stylish_elephants$Internal$Flag$fontFamily = mdgriffith$stylish_elephants$Internal$Flag$col(5);
var elm$core$String$words = _String_words;
var mdgriffith$stylish_elephants$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 0:
						return 'serif';
					case 1:
						return 'sans-serif';
					case 2:
						return 'monospace';
					case 3:
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
var mdgriffith$stylish_elephants$Element$Font$family = function (families) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$fontFamily,
		A2(
			mdgriffith$stylish_elephants$Internal$Model$FontFamily,
			A3(elm$core$List$foldl, mdgriffith$stylish_elephants$Internal$Model$renderFontClassName, 'ff-', families),
			families));
};
var author$project$Framework$sourceCodeWrapper = F2(
	function (configuration, sourceCode) {
		return A2(
			mdgriffith$stylish_elephants$Element$el,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
					mdgriffith$stylish_elephants$Element$scrollbarX,
					mdgriffith$stylish_elephants$Element$Background$color(
					author$project$Color$toElementColor(configuration.ak)),
					mdgriffith$stylish_elephants$Element$Border$rounded(8)
				]),
			A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$family(
						_List_fromArray(
							[mdgriffith$stylish_elephants$Element$Font$monospace])),
						mdgriffith$stylish_elephants$Element$Font$color(
						author$project$Color$toElementColor(configuration.al)),
						mdgriffith$stylish_elephants$Element$Font$size(16),
						mdgriffith$stylish_elephants$Element$padding(16),
						mdgriffith$stylish_elephants$Element$htmlAttribute(
						A2(elm$html$Html$Attributes$style, 'white-space', 'pre'))
					]),
				mdgriffith$stylish_elephants$Element$text(sourceCode)));
	});
var author$project$Framework$MsgStyleElementsInput = function (a) {
	return {$: 4, a: a};
};
var mdgriffith$stylish_elephants$Element$map = mdgriffith$stylish_elephants$Internal$Model$map;
var author$project$Framework$specialComponent = F2(
	function (model, component) {
		var componentTuplet = component(model.ar);
		return _Utils_Tuple2(
			A2(mdgriffith$stylish_elephants$Element$map, author$project$Framework$MsgStyleElementsInput, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Framework$MsgCards = function (a) {
	return {$: 7, a: a};
};
var author$project$Framework$specialComponentCards = F2(
	function (model, component) {
		var componentTuplet = component(model.ao);
		return _Utils_Tuple2(
			A2(mdgriffith$stylish_elephants$Element$map, author$project$Framework$MsgCards, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Framework$MsgFormField = function (a) {
	return {$: 5, a: a};
};
var author$project$Framework$specialComponentFormField = F2(
	function (model, component) {
		var componentTuplet = component(model.ap);
		return _Utils_Tuple2(
			A2(mdgriffith$stylish_elephants$Element$map, author$project$Framework$MsgFormField, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Framework$MsgFormFieldWithPattern = function (a) {
	return {$: 6, a: a};
};
var author$project$Framework$specialComponentFormFieldWithPattern = F2(
	function (model, component) {
		var componentTuplet = component(model.aq);
		return _Utils_Tuple2(
			A2(mdgriffith$stylish_elephants$Element$map, author$project$Framework$MsgFormFieldWithPattern, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Color$yellow = A4(author$project$Color$hsla, 54, 100, 62, 1);
var author$project$Framework$Card$Flip = 0;
var author$project$Framework$Card$stylexxx = F2(
	function (key, value) {
		return ((key === 'backface-visibility') || ((key === 'perspective') || ((key === 'transition') || ((key === 'transform-style') || (key === 'transform'))))) ? _List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, '-webkit-' + key, value)),
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, '-moz-' + key, value)),
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, '-ms-' + key, value)),
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, '-o-' + key, value)),
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, key, value))
			]) : _List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, key, value))
			]);
	});
var elm$html$Html$node = elm$virtual_dom$VirtualDom$node;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var mdgriffith$stylish_elephants$Internal$Model$Top = 0;
var mdgriffith$stylish_elephants$Element$alignTop = mdgriffith$stylish_elephants$Internal$Model$AlignY(0);
var author$project$Framework$Card$flipping = function (data) {
	var y = mdgriffith$stylish_elephants$Element$px(data.bd);
	var x = mdgriffith$stylish_elephants$Element$px(data.b5);
	var commonAttr = _Utils_ap(
		author$project$Framework$Card$cardCommonAttr,
		_Utils_ap(
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$width(x),
					mdgriffith$stylish_elephants$Element$height(y)
				]),
			_Utils_ap(
				A2(author$project$Framework$Card$stylexxx, 'backface-visibility', 'hidden'),
				A2(author$project$Framework$Card$stylexxx, 'position', 'absolute'))));
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		A2(
			elm$core$List$cons,
			mdgriffith$stylish_elephants$Element$alignTop,
			A2(author$project$Framework$Card$stylexxx, 'perspective', '1500px')),
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$html(
				A3(
					elm$html$Html$node,
					'style',
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('alignbottom, alignright {pointer-events:none}')
						]))),
				A2(
				mdgriffith$stylish_elephants$Element$row,
				_Utils_ap(
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$width(x),
							mdgriffith$stylish_elephants$Element$height(y)
						]),
					_Utils_ap(
						A2(author$project$Framework$Card$stylexxx, 'transition', 'all 0.7s cubic-bezier(0.365, 1.440, 0.430, 0.965)'),
						_Utils_ap(
							A2(author$project$Framework$Card$stylexxx, 'transform-style', 'preserve-3d'),
							data.bp ? A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(0deg)') : A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(180deg)')))),
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Element$el,
						_Utils_ap(
							commonAttr,
							_Utils_ap(
								A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(0deg)'),
								A2(author$project$Framework$Card$stylexxx, 'z-index', '2'))),
						data.bD),
						A2(
						mdgriffith$stylish_elephants$Element$el,
						_Utils_ap(
							commonAttr,
							A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(180deg)')),
						data.bt)
					]))
			]));
};
var author$project$Framework$Card$example1 = function (model) {
	var contentAttr = _List_fromArray(
		[
			mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
			mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
			mdgriffith$stylish_elephants$Element$centerX,
			mdgriffith$stylish_elephants$Element$centerY,
			mdgriffith$stylish_elephants$Element$spacing(50)
		]);
	var commonAttr = _List_fromArray(
		[
			mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
			mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
			mdgriffith$stylish_elephants$Element$pointer,
			mdgriffith$stylish_elephants$Element$Events$onClick(0)
		]);
	return _Utils_Tuple2(
		author$project$Framework$Card$flipping(
			{
				bp: model,
				bt: A2(
					mdgriffith$stylish_elephants$Element$el,
					_Utils_ap(
						commonAttr,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Background$color(
								author$project$Color$toElementColor(author$project$Color$yellow))
							])),
					A2(
						mdgriffith$stylish_elephants$Element$column,
						contentAttr,
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[mdgriffith$stylish_elephants$Element$centerX]),
								mdgriffith$stylish_elephants$Element$text('Click Me')),
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[mdgriffith$stylish_elephants$Element$centerX]),
								mdgriffith$stylish_elephants$Element$text('Back'))
							]))),
				bD: A2(
					mdgriffith$stylish_elephants$Element$el,
					commonAttr,
					A2(
						mdgriffith$stylish_elephants$Element$column,
						contentAttr,
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[mdgriffith$stylish_elephants$Element$centerX]),
								mdgriffith$stylish_elephants$Element$text('Click Me')),
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[mdgriffith$stylish_elephants$Element$centerX]),
								mdgriffith$stylish_elephants$Element$text('Front'))
							]))),
				bd: 300,
				b5: 200
			}),
		'\nflipping\n    { width = 200\n    , height = 300\n    , activeFront = model.flip\n    , front =\n        el commonAttr <|\n            column contentAttr\n                [ el [ centerX ] <| text "Click Me"\n                , el [ centerX ] <| text "Front"\n                ]\n    , back =\n        el (commonAttr ++ [ Background.color Color.yellow ]) <|\n            column contentAttr\n                [ el [ centerX ] <| text "Click Me"\n                , el [ centerX ] <| text "Back"\n                ]\n    }');
};
var author$project$Framework$FormField$FieldEmail = 0;
var author$project$Framework$FormField$Input = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var author$project$Framework$FormField$OnFocus = function (a) {
	return {$: 1, a: a};
};
var author$project$Framework$FormField$OnLoseFocus = function (a) {
	return {$: 2, a: a};
};
var author$project$Framework$FormField$hackInLineStyle = F2(
	function (text1, text2) {
		return mdgriffith$stylish_elephants$Element$htmlAttribute(
			A2(elm$html$Html$Attributes$style, text1, text2));
	});
var author$project$Framework$FormField$hasFocus = F2(
	function (model, field) {
		var _n0 = model.aj;
		if (!_n0.$) {
			var focus = _n0.a;
			return _Utils_eq(focus, field);
		} else {
			return false;
		}
	});
var mdgriffith$stylish_elephants$Internal$Flag$moveY = mdgriffith$stylish_elephants$Internal$Flag$col(26);
var mdgriffith$stylish_elephants$Element$moveDown = function (y) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$moveY,
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Move,
				elm$core$Maybe$Nothing,
				elm$core$Maybe$Just(y),
				elm$core$Maybe$Nothing)));
};
var mdgriffith$stylish_elephants$Internal$Flag$scale = mdgriffith$stylish_elephants$Internal$Flag$col(23);
var mdgriffith$stylish_elephants$Internal$Model$Scale = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Element$scale = function (n) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$scale,
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(mdgriffith$stylish_elephants$Internal$Model$Scale, n, n, 1)));
};
var elm$html$Html$Events$onFocus = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'focus',
		elm$json$Json$Decode$succeed(msg));
};
var mdgriffith$stylish_elephants$Element$Events$onFocus = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm$html$Html$Events$onFocus($));
};
var elm$html$Html$Events$onBlur = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'blur',
		elm$json$Json$Decode$succeed(msg));
};
var mdgriffith$stylish_elephants$Element$Events$onLoseFocus = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm$html$Html$Events$onBlur($));
};
var mdgriffith$stylish_elephants$Element$Input$TextInputNode = function (a) {
	return {$: 0, a: a};
};
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
var mdgriffith$stylish_elephants$Element$Input$Padding = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		var position = label.a;
		var labelAttrs = label.b;
		var labelChild = label.c;
		var labelElement = A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			labelAttrs,
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[labelChild])));
		switch (position) {
			case 0:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asColumn,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			case 1:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asColumn,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[input, labelElement])));
			case 2:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[input, labelElement])));
			case 3:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			case 4:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			default:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
		}
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var mdgriffith$stylish_elephants$Element$Input$autofill = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		A2(elm$html$Html$Attributes$attribute, 'autocomplete', $));
};
var mdgriffith$stylish_elephants$Element$rgb = F3(
	function (r, g, b) {
		return A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, r, g, b, 1);
	});
var mdgriffith$stylish_elephants$Element$Input$charcoal = A3(mdgriffith$stylish_elephants$Element$rgb, 136 / 255, 138 / 255, 133 / 255);
var mdgriffith$stylish_elephants$Element$Input$darkGrey = A3(mdgriffith$stylish_elephants$Element$rgb, 186 / 255, 189 / 255, 182 / 255);
var mdgriffith$stylish_elephants$Element$Input$defaultTextPadding = A2(mdgriffith$stylish_elephants$Element$paddingXY, 12, 12);
var mdgriffith$stylish_elephants$Element$Input$white = A3(mdgriffith$stylish_elephants$Element$rgb, 1, 1, 1);
var mdgriffith$stylish_elephants$Element$Input$defaultTextBoxStyle = _List_fromArray(
	[
		mdgriffith$stylish_elephants$Element$Input$defaultTextPadding,
		mdgriffith$stylish_elephants$Element$Border$rounded(3),
		mdgriffith$stylish_elephants$Element$Border$color(mdgriffith$stylish_elephants$Element$Input$darkGrey),
		mdgriffith$stylish_elephants$Element$Background$color(mdgriffith$stylish_elephants$Element$Input$white),
		mdgriffith$stylish_elephants$Element$Border$width(1),
		mdgriffith$stylish_elephants$Element$spacing(3)
	]);
var elm$html$Html$Attributes$spellcheck = elm$html$Html$Attributes$boolProperty('spellcheck');
var mdgriffith$stylish_elephants$Element$Input$spellcheck = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm$html$Html$Attributes$spellcheck($));
};
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var mdgriffith$stylish_elephants$Element$Input$value = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm$html$Html$Attributes$value($));
};
var mdgriffith$stylish_elephants$Internal$Model$LivePolite = {$: 6};
var mdgriffith$stylish_elephants$Element$Region$announce = mdgriffith$stylish_elephants$Internal$Model$Describe(mdgriffith$stylish_elephants$Internal$Model$LivePolite);
var mdgriffith$stylish_elephants$Internal$Model$filter = function (attrs) {
	return A3(
		elm$core$List$foldr,
		F2(
			function (x, _n0) {
				var found = _n0.a;
				var has = _n0.b;
				switch (x.$) {
					case 0:
						return _Utils_Tuple2(found, has);
					case 3:
						var key = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 1:
						var attr = x.a;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 4:
						var style = x.b;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 7:
						var width = x.a;
						return A2(elm$core$Set$member, 'width', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'width', has));
					case 8:
						var height = x.a;
						return A2(elm$core$Set$member, 'height', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'height', has));
					case 2:
						var description = x.a;
						return A2(elm$core$Set$member, 'described', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'described', has));
					case 9:
						var location = x.a;
						var elem = x.b;
						return _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							has);
					case 6:
						return A2(elm$core$Set$member, 'align-x', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'align-x', has));
					case 5:
						return A2(elm$core$Set$member, 'align-y', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm$core$List$cons, x, found),
							A2(elm$core$Set$insert, 'align-y', has));
					case 11:
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
var mdgriffith$stylish_elephants$Internal$Model$get = F2(
	function (attrs, isAttr) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, found) {
					return isAttr(x) ? A2(elm$core$List$cons, x, found) : found;
				}),
			_List_Nil,
			mdgriffith$stylish_elephants$Internal$Model$filter(attrs));
	});
var mdgriffith$stylish_elephants$Element$Input$textHelper = F3(
	function (textInput, attrs, textOptions) {
		var forNearby = function (attr) {
			if (attr.$ === 9) {
				return true;
			} else {
				return false;
			}
		};
		var behavior = function () {
			var _n25 = textOptions.dx;
			if (_n25.$ === 1) {
				return _List_fromArray(
					[
						mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm$html$Html$Attributes$disabled(true))
					]);
			} else {
				var checkMsg = _n25.a;
				return _List_fromArray(
					[
						mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm$html$Html$Events$onInput(checkMsg))
					]);
			}
		}();
		var attributes = A2(
			elm$core$List$cons,
			mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
			_Utils_ap(mdgriffith$stylish_elephants$Element$Input$defaultTextBoxStyle, attrs));
		var attributesFromChild = A2(
			mdgriffith$stylish_elephants$Internal$Model$get,
			attributes,
			function (attr) {
				_n22$7:
				while (true) {
					switch (attr.$) {
						case 7:
							if (attr.a.$ === 2) {
								return true;
							} else {
								break _n22$7;
							}
						case 8:
							if (attr.a.$ === 2) {
								return true;
							} else {
								break _n22$7;
							}
						case 6:
							return true;
						case 5:
							return true;
						case 4:
							switch (attr.b.$) {
								case 5:
									var _n23 = attr.b;
									return true;
								case 2:
									return true;
								case 1:
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
			mdgriffith$stylish_elephants$Internal$Model$get,
			attributes,
			function (attr) {
				if ((attr.$ === 4) && (attr.b.$ === 6)) {
					var _n21 = attr.b;
					return true;
				} else {
					return false;
				}
			});
		var nearbys = A2(
			mdgriffith$stylish_elephants$Internal$Model$get,
			attributes,
			function (attr) {
				if (attr.$ === 9) {
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
			var _n1 = textInput.w;
			if (!_n1.$) {
				var inputType = _n1.a;
				return _Utils_Tuple3(
					'input',
					_Utils_ap(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Input$value(textOptions.eb),
								mdgriffith$stylish_elephants$Internal$Model$Attr(
								elm$html$Html$Attributes$type_(inputType)),
								mdgriffith$stylish_elephants$Element$Input$spellcheck(textInput.s),
								function () {
								var _n2 = textInput.o;
								if (_n2.$ === 1) {
									return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
								} else {
									var fill = _n2.a;
									return mdgriffith$stylish_elephants$Element$Input$autofill(fill);
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
									case 2:
										return found;
									case 8:
										var val = attr.a;
										var _n5 = found.am;
										if (_n5.$ === 1) {
											if (val.$ === 1) {
												return _Utils_update(
													found,
													{
														t: A2(elm$core$List$cons, attr, found.t),
														am: elm$core$Maybe$Just(val)
													});
											} else {
												return _Utils_update(
													found,
													{
														am: elm$core$Maybe$Just(val)
													});
											}
										} else {
											var i = _n5.a;
											return found;
										}
									case 4:
										switch (attr.b.$) {
											case 6:
												var _n7 = attr.b;
												var t = _n7.a;
												var r = _n7.b;
												var b = _n7.c;
												var l = _n7.d;
												var _n8 = found.aQ;
												if (_n8.$ === 1) {
													return _Utils_update(
														found,
														{
															t: found.t,
															aQ: elm$core$Maybe$Just(
																A4(mdgriffith$stylish_elephants$Element$Input$Padding, t, r, b, l))
														});
												} else {
													return found;
												}
											case 5:
												var _n9 = attr.b;
												var x = _n9.a;
												var y = _n9.b;
												var _n10 = found.aR;
												if (_n10.$ === 1) {
													return _Utils_update(
														found,
														{
															t: A2(elm$core$List$cons, attr, found.t),
															aR: elm$core$Maybe$Just(y)
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
									t: A2(elm$core$List$cons, attr, found.t)
								});
						}),
					{t: _List_Nil, am: elm$core$Maybe$Nothing, aQ: elm$core$Maybe$Nothing, aR: elm$core$Maybe$Nothing},
					attributes);
				var maybePadding = _n3.aQ;
				var heightContent = _n3.am;
				var maybeSpacing = _n3.aR;
				var adjustedAttributes = _n3.t;
				var spacing = A2(elm$core$Maybe$withDefault, 5, maybeSpacing);
				return _Utils_Tuple3(
					'textarea',
					_Utils_ap(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Input$spellcheck(textInput.s),
								A2(
								elm$core$Maybe$withDefault,
								mdgriffith$stylish_elephants$Internal$Model$NoAttribute,
								A2(elm$core$Maybe$map, mdgriffith$stylish_elephants$Element$Input$autofill, textInput.o)),
								function () {
								if (maybePadding.$ === 1) {
									return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
								} else {
									var _n12 = maybePadding.a;
									var t = _n12.a;
									var r = _n12.b;
									var b = _n12.c;
									var l = _n12.d;
									return mdgriffith$stylish_elephants$Element$paddingEach(
										{
											cA: A2(elm$core$Basics$max, 0, b - ((spacing / 2) | 0)),
											df: l,
											dU: r,
											er: A2(elm$core$Basics$max, 0, t - ((spacing / 2) | 0))
										});
								}
							}(),
								function () {
								if (heightContent.$ === 1) {
									return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
								} else {
									if (heightContent.a.$ === 1) {
										var _n14 = heightContent.a;
										var newlineCount = function (x) {
											return (x < 1) ? 1 : x;
										}(
											elm$core$List$length(
												elm$core$String$lines(textOptions.eb)));
										var heightValue = function (count) {
											if (maybePadding.$ === 1) {
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
											mdgriffith$stylish_elephants$Internal$Model$StyleClass,
											mdgriffith$stylish_elephants$Internal$Flag$height,
											A3(
												mdgriffith$stylish_elephants$Internal$Model$Single,
												'textarea-height-' + elm$core$String$fromInt(newlineCount),
												'height',
												heightValue(newlineCount)));
									} else {
										var x = heightContent.a;
										return mdgriffith$stylish_elephants$Internal$Model$Height(x);
									}
								}
							}()
							]),
						adjustedAttributes),
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$unstyled(
							elm$html$Html$text(textOptions.eb))
						]));
			}
		}();
		var inputNode = _n0.a;
		var inputAttrs = _n0.b;
		var inputChildren = _n0.c;
		var inputElement = A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				elm$core$List$concat(
					_List_fromArray(
						[
							nearbys,
							function () {
							var _n17 = textOptions.dO;
							if (_n17.$ === 1) {
								return _List_Nil;
							} else {
								var _n18 = _n17.a;
								var placeholderAttrs = _n18.a;
								var placeholderEl = _n18.b;
								return (elm$core$String$trim(textOptions.eb) !== '') ? _List_Nil : _List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$clip,
										mdgriffith$stylish_elephants$Element$inFront(
										A2(
											mdgriffith$stylish_elephants$Element$el,
											A2(
												elm$core$List$cons,
												mdgriffith$stylish_elephants$Element$Input$defaultTextPadding,
												_Utils_ap(
													noNearbys,
													_Utils_ap(
														_List_fromArray(
															[
																mdgriffith$stylish_elephants$Element$Font$color(mdgriffith$stylish_elephants$Element$Input$charcoal),
																mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.du),
																mdgriffith$stylish_elephants$Element$Border$color(
																A4(mdgriffith$stylish_elephants$Element$rgba, 0, 0, 0, 0)),
																mdgriffith$stylish_elephants$Element$Background$color(
																A4(mdgriffith$stylish_elephants$Element$rgba, 0, 0, 0, 0)),
																mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
																mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill)
															]),
														placeholderAttrs))),
											placeholderEl))
									]);
							}
						}()
						]))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A5(
						mdgriffith$stylish_elephants$Internal$Model$element,
						mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
						mdgriffith$stylish_elephants$Internal$Model$asEl,
						elm$core$Maybe$Just(inputNode),
						elm$core$List$concat(
							_List_fromArray(
								[
									_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Input$focusDefault(attrs)
									]),
									inputAttrs,
									behavior
								])),
						mdgriffith$stylish_elephants$Internal$Model$Unkeyed(inputChildren))
					])));
		return A3(
			mdgriffith$stylish_elephants$Element$Input$applyLabel,
			A2(
				elm$core$List$cons,
				A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$cursor, mdgriffith$stylish_elephants$Internal$Style$classes.cO),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$spacing(5),
					A2(elm$core$List$cons, mdgriffith$stylish_elephants$Element$Region$announce, attributesFromChild))),
			textOptions.aP,
			inputElement);
	});
var mdgriffith$stylish_elephants$Element$Input$email = mdgriffith$stylish_elephants$Element$Input$textHelper(
	{
		o: elm$core$Maybe$Just('email'),
		s: false,
		w: mdgriffith$stylish_elephants$Element$Input$TextInputNode('email')
	});
var mdgriffith$stylish_elephants$Element$Input$Label = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Internal$Model$Above = 0;
var mdgriffith$stylish_elephants$Element$Input$labelAbove = mdgriffith$stylish_elephants$Element$Input$Label(0);
var author$project$Framework$FormField$inputText = F2(
	function (model, _n0) {
		var field = _n0.bB;
		var label = _n0.aP;
		var modelValue = model.a2;
		var labelIsAbove = A2(author$project$Framework$FormField$hasFocus, model, field) || (modelValue !== '');
		return A2(
			mdgriffith$stylish_elephants$Element$Input$email,
			_Utils_ap(
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Events$onFocus(
						author$project$Framework$FormField$OnFocus(field)),
						mdgriffith$stylish_elephants$Element$Events$onLoseFocus(
						author$project$Framework$FormField$OnLoseFocus(field)),
						mdgriffith$stylish_elephants$Element$Background$color(
						author$project$Color$toElementColor(author$project$Framework$Color$transparent)),
						mdgriffith$stylish_elephants$Element$Border$widthEach(
						{cA: 1, df: 0, dU: 0, er: 0}),
						mdgriffith$stylish_elephants$Element$Border$rounded(0),
						A2(mdgriffith$stylish_elephants$Element$paddingXY, 0, 8),
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
						A2(author$project$Framework$FormField$hackInLineStyle, 'transition', 'all 0.15s'),
						A2(author$project$Framework$FormField$hackInLineStyle, 'z-index', '10')
					]),
				A2(author$project$Framework$FormField$hasFocus, model, field) ? _List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Border$color(
						author$project$Color$toElementColor(author$project$Framework$Color$primary))
					]) : _List_Nil),
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_Utils_ap(
						_List_fromArray(
							[
								A2(author$project$Framework$FormField$hackInLineStyle, 'transition', 'all 0.15s'),
								A2(author$project$Framework$FormField$hackInLineStyle, 'z-index', '10'),
								A2(author$project$Framework$FormField$hackInLineStyle, 'pointer-events', 'none')
							]),
						labelIsAbove ? _List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$scale(1),
								mdgriffith$stylish_elephants$Element$moveLeft(0)
							]) : _List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$moveDown(33),
								mdgriffith$stylish_elephants$Element$alpha(0.5)
							])),
					mdgriffith$stylish_elephants$Element$text(label)),
				dx: elm$core$Maybe$Just(
					author$project$Framework$FormField$Input(field)),
				dO: elm$core$Maybe$Nothing,
				eb: modelValue
			});
	});
var author$project$Framework$FormField$example1 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormField$inputText,
			model,
			{bB: 0, aP: 'E-mail address'}),
		'inputText model\n    { field = FieldEmail\n    , label = "E-mail address"\n    }');
};
var author$project$Framework$FormFieldWithPattern$FieldTelephone = 0;
var author$project$Framework$FormFieldWithPattern$Field4DigitCode = 2;
var author$project$Framework$FormFieldWithPattern$Input = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var author$project$Framework$FormFieldWithPattern$OnFocus = function (a) {
	return {$: 1, a: a};
};
var author$project$Framework$FormFieldWithPattern$OnLoseFocus = function (a) {
	return {$: 2, a: a};
};
var author$project$Framework$FormFieldWithPattern$hackInLineStyle = F2(
	function (text1, text2) {
		return mdgriffith$stylish_elephants$Element$htmlAttribute(
			A2(elm$html$Html$Attributes$style, text1, text2));
	});
var author$project$Framework$FormFieldWithPattern$hasFocus = F2(
	function (model, field) {
		var _n0 = model.aj;
		if (!_n0.$) {
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
var mdgriffith$stylish_elephants$Internal$Model$Typeface = function (a) {
	return {$: 3, a: a};
};
var mdgriffith$stylish_elephants$Element$Font$typeface = mdgriffith$stylish_elephants$Internal$Model$Typeface;
var mdgriffith$stylish_elephants$Element$Input$text = mdgriffith$stylish_elephants$Element$Input$textHelper(
	{
		o: elm$core$Maybe$Nothing,
		s: false,
		w: mdgriffith$stylish_elephants$Element$Input$TextInputNode('text')
	});
var author$project$Framework$FormFieldWithPattern$inputText = F2(
	function (model, _n0) {
		var field = _n0.bB;
		var pattern = _n0.aW;
		var label = _n0.aP;
		var modelValue = function () {
			switch (field) {
				case 0:
					return model.bn;
				case 1:
					return model.bn;
				default:
					return model.bn;
			}
		}();
		var lengthDifference = elm$core$String$length(pattern) - elm$core$String$length(modelValue);
		var patternToShow = _Utils_ap(
			modelValue,
			A2(elm$core$String$right, lengthDifference, pattern));
		var largeSize = field === 2;
		var moveDownPlaceHolder = largeSize ? author$project$Framework$Configuration$conf.ds.de : author$project$Framework$Configuration$conf.ds.d1;
		var labelIsAbove = A2(author$project$Framework$FormFieldWithPattern$hasFocus, model, field) || ((modelValue !== '') || largeSize);
		var font = largeSize ? _List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Font$family(
				_List_fromArray(
					[mdgriffith$stylish_elephants$Element$Font$monospace])),
				mdgriffith$stylish_elephants$Element$Font$size(54)
			]) : _List_Nil;
		return A2(
			mdgriffith$stylish_elephants$Element$el,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$inFront(
					A2(
						mdgriffith$stylish_elephants$Element$el,
						_Utils_ap(
							_List_fromArray(
								[
									(A2(author$project$Framework$FormFieldWithPattern$hasFocus, model, field) && largeSize) ? mdgriffith$stylish_elephants$Element$Font$color(
									author$project$Color$toElementColor(author$project$Framework$Color$primary)) : mdgriffith$stylish_elephants$Element$Font$color(
									author$project$Color$toElementColor(author$project$Framework$Color$grey_light)),
									mdgriffith$stylish_elephants$Element$moveDown(moveDownPlaceHolder),
									A2(author$project$Framework$FormFieldWithPattern$hackInLineStyle, 'pointer-events', 'none')
								]),
							font),
						mdgriffith$stylish_elephants$Element$text(
							labelIsAbove ? patternToShow : ''))),
					mdgriffith$stylish_elephants$Element$inFront(
					A2(
						mdgriffith$stylish_elephants$Element$Input$text,
						_Utils_ap(
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$Events$onFocus(
									author$project$Framework$FormFieldWithPattern$OnFocus(field)),
									mdgriffith$stylish_elephants$Element$Events$onLoseFocus(
									author$project$Framework$FormFieldWithPattern$OnLoseFocus(field)),
									mdgriffith$stylish_elephants$Element$Background$color(
									A4(mdgriffith$stylish_elephants$Element$rgba, 0, 0, 0, 0)),
									largeSize ? mdgriffith$stylish_elephants$Element$Border$width(0) : mdgriffith$stylish_elephants$Element$Border$widthEach(
									{cA: 2, df: 0, dU: 0, er: 0}),
									mdgriffith$stylish_elephants$Element$Border$rounded(0),
									A2(mdgriffith$stylish_elephants$Element$paddingXY, 0, 8),
									mdgriffith$stylish_elephants$Element$width(
									mdgriffith$stylish_elephants$Element$px(230)),
									A2(author$project$Framework$FormFieldWithPattern$hackInLineStyle, 'transition', 'all 0.15s')
								]),
							_Utils_ap(
								font,
								A2(author$project$Framework$FormFieldWithPattern$hasFocus, model, field) ? _List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Border$color(
										author$project$Color$toElementColor(author$project$Framework$Color$primary))
									]) : _List_Nil)),
						{
							aP: A2(
								mdgriffith$stylish_elephants$Element$Input$labelAbove,
								_Utils_ap(
									_List_fromArray(
										[
											A2(author$project$Framework$FormFieldWithPattern$hackInLineStyle, 'transition', 'all 0.15s'),
											A2(author$project$Framework$FormFieldWithPattern$hackInLineStyle, 'pointer-events', 'none'),
											mdgriffith$stylish_elephants$Element$Font$family(
											_List_fromArray(
												[
													mdgriffith$stylish_elephants$Element$Font$typeface(author$project$Framework$Configuration$conf.aM.b4),
													author$project$Framework$Configuration$conf.aM.ex
												])),
											mdgriffith$stylish_elephants$Element$Font$size(16)
										]),
									labelIsAbove ? _List_fromArray(
										[
											mdgriffith$stylish_elephants$Element$scale(0.9),
											mdgriffith$stylish_elephants$Element$moveLeft(14)
										]) : _List_fromArray(
										[
											mdgriffith$stylish_elephants$Element$moveDown(33)
										])),
								mdgriffith$stylish_elephants$Element$text(label)),
							dx: elm$core$Maybe$Just(
								A2(author$project$Framework$FormFieldWithPattern$Input, field, pattern)),
							dO: elm$core$Maybe$Nothing,
							eb: modelValue
						}))
				]),
			mdgriffith$stylish_elephants$Element$none);
	});
var author$project$Framework$FormFieldWithPattern$example1 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormFieldWithPattern$inputText,
			model,
			{bB: 0, aP: 'Phone number USA', aW: '(000) 000 - 0000'}),
		'inputText model\n    { field = FieldTelephone\n    , pattern = "(000) 000 - 0000"\n    , label = "Phone number USA"\n    }');
};
var author$project$Framework$FormFieldWithPattern$FieldCreditCard = 1;
var author$project$Framework$FormFieldWithPattern$example2 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormFieldWithPattern$inputText,
			model,
			{bB: 1, aP: 'Credit Card number', aW: '0000 - 0000 - 0000 - 0000'}),
		'inputText model\n    { field = FieldCreditCard\n    , pattern = "0000 - 0000 - 0000 - 0000"\n    , label = "Credit Card number"\n    }');
};
var author$project$Framework$FormFieldWithPattern$example3 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormFieldWithPattern$inputText,
			model,
			{bB: 2, aP: '4 Digits Code', aW: '_ _ _ _'}),
		'inputText model\n    { field = Field4DigitCode\n    , pattern = "_ _ _ _"\n    , label = "4 Digits Code"\n    }');
};
var author$project$Framework$StyleElementsInput$Button = {$: 1};
var author$project$Framework$StyleElementsInput$example0 = function (_n0) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			_List_Nil,
			{
				aP: mdgriffith$stylish_elephants$Element$text('Label'),
				aT: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Button)
			}),
		'Input.button []\n    { label = text "Label"\n    , onPress = Just Button\n    }');
};
var author$project$Framework$StyleElementsInput$Input = function (a) {
	return {$: 2, a: a};
};
var author$project$Framework$StyleElementsInput$example1 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$text,
			_List_Nil,
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dx: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				dO: elm$core$Maybe$Nothing,
				eb: model.eb
			}),
		'Input.text []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    }');
};
var mdgriffith$stylish_elephants$Element$Input$TextArea = {$: 1};
var mdgriffith$stylish_elephants$Element$Input$multiline = F2(
	function (attrs, multi) {
		return A3(
			mdgriffith$stylish_elephants$Element$Input$textHelper,
			{o: elm$core$Maybe$Nothing, s: multi.b0, w: mdgriffith$stylish_elephants$Element$Input$TextArea},
			attrs,
			{aP: multi.aP, dx: multi.dx, dO: multi.dO, eb: multi.eb});
	});
var author$project$Framework$StyleElementsInput$example10 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$multiline,
			_List_Nil,
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dx: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				dO: elm$core$Maybe$Nothing,
				b0: false,
				eb: model.eb
			}),
		'Input.multiline []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , spellcheck = False\n    }');
};
var author$project$Framework$StyleElementsInput$example11 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$multiline,
			_List_Nil,
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dx: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				dO: elm$core$Maybe$Nothing,
				b0: true,
				eb: model.eb
			}),
		'Input.multiline []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , spellcheck = True\n    }');
};
var author$project$Framework$StyleElementsInput$Checkbox = function (a) {
	return {$: 3, a: a};
};
var mdgriffith$stylish_elephants$Element$moveUp = function (y) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$moveY,
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Move,
				elm$core$Maybe$Nothing,
				elm$core$Maybe$Just(-y),
				elm$core$Maybe$Nothing)));
};
var mdgriffith$stylish_elephants$Internal$Flag$rotate = mdgriffith$stylish_elephants$Internal$Flag$col(24);
var mdgriffith$stylish_elephants$Internal$Model$Rotate = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Element$rotate = function (angle) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$rotate,
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A4(mdgriffith$stylish_elephants$Internal$Model$Rotate, 0, 0, 1, angle)));
};
var mdgriffith$stylish_elephants$Element$Input$defaultCheckbox = function (checked) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Internal$Model$htmlClass('focusable'),
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$px(14)),
				mdgriffith$stylish_elephants$Element$height(
				mdgriffith$stylish_elephants$Element$px(14)),
				mdgriffith$stylish_elephants$Element$Font$color(mdgriffith$stylish_elephants$Element$Input$white),
				mdgriffith$stylish_elephants$Element$centerY,
				mdgriffith$stylish_elephants$Element$Font$size(9),
				mdgriffith$stylish_elephants$Element$Font$center,
				mdgriffith$stylish_elephants$Element$Border$rounded(3),
				mdgriffith$stylish_elephants$Element$Border$color(
				checked ? A3(mdgriffith$stylish_elephants$Element$rgb, 59 / 255, 153 / 255, 252 / 255) : A3(mdgriffith$stylish_elephants$Element$rgb, 211 / 255, 211 / 255, 211 / 255)),
				mdgriffith$stylish_elephants$Element$Border$shadow(
				{
					cr: 1,
					j: checked ? A4(mdgriffith$stylish_elephants$Element$rgba, 238 / 255, 238 / 255, 238 / 255, 0) : A3(mdgriffith$stylish_elephants$Element$rgb, 238 / 255, 238 / 255, 238 / 255),
					dw: _Utils_Tuple2(0, 0),
					F: 1
				}),
				mdgriffith$stylish_elephants$Element$Background$color(
				checked ? A3(mdgriffith$stylish_elephants$Element$rgb, 59 / 255, 153 / 255, 252 / 255) : mdgriffith$stylish_elephants$Element$Input$white),
				mdgriffith$stylish_elephants$Element$Border$width(
				checked ? 0 : 1)
			]),
		checked ? A2(
			mdgriffith$stylish_elephants$Element$el,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Border$color(mdgriffith$stylish_elephants$Element$Input$white),
					mdgriffith$stylish_elephants$Element$height(
					mdgriffith$stylish_elephants$Element$px(6)),
					mdgriffith$stylish_elephants$Element$width(
					mdgriffith$stylish_elephants$Element$px(9)),
					mdgriffith$stylish_elephants$Element$rotate(
					elm$core$Basics$degrees(-45)),
					mdgriffith$stylish_elephants$Element$centerX,
					mdgriffith$stylish_elephants$Element$centerY,
					mdgriffith$stylish_elephants$Element$moveUp(1),
					mdgriffith$stylish_elephants$Element$Border$widthEach(
					{cA: 2, df: 2, dU: 0, er: 0})
				]),
			mdgriffith$stylish_elephants$Element$none) : mdgriffith$stylish_elephants$Element$none);
};
var mdgriffith$stylish_elephants$Element$Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _n0 = lookup(code);
		if (_n0.$ === 1) {
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
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		A2(elm$html$Html$Events$on, 'keyup', isKey));
};
var mdgriffith$stylish_elephants$Element$Input$space = ' ';
var mdgriffith$stylish_elephants$Element$Input$tabindex = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm$html$Html$Attributes$tabindex($));
};
var mdgriffith$stylish_elephants$Element$Input$checkbox = F2(
	function (attrs, _n0) {
		var label = _n0.aP;
		var icon = _n0.c7;
		var checked = _n0.cF;
		var onChange = _n0.dx;
		var attributes = A2(
			elm$core$List$cons,
			mdgriffith$stylish_elephants$Element$spacing(6),
			_Utils_ap(
				function () {
					if (onChange.$ === 1) {
						return _List_fromArray(
							[
								mdgriffith$stylish_elephants$Internal$Model$Attr(
								elm$html$Html$Attributes$disabled(true)),
								mdgriffith$stylish_elephants$Element$Region$announce
							]);
					} else {
						var checkMsg = onChange.a;
						return _List_fromArray(
							[
								mdgriffith$stylish_elephants$Internal$Model$Attr(
								elm$html$Html$Events$onClick(
									checkMsg(!checked))),
								mdgriffith$stylish_elephants$Element$Region$announce,
								mdgriffith$stylish_elephants$Element$Input$onKeyLookup(
								function (code) {
									return _Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$enter) ? elm$core$Maybe$Just(
										checkMsg(!checked)) : (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$space) ? elm$core$Maybe$Just(
										checkMsg(!checked)) : elm$core$Maybe$Nothing);
								})
							]);
					}
				}(),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$Input$tabindex(0),
					A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$pointer,
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$alignLeft,
							A2(
								elm$core$List$cons,
								mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
								attrs))))));
		return A3(
			mdgriffith$stylish_elephants$Element$Input$applyLabel,
			attributes,
			label,
			A5(
				mdgriffith$stylish_elephants$Internal$Model$element,
				mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
				mdgriffith$stylish_elephants$Internal$Model$asEl,
				elm$core$Maybe$Nothing,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Internal$Model$Attr(
						A2(elm$html$Html$Attributes$attribute, 'role', 'checkbox')),
						mdgriffith$stylish_elephants$Internal$Model$Attr(
						A2(
							elm$html$Html$Attributes$attribute,
							'aria-checked',
							checked ? 'true' : 'false')),
						mdgriffith$stylish_elephants$Element$centerY,
						mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink)
					]),
				mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
					_List_fromArray(
						[
							function () {
							if (icon.$ === 1) {
								return mdgriffith$stylish_elephants$Element$Input$defaultCheckbox(checked);
							} else {
								var actualIcon = icon.a;
								return actualIcon;
							}
						}()
						]))));
	});
var author$project$Framework$StyleElementsInput$example2 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$checkbox,
			_List_Nil,
			{
				cF: model.aH,
				c7: elm$core$Maybe$Nothing,
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dx: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Checkbox)
			}),
		'Input.checkbox []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Checkbox\n    , checked = model.checkbox\n    , icon = Nothing\n    }');
};
var author$project$Framework$StyleElementsInput$Radio = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$stylish_elephants$Element$Input$Option = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$Input$defaultRadioOption = F2(
	function (optionLabel, status) {
		return A2(
			mdgriffith$stylish_elephants$Element$row,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$spacing(10),
					mdgriffith$stylish_elephants$Element$alignLeft,
					mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink)
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$width(
							mdgriffith$stylish_elephants$Element$px(14)),
							mdgriffith$stylish_elephants$Element$height(
							mdgriffith$stylish_elephants$Element$px(14)),
							mdgriffith$stylish_elephants$Element$Background$color(mdgriffith$stylish_elephants$Element$Input$white),
							mdgriffith$stylish_elephants$Element$Border$rounded(7),
							function () {
							if (status === 2) {
								return mdgriffith$stylish_elephants$Internal$Model$htmlClass('focusable');
							} else {
								return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
							}
						}(),
							mdgriffith$stylish_elephants$Element$Border$width(
							function () {
								switch (status) {
									case 0:
										return 1;
									case 1:
										return 1;
									default:
										return 5;
								}
							}()),
							mdgriffith$stylish_elephants$Element$Border$color(
							function () {
								switch (status) {
									case 0:
										return A3(mdgriffith$stylish_elephants$Element$rgb, 208 / 255, 208 / 255, 208 / 255);
									case 1:
										return A3(mdgriffith$stylish_elephants$Element$rgb, 208 / 255, 208 / 255, 208 / 255);
									default:
										return A3(mdgriffith$stylish_elephants$Element$rgb, 59 / 255, 153 / 255, 252 / 255);
								}
							}())
						]),
					mdgriffith$stylish_elephants$Element$none),
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
							mdgriffith$stylish_elephants$Internal$Model$htmlClass('unfocusable')
						]),
					optionLabel)
				]));
	});
var mdgriffith$stylish_elephants$Element$Input$option = F2(
	function (val, txt) {
		return A2(
			mdgriffith$stylish_elephants$Element$Input$Option,
			val,
			mdgriffith$stylish_elephants$Element$Input$defaultRadioOption(txt));
	});
var mdgriffith$stylish_elephants$Element$Input$Column = 1;
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var mdgriffith$stylish_elephants$Element$Input$AfterFound = 2;
var mdgriffith$stylish_elephants$Element$Input$BeforeFound = 1;
var mdgriffith$stylish_elephants$Element$Input$Idle = 0;
var mdgriffith$stylish_elephants$Element$Input$NotFound = 0;
var mdgriffith$stylish_elephants$Element$Input$Selected = 2;
var mdgriffith$stylish_elephants$Element$Input$column = F2(
	function (attributes, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asColumn,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
				A2(
					elm$core$List$cons,
					mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
					attributes)),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Element$Input$downArrow = 'ArrowDown';
var mdgriffith$stylish_elephants$Element$Input$leftArrow = 'ArrowLeft';
var mdgriffith$stylish_elephants$Element$Input$rightArrow = 'ArrowRight';
var mdgriffith$stylish_elephants$Element$Input$row = F2(
	function (attributes, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asRow,
			elm$core$Maybe$Nothing,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				attributes),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Element$Input$upArrow = 'ArrowUp';
var mdgriffith$stylish_elephants$Internal$Flag$active = mdgriffith$stylish_elephants$Internal$Flag$col(32);
var mdgriffith$stylish_elephants$Internal$Flag$focus = mdgriffith$stylish_elephants$Internal$Flag$col(31);
var mdgriffith$stylish_elephants$Element$Input$radioHelper = F3(
	function (orientation, attrs, input) {
		var track = F2(
			function (opt, _n26) {
				var found = _n26.a;
				var prev = _n26.b;
				var nxt = _n26.c;
				var val = opt.a;
				switch (found) {
					case 0:
						return _Utils_eq(
							elm$core$Maybe$Just(val),
							input.b_) ? _Utils_Tuple3(1, prev, nxt) : _Utils_Tuple3(found, val, nxt);
					case 1:
						return _Utils_Tuple3(2, prev, val);
					default:
						return _Utils_Tuple3(found, prev, nxt);
				}
			});
		var renderOption = function (_n23) {
			var val = _n23.a;
			var view = _n23.b;
			var status = _Utils_eq(
				elm$core$Maybe$Just(val),
				input.b_) ? 2 : 0;
			return A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$pointer,
						function () {
						if (!orientation) {
							return mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink);
						} else {
							return mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill);
						}
					}(),
						function () {
						var _n21 = input.dx;
						if (_n21.$ === 1) {
							return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
						} else {
							var send = _n21.a;
							return mdgriffith$stylish_elephants$Element$Events$onClick(
								send(val));
						}
					}(),
						function () {
						if (status === 2) {
							return mdgriffith$stylish_elephants$Internal$Model$Attr(
								A2(elm$html$Html$Attributes$attribute, 'aria-checked', 'true'));
						} else {
							return mdgriffith$stylish_elephants$Internal$Model$Attr(
								A2(elm$html$Html$Attributes$attribute, 'aria-checked', 'false'));
						}
					}(),
						mdgriffith$stylish_elephants$Internal$Model$Attr(
						A2(elm$html$Html$Attributes$attribute, 'role', 'radio'))
					]),
				view(status));
		};
		var prevNext = function () {
			var _n16 = input.dC;
			if (!_n16.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var _n17 = _n16.a;
				var val = _n17.a;
				return function (_n18) {
					var found = _n18.a;
					var b = _n18.b;
					var a = _n18.c;
					switch (found) {
						case 0:
							return elm$core$Maybe$Just(
								_Utils_Tuple2(b, val));
						case 1:
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
						_Utils_Tuple3(0, val, val),
						input.dC));
			}
		}();
		var optionArea = function () {
			if (!orientation) {
				return A2(
					mdgriffith$stylish_elephants$Element$Input$row,
					attrs,
					A2(elm$core$List$map, renderOption, input.dC));
			} else {
				return A2(
					mdgriffith$stylish_elephants$Element$Input$column,
					attrs,
					A2(elm$core$List$map, renderOption, input.dC));
			}
		}();
		var labelVisible = function () {
			var _n12 = input.aP;
			var labelAttrs = _n12.b;
			return elm$core$List$isEmpty(
				A2(
					mdgriffith$stylish_elephants$Internal$Model$get,
					labelAttrs,
					function (attr) {
						_n13$2:
						while (true) {
							switch (attr.$) {
								case 4:
									if (attr.b.$ === 11) {
										var _n14 = attr.b;
										return true;
									} else {
										break _n13$2;
									}
								case 3:
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
				mdgriffith$stylish_elephants$Internal$Model$get,
				attrs,
				function (attr) {
					_n10$2:
					while (true) {
						switch (attr.$) {
							case 4:
								if (attr.b.$ === 11) {
									var _n11 = attr.b;
									return true;
								} else {
									break _n10$2;
								}
							case 3:
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
						if (attr.$ === 4) {
							var style = attr.b;
							if (style.$ === 10) {
								var pseudo = style.a;
								var styles = style.b;
								var forTransparency = function (psuedoStyle) {
									if (psuedoStyle.$ === 11) {
										return true;
									} else {
										return false;
									}
								};
								var transparent = A2(elm$core$List$filter, forTransparency, styles);
								var flag = function () {
									switch (pseudo) {
										case 1:
											return mdgriffith$stylish_elephants$Internal$Flag$hover;
										case 0:
											return mdgriffith$stylish_elephants$Internal$Flag$focus;
										default:
											return mdgriffith$stylish_elephants$Internal$Flag$active;
									}
								}();
								if (!transparent.b) {
									return elm$core$Maybe$Nothing;
								} else {
									return elm$core$Maybe$Just(
										A2(
											mdgriffith$stylish_elephants$Internal$Model$StyleClass,
											flag,
											A2(mdgriffith$stylish_elephants$Internal$Model$PseudoSelector, pseudo, transparent)));
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
						mdgriffith$stylish_elephants$Internal$Model$StyleClass,
						mdgriffith$stylish_elephants$Internal$Flag$transparency,
						A2(mdgriffith$stylish_elephants$Internal$Model$Transparency, 'transparent', 1.0)),
					pseudos);
			} else {
				return _List_Nil;
			}
		}();
		var events = A2(
			mdgriffith$stylish_elephants$Internal$Model$get,
			attrs,
			function (attr) {
				_n4$3:
				while (true) {
					switch (attr.$) {
						case 7:
							if (attr.a.$ === 2) {
								return true;
							} else {
								break _n4$3;
							}
						case 8:
							if (attr.a.$ === 2) {
								return true;
							} else {
								break _n4$3;
							}
						case 1:
							return true;
						default:
							break _n4$3;
					}
				}
				return false;
			});
		return A3(
			mdgriffith$stylish_elephants$Element$Input$applyLabel,
			function () {
				var _n0 = input.dx;
				if (_n0.$ === 1) {
					return A2(
						elm$core$List$cons,
						mdgriffith$stylish_elephants$Element$alignLeft,
						A2(
							elm$core$List$cons,
							mdgriffith$stylish_elephants$Element$Region$announce,
							_Utils_ap(hideIfEverythingisInvisible, events)));
				} else {
					var onChange = _n0.a;
					return _Utils_ap(
						A2(
							elm$core$List$filterMap,
							elm$core$Basics$identity,
							_List_fromArray(
								[
									elm$core$Maybe$Just(mdgriffith$stylish_elephants$Element$alignLeft),
									elm$core$Maybe$Just(
									mdgriffith$stylish_elephants$Element$Input$tabindex(0)),
									elm$core$Maybe$Just(
									mdgriffith$stylish_elephants$Internal$Model$htmlClass('focus')),
									elm$core$Maybe$Just(mdgriffith$stylish_elephants$Element$Region$announce),
									elm$core$Maybe$Just(
									mdgriffith$stylish_elephants$Internal$Model$Attr(
										A2(elm$html$Html$Attributes$attribute, 'role', 'radiogroup'))),
									function () {
									if (prevNext.$ === 1) {
										return elm$core$Maybe$Nothing;
									} else {
										var _n2 = prevNext.a;
										var prev = _n2.a;
										var next = _n2.b;
										return elm$core$Maybe$Just(
											mdgriffith$stylish_elephants$Element$Input$onKeyLookup(
												function (code) {
													if (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$leftArrow)) {
														return elm$core$Maybe$Just(
															onChange(prev));
													} else {
														if (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$upArrow)) {
															return elm$core$Maybe$Just(
																onChange(prev));
														} else {
															if (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$rightArrow)) {
																return elm$core$Maybe$Just(
																	onChange(next));
															} else {
																if (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$downArrow)) {
																	return elm$core$Maybe$Just(
																		onChange(next));
																} else {
																	if (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$space)) {
																		var _n3 = input.b_;
																		if (_n3.$ === 1) {
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
			input.aP,
			optionArea);
	});
var mdgriffith$stylish_elephants$Element$Input$radio = mdgriffith$stylish_elephants$Element$Input$radioHelper(1);
var author$project$Framework$StyleElementsInput$example3 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$radio,
			_List_Nil,
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dx: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Radio),
				dC: _List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Element$Input$option,
						'A',
						mdgriffith$stylish_elephants$Element$text('Radio A')),
						A2(
						mdgriffith$stylish_elephants$Element$Input$option,
						'B',
						mdgriffith$stylish_elephants$Element$text('Radio B')),
						A2(
						mdgriffith$stylish_elephants$Element$Input$option,
						'C',
						mdgriffith$stylish_elephants$Element$text('Radio C'))
					]),
				b_: model.au
			}),
		'Input.radio []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Radio\n    , selected = model.radio\n    , options =\n        [ Input.option "A" (text "Radio A")\n        , Input.option "B" (text "Radio B")\n        , Input.option "C" (text "Radio C")\n        ]\n    }');
};
var mdgriffith$stylish_elephants$Element$Input$Row = 0;
var mdgriffith$stylish_elephants$Element$Input$radioRow = mdgriffith$stylish_elephants$Element$Input$radioHelper(0);
var author$project$Framework$StyleElementsInput$example4 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$radioRow,
			_List_Nil,
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dx: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Radio),
				dC: _List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Element$Input$option,
						'A',
						mdgriffith$stylish_elephants$Element$text('Radio A')),
						A2(
						mdgriffith$stylish_elephants$Element$Input$option,
						'B',
						mdgriffith$stylish_elephants$Element$text('Radio B')),
						A2(
						mdgriffith$stylish_elephants$Element$Input$option,
						'C',
						mdgriffith$stylish_elephants$Element$text('Radio C'))
					]),
				b_: model.au
			}),
		'Input.radioRow []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Radio\n    , selected = model.radio\n    , options =\n        [ Input.option "A" (text "Radio A")\n        , Input.option "B" (text "Radio B")\n        , Input.option "C" (text "Radio C")\n        ]\n    }');
};
var mdgriffith$stylish_elephants$Element$Input$username = mdgriffith$stylish_elephants$Element$Input$textHelper(
	{
		o: elm$core$Maybe$Just('username'),
		s: false,
		w: mdgriffith$stylish_elephants$Element$Input$TextInputNode('text')
	});
var author$project$Framework$StyleElementsInput$example5 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$username,
			_List_Nil,
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dx: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				dO: elm$core$Maybe$Nothing,
				eb: model.eb
			}),
		'Input.username []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    }');
};
var mdgriffith$stylish_elephants$Element$Input$newPassword = F2(
	function (attrs, pass) {
		return A3(
			mdgriffith$stylish_elephants$Element$Input$textHelper,
			{
				o: elm$core$Maybe$Just('new-password'),
				s: false,
				w: mdgriffith$stylish_elephants$Element$Input$TextInputNode(
					pass.b$ ? 'text' : 'password')
			},
			attrs,
			{aP: pass.aP, dx: pass.dx, dO: pass.dO, eb: pass.eb});
	});
var author$project$Framework$StyleElementsInput$example6 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$newPassword,
			_List_Nil,
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dx: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				dO: elm$core$Maybe$Nothing,
				b$: false,
				eb: model.eb
			}),
		'Input.newPassword []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , show = False\n    }');
};
var mdgriffith$stylish_elephants$Element$Input$currentPassword = F2(
	function (attrs, pass) {
		return A3(
			mdgriffith$stylish_elephants$Element$Input$textHelper,
			{
				o: elm$core$Maybe$Just('current-password'),
				s: false,
				w: mdgriffith$stylish_elephants$Element$Input$TextInputNode(
					pass.b$ ? 'text' : 'password')
			},
			attrs,
			{aP: pass.aP, dx: pass.dx, dO: pass.dO, eb: pass.eb});
	});
var author$project$Framework$StyleElementsInput$example7 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$currentPassword,
			_List_Nil,
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dx: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				dO: elm$core$Maybe$Nothing,
				b$: false,
				eb: model.eb
			}),
		'Input.currentPassword []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , show = False\n    }');
};
var author$project$Framework$StyleElementsInput$example8 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$email,
			_List_Nil,
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dx: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				dO: elm$core$Maybe$Nothing,
				eb: model.eb
			}),
		'Input.email []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    }');
};
var mdgriffith$stylish_elephants$Element$Input$search = mdgriffith$stylish_elephants$Element$Input$textHelper(
	{
		o: elm$core$Maybe$Nothing,
		s: false,
		w: mdgriffith$stylish_elephants$Element$Input$TextInputNode('search')
	});
var author$project$Framework$StyleElementsInput$example9 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$search,
			_List_Nil,
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dx: elm$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				dO: elm$core$Maybe$Nothing,
				eb: model.eb
			}),
		'Input.search []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    }');
};
var author$project$Framework$viewSubSection = F2(
	function (model, _n0) {
		var componentExample = _n0.a;
		var componentExampleSourceCode = _n0.b;
		var _n1 = _Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: Form.example1')) ? A2(author$project$Framework$specialComponentFormField, model, author$project$Framework$FormField$example1) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: FormFieldWithPattern.example1')) ? A2(author$project$Framework$specialComponentFormFieldWithPattern, model, author$project$Framework$FormFieldWithPattern$example1) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: FormFieldWithPattern.example2')) ? A2(author$project$Framework$specialComponentFormFieldWithPattern, model, author$project$Framework$FormFieldWithPattern$example2) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: FormFieldWithPattern.example3')) ? A2(author$project$Framework$specialComponentFormFieldWithPattern, model, author$project$Framework$FormFieldWithPattern$example3) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: Cards.example1')) ? A2(author$project$Framework$specialComponentCards, model, author$project$Framework$Card$example1) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example0')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example0) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example1')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example1) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example2')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example2) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example3')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example3) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example4')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example4) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example5')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example5) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example6')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example6) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example7')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example7) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example8')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example8) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example9')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example9) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example9')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example9) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example10')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example10) : (_Utils_eq(
			componentExample,
			mdgriffith$stylish_elephants$Element$text('special: example11')) ? A2(author$project$Framework$specialComponent, model, author$project$Framework$StyleElementsInput$example11) : _Utils_Tuple2(componentExample, componentExampleSourceCode))))))))))))))))));
		var componentExampleToDisplay = _n1.a;
		var componentExampleSourceCodeToDisplay = _n1.b;
		return A2(
			mdgriffith$stylish_elephants$Element$row,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$spacing(16)
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$column,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
							mdgriffith$stylish_elephants$Element$alignTop
						]),
					_List_fromArray(
						[componentExampleToDisplay])),
					A2(author$project$Framework$sourceCodeWrapper, model.c, componentExampleSourceCodeToDisplay)
				]));
	});
var author$project$Framework$viewIntrospectionBody = F3(
	function (model, title, listSubSection) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$padding(model.c.B),
					mdgriffith$stylish_elephants$Element$spacing(model.c.B),
					mdgriffith$stylish_elephants$Element$Background$color(
					author$project$Color$toElementColor(author$project$Color$white))
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$Font$size(28)
						]),
					mdgriffith$stylish_elephants$Element$text(title)),
					A2(
					mdgriffith$stylish_elephants$Element$column,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$spacing(10)
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
var mdgriffith$stylish_elephants$Element$Font$extraLight = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontWeight, mdgriffith$stylish_elephants$Internal$Style$classes.ee);
var author$project$Framework$viewTitleAndSubTitle = F3(
	function (configuration, title, subTitle) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Background$color(
					author$project$Color$toElementColor(configuration.bc)),
					mdgriffith$stylish_elephants$Element$padding(configuration.B),
					mdgriffith$stylish_elephants$Element$spacing(10),
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink)
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$Font$size(32),
							mdgriffith$stylish_elephants$Element$Font$bold
						]),
					mdgriffith$stylish_elephants$Element$text(title)),
					A2(
					mdgriffith$stylish_elephants$Element$paragraph,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$Font$size(24),
							mdgriffith$stylish_elephants$Element$Font$extraLight
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
			introspection.r,
			mdgriffith$stylish_elephants$Element$text(introspection.ai));
	});
var author$project$Framework$viewIntrospection = F2(
	function (model, introspection) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_Nil,
			A2(
				elm$core$List$cons,
				A2(author$project$Framework$viewIntrospectionTitle, model.c, introspection),
				A2(
					elm$core$List$map,
					function (_n0) {
						var string = _n0.a;
						var listSubSections = _n0.b;
						return A3(author$project$Framework$viewIntrospectionBody, model, string, listSubSections);
					},
					introspection.ae)));
	});
var author$project$Framework$routeRoot = '#/';
var author$project$Framework$routeToString = function (page) {
	var pieces = function () {
		if (!page.$) {
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
			mdgriffith$stylish_elephants$Element$link,
			_List_Nil,
			{
				aP: A2(
					mdgriffith$stylish_elephants$Element$column,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							mdgriffith$stylish_elephants$Element$spacing(10)
						]),
					_List_fromArray(
						[
							A2(
							mdgriffith$stylish_elephants$Element$el,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$Font$size(60),
									mdgriffith$stylish_elephants$Element$Font$bold
								]),
							title),
							A2(
							mdgriffith$stylish_elephants$Element$el,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$Font$size(16),
									mdgriffith$stylish_elephants$Element$Font$bold
								]),
							mdgriffith$stylish_elephants$Element$text(subTitle)),
							A2(
							mdgriffith$stylish_elephants$Element$el,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$Font$size(12),
									mdgriffith$stylish_elephants$Element$Font$bold
								]),
							mdgriffith$stylish_elephants$Element$text('v' + version))
						])),
				n: author$project$Framework$routeToString(author$project$Framework$RouteHome)
			});
	});
var author$project$Framework$viewSomething = F2(
	function (model, _n0) {
		var introspection = _n0.a;
		var _n1 = _n0.b;
		var title = _n1.a;
		var listSubSection = _n1.b;
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_Nil,
			A2(
				elm$core$List$cons,
				A2(author$project$Framework$viewIntrospectionTitle, model.c, introspection),
				_Utils_ap(
					(introspection.aw !== '') ? _List_fromArray(
						[
							A2(
							mdgriffith$stylish_elephants$Element$paragraph,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$Font$family(
									_List_fromArray(
										[mdgriffith$stylish_elephants$Element$Font$monospace])),
									A2(mdgriffith$stylish_elephants$Element$paddingXY, 40, 20)
								]),
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$text(
									A2(
										elm$core$String$join,
										'⇾',
										A2(elm$core$String$split, '->', introspection.aw)))
								]))
						]) : _List_Nil,
					_List_fromArray(
						[
							A3(author$project$Framework$viewIntrospectionBody, model, title, listSubSection)
						]))));
	});
var mdgriffith$stylish_elephants$Element$scrollbars = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$overflow, mdgriffith$stylish_elephants$Internal$Style$classes.dX);
var author$project$Framework$viewContentColumn = function (model) {
	var _n0 = author$project$Framework$maybeSelected(model);
	if (!_n0.$) {
		var something = _n0.a;
		return A2(author$project$Framework$viewSomething, model, something);
	} else {
		return A2(
			mdgriffith$stylish_elephants$Element$el,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
					mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
					mdgriffith$stylish_elephants$Element$scrollbars
				]),
			A2(
				mdgriffith$stylish_elephants$Element$column,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Element$column,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$padding(model.c.B + 100),
								mdgriffith$stylish_elephants$Element$spacing(model.c.B)
							]),
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_Nil,
								A3(author$project$Framework$viewLogo, model.c.az, model.c.a0, model.c.a3)),
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Font$size(24)
									]),
								model.c.bf),
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$centerX,
										mdgriffith$stylish_elephants$Element$alpha(0.2)
									]),
								A2(author$project$Framework$Icon$chevronDown, author$project$Framework$Color$grey, 32))
							])),
						A2(
						mdgriffith$stylish_elephants$Element$column,
						_List_Nil,
						A2(
							elm$core$List$map,
							function (_n1) {
								var introspection = _n1.a;
								return A2(author$project$Framework$viewIntrospection, model, introspection);
							},
							model.q))
					])));
	}
};
var author$project$Framework$MsgCloseAllSections = {$: 2};
var author$project$Framework$MsgOpenAllSections = {$: 1};
var author$project$Framework$MsgToggleSection = function (a) {
	return {$: 0, a: a};
};
var author$project$Framework$viewListVariationForMenu = F2(
	function (introspection, variations) {
		return A2(
			elm$core$List$map,
			function (_n0) {
				var title = _n0.a;
				return A2(
					mdgriffith$stylish_elephants$Element$link,
					_List_Nil,
					{
						aP: mdgriffith$stylish_elephants$Element$text(title),
						n: author$project$Framework$routeToString(
							A2(author$project$Framework$RouteSubPage, introspection.r, title))
					});
			},
			variations);
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var author$project$Framework$viewIntrospectionForMenu = F3(
	function (configuration, introspection, open) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Font$color(
					author$project$Color$toElementColor(configuration.al))
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$pointer,
							mdgriffith$stylish_elephants$Element$Events$onClick(
							author$project$Framework$MsgToggleSection(introspection.r)),
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
							mdgriffith$stylish_elephants$Element$Font$bold
						]),
					A2(
						mdgriffith$stylish_elephants$Element$paragraph,
						_List_fromArray(
							[mdgriffith$stylish_elephants$Element$alignLeft]),
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$padding(5),
										mdgriffith$stylish_elephants$Element$rotate(
										open ? (elm$core$Basics$pi / 2) : 0)
									]),
								mdgriffith$stylish_elephants$Element$text('⟩ ')),
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Font$size(18),
										mdgriffith$stylish_elephants$Element$Font$bold
									]),
								mdgriffith$stylish_elephants$Element$text(introspection.r))
							]))),
					A2(
					mdgriffith$stylish_elephants$Element$column,
					_Utils_ap(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$clip,
								mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
								mdgriffith$stylish_elephants$Element$Font$size(16),
								mdgriffith$stylish_elephants$Element$Font$color(
								author$project$Color$toElementColor(configuration.bb)),
								mdgriffith$stylish_elephants$Element$spacing(12),
								mdgriffith$stylish_elephants$Element$paddingEach(
								{cA: 0, df: 26, dU: 0, er: 12})
							]),
						open ? _List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$htmlAttribute(
								elm$html$Html$Attributes$class('elmStyleguideGenerator-open'))
							]) : _List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$htmlAttribute(
								elm$html$Html$Attributes$class('elmStyleguideGenerator-close'))
							])),
					A2(author$project$Framework$viewListVariationForMenu, introspection, introspection.ae))
				]));
	});
var author$project$Framework$viewMenuColumn = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Background$color(
				author$project$Color$toElementColor(model.c.ak)),
				mdgriffith$stylish_elephants$Element$Font$color(
				author$project$Color$toElementColor(model.c.ba)),
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
				mdgriffith$stylish_elephants$Element$spacing(30),
				A2(mdgriffith$stylish_elephants$Element$paddingXY, model.c.B, model.c.B),
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill)
			]),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$column,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink)
					]),
				_List_fromArray(
					[
						A3(author$project$Framework$viewLogo, model.c.az, model.c.a0, model.c.a3),
						A2(
						mdgriffith$stylish_elephants$Element$row,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$spacing(10),
								mdgriffith$stylish_elephants$Element$Font$size(14),
								mdgriffith$stylish_elephants$Element$Font$color(
								author$project$Color$toElementColor(model.c.al)),
								A2(mdgriffith$stylish_elephants$Element$paddingXY, 0, 20)
							]),
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$pointer,
										mdgriffith$stylish_elephants$Element$Events$onClick(author$project$Framework$MsgOpenAllSections)
									]),
								mdgriffith$stylish_elephants$Element$text('Expand All')),
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$pointer,
										mdgriffith$stylish_elephants$Element$Events$onClick(author$project$Framework$MsgCloseAllSections)
									]),
								mdgriffith$stylish_elephants$Element$text('Close All'))
							]))
					])),
				A2(
				mdgriffith$stylish_elephants$Element$column,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$spacing(30),
						mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
						mdgriffith$stylish_elephants$Element$alignTop
					]),
				A2(
					elm$core$List$map,
					function (_n0) {
						var data = _n0.a;
						var show = _n0.b;
						return A3(author$project$Framework$viewIntrospectionForMenu, model.c, data, show);
					},
					model.q))
			]));
};
var mdgriffith$stylish_elephants$Element$clipX = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$overflow, mdgriffith$stylish_elephants$Internal$Style$classes.cH);
var mdgriffith$stylish_elephants$Element$scrollbarY = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$overflow, mdgriffith$stylish_elephants$Internal$Style$classes.dZ);
var author$project$Framework$viewPage = F2(
	function (maybeWindowSize, model) {
		return A2(
			mdgriffith$stylish_elephants$Element$row,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$height(
					function () {
						if (!maybeWindowSize.$) {
							var windowSize = maybeWindowSize.a;
							return mdgriffith$stylish_elephants$Element$px(windowSize.bd);
						} else {
							return mdgriffith$stylish_elephants$Element$fill;
						}
					}()),
					mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill)
				]),
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$html(
					A3(
						elm$html$Html$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(author$project$Framework$css)
							]))),
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
							mdgriffith$stylish_elephants$Element$scrollbarY,
							mdgriffith$stylish_elephants$Element$clipX,
							mdgriffith$stylish_elephants$Element$width(
							mdgriffith$stylish_elephants$Element$px(310))
						]),
					author$project$Framework$viewMenuColumn(model)),
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
							mdgriffith$stylish_elephants$Element$scrollbarY,
							mdgriffith$stylish_elephants$Element$clipX,
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill)
						]),
					author$project$Framework$viewContentColumn(model))
				]));
	});
var mdgriffith$stylish_elephants$Internal$Model$FocusStyleOption = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Element$focusStyle = mdgriffith$stylish_elephants$Internal$Model$FocusStyleOption;
var mdgriffith$stylish_elephants$Internal$Model$OnlyDynamic = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$StaticRootAndDynamic = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AllowHover = 1;
var mdgriffith$stylish_elephants$Internal$Model$Layout = 1;
var mdgriffith$stylish_elephants$Internal$Model$focusDefaultStyle = {
	cl: elm$core$Maybe$Nothing,
	cv: elm$core$Maybe$Nothing,
	d$: elm$core$Maybe$Just(
		{
			cr: 3,
			j: A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			dw: _Utils_Tuple2(0, 0),
			F: 3
		})
};
var mdgriffith$stylish_elephants$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 0:
					var hoverable = opt.a;
					var _n4 = record.c5;
					if (_n4.$ === 1) {
						return _Utils_update(
							record,
							{
								c5: elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 1:
					var focusStyle = opt.a;
					var _n5 = record.aj;
					if (_n5.$ === 1) {
						return _Utils_update(
							record,
							{
								aj: elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _n6 = record.dr;
					if (_n6.$ === 1) {
						return _Utils_update(
							record,
							{
								dr: elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			aj: function () {
				var _n0 = record.aj;
				if (_n0.$ === 1) {
					return mdgriffith$stylish_elephants$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _n0.a;
					return focusable;
				}
			}(),
			c5: function () {
				var _n1 = record.c5;
				if (_n1.$ === 1) {
					return 1;
				} else {
					var hoverable = _n1.a;
					return hoverable;
				}
			}(),
			dr: function () {
				var _n2 = record.dr;
				if (_n2.$ === 1) {
					return 1;
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
			{aj: elm$core$Maybe$Nothing, c5: elm$core$Maybe$Nothing, dr: elm$core$Maybe$Nothing},
			options));
};
var mdgriffith$stylish_elephants$Internal$Model$toHtml = F2(
	function (options, el) {
		switch (el.$) {
			case 0:
				var html = el.a;
				return html(mdgriffith$stylish_elephants$Internal$Model$asEl);
			case 1:
				var styles = el.a.d7;
				var html = el.a.c6;
				var styleSheet = A2(
					mdgriffith$stylish_elephants$Internal$Model$toStyleSheetString,
					options,
					A3(
						elm$core$List$foldl,
						mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
						_Utils_Tuple2(
							elm$core$Set$empty,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.aj)
								])),
						styles).b);
				return A2(
					html,
					elm$core$Maybe$Just(styleSheet),
					mdgriffith$stylish_elephants$Internal$Model$asEl);
			case 2:
				var text = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$textElement(text);
			default:
				return mdgriffith$stylish_elephants$Internal$Model$textElement('');
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = mdgriffith$stylish_elephants$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _n0 = options.dr;
			if (_n0 === 2) {
				return mdgriffith$stylish_elephants$Internal$Model$OnlyDynamic(options);
			} else {
				return mdgriffith$stylish_elephants$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			mdgriffith$stylish_elephants$Internal$Model$toHtml,
			options,
			A5(
				mdgriffith$stylish_elephants$Internal$Model$element,
				embedStyle,
				mdgriffith$stylish_elephants$Internal$Model$asEl,
				elm$core$Maybe$Nothing,
				attributes,
				mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var mdgriffith$stylish_elephants$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			mdgriffith$stylish_elephants$Internal$Model$Typeface('Open Sans'),
			mdgriffith$stylish_elephants$Internal$Model$Typeface('Helvetica'),
			mdgriffith$stylish_elephants$Internal$Model$Typeface('Verdana'),
			mdgriffith$stylish_elephants$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$bgColor,
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Colored,
				'bg-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(
					A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 1, 1, 1, 1)),
				'background-color',
				A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 1, 1, 1, 1))),
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$fontColor,
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Colored,
				'font-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(
					A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$fontSize,
			A3(mdgriffith$stylish_elephants$Internal$Model$Single, 'font-size-20', 'font-size', '20px')),
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$fontFamily,
			A2(
				mdgriffith$stylish_elephants$Internal$Model$FontFamily,
				A3(elm$core$List$foldl, mdgriffith$stylish_elephants$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var mdgriffith$stylish_elephants$Element$layoutWith = F3(
	function (_n0, attrs, child) {
		var options = _n0.dC;
		return A3(
			mdgriffith$stylish_elephants$Internal$Model$renderRoot,
			options,
			A2(
				elm$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(
					A2(
						elm$core$String$join,
						' ',
						_List_fromArray(
							[mdgriffith$stylish_elephants$Internal$Style$classes.dV, mdgriffith$stylish_elephants$Internal$Style$classes.ci, mdgriffith$stylish_elephants$Internal$Style$classes.d0, mdgriffith$stylish_elephants$Internal$Style$classes.ah, mdgriffith$stylish_elephants$Internal$Style$classes.X]))),
				_Utils_ap(mdgriffith$stylish_elephants$Internal$Model$rootStyle, attrs)),
			child);
	});
var mdgriffith$stylish_elephants$Internal$Model$ImportFont = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$Font$external = function (_n0) {
	var url = _n0.n;
	var name = _n0.r;
	return A2(mdgriffith$stylish_elephants$Internal$Model$ImportFont, name, url);
};
var author$project$Framework$view = function (model) {
	return {
		cs: _List_fromArray(
			[
				A3(
				mdgriffith$stylish_elephants$Element$layoutWith,
				{
					dC: _List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$focusStyle(
							{
								cl: elm$core$Maybe$Nothing,
								cv: elm$core$Maybe$Just(
									author$project$Color$toElementColor(author$project$Framework$Color$primary)),
								d$: elm$core$Maybe$Nothing
							})
						])
				},
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$family(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Font$external(
								{r: author$project$Framework$Configuration$conf.aM.b4, n: author$project$Framework$Configuration$conf.aM.n}),
								mdgriffith$stylish_elephants$Element$Font$typeface(author$project$Framework$Configuration$conf.aM.b4),
								author$project$Framework$Configuration$conf.aM.ex
							])),
						mdgriffith$stylish_elephants$Element$Font$size(16),
						mdgriffith$stylish_elephants$Element$Font$color(
						author$project$Color$toElementColor(model.c.ak)),
						mdgriffith$stylish_elephants$Element$Background$color(
						author$project$Color$toElementColor(author$project$Color$white)),
						model.c.a9
					]),
				A2(author$project$Framework$viewPage, model.aS, model))
			]),
		az: '0.19 - Elm Style Framework'
	};
};
var elm$browser$Browser$Env = F2(
	function (flags, url) {
		return {cU: flags, n: url};
	});
var elm$browser$Browser$NotFound = elm$core$Basics$identity;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {bC: fragment, bG: host, bO: path, bS: port_, bW: protocol, bX: query};
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
					if (_n1.$ === 1) {
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
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$unsafeToUrl = function (string) {
	var _n0 = elm$url$Url$fromString(string);
	if (!_n0.$) {
		var url = _n0.a;
		return url;
	} else {
		return _Browser_invalidUrl(string);
	}
};
var elm$browser$Browser$Navigation$Manager$Listen = elm$core$Basics$identity;
var elm$browser$Browser$Navigation$Manager$State = F2(
	function (subs, popWatcher) {
		return {bR: popWatcher, b2: subs};
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
			var tagger = _n0;
			return A2(
				elm$core$Platform$sendToApp,
				router,
				tagger(url));
		};
		return A2(
			elm$browser$Browser$Navigation$Manager$ignore,
			elm$core$Task$sequence(
				A2(elm$core$List$map, send, subs)),
			0);
	});
var elm$browser$Browser$Navigation$Manager$pushState = _Browser_pushState;
var elm$browser$Browser$Navigation$Manager$replaceState = _Browser_replaceState;
var elm$browser$Browser$Navigation$Manager$cmdHelp = F3(
	function (router, subs, cmd) {
		switch (cmd.$) {
			case 0:
				var n = cmd.a;
				return elm$browser$Browser$Navigation$Manager$go(n);
			case 1:
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
	if (!popWatcher.$) {
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
		return {$: 1, a: a, b: b};
	});
var elm$browser$Browser$Navigation$Manager$Normal = function (a) {
	return {$: 0, a: a};
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
					_Browser_getUrl(0));
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
	return _Browser_isInternetExplorer11(0) ? A3(
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
		var popWatcher = _n0.bR;
		var stepState = function () {
			var _n2 = _Utils_Tuple2(subs, popWatcher);
			_n2$2:
			while (true) {
				if (!_n2.a.b) {
					if (!_n2.b.$) {
						var watcher = _n2.b.a;
						return A2(
							elm$browser$Browser$Navigation$Manager$ignore,
							elm$browser$Browser$Navigation$Manager$killPopWatcher(watcher),
							A2(elm$browser$Browser$Navigation$Manager$State, subs, elm$core$Maybe$Nothing));
					} else {
						break _n2$2;
					}
				} else {
					if (_n2.b.$ === 1) {
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
			A3(elm$browser$Browser$Navigation$Manager$notify, router, state.b2, url),
			state);
	});
var elm$browser$Browser$Navigation$Manager$Go = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Navigation$Manager$Push = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Navigation$Manager$Replace = function (a) {
	return {$: 2, a: a};
};
var elm$browser$Browser$Navigation$Manager$cmdMap = F2(
	function (_n0, myCmd) {
		switch (myCmd.$) {
			case 0:
				var n = myCmd.a;
				return elm$browser$Browser$Navigation$Manager$Go(n);
			case 1:
				var url = myCmd.a;
				return elm$browser$Browser$Navigation$Manager$Push(url);
			default:
				var url = myCmd.a;
				return elm$browser$Browser$Navigation$Manager$Replace(url);
		}
	});
var elm$browser$Browser$Navigation$Manager$subMap = F2(
	function (func, _n0) {
		var tagger = _n0;
		return function ($) {
			return func(
				tagger($));
		};
	});
_Platform_effectManagers['Browser.Navigation.Manager'] = _Platform_createManager(elm$browser$Browser$Navigation$Manager$init, elm$browser$Browser$Navigation$Manager$onEffects, elm$browser$Browser$Navigation$Manager$onSelfMsg, elm$browser$Browser$Navigation$Manager$cmdMap, elm$browser$Browser$Navigation$Manager$subMap);
var elm$browser$Browser$Navigation$Manager$command = _Platform_leaf('Browser.Navigation.Manager');
var elm$browser$Browser$Navigation$Manager$subscription = _Platform_leaf('Browser.Navigation.Manager');
var elm$browser$Browser$Navigation$Manager$addListen = F3(
	function (toMsg, toSubs, model) {
		return elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					elm$browser$Browser$Navigation$Manager$subscription(toMsg),
					toSubs(model)
				]));
	});
var elm$browser$Browser$fullscreen = function (impl) {
	return _Browser_fullscreen(
		{
			dc: function (_n0) {
				var flags = _n0.cU;
				var url = _n0.n;
				return impl.dc(
					A2(
						elm$browser$Browser$Env,
						flags,
						elm$browser$Browser$unsafeToUrl(url)));
			},
			d9: function () {
				var _n1 = impl.dz;
				if (_n1.$ === 1) {
					return impl.d9;
				} else {
					var toMsg = _n1.a;
					return A2(
						elm$browser$Browser$Navigation$Manager$addListen,
						function ($) {
							return toMsg(
								elm$browser$Browser$unsafeToUrl($));
						},
						impl.d9);
				}
			}(),
			ez: impl.ez,
			eA: impl.eA
		});
};
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$Framework$main = elm$browser$Browser$fullscreen(
	{
		dc: author$project$Framework$init,
		dz: elm$core$Maybe$Just(author$project$Framework$onNavigation),
		d9: author$project$Framework$subscriptions,
		ez: author$project$Framework$update,
		eA: author$project$Framework$view
	});
_Platform_export({'Framework':author$project$Framework$main(elm$json$Json$Decode$value)(0)({})});}(this));