module Main exposing (main)

import Element exposing (..)
import Framework.Button as Button
import Framework.Modifier exposing (Modifier(..))
import Html


main : Html.Html a
main =
    layout [] <|
        el [ centerX, centerY ] <|
            Button.button [ Medium, Success, Outlined ] Nothing "Button"
