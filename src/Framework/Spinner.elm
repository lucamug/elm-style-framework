module Framework.Spinner
    exposing
        ( Spinner(..)
        , introspection
        , spinner
        )

{-| Spinners generator

Check [Style Guide](https://lucamug.github.io/elm-style-framework/) to see usage examples.


# Functions

@docs Spinner, spinner, introspection

-}

import Color
import Element
import Framework.Color
import Html
import Styleguide
import Svg exposing (..)
import Svg.Attributes as SA exposing (..)


{-| Used to generate the [Style Guide](https://lucamug.github.io/elm-style-framework/)
-}
introspection : Styleguide.Introspection msg
introspection =
    { name = "Spinner"
    , signature = "spinner : Spinner -> Int -> Color.Color -> Element.Element msg"
    , description = "List of SVG spinners"
    , usage = "spinner ThreeCircles 20 Color.black"
    , usageResult = spinner ThreeCircles 20 Color.black
    , boxed = True
    , types =
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
spinner spinner size color =
    Element.html <|
        case spinner of
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
            Framework.Color.colorToHex color

        idElement =
            "id" ++ String.dropLeft 1 colorString

        speed =
            "0.6s"

        size =
            32
    in
    svg
        [ viewBox "0 0 64 64"
        , xmlSpace "http://www.w3.org/2000/svg"
        , width <| toString size
        , height <| toString size
        ]
        [ g
            []
            [ circle
                [ cx "16", cy "32", strokeWidth "0", r "4.26701", fill colorString ]
                [ animate
                    [ attributeName "fill-opacity"
                    , dur "750ms"
                    , values ".5;.6;.8;1;.8;.6;.5;.5"
                    , repeatCount "indefinite"
                    ]
                    []
                , animate [ attributeName "r", dur "750ms", values "3;3;4;5;6;5;4;3", repeatCount "indefinite" ] []
                ]
            , circle
                [ cx "32", cy "32", strokeWidth "0", r "5.26701", fill colorString ]
                [ animate
                    [ attributeName "fill-opacity"
                    , dur "750ms"
                    , values ".5;.5;.6;.8;1;.8;.6;.5"
                    , repeatCount "indefinite"
                    ]
                    []
                , animate [ attributeName "r", dur "750ms", values "4;3;3;4;5;6;5;4", repeatCount "indefinite" ] []
                ]
            , circle
                [ cx "48", cy "32", strokeWidth "0", r "5.73299", fill colorString ]
                [ animate
                    [ attributeName "fill-opacity"
                    , dur "750ms"
                    , values ".6;.5;.5;.6;.8;1;.8;.6"
                    , repeatCount "indefinite"
                    ]
                    []
                , animate [ attributeName "r", dur "750ms", values "5;4;3;3;4;5;6;5", repeatCount "indefinite" ] []
                ]
            ]
        ]


spinnerRotationHtml : Int -> Color.Color -> Html.Html msg
spinnerRotationHtml size color =
    let
        colorString =
            Framework.Color.colorToHex color

        idElement =
            "id" ++ String.dropLeft 1 colorString

        speed =
            "0.6s"
    in
    Svg.svg
        [ viewBox "0 0 38 38"
        , xmlSpace "http://www.w3.org/2000/svg"
        , width <| toString size
        , height <| toString size
        ]
        [ Svg.defs []
            [ Svg.linearGradient
                [ id idElement, x1 "8%", x2 "65.7%", y1 "0%", y2 "23.9%" ]
                [ Svg.stop
                    [ offset "0%", stopColor colorString, stopOpacity "0" ]
                    []
                , Svg.stop
                    [ offset "63.1%", stopColor colorString, stopOpacity ".6" ]
                    []
                , Svg.stop
                    [ offset "100%", stopColor colorString ]
                    []
                ]
            ]
        , Svg.g [ fill "none", fillRule "evenodd", transform "translate(1 1)" ]
            [ Svg.path
                [ d "M36 18C36 8 28 0 18 0"
                , stroke <| "url(#" ++ idElement ++ ")"
                , strokeWidth "2"
                ]
                [ Svg.animateTransform
                    [ attributeName "transform"
                    , dur speed
                    , from "0 18 18"
                    , repeatCount "indefinite"
                    , to "360 18 18"
                    , type_ "rotate"
                    ]
                    []
                ]
            , Svg.circle [ cx "36", cy "18", fill colorString, r "1" ]
                [ Svg.animateTransform
                    [ attributeName "transform"
                    , dur speed
                    , from "0 18 18"
                    , repeatCount "indefinite"
                    , to "360 18 18"
                    , type_ "rotate"
                    ]
                    []
                ]
            ]
        ]
