module Framework exposing (Model, Msg, init, main, update, view)

{-| This is an incomplete Style Framework that leverage the [experimental version of style-elements](http://package.elm-lang.org/packages/mdgriffith/stylish-elephants/4.0.0). Major changes may happen at any time to this Repo.

The package is self documented. To generate the documentation it uses elm-styleguide-generator. You can find the self generated documentation at [<https://lucamug.github.io/elm-style-framework/>)](https://lucamug.github.io/elm-style-framework/).d


# Types

@docs Model, Msg, init, main, update, view

-}

import Color
import Element exposing (..)
import Element.Area as Area
import Element.Font as Font
import Framework.Button
import Framework.Color
import Framework.Spinner
import Html
import Styleguide


{-| This is the main list of modifier that can be used with all elements
-}
type Modifier
    = Primary
    | Link
    | Info
    | Success
    | Warning
    | Danger
    | Small
    | Medium
    | Large
    | Outlined
    | Loading
    | Waiting
    | Disabled



-- INTERNAL


{-| -}
main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


{-| -}
type alias Model =
    { styleguide : Styleguide.Model
    }


{-| -}
type Msg
    = StyleguideMsg Styleguide.Msg


{-| -}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        StyleguideMsg msg ->
            let
                ( newModel, newCmd ) =
                    Styleguide.update msg model.styleguide
            in
            ( { model | styleguide = newModel }, Cmd.none )


{-| -}
init : ( Model, Cmd Msg )
init =
    ( { styleguide =
            [ ( Framework.Button.introspection, True )
            , ( Framework.Spinner.introspection, True )
            , ( Framework.Color.introspection, True )
            ]
      }
    , Cmd.none
    )


{-| -}
view : Model -> Html.Html Msg
view model =
    layout layoutAttributes <|
        column []
            [ introduction
            , Element.map StyleguideMsg (Styleguide.viewPage model.styleguide)
            ]


introduction : Element msg
introduction =
    el [ paddingXY 0 0, alignLeft ] <|
        paragraph []
            [ text "This is a "
            , link [ Font.color Color.orange ]
                { url = "https://medium.com/@l.mugnaini/zero-maintenance-always-up-to-date-living-style-guide-in-elm-dbf236d07522"
                , label = text "Living Style Guide"
                }
            , text " of "
            , link [ Font.color Color.orange ]
                { url = "https://github.com/lucamug/elm-style-framework"
                , label = text "elm-style-framework"
                }
            , text " (built on top of "
            , link [ Font.color Color.orange ]
                { url = "http://package.elm-lang.org/packages/mdgriffith/stylish-elephants/4.0.0/Element"
                , label = text "style-elements v.4.alpha"
                }
            , text ") automatically generated from Elm code using "
            , link [ Font.color Color.orange ]
                { url = "https://github.com/lucamug/elm-styleguide-generator"
                , label = text "elm-styleguide-generator"
                }
            , text "."
            ]


layoutAttributes : List (Attribute msg)
layoutAttributes =
    [ Font.family
        [ Font.external
            { name = "Source Sans Pro"
            , url = "https://fonts.googleapis.com/css?family=Source+Sans+Pro"
            }
        , Font.sansSerif
        ]
    , Font.size 16
    , Font.color <| Color.rgb 0x33 0x33 0x33
    , padding 20
    ]


h1 : List (Element.Attribute msg)
h1 =
    [ Area.heading 1
    , Font.size 28
    , Font.weight 700
    , paddingEach { bottom = 40, left = 0, right = 0, top = 20 }
    ]
