module Framework.Color exposing (color, colorToHex, introspection, lighten, maximumContrast, saturate, usageWrapper)

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Colors/Gray%20Scale)


# Functions

@docs color, colorToHex, introspection, lighten, maximumContrast, saturate, usageWrapper

-}

import Char
import Color
import Element exposing (Element, column, text)
import Element.Background
import Element.Border
import Element.Font
import Framework.Configuration exposing (conf)


{-| -}
color :
    { black : Color.Color
    , black_bis : Color.Color
    , black_ter : Color.Color
    , blue : Color.Color
    , blue_invert : Color.Color
    , cyan : Color.Color
    , cyan_invert : Color.Color
    , danger : Color.Color
    , danger_invert : Color.Color
    , dark : Color.Color
    , dark_invert : Color.Color
    , green : Color.Color
    , green_invert : Color.Color
    , grey : Color.Color
    , grey_dark : Color.Color
    , grey_darker : Color.Color
    , grey_light : Color.Color
    , grey_lighter : Color.Color
    , info : Color.Color
    , info_invert : Color.Color
    , light : Color.Color
    , light_invert : Color.Color
    , link : Color.Color
    , link_active : Color.Color
    , link_active_border : Color.Color
    , link_focus : Color.Color
    , link_focus_border : Color.Color
    , link_hover : Color.Color
    , link_hover_border : Color.Color
    , link_invert : Color.Color
    , link_visited : Color.Color
    , orange_invert : Color.Color
    , primary : Color.Color
    , primary_invert : Color.Color
    , purple : Color.Color
    , purple_invert : Color.Color
    , red : Color.Color
    , red_invert : Color.Color
    , success : Color.Color
    , success_invert : Color.Color
    , turquoise : Color.Color
    , turquoise_invert : Color.Color
    , warning : Color.Color
    , warning_invert : Color.Color
    , white : Color.Color
    , white_bis : Color.Color
    , white_ter : Color.Color
    , yellow : Color.Color
    , yellow_invert : Color.Color
    , orange : Color.Color
    , transparent : Color.Color
    , muted : Color.Color
    }
color =
    conf.colors


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
    , usageResult = usageWrapper <| color.primary
    , boxed = False
    , variations =
        [ ( "Colors"
          , [ ( usageWrapper <| color.orange, "color.orange" )
            , ( usageWrapper <| color.yellow, "color.yellow" )
            , ( usageWrapper <| color.green, "color.green" )
            , ( usageWrapper <| color.turquoise, "color.turquoise" )
            , ( usageWrapper <| color.cyan, "color.cyan" )
            , ( usageWrapper <| color.blue, "color.blue" )
            , ( usageWrapper <| color.purple, "color.purple" )
            , ( usageWrapper <| color.red, "color.red" )
            ]
          )
        , ( "Inverted"
          , [ ( usageWrapper <| color.orange_invert, "color.orange_invert" )
            , ( usageWrapper <| color.yellow_invert, "color.yellow_invert" )
            , ( usageWrapper <| color.green_invert, "color.green_invert" )
            , ( usageWrapper <| color.turquoise_invert, "color.turquoise_invert" )
            , ( usageWrapper <| color.cyan_invert, "color.cyan_invert" )
            , ( usageWrapper <| color.blue_invert, "color.blue_invert" )
            , ( usageWrapper <| color.purple_invert, "color.purple_invert" )
            , ( usageWrapper <| color.red_invert, "color.red_invert" )
            ]
          )
        , ( "Gray Scale"
          , [ ( usageWrapper <| color.black, "color.black" )
            , ( usageWrapper <| color.black_bis, "color.black_bis" )
            , ( usageWrapper <| color.black_ter, "color.black_ter" )
            , ( usageWrapper <| color.grey_darker, "color.grey_darker" )
            , ( usageWrapper <| color.grey_dark, "color.grey_dark" )
            , ( usageWrapper <| color.grey, "color.grey" )
            , ( usageWrapper <| color.grey_light, "color.grey_light" )
            , ( usageWrapper <| color.grey_lighter, "color.grey_lighter" )
            , ( usageWrapper <| color.white_ter, "color.white_ter" )
            , ( usageWrapper <| color.white_bis, "color.white_bis" )
            , ( usageWrapper <| color.white, "color.white" )
            ]
          )
        , ( "Derived"
          , [ ( usageWrapper <| color.primary, "color.primary" )
            , ( usageWrapper <| color.info, "color.info" )
            , ( usageWrapper <| color.success, "color.success" )
            , ( usageWrapper <| color.warning, "color.warning" )
            , ( usageWrapper <| color.danger, "color.danger" )
            , ( usageWrapper <| color.light, "color.light" )
            , ( usageWrapper <| color.dark, "color.dark" )
            ]
          )
        , ( "Derived Inverted"
          , [ ( usageWrapper <| color.primary_invert, "color.primary_invert" )
            , ( usageWrapper <| color.info_invert, "color.info_invert" )
            , ( usageWrapper <| color.success_invert, "color.success_invert" )
            , ( usageWrapper <| color.warning_invert, "color.warning_invert" )
            , ( usageWrapper <| color.danger_invert, "color.danger_invert" )
            , ( usageWrapper <| color.light_invert, "color.light_invert" )
            , ( usageWrapper <| color.dark_invert, "color.dark_invert" )
            ]
          )
        , ( "Links"
          , [ ( usageWrapper <| color.link, "color.link" )
            , ( usageWrapper <| color.link_invert, "color.link_invert" )
            , ( usageWrapper <| color.link_visited, "color.link_visited" )
            , ( usageWrapper <| color.link_hover, "color.link_hover" )
            , ( usageWrapper <| color.link_hover_border, "color.link_hover_border" )
            , ( usageWrapper <| color.link_focus, "color.link_focus" )
            , ( usageWrapper <| color.link_focus_border, "color.link_focus_border" )
            , ( usageWrapper <| color.link_active, "color.link_active" )
            , ( usageWrapper <| color.link_active_border, "color.link_active_border" )
            ]
          )
        , ( "Others"
          , [ ( usageWrapper <| color.transparent, "color.transparent" )
            , ( usageWrapper <| color.muted, "color.muted" )
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
        , Element.padding 10
        , Element.Border.rounded 5
        , Element.Font.color <| maximumContrast cl
        ]
    <|
        column []
            [ text <| colorToHex cl
            , text <| colorToHsl2 cl
            ]


{-| Return one of the font color that has maximum contrast on a background color

    maximumContrast Color.black == color ColorFontBright

-}
maximumContrast : Color.Color -> Color.Color
maximumContrast c =
    -- From https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    if intensity c < 186 then
        color.white
    else
        color.black


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


colorToHsl2 : Color.Color -> String
colorToHsl2 cl =
    let
        { hue, saturation, lightness, alpha } =
            Color.toHsl cl

        hue2 =
            if toString hue == "NaN" then
                0
            else
                hue
    in
    "hsla("
        ++ String.join ", "
            [ toString <| norm57 hue2
            , toString (norm100 saturation) ++ "%"
            , toString (norm100 lightness) ++ "%"
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
