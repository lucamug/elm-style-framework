module Framework.Cards exposing (..)

import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Framework.Color exposing (Color(..), color)


{-| -}
introspection =
    { name = "Cards"
    , signature = "simpleWithTitle : String -> String -> Element msg -> Element msg"
    , description = "Wrapper for content"
    , usage = """simpleWithTitle "Simple" "with Title" (text "Content")"""
    , usageResult = simpleWithTitle "Simple" "with Title" (text "Content")
    , boxed = False
    , variations =
        [ ( "Variations"
          , [ ( simpleWithTitle "Simple" "with Title" <| text "Content", """simpleWithTitle "Simple" "with Title" <|
    text "Content\"""" )
            , ( simple <| text "Content", """simple <|
    text "Content\"""" )
            ]
          )
        ]
    }


simpleWithTitle : String -> String -> Element msg -> Element msg
simpleWithTitle title subTitle content =
    column
        [ Border.width 1
        , Border.color <| color GrayLighter
        , Border.rounded 4
        , Border.shadow { offset = ( 0, 4 ), blur = 10, size = 2, color = color GrayLighter }
        , width fill
        , height shrink
        , Background.color <| color White
        ]
        [ el
            [ padding 10
            , Border.widthEach { bottom = 1, left = 0, right = 0, top = 0 }
            , Border.color <| color GrayLight
            , width fill
            ]
            (paragraph [ spacing 10 ]
                [ el [ Font.bold ] <| text title
                , el [ Font.color <| color GrayMedium ] <| text subTitle
                ]
            )
        , el [ padding 20, width fill ] content
        ]


simple : Element msg -> Element msg
simple content =
    el
        [ padding 20
        , Border.width 1
        , Border.color <| color GrayLighter
        , Border.rounded 4
        , Border.shadow { offset = ( 0, 4 ), blur = 10, size = 2, color = color GrayLighter }
        , width fill
        , height shrink
        , Background.color <| color White
        ]
    <|
        content
