# Elm Style Framework

## An experimental Style Framework build on top of style-elements.

This is an incomplete experimental Style Framework that leverage the new (still in alpha release) version of stile-element.

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

Have a look at [lucamug/elm-styleguide-generator/examples](https://github.com/lucamug/elm-style-framework/examples) for a detailed example.

This package use a [Experimental version of style-elements](http://package.elm-lang.org/packages/mdgriffith/stylish-elephants/4.0.0) so major changes may happen at any time to this Repo.
