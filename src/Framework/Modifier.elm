module Framework.Modifier exposing (Modifier(..))

{-|


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
