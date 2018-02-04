# Elm Style Framework

## An experimental Style Framework built on top of style-elements.

This is an incomplete Style Framework that leverage the [experimental version of style-elements](http://package.elm-lang.org/packages/mdgriffith/stylish-elephants/4.0.0). Major changes may happen at any time to this Repo.

See the [Style Guide](https://lucamug.github.io/elm-style-framework/) to see usage examples.

To use it:

```elm
module Button exposing (main)

import Element exposing (..)
import Framework.Button as Button exposing (button)
import Framework.Modifiers exposing (..)


main =
    layout [] <|
        button [ Medium, Success, Outlined ] Nothing "Button"
```

The framework has documentation built-in (based on [elm-styleguide-generator](http://package.elm-lang.org/packages/lucamug/elm-styleguide-generator/latest)) that can be automatically generated.
 so is possible to generate a Style Guide simply doing

```elm
module Documentation exposing (main)

import Framework
import Html


main : Program Never Framework.Model Framework.Msg
main =
    Html.program
        { init = Framework.init
        , view = Framework.view
        , update = Framework.update
        , subscriptions = \_ -> Sub.none
        }
```

## Updates

v.2.0.0

v.1.0.1

v.1.0.0
