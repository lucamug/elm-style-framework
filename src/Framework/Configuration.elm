module Framework.Configuration exposing (conf)

{-| List of values that you can change to costumize the aspect of the framwork

This list is inspired by Bulma framework: <https://bulma.io/documentation/overview/variables/>


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
    , moveDownPlaceHolder : { large : Float, small : Float }
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
    { sizes =
        { size1 = getFloat "size1"
        , size2 = getFloat "size2"
        , size3 = getFloat "size3"
        , size4 = getFloat "size4"
        , size5 = getFloat "size5"
        , size6 = getFloat "size6"
        , size7 = getFloat "size7"
        }
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
    , moveDownPlaceHolder =
        { large = getFloat "moveDownPlaceHolderLarge"
        , small = getFloat "moveDownPlaceHolderSmall"
        }
    }


getFloat : String -> Float
getFloat key =
    Maybe.withDefault 1 (getValue key confFloat FrameworkConfiguration.confFloat)


getString : String -> String
getString key =
    Maybe.withDefault "" (getValue key confString FrameworkConfiguration.confString)


getColor : String -> Color.Color
getColor key =
    Maybe.withDefault (Color.rgb 0x00 0x00 0x00) (getValue key confColor FrameworkConfiguration.confColor)


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


hsl2 : Float -> Float -> Float -> Color.Color
hsl2 a b c =
    Color.hsl (degrees a) (b / 100) (c / 100)


confFloat : Dict.Dict String Float
confFloat =
    Dict.fromList
        [ -- Bulma sizes
          ( "size1", 3.0 )
        , ( "size2", 2.5 )
        , ( "size3", 2.0 )
        , ( "size4", 1.5 )
        , ( "size5", 1.25 )
        , ( "size6", 1.0 )
        , ( "size7", 0.75 )

        --
        , ( "moveDownPlaceHolderLarge", 29 )
        , ( "moveDownPlaceHolderSmall", 33 )
        ]


confString : Dict.Dict String String
confString =
    Dict.fromList
        []


confColor : Dict.Dict String Color.Color
confColor =
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
