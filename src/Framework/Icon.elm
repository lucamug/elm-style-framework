module Framework.Icon exposing
    ( arrows, chevronDown, exitFullscreen, fullscreen, hide, home, introspection, mobileNotification, mobileNotification2, mobileRinging, pencil, show
    , blackFlag, blackFlag_, blackStar, blackStar_, circle, circle_, edit, edit_, exclamation, exclamation_, featureFlag, featureFlag_, smile, smile_, userVerification, userVerification_, whiteFlag, whiteFlag_, whiteStar, whiteStar_, whitelist, whitelist_
    )

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Icons/Icons)


# Functions

@docs arrows, chevronDown, exitFullscreen, fullscreen, hide, home, introspection, mobileNotification, mobileNotification2, mobileRinging, pencil, show

-}

-- import Color

import Color
import Element
import Framework.Color exposing (black)
import Html
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
            , ( circle black 32, "circle black 32" )
            , ( smile black 32, "smile black 32" )
            , ( exclamation black 32, "exclamation black 32" )
            , ( edit black 32, "edit black 32" )
            , ( userVerification black 32, "userVerification black 32" )
            , ( featureFlag black 32, "featureFlag black 32" )
            , ( blackFlag black 32, "blackFlag black 32" )
            , ( whiteFlag black 32, "whiteFlag black 32" )
            , ( whiteStar black 32, "whiteStar black 32" )
            , ( blackStar black 32, "blackStar black 32" )
            , ( whitelist black 32, "whitelist black 32" )
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
        Svg.svg [ SA.viewBox "0 0 512 512", SA.height <| String.fromInt size ]
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
        Svg.svg [ SA.viewBox "0 0 512 512", SA.height <| String.fromInt size ]
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


{-| -}
circle_ : Color.Color -> Int -> Html.Html msg
circle_ cl size =
    Svg.svg [ SA.viewBox "0 0 100 100", SA.height <| String.fromInt size ]
        [ Svg.circle
            [ SA.fill (Color.colorToHex cl), SA.cx "50", SA.cy "50", SA.r "50" ]
            []
        ]


{-| -}
circle : Color.Color -> Int -> Element.Element msg
circle cl size =
    Element.html <|
        circle_ cl size


{-| -}
smile_ : Color.Color -> Int -> Html.Html msg
smile_ cl size =
    Svg.svg [ SA.viewBox "0 0 559 559", SA.height <| String.fromInt size ]
        [ Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M315 429h-49c-62 0-110-48-110-109a13 13 0 0 1 27 0c0 46 36 82 83 82h49c46 0 83-35 83-80a13 13 0 1 1 27 0c0 60-48 107-110 107zm-88-224c-3 0-7-1-9-4a33 33 0 0 0-46-1 13 13 0 1 1-19-19c22-23 61-22 84 1a13 13 0 0 1-10 23zm183 0c-3 0-6-1-9-4a33 33 0 0 0-46-1 13 13 0 1 1-19-19c22-23 61-22 84 1a13 13 0 0 1-10 23z" ] []
        , Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M280 559a280 280 0 1 1 0-560 280 280 0 0 1 0 560zm0-532a253 253 0 1 0 0 506 253 253 0 0 0 0-506z" ] []
        ]


{-| -}
smile : Color.Color -> Int -> Element.Element msg
smile cl size =
    Element.html <|
        smile_ cl size


exclamation_ : Color.Color -> Int -> Html.Html msg
exclamation_ cl size =
    Svg.svg [ SA.viewBox "0 0 612 612", SA.height <| String.fromInt size ]
        [ Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M605 502L350 60a51 51 0 0 0-88 0L7 502a51 51 0 0 0 44 76h510a51 51 0 0 0 44-76zM51 527L306 85l255 442H51zm255-119a34 34 0 1 0 0 68 34 34 0 0 0 0-68zm-34-153v6l17 99a17 17 0 0 0 34 0l17-99v-6a34 34 0 0 0-68 0z" ] []
        ]


exclamation : Color.Color -> Int -> Element.Element msg
exclamation cl size =
    Element.html <|
        exclamation_ cl size


edit : Color.Color -> Int -> Element.Element msg
edit cl size =
    Element.html <|
        edit_ cl size


edit_ : Color.Color -> Int -> Html.Html msg
edit_ cl size =
    Svg.svg [ SA.viewBox "0 0 490 490", SA.height <| String.fromInt size ]
        [ Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M230 145l-48 48-52 53c-4 4-7 9-8 15l-19 87-3 16c-2 7 0 15 5 20 4 5 10 7 16 7l5-1 18-3 84-18c6-1 12-4 17-9l235-236c6-6 10-13 10-21v-4l-1-6-5-17c-15-33-39-57-73-71-6-3-13-3-20-4h-1c-9-2-17 1-25 9L230 145zM386 25h3c5 0 10 1 13 3 28 11 48 30 60 58l3 11 1 5-3 5-236 235-4 3-84 17-15 3 3-13 18-86 2-3 53-53 47-47L383 27l3-2z" ] []
        , Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M39 109h175a12 12 0 1 0 0-24H39c-22 0-39 17-39 39v327c0 22 18 39 39 39h327c22 0 39-18 39-39V284a12 12 0 1 0-24 0v167c0 8-7 14-15 14H39c-8 0-15-6-15-14V124c1-8 7-15 15-15z" ] []
        ]


userVerification : Color.Color -> Int -> Element.Element msg
userVerification cl size =
    Element.html <|
        userVerification_ cl size


userVerification_ : Color.Color -> Int -> Html.Html msg
userVerification_ cl size =
    Svg.svg [ SA.viewBox "0 0 512 512", SA.height <| String.fromInt size ]
        [ Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M336 32h-35a48 48 0 0 0-90 0h-35c-9 0-16 7-16 16v32c0 9 7 16 16 16h160c9 0 16-7 16-16V48c0-9-7-16-16-16z" ] []
        , Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M416 64h-32v16c0 26-22 48-48 48H176c-26 0-48-22-48-48V64H96c-18 0-32 14-32 32v384c0 18 14 32 32 32h320c18 0 32-14 32-32V96c0-18-14-32-32-32zM256 192a64 64 0 1 1 0 128 64 64 0 0 1 0-128zm128 240c0 9-7 16-16 16H144c-9 0-16-7-16-16v-32c0-6 3-11 8-14 74-46 166-46 240 0 5 3 8 8 8 14v32z" ] []
        ]


featureFlag : Color.Color -> Int -> Element.Element msg
featureFlag cl size =
    Element.html <|
        featureFlag_ cl size


featureFlag_ : Color.Color -> Int -> Html.Html msg
featureFlag_ cl size =
    Svg.svg [ SA.viewBox "0 0 60 60", SA.height <| String.fromInt size ]
        [ Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M51 23L10 3V1a1 1 0 1 0-2 0v58a1 1 0 1 0 2 0V41l41-17a1 1 0 0 0 0-1z" ] []
        ]


blackFlag : Color.Color -> Int -> Element.Element msg
blackFlag cl size =
    Element.html <|
        blackFlag_ cl size


blackFlag_ : Color.Color -> Int -> Html.Html msg
blackFlag_ cl size =
    Svg.svg [ SA.viewBox "0 0 512 512", SA.height <| String.fromInt size ]
        [ Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M427 43H107V21a21 21 0 1 0-43 0v470a21 21 0 1 0 43 0V341h320c11 0 21-9 21-21V64c0-12-10-21-21-21z" ] []
        ]


whiteFlag : Color.Color -> Int -> Element.Element msg
whiteFlag cl size =
    Element.html <|
        whiteFlag_ cl size


whiteFlag_ : Color.Color -> Int -> Html.Html msg
whiteFlag_ cl size =
    Svg.svg [ SA.viewBox "0 0 464 464", SA.height <| String.fromInt size ]
        [ Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M388 10H104V5c0-3-2-5-5-5H76c-3 0-5 2-5 5v454c0 3 2 5 5 5h23c3 0 5-2 5-5V205h284c3 0 5-2 5-5V15c0-3-2-5-5-5zM81 454V205h13v249H81zm302-259H104V67a5 5 0 0 0-10 0v128H81V10h13v23a5 5 0 0 0 10 0V20h279v175z" ] []
        ]


whiteStar : Color.Color -> Int -> Element.Element msg
whiteStar cl size =
    Element.html <|
        whiteStar_ cl size


whiteStar_ : Color.Color -> Int -> Html.Html msg
whiteStar_ cl size =
    Svg.svg [ SA.viewBox "0 0 326 326", SA.height <| String.fromInt size ]
        [ Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M290 115l-18-2-9-1c-17-2-37-4-44-8-6-5-15-23-22-38l-5-11-8-17c-9-21-13-30-21-30s-13 9-22 30l-8 17-5 11c-7 15-16 33-22 38-6 4-27 6-43 8l-10 1-17 2c-20 1-33 2-36 10-2 8 6 16 23 31a464 464 0 0 1 54 56c1 6 2 11 0 16l-17 71c-3 10-1 15 2 17l6 2c6 0 15-4 28-11l17-9 13-6c14-7 30-15 37-15s23 8 37 15a756 756 0 0 0 57 26l6-2c3-2 6-7 3-17l-18-71c-1-5-1-10 1-16 2-7 17-21 30-33l9-9 15-14c16-15 25-23 22-31s-16-9-35-10zm5 33a468 468 0 0 0-24 23c-15 14-29 28-32 38-3 8-3 15-1 22l17 71 1 5-21-10-18-9-13-6c-16-8-32-16-41-16-10 0-25 8-42 16l-13 6-17 9c-8 4-17 9-22 10l1-5 17-71c3-7 2-14 0-22-3-10-17-24-33-38l-9-9-15-14-19-19c5-2 17-3 26-3l17-2 10-1c20-2 40-4 48-11 9-6 17-23 26-42l5-10 8-18 12-23 11 23a438 438 0 0 0 13 28c9 19 18 36 26 42 9 7 28 9 49 11l9 1 18 2c8 0 21 1 25 3l-19 19z" ] []
        ]


blackStar : Color.Color -> Int -> Element.Element msg
blackStar cl size =
    Element.html <|
        blackStar_ cl size


blackStar_ : Color.Color -> Int -> Html.Html msg
blackStar_ cl size =
    Svg.svg [ SA.viewBox "0 0 88 88", SA.height <| String.fromInt size ]
        [ Svg.path [ SA.fill (Color.colorToHex cl), SA.d "M44 0l12 33.6h32L61.8 53.4 71.2 88 44 67.2 16.8 88l9.4-34.6L0 33.6h32z" ] []
        ]


whitelist : Color.Color -> Int -> Element.Element msg
whitelist cl size =
    Element.html <|
        whitelist_ cl size


whitelist_ : Color.Color -> Int -> Html.Html msg
whitelist_ cl size =
    Svg.svg [ SA.viewBox "0 0 500 500", SA.height <| String.fromInt size ]
        [ Svg.path [ SA.fill (Color.colorToHex cl), SA.d "m 370.59 230.965 c -5.52344 0 -10 4.47656 -10 10 v 88.793 c -0.019532 16.5586 -13.4375 29.9805 -30 30 h -280.59 c -16.5625 -0.019531 -29.9805 -13.4414 -30 -30 v -260.59 c 0.019531 -16.5625 13.4375 -29.9805 30 -30 h 88.7891 c 5.52344 0 10 -4.47656 10 -10 c 0 -5.52344 -4.47656 -10 -10 -10 h -88.7891 c -27.6016 0.03125 -49.9688 22.3984 -50 50 v 260.59 c 0.03125 27.6016 22.3984 49.9688 50 50 h 280.59 c 27.6016 -0.03125 49.9688 -22.3984 50 -50 v -88.7891 c 0 -5.52344 -4.47656 -10.0039 -10 -10.0039 Z m 0 0" ] []
        , Svg.path [ SA.fill (Color.colorToHex cl), SA.d "m 156.367 178.344 l 146.012 -146.016 l 47.0898 47.0898 l -146.012 146.016 Z m 0 0" ] []
        , Svg.path [ SA.fill (Color.colorToHex cl), SA.d "m 132.543 249.258 l 52.0391 -14.4141 l -37.625 -37.625 Z m 0 0" ] []
        , Svg.path [ SA.fill (Color.colorToHex cl), SA.d "m 362.488 7.57813 c -9.76953 -9.74609 -25.5859 -9.74609 -35.3555 0 l -10.6055 10.6055 l 47.0898 47.0898 l 10.6055 -10.6055 c 9.75 -9.76953 9.75 -25.5859 0 -35.3555 Z m 0 0" ] []
        ]
