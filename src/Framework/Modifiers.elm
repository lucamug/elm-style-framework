module Framework.Modifiers
    exposing
        ( Modifier(..)
        )

{-| Colors generator

Check [Style Guide](https://lucamug.github.io/elm-style-framework/) to see usage examples.


# Functions

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
