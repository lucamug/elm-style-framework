module Widgets.WidgetExample exposing
    ( Model
    , Msg(..)
    , initModel
    , main
    , subscriptions
    , update
    , viewElement
    )

import Browser
import Browser.Events
import Color
import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Framework.Button as Button
import Framework.Card as Card
import Framework.Color
import Framework.FormField as FormField
import Framework.FormFieldWithPattern as FormFieldWithPattern
import Framework.Modifier as Modifier
import FrameworkCustomized.Logo as Logo
import Html
import Port
import Regex
import Route
import Url


type alias Model =
    { -- COMMON STUFF
      url : Url.Url
    , windowSize : Maybe { height : Int, width : Int }

    -- OTHER STUFF
    , email : String
    , modelFormField : FormField.Model
    , modelFormFieldWithPattern : FormFieldWithPattern.Model
    , focusedField : Maybe Field
    }


type Flow
    = FlowEmail
    | FlowPhone


type alias Flag =
    { height : Int
    , width : Int
    , locationHref : String
    }


initModel : Flag -> Model
initModel flag =
    { -- COMMON STUFF
      url = Route.fromStringToUrl flag.locationHref
    , windowSize = Just { width = flag.width, height = flag.height }

    -- OTHER STUFF
    , email = ""
    , modelFormField = FormField.initModel
    , modelFormFieldWithPattern = FormFieldWithPattern.initModel
    , focusedField = Nothing
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
            520

        ( widthCard, heightCard ) =
            case model.windowSize of
                Just windowSize ->
                    if windowSize.width < 550 then
                        ( windowSize.width - 50, sizeY )

                    else
                        ( sizeX, sizeY )

                Nothing ->
                    ( sizeX, sizeY )

        logoInsideTheFrame =
            el [] <| Logo.logo Logo.LogoMassiveDynamics 100

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

            --, Element.explain Debug.todo
            , onRight <| link [ moveLeft <| iconSize + genericPaddingX, moveDown genericPaddingY ] { label = text "✕", url = Route.toStringAndHash Route.RouteHome }
            ]
    in
    el
        [ centerX
        , centerY
        ]
    <|
        Card.flipping
            { width = widthCard
            , height = heightCard
            , activeFront = flow model.url /= FlowEmail
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
    case Route.fromUrl model.url of
        Route.RouteWidgetExample4DigitCodeStep1 ->
            [ paragraph [ width fill, Font.size 20 ] [ text "Example of 4 digit code" ]
            , el [ centerX, width <| Element.px 300, height <| Element.px 92, moveUp 15 ] <|
                Element.map MsgFormFieldWIdthPattern
                    (FormFieldWithPattern.inputText model.modelFormFieldWithPattern
                        { field = FormFieldWithPattern.Field6DigitCode
                        , id = ""
                        , pattern = "_ _ _ _"
                        , label = " "
                        }
                    )
            , if codeComplete model then
                Button.buttonLinkWidth
                    [ Modifier.Primary ]
                    (Route.toStringAndHash <| Route.RouteWidgetExample4DigitCodeStep2)
                    "Submit Code"
                    200

              else
                Button.buttonWidth
                    [ Modifier.Muted, Modifier.Disabled ]
                    Nothing
                    "Submit Code"
                    200
            , el [ centerX, alignBottom ] <| Button.buttonLink [] (Route.toStringAndHash <| Route.RouteWidgetExampleEmailStep1) "See an example of E-mail Input Field"
            ]

        Route.RouteWidgetExample4DigitCodeStep2 ->
            [ el [ paddingEach { bottom = 0, left = 0, right = 0, top = 48 }, centerX ] <| text "Thank you!"
            , Button.buttonLinkWidth [ Modifier.Primary ] (Route.toStringAndHash <| Route.RouteHome) "Done" 200
            ]

        _ ->
            []


viewBack : Model -> List (Element Msg)
viewBack model =
    -- CREATE ACCOUNT WITH EMAIL
    case Route.fromUrl model.url of
        Route.RouteWidgetExampleEmailStep1 ->
            [ paragraph [ width fill, Font.size 20 ] [ text <| "Example of E-mail input field" ]
            , paragraph [ width fill ] [ text <| "This is an example of E-mail input field" ]
            , FormField.inputText [ width fill ]
                { field = Email
                , fieldValue = model.email
                , helperText = Nothing
                , inputType = Input.text
                , inputTypeAttrs = []
                , label = text "E-mail address"
                , maybeFieldFocused = model.focusedField
                , maybeMsgOnEnter = Nothing
                , msgOnChange = MsgOnChange
                , msgOnFocus = MsgOnFocus
                , msgOnLoseFocus = MsgOnLoseFocus
                }
            , el [ width fill ] <| Button.buttonLinkWidth [ Modifier.Primary ] (Route.toStringAndHash <| Route.RouteWidgetExampleEmailStep2) "Submit Email" 300
            , el [ centerX ] <| Button.buttonLink [] (Route.toStringAndHash <| Route.RouteWidgetExample4DigitCodeStep1) "See an example of 4 digit code"
            ]

        Route.RouteWidgetExampleEmailStep2 ->
            [ el [ paddingEach { bottom = 0, left = 0, right = 0, top = 48 }, centerX ] <| text "Thank you!"
            , Button.buttonLinkWidth [ Modifier.Primary ] (Route.toStringAndHash <| Route.RouteHome) "Done" 200
            ]

        _ ->
            []


validateEmail : Regex.Regex
validateEmail =
    Maybe.withDefault Regex.never <| Regex.fromString "@"


view : Model -> Html.Html Msg
view model =
    layoutWith
        { options =
            [ focusStyle
                { borderColor = Just <| Element.rgb 0x99 0x00 0x00
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
        , Font.color <| Element.rgb 0.3 0.3 0.3
        , Background.color <| Element.rgb 0 0 0
        ]
    <|
        viewElement model


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onResize MsgChangeWindowSize
        , Port.onPopState MsgOnPopState
        ]


type Msg
    = MsgFormField FormField.Msg
    | MsgFormFieldWIdthPattern FormFieldWithPattern.Msg
    | MsgOnPopState String
      -- SUBSCRIPTIONS
    | MsgChangeWindowSize Int Int
    | MsgOnChange Field String
    | MsgOnFocus Field
    | MsgOnLoseFocus Field


type Field
    = Email


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MsgChangeWindowSize x y ->
            ( { model | windowSize = Just { width = x, height = y } }, Cmd.none )

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

        MsgOnPopState locationHref ->
            ( { model | url = Route.fromStringToUrl locationHref }, Cmd.none )

        MsgOnChange field text ->
            ( { model | email = text }, Cmd.none )

        MsgOnFocus field ->
            ( { model | focusedField = Just field }, Cmd.none )

        MsgOnLoseFocus _ ->
            ( { model | focusedField = Nothing }, Cmd.none )


flow : Url.Url -> Flow
flow url =
    case Route.fromUrl url of
        Route.RouteWidgetExampleEmailStep1 ->
            FlowEmail

        Route.RouteWidgetExampleEmailStep2 ->
            FlowEmail

        _ ->
            FlowPhone


init : Flag -> ( Model, Cmd Msg )
init flag =
    ( initModel flag, initCmd flag )


initCmd : Flag -> Cmd Msg
initCmd _ =
    Cmd.none


main : Program Flag Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
