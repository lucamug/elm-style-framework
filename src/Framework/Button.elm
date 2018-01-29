module Framework.Button exposing (button, buttonAttr, introspection)

{-| Buttons generator

See the [Style Guide](https://lucamug.github.io/elm-style-framework/) to see usage examples.


# Functions

@docs button, buttonAttr, introspection

-}

import Color.Manipulate
import Element
    exposing
        ( Attribute
        , Element
        , centerY
        , column
        , el
        , empty
        , fill
        , inFront
        , paddingXY
        , paragraph
        , row
        , spacing
        , text
        , width
        )
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Framework exposing (..)
import Framework.Color as Color
import Framework.Spinner as Spinner
import Styleguide


{-| Used to generate the [Style Guide](https://lucamug.github.io/elm-style-framework/)
-}
introspection : Styleguide.Data msg
introspection =
    let
        buttonText =
            "Button"
    in
    { name = "Button"
    , signature = "button : List Modifier -> Maybe msg -> String -> Element msg"
    , description = "Buttons accept a list of modifiers, a Maybe msg (for example: \"Just DoSomething\") and the text to display inside the button."
    , usage = "button [ Medium, Success, Outlined ] Nothing \"" ++ buttonText ++ "\""
    , usageResult = button [ Medium, Success, Outlined ] Nothing buttonText
    , boxed = False
    , types =
        [ ( "Sizes"
          , [ ( button [ Small ] Nothing buttonText, "button [ Small ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [] Nothing buttonText, "button [] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Medium ] Nothing buttonText, "button [ Medium ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Large ] Nothing buttonText, "button [ Large ] Nothing \"" ++ buttonText ++ "\"" )
            ]
          )
        , ( "Colors"
          , [ ( button [] Nothing buttonText, "button [] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Primary ] Nothing buttonText, "button [ Primary ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Link ] Nothing buttonText, "button [ Link ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Info ] Nothing buttonText, "button [ Info ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Success ] Nothing buttonText, "button [ Success ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Warning ] Nothing buttonText, "button [ Warning ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Danger ] Nothing buttonText, "button [ Danger ] Nothing \"" ++ buttonText ++ "\"" )
            ]
          )
        , ( "States"
          , [ ( button [ Danger ] Nothing buttonText, "button [ Danger ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Danger, Outlined ] Nothing buttonText, "button [ Danger, Outlined ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Danger, Loading ] Nothing buttonText, "button [ Danger, Loading ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Danger, Waiting ] Nothing buttonText, "button [ Danger, Waiting ] Nothing \"" ++ buttonText ++ "\"" )
            , ( button [ Danger, Disabled ] Nothing buttonText, "button [ Danger, Disabled ] Nothing \"" ++ buttonText ++ "\"" )
            ]
          )
        , ( "Usage with others elements"
          , [ ( paragraph [] [ text "The example above are just shortcuts for" ], "" )
            , ( Input.button (buttonAttr [ Primary ]) <| { onPress = Nothing, label = text "button" }, "Input.button (buttonAttr [ Primary ]) <| { onPress = Nothing, label = text \"Button\" }" )
            , ( paragraph [] [ text "so it is possible to use the button styling also with other elements, for example:" ], "" )
            , ( el (buttonAttr [ Primary ]) <| text "Button", "el (buttonAttr [ Primary ]) <| text \"Button\"" )
            , ( el (buttonAttr [ Danger, Outlined, Medium ]) <| text "Button", "el (buttonAttr [ Danger, Outlined, Medium ]) <| text \"Button\"" )
            , ( column (buttonAttr [ Warning ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ], """column (buttonAttr [ Warning ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ]""" )
            , ( column (buttonAttr [ Warning, Waiting ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ], """column (buttonAttr [ Warning, Waiting ] ++ [ spacing 10 ]) [ text "Row 1", text "Row 2" ]""" )
            , ( row (buttonAttr [ Info ] ++ [ spacing 10 ]) [ text "Col 1", text "Col 2" ], """row (buttonAttr [ Info ] ++ [ spacing 10 ]) [ text "Col 1", text "Col 2" ]""" )
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
            ( 9, 4 )

        SizeDefault ->
            ( 12, 5 )

        SizeMedium ->
            ( 15, 6 )

        SizeLarge ->
            ( 18, 7 )


processConf : Modifier -> Conf -> Conf
processConf modifier conf =
    case modifier of
        Primary ->
            { conf | color = Color.ColorPrimary }

        Link ->
            { conf | color = Color.ColorLink }

        Info ->
            { conf | color = Color.ColorInfo }

        Success ->
            { conf | color = Color.ColorSuccess }

        Warning ->
            { conf | color = Color.ColorWarning }

        Danger ->
            { conf | color = Color.ColorDanger }

        Small ->
            { conf | size = SizeSmall }

        Medium ->
            { conf | size = SizeMedium }

        Large ->
            { conf | size = SizeLarge }

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


{-| Generate a list of attributes that can be attached to any element

    row (buttonAttr [ Info ] ++ [ spacing 10 ]) [ text "Col 1", text "Col 2" ]

-}
buttonAttr : List Modifier -> List (Attribute msg)
buttonAttr modifiers =
    let
        conf =
            List.foldl processConf
                { color = Color.ColorDefault
                , size = SizeDefault
                , state = StateDefault
                }
                modifiers

        color =
            Color.toColor conf.color

        fontSize =
            toPx conf.size

        buttonPadding =
            toButtonPadding conf.size

        backgroundColor =
            case conf.state of
                StateDefault ->
                    color

                StateOutlined ->
                    case conf.color of
                        Color.ColorDefault ->
                            Color.toColor Color.ColorBorderDefault

                        _ ->
                            Color.toColor Color.ColorDefault

                StateLoading ->
                    color

                StateWaiting ->
                    color

                StateDisabled ->
                    color
                        |> Color.Manipulate.lighten 0.2
                        |> Color.Manipulate.desaturate 0.1

        borderRounded =
            case conf.size of
                SizeSmall ->
                    2

                _ ->
                    3

        borderColor =
            case conf.color of
                Color.ColorDefault ->
                    Color.toColor Color.ColorBorderDefault

                _ ->
                    case conf.state of
                        StateOutlined ->
                            color

                        _ ->
                            backgroundColor

        spinnerColor =
            case conf.color of
                Color.ColorWarning ->
                    Color.toColor Color.ColorFontDark

                Color.ColorDefault ->
                    Color.toColor Color.ColorFontDark

                _ ->
                    Color.toColor Color.ColorFontBright

        fontColor =
            case conf.state of
                StateOutlined ->
                    color

                StateLoading ->
                    backgroundColor

                StateWaiting ->
                    backgroundColor

                _ ->
                    case conf.color of
                        Color.ColorWarning ->
                            Color.toColor Color.ColorFontDark

                        Color.ColorDefault ->
                            Color.toColor Color.ColorFontDark

                        _ ->
                            Color.toColor Color.ColorFontBright

        inFrontAddon =
            case conf.state of
                StateLoading ->
                    [ inFront True
                        (el [ centerY ] <|
                            Spinner.spinner Spinner.Rotation fontSize spinnerColor
                        )
                    ]

                StateWaiting ->
                    [ inFront True
                        (el [ centerY ] <|
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
        ++ inFrontAddon
