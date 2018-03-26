module Framework.Form exposing (..)

--import Element.Area as Area

import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Input
import Framework.Color as Color exposing (Color(..), color)
import Html.Attributes
import Regex


type alias Model =
    { radio : Maybe String
    , telephone : String
    , creditCard : String
    , checkbox : Bool
    , focus : Maybe Field
    }


initModel : Model
initModel =
    { radio = Just "A"
    , telephone = ""
    , creditCard = ""
    , checkbox = False
    , focus = Nothing
    }


type Field
    = FieldTelephone
    | FieldCreditCard


type Msg
    = Radio String
    | Button
    | Input Field String String
    | Checkbox Bool
    | OnFocus Field
    | OnLoseFocus Field


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg |> Debug.log "Msg" of
        Radio value ->
            ( { model | radio = Just value }, Cmd.none )

        Button ->
            ( model, Cmd.none )

        Input field pattern value ->
            let
                onlyDigits =
                    Regex.replace Regex.All (Regex.regex "[^0-9]") (\_ -> "") value

                withPattern =
                    result pattern onlyDigits

                removeCharactedAtTheEndIfNotNumbers =
                    Regex.replace Regex.All (Regex.regex "[^0-9]*$") (\_ -> "") withPattern
            in
            ( case field of
                FieldTelephone ->
                    { model | telephone = removeCharactedAtTheEndIfNotNumbers }

                FieldCreditCard ->
                    { model | creditCard = removeCharactedAtTheEndIfNotNumbers }
            , Cmd.none
            )

        Checkbox value ->
            ( { model | checkbox = value }, Cmd.none )

        OnFocus field ->
            ( { model | focus = Just field }, Cmd.none )

        OnLoseFocus field ->
            ( { model | focus = Nothing }, Cmd.none )


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
    { name = "Form Elements"
    , signature = ""
    , description = "List of elements for Web Forms"
    , usage = ""
    , usageResult = empty
    , boxed = True
    , variations =
        [ ( "Phone number USA", [ ( text "special: Form.example1", "" ) ] )
        , ( "Credit Card number", [ ( text "special: Form.example2", "" ) ] )
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


inputText : Model -> { a | field : Field, label : String, pattern : String } -> Element Msg
inputText model { field, pattern, label } =
    let
        lengthDifference =
            String.length pattern - String.length modelValue

        patternToShow =
            modelValue ++ String.right lengthDifference pattern

        modelValue =
            case field of
                FieldTelephone ->
                    model.telephone

                FieldCreditCard ->
                    model.creditCard

        labelIsAbove =
            hasFocus model field || modelValue /= ""
    in
    el
        [ inFront <|
            el
                [ Font.color <| color GrayLight
                , moveDown 33
                , hackInLineStyle "pointer-events" "none"
                ]
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
             , Border.widthEach { bottom = 2, left = 0, right = 0, top = 0 }
             , Border.rounded 0
             , paddingXY 0 8
             , width <| px 230
             , hackInLineStyle "transition" "all 0.15s"
             , hackInLineStyle "z-index" "10"
             ]
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


parse : Char -> String -> List Token
parse inputChar pattern =
    String.toList pattern
        |> List.map (tokenize inputChar)


tokenize : Char -> Char -> Token
tokenize inputChar pattern =
    if pattern == inputChar then
        Inputxxx
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
                Inputxxx ->
                    appendInput

                Other char ->
                    append (Maybe.withDefault [] <| List.tail tokens) input (formatted ++ String.fromChar char)



{-
   main : Html msg
   main =
       text <| toString <| result "(000)-0000-0000" "1234566666666666"
-}
