module Framework exposing (Conf, Flag, Introspection, Model, Msg(..), init, initCmd, initConf, initModel, introspections, main, subscriptions, update, view, viewPage)

{-| [Demo](https://lucamug.github.io/elm-style-framework/)

This simple package generates a page with Style Guides.
It uses certain data structure that each section of the framework expose ([Example](https://lucamug.github.io/elm-styleguide-generator/), [Example source](https://github.com/lucamug/elm-styleguide-generator/blob/master/examples/Main.elm)).

The idea is to have a Living version of the Style Guide that always stays
updated with no maintenance.

For more info about the idea, see [this post](https://medium.com/@l.mugnaini/zero-maintenance-always-up-to-date-living-style-guide-in-elm-dbf236d07522).

There are three way to configure/customize this package.


## Overwrite variables

  - To change the variables (mainly colors), as defined inside `Configuration.elm` use the file `FrameworkConfiguration.elm`. You can create such file in the root folder of your project or better you should copy the entire framework inside your repository. The file should contain

```
import Dict

configuration : Dict.Dict String String
configuration =
    Dict.fromList [ ( "primary", "#909" ) ]
```

ALso add `module FrameworkConfiguration exposing (configuration)` at the very top.
In this example we are replacing the primary color with#909.


## Chnage the automatically-generated-styleguide

  - To change the automatically-generated-styleguide logo, title and description you need to pass a new configuration file. SOmething like:

```
view : Framework.Model -> Html.Html Framework.Msg
view model =
    Framework.view
        { model
            | conf = initConf
        }

initConf : Framework.Conf msg
initConf =
    let
        confData =
            Framework.initConf
    in
    { confData
        | title = text "New Title"
        , subTitle = "New Subtitle"
    }
```


## Add completely new features

  - To add new feature and have them showing up in the style guide just
    remember to output the `introspection` and add them into the configurations

```
view : Framework.Model -> Html.Html Framework.Msg
view model =
    Framework.view
        { model
            | introspections = introspections
        }

introspections : List ( Framework.Introspection, Bool )
introspections =
    [ ( <| Color.toElementColor Color.introspection, True )
    , ( Logo.introspection, True )
    , ( Icon.introspection, True )
    ]
        ++ Framework.introspections
```

You can combine the latest two points with

    view : Framework.Model -> Html.Html Framework.Msg
    view model =
        Framework.view
            { model
                | conf = initConf
                | introspections = introspections
            }

If you believe that your new feature is something that everybody should have
please add it to the package and contribute to the opensource!

For any issue or to get in touch with the authors, refer to the github page.


# Functions

@docs Conf, Flag, Introspection, Model, Msg, init, initCmd, initConf, initModel, introspections, main, subscriptions, update, view, viewPage

-}

--import Element.Input as Input

import Browser
import Color
import Element exposing (Attribute, Element, alignLeft, alignRight, alignTop, alpha, centerX, centerY, clip, clipX, column, el, fill, focusStyle, height, html, htmlAttribute, image, layoutWith, link, moveLeft, none, padding, paddingEach, paddingXY, paragraph, pointer, px, rotate, row, scrollbarY, scrollbars, shrink, spacing, text, width)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Input
import Framework.Button as Button
import Framework.Card as Card
import Framework.Color
import Framework.Configuration exposing (conf)
import Framework.FormField as FormField
import Framework.FormFieldWithPattern as FormFieldWithPattern
import Framework.Icon as Icon
import Framework.Logo as Logo
import Framework.Spinner as Spinner
import Framework.StyleElements as StyleElements
import Framework.StyleElementsInput as StyleElementsInput
import Framework.Typography as Typography
import Html
import Html.Attributes
import Http
import Json.Decode
import Json.Decode.Pipeline
import Url
import Url.Parser exposing ((</>))


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
    { gray3 = Color.rgb 0x33 0x33 0x33
    , gray9 = Color.rgb 0x99 0x99 0x99
    , grayB = Color.rgb 0xB6 0xB6 0xB6
    , grayD = Color.rgb 0xD1 0xD1 0xD1
    , grayF = Color.rgb 0xF7 0xF7 0xF7
    , title =
        column []
            [ link []
                { label = el [ alpha 0.3 ] <| Logo.logo (Logo.LogoElm <| Logo.ElmColor Logo.White) 60
                , url = ".."
                }
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
    , version = "0.19"
    , introduction = none
    , mainPadding = 41
    , password = ""
    , forkMe =
        Element.inFront <|
            link
                [ alignRight

                --, Font.color <| Framework.Color.primary
                , Font.color <| Color.toElementColor Color.black
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
        _ =
            urlToRoute model.url

        ( slug1, slug2 ) =
            case urlToRoute model.url of
                RouteSubPage slug3 slug4 ->
                    ( Maybe.withDefault "" <| Url.percentDecode (slugToString slug3)
                    , Maybe.withDefault "" <| Url.percentDecode (slugToString slug4)
                    )

                _ ->
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


type alias WindowSize =
    { width : Int, height : Int }


{-| -}
type alias Model =
    { maybeWindowSize : Maybe WindowSize
    , modelStyleElementsInput : StyleElementsInput.Model
    , modelFormField : FormField.Model
    , modelFormFieldWithPattern : FormFieldWithPattern.Model
    , modelCards : Card.Model
    , introspections : List ( Introspection, Bool )
    , url : Url.Url
    , password : String
    , conf : Conf Msg
    }


decodeFlag : Json.Decode.Decoder Flag
decodeFlag =
    Json.Decode.succeed Flag
        |> Json.Decode.Pipeline.required "width" Json.Decode.int
        |> Json.Decode.Pipeline.required "height" Json.Decode.int


decodeFlagFromJson : Json.Decode.Value -> Maybe Flag
decodeFlagFromJson json =
    let
        decoded =
            json
                |> Json.Decode.decodeValue decodeFlag
    in
    case decoded of
        Ok flag ->
            Just flag

        Err _ ->
            Nothing


{-| -}
initModel : Json.Decode.Value -> Url.Url -> Model
initModel value url =
    let
        flag =
            decodeFlagFromJson value
    in
    { url = url
    , password = ""
    , modelStyleElementsInput = StyleElementsInput.initModel
    , modelFormField = FormField.initModel
    , modelFormFieldWithPattern = FormFieldWithPattern.initModel
    , modelCards = Card.initModel
    , maybeWindowSize = flag
    , conf = initConf
    , introspections =
        if debug then
            introspections

        else
            introspectionsForDebugging
    }


{-| -}
initCmd : Cmd msg
initCmd =
    Cmd.batch []


{-| -}
-- init : Browser.Env Json.Decode.Value -> ( Model, Cmd Msg )
init _ _ _ =
    ( initModel flags url
    , initCmd
    )


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
    , ( FormField.introspection, True )
    , ( FormFieldWithPattern.introspection, True )
    , ( Typography.introspection, True )
    , ( Card.introspection, True )
    , ( Button.introspection, True )
    , ( Spinner.introspection, True )
    , ( Logo.introspection, True )
    , ( Icon.introspection, True )
    , ( StyleElements.introspection, True )
    , ( StyleElementsInput.introspection, True )
    ]


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
    , variations : List Variation
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
    | MsgChangeWindowSize WindowSize
    | MsgStyleElementsInput StyleElementsInput.Msg
    | MsgFormField FormField.Msg
    | MsgFormFieldWithPattern FormFieldWithPattern.Msg
    | MsgCards Card.Msg
    | MsgChangeUrl Url.Url
    | MsgChangePassword String
    | MsgNoOp
    | MsgChangedUrl Url.Url
    | MsgClickedLink Browser.UrlRequest


{-| -}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MsgNoOp  ->
            ( model , Cmd.none )

        MsgChangedUrl _ ->
            ( model , Cmd.none )

        MsgClickedLink _ ->
            ( model , Cmd.none )

        MsgChangeUrl url ->
            ( { model | url = url }, Cmd.none )

        MsgChangePassword password ->
            ( { model | password = password }, Cmd.none )

        MsgOpenAllSections ->
            let
                intros =
                    List.map (\( data, _ ) -> ( data, True )) model.introspections
            in
            ( { model | introspections = intros }, Cmd.none )

        MsgCloseAllSections ->
            let
                intros =
                    List.map (\( data, _ ) -> ( data, False )) model.introspections
            in
            ( { model | introspections = intros }, Cmd.none )

        MsgToggleSection dataName ->
            let
                toggle ( data, show ) =
                    if data.name == dataName then
                        ( data, not show )

                    else
                        ( data, show )

                intros =
                    List.map toggle model.introspections
            in
            ( { model | introspections = intros }, Cmd.none )

        MsgChangeWindowSize windowSize ->
            ( { model | maybeWindowSize = Just windowSize }, Cmd.none )

        MsgStyleElementsInput msg2 ->
            let
                ( newModel, _ ) =
                    StyleElementsInput.update msg2 model.modelStyleElementsInput
            in
            ( { model | modelStyleElementsInput = newModel }, Cmd.none )

        MsgFormField msg2 ->
            let
                ( newModel, _ ) =
                    FormField.update msg2 model.modelFormField
            in
            ( { model | modelFormField = newModel }, Cmd.none )

        MsgFormFieldWithPattern msg2 ->
            let
                ( newModel, _ ) =
                    FormFieldWithPattern.update msg2 model.modelFormFieldWithPattern
            in
            ( { model | modelFormFieldWithPattern = newModel }, Cmd.none )

        MsgCards msg2 ->
            let
                ( newModel, _ ) =
                    Card.update msg2 model.modelCards
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
--view : Model -> Browser.Page Msg
view model =
    { title = "0.19 - Elm Style Framework"
    , body =
        [ layoutWith
            { options =
                [ focusStyle
                    { borderColor = Just <| Color.toElementColor Framework.Color.primary
                    , backgroundColor = Nothing
                    , shadow = Nothing
                    }
                ]
            }
            [ Font.family
                [ Font.external
                    { name = conf.font.typeface
                    , url = conf.font.url
                    }
                , Font.typeface conf.font.typeface
                , conf.font.typefaceFallback
                ]
            , Font.size 16
            , Font.color <| Color.toElementColor model.conf.gray3
            , Background.color <| Color.toElementColor Color.white
            , model.conf.forkMe
            ]
          <|
            viewPage model.maybeWindowSize model
        ]
    }


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
viewPage : Maybe WindowSize -> Model -> Element Msg
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
        [ Background.color <| Color.toElementColor model.conf.gray3
        , Font.color <| Color.toElementColor model.conf.grayB
        , width fill
        , height shrink
        , spacing 30
        , paddingXY model.conf.mainPadding model.conf.mainPadding
        , height fill
        ]
        [ column [ height shrink ]
            [ viewLogo model.conf.title model.conf.subTitle model.conf.version
            , row
                [ spacing 10
                , Font.size 14
                , Font.color <| Color.toElementColor model.conf.gray9
                , paddingXY 0 20
                ]
                [ el [ pointer, Events.onClick MsgOpenAllSections ] <| text "Expand All"
                , el [ pointer, Events.onClick MsgCloseAllSections ] <| text "Close All"
                ]
            ]
        , column [ spacing 30, height shrink, alignTop ] <| List.map (\( data, show ) -> viewIntrospectionForMenu model.conf data show) model.introspections
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
                        , el [ centerX, alpha 0.2 ] <| Icon.chevronDown Framework.Color.grey 32
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
        (viewIntrospectionTitle model.conf introspection
            :: (if introspection.signature /= "" then
                    [ paragraph
                        [ Font.family [ Font.monospace ]
                        , paddingXY 40 20
                        ]
                        [ text <| String.join "⇾" <| String.split "->" introspection.signature
                        ]
                    ]

                else
                    []
               )
            ++ [ viewIntrospectionBody model title listSubSection
               ]
        )


viewIntrospectionTitle : Conf msg -> Introspection -> Element Msg
viewIntrospectionTitle configuration introspection =
    viewTitleAndSubTitle configuration introspection.name (text introspection.description)


viewIntrospectionBody : Model -> String -> List SubSection -> Element Msg
viewIntrospectionBody model title listSubSection =
    column
        [ padding model.conf.mainPadding
        , spacing model.conf.mainPadding
        , Background.color <| Color.toElementColor Color.white
        ]
        [ el [ Font.size 28 ] (text <| title)
        , column [ spacing 10 ] (List.map (\( part, name ) -> viewSubSection model ( part, name )) listSubSection)
        ]


viewLogo : Element Msg -> String -> String -> Element Msg
viewLogo title subTitle version =
    link []
        { label =
            column [ height shrink, spacing 10 ]
                [ el [ Font.size 60, Font.bold ] title
                , el [ Font.size 16, Font.bold ] <| text subTitle
                , el [ Font.size 12, Font.bold ] <| text <| "v" ++ version
                ]
        , url = routeToString RouteHome
        }


viewIntrospectionForMenu : Conf msg -> Introspection -> Bool -> Element Msg
viewIntrospectionForMenu configuration introspection open =
    column
        [ Font.color <| Color.toElementColor configuration.gray9
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
             , Font.color <| Color.toElementColor configuration.grayD
             , spacing 12
             , paddingEach { bottom = 0, left = 26, right = 0, top = 12 }
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
viewTitleAndSubTitle configuration title subTitle =
    column
        [ Background.color <| Color.toElementColor configuration.grayF
        , padding configuration.mainPadding
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


specialComponentFormFieldWithPattern : Model -> (FormFieldWithPattern.Model -> ( Element FormFieldWithPattern.Msg, c )) -> ( Element Msg, c )
specialComponentFormFieldWithPattern model component =
    let
        componentTuplet =
            component model.modelFormFieldWithPattern
    in
    ( Element.map MsgFormFieldWithPattern (Tuple.first <| componentTuplet)
    , Tuple.second <| componentTuplet
    )


specialComponentFormField : Model -> (FormField.Model -> ( Element FormField.Msg, c )) -> ( Element Msg, c )
specialComponentFormField model component =
    let
        componentTuplet =
            component model.modelFormField
    in
    ( Element.map MsgFormField (Tuple.first <| componentTuplet)
    , Tuple.second <| componentTuplet
    )


specialComponentCards : Model -> (Card.Model -> ( Element Card.Msg, c )) -> ( Element Msg, c )
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
                specialComponentFormField model FormField.example1

            else if componentExample == text "special: FormFieldWithPattern.example1" then
                specialComponentFormFieldWithPattern model FormFieldWithPattern.example1

            else if componentExample == text "special: FormFieldWithPattern.example2" then
                specialComponentFormFieldWithPattern model FormFieldWithPattern.example2

            else if componentExample == text "special: FormFieldWithPattern.example3" then
                specialComponentFormFieldWithPattern model FormFieldWithPattern.example3

            else if componentExample == text "special: Cards.example1" then
                specialComponentCards model Card.example1

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
        [ spacing 16 ]
        [ column
            [ width fill
            , alignTop
            ]
            [ componentExampleToDisplay ]
        , sourceCodeWrapper model.conf componentExampleSourceCodeToDisplay
        ]


sourceCodeWrapper : Conf msg -> String -> Element Msg
sourceCodeWrapper configuration sourceCode =
    el
        [ width fill
        , Element.scrollbarX
        , Background.color <| Color.toElementColor configuration.gray3
        , Border.rounded 8
        ]
    <|
        el
            [ Font.family [ Font.monospace ]
            , Font.color <| Color.toElementColor configuration.gray9
            , Font.size 16
            , padding 16
            , htmlAttribute <| Html.Attributes.style "white-space" "pre"
            ]
        <|
            text sourceCode



-- SELF EXAMPLE


introspectionExample : String -> Introspection
introspectionExample id =
    { name = "Element " ++ id
    , signature = "Signature " ++ id
    , description = "Description " ++ id
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
        [-- 019 Window.resizes MsgChangeWindowSize
        ]



{-
   programWithFlags
       :  (Location -> msg)
       -> { init : flags -> Location -> (model, Cmd msg), update : msg -> model -> (model, Cmd msg), view : model -> Html msg, subscriptions : model -> Sub msg }
       -> Program flags model msg
-}
-- fromUrl : Url.Url -> Maybe Route


{-| -}
--main : Program Json.Decode.Value Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions

        , onUrlChange = MsgChangedUrl
        , onUrlRequest = MsgClickedLink

        --, onUrlChange = onUrlChange
        --, onUrlRequest = onUrlRequest
        -- onUrlChange : Url.Url -> Msg
        }

onUrlRequest : Browser.UrlRequest -> Msg
onUrlRequest _ =
  MsgNoOp

-- ROUTING


onUrlChange : Url.Url -> Msg
onUrlChange url =
    -- SetRoute (fromUrl url)
    MsgChangeUrl url


type Route
    = RouteHome
    | RouteSubPage Slug Slug


type Slug
    = Slug String


slugToString : Slug -> String
slugToString (Slug slug) =
    slug


slugParser : Url.Parser.Parser (Slug -> a) a
slugParser =
    Url.Parser.custom "SLUG" (Just << Slug)


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


fromUrl : Url.Url -> Maybe Route
fromUrl url =
    case url.fragment of
        Nothing ->
            Just RouteHome

        Just fragment ->
            fragmentToRoute fragment


type alias Docs =
    { name : String
    , value : Maybe String
    }


docs : Url.Parser.Parser (Docs -> a) a
docs =
    Url.Parser.map Docs (Url.Parser.string </> Url.Parser.fragment identity)


urlToRoute : Url.Url -> Route
urlToRoute url =
    let
        maybeRoute =
            Url.Parser.parse routeParser (fragmentAsPath url)
    in
    case maybeRoute of
        Nothing ->
            RouteHome

        Just route ->
            route


routeParser : Url.Parser.Parser (Route -> a) a
routeParser =
    Url.Parser.oneOf
        [ Url.Parser.map RouteSubPage
            (Url.Parser.s rootRoute
                </> slugParser
                </> slugParser
            )
        ]



{-
   fragmentToRoute : String -> Maybe Route
   fragmentToRoute fragment =
       let
           test =
               case Url.Parser.toUrl fragment of
                   Nothing ->
                       Nothing

                   Just segments ->
                       Url.Parser.parse routeParser segments
       in
       Just RouteHome
-}


fragmentToRoute : String -> Maybe Route
fragmentToRoute fragment =
    Just RouteHome


rootRoute : String
rootRoute =
    "framework"


fragmentAsPath : Url.Url -> Url.Url
fragmentAsPath url =
    case url.fragment of
        Nothing ->
            { url | path = "" }

        Just fragment ->
            { url | path = fragment }


maybeFragmentAsPath : Maybe Url.Url -> Maybe Url.Url
maybeFragmentAsPath maybeUrl =
    case maybeUrl of
        Nothing ->
            Nothing

        Just url ->
            Just <| fragmentAsPath url
