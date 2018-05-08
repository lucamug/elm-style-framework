# Elm Style Framework

[Demo](https://lucamug.github.io/elm-style-framework/)

## An experimental Style Framework built on top of style-elements.

This is an incomplete Style Framework that leverage the [experimental version of style-elements](http://package.elm-lang.org/packages/mdgriffith/stylish-elephants/latest). Major changes may happen at any time to this Repo.

## Customization

The framework allows customization on several levels. Have a look at this [example code](https://github.com/lucamug/elm-style-framework/tree/master/examples/exampleCustomized/src) to see how the customization is made.

On the top left, the default version. On the bottom right the customized version.

[![Customization](http://guupa.com/elm-style-framework/images/framework-customizations.png)](http://guupa.com/elm-style-framework/)

## Style guide generator

The framework has a built-in style guide generator that can be used as a quick reference during the UI design. The style guide is generated using functions called `introspection` present in each part of the framework.

## Usage

This is a minimal example of the framework usage
```elm
module Main exposing (main)

import Element exposing (layout)
import Framework.Button as Button
import Framework.Modifier exposing (Modifier(..))
import Html


main : Html.Html a
main =
    layout [] <|
        Button.button [ Medium, Success, Outlined ] Nothing "Button"
```
it will generate this page:

[![Button](http://guupa.com/elm-style-framework/images/framework-button-example.png)](http://guupa.com/elm-style-framework/exampleButton.html)
