module Widgets.WidgetExample exposing (Model, Msg(..), initModel, main, subscriptions, update, viewElement)

import Color
import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Framework.Button as Button
import Framework.Card as Card
import Framework.Color
import Framework.FormField as FormField
import Framework.FormFieldWithPattern as FormFieldWithPattern
import Framework.Modifier as Modifier
import FrameworkCustomized.Logo as Logo
import Html
import Navigation
import Regex
import Route
import Window


type alias Model =
    { -- COMMON STUFF
      location : Navigation.Location
    , windowSize : Maybe Window.Size

    -- OTHER STUFF
    , modelFormField : FormField.Model
    , modelFormFieldWithPattern : FormFieldWithPattern.Model
    }


type Flow
    = FlowEmail
    | FlowPhone


initModel :
    { c | height : a, width : b }
    -> d
    ->
        { location : d
        , modelFormField : FormField.Model
        , modelFormFieldWithPattern : FormFieldWithPattern.Model
        , windowSize : Maybe { height : a, width : b }
        }
initModel flag location =
    { -- COMMON STUFF
      location = location
    , windowSize = Just { width = flag.width, height = flag.height }

    -- OTHER STUFF
    , modelFormField = FormField.initModel
    , modelFormFieldWithPattern = FormFieldWithPattern.initModel
    }


globalSpacing : Int
globalSpacing =
    30


viewElement : Model -> Element Msg
viewElement model =
    let
        sizeX =
            500

        sizeY =
            500

        ( widthCard, heightCard ) =
            case model.windowSize of
                Just windowSize ->
                    if windowSize.width < 500 then
                        ( 200, sizeY )
                    else if windowSize.width < 400 then
                        ( 200, sizeY )
                    else
                        ( sizeX, sizeY )

                Nothing ->
                    ( sizeX, sizeY )

        logoInsideTheFrame =
            el [] <| Logo.logo Logo.LogoMassiveDynamics 100

        redLineAtTheFrameTop =
            []

        commonAttr =
            let
                iconSize =
                    24

                genericPaddingX =
                    24

                genericPaddingY =
                    30
            in
            [ height fill
            , width fill
            , paddingXY genericPaddingX genericPaddingY
            , spacing globalSpacing
            , onRight <| link [ moveLeft <| iconSize + genericPaddingX, moveDown genericPaddingY ] { label = text "✕", url = Route.routeToString Route.RouteHome }
            ]
                ++ redLineAtTheFrameTop
    in
    el [ centerX, centerY ] <|
        Card.flipping
            { width = widthCard
            , height = heightCard
            , activeFront = flow model.location /= FlowEmail
            , front =
                column commonAttr
                    (logoInsideTheFrame
                        :: viewFront model
                    )
            , back =
                column commonAttr
                    (logoInsideTheFrame
                        :: viewBack model
                    )
            }


iconColor : Color.Color
iconColor =
    Framework.Color.grey


codeComplete : Model -> Bool
codeComplete model =
    String.length model.modelFormFieldWithPattern.value == 7


viewFront : Model -> List (Element Msg)
viewFront model =
    case defaultRouteFromLocation model.location of
        Route.RouteWidgetExample4DigitCodeStep1 ->
            [ paragraph [ Font.size 20 ] [ text "Example of 4 digit code" ]
            , el [ centerX, width <| Element.px 230, height <| Element.px 92, moveUp 15 ] <|
                Element.map MsgFormFieldWIdthPattern
                    (FormFieldWithPattern.inputText model.modelFormFieldWithPattern
                        { field = FormFieldWithPattern.Field4DigitCode
                        , pattern = "_ _ _ _"
                        , label = " "
                        }
                    )
            , if codeComplete model then
                Button.buttonLinkWidth
                    [ Modifier.Primary ]
                    (Route.routeToString <| Route.RouteWidgetExample4DigitCodeStep2)
                    "Submit Code"
                    200
              else
                Button.buttonWidth
                    [ Modifier.Muted, Modifier.Disabled ]
                    Nothing
                    "Submit Code"
                    200
            , el [ centerX ] <| Button.buttonLink [] (Route.routeToString <| Route.RouteWidgetExampleEmailStep1) "See an example of E-mail Input Field"
            ]

        Route.RouteWidgetExample4DigitCodeStep2 ->
            [ el [ paddingEach { bottom = 0, left = 0, right = 0, top = 48 }, centerX ] <| text "Thank you!"
            , Button.buttonLinkWidth [ Modifier.Primary ] (Route.routeToString <| Route.RouteHome) "Done" 200
            ]

        _ ->
            []


viewBack : Model -> List (Element Msg)
viewBack model =
    -- CREATE ACCOUNT WITH EMAIL
    case defaultRouteFromLocation model.location of
        Route.RouteWidgetExampleEmailStep1 ->
            [ paragraph [ Font.size 20 ] [ text <| "Example of E-mail input field" ]
            , paragraph [] [ text <| "This is an example of E-mail input field" ]
            , Element.map MsgFormField <|
                FormField.inputText model.modelFormField
                    { field = FormField.FieldEmail
                    , pattern = validateEmail
                    , label = "E-mail address"
                    }
            , el [ width fill ] <| Button.buttonLinkWidth [ Modifier.Primary ] (Route.routeToString <| Route.RouteWidgetExampleEmailStep2) "Submit Email" 300
            , el [ centerX ] <| Button.buttonLink [] (Route.routeToString <| Route.RouteWidgetExample4DigitCodeStep1) "See an example of 4 digit code"
            ]

        Route.RouteWidgetExampleEmailStep2 ->
            [ el [ paddingEach { bottom = 0, left = 0, right = 0, top = 48 }, centerX ] <| text "Thank you!"
            , Button.buttonLinkWidth [ Modifier.Primary ] (Route.routeToString <| Route.RouteHome) "Done" 200
            ]

        _ ->
            []


validateEmail : Regex.Regex
validateEmail =
    Regex.regex "@"


view : Model -> Html.Html Msg
view model =
    layoutWith
        { options =
            [ focusStyle
                { borderColor = Just <| Framework.Color.red
                , backgroundColor = Nothing
                , shadow = Nothing
                }
            ]
        }
        [ Font.family
            [ Font.external
                { name = "Noto Sans"
                , url = "https://fonts.googleapis.com/css?family=Noto+Sans"
                }
            , Font.typeface "Noto Sans"
            , Font.sansSerif
            ]
        , Font.size 16
        , Font.color <| Color.rgb 0x33 0x33 0x33
        , Background.color Color.white
        ]
    <|
        viewElement model


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Window.resizes MsgChangeWindowSize
        ]


type Msg
    = MsgChangeLocation Navigation.Location
    | MsgFormField FormField.Msg
    | MsgFormFieldWIdthPattern FormFieldWithPattern.Msg
      -- SUBSCRIPTIONS
    | MsgChangeWindowSize { width : Int, height : Int }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MsgChangeWindowSize windowSize ->
            ( { model | windowSize = Just windowSize }, Cmd.none )

        MsgFormField msg2 ->
            let
                ( newModel, _ ) =
                    FormField.update msg2 model.modelFormField
            in
            ( { model | modelFormField = newModel }, Cmd.none )

        MsgFormFieldWIdthPattern msg2 ->
            let
                ( newModel, _ ) =
                    FormFieldWithPattern.update msg2 model.modelFormFieldWithPattern
            in
            ( { model | modelFormFieldWithPattern = newModel }, Cmd.none )

        MsgChangeLocation location ->
            ( { model | location = location }, Cmd.none )


defaultRouteFromLocation : Navigation.Location -> Route.Route
defaultRouteFromLocation location =
    defaultRoute <| Route.maybeRoute location


defaultRoute : Maybe Route.Route -> Route.Route
defaultRoute maybeRoute =
    case maybeRoute of
        Nothing ->
            Route.RouteHome

        Just route ->
            route


flow : Navigation.Location -> Flow
flow location =
    (case defaultRouteFromLocation location of
        Route.RouteWidgetExampleEmailStep1 ->
            FlowEmail

        Route.RouteWidgetExampleEmailStep2 ->
            FlowEmail

        _ ->
            FlowPhone
    )
        |> Debug.log "xxx2"


type alias Flag =
    { width : Int
    , height : Int
    }


init : Flag -> Navigation.Location -> ( Model, Cmd Msg )
init flag location =
    ( initModel flag location, initCmd flag location )


initCmd : Flag -> Navigation.Location -> Cmd Msg
initCmd _ _ =
    Cmd.none


main : Program Flag Model Msg
main =
    Navigation.programWithFlags MsgChangeLocation
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
