module Framework.Card
    exposing
        ( Model
        , Msg
        , example1
        , flipping
        , initModel
        , introspection
        , normal
        , simple
        , simpleWithTitle
        , update
        )

{-| [Demo](https://lucamug.github.io/elm-style-framework/framework.html)

Wrapper for content


# Functions

@docs Model, Msg, example1, flipping, initModel, introspection, simple, simpleWithTitle, update, normal

-}

import Color
import Element exposing (Attribute, Element, alignTop, centerX, centerY, column, el, fill, height, html, htmlAttribute, padding, pointer, px, row, shrink, spacing, text, width)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Framework.Color
import Html
import Html.Attributes


{-| -}
type alias Model =
    Bool


{-| -}
initModel : Model
initModel =
    True


{-| -}
type Msg
    = Flip


{-| -}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Flip ->
            ( not model, Cmd.none )


{-| -}
introspection :
    { name : String
    , description : String
    , signature : String
    , variations : List ( String, List ( Element msg1, String ) )
    }
introspection =
    { name = "Cards"
    , description = "Wrapper for content"
    , signature = ""
    , variations =
        [ ( "Flipping", [ ( text "special: Cards.example1", "" ) ] )
        , ( "Simple with Title", [ ( simpleWithTitle "Simple" "with Title" <| text "Content", """simpleWithTitle "Simple" "with Title" <|
text "Content\"""" ) ] )
        , ( "Simple", [ ( simple <| text "Content", """simple <| text "Content\"""" ) ] )
        ]
    }


{-| -}
cardCommonAttr : List (Attribute msg)
cardCommonAttr =
    [ Border.width 1
    , Border.color <| Framework.Color.grey_lighter
    , Background.color <| Framework.Color.white
    , Border.rounded 4
    , alignTop
    ]


{-| -}
example1 : Bool -> ( Element Msg, String )
example1 model =
    let
        commonAttr =
            [ height fill
            , width fill
            , pointer
            , Events.onClick Flip
            ]

        contentAttr =
            [ width shrink
            , height shrink
            , centerX
            , centerY
            , spacing 50
            ]
    in
    ( flipping
        { width = 200
        , height = 300
        , activeFront = model
        , front =
            el commonAttr <|
                column contentAttr
                    [ el [ centerX ] <| text "Click Me"
                    , el [ centerX ] <| text "Front"
                    ]
        , back =
            el (commonAttr ++ [ Background.color Color.yellow ]) <|
                column contentAttr
                    [ el [ centerX ] <| text "Click Me"
                    , el [ centerX ] <| text "Back"
                    ]
        }
    , """
flipping
    { width = 200
    , height = 300
    , activeFront = model.flip
    , front =
        el commonAttr <|
            column contentAttr
                [ el [ centerX ] <| text "Click Me"
                , el [ centerX ] <| text "Front"
                ]
    , back =
        el (commonAttr ++ [ Background.color Color.yellow ]) <|
            column contentAttr
                [ el [ centerX ] <| text "Click Me"
                , el [ centerX ] <| text "Back"
                ]
    }"""
    )


{-| -}
normal :
    { conf
        | colorBackground : Color.Color
        , colorFont : Color.Color
        , colorFontSecondary : Color.Color
        , colorBorder : Color.Color
        , colorBorderSecondary : Color.Color
        , colorShadow : Color.Color
        , extraAttributes : List (Element.Attr () msg)
        , title : String
        , subTitle : String
        , content : Element msg
    }
    -> Element msg
normal { colorBackground, colorFont, colorFontSecondary, colorBorder, colorBorderSecondary, colorShadow, extraAttributes, title, subTitle, content } =
    column
        (cardCommonAttr
            ++ [ Border.width 1
               , width fill
               , height shrink
               , Background.color colorBackground
               , Font.color colorFont
               , Border.color colorBorder
               , Border.shadow { blur = 10, color = colorShadow, offset = ( 0, 2 ), size = 1 }
               ]
            ++ extraAttributes
        )
        [ el
            [ padding 10
            , Border.widthEach { bottom = 1, left = 0, right = 0, top = 0 }
            , Border.color <| colorBorderSecondary
            , width fill
            ]
            (row [ spacing 10 ]
                [ el [ Font.bold ] <| text title
                , el [ Font.color <| colorFontSecondary ] <| text subTitle
                ]
            )
        , el [ padding 20, width fill ] content
        ]


{-| -}
simpleWithTitle : String -> String -> Element msg -> Element msg
simpleWithTitle title subTitle content =
    normal
        { title = title
        , subTitle = subTitle
        , content = content
        , colorBackground = Framework.Color.white
        , colorFont = Framework.Color.grey
        , colorFontSecondary = Framework.Color.grey_light
        , colorBorder = Framework.Color.grey_light
        , colorBorderSecondary = Framework.Color.grey_light
        , colorShadow = Color.rgba 0 0 0 0.05
        , extraAttributes = []
        }


{-| -}
simple : Element msg -> Element msg
simple content =
    el
        (cardCommonAttr
            ++ [ padding 20
               , width fill
               , height shrink
               , Border.shadow { blur = 10, color = Color.rgba 0 0 0 0.05, offset = ( 0, 2 ), size = 1 }
               ]
        )
    <|
        content


{-| -}
flipping :
    { a
        | activeFront : Bool
        , back : Element msg
        , front : Element msg
        , height : Int
        , width : Int
    }
    -> Element msg
flipping data =
    let
        x =
            px data.width

        y =
            px data.height

        commonAttr =
            cardCommonAttr
                ++ [ width x
                   , height y

                   -- Chrome has a bug during flipping from back to Front
                   -- maybe this could be used as hint? https://stackoverflow.com/questions/34062061/css-flip-card-bug-in-chrome
                   , style "backface-visibility" "hidden"
                   , style "position" "absolute"
                   , Border.shadow { blur = 10, color = Color.rgba 0 0 0 0.05, offset = ( 0, 2 ), size = 1 }
                   ]
    in
    column
        [ -- width 500 -> 2000px
          style "perspective" "1500px"
        , alignTop
        ]
        [ html <| Html.node "style" [] [ Html.text "alignbottom, alignright {pointer-events:none}" ]
        , row
            [ width <| x
            , height <| y
            , style "transition" "all 0.7s cubic-bezier(0.365, 1.440, 0.430, 0.965)"
            , style "transform-style" "preserve-3d"
            , if data.activeFront then
                style "transform" "rotateY(0deg)"
              else
                style "transform" "rotateY(180deg)"
            ]
            [ -- The  "alignbottom {pointer-events:none}" is needed otherwise the right half
              -- is covered by alignbottom
              el
                (commonAttr
                    ++ [ style "transform" "rotateY(0deg)"
                       , style "z-index" "2"
                       ]
                )
              <|
                data.front
            , el
                (commonAttr
                    ++ [ style "transform" "rotateY(180deg)"
                       ]
                )
              <|
                data.back
            ]
        ]


{-| -}
style : String -> String -> Attribute msg
style key value =
    if
        key
            == "backface-visibility"
            || key
            == "perspective"
            || key
            == "transition"
            || key
            == "transform-style"
            || key
            == "transform"
    then
        htmlAttribute <|
            Html.Attributes.style
                [ ( "-webkit-" ++ key, value )
                , ( "-moz-" ++ key, value )
                , ( "-ms-" ++ key, value )
                , ( "-o-" ++ key, value )
                , ( key, value )
                ]
    else
        htmlAttribute <| Html.Attributes.style [ ( key, value ) ]
