module Framework.Color exposing (Color(..), color, colorToHex, introspection, lighten, maximumContrast, saturate, usageWrapper)

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Colors/Gray%20Scale)


# Functions

@docs Color, color, colorToHex, introspection, lighten, maximumContrast, saturate, usageWrapper

-}

import Char
import Color
import Element exposing (Element, column, text)
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
    , usageResult = usageWrapper <| color Primary
    , boxed = False
    , variations =
        [ ( "Gray Scale"
          , [ ( usageWrapper <| color GrayLightest, "color GrayLightest" )
            , ( usageWrapper <| color GrayLighter, "color GrayLighter" )
            , ( usageWrapper <| color GrayLight, "color GrayLight" )
            , ( usageWrapper <| color GrayMediumLight, "color GrayMediumLight" )
            , ( usageWrapper <| color GrayMedium, "color GrayMedium" )
            , ( usageWrapper <| color Gray, "color Gray" )
            , ( usageWrapper <| color GrayDark, "color GrayDark" )
            , ( usageWrapper <| color GrayDarker, "color GrayDarker" )
            , ( usageWrapper <| color GrayDarkest, "color GrayDarkest" )
            ]
          )
        , ( "Colors"
          , [ ( usageWrapper <| color Muted, "color Muted" )
            , ( usageWrapper <| color Primary, "color Primary" )
            , ( usageWrapper <| color Success, "color Success" )
            , ( usageWrapper <| color Info, "color Info" )
            , ( usageWrapper <| color Warning, "color Warning" )
            , ( usageWrapper <| color Danger, "color Danger" )
            ]
          )
        , ( "Base"
          , [ ( usageWrapper <| color Black, "color Black" )
            , ( usageWrapper <| color White, "color White" )
            , ( usageWrapper <| color Transparent, "color Transparent" )
            ]
          )
        ]
    }


{-| -}
usageWrapper : Color.Color -> Element.Element msg
usageWrapper cl =
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
        hsl =
            Color.toHsl c
    in
    if hsl.lightness < 0.7 then
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
