# JavaScript Objects

## Overview

In this lesson, we'll introduce, define, and work with objects. 

## Objectives
+ Create an object in JS
+ Access a value from an object
+ Add a key-value pair to an object
+ Delete a key-value pair from an object

## Introduction 

When we run across a word that we don't know, we often consult a dictionary. A dictionary is, at its core, a list of words; below each word is a definition or set of definitions. If we know the word that we're looking for, we can just look it up in the dictionary and get all its information.

To offer another example, imagine a planner. The planner has a list of dates, and each date has a list of times; at each time, there's an event (or not). The planner gives us a way of _associating_ what's happening with the time when it happens. If we look up a given time, we will see what (if anything) is happening then.

In programming, structures like dictionaries are called "associative data structures": they contain pairs of keys (words in our dictionary analogy) and values (definitions in our dictionary analogy).

In JavaScript, the barebones associative data structure is called an _object_. That means that in an object, you can look something up by its _key_ and get back its _value_ — just like in a dictionary. In fact, you might hear some people refer to objects as "dictionaries." We're going to call them "objects" because they're instances of JavaScript's capital-O `Object`.

## Creating Objects

You can create an object in two different ways, with the literal syntax and with the `Object` _constructor_. A **constructor** does just what its name implies: it constructs objects (in this case, `Object` objects). Be sure to follow along in your console.

Literal Syntax:

```js
var meals = {};
```

The curly braces (`{}`) are an object! You just created your first one!


Object Constructor:

```js
var meals = new Object();
```

You just created another object!

You can also initialize an object with key-value pairs when you create it:

```js
var meals = { breakfast: "oatmeal" };

// or, equivalently

var meals = new Object({ breakfast: 'oatmeal' })
```

In this case, `breakfast` is the key and `"oatmeal"` is the value.

**Note that all keys in JavaScript objects are strings.** This means that even though you can create an object `{1: 'is the loneliest number'}`, the key here, `1` gets turned into the string `'1'`. Values can be of any type.

**Note** also that keys must be unique. If you were to initialize the following object

``` javascript
var meals = {
  breakfast: 'eggs',
  breakfast: 'bacon'
}
```

And then check on the value of `meals`, you'd see

``` javascript
{ breakfast: 'bacon' }
```

Only the last key-value pair to use `breakfast` as the key gets saved! Values don't have to be unique, though:


``` javascript
var meals = {
  breakfast: 'avocado',
  lunch: 'avocado',
  dinner: 'avocado'
}
```

We might want to consider diversifying our diet, but otherwise the above object works as expected.

Similarly, if you have a variable `const firstMeal = 'breakfast'` and tried to create an object `var meals = { firstMeal: 'oatmeal' }`, the `meals` object's key would be `'firstMeal'`, _not_ `'breakfast'`.

**Top Tip**: ES 6 provides a way to use variables as object keys — you have to wrap the key in square brackets (`[]`). Using the above example, you could write `var meals = { [firstMeal]: 'oatmeal' }` and then `meals` would be `{ breakfast: 'oatmeal' }`. Pretty cool, right?

We can access the values in an object using dot notation

``` javascript
meals.breakfast // 'oatmeal'
```

or square-bracket notation

``` javascript
meals['breakfast'] // 'oatmeal'
```

Note that when we use dot syntax, we _do not_ wrap the key in quotes, and the key must be able to be treated as a string. Square-bracket syntax requires quotes if we're referencing the key directly, but it also gives us additional flexibility — we could also do

``` javascript
meals[firstMeal] // 'oatmeal'
```

using the `firstMeal` variable (which is equal to the string `'breakfast'`).  What if we tried using dot notation with our `firstMeal` variable?

```javascript
meals.firstMeal //undefined
```

When we use dot notation the key is always taken as the literal string provided. We _must_ use bracket notation if we want to access (or delete) values that belong to a variable key.


## Adding to an Object

It's great that we can initialize an object with some key-value pairs

``` javascript
var meals = {
  breakfast: 'oatmeal',
  lunch: 'burrito',
  dinner: 'steak'
}
```

but we might not always know what keys and values we're going to have ahead of time. Luckily, we can add new key-value pairs to objects.

If we know the name of the key and its value, we can use the dot syntax to add the new pair:

``` javascript
meals.snack = 'yogurt';
```

See that dot `.`? That has a special meaning for objects — it tells JavaScript that we're going to be accessing the property that goes by the _string_ that comes after it (in this case, `'snack'`. So here, we _assign_ (`=`) the value 'yogurt' to the key `'snack'` in the object. We can access this new value as before:

``` javascript
meals.snack // 'yogurt'
meals['snack'] // 'yogurt'
meals.lunch // 'burrito'
```

We can also add key-value pairs using bracket notation:

``` javascript
meals['second breakfast'] = 'bagel'
```

This comes in handy, as in the above example, when our key is not a simple string. We can also use variables as keys this way:

``` javascript
var sweetMeal = 'dessert'

meals[sweetMeal] = 'cake';

meals.dessert // 'cake'
meals[sweetMeal] // 'cake'
```

> **Note:** In JavaScript, when we name variables and functions, we use the 'camelCase'
naming convention. That is to say - if a variable or function is named using a single word,
that word starts with a lowercase letter. If multiple words are used, every subsequent word
after the first starts with a capitalized letter. `sweetMeal` is an example of this. We will
see more examples in a moment. Keep this in mind as tests will often expect this convention
as well!
 
Lest it seem like we can only add new things, we can update existing key-value pairs by using the key:

``` javascript
meals.breakfast = 'cereal'
```

Note that all of the changes highlighted above are _destructive_. This means that if we apply these changes to an object by passing the object to a function, the _original object_ will change. Let's try it out:

``` javascript
function destructivelyUpdateObjectWithKeyAndValue(obj, key, value) {
  obj[key] = value

  return obj
}

const recipe = { eggs: 3 }

destructivelyUpdateObjectWithKeyAndValue(recipe, 'flour', '3 cups')
// returns { eggs: 3, flour: '3 cups' }

// but also:

recipe // { eggs: 3, flour: '3 cups' }
```

Hm, but what if that's not what we wanted to do? What if we wanted to create a _new_ object that stores both the old and the new properties?

## `Object.assign()`

We can use `Object.assign()` to create a new object and pass it properties from existing objects. The first value is the target object that gets modified. All the values afterward can be any number of objects. It then copies them from left to right onto the target object (so if two objects share a key, the right-most object's value for that key will win). Let's try it out:

``` javascript
Object.assign({}, { foo: 'bar' })
// { foo: 'bar' }

Object.assign({ eggs: 3 }, { flour: '1 cup' })
// { eggs: 3, flour: '1 cup' }

Object.assign({ eggs: 3 }, { chocolate: '1 cup', flour: '2 cups' }, { flour: '1/2 cup' })
// { eggs: 3, chocolate: '1 cup', flour: '1/2 cup' }
```

The power of `Object.assign` allows us to rewrite the above update function in a non-destructive way:

``` javascript
function updateObjectWithKeyAndValue(obj, key, value) {
 
  return Object.assign({}, obj, { [key]: value })
}
  // it's important that we merge everything into
  // a new object such as the empty {}. 
	// Otherwise, the object obj will be modified. 
	// Test what happens if this line was written as:
	// return Object.assign(obj, { [key]: value })
	
const recipe = { eggs: 3 }

updateObjectWithKeyAndValue(recipe, 'chocolate', '1 cup')
// returns `{ eggs: 3, chocolate: '1 cup' }`

recipe // { eggs: 3 }
```

Sweet (and not just because of the chocolate)! We can make our update function even terser:

``` javascript
function updateObjectWithObject(targetObject, updatesObject) {
  return Object.assign({}, targetObject, updatesObject)
}
```

## Deleting a Key-Value Pair

Let's say it's only 5 p.m. and we've changed our mind about dinner, so we want to delete the dinner key-value pair:

```js
var meals = { breakfast: "oatmeal", lunch: "turkey sandwich", dinner: "steak and potatoes" };

// the `delete` operator returns `true` if it has successfully
// deleted, `false` otherwise
delete meals.dinner; // true

meals;
// returns { breakfast: "oatmeal", lunch: "turkey sandwich" }
```

## Changing a Value

Let's say we actually ate oatmeal and a banana for breakfast, and we want to update the value the `breakfast` key is storing:

```js
var meals = {
  breakfast: "oatmeal",
  lunch: "turkey sandwich",
  dinner: "steak and potatoes"
};
meals.breakfast = ["oatmeal", "banana"];

meals;
// {
//   breakfast: ["oatmeal", "banana"],
//   lunch: "turkey sandwich",
//   dinner: "steak and potatoes"
//  }
```

Again, we can change a value non-destructively (preserving the original object) using `Object.assign`:

``` javascript
var meals = {
  breakfast: "oatmeal",
  lunch: "turkey sandwich",
  dinner: "steak and potatoes"
};


Object.assign({}, meals, { breakfast: ['oatmeal', 'banana'] })
// returns {
//   breakfast: ["oatmeal", "banana"],
//   lunch: "turkey sandwich",
//   dinner: "steak and potatoes"
//  }


meals
// still {
//   breakfast: "oatmeal",
//   lunch: "turkey sandwich",
//   dinner: "steak and potatoes"
// };
```

## Instructions

1. Open `objects.js`

2. Assign an object to the variable `playlist` and initialize the object with a key-value pair — the keys will be artist names and the values will be song titles. (What limitation does this impose on our `playlist`?)

3. Create a function `updatePlaylist` that accepts three parameters: the playlist (an object), an artist name (a string), and a song title. The body of the function should add the song and artist as a key-value pair to the playlist object. The function should return the whole playlist.

4. Create a function `removeFromPlaylist` that accepts two arguments (the playlist object and the artist name). The body of the function should delete the key-value pair from the playlist and return the updated playlist.

<p class='util--hide'>View <a href='https://learn.co/lessons/javascript-objects'>Javascript Objects</a> on Learn.co and start learning to code for free.</p>
