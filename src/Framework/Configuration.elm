module Framework.Configuration exposing (conf)

{-| List of values that you can change to costumize the aspect of the framwork


# Functions

@docs conf

-}

import Color
import Dict
import FrameworkConfiguration


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
        { size1 = getSize "size1"
        , size2 = getSize "size2"
        , size3 = getSize "size3"
        , size4 = getSize "size4"
        , size5 = getSize "size5"
        , size6 = getSize "size6"
        , size7 = getSize "size7"
        }

    -- https://bulma.io/documentation/modifiers/typography-helpers/
    , colors =
        { -- GRAY SCALE
          grayLightest = getColor "grayLightest"
        , grayLighter = getColor "grayLighter"
        , grayLight = getColor "grayLight"
        , grayMediumLight = getColor "grayMediumLight"
        , grayMedium = getColor "grayMedium"
        , gray = getColor "gray"
        , grayDark = getColor "grayDark"
        , grayDarker = getColor "grayDarker"
        , grayDarkest = getColor "grayDarkest"

        -- COLORS
        , muted = getColor "muted"
        , primary = getColor "primary"
        , success = getColor "success"
        , info = getColor "info"
        , warning = getColor "warning"
        , danger = getColor "danger"
        }
    }


defaultSize : Float
defaultSize =
    1


defaultColor : Color.Color
defaultColor =
    Color.rgb 0x00 0x00 0x00


getSize : String -> Float
getSize key =
    case getValue key confSizes FrameworkConfiguration.confSizes of
        Just value ->
            value

        Nothing ->
            defaultSize


getColor : String -> Color.Color
getColor key =
    case getValue key confColors FrameworkConfiguration.confColors of
        Just value ->
            value

        Nothing ->
            defaultColor


getValue :
    comparable
    -> Dict.Dict comparable a
    -> Dict.Dict comparable a
    -> Maybe a
getValue key original replacement =
    let
        repl =
            Dict.get key replacement

        orig =
            Dict.get key original
    in
    case repl of
        Just value ->
            Just value

        Nothing ->
            case orig of
                Just value ->
                    Just value

                Nothing ->
                    Nothing


confSizes : Dict.Dict String Float
confSizes =
    Dict.fromList
        [ -- Bulma sizes
          ( "size1", 3.0 )
        , ( "size2", 2.5 )
        , ( "size3", 2.0 )
        , ( "size4", 1.5 )
        , ( "size5", 1.25 )
        , ( "size6", 1.0 )
        , ( "size7", 0.75 )
        ]


hsl2 : Float -> Float -> Float -> Color.Color
hsl2 a b c =
    Color.hsl (degrees a) (b / 100) (c / 100)


confColors : Dict.Dict String Color.Color
confColors =
    Dict.fromList
        [ -- GRAY SCALE
          ( "grayLightest", Color.rgb 0xF7 0xF7 0xF7 )
        , ( "grayLighter", Color.rgb 0xEB 0xEB 0xEB )
        , ( "grayLight", Color.rgb 0xD1 0xD1 0xD1 )
        , ( "grayMediumLight", Color.rgb 0xB6 0xB6 0xB6 )
        , ( "grayMedium", Color.rgb 0x9C 0x9C 0x9C )
        , ( "gray", Color.rgb 0x82 0x82 0x82 )
        , ( "grayDark", Color.rgb 0x68 0x68 0x68 )
        , ( "grayDarker", Color.rgb 0x4D 0x4D 0x4D )
        , ( "grayDarkest", Color.rgb 0x33 0x33 0x33 )

        -- COLORS
        , ( "muted", Color.rgb 0xD1 0xD1 0xD1 )
        , ( "primary", hsl2 171 100 41 )
        , ( "success", Color.rgb 0x23 0xD1 0x60 )
        , ( "info", Color.rgb 0x20 0x9C 0xEE )
        , ( "warning", Color.rgb 0xFF 0xDD 0x57 )
        , ( "danger", Color.rgb 0xFF 0x38 0x60 )

        -- Bulma gray scale
        , ( "black", hsl2 0 0 4 )
        , ( "black-bis", hsl2 0 0 7 )
        , ( "black-ter", hsl2 0 0 14 )
        , ( "grey-darker", hsl2 0 0 21 )
        , ( "grey-dark", hsl2 0 0 29 )
        , ( "grey", hsl2 0 0 48 )
        , ( "grey-light", hsl2 0 0 71 )
        , ( "grey-lighter", hsl2 0 0 86 )
        , ( "white-ter", hsl2 0 0 96 )
        , ( "white-bis", hsl2 0 0 98 )
        , ( "white", hsl2 0 0 100 )

        -- Bulma colors
        , ( "orange", hsl2 14 100 53 )
        , ( "yellow", hsl2 48 100 67 )
        , ( "green", hsl2 141 71 48 )
        , ( "turquoise", hsl2 171 100 41 )
        , ( "cyan", hsl2 204 86 53 )
        , ( "blue", hsl2 217 71 53 )
        , ( "purple", hsl2 271 100 71 )
        , ( "red", hsl2 348 100 61 )
        ]
