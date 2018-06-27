module Framework.ColorManipulation exposing (colorToHex, colorToHsl2, lighten, maximumContrast, saturate)

{-| [Demo](https://lucamug.github.io/elm-style-framework/framework.html)


# Functions

@docs color, colorToHex, colorToHsl2, introspection, lighten, maximumContrast, saturate, usageWrapper

-}

import Char
import Color


{-| -}
lighten : Float -> Color.Color -> Color.Color
lighten quantity cl =
    let
        { hue, saturation, lightness } =
            Color.toHsl cl
    in
    Color.hsl hue saturation (lightness * quantity)


{-| -}
saturate : Float -> Color.Color -> Color.Color
saturate quantity cl =
    let
        { hue, saturation, lightness } =
            Color.toHsl cl
    in
    Color.hsl hue (saturation * quantity) lightness


{-| Return one of the font color that has maximum contrast on a background color

    maximumContrast Color.black == color ColorFontBright

-}
maximumContrast : Color.Color -> Color.Color
maximumContrast c =
    -- From https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    if intensity c < 186 then
        Color.white
    else
        Color.black


intensity : Color.Color -> Float
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
colorToHex : Color.Color -> String
colorToHex cl =
    let
        rgba =
            Color.toRgb cl
    in
    List.map toHex [ rgba.red, rgba.green, rgba.blue ]
        |> (::) "#"
        |> String.join ""


fromNaNtoZero : number -> number
fromNaNtoZero value =
    if toString value == "NaN" then
        0
    else
        value


{-| -}
colorToHsl2 : Color.Color -> String
colorToHsl2 cl =
    let
        { hue, saturation, lightness, alpha } =
            Color.toHsl cl
    in
    "hsla("
        ++ String.join ", "
            [ toString <| norm57 <| fromNaNtoZero hue
            , toString (norm100 <| fromNaNtoZero saturation) ++ "%"
            , toString (norm100 <| fromNaNtoZero lightness) ++ "%"
            , toString <| toFloat (norm100 alpha) / 100
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
                toString c
            else
                String.fromChar <| Char.fromCode (87 + c)
    in
    if n < 16 then
        getChr n
    else
        toRadix (n // 16) ++ getChr (n % 16)
