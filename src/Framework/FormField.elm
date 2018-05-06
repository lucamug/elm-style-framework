module Framework.FormField exposing (Field(..), Model, Msg, example1, initModel, inputText, introspection, update)

{-|


# Functions

@docs Field, Model, Msg, example1, initModel, inputText, introspection, update

-}

import Element exposing (Attribute, Element, alpha, fill, moveDown, moveLeft, none, paddingXY, scale, text, width)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Input as Input
import Framework.Color
import Html.Attributes


{-| -}
type alias Model =
    { valueEmail : String
    , focus : Maybe Field
    }


{-| -}
initModel : Model
initModel =
    { valueEmail = ""
    , focus = Nothing
    }


{-| -}
type Field
    = FieldEmail


{-| -}
type Msg
    = Input Field String
    | OnFocus Field
    | OnLoseFocus Field


{-| -}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Input field value ->
            ( case field of
                FieldEmail ->
                    { model | valueEmail = value }
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
    { name = "Fields"
    , signature = ""
    , description = "List of elements for Web Forms"
    , usage = ""
    , usageResult = none
    , boxed = True
    , variations =
        [ ( "Email", [ ( text "special: Form.example1", "" ) ] )
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
        { field = FieldEmail
        , label = "E-mail address"
        }
    , """inputText model
    { field = FieldEmail
    , label = "E-mail address"
    }"""
    )


{-| -}
inputText : Model -> { a | field : Field, label : String } -> Element Msg
inputText model { field, label } =
    let
        modelValue =
            case field of
                FieldEmail ->
                    model.valueEmail

        labelIsAbove =
            hasFocus model field || modelValue /= ""
    in
    Input.email
        ([ Events.onFocus <| OnFocus field
         , Events.onLoseFocus <| OnLoseFocus field
         , Background.color <| Framework.Color.transparent
         , Border.widthEach { bottom = 1, left = 0, right = 0, top = 0 }
         , Border.rounded 0
         , paddingXY 0 8
         , width fill
         , hackInLineStyle "transition" "all 0.15s"
         , hackInLineStyle "z-index" "10"
         ]
            ++ (if hasFocus model field then
                    [ Border.color <| Framework.Color.primary ]
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
                            [ scale 1, moveLeft 0 ]
                        else
                            [ moveDown 33
                            , alpha 0.5
                            ]
                       )
                )
            <|
                text label
        , onChange = Just <| Input field
        , placeholder = Nothing
        , text = modelValue
        }
