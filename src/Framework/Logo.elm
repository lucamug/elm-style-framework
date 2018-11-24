module Framework.Logo exposing (Color(..), Logo(..), LogoElmType(..), introspection, logo)

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Logos/Logos)


# Functions

@docs Logo, Color, LogoElmType, logo, introspection

-}

import Element
import Html exposing (Html)
import Svg
import Svg.Attributes as SA


{-| -}
introspection :
    { name : String
    , description : String
    , signature : String
    , variations : List ( String, List ( Element.Element msg1, String ) )
    }
introspection =
    { name = "Logos"
    , description = "List of SVG logos"
    , signature = ""
    , variations =
        [ ( "Logos"
          , [ ( logo (LogoElm ElmColorful) 100, "logo (LogoElm ElmColorful) 100" )
            , ( logo (LogoElm <| ElmColor Orange) 100, "logo (LogoElm <| (ElmColor Orange) 100" )
            , ( logo (LogoElm <| ElmColor Green) 100, "logo (LogoElm <| (ElmColor Green) 100" )
            , ( logo (LogoElm <| ElmColor LightBlue) 100, "logo (LogoElm <| (ElmColor LightBlue) 100" )
            , ( logo (LogoElm <| ElmColor Blue) 100, "logo (LogoElm <| (ElmColor Blue) 100" )
            , ( logo (LogoElm <| ElmColor White) 100, "logo (LogoElm <| (ElmColor White) 100" )
            , ( logo (LogoElm <| ElmColor Black) 100, "logo (LogoElm <| (ElmColor Black) 100" )
            , ( logo LogoLucamug 100, "logo Lucamug 100" )
            ]
          )
        ]
    }


{-| SVG Logo
-}
logo : Logo -> Int -> Element.Element msg
logo lg size =
    Element.html <|
        case lg of
            LogoLucamug ->
                logoLucamug size

            LogoElm logoElmType ->
                elmLogo logoElmType size


{-| Type of logos
-}
type Logo
    = LogoElm LogoElmType
    | LogoLucamug


{-| -}
type LogoElmType
    = ElmColor Color
    | ElmColorful


type alias Size =
    Int


{-| -}
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


elmLogo : LogoElmType -> Size -> Html.Html msg
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

                ElmColor cl ->
                    { c1 = cssRgb cl
                    , c2 = cssRgb cl
                    , c3 = cssRgb cl
                    , c4 = cssRgb cl
                    }
    in
    Svg.svg
        [ SA.version "1"
        , SA.viewBox "0 0 323 323"
        , SA.height <| String.fromInt height
        , SA.width <| String.fromInt <| floor <| toFloat height * ratio
        ]
        [ p [ f c.c1, d "M162 153l70-70H92zm94 94l67 67V179z" ] []
        , p [ f c.c2, d "M9 0l70 70h153L162 0zm238 85l77 76-77 77-76-77z" ] []
        , p [ f c.c3, d "M323 144V0H180zm-161 27L9 323h305z" ] []
        , p [ f c.c4, d "M153 162L0 9v305z" ] []
        ]


logoLucamug : Int -> Html msg
logoLucamug height =
    Svg.svg
        [ SA.viewBox "0 0 100 100"
        , SA.height <| String.fromInt height
        , SA.width <| String.fromInt <| floor <| toFloat height * 1
        ]
        [ Svg.path [ SA.fill "none", SA.d "M0 0h100v100H0z" ] []
        , Svg.circle [ SA.cx "50", SA.cy "50", SA.r "50", SA.fill "tomato" ] []
        , Svg.path [ SA.fill "#1e90ff", SA.d "M7 75.6a49.8 49.8 0 0 0 67.2 18c-26-5.2-35.7-28.7-38-45.7-3.8.2-10.9 0-15.8.2-3 17-7.9 21-13.3 27.5z" ] []
        , Svg.path [ SA.fill "#fff", SA.d "M3 43h15c4 0 4-5 0-5h-5c-1 0-1-1 0-1h22c4 0 4-5 0-5H7c-3 0-3 5 0 5h3c1 0 1 1 0 1H1.5l-1 5zm90.8 18l-15-.1c-4 0-4 5 0 5h5c1 0 1 1 0 1h-22c-4 0-4 5 0 5h28c3 0 3-5 0-5h-3c-1 0-1-1 0-1l10.6.1c.6-1.9 1-3 1.4-5zM20.2 47.6a47 47 0 0 1-7.6 21.5c4.4 3 8.9-15.5 10.1-15 1.7 0-2 12.7-.5 12.9 1.6-.1 2.8-8.3 4.8-8.3 1.8.3 2.3 9.1 4.1 8.7 1.9-.3 0-12.2 2-13.1 2-.2 5.1 16.3 9.7 14.8-3.7-7-5.7-14.7-6.7-21.4H20.2z" ] []
        ]
