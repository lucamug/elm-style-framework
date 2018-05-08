module Framework.Modifier exposing (Modifier(..))

{-| [Demo](https://lucamug.github.io/elm-style-framework/framework.html)


# Functions

@docs Modifier

-}


{-| This is the main list of modifier that can be used with all elements
-}
type
    Modifier
    -- Colors
    = Muted
    | Primary
    | Success
    | Info
    | Warning
    | Danger
      -- Sizes
    | Small
    | Medium
    | Large
    | Jumbo
      -- States
    | Outlined
    | Loading
    | Waiting
    | Disabled
