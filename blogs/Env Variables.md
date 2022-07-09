# A Guide on Environmental Variables in JS

This guide will use the [dotenv](https://github.com/motdotla/dotenv) package, the most popular `.env` package for JavaScript.

## What are environmental variables?

---

Environmental variables exist everywhere in our computer, such as in our Windows environmental variables where the `PATH` variable needs to be edited or in framework-specific environmental variables where `BASE_URL` could be accessed.

In JS, environmental variables are able to be accessed server-side globally, but it is up to you if you want to also expose them to the client. You can think these environmental variables as safes with information that only you, the developer, can access. A common use for these variables is to store API and authentication keys. Environmental variables also allow you to have values that vary based on the current environment.

You can add variables to be stored in  `.env` files, which look like standard text files with each key-value pair on a different line.

`.env`
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

Normally, you can access these values by using the `process.env` object in JS, but it may differ from framework to framework.

`example.js`
```js
const url = process.env.API_URL
console.log(url)
// returns "https://xyz.com" 
```

> Most of the time, accessing the `process.env` object directly will not work due to security reasons as it exposes all key-value pairs.

> No matter what bundler or framework is used, you must restart the local server every time you update an environmental variable *(either the key or the value)* in order to view the changes made.

> Although you should push default environmental variables *(such as the default `.env` file)* to a version control system *(such as Git)*, it is vital that sensitive information *(such as API keys)* be kept out. These sensitive variables should be stored in a `.env.local` file which is kept out of version control by adding `.env*.local` to your `.gitignore`.

## What are environments?

---

You don't have to one singular `.env` file. Instead, you can have multiple `.env` files that with variables that change based on your specific environments. 

These files are named `.env` with an environmental suffix. *(i.e. development, staging, test)* A `.local` suffix can also be appended where variables stored inside differ from computer to computer. This `.local` file should not be pushed to version control.

Since there may be conflicting environmental variable names, the hierarchy for environments from highest to lowest priority goes as follows:

1. `.env.[environment].local`
2. `.env.[environment]`
3. `.env.local`
4. `.env`

One common use for have various environments is if you have a separate database for testing and a separate database for production.


## Node

---

Install the `dotenv` package by running `npm i dotenv` in your command line. Add this line at the top of your any JS file you need to access environmental variables in:

```js
require("dotenv").config();
```

Create a `.env` file and add in your variables. You can access these variables through the `process.env` object.

## [Parcel](https://parceljs.org/features/node-emulation/)

---

Create a `.env` file in the root directory and add in your variables. You can access these variables through the `process.env` object.


\*\* Parcel uses the `dotenv` npm package thus you don't need to separately install it.

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

---

There are several ways to access environmental variables in Nuxt and I will be using this `.env` file to explain:

`.env`
```env
API_KEY=81fc1d51-e9ad-c07f2929cd5d
API_URL="https://www.xyz.com"
SECRET_NUMBER=13
BOOLEAN=TRUE

NUXT_ENV_AUTH_URL=https://www.abc.com
NUXT_ENV_AUTH_PASSWORD=55CvtTrCuUH9
```

By far, the most easiest way to access the environmental variables is to prefix them with `NUXT_ENV_`. This automatically injects the variables into the `process.env` object allowing you to access the values easily.

`App.vue`
```js
<script>
export default {
    ...
    data() {
        return {
            authURL: process.env.NUXT_ENV_AUTH_URL,
            authPassword: process.env.NUXT_ENV_AUTH_URL
        }
    },
    ...
}
</script>
```

> You can't set `process.env` itself to a data property in Nuxt and access the environmental variables that way since Nuxt replaces all instances of `process.env.SOME_VAR` to its respective value when your code is compiled.

You can also expose the environmental variables client-side by adding them to the `nuxt.config.js`:


`nuxt.config.js`
```js
export default {
    ...
    env: {
        baseURL: process.env.BASE_URL,
    },
    publicRuntimeConfig: {
        url: process.env.API_URL,
    },
    privateRuntimeConfig: {
        key: process.env.API_KEY,
    },
}
```

The [`env`](https://nuxtjs.org/docs/directory-structure/nuxt-config#env) object exposes the variables at build time which you can access through the `process.env` object. In this example, you would access the `BASE_URL` environmental variable with `process.env.baseURL`.

The [`publicRuntimeConfig`](https://nuxtjs.org/docs/directory-structure/nuxt-config#publicruntimeconfig) and the [`privateRuntimeConfig`](https://nuxtjs.org/docs/directory-structure/nuxt-config#publicruntimeconfig) holds the variables during runtime. Public exposes these variables on the client while private doesn't. You can access these variables through the `$config` object. In this example, you can access the public variable with `$config.url`.

Lastly, there is another way to access environmental variables which is through the [`@nuxtjs/dotenv`](https://www.npmjs.com/package/@nuxtjs/dotenv) package, but this solution is being [migrated](https://nuxtjs.org/tutorials/moving-from-nuxtjs-dotenv-to-runtime-config/) to runtime config.

## [Environmental Variables on Netlify](https://docs.netlify.com/configure-builds/environment-variables/)

---

On Netlify, you can set environmental variables in two ways: per team and per site. Team environmental variables requires upgrading to Netlify Pro and they are overwritten by site environmental variables. You can edit and access team variables navigating to `Team settings > Sites > Global site settings > Shared environment variables` and site variables by navigating to `Site settings > Build & deploy > Environment > Environment variables`.