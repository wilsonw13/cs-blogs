# A Guide on Environmental Variables in JS

This guide will use the [dotenv](https://github.com/motdotla/dotenv) package, the most popular `.env` library for JavaScript.

## What are environmental variables?

---

You can think of environmental variables as safes with information that only you, the developer, can access. The most common use for these variables is to store API and authentication keys. Enviornmental variables also allow you to have values that vary based on the current environment.

These variables are stored in `.env` files, which look like standard text files with each key-value pair being on a different line.

```env
# This is a single line comment

API_KEY=81fc1d51-e9ad-c07f2929cd5d
API_URL="https://www.xyz.com"
SECRET_NUMBER=13
BOOLEAN=TRUE
```

Environmental variables are case-sensitive, but it is [conventional](https://stackoverflow.com/questions/673055/correct-bash-and-shell-script-variable-capitalization) to write them in uppercase and use underscores as spaces. The parsing engine follows these [rules](https://github.com/motdotla/dotenv#what-rules-does-the-parsing-engine-follow). Quotes are optional but unquoted values are trimmed on both ends. The values are also parsed to become strings.

The above variables are parsed as:

```
{
    API_KEY: "81fc1d51-e9ad-c07f2929cd5d",
    API_URL: "https://www.xyz.com",
    SECRET_NUMBER: "13",
    BOOLEAN: "TRUE"
}
```

You can access these values by using `process.env` in JS:

```js
const url = process.env.API_URL
console.log(url)
// returns "https://xyz.com" 
```

\*\* No matter what bundler or framework is used, you must restart the local server everytime you update an environmental variable *(either the key or the value)* in order to view the changes made.

\*\*\* It is also vital that the `.env` is not pushed to any version control system *(such as Git)*. You can do this by adding `.env` *(or whatever your `.env` is named)* on a seperate line in your `.gitignore`.

## Node

---

Install the `dotenv` package by running `npm i dotenv` in your command line. Add this line at the top of your main JS file:

```js
require("dotenv").config();
```

Create a `.env` file and add in your variables. You can access these variables through the `process.env` object.

## [Parcel](https://parceljs.org/features/node-emulation/)

---

Create a `.env` file in the root directory and add in your variables. You can access these variables in JS through the `process.env` object.


\*\* Parcel uses the `dotenv` npm package thus you don't need to seperately install it.

## [Vue 2 (CLI)](https://cli.vuejs.org/guide/mode-and-env.html)

---

Create a `.env` file in the root directory. The environmental variable names NEED to be prefixed with `VUE_APP_` , otherwise it will only be able to be seen server-sided and not client-sided.

You can then access these variables through the `process.env` object and you can set your data properties to these values for easier use:

`.env`
```env
VUE_APP_API_KEY=81fc1d51-e9ad-c07f2929cd5d
VUE_APP_API_URL="https://www.xyz.com"
VUE_APP_SECRET_NUMBER=13
VUE_APP_BOOLEAN=TRUE
```

`App.vue`
```js
<script>
export default {
    ...
    data() {
        return {
            env: process.env,
            URL: process.env.VUE_APP_API_URL
        }
    },
    ...
}
</script>
```

`env.VUE_APP_API_URL` yields the same value as `URL` in this case.

## [Vue 3 + Vite](https://vitejs.dev/guide/env-and-mode.html)

---

Create a `.env` file in the root directory. The environmental variable names NEED to be prefixed with `VITE_` , otherwise it will only be able to be seen server-sided and not client-sided.

You can then access these variables through the `import.meta.env` object and you can set your data variable to these variables for easier use:

`.env`
```env
VITE_API_KEY=81fc1d51-e9ad-c07f2929cd5d
VITE_API_URL="https://www.xyz.com"
VITE_SECRET_NUMBER=13
VITE_BOOLEAN=TRUE
```

`App.vue`
```js
<script>
export default {
    ...
    data() {
        return {
            env: import.meta.env,
            URL: import.meta.env.VITE_API_URL
        }
    },
    ...
}
</script>
```

`env.VITE_API_URL` yields the same value as `URL` in this case.

## [Nuxt 2](https://nuxtjs.org/docs/configuration-glossary/configuration-env/)

Talk about the 2 ways, using the `env` property or by installing the `@nuxtjs/dotenv` package

---





---
- how to use them in Parcel, Eleventy, Vue, Nuxt
- how to upload them to Netlify
- different environments
