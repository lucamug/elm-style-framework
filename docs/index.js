
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
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


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
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


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$Color$fmod = F2(
	function (f, n) {
		var integer = _elm_lang$core$Basics$floor(f);
		return (_elm_lang$core$Basics$toFloat(
			A2(_elm_lang$core$Basics_ops['%'], integer, n)) + f) - _elm_lang$core$Basics$toFloat(integer);
	});
var _elm_lang$core$Color$rgbToHsl = F3(
	function (red, green, blue) {
		var b = _elm_lang$core$Basics$toFloat(blue) / 255;
		var g = _elm_lang$core$Basics$toFloat(green) / 255;
		var r = _elm_lang$core$Basics$toFloat(red) / 255;
		var cMax = A2(
			_elm_lang$core$Basics$max,
			A2(_elm_lang$core$Basics$max, r, g),
			b);
		var cMin = A2(
			_elm_lang$core$Basics$min,
			A2(_elm_lang$core$Basics$min, r, g),
			b);
		var c = cMax - cMin;
		var lightness = (cMax + cMin) / 2;
		var saturation = _elm_lang$core$Native_Utils.eq(lightness, 0) ? 0 : (c / (1 - _elm_lang$core$Basics$abs((2 * lightness) - 1)));
		var hue = _elm_lang$core$Basics$degrees(60) * (_elm_lang$core$Native_Utils.eq(cMax, r) ? A2(_elm_lang$core$Color$fmod, (g - b) / c, 6) : (_elm_lang$core$Native_Utils.eq(cMax, g) ? (((b - r) / c) + 2) : (((r - g) / c) + 4)));
		return {ctor: '_Tuple3', _0: hue, _1: saturation, _2: lightness};
	});
var _elm_lang$core$Color$hslToRgb = F3(
	function (hue, saturation, lightness) {
		var normHue = hue / _elm_lang$core$Basics$degrees(60);
		var chroma = (1 - _elm_lang$core$Basics$abs((2 * lightness) - 1)) * saturation;
		var x = chroma * (1 - _elm_lang$core$Basics$abs(
			A2(_elm_lang$core$Color$fmod, normHue, 2) - 1));
		var _p0 = (_elm_lang$core$Native_Utils.cmp(normHue, 0) < 0) ? {ctor: '_Tuple3', _0: 0, _1: 0, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 1) < 0) ? {ctor: '_Tuple3', _0: chroma, _1: x, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 2) < 0) ? {ctor: '_Tuple3', _0: x, _1: chroma, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 3) < 0) ? {ctor: '_Tuple3', _0: 0, _1: chroma, _2: x} : ((_elm_lang$core$Native_Utils.cmp(normHue, 4) < 0) ? {ctor: '_Tuple3', _0: 0, _1: x, _2: chroma} : ((_elm_lang$core$Native_Utils.cmp(normHue, 5) < 0) ? {ctor: '_Tuple3', _0: x, _1: 0, _2: chroma} : ((_elm_lang$core$Native_Utils.cmp(normHue, 6) < 0) ? {ctor: '_Tuple3', _0: chroma, _1: 0, _2: x} : {ctor: '_Tuple3', _0: 0, _1: 0, _2: 0}))))));
		var r = _p0._0;
		var g = _p0._1;
		var b = _p0._2;
		var m = lightness - (chroma / 2);
		return {ctor: '_Tuple3', _0: r + m, _1: g + m, _2: b + m};
	});
var _elm_lang$core$Color$toRgb = function (color) {
	var _p1 = color;
	if (_p1.ctor === 'RGBA') {
		return {red: _p1._0, green: _p1._1, blue: _p1._2, alpha: _p1._3};
	} else {
		var _p2 = A3(_elm_lang$core$Color$hslToRgb, _p1._0, _p1._1, _p1._2);
		var r = _p2._0;
		var g = _p2._1;
		var b = _p2._2;
		return {
			red: _elm_lang$core$Basics$round(255 * r),
			green: _elm_lang$core$Basics$round(255 * g),
			blue: _elm_lang$core$Basics$round(255 * b),
			alpha: _p1._3
		};
	}
};
var _elm_lang$core$Color$toHsl = function (color) {
	var _p3 = color;
	if (_p3.ctor === 'HSLA') {
		return {hue: _p3._0, saturation: _p3._1, lightness: _p3._2, alpha: _p3._3};
	} else {
		var _p4 = A3(_elm_lang$core$Color$rgbToHsl, _p3._0, _p3._1, _p3._2);
		var h = _p4._0;
		var s = _p4._1;
		var l = _p4._2;
		return {hue: h, saturation: s, lightness: l, alpha: _p3._3};
	}
};
var _elm_lang$core$Color$HSLA = F4(
	function (a, b, c, d) {
		return {ctor: 'HSLA', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_lang$core$Color$hsla = F4(
	function (hue, saturation, lightness, alpha) {
		return A4(
			_elm_lang$core$Color$HSLA,
			hue - _elm_lang$core$Basics$turns(
				_elm_lang$core$Basics$toFloat(
					_elm_lang$core$Basics$floor(hue / (2 * _elm_lang$core$Basics$pi)))),
			saturation,
			lightness,
			alpha);
	});
var _elm_lang$core$Color$hsl = F3(
	function (hue, saturation, lightness) {
		return A4(_elm_lang$core$Color$hsla, hue, saturation, lightness, 1);
	});
var _elm_lang$core$Color$complement = function (color) {
	var _p5 = color;
	if (_p5.ctor === 'HSLA') {
		return A4(
			_elm_lang$core$Color$hsla,
			_p5._0 + _elm_lang$core$Basics$degrees(180),
			_p5._1,
			_p5._2,
			_p5._3);
	} else {
		var _p6 = A3(_elm_lang$core$Color$rgbToHsl, _p5._0, _p5._1, _p5._2);
		var h = _p6._0;
		var s = _p6._1;
		var l = _p6._2;
		return A4(
			_elm_lang$core$Color$hsla,
			h + _elm_lang$core$Basics$degrees(180),
			s,
			l,
			_p5._3);
	}
};
var _elm_lang$core$Color$grayscale = function (p) {
	return A4(_elm_lang$core$Color$HSLA, 0, 0, 1 - p, 1);
};
var _elm_lang$core$Color$greyscale = function (p) {
	return A4(_elm_lang$core$Color$HSLA, 0, 0, 1 - p, 1);
};
var _elm_lang$core$Color$RGBA = F4(
	function (a, b, c, d) {
		return {ctor: 'RGBA', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_lang$core$Color$rgba = _elm_lang$core$Color$RGBA;
var _elm_lang$core$Color$rgb = F3(
	function (r, g, b) {
		return A4(_elm_lang$core$Color$RGBA, r, g, b, 1);
	});
var _elm_lang$core$Color$lightRed = A4(_elm_lang$core$Color$RGBA, 239, 41, 41, 1);
var _elm_lang$core$Color$red = A4(_elm_lang$core$Color$RGBA, 204, 0, 0, 1);
var _elm_lang$core$Color$darkRed = A4(_elm_lang$core$Color$RGBA, 164, 0, 0, 1);
var _elm_lang$core$Color$lightOrange = A4(_elm_lang$core$Color$RGBA, 252, 175, 62, 1);
var _elm_lang$core$Color$orange = A4(_elm_lang$core$Color$RGBA, 245, 121, 0, 1);
var _elm_lang$core$Color$darkOrange = A4(_elm_lang$core$Color$RGBA, 206, 92, 0, 1);
var _elm_lang$core$Color$lightYellow = A4(_elm_lang$core$Color$RGBA, 255, 233, 79, 1);
var _elm_lang$core$Color$yellow = A4(_elm_lang$core$Color$RGBA, 237, 212, 0, 1);
var _elm_lang$core$Color$darkYellow = A4(_elm_lang$core$Color$RGBA, 196, 160, 0, 1);
var _elm_lang$core$Color$lightGreen = A4(_elm_lang$core$Color$RGBA, 138, 226, 52, 1);
var _elm_lang$core$Color$green = A4(_elm_lang$core$Color$RGBA, 115, 210, 22, 1);
var _elm_lang$core$Color$darkGreen = A4(_elm_lang$core$Color$RGBA, 78, 154, 6, 1);
var _elm_lang$core$Color$lightBlue = A4(_elm_lang$core$Color$RGBA, 114, 159, 207, 1);
var _elm_lang$core$Color$blue = A4(_elm_lang$core$Color$RGBA, 52, 101, 164, 1);
var _elm_lang$core$Color$darkBlue = A4(_elm_lang$core$Color$RGBA, 32, 74, 135, 1);
var _elm_lang$core$Color$lightPurple = A4(_elm_lang$core$Color$RGBA, 173, 127, 168, 1);
var _elm_lang$core$Color$purple = A4(_elm_lang$core$Color$RGBA, 117, 80, 123, 1);
var _elm_lang$core$Color$darkPurple = A4(_elm_lang$core$Color$RGBA, 92, 53, 102, 1);
var _elm_lang$core$Color$lightBrown = A4(_elm_lang$core$Color$RGBA, 233, 185, 110, 1);
var _elm_lang$core$Color$brown = A4(_elm_lang$core$Color$RGBA, 193, 125, 17, 1);
var _elm_lang$core$Color$darkBrown = A4(_elm_lang$core$Color$RGBA, 143, 89, 2, 1);
var _elm_lang$core$Color$black = A4(_elm_lang$core$Color$RGBA, 0, 0, 0, 1);
var _elm_lang$core$Color$white = A4(_elm_lang$core$Color$RGBA, 255, 255, 255, 1);
var _elm_lang$core$Color$lightGrey = A4(_elm_lang$core$Color$RGBA, 238, 238, 236, 1);
var _elm_lang$core$Color$grey = A4(_elm_lang$core$Color$RGBA, 211, 215, 207, 1);
var _elm_lang$core$Color$darkGrey = A4(_elm_lang$core$Color$RGBA, 186, 189, 182, 1);
var _elm_lang$core$Color$lightGray = A4(_elm_lang$core$Color$RGBA, 238, 238, 236, 1);
var _elm_lang$core$Color$gray = A4(_elm_lang$core$Color$RGBA, 211, 215, 207, 1);
var _elm_lang$core$Color$darkGray = A4(_elm_lang$core$Color$RGBA, 186, 189, 182, 1);
var _elm_lang$core$Color$lightCharcoal = A4(_elm_lang$core$Color$RGBA, 136, 138, 133, 1);
var _elm_lang$core$Color$charcoal = A4(_elm_lang$core$Color$RGBA, 85, 87, 83, 1);
var _elm_lang$core$Color$darkCharcoal = A4(_elm_lang$core$Color$RGBA, 46, 52, 54, 1);
var _elm_lang$core$Color$Radial = F5(
	function (a, b, c, d, e) {
		return {ctor: 'Radial', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Color$radial = _elm_lang$core$Color$Radial;
var _elm_lang$core$Color$Linear = F3(
	function (a, b, c) {
		return {ctor: 'Linear', _0: a, _1: b, _2: c};
	});
var _elm_lang$core$Color$linear = _elm_lang$core$Color$Linear;

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

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

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
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
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
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
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
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
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {

function escape(str)
{
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function caseInsensitive(re)
{
	return new RegExp(re.source, 'gi');
}
function regex(raw)
{
	return new RegExp(raw, 'g');
}

function contains(re, string)
{
	return string.match(re) !== null;
}

function find(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex === re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		out.push({
			match: result[0],
			submatches: _elm_lang$core$Native_List.fromArray(subs),
			index: result.index,
			number: number
		});
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

function replace(n, re, replacer, string)
{
	n = n.ctor === 'All' ? Infinity : n._0;
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
			submatches[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		return replacer({
			match: match,
			submatches: _elm_lang$core$Native_List.fromArray(submatches),
			index: arguments[arguments.length - 2],
			number: count
		});
	}
	return string.replace(re, jsReplacer);
}

function split(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	if (n === Infinity)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(re));
	}
	var string = str;
	var result;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		if (!(result = re.exec(string))) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function (a, b, c, d) {
		return {match: a, submatches: b, index: c, number: d};
	});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function (a) {
	return {ctor: 'AtMost', _0: a};
};
var _elm_lang$core$Regex$All = {ctor: 'All'};

var _elm_lang$core$Set$foldr = F3(
	function (f, b, _p0) {
		var _p1 = _p0;
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (k, _p2, b) {
					return A2(f, k, b);
				}),
			b,
			_p1._0);
	});
var _elm_lang$core$Set$foldl = F3(
	function (f, b, _p3) {
		var _p4 = _p3;
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, _p5, b) {
					return A2(f, k, b);
				}),
			b,
			_p4._0);
	});
var _elm_lang$core$Set$toList = function (_p6) {
	var _p7 = _p6;
	return _elm_lang$core$Dict$keys(_p7._0);
};
var _elm_lang$core$Set$size = function (_p8) {
	var _p9 = _p8;
	return _elm_lang$core$Dict$size(_p9._0);
};
var _elm_lang$core$Set$member = F2(
	function (k, _p10) {
		var _p11 = _p10;
		return A2(_elm_lang$core$Dict$member, k, _p11._0);
	});
var _elm_lang$core$Set$isEmpty = function (_p12) {
	var _p13 = _p12;
	return _elm_lang$core$Dict$isEmpty(_p13._0);
};
var _elm_lang$core$Set$Set_elm_builtin = function (a) {
	return {ctor: 'Set_elm_builtin', _0: a};
};
var _elm_lang$core$Set$empty = _elm_lang$core$Set$Set_elm_builtin(_elm_lang$core$Dict$empty);
var _elm_lang$core$Set$singleton = function (k) {
	return _elm_lang$core$Set$Set_elm_builtin(
		A2(
			_elm_lang$core$Dict$singleton,
			k,
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Set$insert = F2(
	function (k, _p14) {
		var _p15 = _p14;
		return _elm_lang$core$Set$Set_elm_builtin(
			A3(
				_elm_lang$core$Dict$insert,
				k,
				{ctor: '_Tuple0'},
				_p15._0));
	});
var _elm_lang$core$Set$fromList = function (xs) {
	return A3(_elm_lang$core$List$foldl, _elm_lang$core$Set$insert, _elm_lang$core$Set$empty, xs);
};
var _elm_lang$core$Set$map = F2(
	function (f, s) {
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$map,
				f,
				_elm_lang$core$Set$toList(s)));
	});
var _elm_lang$core$Set$remove = F2(
	function (k, _p16) {
		var _p17 = _p16;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$remove, k, _p17._0));
	});
var _elm_lang$core$Set$union = F2(
	function (_p19, _p18) {
		var _p20 = _p19;
		var _p21 = _p18;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$union, _p20._0, _p21._0));
	});
var _elm_lang$core$Set$intersect = F2(
	function (_p23, _p22) {
		var _p24 = _p23;
		var _p25 = _p22;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$intersect, _p24._0, _p25._0));
	});
var _elm_lang$core$Set$diff = F2(
	function (_p27, _p26) {
		var _p28 = _p27;
		var _p29 = _p26;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$diff, _p28._0, _p29._0));
	});
var _elm_lang$core$Set$filter = F2(
	function (p, _p30) {
		var _p31 = _p30;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(
				_elm_lang$core$Dict$filter,
				F2(
					function (k, _p32) {
						return p(k);
					}),
				_p31._0));
	});
var _elm_lang$core$Set$partition = F2(
	function (p, _p33) {
		var _p34 = _p33;
		var _p35 = A2(
			_elm_lang$core$Dict$partition,
			F2(
				function (k, _p36) {
					return p(k);
				}),
			_p34._0);
		var p1 = _p35._0;
		var p2 = _p35._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Set$Set_elm_builtin(p1),
			_1: _elm_lang$core$Set$Set_elm_builtin(p2)
		};
	});

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
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
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
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


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _elm_lang$svg$Svg$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$svg$Svg$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$svg$Svg$svgNamespace = A2(
	_elm_lang$virtual_dom$VirtualDom$property,
	'namespace',
	_elm_lang$core$Json_Encode$string('http://www.w3.org/2000/svg'));
var _elm_lang$svg$Svg$node = F3(
	function (name, attributes, children) {
		return A3(
			_elm_lang$virtual_dom$VirtualDom$node,
			name,
			{ctor: '::', _0: _elm_lang$svg$Svg$svgNamespace, _1: attributes},
			children);
	});
var _elm_lang$svg$Svg$svg = _elm_lang$svg$Svg$node('svg');
var _elm_lang$svg$Svg$foreignObject = _elm_lang$svg$Svg$node('foreignObject');
var _elm_lang$svg$Svg$animate = _elm_lang$svg$Svg$node('animate');
var _elm_lang$svg$Svg$animateColor = _elm_lang$svg$Svg$node('animateColor');
var _elm_lang$svg$Svg$animateMotion = _elm_lang$svg$Svg$node('animateMotion');
var _elm_lang$svg$Svg$animateTransform = _elm_lang$svg$Svg$node('animateTransform');
var _elm_lang$svg$Svg$mpath = _elm_lang$svg$Svg$node('mpath');
var _elm_lang$svg$Svg$set = _elm_lang$svg$Svg$node('set');
var _elm_lang$svg$Svg$a = _elm_lang$svg$Svg$node('a');
var _elm_lang$svg$Svg$defs = _elm_lang$svg$Svg$node('defs');
var _elm_lang$svg$Svg$g = _elm_lang$svg$Svg$node('g');
var _elm_lang$svg$Svg$marker = _elm_lang$svg$Svg$node('marker');
var _elm_lang$svg$Svg$mask = _elm_lang$svg$Svg$node('mask');
var _elm_lang$svg$Svg$pattern = _elm_lang$svg$Svg$node('pattern');
var _elm_lang$svg$Svg$switch = _elm_lang$svg$Svg$node('switch');
var _elm_lang$svg$Svg$symbol = _elm_lang$svg$Svg$node('symbol');
var _elm_lang$svg$Svg$desc = _elm_lang$svg$Svg$node('desc');
var _elm_lang$svg$Svg$metadata = _elm_lang$svg$Svg$node('metadata');
var _elm_lang$svg$Svg$title = _elm_lang$svg$Svg$node('title');
var _elm_lang$svg$Svg$feBlend = _elm_lang$svg$Svg$node('feBlend');
var _elm_lang$svg$Svg$feColorMatrix = _elm_lang$svg$Svg$node('feColorMatrix');
var _elm_lang$svg$Svg$feComponentTransfer = _elm_lang$svg$Svg$node('feComponentTransfer');
var _elm_lang$svg$Svg$feComposite = _elm_lang$svg$Svg$node('feComposite');
var _elm_lang$svg$Svg$feConvolveMatrix = _elm_lang$svg$Svg$node('feConvolveMatrix');
var _elm_lang$svg$Svg$feDiffuseLighting = _elm_lang$svg$Svg$node('feDiffuseLighting');
var _elm_lang$svg$Svg$feDisplacementMap = _elm_lang$svg$Svg$node('feDisplacementMap');
var _elm_lang$svg$Svg$feFlood = _elm_lang$svg$Svg$node('feFlood');
var _elm_lang$svg$Svg$feFuncA = _elm_lang$svg$Svg$node('feFuncA');
var _elm_lang$svg$Svg$feFuncB = _elm_lang$svg$Svg$node('feFuncB');
var _elm_lang$svg$Svg$feFuncG = _elm_lang$svg$Svg$node('feFuncG');
var _elm_lang$svg$Svg$feFuncR = _elm_lang$svg$Svg$node('feFuncR');
var _elm_lang$svg$Svg$feGaussianBlur = _elm_lang$svg$Svg$node('feGaussianBlur');
var _elm_lang$svg$Svg$feImage = _elm_lang$svg$Svg$node('feImage');
var _elm_lang$svg$Svg$feMerge = _elm_lang$svg$Svg$node('feMerge');
var _elm_lang$svg$Svg$feMergeNode = _elm_lang$svg$Svg$node('feMergeNode');
var _elm_lang$svg$Svg$feMorphology = _elm_lang$svg$Svg$node('feMorphology');
var _elm_lang$svg$Svg$feOffset = _elm_lang$svg$Svg$node('feOffset');
var _elm_lang$svg$Svg$feSpecularLighting = _elm_lang$svg$Svg$node('feSpecularLighting');
var _elm_lang$svg$Svg$feTile = _elm_lang$svg$Svg$node('feTile');
var _elm_lang$svg$Svg$feTurbulence = _elm_lang$svg$Svg$node('feTurbulence');
var _elm_lang$svg$Svg$font = _elm_lang$svg$Svg$node('font');
var _elm_lang$svg$Svg$linearGradient = _elm_lang$svg$Svg$node('linearGradient');
var _elm_lang$svg$Svg$radialGradient = _elm_lang$svg$Svg$node('radialGradient');
var _elm_lang$svg$Svg$stop = _elm_lang$svg$Svg$node('stop');
var _elm_lang$svg$Svg$circle = _elm_lang$svg$Svg$node('circle');
var _elm_lang$svg$Svg$ellipse = _elm_lang$svg$Svg$node('ellipse');
var _elm_lang$svg$Svg$image = _elm_lang$svg$Svg$node('image');
var _elm_lang$svg$Svg$line = _elm_lang$svg$Svg$node('line');
var _elm_lang$svg$Svg$path = _elm_lang$svg$Svg$node('path');
var _elm_lang$svg$Svg$polygon = _elm_lang$svg$Svg$node('polygon');
var _elm_lang$svg$Svg$polyline = _elm_lang$svg$Svg$node('polyline');
var _elm_lang$svg$Svg$rect = _elm_lang$svg$Svg$node('rect');
var _elm_lang$svg$Svg$use = _elm_lang$svg$Svg$node('use');
var _elm_lang$svg$Svg$feDistantLight = _elm_lang$svg$Svg$node('feDistantLight');
var _elm_lang$svg$Svg$fePointLight = _elm_lang$svg$Svg$node('fePointLight');
var _elm_lang$svg$Svg$feSpotLight = _elm_lang$svg$Svg$node('feSpotLight');
var _elm_lang$svg$Svg$altGlyph = _elm_lang$svg$Svg$node('altGlyph');
var _elm_lang$svg$Svg$altGlyphDef = _elm_lang$svg$Svg$node('altGlyphDef');
var _elm_lang$svg$Svg$altGlyphItem = _elm_lang$svg$Svg$node('altGlyphItem');
var _elm_lang$svg$Svg$glyph = _elm_lang$svg$Svg$node('glyph');
var _elm_lang$svg$Svg$glyphRef = _elm_lang$svg$Svg$node('glyphRef');
var _elm_lang$svg$Svg$textPath = _elm_lang$svg$Svg$node('textPath');
var _elm_lang$svg$Svg$text_ = _elm_lang$svg$Svg$node('text');
var _elm_lang$svg$Svg$tref = _elm_lang$svg$Svg$node('tref');
var _elm_lang$svg$Svg$tspan = _elm_lang$svg$Svg$node('tspan');
var _elm_lang$svg$Svg$clipPath = _elm_lang$svg$Svg$node('clipPath');
var _elm_lang$svg$Svg$colorProfile = _elm_lang$svg$Svg$node('colorProfile');
var _elm_lang$svg$Svg$cursor = _elm_lang$svg$Svg$node('cursor');
var _elm_lang$svg$Svg$filter = _elm_lang$svg$Svg$node('filter');
var _elm_lang$svg$Svg$script = _elm_lang$svg$Svg$node('script');
var _elm_lang$svg$Svg$style = _elm_lang$svg$Svg$node('style');
var _elm_lang$svg$Svg$view = _elm_lang$svg$Svg$node('view');

var _elm_lang$svg$Svg_Attributes$writingMode = _elm_lang$virtual_dom$VirtualDom$attribute('writing-mode');
var _elm_lang$svg$Svg_Attributes$wordSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('word-spacing');
var _elm_lang$svg$Svg_Attributes$visibility = _elm_lang$virtual_dom$VirtualDom$attribute('visibility');
var _elm_lang$svg$Svg_Attributes$unicodeBidi = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-bidi');
var _elm_lang$svg$Svg_Attributes$textRendering = _elm_lang$virtual_dom$VirtualDom$attribute('text-rendering');
var _elm_lang$svg$Svg_Attributes$textDecoration = _elm_lang$virtual_dom$VirtualDom$attribute('text-decoration');
var _elm_lang$svg$Svg_Attributes$textAnchor = _elm_lang$virtual_dom$VirtualDom$attribute('text-anchor');
var _elm_lang$svg$Svg_Attributes$stroke = _elm_lang$virtual_dom$VirtualDom$attribute('stroke');
var _elm_lang$svg$Svg_Attributes$strokeWidth = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-width');
var _elm_lang$svg$Svg_Attributes$strokeOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-opacity');
var _elm_lang$svg$Svg_Attributes$strokeMiterlimit = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-miterlimit');
var _elm_lang$svg$Svg_Attributes$strokeLinejoin = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linejoin');
var _elm_lang$svg$Svg_Attributes$strokeLinecap = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linecap');
var _elm_lang$svg$Svg_Attributes$strokeDashoffset = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dashoffset');
var _elm_lang$svg$Svg_Attributes$strokeDasharray = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dasharray');
var _elm_lang$svg$Svg_Attributes$stopOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stop-opacity');
var _elm_lang$svg$Svg_Attributes$stopColor = _elm_lang$virtual_dom$VirtualDom$attribute('stop-color');
var _elm_lang$svg$Svg_Attributes$shapeRendering = _elm_lang$virtual_dom$VirtualDom$attribute('shape-rendering');
var _elm_lang$svg$Svg_Attributes$pointerEvents = _elm_lang$virtual_dom$VirtualDom$attribute('pointer-events');
var _elm_lang$svg$Svg_Attributes$overflow = _elm_lang$virtual_dom$VirtualDom$attribute('overflow');
var _elm_lang$svg$Svg_Attributes$opacity = _elm_lang$virtual_dom$VirtualDom$attribute('opacity');
var _elm_lang$svg$Svg_Attributes$mask = _elm_lang$virtual_dom$VirtualDom$attribute('mask');
var _elm_lang$svg$Svg_Attributes$markerStart = _elm_lang$virtual_dom$VirtualDom$attribute('marker-start');
var _elm_lang$svg$Svg_Attributes$markerMid = _elm_lang$virtual_dom$VirtualDom$attribute('marker-mid');
var _elm_lang$svg$Svg_Attributes$markerEnd = _elm_lang$virtual_dom$VirtualDom$attribute('marker-end');
var _elm_lang$svg$Svg_Attributes$lightingColor = _elm_lang$virtual_dom$VirtualDom$attribute('lighting-color');
var _elm_lang$svg$Svg_Attributes$letterSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('letter-spacing');
var _elm_lang$svg$Svg_Attributes$kerning = _elm_lang$virtual_dom$VirtualDom$attribute('kerning');
var _elm_lang$svg$Svg_Attributes$imageRendering = _elm_lang$virtual_dom$VirtualDom$attribute('image-rendering');
var _elm_lang$svg$Svg_Attributes$glyphOrientationVertical = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-vertical');
var _elm_lang$svg$Svg_Attributes$glyphOrientationHorizontal = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-horizontal');
var _elm_lang$svg$Svg_Attributes$fontWeight = _elm_lang$virtual_dom$VirtualDom$attribute('font-weight');
var _elm_lang$svg$Svg_Attributes$fontVariant = _elm_lang$virtual_dom$VirtualDom$attribute('font-variant');
var _elm_lang$svg$Svg_Attributes$fontStyle = _elm_lang$virtual_dom$VirtualDom$attribute('font-style');
var _elm_lang$svg$Svg_Attributes$fontStretch = _elm_lang$virtual_dom$VirtualDom$attribute('font-stretch');
var _elm_lang$svg$Svg_Attributes$fontSize = _elm_lang$virtual_dom$VirtualDom$attribute('font-size');
var _elm_lang$svg$Svg_Attributes$fontSizeAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('font-size-adjust');
var _elm_lang$svg$Svg_Attributes$fontFamily = _elm_lang$virtual_dom$VirtualDom$attribute('font-family');
var _elm_lang$svg$Svg_Attributes$floodOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('flood-opacity');
var _elm_lang$svg$Svg_Attributes$floodColor = _elm_lang$virtual_dom$VirtualDom$attribute('flood-color');
var _elm_lang$svg$Svg_Attributes$filter = _elm_lang$virtual_dom$VirtualDom$attribute('filter');
var _elm_lang$svg$Svg_Attributes$fill = _elm_lang$virtual_dom$VirtualDom$attribute('fill');
var _elm_lang$svg$Svg_Attributes$fillRule = _elm_lang$virtual_dom$VirtualDom$attribute('fill-rule');
var _elm_lang$svg$Svg_Attributes$fillOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('fill-opacity');
var _elm_lang$svg$Svg_Attributes$enableBackground = _elm_lang$virtual_dom$VirtualDom$attribute('enable-background');
var _elm_lang$svg$Svg_Attributes$dominantBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('dominant-baseline');
var _elm_lang$svg$Svg_Attributes$display = _elm_lang$virtual_dom$VirtualDom$attribute('display');
var _elm_lang$svg$Svg_Attributes$direction = _elm_lang$virtual_dom$VirtualDom$attribute('direction');
var _elm_lang$svg$Svg_Attributes$cursor = _elm_lang$virtual_dom$VirtualDom$attribute('cursor');
var _elm_lang$svg$Svg_Attributes$color = _elm_lang$virtual_dom$VirtualDom$attribute('color');
var _elm_lang$svg$Svg_Attributes$colorRendering = _elm_lang$virtual_dom$VirtualDom$attribute('color-rendering');
var _elm_lang$svg$Svg_Attributes$colorProfile = _elm_lang$virtual_dom$VirtualDom$attribute('color-profile');
var _elm_lang$svg$Svg_Attributes$colorInterpolation = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation');
var _elm_lang$svg$Svg_Attributes$colorInterpolationFilters = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation-filters');
var _elm_lang$svg$Svg_Attributes$clip = _elm_lang$virtual_dom$VirtualDom$attribute('clip');
var _elm_lang$svg$Svg_Attributes$clipRule = _elm_lang$virtual_dom$VirtualDom$attribute('clip-rule');
var _elm_lang$svg$Svg_Attributes$clipPath = _elm_lang$virtual_dom$VirtualDom$attribute('clip-path');
var _elm_lang$svg$Svg_Attributes$baselineShift = _elm_lang$virtual_dom$VirtualDom$attribute('baseline-shift');
var _elm_lang$svg$Svg_Attributes$alignmentBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('alignment-baseline');
var _elm_lang$svg$Svg_Attributes$zoomAndPan = _elm_lang$virtual_dom$VirtualDom$attribute('zoomAndPan');
var _elm_lang$svg$Svg_Attributes$z = _elm_lang$virtual_dom$VirtualDom$attribute('z');
var _elm_lang$svg$Svg_Attributes$yChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('yChannelSelector');
var _elm_lang$svg$Svg_Attributes$y2 = _elm_lang$virtual_dom$VirtualDom$attribute('y2');
var _elm_lang$svg$Svg_Attributes$y1 = _elm_lang$virtual_dom$VirtualDom$attribute('y1');
var _elm_lang$svg$Svg_Attributes$y = _elm_lang$virtual_dom$VirtualDom$attribute('y');
var _elm_lang$svg$Svg_Attributes$xmlSpace = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var _elm_lang$svg$Svg_Attributes$xmlLang = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:lang');
var _elm_lang$svg$Svg_Attributes$xmlBase = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:base');
var _elm_lang$svg$Svg_Attributes$xlinkType = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:type');
var _elm_lang$svg$Svg_Attributes$xlinkTitle = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:title');
var _elm_lang$svg$Svg_Attributes$xlinkShow = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:show');
var _elm_lang$svg$Svg_Attributes$xlinkRole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:role');
var _elm_lang$svg$Svg_Attributes$xlinkHref = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:href');
var _elm_lang$svg$Svg_Attributes$xlinkArcrole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:arcrole');
var _elm_lang$svg$Svg_Attributes$xlinkActuate = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:actuate');
var _elm_lang$svg$Svg_Attributes$xChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('xChannelSelector');
var _elm_lang$svg$Svg_Attributes$x2 = _elm_lang$virtual_dom$VirtualDom$attribute('x2');
var _elm_lang$svg$Svg_Attributes$x1 = _elm_lang$virtual_dom$VirtualDom$attribute('x1');
var _elm_lang$svg$Svg_Attributes$xHeight = _elm_lang$virtual_dom$VirtualDom$attribute('x-height');
var _elm_lang$svg$Svg_Attributes$x = _elm_lang$virtual_dom$VirtualDom$attribute('x');
var _elm_lang$svg$Svg_Attributes$widths = _elm_lang$virtual_dom$VirtualDom$attribute('widths');
var _elm_lang$svg$Svg_Attributes$width = _elm_lang$virtual_dom$VirtualDom$attribute('width');
var _elm_lang$svg$Svg_Attributes$viewTarget = _elm_lang$virtual_dom$VirtualDom$attribute('viewTarget');
var _elm_lang$svg$Svg_Attributes$viewBox = _elm_lang$virtual_dom$VirtualDom$attribute('viewBox');
var _elm_lang$svg$Svg_Attributes$vertOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-y');
var _elm_lang$svg$Svg_Attributes$vertOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-x');
var _elm_lang$svg$Svg_Attributes$vertAdvY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-adv-y');
var _elm_lang$svg$Svg_Attributes$version = _elm_lang$virtual_dom$VirtualDom$attribute('version');
var _elm_lang$svg$Svg_Attributes$values = _elm_lang$virtual_dom$VirtualDom$attribute('values');
var _elm_lang$svg$Svg_Attributes$vMathematical = _elm_lang$virtual_dom$VirtualDom$attribute('v-mathematical');
var _elm_lang$svg$Svg_Attributes$vIdeographic = _elm_lang$virtual_dom$VirtualDom$attribute('v-ideographic');
var _elm_lang$svg$Svg_Attributes$vHanging = _elm_lang$virtual_dom$VirtualDom$attribute('v-hanging');
var _elm_lang$svg$Svg_Attributes$vAlphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('v-alphabetic');
var _elm_lang$svg$Svg_Attributes$unitsPerEm = _elm_lang$virtual_dom$VirtualDom$attribute('units-per-em');
var _elm_lang$svg$Svg_Attributes$unicodeRange = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-range');
var _elm_lang$svg$Svg_Attributes$unicode = _elm_lang$virtual_dom$VirtualDom$attribute('unicode');
var _elm_lang$svg$Svg_Attributes$underlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('underline-thickness');
var _elm_lang$svg$Svg_Attributes$underlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('underline-position');
var _elm_lang$svg$Svg_Attributes$u2 = _elm_lang$virtual_dom$VirtualDom$attribute('u2');
var _elm_lang$svg$Svg_Attributes$u1 = _elm_lang$virtual_dom$VirtualDom$attribute('u1');
var _elm_lang$svg$Svg_Attributes$type_ = _elm_lang$virtual_dom$VirtualDom$attribute('type');
var _elm_lang$svg$Svg_Attributes$transform = _elm_lang$virtual_dom$VirtualDom$attribute('transform');
var _elm_lang$svg$Svg_Attributes$to = _elm_lang$virtual_dom$VirtualDom$attribute('to');
var _elm_lang$svg$Svg_Attributes$title = _elm_lang$virtual_dom$VirtualDom$attribute('title');
var _elm_lang$svg$Svg_Attributes$textLength = _elm_lang$virtual_dom$VirtualDom$attribute('textLength');
var _elm_lang$svg$Svg_Attributes$targetY = _elm_lang$virtual_dom$VirtualDom$attribute('targetY');
var _elm_lang$svg$Svg_Attributes$targetX = _elm_lang$virtual_dom$VirtualDom$attribute('targetX');
var _elm_lang$svg$Svg_Attributes$target = _elm_lang$virtual_dom$VirtualDom$attribute('target');
var _elm_lang$svg$Svg_Attributes$tableValues = _elm_lang$virtual_dom$VirtualDom$attribute('tableValues');
var _elm_lang$svg$Svg_Attributes$systemLanguage = _elm_lang$virtual_dom$VirtualDom$attribute('systemLanguage');
var _elm_lang$svg$Svg_Attributes$surfaceScale = _elm_lang$virtual_dom$VirtualDom$attribute('surfaceScale');
var _elm_lang$svg$Svg_Attributes$style = _elm_lang$virtual_dom$VirtualDom$attribute('style');
var _elm_lang$svg$Svg_Attributes$string = _elm_lang$virtual_dom$VirtualDom$attribute('string');
var _elm_lang$svg$Svg_Attributes$strikethroughThickness = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-thickness');
var _elm_lang$svg$Svg_Attributes$strikethroughPosition = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-position');
var _elm_lang$svg$Svg_Attributes$stitchTiles = _elm_lang$virtual_dom$VirtualDom$attribute('stitchTiles');
var _elm_lang$svg$Svg_Attributes$stemv = _elm_lang$virtual_dom$VirtualDom$attribute('stemv');
var _elm_lang$svg$Svg_Attributes$stemh = _elm_lang$virtual_dom$VirtualDom$attribute('stemh');
var _elm_lang$svg$Svg_Attributes$stdDeviation = _elm_lang$virtual_dom$VirtualDom$attribute('stdDeviation');
var _elm_lang$svg$Svg_Attributes$startOffset = _elm_lang$virtual_dom$VirtualDom$attribute('startOffset');
var _elm_lang$svg$Svg_Attributes$spreadMethod = _elm_lang$virtual_dom$VirtualDom$attribute('spreadMethod');
var _elm_lang$svg$Svg_Attributes$speed = _elm_lang$virtual_dom$VirtualDom$attribute('speed');
var _elm_lang$svg$Svg_Attributes$specularExponent = _elm_lang$virtual_dom$VirtualDom$attribute('specularExponent');
var _elm_lang$svg$Svg_Attributes$specularConstant = _elm_lang$virtual_dom$VirtualDom$attribute('specularConstant');
var _elm_lang$svg$Svg_Attributes$spacing = _elm_lang$virtual_dom$VirtualDom$attribute('spacing');
var _elm_lang$svg$Svg_Attributes$slope = _elm_lang$virtual_dom$VirtualDom$attribute('slope');
var _elm_lang$svg$Svg_Attributes$seed = _elm_lang$virtual_dom$VirtualDom$attribute('seed');
var _elm_lang$svg$Svg_Attributes$scale = _elm_lang$virtual_dom$VirtualDom$attribute('scale');
var _elm_lang$svg$Svg_Attributes$ry = _elm_lang$virtual_dom$VirtualDom$attribute('ry');
var _elm_lang$svg$Svg_Attributes$rx = _elm_lang$virtual_dom$VirtualDom$attribute('rx');
var _elm_lang$svg$Svg_Attributes$rotate = _elm_lang$virtual_dom$VirtualDom$attribute('rotate');
var _elm_lang$svg$Svg_Attributes$result = _elm_lang$virtual_dom$VirtualDom$attribute('result');
var _elm_lang$svg$Svg_Attributes$restart = _elm_lang$virtual_dom$VirtualDom$attribute('restart');
var _elm_lang$svg$Svg_Attributes$requiredFeatures = _elm_lang$virtual_dom$VirtualDom$attribute('requiredFeatures');
var _elm_lang$svg$Svg_Attributes$requiredExtensions = _elm_lang$virtual_dom$VirtualDom$attribute('requiredExtensions');
var _elm_lang$svg$Svg_Attributes$repeatDur = _elm_lang$virtual_dom$VirtualDom$attribute('repeatDur');
var _elm_lang$svg$Svg_Attributes$repeatCount = _elm_lang$virtual_dom$VirtualDom$attribute('repeatCount');
var _elm_lang$svg$Svg_Attributes$renderingIntent = _elm_lang$virtual_dom$VirtualDom$attribute('rendering-intent');
var _elm_lang$svg$Svg_Attributes$refY = _elm_lang$virtual_dom$VirtualDom$attribute('refY');
var _elm_lang$svg$Svg_Attributes$refX = _elm_lang$virtual_dom$VirtualDom$attribute('refX');
var _elm_lang$svg$Svg_Attributes$radius = _elm_lang$virtual_dom$VirtualDom$attribute('radius');
var _elm_lang$svg$Svg_Attributes$r = _elm_lang$virtual_dom$VirtualDom$attribute('r');
var _elm_lang$svg$Svg_Attributes$primitiveUnits = _elm_lang$virtual_dom$VirtualDom$attribute('primitiveUnits');
var _elm_lang$svg$Svg_Attributes$preserveAspectRatio = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAspectRatio');
var _elm_lang$svg$Svg_Attributes$preserveAlpha = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAlpha');
var _elm_lang$svg$Svg_Attributes$pointsAtZ = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtZ');
var _elm_lang$svg$Svg_Attributes$pointsAtY = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtY');
var _elm_lang$svg$Svg_Attributes$pointsAtX = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtX');
var _elm_lang$svg$Svg_Attributes$points = _elm_lang$virtual_dom$VirtualDom$attribute('points');
var _elm_lang$svg$Svg_Attributes$pointOrder = _elm_lang$virtual_dom$VirtualDom$attribute('point-order');
var _elm_lang$svg$Svg_Attributes$patternUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternUnits');
var _elm_lang$svg$Svg_Attributes$patternTransform = _elm_lang$virtual_dom$VirtualDom$attribute('patternTransform');
var _elm_lang$svg$Svg_Attributes$patternContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternContentUnits');
var _elm_lang$svg$Svg_Attributes$pathLength = _elm_lang$virtual_dom$VirtualDom$attribute('pathLength');
var _elm_lang$svg$Svg_Attributes$path = _elm_lang$virtual_dom$VirtualDom$attribute('path');
var _elm_lang$svg$Svg_Attributes$panose1 = _elm_lang$virtual_dom$VirtualDom$attribute('panose-1');
var _elm_lang$svg$Svg_Attributes$overlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('overline-thickness');
var _elm_lang$svg$Svg_Attributes$overlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('overline-position');
var _elm_lang$svg$Svg_Attributes$origin = _elm_lang$virtual_dom$VirtualDom$attribute('origin');
var _elm_lang$svg$Svg_Attributes$orientation = _elm_lang$virtual_dom$VirtualDom$attribute('orientation');
var _elm_lang$svg$Svg_Attributes$orient = _elm_lang$virtual_dom$VirtualDom$attribute('orient');
var _elm_lang$svg$Svg_Attributes$order = _elm_lang$virtual_dom$VirtualDom$attribute('order');
var _elm_lang$svg$Svg_Attributes$operator = _elm_lang$virtual_dom$VirtualDom$attribute('operator');
var _elm_lang$svg$Svg_Attributes$offset = _elm_lang$virtual_dom$VirtualDom$attribute('offset');
var _elm_lang$svg$Svg_Attributes$numOctaves = _elm_lang$virtual_dom$VirtualDom$attribute('numOctaves');
var _elm_lang$svg$Svg_Attributes$name = _elm_lang$virtual_dom$VirtualDom$attribute('name');
var _elm_lang$svg$Svg_Attributes$mode = _elm_lang$virtual_dom$VirtualDom$attribute('mode');
var _elm_lang$svg$Svg_Attributes$min = _elm_lang$virtual_dom$VirtualDom$attribute('min');
var _elm_lang$svg$Svg_Attributes$method = _elm_lang$virtual_dom$VirtualDom$attribute('method');
var _elm_lang$svg$Svg_Attributes$media = _elm_lang$virtual_dom$VirtualDom$attribute('media');
var _elm_lang$svg$Svg_Attributes$max = _elm_lang$virtual_dom$VirtualDom$attribute('max');
var _elm_lang$svg$Svg_Attributes$mathematical = _elm_lang$virtual_dom$VirtualDom$attribute('mathematical');
var _elm_lang$svg$Svg_Attributes$maskUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskUnits');
var _elm_lang$svg$Svg_Attributes$maskContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskContentUnits');
var _elm_lang$svg$Svg_Attributes$markerWidth = _elm_lang$virtual_dom$VirtualDom$attribute('markerWidth');
var _elm_lang$svg$Svg_Attributes$markerUnits = _elm_lang$virtual_dom$VirtualDom$attribute('markerUnits');
var _elm_lang$svg$Svg_Attributes$markerHeight = _elm_lang$virtual_dom$VirtualDom$attribute('markerHeight');
var _elm_lang$svg$Svg_Attributes$local = _elm_lang$virtual_dom$VirtualDom$attribute('local');
var _elm_lang$svg$Svg_Attributes$limitingConeAngle = _elm_lang$virtual_dom$VirtualDom$attribute('limitingConeAngle');
var _elm_lang$svg$Svg_Attributes$lengthAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('lengthAdjust');
var _elm_lang$svg$Svg_Attributes$lang = _elm_lang$virtual_dom$VirtualDom$attribute('lang');
var _elm_lang$svg$Svg_Attributes$keyTimes = _elm_lang$virtual_dom$VirtualDom$attribute('keyTimes');
var _elm_lang$svg$Svg_Attributes$keySplines = _elm_lang$virtual_dom$VirtualDom$attribute('keySplines');
var _elm_lang$svg$Svg_Attributes$keyPoints = _elm_lang$virtual_dom$VirtualDom$attribute('keyPoints');
var _elm_lang$svg$Svg_Attributes$kernelUnitLength = _elm_lang$virtual_dom$VirtualDom$attribute('kernelUnitLength');
var _elm_lang$svg$Svg_Attributes$kernelMatrix = _elm_lang$virtual_dom$VirtualDom$attribute('kernelMatrix');
var _elm_lang$svg$Svg_Attributes$k4 = _elm_lang$virtual_dom$VirtualDom$attribute('k4');
var _elm_lang$svg$Svg_Attributes$k3 = _elm_lang$virtual_dom$VirtualDom$attribute('k3');
var _elm_lang$svg$Svg_Attributes$k2 = _elm_lang$virtual_dom$VirtualDom$attribute('k2');
var _elm_lang$svg$Svg_Attributes$k1 = _elm_lang$virtual_dom$VirtualDom$attribute('k1');
var _elm_lang$svg$Svg_Attributes$k = _elm_lang$virtual_dom$VirtualDom$attribute('k');
var _elm_lang$svg$Svg_Attributes$intercept = _elm_lang$virtual_dom$VirtualDom$attribute('intercept');
var _elm_lang$svg$Svg_Attributes$in2 = _elm_lang$virtual_dom$VirtualDom$attribute('in2');
var _elm_lang$svg$Svg_Attributes$in_ = _elm_lang$virtual_dom$VirtualDom$attribute('in');
var _elm_lang$svg$Svg_Attributes$ideographic = _elm_lang$virtual_dom$VirtualDom$attribute('ideographic');
var _elm_lang$svg$Svg_Attributes$id = _elm_lang$virtual_dom$VirtualDom$attribute('id');
var _elm_lang$svg$Svg_Attributes$horizOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-y');
var _elm_lang$svg$Svg_Attributes$horizOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-x');
var _elm_lang$svg$Svg_Attributes$horizAdvX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-adv-x');
var _elm_lang$svg$Svg_Attributes$height = _elm_lang$virtual_dom$VirtualDom$attribute('height');
var _elm_lang$svg$Svg_Attributes$hanging = _elm_lang$virtual_dom$VirtualDom$attribute('hanging');
var _elm_lang$svg$Svg_Attributes$gradientUnits = _elm_lang$virtual_dom$VirtualDom$attribute('gradientUnits');
var _elm_lang$svg$Svg_Attributes$gradientTransform = _elm_lang$virtual_dom$VirtualDom$attribute('gradientTransform');
var _elm_lang$svg$Svg_Attributes$glyphRef = _elm_lang$virtual_dom$VirtualDom$attribute('glyphRef');
var _elm_lang$svg$Svg_Attributes$glyphName = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-name');
var _elm_lang$svg$Svg_Attributes$g2 = _elm_lang$virtual_dom$VirtualDom$attribute('g2');
var _elm_lang$svg$Svg_Attributes$g1 = _elm_lang$virtual_dom$VirtualDom$attribute('g1');
var _elm_lang$svg$Svg_Attributes$fy = _elm_lang$virtual_dom$VirtualDom$attribute('fy');
var _elm_lang$svg$Svg_Attributes$fx = _elm_lang$virtual_dom$VirtualDom$attribute('fx');
var _elm_lang$svg$Svg_Attributes$from = _elm_lang$virtual_dom$VirtualDom$attribute('from');
var _elm_lang$svg$Svg_Attributes$format = _elm_lang$virtual_dom$VirtualDom$attribute('format');
var _elm_lang$svg$Svg_Attributes$filterUnits = _elm_lang$virtual_dom$VirtualDom$attribute('filterUnits');
var _elm_lang$svg$Svg_Attributes$filterRes = _elm_lang$virtual_dom$VirtualDom$attribute('filterRes');
var _elm_lang$svg$Svg_Attributes$externalResourcesRequired = _elm_lang$virtual_dom$VirtualDom$attribute('externalResourcesRequired');
var _elm_lang$svg$Svg_Attributes$exponent = _elm_lang$virtual_dom$VirtualDom$attribute('exponent');
var _elm_lang$svg$Svg_Attributes$end = _elm_lang$virtual_dom$VirtualDom$attribute('end');
var _elm_lang$svg$Svg_Attributes$elevation = _elm_lang$virtual_dom$VirtualDom$attribute('elevation');
var _elm_lang$svg$Svg_Attributes$edgeMode = _elm_lang$virtual_dom$VirtualDom$attribute('edgeMode');
var _elm_lang$svg$Svg_Attributes$dy = _elm_lang$virtual_dom$VirtualDom$attribute('dy');
var _elm_lang$svg$Svg_Attributes$dx = _elm_lang$virtual_dom$VirtualDom$attribute('dx');
var _elm_lang$svg$Svg_Attributes$dur = _elm_lang$virtual_dom$VirtualDom$attribute('dur');
var _elm_lang$svg$Svg_Attributes$divisor = _elm_lang$virtual_dom$VirtualDom$attribute('divisor');
var _elm_lang$svg$Svg_Attributes$diffuseConstant = _elm_lang$virtual_dom$VirtualDom$attribute('diffuseConstant');
var _elm_lang$svg$Svg_Attributes$descent = _elm_lang$virtual_dom$VirtualDom$attribute('descent');
var _elm_lang$svg$Svg_Attributes$decelerate = _elm_lang$virtual_dom$VirtualDom$attribute('decelerate');
var _elm_lang$svg$Svg_Attributes$d = _elm_lang$virtual_dom$VirtualDom$attribute('d');
var _elm_lang$svg$Svg_Attributes$cy = _elm_lang$virtual_dom$VirtualDom$attribute('cy');
var _elm_lang$svg$Svg_Attributes$cx = _elm_lang$virtual_dom$VirtualDom$attribute('cx');
var _elm_lang$svg$Svg_Attributes$contentStyleType = _elm_lang$virtual_dom$VirtualDom$attribute('contentStyleType');
var _elm_lang$svg$Svg_Attributes$contentScriptType = _elm_lang$virtual_dom$VirtualDom$attribute('contentScriptType');
var _elm_lang$svg$Svg_Attributes$clipPathUnits = _elm_lang$virtual_dom$VirtualDom$attribute('clipPathUnits');
var _elm_lang$svg$Svg_Attributes$class = _elm_lang$virtual_dom$VirtualDom$attribute('class');
var _elm_lang$svg$Svg_Attributes$capHeight = _elm_lang$virtual_dom$VirtualDom$attribute('cap-height');
var _elm_lang$svg$Svg_Attributes$calcMode = _elm_lang$virtual_dom$VirtualDom$attribute('calcMode');
var _elm_lang$svg$Svg_Attributes$by = _elm_lang$virtual_dom$VirtualDom$attribute('by');
var _elm_lang$svg$Svg_Attributes$bias = _elm_lang$virtual_dom$VirtualDom$attribute('bias');
var _elm_lang$svg$Svg_Attributes$begin = _elm_lang$virtual_dom$VirtualDom$attribute('begin');
var _elm_lang$svg$Svg_Attributes$bbox = _elm_lang$virtual_dom$VirtualDom$attribute('bbox');
var _elm_lang$svg$Svg_Attributes$baseProfile = _elm_lang$virtual_dom$VirtualDom$attribute('baseProfile');
var _elm_lang$svg$Svg_Attributes$baseFrequency = _elm_lang$virtual_dom$VirtualDom$attribute('baseFrequency');
var _elm_lang$svg$Svg_Attributes$azimuth = _elm_lang$virtual_dom$VirtualDom$attribute('azimuth');
var _elm_lang$svg$Svg_Attributes$autoReverse = _elm_lang$virtual_dom$VirtualDom$attribute('autoReverse');
var _elm_lang$svg$Svg_Attributes$attributeType = _elm_lang$virtual_dom$VirtualDom$attribute('attributeType');
var _elm_lang$svg$Svg_Attributes$attributeName = _elm_lang$virtual_dom$VirtualDom$attribute('attributeName');
var _elm_lang$svg$Svg_Attributes$ascent = _elm_lang$virtual_dom$VirtualDom$attribute('ascent');
var _elm_lang$svg$Svg_Attributes$arabicForm = _elm_lang$virtual_dom$VirtualDom$attribute('arabic-form');
var _elm_lang$svg$Svg_Attributes$amplitude = _elm_lang$virtual_dom$VirtualDom$attribute('amplitude');
var _elm_lang$svg$Svg_Attributes$allowReorder = _elm_lang$virtual_dom$VirtualDom$attribute('allowReorder');
var _elm_lang$svg$Svg_Attributes$alphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('alphabetic');
var _elm_lang$svg$Svg_Attributes$additive = _elm_lang$virtual_dom$VirtualDom$attribute('additive');
var _elm_lang$svg$Svg_Attributes$accumulate = _elm_lang$virtual_dom$VirtualDom$attribute('accumulate');
var _elm_lang$svg$Svg_Attributes$accelerate = _elm_lang$virtual_dom$VirtualDom$attribute('accelerate');
var _elm_lang$svg$Svg_Attributes$accentHeight = _elm_lang$virtual_dom$VirtualDom$attribute('accent-height');

var _eskimoblood$elm_color_extra$Color_Accessibility$luminance = function (cl) {
	var f = function (intensity) {
		var srgb = _elm_lang$core$Basics$toFloat(intensity) / 255;
		return (_elm_lang$core$Native_Utils.cmp(srgb, 3.928e-2) < 1) ? (srgb / 12.92) : Math.pow((srgb + 5.5e-2) / 1.055, 2.4);
	};
	var _p0 = function (a) {
		return {
			ctor: '_Tuple3',
			_0: f(a.red),
			_1: f(a.green),
			_2: f(a.blue)
		};
	}(
		_elm_lang$core$Color$toRgb(cl));
	var r = _p0._0;
	var g = _p0._1;
	var b = _p0._2;
	return ((0.2126 * r) + (0.7152 * g)) + (7.22e-2 * b);
};
var _eskimoblood$elm_color_extra$Color_Accessibility$contrastRatio = F2(
	function (c1, c2) {
		var b = _eskimoblood$elm_color_extra$Color_Accessibility$luminance(c2) + 5.0e-2;
		var a = _eskimoblood$elm_color_extra$Color_Accessibility$luminance(c1) + 5.0e-2;
		return (_elm_lang$core$Native_Utils.cmp(a, b) > 0) ? (a / b) : (b / a);
	});
var _eskimoblood$elm_color_extra$Color_Accessibility$maximumContrast = F2(
	function (base, options) {
		var compareContrast = F2(
			function (c1, c2) {
				return A2(
					_elm_lang$core$Basics$compare,
					A2(_eskimoblood$elm_color_extra$Color_Accessibility$contrastRatio, base, c2),
					A2(_eskimoblood$elm_color_extra$Color_Accessibility$contrastRatio, base, c1));
			});
		return _elm_lang$core$List$head(
			A2(_elm_lang$core$List$sortWith, compareContrast, options));
	});

var _fredcy$elm_parseint$ParseInt$charFromInt = function (i) {
	return (_elm_lang$core$Native_Utils.cmp(i, 10) < 0) ? _elm_lang$core$Char$fromCode(
		i + _elm_lang$core$Char$toCode(
			_elm_lang$core$Native_Utils.chr('0'))) : ((_elm_lang$core$Native_Utils.cmp(i, 36) < 0) ? _elm_lang$core$Char$fromCode(
		(i - 10) + _elm_lang$core$Char$toCode(
			_elm_lang$core$Native_Utils.chr('A'))) : _elm_lang$core$Native_Utils.crash(
		'ParseInt',
		{
			start: {line: 158, column: 9},
			end: {line: 158, column: 20}
		})(
		_elm_lang$core$Basics$toString(i)));
};
var _fredcy$elm_parseint$ParseInt$toRadixUnsafe = F2(
	function (radix, i) {
		return (_elm_lang$core$Native_Utils.cmp(i, radix) < 0) ? _elm_lang$core$String$fromChar(
			_fredcy$elm_parseint$ParseInt$charFromInt(i)) : A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_fredcy$elm_parseint$ParseInt$toRadixUnsafe, radix, (i / radix) | 0),
			_elm_lang$core$String$fromChar(
				_fredcy$elm_parseint$ParseInt$charFromInt(
					A2(_elm_lang$core$Basics_ops['%'], i, radix))));
	});
var _fredcy$elm_parseint$ParseInt$toOct = _fredcy$elm_parseint$ParseInt$toRadixUnsafe(8);
var _fredcy$elm_parseint$ParseInt$toHex = _fredcy$elm_parseint$ParseInt$toRadixUnsafe(16);
var _fredcy$elm_parseint$ParseInt$isBetween = F3(
	function (lower, upper, c) {
		var ci = _elm_lang$core$Char$toCode(c);
		return (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$Char$toCode(lower),
			ci) < 1) && (_elm_lang$core$Native_Utils.cmp(
			ci,
			_elm_lang$core$Char$toCode(upper)) < 1);
	});
var _fredcy$elm_parseint$ParseInt$charOffset = F2(
	function (basis, c) {
		return _elm_lang$core$Char$toCode(c) - _elm_lang$core$Char$toCode(basis);
	});
var _fredcy$elm_parseint$ParseInt$InvalidRadix = function (a) {
	return {ctor: 'InvalidRadix', _0: a};
};
var _fredcy$elm_parseint$ParseInt$toRadix = F2(
	function (radix, i) {
		return ((_elm_lang$core$Native_Utils.cmp(2, radix) < 1) && (_elm_lang$core$Native_Utils.cmp(radix, 36) < 1)) ? ((_elm_lang$core$Native_Utils.cmp(i, 0) < 0) ? _elm_lang$core$Result$Ok(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'-',
				A2(_fredcy$elm_parseint$ParseInt$toRadixUnsafe, radix, 0 - i))) : _elm_lang$core$Result$Ok(
			A2(_fredcy$elm_parseint$ParseInt$toRadixUnsafe, radix, i))) : _elm_lang$core$Result$Err(
			_fredcy$elm_parseint$ParseInt$InvalidRadix(radix));
	});
var _fredcy$elm_parseint$ParseInt$OutOfRange = function (a) {
	return {ctor: 'OutOfRange', _0: a};
};
var _fredcy$elm_parseint$ParseInt$InvalidChar = function (a) {
	return {ctor: 'InvalidChar', _0: a};
};
var _fredcy$elm_parseint$ParseInt$intFromChar = F2(
	function (radix, c) {
		var validInt = function (i) {
			return (_elm_lang$core$Native_Utils.cmp(i, radix) < 0) ? _elm_lang$core$Result$Ok(i) : _elm_lang$core$Result$Err(
				_fredcy$elm_parseint$ParseInt$OutOfRange(c));
		};
		var toInt = A3(
			_fredcy$elm_parseint$ParseInt$isBetween,
			_elm_lang$core$Native_Utils.chr('0'),
			_elm_lang$core$Native_Utils.chr('9'),
			c) ? _elm_lang$core$Result$Ok(
			A2(
				_fredcy$elm_parseint$ParseInt$charOffset,
				_elm_lang$core$Native_Utils.chr('0'),
				c)) : (A3(
			_fredcy$elm_parseint$ParseInt$isBetween,
			_elm_lang$core$Native_Utils.chr('a'),
			_elm_lang$core$Native_Utils.chr('z'),
			c) ? _elm_lang$core$Result$Ok(
			10 + A2(
				_fredcy$elm_parseint$ParseInt$charOffset,
				_elm_lang$core$Native_Utils.chr('a'),
				c)) : (A3(
			_fredcy$elm_parseint$ParseInt$isBetween,
			_elm_lang$core$Native_Utils.chr('A'),
			_elm_lang$core$Native_Utils.chr('Z'),
			c) ? _elm_lang$core$Result$Ok(
			10 + A2(
				_fredcy$elm_parseint$ParseInt$charOffset,
				_elm_lang$core$Native_Utils.chr('A'),
				c)) : _elm_lang$core$Result$Err(
			_fredcy$elm_parseint$ParseInt$InvalidChar(c))));
		return A2(_elm_lang$core$Result$andThen, validInt, toInt);
	});
var _fredcy$elm_parseint$ParseInt$parseIntR = F2(
	function (radix, rstring) {
		var _p0 = _elm_lang$core$String$uncons(rstring);
		if (_p0.ctor === 'Nothing') {
			return _elm_lang$core$Result$Ok(0);
		} else {
			return A2(
				_elm_lang$core$Result$andThen,
				function (ci) {
					return A2(
						_elm_lang$core$Result$andThen,
						function (ri) {
							return _elm_lang$core$Result$Ok(ci + (ri * radix));
						},
						A2(_fredcy$elm_parseint$ParseInt$parseIntR, radix, _p0._0._1));
				},
				A2(_fredcy$elm_parseint$ParseInt$intFromChar, radix, _p0._0._0));
		}
	});
var _fredcy$elm_parseint$ParseInt$parseIntRadix = F2(
	function (radix, string) {
		return ((_elm_lang$core$Native_Utils.cmp(2, radix) < 1) && (_elm_lang$core$Native_Utils.cmp(radix, 36) < 1)) ? A2(
			_fredcy$elm_parseint$ParseInt$parseIntR,
			radix,
			_elm_lang$core$String$reverse(string)) : _elm_lang$core$Result$Err(
			_fredcy$elm_parseint$ParseInt$InvalidRadix(radix));
	});
var _fredcy$elm_parseint$ParseInt$parseInt = _fredcy$elm_parseint$ParseInt$parseIntRadix(10);
var _fredcy$elm_parseint$ParseInt$parseIntOct = _fredcy$elm_parseint$ParseInt$parseIntRadix(8);
var _fredcy$elm_parseint$ParseInt$parseIntHex = _fredcy$elm_parseint$ParseInt$parseIntRadix(16);

var _eskimoblood$elm_color_extra$Color_Convert$xyzToColor = function (_p0) {
	var _p1 = _p0;
	var c = function (ch) {
		var ch_ = (_elm_lang$core$Native_Utils.cmp(ch, 3.1308e-3) > 0) ? ((1.055 * Math.pow(ch, 1 / 2.4)) - 5.5e-2) : (12.92 * ch);
		return _elm_lang$core$Basics$round(
			A3(_elm_lang$core$Basics$clamp, 0, 255, ch_ * 255));
	};
	var z_ = _p1.z / 100;
	var y_ = _p1.y / 100;
	var x_ = _p1.x / 100;
	var r = ((x_ * 3.2404542) + (y_ * -1.5371385)) + (z_ * -0.4986);
	var g = ((x_ * -0.969266) + (y_ * 1.8760108)) + (z_ * 4.1556e-2);
	var b = ((x_ * 5.56434e-2) + (y_ * -0.2040259)) + (z_ * 1.0572252);
	return A3(
		_elm_lang$core$Color$rgb,
		c(r),
		c(g),
		c(b));
};
var _eskimoblood$elm_color_extra$Color_Convert$labToXyz = function (_p2) {
	var _p3 = _p2;
	var y = (_p3.l + 16) / 116;
	var c = function (ch) {
		var ch_ = (ch * ch) * ch;
		return (_elm_lang$core$Native_Utils.cmp(ch_, 8.856e-3) > 0) ? ch_ : ((ch - (16 / 116)) / 7.787);
	};
	return {
		y: c(y) * 100,
		x: c(y + (_p3.a / 500)) * 95.047,
		z: c(y - (_p3.b / 200)) * 108.883
	};
};
var _eskimoblood$elm_color_extra$Color_Convert$labToColor = function (_p4) {
	return _eskimoblood$elm_color_extra$Color_Convert$xyzToColor(
		_eskimoblood$elm_color_extra$Color_Convert$labToXyz(_p4));
};
var _eskimoblood$elm_color_extra$Color_Convert$xyzToLab = function (_p5) {
	var _p6 = _p5;
	var c = function (ch) {
		return (_elm_lang$core$Native_Utils.cmp(ch, 8.856e-3) > 0) ? Math.pow(ch, 1 / 3) : ((7.787 * ch) + (16 / 116));
	};
	var x_ = c(_p6.x / 95.047);
	var y_ = c(_p6.y / 100);
	var z_ = c(_p6.z / 108.883);
	return {l: (116 * y_) - 16, a: 500 * (x_ - y_), b: 200 * (y_ - z_)};
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToXyz = function (cl) {
	var _p7 = _elm_lang$core$Color$toRgb(cl);
	var red = _p7.red;
	var green = _p7.green;
	var blue = _p7.blue;
	var c = function (ch) {
		var ch_ = _elm_lang$core$Basics$toFloat(ch) / 255;
		var ch__ = (_elm_lang$core$Native_Utils.cmp(ch_, 4.045e-2) > 0) ? Math.pow((ch_ + 5.5e-2) / 1.055, 2.4) : (ch_ / 12.92);
		return ch__ * 100;
	};
	var r = c(red);
	var g = c(green);
	var b = c(blue);
	return {x: ((r * 0.4124) + (g * 0.3576)) + (b * 0.1805), y: ((r * 0.2126) + (g * 0.7152)) + (b * 7.22e-2), z: ((r * 1.93e-2) + (g * 0.1192)) + (b * 0.9505)};
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToLab = function (_p8) {
	return _eskimoblood$elm_color_extra$Color_Convert$xyzToLab(
		_eskimoblood$elm_color_extra$Color_Convert$colorToXyz(_p8));
};
var _eskimoblood$elm_color_extra$Color_Convert$toRadix = function (n) {
	var getChr = function (c) {
		return (_elm_lang$core$Native_Utils.cmp(c, 10) < 0) ? _elm_lang$core$Basics$toString(c) : _elm_lang$core$String$fromChar(
			_elm_lang$core$Char$fromCode(87 + c));
	};
	return (_elm_lang$core$Native_Utils.cmp(n, 16) < 0) ? getChr(n) : A2(
		_elm_lang$core$Basics_ops['++'],
		_eskimoblood$elm_color_extra$Color_Convert$toRadix((n / 16) | 0),
		getChr(
			A2(_elm_lang$core$Basics_ops['%'], n, 16)));
};
var _eskimoblood$elm_color_extra$Color_Convert$toHex = function (_p9) {
	return A3(
		_elm_lang$core$String$padLeft,
		2,
		_elm_lang$core$Native_Utils.chr('0'),
		_eskimoblood$elm_color_extra$Color_Convert$toRadix(_p9));
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToHex = function (cl) {
	var _p10 = _elm_lang$core$Color$toRgb(cl);
	var red = _p10.red;
	var green = _p10.green;
	var blue = _p10.blue;
	return A2(
		_elm_lang$core$String$join,
		'',
		A2(
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			'#',
			A2(
				_elm_lang$core$List$map,
				_eskimoblood$elm_color_extra$Color_Convert$toHex,
				{
					ctor: '::',
					_0: red,
					_1: {
						ctor: '::',
						_0: green,
						_1: {
							ctor: '::',
							_0: blue,
							_1: {ctor: '[]'}
						}
					}
				})));
};
var _eskimoblood$elm_color_extra$Color_Convert$hexToColor = function () {
	var pattern = A2(
		_elm_lang$core$Basics_ops['++'],
		'',
		A2(
			_elm_lang$core$Basics_ops['++'],
			'^',
			A2(
				_elm_lang$core$Basics_ops['++'],
				'#?',
				A2(
					_elm_lang$core$Basics_ops['++'],
					'(?:',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'(?:([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2}))',
						A2(
							_elm_lang$core$Basics_ops['++'],
							'|',
							A2(
								_elm_lang$core$Basics_ops['++'],
								'(?:([a-f\\d])([a-f\\d])([a-f\\d]))',
								A2(_elm_lang$core$Basics_ops['++'], ')', '$'))))))));
	var extend = function (token) {
		var _p11 = _elm_lang$core$String$toList(token);
		if ((_p11.ctor === '::') && (_p11._1.ctor === '[]')) {
			var _p12 = _p11._0;
			return _elm_lang$core$String$fromList(
				{
					ctor: '::',
					_0: _p12,
					_1: {
						ctor: '::',
						_0: _p12,
						_1: {ctor: '[]'}
					}
				});
		} else {
			return token;
		}
	};
	return function (_p13) {
		return A2(
			_elm_lang$core$Result$andThen,
			function (colors) {
				var _p15 = A2(
					_elm_lang$core$List$map,
					function (_p14) {
						return _fredcy$elm_parseint$ParseInt$parseIntHex(
							extend(_p14));
					},
					colors);
				if (((((((_p15.ctor === '::') && (_p15._0.ctor === 'Ok')) && (_p15._1.ctor === '::')) && (_p15._1._0.ctor === 'Ok')) && (_p15._1._1.ctor === '::')) && (_p15._1._1._0.ctor === 'Ok')) && (_p15._1._1._1.ctor === '[]')) {
					return _elm_lang$core$Result$Ok(
						A3(_elm_lang$core$Color$rgb, _p15._0._0, _p15._1._0._0, _p15._1._1._0._0));
				} else {
					return _elm_lang$core$Result$Err('Parsing ints from hex failed');
				}
			},
			A2(
				_elm_lang$core$Result$fromMaybe,
				'Parsing hex regex failed',
				A2(
					_elm_lang$core$Maybe$map,
					_elm_lang$core$List$filterMap(_elm_lang$core$Basics$identity),
					A2(
						_elm_lang$core$Maybe$map,
						function (_) {
							return _.submatches;
						},
						_elm_lang$core$List$head(
							A3(
								_elm_lang$core$Regex$find,
								_elm_lang$core$Regex$AtMost(1),
								_elm_lang$core$Regex$regex(pattern),
								_elm_lang$core$String$toLower(_p13)))))));
	};
}();
var _eskimoblood$elm_color_extra$Color_Convert$cssColorString = F2(
	function (kind, values) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			kind,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_elm_lang$core$String$join, ', ', values),
					')')));
	});
var _eskimoblood$elm_color_extra$Color_Convert$toPercentString = function (_p16) {
	return A3(
		_elm_lang$core$Basics$flip,
		F2(
			function (x, y) {
				return A2(_elm_lang$core$Basics_ops['++'], x, y);
			}),
		'%',
		_elm_lang$core$Basics$toString(
			_elm_lang$core$Basics$round(
				A2(
					F2(
						function (x, y) {
							return x * y;
						}),
					100,
					_p16))));
};
var _eskimoblood$elm_color_extra$Color_Convert$hueToString = function (_p17) {
	return _elm_lang$core$Basics$toString(
		_elm_lang$core$Basics$round(
			A3(
				_elm_lang$core$Basics$flip,
				F2(
					function (x, y) {
						return x / y;
					}),
				_elm_lang$core$Basics$pi,
				A2(
					F2(
						function (x, y) {
							return x * y;
						}),
					180,
					_p17))));
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToCssHsla = function (cl) {
	var _p18 = _elm_lang$core$Color$toHsl(cl);
	var hue = _p18.hue;
	var saturation = _p18.saturation;
	var lightness = _p18.lightness;
	var alpha = _p18.alpha;
	return A2(
		_eskimoblood$elm_color_extra$Color_Convert$cssColorString,
		'hsla',
		{
			ctor: '::',
			_0: _eskimoblood$elm_color_extra$Color_Convert$hueToString(hue),
			_1: {
				ctor: '::',
				_0: _eskimoblood$elm_color_extra$Color_Convert$toPercentString(saturation),
				_1: {
					ctor: '::',
					_0: _eskimoblood$elm_color_extra$Color_Convert$toPercentString(lightness),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Basics$toString(alpha),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToCssHsl = function (cl) {
	var _p19 = _elm_lang$core$Color$toHsl(cl);
	var hue = _p19.hue;
	var saturation = _p19.saturation;
	var lightness = _p19.lightness;
	var alpha = _p19.alpha;
	return A2(
		_eskimoblood$elm_color_extra$Color_Convert$cssColorString,
		'hsl',
		{
			ctor: '::',
			_0: _eskimoblood$elm_color_extra$Color_Convert$hueToString(hue),
			_1: {
				ctor: '::',
				_0: _eskimoblood$elm_color_extra$Color_Convert$toPercentString(saturation),
				_1: {
					ctor: '::',
					_0: _eskimoblood$elm_color_extra$Color_Convert$toPercentString(lightness),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToCssRgba = function (cl) {
	var _p20 = _elm_lang$core$Color$toRgb(cl);
	var red = _p20.red;
	var green = _p20.green;
	var blue = _p20.blue;
	var alpha = _p20.alpha;
	return A2(
		_eskimoblood$elm_color_extra$Color_Convert$cssColorString,
		'rgba',
		{
			ctor: '::',
			_0: _elm_lang$core$Basics$toString(red),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Basics$toString(green),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Basics$toString(blue),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Basics$toString(alpha),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToCssRgb = function (cl) {
	var _p21 = _elm_lang$core$Color$toRgb(cl);
	var red = _p21.red;
	var green = _p21.green;
	var blue = _p21.blue;
	var alpha = _p21.alpha;
	return A2(
		_eskimoblood$elm_color_extra$Color_Convert$cssColorString,
		'rgb',
		{
			ctor: '::',
			_0: _elm_lang$core$Basics$toString(red),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Basics$toString(green),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Basics$toString(blue),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _eskimoblood$elm_color_extra$Color_Convert$XYZ = F3(
	function (a, b, c) {
		return {x: a, y: b, z: c};
	});
var _eskimoblood$elm_color_extra$Color_Convert$Lab = F3(
	function (a, b, c) {
		return {l: a, a: b, b: c};
	});

var _eskimoblood$elm_color_extra$Color_Manipulate$mixChannel = F3(
	function (weight, c1, c2) {
		return _elm_lang$core$Basics$round(
			(_elm_lang$core$Basics$toFloat(c1) * weight) + (_elm_lang$core$Basics$toFloat(c2) * (1 - weight)));
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$calculateWeight = F3(
	function (a1, a2, weight) {
		var w1 = (weight * 2) - 1;
		var a = a1 - a2;
		var w2 = _elm_lang$core$Native_Utils.eq(w1 * a, -1) ? w1 : ((w1 + a) / (1 + (w1 * a)));
		return (w2 + 1) / 2;
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$weightedMix = F3(
	function (color1, color2, weight) {
		var c2 = _elm_lang$core$Color$toRgb(color2);
		var c1 = _elm_lang$core$Color$toRgb(color1);
		var clampedWeight = A3(_elm_lang$core$Basics$clamp, 0, 1, weight);
		var w = A3(_eskimoblood$elm_color_extra$Color_Manipulate$calculateWeight, c1.alpha, c2.alpha, clampedWeight);
		var rMixed = A3(_eskimoblood$elm_color_extra$Color_Manipulate$mixChannel, w, c1.red, c2.red);
		var gMixed = A3(_eskimoblood$elm_color_extra$Color_Manipulate$mixChannel, w, c1.green, c2.green);
		var bMixed = A3(_eskimoblood$elm_color_extra$Color_Manipulate$mixChannel, w, c1.blue, c2.blue);
		var alphaMixed = (c1.alpha * clampedWeight) + (c2.alpha * (1 - clampedWeight));
		return A4(_elm_lang$core$Color$rgba, rMixed, gMixed, bMixed, alphaMixed);
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$mix = F2(
	function (c1, c2) {
		return A3(_eskimoblood$elm_color_extra$Color_Manipulate$weightedMix, c1, c2, 0.5);
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$scale = F3(
	function (max, scaleAmount, value) {
		var clampedValue = A3(_elm_lang$core$Basics$clamp, 0, max, value);
		var clampedScale = A3(_elm_lang$core$Basics$clamp, -1.0, 1.0, scaleAmount);
		var diff = (_elm_lang$core$Native_Utils.cmp(clampedScale, 0) > 0) ? (max - clampedValue) : clampedValue;
		return clampedValue + (diff * clampedScale);
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$scaleRgb = F2(
	function (scaleBy, color) {
		var rgb = _elm_lang$core$Color$toRgb(color);
		var _p0 = scaleBy;
		var rScale = _p0._0;
		var gScale = _p0._1;
		var bScale = _p0._2;
		var aScale = _p0._3;
		return A4(
			_elm_lang$core$Color$rgba,
			_elm_lang$core$Basics$round(
				A3(
					_eskimoblood$elm_color_extra$Color_Manipulate$scale,
					255,
					rScale,
					_elm_lang$core$Basics$toFloat(rgb.red))),
			_elm_lang$core$Basics$round(
				A3(
					_eskimoblood$elm_color_extra$Color_Manipulate$scale,
					255,
					gScale,
					_elm_lang$core$Basics$toFloat(rgb.green))),
			_elm_lang$core$Basics$round(
				A3(
					_eskimoblood$elm_color_extra$Color_Manipulate$scale,
					255,
					bScale,
					_elm_lang$core$Basics$toFloat(rgb.blue))),
			A3(_eskimoblood$elm_color_extra$Color_Manipulate$scale, 1.0, aScale, rgb.alpha));
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$scaleHsl = F2(
	function (scaleBy, color) {
		var hsl = _elm_lang$core$Color$toHsl(color);
		var _p1 = scaleBy;
		var saturationScale = _p1._0;
		var lightnessScale = _p1._1;
		var alphaScale = _p1._2;
		return A4(
			_elm_lang$core$Color$hsla,
			hsl.hue,
			A3(_eskimoblood$elm_color_extra$Color_Manipulate$scale, 1.0, saturationScale, hsl.saturation),
			A3(_eskimoblood$elm_color_extra$Color_Manipulate$scale, 1.0, lightnessScale, hsl.lightness),
			A3(_eskimoblood$elm_color_extra$Color_Manipulate$scale, 1.0, alphaScale, hsl.alpha));
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$rotateHue = F2(
	function (angle, cl) {
		var _p2 = _elm_lang$core$Color$toHsl(cl);
		var hue = _p2.hue;
		var saturation = _p2.saturation;
		var lightness = _p2.lightness;
		var alpha = _p2.alpha;
		return A4(
			_elm_lang$core$Color$hsla,
			hue + _elm_lang$core$Basics$degrees(angle),
			saturation,
			lightness,
			alpha);
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$limit = A2(_elm_lang$core$Basics$clamp, 0, 1);
var _eskimoblood$elm_color_extra$Color_Manipulate$darken = F2(
	function (offset, cl) {
		var _p3 = _elm_lang$core$Color$toHsl(cl);
		var hue = _p3.hue;
		var saturation = _p3.saturation;
		var lightness = _p3.lightness;
		var alpha = _p3.alpha;
		return A4(
			_elm_lang$core$Color$hsla,
			hue,
			saturation,
			_eskimoblood$elm_color_extra$Color_Manipulate$limit(lightness - offset),
			alpha);
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$lighten = F2(
	function (offset, cl) {
		return A2(_eskimoblood$elm_color_extra$Color_Manipulate$darken, 0 - offset, cl);
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$saturate = F2(
	function (offset, cl) {
		var _p4 = _elm_lang$core$Color$toHsl(cl);
		var hue = _p4.hue;
		var saturation = _p4.saturation;
		var lightness = _p4.lightness;
		var alpha = _p4.alpha;
		return A4(
			_elm_lang$core$Color$hsla,
			hue,
			_eskimoblood$elm_color_extra$Color_Manipulate$limit(saturation + offset),
			lightness,
			alpha);
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$desaturate = F2(
	function (offset, cl) {
		return A2(_eskimoblood$elm_color_extra$Color_Manipulate$saturate, 0 - offset, cl);
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$grayscale = function (cl) {
	return A2(_eskimoblood$elm_color_extra$Color_Manipulate$saturate, -1, cl);
};
var _eskimoblood$elm_color_extra$Color_Manipulate$fadeIn = F2(
	function (offset, cl) {
		var _p5 = _elm_lang$core$Color$toHsl(cl);
		var hue = _p5.hue;
		var saturation = _p5.saturation;
		var lightness = _p5.lightness;
		var alpha = _p5.alpha;
		return A4(
			_elm_lang$core$Color$hsla,
			hue,
			saturation,
			lightness,
			_eskimoblood$elm_color_extra$Color_Manipulate$limit(alpha + offset));
	});
var _eskimoblood$elm_color_extra$Color_Manipulate$fadeOut = F2(
	function (offset, cl) {
		return A2(_eskimoblood$elm_color_extra$Color_Manipulate$fadeIn, 0 - offset, cl);
	});

var _lucamug$elm_style_framework$Framework$Disabled = {ctor: 'Disabled'};
var _lucamug$elm_style_framework$Framework$Loading = {ctor: 'Loading'};
var _lucamug$elm_style_framework$Framework$Outlined = {ctor: 'Outlined'};
var _lucamug$elm_style_framework$Framework$Large = {ctor: 'Large'};
var _lucamug$elm_style_framework$Framework$Medium = {ctor: 'Medium'};
var _lucamug$elm_style_framework$Framework$Small = {ctor: 'Small'};
var _lucamug$elm_style_framework$Framework$Danger = {ctor: 'Danger'};
var _lucamug$elm_style_framework$Framework$Warning = {ctor: 'Warning'};
var _lucamug$elm_style_framework$Framework$Success = {ctor: 'Success'};
var _lucamug$elm_style_framework$Framework$Info = {ctor: 'Info'};
var _lucamug$elm_style_framework$Framework$Link = {ctor: 'Link'};
var _lucamug$elm_style_framework$Framework$Primary = {ctor: 'Primary'};

var _mdgriffith$stylish_elephants$Internal_Style$class = function (cls) {
	var _p0 = cls;
	switch (_p0.ctor) {
		case 'Root':
			return '.style-elements';
		case 'Any':
			return '.se';
		case 'Single':
			return '.el';
		case 'Row':
			return '.row';
		case 'Column':
			return '.column';
		case 'Page':
			return '.page';
		case 'Paragraph':
			return '.paragraph';
		case 'Text':
			return '.text';
		case 'Grid':
			return '.grid';
		default:
			return '.spacer';
	}
};
var _mdgriffith$stylish_elephants$Internal_Style$locationName = function (loc) {
	var _p1 = loc;
	switch (_p1.ctor) {
		case 'Above':
			return '.above';
		case 'Below':
			return '.below';
		case 'OnRight':
			return '.on-right';
		case 'OnLeft':
			return '.on-left';
		case 'Within':
			return '.infront';
		default:
			return '.behind';
	}
};
var _mdgriffith$stylish_elephants$Internal_Style$contentName = function (desc) {
	var _p2 = desc;
	switch (_p2._0.ctor) {
		case 'Top':
			return '.content-top';
		case 'Bottom':
			return '.content-bottom';
		case 'Right':
			return '.content-right';
		case 'Left':
			return '.content-left';
		case 'CenterX':
			return '.content-center-x';
		default:
			return '.content-center-y';
	}
};
var _mdgriffith$stylish_elephants$Internal_Style$selfName = function (desc) {
	var _p3 = desc;
	switch (_p3._0.ctor) {
		case 'Top':
			return '.self-top';
		case 'Bottom':
			return '.self-bottom';
		case 'Right':
			return '.self-right';
		case 'Left':
			return '.self-left';
		case 'CenterX':
			return '.self-center-x';
		default:
			return '.self-center-y';
	}
};
var _mdgriffith$stylish_elephants$Internal_Style$Class = F2(
	function (a, b) {
		return {ctor: 'Class', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Style$Batch = function (a) {
	return {ctor: 'Batch', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Style$Adjacent = F2(
	function (a, b) {
		return {ctor: 'Adjacent', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Style$Descriptor = F2(
	function (a, b) {
		return {ctor: 'Descriptor', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Style$Supports = F2(
	function (a, b) {
		return {ctor: 'Supports', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Style$Child = F2(
	function (a, b) {
		return {ctor: 'Child', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Style$Prop = F2(
	function (a, b) {
		return {ctor: 'Prop', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Style$Spacer = {ctor: 'Spacer'};
var _mdgriffith$stylish_elephants$Internal_Style$Grid = {ctor: 'Grid'};
var _mdgriffith$stylish_elephants$Internal_Style$Text = {ctor: 'Text'};
var _mdgriffith$stylish_elephants$Internal_Style$Page = {ctor: 'Page'};
var _mdgriffith$stylish_elephants$Internal_Style$Paragraph = {ctor: 'Paragraph'};
var _mdgriffith$stylish_elephants$Internal_Style$Column = {ctor: 'Column'};
var _mdgriffith$stylish_elephants$Internal_Style$Row = {ctor: 'Row'};
var _mdgriffith$stylish_elephants$Internal_Style$Single = {ctor: 'Single'};
var _mdgriffith$stylish_elephants$Internal_Style$Any = {ctor: 'Any'};
var _mdgriffith$stylish_elephants$Internal_Style$Root = {ctor: 'Root'};
var _mdgriffith$stylish_elephants$Internal_Style$Behind = {ctor: 'Behind'};
var _mdgriffith$stylish_elephants$Internal_Style$Within = {ctor: 'Within'};
var _mdgriffith$stylish_elephants$Internal_Style$OnLeft = {ctor: 'OnLeft'};
var _mdgriffith$stylish_elephants$Internal_Style$OnRight = {ctor: 'OnRight'};
var _mdgriffith$stylish_elephants$Internal_Style$Below = {ctor: 'Below'};
var _mdgriffith$stylish_elephants$Internal_Style$Above = {ctor: 'Above'};
var _mdgriffith$stylish_elephants$Internal_Style$locations = function () {
	var loc = _mdgriffith$stylish_elephants$Internal_Style$Above;
	var _p4 = function () {
		var _p5 = loc;
		switch (_p5.ctor) {
			case 'Above':
				return {ctor: '_Tuple0'};
			case 'Below':
				return {ctor: '_Tuple0'};
			case 'OnRight':
				return {ctor: '_Tuple0'};
			case 'OnLeft':
				return {ctor: '_Tuple0'};
			case 'Within':
				return {ctor: '_Tuple0'};
			default:
				return {ctor: '_Tuple0'};
		}
	}();
	return {
		ctor: '::',
		_0: _mdgriffith$stylish_elephants$Internal_Style$Above,
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Internal_Style$Below,
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Internal_Style$OnRight,
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Style$OnLeft,
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Style$Within,
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Internal_Style$Behind,
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	};
}();
var _mdgriffith$stylish_elephants$Internal_Style$Self = function (a) {
	return {ctor: 'Self', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Style$Content = function (a) {
	return {ctor: 'Content', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Style$CenterY = {ctor: 'CenterY'};
var _mdgriffith$stylish_elephants$Internal_Style$CenterX = {ctor: 'CenterX'};
var _mdgriffith$stylish_elephants$Internal_Style$Left = {ctor: 'Left'};
var _mdgriffith$stylish_elephants$Internal_Style$Right = {ctor: 'Right'};
var _mdgriffith$stylish_elephants$Internal_Style$Bottom = {ctor: 'Bottom'};
var _mdgriffith$stylish_elephants$Internal_Style$Top = {ctor: 'Top'};
var _mdgriffith$stylish_elephants$Internal_Style$alignments = {
	ctor: '::',
	_0: _mdgriffith$stylish_elephants$Internal_Style$Top,
	_1: {
		ctor: '::',
		_0: _mdgriffith$stylish_elephants$Internal_Style$Bottom,
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Internal_Style$Right,
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Internal_Style$Left,
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Style$CenterX,
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Style$CenterY,
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _mdgriffith$stylish_elephants$Internal_Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _p6 = values(alignment);
		var content = _p6._0;
		var indiv = _p6._1;
		return {
			ctor: '::',
			_0: A2(
				_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
				_mdgriffith$stylish_elephants$Internal_Style$contentName(
					_mdgriffith$stylish_elephants$Internal_Style$Content(alignment)),
				content),
			_1: {
				ctor: '::',
				_0: A2(
					_mdgriffith$stylish_elephants$Internal_Style$Child,
					_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Any),
					{
						ctor: '::',
						_0: A2(
							_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
							_mdgriffith$stylish_elephants$Internal_Style$selfName(
								_mdgriffith$stylish_elephants$Internal_Style$Self(alignment)),
							indiv),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		};
	};
	return _mdgriffith$stylish_elephants$Internal_Style$Batch(
		A2(_elm_lang$core$List$concatMap, createDescription, _mdgriffith$stylish_elephants$Internal_Style$alignments));
};
var _mdgriffith$stylish_elephants$Internal_Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return {
			ctor: '::',
			_0: A2(
				_mdgriffith$stylish_elephants$Internal_Style$Child,
				_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Any),
				{
					ctor: '::',
					_0: A2(
						_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
						_mdgriffith$stylish_elephants$Internal_Style$selfName(
							_mdgriffith$stylish_elephants$Internal_Style$Self(alignment)),
						values(alignment)),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	};
	return _mdgriffith$stylish_elephants$Internal_Style$Batch(
		A2(_elm_lang$core$List$concatMap, createDescription, _mdgriffith$stylish_elephants$Internal_Style$alignments));
};
var _mdgriffith$stylish_elephants$Internal_Style$Intermediate = function (a) {
	return {ctor: 'Intermediate', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Style$emptyIntermediate = F2(
	function (selector, closing) {
		return _mdgriffith$stylish_elephants$Internal_Style$Intermediate(
			{
				selector: selector,
				props: {ctor: '[]'},
				closing: closing,
				others: {ctor: '[]'}
			});
	});
var _mdgriffith$stylish_elephants$Internal_Style$renderRules = F2(
	function (_p7, rules) {
		var _p8 = _p7;
		var _p10 = _p8._0;
		var generateIntermediates = F2(
			function (rule, rendered) {
				var _p9 = rule;
				switch (_p9.ctor) {
					case 'Prop':
						return _elm_lang$core$Native_Utils.update(
							rendered,
							{
								props: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _p9._0, _1: _p9._1},
									_1: rendered.props
								}
							});
					case 'Supports':
						return _elm_lang$core$Native_Utils.update(
							rendered,
							{
								others: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Internal_Style$Intermediate(
										{
											selector: A2(
												_elm_lang$core$Basics_ops['++'],
												'@supports (',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_p9._0._0,
													A2(
														_elm_lang$core$Basics_ops['++'],
														':',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_p9._0._1,
															A2(_elm_lang$core$Basics_ops['++'], ') {', _p10.selector))))),
											props: _p9._1,
											closing: '\n}',
											others: {ctor: '[]'}
										}),
									_1: rendered.others
								}
							});
					case 'Adjacent':
						return _elm_lang$core$Native_Utils.update(
							rendered,
							{
								others: {
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Internal_Style$renderRules,
										A2(
											_mdgriffith$stylish_elephants$Internal_Style$emptyIntermediate,
											A2(
												_elm_lang$core$Basics_ops['++'],
												_p10.selector,
												A2(_elm_lang$core$Basics_ops['++'], ' + ', _p9._0)),
											''),
										_p9._1),
									_1: rendered.others
								}
							});
					case 'Child':
						return _elm_lang$core$Native_Utils.update(
							rendered,
							{
								others: {
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Internal_Style$renderRules,
										A2(
											_mdgriffith$stylish_elephants$Internal_Style$emptyIntermediate,
											A2(
												_elm_lang$core$Basics_ops['++'],
												_p10.selector,
												A2(_elm_lang$core$Basics_ops['++'], ' > ', _p9._0)),
											''),
										_p9._1),
									_1: rendered.others
								}
							});
					case 'Descriptor':
						return _elm_lang$core$Native_Utils.update(
							rendered,
							{
								others: {
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Internal_Style$renderRules,
										A2(
											_mdgriffith$stylish_elephants$Internal_Style$emptyIntermediate,
											A2(_elm_lang$core$Basics_ops['++'], _p10.selector, _p9._0),
											''),
										_p9._1),
									_1: rendered.others
								}
							});
					default:
						return _elm_lang$core$Native_Utils.update(
							rendered,
							{
								others: {
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Internal_Style$renderRules,
										A2(_mdgriffith$stylish_elephants$Internal_Style$emptyIntermediate, _p10.selector, ''),
										_p9._0),
									_1: rendered.others
								}
							});
				}
			});
		return _mdgriffith$stylish_elephants$Internal_Style$Intermediate(
			A3(_elm_lang$core$List$foldr, generateIntermediates, _p10, rules));
	});
var _mdgriffith$stylish_elephants$Internal_Style$render = function (classes) {
	var renderValues = function (values) {
		return A2(
			_elm_lang$core$String$join,
			'\n',
			A2(
				_elm_lang$core$List$map,
				function (_p11) {
					var _p12 = _p11;
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'  ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p12._0,
							A2(
								_elm_lang$core$Basics_ops['++'],
								': ',
								A2(_elm_lang$core$Basics_ops['++'], _p12._1, ';'))));
				},
				values));
	};
	var renderClass = function (rule) {
		var _p13 = rule.props;
		if (_p13.ctor === '[]') {
			return '';
		} else {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				rule.selector,
				A2(
					_elm_lang$core$Basics_ops['++'],
					' {\n',
					A2(
						_elm_lang$core$Basics_ops['++'],
						renderValues(rule.props),
						A2(_elm_lang$core$Basics_ops['++'], rule.closing, '\n}'))));
		}
	};
	var renderIntermediate = function (_p14) {
		var _p15 = _p14;
		var _p16 = _p15._0;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			renderClass(_p16),
			A2(
				_elm_lang$core$String$join,
				'\n',
				A2(_elm_lang$core$List$map, renderIntermediate, _p16.others)));
	};
	return A2(
		_elm_lang$core$String$join,
		'\n',
		A2(
			_elm_lang$core$List$map,
			renderIntermediate,
			A3(
				_elm_lang$core$List$foldr,
				F2(
					function (_p17, existing) {
						var _p18 = _p17;
						return {
							ctor: '::',
							_0: A2(
								_mdgriffith$stylish_elephants$Internal_Style$renderRules,
								A2(_mdgriffith$stylish_elephants$Internal_Style$emptyIntermediate, _p18._0, ''),
								_p18._1),
							_1: existing
						};
					}),
				{ctor: '[]'},
				classes)));
};
var _mdgriffith$stylish_elephants$Internal_Style$rules = _mdgriffith$stylish_elephants$Internal_Style$render(
	{
		ctor: '::',
		_0: A2(
			_mdgriffith$stylish_elephants$Internal_Style$Class,
			'html,body',
			{
				ctor: '::',
				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', '100%'),
				_1: {
					ctor: '::',
					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'padding', '0'),
					_1: {
						ctor: '::',
						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin', '0'),
						_1: {ctor: '[]'}
					}
				}
			}),
		_1: {
			ctor: '::',
			_0: A2(
				_mdgriffith$stylish_elephants$Internal_Style$Class,
				'.se:focus',
				{
					ctor: '::',
					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'outline', 'none'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_mdgriffith$stylish_elephants$Internal_Style$Class,
					'.se:focus .se.show-on-focus',
					{
						ctor: '::',
						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'opacity', '1'),
						_1: {
							ctor: '::',
							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'auto'),
							_1: {ctor: '[]'}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_mdgriffith$stylish_elephants$Internal_Style$Class,
						'.se.show-on-focus',
						{
							ctor: '::',
							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'opacity', '0'),
							_1: {
								ctor: '::',
								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'none'),
								_1: {
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Internal_Style$Prop,
										'transition',
										A2(
											_elm_lang$core$String$join,
											', ',
											A2(
												_elm_lang$core$List$map,
												function (x) {
													return A2(_elm_lang$core$Basics_ops['++'], x, ' 160ms');
												},
												{
													ctor: '::',
													_0: 'opacity',
													_1: {ctor: '[]'}
												}))),
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_mdgriffith$stylish_elephants$Internal_Style$Class,
							_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Root),
							{
								ctor: '::',
								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'width', '100%'),
								_1: {
									ctor: '::',
									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', 'auto'),
									_1: {
										ctor: '::',
										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'min-height', '100%'),
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_mdgriffith$stylish_elephants$Internal_Style$Class,
								_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Any),
								{
									ctor: '::',
									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'position', 'relative'),
									_1: {
										ctor: '::',
										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'border', 'none'),
										_1: {
											ctor: '::',
											_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'text-decoration', 'none'),
											_1: {
												ctor: '::',
												_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-shrink', '0'),
												_1: {
													ctor: '::',
													_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'flex'),
													_1: {
														ctor: '::',
														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-direction', 'row'),
														_1: {
															ctor: '::',
															_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-basis', 'auto'),
															_1: {
																ctor: '::',
																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'resize', 'none'),
																_1: {
																	ctor: '::',
																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'box-sizing', 'border-box'),
																	_1: {
																		ctor: '::',
																		_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin', '0'),
																		_1: {
																			ctor: '::',
																			_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'padding', '0'),
																			_1: {
																				ctor: '::',
																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'border-width', '0'),
																				_1: {
																					ctor: '::',
																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'border-style', 'solid'),
																					_1: {
																						ctor: '::',
																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'font-size', 'inherit'),
																						_1: {
																							ctor: '::',
																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'color', 'inherit'),
																							_1: {
																								ctor: '::',
																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'font-family', 'inherit'),
																								_1: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'line-height', 'inherit'),
																									_1: {
																										ctor: '::',
																										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'font-weight', 'normal'),
																										_1: {
																											ctor: '::',
																											_0: A2(
																												_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																												'.no-text-selection',
																												{
																													ctor: '::',
																													_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'user-select', 'none'),
																													_1: {
																														ctor: '::',
																														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, '-ms-user-select', 'none'),
																														_1: {ctor: '[]'}
																													}
																												}),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																													'.cursor-pointer',
																													{
																														ctor: '::',
																														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'cursor', 'pointer'),
																														_1: {ctor: '[]'}
																													}),
																												_1: {
																													ctor: '::',
																													_0: A2(
																														_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																														'.cursor-text',
																														{
																															ctor: '::',
																															_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'cursor', 'text'),
																															_1: {ctor: '[]'}
																														}),
																													_1: {
																														ctor: '::',
																														_0: A2(
																															_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																															'.pass-pointer-events',
																															{
																																ctor: '::',
																																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'none'),
																																_1: {ctor: '[]'}
																															}),
																														_1: {
																															ctor: '::',
																															_0: A2(
																																_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																'.capture-pointer-events',
																																{
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'nauto'),
																																	_1: {ctor: '[]'}
																																}),
																															_1: {
																																ctor: '::',
																																_0: A2(
																																	_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																	'.hover-transition',
																																	{
																																		ctor: '::',
																																		_0: A2(
																																			_mdgriffith$stylish_elephants$Internal_Style$Prop,
																																			'transition',
																																			A2(
																																				_elm_lang$core$String$join,
																																				', ',
																																				A2(
																																					_elm_lang$core$List$map,
																																					function (x) {
																																						return A2(_elm_lang$core$Basics_ops['++'], x, ' 160ms');
																																					},
																																					{
																																						ctor: '::',
																																						_0: 'transform',
																																						_1: {
																																							ctor: '::',
																																							_0: 'opacity',
																																							_1: {
																																								ctor: '::',
																																								_0: 'filter',
																																								_1: {
																																									ctor: '::',
																																									_0: 'background-color',
																																									_1: {
																																										ctor: '::',
																																										_0: 'color',
																																										_1: {ctor: '[]'}
																																									}
																																								}
																																							}
																																						}
																																					}))),
																																		_1: {ctor: '[]'}
																																	}),
																																_1: {
																																	ctor: '::',
																																	_0: A2(
																																		_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																		'.overflow-hidden',
																																		{
																																			ctor: '::',
																																			_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'overflow', 'hidden'),
																																			_1: {
																																				ctor: '::',
																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, ' -ms-overflow-style', 'none'),
																																				_1: {ctor: '[]'}
																																			}
																																		}),
																																	_1: {
																																		ctor: '::',
																																		_0: A2(
																																			_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																			'.scrollbars',
																																			{
																																				ctor: '::',
																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'overflow', 'auto'),
																																				_1: {ctor: '[]'}
																																			}),
																																		_1: {
																																			ctor: '::',
																																			_0: A2(
																																				_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																				'.scrollbars-x',
																																				{
																																					ctor: '::',
																																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'overflow-x', 'auto'),
																																					_1: {ctor: '[]'}
																																				}),
																																			_1: {
																																				ctor: '::',
																																				_0: A2(
																																					_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																					'.scrollbars-y',
																																					{
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'overflow-y', 'auto'),
																																						_1: {ctor: '[]'}
																																					}),
																																				_1: {
																																					ctor: '::',
																																					_0: A2(
																																						_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																						'.clip',
																																						{
																																							ctor: '::',
																																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'overflow', 'hidden'),
																																							_1: {ctor: '[]'}
																																						}),
																																					_1: {
																																						ctor: '::',
																																						_0: A2(
																																							_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																							'.clip-x',
																																							{
																																								ctor: '::',
																																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'overflow-x', 'hidden'),
																																								_1: {ctor: '[]'}
																																							}),
																																						_1: {
																																							ctor: '::',
																																							_0: A2(
																																								_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																								'.clip-y',
																																								{
																																									ctor: '::',
																																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'overflow-y', 'hidden'),
																																									_1: {ctor: '[]'}
																																								}),
																																							_1: {
																																								ctor: '::',
																																								_0: A2(
																																									_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																									'.width-content',
																																									{
																																										ctor: '::',
																																										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'width', 'auto'),
																																										_1: {ctor: '[]'}
																																									}),
																																								_1: {
																																									ctor: '::',
																																									_0: A2(
																																										_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																										'.border-none',
																																										{
																																											ctor: '::',
																																											_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'border-width', '0'),
																																											_1: {ctor: '[]'}
																																										}),
																																									_1: {
																																										ctor: '::',
																																										_0: A2(
																																											_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																											'.border-dashed',
																																											{
																																												ctor: '::',
																																												_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'border-style', 'dashed'),
																																												_1: {ctor: '[]'}
																																											}),
																																										_1: {
																																											ctor: '::',
																																											_0: A2(
																																												_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																												'.border-dotted',
																																												{
																																													ctor: '::',
																																													_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'border-style', 'dotted'),
																																													_1: {ctor: '[]'}
																																												}),
																																											_1: {
																																												ctor: '::',
																																												_0: A2(
																																													_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																													'.border-solid',
																																													{
																																														ctor: '::',
																																														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'border-style', 'solid'),
																																														_1: {ctor: '[]'}
																																													}),
																																												_1: {
																																													ctor: '::',
																																													_0: _mdgriffith$stylish_elephants$Internal_Style$Batch(
																																														A3(
																																															_elm_lang$core$Basics$flip,
																																															_elm_lang$core$List$map,
																																															_mdgriffith$stylish_elephants$Internal_Style$locations,
																																															function (loc) {
																																																var _p19 = loc;
																																																switch (_p19.ctor) {
																																																	case 'Above':
																																																		return A2(
																																																			_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																			_mdgriffith$stylish_elephants$Internal_Style$locationName(loc),
																																																			{
																																																				ctor: '::',
																																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'position', 'absolute'),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'top', '0'),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'left', '0'),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', '0'),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'width', '100%'),
																																																								_1: {
																																																									ctor: '::',
																																																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'z-index', '10'),
																																																									_1: {
																																																										ctor: '::',
																																																										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'auto'),
																																																										_1: {
																																																											ctor: '::',
																																																											_0: A2(
																																																												_mdgriffith$stylish_elephants$Internal_Style$Child,
																																																												'.height-fill',
																																																												{
																																																													ctor: '::',
																																																													_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', 'auto'),
																																																													_1: {ctor: '[]'}
																																																												}),
																																																											_1: {
																																																												ctor: '::',
																																																												_0: A2(
																																																													_mdgriffith$stylish_elephants$Internal_Style$Child,
																																																													'.se',
																																																													{
																																																														ctor: '::',
																																																														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'position', 'absolute'),
																																																														_1: {
																																																															ctor: '::',
																																																															_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'bottom', '0'),
																																																															_1: {ctor: '[]'}
																																																														}
																																																													}),
																																																												_1: {ctor: '[]'}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			});
																																																	case 'Below':
																																																		return A2(
																																																			_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																			_mdgriffith$stylish_elephants$Internal_Style$locationName(loc),
																																																			{
																																																				ctor: '::',
																																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'position', 'absolute'),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'bottom', '0'),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', '0'),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'width', '100%'),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'z-index', '10'),
																																																								_1: {
																																																									ctor: '::',
																																																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'auto'),
																																																									_1: {
																																																										ctor: '::',
																																																										_0: A2(
																																																											_mdgriffith$stylish_elephants$Internal_Style$Child,
																																																											'.height-fill',
																																																											{
																																																												ctor: '::',
																																																												_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', 'auto'),
																																																												_1: {ctor: '[]'}
																																																											}),
																																																										_1: {ctor: '[]'}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			});
																																																	case 'OnRight':
																																																		return A2(
																																																			_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																			_mdgriffith$stylish_elephants$Internal_Style$locationName(loc),
																																																			{
																																																				ctor: '::',
																																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'position', 'absolute'),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'left', '100%'),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', '100%'),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'z-index', '10'),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'auto'),
																																																								_1: {ctor: '[]'}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			});
																																																	case 'OnLeft':
																																																		return A2(
																																																			_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																			_mdgriffith$stylish_elephants$Internal_Style$locationName(loc),
																																																			{
																																																				ctor: '::',
																																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'position', 'absolute'),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'right', '100%'),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', '100%'),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'z-index', '10'),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'auto'),
																																																								_1: {ctor: '[]'}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			});
																																																	case 'Within':
																																																		return A2(
																																																			_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																			_mdgriffith$stylish_elephants$Internal_Style$locationName(loc),
																																																			{
																																																				ctor: '::',
																																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'position', 'absolute'),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'width', '100%'),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', '100%'),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'left', '0'),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'top', '0'),
																																																								_1: {
																																																									ctor: '::',
																																																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'z-index', '10'),
																																																									_1: {
																																																										ctor: '::',
																																																										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'auto'),
																																																										_1: {ctor: '[]'}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			});
																																																	default:
																																																		return A2(
																																																			_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																			_mdgriffith$stylish_elephants$Internal_Style$locationName(loc),
																																																			{
																																																				ctor: '::',
																																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'position', 'absolute'),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'width', '100%'),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', '100%'),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'left', '0'),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'top', '0'),
																																																								_1: {
																																																									ctor: '::',
																																																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'z-index', '0'),
																																																									_1: {
																																																										ctor: '::',
																																																										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'auto'),
																																																										_1: {ctor: '[]'}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			});
																																																}
																																															})),
																																													_1: {
																																														ctor: '::',
																																														_0: A2(
																																															_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																															'.bold',
																																															{
																																																ctor: '::',
																																																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'font-weight', '700'),
																																																_1: {
																																																	ctor: '::',
																																																	_0: A2(
																																																		_mdgriffith$stylish_elephants$Internal_Style$Child,
																																																		'.text',
																																																		{
																																																			ctor: '::',
																																																			_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'font-weight', '700'),
																																																			_1: {ctor: '[]'}
																																																		}),
																																																	_1: {ctor: '[]'}
																																																}
																																															}),
																																														_1: {
																																															ctor: '::',
																																															_0: A2(
																																																_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																'.text-light',
																																																{
																																																	ctor: '::',
																																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'font-weight', '300'),
																																																	_1: {
																																																		ctor: '::',
																																																		_0: A2(
																																																			_mdgriffith$stylish_elephants$Internal_Style$Child,
																																																			'.text',
																																																			{
																																																				ctor: '::',
																																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'font-weight', '300'),
																																																				_1: {ctor: '[]'}
																																																			}),
																																																		_1: {ctor: '[]'}
																																																	}
																																																}),
																																															_1: {
																																																ctor: '::',
																																																_0: A2(
																																																	_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																	'.italic',
																																																	{
																																																		ctor: '::',
																																																		_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'font-style', 'italic'),
																																																		_1: {
																																																			ctor: '::',
																																																			_0: A2(
																																																				_mdgriffith$stylish_elephants$Internal_Style$Child,
																																																				'.text',
																																																				{
																																																					ctor: '::',
																																																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'font-style', 'italic'),
																																																					_1: {ctor: '[]'}
																																																				}),
																																																			_1: {ctor: '[]'}
																																																		}
																																																	}),
																																																_1: {
																																																	ctor: '::',
																																																	_0: A2(
																																																		_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																		'.strike',
																																																		{
																																																			ctor: '::',
																																																			_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'text-decoration', 'line-through'),
																																																			_1: {
																																																				ctor: '::',
																																																				_0: A2(
																																																					_mdgriffith$stylish_elephants$Internal_Style$Child,
																																																					'.text',
																																																					{
																																																						ctor: '::',
																																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'text-decoration', 'line-through'),
																																																						_1: {ctor: '[]'}
																																																					}),
																																																				_1: {ctor: '[]'}
																																																			}
																																																		}),
																																																	_1: {
																																																		ctor: '::',
																																																		_0: A2(
																																																			_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																			'.underline',
																																																			{
																																																				ctor: '::',
																																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'text-decoration', 'underline'),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: A2(
																																																						_mdgriffith$stylish_elephants$Internal_Style$Child,
																																																						'.text',
																																																						{
																																																							ctor: '::',
																																																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'text-decoration', 'underline'),
																																																							_1: {ctor: '[]'}
																																																						}),
																																																					_1: {ctor: '[]'}
																																																				}
																																																			}),
																																																		_1: {
																																																			ctor: '::',
																																																			_0: A2(
																																																				_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																				'.text-justify',
																																																				{
																																																					ctor: '::',
																																																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'text-align', 'justify'),
																																																					_1: {ctor: '[]'}
																																																				}),
																																																			_1: {
																																																				ctor: '::',
																																																				_0: A2(
																																																					_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																					'.text-justify-all',
																																																					{
																																																						ctor: '::',
																																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'text-align', 'justify-all'),
																																																						_1: {ctor: '[]'}
																																																					}),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: A2(
																																																						_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																						'.text-center',
																																																						{
																																																							ctor: '::',
																																																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'text-align', 'center'),
																																																							_1: {ctor: '[]'}
																																																						}),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: A2(
																																																							_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																							'.text-right',
																																																							{
																																																								ctor: '::',
																																																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'text-align', 'right'),
																																																								_1: {ctor: '[]'}
																																																							}),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: A2(
																																																								_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																																								'.text-left',
																																																								{
																																																									ctor: '::',
																																																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'text-align', 'left'),
																																																									_1: {ctor: '[]'}
																																																								}),
																																																							_1: {ctor: '[]'}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_mdgriffith$stylish_elephants$Internal_Style$Class,
									_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Text),
									{
										ctor: '::',
										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'white-space', 'pre'),
										_1: {
											ctor: '::',
											_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'inline-block'),
											_1: {ctor: '[]'}
										}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Internal_Style$Class,
										_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Spacer),
										{
											ctor: '::',
											_0: A2(
												_mdgriffith$stylish_elephants$Internal_Style$Adjacent,
												_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Any),
												{
													ctor: '::',
													_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-top', '0'),
													_1: {
														ctor: '::',
														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-left', '0'),
														_1: {ctor: '[]'}
													}
												}),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_mdgriffith$stylish_elephants$Internal_Style$Class,
											_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Single),
											{
												ctor: '::',
												_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'flex'),
												_1: {
													ctor: '::',
													_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-direction', 'column'),
													_1: {
														ctor: '::',
														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'white-space', 'pre'),
														_1: {
															ctor: '::',
															_0: A2(
																_mdgriffith$stylish_elephants$Internal_Style$Child,
																'.height-content',
																{
																	ctor: '::',
																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', 'auto'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_mdgriffith$stylish_elephants$Internal_Style$Child,
																	'.height-fill',
																	{
																		ctor: '::',
																		_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '100000'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_mdgriffith$stylish_elephants$Internal_Style$Child,
																		'.width-fill',
																		{
																			ctor: '::',
																			_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'stretch !important'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																			'.width-content',
																			{
																				ctor: '::',
																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'width', 'auto'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: _mdgriffith$stylish_elephants$Internal_Style$describeAlignment(
																				function (alignment) {
																					var _p20 = alignment;
																					switch (_p20.ctor) {
																						case 'Top':
																							return {
																								ctor: '_Tuple2',
																								_0: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'flex-start'),
																									_1: {ctor: '[]'}
																								},
																								_1: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-bottom', 'auto'),
																									_1: {ctor: '[]'}
																								}
																							};
																						case 'Bottom':
																							return {
																								ctor: '_Tuple2',
																								_0: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'flex-end'),
																									_1: {ctor: '[]'}
																								},
																								_1: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-top', 'auto'),
																									_1: {ctor: '[]'}
																								}
																							};
																						case 'Right':
																							return {
																								ctor: '_Tuple2',
																								_0: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'flex-end'),
																									_1: {ctor: '[]'}
																								},
																								_1: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'flex-end'),
																									_1: {ctor: '[]'}
																								}
																							};
																						case 'Left':
																							return {
																								ctor: '_Tuple2',
																								_0: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'flex-start'),
																									_1: {ctor: '[]'}
																								},
																								_1: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'flex-start'),
																									_1: {ctor: '[]'}
																								}
																							};
																						case 'CenterX':
																							return {
																								ctor: '_Tuple2',
																								_0: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'center'),
																									_1: {ctor: '[]'}
																								},
																								_1: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'center'),
																									_1: {ctor: '[]'}
																								}
																							};
																						default:
																							return {
																								ctor: '_Tuple2',
																								_0: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'center'),
																									_1: {ctor: '[]'}
																								},
																								_1: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-top', 'auto'),
																									_1: {
																										ctor: '::',
																										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-bottom', 'auto'),
																										_1: {ctor: '[]'}
																									}
																								}
																							};
																					}
																				}),
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}
													}
												}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_mdgriffith$stylish_elephants$Internal_Style$Class,
												'.nearby',
												{
													ctor: '::',
													_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'position', 'absolute'),
													_1: {
														ctor: '::',
														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'top', '0'),
														_1: {
															ctor: '::',
															_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'left', '0'),
															_1: {
																ctor: '::',
																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'width', '100%'),
																_1: {
																	ctor: '::',
																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', '100%'),
																	_1: {
																		ctor: '::',
																		_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'none'),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_mdgriffith$stylish_elephants$Internal_Style$Class,
													'.modal',
													{
														ctor: '::',
														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'position', 'fixed'),
														_1: {
															ctor: '::',
															_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'left', '0'),
															_1: {
																ctor: '::',
																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'top', '0'),
																_1: {
																	ctor: '::',
																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'width', '100%'),
																	_1: {
																		ctor: '::',
																		_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', '100%'),
																		_1: {
																			ctor: '::',
																			_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'pointer-events', 'none'),
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_mdgriffith$stylish_elephants$Internal_Style$Class,
														_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Row),
														{
															ctor: '::',
															_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'flex'),
															_1: {
																ctor: '::',
																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-direction', 'row'),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_mdgriffith$stylish_elephants$Internal_Style$Child,
																		_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Any),
																		{
																			ctor: '::',
																			_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-basis', '0'),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																					'.width-exact',
																					{
																						ctor: '::',
																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-basis', 'auto'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_mdgriffith$stylish_elephants$Internal_Style$Child,
																			'.height-fill',
																			{
																				ctor: '::',
																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'stretch !important'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_mdgriffith$stylish_elephants$Internal_Style$Child,
																				'.width-fill',
																				{
																					ctor: '::',
																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '100000'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_mdgriffith$stylish_elephants$Internal_Style$Child,
																					'.spacer',
																					{
																						ctor: '::',
																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-left', '0 !important'),
																						_1: {
																							ctor: '::',
																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', 'auto !important'),
																							_1: {ctor: '[]'}
																						}
																					}),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_mdgriffith$stylish_elephants$Internal_Style$Child,
																						'.spacer + .se',
																						{
																							ctor: '::',
																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-left', '0 !important'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_mdgriffith$stylish_elephants$Internal_Style$Child,
																							'.stylesheet + .se',
																							{
																								ctor: '::',
																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-left', '0 !important'),
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_mdgriffith$stylish_elephants$Internal_Style$Child,
																								'.nearby + .se',
																								{
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-left', '0 !important'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_mdgriffith$stylish_elephants$Internal_Style$Child,
																									'.container',
																									{
																										ctor: '::',
																										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '0'),
																										_1: {
																											ctor: '::',
																											_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-basis', '0'),
																											_1: {
																												ctor: '::',
																												_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'height', '100%'),
																												_1: {ctor: '[]'}
																											}
																										}
																									}),
																								_1: {
																									ctor: '::',
																									_0: A2(
																										_mdgriffith$stylish_elephants$Internal_Style$Child,
																										'alignLeft:last-of-type.align-container-left',
																										{
																											ctor: '::',
																											_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '1'),
																											_1: {ctor: '[]'}
																										}),
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_mdgriffith$stylish_elephants$Internal_Style$Child,
																											'alignRight:first-of-type.align-container-right',
																											{
																												ctor: '::',
																												_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '1'),
																												_1: {ctor: '[]'}
																											}),
																										_1: {
																											ctor: '::',
																											_0: _mdgriffith$stylish_elephants$Internal_Style$describeAlignment(
																												function (alignment) {
																													var _p21 = alignment;
																													switch (_p21.ctor) {
																														case 'Top':
																															return {
																																ctor: '_Tuple2',
																																_0: {
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'flex-start'),
																																	_1: {ctor: '[]'}
																																},
																																_1: {
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'flex-start'),
																																	_1: {ctor: '[]'}
																																}
																															};
																														case 'Bottom':
																															return {
																																ctor: '_Tuple2',
																																_0: {
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'flex-end'),
																																	_1: {ctor: '[]'}
																																},
																																_1: {
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'flex-end'),
																																	_1: {ctor: '[]'}
																																}
																															};
																														case 'Right':
																															return {
																																ctor: '_Tuple2',
																																_0: {
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'flex-end'),
																																	_1: {ctor: '[]'}
																																},
																																_1: {ctor: '[]'}
																															};
																														case 'Left':
																															return {
																																ctor: '_Tuple2',
																																_0: {
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'flex-start'),
																																	_1: {ctor: '[]'}
																																},
																																_1: {ctor: '[]'}
																															};
																														case 'CenterX':
																															return {
																																ctor: '_Tuple2',
																																_0: {
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'center'),
																																	_1: {ctor: '[]'}
																																},
																																_1: {ctor: '[]'}
																															};
																														default:
																															return {
																																ctor: '_Tuple2',
																																_0: {
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'center'),
																																	_1: {ctor: '[]'}
																																},
																																_1: {
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'center'),
																																	_1: {ctor: '[]'}
																																}
																															};
																													}
																												}),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																													'.space-evenly',
																													{
																														ctor: '::',
																														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'space-between'),
																														_1: {
																															ctor: '::',
																															_0: A2(
																																_mdgriffith$stylish_elephants$Internal_Style$Child,
																																'.spacer',
																																{
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'none'),
																																	_1: {ctor: '[]'}
																																}),
																															_1: {ctor: '[]'}
																														}
																													}),
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_mdgriffith$stylish_elephants$Internal_Style$Class,
															_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Column),
															{
																ctor: '::',
																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'flex'),
																_1: {
																	ctor: '::',
																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-direction', 'column'),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_mdgriffith$stylish_elephants$Internal_Style$Child,
																			'.height-fill',
																			{
																				ctor: '::',
																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '100000'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_mdgriffith$stylish_elephants$Internal_Style$Child,
																				'.width-fill',
																				{
																					ctor: '::',
																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'stretch !important'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_mdgriffith$stylish_elephants$Internal_Style$Child,
																					'.se:first-child',
																					{
																						ctor: '::',
																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-top', '0 !important'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_mdgriffith$stylish_elephants$Internal_Style$Child,
																						'.spacer + .se',
																						{
																							ctor: '::',
																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-top', '0'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_mdgriffith$stylish_elephants$Internal_Style$Child,
																							'.se.spacer',
																							{
																								ctor: '::',
																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-top', '0 !important'),
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_mdgriffith$stylish_elephants$Internal_Style$Child,
																								'.se.teleporting-spacer',
																								{
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-top', '0 !important'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_mdgriffith$stylish_elephants$Internal_Style$Child,
																									'.stylesheet + .se',
																									{
																										ctor: '::',
																										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-top', '0'),
																										_1: {ctor: '[]'}
																									}),
																								_1: {
																									ctor: '::',
																									_0: A2(
																										_mdgriffith$stylish_elephants$Internal_Style$Child,
																										'.nearby + .se',
																										{
																											ctor: '::',
																											_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-top', '0'),
																											_1: {ctor: '[]'}
																										}),
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_mdgriffith$stylish_elephants$Internal_Style$Child,
																											'alignTop:last-of-type.align-container-top',
																											{
																												ctor: '::',
																												_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '1'),
																												_1: {ctor: '[]'}
																											}),
																										_1: {
																											ctor: '::',
																											_0: A2(
																												_mdgriffith$stylish_elephants$Internal_Style$Child,
																												'alignBottom:first-of-type.align-container-bottom',
																												{
																													ctor: '::',
																													_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '1'),
																													_1: {ctor: '[]'}
																												}),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_mdgriffith$stylish_elephants$Internal_Style$Child,
																													'.teleporting-spacer',
																													{
																														ctor: '::',
																														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '0'),
																														_1: {ctor: '[]'}
																													}),
																												_1: {
																													ctor: '::',
																													_0: A2(
																														_mdgriffith$stylish_elephants$Internal_Style$Child,
																														'.se.self-center-y:first-child ~ .teleporting-spacer',
																														{
																															ctor: '::',
																															_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '1'),
																															_1: {
																																ctor: '::',
																																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'order', '-1'),
																																_1: {ctor: '[]'}
																															}
																														}),
																													_1: {
																														ctor: '::',
																														_0: A2(
																															_mdgriffith$stylish_elephants$Internal_Style$Child,
																															'.se.nearby + .se.self-center-y ~ .teleporting-spacer',
																															{
																																ctor: '::',
																																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '1'),
																																_1: {
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'order', '-1'),
																																	_1: {ctor: '[]'}
																																}
																															}),
																														_1: {
																															ctor: '::',
																															_0: A2(
																																_mdgriffith$stylish_elephants$Internal_Style$Child,
																																'.stylesheet + .se.self-center-y ~ .teleporting-spacer',
																																{
																																	ctor: '::',
																																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '1'),
																																	_1: {
																																		ctor: '::',
																																		_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'order', '-1'),
																																		_1: {ctor: '[]'}
																																	}
																																}),
																															_1: {
																																ctor: '::',
																																_0: _mdgriffith$stylish_elephants$Internal_Style$describeAlignment(
																																	function (alignment) {
																																		var _p22 = alignment;
																																		switch (_p22.ctor) {
																																			case 'Top':
																																				return {
																																					ctor: '_Tuple2',
																																					_0: {
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'flex-start'),
																																						_1: {ctor: '[]'}
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-bottom', 'auto'),
																																						_1: {ctor: '[]'}
																																					}
																																				};
																																			case 'Bottom':
																																				return {
																																					ctor: '_Tuple2',
																																					_0: {
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'flex-end'),
																																						_1: {ctor: '[]'}
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin-top', 'auto'),
																																						_1: {ctor: '[]'}
																																					}
																																				};
																																			case 'Right':
																																				return {
																																					ctor: '_Tuple2',
																																					_0: {
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'flex-end'),
																																						_1: {ctor: '[]'}
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'flex-end'),
																																						_1: {ctor: '[]'}
																																					}
																																				};
																																			case 'Left':
																																				return {
																																					ctor: '_Tuple2',
																																					_0: {
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'flex-start'),
																																						_1: {ctor: '[]'}
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'flex-start'),
																																						_1: {ctor: '[]'}
																																					}
																																				};
																																			case 'CenterX':
																																				return {
																																					ctor: '_Tuple2',
																																					_0: {
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'center'),
																																						_1: {ctor: '[]'}
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-self', 'center'),
																																						_1: {ctor: '[]'}
																																					}
																																				};
																																			default:
																																				return {
																																					ctor: '_Tuple2',
																																					_0: {
																																						ctor: '::',
																																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'center'),
																																						_1: {ctor: '[]'}
																																					},
																																					_1: {ctor: '[]'}
																																				};
																																		}
																																	}),
																																_1: {
																																	ctor: '::',
																																	_0: A2(
																																		_mdgriffith$stylish_elephants$Internal_Style$Child,
																																		'.container',
																																		{
																																			ctor: '::',
																																			_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-grow', '0'),
																																			_1: {
																																				ctor: '::',
																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'flex-basis', 'auto'),
																																				_1: {
																																					ctor: '::',
																																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'width', '100%'),
																																					_1: {ctor: '[]'}
																																				}
																																			}
																																		}),
																																	_1: {
																																		ctor: '::',
																																		_0: A2(
																																			_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																																			'.space-evenly',
																																			{
																																				ctor: '::',
																																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'space-between'),
																																				_1: {
																																					ctor: '::',
																																					_0: A2(
																																						_mdgriffith$stylish_elephants$Internal_Style$Child,
																																						'.spacer',
																																						{
																																							ctor: '::',
																																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'none'),
																																							_1: {ctor: '[]'}
																																						}),
																																					_1: {ctor: '[]'}
																																				}
																																			}),
																																		_1: {ctor: '[]'}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_mdgriffith$stylish_elephants$Internal_Style$Class,
																_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Grid),
																{
																	ctor: '::',
																	_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', '-ms-grid'),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_mdgriffith$stylish_elephants$Internal_Style$Supports,
																			{ctor: '_Tuple2', _0: 'display', _1: 'grid'},
																			{
																				ctor: '::',
																				_0: {ctor: '_Tuple2', _0: 'display', _1: 'grid'},
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: _mdgriffith$stylish_elephants$Internal_Style$gridAlignments(
																				function (alignment) {
																					var _p23 = alignment;
																					switch (_p23.ctor) {
																						case 'Top':
																							return {
																								ctor: '::',
																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'flex-start'),
																								_1: {ctor: '[]'}
																							};
																						case 'Bottom':
																							return {
																								ctor: '::',
																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'flex-end'),
																								_1: {ctor: '[]'}
																							};
																						case 'Right':
																							return {
																								ctor: '::',
																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'flex-end'),
																								_1: {ctor: '[]'}
																							};
																						case 'Left':
																							return {
																								ctor: '::',
																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'flex-start'),
																								_1: {ctor: '[]'}
																							};
																						case 'CenterX':
																							return {
																								ctor: '::',
																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'align-items', 'center'),
																								_1: {ctor: '[]'}
																							};
																						default:
																							return {
																								ctor: '::',
																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'justify-content', 'center'),
																								_1: {ctor: '[]'}
																							};
																					}
																				}),
																			_1: {ctor: '[]'}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_mdgriffith$stylish_elephants$Internal_Style$Class,
																	_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Page),
																	{
																		ctor: '::',
																		_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'block'),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_mdgriffith$stylish_elephants$Internal_Style$Child,
																				A2(
																					_elm_lang$core$Basics_ops['++'],
																					_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Any),
																					A2(
																						_elm_lang$core$Basics_ops['++'],
																						_mdgriffith$stylish_elephants$Internal_Style$selfName(
																							_mdgriffith$stylish_elephants$Internal_Style$Self(_mdgriffith$stylish_elephants$Internal_Style$Left)),
																						':first-child + .se')),
																				{
																					ctor: '::',
																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin', '0 !important'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_mdgriffith$stylish_elephants$Internal_Style$Child,
																					A2(
																						_elm_lang$core$Basics_ops['++'],
																						_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Any),
																						A2(
																							_elm_lang$core$Basics_ops['++'],
																							_mdgriffith$stylish_elephants$Internal_Style$selfName(
																								_mdgriffith$stylish_elephants$Internal_Style$Self(_mdgriffith$stylish_elephants$Internal_Style$Right)),
																							':first-child + .se')),
																					{
																						ctor: '::',
																						_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin', '0 !important'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: _mdgriffith$stylish_elephants$Internal_Style$describeAlignment(
																						function (alignment) {
																							var _p24 = alignment;
																							switch (_p24.ctor) {
																								case 'Top':
																									return {
																										ctor: '_Tuple2',
																										_0: {ctor: '[]'},
																										_1: {ctor: '[]'}
																									};
																								case 'Bottom':
																									return {
																										ctor: '_Tuple2',
																										_0: {ctor: '[]'},
																										_1: {ctor: '[]'}
																									};
																								case 'Right':
																									return {
																										ctor: '_Tuple2',
																										_0: {ctor: '[]'},
																										_1: {
																											ctor: '::',
																											_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'float', 'right'),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																													':after:',
																													{
																														ctor: '::',
																														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'content', '\"\"'),
																														_1: {
																															ctor: '::',
																															_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'table'),
																															_1: {
																																ctor: '::',
																																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'clear', 'both'),
																																_1: {ctor: '[]'}
																															}
																														}
																													}),
																												_1: {ctor: '[]'}
																											}
																										}
																									};
																								case 'Left':
																									return {
																										ctor: '_Tuple2',
																										_0: {ctor: '[]'},
																										_1: {
																											ctor: '::',
																											_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'float', 'left'),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_mdgriffith$stylish_elephants$Internal_Style$Descriptor,
																													':after:',
																													{
																														ctor: '::',
																														_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'content', '\"\"'),
																														_1: {
																															ctor: '::',
																															_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'table'),
																															_1: {
																																ctor: '::',
																																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'clear', 'both'),
																																_1: {ctor: '[]'}
																															}
																														}
																													}),
																												_1: {ctor: '[]'}
																											}
																										}
																									};
																								case 'CenterX':
																									return {
																										ctor: '_Tuple2',
																										_0: {ctor: '[]'},
																										_1: {ctor: '[]'}
																									};
																								default:
																									return {
																										ctor: '_Tuple2',
																										_0: {ctor: '[]'},
																										_1: {ctor: '[]'}
																									};
																							}
																						}),
																					_1: {ctor: '[]'}
																				}
																			}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_mdgriffith$stylish_elephants$Internal_Style$Class,
																		_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Paragraph),
																		{
																			ctor: '::',
																			_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'block'),
																			_1: {
																				ctor: '::',
																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'white-space', 'normal'),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_mdgriffith$stylish_elephants$Internal_Style$Child,
																						_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Text),
																						{
																							ctor: '::',
																							_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'inline'),
																							_1: {
																								ctor: '::',
																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'white-space', 'normal'),
																								_1: {ctor: '[]'}
																							}
																						}),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_mdgriffith$stylish_elephants$Internal_Style$Child,
																							_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Single),
																							{
																								ctor: '::',
																								_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'inline-flex'),
																								_1: {
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'white-space', 'normal'),
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_mdgriffith$stylish_elephants$Internal_Style$Child,
																											_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Text),
																											{
																												ctor: '::',
																												_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'inline'),
																												_1: {
																													ctor: '::',
																													_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'white-space', 'normal'),
																													_1: {ctor: '[]'}
																												}
																											}),
																										_1: {ctor: '[]'}
																									}
																								}
																							}),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_mdgriffith$stylish_elephants$Internal_Style$Child,
																								_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Row),
																								{
																									ctor: '::',
																									_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'inline-flex'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_mdgriffith$stylish_elephants$Internal_Style$Child,
																									_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Column),
																									{
																										ctor: '::',
																										_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'inline-flex'),
																										_1: {ctor: '[]'}
																									}),
																								_1: {
																									ctor: '::',
																									_0: A2(
																										_mdgriffith$stylish_elephants$Internal_Style$Child,
																										_mdgriffith$stylish_elephants$Internal_Style$class(_mdgriffith$stylish_elephants$Internal_Style$Grid),
																										{
																											ctor: '::',
																											_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'inline-grid'),
																											_1: {ctor: '[]'}
																										}),
																									_1: {
																										ctor: '::',
																										_0: _mdgriffith$stylish_elephants$Internal_Style$describeAlignment(
																											function (alignment) {
																												var _p25 = alignment;
																												switch (_p25.ctor) {
																													case 'Top':
																														return {
																															ctor: '_Tuple2',
																															_0: {ctor: '[]'},
																															_1: {ctor: '[]'}
																														};
																													case 'Bottom':
																														return {
																															ctor: '_Tuple2',
																															_0: {ctor: '[]'},
																															_1: {ctor: '[]'}
																														};
																													case 'Right':
																														return {
																															ctor: '_Tuple2',
																															_0: {ctor: '[]'},
																															_1: {
																																ctor: '::',
																																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'float', 'right'),
																																_1: {ctor: '[]'}
																															}
																														};
																													case 'Left':
																														return {
																															ctor: '_Tuple2',
																															_0: {ctor: '[]'},
																															_1: {
																																ctor: '::',
																																_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'float', 'left'),
																																_1: {ctor: '[]'}
																															}
																														};
																													case 'CenterX':
																														return {
																															ctor: '_Tuple2',
																															_0: {ctor: '[]'},
																															_1: {ctor: '[]'}
																														};
																													default:
																														return {
																															ctor: '_Tuple2',
																															_0: {ctor: '[]'},
																															_1: {ctor: '[]'}
																														};
																												}
																											}),
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_mdgriffith$stylish_elephants$Internal_Style$Class,
																			'.ignore',
																			{
																				ctor: '::',
																				_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'margin', '0 !important'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_mdgriffith$stylish_elephants$Internal_Style$Class,
																				'.hidden',
																				{
																					ctor: '::',
																					_0: A2(_mdgriffith$stylish_elephants$Internal_Style$Prop, 'display', 'none'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _mdgriffith$stylish_elephants$Internal_Style$viewportRules = A2(_elm_lang$core$Basics_ops['++'], 'html, body {\n    height: 100%;\n    width: 100%;\n} ', _mdgriffith$stylish_elephants$Internal_Style$rules);
var _mdgriffith$stylish_elephants$Internal_Style$viewportRulesElement = A3(
	_elm_lang$html$Html$node,
	'style',
	{ctor: '[]'},
	{
		ctor: '::',
		_0: _elm_lang$html$Html$text(_mdgriffith$stylish_elephants$Internal_Style$viewportRules),
		_1: {ctor: '[]'}
	});
var _mdgriffith$stylish_elephants$Internal_Style$rulesElement = A3(
	_elm_lang$html$Html$node,
	'style',
	{ctor: '[]'},
	{
		ctor: '::',
		_0: _elm_lang$html$Html$text(_mdgriffith$stylish_elephants$Internal_Style$rules),
		_1: {ctor: '[]'}
	});

var _mdgriffith$stylish_elephants$Internal_Model$locationClass = function (location) {
	var _p0 = location;
	switch (_p0.ctor) {
		case 'Above':
			return 'se el above';
		case 'Below':
			return 'se el below';
		case 'OnRight':
			return 'se el on-right';
		case 'OnLeft':
			return 'se el on-left';
		case 'InFront':
			return 'se el infront';
		default:
			return 'se el behind';
	}
};
var _mdgriffith$stylish_elephants$Internal_Model$isInt = function (x) {
	return x;
};
var _mdgriffith$stylish_elephants$Internal_Model$psuedoClassName = function ($class) {
	var _p1 = $class;
	if (_p1.ctor === 'Focus') {
		return 'focus';
	} else {
		return 'hover';
	}
};
var _mdgriffith$stylish_elephants$Internal_Model$styleKey = function (style) {
	var _p2 = style;
	switch (_p2.ctor) {
		case 'Style':
			return _p2._0;
		case 'FontSize':
			return 'fontsize';
		case 'FontFamily':
			return 'fontfamily';
		case 'Single':
			return _p2._1;
		case 'LineHeight':
			return 'lineheight';
		case 'Colored':
			return _p2._1;
		case 'SpacingStyle':
			return 'spacing';
		case 'PaddingStyle':
			return 'padding';
		case 'GridTemplateStyle':
			return 'grid-template';
		case 'GridPosition':
			return 'grid-position';
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_mdgriffith$stylish_elephants$Internal_Model$psuedoClassName(_p2._0),
				_mdgriffith$stylish_elephants$Internal_Model$styleKey(_p2._1));
	}
};
var _mdgriffith$stylish_elephants$Internal_Model$intToString = function (i) {
	var _p3 = i;
	switch (_p3) {
		case 0:
			return '0';
		case 1:
			return '1';
		case 2:
			return '2';
		case 3:
			return '3';
		case 4:
			return '4';
		case 5:
			return '5';
		case 100:
			return '100';
		case 255:
			return '255';
		default:
			return _elm_lang$core$Basics$toString(i);
	}
};
var _mdgriffith$stylish_elephants$Internal_Model$formatColor = function (color) {
	var _p4 = _elm_lang$core$Color$toRgb(color);
	var red = _p4.red;
	var green = _p4.green;
	var blue = _p4.blue;
	var alpha = _p4.alpha;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		A2(
			_elm_lang$core$Basics_ops['++'],
			'rgba(',
			_mdgriffith$stylish_elephants$Internal_Model$intToString(red)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$Basics_ops['++'],
				',',
				_mdgriffith$stylish_elephants$Internal_Model$intToString(green)),
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$Basics_ops['++'],
					',',
					_mdgriffith$stylish_elephants$Internal_Model$intToString(blue)),
				A2(
					_elm_lang$core$Basics_ops['++'],
					',',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(alpha),
						')')))));
};
var _mdgriffith$stylish_elephants$Internal_Model$floatClass = function (x) {
	return _mdgriffith$stylish_elephants$Internal_Model$intToString(
		_elm_lang$core$Basics$round(x * 100));
};
var _mdgriffith$stylish_elephants$Internal_Model$formatColorClass = function (color) {
	var _p5 = _elm_lang$core$Color$toRgb(color);
	var red = _p5.red;
	var green = _p5.green;
	var blue = _p5.blue;
	var alpha = _p5.alpha;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_mdgriffith$stylish_elephants$Internal_Model$intToString(red),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'-',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_mdgriffith$stylish_elephants$Internal_Model$intToString(green),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'-',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_mdgriffith$stylish_elephants$Internal_Model$intToString(blue),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'-',
							_mdgriffith$stylish_elephants$Internal_Model$floatClass(alpha)))))));
};
var _mdgriffith$stylish_elephants$Internal_Model$formatBoxShadow = function (shadow) {
	return A2(
		_elm_lang$core$String$join,
		' ',
		A2(
			_elm_lang$core$List$filterMap,
			_elm_lang$core$Basics$identity,
			{
				ctor: '::',
				_0: shadow.inset ? _elm_lang$core$Maybe$Just('inset') : _elm_lang$core$Maybe$Nothing,
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(
								_elm_lang$core$Tuple$first(shadow.offset)),
							'px')),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Maybe$Just(
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(
									_elm_lang$core$Tuple$second(shadow.offset)),
								'px')),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(shadow.blur),
									'px')),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Maybe$Just(
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(shadow.size),
										'px')),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Maybe$Just(
										_mdgriffith$stylish_elephants$Internal_Model$formatColor(shadow.color)),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}));
};
var _mdgriffith$stylish_elephants$Internal_Model$formatTextShadow = function (shadow) {
	return A2(
		_elm_lang$core$String$join,
		' ',
		{
			ctor: '::',
			_0: A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(
					_elm_lang$core$Tuple$first(shadow.offset)),
				'px'),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(
						_elm_lang$core$Tuple$second(shadow.offset)),
					'px'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(shadow.blur),
						'px'),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$formatColor(shadow.color),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _mdgriffith$stylish_elephants$Internal_Model$formatDropShadow = function (shadow) {
	return A2(
		_elm_lang$core$String$join,
		' ',
		{
			ctor: '::',
			_0: A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(
					_elm_lang$core$Tuple$first(shadow.offset)),
				'px'),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(
						_elm_lang$core$Tuple$second(shadow.offset)),
					'px'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(shadow.blur),
						'px'),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$formatColor(shadow.color),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _mdgriffith$stylish_elephants$Internal_Model$filterName = function (filtr) {
	var _p6 = filtr;
	switch (_p6.ctor) {
		case 'FilterUrl':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'url(',
				A2(_elm_lang$core$Basics_ops['++'], _p6._0, ')'));
		case 'Blur':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'blur(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p6._0),
					'px)'));
		case 'Brightness':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'brightness(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p6._0),
					'%)'));
		case 'Contrast':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'contrast(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p6._0),
					'%)'));
		case 'Grayscale':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'grayscale(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p6._0),
					'%)'));
		case 'HueRotate':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'hueRotate(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p6._0),
					'deg)'));
		case 'Invert':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'invert(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p6._0),
					'%)'));
		case 'OpacityFilter':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'opacity(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p6._0),
					'%)'));
		case 'Saturate':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'saturate(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p6._0),
					'%)'));
		case 'Sepia':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'sepia(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p6._0),
					'%)'));
		default:
			var _p7 = _p6._0;
			var shadowModel = {offset: _p7.offset, size: _p7.size, blur: _p7.blur, color: _p7.color};
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'drop-shadow(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_mdgriffith$stylish_elephants$Internal_Model$formatDropShadow(shadowModel),
					')'));
	}
};
var _mdgriffith$stylish_elephants$Internal_Model$lengthClassName = function (x) {
	var _p8 = x;
	switch (_p8.ctor) {
		case 'Px':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_mdgriffith$stylish_elephants$Internal_Model$intToString(_p8._0),
				'px');
		case 'Content':
			return 'auto';
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_mdgriffith$stylish_elephants$Internal_Model$intToString(_p8._0),
				'fr');
	}
};
var _mdgriffith$stylish_elephants$Internal_Model$getStyleName = function (style) {
	getStyleName:
	while (true) {
		var _p9 = style;
		switch (_p9.ctor) {
			case 'Style':
				return _p9._0;
			case 'LineHeight':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'line-height-',
					_mdgriffith$stylish_elephants$Internal_Model$floatClass(_p9._0));
			case 'FontFamily':
				return _p9._0;
			case 'FontSize':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'font-size-',
					_elm_lang$core$Basics$toString(
						_mdgriffith$stylish_elephants$Internal_Model$isInt(_p9._0)));
			case 'Single':
				return _p9._0;
			case 'Colored':
				return _p9._0;
			case 'SpacingStyle':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'spacing-',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(
							_mdgriffith$stylish_elephants$Internal_Model$isInt(_p9._0)),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'-',
							_elm_lang$core$Basics$toString(
								_mdgriffith$stylish_elephants$Internal_Model$isInt(_p9._1)))));
			case 'PaddingStyle':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'pad-',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p9._0),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'-',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p9._1),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'-',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p9._2),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'-',
											_elm_lang$core$Basics$toString(_p9._3))))))));
			case 'GridTemplateStyle':
				var _p10 = _p9._0;
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'grid-rows-',
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_elm_lang$core$String$join,
							'-',
							A2(_elm_lang$core$List$map, _mdgriffith$stylish_elephants$Internal_Model$lengthClassName, _p10.rows)),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'-cols-',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(
									_elm_lang$core$String$join,
									'-',
									A2(_elm_lang$core$List$map, _mdgriffith$stylish_elephants$Internal_Model$lengthClassName, _p10.columns)),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'-space-x-',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_mdgriffith$stylish_elephants$Internal_Model$lengthClassName(
											_elm_lang$core$Tuple$first(_p10.spacing)),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'-space-y-',
											_mdgriffith$stylish_elephants$Internal_Model$lengthClassName(
												_elm_lang$core$Tuple$second(_p10.spacing)))))))));
			case 'GridPosition':
				var _p11 = _p9._0;
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'grid-pos-',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p11.row),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'-',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p11.col),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'-',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p11.width),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'-',
											_elm_lang$core$Basics$toString(_p11.height))))))));
			default:
				var _v7 = _p9._1;
				style = _v7;
				continue getStyleName;
		}
	}
};
var _mdgriffith$stylish_elephants$Internal_Model$reduceStyles = F2(
	function (style, _p12) {
		var _p13 = _p12;
		var _p15 = _p13._1;
		var _p14 = _p13._0;
		var styleName = _mdgriffith$stylish_elephants$Internal_Model$getStyleName(style);
		return A2(_elm_lang$core$Set$member, styleName, _p14) ? {ctor: '_Tuple2', _0: _p14, _1: _p15} : {
			ctor: '_Tuple2',
			_0: A2(_elm_lang$core$Set$insert, styleName, _p14),
			_1: {ctor: '::', _0: style, _1: _p15}
		};
	});
var _mdgriffith$stylish_elephants$Internal_Model$renderFont = function (families) {
	var fontName = function (font) {
		var _p16 = font;
		switch (_p16.ctor) {
			case 'Serif':
				return 'serif';
			case 'SansSerif':
				return 'sans-serif';
			case 'Monospace':
				return 'monospace';
			case 'Typeface':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'\"',
					A2(_elm_lang$core$Basics_ops['++'], _p16._0, '\"'));
			default:
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'\"',
					A2(_elm_lang$core$Basics_ops['++'], _p16._0, '\"'));
		}
	};
	return A2(
		_elm_lang$core$String$join,
		', ',
		A2(_elm_lang$core$List$map, fontName, families));
};
var _mdgriffith$stylish_elephants$Internal_Model$focusDefaultStyle = {
	backgroundColor: _elm_lang$core$Maybe$Nothing,
	borderColor: _elm_lang$core$Maybe$Nothing,
	shadow: _elm_lang$core$Maybe$Just(
		{
			color: A3(_elm_lang$core$Color$rgb, 155, 203, 255),
			offset: {ctor: '_Tuple2', _0: 0, _1: 0},
			blur: 3,
			size: 3
		})
};
var _mdgriffith$stylish_elephants$Internal_Model$textElementFill = function (str) {
	return A3(
		_elm_lang$virtual_dom$VirtualDom$node,
		'div',
		{
			ctor: '::',
			_0: A2(
				_elm_lang$virtual_dom$VirtualDom$property,
				'className',
				_elm_lang$core$Json_Encode$string('se text width-fill height-fill')),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _elm_lang$virtual_dom$VirtualDom$text(str),
			_1: {ctor: '[]'}
		});
};
var _mdgriffith$stylish_elephants$Internal_Model$textElement = function (str) {
	return A3(
		_elm_lang$virtual_dom$VirtualDom$node,
		'div',
		{
			ctor: '::',
			_0: A2(
				_elm_lang$virtual_dom$VirtualDom$property,
				'className',
				_elm_lang$core$Json_Encode$string('se text width-content height-content')),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _elm_lang$virtual_dom$VirtualDom$text(str),
			_1: {ctor: '[]'}
		});
};
var _mdgriffith$stylish_elephants$Internal_Model$getSpacing = F2(
	function (attrs, $default) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			$default,
			A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, acc) {
						var _p17 = acc;
						if (_p17.ctor === 'Just') {
							return _elm_lang$core$Maybe$Just(_p17._0);
						} else {
							var _p18 = x;
							if ((_p18.ctor === 'StyleClass') && (_p18._0.ctor === 'SpacingStyle')) {
								return _elm_lang$core$Maybe$Just(
									{ctor: '_Tuple2', _0: _p18._0._0, _1: _p18._0._1});
							} else {
								return _elm_lang$core$Maybe$Nothing;
							}
						}
					}),
				_elm_lang$core$Maybe$Nothing,
				attrs));
	});
var _mdgriffith$stylish_elephants$Internal_Model$filter = function (attrs) {
	return _elm_lang$core$Tuple$first(
		A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, _p19) {
					var _p20 = _p19;
					var _p23 = _p20._1;
					var _p22 = _p20._0;
					var _p21 = x;
					switch (_p21.ctor) {
						case 'NoAttribute':
							return {ctor: '_Tuple2', _0: _p22, _1: _p23};
						case 'Class':
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: _p23
							};
						case 'Attr':
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: _p23
							};
						case 'StyleClass':
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: _p23
							};
						case 'Width':
							return A2(_elm_lang$core$Set$member, 'width', _p23) ? {ctor: '_Tuple2', _0: _p22, _1: _p23} : {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: A2(_elm_lang$core$Set$insert, 'width', _p23)
							};
						case 'Height':
							return A2(_elm_lang$core$Set$member, 'height', _p23) ? {ctor: '_Tuple2', _0: _p22, _1: _p23} : {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: A2(_elm_lang$core$Set$insert, 'height', _p23)
							};
						case 'Describe':
							return A2(_elm_lang$core$Set$member, 'described', _p23) ? {ctor: '_Tuple2', _0: _p22, _1: _p23} : {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: A2(_elm_lang$core$Set$insert, 'described', _p23)
							};
						case 'Nearby':
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: _p23
							};
						case 'AlignX':
							return A2(_elm_lang$core$Set$member, 'align-x', _p23) ? {ctor: '_Tuple2', _0: _p22, _1: _p23} : {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: A2(_elm_lang$core$Set$insert, 'align-x', _p23)
							};
						case 'AlignY':
							return A2(_elm_lang$core$Set$member, 'align-y', _p23) ? {ctor: '_Tuple2', _0: _p22, _1: _p23} : {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: A2(_elm_lang$core$Set$insert, 'align-y', _p23)
							};
						case 'Filter':
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: _p23
							};
						case 'BoxShadow':
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: _p23
							};
						case 'TextShadow':
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: _p23
							};
						default:
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: x, _1: _p22},
								_1: _p23
							};
					}
				}),
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Set$empty
			},
			attrs));
};
var _mdgriffith$stylish_elephants$Internal_Model$get = F2(
	function (attrs, isAttr) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, found) {
					return isAttr(x) ? {ctor: '::', _0: x, _1: found} : found;
				}),
			{ctor: '[]'},
			_mdgriffith$stylish_elephants$Internal_Model$filter(attrs));
	});
var _mdgriffith$stylish_elephants$Internal_Model$uncapitalize = function (str) {
	var tail = A2(_elm_lang$core$String$dropLeft, 1, str);
	var head = _elm_lang$core$String$toLower(
		A2(_elm_lang$core$String$left, 1, str));
	return A2(_elm_lang$core$Basics_ops['++'], head, tail);
};
var _mdgriffith$stylish_elephants$Internal_Model$className = function (x) {
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('[\\s+]'),
		function (_p24) {
			return '';
		},
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex('[A-Z0-9]+'),
			function (_p25) {
				var _p26 = _p25;
				return A2(
					_elm_lang$core$Basics_ops['++'],
					' ',
					_elm_lang$core$String$toLower(_p26.match));
			},
			A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex('[^a-zA-Z0-9_-]'),
				function (_p27) {
					return '';
				},
				_mdgriffith$stylish_elephants$Internal_Model$uncapitalize(x))));
};
var _mdgriffith$stylish_elephants$Internal_Model$addTranslate = F4(
	function (mx, my, mz, transformation) {
		var _p28 = transformation.translate;
		if (_p28.ctor === 'Nothing') {
			return _elm_lang$core$Native_Utils.update(
				transformation,
				{
					translate: _elm_lang$core$Maybe$Just(
						{ctor: '_Tuple3', _0: mx, _1: my, _2: mz})
				});
		} else {
			var addIfNothing = F2(
				function (val, existing) {
					var _p29 = existing;
					if (_p29.ctor === 'Nothing') {
						return val;
					} else {
						return _p29;
					}
				});
			return _elm_lang$core$Native_Utils.update(
				transformation,
				{
					translate: _elm_lang$core$Maybe$Just(
						{
							ctor: '_Tuple3',
							_0: A2(addIfNothing, mx, _p28._0._0),
							_1: A2(addIfNothing, my, _p28._0._1),
							_2: A2(addIfNothing, mz, _p28._0._2)
						})
				});
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$addRotate = F5(
	function (x, y, z, angle, transformation) {
		var _p30 = transformation.rotate;
		if (_p30.ctor === 'Nothing') {
			return _elm_lang$core$Native_Utils.update(
				transformation,
				{
					rotate: _elm_lang$core$Maybe$Just(
						{ctor: '_Tuple4', _0: x, _1: y, _2: z, _3: angle})
				});
		} else {
			return transformation;
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$addScale = F4(
	function (x, y, z, transformation) {
		var _p31 = transformation.scale;
		if (_p31.ctor === 'Nothing') {
			return _elm_lang$core$Native_Utils.update(
				transformation,
				{
					scale: _elm_lang$core$Maybe$Just(
						{ctor: '_Tuple3', _0: x, _1: y, _2: z})
				});
		} else {
			return transformation;
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$floorAtZero = function (x) {
	return (_elm_lang$core$Native_Utils.cmp(x, 0) > 0) ? x : 0;
};
var _mdgriffith$stylish_elephants$Internal_Model$noAreas = function (attrs) {
	var notAnArea = function (a) {
		var _p32 = a;
		if (_p32.ctor === 'Describe') {
			return false;
		} else {
			return true;
		}
	};
	return A2(_elm_lang$core$List$filter, notAnArea, attrs);
};
var _mdgriffith$stylish_elephants$Internal_Model$alignYName = function (align) {
	var _p33 = align;
	switch (_p33.ctor) {
		case 'Top':
			return 'self-top';
		case 'Bottom':
			return 'self-bottom';
		default:
			return 'self-center-y';
	}
};
var _mdgriffith$stylish_elephants$Internal_Model$alignXName = function (align) {
	var _p34 = align;
	switch (_p34.ctor) {
		case 'Left':
			return 'self-left';
		case 'Right':
			return 'self-right';
		default:
			return 'self-center-x';
	}
};
var _mdgriffith$stylish_elephants$Internal_Model$renderNode = F4(
	function (_p35, children, styles, context) {
		var _p36 = _p35;
		var _p49 = _p36.attributes;
		var _p48 = _p36.alignment;
		var createNode = F3(
			function (node, attrs, styles) {
				var _p37 = children;
				if (_p37.ctor === 'Keyed') {
					var _p39 = _p37._0;
					return A3(
						_elm_lang$virtual_dom$VirtualDom$keyedNode,
						node,
						attrs,
						function () {
							var _p38 = styles;
							if (_p38.ctor === 'Nothing') {
								return _p39;
							} else {
								return {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'stylesheet-pls-pls-pls-be-unique',
										_1: A3(
											_elm_lang$virtual_dom$VirtualDom$node,
											'style',
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('stylesheet'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text(_p38._0),
												_1: {ctor: '[]'}
											})
									},
									_1: _p39
								};
							}
						}());
				} else {
					var _p41 = _p37._0;
					return A3(
						_elm_lang$virtual_dom$VirtualDom$node,
						node,
						attrs,
						function () {
							var _p40 = styles;
							if (_p40.ctor === 'Nothing') {
								return _p41;
							} else {
								return {
									ctor: '::',
									_0: A3(
										_elm_lang$virtual_dom$VirtualDom$node,
										'style',
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('stylesheet'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text(_p40._0),
											_1: {ctor: '[]'}
										}),
									_1: _p41
								};
							}
						}());
				}
			});
		var html = function () {
			var _p42 = _p36.node;
			switch (_p42.ctor) {
				case 'Generic':
					return A3(createNode, 'div', _p49, styles);
				case 'NodeName':
					return A3(createNode, _p42._0, _p49, styles);
				default:
					return A3(
						_elm_lang$virtual_dom$VirtualDom$node,
						_p42._0,
						_p49,
						{
							ctor: '::',
							_0: A3(
								createNode,
								_p42._1,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('se el'),
									_1: {ctor: '[]'}
								},
								styles),
							_1: {ctor: '[]'}
						});
			}
		}();
		var _p43 = context;
		switch (_p43.ctor) {
			case 'AsRow':
				var _p44 = _p36.width;
				if ((_p44.ctor === 'Just') && (_p44._0.ctor === 'Fill')) {
					return html;
				} else {
					var _p45 = _p48;
					_v29_3:
					do {
						if (_p45.ctor === 'Unaligned') {
							return html;
						} else {
							if (_p45._0.ctor === 'Just') {
								switch (_p45._0._0.ctor) {
									case 'Left':
										return A3(
											_elm_lang$virtual_dom$VirtualDom$node,
											'alignLeft',
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('se el container align-container-left content-center-y'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: html,
												_1: {ctor: '[]'}
											});
									case 'Right':
										return A3(
											_elm_lang$virtual_dom$VirtualDom$node,
											'alignRight',
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('se el container align-container-right content-center-y'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: html,
												_1: {ctor: '[]'}
											});
									default:
										break _v29_3;
								}
							} else {
								break _v29_3;
							}
						}
					} while(false);
					return html;
				}
			case 'AsColumn':
				var _p46 = _p36.height;
				if ((_p46.ctor === 'Just') && (_p46._0.ctor === 'Fill')) {
					return html;
				} else {
					var _p47 = _p48;
					if (_p47.ctor === 'Unaligned') {
						return A3(
							_elm_lang$virtual_dom$VirtualDom$node,
							'alignTop',
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('se el container align-container-top'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: html,
								_1: {ctor: '[]'}
							});
					} else {
						if (_p47._1.ctor === 'Nothing') {
							return A3(
								_elm_lang$virtual_dom$VirtualDom$node,
								'alignTop',
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('se el container align-container-top'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: html,
									_1: {ctor: '[]'}
								});
						} else {
							switch (_p47._1._0.ctor) {
								case 'Top':
									return A3(
										_elm_lang$virtual_dom$VirtualDom$node,
										'alignTop',
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('se el container align-container-top'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: html,
											_1: {ctor: '[]'}
										});
								case 'Bottom':
									return A3(
										_elm_lang$virtual_dom$VirtualDom$node,
										'alignBottom',
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('se el container align-container-bottom'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: html,
											_1: {ctor: '[]'}
										});
								default:
									return html;
							}
						}
					}
				}
			default:
				return html;
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$NearbyGroup = F6(
	function (a, b, c, d, e, f) {
		return {above: a, below: b, right: c, left: d, infront: e, behind: f};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Gathered = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return {attributes: a, styles: b, alignment: c, borders: d, width: e, height: f, nearbys: g, node: h, filters: i, boxShadows: j, textShadows: k, transform: l, transformHover: m, has: n};
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
		};
	};
};
var _mdgriffith$stylish_elephants$Internal_Model$TransformationGroup = F3(
	function (a, b, c) {
		return {rotate: a, translate: b, scale: c};
	});
var _mdgriffith$stylish_elephants$Internal_Model$OptionRecord = F3(
	function (a, b, c) {
		return {hover: a, focus: b, mode: c};
	});
var _mdgriffith$stylish_elephants$Internal_Model$FocusStyle = F3(
	function (a, b, c) {
		return {borderColor: a, shadow: b, backgroundColor: c};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Shadow = F4(
	function (a, b, c, d) {
		return {color: a, offset: b, blur: c, size: d};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Empty = {ctor: 'Empty'};
var _mdgriffith$stylish_elephants$Internal_Model$Text = function (a) {
	return {ctor: 'Text', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Styled = function (a) {
	return {ctor: 'Styled', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Unstyled = function (a) {
	return {ctor: 'Unstyled', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$map = F2(
	function (fn, el) {
		var _p50 = el;
		switch (_p50.ctor) {
			case 'Styled':
				var _p51 = _p50._0;
				return _mdgriffith$stylish_elephants$Internal_Model$Styled(
					{
						styles: _p51.styles,
						html: F2(
							function (add, context) {
								return A2(
									_elm_lang$html$Html$map,
									fn,
									A2(_p51.html, add, context));
							})
					});
			case 'Unstyled':
				return _mdgriffith$stylish_elephants$Internal_Model$Unstyled(
					function (_p52) {
						return A2(
							_elm_lang$html$Html$map,
							fn,
							_p50._0(_p52));
					});
			case 'Text':
				return _mdgriffith$stylish_elephants$Internal_Model$Text(_p50._0);
			default:
				return _mdgriffith$stylish_elephants$Internal_Model$Empty;
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$unstyled = function (_p53) {
	return _mdgriffith$stylish_elephants$Internal_Model$Unstyled(
		_elm_lang$core$Basics$always(_p53));
};
var _mdgriffith$stylish_elephants$Internal_Model$rowEdgeFillers = function (children) {
	return {
		ctor: '::',
		_0: _mdgriffith$stylish_elephants$Internal_Model$unstyled(
			A3(
				_elm_lang$virtual_dom$VirtualDom$node,
				'alignLeft',
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('se container align-container-left content-center-y spacer unfocusable'),
					_1: {ctor: '[]'}
				},
				{ctor: '[]'})),
		_1: A2(
			_elm_lang$core$Basics_ops['++'],
			children,
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Internal_Model$unstyled(
					A3(
						_elm_lang$virtual_dom$VirtualDom$node,
						'alignRight',
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('se container align-container-right content-center-y spacer unfocusable'),
							_1: {ctor: '[]'}
						},
						{ctor: '[]'})),
				_1: {ctor: '[]'}
			})
	};
};
var _mdgriffith$stylish_elephants$Internal_Model$keyedRowEdgeFillers = function (children) {
	return {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'left-filler-node-pls-pls-pls-be-unique',
			_1: _mdgriffith$stylish_elephants$Internal_Model$unstyled(
				A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'alignLeft',
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('se container align-container-left content-center-y spacer unfocusable'),
						_1: {ctor: '[]'}
					},
					{ctor: '[]'}))
		},
		_1: A2(
			_elm_lang$core$Basics_ops['++'],
			children,
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'right-filler-node-pls-pls-pls-be-unique',
					_1: _mdgriffith$stylish_elephants$Internal_Model$unstyled(
						A3(
							_elm_lang$virtual_dom$VirtualDom$node,
							'alignRight',
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('se container align-container-right content-center-y spacer unfocusable'),
								_1: {ctor: '[]'}
							},
							{ctor: '[]'}))
				},
				_1: {ctor: '[]'}
			})
	};
};
var _mdgriffith$stylish_elephants$Internal_Model$columnEdgeFillers = function (children) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		children,
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Internal_Model$unstyled(
				A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'div',
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('se container align-container-top teleporting-spacer unfocusable'),
						_1: {ctor: '[]'}
					},
					{ctor: '[]'})),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Internal_Model$unstyled(
					A3(
						_elm_lang$virtual_dom$VirtualDom$node,
						'alignBottom',
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('se container align-container-bottom spacer unfocusable'),
							_1: {ctor: '[]'}
						},
						{ctor: '[]'})),
				_1: {ctor: '[]'}
			}
		});
};
var _mdgriffith$stylish_elephants$Internal_Model$keyedColumnEdgeFillers = function (children) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		children,
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'teleporting-top-filler-node-pls-pls-pls-be-unique',
				_1: _mdgriffith$stylish_elephants$Internal_Model$unstyled(
					A3(
						_elm_lang$virtual_dom$VirtualDom$node,
						'div',
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('se container align-container-top teleporting-spacer'),
							_1: {ctor: '[]'}
						},
						{ctor: '[]'}))
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'bottom-filler-node-pls-pls-pls-be-unique',
					_1: _mdgriffith$stylish_elephants$Internal_Model$unstyled(
						A3(
							_elm_lang$virtual_dom$VirtualDom$node,
							'alignBottom',
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('se container align-container-bottom spacer'),
								_1: {ctor: '[]'}
							},
							{ctor: '[]'}))
				},
				_1: {ctor: '[]'}
			}
		});
};
var _mdgriffith$stylish_elephants$Internal_Model$AsTextColumn = {ctor: 'AsTextColumn'};
var _mdgriffith$stylish_elephants$Internal_Model$asTextColumn = _mdgriffith$stylish_elephants$Internal_Model$AsTextColumn;
var _mdgriffith$stylish_elephants$Internal_Model$AsParagraph = {ctor: 'AsParagraph'};
var _mdgriffith$stylish_elephants$Internal_Model$asParagraph = _mdgriffith$stylish_elephants$Internal_Model$AsParagraph;
var _mdgriffith$stylish_elephants$Internal_Model$AsGrid = {ctor: 'AsGrid'};
var _mdgriffith$stylish_elephants$Internal_Model$asGrid = _mdgriffith$stylish_elephants$Internal_Model$AsGrid;
var _mdgriffith$stylish_elephants$Internal_Model$AsEl = {ctor: 'AsEl'};
var _mdgriffith$stylish_elephants$Internal_Model$asEl = _mdgriffith$stylish_elephants$Internal_Model$AsEl;
var _mdgriffith$stylish_elephants$Internal_Model$AsColumn = {ctor: 'AsColumn'};
var _mdgriffith$stylish_elephants$Internal_Model$asColumn = _mdgriffith$stylish_elephants$Internal_Model$AsColumn;
var _mdgriffith$stylish_elephants$Internal_Model$AsRow = {ctor: 'AsRow'};
var _mdgriffith$stylish_elephants$Internal_Model$asRow = _mdgriffith$stylish_elephants$Internal_Model$AsRow;
var _mdgriffith$stylish_elephants$Internal_Model$Aligned = F2(
	function (a, b) {
		return {ctor: 'Aligned', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Unaligned = {ctor: 'Unaligned'};
var _mdgriffith$stylish_elephants$Internal_Model$Right = {ctor: 'Right'};
var _mdgriffith$stylish_elephants$Internal_Model$CenterX = {ctor: 'CenterX'};
var _mdgriffith$stylish_elephants$Internal_Model$Left = {ctor: 'Left'};
var _mdgriffith$stylish_elephants$Internal_Model$Bottom = {ctor: 'Bottom'};
var _mdgriffith$stylish_elephants$Internal_Model$CenterY = {ctor: 'CenterY'};
var _mdgriffith$stylish_elephants$Internal_Model$Top = {ctor: 'Top'};
var _mdgriffith$stylish_elephants$Internal_Model$PseudoSelector = F2(
	function (a, b) {
		return {ctor: 'PseudoSelector', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Model$GridPosition = function (a) {
	return {ctor: 'GridPosition', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$GridTemplateStyle = function (a) {
	return {ctor: 'GridTemplateStyle', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$PaddingStyle = F4(
	function (a, b, c, d) {
		return {ctor: 'PaddingStyle', _0: a, _1: b, _2: c, _3: d};
	});
var _mdgriffith$stylish_elephants$Internal_Model$SpacingStyle = F2(
	function (a, b) {
		return {ctor: 'SpacingStyle', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Colored = F3(
	function (a, b, c) {
		return {ctor: 'Colored', _0: a, _1: b, _2: c};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Single = F3(
	function (a, b, c) {
		return {ctor: 'Single', _0: a, _1: b, _2: c};
	});
var _mdgriffith$stylish_elephants$Internal_Model$renderTransformationGroup = F2(
	function (maybePostfix, group) {
		var name = A2(
			_elm_lang$core$String$join,
			'-',
			A2(
				_elm_lang$core$List$filterMap,
				_elm_lang$core$Basics$identity,
				{
					ctor: '::',
					_0: A3(
						_elm_lang$core$Basics$flip,
						_elm_lang$core$Maybe$map,
						group.translate,
						function (_p54) {
							var _p55 = _p54;
							return A2(
								_elm_lang$core$Basics_ops['++'],
								'move-',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_mdgriffith$stylish_elephants$Internal_Model$floatClass(
										A2(_elm_lang$core$Maybe$withDefault, 0, _p55._0)),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'-',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_mdgriffith$stylish_elephants$Internal_Model$floatClass(
												A2(_elm_lang$core$Maybe$withDefault, 0, _p55._1)),
											A2(
												_elm_lang$core$Basics_ops['++'],
												'-',
												_mdgriffith$stylish_elephants$Internal_Model$floatClass(
													A2(_elm_lang$core$Maybe$withDefault, 0, _p55._2)))))));
						}),
					_1: {
						ctor: '::',
						_0: A3(
							_elm_lang$core$Basics$flip,
							_elm_lang$core$Maybe$map,
							group.scale,
							function (_p56) {
								var _p57 = _p56;
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'scale',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_mdgriffith$stylish_elephants$Internal_Model$floatClass(_p57._0),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'-',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_mdgriffith$stylish_elephants$Internal_Model$floatClass(_p57._1),
												A2(
													_elm_lang$core$Basics_ops['++'],
													'-',
													_mdgriffith$stylish_elephants$Internal_Model$floatClass(_p57._2))))));
							}),
						_1: {
							ctor: '::',
							_0: A3(
								_elm_lang$core$Basics$flip,
								_elm_lang$core$Maybe$map,
								group.rotate,
								function (_p58) {
									var _p59 = _p58;
									return A2(
										_elm_lang$core$Basics_ops['++'],
										'rotate-',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_mdgriffith$stylish_elephants$Internal_Model$floatClass(_p59._0),
											A2(
												_elm_lang$core$Basics_ops['++'],
												'-',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_mdgriffith$stylish_elephants$Internal_Model$floatClass(_p59._1),
													A2(
														_elm_lang$core$Basics_ops['++'],
														'-',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_mdgriffith$stylish_elephants$Internal_Model$floatClass(_p59._2),
															A2(
																_elm_lang$core$Basics_ops['++'],
																'-',
																_mdgriffith$stylish_elephants$Internal_Model$floatClass(_p59._3))))))));
								}),
							_1: {ctor: '[]'}
						}
					}
				}));
		var rotate = A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$Maybe$map,
			group.rotate,
			function (_p60) {
				var _p61 = _p60;
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'rotate3d(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p61._0),
						A2(
							_elm_lang$core$Basics_ops['++'],
							',',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p61._1),
								A2(
									_elm_lang$core$Basics_ops['++'],
									',',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p61._2),
										A2(
											_elm_lang$core$Basics_ops['++'],
											',',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_elm_lang$core$Basics$toString(_p61._3),
												'rad)'))))))));
			});
		var scale = A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$Maybe$map,
			group.scale,
			function (_p62) {
				var _p63 = _p62;
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'scale3d(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p63._0),
						A2(
							_elm_lang$core$Basics_ops['++'],
							', ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p63._1),
								A2(
									_elm_lang$core$Basics_ops['++'],
									', ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p63._2),
										')'))))));
			});
		var translate = A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$Maybe$map,
			group.translate,
			function (_p64) {
				var _p65 = _p64;
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'translate3d(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(
							A2(_elm_lang$core$Maybe$withDefault, 0, _p65._0)),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'px, ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(
									A2(_elm_lang$core$Maybe$withDefault, 0, _p65._1)),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'px, ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(
											A2(_elm_lang$core$Maybe$withDefault, 0, _p65._2)),
										'px)'))))));
			});
		var transformations = A2(
			_elm_lang$core$List$filterMap,
			_elm_lang$core$Basics$identity,
			{
				ctor: '::',
				_0: scale,
				_1: {
					ctor: '::',
					_0: translate,
					_1: {
						ctor: '::',
						_0: rotate,
						_1: {ctor: '[]'}
					}
				}
			});
		var _p66 = transformations;
		if (_p66.ctor === '[]') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var _p67 = function () {
				var _p68 = maybePostfix;
				if (_p68.ctor === 'Nothing') {
					return {
						ctor: '_Tuple2',
						_0: A2(_elm_lang$core$Basics_ops['++'], 'transform-', name),
						_1: A2(_elm_lang$core$Basics_ops['++'], '.transform-', name)
					};
				} else {
					var _p69 = _p68._0._0;
					return {
						ctor: '_Tuple2',
						_0: A2(
							_elm_lang$core$Basics_ops['++'],
							'transform-',
							A2(
								_elm_lang$core$Basics_ops['++'],
								name,
								A2(_elm_lang$core$Basics_ops['++'], '-', _p69))),
						_1: A2(
							_elm_lang$core$Basics_ops['++'],
							'.',
							A2(
								_elm_lang$core$Basics_ops['++'],
								'transform-',
								A2(
									_elm_lang$core$Basics_ops['++'],
									name,
									A2(
										_elm_lang$core$Basics_ops['++'],
										'-',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_p69,
											A2(_elm_lang$core$Basics_ops['++'], ':', _p68._0._1))))))
					};
				}
			}();
			var classOnElement = _p67._0;
			var classInStylesheet = _p67._1;
			var transforms = A2(_elm_lang$core$String$join, ' ', _p66);
			return _elm_lang$core$Maybe$Just(
				{
					ctor: '_Tuple2',
					_0: classOnElement,
					_1: A3(_mdgriffith$stylish_elephants$Internal_Model$Single, classInStylesheet, 'transform', transforms)
				});
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$formatTransformations = function (gathered) {
	var addTextShadows = function (_p70) {
		var _p71 = _p70;
		var _p75 = _p71._1;
		var _p74 = _p71._0;
		var _p72 = gathered.textShadows;
		if (_p72.ctor === 'Nothing') {
			return {ctor: '_Tuple2', _0: _p74, _1: _p75};
		} else {
			var _p73 = _p72._0;
			var name = A2(
				_elm_lang$core$Basics_ops['++'],
				'text-shadow-',
				_mdgriffith$stylish_elephants$Internal_Model$className(_p73));
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: name, _1: _p74},
				_1: {
					ctor: '::',
					_0: A3(
						_mdgriffith$stylish_elephants$Internal_Model$Single,
						A2(_elm_lang$core$Basics_ops['++'], '.', name),
						'text-shadow',
						_p73),
					_1: _p75
				}
			};
		}
	};
	var addBoxShadows = function (_p76) {
		var _p77 = _p76;
		var _p81 = _p77._1;
		var _p80 = _p77._0;
		var _p78 = gathered.boxShadows;
		if (_p78.ctor === 'Nothing') {
			return {ctor: '_Tuple2', _0: _p80, _1: _p81};
		} else {
			var _p79 = _p78._0;
			var name = A2(
				_elm_lang$core$Basics_ops['++'],
				'box-shadow-',
				_mdgriffith$stylish_elephants$Internal_Model$className(_p79));
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: name, _1: _p80},
				_1: {
					ctor: '::',
					_0: A3(
						_mdgriffith$stylish_elephants$Internal_Model$Single,
						A2(_elm_lang$core$Basics_ops['++'], '.', name),
						'box-shadow',
						_p79),
					_1: _p81
				}
			};
		}
	};
	var addFilters = function (_p82) {
		var _p83 = _p82;
		var _p87 = _p83._1;
		var _p86 = _p83._0;
		var _p84 = gathered.filters;
		if (_p84.ctor === 'Nothing') {
			return {ctor: '_Tuple2', _0: _p86, _1: _p87};
		} else {
			var _p85 = _p84._0;
			var name = A2(
				_elm_lang$core$Basics_ops['++'],
				'filter-',
				_mdgriffith$stylish_elephants$Internal_Model$className(_p85));
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: name, _1: _p86},
				_1: {
					ctor: '::',
					_0: A3(
						_mdgriffith$stylish_elephants$Internal_Model$Single,
						A2(_elm_lang$core$Basics_ops['++'], '.', name),
						'filter',
						_p85),
					_1: _p87
				}
			};
		}
	};
	var addHoverTransform = function (_p88) {
		var _p89 = _p88;
		var _p93 = _p89._1;
		var _p92 = _p89._0;
		var _p90 = gathered.transformHover;
		if (_p90.ctor === 'Nothing') {
			return {ctor: '_Tuple2', _0: _p92, _1: _p93};
		} else {
			var _p91 = A2(
				_mdgriffith$stylish_elephants$Internal_Model$renderTransformationGroup,
				_elm_lang$core$Maybe$Just(
					{ctor: '_Tuple2', _0: 'hover', _1: 'hover'}),
				_p90._0);
			if (_p91.ctor === 'Nothing') {
				return {ctor: '_Tuple2', _0: _p92, _1: _p93};
			} else {
				return {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: _p91._0._0, _1: _p92},
					_1: {ctor: '::', _0: _p91._0._1, _1: _p93}
				};
			}
		}
	};
	var addTransform = function (_p94) {
		var _p95 = _p94;
		var _p99 = _p95._1;
		var _p98 = _p95._0;
		var _p96 = gathered.transform;
		if (_p96.ctor === 'Nothing') {
			return {ctor: '_Tuple2', _0: _p98, _1: _p99};
		} else {
			var _p97 = A2(_mdgriffith$stylish_elephants$Internal_Model$renderTransformationGroup, _elm_lang$core$Maybe$Nothing, _p96._0);
			if (_p97.ctor === 'Nothing') {
				return {ctor: '_Tuple2', _0: _p98, _1: _p99};
			} else {
				return {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: _p97._0._0, _1: _p98},
					_1: {ctor: '::', _0: _p97._0._1, _1: _p99}
				};
			}
		}
	};
	var _p100 = addHoverTransform(
		addTransform(
			addTextShadows(
				addBoxShadows(
					addFilters(
						{
							ctor: '_Tuple2',
							_0: {ctor: '[]'},
							_1: gathered.styles
						})))));
	var classes = _p100._0;
	var styles = _p100._1;
	return _elm_lang$core$Native_Utils.update(
		gathered,
		{
			styles: styles,
			attributes: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(
					A2(_elm_lang$core$String$join, ' ', classes)),
				_1: gathered.attributes
			}
		});
};
var _mdgriffith$stylish_elephants$Internal_Model$FontSize = function (a) {
	return {ctor: 'FontSize', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$FontFamily = F2(
	function (a, b) {
		return {ctor: 'FontFamily', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Model$LineHeight = function (a) {
	return {ctor: 'LineHeight', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Style = F2(
	function (a, b) {
		return {ctor: 'Style', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Hover = {ctor: 'Hover'};
var _mdgriffith$stylish_elephants$Internal_Model$Focus = {ctor: 'Focus'};
var _mdgriffith$stylish_elephants$Internal_Model$ImportFont = F2(
	function (a, b) {
		return {ctor: 'ImportFont', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Typeface = function (a) {
	return {ctor: 'Typeface', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Monospace = {ctor: 'Monospace'};
var _mdgriffith$stylish_elephants$Internal_Model$SansSerif = {ctor: 'SansSerif'};
var _mdgriffith$stylish_elephants$Internal_Model$Serif = {ctor: 'Serif'};
var _mdgriffith$stylish_elephants$Internal_Model$Property = F2(
	function (a, b) {
		return {ctor: 'Property', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Model$renderFocusStyle = function (focus) {
	return A2(
		_mdgriffith$stylish_elephants$Internal_Model$Style,
		'.se:focus .focusable > *:not(.unfocusable), .se.focus-exactly:focus',
		A2(
			_elm_lang$core$List$filterMap,
			_elm_lang$core$Basics$identity,
			{
				ctor: '::',
				_0: A2(
					_elm_lang$core$Maybe$map,
					function (color) {
						return A2(
							_mdgriffith$stylish_elephants$Internal_Model$Property,
							'border-color',
							_mdgriffith$stylish_elephants$Internal_Model$formatColor(color));
					},
					focus.borderColor),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$core$Maybe$map,
						function (color) {
							return A2(
								_mdgriffith$stylish_elephants$Internal_Model$Property,
								'background-color',
								_mdgriffith$stylish_elephants$Internal_Model$formatColor(color));
						},
						focus.backgroundColor),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$core$Maybe$map,
							function (shadow) {
								return A2(
									_mdgriffith$stylish_elephants$Internal_Model$Property,
									'box-shadow',
									_mdgriffith$stylish_elephants$Internal_Model$formatBoxShadow(
										{color: shadow.color, offset: shadow.offset, inset: false, blur: shadow.blur, size: shadow.size}));
							},
							focus.shadow),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(
								A2(_mdgriffith$stylish_elephants$Internal_Model$Property, 'outline', 'none')),
							_1: {ctor: '[]'}
						}
					}
				}
			}));
};
var _mdgriffith$stylish_elephants$Internal_Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var renderTopLevels = function (rule) {
			var _p101 = rule;
			if (_p101.ctor === 'FontFamily') {
				var getImports = function (font) {
					var _p102 = font;
					if (_p102.ctor === 'ImportFont') {
						return _elm_lang$core$Maybe$Just(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'@import url(\'',
								A2(_elm_lang$core$Basics_ops['++'], _p102._1, '\');')));
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				};
				return _elm_lang$core$Maybe$Just(
					A2(
						_elm_lang$core$String$join,
						'\n',
						A2(_elm_lang$core$List$filterMap, getImports, _p101._1)));
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		};
		var renderProps = F3(
			function (force, _p103, existing) {
				var _p104 = _p103;
				var _p106 = _p104._1;
				var _p105 = _p104._0;
				return force ? A2(
					_elm_lang$core$Basics_ops['++'],
					existing,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\n  ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p105,
							A2(
								_elm_lang$core$Basics_ops['++'],
								': ',
								A2(_elm_lang$core$Basics_ops['++'], _p106, ' !important;'))))) : A2(
					_elm_lang$core$Basics_ops['++'],
					existing,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\n  ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p105,
							A2(
								_elm_lang$core$Basics_ops['++'],
								': ',
								A2(_elm_lang$core$Basics_ops['++'], _p106, ';')))));
			});
		var renderStyle = F4(
			function (force, maybePseudo, selector, props) {
				var _p107 = maybePseudo;
				if (_p107.ctor === 'Nothing') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						selector,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'{',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A3(
									_elm_lang$core$List$foldl,
									renderProps(force),
									'',
									props),
								'\n}')));
				} else {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						selector,
						A2(
							_elm_lang$core$Basics_ops['++'],
							':',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_p107._0,
								A2(
									_elm_lang$core$Basics_ops['++'],
									' {',
									A2(
										_elm_lang$core$Basics_ops['++'],
										A3(
											_elm_lang$core$List$foldl,
											renderProps(force),
											'',
											props),
										'\n}')))));
				}
			});
		var renderStyleRule = F3(
			function (rule, maybePseudo, force) {
				renderStyleRule:
				while (true) {
					var _p108 = rule;
					switch (_p108.ctor) {
						case 'Style':
							return A4(renderStyle, force, maybePseudo, _p108._0, _p108._1);
						case 'FontSize':
							var _p109 = _p108._0;
							return A4(
								renderStyle,
								force,
								maybePseudo,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'.font-size-',
									_mdgriffith$stylish_elephants$Internal_Model$intToString(_p109)),
								{
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Internal_Model$Property,
										'font-size',
										_mdgriffith$stylish_elephants$Internal_Model$intToString(_p109)),
									_1: {ctor: '[]'}
								});
						case 'FontFamily':
							return A4(
								renderStyle,
								force,
								maybePseudo,
								A2(_elm_lang$core$Basics_ops['++'], '.', _p108._0),
								{
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Internal_Model$Property,
										'font-family',
										_mdgriffith$stylish_elephants$Internal_Model$renderFont(_p108._1)),
									_1: {ctor: '[]'}
								});
						case 'LineHeight':
							var _p110 = _p108._0;
							return A4(
								renderStyle,
								force,
								maybePseudo,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'.line-height-',
									_mdgriffith$stylish_elephants$Internal_Model$floatClass(_p110)),
								{
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Internal_Model$Property,
										'line-height',
										_elm_lang$core$Basics$toString(_p110)),
									_1: {ctor: '[]'}
								});
						case 'Single':
							return A4(
								renderStyle,
								force,
								maybePseudo,
								_p108._0,
								{
									ctor: '::',
									_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Property, _p108._1, _p108._2),
									_1: {ctor: '[]'}
								});
						case 'Colored':
							return A4(
								renderStyle,
								force,
								maybePseudo,
								_p108._0,
								{
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Internal_Model$Property,
										_p108._1,
										_mdgriffith$stylish_elephants$Internal_Model$formatColor(_p108._2)),
									_1: {ctor: '[]'}
								});
						case 'SpacingStyle':
							var _p112 = _p108._1;
							var _p111 = _p108._0;
							var $class = A2(
								_elm_lang$core$Basics_ops['++'],
								'.spacing-',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p111),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'-',
										_elm_lang$core$Basics$toString(_p112))));
							return A3(
								_elm_lang$core$List$foldl,
								F2(
									function (x, y) {
										return A2(_elm_lang$core$Basics_ops['++'], x, y);
									}),
								'',
								{
									ctor: '::',
									_0: A4(
										renderStyle,
										force,
										maybePseudo,
										A2(_elm_lang$core$Basics_ops['++'], $class, '.row > .se'),
										{
											ctor: '::',
											_0: A2(
												_mdgriffith$stylish_elephants$Internal_Model$Property,
												'margin-left',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$Basics$toString(_p111),
													'px')),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A4(
											renderStyle,
											force,
											maybePseudo,
											A2(_elm_lang$core$Basics_ops['++'], $class, '.column > .se'),
											{
												ctor: '::',
												_0: A2(
													_mdgriffith$stylish_elephants$Internal_Model$Property,
													'margin-top',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$Basics$toString(_p112),
														'px')),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A4(
												renderStyle,
												force,
												maybePseudo,
												A2(_elm_lang$core$Basics_ops['++'], $class, '.page > .se'),
												{
													ctor: '::',
													_0: A2(
														_mdgriffith$stylish_elephants$Internal_Model$Property,
														'margin-top',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_elm_lang$core$Basics$toString(_p112),
															'px')),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A4(
													renderStyle,
													force,
													maybePseudo,
													A2(_elm_lang$core$Basics_ops['++'], $class, '.page > .self-left'),
													{
														ctor: '::',
														_0: A2(
															_mdgriffith$stylish_elephants$Internal_Model$Property,
															'margin-right',
															A2(
																_elm_lang$core$Basics_ops['++'],
																_elm_lang$core$Basics$toString(_p111),
																'px')),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A4(
														renderStyle,
														force,
														maybePseudo,
														A2(_elm_lang$core$Basics_ops['++'], $class, '.page > .self-right'),
														{
															ctor: '::',
															_0: A2(
																_mdgriffith$stylish_elephants$Internal_Model$Property,
																'margin-left',
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	_elm_lang$core$Basics$toString(_p111),
																	'px')),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A4(
															renderStyle,
															force,
															maybePseudo,
															A2(_elm_lang$core$Basics_ops['++'], $class, '.paragraph > .se'),
															{
																ctor: '::',
																_0: A2(
																	_mdgriffith$stylish_elephants$Internal_Model$Property,
																	'margin-right',
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		_elm_lang$core$Basics$toString(
																			_elm_lang$core$Basics$toFloat(_p111) / 2),
																		'px')),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_mdgriffith$stylish_elephants$Internal_Model$Property,
																		'margin-left',
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			_elm_lang$core$Basics$toString(
																				_elm_lang$core$Basics$toFloat(_p111) / 2),
																			'px')),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: A4(
																renderStyle,
																force,
																maybePseudo,
																A2(_elm_lang$core$Basics_ops['++'], $class, '.paragraph > .se'),
																{
																	ctor: '::',
																	_0: A2(
																		_mdgriffith$stylish_elephants$Internal_Model$Property,
																		'margin-bottom',
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			_elm_lang$core$Basics$toString(
																				_elm_lang$core$Basics$toFloat(_p112) / 2),
																			'px')),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_mdgriffith$stylish_elephants$Internal_Model$Property,
																			'margin-top',
																			A2(
																				_elm_lang$core$Basics_ops['++'],
																				_elm_lang$core$Basics$toString(
																					_elm_lang$core$Basics$toFloat(_p112) / 2),
																				'px')),
																		_1: {ctor: '[]'}
																	}
																}),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								});
						case 'PaddingStyle':
							var _p116 = _p108._0;
							var _p115 = _p108._1;
							var _p114 = _p108._3;
							var _p113 = _p108._2;
							var $class = A2(
								_elm_lang$core$Basics_ops['++'],
								'.pad-',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p116),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'-',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(_p115),
											A2(
												_elm_lang$core$Basics_ops['++'],
												'-',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$Basics$toString(_p113),
													A2(
														_elm_lang$core$Basics_ops['++'],
														'-',
														_elm_lang$core$Basics$toString(_p114))))))));
							return A4(
								renderStyle,
								force,
								maybePseudo,
								$class,
								{
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Internal_Model$Property,
										'padding',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(_p116),
											A2(
												_elm_lang$core$Basics_ops['++'],
												'px ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$Basics$toString(_p115),
													A2(
														_elm_lang$core$Basics_ops['++'],
														'px ',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_elm_lang$core$Basics$toString(_p113),
															A2(
																_elm_lang$core$Basics_ops['++'],
																'px ',
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	_elm_lang$core$Basics$toString(_p114),
																	'px')))))))),
									_1: {ctor: '[]'}
								});
						case 'GridTemplateStyle':
							var _p118 = _p108._0;
							var toGridLength = function (x) {
								var _p117 = x;
								switch (_p117.ctor) {
									case 'Px':
										return A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(_p117._0),
											'px');
									case 'Content':
										return 'auto';
									default:
										return A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(_p117._0),
											'fr');
								}
							};
							var columns = function (x) {
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'grid-template-columns: ',
									A2(_elm_lang$core$Basics_ops['++'], x, ';'));
							}(
								A2(
									_elm_lang$core$String$join,
									' ',
									A2(_elm_lang$core$List$map, toGridLength, _p118.columns)));
							var rows = function (x) {
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'grid-template-rows: ',
									A2(_elm_lang$core$Basics_ops['++'], x, ';'));
							}(
								A2(
									_elm_lang$core$String$join,
									' ',
									A2(_elm_lang$core$List$map, toGridLength, _p118.rows)));
							var gapX = A2(
								_elm_lang$core$Basics_ops['++'],
								'grid-column-gap:',
								A2(
									_elm_lang$core$Basics_ops['++'],
									toGridLength(
										_elm_lang$core$Tuple$first(_p118.spacing)),
									';'));
							var gapY = A2(
								_elm_lang$core$Basics_ops['++'],
								'grid-row-gap:',
								A2(
									_elm_lang$core$Basics_ops['++'],
									toGridLength(
										_elm_lang$core$Tuple$first(_p118.spacing)),
									';'));
							var xSpacing = toGridLength(
								_elm_lang$core$Tuple$first(_p118.spacing));
							var ySpacing = toGridLength(
								_elm_lang$core$Tuple$second(_p118.spacing));
							var msColumns = function (x) {
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'-ms-grid-columns: ',
									A2(_elm_lang$core$Basics_ops['++'], x, ';'));
							}(
								A2(
									_elm_lang$core$String$join,
									ySpacing,
									A2(_elm_lang$core$List$map, toGridLength, _p118.columns)));
							var msRows = function (x) {
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'-ms-grid-rows: ',
									A2(_elm_lang$core$Basics_ops['++'], x, ';'));
							}(
								A2(
									_elm_lang$core$String$join,
									ySpacing,
									A2(_elm_lang$core$List$map, toGridLength, _p118.columns)));
							var $class = A2(
								_elm_lang$core$Basics_ops['++'],
								'.grid-rows-',
								A2(
									_elm_lang$core$Basics_ops['++'],
									A2(
										_elm_lang$core$String$join,
										'-',
										A2(_elm_lang$core$List$map, _mdgriffith$stylish_elephants$Internal_Model$lengthClassName, _p118.rows)),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'-cols-',
										A2(
											_elm_lang$core$Basics_ops['++'],
											A2(
												_elm_lang$core$String$join,
												'-',
												A2(_elm_lang$core$List$map, _mdgriffith$stylish_elephants$Internal_Model$lengthClassName, _p118.columns)),
											A2(
												_elm_lang$core$Basics_ops['++'],
												'-space-x-',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_mdgriffith$stylish_elephants$Internal_Model$lengthClassName(
														_elm_lang$core$Tuple$first(_p118.spacing)),
													A2(
														_elm_lang$core$Basics_ops['++'],
														'-space-y-',
														_mdgriffith$stylish_elephants$Internal_Model$lengthClassName(
															_elm_lang$core$Tuple$second(_p118.spacing)))))))));
							var base = A2(
								_elm_lang$core$Basics_ops['++'],
								$class,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'{',
									A2(
										_elm_lang$core$Basics_ops['++'],
										msColumns,
										A2(_elm_lang$core$Basics_ops['++'], msRows, '}'))));
							var modernGrid = A2(
								_elm_lang$core$Basics_ops['++'],
								$class,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'{',
									A2(
										_elm_lang$core$Basics_ops['++'],
										columns,
										A2(
											_elm_lang$core$Basics_ops['++'],
											rows,
											A2(
												_elm_lang$core$Basics_ops['++'],
												gapX,
												A2(_elm_lang$core$Basics_ops['++'], gapY, '}'))))));
							var supports = A2(
								_elm_lang$core$Basics_ops['++'],
								'@supports (display:grid) {',
								A2(_elm_lang$core$Basics_ops['++'], modernGrid, '}'));
							return A2(_elm_lang$core$Basics_ops['++'], base, supports);
						case 'GridPosition':
							var _p119 = _p108._0;
							var modernPosition = A2(
								_elm_lang$core$String$join,
								' ',
								{
									ctor: '::',
									_0: A2(
										_elm_lang$core$Basics_ops['++'],
										'grid-row: ',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.row),
											A2(
												_elm_lang$core$Basics_ops['++'],
												' / ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.row + _p119.height),
													';')))),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$core$Basics_ops['++'],
											'grid-column: ',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.col),
												A2(
													_elm_lang$core$Basics_ops['++'],
													' / ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.col + _p119.width),
														';')))),
										_1: {ctor: '[]'}
									}
								});
							var msPosition = A2(
								_elm_lang$core$String$join,
								' ',
								{
									ctor: '::',
									_0: A2(
										_elm_lang$core$Basics_ops['++'],
										'-ms-grid-row: ',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.row),
											';')),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$core$Basics_ops['++'],
											'-ms-grid-row-span: ',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.height),
												';')),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$core$Basics_ops['++'],
												'-ms-grid-column: ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.col),
													';')),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$core$Basics_ops['++'],
													'-ms-grid-column-span: ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.width),
														';')),
												_1: {ctor: '[]'}
											}
										}
									}
								});
							var $class = A2(
								_elm_lang$core$Basics_ops['++'],
								'.grid-pos-',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.row),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'-',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.col),
											A2(
												_elm_lang$core$Basics_ops['++'],
												'-',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.width),
													A2(
														_elm_lang$core$Basics_ops['++'],
														'-',
														_mdgriffith$stylish_elephants$Internal_Model$intToString(_p119.height))))))));
							var base = A2(
								_elm_lang$core$Basics_ops['++'],
								$class,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'{',
									A2(_elm_lang$core$Basics_ops['++'], msPosition, '}')));
							var modernGrid = A2(
								_elm_lang$core$Basics_ops['++'],
								$class,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'{',
									A2(_elm_lang$core$Basics_ops['++'], modernPosition, '}')));
							var supports = A2(
								_elm_lang$core$Basics_ops['++'],
								'@supports (display:grid) {',
								A2(_elm_lang$core$Basics_ops['++'], modernGrid, '}'));
							return A2(_elm_lang$core$Basics_ops['++'], base, supports);
						default:
							var _p122 = _p108._1;
							var _p120 = _p108._0;
							if (_p120.ctor === 'Focus') {
								var _v60 = _p122,
									_v61 = _elm_lang$core$Maybe$Just('focus'),
									_v62 = false;
								rule = _v60;
								maybePseudo = _v61;
								force = _v62;
								continue renderStyleRule;
							} else {
								var _p121 = options.hover;
								switch (_p121.ctor) {
									case 'NoHover':
										return '';
									case 'AllowHover':
										var _v64 = _p122,
											_v65 = _elm_lang$core$Maybe$Just('hover'),
											_v66 = false;
										rule = _v64;
										maybePseudo = _v65;
										force = _v66;
										continue renderStyleRule;
									default:
										var _v67 = _p122,
											_v68 = _elm_lang$core$Maybe$Nothing,
											_v69 = true;
										rule = _v67;
										maybePseudo = _v68;
										force = _v69;
										continue renderStyleRule;
								}
							}
					}
				}
			});
		var combine = F2(
			function (style, rendered) {
				return _elm_lang$core$Native_Utils.update(
					rendered,
					{
						rules: A2(
							_elm_lang$core$Basics_ops['++'],
							rendered.rules,
							A3(renderStyleRule, style, _elm_lang$core$Maybe$Nothing, false)),
						topLevel: function () {
							var _p123 = renderTopLevels(style);
							if (_p123.ctor === 'Nothing') {
								return rendered.topLevel;
							} else {
								return A2(_elm_lang$core$Basics_ops['++'], rendered.topLevel, _p123._0);
							}
						}()
					});
			});
		return function (_p124) {
			var _p125 = _p124;
			return A2(_elm_lang$core$Basics_ops['++'], _p125.topLevel, _p125.rules);
		}(
			A3(
				_elm_lang$core$List$foldl,
				combine,
				{rules: '', topLevel: ''},
				stylesheet));
	});
var _mdgriffith$stylish_elephants$Internal_Model$toHtml = F2(
	function (options, el) {
		var _p126 = el;
		switch (_p126.ctor) {
			case 'Unstyled':
				return _p126._0(_mdgriffith$stylish_elephants$Internal_Model$asEl);
			case 'Styled':
				var styleSheet = A2(
					_mdgriffith$stylish_elephants$Internal_Model$toStyleSheetString,
					options,
					_elm_lang$core$Tuple$second(
						A3(
							_elm_lang$core$List$foldr,
							_mdgriffith$stylish_elephants$Internal_Model$reduceStyles,
							{
								ctor: '_Tuple2',
								_0: _elm_lang$core$Set$empty,
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Internal_Model$renderFocusStyle(options.focus),
									_1: {ctor: '[]'}
								}
							},
							_p126._0.styles)));
				return A2(
					_p126._0.html,
					_elm_lang$core$Maybe$Just(styleSheet),
					_mdgriffith$stylish_elephants$Internal_Model$asEl);
			case 'Text':
				return _mdgriffith$stylish_elephants$Internal_Model$textElement(_p126._0);
			default:
				return _mdgriffith$stylish_elephants$Internal_Model$textElement('');
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$toStyleSheet = F2(
	function (options, styleSheet) {
		return A3(
			_elm_lang$virtual_dom$VirtualDom$node,
			'style',
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(
					A2(_mdgriffith$stylish_elephants$Internal_Model$toStyleSheetString, options, styleSheet)),
				_1: {ctor: '[]'}
			});
	});
var _mdgriffith$stylish_elephants$Internal_Model$Scale = F3(
	function (a, b, c) {
		return {ctor: 'Scale', _0: a, _1: b, _2: c};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Rotate = F4(
	function (a, b, c, d) {
		return {ctor: 'Rotate', _0: a, _1: b, _2: c, _3: d};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Move = F3(
	function (a, b, c) {
		return {ctor: 'Move', _0: a, _1: b, _2: c};
	});
var _mdgriffith$stylish_elephants$Internal_Model$NoAttribute = {ctor: 'NoAttribute'};
var _mdgriffith$stylish_elephants$Internal_Model$Filter = function (a) {
	return {ctor: 'Filter', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$BoxShadow = function (a) {
	return {ctor: 'BoxShadow', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$TextShadow = function (a) {
	return {ctor: 'TextShadow', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Transform = F2(
	function (a, b) {
		return {ctor: 'Transform', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Nearby = F3(
	function (a, b, c) {
		return {ctor: 'Nearby', _0: a, _1: b, _2: c};
	});
var _mdgriffith$stylish_elephants$Internal_Model$Height = function (a) {
	return {ctor: 'Height', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Width = function (a) {
	return {ctor: 'Width', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$AlignX = function (a) {
	return {ctor: 'AlignX', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$AlignY = function (a) {
	return {ctor: 'AlignY', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$StyleClass = function (a) {
	return {ctor: 'StyleClass', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$hover = function (style) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A2(_mdgriffith$stylish_elephants$Internal_Model$PseudoSelector, _mdgriffith$stylish_elephants$Internal_Model$Hover, style));
};
var _mdgriffith$stylish_elephants$Internal_Model$adjustParagraphSpacing = function (attrs) {
	var spacing = A3(
		_elm_lang$core$List$foldr,
		F2(
			function (x, acc) {
				var _p127 = acc;
				if (_p127.ctor === 'Just') {
					return _elm_lang$core$Maybe$Just(_p127._0);
				} else {
					var _p128 = x;
					if ((_p128.ctor === 'StyleClass') && (_p128._0.ctor === 'SpacingStyle')) {
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: _p128._0._0, _1: _p128._0._1});
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				}
			}),
		_elm_lang$core$Maybe$Nothing,
		attrs);
	var adjust = F2(
		function (_p129, attribute) {
			var _p130 = _p129;
			var _p133 = _p130._1;
			var _p132 = _p130._0;
			var _p131 = attribute;
			if ((_p131.ctor === 'StyleClass') && (_p131._0.ctor === 'PaddingStyle')) {
				return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
					A4(
						_mdgriffith$stylish_elephants$Internal_Model$PaddingStyle,
						_mdgriffith$stylish_elephants$Internal_Model$floorAtZero(_p131._0._0 - ((_p133 / 2) | 0)),
						_mdgriffith$stylish_elephants$Internal_Model$floorAtZero(_p131._0._1 - ((_p132 / 2) | 0)),
						_mdgriffith$stylish_elephants$Internal_Model$floorAtZero(_p131._0._2 - ((_p133 / 2) | 0)),
						_mdgriffith$stylish_elephants$Internal_Model$floorAtZero(_p131._0._3 - ((_p132 / 2) | 0))));
			} else {
				return attribute;
			}
		});
	var _p134 = spacing;
	if (_p134.ctor === 'Nothing') {
		return attrs;
	} else {
		return A2(
			_elm_lang$core$List$map,
			adjust(
				{ctor: '_Tuple2', _0: _p134._0._0, _1: _p134._0._1}),
			attrs);
	}
};
var _mdgriffith$stylish_elephants$Internal_Model$getSpacingAttribute = F2(
	function (attrs, $default) {
		return function (_p135) {
			var _p136 = _p135;
			return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
				A2(_mdgriffith$stylish_elephants$Internal_Model$SpacingStyle, _p136._0, _p136._1));
		}(
			A2(
				_elm_lang$core$Maybe$withDefault,
				$default,
				A3(
					_elm_lang$core$List$foldr,
					F2(
						function (x, acc) {
							var _p137 = acc;
							if (_p137.ctor === 'Just') {
								return _elm_lang$core$Maybe$Just(_p137._0);
							} else {
								var _p138 = x;
								if ((_p138.ctor === 'StyleClass') && (_p138._0.ctor === 'SpacingStyle')) {
									return _elm_lang$core$Maybe$Just(
										{ctor: '_Tuple2', _0: _p138._0._0, _1: _p138._0._1});
								} else {
									return _elm_lang$core$Maybe$Nothing;
								}
							}
						}),
					_elm_lang$core$Maybe$Nothing,
					attrs)));
	});
var _mdgriffith$stylish_elephants$Internal_Model$Class = F2(
	function (a, b) {
		return {ctor: 'Class', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Model$class = function (x) {
	return A2(_mdgriffith$stylish_elephants$Internal_Model$Class, x, x);
};
var _mdgriffith$stylish_elephants$Internal_Model$Describe = function (a) {
	return {ctor: 'Describe', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Attr = function (a) {
	return {ctor: 'Attr', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$mapAttr = F2(
	function (fn, attr) {
		var _p139 = attr;
		switch (_p139.ctor) {
			case 'NoAttribute':
				return _mdgriffith$stylish_elephants$Internal_Model$NoAttribute;
			case 'Describe':
				return _mdgriffith$stylish_elephants$Internal_Model$Describe(_p139._0);
			case 'AlignX':
				return _mdgriffith$stylish_elephants$Internal_Model$AlignX(_p139._0);
			case 'AlignY':
				return _mdgriffith$stylish_elephants$Internal_Model$AlignY(_p139._0);
			case 'Width':
				return _mdgriffith$stylish_elephants$Internal_Model$Width(_p139._0);
			case 'Height':
				return _mdgriffith$stylish_elephants$Internal_Model$Height(_p139._0);
			case 'Class':
				return A2(_mdgriffith$stylish_elephants$Internal_Model$Class, _p139._0, _p139._1);
			case 'StyleClass':
				return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(_p139._0);
			case 'Nearby':
				return A3(
					_mdgriffith$stylish_elephants$Internal_Model$Nearby,
					_p139._0,
					_p139._1,
					A2(_mdgriffith$stylish_elephants$Internal_Model$map, fn, _p139._2));
			case 'Transform':
				return A2(_mdgriffith$stylish_elephants$Internal_Model$Transform, _p139._0, _p139._1);
			case 'Attr':
				return _mdgriffith$stylish_elephants$Internal_Model$Attr(
					A2(_elm_lang$html$Html_Attributes$map, fn, _p139._0));
			case 'TextShadow':
				return _mdgriffith$stylish_elephants$Internal_Model$TextShadow(_p139._0);
			case 'BoxShadow':
				return _mdgriffith$stylish_elephants$Internal_Model$BoxShadow(_p139._0);
			default:
				return _mdgriffith$stylish_elephants$Internal_Model$Filter(_p139._0);
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$htmlClass = function (cls) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		A2(
			_elm_lang$virtual_dom$VirtualDom$property,
			'className',
			_elm_lang$core$Json_Encode$string(cls)));
};
var _mdgriffith$stylish_elephants$Internal_Model$contextClasses = function (context) {
	var _p140 = context;
	switch (_p140.ctor) {
		case 'AsRow':
			return _mdgriffith$stylish_elephants$Internal_Model$htmlClass('se row');
		case 'AsColumn':
			return _mdgriffith$stylish_elephants$Internal_Model$htmlClass('se column');
		case 'AsEl':
			return _mdgriffith$stylish_elephants$Internal_Model$htmlClass('se el');
		case 'AsGrid':
			return _mdgriffith$stylish_elephants$Internal_Model$htmlClass('se grid');
		case 'AsParagraph':
			return _mdgriffith$stylish_elephants$Internal_Model$htmlClass('se paragraph');
		default:
			return _mdgriffith$stylish_elephants$Internal_Model$htmlClass('se page');
	}
};
var _mdgriffith$stylish_elephants$Internal_Model$Button = {ctor: 'Button'};
var _mdgriffith$stylish_elephants$Internal_Model$LiveAssertive = {ctor: 'LiveAssertive'};
var _mdgriffith$stylish_elephants$Internal_Model$LivePolite = {ctor: 'LivePolite'};
var _mdgriffith$stylish_elephants$Internal_Model$Label = function (a) {
	return {ctor: 'Label', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Heading = function (a) {
	return {ctor: 'Heading', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Complementary = {ctor: 'Complementary'};
var _mdgriffith$stylish_elephants$Internal_Model$ContentInfo = {ctor: 'ContentInfo'};
var _mdgriffith$stylish_elephants$Internal_Model$Navigation = {ctor: 'Navigation'};
var _mdgriffith$stylish_elephants$Internal_Model$Main = {ctor: 'Main'};
var _mdgriffith$stylish_elephants$Internal_Model$DropShadow = function (a) {
	return {ctor: 'DropShadow', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Sepia = function (a) {
	return {ctor: 'Sepia', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Saturate = function (a) {
	return {ctor: 'Saturate', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$OpacityFilter = function (a) {
	return {ctor: 'OpacityFilter', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Invert = function (a) {
	return {ctor: 'Invert', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$HueRotate = function (a) {
	return {ctor: 'HueRotate', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Grayscale = function (a) {
	return {ctor: 'Grayscale', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Contrast = function (a) {
	return {ctor: 'Contrast', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Brightness = function (a) {
	return {ctor: 'Brightness', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Blur = function (a) {
	return {ctor: 'Blur', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$FilterUrl = function (a) {
	return {ctor: 'FilterUrl', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Fill = function (a) {
	return {ctor: 'Fill', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Content = {ctor: 'Content'};
var _mdgriffith$stylish_elephants$Internal_Model$Px = function (a) {
	return {ctor: 'Px', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$AllAxis = {ctor: 'AllAxis'};
var _mdgriffith$stylish_elephants$Internal_Model$YAxis = {ctor: 'YAxis'};
var _mdgriffith$stylish_elephants$Internal_Model$XAxis = {ctor: 'XAxis'};
var _mdgriffith$stylish_elephants$Internal_Model$Behind = {ctor: 'Behind'};
var _mdgriffith$stylish_elephants$Internal_Model$InFront = {ctor: 'InFront'};
var _mdgriffith$stylish_elephants$Internal_Model$OnLeft = {ctor: 'OnLeft'};
var _mdgriffith$stylish_elephants$Internal_Model$OnRight = {ctor: 'OnRight'};
var _mdgriffith$stylish_elephants$Internal_Model$Below = {ctor: 'Below'};
var _mdgriffith$stylish_elephants$Internal_Model$Above = {ctor: 'Above'};
var _mdgriffith$stylish_elephants$Internal_Model$renderNearbyGroupAbsolute = function (nearby) {
	var create = function (_p141) {
		var _p142 = _p141;
		var _p143 = _p142._1;
		if (_p143.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			return _elm_lang$core$Maybe$Just(
				A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class(
							A2(
								_elm_lang$core$Basics_ops['++'],
								_mdgriffith$stylish_elephants$Internal_Model$locationClass(_p142._0),
								(!_p143._0._0) ? ' hidden' : '')),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _p143._0._1,
						_1: {ctor: '[]'}
					}));
		}
	};
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('se el nearby'),
			_1: {ctor: '[]'}
		},
		A2(
			_elm_lang$core$List$filterMap,
			create,
			{
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: _mdgriffith$stylish_elephants$Internal_Model$Above, _1: nearby.above},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: _mdgriffith$stylish_elephants$Internal_Model$Below, _1: nearby.below},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _mdgriffith$stylish_elephants$Internal_Model$OnLeft, _1: nearby.left},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _mdgriffith$stylish_elephants$Internal_Model$OnRight, _1: nearby.right},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: _mdgriffith$stylish_elephants$Internal_Model$InFront, _1: nearby.infront},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _mdgriffith$stylish_elephants$Internal_Model$Behind, _1: nearby.behind},
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}));
};
var _mdgriffith$stylish_elephants$Internal_Model$Embedded = F2(
	function (a, b) {
		return {ctor: 'Embedded', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Internal_Model$NodeName = function (a) {
	return {ctor: 'NodeName', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$addNodeName = F2(
	function (newNode, old) {
		var _p144 = old;
		switch (_p144.ctor) {
			case 'Generic':
				return _mdgriffith$stylish_elephants$Internal_Model$NodeName(newNode);
			case 'NodeName':
				return A2(_mdgriffith$stylish_elephants$Internal_Model$Embedded, _p144._0, newNode);
			default:
				return A2(_mdgriffith$stylish_elephants$Internal_Model$Embedded, _p144._0, _p144._1);
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$gatherAttributes = F2(
	function (attr, gathered) {
		var styleName = function (name) {
			return A2(_elm_lang$core$Basics_ops['++'], '.', name);
		};
		var formatStyleClass = function (style) {
			var _p145 = style;
			switch (_p145.ctor) {
				case 'PseudoSelector':
					return A2(
						_mdgriffith$stylish_elephants$Internal_Model$PseudoSelector,
						_p145._0,
						formatStyleClass(_p145._1));
				case 'Style':
					return A2(
						_mdgriffith$stylish_elephants$Internal_Model$Style,
						styleName(_p145._0),
						_p145._1);
				case 'Single':
					return A3(
						_mdgriffith$stylish_elephants$Internal_Model$Single,
						styleName(_p145._0),
						_p145._1,
						_p145._2);
				case 'Colored':
					return A3(
						_mdgriffith$stylish_elephants$Internal_Model$Colored,
						styleName(_p145._0),
						_p145._1,
						_p145._2);
				case 'SpacingStyle':
					return A2(_mdgriffith$stylish_elephants$Internal_Model$SpacingStyle, _p145._0, _p145._1);
				case 'PaddingStyle':
					return A4(_mdgriffith$stylish_elephants$Internal_Model$PaddingStyle, _p145._0, _p145._1, _p145._2, _p145._3);
				case 'GridTemplateStyle':
					return _mdgriffith$stylish_elephants$Internal_Model$GridTemplateStyle(_p145._0);
				case 'GridPosition':
					return _mdgriffith$stylish_elephants$Internal_Model$GridPosition(_p145._0);
				case 'LineHeight':
					return _mdgriffith$stylish_elephants$Internal_Model$LineHeight(_p145._0);
				case 'FontFamily':
					return A2(_mdgriffith$stylish_elephants$Internal_Model$FontFamily, _p145._0, _p145._1);
				default:
					return _mdgriffith$stylish_elephants$Internal_Model$FontSize(_p145._0);
			}
		};
		var className = function (name) {
			return A2(
				_elm_lang$virtual_dom$VirtualDom$property,
				'className',
				_elm_lang$core$Json_Encode$string(name));
		};
		var _p146 = attr;
		switch (_p146.ctor) {
			case 'NoAttribute':
				return gathered;
			case 'Class':
				var _p147 = _p146._0;
				return A2(_elm_lang$core$Set$member, _p147, gathered.has) ? gathered : _elm_lang$core$Native_Utils.update(
					gathered,
					{
						attributes: {
							ctor: '::',
							_0: className(_p146._1),
							_1: gathered.attributes
						},
						has: A2(_elm_lang$core$Set$insert, _p147, gathered.has)
					});
			case 'Attr':
				return _elm_lang$core$Native_Utils.update(
					gathered,
					{
						attributes: {ctor: '::', _0: _p146._0, _1: gathered.attributes}
					});
			case 'StyleClass':
				var _p149 = _p146._0;
				var key = _mdgriffith$stylish_elephants$Internal_Model$styleKey(_p149);
				return A2(_elm_lang$core$Set$member, key, gathered.has) ? gathered : _elm_lang$core$Native_Utils.update(
					gathered,
					{
						attributes: function () {
							var _p148 = _p149;
							if ((_p148.ctor === 'PseudoSelector') && (_p148._0.ctor === 'Hover')) {
								return {
									ctor: '::',
									_0: A2(
										_elm_lang$virtual_dom$VirtualDom$property,
										'className',
										_elm_lang$core$Json_Encode$string('hover-transition')),
									_1: {
										ctor: '::',
										_0: className(
											_mdgriffith$stylish_elephants$Internal_Model$getStyleName(_p149)),
										_1: gathered.attributes
									}
								};
							} else {
								return {
									ctor: '::',
									_0: className(
										_mdgriffith$stylish_elephants$Internal_Model$getStyleName(_p149)),
									_1: gathered.attributes
								};
							}
						}(),
						styles: {
							ctor: '::',
							_0: formatStyleClass(_p149),
							_1: gathered.styles
						},
						has: A2(_elm_lang$core$Set$insert, key, gathered.has)
					});
			case 'Width':
				var _p153 = _p146._0;
				if (_elm_lang$core$Native_Utils.eq(gathered.width, _elm_lang$core$Maybe$Nothing)) {
					var _p150 = _p153;
					switch (_p150.ctor) {
						case 'Px':
							var _p151 = _p150._0;
							return _elm_lang$core$Native_Utils.update(
								gathered,
								{
									width: _elm_lang$core$Maybe$Just(_p153),
									attributes: {
										ctor: '::',
										_0: className(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'width-exact width-px-',
												_elm_lang$core$Basics$toString(_p151))),
										_1: gathered.attributes
									},
									styles: {
										ctor: '::',
										_0: A3(
											_mdgriffith$stylish_elephants$Internal_Model$Single,
											styleName(
												A2(
													_elm_lang$core$Basics_ops['++'],
													'width-px-',
													_elm_lang$core$Basics$toString(_p151))),
											'width',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_elm_lang$core$Basics$toString(_p151),
												'px')),
										_1: gathered.styles
									}
								});
						case 'Content':
							return _elm_lang$core$Native_Utils.update(
								gathered,
								{
									width: _elm_lang$core$Maybe$Just(_p153),
									attributes: {
										ctor: '::',
										_0: className('width-content'),
										_1: gathered.attributes
									}
								});
						default:
							var _p152 = _p150._0;
							return _elm_lang$core$Native_Utils.eq(_p152, 1) ? _elm_lang$core$Native_Utils.update(
								gathered,
								{
									width: _elm_lang$core$Maybe$Just(_p153),
									attributes: {
										ctor: '::',
										_0: className('width-fill'),
										_1: gathered.attributes
									}
								}) : _elm_lang$core$Native_Utils.update(
								gathered,
								{
									width: _elm_lang$core$Maybe$Just(_p153),
									attributes: {
										ctor: '::',
										_0: className(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'width-fill-portion width-fill-',
												_elm_lang$core$Basics$toString(_p152))),
										_1: gathered.attributes
									},
									styles: {
										ctor: '::',
										_0: A3(
											_mdgriffith$stylish_elephants$Internal_Model$Single,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'.se.row > ',
												styleName(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'width-fill-',
														_elm_lang$core$Basics$toString(_p152)))),
											'flex-grow',
											_elm_lang$core$Basics$toString(_p152 * 100000)),
										_1: gathered.styles
									}
								});
					}
				} else {
					return gathered;
				}
			case 'Height':
				var _p157 = _p146._0;
				if (_elm_lang$core$Native_Utils.eq(gathered.height, _elm_lang$core$Maybe$Nothing)) {
					var _p154 = _p157;
					switch (_p154.ctor) {
						case 'Px':
							var _p155 = _p154._0;
							return _elm_lang$core$Native_Utils.update(
								gathered,
								{
									height: _elm_lang$core$Maybe$Just(_p157),
									attributes: {
										ctor: '::',
										_0: className(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'height-px-',
												_elm_lang$core$Basics$toString(_p155))),
										_1: gathered.attributes
									},
									styles: {
										ctor: '::',
										_0: A3(
											_mdgriffith$stylish_elephants$Internal_Model$Single,
											styleName(
												A2(
													_elm_lang$core$Basics_ops['++'],
													'height-px-',
													_elm_lang$core$Basics$toString(_p155))),
											'height',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_elm_lang$core$Basics$toString(_p155),
												'px')),
										_1: gathered.styles
									}
								});
						case 'Content':
							return _elm_lang$core$Native_Utils.update(
								gathered,
								{
									height: _elm_lang$core$Maybe$Just(_p157),
									attributes: {
										ctor: '::',
										_0: className('height-content'),
										_1: gathered.attributes
									}
								});
						default:
							var _p156 = _p154._0;
							return _elm_lang$core$Native_Utils.eq(_p156, 1) ? _elm_lang$core$Native_Utils.update(
								gathered,
								{
									height: _elm_lang$core$Maybe$Just(_p157),
									attributes: {
										ctor: '::',
										_0: className('height-fill'),
										_1: gathered.attributes
									}
								}) : _elm_lang$core$Native_Utils.update(
								gathered,
								{
									height: _elm_lang$core$Maybe$Just(_p157),
									attributes: {
										ctor: '::',
										_0: className(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'height-fill-portion height-fill-',
												_elm_lang$core$Basics$toString(_p156))),
										_1: gathered.attributes
									},
									styles: {
										ctor: '::',
										_0: A3(
											_mdgriffith$stylish_elephants$Internal_Model$Single,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'.se.column > ',
												styleName(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'height-fill-',
														_elm_lang$core$Basics$toString(_p156)))),
											'flex-grow',
											_elm_lang$core$Basics$toString(_p156 * 100000)),
										_1: gathered.styles
									}
								});
					}
				} else {
					return gathered;
				}
			case 'Describe':
				var _p158 = _p146._0;
				switch (_p158.ctor) {
					case 'Main':
						return _elm_lang$core$Native_Utils.update(
							gathered,
							{
								node: A2(_mdgriffith$stylish_elephants$Internal_Model$addNodeName, 'main', gathered.node)
							});
					case 'Navigation':
						return _elm_lang$core$Native_Utils.update(
							gathered,
							{
								node: A2(_mdgriffith$stylish_elephants$Internal_Model$addNodeName, 'nav', gathered.node)
							});
					case 'ContentInfo':
						return _elm_lang$core$Native_Utils.update(
							gathered,
							{
								node: A2(_mdgriffith$stylish_elephants$Internal_Model$addNodeName, 'footer', gathered.node)
							});
					case 'Complementary':
						return _elm_lang$core$Native_Utils.update(
							gathered,
							{
								node: A2(_mdgriffith$stylish_elephants$Internal_Model$addNodeName, 'aside', gathered.node)
							});
					case 'Heading':
						var _p159 = _p158._0;
						return (_elm_lang$core$Native_Utils.cmp(_p159, 1) < 1) ? _elm_lang$core$Native_Utils.update(
							gathered,
							{
								node: A2(_mdgriffith$stylish_elephants$Internal_Model$addNodeName, 'h1', gathered.node)
							}) : ((_elm_lang$core$Native_Utils.cmp(_p159, 7) < 0) ? _elm_lang$core$Native_Utils.update(
							gathered,
							{
								node: A2(
									_mdgriffith$stylish_elephants$Internal_Model$addNodeName,
									A2(
										_elm_lang$core$Basics_ops['++'],
										'h',
										_elm_lang$core$Basics$toString(_p159)),
									gathered.node)
							}) : _elm_lang$core$Native_Utils.update(
							gathered,
							{
								node: A2(_mdgriffith$stylish_elephants$Internal_Model$addNodeName, 'h6', gathered.node)
							}));
					case 'Button':
						return _elm_lang$core$Native_Utils.update(
							gathered,
							{
								attributes: {
									ctor: '::',
									_0: A2(_elm_lang$html$Html_Attributes$attribute, 'aria-role', 'button'),
									_1: gathered.attributes
								}
							});
					case 'Label':
						return _elm_lang$core$Native_Utils.update(
							gathered,
							{
								attributes: {
									ctor: '::',
									_0: A2(_elm_lang$html$Html_Attributes$attribute, 'aria-label', _p158._0),
									_1: gathered.attributes
								}
							});
					case 'LivePolite':
						return _elm_lang$core$Native_Utils.update(
							gathered,
							{
								attributes: {
									ctor: '::',
									_0: A2(_elm_lang$html$Html_Attributes$attribute, 'aria-live', 'polite'),
									_1: gathered.attributes
								}
							});
					default:
						return _elm_lang$core$Native_Utils.update(
							gathered,
							{
								attributes: {
									ctor: '::',
									_0: A2(_elm_lang$html$Html_Attributes$attribute, 'aria-live', 'assertive'),
									_1: gathered.attributes
								}
							});
				}
			case 'Nearby':
				var _p167 = _p146._1;
				var _p166 = _p146._2;
				var addIfEmpty = function (existing) {
					var _p160 = existing;
					if (_p160.ctor === 'Nothing') {
						var _p161 = _p166;
						switch (_p161.ctor) {
							case 'Empty':
								return _elm_lang$core$Maybe$Nothing;
							case 'Text':
								return _elm_lang$core$Maybe$Just(
									{
										ctor: '_Tuple2',
										_0: _p167,
										_1: _mdgriffith$stylish_elephants$Internal_Model$textElement(_p161._0)
									});
							case 'Unstyled':
								return _elm_lang$core$Maybe$Just(
									{
										ctor: '_Tuple2',
										_0: _p167,
										_1: _p161._0(_mdgriffith$stylish_elephants$Internal_Model$asEl)
									});
							default:
								return _elm_lang$core$Maybe$Just(
									{
										ctor: '_Tuple2',
										_0: _p167,
										_1: A2(_p161._0.html, _elm_lang$core$Maybe$Nothing, _mdgriffith$stylish_elephants$Internal_Model$asEl)
									});
						}
					} else {
						return existing;
					}
				};
				var styles = function () {
					var _p162 = _p166;
					switch (_p162.ctor) {
						case 'Empty':
							return _elm_lang$core$Maybe$Nothing;
						case 'Text':
							return _elm_lang$core$Maybe$Nothing;
						case 'Unstyled':
							return _elm_lang$core$Maybe$Nothing;
						default:
							return _elm_lang$core$Maybe$Just(
								A2(_elm_lang$core$Basics_ops['++'], gathered.styles, _p162._0.styles));
					}
				}();
				var nearbyGroup = function () {
					var _p163 = gathered.nearbys;
					if (_p163.ctor === 'Nothing') {
						return {above: _elm_lang$core$Maybe$Nothing, below: _elm_lang$core$Maybe$Nothing, right: _elm_lang$core$Maybe$Nothing, left: _elm_lang$core$Maybe$Nothing, infront: _elm_lang$core$Maybe$Nothing, behind: _elm_lang$core$Maybe$Nothing};
					} else {
						return _p163._0;
					}
				}();
				return _elm_lang$core$Native_Utils.update(
					gathered,
					{
						styles: function () {
							var _p164 = styles;
							if (_p164.ctor === 'Nothing') {
								return gathered.styles;
							} else {
								return _p164._0;
							}
						}(),
						nearbys: _elm_lang$core$Maybe$Just(
							function () {
								var _p165 = _p146._0;
								switch (_p165.ctor) {
									case 'Above':
										return _elm_lang$core$Native_Utils.update(
											nearbyGroup,
											{
												above: addIfEmpty(nearbyGroup.above)
											});
									case 'Below':
										return _elm_lang$core$Native_Utils.update(
											nearbyGroup,
											{
												below: addIfEmpty(nearbyGroup.below)
											});
									case 'OnRight':
										return _elm_lang$core$Native_Utils.update(
											nearbyGroup,
											{
												right: addIfEmpty(nearbyGroup.right)
											});
									case 'OnLeft':
										return _elm_lang$core$Native_Utils.update(
											nearbyGroup,
											{
												left: addIfEmpty(nearbyGroup.left)
											});
									case 'InFront':
										return _elm_lang$core$Native_Utils.update(
											nearbyGroup,
											{
												infront: addIfEmpty(nearbyGroup.infront)
											});
									default:
										return _elm_lang$core$Native_Utils.update(
											nearbyGroup,
											{
												behind: addIfEmpty(nearbyGroup.behind)
											});
								}
							}())
					});
			case 'AlignX':
				var _p169 = _p146._0;
				var _p168 = gathered.alignment;
				if (_p168.ctor === 'Unaligned') {
					return _elm_lang$core$Native_Utils.update(
						gathered,
						{
							attributes: {
								ctor: '::',
								_0: className(
									_mdgriffith$stylish_elephants$Internal_Model$alignXName(_p169)),
								_1: gathered.attributes
							},
							alignment: A2(
								_mdgriffith$stylish_elephants$Internal_Model$Aligned,
								_elm_lang$core$Maybe$Just(_p169),
								_elm_lang$core$Maybe$Nothing)
						});
				} else {
					if (_p168._0.ctor === 'Just') {
						return gathered;
					} else {
						return _elm_lang$core$Native_Utils.update(
							gathered,
							{
								attributes: {
									ctor: '::',
									_0: className(
										_mdgriffith$stylish_elephants$Internal_Model$alignXName(_p169)),
									_1: gathered.attributes
								},
								alignment: A2(
									_mdgriffith$stylish_elephants$Internal_Model$Aligned,
									_elm_lang$core$Maybe$Just(_p169),
									_p168._1)
							});
					}
				}
			case 'AlignY':
				var _p171 = _p146._0;
				var _p170 = gathered.alignment;
				if (_p170.ctor === 'Unaligned') {
					return _elm_lang$core$Native_Utils.update(
						gathered,
						{
							attributes: {
								ctor: '::',
								_0: className(
									_mdgriffith$stylish_elephants$Internal_Model$alignYName(_p171)),
								_1: gathered.attributes
							},
							alignment: A2(
								_mdgriffith$stylish_elephants$Internal_Model$Aligned,
								_elm_lang$core$Maybe$Nothing,
								_elm_lang$core$Maybe$Just(_p171))
						});
				} else {
					if (_p170._1.ctor === 'Just') {
						return gathered;
					} else {
						return _elm_lang$core$Native_Utils.update(
							gathered,
							{
								attributes: {
									ctor: '::',
									_0: className(
										_mdgriffith$stylish_elephants$Internal_Model$alignYName(_p171)),
									_1: gathered.attributes
								},
								alignment: A2(
									_mdgriffith$stylish_elephants$Internal_Model$Aligned,
									_p170._0,
									_elm_lang$core$Maybe$Just(_p171))
							});
					}
				}
			case 'Filter':
				var _p173 = _p146._0;
				var _p172 = gathered.filters;
				if (_p172.ctor === 'Nothing') {
					return _elm_lang$core$Native_Utils.update(
						gathered,
						{
							filters: _elm_lang$core$Maybe$Just(
								_mdgriffith$stylish_elephants$Internal_Model$filterName(_p173))
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						gathered,
						{
							filters: _elm_lang$core$Maybe$Just(
								A2(
									_elm_lang$core$Basics_ops['++'],
									_mdgriffith$stylish_elephants$Internal_Model$filterName(_p173),
									A2(_elm_lang$core$Basics_ops['++'], ' ', _p172._0)))
						});
				}
			case 'BoxShadow':
				var _p175 = _p146._0;
				var _p174 = gathered.boxShadows;
				if (_p174.ctor === 'Nothing') {
					return _elm_lang$core$Native_Utils.update(
						gathered,
						{
							boxShadows: _elm_lang$core$Maybe$Just(
								_mdgriffith$stylish_elephants$Internal_Model$formatBoxShadow(_p175))
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						gathered,
						{
							boxShadows: _elm_lang$core$Maybe$Just(
								A2(
									_elm_lang$core$Basics_ops['++'],
									_mdgriffith$stylish_elephants$Internal_Model$formatBoxShadow(_p175),
									A2(_elm_lang$core$Basics_ops['++'], ', ', _p174._0)))
						});
				}
			case 'TextShadow':
				var _p177 = _p146._0;
				var _p176 = gathered.textShadows;
				if (_p176.ctor === 'Nothing') {
					return _elm_lang$core$Native_Utils.update(
						gathered,
						{
							textShadows: _elm_lang$core$Maybe$Just(
								_mdgriffith$stylish_elephants$Internal_Model$formatTextShadow(_p177))
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						gathered,
						{
							textShadows: _elm_lang$core$Maybe$Just(
								A2(
									_elm_lang$core$Basics_ops['++'],
									_mdgriffith$stylish_elephants$Internal_Model$formatTextShadow(_p177),
									A2(_elm_lang$core$Basics_ops['++'], ', ', _p176._0)))
						});
				}
			default:
				var _p198 = _p146._0;
				var _p178 = _p146._1;
				switch (_p178.ctor) {
					case 'Move':
						var _p184 = _p178._2;
						var _p183 = _p178._1;
						var _p182 = _p178._0;
						var _p179 = _p198;
						if (_p179.ctor === 'Nothing') {
							var _p180 = gathered.transform;
							if (_p180.ctor === 'Nothing') {
								return _elm_lang$core$Native_Utils.update(
									gathered,
									{
										transform: _elm_lang$core$Maybe$Just(
											{
												translate: _elm_lang$core$Maybe$Just(
													{ctor: '_Tuple3', _0: _p182, _1: _p183, _2: _p184}),
												scale: _elm_lang$core$Maybe$Nothing,
												rotate: _elm_lang$core$Maybe$Nothing
											})
									});
							} else {
								return _elm_lang$core$Native_Utils.update(
									gathered,
									{
										transform: _elm_lang$core$Maybe$Just(
											A4(_mdgriffith$stylish_elephants$Internal_Model$addTranslate, _p182, _p183, _p184, _p180._0))
									});
							}
						} else {
							if (_p179._0.ctor === 'Hover') {
								var _p181 = gathered.transformHover;
								if (_p181.ctor === 'Nothing') {
									return _elm_lang$core$Native_Utils.update(
										gathered,
										{
											transformHover: _elm_lang$core$Maybe$Just(
												{
													translate: _elm_lang$core$Maybe$Just(
														{ctor: '_Tuple3', _0: _p182, _1: _p183, _2: _p184}),
													scale: _elm_lang$core$Maybe$Nothing,
													rotate: _elm_lang$core$Maybe$Nothing
												})
										});
								} else {
									return _elm_lang$core$Native_Utils.update(
										gathered,
										{
											transformHover: _elm_lang$core$Maybe$Just(
												A4(_mdgriffith$stylish_elephants$Internal_Model$addTranslate, _p182, _p183, _p184, _p181._0))
										});
								}
							} else {
								return gathered;
							}
						}
					case 'Rotate':
						var _p191 = _p178._2;
						var _p190 = _p178._1;
						var _p189 = _p178._0;
						var _p188 = _p178._3;
						var _p185 = _p198;
						if (_p185.ctor === 'Nothing') {
							var _p186 = gathered.transform;
							if (_p186.ctor === 'Nothing') {
								return _elm_lang$core$Native_Utils.update(
									gathered,
									{
										transform: _elm_lang$core$Maybe$Just(
											{
												rotate: _elm_lang$core$Maybe$Just(
													{ctor: '_Tuple4', _0: _p189, _1: _p190, _2: _p191, _3: _p188}),
												scale: _elm_lang$core$Maybe$Nothing,
												translate: _elm_lang$core$Maybe$Nothing
											})
									});
							} else {
								return _elm_lang$core$Native_Utils.update(
									gathered,
									{
										transform: _elm_lang$core$Maybe$Just(
											A5(_mdgriffith$stylish_elephants$Internal_Model$addRotate, _p189, _p190, _p191, _p188, _p186._0))
									});
							}
						} else {
							if (_p185._0.ctor === 'Hover') {
								var _p187 = gathered.transformHover;
								if (_p187.ctor === 'Nothing') {
									return _elm_lang$core$Native_Utils.update(
										gathered,
										{
											transformHover: _elm_lang$core$Maybe$Just(
												{
													rotate: _elm_lang$core$Maybe$Just(
														{ctor: '_Tuple4', _0: _p189, _1: _p190, _2: _p191, _3: _p188}),
													scale: _elm_lang$core$Maybe$Nothing,
													translate: _elm_lang$core$Maybe$Nothing
												})
										});
								} else {
									return _elm_lang$core$Native_Utils.update(
										gathered,
										{
											transformHover: _elm_lang$core$Maybe$Just(
												A5(_mdgriffith$stylish_elephants$Internal_Model$addRotate, _p189, _p190, _p191, _p188, _p187._0))
										});
								}
							} else {
								return gathered;
							}
						}
					default:
						var _p197 = _p178._2;
						var _p196 = _p178._1;
						var _p195 = _p178._0;
						var _p192 = _p198;
						if (_p192.ctor === 'Nothing') {
							var _p193 = gathered.transform;
							if (_p193.ctor === 'Nothing') {
								return _elm_lang$core$Native_Utils.update(
									gathered,
									{
										transform: _elm_lang$core$Maybe$Just(
											{
												scale: _elm_lang$core$Maybe$Just(
													{ctor: '_Tuple3', _0: _p195, _1: _p196, _2: _p197}),
												rotate: _elm_lang$core$Maybe$Nothing,
												translate: _elm_lang$core$Maybe$Nothing
											})
									});
							} else {
								return _elm_lang$core$Native_Utils.update(
									gathered,
									{
										transform: _elm_lang$core$Maybe$Just(
											A4(_mdgriffith$stylish_elephants$Internal_Model$addScale, _p195, _p196, _p197, _p193._0))
									});
							}
						} else {
							if (_p192._0.ctor === 'Hover') {
								var _p194 = gathered.transformHover;
								if (_p194.ctor === 'Nothing') {
									return _elm_lang$core$Native_Utils.update(
										gathered,
										{
											transformHover: _elm_lang$core$Maybe$Just(
												{
													scale: _elm_lang$core$Maybe$Just(
														{ctor: '_Tuple3', _0: _p195, _1: _p196, _2: _p197}),
													rotate: _elm_lang$core$Maybe$Nothing,
													translate: _elm_lang$core$Maybe$Nothing
												})
										});
								} else {
									return _elm_lang$core$Native_Utils.update(
										gathered,
										{
											transformHover: _elm_lang$core$Maybe$Just(
												A4(_mdgriffith$stylish_elephants$Internal_Model$addScale, _p195, _p196, _p197, _p194._0))
										});
								}
							} else {
								return gathered;
							}
						}
				}
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$Generic = {ctor: 'Generic'};
var _mdgriffith$stylish_elephants$Internal_Model$EachBorders = function (a) {
	return {ctor: 'EachBorders', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$AllBorders = function (a) {
	return {ctor: 'AllBorders', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$NoBorders = {ctor: 'NoBorders'};
var _mdgriffith$stylish_elephants$Internal_Model$initGathered = function (maybeNodeName) {
	return {
		attributes: {ctor: '[]'},
		styles: {ctor: '[]'},
		width: _elm_lang$core$Maybe$Nothing,
		height: _elm_lang$core$Maybe$Nothing,
		borders: _mdgriffith$stylish_elephants$Internal_Model$NoBorders,
		alignment: _mdgriffith$stylish_elephants$Internal_Model$Unaligned,
		node: function () {
			var _p199 = maybeNodeName;
			if (_p199.ctor === 'Nothing') {
				return _mdgriffith$stylish_elephants$Internal_Model$Generic;
			} else {
				return _mdgriffith$stylish_elephants$Internal_Model$NodeName(_p199._0);
			}
		}(),
		nearbys: _elm_lang$core$Maybe$Nothing,
		transform: _elm_lang$core$Maybe$Nothing,
		transformHover: _elm_lang$core$Maybe$Nothing,
		filters: _elm_lang$core$Maybe$Nothing,
		boxShadows: _elm_lang$core$Maybe$Nothing,
		textShadows: _elm_lang$core$Maybe$Nothing,
		has: _elm_lang$core$Set$empty
	};
};
var _mdgriffith$stylish_elephants$Internal_Model$OnlyDynamic = function (a) {
	return {ctor: 'OnlyDynamic', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$StaticRootAndDynamic = function (a) {
	return {ctor: 'StaticRootAndDynamic', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$NoStyleSheet = {ctor: 'NoStyleSheet'};
var _mdgriffith$stylish_elephants$Internal_Model$noStyleSheet = _mdgriffith$stylish_elephants$Internal_Model$NoStyleSheet;
var _mdgriffith$stylish_elephants$Internal_Model$Keyed = function (a) {
	return {ctor: 'Keyed', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$Unkeyed = function (a) {
	return {ctor: 'Unkeyed', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$asElement = F4(
	function (embedMode, children, context, rendered) {
		var gatherKeyed = F2(
			function (_p201, _p200) {
				var _p202 = _p201;
				var _p209 = _p202._0;
				var _p203 = _p200;
				var _p208 = _p203._0;
				var _p207 = _p203._1;
				var _p204 = _p202._1;
				switch (_p204.ctor) {
					case 'Unstyled':
						return {
							ctor: '_Tuple2',
							_0: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _p209,
									_1: _p204._0(context)
								},
								_1: _p208
							},
							_1: _p207
						};
					case 'Styled':
						var _p205 = _p204._0;
						return {
							ctor: '_Tuple2',
							_0: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _p209,
									_1: A2(_p205.html, _elm_lang$core$Maybe$Nothing, context)
								},
								_1: _p208
							},
							_1: A2(_elm_lang$core$Basics_ops['++'], _p205.styles, _p207)
						};
					case 'Text':
						var _p206 = _p204._0;
						return (_elm_lang$core$Native_Utils.eq(
							rendered.width,
							_elm_lang$core$Maybe$Just(_mdgriffith$stylish_elephants$Internal_Model$Content)) && (_elm_lang$core$Native_Utils.eq(
							rendered.height,
							_elm_lang$core$Maybe$Just(_mdgriffith$stylish_elephants$Internal_Model$Content)) && _elm_lang$core$Native_Utils.eq(context, _mdgriffith$stylish_elephants$Internal_Model$asEl))) ? {
							ctor: '_Tuple2',
							_0: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _p209,
									_1: _elm_lang$html$Html$text(_p206)
								},
								_1: _p208
							},
							_1: _p207
						} : {
							ctor: '_Tuple2',
							_0: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _p209,
									_1: _mdgriffith$stylish_elephants$Internal_Model$textElement(_p206)
								},
								_1: _p208
							},
							_1: _p207
						};
					default:
						return {ctor: '_Tuple2', _0: _p208, _1: _p207};
				}
			});
		var gather = F2(
			function (child, _p210) {
				var _p211 = _p210;
				var _p216 = _p211._0;
				var _p215 = _p211._1;
				var _p212 = child;
				switch (_p212.ctor) {
					case 'Unstyled':
						return {
							ctor: '_Tuple2',
							_0: {
								ctor: '::',
								_0: _p212._0(context),
								_1: _p216
							},
							_1: _p215
						};
					case 'Styled':
						var _p213 = _p212._0;
						return {
							ctor: '_Tuple2',
							_0: {
								ctor: '::',
								_0: A2(_p213.html, _elm_lang$core$Maybe$Nothing, context),
								_1: _p216
							},
							_1: A2(_elm_lang$core$Basics_ops['++'], _p213.styles, _p215)
						};
					case 'Text':
						var _p214 = _p212._0;
						return (_elm_lang$core$Native_Utils.eq(
							rendered.width,
							_elm_lang$core$Maybe$Just(_mdgriffith$stylish_elephants$Internal_Model$Content)) && (_elm_lang$core$Native_Utils.eq(
							rendered.height,
							_elm_lang$core$Maybe$Just(_mdgriffith$stylish_elephants$Internal_Model$Content)) && _elm_lang$core$Native_Utils.eq(context, _mdgriffith$stylish_elephants$Internal_Model$asEl))) ? {
							ctor: '_Tuple2',
							_0: {
								ctor: '::',
								_0: _elm_lang$html$Html$text(_p214),
								_1: _p216
							},
							_1: _p215
						} : (_elm_lang$core$Native_Utils.eq(context, _mdgriffith$stylish_elephants$Internal_Model$asEl) ? {
							ctor: '_Tuple2',
							_0: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Internal_Model$textElementFill(_p214),
								_1: _p216
							},
							_1: _p215
						} : {
							ctor: '_Tuple2',
							_0: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Internal_Model$textElement(_p214),
								_1: _p216
							},
							_1: _p215
						});
					default:
						return {ctor: '_Tuple2', _0: _p216, _1: _p215};
				}
			});
		var _p217 = function () {
			var _p218 = children;
			if (_p218.ctor === 'Keyed') {
				return A2(
					_elm_lang$core$Tuple$mapFirst,
					_mdgriffith$stylish_elephants$Internal_Model$Keyed,
					A3(
						_elm_lang$core$List$foldr,
						gatherKeyed,
						{
							ctor: '_Tuple2',
							_0: {ctor: '[]'},
							_1: rendered.styles
						},
						_p218._0));
			} else {
				return A2(
					_elm_lang$core$Tuple$mapFirst,
					_mdgriffith$stylish_elephants$Internal_Model$Unkeyed,
					A3(
						_elm_lang$core$List$foldr,
						gather,
						{
							ctor: '_Tuple2',
							_0: {ctor: '[]'},
							_1: rendered.styles
						},
						_p218._0));
			}
		}();
		var htmlChildren = _p217._0;
		var styleChildren = _p217._1;
		var _p219 = embedMode;
		switch (_p219.ctor) {
			case 'NoStyleSheet':
				var renderedChildren = function () {
					var _p220 = A2(_elm_lang$core$Maybe$map, _mdgriffith$stylish_elephants$Internal_Model$renderNearbyGroupAbsolute, rendered.nearbys);
					if (_p220.ctor === 'Nothing') {
						return htmlChildren;
					} else {
						var _p222 = _p220._0;
						var _p221 = htmlChildren;
						if (_p221.ctor === 'Keyed') {
							return _mdgriffith$stylish_elephants$Internal_Model$Keyed(
								{
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'nearby-elements-pls-pls-pls-pls-be-unique', _1: _p222},
									_1: _p221._0
								});
						} else {
							return _mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
								{ctor: '::', _0: _p222, _1: _p221._0});
						}
					}
				}();
				var _p223 = styleChildren;
				if (_p223.ctor === '[]') {
					return _mdgriffith$stylish_elephants$Internal_Model$Unstyled(
						A3(_mdgriffith$stylish_elephants$Internal_Model$renderNode, rendered, renderedChildren, _elm_lang$core$Maybe$Nothing));
				} else {
					return _mdgriffith$stylish_elephants$Internal_Model$Styled(
						{
							styles: styleChildren,
							html: A2(_mdgriffith$stylish_elephants$Internal_Model$renderNode, rendered, renderedChildren)
						});
				}
			case 'StaticRootAndDynamic':
				var _p228 = _p219._0;
				var styles = _elm_lang$core$Tuple$second(
					A3(
						_elm_lang$core$List$foldr,
						_mdgriffith$stylish_elephants$Internal_Model$reduceStyles,
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Set$empty,
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Internal_Model$renderFocusStyle(_p228.focus),
								_1: {ctor: '[]'}
							}
						},
						styleChildren));
				var renderedChildren = function () {
					var _p224 = A2(_elm_lang$core$Maybe$map, _mdgriffith$stylish_elephants$Internal_Model$renderNearbyGroupAbsolute, rendered.nearbys);
					if (_p224.ctor === 'Nothing') {
						var _p225 = htmlChildren;
						if (_p225.ctor === 'Keyed') {
							return _mdgriffith$stylish_elephants$Internal_Model$Keyed(
								{
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'static-stylesheet', _1: _mdgriffith$stylish_elephants$Internal_Style$rulesElement},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'dynamic-stylesheet',
											_1: A2(_mdgriffith$stylish_elephants$Internal_Model$toStyleSheet, _p228, styles)
										},
										_1: _p225._0
									}
								});
						} else {
							return _mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
								{
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Internal_Style$rulesElement,
									_1: {
										ctor: '::',
										_0: A2(_mdgriffith$stylish_elephants$Internal_Model$toStyleSheet, _p228, styles),
										_1: _p225._0
									}
								});
						}
					} else {
						var _p227 = _p224._0;
						var _p226 = htmlChildren;
						if (_p226.ctor === 'Keyed') {
							return _mdgriffith$stylish_elephants$Internal_Model$Keyed(
								{
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'static-stylesheet', _1: _mdgriffith$stylish_elephants$Internal_Style$rulesElement},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'dynamic-stylesheet',
											_1: A2(_mdgriffith$stylish_elephants$Internal_Model$toStyleSheet, _p228, styles)
										},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'nearby-elements-pls-pls-pls-pls-be-unique', _1: _p227},
											_1: _p226._0
										}
									}
								});
						} else {
							return _mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
								{
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Internal_Style$rulesElement,
									_1: {
										ctor: '::',
										_0: A2(_mdgriffith$stylish_elephants$Internal_Model$toStyleSheet, _p228, styles),
										_1: {ctor: '::', _0: _p227, _1: _p226._0}
									}
								});
						}
					}
				}();
				return _mdgriffith$stylish_elephants$Internal_Model$Unstyled(
					A3(_mdgriffith$stylish_elephants$Internal_Model$renderNode, rendered, renderedChildren, _elm_lang$core$Maybe$Nothing));
			default:
				var _p233 = _p219._0;
				var styles = _elm_lang$core$Tuple$second(
					A3(
						_elm_lang$core$List$foldr,
						_mdgriffith$stylish_elephants$Internal_Model$reduceStyles,
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Set$empty,
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Internal_Model$renderFocusStyle(_p233.focus),
								_1: {ctor: '[]'}
							}
						},
						styleChildren));
				var renderedChildren = function () {
					var _p229 = A2(_elm_lang$core$Maybe$map, _mdgriffith$stylish_elephants$Internal_Model$renderNearbyGroupAbsolute, rendered.nearbys);
					if (_p229.ctor === 'Nothing') {
						var _p230 = htmlChildren;
						if (_p230.ctor === 'Keyed') {
							return _mdgriffith$stylish_elephants$Internal_Model$Keyed(
								{
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'dynamic-stylesheet',
										_1: A2(_mdgriffith$stylish_elephants$Internal_Model$toStyleSheet, _p233, styles)
									},
									_1: _p230._0
								});
						} else {
							return _mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
								{
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Internal_Style$rulesElement,
									_1: {
										ctor: '::',
										_0: A2(_mdgriffith$stylish_elephants$Internal_Model$toStyleSheet, _p233, styles),
										_1: _p230._0
									}
								});
						}
					} else {
						var _p232 = _p229._0;
						var _p231 = htmlChildren;
						if (_p231.ctor === 'Keyed') {
							return _mdgriffith$stylish_elephants$Internal_Model$Keyed(
								{
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'dynamic-stylesheet',
										_1: A2(_mdgriffith$stylish_elephants$Internal_Model$toStyleSheet, _p233, styles)
									},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'nearby-elements-pls-pls-pls-pls-be-unique', _1: _p232},
										_1: _p231._0
									}
								});
						} else {
							return _mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
								{
									ctor: '::',
									_0: A2(_mdgriffith$stylish_elephants$Internal_Model$toStyleSheet, _p233, styles),
									_1: {ctor: '::', _0: _p232, _1: _p231._0}
								});
						}
					}
				}();
				return _mdgriffith$stylish_elephants$Internal_Model$Unstyled(
					A3(_mdgriffith$stylish_elephants$Internal_Model$renderNode, rendered, renderedChildren, _elm_lang$core$Maybe$Nothing));
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$element = F5(
	function (embedMode, context, node, attributes, children) {
		return A4(
			_mdgriffith$stylish_elephants$Internal_Model$asElement,
			embedMode,
			children,
			context,
			_mdgriffith$stylish_elephants$Internal_Model$formatTransformations(
				A3(
					_elm_lang$core$List$foldr,
					_mdgriffith$stylish_elephants$Internal_Model$gatherAttributes,
					_mdgriffith$stylish_elephants$Internal_Model$initGathered(node),
					{
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$contextClasses(context),
						_1: attributes
					})));
	});
var _mdgriffith$stylish_elephants$Internal_Model$WithVirtualCss = {ctor: 'WithVirtualCss'};
var _mdgriffith$stylish_elephants$Internal_Model$NoStaticStyleSheet = {ctor: 'NoStaticStyleSheet'};
var _mdgriffith$stylish_elephants$Internal_Model$Layout = {ctor: 'Layout'};
var _mdgriffith$stylish_elephants$Internal_Model$Viewport = {ctor: 'Viewport'};
var _mdgriffith$stylish_elephants$Internal_Model$ForceHover = {ctor: 'ForceHover'};
var _mdgriffith$stylish_elephants$Internal_Model$AllowHover = {ctor: 'AllowHover'};
var _mdgriffith$stylish_elephants$Internal_Model$embed = F2(
	function (fn, a) {
		var _p234 = fn(a);
		switch (_p234.ctor) {
			case 'Unstyled':
				return _p234._0;
			case 'Styled':
				var _p235 = _p234._0;
				return _p235.html(
					_elm_lang$core$Maybe$Just(
						A2(
							_mdgriffith$stylish_elephants$Internal_Model$toStyleSheetString,
							{
								hover: _mdgriffith$stylish_elephants$Internal_Model$AllowHover,
								focus: {borderColor: _elm_lang$core$Maybe$Nothing, shadow: _elm_lang$core$Maybe$Nothing, backgroundColor: _elm_lang$core$Maybe$Nothing},
								mode: _mdgriffith$stylish_elephants$Internal_Model$Layout
							},
							_p235.styles)));
			case 'Text':
				return _elm_lang$core$Basics$always(
					_elm_lang$html$Html$text(_p234._0));
			default:
				return _elm_lang$core$Basics$always(
					_elm_lang$html$Html$text(''));
		}
	});
var _mdgriffith$stylish_elephants$Internal_Model$optionsToRecord = function (options) {
	var finalize = function (record) {
		return {
			hover: function () {
				var _p236 = record.hover;
				if (_p236.ctor === 'Nothing') {
					return _mdgriffith$stylish_elephants$Internal_Model$AllowHover;
				} else {
					return _p236._0;
				}
			}(),
			focus: function () {
				var _p237 = record.focus;
				if (_p237.ctor === 'Nothing') {
					return _mdgriffith$stylish_elephants$Internal_Model$focusDefaultStyle;
				} else {
					return _p237._0;
				}
			}(),
			mode: function () {
				var _p238 = record.mode;
				if (_p238.ctor === 'Nothing') {
					return _mdgriffith$stylish_elephants$Internal_Model$Layout;
				} else {
					return _p238._0;
				}
			}()
		};
	};
	var combine = F2(
		function (opt, record) {
			var _p239 = opt;
			switch (_p239.ctor) {
				case 'HoverOption':
					var _p240 = record.hover;
					if (_p240.ctor === 'Nothing') {
						return _elm_lang$core$Native_Utils.update(
							record,
							{
								hover: _elm_lang$core$Maybe$Just(_p239._0)
							});
					} else {
						return record;
					}
				case 'FocusStyleOption':
					var _p241 = record.focus;
					if (_p241.ctor === 'Nothing') {
						return _elm_lang$core$Native_Utils.update(
							record,
							{
								focus: _elm_lang$core$Maybe$Just(_p239._0)
							});
					} else {
						return record;
					}
				default:
					var _p242 = record.mode;
					if (_p242.ctor === 'Nothing') {
						return _elm_lang$core$Native_Utils.update(
							record,
							{
								mode: _elm_lang$core$Maybe$Just(_p239._0)
							});
					} else {
						return record;
					}
			}
		});
	return finalize(
		A3(
			_elm_lang$core$List$foldr,
			combine,
			{hover: _elm_lang$core$Maybe$Nothing, focus: _elm_lang$core$Maybe$Nothing, mode: _elm_lang$core$Maybe$Nothing},
			options));
};
var _mdgriffith$stylish_elephants$Internal_Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = _mdgriffith$stylish_elephants$Internal_Model$optionsToRecord(optionList);
		return A2(
			_mdgriffith$stylish_elephants$Internal_Model$toHtml,
			options,
			A5(
				_mdgriffith$stylish_elephants$Internal_Model$element,
				_mdgriffith$stylish_elephants$Internal_Model$StaticRootAndDynamic(options),
				_mdgriffith$stylish_elephants$Internal_Model$asEl,
				_elm_lang$core$Maybe$Nothing,
				attributes,
				_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
					{
						ctor: '::',
						_0: child,
						_1: {ctor: '[]'}
					})));
	});
var _mdgriffith$stylish_elephants$Internal_Model$NoHover = {ctor: 'NoHover'};
var _mdgriffith$stylish_elephants$Internal_Model$RenderModeOption = function (a) {
	return {ctor: 'RenderModeOption', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$FocusStyleOption = function (a) {
	return {ctor: 'FocusStyleOption', _0: a};
};
var _mdgriffith$stylish_elephants$Internal_Model$HoverOption = function (a) {
	return {ctor: 'HoverOption', _0: a};
};

var _mdgriffith$stylish_elephants$Element_Background$gradient = F2(
	function (angle, colors) {
		return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
			A3(
				_mdgriffith$stylish_elephants$Internal_Model$Single,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'bg-gradient-',
					A2(
						_elm_lang$core$String$join,
						'-',
						{
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Internal_Model$floatClass(angle),
							_1: A2(_elm_lang$core$List$map, _mdgriffith$stylish_elephants$Internal_Model$formatColorClass, colors)
						})),
				'background',
				A2(
					_elm_lang$core$Basics_ops['++'],
					'linear-gradient(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_elm_lang$core$String$join,
							', ',
							{
								ctor: '::',
								_0: A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(angle),
									'rad'),
								_1: A2(_elm_lang$core$List$map, _mdgriffith$stylish_elephants$Internal_Model$formatColor, colors)
							}),
						')'))));
	});
var _mdgriffith$stylish_elephants$Element_Background$tiledY = function (src) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'bg-image-',
				_mdgriffith$stylish_elephants$Internal_Model$className(src)),
			'background',
			A2(
				_elm_lang$core$Basics_ops['++'],
				'url(\"',
				A2(_elm_lang$core$Basics_ops['++'], src, '\") repeat-y'))));
};
var _mdgriffith$stylish_elephants$Element_Background$tiledX = function (src) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'bg-image-',
				_mdgriffith$stylish_elephants$Internal_Model$className(src)),
			'background',
			A2(
				_elm_lang$core$Basics_ops['++'],
				'url(\"',
				A2(_elm_lang$core$Basics_ops['++'], src, '\") repeat-x'))));
};
var _mdgriffith$stylish_elephants$Element_Background$tiled = function (src) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'bg-image-',
				_mdgriffith$stylish_elephants$Internal_Model$className(src)),
			'background',
			A2(
				_elm_lang$core$Basics_ops['++'],
				'url(\"',
				A2(_elm_lang$core$Basics_ops['++'], src, '\") repeat'))));
};
var _mdgriffith$stylish_elephants$Element_Background$fittedImage = function (src) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'bg-fitted-image-',
				_mdgriffith$stylish_elephants$Internal_Model$className(src)),
			'background',
			A2(
				_elm_lang$core$Basics_ops['++'],
				'url(\"',
				A2(_elm_lang$core$Basics_ops['++'], src, '\") top left / cover no-repeat'))));
};
var _mdgriffith$stylish_elephants$Element_Background$image = function (src) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'bg-image-',
				_mdgriffith$stylish_elephants$Internal_Model$className(src)),
			'background',
			A2(
				_elm_lang$core$Basics_ops['++'],
				'url(\"',
				A2(_elm_lang$core$Basics_ops['++'], src, '\") top left / contain no-repeat'))));
};
var _mdgriffith$stylish_elephants$Element_Background$color = function (clr) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Colored,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'bg-',
				_mdgriffith$stylish_elephants$Internal_Model$formatColorClass(clr)),
			'background-color',
			clr));
};
var _mdgriffith$stylish_elephants$Element_Background$mouseOverColor = function (clr) {
	return _mdgriffith$stylish_elephants$Internal_Model$hover(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Colored,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'hover-bg-',
				_mdgriffith$stylish_elephants$Internal_Model$formatColorClass(clr)),
			'background-color',
			clr));
};
var _mdgriffith$stylish_elephants$Element_Background$ToAngle = function (a) {
	return {ctor: 'ToAngle', _0: a};
};
var _mdgriffith$stylish_elephants$Element_Background$ToBottomLeft = {ctor: 'ToBottomLeft'};
var _mdgriffith$stylish_elephants$Element_Background$ToTopLeft = {ctor: 'ToTopLeft'};
var _mdgriffith$stylish_elephants$Element_Background$ToLeft = {ctor: 'ToLeft'};
var _mdgriffith$stylish_elephants$Element_Background$ToBottomRight = {ctor: 'ToBottomRight'};
var _mdgriffith$stylish_elephants$Element_Background$ToTopRight = {ctor: 'ToTopRight'};
var _mdgriffith$stylish_elephants$Element_Background$ToRight = {ctor: 'ToRight'};
var _mdgriffith$stylish_elephants$Element_Background$ToDown = {ctor: 'ToDown'};
var _mdgriffith$stylish_elephants$Element_Background$ToUp = {ctor: 'ToUp'};
var _mdgriffith$stylish_elephants$Element_Background$PxStep = F2(
	function (a, b) {
		return {ctor: 'PxStep', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Element_Background$px = _mdgriffith$stylish_elephants$Element_Background$PxStep;
var _mdgriffith$stylish_elephants$Element_Background$PercentStep = F2(
	function (a, b) {
		return {ctor: 'PercentStep', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Element_Background$ColorStep = function (a) {
	return {ctor: 'ColorStep', _0: a};
};
var _mdgriffith$stylish_elephants$Element_Background$step = _mdgriffith$stylish_elephants$Element_Background$ColorStep;

var _mdgriffith$stylish_elephants$Element_Font$glow = F2(
	function (color, size) {
		return _mdgriffith$stylish_elephants$Internal_Model$TextShadow(
			{
				offset: {ctor: '_Tuple2', _0: 0, _1: 0},
				blur: size * 2,
				color: color
			});
	});
var _mdgriffith$stylish_elephants$Element_Font$shadow = function (_p0) {
	var _p1 = _p0;
	return _mdgriffith$stylish_elephants$Internal_Model$TextShadow(
		{offset: _p1.offset, blur: _p1.blur, color: _p1.color});
};
var _mdgriffith$stylish_elephants$Element_Font$light = _mdgriffith$stylish_elephants$Internal_Model$class('text-light');
var _mdgriffith$stylish_elephants$Element_Font$bold = _mdgriffith$stylish_elephants$Internal_Model$class('bold');
var _mdgriffith$stylish_elephants$Element_Font$italic = _mdgriffith$stylish_elephants$Internal_Model$class('italic');
var _mdgriffith$stylish_elephants$Element_Font$strike = _mdgriffith$stylish_elephants$Internal_Model$class('strike');
var _mdgriffith$stylish_elephants$Element_Font$underline = _mdgriffith$stylish_elephants$Internal_Model$class('underline');
var _mdgriffith$stylish_elephants$Element_Font$justify = _mdgriffith$stylish_elephants$Internal_Model$class('text-justify');
var _mdgriffith$stylish_elephants$Element_Font$center = _mdgriffith$stylish_elephants$Internal_Model$class('text-center');
var _mdgriffith$stylish_elephants$Element_Font$alignRight = _mdgriffith$stylish_elephants$Internal_Model$class('text-right');
var _mdgriffith$stylish_elephants$Element_Font$alignLeft = _mdgriffith$stylish_elephants$Internal_Model$class('text-left');
var _mdgriffith$stylish_elephants$Element_Font$weight = function (fontWeight) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'font-weight-',
				_elm_lang$core$Basics$toString(fontWeight)),
			'font-weight',
			_elm_lang$core$Basics$toString(fontWeight)));
};
var _mdgriffith$stylish_elephants$Element_Font$wordSpacing = function (offset) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'word-spacing-',
				_mdgriffith$stylish_elephants$Internal_Model$floatClass(offset)),
			'word-spacing',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(offset),
				'px')));
};
var _mdgriffith$stylish_elephants$Element_Font$letterSpacing = function (offset) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'letter-spacing-',
				_mdgriffith$stylish_elephants$Internal_Model$floatClass(offset)),
			'letter-spacing',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(offset),
				'px')));
};
var _mdgriffith$stylish_elephants$Element_Font$lineHeight = function (_p2) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		_mdgriffith$stylish_elephants$Internal_Model$LineHeight(_p2));
};
var _mdgriffith$stylish_elephants$Element_Font$size = function (size) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'font-size-',
				_elm_lang$core$Basics$toString(size)),
			'font-size',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(size),
				'px')));
};
var _mdgriffith$stylish_elephants$Element_Font$external = function (_p3) {
	var _p4 = _p3;
	return A2(_mdgriffith$stylish_elephants$Internal_Model$ImportFont, _p4.name, _p4.url);
};
var _mdgriffith$stylish_elephants$Element_Font$typeface = _mdgriffith$stylish_elephants$Internal_Model$Typeface;
var _mdgriffith$stylish_elephants$Element_Font$monospace = _mdgriffith$stylish_elephants$Internal_Model$Monospace;
var _mdgriffith$stylish_elephants$Element_Font$sansSerif = _mdgriffith$stylish_elephants$Internal_Model$SansSerif;
var _mdgriffith$stylish_elephants$Element_Font$serif = _mdgriffith$stylish_elephants$Internal_Model$Serif;
var _mdgriffith$stylish_elephants$Element_Font$family = function (families) {
	var renderFontClassName = F2(
		function (font, current) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				current,
				function () {
					var _p5 = font;
					switch (_p5.ctor) {
						case 'Serif':
							return 'serif';
						case 'SansSerif':
							return 'sans-serif';
						case 'Monospace':
							return 'monospace';
						case 'Typeface':
							return A2(
								_elm_lang$core$String$join,
								'-',
								_elm_lang$core$String$words(
									_elm_lang$core$String$toLower(_p5._0)));
						default:
							return A2(
								_elm_lang$core$String$join,
								'-',
								_elm_lang$core$String$words(
									_elm_lang$core$String$toLower(_p5._0)));
					}
				}());
		});
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A2(
			_mdgriffith$stylish_elephants$Internal_Model$FontFamily,
			A3(_elm_lang$core$List$foldl, renderFontClassName, 'font-', families),
			families));
};
var _mdgriffith$stylish_elephants$Element_Font$mouseOverColor = function (fontColor) {
	return _mdgriffith$stylish_elephants$Internal_Model$hover(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Colored,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'hover-font-color-',
				_mdgriffith$stylish_elephants$Internal_Model$formatColorClass(fontColor)),
			'color',
			fontColor));
};
var _mdgriffith$stylish_elephants$Element_Font$color = function (fontColor) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Colored,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'font-color-',
				_mdgriffith$stylish_elephants$Internal_Model$formatColorClass(fontColor)),
			'color',
			fontColor));
};

var _mdgriffith$stylish_elephants$Element$pointer = A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'cursor', 'cursor-pointer');
var _mdgriffith$stylish_elephants$Element$clipX = A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'overflow', 'clip-x');
var _mdgriffith$stylish_elephants$Element$clipY = A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'overflow', 'clip-y');
var _mdgriffith$stylish_elephants$Element$clip = A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'overflow', 'clip');
var _mdgriffith$stylish_elephants$Element$scrollbarX = A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'overflow', 'scrollbars-x');
var _mdgriffith$stylish_elephants$Element$scrollbarY = A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'overflow', 'scrollbars-y');
var _mdgriffith$stylish_elephants$Element$scrollbars = A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'overflow', 'scrollbars');
var _mdgriffith$stylish_elephants$Element$hidden = function (on) {
	return on ? _mdgriffith$stylish_elephants$Internal_Model$class('hidden') : _mdgriffith$stylish_elephants$Internal_Model$NoAttribute;
};
var _mdgriffith$stylish_elephants$Element$spacingXY = F2(
	function (x, y) {
		return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
			A2(_mdgriffith$stylish_elephants$Internal_Model$SpacingStyle, x, y));
	});
var _mdgriffith$stylish_elephants$Element$spacing = function (x) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A2(_mdgriffith$stylish_elephants$Internal_Model$SpacingStyle, x, x));
};
var _mdgriffith$stylish_elephants$Element$spaceEvenly = A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'x-align', 'space-evenly');
var _mdgriffith$stylish_elephants$Element$alignRight = _mdgriffith$stylish_elephants$Internal_Model$AlignX(_mdgriffith$stylish_elephants$Internal_Model$Right);
var _mdgriffith$stylish_elephants$Element$alignLeft = _mdgriffith$stylish_elephants$Internal_Model$AlignX(_mdgriffith$stylish_elephants$Internal_Model$Left);
var _mdgriffith$stylish_elephants$Element$alignBottom = _mdgriffith$stylish_elephants$Internal_Model$AlignY(_mdgriffith$stylish_elephants$Internal_Model$Bottom);
var _mdgriffith$stylish_elephants$Element$alignTop = _mdgriffith$stylish_elephants$Internal_Model$AlignY(_mdgriffith$stylish_elephants$Internal_Model$Top);
var _mdgriffith$stylish_elephants$Element$centerY = _mdgriffith$stylish_elephants$Internal_Model$AlignY(_mdgriffith$stylish_elephants$Internal_Model$CenterY);
var _mdgriffith$stylish_elephants$Element$center = _mdgriffith$stylish_elephants$Internal_Model$AlignX(_mdgriffith$stylish_elephants$Internal_Model$CenterX);
var _mdgriffith$stylish_elephants$Element$paddingEach = function (_p0) {
	var _p1 = _p0;
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A4(_mdgriffith$stylish_elephants$Internal_Model$PaddingStyle, _p1.top, _p1.right, _p1.bottom, _p1.left));
};
var _mdgriffith$stylish_elephants$Element$paddingXY = F2(
	function (x, y) {
		return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
			A4(_mdgriffith$stylish_elephants$Internal_Model$PaddingStyle, y, x, y, x));
	});
var _mdgriffith$stylish_elephants$Element$padding = function (x) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A4(_mdgriffith$stylish_elephants$Internal_Model$PaddingStyle, x, x, x, x));
};
var _mdgriffith$stylish_elephants$Element$moveLeft = function (x) {
	return A2(
		_mdgriffith$stylish_elephants$Internal_Model$Transform,
		_elm_lang$core$Maybe$Nothing,
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Move,
			_elm_lang$core$Maybe$Just(
				_elm_lang$core$Basics$negate(x)),
			_elm_lang$core$Maybe$Nothing,
			_elm_lang$core$Maybe$Nothing));
};
var _mdgriffith$stylish_elephants$Element$moveRight = function (x) {
	return A2(
		_mdgriffith$stylish_elephants$Internal_Model$Transform,
		_elm_lang$core$Maybe$Nothing,
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Move,
			_elm_lang$core$Maybe$Just(x),
			_elm_lang$core$Maybe$Nothing,
			_elm_lang$core$Maybe$Nothing));
};
var _mdgriffith$stylish_elephants$Element$moveDown = function (y) {
	return A2(
		_mdgriffith$stylish_elephants$Internal_Model$Transform,
		_elm_lang$core$Maybe$Nothing,
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Move,
			_elm_lang$core$Maybe$Nothing,
			_elm_lang$core$Maybe$Just(y),
			_elm_lang$core$Maybe$Nothing));
};
var _mdgriffith$stylish_elephants$Element$moveUp = function (y) {
	return A2(
		_mdgriffith$stylish_elephants$Internal_Model$Transform,
		_elm_lang$core$Maybe$Nothing,
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Move,
			_elm_lang$core$Maybe$Nothing,
			_elm_lang$core$Maybe$Just(
				_elm_lang$core$Basics$negate(y)),
			_elm_lang$core$Maybe$Nothing));
};
var _mdgriffith$stylish_elephants$Element$rotate = function (angle) {
	return A2(
		_mdgriffith$stylish_elephants$Internal_Model$Transform,
		_elm_lang$core$Maybe$Nothing,
		A4(_mdgriffith$stylish_elephants$Internal_Model$Rotate, 0, 0, 1, angle));
};
var _mdgriffith$stylish_elephants$Element$mouseOverScale = function (n) {
	return A2(
		_mdgriffith$stylish_elephants$Internal_Model$Transform,
		_elm_lang$core$Maybe$Just(_mdgriffith$stylish_elephants$Internal_Model$Hover),
		A3(_mdgriffith$stylish_elephants$Internal_Model$Scale, n, n, 1));
};
var _mdgriffith$stylish_elephants$Element$scale = function (n) {
	return A2(
		_mdgriffith$stylish_elephants$Internal_Model$Transform,
		_elm_lang$core$Maybe$Nothing,
		A3(_mdgriffith$stylish_elephants$Internal_Model$Scale, n, n, 1));
};
var _mdgriffith$stylish_elephants$Element$height = _mdgriffith$stylish_elephants$Internal_Model$Height;
var _mdgriffith$stylish_elephants$Element$width = _mdgriffith$stylish_elephants$Internal_Model$Width;
var _mdgriffith$stylish_elephants$Element$behind = F2(
	function (on, element) {
		return A3(_mdgriffith$stylish_elephants$Internal_Model$Nearby, _mdgriffith$stylish_elephants$Internal_Model$Behind, on, element);
	});
var _mdgriffith$stylish_elephants$Element$inFront = F2(
	function (on, element) {
		return A3(_mdgriffith$stylish_elephants$Internal_Model$Nearby, _mdgriffith$stylish_elephants$Internal_Model$InFront, on, element);
	});
var _mdgriffith$stylish_elephants$Element$onLeft = F2(
	function (on, element) {
		return A3(_mdgriffith$stylish_elephants$Internal_Model$Nearby, _mdgriffith$stylish_elephants$Internal_Model$OnLeft, on, element);
	});
var _mdgriffith$stylish_elephants$Element$onRight = F2(
	function (on, element) {
		return A3(_mdgriffith$stylish_elephants$Internal_Model$Nearby, _mdgriffith$stylish_elephants$Internal_Model$OnRight, on, element);
	});
var _mdgriffith$stylish_elephants$Element$above = F2(
	function (on, element) {
		return A3(_mdgriffith$stylish_elephants$Internal_Model$Nearby, _mdgriffith$stylish_elephants$Internal_Model$Above, on, element);
	});
var _mdgriffith$stylish_elephants$Element$below = F2(
	function (on, element) {
		return on ? A3(_mdgriffith$stylish_elephants$Internal_Model$Nearby, _mdgriffith$stylish_elephants$Internal_Model$Below, on, element) : _mdgriffith$stylish_elephants$Internal_Model$NoAttribute;
	});
var _mdgriffith$stylish_elephants$Element$description = function (_p2) {
	return _mdgriffith$stylish_elephants$Internal_Model$Describe(
		_mdgriffith$stylish_elephants$Internal_Model$Label(_p2));
};
var _mdgriffith$stylish_elephants$Element$decorativeImage = F2(
	function (attrs, _p3) {
		var _p4 = _p3;
		var imageAttributes = A2(
			_elm_lang$core$List$filter,
			function (a) {
				var _p5 = a;
				switch (_p5.ctor) {
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
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asEl,
			_elm_lang$core$Maybe$Nothing,
			{ctor: '::', _0: _mdgriffith$stylish_elephants$Element$clip, _1: attrs},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				{
					ctor: '::',
					_0: A5(
						_mdgriffith$stylish_elephants$Internal_Model$element,
						_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
						_mdgriffith$stylish_elephants$Internal_Model$asEl,
						_elm_lang$core$Maybe$Just('img'),
						A2(
							_elm_lang$core$Basics_ops['++'],
							imageAttributes,
							{
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
									_elm_lang$html$Html_Attributes$src(_p4.src)),
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
										_elm_lang$html$Html_Attributes$alt('')),
									_1: {ctor: '[]'}
								}
							}),
						_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
							{ctor: '[]'})),
					_1: {ctor: '[]'}
				}));
	});
var _mdgriffith$stylish_elephants$Element$image = F2(
	function (attrs, _p6) {
		var _p7 = _p6;
		var imageAttributes = A2(
			_elm_lang$core$List$filter,
			function (a) {
				var _p8 = a;
				switch (_p8.ctor) {
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
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asEl,
			_elm_lang$core$Maybe$Nothing,
			{ctor: '::', _0: _mdgriffith$stylish_elephants$Element$clip, _1: attrs},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				{
					ctor: '::',
					_0: A5(
						_mdgriffith$stylish_elephants$Internal_Model$element,
						_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
						_mdgriffith$stylish_elephants$Internal_Model$asEl,
						_elm_lang$core$Maybe$Just('img'),
						A2(
							_elm_lang$core$Basics_ops['++'],
							imageAttributes,
							{
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
									_elm_lang$html$Html_Attributes$src(_p7.src)),
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
										_elm_lang$html$Html_Attributes$alt(_p7.description)),
									_1: {ctor: '[]'}
								}
							}),
						_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
							{ctor: '[]'})),
					_1: {ctor: '[]'}
				}));
	});
var _mdgriffith$stylish_elephants$Element$paragraph = F2(
	function (attrs, children) {
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asParagraph,
			_elm_lang$core$Maybe$Just('p'),
			_mdgriffith$stylish_elephants$Internal_Model$adjustParagraphSpacing(attrs),
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(children));
	});
var _mdgriffith$stylish_elephants$Element$text = function (content) {
	return _mdgriffith$stylish_elephants$Internal_Model$Text(content);
};
var _mdgriffith$stylish_elephants$Element$empty = _mdgriffith$stylish_elephants$Internal_Model$Empty;
var _mdgriffith$stylish_elephants$Element$forceHover = _mdgriffith$stylish_elephants$Internal_Model$HoverOption(_mdgriffith$stylish_elephants$Internal_Model$ForceHover);
var _mdgriffith$stylish_elephants$Element$noHover = _mdgriffith$stylish_elephants$Internal_Model$HoverOption(_mdgriffith$stylish_elephants$Internal_Model$NoHover);
var _mdgriffith$stylish_elephants$Element$focusStyle = _mdgriffith$stylish_elephants$Internal_Model$FocusStyleOption;
var _mdgriffith$stylish_elephants$Element$defaultFocus = _mdgriffith$stylish_elephants$Internal_Model$focusDefaultStyle;
var _mdgriffith$stylish_elephants$Element$layoutWith = F3(
	function (_p9, attrs, child) {
		var _p10 = _p9;
		return A3(
			_mdgriffith$stylish_elephants$Internal_Model$renderRoot,
			_p10.options,
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element_Background$color(_elm_lang$core$Color$white),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element_Font$color(_elm_lang$core$Color$darkCharcoal),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element_Font$size(20),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element_Font$family(
								{
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element_Font$typeface('Open Sans'),
									_1: {
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Element_Font$typeface('Helvetica'),
										_1: {
											ctor: '::',
											_0: _mdgriffith$stylish_elephants$Element_Font$typeface('Verdana'),
											_1: {
												ctor: '::',
												_0: _mdgriffith$stylish_elephants$Element_Font$sansSerif,
												_1: {ctor: '[]'}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Internal_Model$htmlClass('style-elements se el'),
								_1: {
									ctor: '::',
									_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'x-content-align', 'content-center-x'),
									_1: {
										ctor: '::',
										_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'y-content-align', 'content-center-y'),
										_1: attrs
									}
								}
							}
						}
					}
				}
			},
			child);
	});
var _mdgriffith$stylish_elephants$Element$layout = _mdgriffith$stylish_elephants$Element$layoutWith(
	{
		options: {ctor: '[]'}
	});
var _mdgriffith$stylish_elephants$Element$fillPortion = _mdgriffith$stylish_elephants$Internal_Model$Fill;
var _mdgriffith$stylish_elephants$Element$fill = _mdgriffith$stylish_elephants$Internal_Model$Fill(1);
var _mdgriffith$stylish_elephants$Element$row = F2(
	function (attrs, children) {
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asRow,
			_elm_lang$core$Maybe$Nothing,
			{
				ctor: '::',
				_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'x-content-align', 'content-center-x'),
				_1: {
					ctor: '::',
					_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'y-content-align', 'content-center-y'),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
						_1: attrs
					}
				}
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				_mdgriffith$stylish_elephants$Internal_Model$rowEdgeFillers(children)));
	});
var _mdgriffith$stylish_elephants$Element$column = F2(
	function (attrs, children) {
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asColumn,
			_elm_lang$core$Maybe$Nothing,
			{
				ctor: '::',
				_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'y-content-align', 'content-top'),
				_1: {
					ctor: '::',
					_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'x-content-align', 'content-center-x'),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$height(_mdgriffith$stylish_elephants$Element$fill),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
							_1: attrs
						}
					}
				}
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				_mdgriffith$stylish_elephants$Internal_Model$columnEdgeFillers(children)));
	});
var _mdgriffith$stylish_elephants$Element$shrink = _mdgriffith$stylish_elephants$Internal_Model$Content;
var _mdgriffith$stylish_elephants$Element$el = F2(
	function (attrs, child) {
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asEl,
			_elm_lang$core$Maybe$Nothing,
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$shrink),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$height(_mdgriffith$stylish_elephants$Element$shrink),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$center,
						_1: {
							ctor: '::',
							_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'x-content-align', 'content-center-x'),
							_1: {
								ctor: '::',
								_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'y-content-align', 'content-center-y'),
								_1: attrs
							}
						}
					}
				}
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				{
					ctor: '::',
					_0: child,
					_1: {ctor: '[]'}
				}));
	});
var _mdgriffith$stylish_elephants$Element$link = F2(
	function (attrs, _p11) {
		var _p12 = _p11;
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asEl,
			_elm_lang$core$Maybe$Just('a'),
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
					_elm_lang$html$Html_Attributes$href(_p12.url)),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
						_elm_lang$html$Html_Attributes$rel('noopener noreferrer')),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$shrink),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element$height(_mdgriffith$stylish_elephants$Element$shrink),
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element$centerY,
								_1: {ctor: '::', _0: _mdgriffith$stylish_elephants$Element$center, _1: attrs}
							}
						}
					}
				}
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				{
					ctor: '::',
					_0: _p12.label,
					_1: {ctor: '[]'}
				}));
	});
var _mdgriffith$stylish_elephants$Element$newTabLink = F2(
	function (attrs, _p13) {
		var _p14 = _p13;
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asEl,
			_elm_lang$core$Maybe$Just('a'),
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
					_elm_lang$html$Html_Attributes$href(_p14.url)),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
						_elm_lang$html$Html_Attributes$rel('noopener noreferrer')),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
							_elm_lang$html$Html_Attributes$target('_blank')),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$shrink),
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element$height(_mdgriffith$stylish_elephants$Element$shrink),
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element$centerY,
									_1: {ctor: '::', _0: _mdgriffith$stylish_elephants$Element$center, _1: attrs}
								}
							}
						}
					}
				}
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				{
					ctor: '::',
					_0: _p14.label,
					_1: {ctor: '[]'}
				}));
	});
var _mdgriffith$stylish_elephants$Element$download = F2(
	function (attrs, _p15) {
		var _p16 = _p15;
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asEl,
			_elm_lang$core$Maybe$Just('a'),
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
					_elm_lang$html$Html_Attributes$href(_p16.url)),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
						_elm_lang$html$Html_Attributes$download(true)),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$shrink),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element$height(_mdgriffith$stylish_elephants$Element$shrink),
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element$centerY,
								_1: {ctor: '::', _0: _mdgriffith$stylish_elephants$Element$center, _1: attrs}
							}
						}
					}
				}
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				{
					ctor: '::',
					_0: _p16.label,
					_1: {ctor: '[]'}
				}));
	});
var _mdgriffith$stylish_elephants$Element$downloadAs = F2(
	function (attrs, _p17) {
		var _p18 = _p17;
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asEl,
			_elm_lang$core$Maybe$Just('a'),
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
					_elm_lang$html$Html_Attributes$href(_p18.url)),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
						_elm_lang$html$Html_Attributes$downloadAs(_p18.filename)),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$shrink),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element$height(_mdgriffith$stylish_elephants$Element$shrink),
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element$centerY,
								_1: {ctor: '::', _0: _mdgriffith$stylish_elephants$Element$center, _1: attrs}
							}
						}
					}
				}
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				{
					ctor: '::',
					_0: _p18.label,
					_1: {ctor: '[]'}
				}));
	});
var _mdgriffith$stylish_elephants$Element$px = _mdgriffith$stylish_elephants$Internal_Model$Px;
var _mdgriffith$stylish_elephants$Element$tableHelper = F2(
	function (attrs, config) {
		var onGrid = F3(
			function (row, column, el) {
				return A5(
					_mdgriffith$stylish_elephants$Internal_Model$element,
					_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
					_mdgriffith$stylish_elephants$Internal_Model$asEl,
					_elm_lang$core$Maybe$Nothing,
					{
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
							_mdgriffith$stylish_elephants$Internal_Model$GridPosition(
								{row: row, col: column, width: 1, height: 1})),
						_1: {ctor: '[]'}
					},
					_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
						{
							ctor: '::',
							_0: el,
							_1: {ctor: '[]'}
						}));
			});
		var add = F3(
			function (cell, columnConfig, cursor) {
				var _p19 = columnConfig;
				if (_p19.ctor === 'InternalIndexedColumn') {
					return _elm_lang$core$Native_Utils.update(
						cursor,
						{
							elements: {
								ctor: '::',
								_0: A3(
									onGrid,
									cursor.row,
									cursor.column,
									A2(_p19._0.view, cursor.row, cell)),
								_1: cursor.elements
							},
							column: cursor.column + 1
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						cursor,
						{
							elements: {
								ctor: '::',
								_0: A3(
									onGrid,
									cursor.row,
									cursor.column,
									_p19._0.view(cell)),
								_1: cursor.elements
							},
							column: cursor.column + 1
						});
				}
			});
		var build = F3(
			function (columns, rowData, cursor) {
				var newCursor = A3(
					_elm_lang$core$List$foldl,
					add(rowData),
					cursor,
					columns);
				return _elm_lang$core$Native_Utils.update(
					newCursor,
					{row: cursor.row + 1, column: 1});
			});
		var columnHeader = function (col) {
			var _p20 = col;
			if (_p20.ctor === 'InternalIndexedColumn') {
				return _p20._0.header;
			} else {
				return _p20._0.header;
			}
		};
		var maybeHeaders = function (headers) {
			return A2(
				_elm_lang$core$List$all,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					})(_mdgriffith$stylish_elephants$Internal_Model$Empty),
				headers) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (col, header) {
							return A3(onGrid, 1, col + 1, header);
						}),
					headers));
		}(
			A2(_elm_lang$core$List$map, columnHeader, config.columns));
		var children = A3(
			_elm_lang$core$List$foldl,
			build(config.columns),
			{
				elements: {ctor: '[]'},
				row: _elm_lang$core$Native_Utils.eq(maybeHeaders, _elm_lang$core$Maybe$Nothing) ? 1 : 2,
				column: 1
			},
			config.data);
		var _p21 = A2(
			_mdgriffith$stylish_elephants$Internal_Model$getSpacing,
			attrs,
			{ctor: '_Tuple2', _0: 0, _1: 0});
		var sX = _p21._0;
		var sY = _p21._1;
		var template = _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
			_mdgriffith$stylish_elephants$Internal_Model$GridTemplateStyle(
				{
					spacing: {
						ctor: '_Tuple2',
						_0: _mdgriffith$stylish_elephants$Element$px(sX),
						_1: _mdgriffith$stylish_elephants$Element$px(sY)
					},
					columns: A2(
						_elm_lang$core$List$repeat,
						_elm_lang$core$List$length(config.columns),
						_mdgriffith$stylish_elephants$Internal_Model$Content),
					rows: A2(
						_elm_lang$core$List$repeat,
						_elm_lang$core$List$length(config.data),
						_mdgriffith$stylish_elephants$Internal_Model$Content)
				}));
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asGrid,
			_elm_lang$core$Maybe$Nothing,
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$center,
					_1: {ctor: '::', _0: template, _1: attrs}
				}
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				function () {
					var _p22 = maybeHeaders;
					if (_p22.ctor === 'Nothing') {
						return children.elements;
					} else {
						return A2(_elm_lang$core$Basics_ops['++'], _p22._0, children.elements);
					}
				}()));
	});
var _mdgriffith$stylish_elephants$Element$textColumn = F2(
	function (attrs, children) {
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asTextColumn,
			_elm_lang$core$Maybe$Nothing,
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$width(
					_mdgriffith$stylish_elephants$Element$px(650)),
				_1: attrs
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(children));
	});
var _mdgriffith$stylish_elephants$Element$mapAttribute = _mdgriffith$stylish_elephants$Internal_Model$mapAttr;
var _mdgriffith$stylish_elephants$Element$map = _mdgriffith$stylish_elephants$Internal_Model$map;
var _mdgriffith$stylish_elephants$Element$attribute = _mdgriffith$stylish_elephants$Internal_Model$Attr;
var _mdgriffith$stylish_elephants$Element$html = _mdgriffith$stylish_elephants$Internal_Model$unstyled;
var _mdgriffith$stylish_elephants$Element$FocusStyle = F3(
	function (a, b, c) {
		return {borderColor: a, backgroundColor: b, shadow: c};
	});
var _mdgriffith$stylish_elephants$Element$Table = F2(
	function (a, b) {
		return {data: a, columns: b};
	});
var _mdgriffith$stylish_elephants$Element$Column = F2(
	function (a, b) {
		return {header: a, view: b};
	});
var _mdgriffith$stylish_elephants$Element$IndexedTable = F2(
	function (a, b) {
		return {data: a, columns: b};
	});
var _mdgriffith$stylish_elephants$Element$IndexedColumn = F2(
	function (a, b) {
		return {header: a, view: b};
	});
var _mdgriffith$stylish_elephants$Element$InternalTable = F2(
	function (a, b) {
		return {data: a, columns: b};
	});
var _mdgriffith$stylish_elephants$Element$Link = F2(
	function (a, b) {
		return {url: a, label: b};
	});
var _mdgriffith$stylish_elephants$Element$InternalColumn = function (a) {
	return {ctor: 'InternalColumn', _0: a};
};
var _mdgriffith$stylish_elephants$Element$table = F2(
	function (attrs, config) {
		return A2(
			_mdgriffith$stylish_elephants$Element$tableHelper,
			attrs,
			{
				data: config.data,
				columns: A2(_elm_lang$core$List$map, _mdgriffith$stylish_elephants$Element$InternalColumn, config.columns)
			});
	});
var _mdgriffith$stylish_elephants$Element$InternalIndexedColumn = function (a) {
	return {ctor: 'InternalIndexedColumn', _0: a};
};
var _mdgriffith$stylish_elephants$Element$indexedTable = F2(
	function (attrs, config) {
		return A2(
			_mdgriffith$stylish_elephants$Element$tableHelper,
			attrs,
			{
				data: config.data,
				columns: A2(_elm_lang$core$List$map, _mdgriffith$stylish_elephants$Element$InternalIndexedColumn, config.columns)
			});
	});
var _mdgriffith$stylish_elephants$Element$Device = {ctor: 'Device'};
var _mdgriffith$stylish_elephants$Element$classifyDevice = function (window) {
	return _mdgriffith$stylish_elephants$Element$Device;
};

var _mdgriffith$stylish_elephants$Element_Border$shadow = function (_p0) {
	var _p1 = _p0;
	return _mdgriffith$stylish_elephants$Internal_Model$BoxShadow(
		{inset: true, offset: _p1.offset, size: _p1.size, blur: _p1.blur, color: _p1.color});
};
var _mdgriffith$stylish_elephants$Element_Border$innerShadow = function (_p2) {
	var _p3 = _p2;
	return _mdgriffith$stylish_elephants$Internal_Model$BoxShadow(
		{inset: true, offset: _p3.offset, size: _p3.size, blur: _p3.blur, color: _p3.color});
};
var _mdgriffith$stylish_elephants$Element_Border$box = function (_p4) {
	var _p5 = _p4;
	return _mdgriffith$stylish_elephants$Internal_Model$BoxShadow(
		{inset: false, offset: _p5.offset, size: _p5.size, blur: _p5.blur, color: _p5.color});
};
var _mdgriffith$stylish_elephants$Element_Border$innerGlow = F2(
	function (color, size) {
		return _mdgriffith$stylish_elephants$Element_Border$innerShadow(
			{
				offset: {ctor: '_Tuple2', _0: 0, _1: 0},
				size: size,
				blur: size * 2,
				color: color
			});
	});
var _mdgriffith$stylish_elephants$Element_Border$glow = F2(
	function (color, size) {
		return _mdgriffith$stylish_elephants$Element_Border$box(
			{
				offset: {ctor: '_Tuple2', _0: 0, _1: 0},
				size: size,
				blur: size * 2,
				color: color
			});
	});
var _mdgriffith$stylish_elephants$Element_Border$roundEach = function (_p6) {
	var _p7 = _p6;
	var _p11 = _p7.topRight;
	var _p10 = _p7.topLeft;
	var _p9 = _p7.bottomRight;
	var _p8 = _p7.bottomLeft;
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'border-radius-',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p10),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'-',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p11),
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p8),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'-',
									_elm_lang$core$Basics$toString(_p9))))))),
			'border-radius',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p10),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'px ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p11),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'px ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p9),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'px ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p8),
										'px')))))))));
};
var _mdgriffith$stylish_elephants$Element_Border$rounded = function (radius) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'border-radius-',
				_elm_lang$core$Basics$toString(radius)),
			'border-radius',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(radius),
				'px')));
};
var _mdgriffith$stylish_elephants$Element_Border$dotted = A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'border', 'border-dotted');
var _mdgriffith$stylish_elephants$Element_Border$dashed = A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'border', 'border-dashed');
var _mdgriffith$stylish_elephants$Element_Border$solid = A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'border', 'border-solid');
var _mdgriffith$stylish_elephants$Element_Border$widthEach = function (_p12) {
	var _p13 = _p12;
	var _p17 = _p13.top;
	var _p16 = _p13.right;
	var _p15 = _p13.left;
	var _p14 = _p13.bottom;
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'border-',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p17),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'-',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p16),
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p14),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'-',
									_elm_lang$core$Basics$toString(_p15))))))),
			'border-width',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p17),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'px ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p16),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'px ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p14),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'px ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p15),
										'px')))))))));
};
var _mdgriffith$stylish_elephants$Element_Border$widthXY = F2(
	function (x, y) {
		return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
			A3(
				_mdgriffith$stylish_elephants$Internal_Model$Single,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'border-',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(x),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'-',
							_elm_lang$core$Basics$toString(y)))),
				'border-width',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(y),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'px ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(x),
							'px')))));
	});
var _mdgriffith$stylish_elephants$Element_Border$width = function (v) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Single,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'border-',
				_elm_lang$core$Basics$toString(v)),
			'border-width',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(v),
				'px')));
};
var _mdgriffith$stylish_elephants$Element_Border$mouseOverColor = function (clr) {
	return _mdgriffith$stylish_elephants$Internal_Model$hover(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Colored,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'hover-border-color-',
				_mdgriffith$stylish_elephants$Internal_Model$formatColorClass(clr)),
			'border-color',
			clr));
};
var _mdgriffith$stylish_elephants$Element_Border$color = function (clr) {
	return _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
		A3(
			_mdgriffith$stylish_elephants$Internal_Model$Colored,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'border-color-',
				_mdgriffith$stylish_elephants$Internal_Model$formatColorClass(clr)),
			'border-color',
			clr));
};

var _mdgriffith$stylish_elephants$Element_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _mdgriffith$stylish_elephants$Element_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _mdgriffith$stylish_elephants$Element_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _mdgriffith$stylish_elephants$Element_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _mdgriffith$stylish_elephants$Element_Events$onWithOptions = F3(
	function (event, options, decode) {
		return _mdgriffith$stylish_elephants$Internal_Model$Attr(
			A3(_elm_lang$html$Html_Events$onWithOptions, event, options, decode));
	});
var _mdgriffith$stylish_elephants$Element_Events$on = F2(
	function (event, decode) {
		return _mdgriffith$stylish_elephants$Internal_Model$Attr(
			A2(_elm_lang$html$Html_Events$on, event, decode));
	});
var _mdgriffith$stylish_elephants$Element_Events$onFocus = function (_p0) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Events$onFocus(_p0));
};
var _mdgriffith$stylish_elephants$Element_Events$onLoseFocus = function (_p1) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Events$onBlur(_p1));
};
var _mdgriffith$stylish_elephants$Element_Events$onMouseMove = function (msg) {
	return A2(
		_mdgriffith$stylish_elephants$Element_Events$on,
		'mousemove',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _mdgriffith$stylish_elephants$Element_Events$onMouseLeave = function (_p2) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Events$onMouseLeave(_p2));
};
var _mdgriffith$stylish_elephants$Element_Events$onMouseEnter = function (_p3) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Events$onMouseEnter(_p3));
};
var _mdgriffith$stylish_elephants$Element_Events$onDoubleClick = function (_p4) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Events$onDoubleClick(_p4));
};
var _mdgriffith$stylish_elephants$Element_Events$onClick = function (_p5) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Events$onClick(_p5));
};
var _mdgriffith$stylish_elephants$Element_Events$onMouseUp = function (_p6) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Events$onMouseUp(_p6));
};
var _mdgriffith$stylish_elephants$Element_Events$onMouseDown = function (_p7) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Events$onMouseDown(_p7));
};
var _mdgriffith$stylish_elephants$Element_Events$Coords = F2(
	function (a, b) {
		return {x: a, y: b};
	});
var _mdgriffith$stylish_elephants$Element_Events$screenCoords = A3(
	_elm_lang$core$Json_Decode$map2,
	_mdgriffith$stylish_elephants$Element_Events$Coords,
	A2(_elm_lang$core$Json_Decode$field, 'screenX', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode$field, 'screenY', _elm_lang$core$Json_Decode$int));
var _mdgriffith$stylish_elephants$Element_Events$onClickScreenCoords = function (msg) {
	return A2(
		_mdgriffith$stylish_elephants$Element_Events$on,
		'click',
		A2(_elm_lang$core$Json_Decode$map, msg, _mdgriffith$stylish_elephants$Element_Events$screenCoords));
};
var _mdgriffith$stylish_elephants$Element_Events$onMouseScreenCoords = function (msg) {
	return A2(
		_mdgriffith$stylish_elephants$Element_Events$on,
		'mousemove',
		A2(_elm_lang$core$Json_Decode$map, msg, _mdgriffith$stylish_elephants$Element_Events$screenCoords));
};
var _mdgriffith$stylish_elephants$Element_Events$localCoords = A3(
	_elm_lang$core$Json_Decode$map2,
	_mdgriffith$stylish_elephants$Element_Events$Coords,
	A2(_elm_lang$core$Json_Decode$field, 'offsetX', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode$field, 'offsetY', _elm_lang$core$Json_Decode$int));
var _mdgriffith$stylish_elephants$Element_Events$onClickCoords = function (msg) {
	return A2(
		_mdgriffith$stylish_elephants$Element_Events$on,
		'click',
		A2(_elm_lang$core$Json_Decode$map, msg, _mdgriffith$stylish_elephants$Element_Events$localCoords));
};
var _mdgriffith$stylish_elephants$Element_Events$onMouseCoords = function (msg) {
	return A2(
		_mdgriffith$stylish_elephants$Element_Events$on,
		'mousemove',
		A2(_elm_lang$core$Json_Decode$map, msg, _mdgriffith$stylish_elephants$Element_Events$localCoords));
};
var _mdgriffith$stylish_elephants$Element_Events$pageCoords = A3(
	_elm_lang$core$Json_Decode$map2,
	_mdgriffith$stylish_elephants$Element_Events$Coords,
	A2(_elm_lang$core$Json_Decode$field, 'pageX', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode$field, 'pageY', _elm_lang$core$Json_Decode$int));
var _mdgriffith$stylish_elephants$Element_Events$onClickPageCoords = function (msg) {
	return A2(
		_mdgriffith$stylish_elephants$Element_Events$on,
		'click',
		A2(_elm_lang$core$Json_Decode$map, msg, _mdgriffith$stylish_elephants$Element_Events$pageCoords));
};
var _mdgriffith$stylish_elephants$Element_Events$onMousePageCoords = function (msg) {
	return A2(
		_mdgriffith$stylish_elephants$Element_Events$on,
		'mousemove',
		A2(_elm_lang$core$Json_Decode$map, msg, _mdgriffith$stylish_elephants$Element_Events$pageCoords));
};
var _mdgriffith$stylish_elephants$Element_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _mdgriffith$stylish_elephants$Internal_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _mdgriffith$stylish_elephants$Internal_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _mdgriffith$stylish_elephants$Internal_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _mdgriffith$stylish_elephants$Internal_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _mdgriffith$stylish_elephants$Internal_Events$onWithOptions = F3(
	function (event, options, decode) {
		return _mdgriffith$stylish_elephants$Internal_Model$Attr(
			A3(_elm_lang$html$Html_Events$onWithOptions, event, options, decode));
	});
var _mdgriffith$stylish_elephants$Internal_Events$on = F2(
	function (event, decode) {
		return _mdgriffith$stylish_elephants$Internal_Model$Attr(
			A2(_elm_lang$html$Html_Events$on, event, decode));
	});
var _mdgriffith$stylish_elephants$Internal_Events$Coords = F2(
	function (a, b) {
		return {x: a, y: b};
	});
var _mdgriffith$stylish_elephants$Internal_Events$screenCoords = A3(
	_elm_lang$core$Json_Decode$map2,
	_mdgriffith$stylish_elephants$Internal_Events$Coords,
	A2(_elm_lang$core$Json_Decode$field, 'screenX', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode$field, 'screenY', _elm_lang$core$Json_Decode$int));
var _mdgriffith$stylish_elephants$Internal_Events$localCoords = A3(
	_elm_lang$core$Json_Decode$map2,
	_mdgriffith$stylish_elephants$Internal_Events$Coords,
	A2(_elm_lang$core$Json_Decode$field, 'offsetX', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode$field, 'offsetY', _elm_lang$core$Json_Decode$int));
var _mdgriffith$stylish_elephants$Internal_Events$pageCoords = A3(
	_elm_lang$core$Json_Decode$map2,
	_mdgriffith$stylish_elephants$Internal_Events$Coords,
	A2(_elm_lang$core$Json_Decode$field, 'pageX', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode$field, 'pageY', _elm_lang$core$Json_Decode$int));
var _mdgriffith$stylish_elephants$Internal_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _mdgriffith$stylish_elephants$Internal_Grid$build = F5(
	function (rowCoord, colCoord, spacingX, spacingY, positioned) {
		var attributes = {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
				_mdgriffith$stylish_elephants$Internal_Model$GridPosition(
					{row: rowCoord, col: colCoord, width: positioned.width, height: positioned.height})),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
					A2(_mdgriffith$stylish_elephants$Internal_Model$SpacingStyle, spacingX, spacingY)),
				_1: positioned.attrs
			}
		};
		var _p0 = positioned.layout;
		switch (_p0.ctor) {
			case 'GridElement':
				return A5(
					_mdgriffith$stylish_elephants$Internal_Model$element,
					_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
					_mdgriffith$stylish_elephants$Internal_Model$asColumn,
					_elm_lang$core$Maybe$Nothing,
					attributes,
					_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
						_mdgriffith$stylish_elephants$Internal_Model$columnEdgeFillers(positioned.child)));
			case 'Row':
				return A5(
					_mdgriffith$stylish_elephants$Internal_Model$element,
					_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
					_mdgriffith$stylish_elephants$Internal_Model$asRow,
					_elm_lang$core$Maybe$Nothing,
					attributes,
					_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
						_mdgriffith$stylish_elephants$Internal_Model$rowEdgeFillers(positioned.child)));
			default:
				return A5(
					_mdgriffith$stylish_elephants$Internal_Model$element,
					_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
					_mdgriffith$stylish_elephants$Internal_Model$asColumn,
					_elm_lang$core$Maybe$Nothing,
					attributes,
					_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
						_mdgriffith$stylish_elephants$Internal_Model$columnEdgeFillers(positioned.child)));
		}
	});
var _mdgriffith$stylish_elephants$Internal_Grid$Around = F7(
	function (a, b, c, d, e, f, g) {
		return {right: a, left: b, primary: c, primaryWidth: d, defaultWidth: e, below: f, above: g};
	});
var _mdgriffith$stylish_elephants$Internal_Grid$PositionedElement = F5(
	function (a, b, c, d, e) {
		return {layout: a, child: b, attrs: c, width: d, height: e};
	});
var _mdgriffith$stylish_elephants$Internal_Grid$Below = {ctor: 'Below'};
var _mdgriffith$stylish_elephants$Internal_Grid$Above = {ctor: 'Above'};
var _mdgriffith$stylish_elephants$Internal_Grid$OnLeft = {ctor: 'OnLeft'};
var _mdgriffith$stylish_elephants$Internal_Grid$OnRight = {ctor: 'OnRight'};
var _mdgriffith$stylish_elephants$Internal_Grid$createGrid = F2(
	function (_p1, nearby) {
		var _p2 = _p1;
		var _p6 = _p2._1;
		var _p5 = _p2._0;
		var columns = _elm_lang$core$Native_Utils.eq(_elm_lang$core$Maybe$Nothing, nearby.left) ? {left: 0, primary: 1, right: 2} : {left: 1, primary: 2, right: 3};
		var colCoord = function (pos) {
			var _p3 = pos;
			switch (_p3.ctor) {
				case 'Above':
					return columns.primary;
				case 'Below':
					return columns.primary;
				case 'OnRight':
					return columns.right;
				default:
					return columns.left;
			}
		};
		var rows = _elm_lang$core$Native_Utils.eq(nearby.above, _elm_lang$core$Maybe$Nothing) ? {above: 0, primary: 1, below: 2} : {above: 1, primary: 2, below: 3};
		var rowCoord = function (pos) {
			var _p4 = pos;
			switch (_p4.ctor) {
				case 'Above':
					return rows.above;
				case 'Below':
					return rows.below;
				case 'OnRight':
					return rows.primary;
				default:
					return rows.primary;
			}
		};
		var place = F2(
			function (pos, el) {
				return A5(
					_mdgriffith$stylish_elephants$Internal_Grid$build,
					rowCoord(pos),
					colCoord(pos),
					_p5,
					_p6,
					el);
			});
		var colCount = _elm_lang$core$List$sum(
			{
				ctor: '::',
				_0: 1,
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Native_Utils.eq(_elm_lang$core$Maybe$Nothing, nearby.left) ? 0 : 1,
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.eq(_elm_lang$core$Maybe$Nothing, nearby.right) ? 0 : 1,
						_1: {ctor: '[]'}
					}
				}
			});
		var rowCount = _elm_lang$core$List$sum(
			{
				ctor: '::',
				_0: 1,
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Native_Utils.eq(_elm_lang$core$Maybe$Nothing, nearby.above) ? 0 : 1,
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.eq(_elm_lang$core$Maybe$Nothing, nearby.below) ? 0 : 1,
						_1: {ctor: '[]'}
					}
				}
			});
		return {
			ctor: '_Tuple2',
			_0: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
					_mdgriffith$stylish_elephants$Internal_Model$GridTemplateStyle(
						{
							spacing: {
								ctor: '_Tuple2',
								_0: _mdgriffith$stylish_elephants$Internal_Model$Px(_p5),
								_1: _mdgriffith$stylish_elephants$Internal_Model$Px(_p6)
							},
							columns: A2(
								_elm_lang$core$List$filterMap,
								_elm_lang$core$Basics$identity,
								{
									ctor: '::',
									_0: A2(
										_elm_lang$core$Maybe$map,
										_elm_lang$core$Basics$always(nearby.defaultWidth),
										nearby.left),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Maybe$Just(nearby.primaryWidth),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$core$Maybe$map,
												_elm_lang$core$Basics$always(nearby.defaultWidth),
												nearby.right),
											_1: {ctor: '[]'}
										}
									}
								}),
							rows: A2(
								_elm_lang$core$List$map,
								_elm_lang$core$Basics$always(_mdgriffith$stylish_elephants$Internal_Model$Content),
								A2(_elm_lang$core$List$range, 1, rowCount))
						})),
				_1: {ctor: '[]'}
			},
			_1: A2(
				_elm_lang$core$List$filterMap,
				_elm_lang$core$Basics$identity,
				{
					ctor: '::',
					_0: _elm_lang$core$Maybe$Just(
						A5(
							_mdgriffith$stylish_elephants$Internal_Model$element,
							_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
							_mdgriffith$stylish_elephants$Internal_Model$asEl,
							_elm_lang$core$Maybe$Nothing,
							{
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
									_mdgriffith$stylish_elephants$Internal_Model$GridPosition(
										{row: rows.primary, col: columns.primary, width: 1, height: 1})),
								_1: {ctor: '[]'}
							},
							_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
								{
									ctor: '::',
									_0: nearby.primary,
									_1: {ctor: '[]'}
								}))),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$core$Maybe$map,
							place(_mdgriffith$stylish_elephants$Internal_Grid$OnLeft),
							nearby.left),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$core$Maybe$map,
								place(_mdgriffith$stylish_elephants$Internal_Grid$OnRight),
								nearby.right),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$core$Maybe$map,
									place(_mdgriffith$stylish_elephants$Internal_Grid$Above),
									nearby.above),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$core$Maybe$map,
										place(_mdgriffith$stylish_elephants$Internal_Grid$Below),
										nearby.below),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				})
		};
	});
var _mdgriffith$stylish_elephants$Internal_Grid$relative = F3(
	function (node, attributes, around) {
		var make = function (positioned) {
			return A5(
				_mdgriffith$stylish_elephants$Internal_Model$element,
				_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
				_mdgriffith$stylish_elephants$Internal_Model$asEl,
				_elm_lang$core$Maybe$Nothing,
				positioned.attrs,
				_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(positioned.child));
		};
		var _p7 = A2(
			_mdgriffith$stylish_elephants$Internal_Model$getSpacing,
			attributes,
			{ctor: '_Tuple2', _0: 5, _1: 5});
		var sX = _p7._0;
		var sY = _p7._1;
		var _p8 = A2(
			_mdgriffith$stylish_elephants$Internal_Grid$createGrid,
			{ctor: '_Tuple2', _0: sX, _1: sY},
			around);
		var template = _p8._0;
		var children = _p8._1;
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asGrid,
			node,
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$center,
				_1: A2(_elm_lang$core$Basics_ops['++'], template, attributes)
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(children));
	});
var _mdgriffith$stylish_elephants$Internal_Grid$Column = {ctor: 'Column'};
var _mdgriffith$stylish_elephants$Internal_Grid$Row = {ctor: 'Row'};
var _mdgriffith$stylish_elephants$Internal_Grid$GridElement = {ctor: 'GridElement'};

var _mdgriffith$stylish_elephants$Element_Input$defaultCheckbox = function (checked) {
	return A2(
		_mdgriffith$stylish_elephants$Element$el,
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$width(
				_mdgriffith$stylish_elephants$Element$px(12)),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$height(
					_mdgriffith$stylish_elephants$Element$px(12)),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element_Font$color(_elm_lang$core$Color$white),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element_Font$size(9),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element_Font$center,
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element_Border$rounded(3),
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element_Border$color(
										A3(_elm_lang$core$Color$rgb, 211, 211, 211)),
									_1: {
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Element_Font$family(
											{
												ctor: '::',
												_0: _mdgriffith$stylish_elephants$Element_Font$typeface('georgia'),
												_1: {
													ctor: '::',
													_0: _mdgriffith$stylish_elephants$Element_Font$serif,
													_1: {ctor: '[]'}
												}
											}),
										_1: {
											ctor: '::',
											_0: _mdgriffith$stylish_elephants$Element_Border$shadow(
												{
													offset: {ctor: '_Tuple2', _0: 0, _1: 0},
													blur: 1,
													size: 2,
													color: A3(_elm_lang$core$Color$rgb, 238, 238, 238)
												}),
											_1: {
												ctor: '::',
												_0: _mdgriffith$stylish_elephants$Element_Background$color(
													checked ? A3(_elm_lang$core$Color$rgb, 59, 153, 252) : _elm_lang$core$Color$white),
												_1: {
													ctor: '::',
													_0: _mdgriffith$stylish_elephants$Element_Border$width(
														checked ? 0 : 1),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		checked ? _mdgriffith$stylish_elephants$Element$text('✓') : _mdgriffith$stylish_elephants$Element$empty);
};
var _mdgriffith$stylish_elephants$Element_Input$defaultRadioIcon = function (status) {
	return A2(
		_mdgriffith$stylish_elephants$Element$el,
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$width(
				_mdgriffith$stylish_elephants$Element$px(14)),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$height(
					_mdgriffith$stylish_elephants$Element$px(14)),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element_Background$color(_elm_lang$core$Color$white),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element_Border$rounded(7),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element_Border$width(
								function () {
									var _p0 = status;
									switch (_p0.ctor) {
										case 'Idle':
											return 1;
										case 'Focused':
											return 1;
										default:
											return 5;
									}
								}()),
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element_Border$color(
									function () {
										var _p1 = status;
										switch (_p1.ctor) {
											case 'Idle':
												return A3(_elm_lang$core$Color$rgb, 208, 208, 208);
											case 'Focused':
												return A3(_elm_lang$core$Color$rgb, 208, 208, 208);
											default:
												return A3(_elm_lang$core$Color$rgb, 59, 153, 252);
										}
									}()),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		},
		_mdgriffith$stylish_elephants$Element$empty);
};
var _mdgriffith$stylish_elephants$Element_Input$defaultTextPadding = A2(_mdgriffith$stylish_elephants$Element$paddingXY, 12, 7);
var _mdgriffith$stylish_elephants$Element_Input$defaultTextBoxStyle = {
	ctor: '::',
	_0: _mdgriffith$stylish_elephants$Element_Input$defaultTextPadding,
	_1: {
		ctor: '::',
		_0: _mdgriffith$stylish_elephants$Element_Border$rounded(3),
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element_Border$color(_elm_lang$core$Color$lightGrey),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element_Background$color(_elm_lang$core$Color$white),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element_Border$width(1),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$spacing(3),
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _mdgriffith$stylish_elephants$Element_Input$autofocus = function (_p2) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$autofocus(_p2));
};
var _mdgriffith$stylish_elephants$Element_Input$autofill = function (_p3) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		A2(_elm_lang$html$Html_Attributes$attribute, 'autocomplete', _p3));
};
var _mdgriffith$stylish_elephants$Element_Input$readonly = function (_p4) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$readonly(_p4));
};
var _mdgriffith$stylish_elephants$Element_Input$spellcheck = function (_p5) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$spellcheck(_p5));
};
var _mdgriffith$stylish_elephants$Element_Input$disabled = function (_p6) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$disabled(_p6));
};
var _mdgriffith$stylish_elephants$Element_Input$tabindex = function (_p7) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$tabindex(_p7));
};
var _mdgriffith$stylish_elephants$Element_Input$textValue = function (_p8) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$defaultValue(_p8));
};
var _mdgriffith$stylish_elephants$Element_Input$value = function (_p9) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$value(_p9));
};
var _mdgriffith$stylish_elephants$Element_Input$name = function (_p10) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$name(_p10));
};
var _mdgriffith$stylish_elephants$Element_Input$selected = function (_p11) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$selected(_p11));
};
var _mdgriffith$stylish_elephants$Element_Input$checked = function (_p12) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$checked(_p12));
};
var _mdgriffith$stylish_elephants$Element_Input$type_ = function (_p13) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$type_(_p13));
};
var _mdgriffith$stylish_elephants$Element_Input$onFocusIn = function (msg) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		A2(
			_elm_lang$html$Html_Events$on,
			'focusin',
			_elm_lang$core$Json_Decode$succeed(msg)));
};
var _mdgriffith$stylish_elephants$Element_Input$onFocusOut = function (msg) {
	return _mdgriffith$stylish_elephants$Internal_Model$Attr(
		A2(
			_elm_lang$html$Html_Events$on,
			'focusout',
			_elm_lang$core$Json_Decode$succeed(msg)));
};
var _mdgriffith$stylish_elephants$Element_Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _p14 = lookup(code);
		if (_p14.ctor === 'Nothing') {
			return _elm_lang$core$Json_Decode$fail('No key matched');
		} else {
			return _elm_lang$core$Json_Decode$succeed(_p14._0);
		}
	};
	var isKey = A2(
		_elm_lang$core$Json_Decode$andThen,
		decode,
		A2(_elm_lang$core$Json_Decode$field, 'which', _elm_lang$core$Json_Decode$int));
	return A2(_mdgriffith$stylish_elephants$Internal_Events$on, 'keyup', isKey);
};
var _mdgriffith$stylish_elephants$Element_Input$preventKeydown = F2(
	function (desiredCode, msg) {
		var decode = function (code) {
			return _elm_lang$core$Native_Utils.eq(code, desiredCode) ? _elm_lang$core$Json_Decode$succeed(msg) : _elm_lang$core$Json_Decode$fail('Not the enter key');
		};
		var isKey = A2(
			_elm_lang$core$Json_Decode$andThen,
			decode,
			A2(_elm_lang$core$Json_Decode$field, 'which', _elm_lang$core$Json_Decode$int));
		return A3(
			_mdgriffith$stylish_elephants$Internal_Events$onWithOptions,
			'keydown',
			{stopPropagation: false, preventDefault: true},
			isKey);
	});
var _mdgriffith$stylish_elephants$Element_Input$onKey = F2(
	function (desiredCode, msg) {
		var decode = function (code) {
			return _elm_lang$core$Native_Utils.eq(code, desiredCode) ? _elm_lang$core$Json_Decode$succeed(msg) : _elm_lang$core$Json_Decode$fail('Not the enter key');
		};
		var isKey = A2(
			_elm_lang$core$Json_Decode$andThen,
			decode,
			A2(_elm_lang$core$Json_Decode$field, 'which', _elm_lang$core$Json_Decode$int));
		return A3(
			_mdgriffith$stylish_elephants$Internal_Events$onWithOptions,
			'keyup',
			{stopPropagation: false, preventDefault: true},
			isKey);
	});
var _mdgriffith$stylish_elephants$Element_Input$space = 32;
var _mdgriffith$stylish_elephants$Element_Input$downArrow = 40;
var _mdgriffith$stylish_elephants$Element_Input$rightArrow = 39;
var _mdgriffith$stylish_elephants$Element_Input$leftArrow = 37;
var _mdgriffith$stylish_elephants$Element_Input$upArrow = 38;
var _mdgriffith$stylish_elephants$Element_Input$backspace = 46;
var _mdgriffith$stylish_elephants$Element_Input$delete = 8;
var _mdgriffith$stylish_elephants$Element_Input$tab = 9;
var _mdgriffith$stylish_elephants$Element_Input$enter = 13;
var _mdgriffith$stylish_elephants$Element_Input$onDownArrow = function (msg) {
	return A2(_mdgriffith$stylish_elephants$Element_Input$onKey, 40, msg);
};
var _mdgriffith$stylish_elephants$Element_Input$onLeftArrow = function (msg) {
	return A2(_mdgriffith$stylish_elephants$Element_Input$onKey, 37, msg);
};
var _mdgriffith$stylish_elephants$Element_Input$onRightArrow = function (msg) {
	return A2(_mdgriffith$stylish_elephants$Element_Input$onKey, 39, msg);
};
var _mdgriffith$stylish_elephants$Element_Input$onUpArrow = function (msg) {
	return A2(_mdgriffith$stylish_elephants$Element_Input$onKey, 38, msg);
};
var _mdgriffith$stylish_elephants$Element_Input$onSpace = function (msg) {
	return A2(_mdgriffith$stylish_elephants$Element_Input$onKey, 32, msg);
};
var _mdgriffith$stylish_elephants$Element_Input$onEnter = function (msg) {
	return A2(_mdgriffith$stylish_elephants$Element_Input$onKey, 13, msg);
};
var _mdgriffith$stylish_elephants$Element_Input$row = F2(
	function (attrs, children) {
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asRow,
			_elm_lang$core$Maybe$Nothing,
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
				_1: attrs
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				_mdgriffith$stylish_elephants$Internal_Model$rowEdgeFillers(children)));
	});
var _mdgriffith$stylish_elephants$Element_Input$column = F2(
	function (attrs, children) {
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asColumn,
			_elm_lang$core$Maybe$Nothing,
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$height(_mdgriffith$stylish_elephants$Element$shrink),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
					_1: attrs
				}
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(children));
	});
var _mdgriffith$stylish_elephants$Element_Input$place = F3(
	function (position, el, group) {
		var _p15 = position;
		switch (_p15.ctor) {
			case 'Above':
				var _p16 = group.above;
				if (_p16.ctor === 'Nothing') {
					return _elm_lang$core$Native_Utils.update(
						group,
						{
							above: _elm_lang$core$Maybe$Just(el)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						group,
						{
							above: _elm_lang$core$Maybe$Just(
								_elm_lang$core$Native_Utils.update(
									el,
									{
										child: A2(_elm_lang$core$Basics_ops['++'], el.child, _p16._0.child),
										layout: _mdgriffith$stylish_elephants$Internal_Grid$Row
									}))
						});
				}
			case 'Below':
				var _p17 = group.below;
				if (_p17.ctor === 'Nothing') {
					return _elm_lang$core$Native_Utils.update(
						group,
						{
							below: _elm_lang$core$Maybe$Just(el)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						group,
						{
							below: _elm_lang$core$Maybe$Just(
								_elm_lang$core$Native_Utils.update(
									el,
									{
										child: A2(_elm_lang$core$Basics_ops['++'], el.child, _p17._0.child),
										layout: _mdgriffith$stylish_elephants$Internal_Grid$Row
									}))
						});
				}
			case 'OnRight':
				var _p18 = group.right;
				if (_p18.ctor === 'Nothing') {
					return _elm_lang$core$Native_Utils.update(
						group,
						{
							right: _elm_lang$core$Maybe$Just(el)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						group,
						{
							right: _elm_lang$core$Maybe$Just(
								_elm_lang$core$Native_Utils.update(
									el,
									{
										child: A2(_elm_lang$core$Basics_ops['++'], el.child, _p18._0.child),
										layout: _mdgriffith$stylish_elephants$Internal_Grid$Column
									}))
						});
				}
			default:
				var _p19 = group.left;
				if (_p19.ctor === 'Nothing') {
					return _elm_lang$core$Native_Utils.update(
						group,
						{
							left: _elm_lang$core$Maybe$Just(el)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						group,
						{
							left: _elm_lang$core$Maybe$Just(
								_elm_lang$core$Native_Utils.update(
									el,
									{
										child: A2(_elm_lang$core$Basics_ops['++'], el.child, _p19._0.child),
										layout: _mdgriffith$stylish_elephants$Internal_Grid$Column
									}))
						});
				}
		}
	});
var _mdgriffith$stylish_elephants$Element_Input$positionLabels = F4(
	function (attributes, label, notice, input) {
		return A3(
			_mdgriffith$stylish_elephants$Internal_Grid$relative,
			_elm_lang$core$Maybe$Just('label'),
			attributes,
			function (group) {
				var _p20 = notice;
				if (_p20.ctor === 'Nothing') {
					return group;
				} else {
					return A3(
						_mdgriffith$stylish_elephants$Element_Input$place,
						_p20._0._0,
						{
							layout: _mdgriffith$stylish_elephants$Internal_Grid$GridElement,
							child: {
								ctor: '::',
								_0: _p20._0._2,
								_1: {ctor: '[]'}
							},
							attrs: {ctor: '::', _0: _mdgriffith$stylish_elephants$Element$alignLeft, _1: _p20._0._1},
							width: 1,
							height: 1
						},
						group);
				}
			}(
				function (group) {
					var _p21 = label;
					return A3(
						_mdgriffith$stylish_elephants$Element_Input$place,
						_p21._0,
						{
							layout: _mdgriffith$stylish_elephants$Internal_Grid$GridElement,
							child: {
								ctor: '::',
								_0: _p21._2,
								_1: {ctor: '[]'}
							},
							attrs: {ctor: '::', _0: _mdgriffith$stylish_elephants$Element$alignLeft, _1: _p21._1},
							width: 1,
							height: 1
						},
						group);
				}(
					{
						right: _elm_lang$core$Maybe$Nothing,
						left: _elm_lang$core$Maybe$Nothing,
						primary: input,
						primaryWidth: _mdgriffith$stylish_elephants$Internal_Model$Fill(1),
						defaultWidth: _mdgriffith$stylish_elephants$Internal_Model$Content,
						below: _elm_lang$core$Maybe$Nothing,
						above: _elm_lang$core$Maybe$Nothing
					})));
	});
var _mdgriffith$stylish_elephants$Element_Input$textHelper = F3(
	function (textType, attrs, textOptions) {
		var textTypeAttr = function () {
			var _p22 = textType;
			switch (_p22.ctor) {
				case 'Plain':
					return {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
							_elm_lang$html$Html_Attributes$type_('text')),
						_1: {ctor: '[]'}
					};
				case 'Username':
					return {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
							_elm_lang$html$Html_Attributes$type_('text')),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element_Input$autofill('username'),
							_1: {ctor: '[]'}
						}
					};
				case 'NewPassword':
					return {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
							_elm_lang$html$Html_Attributes$type_('password')),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element_Input$autofill('new-password'),
							_1: {ctor: '[]'}
						}
					};
				case 'CurrentPassword':
					return {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
							_elm_lang$html$Html_Attributes$type_('password')),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element_Input$autofill('current-password'),
							_1: {ctor: '[]'}
						}
					};
				case 'Email':
					return {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
							_elm_lang$html$Html_Attributes$type_('email')),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element_Input$autofill('email'),
							_1: {ctor: '[]'}
						}
					};
				default:
					return {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
							_elm_lang$html$Html_Attributes$type_('search')),
						_1: {ctor: '[]'}
					};
			}
		}();
		var behavior = function () {
			var _p23 = textOptions.onChange;
			if (_p23.ctor === 'Nothing') {
				return {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
						_elm_lang$html$Html_Attributes$disabled(true)),
					_1: {ctor: '[]'}
				};
			} else {
				return {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
						_elm_lang$html$Html_Events$onInput(_p23._0)),
					_1: {ctor: '[]'}
				};
			}
		}();
		var attributes = {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
			_1: attrs
		};
		var attributesFromChild = A2(
			_mdgriffith$stylish_elephants$Internal_Model$get,
			attributes,
			function (attr) {
				var _p24 = attr;
				_v12_8:
				do {
					switch (_p24.ctor) {
						case 'Width':
							if (_p24._0.ctor === 'Fill') {
								return true;
							} else {
								break _v12_8;
							}
						case 'Height':
							if (_p24._0.ctor === 'Fill') {
								return true;
							} else {
								break _v12_8;
							}
						case 'AlignX':
							return true;
						case 'AlignY':
							return true;
						case 'StyleClass':
							switch (_p24._0.ctor) {
								case 'SpacingStyle':
									return true;
								case 'LineHeight':
									return true;
								case 'FontSize':
									return true;
								case 'FontFamily':
									return true;
								default:
									break _v12_8;
							}
						default:
							break _v12_8;
					}
				} while(false);
				return false;
			});
		var parentAttributes = {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$spacing(5),
			_1: attributesFromChild
		};
		var inputPadding = A2(
			_mdgriffith$stylish_elephants$Internal_Model$get,
			attributes,
			function (attr) {
				var _p25 = attr;
				if ((_p25.ctor === 'StyleClass') && (_p25._0.ctor === 'PaddingStyle')) {
					return true;
				} else {
					return false;
				}
			});
		var inputElement = A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asEl,
			_elm_lang$core$Maybe$Nothing,
			function () {
				var _p26 = textOptions.placeholder;
				if (_p26.ctor === 'Nothing') {
					return {ctor: '[]'};
				} else {
					return {
						ctor: '::',
						_0: A2(
							_mdgriffith$stylish_elephants$Element$inFront,
							_elm_lang$core$Native_Utils.eq(textOptions.text, ''),
							A5(
								_mdgriffith$stylish_elephants$Internal_Model$element,
								_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
								_mdgriffith$stylish_elephants$Internal_Model$asEl,
								_elm_lang$core$Maybe$Nothing,
								{
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element_Font$color(_elm_lang$core$Color$charcoal),
									_1: {
										ctor: '::',
										_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'text-selection', 'no-text-selection'),
										_1: {
											ctor: '::',
											_0: _mdgriffith$stylish_elephants$Element_Input$defaultTextPadding,
											_1: {
												ctor: '::',
												_0: _mdgriffith$stylish_elephants$Element$height(_mdgriffith$stylish_elephants$Element$fill),
												_1: {
													ctor: '::',
													_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
													_1: A2(_elm_lang$core$Basics_ops['++'], inputPadding, _p26._0._0)
												}
											}
										}
									}
								},
								_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
									{
										ctor: '::',
										_0: _p26._0._1,
										_1: {ctor: '[]'}
									}))),
						_1: {ctor: '[]'}
					};
				}
			}(),
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				{
					ctor: '::',
					_0: A5(
						_mdgriffith$stylish_elephants$Internal_Model$element,
						_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
						_mdgriffith$stylish_elephants$Internal_Model$asEl,
						_elm_lang$core$Maybe$Just('input'),
						_elm_lang$core$List$concat(
							{
								ctor: '::',
								_0: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element_Input$value(textOptions.text),
									_1: {
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Element_Input$defaultTextPadding,
										_1: {
											ctor: '::',
											_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'focus', 'focus-exactly'),
											_1: {ctor: '[]'}
										}
									}
								},
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element_Input$defaultTextBoxStyle,
									_1: {
										ctor: '::',
										_0: textTypeAttr,
										_1: {
											ctor: '::',
											_0: behavior,
											_1: {
												ctor: '::',
												_0: attributes,
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}),
						_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
							{ctor: '[]'})),
					_1: {ctor: '[]'}
				}));
		return A4(
			_mdgriffith$stylish_elephants$Element_Input$positionLabels,
			{
				ctor: '::',
				_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'cursor', 'cursor-text'),
				_1: parentAttributes
			},
			textOptions.label,
			textOptions.notice,
			inputElement);
	});
var _mdgriffith$stylish_elephants$Element_Input$multilineHelper = F3(
	function (spellchecked, attrs, textOptions) {
		var behavior = function () {
			var _p27 = textOptions.onChange;
			if (_p27.ctor === 'Nothing') {
				return {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
						_elm_lang$html$Html_Attributes$disabled(true)),
					_1: {ctor: '[]'}
				};
			} else {
				return {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
						_elm_lang$html$Html_Events$onInput(_p27._0)),
					_1: {ctor: '[]'}
				};
			}
		}();
		var attributes = {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$height(_mdgriffith$stylish_elephants$Element$shrink),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
				_1: A2(_elm_lang$core$Basics_ops['++'], _mdgriffith$stylish_elephants$Element_Input$defaultTextBoxStyle, attrs)
			}
		};
		var _p28 = A3(
			_elm_lang$core$List$foldr,
			F2(
				function (attr, _p29) {
					var _p30 = _p29;
					var _p38 = _p30._0;
					var _p37 = _p30._3;
					var _p36 = _p30._2;
					var _p35 = _p30._1;
					var _p31 = attr;
					_v17_5:
					do {
						switch (_p31.ctor) {
							case 'Describe':
								return {ctor: '_Tuple4', _0: _p38, _1: _p35, _2: _p36, _3: _p37};
							case 'Height':
								if (_p31._0.ctor === 'Content') {
									var _p32 = _p35;
									if (_p32.ctor === 'Nothing') {
										return {
											ctor: '_Tuple4',
											_0: _p38,
											_1: _elm_lang$core$Maybe$Just(true),
											_2: _p36,
											_3: _p37
										};
									} else {
										return {ctor: '_Tuple4', _0: _p38, _1: _p35, _2: _p36, _3: _p37};
									}
								} else {
									var _p33 = _p35;
									if (_p33.ctor === 'Nothing') {
										return {
											ctor: '_Tuple4',
											_0: _p38,
											_1: _elm_lang$core$Maybe$Just(false),
											_2: _p36,
											_3: {ctor: '::', _0: attr, _1: _p37}
										};
									} else {
										return {ctor: '_Tuple4', _0: _p38, _1: _p35, _2: _p36, _3: _p37};
									}
								}
							case 'StyleClass':
								switch (_p31._0.ctor) {
									case 'LineHeight':
										return {ctor: '_Tuple4', _0: _p38, _1: _p35, _2: _p36, _3: _p37};
									case 'PaddingStyle':
										var _p34 = _p38;
										if (_p34.ctor === 'Nothing') {
											return {
												ctor: '_Tuple4',
												_0: _elm_lang$core$Maybe$Just(
													{ctor: '_Tuple4', _0: _p31._0._0, _1: _p31._0._1, _2: _p31._0._2, _3: _p31._0._3}),
												_1: _p35,
												_2: _p36,
												_3: {ctor: '::', _0: attr, _1: _p37}
											};
										} else {
											return {ctor: '_Tuple4', _0: _p38, _1: _p35, _2: _p36, _3: _p37};
										}
									default:
										break _v17_5;
								}
							default:
								break _v17_5;
						}
					} while(false);
					return {
						ctor: '_Tuple4',
						_0: _p38,
						_1: _p35,
						_2: _p36,
						_3: {ctor: '::', _0: attr, _1: _p37}
					};
				}),
			{
				ctor: '_Tuple4',
				_0: _elm_lang$core$Maybe$Nothing,
				_1: _elm_lang$core$Maybe$Nothing,
				_2: _elm_lang$core$Maybe$Nothing,
				_3: {ctor: '[]'}
			},
			attributes);
		var padding = _p28._0;
		var heightContent = _p28._1;
		var maybeLineHeight = _p28._2;
		var adjustedAttributes = _p28._3;
		var withHeight = function () {
			var _p39 = heightContent;
			if ((_p39.ctor === 'Just') && (_p39._0 === true)) {
				var newlineCount = function (x) {
					return (_elm_lang$core$Native_Utils.cmp(x, 1) < 0) ? 1 : x;
				}(
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$List$length(
							_elm_lang$core$String$lines(textOptions.text))));
				var lineHeight = A2(_elm_lang$core$Maybe$withDefault, 1.5, maybeLineHeight);
				var heightValue = function (count) {
					var _p40 = A2(_elm_lang$core$Debug$log, 'padding', padding);
					if (_p40.ctor === 'Nothing') {
						return A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(count * lineHeight),
							'em');
					} else {
						return A2(
							_elm_lang$core$Basics_ops['++'],
							'calc(',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(count * lineHeight),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'em + ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p40._0._0 + _p40._0._2),
										'px)'))));
					}
				};
				var heightClass = _mdgriffith$stylish_elephants$Internal_Model$StyleClass(
					A3(
						_mdgriffith$stylish_elephants$Internal_Model$Single,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'textarea-height-',
							_elm_lang$core$Basics$toString(newlineCount)),
						'height',
						heightValue(newlineCount)));
				return {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Model$class('overflow-hidden'),
					_1: {ctor: '::', _0: heightClass, _1: adjustedAttributes}
				};
			} else {
				return adjustedAttributes;
			}
		}();
		var attributesFromChild = A2(
			_mdgriffith$stylish_elephants$Internal_Model$get,
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
				_1: attributes
			},
			function (attr) {
				var _p41 = attr;
				_v23_8:
				do {
					switch (_p41.ctor) {
						case 'Width':
							if (_p41._0.ctor === 'Fill') {
								return true;
							} else {
								break _v23_8;
							}
						case 'Height':
							if (_p41._0.ctor === 'Fill') {
								return true;
							} else {
								break _v23_8;
							}
						case 'AlignX':
							return true;
						case 'AlignY':
							return true;
						case 'StyleClass':
							switch (_p41._0.ctor) {
								case 'SpacingStyle':
									return true;
								case 'LineHeight':
									return true;
								case 'FontSize':
									return true;
								case 'FontFamily':
									return true;
								default:
									break _v23_8;
							}
						default:
							break _v23_8;
					}
				} while(false);
				return false;
			});
		var inputPadding = A2(
			_mdgriffith$stylish_elephants$Internal_Model$get,
			attributes,
			function (attr) {
				var _p42 = attr;
				if ((_p42.ctor === 'StyleClass') && (_p42._0.ctor === 'PaddingStyle')) {
					return true;
				} else {
					return false;
				}
			});
		var input = A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asEl,
			_elm_lang$core$Maybe$Nothing,
			function () {
				var _p43 = textOptions.placeholder;
				if (_p43.ctor === 'Nothing') {
					return {ctor: '[]'};
				} else {
					return {
						ctor: '::',
						_0: A2(
							_mdgriffith$stylish_elephants$Element$inFront,
							_elm_lang$core$Native_Utils.eq(textOptions.text, ''),
							A5(
								_mdgriffith$stylish_elephants$Internal_Model$element,
								_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
								_mdgriffith$stylish_elephants$Internal_Model$asEl,
								_elm_lang$core$Maybe$Nothing,
								{
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element_Font$color(_elm_lang$core$Color$charcoal),
									_1: {
										ctor: '::',
										_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'text-selection', 'no-text-selection'),
										_1: {
											ctor: '::',
											_0: _mdgriffith$stylish_elephants$Element_Input$defaultTextPadding,
											_1: {
												ctor: '::',
												_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'cursor', 'cursor-text'),
												_1: {
													ctor: '::',
													_0: _mdgriffith$stylish_elephants$Element$height(_mdgriffith$stylish_elephants$Element$fill),
													_1: {
														ctor: '::',
														_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
														_1: A2(_elm_lang$core$Basics_ops['++'], inputPadding, _p43._0._0)
													}
												}
											}
										}
									}
								},
								_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
									{
										ctor: '::',
										_0: _p43._0._1,
										_1: {ctor: '[]'}
									}))),
						_1: {ctor: '[]'}
					};
				}
			}(),
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				{
					ctor: '::',
					_0: A5(
						_mdgriffith$stylish_elephants$Internal_Model$element,
						_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
						_mdgriffith$stylish_elephants$Internal_Model$asEl,
						_elm_lang$core$Maybe$Just('textarea'),
						_elm_lang$core$List$concat(
							{
								ctor: '::',
								_0: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element_Input$value(textOptions.text),
									_1: {
										ctor: '::',
										_0: A2(_mdgriffith$stylish_elephants$Internal_Model$Class, 'focus', 'focus-exactly'),
										_1: {
											ctor: '::',
											_0: function () {
												var _p44 = spellchecked;
												if (_p44.ctor === 'SpellChecked') {
													return _mdgriffith$stylish_elephants$Element_Input$spellcheck(true);
												} else {
													return _mdgriffith$stylish_elephants$Element_Input$spellcheck(false);
												}
											}(),
											_1: {
												ctor: '::',
												_0: function () {
													var _p45 = maybeLineHeight;
													if (_p45.ctor === 'Nothing') {
														return _mdgriffith$stylish_elephants$Element_Font$lineHeight(1.5);
													} else {
														return _mdgriffith$stylish_elephants$Element_Font$lineHeight(_p45._0);
													}
												}(),
												_1: {ctor: '[]'}
											}
										}
									}
								},
								_1: {
									ctor: '::',
									_0: behavior,
									_1: {
										ctor: '::',
										_0: withHeight,
										_1: {ctor: '[]'}
									}
								}
							}),
						_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
							{
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Internal_Model$unstyled(
									_elm_lang$html$Html$text(textOptions.text)),
								_1: {ctor: '[]'}
							})),
					_1: {ctor: '[]'}
				}));
		return A4(_mdgriffith$stylish_elephants$Element_Input$positionLabels, attributesFromChild, textOptions.label, textOptions.notice, input);
	});
var _mdgriffith$stylish_elephants$Element_Input$checkbox = F2(
	function (attrs, _p46) {
		var _p47 = _p46;
		var _p57 = _p47.checked;
		var attributes = A2(
			_elm_lang$core$Basics_ops['++'],
			function () {
				var _p48 = _p47.onChange;
				if (_p48.ctor === 'Nothing') {
					return {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
							_elm_lang$html$Html_Attributes$disabled(true)),
						_1: {ctor: '[]'}
					};
				} else {
					var _p49 = _p48._0;
					return {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
							_elm_lang$html$Html_Events$onClick(
								_p49(!_p57))),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element_Input$onKeyLookup(
								function (code) {
									return _elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$enter) ? _elm_lang$core$Maybe$Just(
										_p49(!_p57)) : (_elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$space) ? _elm_lang$core$Maybe$Just(
										_p49(!_p57)) : _elm_lang$core$Maybe$Nothing);
								}),
							_1: {ctor: '[]'}
						}
					};
				}
			}(),
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element_Input$tabindex(0),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$pointer,
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$alignLeft,
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
							_1: attrs
						}
					}
				}
			});
		var input = A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asEl,
			_elm_lang$core$Maybe$Just('div'),
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
					A2(_elm_lang$html$Html_Attributes$attribute, 'role', 'checkbox')),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
						A2(
							_elm_lang$html$Html_Attributes$attribute,
							'aria-checked',
							_p57 ? 'true' : 'false')),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Internal_Model$class('focusable'),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element$centerY,
							_1: {ctor: '[]'}
						}
					}
				}
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				{
					ctor: '::',
					_0: function () {
						var _p50 = _p47.icon;
						if (_p50.ctor === 'Nothing') {
							return _mdgriffith$stylish_elephants$Element_Input$defaultCheckbox(_p57);
						} else {
							return _p50._0;
						}
					}(),
					_1: {ctor: '[]'}
				}));
		return A3(
			_mdgriffith$stylish_elephants$Internal_Grid$relative,
			_elm_lang$core$Maybe$Just('label'),
			attributes,
			function (group) {
				var _p51 = _p47.notice;
				if (_p51.ctor === 'Nothing') {
					return group;
				} else {
					var _p53 = _p51._0._0;
					return A3(
						_mdgriffith$stylish_elephants$Element_Input$place,
						_p53,
						{
							layout: _mdgriffith$stylish_elephants$Internal_Grid$GridElement,
							child: {
								ctor: '::',
								_0: _p51._0._2,
								_1: {ctor: '[]'}
							},
							attrs: {ctor: '::', _0: _mdgriffith$stylish_elephants$Element$alignLeft, _1: _p51._0._1},
							width: function () {
								var _p52 = _p53;
								switch (_p52.ctor) {
									case 'Above':
										return 2;
									case 'Below':
										return 2;
									default:
										return 1;
								}
							}(),
							height: 1
						},
						group);
				}
			}(
				function (group) {
					var _p54 = _p47.label;
					var _p56 = _p54._0;
					return A3(
						_mdgriffith$stylish_elephants$Element_Input$place,
						_p56,
						{
							layout: _mdgriffith$stylish_elephants$Internal_Grid$GridElement,
							child: {
								ctor: '::',
								_0: _p54._2,
								_1: {ctor: '[]'}
							},
							attrs: {ctor: '::', _0: _mdgriffith$stylish_elephants$Element$alignLeft, _1: _p54._1},
							width: function () {
								var _p55 = _p56;
								switch (_p55.ctor) {
									case 'Above':
										return 2;
									case 'Below':
										return 2;
									default:
										return 1;
								}
							}(),
							height: 1
						},
						group);
				}(
					{
						right: _elm_lang$core$Maybe$Nothing,
						left: _elm_lang$core$Maybe$Nothing,
						primary: input,
						primaryWidth: _mdgriffith$stylish_elephants$Internal_Model$Content,
						defaultWidth: _mdgriffith$stylish_elephants$Internal_Model$Fill(1),
						below: _elm_lang$core$Maybe$Nothing,
						above: _elm_lang$core$Maybe$Nothing
					})));
	});
var _mdgriffith$stylish_elephants$Element_Input$button = F2(
	function (attrs, _p58) {
		var _p59 = _p58;
		return A5(
			_mdgriffith$stylish_elephants$Internal_Model$element,
			_mdgriffith$stylish_elephants$Internal_Model$noStyleSheet,
			_mdgriffith$stylish_elephants$Internal_Model$asEl,
			_elm_lang$core$Maybe$Nothing,
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$shrink),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$height(_mdgriffith$stylish_elephants$Element$shrink),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$centerY,
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element$center,
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element$pointer,
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Internal_Model$Describe(_mdgriffith$stylish_elephants$Internal_Model$Button),
									_1: {
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
											_elm_lang$html$Html_Attributes$tabindex(0)),
										_1: function () {
											var _p60 = _p59.onPress;
											if (_p60.ctor === 'Nothing') {
												return {
													ctor: '::',
													_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
														_elm_lang$html$Html_Attributes$disabled(true)),
													_1: attrs
												};
											} else {
												var _p61 = _p60._0;
												return {
													ctor: '::',
													_0: _mdgriffith$stylish_elephants$Element_Events$onClick(_p61),
													_1: {
														ctor: '::',
														_0: _mdgriffith$stylish_elephants$Element_Input$onEnter(_p61),
														_1: attrs
													}
												};
											}
										}()
									}
								}
							}
						}
					}
				}
			},
			_mdgriffith$stylish_elephants$Internal_Model$Unkeyed(
				{
					ctor: '::',
					_0: _p59.label,
					_1: {ctor: '[]'}
				}));
	});
var _mdgriffith$stylish_elephants$Element_Input$Button = F2(
	function (a, b) {
		return {onPress: a, label: b};
	});
var _mdgriffith$stylish_elephants$Element_Input$Checkbox = F5(
	function (a, b, c, d, e) {
		return {onChange: a, icon: b, checked: c, label: d, notice: e};
	});
var _mdgriffith$stylish_elephants$Element_Input$Text = F5(
	function (a, b, c, d, e) {
		return {onChange: a, text: b, placeholder: c, label: d, notice: e};
	});
var _mdgriffith$stylish_elephants$Element_Input$Radio = F5(
	function (a, b, c, d, e) {
		return {onChange: a, options: b, selected: c, label: d, notice: e};
	});
var _mdgriffith$stylish_elephants$Element_Input$Select = F6(
	function (a, b, c, d, e, f) {
		return {onChange: a, selected: b, menu: c, placeholder: d, label: e, notice: f};
	});
var _mdgriffith$stylish_elephants$Element_Input$Placeholder = F2(
	function (a, b) {
		return {ctor: 'Placeholder', _0: a, _1: b};
	});
var _mdgriffith$stylish_elephants$Element_Input$placeholder = _mdgriffith$stylish_elephants$Element_Input$Placeholder;
var _mdgriffith$stylish_elephants$Element_Input$Label = F3(
	function (a, b, c) {
		return {ctor: 'Label', _0: a, _1: b, _2: c};
	});
var _mdgriffith$stylish_elephants$Element_Input$labelRight = _mdgriffith$stylish_elephants$Element_Input$Label(_mdgriffith$stylish_elephants$Internal_Grid$OnRight);
var _mdgriffith$stylish_elephants$Element_Input$labelLeft = _mdgriffith$stylish_elephants$Element_Input$Label(_mdgriffith$stylish_elephants$Internal_Grid$OnLeft);
var _mdgriffith$stylish_elephants$Element_Input$labelAbove = _mdgriffith$stylish_elephants$Element_Input$Label(_mdgriffith$stylish_elephants$Internal_Grid$Above);
var _mdgriffith$stylish_elephants$Element_Input$labelBelow = _mdgriffith$stylish_elephants$Element_Input$Label(_mdgriffith$stylish_elephants$Internal_Grid$Below);
var _mdgriffith$stylish_elephants$Element_Input$Notice = F3(
	function (a, b, c) {
		return {ctor: 'Notice', _0: a, _1: b, _2: c};
	});
var _mdgriffith$stylish_elephants$Element_Input$warningRight = _mdgriffith$stylish_elephants$Element_Input$Notice(_mdgriffith$stylish_elephants$Internal_Grid$OnRight);
var _mdgriffith$stylish_elephants$Element_Input$warningLeft = _mdgriffith$stylish_elephants$Element_Input$Notice(_mdgriffith$stylish_elephants$Internal_Grid$OnLeft);
var _mdgriffith$stylish_elephants$Element_Input$warningAbove = _mdgriffith$stylish_elephants$Element_Input$Notice(_mdgriffith$stylish_elephants$Internal_Grid$Above);
var _mdgriffith$stylish_elephants$Element_Input$warningBelow = _mdgriffith$stylish_elephants$Element_Input$Notice(_mdgriffith$stylish_elephants$Internal_Grid$Below);
var _mdgriffith$stylish_elephants$Element_Input$errorRight = _mdgriffith$stylish_elephants$Element_Input$Notice(_mdgriffith$stylish_elephants$Internal_Grid$OnRight);
var _mdgriffith$stylish_elephants$Element_Input$errorLeft = _mdgriffith$stylish_elephants$Element_Input$Notice(_mdgriffith$stylish_elephants$Internal_Grid$OnLeft);
var _mdgriffith$stylish_elephants$Element_Input$errorAbove = _mdgriffith$stylish_elephants$Element_Input$Notice(_mdgriffith$stylish_elephants$Internal_Grid$Above);
var _mdgriffith$stylish_elephants$Element_Input$errorBelow = _mdgriffith$stylish_elephants$Element_Input$Notice(_mdgriffith$stylish_elephants$Internal_Grid$Below);
var _mdgriffith$stylish_elephants$Element_Input$Search = {ctor: 'Search'};
var _mdgriffith$stylish_elephants$Element_Input$search = _mdgriffith$stylish_elephants$Element_Input$textHelper(_mdgriffith$stylish_elephants$Element_Input$Search);
var _mdgriffith$stylish_elephants$Element_Input$Email = {ctor: 'Email'};
var _mdgriffith$stylish_elephants$Element_Input$email = _mdgriffith$stylish_elephants$Element_Input$textHelper(_mdgriffith$stylish_elephants$Element_Input$Email);
var _mdgriffith$stylish_elephants$Element_Input$CurrentPassword = {ctor: 'CurrentPassword'};
var _mdgriffith$stylish_elephants$Element_Input$currentPassword = _mdgriffith$stylish_elephants$Element_Input$textHelper(_mdgriffith$stylish_elephants$Element_Input$CurrentPassword);
var _mdgriffith$stylish_elephants$Element_Input$NewPassword = {ctor: 'NewPassword'};
var _mdgriffith$stylish_elephants$Element_Input$newPassword = _mdgriffith$stylish_elephants$Element_Input$textHelper(_mdgriffith$stylish_elephants$Element_Input$NewPassword);
var _mdgriffith$stylish_elephants$Element_Input$Username = {ctor: 'Username'};
var _mdgriffith$stylish_elephants$Element_Input$username = _mdgriffith$stylish_elephants$Element_Input$textHelper(_mdgriffith$stylish_elephants$Element_Input$Username);
var _mdgriffith$stylish_elephants$Element_Input$Plain = {ctor: 'Plain'};
var _mdgriffith$stylish_elephants$Element_Input$text = _mdgriffith$stylish_elephants$Element_Input$textHelper(_mdgriffith$stylish_elephants$Element_Input$Plain);
var _mdgriffith$stylish_elephants$Element_Input$NotSpellChecked = {ctor: 'NotSpellChecked'};
var _mdgriffith$stylish_elephants$Element_Input$multiline = _mdgriffith$stylish_elephants$Element_Input$multilineHelper(_mdgriffith$stylish_elephants$Element_Input$NotSpellChecked);
var _mdgriffith$stylish_elephants$Element_Input$SpellChecked = {ctor: 'SpellChecked'};
var _mdgriffith$stylish_elephants$Element_Input$spellcheckedMultiline = _mdgriffith$stylish_elephants$Element_Input$multilineHelper(_mdgriffith$stylish_elephants$Element_Input$SpellChecked);
var _mdgriffith$stylish_elephants$Element_Input$Option = F3(
	function (a, b, c) {
		return {ctor: 'Option', _0: a, _1: b, _2: c};
	});
var _mdgriffith$stylish_elephants$Element_Input$option = F2(
	function (value, text) {
		return A3(_mdgriffith$stylish_elephants$Element_Input$Option, value, _mdgriffith$stylish_elephants$Element_Input$defaultRadioIcon, text);
	});
var _mdgriffith$stylish_elephants$Element_Input$Selected = {ctor: 'Selected'};
var _mdgriffith$stylish_elephants$Element_Input$Focused = {ctor: 'Focused'};
var _mdgriffith$stylish_elephants$Element_Input$Idle = {ctor: 'Idle'};
var _mdgriffith$stylish_elephants$Element_Input$Menu = F3(
	function (a, b, c) {
		return {ctor: 'Menu', _0: a, _1: b, _2: c};
	});
var _mdgriffith$stylish_elephants$Element_Input$MenuBelow = {ctor: 'MenuBelow'};
var _mdgriffith$stylish_elephants$Element_Input$menuBelow = function (attrs) {
	return A2(
		_mdgriffith$stylish_elephants$Element_Input$Menu,
		_mdgriffith$stylish_elephants$Element_Input$MenuBelow,
		A2(_elm_lang$core$Basics_ops['++'], _mdgriffith$stylish_elephants$Element_Input$defaultTextBoxStyle, attrs));
};
var _mdgriffith$stylish_elephants$Element_Input$MenuAbove = {ctor: 'MenuAbove'};
var _mdgriffith$stylish_elephants$Element_Input$menuAbove = function (attrs) {
	return A2(
		_mdgriffith$stylish_elephants$Element_Input$Menu,
		_mdgriffith$stylish_elephants$Element_Input$MenuAbove,
		A2(_elm_lang$core$Basics_ops['++'], _mdgriffith$stylish_elephants$Element_Input$defaultTextBoxStyle, attrs));
};
var _mdgriffith$stylish_elephants$Element_Input$AfterFound = {ctor: 'AfterFound'};
var _mdgriffith$stylish_elephants$Element_Input$BeforeFound = {ctor: 'BeforeFound'};
var _mdgriffith$stylish_elephants$Element_Input$NotFound = {ctor: 'NotFound'};
var _mdgriffith$stylish_elephants$Element_Input$radioHelper = F3(
	function (orientation, attrs, input) {
		var track = F2(
			function (option, _p62) {
				var _p63 = _p62;
				var _p69 = _p63._1;
				var _p68 = _p63._2;
				var _p67 = _p63._0;
				var _p64 = option;
				var _p66 = _p64._0;
				var _p65 = _p67;
				switch (_p65.ctor) {
					case 'NotFound':
						return _elm_lang$core$Native_Utils.eq(
							_elm_lang$core$Maybe$Just(_p66),
							input.selected) ? {ctor: '_Tuple3', _0: _mdgriffith$stylish_elephants$Element_Input$BeforeFound, _1: _p69, _2: _p68} : {ctor: '_Tuple3', _0: _p67, _1: _p66, _2: _p68};
					case 'BeforeFound':
						return {ctor: '_Tuple3', _0: _mdgriffith$stylish_elephants$Element_Input$AfterFound, _1: _p69, _2: _p66};
					default:
						return {ctor: '_Tuple3', _0: _p67, _1: _p69, _2: _p68};
				}
			});
		var prevNext = function () {
			var _p70 = input.options;
			if (_p70.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p75 = _p70._0._0;
				return function (_p71) {
					var _p72 = _p71;
					var _p74 = _p72._1;
					var _p73 = _p72._0;
					switch (_p73.ctor) {
						case 'NotFound':
							return _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple2', _0: _p74, _1: _p75});
						case 'BeforeFound':
							return _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple2', _0: _p74, _1: _p75});
						default:
							return _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple2', _0: _p74, _1: _p72._2});
					}
				}(
					A3(
						_elm_lang$core$List$foldl,
						track,
						{ctor: '_Tuple3', _0: _mdgriffith$stylish_elephants$Element_Input$NotFound, _1: _p75, _2: _p75},
						input.options));
			}
		}();
		var toggleSelected = function () {
			var _p76 = input.selected;
			if (_p76.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		}();
		var spacing = A2(
			_mdgriffith$stylish_elephants$Internal_Model$getSpacingAttribute,
			attrs,
			{ctor: '_Tuple2', _0: 5, _1: 5});
		var renderOption = function (_p77) {
			var _p78 = _p77;
			var _p82 = _p78._0;
			var status = _elm_lang$core$Native_Utils.eq(
				_elm_lang$core$Maybe$Just(_p82),
				input.selected) ? _mdgriffith$stylish_elephants$Element_Input$Selected : _mdgriffith$stylish_elephants$Element_Input$Idle;
			return A2(
				_mdgriffith$stylish_elephants$Element$row,
				{
					ctor: '::',
					_0: spacing,
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$pointer,
						_1: {
							ctor: '::',
							_0: function () {
								var _p79 = input.onChange;
								if (_p79.ctor === 'Nothing') {
									return _mdgriffith$stylish_elephants$Internal_Model$NoAttribute;
								} else {
									return _mdgriffith$stylish_elephants$Element_Events$onClick(
										_p79._0(_p82));
								}
							}(),
							_1: {
								ctor: '::',
								_0: function () {
									var _p80 = status;
									if (_p80.ctor === 'Selected') {
										return _mdgriffith$stylish_elephants$Internal_Model$class('focusable');
									} else {
										return _mdgriffith$stylish_elephants$Internal_Model$NoAttribute;
									}
								}(),
								_1: {
									ctor: '::',
									_0: function () {
										var _p81 = status;
										if (_p81.ctor === 'Selected') {
											return _mdgriffith$stylish_elephants$Internal_Model$Attr(
												A2(_elm_lang$html$Html_Attributes$attribute, 'aria-checked', 'true'));
										} else {
											return _mdgriffith$stylish_elephants$Internal_Model$Attr(
												A2(_elm_lang$html$Html_Attributes$attribute, 'aria-checked', 'false'));
										}
									}(),
									_1: {
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
											A2(_elm_lang$html$Html_Attributes$attribute, 'role', 'radio')),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				},
				{
					ctor: '::',
					_0: _p78._1(status),
					_1: {
						ctor: '::',
						_0: A2(
							_mdgriffith$stylish_elephants$Element$el,
							{
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Internal_Model$class('unfocusable'),
									_1: {ctor: '[]'}
								}
							},
							_p78._2),
						_1: {ctor: '[]'}
					}
				});
		};
		var optionArea = function () {
			var _p83 = orientation;
			if (_p83.ctor === 'Row') {
				return A2(
					_mdgriffith$stylish_elephants$Element_Input$row,
					attrs,
					A2(_elm_lang$core$List$map, renderOption, input.options));
			} else {
				return A2(
					_mdgriffith$stylish_elephants$Element_Input$column,
					attrs,
					A2(_elm_lang$core$List$map, renderOption, input.options));
			}
		}();
		return A4(
			_mdgriffith$stylish_elephants$Element_Input$positionLabels,
			function () {
				var _p84 = input.onChange;
				if (_p84.ctor === 'Nothing') {
					return {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$alignLeft,
						_1: {ctor: '[]'}
					};
				} else {
					var _p89 = _p84._0;
					return A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						{
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(_mdgriffith$stylish_elephants$Element$alignLeft),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Maybe$Just(
									_mdgriffith$stylish_elephants$Element_Input$tabindex(0)),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Maybe$Just(
										_mdgriffith$stylish_elephants$Internal_Model$Attr(
											A2(_elm_lang$html$Html_Attributes$attribute, 'role', 'radiogroup'))),
									_1: {
										ctor: '::',
										_0: function () {
											var _p85 = prevNext;
											if (_p85.ctor === 'Nothing') {
												return _elm_lang$core$Maybe$Nothing;
											} else {
												var _p88 = _p85._0._0;
												var _p87 = _p85._0._1;
												return _elm_lang$core$Maybe$Just(
													_mdgriffith$stylish_elephants$Element_Input$onKeyLookup(
														function (code) {
															if (_elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$leftArrow)) {
																return _elm_lang$core$Maybe$Just(
																	_p89(_p88));
															} else {
																if (_elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$upArrow)) {
																	return _elm_lang$core$Maybe$Just(
																		_p89(_p88));
																} else {
																	if (_elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$rightArrow)) {
																		return _elm_lang$core$Maybe$Just(
																			_p89(_p87));
																	} else {
																		if (_elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$downArrow)) {
																			return _elm_lang$core$Maybe$Just(
																				_p89(_p87));
																		} else {
																			if (_elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$space)) {
																				var _p86 = input.selected;
																				if (_p86.ctor === 'Nothing') {
																					return _elm_lang$core$Maybe$Just(
																						_p89(_p88));
																				} else {
																					return _elm_lang$core$Maybe$Nothing;
																				}
																			} else {
																				return _elm_lang$core$Maybe$Nothing;
																			}
																		}
																	}
																}
															}
														}));
											}
										}(),
										_1: {ctor: '[]'}
									}
								}
							}
						});
				}
			}(),
			input.label,
			input.notice,
			optionArea);
	});
var _mdgriffith$stylish_elephants$Element_Input$select = F2(
	function (attrs, input) {
		var track = F2(
			function (option, _p90) {
				var _p91 = _p90;
				var _p98 = _p91._2;
				var _p97 = _p91._1;
				var _p96 = _p91._3;
				var _p95 = _p91._0;
				var _p92 = option;
				var _p94 = _p92._0;
				var _p93 = _p95;
				switch (_p93.ctor) {
					case 'NotFound':
						return _elm_lang$core$Native_Utils.eq(
							_elm_lang$core$Maybe$Just(_p94),
							input.selected) ? {
							ctor: '_Tuple4',
							_0: _mdgriffith$stylish_elephants$Element_Input$BeforeFound,
							_1: _p97,
							_2: _elm_lang$core$Maybe$Just(option),
							_3: _p96
						} : {ctor: '_Tuple4', _0: _p95, _1: _p94, _2: _p98, _3: _p96};
					case 'BeforeFound':
						return {ctor: '_Tuple4', _0: _mdgriffith$stylish_elephants$Element_Input$AfterFound, _1: _p97, _2: _p98, _3: _p94};
					default:
						return {ctor: '_Tuple4', _0: _p95, _1: _p97, _2: _p98, _3: _p96};
				}
			});
		var prevNext = function () {
			var _p99 = input.menu;
			var _p107 = _p99._2;
			var _p100 = _p107;
			if (_p100.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p106 = _p100._0._0;
				return function (_p101) {
					var _p102 = _p101;
					var _p105 = _p102._2;
					var _p104 = _p102._1;
					var _p103 = _p102._0;
					switch (_p103.ctor) {
						case 'NotFound':
							return _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple3', _0: _p104, _1: _p105, _2: _p106});
						case 'BeforeFound':
							return _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple3', _0: _p104, _1: _p105, _2: _p106});
						default:
							return _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple3', _0: _p104, _1: _p105, _2: _p102._3});
					}
				}(
					A3(
						_elm_lang$core$List$foldl,
						track,
						{ctor: '_Tuple4', _0: _mdgriffith$stylish_elephants$Element_Input$NotFound, _1: _p106, _2: _elm_lang$core$Maybe$Nothing, _3: _p106},
						_p107));
			}
		}();
		var toggleSelected = function () {
			var _p108 = input.selected;
			if (_p108.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		}();
		var renderSelectedOption = function (_p109) {
			var _p110 = _p109;
			var status = _elm_lang$core$Native_Utils.eq(
				_elm_lang$core$Maybe$Just(_p110._0),
				input.selected) ? _mdgriffith$stylish_elephants$Element_Input$Selected : _mdgriffith$stylish_elephants$Element_Input$Idle;
			return A2(
				_mdgriffith$stylish_elephants$Element$el,
				{
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$pointer,
						_1: {ctor: '[]'}
					}
				},
				_p110._2);
		};
		var renderOption = function (_p111) {
			var _p112 = _p111;
			var _p116 = _p112._0;
			var status = _elm_lang$core$Native_Utils.eq(
				_elm_lang$core$Maybe$Just(_p116),
				input.selected) ? _mdgriffith$stylish_elephants$Element_Input$Selected : _mdgriffith$stylish_elephants$Element_Input$Idle;
			return A2(
				_mdgriffith$stylish_elephants$Element$el,
				{
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$pointer,
						_1: {
							ctor: '::',
							_0: function () {
								var _p113 = input.onChange;
								if (_p113.ctor === 'Nothing') {
									return _mdgriffith$stylish_elephants$Internal_Model$NoAttribute;
								} else {
									return _mdgriffith$stylish_elephants$Element_Events$onClick(
										_p113._0(_p116));
								}
							}(),
							_1: {
								ctor: '::',
								_0: function () {
									var _p114 = status;
									if (_p114.ctor === 'Selected') {
										return _mdgriffith$stylish_elephants$Internal_Model$class('focusable');
									} else {
										return _mdgriffith$stylish_elephants$Internal_Model$NoAttribute;
									}
								}(),
								_1: {
									ctor: '::',
									_0: function () {
										var _p115 = status;
										if (_p115.ctor === 'Selected') {
											return _mdgriffith$stylish_elephants$Internal_Model$Attr(
												A2(_elm_lang$html$Html_Attributes$attribute, 'aria-checked', 'true'));
										} else {
											return _mdgriffith$stylish_elephants$Internal_Model$Attr(
												A2(_elm_lang$html$Html_Attributes$attribute, 'aria-checked', 'false'));
										}
									}(),
									_1: {
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Internal_Model$Attr(
											A2(_elm_lang$html$Html_Attributes$attribute, 'role', 'radio')),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				},
				_p112._2);
		};
		var box = A2(
			_mdgriffith$stylish_elephants$Element$el,
			{
				ctor: '::',
				_0: function () {
					var _p117 = input.menu;
					var _p120 = _p117._2;
					var _p119 = _p117._1;
					var _p118 = _p117._0;
					if (_p118.ctor === 'MenuAbove') {
						return A2(
							_mdgriffith$stylish_elephants$Element$above,
							true,
							A2(
								_mdgriffith$stylish_elephants$Element_Input$column,
								{
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Internal_Model$class('show-on-focus'),
									_1: {
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Element_Background$color(_elm_lang$core$Color$white),
										_1: _p119
									}
								},
								A2(_elm_lang$core$List$map, renderOption, _p120)));
					} else {
						return A2(
							_mdgriffith$stylish_elephants$Element$below,
							true,
							A2(
								_mdgriffith$stylish_elephants$Element_Input$column,
								{
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Internal_Model$class('show-on-focus'),
									_1: {
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Element_Background$color(_elm_lang$core$Color$white),
										_1: _p119
									}
								},
								A2(_elm_lang$core$List$map, renderOption, _p120)));
					}
				}(),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element_Border$width(1),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element_Border$color(_elm_lang$core$Color$lightGrey),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element_Border$rounded(5),
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element_Input$defaultTextPadding,
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
									_1: {ctor: '::', _0: _mdgriffith$stylish_elephants$Element$pointer, _1: attrs}
								}
							}
						}
					}
				}
			},
			function () {
				var _p121 = prevNext;
				if (_p121.ctor === 'Nothing') {
					return _mdgriffith$stylish_elephants$Element$empty;
				} else {
					var _p122 = _p121._0._1;
					if (_p122.ctor === 'Nothing') {
						var _p123 = input.placeholder;
						if (_p123.ctor === 'Nothing') {
							return _mdgriffith$stylish_elephants$Element$text('-');
						} else {
							return _p123._0;
						}
					} else {
						return renderSelectedOption(_p122._0);
					}
				}
			}());
		var spacing = A2(
			_mdgriffith$stylish_elephants$Internal_Model$getSpacingAttribute,
			attrs,
			{ctor: '_Tuple2', _0: 5, _1: 5});
		return A4(
			_mdgriffith$stylish_elephants$Element_Input$positionLabels,
			function () {
				var _p124 = input.onChange;
				if (_p124.ctor === 'Nothing') {
					return {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element$alignLeft,
							_1: {ctor: '[]'}
						}
					};
				} else {
					var _p129 = _p124._0;
					return A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						{
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(_mdgriffith$stylish_elephants$Element$alignLeft),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Maybe$Just(
									_mdgriffith$stylish_elephants$Element_Input$tabindex(0)),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Maybe$Just(
										_mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill)),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Maybe$Just(
											_mdgriffith$stylish_elephants$Internal_Model$Attr(
												A2(_elm_lang$html$Html_Attributes$attribute, 'role', 'radiogroup'))),
										_1: {
											ctor: '::',
											_0: function () {
												var _p125 = prevNext;
												if (_p125.ctor === 'Nothing') {
													return _elm_lang$core$Maybe$Nothing;
												} else {
													var _p128 = _p125._0._0;
													var _p127 = _p125._0._2;
													return _elm_lang$core$Maybe$Just(
														_mdgriffith$stylish_elephants$Element_Input$onKeyLookup(
															function (code) {
																if (_elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$leftArrow)) {
																	return _elm_lang$core$Maybe$Just(
																		_p129(_p128));
																} else {
																	if (_elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$upArrow)) {
																		return _elm_lang$core$Maybe$Just(
																			_p129(_p128));
																	} else {
																		if (_elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$rightArrow)) {
																			return _elm_lang$core$Maybe$Just(
																				_p129(_p127));
																		} else {
																			if (_elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$downArrow)) {
																				return _elm_lang$core$Maybe$Just(
																					_p129(_p127));
																			} else {
																				if (_elm_lang$core$Native_Utils.eq(code, _mdgriffith$stylish_elephants$Element_Input$space)) {
																					var _p126 = input.selected;
																					if (_p126.ctor === 'Nothing') {
																						return _elm_lang$core$Maybe$Just(
																							_p129(_p128));
																					} else {
																						return _elm_lang$core$Maybe$Nothing;
																					}
																				} else {
																					return _elm_lang$core$Maybe$Nothing;
																				}
																			}
																		}
																	}
																}
															}));
												}
											}(),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						});
				}
			}(),
			input.label,
			input.notice,
			box);
	});
var _mdgriffith$stylish_elephants$Element_Input$Column = {ctor: 'Column'};
var _mdgriffith$stylish_elephants$Element_Input$radio = _mdgriffith$stylish_elephants$Element_Input$radioHelper(_mdgriffith$stylish_elephants$Element_Input$Column);
var _mdgriffith$stylish_elephants$Element_Input$Row = {ctor: 'Row'};
var _mdgriffith$stylish_elephants$Element_Input$radioRow = _mdgriffith$stylish_elephants$Element_Input$radioHelper(_mdgriffith$stylish_elephants$Element_Input$Row);

var _mdgriffith$stylish_elephants$Element_Area$announce = _mdgriffith$stylish_elephants$Internal_Model$Describe(_mdgriffith$stylish_elephants$Internal_Model$LivePolite);
var _mdgriffith$stylish_elephants$Element_Area$announceUrgently = _mdgriffith$stylish_elephants$Internal_Model$Describe(_mdgriffith$stylish_elephants$Internal_Model$LiveAssertive);
var _mdgriffith$stylish_elephants$Element_Area$heading = function (_p0) {
	return _mdgriffith$stylish_elephants$Internal_Model$Describe(
		_mdgriffith$stylish_elephants$Internal_Model$Heading(_p0));
};
var _mdgriffith$stylish_elephants$Element_Area$footer = _mdgriffith$stylish_elephants$Internal_Model$Describe(_mdgriffith$stylish_elephants$Internal_Model$ContentInfo);
var _mdgriffith$stylish_elephants$Element_Area$navigation = _mdgriffith$stylish_elephants$Internal_Model$Describe(_mdgriffith$stylish_elephants$Internal_Model$Navigation);
var _mdgriffith$stylish_elephants$Element_Area$aside = _mdgriffith$stylish_elephants$Internal_Model$Describe(_mdgriffith$stylish_elephants$Internal_Model$Complementary);
var _mdgriffith$stylish_elephants$Element_Area$mainContent = _mdgriffith$stylish_elephants$Internal_Model$Describe(_mdgriffith$stylish_elephants$Internal_Model$Main);

var _lucamug$elm_styleguide_generator$Styleguide$generatedBy = A2(
	_mdgriffith$stylish_elephants$Element$el,
	{
		ctor: '::',
		_0: A2(_mdgriffith$stylish_elephants$Element$paddingXY, 0, 0),
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$alignLeft,
			_1: {ctor: '[]'}
		}
	},
	A2(
		_mdgriffith$stylish_elephants$Element$paragraph,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$text('Generated by '),
			_1: {
				ctor: '::',
				_0: A2(
					_mdgriffith$stylish_elephants$Element$link,
					{
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element_Font$color(_elm_lang$core$Color$orange),
						_1: {ctor: '[]'}
					},
					{
						url: 'https://github.com/lucamug/elm-styleguide-generator',
						label: _mdgriffith$stylish_elephants$Element$text('elm-styleguide-generator')
					}),
				_1: {ctor: '[]'}
			}
		}));
var _lucamug$elm_styleguide_generator$Styleguide$h3 = {
	ctor: '::',
	_0: _mdgriffith$stylish_elephants$Element_Area$heading(3),
	_1: {
		ctor: '::',
		_0: _mdgriffith$stylish_elephants$Element_Font$size(18),
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$alignLeft,
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element_Font$weight(700),
				_1: {
					ctor: '::',
					_0: A2(_mdgriffith$stylish_elephants$Element$paddingXY, 0, 20),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _lucamug$elm_styleguide_generator$Styleguide$h2 = {
	ctor: '::',
	_0: _mdgriffith$stylish_elephants$Element_Area$heading(2),
	_1: {
		ctor: '::',
		_0: _mdgriffith$stylish_elephants$Element_Font$size(24),
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$alignLeft,
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element_Font$weight(700),
				_1: {
					ctor: '::',
					_0: A2(_mdgriffith$stylish_elephants$Element$paddingXY, 0, 20),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _lucamug$elm_styleguide_generator$Styleguide$h1 = {
	ctor: '::',
	_0: _mdgriffith$stylish_elephants$Element_Area$heading(1),
	_1: {
		ctor: '::',
		_0: _mdgriffith$stylish_elephants$Element_Font$size(28),
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element_Font$weight(700),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$paddingEach(
					{bottom: 40, left: 0, right: 0, top: 20}),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _lucamug$elm_styleguide_generator$Styleguide$conf = {spacing: 10, rounding: 10};
var _lucamug$elm_styleguide_generator$Styleguide$codeAttributes = {
	ctor: '::',
	_0: _mdgriffith$stylish_elephants$Element_Background$color(
		A3(_elm_lang$core$Color$rgb, 238, 238, 238)),
	_1: {
		ctor: '::',
		_0: _mdgriffith$stylish_elephants$Element$padding(_lucamug$elm_styleguide_generator$Styleguide$conf.spacing),
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element_Font$family(
				{
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element_Font$monospace,
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element_Font$size(14),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _lucamug$elm_styleguide_generator$Styleguide$viewType = F2(
	function (_p0, boxed) {
		var _p1 = _p0;
		return A2(
			_mdgriffith$stylish_elephants$Element$el,
			{
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$paddingEach(
					{top: 0, right: _lucamug$elm_styleguide_generator$Styleguide$conf.spacing, bottom: _lucamug$elm_styleguide_generator$Styleguide$conf.spacing, left: 0}),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$alignBottom,
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
						_1: {ctor: '[]'}
					}
				}
			},
			A2(
				_mdgriffith$stylish_elephants$Element$paragraph,
				{
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$spacing(_lucamug$elm_styleguide_generator$Styleguide$conf.spacing),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: A2(
						_mdgriffith$stylish_elephants$Element$el,
						{
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element$width(
								_mdgriffith$stylish_elephants$Element$fillPortion(1)),
							_1: {ctor: '[]'}
						},
						A2(
							_mdgriffith$stylish_elephants$Element$el,
							boxed ? {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element$padding(_lucamug$elm_styleguide_generator$Styleguide$conf.spacing),
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element_Background$color(
										A3(_elm_lang$core$Color$rgb, 238, 238, 238)),
									_1: {
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Element_Border$rounded(_lucamug$elm_styleguide_generator$Styleguide$conf.rounding),
										_1: {ctor: '[]'}
									}
								}
							} : {ctor: '[]'},
							_p1._0)),
					_1: {
						ctor: '::',
						_0: A2(
							_mdgriffith$stylish_elephants$Element$el,
							{
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element$width(
									_mdgriffith$stylish_elephants$Element$fillPortion(2)),
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element$alignTop,
									_1: {
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Element_Font$color(
											A3(_elm_lang$core$Color$rgb, 153, 153, 153)),
										_1: {
											ctor: '::',
											_0: _mdgriffith$stylish_elephants$Element_Font$family(
												{
													ctor: '::',
													_0: _mdgriffith$stylish_elephants$Element_Font$monospace,
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _mdgriffith$stylish_elephants$Element_Font$size(14),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							},
							_mdgriffith$stylish_elephants$Element$text(_p1._1)),
						_1: {ctor: '[]'}
					}
				}));
	});
var _lucamug$elm_styleguide_generator$Styleguide$viewTypes = F2(
	function (list, boxed) {
		return A2(
			_mdgriffith$stylish_elephants$Element$column,
			{ctor: '[]'},
			A2(
				_elm_lang$core$List$map,
				function (_p2) {
					var _p3 = _p2;
					return A2(
						_lucamug$elm_styleguide_generator$Styleguide$viewType,
						{ctor: '_Tuple2', _0: _p3._0, _1: _p3._1},
						boxed);
				},
				list));
	});
var _lucamug$elm_styleguide_generator$Styleguide$viewTitle = function (title) {
	return A2(
		_mdgriffith$stylish_elephants$Element$el,
		_lucamug$elm_styleguide_generator$Styleguide$h3,
		_mdgriffith$stylish_elephants$Element$text(title));
};
var _lucamug$elm_styleguide_generator$Styleguide$layoutAttributes = {
	ctor: '::',
	_0: _mdgriffith$stylish_elephants$Element_Font$family(
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element_Font$external(
				{name: 'Source Sans Pro', url: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro'}),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element_Font$sansSerif,
				_1: {ctor: '[]'}
			}
		}),
	_1: {
		ctor: '::',
		_0: _mdgriffith$stylish_elephants$Element_Font$size(16),
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element_Font$color(
				A3(_elm_lang$core$Color$rgb, 51, 51, 51)),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element_Background$color(_elm_lang$core$Color$white),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$padding(20),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _lucamug$elm_styleguide_generator$Styleguide$section = function (data) {
	return A2(
		_mdgriffith$stylish_elephants$Element$column,
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element_Border$widthEach(
				{top: 1, right: 0, bottom: 0, left: 0}),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element_Border$color(_elm_lang$core$Color$gray),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$paddingEach(
						{top: 40, right: 0, bottom: 40, left: 0}),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$spacing(_lucamug$elm_styleguide_generator$Styleguide$conf.spacing),
						_1: {ctor: '[]'}
					}
				}
			}
		},
		{
			ctor: '::',
			_0: A2(
				_mdgriffith$stylish_elephants$Element$el,
				_lucamug$elm_styleguide_generator$Styleguide$h2,
				_mdgriffith$stylish_elephants$Element$text(
					A2(_elm_lang$core$Basics_ops['++'], '⟩ ', data.name))),
			_1: {
				ctor: '::',
				_0: A2(
					_mdgriffith$stylish_elephants$Element$paragraph,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$text(data.description),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_mdgriffith$stylish_elephants$Element$el,
						_lucamug$elm_styleguide_generator$Styleguide$h3,
						_mdgriffith$stylish_elephants$Element$text('Signature')),
					_1: {
						ctor: '::',
						_0: A2(
							_mdgriffith$stylish_elephants$Element$paragraph,
							_lucamug$elm_styleguide_generator$Styleguide$codeAttributes,
							{
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element$text(data.signature),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_mdgriffith$stylish_elephants$Element$el,
								_lucamug$elm_styleguide_generator$Styleguide$h3,
								_mdgriffith$stylish_elephants$Element$text('Code Example')),
							_1: {
								ctor: '::',
								_0: A2(
									_mdgriffith$stylish_elephants$Element$paragraph,
									_lucamug$elm_styleguide_generator$Styleguide$codeAttributes,
									{
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Element$text(data.usage),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_mdgriffith$stylish_elephants$Element$el,
										_lucamug$elm_styleguide_generator$Styleguide$h3,
										_mdgriffith$stylish_elephants$Element$text('Result')),
									_1: {
										ctor: '::',
										_0: A2(
											_mdgriffith$stylish_elephants$Element$paragraph,
											{ctor: '[]'},
											{
												ctor: '::',
												_0: data.usageResult,
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_mdgriffith$stylish_elephants$Element$column,
												{ctor: '[]'},
												A2(
													_elm_lang$core$List$map,
													function (_p4) {
														var _p5 = _p4;
														return A2(
															_mdgriffith$stylish_elephants$Element$column,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: _lucamug$elm_styleguide_generator$Styleguide$viewTitle(_p5._0),
																_1: {
																	ctor: '::',
																	_0: A2(_lucamug$elm_styleguide_generator$Styleguide$viewTypes, _p5._1, data.boxed),
																	_1: {ctor: '[]'}
																}
															});
													},
													data.types)),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _lucamug$elm_styleguide_generator$Styleguide$page = function (listData) {
	return A2(
		_mdgriffith$stylish_elephants$Element$row,
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$width(_mdgriffith$stylish_elephants$Element$fill),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_mdgriffith$stylish_elephants$Element$column,
				{
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$padding(10),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$attribute(
							_elm_lang$html$Html_Attributes$style(
								{
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'max-width', _1: '780px'},
									_1: {ctor: '[]'}
								})),
						_1: {ctor: '[]'}
					}
				},
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: A2(
							_mdgriffith$stylish_elephants$Element$el,
							_lucamug$elm_styleguide_generator$Styleguide$h1,
							_mdgriffith$stylish_elephants$Element$text('Style Guide')),
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(_elm_lang$core$List$map, _lucamug$elm_styleguide_generator$Styleguide$section, listData),
						{
							ctor: '::',
							_0: _lucamug$elm_styleguide_generator$Styleguide$generatedBy,
							_1: {ctor: '[]'}
						}))),
			_1: {ctor: '[]'}
		});
};
var _lucamug$elm_styleguide_generator$Styleguide$htmlPage = function (listData) {
	return A2(
		_mdgriffith$stylish_elephants$Element$layout,
		_lucamug$elm_styleguide_generator$Styleguide$layoutAttributes,
		_lucamug$elm_styleguide_generator$Styleguide$page(listData));
};
var _lucamug$elm_styleguide_generator$Styleguide$Data = F7(
	function (a, b, c, d, e, f, g) {
		return {name: a, signature: b, description: c, usage: d, usageResult: e, types: f, boxed: g};
	});

var _lucamug$elm_style_framework$Framework_Color$colorToHex = _eskimoblood$elm_color_extra$Color_Convert$colorToHex;
var _lucamug$elm_style_framework$Framework_Color$hexToColor = function (color) {
	return A2(
		_elm_lang$core$Result$withDefault,
		_elm_lang$core$Color$gray,
		_eskimoblood$elm_color_extra$Color_Convert$hexToColor(color));
};
var _lucamug$elm_style_framework$Framework_Color$toColor = function (color) {
	var _p0 = color;
	switch (_p0.ctor) {
		case 'ColorDefault':
			return _lucamug$elm_style_framework$Framework_Color$hexToColor('#ffffff');
		case 'ColorPrimary':
			return _lucamug$elm_style_framework$Framework_Color$hexToColor('#00D1B2');
		case 'ColorLink':
			return _lucamug$elm_style_framework$Framework_Color$hexToColor('#276CDA');
		case 'ColorInfo':
			return _lucamug$elm_style_framework$Framework_Color$hexToColor('#209CEE');
		case 'ColorSuccess':
			return _lucamug$elm_style_framework$Framework_Color$hexToColor('#23D160');
		case 'ColorWarning':
			return _lucamug$elm_style_framework$Framework_Color$hexToColor('#ffdd57');
		case 'ColorDanger':
			return _lucamug$elm_style_framework$Framework_Color$hexToColor('#FF3860');
		case 'ColorFontBright':
			return _lucamug$elm_style_framework$Framework_Color$hexToColor('#fff');
		case 'ColorFontDark':
			return _lucamug$elm_style_framework$Framework_Color$hexToColor('#363636');
		default:
			return _lucamug$elm_style_framework$Framework_Color$hexToColor('#dbdbdb');
	}
};
var _lucamug$elm_style_framework$Framework_Color$usageWrapper = function (colorType) {
	var color = _lucamug$elm_style_framework$Framework_Color$toColor(colorType);
	return A2(
		_mdgriffith$stylish_elephants$Element$el,
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element_Background$color(color),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$width(
					_mdgriffith$stylish_elephants$Element$px(100)),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$height(
						_mdgriffith$stylish_elephants$Element$px(100)),
					_1: {
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element$padding(10),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element_Border$rounded(5),
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element_Font$color(
									A2(
										_elm_lang$core$Maybe$withDefault,
										_elm_lang$core$Color$black,
										A2(
											_eskimoblood$elm_color_extra$Color_Accessibility$maximumContrast,
											color,
											{
												ctor: '::',
												_0: _elm_lang$core$Color$white,
												_1: {
													ctor: '::',
													_0: _elm_lang$core$Color$black,
													_1: {ctor: '[]'}
												}
											}))),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		},
		_mdgriffith$stylish_elephants$Element$text(
			_eskimoblood$elm_color_extra$Color_Convert$colorToHex(color)));
};
var _lucamug$elm_style_framework$Framework_Color$ColorBorderDefault = {ctor: 'ColorBorderDefault'};
var _lucamug$elm_style_framework$Framework_Color$ColorFontDark = {ctor: 'ColorFontDark'};
var _lucamug$elm_style_framework$Framework_Color$ColorFontBright = {ctor: 'ColorFontBright'};
var _lucamug$elm_style_framework$Framework_Color$maximumContrast = function (c) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		_elm_lang$core$Color$black,
		A2(
			_eskimoblood$elm_color_extra$Color_Accessibility$maximumContrast,
			c,
			{
				ctor: '::',
				_0: _lucamug$elm_style_framework$Framework_Color$toColor(_lucamug$elm_style_framework$Framework_Color$ColorFontBright),
				_1: {
					ctor: '::',
					_0: _lucamug$elm_style_framework$Framework_Color$toColor(_lucamug$elm_style_framework$Framework_Color$ColorFontDark),
					_1: {ctor: '[]'}
				}
			}));
};
var _lucamug$elm_style_framework$Framework_Color$ColorDanger = {ctor: 'ColorDanger'};
var _lucamug$elm_style_framework$Framework_Color$ColorWarning = {ctor: 'ColorWarning'};
var _lucamug$elm_style_framework$Framework_Color$ColorSuccess = {ctor: 'ColorSuccess'};
var _lucamug$elm_style_framework$Framework_Color$ColorInfo = {ctor: 'ColorInfo'};
var _lucamug$elm_style_framework$Framework_Color$ColorLink = {ctor: 'ColorLink'};
var _lucamug$elm_style_framework$Framework_Color$ColorPrimary = {ctor: 'ColorPrimary'};
var _lucamug$elm_style_framework$Framework_Color$ColorDefault = {ctor: 'ColorDefault'};
var _lucamug$elm_style_framework$Framework_Color$introspection = function () {
	var buttonText = 'Button';
	return {
		name: 'Color',
		signature: 'toColor : Color -> Color.Color',
		description: 'List of colors',
		usage: 'toColor ColorPrimary',
		usageResult: _lucamug$elm_style_framework$Framework_Color$usageWrapper(_lucamug$elm_style_framework$Framework_Color$ColorPrimary),
		boxed: true,
		types: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'Sizes',
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _lucamug$elm_style_framework$Framework_Color$usageWrapper(_lucamug$elm_style_framework$Framework_Color$ColorDefault),
						_1: 'toColor ColorDefault'
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _lucamug$elm_style_framework$Framework_Color$usageWrapper(_lucamug$elm_style_framework$Framework_Color$ColorPrimary),
							_1: 'toColor ColorPrimary'
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: _lucamug$elm_style_framework$Framework_Color$usageWrapper(_lucamug$elm_style_framework$Framework_Color$ColorLink),
								_1: 'toColor ColorLink'
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _lucamug$elm_style_framework$Framework_Color$usageWrapper(_lucamug$elm_style_framework$Framework_Color$ColorInfo),
									_1: 'toColor ColorInfo'
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: _lucamug$elm_style_framework$Framework_Color$usageWrapper(_lucamug$elm_style_framework$Framework_Color$ColorSuccess),
										_1: 'toColor ColorSuccess'
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: _lucamug$elm_style_framework$Framework_Color$usageWrapper(_lucamug$elm_style_framework$Framework_Color$ColorWarning),
											_1: 'toColor ColorWarning'
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: _lucamug$elm_style_framework$Framework_Color$usageWrapper(_lucamug$elm_style_framework$Framework_Color$ColorDanger),
												_1: 'toColor ColorDanger'
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: _lucamug$elm_style_framework$Framework_Color$usageWrapper(_lucamug$elm_style_framework$Framework_Color$ColorFontBright),
													_1: 'toColor ColorFontBright'
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: _lucamug$elm_style_framework$Framework_Color$usageWrapper(_lucamug$elm_style_framework$Framework_Color$ColorFontDark),
														_1: 'toColor ColorFontDark'
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: _lucamug$elm_style_framework$Framework_Color$usageWrapper(_lucamug$elm_style_framework$Framework_Color$ColorBorderDefault),
															_1: 'toColor ColorBorderDefault'
														},
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			_1: {ctor: '[]'}
		}
	};
}();

var _lucamug$elm_style_framework$Framework_Spinner$partHtml = F2(
	function (size, color) {
		var speed = '0.6s';
		var colorString = _lucamug$elm_style_framework$Framework_Color$colorToHex(color);
		var id = A2(
			_elm_lang$core$Basics_ops['++'],
			'id',
			A2(_elm_lang$core$String$dropLeft, 1, colorString));
		return A2(
			_elm_lang$svg$Svg$svg,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$viewBox('0 0 38 38'),
				_1: {
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$xmlSpace('http://www.w3.org/2000/svg'),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$width(
							_elm_lang$core$Basics$toString(size)),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$height(
								_elm_lang$core$Basics$toString(size)),
							_1: {ctor: '[]'}
						}
					}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$svg$Svg$defs,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$svg$Svg$linearGradient,
							{
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$id(id),
								_1: {
									ctor: '::',
									_0: _elm_lang$svg$Svg_Attributes$x1('8%'),
									_1: {
										ctor: '::',
										_0: _elm_lang$svg$Svg_Attributes$x2('65.7%'),
										_1: {
											ctor: '::',
											_0: _elm_lang$svg$Svg_Attributes$y1('0%'),
											_1: {
												ctor: '::',
												_0: _elm_lang$svg$Svg_Attributes$y2('23.9%'),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$svg$Svg$stop,
									{
										ctor: '::',
										_0: _elm_lang$svg$Svg_Attributes$offset('0%'),
										_1: {
											ctor: '::',
											_0: _elm_lang$svg$Svg_Attributes$stopColor(colorString),
											_1: {
												ctor: '::',
												_0: _elm_lang$svg$Svg_Attributes$stopOpacity('0'),
												_1: {ctor: '[]'}
											}
										}
									},
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$svg$Svg$stop,
										{
											ctor: '::',
											_0: _elm_lang$svg$Svg_Attributes$offset('63.1%'),
											_1: {
												ctor: '::',
												_0: _elm_lang$svg$Svg_Attributes$stopColor(colorString),
												_1: {
													ctor: '::',
													_0: _elm_lang$svg$Svg_Attributes$stopOpacity('.6'),
													_1: {ctor: '[]'}
												}
											}
										},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$svg$Svg$stop,
											{
												ctor: '::',
												_0: _elm_lang$svg$Svg_Attributes$offset('100%'),
												_1: {
													ctor: '::',
													_0: _elm_lang$svg$Svg_Attributes$stopColor(colorString),
													_1: {ctor: '[]'}
												}
											},
											{ctor: '[]'}),
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$svg$Svg$g,
						{
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$fill('none'),
							_1: {
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$fillRule('evenodd'),
								_1: {
									ctor: '::',
									_0: _elm_lang$svg$Svg_Attributes$transform('translate(1 1)'),
									_1: {ctor: '[]'}
								}
							}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$svg$Svg$path,
								{
									ctor: '::',
									_0: _elm_lang$svg$Svg_Attributes$d('M36 18C36 8 28 0 18 0'),
									_1: {
										ctor: '::',
										_0: _elm_lang$svg$Svg_Attributes$stroke(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'url(#',
												A2(_elm_lang$core$Basics_ops['++'], id, ')'))),
										_1: {
											ctor: '::',
											_0: _elm_lang$svg$Svg_Attributes$strokeWidth('2'),
											_1: {ctor: '[]'}
										}
									}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$svg$Svg$animateTransform,
										{
											ctor: '::',
											_0: _elm_lang$svg$Svg_Attributes$attributeName('transform'),
											_1: {
												ctor: '::',
												_0: _elm_lang$svg$Svg_Attributes$dur(speed),
												_1: {
													ctor: '::',
													_0: _elm_lang$svg$Svg_Attributes$from('0 18 18'),
													_1: {
														ctor: '::',
														_0: _elm_lang$svg$Svg_Attributes$repeatCount('indefinite'),
														_1: {
															ctor: '::',
															_0: _elm_lang$svg$Svg_Attributes$to('360 18 18'),
															_1: {
																ctor: '::',
																_0: _elm_lang$svg$Svg_Attributes$type_('rotate'),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}
										},
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$svg$Svg$circle,
									{
										ctor: '::',
										_0: _elm_lang$svg$Svg_Attributes$cx('36'),
										_1: {
											ctor: '::',
											_0: _elm_lang$svg$Svg_Attributes$cy('18'),
											_1: {
												ctor: '::',
												_0: _elm_lang$svg$Svg_Attributes$fill(colorString),
												_1: {
													ctor: '::',
													_0: _elm_lang$svg$Svg_Attributes$r('1'),
													_1: {ctor: '[]'}
												}
											}
										}
									},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$svg$Svg$animateTransform,
											{
												ctor: '::',
												_0: _elm_lang$svg$Svg_Attributes$attributeName('transform'),
												_1: {
													ctor: '::',
													_0: _elm_lang$svg$Svg_Attributes$dur(speed),
													_1: {
														ctor: '::',
														_0: _elm_lang$svg$Svg_Attributes$from('0 18 18'),
														_1: {
															ctor: '::',
															_0: _elm_lang$svg$Svg_Attributes$repeatCount('indefinite'),
															_1: {
																ctor: '::',
																_0: _elm_lang$svg$Svg_Attributes$to('360 18 18'),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$svg$Svg_Attributes$type_('rotate'),
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											},
											{ctor: '[]'}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _lucamug$elm_style_framework$Framework_Spinner$partElement = F2(
	function (size, color) {
		return _mdgriffith$stylish_elephants$Element$html(
			A2(_lucamug$elm_style_framework$Framework_Spinner$partHtml, size, color));
	});
var _lucamug$elm_style_framework$Framework_Spinner$spinner = _lucamug$elm_style_framework$Framework_Spinner$partElement;

var _lucamug$elm_style_framework$Framework_Button$toPx = function (size) {
	var _p0 = size;
	switch (_p0.ctor) {
		case 'SizeSmall':
			return 12;
		case 'SizeDefault':
			return 16;
		case 'SizeMedium':
			return 20;
		default:
			return 24;
	}
};
var _lucamug$elm_style_framework$Framework_Button$Conf = F3(
	function (a, b, c) {
		return {color: a, size: b, state: c};
	});
var _lucamug$elm_style_framework$Framework_Button$SizeLarge = {ctor: 'SizeLarge'};
var _lucamug$elm_style_framework$Framework_Button$SizeMedium = {ctor: 'SizeMedium'};
var _lucamug$elm_style_framework$Framework_Button$SizeDefault = {ctor: 'SizeDefault'};
var _lucamug$elm_style_framework$Framework_Button$SizeSmall = {ctor: 'SizeSmall'};
var _lucamug$elm_style_framework$Framework_Button$StateDisabled = {ctor: 'StateDisabled'};
var _lucamug$elm_style_framework$Framework_Button$StateLoading = {ctor: 'StateLoading'};
var _lucamug$elm_style_framework$Framework_Button$StateOutlined = {ctor: 'StateOutlined'};
var _lucamug$elm_style_framework$Framework_Button$processConf = F2(
	function (modifier, conf) {
		var _p1 = modifier;
		switch (_p1.ctor) {
			case 'Primary':
				return _elm_lang$core$Native_Utils.update(
					conf,
					{color: _lucamug$elm_style_framework$Framework_Color$ColorPrimary});
			case 'Link':
				return _elm_lang$core$Native_Utils.update(
					conf,
					{color: _lucamug$elm_style_framework$Framework_Color$ColorLink});
			case 'Info':
				return _elm_lang$core$Native_Utils.update(
					conf,
					{color: _lucamug$elm_style_framework$Framework_Color$ColorInfo});
			case 'Success':
				return _elm_lang$core$Native_Utils.update(
					conf,
					{color: _lucamug$elm_style_framework$Framework_Color$ColorSuccess});
			case 'Warning':
				return _elm_lang$core$Native_Utils.update(
					conf,
					{color: _lucamug$elm_style_framework$Framework_Color$ColorWarning});
			case 'Danger':
				return _elm_lang$core$Native_Utils.update(
					conf,
					{color: _lucamug$elm_style_framework$Framework_Color$ColorDanger});
			case 'Small':
				return _elm_lang$core$Native_Utils.update(
					conf,
					{size: _lucamug$elm_style_framework$Framework_Button$SizeSmall});
			case 'Medium':
				return _elm_lang$core$Native_Utils.update(
					conf,
					{size: _lucamug$elm_style_framework$Framework_Button$SizeMedium});
			case 'Large':
				return _elm_lang$core$Native_Utils.update(
					conf,
					{size: _lucamug$elm_style_framework$Framework_Button$SizeLarge});
			case 'Outlined':
				return _elm_lang$core$Native_Utils.update(
					conf,
					{state: _lucamug$elm_style_framework$Framework_Button$StateOutlined});
			case 'Loading':
				return _elm_lang$core$Native_Utils.update(
					conf,
					{state: _lucamug$elm_style_framework$Framework_Button$StateLoading});
			default:
				return _elm_lang$core$Native_Utils.update(
					conf,
					{state: _lucamug$elm_style_framework$Framework_Button$StateDisabled});
		}
	});
var _lucamug$elm_style_framework$Framework_Button$StateDefault = {ctor: 'StateDefault'};
var _lucamug$elm_style_framework$Framework_Button$buttonAttr = function (modifiers) {
	var conf = A3(
		_elm_lang$core$List$foldl,
		_lucamug$elm_style_framework$Framework_Button$processConf,
		{color: _lucamug$elm_style_framework$Framework_Color$ColorDefault, size: _lucamug$elm_style_framework$Framework_Button$SizeDefault, state: _lucamug$elm_style_framework$Framework_Button$StateDefault},
		modifiers);
	var color = _lucamug$elm_style_framework$Framework_Color$toColor(conf.color);
	var fontSize = function () {
		var _p2 = conf.size;
		switch (_p2.ctor) {
			case 'SizeSmall':
				return 12;
			case 'SizeDefault':
				return 16;
			case 'SizeMedium':
				return 20;
			default:
				return 24;
		}
	}();
	var padding = function () {
		var _p3 = conf.size;
		switch (_p3.ctor) {
			case 'SizeSmall':
				return {ctor: '_Tuple2', _0: 9, _1: 4};
			case 'SizeDefault':
				return {ctor: '_Tuple2', _0: 12, _1: 5};
			case 'SizeMedium':
				return {ctor: '_Tuple2', _0: 15, _1: 6};
			default:
				return {ctor: '_Tuple2', _0: 18, _1: 7};
		}
	}();
	var backgroundColor = function () {
		var _p4 = conf.state;
		switch (_p4.ctor) {
			case 'StateDefault':
				return color;
			case 'StateOutlined':
				var _p5 = conf.color;
				if (_p5.ctor === 'ColorDefault') {
					return _lucamug$elm_style_framework$Framework_Color$toColor(_lucamug$elm_style_framework$Framework_Color$ColorBorderDefault);
				} else {
					return _lucamug$elm_style_framework$Framework_Color$toColor(_lucamug$elm_style_framework$Framework_Color$ColorDefault);
				}
			case 'StateLoading':
				return color;
			default:
				return A2(
					_eskimoblood$elm_color_extra$Color_Manipulate$desaturate,
					0.1,
					A2(_eskimoblood$elm_color_extra$Color_Manipulate$lighten, 0.2, color));
		}
	}();
	var borderRounded = function () {
		var _p6 = conf.size;
		if (_p6.ctor === 'SizeSmall') {
			return 2;
		} else {
			return 3;
		}
	}();
	var borderColor = function () {
		var _p7 = conf.color;
		if (_p7.ctor === 'ColorDefault') {
			return _lucamug$elm_style_framework$Framework_Color$toColor(_lucamug$elm_style_framework$Framework_Color$ColorBorderDefault);
		} else {
			var _p8 = conf.state;
			if (_p8.ctor === 'StateOutlined') {
				return color;
			} else {
				return backgroundColor;
			}
		}
	}();
	var spinnerColor = function () {
		var _p9 = conf.color;
		switch (_p9.ctor) {
			case 'ColorWarning':
				return _lucamug$elm_style_framework$Framework_Color$toColor(_lucamug$elm_style_framework$Framework_Color$ColorFontDark);
			case 'ColorDefault':
				return _lucamug$elm_style_framework$Framework_Color$toColor(_lucamug$elm_style_framework$Framework_Color$ColorFontDark);
			default:
				return _lucamug$elm_style_framework$Framework_Color$toColor(_lucamug$elm_style_framework$Framework_Color$ColorFontBright);
		}
	}();
	var spinner = A2(
		_mdgriffith$stylish_elephants$Element$el,
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$centerY,
			_1: {ctor: '[]'}
		},
		A2(_lucamug$elm_style_framework$Framework_Spinner$spinner, fontSize, spinnerColor));
	var fontColor = function () {
		var _p10 = conf.state;
		switch (_p10.ctor) {
			case 'StateOutlined':
				return color;
			case 'StateLoading':
				return backgroundColor;
			default:
				var _p11 = conf.color;
				switch (_p11.ctor) {
					case 'ColorWarning':
						return _lucamug$elm_style_framework$Framework_Color$toColor(_lucamug$elm_style_framework$Framework_Color$ColorFontDark);
					case 'ColorDefault':
						return _lucamug$elm_style_framework$Framework_Color$toColor(_lucamug$elm_style_framework$Framework_Color$ColorFontDark);
					default:
						return _lucamug$elm_style_framework$Framework_Color$toColor(_lucamug$elm_style_framework$Framework_Color$ColorFontBright);
				}
		}
	}();
	var inFrontAddon = function () {
		var _p12 = conf.state;
		if (_p12.ctor === 'StateLoading') {
			return {
				ctor: '::',
				_0: A2(_mdgriffith$stylish_elephants$Element$inFront, true, spinner),
				_1: {ctor: '[]'}
			};
		} else {
			return {ctor: '[]'};
		}
	}();
	return A2(
		_elm_lang$core$Basics_ops['++'],
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element_Font$size(fontSize),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element_Font$color(fontColor),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element_Background$color(backgroundColor),
					_1: {
						ctor: '::',
						_0: A2(
							_mdgriffith$stylish_elephants$Element$paddingXY,
							_elm_lang$core$Tuple$first(padding),
							_elm_lang$core$Tuple$second(padding)),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element_Border$rounded(borderRounded),
							_1: {
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element_Border$width(1),
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element_Border$color(borderColor),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		},
		inFrontAddon);
};
var _lucamug$elm_style_framework$Framework_Button$button = F3(
	function (modifiers, onPress, label) {
		return A2(
			_mdgriffith$stylish_elephants$Element_Input$button,
			_lucamug$elm_style_framework$Framework_Button$buttonAttr(modifiers),
			{
				onPress: onPress,
				label: _mdgriffith$stylish_elephants$Element$text(label)
			});
	});
var _lucamug$elm_style_framework$Framework_Button$introspection = function () {
	var buttonText = 'Button';
	return {
		name: 'Button',
		signature: 'button : List Modifier -> Maybe msg -> String -> Element msg',
		description: 'Buttons accept a list of modifiers, a Maybe msg (for example: \"Just DoSomething\") and the text to display inside the button.',
		usage: A2(
			_elm_lang$core$Basics_ops['++'],
			'button [ Medium, Success, Outlined ] Nothing \"',
			A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"')),
		usageResult: A3(
			_lucamug$elm_style_framework$Framework_Button$button,
			{
				ctor: '::',
				_0: _lucamug$elm_style_framework$Framework$Medium,
				_1: {
					ctor: '::',
					_0: _lucamug$elm_style_framework$Framework$Success,
					_1: {
						ctor: '::',
						_0: _lucamug$elm_style_framework$Framework$Outlined,
						_1: {ctor: '[]'}
					}
				}
			},
			_elm_lang$core$Maybe$Nothing,
			buttonText),
		boxed: false,
		types: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'Sizes',
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: A3(
							_lucamug$elm_style_framework$Framework_Button$button,
							{
								ctor: '::',
								_0: _lucamug$elm_style_framework$Framework$Small,
								_1: {ctor: '[]'}
							},
							_elm_lang$core$Maybe$Nothing,
							buttonText),
						_1: A2(
							_elm_lang$core$Basics_ops['++'],
							'button [ Small ] Nothing \"',
							A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: A3(
								_lucamug$elm_style_framework$Framework_Button$button,
								{ctor: '[]'},
								_elm_lang$core$Maybe$Nothing,
								buttonText),
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								'button [] Nothing \"',
								A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: A3(
									_lucamug$elm_style_framework$Framework_Button$button,
									{
										ctor: '::',
										_0: _lucamug$elm_style_framework$Framework$Medium,
										_1: {ctor: '[]'}
									},
									_elm_lang$core$Maybe$Nothing,
									buttonText),
								_1: A2(
									_elm_lang$core$Basics_ops['++'],
									'button [ Medium ] Nothing \"',
									A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: A3(
										_lucamug$elm_style_framework$Framework_Button$button,
										{
											ctor: '::',
											_0: _lucamug$elm_style_framework$Framework$Large,
											_1: {ctor: '[]'}
										},
										_elm_lang$core$Maybe$Nothing,
										buttonText),
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										'button [ Large ] Nothing \"',
										A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
								},
								_1: {ctor: '[]'}
							}
						}
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'Colors',
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: A3(
								_lucamug$elm_style_framework$Framework_Button$button,
								{ctor: '[]'},
								_elm_lang$core$Maybe$Nothing,
								buttonText),
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								'button [] Nothing \"',
								A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: A3(
									_lucamug$elm_style_framework$Framework_Button$button,
									{
										ctor: '::',
										_0: _lucamug$elm_style_framework$Framework$Primary,
										_1: {ctor: '[]'}
									},
									_elm_lang$core$Maybe$Nothing,
									buttonText),
								_1: A2(
									_elm_lang$core$Basics_ops['++'],
									'button [ Primary ] Nothing \"',
									A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: A3(
										_lucamug$elm_style_framework$Framework_Button$button,
										{
											ctor: '::',
											_0: _lucamug$elm_style_framework$Framework$Link,
											_1: {ctor: '[]'}
										},
										_elm_lang$core$Maybe$Nothing,
										buttonText),
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										'button [ Link ] Nothing \"',
										A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: A3(
											_lucamug$elm_style_framework$Framework_Button$button,
											{
												ctor: '::',
												_0: _lucamug$elm_style_framework$Framework$Info,
												_1: {ctor: '[]'}
											},
											_elm_lang$core$Maybe$Nothing,
											buttonText),
										_1: A2(
											_elm_lang$core$Basics_ops['++'],
											'button [ Info ] Nothing \"',
											A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: A3(
												_lucamug$elm_style_framework$Framework_Button$button,
												{
													ctor: '::',
													_0: _lucamug$elm_style_framework$Framework$Success,
													_1: {ctor: '[]'}
												},
												_elm_lang$core$Maybe$Nothing,
												buttonText),
											_1: A2(
												_elm_lang$core$Basics_ops['++'],
												'button [ Success ] Nothing \"',
												A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: A3(
													_lucamug$elm_style_framework$Framework_Button$button,
													{
														ctor: '::',
														_0: _lucamug$elm_style_framework$Framework$Warning,
														_1: {ctor: '[]'}
													},
													_elm_lang$core$Maybe$Nothing,
													buttonText),
												_1: A2(
													_elm_lang$core$Basics_ops['++'],
													'button [ Warning ] Nothing \"',
													A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: A3(
														_lucamug$elm_style_framework$Framework_Button$button,
														{
															ctor: '::',
															_0: _lucamug$elm_style_framework$Framework$Danger,
															_1: {ctor: '[]'}
														},
														_elm_lang$core$Maybe$Nothing,
														buttonText),
													_1: A2(
														_elm_lang$core$Basics_ops['++'],
														'button [ Danger ] Nothing \"',
														A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
												},
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'States',
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: A3(
									_lucamug$elm_style_framework$Framework_Button$button,
									{
										ctor: '::',
										_0: _lucamug$elm_style_framework$Framework$Danger,
										_1: {ctor: '[]'}
									},
									_elm_lang$core$Maybe$Nothing,
									buttonText),
								_1: A2(
									_elm_lang$core$Basics_ops['++'],
									'button [ Danger ] Nothing \"',
									A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: A3(
										_lucamug$elm_style_framework$Framework_Button$button,
										{
											ctor: '::',
											_0: _lucamug$elm_style_framework$Framework$Danger,
											_1: {
												ctor: '::',
												_0: _lucamug$elm_style_framework$Framework$Outlined,
												_1: {ctor: '[]'}
											}
										},
										_elm_lang$core$Maybe$Nothing,
										buttonText),
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										'button [ Danger, Outlined ] Nothing \"',
										A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: A3(
											_lucamug$elm_style_framework$Framework_Button$button,
											{
												ctor: '::',
												_0: _lucamug$elm_style_framework$Framework$Danger,
												_1: {
													ctor: '::',
													_0: _lucamug$elm_style_framework$Framework$Loading,
													_1: {ctor: '[]'}
												}
											},
											_elm_lang$core$Maybe$Nothing,
											buttonText),
										_1: A2(
											_elm_lang$core$Basics_ops['++'],
											'button [ Danger, Loading ] Nothing \"',
											A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: A3(
												_lucamug$elm_style_framework$Framework_Button$button,
												{
													ctor: '::',
													_0: _lucamug$elm_style_framework$Framework$Danger,
													_1: {
														ctor: '::',
														_0: _lucamug$elm_style_framework$Framework$Disabled,
														_1: {ctor: '[]'}
													}
												},
												_elm_lang$core$Maybe$Nothing,
												buttonText),
											_1: A2(
												_elm_lang$core$Basics_ops['++'],
												'button [ Danger, Disabled ] Nothing \"',
												A2(_elm_lang$core$Basics_ops['++'], buttonText, '\"'))
										},
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'Usage with others elements',
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: A2(
										_mdgriffith$stylish_elephants$Element$paragraph,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _mdgriffith$stylish_elephants$Element$text('The example above are just shortcuts for'),
											_1: {ctor: '[]'}
										}),
									_1: ''
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: A2(
											_mdgriffith$stylish_elephants$Element_Input$button,
											_lucamug$elm_style_framework$Framework_Button$buttonAttr(
												{
													ctor: '::',
													_0: _lucamug$elm_style_framework$Framework$Primary,
													_1: {ctor: '[]'}
												}),
											{
												onPress: _elm_lang$core$Maybe$Nothing,
												label: _mdgriffith$stylish_elephants$Element$text('button')
											}),
										_1: 'Input.button (buttonAttr [ Primary ]) <| { onPress = Nothing, label = text \"Button\" }'
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: A2(
												_mdgriffith$stylish_elephants$Element$paragraph,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _mdgriffith$stylish_elephants$Element$text('so it is possible to use the button styling also with other elements, for example:'),
													_1: {ctor: '[]'}
												}),
											_1: ''
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: A2(
													_mdgriffith$stylish_elephants$Element$el,
													_lucamug$elm_style_framework$Framework_Button$buttonAttr(
														{
															ctor: '::',
															_0: _lucamug$elm_style_framework$Framework$Primary,
															_1: {ctor: '[]'}
														}),
													_mdgriffith$stylish_elephants$Element$text('Button')),
												_1: 'el (buttonAttr [ Primary ]) <| text \"Button\"'
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: A2(
														_mdgriffith$stylish_elephants$Element$el,
														_lucamug$elm_style_framework$Framework_Button$buttonAttr(
															{
																ctor: '::',
																_0: _lucamug$elm_style_framework$Framework$Danger,
																_1: {
																	ctor: '::',
																	_0: _lucamug$elm_style_framework$Framework$Outlined,
																	_1: {
																		ctor: '::',
																		_0: _lucamug$elm_style_framework$Framework$Medium,
																		_1: {ctor: '[]'}
																	}
																}
															}),
														_mdgriffith$stylish_elephants$Element$text('Button')),
													_1: 'el (buttonAttr [ Primary ]) <| text \"Button\"'
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: A2(
															_mdgriffith$stylish_elephants$Element$column,
															A2(
																_elm_lang$core$Basics_ops['++'],
																_lucamug$elm_style_framework$Framework_Button$buttonAttr(
																	{
																		ctor: '::',
																		_0: _lucamug$elm_style_framework$Framework$Warning,
																		_1: {ctor: '[]'}
																	}),
																{
																	ctor: '::',
																	_0: _mdgriffith$stylish_elephants$Element$spacing(10),
																	_1: {ctor: '[]'}
																}),
															{
																ctor: '::',
																_0: _mdgriffith$stylish_elephants$Element$text('Row 1'),
																_1: {
																	ctor: '::',
																	_0: _mdgriffith$stylish_elephants$Element$text('Row 2'),
																	_1: {ctor: '[]'}
																}
															}),
														_1: 'column (buttonAttr [ Warning ] ++ [ spacing 10 ]) [ text \"Row 1\", text \"Row 2\" ]'
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: A2(
																_mdgriffith$stylish_elephants$Element$column,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	_lucamug$elm_style_framework$Framework_Button$buttonAttr(
																		{
																			ctor: '::',
																			_0: _lucamug$elm_style_framework$Framework$Warning,
																			_1: {
																				ctor: '::',
																				_0: _lucamug$elm_style_framework$Framework$Loading,
																				_1: {ctor: '[]'}
																			}
																		}),
																	{
																		ctor: '::',
																		_0: _mdgriffith$stylish_elephants$Element$spacing(10),
																		_1: {ctor: '[]'}
																	}),
																{
																	ctor: '::',
																	_0: _mdgriffith$stylish_elephants$Element$text('Row 1'),
																	_1: {
																		ctor: '::',
																		_0: _mdgriffith$stylish_elephants$Element$text('Row 2'),
																		_1: {ctor: '[]'}
																	}
																}),
															_1: 'column (buttonAttr [ Warning, Loading ] ++ [ spacing 10 ]) [ text \"Row 1\", text \"Row 2\" ]'
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: A2(
																	_mdgriffith$stylish_elephants$Element$row,
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		_lucamug$elm_style_framework$Framework_Button$buttonAttr(
																			{
																				ctor: '::',
																				_0: _lucamug$elm_style_framework$Framework$Info,
																				_1: {ctor: '[]'}
																			}),
																		{
																			ctor: '::',
																			_0: _mdgriffith$stylish_elephants$Element$spacing(10),
																			_1: {ctor: '[]'}
																		}),
																	{
																		ctor: '::',
																		_0: _mdgriffith$stylish_elephants$Element$text('Col 1'),
																		_1: {
																			ctor: '::',
																			_0: _mdgriffith$stylish_elephants$Element$text('Col 2'),
																			_1: {ctor: '[]'}
																		}
																	}),
																_1: 'row (buttonAttr [ Info ] ++ [ spacing 10 ]) [ text \"Col 1\", text \"Col 2\" ]'
															},
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								}
							}
						},
						_1: {ctor: '[]'}
					}
				}
			}
		}
	};
}();

var _lucamug$elm_style_framework$Main$h1 = {
	ctor: '::',
	_0: _mdgriffith$stylish_elephants$Element_Area$heading(1),
	_1: {
		ctor: '::',
		_0: _mdgriffith$stylish_elephants$Element_Font$size(28),
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element_Font$weight(700),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$paddingEach(
					{bottom: 40, left: 0, right: 0, top: 20}),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _lucamug$elm_style_framework$Main$layoutAttributes = {
	ctor: '::',
	_0: _mdgriffith$stylish_elephants$Element_Font$family(
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element_Font$external(
				{name: 'Source Sans Pro', url: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro'}),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element_Font$sansSerif,
				_1: {ctor: '[]'}
			}
		}),
	_1: {
		ctor: '::',
		_0: _mdgriffith$stylish_elephants$Element_Font$size(16),
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element_Font$color(
				A3(_elm_lang$core$Color$rgb, 51, 51, 51)),
			_1: {
				ctor: '::',
				_0: _mdgriffith$stylish_elephants$Element$padding(20),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _lucamug$elm_style_framework$Main$introduction = A2(
	_mdgriffith$stylish_elephants$Element$el,
	{
		ctor: '::',
		_0: A2(_mdgriffith$stylish_elephants$Element$paddingXY, 0, 0),
		_1: {
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$alignLeft,
			_1: {ctor: '[]'}
		}
	},
	A2(
		_mdgriffith$stylish_elephants$Element$paragraph,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _mdgriffith$stylish_elephants$Element$text('This is a '),
			_1: {
				ctor: '::',
				_0: A2(
					_mdgriffith$stylish_elephants$Element$link,
					{
						ctor: '::',
						_0: _mdgriffith$stylish_elephants$Element_Font$color(_elm_lang$core$Color$orange),
						_1: {ctor: '[]'}
					},
					{
						url: 'https://medium.com/@l.mugnaini/zero-maintenance-always-up-to-date-living-style-guide-in-elm-dbf236d07522',
						label: _mdgriffith$stylish_elephants$Element$text('Living Style Guide')
					}),
				_1: {
					ctor: '::',
					_0: _mdgriffith$stylish_elephants$Element$text(' of '),
					_1: {
						ctor: '::',
						_0: A2(
							_mdgriffith$stylish_elephants$Element$link,
							{
								ctor: '::',
								_0: _mdgriffith$stylish_elephants$Element_Font$color(_elm_lang$core$Color$orange),
								_1: {ctor: '[]'}
							},
							{
								url: 'https://github.com/lucamug/elm-style-framework',
								label: _mdgriffith$stylish_elephants$Element$text('elm-style-framework')
							}),
						_1: {
							ctor: '::',
							_0: _mdgriffith$stylish_elephants$Element$text(' (built on top of '),
							_1: {
								ctor: '::',
								_0: A2(
									_mdgriffith$stylish_elephants$Element$link,
									{
										ctor: '::',
										_0: _mdgriffith$stylish_elephants$Element_Font$color(_elm_lang$core$Color$orange),
										_1: {ctor: '[]'}
									},
									{
										url: 'http://package.elm-lang.org/packages/mdgriffith/stylish-elephants/4.0.0/Element',
										label: _mdgriffith$stylish_elephants$Element$text('style-elements v.4.alpha')
									}),
								_1: {
									ctor: '::',
									_0: _mdgriffith$stylish_elephants$Element$text(') automatically generated from Elm code using '),
									_1: {
										ctor: '::',
										_0: A2(
											_mdgriffith$stylish_elephants$Element$link,
											{
												ctor: '::',
												_0: _mdgriffith$stylish_elephants$Element_Font$color(_elm_lang$core$Color$orange),
												_1: {ctor: '[]'}
											},
											{
												url: 'https://github.com/lucamug/elm-styleguide-generator',
												label: _mdgriffith$stylish_elephants$Element$text('elm-styleguide-generator')
											}),
										_1: {
											ctor: '::',
											_0: _mdgriffith$stylish_elephants$Element$text('.'),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		}));
var _lucamug$elm_style_framework$Main$main = _elm_lang$virtual_dom$Native_VirtualDom.staticProgram(
	A2(
		_mdgriffith$stylish_elephants$Element$layout,
		_lucamug$elm_style_framework$Main$layoutAttributes,
		A2(
			_mdgriffith$stylish_elephants$Element$column,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _lucamug$elm_style_framework$Main$introduction,
				_1: {
					ctor: '::',
					_0: _lucamug$elm_styleguide_generator$Styleguide$page(
						{
							ctor: '::',
							_0: _lucamug$elm_style_framework$Framework_Button$introspection,
							_1: {
								ctor: '::',
								_0: _lucamug$elm_style_framework$Framework_Color$introspection,
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			})));

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
if (typeof _lucamug$elm_style_framework$Main$main !== 'undefined') {
    _lucamug$elm_style_framework$Main$main(Elm['Main'], 'Main', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

