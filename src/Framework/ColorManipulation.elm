module Framework.ColorManipulation exposing (colorToHex, colorToHsl2, lighten, maximumContrast, saturate)

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Colors/Gray%20Scale)


# Functions

@docs color, colorToHex, colorToHsl2, introspection, lighten, maximumContrast, saturate, usageWrapper

-}

import Char
import Color
import Element


-- import Color


{-| -}
lighten : Float -> Element.Color -> Element.Color
lighten quantity cl =
    let
        { hue, saturation, lightness } =
            Color.toHsl cl
    in
    Color.hsl hue saturation (lightness * quantity)


{-| -}
saturate : Float -> Element.Color -> Element.Color
saturate quantity cl =
    let
        { hue, saturation, lightness } =
            Color.toHsl cl
    in
    Color.hsl hue (saturation * quantity) lightness


{-| Return one of the font color that has maximum contrast on a background color

    maximumContrast Color.black == color ColorFontBright

-}
maximumContrast : Element.Color -> Element.Color
maximumContrast c =
    -- From https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    if intensity c < 186 then
        Color.white
    else
        Color.black


intensity : Element.Color -> Float
intensity c =
    -- From https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    let
        rgb =
            Color.toRgb c
    in
    -- From https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    toFloat rgb.red * 0.299 + toFloat rgb.green * 0.587 + toFloat rgb.blue * 0.114


norm100 : Float -> Int
norm100 value =
    round (value * 100)


norm57 : Float -> Int
norm57 value =
    round (value * 57)


{-| -}
colorToHex : Element.Color -> String
colorToHex cl =
    let
        rgba =
            Color.toRgb cl
    in
    List.map toHex [ rgba.red, rgba.green, rgba.blue ]
        |> (::) "#"
        |> String.join ""


fromNaNtoZeroInt : Int -> Int
fromNaNtoZeroInt value =
    if String.fromInt value == "NaN" then
        0
    else
        value


fromNaNtoZeroFloat : Float -> Float
fromNaNtoZeroFloat value =
    if String.fromFloat value == "NaN" then
        0
    else
        value


{-| -}
colorToHsl2 : Element.Color -> String
colorToHsl2 cl =
    let
        { hue, saturation, lightness, alpha } =
            Color.toHsl cl
    in
    "hsla("
        ++ String.join ", "
            [ String.fromInt <| norm57 <| fromNaNtoZeroFloat hue
            , String.fromInt (norm100 <| fromNaNtoZeroFloat saturation) ++ "%"
            , String.fromInt (norm100 <| fromNaNtoZeroFloat lightness) ++ "%"
            , String.fromFloat <| toFloat (norm100 alpha) / 100
            ]
        ++ ")"


toHex : Int -> String
toHex =
    toRadix >> String.padLeft 2 '0'


toRadix : Int -> String
toRadix n =
    let
        getChr c =
            if c < 10 then
                String.fromInt c
            else
                String.fromChar <| Char.fromCode (87 + c)
    in
    if n < 16 then
        getChr n
    else
        toRadix (n // 16) ++ getChr (modBy 16 n)
