module Framework.StyleElementsInput exposing (..)

import Element exposing (..)
import Element.Input as Input


type alias Model =
    { radio : Maybe String
    , text : String
    , checkbox : Bool
    }


type Msg
    = Radio String
    | Button
    | Input String
    | Checkbox Bool


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg |> Debug.log "Msg" of
        Radio value ->
            ( { model | radio = Just value }, Cmd.none )

        Button ->
            ( model, Cmd.none )

        Input value ->
            ( { model | text = value }, Cmd.none )

        Checkbox value ->
            ( { model | checkbox = value }, Cmd.none )


initModel : Model
initModel =
    { radio = Just "A"
    , text = ""
    , checkbox = False
    }


introspection =
    { name = "Style-Elements Input"
    , signature = ""
    , description = "This is a raw list of all elements of style-elements as they are"
    , usage = ""
    , usageResult = empty
    , boxed = True
    , variations =
        [ ( "Button", [ ( text "special: example0", "" ) ] )
        , ( "Checkbox", [ ( text "special: example2", "" ) ] )
        , ( "Radio", [ ( text "special: example3", "" ) ] )
        , ( "Radio Row", [ ( text "special: example4", "" ) ] )
        , ( "Text", [ ( text "special: example1", "" ) ] )
        , ( "Username", [ ( text "special: example5", "" ) ] )
        , ( "New Password", [ ( text "special: example6", "" ) ] )
        , ( "Current Password", [ ( text "special: example7", "" ) ] )
        , ( "Email", [ ( text "special: example8", "" ) ] )
        , ( "Search", [ ( text "special: example9", "" ) ] )
        , ( "Multiline", [ ( text "special: example10", "" ) ] )
        , ( "Multiline with spellcheck", [ ( text "special: example11", "" ) ] )
        ]
    }


example0 model =
    ( Input.button []
        { label = text "Label"
        , onPress = Just Button
        }
    , """Input.button []
    { label = text "Label"
    , onPress = Just Button
    }"""
    )


example1 model =
    ( Input.text []
        { label = Input.labelAbove [] <| text "Label"
        , onChange = Just Input
        , placeholder = Nothing
        , text = model.text
        }
    , """Input.text []
    { label = Input.labelAbove [] <| text "Label"
    , onChange = Just Input
    , placeholder = Nothing
    , text = model.text
    }"""
    )


example2 model =
    ( Input.checkbox []
        { label = Input.labelAbove [] <| text "Label"
        , onChange = Just Checkbox
        , checked = model.checkbox
        , icon = Nothing
        }
    , """Input.checkbox []
    { label = Input.labelAbove [] <| text "Label"
    , onChange = Just Checkbox
    , checked = model.checkbox
    , icon = Nothing
    }"""
    )


example3 model =
    ( Input.radio []
        { label = Input.labelAbove [] <| text "Label"
        , onChange = Just Radio
        , selected = model.radio
        , options =
            [ Input.option "A" (text "Radio A")
            , Input.option "B" (text "Radio B")
            , Input.option "C" (text "Radio C")
            ]
        }
    , """Input.radio []
    { label = Input.labelAbove [] <| text "Label"
    , onChange = Just Radio
    , selected = model.radio
    , options =
        [ Input.option "A" (text "Radio A")
        , Input.option "B" (text "Radio B")
        , Input.option "C" (text "Radio C")
        ]
    }"""
    )


example4 model =
    ( Input.radioRow []
        { label = Input.labelAbove [] <| text "Label"
        , onChange = Just Radio
        , selected = model.radio
        , options =
            [ Input.option "A" (text "Radio A")
            , Input.option "B" (text "Radio B")
            , Input.option "C" (text "Radio C")
            ]
        }
    , """Input.radioRow []
    { label = Input.labelAbove [] <| text "Label"
    , onChange = Just Radio
    , selected = model.radio
    , options =
        [ Input.option "A" (text "Radio A")
        , Input.option "B" (text "Radio B")
        , Input.option "C" (text "Radio C")
        ]
    }"""
    )


example5 model =
    ( Input.username []
        { label = Input.labelAbove [] <| text "Label"
        , onChange = Just Input
        , placeholder = Nothing
        , text = model.text
        }
    , """Input.username []
    { label = Input.labelAbove [] <| text "Label"
    , onChange = Just Input
    , placeholder = Nothing
    , text = model.text
    }"""
    )


example6 model =
    ( Input.newPassword []
        { label = Input.labelAbove [] <| text "Label"
        , onChange = Just Input
        , placeholder = Nothing
        , text = model.text
        , show = False
        }
    , """Input.newPassword []
    { label = Input.labelAbove [] <| text "Label"
    , onChange = Just Input
    , placeholder = Nothing
    , text = model.text
    , show = False
    }"""
    )


example7 model =
    ( Input.currentPassword []
        { label = Input.labelAbove [] <| text "Label"
        , onChange = Just Input
        , placeholder = Nothing
        , text = model.text
        , show = False
        }
    , """Input.currentPassword []
    { label = Input.labelAbove [] <| text "Label"
    , onChange = Just Input
    , placeholder = Nothing
    , text = model.text
    , show = False
    }"""
    )


example8 model =
    ( Input.email []
        { label = Input.labelAbove [] <| text "Label"
        , onChange = Just Input
        , placeholder = Nothing
        , text = model.text
        }
    , """Input.email []
    { label = Input.labelAbove [] <| text "Label"
    , onChange = Just Input
    , placeholder = Nothing
    , text = model.text
    }"""
    )


example9 model =
    ( Input.search []
        { label = Input.labelAbove [] <| text "Label"
        , onChange = Just Input
        , placeholder = Nothing
        , text = model.text
        }
    , """Input.search []
    { label = Input.labelAbove [] <| text "Label"
    , onChange = Just Input
    , placeholder = Nothing
    , text = model.text
    }"""
    )


example10 model =
    ( Input.multiline []
        { label = Input.labelAbove [] <| text "Label"
        , onChange = Just Input
        , placeholder = Nothing
        , text = model.text
        , spellcheck = False
        }
    , """Input.multiline []
    { label = Input.labelAbove [] <| text "Label"
    , onChange = Just Input
    , placeholder = Nothing
    , text = model.text
    , spellcheck = False
    }"""
    )


example11 model =
    ( Input.multiline []
        { label = Input.labelAbove [] <| text "Label"
        , onChange = Just Input
        , placeholder = Nothing
        , text = model.text
        , spellcheck = True
        }
    , """Input.multiline []
    { label = Input.labelAbove [] <| text "Label"
    , onChange = Just Input
    , placeholder = Nothing
    , text = model.text
    , spellcheck = True
    }"""
    )
