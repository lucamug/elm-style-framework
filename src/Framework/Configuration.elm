module Framework.Configuration
    exposing
        ( conf
        )

{-| List of values that you can change to costumize the aspect of the framwork

Check [Style Guide](https://lucamug.github.io/elm-style-framework/) to see usage examples.


# Functions

@docs conf

-}

import Color


{-| -}
conf :
    { colors :
        { black : Color.Color
        , blackBis : Color.Color
        , blackTer : Color.Color
        , danger : Color.Color
        , dark : Color.Color
        , grey : Color.Color
        , greyDark : Color.Color
        , greyDarker : Color.Color
        , greyLight : Color.Color
        , greyLighter : Color.Color
        , info : Color.Color
        , light : Color.Color
        , link : Color.Color
        , primary : Color.Color
        , success : Color.Color
        , warning : Color.Color
        , white : Color.Color
        , whiteBis : Color.Color
        , whiteTer : Color.Color
        }
    , sizes :
        { size1 : Float
        , size2 : Float
        , size3 : Float
        , size4 : Float
        , size5 : Float
        , size6 : Float
        , size7 : Float
        }
    }
conf =
    { --https://bulma.io/documentation/modifiers/typography-helpers/
      sizes =
        { size1 = 3.0
        , size2 = 2.5
        , size3 = 2.0
        , size4 = 1.5
        , size5 = 1.25
        , size6 = 1.0
        , size7 = 0.75
        }

    -- https://bulma.io/documentation/modifiers/typography-helpers/
    , colors =
        { link = Color.hsl (degrees 204) 0.86 0.53
        , white = Color.hsl (degrees 0) 0 1
        , black = Color.hsl (degrees 0) 0 0.04
        , light = Color.hsl (degrees 0) 0 0.96
        , dark = Color.hsl (degrees 0) 0 0.21
        , primary = Color.hsl (degrees 171) 1 0.41
        , info = Color.hsl (degrees 217) 0.71 0.53
        , success = Color.hsl (degrees 141) 0.71 0.48
        , warning = Color.hsl (degrees 48) 1 0.67
        , danger = Color.hsl (degrees 348) 1 0.61
        , blackBis = Color.hsl (degrees 0) 0 0.07
        , blackTer = Color.hsl (degrees 0) 0 0.14
        , greyDarker = Color.hsl (degrees 0) 0 0.21
        , greyDark = Color.hsl (degrees 0) 0 0.29
        , grey = Color.hsl (degrees 0) 0 0.48
        , greyLight = Color.hsl (degrees 0) 0 0.71
        , greyLighter = Color.hsl (degrees 0) 0 0.86
        , whiteTer = Color.hsl (degrees 0) 0 0.96
        , whiteBis = Color.hsl (degrees 0) 0 0.98
        }
    }
