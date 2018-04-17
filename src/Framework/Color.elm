module Framework.Color exposing (Color(..), color, colorToHex, introspection, lighten, maximumContrast, saturate)

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Colors/Gray%20Scale)


# Functions

@docs Color, color, colorToHex, introspection, lighten, maximumContrast, saturate

-}

{- TODO
   Work directly with hue, saturation, lightness

   { hue, saturation, lightness } =
       baseColor
           |> Color.toHsl

   headingColor =
       Color.hsl hue saturation (lightness * 0.7)

   detailsColor =
       Color.hsl hue (saturation * 0.8) (lightness * 0.5 + 0.3)

   backgroundColor =
       Color.hsl hue (saturation * 1.2) (lightness * 0.05 + 0.93)
-}
--import Color.Convert

import Char
import Color
import Element exposing (..)
import Element.Background
import Element.Border
import Element.Font
import Framework.Configuration exposing (conf)


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


{-| -}
introspection :
    { boxed : Bool
    , description : String
    , name : String
    , signature : String
    , usage : String
    , usageResult : Element msg
    , variations : List ( String, List ( Element msg1, String ) )
    }
introspection =
    { name = "Colors"
    , signature = "color : Color -> Color.Color"
    , description = ""
    , usage = "color ColorPrimary"
    , usageResult = usageWrapper Primary
    , boxed = False
    , variations =
        [ ( "Gray Scale"
          , [ ( usageWrapper GrayLightest, "color GrayLightest" )
            , ( usageWrapper GrayLighter, "color GrayLighter" )
            , ( usageWrapper GrayLight, "color GrayLight" )
            , ( usageWrapper GrayMediumLight, "color GrayMediumLight" )
            , ( usageWrapper GrayMedium, "color GrayMedium" )
            , ( usageWrapper Gray, "color Gray" )
            , ( usageWrapper GrayDark, "color GrayDark" )
            , ( usageWrapper GrayDarker, "color GrayDarker" )
            , ( usageWrapper GrayDarkest, "color GrayDarkest" )
            ]
          )
        , ( "Colors"
          , [ ( usageWrapper Muted, "color Muted" )
            , ( usageWrapper Primary, "color Primary" )
            , ( usageWrapper Success, "color Success" )
            , ( usageWrapper Info, "color Info" )
            , ( usageWrapper Warning, "color Warning" )
            , ( usageWrapper Danger, "color Danger" )
            ]
          )
        , ( "Base"
          , [ ( usageWrapper Black, "color Black" )
            , ( usageWrapper White, "color White" )
            , ( usageWrapper Transparent, "color Transparent" )
            ]
          )
        ]
    }


usageWrapper : Color -> Element.Element msg
usageWrapper colorType =
    let
        cl =
            color colorType
    in
    Element.el
        [ Element.Background.color cl
        , Element.width <| Element.px 200

        -- , Element.height <| Element.px 100
        , Element.padding 10
        , Element.Border.rounded 5
        , Element.Font.color <| maximumContrast cl
        ]
    <|
        column []
            [ text <| colorToHex cl
            , text <| colorToHsl cl
            ]


{-| Return one of the font color that has maximum contrast on a background color

    maximumContrast Color.black == color ColorFontBright

-}
maximumContrast : Color.Color -> Color.Color
maximumContrast c =
    let
        { hue, saturation, lightness } =
            c
                |> Color.toHsl
    in
    if lightness < 0.7 then
        color White
    else
        color Black


{-| List of colors
-}
type Color
    = Transparent
    | White
    | Black
      -- GRAY SCALE
    | GrayLightest
    | GrayLighter
    | GrayLight
    | GrayMediumLight
    | GrayMedium
    | Gray
    | GrayDark
    | GrayDarker
    | GrayDarkest
      -- COLORS
    | Muted
    | Primary
    | Success
    | Info
    | Warning
    | Danger


norm : Float -> Int
norm value =
    round (value * 255)


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
        { red, green, blue, alpha } =
            Color.toRgb cl
    in
    -- List.map toHex [ red, green, blue, floor (alpha * 255) ]
    List.map toHex [ red, green, blue ]
        |> (::) "#"
        |> String.join ""


colorToHsl : Color.Color -> String
colorToHsl cl =
    let
        { hue, saturation, lightness, alpha } =
            Color.toHsl cl

        hue2 =
            if toString hue == "NaN" then
                0
            else
                hue
    in
    List.map toString [ norm57 hue2, norm100 saturation, norm100 lightness, norm100 alpha ]
        |> String.join "-"
        |> (++) "Hsl "


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


{-| Convert a type of color to a Color

    color ColorPrimary == hexToColor "#00D1B2"

-}
color : Color -> Color.Color
color cl =
    case cl of
        Transparent ->
            Color.hsla 0 0 0 0

        White ->
            Color.rgb 0xFF 0xFF 0xFF

        Black ->
            Color.rgb 0x00 0x00 0x00

        -- GRAY SCALE
        GrayLightest ->
            conf.colors.grayLightest

        GrayLighter ->
            conf.colors.grayLighter

        GrayLight ->
            conf.colors.grayLight

        GrayMediumLight ->
            conf.colors.grayMediumLight

        GrayMedium ->
            conf.colors.grayMedium

        Gray ->
            conf.colors.gray

        GrayDark ->
            conf.colors.grayDark

        GrayDarker ->
            conf.colors.grayDarker

        GrayDarkest ->
            conf.colors.grayDarkest

        -- COLORS
        Muted ->
            conf.colors.muted

        Primary ->
            conf.colors.primary

        Success ->
            conf.colors.success

        Info ->
            conf.colors.info

        Warning ->
            conf.colors.warning

        Danger ->
            conf.colors.danger
