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
		return ord === elm_lang$core$Basics$EQ ? 0 : ord === elm_lang$core$Basics$LT ? -1 : 1;
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
		typeof x === 'function' && _Error_throw(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm_lang$core$Set$toList(x);
		y = elm_lang$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm_lang$core$Dict$toList(x);
		y = elm_lang$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm_lang$core$Dict$toList(x);
		y = elm_lang$core$Dict$toList(y);
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
	return n < 0 ? elm_lang$core$Basics$LT : n ? elm_lang$core$Basics$GT : elm_lang$core$Basics$EQ;
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
		_Error_throw(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Error_throw(9, moduleName, region, value, message);
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
				+ _Debug_toAnsiString(ansi, elm_lang$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm_lang$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm_lang$core$Array$toList(value));
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
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
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



function _Error_throw(identifier)
{
	throw new Error('https://github.com/elm-lang/core/blob/master/hints/' + identifier + '.md');
}


function _Error_throw_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('Internal red-black tree invariant violated');

		case 1:
			var url = fact1;
			throw new Error('Cannot navigate to the following URL. It seems to be invalid:\n' + url);

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
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Error_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Error_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm-lang/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Error_regionToString(region)
{
	if (region.bq.ao === region.bG.ao)
	{
		return 'on line ' + region.bq.ao;
	}
	return 'on lines ' + region.bq.ao + ' through ' + region.bG.ao;
}

function _Error_dictBug()
{
	_Error_throw(0);
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
		? _Error_throw(11)
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
		return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
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
				? elm_lang$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm_lang$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm_lang$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm_lang$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm_lang$core$Result$Ok(value)
				: (value instanceof String)
					? elm_lang$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm_lang$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm_lang$core$Result$Ok(_Json_wrap(value));

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
			return (elm_lang$core$Result$isOk(result)) ? result : elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Field, field, result.a));

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
			return (elm_lang$core$Result$isOk(result)) ? result : elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Index, index, result.a));

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
					if (!elm_lang$core$Result$isOk(result))
					{
						return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm_lang$core$Result$Ok(elm_lang$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm_lang$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm_lang$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm_lang$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm_lang$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm_lang$core$Result$Err(elm_lang$json$Json$Decode$OneOf(elm_lang$core$List$reverse(errors)));

		case 1:
			return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm_lang$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm_lang$core$Result$isOk(result))
		{
			return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm_lang$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm_lang$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
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
			impl.du,
			impl.eC,
			impl.er,
			function() { return function() {} }
		);
	};
	return object;
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, flags, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(flags));
	elm_lang$core$Result$isOk(result) || _Error_throw(2, result.a);
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
// This is used by code in elm-lang/browser and elm-lang/http
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
		_Error_throw(3, name)
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
		var result = A2(_Json_run, converter, incomingValue);

		elm_lang$core$Result$isOk(result) || _Error_throw(4, name, result.a);

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
				? _Error_throw(6)
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
				? _Error_throw(6, moduleName)
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
		? elm_lang$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(string[0] + string[1], string.slice(2))
				: _Utils_Tuple2(string[0], string.slice(1))
		)
		: elm_lang$core$Maybe$Nothing;
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
		return elm_lang$core$Maybe$Nothing;
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
			return elm_lang$core$Maybe$Nothing;
		}
		return elm_lang$core$Maybe$Just(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && ((c !== '-' && c !== '+') || len === 1)))
	{
		return elm_lang$core$Maybe$Nothing;
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return elm_lang$core$Maybe$Nothing;
		}
	}

	return elm_lang$core$Maybe$Just(parseInt(s, 10));
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm_lang$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm_lang$core$Maybe$Just(n) : elm_lang$core$Maybe$Nothing;
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
	var tag = elm_lang$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			A3(elm_lang$json$Json$Decode$map2,
				!tag
					? _VirtualDom_mapTimed
					:
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm_lang$json$Json$Decode$succeed(func),
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
		F: _VirtualDom_mapTimed(func, record.F),
		b7: record.b7,
		b0: record.b0
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
			&& { passive: elm_lang$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
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

		if (!elm_lang$core$Result$isOk(result))
		{
			return;
		}

		var ok = result.a;
		var timedMsg = _VirtualDom_eventToTimedMsg(event, elm_lang$virtual_dom$VirtualDom$toHandlerInt(handler), ok);
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
		currentEventNode(message, elm_lang$virtual_dom$VirtualDom$isSync(timedMsg));
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

	if (tag === 1 ? value.b : tag === 3 && value.b7) event.stopPropagation();
	if (tag === 2 ? value.b : tag === 3 && value.b0) event.preventDefault();

	return tag < 3 ? value.a : value.F;
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
			_Error_throw(10); // 'Ran into an unknown patch!'
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
	// else is normal NODE


	// ATTRIBUTES

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

	// NODES

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


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.bT) { flags += 'm'; }
	if (options.bB) { flags += 'i'; }

	try
	{
		return elm_lang$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm_lang$core$Maybe$Nothing;
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
				? elm_lang$core$Maybe$Just(submatch)
				: elm_lang$core$Maybe$Nothing;
		}
		out.push(A4(elm_lang$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
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
				? elm_lang$core$Maybe$Just(submatch)
				: elm_lang$core$Maybe$Nothing;
		}
		return replacer(A4(elm_lang$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
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
		return elm_lang$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm_lang$core$Maybe$Nothing;
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
	_Error_throw(1, url);
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
			impl.du,
			impl.eC,
			impl.er,
			_Browser_makeStepperBuilder(node, impl.eE)
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
			A2(elm_lang$json$Json$Decode$map, _Browser_toEnv, flagDecoder),
			flags,
			impl.du,
			impl.eC,
			impl.er,
			_Browser_makeStepperBuilder(_VirtualDom_doc.body, function(model) {
				var ui = impl.eE(model);
				if (_VirtualDom_doc.title !== ui.aA)
				{
					_VirtualDom_doc.title = ui.aA;
				}
				return _VirtualDom_node('body')(_List_Nil)(ui.cM);
			})
		);
	};
	return object;
});


function _Browser_toEnv(flags)
{
	return {
		n: _Browser_getUrl(),
		da: flags
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
				: _Scheduler_fail(elm_lang$browser$Browser$NotFound(id))
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
	return elm_lang$core$Result$isOk(result)
		? (result.a.b && event.preventDefault(), elm_lang$core$Maybe$Just(result.a.a))
		: elm_lang$core$Maybe$Nothing
});var elm_lang$core$Basics$False = 1;
var elm_lang$core$Basics$True = 0;
var elm_lang$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm_lang$core$Basics$EQ = 1;
var elm_lang$core$Basics$GT = 2;
var elm_lang$core$Basics$LT = 0;
var elm_lang$core$Dict$foldr = F3(
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
					A3(elm_lang$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm_lang$core$List$cons = _List_cons;
var elm_lang$core$Dict$toList = function (dict) {
	return A3(
		elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm_lang$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm_lang$core$Dict$keys = function (dict) {
	return A3(
		elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm_lang$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm_lang$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm_lang$core$Dict$keys(dict);
};
var elm_lang$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm_lang$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm_lang$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm_lang$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm_lang$core$Elm$JsArray$foldr,
			helper,
			A3(elm_lang$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm_lang$core$Array$toList = function (array) {
	return A3(elm_lang$core$Array$foldr, elm_lang$core$List$cons, _List_Nil, array);
};
var elm_lang$core$Array$branchFactor = 32;
var elm_lang$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm_lang$core$Basics$ceiling = _Basics_ceiling;
var elm_lang$core$Basics$fdiv = _Basics_fdiv;
var elm_lang$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(_Basics_e);
	});
var elm_lang$core$Basics$toFloat = _Basics_toFloat;
var elm_lang$core$Array$shiftStep = elm_lang$core$Basics$ceiling(
	A2(elm_lang$core$Basics$logBase, 2, elm_lang$core$Array$branchFactor));
var elm_lang$core$Elm$JsArray$empty = _JsArray_empty;
var elm_lang$core$Array$empty = A4(elm_lang$core$Array$Array_elm_builtin, 0, elm_lang$core$Array$shiftStep, elm_lang$core$Elm$JsArray$empty, elm_lang$core$Elm$JsArray$empty);
var elm_lang$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm_lang$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm_lang$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm_lang$core$List$foldl = F3(
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
var elm_lang$core$List$reverse = function (list) {
	return A3(elm_lang$core$List$foldl, elm_lang$core$List$cons, _List_Nil, list);
};
var elm_lang$core$Array$compressNodes = F2(
	function (nodes, acc) {
		var _n0 = A2(elm_lang$core$Elm$JsArray$initializeFromList, elm_lang$core$Array$branchFactor, nodes);
		var node = _n0.a;
		var remainingNodes = _n0.b;
		var newAcc = A2(
			elm_lang$core$List$cons,
			elm_lang$core$Array$SubTree(node),
			acc);
		if (!remainingNodes.b) {
			return elm_lang$core$List$reverse(newAcc);
		} else {
			return A2(elm_lang$core$Array$compressNodes, remainingNodes, newAcc);
		}
	});
var elm_lang$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm_lang$core$Basics$eq = _Utils_equal;
var elm_lang$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm_lang$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm_lang$core$Basics$ceiling(nodeListSize / elm_lang$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm_lang$core$Elm$JsArray$initializeFromList, elm_lang$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm_lang$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm_lang$core$Basics$add = _Basics_add;
var elm_lang$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm_lang$core$Basics$floor = _Basics_floor;
var elm_lang$core$Basics$gt = _Utils_gt;
var elm_lang$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm_lang$core$Basics$mul = _Basics_mul;
var elm_lang$core$Basics$sub = _Basics_sub;
var elm_lang$core$Elm$JsArray$length = _JsArray_length;
var elm_lang$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.c) {
			return A4(
				elm_lang$core$Array$Array_elm_builtin,
				elm_lang$core$Elm$JsArray$length(builder.d),
				elm_lang$core$Array$shiftStep,
				elm_lang$core$Elm$JsArray$empty,
				builder.d);
		} else {
			var treeLen = builder.c * elm_lang$core$Array$branchFactor;
			var depth = elm_lang$core$Basics$floor(
				A2(elm_lang$core$Basics$logBase, elm_lang$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm_lang$core$List$reverse(builder.g) : builder.g;
			var tree = A2(elm_lang$core$Array$treeFromBuilder, correctNodeList, builder.c);
			return A4(
				elm_lang$core$Array$Array_elm_builtin,
				elm_lang$core$Elm$JsArray$length(builder.d) + treeLen,
				A2(elm_lang$core$Basics$max, 5, depth * elm_lang$core$Array$shiftStep),
				tree,
				builder.d);
		}
	});
var elm_lang$core$Basics$idiv = _Basics_idiv;
var elm_lang$core$Basics$lt = _Utils_lt;
var elm_lang$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm_lang$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm_lang$core$Array$builderToArray,
					false,
					{g: nodeList, c: (len / elm_lang$core$Array$branchFactor) | 0, d: tail});
			} else {
				var leaf = elm_lang$core$Array$Leaf(
					A3(elm_lang$core$Elm$JsArray$initialize, elm_lang$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm_lang$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm_lang$core$List$cons, leaf, nodeList),
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
var elm_lang$core$Basics$le = _Utils_le;
var elm_lang$core$Basics$remainderBy = _Basics_remainderBy;
var elm_lang$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm_lang$core$Array$empty;
		} else {
			var tailLen = len % elm_lang$core$Array$branchFactor;
			var tail = A3(elm_lang$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm_lang$core$Array$branchFactor;
			return A5(elm_lang$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm_lang$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm_lang$core$Maybe$Nothing = {$: 1};
var elm_lang$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm_lang$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm_lang$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm_lang$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm_lang$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm_lang$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm_lang$core$Platform$Cmd$batch = _Platform_batch;
var author$project$Framework$initCmd = elm_lang$core$Platform$Cmd$batch(_List_Nil);
var author$project$Framework$debug = true;
var elm_lang$json$Json$Decode$succeed = _Json_succeed;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode = elm_lang$json$Json$Decode$succeed;
var elm_lang$json$Json$Decode$map2 = _Json_map2;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom = elm_lang$json$Json$Decode$map2(elm_lang$core$Basics$apR);
var elm_lang$json$Json$Decode$field = _Json_decodeField;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2(elm_lang$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var author$project$Framework$Flag = F2(
	function (width, height) {
		return {bg: height, cq: width};
	});
var elm_lang$json$Json$Decode$int = _Json_decodeInt;
var author$project$Framework$decodeFlag = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'height',
	elm_lang$json$Json$Decode$int,
	A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
		'width',
		elm_lang$json$Json$Decode$int,
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode(author$project$Framework$Flag)));
var elm_lang$json$Json$Decode$decodeValue = _Json_run;
var author$project$Framework$decodeFlagFromJson = function (json) {
	var decoded = A2(elm_lang$json$Json$Decode$decodeValue, author$project$Framework$decodeFlag, json);
	if (!decoded.$) {
		var flag = decoded.a;
		return elm_lang$core$Maybe$Just(flag);
	} else {
		return elm_lang$core$Maybe$Nothing;
	}
};
var mdgriffith$stylish_elephants$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Element$rgb = F3(
	function (r, g, b) {
		return A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, r, g, b, 1);
	});
var author$project$Color$black = A3(mdgriffith$stylish_elephants$Element$rgb, 0.2, 0.2, 0.2);
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
var elm_lang$core$String$fromInt = _String_fromNumber;
var elm_lang$core$Basics$identity = function (x) {
	return x;
};
var elm_lang$json$Json$Decode$map = _Json_map1;
var elm_lang$virtual_dom$VirtualDom$isSync = function (timed) {
	if (!timed.$) {
		return true;
	} else {
		return false;
	}
};
var elm_lang$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
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
var elm_lang$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm_lang$svg$Svg$path = elm_lang$svg$Svg$trustedNode('path');
var elm_lang$svg$Svg$svg = elm_lang$svg$Svg$trustedNode('svg');
var elm_lang$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var elm_lang$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm_lang$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm_lang$svg$Svg$Attributes$version = _VirtualDom_attribute('version');
var elm_lang$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm_lang$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var author$project$Framework$Logo$elmLogo = F2(
	function (type_, height) {
		var p = elm_lang$svg$Svg$path;
		var f = elm_lang$svg$Svg$Attributes$fill;
		var d = elm_lang$svg$Svg$Attributes$d;
		var c = function () {
			if (type_.$ === 1) {
				return {
					a9: author$project$Framework$Logo$cssRgb(0),
					ba: author$project$Framework$Logo$cssRgb(1),
					bb: author$project$Framework$Logo$cssRgb(2),
					bc: author$project$Framework$Logo$cssRgb(3)
				};
			} else {
				var cl = type_.a;
				return {
					a9: author$project$Framework$Logo$cssRgb(cl),
					ba: author$project$Framework$Logo$cssRgb(cl),
					bb: author$project$Framework$Logo$cssRgb(cl),
					bc: author$project$Framework$Logo$cssRgb(cl)
				};
			}
		}();
		return A2(
			elm_lang$svg$Svg$svg,
			_List_fromArray(
				[
					elm_lang$svg$Svg$Attributes$version('1'),
					elm_lang$svg$Svg$Attributes$viewBox('0 0 323 323'),
					elm_lang$svg$Svg$Attributes$height(
					elm_lang$core$String$fromInt(height)),
					elm_lang$svg$Svg$Attributes$width(
					elm_lang$core$String$fromInt(
						elm_lang$core$Basics$floor(height * author$project$Framework$Logo$ratio)))
				]),
			_List_fromArray(
				[
					A2(
					p,
					_List_fromArray(
						[
							f(c.a9),
							d('M162 153l70-70H92zm94 94l67 67V179z')
						]),
					_List_Nil),
					A2(
					p,
					_List_fromArray(
						[
							f(c.ba),
							d('M9 0l70 70h153L162 0zm238 85l77 76-77 77-76-77z')
						]),
					_List_Nil),
					A2(
					p,
					_List_fromArray(
						[
							f(c.bb),
							d('M323 144V0H180zm-161 27L9 323h305z')
						]),
					_List_Nil),
					A2(
					p,
					_List_fromArray(
						[
							f(c.bc),
							d('M153 162L0 9v305z')
						]),
					_List_Nil)
				]));
	});
var elm_lang$svg$Svg$circle = elm_lang$svg$Svg$trustedNode('circle');
var elm_lang$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var elm_lang$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var elm_lang$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var author$project$Framework$Logo$logoLucamug = function (height) {
	return A2(
		elm_lang$svg$Svg$svg,
		_List_fromArray(
			[
				elm_lang$svg$Svg$Attributes$viewBox('0 0 100 100'),
				elm_lang$svg$Svg$Attributes$height(
				elm_lang$core$String$fromInt(height)),
				elm_lang$svg$Svg$Attributes$width(
				elm_lang$core$String$fromInt(
					elm_lang$core$Basics$floor(height * 1)))
			]),
		_List_fromArray(
			[
				A2(
				elm_lang$svg$Svg$path,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$fill('none'),
						elm_lang$svg$Svg$Attributes$d('M0 0h100v100H0z')
					]),
				_List_Nil),
				A2(
				elm_lang$svg$Svg$circle,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$cx('50'),
						elm_lang$svg$Svg$Attributes$cy('50'),
						elm_lang$svg$Svg$Attributes$r('50'),
						elm_lang$svg$Svg$Attributes$fill('tomato')
					]),
				_List_Nil),
				A2(
				elm_lang$svg$Svg$path,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$fill('#1e90ff'),
						elm_lang$svg$Svg$Attributes$d('M7 75.6a49.8 49.8 0 0 0 67.2 18c-26-5.2-35.7-28.7-38-45.7-3.8.2-10.9 0-15.8.2-3 17-7.9 21-13.3 27.5z')
					]),
				_List_Nil),
				A2(
				elm_lang$svg$Svg$path,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$fill('#fff'),
						elm_lang$svg$Svg$Attributes$d('M3 43h15c4 0 4-5 0-5h-5c-1 0-1-1 0-1h22c4 0 4-5 0-5H7c-3 0-3 5 0 5h3c1 0 1 1 0 1H1.5l-1 5zm90.8 18l-15-.1c-4 0-4 5 0 5h5c1 0 1 1 0 1h-22c-4 0-4 5 0 5h28c3 0 3-5 0-5h-3c-1 0-1-1 0-1l10.6.1c.6-1.9 1-3 1.4-5zM20.2 47.6a47 47 0 0 1-7.6 21.5c4.4 3 8.9-15.5 10.1-15 1.7 0-2 12.7-.5 12.9 1.6-.1 2.8-8.3 4.8-8.3 1.8.3 2.3 9.1 4.1 8.7 1.9-.3 0-12.2 2-13.1 2-.2 5.1 16.3 9.7 14.8-3.7-7-5.7-14.7-6.7-21.4H20.2z')
					]),
				_List_Nil)
			]));
};
var elm_lang$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm_lang$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var mdgriffith$stylish_elephants$Internal$Model$Unstyled = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$unstyled = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
		elm_lang$core$Basics$always($));
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
var elm_lang$core$Basics$append = _Utils_append;
var elm_lang$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var mdgriffith$stylish_elephants$Internal$Model$StyleClass = function (a) {
	return {$: 4, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var elm_lang$core$Basics$round = _Basics_round;
var mdgriffith$stylish_elephants$Internal$Model$floatClass = function (x) {
	return elm_lang$core$String$fromInt(
		elm_lang$core$Basics$round(x * 100));
};
var mdgriffith$stylish_elephants$Element$alpha = function (o) {
	var transparency = function (x) {
		return 1 - x;
	}(
		A2(
			elm_lang$core$Basics$min,
			1.0,
			A2(elm_lang$core$Basics$max, 0.0, o)));
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
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
var mdgriffith$stylish_elephants$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Unkeyed = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AsColumn = 1;
var mdgriffith$stylish_elephants$Internal$Model$asColumn = 1;
var elm_lang$core$List$foldrHelper = F4(
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
							elm_lang$core$List$foldl,
							fn,
							acc,
							elm_lang$core$List$reverse(r4)) : A4(elm_lang$core$List$foldrHelper, fn, acc, ctr + 1, r4);
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
var elm_lang$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm_lang$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm_lang$core$Basics$and = _Basics_and;
var elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm_lang$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm_lang$core$Maybe$Just(
				f(value));
		} else {
			return elm_lang$core$Maybe$Nothing;
		}
	});
var elm_lang$core$Dict$LBlack = 0;
var elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {$: -2, a: a};
};
var elm_lang$core$Dict$empty = elm_lang$core$Dict$RBEmpty_elm_builtin(0);
var elm_lang$core$Set$Set_elm_builtin = elm_lang$core$Basics$identity;
var elm_lang$core$Set$empty = elm_lang$core$Dict$empty;
var elm_lang$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var elm_lang$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm_lang$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm_lang$html$Html$node = elm_lang$virtual_dom$VirtualDom$node;
var elm_lang$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm_lang$html$Html$text = elm_lang$virtual_dom$VirtualDom$text;
var mdgriffith$stylish_elephants$Internal$Model$Content = {$: 1};
var mdgriffith$stylish_elephants$Internal$Model$Keyed = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Styled = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AsEl = 2;
var mdgriffith$stylish_elephants$Internal$Model$asEl = 2;
var elm_lang$core$Basics$compare = _Utils_compare;
var elm_lang$core$Dict$Insert = 0;
var elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm_lang$core$Dict$Red = 0;
var elm_lang$core$Dict$Remove = 1;
var elm_lang$core$Dict$Same = 2;
var elm_lang$core$Dict$Black = 1;
var elm_lang$core$Dict$NBlack = 3;
var elm_lang$core$Dict$lessBlack = function (color) {
	switch (color) {
		case 2:
			return 1;
		case 1:
			return 0;
		case 0:
			return 3;
		default:
			return _Error_dictBug(0);
	}
};
var elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												elm_lang$core$Dict$RBNode_elm_builtin,
												elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(elm_lang$core$Dict$RBNode_elm_builtin, 1, xk, xv, a, b),
												A5(elm_lang$core$Dict$RBNode_elm_builtin, 1, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var elm_lang$core$Dict$redden = function (t) {
	if (t.$ === -2) {
		return _Error_dictBug(0);
	} else {
		var k = t.b;
		var v = t.c;
		var l = t.d;
		var r = t.e;
		return A5(elm_lang$core$Dict$RBNode_elm_builtin, 0, k, v, l, r);
	}
};
var elm_lang$core$Dict$balanceHelp = function (tree) {
	_n0$0:
	while (true) {
		_n0$1:
		while (true) {
			_n0$2:
			while (true) {
				_n0$3:
				while (true) {
					_n0$4:
					while (true) {
						_n0$5:
						while (true) {
							_n0$6:
							while (true) {
								if (tree.$ === -1) {
									if (tree.d.$ === -1) {
										if (tree.e.$ === -1) {
											switch (tree.d.a) {
												case 0:
													switch (tree.e.a) {
														case 0:
															if ((tree.d.d.$ === -1) && (!tree.d.d.a.$)) {
																break _n0$0;
															} else {
																if ((tree.d.e.$ === -1) && (!tree.d.e.a.$)) {
																	break _n0$1;
																} else {
																	if ((tree.e.d.$ === -1) && (!tree.e.d.a.$)) {
																		break _n0$2;
																	} else {
																		if ((tree.e.e.$ === -1) && (!tree.e.e.a.$)) {
																			break _n0$3;
																		} else {
																			break _n0$6;
																		}
																	}
																}
															}
														case 3:
															if ((tree.d.d.$ === -1) && (!tree.d.d.a.$)) {
																break _n0$0;
															} else {
																if ((tree.d.e.$ === -1) && (!tree.d.e.a.$)) {
																	break _n0$1;
																} else {
																	if (((((tree.a.$ === 2) && (tree.e.d.$ === -1)) && (tree.e.d.a.$ === 1)) && (tree.e.e.$ === -1)) && (tree.e.e.a.$ === 1)) {
																		break _n0$4;
																	} else {
																		break _n0$6;
																	}
																}
															}
														default:
															if ((tree.d.d.$ === -1) && (!tree.d.d.a.$)) {
																break _n0$0;
															} else {
																if ((tree.d.e.$ === -1) && (!tree.d.e.a.$)) {
																	break _n0$1;
																} else {
																	break _n0$6;
																}
															}
													}
												case 3:
													switch (tree.e.a) {
														case 0:
															if ((tree.e.d.$ === -1) && (!tree.e.d.a.$)) {
																break _n0$2;
															} else {
																if ((tree.e.e.$ === -1) && (!tree.e.e.a.$)) {
																	break _n0$3;
																} else {
																	if (((((tree.a.$ === 2) && (tree.d.d.$ === -1)) && (tree.d.d.a.$ === 1)) && (tree.d.e.$ === -1)) && (tree.d.e.a.$ === 1)) {
																		break _n0$5;
																	} else {
																		break _n0$6;
																	}
																}
															}
														case 3:
															if (tree.a.$ === 2) {
																if ((((tree.e.d.$ === -1) && (tree.e.d.a.$ === 1)) && (tree.e.e.$ === -1)) && (tree.e.e.a.$ === 1)) {
																	break _n0$4;
																} else {
																	if ((((tree.d.d.$ === -1) && (tree.d.d.a.$ === 1)) && (tree.d.e.$ === -1)) && (tree.d.e.a.$ === 1)) {
																		break _n0$5;
																	} else {
																		break _n0$6;
																	}
																}
															} else {
																break _n0$6;
															}
														default:
															if (((((tree.a.$ === 2) && (tree.d.d.$ === -1)) && (tree.d.d.a.$ === 1)) && (tree.d.e.$ === -1)) && (tree.d.e.a.$ === 1)) {
																break _n0$5;
															} else {
																break _n0$6;
															}
													}
												default:
													switch (tree.e.a) {
														case 0:
															if ((tree.e.d.$ === -1) && (!tree.e.d.a.$)) {
																break _n0$2;
															} else {
																if ((tree.e.e.$ === -1) && (!tree.e.e.a.$)) {
																	break _n0$3;
																} else {
																	break _n0$6;
																}
															}
														case 3:
															if (((((tree.a.$ === 2) && (tree.e.d.$ === -1)) && (tree.e.d.a.$ === 1)) && (tree.e.e.$ === -1)) && (tree.e.e.a.$ === 1)) {
																break _n0$4;
															} else {
																break _n0$6;
															}
														default:
															break _n0$6;
													}
											}
										} else {
											switch (tree.d.a) {
												case 0:
													if ((tree.d.d.$ === -1) && (!tree.d.d.a.$)) {
														break _n0$0;
													} else {
														if ((tree.d.e.$ === -1) && (!tree.d.e.a.$)) {
															break _n0$1;
														} else {
															break _n0$6;
														}
													}
												case 3:
													if (((((tree.a.$ === 2) && (tree.d.d.$ === -1)) && (tree.d.d.a.$ === 1)) && (tree.d.e.$ === -1)) && (tree.d.e.a.$ === 1)) {
														break _n0$5;
													} else {
														break _n0$6;
													}
												default:
													break _n0$6;
											}
										}
									} else {
										if (tree.e.$ === -1) {
											switch (tree.e.a) {
												case 0:
													if ((tree.e.d.$ === -1) && (!tree.e.d.a.$)) {
														break _n0$2;
													} else {
														if ((tree.e.e.$ === -1) && (!tree.e.e.a.$)) {
															break _n0$3;
														} else {
															break _n0$6;
														}
													}
												case 3:
													if (((((tree.a.$ === 2) && (tree.e.d.$ === -1)) && (tree.e.d.a.$ === 1)) && (tree.e.e.$ === -1)) && (tree.e.e.a.$ === 1)) {
														break _n0$4;
													} else {
														break _n0$6;
													}
												default:
													break _n0$6;
											}
										} else {
											break _n0$6;
										}
									}
								} else {
									break _n0$6;
								}
							}
							return tree;
						}
						var _n23 = tree.a;
						var zk = tree.b;
						var zv = tree.c;
						var _n24 = tree.d;
						var _n25 = _n24.a;
						var xk = _n24.b;
						var xv = _n24.c;
						var a = _n24.d;
						var _n26 = a.a;
						var _n27 = _n24.e;
						var _n28 = _n27.a;
						var yk = _n27.b;
						var yv = _n27.c;
						var b = _n27.d;
						var c = _n27.e;
						var d = tree.e;
						return A5(
							elm_lang$core$Dict$RBNode_elm_builtin,
							1,
							yk,
							yv,
							A5(
								elm_lang$core$Dict$balance,
								1,
								xk,
								xv,
								elm_lang$core$Dict$redden(a),
								b),
							A5(elm_lang$core$Dict$RBNode_elm_builtin, 1, zk, zv, c, d));
					}
					var _n17 = tree.a;
					var xk = tree.b;
					var xv = tree.c;
					var a = tree.d;
					var _n18 = tree.e;
					var _n19 = _n18.a;
					var zk = _n18.b;
					var zv = _n18.c;
					var _n20 = _n18.d;
					var _n21 = _n20.a;
					var yk = _n20.b;
					var yv = _n20.c;
					var b = _n20.d;
					var c = _n20.e;
					var d = _n18.e;
					var _n22 = d.a;
					return A5(
						elm_lang$core$Dict$RBNode_elm_builtin,
						1,
						yk,
						yv,
						A5(elm_lang$core$Dict$RBNode_elm_builtin, 1, xk, xv, a, b),
						A5(
							elm_lang$core$Dict$balance,
							1,
							zk,
							zv,
							c,
							elm_lang$core$Dict$redden(d)));
				}
				var col = tree.a;
				var xk = tree.b;
				var xv = tree.c;
				var a = tree.d;
				var _n13 = tree.e;
				var _n14 = _n13.a;
				var yk = _n13.b;
				var yv = _n13.c;
				var b = _n13.d;
				var _n15 = _n13.e;
				var _n16 = _n15.a;
				var zk = _n15.b;
				var zv = _n15.c;
				var c = _n15.d;
				var d = _n15.e;
				return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
			}
			var col = tree.a;
			var xk = tree.b;
			var xv = tree.c;
			var a = tree.d;
			var _n9 = tree.e;
			var _n10 = _n9.a;
			var zk = _n9.b;
			var zv = _n9.c;
			var _n11 = _n9.d;
			var _n12 = _n11.a;
			var yk = _n11.b;
			var yv = _n11.c;
			var b = _n11.d;
			var c = _n11.e;
			var d = _n9.e;
			return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
		}
		var col = tree.a;
		var zk = tree.b;
		var zv = tree.c;
		var _n5 = tree.d;
		var _n6 = _n5.a;
		var xk = _n5.b;
		var xv = _n5.c;
		var a = _n5.d;
		var _n7 = _n5.e;
		var _n8 = _n7.a;
		var yk = _n7.b;
		var yv = _n7.c;
		var b = _n7.d;
		var c = _n7.e;
		var d = tree.e;
		return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
	}
	var col = tree.a;
	var zk = tree.b;
	var zv = tree.c;
	var _n1 = tree.d;
	var _n2 = _n1.a;
	var yk = _n1.b;
	var yv = _n1.c;
	var _n3 = _n1.d;
	var _n4 = _n3.a;
	var xk = _n3.b;
	var xv = _n3.c;
	var a = _n3.d;
	var b = _n3.e;
	var c = _n1.e;
	var d = tree.e;
	return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
};
var elm_lang$core$Basics$or = _Basics_or;
var elm_lang$core$Dict$BBlack = 2;
var elm_lang$core$Dict$blackish = function (dict) {
	if (dict.$ === -1) {
		var color = dict.a;
		return (color === 1) || (color === 2);
	} else {
		return true;
	}
};
var elm_lang$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		var dict = A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
		return elm_lang$core$Dict$blackish(dict) ? elm_lang$core$Dict$balanceHelp(dict) : dict;
	});
var elm_lang$core$Dict$blacken = function (t) {
	if (t.$ === -2) {
		return elm_lang$core$Dict$RBEmpty_elm_builtin(0);
	} else {
		var k = t.b;
		var v = t.c;
		var l = t.d;
		var r = t.e;
		return A5(elm_lang$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
	}
};
var elm_lang$core$Dict$isBBlack = function (dict) {
	_n0$2:
	while (true) {
		if (dict.$ === -1) {
			if (dict.a.$ === 2) {
				var _n1 = dict.a;
				return true;
			} else {
				break _n0$2;
			}
		} else {
			if (dict.a.$ === 1) {
				var _n2 = dict.a;
				return true;
			} else {
				break _n0$2;
			}
		}
	}
	return false;
};
var elm_lang$core$Dict$lessBlackTree = function (dict) {
	if (dict.$ === -1) {
		var c = dict.a;
		var k = dict.b;
		var v = dict.c;
		var l = dict.d;
		var r = dict.e;
		return A5(
			elm_lang$core$Dict$RBNode_elm_builtin,
			elm_lang$core$Dict$lessBlack(c),
			k,
			v,
			l,
			r);
	} else {
		return elm_lang$core$Dict$RBEmpty_elm_builtin(0);
	}
};
var elm_lang$core$Dict$moreBlack = function (color) {
	switch (color) {
		case 1:
			return 2;
		case 0:
			return 1;
		case 3:
			return 0;
		default:
			return _Error_dictBug(0);
	}
};
var elm_lang$core$Dict$bubble = F5(
	function (color, key, value, left, right) {
		return (elm_lang$core$Dict$isBBlack(left) || elm_lang$core$Dict$isBBlack(right)) ? A5(
			elm_lang$core$Dict$balance,
			elm_lang$core$Dict$moreBlack(color),
			key,
			value,
			elm_lang$core$Dict$lessBlackTree(left),
			elm_lang$core$Dict$lessBlackTree(right)) : A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
	});
var elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	if ((dict.$ === -1) && (!dict.a.$)) {
		var _n1 = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var right = dict.e;
		return A5(elm_lang$core$Dict$RBNode_elm_builtin, 1, key, value, left, right);
	} else {
		return dict;
	}
};
var elm_lang$core$Dict$LBBlack = 1;
var elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			if (r.$ === -2) {
				return _Utils_Tuple2(k, v);
			} else {
				var kr = r.b;
				var vr = r.c;
				var rr = r.e;
				var $temp$k = kr,
					$temp$v = vr,
					$temp$r = rr;
				k = $temp$k;
				v = $temp$v;
				r = $temp$r;
				continue maxWithDefault;
			}
		}
	});
var elm_lang$core$Dict$removeMax = F5(
	function (color, key, value, left, right) {
		if (right.$ === -2) {
			return A3(elm_lang$core$Dict$rem, color, left, right);
		} else {
			var cr = right.a;
			var kr = right.b;
			var vr = right.c;
			var lr = right.d;
			var rr = right.e;
			return A5(
				elm_lang$core$Dict$bubble,
				color,
				key,
				value,
				left,
				A5(elm_lang$core$Dict$removeMax, cr, kr, vr, lr, rr));
		}
	});
var elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _n0 = _Utils_Tuple2(left, right);
		if (_n0.a.$ === -2) {
			if (_n0.b.$ === -2) {
				switch (color) {
					case 0:
						return elm_lang$core$Dict$RBEmpty_elm_builtin(0);
					case 1:
						return elm_lang$core$Dict$RBEmpty_elm_builtin(1);
					default:
						return _Error_dictBug(0);
				}
			} else {
				var cl = _n0.a.a;
				var _n2 = _n0.b;
				var cr = _n2.a;
				var k = _n2.b;
				var v = _n2.c;
				var l = _n2.d;
				var r = _n2.e;
				var _n3 = _Utils_Tuple3(color, cl, cr);
				if (((_n3.a.$ === 1) && (!_n3.b.$)) && (!_n3.c.$)) {
					var _n4 = _n3.a;
					var _n5 = _n3.b;
					var _n6 = _n3.c;
					return A5(elm_lang$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
				} else {
					return _Error_dictBug(0);
				}
			}
		} else {
			if (_n0.b.$ === -2) {
				var _n7 = _n0.a;
				var cl = _n7.a;
				var k = _n7.b;
				var v = _n7.c;
				var l = _n7.d;
				var r = _n7.e;
				var cr = _n0.b.a;
				var _n8 = _Utils_Tuple3(color, cl, cr);
				if (((_n8.a.$ === 1) && (!_n8.b.$)) && (!_n8.c.$)) {
					var _n9 = _n8.a;
					var _n10 = _n8.b;
					var _n11 = _n8.c;
					return A5(elm_lang$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
				} else {
					return _Error_dictBug(0);
				}
			} else {
				var _n12 = _n0.a;
				var cl = _n12.a;
				var kl = _n12.b;
				var vl = _n12.c;
				var ll = _n12.d;
				var rl = _n12.e;
				var _n13 = _n0.b;
				var newLeft = A5(elm_lang$core$Dict$removeMax, cl, kl, vl, ll, rl);
				var _n14 = A3(elm_lang$core$Dict$maxWithDefault, kl, vl, rl);
				var k = _n14.a;
				var v = _n14.b;
				return A5(elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var elm_lang$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var up = function (dict) {
			if (dict.$ === -2) {
				var _n1 = alter(elm_lang$core$Maybe$Nothing);
				if (_n1.$ === 1) {
					return _Utils_Tuple2(2, elm_lang$core$Dict$empty);
				} else {
					var v = _n1.a;
					return _Utils_Tuple2(
						0,
						A5(elm_lang$core$Dict$RBNode_elm_builtin, 0, targetKey, v, elm_lang$core$Dict$empty, elm_lang$core$Dict$empty));
				}
			} else {
				var color = dict.a;
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n2 = A2(elm_lang$core$Basics$compare, targetKey, key);
				switch (_n2) {
					case 1:
						var _n3 = alter(
							elm_lang$core$Maybe$Just(value));
						if (_n3.$ === 1) {
							return _Utils_Tuple2(
								1,
								A3(elm_lang$core$Dict$rem, color, left, right));
						} else {
							var newValue = _n3.a;
							return _Utils_Tuple2(
								2,
								A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, newValue, left, right));
						}
					case 0:
						var _n4 = up(left);
						var flag = _n4.a;
						var newLeft = _n4.b;
						switch (flag) {
							case 2:
								return _Utils_Tuple2(
									2,
									A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, newLeft, right));
							case 0:
								return _Utils_Tuple2(
									0,
									A5(elm_lang$core$Dict$balance, color, key, value, newLeft, right));
							default:
								return _Utils_Tuple2(
									1,
									A5(elm_lang$core$Dict$bubble, color, key, value, newLeft, right));
						}
					default:
						var _n6 = up(right);
						var flag = _n6.a;
						var newRight = _n6.b;
						switch (flag) {
							case 2:
								return _Utils_Tuple2(
									2,
									A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, left, newRight));
							case 0:
								return _Utils_Tuple2(
									0,
									A5(elm_lang$core$Dict$balance, color, key, value, left, newRight));
							default:
								return _Utils_Tuple2(
									1,
									A5(elm_lang$core$Dict$bubble, color, key, value, left, newRight));
						}
				}
			}
		};
		var _n8 = up(dictionary);
		var finalFlag = _n8.a;
		var updatedDict = _n8.b;
		switch (finalFlag) {
			case 2:
				return updatedDict;
			case 0:
				return elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			elm_lang$core$Dict$update,
			key,
			elm_lang$core$Basics$always(
				elm_lang$core$Maybe$Just(value)),
			dict);
	});
var elm_lang$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0;
		return A3(elm_lang$core$Dict$insert, key, 0, dict);
	});
var elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm_lang$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm_lang$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return elm_lang$core$Maybe$Just(value);
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
var elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm_lang$core$Dict$get, key, dict);
		if (!_n0.$) {
			return true;
		} else {
			return false;
		}
	});
var elm_lang$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm_lang$core$Dict$member, key, dict);
	});
var elm_lang$core$String$join = F2(
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
			return elm_lang$core$String$fromInt(px) + 'px';
		case 1:
			return 'auto';
		case 2:
			var i = x.a;
			return elm_lang$core$String$fromInt(i) + 'fr';
		case 3:
			var min = x.a;
			var len = x.b;
			return 'min' + (elm_lang$core$String$fromInt(min) + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + (elm_lang$core$String$fromInt(max) + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(len));
	}
};
var mdgriffith$stylish_elephants$Internal$Model$psuedoClassName = function (_class) {
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
			return 'font-size-' + elm_lang$core$String$fromInt(i);
		case 3:
			var _class = style.a;
			return _class;
		case 4:
			var _class = style.a;
			return _class;
		case 5:
			var x = style.a;
			var y = style.b;
			return 'spacing-' + (elm_lang$core$String$fromInt(x) + ('-' + elm_lang$core$String$fromInt(y)));
		case 6:
			var top = style.a;
			var right = style.b;
			var bottom = style.c;
			var left = style.d;
			return 'pad-' + (elm_lang$core$String$fromInt(top) + ('-' + (elm_lang$core$String$fromInt(right) + ('-' + (elm_lang$core$String$fromInt(bottom) + ('-' + elm_lang$core$String$fromInt(left)))))));
		case 7:
			var template = style.a;
			return 'grid-rows-' + (A2(
				elm_lang$core$String$join,
				'-',
				A2(elm_lang$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.ed)) + ('-cols-' + (A2(
				elm_lang$core$String$join,
				'-',
				A2(elm_lang$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.p)) + ('-space-x-' + (mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.em.a) + ('-space-y-' + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.em.b)))))));
		case 8:
			var pos = style.a;
			return 'grid-pos-' + (elm_lang$core$String$fromInt(pos.I) + ('-' + (elm_lang$core$String$fromInt(pos.c2) + ('-' + (elm_lang$core$String$fromInt(pos.cq) + ('-' + elm_lang$core$String$fromInt(pos.bg)))))));
		case 10:
			var selector = style.a;
			var subStyle = style.b;
			return A2(
				elm_lang$core$String$join,
				' ',
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$psuedoClassName(selector),
					A2(elm_lang$core$List$map, mdgriffith$stylish_elephants$Internal$Model$getStyleName, subStyle)));
		default:
			return 'transformation';
	}
};
var mdgriffith$stylish_elephants$Internal$Model$reduceStyles = F2(
	function (style, _n0) {
		var cache = _n0.a;
		var existing = _n0.b;
		var styleName = mdgriffith$stylish_elephants$Internal$Model$getStyleName(style);
		return A2(elm_lang$core$Set$member, styleName, cache) ? _Utils_Tuple2(cache, existing) : _Utils_Tuple2(
			A2(elm_lang$core$Set$insert, styleName, cache),
			A2(elm_lang$core$List$cons, style, existing));
	});
var elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (!_n0.$) {
			var x = _n0.a;
			return A2(elm_lang$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm_lang$core$List$foldr,
			elm_lang$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm_lang$core$Tuple$mapSecond = F2(
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
var elm_lang$core$String$fromFloat = _String_fromNumber;
var mdgriffith$stylish_elephants$Internal$Model$formatColor = function (_n0) {
	var red = _n0.a;
	var green = _n0.b;
	var blue = _n0.c;
	var alpha = _n0.d;
	return 'rgba(' + (elm_lang$core$String$fromInt(
		elm_lang$core$Basics$round(red * 255)) + ((',' + elm_lang$core$String$fromInt(
		elm_lang$core$Basics$round(green * 255))) + ((',' + elm_lang$core$String$fromInt(
		elm_lang$core$Basics$round(blue * 255))) + (',' + (elm_lang$core$String$fromFloat(alpha) + ')')))));
};
var mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		elm_lang$core$String$join,
		' ',
		A2(
			elm_lang$core$List$filterMap,
			elm_lang$core$Basics$identity,
			_List_fromArray(
				[
					shadow.bi ? elm_lang$core$Maybe$Just('inset') : elm_lang$core$Maybe$Nothing,
					elm_lang$core$Maybe$Just(
					elm_lang$core$String$fromFloat(shadow.dO.a) + 'px'),
					elm_lang$core$Maybe$Just(
					elm_lang$core$String$fromFloat(shadow.dO.b) + 'px'),
					elm_lang$core$Maybe$Just(
					elm_lang$core$String$fromFloat(shadow.cL) + 'px'),
					elm_lang$core$Maybe$Just(
					elm_lang$core$String$fromFloat(shadow.B) + 'px'),
					elm_lang$core$Maybe$Just(
					mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.j))
				])));
};
var mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle = function (focus) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$Style,
		'.se:focus .focusable, .se.focusable:focus',
		A2(
			elm_lang$core$List$filterMap,
			elm_lang$core$Basics$identity,
			_List_fromArray(
				[
					A2(
					elm_lang$core$Maybe$map,
					function (color) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'border-color',
							mdgriffith$stylish_elephants$Internal$Model$formatColor(color));
					},
					focus.cO),
					A2(
					elm_lang$core$Maybe$map,
					function (color) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'background-color',
							mdgriffith$stylish_elephants$Internal$Model$formatColor(color));
					},
					focus.cF),
					A2(
					elm_lang$core$Maybe$map,
					function (shadow) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'box-shadow',
							mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(
								{
									cL: shadow.cL,
									j: shadow.j,
									bi: false,
									dO: A2(
										elm_lang$core$Tuple$mapSecond,
										elm_lang$core$Basics$toFloat,
										A2(elm_lang$core$Tuple$mapFirst, elm_lang$core$Basics$toFloat, shadow.dO)),
									B: shadow.B
								}));
					},
					focus.ei),
					elm_lang$core$Maybe$Just(
					A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'outline', 'none'))
				])));
};
var elm_lang$html$Html$div = _VirtualDom_node('div');
var elm_lang$json$Json$Encode$string = _Json_wrap;
var elm_lang$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm_lang$json$Json$Encode$string(string));
	});
var elm_lang$html$Html$Attributes$class = elm_lang$html$Html$Attributes$stringProperty('className');
var elm_lang$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var mdgriffith$stylish_elephants$Internal$Style$classes = {ae: 'above', ct: 'self-bottom', cu: 'self-center-x', cv: 'self-center-y', cw: 'align-container-bottom', cx: 'align-container-center-x', cy: 'align-container-center-y', cz: 'align-container-right', bv: 'self-left', bw: 'self-right', cA: 'self-top', cC: 'se', cG: 'behind', ah: 'below', bA: 'bold', cP: 'border-dashed', cQ: 'border-dotted', aG: 'border-none', cR: 'border-solid', aH: 'capture-pointer-events', cZ: 'clip', c_: 'clip-x', c$: 'clip-y', D: 'column', aK: 'container', aL: 'content-bottom', ai: 'content-center-x', V: 'content-center-y', bD: 'content-left', aM: 'content-right', c3: 'content-top', c4: 'cursor-pointer', aN: 'cursor-text', dm: 'grid', am: 'height-content', bh: 'height-exact', bO: 'height-fill', an: 'infront', bR: 'italic', dM: 'no-text-selection', dQ: 'on-left', dS: 'on-right', aX: 'opaque', aY: 'overflow-hidden', bU: 'page', bV: 'paragraph', aZ: 'pass-pointer-events', ec: 'style-elements', I: 'row', ef: 'scrollbars', eg: 'scrollbars-x', eh: 'scrollbars-y', ej: 'el', el: 'space-evenly', b8: 'strike', et: 'text', cb: 'text-center', cc: 'text-extra-bold', cd: 'text-extra-light', ce: 'text-heavy', cf: 'text-justify', a5: 'text-justify-all', cg: 'text-left', ch: 'text-light', ci: 'text-medium', cj: 'text-normal-weight', ck: 'text-right', cl: 'text-semi-bold', cm: 'text-thin', cn: 'text-unitalicized', ez: 'transparent', cp: 'underline', cr: 'width-content', a8: 'width-exact', cs: 'width-fill'};
var mdgriffith$stylish_elephants$Internal$Model$textElement = function (str) {
	return A3(
		elm_lang$virtual_dom$VirtualDom$node,
		'div',
		_List_fromArray(
			[
				A2(
				elm_lang$virtual_dom$VirtualDom$property,
				'className',
				elm_lang$json$Json$Encode$string(
					A2(
						elm_lang$core$String$join,
						' ',
						_List_fromArray(
							[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.et, mdgriffith$stylish_elephants$Internal$Style$classes.cr, mdgriffith$stylish_elephants$Internal$Style$classes.am]))))
			]),
		_List_fromArray(
			[
				elm_lang$virtual_dom$VirtualDom$text(str)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$renderNearbyGroupAbsolute = function (nearbys) {
	var create = function (_n2) {
		var location = _n2.a;
		var elem = _n2.b;
		return A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class(
					function () {
						switch (location) {
							case 0:
								return A2(
									elm_lang$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.ej, mdgriffith$stylish_elephants$Internal$Style$classes.ae]));
							case 1:
								return A2(
									elm_lang$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.ej, mdgriffith$stylish_elephants$Internal$Style$classes.ah]));
							case 2:
								return A2(
									elm_lang$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.ej, mdgriffith$stylish_elephants$Internal$Style$classes.dS]));
							case 3:
								return A2(
									elm_lang$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.ej, mdgriffith$stylish_elephants$Internal$Style$classes.dQ]));
							case 4:
								return A2(
									elm_lang$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.ej, mdgriffith$stylish_elephants$Internal$Style$classes.an]));
							default:
								return A2(
									elm_lang$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.ej, mdgriffith$stylish_elephants$Internal$Style$classes.cG]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 3:
							return elm_lang$html$Html$text('');
						case 2:
							var str = elem.a;
							return mdgriffith$stylish_elephants$Internal$Model$textElement(str);
						case 0:
							var html = elem.a;
							return html(mdgriffith$stylish_elephants$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.$7, elm_lang$core$Maybe$Nothing, mdgriffith$stylish_elephants$Internal$Model$asEl);
					}
				}()
				]));
	};
	return A2(elm_lang$core$List$map, create, nearbys);
};
var elm_lang$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var mdgriffith$stylish_elephants$Internal$Model$renderNode = F4(
	function (_n0, children, styles, context) {
		var alignment = _n0.w;
		var attributes = _n0.a;
		var node = _n0.f;
		var width = _n0.cq;
		var height = _n0.bg;
		var createNode = F3(
			function (nodeName, attrs, withStyles) {
				if (children.$ === 1) {
					var keyed = children.a;
					return A3(
						elm_lang$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							if (withStyles.$ === 1) {
								return keyed;
							} else {
								var stylesheet = withStyles.a;
								return A2(
									elm_lang$core$List$cons,
									_Utils_Tuple2(
										'stylesheet',
										A3(
											elm_lang$virtual_dom$VirtualDom$node,
											'style',
											_List_fromArray(
												[
													elm_lang$html$Html$Attributes$class('stylesheet')
												]),
											_List_fromArray(
												[
													elm_lang$html$Html$text(stylesheet)
												]))),
									keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A3(
						elm_lang$virtual_dom$VirtualDom$node,
						nodeName,
						attrs,
						function () {
							if (withStyles.$ === 1) {
								return unkeyed;
							} else {
								var stylesheet = withStyles.a;
								return A2(
									elm_lang$core$List$cons,
									A3(
										elm_lang$virtual_dom$VirtualDom$node,
										'style',
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('stylesheet')
											]),
										_List_fromArray(
											[
												elm_lang$html$Html$text(stylesheet)
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
						elm_lang$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A3(
								createNode,
								internal,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class(mdgriffith$stylish_elephants$Internal$Style$classes.cC + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.ej))
									]),
								styles)
							]));
			}
		}();
		switch (context) {
			case 0:
				if ((!width.$) && (width.a.$ === 2)) {
					return html;
				} else {
					_n3$2:
					while (true) {
						if ((alignment.$ === 1) && (!alignment.a.$)) {
							switch (alignment.a.a) {
								case 2:
									var _n4 = alignment.a.a;
									return A3(
										elm_lang$virtual_dom$VirtualDom$node,
										'u',
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class(
												A2(
													elm_lang$core$String$join,
													' ',
													_List_fromArray(
														[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.ej, mdgriffith$stylish_elephants$Internal$Style$classes.aK, mdgriffith$stylish_elephants$Internal$Style$classes.V, mdgriffith$stylish_elephants$Internal$Style$classes.cz])))
											]),
										_List_fromArray(
											[html]));
								case 1:
									var _n5 = alignment.a.a;
									return A3(
										elm_lang$virtual_dom$VirtualDom$node,
										's',
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class(
												A2(
													elm_lang$core$String$join,
													' ',
													_List_fromArray(
														[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.ej, mdgriffith$stylish_elephants$Internal$Style$classes.aK, mdgriffith$stylish_elephants$Internal$Style$classes.V, mdgriffith$stylish_elephants$Internal$Style$classes.cx])))
											]),
										_List_fromArray(
											[html]));
								default:
									break _n3$2;
							}
						} else {
							break _n3$2;
						}
					}
					return html;
				}
			case 1:
				if ((!height.$) && (height.a.$ === 2)) {
					return html;
				} else {
					_n7$2:
					while (true) {
						if ((alignment.$ === 1) && (!alignment.b.$)) {
							switch (alignment.b.a) {
								case 1:
									var _n8 = alignment.b.a;
									return A3(
										elm_lang$virtual_dom$VirtualDom$node,
										's',
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class(
												A2(
													elm_lang$core$String$join,
													' ',
													_List_fromArray(
														[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.ej, mdgriffith$stylish_elephants$Internal$Style$classes.aK, mdgriffith$stylish_elephants$Internal$Style$classes.cy])))
											]),
										_List_fromArray(
											[html]));
								case 2:
									var _n9 = alignment.b.a;
									return A3(
										elm_lang$virtual_dom$VirtualDom$node,
										'u',
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class(
												A2(
													elm_lang$core$String$join,
													' ',
													_List_fromArray(
														[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.ej, mdgriffith$stylish_elephants$Internal$Style$classes.aK, mdgriffith$stylish_elephants$Internal$Style$classes.cw])))
											]),
										_List_fromArray(
											[html]));
								default:
									break _n7$2;
							}
						} else {
							break _n7$2;
						}
					}
					return html;
				}
			default:
				return html;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$textElementFill = function (str) {
	return A3(
		elm_lang$virtual_dom$VirtualDom$node,
		'div',
		_List_fromArray(
			[
				A2(
				elm_lang$virtual_dom$VirtualDom$property,
				'className',
				elm_lang$json$Json$Encode$string(
					A2(
						elm_lang$core$String$join,
						' ',
						_List_fromArray(
							[mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.et, mdgriffith$stylish_elephants$Internal$Style$classes.cs, mdgriffith$stylish_elephants$Internal$Style$classes.bO]))))
			]),
		_List_fromArray(
			[
				elm_lang$virtual_dom$VirtualDom$text(str)
			]));
};
var elm_lang$core$Basics$negate = function (n) {
	return -n;
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
		elm_lang$core$String$join,
		', ',
		A2(elm_lang$core$List$map, fontName, families));
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
						return elm_lang$core$Maybe$Just('@import url(\'' + (url + '\');'));
					} else {
						return elm_lang$core$Maybe$Nothing;
					}
				};
				return elm_lang$core$Maybe$Just(
					A2(
						elm_lang$core$String$join,
						'\n',
						A2(elm_lang$core$List$filterMap, getImports, typefaces)));
			} else {
				return elm_lang$core$Maybe$Nothing;
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
						elm_lang$core$List$foldl,
						renderProps(force),
						'',
						props) + '\n}'));
				} else {
					var pseudo = maybePseudo.a;
					switch (pseudo) {
						case 1:
							return selector + (':hover {' + (A3(
								elm_lang$core$List$foldl,
								renderProps(force),
								'',
								props) + '\n}'));
						case 0:
							var renderedProps = A3(
								elm_lang$core$List$foldl,
								renderProps(force),
								'',
								props);
							return A2(
								elm_lang$core$String$join,
								'\n',
								_List_fromArray(
									[selector + (':focus {' + (renderedProps + '\n}')), '.se:focus ~ ' + (selector + (':not(.focus)  {' + (renderedProps + '\n}'))), '.se:focus ' + (selector + ('  {' + (renderedProps + '\n}')))]));
						default:
							return selector + (':active {' + (A3(
								elm_lang$core$List$foldl,
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
							elm_lang$core$Basics$max,
							0,
							A2(elm_lang$core$Basics$min, 1, 1 - transparency));
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
									elm_lang$core$String$fromFloat(opacity)),
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'pointer-events', 'auto')
								]));
					case 2:
						var i = rule.a;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.font-size-' + elm_lang$core$String$fromInt(i),
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'font-size',
									elm_lang$core$String$fromInt(i) + 'px')
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
						var yPx = elm_lang$core$String$fromInt(y) + 'px';
						var xPx = elm_lang$core$String$fromInt(x) + 'px';
						var row = '.' + function ($) {
							return $.I;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var right = '.' + function ($) {
							return $.bw;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var paragraph = '.' + function ($) {
							return $.bV;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var page = '.' + function ($) {
							return $.bU;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var left = '.' + function ($) {
							return $.bv;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var column = '.' + function ($) {
							return $.D;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var _class = '.spacing-' + (elm_lang$core$String$fromInt(x) + ('-' + elm_lang$core$String$fromInt(y)));
						var any = '.' + function ($) {
							return $.cC;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						return A3(
							elm_lang$core$List$foldl,
							elm_lang$core$Basics$append,
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
											'calc(1em + ' + (elm_lang$core$String$fromInt(y) + 'px)'))
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
											'calc(1em + ' + (elm_lang$core$String$fromInt(y) + 'px)'))
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
											elm_lang$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
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
											elm_lang$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
										]))
								]));
					case 6:
						var top = rule.a;
						var right = rule.b;
						var bottom = rule.c;
						var left = rule.d;
						var _class = '.pad-' + (elm_lang$core$String$fromInt(top) + ('-' + (elm_lang$core$String$fromInt(right) + ('-' + (elm_lang$core$String$fromInt(bottom) + ('-' + elm_lang$core$String$fromInt(left)))))));
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
									elm_lang$core$String$fromInt(top) + ('px ' + (elm_lang$core$String$fromInt(right) + ('px ' + (elm_lang$core$String$fromInt(bottom) + ('px ' + (elm_lang$core$String$fromInt(left) + 'px')))))))
								]));
					case 7:
						var template = rule.a;
						var toGridLengthHelper = F3(
							function (minimum, maximum, x) {
								switch (x.$) {
									case 0:
										var px = x.a;
										return elm_lang$core$String$fromInt(px) + 'px';
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
												return 'minmax(max-content, ' + (elm_lang$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n2.b.$ === 1) {
												var minSize = _n2.a.a;
												var _n5 = _n2.b;
												return 'minmax(' + (elm_lang$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
											} else {
												var minSize = _n2.a.a;
												var maxSize = _n2.b.a;
												return 'minmax(' + (elm_lang$core$String$fromInt(minSize) + ('px, ' + (elm_lang$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 2:
										var i = x.a;
										var _n7 = _Utils_Tuple2(minimum, maximum);
										if (_n7.a.$ === 1) {
											if (_n7.b.$ === 1) {
												var _n8 = _n7.a;
												var _n9 = _n7.b;
												return elm_lang$core$String$fromInt(i) + 'fr';
											} else {
												var _n11 = _n7.a;
												var maxSize = _n7.b.a;
												return 'minmax(max-content, ' + (elm_lang$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n7.b.$ === 1) {
												var minSize = _n7.a.a;
												var _n10 = _n7.b;
												return 'minmax(' + (elm_lang$core$String$fromInt(minSize) + ('px, ' + (elm_lang$core$String$fromInt(i) + ('fr' + 'fr)'))));
											} else {
												var minSize = _n7.a.a;
												var maxSize = _n7.b.a;
												return 'minmax(' + (elm_lang$core$String$fromInt(minSize) + ('px, ' + (elm_lang$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 3:
										var m = x.a;
										var len = x.b;
										return A3(
											toGridLengthHelper,
											elm_lang$core$Maybe$Just(m),
											maximum,
											len);
									default:
										var m = x.a;
										var len = x.b;
										return A3(
											toGridLengthHelper,
											minimum,
											elm_lang$core$Maybe$Just(m),
											len);
								}
							});
						var toGridLength = function (x) {
							return A3(toGridLengthHelper, elm_lang$core$Maybe$Nothing, elm_lang$core$Maybe$Nothing, x);
						};
						var xSpacing = toGridLength(template.em.a);
						var ySpacing = toGridLength(template.em.b);
						var rows = function (x) {
							return 'grid-template-rows: ' + (x + ';');
						}(
							A2(
								elm_lang$core$String$join,
								' ',
								A2(elm_lang$core$List$map, toGridLength, template.ed)));
						var msRows = function (x) {
							return '-ms-grid-rows: ' + (x + ';');
						}(
							A2(
								elm_lang$core$String$join,
								ySpacing,
								A2(elm_lang$core$List$map, toGridLength, template.p)));
						var msColumns = function (x) {
							return '-ms-grid-columns: ' + (x + ';');
						}(
							A2(
								elm_lang$core$String$join,
								ySpacing,
								A2(elm_lang$core$List$map, toGridLength, template.p)));
						var gapY = 'grid-row-gap:' + (toGridLength(template.em.b) + ';');
						var gapX = 'grid-column-gap:' + (toGridLength(template.em.a) + ';');
						var columns = function (x) {
							return 'grid-template-columns: ' + (x + ';');
						}(
							A2(
								elm_lang$core$String$join,
								' ',
								A2(elm_lang$core$List$map, toGridLength, template.p)));
						var _class = '.grid-rows-' + (A2(
							elm_lang$core$String$join,
							'-',
							A2(elm_lang$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.ed)) + ('-cols-' + (A2(
							elm_lang$core$String$join,
							'-',
							A2(elm_lang$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.p)) + ('-space-x-' + (mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.em.a) + ('-space-y-' + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.em.b)))))));
						var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
						var supports = '@supports (display:grid) {' + (modernGrid + '}');
						var base = _class + ('{' + (msColumns + (msRows + '}')));
						return _Utils_ap(base, supports);
					case 8:
						var position = rule.a;
						var msPosition = A2(
							elm_lang$core$String$join,
							' ',
							_List_fromArray(
								[
									'-ms-grid-row: ' + (elm_lang$core$String$fromInt(position.I) + ';'),
									'-ms-grid-row-span: ' + (elm_lang$core$String$fromInt(position.bg) + ';'),
									'-ms-grid-column: ' + (elm_lang$core$String$fromInt(position.c2) + ';'),
									'-ms-grid-column-span: ' + (elm_lang$core$String$fromInt(position.cq) + ';')
								]));
						var modernPosition = A2(
							elm_lang$core$String$join,
							' ',
							_List_fromArray(
								[
									'grid-row: ' + (elm_lang$core$String$fromInt(position.I) + (' / ' + (elm_lang$core$String$fromInt(position.I + position.bg) + ';'))),
									'grid-column: ' + (elm_lang$core$String$fromInt(position.c2) + (' / ' + (elm_lang$core$String$fromInt(position.c2 + position.cq) + ';')))
								]));
						var _class = '.grid-pos-' + (elm_lang$core$String$fromInt(position.I) + ('-' + (elm_lang$core$String$fromInt(position.c2) + ('-' + (elm_lang$core$String$fromInt(position.cq) + ('-' + elm_lang$core$String$fromInt(position.bg)))))));
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
										elm_lang$core$Maybe$Just(0),
										false);
								case 2:
									return A3(
										renderStyleRule,
										style,
										elm_lang$core$Maybe$Just(2),
										false);
								default:
									var _n13 = options.dn;
									switch (_n13) {
										case 0:
											return '';
										case 1:
											return A3(
												renderStyleRule,
												style,
												elm_lang$core$Maybe$Just(1),
												false);
										default:
											return A3(renderStyleRule, style, elm_lang$core$Maybe$Nothing, true);
									}
							}
						};
						return A2(
							elm_lang$core$String$join,
							' ',
							A2(elm_lang$core$List$map, renderPseudoRule, styles));
					default:
						return '';
				}
			});
		var combine = F2(
			function (style, rendered) {
				return _Utils_update(
					rendered,
					{
						a$: _Utils_ap(
							rendered.a$,
							A3(renderStyleRule, style, elm_lang$core$Maybe$Nothing, false)),
						aD: function () {
							var _n15 = renderTopLevels(style);
							if (_n15.$ === 1) {
								return rendered.aD;
							} else {
								var topLevel = _n15.a;
								return _Utils_ap(rendered.aD, topLevel);
							}
						}()
					});
			});
		return function (_n14) {
			var rules = _n14.a$;
			var topLevel = _n14.aD;
			return _Utils_ap(topLevel, rules);
		}(
			A3(
				elm_lang$core$List$foldl,
				combine,
				{a$: '', aD: ''},
				stylesheet));
	});
var mdgriffith$stylish_elephants$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		return A3(
			elm_lang$virtual_dom$VirtualDom$node,
			'style',
			_List_Nil,
			_List_fromArray(
				[
					elm_lang$html$Html$text(
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
var mdgriffith$stylish_elephants$Internal$Style$Self = elm_lang$core$Basics$identity;
var mdgriffith$stylish_elephants$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm_lang$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm_lang$core$List$foldr, elm_lang$core$List$cons, ys, xs);
		}
	});
var elm_lang$core$List$concat = function (lists) {
	return A3(elm_lang$core$List$foldr, elm_lang$core$List$append, _List_Nil, lists);
};
var elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return elm_lang$core$List$concat(
			A2(elm_lang$core$List$map, f, list));
	});
var mdgriffith$stylish_elephants$Internal$Style$Content = elm_lang$core$Basics$identity;
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
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c3);
		case 1:
			var _n2 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aL);
		case 2:
			var _n3 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aM);
		case 3:
			var _n4 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bD);
		case 4:
			var _n5 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ai);
		default:
			var _n6 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.V);
	}
};
var mdgriffith$stylish_elephants$Internal$Style$selfName = function (desc) {
	switch (desc) {
		case 0:
			var _n1 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cA);
		case 1:
			var _n2 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ct);
		case 2:
			var _n3 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bw);
		case 3:
			var _n4 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bv);
		case 4:
			var _n5 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cu);
		default:
			var _n6 = desc;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cv);
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
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cC),
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
		A2(elm_lang$core$List$concatMap, createDescription, mdgriffith$stylish_elephants$Internal$Style$alignments));
};
var mdgriffith$stylish_elephants$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Child,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cC),
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
		A2(elm_lang$core$List$concatMap, createDescription, mdgriffith$stylish_elephants$Internal$Style$alignments));
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
var mdgriffith$stylish_elephants$Internal$Style$Intermediate = elm_lang$core$Basics$identity;
var mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return {aJ: closing, i: _List_Nil, H: _List_Nil, A: selector};
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
								H: A2(
									elm_lang$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.H)
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
									elm_lang$core$List$cons,
									{aJ: '\n}', i: _List_Nil, H: props, A: '@supports (' + (prop + (':' + (value + (') {' + parent.A))))},
									rendered.i)
							});
					case 4:
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								i: A2(
									elm_lang$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.A + (' + ' + selector), ''),
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
									elm_lang$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.A + (' > ' + child), ''),
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
									elm_lang$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(
											mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.A, descriptor),
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
									elm_lang$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.A, ''),
										batched),
									rendered.i)
							});
				}
			});
		return A3(elm_lang$core$List$foldr, generateIntermediates, parent, rulesToRender);
	});
var mdgriffith$stylish_elephants$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return A2(
			elm_lang$core$String$join,
			'',
			A2(
				elm_lang$core$List$map,
				function (_n3) {
					var x = _n3.a;
					var y = _n3.b;
					return '' + (x + (':' + (y + ';')));
				},
				values));
	};
	var renderClass = function (rule) {
		var _n2 = rule.H;
		if (!_n2.b) {
			return '';
		} else {
			return rule.A + ('{' + (renderValues(rule.H) + (rule.aJ + '}')));
		}
	};
	var renderIntermediate = function (_n0) {
		var rule = _n0;
		return _Utils_ap(
			renderClass(rule),
			A2(
				elm_lang$core$String$join,
				'',
				A2(elm_lang$core$List$map, renderIntermediate, rule.i)));
	};
	return A2(
		elm_lang$core$String$join,
		'',
		A2(
			elm_lang$core$List$map,
			renderIntermediate,
			A3(
				elm_lang$core$List$foldr,
				F2(
					function (_n1, existing) {
						var name = _n1.a;
						var styleRules = _n1.b;
						return A2(
							elm_lang$core$List$cons,
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
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cC) + ':focus',
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'outline', 'none')
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ec),
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'min-height', '100%'),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.se.el.height-content',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bO),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.wireframe .' + mdgriffith$stylish_elephants$Internal$Style$classes.cC,
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'outline', '2px dashed black')
							]))
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cC),
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
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dM),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'user-select', 'none'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-ms-user-select', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c4),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'cursor', 'pointer')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aN),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'cursor', 'text')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aZ),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aH),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'nauto')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ez),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aX),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.hover-transparent:hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.hover-opaque:hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.hover-transparent:hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.hover-opaque:hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.focus-transparent:focus',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.focus-opaque:focus',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.active-transparent:active',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.active-opaque:active',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.transition',
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Prop,
								'transition',
								A2(
									elm_lang$core$String$join,
									', ',
									A2(
										elm_lang$core$List$map,
										function (x) {
											return x + ' 160ms';
										},
										_List_fromArray(
											['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aY),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'hidden'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-ms-overflow-style', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ef),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'auto'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eg),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-x', 'auto'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.I),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.eh),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-y', 'auto'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.D),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cZ),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c_),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-x', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.c$),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-y', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cr),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', 'auto')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aG),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-width', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cP),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'dashed')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cQ),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'dotted')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cR),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'solid')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.et),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-block')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ej),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								'.se-button',
								_List_fromArray(
									[
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.et),
										_List_fromArray(
											[
												A2(
												mdgriffith$stylish_elephants$Internal$Style$Descriptor,
												mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bO),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
													])),
												A2(
												mdgriffith$stylish_elephants$Internal$Style$Descriptor,
												mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cs),
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
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bO),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cs),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cr),
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
														mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cC),
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
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.I),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'row'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cC),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', '0%'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.a8),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bO),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'.height-fill-portion',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'.height-fill-between',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										'.aligned-vertically',
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cs),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aK),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.align-container-right',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:first-of-type.align-container-center-x',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cu),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-left', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.align-container-center-x',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cu),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-right', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:only-of-type.align-container-center-x',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cv),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.align-container-center-x ~ u',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.align-container-right ~ s.align-container-center-x',
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
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.el),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.D),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bO),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cs),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'.width-fill-portion',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'.width-fill-between',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										'.aligned-horizontally',
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cr),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'left')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.align-container-bottom',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:first-of-type.align-container-center-y',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cv),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', '0 !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.align-container-center-y',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cv),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', '0 !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:only-of-type.align-container-center-y',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cv),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.align-container-center-y ~ u',
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.align-container-bottom ~ s.align-container-center-y',
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
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.aK),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.el),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dm),
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
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bU),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'block'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cC + ':first-child'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(
									mdgriffith$stylish_elephants$Internal$Style$classes.cC + (mdgriffith$stylish_elephants$Internal$Style$selfName(3) + ':first-child + .se')),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(
									mdgriffith$stylish_elephants$Internal$Style$classes.cC + (mdgriffith$stylish_elephants$Internal$Style$selfName(2) + ':first-child + .se')),
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
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bV),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'block'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.et),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ej),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.an),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cG),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ae),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ah),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dS),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dQ),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.et),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.I),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.D),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dm),
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
							return A2(elm_lang$core$List$map, fn, mdgriffith$stylish_elephants$Internal$Style$locations);
						}(
							function (loc) {
								switch (loc) {
									case 0:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ae),
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
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bO),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
														])),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cs),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
														])),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cC),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									case 1:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ah),
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
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bO),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
														]))
												]));
									case 2:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dS),
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
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.dQ),
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
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.an),
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
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cC),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									default:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cG),
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
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cm),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '100')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cd),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '200')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ch),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '300')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cj),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '400')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ci),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '500')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cl),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '600')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bA),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '700')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cc),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '800')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ce),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '900')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bR),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'italic')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.b8),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'line-through')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cp),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'underline'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration-skip', 'ink')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cn),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'normal')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cf),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'justify')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.a5),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'justify-all')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cb),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'center')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.ck),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'right')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cg),
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
			function (_n15, _n16) {
				var key = _n15.a;
				var child = _n15.b;
				var htmls = _n16.a;
				var existingStyles = _n16.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.$7, elm_lang$core$Maybe$Nothing, context)),
								htmls),
							_Utils_ap(styled.ep, existingStyles));
					case 2:
						var str = child.a;
						return (_Utils_eq(
							rendered.cq,
							elm_lang$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Content)) && (_Utils_eq(
							rendered.bg,
							elm_lang$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Content)) && _Utils_eq(context, mdgriffith$stylish_elephants$Internal$Model$asEl))) ? _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								_Utils_Tuple2(
									key,
									elm_lang$html$Html$text(str)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
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
			function (child, _n13) {
				var htmls = _n13.a;
				var existingStyles = _n13.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								A2(styled.$7, elm_lang$core$Maybe$Nothing, context),
								htmls),
							_Utils_ap(styled.ep, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_eq(context, mdgriffith$stylish_elephants$Internal$Model$asEl) ? _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$textElementFill(str),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
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
					elm_lang$core$Tuple$mapFirst,
					mdgriffith$stylish_elephants$Internal$Model$Keyed,
					A3(
						elm_lang$core$List$foldr,
						gatherKeyed,
						_Utils_Tuple2(_List_Nil, rendered.ep),
						keyedChildren));
			} else {
				var unkeyedChildren = children.a;
				return A2(
					elm_lang$core$Tuple$mapFirst,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed,
					A3(
						elm_lang$core$List$foldr,
						gather,
						_Utils_Tuple2(_List_Nil, rendered.ep),
						unkeyedChildren));
			}
		}();
		var htmlChildren = _n0.a;
		var styleChildren = _n0.b;
		switch (embedMode.$) {
			case 0:
				var renderedChildren = function () {
					var _n4 = A2(elm_lang$core$Maybe$map, mdgriffith$stylish_elephants$Internal$Model$renderNearbyGroupAbsolute, rendered.P);
					if (_n4.$ === 1) {
						return htmlChildren;
					} else {
						var nearby = _n4.a;
						if (htmlChildren.$ === 1) {
							var keyed = htmlChildren.a;
							return mdgriffith$stylish_elephants$Internal$Model$Keyed(
								_Utils_ap(
									keyed,
									A2(
										elm_lang$core$List$map,
										function (x) {
											return _Utils_Tuple2('nearby-elements-pls', x);
										},
										nearby)));
						} else {
							var unkeyed = htmlChildren.a;
							return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
								_Utils_ap(unkeyed, nearby));
						}
					}
				}();
				if (!styleChildren.b) {
					return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
						A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm_lang$core$Maybe$Nothing));
				} else {
					return mdgriffith$stylish_elephants$Internal$Model$Styled(
						{
							$7: A2(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren),
							ep: styleChildren
						});
				}
			case 1:
				var options = embedMode.a;
				var styles = A3(
					elm_lang$core$List$foldr,
					mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
					_Utils_Tuple2(
						elm_lang$core$Set$empty,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.al)
							])),
					styleChildren).b;
				var renderedChildren = function () {
					var _n6 = A2(elm_lang$core$Maybe$map, mdgriffith$stylish_elephants$Internal$Model$renderNearbyGroupAbsolute, rendered.P);
					if (_n6.$ === 1) {
						if (htmlChildren.$ === 1) {
							var keyed = htmlChildren.a;
							return mdgriffith$stylish_elephants$Internal$Model$Keyed(
								A2(
									elm_lang$core$List$cons,
									_Utils_Tuple2(
										'static-stylesheet',
										A3(
											elm_lang$html$Html$node,
											'style',
											_List_Nil,
											_List_fromArray(
												[
													elm_lang$html$Html$text(mdgriffith$stylish_elephants$Internal$Style$rules)
												]))),
									A2(
										elm_lang$core$List$cons,
										_Utils_Tuple2(
											'dynamic-stylesheet',
											A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles)),
										keyed)));
						} else {
							var unkeyed = htmlChildren.a;
							return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
								A2(
									elm_lang$core$List$cons,
									A3(
										elm_lang$html$Html$node,
										'style',
										_List_Nil,
										_List_fromArray(
											[
												elm_lang$html$Html$text(mdgriffith$stylish_elephants$Internal$Style$rules)
											])),
									A2(
										elm_lang$core$List$cons,
										A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles),
										unkeyed)));
						}
					} else {
						var nearby = _n6.a;
						if (htmlChildren.$ === 1) {
							var keyed = htmlChildren.a;
							return mdgriffith$stylish_elephants$Internal$Model$Keyed(
								A2(
									elm_lang$core$List$cons,
									_Utils_Tuple2(
										'static-stylesheet',
										A3(
											elm_lang$html$Html$node,
											'style',
											_List_Nil,
											_List_fromArray(
												[
													elm_lang$html$Html$text(mdgriffith$stylish_elephants$Internal$Style$rules)
												]))),
									A2(
										elm_lang$core$List$cons,
										_Utils_Tuple2(
											'dynamic-stylesheet',
											A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles)),
										_Utils_ap(
											keyed,
											A2(
												elm_lang$core$List$map,
												function (x) {
													return _Utils_Tuple2('nearby-elements-pls', x);
												},
												nearby)))));
						} else {
							var unkeyed = htmlChildren.a;
							return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
								A2(
									elm_lang$core$List$cons,
									A3(
										elm_lang$html$Html$node,
										'style',
										_List_Nil,
										_List_fromArray(
											[
												elm_lang$html$Html$text(mdgriffith$stylish_elephants$Internal$Style$rules)
											])),
									A2(
										elm_lang$core$List$cons,
										A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles),
										_Utils_ap(unkeyed, nearby))));
						}
					}
				}();
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm_lang$core$Maybe$Nothing));
			default:
				var options = embedMode.a;
				var styles = A3(
					elm_lang$core$List$foldr,
					mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
					_Utils_Tuple2(
						elm_lang$core$Set$empty,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.al)
							])),
					styleChildren).b;
				var renderedChildren = function () {
					var _n9 = A2(elm_lang$core$Maybe$map, mdgriffith$stylish_elephants$Internal$Model$renderNearbyGroupAbsolute, rendered.P);
					if (_n9.$ === 1) {
						if (htmlChildren.$ === 1) {
							var keyed = htmlChildren.a;
							return mdgriffith$stylish_elephants$Internal$Model$Keyed(
								A2(
									elm_lang$core$List$cons,
									_Utils_Tuple2(
										'dynamic-stylesheet',
										A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles)),
									keyed));
						} else {
							var unkeyed = htmlChildren.a;
							return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
								A2(
									elm_lang$core$List$cons,
									A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles),
									unkeyed));
						}
					} else {
						var nearby = _n9.a;
						if (htmlChildren.$ === 1) {
							var keyed = htmlChildren.a;
							return mdgriffith$stylish_elephants$Internal$Model$Keyed(
								A2(
									elm_lang$core$List$cons,
									_Utils_Tuple2(
										'dynamic-stylesheet',
										A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles)),
									_Utils_ap(
										keyed,
										A2(
											elm_lang$core$List$map,
											function (x) {
												return _Utils_Tuple2('nearby-elements-pls', x);
											},
											nearby))));
						} else {
							var unkeyed = htmlChildren.a;
							return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
								A2(
									elm_lang$core$List$cons,
									A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles),
									_Utils_ap(unkeyed, nearby)));
						}
					}
				}();
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm_lang$core$Maybe$Nothing));
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$Attr = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$htmlClass = function (cls) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		A2(
			elm_lang$virtual_dom$VirtualDom$property,
			'className',
			elm_lang$json$Json$Encode$string(cls)));
};
var mdgriffith$stylish_elephants$Internal$Model$contextClasses = function (context) {
	switch (context) {
		case 0:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.cC + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.I));
		case 1:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.cC + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.D));
		case 2:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.cC + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.ej));
		case 3:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.cC + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.dm));
		case 4:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.cC + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.bV));
		default:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.cC + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.bU));
	}
};
var elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm_lang$core$Maybe$Nothing;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var elm_lang$core$Maybe$withDefault = F2(
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
			elm_lang$core$Maybe$map,
			function (_n9) {
				var x = _n9.a;
				var y = _n9.b;
				var z = _n9.c;
				return 'translate3d(' + (elm_lang$core$String$fromFloat(
					A2(elm_lang$core$Maybe$withDefault, 0, x)) + ('px, ' + (elm_lang$core$String$fromFloat(
					A2(elm_lang$core$Maybe$withDefault, 0, y)) + ('px, ' + (elm_lang$core$String$fromFloat(
					A2(elm_lang$core$Maybe$withDefault, 0, z)) + 'px)')))));
			},
			group.S);
		var scale = A2(
			elm_lang$core$Maybe$map,
			function (_n8) {
				var x = _n8.a;
				var y = _n8.b;
				var z = _n8.c;
				return 'scale3d(' + (elm_lang$core$String$fromFloat(x) + (', ' + (elm_lang$core$String$fromFloat(y) + (', ' + (elm_lang$core$String$fromFloat(z) + ')')))));
			},
			group._);
		var rotate = A2(
			elm_lang$core$Maybe$map,
			function (_n7) {
				var x = _n7.a;
				var y = _n7.b;
				var z = _n7.c;
				var angle = _n7.d;
				return 'rotate3d(' + (elm_lang$core$String$fromFloat(x) + (',' + (elm_lang$core$String$fromFloat(y) + (',' + (elm_lang$core$String$fromFloat(z) + (',' + (elm_lang$core$String$fromFloat(angle) + 'rad)')))))));
			},
			group.Z);
		var transformations = A2(
			elm_lang$core$List$filterMap,
			elm_lang$core$Basics$identity,
			_List_fromArray(
				[scale, translate, rotate]));
		var name = A2(
			elm_lang$core$String$join,
			'-',
			A2(
				elm_lang$core$List$filterMap,
				elm_lang$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						elm_lang$core$Maybe$map,
						function (_n4) {
							var x = _n4.a;
							var y = _n4.b;
							var z = _n4.c;
							return 'move-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm_lang$core$Maybe$withDefault, 0, x)) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm_lang$core$Maybe$withDefault, 0, y)) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm_lang$core$Maybe$withDefault, 0, z))))));
						},
						group.S),
						A2(
						elm_lang$core$Maybe$map,
						function (_n5) {
							var x = _n5.a;
							var y = _n5.b;
							var z = _n5.c;
							return 'scale' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(x) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(y) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(z)))));
						},
						group._),
						A2(
						elm_lang$core$Maybe$map,
						function (_n6) {
							var x = _n6.a;
							var y = _n6.b;
							var z = _n6.c;
							var angle = _n6.d;
							return 'rotate-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(x) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(y) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(z) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(angle)))))));
						},
						group.Z)
					])));
		if (!transformations.b) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var trans = transformations;
			var transforms = A2(elm_lang$core$String$join, ' ', trans);
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
			return elm_lang$core$Maybe$Just(
				_Utils_Tuple2(
					classOnElement,
					A3(mdgriffith$stylish_elephants$Internal$Model$Single, classInStylesheet, 'transform', transforms)));
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$finalize = function (gathered) {
	var addTextShadows = function (_n11) {
		var classes = _n11.a;
		var styles = _n11.b;
		var _n9 = gathered.ab;
		if (_n9.$ === 1) {
			return _Utils_Tuple2(classes, styles);
		} else {
			var _n10 = _n9.a;
			var shadowClass = _n10.a;
			var shades = _n10.b;
			return _Utils_Tuple2(
				A2(elm_lang$core$List$cons, shadowClass, classes),
				A2(
					elm_lang$core$List$cons,
					A3(mdgriffith$stylish_elephants$Internal$Model$Single, '.' + shadowClass, 'text-shadow', shades),
					styles));
		}
	};
	var addBoxShadows = function (_n8) {
		var classes = _n8.a;
		var styles = _n8.b;
		var _n6 = gathered.U;
		if (_n6.$ === 1) {
			return _Utils_Tuple2(classes, styles);
		} else {
			var _n7 = _n6.a;
			var shadowClass = _n7.a;
			var shades = _n7.b;
			return _Utils_Tuple2(
				A2(elm_lang$core$List$cons, shadowClass, classes),
				A2(
					elm_lang$core$List$cons,
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
					A2(elm_lang$core$List$cons, newClass, classes),
					A2(elm_lang$core$List$cons, newStyle, styles));
			}
		});
	var addTransform = function (_n2) {
		var classes = _n2.a;
		var styles = _n2.b;
		var _n1 = gathered.J;
		if (_n1.$ === 1) {
			return _Utils_Tuple2(classes, styles);
		} else {
			var transform = _n1.a;
			return A2(
				add,
				A2(
					elm_lang$core$Maybe$andThen,
					mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
						elm_lang$core$Maybe$Just(2)),
					transform.af),
				A2(
					add,
					A2(
						elm_lang$core$Maybe$andThen,
						mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
							elm_lang$core$Maybe$Just(1)),
						transform.dn),
					A2(
						add,
						A2(
							elm_lang$core$Maybe$andThen,
							mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
								elm_lang$core$Maybe$Just(0)),
							transform.al),
						A2(
							add,
							A2(
								elm_lang$core$Maybe$andThen,
								mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(elm_lang$core$Maybe$Nothing),
								transform.at),
							_Utils_Tuple2(classes, styles)))));
		}
	};
	var _n0 = addTransform(
		addTextShadows(
			addBoxShadows(
				_Utils_Tuple2(_List_Nil, gathered.ep))));
	var newClasses = _n0.a;
	var newStyles = _n0.b;
	return _Utils_update(
		gathered,
		{
			a: A2(
				elm_lang$core$List$cons,
				elm_lang$html$Html$Attributes$class(
					A2(elm_lang$core$String$join, ' ', newClasses)),
				gathered.a),
			ep: newStyles
		});
};
var elm_lang$core$Basics$neq = _Utils_notEqual;
var elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _n0) {
				var trues = _n0.a;
				var falses = _n0.b;
				return pred(x) ? _Utils_Tuple2(
					A2(elm_lang$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2(elm_lang$core$List$cons, x, falses));
			});
		return A3(
			elm_lang$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var elm_lang$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm_lang$html$Html$Attributes$attribute = elm_lang$virtual_dom$VirtualDom$attribute;
var mdgriffith$stylish_elephants$Internal$Model$Aligned = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
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
			return 'aligned-horizontally ' + mdgriffith$stylish_elephants$Internal$Style$classes.bv;
		case 2:
			return 'aligned-horizontally ' + mdgriffith$stylish_elephants$Internal$Style$classes.bw;
		default:
			return 'aligned-horizontally ' + mdgriffith$stylish_elephants$Internal$Style$classes.cu;
	}
};
var mdgriffith$stylish_elephants$Internal$Model$alignYName = function (align) {
	switch (align) {
		case 0:
			return 'aligned-vertically ' + mdgriffith$stylish_elephants$Internal$Style$classes.cA;
		case 2:
			return 'aligned-vertically ' + mdgriffith$stylish_elephants$Internal$Style$classes.ct;
		default:
			return 'aligned-vertically ' + mdgriffith$stylish_elephants$Internal$Style$classes.cv;
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
	return A2(
		elm_lang$core$String$join,
		'',
		_List_fromArray(
			[
				shadow.bi ? 'box-inset' : 'box-',
				elm_lang$core$String$fromFloat(shadow.dO.a) + 'px',
				elm_lang$core$String$fromFloat(shadow.dO.b) + 'px',
				elm_lang$core$String$fromFloat(shadow.cL) + 'px',
				elm_lang$core$String$fromFloat(shadow.B) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColorClass(shadow.j)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$formatDropShadow = function (shadow) {
	return A2(
		elm_lang$core$String$join,
		' ',
		_List_fromArray(
			[
				elm_lang$core$String$fromFloat(shadow.dO.a) + 'px',
				elm_lang$core$String$fromFloat(shadow.dO.b) + 'px',
				elm_lang$core$String$fromFloat(shadow.cL) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.j)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$filterName = function (filtr) {
	switch (filtr.$) {
		case 0:
			var url = filtr.a;
			return 'url(' + (url + ')');
		case 1:
			var x = filtr.a;
			return 'blur(' + (elm_lang$core$String$fromFloat(x) + 'px)');
		case 2:
			var x = filtr.a;
			return 'brightness(' + (elm_lang$core$String$fromFloat(x) + '%)');
		case 3:
			var x = filtr.a;
			return 'contrast(' + (elm_lang$core$String$fromFloat(x) + '%)');
		case 4:
			var x = filtr.a;
			return 'grayscale(' + (elm_lang$core$String$fromFloat(x) + '%)');
		case 5:
			var x = filtr.a;
			return 'hueRotate(' + (elm_lang$core$String$fromFloat(x) + 'deg)');
		case 6:
			var x = filtr.a;
			return 'invert(' + (elm_lang$core$String$fromFloat(x) + '%)');
		case 7:
			var x = filtr.a;
			return 'opacity(' + (elm_lang$core$String$fromFloat(x) + '%)');
		case 8:
			var x = filtr.a;
			return 'saturate(' + (elm_lang$core$String$fromFloat(x) + '%)');
		case 9:
			var x = filtr.a;
			return 'sepia(' + (elm_lang$core$String$fromFloat(x) + '%)');
		default:
			var shadow = filtr.a;
			var shadowModel = {cL: shadow.cL, j: shadow.j, dO: shadow.dO, B: shadow.B};
			return 'drop-shadow(' + (mdgriffith$stylish_elephants$Internal$Model$formatDropShadow(shadowModel) + ')');
	}
};
var mdgriffith$stylish_elephants$Internal$Model$formatTextShadow = function (shadow) {
	return A2(
		elm_lang$core$String$join,
		' ',
		_List_fromArray(
			[
				elm_lang$core$String$fromFloat(shadow.dO.a) + 'px',
				elm_lang$core$String$fromFloat(shadow.dO.b) + 'px',
				elm_lang$core$String$fromFloat(shadow.cL) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.j)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup = {Z: elm_lang$core$Maybe$Nothing, _: elm_lang$core$Maybe$Nothing, S: elm_lang$core$Maybe$Nothing};
var mdgriffith$stylish_elephants$Internal$Model$emptyTransformationStates = {af: elm_lang$core$Maybe$Nothing, al: elm_lang$core$Maybe$Nothing, dn: elm_lang$core$Maybe$Nothing, at: elm_lang$core$Maybe$Nothing};
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
				var _n1 = group.S;
				if (_n1.$ === 1) {
					return _Utils_update(
						group,
						{
							S: elm_lang$core$Maybe$Just(
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
							S: elm_lang$core$Maybe$Just(
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
						Z: A2(
							mdgriffith$stylish_elephants$Internal$Model$addIfNothing,
							elm_lang$core$Maybe$Just(
								A4(mdgriffith$stylish_elephants$Internal$Model$Rotation, x, y, z, angle)),
							group.Z)
					});
			default:
				var x = transform.a;
				var y = transform.b;
				var z = transform.c;
				return _Utils_update(
					group,
					{
						_: A2(
							mdgriffith$stylish_elephants$Internal$Model$addIfNothing,
							elm_lang$core$Maybe$Just(
								_Utils_Tuple3(x, y, z)),
							group._)
					});
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$stackOn = F3(
	function (maybePseudo, transform, gathered) {
		var states = A2(elm_lang$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformationStates, gathered.J);
		if (maybePseudo.$ === 1) {
			var normal = states.at;
			return _Utils_update(
				gathered,
				{
					J: elm_lang$core$Maybe$Just(
						_Utils_update(
							states,
							{
								at: elm_lang$core$Maybe$Just(
									A2(
										mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
										transform,
										A2(elm_lang$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, normal)))
							}))
				});
		} else {
			switch (maybePseudo.a) {
				case 1:
					var _n1 = maybePseudo.a;
					var hover = states.dn;
					return _Utils_update(
						gathered,
						{
							J: elm_lang$core$Maybe$Just(
								_Utils_update(
									states,
									{
										dn: elm_lang$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm_lang$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, hover)))
									}))
						});
				case 2:
					var _n2 = maybePseudo.a;
					var active = states.af;
					return _Utils_update(
						gathered,
						{
							J: elm_lang$core$Maybe$Just(
								_Utils_update(
									states,
									{
										af: elm_lang$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm_lang$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, active)))
									}))
						});
				default:
					var _n3 = maybePseudo.a;
					var focus = states.al;
					return _Utils_update(
						gathered,
						{
							J: elm_lang$core$Maybe$Just(
								_Utils_update(
									states,
									{
										al: elm_lang$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm_lang$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, focus)))
									}))
						});
			}
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$styleKey = function (s) {
	switch (s.$) {
		case 12:
			return 'shadows';
		case 11:
			var name = s.a;
			var x = s.b;
			return 'transparency';
		case 0:
			var _class = s.a;
			return _class;
		case 2:
			var i = s.a;
			return 'fontsize';
		case 1:
			return 'fontfamily';
		case 3:
			var prop = s.b;
			return prop;
		case 4:
			var prop = s.b;
			return prop;
		case 5:
			return 'spacing';
		case 6:
			return 'padding';
		case 7:
			return 'grid-template';
		case 8:
			return 'grid-position';
		case 10:
			var _class = s.a;
			var style = s.b;
			return _Utils_ap(
				mdgriffith$stylish_elephants$Internal$Model$psuedoClassName(_class),
				A2(
					elm_lang$core$String$join,
					'',
					A2(elm_lang$core$List$map, mdgriffith$stylish_elephants$Internal$Model$styleKey, style)));
		default:
			return 'transform';
	}
};
var mdgriffith$stylish_elephants$Internal$Model$textShadowName = function (shadow) {
	return A2(
		elm_lang$core$String$join,
		'',
		_List_fromArray(
			[
				'txt',
				elm_lang$core$String$fromFloat(shadow.dO.a) + 'px',
				elm_lang$core$String$fromFloat(shadow.dO.b) + 'px',
				elm_lang$core$String$fromFloat(shadow.cL) + 'px',
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
						A2(elm_lang$core$List$map, formatStyleClass, style));
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
				elm_lang$virtual_dom$VirtualDom$property,
				'className',
				elm_lang$json$Json$Encode$string(name));
		};
		switch (attr.$) {
			case 0:
				return gathered;
			case 3:
				var key = attr.a;
				var exactClassName = attr.b;
				return A2(elm_lang$core$Set$member, key, gathered.E) ? gathered : _Utils_update(
					gathered,
					{
						a: A2(
							elm_lang$core$List$cons,
							classNameAttr(exactClassName),
							gathered.a),
						E: A2(elm_lang$core$Set$insert, key, gathered.E)
					});
			case 1:
				var attribute = attr.a;
				return _Utils_update(
					gathered,
					{
						a: A2(elm_lang$core$List$cons, attribute, gathered.a)
					});
			case 4:
				var style = attr.a;
				var addNormalStyle = F2(
					function (styleProp, gatheredProps) {
						var key = mdgriffith$stylish_elephants$Internal$Model$styleKey(styleProp);
						return A2(elm_lang$core$Set$member, key, gatheredProps.E) ? gatheredProps : _Utils_update(
							gatheredProps,
							{
								a: function () {
									if (styleProp.$ === 10) {
										return A2(
											elm_lang$core$List$cons,
											A2(
												elm_lang$virtual_dom$VirtualDom$property,
												'className',
												elm_lang$json$Json$Encode$string('transition')),
											A2(
												elm_lang$core$List$cons,
												classNameAttr(
													mdgriffith$stylish_elephants$Internal$Model$getStyleName(styleProp)),
												gatheredProps.a));
									} else {
										return A2(
											elm_lang$core$List$cons,
											classNameAttr(
												mdgriffith$stylish_elephants$Internal$Model$getStyleName(styleProp)),
											gatheredProps.a);
									}
								}(),
								E: A2(elm_lang$core$Set$insert, key, gatheredProps.E),
								ep: A2(
									elm_lang$core$List$cons,
									formatStyleClass(styleProp),
									gatheredProps.ep)
							});
					});
				switch (style.$) {
					case 9:
						var transformation = style.a;
						return A3(mdgriffith$stylish_elephants$Internal$Model$stackOn, elm_lang$core$Maybe$Nothing, transformation, gathered);
					case 10:
						var pseudo = style.a;
						var props = style.b;
						var forTransforms = function (attribute) {
							if (attribute.$ === 9) {
								var x = attribute.a;
								return elm_lang$core$Maybe$Just(x);
							} else {
								return elm_lang$core$Maybe$Nothing;
							}
						};
						var _n3 = A2(
							elm_lang$core$List$partition,
							function (x) {
								return !_Utils_eq(
									forTransforms(x),
									elm_lang$core$Maybe$Nothing);
							},
							props);
						var transformationProps = _n3.a;
						var otherProps = _n3.b;
						var withTransforms = A3(
							elm_lang$core$List$foldr,
							mdgriffith$stylish_elephants$Internal$Model$stackOn(
								elm_lang$core$Maybe$Just(pseudo)),
							gathered,
							A2(elm_lang$core$List$filterMap, forTransforms, transformationProps));
						return A2(
							addNormalStyle,
							A2(mdgriffith$stylish_elephants$Internal$Model$PseudoSelector, pseudo, otherProps),
							withTransforms);
					default:
						return A2(addNormalStyle, style, gathered);
				}
			case 7:
				var width = attr.a;
				if (_Utils_eq(gathered.cq, elm_lang$core$Maybe$Nothing)) {
					var widthHelper = F2(
						function (w, gath) {
							switch (w.$) {
								case 0:
									var px = w.a;
									return _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													'width-exact width-px-' + elm_lang$core$String$fromInt(px)),
												gath.a),
											ep: A2(
												elm_lang$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													styleName(
														'width-px-' + elm_lang$core$String$fromInt(px)),
													'width',
													elm_lang$core$String$fromInt(px) + 'px'),
												gath.ep)
										});
								case 1:
									return _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													function ($) {
														return $.cr;
													}(mdgriffith$stylish_elephants$Internal$Style$classes)),
												gath.a)
										});
								case 2:
									var portion = w.a;
									return (portion === 1) ? _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													function ($) {
														return $.cs;
													}(mdgriffith$stylish_elephants$Internal$Style$classes)),
												gath.a)
										}) : _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													'width-fill-portion width-fill-' + elm_lang$core$String$fromInt(portion)),
												gath.a),
											ep: A2(
												elm_lang$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													'.se.row > ' + styleName(
														'width-fill-' + elm_lang$core$String$fromInt(portion)),
													'flex-grow',
													elm_lang$core$String$fromInt(portion * 100000)),
												gath.ep),
											cq: elm_lang$core$Maybe$Just(width)
										});
								case 3:
									var minSize = w.a;
									var len = w.b;
									var _n7 = _Utils_Tuple2(
										'min-width-' + elm_lang$core$String$fromInt(minSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.min-width-' + elm_lang$core$String$fromInt(minSize),
											'min-width',
											elm_lang$core$String$fromInt(minSize) + 'px'));
									var cls = _n7.a;
									var style = _n7.b;
									var newGathered = _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(cls),
												gath.a),
											ep: A2(elm_lang$core$List$cons, style, gath.ep)
										});
									return A2(widthHelper, len, newGathered);
								default:
									var maxSize = w.a;
									var len = w.b;
									var _n8 = _Utils_Tuple2(
										'max-width-' + elm_lang$core$String$fromInt(maxSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.max-width-' + elm_lang$core$String$fromInt(maxSize),
											'max-width',
											elm_lang$core$String$fromInt(maxSize) + 'px'));
									var cls = _n8.a;
									var style = _n8.b;
									var newGathered = _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(cls),
												gath.a),
											ep: A2(elm_lang$core$List$cons, style, gath.ep)
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
								cq: elm_lang$core$Maybe$Just(width)
							}));
				} else {
					return gathered;
				}
			case 8:
				var height = attr.a;
				if (_Utils_eq(gathered.bg, elm_lang$core$Maybe$Nothing)) {
					var heightHelper = F2(
						function (h, gath) {
							switch (h.$) {
								case 0:
									var px = h.a;
									return _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													'height-px-' + elm_lang$core$String$fromInt(px)),
												gath.a),
											ep: A2(
												elm_lang$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													styleName(
														'height-px-' + elm_lang$core$String$fromInt(px)),
													'height',
													elm_lang$core$String$fromInt(px) + 'px'),
												gath.ep)
										});
								case 1:
									return _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													function ($) {
														return $.am;
													}(mdgriffith$stylish_elephants$Internal$Style$classes)),
												gath.a)
										});
								case 2:
									var portion = h.a;
									return (portion === 1) ? _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													function ($) {
														return $.bO;
													}(mdgriffith$stylish_elephants$Internal$Style$classes)),
												gath.a)
										}) : _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													'height-fill-portion height-fill-' + elm_lang$core$String$fromInt(portion)),
												gath.a),
											ep: A2(
												elm_lang$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													'.se.column > ' + styleName(
														'height-fill-' + elm_lang$core$String$fromInt(portion)),
													'flex-grow',
													elm_lang$core$String$fromInt(portion * 100000)),
												gath.ep)
										});
								case 3:
									var minSize = h.a;
									var len = h.b;
									var _n10 = _Utils_Tuple2(
										'min-height-' + elm_lang$core$String$fromInt(minSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.min-height-' + elm_lang$core$String$fromInt(minSize),
											'min-height',
											elm_lang$core$String$fromInt(minSize) + 'px'));
									var cls = _n10.a;
									var style = _n10.b;
									var newGathered = _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(cls),
												gath.a),
											ep: A2(elm_lang$core$List$cons, style, gath.ep)
										});
									return A2(heightHelper, len, newGathered);
								default:
									var maxSize = h.a;
									var len = h.b;
									var _n11 = _Utils_Tuple2(
										'max-height-' + elm_lang$core$String$fromInt(maxSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.max-height-' + elm_lang$core$String$fromInt(maxSize),
											'max-height',
											elm_lang$core$String$fromInt(maxSize) + 'px'));
									var cls = _n11.a;
									var style = _n11.b;
									var newGathered = _Utils_update(
										gath,
										{
											a: A2(
												elm_lang$core$List$cons,
												classNameAttr(cls),
												gath.a),
											ep: A2(elm_lang$core$List$cons, style, gath.ep)
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
								bg: elm_lang$core$Maybe$Just(height)
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
									'h' + elm_lang$core$String$fromInt(i),
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
									elm_lang$core$List$cons,
									A2(elm_lang$html$Html$Attributes$attribute, 'role', 'button'),
									gathered.a)
							});
					case 5:
						var label = description.a;
						return _Utils_update(
							gathered,
							{
								a: A2(
									elm_lang$core$List$cons,
									A2(elm_lang$html$Html$Attributes$attribute, 'aria-label', label),
									gathered.a)
							});
					case 6:
						return _Utils_update(
							gathered,
							{
								a: A2(
									elm_lang$core$List$cons,
									A2(elm_lang$html$Html$Attributes$attribute, 'aria-live', 'polite'),
									gathered.a)
							});
					default:
						return _Utils_update(
							gathered,
							{
								a: A2(
									elm_lang$core$List$cons,
									A2(elm_lang$html$Html$Attributes$attribute, 'aria-live', 'assertive'),
									gathered.a)
							});
				}
			case 9:
				var location = attr.a;
				var elem = attr.b;
				var styles = function () {
					switch (elem.$) {
						case 3:
							return elm_lang$core$Maybe$Nothing;
						case 2:
							var str = elem.a;
							return elm_lang$core$Maybe$Nothing;
						case 0:
							var html = elem.a;
							return elm_lang$core$Maybe$Nothing;
						default:
							var styled = elem.a;
							return elm_lang$core$Maybe$Just(
								_Utils_ap(gathered.ep, styled.ep));
					}
				}();
				return _Utils_update(
					gathered,
					{
						P: function () {
							var _n13 = gathered.P;
							if (_n13.$ === 1) {
								return elm_lang$core$Maybe$Just(
									_List_fromArray(
										[
											_Utils_Tuple2(location, elem)
										]));
							} else {
								var nearby = _n13.a;
								return elm_lang$core$Maybe$Just(
									A2(
										elm_lang$core$List$cons,
										_Utils_Tuple2(location, elem),
										nearby));
							}
						}(),
						ep: function () {
							if (styles.$ === 1) {
								return gathered.ep;
							} else {
								var newStyles = styles.a;
								return newStyles;
							}
						}()
					});
			case 6:
				var x = attr.a;
				var _n16 = gathered.w;
				if (!_n16.$) {
					return _Utils_update(
						gathered,
						{
							w: A2(
								mdgriffith$stylish_elephants$Internal$Model$Aligned,
								elm_lang$core$Maybe$Just(x),
								elm_lang$core$Maybe$Nothing),
							a: A2(
								elm_lang$core$List$cons,
								classNameAttr(
									mdgriffith$stylish_elephants$Internal$Model$alignXName(x)),
								gathered.a)
						});
				} else {
					if (!_n16.a.$) {
						return gathered;
					} else {
						var y = _n16.b;
						return _Utils_update(
							gathered,
							{
								w: A2(
									mdgriffith$stylish_elephants$Internal$Model$Aligned,
									elm_lang$core$Maybe$Just(x),
									y),
								a: A2(
									elm_lang$core$List$cons,
									classNameAttr(
										mdgriffith$stylish_elephants$Internal$Model$alignXName(x)),
									gathered.a)
							});
					}
				}
			case 5:
				var y = attr.a;
				var _n17 = gathered.w;
				if (!_n17.$) {
					return _Utils_update(
						gathered,
						{
							w: A2(
								mdgriffith$stylish_elephants$Internal$Model$Aligned,
								elm_lang$core$Maybe$Nothing,
								elm_lang$core$Maybe$Just(y)),
							a: A2(
								elm_lang$core$List$cons,
								classNameAttr(
									mdgriffith$stylish_elephants$Internal$Model$alignYName(y)),
								gathered.a)
						});
				} else {
					if (!_n17.b.$) {
						return gathered;
					} else {
						var x = _n17.a;
						return _Utils_update(
							gathered,
							{
								w: A2(
									mdgriffith$stylish_elephants$Internal$Model$Aligned,
									x,
									elm_lang$core$Maybe$Just(y)),
								a: A2(
									elm_lang$core$List$cons,
									classNameAttr(
										mdgriffith$stylish_elephants$Internal$Model$alignYName(y)),
									gathered.a)
							});
					}
				}
			case 12:
				var cssFilters = attr.a;
				var _n18 = gathered.ak;
				if (_n18.$ === 1) {
					return _Utils_update(
						gathered,
						{
							ak: elm_lang$core$Maybe$Just(
								mdgriffith$stylish_elephants$Internal$Model$filterName(cssFilters))
						});
				} else {
					var existing = _n18.a;
					return _Utils_update(
						gathered,
						{
							ak: elm_lang$core$Maybe$Just(
								mdgriffith$stylish_elephants$Internal$Model$filterName(cssFilters) + (' ' + existing))
						});
				}
			case 11:
				var shadow = attr.a;
				var _n19 = gathered.U;
				if (_n19.$ === 1) {
					return _Utils_update(
						gathered,
						{
							U: elm_lang$core$Maybe$Just(
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
							U: elm_lang$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$boxShadowName(shadow) + ('-' + existingClass),
									mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(shadow) + (', ' + existing)))
						});
				}
			default:
				var shadow = attr.a;
				var _n21 = gathered.ab;
				if (_n21.$ === 1) {
					return _Utils_update(
						gathered,
						{
							ab: elm_lang$core$Maybe$Just(
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
							ab: elm_lang$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow) + ('-' + existingClass),
									mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow) + (', ' + existing)))
						});
				}
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$Generic = {$: 0};
var mdgriffith$stylish_elephants$Internal$Model$Unaligned = {$: 0};
var mdgriffith$stylish_elephants$Internal$Model$initGathered = function (maybeNodeName) {
	return {
		w: mdgriffith$stylish_elephants$Internal$Model$Unaligned,
		a: _List_Nil,
		U: elm_lang$core$Maybe$Nothing,
		ak: elm_lang$core$Maybe$Nothing,
		E: elm_lang$core$Set$empty,
		bg: elm_lang$core$Maybe$Nothing,
		P: elm_lang$core$Maybe$Nothing,
		f: function () {
			if (maybeNodeName.$ === 1) {
				return mdgriffith$stylish_elephants$Internal$Model$Generic;
			} else {
				var name = maybeNodeName.a;
				return mdgriffith$stylish_elephants$Internal$Model$NodeName(name);
			}
		}(),
		ep: _List_Nil,
		ab: elm_lang$core$Maybe$Nothing,
		J: elm_lang$core$Maybe$Nothing,
		cq: elm_lang$core$Maybe$Nothing
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
					elm_lang$core$List$foldr,
					mdgriffith$stylish_elephants$Internal$Model$gatherAttributes,
					mdgriffith$stylish_elephants$Internal$Model$initGathered(node),
					A2(
						elm_lang$core$List$cons,
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
			elm_lang$core$Maybe$Nothing,
			A2(
				elm_lang$core$List$cons,
				A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'y-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.c3),
				A2(
					elm_lang$core$List$cons,
					A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'x-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.bD),
					A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
						A2(
							elm_lang$core$List$cons,
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
							attrs)))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Element$shrink = mdgriffith$stylish_elephants$Internal$Model$Content;
var mdgriffith$stylish_elephants$Element$el = F2(
	function (attrs, child) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm_lang$core$Maybe$Nothing,
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
					attrs)),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var elm_lang$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm_lang$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm_lang$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm_lang$html$Html$Attributes$alt = elm_lang$html$Html$Attributes$stringProperty('alt');
var elm_lang$html$Html$Attributes$src = function (url) {
	return A2(
		elm_lang$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var mdgriffith$stylish_elephants$Element$clip = A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'overflow', mdgriffith$stylish_elephants$Internal$Style$classes.cZ);
var mdgriffith$stylish_elephants$Element$image = F2(
	function (attrs, _n0) {
		var src = _n0.en;
		var description = _n0.aj;
		var imageAttributes = A2(
			elm_lang$core$List$filter,
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
			elm_lang$core$Maybe$Nothing,
			A2(elm_lang$core$List$cons, mdgriffith$stylish_elephants$Element$clip, attrs),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A5(
						mdgriffith$stylish_elephants$Internal$Model$element,
						mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
						mdgriffith$stylish_elephants$Internal$Model$asEl,
						elm_lang$core$Maybe$Just('img'),
						_Utils_ap(
							imageAttributes,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Internal$Model$Attr(
									elm_lang$html$Html$Attributes$src(src)),
									mdgriffith$stylish_elephants$Internal$Model$Attr(
									elm_lang$html$Html$Attributes$alt(description))
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
var elm_lang$html$Html$Attributes$href = function (url) {
	return A2(
		elm_lang$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var elm_lang$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var mdgriffith$stylish_elephants$Element$link = F2(
	function (attrs, _n0) {
		var url = _n0.n;
		var label = _n0.aS;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm_lang$core$Maybe$Just('a'),
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$Attr(
					elm_lang$html$Html$Attributes$href(url)),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm_lang$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
						A2(
							elm_lang$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							A2(
								elm_lang$core$List$cons,
								A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'x-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.ai),
								A2(
									elm_lang$core$List$cons,
									A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'y-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.V),
									attrs)))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var mdgriffith$stylish_elephants$Internal$Model$Move = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Element$moveLeft = function (x) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Move,
				elm_lang$core$Maybe$Just(-x),
				elm_lang$core$Maybe$Nothing,
				elm_lang$core$Maybe$Nothing)));
};
var mdgriffith$stylish_elephants$Internal$Model$Empty = {$: 3};
var mdgriffith$stylish_elephants$Element$none = mdgriffith$stylish_elephants$Internal$Model$Empty;
var mdgriffith$stylish_elephants$Internal$Model$Max = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$maximum = F2(
	function (i, l) {
		return A2(mdgriffith$stylish_elephants$Internal$Model$Max, i, l);
	});
var mdgriffith$stylish_elephants$Internal$Model$Min = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$minimum = F2(
	function (i, l) {
		return A2(mdgriffith$stylish_elephants$Internal$Model$Min, i, l);
	});
var mdgriffith$stylish_elephants$Element$spacing = function (x) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
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
			elm_lang$core$Maybe$Just('p'),
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(
					A2(
						mdgriffith$stylish_elephants$Element$maximum,
						750,
						A2(mdgriffith$stylish_elephants$Element$minimum, 500, mdgriffith$stylish_elephants$Element$fill))),
				A2(
					elm_lang$core$List$cons,
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
var mdgriffith$stylish_elephants$Element$Font$bold = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Style$classes.bA, mdgriffith$stylish_elephants$Internal$Style$classes.bA);
var mdgriffith$stylish_elephants$Element$Font$color = function (fontColor) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Colored,
			'font-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var mdgriffith$stylish_elephants$Element$Font$size = function (i) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		mdgriffith$stylish_elephants$Internal$Model$FontSize(i));
};
var author$project$Framework$initConf = {
	be: mdgriffith$stylish_elephants$Element$inFront(
		A2(
			mdgriffith$stylish_elephants$Element$link,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$alignRight,
					mdgriffith$stylish_elephants$Element$Font$color(author$project$Color$black)
				]),
			{
				aS: A2(
					mdgriffith$stylish_elephants$Element$image,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$width(
							mdgriffith$stylish_elephants$Element$px(60)),
							mdgriffith$stylish_elephants$Element$alpha(0.5)
						]),
					{aj: 'Fork me on Github', en: 'images/github.png'}),
				n: 'https://github.com/lucamug/elm-style-framework'
			})),
	aP: A3(mdgriffith$stylish_elephants$Element$rgb, 51, 51, 51),
	bL: A3(mdgriffith$stylish_elephants$Element$rgb, 153, 153, 153),
	bM: A3(mdgriffith$stylish_elephants$Element$rgb, 182, 182, 182),
	bN: A3(mdgriffith$stylish_elephants$Element$rgb, 209, 209, 209),
	bf: A3(mdgriffith$stylish_elephants$Element$rgb, 247, 247, 247),
	bQ: function (hostname) {
		return hostname === 'localhost';
	},
	bj: mdgriffith$stylish_elephants$Element$none,
	y: 41,
	au: '',
	a4: 'FRAMEWORK',
	aA: A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$link,
				_List_Nil,
				{
					aS: A2(
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
	a7: '0.19'
};
var author$project$Framework$Button$SizeDefault = 1;
var author$project$Framework$Button$StateDefault = 0;
var author$project$Framework$Button$StateDisabled = 4;
var author$project$Framework$Configuration$getColor = function (key) {
	return A3(mdgriffith$stylish_elephants$Element$rgb, 0.7, 0.7, 0.7);
};
var author$project$Framework$Configuration$hsl2toString = F3(
	function (a, b, c) {
		return '#ff00ff';
	});
var author$project$Framework$Configuration$bulmaColor = {
	cH: A3(author$project$Framework$Configuration$hsl2toString, 0, 0, 4),
	cI: A3(author$project$Framework$Configuration$hsl2toString, 0, 0, 7),
	cJ: A3(author$project$Framework$Configuration$hsl2toString, 0, 0, 14),
	cK: A3(author$project$Framework$Configuration$hsl2toString, 217, 71, 53),
	c5: A3(author$project$Framework$Configuration$hsl2toString, 204, 86, 53),
	dg: A3(author$project$Framework$Configuration$hsl2toString, 141, 71, 48),
	dh: A3(author$project$Framework$Configuration$hsl2toString, 0, 0, 48),
	di: A3(author$project$Framework$Configuration$hsl2toString, 0, 0, 29),
	dj: A3(author$project$Framework$Configuration$hsl2toString, 0, 0, 21),
	dk: A3(author$project$Framework$Configuration$hsl2toString, 0, 0, 71),
	dl: A3(author$project$Framework$Configuration$hsl2toString, 0, 0, 86),
	dV: A3(author$project$Framework$Configuration$hsl2toString, 14, 100, 53),
	d8: A3(author$project$Framework$Configuration$hsl2toString, 271, 100, 71),
	d9: A3(author$project$Framework$Configuration$hsl2toString, 348, 100, 61),
	eA: A3(author$project$Framework$Configuration$hsl2toString, 171, 100, 41),
	eG: A3(author$project$Framework$Configuration$hsl2toString, 0, 0, 100),
	eH: A3(author$project$Framework$Configuration$hsl2toString, 0, 0, 98),
	eI: A3(author$project$Framework$Configuration$hsl2toString, 0, 0, 96),
	eM: A3(author$project$Framework$Configuration$hsl2toString, 48, 100, 67)
};
var author$project$Framework$Configuration$bulmaSizes = {bn: '3.00', bo: '2.50', bp: '2.00', a0: '1.50', a1: '1.25', a2: '1.00', a3: '0.75'};
var author$project$Framework$Configuration$findColorInvert = function (color) {
	return '#000000';
};
var elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		elm_lang$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm_lang$core$Dict$insert, key, value, dict);
			}),
		elm_lang$core$Dict$empty,
		assocs);
};
var author$project$Framework$Configuration$configuration = elm_lang$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('black', author$project$Framework$Configuration$bulmaColor.cH),
			_Utils_Tuple2('black_bis', author$project$Framework$Configuration$bulmaColor.cI),
			_Utils_Tuple2('black_ter', author$project$Framework$Configuration$bulmaColor.cJ),
			_Utils_Tuple2('grey_darker', author$project$Framework$Configuration$bulmaColor.dj),
			_Utils_Tuple2('grey_dark', author$project$Framework$Configuration$bulmaColor.di),
			_Utils_Tuple2('grey', author$project$Framework$Configuration$bulmaColor.dh),
			_Utils_Tuple2('grey_light', author$project$Framework$Configuration$bulmaColor.dk),
			_Utils_Tuple2('grey_lighter', author$project$Framework$Configuration$bulmaColor.dl),
			_Utils_Tuple2('white_ter', author$project$Framework$Configuration$bulmaColor.eI),
			_Utils_Tuple2('white_bis', author$project$Framework$Configuration$bulmaColor.eH),
			_Utils_Tuple2('white', author$project$Framework$Configuration$bulmaColor.eG),
			_Utils_Tuple2('orange', author$project$Framework$Configuration$bulmaColor.dV),
			_Utils_Tuple2('yellow', author$project$Framework$Configuration$bulmaColor.eM),
			_Utils_Tuple2('green', author$project$Framework$Configuration$bulmaColor.dg),
			_Utils_Tuple2('turquoise', author$project$Framework$Configuration$bulmaColor.eA),
			_Utils_Tuple2('cyan', author$project$Framework$Configuration$bulmaColor.c5),
			_Utils_Tuple2('blue', author$project$Framework$Configuration$bulmaColor.cK),
			_Utils_Tuple2('purple', author$project$Framework$Configuration$bulmaColor.d8),
			_Utils_Tuple2('red', author$project$Framework$Configuration$bulmaColor.d9),
			_Utils_Tuple2('font_url', 'https://fonts.googleapis.com/css?family=Noto+Sans'),
			_Utils_Tuple2('font_typeface', 'Noto Sans'),
			_Utils_Tuple2('font_typeface_fallback', 'sans-serif'),
			_Utils_Tuple2('size1', author$project$Framework$Configuration$bulmaSizes.bn),
			_Utils_Tuple2('size2', author$project$Framework$Configuration$bulmaSizes.bo),
			_Utils_Tuple2('size3', author$project$Framework$Configuration$bulmaSizes.bp),
			_Utils_Tuple2('size4', author$project$Framework$Configuration$bulmaSizes.a0),
			_Utils_Tuple2('size5', author$project$Framework$Configuration$bulmaSizes.a1),
			_Utils_Tuple2('size6', author$project$Framework$Configuration$bulmaSizes.a2),
			_Utils_Tuple2('size7', author$project$Framework$Configuration$bulmaSizes.a3),
			_Utils_Tuple2('primary', author$project$Framework$Configuration$bulmaColor.eA),
			_Utils_Tuple2('info', author$project$Framework$Configuration$bulmaColor.c5),
			_Utils_Tuple2('success', author$project$Framework$Configuration$bulmaColor.dg),
			_Utils_Tuple2('warning', author$project$Framework$Configuration$bulmaColor.eM),
			_Utils_Tuple2('danger', author$project$Framework$Configuration$bulmaColor.d9),
			_Utils_Tuple2('light', author$project$Framework$Configuration$bulmaColor.eI),
			_Utils_Tuple2('dark', author$project$Framework$Configuration$bulmaColor.dj),
			_Utils_Tuple2('background', author$project$Framework$Configuration$bulmaColor.eI),
			_Utils_Tuple2('border', author$project$Framework$Configuration$bulmaColor.dl),
			_Utils_Tuple2('border-hover', author$project$Framework$Configuration$bulmaColor.dk),
			_Utils_Tuple2('text', author$project$Framework$Configuration$bulmaColor.di),
			_Utils_Tuple2('text-light', author$project$Framework$Configuration$bulmaColor.dh),
			_Utils_Tuple2('text-strong', author$project$Framework$Configuration$bulmaColor.dj),
			_Utils_Tuple2('code', author$project$Framework$Configuration$bulmaColor.d9),
			_Utils_Tuple2('code-background', author$project$Framework$Configuration$bulmaColor.eI),
			_Utils_Tuple2('pre', author$project$Framework$Configuration$bulmaColor.di),
			_Utils_Tuple2('pre-background', author$project$Framework$Configuration$bulmaColor.eI),
			_Utils_Tuple2('link', author$project$Framework$Configuration$bulmaColor.cK),
			_Utils_Tuple2(
			'link_invert',
			author$project$Framework$Configuration$findColorInvert(author$project$Framework$Configuration$bulmaColor.cK)),
			_Utils_Tuple2('link_visited', author$project$Framework$Configuration$bulmaColor.d8),
			_Utils_Tuple2('link_hover', author$project$Framework$Configuration$bulmaColor.dj),
			_Utils_Tuple2('link_hover_border', author$project$Framework$Configuration$bulmaColor.dk),
			_Utils_Tuple2('link_focus', author$project$Framework$Configuration$bulmaColor.dj),
			_Utils_Tuple2('link_focus_border', author$project$Framework$Configuration$bulmaColor.cK),
			_Utils_Tuple2('link_active', author$project$Framework$Configuration$bulmaColor.dj),
			_Utils_Tuple2('link_active_border', author$project$Framework$Configuration$bulmaColor.di),
			_Utils_Tuple2('size_small', author$project$Framework$Configuration$bulmaSizes.a3),
			_Utils_Tuple2('size_normal', author$project$Framework$Configuration$bulmaSizes.a2),
			_Utils_Tuple2('size_medium', author$project$Framework$Configuration$bulmaSizes.a1),
			_Utils_Tuple2('size_large', author$project$Framework$Configuration$bulmaSizes.a0),
			_Utils_Tuple2('moveDownPlaceHolderLarge', '31'),
			_Utils_Tuple2('moveDownPlaceHolderSmall', '30'),
			_Utils_Tuple2('transparent', '#ffffff00'),
			_Utils_Tuple2('muted', author$project$Framework$Configuration$bulmaColor.dk),
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
		var repl = A2(elm_lang$core$Dict$get, key, replacement);
		var orig = A2(elm_lang$core$Dict$get, key, original);
		if (!repl.$) {
			var value = repl.a;
			return elm_lang$core$Maybe$Just(value);
		} else {
			if (!orig.$) {
				var value = orig.a;
				return elm_lang$core$Maybe$Just(value);
			} else {
				return elm_lang$core$Maybe$Nothing;
			}
		}
	});
var author$project$MyStyle$configuration = elm_lang$core$Dict$fromList(_List_Nil);
var author$project$Framework$Configuration$getString = function (key) {
	return A2(
		elm_lang$core$Maybe$withDefault,
		'',
		A3(author$project$Framework$Configuration$getValue, key, author$project$Framework$Configuration$configuration, author$project$MyStyle$configuration));
};
var elm_lang$core$String$toFloat = _String_toFloat;
var author$project$Framework$Configuration$getFloat = function (key) {
	var _n0 = elm_lang$core$String$toFloat(
		author$project$Framework$Configuration$getString(key));
	if (!_n0.$) {
		var value2 = _n0.a;
		return value2;
	} else {
		return 0;
	}
};
var author$project$Framework$Configuration$getInt = function (key) {
	return elm_lang$core$Basics$round(
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
		db: author$project$Framework$Configuration$getInt('buttonFontDefault'),
		dc: author$project$Framework$Configuration$getInt('buttonFontJumbo'),
		dd: author$project$Framework$Configuration$getInt('buttonFontLarge'),
		de: author$project$Framework$Configuration$getInt('buttonFontMedium'),
		df: author$project$Framework$Configuration$getInt('buttonFontSmall'),
		dW: author$project$Framework$Configuration$getInt('buttonPaddingXDefault'),
		dX: author$project$Framework$Configuration$getInt('buttonPaddingXJumbo'),
		dY: author$project$Framework$Configuration$getInt('buttonPaddingXLarge'),
		dZ: author$project$Framework$Configuration$getInt('buttonPaddingXMedium'),
		d_: author$project$Framework$Configuration$getInt('buttonPaddingXSmall'),
		d$: author$project$Framework$Configuration$getInt('buttonPaddingYDefault'),
		d0: author$project$Framework$Configuration$getInt('buttonPaddingYJumbo'),
		d1: author$project$Framework$Configuration$getInt('buttonPaddingYLarge'),
		d2: author$project$Framework$Configuration$getInt('buttonPaddingYMedium'),
		d3: author$project$Framework$Configuration$getInt('buttonPaddingYSmall')
	},
	j: {
		cE: author$project$Framework$Configuration$getColor('background'),
		cH: author$project$Framework$Configuration$getColor('black'),
		cI: author$project$Framework$Configuration$getColor('black_bis'),
		cJ: author$project$Framework$Configuration$getColor('black_ter'),
		cK: author$project$Framework$Configuration$getColor('blue'),
		cN: author$project$Framework$Configuration$getColor('border'),
		cS: author$project$Framework$Configuration$getColor('border_hover'),
		c0: author$project$Framework$Configuration$getColor('code'),
		c1: author$project$Framework$Configuration$getColor('code_background'),
		c5: author$project$Framework$Configuration$getColor('cyan'),
		c6: author$project$Framework$Configuration$getColor('danger'),
		c7: author$project$Framework$Configuration$getColor('dark'),
		dg: author$project$Framework$Configuration$getColor('green'),
		dh: author$project$Framework$Configuration$getColor('grey'),
		di: author$project$Framework$Configuration$getColor('grey_dark'),
		dj: author$project$Framework$Configuration$getColor('grey_darker'),
		dk: author$project$Framework$Configuration$getColor('grey_light'),
		dl: author$project$Framework$Configuration$getColor('grey_lighter'),
		dt: author$project$Framework$Configuration$getColor('info'),
		dx: author$project$Framework$Configuration$getColor('light'),
		dz: author$project$Framework$Configuration$getColor('link'),
		dA: author$project$Framework$Configuration$getColor('link_active'),
		dB: author$project$Framework$Configuration$getColor('link_active_border'),
		dC: author$project$Framework$Configuration$getColor('link_focus'),
		dD: author$project$Framework$Configuration$getColor('link_focus_border'),
		dE: author$project$Framework$Configuration$getColor('link_hover'),
		dF: author$project$Framework$Configuration$getColor('link_hover_border'),
		dG: author$project$Framework$Configuration$getColor('link_invert'),
		dH: author$project$Framework$Configuration$getColor('link_visited'),
		dL: author$project$Framework$Configuration$getColor('muted'),
		dV: author$project$Framework$Configuration$getColor('orange'),
		d5: author$project$Framework$Configuration$getColor('pre'),
		d6: author$project$Framework$Configuration$getColor('pre_background'),
		d7: author$project$Framework$Configuration$getColor('primary'),
		d8: author$project$Framework$Configuration$getColor('purple'),
		d9: author$project$Framework$Configuration$getColor('red'),
		es: author$project$Framework$Configuration$getColor('success'),
		et: author$project$Framework$Configuration$getColor('text'),
		eu: author$project$Framework$Configuration$getColor('text_light'),
		ev: author$project$Framework$Configuration$getColor('text_strong'),
		ez: author$project$Framework$Configuration$getColor('transparent'),
		eA: author$project$Framework$Configuration$getColor('turquoise'),
		eF: author$project$Framework$Configuration$getColor('warning'),
		eG: author$project$Framework$Configuration$getColor('white'),
		eH: author$project$Framework$Configuration$getColor('white_bis'),
		eI: author$project$Framework$Configuration$getColor('white_ter'),
		eM: author$project$Framework$Configuration$getColor('yellow')
	},
	aO: {
		co: author$project$Framework$Configuration$getString('font_typeface'),
		eB: author$project$Framework$Configuration$getTypeface('font_typeface_fallback'),
		n: author$project$Framework$Configuration$getString('font_url')
	},
	dK: {
		dv: author$project$Framework$Configuration$getFloat('moveDownPlaceHolderLarge'),
		ek: author$project$Framework$Configuration$getFloat('moveDownPlaceHolderSmall')
	},
	B: {
		bn: author$project$Framework$Configuration$getFloat('size1'),
		bo: author$project$Framework$Configuration$getFloat('size2'),
		bp: author$project$Framework$Configuration$getFloat('size3'),
		a0: author$project$Framework$Configuration$getFloat('size4'),
		a1: author$project$Framework$Configuration$getFloat('size5'),
		a2: author$project$Framework$Configuration$getFloat('size6'),
		a3: author$project$Framework$Configuration$getFloat('size7')
	}
};
var author$project$Framework$Color$grey_lighter = author$project$Framework$Configuration$conf.j.dl;
var author$project$Framework$Button$colorBorderDefault = author$project$Framework$Color$grey_lighter;
var author$project$Framework$Color$white = author$project$Framework$Configuration$conf.j.eG;
var author$project$Framework$Button$colorDefault = author$project$Framework$Color$white;
var author$project$Framework$Button$SizeJumbo = 4;
var author$project$Framework$Button$SizeLarge = 3;
var author$project$Framework$Button$SizeMedium = 2;
var author$project$Framework$Button$SizeSmall = 0;
var author$project$Framework$Button$StateLoading = 2;
var author$project$Framework$Button$StateOutlined = 1;
var author$project$Framework$Button$StateWaiting = 3;
var author$project$Framework$Color$danger = author$project$Framework$Configuration$conf.j.c6;
var author$project$Framework$Color$info = author$project$Framework$Configuration$conf.j.dt;
var author$project$Framework$Color$muted = author$project$Framework$Configuration$conf.j.dL;
var author$project$Framework$Color$primary = author$project$Framework$Configuration$conf.j.d7;
var author$project$Framework$Color$success = author$project$Framework$Configuration$conf.j.es;
var author$project$Framework$Color$warning = author$project$Framework$Configuration$conf.j.eF;
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
					{B: 0});
			case 7:
				return _Utils_update(
					confButton,
					{B: 2});
			case 8:
				return _Utils_update(
					confButton,
					{B: 3});
			case 9:
				return _Utils_update(
					confButton,
					{B: 4});
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
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.h.d_, author$project$Framework$Configuration$conf.h.d3);
		case 1:
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.h.dW, author$project$Framework$Configuration$conf.h.d$);
		case 2:
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.h.dZ, author$project$Framework$Configuration$conf.h.d2);
		case 3:
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.h.dY, author$project$Framework$Configuration$conf.h.d1);
		default:
			return _Utils_Tuple2(author$project$Framework$Configuration$conf.h.dX, author$project$Framework$Configuration$conf.h.d0);
	}
};
var author$project$Framework$Button$toPx = function (size) {
	switch (size) {
		case 0:
			return author$project$Framework$Configuration$conf.h.df;
		case 1:
			return author$project$Framework$Configuration$conf.h.db;
		case 2:
			return author$project$Framework$Configuration$conf.h.de;
		case 3:
			return author$project$Framework$Configuration$conf.h.dd;
		default:
			return author$project$Framework$Configuration$conf.h.dc;
	}
};
var author$project$Framework$Color$grey_dark = author$project$Framework$Configuration$conf.j.di;
var author$project$Framework$Color$transparent = author$project$Framework$Configuration$conf.j.ez;
var author$project$Color$hsl = F3(
	function (_n0, _n1, _n2) {
		return A3(mdgriffith$stylish_elephants$Element$rgb, 0.5, 0.5, 0.5);
	});
var author$project$Color$toHsl = function (_n0) {
	return {cB: 0, dp: 0, dy: 0, ee: 0};
};
var author$project$Framework$ColorManipulation$lighten = F2(
	function (quantity, cl) {
		var _n0 = author$project$Color$toHsl(cl);
		var hue = _n0.dp;
		var saturation = _n0.ee;
		var lightness = _n0.dy;
		return A3(author$project$Color$hsl, hue, saturation, lightness * quantity);
	});
var author$project$Framework$ColorManipulation$saturate = F2(
	function (quantity, cl) {
		var _n0 = author$project$Color$toHsl(cl);
		var hue = _n0.dp;
		var saturation = _n0.ee;
		var lightness = _n0.dy;
		return A3(author$project$Color$hsl, hue, saturation * quantity, lightness);
	});
var author$project$Framework$Spinner$Rotation = 1;
var author$project$Framework$Spinner$ThreeCircles = 0;
var author$project$Color$toRgb = function (_n0) {
	return {cK: 0, dg: 0, d9: 0};
};
var elm_lang$core$Basics$modBy = _Basics_modBy;
var elm_lang$core$Char$fromCode = _Char_fromCode;
var elm_lang$core$String$cons = _String_cons;
var elm_lang$core$String$fromChar = function (_char) {
	return A2(elm_lang$core$String$cons, _char, '');
};
var author$project$Framework$ColorManipulation$toRadix = function (n) {
	var getChr = function (c) {
		return (c < 10) ? elm_lang$core$String$fromInt(c) : elm_lang$core$String$fromChar(
			elm_lang$core$Char$fromCode(87 + c));
	};
	return (n < 16) ? getChr(n) : _Utils_ap(
		author$project$Framework$ColorManipulation$toRadix((n / 16) | 0),
		getChr(
			A2(elm_lang$core$Basics$modBy, 16, n)));
};
var elm_lang$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm_lang$core$String$length = _String_length;
var elm_lang$core$Bitwise$and = _Bitwise_and;
var elm_lang$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm_lang$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm_lang$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm_lang$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm_lang$core$String$repeatHelp, n, chunk, '');
	});
var elm_lang$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				elm_lang$core$String$repeat,
				n - elm_lang$core$String$length(string),
				elm_lang$core$String$fromChar(_char)),
			string);
	});
var author$project$Framework$ColorManipulation$toHex = function ($) {
	return A3(
		elm_lang$core$String$padLeft,
		2,
		'0',
		author$project$Framework$ColorManipulation$toRadix($));
};
var author$project$Framework$ColorManipulation$colorToHex = function (cl) {
	var rgba = author$project$Color$toRgb(cl);
	return A2(
		elm_lang$core$String$join,
		'',
		A2(
			elm_lang$core$List$cons,
			'#',
			A2(
				elm_lang$core$List$map,
				author$project$Framework$ColorManipulation$toHex,
				_List_fromArray(
					[rgba.d9, rgba.dg, rgba.cK]))));
};
var elm_lang$core$String$slice = _String_slice;
var elm_lang$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm_lang$core$String$slice,
			n,
			elm_lang$core$String$length(string),
			string);
	});
var elm_lang$svg$Svg$animateTransform = elm_lang$svg$Svg$trustedNode('animateTransform');
var elm_lang$svg$Svg$defs = elm_lang$svg$Svg$trustedNode('defs');
var elm_lang$svg$Svg$g = elm_lang$svg$Svg$trustedNode('g');
var elm_lang$svg$Svg$linearGradient = elm_lang$svg$Svg$trustedNode('linearGradient');
var elm_lang$svg$Svg$stop = elm_lang$svg$Svg$trustedNode('stop');
var elm_lang$svg$Svg$Attributes$attributeName = _VirtualDom_attribute('attributeName');
var elm_lang$svg$Svg$Attributes$dur = _VirtualDom_attribute('dur');
var elm_lang$svg$Svg$Attributes$fillRule = _VirtualDom_attribute('fill-rule');
var elm_lang$svg$Svg$Attributes$from = function (value) {
	return A2(
		_VirtualDom_attribute,
		'from',
		_VirtualDom_noJavaScriptUri(value));
};
var elm_lang$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var elm_lang$svg$Svg$Attributes$offset = _VirtualDom_attribute('offset');
var elm_lang$svg$Svg$Attributes$repeatCount = _VirtualDom_attribute('repeatCount');
var elm_lang$svg$Svg$Attributes$stopColor = _VirtualDom_attribute('stop-color');
var elm_lang$svg$Svg$Attributes$stopOpacity = _VirtualDom_attribute('stop-opacity');
var elm_lang$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var elm_lang$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var elm_lang$svg$Svg$Attributes$to = function (value) {
	return A2(
		_VirtualDom_attribute,
		'to',
		_VirtualDom_noJavaScriptUri(value));
};
var elm_lang$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var elm_lang$svg$Svg$Attributes$type_ = _VirtualDom_attribute('type');
var elm_lang$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var elm_lang$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var elm_lang$svg$Svg$Attributes$xmlSpace = A2(_VirtualDom_attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var elm_lang$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var elm_lang$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var author$project$Framework$Spinner$spinnerRotationHtml = F2(
	function (size, color) {
		var speed = '0.6s';
		var colorString = author$project$Framework$ColorManipulation$colorToHex(color);
		var idElement = 'id' + A2(elm_lang$core$String$dropLeft, 1, colorString);
		return A2(
			elm_lang$svg$Svg$svg,
			_List_fromArray(
				[
					elm_lang$svg$Svg$Attributes$viewBox('0 0 38 38'),
					elm_lang$svg$Svg$Attributes$xmlSpace('http://www.w3.org/2000/svg'),
					elm_lang$svg$Svg$Attributes$width(
					elm_lang$core$String$fromInt(size)),
					elm_lang$svg$Svg$Attributes$height(
					elm_lang$core$String$fromInt(size))
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$svg$Svg$defs,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm_lang$svg$Svg$linearGradient,
							_List_fromArray(
								[
									elm_lang$svg$Svg$Attributes$id(idElement),
									elm_lang$svg$Svg$Attributes$x1('8%'),
									elm_lang$svg$Svg$Attributes$x2('65.7%'),
									elm_lang$svg$Svg$Attributes$y1('0%'),
									elm_lang$svg$Svg$Attributes$y2('23.9%')
								]),
							_List_fromArray(
								[
									A2(
									elm_lang$svg$Svg$stop,
									_List_fromArray(
										[
											elm_lang$svg$Svg$Attributes$offset('0%'),
											elm_lang$svg$Svg$Attributes$stopColor(colorString),
											elm_lang$svg$Svg$Attributes$stopOpacity('0')
										]),
									_List_Nil),
									A2(
									elm_lang$svg$Svg$stop,
									_List_fromArray(
										[
											elm_lang$svg$Svg$Attributes$offset('63.1%'),
											elm_lang$svg$Svg$Attributes$stopColor(colorString),
											elm_lang$svg$Svg$Attributes$stopOpacity('.6')
										]),
									_List_Nil),
									A2(
									elm_lang$svg$Svg$stop,
									_List_fromArray(
										[
											elm_lang$svg$Svg$Attributes$offset('100%'),
											elm_lang$svg$Svg$Attributes$stopColor(colorString)
										]),
									_List_Nil)
								]))
						])),
					A2(
					elm_lang$svg$Svg$g,
					_List_fromArray(
						[
							elm_lang$svg$Svg$Attributes$fill('none'),
							elm_lang$svg$Svg$Attributes$fillRule('evenodd'),
							elm_lang$svg$Svg$Attributes$transform('translate(1 1)')
						]),
					_List_fromArray(
						[
							A2(
							elm_lang$svg$Svg$path,
							_List_fromArray(
								[
									elm_lang$svg$Svg$Attributes$d('M36 18C36 8 28 0 18 0'),
									elm_lang$svg$Svg$Attributes$stroke('url(#' + (idElement + ')')),
									elm_lang$svg$Svg$Attributes$strokeWidth('2')
								]),
							_List_fromArray(
								[
									A2(
									elm_lang$svg$Svg$animateTransform,
									_List_fromArray(
										[
											elm_lang$svg$Svg$Attributes$attributeName('transform'),
											elm_lang$svg$Svg$Attributes$dur(speed),
											elm_lang$svg$Svg$Attributes$from('0 18 18'),
											elm_lang$svg$Svg$Attributes$repeatCount('indefinite'),
											elm_lang$svg$Svg$Attributes$to('360 18 18'),
											elm_lang$svg$Svg$Attributes$type_('rotate')
										]),
									_List_Nil)
								])),
							A2(
							elm_lang$svg$Svg$circle,
							_List_fromArray(
								[
									elm_lang$svg$Svg$Attributes$cx('36'),
									elm_lang$svg$Svg$Attributes$cy('18'),
									elm_lang$svg$Svg$Attributes$fill(colorString),
									elm_lang$svg$Svg$Attributes$r('1')
								]),
							_List_fromArray(
								[
									A2(
									elm_lang$svg$Svg$animateTransform,
									_List_fromArray(
										[
											elm_lang$svg$Svg$Attributes$attributeName('transform'),
											elm_lang$svg$Svg$Attributes$dur(speed),
											elm_lang$svg$Svg$Attributes$from('0 18 18'),
											elm_lang$svg$Svg$Attributes$repeatCount('indefinite'),
											elm_lang$svg$Svg$Attributes$to('360 18 18'),
											elm_lang$svg$Svg$Attributes$type_('rotate')
										]),
									_List_Nil)
								]))
						]))
				]));
	});
var elm_lang$svg$Svg$animate = elm_lang$svg$Svg$trustedNode('animate');
var elm_lang$svg$Svg$Attributes$values = function (value) {
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
			elm_lang$svg$Svg$svg,
			_List_fromArray(
				[
					elm_lang$svg$Svg$Attributes$viewBox('0 0 64 64'),
					elm_lang$svg$Svg$Attributes$xmlSpace('http://www.w3.org/2000/svg'),
					elm_lang$svg$Svg$Attributes$width(
					elm_lang$core$String$fromInt(size)),
					elm_lang$svg$Svg$Attributes$height(
					elm_lang$core$String$fromInt(size))
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$svg$Svg$g,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm_lang$svg$Svg$circle,
							_List_fromArray(
								[
									elm_lang$svg$Svg$Attributes$cx('16'),
									elm_lang$svg$Svg$Attributes$cy('32'),
									elm_lang$svg$Svg$Attributes$strokeWidth('0'),
									elm_lang$svg$Svg$Attributes$r('4.26701'),
									elm_lang$svg$Svg$Attributes$fill(colorString)
								]),
							_List_fromArray(
								[
									A2(
									elm_lang$svg$Svg$animate,
									_List_fromArray(
										[
											elm_lang$svg$Svg$Attributes$attributeName('fill-opacity'),
											elm_lang$svg$Svg$Attributes$dur('750ms'),
											elm_lang$svg$Svg$Attributes$values('.5;.6;.8;1;.8;.6;.5;.5'),
											elm_lang$svg$Svg$Attributes$repeatCount('indefinite')
										]),
									_List_Nil),
									A2(
									elm_lang$svg$Svg$animate,
									_List_fromArray(
										[
											elm_lang$svg$Svg$Attributes$attributeName('r'),
											elm_lang$svg$Svg$Attributes$dur('750ms'),
											elm_lang$svg$Svg$Attributes$values('3;3;4;5;6;5;4;3'),
											elm_lang$svg$Svg$Attributes$repeatCount('indefinite')
										]),
									_List_Nil)
								])),
							A2(
							elm_lang$svg$Svg$circle,
							_List_fromArray(
								[
									elm_lang$svg$Svg$Attributes$cx('32'),
									elm_lang$svg$Svg$Attributes$cy('32'),
									elm_lang$svg$Svg$Attributes$strokeWidth('0'),
									elm_lang$svg$Svg$Attributes$r('5.26701'),
									elm_lang$svg$Svg$Attributes$fill(colorString)
								]),
							_List_fromArray(
								[
									A2(
									elm_lang$svg$Svg$animate,
									_List_fromArray(
										[
											elm_lang$svg$Svg$Attributes$attributeName('fill-opacity'),
											elm_lang$svg$Svg$Attributes$dur('750ms'),
											elm_lang$svg$Svg$Attributes$values('.5;.5;.6;.8;1;.8;.6;.5'),
											elm_lang$svg$Svg$Attributes$repeatCount('indefinite')
										]),
									_List_Nil),
									A2(
									elm_lang$svg$Svg$animate,
									_List_fromArray(
										[
											elm_lang$svg$Svg$Attributes$attributeName('r'),
											elm_lang$svg$Svg$Attributes$dur('750ms'),
											elm_lang$svg$Svg$Attributes$values('4;3;3;4;5;6;5;4'),
											elm_lang$svg$Svg$Attributes$repeatCount('indefinite')
										]),
									_List_Nil)
								])),
							A2(
							elm_lang$svg$Svg$circle,
							_List_fromArray(
								[
									elm_lang$svg$Svg$Attributes$cx('48'),
									elm_lang$svg$Svg$Attributes$cy('32'),
									elm_lang$svg$Svg$Attributes$strokeWidth('0'),
									elm_lang$svg$Svg$Attributes$r('5.73299'),
									elm_lang$svg$Svg$Attributes$fill(colorString)
								]),
							_List_fromArray(
								[
									A2(
									elm_lang$svg$Svg$animate,
									_List_fromArray(
										[
											elm_lang$svg$Svg$Attributes$attributeName('fill-opacity'),
											elm_lang$svg$Svg$Attributes$dur('750ms'),
											elm_lang$svg$Svg$Attributes$values('.6;.5;.5;.6;.8;1;.8;.6'),
											elm_lang$svg$Svg$Attributes$repeatCount('indefinite')
										]),
									_List_Nil),
									A2(
									elm_lang$svg$Svg$animate,
									_List_fromArray(
										[
											elm_lang$svg$Svg$Attributes$attributeName('r'),
											elm_lang$svg$Svg$Attributes$dur('750ms'),
											elm_lang$svg$Svg$Attributes$values('5;4;3;3;4;5;6;5'),
											elm_lang$svg$Svg$Attributes$repeatCount('indefinite')
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
				if (!sp.$) {
					return A2(author$project$Framework$Spinner$spinnerThreeCirclesHtml, size, color);
				} else {
					return A2(author$project$Framework$Spinner$spinnerRotationHtml, size, color);
				}
			}());
	});
var elm_lang$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm_lang$html$Html$Attributes$style = elm_lang$virtual_dom$VirtualDom$style;
var mdgriffith$stylish_elephants$Internal$Model$CenterX = 1;
var mdgriffith$stylish_elephants$Element$centerX = mdgriffith$stylish_elephants$Internal$Model$AlignX(1);
var mdgriffith$stylish_elephants$Internal$Model$AlignY = function (a) {
	return {$: 5, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$CenterY = 1;
var mdgriffith$stylish_elephants$Element$centerY = mdgriffith$stylish_elephants$Internal$Model$AlignY(1);
var mdgriffith$stylish_elephants$Element$htmlAttribute = mdgriffith$stylish_elephants$Internal$Model$Attr;
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
			var style = attr.a;
			return elm_lang$core$Maybe$Just(style);
		case 10:
			var shadow = attr.a;
			var stringName = mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow);
			return elm_lang$core$Maybe$Just(
				A2(
					mdgriffith$stylish_elephants$Internal$Model$Shadows,
					'txt-shadow-' + mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow),
					stringName));
		case 11:
			var shadow = attr.a;
			var stringName = mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(shadow);
			return elm_lang$core$Maybe$Just(
				A2(
					mdgriffith$stylish_elephants$Internal$Model$Shadows,
					'box-shadow-' + mdgriffith$stylish_elephants$Internal$Model$boxShadowName(shadow),
					stringName));
		default:
			return elm_lang$core$Maybe$Nothing;
	}
};
var elm_lang$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm_lang$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var elm_lang$html$Html$Attributes$map = elm_lang$virtual_dom$VirtualDom$mapAttribute;
var mdgriffith$stylish_elephants$Internal$Model$BoxShadow = function (a) {
	return {$: 11, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Describe = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Filter = function (a) {
	return {$: 12, a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$NoAttribute = {$: 0};
var mdgriffith$stylish_elephants$Internal$Model$TextShadow = function (a) {
	return {$: 10, a: a};
};
var elm_lang$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm_lang$html$Html$map = elm_lang$virtual_dom$VirtualDom$map;
var mdgriffith$stylish_elephants$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 1:
				var styled = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$Styled(
					{
						$7: F2(
							function (add, context) {
								return A2(
									elm_lang$html$Html$map,
									fn,
									A2(styled.$7, add, context));
							}),
						ep: styled.ep
					});
			case 0:
				var html = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					function ($) {
						return A2(
							elm_lang$html$Html$map,
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
				var style = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$StyleClass(style);
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
					A2(elm_lang$html$Html$Attributes$map, fn, htmlAttr));
			case 10:
				var shadow = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$TextShadow(shadow);
			case 11:
				var shadow = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$BoxShadow(shadow);
			default:
				var filt = attr.a;
				return mdgriffith$stylish_elephants$Internal$Model$Filter(filt);
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$removeNever = function (style) {
	return A2(mdgriffith$stylish_elephants$Internal$Model$mapAttrFromStyle, elm_lang$core$Basics$never, style);
};
var mdgriffith$stylish_elephants$Internal$Model$unwrapDecorations = function (attrs) {
	var joinShadows = F2(
		function (x, styles) {
			if (x.$ === 12) {
				var name = x.a;
				var shadowProps = x.b;
				var _n3 = styles.aw;
				if (_n3.$ === 1) {
					return _Utils_update(
						styles,
						{
							aw: elm_lang$core$Maybe$Just(
								_Utils_Tuple2(name, shadowProps))
						});
				} else {
					var _n4 = _n3.a;
					var existingName = _n4.a;
					var existingShadow = _n4.b;
					return _Utils_update(
						styles,
						{
							aw: elm_lang$core$Maybe$Just(
								_Utils_Tuple2(
									_Utils_ap(existingName, name),
									existingShadow + (', ' + shadowProps)))
						});
				}
			} else {
				return _Utils_update(
					styles,
					{
						ep: A2(elm_lang$core$List$cons, x, styles.ep)
					});
			}
		});
	var addShadow = function (styles) {
		var _n0 = styles.aw;
		if (_n0.$ === 1) {
			return styles.ep;
		} else {
			var _n1 = _n0.a;
			var shadowName = _n1.a;
			var shadowProps = _n1.b;
			return A2(
				elm_lang$core$List$cons,
				A2(mdgriffith$stylish_elephants$Internal$Model$Shadows, shadowName, shadowProps),
				styles.ep);
		}
	};
	return addShadow(
		A3(
			elm_lang$core$List$foldr,
			joinShadows,
			{aw: elm_lang$core$Maybe$Nothing, ep: _List_Nil},
			A2(
				elm_lang$core$List$filterMap,
				function ($) {
					return mdgriffith$stylish_elephants$Internal$Model$onlyStyles(
						mdgriffith$stylish_elephants$Internal$Model$removeNever($));
				},
				attrs)));
};
var mdgriffith$stylish_elephants$Element$mouseOver = function (decs) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		A2(
			mdgriffith$stylish_elephants$Internal$Model$PseudoSelector,
			1,
			A2(
				elm_lang$core$List$map,
				mdgriffith$stylish_elephants$Internal$Model$tag('hover'),
				mdgriffith$stylish_elephants$Internal$Model$unwrapDecorations(decs))));
};
var mdgriffith$stylish_elephants$Element$paddingXY = F2(
	function (x, y) {
		return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
			A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, y, x, y, x));
	});
var mdgriffith$stylish_elephants$Element$Background$color = function (clr) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Colored,
			'bg-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var mdgriffith$stylish_elephants$Element$Border$color = function (clr) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Colored,
			'border-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var mdgriffith$stylish_elephants$Element$Border$rounded = function (radius) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Single,
			'border-radius-' + elm_lang$core$String$fromInt(radius),
			'border-radius',
			elm_lang$core$String$fromInt(radius) + 'px'));
};
var mdgriffith$stylish_elephants$Element$Border$width = function (v) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Single,
			'border-' + elm_lang$core$String$fromInt(v),
			'border-width',
			elm_lang$core$String$fromInt(v) + 'px'));
};
var author$project$Framework$Button$buttonAttr = function (modifiers) {
	var confButton = A3(
		elm_lang$core$List$foldl,
		author$project$Framework$Button$processConf,
		{j: author$project$Framework$Button$colorDefault, B: 1, l: 0},
		modifiers);
	var fontSize = author$project$Framework$Button$toPx(confButton.B);
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
					author$project$Framework$ColorManipulation$saturate,
					0.9,
					A2(author$project$Framework$ColorManipulation$lighten, 0.8, fontColor));
		}
	}();
	var buttonPadding = author$project$Framework$Button$toButtonPadding(confButton.B);
	var borderRounded = function () {
		var _n3 = confButton.B;
		if (!_n3.$) {
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
					author$project$Framework$ColorManipulation$saturate,
					0.4,
					A2(author$project$Framework$ColorManipulation$lighten, 1.1, cc));
		}
	}();
	var backgroundMouseOverColor = function () {
		var _n1 = confButton.l;
		if (_n1.$ === 1) {
			return cc;
		} else {
			return A2(
				author$project$Framework$ColorManipulation$saturate,
				0.9,
				A2(author$project$Framework$ColorManipulation$lighten, 0.8, backgroundColor));
		}
	}();
	var borderColor = function () {
		if (_Utils_eq(confButton.j, author$project$Framework$Color$white)) {
			return author$project$Framework$Button$colorBorderDefault;
		} else {
			var _n0 = confButton.l;
			if (_n0.$ === 1) {
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
				mdgriffith$stylish_elephants$Element$Font$size(fontSize),
				mdgriffith$stylish_elephants$Element$Font$color(fontColor),
				mdgriffith$stylish_elephants$Element$Background$color(backgroundColor),
				A2(mdgriffith$stylish_elephants$Element$paddingXY, buttonPadding.a, buttonPadding.b),
				mdgriffith$stylish_elephants$Element$Border$rounded(borderRounded),
				mdgriffith$stylish_elephants$Element$Border$width(1),
				mdgriffith$stylish_elephants$Element$Border$color(borderColor)
			]),
		_Utils_ap(
			(confButton.l === 4) ? _List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$htmlAttribute(
					A2(elm_lang$html$Html$Attributes$style, 'cursor', 'not-allowed'))
				]) : _List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$mouseOver(
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$Font$color(fontMouseOverColor),
							mdgriffith$stylish_elephants$Element$Background$color(backgroundMouseOverColor),
							mdgriffith$stylish_elephants$Element$Border$color(borderMouseOverColor)
						]))
				]),
			inFrontAddon));
};
var elm_lang$json$Json$Encode$bool = _Json_wrap;
var elm_lang$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm_lang$json$Json$Encode$bool(bool));
	});
var elm_lang$html$Html$Attributes$disabled = elm_lang$html$Html$Attributes$boolProperty('disabled');
var elm_lang$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		elm_lang$core$String$fromInt(n));
};
var mdgriffith$stylish_elephants$Element$pointer = A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'cursor', mdgriffith$stylish_elephants$Internal$Style$classes.c4);
var elm_lang$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var elm_lang$virtual_dom$VirtualDom$Sync = function (a) {
	return {$: 0, a: a};
};
var elm_lang$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm_lang$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm_lang$virtual_dom$VirtualDom$on,
			event,
			elm_lang$virtual_dom$VirtualDom$Normal(
				A2(elm_lang$json$Json$Decode$map, elm_lang$virtual_dom$VirtualDom$Sync, decoder)));
	});
var elm_lang$html$Html$Events$onClick = function (msg) {
	return A2(
		elm_lang$html$Html$Events$on,
		'click',
		elm_lang$json$Json$Decode$succeed(msg));
};
var mdgriffith$stylish_elephants$Element$Events$onClick = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm_lang$html$Html$Events$onClick($));
};
var elm_lang$core$List$any = F2(
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
	if (((attr.$ === 4) && (attr.a.$ === 10)) && (!attr.a.a.$)) {
		var _n1 = attr.a;
		var _n2 = _n1.a;
		return true;
	} else {
		return false;
	}
};
var mdgriffith$stylish_elephants$Element$Input$focusDefault = function (attrs) {
	return A2(elm_lang$core$List$any, mdgriffith$stylish_elephants$Element$Input$hasFocusStyle, attrs) ? mdgriffith$stylish_elephants$Internal$Model$NoAttribute : mdgriffith$stylish_elephants$Internal$Model$htmlClass('focusable');
};
var mdgriffith$stylish_elephants$Element$Input$enter = 'Enter';
var elm_lang$html$Html$Events$syncTuple = function (_n0) {
	var msg = _n0.a;
	var bool = _n0.b;
	return _Utils_Tuple2(
		elm_lang$virtual_dom$VirtualDom$Sync(msg),
		bool);
};
var elm_lang$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var elm_lang$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			elm_lang$virtual_dom$VirtualDom$on,
			event,
			elm_lang$virtual_dom$VirtualDom$MayPreventDefault(
				A2(elm_lang$json$Json$Decode$map, elm_lang$html$Html$Events$syncTuple, decoder)));
	});
var elm_lang$json$Json$Decode$andThen = _Json_andThen;
var elm_lang$json$Json$Decode$fail = _Json_fail;
var elm_lang$json$Json$Decode$string = _Json_decodeString;
var mdgriffith$stylish_elephants$Element$Input$onKey = F2(
	function (desiredCode, msg) {
		var decode = function (code) {
			return _Utils_eq(code, desiredCode) ? elm_lang$json$Json$Decode$succeed(msg) : elm_lang$json$Json$Decode$fail('Not the enter key');
		};
		var isKey = A2(
			elm_lang$json$Json$Decode$andThen,
			decode,
			A2(elm_lang$json$Json$Decode$field, 'key', elm_lang$json$Json$Decode$string));
		return mdgriffith$stylish_elephants$Internal$Model$Attr(
			A2(
				elm_lang$html$Html$Events$preventDefaultOn,
				'keyup',
				A2(
					elm_lang$json$Json$Decode$map,
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
		var onPress = _n0.aW;
		var label = _n0.aS;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm_lang$core$Maybe$Nothing,
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
					A2(
						elm_lang$core$List$cons,
						A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'x-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.ai),
						A2(
							elm_lang$core$List$cons,
							A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'y-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.V),
							A2(
								elm_lang$core$List$cons,
								A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'button', 'se-button'),
								A2(
									elm_lang$core$List$cons,
									mdgriffith$stylish_elephants$Element$pointer,
									A2(
										elm_lang$core$List$cons,
										mdgriffith$stylish_elephants$Element$Input$focusDefault(attrs),
										A2(
											elm_lang$core$List$cons,
											mdgriffith$stylish_elephants$Internal$Model$Describe(mdgriffith$stylish_elephants$Internal$Model$Button),
											A2(
												elm_lang$core$List$cons,
												mdgriffith$stylish_elephants$Internal$Model$Attr(
													elm_lang$html$Html$Attributes$tabindex(0)),
												function () {
													if (onPress.$ === 1) {
														return A2(
															elm_lang$core$List$cons,
															mdgriffith$stylish_elephants$Internal$Model$Attr(
																elm_lang$html$Html$Attributes$disabled(true)),
															attrs);
													} else {
														var msg = onPress.a;
														return A2(
															elm_lang$core$List$cons,
															mdgriffith$stylish_elephants$Element$Events$onClick(msg),
															A2(
																elm_lang$core$List$cons,
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
				aS: mdgriffith$stylish_elephants$Element$text(label),
				aW: onPress
			});
	});
var author$project$Framework$Button$buttonLink = F3(
	function (modifiers, url, label) {
		return A2(
			mdgriffith$stylish_elephants$Element$link,
			author$project$Framework$Button$buttonAttr(modifiers),
			{
				aS: mdgriffith$stylish_elephants$Element$text(label),
				n: url
			});
	});
var mdgriffith$stylish_elephants$Element$Font$center = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Style$classes.cb, mdgriffith$stylish_elephants$Internal$Style$classes.cb);
var author$project$Framework$Button$extraAttrForButtonWidth = function (buttonX) {
	return _List_fromArray(
		[
			mdgriffith$stylish_elephants$Element$htmlAttribute(
			A2(elm_lang$html$Html$Attributes$style, 'width', '100%')),
			mdgriffith$stylish_elephants$Element$htmlAttribute(
			A2(
				elm_lang$html$Html$Attributes$style,
				'max-width',
				elm_lang$core$String$fromInt(buttonX) + 'px')),
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
				aS: mdgriffith$stylish_elephants$Element$text(label),
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
				aS: mdgriffith$stylish_elephants$Element$text(label),
				aW: onPress
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
			elm_lang$core$Maybe$Nothing,
			A2(
				elm_lang$core$List$cons,
				A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'x-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.bD),
				A2(
					elm_lang$core$List$cons,
					A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'y-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.V),
					A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
						A2(
							elm_lang$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							attrs)))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var author$project$Framework$Button$introspection = function () {
	var buttonText = 'Button';
	return {
		aj: 'Buttons accept a list of modifiers, a Maybe msg (for example: \"Just DoSomething\") and the text to display inside the button.',
		r: 'Buttons',
		ax: 'List Modifier -> Maybe msg -> String -> Element msg',
		ac: _List_fromArray(
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
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Primary ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[1, 10]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Primary, Outlined ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[1, 11]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Primary, Loading ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[1, 12]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Primary, Waiting ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[1, 13]),
							elm_lang$core$Maybe$Nothing,
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
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Muted ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[1]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Primary ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[2]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Success ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[3]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Info ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[4]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Warning ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[5]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Danger ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(author$project$Framework$Button$button, _List_Nil, elm_lang$core$Maybe$Nothing, buttonText),
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
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Small ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(author$project$Framework$Button$button, _List_Nil, elm_lang$core$Maybe$Nothing, buttonText),
						'button [] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[7]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Medium ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[8]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Large ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[9]),
							elm_lang$core$Maybe$Nothing,
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
								aS: mdgriffith$stylish_elephants$Element$text('button'),
								aW: elm_lang$core$Maybe$Nothing
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
								aS: mdgriffith$stylish_elephants$Element$text('button'),
								aW: elm_lang$core$Maybe$Nothing
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
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Muted ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13, 1]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Primary ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13, 2]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Success ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13, 3]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Info ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13, 4]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Warning ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13, 5]),
							elm_lang$core$Maybe$Nothing,
							buttonText),
						'button [ Danger ] Nothing \"' + (buttonText + '\"')),
						_Utils_Tuple2(
						A3(
							author$project$Framework$Button$button,
							_List_fromArray(
								[13]),
							elm_lang$core$Maybe$Nothing,
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
						A3(author$project$Framework$Button$button, _List_Nil, elm_lang$core$Maybe$Nothing, 'Button'),
						'button [] Nothing "Button" '),
						_Utils_Tuple2(
						A4(author$project$Framework$Button$buttonWidth, _List_Nil, elm_lang$core$Maybe$Nothing, 'ButtonWidth 200', 200),
						'buttonWidth [] Nothing "ButtonWidth 200" 200'),
						_Utils_Tuple2(
						A4(author$project$Framework$Button$buttonWidth, _List_Nil, elm_lang$core$Maybe$Nothing, 'ButtonWidth 300', 300),
						'buttonWidth [] Nothing "ButtonWidth 300" 300'),
						_Utils_Tuple2(
						A4(author$project$Framework$Button$buttonWidth, _List_Nil, elm_lang$core$Maybe$Nothing, 'ButtonWidth of 200px with very long text', 200),
						'buttonWidth [] Nothing "ButtonWidth of 200px with very long text" 200'),
						_Utils_Tuple2(
						A4(author$project$Framework$Button$buttonLinkWidth, _List_Nil, 'http://example.com', 'ButtonWidthLink 300', 300),
						'buttonLinkWidth [] "http://example.com" "ButtonWidthLink 300" 300')
					]))
			])
	};
}();
var mdgriffith$stylish_elephants$Element$rgba = mdgriffith$stylish_elephants$Internal$Model$Rgba;
var author$project$Color$rgba = F4(
	function (r, g, b, a) {
		return A4(mdgriffith$stylish_elephants$Element$rgba, r, g, b, a);
	});
var mdgriffith$stylish_elephants$Element$Border$shadow = function (shade) {
	return mdgriffith$stylish_elephants$Internal$Model$BoxShadow(
		{cL: shade.cL, j: shade.j, bi: false, dO: shade.dO, B: shade.B});
};
var author$project$Framework$Card$cardCommonAttr = _List_fromArray(
	[
		mdgriffith$stylish_elephants$Element$Border$shadow(
		{
			cL: 10,
			j: A4(author$project$Color$rgba, 0, 0, 0, 5.0e-2),
			dO: _Utils_Tuple2(0, 2),
			B: 1
		}),
		mdgriffith$stylish_elephants$Element$Border$width(1),
		mdgriffith$stylish_elephants$Element$Border$color(author$project$Framework$Color$grey_lighter),
		mdgriffith$stylish_elephants$Element$Background$color(author$project$Framework$Color$white),
		mdgriffith$stylish_elephants$Element$Border$rounded(4)
	]);
var mdgriffith$stylish_elephants$Element$padding = function (x) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
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
var author$project$Framework$Color$grey = author$project$Framework$Configuration$conf.j.dh;
var author$project$Framework$Color$grey_light = author$project$Framework$Configuration$conf.j.dk;
var mdgriffith$stylish_elephants$Element$Border$widthEach = function (_n0) {
	var bottom = _n0.cT;
	var top = _n0.ew;
	var left = _n0.dw;
	var right = _n0.eb;
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Single,
			'border-' + (elm_lang$core$String$fromInt(top) + ('-' + (elm_lang$core$String$fromInt(right) + (elm_lang$core$String$fromInt(bottom) + ('-' + elm_lang$core$String$fromInt(left)))))),
			'border-width',
			elm_lang$core$String$fromInt(top) + ('px ' + (elm_lang$core$String$fromInt(right) + ('px ' + (elm_lang$core$String$fromInt(bottom) + ('px ' + (elm_lang$core$String$fromInt(left) + 'px'))))))));
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
							{cT: 1, dw: 0, eb: 0, ew: 0}),
							mdgriffith$stylish_elephants$Element$Border$color(author$project$Framework$Color$grey_light),
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
										mdgriffith$stylish_elephants$Element$Font$color(author$project$Framework$Color$grey)
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
	aj: 'Wrapper for content',
	r: 'Cards',
	ax: '',
	ac: _List_fromArray(
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
var author$project$Framework$Color$background = author$project$Framework$Configuration$conf.j.cE;
var author$project$Framework$Color$black = author$project$Framework$Configuration$conf.j.cH;
var author$project$Framework$Color$black_bis = author$project$Framework$Configuration$conf.j.cI;
var author$project$Framework$Color$black_ter = author$project$Framework$Configuration$conf.j.cJ;
var author$project$Framework$Color$blue = author$project$Framework$Configuration$conf.j.cK;
var author$project$Framework$Color$border = author$project$Framework$Configuration$conf.j.cN;
var author$project$Framework$Color$border_hover = author$project$Framework$Configuration$conf.j.cS;
var author$project$Framework$Color$code = author$project$Framework$Configuration$conf.j.c0;
var author$project$Framework$Color$code_background = author$project$Framework$Configuration$conf.j.c1;
var author$project$Framework$Color$cyan = author$project$Framework$Configuration$conf.j.c5;
var author$project$Framework$Color$dark = author$project$Framework$Configuration$conf.j.c7;
var author$project$Framework$Color$green = author$project$Framework$Configuration$conf.j.dg;
var author$project$Framework$Color$grey_darker = author$project$Framework$Configuration$conf.j.dj;
var author$project$Framework$Color$light = author$project$Framework$Configuration$conf.j.dx;
var author$project$Framework$Color$link = author$project$Framework$Configuration$conf.j.dz;
var author$project$Framework$Color$link_active = author$project$Framework$Configuration$conf.j.dA;
var author$project$Framework$Color$link_active_border = author$project$Framework$Configuration$conf.j.dB;
var author$project$Framework$Color$link_focus = author$project$Framework$Configuration$conf.j.dC;
var author$project$Framework$Color$link_focus_border = author$project$Framework$Configuration$conf.j.dD;
var author$project$Framework$Color$link_hover = author$project$Framework$Configuration$conf.j.dE;
var author$project$Framework$Color$link_hover_border = author$project$Framework$Configuration$conf.j.dF;
var author$project$Framework$Color$link_invert = author$project$Framework$Configuration$conf.j.dG;
var author$project$Framework$Color$link_visited = author$project$Framework$Configuration$conf.j.dH;
var author$project$Framework$Color$orange = author$project$Framework$Configuration$conf.j.dV;
var author$project$Framework$Color$pre = author$project$Framework$Configuration$conf.j.d5;
var author$project$Framework$Color$pre_background = author$project$Framework$Configuration$conf.j.d6;
var author$project$Framework$Color$purple = author$project$Framework$Configuration$conf.j.d8;
var author$project$Framework$Color$red = author$project$Framework$Configuration$conf.j.d9;
var author$project$Framework$Color$text = author$project$Framework$Configuration$conf.j.et;
var author$project$Framework$Color$text_light = author$project$Framework$Configuration$conf.j.eu;
var author$project$Framework$Color$text_strong = author$project$Framework$Configuration$conf.j.ev;
var author$project$Framework$Color$turquoise = author$project$Framework$Configuration$conf.j.eA;
var author$project$Framework$ColorManipulation$fromNaNtoZeroFloat = function (value) {
	return (elm_lang$core$String$fromFloat(value) === 'NaN') ? 0 : value;
};
var author$project$Framework$ColorManipulation$norm100 = function (value) {
	return elm_lang$core$Basics$round(value * 100);
};
var author$project$Framework$ColorManipulation$norm57 = function (value) {
	return elm_lang$core$Basics$round(value * 57);
};
var author$project$Framework$ColorManipulation$colorToHsl2 = function (cl) {
	var _n0 = author$project$Color$toHsl(cl);
	var hue = _n0.dp;
	var saturation = _n0.ee;
	var lightness = _n0.dy;
	var alpha = _n0.cB;
	return 'hsla(' + (A2(
		elm_lang$core$String$join,
		', ',
		_List_fromArray(
			[
				elm_lang$core$String$fromInt(
				author$project$Framework$ColorManipulation$norm57(
					author$project$Framework$ColorManipulation$fromNaNtoZeroFloat(hue))),
				elm_lang$core$String$fromInt(
				author$project$Framework$ColorManipulation$norm100(
					author$project$Framework$ColorManipulation$fromNaNtoZeroFloat(saturation))) + '%',
				elm_lang$core$String$fromInt(
				author$project$Framework$ColorManipulation$norm100(
					author$project$Framework$ColorManipulation$fromNaNtoZeroFloat(lightness))) + '%',
				elm_lang$core$String$fromFloat(
				author$project$Framework$ColorManipulation$norm100(alpha) / 100)
			])) + ')');
};
var author$project$Color$white = A3(mdgriffith$stylish_elephants$Element$rgb, 0.9, 0.9, 0.9);
var author$project$Framework$ColorManipulation$intensity = function (c) {
	var rgb = author$project$Color$toRgb(c);
	return ((rgb.d9 * 0.299) + (rgb.dg * 0.587)) + (rgb.cK * 0.114);
};
var author$project$Framework$ColorManipulation$maximumContrast = function (c) {
	return (author$project$Framework$ColorManipulation$intensity(c) < 186) ? author$project$Color$white : author$project$Color$black;
};
var author$project$Framework$Color$usageWrapper = function (cl) {
	return A2(
		mdgriffith$stylish_elephants$Element$el,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Background$color(cl),
				mdgriffith$stylish_elephants$Element$width(
				mdgriffith$stylish_elephants$Element$px(200)),
				mdgriffith$stylish_elephants$Element$padding(10),
				mdgriffith$stylish_elephants$Element$Border$rounded(5),
				mdgriffith$stylish_elephants$Element$Font$color(
				author$project$Framework$ColorManipulation$maximumContrast(cl))
			]),
		A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_Nil,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$text(
					author$project$Framework$ColorManipulation$colorToHex(cl)),
					mdgriffith$stylish_elephants$Element$text(
					author$project$Framework$ColorManipulation$colorToHsl2(cl))
				])));
};
var author$project$Framework$Color$white_bis = author$project$Framework$Configuration$conf.j.eH;
var author$project$Framework$Color$white_ter = author$project$Framework$Configuration$conf.j.eI;
var author$project$Framework$Color$yellow = author$project$Framework$Configuration$conf.j.eM;
var author$project$Framework$Color$introspection = {
	aj: '',
	r: 'Colors',
	ax: 'Element.Color',
	ac: _List_fromArray(
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
	aj: 'List of elements for Web Forms',
	r: 'Fields',
	ax: '',
	ac: _List_fromArray(
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
	aj: 'List of elements for Web Forms',
	r: 'Fields With Patterns',
	ax: '',
	ac: _List_fromArray(
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
				elm_lang$svg$Svg$svg,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$viewBox('0 0 490 490'),
						elm_lang$svg$Svg$Attributes$height(
						elm_lang$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$d('M112 97c72-65 181-66 254-7l-58 3c-8 0-13 6-13 14 0 7 6 13 13 13h1l89-4c7 0 13-6 13-13v-2l-3-88a14 14 0 0 0-27 1l2 55c-36-29-81-47-129-49A222 222 0 0 0 27 294a13 13 0 0 0 17 10c7-2 11-9 9-16-16-70 6-143 59-191zm350 99a14 14 0 0 0-26 6 195 195 0 0 1-314 196l59-5a13 13 0 1 0-3-27l-88 8c-8 1-13 7-13 15l8 88c1 7 7 13 14 13h1c7-1 13-8 12-15l-5-54a221 221 0 0 0 289-8c60-55 86-138 66-217z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$chevronDown = F2(
	function (_n0, size) {
		return mdgriffith$stylish_elephants$Element$html(
			A2(
				elm_lang$svg$Svg$svg,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$viewBox('0 0 256 256'),
						elm_lang$svg$Svg$Attributes$height(
						elm_lang$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$d('M225.81 48.9L128 146.73 30.19 48.91 0 79.09l128 128 128-128z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$exitFullscreen = F2(
	function (_n0, size) {
		return mdgriffith$stylish_elephants$Element$html(
			A2(
				elm_lang$svg$Svg$svg,
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$Attributes$style,
						'height',
						elm_lang$core$String$fromInt(size) + 'px'),
						elm_lang$svg$Svg$Attributes$viewBox('0 0 32 32')
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill('#030104'),
								elm_lang$svg$Svg$Attributes$d('M25 27l4 5 3-3-5-4 5-5H20v12zM0 12h12V0L7 5 3 0 0 3l5 4zm0 17l3 3 4-5 5 5V20H0l5 5zm20-17h12l-5-5 5-4-3-3-4 5-5-5z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$fullscreen = F2(
	function (_n0, size) {
		return mdgriffith$stylish_elephants$Element$html(
			A2(
				elm_lang$svg$Svg$svg,
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$Attributes$style,
						'height',
						elm_lang$core$String$fromInt(size) + 'px'),
						elm_lang$svg$Svg$Attributes$viewBox('0 0 533 533')
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$d('M533 0v217l-83-84-100 100-50-50L400 83 317 0h216zM233 350L133 450l84 83H0V317l83 83 100-100 50 50z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$hide = F2(
	function (cl, size) {
		return mdgriffith$stylish_elephants$Element$html(
			A2(
				elm_lang$svg$Svg$svg,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$viewBox('0 0 512 512'),
						elm_lang$svg$Svg$Attributes$height(
						elm_lang$core$String$fromInt(size)),
						elm_lang$svg$Svg$Attributes$width(
						elm_lang$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm_lang$svg$Svg$Attributes$d('M506 241l-89-89-14-13-258 258a227 227 0 0 0 272-37l89-89c8-8 8-22 0-30zM256 363a21 21 0 0 1 0-43c35 0 64-29 64-64a21 21 0 0 1 43 0c0 59-48 107-107 107zM95 152L6 241c-8 8-8 22 0 30l89 89 14 13 258-258c-86-49-198-37-272 37zm161 40c-35 0-64 29-64 64a21 21 0 0 1-43 0c0-59 48-107 107-107a21 21 0 0 1 0 43z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$home = F2(
	function (_n0, size) {
		return mdgriffith$stylish_elephants$Element$html(
			A2(
				elm_lang$svg$Svg$svg,
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$Attributes$style,
						'height',
						elm_lang$core$String$fromInt(size) + 'px'),
						elm_lang$svg$Svg$Attributes$viewBox('0 0 34.94 32.63')
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$d('M34.94 15.58L17.24 0 0 15.65l1.5 1.66 2.14-1.92v17.25h27.68V15.38l2.14 1.88zM14.8 29.93V21.6h5.35v8.34zm14.27.45H22.4v-11h-9.84v11H5.88v-17L17.25 3l11.82 10.4z'),
								elm_lang$svg$Svg$Attributes$fill('#262626'),
								elm_lang$svg$Svg$Attributes$id('_01')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$mobileNotification = F2(
	function (cl, size) {
		return mdgriffith$stylish_elephants$Element$html(
			A2(
				elm_lang$svg$Svg$svg,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$viewBox('0 0 60 60'),
						elm_lang$svg$Svg$Attributes$height(
						elm_lang$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm_lang$svg$Svg$Attributes$d('M20 49a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM17 5h4a1 1 0 1 0 0-2h-4a1 1 0 1 0 0 2zm7 0h1a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2z')
							]),
						_List_Nil),
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm_lang$svg$Svg$Attributes$d('M56 12H38V4c0-2-2-4-4-4H8C6 0 4 2 4 4v52c0 2 2 4 4 4h26c2 0 4-2 4-4V33h18V12zM8 2h26l2 2v2H6V4l2-2zm26 56H8l-2-2v-8h30v8l-2 2zm2-12H6V8h30v4H18v21h4v7l9-7h5v13zm18-15H31l-7 5v-5h-4V14h34v17z')
							]),
						_List_Nil),
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm_lang$svg$Svg$Attributes$d('M25 21h10a1 1 0 1 0 0-2H25a1 1 0 1 0 0 2zm-1 4l1 1h24a1 1 0 1 0 0-2H25l-1 1z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$mobileNotification2 = F2(
	function (cl, size) {
		return mdgriffith$stylish_elephants$Element$html(
			A2(
				elm_lang$svg$Svg$svg,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$viewBox('0 0 31.68 31.68'),
						elm_lang$svg$Svg$Attributes$height(
						elm_lang$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm_lang$svg$Svg$Attributes$d('M21.5 25.67H7V3.89h14.5v4.7h1.73V2.3a2.3 2.3 0 0 0-2.3-2.3H7.58a2.3 2.3 0 0 0-2.3 2.3v27.08a2.3 2.3 0 0 0 2.3 2.3h13.33a2.3 2.3 0 0 0 2.3-2.3V19.2H21.5v6.46zM19.4 1.44c.33 0 .59.27.59.6s-.26.58-.59.58-.59-.26-.59-.59.26-.59.59-.59zm-8.24.23h6.19v.67h-6.19v-.67zm5.91 27.55h-5.63V27.5h5.63v1.73z')
							]),
						_List_Nil),
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm_lang$svg$Svg$Attributes$d('M13.05 9.3v9h1.56L13.05 22l4.54-3.7h8.81v-9H13.05zm12.21 7.86H17.2l-.32.25-1 .81.45-1.06H14.2v-6.71h11.07v6.7z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$mobileRinging = F2(
	function (cl, size) {
		var hexColor = author$project$Framework$ColorManipulation$colorToHex(cl);
		return mdgriffith$stylish_elephants$Element$html(
			A2(
				elm_lang$svg$Svg$svg,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$viewBox('0 0 60 60'),
						elm_lang$svg$Svg$Attributes$height(
						elm_lang$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill(hexColor),
								elm_lang$svg$Svg$Attributes$d('M43 0H17c-2 0-4 2-4 4v52c0 2 2 4 4 4h26c2 0 4-2 4-4V4c0-2-2-4-4-4zM15 8h30v38H15V8zm2-6h26l2 2v2H15V4l2-2zm26 56H17l-2-2v-8h30v8l-2 2z')
							]),
						_List_Nil),
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill(hexColor),
								elm_lang$svg$Svg$Attributes$d('M30 49a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM26 5h4a1 1 0 1 0 0-2h-4a1 1 0 1 0 0 2zm7 0h1a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2zm24 0a1 1 0 1 0-2 1c4 4 4 10 0 14a1 1 0 1 0 2 1c4-5 4-12 0-16z')
							]),
						_List_Nil),
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill(hexColor),
								elm_lang$svg$Svg$Attributes$d('M52 7a1 1 0 1 0-1 1 7 7 0 0 1 0 10 1 1 0 1 0 1 1 8 8 0 0 0 0-12zM5 6a1 1 0 1 0-2-1c-4 4-4 11 0 16a1 1 0 0 0 2 0v-1C1 16 1 10 5 6z')
							]),
						_List_Nil),
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill(hexColor),
								elm_lang$svg$Svg$Attributes$d('M9 7H8a8 8 0 0 0 0 12 1 1 0 0 0 1 0v-2a7 7 0 0 1 0-9V7z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$pencil = F2(
	function (_n0, size) {
		return mdgriffith$stylish_elephants$Element$html(
			A2(
				elm_lang$svg$Svg$svg,
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$Attributes$style,
						'height',
						elm_lang$core$String$fromInt(size) + 'px'),
						elm_lang$svg$Svg$Attributes$viewBox('0 0 529 529')
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$d('M329 89l107 108-272 272L57 361 329 89zm189-26l-48-48a48 48 0 0 0-67 0l-46 46 108 108 53-54c14-14 14-37 0-52zM0 513c-2 9 6 16 15 14l120-29L27 391 0 513z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$show = F2(
	function (cl, size) {
		return mdgriffith$stylish_elephants$Element$html(
			A2(
				elm_lang$svg$Svg$svg,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$viewBox('0 0 512 512'),
						elm_lang$svg$Svg$Attributes$height(
						elm_lang$core$String$fromInt(size)),
						elm_lang$svg$Svg$Attributes$width(
						elm_lang$core$String$fromInt(size))
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$svg$Svg$path,
						_List_fromArray(
							[
								elm_lang$svg$Svg$Attributes$fill(
								author$project$Framework$ColorManipulation$colorToHex(cl)),
								elm_lang$svg$Svg$Attributes$d('M256 192a64 64 0 1 0 0 128 64 64 0 0 0 0-128zm250 49l-89-89c-89-89-233-89-322 0L6 241c-8 8-8 22 0 30l89 89a227 227 0 0 0 322 0l89-89c8-8 8-22 0-30zM256 363a107 107 0 1 1 0-214 107 107 0 0 1 0 214z')
							]),
						_List_Nil)
					])));
	});
var author$project$Framework$Icon$introspection = {
	aj: 'List of SVG icons',
	r: 'Icons',
	ax: 'Element.Color -> Int -> Element.Element msg',
	ac: _List_fromArray(
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
	aj: 'List of SVG logos',
	r: 'Logos',
	ax: '',
	ac: _List_fromArray(
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
	aj: 'List of SVG spinners',
	r: 'Spinners',
	ax: '',
	ac: _List_fromArray(
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
		var src = _n0.en;
		var imageAttributes = A2(
			elm_lang$core$List$filter,
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
			elm_lang$core$Maybe$Nothing,
			A2(elm_lang$core$List$cons, mdgriffith$stylish_elephants$Element$clip, attrs),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A5(
						mdgriffith$stylish_elephants$Internal$Model$element,
						mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
						mdgriffith$stylish_elephants$Internal$Model$asEl,
						elm_lang$core$Maybe$Just('img'),
						_Utils_ap(
							imageAttributes,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Internal$Model$Attr(
									elm_lang$html$Html$Attributes$src(src)),
									mdgriffith$stylish_elephants$Internal$Model$Attr(
									elm_lang$html$Html$Attributes$alt(''))
								])),
						mdgriffith$stylish_elephants$Internal$Model$Unkeyed(_List_Nil))
					])));
	});
var elm_lang$html$Html$Attributes$download = function (fileName) {
	return A2(elm_lang$html$Html$Attributes$stringProperty, 'download', fileName);
};
var mdgriffith$stylish_elephants$Element$download = F2(
	function (attrs, _n0) {
		var url = _n0.n;
		var label = _n0.aS;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm_lang$core$Maybe$Just('a'),
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$Attr(
					elm_lang$html$Html$Attributes$href(url)),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm_lang$html$Html$Attributes$download('')),
					A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
						A2(
							elm_lang$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							A2(
								elm_lang$core$List$cons,
								A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'x-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.ai),
								A2(
									elm_lang$core$List$cons,
									A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'y-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.V),
									attrs)))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var mdgriffith$stylish_elephants$Element$downloadAs = F2(
	function (attrs, _n0) {
		var url = _n0.n;
		var filename = _n0.c9;
		var label = _n0.aS;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm_lang$core$Maybe$Just('a'),
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$Attr(
					elm_lang$html$Html$Attributes$href(url)),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm_lang$html$Html$Attributes$download(filename)),
					A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
						A2(
							elm_lang$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							A2(
								elm_lang$core$List$cons,
								A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'x-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.ai),
								A2(
									elm_lang$core$List$cons,
									A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'y-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.V),
									attrs)))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var elm_lang$html$Html$Attributes$target = elm_lang$html$Html$Attributes$stringProperty('target');
var mdgriffith$stylish_elephants$Element$newTabLink = F2(
	function (attrs, _n0) {
		var url = _n0.n;
		var label = _n0.aS;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm_lang$core$Maybe$Just('a'),
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$Attr(
					elm_lang$html$Html$Attributes$href(url)),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm_lang$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Internal$Model$Attr(
							elm_lang$html$Html$Attributes$target('_blank')),
						A2(
							elm_lang$core$List$cons,
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
							A2(
								elm_lang$core$List$cons,
								mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
								A2(
									elm_lang$core$List$cons,
									A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'x-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.ai),
									A2(
										elm_lang$core$List$cons,
										A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'y-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.V),
										attrs))))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var author$project$Framework$StyleElements$introspection = {
	aj: 'This is a raw list of all elements of style-elements as they are',
	r: 'Style-Elements',
	ax: '',
	ac: _List_fromArray(
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
							aS: mdgriffith$stylish_elephants$Element$text('link'),
							n: 'http://example.com'
						}),
					'link [] { url = "http://example.com", label = text "label" }'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$newTabLink,
						_List_Nil,
						{
							aS: mdgriffith$stylish_elephants$Element$text('newTabLink'),
							n: 'http://example.com'
						}),
					'newTabLink [] { url = "http://example.com", label = text "newTabLink" }'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$download,
						_List_Nil,
						{
							aS: mdgriffith$stylish_elephants$Element$text('download'),
							n: 'http://example.com'
						}),
					'download [] { url = "http://example.com", label = text "download" }'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$downloadAs,
						_List_Nil,
						{
							c9: 'filename',
							aS: mdgriffith$stylish_elephants$Element$text('downloadAs'),
							n: 'http://example.com'
						}),
					'downloadAs [] { url = "http://example.com", label = text "downloadAs", filename = "filename" }'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$image,
						_List_Nil,
						{aj: 'description', en: 'http://via.placeholder.com/200x100/ff3399/000'}),
					'image [] { src = "http://via.placeholder.com/200x100/ff3399/000", description = "description" }'),
					_Utils_Tuple2(
					A2(
						mdgriffith$stylish_elephants$Element$decorativeImage,
						_List_Nil,
						{en: 'http://via.placeholder.com/200x100/ff3399/000'}),
					'decorativeImage [] { src = "http://via.placeholder.com/200x100/ff3399/000" }')
				]))
		])
};
var author$project$Framework$StyleElementsInput$introspection = {
	aj: 'This is a raw list of all elements of style-elements as they are',
	r: 'Style-Elements Input',
	ax: '',
	ac: _List_fromArray(
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
	var top = _n0.ew;
	var right = _n0.eb;
	var bottom = _n0.cT;
	var left = _n0.dw;
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
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
						{cT: 0, dw: 0, eb: 0, ew: 0}),
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
				elm_lang$core$List$cons,
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
	aj: '',
	r: 'Typography',
	ax: 'List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg',
	ac: _List_fromArray(
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
		aj: 'Description ' + id,
		r: 'Element ' + id,
		ax: 'Signature ' + id,
		ac: _List_fromArray(
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
var author$project$Framework$FormField$initModel = {al: elm_lang$core$Maybe$Nothing, a6: ''};
var author$project$Framework$FormFieldWithPattern$initModel = {al: elm_lang$core$Maybe$Nothing, eD: ''};
var author$project$Framework$StyleElementsInput$initModel = {
	aI: false,
	av: elm_lang$core$Maybe$Just('A'),
	et: ''
};
var author$project$Framework$initModel = F2(
	function (value, url) {
		var flag = author$project$Framework$decodeFlagFromJson(value);
		return {
			b: author$project$Framework$initConf,
			q: author$project$Framework$debug ? author$project$Framework$introspections : author$project$Framework$introspectionsForDebugging,
			aV: flag,
			ap: author$project$Framework$Card$initModel,
			aq: author$project$Framework$FormField$initModel,
			ar: author$project$Framework$FormFieldWithPattern$initModel,
			as: author$project$Framework$StyleElementsInput$initModel,
			au: '',
			n: url
		};
	});
var author$project$Framework$init = function (_n0) {
	var url = _n0.n;
	var flags = _n0.da;
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
var elm_lang$core$Platform$Sub$batch = _Platform_batch;
var author$project$Framework$subscriptions = function (_n0) {
	return elm_lang$core$Platform$Sub$batch(_List_Nil);
};
var elm_lang$core$Basics$not = _Basics_not;
var elm_lang$core$Platform$Cmd$none = elm_lang$core$Platform$Cmd$batch(_List_Nil);
var author$project$Framework$Card$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(!model, elm_lang$core$Platform$Cmd$none);
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
						{a6: value}),
					elm_lang$core$Platform$Cmd$none);
			case 1:
				var field = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							al: elm_lang$core$Maybe$Just(field)
						}),
					elm_lang$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{al: elm_lang$core$Maybe$Nothing}),
					elm_lang$core$Platform$Cmd$none);
		}
	});
var elm_lang$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {ds: index, dI: match, dN: number, eq: submatches};
	});
var elm_lang$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm_lang$regex$Regex$fromString = function (string) {
	return A2(
		elm_lang$regex$Regex$fromStringWith,
		{bB: false, bT: false},
		string);
};
var elm_lang$regex$Regex$never = _Regex_never;
var author$project$Framework$FormFieldWithPattern$regexNotDigit = A2(
	elm_lang$core$Maybe$withDefault,
	elm_lang$regex$Regex$never,
	elm_lang$regex$Regex$fromString('[^0-9]'));
var author$project$Framework$FormFieldWithPattern$regexNotDigitsAtTheEnd = A2(
	elm_lang$core$Maybe$withDefault,
	elm_lang$regex$Regex$never,
	elm_lang$regex$Regex$fromString('[^0-9]*$'));
var elm_lang$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm_lang$core$Maybe$Just(x);
	} else {
		return elm_lang$core$Maybe$Nothing;
	}
};
var elm_lang$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm_lang$core$Maybe$Just(xs);
	} else {
		return elm_lang$core$Maybe$Nothing;
	}
};
var author$project$Framework$FormFieldWithPattern$append = F3(
	function (tokens, input, formatted) {
		append:
		while (true) {
			var maybeToken = elm_lang$core$List$head(tokens);
			var appendInput = A2(
				elm_lang$core$Maybe$withDefault,
				formatted,
				A2(
					elm_lang$core$Maybe$map,
					A2(
						author$project$Framework$FormFieldWithPattern$append,
						A2(
							elm_lang$core$Maybe$withDefault,
							_List_Nil,
							elm_lang$core$List$tail(tokens)),
						A2(
							elm_lang$core$Maybe$withDefault,
							_List_Nil,
							elm_lang$core$List$tail(input))),
					A2(
						elm_lang$core$Maybe$map,
						function (_char) {
							return _Utils_ap(
								formatted,
								elm_lang$core$String$fromChar(_char));
						},
						elm_lang$core$List$head(input))));
			if (maybeToken.$ === 1) {
				return formatted;
			} else {
				var token = maybeToken.a;
				if (!token.$) {
					return appendInput;
				} else {
					var _char = token.a;
					var $temp$tokens = A2(
						elm_lang$core$Maybe$withDefault,
						_List_Nil,
						elm_lang$core$List$tail(tokens)),
						$temp$input = input,
						$temp$formatted = _Utils_ap(
						formatted,
						elm_lang$core$String$fromChar(_char));
					tokens = $temp$tokens;
					input = $temp$input;
					formatted = $temp$formatted;
					continue append;
				}
			}
		}
	});
var elm_lang$core$String$isEmpty = function (string) {
	return string === '';
};
var elm_lang$core$String$foldr = _String_foldr;
var elm_lang$core$String$toList = function (string) {
	return A3(elm_lang$core$String$foldr, elm_lang$core$List$cons, _List_Nil, string);
};
var author$project$Framework$FormFieldWithPattern$format = F2(
	function (tokens, input) {
		return elm_lang$core$String$isEmpty(input) ? input : A3(
			author$project$Framework$FormFieldWithPattern$append,
			tokens,
			elm_lang$core$String$toList(input),
			'');
	});
var author$project$Framework$FormFieldWithPattern$InputValue = {$: 0};
var author$project$Framework$FormFieldWithPattern$Other = function (a) {
	return {$: 1, a: a};
};
var author$project$Framework$FormFieldWithPattern$tokenize = F2(
	function (inputChar, pattern) {
		return (_Utils_eq(pattern, inputChar) || (pattern === '_')) ? author$project$Framework$FormFieldWithPattern$InputValue : author$project$Framework$FormFieldWithPattern$Other(pattern);
	});
var author$project$Framework$FormFieldWithPattern$parse = F2(
	function (inputChar, pattern) {
		return A2(
			elm_lang$core$List$map,
			author$project$Framework$FormFieldWithPattern$tokenize(inputChar),
			elm_lang$core$String$toList(pattern));
	});
var author$project$Framework$FormFieldWithPattern$result = F2(
	function (template, string) {
		return A2(
			author$project$Framework$FormFieldWithPattern$format,
			A2(author$project$Framework$FormFieldWithPattern$parse, '0', template),
			string);
	});
var elm_lang$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var author$project$Framework$FormFieldWithPattern$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var field = msg.a;
				var pattern = msg.b;
				var value = msg.c;
				var onlyDigits = A3(
					elm_lang$regex$Regex$replace,
					author$project$Framework$FormFieldWithPattern$regexNotDigit,
					function (_n3) {
						return '';
					},
					value);
				var withPattern = A2(author$project$Framework$FormFieldWithPattern$result, pattern, onlyDigits);
				var removeCharactedAtTheEndIfNotNumbers = A3(
					elm_lang$regex$Regex$replace,
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
									{eD: removeCharactedAtTheEndIfNotNumbers});
							case 1:
								return _Utils_update(
									model,
									{eD: removeCharactedAtTheEndIfNotNumbers});
							default:
								return _Utils_update(
									model,
									{eD: removeCharactedAtTheEndIfNotNumbers});
						}
					}(),
					elm_lang$core$Platform$Cmd$none);
			case 1:
				var field = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							al: elm_lang$core$Maybe$Just(field)
						}),
					elm_lang$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{al: elm_lang$core$Maybe$Nothing}),
					elm_lang$core$Platform$Cmd$none);
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
							av: elm_lang$core$Maybe$Just(value)
						}),
					elm_lang$core$Platform$Cmd$none);
			case 1:
				return _Utils_Tuple2(model, elm_lang$core$Platform$Cmd$none);
			case 2:
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{et: value}),
					elm_lang$core$Platform$Cmd$none);
			default:
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aI: value}),
					elm_lang$core$Platform$Cmd$none);
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
					elm_lang$core$Platform$Cmd$none);
			case 9:
				var password = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{au: password}),
					elm_lang$core$Platform$Cmd$none);
			case 1:
				var intros = A2(
					elm_lang$core$List$map,
					function (_n1) {
						var data = _n1.a;
						return _Utils_Tuple2(data, true);
					},
					model.q);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{q: intros}),
					elm_lang$core$Platform$Cmd$none);
			case 2:
				var intros = A2(
					elm_lang$core$List$map,
					function (_n2) {
						var data = _n2.a;
						return _Utils_Tuple2(data, false);
					},
					model.q);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{q: intros}),
					elm_lang$core$Platform$Cmd$none);
			case 0:
				var dataName = msg.a;
				var toggle = function (_n3) {
					var data = _n3.a;
					var show = _n3.b;
					return _Utils_eq(data.r, dataName) ? _Utils_Tuple2(data, !show) : _Utils_Tuple2(data, show);
				};
				var intros = A2(elm_lang$core$List$map, toggle, model.q);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{q: intros}),
					elm_lang$core$Platform$Cmd$none);
			case 3:
				var windowSize = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aV: elm_lang$core$Maybe$Just(windowSize)
						}),
					elm_lang$core$Platform$Cmd$none);
			case 4:
				var msg2 = msg.a;
				var _n4 = A2(author$project$Framework$StyleElementsInput$update, msg2, model.as);
				var newModel = _n4.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{as: newModel}),
					elm_lang$core$Platform$Cmd$none);
			case 5:
				var msg2 = msg.a;
				var _n5 = A2(author$project$Framework$FormField$update, msg2, model.aq);
				var newModel = _n5.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aq: newModel}),
					elm_lang$core$Platform$Cmd$none);
			case 6:
				var msg2 = msg.a;
				var _n6 = A2(author$project$Framework$FormFieldWithPattern$update, msg2, model.ar);
				var newModel = _n6.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ar: newModel}),
					elm_lang$core$Platform$Cmd$none);
			default:
				var msg2 = msg.a;
				var _n7 = A2(author$project$Framework$Card$update, msg2, model.ap);
				var newModel = _n7.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ap: newModel}),
					elm_lang$core$Platform$Cmd$none);
		}
	});
var author$project$Framework$css = '\nbody {\n    line-height: normal !important;\n}\n.elmStyleguideGenerator-open {\ntransition: all .8s;\nttransform: translateY(0);\nmax-height: 500px;\n}\n.elmStyleguideGenerator-close {\ntransition: all .1s;\nttransform: translateY(-100%);\nmax-height: 0;\n}\npre {\n    margin: 0;\n}\n';
var author$project$Framework$emptyIntrospection = {aj: '', r: 'Not found', ax: '', ac: _List_Nil};
var author$project$Framework$emptyVariation = _Utils_Tuple2('Not found', _List_Nil);
var author$project$Framework$slugToString = function (_n0) {
	var slug = _n0;
	return slug;
};
var author$project$Framework$RouteHome = {$: 0};
var author$project$Framework$fragmentAsPath = function (url) {
	var _n0 = url.bJ;
	if (_n0.$ === 1) {
		return _Utils_update(
			url,
			{bW: ''});
	} else {
		var fragment = _n0.a;
		return _Utils_update(
			url,
			{bW: fragment});
	}
};
var author$project$Framework$RouteSubPage = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$Framework$rootRoute = 'framework';
var author$project$Framework$Slug = elm_lang$core$Basics$identity;
var elm_lang$url$Url$Parser$Parser = elm_lang$core$Basics$identity;
var elm_lang$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {M: frag, Q: params, K: unvisited, eD: value, T: visited};
	});
var elm_lang$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return function (_n0) {
			var visited = _n0.T;
			var unvisited = _n0.K;
			var params = _n0.Q;
			var frag = _n0.M;
			var value = _n0.eD;
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
							elm_lang$url$Url$Parser$State,
							A2(elm_lang$core$List$cons, next, visited),
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
	elm_lang$url$Url$Parser$custom,
	'SLUG',
	function ($) {
		return elm_lang$core$Maybe$Just($);
	});
var elm_lang$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.T;
		var unvisited = _n0.K;
		var params = _n0.Q;
		var frag = _n0.M;
		var value = _n0.eD;
		return A5(
			elm_lang$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var elm_lang$url$Url$Parser$map = F2(
	function (subValue, _n0) {
		var parseArg = _n0;
		return function (_n1) {
			var visited = _n1.T;
			var unvisited = _n1.K;
			var params = _n1.Q;
			var frag = _n1.M;
			var value = _n1.eD;
			return A2(
				elm_lang$core$List$map,
				elm_lang$url$Url$Parser$mapState(value),
				parseArg(
					A5(elm_lang$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var elm_lang$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			elm_lang$core$List$concatMap,
			function (_n0) {
				var parser = _n0;
				return parser(state);
			},
			parsers);
	};
};
var elm_lang$url$Url$Parser$s = function (str) {
	return function (_n0) {
		var visited = _n0.T;
		var unvisited = _n0.K;
		var params = _n0.Q;
		var frag = _n0.M;
		var value = _n0.eD;
		if (!unvisited.b) {
			return _List_Nil;
		} else {
			var next = unvisited.a;
			var rest = unvisited.b;
			return _Utils_eq(next, str) ? _List_fromArray(
				[
					A5(
					elm_lang$url$Url$Parser$State,
					A2(elm_lang$core$List$cons, next, visited),
					rest,
					params,
					frag,
					value)
				]) : _List_Nil;
		}
	};
};
var elm_lang$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0;
		var parseAfter = _n1;
		return function (state) {
			return A2(
				elm_lang$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var author$project$Framework$routeParser = elm_lang$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm_lang$url$Url$Parser$map,
			author$project$Framework$RouteSubPage,
			A2(
				elm_lang$url$Url$Parser$slash,
				elm_lang$url$Url$Parser$s(author$project$Framework$rootRoute),
				A2(elm_lang$url$Url$Parser$slash, author$project$Framework$slugParser, author$project$Framework$slugParser)))
		]));
var elm_lang$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _n1 = state.K;
			if (!_n1.b) {
				return elm_lang$core$Maybe$Just(state.eD);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm_lang$core$Maybe$Just(state.eD);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var elm_lang$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm_lang$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				elm_lang$core$List$cons,
				segment,
				elm_lang$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var elm_lang$url$Url$Parser$preparePath = function (path) {
	var _n0 = A2(elm_lang$core$String$split, '/', path);
	if (_n0.b && (_n0.a === '')) {
		var segments = _n0.b;
		return elm_lang$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _n0;
		return elm_lang$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var elm_lang$url$Url$percentDecode = _Url_percentDecode;
var elm_lang$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return elm_lang$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return elm_lang$core$Maybe$Just(
				A2(elm_lang$core$List$cons, value, list));
		}
	});
var elm_lang$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _n0 = A2(elm_lang$core$String$split, '=', segment);
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			var rawKey = _n0.a;
			var _n1 = _n0.b;
			var rawValue = _n1.a;
			var _n2 = elm_lang$url$Url$percentDecode(rawKey);
			if (_n2.$ === 1) {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm_lang$url$Url$percentDecode(rawValue);
				if (_n3.$ === 1) {
					return dict;
				} else {
					var value = _n3.a;
					return A3(
						elm_lang$core$Dict$update,
						key,
						elm_lang$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var elm_lang$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return elm_lang$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			elm_lang$core$List$foldr,
			elm_lang$url$Url$Parser$addParam,
			elm_lang$core$Dict$empty,
			A2(elm_lang$core$String$split, '&', qry));
	}
};
var elm_lang$url$Url$Parser$parse = F2(
	function (_n0, url) {
		var parser = _n0;
		return elm_lang$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm_lang$url$Url$Parser$State,
					_List_Nil,
					elm_lang$url$Url$Parser$preparePath(url.bW),
					elm_lang$url$Url$Parser$prepareQuery(url.bm),
					url.bJ,
					elm_lang$core$Basics$identity)));
	});
var author$project$Framework$urlToRoute = function (url) {
	var maybeRoute = A2(
		elm_lang$url$Url$Parser$parse,
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
					elm_lang$core$Maybe$withDefault,
					'',
					elm_lang$url$Url$percentDecode(
						author$project$Framework$slugToString(slug3))),
				A2(
					elm_lang$core$Maybe$withDefault,
					'',
					elm_lang$url$Url$percentDecode(
						author$project$Framework$slugToString(slug4))));
		} else {
			return _Utils_Tuple2('', '');
		}
	}();
	var slug1 = _n0.a;
	var slug2 = _n0.b;
	var _n2 = A2(
		elm_lang$core$Maybe$withDefault,
		_Utils_Tuple2(author$project$Framework$emptyIntrospection, false),
		elm_lang$core$List$head(
			A2(
				elm_lang$core$List$filter,
				function (_n3) {
					var introspection2 = _n3.a;
					return _Utils_eq(introspection2.r, slug1);
				},
				model.q)));
	var introspection = _n2.a;
	var variation = A2(
		elm_lang$core$Maybe$withDefault,
		author$project$Framework$emptyVariation,
		elm_lang$core$List$head(
			A2(
				elm_lang$core$List$filter,
				function (_n5) {
					var name = _n5.a;
					return _Utils_eq(name, slug2);
				},
				introspection.ac)));
	var _n4 = author$project$Framework$urlToRoute(model.n);
	return (_Utils_eq(introspection, author$project$Framework$emptyIntrospection) || _Utils_eq(variation, author$project$Framework$emptyVariation)) ? elm_lang$core$Maybe$Nothing : elm_lang$core$Maybe$Just(
		_Utils_Tuple2(introspection, variation));
};
var mdgriffith$stylish_elephants$Element$scrollbarX = A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'overflow', mdgriffith$stylish_elephants$Internal$Style$classes.eg);
var elm_lang$core$String$toLower = _String_toLower;
var elm_lang$core$String$words = _String_words;
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
							elm_lang$core$String$join,
							'-',
							elm_lang$core$String$words(
								elm_lang$core$String$toLower(name)));
					default:
						var name = font.a;
						var url = font.b;
						return A2(
							elm_lang$core$String$join,
							'-',
							elm_lang$core$String$words(
								elm_lang$core$String$toLower(name)));
				}
			}());
	});
var mdgriffith$stylish_elephants$Element$Font$family = function (families) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		A2(
			mdgriffith$stylish_elephants$Internal$Model$FontFamily,
			A3(elm_lang$core$List$foldl, mdgriffith$stylish_elephants$Internal$Model$renderFontClassName, 'font-', families),
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
					mdgriffith$stylish_elephants$Element$Background$color(configuration.aP),
					mdgriffith$stylish_elephants$Element$Border$rounded(8)
				]),
			A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$family(
						_List_fromArray(
							[mdgriffith$stylish_elephants$Element$Font$monospace])),
						mdgriffith$stylish_elephants$Element$Font$color(author$project$Color$black),
						mdgriffith$stylish_elephants$Element$Font$size(16),
						mdgriffith$stylish_elephants$Element$padding(16),
						mdgriffith$stylish_elephants$Element$htmlAttribute(
						A2(elm_lang$html$Html$Attributes$style, 'white-space', 'pre'))
					]),
				mdgriffith$stylish_elephants$Element$text(sourceCode)));
	});
var author$project$Framework$MsgStyleElementsInput = function (a) {
	return {$: 4, a: a};
};
var mdgriffith$stylish_elephants$Element$map = mdgriffith$stylish_elephants$Internal$Model$map;
var author$project$Framework$specialComponent = F2(
	function (model, component) {
		var componentTuplet = component(model.as);
		return _Utils_Tuple2(
			A2(mdgriffith$stylish_elephants$Element$map, author$project$Framework$MsgStyleElementsInput, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Framework$MsgCards = function (a) {
	return {$: 7, a: a};
};
var author$project$Framework$specialComponentCards = F2(
	function (model, component) {
		var componentTuplet = component(model.ap);
		return _Utils_Tuple2(
			A2(mdgriffith$stylish_elephants$Element$map, author$project$Framework$MsgCards, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Framework$MsgFormField = function (a) {
	return {$: 5, a: a};
};
var author$project$Framework$specialComponentFormField = F2(
	function (model, component) {
		var componentTuplet = component(model.aq);
		return _Utils_Tuple2(
			A2(mdgriffith$stylish_elephants$Element$map, author$project$Framework$MsgFormField, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Framework$MsgFormFieldWithPattern = function (a) {
	return {$: 6, a: a};
};
var author$project$Framework$specialComponentFormFieldWithPattern = F2(
	function (model, component) {
		var componentTuplet = component(model.ar);
		return _Utils_Tuple2(
			A2(mdgriffith$stylish_elephants$Element$map, author$project$Framework$MsgFormFieldWithPattern, componentTuplet.a),
			componentTuplet.b);
	});
var author$project$Color$yellow = A3(mdgriffith$stylish_elephants$Element$rgb, 0.5, 0.5, 0.5);
var author$project$Framework$Card$Flip = 0;
var author$project$Framework$Card$stylexxx = F2(
	function (key, value) {
		return ((key === 'backface-visibility') || ((key === 'perspective') || ((key === 'transition') || ((key === 'transform-style') || (key === 'transform'))))) ? _List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm_lang$html$Html$Attributes$style, '-webkit-' + key, value)),
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm_lang$html$Html$Attributes$style, '-moz-' + key, value)),
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm_lang$html$Html$Attributes$style, '-ms-' + key, value)),
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm_lang$html$Html$Attributes$style, '-o-' + key, value)),
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm_lang$html$Html$Attributes$style, key, value))
			]) : _List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$htmlAttribute(
				A2(elm_lang$html$Html$Attributes$style, key, value))
			]);
	});
var mdgriffith$stylish_elephants$Internal$Model$Top = 0;
var mdgriffith$stylish_elephants$Element$alignTop = mdgriffith$stylish_elephants$Internal$Model$AlignY(0);
var author$project$Framework$Card$flipping = function (data) {
	var y = mdgriffith$stylish_elephants$Element$px(data.bg);
	var x = mdgriffith$stylish_elephants$Element$px(data.cq);
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
			elm_lang$core$List$cons,
			mdgriffith$stylish_elephants$Element$alignTop,
			A2(author$project$Framework$Card$stylexxx, 'perspective', '1500px')),
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$html(
				A3(
					elm_lang$html$Html$node,
					'style',
					_List_Nil,
					_List_fromArray(
						[
							elm_lang$html$Html$text('alignbottom, alignright {pointer-events:none}')
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
							data.bt ? A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(0deg)') : A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(180deg)')))),
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Element$el,
						_Utils_ap(
							commonAttr,
							_Utils_ap(
								A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(0deg)'),
								A2(author$project$Framework$Card$stylexxx, 'z-index', '2'))),
						data.bK),
						A2(
						mdgriffith$stylish_elephants$Element$el,
						_Utils_ap(
							commonAttr,
							A2(author$project$Framework$Card$stylexxx, 'transform', 'rotateY(180deg)')),
						data.by)
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
				bt: model,
				by: A2(
					mdgriffith$stylish_elephants$Element$el,
					_Utils_ap(
						commonAttr,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Background$color(author$project$Color$yellow)
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
				bK: A2(
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
				bg: 300,
				cq: 200
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
			A2(elm_lang$html$Html$Attributes$style, text1, text2));
	});
var author$project$Framework$FormField$hasFocus = F2(
	function (model, field) {
		var _n0 = model.al;
		if (!_n0.$) {
			var focus = _n0.a;
			return _Utils_eq(focus, field);
		} else {
			return false;
		}
	});
var mdgriffith$stylish_elephants$Element$moveDown = function (y) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Move,
				elm_lang$core$Maybe$Nothing,
				elm_lang$core$Maybe$Just(y),
				elm_lang$core$Maybe$Nothing)));
};
var mdgriffith$stylish_elephants$Internal$Model$Scale = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Element$scale = function (n) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(mdgriffith$stylish_elephants$Internal$Model$Scale, n, n, 1)));
};
var elm_lang$html$Html$Events$onFocus = function (msg) {
	return A2(
		elm_lang$html$Html$Events$on,
		'focus',
		elm_lang$json$Json$Decode$succeed(msg));
};
var mdgriffith$stylish_elephants$Element$Events$onFocus = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm_lang$html$Html$Events$onFocus($));
};
var elm_lang$html$Html$Events$onBlur = function (msg) {
	return A2(
		elm_lang$html$Html$Events$on,
		'blur',
		elm_lang$json$Json$Decode$succeed(msg));
};
var mdgriffith$stylish_elephants$Element$Events$onLoseFocus = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm_lang$html$Html$Events$onBlur($));
};
var mdgriffith$stylish_elephants$Element$Input$TextInputNode = function (a) {
	return {$: 0, a: a};
};
var elm_lang$core$List$length = function (xs) {
	return A3(
		elm_lang$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm_lang$core$String$lines = _String_lines;
var elm_lang$core$String$trim = _String_trim;
var elm_lang$html$Html$Attributes$type_ = elm_lang$html$Html$Attributes$stringProperty('type');
var elm_lang$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm_lang$core$List$foldr, elm_lang$json$Json$Decode$field, decoder, fields);
	});
var elm_lang$html$Html$Events$targetValue = A2(
	elm_lang$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm_lang$json$Json$Decode$string);
var elm_lang$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm_lang$html$Html$Events$on,
		'input',
		A2(elm_lang$json$Json$Decode$map, tagger, elm_lang$html$Html$Events$targetValue));
};
var mdgriffith$stylish_elephants$Element$Input$Padding = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Element$Input$autofill = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		A2(elm_lang$html$Html$Attributes$attribute, 'autocomplete', $));
};
var mdgriffith$stylish_elephants$Element$Input$charcoal = A3(mdgriffith$stylish_elephants$Element$rgb, 136 / 255, 138 / 255, 133 / 255);
var mdgriffith$stylish_elephants$Element$Input$darkGrey = A3(mdgriffith$stylish_elephants$Element$rgb, 186 / 255, 189 / 255, 182 / 255);
var mdgriffith$stylish_elephants$Element$Input$defaultTextPadding = A2(mdgriffith$stylish_elephants$Element$paddingXY, 12, 7);
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
var mdgriffith$stylish_elephants$Internal$Grid$Column = 2;
var mdgriffith$stylish_elephants$Internal$Grid$GridElement = 0;
var mdgriffith$stylish_elephants$Internal$Grid$Row = 1;
var mdgriffith$stylish_elephants$Element$Input$place = F3(
	function (position, el, group) {
		switch (position) {
			case 2:
				var _n1 = group.ae;
				if (_n1.$ === 1) {
					return _Utils_update(
						group,
						{
							ae: elm_lang$core$Maybe$Just(el)
						});
				} else {
					var existing = _n1.a;
					return _Utils_update(
						group,
						{
							ae: elm_lang$core$Maybe$Just(
								_Utils_update(
									el,
									{
										e: _Utils_ap(el.e, existing.e),
										N: 1
									}))
						});
				}
			case 3:
				var _n2 = group.ah;
				if (_n2.$ === 1) {
					return _Utils_update(
						group,
						{
							ah: elm_lang$core$Maybe$Just(el)
						});
				} else {
					var existing = _n2.a;
					return _Utils_update(
						group,
						{
							ah: elm_lang$core$Maybe$Just(
								_Utils_update(
									el,
									{
										e: _Utils_ap(el.e, existing.e),
										N: 1
									}))
						});
				}
			case 0:
				var _n3 = group.eb;
				if (_n3.$ === 1) {
					return _Utils_update(
						group,
						{
							eb: elm_lang$core$Maybe$Just(el)
						});
				} else {
					var existing = _n3.a;
					return _Utils_update(
						group,
						{
							eb: elm_lang$core$Maybe$Just(
								_Utils_update(
									el,
									{
										e: _Utils_ap(el.e, existing.e),
										N: 2
									}))
						});
				}
			case 1:
				var _n4 = group.dw;
				if (_n4.$ === 1) {
					return _Utils_update(
						group,
						{
							dw: elm_lang$core$Maybe$Just(el)
						});
				} else {
					var existing = _n4.a;
					return _Utils_update(
						group,
						{
							dw: elm_lang$core$Maybe$Just(
								_Utils_update(
									el,
									{
										e: _Utils_ap(el.e, existing.e),
										N: 2
									}))
						});
				}
			default:
				var _n5 = group.an;
				if (_n5.$ === 1) {
					return _Utils_update(
						group,
						{
							an: elm_lang$core$Maybe$Just(el)
						});
				} else {
					var existing = _n5.a;
					return _Utils_update(
						group,
						{
							an: elm_lang$core$Maybe$Just(
								_Utils_update(
									el,
									{
										e: _Utils_ap(el.e, existing.e),
										N: 0
									}))
						});
				}
		}
	});
var elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm_lang$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(elm_lang$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm_lang$core$List$sum = function (numbers) {
	return A3(elm_lang$core$List$foldl, elm_lang$core$Basics$add, 0, numbers);
};
var mdgriffith$stylish_elephants$Internal$Grid$Above = 2;
var mdgriffith$stylish_elephants$Internal$Grid$Below = 3;
var mdgriffith$stylish_elephants$Internal$Grid$InFront = 4;
var mdgriffith$stylish_elephants$Internal$Grid$OnLeft = 1;
var mdgriffith$stylish_elephants$Internal$Grid$OnRight = 0;
var mdgriffith$stylish_elephants$Internal$Grid$build = F5(
	function (rowCoord, colCoord, spacingX, spacingY, positioned) {
		var attributes = A2(
			elm_lang$core$List$cons,
			mdgriffith$stylish_elephants$Internal$Model$StyleClass(
				mdgriffith$stylish_elephants$Internal$Model$GridPosition(
					{c2: colCoord, bg: positioned.bg, I: rowCoord, cq: positioned.cq})),
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$StyleClass(
					A2(mdgriffith$stylish_elephants$Internal$Model$SpacingStyle, spacingX, spacingY)),
				positioned.bx));
		var _n0 = positioned.N;
		switch (_n0) {
			case 0:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asEl,
					elm_lang$core$Maybe$Nothing,
					attributes,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(positioned.e));
			case 1:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm_lang$core$Maybe$Nothing,
					attributes,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(positioned.e));
			default:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asColumn,
					elm_lang$core$Maybe$Nothing,
					attributes,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(positioned.e));
		}
	});
var mdgriffith$stylish_elephants$Internal$Grid$getWidth = function (attrs) {
	var widthPlease = F2(
		function (attr, found) {
			if (!found.$) {
				var x = found.a;
				return elm_lang$core$Maybe$Just(x);
			} else {
				if (attr.$ === 7) {
					var w = attr.a;
					return elm_lang$core$Maybe$Just(w);
				} else {
					return elm_lang$core$Maybe$Nothing;
				}
			}
		});
	return A3(elm_lang$core$List$foldr, widthPlease, elm_lang$core$Maybe$Nothing, attrs);
};
var mdgriffith$stylish_elephants$Internal$Grid$createGrid = F2(
	function (_n0, nearby) {
		var spacingX = _n0.a;
		var spacingY = _n0.b;
		var rows = _Utils_eq(nearby.ae, elm_lang$core$Maybe$Nothing) ? {ae: 0, ah: 2, d7: 1} : {ae: 1, ah: 3, d7: 2};
		var rowCount = elm_lang$core$List$sum(
			_List_fromArray(
				[
					1,
					_Utils_eq(elm_lang$core$Maybe$Nothing, nearby.ae) ? 0 : 1,
					_Utils_eq(elm_lang$core$Maybe$Nothing, nearby.ah) ? 0 : 1
				]));
		var rowCoord = function (pos) {
			switch (pos) {
				case 2:
					return rows.ae;
				case 3:
					return rows.ah;
				case 0:
					return rows.d7;
				case 1:
					return rows.d7;
				default:
					return rows.d7;
			}
		};
		var columns = _Utils_eq(elm_lang$core$Maybe$Nothing, nearby.dw) ? {dw: 0, d7: 1, eb: 2} : {dw: 1, d7: 2, eb: 3};
		var colCount = elm_lang$core$List$sum(
			_List_fromArray(
				[
					1,
					_Utils_eq(elm_lang$core$Maybe$Nothing, nearby.dw) ? 0 : 1,
					_Utils_eq(elm_lang$core$Maybe$Nothing, nearby.eb) ? 0 : 1
				]));
		var colCoord = function (pos) {
			switch (pos) {
				case 2:
					return columns.d7;
				case 3:
					return columns.d7;
				case 0:
					return columns.eb;
				case 1:
					return columns.dw;
				default:
					return columns.d7;
			}
		};
		var place = F2(
			function (pos, el) {
				return A5(
					mdgriffith$stylish_elephants$Internal$Grid$build,
					rowCoord(pos),
					colCoord(pos),
					spacingX,
					spacingY,
					el);
			});
		return _Utils_Tuple2(
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Internal$Model$StyleClass(
					mdgriffith$stylish_elephants$Internal$Model$GridTemplateStyle(
						{
							p: A2(
								elm_lang$core$List$filterMap,
								elm_lang$core$Basics$identity,
								_List_fromArray(
									[
										A2(
										elm_lang$core$Maybe$map,
										function (el) {
											return A2(
												elm_lang$core$Maybe$withDefault,
												nearby.bE,
												mdgriffith$stylish_elephants$Internal$Grid$getWidth(el.bx));
										},
										nearby.dw),
										elm_lang$core$Maybe$Just(
										A2(
											elm_lang$core$Maybe$withDefault,
											nearby.bE,
											function (_n1) {
												var node = _n1.a;
												var attrs = _n1.b;
												var el = _n1.c;
												return mdgriffith$stylish_elephants$Internal$Grid$getWidth(attrs);
											}(nearby.d7))),
										A2(
										elm_lang$core$Maybe$map,
										function (el) {
											return A2(
												elm_lang$core$Maybe$withDefault,
												nearby.bE,
												mdgriffith$stylish_elephants$Internal$Grid$getWidth(el.bx));
										},
										nearby.eb)
									])),
							ed: A2(
								elm_lang$core$List$map,
								elm_lang$core$Basics$always(mdgriffith$stylish_elephants$Internal$Model$Content),
								A2(elm_lang$core$List$range, 1, rowCount)),
							em: _Utils_Tuple2(
								mdgriffith$stylish_elephants$Internal$Model$Px(spacingX),
								mdgriffith$stylish_elephants$Internal$Model$Px(spacingY))
						}))
				]),
			A2(
				elm_lang$core$List$filterMap,
				elm_lang$core$Basics$identity,
				_List_fromArray(
					[
						elm_lang$core$Maybe$Just(
						function () {
							var _n2 = nearby.d7;
							var primaryNode = _n2.a;
							var primaryAttrs = _n2.b;
							var primaryChildren = _n2.c;
							return A5(
								mdgriffith$stylish_elephants$Internal$Model$element,
								mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
								mdgriffith$stylish_elephants$Internal$Model$asEl,
								primaryNode,
								A2(
									elm_lang$core$List$cons,
									mdgriffith$stylish_elephants$Internal$Model$StyleClass(
										mdgriffith$stylish_elephants$Internal$Model$GridPosition(
											{c2: columns.d7, bg: 1, I: rows.d7, cq: 1})),
									primaryAttrs),
								mdgriffith$stylish_elephants$Internal$Model$Unkeyed(primaryChildren));
						}()),
						A2(
						elm_lang$core$Maybe$map,
						place(1),
						nearby.dw),
						A2(
						elm_lang$core$Maybe$map,
						place(0),
						nearby.eb),
						A2(
						elm_lang$core$Maybe$map,
						place(2),
						nearby.ae),
						A2(
						elm_lang$core$Maybe$map,
						place(3),
						nearby.ah),
						A2(
						elm_lang$core$Maybe$map,
						place(4),
						nearby.an)
					])));
	});
var mdgriffith$stylish_elephants$Internal$Model$AsGrid = 3;
var mdgriffith$stylish_elephants$Internal$Model$asGrid = 3;
var mdgriffith$stylish_elephants$Internal$Model$getSpacing = F2(
	function (attrs, _default) {
		return A2(
			elm_lang$core$Maybe$withDefault,
			_default,
			A3(
				elm_lang$core$List$foldr,
				F2(
					function (attr, acc) {
						if (!acc.$) {
							var x = acc.a;
							return elm_lang$core$Maybe$Just(x);
						} else {
							if ((attr.$ === 4) && (attr.a.$ === 5)) {
								var _n2 = attr.a;
								var x = _n2.a;
								var y = _n2.b;
								return elm_lang$core$Maybe$Just(
									_Utils_Tuple2(x, y));
							} else {
								return elm_lang$core$Maybe$Nothing;
							}
						}
					}),
				elm_lang$core$Maybe$Nothing,
				attrs));
	});
var mdgriffith$stylish_elephants$Internal$Grid$relative = F3(
	function (node, attributes, around) {
		var make = function (positioned) {
			return A5(
				mdgriffith$stylish_elephants$Internal$Model$element,
				mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
				mdgriffith$stylish_elephants$Internal$Model$asEl,
				elm_lang$core$Maybe$Nothing,
				positioned.bx,
				mdgriffith$stylish_elephants$Internal$Model$Unkeyed(positioned.e));
		};
		var _n0 = A2(
			mdgriffith$stylish_elephants$Internal$Model$getSpacing,
			attributes,
			_Utils_Tuple2(7, 7));
		var sX = _n0.a;
		var sY = _n0.b;
		var _n1 = A2(
			mdgriffith$stylish_elephants$Internal$Grid$createGrid,
			_Utils_Tuple2(sX, sY),
			around);
		var template = _n1.a;
		var children = _n1.b;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asGrid,
			node,
			_Utils_ap(template, attributes),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Element$Input$onGrid = F3(
	function (attributes, elementsOnGrid, input) {
		var nonePositioned = {ae: elm_lang$core$Maybe$Nothing, ah: elm_lang$core$Maybe$Nothing, bE: mdgriffith$stylish_elephants$Internal$Model$Content, an: elm_lang$core$Maybe$Nothing, dw: elm_lang$core$Maybe$Nothing, d7: input, eb: elm_lang$core$Maybe$Nothing};
		var gatherPositioned = F2(
			function (_n0, group) {
				var pos = _n0.a;
				var attrs = _n0.b;
				var child = _n0.c;
				return A3(
					mdgriffith$stylish_elephants$Element$Input$place,
					pos,
					{
						bx: A2(elm_lang$core$List$cons, mdgriffith$stylish_elephants$Element$alignLeft, attrs),
						e: _List_fromArray(
							[child]),
						bg: 1,
						N: 0,
						cq: 1
					},
					group);
			});
		return A3(
			mdgriffith$stylish_elephants$Internal$Grid$relative,
			elm_lang$core$Maybe$Just('label'),
			attributes,
			A3(elm_lang$core$List$foldl, gatherPositioned, nonePositioned, elementsOnGrid));
	});
var elm_lang$html$Html$Attributes$spellcheck = elm_lang$html$Html$Attributes$boolProperty('spellcheck');
var mdgriffith$stylish_elephants$Element$Input$spellcheck = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm_lang$html$Html$Attributes$spellcheck($));
};
var elm_lang$html$Html$Attributes$value = elm_lang$html$Html$Attributes$stringProperty('value');
var mdgriffith$stylish_elephants$Element$Input$value = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm_lang$html$Html$Attributes$value($));
};
var mdgriffith$stylish_elephants$Internal$Model$LivePolite = {$: 6};
var mdgriffith$stylish_elephants$Element$Region$announce = mdgriffith$stylish_elephants$Internal$Model$Describe(mdgriffith$stylish_elephants$Internal$Model$LivePolite);
var mdgriffith$stylish_elephants$Internal$Model$filter = function (attrs) {
	return A3(
		elm_lang$core$List$foldr,
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
							A2(elm_lang$core$List$cons, x, found),
							has);
					case 1:
						var attr = x.a;
						return _Utils_Tuple2(
							A2(elm_lang$core$List$cons, x, found),
							has);
					case 4:
						var style = x.a;
						return _Utils_Tuple2(
							A2(elm_lang$core$List$cons, x, found),
							has);
					case 7:
						var width = x.a;
						return A2(elm_lang$core$Set$member, 'width', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm_lang$core$List$cons, x, found),
							A2(elm_lang$core$Set$insert, 'width', has));
					case 8:
						var height = x.a;
						return A2(elm_lang$core$Set$member, 'height', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm_lang$core$List$cons, x, found),
							A2(elm_lang$core$Set$insert, 'height', has));
					case 2:
						var description = x.a;
						return A2(elm_lang$core$Set$member, 'described', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm_lang$core$List$cons, x, found),
							A2(elm_lang$core$Set$insert, 'described', has));
					case 9:
						var location = x.a;
						var elem = x.b;
						return _Utils_Tuple2(
							A2(elm_lang$core$List$cons, x, found),
							has);
					case 6:
						return A2(elm_lang$core$Set$member, 'align-x', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm_lang$core$List$cons, x, found),
							A2(elm_lang$core$Set$insert, 'align-x', has));
					case 5:
						return A2(elm_lang$core$Set$member, 'align-y', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2(elm_lang$core$List$cons, x, found),
							A2(elm_lang$core$Set$insert, 'align-y', has));
					case 12:
						return _Utils_Tuple2(
							A2(elm_lang$core$List$cons, x, found),
							has);
					case 11:
						var shadow = x.a;
						return _Utils_Tuple2(
							A2(elm_lang$core$List$cons, x, found),
							has);
					default:
						var shadow = x.a;
						return _Utils_Tuple2(
							A2(elm_lang$core$List$cons, x, found),
							has);
				}
			}),
		_Utils_Tuple2(_List_Nil, elm_lang$core$Set$empty),
		attrs).a;
};
var mdgriffith$stylish_elephants$Internal$Model$get = F2(
	function (attrs, isAttr) {
		return A3(
			elm_lang$core$List$foldr,
			F2(
				function (x, found) {
					return isAttr(x) ? A2(elm_lang$core$List$cons, x, found) : found;
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
			var _n25 = textOptions.dP;
			if (_n25.$ === 1) {
				return _List_fromArray(
					[
						mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm_lang$html$Html$Attributes$disabled(true))
					]);
			} else {
				var checkMsg = _n25.a;
				return _List_fromArray(
					[
						mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm_lang$html$Html$Events$onInput(checkMsg))
					]);
			}
		}();
		var attributes = A2(
			elm_lang$core$List$cons,
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
							switch (attr.a.$) {
								case 5:
									var _n23 = attr.a;
									return true;
								case 2:
									return true;
								case 1:
									var _n24 = attr.a;
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
		var parentAttributes = A2(
			elm_lang$core$List$cons,
			mdgriffith$stylish_elephants$Element$spacing(5),
			A2(elm_lang$core$List$cons, mdgriffith$stylish_elephants$Element$Region$announce, attributesFromChild));
		var inputPadding = A2(
			mdgriffith$stylish_elephants$Internal$Model$get,
			attributes,
			function (attr) {
				if ((attr.$ === 4) && (attr.a.$ === 6)) {
					var _n21 = attr.a;
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
			elm_lang$core$List$filter,
			function ($) {
				return !forNearby($);
			},
			attributes);
		var _n0 = function () {
			var _n1 = textInput.v;
			if (!_n1.$) {
				var inputType = _n1.a;
				return _Utils_Tuple3(
					'input',
					_Utils_ap(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Input$value(textOptions.et),
								mdgriffith$stylish_elephants$Internal$Model$Attr(
								elm_lang$html$Html$Attributes$type_(inputType)),
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
					elm_lang$core$List$foldr,
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
														t: A2(elm_lang$core$List$cons, attr, found.t),
														am: elm_lang$core$Maybe$Just(val)
													});
											} else {
												return _Utils_update(
													found,
													{
														am: elm_lang$core$Maybe$Just(val)
													});
											}
										} else {
											var i = _n5.a;
											return found;
										}
									case 4:
										switch (attr.a.$) {
											case 6:
												var _n7 = attr.a;
												var t = _n7.a;
												var r = _n7.b;
												var b = _n7.c;
												var l = _n7.d;
												var _n8 = found.aT;
												if (_n8.$ === 1) {
													return _Utils_update(
														found,
														{
															t: A2(elm_lang$core$List$cons, attr, found.t),
															aT: elm_lang$core$Maybe$Just(
																A4(mdgriffith$stylish_elephants$Element$Input$Padding, t, r, b, l))
														});
												} else {
													return found;
												}
											case 5:
												var _n9 = attr.a;
												var x = _n9.a;
												var y = _n9.b;
												var _n10 = found.aU;
												if (_n10.$ === 1) {
													return _Utils_update(
														found,
														{
															t: A2(elm_lang$core$List$cons, attr, found.t),
															aU: elm_lang$core$Maybe$Just(y)
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
									t: A2(elm_lang$core$List$cons, attr, found.t)
								});
						}),
					{t: _List_Nil, am: elm_lang$core$Maybe$Nothing, aT: elm_lang$core$Maybe$Nothing, aU: elm_lang$core$Maybe$Nothing},
					attributes);
				var maybePadding = _n3.aT;
				var heightContent = _n3.am;
				var maybeSpacing = _n3.aU;
				var adjustedAttributes = _n3.t;
				var spacing = A2(elm_lang$core$Maybe$withDefault, 5, maybeSpacing);
				return _Utils_Tuple3(
					'textarea',
					_Utils_ap(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Input$spellcheck(textInput.s),
								A2(
								elm_lang$core$Maybe$withDefault,
								mdgriffith$stylish_elephants$Internal$Model$NoAttribute,
								A2(elm_lang$core$Maybe$map, mdgriffith$stylish_elephants$Element$Input$autofill, textInput.o)),
								function () {
								if (heightContent.$ === 1) {
									return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
								} else {
									if (heightContent.a.$ === 1) {
										var _n12 = heightContent.a;
										var newlineCount = function (x) {
											return (x < 1) ? 1 : x;
										}(
											elm_lang$core$List$length(
												elm_lang$core$String$lines(textOptions.et)));
										var heightValue = function (count) {
											if (maybePadding.$ === 1) {
												return 'calc(' + (elm_lang$core$String$fromInt(count) + ('em + ' + (elm_lang$core$String$fromInt(count * spacing) + 'px)')));
											} else {
												var _n14 = maybePadding.a;
												var t = _n14.a;
												var r = _n14.b;
												var b = _n14.c;
												var l = _n14.d;
												return 'calc(' + (elm_lang$core$String$fromInt(count) + ('em + ' + (elm_lang$core$String$fromInt((t + b) + (count * spacing)) + 'px)')));
											}
										};
										return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
											A3(
												mdgriffith$stylish_elephants$Internal$Model$Single,
												'textarea-height-' + elm_lang$core$String$fromInt(newlineCount),
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
							elm_lang$html$Html$text(textOptions.et))
						]));
			}
		}();
		var inputNode = _n0.a;
		var inputAttrs = _n0.b;
		var inputChildren = _n0.c;
		var inputElement = _Utils_Tuple3(
			elm_lang$core$Maybe$Just(inputNode),
			elm_lang$core$List$concat(
				_List_fromArray(
					[
						_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$Input$focusDefault(attrs)
						]),
						inputAttrs,
						behavior
					])),
			inputChildren);
		return A3(
			mdgriffith$stylish_elephants$Element$Input$onGrid,
			A2(
				elm_lang$core$List$cons,
				A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'cursor', 'cursor-text'),
				parentAttributes),
			A2(
				elm_lang$core$List$filterMap,
				elm_lang$core$Basics$identity,
				_List_fromArray(
					[
						function () {
						var _n15 = textOptions.aS;
						var pos = _n15.a;
						var labelAttrs = _n15.b;
						var child = _n15.c;
						return elm_lang$core$Maybe$Just(
							_Utils_Tuple3(pos, labelAttrs, child));
					}(),
						function () {
						var _n16 = textOptions.d4;
						if (_n16.$ === 1) {
							if (!nearbys.b) {
								return elm_lang$core$Maybe$Nothing;
							} else {
								var actualNearbys = nearbys;
								return elm_lang$core$Maybe$Just(
									_Utils_Tuple3(4, actualNearbys, mdgriffith$stylish_elephants$Internal$Model$Empty));
							}
						} else {
							var _n18 = _n16.a;
							var placeholderAttrs = _n18.a;
							var placeholderEl = _n18.b;
							return (elm_lang$core$String$trim(textOptions.et) === '') ? elm_lang$core$Maybe$Just(
								_Utils_Tuple3(
									4,
									A2(
										elm_lang$core$List$cons,
										mdgriffith$stylish_elephants$Element$Font$color(mdgriffith$stylish_elephants$Element$Input$charcoal),
										A2(
											elm_lang$core$List$cons,
											A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'text-selection', mdgriffith$stylish_elephants$Internal$Style$classes.dM),
											A2(
												elm_lang$core$List$cons,
												mdgriffith$stylish_elephants$Element$Input$defaultTextPadding,
												A2(
													elm_lang$core$List$cons,
													mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
													A2(
														elm_lang$core$List$cons,
														mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
														_Utils_ap(
															inputPadding,
															_Utils_ap(nearbys, placeholderAttrs))))))),
									placeholderEl)) : elm_lang$core$Maybe$Nothing;
						}
					}()
					])),
			inputElement);
	});
var mdgriffith$stylish_elephants$Element$Input$email = mdgriffith$stylish_elephants$Element$Input$textHelper(
	{
		o: elm_lang$core$Maybe$Just('email'),
		s: false,
		v: mdgriffith$stylish_elephants$Element$Input$TextInputNode('email')
	});
var mdgriffith$stylish_elephants$Element$Input$Label = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Element$Input$labelAbove = mdgriffith$stylish_elephants$Element$Input$Label(2);
var author$project$Framework$FormField$inputText = F2(
	function (model, _n0) {
		var field = _n0.bI;
		var label = _n0.aS;
		var modelValue = model.a6;
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
						mdgriffith$stylish_elephants$Element$Background$color(author$project$Framework$Color$transparent),
						mdgriffith$stylish_elephants$Element$Border$widthEach(
						{cT: 1, dw: 0, eb: 0, ew: 0}),
						mdgriffith$stylish_elephants$Element$Border$rounded(0),
						A2(mdgriffith$stylish_elephants$Element$paddingXY, 0, 8),
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
						A2(author$project$Framework$FormField$hackInLineStyle, 'transition', 'all 0.15s'),
						A2(author$project$Framework$FormField$hackInLineStyle, 'z-index', '10')
					]),
				A2(author$project$Framework$FormField$hasFocus, model, field) ? _List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Border$color(author$project$Framework$Color$primary)
					]) : _List_Nil),
			{
				aS: A2(
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
				dP: elm_lang$core$Maybe$Just(
					author$project$Framework$FormField$Input(field)),
				d4: elm_lang$core$Maybe$Nothing,
				et: modelValue
			});
	});
var author$project$Framework$FormField$example1 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormField$inputText,
			model,
			{bI: 0, aS: 'E-mail address'}),
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
			A2(elm_lang$html$Html$Attributes$style, text1, text2));
	});
var author$project$Framework$FormFieldWithPattern$hasFocus = F2(
	function (model, field) {
		var _n0 = model.al;
		if (!_n0.$) {
			var focus = _n0.a;
			return _Utils_eq(focus, field);
		} else {
			return false;
		}
	});
var elm_lang$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			elm_lang$core$String$slice,
			-n,
			elm_lang$core$String$length(string),
			string);
	});
var mdgriffith$stylish_elephants$Internal$Model$Typeface = function (a) {
	return {$: 3, a: a};
};
var mdgriffith$stylish_elephants$Element$Font$typeface = mdgriffith$stylish_elephants$Internal$Model$Typeface;
var mdgriffith$stylish_elephants$Element$Input$text = mdgriffith$stylish_elephants$Element$Input$textHelper(
	{
		o: elm_lang$core$Maybe$Nothing,
		s: false,
		v: mdgriffith$stylish_elephants$Element$Input$TextInputNode('text')
	});
var author$project$Framework$FormFieldWithPattern$inputText = F2(
	function (model, _n0) {
		var field = _n0.bI;
		var pattern = _n0.a_;
		var label = _n0.aS;
		var modelValue = function () {
			switch (field) {
				case 0:
					return model.eD;
				case 1:
					return model.eD;
				default:
					return model.eD;
			}
		}();
		var lengthDifference = elm_lang$core$String$length(pattern) - elm_lang$core$String$length(modelValue);
		var patternToShow = _Utils_ap(
			modelValue,
			A2(elm_lang$core$String$right, lengthDifference, pattern));
		var largeSize = field === 2;
		var moveDownPlaceHolder = largeSize ? author$project$Framework$Configuration$conf.dK.dv : author$project$Framework$Configuration$conf.dK.ek;
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
									(A2(author$project$Framework$FormFieldWithPattern$hasFocus, model, field) && largeSize) ? mdgriffith$stylish_elephants$Element$Font$color(author$project$Framework$Color$primary) : mdgriffith$stylish_elephants$Element$Font$color(author$project$Framework$Color$grey_light),
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
									{cT: 2, dw: 0, eb: 0, ew: 0}),
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
										mdgriffith$stylish_elephants$Element$Border$color(author$project$Framework$Color$primary)
									]) : _List_Nil)),
						{
							aS: A2(
								mdgriffith$stylish_elephants$Element$Input$labelAbove,
								_Utils_ap(
									_List_fromArray(
										[
											A2(author$project$Framework$FormFieldWithPattern$hackInLineStyle, 'transition', 'all 0.15s'),
											A2(author$project$Framework$FormFieldWithPattern$hackInLineStyle, 'pointer-events', 'none'),
											mdgriffith$stylish_elephants$Element$Font$family(
											_List_fromArray(
												[
													mdgriffith$stylish_elephants$Element$Font$typeface(author$project$Framework$Configuration$conf.aO.co),
													author$project$Framework$Configuration$conf.aO.eB
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
							dP: elm_lang$core$Maybe$Just(
								A2(author$project$Framework$FormFieldWithPattern$Input, field, pattern)),
							d4: elm_lang$core$Maybe$Nothing,
							et: modelValue
						}))
				]),
			mdgriffith$stylish_elephants$Element$none);
	});
var author$project$Framework$FormFieldWithPattern$example1 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormFieldWithPattern$inputText,
			model,
			{bI: 0, aS: 'Phone number USA', a_: '(000) 000 - 0000'}),
		'inputText model\n    { field = FieldTelephone\n    , pattern = "(000) 000 - 0000"\n    , label = "Phone number USA"\n    }');
};
var author$project$Framework$FormFieldWithPattern$FieldCreditCard = 1;
var author$project$Framework$FormFieldWithPattern$example2 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormFieldWithPattern$inputText,
			model,
			{bI: 1, aS: 'Credit Card number', a_: '0000 - 0000 - 0000 - 0000'}),
		'inputText model\n    { field = FieldCreditCard\n    , pattern = "0000 - 0000 - 0000 - 0000"\n    , label = "Credit Card number"\n    }');
};
var author$project$Framework$FormFieldWithPattern$example3 = function (model) {
	return _Utils_Tuple2(
		A2(
			author$project$Framework$FormFieldWithPattern$inputText,
			model,
			{bI: 2, aS: '4 Digits Code', a_: '_ _ _ _'}),
		'inputText model\n    { field = Field4DigitCode\n    , pattern = "_ _ _ _"\n    , label = "4 Digits Code"\n    }');
};
var author$project$Framework$StyleElementsInput$Button = {$: 1};
var author$project$Framework$StyleElementsInput$example0 = function (_n0) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$button,
			_List_Nil,
			{
				aS: mdgriffith$stylish_elephants$Element$text('Label'),
				aW: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Button)
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
				aS: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dP: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				d4: elm_lang$core$Maybe$Nothing,
				et: model.et
			}),
		'Input.text []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    }');
};
var mdgriffith$stylish_elephants$Element$Input$TextArea = {$: 1};
var mdgriffith$stylish_elephants$Element$Input$multiline = F2(
	function (attrs, multi) {
		return A3(
			mdgriffith$stylish_elephants$Element$Input$textHelper,
			{o: elm_lang$core$Maybe$Nothing, s: multi.b6, v: mdgriffith$stylish_elephants$Element$Input$TextArea},
			attrs,
			{aS: multi.aS, dP: multi.dP, d4: multi.d4, et: multi.et});
	});
var author$project$Framework$StyleElementsInput$example10 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$multiline,
			_List_Nil,
			{
				aS: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dP: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				d4: elm_lang$core$Maybe$Nothing,
				b6: false,
				et: model.et
			}),
		'Input.multiline []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , spellcheck = False\n    }');
};
var author$project$Framework$StyleElementsInput$example11 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$multiline,
			_List_Nil,
			{
				aS: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dP: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				d4: elm_lang$core$Maybe$Nothing,
				b6: true,
				et: model.et
			}),
		'Input.multiline []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , spellcheck = True\n    }');
};
var author$project$Framework$StyleElementsInput$Checkbox = function (a) {
	return {$: 3, a: a};
};
var elm_lang$core$Basics$pi = _Basics_pi;
var elm_lang$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * elm_lang$core$Basics$pi) / 180;
};
var mdgriffith$stylish_elephants$Element$moveUp = function (y) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
		mdgriffith$stylish_elephants$Internal$Model$Transform(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Move,
				elm_lang$core$Maybe$Nothing,
				elm_lang$core$Maybe$Just(-y),
				elm_lang$core$Maybe$Nothing)));
};
var mdgriffith$stylish_elephants$Internal$Model$Rotate = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Element$rotate = function (angle) {
	return mdgriffith$stylish_elephants$Internal$Model$StyleClass(
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
				mdgriffith$stylish_elephants$Element$Font$size(9),
				mdgriffith$stylish_elephants$Element$Font$center,
				mdgriffith$stylish_elephants$Element$Border$rounded(3),
				mdgriffith$stylish_elephants$Element$Border$color(
				checked ? A3(mdgriffith$stylish_elephants$Element$rgb, 59 / 255, 153 / 255, 252 / 255) : A3(mdgriffith$stylish_elephants$Element$rgb, 211 / 255, 211 / 255, 211 / 255)),
				mdgriffith$stylish_elephants$Element$Border$shadow(
				{
					cL: 1,
					j: checked ? A4(mdgriffith$stylish_elephants$Element$rgba, 238 / 255, 238 / 255, 238 / 255, 0) : A3(mdgriffith$stylish_elephants$Element$rgb, 238 / 255, 238 / 255, 238 / 255),
					dO: _Utils_Tuple2(0, 0),
					B: 1
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
					elm_lang$core$Basics$degrees(-45)),
					mdgriffith$stylish_elephants$Element$centerX,
					mdgriffith$stylish_elephants$Element$centerY,
					mdgriffith$stylish_elephants$Element$moveUp(1),
					mdgriffith$stylish_elephants$Element$Border$widthEach(
					{cT: 2, dw: 2, eb: 0, ew: 0})
				]),
			mdgriffith$stylish_elephants$Element$none) : mdgriffith$stylish_elephants$Element$none);
};
var mdgriffith$stylish_elephants$Element$Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _n0 = lookup(code);
		if (_n0.$ === 1) {
			return elm_lang$json$Json$Decode$fail('No key matched');
		} else {
			var msg = _n0.a;
			return elm_lang$json$Json$Decode$succeed(msg);
		}
	};
	var isKey = A2(
		elm_lang$json$Json$Decode$andThen,
		decode,
		A2(elm_lang$json$Json$Decode$field, 'key', elm_lang$json$Json$Decode$string));
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		A2(elm_lang$html$Html$Events$on, 'keyup', isKey));
};
var mdgriffith$stylish_elephants$Element$Input$space = ' ';
var mdgriffith$stylish_elephants$Element$Input$tabindex = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		elm_lang$html$Html$Attributes$tabindex($));
};
var mdgriffith$stylish_elephants$Element$Input$checkbox = F2(
	function (attrs, _n0) {
		var label = _n0.aS;
		var icon = _n0.dq;
		var checked = _n0.cY;
		var onChange = _n0.dP;
		var input = _Utils_Tuple3(
			elm_lang$core$Maybe$Just('div'),
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Internal$Model$Attr(
					A2(elm_lang$html$Html$Attributes$attribute, 'role', 'checkbox')),
					mdgriffith$stylish_elephants$Internal$Model$Attr(
					A2(
						elm_lang$html$Html$Attributes$attribute,
						'aria-checked',
						checked ? 'true' : 'false')),
					mdgriffith$stylish_elephants$Element$centerY,
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
					mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink)
				]),
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
				]));
		var attributes = _Utils_ap(
			function () {
				if (onChange.$ === 1) {
					return _List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$Attr(
							elm_lang$html$Html$Attributes$disabled(true)),
							mdgriffith$stylish_elephants$Element$Region$announce
						]);
				} else {
					var checkMsg = onChange.a;
					return _List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$Attr(
							elm_lang$html$Html$Events$onClick(
								checkMsg(!checked))),
							mdgriffith$stylish_elephants$Element$Region$announce,
							mdgriffith$stylish_elephants$Element$Input$onKeyLookup(
							function (code) {
								return _Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$enter) ? elm_lang$core$Maybe$Just(
									checkMsg(!checked)) : (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$space) ? elm_lang$core$Maybe$Just(
									checkMsg(!checked)) : elm_lang$core$Maybe$Nothing);
							})
						]);
				}
			}(),
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Element$Input$tabindex(0),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Element$pointer,
					A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Element$alignLeft,
						A2(
							elm_lang$core$List$cons,
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
							attrs)))));
		return A3(
			mdgriffith$stylish_elephants$Internal$Grid$relative,
			elm_lang$core$Maybe$Just('label'),
			attributes,
			function (group) {
				var position = label.a;
				var labelAttrs = label.b;
				var child = label.c;
				return A3(
					mdgriffith$stylish_elephants$Element$Input$place,
					position,
					{
						bx: A2(elm_lang$core$List$cons, mdgriffith$stylish_elephants$Element$alignLeft, labelAttrs),
						e: _List_fromArray(
							[child]),
						bg: 1,
						N: 0,
						cq: function () {
							switch (position) {
								case 2:
									return 2;
								case 3:
									return 2;
								default:
									return 1;
							}
						}()
					},
					group);
			}(
				{
					ae: elm_lang$core$Maybe$Nothing,
					ah: elm_lang$core$Maybe$Nothing,
					bE: mdgriffith$stylish_elephants$Internal$Model$Fill(1),
					an: elm_lang$core$Maybe$Nothing,
					dw: elm_lang$core$Maybe$Nothing,
					d7: input,
					eb: elm_lang$core$Maybe$Nothing
				}));
	});
var author$project$Framework$StyleElementsInput$example2 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$checkbox,
			_List_Nil,
			{
				cY: model.aI,
				dq: elm_lang$core$Maybe$Nothing,
				aS: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dP: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Checkbox)
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
							if (status.$ === 2) {
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
var elm_lang$core$List$isEmpty = function (xs) {
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
var mdgriffith$stylish_elephants$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		var position = label.a;
		var labelAttrs = label.b;
		var labelChild = label.c;
		var labelElement = A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm_lang$core$Maybe$Nothing,
			labelAttrs,
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[labelChild])));
		switch (position) {
			case 2:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asColumn,
					elm_lang$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			case 3:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asColumn,
					elm_lang$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[input, labelElement])));
			case 0:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm_lang$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[input, labelElement])));
			case 1:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm_lang$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
			default:
				return A5(
					mdgriffith$stylish_elephants$Internal$Model$element,
					mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
					mdgriffith$stylish_elephants$Internal$Model$asRow,
					elm_lang$core$Maybe$Just('label'),
					attrs,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
						_List_fromArray(
							[labelElement, input])));
		}
	});
var mdgriffith$stylish_elephants$Element$Input$column = F2(
	function (attributes, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asColumn,
			elm_lang$core$Maybe$Nothing,
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
				A2(
					elm_lang$core$List$cons,
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
			elm_lang$core$Maybe$Nothing,
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				attributes),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Element$Input$upArrow = 'ArrowUp';
var mdgriffith$stylish_elephants$Element$Input$radioHelper = F3(
	function (orientation, attrs, input) {
		var track = F2(
			function (opt, _n25) {
				var found = _n25.a;
				var prev = _n25.b;
				var nxt = _n25.c;
				var val = opt.a;
				switch (found) {
					case 0:
						return _Utils_eq(
							elm_lang$core$Maybe$Just(val),
							input.b4) ? _Utils_Tuple3(1, prev, nxt) : _Utils_Tuple3(found, val, nxt);
					case 1:
						return _Utils_Tuple3(2, prev, val);
					default:
						return _Utils_Tuple3(found, prev, nxt);
				}
			});
		var renderOption = function (_n22) {
			var val = _n22.a;
			var view = _n22.b;
			var status = _Utils_eq(
				elm_lang$core$Maybe$Just(val),
				input.b4) ? 2 : 0;
			return A2(
				mdgriffith$stylish_elephants$Element$el,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$pointer,
						function () {
						if (!orientation.$) {
							return mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink);
						} else {
							return mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill);
						}
					}(),
						function () {
						var _n20 = input.dP;
						if (_n20.$ === 1) {
							return mdgriffith$stylish_elephants$Internal$Model$NoAttribute;
						} else {
							var send = _n20.a;
							return mdgriffith$stylish_elephants$Element$Events$onClick(
								send(val));
						}
					}(),
						function () {
						if (status.$ === 2) {
							return mdgriffith$stylish_elephants$Internal$Model$Attr(
								A2(elm_lang$html$Html$Attributes$attribute, 'aria-checked', 'true'));
						} else {
							return mdgriffith$stylish_elephants$Internal$Model$Attr(
								A2(elm_lang$html$Html$Attributes$attribute, 'aria-checked', 'false'));
						}
					}(),
						mdgriffith$stylish_elephants$Internal$Model$Attr(
						A2(elm_lang$html$Html$Attributes$attribute, 'role', 'radio'))
					]),
				view(status));
		};
		var prevNext = function () {
			var _n15 = input.dU;
			if (!_n15.b) {
				return elm_lang$core$Maybe$Nothing;
			} else {
				var _n16 = _n15.a;
				var val = _n16.a;
				return function (_n17) {
					var found = _n17.a;
					var b = _n17.b;
					var a = _n17.c;
					switch (found) {
						case 0:
							return elm_lang$core$Maybe$Just(
								_Utils_Tuple2(b, val));
						case 1:
							return elm_lang$core$Maybe$Just(
								_Utils_Tuple2(b, val));
						default:
							return elm_lang$core$Maybe$Just(
								_Utils_Tuple2(b, a));
					}
				}(
					A3(
						elm_lang$core$List$foldl,
						track,
						_Utils_Tuple3(0, val, val),
						input.dU));
			}
		}();
		var optionArea = function () {
			if (!orientation.$) {
				return A2(
					mdgriffith$stylish_elephants$Element$Input$row,
					attrs,
					A2(elm_lang$core$List$map, renderOption, input.dU));
			} else {
				return A2(
					mdgriffith$stylish_elephants$Element$Input$column,
					attrs,
					A2(elm_lang$core$List$map, renderOption, input.dU));
			}
		}();
		var labelVisible = function () {
			var _n11 = input.aS;
			var labelAttrs = _n11.b;
			return elm_lang$core$List$isEmpty(
				A2(
					mdgriffith$stylish_elephants$Internal$Model$get,
					labelAttrs,
					function (attr) {
						_n12$2:
						while (true) {
							switch (attr.$) {
								case 4:
									if (attr.a.$ === 11) {
										var _n13 = attr.a;
										return true;
									} else {
										break _n12$2;
									}
								case 3:
									if ((attr.a === 'hidden') && (attr.b === 'hidden')) {
										return true;
									} else {
										break _n12$2;
									}
								default:
									break _n12$2;
							}
						}
						return false;
					}));
		}();
		var inputVisible = elm_lang$core$List$isEmpty(
			A2(
				mdgriffith$stylish_elephants$Internal$Model$get,
				attrs,
				function (attr) {
					_n9$2:
					while (true) {
						switch (attr.$) {
							case 4:
								if (attr.a.$ === 11) {
									var _n10 = attr.a;
									return true;
								} else {
									break _n9$2;
								}
							case 3:
								if ((attr.a === 'hidden') && (attr.b === 'hidden')) {
									return true;
								} else {
									break _n9$2;
								}
							default:
								break _n9$2;
						}
					}
					return false;
				}));
		var hideIfEverythingisInvisible = function () {
			if ((!labelVisible) && (!inputVisible)) {
				var pseudos = A2(
					elm_lang$core$List$filterMap,
					function (attr) {
						if (attr.$ === 4) {
							var style = attr.a;
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
								var transparent = A2(elm_lang$core$List$filter, forTransparency, styles);
								if (!transparent.b) {
									return elm_lang$core$Maybe$Nothing;
								} else {
									return elm_lang$core$Maybe$Just(
										mdgriffith$stylish_elephants$Internal$Model$StyleClass(
											A2(mdgriffith$stylish_elephants$Internal$Model$PseudoSelector, pseudo, transparent)));
								}
							} else {
								return elm_lang$core$Maybe$Nothing;
							}
						} else {
							return elm_lang$core$Maybe$Nothing;
						}
					},
					attrs);
				return A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$StyleClass(
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
				var _n0 = input.dP;
				if (_n0.$ === 1) {
					return A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Element$alignLeft,
						A2(
							elm_lang$core$List$cons,
							mdgriffith$stylish_elephants$Element$Region$announce,
							_Utils_ap(hideIfEverythingisInvisible, events)));
				} else {
					var onChange = _n0.a;
					return _Utils_ap(
						A2(
							elm_lang$core$List$filterMap,
							elm_lang$core$Basics$identity,
							_List_fromArray(
								[
									elm_lang$core$Maybe$Just(mdgriffith$stylish_elephants$Element$alignLeft),
									elm_lang$core$Maybe$Just(
									mdgriffith$stylish_elephants$Element$Input$tabindex(0)),
									elm_lang$core$Maybe$Just(
									mdgriffith$stylish_elephants$Internal$Model$htmlClass('focus')),
									elm_lang$core$Maybe$Just(mdgriffith$stylish_elephants$Element$Region$announce),
									elm_lang$core$Maybe$Just(
									mdgriffith$stylish_elephants$Internal$Model$Attr(
										A2(elm_lang$html$Html$Attributes$attribute, 'role', 'radiogroup'))),
									function () {
									if (prevNext.$ === 1) {
										return elm_lang$core$Maybe$Nothing;
									} else {
										var _n2 = prevNext.a;
										var prev = _n2.a;
										var next = _n2.b;
										return elm_lang$core$Maybe$Just(
											mdgriffith$stylish_elephants$Element$Input$onKeyLookup(
												function (code) {
													if (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$leftArrow)) {
														return elm_lang$core$Maybe$Just(
															onChange(prev));
													} else {
														if (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$upArrow)) {
															return elm_lang$core$Maybe$Just(
																onChange(prev));
														} else {
															if (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$rightArrow)) {
																return elm_lang$core$Maybe$Just(
																	onChange(next));
															} else {
																if (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$downArrow)) {
																	return elm_lang$core$Maybe$Just(
																		onChange(next));
																} else {
																	if (_Utils_eq(code, mdgriffith$stylish_elephants$Element$Input$space)) {
																		var _n3 = input.b4;
																		if (_n3.$ === 1) {
																			return elm_lang$core$Maybe$Just(
																				onChange(prev));
																		} else {
																			return elm_lang$core$Maybe$Nothing;
																		}
																	} else {
																		return elm_lang$core$Maybe$Nothing;
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
			input.aS,
			optionArea);
	});
var mdgriffith$stylish_elephants$Element$Input$radio = mdgriffith$stylish_elephants$Element$Input$radioHelper(1);
var author$project$Framework$StyleElementsInput$example3 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$radio,
			_List_Nil,
			{
				aS: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dP: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Radio),
				dU: _List_fromArray(
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
				b4: model.av
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
				aS: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dP: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Radio),
				dU: _List_fromArray(
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
				b4: model.av
			}),
		'Input.radioRow []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Radio\n    , selected = model.radio\n    , options =\n        [ Input.option "A" (text "Radio A")\n        , Input.option "B" (text "Radio B")\n        , Input.option "C" (text "Radio C")\n        ]\n    }');
};
var mdgriffith$stylish_elephants$Element$Input$username = mdgriffith$stylish_elephants$Element$Input$textHelper(
	{
		o: elm_lang$core$Maybe$Just('username'),
		s: false,
		v: mdgriffith$stylish_elephants$Element$Input$TextInputNode('text')
	});
var author$project$Framework$StyleElementsInput$example5 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$username,
			_List_Nil,
			{
				aS: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dP: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				d4: elm_lang$core$Maybe$Nothing,
				et: model.et
			}),
		'Input.username []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    }');
};
var mdgriffith$stylish_elephants$Element$Input$newPassword = F2(
	function (attrs, pass) {
		return A3(
			mdgriffith$stylish_elephants$Element$Input$textHelper,
			{
				o: elm_lang$core$Maybe$Just('new-password'),
				s: false,
				v: mdgriffith$stylish_elephants$Element$Input$TextInputNode(
					pass.b5 ? 'text' : 'password')
			},
			attrs,
			{aS: pass.aS, dP: pass.dP, d4: pass.d4, et: pass.et});
	});
var author$project$Framework$StyleElementsInput$example6 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$newPassword,
			_List_Nil,
			{
				aS: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dP: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				d4: elm_lang$core$Maybe$Nothing,
				b5: false,
				et: model.et
			}),
		'Input.newPassword []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , show = False\n    }');
};
var mdgriffith$stylish_elephants$Element$Input$currentPassword = F2(
	function (attrs, pass) {
		return A3(
			mdgriffith$stylish_elephants$Element$Input$textHelper,
			{
				o: elm_lang$core$Maybe$Just('current-password'),
				s: false,
				v: mdgriffith$stylish_elephants$Element$Input$TextInputNode(
					pass.b5 ? 'text' : 'password')
			},
			attrs,
			{aS: pass.aS, dP: pass.dP, d4: pass.d4, et: pass.et});
	});
var author$project$Framework$StyleElementsInput$example7 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$currentPassword,
			_List_Nil,
			{
				aS: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dP: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				d4: elm_lang$core$Maybe$Nothing,
				b5: false,
				et: model.et
			}),
		'Input.currentPassword []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    , show = False\n    }');
};
var author$project$Framework$StyleElementsInput$example8 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$email,
			_List_Nil,
			{
				aS: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dP: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				d4: elm_lang$core$Maybe$Nothing,
				et: model.et
			}),
		'Input.email []\n    { label = Input.labelAbove [] <| text "Label"\n    , onChange = Just Input\n    , placeholder = Nothing\n    , text = model.text\n    }');
};
var mdgriffith$stylish_elephants$Element$Input$search = mdgriffith$stylish_elephants$Element$Input$textHelper(
	{
		o: elm_lang$core$Maybe$Nothing,
		s: false,
		v: mdgriffith$stylish_elephants$Element$Input$TextInputNode('search')
	});
var author$project$Framework$StyleElementsInput$example9 = function (model) {
	return _Utils_Tuple2(
		A2(
			mdgriffith$stylish_elephants$Element$Input$search,
			_List_Nil,
			{
				aS: A2(
					mdgriffith$stylish_elephants$Element$Input$labelAbove,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text('Label')),
				dP: elm_lang$core$Maybe$Just(author$project$Framework$StyleElementsInput$Input),
				d4: elm_lang$core$Maybe$Nothing,
				et: model.et
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
					A2(author$project$Framework$sourceCodeWrapper, model.b, componentExampleSourceCodeToDisplay)
				]));
	});
var author$project$Framework$viewIntrospectionBody = F3(
	function (model, title, listSubSection) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$padding(model.b.y),
					mdgriffith$stylish_elephants$Element$spacing(model.b.y),
					mdgriffith$stylish_elephants$Element$Background$color(author$project$Color$white)
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
						elm_lang$core$List$map,
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
var mdgriffith$stylish_elephants$Element$Font$extraLight = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Style$classes.cd, mdgriffith$stylish_elephants$Internal$Style$classes.cd);
var author$project$Framework$viewTitleAndSubTitle = F3(
	function (configuration, title, subTitle) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Background$color(configuration.bf),
					mdgriffith$stylish_elephants$Element$padding(configuration.y),
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
			mdgriffith$stylish_elephants$Element$text(introspection.aj));
	});
var author$project$Framework$viewIntrospection = F2(
	function (model, introspection) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_Nil,
			A2(
				elm_lang$core$List$cons,
				A2(author$project$Framework$viewIntrospectionTitle, model.b, introspection),
				A2(
					elm_lang$core$List$map,
					function (_n0) {
						var string = _n0.a;
						var listSubSections = _n0.b;
						return A3(author$project$Framework$viewIntrospectionBody, model, string, listSubSections);
					},
					introspection.ac)));
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
		A2(elm_lang$core$String$join, '/', pieces));
};
var author$project$Framework$viewLogo = F3(
	function (title, subTitle, version) {
		return A2(
			mdgriffith$stylish_elephants$Element$link,
			_List_Nil,
			{
				aS: A2(
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
				elm_lang$core$List$cons,
				A2(author$project$Framework$viewIntrospectionTitle, model.b, introspection),
				_Utils_ap(
					(introspection.ax !== '') ? _List_fromArray(
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
										elm_lang$core$String$join,
										'⇾',
										A2(elm_lang$core$String$split, '->', introspection.ax)))
								]))
						]) : _List_Nil,
					_List_fromArray(
						[
							A3(author$project$Framework$viewIntrospectionBody, model, title, listSubSection)
						]))));
	});
var mdgriffith$stylish_elephants$Element$scrollbars = A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'overflow', mdgriffith$stylish_elephants$Internal$Style$classes.ef);
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
								mdgriffith$stylish_elephants$Element$padding(model.b.y + 100),
								mdgriffith$stylish_elephants$Element$spacing(model.b.y)
							]),
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_Nil,
								A3(author$project$Framework$viewLogo, model.b.aA, model.b.a4, model.b.a7)),
								A2(
								mdgriffith$stylish_elephants$Element$el,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Font$size(24)
									]),
								model.b.bj),
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
							elm_lang$core$List$map,
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
			elm_lang$core$List$map,
			function (_n0) {
				var title = _n0.a;
				return A2(
					mdgriffith$stylish_elephants$Element$link,
					_List_Nil,
					{
						aS: mdgriffith$stylish_elephants$Element$text(title),
						n: author$project$Framework$routeToString(
							A2(author$project$Framework$RouteSubPage, introspection.r, title))
					});
			},
			variations);
	});
var author$project$Framework$viewIntrospectionForMenu = F3(
	function (configuration, introspection, open) {
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Font$color(author$project$Color$black)
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
										open ? (elm_lang$core$Basics$pi / 2) : 0)
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
								mdgriffith$stylish_elephants$Element$Font$color(author$project$Color$black),
								mdgriffith$stylish_elephants$Element$spacing(12),
								mdgriffith$stylish_elephants$Element$paddingEach(
								{cT: 0, dw: 26, eb: 0, ew: 12})
							]),
						open ? _List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$htmlAttribute(
								elm_lang$html$Html$Attributes$class('elmStyleguideGenerator-open'))
							]) : _List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$htmlAttribute(
								elm_lang$html$Html$Attributes$class('elmStyleguideGenerator-close'))
							])),
					A2(author$project$Framework$viewListVariationForMenu, introspection, introspection.ac))
				]));
	});
var author$project$Framework$viewMenuColumn = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$Background$color(model.b.aP),
				mdgriffith$stylish_elephants$Element$Font$color(author$project$Color$black),
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
				mdgriffith$stylish_elephants$Element$spacing(30),
				A2(mdgriffith$stylish_elephants$Element$paddingXY, model.b.y, model.b.y),
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
						A3(author$project$Framework$viewLogo, model.b.aA, model.b.a4, model.b.a7),
						A2(
						mdgriffith$stylish_elephants$Element$row,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$spacing(10),
								mdgriffith$stylish_elephants$Element$Font$size(14),
								mdgriffith$stylish_elephants$Element$Font$color(author$project$Color$black),
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
					elm_lang$core$List$map,
					function (_n0) {
						var data = _n0.a;
						var show = _n0.b;
						return A3(author$project$Framework$viewIntrospectionForMenu, model.b, data, show);
					},
					model.q))
			]));
};
var mdgriffith$stylish_elephants$Element$clipX = A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'overflow', mdgriffith$stylish_elephants$Internal$Style$classes.c_);
var mdgriffith$stylish_elephants$Element$scrollbarY = A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'overflow', mdgriffith$stylish_elephants$Internal$Style$classes.eh);
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
							return mdgriffith$stylish_elephants$Element$px(windowSize.bg);
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
						elm_lang$html$Html$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								elm_lang$html$Html$text(author$project$Framework$css)
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
	cF: elm_lang$core$Maybe$Nothing,
	cO: elm_lang$core$Maybe$Nothing,
	ei: elm_lang$core$Maybe$Just(
		{
			cL: 3,
			j: A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			dO: _Utils_Tuple2(0, 0),
			B: 3
		})
};
var mdgriffith$stylish_elephants$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 0:
					var hoverable = opt.a;
					var _n4 = record.dn;
					if (_n4.$ === 1) {
						return _Utils_update(
							record,
							{
								dn: elm_lang$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 1:
					var focusStyle = opt.a;
					var _n5 = record.al;
					if (_n5.$ === 1) {
						return _Utils_update(
							record,
							{
								al: elm_lang$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _n6 = record.dJ;
					if (_n6.$ === 1) {
						return _Utils_update(
							record,
							{
								dJ: elm_lang$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			al: function () {
				var _n0 = record.al;
				if (_n0.$ === 1) {
					return mdgriffith$stylish_elephants$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _n0.a;
					return focusable;
				}
			}(),
			dn: function () {
				var _n1 = record.dn;
				if (_n1.$ === 1) {
					return 1;
				} else {
					var hoverable = _n1.a;
					return hoverable;
				}
			}(),
			dJ: function () {
				var _n2 = record.dJ;
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
			elm_lang$core$List$foldr,
			combine,
			{al: elm_lang$core$Maybe$Nothing, dn: elm_lang$core$Maybe$Nothing, dJ: elm_lang$core$Maybe$Nothing},
			options));
};
var mdgriffith$stylish_elephants$Internal$Model$toHtml = F2(
	function (options, el) {
		switch (el.$) {
			case 0:
				var html = el.a;
				return html(mdgriffith$stylish_elephants$Internal$Model$asEl);
			case 1:
				var styles = el.a.ep;
				var html = el.a.$7;
				var styleSheet = A2(
					mdgriffith$stylish_elephants$Internal$Model$toStyleSheetString,
					options,
					A3(
						elm_lang$core$List$foldr,
						mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
						_Utils_Tuple2(
							elm_lang$core$Set$empty,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.al)
								])),
						styles).b);
				return A2(
					html,
					elm_lang$core$Maybe$Just(styleSheet),
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
			var _n0 = options.dJ;
			if (_n0.$ === 2) {
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
				elm_lang$core$Maybe$Nothing,
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
			mdgriffith$stylish_elephants$Internal$Model$StyleClass(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Colored,
				'bg-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(
					A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 1, 1, 1, 0))),
			mdgriffith$stylish_elephants$Internal$Model$StyleClass(
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Colored,
				'font-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(
					A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 0, 0, 0, 0)),
				'color',
				A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 0, 0, 0, 0))),
			mdgriffith$stylish_elephants$Internal$Model$StyleClass(
			A3(mdgriffith$stylish_elephants$Internal$Model$Single, 'font-size-20', 'font-size', '20px')),
			mdgriffith$stylish_elephants$Internal$Model$StyleClass(
			A2(
				mdgriffith$stylish_elephants$Internal$Model$FontFamily,
				A3(elm_lang$core$List$foldl, mdgriffith$stylish_elephants$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var mdgriffith$stylish_elephants$Element$layoutWith = F3(
	function (_n0, attrs, child) {
		var options = _n0.dU;
		return A3(
			mdgriffith$stylish_elephants$Internal$Model$renderRoot,
			options,
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(
					A2(
						elm_lang$core$String$join,
						' ',
						_List_fromArray(
							[mdgriffith$stylish_elephants$Internal$Style$classes.ec, mdgriffith$stylish_elephants$Internal$Style$classes.cC, mdgriffith$stylish_elephants$Internal$Style$classes.ej]))),
				A2(
					elm_lang$core$List$cons,
					A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'x-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.ai),
					A2(
						elm_lang$core$List$cons,
						A2(mdgriffith$stylish_elephants$Internal$Model$Class, 'y-content-align', mdgriffith$stylish_elephants$Internal$Style$classes.V),
						_Utils_ap(mdgriffith$stylish_elephants$Internal$Model$rootStyle, attrs)))),
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
		cM: _List_fromArray(
			[
				A3(
				mdgriffith$stylish_elephants$Element$layoutWith,
				{
					dU: _List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$focusStyle(
							{
								cF: elm_lang$core$Maybe$Nothing,
								cO: elm_lang$core$Maybe$Just(
									A3(mdgriffith$stylish_elephants$Element$rgb, 0.9, 0.2, 0.2)),
								ei: elm_lang$core$Maybe$Nothing
							})
						])
				},
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Font$family(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Font$external(
								{r: author$project$Framework$Configuration$conf.aO.co, n: author$project$Framework$Configuration$conf.aO.n}),
								mdgriffith$stylish_elephants$Element$Font$typeface(author$project$Framework$Configuration$conf.aO.co),
								author$project$Framework$Configuration$conf.aO.eB
							])),
						mdgriffith$stylish_elephants$Element$Font$size(16),
						mdgriffith$stylish_elephants$Element$Font$color(author$project$Color$black),
						mdgriffith$stylish_elephants$Element$Background$color(author$project$Color$white),
						model.b.be
					]),
				A2(author$project$Framework$viewPage, model.aV, model))
			]),
		aA: '0.19 - Elm Style Framework'
	};
};
var elm_lang$browser$Browser$Env = F2(
	function (flags, url) {
		return {da: flags, n: url};
	});
var elm_lang$browser$Browser$NotFound = elm_lang$core$Basics$identity;
var elm_lang$core$String$startsWith = _String_startsWith;
var elm_lang$url$Url$Parser$Http = 0;
var elm_lang$url$Url$Parser$Https = 1;
var elm_lang$core$String$indexes = _String_indexes;
var elm_lang$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm_lang$core$String$slice, 0, n, string);
	});
var elm_lang$core$String$contains = _String_contains;
var elm_lang$core$String$toInt = _String_toInt;
var elm_lang$url$Url$Parser$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {bJ: fragment, bP: host, bW: path, b_: port_, b2: protocol, bm: query};
	});
var elm_lang$url$Url$Parser$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm_lang$core$String$isEmpty(str) || A2(elm_lang$core$String$contains, '@', str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm_lang$core$Maybe$Just(
					A6(elm_lang$url$Url$Parser$Url, protocol, str, elm_lang$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm_lang$core$String$toInt(
						A2(elm_lang$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm_lang$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm_lang$core$Maybe$Just(
							A6(
								elm_lang$url$Url$Parser$Url,
								protocol,
								A2(elm_lang$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm_lang$core$Maybe$Nothing;
				}
			}
		}
	});
var elm_lang$url$Url$Parser$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm_lang$core$String$isEmpty(str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm_lang$url$Url$Parser$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm_lang$url$Url$Parser$chompBeforePath,
					protocol,
					A2(elm_lang$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm_lang$core$String$left, i, str));
			}
		}
	});
var elm_lang$url$Url$Parser$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm_lang$core$String$isEmpty(str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm_lang$url$Url$Parser$chompBeforeQuery, protocol, elm_lang$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm_lang$url$Url$Parser$chompBeforeQuery,
					protocol,
					elm_lang$core$Maybe$Just(
						A2(elm_lang$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm_lang$core$String$left, i, str));
			}
		}
	});
var elm_lang$url$Url$Parser$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm_lang$core$String$isEmpty(str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm_lang$url$Url$Parser$chompBeforeFragment, protocol, elm_lang$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm_lang$url$Url$Parser$chompBeforeFragment,
					protocol,
					elm_lang$core$Maybe$Just(
						A2(elm_lang$core$String$dropLeft, i + 1, str)),
					A2(elm_lang$core$String$left, i, str));
			}
		}
	});
var elm_lang$url$Url$Parser$toUrl = function (str) {
	return A2(elm_lang$core$String$startsWith, 'http://', str) ? A2(
		elm_lang$url$Url$Parser$chompAfterProtocol,
		0,
		A2(elm_lang$core$String$dropLeft, 7, str)) : (A2(elm_lang$core$String$startsWith, 'https://', str) ? A2(
		elm_lang$url$Url$Parser$chompAfterProtocol,
		1,
		A2(elm_lang$core$String$dropLeft, 8, str)) : elm_lang$core$Maybe$Nothing);
};
var elm_lang$browser$Browser$unsafeToUrl = function (string) {
	var _n0 = elm_lang$url$Url$Parser$toUrl(string);
	if (_n0.$ === 1) {
		return _Browser_invalidUrl(string);
	} else {
		var url = _n0.a;
		return url;
	}
};
var elm_lang$browser$Browser$Navigation$Manager$Listen = elm_lang$core$Basics$identity;
var elm_lang$browser$Browser$Navigation$Manager$State = F2(
	function (subs, popWatcher) {
		return {bZ: popWatcher, b9: subs};
	});
var elm_lang$core$Task$succeed = _Scheduler_succeed;
var elm_lang$browser$Browser$Navigation$Manager$init = elm_lang$core$Task$succeed(
	A2(elm_lang$browser$Browser$Navigation$Manager$State, _List_Nil, elm_lang$core$Maybe$Nothing));
var elm_lang$browser$Browser$Navigation$Manager$go = _Browser_go;
var elm_lang$core$Task$andThen = _Scheduler_andThen;
var elm_lang$browser$Browser$Navigation$Manager$ignore = F2(
	function (task, b) {
		return A2(
			elm_lang$core$Task$andThen,
			function (_n0) {
				return elm_lang$core$Task$succeed(b);
			},
			task);
	});
var elm_lang$core$Platform$sendToApp = _Platform_sendToApp;
var elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					elm_lang$core$Task$andThen,
					function (b) {
						return elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm_lang$core$Task$sequence = function (tasks) {
	return A3(
		elm_lang$core$List$foldr,
		elm_lang$core$Task$map2(elm_lang$core$List$cons),
		elm_lang$core$Task$succeed(_List_Nil),
		tasks);
};
var elm_lang$browser$Browser$Navigation$Manager$notify = F3(
	function (router, subs, url) {
		var send = function (_n0) {
			var tagger = _n0;
			return A2(
				elm_lang$core$Platform$sendToApp,
				router,
				tagger(url));
		};
		return A2(
			elm_lang$browser$Browser$Navigation$Manager$ignore,
			elm_lang$core$Task$sequence(
				A2(elm_lang$core$List$map, send, subs)),
			0);
	});
var elm_lang$browser$Browser$Navigation$Manager$pushState = _Browser_pushState;
var elm_lang$browser$Browser$Navigation$Manager$replaceState = _Browser_replaceState;
var elm_lang$browser$Browser$Navigation$Manager$cmdHelp = F3(
	function (router, subs, cmd) {
		switch (cmd.$) {
			case 0:
				var n = cmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$go(n);
			case 1:
				var url = cmd.a;
				return A2(
					elm_lang$core$Task$andThen,
					A2(elm_lang$browser$Browser$Navigation$Manager$notify, router, subs),
					elm_lang$browser$Browser$Navigation$Manager$pushState(url));
			default:
				var url = cmd.a;
				return A2(
					elm_lang$core$Task$andThen,
					A2(elm_lang$browser$Browser$Navigation$Manager$notify, router, subs),
					elm_lang$browser$Browser$Navigation$Manager$replaceState(url));
		}
	});
var elm_lang$core$Process$kill = _Scheduler_kill;
var elm_lang$browser$Browser$Navigation$Manager$killPopWatcher = function (popWatcher) {
	if (!popWatcher.$) {
		var pid = popWatcher.a;
		return elm_lang$core$Process$kill(pid);
	} else {
		var pid1 = popWatcher.a;
		var pid2 = popWatcher.b;
		return A2(
			elm_lang$core$Task$andThen,
			function (_n1) {
				return elm_lang$core$Process$kill(pid2);
			},
			elm_lang$core$Process$kill(pid1));
	}
};
var elm_lang$browser$Browser$Navigation$Manager$InternetExplorer = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm_lang$browser$Browser$Navigation$Manager$Normal = function (a) {
	return {$: 0, a: a};
};
var elm_lang$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm_lang$browser$Browser$Navigation$Manager$reportUrl = F2(
	function (name, router) {
		return A4(
			_Browser_on,
			_Browser_window,
			true,
			name,
			function (_n0) {
				return A2(
					elm_lang$core$Platform$sendToSelf,
					router,
					_Browser_getUrl(0));
			});
	});
var elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm_lang$core$Task$andThen,
			function (a) {
				return elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm_lang$browser$Browser$Navigation$Manager$spawnPopWatcher = function (router) {
	return _Browser_isInternetExplorer11(0) ? A3(
		elm_lang$core$Task$map2,
		elm_lang$browser$Browser$Navigation$Manager$InternetExplorer,
		A2(elm_lang$browser$Browser$Navigation$Manager$reportUrl, 'popstate', router),
		A2(elm_lang$browser$Browser$Navigation$Manager$reportUrl, 'hashchange', router)) : A2(
		elm_lang$core$Task$map,
		elm_lang$browser$Browser$Navigation$Manager$Normal,
		A2(elm_lang$browser$Browser$Navigation$Manager$reportUrl, 'popstate', router));
};
var elm_lang$browser$Browser$Navigation$Manager$onEffects = F4(
	function (router, cmds, subs, _n0) {
		var popWatcher = _n0.bZ;
		var stepState = function () {
			var _n2 = _Utils_Tuple2(subs, popWatcher);
			_n2$2:
			while (true) {
				if (!_n2.a.b) {
					if (!_n2.b.$) {
						var watcher = _n2.b.a;
						return A2(
							elm_lang$browser$Browser$Navigation$Manager$ignore,
							elm_lang$browser$Browser$Navigation$Manager$killPopWatcher(watcher),
							A2(elm_lang$browser$Browser$Navigation$Manager$State, subs, elm_lang$core$Maybe$Nothing));
					} else {
						break _n2$2;
					}
				} else {
					if (_n2.b.$ === 1) {
						var _n3 = _n2.a;
						var _n4 = _n2.b;
						return A2(
							elm_lang$core$Task$map,
							function ($) {
								return A2(
									elm_lang$browser$Browser$Navigation$Manager$State,
									subs,
									elm_lang$core$Maybe$Just($));
							},
							elm_lang$browser$Browser$Navigation$Manager$spawnPopWatcher(router));
					} else {
						break _n2$2;
					}
				}
			}
			return elm_lang$core$Task$succeed(
				A2(elm_lang$browser$Browser$Navigation$Manager$State, subs, popWatcher));
		}();
		return A2(
			elm_lang$core$Task$andThen,
			function (_n1) {
				return stepState;
			},
			elm_lang$core$Task$sequence(
				A2(
					elm_lang$core$List$map,
					A2(elm_lang$browser$Browser$Navigation$Manager$cmdHelp, router, subs),
					cmds)));
	});
var elm_lang$browser$Browser$Navigation$Manager$onSelfMsg = F3(
	function (router, url, state) {
		return A2(
			elm_lang$browser$Browser$Navigation$Manager$ignore,
			A3(elm_lang$browser$Browser$Navigation$Manager$notify, router, state.b9, url),
			state);
	});
var elm_lang$browser$Browser$Navigation$Manager$Go = function (a) {
	return {$: 0, a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$Push = function (a) {
	return {$: 1, a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$Replace = function (a) {
	return {$: 2, a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$cmdMap = F2(
	function (_n0, myCmd) {
		switch (myCmd.$) {
			case 0:
				var n = myCmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$Go(n);
			case 1:
				var url = myCmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$Push(url);
			default:
				var url = myCmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$Replace(url);
		}
	});
var elm_lang$browser$Browser$Navigation$Manager$subMap = F2(
	function (func, _n0) {
		var tagger = _n0;
		return function ($) {
			return func(
				tagger($));
		};
	});
_Platform_effectManagers['Browser.Navigation.Manager'] = _Platform_createManager(elm_lang$browser$Browser$Navigation$Manager$init, elm_lang$browser$Browser$Navigation$Manager$onEffects, elm_lang$browser$Browser$Navigation$Manager$onSelfMsg, elm_lang$browser$Browser$Navigation$Manager$cmdMap, elm_lang$browser$Browser$Navigation$Manager$subMap);
var elm_lang$browser$Browser$Navigation$Manager$command = _Platform_leaf('Browser.Navigation.Manager');
var elm_lang$browser$Browser$Navigation$Manager$subscription = _Platform_leaf('Browser.Navigation.Manager');
var elm_lang$browser$Browser$Navigation$Manager$addListen = F3(
	function (toMsg, toSubs, model) {
		return elm_lang$core$Platform$Sub$batch(
			_List_fromArray(
				[
					elm_lang$browser$Browser$Navigation$Manager$subscription(toMsg),
					toSubs(model)
				]));
	});
var elm_lang$browser$Browser$fullscreen = function (impl) {
	return _Browser_fullscreen(
		{
			du: function (_n0) {
				var flags = _n0.da;
				var url = _n0.n;
				return impl.du(
					A2(
						elm_lang$browser$Browser$Env,
						flags,
						elm_lang$browser$Browser$unsafeToUrl(url)));
			},
			er: function () {
				var _n1 = impl.dR;
				if (_n1.$ === 1) {
					return impl.er;
				} else {
					var toMsg = _n1.a;
					return A2(
						elm_lang$browser$Browser$Navigation$Manager$addListen,
						function ($) {
							return toMsg(
								elm_lang$browser$Browser$unsafeToUrl($));
						},
						impl.er);
				}
			}(),
			eC: impl.eC,
			eE: impl.eE
		});
};
var elm_lang$json$Json$Decode$value = _Json_decodeValue;
var author$project$Framework$main = elm_lang$browser$Browser$fullscreen(
	{
		du: author$project$Framework$init,
		dR: elm_lang$core$Maybe$Just(author$project$Framework$onNavigation),
		er: author$project$Framework$subscriptions,
		eC: author$project$Framework$update,
		eE: author$project$Framework$view
	});
_Platform_export({'Framework':author$project$Framework$main(elm_lang$json$Json$Decode$value)(0)({})});}(this));