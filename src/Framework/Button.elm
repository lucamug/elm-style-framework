module Framework.Button exposing (button, buttonAttr, introspection)

{-| Buttons generator


# Functions

@docs button, buttonAttr, introspection

-}

--import Color.Manipulate

import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Framework.Color as Color
import Framework.Modifiers as Modifiers exposing (..)
import Framework.Spinner as Spinner


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
            ( 10, 4 )

        SizeDefault ->
            ( 40, 8 )

        SizeMedium ->
            ( 40, 20 )

        SizeLarge ->
            ( 18, 7 )


processConf : Modifier -> Conf -> Conf
processConf modifier conf =
    case modifier of
        -- Colors
        Muted ->
            { conf | color = Color.Muted }

        Primary ->
            { conf | color = Color.Primary }

        Success ->
            { conf | color = Color.Success }

        Info ->
            { conf | color = Color.Info }

        Warning ->
            { conf | color = Color.Warning }

        Danger ->
            { conf | color = Color.Danger }

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


colorDefault : Color.Color
colorDefault =
    Color.White


colorBorderDefault : Color.Color
colorBorderDefault =
    Color.GrayLighter


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

        color =
            Color.color conf.color

        fontSize =
            toPx conf.size

        buttonPadding =
            toButtonPadding conf.size

        backgroundMouseOverColor =
            case conf.state of
                StateOutlined ->
                    color

                _ ->
                    backgroundColor
                        |> Color.lighten 0.8
                        |> Color.saturate 0.9

        borderMouseOverColor =
            borderColor
                |> Color.lighten 0.8
                |> Color.saturate 0.9

        fontMouseOverColor =
            case conf.state of
                StateLoading ->
                    Color.color Color.Transparent

                StateWaiting ->
                    Color.color Color.Transparent

                StateOutlined ->
                    Color.color Color.White

                _ ->
                    fontColor
                        |> Color.lighten 0.8
                        |> Color.saturate 0.9

        backgroundColor =
            case conf.state of
                StateDefault ->
                    color

                StateOutlined ->
                    case conf.color of
                        Color.White ->
                            Color.color colorBorderDefault

                        _ ->
                            Color.color Color.Transparent

                StateLoading ->
                    color

                StateWaiting ->
                    color

                StateDisabled ->
                    color
                        |> Color.lighten 1.2
                        |> Color.saturate 0.9

        borderRounded =
            case conf.size of
                SizeSmall ->
                    2

                _ ->
                    3

        borderColor =
            case conf.color of
                Color.White ->
                    Color.color colorBorderDefault

                _ ->
                    case conf.state of
                        StateOutlined ->
                            color

                        _ ->
                            backgroundColor

        spinnerColor =
            case conf.color of
                Color.White ->
                    Color.color Color.GrayDark

                _ ->
                    Color.color Color.White

        fontColor =
            case conf.state of
                StateOutlined ->
                    color

                StateLoading ->
                    Color.color Color.Transparent

                StateWaiting ->
                    Color.color Color.Transparent

                _ ->
                    case conf.color of
                        Color.White ->
                            Color.color Color.GrayDark

                        _ ->
                            Color.color Color.White

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
