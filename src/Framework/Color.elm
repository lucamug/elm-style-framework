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

See the [Style Guide](https://lucamug.github.io/elm-style-framework/) to see usage examples.


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
import Styleguide


{-| Used to generate the [Style Guide](https://lucamug.github.io/elm-style-framework/)
-}
introspection : Styleguide.Data msg
introspection =
    { name = "Color"
    , signature = "color : Color -> Color.Color"
    , description = "List of colors"
    , usage = "color ColorPrimary"
    , usageResult = usageWrapper ColorPrimary
    , boxed = True
    , types =
        [ ( "Sizes"
          , [ ( usageWrapper ColorDefault, "color ColorDefault" )
            , ( usageWrapper ColorPrimary, "color ColorPrimary" )
            , ( usageWrapper ColorLink, "color ColorLink" )
            , ( usageWrapper ColorInfo, "color ColorInfo" )
            , ( usageWrapper ColorSuccess, "color ColorSuccess" )
            , ( usageWrapper ColorWarning, "color ColorWarning" )
            , ( usageWrapper ColorDanger, "color ColorDanger" )
            , ( usageWrapper ColorFontBright, "color ColorFontBright" )
            , ( usageWrapper ColorFontDark, "color ColorFontDark" )
            , ( usageWrapper ColorBorderDefault, "color ColorBorderDefault" )
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
    Maybe.withDefault Color.black <| Color.Accessibility.maximumContrast c [ color ColorFontBright, color ColorFontDark ]


{-| List of colors
-}
type Color
    = ColorDefault
    | ColorPrimary
    | ColorLink
    | ColorInfo
    | ColorSuccess
    | ColorWarning
    | ColorDanger
    | ColorFontBright
    | ColorFontDark
    | ColorBorderDefault


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
        ColorDefault ->
            hexToColor "#ffffff"

        ColorPrimary ->
            hexToColor "#00D1B2"

        ColorLink ->
            hexToColor "#276CDA"

        ColorInfo ->
            hexToColor "#209CEE"

        ColorSuccess ->
            hexToColor "#23D160"

        ColorWarning ->
            hexToColor "#ffdd57"

        ColorDanger ->
            hexToColor "#FF3860"

        ColorFontBright ->
            hexToColor "#fff"

        ColorFontDark ->
            hexToColor "#363636"

        ColorBorderDefault ->
            hexToColor "#dbdbdb"
