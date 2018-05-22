module ColorElement exposing (..)

import Color
import Element


rgba : Int -> Int -> Int -> Float -> Element.Color
rgba r g b a =
    Color.rgba r g b a |> Color.toElementColor


rgb : Int -> Int -> Int -> Element.Color
rgb r g b =
    Color.rgb r g b |> Color.toElementColor


hexToColor : String -> Element.Color
hexToColor string =
    Color.toElementColor (Color.hexToColor string)


yellow =
    Color.toElementColor Color.yellow


black =
    Color.toElementColor Color.black


white =
    Color.toElementColor Color.white


hsltoString : Float -> Float -> Float -> String
hsltoString h s l =
    Color.hsltoString h s l
