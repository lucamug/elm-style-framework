# Elm Style Framework

## An experimental Style Framework built on top of style-elements.

This is an incomplete Style Framework that leverage the [experimental version of style-elements](http://package.elm-lang.org/packages/mdgriffith/stylish-elephants/4.0.0). Major changes may happen at any time to this Repo.

See the [Style Guide](https://lucamug.github.io/elm-style-framework/) to see usage examples.

To use it:

```elm
module Main exposing (main)

import Framework.Button as button

main : Html.Html msg
main =
    layout [] <|
        button [ Medium, Success, Outlined ] Nothing "Button"
```

The framework is compatible with [elm-styleguide-generator](http://package.elm-lang.org/packages/lucamug/elm-styleguide-generator/latest) so is possible to generate a Style Guide simply doing

```elm
module Main exposing (main)

import Element exposing (..)
import Framework.Button as Button
import Html
import Styleguide

main : Html.Html msg
main =
    Styleguide.htmlPage
        [ Button.introspection
        ]
```

## Updates

v.2.0.0

v.1.0.1

v.1.0.0
