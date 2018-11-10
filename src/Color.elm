module Color exposing (Color(..), Color2, black, colorToHex, erroneousHex, fmod, fromString, fromStringHelp, hex, hexToColor, hsl, hsl2, hsl2ToString, hslToRgb, hslToString, hsla, intensity, lighten, maximumContrast, rgb, rgbToHsl, rgba, saturate, toElementColor, toFloatNorm255, toHex, toHsl, toRadix, toRgb, validHex, white, withPrecedingHash, yellow)

import Element



-- black : Color


black =
    rgb 20 20 20


white : Color
white =
    rgb 230 230 230


yellow : Color
yellow =
    -- #ffeb3b
    -- 255 235 59
    -- HSLA 54 100% 62% 1
    -- Color.hsl2ToString  48 100 67
    -- rgb 255 235 59
    hsla 54 100 62 1


hsl2 : Float -> Float -> Float -> Color
hsl2 h2 s2 l2 =
    hsl (degrees h2) (s2 / 100) (l2 / 100)


hsl2ToString : Float -> Float -> Float -> String
hsl2ToString h2 s2 l2 =
    hsl2 h2 s2 l2
        |> colorToHex


hslToString : Float -> Float -> Float -> String
hslToString h s l =
    hsl h s l
        |> colorToHex


colorToHex : Color -> String
colorToHex cl =
    let
        { red, green, blue } =
            toRgb cl
    in
    List.map toHex [ red, green, blue ]
        |> (::) "#"
        |> String.join ""


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

        result =
            if n < 16 then
                getChr n

            else
                toRadix (n // 16) ++ getChr (remainderBy 16 n)
    in
    result



--
-- From https://github.com/elm-lang/core/blob/5.1.1/src/Color.elm


type Color
    = RGBA Int Int Int Float
    | HSLA Float Float Float Float


rgba : Int -> Int -> Int -> Float -> Color
rgba =
    RGBA


rgb : Int -> Int -> Int -> Color
rgb r g b =
    RGBA r g b 1


hsla : Float -> Float -> Float -> Float -> Color
hsla hue saturation lightness alpha =
    HSLA (hue - turns (toFloat (floor (hue / (2 * pi))))) saturation lightness alpha


hsl : Float -> Float -> Float -> Color
hsl hue saturation lightness =
    hsla hue saturation lightness 1


toRgb : Color -> { red : Int, green : Int, blue : Int, alpha : Float }
toRgb color =
    case color of
        RGBA r g b a ->
            { red = r, green = g, blue = b, alpha = a }

        HSLA h s l a ->
            let
                ( r, g, b ) =
                    hslToRgb h s l
            in
            { red = round (255 * r)
            , green = round (255 * g)
            , blue = round (255 * b)
            , alpha = a
            }


toHsl : Color -> { hue : Float, saturation : Float, lightness : Float, alpha : Float }
toHsl color =
    case color of
        HSLA h s l a ->
            { hue = h, saturation = s, lightness = l, alpha = a }

        RGBA r g b a ->
            let
                ( h, s, l ) =
                    rgbToHsl r g b
            in
            { hue = h, saturation = s, lightness = l, alpha = a }


hslToRgb : Float -> Float -> Float -> ( Float, Float, Float )
hslToRgb hue saturation lightness =
    let
        chroma =
            (1 - abs (2 * lightness - 1)) * saturation

        normHue =
            hue / degrees 60

        x =
            chroma * (1 - abs (fmod normHue 2 - 1))

        ( r, g, b ) =
            if normHue < 0 then
                ( 0, 0, 0 )

            else if normHue < 1 then
                ( chroma, x, 0 )

            else if normHue < 2 then
                ( x, chroma, 0 )

            else if normHue < 3 then
                ( 0, chroma, x )

            else if normHue < 4 then
                ( 0, x, chroma )

            else if normHue < 5 then
                ( x, 0, chroma )

            else if normHue < 6 then
                ( chroma, 0, x )

            else
                ( 0, 0, 0 )

        m =
            lightness - chroma / 2
    in
    ( r + m, g + m, b + m )


rgbToHsl : Int -> Int -> Int -> ( Float, Float, Float )
rgbToHsl red green blue =
    let
        r =
            toFloat red / 255

        g =
            toFloat green / 255

        b =
            toFloat blue / 255

        cMax =
            max (max r g) b

        cMin =
            min (min r g) b

        c =
            cMax - cMin

        hue =
            degrees 60
                * (if cMax == r then
                    fmod ((g - b) / c) 6

                   else if cMax == g then
                    ((b - r) / c) + 2

                   else
                    {- cMax == b -}
                    ((r - g) / c) + 4
                  )

        lightness =
            (cMax + cMin) / 2

        saturation =
            if lightness == 0 then
                0

            else
                c / (1 - abs (2 * lightness - 1))
    in
    ( hue, saturation, lightness )


fmod : Float -> Int -> Float
fmod f n =
    let
        integer =
            floor f
    in
    toFloat (modBy n integer) + f - toFloat integer


toElementColor : Color -> Element.Color
toElementColor color =
    let
        c =
            toRgb color
    in
    Element.rgba (toFloatNorm255 c.red) (toFloatNorm255 c.green) (toFloatNorm255 c.blue) c.alpha


toFloatNorm255 : Int -> Float
toFloatNorm255 int =
    toFloat int / 255


hexToColor : String -> Color
hexToColor string =
    let
        c =
            hex string
    in
    rgba c.red c.green c.blue c.alpha


type alias Color2 =
    { alpha : Float, blue : Int, green : Int, red : Int, value : String }


hex : String -> Color2
hex str =
    let
        withoutHash =
            if String.startsWith "#" str then
                String.dropLeft 1 str

            else
                str
    in
    case String.toList withoutHash of
        [ r, g, b ] ->
            validHex str ( r, r ) ( g, g ) ( b, b ) ( 'f', 'f' )

        [ r, g, b, a ] ->
            validHex str ( r, r ) ( g, g ) ( b, b ) ( a, a )

        [ r1, r2, g1, g2, b1, b2 ] ->
            validHex str ( r1, r2 ) ( g1, g2 ) ( b1, b2 ) ( 'f', 'f' )

        [ r1, r2, g1, g2, b1, b2, a1, a2 ] ->
            validHex str ( r1, r2 ) ( g1, g2 ) ( b1, b2 ) ( a1, a2 )

        _ ->
            erroneousHex str


validHex : String -> ( Char, Char ) -> ( Char, Char ) -> ( Char, Char ) -> ( Char, Char ) -> Color2
validHex str ( r1, r2 ) ( g1, g2 ) ( b1, b2 ) ( a1, a2 ) =
    let
        toResult =
            String.fromList >> String.toLower >> fromString

        results =
            ( ( toResult [ r1, r2 ]
              , toResult [ g1, g2 ]
              )
            , ( toResult [ b1, b2 ]
              , toResult [ a1, a2 ]
              )
            )
    in
    case results of
        ( ( Ok red, Ok green ), ( Ok blue, Ok alpha ) ) ->
            { value = withPrecedingHash str
            , red = red
            , green = green
            , blue = blue
            , alpha = toFloat alpha / 255
            }

        _ ->
            erroneousHex str


withPrecedingHash : String -> String
withPrecedingHash str =
    if String.startsWith "#" str then
        str

    else
        String.cons '#' str


erroneousHex : String -> Color2
erroneousHex str =
    { value = withPrecedingHash str
    , red = 0
    , green = 0
    , blue = 0
    , alpha = 1
    }


fromString : String -> Result String Int
fromString str =
    if String.isEmpty str then
        Err "Empty strings are not valid hexadecimal strings."

    else
        let
            result =
                if String.startsWith "-" str then
                    let
                        list =
                            str
                                |> String.toList
                                |> List.tail
                                |> Maybe.withDefault []
                    in
                    fromStringHelp (List.length list - 1) list 0
                        |> Result.map negate

                else
                    fromStringHelp (String.length str - 1) (String.toList str) 0

            formatError err =
                String.join " "
                    [ "\"" ++ str ++ "\""
                    , "is not a valid hexadecimal string because"
                    , err
                    ]
        in
        Result.mapError formatError result


fromStringHelp : Int -> List Char -> Int -> Result String Int
fromStringHelp position chars accumulated =
    case chars of
        [] ->
            Ok accumulated

        char :: rest ->
            -- NOTE: It's important to have this call `fromStringHelp` directly.
            -- Previously this called a helper function, but that meant this
            -- was not tail-call optimized; it did not compile to a `while` loop
            -- the way it does now. See 240c3d5aa4f97463b924728935d2989621e9fd6b
            case char of
                '0' ->
                    fromStringHelp (position - 1) rest accumulated

                '1' ->
                    fromStringHelp (position - 1) rest (accumulated + (16 ^ position))

                '2' ->
                    fromStringHelp (position - 1) rest (accumulated + (2 * (16 ^ position)))

                '3' ->
                    fromStringHelp (position - 1) rest (accumulated + (3 * (16 ^ position)))

                '4' ->
                    fromStringHelp (position - 1) rest (accumulated + (4 * (16 ^ position)))

                '5' ->
                    fromStringHelp (position - 1) rest (accumulated + (5 * (16 ^ position)))

                '6' ->
                    fromStringHelp (position - 1) rest (accumulated + (6 * (16 ^ position)))

                '7' ->
                    fromStringHelp (position - 1) rest (accumulated + (7 * (16 ^ position)))

                '8' ->
                    fromStringHelp (position - 1) rest (accumulated + (8 * (16 ^ position)))

                '9' ->
                    fromStringHelp (position - 1) rest (accumulated + (9 * (16 ^ position)))

                'a' ->
                    fromStringHelp (position - 1) rest (accumulated + (10 * (16 ^ position)))

                'b' ->
                    fromStringHelp (position - 1) rest (accumulated + (11 * (16 ^ position)))

                'c' ->
                    fromStringHelp (position - 1) rest (accumulated + (12 * (16 ^ position)))

                'd' ->
                    fromStringHelp (position - 1) rest (accumulated + (13 * (16 ^ position)))

                'e' ->
                    fromStringHelp (position - 1) rest (accumulated + (14 * (16 ^ position)))

                'f' ->
                    fromStringHelp (position - 1) rest (accumulated + (15 * (16 ^ position)))

                nonHex ->
                    Err (String.fromChar nonHex ++ " is not a valid hexadecimal character.")



-- #############################
-- ## From Color Manipulation ##
-- #############################


saturate : Float -> Color -> Color
saturate quantity cl =
    cl


lighten : Float -> Color -> Color
lighten quantity cl =
    cl


maximumContrast : Color -> a -> a -> a
maximumContrast c dark bright =
    -- From https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    if intensity c < 186 then
        bright

    else
        dark


intensity : Color -> Float
intensity c =
    -- From https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    let
        c2 =
            toRgb c
    in
    -- From https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    toFloat c2.red * 0.299 + toFloat c2.green * 0.587 + toFloat c2.blue * 0.114



-- #############################
-- ##                         ##
-- #############################
