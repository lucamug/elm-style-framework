module Framework.Spinner exposing (Spinner(..), spinner, introspection)

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Spinners/Spinners)


# Functions

@docs Spinner, spinner, introspection

-}

import Color
import Element
import Html
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
    { name = "Spinners"
    , description = "List of SVG spinners"
    , signature = ""
    , variations =
        [ ( "Spinners"
          , [ ( spinner ThreeCircles 32 Color.black, "spinner ThreeCircles 32 Color.black" )
            , ( spinner Rotation 32 Color.black, "spinner Rotation 32 Color.black" )
            ]
          )
        ]
    }


{-| SVG Spinner

    spinner ThreeCircles 32 Color.black

-}
spinner : Spinner -> Int -> Color.Color -> Element.Element msg
spinner sp size color =
    Element.html <|
        case sp of
            ThreeCircles ->
                spinnerThreeCirclesHtml size color

            Rotation ->
                spinnerRotationHtml size color


{-| Type of spinners
-}
type Spinner
    = ThreeCircles
    | Rotation


spinnerThreeCirclesHtml : Int -> Color.Color -> Html.Html msg
spinnerThreeCirclesHtml size color =
    let
        colorString =
            Color.colorToHex color
    in
    Svg.svg
        [ SA.viewBox "10 26 44 12"
        , SA.xmlSpace "http://www.w3.org/2000/svg"

        -- , SA.width <| String.fromInt size2
        , SA.height <| String.fromInt size
        ]
        [ Svg.g
            []
            [ Svg.circle
                [ SA.cx "16", SA.cy "32", SA.strokeWidth "0", SA.r "4.26701", SA.fill colorString ]
                [ Svg.animate
                    [ SA.attributeName "fill-opacity"
                    , SA.dur "750ms"
                    , SA.values ".5;.6;.8;1;.8;.6;.5;.5"
                    , SA.repeatCount "indefinite"
                    ]
                    []
                , Svg.animate [ SA.attributeName "r", SA.dur "750ms", SA.values "3;3;4;5;6;5;4;3", SA.repeatCount "indefinite" ] []
                ]
            , Svg.circle
                [ SA.cx "32", SA.cy "32", SA.strokeWidth "0", SA.r "5.26701", SA.fill colorString ]
                [ Svg.animate
                    [ SA.attributeName "fill-opacity"
                    , SA.dur "750ms"
                    , SA.values ".5;.5;.6;.8;1;.8;.6;.5"
                    , SA.repeatCount "indefinite"
                    ]
                    []
                , Svg.animate [ SA.attributeName "r", SA.dur "750ms", SA.values "4;3;3;4;5;6;5;4", SA.repeatCount "indefinite" ] []
                ]
            , Svg.circle
                [ SA.cx "48", SA.cy "32", SA.strokeWidth "0", SA.r "5.73299", SA.fill colorString ]
                [ Svg.animate
                    [ SA.attributeName "fill-opacity"
                    , SA.dur "750ms"
                    , SA.values ".6;.5;.5;.6;.8;1;.8;.6"
                    , SA.repeatCount "indefinite"
                    ]
                    []
                , Svg.animate [ SA.attributeName "r", SA.dur "750ms", SA.values "5;4;3;3;4;5;6;5", SA.repeatCount "indefinite" ] []
                ]
            ]
        ]


spinnerRotationHtml : Int -> Color.Color -> Html.Html msg
spinnerRotationHtml size color =
    let
        colorString =
            Color.colorToHex color

        idElement =
            "id" ++ String.dropLeft 1 colorString

        speed =
            "0.6s"
    in
    Svg.svg
        [ SA.viewBox "0 0 38 38"
        , SA.xmlSpace "http://www.w3.org/2000/svg"
        , SA.width <| String.fromInt size
        , SA.height <| String.fromInt size
        ]
        [ Svg.defs []
            [ Svg.linearGradient
                [ SA.id idElement, SA.x1 "8%", SA.x2 "65.7%", SA.y1 "0%", SA.y2 "23.9%" ]
                [ Svg.stop
                    [ SA.offset "0%", SA.stopColor colorString, SA.stopOpacity "0" ]
                    []
                , Svg.stop
                    [ SA.offset "63.1%", SA.stopColor colorString, SA.stopOpacity ".6" ]
                    []
                , Svg.stop
                    [ SA.offset "100%", SA.stopColor colorString ]
                    []
                ]
            ]
        , Svg.g [ SA.fill "none", SA.fillRule "evenodd", SA.transform "translate(1 1)" ]
            [ Svg.path
                [ SA.d "M36 18C36 8 28 0 18 0"
                , SA.stroke <| "url(#" ++ idElement ++ ")"
                , SA.strokeWidth "2"
                ]
                [ Svg.animateTransform
                    [ SA.attributeName "transform"
                    , SA.dur speed
                    , SA.from "0 18 18"
                    , SA.repeatCount "indefinite"
                    , SA.to "360 18 18"
                    , SA.type_ "rotate"
                    ]
                    []
                ]
            , Svg.circle [ SA.cx "36", SA.cy "18", SA.fill colorString, SA.r "1" ]
                [ Svg.animateTransform
                    [ SA.attributeName "transform"
                    , SA.dur speed
                    , SA.from "0 18 18"
                    , SA.repeatCount "indefinite"
                    , SA.to "360 18 18"
                    , SA.type_ "rotate"
                    ]
                    []
                ]
            ]
        ]
