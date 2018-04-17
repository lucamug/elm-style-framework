module Framework.Configuration exposing (conf)

{-| List of values that you can change to costumize the aspect of the framwork


# Functions

@docs conf

-}

import Color


{-| -}
conf :
    { colors :
        { danger : Color.Color
        , gray : Color.Color
        , grayDark : Color.Color
        , grayDarker : Color.Color
        , grayDarkest : Color.Color
        , grayLight : Color.Color
        , grayLighter : Color.Color
        , grayLightest : Color.Color
        , grayMedium : Color.Color
        , grayMediumLight : Color.Color
        , info : Color.Color
        , muted : Color.Color
        , primary : Color.Color
        , success : Color.Color
        , warning : Color.Color
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
        { -- GRAY SCALE
          grayLightest = Color.rgb 0xF7 0xF7 0xF7
        , grayLighter = Color.rgb 0xEB 0xEB 0xEB
        , grayLight = Color.rgb 0xD1 0xD1 0xD1
        , grayMediumLight = Color.rgb 0xB6 0xB6 0xB6
        , grayMedium = Color.rgb 0x9C 0x9C 0x9C
        , gray = Color.rgb 0x82 0x82 0x82
        , grayDark = Color.rgb 0x68 0x68 0x68
        , grayDarker = Color.rgb 0x4D 0x4D 0x4D
        , grayDarkest = Color.rgb 0x33 0x33 0x33

        -- COLORS
        , muted = Color.rgb 0xD1 0xD1 0xD1
        , primary = Color.rgb 0x00 0xD1 0xB2
        , success = Color.rgb 0x23 0xD1 0x60
        , info = Color.rgb 0x20 0x9C 0xEE
        , warning = Color.rgb 0xFF 0xDD 0x57
        , danger = Color.rgb 0xFF 0x38 0x60
        }
    }
