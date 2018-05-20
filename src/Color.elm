module Color exposing (..)

import Element exposing (Color)


toHsl _ =
    { hue = 77, lightness = 77, saturation = 77, alpha = 77 }


hsl _ _ _ =
    Element.rgb 0 1 0


black =
    Element.rgb 0.2 0.2 0.2


white =
    Element.rgb 1 1 1


yellow =
    Element.rgb 0 1 1


toRgb _ =
    { red = 1, green = 0, blue = 0 }


rgba r g b a =
    Element.rgba r g b a


rgb r g b =
    Element.rgb r g b
