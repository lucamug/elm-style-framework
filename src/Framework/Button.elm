module Framework.Button exposing (button, buttonAttr, buttonLink, buttonLinkWidth, buttonWidth, introspection)

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Buttons/States)


# Functions

@docs button, buttonAttr, buttonLink, buttonLinkWidth, buttonWidth, introspection

-}

import Color
import Element exposing (Attribute, Element, centerX, centerY, column, el, inFront, link, mouseOver, paddingXY, row, spacing, text)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Framework.Color exposing (color)
import Framework.Modifier exposing (Modifier(..))
import Framework.Spinner as Spinner
import Html.Attributes


{-| -}
introspection :
    { boxed : Bool
    , description : String
    , name : String
    , signature : String
    , usage : String
    , usageResult : Element a
    , variations : List ( String, List ( Element a1, String ) )
    }
introspection =
    let
        buttonText =
            "Button"
    in
    { name = "Buttons"
    , signature = "button : List Modifier -> Maybe msg -> String -> Element msg"
    , description = "Buttons accept a list of modifiers, a Maybe msg (for example: \"Just DoSomething\") and the text to display inside the button."
    , usage = "button [ Medium, Success, Outlined ] Nothing \"" ++ buttonText ++ "\""
    , usageResult = button [ Medium, Success, Outlined ] Nothing buttonText
    , boxed = False
    , variations =
        [ ( "States"
          , [ ( button [ Primary ] Nothing buttonText, "button [ Primary ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Primary, Outlined ] Nothing buttonText, "button [ Primary, Outlined ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Primary, Loading ] Nothing buttonText, "button [ Primary, Loading ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Primary, Waiting ] Nothing buttonText, "button [ Primary, Waiting ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Primary, Disabled ] Nothing buttonText, "button [ Primary, Disabled ] Nothing \"" ++ buttonText ++ "\"" )
            ]
          )
        , ( "Colors"
          , [ ( button [ Muted ] Nothing buttonText, "button [ Muted ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Primary ] Nothing buttonText, "button [ Primary ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Success ] Nothing buttonText, "button [ Success ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Info ] Nothing buttonText, "button [ Info ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Warning ] Nothing buttonText, "button [ Warning ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Danger ] Nothing buttonText, "button [ Danger ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [] Nothing buttonText, "button [] Nothing \"" ++ buttonText ++ "\"" )
            ]
          )
        , ( "Sizes"
          , [ ( button [ Small ] Nothing buttonText, "button [ Small ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [] Nothing buttonText, "button [] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Medium ] Nothing buttonText, "button [ Medium ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Large ] Nothing buttonText, "button [ Large ] Nothing \"" ++ buttonText ++ "\"" )
            ]
          )
        , ( "Composed"
          , [ ( Input.button (buttonAttr [ Primary ]) <|
                    { onPress = Nothing, label = text "button" }
              , """-- This is the longest form for
-- button [ Primary ] Nothing "Button"

Input.button (buttonAttr [ Primary ]) <|
    { onPress = Nothing, label = text "Button" }"""
              )
            , ( el (buttonAttr [ Primary ]) <|
                    text "Button"
              , """-- Is possible to use the button
-- styling also with other elements,
-- for example with "el":

el (buttonAttr [ Primary ]) <|
    text "Button\""""
              )
            , ( el (buttonAttr [ Danger, Outlined, Medium ]) <| text "Button", "el (buttonAttr [ Danger, Outlined, Medium ]) <| text \"Button\"" )
            , ( column (buttonAttr [ Warning ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ], """column (buttonAttr [ Warning ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ]""" )
            , ( column (buttonAttr [ Warning, Waiting ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ], """column (buttonAttr [ Warning, Waiting ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ]""" )
            , ( row (buttonAttr [ Info ] ++ [ spacing 10 ]) [ text "Col 1", text "Col 2" ], """row (buttonAttr [ Info ] ++ [ spacing 10 ]) [ text "Col 1", text "Col 2" ]""" )
            , ( Input.button (buttonAttr [ Primary, Danger ]) <|
                    { onPress = Nothing, label = text "button" }
              , """-- If conflicting modifiers are given,
-- only the last one is taken in consideration

Input.button (buttonAttr [ Primary, Danger ]) <|
    { onPress = Nothing, label = text "button" }"""
              )
            ]
          )
        , ( "Button Link"
          , [ ( buttonLink [] "http://example.com" "Button Link", """( buttonLink [ Small ] "http://example.com" "Button Link" """ )
            ]
          )
        , ( "Button Width"
          , [ ( button [] Nothing "Button", """button [] Nothing "Button" """ )
            , ( buttonWidth [] Nothing "ButtonWidth 200" 200, """buttonWidth [] Nothing "ButtonWidth 200" 200""" )
            , ( buttonWidth [] Nothing "ButtonWidth 300" 300, """buttonWidth [] Nothing "ButtonWidth 300" 300""" )
            , ( buttonWidth [] Nothing "ButtonWidth of 200px with very long text" 200, """buttonWidth [] Nothing "ButtonWidth of 200px with very long text" 200""" )
            , ( buttonLinkWidth [] "http://example.com" "ButtonWidthLink 300" 300, """buttonLinkWidth [] "http://example.com" "ButtonWidthLink 300" 300""" )
            ]
          )
        ]
    }


type Size
    = SizeSmall
    | SizeDefault
    | SizeMedium
    | SizeLarge


type State
    = StateDefault
    | StateOutlined
    | StateLoading
    | StateWaiting
    | StateDisabled


type alias Conf =
    { color : Color.Color
    , size : Size
    , state : State
    }


toPx : Size -> Int
toPx size =
    case size of
        SizeSmall ->
            12

        SizeDefault ->
            16

        SizeMedium ->
            20

        SizeLarge ->
            24


toButtonPadding : Size -> ( Int, Int )
toButtonPadding size =
    case size of
        SizeSmall ->
            ( 9, 3 )

        SizeDefault ->
            ( 12, 5 )

        SizeMedium ->
            ( 15, 7 )

        SizeLarge ->
            ( 18, 9 )


processConf : Modifier -> Conf -> Conf
processConf modifier conf =
    case modifier of
        -- Colors
        Muted ->
            { conf | color = color.muted }

        Primary ->
            { conf | color = color.primary }

        Success ->
            { conf | color = color.success }

        Info ->
            { conf | color = color.info }

        Warning ->
            { conf | color = color.warning }

        Danger ->
            { conf | color = color.danger }

        -- SIZES
        Small ->
            { conf | size = SizeSmall }

        Medium ->
            { conf | size = SizeMedium }

        Large ->
            { conf | size = SizeLarge }

        -- STATES
        Outlined ->
            { conf | state = StateOutlined }

        Loading ->
            { conf | state = StateLoading }

        Waiting ->
            { conf | state = StateWaiting }

        Disabled ->
            { conf | state = StateDisabled }


{-| Generate an Input.button element

    button [ Medium, Success, Outlined ] Nothing "Button"

-}
button : List Modifier -> Maybe msg -> String -> Element msg
button modifiers onPress label =
    Input.button
        (buttonAttr modifiers)
        { onPress = onPress
        , label = text label
        }


extraAttrForButtonWidth : Int -> List (Attribute msg)
extraAttrForButtonWidth buttonWidth =
    [ Element.htmlAttribute (Html.Attributes.style [ ( "width", "100%" ) ])
    , Element.htmlAttribute (Html.Attributes.style [ ( "max-width", toString buttonWidth ++ "px" ) ])
    , Font.center
    , centerX
    ]


{-| -}
buttonWidth : List Modifier -> Maybe msg -> String -> Int -> Element msg
buttonWidth modifiers onPress label buttonWidth =
    Input.button
        (buttonAttr modifiers
            ++ extraAttrForButtonWidth buttonWidth
        )
        { onPress = onPress
        , label = text label
        }


{-| -}
buttonLink : List Modifier -> String -> String -> Element msg
buttonLink modifiers url label =
    link
        (buttonAttr modifiers)
        { url = url
        , label = text label
        }


{-| -}
buttonLinkWidth : List Modifier -> String -> String -> Int -> Element msg
buttonLinkWidth modifiers url label buttonWidth =
    link
        (buttonAttr modifiers
            ++ extraAttrForButtonWidth buttonWidth
        )
        { url = url
        , label = text label
        }


colorDefault : Color.Color
colorDefault =
    color.white


colorBorderDefault : Color.Color
colorBorderDefault =
    color.grey_lighter


{-| Generate a list of attributes that can be attached to any element

    row (buttonAttr [ Info ] ++ [ spacing 10 ]) [ text "Col 1", text "Col 2" ]

-}
buttonAttr : List Modifier -> List (Attribute msg)
buttonAttr modifiers =
    let
        conf =
            List.foldl processConf
                { color = colorDefault
                , size = SizeDefault
                , state = StateDefault
                }
                modifiers

        cc =
            conf.color

        fontSize =
            toPx conf.size

        buttonPadding =
            toButtonPadding conf.size

        backgroundMouseOverColor =
            case conf.state of
                StateOutlined ->
                    cc

                _ ->
                    backgroundColor
                        |> Framework.Color.lighten 0.8
                        |> Framework.Color.saturate 0.9

        borderMouseOverColor =
            borderColor
                |> Framework.Color.lighten 0.8
                |> Framework.Color.saturate 0.9

        fontMouseOverColor =
            case conf.state of
                StateLoading ->
                    color.transparent

                StateWaiting ->
                    color.transparent

                StateOutlined ->
                    color.white

                _ ->
                    fontColor
                        |> Framework.Color.lighten 0.8
                        |> Framework.Color.saturate 0.9

        backgroundColor =
            case conf.state of
                StateDefault ->
                    cc

                StateOutlined ->
                    if conf.color == color.white then
                        colorBorderDefault
                    else
                        color.transparent

                StateLoading ->
                    cc

                StateWaiting ->
                    cc

                StateDisabled ->
                    cc
                        |> Framework.Color.lighten 1.2
                        |> Framework.Color.saturate 0.9

        borderRounded =
            case conf.size of
                SizeSmall ->
                    2

                _ ->
                    3

        borderColor =
            if conf.color == color.white then
                colorBorderDefault
            else
                case conf.state of
                    StateOutlined ->
                        cc

                    _ ->
                        backgroundColor

        spinnerColor =
            if conf.color == color.white then
                color.grey_dark
            else
                color.white

        fontColor =
            case conf.state of
                StateOutlined ->
                    cc

                StateLoading ->
                    color.transparent

                StateWaiting ->
                    color.transparent

                _ ->
                    if conf.color == color.white then
                        color.grey_dark
                    else
                        color.white

        inFrontAddon =
            case conf.state of
                StateLoading ->
                    [ inFront
                        (el [ centerY, centerX ] <|
                            Spinner.spinner Spinner.Rotation fontSize spinnerColor
                        )
                    ]

                StateWaiting ->
                    [ inFront
                        (el [ centerY, centerX ] <|
                            Spinner.spinner Spinner.ThreeCircles fontSize spinnerColor
                        )
                    ]

                _ ->
                    []
    in
    [ Font.size fontSize
    , Font.color fontColor
    , mouseOver
        [ Font.color fontMouseOverColor
        , Background.color backgroundMouseOverColor
        , Border.color borderMouseOverColor
        ]
    , Background.color backgroundColor
    , paddingXY (Tuple.first buttonPadding) (Tuple.second buttonPadding)
    , Border.rounded borderRounded
    , Border.width 1
    , Border.color borderColor
    ]
        ++ inFrontAddon
