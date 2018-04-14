module Framework exposing (Introspection, Model, Msg, update, view, viewPage)

{-| This simple package generates a page with Style Guides.
It uses certain data structure that each section of the framework expose ([Example](https://lucamug.github.io/elm-styleguide-generator/), [Example source](https://github.com/lucamug/elm-styleguide-generator/blob/master/examples/Main.elm)).

The idea is to have a Living version of the Style Guide that always stays
updated with no maintenance.

For more info about the idea, see [this post](https://medium.com/@l.mugnaini/zero-maintenance-always-up-to-date-living-style-guide-in-elm-dbf236d07522).


# Functions

@docs Introspection, Model, Msg, update, view, viewPage

-}

--import Element.Input as Input

import Color exposing (gray, rgba)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Input
import Framework.Button as Button
import Framework.Cards as Cards
import Framework.Color exposing (Color(..), color)
import Framework.Form as Form
import Framework.Icon as Icon
import Framework.Logo as Logo
import Framework.Spinner as Spinner
import Framework.StyleElements as StyleElements
import Framework.StyleElementsInput as StyleElementsInput
import Framework.Typography as Typography
import Html
import Html.Attributes
import Navigation
import Window


conf :
    { gray3 : Color.Color
    , grayB : Color.Color
    , introduction : Element msg
    , logo : Element msg1
    , mainPadding : number
    , p : String
    , version : String
    }
conf =
    { gray3 = Color.rgb 0x33 0x33 0x33
    , grayB = Color.rgb 0xB6 0xB6 0xB6
    , logo =
        column []
            [ paragraph
                [ Font.size 55
                , Font.bold
                , moveLeft 3
                ]
                [ el [ alpha 0.5 ] <| text "elm"
                , text "Style"
                ]
            , el [ Font.size 16, Font.bold ] <| text "FRAMEWORK"
            ]
    , version = "0.0.1"
    , mainPadding = 41
    , p = "1234"
    , introduction =
        paragraph []
            []
    }


{-| -}
type alias Model =
    { selected : Maybe ( Introspection, Variation )
    , maybeWindowSize : Maybe Window.Size
    , modelStyleElementsInput : StyleElementsInput.Model
    , modelForm : Form.Model
    , modelCards : Cards.Model
    , introspections : List ( Introspection, Bool )
    , location : Navigation.Location
    , localStorage : String
    , maybeWindowSize : Maybe Window.Size
    , p : String
    }


init : Flag -> Navigation.Location -> ( Model, Cmd Msg )
init flag location =
    ( { location = location
      , p = conf.p
      , selected = Nothing
      , modelStyleElementsInput = StyleElementsInput.initModel
      , modelForm = Form.initModel
      , modelCards = Cards.initModel
      , localStorage = flag.local_storage
      , maybeWindowSize = Just <| Window.Size flag.width flag.height
      , introspections =
            [ ( Framework.Color.introspection, True )
            , ( Form.introspection, True )
            , ( Typography.introspection, True )
            , ( Cards.introspection, True )
            , ( Button.introspection, True )
            , ( Spinner.introspection, True )
            , ( Logo.introspection, True )
            , ( Icon.introspection, True )
            , ( StyleElements.introspection, True )
            , ( StyleElementsInput.introspection, True )
            ]
      }
      --, Cmd.batch [ Task.perform MsgChangeWindowSize Window.size ]
    , Cmd.batch []
    )


type alias Flag =
    { local_storage : String
    , width : Int
    , height : Int
    }


{-| This is the type that is required for Introspection

Example, inside Framework.Button:

    introspection : Styleguide.Introspection msg
    introspection =
        { name = "Button"
        , signature = "button : List Modifier -> Maybe msg -> String -> Element msg"
        , description = "Buttons accept a list of modifiers, a Maybe msg (for example: \"Just DoSomething\") and the text to display inside the button."
        , usage = "button [ Medium, Success, Outlined ] Nothing \"Button\""
        , usageResult = button [ Medium, Success, Outlined ] Nothing "Button"
        , boxed = False
        , variations =
            [ ( "Sizes"
              , [ ( button [ Small ] Nothing "Button", "button [ Small ] Nothing \"Button\"" )
                , ( button [ Medium ] Nothing "Button", "button [ Medium ] Nothing \"Button\"" )
                , ( button [ Large ] Nothing "Button", "button [ Large ] Nothing \"Button\"" )
                ]
              )
            ]
        }

-}
type alias Introspection =
    { name : String
    , signature : String
    , description : String
    , usage : String
    , usageResult : Element Msg
    , variations : List Variation
    , boxed : Bool
    }


type alias IntrospectionWithView =
    ( Introspection, Bool )


type alias Variation =
    ( String, List SubSection )


type alias SubSection =
    ( Element Msg, String )


{-| -}
type Msg
    = MsgToggleSection String
    | MsgOpenAll
    | MsgCloseAll
    | MsgSelectThis ( Introspection, Variation )
    | MsgGoTop
    | MsgChangeWindowSize Window.Size
    | MsgStyleElementsInput StyleElementsInput.Msg
    | MsgForm Form.Msg
    | MsgCards Cards.Msg
    | MsgChangeUrl Navigation.Location
    | MsgChangeP String


{-| -}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MsgChangeP p ->
            ( { model | p = p }, Cmd.none )

        MsgGoTop ->
            ( { model | selected = Nothing }, Cmd.none )

        MsgSelectThis introspectionAndVariation ->
            ( { model | selected = Just introspectionAndVariation }, Cmd.none )

        MsgOpenAll ->
            let
                introspections =
                    List.map (\( data, show ) -> ( data, True )) model.introspections
            in
            ( { model | introspections = introspections }, Cmd.none )

        MsgCloseAll ->
            let
                introspections =
                    List.map (\( data, show ) -> ( data, False )) model.introspections
            in
            ( { model | introspections = introspections }, Cmd.none )

        MsgToggleSection dataName ->
            let
                toggle ( data, show ) =
                    if data.name == dataName then
                        ( data, not show )
                    else
                        ( data, show )

                introspections =
                    List.map toggle model.introspections
            in
            ( { model | introspections = introspections }, Cmd.none )

        MsgChangeWindowSize windowSize ->
            ( { model | maybeWindowSize = Just windowSize }, Cmd.none )

        MsgStyleElementsInput msg ->
            let
                ( newModel, newCmd ) =
                    StyleElementsInput.update msg model.modelStyleElementsInput
            in
            ( { model | modelStyleElementsInput = newModel }, Cmd.none )

        MsgForm msg ->
            let
                ( newModel, newCmd ) =
                    Form.update msg model.modelForm
            in
            ( { model | modelForm = newModel }, Cmd.none )

        MsgCards msg ->
            let
                ( newModel, newCmd ) =
                    Cards.update msg model.modelCards
            in
            ( { model | modelCards = newModel }, Cmd.none )

        MsgChangeUrl location ->
            ( { model | location = location }, Cmd.none )


{-| This create the entire page of Html type.

Example, in your Style Guide page:

    main : Html.Html msg
    main =
        Styleguide.viewHtmlPage
            [ Framework.Button.introspection
            , Framework.Color.introspection
            ]

-}
view : Model -> Html.Html Msg
view model =
    layoutWith
        { options =
            [ focusStyle
                { borderColor = Just <| color Primary
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
        , Font.color <| conf.gray3
        , Background.color Color.white
        , Element.inFront <|
            link
                [ alignRight
                , Font.color <| color Primary
                ]
                { label = image [ width <| px 60, alpha 0.5 ] { src = "images/github.png", description = "Fork me on Github" }
                , url = "https://github.com/lucamug/elm-style-framework"
                }
        ]
    <|
        if model.location.hostname == "localhost" || model.p == conf.p then
            viewPage model.maybeWindowSize model
        else
            column [ width fill, height fill ]
                [ html (Html.node "style" [] [ Html.text """.elm-mini-controls {display: none;}""" ])
                , Input.text
                    [ width <| px 200
                    , centerX
                    , centerY
                    , Border.color <| color GrayLight
                    ]
                    { onChange = Just MsgChangeP
                    , text = model.p
                    , placeholder = Nothing
                    , label = Input.labelLeft [ Font.size 30 ] <| text "🔒"
                    }
                ]


css : String
css =
    -- line-height to normal is because Confluence is changing this parameter
    """
body {
    line-height: normal !important;
}
.elmStyleguideGenerator-open {
transition: all .8s;
ttransform: translateY(0);
max-height: 500px;
}
.elmStyleguideGenerator-close {
transition: all .1s;
ttransform: translateY(-100%);
max-height: 0;
}
pre {
    margin: 0;
}
"""


{-| This create the entire page of Element type. If you are working
with style-elements this is the way to go, so you can customize your page.

Example, in your Style Guide page:

    main : Html.Html msg
    main =
        layout layoutFontsAndAttributes <|
            column []
                [ ...
                , Styleguide.page
                    [ Framework.Button.introspection
                    , Framework.Color.introspection
                    ]
                ...
                ]

-}
viewPage : Maybe Window.Size -> Model -> Element Msg
viewPage maybeWindowSize model =
    row
        [ height <|
            case maybeWindowSize of
                Just windowSize ->
                    px windowSize.height

                Nothing ->
                    fill
        , width fill
        ]
        [ html <| Html.node "style" [] [ Html.text css ]
        , el [ height <| fill, scrollbarY, clipX, width <| px 310 ] <| viewMenuColumn model
        , el [ height <| fill, scrollbarY, clipX, width <| fill ] <| viewContentColumn model
        ]


viewMenuColumn : Model -> Element Msg
viewMenuColumn model =
    column
        [ Background.color <| conf.gray3
        , Font.color <| conf.grayB
        , width fill
        , height shrink
        , spacing 30
        , paddingXY conf.mainPadding conf.mainPadding
        , height fill
        ]
        [ column [ height shrink ]
            [ viewLogo conf.logo conf.version
            , row
                [ spacing 10
                , Font.size 14
                , Font.color <| rgba 0x82 0x82 0x82 0xFF
                ]
                [ el [ pointer, Events.onClick MsgOpenAll ] <| text "Expand All"
                , el [ pointer, Events.onClick MsgCloseAll ] <| text "Close All"
                ]
            ]
        , column [ spacing 30, height shrink, alignTop ] <| List.map (\( data, show ) -> viewIntrospectionForMenu data show) model.introspections
        ]


viewContentColumn : Model -> Element Msg
viewContentColumn model =
    case model.selected of
        Just something ->
            viewSomething model something

        Nothing ->
            el
                [ height fill
                , width fill
                , scrollbars
                ]
            <|
                column []
                    [ column [ padding <| conf.mainPadding + 100, spacing conf.mainPadding ]
                        [ el [] <| viewLogo conf.logo conf.version
                        , el [ Font.size 24 ] conf.introduction
                        , el [ centerX, alpha 0.2 ] <| Icon.icon Icon.ChevronDown 32
                        ]
                    , column [] <| List.map (\( introspection, show ) -> viewIntrospection model introspection) model.introspections
                    ]


viewIntrospection : Model -> Introspection -> Element Msg
viewIntrospection model introspection =
    column []
        ([ viewIntrospectionTitle introspection
         ]
            ++ List.map
                (\( string, listSubSections ) ->
                    viewIntrospectionBody model string listSubSections
                )
                introspection.variations
        )


viewSomething : Model -> ( Introspection, ( String, List SubSection ) ) -> Element Msg
viewSomething model ( introspection, ( title, listSubSection ) ) =
    column
        []
        [ viewIntrospectionTitle introspection

        --, el [ Font.size 18 ] <| text "Signature"
        --, paragraph codeAttributes [ text <| introspection.signature ]
        --, el [ Font.size 18 ] <| text "Code Example"
        --, paragraph codeAttributes [ text <| introspection.usage ]
        --, el [ Font.size 18 ] <| text "Result"
        --, paragraph [] [ introspection.usageResult ]
        , viewIntrospectionBody model title listSubSection
        ]


viewIntrospectionTitle : Introspection -> Element Msg
viewIntrospectionTitle introspection =
    viewTitleAndSubTitle introspection.name (text introspection.description)


viewIntrospectionBody : Model -> String -> List SubSection -> Element Msg
viewIntrospectionBody model title listSubSection =
    column
        [ padding conf.mainPadding
        , spacing conf.mainPadding
        , Background.color <| Color.white
        ]
        [ el [ Font.size 28 ] (text <| title)
        , column [ spacing 10 ] (List.map (\( part, name ) -> viewSubSection model ( part, name ) False) listSubSection)
        ]


viewLogo : Element Msg -> String -> Element Msg
viewLogo logo version =
    column [ Events.onClick MsgGoTop, pointer, height shrink ]
        [ logo
        , el [ Font.size 16, Font.bold, Events.onClick MsgGoTop ] <| text <| "v" ++ version
        ]


viewIntrospectionForMenu : Introspection -> Bool -> Element Msg
viewIntrospectionForMenu introspection open =
    column
        [ Font.color <| rgba 0x82 0x82 0x82 0xFF
        ]
        [ el
            [ pointer
            , Events.onClick <| MsgToggleSection introspection.name
            , width fill
            , Font.bold
            ]
          <|
            paragraph [ alignLeft ]
                [ el
                    [ padding 5
                    , rotate
                        (if open then
                            pi / 2
                         else
                            0
                        )
                    ]
                    (text <| "⟩ ")
                , el
                    [ Font.size 18
                    , Font.bold
                    ]
                  <|
                    text introspection.name
                ]
        , column
            ([ clip
             , height shrink
             , Font.size 16
             , Font.color <| rgba 0xD1 0xD1 0xD1 0xFF
             , spacing 2
             , paddingEach { bottom = 0, left = 26, right = 0, top = 0 }
             ]
                ++ (if open then
                        [ htmlAttribute <| Html.Attributes.class "elmStyleguideGenerator-open" ]
                    else
                        [ htmlAttribute <| Html.Attributes.class "elmStyleguideGenerator-close" ]
                   )
            )
            (viewListVariationForMenu introspection introspection.variations)
        ]


viewListVariationForMenu : Introspection -> List Variation -> List (Element Msg)
viewListVariationForMenu introspection variations =
    List.map
        (\( title, variation ) ->
            el
                [ pointer
                , Events.onClick <| MsgSelectThis ( introspection, ( title, variation ) )
                ]
            <|
                text title
        )
        variations


viewTitleAndSubTitle : String -> Element Msg -> Element Msg
viewTitleAndSubTitle title subTitle =
    column
        [ Background.color <| rgba 0xF7 0xF7 0xF7 0xFF
        , padding conf.mainPadding
        , spacing 10
        , height shrink
        ]
        [ el [ Font.size 32, Font.bold ] (text <| title)
        , paragraph [ Font.size 24, Font.extraLight ] [ subTitle ]
        ]



-- hackInLineStyle : String -> String -> Element.Element msg


hackInLineStyle : String -> String -> Attribute msg
hackInLineStyle text1 text2 =
    Element.htmlAttribute (Html.Attributes.style [ ( text1, text2 ) ])


specialComponent :
    Model
    -> (StyleElementsInput.Model -> ( Element StyleElementsInput.Msg, c ))
    -> ( Element Msg, c )
specialComponent model component =
    let
        componentTuplet =
            component model.modelStyleElementsInput
    in
    ( Element.map MsgStyleElementsInput (Tuple.first <| componentTuplet)
    , Tuple.second <| componentTuplet
    )


specialComponentForm :
    Model
    -> (Form.Model -> ( Element Form.Msg, c ))
    -> ( Element Msg, c )
specialComponentForm model component =
    let
        componentTuplet =
            component model.modelForm
    in
    ( Element.map MsgForm (Tuple.first <| componentTuplet)
    , Tuple.second <| componentTuplet
    )


specialComponentCards :
    Model
    -> (Cards.Model -> ( Element Cards.Msg, c ))
    -> ( Element Msg, c )
specialComponentCards model component =
    let
        componentTuplet =
            component model.modelCards
    in
    ( Element.map MsgCards (Tuple.first <| componentTuplet)
    , Tuple.second <| componentTuplet
    )


viewSubSection : Model -> SubSection -> Bool -> Element Msg
viewSubSection model ( componentExample, componentExampleSourceCode ) boxed =
    let
        ( componentExampleToDisplay, componentExampleSourceCodeToDisplay ) =
            if componentExample == text "special: Form.example1" then
                specialComponentForm model Form.example1
            else if componentExample == text "special: Form.example2" then
                specialComponentForm model Form.example2
            else if componentExample == text "special: Cards.example1" then
                specialComponentCards model Cards.example1
            else if componentExample == text "special: example0" then
                specialComponent model StyleElementsInput.example0
            else if componentExample == text "special: example1" then
                specialComponent model StyleElementsInput.example1
            else if componentExample == text "special: example2" then
                specialComponent model StyleElementsInput.example2
            else if componentExample == text "special: example3" then
                specialComponent model StyleElementsInput.example3
            else if componentExample == text "special: example4" then
                specialComponent model StyleElementsInput.example4
            else if componentExample == text "special: example5" then
                specialComponent model StyleElementsInput.example5
            else if componentExample == text "special: example6" then
                specialComponent model StyleElementsInput.example6
            else if componentExample == text "special: example7" then
                specialComponent model StyleElementsInput.example7
            else if componentExample == text "special: example8" then
                specialComponent model StyleElementsInput.example8
            else if componentExample == text "special: example9" then
                specialComponent model StyleElementsInput.example9
            else if componentExample == text "special: example9" then
                specialComponent model StyleElementsInput.example9
            else if componentExample == text "special: example10" then
                specialComponent model StyleElementsInput.example10
            else if componentExample == text "special: example11" then
                specialComponent model StyleElementsInput.example11
            else
                ( componentExample, componentExampleSourceCode )

        --        componentExampleSourceCodeToDisplay =
        --            if componentExampleSourceCode == "" then
        --                el [ width fill ] empty
        --            else
        --                paragraph
        --                    [ width fill
        --                    , scrollbars
        --                    , alignTop
        --                    , Font.color <| rgb 0x99 0x99 0x99
        --                    , Font.family [ Font.monospace ]
        --                    , Font.size 16
        --                    , Background.color <| Color.rgb 0x33 0x33 0x33
        --                    , padding 16
        --                    , Border.rounded 8
        --                    ]
        --                    [ html (Html.pre [] [ Html.text componentExampleSourceCode ]) ]
    in
    row
        []
        [ paragraph
            [ width fill

            --, scrollbars
            , alignTop

            --, Border.width 1
            ]
            [ componentExampleToDisplay ]
        , sourceCodeWrapper componentExampleSourceCodeToDisplay
        ]


sourceCodeWrapper : String -> Element Msg
sourceCodeWrapper sourceCode =
    paragraph
        [ width fill
        , scrollbars
        , alignTop
        , Font.color <| rgba 0x99 0x99 0x99 0xFF
        , Font.family [ Font.monospace ]
        , Font.size 16
        , Background.color <| conf.gray3
        , padding 16
        , Border.rounded 8
        ]
        [ html (Html.pre [] [ Html.text sourceCode ]) ]



-- INTERNAL


generatedBy : Element msg
generatedBy =
    el [ paddingXY 0 10, alignLeft, Font.size 14, Font.color Color.darkGray ] <|
        paragraph []
            [ text "Generated by "
            , link [ Font.color Color.orange ]
                { url = "http://package.elm-lang.org/packages/lucamug/elm-styleguide-generator/latest"
                , label = text "elm-styleguide-generator"
                }
            , text <| " version " ++ conf.version
            ]



-- SELF EXAMPLE


introspectionExample : String -> Introspection
introspectionExample id =
    { name = "Element " ++ id
    , signature = "Signature " ++ id
    , description = "Description " ++ id
    , usage = "Usage " ++ id
    , usageResult = text <| "Usage result " ++ id
    , boxed = True
    , variations =
        [ ( "Element " ++ id ++ " - Example A"
          , [ ( text <| "Element " ++ id ++ " - Example A - Case 1", "source A1" )
            , ( text <| "Element " ++ id ++ " - Example A - Case 2", "source A2" )
            ]
          )
        , ( "Element " ++ id ++ " - Example B"
          , [ ( text <| "Element " ++ id ++ " - Example B - Case 1", "source B1" )
            , ( text <| "Element " ++ id ++ " - Example B - Case 2", "source B2" )
            ]
          )
        ]
    }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Window.resizes MsgChangeWindowSize
        ]


main : Program Flag Model Msg
main =
    Navigation.programWithFlags MsgChangeUrl
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
