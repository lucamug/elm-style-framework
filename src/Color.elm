module Color exposing (..)

import Element exposing (Color)


toHsl _ =
    { hue = 0, lightness = 0, saturation = 0, alpha = 0 }


hsl _ _ _ =
    Element.rgb 0 0 0


black =
    Element.rgb 0 0 0


white =
    Element.rgb 255 255 255


yellow =
    Element.rgb 255 255 0


toRgb _ =
    { red = 0, green = 0, blue = 0 }


rgba r g b a =
    Element.rgba r g b a


rgb r g b =
    Element.rgb r g b
