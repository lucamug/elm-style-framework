module Framework.FormFieldWithPattern exposing (Field(..), Model, Msg, example1, example2, example3, initModel, inputText, introspection, update)

{-|


# Functions

@docs Field, Model, Msg, example1, example2, example3, initModel, inputText, introspection, update

-}

import Element exposing (Attribute, Element, el, inFront, moveDown, moveLeft, none, paddingXY, px, scale, text, width)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Input
import Framework.Color
import Framework.Configuration exposing (conf)
import Html.Attributes
import Regex


{-| -}
type alias Model =
    { value : String
    , focus : Maybe Field
    }


{-| -}
initModel : Model
initModel =
    { value = ""
    , focus = Nothing
    }


{-| -}
type Field
    = FieldTelephone
    | FieldCreditCard
    | Field6DigitCode


{-| -}
type Msg
    = Input Field String String
    | OnFocus Field
    | OnLoseFocus Field


regexNotDigit : Regex.Regex
regexNotDigit =
    Regex.regex "[^0-9]"


regexNotDigitsAtTheEnd : Regex.Regex
regexNotDigitsAtTheEnd =
    Regex.regex "[^0-9]*$"


{-| -}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Input field pattern value ->
            let
                onlyDigits =
                    Regex.replace Regex.All regexNotDigit (\_ -> "") value

                withPattern =
                    result pattern onlyDigits

                removeCharactedAtTheEndIfNotNumbers =
                    Regex.replace Regex.All regexNotDigitsAtTheEnd (\_ -> "") withPattern
            in
            ( case field of
                FieldTelephone ->
                    { model | value = removeCharactedAtTheEndIfNotNumbers }

                FieldCreditCard ->
                    { model | value = removeCharactedAtTheEndIfNotNumbers }

                Field6DigitCode ->
                    { model | value = removeCharactedAtTheEndIfNotNumbers }
            , Cmd.none
            )

        OnFocus field ->
            ( { model | focus = Just field }, Cmd.none )

        OnLoseFocus _ ->
            ( { model | focus = Nothing }, Cmd.none )


{-| -}
introspection :
    { name : String
    , description : String
    , signature : String
    , variations : List ( String, List ( Element msg1, String ) )
    }
introspection =
    { name = "Fields With Patterns"
    , description = "List of elements for Web Forms"
    , signature = ""
    , variations =
        [ ( "Phone number USA", [ ( text "special: FormFieldWithPattern.example1", "" ) ] )
        , ( "Credit Card number", [ ( text "special: FormFieldWithPattern.example2", "" ) ] )
        , ( "4 Digit Code", [ ( text "special: FormFieldWithPattern.example3", "" ) ] )
        ]
    }


hasFocus : Model -> Field -> Bool
hasFocus model field =
    case model.focus of
        Just focus ->
            focus == field

        Nothing ->
            False


inLineStyle : String -> String -> Attribute msg
inLineStyle text1 text2 =
    Element.htmlAttribute (Html.Attributes.style [ ( text1, text2 ) ])


{-| -}
example1 : Model -> ( Element Msg, String )
example1 model =
    ( inputText model
        { field = FieldTelephone
        , pattern = "(000) 000 - 0000"
        , label = "Phone number USA"
        }
    , """inputText model
    { field = FieldTelephone
    , pattern = "(000) 000 - 0000"
    , label = "Phone number USA"
    }"""
    )


{-| -}
example2 : Model -> ( Element Msg, String )
example2 model =
    ( inputText model
        { field = FieldCreditCard
        , pattern = "0000 - 0000 - 0000 - 0000"
        , label = "Credit Card number"
        }
    , """inputText model
    { field = FieldCreditCard
    , pattern = "0000 - 0000 - 0000 - 0000"
    , label = "Credit Card number"
    }"""
    )


{-| -}
example3 : Model -> ( Element Msg, String )
example3 model =
    ( inputText model
        { field = Field6DigitCode
        , pattern = "____"
        , label = "4 Digits Code"
        }
    , """inputText model
        { field = Field6DigitCode
        , pattern = "____"
        , label = "4 Digits Code"
        }"""
    )


{-| -}
inputText : Model -> { a | field : Field, label : String, pattern : String } -> Element Msg
inputText model { field, pattern, label } =
    let
        lengthDifference =
            String.length pattern - String.length modelValue

        patternToShow =
            modelValue ++ String.right lengthDifference pattern

        largeSize =
            field == Field6DigitCode

        font =
            if largeSize then
                [ Font.family
                    [ Font.monospace
                    ]
                , Font.size 54
                ]
            else
                []

        moveDownPlaceHolder =
            if largeSize then
                conf.moveDownPlaceHolder.large
            else
                conf.moveDownPlaceHolder.small

        modelValue =
            case field of
                FieldTelephone ->
                    model.value

                FieldCreditCard ->
                    model.value

                Field6DigitCode ->
                    model.value

        labelIsAbove =
            hasFocus model field || modelValue /= "" || largeSize
    in
    el
        [ inFront <|
            el
                ([ if hasFocus model field && largeSize then
                    Font.color <| Framework.Color.primary
                   else
                    Font.color <| Framework.Color.grey_light
                 , moveDown moveDownPlaceHolder
                 , inLineStyle "pointer-events" "none"
                 , inLineStyle "letter-spacing" "10px"
                 ]
                    ++ font
                )
            <|
                text <|
                    if labelIsAbove then
                        patternToShow
                    else
                        ""
        , inFront <|
            Input.text
                ([ Events.onFocus <| OnFocus field
                 , Events.onLoseFocus <| OnLoseFocus field
                 , Background.color <| Framework.Color.transparent
                 , if largeSize then
                    Border.width 0
                   else
                    Border.widthEach { bottom = 2, left = 0, right = 0, top = 0 }
                 , inLineStyle "letter-spacing" "10px"
                 , Border.rounded 0
                 , paddingXY 0 8
                 , width <| px 330
                 , inLineStyle "transition" "all 0.15s"

                 --, Element.htmlAttribute <| Html.Attributes.type_ "number"
                 ]
                    ++ font
                    ++ (if hasFocus model field then
                            [ Border.color <| Framework.Color.primary ]
                        else
                            []
                       )
                )
                { label =
                    Input.labelAbove
                        ([ inLineStyle "transition" "all 0.15s"
                         , inLineStyle "pointer-events" "none"
                         , Font.family [ Font.typeface conf.font.typeface, conf.font.typefaceFallback ]
                         , Font.size 16
                         ]
                            ++ (if labelIsAbove then
                                    [ scale 0.9, moveLeft 14 ]
                                else
                                    [ moveDown 33 ]
                               )
                        )
                    <|
                        text label
                , onChange = Just <| Input field pattern
                , placeholder = Nothing
                , text = modelValue
                }
        ]
    <|
        none



-- Internal


type Token
    = InputValue
    | Other Char


parse : Char -> String -> List Token
parse inputChar pattern =
    String.toList pattern
        |> List.map (tokenize inputChar)


tokenize : Char -> Char -> Token
tokenize inputChar pattern =
    if pattern == inputChar || pattern == '_' then
        InputValue
    else
        Other pattern


format : List Token -> String -> String
format tokens input =
    if String.isEmpty input then
        input
    else
        append tokens (String.toList input) ""


result : String -> String -> String
result template string =
    format (parse '0' template) string


append : List Token -> List Char -> String -> String
append tokens input formatted =
    let
        appendInput =
            List.head input
                |> Maybe.map (\char -> formatted ++ String.fromChar char)
                |> Maybe.map (append (Maybe.withDefault [] (List.tail tokens)) (Maybe.withDefault [] (List.tail input)))
                |> Maybe.withDefault formatted

        maybeToken =
            List.head tokens
    in
    case maybeToken of
        Nothing ->
            formatted

        Just token ->
            case token of
                InputValue ->
                    appendInput

                Other char ->
                    append (Maybe.withDefault [] <| List.tail tokens) input (formatted ++ String.fromChar char)
