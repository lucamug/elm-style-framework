module Framework.Logo
    exposing
        ( Logo(..)
        , introspection
        , logo
        )

{-| Logos generator


# Functions

@docs Logo, spinner, introspection

-}

import Color
import Element
import Element.Background
import Element.Border
import Html exposing (Html)
import Svg exposing (..)
import Svg.Attributes as SA exposing (..)


{-| -}
introspection :
    { boxed : Bool
    , description : String
    , name : String
    , signature : String
    , usage : String
    , usageResult : Element.Element msg
    , variations : List ( String, List ( Element.Element msg1, String ) )
    }
introspection =
    { name = "Logos"
    , signature = "logo : Logo -> Int -> Color.Color -> Element.Element msg"
    , description = "List of SVG logos"
    , usage = "logo ElmColorful 48"
    , usageResult = logo ElmColorful 48
    , boxed = True
    , variations =
        [ ( "Logos"
          , [ ( logo ElmColorful 100, "logo ElmColorful 100" )
            , ( logo (ElmColor Orange) 100, "logo (ElmColor Orange) 100" )
            , ( logo (ElmColor Green) 100, "logo (ElmColor Green) 100" )
            , ( logo (ElmColor LightBlue) 100, "logo (ElmColor LightBlue) 100" )
            , ( logo (ElmColor Blue) 100, "logo (ElmColor Blue) 100" )
            , ( logo (ElmColor White) 100, "logo (ElmColor White) 100" )
            , ( logo (ElmColor Black) 100, "logo (ElmColor Black) 100" )
            ]
          )
        ]
    }


usageWrapper : Element.Element msg -> Element.Element msg
usageWrapper item =
    Element.el
        [ Element.Background.color <| Color.rgb 0xBB 0xBB 0xBB
        , Element.padding 10
        , Element.Border.rounded 5
        ]
    <|
        item


{-| SVG Logo
-}
logo : Logo -> Int -> Element.Element msg
logo logo size =
    Element.html <|
        case logo of
            ElmColor color ->
                elmLogo (ElmColor color) size

            ElmColorful ->
                elmLogo ElmColorful size


{-| Type of logos
-}
type Logo
    = ElmColor Color
    | ElmColorful


type alias Size =
    Int


type Color
    = Orange
    | Green
    | LightBlue
    | Blue
    | White
    | Black


ratio : Float
ratio =
    -- Width / Height
    1


cssRgb : Color -> String
cssRgb color =
    case color of
        Orange ->
            "#f0ad00"

        Green ->
            "#7fd13b"

        LightBlue ->
            "#60b5cc"

        Blue ->
            "#5a6378"

        White ->
            "#fff"

        Black ->
            "#000"


elmLogo : Logo -> Size -> Html.Html msg
elmLogo type_ height =
    let
        f =
            SA.fill

        d =
            SA.d

        p =
            Svg.path

        c =
            case type_ of
                ElmColorful ->
                    { c1 = cssRgb Orange
                    , c2 = cssRgb Green
                    , c3 = cssRgb LightBlue
                    , c4 = cssRgb Blue
                    }

                ElmColor c ->
                    { c1 = cssRgb c
                    , c2 = cssRgb c
                    , c3 = cssRgb c
                    , c4 = cssRgb c
                    }
    in
    Svg.svg
        [ SA.version "1"
        , SA.viewBox "0 0 323 323"
        , SA.height <| toString height
        , SA.width <| toString <| floor <| toFloat height * ratio
        ]
        [ p [ f c.c1, d "M162 153l70-70H92zm94 94l67 67V179z" ] []
        , p [ f c.c2, d "M9 0l70 70h153L162 0zm238 85l77 76-77 77-76-77z" ] []
        , p [ f c.c3, d "M323 144V0H180zm-161 27L9 323h305z" ] []
        , p [ f c.c4, d "M153 162L0 9v305z" ] []
        ]
