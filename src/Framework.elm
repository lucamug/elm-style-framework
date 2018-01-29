module Framework
    exposing
        ( Modifier(..)
        )

{-| This is an incomplete Style Framework that leverage the [experimental version of style-elements](http://package.elm-lang.org/packages/mdgriffith/stylish-elephants/4.0.0). Major changes may happen at any time to this Repo.

See the [Style Guide](https://lucamug.github.io/elm-style-framework/) to see usage examples.


# Types

@docs Modifier

-}


{-| This is the main list of modifier that can be used with all elements
-}
type Modifier
    = Primary
    | Link
    | Info
    | Success
    | Warning
    | Danger
    | Small
    | Medium
    | Large
    | Outlined
    | Loading
    | Waiting
    | Disabled
