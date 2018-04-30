module Framework.Configuration exposing (conf)

{-| List of values that you can change to costumize the aspect of the framwork

This list is inspired by Bulma framework: <https://bulma.io/documentation/overview/variables/>


# Functions

@docs conf

-}

import Color
import ColorMath.Hex8
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


getString : String -> String
getString key =
    Maybe.withDefault "" (getValue key configuration FrameworkConfiguration.configuration)


getFloat : String -> Float
getFloat key =
    case String.toFloat <| getString key of
        Ok value2 ->
            value2

        Err _ ->
            0


getInt : String -> Int
getInt key =
    round <| getFloat key


getColor : String -> Color.Color
getColor key =
    case ColorMath.Hex8.toColor <| getString key of
        Ok value2 ->
            value2

        Err _ ->
            Color.rgb 0x00 0x00 0x00


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


configuration : Dict.Dict String String
configuration =
    Dict.fromList
        [ -- Bulma sizes
          ( "size1", "3.00" )
        , ( "size2", "2.50" )
        , ( "size3", "2.00" )
        , ( "size4", "1.50" )
        , ( "size5", "1.25" )
        , ( "size6", "1.00" )
        , ( "size7", "0.75" )

        -- Position of the Placeholder
        , ( "moveDownPlaceHolderLarge", "29" )
        , ( "moveDownPlaceHolderSmall", "33" )

        -- Colors - Gray scale
        , ( "grayLightest", "#F7F7F7FF" )
        , ( "grayLighter", "#EBEBEBFF" )
        , ( "grayLight", "#D1D1D1FF" )
        , ( "grayMediumLight", "#B6B6B6FF" )
        , ( "grayMedium", "#9C9C9CFF" )
        , ( "gray", "#828282FF" )
        , ( "grayDark", "#686868FF" )
        , ( "grayDarker", "#4D4D4DFF" )
        , ( "grayDarkest", "#333333FF" )

        -- Colors
        , ( "muted", "#D1D1D1FF" )
        , ( "primary", toString <| hsl2 171 100 41 )
        , ( "success", "#23D160FF" )
        , ( "info", "#209CEEFF" )
        , ( "warning", "#FFDD57FF" )
        , ( "danger", "#FF3860FF" )

        -- Colors - Bulma gray scale
        , ( "black", toString <| hsl2 0 0 4 )
        , ( "black-bis", toString <| hsl2 0 0 7 )
        , ( "black-ter", toString <| hsl2 0 0 14 )
        , ( "grey-darker", toString <| hsl2 0 0 21 )
        , ( "grey-dark", toString <| hsl2 0 0 29 )
        , ( "grey", toString <| hsl2 0 0 48 )
        , ( "grey-light", toString <| hsl2 0 0 71 )
        , ( "grey-lighter", toString <| hsl2 0 0 86 )
        , ( "white-ter", toString <| hsl2 0 0 96 )
        , ( "white-bis", toString <| hsl2 0 0 98 )
        , ( "white", toString <| hsl2 0 0 100 )

        -- Colors - Bulma colors
        , ( "orange", toString <| hsl2 14 100 53 )
        , ( "yellow", toString <| hsl2 48 100 67 )
        , ( "green", toString <| hsl2 141 71 48 )
        , ( "turquoise", toString <| hsl2 171 100 41 )
        , ( "cyan", toString <| hsl2 204 86 53 )
        , ( "blue", toString <| hsl2 217 71 53 )
        , ( "purple", toString <| hsl2 271 100 71 )
        , ( "red", toString <| hsl2 348 100 61 )
        ]
