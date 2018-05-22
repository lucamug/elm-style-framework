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



{- 019
   lighten : Float -> Color.Color -> Color.Color
   lighten quantity cl =
       let
           { hue, saturation, lightness } =
               Color.toHsl cl
       in
       Color.hsl hue saturation (lightness * quantity)
-}


lighten : Float -> Element.Color -> Element.Color
lighten quantity cl =
    cl


{-| -}



{- 019 saturate : Float -> Color.Color -> Color.Color
   saturate quantity cl =
       let
           { hue, saturation, lightness } =
               Color.toHsl cl
       in
       Color.hsl hue (saturation * quantity) lightness
-}


saturate : Float -> Element.Color -> Element.Color
saturate quantity cl =
    cl


{-| Return one of the font color that has maximum contrast on a background color

    maximumContrast Color.black == color ColorFontBright

-}
maximumContrast : Color.Color -> Color.Color -> Color.Color -> Color.Color
maximumContrast c dark bright =
    -- From https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    if intensity c < 186 then
        bright

    else
        dark


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



{- 019
   colorToHex : Color.Color -> String
   colorToHex cl =
       let
           rgba =
               Color.toRgb cl
       in
       List.map toHex [ rgba.red, rgba.green, rgba.blue ]
           |> (::) "#"
           |> String.join ""
-}


colorToHex : Element.Color -> String
colorToHex cl =
    "#666666"


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
colorToHsl2 : Color.Color -> String
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
