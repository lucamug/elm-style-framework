module Framework
    exposing
        ( Modifier(..)
        )

{-| This is an incomplete experimental Style Framework that leverage the new (still in alpha release) version of stile-element.

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
    | Disabled
