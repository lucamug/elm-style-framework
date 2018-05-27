module Framework.Icon
    exposing
        ( arrows
        , chevronDown
        , exitFullscreen
        , fullscreen
        , hide
        , home
        , introspection
        , mobileNotification
        , mobileNotification2
        , mobileRinging
        , pencil
        , show
        )

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Icons/Icons)


# Functions

@docs arrows, chevronDown, exitFullscreen, fullscreen, hide, home, introspection, mobileNotification, mobileNotification2, mobileRinging, pencil, show

-}

-- import Color

import Color
import Element
import Framework.Color exposing (black)
import Html.Attributes
import Svg
import Svg.Attributes as SA


{-| -}
introspection :
    { name : String
    , description : String
    , signature : String
    , variations : List ( String, List ( Element.Element msg1, String ) )
    }
introspection =
    { name = "Icons"
    , description = "List of SVG icons"
    , signature = "Color.Color -> Int -> Element.Element msg"
    , variations =
        [ ( "Icons"
          , [ ( pencil black 32, "pencil black 32" )
            , ( exitFullscreen black 32, "exitFullscreen black 32" )
            , ( fullscreen black 32, "fullscreen black 32" )
            , ( home black 32, "home black 32" )
            , ( hide black 32, "hide black 32" )
            , ( show black 32, "show black 32" )
            , ( mobileRinging black 32, "mobileRinging black 32" )
            , ( mobileNotification black 32, "mobileNotification black 32" )
            , ( mobileNotification2 black 32, "mobileNotification2 black 32" )
            , ( chevronDown black 32, "chevronDown black 32" )
            , ( arrows black 32, "arrows black 32" )
            ]
          )
        ]
    }


{-| -}
arrows : Color.Color -> Int -> Element.Element msg
arrows _ size =
    Element.html <|
        Svg.svg [ SA.viewBox "0 0 490 490", SA.height <| String.fromInt size ]
            [ Svg.path [ SA.d "M112 97c72-65 181-66 254-7l-58 3c-8 0-13 6-13 14 0 7 6 13 13 13h1l89-4c7 0 13-6 13-13v-2l-3-88a14 14 0 0 0-27 1l2 55c-36-29-81-47-129-49A222 222 0 0 0 27 294a13 13 0 0 0 17 10c7-2 11-9 9-16-16-70 6-143 59-191zm350 99a14 14 0 0 0-26 6 195 195 0 0 1-314 196l59-5a13 13 0 1 0-3-27l-88 8c-8 1-13 7-13 15l8 88c1 7 7 13 14 13h1c7-1 13-8 12-15l-5-54a221 221 0 0 0 289-8c60-55 86-138 66-217z" ] []
            ]


{-| -}
home : Color.Color -> Int -> Element.Element msg
home _ size =
    Element.html <|
        Svg.svg [ Html.Attributes.style "height" (String.fromInt size ++ "px"), SA.viewBox "0 0 34.94 32.63" ]
            [ Svg.path [ SA.d "M34.94 15.58L17.24 0 0 15.65l1.5 1.66 2.14-1.92v17.25h27.68V15.38l2.14 1.88zM14.8 29.93V21.6h5.35v8.34zm14.27.45H22.4v-11h-9.84v11H5.88v-17L17.25 3l11.82 10.4z", SA.fill "#262626", SA.id "_01" ] []
            ]


{-| -}
pencil : Color.Color -> Int -> Element.Element msg
pencil _ size =
    Element.html <|
        Svg.svg [ Html.Attributes.style "height" (String.fromInt size ++ "px"), SA.viewBox "0 0 529 529" ]
            [ Svg.path [ SA.d "M329 89l107 108-272 272L57 361 329 89zm189-26l-48-48a48 48 0 0 0-67 0l-46 46 108 108 53-54c14-14 14-37 0-52zM0 513c-2 9 6 16 15 14l120-29L27 391 0 513z" ] []
            ]


{-| -}
exitFullscreen : Color.Color -> Int -> Element.Element msg
exitFullscreen _ size =
    Element.html <|
        Svg.svg [ Html.Attributes.style "height" (String.fromInt size ++ "px"), SA.viewBox "0 0 32 32" ]
            [ Svg.path [ SA.fill "#030104", SA.d "M25 27l4 5 3-3-5-4 5-5H20v12zM0 12h12V0L7 5 3 0 0 3l5 4zm0 17l3 3 4-5 5 5V20H0l5 5zm20-17h12l-5-5 5-4-3-3-4 5-5-5z" ] []
            ]


{-| -}
fullscreen : Color.Color -> Int -> Element.Element msg
fullscreen _ size =
    Element.html <|
        Svg.svg [ Html.Attributes.style "height" (String.fromInt size ++ "px"), SA.viewBox "0 0 533 533" ]
            [ Svg.path [ SA.d "M533 0v217l-83-84-100 100-50-50L400 83 317 0h216zM233 350L133 450l84 83H0V317l83 83 100-100 50 50z" ] []
            ]


{-| -}
hide : Color.Color -> Int -> Element.Element msg
hide cl size =
    Element.html <|
        Svg.svg [ SA.viewBox "0 0 512 512", SA.height <| String.fromInt size, SA.width <| String.fromInt size ]
            [ Svg.path
                [ SA.fill
                    (Color.colorToHex cl)
                , SA.d
                    "M506 241l-89-89-14-13-258 258a227 227 0 0 0 272-37l89-89c8-8 8-22 0-30zM256 363a21 21 0 0 1 0-43c35 0 64-29 64-64a21 21 0 0 1 43 0c0 59-48 107-107 107zM95 152L6 241c-8 8-8 22 0 30l89 89 14 13 258-258c-86-49-198-37-272 37zm161 40c-35 0-64 29-64 64a21 21 0 0 1-43 0c0-59 48-107 107-107a21 21 0 0 1 0 43z"
                ]
                []
            ]


{-| -}
show : Color.Color -> Int -> Element.Element msg
show cl size =
    Element.html <|
        Svg.svg [ SA.viewBox "0 0 512 512", SA.height <| String.fromInt size, SA.width <| String.fromInt size ]
            [ Svg.path
                [ SA.fill
                    (Color.colorToHex cl)
                , SA.d
                    "M256 192a64 64 0 1 0 0 128 64 64 0 0 0 0-128zm250 49l-89-89c-89-89-233-89-322 0L6 241c-8 8-8 22 0 30l89 89a227 227 0 0 0 322 0l89-89c8-8 8-22 0-30zM256 363a107 107 0 1 1 0-214 107 107 0 0 1 0 214z"
                ]
                []
            ]


{-| -}
mobileNotification2 : Color.Color -> Int -> Element.Element msg
mobileNotification2 cl size =
    Element.html <|
        Svg.svg [ SA.viewBox "0 0 31.68 31.68", SA.height <| String.fromInt size ]
            [ Svg.path
                [ SA.fill
                    (Color.colorToHex cl)
                , SA.d "M21.5 25.67H7V3.89h14.5v4.7h1.73V2.3a2.3 2.3 0 0 0-2.3-2.3H7.58a2.3 2.3 0 0 0-2.3 2.3v27.08a2.3 2.3 0 0 0 2.3 2.3h13.33a2.3 2.3 0 0 0 2.3-2.3V19.2H21.5v6.46zM19.4 1.44c.33 0 .59.27.59.6s-.26.58-.59.58-.59-.26-.59-.59.26-.59.59-.59zm-8.24.23h6.19v.67h-6.19v-.67zm5.91 27.55h-5.63V27.5h5.63v1.73z"
                ]
                []
            , Svg.path
                [ SA.fill
                    (Color.colorToHex cl)
                , SA.d "M13.05 9.3v9h1.56L13.05 22l4.54-3.7h8.81v-9H13.05zm12.21 7.86H17.2l-.32.25-1 .81.45-1.06H14.2v-6.71h11.07v6.7z"
                ]
                []
            ]


{-| -}
mobileRinging : Color.Color -> Int -> Element.Element msg
mobileRinging cl size =
    let
        hexColor =
            Color.colorToHex cl
    in
    Element.html <|
        Svg.svg [ SA.viewBox "0 0 60 60", SA.height <| String.fromInt size ]
            [ Svg.path [ SA.fill hexColor, SA.d "M43 0H17c-2 0-4 2-4 4v52c0 2 2 4 4 4h26c2 0 4-2 4-4V4c0-2-2-4-4-4zM15 8h30v38H15V8zm2-6h26l2 2v2H15V4l2-2zm26 56H17l-2-2v-8h30v8l-2 2z" ] []
            , Svg.path [ SA.fill hexColor, SA.d "M30 49a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM26 5h4a1 1 0 1 0 0-2h-4a1 1 0 1 0 0 2zm7 0h1a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2zm24 0a1 1 0 1 0-2 1c4 4 4 10 0 14a1 1 0 1 0 2 1c4-5 4-12 0-16z" ] []
            , Svg.path [ SA.fill hexColor, SA.d "M52 7a1 1 0 1 0-1 1 7 7 0 0 1 0 10 1 1 0 1 0 1 1 8 8 0 0 0 0-12zM5 6a1 1 0 1 0-2-1c-4 4-4 11 0 16a1 1 0 0 0 2 0v-1C1 16 1 10 5 6z" ] []
            , Svg.path [ SA.fill hexColor, SA.d "M9 7H8a8 8 0 0 0 0 12 1 1 0 0 0 1 0v-2a7 7 0 0 1 0-9V7z" ] []
            ]


{-| -}
mobileNotification : Color.Color -> Int -> Element.Element msg
mobileNotification cl size =
    Element.html <|
        Svg.svg [ SA.viewBox "0 0 60 60", SA.height <| String.fromInt size ]
            [ Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M20 49a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM17 5h4a1 1 0 1 0 0-2h-4a1 1 0 1 0 0 2zm7 0h1a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2z" ] []
            , Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M56 12H38V4c0-2-2-4-4-4H8C6 0 4 2 4 4v52c0 2 2 4 4 4h26c2 0 4-2 4-4V33h18V12zM8 2h26l2 2v2H6V4l2-2zm26 56H8l-2-2v-8h30v8l-2 2zm2-12H6V8h30v4H18v21h4v7l9-7h5v13zm18-15H31l-7 5v-5h-4V14h34v17z" ] []
            , Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M25 21h10a1 1 0 1 0 0-2H25a1 1 0 1 0 0 2zm-1 4l1 1h24a1 1 0 1 0 0-2H25l-1 1z" ] []
            ]


{-| -}
chevronDown : Color.Color -> Int -> Element.Element msg
chevronDown _ size =
    Element.html <|
        Svg.svg [ SA.viewBox "0 0 256 256", SA.height <| String.fromInt size ]
            [ Svg.path
                [ SA.d "M225.81 48.9L128 146.73 30.19 48.91 0 79.09l128 128 128-128z"
                ]
                []
            ]
