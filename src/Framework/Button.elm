module Framework.Button exposing (button, buttonAttr, buttonLink, buttonLinkWidth, buttonWidth, introspection)

{-| [Demo](https://lucamug.github.io/elm-style-framework/framework.html)


# Functions

@docs button, buttonAttr, buttonLink, buttonLinkWidth, buttonWidth, introspection

-}

import Color
import Element exposing (Attribute, Element, centerX, centerY, column, el, htmlAttribute, inFront, link, mouseOver, paddingXY, row, spacing, text)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Framework.Color
import Framework.ColorManipulation
import Framework.Configuration exposing (conf)
import Framework.Modifier exposing (Modifier(..))
import Framework.Spinner as Spinner
import Html.Attributes


{-| -}
introspection :
    { name : String
    , description : String
    , signature : String
    , variations : List ( String, List ( Element a1, String ) )
    }
introspection =
    let
        buttonText =
            "Button"
    in
    { name = "Buttons"
    , description = "Buttons accept a list of modifiers, a Maybe msg (for example: \"Just DoSomething\") and the text to display inside the button."
    , signature = "List Modifier -> Maybe msg -> String -> Element msg"
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
            , ( button [ Jumbo ] Nothing buttonText, "button [ Jumbo ] Nothing \"" ++ buttonText ++ "\"" )
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
        , ( "Disabled"
          , [ ( button [ Disabled, Muted ] Nothing buttonText, "button [ Muted ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Disabled, Primary ] Nothing buttonText, "button [ Primary ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Disabled, Success ] Nothing buttonText, "button [ Success ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Disabled, Info ] Nothing buttonText, "button [ Info ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Disabled, Warning ] Nothing buttonText, "button [ Warning ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Disabled, Danger ] Nothing buttonText, "button [ Danger ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Disabled ] Nothing buttonText, "button [] Nothing \"" ++ buttonText ++ "\"" )
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
    | SizeJumbo


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
            conf.button.fontSmall

        SizeDefault ->
            conf.button.fontDefault

        SizeMedium ->
            conf.button.fontMedium

        SizeLarge ->
            conf.button.fontLarge

        SizeJumbo ->
            conf.button.fontJumbo


toButtonPadding : Size -> ( Int, Int )
toButtonPadding size =
    case size of
        SizeSmall ->
            ( conf.button.paddingXSmall, conf.button.paddingYSmall )

        SizeDefault ->
            ( conf.button.paddingXDefault, conf.button.paddingYDefault )

        SizeMedium ->
            ( conf.button.paddingXMedium, conf.button.paddingYMedium )

        SizeLarge ->
            ( conf.button.paddingXLarge, conf.button.paddingYLarge )

        SizeJumbo ->
            ( conf.button.paddingXJumbo, conf.button.paddingYJumbo )


processConf : Modifier -> Conf -> Conf
processConf modifier confButton =
    case modifier of
        -- Colors
        Muted ->
            { confButton | color = Framework.Color.muted }

        Primary ->
            { confButton | color = Framework.Color.primary }

        Success ->
            { confButton | color = Framework.Color.success }

        Info ->
            { confButton | color = Framework.Color.info }

        Warning ->
            { confButton | color = Framework.Color.warning }

        Danger ->
            { confButton | color = Framework.Color.danger }

        -- SIZES
        Small ->
            { confButton | size = SizeSmall }

        Medium ->
            { confButton | size = SizeMedium }

        Large ->
            { confButton | size = SizeLarge }

        Jumbo ->
            { confButton | size = SizeJumbo }

        -- STATES
        Outlined ->
            { confButton | state = StateOutlined }

        Loading ->
            { confButton | state = StateLoading }

        Waiting ->
            { confButton | state = StateWaiting }

        Disabled ->
            { confButton | state = StateDisabled }


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
    Framework.Color.white


colorBorderDefault : Color.Color
colorBorderDefault =
    Framework.Color.grey_lighter


{-| Generate a list of attributes that can be attached to any element

    row (buttonAttr [ Info ] ++ [ spacing 10 ]) [ text "Col 1", text "Col 2" ]

-}
buttonAttr : List Modifier -> List (Attribute msg)
buttonAttr modifiers =
    let
        confButton =
            List.foldl processConf
                { color = colorDefault
                , size = SizeDefault
                , state = StateDefault
                }
                modifiers

        cc =
            confButton.color

        fontSize =
            toPx confButton.size

        buttonPadding =
            toButtonPadding confButton.size

        backgroundMouseOverColor =
            case confButton.state of
                StateOutlined ->
                    cc

                _ ->
                    backgroundColor
                        |> Framework.ColorManipulation.lighten 0.8
                        |> Framework.ColorManipulation.saturate 0.9

        borderMouseOverColor =
            borderColor
                |> Framework.ColorManipulation.lighten 0.8
                |> Framework.ColorManipulation.saturate 0.9

        fontMouseOverColor =
            case confButton.state of
                StateLoading ->
                    Framework.Color.transparent

                StateWaiting ->
                    Framework.Color.transparent

                StateOutlined ->
                    Framework.Color.white

                _ ->
                    fontColor
                        |> Framework.ColorManipulation.lighten 0.8
                        |> Framework.ColorManipulation.saturate 0.9

        backgroundColor =
            case confButton.state of
                StateDefault ->
                    cc

                StateOutlined ->
                    if confButton.color == Framework.Color.white then
                        colorBorderDefault
                    else
                        Framework.Color.transparent

                StateLoading ->
                    cc

                StateWaiting ->
                    cc

                StateDisabled ->
                    cc
                        |> Framework.ColorManipulation.lighten 1.1
                        |> Framework.ColorManipulation.saturate 0.4

        borderRounded =
            case confButton.size of
                SizeSmall ->
                    2

                _ ->
                    3

        borderColor =
            if confButton.color == Framework.Color.white then
                colorBorderDefault
            else
                case confButton.state of
                    StateOutlined ->
                        cc

                    _ ->
                        backgroundColor

        spinnerColor =
            if confButton.color == Framework.Color.white then
                Framework.Color.grey_dark
            else
                Framework.Color.white

        fontColor =
            case confButton.state of
                StateOutlined ->
                    cc

                StateLoading ->
                    Framework.Color.transparent

                StateWaiting ->
                    Framework.Color.transparent

                _ ->
                    if confButton.color == Framework.Color.white then
                        Framework.Color.grey_dark
                    else
                        Framework.Color.white

        inFrontAddon =
            case confButton.state of
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
    , Background.color backgroundColor
    , paddingXY (Tuple.first buttonPadding) (Tuple.second buttonPadding)
    , Border.rounded borderRounded
    , Border.width 1
    , Border.color borderColor
    ]
        ++ (if confButton.state == StateDisabled then
                [ htmlAttribute <| Html.Attributes.style [ ( "cursor", "not-allowed" ) ]
                ]
            else
                [ mouseOver
                    [ Font.color fontMouseOverColor
                    , Background.color backgroundMouseOverColor
                    , Border.color borderMouseOverColor
                    ]
                ]
           )
        ++ inFrontAddon
