module Framework.FormFieldsWithPattern exposing (Field(..), Model, Msg, example1, example2, example3, initModel, inputText, introspection, update)

{-|


# Functions

@docs Field, Model, Msg, example1, example2, example3, initModel, inputText, introspection, update

-}

import Element exposing (Attribute, Element, el, empty, inFront, moveDown, moveLeft, paddingXY, px, scale, text, width)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Input
import Framework.Color exposing (Color(..), color)
import Html.Attributes
import Regex


{-| -}
type alias Model =
    { fieldTelephone : String
    , fieldCreditCard : String
    , field4DigitCode : String
    , focus : Maybe Field
    }


{-| -}
initModel : Model
initModel =
    { fieldTelephone = ""
    , fieldCreditCard = ""
    , field4DigitCode = ""
    , focus = Nothing
    }


{-| -}
type Field
    = FieldTelephone
    | FieldCreditCard
    | Field4DigitCode


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
                    xxresult pattern onlyDigits

                removeCharactedAtTheEndIfNotNumbers =
                    Regex.replace Regex.All regexNotDigitsAtTheEnd (\_ -> "") withPattern
            in
            ( case field of
                FieldTelephone ->
                    { model | fieldTelephone = removeCharactedAtTheEndIfNotNumbers }

                FieldCreditCard ->
                    { model | fieldCreditCard = removeCharactedAtTheEndIfNotNumbers }

                Field4DigitCode ->
                    { model | field4DigitCode = removeCharactedAtTheEndIfNotNumbers }
            , Cmd.none
            )

        OnFocus field ->
            ( { model | focus = Just field }, Cmd.none )

        OnLoseFocus _ ->
            ( { model | focus = Nothing }, Cmd.none )


{-| -}
introspection :
    { boxed : Bool
    , description : String
    , name : String
    , signature : String
    , usage : String
    , usageResult : Element msg
    , variations : List ( String, List ( Element msg1, String ) )
    }
introspection =
    { name = "Fields With Patterns"
    , signature = ""
    , description = "List of elements for Web Forms"
    , usage = ""
    , usageResult = empty
    , boxed = True
    , variations =
        [ ( "Phone number USA", [ ( text "special: FormFieldsWithPattern.example1", "" ) ] )
        , ( "Credit Card number", [ ( text "special: FormFieldsWithPattern.example2", "" ) ] )
        , ( "4 Digit Code", [ ( text "special: FormFieldsWithPattern.example3", "" ) ] )
        ]
    }


hasFocus : Model -> Field -> Bool
hasFocus model field =
    case model.focus of
        Just focus ->
            focus == field

        Nothing ->
            False


hackInLineStyle : String -> String -> Attribute msg
hackInLineStyle text1 text2 =
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
        { field = Field4DigitCode
        , pattern = "_ _ _ _"
        , label = "4 Digits Code"
        }
    , """inputText model
    { field = Field4DigitCode
    , pattern = "_ _ _ _"
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
            field == Field4DigitCode

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
                30
            else
                32

        modelValue =
            case field of
                FieldTelephone ->
                    model.fieldTelephone

                FieldCreditCard ->
                    model.fieldCreditCard

                Field4DigitCode ->
                    model.field4DigitCode

        labelIsAbove =
            hasFocus model field || modelValue /= "" || largeSize
    in
    el
        [ inFront <|
            el
                ([ if hasFocus model field && largeSize then
                    Font.color <| color Primary
                   else
                    Font.color <| color GrayLight
                 , moveDown moveDownPlaceHolder
                 , hackInLineStyle "pointer-events" "none"
                 ]
                    ++ font
                )
            <|
                text <|
                    if labelIsAbove then
                        patternToShow
                    else
                        ""
        ]
    <|
        Input.text
            ([ Events.onFocus <| OnFocus field
             , Events.onLoseFocus <| OnLoseFocus field
             , Background.color <| color Transparent
             , if largeSize then
                Border.width 0
               else
                Border.widthEach { bottom = 2, left = 0, right = 0, top = 0 }
             , Border.rounded 0
             , paddingXY 0 8
             , width <| px 230
             , hackInLineStyle "transition" "all 0.15s"
             , hackInLineStyle "z-index" "10"
             ]
                ++ font
                ++ (if hasFocus model field then
                        [ Border.color <| color Primary ]
                    else
                        []
                   )
            )
            { label =
                Input.labelAbove
                    ([ hackInLineStyle "transition" "all 0.15s"
                     , hackInLineStyle "z-index" "10"
                     , hackInLineStyle "pointer-events" "none"
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



--


type Token
    = Inputxxx
    | Other Char


xxparse : Char -> String -> List Token
xxparse inputChar pattern =
    String.toList pattern
        |> List.map (xxtokenize inputChar)


xxtokenize : Char -> Char -> Token
xxtokenize inputChar pattern =
    if pattern == inputChar || pattern == '_' then
        Inputxxx
    else
        Other pattern


xxformat : List Token -> String -> String
xxformat tokens input =
    if String.isEmpty input then
        input
    else
        xxappend tokens (String.toList input) ""


xxresult : String -> String -> String
xxresult template string =
    xxformat (xxparse '0' template) string


xxappend : List Token -> List Char -> String -> String
xxappend tokens input formatted =
    let
        appendInput =
            List.head input
                |> Maybe.map (\char -> formatted ++ String.fromChar char)
                |> Maybe.map (xxappend (Maybe.withDefault [] (List.tail tokens)) (Maybe.withDefault [] (List.tail input)))
                |> Maybe.withDefault formatted

        maybeToken =
            List.head tokens
    in
    case maybeToken of
        Nothing ->
            formatted

        Just token ->
            case token of
                Inputxxx ->
                    appendInput

                Other char ->
                    xxappend (Maybe.withDefault [] <| List.tail tokens) input (formatted ++ String.fromChar char)



{-
   main : Html msg
   main =
       text <| toString <| result "(000)-0000-0000" "1234566666666666"
-}
