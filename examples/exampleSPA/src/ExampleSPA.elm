module ExampleSPA exposing (main)

import Color
import Element exposing (Attribute, Element, alpha, centerX, centerY, column, el, fill, fillPortion, focusStyle, height, htmlAttribute, layoutWith, map, none, padding, paragraph, px, row, scrollbarX, shrink, spacing, text, width)
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
import Navigation
import Route
import Widgets.WidgetExample as WidgetExample
import Window


version : String
version =
    "0.0.10"


type Msg
    = MsgWidgetExample WidgetExample.Msg
    | MsgFramework Framework.Msg
    | MsgChangeLocation Navigation.Location
    | MsgClick MouseClickData
    | MsgChangePassword String
      -- SUBSCRIPTIONS
    | MsgChangeWindowSize { width : Int, height : Int }


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
    }



-- port portFromJavascriptToElm : (Json.Decode.Value -> msg) -> Sub msg
-- port portFromElmToJavascript : PortMessage.PortMessage -> Cmd msg


changeLocation : Model -> Navigation.Location -> ( Model, Cmd Msg )
changeLocation model location =
    let
        ( modelFramework, cmdFramework ) =
            Framework.update (Framework.MsgChangeLocation location) model.modelFramework

        ( modelWidgetExample, cmdWidgetExample ) =
            WidgetExample.update (WidgetExample.MsgChangeLocation location) model.modelWidgetExample
    in
    ( { model
        | location = location
        , modelFramework = modelFramework
        , modelWidgetExample = modelWidgetExample
      }
    , Cmd.batch
        [ Cmd.map MsgFramework cmdFramework
        , Cmd.map MsgWidgetExample cmdWidgetExample
        ]
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    --case msg |> Debug.log "msg" of
    case msg of
        MsgChangeWindowSize windowSize ->
            ( { model | windowSize = Just windowSize }, Cmd.none )

        MsgChangeLocation location ->
            changeLocation model location

        MsgChangePassword password ->
            ( { model | password = password }, Cmd.none )

        MsgClick data ->
            if data.id1 == "SPA-backdrop" || data.id2 == "SPA-backdrop" then
                -- Here I should check if the page is already in RouteHome, in
                -- that case I should not newUrl again
                ( model, Navigation.newUrl <| Route.routeToString Route.RouteHome )
            else
                ( model, Cmd.none )

        MsgWidgetExample msgWidgetExample ->
            let
                ( modelWidgetExample, cmd ) =
                    WidgetExample.update msgWidgetExample model.modelWidgetExample
            in
            ( { model | modelWidgetExample = modelWidgetExample }, Cmd.map MsgWidgetExample cmd )

        MsgFramework msgFramework ->
            let
                ( modelFramework, cmd ) =
                    Framework.update msgFramework model.modelFramework
            in
            ( { model | modelFramework = modelFramework }, Cmd.map MsgFramework cmd )


init : Flag -> Navigation.Location -> ( Model, Cmd Msg )
init flag location =
    ( initModel flag location
    , initCmd flag location
    )


type alias Model =
    { -- COMMON STUFF
      location : Navigation.Location
    , password : String
    , windowSize : Maybe Window.Size

    -- WIDGETS
    , modelWidgetExample : WidgetExample.Model
    , modelFramework : Framework.Model
    }


initModel : Flag -> Navigation.Location -> Model
initModel flag location =
    { -- COMMON STUFF
      location = location
    , password = ""
    , windowSize = Just { width = flag.width, height = flag.height }

    -- WIDGETS
    , modelWidgetExample = WidgetExample.initModel flag location
    , modelFramework = Framework.initModel { width = flag.width, height = flag.height } location
    }


initCmd : Flag -> Navigation.Location -> Cmd Msg
initCmd _ _ =
    Cmd.none


viewFramework : Model -> Html.Html Msg
viewFramework model =
    let
        modelFramework =
            model.modelFramework
    in
    Html.map MsgFramework (FrameworkCustomized.view { modelFramework | conf = FrameworkCustomized.initConf })


view : Model -> Html.Html Msg
view model =
    case Route.maybeRoute model.location of
        Just routeRoute ->
            case routeRoute of
                Route.RouteFramework ->
                    viewFramework model

                Route.RouteFramework2 _ _ ->
                    viewFramework model

                _ ->
                    view2 model

        Nothing ->
            view2 model


view2 : Model -> Html.Html Msg
view2 model =
    viewStylish model


centralColumnWithMaxWidth : List (Attribute Msg) -> Int -> Element Msg -> Element Msg
centralColumnWithMaxWidth attributes maxWidth content =
    row
        attributes
        [ el [ width fill ] <| none
        , el
            [ Border.width 0
            , width <| fillPortion 100000000
            , hackStyle "max-width" (toString maxWidth ++ "px")
            ]
          <|
            content
        , el [ width fill ] <| none
        ]


viewHeader : Model -> Element Msg
viewHeader model =
    centralColumnWithMaxWidth
        [ Background.color <| Framework.Color.white
        , Border.shadow { offset = ( 0, 0 ), blur = 10, size = 2, color = Color.rgba 0 0 0 0.05 }
        , hackStyle "z-index" "1"
        , padding 12
        ]
        1400
        (el [ Element.alignLeft ] <| Element.link [] { label = Logo.logo Logo.LogoMassiveDynamics 36, url = Route.routeToString <| Route.RouteHome })


hackStyle : String -> String -> Attribute Msg
hackStyle name value =
    htmlAttribute (Html.Attributes.style [ ( name, value ) ])


viewStylish : Model -> Html.Html Msg
viewStylish model =
    layoutWith
        { options =
            [ focusStyle
                { borderColor = Just <| Framework.Color.primary
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
        , Font.color <| Color.rgb 0x33 0x33 0x33
        , Background.color Color.white
        ]
    <|
        viewElement model


viewElement : Model -> Element Msg
viewElement model =
    let
        header =
            viewHeader model
    in
    column
        --[ Events.onClick MsgClick ]
        []
        [ header
        , viewBody model
        , row
            [ hackStyle "position" "fixed"
            , hackStyle "top" "0"
            , hackStyle "right" "0"
            , hackStyle "z-index" "2"
            , alpha 0.5
            , spacing 10
            , padding 20
            , Font.alignRight
            ]
          <|
            widgetMenu model
        ]


widgetMenu : Model -> List (Element Msg)
widgetMenu model =
    [ Button.buttonLink [ Modifier.Small ] (Route.routeToString <| Route.RouteWidgetExampleEmailStep1) "Example E-mail Field"
    , Button.buttonLink [ Modifier.Small ] (Route.routeToString <| Route.RouteWidgetExample4DigitCodeStep1) "Example 4 digit code"
    , Button.buttonLink [ Modifier.Small ] (Route.routeToString <| Route.RouteFramework) "Framework"
    ]


viewBody : Model -> Element Msg
viewBody model =
    let
        background =
            case Route.maybeRoute model.location of
                Nothing ->
                    Background.image "images/bg01.jpg"

                Just route ->
                    case route of
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
        , Border.color <| Framework.Color.primary
        ]
    <|
        case Route.maybeRoute model.location of
            Just routeRoute ->
                case routeRoute of
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

            Nothing ->
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
    column
        [ Background.color <| Framework.Color.white
        , padding 20
        , width shrink
        , height shrink
        , centerX
        , centerY
        , alpha 0.8
        , spacing 30
        , Border.rounded 10
        , scrollbarX
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
            , Border.shadow { offset = ( 0, 5 ), blur = 15, size = 3, color = Color.rgba 0 0 0 0.05 }
            , redLineAtTheFrameTop
            , Border.color <| Framework.Color.primary
            , Background.color <| Framework.Color.white
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
        , Window.resizes MsgChangeWindowSize
        ]


main : Program Flag Model Msg
main =
    Navigation.programWithFlags MsgChangeLocation
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
