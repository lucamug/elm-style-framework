module Framework.Color
    exposing
        ( Color(..)
        , colorToHex
        , hexToColor
        , introspection
        , maximumContrast
        , toColor
        )

{-| Colors generator

See the [Style Guide](https://lucamug.github.io/elm-style-framework/) to see usage examples.


# Functions

@docs Color, colorToHex, hexToColor, introspection, toColor, maximumContrast

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
    , signature = "toColor : Color -> Color.Color"
    , description = "List of colors"
    , usage = "toColor ColorPrimary"
    , usageResult = usageWrapper ColorPrimary
    , boxed = True
    , types =
        [ ( "Sizes"
          , [ ( usageWrapper ColorDefault, "toColor ColorDefault" )
            , ( usageWrapper ColorPrimary, "toColor ColorPrimary" )
            , ( usageWrapper ColorLink, "toColor ColorLink" )
            , ( usageWrapper ColorInfo, "toColor ColorInfo" )
            , ( usageWrapper ColorSuccess, "toColor ColorSuccess" )
            , ( usageWrapper ColorWarning, "toColor ColorWarning" )
            , ( usageWrapper ColorDanger, "toColor ColorDanger" )
            , ( usageWrapper ColorFontBright, "toColor ColorFontBright" )
            , ( usageWrapper ColorFontDark, "toColor ColorFontDark" )
            , ( usageWrapper ColorBorderDefault, "toColor ColorBorderDefault" )
            ]
          )
        ]
    }


usageWrapper : Color -> Element.Element msg
usageWrapper colorType =
    let
        color =
            toColor colorType
    in
    Element.el
        [ Element.Background.color color
        , Element.width <| Element.px 100
        , Element.height <| Element.px 100
        , Element.padding 10
        , Element.Border.rounded 5
        , Element.Font.color <| maximumContrast color
        ]
    <|
        Element.text <|
            Color.Convert.colorToHex color


{-| Return one of the font color that has maximum contrast on a background color

    maximumContrast Color.black == toColor ColorFontBright

-}
maximumContrast : Color.Color -> Color.Color
maximumContrast c =
    Maybe.withDefault Color.black <| Color.Accessibility.maximumContrast c [ toColor ColorFontBright, toColor ColorFontDark ]


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

    toColor ColorPrimary == hexToColor "#00D1B2"

-}
toColor : Color -> Color.Color
toColor color =
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
