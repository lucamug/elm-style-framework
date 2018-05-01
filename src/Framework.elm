module Framework exposing (Conf, Flag, Introspection, Model, Msg(..), init, initConf, initModel, introspections, main, subscriptions, update, view, viewPage)

{-| [Demo](https://lucamug.github.io/elm-style-framework/)

This simple package generates a page with Style Guides.
It uses certain data structure that each section of the framework expose ([Example](https://lucamug.github.io/elm-styleguide-generator/), [Example source](https://github.com/lucamug/elm-styleguide-generator/blob/master/examples/Main.elm)).

The idea is to have a Living version of the Style Guide that always stays
updated with no maintenance.

For more info about the idea, see [this post](https://medium.com/@l.mugnaini/zero-maintenance-always-up-to-date-living-style-guide-in-elm-dbf236d07522).


# Functions

@docs Conf, Flag, Introspection, Model, Msg, init, initConf, initModel, introspections, main, subscriptions, update, view, viewPage

-}

--import Element.Input as Input

import Color
import Element exposing (Attribute, Element, alignLeft, alignRight, alignTop, alpha, centerX, centerY, clip, clipX, column, el, empty, fill, focusStyle, height, html, htmlAttribute, image, layoutWith, link, moveLeft, padding, paddingEach, paddingXY, paragraph, pointer, px, rotate, row, scrollbarY, scrollbars, shrink, spacing, text, width)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Input
import Framework.Button as Button
import Framework.Cards as Cards
import Framework.Color exposing (color)
import Framework.FormFields as FormFields
import Framework.FormFieldsWithPattern as FormFieldsWithPattern
import Framework.Icon as Icon
import Framework.Logo as Logo
import Framework.Spinner as Spinner
import Framework.StyleElements as StyleElements
import Framework.StyleElementsInput as StyleElementsInput
import Framework.Typography as Typography
import Html
import Html.Attributes
import Http
import Navigation
import UrlParser exposing ((</>))
import Window


debug : Bool
debug =
    True


{-| Configuration
-}
type alias Conf msg =
    { gray3 : Color.Color
    , gray9 : Color.Color
    , grayB : Color.Color
    , grayD : Color.Color
    , grayF : Color.Color
    , title : Element msg
    , subTitle : String
    , version : String
    , introduction : Element msg
    , mainPadding : Int
    , password : String
    , forkMe : Attribute msg
    , hostnamesWithoutPassword : String -> Bool
    }


{-| -}
initConf : Conf msg
initConf =
    { gray3 = Color.rgba 0x33 0x33 0x33 0xFF
    , gray9 = Color.rgba 0x99 0x99 0x99 0xFF
    , grayB = Color.rgba 0xB6 0xB6 0xB6 0xFF
    , grayD = Color.rgba 0xD1 0xD1 0xD1 0xFF
    , grayF = Color.rgba 0xF7 0xF7 0xF7 0xFF
    , title =
        column []
            [ el [ alpha 0.3 ] <| Logo.logo (Logo.LogoElm <| Logo.ElmColor Logo.White) 60
            , paragraph
                [ Font.size 55
                , Font.bold
                , moveLeft 3
                ]
                [ el [ alpha 0.5 ] <| text "elm"
                , text "Style"
                ]
            ]
    , subTitle = "FRAMEWORK"
    , version = "6.0.0"
    , introduction = empty
    , mainPadding = 41
    , password = ""
    , forkMe =
        Element.inFront <|
            link
                [ alignRight
                , Font.color <| color.primary
                ]
                { label = image [ width <| px 60, alpha 0.5 ] { src = "images/github.png", description = "Fork me on Github" }
                , url = "https://github.com/lucamug/elm-style-framework"
                }
    , hostnamesWithoutPassword = \hostname -> hostname == "localhost"
    }


emptyIntrospection : Introspection
emptyIntrospection =
    { name = "Not found"
    , signature = ""
    , description = ""
    , usage = ""
    , usageResult = empty
    , boxed = True
    , variations =
        []
    }


emptyVariation : Variation
emptyVariation =
    ( "Not found"
    , []
    )


maybeSelected : Model -> Maybe ( Introspection, Variation )
maybeSelected model =
    let
        ( slug1, slug2 ) =
            case maybeRoute model.location of
                Just route ->
                    case route of
                        RouteSubPage slug3 slug4 ->
                            ( Maybe.withDefault "" <| Http.decodeUri (slugToString slug3)
                            , Maybe.withDefault "" <| Http.decodeUri (slugToString slug4)
                            )

                        _ ->
                            ( "", "" )

                Nothing ->
                    ( "", "" )

        ( introspection, _ ) =
            Maybe.withDefault ( emptyIntrospection, False ) <| List.head <| List.filter (\( introspection2, _ ) -> introspection2.name == slug1) model.introspections

        variation =
            Maybe.withDefault emptyVariation <| List.head <| List.filter (\( name, _ ) -> name == slug2) introspection.variations
    in
    if introspection == emptyIntrospection || variation == emptyVariation then
        Nothing
    else
        Just ( introspection, variation )


{-| -}
type alias Model =
    { maybeWindowSize : Maybe Window.Size
    , modelStyleElementsInput : StyleElementsInput.Model
    , modelFormFields : FormFields.Model
    , modelFormFieldsWithPattern : FormFieldsWithPattern.Model
    , modelCards : Cards.Model
    , introspections : List ( Introspection, Bool )
    , location : Navigation.Location
    , maybeWindowSize : Maybe Window.Size
    , password : String
    , conf : Conf Msg
    }


{-| -}
initModel : Flag -> Navigation.Location -> Model
initModel flag location =
    { location = location
    , password = ""
    , modelStyleElementsInput = StyleElementsInput.initModel
    , modelFormFields = FormFields.initModel
    , modelFormFieldsWithPattern = FormFieldsWithPattern.initModel
    , modelCards = Cards.initModel
    , maybeWindowSize = Just <| Window.Size flag.width flag.height
    , conf = initConf
    , introspections =
        if debug then
            introspections
        else
            introspectionsForDebugging
    }


introspectionsForDebugging : List ( Introspection, Bool )
introspectionsForDebugging =
    [ ( introspectionExample "ID 1", True )
    , ( introspectionExample "ID 2", True )
    , ( introspectionExample "ID 3", True )
    ]


{-| -}
introspections : List ( Introspection, Bool )
introspections =
    [ ( Framework.Color.introspection, True )
    , ( FormFields.introspection, True )
    , ( FormFieldsWithPattern.introspection, True )
    , ( Typography.introspection, True )
    , ( Cards.introspection, True )
    , ( Button.introspection, True )
    , ( Spinner.introspection, True )
    , ( Logo.introspection, True )
    , ( Icon.introspection, True )
    , ( StyleElements.introspection, True )
    , ( StyleElementsInput.introspection, True )
    ]


{-| -}
init : Flag -> Navigation.Location -> ( Model, Cmd Msg )
init flag location =
    ( initModel flag location
    , Cmd.batch []
    )


{-| -}
type alias Flag =
    { width : Int
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


type alias Variation =
    ( String, List SubSection )


type alias SubSection =
    ( Element Msg, String )


{-| -}
type Msg
    = MsgToggleSection String
    | MsgOpenAllSections
    | MsgCloseAllSections
    | MsgChangeWindowSize Window.Size
    | MsgStyleElementsInput StyleElementsInput.Msg
    | MsgFormFields FormFields.Msg
    | MsgFormFieldsWithPattern FormFieldsWithPattern.Msg
    | MsgCards Cards.Msg
    | MsgChangeLocation Navigation.Location
    | MsgChangePassword String


{-| -}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MsgChangeLocation location ->
            ( { model | location = location }, Cmd.none )

        MsgChangePassword password ->
            ( { model | password = password }, Cmd.none )

        MsgOpenAllSections ->
            let
                introspections =
                    List.map (\( data, _ ) -> ( data, True )) model.introspections
            in
            ( { model | introspections = introspections }, Cmd.none )

        MsgCloseAllSections ->
            let
                introspections =
                    List.map (\( data, _ ) -> ( data, False )) model.introspections
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

        MsgStyleElementsInput msg2 ->
            let
                ( newModel, _ ) =
                    StyleElementsInput.update msg2 model.modelStyleElementsInput
            in
            ( { model | modelStyleElementsInput = newModel }, Cmd.none )

        MsgFormFields msg2 ->
            let
                ( newModel, _ ) =
                    FormFields.update msg2 model.modelFormFields
            in
            ( { model | modelFormFields = newModel }, Cmd.none )

        MsgFormFieldsWithPattern msg2 ->
            let
                ( newModel, _ ) =
                    FormFieldsWithPattern.update msg2 model.modelFormFieldsWithPattern
            in
            ( { model | modelFormFieldsWithPattern = newModel }, Cmd.none )

        MsgCards msg2 ->
            let
                ( newModel, _ ) =
                    Cards.update msg2 model.modelCards
            in
            ( { model | modelCards = newModel }, Cmd.none )


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
    let
        conf =
            model.conf
    in
    layoutWith
        { options =
            [ focusStyle
                { borderColor = Just <| color.primary
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
        , conf.forkMe
        ]
    <|
        if conf.hostnamesWithoutPassword model.location.hostname || model.password == conf.password || String.length conf.password == 0 then
            viewPage model.maybeWindowSize model
        else
            column [ width fill, height fill ]
                [ html (Html.node "style" [] [ Html.text """.elm-mini-controls {display: none;}""" ])
                , Input.text
                    [ width <| px 200
                    , centerX
                    , centerY
                    , Border.color <| color.grey_light
                    ]
                    { onChange = Just MsgChangePassword
                    , text = model.password
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
    let
        conf =
            model.conf
    in
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
            [ viewLogo conf.title conf.subTitle conf.version
            , row
                [ spacing 10
                , Font.size 14
                , Font.color <| conf.gray9
                ]
                [ el [ pointer, Events.onClick MsgOpenAllSections ] <| text "Expand All"
                , el [ pointer, Events.onClick MsgCloseAllSections ] <| text "Close All"
                ]
            ]
        , column [ spacing 30, height shrink, alignTop ] <| List.map (\( data, show ) -> viewIntrospectionForMenu conf data show) model.introspections
        ]


viewContentColumn : Model -> Element Msg
viewContentColumn model =
    case maybeSelected model of
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
                    [ column [ padding <| model.conf.mainPadding + 100, spacing model.conf.mainPadding ]
                        [ el [] <| viewLogo model.conf.title model.conf.subTitle model.conf.version
                        , el [ Font.size 24 ] model.conf.introduction
                        , el [ centerX, alpha 0.2 ] <| Icon.icon Icon.ChevronDown 32
                        ]
                    , column [] <| List.map (\( introspection, _ ) -> viewIntrospection model introspection) model.introspections
                    ]


viewIntrospection : Model -> Introspection -> Element Msg
viewIntrospection model introspection =
    column []
        (viewIntrospectionTitle model.conf introspection
            :: List.map
                (\( string, listSubSections ) ->
                    viewIntrospectionBody model string listSubSections
                )
                introspection.variations
        )


viewSomething : Model -> ( Introspection, ( String, List SubSection ) ) -> Element Msg
viewSomething model ( introspection, ( title, listSubSection ) ) =
    column
        []
        [ viewIntrospectionTitle model.conf introspection

        --, el [ Font.size 18 ] <| text "Signature"
        --, paragraph codeAttributes [ text <| introspection.signature ]
        --, el [ Font.size 18 ] <| text "Code Example"
        --, paragraph codeAttributes [ text <| introspection.usage ]
        --, el [ Font.size 18 ] <| text "Result"
        --, paragraph [] [ introspection.usageResult ]
        , viewIntrospectionBody model title listSubSection
        ]


viewIntrospectionTitle : Conf msg -> Introspection -> Element Msg
viewIntrospectionTitle conf introspection =
    viewTitleAndSubTitle conf introspection.name (text introspection.description)


viewIntrospectionBody : Model -> String -> List SubSection -> Element Msg
viewIntrospectionBody model title listSubSection =
    let
        conf =
            model.conf
    in
    column
        [ padding conf.mainPadding
        , spacing conf.mainPadding
        , Background.color <| Color.white
        ]
        [ el [ Font.size 28 ] (text <| title)
        , column [ spacing 10 ] (List.map (\( part, name ) -> viewSubSection model ( part, name )) listSubSection)
        ]


viewLogo : Element Msg -> String -> String -> Element Msg
viewLogo title subTitle version =
    link []
        { label =
            column [ height shrink ]
                [ el [ Font.size 60, Font.bold ] title
                , el [ Font.size 16, Font.bold ] <| text subTitle
                , el [ Font.size 16, Font.bold ] <| text <| "v" ++ version
                ]
        , url = routeToString RouteHome
        }


viewIntrospectionForMenu : Conf msg -> Introspection -> Bool -> Element Msg
viewIntrospectionForMenu conf introspection open =
    column
        [ Font.color <| conf.gray9
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
             , Font.color <| conf.grayD
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
        (\( title, _ ) ->
            link []
                { label = text title
                , url = routeToString <| RouteSubPage (Slug introspection.name) (Slug title)
                }
        )
        variations


viewTitleAndSubTitle : Conf msg -> String -> Element Msg -> Element Msg
viewTitleAndSubTitle conf title subTitle =
    column
        [ Background.color <| conf.grayF
        , padding conf.mainPadding
        , spacing 10
        , height shrink
        ]
        [ el [ Font.size 32, Font.bold ] (text <| title)
        , paragraph [ Font.size 24, Font.extraLight ] [ subTitle ]
        ]


specialComponent : Model -> (StyleElementsInput.Model -> ( Element StyleElementsInput.Msg, c )) -> ( Element Msg, c )
specialComponent model component =
    let
        componentTuplet =
            component model.modelStyleElementsInput
    in
    ( Element.map MsgStyleElementsInput (Tuple.first <| componentTuplet)
    , Tuple.second <| componentTuplet
    )


specialComponentFormFieldsWithPattern : Model -> (FormFieldsWithPattern.Model -> ( Element FormFieldsWithPattern.Msg, c )) -> ( Element Msg, c )
specialComponentFormFieldsWithPattern model component =
    let
        componentTuplet =
            component model.modelFormFieldsWithPattern
    in
    ( Element.map MsgFormFieldsWithPattern (Tuple.first <| componentTuplet)
    , Tuple.second <| componentTuplet
    )


specialComponentFormFields : Model -> (FormFields.Model -> ( Element FormFields.Msg, c )) -> ( Element Msg, c )
specialComponentFormFields model component =
    let
        componentTuplet =
            component model.modelFormFields
    in
    ( Element.map MsgFormFields (Tuple.first <| componentTuplet)
    , Tuple.second <| componentTuplet
    )


specialComponentCards : Model -> (Cards.Model -> ( Element Cards.Msg, c )) -> ( Element Msg, c )
specialComponentCards model component =
    let
        componentTuplet =
            component model.modelCards
    in
    ( Element.map MsgCards (Tuple.first <| componentTuplet)
    , Tuple.second <| componentTuplet
    )


viewSubSection : Model -> SubSection -> Element Msg
viewSubSection model ( componentExample, componentExampleSourceCode ) =
    let
        ( componentExampleToDisplay, componentExampleSourceCodeToDisplay ) =
            if componentExample == text "special: Form.example1" then
                specialComponentFormFields model FormFields.example1
            else if componentExample == text "special: FormFieldsWithPattern.example1" then
                specialComponentFormFieldsWithPattern model FormFieldsWithPattern.example1
            else if componentExample == text "special: FormFieldsWithPattern.example2" then
                specialComponentFormFieldsWithPattern model FormFieldsWithPattern.example2
            else if componentExample == text "special: FormFieldsWithPattern.example3" then
                specialComponentFormFieldsWithPattern model FormFieldsWithPattern.example3
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
    in
    row
        []
        [ paragraph
            [ width fill
            , alignTop
            ]
            [ componentExampleToDisplay ]
        , sourceCodeWrapper model.conf componentExampleSourceCodeToDisplay
        ]


sourceCodeWrapper : Conf msg -> String -> Element Msg
sourceCodeWrapper conf sourceCode =
    paragraph
        [ width fill
        , scrollbars
        , alignTop
        , Font.color <| conf.gray9
        , Font.family [ Font.monospace ]
        , Font.size 16
        , Background.color <| conf.gray3
        , padding 16
        , Border.rounded 8
        ]
        [ html (Html.pre [] [ Html.text sourceCode ]) ]



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


{-| -}
subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Window.resizes MsgChangeWindowSize
        ]



{-
   programWithFlags
       :  (Location -> msg)
       -> { init : flags -> Location -> (model, Cmd msg), update : msg -> model -> (model, Cmd msg), view : model -> Html msg, subscriptions : model -> Sub msg }
       -> Program flags model msg
-}
-- maybeRoute : Navigation.Location -> Maybe Route


{-| -}
main : Program Flag Model Msg
main =
    Navigation.programWithFlags MsgChangeLocation
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- ROUTING


type Route
    = RouteHome
    | RouteSubPage Slug Slug


rootRoute : String
rootRoute =
    "framework"


route : UrlParser.Parser (Route -> a) a
route =
    UrlParser.oneOf
        [ UrlParser.map RouteHome (UrlParser.s rootRoute)
        , UrlParser.map RouteSubPage (UrlParser.s rootRoute </> stateParser </> stateParser)
        ]


type Slug
    = Slug String


slugToString : Slug -> String
slugToString (Slug slug) =
    slug


stateParser : UrlParser.Parser (Slug -> a) a
stateParser =
    UrlParser.custom "SLUG" (Ok << Slug)


routeRoot : String
routeRoot =
    "#/"


routeToString : Route -> String
routeToString page =
    let
        pieces =
            case page of
                RouteHome ->
                    [ rootRoute ]

                RouteSubPage slug1 slug2 ->
                    [ rootRoute, slugToString slug1, slugToString slug2 ]
    in
    routeRoot ++ String.join "/" pieces


maybeRoute : Navigation.Location -> Maybe Route
maybeRoute location =
    if String.isEmpty location.hash then
        Just RouteHome
    else
        UrlParser.parseHash route location
