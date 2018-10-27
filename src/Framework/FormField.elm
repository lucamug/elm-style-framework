module Framework.FormField exposing
    ( Field(..), Model, Msg(..), initModel, inputText, introspection, update
    , example5, example6, example7, example8, example9, inputPassword
    )

{-|


# Functions

@docs Field, Model, Msg, example1, initModel, inputText, introspection, update

-}

import Color
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Input
import Framework.Color exposing (black)
import Framework.Icon as Icon exposing (show)
import Html exposing (label)
import Html.Attributes
import Html.Events
import Json.Decode


{-| -}
type alias Model =
    { valueText : String
    , valueEmail : String
    , valueUsername : String
    , valueNewPassword : String
    , valueNewPasswordShow : Bool
    , valueCurrentPassword : String
    , valueCurrentPasswordShow : Bool

    --
    , focusedField : Maybe Field
    , enteredField : Maybe Field
    }


{-| -}
initModel : Model
initModel =
    { valueText = ""
    , valueEmail = ""
    , valueUsername = ""
    , valueNewPassword = ""
    , valueNewPasswordShow = False
    , valueCurrentPassword = ""
    , valueCurrentPasswordShow = False

    --
    , focusedField = Nothing
    , enteredField = Nothing
    }


{-| -}
type Field
    = FieldEmail
    | FieldText
    | FieldUsername
    | FieldNewPassword
    | FieldCurrentPassword


{-| -}
type Msg
    = OnChange Field String
    | OnFocus Field
    | OnLoseFocus Field
    | OnEnter Field
    | OnViewToggle Field


{-| -}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnViewToggle field ->
            ( case field of
                FieldNewPassword ->
                    { model | valueNewPasswordShow = not model.valueNewPasswordShow }

                FieldCurrentPassword ->
                    { model | valueCurrentPasswordShow = not model.valueCurrentPasswordShow }

                _ ->
                    model
            , Cmd.none
            )

        OnChange field value ->
            ( case field of
                FieldEmail ->
                    { model | valueEmail = value }

                FieldText ->
                    { model | valueText = value }

                FieldUsername ->
                    { model | valueUsername = value }

                FieldNewPassword ->
                    { model | valueNewPassword = value }

                FieldCurrentPassword ->
                    { model | valueCurrentPassword = value }
            , Cmd.none
            )

        OnFocus field ->
            ( { model | focusedField = Just field }, Cmd.none )

        OnLoseFocus _ ->
            ( { model | focusedField = Nothing }, Cmd.none )

        OnEnter field ->
            ( { model | enteredField = Just field }, Cmd.none )


newHelperText enteredField field value =
    let
        extraText =
            case enteredField of
                Just f ->
                    if f == field then
                        "You pressed Enter on this field"

                    else
                        "You pressed Enter on other fields"

                Nothing ->
                    "You didn't press Enter on any field yet"
    in
    if String.length value <= 0 then
        Just <|
            helperTextFormat
                ("Type at least 5 characters (" ++ extraText ++ ")")
                infoColor

    else if String.length value < 5 then
        Just <|
            helperTextFormat
                ("You typed only "
                    ++ (String.fromInt <| String.length value)
                    ++ " charecters"
                    ++ " ("
                    ++ extraText
                    ++ ")"
                )
                errorColor

    else
        Just <|
            helperTextFormat
                ("You typed only "
                    ++ (String.fromInt <| String.length value)
                    ++ " charecters"
                    ++ " ("
                    ++ extraText
                    ++ ")"
                )
                infoColor



-- Constants


helperTextFormat t color =
    row
        [ Font.color <| Color.toElementColor color
        , Font.size 12
        , spacing 4
        ]
        [ el [] <| Icon.exclamation color 12
        , text t
        ]


errorColor =
    Color.rgb 200 0 0


infoColor =
    Color.rgb 0 150 0


maybeShowHidePassword =
    Just
        { maybeHideIcon = Nothing
        , maybeShowIcon = Nothing
        , msgOnViewToggle = OnViewToggle
        }



-- Introspection


example5 : Model -> ( Element Msg, String )
example5 model =
    ( inputText
        [ spacing 20
        , inFront <| el [ alignRight, moveDown 36 ] <| Icon.pencil black 14
        ]
        { field = FieldText
        , label = row [ spacing 10 ] [ el [] <| Icon.pencil black 14, text "Text" ]
        , fieldValue = model.valueText
        , inputType = Input.text
        , inputTypeAttrs = []
        , maybeFieldFocused = model.focusedField
        , msgOnChange = OnChange
        , msgOnFocus = OnFocus
        , msgOnLoseFocus = OnLoseFocus
        , maybeMsgOnEnter = Just OnEnter
        , helperText = newHelperText model.enteredField FieldText model.valueText
        }
    , """
{- inputText type signature:

inputText :
    List (Attribute msg)
    ->
        { field : Field
        , fieldValue : String
        , helperText : Maybe (Element msg)
        , inputType :
            List (Attribute Msg)
            ->
                { label : Input.Label Msg
                , onChange : String -> Msg
                , placeholder : Maybe (Input.Placeholder msg)
                , text : String
                }
            -> Element msg
        , inputTypeAttrs : List (Attribute Msg)
        , label : Element Msg
        , maybeFieldFocused : Maybe Field
        , maybeMsgOnEnter : Maybe (Field -> Msg)
        , msgOnChange : Field -> String -> Msg
        , msgOnFocus : Field -> Msg
        , msgOnLoseFocus : Field -> Msg
        }
    -> Element msg
-}

inputText
    [ spacing 20
    , inFront <| el [ alignRight, moveDown 56 ] <| Icon.pencil black 14
    ]
    { field = FieldText
    , label = row [ spacing 10 ] [ el [] <| Icon.pencil black 14, text "Text" ]
    , fieldValue = model.valueText
    , inputType = Input.text
    , inputTypeAttrs = []
    , maybeFieldFocused = model.focusedField
    , msgOnChange = OnChange
    , msgOnFocus = OnFocus
    , msgOnLoseFocus = OnLoseFocus
    , maybeMsgOnEnter = Just OnEnter
    , helperText = newHelperText model.enteredField FieldText model.valueText
    }"""
    )


example6 : Model -> ( Element Msg, String )
example6 model =
    ( inputText
        [ spacing 20 ]
        { field = FieldEmail
        , label = text "Email"
        , fieldValue = model.valueEmail
        , inputType = Input.email
        , inputTypeAttrs = []
        , maybeFieldFocused = model.focusedField
        , msgOnChange = OnChange
        , msgOnFocus = OnFocus
        , msgOnLoseFocus = OnLoseFocus
        , maybeMsgOnEnter = Just OnEnter
        , helperText = newHelperText model.enteredField FieldEmail model.valueEmail
        }
    , """
inputText
    [ spacing 20 ]
    { field = FieldEmail
    , label = text "Email"
    , fieldValue = model.valueEmail
    , inputType = Input.email
    , inputTypeAttrs = []
    , maybeFieldFocused = model.focusedField
    , msgOnChange = OnChange
    , msgOnFocus = OnFocus
    , msgOnLoseFocus = OnLoseFocus
    , maybeMsgOnEnter = Just OnEnter
    , helperText = newHelperText model.enteredField FieldEmail model.valueEmail
    }"""
    )


example9 : Model -> ( Element Msg, String )
example9 model =
    ( inputText
        [ spacing 10 ]
        { field = FieldText
        , label = text "Username"
        , fieldValue = model.valueText
        , inputType = Input.username
        , inputTypeAttrs = []
        , maybeFieldFocused = model.focusedField
        , msgOnChange = OnChange
        , msgOnFocus = OnFocus
        , msgOnLoseFocus = OnLoseFocus
        , maybeMsgOnEnter = Just OnEnter
        , helperText = newHelperText model.enteredField FieldText model.valueText
        }
    , """
inputText
    [ spacing 10 ]
    { field = FieldText
    , label = text "Username"
    , fieldValue = model.valueText
    , inputType = Input.username
    , inputTypeAttrs = []
    , maybeFieldFocused = model.focusedField
    , msgOnChange = OnChange
    , msgOnFocus = OnFocus
    , msgOnLoseFocus = OnLoseFocus
    , maybeMsgOnEnter = Just OnEnter
    , helperText = newHelperText model.enteredField FieldText model.valueText
    }"""
    )


example7 : Model -> ( Element Msg, String )
example7 model =
    ( inputPassword
        [ spacing 20 ]
        { field = FieldNewPassword
        , label = text "New Password"
        , fieldValue = model.valueNewPassword
        , inputType = Input.newPassword
        , inputTypeAttrs = []
        , maybeFieldFocused = model.focusedField
        , msgOnChange = OnChange
        , msgOnFocus = OnFocus
        , msgOnLoseFocus = OnLoseFocus
        , maybeMsgOnEnter = Just OnEnter
        , show = model.valueNewPasswordShow
        , maybeShowHidePassword = maybeShowHidePassword
        , helperText = newHelperText model.enteredField FieldNewPassword model.valueNewPassword
        }
    , """
{- inputPassword type signature:

inputPassword :
    List (Attribute msg)
    ->
        { field : Field
        , fieldValue : String
        , helperText : Maybe (Element msg)
        , inputType :
            List (Attribute msg)
            ->
                { label : Input.Label msg
                , onChange : String -> msg
                , placeholder : Maybe (Input.Placeholder msg)
                , text : String
                , show : Bool
                }
            -> Element msg
        , inputTypeAttrs : List (Attribute msg)
        , label : Element msg
        , maybeFieldFocused : Maybe Field
        , maybeMsgOnEnter : Maybe (Field -> msg)
        , msgOnChange : Field -> String -> msg
        , msgOnFocus : Field -> msg
        , msgOnLoseFocus : Field -> msg
        , show : Bool
        , maybeShowHidePassword :
            Maybe
                { maybeHideIcon : Maybe (Element msg)
                , maybeShowIcon : Maybe (Element msg)
                , msgOnViewToggle : Field -> msg
                }
        }
    -> Element msg
-}

inputPassword
    [ spacing 20 ]
    { field = FieldNewPassword
    , label = text "New Password"
    , fieldValue = model.valueNewPassword
    , inputType = Input.newPassword
    , inputTypeAttrs = []
    , maybeFieldFocused = model.focusedField
    , msgOnChange = OnChange
    , msgOnFocus = OnFocus
    , msgOnLoseFocus = OnLoseFocus
    , maybeMsgOnEnter = Just OnEnter
    , show = model.valueNewPasswordShow
    , maybeShowHidePassword = maybeShowHidePassword
    , helperText = newHelperText model.enteredField FieldNewPassword model.valueNewPassword
    }"""
    )


example8 : Model -> ( Element Msg, String )
example8 model =
    ( inputPassword
        [ spacing 20 ]
        { field = FieldCurrentPassword
        , label = text "Current Password"
        , fieldValue = model.valueCurrentPassword
        , inputType = Input.currentPassword
        , inputTypeAttrs = []
        , maybeFieldFocused = model.focusedField
        , msgOnChange = OnChange
        , msgOnFocus = OnFocus
        , msgOnLoseFocus = OnLoseFocus
        , maybeMsgOnEnter = Just OnEnter
        , show = model.valueCurrentPasswordShow
        , maybeShowHidePassword = maybeShowHidePassword
        , helperText = newHelperText model.enteredField FieldCurrentPassword model.valueCurrentPassword
        }
    , """
inputPassword
    [ spacing 20 ]
    { field = FieldCurrentPassword
    , label = text "Current Password"
    , fieldValue = model.valueCurrentPassword
    , inputType = Input.currentPassword
    , inputTypeAttrs = []
    , maybeFieldFocused = model.focusedField
    , msgOnChange = OnChange
    , msgOnFocus = OnFocus
    , msgOnLoseFocus = OnLoseFocus
    , maybeMsgOnEnter = Just OnEnter
    , show = model.valueCurrentPasswordShow
    , maybeShowHidePassword = maybeShowHidePassword
    , helperText = newHelperText model.enteredField FieldCurrentPassword model.valueCurrentPassword
    }"""
    )


{-| -}
introspection :
    { name : String
    , description : String
    , signature : String
    , variations : List ( String, List ( Element msg1, String ) )
    }
introspection =
    { name = "Fields"
    , description = "List of elements for Web Forms"
    , signature = ""
    , variations =
        [ ( "Text", [ ( text "special: Form.example5", "" ) ] )
        , ( "Email", [ ( text "special: Form.example6", "" ) ] )
        , ( "Username", [ ( text "special: Form.example9", "" ) ] )
        , ( "New Password", [ ( text "special: Form.example7", "" ) ] )
        , ( "Current Password", [ ( text "special: Form.example8", "" ) ] )
        ]
    }



-- Helpers


onEnter : msg -> Html.Attribute msg
onEnter msg =
    Html.Events.keyCode
        |> Json.Decode.andThen
            (\key ->
                if key == 13 then
                    Json.Decode.succeed msg

                else
                    Json.Decode.fail "Not enter"
            )
        |> Html.Events.on "keyup"


attrs { msgOnFocus, msgOnLoseFocus, maybeMsgOnEnter, inputTypeAttrs, field, maybeFieldFocused } =
    let
        focused =
            case maybeFieldFocused of
                Nothing ->
                    False

                Just fieldFocused ->
                    fieldFocused == field
    in
    [ Events.onFocus <| msgOnFocus field
    , Events.onLoseFocus <| msgOnLoseFocus field
    , Background.color <| rgba 1 1 1 0
    , Border.widthEach { bottom = 1, left = 0, right = 0, top = 0 }
    , Border.rounded 0
    , paddingXY 0 8
    , width fill
    , htmlAttribute <| Html.Attributes.style "transition" "all 0.15s"
    ]
        ++ (if focused then
                [ Border.color <| Color.toElementColor Framework.Color.primary ]

            else
                []
           )
        ++ (case maybeMsgOnEnter of
                Just msgOnEnter ->
                    [ htmlAttribute <| onEnter <| msgOnEnter field ]

                Nothing ->
                    []
           )
        ++ inputTypeAttrs


labelBuilder { maybeFieldFocused, field, fieldValue, label } =
    let
        focused =
            case maybeFieldFocused of
                Nothing ->
                    False

                Just fieldFocused ->
                    fieldFocused == field

        labelIsAbove =
            focused || String.length fieldValue > 0
    in
    Input.labelAbove
        ([ htmlAttribute <| Html.Attributes.style "transition" "all 0.15s"
         ]
            ++ (if labelIsAbove then
                    []

                else
                    [ moveDown 33
                    , alpha 0.5
                    ]
               )
        )
    <|
        label


inputFieldParameterForText conf =
    { onChange = conf.msgOnChange conf.field
    , placeholder = Nothing
    , text = conf.fieldValue
    , label = labelBuilder conf
    }


inputFieldParameterForPassword conf show =
    let
        temp =
            inputFieldParameterForText conf
    in
    { onChange = temp.onChange
    , placeholder = temp.placeholder
    , text = temp.text
    , label = temp.label
    , show = show
    }


inputGeneric mainAttrs conf inputFieldParameters =
    let
        inputField =
            conf.inputType (attrs conf) inputFieldParameters
    in
    column mainAttrs <|
        case conf.helperText of
            Just element ->
                [ inputField
                , element
                ]

            Nothing ->
                [ inputField ]


inputText :
    List (Attribute msg)
    ->
        { field : field
        , fieldValue : String
        , helperText : Maybe (Element msg)
        , inputType :
            List (Attribute msg)
            ->
                { label : Input.Label msg
                , onChange : String -> msg
                , placeholder : Maybe (Input.Placeholder msg)
                , text : String
                }
            -> Element msg
        , inputTypeAttrs : List (Attribute msg)
        , label : Element msg
        , maybeFieldFocused : Maybe field
        , maybeMsgOnEnter : Maybe (field -> msg)
        , msgOnChange : field -> String -> msg
        , msgOnFocus : field -> msg
        , msgOnLoseFocus : field -> msg
        }
    -> Element msg
inputText mainAttrs conf =
    inputGeneric mainAttrs conf (inputFieldParameterForText conf)


inputPassword :
    List (Attribute msg)
    ->
        { field : field
        , fieldValue : String
        , helperText : Maybe (Element msg)
        , inputType :
            List (Attribute msg)
            ->
                { label : Input.Label msg
                , onChange : String -> msg
                , placeholder : Maybe (Input.Placeholder msg)
                , text : String
                , show : Bool
                }
            -> Element msg
        , inputTypeAttrs : List (Attribute msg)
        , label : Element msg
        , maybeFieldFocused : Maybe field
        , maybeMsgOnEnter : Maybe (field -> msg)
        , msgOnChange : field -> String -> msg
        , msgOnFocus : field -> msg
        , msgOnLoseFocus : field -> msg
        , show : Bool
        , maybeShowHidePassword :
            Maybe
                { maybeHideIcon : Maybe (Element msg)
                , maybeShowIcon : Maybe (Element msg)
                , msgOnViewToggle : field -> msg
                }
        }
    -> Element msg
inputPassword mainAttrs conf =
    let
        extraAttr =
            case conf.maybeShowHidePassword of
                Just showHidePassword ->
                    [ inFront <|
                        el
                            [ moveDown 14
                            , alignRight
                            , Events.onClick <| showHidePassword.msgOnViewToggle conf.field
                            , pointer
                            ]
                        <|
                            if conf.show then
                                case showHidePassword.maybeHideIcon of
                                    Just icon ->
                                        icon

                                    Nothing ->
                                        Icon.hide (Color.rgb 100 100 100) 20

                            else
                                case showHidePassword.maybeShowIcon of
                                    Just icon ->
                                        icon

                                    Nothing ->
                                        Icon.show (Color.rgb 100 100 100) 20
                    ]

                Nothing ->
                    []

        newConf =
            { conf | inputTypeAttrs = conf.inputTypeAttrs ++ extraAttr }
    in
    inputGeneric mainAttrs newConf (inputFieldParameterForPassword newConf newConf.show)
