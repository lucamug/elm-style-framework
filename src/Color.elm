module Color exposing (..)

import Element


toHsl _ =
    { hue = 0, lightness = 0, saturation = 0, alpha = 0 }


black =
    rgb 20 20 20


white =
    rgb 230 230 230


yellow =
    rgb 0 200 200


hsltoString : Float -> Float -> Float -> String
hsltoString h s l =
    hsl (degrees h) (s / 100) (l / 100)
        |> colorToHex


colorToHex : Color -> String
colorToHex cl =
    let
        c =
            toRgb cl
    in
    List.map toHex [ c.red, c.green, c.blue ]
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
    in
    if n < 16 then
        getChr n

    else
        toRadix (n // 16) ++ getChr (modBy 16 n)



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


fmod : Float -> Int -> Float
fmod f n =
    let
        integer =
            floor f
    in
    toFloat (remainderBy integer n) + f - toFloat integer


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
