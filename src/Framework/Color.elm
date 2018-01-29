module Framework.Color
    exposing
        ( Color(..)
        , color
        , colorToHex
        , hexToColor
        , introspection
        , maximumContrast
        )

{-| Colors generator

Check [Style Guide](https://lucamug.github.io/elm-style-framework/) to see usage examples.


# Functions

@docs Color, colorToHex, hexToColor, introspection, color, maximumContrast

-}

import Color
import Color.Accessibility
import Color.Convert
import Element
import Element.Background
import Element.Border
import Element.Font
import Framework.Configuration exposing (conf)
import Styleguide


{-| Used to generate the [Style Guide](https://lucamug.github.io/elm-style-framework/)
-}
introspection : Styleguide.Data msg
introspection =
    { name = "Color"
    , signature = "color : Color -> Color.Color"
    , description = "List of colors"
    , usage = "color ColorPrimary"
    , usageResult = usageWrapper Primary
    , boxed = True
    , types =
        [ ( "Sizes"
          , [ ( usageWrapper White, "color White" )
            , ( usageWrapper Black, "color Black" )
            , ( usageWrapper Light, "color Light" )
            , ( usageWrapper Dark, "color Dark" )
            , ( usageWrapper Primary, "color Primary" )
            , ( usageWrapper Link, "color Link" )
            , ( usageWrapper Info, "color Info" )
            , ( usageWrapper Success, "color Success" )
            , ( usageWrapper Warning, "color Warning" )
            , ( usageWrapper Danger, "color Danger" )
            , ( usageWrapper BlackBis, "color BlackBis " )
            , ( usageWrapper BlackTer, "color BlackTer " )
            , ( usageWrapper GreyDarker, "color GreyDarker" )
            , ( usageWrapper GreyDark, "color GreyDark " )
            , ( usageWrapper Grey, "color Grey" )
            , ( usageWrapper GreyLight, "color GreyLight" )
            , ( usageWrapper GreyLighter, "color GreyLighter" )
            , ( usageWrapper WhiteTer, "color WhiteTer" )
            , ( usageWrapper WhiteBis, "color WhiteBis " )
            ]
          )
        ]
    }


usageWrapper : Color -> Element.Element msg
usageWrapper colorType =
    let
        c =
            color colorType
    in
    Element.el
        [ Element.Background.color c
        , Element.width <| Element.px 100
        , Element.height <| Element.px 100
        , Element.padding 10
        , Element.Border.rounded 5
        , Element.Font.color <| maximumContrast c
        ]
    <|
        Element.text <|
            Color.Convert.colorToHex c


{-| Return one of the font color that has maximum contrast on a background color

    maximumContrast Color.black == color ColorFontBright

-}
maximumContrast : Color.Color -> Color.Color
maximumContrast c =
    Maybe.withDefault Color.black <| Color.Accessibility.maximumContrast c [ color White, color Dark ]


{-| List of colors
-}
type Color
    = White
    | Black
    | Light
    | Dark
    | Primary
    | Info
    | Success
    | Warning
    | Danger
    | BlackBis
    | BlackTer
    | GreyDarker
    | GreyDark
    | Grey
    | GreyLight
    | GreyLighter
    | WhiteTer
    | WhiteBis
    | Link


{-| Convert a String to a Color

    hexToColor "#000000" == Color.Black

-}
hexToColor : String -> Color.Color
hexToColor color =
    Result.withDefault Color.gray <| Color.Convert.hexToColor color


{-| Convert a Color to a String

    colorToHex Color.black == "#000000"

-}
colorToHex : Color.Color -> String
colorToHex =
    Color.Convert.colorToHex


{-| Convert a type of color to a Color

    color ColorPrimary == hexToColor "#00D1B2"

-}
color : Color -> Color.Color
color color =
    case color of
        -- https://bulma.io/documentation/modifiers/typography-helpers/
        Link ->
            conf.colors.link

        White ->
            conf.colors.white

        Black ->
            conf.colors.black

        Light ->
            conf.colors.light

        Dark ->
            conf.colors.dark

        Primary ->
            conf.colors.primary

        Info ->
            conf.colors.info

        Success ->
            conf.colors.success

        Warning ->
            conf.colors.warning

        Danger ->
            conf.colors.danger

        BlackBis ->
            conf.colors.blackBis

        BlackTer ->
            conf.colors.blackTer

        GreyDarker ->
            conf.colors.greyDarker

        GreyDark ->
            conf.colors.greyDark

        Grey ->
            conf.colors.grey

        GreyLight ->
            conf.colors.greyLight

        GreyLighter ->
            conf.colors.greyLighter

        WhiteTer ->
            conf.colors.whiteTer

        WhiteBis ->
            conf.colors.whiteBis
