

![](http://www.codebusters.es/assets/projects/reqtangular/reqtangular_logo_728.png)

Generator-Reqtangular v0.0.9
=====================
[![Stories in Ready](https://badge.waffle.io/codebusters/generator-reqtangular.png?label=ready&title=Ready)](https://waffle.io/codebusters/generator-reqtangular)
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/codebusters/generator-reqtangular?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Scaffolding generator for new web projects. Preset integration with AngularJS and Require.

Based on generation framework Yeoman, reqtangular generates new integrated structures and preconfigured to start developing web based applications and RequireJSs AngularJS with Bootstrap and Less.



![](http://www.codebusters.es/assets/projects/reqtangular/reqtangular_small_brands.png)




## Usage

Install `generator-reqtangular`:
```
$ npm install -g generator-reqtangular
```
Make a new directory, and `cd` into it:
```
$ mkdir my-new-project && cd $_
```

Run `yo reqtangular`
```

Run `grunt dist` for building and `grunt serve` for preview
```
## Generators

Available generators:

* [reqtangular:module](#module)
* [reqtangular:blankModule](#blankModule)
* [reqtangular:prebuiltModule](#prebuiltModule)
* [reqtangular:aboutUsModule](#aboutUsModule)
* [reqtangular:contactModule](#contactModule)
* [reqtangular:portfolioModule](#portfolioModule)
* [reqtangular:blogModule](#blogModule)
* [reqtangular:authModule](#authModule)
* [reqtangular:theme](#theme)
* [reqtangular:lang](#lang)



### Module
Generates a new module in `app/scripts/modules`.
Example:
```bash
$ yo reqtangular:module
```

### Theme
Theme module injector.
Examples:
```bash
$ yo reqtangular:theme

$ yo reqtangular:theme codebusters
```

#### Preconfigured themes:


codebusters
> ![](http://www.codebusters.es/assets/projects/reqtangular/codebusters_thumb.png)


business
> ![](http://www.codebusters.es/assets/projects/reqtangular/business_thumb.png)


darkness
> ![](http://www.codebusters.es/assets/projects/reqtangular/darkness_thumb.png)


### Lang
Language module injector. Provides support for translations into several languages. Languages supported:
* English (en). Default language.
* Spanish (es).
* German  (de).

Example:
```bash
$ yo reqtangular:lang
```

***
[![reqtangular](https://github.com/codebusters/generator-reqtangular/blob/master/resources/img/reqtangular_banner_250x50.png)](https://github.com/codebusters/generator-reqtangular/wiki)

[![facebook](https://github.com/codebusters/generator-reqtangular/blob/master/resources/img/FB_FindUsOnFacebook-100.png)](https://www.facebook.com/reqtangular)
[![twitter](https://github.com/codebusters/generator-reqtangular/blob/master/resources/img/bird_blue_32.png)](https://twitter.com/reqtangular)
<a href="http://reqtangular.blogspot.com.es/"><img src="http://img1.blogblog.com/html/buttons/blogger-simple-kahki.gif" alt="Powered By Blogger"></a>
* * *
[![](http://www.codebusters.es/assets/codebusters_logo.png)](http://www.codebusters.es)

