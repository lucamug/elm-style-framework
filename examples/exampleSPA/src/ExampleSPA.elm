module ExampleSPA exposing (main)

import Browser
import Browser.Events
import Color
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Framework
import Framework.Button as Button
import Framework.Color
import Framework.Configuration exposing (conf)
import Framework.Modifier as Modifier
import FrameworkCustomized
import FrameworkCustomized.Logo as Logo
import Html
import Html.Attributes
import Html.Events
import Json.Decode
import Port
import Route
import Url
import Widgets.WidgetExample as WidgetExample


version : String
version =
    "0.19.0"


type Msg
    = MsgWidgetExample WidgetExample.Msg
    | MsgOnPopState String
    | MsgClick MouseClickData
    | MsgChangePassword String
      -- SUBSCRIPTIONS
    | MsgChangeWindowSize Int Int


type alias MouseClickData =
    { --offsetX : Int
      --, offsetY : Int
      --, offsetHeight : Float
      --, offsetWidth : Float
      id1 : String
    , id2 : String
    , id3 : String
    , id4 : String
    , id5 : String
    }


type alias Flag =
    { width : Int
    , height : Int
    , locationHref : String
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MsgChangeWindowSize x y ->
            ( { model | windowSize = Just { width = x, height = y } }, Cmd.none )

        MsgOnPopState locationHref ->
            ( { model | url = Route.fromStringToUrl locationHref }, Cmd.none )

        MsgChangePassword password ->
            ( { model | password = password }, Cmd.none )

        MsgClick data ->
            if data.id1 == "SPA-backdrop" || data.id2 == "SPA-backdrop" then
                -- Here I should check if the page is already in RouteHome, in
                -- that case I should not newUrl again
                -- TODO
                -- ( model, Navigation.newUrl <| Route.toStringAndHash Route.RouteHome )
                ( model, Cmd.none )

            else
                ( model, Cmd.none )

        MsgWidgetExample msgWidgetExample ->
            let
                ( modelWidgetExample, cmd ) =
                    WidgetExample.update msgWidgetExample model.modelWidgetExample
            in
            ( { model | modelWidgetExample = modelWidgetExample }, Cmd.map MsgWidgetExample cmd )


init : Flag -> ( Model, Cmd Msg )
init flag =
    ( initModel flag
    , initCmd flag
    )


type alias Model =
    { -- COMMON STUFF
      url : Url.Url
    , password : String
    , windowSize : Maybe { height : Int, width : Int }

    -- WIDGETS
    , modelWidgetExample : WidgetExample.Model
    }


initModel : Flag -> Model
initModel flag =
    { -- COMMON STUFF
      url = Route.fromStringToUrl flag.locationHref
    , password = ""
    , windowSize = Just { width = flag.width, height = flag.height }

    -- WIDGETS
    , modelWidgetExample = WidgetExample.initModel flag
    }


initCmd : Flag -> Cmd Msg
initCmd _ =
    Cmd.none


view : Model -> Html.Html Msg
view model =
    viewStylish model


centralColumnWithMaxWidth : List (Attribute Msg) -> Int -> Element Msg -> Element Msg
centralColumnWithMaxWidth attributes maxWidth content =
    el
        ([ width
            (fill
                |> maximum maxWidth
            )
         , centerX

         --, Element.explain Debug.todo
         ]
            ++ attributes
        )
    <|
        content


viewHeader : Model -> Element Msg
viewHeader model =
    centralColumnWithMaxWidth
        [ Background.color <| Color.toElementColor Framework.Color.white
        , Border.shadow { offset = ( 0, 0 ), blur = 10, size = 2, color = Element.rgba 0 0 0 0.05 }

        --, hackStyle "z-index" "1"
        , padding 12

        --, width fill
        ]
        900
        (row
            [ spacing 10
            , width fill
            ]
            [ el [ Element.alignLeft ] <|
                Element.link [] { label = Logo.logo Logo.LogoMassiveDynamics 36, url = Route.toStringAndHash <| Route.RouteHome }
            , viewHeaderMenu model
            ]
        )


hackStyle : String -> String -> Attribute Msg
hackStyle name value =
    htmlAttribute (Html.Attributes.style name value)


viewStylish : Model -> Html.Html Msg
viewStylish model =
    layoutWith
        { options =
            [ focusStyle
                { borderColor = Just <| Color.toElementColor Framework.Color.primary
                , backgroundColor = Nothing
                , shadow = Nothing
                }
            ]
        }
        [ Font.family
            [ Font.external
                { name = conf.font.typeface
                , url = conf.font.url
                }
            , Font.typeface conf.font.typeface
            , conf.font.typefaceFallback
            ]
        , Font.size 16
        , Font.color <| Element.rgb 0.3 0.3 0.3
        , Background.color <| Element.rgb 0xFF 0xFF 0xFF
        ]
    <|
        viewElement model


viewElement : Model -> Element Msg
viewElement model =
    let
        menuType =
            case model.windowSize of
                Just windowSize ->
                    if windowSize.width < 550 then
                        column

                    else
                        row

                Nothing ->
                    row

        menuAttributes =
            case model.windowSize of
                Just windowSize ->
                    if windowSize.width < 550 then
                        [ alpha 1
                        , spacing 2
                        , padding 6
                        , width <| px 200
                        ]

                    else
                        [ alpha 0.7
                        , spacing 10
                        , padding 16
                        ]

                Nothing ->
                    [ alpha 0.5
                    , spacing 10
                    , padding 16
                    ]
    in
    column
        [ width fill
        , height fill

        --, Element.explain Debug.todo
        ]
        [ viewHeader model
        , viewBody model
        ]


viewHeaderMenu : Model -> Element Msg
viewHeaderMenu model =
    row [ alignRight, spacing 10 ]
        [ Button.buttonLink [ Modifier.Small ] (Route.toStringAndHash <| Route.RouteWidgetExampleEmailStep1) "Example E-mail Field"
        , Button.buttonLink [ Modifier.Small ] (Route.toStringAndHash <| Route.RouteWidgetExample4DigitCodeStep1) "Example 4 digit code"
        ]


viewBody : Model -> Element Msg
viewBody model =
    let
        background =
            case Route.fromUrl model.url of
                Route.RouteWidgetExampleEmailStep1 ->
                    Background.image "images/bg01.jpg"

                Route.RouteWidgetExampleEmailStep2 ->
                    Background.image "images/bg01.jpg"

                Route.RouteWidgetExample4DigitCodeStep1 ->
                    Background.image "images/bg04.jpg"

                Route.RouteWidgetExample4DigitCodeStep2 ->
                    Background.image "images/bg04.jpg"

                _ ->
                    Background.image "images/bg02.jpg"
    in
    el
        [ width fill
        , height fill
        , padding 20
        , background
        , htmlAttribute <| Html.Attributes.id "SPA-backdrop"
        , htmlAttribute <| Html.Events.on "click" (Json.Decode.map MsgClick decoder)
        , Border.color <| Color.toElementColor Framework.Color.primary
        ]
    <|
        case Route.fromUrl model.url of
            Route.RouteWidgetExampleEmailStep1 ->
                viewExample model

            Route.RouteWidgetExampleEmailStep2 ->
                viewExample model

            Route.RouteWidgetExample4DigitCodeStep1 ->
                viewExample model

            Route.RouteWidgetExample4DigitCodeStep2 ->
                viewExample model

            _ ->
                viewSelectWidget


viewExample : Model -> Element Msg
viewExample model =
    map MsgWidgetExample (WidgetExample.viewElement model.modelWidgetExample)


decoder : Json.Decode.Decoder MouseClickData
decoder =
    Json.Decode.map5 MouseClickData
        --(Json.Decode.at [ "offsetX" ] Json.Decode.int)
        --(Json.Decode.at [ "offsetY" ] Json.Decode.int)
        --(Json.Decode.at [ "target", "offsetHeight" ] Json.Decode.float)
        --(Json.Decode.at [ "target", "offsetWidth" ] Json.Decode.float)
        (Json.Decode.at [ "target", "id" ] Json.Decode.string)
        (Json.Decode.at [ "target", "parentElement", "id" ] Json.Decode.string)
        (Json.Decode.at [ "target", "parentElement", "parentElement", "id" ] Json.Decode.string)
        (Json.Decode.at [ "target", "parentElement", "parentElement", "parentElement", "id" ] Json.Decode.string)
        (Json.Decode.at [ "target", "parentElement", "parentElement", "parentElement", "parentElement", "id" ] Json.Decode.string)


viewSelectWidget : Element Msg
viewSelectWidget =
    Element.paragraph
        [ Background.color <| Color.toElementColor Framework.Color.white
        , padding 20
        , centerX
        , centerY
        , width shrink
        , alpha 0.8
        , spacing 15
        , Border.rounded 10
        , Font.center
        ]
    <|
        [ text "Welcome to the Single Page Application example built with elm-style-element" ]


viewFrame : Model -> Element Msg -> Element Msg
viewFrame model content =
    let
        logoInsideTheFrame =
            Logo.logo Logo.LogoMassiveDynamics 24

        redLineAtTheFrameTop =
            Border.width 0
    in
    centralColumnWithMaxWidth [ height fill ] 500 <|
        el
            [ Border.rounded 4
            , Border.shadow { offset = ( 0, 5 ), blur = 15, size = 3, color = Element.rgba 0 0 0 0.05 }
            , redLineAtTheFrameTop
            , Border.color <| Color.toElementColor Framework.Color.primary
            , Background.color <| Color.toElementColor Framework.Color.white
            , hackStyle "max-width" "500px"
            , height <| px 400
            , width fill
            , padding 24
            ]
        <|
            column
                [ spacing 30
                ]
                [ el [] logoInsideTheFrame
                , content
                ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Sub.map MsgWidgetExample (WidgetExample.subscriptions model.modelWidgetExample)
        , Browser.Events.onResize MsgChangeWindowSize
        , Port.onPopState MsgOnPopState
        ]


main : Program Flag Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
